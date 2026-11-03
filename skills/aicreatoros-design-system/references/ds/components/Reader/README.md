# Reader

Leitor de matéria completo: cabeçalho com rótulo, título, linha fina e assinatura, imagem 2,4:1, texto com coluna lateral e navegação anterior e próxima.

**Quando usar.** Para a página de uma matéria. É a anatomia do `Card` em escala maior.

**O que você fornece.**
- `kicker`, `title` (um destaque em itálico), `lead`.
- `author`: `{ name, initial, meta }` ("14 set 2026 · 6 min de leitura"); `saveLabel` e `onSave` para o botão "Salvar para depois" (`saveLabel={null}` esconde).
- `figure`: `{ src, alt, caption, credit }`; o crédito declara imagem gerada ("Noir Dither · imagem gerada").
- `children`: o texto dentro de `.prose` (`p.lead`, `p`, `h4`, `blockquote`, `a`).
- `aside`: a coluna de 300 px (ficha do teste com `Spec`, link para os dados).
- `prev` e `next`: `{ href, image, title }`.

**Faça.**
- Declare a amostra antes do resultado e a imagem gerada no crédito.

**Não faça.**
- Não use mais de um destaque em itálico por título.

Classes do kit: `.reader`, `.r-head`, `.byline`, `.r-fig`, `.r-grid`, `.prose`, `.aside`, `.np-grid`, `.np`.
