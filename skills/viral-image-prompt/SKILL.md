---
name: viral-image-prompt
description: 'Escreve prompt de imagem ou de vídeo com potencial viral: pesquisa os detalhes icônicos do tema e define composição, luz, câmera e estilo (Nano Banana Pro, Veo 3). Usar quando pedirem prompt de imagem ou de animação para post, thread ou Reels. Não gera a imagem: para gerar de fato, usar a skill imagegen.'
---

# Viral Image Prompt Generator

## Objetivo

Gerar prompts visuais especificos e virais, com direcao criativa suficiente para evitar imagem generica.
A chamada deve transformar tema amplo em composicao, luz, camera, estilo e restricoes acionaveis.

## Como melhorar a entrega
- Pesquise detalhes iconicos do tema antes de promptar.
- Escolha composicao, ponto focal, camera, luz e estilo pelo efeito desejado.
- Preserve copy, idioma e plataforma; remova cliches tecnicos vazios.

Gerador de prompts de imagem com alto poder de viralização. Pesquisa automaticamente detalhes icônicos de qualquer tema e gera prompts otimizados para Nano Banana Pro (Gemini). Opcionalmente gera prompts de animação para Veo 3.

## Quick Reference

| Tarefa | Como Resolver |
|--------|---------------|
| Imagem de local famoso | Usuário diz o nome → pesquisar elementos icônicos → gerar prompt no estilo escolhido |
| Variação dia/noite/golden hour | Ajustar lighting, atmosfera e elementos ambientais mantendo composição |
| Animação Veo 3 | Gerar prompt de vídeo com movimento de câmera criativo + camadas de vida |
| Aspect ratio por plataforma | Reels/Shorts/TikTok = 9:16 · Feed IG = 4:5 · YouTube = 16:9 |
| Estilo diferente | Usuário especifica ou sugerir o melhor estilo pro tema |

## Princípio Core: Por Que Imagens Viralizam

Viralização visual = **3 segundos de impacto**. O cérebro processa imagem 60.000x mais rápido que texto. Imagens virais compartilham 3 traços: contraste impossível (macro vs micro, real vs fantástico), riqueza de detalhe que recompensa zoom, e composição que guia o olho para um ponto focal dramático.

## Filosofia de Prompt: Inteligência, Não Fórmula

Esta skill NÃO opera com templates rígidos. O objetivo é pensar como um diretor de fotografia que conhece o tema intimamente e toma decisões criativas inteligentes.

**O que isso significa na prática:**

- Não repetir blocos técnicos genéricos (nada de "8K, hyper-detailed, photorealistic" colado no final de todo prompt como carimbo). Cada prompt deve ter seu próprio fechamento técnico que faça sentido pro estilo e tema.
- Não usar specs rígidos de vídeo (nada de "Duration: 6s, 24fps, 4K, ultra sharp" copiado em todo prompt de animação). Esses parâmetros são óbvios para o modelo de vídeo e só poluem o prompt.
- Cada prompt é uma peça única de direção visual, não um formulário preenchido.

## Workflow Principal

### Passo 1: Pesquisar o Tema

O usuário diz apenas o nome. A skill DEVE pesquisar automaticamente:

- **Local real** → landmarks icônicos, geografia exata, materiais de construção, vegetação nativa, clima típico, cores dominantes, detalhes que turistas não notam mas câmeras capturam (reflexos, texturas de pedra, padrões de luz)
- **Conceito/fantasia** → referências visuais canônicas, materiais esperados, paleta de cores associada

Essa pesquisa é o que separa um prompt genérico de um prompt que gera imagem viral. "Machu Picchu" sem pesquisa = ruínas genéricas. Com pesquisa = terraços de granito cinza cortados na montanha, Huayna Picchu ao fundo com nuvens baixas serpenteando entre os picos, lhamas nos terraços, musgo verde entre as pedras milenares.

### Passo 2: Selecionar Estilo

Consultar `references/viral-styles.md` para a biblioteca completa.

| Estilo | Melhor Para | Vibe |
|--------|------------|------|
| **Map Diorama 3D** | Cidades, países, landmarks | Mapa realista com diorama emergindo |
| **Miniature Tilt-Shift** | Cidades, eventos, paisagens | Mundo real parece maquete |
| **Isometric World** | Cidades, ecossistemas, fantasia | Vista aérea 30° estilizada |
| **Cinematic Macro** | Natureza, texturas, detalhes | Close extremo cinematográfico |
| **Fantasy Epic** | Castelos, dragões, mundos fictícios | Épico, grandioso, irreal |
| **Neon Cyberpunk** | Cidades à noite, futurismo | Neon, chuva, reflexos |
| **Aerial Reveal** | Paisagens, ilhas, montanhas | Vista aérea dramática |
| **Split Scene** | Antes/depois, dia/noite, contraste | Duas realidades na mesma imagem |

Default: **Map Diorama 3D** para locais reais, **Fantasy Epic** para ficção.

### Passo 3: Gerar Prompt de Imagem

**Construção em 5 camadas (ordem importa):**

1. **Composição** — ângulo de câmera + enquadramento (ancora toda a imagem)
2. **Sujeito central** — o elemento icônico com detalhes PESQUISADOS (não genéricos)
3. **Ambiente** — contexto geográfico/atmosférico com precisão real
4. **Materiais e texturas** — específicos do local (granito, marble, bamboo, não "stone")
5. **Direção fotográfica** — lens, depth of field, lighting (decidido criativamente, não copiado)

**Regras:**
- Prompt em inglês (Gemini performa melhor)
- 80-150 palavras (curto = genérico, longo = confuso)
- Nunca usar adjetivos vazios ("beautiful", "amazing", "stunning") — usar termos visuais concretos
- O fechamento técnico deve variar por estilo e cena — não existe bloco padrão

**Gerar a imagem:** esta skill entrega o prompt. Para gerar de fato, passar o prompt e o aspect ratio para a skill `imagegen`. A CLI `nano-banana` é opcional e só vale se existir no bot (`command -v nano-banana`):
```bash
nano-banana "PROMPT" --model pro -s 2K -a ASPECT_RATIO -o NOME_OUTPUT
```

### Passo 4: Inteligência Atmosférica

A maior diferença entre um prompt medíocre e um viral está na atmosfera. Não é sobre trocar "dia" por "noite" mecanicamente — é sobre repensar a cena inteira.

**Noite — o que um diretor de fotografia faria:**
- Lua: nem sempre cheia. Crescente cria drama, cheia cria romance. Posicionar a lua em relação ao sujeito (atrás = silhueta, lateral = rim light natural)
- Estrelas: céu limpo em locais remotos (deserto, montanha), menos visíveis em cidades com poluição luminosa
- Luzes urbanas: quentes (incandescentes em cidades históricas), frias (LED em cidades modernas), neon (Ásia)
- Reflexos: água à noite multiplica toda fonte de luz — rios, poças, superfícies molhadas
- Névoa/neblina: cria profundidade e mistério, isola o sujeito do fundo
- Bioluminescência: praias tropicais à noite podem ter plâncton brilhante

**Golden Hour:**
- Não é só "warm light" — são sombras longas, rim light dourado no sujeito, céu em gradiente (laranja → roxo → azul escuro)
- Superfícies metálicas e água ficam douradas, pedra fica quente, vegetação fica backlit

**Tempestade:**
- Raios iluminando a cena momentaneamente, superfícies molhadas refletindo tudo, nuvens dramáticas com textura, vento visível na vegetação e na água

**Neve:**
- Neve não é branca — reflete o céu. Azulada sob céu nublado, dourada no pôr do sol
- Gelo tem transparência e refração, neve fresca tem textura macia

A ideia é que cada variação atmosférica seja um exercício criativo, não uma substituição mecânica de palavras.

### Passo 5: Prompt de Animação Veo 3 (quando pedido)

Consultar `references/animation-prompts.md` para guia de câmera e movimento. Princípios:

**Preservação de geometria** — sempre incluir no início do prompt para Veo não inventar estruturas.

**Câmera inteligente:**
O movimento de câmera deve servir a narrativa da cena, não ser genérico. Perguntar: "o que o espectador quer ver mais de perto?", "qual é a jornada visual ideal aqui?"

Exemplos de pensamento:
- Vulcão: o espectador quer se aproximar do perigo → zoom agressivo + rotação que revela a lava descendo
- Machu Picchu: o espectador quer a revelação → começar em detalhe das pedras e puxar para revelar a grandeza
- Tokyo neon: o espectador quer imersão → câmera se movendo entre os prédios como se caminhasse pela rua
- Praia paradisíaca: o espectador quer relaxar → movimento lento e lateral como se flutuasse sobre a água

**Camadas de vida:**
Cada cena deve ter 2-3 elementos vivos além do movimento de câmera. Escolher os que fazem sentido pro contexto (não repetir sempre os mesmos):

| Contexto | Elementos de Vida |
|----------|------------------|
| Água | Ondulação, reflexos distorcendo, espuma, barcos |
| Cidade diurna | Sombras movendo, bandeiras ao vento, pássaros |
| Cidade noturna | Luzes piscando em ritmos diferentes, neon pulsando, reflexos em superfícies molhadas |
| Natureza | Vento nas árvores, nuvens deslizando, animais sutis |
| Vulcão/fogo | Brilho pulsante, fumaça subindo, embers flutuando |
| Neve/inverno | Flocos caindo, vapor da respiração, gelo brilhando |
| Praia | Ondas quebrando, palmeiras balançando, areia brilhando ao sol |

**Não incluir specs técnicos rígidos** (duration, fps, resolution) nos prompts — poluem o prompt sem benefício. O modelo de vídeo já sabe esses defaults.

## Aspect Ratios por Plataforma

| Plataforma | Ratio | Flag |
|-----------|-------|------|
| Instagram Reels / TikTok / Shorts | 9:16 | `-a 9:16` |
| Instagram Feed | 4:5 | `-a 4:5` |
| YouTube / Twitter | 16:9 | `-a 16:9` |

Default sem especificação: **16:9** (mais versátil para animação posterior).

## Common Mistakes

| Erro | Correção |
|------|----------|
| Bloco técnico copiado em todo prompt | Cada prompt tem seu próprio fechamento visual |
| "Duration: 6s, 24fps, 4K" no prompt de vídeo | Não incluir — polui sem benefício |
| Mesmo movimento de câmera pra tudo | Pensar: "o que o espectador quer ver?" |
| Noite = só trocar "day" por "night" | Repensar fontes de luz, reflexos, lua, estrelas, atmosfera inteira |
| Prompt vago ("beautiful city") | Nomear materiais, landmarks, texturas pesquisadas |
| Orbit completo no Veo 3 | Rotação máxima 30° — orbit gera distorção |

## References

- Para biblioteca completa de estilos → `references/viral-styles.md`
- Para guia de câmera e movimento Veo 3 → `references/animation-prompts.md`
