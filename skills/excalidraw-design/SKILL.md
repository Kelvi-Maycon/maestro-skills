---
name: excalidraw-design
description: Usada quando for fazer diagrama, fluxograma ou fluxo no Excalidraw.
---

# Excalidraw Design

O padrão visual está em duas cenas de referência:
- AC 293 v2, horizontal: `https://app.excalidraw.com/s/7lM1eQVE1hh/76ryOwYppw9`
- AC 293 v4, vertical: `https://app.excalidraw.com/s/7lM1eQVE1hh/4PaM4ckJ0Xx`

Cada passo é um card com ícone, título, uma linha de dado e o horário. Os cards do mesmo trecho ficam num contêiner, e os trechos ficam em faixas de seção. Copiar esse acabamento; não inventar estilo novo.

## Fluxo no Excalidraw+ (conector Excalidraw)

1. `read_freeform_format` uma vez na sessão. Não usar `create_diagram`. A fonte 6 (Nunito) desta skill vale mesmo que o guia do servidor só cite 5, 7 e 8.
2. Cena nova com `create_collection_scene` na coleção "Fluxos completos" (`collectionId: "4DJSXZ2y11j"`) quando não houver outra indicação. Não usar `"private"`: o Kelvi não acha a cena lá. Nunca sobrescrever cena existente; versão nova leva "v2", "v3" no nome.
3. Desenhar com `edit_scene_content`, uma seção por chamada. Setas presas às caixas nas duas pontas (`startBinding`/`endBinding`).
4. Ícones depois dos cards (ver Ícones).
5. Checar largura de texto (ver Texto que cabe) com os `width` que o `edit_scene_content` devolve. Para trocar um texto, apagar e adicionar de novo com os mesmos `groupIds`: `update` de `text` não recalcula a largura.
6. **Reindexar o empilhamento.** O servidor não respeita a ordem das chamadas e o fundo pode tapar o resto. Um `update` final grava `index` em sequência (`"b00"`, `"b01"`…) nesta ordem: fundo → faixas → contêineres → cards → textos → setas → ícones → badges (elipse, depois o número).
7. `take_screenshot` da cena e corrigir. O print cabe em 1920 × 1080; em cena vertical sai estreito e o texto pequeno não se lê, então texto se confere pelos números do passo 5.
8. Entregar o link `https://app.excalidraw.com/s/7lM1eQVE1hh/<sceneId>` e o PNG.

HTTP 429 ou ECONNRESET: esperar ~3 s e repetir a mesma chamada.

## Base

- `fontFamily: 6` (Nunito) em todo texto. `roughness: 0`, `opacity: 100`, `fillStyle: "solid"`.
- `roundness: {type: 3}` em tudo que é retângulo, menos o fundo.
- Fundo: retângulo `#F7F4EE` sem borda e sem roundness, cobrindo a cena (a ferramenta não troca `viewBackgroundColor`).
- Texto principal `#1D1D1B`, texto secundário `#5A5952`. Nunca preto ou branco puro em área grande.
- Setas retas, `#5A5952`, `strokeWidth: 2`, `endArrowhead: "triangle"`. Rótulo ("SIM", "NÃO", "8h") em texto solto 16px `#5A5952`, a 12px da seta.

## Peças

| Peça | Tamanho | Borda / fundo | Texto |
|---|---|---|---|
| Título da cena | — | — | 44px `#1D1D1B`; subtítulo 16px `#5A5952` logo abaixo |
| KPI no topo | — | — | número 30px `#1D1D1B`, rótulo 16px `#5A5952` embaixo; colunas a cada 236px |
| Faixa de seção | largura do conteúdo + 24 de respiro | `#CBC6BB` 1px / `#F1EEE7` (alternar com `#EEEAE2`) | título 22px no canto superior esquerdo; subtítulo 16px `#5A5952` em x = título.x + largura do título + 12 (segunda passada, depois de saber a largura) |
| Faixa em destaque (o teste, o caminho crítico) | idem | `#F05A37` 2px / `#FDF0EB` | idem |
| Contêiner de grupo | 320 × (16 + n·72 + (n−1)·12 + 16) | `#CBC6BB` 1px / `#FFFDFA` | — |
| Card | 288 × 72, a 16px da borda do contêiner, 12px entre cards | cor do tipo, 2px | ver layout abaixo |
| Card de decisão | 288 × (56 + 20 por linha de dado) | `#946200` 2px / `#FFF3D6` | título curto 18px ("Fora das listas?", "Tag de controle?") + até 4 linhas de dado 16px com `\n`; a regra real (nome da lista, tag, campo) vai no dado, e nome sem espaço maior que 28 caracteres quebra no `_` |
| Card de aviso / saída sem envio | 288 × 72–130 | `#C42B3E` 2px / `#FBE9EB` | — |
| Card de meta (sucesso) | 288 × 72 | `#245E2B` 2px / `#245E2B` | título `#FFFFFF`, dado `#E3EDE4`, ícone branco |
| Não resolvido | 288 × ~132, sem ícone | `#807B70` 1px tracejado / transparente | título 18px + itens 16px |
| Badge numerado | ellipse 28 × 28 | `#C42B3E` / `#C42B3E` | número 16px `#FFFFFF` em x = badge.x + 14 − largura/2 (o servidor ignora `textAlign`) |
| Pontos de atenção | coluna lateral de 360px | — | título 22px `#C42B3E`; cada item com o badge do número à esquerda e texto 16px |

Layout interno do card (posições relativas ao canto do card):
- ícone 26×26 em (14, 14)
- título 18px `#1D1D1B` em (52, 12)
- dado 16px `#5A5952` em (52, 40): envios e taxa de abertura, canal, nome curto do webhook
- horário 16px `#5A5952` alinhado à direita: x = 276 − largura, y = 13. Largura a 16px ≈ 11,3 por dígito, 9 por "T" e "+", 8 por "h"; conferir no `width` devolvido
- badge em (248, 38), quando houver; em card com 3+ linhas de dado (decisão), em (248, 12)

## Layout

**Um contêiner = um momento.** Cards que acontecem no mesmo horário (mesmo T) ficam no mesmo contêiner; qualquer espera entre passos abre um contêiner novo, e a espera vira o rótulo da seta entre os dois ("8h", "16h"). Nunca juntar T+0h e T+8h no mesmo contêiner. Passos instantâneos seguidos (gatilho, campo, espera de minutos) podem dividir um contêiner.

**Agrupar no Excalidraw (`groupIds`).** Cada card é um grupo (retângulo, ícone, título, dado, horário, badge). Cada contêiner é um grupo que inclui os seus cards: elemento de card leva `["<grupoCard>", "<grupoContêiner>"]`, o mais interno primeiro. Título e subtítulo da faixa formam um grupo próprio; contêineres não entram no grupo da faixa, para mover um momento sozinho. Criar contêiner e seus cards no mesmo `add`, com os `groupIds` literais. Num `update`, o servidor troca id de grupo novo por um aleatório: ler o id gerado no card e repetir esse valor no contêiner.

**Horizontal** (padrão para fluxo curto ou slide): faixas empilhadas, contêineres lado a lado dentro de cada faixa, 62px entre contêineres, seta horizontal no meio.

**Vertical** (quando pedirem ou o fluxo for longo):
- Cabeçalho e KPIs no topo. As faixas de trechos comuns ocupam a largura toda, com contêineres e decisões descendo em coluna, 62px entre eles e seta vertical no centro.
- Depois de uma decisão que abre caminhos paralelos, cada caminho vira uma faixa alta, lado a lado. Um contêiner por etapa (horário) empilhado.
- A mesma etapa fica na mesma altura em todas as colunas. A altura de cada linha é a do maior contêiner dela.
- Rótulo de espera a 12px à direita da seta vertical.
- Seta que entra numa faixa não cruza o título dela: o contêiner de chegada fica à direita da área do título, ou o título fica à esquerda da coluna da seta. Com seta ao lado, subtítulo da faixa até ~14 caracteres ("grupo controle").
- Pontos de atenção e "Não resolvido" numa coluna lateral de 360px à direita.

## Cor e ícone por tipo

A cor e o ícone dizem o tipo; o mesmo tipo usa a mesma dupla em todo o desenho.

| Tipo | Borda / fundo do card | Ícone Lucide (cor do traço) |
|---|---|---|
| E-mail | `#2F58C9` / `#E9EEFB` | `mail` (`#2F58C9`) |
| Mensagem / WhatsApp / SMS | `#2F7A36` / `#E8F3E9` | `message-circle` (`#2F7A36`) |
| Webhook, integração | `#807B70` / `#F0EDE6` | `webhook` (`#5A5952`) |
| Espera | `#807B70` / `#F0EDE6` | `clock` (`#5A5952`) |
| Campo / atualização de dado | `#807B70` / `#F0EDE6` | `pencil-line` (`#5A5952`) |
| Tag | `#807B70` / `#F0EDE6` | `tag` (`#5A5952`) |
| Gatilho / início | `#807B70` / `#F0EDE6` | `zap` (`#5A5952`) |
| Decisão / condição | `#946200` / `#FFF3D6` | `filter` (`#946200`) |
| Aviso / sai sem envio | `#C42B3E` / `#FBE9EB` | `triangle-alert` (`#C42B3E`) |
| Meta atingida | `#245E2B` / `#245E2B` | `target` (`#FFFFFF`) |
| Sai da lista / fim | `#245E2B` / `#FFFDFA` | `log-out` (`#245E2B`) |

Outro domínio: escolher o ícone Lucide que nomeia a ação (`database`, `server`, `user`, `credit-card`, `file-text`, `globe`...) e encaixar o tipo numa das famílias de cor acima. Nada de glyph unicode no lugar de ícone.

## Ícones

Ícone é SVG do Lucide inserido como imagem, um upload por tipo em cada cena (o `fileId` não vale entre cenas):

```bash
curl -s https://unpkg.com/lucide-static@0.460.0/icons/mail.svg | sed 's/currentColor/#2F58C9/g' | base64 | tr -d '\n'
```

A saída é o payload; o `dataUrl` é `data:image/svg+xml;base64,<payload>`. Imprimir só o payload: um `cat` do `data:` inteiro é lido pelo terminal como imagem e falha.

1. Primeiro ícone de cada tipo: `add_image` com `dataUrl`, `x`, `y`, `width: 26`, `height: 26`, na posição do primeiro card daquele tipo. Guardar o `fileId`.
2. Demais ícones do mesmo tipo: no `edit_scene_content`, `{"type":"image","x":..,"y":..,"width":26,"height":26,"fileId":"<fileId>","status":"saved","scale":[1,1]}`. Não repetir upload.

## Texto que cabe

Nunito ocupa cerca de 0,53 × tamanho por caractere (18px ≈ 9,5px; 16px ≈ 8px).

- Título do card: até 17 caracteres com horário, 23 sem horário.
- Linha de dado: até 28 caracteres; 23 quando o card tem badge.
- Texto maior: encurtar ("E-mail 03 cópia 2", nome do webhook sem domínio), nunca diminuir a fonte.

Depois de cada `edit_scene_content`, conferir nos `width` devolvidos:
- `x + width ≤ borda direita do card − 12`;
- título termina pelo menos 12px antes do horário;
- linha de dado não chega no badge;
- texto solto não cruza seta nem título de faixa.

Corrigir antes do screenshot.

## Prévia de e-mail e WhatsApp

Padrão, sem precisar pedir: fluxo com e-mail ou mensagem de WhatsApp leva o conteúdo junto. Cada e-mail com link de leitura e o texto do e-mail (assunto, prévia, corpo, botão). Cada WhatsApp com o texto completo e o link para o fluxo no ManyChat. O que não der para ler vira N/D no card, com o motivo.

**E-mail (ActiveCampaign)**
- Link de leitura: `https://<conta>.activehosted.com/index.php?action=social&chash=<md5(campaignid)>.<messageid>`. Abre sem login enquanto a campanha tiver `public=1`.
- IDs pelo conector ActiveCampaign: blocos de envio da automação (`catalog_retrieve-automation-blocks`) dão o campaign id; `get_campaign` dá o message id. Não deduzir message id: id trocado ainda abre a página e não acusa erro.
- Testar cada link com `curl` sem cookie: HTTP 200 e `<title>` igual ao assunto.
- No card, a linha "ler e-mail ->" (14px `#2F58C9`) e o retângulo do card levam esse `link`. Não usar o relatório (`/report/#/campaign/...`), que pede login.
- O preview mostra a personalização (`%FIRSTNAME%`) em branco; avisar na entrega.
- Texto do e-mail pelo conector (`get_campaign_messages` ou `catalog_retrieve-a-message` com o message id): assunto, prévia (preheader), corpo sem HTML e rótulo + destino do botão (URL sem os parâmetros `utm_*`). Corpo longo: copiar inteiro, sem resumir; personalização fica como está (`%FIRSTNAME%`).

**WhatsApp (ManyChat)**
- Ler pelo `agent-browser` com a sessão do ManyChat que o Kelvi logou; sem sessão, o ManyChat cai no login e é o Kelvi quem loga. Na pasta (`/cms?path=<id>`), tirar os links `cms/files/...` de cada automação via JS (`agent-browser eval`).
- O canvas do fluxo não está no DOM: ler por screenshot. Bloco longo: rolar o canvas (a rolagem dá zoom) e tirar screenshot da região. Clicar no gatilho mostra a tag no painel lateral.
- Copiar de cada mensagem: texto completo com as variáveis (`{Primeiro Nome}`), nome do arquivo de mídia, rótulo do botão, enviados e % entregue. Emoji fica de fora; erro de digitação do original fica como está. Os dois vão no resumo da entrega.
- Card tipo Mensagem: título "WhatsApp N", dado "<enviados> env · <entrega>% entregue", horário do disparo, `link` para o fluxo no ManyChat.
- Seta do passo que dispara (webhook, tag) até o card. Ligação tirada só do nome (webhook N → tag msgN) precisa ser confirmada no webhook ou marcada como dedução na entrega.

**Layout**
- Cards de WhatsApp numa faixa "WhatsApp · ManyChat" ao lado do caminho que dispara, cada um na altura do passo de origem.
- Texto completo numa faixa "Texto das mensagens" à direita, com e-mail e WhatsApp separados (pedido do Kelvi 21/10: misturar os dois confunde a ordem). Três colunas: "Momento" estreita à esquerda (T+0, T+8h...), "E-mails · ActiveCampaign" com cabeçalho azul `#2F58C9` e ícone mail, "WhatsApp · ManyChat" com cabeçalho verde `#2F7A36`. Uma linha por momento do fluxo, linha fina entre elas; a altura da linha é a da nota mais alta. Assim T+0 se lê "E-mail 01 | WhatsApp 1". Célula sem mensagem: nota cinza "sem e-mail" (ou "sem WhatsApp"); mensagem não lida: nota N/D com o motivo.
- Nota de WhatsApp: 440px de largura, borda `#2F7A36` 1px / `#FFFDFA`. Dentro, x = nota.x + 16: título "WhatsApp N · T+X" 18px em y+14 (igual ao card do fluxo); mídia 16px `#5A5952` em y+42; corpo 16px `#1D1D1B` em y+72, quebra manual com `\n` a ~48 caracteres; "Botão: <rótulo>" 16px `#2F7A36` 12px abaixo do corpo; "abrir fluxo no ManyChat ->" com o `link`.
- Altura da nota = 72 + 20 × linhas do corpo + 16, mais 32 quando tem botão.
- Nota de e-mail: mesma largura, borda `#2F58C9` 1px / `#FFFDFA`; título "E-mail 0N · T+X"; na linha da mídia vai "Assunto: <assunto>" e, 20px abaixo, "Prévia: <preheader>" (corpo desce 20px); "Botão: <rótulo> -> <URL>" em `#2F58C9`. A nota leva o `link` de leitura.
- Esticar o retângulo de fundo até cobrir as faixas novas.

## Pronto quando

- Nenhum texto passa da borda do card nem encosta no horário ou no badge (conferido pelos `width`).
- Cada card tem um ícone na cor do tipo, por cima dele (índice conferido depois do reindex).
- Um contêiner por momento, com a espera na seta entre eles; cards e contêineres com `groupIds`.
- Trechos em faixas com título.
- Com e-mail ou WhatsApp no fluxo: cada e-mail com link de leitura testado e texto na coluna de e-mails; cada WhatsApp com texto completo na coluna de WhatsApp e link para o fluxo no ManyChat; e-mail e WhatsApp do mesmo momento na mesma linha. Vale mesmo quando o pedido não citar o conteúdo.
- Screenshot da cena feito depois da última edição.

## Arquivo `.excalidraw` local

Só quando pedirem arquivo. Mesmo estilo. Salvar em `artifacts/` no workspace do assistente. Render: `uv run --with playwright python <pasta desta skill>/references/render_excalidraw.py <arquivo.excalidraw>`; o PNG sai ao lado do arquivo. O script usa o Chrome de `AGENT_BROWSER_EXECUTABLE_PATH` quando existe; sem ele, `uvx playwright install chromium` uma vez. Sem `uv`, Python ou rede no pod: entregar o `.excalidraw` e dizer que o PNG não foi gerado.

Se o Kelvi pedir para guardar o link de uma cena, registrar em `memory/contexto/<tema>.md` pela `conhecimento-pessoal`.

## No Maestro

- Conector Excalidraw ligado neste assistente (conta do Kelvi, coleção acima). Conferir se as ferramentas `read_freeform_format`, `create_collection_scene` e `edit_scene_content` aparecem na sessão. Sem elas, avisar o Kelvi que falta ligar o conector Excalidraw e oferecer o `.excalidraw` local.
- ActiveCampaign pelo conector ActiveCampaign. ManyChat só pelo navegador (skill `agent-browser` da biblioteca do Maestro) com a sessão logada pelo Kelvi.
- Import do Excalidraw no `render_template.html` fixado em `@excalidraw/excalidraw@0.18.0` no jsdelivr: o import sem versão do esm.sh devolveu 404 numa dependência e travou o render (AC 331, 21/10/2026).
