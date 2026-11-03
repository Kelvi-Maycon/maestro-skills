# Editor

Editor de matéria em duas colunas: título e texto à esquerda, publicação à direita.

**Quando usar.** Na área Rascunhos, dentro de `ContentPanel` com `plain`.

**O que você fornece.**
- `kicker` ("Rascunho · Agentes"); a contagem de palavras aparece sozinha à direita.
- `defaultTitle`, `defaultText` e `onChange(texto)`.
- `tools`: controles abaixo do texto (botão "Imagem de capa", ajuda "Rascunho salvo às 09:42").
- `side`: a coluna de 272 px (Label com Badge, Select, Input de data, Checkbox, Log e as ações "Pré-visualizar" e "Revisar").

**Faça.**
- Ponha a lista de verificação da matéria (fonte, ressalva, imagem declarada) antes das ações.

**Não faça.**
- Não use mais de uma ação laranja na coluna.

Classes do kit: `.editor`, `.ed-write`, `.ed-title`, `.ed-side`, `.ed-actions`.
