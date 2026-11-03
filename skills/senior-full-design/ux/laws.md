# Leis de percepção e cognição

Não é trivia de UX. Cada lei aqui é um **diagnóstico**: quando um sintoma aparece na tela, ela diz qual mecanismo quebrou e qual alavanca conserta.

Uso: identifique o sintoma na coluna da esquerda das tabelas, aplique a alavanca. Não cite lei na resposta ao usuário — use o nome só pra você achar a correção certa.

---

## Como agrupar (Gestalt)

O olho agrupa antes de ler. Se o agrupamento visual contradiz a estrutura lógica, a pessoa entende errado antes de ter chance de ler.

### Proximidade — o mais forte de todos

Perto pertence; longe separa. Vence qualquer outra pista.

- Dentro do grupo, espaço menor. Entre grupos, espaço maior. **A razão entre os dois é a hierarquia** — não existe valor absoluto certo.
- Label mais perto do próprio input do que do campo seguinte.
- Header de seção mais perto do conteúdo dele do que da seção anterior.
- Linha de tabela com padding menor que o gap entre linhas.
- Nunca use borda pra fazer o trabalho que o espaço faz.

**Sintoma:** "a pessoa lê o rótulo do campo de baixo como se fosse do de cima" → é proximidade, sempre.

### Região comum

Um container, fundo ou borda compartilhada agrupa **mesmo contra o espaçamento**. É mais forte que proximidade, e por isso mais caro: cada container adiciona peso visual.

Use quando o agrupamento precisa sobreviver a um layout que não permite o espaço ideal. Não empilhe: região comum **e** proximidade **e** similaridade pro mesmo grupo é ruído.

**Anti-padrão:** cardificação — todo parágrafo, métrica e ícone dentro de um card arredondado. Container só quando agrupar, selecionar ou elevar significa alguma coisa.

### Similaridade

Cor, forma ou tamanho compartilhados dizem "somos a mesma categoria", mesmo separados no espaço. É como um sistema comunica tipo: todo destrutivo vermelho, todo secundário fantasma.

Corolário: **dois elementos que parecem iguais precisam se comportar igual.** Se um card é clicável e o irmão visualmente idêntico não é, você quebrou a lei — e a pessoa vai clicar.

### Fechamento

O olho completa forma implícita. É o que permite tirar peso: tabela sem grade completa ainda lê como tabela; card sem borda ainda lê como card se o alinhamento sustenta.

Use pra remover linha, borda e divisória sem perder estrutura.

### Continuidade

O olho segue alinhamento e caminho contínuo. Elementos numa linha lêem como sequência relacionada.

- Alinhamento consistente é o que faz um layout parecer "arrumado" — mais do que qualquer espaçamento.
- Passo numerado, timeline e wizard dependem disso pra ler como progressão.
- Quebrar continuidade sem motivo é o que faz layout parecer bagunçado mesmo com espaçamento certo.

### Figura e fundo

Estabeleça qual camada é frente (acionável) e qual é fundo. Ambiguidade aqui é o que faz modal parecer flutuando no nada e dropdown sumir na página.

- Overlay precisa de separação real: escurecimento, elevação ou contraste de superfície.
- Fundo com padrão ou gradiente forte compete com o conteúdo e inverte a prioridade.

---

## Como a atenção funciona

### Efeito de destaque isolado

O elemento que **difere dos vizinhos** é o lembrado. Isso só funciona por escassez: se três coisas se destacam, nenhuma se destaca.

- Uma ação primária preenchida por vista. As irmãs ficam neutras.
- Badge, cor de acento e movimento gastam do mesmo orçamento de atenção.
- Destaque numa tabela de preço funciona porque **um** tier é diferente.

**Sintoma:** "tudo grita" → conte quantos elementos usam recurso de destaque. Se for mais de um por zona, corte.

### Hierarquia visual

O olho aterrissa no de maior peso e desce. Peso vem de tamanho, cor, contraste, espaço e posição — nessa ordem de força.

- Diferença mínima entre níveis: 1,5×. Entre título e corpo: 2,5×. No hero: 4–6×.
- **Teste do olho apertado:** aperte os olhos até a tela borrar. A hierarquia ainda lê? Se tudo virar um bloco cinza uniforme, não existe hierarquia — existe só conteúdo.
- Camada do meio (subtítulo, legenda, metadado) é onde hierarquia costuma colapsar: título e corpo se distinguem, o resto se funde.

### Estético-usável

Interface polida é **percebida** como mais usável e ganha perdão por atrito pequeno. Não é desculpa pra esconder problema — é o motivo pelo qual craft tem retorno mensurável mesmo sem mudar funcionalidade.

Consequência prática: polimento não é a última tarefa opcional do backlog.

---

## Como a decisão funciona

### Custo por número de opções

Tempo de decisão cresce com o número de escolhas simultâneas. Não é sobre "menos features" — é sobre **menos escolhas ao mesmo tempo na tela**.

Alavancas, em ordem: default bom > agrupar em categorias > revelar progressivamente > cortar de verdade.

**Sintoma:** menu ou tela de plano onde a pessoa trava sem clicar em nada.

### Tamanho e distância do alvo

Tempo pra acertar um alvo depende do tamanho dele e da distância até ele.

- Ação primária: grande e perto de onde o olho já está.
- Ação destrutiva: longe das vizinhas, nunca colada no botão de confirmar.
- Borda e canto da tela são alvos infinitos no desktop (o cursor para neles) — use.
- Mobile: 44px de lado, com espaço entre alvos vizinhos.

### Complexidade irredutível

Todo processo tem uma complexidade que **alguém** vai absorver: o produto ou o usuário. Ela não some — só muda de lado.

A pergunta certa não é "como simplificar isso?" e sim "quem paga essa complexidade, e esse é o lado certo?". Configuração pré-preenchida, default inteligente e importação automática são o produto pagando.

### Expectativa aprendida

As pessoas passam a maior parte do tempo em outros produtos, e esperam que o seu funcione como aqueles. Inovar em padrão conhecido (posição do carrinho, comportamento de busca, ícone de menu) cobra um preço que quase nunca vale.

Inove no que é diferenciador do produto; siga a convenção em tudo que é infraestrutura.

---

## Como a memória funciona

### Fatia de ~4 itens

A memória de trabalho segura cerca de quatro pedaços de uma vez. Agrupar por quatro é o que torna número de telefone, código e menu memorizáveis.

Aplique em: agrupamento de campo, item de menu, coluna de rodapé, passo de wizard.

### Primeiro e último

Primeiro e último item de uma sequência são os mais lembrados; o meio afunda. Coloque o que importa nas pontas — item de nav mais importante nas extremidades, benefício mais forte abrindo e fechando a lista.

### Tarefa incompleta gruda

Tarefa começada e não terminada continua ativa na cabeça. É por isso que barra de progresso, rascunho salvo e checklist parcialmente preenchida puxam de volta.

Use pra retomada honesta (perfil 60% completo com o que falta explícito). Não use pra fabricar ansiedade.

### Pico e fim

Uma experiência é lembrada pelo momento mais intenso e pelo final — não pela média. Investir no fechamento (confirmação, primeiro sucesso, entrega) rende mais do que espalhar polimento por igual.

---

## Como o tempo é sentido

### Limiar de ~400ms

Abaixo de ~400ms de resposta, a pessoa mantém o fluxo e sente o sistema como instantâneo. Acima, a atenção quebra.

- Abaixo desse limiar, **não coloque spinner** — o indicador chama atenção pra uma espera que não existia.
- Entre 0,4 e 1s: feedback discreto.
- Acima de 1s: diga o que está acontecendo. Acima de 5s: progresso real ou estimativa.
- Percepção também é alavanca: skeleton com a forma real, update otimista e spinner mais rápido fazem o mesmo tempo real parecer menor.

---

## Ordem de aplicação quando a tela está ruim

1. **Estado** — falta empty, loading ou error? Resolve isso primeiro; o resto é cosmético perto disso.
2. **Hierarquia** — teste do olho apertado. Existe um ponto de entrada único?
3. **Agrupamento** — a proximidade contradiz a estrutura lógica?
4. **Ênfase** — quantas coisas competem pela atenção primária? Corte pra uma.
5. **Custo de decisão** — dá pra dar default, agrupar ou adiar?
6. **Alvo e distância** — a ação primária é grande e perto? A destrutiva está longe?
7. **Só então**: cor, sombra, raio, motion.

Inverter essa ordem é o motivo mais comum de rodada de "melhorei o visual" que não muda nada.
