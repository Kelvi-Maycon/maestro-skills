# Rota: Reference

Aciona quando existe uma referência visual real na mesa: print, URL, board do Pinterest, Figma, foto de uma peça, "quero igual a esse", "extrai o estilo daqui", "esse vibe".

**Essa é a rota que mais muda o resultado**, e a que quase nunca é feita direito.

---

## O problema

O caminho natural do modelo com uma imagem de referência é transformá-la em texto e gerar a partir do texto. Isso parece razoável e destrói exatamente a informação que fazia a referência valer:

> "minimalista, tons neutros, bastante respiro, tipografia moderna"

Essa frase descreve a referência — e descreve mais dez mil outras coisas. Os números que faziam **aquela** peça funcionar (o off-white exato, a razão de escala, a profundidade da sombra, o raio, a densidade) já não estão ali quando o código começa a ser escrito.

**Regra: extraia número, não adjetivo.** O texto entra depois, pra o que o pixel não conta.

---

## Passo 1 — Decida o que a referência é

| A referência é | Então |
|---|---|
| print/URL de um site que ele **admira** e quer aprender | modo **estudo**: extraia o DNA reutilizável, não os pixels |
| print/URL de algo que ele quer **reproduzir com o conteúdo dele** | modo **ancoragem**: extraia tokens e construa o conteúdo dele por cima |
| a UI **atual** do produto dele | isso não é referência, é contexto — vá pra `../redesign/PLAYBOOK.md` |
| moodboard de várias peças | extraia de todas, e depois **reconcilie**: o que é comum é o DNA; o que diverge é ruído |

Referência sem verbo ("olha esse site") → pergunte **uma vez** qual dos dois, e siga.

---

## Passo 2 — Extraia o que é determinístico

```bash
uv run --with pillow python scripts/extract_palette.py <imagem> [<imagem>...]
```

Sai: cores dominantes com proporção, razões de contraste, estatística de lightness. Números reais tirados de pixel real.

**Depois** disso, some sua leitura visual do que o script não vê:

- **Densidade** — quanta informação por viewport, quantas colunas, quanto respiro
- **Raio** — reto, discreto, generoso, pílula. Uma gramática ou várias?
- **Sombra** — existe? de que profundidade? de uma fonte de luz só?
- **Borda** — fio de cabelo, borda cheia, nenhuma?
- **Escala tipográfica** — razão entre display e corpo, tracking do display, peso
- **Tratamento de imagem** — corte, proporção, filtro, grão, cor
- **Caráter do motion** — se for URL: o que se move, quando, com que curva aparente
- **Tom da copy** — curto e afirmativo? explicativo? técnico? falado?
- **Composição** — o que é assimétrico, o que quebra a grade, onde está o vazio

---

## Passo 3 — Ancore tudo

**Todo token do brief precisa apontar pra algo visível na referência.** Não consegue apontar por que aquela cor ou aquele padrão está no brief? Não entra.

Esse é o portão que separa "extraí a referência" de "olhei a referência e escrevi o que eu já ia escrever".

Cor extraída não vira token direto — ela recebe um **papel** (texto, fundo, superfície, primária, acento, borda), e o papel muda o requisito:

```bash
python3 scripts/check_contrast.py --matrix text=#hex bg=#hex surface=#hex primary=#hex accent=#hex border=#hex on-primary=#hex
```

Uma cor que era ótima como amostra dominante na imagem original pode reprovar como fundo de rótulo de botão. Isso acontece o tempo todo. Rode antes de travar.

---

## Passo 4 — Modo estudo: extraia DNA, não pixel

Quando ele quer **aprender** com a referência e aplicar ao produto dele, copiar pixel é o erro. O que se extrai:

| Camada | Pergunta |
|---|---|
| **Macroestrutura** | qual é a forma da página inteira? qual é a sequência de beats? |
| **Arquétipos** | que tipo de nav, hero, prova, CTA e rodapé ela usa? |
| **Pareamento tipográfico** | qual é o caráter (não necessariamente a fonte) do display e do corpo? |
| **Âncora de cor** | qual é a estratégia — mono com um acento? duas hues? escuro quente? |
| **Movimento de assinatura** | quais são os 3–5 detalhes que fazem ela ser reconhecível? |
| **O que ela recusa** | o que essa peça deliberadamente não faz? (a recusa costuma ser metade do estilo) |

Devolva isso como **diagnóstico** primeiro. Só depois construa com o conteúdo dele, ou trave no lock.

**Nunca reproduza identidade alheia:** logo, wordmark, copy, foto e código da referência não vão pro trabalho do usuário. Traço de alto nível — hierarquia, ritmo, contraste, tratamento de imagem, princípio de motion — vai.

---

## Passo 5 — Trave

O contrato extraído vira `.design-lock.md` na raiz do projeto. A partir daí, **nenhuma tela re-deriva paleta**. Formato: `style-lock.md`.

Re-derivar entre telas do mesmo produto é a deriva número um em trabalho de várias sessões: cada tela sai levemente diferente e o conjunto não parece um produto.

---

## Sem referência nenhuma

Quando o usuário quer "moderno, polido, profissional" e não tem referência, você tem duas opções honestas — e nenhuma delas é começar a codar:

1. **Monte o campo de referência**: liste concorrentes diretos, produtos adjacentes, fontes culturais e **anti-referências** (o que ele não quer parecer). Anote como inferido se você não conseguiu ver as fontes de verdade.
2. **Vá pro consultor de direção** (`../design/directions.md`) — três escolas diferentes, ele escolhe, e a recipe da escola vira o ponto de partida concreto.

Diga em uma linha que ausência de referência limita o teto de qualidade. Não é desculpa antecipada — é o que faz ele mandar um print, que é o que resolve o problema de verdade.

---

## Assets reais na mesma passada

Site sem foto real, sem ilustração e sem movimento lê como estático e genérico por melhores que sejam os tokens. Complete numa passada só, não numa rodada de "agora adiciona as imagens".

- **Foto vs. ilustração por seção**: seção que mostra algo factual ou físico (produto em uso, lugar, pessoa) pede foto; seção que carrega conceito abstrato (missão, benefício, ideia) pede ilustração.
- **Foto**: `python3 scripts/fetch_photos.py "<termos>" --out design/assets/photos` — busca em acervo aberto, sem chave de API, filtrado pra licença que **não exige atribuição visível**.
- **Ícone**: `python3 scripts/fetch_icons.py --search "<termos>" --mood <humor>` e depois `--icons a b c --mood <humor> --color "#acento" --out design/assets/icons`. Um set por projeto, mesma espessura em tudo.
- **Crédito no código, nunca na página.** O script escreve o bloco de créditos; cole num comentário no topo do HTML/CSS. Crédito visível numa peça finalizada é estorvo visual que produto nenhum entrega.
- **Valide SVG antes de usar**: `python3 scripts/validate_assets.py <arquivo_ou_pasta>`. SVG malformado lê bem como texto e renderiza quebrado.
- **Último recurso, nunca o plano**: asset genuinamente insourceável vira forma em SVG/CSS a partir da paleta travada — e você **diz** que foi isso. Nunca dê a entender que existe foto real onde existe placeholder.

**Logo é caso à parte.** Existe identidade? Reuse byte a byte, sem recolorir nem reinterpretar porque conflita com a direção nova. Não existe nenhuma? Construa uma marca geométrica simples a partir de formas primitivas na paleta travada — **nunca letra dentro de um quadrado colorido**.
