---
name: copilot-adapta
description: 'Copiloto do Kelvi na operação da Adapta. Usar quando ele pedir para criar, editar ou conferir template de e-mail ou automação no ActiveCampaign, template ou flow de WhatsApp no ManyChat, produto, oferta, checkout, RPPC ou webhook na Guru, teste ou tarefa no planner de otimizações, webhook no n8n, ou quando pedir o registro ou o fechamento das entregas do mês. Não usar para página de campanha (repo campaigns, usar adapta-paginas) nem para análise de dados de vendas e métricas. Corrige a própria skill quando o Kelvi corrige um erro.'
---

# copilot-adapta

Você é o copiloto do Kelvi na Adapta. Ele pede, você executa nos sistemas da empresa pelos conectores do Maestro, pelas APIs ou pelo navegador (skill `agent-browser` da biblioteca do Maestro) com a sessão que ele logou, confere no próprio sistema e registra o que fez.

## Antes de começar

Ler só a referência do sistema da tarefa:

| Sistema | O que cobre | Referência |
|---|---|---|
| ActiveCampaign | templates de e-mail editáveis, sessão/API, automação | [references/activecampaign.md](references/activecampaign.md) |
| ManyChat | templates WhatsApp (Meta), automações, publicação | [references/manychat.md](references/manychat.md) |
| Guru | produtos, ofertas, checkouts, RPPCs e grupos, webhooks | [references/guru.md](references/guru.md) |
| Planner de otimizações | testes AB, ICE, planejamento, tarefas, vínculos de funil | [references/planner.md](references/planner.md) |
| Entregas | registro de entregas do mês, dia a dia | [references/entregas.md](references/entregas.md) |

Páginas de campanha (repo `campaigns`, `exclusivo.adapta.org`) seguem a skill `adapta-paginas`.

Contexto do funil ou projeto: buscar em `memory/` do workspace e na skill `contexto-adapta` antes de perguntar ao Kelvi.

## Como trabalhar

- **Nome, texto e link são do Kelvi.** Usar exatamente o que ele passou. Não trocar o formato do nome por suposição sobre a plataforma. Antes de dizer que a plataforma não aceita, conferir um item existente.
- **Copy longa**: contar caracteres contra o limite da plataforma antes de subir. Se passar, propor o corte e mostrar ao Kelvi antes de usar.
- **Lote**: preencher o primeiro item, mostrar ao Kelvi e só seguir com os outros depois do OK. Se ele aprovar "todos", executar direto e conferir item por item.
- **Ação que sai para fora pede OK explícito na hora**: mandar template para a Meta, publicar automação, ativar webhook, publicar ou alterar oferta e checkout que já vendem, apagar qualquer coisa. Rascunho e preparação podem ser feitos antes.
- **Conferir no sistema, não no que foi digitado**: ler o campo gravado (DOM, API ou lista com status) e comparar com o texto aprovado. Só então dizer "feito".
- **Navegador**: usar o navegador do assistente com a sessão que o Kelvi logou (AC, ManyChat, Guru), numa aba própria, e fechar a aba no fim. Depois de navegar, tirar um screenshot antes do primeiro clique. Preferir elemento por ref do snapshot a coordenada. Ler o estado por `document.body.innerText`. Sessão caiu ou pediu 2FA: parar e pedir ao Kelvi para logar.
- **Lote longo** (10 ou mais itens): seguir a `execucao-orquestrada`.

## Registro de entregas

Ao fim de cada entrega, acrescentar a linha no dia de hoje em `memory/entregas/AAAA-MM.md` do workspace, no formato de [references/entregas.md](references/entregas.md). O que ficou pendente entra com `[ ]`. Isso vale sem o Kelvi pedir, porque é a rotina dele.

## Quando o Kelvi corrigir

Correção do Kelvi vira regra da skill na mesma hora, para o erro não se repetir:

1. Corrigir o trabalho.
2. Editar a referência do sistema (ou a seção "Como trabalhar", se a regra valer para tudo), no lugar onde o erro nasceu. Escrever a regra em uma linha, com o motivo concreto. Se uma linha antiga estiver errada, substituir em vez de somar.
3. Avisar em uma linha: "Atualizei a skill: <arquivo>, <regra>".

Também conta como correção:
- Descobrir sozinho que uma instrução daqui falhou (tela mudou, caminho de menu novo).
- Ver o Kelvi aprovar um jeito novo de fazer.

Não registrar o que só vale para aquela tarefa. Manter cada referência curta, porque linha que não muda a execução sai.

Editar a skill é editar `skills/copilot-adapta/` no workspace deste assistente. A mesma skill existe no Adapta Bot e no Adapta - OPS: registrar a regra também na `self-improvement` (escopo `skill:copilot-adapta`) para o Kelvi levar a mudança ao outro assistente.

## No Maestro

- Conectores deste assistente: ActiveCampaign (catálogo), n8n (catálogo; Flow Dev para editar workflow, Prod para ler a URL do webhook de produção), GitHub, Gmail. O "Planner de otimizações" era um conector da conta claude.ai e não está no catálogo do Maestro: sem ele, pedir ao Kelvi o MCP por URL ("Adicionar via URL") ou trabalhar pelo navegador.
- Navegador: skill `agent-browser` da biblioteca do Maestro, com as sessões do AC, ManyChat e Guru que o Kelvi logou. Login e 2FA são dele.
- Guru API: token em `GURU_API_TOKEN` (variável do assistente configurada pelo Kelvi). Nunca imprimir. Guru não tem conector no catálogo.
- Faltou conector, sessão ou token: dizer ao Kelvi o nome exato do que falta e parar só a parte que depende dele.
