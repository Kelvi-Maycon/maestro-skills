# Label

Rótulo de bloco: texto mono à esquerda, régua tracejada no meio e metadado à direita, sem quebrar linha.

**Quando usar.** No topo de cada bloco interno (card, painel lateral, grupo de campos) para dizer o que é e dar um dado curto sobre ele.

**O que você fornece.**
- `label`: o nome do bloco, com numeração quando a página numera (`"06.1 Botões"`).
- `meta` (opcional): texto curto à direita em mono cinza, ou um nó (um `Badge`, por exemplo).
- `style`: o kit zera a margem inferior (`margin: 0`) quando o bloco já tem gap próprio.

**Faça.**
- Escreva o metadado como dado: "Padrão 32 px · canto 8 · texto 14", "24 matérias".

**Não faça.**
- Não use `Label` para abrir seção de página; isso é `Anchor`.

Classes do kit: `.lbl`, `.lbl .hr`, `.mono`.
