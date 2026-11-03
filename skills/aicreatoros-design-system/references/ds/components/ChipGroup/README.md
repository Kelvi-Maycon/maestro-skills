# ChipGroup

Grupo de chips de 28 px em pílula, com um selecionado de cada vez em fundo de tinta e, opcionalmente, um chip tracejado para acrescentar filtro.

**Quando usar.** Para filtrar uma lista por categoria: "Todas, Modelos, Ferramentas, Agentes".

**O que você fornece.**
- `options`: textos ou `{ value, label, icon }`.
- `defaultValue`: o selecionado no início (padrão, o primeiro). O componente guarda a seleção e chama `onChange(valor)`.
- `label`: o nome do grupo para leitor de tela ("Filtro por categoria").
- `addLabel` e `onAdd` (opcionais): chip tracejado com `plus` no fim ("Filtro").

**Faça.**
- Comece pela opção que mostra tudo.

**Não faça.**
- Não use chip como botão de ação nem como etiqueta de estado; estado é `Badge` ou `Status`.

Classes do kit: `.chips`, `.chip`, `.chip-dash`, `[aria-pressed=true]`.
