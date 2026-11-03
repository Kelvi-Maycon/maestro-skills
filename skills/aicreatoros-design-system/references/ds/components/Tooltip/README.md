# Tooltip

Balão de tinta de 13 px com seta para baixo, acima do elemento que explica.

**Quando usar.** Para completar o sentido de um controle sem texto visível, como uma seta ou um ícone: "Publica na data agendada".

**O que você fornece.**
- `label`: o texto do balão, uma frase curta.
- `children`: o elemento que dispara (um só). O componente liga `aria-describedby` e mostra o balão em hover e em foco.
- `open`: deixa o balão sempre visível (documentação, onboarding).
- `align`: `"center"` (padrão) ou `"start"`.

**Faça.**
- Escreva o que acontece, não o nome do botão.

**Não faça.**
- Não coloque informação essencial só no balão.

Classes do kit: `.tipwrap`, `.tip`.
