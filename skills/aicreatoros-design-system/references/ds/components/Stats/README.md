# Stats

Faixa de indicadores em grade, separados por linha de 1 px, num só contorno de canto 16.

**Quando usar.** No topo de um painel do período: até oito números curtos lado a lado ("Assinantes 12.400", "Abertura 48,2%", "Descadastros 38", "Receita média R$ 1,50"), cada um com rótulo, valor, variação e um rodapé que diz de onde o número vem ("eram 12.026 em 31 ago", "5.977 abriram · meta 50%").

**O que você fornece.**
- `children`: `Stat`; cada um perde o card e vira célula.
- `cols`: máximo de colunas da faixa (padrão 8). Cada célula tem no mínimo 168 px, então a faixa quebra antes do máximo quando falta largura; abaixo de 860 px o máximo cai para 4 e abaixo de 560 px para 2.
- `ink`: faixa sobre tinta.

**Faça.**
- Com oito indicadores, deixe o `Stat` enxuto: rótulo, valor, `Delta` e rodapé com o número de origem em `<b>`. Ícone e `Sparkline` ficam para faixas de até quatro.
- Unidade antes do número vai em `<small>` dentro do valor ("R$" em "R$ 18,6 mil").

Classes do kit: `.stats`, `.stats.ink`.
