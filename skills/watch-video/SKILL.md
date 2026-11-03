---
name: watch-video
description: 'Manual-only: /watch-video <url-ou-arquivo> [pergunta].'
argument-hint: "<video-url-or-path> [why you're watching it]"
allowed-tools: Bash, Read
disable-model-invocation: true
homepage: https://github.com/taoufik123-collab/claude-watch
repository: https://github.com/taoufik123-collab/claude-watch
author: taoufik
license: MIT
---

# /watch-video — Claude watches a video

Skill manual. Só roda quando o Kelvi digita `/watch-video`.
Não acionar por palavra-chave nem porque um link de vídeo apareceu na conversa; sem invocação explícita, não assistir.

Origem: fork local de [claude-watch](https://github.com/taoufik123-collab/claude-watch) v0.2.0 (MIT). Adaptações: nome, ativação manual, caminhos relativos à pasta da skill e transcrição local como padrão (mlx-whisper no Apple Silicon, faster-whisper em CPU no pod). O áudio só sai da máquina com `--whisper groq|openai` ou quando não há backend local.

You don't have a video input; this skill gives you one. A Python script downloads the video, extracts frames as JPEGs (one per detected shot via scene-change), gets a timestamped transcript (native captions first, then Whisper API as fallback), runs editorial pacing metrics, and microscopes the first 10 seconds at higher density. You then `Read` each frame path to see the images, combine them with the transcript to answer the user, and fill the structured `report.md`.

## What v2 does differently

- **Scene-change frame sampling** — one frame per detected shot instead of uniform ticks. Cuts the frame budget on long videos while capturing every transition.
- **Editorial pacing metrics** — cuts/min, mean shot length, motion (when available). Lets you reason about pacing the way an editor does.
- **Hook microscope** — first 10s auto-runs at 2 fps + word-level Whisper. The single most leveraged 10 seconds of any video deserves dense treatment.
- **Structured `report.md`** — every watch emits a structured report at `<workdir>/report.md` with TL;DR, key moments, hook breakdown, editorial profile, quotable moments, entities, concepts, and transcript. Narrative sections are emitted as `<!-- pending Claude fill: ... -->` markers — you fill them in before delivering the report.

None of the above add new dependencies — pure ffmpeg + stdlib + the existing Whisper backend.

## No Maestro

- `ffmpeg`/`ffprobe`, `uv` e Python no pod não foram confirmados na migração. Conferir tudo em 1 comando: `python3 scripts/setup.py --json`, da pasta desta skill. Faltou binário: dizer ao Kelvi o nome e parar (sem sudo).
- `yt-dlp` roda por `uvx yt-dlp` quando não está instalado.
- Transcrição local: faster-whisper em CPU (`int8`, modelo `small`), rodado por `uv run --with faster-whisper`. Outro modelo: `WATCH_WHISPER_MODEL=medium` (mais lento). A primeira execução baixa o modelo para `~/.cache/huggingface`.
- Groq/OpenAI são opcionais: `GROQ_API_KEY` ou `OPENAI_API_KEY` como variável do assistente, se o Kelvi configurar. Não pedir chave por conta própria.
- Caminhos `scripts/...` abaixo são relativos à pasta desta skill. Rodando de outra pasta, use o caminho completo dela.
- Pergunta ao Kelvi vai pelo chat do Maestro.

## Step 0 — Setup preflight (runs every `/watch-video` invocation, silent on success)

Before every `/watch-video` run, verify that dependencies and a transcription backend are in place:

```bash
python3 "scripts/setup.py" --check
```

This is a <100ms lookup. On exit 0, the script emits **nothing** — proceed to Step 1 without comment. **Do NOT announce "setup is complete" to the user** — they don't need a status message on every turn. The only acceptable user-visible output from Step 0 is when remediation is required.

On non-zero exit, follow the table:

| Exit | Meaning | Action |
|------|---------|--------|
| `2` | Missing binaries (`ffmpeg` / `ffprobe`, or `yt-dlp` with no `uvx`) | Run installer; it names what is missing. Tell the Kelvi in chat (no sudo here) |
| `3` | No Whisper backend (local needs `uv`; or Groq/OpenAI key) | Run installer; prefer the local faster-whisper (needs `uv`) — never ask for an API key unless the user wants an API backend |
| `4` | Both missing | Run installer, then fix the backend as above |

The installer is idempotent — safe to re-run:

```bash
python3 "scripts/setup.py"
```

It never installs anything: it reports what is missing. It scaffolds `~/.config/watch/.env` with commented placeholders at `0600` perms, and writes `SETUP_COMPLETE=true` once deps + a backend are in place so the next session knows this user has already been through the wizard.

**If no Whisper backend is available after install:** the default in the pod is local faster-whisper through `uv`. Groq/OpenAI keys as assistant environment variables (or `~/.config/watch/.env`) are opt-in and only used with `--whisper groq|openai` or when no local backend runs — do not ask for one on your own. If nothing is available, proceed with `--no-whisper` and tell the user videos without native captions will come back frames-only.

**Structured mode (optional):** `python3 "scripts/setup.py" --json` emits `{status, first_run, missing_binaries, whisper_backend, has_api_key, config_file, platform}` where `status` is one of `ready | needs_install | needs_key | needs_install_and_key`. Use this when you need to branch on specifics (e.g. "is this the user's very first run?" → `first_run: true`).

Within a single session, you can skip Step 0 on follow-up `/watch-video` calls — once `--check` returned 0, nothing about the environment changes between turns.

## When to use

Only on explicit invocation: `/watch-video <url-or-path> [question]`. A video link pasted in conversation is not an invocation.

- Sources: any URL yt-dlp supports (YouTube, Vimeo, X, TikTok, Twitch clips, Instagram, …).
- Local files: `.mp4`, `.mov`, `.mkv`, `.webm`, etc.

## Transcrição local rápida (só áudio)

Quando o pedido é só o texto falado (transcrever, resumir a fala, extrair citações) e frames não importam, pular o script e rodar direto, num diretório temporário:

```bash
uvx yt-dlp -x --audio-format mp3 -o audio.mp3 "URL"
uv run --with faster-whisper python -c "from faster_whisper import WhisperModel; m=WhisperModel('small', device='cpu', compute_type='int8'); print(' '.join(s.text.strip() for s in m.transcribe('audio.mp3')[0]))"
```

- `ffmpeg` existe; `yt-dlp` roda por `uvx`. O modelo `small` baixa na primeira vez, sem chave.
- Arquivo local: pular o `yt-dlp` e passar o caminho do arquivo ao `m.transcribe`.
- Não usar API (Groq/OpenAI) nem navegador para transcrever.
- Precisa de timestamps, frames ou análise visual: usar o fluxo completo abaixo (`scripts/watch.py`), que usa o mesmo backend local por padrão.

## Recommended limits

- **Best accuracy: videos under 10 minutes.** Frame coverage scales inversely with duration.
- **Hard caps: 100 frames total and 2 fps.** Token cost grows with frame count, so the script targets a frame budget by duration (and never exceeds 2 fps even when the budget would imply more):
  - ≤30s → ~1-2 fps (up to 30 frames)
  - 30s-1min → ~40 frames
  - 1-3min → ~60 frames
  - 3-10min → ~80 frames
  - \>10min → 100 frames, sparsely spaced (warning printed)
- If the user hands you a long video, consider asking whether they want a specific section before burning tokens on a sparse scan.

## How to invoke

**Step 1 — parse the user input.** Separate the video source from any question the user asked. The question (or the user's prior stated interest) IS the intent — pass it to the script via `--intent`. Example: `/watch-video https://youtu.be/abc what's the hook pattern?` → source = `https://youtu.be/abc`, intent = `what's the hook pattern?`. If no question is given, use a brief inferred intent ("general summary") so the report's TL;DR has a lens. The intent shapes how the report's TL;DR and entity/concept sections get filled at Step 4 — same video with intent "pricing tactics" vs "editing style" produces different reports.

**Step 2 — run the watch script.** Pass the source verbatim. Do not shell-escape it yourself beyond normal quoting:

```bash
python3 "scripts/watch.py" "<source>" --intent "<intent string>"
```

Pass `--intent` whenever you have any signal from the user about why they want this video — the question they asked, a stated goal, or a brief inferred summary. Empty `--intent` works but produces less-targeted report sections.

Optional flags:
- `--start T` / `--end T` — focus on a section. Accepts `SS`, `MM:SS`, or `HH:MM:SS`. When either is set, fps auto-scales denser (see "Focusing on a section" below).
- `--max-frames N` — lower the cap for tighter token budget (e.g. `--max-frames 40`)
- `--resolution W` — change frame width in px (default 512; bump to 1024 only if the user needs to read on-screen text)
- `--fps F` — override auto-fps (clamped to 2 fps max). Setting `--fps` disables scene-change sampling.
- `--out-dir DIR` — keep working files somewhere specific (default: an auto-generated tmp dir)
- `--whisper mlx|faster|groq|openai` — force a backend (default: local `mlx-whisper` when installed, then local faster-whisper via `uv`, then Groq, then OpenAI)
- `--no-whisper` — disable the Whisper fallback entirely (frames-only if no captions)
- `--no-scene-change` — force uniform frame sampling (debug only; usually leave on)
- `--no-hook-microscope` — skip the 0-10s dense pass (saves ~1 Whisper call)

### Focusing on a section (higher frame rate)

When the user asks about a specific moment — "what happens at the 2 minute mark?", "zoom into 0:45 to 1:00", "the first 10 seconds" — pass `--start` and/or `--end`. The script switches to focused-mode budgets, which are denser than full-video budgets (still capped at 2 fps):

- ≤5s → 2 fps (up to 10 frames)
- 5-15s → 2 fps (up to 30 frames)
- 15-30s → ~2 fps (up to 60 frames)
- 30-60s → ~1.3 fps (up to 80 frames)
- 60-180s → ~0.6 fps (100 frames, capped)

Focused mode is the right call for:
- Any moment/range the user names explicitly ("around 2:30", "the intro", "the last 30 seconds").
- Any video longer than ~10 minutes where the user's question is about a specific part — running focused on the relevant section is far more useful than a sparse scan of the whole thing.
- Re-runs after a full scan didn't have enough detail in some region.

Transcript is auto-filtered to the same range. Frame timestamps are absolute (real video timeline, not offset-from-start).

Examples:
```bash
# Last 10 seconds of a 1 minute video
python3 "scripts/watch.py" video.mp4 --start 50 --end 60

# Zoom into 2:15 → 2:45 at 3 fps (90 frames)
python3 "scripts/watch.py" "$URL" --start 2:15 --end 2:45 --fps 3

# From 1h12m to the end of the video
python3 "scripts/watch.py" "$URL" --start 1:12:00
```

**Step 3 — Read every frame path the script lists.** The Read tool renders JPEGs directly as images for you. Read all frames in a single message (parallel tool calls) so you see them together. The frames are in chronological order with a `t=MM:SS` timestamp so you can align them to the transcript.

**Step 4 — answer the user, then fill the report.** You now have three streams of evidence:
- **Frames** — what's on screen at each timestamp
- **Transcript** — what's said at each timestamp
- **`report.md`** — structured artifact at `<workdir>/report.md` with `<!-- pending Claude fill: ... -->` markers

First, answer the user's question in chat citing timestamps.

Then, **fill in the pending markers in `report.md` using the Edit tool**. Walk every `<!-- pending Claude fill: ... -->` in order:
- **TL;DR** — 3-5 bullets through the lens of the user's intent (read from the frontmatter)
- **Key moments** — 5-10 timestamped bullets
- **Hook microscope interpretation** — frame-by-frame: visual change × what's said; identify the hook pattern (question, contrarian claim, in-medias-res, demo-first, etc.)
- **Editorial profile fingerprint** — one-line style summary inferred from pacing numbers + hero frames
- **Quotable moments** — top 3-5 punchy, standalone lines from the transcript
- **Entities mentioned** — people, companies, tools, places — as kebab-case, lowercase slugs.
- **Concepts surfaced** — frameworks, mental models, named patterns — short gist each

The fully-filled `report.md` is the deliverable. Do not skip the fill.

**Step 4.4 — Deliver the report.** Tell the Kelvi in chat where it is (`📄 Report: <workdir>/report.md`) and send the file in the chat when he wants to read it. If he asks to keep the analysis, ask in chat where: the project repo he names, or `memory/contexto/<tema>.md` in this assistant (via `conhecimento-pessoal`). Copy `report.md` plus the hero frames listed under `hero_frames:` in its frontmatter.

**Step 5 — clean up.** The script prints a working directory at the end. Once the report is delivered (and copied, if the Kelvi asked to keep it) and no follow-ups are expected, delete it with `rm -rf <dir>`. If he might ask follow-ups, leave it in place.

## Transcription

The script gets a timestamped transcript in one of two ways:

1. **Native captions (free, preferred).** yt-dlp pulls manual or auto-generated subtitles from the source platform if available.
2. **Whisper fallback.** If no captions came back (or the source is a local file), the script extracts audio (`ffmpeg -vn -ac 1 -ar 16000 -b:a 64k`, ~0.5 MB/min) and transcribes it with the first available backend:
   - **mlx (local, Apple Silicon only)** — `mlx-community/whisper-large-v3-turbo` via `mlx_whisper`, on-device, no key, nothing uploaded.
   - **faster (local, default in the pod)** — faster-whisper on CPU, `int8`, model `small` (override with `WATCH_WHISPER_MODEL`), run through `uv run --with faster-whisper`. No key, nothing uploaded. Also powers the word-level hook microscope.
   - **Groq** — `whisper-large-v3`. Opt-in: `GROQ_API_KEY` in the environment plus `--whisper groq`.
   - **OpenAI** — `whisper-1`. Opt-in: `OPENAI_API_KEY` plus `--whisper openai`.

With a local backend available (mlx-whisper, or `uv` for faster-whisper) the script never contacts an API unless `--whisper groq|openai` is passed explicitly. Use `--no-whisper` to skip the fallback entirely.

## Failure modes and handling

- **Setup preflight failed** → run `python3 "scripts/setup.py"` (reports what is missing, scaffolds the `.env`). Missing system binaries go to the Kelvi in chat. For a missing transcription backend, local faster-whisper needs `uv`; API keys only if the user asks for an API backend.
- **No transcript available** → captions missing AND (no Whisper backend OR transcription failed). Script prints a hint pointing to setup. Proceed frames-only and tell the user.
- **Long video warning printed** → acknowledge it in your answer. Offer to re-run focused on a specific section via `--start`/`--end` rather than a sparse full-video scan.
- **Download fails** → yt-dlp's error goes to stderr. If it's a login-required or region-locked video, tell the user plainly; do not keep retrying.
- **Whisper fails** → the error is printed to stderr (local: import/model download error; API: invalid key, rate limit, 25 MB upload limit). The report will say "none available" for transcript. Retry with another backend via `--whisper` only if the user accepts an API upload.
- **Report has unfilled `<!-- pending Claude fill: ... -->` markers** → you skipped Step 4. Go back, read the report, fill every marker via Edit, then deliver. Never deliver or save a half-filled report.

## Token efficiency

This skill burns tokens primarily on frames. Order of magnitude:
- 80 frames at 512px wide is roughly 50-80k image tokens depending on aspect ratio.
- The transcript is cheap (a few thousand tokens at most for a 10-minute video).
- Bumping `--resolution` to 1024 roughly quadruples the image tokens per frame. Only do it when necessary.

If you already watched a video this session and the user asks a follow-up, do **not** re-run the script — you already have the frames and transcript in context. Just answer from what you have.

## Security & Permissions

**What this skill does:**
- Runs `yt-dlp` locally to download the video and pull native captions when the source supports them (public data; the request goes directly to whatever host the URL points at)
- Runs `ffmpeg` / `ffprobe` locally to extract frames as JPEGs and, when Whisper is needed, a mono 16 kHz audio clip
- Transcribes the extracted audio clip locally by default (mlx-whisper on Apple Silicon, faster-whisper on CPU elsewhere) — on that path nothing leaves the machine. faster-whisper downloads its model once to `~/.cache/huggingface`
- Sends the extracted audio clip to Groq's Whisper API (`api.groq.com/openai/v1/audio/transcriptions`) only with `--whisper groq`, or when no local backend runs and `GROQ_API_KEY` is set
- Sends the extracted audio clip to OpenAI's audio transcription API (`api.openai.com/v1/audio/transcriptions`) only with `--whisper openai`, or when no local backend runs, `OPENAI_API_KEY` is set and Groq is not
- Writes the downloaded video, frames, audio, and an intermediate transcript to a working directory under the system temp dir (or `--out-dir` if specified) so Claude can `Read` them
- Reads Whisper API keys from the environment, `~/.config/watch/.env` or `.env` in the current working directory. Creates `~/.config/watch/.env` (mode `0600`) for placeholders and a `SETUP_COMPLETE` marker

**What this skill does NOT do:**
- Does not upload the video itself to any API — only the extracted audio goes out, and only when native captions are missing AND an API backend is selected (never on the default local path)
- Does not access any platform account (no login, no session cookies, no posting)
- Does not share API keys between providers (Groq key only goes to `api.groq.com`, OpenAI key only goes to `api.openai.com`)
- Does not log, cache, or write API keys to stdout, stderr, or output files
- Does not persist anything outside the working directory, `~/.config/watch/.env` and the model cache (plus where the Kelvi asks to keep the report) — clean up the working directory when you're done (Step 5)

**Bundled scripts:** `scripts/watch.py` (entry point), `scripts/download.py` (yt-dlp wrapper), `scripts/frames.py` (ffmpeg uniform + scene-change extraction + hero selection), `scripts/pacing.py` (editorial metrics), `scripts/hook.py` (0-10s microscope), `scripts/report.py` (structured report emitter), `scripts/transcribe.py` (caption selection + Whisper orchestration), `scripts/whisper.py` (local mlx-whisper / faster-whisper plus Groq / OpenAI clients, word-level timestamps), `scripts/setup.py` (preflight + installer)

Review scripts before first use to verify behavior.
