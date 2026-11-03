# Workspace

Estrutura do produto em três blocos sobre a superfície de apoio: barra de ícones, menu contextual e conteúdo, separados por 12 px.

**Quando usar.** Para qualquer tela do produto. A tela ocupa a janela inteira.

**O que você fornece.**
- `children`, nesta ordem: `Rail`, `Menu` (no kit, `variant="ink"`) e `ContentPanel`.
- Abaixo de 860 px os blocos viram barra horizontal, menu em linha e conteúdo.

**Faça.**
- Mantenha a seleção sincronizada entre barra e menu.

**Não faça.**
- Não acrescente um quarto bloco nem sombra entre eles.

**Laranja.** A seleção é fundo mais claro com ícone laranja.

Classes do kit: `.ws`.
