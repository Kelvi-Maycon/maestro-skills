# Leitura e decisão de growth

Princípios, lentes e exemplos da skill unificada. Aplicar só os itens pertinentes ao pedido; não transformar o índice em checklist de consultas. Regras técnicas e autorização vivem exclusivamente em `nekt-contrato-dados.md`.

## Principio Central

Nao entregar "analise". Entregar **decisao melhor**.

Todo output precisa responder:

1. O que esta acontecendo?
2. Onde isso pesa em dinheiro, volume ou risco?
3. Qual segmento explica a maior parte?
4. Qual acao ou proxima investigacao isso destrava?
5. O que nao da para concluir com os dados atuais?

Se a resposta nao muda decisao, corte.

**Antes de calcular**, nomear a decisao OU hipotese que a analise informa. Se nao tiver nenhuma das duas, marcar como LIGHT exploratorio — nao tratar como conclusao.

---

## Pensar Antes De Responder

Analista senior pensa antes de tocar no dado. Alem de nomear a decisao/hipotese (acima), responder internamente — nao despejar no output:

1. **O que eu espero ver?** Prever a ordem de grandeza antes de rodar. Se o resultado vier muito fora do esperado, suspeitar de erro de query antes de acreditar no numero.
2. **O que derrubaria esse achado?** Definir o teste que o falsifica. Se nada derruba, a conclusao nao e falsificavel — tratar como fraca.
3. **Qual o menor corte que responde?** Nao rodar 8 cohorts quando 1 numero resolve. Profundidade onde muda decisao, nao por toda parte.
4. **Como um estranho leria esse numero?** Se nao da pra explicar em 1 frase o que ele significa, o dado ainda nao foi entendido — nao entregar.

Pensar primeiro, calcular depois. Numero sem tese e ruido caro.

---

## Legibilidade — Teste Do Estranho

> [!important] Criterio de aceite que BLOQUEIA entrega
> **Pegue qualquer par pergunta+resposta no meio do documento. Um estranho, que nao leu nada acima, entende o que o numero significa e por que importa em menos de 30 segundos, sem precisar reler outro bloco?**
> Se a resposta e "nao", o bloco esta reprovado. Reescrever antes de entregar. Esse teste vale tanto quanto acertar o numero: dado que o leitor nao entende nao muda decisao nenhuma.

### Regra de como ler os dados (aplicar em TODO numero)

Todo numero sai em 3 camadas, nessa ordem:

1. **O numero em linguagem humana, autossuficiente.** Nunca so a taxa, nunca so o absoluto. Sempre `parte de total (%)` por extenso.
   - Ruim: "taxa 8,3%".
   - Bom: "**8,3% das vendas foram reembolsadas** — 854 de 10.292 vendas no periodo."
2. **O que isso significa**, em 1 frase, como se o leitor nunca tivesse visto a metrica. "Ou seja: a cada ~12 vendas, 1 voltou como reembolso."
3. **Por que importa** (so se muda decisao). "Sao R$ X devolvidos — [maior/menor] que [referencia comparavel]."

### Rotular a metrica primaria — sempre

- Todo bloco declara no topo **qual e a metrica primaria** daquele bloco: `Metrica primaria: taxa de reembolso por produto`.
- As demais sao **contexto/apoio** — marcar como tal. O leitor tem que saber em 1 segundo qual numero olhar primeiro.
- Um bloco = uma pergunta = uma metrica primaria. Se tem duas perguntas, sao dois blocos.

### Auto-suficiencia de cada bloco

- **Nao assumir que o leitor leu o bloco anterior.** Redefinir coorte, janela e denominador em 1 linha curta em todo bloco, mesmo repetindo. Repetir definicao curta > obrigar o leitor a rolar pra cima.
- Todo jargao tecnico aparece traduzido na primeira vez do bloco — ou, melhor, nao usar o jargao e escrever em humano.
- Numero solto e proibido. `2.341` sozinho nao diz nada; `2.341 compradores (23% da coorte)` diz.

### Vocabulario de saida

- **"reembolso / reembolsado / nao-reembolsado"** — nunca "refund / refundado". Reembolso e cancelamento sao coisas diferentes; nao trocar uma pela outra.
- Sem `numerador`/`denominador` no texto pro Kelvi — escrever "X de Y". Os termos tecnicos ficam so na linha de auditoria interna.
- Sem `PXX` no texto (P50/P75/P90): calcular o percentil, mas escrever "metade fez ate Y", "75% fez ate Y", "os 10% mais pesados passaram de Y".
- Volume sempre com % do total. Bucket de dias em %, nao em contagem crua.

### Antes vs depois (modelo do que o teste exige)

Reprovado (so faz sentido pra quem rodou a query):
> B4.2: req>0 n=9.536, mediana %dias ativos 47,8%, P75 71%.

Aprovado (estranho entende sozinho):
> **Entre quem reembolsou e chegou a usar a IA** (9.536 pessoas, 93% de todos que reembolsaram):
> metade usou a ferramenta em **ate 48% dos dias** em que teve acesso; os 25% mais ativos, em mais de 71% dos dias.
> Ou seja: houve uso relevante antes da saída; esse dado sozinho não demonstra o motivo do reembolso.

## Postura

- Ser cetico por default.
- Desafiar premissa fraca antes de calcular.
- Preferir "nao da para concluir" a um numero bonito.
- Nao maquiar, nao inflar, nao escolher recorte para contar historia favoravel.
- Quando houver risco politico, aumentar rigor e reduzir certeza declarada.
- Separar fato, inferencia e recomendacao.

## Lente Growth

**Pensar nas 7 lentes internamente; entregar so as 2-3 relevantes.** Despejar todas no output esconde o insight.

| Camada | Pergunta |
|---|---|
| Volume | Onde esta a maior massa de vendas, usuarios, reembolsos ou custo? |
| Taxa | Onde o problema e proporcionalmente pior? |
| Dinheiro | Onde esta a maior receita, perda, custo ou margem pressionada? |
| Segmento | O padrao muda por produto, grupo_produto, tipo_venda, plano ou status? |
| Tempo | O padrao e tendencia real, mix shift ou janela truncada? |
| Alavanca | Isso aponta para oferta, ativacao, bloqueio, preco, aquisicao, renovacao ou suporte? |
| Confianca | A conclusao e forte, media, fraca ou apenas exploratoria? |

Regra: taxa sem volume engana; volume sem dinheiro distrai; dinheiro sem acao vira dashboard inutil.

---


---

## Classificacao Do Achado

Antes de finalizar, classificar o achado em uma categoria:

| Tipo | Sinal |
|---|---|
| Vazamento | custo ou uso continua depois de cancelamento/reembolso sem outro direito de acesso vigente, após validação |
| Ativacao fraca | baixo uso antes do reembolso ou baixa cobertura de uso |
| Oferta ruim | produto/oferta com taxa ruim e volume suficiente |
| Mix shift | resultado agregado muda por composicao de produto/tipo_venda |
| Operacional | diferenca por status, plataforma, metodo, renovacao ou bloqueio |
| Margem | custo IA ou reembolso pressiona contribuicao economica |
| Descritivo | dado ainda nao aponta alavanca clara |

Se for apenas descritivo, diga. Nao force narrativa.

---

## Priorizacao

Quando houver varios achados, rankear por:

1. Impacto em dinheiro.
2. Volume absoluto.
3. Severidade da taxa.
4. Confianca do dado.
5. Controlabilidade da alavanca.
6. Urgencia politica/operacional.

Preferir problema grande e acionavel a curiosidade estatistica.

---


---

## Quando Parar

Suspender a conclusão forte e resolver a lacuna, limitar o recorte ou declarar o que ficou pendente quando:

- pergunta exige tabela fora do whitelist;
- dado vai para lideranca e ainda esta em modo exploratorio;
- coorte recente tem janela de reembolso incompleta;
- join por email em B2B e premissa central;
- resultado depende de B2C definitivo;
- categoria/filtro nao foi validado com valores distintos;
- numero parece estranho e ainda nao foi decomposto;
- Kelvi insinua espremer recorte para conclusao mais favoravel.


## Entrega executiva

Quando for para liderança: achado, impacto, evidência, limite, decisão sugerida e próximo teste. Cada bloco deve se sustentar sozinho. Não inferir causalidade ou motivo de saída a partir de intensidade de uso.
