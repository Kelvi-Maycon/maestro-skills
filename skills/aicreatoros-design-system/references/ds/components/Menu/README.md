# Menu

Menu contextual com título, busca, rótulos de grupo e itens com a altura do controle (32 px), com contagem ou ponto de estado. Em papel ou em tinta.

**Quando usar.** Como segundo bloco do `Workspace`, para navegar dentro da área escolhida na barra.

**O que você fornece.**
- `variant`: padrão (card em papel) ou `"ink"` (menu em tinta, o do kit).
- `title` ("Acervo"); `search` (placeholder, padrão "Buscar", ou `false`) e `searchLabel`.
- `sections`: `[{ label, items: [{ value, icon, label, count, status, statusLabel }] }]`. `status` usa os tons de `Status` ("positive", "warn"), com `statusLabel` para leitor de tela ("Sincronizado").
- `defaultValue` e `onChange(valor)`; um item ativo no menu inteiro.

**Faça.**
- Mostre a contagem de cada item; canal mostra estado, não contagem.

**Não faça.**
- Não aninhe submenus.

**Laranja.** O item ativo tem fundo mais claro, borda fina e ícone laranja.

Classes do kit: `.menu`, `.menu.ink`, `.mlbl`, `.mi`, `.mi .status`.
