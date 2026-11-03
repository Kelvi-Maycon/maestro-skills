# Input

Campo de texto com a altura do controle (32 px no padrão), rótulo, ícone opcional à esquerda, atalho opcional à direita e mensagem de ajuda ou de erro.

**Quando usar.** Para entrada curta: e-mail, endereço, busca, data. Texto longo vai no `Editor`.

**O que você fornece.**
- `label`: o rótulo acima (13 px/500). Sem rótulo, passe `aria-label`.
- `icon` (opcional): `mail`, `search`, `clock`.
- `kbd` (opcional): a tecla de atalho mostrada no fim do campo (`"/"` na busca).
- `help` ou `error`: texto abaixo. `error` pinta a borda de laranja, marca `aria-invalid` e mostra o ícone `alert`.
- Demais props vão para o `<input>`: `type`, `defaultValue`, `placeholder`, `autoComplete`, `onChange`.

**Faça.**
- Escreva o erro como instrução: "Inclua o endereço completo, com https://".

**Não faça.**
- Não use placeholder no lugar do rótulo.
- Não pinte o texto do erro de laranja; ele fica em `ink` 500, com o ícone.

Classes do kit: `.field`, `.inp`, `.inp.err`, `.help`, `.help.err`, `.kbd`.
