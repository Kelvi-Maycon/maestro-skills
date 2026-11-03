# Rota: Critique

Duas coisas diferentes moram aqui. Decida qual antes de começar:

| Modo | Quando | O que faz |
|---|---|---|
| **Nota** | "tá bom?", "avalia", "dá uma nota", "por que parece IA?" | pontua 5 dimensões, devolve lista ranqueada. **Não edita.** |
| **Revisão de mudança** | "revisa esse diff/branch/PR" | revisa o que a mudança causou, não o codebase inteiro |

Os dois modos **diagnosticam e param**. Quando o pedido é consertar — e o conserto é espaçamento, controle, borda, alvo ou estado — a nota vira entrada de `../ui/PLAYBOOK.md`.

Critique o design, nunca quem desenhou. "Você não pensou nisso" não ajuda e não é o papel. "Esse elemento não justifica o lugar — considere remover" é o enquadramento certo.

---

## Autocrítica antes de entregar

Antes de finalizar qualquer build, pontue o **planejado** de 1 a 5 em seis eixos e revise o que ficar abaixo de 3. Pegar fraqueza aqui é muito mais barato do que pegar depois:

1. **Mostrar vs. contar** — quanta seção é algo pra olhar, e não parágrafo com ícone decorativo?
2. **Filosofia** — todo detalhe rastreia até a direção escolhida?
3. **Hierarquia** — passa no teste do olho apertado?
4. **Especificidade** — os valores vieram do sistema declarado ou foram improvisados?
5. **Contenção** — o que dá pra deletar sem piorar?
6. **Variedade** — a forma da página difere da última entregue?

---

## Modo nota — as 5 dimensões

### 1. Alinhamento à filosofia
Todo detalhe rastreia até a direção escolhida, ou derivou pra colcha de retalhos genérica?

| Nota | Padrão |
|---|---|
| 9–10 | tudo encarna a direção; nada lê como emprestado de outro lugar |
| 7–8 | direção certa, assinaturas presentes, 1–2 desvios menores |
| 5–6 | intenção visível, mas elementos estranhos diluem (ex.: "minimalismo" com 6 cards por linha) |
| 3–4 | só mímica de superfície; os valores por baixo não foram entendidos |
| 1–2 | nenhuma relação discernível com direção nenhuma |

Procure: os movimentos de assinatura da âncora estão de fato presentes? Cor, tipo, layout e motion concordam entre si? Existe elemento que contradiz a própria escolha?

### 2. Hierarquia visual
O olho vai pra onde deveria ir?

| Nota | Padrão |
|---|---|
| 9–10 | fluxo natural pelo caminho pretendido, zero atrito de leitura |
| 7–8 | primário e secundário claros, 1–2 pontos turvos |
| 5–6 | título e corpo se distinguem, mas as camadas do meio colapsam |
| 3–4 | informação chapada, sem ponto de entrada |
| 1–2 | caótico — não se sabe onde olhar primeiro |

Procure: razão título/corpo ≥ 2,5× (4–6× no hero)? Cor, peso e tamanho construindo 3–4 níveis? O respiro guia ativamente? **Teste do olho apertado passa?**

### 3. Qualidade de craft
Execução no nível do pixel.

| Nota | Padrão |
|---|---|
| 9–10 | alinhamento, espaçamento e cor impecáveis |
| 7–8 | refinado no geral, 1–2 problemas menores |
| 5–6 | basicamente alinhado, mas espaçamento inconsistente e cor sem sistema |
| 3–4 | erro óbvio de alinhamento, espaçamento caótico, cor demais |
| 1–2 | desleixado, parece rascunho |

Procure: espaçamento vindo de uma escala? Elementos da mesma classe com o mesmo valor? Contagem de cor controlada (tipicamente ≤ 4)? Famílias tipográficas ≤ 2? Bordas alinhando de verdade?

### 4. Funcionalidade
Cada elemento justifica o lugar?

| Nota | Padrão |
|---|---|
| 9–10 | tudo serve a um objetivo, zero redundância |
| 7–8 | conduzido por função, com decoração menor cortável |
| 5–6 | usável, mas decoração óbvia competindo por atenção |
| 3–4 | forma acima de função; a pessoa trabalha pra achar informação |
| 1–2 | decoração afoga a comunicação |

**Teste da deleção:** "se eu apagar isso, o design piora?" Se não → apaga. Vale pra fundo com padrão, sombra, badge, ícone decorativo, seção inteira.

### 5. Originalidade
Evita clichê sem perder coerência?

| Nota | Padrão |
|---|---|
| 9–10 | refrescante; expressão própria **dentro** da filosofia escolhida |
| 7–8 | tem ideia própria, não é template preenchido |
| 5–6 | mediano, lê como execução de template |
| 3–4 | clichê pesado (orbe de gradiente pra "IA", balão de fala pra "conversa") |
| 1–2 | montagem de template e stock |

Procure: passou pela lista anti-slop? Existe ao menos uma decisão "inesperada mas certa"? Tem elemento gritando "IA fez isso"?

---

## Peso por tipo de artefato

Não pontue tudo com o mesmo peso. O que importa muda:

| Tipo | Mais importante | Secundário | Pode relaxar |
|---|---|---|---|
| Landing / marketing | funcionalidade, hierarquia | originalidade | — precisa ser bom em tudo |
| Dashboard / produto de dados | funcionalidade, craft | hierarquia | originalidade (clareza ganha) |
| Deck em HTML | hierarquia, funcionalidade | craft | originalidade (legibilidade ganha) |
| Protótipo mobile | funcionalidade, craft | hierarquia | filosofia (usabilidade ganha) |
| Animação de lançamento / hero film | originalidade, hierarquia | filosofia | funcionalidade (é o momento) |
| Editorial / portfólio | originalidade, filosofia | hierarquia | funcionalidade (vibe manda) |
| Documentação | funcionalidade, hierarquia | craft | originalidade (achar a resposta ganha) |
| Protótipo pra teste com usuário | funcionalidade, hierarquia | craft | originalidade (testa o fluxo) |

---

## Os dez achados mais comuns

| # | Problema | Correção com valor |
|---|---|---|
| 1 | Clichê tech de IA (orbe de gradiente, chuva digital, placa de circuito, rosto de robô) | metáfora abstrata no lugar de símbolo literal |
| 2 | Hierarquia de tamanho insuficiente (título < 2,5× corpo) | corpo 16px → título 48–64px; hero pode ir a 6× |
| 3 | Cor demais (5+ sem estrutura de primária/secundária) | 1 primária + 1 secundária + 1 acento + escala neutra |
| 4 | Espaçamento improvisado | uma escala só; nada fora dela |
| 5 | Respiro insuficiente | espaço vazio em pelo menos ~40% da área (60%+ em minimalismo) |
| 6 | Fonte demais (3+ famílias) | no máximo 2; riqueza vem de peso e tamanho |
| 7 | Alinhamento misto (esquerda, centro e direita no mesmo bloco) | escolha um (normalmente esquerda); centro só em hero e citação |
| 8 | Decoração eclipsando conteúdo | teste da deleção |
| 9 | Neon ciber em azul-escuro padrão | base escura não-default: cinza quente profundo, quase-preto com sugestão de cor |
| 10 | Densidade errada pro meio | slide: 1 ideia por página · capa: 1 foco · doc: pode ser denso com navegação clara |

Catálogo por tipo de artefato, com detecção e reparo: `failure-patterns.md`. Portões numerados e varredura mecânica: `anti-slop.md`.

---

## Varredura mecânica

Roda antes de entregar a crítica — pega o que o olho deixa passar:

```bash
python3 scripts/anti_slop_scan.py <arquivos>
python3 scripts/audit_motion.py <arquivos>
python3 scripts/check_contrast.py --matrix text=#hex bg=#hex primary=#hex accent=#hex on-primary=#hex
```

HIGH entra na crítica como crítico. MEDIUM entra como importante, salvo quando o brief justifica.

---

## Formato de saída

```markdown
## Crítica

**Geral: X,X / 10** — Excelente (8+) / Bom (6–7,9) / Precisa trabalho (4–5,9) / Reprovado (<4)

**Por dimensão**
- Filosofia: X/10 — [uma frase]
- Hierarquia: X/10 — [uma frase]
- Craft: X/10 — [uma frase]
- Funcionalidade: X/10 — [uma frase]
- Originalidade: X/10 — [uma frase]

### Mantém
- [específico, em linguagem de design — não "as cores estão legais", e sim
  "o terracota abafado contra o off-white quente lê como confiante e editorial"]

### Corrige (por severidade)

**1. [Nome do problema]** — ⚠️ Crítico / ⚡ Importante / 💡 Polimento
- Hoje: [como está]
- Por quê: [ancorado num princípio, não em gosto]
- Correção: [mudança concreta com valor — "título de 32px pra 56px", não "aumenta o título"]

### Três ganhos rápidos (se só houver 5 minutos)
- [ ] [maior impacto pelo menor tempo]
- [ ] [segundo]
- [ ] [terceiro]
```

---

## Anti-padrões da própria crítica

❌ **Afirmação vaga de gosto.** "As cores estão estranhas" não serve. "A saturação do acento compete com a primária; baixe o chroma pra subordinar" serve.

❌ **Elogio sem especificidade.** "Ficou ótimo" ensina zero. Diga *o que* está bom e *por quê*.

❌ **Misturar severidade.** Bug crítico de hierarquia na mesma lista de um ajuste de polimento. Ordene ⚠️ → ⚡ → 💡.

❌ **Mais de sete itens.** Sobrecarga. Passou disso, agrupe: "cinco inconsistências de espaçamento" é um item, não cinco.

❌ **Correção sem princípio.** Toda correção referencia o mecanismo (hierarquia, proximidade, contraste, craft) pra a pessoa entender o *porquê*, não só o *o quê*.

---

## Modo revisão de mudança

Quando o alvo é um diff, branch ou PR — não uma tela.

**A pergunta é "eu piorei isso?"** Reporte o que a mudança causou; fique quieto sobre o que ela apenas encostou. Três achados pré-existentes é cortesia; trinta é outra revisão que ninguém pediu.

1. **Resolva o escopo primeiro.** Sem alvo informado: o que está à frente do merge-base + o não-commitado; se a árvore está suja, só o não-commitado; se não há nada, **pergunte** — nunca invente `HEAD~1..HEAD`. Exclua lockfile, snapshot, gerado e binário, e diga o que excluiu.
2. **Arquivo alterado é evidência, não o assunto.** O assunto é o **raio de alcance**: as superfícies em que aquele arquivo renderiza. Expanda um salto (quem importa e chama); dois saltos só pra token, tema e primitivo compartilhado, onde uma linha atinge o produto inteiro. Limite os consumidores revisados e diga quantos ficaram de fora.
3. **Leia as linhas removidas.** Regressão é invisível no estado pós-mudança. `aria-label` que sumiu, foco que sumiu, `prefers-reduced-motion` que sumiu — tudo só aparece no lado `-` do diff.
4. **Classifique cada achado:** `Introduzido` (a mudança criou) · `Regressão` (a mudança enfraqueceu algo que funcionava) · `Pré-existente` (estava lá antes). Classifique pelo que o diff **tocou**, não por qual arquivo o achado mora.
5. **Segure a mudança à intenção declarada.** Leia título, descrição e commits, e revise se a interface entrega o que eles prometem. É isso que revela a mudança **incompleta**: variante nova aplicada em alguns estados e não em todos; componente novo sem empty/loading/error; controle adicionado numa superfície e não nas irmãs.
6. **Nunca mexa na árvore de trabalho.** Revisão é leitura. Buscar ref de PR pode; dar checkout não — reescreve os arquivos que a pessoa tem abertos.

Pré-existente fica fora do teto de achados e fora do veredito: mudança cujo único achado é pré-existente é **aprovada**. Veredito é **bloqueia** se sobrar qualquer crítico, **aprova** caso contrário.
