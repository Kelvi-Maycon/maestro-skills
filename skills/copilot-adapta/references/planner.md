# Planner de otimizações (conector)

Ferramentas do conector "Planner otimizações" (MCP custom, ligado por URL no Maestro pelo Kelvi; não está no catálogo). Sem ele, avisar o Kelvi. Testes A/B da Adapta com código `AB-00NN`.

## Ferramentas

Leitura (livre):
- `consultar_testes`: lista por busca, funil, etapa ou responsável.
- `abrir_teste`: ficha completa do teste (`teste_id`): planejamento, 8Rs, ICE, variantes e resultados.
- `consultar_tarefas`: tarefas do Kelvi ou de um teste.
- `consultar_cadastros`: funis, produtos, canais, elementos, métricas e pessoas.
- `consultar_historico`: histórico por teste, pessoa ou datas.
- `consultar_metricas`: métricas salvas de um teste, nos recortes `general`, `funnel`, `front` e `all_front`.
- `consultar_vinculos_de_funil`: RPPCs, checkouts e ofertas da Guru ligados a cada funil. **Sempre passar `funil_id`**, porque sem ele a resposta passa de 280 mil caracteres.

Escrita (pedido do Kelvi para aquele teste ou tarefa):
- `criar_ideia`: precisa de `titulo` e `pedido_id`.
- `criar_tarefa`: precisa de `tarefa_id` e `titulo`.
- `editar_ice`: precisa de `teste_id`, `revisao` e `pedido_id`, mais os três valores (Impacto, Confiança e Facilidade, de 1 a 10).
- `editar_planejamento`: muda título, hipótese, responsável, canal, funil, notas e 8Rs.
- `editar_tarefa`: edita ou conclui tarefa; precisa de `tarefa_id` e `atualizado_em`.
- `atualizar_metricas` e `conferir_vendas`: gravam a leitura de métricas e o checkpoint de vendas na ficha. Na Guru só leem.

## Regras

- Antes de editar, abrir a ficha e usar a `revisao` atual. Edição com revisão antiga é recusada.
- Não inventar responsável, métrica, ID ou conclusão.
- A conclusão de teste é feita só na interface do planner, onde a leitura fica congelada. Para concluir, mandar o Kelvi lá.
- EPC agregado não prova significância estatística. Resultado sempre informa fonte, período e limites.
- Fluxo das etapas: Ideia → Em avaliação → Priorizado → Em planejamento → Em produção → Pronto para lançar → Em teste → Concluído (ou Descartado).
- Cadastros atuais:
  - **Funis:** Anti-Black 26, Clube das IAs, Ferri, Pacote de Atualização, PDF Gabarito, Renato Cariani.
  - **Produtos:** One, Maestro, Native, Skip, Imersão CEOs.
  - **Métricas:** `epc`, `rate`, `revenue_per_eligible`.
  - Conferir em `consultar_cadastros`, porque a lista muda.

## Ligação com o resto

- Funil novo no ManyChat, no AC ou na Guru, ou teste lançado: perguntar se há teste no planner, como o AB-0018 "Recuperação de renovação".
- Ao montar um teste, o ID do teste vai na URL final (tarefa "colocar id do teste na url final").
- O que muda no planner entra também no registro do dia ([entregas.md](entregas.md)).
