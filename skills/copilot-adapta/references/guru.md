# Guru (Digital Manager Guru)

Checkout, ofertas e assinaturas da Adapta. Criação e edição pelo painel, no `agent-browser` com a sessão que o Kelvi logou (`https://digitalmanager.guru/admin/...`). A API serve para leitura, para ativar ou desativar oferta e para RPPCs.

Documentação em markdown limpo: `https://docs.digitalmanager.guru/<path>.md` (índice em `/llms.txt`). API: `https://api.docs.digitalmanager.guru/openapi/<path>.yaml`.

**Guru fica intocada até o Kelvi liberar.** Ainda não foi operada nesta skill.

Login: o Kelvi loga no `agent-browser`. 2FA do Authy: só o Kelvi digita. Código de verificação que a Guru manda por e-mail no login: se o Kelvi autorizar naquela tarefa, o bot lê no conector "Gmail"; sem essa autorização, não abrir o Gmail para isso. A primeira vez em cada tela: conferir os rótulos reais e corrigir este arquivo.

## RPPC (Rastreamento Ponto a Ponto de Conversão)

É o link rastreado que leva ao pagamento e identifica a origem do tráfego. Não é o link de pagamento, que sai da oferta. Na Adapta o domínio é `go.adapta.org/campaign/<slug>`.

- Menu: **R.P.P.C.** > Vendas | Checkouts | Capturas | Leads | Grupo.
- **De Vendas**: um por fonte de tráfego (Meta, e-mail, WhatsApp…).
- **De Checkout**: um por oferta.
  - Campos: Nome, URL amigável (vira o `<slug>`), Produto ("Rastreamento Global" é o recomendado), URL de destino (link de pagamento da oferta), Campo (`src`), Grupo, Ativo.
  - No de Vendas, o Campo muda e entra a Origem.
- **Grupo**: reúne vários RPPCs e se aplica de uma vez a produtos, ofertas ou checkouts.
- **Depois do primeiro clique, o RPPC e o grupo não podem mais ser alterados nem excluídos.** Conferir slug, destino e grupo antes de usar o link em campanha. Errou: criar outro.
- O planner mostra os vínculos de RPPC, checkout e oferta por funil (`consultar_vinculos_de_funil` com `funil_id`).

## Produto e oferta

- Produto: Produtos > Adicionar Produto. Campos: Nome, Marketplace, Tipo (Produto ou Assinatura); Produtor e Grupo de Produtos são opcionais.
- Oferta: produto > aba **Ofertas** > Criar Oferta.
  - Campos: Nome, URL amigável, Valor, Quantidade, Formas de pagamento, Parcela máx. sem/com juros, Parcela selecionada, Taxa de juros, Ativa.
  - Assinatura: "Cobrar a cada", "Máximo de Ciclos" (0 = até cancelar), acréscimo ou desconto por ciclos. Trial nas opções de assinatura (`trial_days` na API).
- Oferta inativa devolve 404 no link. Oferta duplicada nasce inativa.
- URL da oferta no painel: `/admin/products/<produto_id>/offers/<oferta_id>`.
- Links da oferta: ícone de link na lista de Ofertas. São a URL de Pagamento, o One Click Buy e, em assinatura, o One Click Upgrade.
- Upgrade/downgrade: na oferta, aba Downgrade/Upgrade.
- Ativar ou desativar oferta que está vendendo muda o que o cliente vê: só com OK do Kelvi.

## Checkout

- Produto ou oferta > Configurações Adicionais > **Checkout**, com as abas Aparência, Conteúdo, Emails, Order Bump, Pixels e Redirecionamento.
- A oferta herda o checkout do produto. Personalizar na oferta só quando for diferente.

## Webhooks

- Configurações > **Webhooks** > Vendas | Assinaturas | E-tickets | Desativação > Adicionar Webhook.
- Campos: Nome, URL (ex.: webhook do n8n; a URL de produção vem do conector "N8N - Flow - Prod"), Envios simultâneos (5), Status que disparam, Filtro (todos, marketplaces ou produtos), Ativo.
- Não existe filtro por oferta. Filtrar no receptor por `items.*.offer.id` ou `items.*.offer.name`.
- Payload de venda: `webhook_type:"transaction"`, `status`, `contact.*`, `product.*`, `items.*.offer.*`, `payment.*`, `source.utm_*`, `subscription.*`.
- Payload de assinatura: `webhook_type:"subscription"`, `subscription_code`, `last_status`, `trial_*`, `current_invoice.*`.
- Assinatura dispara por: ativa, atrasada, cancelada, expirada, inativa, iniciada, trial e troca de cartão.
- O receptor valida pelo `api_token` do payload e responde 200.
  - Com falha, a Guru tenta de novo várias vezes.
  - Com mais de 60% de falha em 100 envios, o webhook se desativa sozinho.
- Testar: a Guru não manda payload de teste. Reenviar uma venda ou assinatura real (Detalhe > Reenviar) para o webhook novo e conferir a execução no n8n.
- Webhook ativo dispara em venda real: ativar só com OK do Kelvi.

## API v2

- Base `https://digitalmanager.guru/api/v2`, `Authorization: Bearer <token>`. Token de usuário em Meu Perfil > Tokens API; no Maestro fica na variável `GURU_API_TOKEN` do assistente, configurada pelo Kelvi. Nunca imprimir nem escrever o token em nota, skill ou chat.
- Limite de 360 req/min. Paginação por `next_cursor` e `has_more_pages`.
- Leitura: `/products`, `/products/{id}/offers`, `/transactions` (filtros `product_id`, `transaction_status`, datas, `contact_email`), `/subscriptions`, `/trackings/*` (RPPCs; 1.466 no último levantamento).
- Escrita possível: ativar ou desativar oferta (`PATCH .../offers/{id}/availability`), cupons, CRUD de `/trackings/{campaigns,checkouts,forms,leads,groups}`, ações em assinatura e transação.
- **Criar produto ou oferta não tem API**: fazer pelo painel.
- Dado consolidado de vendas também existe no Nekt (`silver__guru__transactions`).
