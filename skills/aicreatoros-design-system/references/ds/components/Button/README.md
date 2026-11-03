# Button

Botão em quatro níveis: laranja para a ação principal, tinta para a secundária, contorno para a terciária e fantasma para ação de apoio. Altura 32 px no padrão, 28 em tabela e barra de ferramentas, 40 em capa e mobile; canto 8, texto 14.

**Quando usar.** Para executar uma ação. Para navegar para outra página use `Link`; para avançar ou voltar em sequência, `IconButton`.

**O que você fornece.**
- `variant`: `"primary"` (laranja), `"ink"`, `"line"` (padrão) ou `"ghost"` (sem borda, cinza; "Filtrar", "Colunas").
- `size`: `"sm"` (28 px, texto 13), padrão (32 px) ou `"lg"` (40 px, texto 15).
- `children`: o verbo, em caixa de frase ("Publicar", "Salvar rascunho").
- `icon` (seta no fim, anda 2 px no hover) e `iconStart` (ícone antes do texto, como em "Nova matéria").
- `iconOnly` com `icon` e `label`: botão quadrado só com o ícone; `label` vira `aria-label` ("Adicionar").
- `busy`: troca o ícone por um giro e marca `aria-busy`; escreva o gerúndio ("Publicando").
- `href`: vira `<a>` com a mesma aparência. Demais props vão para o elemento (`onClick`, `disabled`, `type`).

**Faça.**
- No máximo um botão laranja por bloco.
- Use `size="sm"` dentro de tabela e barra de ferramentas; `size="lg"` em capa e mobile.
- Hover do laranja é `brightness(.92)`; não crie um segundo hex.

**Não faça.**
- Não use o laranja para ações destrutivas ou para enfeitar.
- Não misture tamanhos na mesma linha de ações.

**Contraste.** Texto branco sobre `#F05A37` mede 3,37:1. Em 14 px/600 isso fica abaixo do mínimo de 4,5:1 para texto normal; é um ponto em aberto do kit. Não compense trocando a cor do laranja.

Classes do kit: `.btn`, `.btn-sm`, `.btn-lg`, `.btn-icon`, `.btn-primary`, `.btn-ink`, `.btn-line`, `.btn-ghost`, `.busy`, estados `.is-hover`, `.is-focus`, `:disabled`.
