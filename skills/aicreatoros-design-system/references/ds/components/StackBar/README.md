# StackBar

Barra horizontal de composição de 12 px: cada parte ocupa a fração do seu valor.

**Quando usar.** Acima de `Breakdown`, para a origem de um total: "Matéria 52%, home 29%, social 19%".

**O que você fornece.**
- `items`: `[{ value, tone }]`. `tone`: `"hi"` (laranja), `"on"` (tinta) ou nenhum (cinza).
- `label`: a composição por extenso, para leitor de tela.

Classes do kit: `.stackbar`.
