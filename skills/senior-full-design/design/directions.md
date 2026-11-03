# Consultor de direção

Aciona quando o pedido é genuinamente vago — "faz algo bonito", "não sei que estilo quero", "me dá umas direções" — e não existe contexto de design nenhum.

**Não aciona** quando: o usuário deu Figma/print/referência (vá pro workflow principal) · o usuário nomeou uma direção ("animação estilo lançamento da Apple") · é ajuste pequeno ou chamada de ferramenta.

---

## O mecanismo: 3 direções diferentes, não 10 perguntas

Perguntar dez coisas genéricas de gosto ("você prefere moderno ou clássico?") não produz informação — produz adjetivo. Em vez disso, proponha **três direções de escolas claramente diferentes**, pra o contraste ser visível e a escolha significar algo.

Cada direção precisa ter:

- **Um designer ou estúdio nomeado** — "arquitetura de informação estilo Pentagram", não "minimalista"
- **2–3 linhas de por que essa direção serve o contexto dele**
- **Pistas visuais de assinatura** — 3–4 detalhes concretos: cor, tipografia, layout, motion
- Opcional: uma obra de referência famosa pra ele olhar

**Regra dura: nunca três da mesma linha.** Se as três vierem da mesma escola o usuário não distingue, e o contraste que tornava a escolha útil colapsa.

---

## Biblioteca de escolas

| Escola | Vibe | Âncoras | Serve pra |
|---|---|---|---|
| **Arquitetura de informação** | racional, orientado a dado, contido | Pentagram, Edward Tufte, Massimo Vignelli, Bloomberg Terminal | seguro / profissional / B2B / produto de dados |
| **Editorial / minimalista** | respiro, tipografia refinada, luxo quieto | Kenya Hara (MUJI), Apple HIG, Dieter Rams, Aesop | premium / sofisticado / silencioso |
| **Ferramenta moderna / builder SaaS** | detalhe em fio de cabelo, dark quente, um acento só, chip mono | Linear, Vercel, Raycast, Notion | ferramenta de dev / SaaS B2B / IA / infra |
| **Motion / experimental** | ousado, generativo, sensorial | Field.io, Active Theory, Resn | distintivo / filme de lançamento / momento de marca |
| **Brutalista / cru** | anti-design, honesto, sem polimento | Balenciaga, Are.na, capas da Bloomberg Businessweek | diferenciação / confiança / contracultura |
| **Humanista quente** | acessível, orgânico, com toque de mão | Mailchimp (início), Stripe Press, Headspace | lifestyle / educação / B2C acolhedor / bem-estar |

---

## Depois que ele escolhe

A direção escolhida vira o contexto de design do Passo 2 em diante. Documente no `.design-lock.md` do projeto pra as decisões seguintes poderem referenciar.

**Direção → ponto de partida concreto:** escolhida a escola, abra 2–3 recipes daquela escola em `style-recipes/` e apresente as opções com valores reais. Escolheu *Arquitetura de informação* → `style-recipes/pentagram.md`, `style-recipes/bloomberg-terminal.md`, `style-recipes/tufte-dataink.md`.

Cada arquivo de recipe traz paleta, tipografia, espaçamento, raio, sombra, motion e movimentos de assinatura prontos pra colar na declaração do sistema. É pra isso que o catálogo existe — pra você não inventar esses valores na hora, que é a causa raiz do mingau genérico.

**Carregue só a recipe que vai usar.** Catálogo completo e os três índices (por escola, por cenário, por modo claro/escuro): `style-recipes/INDEX.md`.

---

## Quando nenhuma das 25 recipes serve

Nesta ordem:

1. **Releia o pedido** — às vezes a recipe certa fica óbvia em retrospecto (uma "ferramenta de pesquisa orientada a dado" é quase sempre `tufte-dataink` ou `bloomberg-terminal`, mesmo sem o usuário citar).
2. **Combine duas de propósito**, com enquadramento explícito e um porquê que se sustente ("paleta Aesop na grade Pentagram, pra um catálogo de apotecária com ossatura editorial"). Sem esse porquê, remix lê como confusão, não como originalidade.
3. **Volte pro consultor** — proponha três escolas diferentes e deixe escolher.
4. **Articule uma recipe nova** — nomeie a âncora, liste valores concretos, pegue o aval, e só então construa.

Derivar em silêncio pra fora do catálogo produz exatamente o default de IA que o catálogo existe pra evitar.
