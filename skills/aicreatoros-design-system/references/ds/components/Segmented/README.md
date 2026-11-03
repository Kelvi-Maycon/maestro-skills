# Segmented

Controle segmentado com a altura do controle (botões internos de 26 px no padrão), com ícone e texto, para alternar entre modos de uma mesma vista.

**Quando usar.** Para trocar a forma de exibir o mesmo conteúdo: "Grade" e "Lista".

**O que você fornece.**
- `options`: `{ value, label, icon }`.
- `defaultValue` e `onChange(valor)`; o componente guarda a seleção.
- `label`: o nome do grupo ("Modo de exibição").

**Faça.**
- Mantenha duas ou três opções curtas.

**Não faça.**
- Não use para filtrar conteúdo; isso é `ChipGroup`. Para separar listas por estado, use `Tabs`.

Classes do kit: `.seg`, `.seg button`, `[aria-pressed=true]`.
