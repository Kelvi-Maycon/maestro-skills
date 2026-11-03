# Slop em design e UI

Diagnóstico, não construção. Para **construir** ou redesenhar, passe para
`senior-full-design` no bot que tiver essa skill. Este arquivo serve para responder "por que isso tem cara de IA" e
para revisar antes de entregar.

A doença é a mesma da prosa: **o layout foi escolhido antes do conteúdo**. A tela
resolve a página média, não esta página.

---

## Diagnóstico em 5 perguntas

1. Trocando todo o conteúdo por outro produto, a tela fica idêntica? Se fica, o layout
   não conhece o conteúdo.
2. Qual é o único elemento que o olho deve pegar primeiro? Se você não consegue apontar
   um, não existe hierarquia. Se tudo tem o mesmo peso, nada tem.
3. A fonte foi escolhida por um motivo ou é o default do framework?
4. Quantos recursos visuais estão somados no mesmo destaque? Cor de fundo mais negrito
   mais tamanho maior é um destaque escolhido três vezes. Escolha um.
5. O layout continuaria funcionando se o conteúdo dobrasse? Se não, o grid foi
   desenhado para um conteúdo que ainda não existia.

---

## S1. Composição

### Template reflexo
Hero centralizado, três cards com ícone, bento grid, faixa de logos, CTA final. Essa
sequência aparece porque é a saída mais provável, não porque o conteúdo pediu.
**Conserto.** Liste o conteúdo real primeiro. Depois escolha a forma que ele exige.
Se são dois itens, são duas colunas. Se são cinco, não force três.

### Conteúdo falso sustentando o layout
Lorem ipsum, "Feature One", métricas inventadas ("10k+ usuários"), depoimento genérico
sem nome, logo strip sem logo.
**Conserto.** Conteúdo real ou nada. Número inventado em peça de cliente é **S0**, não
S1: é fabricação.

### Seção que existe porque o template tem
FAQ com três perguntas que ninguém faz. "Como funciona" em três passos que não são os
passos reais.
**Conserto.** Apague a seção.

### Densidade uniforme
Tudo com `py-20`, todo bloco com a mesma altura, todo card com o mesmo tamanho. Ritmo
metronômico é tell em layout do mesmo jeito que é em prosa.
**Conserto.** O bloco mais importante ocupa mais espaço. Os outros encolhem.

### Painel que vira documento
Dashboard de controle com metodologia, definição de métrica e explicação de cálculo no
corpo. O painel mostra estado, KPI, progresso, alerta e fila. Explicação vai para
tooltip, link ou página à parte.

---

## S2. Padrão visual

| Tell | Por quê | Direção |
|---|---|---|
| Gradiente roxo/indigo para violeta | paleta default de tudo que foi gerado desde 2023 | cor com motivo, vinda do conteúdo ou da marca |
| Texto do headline em gradiente | decoração no lugar de hierarquia | peso e tamanho resolvem |
| Orb desfocado no fundo | preenche vazio que era problema de composição | resolva a composição |
| Glassmorphism (`backdrop-blur` + borda branca 10%) | textura genérica | superfície opaca com contraste real |
| `rounded-2xl` + `shadow-lg` + `border-slate-200` em tudo | um estilo de card aplicado a tudo | sombra com filosofia declarada, ou nenhuma |
| Ícone em círculo pastel em todo card | ornamento repetido | ícone só onde ele diferencia |
| Emoji como ícone | tell direto | ícone de verdade, ou nada |
| `hover:scale-105 transition-all duration-300` | assinatura de hover default | uma assinatura de hover, escolhida |
| Fade-up com stagger em tudo | movimento sem intenção | movimento onde ele comunica ordem |
| Dark mode = `slate-900` + branco puro | inversão preguiçosa | paleta escura própria, com contraste medido |
| Ilustração 3D genérica ou blob | imagem que não é do produto | screenshot real, foto real, ou nada |

### Refino que empilha camada
Quando a peça não chega na referência, o reflexo é somar: véu, poeira, linha extra,
filtro, microefeito. Isso deixa pesado e não aproxima.
**Conserto.** Suba hierarquia. Corrija escala, contraste e ordem dos elementos. Rodada
que não muda nada visível não conta como rodada.

---

## S3. Superfície

- Inter, DM Sans, Space Grotesk ou Poppins escolhidas por default.
- Todo texto centralizado, inclusive parágrafo longo.
- Botão pill com seta para a direita no fim do label.
- Badge "Novo" ou "Beta" no topo do hero sem nada novo atrás.
- Texto secundário em `slate-400` sobre branco, contraste abaixo do mínimo.
- Tudo dentro de um `max-w-4xl` centralizado.
- Controle encostando na borda do componente, sem respeitar o padding interno.
- Chip, tag ou tab com número quebrando em duas linhas quando o rótulo cresce. Componente
  de sistema mantém a altura: rótulo e contagem se separam visualmente, em uma linha.

---

## Sinais de mão humana (proteger)

- Escolha tipográfica com motivo, mesmo quando incomum.
- Assimetria intencional que resolve um problema de leitura.
- Densidade que acompanha a importância do conteúdo, não o grid.
- Um gesto visual forte, repetido com disciplina, em vez de cinco efeitos somados.
- Conteúdo real: número medido, foto do produto, nome de cliente que existe.
- Composição que o autor consegue defender quando perguntam por quê.

---

## Verificação

Nunca declare pronto sem ver renderizado. Screenshot por seção, em viewport real, no
mobile e no desktop. Ajuste responsivo não pode achatar em uma coluna o que foi
aprovado em duas no desktop: mude estrutura só abaixo do breakpoint.

Se não deu para renderizar, escreva `não verificado: <motivo>`.
