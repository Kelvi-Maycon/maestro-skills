# Rail

Barra de ícones em tinta com o símbolo no topo, as áreas do produto e o avatar no pé.

**Quando usar.** Como primeiro bloco do `Workspace`.

**O que você fornece.**
- `items`: `[{ value, icon, label }]` (Acervo, Rascunhos, Métricas, Newsletter, Ajustes).
- `defaultValue` e `onChange(valor)`; o componente guarda a área ativa.
- `initial` e `user` para o avatar.

**Faça.**
- Dê a cada botão o nome da área em `label`.

**Não faça.**
- Não coloque texto na barra.

Botões de 40 px com ícone de 18 px.

**Laranja.** A área ativa tem fundo `ink-2` e ícone laranja.

Classes do kit: `.rail`.
