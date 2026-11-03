# EmptyState

Tela de ausência desenhada: ícone, título editorial, o que fazer e a ação para sair dela.

**Quando usar.** Quando uma lista está vazia ("Nenhum rascunho ainda.") ou quando um processo parou ("O envio parou.").

**O que você fornece.**
- `title`: com um destaque em itálico.
- `children`: o próximo passo e quanto custa ("A primeira leva cerca de dois minutos.").
- `actions`: um `Button` ou um grupo `.chips` centralizado.
- `tone="error"`: contorno laranja e ícone `alert`. `icon` troca o ícone padrão (`doc`).

**Faça.**
- No erro, diga a hora e o que não aconteceu ("Nada foi enviado em duplicidade.").

**Não faça.**
- Não deixe a tela vazia sem ação.

Classes do kit: `.empty`.
