# Stat

Peça de painel: rótulo, apoio à direita, número com variação, visualização e rodapé, em grade de quatro áreas.

**Quando usar.** Para um indicador com contexto: "Assinantes 12.400, +374 no período", "Taxa de abertura 48,2%, meta 50%". Isolado vira card; dentro de `Stats`, célula de faixa.

**O que você fornece.**
- `label` ("Assinantes") e `icon` (nome do sprite: sai numa caixa de 28 px antes do rótulo; em card avulso, sempre).
- `note` (opcional): texto curto ao lado do número ("leituras até o fim", "faltam 3 para a meta").
- `aside`: texto curto (vira mono cinza: "1 – 14 set", "De 400") ou um nó que recebe a classe `stat-aside` (`Badge`).
- `value`, `unit` e `size`, repassados ao `Metric`.
- `delta` (opcional): nó, normalmente `Delta`, ao lado do número.
- `viz` (opcional): `Sparkline`, `Meter`, `HBars`, `Pips` ou `Spark`; recebe a classe `stat-viz`.
- `row` (opcional): linha lado a lado no lugar de `value` e `viz` (`Ring` com número e legenda).
- `foot`: rodapé em 12 px sobre um fio; `<b>` destaca o número ("<b>5.977</b> de 12.400"). Com `Pips`, o rodapé é uma `Legend` com os tons `on`, `hi` e `off`.

**Faça.**
- Dê a amostra ou o período no rodapé.
- Em cards lado a lado, use o mesmo `size` ("lg") e dê número a todos: o número e o rodapé caem no mesmo y da fileira.

**Não faça.**
- Não ponha duas visualizações na mesma peça.

Classes do kit: `.stat`, `.stat-label`, `.stat-ico`, `.stat-aside`, `.stat-value`, `.stat-viz`, `.stat-row`, `.stat-foot`.
