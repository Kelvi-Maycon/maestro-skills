# Slop em português do Brasil

<!-- slopscan: catalogo -->

Os tells em PT-BR não são tradução dos tells em inglês. Caçar "delve" num texto em
português não acha nada. Os padrões abaixo são os que o modelo produz em português e
que brasileiro nenhum escreve.

---

## O tell número 1: gerúndio de cauda

O equivalente exato do "-ing tail" em inglês, e muito mais comum em PT porque o
gerúndio é barato.

> "A plataforma integra os dados em tempo real, **garantindo** mais segurança e
> **proporcionando** uma experiência fluida ao usuário."

O gerúndio final não adiciona informação. Ele finge profundidade sobre um fato raso.

**Marcadores:** garantindo, proporcionando, possibilitando, refletindo, destacando,
promovendo, contribuindo para, evidenciando, consolidando, viabilizando, agregando,
fortalecendo, otimizando.

**Conserto pago.** Apague a cauda. Se a informação era real, promova a frase própria
com o mecanismo:
> "A plataforma integra os dados em tempo real. A fila roda a cada 200ms, então o
> painel nunca fica mais de 1 minuto atrás do banco."

---

## S1. Forma

### Conector abrindo todo parágrafo
"Além disso," / "Por outro lado," / "Dessa forma," / "Nesse sentido," / "Vale ressaltar
que," abrindo parágrafo após parágrafo. É andaime de redação de vestibular.
**Conserto.** Corte o conector. Se o parágrafo não se sustenta sem ele, a ordem dos
parágrafos está errada, não a transição.

### Nominalização
Brasileiro fala com verbo. O modelo escreve com substantivo abstrato.
| Slop | Humano |
|---|---|
| "a realização da implementação do processo" | "implementar" |
| "a busca pela otimização dos resultados" | "melhorar o resultado" |
| "o processo de tomada de decisão" | "decidir" |
| "a utilização da ferramenta" | "usar a ferramenta" |

### Par de adjetivos sinônimos
"Uma solução completa e robusta." "De forma clara e objetiva." "Prática e eficiente."
Dois adjetivos que dizem a mesma coisa, porque um só pareceria pouco.
**Conserto.** Um adjetivo, ou nenhum e um número no lugar.

### Registro de decreto
Ênclise, mesóclise e passiva analítica em texto que deveria ser falado: "encontra-se
disponível", "far-se-á necessário", "foram implementadas melhorias", "é realizado o
processamento".
**Conserto.** Voz ativa com sujeito humano. "A gente subiu as melhorias." "O worker
processa a fila."

### Pergunta como subtítulo
"## Por que isso é importante?" / "## Como funciona na prática?" / "## O que muda para
você?" Estrutura de conteúdo otimizado para busca, não de argumento.
**Conserto.** Título afirmativo que já entrega o achado.

### Título em Title Case
"O Cenário Atual Da Transformação Digital." Em português title case não existe como
convenção, então "Da" com maiúscula é assinatura de máquina.
**Conserto.** Só a primeira letra e nomes próprios.

---

## S2. Fórmulas

| Tell | Exemplo | Conserto pago |
|---|---|---|
| Calco do "not only" | "não apenas rápido, mas também seguro" | "rápido e seguro", ou só o que importa |
| Contraste binário | "não é uma ferramenta, é uma mudança de mentalidade" | diga o que é |
| Abertura de época | "nos dias de hoje", "no cenário atual", "com o avanço da tecnologia" | apague, comece no fato |
| Atribuição vaga | "especialistas afirmam", "estudos apontam", "pesquisas indicam" | a fonte com nome, ou o claim sai |
| Inflação | "um verdadeiro divisor de águas", "desempenha um papel fundamental" | o fato cru |
| Encerramento | "em suma", "por fim", "concluindo", "o futuro é promissor" | termine no último fato |
| Meta-seção | "neste artigo vamos explorar", "ao longo deste guia", "abordaremos" | apague |
| Seção "Desafios" | "apesar dos desafios, o setor segue crescendo" | os problemas com número, ou nada |
| Gancho | "e é exatamente aí que mora o perigo", "e aqui está o detalhe" | apague a linha |
| CTA genérico | "e você, o que acha? comenta aqui!" | uma pergunta específica, ou nada |
| Superlativo de brochura | "de tirar o fôlego", "simplesmente incrível", "imperdível" | o que exatamente, e por quê |

---

## S3. Vocabulário

**Tier 1, marque sempre.** Aparece em texto de IA e quase em nenhum outro lugar:
mergulhar fundo, vamos mergulhar, é importante ressaltar, vale ressaltar, cabe
destacar, no cenário atual, nos dias de hoje, na era digital, verdadeiro divisor de
águas, desempenha um papel fundamental, leque de possibilidades, poderoso aliado,
grande aliado, cada vez mais presente no nosso dia a dia, transformando a maneira como,
revolucionando o mercado, em suma, o futuro é promissor, espero ter ajudado.

**Tier 2, marque em densidade.** Sozinho é normal, em cluster é assinatura:
crucial, fundamental, essencial, primordial, robusto, poderoso, inovador,
revolucionário, significativo, relevante, abrangente, estratégico, otimizar,
potencializar, alavancar, impulsionar, aprimorar, proporcionar, possibilitar, viabilizar.
Conectores: além disso, ademais, outrossim, por conseguinte, dessa forma, nesse sentido,
sendo assim, dito isso.

**Tier 3, nunca sozinho:** importante, grande, melhor, eficiente, prático, completo.

---

## Português de Portugal vazando

O corpus de treino em português tem muito PT-PT. Quando ele vaza num texto brasileiro,
é o tell mais fácil de confirmar e o mais raramente checado.

| PT-PT que vaza | PT-BR |
|---|---|
| está a fazer, estamos a ver | está fazendo, estamos vendo |
| utilizador | usuário |
| ecrã | tela |
| ficheiro | arquivo |
| telemóvel | celular |
| rato | mouse |
| aceda a, aceder | acesse, entrar em |
| eliminar (arquivo) | apagar, excluir |
| carregue no botão | clique no botão |
| a app, o email (gênero) | o app, o e-mail |
| gestão de equipa | gestão de equipe |
| casa de banho | banheiro |
| autocarro | ônibus |
| percebes? | entendeu? |

A construção "estar a + infinitivo" é a mais frequente e a mais óbvia. Um único caso já
basta para marcar, porque brasileiro não escreve isso por acidente.

## Tradução automática do inglês

Palavras que existem em português mas foram escolhidas por semelhança com o inglês.

| Calco | Quando é erro | Quando é jargão legítimo |
|---|---|---|
| suportar | "o sistema suporta 3 formatos" (é "aceita") | "suportar carga" |
| endereçar | "endereçar o problema" (é "tratar", "resolver") | endereço de memória |
| assertivo | usado como "certeiro" ou "preciso" | comunicação assertiva, sentido real |
| aplicação | quando é app ou aplicativo | aplicação de uma regra |
| performático | quase sempre calco de "performant" | quase nunca |
| impactar | "isso impacta o time" (é "afeta") | impacto físico |
| acionável | tolerável em growth e produto | fora disso, "que dá pra agir" |
| customizar | tolerável em produto | senão, "personalizar" |
| deletar, startar, printar | jargão de dev, ok no contexto | fora do contexto, traduza |

Não corrija jargão de mercado que o leitor usa todo dia. Corrija a palavra que só
apareceu porque parecia com o inglês.

---

## A armadilha da correção excessiva em PT

Quando pedem "deixa mais humano" em português, o modelo empilha oralidade falsa:
"olha só", "cara", "mano", "sabe?", "sério mesmo", "bora", diminutivo em tudo
("dá uma olhadinha", "rapidinho"), e gíria regional que não é do autor.

Isso é o mesmo defeito com outra cara: forma escolhida antes do conteúdo. Prosa técnica
neutra em português é voz humana legítima. Não injete personalidade em texto que pede
neutralidade.

**Não force regionalismo.** Gíria carioca ou gaúcha em texto de um mineiro é tão
artificial quanto "delve".

---

## Teste final: leia em voz alta

Se você não falaria a frase em voz alta para a pessoa que vai ler, reescreve. Vale para
copy, guia, bônus e e-book. O vocabulário é o de quem lê, não o de quem escreve. Termo
técnico que o leitor não usa sai, ou vem traduzido na mesma frase.
