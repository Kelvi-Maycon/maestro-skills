# Select

Seleção nativa dentro da mesma moldura do campo (32 px no padrão), com a seta `down` à direita.

**Quando usar.** Para escolher um valor de uma lista curta e conhecida: categoria, formato. Para filtrar uma vista, prefira `ChipGroup` ou `Segmented`.

**O que você fornece.**
- `label`, `help` ou `error`, como no `Input`.
- `options`: lista de textos ou de `{ value, label }`.
- Demais props vão para o `<select>`: `defaultValue`, `onChange`, `name`.

**Faça.**
- Ordene as opções pelo uso, não pelo alfabeto, quando houver uma mais comum.

**Não faça.**
- Não desenhe um menu próprio no lugar do `<select>` nativo.

Classes do kit: `.field`, `.inp`, `.inp select`.
