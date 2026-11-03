---
date: 2026-05-12
atualizado: 2026-06-26
tags:
  - moc
  - adapta
  - data-analytics
  - nekt
  - growth
related:
  - "[[300 Areas/Trabalho/Adapta/README]]"
  - "[[400 Recursos/Indices/growth-moc]]"
  - "[[nekt-escopo-vendas-custo-ia]]"
tipo: moc
status: ativo
---

# Data Analytics · Adapta

> Hub das análises de dados da Adapta. Fonte canônica única: **NEKT — star schema `nekt_gold`** + `nekt_silver.user_cost_ai_gateway`. Mantém só o mapa e a regra de escopo; o detalhe técnico fica nas notas-filha.

## Fonte Canônica (NEKT)

- [[nekt-escopo-vendas-custo-ia]] — **fonte de verdade**: tabelas gold (vendas, transações, 6 dims), campos canônicos, regras de leitura e equivalência com a `base_de_vendas` aposentada.
- Skills de referência: `/data-analytics` (camada técnica — whitelist, joins, cobertura), `/growth-data-expert` e `/metrics-analyst` (camada estratégica).

| Domínio | Fonte |
|---|---|
| Venda, receita, reembolso, renovação | `gold__fact__vendas` (+ dims) |
| Tentativa de cobrança / aprovação / recusa | `gold__fact__transacoes` |
| Produto, cliente, status, adquirente, data, tracking | `gold__dim__*` (6 dimensões) |
| Uso e custo de IA por usuário | `nekt_silver.user_cost_ai_gateway` |

## Definicoes operacionais atuais

- [[300 Areas/Trabalho/Adapta/Dash de acompanhamento/definicoes-renovacao-dash-v1]] — definicoes atuais do painel de renovacao.
- [[300 Areas/Trabalho/Adapta/Dash de acompanhamento/definicoes-reembolso-dash-principal]] — definicoes atuais do painel de reembolso.

Analises baseadas na `base_de_vendas` silver foram movidas para `900 Arquivo/Areas/Adapta/Data Analytics/`. Servem como snapshot historico, nunca como regra atual.

## Testes A/B

- [[teste-ab-reativacao-renovacao-adapta-gold]] — desenho do teste.
- [[100 Projetos/adapta-ab-reativacao-renovacao/contexto]] — dashboard do experimento.

## Fica Fora

- **Amplitude** — aposentado como produto/MCP. Não usar para eventos de produto, comportamento, refund ou billing. Se algum dado de comportamento for necessário, ele vive hoje em tabela **dentro da NEKT** (não no Amplitude direto) e exige liberação explícita — não está no whitelist `nekt_gold`.
- `nekt_silver.base_de_vendas` — aposentada (migração silver→gold, 2026-06). Mapa de equivalência em [[nekt-escopo-vendas-custo-ia]].
- Criativo/UTM/aquisição, aulas/suporte — fontes externas, fora do whitelist atual.

## Regra de Escopo

Só usar `nekt_gold` + `nekt_silver.user_cost_ai_gateway` (+ 3 tabelas Cademi para aulas). Qualquer outra tabela exige liberação explícita do Kelvi pelo nome — liberação é pontual por padrão.
