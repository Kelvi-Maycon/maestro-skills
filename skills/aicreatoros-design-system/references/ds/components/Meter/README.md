# Meter

Barra de progresso de 8 px (6 px na versão pequena), com o rótulo e a porcentagem acima, marcador de meta tracejado e escala opcional abaixo.

**Quando usar.** Para progresso determinado com total conhecido ("Enviando · 8.320 de 12.400") e para taxa contra meta dentro de `Stat` ("48,2%, meta 50%"). Espera sem total usa `Skeleton` ou `busy`.

**O que você fornece.**
- `value`: de 0 a 100, aceita decimal (48,2 → `48.2`).
- `label` (opcional): o que está em andamento, com os números; mostra a linha de cima com `valueLabel` (padrão "67%"). Sem `label`, passe `aria-label`.
- `goal` (opcional): posição da meta, de 0 a 100.
- `scale` (opcional): `true` escreve "0 · meta N% · 100%"; ou `[esquerda, meio, direita]`.
- `small`: barra de 6 px, para `Stats`.
- `caption` (opcional): legenda mono abaixo.

**Faça.**
- Mostre o total junto da porcentagem.

**Laranja.** O preenchimento laranja é o papel "barra de progresso".

Classes do kit: `.meter`, `.meter .bar`, `.bar-sm`, `.goal`, `.scale`, `.rule-lbl`.
