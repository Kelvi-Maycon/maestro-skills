#!/usr/bin/env python3
"""Setup / preflight for /watch-video.

Modes:
  setup.py --check      Silent preflight. Exit 0 if ready, 2/3/4 on failure.
  setup.py --json       Machine-readable status for Claude to parse.
  setup.py              Installer. Reports missing deps, scaffolds .env, marks SETUP_COMPLETE.

Design:
- Silent on success: --check exits 0 with no output when everything's ready so
  that /watch-video doesn't spam "setup is complete" on every turn.
- Idempotent: re-running the installer is safe — it never clobbers existing
  keys and only appends missing ones.
- SETUP_COMPLETE=true in ~/.config/watch/.env tells us the user has been
  through a successful installer run at least once.
- Never sudo, never a package manager: report what is missing.
- yt-dlp counts as present when `uvx` can run it.
- Local transcription: mlx-whisper (Apple Silicon) or faster-whisper (CPU, via uv).
- API keys are read from the environment or ~/.config/watch/.env.
  Never write an API key to disk automatically — only scaffold placeholders.
"""
from __future__ import annotations

import importlib.util
import json
import os
import platform
import shutil
import sys
from pathlib import Path


REQUIRED_BINARIES = ["ffmpeg", "ffprobe", "yt-dlp"]
CONFIG_DIR = Path.home() / ".config" / "watch"
CONFIG_FILE = CONFIG_DIR / ".env"
ENV_TEMPLATE = """# /watch-video API configuration
#
# Whisper transcription fallback — used only when yt-dlp cannot get captions
# (or when you point /watch-video at a local file with no subtitles).
#
# Default backend is local: mlx-whisper on Apple Silicon, else faster-whisper
# on CPU via `uv run --with faster-whisper` (no key, nothing uploaded).
# The Groq/OpenAI keys are opt-in (--whisper groq|openai) and are only used
# automatically when no local backend is available. Prefer environment
# variables set for the assistant; this file is a fallback.
#
# Get a Groq key:  https://console.groq.com/keys
# Get an OpenAI key:  https://platform.openai.com/api-keys
#
# Leave both blank to disable Whisper — /watch-video will still work, but videos
# without native captions will come back frames-only.

GROQ_API_KEY=
OPENAI_API_KEY=
"""


def _which(name: str) -> str | None:
    return shutil.which(name)


def _check_binaries() -> list[str]:
    missing = [b for b in REQUIRED_BINARIES if not _which(b)]
    if "yt-dlp" in missing and _which("uvx"):
        missing.remove("yt-dlp")
    return missing


def _check_file_permissions(path: Path) -> None:
    """Warn to stderr if a secrets file is world/group readable."""
    try:
        mode = path.stat().st_mode
        if mode & 0o044:
            sys.stderr.write(
                f"[watch] WARNING: {path} is readable by other users. "
                f"Run: chmod 600 {path}\n"
            )
            sys.stderr.flush()
    except OSError:
        pass


def _read_env_key(name: str) -> str | None:
    value = os.environ.get(name)
    if value and value.strip():
        return value.strip()
    for path in (CONFIG_FILE,):
        if not path.exists():
            continue
        _check_file_permissions(path)
        try:
            for line in path.read_text(encoding="utf-8").splitlines():
                line = line.strip()
                if not line or line.startswith("#") or "=" not in line:
                    continue
                key, _, raw = line.partition("=")
                if key.strip() != name:
                    continue
                raw = raw.strip()
                if len(raw) >= 2 and raw[0] in ('"', "'") and raw[-1] == raw[0]:
                    raw = raw[1:-1]
                if raw:
                    return raw
        except OSError:
            continue
    return None


def _have_api_key() -> tuple[bool, str | None]:
    """(has a Whisper backend, backend name). Local backends win; API keys are the fallback."""
    if importlib.util.find_spec("mlx_whisper") is not None:
        return True, "mlx"
    if importlib.util.find_spec("faster_whisper") is not None or _which("uv"):
        return True, "faster"
    if _read_env_key("GROQ_API_KEY"):
        return True, "groq"
    if _read_env_key("OPENAI_API_KEY"):
        return True, "openai"
    return False, None


def is_first_run() -> bool:
    """True if the installer hasn't completed successfully yet."""
    return _read_env_key("SETUP_COMPLETE") != "true"


def _scaffold_env() -> bool:
    """Create ~/.config/watch/.env with placeholders if missing."""
    if CONFIG_FILE.exists():
        return False
    CONFIG_DIR.mkdir(parents=True, exist_ok=True)
    CONFIG_FILE.write_text(ENV_TEMPLATE, encoding="utf-8")
    try:
        CONFIG_FILE.chmod(0o600)
    except OSError:
        pass
    return True


def _write_setup_complete() -> None:
    """Idempotently append SETUP_COMPLETE=true to .env.

    Used only after a fully successful install (deps + key). Future sessions
    detect this marker to skip wizard-style UI and stay silent.
    """
    CONFIG_DIR.mkdir(parents=True, exist_ok=True)
    existing = ""
    if CONFIG_FILE.exists():
        existing = CONFIG_FILE.read_text(encoding="utf-8")
        for line in existing.splitlines():
            if line.strip().startswith("SETUP_COMPLETE="):
                return
        if existing and not existing.endswith("\n"):
            existing += "\n"
        CONFIG_FILE.write_text(existing + "SETUP_COMPLETE=true\n", encoding="utf-8")
    else:
        CONFIG_FILE.write_text(ENV_TEMPLATE + "\nSETUP_COMPLETE=true\n", encoding="utf-8")
    try:
        CONFIG_FILE.chmod(0o600)
    except OSError:
        pass


def _install_hint(missing: list[str]) -> str:
    """No sudo, no package manager here: say what is missing and who installs it."""
    hints = []
    if "ffmpeg" in missing or "ffprobe" in missing:
        hints.append("ffmpeg/ffprobe: system package; ask the Kelvi to install it in the assistant pod")
    if "yt-dlp" in missing:
        hints.append("yt-dlp: install uv (provides `uvx yt-dlp`) or `uv tool install yt-dlp`")
    return "\n  ".join(hints) if hints else "nothing to install"


def _status() -> dict:
    """Structured preflight snapshot."""
    missing = _check_binaries()
    has_key, backend = _have_api_key()

    if not missing and has_key:
        status = "ready"
    elif missing and not has_key:
        status = "needs_install_and_key"
    elif missing:
        status = "needs_install"
    else:
        status = "needs_key"

    return {
        "status": status,
        "first_run": is_first_run(),
        "missing_binaries": missing,
        "whisper_backend": backend,
        "has_api_key": has_key,
        "config_file": str(CONFIG_FILE),
        "platform": platform.system(),
    }


def cmd_check() -> int:
    """Silent-on-success preflight.

    Exit 0 with no output when ready. On failure, print one actionable line
    to stderr and return:
      2 → binaries missing
      3 → API key missing
      4 → both missing
    """
    s = _status()
    if s["status"] == "ready":
        return 0

    parts = []
    if s["missing_binaries"]:
        parts.append(f"missing binaries: {', '.join(s['missing_binaries'])}")
    if not s["has_api_key"]:
        parts.append("no Whisper backend (uv for local faster-whisper, GROQ_API_KEY or OPENAI_API_KEY)")
    installer = Path(__file__).resolve()
    sys.stderr.write(
        f"[watch] setup incomplete ({'; '.join(parts)}). "
        f"Run: python3 {installer}\n"
    )
    sys.stderr.flush()

    if s["missing_binaries"] and not s["has_api_key"]:
        return 4
    if s["missing_binaries"]:
        return 2
    return 3


def cmd_json() -> int:
    json.dump(_status(), sys.stdout, indent=2)
    sys.stdout.write("\n")
    return 0


def cmd_install() -> int:
    missing = _check_binaries()
    if missing:
        print(f"[setup] missing: {', '.join(missing)}", file=sys.stderr)
        print("  " + _install_hint(missing), file=sys.stderr)
        return 2

    created = _scaffold_env()
    if created:
        print(f"[setup] created config: {CONFIG_FILE}")
    else:
        print(f"[setup] config exists: {CONFIG_FILE}")

    has_key, backend = _have_api_key()
    if has_key:
        _write_setup_complete()
        print(f"[setup] ready. whisper backend: {backend}")
        return 0

    print("")
    print("[setup] one step left: a Whisper backend.")
    print("")
    print("  Preferred (local, no key, nothing uploaded): install uv; faster-whisper runs via `uv run --with faster-whisper`")
    print(f"  Or set an API key as an environment variable or in {CONFIG_FILE} (opt-in; audio gets uploaded):")
    print("    GROQ_API_KEY=...    (console.groq.com/keys)")
    print("    OPENAI_API_KEY=...  (platform.openai.com/api-keys)")
    print("")
    print("  Without a backend, /watch-video still works but videos without captions come back frames-only.")
    return 3


def main() -> int:
    if len(sys.argv) > 1:
        arg = sys.argv[1]
        if arg == "--check":
            return cmd_check()
        if arg == "--json":
            return cmd_json()
        if arg in ("-h", "--help"):
            print(__doc__)
            return 0
    return cmd_install()


if __name__ == "__main__":
    raise SystemExit(main())
