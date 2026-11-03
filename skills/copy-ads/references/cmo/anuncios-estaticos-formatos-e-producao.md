---
date: 2026-09-11
tags: [marketing, anuncios, criativos]
---

# Estáticos — formatos, hooks e produção

Fonte: [[pesquisa-2026-09-11-triagem]], bloco A. Incorporado a pedido do Kelvi; pesquisa externa não refeita. Usar na fase 3 para produzir e na 5b para variar execução.

## O que o benchmark permite decidir

Motion Creative Benchmarks 2026: US$ 1,29 bi, 578.750 criativos, 6.015 contas, setembro/2025 a janeiro/2026. Base majoritariamente DTC e janela promocional. Winner = gasto ≥10× a mediana de gasto por criativo da conta e ≥US$ 500; hit rate calculado por conta, média não ponderada. Spend use ratio = participação no gasto ÷ participação no uso.

| Achado reportado | Uso no CMO |
|---|---|
| Text only em 1º; produto + texto em 2º; UGC em 4º; carrossel em último | Priorizar estático de texto como hipótese inicial. Não proibir carrossel nem declarar vencedor de venda por esse ranking |
| Offer-First Banner: 8,6% hit rate / 1,3 SUR | Candidato para oferta consciente no fino; no amplo conflita com hook sem promessa |
| Unboxing 9,8% / 1,3; demo 8,1% / 1,0; testimonial 6,5% / 1,0; celebrity 5,9% / 2,1 | Referência do conjunto estudado, não metas para infoproduto |
| Letter, Post-It e texto em posição inesperada: raros com concentração de gasto | Candidatos de formato para a porta vencedora |
| Contas <US$10 mil/mês: 2,8 estáticos/semana; top 25% 4,83 | Comparação de capacidade, não quota. Quantidade depende do orçamento para cada peça atingir as travas |
| US$10–50 mil/mês: 4,1 / 8,09; enterprise: 18,85 / 54,64 | Não importar meta de 20–50 peças por semana para conta pequena |

Hit rate mede alocação, **não ROAS**. Os percentuais de asset type 11,6%/8,75%/7,56% vieram de leitura secundária na conversa e não viram referência operacional. Ranking externo escolhe o próximo teste; compra e ROAS da conta escolhem o vencedor.

## Separar desejo, porta, hook e formato

- Desejo: o resultado que move a compra. Porta: problema, mecanismo, inimigo ou cena.
- Hook: como a entrada cria tensão. Formato: como a mensagem aparece na imagem.
- No amplo, escolher uma família visual para comparar as portas; manter oferta e corpo da LP conforme fase 3. Não transformar Post-It em quinto desejo/porta.
- Em 5b, variar formato dentro da porta vencedora. Manter uma execução de controle, registrar a hipótese e isolar a alavanca da rodada.

| Formato | Como executar | Quando ajuda |
|---|---|---|
| Texto sobre fundo / Headline | Uma frase dominante, qualificador legível, contraste | Argumento forte dispensa imagem explicativa |
| Letter | Carta curta, ritmo pessoal, assinatura real quando houver | Confissão ou descoberta em primeira pessoa |
| Post-It | Uma ideia curta em nota visual | Lembrete ou observação concreta |
| Texto em posição inesperada | Texto integrado ao contexto da cena, leitura imediata | Interrupção visual sem esconder qualificação |
| Listicle / comparação Us vs Them | Poucos itens ou contraste verificável | Tentativas antigas versus mecanismo |
| Statistic / Social Comments | Número com fonte ou comentário real autorizado | Prova disponível; não fabricar autoridade nem depoimento |
| Meme / Quiz / Grid Swap / Collage | Humor, pergunta ou sequência visual coerente | Hipótese de execução, sem ranking transferível de conversão |

Confession, Contrarian, Shocking Statement e Warning apareceram na banda de 6–11% de hit rate da pesquisa, junto dos promocionais. Para o amplo, preferir confissão/contraste que abram dúvida sem prometer resultado. Exemplo de construção (não depoimento): confissão de tentativa → detalhe que falhou → dúvida respondida na LP. Aviso exige risco real; choque exige fato sustentado.

## Contrato do lote

1. Entrada: desejo, belief, porta, dúvida, verbatim, prova, formato, placement e cabeça da LP.
2. Antes da imagem, aprovar headline, qualificador e conceito visual. Nicho na headline qualifica; não é garantia de sinal especial ao algoritmo.
3. Gerar com a ferramenta de imagem disponível. Templates orientam composição, nunca substituem pesquisa ou justificam instalar outra stack.
4. Salvar por ID da peça: copy, prompt, imagem, proporção, formato e versão. Galeria para revisão é útil em lote; não é obrigatória para quatro peças.
5. Revisar legibilidade em celular, texto renderizado, congruência, prova e destino. Conferir corte e sobreposições por placement.
6. Em 9:16, topo ~15% e base ~25% livres são ponto de partida do template; não regra universal para 1:1/4:5. Validar a prévia efetiva.

Referências de implementação da pesquisa: [arcads-claude-code](https://github.com/krusemediallc/arcads-claude-code), 37 templates; [Static-Ads](https://github.com/keith-wohnv/Static-Ads), 50 prompts e render em lote. Não instalados. Compatibilidade técnica dos templates não comprova performance. UI de Notes, busca ou conversa é inspiração visual; não apresentar endosso, publicação editorial ou conversa fabricada como autêntica.

O Corey classificou Notes fake-native como F-tier por atenção sem qualificação; os repos de produção oferecem o mesmo formato. Isso é conflito entre hipótese de performance e capacidade de render, não motivo para escolher um ranking como verdade. Testar somente quando o público se qualifica na própria peça.


## Foto, narrativa e abertura — decisão de 2026-09-11

Fonte: transcrição fornecida por Kelvi de “$300m of Meta Ads Hacks in Under 22 mins”, sem nova pesquisa externa. A transcrição ficou como anexo no Mac do Kelvi, fora do repo. Os pontos abaixo foram selecionados e qualificados pelo Kelvi nesta discussão.

**Aplicar à produção:**
- **Abertura no ponto alto:** localizar tensão/descoberta numa história ou depoimento real e começar ali; depois dar contexto e conectar à dúvida da LP. Testar aberturas mantendo imagem, corpo e destino. “11–14 palavras” é referência do vídeo, não limite: revisar o trecho visível antes de “ver mais”.
- **Foto real contextual + narrativa no texto principal:** alternativa ao texto diagramado na imagem. Ex.: foto do momento em que o fracasso apareceu → tentativa frustrada → descoberta → dúvida para a LP. É execução da porta “cena”, não porta adicional. Para esse formato, o ponto focal é a cena; não exigir headline sobreposta.
- **Identidade de quem anuncia:** quando houver fundador real, discutir teste da mesma peça e destino pela página dele versus marca. Registrar a página como variável; não executar troca de página/campanha sem pedido operacional.

**Pontos de discussão e teste — não descartar na ideação:**
- **Fofoca atrai leitura:** Kelvi considera uma via interessante, especialmente conforme o público. Explorar tensão social e curiosidade com conexão ao desejo/produto; avaliar compra e qualidade pós-clique, além da leitura. A força da entrada não dispensa uma transição convincente.
- **História conecta mais:** direção criativa valorizada pelo Kelvi. Explorar identificação, cena e transformação; discutir qual história aproxima esse público da oferta. Não reduzir história a enfeite nem assumir que elimina toda objeção.
- **“Saiba mais sempre vence”:** tese do autor que Kelvi quer manter como ponto favorável de discussão/teste. Priorizar “Saiba mais” como candidato para anúncio que vende o clique e LP que explica; comparar com controle por compra/ROAS. O “sempre” não vira resultado comprovado na conta.

Foto crua é aproveitável agora; superprodução e advertorial/página ponte ficam para discussão quando o estágio justificar. Não excluir outros formatos pelo argumento de que “o meio-termo morreu”.
