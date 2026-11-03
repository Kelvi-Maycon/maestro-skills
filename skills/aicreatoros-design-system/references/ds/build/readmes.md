=== Wordmark
Símbolo de três círculos (raios 3, 5 e 8) ao lado do wordmark "aicreator*os*", a assinatura do AiCreatorOS.

**Quando usar.** No masthead, na página de marca e no topo de peças editoriais (newsletter, fecho de carrossel). O símbolo aparece três vezes no sistema: masthead, página de marca e barra do produto; fora disso a identidade vem de tipografia, cor e imagem.

**O que você fornece.**
- `mark` (padrão `true`) e `word` (padrão `true`): desligue um dos dois para usar só o símbolo ou só o wordmark.
- `size`: tamanho do wordmark em px (26 px no padrão, 21 no site, 24 na newsletter).
- Contêiner: papel, card ou painel `.ink`. Dentro de `.ink` o maior círculo vira papel sozinho, pela variável `--m3`.

**Faça.**
- Escreva sempre em minúsculas: "aicreator" em Instrument Sans 700 (−.05em), "os" em ITC Garamond Cond 700 itálico laranja.
- Respeite a área mínima: símbolo 24 px, wordmark 20 px.

**Não faça.**
- Não recolora os círculos (`#F05A37`, `#8D8B86`, `#1D1D1B`) nem estique o símbolo.
- Não use o símbolo em produto de outra marca.

Classes do kit: `.brand`, `.mark`, `.wordmark`.

=== Icon
Um glifo do sprite do kit, desenhado inline em SVG de traço 2 px com pontas e junções redondas.

**Quando usar.** Dentro de botões, campos, itens de menu, toasts e avisos, ou sozinho como sinal. Os componentes do sistema já desenham seus ícones; use `Icon` quando montar algo novo.

**O que você fornece.**
- `name`: um dos 19 glifos: `arrow`, `back`, `diag`, `down`, `plus`, `search`, `grid`, `pen`, `clock`, `alert`, `image`, `sliders`, `save`, `doc`, `layers`, `settings`, `ruler`, `mail`, `list`.
- `size` (opcional): lado em px. Sem ele o contexto decide: 20 px na interface, 16 px em botão e item de menu, 15 px na seta pequena.
- `label` (opcional): quando o ícone carrega informação sozinho (o tipo da matéria numa lista), vira `role="img"` com esse `aria-label` ("Teste", "Análise"). Sem `label`, fica `aria-hidden`.
- A cor vem de `currentColor`; defina `color` no pai.

**Faça.**
- Use setas como verbos: `arrow` avança, `back` volta, `diag` abre em outro lugar.
- Dentro de botão, deixe o ícone sem `label` e dê o nome da ação ao botão que o contém.

**Não faça.**
- Não use emoji, fonte de ícone, PNG ou glifo unicode no lugar do sprite.
- Não misture traços de outra biblioteca. `mail` e `list` vêm do Lucide porque o conjunto original não tem equivalente; a substituição está declarada no kit e é a única.

Classes do kit: `.i` e o sprite `#i-*`.

=== Anchor
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

=== Label
Rótulo de bloco: texto mono à esquerda, régua tracejada no meio e metadado à direita, sem quebrar linha.

**Quando usar.** No topo de cada bloco interno (card, painel lateral, grupo de campos) para dizer o que é e dar um dado curto sobre ele.

**O que você fornece.**
- `label`: o nome do bloco, com numeração quando a página numera (`"06.1 Botões"`).
- `meta` (opcional): texto curto à direita em mono cinza, ou um nó (um `Badge`, por exemplo).
- `style`: o kit zera a margem inferior (`margin: 0`) quando o bloco já tem gap próprio.

**Faça.**
- Escreva o metadado como dado: "Padrão 32 px · canto 8 · texto 14", "24 matérias".

**Não faça.**
- Não use `Label` para abrir seção de página; isso é `Anchor`.

Classes do kit: `.lbl`, `.lbl .hr`, `.mono`.

=== Button
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

=== IconButton
Seta em círculo com a altura do controle: 32 px no padrão, 28 na pequena e 40 na grande, com borda de controle de 1 px, preenchida de laranja na direção principal.

**Quando usar.** Para avançar, voltar ou abrir: próxima matéria, página anterior, abrir comparativo. É o verbo do sistema quando o texto já está ao lado.

**O que você fornece.**
- `label`: o nome da ação para leitor de tela (obrigatório: "Próxima", "Página anterior").
- `icon`: padrão `arrow`; também `back`, `diag`.
- `variant`: `"primary"` (laranja) ou `"line"` (padrão). `size`: `"sm"` (28 px), padrão (32 px) ou `"lg"` (40 px).
- `href` vira `<a>`; sem ele é `<button>`.

**Faça.**
- Laranja só na direção principal: em "anterior / próxima", apenas a próxima.

**Não faça.**
- Não coloque outro ícone além das setas e do `diag`.

Classes do kit: `.ico`, `.ico-orange`, `.ico-sm`, `.ico-lg`.

=== Link
Link de texto com sublinhado fino na cor da linha, que vira laranja no hover, e seta opcional.

**Quando usar.** Para levar a outra página ou seção: "Abrir o comparativo", "Ver o acervo". Em rodapé de card e fim de painel.

**O que você fornece.**
- `href` e `children` (o destino, começando por verbo).
- `icon` (opcional): `arrow` para seguir, `diag` para abrir algo externo ou lateral.

**Faça.**
- Diga para onde vai, não "clique aqui".

**Não faça.**
- Não use `Link` para executar ação (salvar, publicar); isso é `Button`.

Classes do kit: `.lnk`.

=== Input
Campo de texto com a altura do controle (32 px no padrão), rótulo, ícone opcional à esquerda, atalho opcional à direita e mensagem de ajuda ou de erro.

**Quando usar.** Para entrada curta: e-mail, endereço, busca, data. Texto longo vai no `Editor`.

**O que você fornece.**
- `label`: o rótulo acima (13 px/500). Sem rótulo, passe `aria-label`.
- `icon` (opcional): `mail`, `search`, `clock`.
- `kbd` (opcional): a tecla de atalho mostrada no fim do campo (`"/"` na busca).
- `help` ou `error`: texto abaixo. `error` pinta a borda de laranja, marca `aria-invalid` e mostra o ícone `alert`.
- Demais props vão para o `<input>`: `type`, `defaultValue`, `placeholder`, `autoComplete`, `onChange`.

**Faça.**
- Escreva o erro como instrução: "Inclua o endereço completo, com https://".

**Não faça.**
- Não use placeholder no lugar do rótulo.
- Não pinte o texto do erro de laranja; ele fica em `ink` 500, com o ícone.

Classes do kit: `.field`, `.inp`, `.inp.err`, `.help`, `.help.err`, `.kbd`.

=== Select
Seleção nativa dentro da mesma moldura do campo (32 px no padrão), com a seta `down` à direita.

**Quando usar.** Para escolher um valor de uma lista curta e conhecida: categoria, formato. Para filtrar uma vista, prefira `ChipGroup` ou `Segmented`.

**O que você fornece.**
- `label`, `help` ou `error`, como no `Input`.
- `options`: lista de textos ou de `{ value, label }`.
- Demais props vão para o `<select>`: `defaultValue`, `onChange`, `name`.

**Faça.**
- Ordene as opções pelo uso, não pelo alfabeto, quando houver uma mais comum.

**Não faça.**
- Não desenhe um menu próprio no lugar do `<select>` nativo.

Classes do kit: `.field`, `.inp`, `.inp select`.

=== Switch
Interruptor de 32 × 20 px com botão de 14 px que corre 12 px e fica lima quando ligado.

**Quando usar.** Para uma preferência que vale na hora, sem botão de salvar: "Receber a edição semanal".

**O que você fornece.**
- `label`: o texto da preferência, à esquerda, em linha com o interruptor. Sem `label`, passe `aria-label`.
- `defaultChecked`: estado inicial. O componente guarda o estado e chama `onChange(ligado)`.
- `disabled`.

**Faça.**
- Escreva o rótulo como o que acontece quando ligado.

**Não faça.**
- Não use para escolha que só vale após enviar um formulário; isso é `Checkbox`.

**Cor.** Lima marca só estado positivo: aqui, ligado.

Classes do kit: `.sw`, `.swrow`.

=== Checkbox
Caixa de marcar nativa de 16 px, em cor de tinta, com o texto à direita. Com `type="radio"` vira opção circular de escolha única.

**Quando usar.** Para itens de lista de verificação ou opções que valem ao enviar: "Fonte ao lado", "Ressalva escrita", "Imagem declarada". Rádio para uma escolha entre poucas opções visíveis: "Semanal, Quinzenal, Mensal".

**O que você fornece.**
- `label`: o texto do item.
- `type="radio"` com o mesmo `name` em todas as opções do grupo; envolva o grupo em `role="radiogroup"` com `aria-label`.
- Demais props vão para o `<input>`: `defaultChecked`, `onChange`, `name`, `disabled`.

**Faça.**
- Agrupe itens relacionados numa pilha com 12 px de intervalo, ou em linha com `.chips` e 20 px entre itens.

**Não faça.**
- Não use para ligar e desligar algo na hora; isso é `Switch`.

Classes do kit: `.chk`, `.chk input[type=radio]`.

=== ChipGroup
Grupo de chips de 28 px em pílula, com um selecionado de cada vez em fundo de tinta e, opcionalmente, um chip tracejado para acrescentar filtro.

**Quando usar.** Para filtrar uma lista por categoria: "Todas, Modelos, Ferramentas, Agentes".

**O que você fornece.**
- `options`: textos ou `{ value, label, icon }`.
- `defaultValue`: o selecionado no início (padrão, o primeiro). O componente guarda a seleção e chama `onChange(valor)`.
- `label`: o nome do grupo para leitor de tela ("Filtro por categoria").
- `addLabel` e `onAdd` (opcionais): chip tracejado com `plus` no fim ("Filtro").

**Faça.**
- Comece pela opção que mostra tudo.

**Não faça.**
- Não use chip como botão de ação nem como etiqueta de estado; estado é `Badge` ou `Status`.

Classes do kit: `.chips`, `.chip`, `.chip-dash`, `[aria-pressed=true]`.

=== Segmented
Controle segmentado com a altura do controle (botões internos de 26 px no padrão), com ícone e texto, para alternar entre modos de uma mesma vista.

**Quando usar.** Para trocar a forma de exibir o mesmo conteúdo: "Grade" e "Lista".

**O que você fornece.**
- `options`: `{ value, label, icon }`.
- `defaultValue` e `onChange(valor)`; o componente guarda a seleção.
- `label`: o nome do grupo ("Modo de exibição").

**Faça.**
- Mantenha duas ou três opções curtas.

**Não faça.**
- Não use para filtrar conteúdo; isso é `ChipGroup`. Para separar listas por estado, use `Tabs`.

Classes do kit: `.seg`, `.seg button`, `[aria-pressed=true]`.

=== Tabs
Abas sublinhadas de 40 px com contagem ao lado, sobre uma linha de 1 px.

**Quando usar.** Para separar a mesma lista por estado: "Todas 24, Rascunhos 3, Agendadas 2, Publicadas 19".

**O que você fornece.**
- `options`: `{ value, label, count }`; `count` aparece em cinza tabular.
- `defaultValue` e `onChange(valor)`; o componente guarda a aba ativa.
- `label`: o nome da lista para leitor de tela ("Matérias por estado").

**Faça.**
- Mostre a contagem de cada aba; a soma das partes bate com "Todas".

**Não faça.**
- Não use aba para trocar modo de exibição; isso é `Segmented`.

Classes do kit: `.tabs`, `.tab`, `[aria-selected=true]`, `.tab b`.

=== Kbd
Tecla de atalho em mono 11 px, numa caixa de 18 px com borda fina.

**Quando usar.** Para indicar o atalho de uma ação: "/" leva à busca. Dentro do campo, prefira a prop `kbd` do `Input` ou `shortcut` do `Toolbar`.

**O que você fornece.**
- `children`: a tecla ("/", "Esc", "⌘K").

**Não faça.**
- Não use para rótulo ou código; é só tecla.

Classes do kit: `.kbd`.

=== Badge
Etiqueta de estado de 22 px em Instrument Sans 12/500, com um ponto que diz o estado.

**Quando usar.** Para o estado que o leitor lê em card, cabeçalho e ficha: Publicado, Em revisão, Agendado, Rascunho. Estado que muda sozinho em tabela, lista ou menu é `Status`.

**O que você fornece.**
- `tone`: `"positive"` (lima, Publicado), `"live"` (ponto laranja, Em revisão), `"draft"` (tracejado, Rascunho) ou sem tom (Agendado).
- Estado de sistema: `"warn"` (âmbar, "Fonte pendente"), `"neg"` (vermelho, "Envio parou"), `"info"` (azul, "Novo").
- `square`: canto de 4 px, para selo curto dentro de linha de dado ("maior queda"). `plain`: sem o ponto.
- `children`: o estado em uma ou duas palavras.
- Contêiner: papel, card ou painel `.ink` (dentro de `.ink` a borda vira `ink-line`).

**Faça.**
- Use o mesmo texto para o mesmo estado em todo o produto.

**Não faça.**
- Não use lima para nada que não seja estado positivo.
- Não use verde, âmbar, vermelho ou azul como fundo de card, título ou ilustração.

**Laranja.** O ponto laranja de "Em revisão" marca um estado que pede atenção.

Classes do kit: `.badge`, `.badge-pos`, `.badge-live`, `.badge-draft`, `.badge-warn`, `.badge-neg`, `.badge-info`, `.badge-sq`, `.badge-plain`.

=== Status
Ponto de estado de 7 px com texto em Instrument Sans 12/500 cinza.

**Quando usar.** Para estado que muda sozinho em tabela, lista, menu ou rodapé de painel: Sincronizado, Atrasado 2 h, Falhou, Pausado, Ao vivo.

**O que você fornece.**
- `tone`: `"positive"` (verde), `"warn"` (âmbar), `"neg"` (vermelho), `"info"` (azul), `"idle"` (anel vazio) ou `"live"` (laranja pulsando). Sem tom, ponto cinza.
- `children`: o texto do estado.
- Sem `children`, passe `label`: o ponto vira imagem com `aria-label` (item de menu, coluna estreita).

**Faça.**
- Diga o motivo no texto quando couber ("Atrasado 2 h").

**Não faça.**
- Não use ponto sem texto nem `label`: cor sozinha não informa.

Classes do kit: `.status`, `.status-pos`, `.status-warn`, `.status-neg`, `.status-info`, `.status-idle`, `.status-live`.

=== Delta
Variação com seta e cor juntas, em Instrument Sans 12/600 tabular: verde para cima, vermelho para baixo, traço cinza para estável.

**Quando usar.** Ao lado de um número que mudou contra o período anterior: "3,1%" em Assinantes, "2,3%" em Cliques.

**O que você fornece.**
- `direction`: `"up"` (padrão), `"down"` ou `"flat"`. Dá a seta.
- `tone` (opcional): `"good"` ou `"bad"` trocam a cor quando a direção engana (tempo por ticket caiu 53%: seta para baixo, verde); `"plain"` tira o fundo.
- `children`: a variação sem sinal ("12,4%"); a seta já diz a direção.

**Faça.**
- Diga o período de comparação no rodapé do painel ("eram 12.026 em 31 ago").

**Não faça.**
- Não use só a cor, sem a seta.

Classes do kit: `.delta`, `.delta-up`, `.delta-down`, `.delta-flat`, `.delta-good`, `.delta-bad`, `.delta-plain`.

=== Toast
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

=== Banner
Aviso de bloco com contorno laranja, ícone `alert`, título do problema e o que fazer.

**Quando usar.** Quando algo bloqueia ou põe em risco o próximo passo: "Três matérias sem fonte declarada".

**O que você fornece.**
- `title`: o problema, em uma linha.
- `children`: a consequência e a saída ("A publicação fica bloqueada até cada número ter a amostra ao lado.").
- `icon`: padrão `alert`.

**Faça.**
- Um banner por bloco, no topo do que ele bloqueia.

**Não faça.**
- Não use para confirmação; isso é `Toast`.

**Laranja.** Aviso é atenção: o contorno e o ícone são laranja.

Classes do kit: `.banner`.

=== Tooltip
Balão de tinta de 13 px com seta para baixo, acima do elemento que explica.

**Quando usar.** Para completar o sentido de um controle sem texto visível, como uma seta ou um ícone: "Publica na data agendada".

**O que você fornece.**
- `label`: o texto do balão, uma frase curta.
- `children`: o elemento que dispara (um só). O componente liga `aria-describedby` e mostra o balão em hover e em foco.
- `open`: deixa o balão sempre visível (documentação, onboarding).
- `align`: `"center"` (padrão) ou `"start"`.

**Faça.**
- Escreva o que acontece, não o nome do botão.

**Não faça.**
- Não coloque informação essencial só no balão.

Classes do kit: `.tipwrap`, `.tip`.

=== Dialog
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

=== Meter
Barra de progresso de 8 px (6 px na versão pequena), com o rótulo e a porcentagem acima, marcador de meta tracejado e escala opcional abaixo.

**Quando usar.** Para progresso determinado com total conhecido ("Enviando · 8.320 de 12.400") e para taxa contra meta dentro de `Stat` ("48,2%, meta 50%"). Espera sem total usa `Skeleton` ou `busy`.

**O que você fornece.**
- `value`: de 0 a 100, aceita decimal (48,2 → `48.2`).
- `label` (opcional): o que está em andamento, com os números; mostra a linha de cima com `valueLabel` (padrão "67%"). Sem `label`, passe `aria-label`.
- `goal` (opcional): posição da meta, de 0 a 100.
- `scale` (opcional): `true` escreve "0 · meta N% · 100%"; ou `[esquerda, meio, direita]`.
- `small`: barra de 6 px, para `Stats`.
- `caption` (opcional): legenda mono abaixo.

**Faça.**
- Mostre o total junto da porcentagem.

**Laranja.** O preenchimento laranja é o papel "barra de progresso".

Classes do kit: `.meter`, `.meter .bar`, `.bar-sm`, `.goal`, `.scale`, `.rule-lbl`.

=== EmptyState
Tela de ausência desenhada: ícone, título editorial, o que fazer e a ação para sair dela.

**Quando usar.** Quando uma lista está vazia ("Nenhum rascunho ainda.") ou quando um processo parou ("O envio parou.").

**O que você fornece.**
- `title`: com um destaque em itálico.
- `children`: o próximo passo e quanto custa ("A primeira leva cerca de dois minutos.").
- `actions`: um `Button` ou um grupo `.chips` centralizado.
- `tone="error"`: contorno laranja e ícone `alert`. `icon` troca o ícone padrão (`doc`).

**Faça.**
- No erro, diga a hora e o que não aconteceu ("Nada foi enviado em duplicidade.").

**Não faça.**
- Não deixe a tela vazia sem ação.

Classes do kit: `.empty`.

=== Skeleton
Esqueleto com a forma do conteúdo que vai chegar: bloco de mídia e linhas, pulsando devagar.

**Quando usar.** Enquanto uma lista ou card carrega. Para ação em andamento use `Button` com `busy`.

**O que você fornece.**
- `media` (padrão `true`): o bloco de 88 px.
- `lines` (padrão 2): a última fica com 60% da largura.
- `label`: texto para leitor de tela (padrão "Carregando").

**Faça.**
- Imite o layout real, na mesma largura.

**Não faça.**
- Não use um giro solto no lugar do esqueleto.

Classes do kit: `.skel`, `.skel i.med`, `.skel i.sm`.

=== Card
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

=== Row
Linha de matéria com miniatura 64 × 80, categoria, título e uma frase, terminada por seta em círculo.

**Quando usar.** Em pilhas de matérias ao lado de um card de destaque ou em listas de "leia também".

**O que você fornece.**
- `image`, `kicker` (categoria), `title`, `children` (uma frase), `href`, `actionLabel` (padrão "Ler").

**Faça.**
- Mantenha o título em uma ou duas linhas.

**Não faça.**
- Não use a seta laranja aqui; a linha é secundária ao card.

Classes do kit: `.card.row`.

=== Quote
Citação em card com rótulo, frase em Garamond e assinatura com avatar.

**Quando usar.** Para o ponto de vista do autor ou de uma fonte, fora do corpo da matéria.

**O que você fornece.**
- `kicker` ("Ponto de vista"), `children` (a frase, com um destaque em itálico), `author` ("Kelvi Maycon · editorial da edição 07"), `initial` ou `avatar` (URL).

**Faça.**
- Cite uma frase que alguém disse ou escreveu, com a fonte.

**Não faça.**
- Não use para depoimento sem autor.

Classes do kit: `.card.quote`, `.kick`, `.avatar`.

=== Note
Nota de ressalva sobre fundo de apoio, com rótulo mono e o limite do que foi medido.

**Quando usar.** Ao lado de todo número que tenha recorte: "Recorte de 400 tickets em 14 dias, uma empresa só."

**O que você fornece.**
- `kicker` ("Ressalva") e `children` (o recorte e em que direção o número muda).

**Faça.**
- Diga a amostra, o período e o que muda fora dela.

**Não faça.**
- Não use como destaque decorativo; a nota é conteúdo.

Classes do kit: `.note`.

=== Avatar
Círculo de 40 px com inicial em Garamond itálico, foto ou o símbolo da marca.

**Quando usar.** Na assinatura da matéria, na citação, na barra do produto e no perfil social.

**O que você fornece.**
- Uma das três: `initial` ("K"), `src` + `alt`, ou `mark`.
- `tone` para o símbolo: `"ink"` (padrão, maior círculo em papel), `"orange"` ou `"paper"`.
- `size` em px (28 na citação, 32 na barra, 48 no grupo). Ajuste `style.fontSize` junto quando reduzir a inicial (15 px em 28 px).
- Avatares com símbolo vão num contêiner `.avatars`, que dá 48 px e reduz o símbolo para 24 × 12, como no kit.

**Faça.**
- Dê `aria-label` com o nome quando o avatar estiver sozinho.

**Não faça.**
- Não use o avatar com símbolo para pessoa; ele representa a marca.

Classes do kit: `.avatar`, `.avatar.orange`, `.avatar.paper`, `.avatars`.

=== Reader
Leitor de matéria completo: cabeçalho com rótulo, título, linha fina e assinatura, imagem 2,4:1, texto com coluna lateral e navegação anterior e próxima.

**Quando usar.** Para a página de uma matéria. É a anatomia do `Card` em escala maior.

**O que você fornece.**
- `kicker`, `title` (um destaque em itálico), `lead`.
- `author`: `{ name, initial, meta }` ("14 set 2026 · 6 min de leitura"); `saveLabel` e `onSave` para o botão "Salvar para depois" (`saveLabel={null}` esconde).
- `figure`: `{ src, alt, caption, credit }`; o crédito declara imagem gerada ("Noir Dither · imagem gerada").
- `children`: o texto dentro de `.prose` (`p.lead`, `p`, `h4`, `blockquote`, `a`).
- `aside`: a coluna de 300 px (ficha do teste com `Spec`, link para os dados).
- `prev` e `next`: `{ href, image, title }`.

**Faça.**
- Declare a amostra antes do resultado e a imagem gerada no crédito.

**Não faça.**
- Não use mais de um destaque em itálico por título.

Classes do kit: `.reader`, `.r-head`, `.byline`, `.r-fig`, `.r-grid`, `.prose`, `.aside`, `.np-grid`, `.np`.

=== Spec
Ficha de termos e valores com divisórias tracejadas, valor curto à direita em mono 12 (é rótulo de ficha, não número de painel).

**Quando usar.** Na coluna lateral do `Reader` ("Ficha do teste") e onde houver um conjunto curto de atributos: modelo, fonte, amostra, empresa, status.

**O que você fornece.**
- `items`: `[{ term, value }]`; `value` pode ser texto ou nó (um `Badge`).

**Faça.**
- Escreva valores curtos que caibam numa linha.

**Não faça.**
- Não use para dados comparativos; isso é `Table`.

Classes do kit: `.spec`.

=== Slide
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

=== DataPanel
Painel de leitura de dados em tinta, com rótulo do teste, título editorial e a fonte da amostra no canto, que recebe `Ledger` e `TargetTrack`.

**Quando usar.** Para o resumo numérico de um teste. É o único painel `ink` da seção.

**O que você fornece.**
- `kicker` ("Teste · GPT-6 Astra") e `title` com um destaque em itálico.
- `source`: `{ label, value, meta }`. `label` padrão "Fonte:", `value` em negrito ("400 tickets reais de suporte"), `meta` em mono ("Amostra fechada · 31 ago 2026"). Sai com o ícone `doc`.
- `meta` (texto): alternativa antiga a `source`, só a data em mono.
- `children`: `Ledger`, `TargetTrack` ou outro conteúdo sobre tinta.

**Faça.**
- Declare de onde vem a amostra e quando fechou.

**Não faça.**
- Não empilhe dois painéis de tinta na mesma seção.

Classes do kit: `.ink.data`, `.data-top`, `.src`.

=== Ledger
Linha de quatro números grandes em Instrument Sans 46/500 tabular, cada um com rótulo, unidade separada, comparação opcional e a frase que diz de onde veio.

**Quando usar.** Dentro de `DataPanel`, para os números principais de um teste: aderência, tickets, dias, tempo por ticket.

**O que você fornece.**
- `items`: `[{ label, value, unit, compare, delta, note, highlight }]`. `value` é texto ("2,4"); `unit` vem separada ("min").
- `compare` e `delta` (opcionais): a linha de comparação abaixo do número. `delta` aceita nó ou `{ direction, tone, value }` ("16 p.p.", `tone: "bad"`); `compare` é o texto ("abaixo do Fable 5.1", "era 5,1 min"). Se um item tiver, todos ganham a linha (vazia quando faltar), para as quatro colunas alinharem.
- `highlight`: o número em laranja. Um por linha.
- Contêiner: painel `.ink` (as cores do ledger são de tinta).

**Faça.**
- Escreva a origem de cada número na nota ("124 respostas aceitas sem edição, de 400.").

**Não faça.**
- Não destaque mais de um número.

**Laranja.** O número destacado sai em laranja; a linha de comparação não muda.

Classes do kit: `.ledger`, `.ledger .hi`, `.ledger dd.cmp`.

=== TargetTrack
Régua de meta sobre tinta: barra preenchida até o valor medido com o número em cima, tracejado até a meta, marcador com o rótulo da meta e escala embaixo.

**Quando usar.** Para comparar um resultado com a meta declarada antes do teste: "Aderência medida contra a meta declarada".

**O que você fornece.**
- `label`, `value` e `target` (0 a 100).
- `valueLabel`: padrão "N%", sobre a ponta da barra.
- `gapLabel`: padrão "faltam N pontos"; `null` esconde. `targetLabel`: padrão "Meta N%".
- `ticks`: escala embaixo, padrão `[minLabel ou "0", "25", "50", "75", maxLabel ou "100%"]`; `false` esconde.
- Contêiner: painel `.ink`, normalmente dentro de `DataPanel`.

**Faça.**
- Declare a meta antes de mostrar o resultado.

Classes do kit: `.rule`, `.rule-lbl`, `.track`, `.fill`, `.gapfill`, `.target`, `.ticks`.

=== Metric
Número de painel em Instrument Sans 500 tabular, com a unidade menor e cinza ao lado.

**Quando usar.** Para o número principal de uma peça de painel, fora do `Ledger`: "12.400", "48,2%", "2,4 min".

**O que você fornece.**
- `value` ("48,2") e `unit` (opcional: "%", "min", "de 10").
- `size`: `"sm"` (20 px), padrão (28 px) ou `"lg"` (40 px).

**Faça.**
- Escreva o número em formato brasileiro: ponto no milhar, vírgula no decimal.

**Não faça.**
- Não escreva número de painel em mono; mono fica para rótulo curto.

Classes do kit: `.metric`, `.metric-sm`, `.metric-lg`.

=== Stat
Peça de painel: rótulo, apoio à direita, número com variação, visualização e rodapé, em grade de quatro áreas.

**Quando usar.** Para um indicador com contexto: "Assinantes 12.400, +374 no período", "Taxa de abertura 48,2%, meta 50%". Isolado vira card; dentro de `Stats`, célula de faixa.

**O que você fornece.**
- `label` ("Assinantes") e `icon` (nome do sprite: sai numa caixa de 28 px antes do rótulo; em card avulso, sempre).
- `note` (opcional): texto curto ao lado do número ("leituras até o fim", "faltam 3 para a meta").
- `aside`: texto curto (vira mono cinza: "1 – 14 set", "De 400") ou um nó que recebe a classe `stat-aside` (`Badge`).
- `value`, `unit` e `size`, repassados ao `Metric`.
- `delta` (opcional): nó, normalmente `Delta`, ao lado do número.
- `viz` (opcional): `Sparkline`, `Meter`, `HBars`, `Pips` ou `Spark`; recebe a classe `stat-viz`.
- `row` (opcional): linha lado a lado no lugar de `value` e `viz` (`Ring` com número e legenda).
- `foot`: rodapé em 12 px sobre um fio; `<b>` destaca o número ("<b>5.977</b> de 12.400"). Com `Pips`, o rodapé é uma `Legend` com os tons `on`, `hi` e `off`.

**Faça.**
- Dê a amostra ou o período no rodapé.
- Em cards lado a lado, use o mesmo `size` ("lg") e dê número a todos: o número e o rodapé caem no mesmo y da fileira.

**Não faça.**
- Não ponha duas visualizações na mesma peça.

Classes do kit: `.stat`, `.stat-label`, `.stat-ico`, `.stat-aside`, `.stat-value`, `.stat-viz`, `.stat-row`, `.stat-foot`.

=== Stats
Faixa de indicadores em grade, separados por linha de 1 px, num só contorno de canto 16.

**Quando usar.** No topo de um painel do período: até oito números curtos lado a lado ("Assinantes 12.400", "Abertura 48,2%", "Descadastros 38", "Receita média R$ 1,50"), cada um com rótulo, valor, variação e um rodapé que diz de onde o número vem ("eram 12.026 em 31 ago", "5.977 abriram · meta 50%").

**O que você fornece.**
- `children`: `Stat`; cada um perde o card e vira célula.
- `cols`: máximo de colunas da faixa (padrão 8). Cada célula tem no mínimo 168 px, então a faixa quebra antes do máximo quando falta largura; abaixo de 860 px o máximo cai para 4 e abaixo de 560 px para 2.
- `ink`: faixa sobre tinta.

**Faça.**
- Com oito indicadores, deixe o `Stat` enxuto: rótulo, valor, `Delta` e rodapé com o número de origem em `<b>`. Ícone e `Sparkline` ficam para faixas de até quatro.
- Unidade antes do número vai em `<small>` dentro do valor ("R$" em "R$ 18,6 mil").

Classes do kit: `.stats`, `.stats.ink`.

=== Spark
Barras verticais de uma série curta, com a última em laranja.

**Quando usar.** Dentro de `Stat`, para mostrar o formato de 7 a 30 dias sem eixo: "Assinaturas por dia, pico em 14 set".

**O que você fornece.**
- `values`: números da série; a altura sai do maior valor.
- `height` (opcional, px; o kit usa 40, o painel 48).
- `label` (opcional): resumo para leitor de tela; sem ele o gráfico fica oculto e o rodapé diz o que importa.

**Não faça.**
- Não use para série longa ou com eixo; isso é gráfico de verdade.

Classes do kit: `.spark`.

=== Ring
Anel de progresso de 72 px (112 px no grande), com a porcentagem no centro.

**Quando usar.** Ao lado de um número, para mostrar a fração que ele representa: "33%" de leitura completa em `Stat` com `row`.

**O que você fornece.**
- `value`: de 0 a 100. `valueLabel` troca o texto do centro (padrão, o valor arredondado com "%").
- `size`: `"lg"` para a versão de 112 px.

Classes do kit: `.ring`, `.ring-track`, `.ring-value`, `.ring-lg`.

=== Pips
Contagem discreta em blocos de 8 px: tinta para feito, laranja para em andamento, vazio para o que falta.

**Quando usar.** Para metas pequenas e inteiras: "7 de 10 testes, 4 publicados e 3 em revisão".

**O que você fornece.**
- `total` (padrão 10), `filled` (tinta) e `highlighted` (laranja, depois dos preenchidos).
- `label` (opcional): resumo para leitor de tela; sem ele os blocos ficam ocultos.

Classes do kit: `.pips`, `.pips i.on`, `.pips i.hi`.

=== Sparkline
Linha de tendência sem eixo, com área clara embaixo e um ponto no último valor.

**Quando usar.** Dentro de `Stat`, para o formato de 7 a 30 dias: "Assinantes de 1 a 14 set". Mostra direção, não valor exato.

**O que você fornece.**
- `values`: números da série; a escala vai do menor ao maior, com 4 de folga em cima e embaixo.
- `highlight`: linha em laranja. Uma por faixa, no indicador que o painel quer mostrar.
- `label` (opcional): resumo para leitor de tela; sem ele fica oculta e o rodapé diz o que importa.

**Não faça.**
- Não use para comparar valores entre dias; isso é `Chart`.

Classes do kit: `.sparkline`, `.sparkline.hi`.

=== Chart
Gráfico de barras por dia com grade, eixo em pt-BR, linha de média e barra destacada com anotação. Passar o mouse mostra "valor · data".

**Quando usar.** No corpo de um `Panel` com seções: "Assinaturas por dia, 1 a 14 set".

**O que você fornece.**
- `values` e `label` (resumo para leitor de tela: média, pico e dia).
- `labels` (eixo x, padrão 1, 2, 3…) e `dates` (texto da dica, padrão igual a `labels`: "14 set").
- `max` (opcional) e `ticks` (padrão 4). Sem `max`, o topo arredonda para passo 1, 2, 2,5 ou 5 × 10^k (64 em 4 divisões vira 0 · 20 · 40 · 60 · 80).
- `average`: `true` calcula a média, número usa esse valor; sem ele, não há linha.
- `highlight`: índice ou lista de índices em laranja; `annotation` vai sobre o último destacado ("Edição 07").

**Faça.**
- Ponha uma `Legend` no cabeçalho da seção quando houver destaque e média.

Classes do kit: `.chart`, `.chart-plot`, `.chart-grid`, `.chart-avg`, `.chart-bars`, `.chart-x`.

=== StackBar
Barra horizontal de composição de 12 px: cada parte ocupa a fração do seu valor.

**Quando usar.** Acima de `Breakdown`, para a origem de um total: "Matéria 52%, home 29%, social 19%".

**O que você fornece.**
- `items`: `[{ value, tone }]`. `tone`: `"hi"` (laranja), `"on"` (tinta) ou nenhum (cinza).
- `label`: a composição por extenso, para leitor de tela.

Classes do kit: `.stackbar`.

=== Breakdown
Lista da composição em cinco colunas alinhadas: marcador, rótulo, fatia, valor e variação.

**Quando usar.** Abaixo de `StackBar`, com as mesmas cores: "Matéria 52% 214 ↑18%".

**O que você fornece.**
- `items`: `[{ label, share, value, delta, tone }]`. `share` ("52%") e `value` ("214") são texto; `delta` aceita nó ou `{ direction, tone, value }`; sem ele a célula fica vazia. `tone` como no `StackBar`.

Classes do kit: `.breakdown`, `.delta`.

=== Insight
Leitura curta de um gráfico, com ícone laranja e o trecho que importa em negrito.

**Quando usar.** No fim de uma seção de painel, para dizer o que o número mostra: "O formulário no fim da matéria traz **mais da metade** das assinaturas".

**O que você fornece.**
- `children`: uma ou duas frases, com `<b>` no ponto central.
- `icon` (opcional, padrão `diag`).

Classes do kit: `.insight`.

=== Legend
Legenda de gráfico em linha: marcador de 8 px e rótulo em 12 px.

**Quando usar.** No cabeçalho de uma seção com `Chart`: "Dia comum, Dia de edição, Média".

**O que você fornece.**
- `items`: `[{ label, tone }]`. `tone`: `"hi"` (laranja), `"avg"` (tracejado da média) ou nenhum (cinza).

Classes do kit: `.legend`.

=== HBars
Barras horizontais com rótulo, trilho de 8 px e valor à direita.

**Quando usar.** Para comparar poucas categorias no mesmo critério: aderência por modelo (Claude Fable 5.1 47%, GPT-6 Astra 31%, Gemini 3.8 Flash 22%), assinaturas por origem.

**O que você fornece.**
- `items`: `[{ label, value, valueLabel, highlight }]`; `highlight` pinta a barra de laranja.
- `max` (opcional): o 100% da barra. Sem ele, o maior valor enche a barra; para porcentagem, passe `max: 100`.

**Faça.**
- Ordene do maior para o menor e destaque só um.

Classes do kit: `.hbars`, `.hbars i.hi`.

=== Funnel
Funil de etapas com número, nome, barra relativa à primeira etapa, valor e a taxa de passagem entre etapas. A menor taxa ganha vermelho e o selo "maior queda".

**Quando usar.** Para uma jornada em sequência: 18.420 visitas → 6.134 leituras completas → 412 assinaturas → 239 primeiras edições abertas.

**O que você fornece.**
- `steps`: `[{ label, sub, value, valueLabel, rateLabel }]`. `value` é número; `rateLabel` é o verbo da passagem até essa etapa ("leem até o fim", "assinam").
- `show`: `"count"` (padrão, "18.420") ou `"rate"` (fração da primeira etapa, "33,3%").
- `dropLabel`: texto do selo da maior queda (padrão "maior queda"; `null` tira o selo).

**Faça.**
- Ponha o funil num `Panel` com `kicker` ("Conversão · 1 – 14 set 2026"), título com um `<em>` ("Funil do *período*") e um `Segmented` "Quantidade / Taxa" ligado a `show`.

**Não faça.**
- Não marque queda à mão; a taxa sai dos valores.

Classes do kit: `.funnel`, `.funnel-step`, `.funnel-n`, `.funnel-name`, `.funnel-bar`, `.funnel-value`, `.funnel-rate`, `.funnel-rate.drop`.

=== Panel
Card de painel com cabeçalho: contexto em mono acima, título em 17/600, legenda cinza e ferramentas à direita. Com `sections`, vira o painel do período: faixa de indicadores e corpo em duas colunas.

**Quando usar.** Para agrupar uma visualização com o que ela mede: "Funil do período". Com `sections`, para o resumo de um período: "Desempenho da newsletter, 1 – 14 set 2026".

**O que você fornece.**
- `kicker` (opcional): recorte e período em mono acima do título (`.kick`, "Newsletter · 1 – 14 set 2026").
- `title`, `caption` (opcional) e `tools` (opcional: um nó, ou lista de nós que vai num `.panel-tools`: `Segmented` e `Button`). Marque uma palavra do título com `<em>` ("Desempenho da *newsletter*").
- `children`: a visualização e, se houver, a leitura dela em `.help` abaixo de um `.dash`.
- `flush` ou `sections`: painel sem respiro (`article.card.panel`). `stats` recebe um `Stats` abaixo do cabeçalho. `sections`: `[{ kicker, title, caption, tools, content }]`; a primeira ocupa 2/3 e a segunda 1/3, empilhadas em tela estreita.

**Faça.**
- Na seção de origem, use `StackBar`, `Breakdown` e `Insight` nessa ordem.

Classes do kit: `.card`, `.pad`, `.panel`, `.panel-head`, `.panel-tools`, `.panel-body`.

=== SecHead
Título de seção de uma vista: contexto em mono laranja acima, título em h3 com uma palavra em itálico, linha de apoio e ferramentas à direita.

**Quando usar.** Acima de uma tabela ou de um bloco que ocupa a largura da tela: "Matérias · 1 – 14 set 2026" e "As doze mais *lidas*". Dentro de card com título de painel, use o `kicker` do `Panel`.

**O que você fornece.**
- `kicker` (opcional): recorte e período ("Teste · 400 tickets reais").
- `title`: o h3; marque uma palavra com `<em>`.
- `caption` (opcional): como ler o bloco ("Ícone diz o tipo, faixa colorida diz se passou da meta de leitura até o fim").
- `tools` (opcional): um nó, ou lista de nós que vai num `.panel-tools`.

**Faça.**
- Na `Table`, passe o `SecHead` em `head`.

**Não faça.**
- Não marque mais de uma palavra com `<em>`.

Classes do kit: `.sec-head`, `.kick`, `.panel-tools`.

=== Toolbar
Barra de ferramentas acima de tabela: busca com atalho, ações, uma nota de contagem e controles à direita.

**Quando usar.** No topo de `Table` e de listas longas: buscar, filtrar, escolher colunas, densidade, exportar.

**O que você fornece.**
- `search` (placeholder, "Buscar alternativa"), `searchLabel` (opcional) e `shortcut` (tecla, "/").
- `children`: `Button` (`line` ou `ghost`) à esquerda.
- `note` (opcional): texto em 13 px que empurra o resto para a direita ("<b>1</b> de 3 selecionada"). Numa `Table` com `selectable`, a contagem entra sozinha.
- `end` (opcional): nós à direita, depois da nota (`Segmented` de densidade, `Exportar`). Sem nota, o primeiro recebe `to-end`.

**Faça.**
- Use a densidade em `Segmented` ("Compacta, Padrão, Confortável") ligado ao `density` da `Table`.

Classes do kit: `.toolbar`, `.toolbar-note`, `.to-end`, `.inp`, `.kbd`.

=== Table
Tabela comparativa em card: título de seção, barra de ferramentas, cabeçalho em mono 11 caixa alta, linhas com divisória sólida fina, números em Instrument Sans tabular à direita, comparação em coluna própria como chip de cor, linha de total, rodapé "Mostrar mais" e nota de recorte.

**Quando usar.** Para comparar alternativas no mesmo critério (aderência, nota do júri, tempo, custo, estado) ou para listar matérias por leitura, conclusão e conversão.

**O que você fornece.**
- `columns`: `[{ key, label, num, sort, group }]`. `num` alinha à direita em tabular; `sort` (`"descending"` ou `"ascending"`) marca a coluna ordenada com a seta laranja e `aria-sort`.
- `group`: colunas vizinhas com o mesmo `group` ganham um cabeçalho em comum numa primeira linha do `thead` ("Qualidade", "Operação", "Custo"), e a coluna que abre cada grupo ganha o fio `.g0`. A seleção entra no primeiro grupo e as ações no último; grupo sem nome usa `''`.
- `rows`: objetos por `key`. Cada célula aceita:
  - texto ou nó (`Status`, `Badge`, `Delta`);
  - `{ value, sub }`: em coluna de texto, "Em revisão" e "desde 12 set";
  - `{ icon, title, sub, highlight }`: primeira coluna com o ícone do sprite no quadrado (`layers` modelo, `settings` agente, `sliders` ferramenta; `diag`, `pen`, `doc` para teste, análise e guia). `highlight` pinta o quadrado de laranja. `{ letter, title, sub }` põe uma letra no lugar do ícone;
  - `{ share, value, highlight }`: barra de 56 px com o número; `highlight` em laranja; uma coluna de barra por tabela;
  - `{ lvl, value }`: faixa colorida do nível, `'good'` na meta, `'warn'` perto, `'bad'` abaixo ("4,6", "64%");
  - `{ na: true }`: valor ausente, "–" em cinza. Fica sempre no fim da ordenação, nos dois sentidos.
- Qualquer célula objeto aceita `sort` (valor de ordenação: `{ value: Status, sub: "desde 12 set", sort: 2 }`). `selected: true` marca a linha; `key` identifica a linha na seleção; `label` nomeia a linha nos rótulos de seleção.
- `head` (opcional): um `SecHead` acima da barra ("Oito alternativas *lado a lado*").
- `toolbar` (opcional): um `Toolbar`.
- `sortable`: cabeçalhos viram botões. O primeiro clique ordena coluna `num` do maior para o menor e texto de A a Z; o segundo inverte. Sem `cell.sort`, coluna `num` ordena pelo número do texto ("R$ 2,10" vira 2,1).
- `selectable`: coluna de caixas, com "Selecionar todas" (fica indeterminada com seleção parcial). Estado inicial de `row.selected`; `onSelectionChange(keys)` recebe as chaves. Com `toolbar` sendo um `Toolbar` sem `note`, a contagem "<b>1</b> de 8 selecionada" entra nele.
- `limit` e `step` (opcionais): mostra as primeiras `limit` linhas e o rodapé "Mostrando 5 de 8 · Mostrar mais 3"; cada clique abre mais `step` (padrão igual a `limit`). Com tudo aberto, o botão vira "Mostrar menos". A ordenação respeita o limite.
- `actions` (opcional): `(row) => nó` na última coluna (`Button` `ghost` `sm` só ícone, "Abrir Claude Fable 5.1").
- `foot` (opcional): linha de total por `key` ("Média das oito", "29,4%").
- `density`: `"compacta"` (linha de 36 px, sem texto de apoio), padrão 48 px ou `"confortavel"` (60 px).
- `ink`: a tabela inteira sobre tinta.
- Melhor valor da coluna: `{ value, best: true }` (ou `best` na célula `share`). No claro, contorno laranja de 1 px; na tinta, lima. Um por coluna; `Badge` fica fora de célula numérica.
- Comparação ("vs antes", "vs média") vai em coluna `num` própria, com `{ value: Delta, sort }`: o chip tem 64 px fixos. O tom segue o sentido do resultado: tempo que cai é verde (`tone: 'good'`), custo acima da média é vermelho (`'bad'`).
- `footnote`: o recorte e a regra de leitura ("Nota do júri: 4 ou mais passa, 3 a 3,9 fica perto, abaixo de 3 não passa.").
- Coluna de nome mais larga: `style={{ '--alt-w': '420px' }}` para títulos de matéria.
- A tabela tem largura mínima de 700 px e rola na horizontal dentro da moldura, com seleção e primeira coluna fixas.

**Faça.**
- Uma linha por número; texto de apoio só nas colunas de nome e estado.
- Diga no rodapé de recorte a base da comparação e o que cada faixa de `lvl` significa.
- Use `Status` para estado dentro da tabela.

**Não faça.**
- Não use a tabela sem o rodapé de recorte.
- Não escreva "0" ou "n/d" para dado que não existe: use `{ na: true }`.

**Escopo.** O estilo de `table`, `thead`, `tbody`, `tfoot`, `tr`, `th` e `td` vale só dentro de `.tbl`: as regras do kit entram presas a `:where(.tbl)`, com a mesma especificidade do kit. Uma tabela fora do componente não herda nada.

Classes do kit: `.tbl`, `.tbl-box`, `.tbl-more`, `table`, `th`, `th.grp`, `.g0`, `td.na`, `tfoot`, `.num`, `.alt`, `.share`, `.lvl`, `.best`, `.th-sort`, `.sel`, `.act`, `.toolbar`, `.sec-head`.

=== Workspace
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

=== Rail
Barra de ícones em tinta com o símbolo no topo, as áreas do produto e o avatar no pé.

**Quando usar.** Como primeiro bloco do `Workspace`.

**O que você fornece.**
- `items`: `[{ value, icon, label }]` (Acervo, Rascunhos, Métricas, Newsletter, Ajustes).
- `defaultValue` e `onChange(valor)`; o componente guarda a área ativa.
- `initial` e `user` para o avatar.

**Faça.**
- Dê a cada botão o nome da área em `label`.

**Não faça.**
- Não coloque texto na barra.

Botões de 40 px com ícone de 18 px.

**Laranja.** A área ativa tem fundo `ink-2` e ícone laranja.

Classes do kit: `.rail`.

=== Menu
Menu contextual com título, busca, rótulos de grupo e itens com a altura do controle (32 px), com contagem ou ponto de estado. Em papel ou em tinta.

**Quando usar.** Como segundo bloco do `Workspace`, para navegar dentro da área escolhida na barra.

**O que você fornece.**
- `variant`: padrão (card em papel) ou `"ink"` (menu em tinta, o do kit).
- `title` ("Acervo"); `search` (placeholder, padrão "Buscar", ou `false`) e `searchLabel`.
- `sections`: `[{ label, items: [{ value, icon, label, count, status, statusLabel }] }]`. `status` usa os tons de `Status` ("positive", "warn"), com `statusLabel` para leitor de tela ("Sincronizado").
- `defaultValue` e `onChange(valor)`; um item ativo no menu inteiro.

**Faça.**
- Mostre a contagem de cada item; canal mostra estado, não contagem.

**Não faça.**
- Não aninhe submenus.

**Laranja.** O item ativo tem fundo mais claro, borda fina e ícone laranja.

Classes do kit: `.menu`, `.menu.ink`, `.mlbl`, `.mi`, `.mi .status`.

=== ContentPanel
Bloco de conteúdo do produto: trilha de navegação e ferramentas no topo, a vista abaixo.

**Quando usar.** Como terceiro bloco do `Workspace`.

**O que você fornece.**
- `crumbs`: `["AiCreatorOS", "Acervo"]`; o último fica em negrito.
- `tools`: controles à direita (`Segmented`, `Button` tinta "Nova matéria").
- `children`: a vista, com 20 px de respiro. `plain` tira esse respiro para um `Editor`.

**Faça.**
- Use `Button` tinta aqui; o laranja fica para a ação final da vista.

**Não faça.**
- Não repita o título do menu dentro da vista.

Classes do kit: `.cont`, `.c-top`, `.crumbs`, `.c-tools`, `.view`.

=== MiniGrid
Grade do acervo em três colunas, que vira lista de uma coluna no modo lista.

**Quando usar.** Para listar matérias dentro do `ContentPanel`.

**O que você fornece.**
- `children`: `Mini`.
- `list`: liga o modo lista, com miniatura de 110 px à esquerda e estado à direita. Ligue a um `Segmented` "Grade / Lista".

**Faça.**
- Pagine com contagem ("1–6 de 24 matérias").

Classes do kit: `.minis`, `.as-list`.

=== Mini
Card do acervo do produto: imagem 16:10, categoria, título em Garamond e linha com data, tempo e estado.

**Quando usar.** Dentro de `MiniGrid`.

**O que você fornece.**
- `image`, `kicker` (categoria), `title`, `meta` ("14 set · 6 min"), `status` (um `Badge`).

**Faça.**
- Mostre o estado em todo card.

**Não faça.**
- Não coloque ação no card; o card inteiro abre a matéria.

Classes do kit: `.mini`, `.mt`, `.meta`.

=== Editor
Editor de matéria em duas colunas: título e texto à esquerda, publicação à direita.

**Quando usar.** Na área Rascunhos, dentro de `ContentPanel` com `plain`.

**O que você fornece.**
- `kicker` ("Rascunho · Agentes"); a contagem de palavras aparece sozinha à direita.
- `defaultTitle`, `defaultText` e `onChange(texto)`.
- `tools`: controles abaixo do texto (botão "Imagem de capa", ajuda "Rascunho salvo às 09:42").
- `side`: a coluna de 272 px (Label com Badge, Select, Input de data, Checkbox, Log e as ações "Pré-visualizar" e "Revisar").

**Faça.**
- Ponha a lista de verificação da matéria (fonte, ressalva, imagem declarada) antes das ações.

**Não faça.**
- Não use mais de uma ação laranja na coluna.

Classes do kit: `.editor`, `.ed-write`, `.ed-title`, `.ed-side`, `.ed-actions`.

=== Log
Registro de atividade em mono: hora à esquerda, evento à direita, divisórias tracejadas.

**Quando usar.** Na coluna do `Editor` ou em qualquer painel que precise mostrar o que mudou e quando.

**O que você fornece.**
- `entries`: `[{ time, title, text }]`; `title` sai em negrito ("Rascunho salvo · 312 palavras").

**Faça.**
- Ordene do mais recente para o mais antigo.

Classes do kit: `.log`.
