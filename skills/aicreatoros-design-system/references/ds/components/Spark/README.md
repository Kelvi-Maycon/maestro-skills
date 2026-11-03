# Spark

Barras verticais de uma série curta, com a última em laranja.

**Quando usar.** Dentro de `Stat`, para mostrar o formato de 7 a 30 dias sem eixo: "Assinaturas por dia, pico em 14 set".

**O que você fornece.**
- `values`: números da série; a altura sai do maior valor.
- `height` (opcional, px; o kit usa 40, o painel 48).
- `label` (opcional): resumo para leitor de tela; sem ele o gráfico fica oculto e o rodapé diz o que importa.

**Não faça.**
- Não use para série longa ou com eixo; isso é gráfico de verdade.

Classes do kit: `.spark`.
