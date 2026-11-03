# Avatar

Círculo de 40 px com inicial em Garamond itálico, foto ou o símbolo da marca.

**Quando usar.** Na assinatura da matéria, na citação, na barra do produto e no perfil social.

**O que você fornece.**
- Uma das três: `initial` ("K"), `src` + `alt`, ou `mark`.
- `tone` para o símbolo: `"ink"` (padrão, maior círculo em papel), `"orange"` ou `"paper"`.
- `size` em px (28 na citação, 32 na barra, 48 no grupo). Ajuste `style.fontSize` junto quando reduzir a inicial (15 px em 28 px).
- Avatares com símbolo vão num contêiner `.avatars`, que dá 48 px e reduz o símbolo para 24 × 12, como no kit.

**Faça.**
- Dê `aria-label` com o nome quando o avatar estiver sozinho.

**Não faça.**
- Não use o avatar com símbolo para pessoa; ele representa a marca.

Classes do kit: `.avatar`, `.avatar.orange`, `.avatar.paper`, `.avatars`.
