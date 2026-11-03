# Testes, Diagnóstico e Escala

## Função

Transformar cada publicação em uma resposta útil. O sistema não testa “se a copy é boa”; testa uma hipótese dentro de público, canal, oferta, execução e economia definidos.

## O teste compra informação

Um teste deve responder:

- qual pergunta está sendo feita;
- qual variável está sendo manipulada;
- o que permanece constante;
- qual resultado seria consistente com a hipótese;
- qual limite evita perda descontrolada;
- o que será feito em cada cenário.

“Validou/não validou” desperdiça informação de componentes e contexto.

## Cartão de teste

Preencher antes de lançar:

| Campo | Conteúdo |
|---|---|
| ID | nome único |
| Objetivo econômico | venda, margem, lead qualificado etc. |
| Pergunta | uma pergunta principal |
| Hipótese | se X, então Y, porque Z |
| Controle | versão de comparação |
| Variável | o que muda |
| Constantes | o que permanece |
| Público/canal | segmento, placement, device |
| Oferta | preço e condição |
| Janela | tempo e amostra planejados |
| Limite de perda | verba ou condição |
| Métrica primária | decisão econômica |
| Diagnósticas | comportamento por etapa |
| Critério | escalar, iterar, cortar ou investigar |
| Riscos | confounders e compliance |

## Quatro tipos de teste

### 1. Microvariação causal

Muda uma variável observável:

- headline;
- hook;
- primeiro frame;
- CTA;
- prova;
- thumbnail;
- pacote.

Use quando existe controle estável e a pergunta é local.

### 2. Família criativa

Preserva conceito e corpo, varia portas de acesso:

- hooks;
- avatares equivalentes;
- cenários;
- formatos próximos;
- landing sentences;
- visuais.

Use para ampliar alcance e localizar componentes.

### 3. Pack congruente

Muda uma rota inteira: ad, pre-sell, autoplay e lead sob o mesmo frame. Use quando a hipótese depende da experiência completa.

O resultado mede o pacote, não uma variável. Se vencer, decomponha depois.

### 4. Challenger estrutural

Testa nova Big Idea, mecanismo, segmento, oferta ou formato substancial. Use quando:

- controle está saturado;
- teto econômico foi atingido;
- pesquisa aponta nova oportunidade;
- existe orçamento de exploração;
- a tese pode ser comparada com clareza.

## Exploração versus exploração do controle

### Exploração local/previsibilidade

Objetivo: extrair mais valor de psicologia comprovada.

Priorize quando:

- oferta é nova;
- caixa é limitado;
- time ainda aprende;
- controle está saudável;
- precisa separar mensagem de execução.

### Exploração estrutural

Objetivo: descobrir próximo território de escala.

Priorize uma parcela quando:

- controle perdeu tração;
- formatos saturaram;
- segmentos adicionais possuem evidência;
- prova ou produto abriu nova tese;
- caixa tolera variância.

Não existe percentual universal. A alocação é decisão de portfólio condicionada por maturidade, caixa e urgência.

## Métricas em hierarquia

### 1. Resultado econômico

- receita incremental;
- margem de contribuição;
- CAC/CPA;
- ROAS dentro da janela adequada;
- AOV;
- reembolso e chargeback;
- LTV e payback;
- caixa consumido.

### 2. Conversão da etapa

- compra;
- checkout iniciado;
- lead;
- play;
- clique qualificado;
- resposta/agendamento;
- upsell/recompra.

### 3. Diagnóstico de comportamento

- CPM;
- CTR/CPC;
- play rate;
- hook/hold rate;
- retenção por marco;
- scroll;
- chegada ao pitch;
- mix de pacote;
- erro por device.

Métrica de camada inferior não sobrepõe resultado econômico. Ela ajuda a explicar onde intervir.

## O que cada métrica pode e não pode dizer

| Sinal | Pode sugerir | Não prova |
|---|---|---|
| CPM alto | baixa relevância prevista, competição, formato/conta/mercado | que a copy inteira está ruim |
| Hook rate alto | começo para atenção | qualificação ou venda |
| CTR alto | curiosidade/relevância para clicar | intenção de compra |
| CPC baixo | acesso barato | tráfego valioso |
| Hold rate alto | corpo retém | crença ou oferta forte |
| Play rate alto | página/player convidam ao play | VSL persuasiva |
| Retenção alta | consumo | conversão incremental |
| Checkout alto | intenção avançada | pagamento sem fricção |
| Take rate alto | aceitação de upsell | contribuição alta |
| ROAS inicial alto | retorno na janela | LTV ou qualidade do cliente |
| Muitas replicações externas | interesse em lateralizar | lucro do concorrente |

## Diagnóstico de criativo

### Hook forte, corpo fraco

Sinais: atenção/CTR bons, pouca venda ou queda posterior.

Ações:

- preservar hook;
- testar corpo validado;
- revisar qualificação;
- fortalecer landing sentence, mecanismo e prova;
- verificar congruência com destino.

### Hook fraco, corpo forte

Sinais: pouca entrada, mas pessoas expostas convertem.

Ações:

- novos hooks visuais e verbais;
- avatar e primeiro frame;
- empilhamento coerente;
- formatos da dieta de mídia;
- preservar corpo e oferta.

### Retém, mas não vende

Hipóteses:

- entretenimento sem relevância comercial;
- curiosidade não paga;
- público não comprador;
- claim inacreditável;
- prova insuficiente;
- oferta ou destino incongruentes.

### Vende, mas não escala

Hipóteses:

- segmento estreito;
- hook excessivamente específico;
- formato limitado;
- CPM alto;
- controle cansado;
- capacidade de oferta.

Ações: ampliar portas de acesso mantendo a tese antes de diluí-la.

## Diagnóstico da VSL/página

| Queda | Investigar primeiro |
|---|---|
| Antes do play | ad–página, headline, thumbnail, load, mobile |
| Primeiros segundos | microlead, áudio, rosto, expectativa, ritmo |
| Durante história | relevância, progressão, excesso, credibilidade |
| No mecanismo | clareza, causalidade, jargão, prova |
| Antes do pitch | fadiga, repetição, transição, desejo pelo produto |
| Após revelar produto | fit, diferença, reason why do veículo |
| Durante oferta | valor, stack, preço, pacote, risco |
| No checkout | UX, pagamento, surpresa, confiança |

Cruze por anúncio, fonte, segmentação e dispositivo antes de reescrever a peça inteira.

## Limite antes do teste

“Errar rápido” significa definir antecipadamente:

- verba;
- amostra/exposição mínima;
- duração;
- evento primário;
- tolerância de perda;
- regra de corte;
- regra de extensão;
- risco operacional;
- quem decide.

Não mova a régua após ver um resultado emocionalmente desejável.

## Variável isolada versus causalidade real

Testar uma variável ajuda interpretação, mas o sistema precisa reconhecer:

- leilão e distribuição variam;
- mudanças visuais podem alterar público alcançado;
- aprendizado de plataforma afeta exposição;
- uma peça é interação entre componentes;
- resultado pequeno pode ser ruído;
- teste sequencial sofre mudança de contexto.

Quando causalidade importa, use desenho e amostra adequados. Quando velocidade importa, rotule a conclusão como evidência operacional, não verdade universal.

## Recuperar valor dos perdedores

Para cada peça, avalie separadamente:

- primeiro frame;
- hook verbal;
- landing sentence;
- avatar;
- formato;
- retenção do corpo;
- prova;
- benefício;
- CTA;
- qualidade downstream.

Um anúncio sem venda pode conter o melhor hook do lote. Recombine componente forte com estrutura comprovada, preservando congruência.

## Lateralizar vencedor

### Ordem sugerida

1. hook visual;
2. hook verbal;
3. landing sentence;
4. avatar equivalente;
5. prova/benefício;
6. edição;
7. formato;
8. segmento;
9. ângulo;
10. mecanismo/Big Idea.

Mudanças baratas e próximas preservam mais evidência. Mudanças grandes entram no portfólio de exploração.

### Quatro expansões funcionais

Quando o controle está curto ou incompleto, teste:

1. consequências pessoais do benefício;
2. valor e reason why no primeiro CTA;
3. novos bullets/razões após o CTA;
4. segundo CTA para quem precisou de mais persuasão.

Não adicionar por regra. Cada bloco precisa justificar seu custo de atenção.

## Nomenclatura

Use um ID que preserve decisões. Exemplo:

```text
OFERTA-SEGMENTO-IDEIA-ANGULO-FORMATO-AVATAR-HOOK-CORPO-VERSAO
```

Ou código compacto com dicionário. O importante é reconstruir a combinação exata.

Evite “ad novo 7 final final”.

## Registro pós-teste

Para cada ID:

- hipótese;
- datas e contexto;
- gasto/exposição;
- métricas econômicas;
- métricas por etapa;
- qualidade do dado;
- decisão;
- componente preservado;
- componente rejeitado;
- explicações alternativas;
- aprendizado;
- próxima variação.

### Linguagem da conclusão

- **Comprovado internamente:** repetição consistente com desenho adequado.
- **Evidência forte:** resultado robusto, ainda contextual.
- **Sinal:** resultado promissor que pede repetição.
- **Inconclusivo:** exposição ou controle insuficientes.
- **Refutado neste contexto:** não sustentou a hipótese nas condições testadas.

Nunca escreva “o público prefere X” a partir de uma única peça sem exposição comparável.

## Reunião de debrief

Copy, edição e mídia respondem:

1. qual pergunta o pack fazia?
2. a distribuição permitiu respondê-la?
3. onde ocorreu o primeiro desvio?
4. qual componente foi forte?
5. qual promessa trouxe o tipo de comprador correto?
6. o que pode ser recombinado?
7. qual conclusão é dado e qual é inferência?
8. qual próximo teste reduz mais incerteza?

O objetivo não é defender o autor.

## Escala

Escalar exige:

- economia positiva ou perda intencional suportada;
- estabilidade suficiente por coorte;
- capacidade de fulfillment;
- compliance;
- criativos substitutos;
- monitoramento de saturação;
- backend e caixa compatíveis;
- plano de lateralização e descoberta.

Um outlier não é uma máquina. Transforme-o em família, identifique limites e desenvolva outro território antes da fadiga.

## Erros de decisão

- comparar métricas com definições diferentes;
- transplantar benchmarks de outra operação;
- cortar antes da amostra definida;
- prolongar porque houve muito trabalho;
- atribuir vitória a “energia”, gosto ou talento sem controlar variáveis;
- escalar CTR sem qualidade downstream;
- tratar correlação como causalidade;
- mudar várias coisas e descrever uma causa única;
- ignorar device, source e cohort;
- confundir receita com margem;
- usar backend hipotético para justificar prejuízo;
- não registrar perdedores;
- abandonar controle antes de explorar suas portas de acesso.

