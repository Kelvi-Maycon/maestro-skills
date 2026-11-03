#!/usr/bin/env python3
"""
slopscan - metricas deterministicas de AI slop em prosa (PT-BR e EN).

Nao decide se o texto e bom. Devolve sinais que o agente usa pra triar.
Zero dependencias. Python 3.8+.

Uso:
    python3 slopscan.py arquivo.md
    python3 slopscan.py arquivo.md --json
    cat texto.txt | python3 slopscan.py -

Arquivo que *inventaria* tells (um catalogo) dispara em si mesmo. Marque com a linha
<!-- slopscan: catalogo --> e o scanner passa a medir so estrutura nesse arquivo.
    python3 slopscan.py pasta/ --glob '*.md'

Metricas (a headline e ANCORA):
    ancora      % de frases com fato verificavel (numero, nome proprio, token de codigo).
                Operacionaliza o teste de portabilidade: frase sem ancora poderia
                estar em qualquer texto sobre qualquer coisa.
    burstiness  coeficiente de variacao do tamanho das frases. Humano varia, IA nao.
    ttr         type-token ratio (diversidade de vocabulario).
    trigrama    % de trigramas repetidos (IA recicla as mesmas 3 palavras).
    uniforme    CV do tamanho dos paragrafos.
    tells       densidade de marcadores lexicais por tier (1000 palavras).
    forma       contagem de padroes estruturais (contraste binario, tricolon,
                cauda -ndo/-ing, bullet com rotulo em negrito, title case...).
    sujeira     travessao, aspas curvas, caractere invisivel, emoji em heading.
"""

import argparse
import json
import os
import re
import sys
import unicodedata
from collections import Counter

# ---------------------------------------------------------------- lexico

TELLS_T1_EN = [
    "delve", "tapestry", "testament to", "underscore", "underscores", "underscoring",
    "leverage", "leveraging", "multifaceted", "realm of", "interplay", "it's worth noting",
    "it is worth noting", "it's important to note", "in today's", "navigating the",
    "ever-evolving", "embark on", "a myriad of", "cornerstone of", "paradigm shift",
    "game-changer", "game changer", "at its core", "the real question is",
    "let's dive in", "let's delve", "in conclusion", "i hope this helps",
    "great question", "you're absolutely right", "the future looks bright",
    "stands as a", "serves as a", "plays a vital role", "plays a crucial role",
    "pivotal moment", "indelible mark", "rich tapestry", "without further ado",
]
TELLS_T1_PT = [
    "mergulhar fundo", "vamos mergulhar", "e importante ressaltar", "vale ressaltar",
    "vale destacar", "e importante destacar", "no cenario atual", "no mundo de hoje",
    "nos dias de hoje", "cada vez mais presente", "desempenha um papel fundamental",
    "desempenha um papel crucial", "um marco", "uma verdadeira", "verdadeiro divisor de aguas",
    "divisor de aguas", "em suma", "em resumo", "por fim", "concluindo",
    "espero ter ajudado", "otima pergunta", "voce esta absolutamente certo",
    "o futuro e promissor", "nao apenas", "nao somente", "mas tambem",
    "no que diz respeito", "de forma eficaz", "de maneira eficaz", "poderoso aliado",
    "leque de possibilidades", "gama de", "e fundamental entender",
    "vamos explorar", "neste artigo", "ao longo deste", "abordaremos",
]
TELLS_T2_EN = [
    "crucial", "pivotal", "vibrant", "robust", "seamless", "foster", "fostering",
    "enhance", "enhancing", "showcase", "showcasing", "notably", "moreover",
    "furthermore", "additionally", "garner", "bolster", "utilize", "facilitate",
    "streamline", "holistic", "nuanced", "landscape", "empower", "unlock",
    "harness", "elevate", "meticulous", "intricate", "profound", "transformative",
    "groundbreaking", "cutting-edge", "state-of-the-art", "world-class", "nestled",
    "boasts", "highlighting", "ensuring", "reflecting", "symbolizing", "encompassing",
]
TELLS_T2_PT = [
    "crucial", "fundamental", "robusto", "robusta", "poderoso", "poderosa",
    "otimizar", "potencializar", "alavancar", "impulsionar", "aprimorar",
    "eficiente", "eficaz", "inovador", "inovadora", "revolucionario", "revolucionaria",
    "significativo", "significativa", "relevante", "essencial", "primordial",
    "abrangente", "holistico", "estrategico", "estrategica", "solucao completa",
    "alem disso", "ademais", "outrossim", "por conseguinte", "dessa forma",
    "nesse sentido", "vale lembrar", "destacando", "garantindo", "refletindo",
    "proporcionando", "possibilitando", "contribuindo para",
]

# padroes estruturais: (rotulo, regex). CASE_SENSITIVE roda sem re.I.
CASE_SENSITIVE = {"heading_title_case"}
FORMA = [
    ("contraste_binario", r"\b(?:n[aã]o (?:[ée]|se trata de) (?:apenas|s[oó]|somente)\b.{0,60}?\b(?:mas|[ée])\b|not (?:just|only|merely)\b.{0,60}?\bbut\b|it'?s not\b.{0,40}?\bit'?s\b)"),
    ("pergunta_retorica", r"(?m)^[^.\n?]{5,80}\?\s+(?:A resposta|The answer|Simple|Simples|Spoiler|Resposta:)"),
    ("cauda_participio", r",\s+(?:highlighting|underscoring|emphasizing|ensuring|reflecting|symbolizing|fostering|showcasing|encompassing|destacando|garantindo|refletindo|simbolizando|proporcionando|possibilitando|contribuindo)\b"),
    ("bullet_rotulo_negrito", r"(?m)^\s*[-*+]\s+\*\*[^*\n]{2,40}\*\*\s*[:.]|^\s*[-*+]\s+\*\*[^*\n]{2,40}[:.]\*\*"),
    ("heading_title_case", r"(?m)^#{1,6}\s+(?:[A-ZÀ-Þ][a-zà-ÿ]*\s+){2,}[A-ZÀ-Þ][a-zà-ÿ]+\s*$"),
    ("heading_pergunta", r"(?m)^#{1,6}\s+(?:What|Why|How|When|Por que|Como|O que|Quando)\b[^\n]*\?\s*$"),
    ("falso_intervalo", r"\bfrom\s+\w+.{0,40}?\bto\s+\w+|\bdesde\s+\w+.{0,40}?\bat[eé]\s+\w+"),
    ("gancho_suspense", r"\b(?:Here'?s the (?:thing|kicker|catch)|The catch\?|The kicker\?|Sound familiar\?|Plot twist|E aqui est[aá] o|O detalhe [ée]|Adivinha|Pois [ée])\b"),
    ("encerramento_generico", r"\b(?:in conclusion|to sum up|overall,|the future looks|exciting times|em suma|em resumo|concluindo|por fim,|o futuro (?:e|é) promissor)\b"),
    ("atribuicao_vaga", r"\b(?:experts?\s+(?:say|argue|believe|agree)|studies show|research suggests|industry reports|observers have|especialistas (?:dizem|afirmam|apontam|acreditam)|estudos (?:mostram|apontam|indicam)|pesquisas (?:mostram|indicam)|dados (?:mostram|apontam)(?!\s+que\s+\d))\b"),
    ("agencia_falsa", r"\b(?:the (?:data|market|culture|decision|complaint|system) (?:tells|rewards|shifts|emerges|becomes)|o (?:mercado|dado|sistema|processo) (?:recompensa|revela|mostra|emerge))\b"),
    ("meta_secao", r"\b(?:in this (?:article|section|post|guide)|neste artigo|nesta se[cç][aã]o|ao longo deste|vamos (?:explorar|entender|ver)|let'?s (?:explore|break this down|dive))\b"),
]

SUJEIRA = [
    ("travessao", r"[—–]"),
    ("aspas_curvas", r"[“”‘’]"),
    ("invisivel", r"[​‌‍­﻿]"),
    ("emoji_heading", r"(?m)^#{1,6}\s*[\U0001F300-\U0001FAFF☀-➿]"),
    ("emoji_bullet", r"(?m)^\s*[-*+]\s*[\U0001F300-\U0001FAFF☀-➿]"),
    ("utm_ia", r"utm_source=(?:chatgpt|openai|copilot|perplexity)"),
    ("marcacao_citacao", r"citeturn\d|contentReference\[oaicite|oai_citation"),
    ("placeholder", r"\[(?:Your Name|INSERT[^\]]*|SEU NOME|INSIRA[^\]]*|TODO)\]"),
]

STOP = set("""a o as os um uma uns umas de do da dos das em no na nos nas por para com sem sob sobre
entre que se e ou mas nem como quando onde qual quais quem cujo ao aos à às pelo pela pelos pelas
isso isto aquilo ele ela eles elas eu voce você nos nós lhe lhes seu sua seus suas meu minha
the a an and or but if of to in on at by for with from as is are was were be been being this that
these those it its it's we you they he she i not no yes do does did have has had will would can could
""".split())

CATALOGO_MARK = re.compile(r"<!--\s*slopscan:\s*catalogo\s*-->")

SENT_SPLIT = re.compile(r"(?<=[.!?])[\s\n]+")
WORD = re.compile(r"[0-9A-Za-zÀ-ÖØ-öø-ÿ][0-9A-Za-zÀ-ÖØ-öø-ÿ'-]*")
CODE_TOKEN = re.compile(r"`[^`]+`|\b\w+\(\)|\b[a-z]+_[a-z_]+\b|\b[a-z]+[A-Z]\w*\b|[./][\w./-]+\.\w{1,5}\b|\b\d+(?:\.\d+)?\s*(?:ms|s|kb|mb|gb|%|x)\b")


def mask_secondhand(text):
    """Neutraliza texto de segunda mao antes de contar tells e formas.

    Termo marcado dentro de aspas, crase, titulo ou exemplo esta sendo *discutido*,
    nao *usado*. Contar isso e o falso positivo classico: pune quem documenta slop.
    Estruturas (ancora, burstiness, paragrafo) continuam medidas no texto integral.
    """
    text = re.sub(r"`[^`\n]+`", " ", text)
    text = re.sub(r'"[^"\n]{1,200}"', " ", text)
    text = re.sub(r"[“][^”\n]{1,200}[”]", " ", text)
    text = re.sub(r"(?m)^>\s?.*$", " ", text)
    return text


def strip_md(text):
    """Remove blocos de codigo, frontmatter, links e citacoes antes de medir prosa."""
    text = re.sub(r"^---\n.*?\n---\n", "", text, flags=re.S)
    text = re.sub(r"```.*?```", " ", text, flags=re.S)
    text = re.sub(r"~~~.*?~~~", " ", text, flags=re.S)
    text = re.sub(r"(?m)^ {4,}\S.*$", " ", text)
    text = re.sub(r"(?m)^>.*$", " ", text)
    text = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", text)
    return text


def norm(s):
    s = unicodedata.normalize("NFD", s.lower())
    return "".join(c for c in s if unicodedata.category(c) != "Mn")


def cv(values):
    if len(values) < 3:
        return None
    mean = sum(values) / len(values)
    if mean == 0:
        return 0.0
    var = sum((v - mean) ** 2 for v in values) / len(values)
    return round((var ** 0.5) / mean, 3)


def sentences(prose):
    out = []
    for raw in SENT_SPLIT.split(prose):
        s = raw.strip()
        s = re.sub(r"(?m)^\s*[-*+]\s+|^#{1,6}\s+|^\s*\d+[.)]\s+", "", s)
        if len(WORD.findall(s)) >= 4:
            out.append(s)
    return out


def has_anchor(sent):
    """Frase ancorada: carrega numero, nome proprio ou token de codigo/caminho."""
    if re.search(r"\d", sent):
        return True
    if CODE_TOKEN.search(sent):
        return True
    words = WORD.findall(sent)
    for i, w in enumerate(words):
        if i == 0:
            continue
        if w[0].isupper() and not w.isupper() and norm(w) not in STOP:
            return True
        if w.isupper() and len(w) >= 2:
            return True
    return False


def count_tells(prose_norm, words_total, lexicon):
    hits = Counter()
    for term in lexicon:
        t = norm(term)
        pat = r"\b" + re.escape(t).replace(r"\ ", r"\s+") + r"\b"
        n = len(re.findall(pat, prose_norm))
        if n:
            hits[term] = n
    total = sum(hits.values())
    per_1k = round(total * 1000 / words_total, 2) if words_total else 0.0
    return total, per_1k, hits.most_common(12)


def scan(text, name="<stdin>", bruto=False, tipo="prosa"):
    prose = strip_md(text)
    prose_norm = norm(prose if bruto else mask_secondhand(prose))
    text_masked = text if bruto else mask_secondhand(text)
    sents = sentences(prose)
    words = WORD.findall(prose)
    n_words = len(words)

    paras = [p for p in re.split(r"\n\s*\n", prose) if len(WORD.findall(p)) >= 12]
    lens = [len(WORD.findall(s)) for s in sents]

    anchored = sum(1 for s in sents if has_anchor(s))
    ancora = round(100 * anchored / len(sents), 1) if sents else None

    low = [norm(w) for w in words if norm(w) not in STOP and len(w) > 2]
    ttr = round(len(set(low)) / len(low), 3) if low else None
    tri = [tuple(low[i:i + 3]) for i in range(len(low) - 2)]
    tri_rep = round(100 * (len(tri) - len(set(tri))) / len(tri), 2) if tri else None

    catalogo = bool(CATALOGO_MARK.search(text))
    if catalogo:
        prose_norm = ""

    t1_en, t1_en_k, t1_en_top = count_tells(prose_norm, n_words, TELLS_T1_EN)
    t1_pt, t1_pt_k, t1_pt_top = count_tells(prose_norm, n_words, TELLS_T1_PT)
    t2_en, t2_en_k, _ = count_tells(prose_norm, n_words, TELLS_T2_EN)
    t2_pt, t2_pt_k, _ = count_tells(prose_norm, n_words, TELLS_T2_PT)

    forma = {}
    for label, pat in ([] if catalogo else FORMA):
        flags = re.S if label in CASE_SENSITIVE else re.I | re.S
        n = len(re.findall(pat, text_masked, flags=flags))
        if n:
            forma[label] = n

    sujeira = {}
    for label, pat in ([] if catalogo else SUJEIRA):
        n = len(re.findall(pat, text))
        if n:
            sujeira[label] = n

    return {
        "arquivo": name,
        "tipo": tipo,
        "catalogo": catalogo,
        "palavras": n_words,
        "frases": len(sents),
        "ancora_pct": ancora,
        "frases_sem_ancora": len(sents) - anchored if sents else 0,
        "burstiness_cv": cv(lens),
        "paragrafo_cv": cv([len(WORD.findall(p)) for p in paras]),
        "ttr": ttr,
        "trigrama_rep_pct": tri_rep,
        "tells": {
            "t1_en": t1_en, "t1_en_por_1k": t1_en_k,
            "t1_pt": t1_pt, "t1_pt_por_1k": t1_pt_k,
            "t2_en": t2_en, "t2_en_por_1k": t2_en_k,
            "t2_pt": t2_pt, "t2_pt_por_1k": t2_pt_k,
            "top": [x for x in (t1_en_top + t1_pt_top) if x],
        },
        "forma": forma,
        "sujeira": sujeira,
        "alertas": alertas(ancora, cv(lens), cv([len(WORD.findall(p)) for p in paras]),
                           tri_rep, t1_en + t1_pt, round(t2_en_k + t2_pt_k, 1), forma, sujeira, len(sents), len(paras), tipo),
    }


ANCORA_MIN = {"prosa": 55, "referencia": 35}


def alertas(ancora, bcv, pcv, tri, t1, t2k, forma, sujeira, n_sents, n_paras=0, tipo="prosa"):
    a = []
    piso = ANCORA_MIN.get(tipo, 55)
    if ancora is not None and n_sents >= 8:
        if ancora < piso * 0.65:
            a.append(("S1", f"ancora {ancora}% - a maioria das frases serve pra qualquer assunto"))
        elif ancora < piso:
            a.append(("S2", f"ancora {ancora}% - boa parte do texto nao prova nada"))
    if bcv is not None and n_sents >= 8:
        if bcv < 0.35:
            a.append(("S1", f"burstiness {bcv} - ritmo metronomico, frases todas do mesmo tamanho"))
        elif bcv < 0.45:
            a.append(("S2", f"burstiness {bcv} - pouca variacao de ritmo"))
    if pcv is not None and pcv < 0.25 and n_paras >= 5:
        a.append(("S1", f"paragrafos uniformes (cv {pcv}) - forma de template"))
    if tri is not None and tri > 4:
        a.append(("S2", f"trigramas repetidos {tri}% - o texto recicla as mesmas expressoes"))
    if t1:
        a.append(("S3", f"{t1} marcador(es) tier 1 - quase nunca sobrevivem em texto humano"))
    if t2k and t2k > 12:
        a.append(("S3", f"densidade tier 2 {t2k}/1k - cluster de vocabulario de IA"))
    estrutural = {"contraste_binario", "cauda_participio", "bullet_rotulo_negrito",
                  "atribuicao_vaga", "agencia_falsa", "meta_secao", "encerramento_generico"}
    for k, v in forma.items():
        tier = "S2" if k in estrutural else "S3"
        a.append((tier, f"forma: {k} x{v}"))
    for k, v in sujeira.items():
        tier = "S0" if k in {"placeholder", "marcacao_citacao", "utm_ia", "invisivel"} else "S3"
        a.append((tier, f"sujeira: {k} x{v}"))
    return sorted(a, key=lambda x: x[0])


def render(r):
    L = []
    L.append(f"== {r['arquivo']}  ({r['palavras']} palavras, {r['frases']} frases)")
    L.append("")
    L.append(f"  ANCORA        {fmt(r['ancora_pct'], '%')}   (alvo >= {ANCORA_MIN.get(r.get('tipo', 'prosa'), 55)}% em '{r.get('tipo', 'prosa')}'; {r['frases_sem_ancora']} frases sem fato verificavel)")
    L.append(f"  burstiness    {fmt(r['burstiness_cv'])}   (alvo >= 0.45)")
    L.append(f"  paragrafo cv  {fmt(r['paragrafo_cv'])}   (alvo >= 0.30)")
    L.append(f"  ttr           {fmt(r['ttr'])}")
    L.append(f"  trigrama rep  {fmt(r['trigrama_rep_pct'], '%')}   (alvo <= 4%)")
    t = r["tells"]
    L.append(f"  tells         t1 en={t['t1_en']} pt={t['t1_pt']} | t2/1k en={t['t2_en_por_1k']} pt={t['t2_pt_por_1k']}")
    if t["top"]:
        L.append("                " + ", ".join(f"{k} x{v}" for k, v in t["top"][:8]))
    L.append("")
    if r.get("catalogo"):
        L.append("  modo catalogo: o arquivo inventaria tells, entao lexico/forma/sujeira nao contam.")
        L.append("  Metricas de estrutura (ancora, burstiness, paragrafo, trigrama) continuam valendo.")
        L.append("")
    if r["alertas"]:
        L.append("  alertas por severidade:")
        for tier, msg in r["alertas"]:
            L.append(f"    [{tier}] {msg}")
    else:
        L.append("  alertas: nenhum")
    L.append("")
    L.append("  Sinal, nao veredito. S0/S1 mandam na ordem do conserto; S3 e o ultimo.")
    return "\n".join(L)


def fmt(v, suf=""):
    return "n/a  " if v is None else f"{v}{suf}".ljust(6)


def main():
    ap = argparse.ArgumentParser(description="Metricas deterministicas de AI slop.")
    ap.add_argument("alvo", help="arquivo, pasta ou - para stdin")
    ap.add_argument("--json", action="store_true")
    ap.add_argument("--glob", default="*.md")
    ap.add_argument("--bruto", action="store_true", help="nao mascarar exemplos entre aspas/crases")
    ap.add_argument("--tipo", choices=["prosa", "referencia"], default="prosa",
                    help="prosa: artigo, copy, post (piso de ancora 55%%). referencia: spec, skill, doc de regras (piso 35%%)")
    args = ap.parse_args()

    results = []
    if args.alvo == "-":
        results.append(scan(sys.stdin.read(), "<stdin>", args.bruto, args.tipo))
    elif os.path.isdir(args.alvo):
        import fnmatch
        for root, _, files in os.walk(args.alvo):
            for f in sorted(files):
                if fnmatch.fnmatch(f, args.glob):
                    p = os.path.join(root, f)
                    try:
                        results.append(scan(open(p, encoding="utf-8").read(), p, args.bruto, args.tipo))
                    except Exception as e:
                        print(f"skip {p}: {e}", file=sys.stderr)
        results.sort(key=lambda r: (r["ancora_pct"] if r["ancora_pct"] is not None else 100))
    else:
        results.append(scan(open(args.alvo, encoding="utf-8").read(), args.alvo, args.bruto, args.tipo))

    if args.json:
        print(json.dumps(results if len(results) > 1 else results[0], ensure_ascii=False, indent=2))
    else:
        print("\n".join(render(r) for r in results))


if __name__ == "__main__":
    main()
