---
name: recorte-de-dados
description: "Define população, período, unidade, filtros e fórmula em análise quantitativa quando essas escolhas mudam o resultado. Não ativar para DDL, formatação de planilha ou aritmética simples sem ambiguidade. Acionar em consulta ou auditoria de métrica na Nekt, Supabase, Meta Ads ou planilha (CPA, ROAS, conversão, reembolso, renovação, coorte, funil), inclusive junto com growth-data-expert ou clareza-dashboard-dados."
---

# Recorte de dados

## Objetivo
Número certo com rótulo certo. Rótulo errado ("total previsto para renovar" quando era "renovações confirmadas") é erro pior que query lenta.

## Antes da query — fixar por dentro

| Dimensão | Pergunta | Fonte |
|---|---|---|
| Coorte | Quem entra? (todos, pagantes, plano X, canal Y) | pedido + painel citado |
| Data-âncora | Data de quê? (compra, ativação, evento, criação) | pedido |
| Janela | De quando a quando; fechada ou rolling; fuso | pedido + painel |
| Unidade | Conta o quê? (usuário, pedido, transação, assento) | pedido + schema |
| Filtros | Status, teste, reembolso, interno, duplicado | schema + painel |
| Métrica | Fórmula exata (numerador/denominador) | painel citado > definição do negócio |

Se o pedido cita um painel, a definição do painel vence a intuição — e a query tem que bater com ele antes de qualquer análise nova.

Razão (CPA, ROAS, conversão): numerador e denominador saem da mesma população, janela e regra de atribuição. Conferir cada parte separada não prova a divisão; antes de declarar pronto, bater a razão com um número independente (ferramenta de origem ou painel).

## Tese antes de query
Identificar internamente o objetivo da consulta. Consulta exploratória pode mapear o dado sem tese prévia; não bloquear exploração autorizada.

## Cruzar como analista sênior
Se necessário à decisão solicitada, buscar depois do número base um cruzamento relevante: coorte × canal, tempo até evento, distribuição em vez de média, retenção em vez de volume.

## Saída
- Simples: até 2 bullets — tese, cruzamento, implicação.
- Complexo ou pedido: só o raciocínio que sustenta a decisão; sem narrar processo.
- O rótulo do número carrega o recorte: "renovações confirmadas, coorte mar/26, 30 dias após vencimento".
- Divergência com painel citado: mostrar os dois números e a causa, não escolher um em silêncio.
- Visual (tabela, card, gráfico) segue o princípio global de visualização: cor pelo negócio, recorte no rótulo.

## Formato de número (o Kelvi lê % mais rápido que absoluto)
- Nunca P50/P75/P90/P99. Sempre "X% fez até Y": *75% reembolsaram em até 23 dias*. Mediana pode ser "mediana" ou "metade".
- Distribuição vira tabela "% da população | até X".
- Volume sempre com % do total: *10.284 reembolsos (21,5% da coorte)*.
- Tabela de buckets (D0, D1–D3, D4–D7…): célula só em %; número absoluto só na coluna de total, pra dar escala.
- Em PT-BR é **reembolso / reembolsado / não-reembolsado** — nunca refund/refundado. Nome de coluna em SQL pode ficar.

## Quando perguntar
Só quando duas leituras materiais dão resultados diferentes e pedido + painel não resolvem. Uma pergunta, já com o default proposto.
