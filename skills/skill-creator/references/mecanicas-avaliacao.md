# Mecânicas, orçamento e avaliação

## Índice
1. Orçamento real
2. Acionamento e qualidade
3. Baseline e isolamento
4. Otimização de descrições
5. Ferramentas, instruções e distribuição

## 1. Orçamento real

Medir o prompt/listagem efetivos do runtime, separando descrição, corpo carregado, resultados de ferramenta e histórico. Não assumir orçamento universal de 16.000 caracteres, 109 caracteres de overhead, 100 tokens por skill ou custo zero de script. Cache e limite de uso também não são sinônimos de tamanho de contexto.

No Maestro, o loader recusa nome com mais de 64 caracteres ou fora de `^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$` e descarta skill sem descrição ou com descrição acima de 1024 caracteres. Limites de outros runtimes dependem da versão. Verificar documentação atual antes de alterar orçamento.

Uma instrução longa se justifica se poupa erros/reimplementação verificáveis: sequência frágil, contrato de saída ou método específico. Tamanho sozinho não mede utilidade. Agregar modalidades em uma skill funciona quando o ponto de entrada escolhe só os módulos pertinentes.

## 2. Acionamento e qualidade

Undertriggering e ativação indevida são hipóteses a medir no ambiente atual, não taxas universais. Não usar percentuais herdados de 20%, 55%, 84% ou 90% sem experimento identificável. Uma descrição curta pode funcionar bem; uma longa pode diluir o sinal.

Avaliar quatro dimensões:
- Acionamento: entra no pedido adequado e fica fora dos próximos, porém diferentes.
- Isolamento: funciona sem contexto do autor e sem arquivos ausentes.
- Coexistência: não rouba função de outra skill nem degrada seu resultado.
- Execução: produz o contrato de saída e respeita intenção, limites e autorização.

## 3. Baseline e isolamento

Para afirmar melhora de comportamento, comparar tarefas equivalentes: versão antiga versus nova (ou com versus sem skill), mesmo input e critérios úteis. Avaliador independente recebe tarefa, skill e matéria-prima; não recebe a resposta desejada. Distinguir checagem estática, revisão do autor e execução independente.

Dimensionar amostra, agentes e repetição ao risco e ao orçamento autorizado. Edição pontual não exige bateria de inferências. Quando agentes forem usados, respeitar modelo e paralelismo autorizados no harness; não inferir disponibilidade pelo nome do aplicativo.

Registrar pass/fail com evidência, qualidade observada, tempo e tokens quando fornecidos. Não inventar metadados ausentes nem usar teste que só verifica frases escritas na própria skill. Repetir por mudança/falha/dúvida concreta, não até obter um resultado favorável.

## 4. Otimização de descrições

Aplicar a skills automáticas quando houver necessidade demonstrada. Montar prompts reais positivos e near-misses negativos; separar conjunto usado na otimização do conjunto reservado para avaliação. Variações do mesmo caso devem ficar no mesmo conjunto para reduzir vazamento. Uma divisão como 60/40 e múltiplas execuções podem ajudar, mas não são quotas obrigatórias.

Os scripts automáticos de otimização dependiam de uma CLI `claude -p` e ficaram fora da cópia do Maestro; o teste de acionamento é manual, em sessão nova do assistente. O detalhamento operacional, esquemas JSON e viewer estão ligados no SKILL.md. Não disparar otimização paga para uma fusão documental.

Preferir evidência em casos reservados à taxa no treino. Corrigir a falha que mudou a decisão; não encher a descrição de keywords para decorar o conjunto de teste.

## 5. Ferramentas, instruções e distribuição

Instrução global registra invariantes universais; skill registra procedimento sob demanda; MCP dá acesso/capacidade; plugin distribui recursos. São complementares. A carga das ferramentas depende de descoberta e carregamento do runtime: não afirmar que todo MCP injeta todas as ferramentas em toda chamada, nem prometer economia percentual ao trocá-lo por uma skill.

Na fusão, preservar scripts, templates, contratos e métodos distintos; eliminar entradas redundantes e atualizar referências/catálogos. Backup recuperável fica fora das pastas de descoberta. Conta sincronizada e plugin podem restaurar cópia removida localmente: verificar a origem antes de encerrar.

