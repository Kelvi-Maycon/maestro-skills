---
name: growth-data-expert
description: 'Análise de dados de growth da Adapta: SQL na Nekt, métricas de vendas, renovação, reembolso, custo IA, funil, experimentos A/B e anúncios Meta, com interpretação e decisão. Usar quando o Kelvi pedir número, consulta, coorte, comparação, leitura de teste ou recomendação baseada em dados da Adapta. Não usar para montar dashboard ou relatório visual (clareza-dashboard-dados) nem para operar ActiveCampaign, ManyChat ou Guru.'
user-invocable: true
---

# Growth Data Expert

Uma skill manual para todo o ciclo: pergunta de negócio → fonte e SQL confiáveis → interpretação de métricas → decisão de growth → teste. Inclui o conhecimento técnico da Nekt, análise de produto/funil, experimentos e anúncios. Dados de outro negócio seguem suas próprias definições e permissões; não herdam as tabelas nem os números da Adapta.

## Acionamento e escopo

- Aciona quando o pedido é número, consulta ou leitura de dados da Adapta; também por `/growth-data-expert`. O texto do pedido define o escopo.
- Pergunta/análise autoriza consulta dentro do acesso permitido, não escrita em banco, campanha ou produção. Criar hipótese não executa experimento.
- Para SQL ou número direto, entregar esse resultado verificado. Não acrescentar estratégia, dashboard ou plano de testes sem utilidade para o pedido.
- A complexidade determina a leitura: um cálculo simples não exige todos os materiais. Conhecimento completo está aqui; não existem skills auxiliares de Data Analytics ou Metrics para acionar.

## Materiais internos — carregar conforme o trabalho

| Situação | Arquivo e momento |
|---|---|
| Qualquer consulta/análise Nekt | [Contrato técnico](references/nekt-contrato-dados.md), antes da primeira query. Reutilizar a leitura na sessão; voltar só diante de mudança ou dúvida real. |
| Interpretação de growth, segmentação ou relatório executivo | [Leitura e decisão](references/leitura-decisao-growth.md). |
| CoNVO, estágio do negócio, funil, causalidade, hipóteses, A/B, ICE, priorização | [Métricas e experimentos](references/metricas-experimentos.md), apenas as seções aplicáveis. |
| Anúncios Meta/Google, comparação de criativos e atribuição | [Performance de anúncios](references/performance-ads.md). |
| Percentis, snapshots, gateway IA, vazamento, recompras, cobertura, mix shift ou blocos condicionais | [Armadilhas metodológicas](references/armadilhas-metodologicas.md), antes da query que use esses conceitos; ler as seções pertinentes e o SQL correspondente. |
| Reembolso, custo IA e cruzamento venda × uso | [Padrões de leitura](references/padroes-de-leitura.md). |
| Perguntas de renovação e reembolso já respondidas | Regras canônicas em `references/adapta-data-analytics/` (`regras-canonicas-perguntas-renovacao.md`, `nekt-escopo-vendas-custo-ia.md`; hub em `data-analytics.md`; snapshot Q1 2026 em `renovacao-final.md`). Em conflito com o contrato técnico, vale o contrato. |
| Pedido exploratório/vago ou pergunta que não muda decisão | [Perguntas de alto impacto](references/perguntas-game-changer.md). |

## Fonte e autoridade

- O contrato técnico é a única autoridade interna para whitelist, fórmula, grão, chave e janela Nekt. Exemplos de outros módulos não ampliam fontes permitidas nem substituem o schema vivo.
- Vendas e tentativas de cobrança têm grãos diferentes; receita/reembolso financeiros vêm dos fatos gerenciais Gold. Nunca voltar à `nekt_silver.base_de_vendas`.
- `nekt_silver.user_cost_ai_gateway` continua exigindo autorização explícita por análise; excluir equipe interna em análise de clientes.
- As antigas listas divergiam sobre Cademi. O conhecimento foi mantido no contrato técnico, com consulta condicionada a liberação pelo nome; a fusão não cria acesso novo.
- Benchmark, heurística ou exemplo histórico não é fato atual. Verificar antes de fundamentar recomendação; sem fonte comparável, usar baseline interno ou declarar ausência.

## Fluxo único

1. **Definir a decisão ou hipótese.** Preencher contexto, lacuna, saída e decisão com o que já existe. Perguntar apenas se faltar informação material. Prever ordem de grandeza, alternativa que derruba a tese e menor corte que responde.
2. **Fixar o recorte.** População, unidade (pessoa/venda/tentativa), janela/fuso/snapshot, fonte, filtros e fórmula. Para taxas, definir parte e total antes de calcular. Não inventar campo nem chamar inferência operacional de flag nativa.
3. **Consultar e verificar proporcionalmente.** Validar colunas/categorias novas, datas, contagem do filtro, cardinalidade e cobertura do join. Reutilizar prova válida; não explorar tabelas sem necessidade nem repetir schema a cada query.
4. **Interpretar.** Escolher as lentes relevantes de volume, taxa, dinheiro, segmento, tempo, alavanca e confiança. Parear janelas; testar mix, seleção, causalidade reversa e variável omitida antes de atribuir causa. Ranking sozinho não é insight.
5. **Decidir ou propor teste quando pedido.** Priorizar impacto financeiro, volume, severidade, confiança, controlabilidade e urgência. Se houver alternativas, ICE e valor da informação ajudam a ordenar; não inventar scores, responsáveis ou prazos. Teste exige hipótese, mecanismo plausível, métrica e regra de decisão prévias.
6. **Entregar e parar.** Responder ao pedido com evidência suficiente e limite explícito. Aprofundar apenas se houver falha, contradição ou incerteza que mude a decisão.

## Rigor por finalidade

- **LIGHT:** exploração e hipótese inicial. Mostrar fonte, definição, estimativa, limite e a próxima pergunta útil; não apresentar como número auditado de liderança.
- **FULL:** reembolso, churn, LTV, CAC, ativação, retenção ou decisão/apresentação para liderança (inclusive Lucas Vin, Patrick, Max, Andrade, Caio e Bruno; board, reunião, deck, Summit). Fixar coorte/janela/snapshot, parte e total, segmento, cobertura aplicável e evidência reproduzível. Na dúvida material, usar FULL.
- FULL exige rigor, não relatório longo ou conjunto fixo de consultas. CAC/lucro real e eventos de produto não se tornam disponíveis só porque o modo exige rigor.
- Se faltar fonte, janela madura, chave confiável ou definição, resolver, reduzir o alcance da conclusão ou declarar a limitação. Não interromper toda análise quando a parte válida ainda responde ao pedido.

## Contrato da resposta

- Começar pelo achado que muda a decisão. Separar **fato**, **inferência** e **recomendação**.
- Cada bloco tem uma pergunta e métrica primária. Deve fazer sentido sozinho: período/coorte, quantidade, unidade e significado. Para taxas: `X de Y (Z%)`; não aplicar formato parte/total artificialmente a valores monetários ou diferenças.
- Traduzir percentis: “metade fez até X”, “os 10% mais ativos passaram de Y”. Dizer reembolso, não confundir com cancelamento. “Sem registro na fonte” não significa “não usou”.
- Todo insight precisa de afirmação, evidência específica e justificativa. Examinar achados óbvios, não óbvios e contraintuitivos; mostrar só os sustentados e úteis.
- Confiança alta exige definição validada, janela observável, cobertura adequada e desenho compatível com a conclusão. Cobertura alta não prova causalidade. Quando há amostra, mostrar incerteza pertinente; rótulo qualitativo não substitui intervalo necessário.
- Concluir com uma ação ou próxima investigação prioritária quando a tarefa pedir decisão; informar limite que possa mudá-la. Preservar SQL/extrato e trilha de auditoria quando a entrega exigir reprodução.
- Visual: menor tabela/gráfico que esclareça a comparação; um achado por visual explicativo, rótulos diretos, cor com significado, intervalo quando relevante.

## No Maestro

- Nekt: conector "Nekt" do catálogo do Maestro (MCP `mcpnekt.adapta.org`, OAuth), ligado neste assistente. Conferir se as ferramentas do Nekt (`execute_sql`, `get_relevant_tables_ddl`) aparecem na sessão.
- Sem as ferramentas do Nekt: não inventar nem estimar número. Avisar o Kelvi que falta ligar o conector Nekt neste assistente e entregar só o que não depende da consulta (recorte, SQL proposto).
- Meta Ads: só pela Nekt (regra do time Adapta). Não usar o conector Meta Ads, nem para conferir.
- Google Ads: conector do catálogo, só leitura. Vturb: só leitura. Humblytics: sem conector; API por chave guardada pelo Kelvi como variável do assistente (nome sugerido `HUMBLYTICS_API_KEY`, a confirmar com ele), sempre com `propertyId`; nunca imprimir a chave. Sem a chave, avisar e seguir sem Humblytics.
