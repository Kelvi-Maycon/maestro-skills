# Icon

Um glifo do sprite do kit, desenhado inline em SVG de traço 2 px com pontas e junções redondas.

**Quando usar.** Dentro de botões, campos, itens de menu, toasts e avisos, ou sozinho como sinal. Os componentes do sistema já desenham seus ícones; use `Icon` quando montar algo novo.

**O que você fornece.**
- `name`: um dos 19 glifos: `arrow`, `back`, `diag`, `down`, `plus`, `search`, `grid`, `pen`, `clock`, `alert`, `image`, `sliders`, `save`, `doc`, `layers`, `settings`, `ruler`, `mail`, `list`.
- `size` (opcional): lado em px. Sem ele o contexto decide: 20 px na interface, 16 px em botão e item de menu, 15 px na seta pequena.
- `label` (opcional): quando o ícone carrega informação sozinho (o tipo da matéria numa lista), vira `role="img"` com esse `aria-label` ("Teste", "Análise"). Sem `label`, fica `aria-hidden`.
- A cor vem de `currentColor`; defina `color` no pai.

**Faça.**
- Use setas como verbos: `arrow` avança, `back` volta, `diag` abre em outro lugar.
- Dentro de botão, deixe o ícone sem `label` e dê o nome da ação ao botão que o contém.

**Não faça.**
- Não use emoji, fonte de ícone, PNG ou glifo unicode no lugar do sprite.
- Não misture traços de outra biblioteca. `mail` e `list` vêm do Lucide porque o conjunto original não tem equivalente; a substituição está declarada no kit e é a única.

Classes do kit: `.i` e o sprite `#i-*`.
