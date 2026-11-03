# IconButton

Seta em círculo com a altura do controle: 32 px no padrão, 28 na pequena e 40 na grande, com borda de controle de 1 px, preenchida de laranja na direção principal.

**Quando usar.** Para avançar, voltar ou abrir: próxima matéria, página anterior, abrir comparativo. É o verbo do sistema quando o texto já está ao lado.

**O que você fornece.**
- `label`: o nome da ação para leitor de tela (obrigatório: "Próxima", "Página anterior").
- `icon`: padrão `arrow`; também `back`, `diag`.
- `variant`: `"primary"` (laranja) ou `"line"` (padrão). `size`: `"sm"` (28 px), padrão (32 px) ou `"lg"` (40 px).
- `href` vira `<a>`; sem ele é `<button>`.

**Faça.**
- Laranja só na direção principal: em "anterior / próxima", apenas a próxima.

**Não faça.**
- Não coloque outro ícone além das setas e do `diag`.

Classes do kit: `.ico`, `.ico-orange`, `.ico-sm`, `.ico-lg`.
