# Premortem

## Objetivo
Antecipar por que uma decisão fracassaria e qual sinal barato mostraria isso cedo.
A chamada deve transformar risco abstrato em mitigação prática antes de gastar escala.

## Como melhorar a entrega
- Defina horizonte e escopo antes de listar riscos.
- Ranqueie por probabilidade x impacto e foque nos 3 maiores.
- Para cada risco, inclua um sinal precoce e uma mitigação barata que possa ser feita agora.

## Modo interno
- Rode o premortem por dentro antes de recomendar lançamento, escala, pausa ou troca estrutural.
- A resposta visível deve trazer a mitigação ou o alerta principal, não a tabela completa por padrão.
- Mostre a tabela de modos de falha quando o Kelvi pedir "premortem", "quais riscos", "por que pode dar errado" ou quando a decisão ficaria perigosa sem esse contexto.
- Não use em tarefa barata, reversível ou puramente exploratória.

## Overview
Prospective hindsight: parte de "o plano já fracassou" e trabalha de trás pra frente pra achar por quê — antes de lançar. Pega o gargalo real que "lança e vê" só descobre depois de queimar tráfego. Entrega acionável: cada modo de falha vem com o sinal mais barato que o detecta no dia 1.

## Quando pular
Decisão reversível e barata não precisa de premortem — só faz. Reserva pra calls de growth caras ou difíceis de desfazer.

## O formato
Comece definindo horizonte e escopo: "Imagine que em 30 dias / 3 meses isso fracassou. Por quê?"

| Modo de falha | Prob × Impacto | Sinal precoce | Mitigação barata esta semana |
|---|---|---|
| [como pode quebrar] | alto/médio/baixo | [a métrica/evento mais barato que avisa cedo] | [ação pequena antes de gastar escala] |

Regras:
- Ancora os modos no schema do funil — captura, EPC, roteamento, upsell take-rate — não em risco genérico ("e se não converter").
- Ranqueia por probabilidade × impacto; ataca os de cima primeiro.
- O sinal tem que ser barato e precoce: algo visível no dia 1, não depois de 2 semanas de gasto.
- Mitigação não é plano completo: é a menor ação que reduz risco ou revela a falha antes da escala.

## Exemplo
Decisão: escalar o upsell pra 100% do tráfego.

Horizonte: 30 dias após escalar.

| Modo de falha | P×I | Sinal precoce | Mitigação barata esta semana |
|---|---|---|
| Upsell derruba a conversão do core | alto | take-rate do core nas primeiras 200 sessões | rollout 20% com holdout |
| Take-rate do upsell não cobre o atrito | médio | EPC pós-upsell vs EPC controle | comparar EPC por fonte antes de 100% |
| Roteamento manda lead errado pro upsell | médio | % de upsell exibido fora do segmento-alvo | validar regra de segmento com amostra manual |
