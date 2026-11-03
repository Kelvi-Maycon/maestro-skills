# Tabs

Abas sublinhadas de 40 px com contagem ao lado, sobre uma linha de 1 px.

**Quando usar.** Para separar a mesma lista por estado: "Todas 24, Rascunhos 3, Agendadas 2, Publicadas 19".

**O que você fornece.**
- `options`: `{ value, label, count }`; `count` aparece em cinza tabular.
- `defaultValue` e `onChange(valor)`; o componente guarda a aba ativa.
- `label`: o nome da lista para leitor de tela ("Matérias por estado").

**Faça.**
- Mostre a contagem de cada aba; a soma das partes bate com "Todas".

**Não faça.**
- Não use aba para trocar modo de exibição; isso é `Segmented`.

Classes do kit: `.tabs`, `.tab`, `[aria-selected=true]`, `.tab b`.
