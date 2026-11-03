# DataPanel

Painel de leitura de dados em tinta, com rótulo do teste, título editorial e a fonte da amostra no canto, que recebe `Ledger` e `TargetTrack`.

**Quando usar.** Para o resumo numérico de um teste. É o único painel `ink` da seção.

**O que você fornece.**
- `kicker` ("Teste · GPT-6 Astra") e `title` com um destaque em itálico.
- `source`: `{ label, value, meta }`. `label` padrão "Fonte:", `value` em negrito ("400 tickets reais de suporte"), `meta` em mono ("Amostra fechada · 31 ago 2026"). Sai com o ícone `doc`.
- `meta` (texto): alternativa antiga a `source`, só a data em mono.
- `children`: `Ledger`, `TargetTrack` ou outro conteúdo sobre tinta.

**Faça.**
- Declare de onde vem a amostra e quando fechou.

**Não faça.**
- Não empilhe dois painéis de tinta na mesma seção.

Classes do kit: `.ink.data`, `.data-top`, `.src`.
