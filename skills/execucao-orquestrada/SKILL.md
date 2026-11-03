---
name: execucao-orquestrada
description: "Organiza trabalho de mais de um passo num assistente do Maestro, que roda sozinho, sem subagentes: escolhe o nível (simples, médio, complexo, pesado), mantém a lista de execução, separa leitura volumosa em arquivo, trata lote operacional e mensagens no meio da tarefa e fecha com prova. Acionar ao implementar feature, criar ou refazer peça visual, corrigir bug que toca mais de um arquivo, investigar, auditar, gerar relatório, ler 3+ fontes, JSON, log ou banco volumoso, em lote de 10+ chamadas da mesma ferramenta e na terceira rodada de ajustes no mesmo entregável. Pular tarefa simples e localizada."
---

# Execução orquestrada (Maestro, sem subagentes)

No Maestro cada assistente roda num pod próprio e não abre subagentes nem delega para outro assistente. Esta skill mantém o método de trabalho do Kelvi sem fingir delegação: o próprio assistente planeja, executa, confere e entrega com prova.

## Escolher o nível

- **Simples:** mudança localizada, caminho claro, pouca leitura e conferência direta. Executar direto, sem lista.
- **Médio:** caminho claro, mais de um arquivo ou leitura relevante. Lista de execução curta e prova por item.
- **Complexo:** várias partes dependentes, ambiguidade importante ou investigação de causa. Plano em uma frase ou poucos itens, critérios de aceite escritos antes de começar, execução por partes, prova de cada parte e da integração.
- **Pesado:** complexo com alto risco (migração, dados, auth, pipeline de geração, muitos consumidores) ou falha que voltou sem solução. Igual ao complexo, mais: mostrar o plano ao Kelvi antes da primeira mudança e parar a cada etapa irreversível.

Diagnóstico que termina em implementação com mais de uma parte é complexo: reavaliar o nível na hora em que a correção começa, aproveitando a investigação feita. Ler um arquivo curto ou ter um diff pequeno não define o nível.

## Lista de execução

- Obrigatória com duas ou mais ações. Criar antes da primeira edição.
- Um item por ação delimitada. Usar a ferramenta de tarefas do runtime quando existir; sem ela, lista numerada na resposta.
- Atualizar quando o estado muda: em andamento ao começar, concluído só com prova, bloqueado com o motivo. Item descoberto no caminho entra na hora.
- Na entrega, nenhum item fica em aberto sem explicação.

## Leitura volumosa

Conta como volumosa: três ou mais fontes, página inteira, JSON grande, log, planilha ou banco com centenas de linhas.

1. Escrever antes a pergunta, o recorte (fontes, período, tema) e o formato da resposta.
2. Salvar o bruto em arquivo no workspace (`artifacts/` ou `work/`) e trazer para a conversa só o trecho necessário, com fonte e trecho literal.
3. Interpretar a partir do resumo. Na dúvida sobre um achado, abrir só o trecho no arquivo bruto; não refazer a coleta.

## Investigação e relatório

Pedido de investigação, auditoria, análise de site ou sistema, verificação de erros ou relatório: reproduzir, examinar e entregar conclusão, problemas ranqueados com evidência, o que está correto, hipóteses, lacunas e caminho do relatório completo. Não corrigir sem pedido de correção. Pedido de correção depois do relatório reavalia o nível.

## Lote operacional

Sequência de 10+ chamadas da mesma ferramenta ou fluxo (anúncios, imagens, SQL em série, domínios, páginas no navegador, script em vários alvos):

1. Definir a lista de itens (ou a regra que a gera), parâmetros fixos, critério de sucesso por item e o que fazer na falha.
2. Fazer o primeiro item, mostrar ao Kelvi quando houver efeito externo e seguir com o resto depois do OK.
3. Retorno em tabela curta: item, resultado, ID ou caminho, falhas com motivo. O bruto fica em arquivo.
4. Escrita em dados externos continua exigindo a autorização do Kelvi para aquele alvo e ambiente.

## Rodadas de ajuste

Na terceira rodada de ajuste no mesmo entregável (copy, imagem, página, query): parar, transformar o feedback acumulado do Kelvi em critérios escritos e conferir a próxima versão contra todos eles, não só contra o último pedido.

## Mensagens no meio da execução

- Mensagem do Kelvi com trabalho em andamento: responder em uma linha antes da próxima ferramenta.
- Parar, cancelar ou reprioritizar vale na hora.
- Pergunta ou ajuste de outro escopo entra na lista com o próprio item; o trabalho principal não é reiniciado.
- Nenhuma ferramenta segura o turno por mais de ~60 s sem aviso; comando longo é avisado antes.

## Revisão sem contexto limpo

Sem subagente, a crítica é do próprio assistente. Quando a qualidade for decisiva: escrever o que vai ser conferido antes de olhar o artefato, conferir item por item com evidência e declarar na entrega que a revisão foi própria. Se o Kelvi quiser revisão independente, sugerir abrir uma sessão nova do assistente só com o contrato e o artefato.

## Execução e custo

- Contexto mínimo: reaproveitar leituras e provas ainda válidas; repetir só com mudança, falha ou dúvida concreta.
- Esta skill não autoriza API paga, instalação de infraestrutura, publicação ou escrita em dados externos.

## Encerramento

Antes da resposta final, parar o que a tarefa abriu: servidor local, processo em background, sessão de navegador de teste, worktree temporário. Processo que já existia fica. Manter rodando só com pedido do Kelvi, dizendo o que ficou, onde (porta ou URL) e como parar.

Entrega: resultado, onde está (arquivo, branch, PR, URL), prova (`Verificado: <prova>.`, `Não verificado: <motivo>.` ou `Falhou: <comando>; <erro>.`) e pendências.
