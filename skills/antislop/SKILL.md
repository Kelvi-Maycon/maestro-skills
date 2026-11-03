---
name: antislop
description: 'Revisa e escreve sem cara de IA texto que vai sair para terceiros: post, artigo, copy, thread, roteiro, e-mail, documento. Usar ao gerar ou revisar esse texto, quando pedirem "tira a cara de IA" ou "passada hostil", e quando uma skill de copy mandar ler as seções Tese, Modo geração ou Passada hostil. Também diagnostica slop em código e UI. Não usar em resposta de chat comum nem em texto que não sai da conversa.'
---

# Antislop

Roda em texto que vai sair para terceiros (post, artigo, copy, thread) e quando o Kelvi
pede `/antislop`. Não roda em resposta de chat comum.

## Tese

Slop não é texto feio. É saída que regrediu à média da distribuição: o que qualquer
modelo diria sobre qualquer coisa. Por isso o defeito não mora na palavra, mora na
**ausência de aposta**. O texto não arrisca nada, o código não escolhe nada, a tela
não decide nada.

**Teste de portabilidade (o único teste que importa).** Pegue o artefato e troque o
assunto, a empresa, a pessoa ou o produto. Se continuar valendo sem editar, ele não
diz nada sobre este caso. Isso vale para prosa, código e layout.

| Superfície | Portável quando |
|---|---|
| Prosa | a frase serve para qualquer produto ou pessoa |
| Código | a função poderia estar em qualquer repo, resolve um problema que não existe aqui |
| Design | o layout serve para qualquer conteúdo, foi escolhido antes de saber o conteúdo |
| Resposta de agente | a resposta serve para qualquer pergunta do mesmo formato |

O erro clássico é caçar palavra marcada. Trocar "delve" por "explore" mantém a frase
igualmente portátil. **A palavra é sintoma. A portabilidade é a doença.**

## Roteamento

| Entrada | Modo | Saída |
|---|---|---|
| "isso parece IA?", "audita", "escaneia" | **diagnóstico** | achados citados com span exato, sem reescrever |
| "humaniza", "deslopa", "limpa isso" | **limpeza** | artefato editado + o que mudou e por quê |
| pasta / repo / muitos arquivos | **varredura** | ranking dos piores por `slopscan`, conserto só no que o Kelvi escolher |
| você está escrevendo agora | **geração** | aplica as regras antes de escrever, não depois |

Código entra por [references/codigo.md](references/codigo.md). Design entra por
[references/design.md](references/design.md), e se o pedido for **construir** UI e não
diagnosticar, passa a bola para `senior-full-design` no bot que tiver essa skill.

---

## Triagem por custo (S0 a S3)

Todo achado recebe uma severidade. A severidade manda na ordem do conserto.

**S0. Dano.** Nunca é aceitável, nem para caçar, nem para introduzir.
- Inventar fato, número, data, nome, fonte ou citação que não está na origem.
- Mudar comportamento de código numa passada que era de limpeza.
- Apagar qualificador que carrega escopo, risco, incerteza ou obrigação legal.
- Reimprimir o briefing como se fosse o texto. Instrução sobre o texto não é o texto.
- Trocar uma promessa vaga por uma promessa concreta que ninguém autorizou
  ("vamos analisar seu caso" onde a origem não diz que existe esse atendimento).

**S1. Forma genérica.** O formato foi escolhido antes do conteúdo. É onde está o ROI.
- Prosa: parágrafos intercambiáveis (troque o 2 pelo 5 e nada quebra), um argumento
  diluído em N seções, resumo fractal, listicle disfarçado de prosa
  ("O primeiro... O segundo..."), toda seção com a mesma forma.
- Código: abstração para um consumidor só, defensiva para estado impossível,
  reimplementar o que o repo já tem, 200 linhas onde 50 resolvem.
- Design: hero + 3 cards + bento antes de saber o que entra neles.

**S2. Padrão retórico ou mecânico.** A frase tem forma de fórmula.
- Contraste binário, tricólon reflexo, anáfora, fragmentação dramática, cauda em
  "-ndo"/"-ing", atribuição vaga, agência falsa, punchline em toda virada.
- Código: comentário que repete o código, `catch` que loga e relança, cast para `any`,
  teste que verifica o mock em vez do comportamento.

**S3. Superfície.** Barato de ver, barato de trocar, fácil de exagerar.
- Palavra marcada, travessão, aspas curvas, title case, emoji, negrito espalhado,
  `hover:scale-105`, Inter por default.

### A regra de ordem

> **Nunca conserte S3 com S1 aberto.**

Passar corretor de superfície em texto estruturalmente genérico produz **slop polido**:
mais difícil de detectar, igualmente vazio, e agora com aparência de revisado. Se der
tempo para uma passada só, faça a S1. Um texto com travessão e um fato por parágrafo
é melhor que um texto limpo que não prova nada.

---

## Regra do pagamento: todo corte se paga

Quando você deleta um tell, abre um buraco. O próximo token mais provável para
preencher esse buraco também é slop. Por isso a limpeza ingênua recicla o defeito:
tira "delve", põe "explore"; tira o tricólon, põe dois itens no mesmo ritmo; tira o
travessão, põe dois-pontos.

> **Todo trecho removido volta como fato, número, mecanismo, consequência, nome
> próprio ou julgamento assumido. Ou a frase inteira sai. Sinônimo mais simples não
> é pagamento.**

| Corte | Pagamento falso (recicla) | Pagamento real |
|---|---|---|
| "vamos mergulhar fundo em X" | "vamos explorar X" | "X tem 4 handlers, os dois primeiros dividem estado" |
| "melhora a performance" | "melhora bastante a performance" | "p99 caiu de 900ms para 40ms" |
| "especialistas afirmam" | "estudos indicam" | nome da fonte, ou o claim sai |
| tricólon | dois itens no mesmo ritmo | um item e o motivo dele |
| travessão | dois-pontos | ponto final e frase nova |
| `catch (e) { log(e); throw e }` | `catch (e) { throw e }` | remove o catch, deixa subir |
| "sistema robusto e escalável" | "sistema confiável" | "aguenta 2k req/s, testado com k6" |

Se você não consegue nomear o que a frase ganhou, não mexa nela.

### Quando não há com que pagar

Às vezes a origem não tem fato nenhum. Aí você não pode pagar os cortes sem inventar,
e inventar é S0.

Nesse caso a saída correta **não é** um texto polido do mesmo tamanho. É um texto
bem menor, mais a lista do que falta:

> "Sobrou isto de sustentável: <3 linhas>. Para o resto, preciso de: qual métrica
> mudou, quem é o dono do processo, qual o número antes e depois, qual cliente."

Texto vago virando texto específico sem fonte nova é fabricação com aparência de
edição. Entregar 40 palavras verdadeiras e quatro perguntas é melhor que 400
palavras plausíveis.

---

## Gate anti-overcorreção: o imposto de voz

O modo de falha mais comum de uma passada antislop não é deixar tell passando. É
lavar a voz do autor até virar prosa neutra de consultoria, que é outro tipo de slop
e mais difícil de reverter.

Antes de cada edição, três perguntas:

1. O autor defenderia essa escolha se perguntassem? Se sim, é voz. Não mexe.
2. Cortar perde informação? Se sim, é conteúdo, não slop.
3. Isso adiciona calor ou luz? Calor sai, luz fica.

**Contabilidade obrigatória.** Se a passada removeu mais escolhas defensáveis do que
tells reais, ela piorou o texto. Relate isso em vez de esconder.

**"Deixa como está" é saída válida** e às vezes a correta. Texto humano já bom não
precisa de passada.

### O que proteger (sinais de mão humana)

- Detalhe específico e difícil de fabricar: endereço real, número medido, caminho de
  arquivo, uma citação torta.
- Sentimento misto e tensão não resolvida ("acho bom, mas me incomoda e não sei
  explicar").
- Referência datada, gíria, piada interna de um ano e de um grupo.
- Aparte, parêntese e autocorreção no meio da frase. Modelo raramente se interrompe.
- Fragmento curto depois de uma frase longa, usado com parcimônia.
- Variação real de ritmo entre frases e entre parágrafos.
- Texto escrito antes de nov/2022.

### Regra do cluster

Um tell isolado não é evidência. Um travessão é pontuação. Um "however" é transição.
Um tricólon é uma lista de três coisas.

> Um achado só vira acionável com **dois tells independentes no mesmo trecho** ou
> **um achado S1**. S0 aciona sozinho, sempre.

Nunca reescreva termo marcado dentro de citação, título, nome próprio, bloco de
código ou exemplo que está sendo discutido. Repetição técnica é correta: não varie
`useEffect` para "o hook de efeito" por elegância.

---

## Loop de execução

1. **Ler inteiro.** Nada de editar em streaming.
2. **Leitura de voz.** Escreva uma linha, interna: "Isto é um <tipo> para <leitor>,
   registro <formal / neutro / falado>, escrito por alguém que <traço>." Toda decisão
   seguinte se ancora nela.
3. **Marcar candidatos sem editar.** Só coleta. Editar enquanto lê contamina o resto.
4. **Classificar S0 a S3** e aplicar o gate de cluster. Descartar falso positivo aqui,
   não depois.
5. **Editar de cima para baixo**, pagando cada corte. S0, S1, S2, S3, nessa ordem.
6. **Passada hostil** (abaixo).
7. **Medir e parar** (abaixo).

### Passada hostil

Quem reescreveu está enviesado a favor do próprio texto. Trocar de papel tem que ser
explícito.

Releia como um revisor que **quer provar** que uma IA escreveu isso e vai ser pago
por cada prova. Regra: **cite o span exato**. Se não dá para apontar o trecho, a
crítica é vaga demais para valer.

Saída obrigatória: ou dois spans com o motivo, ou a frase "nenhum span defensável",
com o porquê. Nunca "ficou bom".

Depois da passada hostil, uma correção cirúrgica só nos spans citados. Não abra uma
rodada nova de melhoria geral.

### Parada

Pare quando qualquer uma acontecer:
- Os candidatos restantes são voz, não fórmula.
- Duas rodadas seguidas não mudaram nada visível.
- Você já gastou uma passada estrutural, uma de padrão e uma hostil sem input novo
  do autor.

Rodada que não muda nada visível não conta como rodada. Diga isso em vez de fingir
progresso.

---

## Modo geração

Limpar depois é caro e sempre deixa resto. As mesmas regras aplicadas antes custam nada.

1. Nomeie o leitor e o que ele precisa saber ou fazer quando terminar de ler.
2. Liste o conteúdo real **antes** de escolher a forma. Nunca abra um template.
3. Escreva o fato primeiro, a moldura depois. Sem fato, pergunte, não preencha.
4. Um destaque por bloco. Se tudo tem o mesmo peso, nada tem.
5. Termine no último fato concreto. Não escreva conclusão.
6. Não anuncie o que você vai fazer. Faça.
7. Zero travessão, zero emoji decorativo, zero title case, zero rótulo em negrito que
   repete a linha que vem depois dele.
8. Antes de entregar, rode a passada hostil por dentro.

---

## Slop de resposta de agente

Aplique nas respostas que você escrever durante esta invocação, e use esta tabela
quando o Kelvi pedir revisão do próprio jeito de responder. É a superfície mais
frequente e a menos auditada.

| Padrão | Em vez disso |
|---|---|
| "Claro!", "Ótima pergunta!", "Vou te ajudar com isso" | responde |
| repetir a pergunta antes de responder | responde |
| resumir no fim o que acabou de fazer e está visível | corta |
| "deve funcionar", "provavelmente passa" | prova, ou `não verificado: motivo` |
| oferecer próximos passos que ninguém pediu | corta |
| narrar o que vai fazer numa tarefa curta | faz |
| header e tabela para uma resposta de duas linhas | duas linhas |
| elogiar antes de discordar | discorda |
| "Você está absolutamente certo!" ao ser corrigido | corrige e segue |
| listar opções sem ranquear | ranqueia e recomenda |

---

## Verificação

`scripts/slopscan.py` fica na pasta desta skill. Rodando de outra pasta, use o caminho completo dele.

```bash
python3 scripts/slopscan.py arquivo.md
python3 scripts/slopscan.py docs/ --glob '*.md'   # varredura, pior primeiro
python3 scripts/slopscan.py spec.md --tipo referencia
cat texto.txt | python3 scripts/slopscan.py -
```

Funciona em PT-BR e EN, sem dependência. Ignora bloco de código, frontmatter e citação.

Duas calibrações que evitam falso positivo:

- Termo marcado dentro de aspas ou crases está sendo **discutido**, não usado. O script
  mascara antes de contar, então documentar slop não conta como cometer slop. `--bruto`
  desliga.
- `--tipo referencia` baixa o piso de âncora de 55% para 35%. Spec, skill e doc de regras
  têm menos número por natureza; cobrar 55% ali é ruído.

Arquivo que **inventaria** tells (um catálogo) dispara em si mesmo. Marque com a linha
`<!-- slopscan: catalogo -->` e o scanner mede só estrutura nesse arquivo. Os dois
catálogos desta skill usam isso.

**A métrica principal é `ancora`**: percentual de frases que carregam fato verificável
(número, nome próprio, token de código). É o teste de portabilidade transformado em
número. Texto humano técnico fica em 60% a 75%. Slop fica abaixo de 40%. O exemplo de
slop em PT usado para calibrar deu 7,1%.

| Métrica | Alvo | O que significa quando falha |
|---|---|---|
| ancora | ≥ 55% | as frases servem para qualquer assunto (S1) |
| burstiness | ≥ 0.45 | ritmo metronômico, todas as frases do mesmo tamanho (S1) |
| paragrafo cv | ≥ 0.30 | parágrafos de tamanho uniforme, forma de template (S1) |
| trigrama rep | ≤ 4% | o texto recicla as mesmas expressões (S2) |
| tells t1 | 0 | marcadores que quase não sobrevivem em texto humano (S3) |

O script devolve sinal, não veredito. Ele não sabe se o texto é bom, e nenhum detector
sabe. **Nunca prometa que um texto é indetectável ou "garantidamente humano".** Rejeite
truque de detector que deixe o texto menos verdadeiro, menos específico ou menos
parecido com o autor.

Sua própria nota é enviesada: você é o autor. Trate a nota como sinal e a passada
hostil como o gate real.

---

## Referências

Carregue só o que a tarefa precisa.

| Arquivo | Quando |
|---|---|
| [references/prosa.md](references/prosa.md) | catálogo completo de tells em prosa, com antes/depois |
| [references/pt-br.md](references/pt-br.md) | texto em português. Os tells são outros, não é tradução |
| [references/codigo.md](references/codigo.md) | limpar código gerado, revisar diff, PR |
| [references/design.md](references/design.md) | diagnosticar UI com cara de IA |

## Autoteste

Esta skill roda contra si mesma. Antes de mexer nela:

```bash
python3 scripts/slopscan.py SKILL.md --tipo referencia
```

Estado atual: âncora 37,4%, burstiness 1.07, zero tell, zero alerta. Se aparecer alerta
S1 ou S2, conserte a skill antes de usá-la em texto dos outros. Uma skill antislop
escrita em slop não tem autoridade nenhuma.
