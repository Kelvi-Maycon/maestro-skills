---
name: design-loop
description: "Manual-only. Invocar explicitamente como /design-loop. Recebe um objetivo e uma referência real, mede os mecanismos que tornam a referência boa (bar.md) e roda builder, gate medido e críticos de contexto limpo por peça até o nível combinado. Nunca ativar automaticamente por menções a design, crítica, loop, referência ou melhoria."
disable-model-invocation: true
---

# Design Loop

Quatro fases: entrada, preflight, teardown, loop. Peça pequena encurta as fases; barra aberta e render real valem sempre. Não construir antes do `bar.md`.

## Invocacao

Manual: `/design-loop`, ou pedido explícito para usá-la. No Maestro não há subagente: crítico rápido e crítico forte são passadas do próprio assistente, cada uma com brief escrito do zero antes de abrir o artefato, sem reler o raciocínio do builder; o forte confere tudo de novo, com a ordem invertida quando houver comparação. Declarar na entrega que a crítica foi própria. Para crítica independente de verdade, o Kelvi pode abrir uma sessão nova do assistente só com contrato e artefato.

## Fase 1: Entrada

Três respostas. Perguntar só as que o pedido não trouxe, juntas numa mensagem, e parar até responder:

1. O que está sendo construído, e de que tamanho/duração?
2. Algo que já faz isso brilhantemente e que eu consiga abrir: página ou arquivo específico. Sem ideia, diz "pula".
3. Arquivo de partida: design system, brand doc, script, rascunho.

Referência vaga ("site da Apple", "SaaS bonito") → pedir UMA vez a página ou o arquivo exato. Barra vaga é a causa nº 1 de falha: o crítico inventa a comparação e aprova tudo na primeira rodada. "Pula" → propor 3 candidatas com 1 linha de porquê e esperar; sem resposta, assumir a mais difícil.

Nível-alvo: **atingir** o `bar.md` é o padrão. **Igualar** ou **vencer** a referência no cego só com pedido explícito.

## Fase 2: Preflight

Checagem, não pergunta. Rodar antes de qualquer trabalho e reportar num bloco só:

- **Abrir a barra agora.** Screenshot da URL ou leitura do arquivo. Bloqueada ou inexistente → avisar e pedir outra.
- **Renderizar e medir nosso output:** screenshots para site, filmstrip para animação, PDF para doc; em página web, rodar [medir.js](references/medir.js).
- **Ferramentas de geração** que o objetivo exige (imagem, vídeo, voz) conectadas.
- **Inputs existem:** design system, brand doc, script.

Imprimir o que funciona, o que falta e **qual checagem fica cega** por cada falta. Checagem cega é declarada e registrada no progress; nunca finge que votou.

Navegador: sessão única, screenshots e medição em lote por rodada (uma abertura, tudo de uma vez), porque automação de browser pesa no pod.

## No Maestro

- Navegador: skill `agent-browser` da biblioteca do Maestro. Medir: abrir a página, fixar o viewport e rodar `references/medir.js` (caminho relativo à pasta desta skill) com o `eval` do navegador. O JSON sai no stdout.
- Screenshot pelo mesmo navegador.
- Script Playwright próprio também serve, se houver `node` e Playwright no pod; o `medir.js` entra via `page.evaluate`.
- Gerador de imagem, vídeo ou voz ausente no assistente: a checagem fica cega e o Kelvi recebe o nome da ferramenta que falta.

## Fase 3: Teardown medido

Rodar `medir.js` na referência e escrever 5 a 7 **mecanismos** em `bar.md`, na pasta de trabalho. Cada linha traz o número medido e como conferir no nosso render:

- headline 5x o corpo (80px sobre 16px), três tamanhos de tipo no total
- uma cor de acento, no máximo 2 usos por tela
- nada anima em menos de 400ms
- whitespace acima da dobra ≥ 40% do frame

Mecanismo, não adjetivo: "parece premium" é inútil. O que o script não mede (ritmo, hierarquia, direção do movimento) entra descrito pelo que se vê no render. Mostrar `bar.md` ao Kelvi antes de continuar.

## Fase 4: Loop

Dividir nas menores peças que podem ser melhoradas e julgadas sozinhas; máximo 3-4 salvo pedido. Um dono por peça; peças acopladas avançam em série. Com a direção visual em aberto, a primeira peça nasce em até 3 direções em paralelo, escolha às cegas, e o resto segue a vencedora.

Cada rodada sobe do barato ao caro e para no primeiro degrau que reprova:

1. **Gate medido, sem agente.** `medir.js` no nosso render: estouro horizontal, texto cortado ou colidindo, contraste baixo em texto de leitura, valor fora do design system, mecanismo numérico do `bar.md` fora do alvo. Achado confirmado no screenshot volta ao builder com a medição.
2. **Crítico de craft, rápido.** Recebe só `bar.md` + nosso render e o da referência lado a lado, em ordem aleatória e sem rótulo, com crop das regiões de detalhe fino. Antes de olhar, escreve o que vai conferir em cada mecanismo. Devolve passa ou falha por mecanismo, com a região, e o único maior gap.
3. **Promoção, crítico forte.** Só quando o craft passa: um crítico confirma o craft com a ordem invertida; outro recebe só objetivo + render e diz se a peça faz o que precisa. Regra do design system que o script não mede ganha um terceiro, com design system + render.

Regras:

- Cada crítico é uma passada nova com brief escrito do zero para este objetivo. Não usa o raciocínio do builder, de rodada anterior, nem o código: só o que o brief do crítico permite (barra, renders, objetivo).
- Crítico é duro; elogio não serve. Veredito binário por mecanismo; nota infla a cada rodada.
- O rápido reprova sozinho. Aprovação só vale com o forte.
- Rejeição do Kelvi já registrada para esse tipo de peça entra no brief do crítico como reprovação direta (ex.: drop cap gigante).
- **Campeã:** guardar render e arquivos da melhor versão de cada peça. A nova só assume se fechar um mecanismo sem abrir outro; no empate, cego entre as duas. Senão, restaurar a campeã.
- **Crítico carimbador:** uma vez por run, mandar um render com defeito plantado. Se passar, reescrever o brief antes de aceitar aprovação.
- **Anti-stall:** mesmo gap pela 2ª vez → medir no render a afirmação do crítico, que pode estar errada, e mudar a abordagem. Pela 3ª → parar, mostrar o histórico e perguntar.

Saída, sem número fixo de rodadas:

- **Atingir:** gate limpo, todos os mecanismos e o objetivo aprovados pelo crítico forte, e as peças aprovadas juntas no render integrado. Peças que vencem sozinhas podem não fechar juntas.
- **Igualar:** além disso, o crítico forte não aponta gap material no cego.
- **Vencer:** o crítico forte escolhe o nosso no cego, nas duas ordens. Contra referência de ponta isso pode não chegar; ao bater o teto, entregar a campeã e os gaps.

Manter `progress.md` na pasta de trabalho, atualizado a cada rodada: status e campeã por peça, medição, veredito por mecanismo, histórico de gaps, rodadas, checagens cegas.

## Custo

Não existe custo de token auto-reportado confiável; mostrar rodadas, chamadas de crítico e peças concluídas. Teto nomeado pelo Kelvi é checkpoint: pausar e perguntar antes de passar. O freio real é ele acompanhando e parando o run.

## O que quebra o método

- Barra vaga. De longe a falha mais comum.
- Builder julgando o próprio trabalho.
- Crítico chamado para um render que o gate já reprovou.
- Entregar a última versão em vez da campeã.
- Número fixo de rodadas, ou "vencer" como saída padrão.
- Especificar demais o builder: cada instrução extra é uma decisão a menos que o modelo toma com o próprio julgamento.
