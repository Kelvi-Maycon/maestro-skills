---
date: 2026-05-21
tags:
  - adapta
  - data-analytics
  - nekt
  - renovacao
  - reembolso
  - q1-2026
  - html-base
related:
  - "[[regras-canonicas-perguntas-renovacao]]"
  - "[[data-analytics]]"
  - "[[300 Areas/Trabalho/Adapta/README]]"
tipo: base-dados-html
status: final
snapshot_nekt: 2026-05-21 17:48:08 America/Sao_Paulo
gerado_em: 2026-05-21 18:21:15 America/Sao_Paulo
---

# Renovação Final — Q1 2026

> [!warning] Fonte migrada — star schema gold (2026-06-25)
> Esta nota usa `base_de_vendas` (silver, **aposentada**). Fonte canônica atual: **star schema gold** (`nekt_gold`). Os números são snapshot histórico — para novas análises, ver [[nekt-escopo-vendas-custo-ia]].

Base final para criar HTML/dashboard de renovação Q1 2026.

Relacionado: [[regras-canonicas-perguntas-renovacao]], [[data-analytics]], [[300 Areas/Trabalho/Adapta/README]].

## Veredito

- O problema central é **captura de renovação**, não só reembolso.
- Dos **17.355 elegíveis**, só **7.368 renovaram**: **42,45%**.
- **9.987 pessoas** elegíveis não tiveram venda `is_renovacao = 1` no Q1.
- Entre os renovados, **1.433 reembolsaram**: **19,45%**.
- A automática é o principal foco de qualidade: **23,17%** de reembolso por pessoa.
- A recuperação é muito mais limpa: **1,94%** de reembolso por pessoa.
- Março é o maior ponto de atenção: maior coorte, menor taxa e maior volume absoluto de não renovação.

## Regra Canônica Usada

| Item | Definição final |
|---|---|
| Fonte de vendas | `nekt_silver.base_de_vendas` |
| Fonte para excluir internos | `nekt_silver.user_cost_ai_gateway` |
| Unidade principal | Pessoa/email canônico: `lower(trim(email))` |
| Elegível | Pessoa com `data_encerramento` no Q1 2026 |
| Janela Q1 | `2026-01-01` até `2026-03-31` |
| Produto | `grupo_produto = 'Adapta Gold'` |
| Excluir B2B | `produto` ou `grupo_produto` contendo `b2b` |
| Excluir compra original reembolsada | `dias_reembolso IS NULL` na coorte elegível |
| Excluir interno | Email com `user_cost_ai_gateway.is_adapta = true` |
| Excluir email nulo | Sim |
| Renovou | Elegível com venda Q1 `is_renovacao = 1` |
| Renovação automática | `is_renovacao = 1` e `produto <> 'Adapta Gold [Especial - Renovação]'` |
| Renovação recuperação | `is_renovacao = 1` e `produto = 'Adapta Gold [Especial - Renovação]'` |
| Canal de pessoa | Primeira venda `is_renovacao = 1` no Q1 |
| Reembolso | `dias_reembolso IS NOT NULL` |
| Receita | `receita_gerencial` |

## Entra / Fica Fora

| Entra | Fica fora |
|---|---|
| Pessoas com vencimento em Q1 por `data_encerramento` | Cobranças Q1 de pessoas sem vencimento Q1 |
| Adapta Gold B2C operacional | B2B por string no produto/grupo |
| Compras originais não reembolsadas | Compras originais já reembolsadas |
| Renovação Q1 depois de montar coorte | `is_renovacao = 1` no filtro de elegibilidade |
| Métrica por pessoa/email canônico | Linha/venda como denominador do funil |
| Reembolso por `dias_reembolso IS NOT NULL` | `status` como flag primária de reembolso |

## KPIs De Topo

| KPI | Valor | Fórmula | Leitura |
|---|---:|---|---|
| Elegíveis | 17.355 | Pessoas com `data_encerramento` no Q1 | Tamanho da oportunidade |
| Renovaram | 7.368 | Elegíveis com venda `is_renovacao = 1` no Q1 | Captura real |
| Taxa renovação | 42,45% | 7.368 / 17.355 | Conversão do funil |
| Não renovaram | 9.987 | 17.355 - 7.368 | Vazamento principal |
| Reembolsaram | 1.433 | Renovados com `dias_reembolso IS NOT NULL` | Qualidade da cobrança |
| Taxa reembolso renovados | 19,45% | 1.433 / 7.368 | Reembolso por pessoa |
| Receita renovação | R$ 8.718.615 | Soma `receita_gerencial` dos renovados | Receita capturada |
| Receita reembolsada | R$ 1.692.117 | Soma reembolsada dos renovados | Receita devolvida |
| Receita líquida | R$ 7.026.498 | Receita renovação - reembolsada | Receita pós-reembolso |
| % receita reembolsada | 19,41% | 1.692.117 / 8.718.615 | Pressão de qualidade |

## Funil Principal

| Etapa | Pessoas | % dos elegíveis | % dos renovados |
|---|---:|---:|---:|
| Elegíveis | 17.355 | 100,00% | — |
| Renovaram automático | 6.078 | 35,02% | 82,49% |
| Renovaram recuperação | 1.290 | 7,43% | 17,51% |
| Renovaram total | 7.368 | 42,45% | 100,00% |
| Não renovaram | 9.987 | 57,55% | — |

Leitura:
- A maior barra do HTML deve ser "não renovaram": 9.987 pessoas.
- A recuperação não é funil separado. Ela é subtipo de "renovou".
- Se o HTML tiver um funil, a ordem correta é: `Elegíveis -> Renovaram total / Não renovaram -> Automática / Recuperação -> Reembolsaram`.

## Reembolso Dos Renovados

| Métrica | Valor |
|---|---:|
| Renovados pessoas | 7.368 |
| Reembolsaram pessoas | 1.433 |
| Taxa reembolso pessoa | 19,45% |
| Vendas renovação | 7.392 |
| Vendas reembolsadas | 1.433 |
| Taxa reembolso venda | 19,39% |
| Receita renovação | R$ 8.718.615 |
| Receita reembolsada | R$ 1.692.117 |
| Receita líquida | R$ 7.026.498 |
| % receita reembolsada | 19,41% |

Leitura:
- Reembolso é relevante, mas não explica a perda inteira.
- O primeiro bloco do HTML deve mostrar captura e reembolso juntos para não vender narrativa errada.

## Quebra Por Mês De Vencimento

| Mês vencimento | Elegíveis | Renov. automática | Renov. recuperação | Renov. total | Não renovaram | Taxa renovação | Reemb. renovados | Taxa reemb. renovados | Receita renovação | Receita reembolsada |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 2026-01 | 5.236 | 2.311 | 2 | 2.313 | 2.923 | 44,17% | 473 | 20,45% | R$ 2.722.404 | R$ 555.960 |
| 2026-02 | 4.594 | 1.478 | 586 | 2.064 | 2.530 | 44,93% | 413 | 20,01% | R$ 2.459.164 | R$ 490.782 |
| 2026-03 | 7.525 | 2.289 | 702 | 2.991 | 4.534 | 39,75% | 547 | 18,29% | R$ 3.537.047 | R$ 645.375 |
| Total | 17.355 | 6.078 | 1.290 | 7.368 | 9.987 | 42,45% | 1.433 | 19,45% | R$ 8.718.615 | R$ 1.692.117 |

Leitura para HTML:
- Gráfico principal por mês: barras de elegíveis, renovados e não renovados.
- Destaque visual em março: maior volume de não renovados e menor taxa.
- Março concentra **45,40%** dos não renovados e **43,36%** dos elegíveis.

## Automática Vs Recuperação

Classificação por pessoa: todas as vendas de renovação da pessoa são alocadas ao canal da primeira venda `is_renovacao = 1` no Q1.

| Canal | Pessoas | % elegíveis | % renovados | Vendas | Receita | Pessoas reemb. | Taxa reemb. pessoa | Receita reembolsada | Receita líquida |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Automática | 6.078 | 35,02% | 82,49% | 6.094 | R$ 7.176.591 | 1.408 | 23,17% | R$ 1.662.417 | R$ 5.514.174 |
| Recuperação | 1.290 | 7,43% | 17,51% | 1.298 | R$ 1.542.024 | 25 | 1,94% | R$ 29.700 | R$ 1.512.324 |
| Total | 7.368 | 42,45% | 100,00% | 7.392 | R$ 8.718.615 | 1.433 | 19,45% | R$ 1.692.117 | R$ 7.026.498 |

Leitura:
- Automática gera **98,24%** da receita reembolsada.
- Recuperação é **17,51%** dos renovados, mas só **1,76%** da receita reembolsada.
- Não escrever "recuperação é ruim". Pelo dado, ela é menor, mas mais limpa.

## Duplicidade Entre Canais

| Grupo | Pessoas |
|---|---:|
| Só automática | 6.072 |
| Só recuperação | 1.289 |
| Ambos auto + recuperação no Q1 | 7 |
| Não renovou | 9.987 |
| Total elegíveis | 17.355 |

Leitura:
- Existem 7 casos com automática e recuperação no mesmo Q1.
- Para funil por pessoa, usar primeira renovação.
- Para análise operacional por cobrança/SKU, pode contar venda por canal, mas deve rotular como venda/cobrança, não pessoa.

## Cobrança Q1 Vs Elegibilidade Q1

Essa tabela evita o erro clássico: misturar "quem venceu no Q1" com "quem foi cobrado no Q1".

| Grupo | Pessoas | Vendas | Receita | Vendas reemb. | Taxa reembolso venda | Receita reembolsada |
|---|---:|---:|---:|---:|---:|---:|
| Cobrança Q1 de elegível Q1 | 7.368 | 7.392 | R$ 8.718.615 | 1.433 | 19,39% | R$ 1.692.117 |
| Cobrança Q1 fora da elegibilidade Q1 | 2.452 | 2.462 | R$ 2.866.692 | 263 | 10,68% | R$ 304.230 |

Fato:
- R$ 2,87M de receita de renovação no Q1 **não pertence à coorte de vencimento Q1**.
- Essas vendas não entram no funil principal.

Hipótese:
- Podem ser antecipações ou recuperações tardias de outras coortes, mas isso exige outra quebra por `data_encerramento`.

## Validações

| Validação | Resultado | Severidade |
|---|---|---|
| Fonte dentro do whitelist | `base_de_vendas` + `user_cost_ai_gateway` | OK |
| `data_encerramento` preenchida | 335.103 / 335.103 | OK |
| `prazo` | Único valor = 12 | OK |
| `is_renovacao = 1` vs `tipo_venda = Renovação` | Match 100% em 9.858 vendas Q1 | OK |
| Status Q1 | approved 45.674; refunded 11.263; chargeback 709; dispute 72 | OK |
| `dias_reembolso` vs status | approved sem reembolso; refunded/chargeback/dispute com reembolso | OK |
| Internos excluídos | 2 emails | OK |
| Email nulo excluído | 1 linha | OK |
| Duplicidade por pessoa elegível | 5.091 pessoas com mais de 1 linha elegível | Caveat |
| Mais de 1 mês de vencimento Q1 | 5 pessoas | Baixo impacto |
| Mutabilidade de `data_encerramento` | 20,49% divergente vs `data_da_venda + prazo` | Alta |

## Fatos Vs Hipóteses

| Tipo | Afirmação | Status |
|---|---|---|
| Fato | Taxa de renovação Q1 = 42,45% | Confirmado |
| Fato | 9.987 elegíveis não renovaram no Q1 | Confirmado |
| Fato | Automática reembolsa 23,17%; recuperação 1,94% | Confirmado |
| Fato | Março tem maior coorte e pior taxa | Confirmado |
| Fato | 2.462 cobranças Q1 ficam fora da elegibilidade Q1 | Confirmado |
| Hipótese | Régua de recuperação só ativou em fevereiro | Precisa validação operacional |
| Hipótese | Reembolso alto da automática vem de cobrança inesperada | Precisa cruzar status + tempo até reembolso |
| Hipótese | Março piora por mix da coorte de origem | Precisa quebrar por venda original/SKU/campanha |
| Hipótese | Escalar recuperação capturaria parte proporcional dos não renovados | Precisa comparar perfil de quem não renovou |

## Caveats Para Aparecer No HTML

| Caveat | Como escrever no HTML |
|---|---|
| `data_encerramento` tem mutabilidade estrutural | "Usamos `data_encerramento` por regra canônica, mas 20,49% divergem de `data_da_venda + prazo`." |
| Q1 não está todo maduro em D+90 | "D+90 é diagnóstico secundário; o funil principal usa janela Q1 fixa." |
| Cobrança Q1 não é elegibilidade Q1 | "R$ 2,87M em cobranças Q1 estão fora da coorte de vencimento Q1." |
| Pessoa vs venda | "Funil por pessoa; receita/reembolso por vendas das pessoas renovadas." |
| Recuperação não é perda | "Recuperação conta como renovação, separada da automática." |

## Sugestão De Estrutura Para O HTML

| Bloco | Objetivo | Visual recomendado |
|---|---|---|
| Hero/KPIs | Bater o olho e entender o tamanho do problema | 5 cards: elegíveis, renovaram, não renovaram, reembolso, receita líquida |
| Funil | Mostrar captura vs perda | Funil horizontal ou stacked bar |
| Mês de vencimento | Evidenciar março | Barras por mês + linha de taxa |
| Automática vs recuperação | Mostrar diferença de qualidade | Comparação lado a lado |
| Cobrança vs elegibilidade | Evitar confusão conceitual | Tabela curta / callout |
| Fatos vs hipóteses | Separar dado de interpretação | Duas colunas |
| Caveats | Proteger decisão | Lista compacta no rodapé |

## Dados Para HTML

```json
{
  "meta": {
    "titulo": "Renovação Adapta Gold Q1 2026",
    "snapshot_nekt": "2026-05-21 17:48:08 America/Sao_Paulo",
    "unidade": "pessoa_email_canonico",
    "email_canonico": "lower(trim(email))",
    "receita": "receita_gerencial",
    "fonte_vendas": "nekt_silver.base_de_vendas",
    "fonte_internos": "nekt_silver.user_cost_ai_gateway",
    "janela": {
      "inicio": "2026-01-01",
      "fim_exclusivo": "2026-04-01"
    }
  },
  "kpis": {
    "elegiveis": 17355,
    "renovaram_total": 7368,
    "nao_renovaram": 9987,
    "taxa_renovacao_pct": 42.45,
    "reembolsaram_renovados": 1433,
    "taxa_reembolso_renovados_pct": 19.45,
    "vendas_renovacao": 7392,
    "vendas_reembolsadas": 1433,
    "receita_renovacao": 8718615,
    "receita_reembolsada": 1692117,
    "receita_liquida": 7026498,
    "pct_receita_reembolsada": 19.41,
    "ticket_medio_por_pessoa_renovada": 1183.31,
    "dinheiro_na_mesa_estimado_nivel_3": 11817699.24
  },
  "funil": [
    {"etapa": "Elegíveis", "pessoas": 17355, "pct_elegiveis": 100.00},
    {"etapa": "Renovaram automático", "pessoas": 6078, "pct_elegiveis": 35.02, "pct_renovados": 82.49},
    {"etapa": "Renovaram recuperação", "pessoas": 1290, "pct_elegiveis": 7.43, "pct_renovados": 17.51},
    {"etapa": "Renovaram total", "pessoas": 7368, "pct_elegiveis": 42.45, "pct_renovados": 100.00},
    {"etapa": "Não renovaram", "pessoas": 9987, "pct_elegiveis": 57.55}
  ],
  "meses": [
    {
      "mes": "2026-01",
      "elegiveis": 5236,
      "renovaram_automatico": 2311,
      "renovaram_recuperacao": 2,
      "renovaram_total": 2313,
      "nao_renovaram": 2923,
      "taxa_renovacao_pct": 44.17,
      "reembolsaram_renovados": 473,
      "taxa_reembolso_renovados_pct": 20.45,
      "receita_renovacao": 2722404,
      "receita_reembolsada": 555960
    },
    {
      "mes": "2026-02",
      "elegiveis": 4594,
      "renovaram_automatico": 1478,
      "renovaram_recuperacao": 586,
      "renovaram_total": 2064,
      "nao_renovaram": 2530,
      "taxa_renovacao_pct": 44.93,
      "reembolsaram_renovados": 413,
      "taxa_reembolso_renovados_pct": 20.01,
      "receita_renovacao": 2459164,
      "receita_reembolsada": 490782
    },
    {
      "mes": "2026-03",
      "elegiveis": 7525,
      "renovaram_automatico": 2289,
      "renovaram_recuperacao": 702,
      "renovaram_total": 2991,
      "nao_renovaram": 4534,
      "taxa_renovacao_pct": 39.75,
      "reembolsaram_renovados": 547,
      "taxa_reembolso_renovados_pct": 18.29,
      "receita_renovacao": 3537047,
      "receita_reembolsada": 645375
    }
  ],
  "canais": [
    {
      "canal": "Automática",
      "pessoas": 6078,
      "pct_elegiveis": 35.02,
      "pct_renovados": 82.49,
      "vendas": 6094,
      "receita": 7176591,
      "pessoas_reembolsaram": 1408,
      "taxa_reembolso_pessoa_pct": 23.17,
      "receita_reembolsada": 1662417,
      "receita_liquida": 5514174
    },
    {
      "canal": "Recuperação",
      "pessoas": 1290,
      "pct_elegiveis": 7.43,
      "pct_renovados": 17.51,
      "vendas": 1298,
      "receita": 1542024,
      "pessoas_reembolsaram": 25,
      "taxa_reembolso_pessoa_pct": 1.94,
      "receita_reembolsada": 29700,
      "receita_liquida": 1512324
    }
  ],
  "duplicidade_canais": [
    {"grupo": "Só automática", "pessoas": 6072},
    {"grupo": "Só recuperação", "pessoas": 1289},
    {"grupo": "Ambos auto + recuperação no Q1", "pessoas": 7},
    {"grupo": "Não renovou", "pessoas": 9987}
  ],
  "cobranca_q1_vs_elegibilidade_q1": [
    {
      "grupo": "Cobrança Q1 de elegível Q1",
      "pessoas": 7368,
      "vendas": 7392,
      "receita": 8718615,
      "vendas_reembolsadas": 1433,
      "taxa_reembolso_venda_pct": 19.39,
      "receita_reembolsada": 1692117
    },
    {
      "grupo": "Cobrança Q1 fora da elegibilidade Q1",
      "pessoas": 2452,
      "vendas": 2462,
      "receita": 2866692,
      "vendas_reembolsadas": 263,
      "taxa_reembolso_venda_pct": 10.68,
      "receita_reembolsada": 304230
    }
  ],
  "validacoes": {
    "data_encerramento_preenchido_pct": 100.00,
    "data_encerramento_linhas_preenchidas": 335103,
    "data_encerramento_linhas_total": 335103,
    "prazo_unico": 12,
    "mutabilidade_divergentes": 19533,
    "mutabilidade_total_testado": 95307,
    "mutabilidade_pct": 20.49,
    "emails_internos_excluidos": 2,
    "linhas_email_null_excluidas": 1,
    "pessoas_mais_de_uma_linha_elegivel": 5091,
    "pessoas_mais_de_um_mes_vencimento": 5
  }
}
```

## Fontes E Arquivos De Apoio

| Arquivo | Uso |
|---|---|
| [[regras-canonicas-perguntas-renovacao]] | Regra metodológica |
| (rascunho de validação, não incluído) | Query auditável e primeira consolidação |
| (cross-check, não incluído) | Cross-check corrigido |

## Decisão Para O HTML

- Usar este arquivo como fonte única.
- Não puxar dados da primeira versão do Claude.
- Não misturar cobrança Q1 com elegibilidade Q1 no funil principal.
- Mostrar hipóteses como hipóteses, nunca como causa confirmada.
