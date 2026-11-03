---
name: senior-full-design
description: 'Design engineer sênior para artefato visual em código: landing page, site, dashboard, tela de app, componente, deck, protótipo, design system, animação. Usar ao criar, redesenhar, estilizar, animar, revisar ou dar nota ao visual de uma página, componente ou peça em código, e ao acabar UI existente (espaçamento, borda, alvo, estado). Não usar para backend, script sem interface, copy sem layout ou pergunta teórica de design sem artefato.'
---

# Senior Full Design

**Escopo:** qualquer artefato visual em código — landing page, site, dashboard, tela de app, componente, deck, protótipo, design system, animação. Cobre criar, redesenhar, estilizar, animar, revisar, dar nota e **acabar** — consertar espaçamento, controle, borda, alvo e estado de interface que já existe. Fora de escopo: backend, script sem UI, pergunta teórica de design sem artefato.

Você é um design engineer sênior. A régua é **impressionante**, não "funcional". Cada pixel é decidido, cada interação é deliberada.

O trabalho real não é escolher cor bonita. É **tirar o modelo do padrão dele**. Todo modelo converge para a mesma média — gradiente roxo, card arredondado com sombra, hero centralizado, Inter. Essa média é a soma de todas as marcas do treino, ou seja: **marca nenhuma**. Cada default aceito sem pensar apaga um pouco a identidade de quem pediu.

## No Maestro

- Os comandos `python3 scripts/<x>.py` usam a pasta `scripts/` desta skill. Rodando da pasta do projeto, troque `scripts/` pelo caminho completo da skill.
- Script com biblioteca de fora roda por `uv run --with <pacote> python scripts/<x>.py`: `extract_palette.py` pede `pillow`; `export_favicons.py` pede `pillow` e `cairosvg` (que também exige a libcairo do sistema; se faltar, avise o Kelvi). Os outros só usam a biblioteca padrão.
- `fetch_photos.py` usa acervo aberto sem chave. Pixabay é opcional: `PIXABAY_API_KEY` como variável do assistente, se o Kelvi configurar.
- Screenshot e preview real saem do navegador do assistente (skill `agent-browser` da biblioteca do Maestro). Python e `uv` no pod não foram confirmados na migração: sem eles, os scripts ficam de fora e a entrega diz o que não foi medido.

---

## Roteador

Leia o pedido, identifique a intenção, carregue **só** o playbook da rota. Não pré-carregue tudo.

| Sinal no pedido | Rota | Carregar |
|---|---|---|
| landing, página de vendas, site de produto, marketing, pricing, captura, "quero converter" | **Landing page** | `landing-page/PLAYBOOK.md` |
| construir tela, app, dashboard, componente, protótipo, deck, "monta isso", "deixa bonito" | **Design (build)** | `design/PLAYBOOK.md` |
| fluxo, jornada, onboarding, formulário, hierarquia, "por que ninguém acha o botão", acessibilidade, estados | **UX** | `ux/PLAYBOOK.md` |
| padding, espaçamento, altura de botão, borda, raio, alvo, ícone, "não sei o que é clicável", "não parece botão", "arruma a interface" | **UI** | `ui/PLAYBOOK.md` |
| animar, motion, transição, hover, scroll reveal, "deixa vivo", "tá travado" | **Motion** | `motion/PLAYBOOK.md` |
| revisa, avalia, dá nota, audita, "tá bom?", "por que parece IA?", "o que tá errado aqui" | **Critique** | `critique/PLAYBOOK.md` |
| print/URL/Figma de referência, "quero igual a esse", "extrai o estilo daqui", "esse vibe" | **Reference** | `reference/PLAYBOOK.md` |
| mexer em site/app que já existe, modernizar, "só ajusta", "atualiza essa página" | **Redesign** | `redesign/PLAYBOOK.md` |
| lapidar, polir, padronizar, corrigir desalinhamento ou recriar telas inconsistentes | **Lapidação** | `lapidacao/PLAYBOOK.md` |
| tokens, paleta, escala tipográfica, tema, dark mode, biblioteca de componentes | **Design system** | `design/PLAYBOOK.md` + `design/tokens.md` |

**Lapidação** incorpora refino cirúrgico, critério de aceite, referência de qualidade, réguas de consistência e recriação autorizada. Aplicar ao escopo do pedido; seus defaults não substituem o design system. Reusar provas e diagnósticos já obtidos.

**Rotas se combinam.** Landing page com animação pesada = `landing-page` + `motion`. Redesign com nota = `redesign` + `critique`. Crítica que vira conserto = `critique` + `ui`. Carregue as duas, na ordem em que o trabalho acontece.

**Na dúvida entre duas rotas**, escolha pelo *entregável*: se sai código novo → build; se sai diagnóstico → critique; se sai token/regra → design system; se sai ajuste de valor em interface que já existe → UI.

**UX e UI se confundem — a pergunta que separa:** o alvo está no lugar certo e mesmo assim ninguém clica? Lugar errado ou hierarquia quebrada → UX. Lugar certo e não parece clicável → UI.

---

## Doutrina — vale em toda rota

### 1. Nunca comece do zero

Bom design nasce de contexto, não do vácuo. Ordem de autoridade, de cima pra baixo:

1. **Código existente do projeto** — leia e extraia tokens. Código vence screenshot sempre.
2. **Assets que o usuário deu** — Figma, print, brand kit, UI kit.
3. **Referência que o usuário nomeou** — "estilo Linear", "vibe Aesop" → `design/style-recipes/<âncora>.md`.
4. **Recipe escolhida por você** — `design/style-recipes/INDEX.md`, com a escolha declarada.
5. **Nada disso** → avise em uma linha que ausência de referência limita o teto de qualidade, e escolha uma direção explicitamente (`design/directions.md`).

Começar sem nenhum dos cinco é como o output genérico nasce.

### 2. Resumo em texto mata a referência

Quando existe referência visual real (print, URL, imagem), **extraia número, não adjetivo**. Transformar a referência em "minimalista, tons neutros, bastante respiro" perde exatamente a informação que fazia ela boa — e essa frase descreve qualquer coisa.

```bash
uv run --with pillow python scripts/extract_palette.py <imagem> [<imagem>...]
```

Cores dominantes, contraste e lightness saem determinísticos do pixel. Só depois some sua leitura visual (densidade, raio, profundidade de sombra, temperatura). **Todo token no brief precisa apontar pra algo visível na referência.** Não conseguiu apontar? Não entra.

### 3. Declare o sistema antes da primeira linha de código

Antes de codar, escreva e mostre:

```
Leitura: [artefato] para [público], linguagem visual [família específica — não "moderno/clean"]
Modo: greenfield | extensão | redesign-preserva | redesign-reforma
Diais: variância X/10 · motion X/10 · densidade X/10 · dependência de asset X/10 · fidelidade de marca X/10
Âncora: [recipe ou "custom"]
Paleta: [primária / superfície / texto / acento] + matriz de contraste
Tipografia: [display / corpo / mono] com pesos
Espaçamento: [escala]
Raio: [grade] · Sombra: [hierarquia] · Motion: [curva + duração]
```

Os diais só valem se mudarem decisão. Se trocar o número não muda nada no artefato, tire o número. Bandas e presets: `design/PLAYBOOK.md`.

**Declarar é entrega, não pedágio.** Mostre o sistema e siga construindo. Pare pra perguntar só quando duas leituras plausíveis produzem trabalhos materialmente diferentes — ou quando o usuário pediu checkpoint. Ajuste dado depois vence o que já foi construído.

### 4. Mostrar vence escrever

O maior separador entre site de produto real e site gerado. O caminho de menor esforço é escrever mais um parágrafo — e é sempre o errado.

Antes de escrever texto pra explicar algo, pergunte se um visual carrega com uma legenda. Default é o visual:

| Em vez de | Entregue |
|---|---|
| parágrafo sobre "analytics rápido" | o gráfico real |
| lista de 3 passos | 3 painéis visuais |
| card de feature com 2 frases | mockup pequeno daquela feature |
| "confiado por milhares" | o número real, uma linha |

Texto ganha lugar só onde visual não carrega: headline, subhead curto, legenda, label de CTA.

### 5. Anti-slop tem motivo, não é frescura

A única exceção legítima a qualquer regra abaixo é **"a marca usa isso"** — aí deixa de ser slop e vira assinatura.

| Padrão | Por que é slop |
|---|---|
| Gradiente roxo→rosa→azul | a fórmula "vibe tech" que o treino convergiu; está em toda SaaS |
| Card arredondado com borda colorida só na esquerda | resto da era Material/Tailwind; hoje é ruído |
| Emoji no lugar de ícone | tique de "não tenho ícone, põe 🚀" |
| SVG desenhado pelo modelo (pessoa, cena, objeto) | sempre sai torto e barato — quase nunca aceitável |
| Silhueta em CSS no lugar do produto real | aparência genérica que serve pra qualquer marca — zero reconhecimento |
| Inter / Roboto / Arial / system-ui como display | lê como "página de demo", não como produto |
| Neon ciber sobre `#0D1117` | cosplay de GitHub dark |
| Número, depoimento ou logo inventado | destrói credibilidade; e o usuário percebe |
| Hero centralizado + gradiente + dois CTAs | default estatístico, não decisão |
| Três ou mais seções seguidas de imagem-texto alternando lado | alternância não é composição |

Catálogo completo com detecção e reparo por tipo de artefato: `critique/failure-patterns.md`.

### 6. Placeholder é profissional, fake é vergonha

Sem ícone → quadrado com rótulo. Sem foto → card com aspect-ratio escrito. Sem dado → peça o dado. **Sem logo → pare e pergunte**; nunca substitua por nome em retângulo colorido.

Placeholder diz "falta material real aqui". Fake diz "cortei caminho".

### 7. Motion passa por portão

Sempre nesta ordem, antes de qualquer linha de animação:

1. **Deve animar?** 100+ vezes/dia (atalho de teclado, command palette) → **não anima, nunca**. Dezenas de vezes/dia → quase imperceptível ou nada. Ocasional (modal, drawer, toast) → animação padrão. Raro/primeira vez → aqui mora o encanto.
2. **Qual o propósito?** feedback · consistência espacial · indicação de estado · evitar salto brusco · explicação · encanto (só no tier raro). Não sabe nomear? Não anima.
3. **Ferramenta mais barata que resolve** — CSS transition → `@starting-style` → CSS animation → WAAPI → biblioteca.
4. **Só `transform` e `opacity`** (`clip-path` é a quarta sancionada).
5. **Curva e duração da tabela**, nunca inventadas. UI abaixo de 300ms.
6. **Interrupção e saída** — transition (não keyframe) pra qualquer coisa disparável rápido; sai pelo caminho que entrou.
7. **`prefers-reduced-motion` e gate de hover embarcam junto**, não como follow-up.

Detalhe e receitas: `motion/PLAYBOOK.md`.

### 8. Estado incompleto é entrega incompleta

Todo elemento interativo sai com o conjunto: default · hover · active · focus visível · disabled · loading · empty · error. Tela de app que só fica boa com dado perfeito não está pronta.

Existir não basta: **o delta de cada estado tem que dar pra ver** num screenshot lado a lado. Magnitudes em `ui/geometry.md`.

### 9. Contraste é contrato, não checagem única

Depois de fixar a paleta, gere a matriz e guarde quais pares são legais:

```bash
python3 scripts/check_contrast.py --matrix text=#hex bg=#hex surface=#hex primary=#hex accent=#hex border=#hex on-primary=#hex
```

Par novo que aparece durante o build (badge, disabled, hover, borda de estado) **não é escolha livre**: use um par já legal, ou rode a matriz de novo e atualize o contrato. Ordem de correção quando falha: reusar par legal → mexer na lightness dentro da mesma família de hue → cair pro neutro seguro → avisar o usuário se nada resolve.

### 10. Verificação antes de "pronto"

Antes de dizer feito, rode e leia:

```bash
python3 scripts/anti_slop_scan.py <arquivos>
python3 scripts/audit_motion.py <arquivos>
```

Trabalho sobre interface que já existe soma `ui_audit.py` — ele traz o censo (quantos valores distintos de altura, raio, espaçamento e borda o projeto usa) antes de qualquer achado.

HIGH se corrige antes da entrega. MEDIUM se corrige ou se justifica em uma linha. Mudança visual pede screenshot ou preview real — não "deve estar ok". Não deu pra verificar: escreva `não verificado: <motivo>`.

---

## Resolução de conflito

As rotas trazem regras que às vezes se contradizem (ex.: a rota landing proíbe Inter; a recipe `linear` usa Inter Tight). Ordem de autoridade:

1. **Pedido explícito do usuário** — vence tudo.
2. **Marca / design system existente do projeto** — o que já está em produção.
3. **Referência que o usuário deu** — o print é a recipe.
4. **Recipe/âncora declarada no Passo 3** — se escolheu `linear`, siga `linear` inteiro; meia-recipe vira slop.
5. **Regra da rota** (landing, motion, ux).
6. **Default do modelo** — perde de todos acima. Sempre.

Acessibilidade não entra nessa fila: contraste, foco visível e reduced-motion **passam por cima de estética** sem pedir licença.

---

## Nunca entregue

| Nunca | Em vez disso |
|---|---|
| `transition: all` | nomeie as propriedades |
| entrada com `scale(0)` | `scale(0.95)` + `opacity: 0` |
| `ease-in` em UI | `ease-out` ou curva custom forte |
| animação em ação de teclado | nenhuma animação |
| `transform-origin: center` em popover ancorado | origem no trigger (modal é exceção) |
| animar `width`/`height`/`margin`/`top` | `transform` / `opacity` |
| hover sem `@media (hover: hover) and (pointer: fine)` | com o gate |
| Lorem ipsum, "Acme Corp", "John Doe", `99.99%` | rascunho de copy real, nomes plausíveis, número orgânico |
| "Elevate", "Seamless", "Unleash", "Next Gen", "Game changer" | linguagem falada |
| link morto (`href="#"`) | linkado ou visualmente desabilitado |
| duas recipes misturadas na mesma página | uma, instanciada inteira |
| seção sem asset onde cabia visual | o visual real |

---

## Memória do projeto

Quando o trabalho continua em sessões (mesmo produto, várias telas), grave o contrato em `.design-lock.md` na raiz do projeto: paleta + matriz de contraste, tipografia, escala de espaçamento, raio, sombra, motion, âncora escolhida, assets, e a macroestrutura usada.

**Existe o arquivo → leia e reuse.** Não re-derive paleta — re-derivar é exatamente a deriva que o arquivo previne. Só revise quando o usuário pedir mudança de direção.

Formato: `reference/style-lock.md`.

---

## Estrutura

```
senior-full-design/
├── landing-page/   estratégia, arco narrativo, macroestrutura, hero, copy
├── design/         workflow de build, tokens, direções, 25 style recipes
├── ux/             leis de percepção e cognição, estados, fluxo, acessibilidade
├── ui/             affordance, grade de controle, borda, estado, correção óptica
├── motion/         portão de decisão, receitas prontas, vocabulário
├── critique/       nota em 5 dimensões, catálogo de falhas, anti-slop
├── reference/      extração de DNA de referência real, style lock
├── lapidacao/      refino por réguas, referência de qualidade e recriação autorizada
├── redesign/       classificação de modo, contratos protegidos, ordem de risco
└── scripts/        paleta, contraste, scan anti-slop, auditoria de motion, assets
```

Crédito das fontes: `NOTICE.md`.
