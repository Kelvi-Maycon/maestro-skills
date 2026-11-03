---
name: dev
description: 'Manual: /dev. Desenvolvimento em 4 modos: planejar (ideia, PRD, SPEC), iniciar projeto (SPEC, scaffold, docs), documentar projeto existente e corrigir erros em massa.'
disable-model-invocation: true
---

# dev

Um comando, quatro modos de desenvolvimento. Esta entrada escolhe o modo; o procedimento de cada um está no arquivo do modo.

## Modos

| Modo | Quando | Entrada | Saída | Arquivo |
|------|--------|---------|-------|---------|
| planejar | Ideia solta ou feature nova que precisa de PRD e SPEC | Ideia, ou codebase + feature | PRD.md, SPEC.md (e implementação, no Passo 3) | [references/planejar.md](references/planejar.md) |
| iniciar | PRD + SPEC aprovados, projeto ainda não existe | PRD.md, SPEC.md | Repo com git, scaffold, docs, arquivo de instruções, config, Fase 1 | [references/iniciar.md](references/iniciar.md) |
| documentar | Projeto existente sem base de conhecimento viva | Código/DB real | docs/, handoff/, índice no arquivo de instruções | [references/documentar.md](references/documentar.md) |
| corrigir | Muitos erros de uma vez (build, typecheck, lint, testes) | Codebase, escopo opcional | Checks verdes, mapa de causas, prova | [references/corrigir.md](references/corrigir.md) |

## Como escolher o modo

1. Primeira palavra depois do comando é `planejar`, `iniciar`, `documentar` ou `corrigir`: use esse modo. O resto do texto que vier depois do comando é o argumento do modo.
2. Sem palavra de modo: deduza pelo pedido, usando a coluna "Quando" da tabela.
3. Ambíguo (ex.: "começa o projeto X" sem dizer se há SPEC; "arruma o projeto" sem dizer se são erros ou docs): pergunte ao Kelvi antes de agir, uma pergunta só, oferecendo os modos candidatos.

Antes de agir, leia o arquivo do modo inteiro. Ele é o procedimento; esta página não substitui.

## Sequência natural

```
planejar (PRD -> SPEC) -> iniciar (scaffold, git, documentar, config, Fase 1)
documentar  : sozinho, para projeto existente
corrigir    : avulso, a qualquer momento
```

- `iniciar` já inclui `documentar` (etapa 4); não rode os dois em sequência.
- `planejar` em codebase existente (feature nova) pula `iniciar` e vai direto ao Passo 3 de [references/planejar.md](references/planejar.md).
- Entre passos que pedem contexto limpo, o Kelvi abre uma sessão nova do assistente e reenvia só o artefato do passo anterior.

## Regras comuns

- Arquivo de instruções do projeto: `CLAUDE.md` se o projeto for trabalhado no Claude, `AGENTS.md` nos demais agentes. Na dúvida, perguntar ao Kelvi qual agente vai tocar o projeto.
- Ferramenta de plano: a lista de tarefas da sessão.
- Tudo vem da fonte real (SPEC, código, DB). Não inventar dependência, tabela, decisão ou convenção; na dúvida, marcar "a confirmar".
- "Pronto" só com prova executada: exit code real de typecheck/lint/test/build colado na resposta. Auto-avaliação não conta.
- Nível e lista de execução seguem a skill `execucao-orquestrada` (no Maestro, sem subagentes). A `dev` define o que fazer, não o roteamento.
