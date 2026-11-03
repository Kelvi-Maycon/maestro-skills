# Funnel

Funil de etapas com número, nome, barra relativa à primeira etapa, valor e a taxa de passagem entre etapas. A menor taxa ganha vermelho e o selo "maior queda".

**Quando usar.** Para uma jornada em sequência: 18.420 visitas → 6.134 leituras completas → 412 assinaturas → 239 primeiras edições abertas.

**O que você fornece.**
- `steps`: `[{ label, sub, value, valueLabel, rateLabel }]`. `value` é número; `rateLabel` é o verbo da passagem até essa etapa ("leem até o fim", "assinam").
- `show`: `"count"` (padrão, "18.420") ou `"rate"` (fração da primeira etapa, "33,3%").
- `dropLabel`: texto do selo da maior queda (padrão "maior queda"; `null` tira o selo).

**Faça.**
- Ponha o funil num `Panel` com `kicker` ("Conversão · 1 – 14 set 2026"), título com um `<em>` ("Funil do *período*") e um `Segmented` "Quantidade / Taxa" ligado a `show`.

**Não faça.**
- Não marque queda à mão; a taxa sai dos valores.

Classes do kit: `.funnel`, `.funnel-step`, `.funnel-n`, `.funnel-name`, `.funnel-bar`, `.funnel-value`, `.funnel-rate`, `.funnel-rate.drop`.
