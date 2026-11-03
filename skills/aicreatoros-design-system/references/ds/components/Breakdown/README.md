# Breakdown

Lista da composição em cinco colunas alinhadas: marcador, rótulo, fatia, valor e variação.

**Quando usar.** Abaixo de `StackBar`, com as mesmas cores: "Matéria 52% 214 ↑18%".

**O que você fornece.**
- `items`: `[{ label, share, value, delta, tone }]`. `share` ("52%") e `value` ("214") são texto; `delta` aceita nó ou `{ direction, tone, value }`; sem ele a célula fica vazia. `tone` como no `StackBar`.

Classes do kit: `.breakdown`, `.delta`.
