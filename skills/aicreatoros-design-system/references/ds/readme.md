AiCreatorOS é um produto editorial independente sobre inteligência artificial, escrito e
publicado por Kelvi Maycon: notícias, testes práticos e comparativos, sempre "com a fonte ao
lado". O sistema cobre três superfícies: a **marca editorial** (wordmark, imagens Noir Dither,
cor), a **leitura** (matéria, site, newsletter, carrossel, painéis de dados) e o **produto**
(workspace em três blocos: trilho de ícones, menu, conteúdo). A interface é em português (pt-BR).

## Como gerar uma peça

Siga os cinco passos na ordem. Tela genérica nasce quando se pula o primeiro; tela parada e igual à
entrega anterior, quando se pula o terceiro.

1. **Parta do modelo.** Ache o entregável na tabela de rotas, copie o arquivo de `modelos/` inteiro e
   troque o conteúdo peça por peça. O comentário no topo de cada modelo diz o que trocar e o que não
   mexer. Dado que não cabe na peça do modelo troca de peça pela tabela abaixo; a vaga não fica vazia
   nem vira texto solto.
2. **Consulte o capítulo do kit** da rota em `Kit Completo.html#<id>` para variações e estados.
3. **Invente a peça-herói** (seção Peça-herói) a partir do dado desta entrega. É a única parte da
   tela sem modelo e a única com forma, luz e movimento livres.
4. **Monte o resto só com o catálogo** (seção Componentes). Se faltar uma peça, componha com as que
   existem e diga na entrega o que faltou. Fora da peça-herói, classe, cor, sombra, gradiente ou fonte
   inventados quebram o sistema.
5. **Passe no checklist** antes de entregar, com o render aberto ao lado do modelo.

### Dado sem a peça do modelo

| O dado tem | Peça |
| --- | --- |
| Série no tempo | `.sparkline` ou `.spark` no `.stat`; `.chart` no corpo do painel |
| Parte de uma base (taxa, adesão, preenchimento) | `.ring` ou `.meter` no `.stat`, com a base no `.stat-foot` |
| Meta ou referência | `.meter` com `--g`; `.track` com `.target` em resultado de teste |
| Contagem por categoria | `.hbars` até 8 itens; `.stackbar` com `.breakdown` quando as partes somam um todo |
| Etapas em sequência | `.funnel` |
| Comparação com antes, meta ou média | `.delta` com seta ao lado do número |
| Número sem comparação | `.help` ao lado do número com a base ("de 1.240 respostas") |
| Valor contra um limite (bom · atenção · ruim) | `.lvl` na célula da tabela |
| Itens com vários atributos | `.tbl.tbl-box` com `.sec-head` e `.toolbar`; lista longa com `data-limit` |
| Poucos recortes, cada um com seus itens | `.seg[data-group]` ou `.tabs` trocando a `.tbl` do recorte; se for a pergunta principal da tela, vira a peça-herói |
| Conclusão da leitura | `.insight` com ícone do sprite |

Sem série no tempo, o painel troca `.sparkline` e `.chart` por proporção e categoria, e mantém o
ícone de cada `.stat`, o gráfico do corpo e o `.insight`. Na mesma fileira, cada tipo de visualização
aparece no máximo duas vezes: alterne `.sparkline`, `.spark`, `.ring`, `.pips`, `.hbars` e `.meter`.
Com série diária no dado, a série vem primeiro; o `.meter` fica para número com meta ou limite.

### Código que monta a tela

- Template em JS repete o markup inteiro do modelo: `.stat-ico` com ícone, `.stat-value` com `.delta`
  ou `.help`, visualização e `.stat-foot`. Template só com rótulo e número é a falha mais comum.
- Em React, use os componentes de `components/` (`Stat` com `icon`, `delta`, `note` e `viz`; `Table`
  com `sortable`, `selectable` e `actions`; `Panel` com `stats` e `sections`), sem recriar peça em JSX.
- Fora da peça-herói, CSS local só posiciona: colunas da grade, `gap` entre blocos, `position: sticky`. Não redefine
  tamanho, fonte, padding, borda, canto ou fundo de classe do kit (`.metric`, `.card`, `.stat`,
  `.panel-head`, `.view`). Peça que parece errada pede outra classe do catálogo.

### Regras que valem em toda peça

- **Largura toda da janela, sempre.** Painel, site e matéria ocupam a janela inteira: contêiner sem
  `max-width` e sem centralização. Tela larga ganha colunas e informação, não margem. Só o texto
  corrido tem medida (`.prose`, parágrafo em `ch`); e-mail (640 px), slide 4:5 e celular têm o
  tamanho do formato.
- Carregue `styles.css` e depois `kit-v9/kit.css`; `kit-v9/kit.js` quando houver segmentado, chips,
  abas, tabela ordenável, troca de densidade ou primitiva de movimento (`data-reveal`, `data-split` e
  as demais da seção Movimento). GSAP, Three.js e as outras bibliotecas liberadas entram depois do
  `kit.js`. Nos modelos o caminho é `../styles.css`.
- Preto, branco e detalhes em laranja. Tinta e creme carregam tudo; o laranja faz os papéis da seção
  Cor. Lima só sobre tinta (`.ink`), em estado positivo; em superfície clara esse detalhe é laranja.
  Sem cinza frio, azul de marca, roxo ou gradiente de fundo; a luz da peça-herói é a exceção.
- Título tem exatamente um destaque `<em>`: Garamond itálico em laranja. É a assinatura do sistema;
  título sem ele parece de outra marca. Título de seção abre com `.kick.mono` de contexto e fecha com
  linha de apoio (`.sec-head` ou `.panel-head`); texto pequeno solto não abre seção.
- Alinhamento é critério de aceite. Na fileira, número e rodapé caem no mesmo y; o eixo do gráfico
  encosta nas barras; rótulo não colide com a linha de meta; coluna ao lado de outra mais alta não
  deixa faixa vazia. `node build/checa.mjs` aponta o que escapa ao olho (Checklist, item 11).
- Sem sobra dentro de card: nada de faixa vazia no meio ou embaixo. Citação não estica; recorte ao
  lado de card mais alto vai para a largura toda; card com imagem ao lado de uma pilha (`.g2>.acard`)
  deixa a imagem preencher a altura. Gráficos da mesma fileira têm a mesma altura.
- Peça web tem tema claro e escuro, com o botão `.tema` no topo (seção Cor, "Tema escuro").
- Imagem é da série Noir Dither (`assets/img/`), declarada como gerada. Nunca foto de banco,
  ilustração ou ícone ampliado no lugar dela.
- Número lido ou comparado é Instrument Sans tabular, também na tabela. JetBrains Mono fica em rótulo
  curto em caixa alta, cabeçalho de tabela, data, tempo de leitura e horário de log.
- Informação compacta: mais dado útil por tela, em peça pequena. Um período se resume numa faixa de
  6 a 8 KPIs, não em quatro blocos grandes.
- Controles com 28 · 32 · 40 px pela densidade, canto 8, texto 14. Card com canto 24 e borda 1 px
  `line`. Sem sombra (a única é a do botão pressionado do segmentado).
- Ícones: os 21 do sprite (lua e sol só no botão de tema), traço 2 px. Sem emoji.
- Conteúdo de exemplo é do AiCreatorOS: matérias, testes de IA, edições da newsletter, assinantes,
  leitura. Nunca dados de outro negócio (anúncios, vendas, CPA). Dado real que o briefing entrega
  entra como veio, de qualquer área, nas mesmas peças.
- O cromo da página do kit não entra em peça (lista abaixo).

## Peça-herói

Painel, home do site e abertura da matéria começam por uma peça-herói: a composição que mostra a
manchete do dado e se mexe. É a única parte da tela sem modelo. O kit não traz uma pronta de
propósito: a Órbita (esfera de pontos, cards com anel de porcentagem e curvas até uma lista) saiu em
30/09/2026 porque toda entrega passou a repeti-la. Newsletter e carrossel ficam estáticos.

**1. Manchete.** Uma frase com número, sobre o que mudou ou quem lidera: "Anthropic tem 7 das 10
variantes mais bem avaliadas", "o custo por tarefa caiu 62% em seis meses". A peça mostra essa frase;
o resto do dado vai para o painel e a tabela abaixo dela.

**2. Forma.** A metáfora sai da forma do dado. A tabela abre caminho; combinar, inverter ou sair dela
é o esperado. Duas entregas seguidas do mesmo projeto usam direções diferentes.

| Forma do dado | Direções |
| --- | --- |
| Ranking, disputa | barras que largam juntas e chegam em ordem; pódio em profundidade; linha de chegada com a distância até o segundo |
| Parte de um todo | 100 unidades que se reagrupam por dono; bloco que se parte nas fatias; mapa de área que abre no clique |
| Série no tempo | linha que se desenha com a rolagem e para nos marcos; número gigante que muda junto com a data; antes e depois com divisor arrastável |
| Muitos itens | enxame com um ponto por item, que se reorganiza quando o leitor troca o critério |
| Fluxo, etapas | partículas escoando entre etapas na vazão real; funil em perspectiva que estreita com a rolagem |
| Dois lados | tela dividida que o cursor desloca; dois números que avançam um contra o outro até mostrar a diferença |
| Manchete editorial | Garamond gigante revelado por máscara sobre imagem Noir em camadas com paralaxe |

**3. Coreografia.** Três tempos, com os tokens da seção Movimento:

- entrada: 3 a 5 batidas encadeadas (fundo e luz, forma, número, rótulos), com o número principal
  legível em até 1,6 s;
- resposta: o gesto do leitor (cursor, clique, arrasto, rolagem) muda algo que carrega dado:
  reordena, filtra, destaca ou revela o valor;
- vida: movimento lento e contínuo enquanto a peça está na tela (luz que respira, deriva de
  partículas, ciclo de 20 a 40 s), parado fora dela e com a aba oculta.

**4. Profundidade e escala.** Três camadas: imagem Noir ou campo de luz no fundo, forma do dado no
meio, título e número na frente. Um elemento grande (número ou título em Garamond) contra detalhe
pequeno em mono, com um foco só em laranja.

**Liberdade.** Dentro da peça-herói valem CSS, SVG, canvas, WebGL e script próprios, com prefixo de
classe da peça (`.h-<nome>`) e sem redefinir classe do kit. Gradiente, luz, ruído, partícula, shader e
3D entram aqui e só aqui, com as cores dos tokens: tinta, creme, papel, laranja, e lima só sobre
tinta. Fonte e cor novas continuam fora. GSAP, Three.js e as outras bibliotecas da seção Movimento
estão liberadas.

**Limites.**

- Largura toda da janela e sem sobra; abaixo de 860 px a peça se recompõe em uma coluna e o toque
  substitui o hover.
- Sem JS, sem WebGL ou com `prefers-reduced-motion`, aparece o estado final parado com o mesmo dado.
- Número e título existem em HTML, nunca só dentro do canvas; controle é `button` com foco visível.
- Uma peça-herói por vista.

**Não entra.**

- Nada que lembre a Órbita: esfera ou globo de pontos, cards com anel de porcentagem, curvas ligando
  cards a uma lista.
- Peça-herói copiada de outra entrega, de um modelo ou de um espécime do capítulo `#movimento` (os
  espécimes são técnicas para combinar).
- Movimento que só enfeita (flutuar, girar, pulsar) sem ligação com o dado.
- Grade de cards iguais no lugar da peça.

Na entrega, declarar a manchete, a direção escolhida, as bibliotecas usadas e o fallback.

## Rotas

| Entregável | Comece por | Capítulos do kit | Peças que definem a tela |
| --- | --- | --- | --- |
| Tela de produto, painel de métricas | `modelos/painel.html` | `#produto`, `#dados`, `#acoes` | `.ws` `.rail` `.menu` `.cont` `.c-top`, peça-herói, `.card.panel` `.stats` (faixa de 8), `.chart`, `.stackbar` `.breakdown`, `.funnel`, `.sec-head` `.toolbar` `.tbl.tbl-box` |
| Home do site | `modelos/site-home.html` | `#site`, `#newsletter` | `.site-top` `.site-hero` `.site-list` `.site-foot`, formulário `.field` `.inp` |
| Matéria | `modelos/materia.html` | `#leitura` | `.card.reader` `.r-head` `.byline` `.r-fig` `.prose` `.aside` `.spec` `.np-grid` |
| Newsletter (e-mail) | `modelos/newsletter.html` | `#newsletter` | `.card.mail` `.env` `.mbody` `.cover` `.story` `.signoff` |
| Carrossel Instagram 4:5 | `modelos/carrossel.html` | `#social` | `.slide-cover` `.slide-paper` `.slide-end` `.slide-safe` `.slide-bars` `.slide-chrome` |
| Telas mobile | `modelos/mobile.html` | `#mobile` | `.phone[data-density=confortavel]` `.ph-top` `.ph-list` `.ph-bar` |
| Resultado de teste, comparativo | `modelos/painel.html` (parte de dados) | `#dados`, `#leitura` | `.ink.data` `.src` `.ledger`, `.rule` `.track` `.ticks`, `.tbl`, `.note` |
| Aviso, diálogo, estado vazio | capítulo | `#feedback` | `.toast` `.banner` `.dialog` `.empty` `.skel` `.tip` |

`modelos/index.html` mostra todos os modelos lado a lado. Formato fora da tabela: parta do modelo mais
próximo e do capítulo correspondente, nunca de uma página em branco.

## Perfis por formato

**Produto.** Três blocos sobre `soft` com 12 px de gap: trilho `ink` de 56 px, menu em card de 232 px,
conteúdo em card. Item de menu ativo tem fundo `paper`, borda `line` e ícone laranja. Menu escuro:
`.menu.ink`. Cabeçalho do conteúdo em `.c-top` com um botão escuro (`.btn-ink`); a ação laranja só
aparece se for a principal da tela.

**Painel e tabela.** A vista abre pela peça-herói (seção Peça-herói), inventada a partir do dado da
entrega; o modelo não traz uma de propósito. Painel do período em
`.card.panel`: `.panel-head` com `.kick.mono`, título com `<em>` e período comparado; `.stats` como
faixa compacta de 6 a 8 KPIs, cada um com rótulo, `.metric` e `.delta` em `.stat-value` e uma
sublinha derivada em `.stat-foot` (base, taxa, valor anterior, valor por unidade). `--cols` é o
máximo por linha (8; 4 abaixo de 860 px; 2 abaixo de 560) e a faixa divide a largura sem sobra.
Quatro blocos grandes no lugar da faixa gastam a tela com pouca informação. `.panel-body` com o
gráfico (`.chart` e `.legend` no cabeçalho da seção) e a composição (`.stackbar`, `.breakdown`,
`.insight`). O delta tem seta e a cor segue o efeito: `.delta-good` ou `.delta-bad` quando cair é bom
(tempo, custo). A fonte do número fica à vista: `.src` no painel em tinta, `.stat-foot` ou `.help` no
resto.
Peça avulsa em `.card.stat`, sempre na mesma grade: cabeçalho de 28 px (`.stat-ico` com ícone do
sprite, título, apoio mono ou `.badge` à direita), `.metric.metric-lg` com `.delta` ou `.help` ao lado,
visualização presa ao rodapé e `.stat-foot` sobre fio. Em fileira, todas com número: o número e o
rodapé caem no mesmo y. Meta no `.meter` vai em `--g` no próprio `.meter`, e o rótulo fica centrado no
traço. Legenda de `.pips` usa `.legend` com `i.on`, `i.hi` e `i.off`.
Tabela em `.tbl.tbl-box`, aberta por `.sec-head` (`.kick.mono`, título com `<em>`, linha de apoio) e
`.toolbar` (busca, filtros, `.toolbar-note` com a seleção, ações à direita). Cabeçalho em faixa de
tinta compacta (`h-th` 28 · 32 · 36): mono 11 em caixa alta, `inv-muted`, divisória tracejada entre
colunas; a coluna ordenada acende em `paper` com traço laranja embaixo (`.th-sort`, `aria-sort`).
Colunas agrupadas ganham uma linha `th.grp` acima, e a primeira coluna de cada grupo leva `.g0` (fio
sólido à esquerda). Corpo com divisória tracejada entre colunas e fio contínuo entre linhas; a
primeira coluna fica presa com borda contínua.
A primeira coluna é `.alt`: ícone do sprite em caixa de 28 (`i.hi` laranja no item em destaque), nome
em uma linha com reticências e linha de apoio em `small` (tipo, autor, estado). Número numa linha só,
à direita, em sans tabular, nunca mono. Comparação ("vs antes", "vs média") em coluna `.num` própria,
com `.delta` de 64 px fixos: verde (`.delta-good`) quando o resultado melhora, vermelho (`.delta-bad`)
quando piora; tempo e custo que caem saem em verde. Valor contra um limite em `.lvl` (`-good`,
`-warn`, `-bad`), chip de 56 px sem seta. Melhor valor da coluna em `.best`, um por coluna: contorno
laranja no claro, lima cheio dentro de `.ink`. Dado ausente em `td.na` mostra traço (–):
fica em `muted` e vai para o fim na ordenação, nos dois sentidos. `.badge` fica fora de célula
numérica, porque o texto 12 dele sai da linha de base dos vizinhos. Barra na célula (`.share`) em uma
coluna por tabela, a da métrica principal. Tabela com uma métrica por linha (entidades lado a lado)
fica sem barra e marca o melhor da linha com `.best`. Seleção em `.sel`, ação da linha em `.act`,
`tfoot` para total ou média.
Linha de 48 px; `data-density="compacta"` (36, só a primeira linha) em tabela longa. Lista longa em
`table[data-limit="6"]`: mostra as primeiras linhas e cria o rodapé "Mostrar mais" (`data-step` linhas
por clique); a ordenação vale para todas. No celular, seleção e nome ficam presos à esquerda enquanto
o resto rola. Dentro de `.ink` a tabela inverte sozinha: cabeçalho um tom acima, lima no `.best` e no
`.lvl-good`.
Cor e ritmo: laranja na série ou barra destacada de cada gráfico (`.hi`), na última barra do
`.spark`, no anel, no medidor, no ícone do item ativo e no `.best` do claro; lima só dentro de `.ink`;
cor de estado no `.delta` e no `.lvl`. Cada vista tem uma peça principal maior (peça-herói, gráfico em
duas colunas ou `.card.stat.ink` com o número do período) e o resto em fileira. Tela feita só de cards
iguais em tinta e cinza é o erro mais visível. Barras, anéis e medidores animam ao entrar na tela
(`kit.js`), e o gráfico mostra o valor no hover.

**Interação inteligente.** A interação responde à pergunta que o leitor faz depois de ver o número
principal, sem sair da tela. Antes de montar, escrever essa pergunta e escolher o gesto:

| Pergunta seguinte do leitor | Peça e gesto |
| --- | --- |
| "E dentro de cada recorte?" (3 a 5 recortes com itens próprios) | `.seg[data-group]` ou `.tabs` trocando a `.tbl` do recorte |
| "E visto de outro jeito?" (mesmo dado em duas leituras) | `.seg[data-group]` com `data-show` |
| "Quais são os piores ou os maiores?" (lista longa) | `.tbl` ordenável com `data-limit`; filtro da `.toolbar` com script da página |
| "Quanto foi naquele dia?" (série no tempo) | `.chart` com `data-n` e `data-d`: valor no hover |
| "O que muda se eu apertar isto?" (densidade, período) | `.seg[data-group]` que troca `data-*` no contêiner |

Quando nenhuma peça responde, criar uma nova:
- cor e fonte só dos tokens; fora da peça-herói, só classes do kit;
- o estado vive no HTML (`aria-pressed`, `hidden`, `data-*`), e sem JS a primeira opção aparece inteira;
- o script da página escuta o evento `pick` que o `kit.js` dispara em todo `[data-group]`, em vez de
  reimplementar o segmentado;
- movimento pelos tokens de duração e curva (seção Movimento), desligado em `prefers-reduced-motion`;
- teclado e leitor de tela: `button` de verdade, foco visível, `aria-label` quando só há ícone;
- abaixo de 860 px a peça vira uma coluna, sem perder a troca.

Uma peça interativa principal por vista. Controle que não muda nada que o leitor não veria de outro
jeito sai. Controle ou primitiva de movimento que se repetir em duas entregas vira proposta de classe no kit,
com pedido. Composição de peça-herói nunca vira classe, modelo ou exemplo do kit.

**Site e matéria.** Largura toda da janela, margem 40. Um título hero por página. Texto corrido até
44ch. Item ativo da navegação com fundo `soft` e anel `line`, na altura do botão ao lado. Data e tempo de leitura em mono. Um botão laranja por página (inscrição).

**Newsletter.** 640 px, centralizada, um botão laranja, matérias separadas por linha tracejada,
rodapé com cancelamento e aviso de imagem gerada.

**Carrossel 4:5.** Slide de 1080 × 1350 (432 px no HTML, exportado a 2,5×). Abre com capa sobre
imagem, desenvolve em papel, fecha em tinta. Topo do slide vazio: sem contador, sem marca. O
`@aicreatoros` e o contador `n / total` ficam só em `.slide-chrome`, no rodapé. Texto dentro de
`.slide-safe` (8% nas laterais e no topo, 17% embaixo). Um destaque `<em>` por título.

**Mobile.** 390 px, densidade confortável (40 px em botão, campo e barra de ícones). A barra inferior
`.ph-bar` fica a 8 px da borda com cantos concêntricos ao aparelho (28, 20, 16). Tipografia do
desktop, sem encolher. Uma ação laranja por tela.

## O que não entra em peça

Estas classes montam a página do kit. Em peça gerada elas aparecem como cromo sem função:

- masthead e progresso (`.top`, `.progress`), abertura (`.intro`, `.hero` do kit), índice (`.idx`);
- abertura de capítulo (`.ch`, `.anchor`, `.head`) e numeração tipo "06.1", "Estudo 09", "Parte B";
- rótulo de bloco do kit (`.lbl`); em peça, o título de bloco é `.panel-head` (produto) ou `.kick`
  (editorial);
- partes e panorama (`.part`, `.pano`, `.tile`, `.bars`), fecho (`.end`);
- espécimes do capítulo Movimento (`.mv-*`, `kit-v9/movimento.js`): técnicas para estudar, sem uso
  direto em peça;
- peças didáticas: `.swatch`, `.type-*`, `.crop`, `.recipe`, `.iconset`, `.glyphs`, `.icon-sizes`,
  `.gridfig`, `.stackfig`, `.ladder`, `.cols`, `.imgstrip`, `.states`, `.phones` como vitrine.

## Checklist de entrega

1. **Rota.** A peça partiu de um modelo ou capítulo e manteve a estrutura dele.
2. **Superfícies.** Fundo `page` ou `paper`; card `card` com borda 1 px `line` e canto 24; no máximo
   um painel `ink` por seção.
3. **Três vozes.** Instrument Sans na interface e nos números, tabela inclusive; Garamond nos títulos
   com um destaque `<em>`; mono só em rótulo curto, cabeçalho de tabela, data e horário. Título de
   seção com `.kick.mono` e `<em>`.
4. **Cor.** Preto, branco e detalhes em laranja; lima só dentro de `.ink`; cores de estado (`pos`,
   `warn`, `neg`, `info`) só em estado de sistema.
5. **Medidas.** Controles pela densidade (28 · 32 · 40), canto 8, texto 14; linha de tabela 48 com
   cabeçalho em faixa de tinta; divisória entre colunas tracejada, entre linhas contínua em `line-2`.
6. **Imagem.** Noir Dither de `assets/img/`, cortada e nunca esticada, declarada como gerada.
7. **Ícones.** Do sprite, 20 · 16 · 14 px.
8. **Sem cromo do kit.** Nenhuma âncora numerada, `.lbl`, "Estudo 09" ou topo no slide.
9. **Conteúdo.** Números com amostra, em pt-BR, do universo AiCreatorOS ou do dado entregue.
10. **Acabamento.** Faixa `.stats` com 6 a 8 KPIs, cada um com número, `.delta` ou `.help` e
    sublinha derivada; `.card.stat` avulso com `.stat-ico`, número, visualização e `.stat-foot`. Na
    fileira, no máximo duas visualizações do mesmo tipo. Painel tem faixa de números, gráfico ou
    composição e `.insight`, com laranja no destaque de cada gráfico. Seção abre com `.sec-head` ou
    `.panel-head`; lista com atributos é `.tbl` com `.alt` na primeira coluna, `.toolbar` e barra em
    uma coluna só. Cards da mesma fileira alinham número e rodapé. Tela na largura toda da janela,
    sem `max-width`. O render tem pelo menos as peças do modelo; com menos, a tela foi simplificada e
    volta ao passo 1.
11. **Verificação.** Render em 1920 × 1080 (desktop) e 390 × 844 (celular),
    nos dois temas; nunca em 1440, que esconde faixa vazia e bloco esticado. `node build/checa.mjs
    <página>` (desktop por padrão) e `--mobile`, cada um também com `--escuro`,
    termina com 0 achados: faixa vazia, vazio no card, lima no claro, fora da borda, transbordo,
    sobreposição e quase alinhado, cada um com o seletor. Saída 2 ou 404 é erro do checador, não aprovação. Interação clicada no render: gesto da
    peça-herói, ordenação, "Mostrar mais", segmentado, botão de tema.
12. **Peça-herói e movimento.** A peça nasceu da manchete desta entrega e não repete composição de
    outra entrega nem lembra a Órbita. Número principal legível em até 1,6 s; o gesto do leitor muda
    dado; a vida contínua para fora da tela. Com `prefers-reduced-motion`, sem JS e sem WebGL aparece
    o estado final com o mesmo dado. Três quadros do render (início, meio e fim da entrada) provam a
    coreografia, e nenhum deles tem texto sobreposto ou peça fora do lugar. Console sem erro.

**Conflito entre briefing e sistema** (cor, fonte, componente, estrutura): pergunte antes de
escolher, com as duas opções e o efeito de cada uma. Nunca remova um elemento de marca por conta
própria.

## Arquivos

| O quê | Onde |
| --- | --- |
| Modelos prontos para copiar | `modelos/*.html`, índice em `modelos/index.html` |
| Kit completo, Estudo 09 (referência de composição) | `Kit Completo.html` |
| Movimento: tokens, primitivas, técnicas com GSAP e Three.js | `Kit Completo.html#movimento` |
| Estilo e interações | `kit-v9/kit.css`, `kit-v9/kit.js` |
| Tokens | `styles.css` → `tokens/{fonts,colors,typography,layout}.css` |
| Componentes React | `components/`, props em `components/index.d.ts` |
| Fontes | `assets/fonts/` |
| Ícones (19 SVG) | `assets/icons/`; sprite inline no topo do kit e de cada modelo |
| Logos | `assets/logo-mark.svg`, `assets/logo-mark-inverse.svg` |
| Imagens Noir Dither | `assets/img/` |
| Gerador do pacote do Claude Design | `build/make.mjs` (gera `components/`, `guidelines/`, `_ds_*`) |
| Checador de alinhamento e cor | `build/checa.mjs` (regras em `kit-v9/checa.js`; serve a pasta do DS) |
| Versão anterior preservada | `historico/` (fora do repo; não usar como referência) |

Capítulos do kit, pelo `id`:

- `#panorama`: o sistema numa tela.
- Fundamentos: `#marca` · `#tipografia` · `#grade` · `#icones` · `#imagem`.
- Componentes: `#acoes` (ações, campos, seleção, estado) · `#feedback` · `#leitura` · `#dados`.
- Aplicações: `#produto` · `#site` · `#newsletter` · `#social` · `#mobile`.

## Conteúdo

Copy em português, wordmark em minúsculas, frases em caixa de frase, curtas. A voz é primeira
pessoa do singular e medida: o autor relata o que mediu, nomeia a amostra e diz o limite antes que
o leitor pergunte.

- **Títulos** imperativos ou condicionais, com exatamente um destaque em itálico que carrega o
  julgamento: "Antes de adotar, *entenda.*", "Inteligência com *critério.*", "Três blocos,
  *um produto.*".
- **Primeira pessoa** para o método ("Fechei a amostra antes de começar"); **segunda pessoa** para o
  que está em jogo para o leitor ("o que muda no seu trabalho na segunda-feira?").
- **Número sempre com a amostra**: "31%", seguido de "124 respostas aceitas sem edição, de 400". A
  ressalva é conteúdo, não apêndice: "Recorte de 400 tickets em 14 dias, uma empresa só."
- **Rótulos mono** em caixa alta, espaçados .06em, sem quebra de linha: `NOIR DITHER · IMAGEM GERADA`,
  `EDIÇÃO 07 · 14 SET`.
- **Imagem gerada é sempre declarada** no rodapé da peça.
- Sem emoji, sem exclamação, sem adjetivo de hype: a afirmação mais forte é uma afirmação medida.

## Cor

Tinta e creme carregam tudo. Laranja e lima são raros e têm papéis fechados.

| Token | Valor | Papel |
| --- | --- | --- |
| `ink` | `#1D1D1B` | Texto principal, ícones, painel de tinta, trilho do produto |
| `paper` | `#F4F1E9` | Fundo de leitura; texto sobre tinta; fundo do item ativo |
| `page` | `#F7F4EE` | Fundo de página |
| `card` | `#FFFDFA` | Card, menu, campo, diálogo |
| `soft` | `#E8E4DB` | Apoio: fundo do workspace, hover sobre papel, desabilitado |
| `line` | `#CBC6BB` | Borda de card; divisória interna, sempre tracejada |
| `line-2` | `#E3DED3` | Divisória sólida fina entre linhas de tabela e entre stats |
| `ctl` | `#807B70` | Borda de controle: botão de contorno, campo, seta redonda |
| `muted` | `#5A5952` | Texto secundário, metadado, rótulo |
| `ink-2` · `ink-line` · `inv-muted` | `#2C2C29` · `#45433E` · `#CBC6BB` | Hover, linha e texto secundário sobre tinta |
| `orange` | `#F05A37` | Marca, nos papéis abaixo |
| `lime` | `#D8F35A` | Estado positivo, só sobre tinta |
| `lime-line` | `#B4D22D` | Sem uso em peça: lima não entra em fundo claro |
| `pos` · `warn` · `neg` · `info` | `#2F7A36` · `#946200` · `#C42B3E` · `#2F58C9` | Estado de sistema, com fundos `-bg` claros |

Os aliases semânticos (`text-1`, `text-2`, `surface-card`, `border-control`, `accent`,
`state-positive`, `focus-ring` e os demais) apontam para esses valores; use o alias quando o papel
for o da nota dele.

**Laranja** `#F05A37`: um valor só, em qualquer fundo, nunca salmão ou vermelho; hover é
`filter: brightness(.92)`, nunca um segundo hex. Papéis:

- ação primária, no máximo uma por bloco (`.btn-primary`, seta `.ico-orange`);
- o destaque em itálico do título;
- ícone do item ativo no trilho e no menu;
- número em destaque (`.ledger .hi`, barra `.hi` em `.hbars`, `.chart-bars` e `.stackbar`, `.sparkline.hi`, `.share`, `.slide-bars`, última barra do `.spark`);
- em superfície clara, os detalhes que na tinta são lima: `.best`, switch ligado, ponto do
  `.badge-live`, seleção de texto;
- o foco da peça-herói (a forma, o número ou a luz que carrega a manchete);
- o "os" do wordmark e o ponto do `.kick`;
- foco (contorno 2 px, afastado 3 px).

**Lima** `#D8F35A` marca estado positivo e só aparece sobre tinta (`.ink`, trilho, toast), com texto
`ink` quando é fundo: `.best`, `.badge-pos`, `.lvl-good`, `.delta` positivo, `.status-pos`, switch
ligado, ícone do `.toast-ok`, seleção de texto. Em superfície clara não
aparece: o mesmo detalhe é laranja, e publicado usa o verde de estado. Nunca entra em imagem.

**Cores de estado** (`pos`, `warn`, `neg`, `info`) aparecem só em `.badge`, `.status` e `.delta`:
o que o sistema informa, não decoração. Badge para categoria que o leitor lê (card, cabeçalho,
ficha); ponto `.status` para estado que muda sozinho (tabela, lista, menu); `.delta` sempre com a
seta, nunca só a cor.
No claro, `.delta` e `.lvl` de estado levam fio de 1 px da própria cor, 26% sobre o fundo do chip.

### Tema escuro

Toda peça web tem os dois temas. O botão `.btn.btn-line.btn-icon.tema` fica no topo (Kit, painel,
site, matéria, índice) com as duas imagens, lua no claro e sol no escuro; o `kit.js` alterna
`data-theme="dark"` no `<html>`, troca o `aria-label` (diz a ação) e grava `aios-tema`. Um script de
uma linha no `<head>` aplica a escolha antes do primeiro paint: copiar do modelo junto com o botão.

| Token | Claro | Escuro |
| --- | --- | --- |
| `page` | `#F7F4EE` | `#161614` |
| `card` | `#FFFDFA` | `#1E1D1B` |
| `paper` · `soft` | `#F4F1E9` · `#E8E4DB` | `#252422` · `#2D2C29` |
| `ink` (texto) | `#1D1D1B` | `#F1EDE4` |
| `muted` | `#5A5952` | `#ABA69B` |
| `line` | `#CBC6BB` | `#46433F` |
| `pos` · `warn` · `neg` | `#2F7A36` · `#946200` · `#C42B3E` | `#D8F35A` · `#F2B53A` · `#FF7A6B` |

- Laranja igual nos dois temas. No escuro o fundo é escuro, então os detalhes positivos são lima.
- Painel `.ink`, cabeçalho de tabela, trilho e toast ficam em `#0E0E0D` com anel de 1 px, para se
  separar da página.
- Arte exportada não muda: slide do carrossel e corpo do e-mail mantêm as cores do claro; só a
  página em volta escurece. Imagem Noir igual.
- Contraste medido: texto 12 a 15,5:1, `muted` 5,8 a 7,5:1, laranja 4,6 a 5,4:1, borda de controle
  3,8 a 4,9:1.
- Verificar os dois temas: `node build/checa.mjs <página> --escuro`.

## Tipografia

Três vozes, cada uma com um papel:

- **Instrument Sans**: interface, títulos de produto e todo número lido ou comparado (tabular).
- **ITC Garamond Condensed**: voz editorial. Romano nos títulos de matéria, itálico no destaque.
- **JetBrains Mono**: rótulo curto em caixa alta, data, tempo de leitura, horário de log, paginação.

| Estilo | Tamanho / entrelinha | Peso · tracking | Uso |
| --- | --- | --- | --- |
| `fs-hero` | 92 / .94 | 500 · −.055em | Título de abertura, um por página (46 a 92 px) |
| `fs-display` | 56 / 1 | 500 · −.045em | Título display de seção e produto (40 a 56 px) |
| `fs-h2` | 40 / 1.05 | 500 · −.04em | Título de seção e de tela (32 a 40 px) |
| `fs-lead` | 21 / 1.45 | 400 | Linha fina de abertura de matéria |
| `fs-body` | 17 / 1.5 | 400 | Texto corrido, até 44ch |
| `fs-control` | 14 / 1 | 500 | Rótulo de botão (600 no primário); texto digitado em 400 |
| `fs-ui` | 14 / 1.4 | 400 | Item de menu, checkbox, lista da interface |
| `fs-meta` | 13 / 1.4 | 400 | Metadado e rótulo de stat em `muted` |
| `ed-title` | 36 / 1.05 | 400 · −.02em | Título de matéria em Garamond (30 a 36 px) |
| `fs-h3` | 30 / 1.1 | 400 · −.02em | Intertítulo e citação em Garamond |
| `ed-card` | 21 / 1.05 | 400 · −.02em | Título de card pequeno em Garamond |
| `fs-mono` | 11 / 1.4 | 500 · .06em | Rótulo mono, caixa alta, sem quebra |
| `.metric` | 28 (20 · 40) / 1 | 500 · −.04em | Valor de stat, sans tabular; unidade a .6em |
| `.ledger dd` | 46 / 1 | 500 · −.045em | Número do painel de resultado, sans tabular (38 abaixo de 860) |
| cabeçalho de tabela | 11 / 14 | 500 · .06em | Mono em caixa alta, `inv-muted` sobre faixa de tinta |

Tamanhos com faixa usam `clamp()` entre os dois valores; o token guarda o máximo.

- **Destaque do título** (`em`): uma palavra ou expressão por título, em Garamond itálico 400 e
  `orange`, a 1.1em do título. No título em Instrument Sans só o destaque
  troca de família.
- **Sem itálico em Instrument Sans**: o sistema não tem esse arquivo. Ênfase na interface é peso
  (500 ou 600); ênfase editorial é o Garamond itálico.
- **Número**: Instrument Sans com `font-variant-numeric: tabular-nums`, unidade menor e em `muted`.
- **Wordmark**: "aicreator" em Instrument Sans 700, 26 px, −.05em, seguido de "os" em Garamond
  itálico 700 a 1.12em, em `orange`. Sempre em minúsculas.

## Fontes

Os cinco arquivos estão em `assets/fonts/`, sem substituição.

| Família (nome no CSS) | Arquivo | Pesos e estilos | Licença |
| --- | --- | --- | --- |
| `Instrument Sans` | `InstrumentSans-Variable.woff2` | variável 400 a 700, sem itálico | SIL OFL 1.1, também no Google Fonts |
| `ITC Garamond Cond` | `ITCGaramondStd-BkCond.ttf` | 400 romano | Comercial (ITC), fora do Google Fonts |
| `ITC Garamond Cond` | `ITCGaramondStd-BkCondIta.ttf` | 400 itálico | Comercial (ITC) |
| `ITC Garamond Cond` | `ITCGaramondStd-BdCondIta.ttf` | 700 itálico (só o "os" do wordmark) | Comercial (ITC) |
| `JetBrains Mono` | `JetBrainsMono-Variable.woff2` | variável 400 a 700, sem itálico | SIL OFL 1.1, também no Google Fonts |

Pilhas: `--sans` `"Instrument Sans", system-ui, sans-serif` · `--serif` `"ITC Garamond Cond",
Georgia, serif` · `--mono` `"JetBrains Mono", ui-monospace, monospace`. O Garamond não tem negrito
romano: título de matéria é 400. Os `.ttf` ficam como estão; a conversão depende da licença.

## Espaço, tamanhos e densidade

**Espaçamento** em grade de 4 px: `s-1` 4 · `s-2` 8 · `s-3` 12 · `s-4` 16 · `s-5` 20 · `s-6` 24 ·
`s-8` 32 · `s-10` 40 · `s-14` 56 · `s-20` 80 · `s-24` 96. Gaps com nome: `gap-inline` 6 (ícone e
texto), `gap-label` 6 (rótulo e campo), `gap-item` 8 (itens de uma barra), `gap-group` 16,
`gap-block` 24, `gap-section` 48. Card com padding 24; grade com gap 12 ou 20.

**Densidade** no contêiner, por `data-density`. Controles, linha de tabela e respiro interno seguem
juntos:

| Medida | Compacta | Padrão | Confortável |
| --- | --- | --- | --- |
| Controle pequeno `h-control-sm` (chip, `.btn-sm`, `.ico-sm`) | 24 | 28 | 32 |
| Controle `h-control` (botão, campo, item de menu, seta) | 28 | 32 | 40 |
| Controle grande `h-control-lg` (`.btn-lg`, aba, trilho) | 36 | 40 | 48 |
| Linha de tabela `h-row` | 36 (só a 1ª linha da célula) | 48 | 60 |
| Cabeçalho de tabela `h-th` | 28 | 32 | 36 |
| Respiro `inset` (stat, célula) | 12 | 16 | 24 |

Compacta em tabela longa e barra de filtros; confortável no mobile e em configuração. No CSS novo,
use `var(--h-control)` direto: aliases como `--h-field` resolvem no `:root` e não seguem a densidade.

Medidas fixas: badge 22 px; delta 20 px; `.lvl` 22 px com 56 de largura mínima; switch 32 × 20 com
botão de 14; checkbox 16.

**Ícones**: `icon` 20 px solto, `icon-sm` 16 px em botão, item de menu e seta, `icon-xs` 14 px em
`.btn-sm`.

**Workspace**: grade `ws-rail` 56 · `ws-menu` 232 · conteúdo, 12 px de gap e padding sobre `soft`,
canto 24; trilho e menu com canto 16. Menu a 200 px abaixo de 1180 px.

**Página**: largura toda da janela, sem `max-width`; margens 40 · 24 · 16; cabeçalho do site 76 px (64 abaixo de 860).

| Quebra | Largura | O que muda |
| --- | --- | --- |
| `bp-lg` | 1180 px | Menu do produto a 200 px; grades de 3 passam a 2 |
| `bp-md` | 860 px | Margem 24; produto em uma coluna; grades em 1; `.stats` em até 4 por linha e `.ledger` em 2; `.panel-body` empilha gráfico e composição; peça-herói em uma coluna, com toque no lugar do hover |
| `bp-sm` | 560 px | Margem 16; `.stats` em 2; carrossel vira rolagem lateral; toolbar em linhas (busca, filtros, densidade, seleção e ação); tabela com seleção e nome presos; eixo do gráfico com rótulos alternados |

## Bordas e cantos

Profundidade vem de papel contra tinta e da borda de 1 px. Borda de card sólida em `line`; divisória
interna tracejada, colunas de tabela inclusive; linhas de tabela e divisórias de `.stats` sólidas em
`line-2`; sobre tinta, `ink-line`, e o cabeçalho de tabela separa colunas com tracejado `ink-line`.

| Token | Valor | Onde |
| --- | --- | --- |
| `r-ctl-sm` | 6 px | `.btn-sm`, botão do segmentado |
| `r-ctl` | 8 px | Botão, campo, item de menu, trilho, segmentado |
| `r-menu` | 10 px | Miniatura de lista |
| `r2` | 12 px | Caixa de tabela, toast, editor |
| `r-media` | 16 px | Mídia, bloco interno, trilho e menu do workspace |
| `r-slide` | 20 px | Slide social |
| `r` | 24 px | Card, painel, workspace |
| `r-pill` | 999 px | Chip, badge, seta redonda, switch |

O recorte em arco (`999px 999px 16px 16px`) é a forma de assinatura do capítulo de imagem.

## Fundos e imagem

Papel é o fundo padrão; painel de tinta aparece uma vez por seção. Fora da peça-herói, gradiente nunca
é fundo: existe só
como véu de tinta sobre imagem, partindo do lado do texto. No hero:
`linear-gradient(90deg, rgba(29,29,27,.96) 0, rgba(29,29,27,.84) 38%, rgba(29,29,27,.06) 76%)`. A
capa de slide e o topo do site usam véus verticais nas mesmas tintas.

Série Noir Dither: arquitetura monumental e cenas surreais em tinta, laranja e creme com granulação
de gravura, origem 3:2, cortada e nunca esticada, assunto nos 75% centrais. Fora da peça-herói, nenhuma textura,
padrão ou ilustração além delas; dentro dela, luz, ruído, partícula e 3D gerados em código com as
cores dos tokens.

| Arquivo em `assets/img/` | Cena | Uso típico |
| --- | --- | --- |
| `arcos.webp` | dois arcos monumentais sob o sol | capa de carrossel, hero |
| `capa.webp` (16:9) | três esferas entre colunas, sobre água | topo do site, capa de newsletter |
| `busto.webp` | busto clássico diante do sol | matéria de opinião, citação |
| `mcp.webp` | ilhas ligadas por pontes | matéria técnica, integração |
| `fable.webp` · `astra.webp` · `gemini.webp` | biblioteca com esfera · colunata na névoa · dois pilares e sol | uma por modelo de IA em comparativo |
| `perfil.webp` (1:1) | três esferas num pedestal, o símbolo em cena | avatar e perfil social |
| `aicreatoros-noir-01…10-*.png` | observatório, biblioteca, arco sobre água, templo, escadarias, oráculo, pontes, três esferas, portal, anfiteatro | reserva em alta (3,5 MB cada); converter para `.webp` antes de usar em página |

## Movimento e estados

| Estado | Tratamento |
| --- | --- |
| Hover | Superfície vai para `soft` (`ink-2` sobre tinta); laranja com `brightness(.92)`; linha de tabela em `paper`; imagem do card escala 1.02 |
| Pressionado | `translateY(1px)`; chip pressionado em tinta; no segmentado e nas abas um indicador desliza até a opção |
| Foco | Contorno 2 px `orange`, afastado 3 px, canto 4 |
| Selecionado | Item de menu com fundo `paper`, borda `line` e ícone laranja; linha de tabela com laranja a 6% |
| Desabilitado | Fundo `soft`, texto `muted`, sem transform |
| Carregando | `.busy` (anel de 16 px girando em .8 s), `.skel` em lista |
| Seleção de texto | Laranja a 26% com texto `ink`; sobre tinta, `lime` com texto `ink` |

Durações: 150 ms em fundo, borda e cor; 100 ms no transform do botão; 400 ms na escala da imagem.
`prefers-reduced-motion` reduz tudo a 1 ms. Nunca blur.

**Entrada de dados.** `kit.js` marca `html.js-anim` e anima cada peça quando ela entra na tela: barras
crescem (700 a 900 ms, escalonadas de 35 a 70 ms), a sparkline se desenha da esquerda e o ponto final
aparece por último, média, meta e lacuna surgem depois das barras, e `.metric` e `.ledger dd` contam
até o valor em 800 ms. Ao ordenar, as linhas da tabela deslizam para a nova posição (350 ms). Sem JS ou com `prefers-reduced-motion`, tudo aparece
pronto.

**Tokens de movimento** (`tokens/layout.css`, capítulo `#movimento` do kit):

| Token | Valor | Uso |
| --- | --- | --- |
| `--dur-press` | 100 ms | transform do botão |
| `--dur-fast` | 150 ms | fundo, borda e cor |
| `--dur-slow` | 300 ms | indicador do segmentado, troca de aba |
| `--dur-image` | 400 ms | escala da imagem |
| `--dur-enter` | 480 ms | entrada de bloco |
| `--dur-draw` | 800 ms | dado se desenhando: barra, traço, contagem |
| `--dur-hero` | 1400 ms | entrada inteira da peça-herói |
| `--stagger` | 40 ms | intervalo da cascata |
| `--ease` | `cubic-bezier(.2,.6,.2,1)` | troca de estado |
| `--ease-out` | `cubic-bezier(.16,1,.3,1)` | entrada (GSAP `expo.out`) |
| `--ease-in-out` | `cubic-bezier(.65,0,.35,1)` | deslocamento entre dois lugares (GSAP `power3.inOut`) |
| `--ease-back` | `cubic-bezier(.34,1.56,.64,1)` | chegada que passa um pouco do ponto, só em número ou marcador (GSAP `back.out(1.6)`) |

**Primitivas do kit** (`kit.js`, sem dependência; espécimes no capítulo 15 do kit, `#movimento`). Cada
uma entra uma vez, quando o bloco aparece na tela, e respeita `prefers-reduced-motion`.

| Atributo | O que faz | Tempo |
| --- | --- | --- |
| `data-reveal` (`up`, `mask`, `scale`, `fade`) | sobe 24 px, abre por máscara de baixo para cima, cresce de .96 ou só aparece; `up` é o padrão | `--dur-enter`, `--ease-out` |
| `data-stagger` no pai | filhos com `data-reveal`, `data-split` ou `data-draw` entram em cascata, até 12 | `--stagger` |
| `data-split` no título | palavras sobem de trás de uma máscara, com `<em>` e `<br>` preservados; o leitor de tela recebe a frase inteira | `--dur-draw`, uma palavra a cada 80 ms |
| `data-count` | número conta até o valor em pt-BR, com prefixo e sufixo; `.metric` e `.ledger dd` contam sozinhos | `--dur-draw` |
| `data-draw` em `path`, `line`, `polyline` ou `circle` | traço contínuo se desenha; traço tracejado aparece pronto | `--dur-draw`, `--ease-in-out` |
| `data-scrub` (`parallax`, `zoom`, `open`) | escreve `--p` de 0 a 1 enquanto o bloco atravessa a janela ou o contêiner que rola; os valores movem, aproximam ou abrem a imagem | acompanha a rolagem |
| `data-spot` em `.ink` ou `.site-hero` | luz laranja segue o cursor (`--mx`, `--my`), só com ponteiro fino; `--spot-a` no `style` deixa uma luz de repouso, para onde ela volta quando o ponteiro sai | `--dur-slow` |
| `data-tilt` | inclina até 6° na direção do cursor e volta ao soltar, só com ponteiro fino | `--dur-image` |
| `.ticker` > `.ticker-track` | faixa em loop sem emenda, `data-speed` em px/s; roda só na tela e pausa no hover e no foco | pela velocidade |

**Bibliotecas liberadas.** Para a peça-herói, coreografia e rolagem. Versão fixa na URL, nunca
`@latest`; carregar só o que a peça usa, depois do `kit.js`.

| Biblioteca | Versão | Para quê | HTML (jsDelivr) | React |
| --- | --- | --- | --- | --- |
| GSAP e plugins | 3.15.0 | timeline da coreografia; `ScrollTrigger` (scrub e pin), `SplitText`, `DrawSVGPlugin`, `MorphSVGPlugin`, `Flip` (reordenar e filtrar com transição), `CustomEase`. Todos gratuitos, inclusive para uso comercial | `https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js` e `.../dist/<Plugin>.min.js` | `gsap` com `@gsap/react` 2.1.2 (`useGSAP`) |
| Three.js | 0.186.1 | cena 3D, partículas e shader na peça-herói | importmap: `"three": "https://cdn.jsdelivr.net/npm/three@0.186.1/build/three.module.min.js"` e `"three/addons/": "https://cdn.jsdelivr.net/npm/three@0.186.1/examples/jsm/"` | `three` com `@react-three/fiber` 9.8.1 e `@react-three/drei` 10.7.9 |
| OGL | 1.0.11 | shader num plano só (luz, ruído, onda), bem mais leve que Three.js | `import { Renderer } from "https://cdn.jsdelivr.net/npm/ogl@1.0.11/+esm"` | `ogl` |
| Lenis | 1.3.26 | rolagem suave em site e matéria; fora do painel de produto | `https://cdn.jsdelivr.net/npm/lenis@1.3.26/dist/lenis.min.js` e `lenis.css` | `lenis` (`lenis/react`) |
| Motion | 13.4.6 | animação declarativa em React; `animate`, `inView` e `scroll` no HTML | `https://cdn.jsdelivr.net/npm/motion@13.4.6/dist/motion.js` | `motion` (`motion/react`) |

Regras para as bibliotecas:

- GSAP roda dentro de `gsap.matchMedia()` com `(prefers-reduced-motion: no-preference)`; fora dele,
  `gsap.set` leva tudo ao estado final. Three.js e OGL desenham um quadro parado.
- Uma cena WebGL por página, só na peça-herói. Ela começa quando entra na tela e para fora dela e com a
  aba oculta; `setPixelRatio(Math.min(devicePixelRatio, 2))`; cores lidas dos tokens com
  `getComputedStyle` e redesenhadas quando `data-theme` muda; sem WebGL, imagem Noir ou SVG com o mesmo
  dado no lugar.
- `ScrollTrigger.refresh()` depois de `document.fonts.ready`; `scroller` apontado para o contêiner
  quando a rolagem não é da janela; pin só em site e matéria.
- 60 quadros por segundo no render: animar `transform`, `opacity`, `clip-path` e variáveis CSS; nunca
  `width`, `top` ou sombra.

## Componentes

Classes de `kit-v9/kit.css`, agrupadas. É o vocabulário inteiro: peça nova combina estas.

| Grupo | Classes | Quando usar |
| --- | --- | --- |
| Base | `.card` `.ink` `.pad` `.stack` `.dash` `.kick` `.mono` `.muted` `.serif` `.i` `.brand` `.wordmark` | Superfície, rótulo e marca |
| Ações | `.btn` + `.btn-primary` `.btn-ink` `.btn-line` `.btn-ghost`; `.btn-sm` `.btn-lg` `.btn-icon`; `.ico` `.ico-sm` `.ico-lg` `.ico-orange`; `.lnk` `.kbd` `.busy` | Laranja na ação principal (uma por bloco), tinta na secundária, contorno na terciária, fantasma em barra de ferramentas |
| Campos | `.field` `.inp` `.inp-lg` `.help` `.sw` `.swrow` `.chk` | Entrada curta, preferência imediata (switch), opção ao enviar (checkbox) |
| Seleção | `.chips` `.chip` `.chip-dash` `.seg` `.tabs` `.tab` | Filtro de lista (chips), troca de vista (segmentado), seções da mesma tela (abas, com contagem em `b`) |
| Estado | `.badge-pos` `-live` `-draft` `-warn` `-neg` `-info` `-plain` `-sq`; `.status-*`; `.delta-up` `-down` `-flat` com `-good` `-bad` `-plain` | Categoria lida, estado que muda, variação com seta (cor pelo efeito quando cair é bom) |
| Feedback | `.toast` `.toast-ok` `.banner` `.dialog` `.dialog-act` `.tip` `.meter` `.goal` `.empty` `.skel` | Depois da ação, bloqueio, confirmação, progresso, vazio, carregando |
| Leitura | `.acard` `.row` `.quote` `.note` `.tag` `.avatar` `.avatars` `.byline` `.reader` `.r-head` `.r-fig` `.r-grid` `.prose` `.aside` `.spec` `.np-grid` | Card de matéria, lista, citação, ressalva, página de matéria |
| Dados | `.ink.data` `.src` `.ledger` (`dd.cmp`) `.rule` `.track` `.fill` `.target` `.ticks` `.share` `.num` | Resultado de teste contra meta, fonte declarada, fatia de um total |
| Tabela | `.tbl` `.tbl-box` `.sec-head` `.toolbar` `.toolbar-note` `.to-end`; `.alt` (`i.hi`); `.best` `.lvl` (`-good` `-warn` `-bad`) `td.na`; `th.grp` `.g0`; `.th-sort`, `th[aria-sort]`, `.sel`, `.act`, `tr[aria-selected]`, `tfoot`; `table[data-limit]` `.tbl-more` | Comparar itens no mesmo critério |
| Movimento | `[data-reveal]` `[data-stagger]` `[data-split]` `[data-count]` `[data-draw]` `[data-scrub]` `[data-spot]` `[data-tilt]` `.ticker` | Entrada, rolagem e resposta ao cursor em qualquer peça (seção Movimento e estados) |
| Painel | `.card.panel` `.panel-head` `.panel-tools` `.panel-body`; `.stats` `.stat` `.card.stat` `.stat-label` `.stat-ico` `.stat-value` `.stat-aside` `.stat-viz` `.stat-row` `.stat-foot` `.metric`; `.meter` (`--g`, `.goal`, `.scale`); `.sparkline` `.chart` (`.chart-plot` `.chart-grid` `.chart-avg` `.chart-bars` `.chart-x`) `.legend` `.stackbar` `.breakdown` `.insight` `.ring` `.spark` `.pips` `.hbars` `.funnel` `.funnel-step` | Resumo do período, série diária, parte de um todo, série curta, contagem de meta, conversão por etapa |
| Produto | `.ws` `.rail` `.menu` `.menu.ink` `.mlbl` `.mi` `.cont` `.c-top` `.c-tools` `.crumbs` `.view` `.minis` `.mini` `.as-list` `.editor` `.log` | Workspace em três blocos |
| Site | `.site-top` `.site-hero` `.site-body` `.site-list` `.site-foot` | Home e páginas do site |
| Newsletter | `.mail` `.env` `.mbody` `.cover` `.story` `.signoff` | E-mail da edição |
| Social | `.social` `.slide` `.slide-cover` `.slide-paper` `.slide-end` `.slide-safe` `.slide-kick` `.slide-bars` `.slide-note` `.slide-group` `.slide-chrome` `.prof` | Carrossel 4:5 e perfil |
| Mobile | `.phone` `.ph-top` `.ph-body` `.ph-list` `.ph-bar` `.ph-cap` | Telas de 390 px |

Interações de `kit-v9/kit.js`: `.seg` e `.chips` com `data-group` disparam o evento `pick`; `[role=tablist]`
troca a aba; `#dens` troca `data-density`; o funil troca número e taxa pelo segmentado `data-group="funil"`;
`table[data-sortable]` ordena pelo `.th-sort` (valor em `data-v` de cada célula, `td.na` sempre no fim) e
controla a seleção com `[data-all]` e `[data-sel-count]`; `table[data-limit]` cria o rodapé "Mostrar mais"
(`data-step`);
`.seg` e `.tabs` ganham o indicador deslizante; peças de dados animam ao entrar na tela; as primitivas
de movimento estão na seção Movimento e estados.

**Componentes React** para produção: 62 em `components/`, no global `window.AiCreatorOSDesignSystem_a9067e`.
Carregue `styles.css`, `components/bundle.css`, React e ReactDOM 18 e `components/bundle.js`. Props em
`components/index.d.ts`; cada componente tem `README.md`. Os estados internos começam pela prop inicial
(`defaultValue`, `defaultChecked`) e seguem sozinhos. O CSS do bundle é o texto de `kit-v9/kit.css`
com a tabela restrita a `.tbl`.

- Ações e campos: `Button` (`size` sm/lg, `variant` ghost, `iconOnly`), `IconButton`, `Link`, `Kbd`,
  `Input` (com `kbd`), `Select`, `Switch`, `Checkbox`, `ChipGroup`, `Segmented`, `Tabs`.
- Estado e feedback: `Badge`, `Status`, `Delta`, `Toast`, `Banner`, `Tooltip`, `Dialog`, `Meter`
  (`goal`, `scale`), `EmptyState`, `Skeleton`.
- Painel e dados: `SecHead` (kicker mono e título com `em`),
  `Stats` (`cols`), `Stat` (`icon`, `delta`, `note`, `viz`, `row`), `Metric`, `Panel` (`kicker`, `sections`,
  `stats`), `Ring`, `Spark`, `Sparkline`, `Chart`, `StackBar`, `Breakdown`, `Insight`, `Legend`, `Pips`,
  `HBars`, `Funnel` (marca sozinho a maior queda), `Toolbar` (`note`, `end`), `Table` (`sortable`,
  `selectable`, `actions`, `foot`, `group`, `limit`/`step`, `density`, `ink`; primeira coluna com ícone e
  `highlight`; célula `{lvl, value}` ou `{na:true}`; comparação com `Delta` em coluna própria), `DataPanel` (`source`),
  `Ledger` (`compare`, `delta`), `TargetTrack` (`ticks`).
- Leitura e social: `Card`, `Row`, `Quote`, `Note`, `Avatar`, `Reader`, `Spec`, `Slide` (`handle` e
  `page` no rodapé).
- Produto: `Workspace`, `Rail`, `Menu` (`variant` ink), `ContentPanel`, `MiniGrid`, `Mini`, `Editor`, `Log`.
- Marca: `Wordmark`, `Icon`. `Anchor` e `Label` existem para documentação longa como o kit; não entram
  em peça.

## Iconografia

Sprite SVG inline de 22 `<symbol>` (viewBox 24×24, traço 2 px, pontas e junções redondas,
`fill:none`, `stroke:currentColor`); uso `<svg class="i"><use href="#i-nome"/></svg>`. Os 21 ícones
também estão em `assets/icons/`: `arrow`, `back`, `diag`, `down`, `plus`, `search`, `grid`, `pen`,
`clock`, `alert`, `image`, `sliders`, `save`, `doc`, `layers`, `settings`, `ruler`, `mail`, `list`,
`moon`, `sun`. `mail`, `list`, `moon` e `sun` vêm do Lucide porque o conjunto original não tem
equivalente; é a única fonte externa. `moon` e `sun` servem só ao botão de tema. A página leva no
sprite só os símbolos que usa.

Sem fonte de ícone, ícone PNG, emoji ou glifo unicode como ícone. A única marca desenhada é o
símbolo: três círculos de raio 3 / 5 / 8 em `orange`, `mark-mid` e `ink`, e o maior vira `paper`
sobre tinta. O símbolo identifica o AiCreatorOS: não use em produto de outra marca.

Setas são os verbos do sistema: soltas dentro de um botão ou num círculo `.ico` (28 · 32 · 40 px em
`.ico-sm` · `.ico` · `.ico-lg`) com borda `ctl`, preenchido de laranja na direção principal.

## Acessibilidade

Contraste pelo WCAG 2 nos fundos em que cada cor aparece:

| Par | Contraste | Uso |
| --- | --- | --- |
| `ink` sobre `page` · `card` · `soft` | 15.4 · 16.6 · 13.3 : 1 | Texto principal |
| `muted` sobre `page` · `card` · `soft` | 6.4 · 6.9 · 5.5 : 1 | Texto secundário |
| `inv-muted` sobre `ink` | 9.9 : 1 | Texto secundário sobre tinta |
| `ink` sobre `lime` | 13.6 : 1 | `.best`, badge e switch ligado, sobre tinta |
| `ctl` sobre `card` · `page` · `soft` | 4.2 · 3.8 · 3.3 : 1 | Borda de controle (mínimo 3:1) |
| `orange` sobre `page` · `card` · `ink` | 3.1 · 3.3 · 5.0 : 1 | Texto de 24 px ou mais, foco, ícone ativo |
| `orange` sobre `paper` | 2.99 : 1 | Abaixo de 3:1 |
| Branco sobre `orange` | 3.37 : 1 | Abaixo de 4.5:1 para o rótulo de 14 px do botão primário |

Os dois pares abaixo do mínimo são da marca e ficam como estão: laranja não carrega texto pequeno
sobre `paper`, e o rótulo do botão primário (600) é o único texto pequeno sobre laranja. Estado nunca
depende só de cor: badge tem texto, `.status` tem rótulo, `.delta` tem seta, switch tem posição,
aviso tem o ícone `alert`. Alvo de toque no mobile: 40 px (densidade confortável).
