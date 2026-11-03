# Modo corrigir: erros em massa

## Objetivo

Zerar lotes de erros pela causa raiz, com build/typecheck/lint/testes verdes e sem supressão paliativa.
A chamada deve trocar reatividade por mapa completo, correção em lote e prova final.

- Mapeie tudo antes de editar para achar cascatas.
- Corrija primeiro as causas que apagam mais sintomas.
- Finalize só com prova fresca dos checks relevantes e resumo de causas.

O programa está com muitos erros. Seu trabalho é derrubá-los TODOS de forma sistemática: vasculhar o codebase, agrupar por causa raiz e corrigir em lote. Nunca corrigir um a um de forma reativa, nunca parar no primeiro erro.

Escopo (opcional): o texto que vier depois do comando.
Se vazio, trate o codebase inteiro. Se preenchido, restrinja a esse módulo/pasta/tipo de erro.

Objetivo operacional: build + typecheck + lint + testes 100% verdes, zero regressão, zero supressão de erro. Esse é o ÚNICO estado de "pronto". Não pare antes. Não declare sucesso sem prova de execução colada.

Trabalho de cobertura ampla. No Maestro, sem subagentes: vasculhar módulo por módulo, salvando a lista de erros classificados em arquivo; cada fix passa por verificação (rodar o check que o reprovou) antes de seguir; a síntese final consolida o mapa de causas.

## Método

1. INVENTÁRIO COMPLETO primeiro. Rode todos os checks que o projeto tiver (build, typecheck, lint, testes) e capture TODOS os erros com arquivo:linha e mensagem. Não toque em nada antes de ter o mapa inteiro; corrigir antes de mapear é apagar incêndio sem saber onde pega fogo.
2. CLASSIFIQUE por causa raiz, não por sintoma. N erros quase sempre vêm de poucas causas. Suspeitos típicos de cascata:
   - Import/módulo quebrado ou path errado -> dezenas de "não encontrado".
   - Tipo/interface renomeado ou alterado -> erro em todo consumidor.
   - Assinatura de função/API mudada -> todo call site quebra.
   - Dependência faltando, versão incompatível ou breaking change.
   - Config/env/tsconfig/build setup.
   - Null/undefined, estado/async, contrato de dados.
   - Teste desatualizado (o código está certo, o teste é que envelheceu).
3. PRIORIZE pela cascata. Ataque primeiro a causa que, resolvida, apaga mais erros de uma vez. Após cada fix, re-rode e meça quantos sintomas sumiram juntos.
4. CORRIJA a causa, NUNCA o sintoma. Investigue até a raiz (leia o stack, o git blame, o uso real, a definição) antes de escrever qualquer linha. Sem causa clara, investigue mais; proibido fix paliativo só pra o erro sumir.
5. RE-RODE após cada lote. Confirme a contagem caindo e que NENHUM erro novo surgiu. Regressão conta como falha.
6. LOOP até o objetivo operacional: inventário -> causa -> fix -> verificação, repetir até tudo verde.

## Proibido

- Mascarar erro: ts-ignore, @ts-nocheck, eslint-disable, catch/except vazio, try sem tratamento, default fabricado, optional chaining só pra calar o type checker. Se precisar suprimir, é porque não achou a causa.
- Deletar, pular (skip/xfail) ou enfraquecer teste/assert pra passar.
- Mudar escopo, comportamento observável ou API pública pra silenciar erro.
- Refatorar ou "melhorar" código que não está quebrado. Cada linha alterada rastreia a um erro real.

## Quando escalar

Pare e pergunte ao usuário SÓ em ambiguidade real:
- O fix exige decisão de produto/design (duas correções válidas com comportamento diferente).
- O erro vem de um teste que parece testar a coisa errada: aponte e confirme antes de mexer no teste.
- O erro depende de credencial/env/serviço externo a que você não tem acesso.

Caso contrário, decida e siga.

## Saída

1. MAPA DE CAUSAS RAIZ: cada causa -> quantos/quais erros ela gerava.
2. FIXES aplicados, agrupados por causa, com o porquê de cada um (1 linha).
3. PROVA FINAL: output real de build/typecheck/lint/testes, todos verdes. Sem o output colado, o trabalho NÃO está pronto.
4. Se algo ficou de fora (erro não resolvido, decisão escalada, check que não pôde rodar): diga explícito, não esconda.
