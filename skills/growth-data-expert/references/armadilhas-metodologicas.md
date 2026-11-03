> Referencia da skill growth-data-expert. Carregar sob demanda conforme o indice de Referencias do SKILL.md.

## Uso real != registro no gateway

`user_cost_ai_gateway` tem linhas com `request_count = 0` (heartbeat/telemetria/sessao sem chamada de IA). Tratar essas linhas como "uso" contamina toda metrica temporal.

Regra:
- Para qualquer agregacao temporal (`MAX(data_de_uso)`, `COUNT(DISTINCT data_de_uso)`, "ultimo dia ativo", "gap entre ultimo uso e refund", "primeiro uso") — filtrar `request_count > 0` **antes** do agregado, nao no `HAVING` final.
- `HAVING SUM(request_count) > 0` exclui ghost mas nao corrige o `MAX` — o MAX continua pegando data de heartbeat.
- Quando a janela e pre-refund e `data_de_uso` e DATE sem hora: usar `data_de_uso < data_cancelamento` estrito. `<=` inclui o dia do refund e nao da pra distinguir uso antes vs depois do clique de cancel.

Sanity check antes de entregar metrica de gap/inatividade: rodar amostra de 10 reembolsos e conferir se o `ultimo_uso` calculado faz sentido vs `dias_reembolso`. Se quase todo mundo aparece com gap=1, suspeitar de heartbeat contaminando.

---

## Vazamento pos-reembolso != uso pos-reembolso

Quando medir "uso/custo IA depois do cancelamento", o numero bruto (`SUM(request_count)` apos `data_cancelamento`) inclui clientes com OUTRA assinatura ativa no mesmo email — uso legitimo, nao vazamento.

Antes de chamar de vazamento, segmentar:

- **A — vazamento real:** email NAO tem outra venda do mesmo `grupo_produto` ativa cobrindo a janela pos-cancel.
- **B/C — falso positivo:** email tem 1+ outras vendas ativas. Uso pos-cancel e direito contratual via a outra assinatura.

Logica minima (gold; grupo via `dim_produto`, reembolso via `dim_status`):

```sql
LEFT JOIN gold__fact__vendas v2
  JOIN gold__dim__produto p2 ON (5 chaves)
  JOIN gold__dim__status   s2 ON s2.status = v2.status
  ON v2.contact_doc = contact_doc_reembolsado
 AND p2.grupo_produto = grupo_da_venda_reembolsada
 AND v2.sale_uid <> sale_uid_reembolsado
 AND (s2.is_reembolso = 0
      OR v2.dt_cancelamento > dt_cancel_da_venda_reembolsada)
```

Caveat: cobrir TODOS os grupos NEKT relevantes, nao so o grupo da venda reembolsada — cliente com Adapta Platinum + Adapta Gold reembolsado nao e vazamento.

---

## Mediana exata != approx_percentile

Para coorte ate ~1M linhas, **sempre mediana exata**. `approx_percentile` (T-Digest no Trino/Athena) tem erro relativo ~1% e flutua entre execucoes — inviabiliza comparacao entre rodadas, entre agentes, e dispara divergencia que parece erro de calculo quando e so ruido do algoritmo.

Sintoma real: B4.5 reportou mediana 4,09 em uma rodada e 4,10 em outra. Mediana exata = 4,00. Diferenca pequena, mas suficiente pra dois modelos divergirem em 4 metricas e gastar uma rodada de auditoria.

Padrao canonico (Trino/Athena):

```sql
WITH ordenado AS (
  SELECT grupo, valor,
         ROW_NUMBER() OVER (PARTITION BY grupo ORDER BY valor) AS rn,
         COUNT(*) OVER (PARTITION BY grupo) AS total
  FROM dados
)
SELECT grupo, AVG(valor) AS mediana
FROM ordenado
WHERE rn IN (FLOOR((total + 1) / 2.0), CEIL((total + 1) / 2.0))
GROUP BY grupo
```

`approx_percentile` so quando coorte > 1M linhas E custo de query for proibitivo. Documentar essa escolha explicitamente no caveat.

Mesma regra para P75, P90, P95 e P99 — usar `percentile_disc` ou `ROW_NUMBER` com posicao correspondente, nao `approx_percentile`.

---

## Fatos gerenciais: grao sale_uid x BU

`gold__fact__receita_bruta_gerencial` e `gold__fact__reembolso_gerencial` sao as fontes financeiras canonicas de reembolso e estao no grao `sale_uid x bu`.

Regras:
- join financeiro por `sale_uid + bu`, nunca so por `sale_uid`;
- receita liquida por linha = receita bruta - reembolso;
- contagens com `COUNT(DISTINCT sale_uid)`;
- contagens de BUs nao sao aditivas;
- `gold__fact__vendas.receita_gerencial` serve para detalhe/reconciliacao, nao substitui o fato financeiro canonico.

Sanity checks: unicidade de `sale_uid + bu`, todo reembolso encontra receita, soma dos fatos reconcilia com o detalhe e receita liquida = bruta - reembolsada.

---

## D+30 nao congela a coorte

Uma venda fica madura operacionalmente quando `dt_competencia + 30 dias <= snapshot`. Isso nao fecha o valor para sempre: refunded, chargeback e dispute registrados depois continuam associados a `dt_competencia` original e alteram a coorte em snapshots seguintes.

Erro tipico: guardar taxa D+30 como valor definitivo ou ignorar reembolso tardio. Persistir medidas aditivas e recalcular a taxa em cada snapshot.

---

## Snapshot canonico — base e viva

Os fatos Gold gerenciais recebem chargeback/dispute administrativos lancados retroativamente. Numeros mudam entre rodadas mesmo na mesma coorte madura:

- Snapshot manha 14/05: 10.271 reembolsos.
- Snapshot noite 14/05: 10.284.
- Snapshot 15/05: 10.292.

Regra:
- Toda analise FULL fixa **data e hora do snapshot** no topo: "Snapshot NEKT: 2026-05-15 13:13 UTC-3".
- Ao atualizar em rodada posterior, **propagar o novo snapshot para TODOS os blocos**. Nao deixar B1 com 10.271 e B5 com 10.284 — gera incoerencia que destroi confianca quando alguem audita.
- Diferenca >0,5% entre rodadas → declarar drift como caveat. <0,5% e ruido administrativo, mas ainda assim propagar.
- `snapshot_date` e uma borda logica; nao congela sozinho o warehouse. Para igualdade exata, auditar contra a mesma extracao materializada, nao uma nova leitura da fonte viva.

Sanity check: somar reembolsos por mes deve igualar o agregado. Se nao bate, ha snapshot diferente em queries diferentes — encontrar e unificar antes de entregar.

---

## Denominador alinhado entre blocos correlacionados

Quando um bloco subsequente calcula metrica condicional ("entre quem usou", "entre quem refundou", "entre quem ativou"), o N do bloco precisa bater com o N do bloco que definiu o filtro.

Sintoma real: B4.2 reportou 9.536 reembolsados com uso real (`req>0`). B4.5 calculou medianas com N=10.013 — incluindo gente sem uso real. Mediana de % dias ativos inflou de 47,8% (correto) para 53,3% (errado) e ninguem notou ate auditoria.

Trava:
- Antes de rodar query do bloco seguinte, anotar o N do filtro do bloco anterior.
- Se filtro e "com uso real (`req>0`) na janela observacional", o bloco seguinte usa o mesmo filtro.
- Se nao bater, recalcular ou justificar.
- Reportar o N no topo do bloco subsequente: "(n=9.536 reembolsados com uso real, alinhado com B4.2)".

---

## Repeat refunders — emails != vendas != vendas extras

Em multi-compra/repeat, sempre rotular o eixo:

- **Emails repeat refunders:** quantidade de emails unicos com >1 venda reembolsada.
- **Vendas extras geradas por repeat:** sempre = total_reembolsos − compradores_unicos_reembolsados.
- "Compradores com 2+ reembolsos" e sinonimo de "emails repeat refunders", **nao** de "vendas extras".

Erro tipico: confundir "21 vendas extras" com "21 compradores repeat". Em coorte com 10.292 reembolsos e 10.271 compradores reembolsados, ha 21 vendas extras MAS o numero de emails repeat e menor (ex: 19 emails com 2 reembolsos + 1 email com 3 = 20 emails, gerando 21 vendas extras).

Reportar sempre em duas linhas:
- "X emails repeat refunders (decomposicao: Y emails com 2 + Z emails com 3+ = X total)"
- "Geraram W vendas extras (W = total_reembolsos − compradores_unicos_reembolsados)"

Conferencia: Y*1 + Z*2 + ... = W.

---

## Cobertura: fonte inteira vs janela operacional

Quando a coorte e Q1 mas a fonte de uso cobre periodo maior (Jan-Dez), reportar **dois escopos** de cobertura:

- **Fonte inteira:** compradores da coorte que aparecem em **qualquer momento** na `user_cost_ai_gateway`.
- **Janela operacional:** compradores que aparecem **dentro da janela observacional dos blocos seguintes** (ex: Jan-Abr quando coorte e Q1 com janela 30d).

Razao: escopo "fonte inteira" infla cobertura artificialmente — pega uso fora da janela do bloco. Os blocos subsequentes precisam do escopo operacional pra nao misturar uso pos-janela com uso dentro-da-janela.

Sintoma real: B4.1 reportou "1.309 com `req=0`" sem distinguir os escopos. O numero correto para os blocos seguintes era 1.406 (Jan-Abr operacional), nao 1.304 (fonte inteira) nem o intermediario 1.309.

Regra:
- B-cobertura sempre reporta os dois escopos lado a lado.
- Declarar explicitamente qual escopo os blocos seguintes usam: "Blocos 4/5/6 usam janela operacional Jan-Abr".
- Default: usar **janela operacional** para tudo que olha uso/custo dentro de janela definida.

---

## Mix shift — declarar formula

Decomposicao classica da variacao da taxa agregada tem 3 termos:

```
delta_taxa = sum_sku [ (peso_T1 - peso_T0) * taxa_T0           # efeito mix puro
                     + peso_T0 * (taxa_T1 - taxa_T0)           # efeito intra puro
                     + (peso_T1 - peso_T0) * (taxa_T1 - taxa_T0) ]  # interacao
```

Versao 2-efeito agrupa interacao dentro do "intra":

```
delta_taxa = sum_sku [ (peso_T1 - peso_T0) * taxa_T0
                     + peso_T1 * (taxa_T1 - taxa_T0) ]
```

Ambas sao validas. Diferenca aparece quando peso e taxa se movem juntos (interacao nao-trivial).

Regra:
- Declarar qual versao foi usada (2-efeito ou 3-efeito).
- Veredito qualitativo nao deve mudar entre versoes — se mudar, ha mix shift ativo com interacao forte que merece analise dedicada.
- Sanity: soma dos efeitos = delta total observado (sempre, em qualquer versao).
- Se uma análise usa 3-efeito e outra usa 2-efeito, nao e erro — e diferenca metodologica que precisa ser documentada nos dois lados.
