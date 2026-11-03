# Sparkline

Linha de tendência sem eixo, com área clara embaixo e um ponto no último valor.

**Quando usar.** Dentro de `Stat`, para o formato de 7 a 30 dias: "Assinantes de 1 a 14 set". Mostra direção, não valor exato.

**O que você fornece.**
- `values`: números da série; a escala vai do menor ao maior, com 4 de folga em cima e embaixo.
- `highlight`: linha em laranja. Uma por faixa, no indicador que o painel quer mostrar.
- `label` (opcional): resumo para leitor de tela; sem ele fica oculta e o rodapé diz o que importa.

**Não faça.**
- Não use para comparar valores entre dias; isso é `Chart`.

Classes do kit: `.sparkline`, `.sparkline.hi`.
