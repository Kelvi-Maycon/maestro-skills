# Créditos

`senior-full-design` é uma consolidação de sete conjuntos de skills de design open source, todos sob licença **MIT**. A doutrina foi reescrita e unificada numa voz e num roteador só; alguns arquivos de biblioteca foram carregados com adaptação e estão marcados no topo com a origem.

| Origem | Licença | O que veio |
|---|---|---|
| [emilkowalski/skills](https://github.com/emilkowalski/skills) — Emil Kowalski | MIT | Portão de decisão de motion (frequência → propósito → ferramenta → propriedade → curva → interrupção → reduced motion), tabelas de curva e duração, lista "never ship" de animação. As receitas por componente e o glossário reverso foram reescritos a partir dessa doutrina. |
| [ConardLi/garden-skills](https://github.com/ConardLi/garden-skills) — ConardLi | MIT | Workflow de build com checkpoints, os cinco diais de calibração, protocolo de asset de marca, protocolo de redesign, crítica em 5 dimensões, catálogo de 25 style recipes (`design/style-recipes/`), consultor de direção em 6 escolas. |
| [codeswithroh/tastemaker](https://github.com/codeswithroh/tastemaker) — codeswithroh | MIT | Extração determinística de paleta a partir de pixel, contraste como contrato, geração de paleta por humor em OKLCH, rotação de macroestrutura contra memória de projeto, arco narrativo, regras de hero, escala de espaçamento com a regra interno ≤ externo, `scripts/` (todos os `.py`). |
| [elayadesign/ai-design-skills](https://github.com/elayadesign/ai-design-skills) — Elaya | MIT | Sistema de landing page: intake, estrutura de página, seleção de layout, regras de copy de conversão, escala tipográfica travada, fórmula de raio aninhado, realismo de conteúdo, requisitos de entrega. |
| [jakubkrehel/skills](https://github.com/jakubkrehel/skills) — Jakub Krehel | MIT | Sistema de cor como rampa com papéis, separação primitivo/semântico, regras de tipografia (line-height por papel, medida, tabular-nums), revisão de mudança (escopo, raio de alcance, ler o lado removido, classificar achado). |
| [MengTo/Skills](https://github.com/MengTo/Skills) — Meng To | MIT | Régua de qualidade awwwards, sistema de motion em scroll (um motor só, cleanup, texto dividido acessível), honestidade de asset e avatar, direção de arte antes de código. |
| [Owl-Listener/designer-skills](https://github.com/Owl-Listener/designer-skills) — MC Dean | MIT | Leis de Gestalt e de cognição operacionalizadas em `ux/laws.md`, dimensões de crítica de tela, taxonomia de UX (research, design system, interaction, ops). |

Licença MIT permite uso, cópia, modificação e redistribuição com a nota de copyright preservada. Cada repositório mantém o copyright do respectivo autor.

---

## O que é original desta skill

- O **roteador por intenção** e a divisão em sete rotas
- A **ordem de autoridade** que resolve conflito entre as regras herdadas (pedido > marca > referência > recipe > regra de rota > default do modelo)
- A doutrina núcleo do `SKILL.md`, escrita a partir da interseção das sete fontes
- `ux/laws.md`, `ux/interface-quality.md`, `ux/PLAYBOOK.md`
- `critique/anti-slop.md` (60 portões numerados) e `critique/failure-patterns.md`
- `landing-page/PLAYBOOK.md`, `landing-page/narrative-arc.md`, `landing-page/macrostructures.md`, `landing-page/component-archetypes.md`, `landing-page/hero.md`
- `design/PLAYBOOK.md`, `design/tokens.md`, `design/directions.md`
- `reference/PLAYBOOK.md`, `reference/style-lock.md`
- `redesign/PLAYBOOK.md`, `motion/PLAYBOOK.md`, `motion/recipes.md`, `motion/vocabulary.md`
- `ui/PLAYBOOK.md`, `ui/affordance.md`, `ui/geometry.md`, `scripts/ui_audit.py`

---

## Referências públicas da rota UI

Não são código nem skills — são as fontes dos números que a rota usa. Nenhuma foi copiada; os valores foram checados e reescritos em regra de decisão.

| Fonte | O que ancorou |
|---|---|
| [NN/g — *Beyond Blue Links: Making Clickable Elements Recognizable*](https://www.nngroup.com/articles/clickable-elements/) | forma retangular como sinal reconhecível, consistência de tratamento, falso affordance, ícone precisa de rótulo |
| [WCAG 2.2 — SC 2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) | piso de 24×24 CSS px, alternativa por espaçamento, área maior que o visual |
| [WCAG 2.1 — SC 1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html) | 3:1 para borda de campo, contorno de controle e anel de foco |
| [Adam Arant — *Optical alignment in UI: 7 spacing fixes math gets wrong*](https://adamarant.com/en/blog/optical-alignment-in-ui-7-spacing-fixes-math-gets-wrong) | deslocamento de 3–6% em ícone assimétrico, `text-box: trim-both`, redondo 4–8% maior, tracking por degrau, folga de glifo trailing |
| [Rauno Freiberg — *Invisible Details of Interaction Design*](https://rauno.me/craft/interaction-design) | frequência decidindo feedback, alvo maior que o visual, continuidade de gesto fora dos limites |
| [Nathan Curtis / EightShapes — *Size in Design Systems*](https://medium.com/eightshapes-llc/size-in-design-systems-64f234aec519) | grade de altura de controle e a relação entre tipo, padding e densidade |
| [Sheida Shakeri — *The Hidden Math Behind Perfectly Nested Border Radius*](https://medium.com/@sheidashakeri/the-hidden-math-behind-perfectly-nested-border-radius-85b6b4d44b98) | confirmação da fórmula de raio aninhado com piso em 0 |
