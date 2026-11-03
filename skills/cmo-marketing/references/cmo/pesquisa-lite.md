---
date: 2026-09-05
tags: [marketing, pesquisa, validacao-oferta]
related: ["[[README]]", "[[teste-de-aderencia-3-camadas]]", "[[schwartz-desejo-consciencia-sofisticacao]]"]
---

# Pesquisa lite — fase 1 da ordem de criação

## Papel

- Gera **hipótese** de desejo, consciência e linguagem. A resposta vem do teste amplo (camada 1) — pesquisa não termina antes do teste.
- Teto de tempo curto (proposta: 1 dia). O que ela não responder, o anúncio responde.
- Entrevista fica fora neste estágio.

## 5 saídas obrigatórias

1. **Verbatim** — dor e resultado nas palavras do mercado. Vira headline e landing sentence.
2. **Tentativas anteriores** — o que compraram/tentaram e por que falhou. Vira inimigo e "por que o X antigo falhou".
3. **Crenças sobre a causa** — o que já acreditam. Vira cadeia de crenças e one belief (monta em cima, não briga).
4. **Diagnóstico Schwartz** — nível de consciência dominante + estágio de sofisticação.
5. **Provas disponíveis** — o que existe de real (vem do brief).

## Fontes

| Fonte | Serve pra | Como raspar |
|---|---|---|
| Comentários de tutorial no YouTube | verbatim, crenças, tentativas | YouTube Data API ou `yt-dlp --write-comments` |
| Grupos de Facebook | tentativas, crenças, nível de consciência | sem API: export manual do Kelvi |
| Reddit, fóruns, comentários de blog | tentativas, crenças, verbatim | Scrapling / API do Reddit |
| Reviews (Hotmart, Amazon, Reclame Aqui, Google) — **todas as notas** | 5★ = promessa + cena de sucesso · 1–2★ = inimigo + furo do concorrente · "já comprei 3 e nenhum…" = sofisticação | Scrapling |
| Anúncios e LPs de concorrentes (a promessa deles, não os comentários) | sofisticação: mapa de promessas + mecanismos do mercado | Biblioteca de Anúncios do Meta, ordenada por impressões + Scrapling na LP |
| Telegram | só se o público mora lá (cripto, trader, tech) | Telethon |
| Brief | provas disponíveis | Kelvi |

Fora: comentário em anúncio (não faz sentido nesta pesquisa), Deep Research/síntese de LLM (devolve resumo; mata o verbatim).

### Crença atual, não só desejo — 2026-09-12 (Dereck Carneiro, Plano do Milhão)

Desejo todo mundo já sabe; o que muda a peça é **no que o público acredita que vai funcionar agora**.
- Google Trends, país alvo, últimos 30 dias, termo do desejo → consultas relacionadas em ascensão.
- Autocomplete do YouTube e do TikTok com o termo aberto ("emagrecer com ___", "ganhar dinheiro com ___"). O complemento é a crença do momento; entre os vídeos mais virais desse complemento, o mecanismo que se repete é o que o público aceita.
- TikTok e YouTube são buscadores; Instagram não. Minerar formato e crença nos dois primeiros.
- Hook: abertura do vídeo mais viral do tema é candidata a hook/cabeça, porque retenção alta já provou a abertura. Entra como uma das 4 da matriz, não como controle.
- Filtro do que modelar na Biblioteca: anunciante brasileiro escala com lucro no front; gringo escala em economia de funil (upsell, LTV). Peça BR com muitos anúncios ativos há semanas é evidência mais confiável de conversão no front do que peça gringa. Hipótese dele, coerente com a régua; não substitui a longevidade registrada abaixo.

Ordenar por impressões (2026-09-11): impressão é proxy de gasto, logo de escala; diz mais que "há quanto tempo roda". Hipótese, não fato: a evidência é de 3 contas (Alex Gough Cooper) e o dado de impressão na Biblioteca vem da transparência da UE. Conferir se aparece pra concorrente que só roda no Brasil antes de contar com ele.

## Escolher os vídeos certos (YouTube)

1. Tutorial, não vlog — quem comenta tutorial tá tentando resolver.
2. Volume de comentários > views.
3. Comentários abertos e recentes; canal que responde gera thread, e thread é onde aparece crença.
4. 3 buscas por desejo: a dor ("[sintoma]"), o resultado ("[resultado]"), a tentativa ("[sintoma] por quê"). 5–10 vídeos por busca.
5. Filtrar comentários por "não", "por quê", "consegui", "pela primeira vez".

## Regras de leitura

- Um comentário bom entrega várias saídas: "consegui [resultado] pela primeira vez, sem [sintoma]" = resultado + dor + tentativa ("pela primeira vez") + promessa pronta.
- "Fiz tudo igual e não deu" = crença de que a causa é o método que ela seguiu → one belief nasce aí: "não é o [método], é o X que ninguém fala".
- Nível de consciência pelo tipo de pergunta dominante: "por que acontece?" = 2 · "qual método?" = 3.

## Pipeline

Raspa bruto → LLM extrai as 5 saídas **citando a frase literal** (nunca parafraseia) → síntese só depois da citação.

Divisão: o especialista raspa YouTube, Reddit/fóruns/blogs, reviews (e Telegram quando couber); Facebook o Kelvi exporta e entrega.

## Mineração e concorrentes — incorporado em 2026-09-11

Fonte: [[pesquisa-2026-09-11-triagem]], bloco F. Reviews: 3★ → 5★ → 4★ como ordem inicial, sem excluir 1–2★. Extrair também jargão e visão de mundo (Sales Safari). Ver [[oferta-copy-e-pesquisa-aplicada]].

- Registro por evidência: URL, data de coleta, frase literal, contexto, dor/tentativa/crença/objeção, fonte independente ou repost e status de acesso. Falha de acesso = não acessível, nunca “não existe”.
- Busca: dor + tentativa + concorrente; adaptar “vs”, “switched” para “ou”, “troquei”, “não funcionou”, “vale a pena”. Operador `site:reddit.com` quando esse público estiver lá; não limitar a janela a 30 dias.
- Peso qualitativo: experiência concreta de praticante acima de descrição genérica; conteúdo promocional pode mapear promessa, não validar resultado. Não transformar pesos 5/4/1/0 do last30days em probabilidade.
- Swipe por anúncio: ID, anunciante, início/fim observado, copy, headline, CTA, formato, desejo/porta/mecanismo inferidos, URL/LP, quantidade ativa por marca e split imagem/vídeo quando disponível. Impressões só quando expostas; não estimar spend brasileiro a partir de campo ausente.
- Longevidade: <14 dias novo; 14–30 em observação; 30+ persistente, segundo a convenção do scraper. Persistência não comprova lucro nem torna o anúncio controle validado.
- Teardown de LP: promessa, prova, preço, bump, deadline fixo/evergreen/sessão, parâmetro/cookie de variante observado. Separar observação de inferência; não copiar falsa escassez.
- [meta-ads-scraper](https://github.com/athm793/meta-ads-scraper): candidato de automação local (Playwright/SQLite), não instalado; acesso público e GraphQL podem falhar. Recuperar manualmente o que estiver disponível, preservando lacunas.

## Em aberto

- Volume mínimo de comentários pra confiar no verbatim.
