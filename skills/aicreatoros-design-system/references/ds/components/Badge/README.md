# Badge

Etiqueta de estado de 22 px em Instrument Sans 12/500, com um ponto que diz o estado.

**Quando usar.** Para o estado que o leitor lê em card, cabeçalho e ficha: Publicado, Em revisão, Agendado, Rascunho. Estado que muda sozinho em tabela, lista ou menu é `Status`.

**O que você fornece.**
- `tone`: `"positive"` (lima, Publicado), `"live"` (ponto laranja, Em revisão), `"draft"` (tracejado, Rascunho) ou sem tom (Agendado).
- Estado de sistema: `"warn"` (âmbar, "Fonte pendente"), `"neg"` (vermelho, "Envio parou"), `"info"` (azul, "Novo").
- `square`: canto de 4 px, para selo curto dentro de linha de dado ("maior queda"). `plain`: sem o ponto.
- `children`: o estado em uma ou duas palavras.
- Contêiner: papel, card ou painel `.ink` (dentro de `.ink` a borda vira `ink-line`).

**Faça.**
- Use o mesmo texto para o mesmo estado em todo o produto.

**Não faça.**
- Não use lima para nada que não seja estado positivo.
- Não use verde, âmbar, vermelho ou azul como fundo de card, título ou ilustração.

**Laranja.** O ponto laranja de "Em revisão" marca um estado que pede atenção.

Classes do kit: `.badge`, `.badge-pos`, `.badge-live`, `.badge-draft`, `.badge-warn`, `.badge-neg`, `.badge-info`, `.badge-sq`, `.badge-plain`.
