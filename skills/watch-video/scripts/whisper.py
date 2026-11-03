#!/usr/bin/env python3
"""Transcribe a video locally (mlx-whisper or faster-whisper), or via Groq / OpenAI Whisper API.

Strategy: extract audio (mono 16kHz mp3, tiny payload), then hand it to the
first available backend: local mlx-whisper (Apple Silicon), else local
faster-whisper on CPU (nothing uploaded; runs through `uv run --with
faster-whisper` when the package is not importable), else whichever API has a key. Returns segments in the same shape as transcribe.parse_vtt so
the rest of the pipeline (filter_range, format_transcript) doesn't care where
the transcript came from.

Pure stdlib — no `pip install groq` or `pip install openai` needed.

faster-whisper model: WATCH_WHISPER_MODEL (default "small"), int8 on CPU.
API keys: environment, then ~/.config/watch/.env, ./.env.
"""
from __future__ import annotations

import io
import json
import mimetypes
import os
import shutil
import ssl
import subprocess
import sys
import time
import urllib.error
import uuid
from pathlib import Path
from urllib.request import Request, urlopen


GROQ_ENDPOINT = "https://api.groq.com/openai/v1/audio/transcriptions"
GROQ_MODEL = "whisper-large-v3"

OPENAI_ENDPOINT = "https://api.openai.com/v1/audio/transcriptions"
OPENAI_MODEL = "whisper-1"

MLX_MODEL = "mlx-community/whisper-large-v3-turbo"

FASTER_MODEL = os.environ.get("WATCH_WHISPER_MODEL", "").strip() or "small"


def mlx_available() -> bool:
    """True when the local mlx-whisper backend is importable (Apple Silicon)."""
    import importlib.util
    return importlib.util.find_spec("mlx_whisper") is not None


def _faster_importable() -> bool:
    import importlib.util
    return importlib.util.find_spec("faster_whisper") is not None


def faster_available() -> bool:
    """True when faster-whisper can run: importable here, or reachable via `uv run --with`."""
    return _faster_importable() or shutil.which("uv") is not None


def load_api_key(preferred: str | None = None) -> tuple[str, str] | tuple[None, None]:
    """Return (backend, api_key). Local mlx-whisper, then local faster-whisper, then Groq, then OpenAI.

    For the local backends api_key is the placeholder "local". If `preferred` is
    "mlx", "faster", "groq" or "openai", only that backend is considered.
    """
    def _from_env(name: str) -> str | None:
        value = os.environ.get(name)
        return value.strip() if value else None

    def _from_dotenv(path: Path, name: str) -> str | None:
        if not path.exists():
            return None
        try:
            for line in path.read_text(encoding="utf-8").splitlines():
                line = line.strip()
                if not line or line.startswith("#") or "=" not in line:
                    continue
                key, _, value = line.partition("=")
                if key.strip() != name:
                    continue
                value = value.strip()
                if len(value) >= 2 and value[0] in ('"', "'") and value[-1] == value[0]:
                    value = value[1:-1]
                return value or None
        except OSError:
            return None
        return None

    dotenv_paths = [
        Path.home() / ".config" / "watch" / ".env",
        Path.cwd() / ".env",
    ]

    if preferred in (None, "mlx") and mlx_available():
        return "mlx", "local"
    if preferred in (None, "faster") and faster_available():
        return "faster", "local"

    candidates = (("GROQ_API_KEY", "groq"), ("OPENAI_API_KEY", "openai"))
    if preferred is not None:
        candidates = tuple(c for c in candidates if c[1] == preferred)

    for key_name, backend in candidates:
        value = _from_env(key_name)
        if not value:
            for candidate in dotenv_paths:
                value = _from_dotenv(candidate, key_name)
                if value:
                    break
        if value:
            return backend, value

    return None, None


def extract_audio(video_path: str, out_path: Path) -> Path:
    """Extract mono 16kHz 64kbps mp3 — ~480 kB/min, fits any Whisper limit."""
    if shutil.which("ffmpeg") is None:
        raise SystemExit("ffmpeg is not installed. Install the system ffmpeg package and re-run.")

    out_path.parent.mkdir(parents=True, exist_ok=True)
    cmd = [
        "ffmpeg",
        "-hide_banner",
        "-loglevel", "error",
        "-y",
        "-i", str(Path(video_path).resolve()),
        "-vn",
        "-acodec", "libmp3lame",
        "-ar", "16000",
        "-ac", "1",
        "-b:a", "64k",
        str(out_path.resolve()),
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        raise SystemExit(f"ffmpeg audio extraction failed: {result.stderr.strip()}")
    if not out_path.exists() or out_path.stat().st_size == 0:
        raise SystemExit("ffmpeg produced no audio — video may have no audio track")
    return out_path


def _build_multipart(fields: dict[str, str], file_path: Path) -> tuple[bytes, str]:
    """Assemble a multipart/form-data body the Whisper APIs accept.

    Whisper's multipart upload is small and predictable — doing it by hand
    keeps us on pure stdlib instead of pulling requests/groq/openai SDKs.
    """
    boundary = f"----WatchBoundary{uuid.uuid4().hex}"
    eol = b"\r\n"
    buf = io.BytesIO()

    for name, value in fields.items():
        values = value if isinstance(value, (list, tuple)) else [value]
        for v in values:
            buf.write(f"--{boundary}".encode()); buf.write(eol)
            buf.write(f'Content-Disposition: form-data; name="{name}"'.encode()); buf.write(eol)
            buf.write(eol)
            buf.write(str(v).encode()); buf.write(eol)

    mimetype = mimetypes.guess_type(file_path.name)[0] or "application/octet-stream"
    buf.write(f"--{boundary}".encode()); buf.write(eol)
    buf.write(
        f'Content-Disposition: form-data; name="file"; filename="{file_path.name}"'.encode()
    )
    buf.write(eol)
    buf.write(f"Content-Type: {mimetype}".encode()); buf.write(eol)
    buf.write(eol)
    buf.write(file_path.read_bytes())
    buf.write(eol)
    buf.write(f"--{boundary}--".encode()); buf.write(eol)

    return buf.getvalue(), boundary


MAX_ATTEMPTS = 4       # initial + 3 retries
MAX_429_RETRIES = 2
RETRY_BASE_DELAY = 2.0


def _post_whisper(
    endpoint: str,
    api_key: str,
    model: str,
    audio_path: Path,
    word_timestamps: bool = False,
) -> dict:
    fields: dict = {
        "model": model,
        "response_format": "verbose_json",
        "temperature": "0",
    }
    if word_timestamps:
        # OpenAI/Groq accept timestamp_granularities[] as a repeated form field.
        fields["timestamp_granularities[]"] = "word"
    body, boundary = _build_multipart(fields, audio_path)
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": f"multipart/form-data; boundary={boundary}",
        # Groq sits behind Cloudflare — the default `Python-urllib/3.x` UA
        # trips WAF rule 1010 (403) before auth even runs. Any non-default
        # UA clears it; we identify honestly.
        "User-Agent": "watch-skill/1.0 (+claude-code; python-urllib)",
    }

    context = ssl.create_default_context()
    rate_limit_hits = 0
    last_exc: Exception | None = None
    last_detail = ""

    for attempt in range(MAX_ATTEMPTS):
        request = Request(endpoint, data=body, headers=headers, method="POST")
        try:
            with urlopen(request, timeout=300, context=context) as response:
                payload = response.read().decode("utf-8", errors="replace")
        except urllib.error.HTTPError as exc:
            detail = _read_error_body(exc)
            last_exc, last_detail = exc, detail

            # 4xx other than 429 are client errors — no retry will fix them.
            if 400 <= exc.code < 500 and exc.code != 429:
                raise SystemExit(f"Whisper request failed: {exc}{detail}")

            if exc.code == 429:
                rate_limit_hits += 1
                if rate_limit_hits >= MAX_429_RETRIES:
                    raise SystemExit(f"Whisper request failed: {exc}{detail}")
                delay = _retry_after(exc) or RETRY_BASE_DELAY * (2 ** attempt) + 1
            else:
                delay = RETRY_BASE_DELAY * (2 ** attempt)

            if attempt < MAX_ATTEMPTS - 1:
                print(
                    f"[watch] whisper HTTP {exc.code} — retrying in {delay:.1f}s "
                    f"(attempt {attempt + 2}/{MAX_ATTEMPTS})",
                    file=sys.stderr,
                )
                time.sleep(delay)
            continue
        except (urllib.error.URLError, TimeoutError, ConnectionResetError, OSError) as exc:
            last_exc, last_detail = exc, ""
            if attempt < MAX_ATTEMPTS - 1:
                delay = RETRY_BASE_DELAY * (attempt + 1)
                print(
                    f"[watch] whisper network error ({type(exc).__name__}: {exc}) — "
                    f"retrying in {delay:.1f}s (attempt {attempt + 2}/{MAX_ATTEMPTS})",
                    file=sys.stderr,
                )
                time.sleep(delay)
            continue

        try:
            return json.loads(payload)
        except json.JSONDecodeError as exc:
            raise SystemExit(f"Whisper returned non-JSON response: {exc}: {payload[:200]}")

    raise SystemExit(
        f"Whisper request failed after {MAX_ATTEMPTS} attempts: {last_exc}{last_detail}"
    )


def _read_error_body(exc: urllib.error.HTTPError) -> str:
    try:
        body = exc.read()
    except Exception:
        return ""
    if not body:
        return ""
    try:
        return f" — {body.decode('utf-8', errors='replace')[:400]}"
    except Exception:
        return ""


def _retry_after(exc: urllib.error.HTTPError) -> float | None:
    header = exc.headers.get("Retry-After") if getattr(exc, "headers", None) else None
    if not header:
        return None
    try:
        return float(header)
    except ValueError:
        return None


def _segments_from_response(data: dict) -> list[dict]:
    """Convert Whisper verbose_json into our {start, end, text} segment format."""
    out: list[dict] = []
    for seg in data.get("segments") or []:
        text = (seg.get("text") or "").strip()
        if not text:
            continue
        out.append({
            "start": round(float(seg.get("start") or 0.0), 2),
            "end": round(float(seg.get("end") or 0.0), 2),
            "text": text,
        })

    if not out:
        full = (data.get("text") or "").strip()
        if full:
            out.append({"start": 0.0, "end": 0.0, "text": full})

    return out


def _mlx_transcribe(audio_path: Path, word_timestamps: bool = False) -> tuple[list[dict], list[dict]]:
    """Run mlx-whisper on-device. Returns (segments, words); nothing leaves the machine."""
    import mlx_whisper  # heavy import, only on this path

    result = mlx_whisper.transcribe(
        str(audio_path),
        path_or_hf_repo=MLX_MODEL,
        word_timestamps=word_timestamps,
    )
    segments = _segments_from_response(result)
    words: list[dict] = []
    if word_timestamps:
        for seg in result.get("segments") or []:
            for w in seg.get("words") or []:
                text = (w.get("word") or "").strip()
                if not text:
                    continue
                words.append({
                    "word": text,
                    "start": round(float(w.get("start") or 0.0), 3),
                    "end": round(float(w.get("end") or 0.0), 3),
                })
    return segments, words


def _faster_run(audio_path: Path, word_timestamps: bool = False) -> dict:
    """faster-whisper in this interpreter. Returns {"segments": [...], "words": [...]}."""
    from faster_whisper import WhisperModel  # heavy import, only on this path

    model = WhisperModel(FASTER_MODEL, device="cpu", compute_type="int8")
    seg_iter, _info = model.transcribe(str(audio_path), word_timestamps=word_timestamps)
    segments: list[dict] = []
    words: list[dict] = []
    for seg in seg_iter:
        text = (seg.text or "").strip()
        if text:
            segments.append({"start": round(float(seg.start), 2), "end": round(float(seg.end), 2), "text": text})
        for w in (seg.words or []) if word_timestamps else []:
            wt = (w.word or "").strip()
            if wt:
                words.append({"word": wt, "start": round(float(w.start), 3), "end": round(float(w.end), 3)})
    return {"segments": segments, "words": words}


def _faster_transcribe(audio_path: Path, word_timestamps: bool = False) -> tuple[list[dict], list[dict]]:
    """Run faster-whisper on CPU. Returns (segments, words); nothing leaves the machine.

    Without faster_whisper importable, re-runs this file as a worker under
    `uv run --with faster-whisper` so the main pipeline stays pure stdlib.
    """
    if _faster_importable():
        data = _faster_run(audio_path, word_timestamps)
    else:
        if shutil.which("uv") is None:
            raise SystemExit("faster-whisper unavailable: install uv or the faster-whisper package")
        cmd = ["uv", "run", "--quiet", "--with", "faster-whisper", "python",
               str(Path(__file__).resolve()), "--faster-worker", str(Path(audio_path).resolve())]
        if word_timestamps:
            cmd.append("--words")
        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode != 0:
            raise SystemExit(f"faster-whisper failed: {result.stderr.strip()[-600:]}")
        try:
            data = json.loads(result.stdout)
        except json.JSONDecodeError as exc:
            raise SystemExit(f"faster-whisper returned non-JSON output: {exc}: {result.stdout[:200]}")
    return data.get("segments") or [], data.get("words") or []


def transcribe_video(
    video_path: str,
    audio_out: Path,
    backend: str | None = None,
    api_key: str | None = None,
) -> tuple[list[dict], str]:
    """Run the full flow: extract audio → upload → parse segments.

    Returns (segments, backend_used). Raises SystemExit on any failure.
    """
    if backend is None or api_key is None:
        detected_backend, detected_key = load_api_key()
        backend = backend or detected_backend
        api_key = api_key or detected_key

    if not backend or not api_key:
        setup_py = Path(__file__).resolve().parent / "setup.py"
        raise SystemExit(
            "No Whisper backend available. Install uv (local faster-whisper, preferred) or set "
            "GROQ_API_KEY / OPENAI_API_KEY in the environment or in ~/.config/watch/.env. "
            f"Run `python3 {setup_py}` to configure."
        )

    print(f"[watch] extracting audio for Whisper ({backend})…", file=sys.stderr)
    audio_path = extract_audio(video_path, audio_out)
    size_kb = audio_path.stat().st_size / 1024
    if backend == "mlx":
        print(f"[watch] audio: {size_kb:.0f} kB — transcribing locally with mlx-whisper…", file=sys.stderr)
        segments, _ = _mlx_transcribe(audio_path)
    elif backend == "faster":
        print(f"[watch] audio: {size_kb:.0f} kB — transcribing locally with faster-whisper ({FASTER_MODEL}, CPU)…", file=sys.stderr)
        segments, _ = _faster_transcribe(audio_path)
    else:
        print(f"[watch] audio: {size_kb:.0f} kB — uploading to {backend} Whisper…", file=sys.stderr)
        if backend == "groq":
            response = _post_whisper(GROQ_ENDPOINT, api_key, GROQ_MODEL, audio_path)
        elif backend == "openai":
            response = _post_whisper(OPENAI_ENDPOINT, api_key, OPENAI_MODEL, audio_path)
        else:
            raise SystemExit(f"Unknown whisper backend: {backend}")
        segments = _segments_from_response(response)
    if not segments:
        raise SystemExit("Whisper returned no transcript segments")

    print(f"[watch] transcribed {len(segments)} segments via {backend}", file=sys.stderr)
    return segments, backend


def transcribe_audio(
    audio_path: Path,
    backend: str | None = None,
    api_key: str | None = None,
    word_timestamps: bool = False,
) -> tuple[list[dict], str, list[dict]]:
    """Upload an existing audio file. Returns (segments, backend, words).

    Words is empty unless word_timestamps=True. Each word is
    {"word": str, "start": float, "end": float}.
    """
    if backend is None or api_key is None:
        detected_backend, detected_key = load_api_key()
        backend = backend or detected_backend
        api_key = api_key or detected_key
    if not backend or not api_key:
        raise SystemExit("No Whisper backend available for transcribe_audio()")

    if backend == "mlx":
        segments, words = _mlx_transcribe(audio_path, word_timestamps=word_timestamps)
        return segments, backend, words
    if backend == "faster":
        segments, words = _faster_transcribe(audio_path, word_timestamps=word_timestamps)
        return segments, backend, words

    if backend == "groq":
        endpoint, model = GROQ_ENDPOINT, GROQ_MODEL
    elif backend == "openai":
        endpoint, model = OPENAI_ENDPOINT, OPENAI_MODEL
    else:
        raise SystemExit(f"Unknown whisper backend: {backend}")

    response = _post_whisper(
        endpoint, api_key, model, audio_path,
        word_timestamps=word_timestamps,
    )
    segments = _segments_from_response(response)
    words: list[dict] = []
    if word_timestamps:
        for w in response.get("words") or []:
            text = (w.get("word") or "").strip()
            if not text:
                continue
            words.append({
                "word": text,
                "start": round(float(w.get("start") or 0.0), 3),
                "end": round(float(w.get("end") or 0.0), 3),
            })
    return segments, backend, words


if __name__ == "__main__":
    if len(sys.argv) >= 3 and sys.argv[1] == "--faster-worker":
        # Internal: invoked by _faster_transcribe under `uv run --with faster-whisper`.
        json.dump(_faster_run(Path(sys.argv[2]), "--words" in sys.argv), sys.stdout)
        raise SystemExit(0)

    if len(sys.argv) < 2 or sys.argv[1] in ("-h", "--help"):
        print("usage: whisper.py <video-path> [<audio-out.mp3>] [--backend mlx|faster|groq|openai]", file=sys.stderr)
        raise SystemExit(0 if len(sys.argv) >= 2 else 2)

    video = sys.argv[1]
    audio_out = Path(sys.argv[2]) if len(sys.argv) > 2 and not sys.argv[2].startswith("--") else Path("audio.mp3")
    backend_override = None
    if "--backend" in sys.argv:
        backend_override = sys.argv[sys.argv.index("--backend") + 1]

    segments, backend = transcribe_video(video, audio_out, backend=backend_override)
    print(json.dumps({"backend": backend, "segments": segments}, indent=2))
