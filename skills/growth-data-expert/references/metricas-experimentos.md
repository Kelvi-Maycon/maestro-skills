# Métricas, hipóteses e experimentos

Métodos para dados fornecidos ou fontes autorizadas. Uma lente ou cruzamento sugerido aqui não autoriza acesso a uma tabela Nekt fora de `nekt-contrato-dados.md`. Escolher as fases necessárias; não executar todas por rotina.

## FASE 1 — Framing antes de analisar

Antes de tocar nos dados, clarify o CoNVO:

- **Context:** Qual o negócio, modelo, estágio atual? O que já foi tentado?
- **Need:** Qual é a lacuna de conhecimento específica?
- **Vision:** Como o resultado final se parece? (Se não consegue esboçar o output em 5 minutos, o Need não está definido)
- **Outcome:** Qual decisão vai ser tomada com o resultado? Quem decide e quando?

Use o contexto disponível para preencher o CoNVO; se faltar uma decisão material, pergunte apenas o necessário antes da etapa dependente. Análise correta para a pergunta errada é desperdício total.

**Identifique o estágio do negócio (framework Lean Analytics):**

| Estágio | Sinal | OMTM |
|---------|-------|------|
| Empathy | Sem PMF confirmado | % entrevistas revelando dor real e pagável |
| Stickiness | PMF provado, retenção não validada | D7/D30 retention, DAU/MAU |
| Virality | Retenção saudável, quer crescer organicamente | K-factor por canal |
| Revenue | Crescimento mas unit economics não fechado | LTV:CAC, payback period |
| Scale | Unit economics saudável | CAC por canal, margem por coorte |

> **Regra de ouro:** retenção precisa estar provada antes de otimizar aquisição. Escalar aquisição sem retenção é escalar um balde furado.

---

## FASE 2 — Cruzamento e Análise

### Princípios de cruzamento

**Não concluir só pelo agregado quando o mix puder explicar a mudança.** Escolher o menor corte explicativo disponível e autorizado:
- Cohort de aquisição (qual mês/semana o usuário entrou)
- Canal de aquisição (orgânico, pago, referral, direto)
- Segmento de produto (plano, feature usada, persona)
- Comportamento in-app (aha moment atingido ou não)

Agregados mascaram deterioração. Coortes novas podem estar piorando enquanto as antigas sustentam o número total — o agregado mente.

**Cruzamentos de alta alavancagem:**
- Retenção × canal de aquisição → identifica se o problema é retenção geral ou seleção adversa de canal
- LTV × cohort de mês → identifica se a qualidade do usuário está degradando ao longo do tempo
- Ativação (aha moment atingido) × retenção D30 → testa se o sinal de ativação está associado à retenção; não confirma causalidade sozinho
- CAC × canal × LTV coorte → identifica qual canal é realmente rentável, não só barato
- Churn × feature usage → identifica quais features protegem retenção
- Conversão × ponto do funil × segmento → identifica onde o funil quebra para qual persona

**Separação explícita: correlação vs. causalidade**

Toda vez que encontrar uma correlação, explicite:
- É causalidade reversa? (B causa A, não A causa B)
- Existe variável omitida? (C causa ambos)
- É seleção? (usuários que fazem X já eram melhores antes de X)

Para concluir causalidade, precisa de: A/B test ou quase-experimento com controle explícito de confounders.

**Measurement Inversion:** As métricas mais medidas costumam ter menor valor informacional. Pergunte: qual variável mais move a decisão-chave? Essa é a que provavelmente não está sendo rastreada.

**Outside View:** prefira o baseline comparável do próprio negócio. Os números abaixo são heurísticas herdadas, sem fonte e data verificadas; não são critérios universais nem prova de PMF. Só usar benchmark externo após verificar fonte, período e compatibilidade do modelo de negócio:
- SaaS B2B: churn saudável < 2%/mês; NRR > 100% = expansão
- DAU/MAU: social apps 20–50%; SaaS B2B ~13%; e-commerce ~10%
- LTV:CAC: mínimo 3:1; ideal > 5:1 com payback < 12 meses
- Must-have survey: ≥ 40% "muito decepcionado" = sinal heurístico, sem confirmar PMF isoladamente

---

## FASE 3 — Insights em 3 níveis

Estruture sempre em camadas:

### Nível 1 — Óbvios
O que qualquer analista veria. Valide que estão corretos — às vezes o óbvio está errado por problema de amostragem ou regressão à média.

### Nível 2 — Não-óbvios
Cruzamentos que mudam a interpretação. Onde o número agregado esconde a história real. Ex: "a conversão caiu 8% no geral, mas cresceu 12% para o segmento X enquanto despencou 23% para Y — o problema não é geral, é de mix de canal."

### Nível 3 — Contra-intuitivos
Onde o dado contradiz a intuição do usuário. Esses são os mais valiosos. Se a hipótese do usuário estava errada, diga diretamente.

**Formato de cada insight:**
```
Claim: [o que você está afirmando — em 1 frase]
Evidence: [dado específico: métrica X no período Y para segmento Z]
Justification: [por que esses dados suportam essa conclusão — mecanismo causal ou lógica de inferência]
```

Sem as 3 camadas, é opinião com gráfico.

**Alertas automáticos:**
- Se o resultado parece bom demais: verificar regressão à média (coorte com performance excepcional tende a regredir)
- Se múltiplas métricas pioraram juntas: buscar variável omitida, não tratar como causas independentes
- Se a OMTM proposta pode ser "gamed" sem mover o negócio: sinalize antes de começar
- Se a amostra é pequena: declarar incerteza e verificar o método adequado; a heurística Rule of Five não substitui intervalo, amostragem representativa ou cálculo de poder.

---

## FASE 4 — Hipóteses e Testes A/B

### Formato de hipótese (obrigatório)
```
Se [ação específica],
então [métrica] vai [direção + magnitude estimada]
porque [mecanismo causal explícito].
```

Hipótese sem mecanismo causal é chute disfarçado.

### Critérios de qualidade do teste (checklist)
- Definir unidade de randomização, baseline, efeito mínimo relevante, janela, métrica primária, guardrails e regra de parada antes de observar resultados; investigar desequilíbrio de amostra, contaminação entre grupos e perdas de acompanhamento quando houver sinal.
- [ ] Hipótese mensurável com outcome claro
- [ ] Stakeholders comprometidos a aceitar o resultado (sem cherry-picking)
- [ ] Randomização viável para o contexto
- [ ] Causalidade clara — não correlação
- [ ] Decisão real será afetada pelo resultado
- [ ] Line in the sand definida ANTES: "Se [métrica] < [threshold] após [prazo], rejeitamos"
- [ ] Poder estatístico calculado (não descoberto post-hoc)

> Se múltiplos testes rodarem simultaneamente, avisar: múltiplas comparações inflam a taxa de falso positivo. Controlar multiplicidade conforme o desenho e a família de hipóteses; não escolher correção depois de ver o vencedor.

### ICE Score

Para cada hipótese:

| Dimensão | Score (1–10) | Critério |
|----------|-------------|---------|
| **Impact** | — | Se funcionar, quanto move a NSM? |
| **Confidence** | — | Quanta evidência já temos? (force evidência antes de pontuar) |
| **Ease** | — | Custo e tempo de implementação |
| **ICE** | média | Prioridade relativa |

Confidence é o mais sujeito a viés de confirmação. Sempre pergunte: "O que provaria que essa hipótese está errada?"

### Behavioral economics — alavancas para hipóteses de produto
- **Loss aversion:** testar framing de perda versus ganho equivalente; não pressupor efeito no público atual
- **Endowment effect:** dados acumulados (histórico, personalizações) aumentam custo percebido de churn — usar isso para estratégias de retenção
- **Default effect:** opção padrão é escolhida pela maioria — mudar o default é um dos testes mais baratos e mais poderosos
- **Mental accounting:** créditos de plataforma são gastos mais facilmente que dinheiro real — produto com "créditos" tem dinâmica diferente de produto com preço direto
- **Transaction utility:** "de X por Y" ativa prazer da deal além do valor do produto

---

## FASE 5 — Prioridades e Pontos de Ataque

### Mapa de prioridades

Organize em 3 categorias:

**Quick Wins** (< 2 semanas de implementação, ICE alto):
- Mudanças de default
- Otimização de copy/framing
- Redução de fricção em etapa do funil com maior drop-off identificado

**Apostas Estratégicas** (> 2 semanas, alto Impact mesmo com menor Confidence):
- Mudanças de produto que requerem eng
- Novos canais de aquisição
- Revisão de pricing/packaging

**Investigações Necessárias** (antes de agir, reduzir incerteza):
- Variáveis com alto EOL (Expected Opportunity Loss): probabilidade de estar errado × custo de estar errado
- Use VOI (Value of Information) como teto: não gastar mais em pesquisa do que o valor da decisão que ela informa

### Identificar o elo mais fraco do funil

Calcule onde consertar tem maior ROI:
```
Impacto de melhorar etapa N = Volume(N) × ΔConversão(N) × Valor downstream
```

Localizar a etapa pelo impacto estimado e pela evidência; não presumir que o gargalo está no início do funil.

### Dependências
Mapeie o que precisa acontecer antes de cada iniciativa. Iniciativas sem dependências mapeadas geram atraso surpresa.

---

## FASE 6 — Próximos Passos Acionáveis

Cada próximo passo deve ter:
- **O quê:** ação específica (não "investigar retenção" — "rodar cohort analysis de D30 segmentado por canal × feature X usada no D7")
- **Quem:** responsável
- **Quando:** prazo
- **Métrica de sucesso:** o que vai provar que funcionou
- **Risco principal:** o que pode fazer esse passo falhar ou enganar

---

## Outputs por tipo de input

| Input recebido | Output entregue |
|---------------|----------------|
| Dados/métricas brutas | Cruzamentos em 3 níveis + hipóteses ranqueadas por ICE |
| "O que está acontecendo aqui?" | Diagnóstico de funil por estágio + Claim/Evidence/Justification por insight |
| "Quero criar um teste A/B" | Hipótese formatada + checklist de qualidade + line in the sand + ICE score |
| "O que priorizar?" | Mapa quick wins vs apostas + EOL por variável + dependências |
| "Resultado do experimento X" | Interpretação com alerta de regressão à média, p-hacking, e tamanho de efeito real |
| Input vago | CoNVO com contexto existente; pergunta mínima se houver lacuna material |

---

## Comunicação de incerteza

- Sempre que reportar uma métrica com base em amostra, dê intervalo de confiança ou rate o nível de confiança qualitativamente (alto / médio / baixo, com motivo)
- Use linguagem probabilística: "provavelmente cai entre X% e Y%" > "é Z%"
- Distinga **calibração** (suas probabilidades batem com frequências observadas) de **resolution** (suas previsões discriminam casos)
- Antes de defender uma previsão, pergunte: "qual é a Outside View?" (baseline da classe de referência), depois ajuste para o caso específico

## Comunicação visual (quando aplicável)

- Distinga exploratória (entender) de explicativa (decidir) — se for explicativa, claim único por visual
- Declutter: remova bordas, gridlines, rótulos redundantes
- Labels diretos > legenda separada
- Use cor como sinal, não como decoração
- Para métricas de incerteza, mostre distribuição/intervalo, não só ponto

## Regras invioláveis

1. **Nunca declare insight sem Claim + Evidence + Justification.** Opinião com gráfico não é análise.
2. **Nunca sugira teste sem line in the sand definida antes.** Threshold post-hoc é cherry-picking.
3. **Mecanismo plausível não prova causalidade.** Exigir desenho de identificação adequado (experimento ou quase-experimento com premissas verificadas) e apontar alternativas.
4. **Nunca recomende mais trackeamento sem justificar VOI.** Você já tem mais dados do que pensa na maioria dos casos.
5. **Sempre pergunte: estamos no estágio certo do negócio para essa iniciativa?** Otimizar aquisição antes de provar retenção é o erro mais caro de growth.
6. **Sempre apresente intervalo de confiança quando relevante.** Dashboard que mostra só ponto único sem distribuição é perigoso.
7. **Se o dado contradiz a intuição do usuário, diga diretamente.** Não suavize. Resultado inesperado é o maior valor que análise pode entregar.
8. **Aponte quando a métrica proposta pode ser gamed sem mover o negócio.** OMTM errada destrói times.
9. **Mantenha múltiplas hipóteses concorrentes (Fox, não Hedgehog).** Não apaixone por uma teoria — atualize com cada novo dado.
10. **Pense Bayesiano: prior + evidência → posterior atualizado.** Conclusões fixas mesmo após novos dados é red flag.
