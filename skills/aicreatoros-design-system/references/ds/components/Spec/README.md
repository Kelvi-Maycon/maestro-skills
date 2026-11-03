# Spec

Ficha de termos e valores com divisórias tracejadas, valor curto à direita em mono 12 (é rótulo de ficha, não número de painel).

**Quando usar.** Na coluna lateral do `Reader` ("Ficha do teste") e onde houver um conjunto curto de atributos: modelo, fonte, amostra, empresa, status.

**O que você fornece.**
- `items`: `[{ term, value }]`; `value` pode ser texto ou nó (um `Badge`).

**Faça.**
- Escreva valores curtos que caibam numa linha.

**Não faça.**
- Não use para dados comparativos; isso é `Table`.

Classes do kit: `.spec`.
