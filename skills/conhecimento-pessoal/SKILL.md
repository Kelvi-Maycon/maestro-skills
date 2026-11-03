---
name: conhecimento-pessoal
description: "Recupera e grava decisões, preferências e contexto do Kelvi na memória deste assistente no Maestro (MEMORY.md e pasta memory/ do workspace). Acionar quando o Kelvi citar memória, \"lembra\", \"o que já decidimos\", \"onde parei\", \"anota\" ou \"salva isso\", ou quando faltar contexto de projeto que pode estar salvo. Captura sozinha decisão, fato ou aprendizado novo e útil para ação futura, por append no arquivo certo. Não acionar em pedido autocontido; não cuida da fila de melhoria das skills (self-improvement)."
---

# Conhecimento pessoal

Cada assistente do Maestro tem a própria memória, no workspace do pod. Não existe memória compartilhada entre assistentes: o que outro assistente precisa saber vai pelo Kelvi.

## Onde fica

| Conteúdo | Arquivo |
|---|---|
| Preferência curta e durável do Kelvi para este assistente | `MEMORY.md` (memória nativa, carregada em toda sessão; manter curta) |
| Decisão com motivo | `memory/decisoes.md`, uma linha: `- AAAA-MM-DD \| <decisão> \| motivo: <por quê> \| pediu: <quem>` |
| Fato, regra ou fonte de um tema | `memory/contexto/<tema>.md` |
| Entrega de trabalho | `memory/entregas/AAAA-MM.md` |

Material de consulta fixo (contexto da Adapta, bases de copy, design system) fica nas skills, em `references/`, e não é editado por esta skill.

## Consulta
- Pedido autocontido dispensa busca. Faltando contexto salvo, buscar o termo (com sinônimos se o primeiro não achar) em `MEMORY.md` e `memory/`. Abrir só o trecho pertinente e conferir a validade. Ausência de resultado continua ausência.
- Para "onde parei": ler `memory/entregas/` do mês e `memory/contexto/<tema>.md`; data antiga não prova situação atual. Fato, hipótese e relato ficam distintos.
- Consulta não autoriza editar nem reorganizar arquivos.

## Captura
- Novidade com uso futuro concreto, percebida na tarefa: capturar sem pedir, seguindo a [captura](references/captura.md). Veto do Kelvi prevalece. Sem candidato útil, nenhuma gravação. Não resumir a conversa.
- Só append ou atualização do trecho do tema; nada é apagado.
- Reler o arquivo depois de gravar. Confirmar em uma linha: `Salvo em memory/<arquivo>.`

Nunca guardar segredo nem promover hipótese a fato. `self-improvement` mantém candidatos de melhoria das skills, `reflect` (só no Jarvis) consolida essas propostas e `compacta-resumo` preserva estado de tarefa: não duplicar as mesmas gravações.
