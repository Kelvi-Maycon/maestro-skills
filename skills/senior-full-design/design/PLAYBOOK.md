# Rota: Design (build)

Construir artefato visual em código: tela, dashboard, componente, protótipo, deck, mockup, visualização. A identidade profissional muda com a tarefa — designer de UX, de motion, de slide, de dados — mas o meio é sempre código renderizado.

---

## Passo 0 — Verifique fato antes de qualquer coisa

Roda **antes** das perguntas de escopo. Quando o pedido cita produto, marca, SDK ou versão que você não tem certeza, busque. Nunca afirme fato instável de memória.

Gatilhos: o pedido nomeia produto/lib que você não conhece bem · timeline ou versão · você se pegou pensando "acho que é…", "deve ainda ser…", "provavelmente não lançou". Busca não resolveu? Pergunte. Não chute.

---

## Passo 1 — Perguntar ou não

Não dispare lista de pergunta por reflexo. Calibre:

| Situação | Perguntar? |
|---|---|
| "Faz um deck" (sem contexto, sem público) | Sim, bastante: público, duração, tom, variações |
| "Com esse PRD, deck de 10min pro time de eng" | Não. Tem contexto — construa |
| "Transforma esse print em protótipo clicável" | Só se a interação pretendida não estiver clara |
| "Desenha o onboarding do meu app de delivery" | Sim: usuários, fluxos, marca, variações |
| "Recria a UI do composer desse repo" | Não. Leia o código |
| "Faz algo bonito / não sei que estilo quero" | Vá pro **Consultor de direção** (`directions.md`) |

Pedido genuinamente vago + zero contexto de design → consultor de direção, **não** dez perguntas genéricas de gosto.

---

## Passo 2 — Junte contexto, por prioridade

1. **Recursos que o usuário deu** — print, Figma, codebase, UI kit → leia inteiro e extraia tokens
2. **Páginas existentes do produto** — peça pra revisar
3. **Boas práticas do setor** — pergunte quais marcas usar de referência
4. **Âncora nomeada** ("estilo Linear", "vibe Aesop") → leia **só** `style-recipes/<âncora>.md`
5. **Do zero** → avise que ausência de referência limita o teto, e escolha uma direção declarada

**Código ≫ screenshot.** Com codebase e print na mesa, invista em ler o código e extrair token. Reconstruir a partir do código dá qualidade muito acima de adivinhar do print.

Ao analisar referência, olhe: sistema de cor, esquema tipográfico, escala de espaçamento, estratégia de raio, hierarquia de sombra, caráter do motion, densidade de componente, tom da copy.

### Tarefa com marca envolvida — protocolo de asset

**Asset vence spec.** Marca é reconhecimento, e reconhecimento vem nesta ordem — **não de código hex**:

| Asset | Peso no reconhecimento | Quando é obrigatório |
|---|---|---|
| **Logo** (SVG/PNG, claro e escuro) | máximo | qualquer tarefa de marca — inegociável |
| **Foto do produto** (hero, detalhe, em uso) | altíssimo | produto físico |
| **Screenshot da UI** (versão atual, dado real limpo) | altíssimo | produto digital |
| Tokens de cor | médio, auxiliar | apoio |
| Tipografia | baixo sozinho | apoio |

- Não substitua foto real por silhueta em CSS — o resultado é "estética tech" genérica que serve pra qualquer marca.
- Logo é inegociável. Não achou depois de tentar de verdade: **pare e pergunte**.
- Guarde caminho dos assets na seção Assets do `.design-lock.md` e referencie por `<img src>`; não redesenhe.

Ordem de sourcing: press kit oficial → frame de vídeo de lançamento oficial → screenshot de App Store/Play → Wikimedia → gerado a partir de referência oficial → placeholder honesto "asset pendente".

---

## Passo 3 — Leitura e diais

Antes de escolher token, escreva a leitura. Infira quando o contexto basta; só pergunte se duas leituras plausíveis produzem trabalhos materialmente diferentes.

```
Leitura:
  artefato: landing / dashboard / protótipo / deck / visualização
  público: quem precisa entender, confiar ou agir
  linguagem visual: família específica — "SaaS de builder contido", "editorial cinético",
                    "humanista quente", "institucional data-first". Nunca "moderno" ou "clean".
  modo: greenfield / extensão / redesign-preserva / redesign-reforma
  restrições: marca, acessibilidade, plataforma, viewport, conteúdo, prazo, assets
```

### Os cinco diais (1 a 10)

**Variância visual** — quanto a composição se afasta do familiar.

| Faixa | Comportamento |
|---|---|
| 1–3 | grade estável, simetria, navegação familiar, zero surpresa |
| 4–6 | um ou dois movimentos assimétricos, ritmo de seção variado |
| 7–8 | direção de arte forte, momentos fora da grade, mais de uma família de layout |
| 9–10 | composição experimental — só quando compreensão e marca permitem |

**Intensidade de motion** — quanto significado é carregado pelo tempo.

| Faixa | Comportamento |
|---|---|
| 1–2 | estático, só feedback de estado |
| 3–4 | hover, focus, transição curta de entrada |
| 5–7 | revelações sequenciadas, coreografia de estado, resposta contida ao scroll |
| 8–10 | transição cinematográfica, pin, scrub, narrativa espacial |

**Densidade de informação** — informação útil por viewport, não poluição.

| Faixa | Comportamento |
|---|---|
| 1–3 | tipo galeria, uma ideia dominante, pausas generosas |
| 4–6 | densidade equilibrada de marketing/produto |
| 7–8 | analítico, operacional, comparativo |
| 9–10 | tipo cockpit — exige agrupamento forte e revelação progressiva |

**Dependência de asset** — quanto o resultado depende de imagem, screenshot, ilustração, identidade.

| Faixa | Comportamento |
|---|---|
| 1–3 | tipografia, dado ou estrutura de interface carregam sozinhos |
| 4–6 | alguns visuais-chave melhoram reconhecimento ou explicação |
| 7–10 | sem asset de alta fidelidade o trabalho falha |

Em 7+, inventarie os assets **antes** do layout. Não esconda asset faltando com CSS decorativo.

**Fidelidade de marca** — quanto a identidade existente precisa ser preservada.

| Faixa | Comportamento |
|---|---|
| 1–3 | identidade nova ou exploratória de propósito |
| 4–6 | adapta pistas reconhecíveis, permite evolução |
| 7–8 | preserva assets, tokens, voz e padrões de assinatura |
| 9–10 | nível extensão — o novo deve parecer nativo do sistema existente |

### Presets (ponto de partida, não obrigação)

| Brief | Variância | Motion | Densidade | Asset | Marca |
|---|---:|---:|---:|---:|---:|
| Landing SaaS mainstream | 6 | 5 | 4 | 6 | 5 |
| Estúdio criativo / campanha | 8 | 7 | 3 | 8 | 4 |
| Landing de ferramenta dev | 6 | 5 | 5 | 6 | 6 |
| Dashboard de dados | 4 | 3 | 8 | 3 | 7 |
| Serviço público | 3 | 2 | 6 | 3 | 9 |
| Apresentação editorial | 7 | 5 | 4 | 7 | 5 |
| Extensão de produto existente | igual | igual | igual | igual | 10 |
| Redesign · preserva | atual +1 máx | atual +1 máx | igual | igual | 9 |
| Redesign · reforma | 6–8 | 4–7 | igual ao conteúdo | 6–9 | 5–7 |

### Conflito entre diais

- **Variância alta + densidade alta** → mantenha navegação e grade estáveis; concentre a experimentação em uma camada só.
- **Motion alto + densidade alta** → anime transição e foco, não cada elemento.
- **Asset alto + fidelidade baixa** → estabeleça a bíblia visual antes de gerar ou buscar o conjunto.
- **Asset alto + fidelidade alta** → busque oficial primeiro; geração estende o mundo, nunca substitui material crítico de identidade.
- **Fidelidade alta + pedido de reforma** → nomeie explicitamente quais invariantes de marca sobrevivem antes de mudar a linguagem.
- **Acessibilidade** passa por cima de qualquer nota estética, sem pedir licença.

**Teste de conclusão:** se mudar um dial não muda nada no plano, o dial é decoração. Tire ou explicite o mapeamento.

---

## Passo 3b — Quatro perguntas de posicionamento

Antes de listar token, responda por artefato (ou por slide/tela/cena):

- **Papel narrativo** — hero, transição, dado, citação, fechamento? Cada um pede registro visual diferente.
- **Distância de visão** — 10cm no celular, 1m no laptop, 10m no projetor? Define escala tipográfica e densidade.
- **Temperatura visual** — quieto, energizado, autoritário, quente, sombrio, brincalhão?
- **Teste de capacidade** — esboce o thumbnail mentalmente: o conteúdo cabe nesse layout, ou vai estourar / ficar vazio?

Escolher estética no vácuo é a raiz do output genérico.

---

## Passo 4 — Declare o sistema, mostre, siga

Escreva em markdown e mostre antes de codar. Detalhe de valores: `tokens.md`.

```
Leitura + diais: [uma linha]
Âncora: [recipe ou "custom"]
Paleta: primária / secundária / neutra / acento + matriz de contraste
Tipografia: display / corpo / mono, com pesos
Espaçamento: unidade base e múltiplos
Raio: grande / pequeno / reto, por papel de componente
Sombra: elevação 1–5
Motion: curva, duração, gatilho
```

Escolheu uma recipe? **Cole os valores concretos dela** (paleta, tipografia, espaçamento, raio, sombra, motion) direto no bloco. O catálogo existe pra você não inventar esses valores na hora — inventar é a causa número um do mingau Inter + `#3b82f6`. Carregue **só o arquivo da recipe que vai usar**.

Mostre o bloco e siga construindo. Pare pra perguntar só quando duas leituras plausíveis produzem trabalhos materialmente diferentes — ou quando o usuário pediu checkpoint.

---

## Passo 5 — v0 antes do v1

Não segure a grande revelação. Antes dos componentes completos, monte um v0 visível: estrutura principal + tokens declarados + placeholders marcados (`[imagem 16:9]`, `[ícone]`) + a lista das suas suposições.

**Não inclui**: detalhe de conteúdo, biblioteca completa, todos os estados, motion.

Um v0 com suposições vale mais que um "v1 perfeito" que levou 3× o tempo — se a direção estava errada, o segundo vai inteiro pro lixo.

Mostre o v0 assim que existir e continue — ele é o ponto de correção barato, não um pedágio. Ajuste pedido sobre o v0 vence o que foi construído em cima dele.

---

## Passo 6 — Build completo

Componentes, estados, motion. Regras que valem sempre:

- **Não fabrique o que uma biblioteca de produção já entrega bem.** Gráfico, bento, tabela de preço e command palette feitos à mão são tell confiável de "IA construiu". Puxe a peça, e gaste o esforço de design **restilizando pros tokens travados** — essa passada de coerência é o trabalho de design real.
- **Detecte a stack antes de puxar qualquer registry.** Mandar `npx shadcn add` num projeto de HTML estático ou SwiftUI é falha real. Stack que não consome: porte o padrão à mão e diga que foi isso.
- Componente comportamental difícil (dialog, popover, select, toast, drag, virtualização) → use primitivo acessível pronto. `<div>` com listener não é dropdown.
- CSS Grid + Flexbox pra layout; custom properties pros tokens.
- Prefira cor da marca; precisando de variação, derive em `oklch()` — nunca invente hue nova do zero.
- `clamp()` pra tipografia fluida, `@container` pra responsividade de componente, `text-wrap: pretty` no corpo.
- `@media (prefers-color-scheme)` e `@media (prefers-reduced-motion)`.
- Arquivo grande (>1000 linhas) se quebra em módulos.
- Revisão grande: copie e renomeie (`v2`, `v3`) antes de reescrever, pra ter volta em um passo.
- Variação múltipla: **um arquivo com toggles**, não vários arquivos.

Ponto de decisão não-trivial no meio do build (mudança de abordagem de interação, variante de conteúdo, virada de layout) → decida pela leitura declarada, registre a escolha em uma linha na entrega e siga. Pare só quando errar custaria o build inteiro.

---

## Passo 7 — Variações

Variação existe pra **esgotar possibilidade e o usuário misturar**, não pra entregar a opção perfeita.

Explore em quatro dimensões, misturando conservador e ousado:

1. **Layout** — split, grade de cards, lista, timeline
2. **Visual** — paleta, tipografia, textura, camada
3. **Interação** — motion, feedback, navegação
4. **Criativo** — metáfora que quebra convenção, UX nova, conceito visual forte

Comece seguro dentro do sistema, depois empurre o limite progressivamente. **Troca de cor não é variação.** Variações precisam diferir em layout, densidade, motion ou modelo de interação. Promova só a vencedora.

---

## Passo 8 — Painel de ajuste

Deixe o usuário mexer em parâmetro ao vivo: cor de tema, tamanho de fonte, dark mode, espaçamento, variante, densidade, motion on/off.

Painel flutuante no canto inferior direito, **completamente escondido quando fechado** (o design tem que parecer final numa apresentação). Mesmo sem pedido, adicione 1–2 ajustes criativos — expõe o usuário a possibilidades que ele não pediria.

---

## Escala mínima

| Contexto | Mínimo |
|---|---|
| Apresentação 1920×1080 | texto ≥ 24px |
| Mockup mobile | alvo de toque ≥ 44px |
| Documento impresso | ≥ 12pt |
| Corpo de texto web | 16–18px |

---

## Conteúdo

- Nada de enchimento — todo elemento precisa justificar o lugar.
- **Não adicione seção por conta própria.** Achou que falta conteúdo? Pergunte; o usuário conhece o público dele.
- Placeholder vence dado fabricado, sempre.
- Página parecendo vazia é problema de layout, não de conteúdo. Resolva com composição, respiro e ritmo de escala — não enfiando texto.

---

## Checklist antes de entregar

- [ ] Passo 0 rodou se algum produto/marca específico foi citado
- [ ] Leitura e diais existem e influenciaram decisão real
- [ ] Modo classificado certo; contrato de preservação não mudou em silêncio
- [ ] Tarefa de marca: assets registrados no `.design-lock.md`, logo real, imagem de produto real
- [ ] Sem import quebrado, caminho de asset morto, markup inválido ou interação sem handler
- [ ] Regra responsiva existe pros viewports alvo
- [ ] Componentes interativos com hover / focus / active / disabled / loading; empty e error onde cabe
- [ ] Sem overflow nem truncamento; `text-wrap: pretty` aplicado
- [ ] Toda cor vem do sistema declarado — nenhuma hue solta
- [ ] Sem clichê de IA, salvo quando a marca usa
- [ ] Sem enchimento, sem dado fabricado
- [ ] Nomes semânticos, estrutura limpa, fácil de editar depois
- [ ] `python3 scripts/anti_slop_scan.py` e `audit_motion.py` sem HIGH

---

## Arquivos desta rota

| Preciso de | Leia |
|---|---|
| Valores de token: cor, tipo, espaço, raio, sombra, elevação, dark mode | `tokens.md` |
| Pedido vago, recomendar 3 direções diferentes | `directions.md` |
| Usuário nomeou âncora ("estilo Linear") | `style-recipes/<âncora>.md` — **só esse arquivo** |
| Comparar recipes depois de escolher a escola | `style-recipes/INDEX.md` |
| Dar nota, auditar, achar o que está errado | `../critique/PLAYBOOK.md` |
| Adicionar motion | `../motion/PLAYBOOK.md` |
| Extrair estilo de uma referência real | `../reference/PLAYBOOK.md` |
| Mexer em produto que já existe | `../redesign/PLAYBOOK.md` |
