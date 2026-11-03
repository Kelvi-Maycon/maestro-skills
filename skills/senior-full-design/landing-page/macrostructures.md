# Macroestruturas — formas de página com nome

Macroestrutura é o esqueleto da página inteira: onde os títulos moram, qual o ritmo das seções, como a dobra passa o bastão pro scroll, onde prova e CTA vivem, qual é a linguagem de divisória.

É um eixo **separado** da cor e da tipografia. Duas páginas com paletas completamente diferentes ainda leem como o mesmo template se compartilham o ritmo `hero → 3 cards de feature → depoimento → CTA → rodapé`. Esse ritmo é o tell mais reconhecível de "IA construiu isso" no nível de página — e ele sobrevive a uma paleta perfeita.

**Os dois eixos precisam se mover.** Gerar cor por projeto resolve metade; escolher forma por projeto resolve a outra.

---

## Como usar

1. **Feche o arco narrativo primeiro** (`narrative-arc.md`). A forma existe pra carregar o argumento, não o contrário.
2. **Escolha uma forma pelo nome, em voz alta, antes de construir.** Escolher enquanto constrói volta pro default sempre — a declaração é o passo que quebra o atrator.
3. **Rotacione contra a última.** Leia o bloco Estrutura do `.design-lock.md`. Sua escolha precisa diferir da última entregue. Declare em uma linha: *"A última foi Feature Stack; agora vai Editorial Index, porque o brief é um estúdio conduzido por conteúdo."*
4. **Escolha os arquétipos** que preenchem (`component-archetypes.md`).
5. **Grave** a escolha no lock.

Estas formas são pra **página pública** — landing, produto, sobre, preço. **App shell** (dashboard, ferramenta atrás de sidebar) tem forma própria: o frame sidebar + topbar *é* a macroestrutura dele. Não importe forma de marketing pra dentro de um shell.

---

## As catorze

| # | Nome | Forma | Quando |
|---|---|---|---|
| 1 | **Feature Stack** | hero, depois features reveladas uma faixa full-width por vez, cada uma com split texto/visual alternado | produto com 3–6 capacidades distintas que merecem visual próprio |
| 2 | **Bento Showcase** | grade assimétrica de tiles de spans mistos (1×1, 2×1, 2×2), cada tile mostrando uma capacidade como fragmento de UI | muitas features pequenas, mais convincentes de relance do que explicadas em sequência |
| 3 | **Editorial Index** | masthead, lista numerada ou categorizada, tipografia generosa, fios de cabelo | portfólio, agência, publicação, página de "quem somos" |
| 4 | **Long-Scroll Narrative** | o arco contado de cima a baixo, um beat por seção, com revelação ligada ao scroll | produto não-óbvio que precisa ser explicado antes do pitch; manifesto; lançamento |
| 5 | **Stat-Led** | um número dominante, ou uma fileira apertada de métricas reais, como hero e espinha da página | a história é genuinamente quantitativa **e os números são reais** |
| 6 | **Gallery Grid** | o trabalho é o pitch: grade de fotografia real, foto de produto ou tiles de case, chrome mínimo | comércio, fotografia, comida, viagem, produto físico — a imagem vende |
| 7 | **Product Demo / Workbench** | o hero é o produto em uso (captura anotada, demo cortada pela viewport); a página se organiza em torno de *fazer* | ferramenta de dev, app — ver funcionando é o argumento mais forte |
| 8 | **Split Diptych** | duas colunas: uma coluna de declaração/nav persistente ao lado de uma coluna de conteúdo que rola | estúdio, produto de voz única, qualquer coisa que queira sensação de direção de arte |
| 9 | **Conversational FAQ** | construída em torno das perguntas reais do público, respondidas direto, com prova e CTA dobrados nas respostas | produto brigando com objeção específica ou lacuna de confiança (regulado, alta consideração) |
| 10 | **Manifesto** | tipografia na frente, poucas imagens, um ponto de vista forte em declarações grandes e linhas curtas — a contenção *é* o design | lançamento conduzido por marca, produto com opinião, estúdio tomando posição |
| 11 | **Catalogue** | listagem estruturada, quase tabular (produtos, planos, specs, releases), com cuidado editorial em vez de tabela crua | comércio com muitos SKUs, preço como página, changelog, produto denso em spec |
| 12 | **Poster Fold** | uma dobra full-bleed com direção de arte (fotografia, ilustração, composição tipográfica forte) carrega a tela inteira; abaixo fica mais quieto | a marca ou uma imagem *é* a mensagem — evento, moda, momento de lançamento |
| 13 | **Comparison First** | a comparação é a peça central: tabela X vs Y ou critérios lado a lado, hero curto acima, prova e CTA em volta | intenção de busca inclui alternativas ("X vs Y", "melhor pra") — geralmente pareada com SEO |
| 14 | **Single Offer Page** | hero + prova mínima + CTA, uma dobra e meia, quase nada mais | tráfego de alta intenção (e-mail pra base, retargeting), oferta curta: download, waitlist, inscrição |

---

## Escolher bem

**Case a forma com o argumento, não com o hábito.** Feature Stack é a resposta certa com frequência surpreendente **e** a resposta errada pra pegar por reflexo — o ponto inteiro é a escolha ser deliberada.

- Argumento mais forte é "olha quanta gente usa" → Stat-Led
- É "olha o trabalho" → Gallery Grid
- É "deixa eu explicar por que isso importa" → Long-Scroll Narrative
- É "isso é legítimo mesmo?" → Conversational FAQ

**Brief vago: ofereça, não caia no default.** Sem sinal nenhum, apresente três formas de grupos categoricamente diferentes — uma conduzida por grade (Bento), uma por documento (Long-Scroll), uma por pôster (Manifesto). Três escolhas concretas, não um menu com as catorze.

**Regra de honestidade, vale pra todas.** Stat-Led, Catalogue e qualquer faixa de prova usam número, logo e depoimento **reais**, ou placeholder honesto marcado. Nunca "+47% de conversão" ou "usado por 50.000 times" inventado pra preencher a forma. Estatística fabricada vira slop no instante em que é inventada, e é o jeito mais rápido de uma página de prova perder confiança. Sem números reais: escolha uma forma que não exija números.

**A forma decide a maior parte da estrutura; você ainda escolhe os componentes.** Ela fixa posição de título, ritmo de seção, linguagem de divisória e revelação. Os arquétipos de nav, hero, feature, prova, CTA e rodapé são escolha sua — e também rotacionam.
