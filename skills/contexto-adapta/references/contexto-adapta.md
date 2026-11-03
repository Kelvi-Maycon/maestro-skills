# Contexto da Adapta

Fonte única de ofertas, preços, links e pessoas. Só o Adapta Bot propõe mudança neste arquivo; o Kelvi aprova e leva a nova versão aos outros assistentes que têm a skill `contexto-adapta`.

> Versão reconstruída a partir do inventário de 16/10/2026 (o original ficou no Grok Bot). Trazida da estrutura antiga de bots em 02/11/2026 sem atualização de conteúdo.

## Kelvi
- kelvi@adapta.org, fuso America/Sao_Paulo, PT-BR.
- Reclama de demora: prefere tarefas em paralelo e estimativas realistas.

## Oferta vigente
- Renovação One 27, Global grátis, Maestro R$99/mês.
- Página: `exclusivo.adapta.org/one-pro-exclusivo-v2-ak`.

## Pessoas
- Allison: planner (repo adapta-planner-scope), fluxo de renovação.
- Lucas Andrade.
- Giampaolo: endpoint e créditos.
- Matheus: Guru.
- Camilo: alertas do #erro-workflows.
- Patrick: comparação do A/B.
- Max Peters: remetente do e-mail 3.

## Sistemas
- Páginas: repo ADAPTA-LPS/campaigns (Astro + YAML), Cloudflare Workers, exclusivo.adapta.org. No Maestro, clone em `work/campaigns` no workspace do assistente que for mexer (conferir `git status` antes de trocar de branch).
- ActiveCampaign: adapta8655.activehosted.com.
- Nekt: `https://mcpnekt.adapta.org/mcp`, só leitura.
- Humblytics: propriedades adapta.org, exclusivo.adapta.org, lp.adapta.org, labs.adapta.org, skip.it. Sempre passar propertyId. Nunca imprimir a chave.
- n8n: flow.adaptaops.org. Guru: digitalmanager.guru. Adyen, Cloudflare, Vturb, Google Ads.
- Regras canônicas de renovação e reembolso: skill `growth-data-expert`, em `references/adapta-data-analytics/`.

## Regras
- "Suba o PR" não é merge. Merge só quando o Kelvi pedir. Esperar o CI e avisar.
- A VSL só muda na conferência do Kelvi.
- Link do Vturb sempre no formato `https://app.vturb.com/players/<player>`.
- Vturb só leitura. Nada sem permissão explícita para aquela mudança.
- Guru: não mexer até o Kelvi liberar. 2FA do Kelvi é Authy e só ele digita.
- ManyChat: login Google kelvi@adapta.org feito pelo Kelvi. Não mexer sem OK.
- Design system da Adapta, sem travessões.
- Templates do AC sempre editáveis no designer.
- Templates do ManyChat: CTA em todo template, nome de amostra "Aluno", nomes exatamente como o Kelvi dá.
- LPs da Adapta ficam na Cloudflare, não na Vercel.
- Rotular métricas como (total) ou (únicos).
- Na dúvida, parar e perguntar.

## Pendências herdadas do Grok (16/10/2026)
Histórico, não estado atual: conferir no sistema antes de citar qualquer item como aberto.
1. Webhooks Guru MAESTRO VENDAS (desativado 15/10) e DASH UPSELL (desativado 16/10 09:31) esperam o Kelvi.
2. 7 chargebacks e 7 alertas de fraude Adyen (16/10, 12:46 a 12:49).
3. Bug do `confirmed_at` vazio em "Salvar vendas do guru" (execução 18224902).
4. Erro 503 do AC: reprocessar no n8n (Anti-Black, Via Chroma, pré-checkout, 18062660). Ajustar filtro do Saldo Insuficiente (18069787).
5. Cliente sem acesso (nome e e-mail ficaram fora desta cópia; dado de cliente não sai do sistema).
6. Doc "Renovação Falha cartão" da Allison: 6 observações, resposta não enviada.
7. Anúncio BF26 (Ad11814) reprovado no Google Ads por "conteúdo enganoso".
8. AC 229: conferir webhooks, URLs dos botões e nomes dos templates no ManyChat. Diagramas: v1 https://app.excalidraw.com/s/7lM1eQVE1hh/6l7hHdfh3fg, v2 https://app.excalidraw.com/s/7lM1eQVE1hh/A1jL2PX8vdW.
9. Convite GitHub adapta-planner-scope aguardando o Kelvi.
10. Erro 409 "conta desativada" do Maestro (Ops investigava). Envio Beuni #75793.
