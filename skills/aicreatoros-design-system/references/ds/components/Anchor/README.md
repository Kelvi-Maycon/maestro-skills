# Anchor

Âncora de capítulo: número em Garamond itálico, rótulo mono, régua até a borda e o símbolo a 55%.

**Quando usar.** Para abrir cada seção de uma página longa (kit, relatório, edição). Blocos internos da seção usam `Label`, não outra âncora.

**O que você fornece.**
- `number`: texto de dois dígitos (`"06"`).
- `label`: nome da seção em caixa de frase (`"Ações & campos"`); o CSS põe em caixa alta mono.
- `dots` (padrão `true`): desligue para esconder o símbolo.
- Contêiner: a largura inteira da coluna; a régua ocupa o que sobra na linha.

**Faça.**
- Mantenha a âncora na mesma linha horizontal em toda seção.

**Não faça.**
- Não pule números nem use a âncora como título de card.

**Laranja.** O número da âncora é um dos papéis do laranja.

Classes do kit: `.anchor`, `.anchor b`, `.anchor .dots`.
