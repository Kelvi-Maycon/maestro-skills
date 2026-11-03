# Performance de criativos de anúncios

Aplicar a dados fornecidos ou acesso explicitamente autorizado; a whitelist Nekt não libera plataformas de anúncios por implicação.

## Análise de Criativos de Ads (Meta/Google)

Regras específicas para quando o input envolver dados de performance de anúncios:

### Agrupamento
- **Consolidar o mesmo criativo entre cópias.** Usar `ad_name` somente depois de confirmar que identifica o mesmo conteúdo; se houver colisão, usar uma chave de criativo validada. Preservar `ad_id` para auditoria e distribuição.
- O mesmo criativo roda em múltiplos adsets/campanhas — agrupar por `ad_id` fragmenta a análise e subdimensiona o criativo real.
- Usar `COUNT(DISTINCT ad_id)` para mostrar **escala de distribuição** do criativo (quantas cópias ativas).

### Métricas obrigatórias
Todo output de análise de ads deve incluir:

| Métrica | Fórmula | Por quê |
|---------|---------|---------|
| **CPA** | `spend / vendas` | Eficiência de aquisição |
| **ROAS** | `receita / spend` | Retorno sobre investimento |
| **CTR** | `clicks / impressions` | Força do criativo para gerar atenção |
| **Spend** | — | Escala atual (não confundir com qualidade) |
| **Saldo após mídia** | `receita - spend` | Receita atribuída menos gasto; não é lucro líquido |

### Ranking
- **Rankear por saldo após mídia absoluto** como primário quando o objetivo for contribuição após aquisição; declarar custos, impostos e reembolsos ainda ausentes.
- Alinhar atribuição, janela de conversão, receita bruta/líquida e moeda; calcular razões sobre somas, não média simples de taxas. Denominador zero produz métrica indefinida, nunca vitória.
- Spend alto ≠ melhor criativo. Um ad com R$70k de spend e ROAS 2x perde para R$15k com ROAS 5x em eficiência.
- Mostrar os dois: ranking por saldo após mídia E ranking por ROAS, lado a lado.

### Janela temporal
- **Sempre declarar explicitamente** no output: "Janela: YYYY-MM-DD a YYYY-MM-DD".
- "Últimos 7 dias completos" = limite inferior inclusivo de hoje − 7 dias e superior exclusivo de hoje, no fuso acordado. Se o pedido incluir hoje, explicitar que é dia parcial.
- Validar se o período tem dados suficientes antes de tirar conclusões — amostra pequena infla ROAS.

### Armadilhas comuns
- **Volume vs eficiência:** criativo com 400 ad_ids e ROAS 2x não é o melhor — está sendo empurrado por orçamento bruto, não por performance orgânica.
- **ROAS alto em spend baixo:** pode ser amostra insuficiente. Verificar `COUNT(vendas)` antes de declarar vencedor.
- **Estático vs vídeo:** não comparar `p75_rate` ou `hook_rate` entre os dois — estático não tem esses dados; a comparação certa é CPA e ROAS.
- **Mesmo nome, criativos diferentes:** confirmar que `ad_name` é realmente o mesmo criativo antes de consolidar — variantes de teste podem ter nomes similares.
