# Toolbar

Barra de ferramentas acima de tabela: busca com atalho, ações, uma nota de contagem e controles à direita.

**Quando usar.** No topo de `Table` e de listas longas: buscar, filtrar, escolher colunas, densidade, exportar.

**O que você fornece.**
- `search` (placeholder, "Buscar alternativa"), `searchLabel` (opcional) e `shortcut` (tecla, "/").
- `children`: `Button` (`line` ou `ghost`) à esquerda.
- `note` (opcional): texto em 13 px que empurra o resto para a direita ("<b>1</b> de 3 selecionada"). Numa `Table` com `selectable`, a contagem entra sozinha.
- `end` (opcional): nós à direita, depois da nota (`Segmented` de densidade, `Exportar`). Sem nota, o primeiro recebe `to-end`.

**Faça.**
- Use a densidade em `Segmented` ("Compacta, Padrão, Confortável") ligado ao `density` da `Table`.

Classes do kit: `.toolbar`, `.toolbar-note`, `.to-end`, `.inp`, `.kbd`.
