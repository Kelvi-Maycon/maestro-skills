# Contrato técnico Nekt

Fonte única das regras de tabelas, métricas, joins e coortes desta skill. Confira o schema vivo dentro das fontes autorizadas antes de usar campos ainda não validados. Nomes e exemplos abaixo não substituem essa validação.

## Regra Suprema

> Migracao silver -> gold (2026-06): a fonte de vendas passou da tabela flat `nekt_silver.base_de_vendas` para o **star schema** `nekt_gold`. A `base_de_vendas` esta **aposentada** para analise nova.

Dentro da Nekt, usar **somente** as fontes abaixo, respeitando a autorização específica da exceção de IA:

**Vendas — star schema `nekt_gold`:**
1. `nekt_gold.gold__fact__vendas` — venda efetiva e detalhe comercial (grao = 1 `sale_uid`): coorte, tipo de venda, status e renovacao.
2. `nekt_gold.gold__fact__receita_bruta_gerencial` — receita bruta gerencial canonica (grao = `sale_uid x bu`).
3. `nekt_gold.gold__fact__reembolso_gerencial` — receita reembolsada canonica, somente refunded/chargeback/dispute (grao = `sale_uid x bu`).
4. `nekt_gold.gold__fact__transacoes` — tentativa de cobranca (inclui recusa): aprovacao, retry, falha de cobranca/dunning.
5. `nekt_gold.gold__dim__produto` — `grupo_produto`, `is_renovavel`, `pode_ser_renov_antecip`, `tem_custo_ia`; join pelas 5 chaves (empresa, plataforma, produto_biu, product_name_guru, product_offer_name) ou por `depara_produto_id` quando o fato fornecer essa chave.
6. `nekt_gold.gold__dim__cliente` — `contact_email`, nome, telefone; PK/join `contact_doc`.
7. `nekt_gold.gold__dim__status` — `is_venda`, `is_reembolso`, `status_grupo`; join `status`.
8. `nekt_gold.gold__dim__adquirente` — `adquirente_canonico` (Adyen/pagarme/mercadopago...); join `payment_marketplace_name`.
9. `nekt_gold.gold__dim__data` — calendario role-playing; join por `dt_competencia`/`dt_venda`/`dt_cancelamento`/`dt_encerramento`.
10. `nekt_gold.gold__dim__trackings` — atribuicao/UTM; join `tracking_key`.

**Uso/custo IA:**
11. `nekt_silver.user_cost_ai_gateway` — excecao Silver exclusiva para uso/custo IA; usar somente com autorizacao explicita do Kelvi e excluir `is_adapta` em analise de cliente.

Tudo fora disso esta banido ate Kelvi liberar pelo nome.

### Proibido

- Nao usar `list_tables` para descobrir alternativas.
- Nao consultar `information_schema.tables`.
- Nao rodar `get_table_preview`, `get_relevant_tables_ddl`, `generate_sql` ou `execute_sql` com tabela fora do whitelist.
- Nao sugerir workaround com tabela banida.
- Nao voltar a usar `nekt_silver.base_de_vendas` nem catalogos silver antigos — aposentados.
- Nao assumir que Zendesk, Amplitude, usuarios ou outras camadas estao liberados.

### Se a pergunta exigir fonte fora do whitelist

Responder:

> Essa analise depende de fonte fora do whitelist atual. Hoje posso responder com o star schema `nekt_gold`, incluindo os fatos gerenciais de receita e reembolso. `nekt_silver.user_cost_ai_gateway` e uma excecao exclusiva de IA e exige sua autorizacao explicita nesta analise. Quer liberar a fonte pelo nome, ajustar a pergunta ou aceitar uma versao limitada?

Liberacao e pontual por padrao. So vira permanente se Kelvi disser "permanente".

---

## Fonte De Verdade

| Dominio | Tabela |
|---|---|
| Venda efetiva, renovacao, primeira compra e detalhe comercial | `gold__fact__vendas` (+ dims) |
| Receita bruta gerencial financeira | `gold__fact__receita_bruta_gerencial` |
| Receita reembolsada financeira | `gold__fact__reembolso_gerencial` |
| Tentativa de cobranca, aprovacao, recusa, retry | `gold__fact__transacoes` (+ dims) |
| Produto / grupo / renovavel | `gold__dim__produto` |
| Email / nome / telefone do cliente | `gold__dim__cliente` |
| Status (venda efetiva vs reembolso) | `gold__dim__status` |
| Adquirente / gateway (Adyen...) | `gold__dim__adquirente` |
| Uso e custo de IA por usuario | `nekt_silver.user_cost_ai_gateway` |

**Transacoes vs Vendas:** `transacoes` = tentativa (toda cobranca, inclui recusada); `vendas` = o que entrou no faturamento. Contagem/detalhe de vendas, renovacao e classificacao de reembolso -> `vendas`; valores financeiros -> fatos gerenciais de receita e reembolso. Aprovacao de cartao, retry, falha de cobranca -> `transacoes`.

---

## Definicoes Canonicas

| Pergunta | Definicao (gold) |
|---|---|
| Venda efetiva | `gold__dim__status.is_venda = 1` (join por `status`) |
| Reembolsou? | `gold__dim__status.is_reembolso = 1` (refunded/chargeback/dispute). `fact.dias_reembolso` so para tempo ate reembolso |
| Receita bruta financeira | `SUM(gold__fact__receita_bruta_gerencial.valor)` |
| Receita reembolsada financeira | `SUM(gold__fact__reembolso_gerencial.valor)`; o fato ja contem refunded/chargeback/dispute |
| Receita liquida | No grao `sale_uid x bu`: `receita_bruta.valor - COALESCE(reembolso.valor, 0)` |
| Taxa financeira de reembolso | `SUM(reembolso.valor) / SUM(receita_bruta.valor)` com a mesma `dt_competencia` e os mesmos filtros |
| Taxa de reembolso em vendas | `COUNT(DISTINCT sale_uid reembolsada) / COUNT(DISTINCT sale_uid vendida)` |
| Maturidade de reembolso D+30 | `dt_competencia + 30 dias <= snapshot`; nao congela a coorte, reembolsos tardios continuam entrando nela |
| Data de cancelamento | `fact.dt_cancelamento` / `dates_canceled_at` |
| Produto (join) | `gold__dim__produto` pelas 5 chaves: empresa, plataforma, produto_biu, product_name_guru, product_offer_name |
| Grupo do produto | `gold__dim__produto.grupo_produto` (ex: `'Adapta Gold'`. **B2B e grupo proprio** `'Adapta Gold B2B'`; Elite/Summit tambem separados) |
| Produto renovavel | `gold__dim__produto.is_renovavel` |
| Primeira compra/self-service | `fact.tipo_venda = 'Self-Service'` |
| Renovacao (cobranca) | `fact.is_renovacao = 1` |
| Renovou (resultado) | `fact.is_renovado` (bruto) / `fact.is_renovado_net` (liquido, sem reembolso). **Caveat:** flag tem janela propria; nao e identica ao self-join D-90/D+30 (da ~+6pp no bruto, ~-2,6pp no net vs a janela). Para a janela canonica de renovacao, self-join continua necessario |
| Venda assistida | `fact.tipo_venda = 'Inside Sales'` |
| Receita (padrao financeiro) | `gold__fact__receita_bruta_gerencial.valor`. `gold__fact__vendas.receita_gerencial` serve para detalhe por venda/reconciliacao. `receita_contabil`/`nfs_valor`/`nfe_valor` SO se fiscal/contabil |
| Vencimento | `fact.data_encerramento` |
| Adquirente / gateway | `gold__dim__adquirente.adquirente_canonico` (join `payment_marketplace_name`). Canonico agrupa contas (pagarme+pagarme2). Adyen = gateway atual |
| Metodo de pagamento | `fact.payment_method` (`credit_card` / `pix` / `billet`) |
| Custo IA | `user_cost_ai_gateway.total_cost` |
| Requests IA | `user_cost_ai_gateway.request_count` |
| Data de uso IA | `user_cost_ai_gateway.data_de_uso` (DATE nativo). **Nunca** usar `_ingested_at` |
| User com uso IA | `user_cost_ai_gateway.request_count > 0` |
| User com custo IA | `user_cost_ai_gateway.total_cost > 0` |
| Team interno (excluir por default) | `user_cost_ai_gateway.is_adapta = true` |
| Cliente canonico | **`contact_doc`** (PK do star schema). Email/nome via `gold__dim__cliente.contact_email`. Para cruzar com IA (gateway usa email no login): `contact_doc -> dim_cliente.contact_email -> lower(trim(email))` |

**Importante — uso ≠ custo:**
- Linha existir na tabela nao e prova de uso real (ha registros com `request_count = 0` e `total_cost = 0`).
- User com `request_count > 0` mas `total_cost = 0` e possivel (cache hit, modelo barato, arredondamento, credito).
- Escolher o filtro certo pela pergunta: "quem usou IA" → `request_count > 0`; "quem gerou custo" → `total_cost > 0`.

**Team interno (`is_adapta = true`):**
- Default em analise de cliente: filtrar fora (`WHERE is_adapta = false` ou `is_adapta IS NOT TRUE`).
- Incluir SO quando a pergunta for custo interno, custo total operacional, ou uso do time da Adapta.
- Declarar explicito no caveat qual decisao foi tomada.

### Reembolso gerencial: grao, BU e coorte

- Os fatos `receita_bruta_gerencial` e `reembolso_gerencial` estao no grao `sale_uid x bu`.
- Ligar os dois fatos por `sale_uid + bu`; `LEFT JOIN` da receita para o reembolso.
- Para contagem geral ou por BU, usar `COUNT(DISTINCT sale_uid)`.
- Contagens por BU significam vendas associadas a BU e nao sao aditivas; nao somar ONE + LABS + SKIP + SUMMIT para reconstruir o total.
- A coorte canonica de reembolso e `dt_competencia` da venda original. `dt_cancelamento` informa quando ocorreu, nao define a coorte da taxa principal.
- D+30 e maturidade operacional. Todo reembolso registrado depois de D+30 deve atualizar retroativamente a coorte original.

### Segmentacao canonica de reembolso

Aplicar nesta ordem:

1. `grupo_produto = 'Adapta Gold B2B'` -> `B2B`.
2. `grupo_produto <> 'Adapta Gold'` -> `Outros produtos`.
3. `grupo_produto = 'Adapta Gold' AND is_renovacao = 1` -> `B2C renovacao`.
4. Nova venda (`is_renovacao = 0`) + `tipo_venda = 'Self-Service'` -> `B2C aquisicao`.
5. Nova venda (`is_renovacao = 0`) + `tipo_venda = 'Inside Sales'` -> `B2C comercial`.
6. Demais novas vendas Adapta Gold -> `B2C outros canais`.

Nao usar apenas o nome da oferta para segmentar. `is_renovacao` define a natureza da propria venda; nao confundir com `is_renovado`/`is_renovado_net`, que descrevem o resultado posterior.

---

## Regra B2C Atual

No gold, `grupo_produto` ja separa B2B (`'Adapta Gold B2B'`) do B2C (`'Adapta Gold'`) — nao precisa mais do `NOT LIKE '%b2b%'`.

Quando Kelvi pedir B2C Adapta Gold, usar como **B2C operacional/provavel**:

```sql
FROM gold__fact__vendas v
JOIN gold__dim__produto p
  ON  p.empresa = v.empresa AND p.plataforma = v.plataforma
  AND p.produto_biu = v.produto_biu AND p.product_name_guru = v.product_name_guru
  AND p.product_offer_name = v.product_offer_name
WHERE p.grupo_produto = 'Adapta Gold'   -- B2B e grupo proprio ('Adapta Gold B2B')
  AND v.tipo_venda = 'Self-Service'
```

Para cartao/Adyen, somar `v.payment_method = 'credit_card'` + join `gold__dim__adquirente` com `adquirente_canonico = 'adyen'`. Continuar declarando como regra operacional, nao flag nativa.

---

## Antes Da Query Principal

Fazer checks leves, dentro do whitelist:

1. **Schema/preview** — fazer na primeira query da sessao, quando usar coluna nunca usada antes, ou quando o resultado parecer estranho. Nao precisa repetir em toda query.
2. Rodar `MIN`/`MAX` das colunas de data usadas.
3. Listar valores distintos das categorias usadas em filtro ou agrupamento (ex: `status`, `tipo_venda`, `grupo_produto`, `plano`, `provider`).
4. Rodar contagem do filtro antes da analise principal.
5. Se houver join, comparar contagem antes/depois para detectar explosao ou perda silenciosa.
6. Decidir explicito se filtra `is_adapta = true` (team interno) ou inclui.

## Cobertura E Validacao Possivel Dentro Do Whitelist

Como o whitelist atual tem uma fonte por dominio, nem sempre existe segunda fonte para validacao cruzada (comparar a mesma metrica em 2 fontes independentes).

- Venda/produto: `gold__fact__vendas` (+ dims). Receita e reembolso financeiros: os dois fatos gerenciais Gold. Reconciliar quantidade e valores entre eles; isso e controle de consistencia, nao uma segunda fonte independente.
- Custo/uso IA, quando autorizado explicitamente: fonte unica permitida e `user_cost_ai_gateway`. **Sem validacao cruzada possivel.**
- Venda x uso IA: o que e possivel e medir **cobertura do join** entre as duas (quantos compradores aparecem em uso IA) — isso nao e validacao cruzada, e dimensionamento da coorte.

Nao buscar segunda fonte fora do whitelist. Declarar: "sem segunda fonte disponivel dentro do whitelist atual".

---

## Coverage Antes De Conclusao

Para analise de coorte, medir cobertura do join:

```sql
WITH coorte AS (...),   -- gold: 1 linha por contact_doc, email via gold__dim__cliente
uso AS (...)            -- user_cost_ai_gateway, por email
SELECT
  COUNT(DISTINCT c.contact_doc) AS total_coorte,
  COUNT(DISTINCT CASE WHEN u.email IS NOT NULL THEN c.contact_doc END) AS aparecem_na_tabela,
  ROUND(100.0 * COUNT(DISTINCT CASE WHEN u.email IS NOT NULL THEN c.contact_doc END)
        / NULLIF(COUNT(DISTINCT c.contact_doc), 0), 2) AS pct_cobertura
FROM coorte c
LEFT JOIN uso u
  ON lower(trim(c.contact_email)) = lower(trim(u.email));
```

Regua:

| Cobertura | Entrega |
|---|---|
| >= 99% | ponto unico ok |
| 95-99% | ponto unico com caveat |
| 85-95% | range ou caveat forte |
| 70-85% | fonte secundaria, nao conclusao central |
| < 70% | inadequado para coorte |

---

## Armadilhas Conhecidas

- `gold__fact__vendas` pode ter datas futuras. Filtrar `data_venda <= current_timestamp` quando analisar historico atual.
- Os fatos gerenciais estao no grao `sale_uid x bu`; join somente por `sale_uid` multiplica receita em vendas multi-BU.
- Para financeiro de reembolso, usar os fatos gerenciais. `dim_status.is_reembolso` continua valido para classificar a linha detalhada de venda, nao substitui `reembolso_gerencial.valor`.
- D+30 nao e fechamento definitivo. Coortes maduras mudam com chargeback, dispute e reembolso administrativo tardio.
- `snapshot_date` logico nao congela o warehouse. Auditoria entre duas consultas da fonte viva pode divergir; comparar a mesma extracao/snapshot quando precisar de igualdade exata.
- **Star schema = join obrigatorio.** Grupo de produto, status (reembolso), adquirente e email vivem nas dimensoes, nao no fato. Esquecer o join perde o filtro silenciosamente.
- `status` (comercial) ≠ `status_venda` (fiscal/NF). Reembolso canonico = `gold__dim__status.is_reembolso`, nao a string crua.
- Produto: filtrar por `gold__dim__produto.grupo_produto`, nao por string de oferta solta (SKUs picados: `(Pagar Me)`, `[BLACK NOVEMBER]`, `Licenca`...).
- Reembolso = `dim_status.is_reembolso = 1`; `dias_reembolso` so para tempo ate reembolso.
- `is_renovado`/`is_renovado_net` tem janela propria — nao e identica ao self-join D-90/D+30. Declarar qual usou.
- Cliente canonico = `contact_doc`. Para cruzar com IA, traduzir `contact_doc -> dim_cliente.contact_email`; sem CPF cai em `SEM_DOC` (nao agrupar por ela).
- Em B2B, email da venda pode ser pagador, nao usuario que consome IA.
- `user_cost_ai_gateway` tem linhas com `request_count = 0` e `total_cost = 0` — registro existir nao prova uso real.
- `is_adapta = true` (team interno) polui custo total se nao filtrado.
- `_ingested_at` e data de ingestao, nao do evento. **Nunca** usar para cohort/serie/janela. Uso -> `data_de_uso`; venda -> `data_venda`/`dt_competencia`.
- Ao cruzar venda x IA por email: `lower(trim(contact_email))` em join, dedupe, `GROUP BY` e `COUNT DISTINCT`.
- `INNER JOIN` remove silenciosamente sem match; usar `LEFT JOIN` para cobertura/coorte. As FKs das dims sao 0-orfao por construcao, mas o join venda x IA por email nao.
- Join 1:N pode duplicar receita; agregar por `contact_doc`/`sale_uid` antes de juntar.
- `AVG(col)` ignora `NULL`; decidir se `NULL` significa zero ou ausente.
- `CURRENT_DATE` pode estar em UTC; cuidado com recortes diarios.

---

## O Que Consegue Responder

- Custo IA por usuario, mes, produto, plano, status, modelo e provider.
- Reembolso total por Self-Service, Renovação, Inside Sales.
- Reembolso por produto e `grupo_produto`.
- Receita total e receita reembolsada.
- Taxa financeira de reembolso por coorte de compra, BU e segmento usando os fatos gerenciais Gold.
- Custo IA de quem reembolsou vs quem ficou.
- Custo IA depois do cancelamento, se houver uso pos-`data_cancelamento`.
- B2C operacional Adapta Gold (`grupo_produto = 'Adapta Gold'` + `Self-Service`).
- B2B explicito (`grupo_produto = 'Adapta Gold B2B'`).
- Renovacao bruta vs liquida (`is_renovado` / `is_renovado_net`) e por adquirente (Adyen).
- Aprovacao / recusa de cobranca via `gold__fact__transacoes`.

---

## O Que Fica Fora

- CAC real.
- Lucro liquido real.
- Suporte/Zendesk.
- Eventos de produto/Amplitude.
- Funil comportamental fora de uso/custo IA.
- B2C definitivo sem regra nativa.
- Qualquer tabela nao liberada.

## Conhecimento Cademi preservado — autorização a resolver

As listas antigas divergiam: Growth incluía estas três tabelas e a camada técnica, que tinha precedência, não as incluía. A consolidação não amplia a autorização. Antes de consultá-las, obter liberação pelo nome; uma liberação vigente e explícita do Kelvi já atende essa regra.

- `nekt_bronze.alunos_adapta_0_10_planilha1`: contagem de aulas 0–10.
- `nekt_bronze.alunos_adapta_10_1000_aulas_vistas`: contagem de aulas 10+ visualizadas.
- `nekt_bronze.alunos_adapta_10_1000_aulas_concluidas`: contagem de aulas 500+ concluídas.

Conhecimento herdado a verificar na primeira consulta: `email` e `total_aulas_*`; sem `lesson_id`, `lesson_title`, `module_name`, `product_name` ou `completed_at`. Responde quantas aulas, não quais aulas, sequência ou momento da conclusão.

## Disciplina complementar

- Toda dimensão precisa mapear para coluna validada de uma fonte autorizada. Planejamento sem consulta deve marcar campos incertos como "a validar na base".
- Parear janelas observacionais; separar antes, dia e depois do evento. Uso após reembolso não prova ativação anterior nem vazamento contratual.
- Para último/primeiro uso e dias ativos, filtrar `request_count > 0` antes de agregar. Em uso pré-reembolso com data sem hora, usar `<` estrito, não `<=` no dia do evento.
- Usar snapshot coerente em todos os blocos; alinhar cada N condicional ao filtro que o originou. Fonte viva não fica congelada por uma etiqueta de data.
- Diferenciar comprador, email e venda extra. `SEM_DOC` não identifica uma pessoa; não agrupar pessoas sem documento como um cliente único.
- Cobertura da fonte inteira difere da cobertura na janela operacional. Declarar ambas quando a fonte cobre mais tempo que a coorte.
- Decomposição de mix shift declara fórmula de dois ou três efeitos; soma dos efeitos precisa reconciliar com a variação total.
- Para mediana/percentis, reutilizar a definição exata e a mesma amostra entre rodadas. Detalhes e SQL em `armadilhas-metodologicas.md`.
