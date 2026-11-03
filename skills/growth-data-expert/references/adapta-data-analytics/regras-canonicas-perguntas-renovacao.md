---
date: 2026-05-20
tags: [adapta, data-analytics, nekt, renovacao, reembolso]
related: ["[[renovacao-final]]"]
status: draft
---

# Regras Canonicas — Renovacao, Dados E Reembolso

> [!warning] Fonte migrada — star schema gold (2026-06-25)
> As regras de coorte/janela seguem válidas; só a **fonte mudou**: `base_de_vendas` (aposentada) → **star schema gold** (`nekt_gold`). Equivalências de campo em [[nekt-escopo-vendas-custo-ia]].
> As queries V1–V4 abaixo ainda citam `base_de_vendas` (registro histórico da validação) — para análise nova, traduzir para o star schema gold via [[nekt-escopo-vendas-custo-ia]].

Documento-base para analisar renovacao Adapta Gold sem misturar funil de elegibilidade, cobranca feita e reembolso.

## Ideia Central

A pergunta principal e simples:

> Das pessoas que tinham renovacao prevista no Q1 2026, quantas renovaram de verdade? Dessas renovacoes, quantas reembolsaram?

Funil canonico obrigatorio:

| Etapa | Pergunta | Denominador correto | Numerador correto | Mede |
|---|---|---:|---:|---|
| 1. Elegibilidade | Quem deveria renovar? | Pessoas com `data_encerramento` no periodo | N/A | Tamanho da oportunidade |
| 2. Conversao | Dos elegiveis, quem renovou? | Pessoas elegiveis | Elegiveis com venda `is_renovacao = 1` | Captura da base |
| 3. Tipo de renovacao | Quem renovou automatico vs recuperacao? | Elegiveis renovados | SKU/tipo da venda `is_renovacao = 1` | Canal de captura |
| 4. Reembolso | Dos renovados, quem reembolsou? | Vendas/compradores renovados | Renovacoes com `dias_reembolso IS NOT NULL` | Qualidade da renovacao |

Regra critica: **`is_renovacao = 1` nunca entra para definir quem era elegivel.** Ele entra somente depois, para identificar quem realmente renovou.

Separar sempre dois angulos:

| Angulo | Denominador correto | Uso |
|---|---:|---|
| Conversao de renovacao | Pessoas com `data_encerramento` no periodo | Saber quantos deveriam renovar e quantos renovaram |
| Qualidade da cobranca | Vendas/cobrancas `is_renovacao = 1` | Saber refund/chargeback/dispute de quem foi cobrado |

Regra critica: nao misturar quem **deveria renovar** com quem **foi cobrado**.

---

## Definicoes Canonicas

| # | Definicao | Decisao canonica |
|---|---|---|
| T1 | Unidade de analise principal | Pessoa/comprador por email canonico `lower(trim(email))` |
| T2 | Janela de elegibilidade | Q1 2026: `data_encerramento >= DATE '2026-01-01'` e `< DATE '2026-04-01'` |
| T3 | Elegivel para renovar | Cliente Adapta Gold com assinatura/vigencia encerrando no periodo analisado |
| T4 | Fonte de vencimento | Usar `data_encerramento`; nao usar `data_fim_da_garantia` |
| T5 | Produto | `grupo_produto = 'Adapta Gold'` |
| T6 | B2B | Excluir operacionalmente por nome: `produto` ou `grupo_produto` contendo `b2b` |
| T7 | Compra original valida | Excluir compra original reembolsada: `dias_reembolso IS NULL` |
| T8 | Renovacao | Venda/cobranca com `is_renovacao = 1`; usada para identificar quem renovou, nao para definir elegibilidade |
| T9 | Recuperacao de renovacao | `Adapta Gold [Especial - Renovação]` e renovacao por recuperacao; entra como renovacao, mas deve ser separado de renovacao automatica |
| T10 | REC Full Especial | `[Adapta Gold] [REC] [Full] - Especial - Assinatura` nao e renovacao se `is_renovacao = 0`; fica fora da coorte de renovacao |
| T11 | Conversao de renovacao | Elegiveis que tiveram pelo menos uma venda `is_renovacao = 1` / elegiveis |
| T12 | Renovacao automatica | Elegivel com venda `is_renovacao = 1` em SKU diferente de `Adapta Gold [Especial - Renovação]` |
| T13 | Renovacao por recuperacao | Elegivel que renovou via SKU `Adapta Gold [Especial - Renovação]`; deve ser contado como renovou e reportado separado |
| T14 | Nao renovados | Elegiveis sem nenhuma venda `is_renovacao = 1` na janela analisada |
| T15 | Reembolso | `dias_reembolso IS NOT NULL` |
| T16 | Receita | `receita_gerencial` |
| T17 | Comprador canonico | `lower(trim(email))` |
| T18 | Team interno | Excluir emails com `is_adapta = true` via `user_cost_ai_gateway` |
| T19 | Fonte permitida padrao | `nekt_silver.base_de_vendas` e `nekt_silver.user_cost_ai_gateway` |
| T20 | Timezone | `data_da_venda` em UTC-3 nativo; usar filtro literal sem conversao |
| T21 | Corte obrigatorio principal | Separar no minimo: elegiveis, renovaram automatico, renovaram por recuperacao, nao renovaram, reembolsaram entre renovados |
| T22 | Uso IA | `request_count > 0`; heartbeat/request zero nao conta como uso |
| T23 | Sem match IA | Nao significa "nao usou"; significa ausencia na fonte `user_cost_ai_gateway` |
| T24 | Dinheiro na mesa | Estimativa, nao fato contabil; usar hierarquia de ticket esperado definida neste documento |
| T25 | Janela de conversao operacional | Janela para procurar venda `is_renovacao = 1` do elegivel. Default inicial: Q1 2026; se usar D-90/D+30/D+90, declarar como diagnostico secundario |
| T26 | Antecipacao normal | Renovacao de D-90 a D-1 antes de `data_encerramento` |
| T27 | Renovacao anomala antecipada | Renovacao antes de D-90; reportar separado e nao contar na conversao principal |
| T28 | Recuperacao tardia | Renovacao D+31 a D+90; reportar separado e nao contar na conversao principal |
| T29 | Perda madura | Sem renovacao ate D+90; so usar quando a coorte tiver maturidade D+90 |
| T30 | Receita do periodo | Receita Q1 e apenas venda/cobranca com `data_da_venda` dentro do Q1, mesmo que a conversao operacional aceite D+30 fora do Q1 |
| T31 | Snapshot NEKT | Toda analise final deve registrar data/hora do snapshot NEKT em UTC-3 |
| T32 | Mediana | Mediana exata com `ROW_NUMBER + AVG`; nao usar `approx_percentile` |
| T33 | Mutabilidade de vencimento | Validar se `data_encerramento` e consistente com `date_add('month', prazo, data_da_venda)` antes de tratar como vencimento original |
| T34 | Unidade de resposta principal | Sempre reportar por pessoa/email canonico; vendas/linhas entram como detalhe operacional |
| T35 | Precedencia de canal | Se um elegivel tiver renovacao automatica e recuperacao, classificar pela primeira venda `is_renovacao = 1` da janela; reportar duplicidade separada |
| T36 | Taxa de reembolso dos renovados | Reembolsos das vendas `is_renovacao = 1` dos elegiveis renovados / vendas ou compradores renovados |
| T37 | Recuperacao nao automatica | A recuperacao de pessoas que nao renovaram automaticamente deve aparecer como subtipo de "renovou", nao como funil separado |

---

## Validacoes Bloqueadoras Antes Da Analise

Rodar antes de qualquer resposta final.

| # | Validacao | Regra de decisao |
|---|---|---|
| V1 | Preenchimento de `data_encerramento` | Se cobertura < 95%, parar e declarar fallback |
| V2 | Mutabilidade de `data_encerramento` | Comparar com `date_add('month', prazo, data_da_venda)`; se divergencia > 5%, declarar caveat estrutural |
| V3 | Enum de `prazo` | Listar prazos reais antes de interpretar ciclo |
| V4 | `is_renovacao` vs `tipo_venda` | Validar se `is_renovacao = 1` bate com `tipo_venda = 'Renovação'` |
| V5 | Status de reembolso | Validar valores reais de `status` para reembolso |
| V6 | Maturidade D+30 e D+90 | Separar coortes maduras de parciais |
| V7 | Cobertura IA | Reportar cobertura fonte inteira e cobertura na janela operacional |
| V8 | Heartbeat IA | Garantir `request_count > 0` antes de qualquer agregado temporal |

### Queries De Validacao

#### V1 — preenchimento de `data_encerramento`

```sql
SELECT
  COUNT(*) AS total,
  COUNT(data_encerramento) AS preenchidos,
  COUNT(*) - COUNT(data_encerramento) AS nulls,
  ROUND(100.0 * COUNT(data_encerramento) / COUNT(*), 2) AS pct_preenchido,
  MIN(data_encerramento) AS min_data_encerramento,
  MAX(data_encerramento) AS max_data_encerramento
FROM "nekt_silver"."base_de_vendas"
WHERE grupo_produto = 'Adapta Gold'
  AND data_da_venda >= TIMESTAMP '2024-01-01 00:00:00';
```

#### V2 — mutabilidade de `data_encerramento`

```sql
SELECT
  COUNT(*) AS total,
  SUM(
    CASE
      WHEN CAST(data_encerramento AS date) = date_add('month', CAST(prazo AS integer), CAST(data_da_venda AS date))
      THEN 1 ELSE 0
    END
  ) AS consistentes,
  SUM(
    CASE
      WHEN CAST(data_encerramento AS date) <> date_add('month', CAST(prazo AS integer), CAST(data_da_venda AS date))
      THEN 1 ELSE 0
    END
  ) AS divergentes,
  ROUND(
    100.0 * SUM(
      CASE
        WHEN CAST(data_encerramento AS date) <> date_add('month', CAST(prazo AS integer), CAST(data_da_venda AS date))
        THEN 1 ELSE 0
      END
    ) / COUNT(*),
    2
  ) AS pct_divergente
FROM "nekt_silver"."base_de_vendas"
WHERE grupo_produto = 'Adapta Gold'
  AND data_da_venda >= TIMESTAMP '2024-06-01 00:00:00'
  AND data_da_venda < TIMESTAMP '2025-06-01 00:00:00'
  AND prazo IS NOT NULL
  AND data_encerramento IS NOT NULL;
```

#### V3 — enum de `prazo`

```sql
SELECT prazo, COUNT(*) AS vendas
FROM "nekt_silver"."base_de_vendas"
WHERE grupo_produto = 'Adapta Gold'
  AND data_da_venda >= TIMESTAMP '2024-01-01 00:00:00'
GROUP BY 1
ORDER BY vendas DESC;
```

#### V4 — `is_renovacao` vs `tipo_venda`

```sql
SELECT is_renovacao, tipo_venda, COUNT(*) AS vendas
FROM "nekt_silver"."base_de_vendas"
WHERE grupo_produto = 'Adapta Gold'
  AND data_da_venda >= TIMESTAMP '2026-01-01 00:00:00'
  AND data_da_venda < TIMESTAMP '2026-04-01 00:00:00'
GROUP BY 1, 2
ORDER BY vendas DESC;
```

## Regras SQL Base

### Elegiveis

```sql
data_encerramento >= DATE '2026-01-01'
AND data_encerramento < DATE '2026-04-01'
AND grupo_produto = 'Adapta Gold'
AND dias_reembolso IS NULL
AND lower(coalesce(produto, '')) NOT LIKE '%b2b%'
AND lower(coalesce(grupo_produto, '')) NOT LIKE '%b2b%'
```

Observacao obrigatoria: nao adicionar `is_renovacao = 1` neste filtro. Elegivel e quem tinha vencimento no periodo, nao quem ja renovou.

### Renovacoes do elegivel

Depois de montar a coorte de elegiveis por `lower(trim(email))`, procurar vendas da mesma pessoa com:

```sql
grupo_produto = 'Adapta Gold'
AND is_renovacao = 1
AND lower(coalesce(produto, '')) NOT LIKE '%b2b%'
AND lower(coalesce(grupo_produto, '')) NOT LIKE '%b2b%'
```

Classificacao do canal:

| Canal | Regra | Conta como renovou? |
|---|---|---|
| Renovacao automatica | `is_renovacao = 1` e `produto <> 'Adapta Gold [Especial - Renovação]'` | Sim |
| Recuperacao de renovacao | `is_renovacao = 1` e `produto = 'Adapta Gold [Especial - Renovação]'` | Sim |
| Nao renovou | Sem venda `is_renovacao = 1` na janela definida | Nao |

### Cobrancas de renovacao no periodo

```sql
data_da_venda >= TIMESTAMP '2026-01-01 00:00:00'
AND data_da_venda < TIMESTAMP '2026-04-01 00:00:00'
AND grupo_produto = 'Adapta Gold'
AND is_renovacao = 1
AND lower(coalesce(produto, '')) NOT LIKE '%b2b%'
AND lower(coalesce(grupo_produto, '')) NOT LIKE '%b2b%'
```

### Join comprador

```sql
lower(trim(email))
```

### Janelas relativas ao vencimento

Estas janelas sao diagnostico secundario. Elas nao substituem o funil principal: `vencia no Q1 -> renovou automatico / renovou recuperacao / nao renovou -> reembolsou`.

| Grupo | Janela vs `data_encerramento` | Entra na conversao principal? | Leitura |
|---|---:|---|---|
| Antecipacao normal | D-90 a D-1 | Sim | Renovou antes, mas no mesmo ciclo |
| Renovou no vencimento | D0 | Sim | Captura direta |
| Recuperacao dentro da janela | D+1 a D+30 | Sim | Atrasou, mas recuperou dentro da janela operacional |
| Recuperacao fora da janela | D+31 a D+90 | Nao | Recuperou tarde; reportar separado |
| Renovacao anomala antecipada | Antes de D-90 | Nao | Pode ser upgrade, recompra ou excecao |
| Perda madura | Sem renovacao ate D+90 | Sim, como perda | Usar apenas quando D+90 estiver maduro |

### Maturidade

| Janela | Como usar |
|---|---|
| D+30 | Metrica principal quando todo o periodo analisado estiver maduro |
| D+90 | Usar so para meses/coortes com D+90 completo; se parcial, reportar como visao parcial |

Em 2026-05-20, Q1 2026 ainda nao esta todo maduro em D+90. Marco/26 nao pode ser classificado como perda real D+90.

### Dinheiro na mesa

`dinheiro_na_mesa` e estimativa. Usar a hierarquia abaixo e declarar o nivel usado.

| Nivel | Formula | Quando usar |
|---|---|---|
| 1 | Nao renovados x ticket medio dos renovados do mesmo mes de vencimento e mesmo SKU original | Volume suficiente por mes + SKU |
| 2 | Nao renovados x ticket medio dos renovados do mesmo mes de vencimento | SKU com baixo volume |
| 3 | Nao renovados x ticket medio global dos renovados elegiveis | Fallback quando mes tem pouco volume |
| 4 | Nao renovados x preco padrao comercial informado | So se os dados forem ruins ou incompletos |

Nunca apresentar dinheiro na mesa como receita perdida contabil. E oportunidade estimada.

---

## Perguntas Que Devem Ser Respondidas

### B1 — Elegibilidade

| Pergunta | Tabela esperada | Leitura esperada |
|---|---|---|
| Quantas pessoas tinham vencimento no Q1? | Total e por mes de `data_encerramento` | Tamanho real da oportunidade |
| Quantas eram renovaveis de fato? | Elegiveis validos apos excluir B2B, interno e compra original reembolsada | Base limpa para decisao |

### B2 — Conversao De Renovacao

| Pergunta | Tabela esperada | Leitura esperada |
|---|---|---|
| Dos elegiveis, quantos renovaram? | Elegiveis, renovaram automatico, renovaram por recuperacao, nao renovaram, taxa | Captura da base |
| Dos elegiveis que renovaram, quantos reembolsaram? | Renovados, reembolsos, taxa por comprador, taxa por venda, receita reembolsada | Qualidade da renovacao entre quem de fato renovou |
| Dos elegiveis, quanto dinheiro foi capturado? | Receita das vendas `is_renovacao = 1`, separando automatico vs recuperacao | Receita capturada |
| Dos elegiveis que nao renovaram, quanto ficou na mesa? | Nao renovados x ticket esperado | Oportunidade estimada |
| Diagnostico secundario: quando renovaram em relacao ao vencimento? | Antecipacao, D0, D+1-D+30, D+31-D+90 | Timing da renovacao, nao definicao do funil principal |

### B3 — Elegivel Vs Fora Da Elegibilidade

| Pergunta | Tabela esperada | Leitura esperada |
|---|---|---|
| Quem renovou no periodo era elegivel mesmo? | Elegivel renovou automatico / elegivel renovou recuperacao / renovou mas nao era elegivel | Separa captura do Q1 de ruido fora da coorte |
| Quanto da receita de renovacao veio de fora da janela de vencimento? | Pessoas, vendas, receita, reembolso por grupo | Separa receita normal de excecoes |

### B4 — Qualidade Da Cobranca

| Pergunta | Tabela esperada | Leitura esperada |
|---|---|---|
| Dos cobrados, quanto reembolsou? | Cobrancas, compradores, receita, reembolsos, taxa, receita reembolsada | Saude da cobranca |
| O reembolso e refund, chargeback ou dispute? | Status, reembolsos, receita, percentual | Distingue arrependimento de contestacao |
| A taxa muda por mes de cobranca? | Jan/Fev/Mar com receita e taxa | Detecta piora operacional |

### B5 — Produto / SKU

| Pergunta | Tabela esperada | Leitura esperada |
|---|---|---|
| Quais SKUs concentram receita e reembolso? | Todos os SKUs com pessoas, vendas, receita, reembolsos, taxa, perda | Onde atacar |
| Especial Renovacao e melhor que automatica? | Automatica vs Especial com receita liquida e refund | Benchmark ou excecao |
| REC Full Especial entra? | Tabela caveat com `tipo_venda` e `is_renovacao` | Evita falso positivo |

### B6 — Tempo Ate Reembolso

| Pergunta | Tabela esperada | Leitura esperada |
|---|---|---|
| Em quanto tempo a renovacao e reembolsada? | D0, D1-D3, D4-D7, D8-D15, D16-D30, D30+ | Cobranca inesperada vs insatisfacao tardia |
| Quais grupos reembolsam mais cedo? | Por tipo de renovacao e SKU | Prioriza diagnostico |

### B7 — Uso IA / Comportamento

| Pergunta | Tabela esperada | Leitura esperada |
|---|---|---|
| Elegiveis que renovam usavam IA antes do vencimento? | Buckets D-30 a D-1 | Predicao de renovacao |
| Elegiveis que nao renovam tinham match/uso IA? | Sem match, 0 request, buckets de uso | Separa dormencia de falha de identidade |
| Quem reembolsa usou depois da cobranca? | Reembolsados vs nao reembolsados D0-D7 | Cobranca contestada vs produto ruim |
| Existe uso depois do reembolso? | Sem uso pos / uso com outra venda ativa / vazamento provavel | Auditoria operacional |

---

## Tabelas Obrigatorias

### 1. Funil Principal Simplificado

Esta e a primeira tabela obrigatoria. As demais detalham essa leitura.

| Mes vencimento | Elegiveis (pessoas) | Renovaram automatico | Renovaram recuperacao | Renovaram total | Taxa renovacao | Nao renovaram | Reembolsaram entre renovados | Taxa reembolso renovados | Receita renovacao | Receita reembolsada |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|

Regras:
- `Elegiveis` = pessoas com `data_encerramento` no periodo.
- `Renovaram automatico` = elegiveis com venda `is_renovacao = 1` em SKU diferente de `Adapta Gold [Especial - Renovação]`.
- `Renovaram recuperacao` = elegiveis com venda `is_renovacao = 1` no SKU `Adapta Gold [Especial - Renovação]`.
- `Renovaram total` = automatico + recuperacao, deduplicado por email canonico.
- `Reembolsaram entre renovados` = renovacoes desses elegiveis com `dias_reembolso IS NOT NULL`.

### 2. Funil De Elegibilidade Detalhado

| Mes vencimento | Elegiveis | Anteciparam D-90-D-1 | Renovaram D0 | Recuperaram D+1-D+30 | Conversao operacional | Recuperaram D+31-D+90 | Nao renovaram maduros | Receita capturada | Receita estimada na mesa |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|

Observacao: esta tabela e diagnostico de timing. Nao substituir a tabela "Funil Principal Simplificado".

### 3. Qualidade Da Cobranca

| Mes cobranca | Cobrancas renovacao | Compradores cobrados | Receita cobrada | Reembolsos | Taxa reembolso | Receita reembolsada | Receita liquida |
|---|---:|---:|---:|---:|---:|---:|---:|

### 4. Elegivel Vs Fora Da Elegibilidade

| Grupo | Pessoas | Vendas | Receita | Reembolsos | Taxa reembolso | Receita reembolsada | Leitura |
|---|---:|---:|---:|---:|---:|---:|---|
| Elegivel e renovou automatico |  |  |  |  |  |  | Captura normal |
| Elegivel e renovou por recuperacao |  |  |  |  |  |  | Recuperacao de quem nao ficou no automatico |
| Elegivel e nao renovou |  |  |  |  |  |  | Oportunidade perdida |
| Renovou no periodo mas nao era elegivel |  |  |  |  |  |  | Receita fora da coorte de vencimento Q1 |

### 5. Automatica Vs Recuperacao Renovacao

| Tipo renovacao | Pessoas | Vendas | Receita | Reembolsos | Taxa reembolso | Receita reembolsada | Receita liquida | Leitura |
|---|---:|---:|---:|---:|---:|---:|---:|---|

### 6. SKU

| SKU | Tipo | Pessoas | Vendas | Receita | Reembolsos | Taxa reembolso | Receita reembolsada | % da perda | Receita liquida |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|

### 7. Status Do Reembolso

| Status | Reembolsos | % dos reembolsos | Receita reembolsada | % da receita reemb. | Leitura |
|---|---:|---:|---:|---:|---|

### 8. Tempo Ate Reembolso

| Bucket | Reembolsos | % dos reembolsos | Receita reembolsada | % da receita | Leitura |
|---|---:|---:|---:|---:|---|
| D0 |  |  |  |  | Imediato |
| D1-D3 |  |  |  |  | Muito cedo |
| D4-D7 |  |  |  |  | Reacao ainda ligada a cobranca |
| D8-D15 |  |  |  |  | Testou pouco |
| D16-D30 |  |  |  |  | Dentro da garantia |
| D30+ |  |  |  |  | Anomalia ou atraso operacional |

### 9. Uso IA Antes Do Vencimento

| Bucket uso D-30 a D-1 | Elegiveis | % elegiveis | Renovaram | Taxa renovacao | Nao renovaram | Sem match IA | Receita capturada | Leitura |
|---|---:|---:|---:|---:|---:|---:|---:|---|

Buckets:
- Sem match IA
- 0 request com match
- 1-10
- 11-30
- 31-100
- 101-300
- 301-1000
- 1000+

### 10. Uso IA Depois Da Cobranca

| Grupo | Cobrados | Usaram D0-D7 | % usaram | Requests | Custo IA | Reembolsos | Taxa reembolso | Leitura |
|---|---:|---:|---:|---:|---:|---:|---:|---|

### 11. Pos-Reembolso / Vazamento

| Perfil | Reembolsos | % reembolsos | Requests pos | Custo pos | Casos >1.000 req | Outra venda ativa | Vazamento provavel |
|---|---:|---:|---:|---:|---:|---:|---|

---

## Formato Obrigatorio Das Respostas

Para cada pergunta:

| Campo | O que preencher |
|---|---|
| Pergunta | Texto exato da pergunta |
| Resposta direta | Uma frase com o numero principal |
| Tabela | Numerador, denominador, taxa, receita quando aplicavel |
| Insight | O que muda na decisao |
| Caveats | O que pode distorcer a leitura |
| O que foi feito | Regra operacional usada |
| Tabelas usadas | Tabelas NEKT utilizadas |
| Query usada | SQL completa ou bloco relevante |
| Snapshot | Data/hora UTC-3 em que a query foi rodada |
| Maturidade | D+30/D+90 maduro, parcial ou nao aplicavel |

---

## Padrao De Leitura

| Situacao | Interpretacao correta |
|---|---|
| Elegivel nao renovou | Perda de captura, nao refund |
| Elegivel renovou automatico | Captura normal da renovacao |
| Elegivel renovou por recuperacao | Recuperacao de renovacao; conta como renovou, mas deve ser reportado separado da automatica |
| Elegivel renovou D+31-D+90 | Recuperacao tardia; nao misturar com conversao principal nem com perda madura |
| Elegivel renovou antes de D-90 | Anomalia/upgrade/recompra possivel; investigar separado |
| Cobranca reembolsou | Problema de qualidade da cobranca ou expectativa |
| Chargeback alto | Sinal de contestacao/cobranca percebida como indevida |
| Especial Renovacao com baixa taxa | Benchmark operacional, nao vilao |
| Sem match IA alto | Falha de identidade, email diferente ou ausencia na fonte; nao provar como "nao usou" |
| D0-D7 alto | Atrito imediato de cobranca/renovacao |
| D16-D30 alto | Possivel teste e desistência dentro da garantia |

---

## Ordem Recomendada Da Analise

1. Validar schema e colunas.
2. Validar preenchimento e mutabilidade de `data_encerramento`.
3. Validar enum de `prazo`, `tipo_venda`, `is_renovacao` e `status`.
4. Registrar snapshot NEKT.
5. Montar coorte de elegiveis por `data_encerramento`, em pessoa/email canonico.
6. Cruzar elegiveis com vendas `is_renovacao = 1` no mesmo email.
7. Separar renovacao automatica vs recuperacao (`Adapta Gold [Especial - Renovação]`) vs nao renovou.
8. Medir taxa de renovacao do funil principal.
9. Medir taxa de reembolso entre os elegiveis que renovaram.
10. Separar receita do periodo de conversao do ciclo.
11. So depois, rodar diagnostico secundario de timing D-90/D0/D+30/D+90.
12. Medir qualidade da cobranca dos cobrados.
13. Quebrar por tipo de renovacao e SKU.
14. Diagnosticar tempo ate reembolso.
15. Cruzar uso IA apenas depois de reportar cobertura fonte inteira e janela operacional.
16. Separar fato, inferencia e recomendacao.
