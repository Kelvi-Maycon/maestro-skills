# Dialog

Caixa de decisão com rótulo mono, título editorial, a consequência e uma única ação primária.

**Quando usar.** Antes de uma ação com efeito público ou difícil de desfazer: "Publicar agora?".

**O que você fornece.**
- `kicker`: o contexto em mono ("Publicar edição 07").
- Botões à direita, cancelar antes de confirmar.
- `title`: pergunta com um destaque em itálico (`<em>agora?</em>`).
- `children`: a consequência e a saída ("Dá para desfazer nos primeiros cinco minutos.").
- `confirmLabel`, `cancelLabel` (padrão "Cancelar"), `onConfirm`, `onCancel`; ou `actions` com seus próprios botões.
- Posição, camada e foco preso são seus: o kit não define véu nem sombra.

**Faça.**
- Repita o verbo do título no botão laranja ("Publicar").

**Não faça.**
- Não coloque dois botões laranja nem mais de duas ações.

Classes do kit: `.dialog`, `.dialog-act`.
