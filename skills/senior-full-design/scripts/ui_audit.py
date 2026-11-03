#!/usr/bin/env python3
"""Inventory and audit interface craft in existing UI source.

Two outputs, in this order:

1. **Census** - how many distinct values the project actually uses for control
   height, radius, spacing and border colour. This is the number that turns
   "looks sloppy" into "eleven distinct button heights", which is what decides
   whether the fix is per-instance or a grid migration.
2. **Findings** - affordance, target, state and box-metric problems that are
   cheap to detect in source.

Judgment-heavy calls (does the hover delta read? is this card supposed to be
clickable?) stay with `ui/PLAYBOOK.md` and a real browser pass.
"""

from __future__ import annotations

import argparse
import re
from collections import Counter
from dataclasses import dataclass
from pathlib import Path


EXTENSIONS = {
    ".css",
    ".html",
    ".js",
    ".jsx",
    ".mjs",
    ".scss",
    ".svelte",
    ".ts",
    ".tsx",
    ".vue",
}

SKIP_DIRS = {
    ".git",
    ".next",
    ".netlify",
    ".playwright-cli",
    "node_modules",
    "dist",
    "build",
    "coverage",
}

# Selectors that plausibly style a control rather than a layout container.
CONTROL_SELECTOR_RE = re.compile(
    r"(?:^|[\s,.#:\[])(?:btn|button|cta|input|select|textarea|field|chip|tag|pill|toggle|switch|control)",
    re.IGNORECASE,
)

NATIVE_INTERACTIVE_TAGS = ("button", "a", "input", "select", "textarea", "summary", "label")

TAILWIND_RADIUS_PX = {
    "none": 0,
    "sm": 2,
    "": 4,
    "md": 6,
    "lg": 8,
    "xl": 12,
    "2xl": 16,
    "3xl": 24,
}

CONTROL_TALL_PX = 60
TARGET_MIN_PX = 24
PILL_RADIUS_PX = 100
BORDER_LIGHT_CONTRAST = 1.8
# Faixa em que uma altura explicita ainda le como controle, e nao como glifo de icone.
CONTROL_HEIGHT_RANGE = (20, 72)


@dataclass
class Finding:
    severity: str
    path: Path
    line: int
    rule: str
    message: str


@dataclass
class Census:
    heights: Counter
    radii: Counter
    spacing: Counter
    border_colors: Counter
    spacing_sites: list[tuple[Path, int, int]]


def iter_files(paths: list[Path]) -> list[Path]:
    files: list[Path] = []
    for path in paths:
        if path.is_file() and path.suffix in EXTENSIONS:
            files.append(path)
            continue
        if not path.is_dir():
            continue
        for child in path.rglob("*"):
            if any(part in SKIP_DIRS for part in child.parts):
                continue
            if child.is_file() and child.suffix in EXTENSIONS:
                files.append(child)
    return sorted(set(files))


def line_number(text: str, index: int) -> int:
    return text.count("\n", 0, index) + 1


def add(
    findings: list[Finding],
    path: Path,
    text: str,
    pattern: str,
    severity: str,
    rule: str,
    message: str,
    flags: int = re.IGNORECASE,
) -> None:
    for match in re.finditer(pattern, text, flags):
        findings.append(Finding(severity, path, line_number(text, match.start()), rule, message))


def relative_luminance(hex_color: str) -> float:
    value = hex_color.lstrip("#")
    if len(value) == 3:
        value = "".join(ch * 2 for ch in value)
    if len(value) == 8:
        value = value[:6]
    if len(value) != 6:
        return -1.0
    channels = []
    for offset in (0, 2, 4):
        raw = int(value[offset : offset + 2], 16) / 255
        channels.append(raw / 12.92 if raw <= 0.04045 else ((raw + 0.055) / 1.055) ** 2.4)
    r, g, b = channels
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def contrast_vs_white(hex_color: str) -> float:
    lum = relative_luminance(hex_color)
    if lum < 0:
        return -1.0
    return 1.05 / (lum + 0.05)


def strip_comments(text: str) -> str:
    return re.sub(r"/\*.*?\*/", "", text, flags=re.DOTALL)


def css_rule_selector(text: str, index: int) -> str:
    """Best-effort selector for the rule containing `index`."""
    open_brace = text.rfind("{", 0, index)
    if open_brace == -1:
        return ""
    start = max(text.rfind("}", 0, open_brace), text.rfind("{", 0, open_brace)) + 1
    return text[start:open_brace].strip()[-160:]


def collect_css(path: Path, text: str, census: Census, findings: list[Finding]) -> None:
    for match in re.finditer(r"(min-height|height)\s*:\s*(\d+(?:\.\d+)?)px", text, re.IGNORECASE):
        selector = css_rule_selector(text, match.start())
        if not CONTROL_SELECTOR_RE.search(selector):
            continue
        value = int(float(match.group(2)))
        census.heights[value] += 1
        if value >= CONTROL_TALL_PX:
            findings.append(
                Finding(
                    "MEDIUM",
                    path,
                    line_number(text, match.start()),
                    "control-too-tall",
                    f"Controle com {value}px de altura. Confira a razao altura/rotulo (alvo 2,4-3,0x); acima de 3,4x quase sempre e stretch do flex ou padding de secao herdado.",
                )
            )

    for match in re.finditer(r"border-radius\s*:\s*([^;{}]+)", text, re.IGNORECASE):
        for token in re.finditer(r"(\d+(?:\.\d+)?)px", match.group(1)):
            value = int(float(token.group(1)))
            if value >= PILL_RADIUS_PX:
                continue  # pilula e papel semantico, nao degrau da gramatica
            census.radii[value] += 1

    spacing_prop = r"(?:padding|margin|gap|row-gap|column-gap)(?:-(?:top|right|bottom|left|inline|block)(?:-(?:start|end))?)?"
    for match in re.finditer(rf"\b{spacing_prop}\s*:\s*([^;{{}}]+)", text, re.IGNORECASE):
        for token in re.finditer(r"(\d+(?:\.\d+)?)px", match.group(1)):
            value = int(float(token.group(1)))
            census.spacing[value] += 1
            census.spacing_sites.append((path, line_number(text, match.start()), value))

    for match in re.finditer(
        r"border(?:-(?:top|right|bottom|left|inline|block))?(?:-color)?\s*:\s*[^;{}]*?(#[0-9a-fA-F]{3,8})",
        text,
    ):
        color = match.group(1).lower()
        census.border_colors[color] += 1
        ratio = contrast_vs_white(color)
        if 0 < ratio < BORDER_LIGHT_CONTRAST:
            findings.append(
                Finding(
                    "MEDIUM",
                    path,
                    line_number(text, match.start()),
                    "hairline-border",
                    f"Borda {color} da {ratio:.2f}:1 contra branco. Borda que delimita alvo ou campo precisa de 3:1 (WCAG 1.4.11) - confirme com check_contrast.py contra o fundo real.",
                )
            )


def tailwind_px(token: str) -> int | None:
    arbitrary = re.fullmatch(r"\[(\d+(?:\.\d+)?)px\]", token)
    if arbitrary:
        return int(float(arbitrary.group(1)))
    if re.fullmatch(r"\d+(?:\.\d+)?", token):
        return int(float(token) * 4)
    return None


def collect_markup(path: Path, text: str, census: Census, findings: list[Finding]) -> None:
    control_tag = re.compile(
        r"<(button|a|input|select|textarea)\b([^>]*)>|class(?:Name)?\s*=\s*[\"'`]([^\"'`]*\bbtn[\w-]*\b[^\"'`]*)[\"'`]",
        re.IGNORECASE,
    )
    for match in control_tag.finditer(text):
        attrs = match.group(2) or match.group(3) or ""
        for height in re.finditer(r"\b(?:min-)?h-([\w.\[\]]+)", attrs):
            value = tailwind_px(height.group(1))
            if value is None:
                continue
            census.heights[value] += 1
            if value >= CONTROL_TALL_PX:
                findings.append(
                    Finding(
                        "MEDIUM",
                        path,
                        line_number(text, match.start()),
                        "control-too-tall",
                        f"Controle com {value}px de altura. Confira a razao altura/rotulo (alvo 2,4-3,0x).",
                    )
                )

    for match in re.finditer(r"\brounded-(\[?[\w.]+\]?)", text):
        token = match.group(1)
        if token in ("full", "none"):
            continue
        arbitrary = re.fullmatch(r"\[(\d+(?:\.\d+)?)px\]", token)
        if arbitrary:
            census.radii[int(float(arbitrary.group(1)))] += 1
        elif token in TAILWIND_RADIUS_PX:
            census.radii[TAILWIND_RADIUS_PX[token]] += 1

    for match in re.finditer(r"\b(?:p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml|gap|gap-x|gap-y)-\[(\d+)px\]", text):
        value = int(match.group(1))
        census.spacing[value] += 1
        census.spacing_sites.append((path, line_number(text, match.start()), value))


def audit_file(path: Path, census: Census) -> list[Finding]:
    raw = path.read_text(encoding="utf-8", errors="ignore")
    if "ui-audit-ignore-file" in raw:
        return []
    findings: list[Finding] = []
    text = strip_comments(raw)

    collect_css(path, text, census, findings)
    collect_markup(path, text, census, findings)

    # --- affordance ---------------------------------------------------------
    for match in re.finditer(r"<(div|span|li|tr|td|p|section|article)\b([^>]*)>", text, re.IGNORECASE):
        attrs = match.group(2)
        if not re.search(r"\bon(?:Click|click)\s*=", attrs):
            continue
        if re.search(r"\brole\s*=", attrs):
            continue
        findings.append(
            Finding(
                "HIGH",
                path,
                line_number(text, match.start()),
                "fake-interactive",
                f"<{match.group(1)}> com onClick e sem role. Use <button>/<a> real, ou role + tabIndex + handler de Enter/Espaco - os tres juntos.",
            )
        )

    for match in re.finditer(r"<(div|span)\b([^>]*\bcursor-pointer\b[^>]*)>", text, re.IGNORECASE):
        if re.search(r"\brole\s*=|\bon(?:Click|click)\s*=", match.group(2)):
            continue
        findings.append(
            Finding(
                "MEDIUM",
                path,
                line_number(text, match.start()),
                "cursor-only-affordance",
                "cursor-pointer sem role nem handler: ou e falso affordance, ou o alvo esta com cursor como unico sinal. Cursor nao existe no toque nem no teclado.",
            )
        )

    if not re.search(r"focus-visible", text, re.IGNORECASE):
        add(
            findings,
            path,
            text,
            r"outline\s*:\s*none|\boutline-none\b",
            "HIGH",
            "focus-killed",
            "outline removido e nenhum :focus-visible no arquivo. Anel de foco e piso de acessibilidade, nao estetica.",
        )

    for match in re.finditer(r"<button\b([^>]*)>(.{0,400}?)</button>", text, re.IGNORECASE | re.DOTALL):
        attrs, inner = match.group(1), match.group(2)
        if re.search(r"aria-label|aria-labelledby|\btitle\s*=", attrs, re.IGNORECASE):
            continue
        has_glyph = re.search(r"<svg|<[A-Z]\w*(?:Icon)?\s*/?>|\bIcon\b", inner)
        visible_text = re.sub(r"<[^>]*>|\{[^{}]*\}|\s", "", inner)
        if has_glyph and not visible_text:
            findings.append(
                Finding(
                    "HIGH",
                    path,
                    line_number(text, match.start()),
                    "icon-button-unnamed",
                    "Botao so de icone sem aria-label. Sem nome acessivel ele nao existe pra teclado nem pra leitor de tela.",
                )
            )

    # --- target -------------------------------------------------------------
    for match in re.finditer(rf"<({'|'.join(NATIVE_INTERACTIVE_TAGS)})\b([^>]*)>", text, re.IGNORECASE):
        attrs = match.group(2)
        dims = [tailwind_px(token) for token in re.findall(r"\b[hw]-([\w.\[\]]+)", attrs)]
        dims = [value for value in dims if value is not None]
        if len(dims) >= 2 and max(dims) < TARGET_MIN_PX:
            findings.append(
                Finding(
                    "HIGH",
                    path,
                    line_number(text, match.start()),
                    "target-too-small",
                    f"Alvo de {max(dims)}px. Piso e 24x24 CSS px (WCAG 2.5.8). Mantenha o icone no tamanho visual e cresca a area com padding ou pseudo-elemento.",
                )
            )

    # --- estados ------------------------------------------------------------
    add(
        findings,
        path,
        text,
        r"\bdisabled:opacity-\d+|:disabled\s*\{[^}]*\bopacity\s*:[^}]*\}",
        "MEDIUM",
        "opacity-disabled",
        "Disabled tratado por opacidade. Isso apaga borda, icone e rotulo juntos e derruba o contraste de tudo. Use um par de token proprio, com rotulo ainda >= 3:1.",
    )
    add(
        findings,
        path,
        text,
        r"\b(?:hover|focus|active):(?:border-[024]\b|p[xytrbl]?-\d|h-\d|w-\d|text-(?:xs|sm|base|lg|xl))",
        "MEDIUM",
        "state-shifts-box",
        "Estado mudando metrica de caixa (borda, padding, altura ou tamanho de fonte): o conteudo pula no hover/foco. Use box-shadow inset, outline com offset, ou reserve a espessura no repouso.",
    )
    for match in re.finditer(r"class(?:Name)?\s*=\s*[\"'`]([^\"'`]*\bhover:[^\"'`]*)[\"'`]", text):
        value = match.group(1)
        if re.search(r"\bfocus(?:-visible)?:", value):
            continue
        if not re.search(r"\b(?:btn|button|cursor-pointer|link)\b", value, re.IGNORECASE):
            continue
        findings.append(
            Finding(
                "MEDIUM",
                path,
                line_number(text, match.start()),
                "hover-without-focus",
                "Alvo com estado de hover e sem par de focus-visible. Quem navega por teclado fica sem feedback nenhum.",
            )
        )

    return findings


def suggest_grid(values: Counter, keep: int = 3, span: tuple[int, int] | None = None) -> str:
    """Grade sugerida: os degraus mais usados, pela moda - nao pela media."""
    pool = Counter(
        {value: count for value, count in values.items() if span is None or span[0] <= value <= span[1]}
    )
    if not pool:
        return "-"
    ranked = sorted(pool.items(), key=lambda item: (-item[1], item[0]))[:keep]
    return " / ".join(str(value) for value, _ in sorted(ranked))


def render_census(census: Census, findings: list[Finding]) -> None:
    def line(label: str, counter: Counter, limit: int, span: tuple[int, int] | None = None) -> None:
        if not counter:
            print(f"{label:<22} -")
            return
        shown = " ".join(f"{value}px({count})" for value, count in sorted(counter.items()))
        verdict = (
            "ok"
            if len(counter) <= limit
            else f"ACIMA DO LIMITE ({limit}) -> grade sugerida: {suggest_grid(counter, span=span)}"
        )
        print(f"{label:<22} {len(counter)} valores  {shown}")
        print(f"{'':<22} {verdict}")

    print("=== Censo ===")
    line("altura de controle", census.heights, 4, CONTROL_HEIGHT_RANGE)
    line("raio", census.radii, 4)

    if census.border_colors:
        shown = " ".join(f"{color}({count})" for color, count in census.border_colors.most_common(6))
        verdict = "ok" if len(census.border_colors) <= 3 else "ACIMA DO LIMITE (3) - borda sem papel definido"
        print(f"{'cor de borda':<22} {len(census.border_colors)} valores  {shown}")
        print(f"{'':<22} {verdict}")
    else:
        print(f"{'cor de borda':<22} -")

    if census.spacing:
        off = sorted(value for value in census.spacing if value >= 8 and value % 4 != 0)
        shown = " ".join(f"{value}px({count})" for value, count in sorted(census.spacing.items()))
        print(f"{'espacamento':<22} {len(census.spacing)} valores  {shown}")
        print(f"{'':<22} fora de multiplo de 4: {', '.join(str(v) for v in off) if off else 'nenhum'}")
    else:
        print(f"{'espacamento':<22} -")

    targets = sum(1 for f in findings if f.rule == "target-too-small")
    tall = sum(1 for f in findings if f.rule == "control-too-tall")
    print(f"{'alvo < 24px':<22} {targets}")
    print(f"{'controle >= 60px':<22} {tall}")
    print()


def spacing_findings(census: Census) -> list[Finding]:
    findings: list[Finding] = []
    for path, line, value in census.spacing_sites:
        if value < 8 or value % 4 == 0:
            continue
        if census.spacing[value] >= 3:
            continue  # repeated enough to read as a deliberate token
        findings.append(
            Finding(
                "MEDIUM",
                path,
                line,
                "spacing-off-scale",
                f"{value}px em espacamento: fora de multiplo de 4 e usado {census.spacing[value]}x no projeto. Valor improvisado - suba pro degrau da escala.",
            )
        )
    return findings


def main() -> int:
    parser = argparse.ArgumentParser(description="Inventario e auditoria de craft de interface.")
    parser.add_argument("paths", nargs="+", type=Path, help="Arquivos ou diretorios")
    parser.add_argument("--max-findings", type=int, default=200)
    parser.add_argument("--census-only", action="store_true", help="So o censo, sem lista de achados")
    parser.add_argument("--fail-on", choices=("high", "medium", "none"), default="high")
    args = parser.parse_args()

    files = iter_files(args.paths)
    census = Census(Counter(), Counter(), Counter(), Counter(), [])
    findings: list[Finding] = []
    for file_path in files:
        findings.extend(audit_file(file_path, census))
    findings.extend(spacing_findings(census))

    render_census(census, findings)

    if args.census_only:
        return 0

    if not findings:
        print(f"Auditoria de UI passou: {len(files)} arquivos.")
        return 0

    order = {"HIGH": 0, "MEDIUM": 1, "LOW": 2}
    findings.sort(key=lambda item: (order.get(item.severity, 9), str(item.path), item.line, item.rule))
    print("=== Achados ===")
    for finding in findings[: args.max_findings]:
        print(f"{finding.severity} {finding.path}:{finding.line} [{finding.rule}] {finding.message}")
    if len(findings) > args.max_findings:
        print(f"... mais {len(findings) - args.max_findings} achado(s) ocultos")

    if args.fail_on == "none":
        return 0
    if args.fail_on == "medium":
        return 1
    return 1 if any(item.severity == "HIGH" for item in findings) else 0


if __name__ == "__main__":
    raise SystemExit(main())
