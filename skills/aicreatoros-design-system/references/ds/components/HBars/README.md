# HBars

Barras horizontais com rótulo, trilho de 8 px e valor à direita.

**Quando usar.** Para comparar poucas categorias no mesmo critério: aderência por modelo (Claude Fable 5.1 47%, GPT-6 Astra 31%, Gemini 3.8 Flash 22%), assinaturas por origem.

**O que você fornece.**
- `items`: `[{ label, value, valueLabel, highlight }]`; `highlight` pinta a barra de laranja.
- `max` (opcional): o 100% da barra. Sem ele, o maior valor enche a barra; para porcentagem, passe `max: 100`.

**Faça.**
- Ordene do maior para o menor e destaque só um.

Classes do kit: `.hbars`, `.hbars i.hi`.
