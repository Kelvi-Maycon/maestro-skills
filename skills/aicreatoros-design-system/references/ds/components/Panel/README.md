# Panel

Card de painel com cabeçalho: contexto em mono acima, título em 17/600, legenda cinza e ferramentas à direita. Com `sections`, vira o painel do período: faixa de indicadores e corpo em duas colunas.

**Quando usar.** Para agrupar uma visualização com o que ela mede: "Funil do período". Com `sections`, para o resumo de um período: "Desempenho da newsletter, 1 – 14 set 2026".

**O que você fornece.**
- `kicker` (opcional): recorte e período em mono acima do título (`.kick`, "Newsletter · 1 – 14 set 2026").
- `title`, `caption` (opcional) e `tools` (opcional: um nó, ou lista de nós que vai num `.panel-tools`: `Segmented` e `Button`). Marque uma palavra do título com `<em>` ("Desempenho da *newsletter*").
- `children`: a visualização e, se houver, a leitura dela em `.help` abaixo de um `.dash`.
- `flush` ou `sections`: painel sem respiro (`article.card.panel`). `stats` recebe um `Stats` abaixo do cabeçalho. `sections`: `[{ kicker, title, caption, tools, content }]`; a primeira ocupa 2/3 e a segunda 1/3, empilhadas em tela estreita.

**Faça.**
- Na seção de origem, use `StackBar`, `Breakdown` e `Insight` nessa ordem.

Classes do kit: `.card`, `.pad`, `.panel`, `.panel-head`, `.panel-tools`, `.panel-body`.
