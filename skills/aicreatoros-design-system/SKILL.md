---
name: aicreatoros-design-system
description: "Aplica o design system AiCreatorOS em peça visual da marca: capa de post do blog aicreateos.com, página, SVG do blog, componente, carrossel ou newsletter. Usar ao criar ou revisar essa peça. Não usar em peça da Adapta ou de outra marca nem em texto sem parte visual."
user-invocable: true
---

# AiCreatorOS Design System

Vale para peça visual do AiCreatorOS: capa de post, página, SVG do blog, componente. Menção solta a design ou identidade visual sem peça do AiCreatorOS não aciona.

## Fontes

- Pasta do DS, fonte atual (`<DS>` abaixo): `references/ds` dentro desta skill (versão de 31/10/2026). As imagens da série Noir (`assets/img/`, 39 MB) não vieram para o Maestro. Revisão de 30/09/2026: Órbita removida; peça-herói inventada a cada entrega, com forma, luz e movimento livres; tokens e primitivas de movimento no kit (`#movimento`); GSAP, Three.js, OGL, Lenis e Motion liberados. Base de 25/09 (rodada 8, fase 2): tema escuro com botão de lua, largura toda como regra dura, lima só sobre fundo escuro, faixa de 6 a 8 KPIs, título de seção com `.kick.mono` e `<em>`, tabela com cabeçalho em faixa de tinta e `.alt` com ícone, checador `build/checa.mjs` com regra de vazio dentro de card, Modo dados removido, 62 componentes React com props em `components/index.d.ts`.
- Não são referência: `historico/`, V7, V8 e o backup do Estudo 09 original. Nenhum deles veio para o repo.

## Regras duras

- Largura toda da janela: contêiner da tela sem `max-width` e sem centralização em painel, site e matéria. Só e-mail (640 px), slide 4:5, celular e texto corrido em `ch` têm medida.
- Preto, branco e detalhes em laranja. Lima só sobre fundo escuro (`.ink` ou tema escuro); em superfície clara o mesmo detalhe é laranja.
- Sem sobra: nenhum card com faixa vazia no meio ou embaixo, nenhuma coluna mais curta que a vizinha. Card ao lado de pilha usa a imagem que preenche (`.g2>.acard`), não esticar citação.
- Alinhamento rigoroso: número e rodapé no mesmo y na fileira, eixo encostado nas barras, rótulo sem colisão.
- Informação compacta: o período vira faixa `.stats` de 6 a 8 KPIs (rótulo, número, `.delta` embaixo do número, sublinha derivada), não quatro blocos grandes.
- Título de seção com `.kick.mono` de contexto e Garamond `<em>` laranja (`.sec-head` ou `.panel-head`).
- Peça web tem os dois temas e o botão `.tema` (lua e sol) no topo, com o script de uma linha do `<head>`, copiados do modelo.
- Verificação em 1920 × 1080 (desktop) e 390 × 844 (celular), nos dois temas; nunca em 1440.
- Peça-herói nasce do dado de cada entrega e se mexe (seção "Peça-herói" do readme). A Órbita não existe mais: globo ou esfera de pontos, cards com anel de porcentagem e curvas ligando cards a uma lista não entram, nem como inspiração.

## Fluxo

1. **Pergunta do leitor.** Em uma linha: quem lê, que decisão toma e qual número responde. Listar os dados do briefing e marcar o que é principal, o que é contexto e o que é detalhe sob demanda.
2. **Ler só o que decide.** `rg -n "^## |^### " "<DS>/readme.md"` e ler inteiras: "Como gerar uma peça" (com "Dado sem a peça do modelo", "Código que monta a tela" e "Regras que valem em toda peça"), "Peça-herói", "Rotas", o perfil da rota em "Perfis por formato" (painel inclui "Interação inteligente"), "Movimento e estados" (tokens, primitivas e bibliotecas), "O que não entra em peça" e "Checklist de entrega". Cor, tipografia, densidade e componentes só quando a peça tocar nesses pontos. Reler só se o arquivo mudar.
3. **Copiar o modelo.** Copiar o modelo da rota em `modelos/` inteiro para o local da entrega, com o script de tema do `<head>` e o botão de tema, e ajustar `../styles.css`, `../kit-v9/` e `../assets/`. O comentário no topo do modelo diz o que trocar.
4. **Mapear dado para peça antes de escrever.** Série no tempo, parte de uma base, categoria, etapa, comparação, lista: cada dado recebe a peça da tabela "Dado sem a peça do modelo". Nenhuma vaga do modelo fica vazia ou vira texto solto; o que não tem peça some ou vira linha de tabela.
5. **Inventar a peça-herói.** Seguir a seção "Peça-herói" do readme: manchete em uma frase com número; direção tirada da forma do dado e diferente da última entrega do mesmo projeto; coreografia em três tempos (entrada com o número legível em até 1,6 s, resposta ao gesto que muda dado, vida lenta que para fora da tela); três camadas de profundidade e um foco laranja. Dentro dela valem CSS, SVG, canvas, WebGL e script próprios com prefixo `.h-<nome>`, só com cores e fontes dos tokens; GSAP 3.15.0 (todos os plugins), Three.js 0.186.1, OGL, Lenis e Motion pelas URLs fixas do readme. Fallback parado com o mesmo dado sem JS, sem WebGL e com `prefers-reduced-motion`. Nunca refazer a Órbita nem copiar herói de outra entrega, de modelo ou de espécime do `#movimento`.
6. **Desenhar a interação do resto.** Aplicar "Interação inteligente" do readme: escrever a pergunta seguinte do leitor e escolher o gesto (segmentado ou abas para recortes e para duas leituras do mesmo dado, tabela ordenável com `data-limit` para lista longa, valor no hover para série). Sem peça que responda, criar uma nova: cores e fontes dos tokens, estado no HTML (`aria-pressed`, `hidden`, `data-*`), script da página ouvindo o evento `pick` que o `kit.js` dispara em `[data-group]`, movimento pelos tokens com `prefers-reduced-motion`, teclado e leitor de tela, uma coluna abaixo de 860 px. Blocos entram com as primitivas do kit (`data-reveal`, `data-stagger`, `data-split`, `data-count`, `data-scrub`). Declarar na entrega o que foi criado.
7. **Montar.** Fora da peça-herói, só classes do catálogo, e CSS local só posiciona (colunas, `gap`, sticky). Em React, `components/` (`SecHead`, `Stats` com `cols`, `Stat`, `Panel` com `kicker`, `Table` com `group`, `limit`, `density`, `ink`, células `{lvl, value}` e `{na:true}`); movimento com `gsap` e `@gsap/react`, `three` e `@react-three/fiber` ou `motion`. Conferir no `Kit Completo.html` (`#dados`, `#leitura`, `#site`, `#movimento`...) o acabamento de cada classe usada. Fora da peça-herói, não inventar classe, cor, sombra, gradiente, fonte ou ícone.
8. **Verificar e corrigir até zerar.** `node <DS>/build/checa.mjs <página>` (1920 × 1080 por padrão) e `--mobile`, cada um também com `--escuro`; `--root <raiz do projeto>` quando a página estiver fora do DS. Saída 2 ou 404 é erro do checador, não aprovação. Depois olhar os renders nas duas larguras com o `agent-browser` e clicar cada controle (gesto da peça-herói, segmentado, ordenação, mostrar mais, tema), conferindo que a troca aparece e que nada sobra ou colide. Capturar três quadros da entrada da peça-herói (início, meio e fim) e um render com `prefers-reduced-motion`; console sem erro. Achado corrigido na origem (classe ou modelo), nunca com ajuste por item.

## Decisões fixas

- Conflito entre briefing e sistema (cor, fonte, componente, estrutura): perguntar antes, com as duas opções e o efeito de cada uma. Nunca remover laranja, lima, Garamond, o destaque `<em>` do título, imagem Noir ou sprite por conta própria.
- Cor em painel: laranja no destaque de cada gráfico (`.hi`, última barra do `.spark`, anel, medidor, ícone do item ativo) e no `.best` do claro; lima só sobre fundo escuro (`.best`, `.lvl-good`, status no ar, toast de confirmação); estado no `.delta` com seta e no `.lvl`, com fio da própria cor no claro. `.modo-dados` não existe mais.
- Na mesma fileira, no máximo duas visualizações do mesmo tipo (alternar `.sparkline`, `.spark`, `.ring`, `.pips`, `.hbars`, `.meter`), todas com a mesma altura de gráfico.
- Recriar peça de referência (post, página): aplicar a linguagem (tokens, tipografia, grade, ícones, imagem), sem wordmark, logo ou elemento fixo de AiCreatorOS salvo pedido. Antes de estilizar, listar objetos, imagens e movimentos essenciais da referência e conferir no render que nenhum sumiu.
- Dado real entregue pelo usuário entra como veio; a restrição de outro negócio vale só para conteúdo de exemplo.

## Erros que o render precisa descartar

Órbita ou peça parecida (globo de pontos, cards com anel ligados por curvas a uma lista); peça-herói copiada de outra entrega, de modelo ou de espécime do kit; vista sem peça-herói ou parada; movimento só decorativo; número principal escondido por mais de 1,6 s; WebGL sem fallback ou rodando fora da tela; biblioteca em `@latest`; KPI só com número e texto; quatro blocos grandes no lugar da faixa; delta ora ao lado, ora embaixo do número; tela só em tinta e cinza, sem laranja; lima em superfície clara; `max-width` no contêiner; card com faixa vazia (citação esticada, recortes ao lado de card mais alto); verificação em 1440, numa largura só ou num tema só; página web sem botão de tema; título de seção sem `.kick.mono` e `<em>`; cabeçalho de tabela claro ou sem tracejado; primeira coluna sem `.alt`; coluna de nome larga com sobra em 1920; mais de duas visualizações iguais na fileira; `.share` em toda coluna; `.badge` dentro de célula numérica; interação decorativa que não muda nada; segmentado reimplementado em vez do `pick`; peça do modelo removida por falta de série; CSS próprio que redefine `.metric`, `.card`, `.stat`, `.panel-head` ou `.view`; caixa de texto no lugar de `.insight`; título sem `<em>` ou com dois; número em mono; âncora numerada, `.lbl` ou "Estudo 09" dentro da peça; contador ou marca no topo do slide; imagem fora da série Noir; dados de exemplo de outro negócio; dois botões laranja no mesmo bloco; controle fora de 28 · 32 · 40.

## Entrega

- Relatar: rota e modelo usados, manchete e direção da peça-herói, bibliotecas e fallback, peça interativa escolhida e a pergunta que ela responde, peça nova criada (se houver), resultado do checador por largura e tema, lacunas.
- Projeto com cópia local do DS (como uma pasta `ds/` dentro do projeto): comparar com `references/ds`; se a cópia estiver atrás, avisar e oferecer atualizar, sem copiar por conta própria.
- Preservar os arquivos fonte. Não copiar o sistema para esta skill: ler a fonte atual a cada uso.

Se a chamada vier sem tarefa, perguntar o que o usuário quer criar ou revisar. Se a pasta estiver inacessível, informar o endereço e pedir a localização atual, sem inventar regras visuais.

## No Maestro

- O DS vem desta skill: `references/ds/readme.md`. Faltou: avisar o Kelvi e parar.
- O checador baixa `playwright@1.62.1` pelo `npx` na primeira vez (precisa de rede e `node` no pod) e abre o Chrome de `AGENT_BROWSER_EXECUTABLE_PATH` quando a variável existe. Saída 2 com "Playwright não encontrado" é falta de rede, `node` ou Chrome: relatar como não verificado.
- Render, clique e quadros da peça-herói: navegador do assistente (skill `agent-browser` da biblioteca do Maestro) com a página servida em `127.0.0.1`. Encerrar o servidor ao terminar.
- Capa de post do blog: imagem da série Noir Dither (tinta #1D1D1B, laranja #F05A37, creme #F4F1E9). O acervo `assets/img/` não veio: gerar pela skill `imagegen` e declarar como gerada. Modelos que apontam para `assets/img/` mostram imagem quebrada até o Kelvi subir o acervo.
