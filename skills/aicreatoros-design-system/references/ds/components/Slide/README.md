# Slide

Slide de carrossel 4:5 em três papéis: capa sobre imagem, conteúdo sobre papel e fecho sobre tinta. O texto fica na área segura (8% nas laterais, 17% embaixo); @ e contador aparecem só no rodapé, pequenos.

**Quando usar.** Em carrosséis sociais. Uma sequência abre com `cover`, desenvolve com `paper` e fecha com `end`.

**O que você fornece.**
- `variant`: `"cover"`, `"paper"` ou `"end"`.
- `kicker`: rótulo em mono caixa alta com ponto laranja ("Teste de campo").
- `title`: manchete em Garamond com um destaque em itálico. `children`: frase de apoio. `note`: ressalva com anel laranja ("Uma empresa B2B, 14 dias, avaliação cega").
- Capa: `image` (Noir Dither) e `imageAlt`.
- Conteúdo: `bars` `[{ label, value, unit, share, highlight }]` para comparar ("Claude Fable 5.1", 47, "%"); `share` é a largura da barra quando `value` não for porcentagem. Sem `bars`, `number` ("31%") com `title` ou `children`.
- Fecho: o símbolo no topo, `title` com a chamada e `note`.
- `handle` ("@aicreatoros") e `page` ("2 / 3"): o rodapé só aparece com um deles.
- Contêiner: a coluna define a largura; a altura sai do 4:5 e o texto escala pela largura.

**Faça.**
- Ponha a amostra na `note` de todo slide com número.

**Não faça.**
- Não ponha wordmark, @ ou contador no topo do slide.

Classes do kit: `.slide`, `.slide-cover`, `.slide-paper`, `.slide-end`, `.slide-safe`, `.slide-kick`, `.slide-bars`, `.slide-group`, `.slide-note`, `.slide-chrome`, `.n`.
