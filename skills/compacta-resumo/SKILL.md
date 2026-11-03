---
name: compacta-resumo
description: Preserva decisões, estado, erros e próximos passos em handoff/HANDOFF.md antes de compactar, quando solicitado ou houver risco real de perder continuidade. Exige permissão de escrita; não usar em tarefa somente leitura.
---

Em tarefa somente leitura, não escrever fila, memória ou handoff. Preservar o estado na conversa; a skill não amplia autorização de escrita.

## Objetivo

Preservar o estado util antes de compactar, deixando handoff suficiente para retomar sem reexplicar.
A chamada deve reconciliar decisoes, estado e erros, removendo o que ficou obsoleto.

## Como melhorar a entrega
- Salve so o que muda a retomada: decisao vigente, estado atual e erro que nao pode repetir.
- Atualize no lugar quando algo mudou; duplicata e historico morto atrapalham a proxima sessao.
- Avise curto que o handoff esta pronto para compactar, sem narrar processo.

Modo handoff. Antes de a sessão compactar (ou de o Kelvi abrir uma sessão nova do assistente), você atualiza o handoff de estado do trabalho atual pra o conhecimento importante sobreviver. Você não dispara a compactação; só prepara o handoff e avisa.

## O que fazer
1. Arquivo: `handoff/HANDOFF.md` na raiz do projeto em que está trabalhando (repo clonado em `work/<projeto>/`); sem projeto, `handoff/HANDOFF.md` no workspace do assistente.
   - Usar o caminho literal, sem ajustar espaço ou acento: `Controle dos Funis - Adapta ` (espaço no fim) e `Controle dos Funis - Adapta` são pastas diferentes (erro de 24/09).
2. Se não existir, criar pasta + arquivo com as 3 seções.
3. **Reconciliar, não append cego** — ler o arquivo atual e:
   - Adicionar o que é novo e importante desta sessão.
   - **Corrigir/substituir** item que mudou (ex: caminho trocou → atualiza no lugar, não duplica).
   - **Remover** o que ficou obsoleto/errado.
4. Salvar enxuto e avisar curto: *"Handoff atualizado, pode compactar."*

## Estrutura (1 arquivo, 3 seções)
- `## Decisões` — verdade vigente do projeto; corrige quando muda.
- `## Estado` — onde a implementação parou agora; sobrescreve, sempre 1.
- `## Erros/becos` — o que já falhou, pra não repetir; append **+ poda** (máx ~10, remove o resolvido).

## Formato (anti-prolixo, regra dura)
- Uma linha por item. Sem parágrafo, sem justificativa longa.
- Cada item começa com data curta `[DD/MM]`.
- Proibido item que repete o que outro já diz.
- Pedido, aprovação ou decisão só vai no nome do Kelvi com fala dele no trecho; sem fala, registrar como estado (24/09: handoff atribuiu a ele um pedido que não fez).
- Só decisões/fatos/schemas/estado que importam pra retomar. Zero vaidade.
- Seção sem novidade relevante → não escrever nada nela.
- Limite: até ~8 KB (`wc -c handoff/HANDOFF.md`). Passou disso, mover para `handoff/arquivo/AAAA-MM-DD.md` o que não muda a próxima retomada (frente encerrada, erro resolvido, detalhe histórico) e deixar uma linha em `## Decisões` apontando o arquivo. O HANDOFF é relido depois de cada compactação; cada KB custa contexto.
