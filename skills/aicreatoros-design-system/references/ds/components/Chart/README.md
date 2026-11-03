# Chart

Gráfico de barras por dia com grade, eixo em pt-BR, linha de média e barra destacada com anotação. Passar o mouse mostra "valor · data".

**Quando usar.** No corpo de um `Panel` com seções: "Assinaturas por dia, 1 a 14 set".

**O que você fornece.**
- `values` e `label` (resumo para leitor de tela: média, pico e dia).
- `labels` (eixo x, padrão 1, 2, 3…) e `dates` (texto da dica, padrão igual a `labels`: "14 set").
- `max` (opcional) e `ticks` (padrão 4). Sem `max`, o topo arredonda para passo 1, 2, 2,5 ou 5 × 10^k (64 em 4 divisões vira 0 · 20 · 40 · 60 · 80).
- `average`: `true` calcula a média, número usa esse valor; sem ele, não há linha.
- `highlight`: índice ou lista de índices em laranja; `annotation` vai sobre o último destacado ("Edição 07").

**Faça.**
- Ponha uma `Legend` no cabeçalho da seção quando houver destaque e média.

Classes do kit: `.chart`, `.chart-plot`, `.chart-grid`, `.chart-avg`, `.chart-bars`, `.chart-x`.
