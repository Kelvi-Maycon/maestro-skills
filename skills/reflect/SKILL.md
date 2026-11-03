---
name: reflect
disable-model-invocation: true
description: 'Manual-only: /reflect, no Jarvis. Consolida filas de melhoria (a do próprio Jarvis e as que o Kelvi colar de outros assistentes) em mudanças propostas para skills, system prompts e SOULs dos assistentes do Maestro, entregues como pacote para o Kelvi aplicar. Nunca aplica nada em outro assistente.'
---

## Objetivo

Destilar correções recorrentes em melhoria durável das skills e regras dos assistentes do Kelvi no Maestro, sem transformar ruído de sessão em regra global nem criar conflito com regra existente.

Manual e sensível: só roda com `/reflect` explícito ou pedido direto do Kelvi. No Maestro não há repositório compartilhado nem acesso de um assistente aos outros: o Jarvis prepara as mudanças e o Kelvi aplica em cada assistente (Habilidades, Configuração).

## Fontes

1. `memory/fila-melhoria.md` do Jarvis (linhas `- [ ]`).
2. Filas de outros assistentes que o Kelvi colar ou anexar no chat (mesmo formato da `self-improvement`).
3. `memory/decisoes.md` e `memory/contexto/` do Jarvis, para conferir se a entrada contradiz decisão registrada.
4. Skill afetada: a cópia instalada no Jarvis (`skills/<nome>/`) quando existir; senão, pedir ao Kelvi o `SKILL.md` atual daquele assistente antes de propor mudança.

Processar no máximo 10 entradas abertas por rodada, das mais antigas para as mais novas.

## Níveis de autonomia

| Alvo | Decisão | Condição |
|---|---|---|
| Skill: passo faltando, exemplo, bug, referência quebrada | entra no pacote | falha real observada |
| Descrição/gatilho de skill, regra que vale para vários assistentes, arquivo de `references/` | entra no pacote com trava | recorrência em 2+ entradas ou "sempre/nunca" explícito do Kelvi; até ~3 linhas por item |
| System prompt ou SOUL de um assistente | só sugere | texto proposto para o Kelvi colar em Configuração |
| Conectores, canais, modelo, cron, apagar skill | só propõe | lista de propostas |

## Regras anti-degradação

- Nunca reescrever arquivo inteiro: só delta localizado. Guardar a versão anterior em `artifacts/reflect-AAAA-MM-DD/antes/`.
- Erro que se repete com a regra já escrita: reescrever a regra no lugar ou propor mecanismo determinístico. Nunca empilhar uma segunda versão da mesma regra.
- Entrada aplicada, rejeitada ou arquivada é marcada como processada; nada é apagado.

## Classificação

- Vale em todo assistente: regra para os system prompts (sugestão por assistente).
- Vale só num assistente (papel, tom, público): sugestão de system prompt/SOUL daquele assistente.
- Padrão de uma disciplina (visual, copy, dados, navegador): a skill correspondente.
- Material de consulta (base do CMO, guia de copy, contexto da Adapta): o arquivo em `references/` da skill.
- Preferência ou fato que não é regra: não entra; vai pela `conhecimento-pessoal`.
- Ruído, tarefa pontual ou já coberto: `rejeitada` ou `ja-coberta`.

## Anti-conflito (antes de gravar)

1. Buscar regra existente sobre o mesmo tema nas skills e na memória do Jarvis.
2. Regra igual existe: `ja-coberta`.
3. Regra existe mas diverge: a correção mais nova vence; editar a antiga no lugar.
4. Não existe: adicionar 1 linha na seção apropriada.
5. Skill instalada em mais de um assistente: a mudança vale para todas as cópias; listar quais assistentes precisam receber.

## Workflow

1. `D=$(TZ=America/Sao_Paulo date +%F)`; pasta `artifacts/reflect-$D/`.
2. Para cada skill alterada: `artifacts/reflect-$D/skills/<nome>/` com a versão nova completa e `artifacts/reflect-$D/antes/<nome>/` com a anterior.
3. `artifacts/reflect-$D/LEIA.md`: por entrada, origem (assistente e data), mudança, nível e evidência; depois, por assistente, o que o Kelvi precisa fazer (instalar/atualizar skill X, colar texto Y no system prompt), e as propostas que dependem dele.
4. Zip `artifacts/reflect-$D.zip` com `skills/` para o Kelvi subir pelo chat de cada assistente.
5. Verificar (abaixo) e marcar as entradas da fila do Jarvis como processadas. Entradas de outros assistentes: listar no `LEIA.md` quais marcar lá.

Sem entrada aberta: responder numa linha, sem criar pasta.

## Verificação obrigatória

1. Frontmatter de cada `SKILL.md` alterado: `name` igual à pasta, regex `^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$`, até 64 caracteres; `description` presente e até 1024 caracteres; `disable-model-invocation` sem mudança não pedida.
2. `python3 -m py_compile` em `.py` e `bash -n` em `.sh` alterados.
3. Diff entre `antes/` e a versão nova mostra só o esperado.

Falha: corrigir e rodar de novo. Bloqueio real: não marcar a fila; reportar `parcial` com o gap exato.

## Poda

Para cada regra global proposta, conferir se houve correção ou violação relacionada nos últimos 30 dias; sem isso, listar como `candidata a poda` no `LEIA.md`. Remoção só com o Kelvi aprovando. Nunca podar: limites de ação, frases proibidas, formato de verificação.

## Limpeza

Entrada tratada vira `- [x]` e ganha `| processado=<aplicada|rejeitada|ja-coberta|proposta-ao-kelvi> | pacote=reflect-<data>`. Nada é apagado.

## Saída

1-2 linhas: N entradas processadas, X mudanças no pacote (caminho do zip), Y propostas, W descartadas; verificação verde ou gap exato. Textos sugeridos de system prompt/SOUL em seguida.
