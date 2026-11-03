---
date: 2026-05-13
atualizado: 2026-06-25
tags:
  - adapta
  - data-analytics
  - nekt
  - vendas
  - reembolso
  - custo-ia
related:
  - "[[data-analytics]]"
  - "[[300 Areas/Trabalho/Adapta/Dash de acompanhamento/definicoes-renovacao-dash-v1]]"
  - "[[300 Areas/Trabalho/Adapta/Dash de acompanhamento/definicoes-reembolso-dash-principal]]"
tipo: referencia-operacional
status: ativo
---

# Nekt · Escopo de Vendas e Custo IA

> [!important] Fonte canônica migrada (2026-06-25)
> A `nekt_silver.base_de_vendas` está **APOSENTADA**. A fonte de vendas/reembolso/renovação agora é o **star schema gold** (`nekt_gold`): 2 fatos + 6 dimensões. Notas antigas que citam `base_de_vendas` são históricas — usar o mapa abaixo.

## Regra Operacional

Usar **apenas** estas fontes:

- **`nekt_gold`** — star schema (vendas, transações, produto, cliente, status, adquirente, data, trackings).
- **`nekt_silver.user_cost_ai_gateway`** — custo/uso de IA por usuário.
- **3 tabelas Cademi (bronze)** — aulas: `alunos_adapta_0_10_planilha1`, `alunos_adapta_10_1000_aulas_vistas`, `alunos_adapta_10_1000_aulas_concluidas`.

Não usar outras tabelas da Nekt até validação explícita.

## Mapa do Star Schema (`nekt_gold`)

| Tabela | Papel | Grão |
|---|---|---|
| `gold__fact__vendas` | faturamento — vendas efetivas | 1 linha por `sale_uid` |
| `gold__fact__transacoes` | tentativas de cobrança (tem `payment_refuse_reason`, `is_sale`) | 1 linha por `id` |
| `gold__dim__produto` | produto, grupo, flags de renovação | join por 5 chaves |
| `gold__dim__cliente` | pessoa, email, nome, endereço | `contact_doc` (PK) |
| `gold__dim__status` | classificação de status | `is_venda`, `is_reembolso` |
| `gold__dim__adquirente` | gateway/adquirente | `adquirente_canonico` |
| `gold__dim__data` | calendário | — |
| `gold__dim__trackings` | UTM/origem | `tracking_key` |

**Chaves de join:**
- Produto → `gold__dim__produto` por **5 colunas**: `empresa`, `plataforma`, `produto_biu`, `product_name_guru`, `product_offer_name`.
- Cliente → `gold__dim__cliente` por `contact_doc`.
- Adquirente → `gold__dim__adquirente` por `payment_marketplace_name`.
- Uso IA → `gold__dim__cliente.contact_email` ⇄ `user_cost_ai_gateway.email` com `lower(trim(email))`.

## Campos Canônicos (gold)

| Pergunta | Campo/tabela |
|---|---|
| Reembolsou? | `gold__dim__status.is_reembolso = 1` (ou `gold__fact__vendas.dias_reembolso IS NOT NULL`) |
| Venda efetiva? | `gold__dim__status.is_venda = 1` |
| Produto / grupo | `gold__dim__produto.product_offer_name` / `.grupo_produto` |
| Renovação (bruto) | `gold__fact__vendas.is_renovado` |
| Renovação (líquido, anti-reembolso) | `gold__fact__vendas.is_renovado_net` |
| É renovação vs 1ª compra | `gold__fact__vendas.is_renovacao` / `tipo_venda` |
| Produto é renovável? | `gold__dim__produto.is_renovavel` |
| Adquirente / gateway | `gold__dim__adquirente.adquirente_canonico` (`'adyen'` agrupa pagarme+pagarme2) |
| Método de pagamento | `gold__fact__vendas.payment_method` (`credit_card`/`pix`/`billet`) |
| Receita | `gold__fact__vendas.receita_gerencial` |
| Vencimento do ciclo | `gold__fact__vendas.data_encerramento` |
| Motivo de recusa de cobrança | `gold__fact__transacoes.payment_refuse_reason` |
| Cliente (PK) | `gold__dim__cliente.contact_doc` |
| Email do cliente | `gold__dim__cliente.contact_email` |
| Custo IA | `user_cost_ai_gateway.total_cost` |
| Requests IA | `user_cost_ai_gateway.request_count` (`> 0` = uso real) |

## Regras de Leitura

### Reembolso
- Flag canônica: `gold__dim__status.is_reembolso = 1`. Equivalente prático na fact: `dias_reembolso IS NOT NULL`.
- Sempre falar "reembolso/reembolsado" — nunca "refund/refundado".

### Venda efetiva
- `gold__dim__status.is_venda = 1`. A `gold__fact__vendas` é faturamento; `gold__fact__transacoes` é tentativa (inclui recusadas).

### B2C Adapta Gold
- Usar **igualdade exata**: `gold__dim__produto.grupo_produto = 'Adapta Gold'`.
- O B2B vive em grupo próprio (`'Adapta Gold B2B'`), então o `=` já o exclui — **não** usar `LIKE '%Gold%'` (pega B2B junto) nem `NOT LIKE '%b2b%'` (desnecessário).
- Para B2C operacional, somar `tipo_venda = 'Self-Service'`.

### Renovação
- Bruto: `is_renovado`. Líquido (desconta reembolso): `is_renovado_net`.
- A flag `is_renovado_net` tem janela própria do time de dados — para análise com janela controlada, fazer self-join por `contact_doc` na janela desejada.

### Uso/custo IA
- `request_count > 0` **antes** de qualquer agregado temporal (linhas com `request_count = 0` são heartbeat/telemetria).
- Excluir team interno: `is_adapta = false`.
- Data de evento: `data_de_uso` (nunca `_ingested_at`).

## Equivalência — `base_de_vendas` (antiga) → gold

| Antigo (`base_de_vendas`) | Atual (gold) |
|---|---|
| `base_de_vendas` | `gold__fact__vendas` (+ `gold__fact__transacoes` p/ tentativas) |
| `dias_reembolso IS NOT NULL` | `dim_status.is_reembolso = 1` |
| `produto` / `grupo_produto` | `gold__dim__produto` (join 5 chaves) |
| `email` | `gold__dim__cliente.contact_email` |
| `data_cancelamento` | `gold__fact__vendas.dt_cancelamento` |
| (sem adquirente confiável) | `gold__dim__adquirente.adquirente_canonico` |
| `NOT LIKE '%b2b%'` | `grupo_produto = 'Adapta Gold'` (exato) |

## Não Usar

- `nekt_silver.base_de_vendas` — aposentada.
- `LIKE '%Gold%'` para isolar B2C — pega o grupo B2B.
- `motivo_reembolso`/`payment_refund_reason` como flag principal de reembolso — usar `is_reembolso`.
- `_ingested_at` como data de evento.
- Amplitude para refund/billing.
- Outras tabelas Nekt sem validação.

## Caveat das tabelas Cademi (aulas)
Só têm `email` + `total_aulas_*`. Respondem "quantas aulas", **não** "quais aulas" nem ordem temporal (sem `lesson_id`, `lesson_title`, `completed_at`).
