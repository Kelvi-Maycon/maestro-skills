# Toast

Confirmação curta em faixa de tinta, com ícone, o que aconteceu e um metadado ou ação à direita.

**Quando usar.** Depois de uma ação que deu certo: "Rascunho salvo 09:42". Para bloqueio ou risco use `Banner`.

**O que você fornece.**
- `children`: o que aconteceu, no particípio ("Rascunho salvo").
- `icon`: padrão `save`.
- `meta`: hora ou ação curta à direita ("09:42", "Desfazer").
- `tone="positive"` (`.toast-ok`): a faixa continua em tinta e o ícone passa a lima, para um resultado com público ("Edição publicada para 12,4 mil assinantes", ícone `mail`).
- O posicionamento na tela é seu; o kit não define camada flutuante nem sombra.

**Faça.**
- Diga o resultado e, quando der, como desfazer.

**Não faça.**
- Não use toast para erro que exige decisão.
- Não pinte a faixa de lima nem troque a cor do texto: o positivo muda só o ícone.

Classes do kit: `.toast`, `.toast-ok`.
