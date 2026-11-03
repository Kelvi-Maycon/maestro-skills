# Card

Card de matéria com imagem 3:2, etiqueta de capítulo, título editorial, resumo e rodapé com tempo de leitura e seta laranja.

**Quando usar.** Para a matéria em destaque de uma lista ou de uma edição. Listas longas usam `Row`; o acervo do produto usa `Mini`.

**O que você fornece.**
- `image` (URL) e `imageAlt`; imagem do conjunto Noir Dither, cortada, nunca esticada.
- `tag` ("01 / Modelos"), `meta` ("Modelos · 14 set 2026"), `title` com um destaque em itálico, `children` (resumo), `readTime` ("6 min de leitura").
- `href` para a matéria; `actionLabel` nomeia a seta (padrão "Ler a matéria").
- Contêiner: coluna de grade; o card ocupa a largura dela.

**Faça.**
- Resuma o que foi medido, não o anúncio.

**Não faça.**
- Não troque a seta laranja por botão de texto.

**Laranja.** A seta é a ação primária do card.

Classes do kit: `.card.acard`, `.media`, `.tag`, `.cbody`, `.foot`.
