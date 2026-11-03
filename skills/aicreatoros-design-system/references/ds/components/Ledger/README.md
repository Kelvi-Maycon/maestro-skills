# Ledger

Linha de quatro números grandes em Instrument Sans 46/500 tabular, cada um com rótulo, unidade separada, comparação opcional e a frase que diz de onde veio.

**Quando usar.** Dentro de `DataPanel`, para os números principais de um teste: aderência, tickets, dias, tempo por ticket.

**O que você fornece.**
- `items`: `[{ label, value, unit, compare, delta, note, highlight }]`. `value` é texto ("2,4"); `unit` vem separada ("min").
- `compare` e `delta` (opcionais): a linha de comparação abaixo do número. `delta` aceita nó ou `{ direction, tone, value }` ("16 p.p.", `tone: "bad"`); `compare` é o texto ("abaixo do Fable 5.1", "era 5,1 min"). Se um item tiver, todos ganham a linha (vazia quando faltar), para as quatro colunas alinharem.
- `highlight`: o número em laranja. Um por linha.
- Contêiner: painel `.ink` (as cores do ledger são de tinta).

**Faça.**
- Escreva a origem de cada número na nota ("124 respostas aceitas sem edição, de 400.").

**Não faça.**
- Não destaque mais de um número.

**Laranja.** O número destacado sai em laranja; a linha de comparação não muda.

Classes do kit: `.ledger`, `.ledger .hi`, `.ledger dd.cmp`.
