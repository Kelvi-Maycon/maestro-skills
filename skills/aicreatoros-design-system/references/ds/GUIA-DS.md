---
name: aicreatoros-design
description: Use this skill to generate well-branded interfaces and assets for AiCreatorOS, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, ready-made page templates and UI kit components for prototyping.
user-invocable: true
---

Leia `readme.md` inteiro antes de desenhar. Ele é o roteador: diz por qual modelo começar, o que entra
em cada formato, o que é cromo do kit e não entra em peça, e traz o checklist de entrega.

Fluxo:

1. Ache o entregável na tabela "Rotas" do readme e copie o modelo de `modelos/` (painel, site-home,
   materia, newsletter, carrossel, mobile). Troque só o conteúdo; o comentário no topo do modelo diz o
   que não mexer. Ajuste os caminhos `../styles.css`, `../kit-v9/` e `../assets/` ao local da entrega.
2. Abra `Kit Completo.html` no capítulo da rota (pelo `id` da seção) para variações e estados.
3. Invente a peça-herói pela seção "Peça-herói" do readme: ela nasce do dado desta entrega, com forma,
   luz e movimento livres (GSAP, Three.js e as bibliotecas da seção Movimento) e com cores e fontes dos
   tokens. O kit não traz uma pronta; não refaça a Órbita removida nem copie herói de outra entrega.
4. Monte o resto só com as classes do catálogo do readme e as primitivas de movimento do `kit.js`. Se
   faltar uma peça, componha com as existentes e diga na entrega o que faltou; fora da peça-herói, não
   invente classe, cor, sombra, gradiente, fonte ou ícone.
5. Renderize e confira o checklist do readme, em 1920 e 390 px nos dois temas quando for web.

Para código de produção, use os componentes React de `components/` (props em `components/index.d.ts`)
e as regras do readme. Imagens de `assets/img/`, ícones do sprite, fontes de `assets/fonts/`.

Se a skill for chamada sem tarefa, pergunte o que a pessoa quer criar e siga o fluxo acima.
