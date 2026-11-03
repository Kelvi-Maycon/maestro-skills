# ContentPanel

Bloco de conteúdo do produto: trilha de navegação e ferramentas no topo, a vista abaixo.

**Quando usar.** Como terceiro bloco do `Workspace`.

**O que você fornece.**
- `crumbs`: `["AiCreatorOS", "Acervo"]`; o último fica em negrito.
- `tools`: controles à direita (`Segmented`, `Button` tinta "Nova matéria").
- `children`: a vista, com 20 px de respiro. `plain` tira esse respiro para um `Editor`.

**Faça.**
- Use `Button` tinta aqui; o laranja fica para a ação final da vista.

**Não faça.**
- Não repita o título do menu dentro da vista.

Classes do kit: `.cont`, `.c-top`, `.crumbs`, `.c-tools`, `.view`.
