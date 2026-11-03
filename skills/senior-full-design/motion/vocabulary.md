# Vocabulário de motion

Busca reversa: o usuário descreve vagamente, você acha o termo exato e os valores. "Aquele negócio que pula quando o popover abre" → **pop in**, `scale(0.96) → 1` com `ease-out` em 180ms.

Use pra traduzir pedido vago em decisão implementável, sem devolver pergunta.

---

## Entrada e saída

| Descrição vaga | Termo | Implementação |
|---|---|---|
| "aparece meio pulando" / "dá uma inchadinha" | **pop in** | `scale(0.96) + opacity 0` → `1`, ease-out, 150–200ms |
| "sobe suave enquanto aparece" | **fade up** | `translateY(8–16px) + opacity 0` → `0`, ease-out, 300–700ms |
| "sobe e desfoca" | **blur reveal** | fade up + `filter: blur(6px)` → `0` |
| "entra deslizando de baixo" | **slide up** | `translateY(100%)` → `0`, ease-drawer, 350–450ms |
| "os itens aparecem um atrás do outro" | **stagger** | delay de 30–80ms por item |
| "vai desenhando da esquerda pra direita" | **wipe / clip reveal** | `clip-path: inset(0 100% 0 0)` → `inset(0)` |
| "vai se descobrindo conforme rola" | **scroll reveal** | IntersectionObserver + fade up, uma vez só |
| "o texto aparece palavra por palavra" | **word reveal** | palavras individuais com stagger; mantenha o nome acessível não-dividido |
| "a palavra acende conforme eu rolo" | **scrubbed word reveal** | opacidade por palavra ligada à posição do scroll, cruzando uma linha de gatilho |

## Estado e feedback

| Descrição vaga | Termo | Implementação |
|---|---|---|
| "afunda quando clica" | **press / active scale** | `scale(0.97)` no `:active`, 160ms |
| "levanta quando passa o mouse" | **lift** | `translateY(-2px)` + sombra, com gate de ponteiro |
| "a barrinha desliza entre as abas" | **sliding indicator** | posição animada, ou clip-path na lista duplicada |
| "o botão vira um check" | **morph de estado** | crossfade com blur entre os dois conteúdos |
| "pisca de leve quando atualiza" | **flash / highlight** | fundo do acento em opacidade baixa, 400ms, uma vez |
| "treme quando dá erro" | **shake** | `translateX` alternado, 3 ciclos, ~60ms cada. Use com moderação |
| "esqueleto cinza enquanto carrega" | **skeleton** | forma real do conteúdo, com brilho lento opcional |
| "a lista se reorganiza sozinha" | **layout animation** | biblioteca que interpola posição (FLIP) |

## Movimento contínuo

| Descrição vaga | Termo | Implementação |
|---|---|---|
| "fica passando sem parar" | **marquee** | translate linear em loop; um por página |
| "o fundo anda mais devagar que o resto" | **parallax** | translate ligado ao scroll com fator < 1 |
| "a seção trava enquanto o conteúdo muda" | **pin** | seção fixa enquanto o progresso avança |
| "o vídeo anda conforme eu rolo" | **scrub** | progresso da timeline mapeado na posição do scroll |
| "gira devagar sem parar" | **ambient loop** | rotação linear infinita, muito lenta |

## Física e gesto

| Descrição vaga | Termo | Implementação |
|---|---|---|
| "tem peso, quica um pouquinho" | **spring** | `{ duration: 0.5, bounce: 0.2 }` |
| "elástico quando chega no fim" | **rubber band** | amortecimento crescente além do limite |
| "com um empurrãozinho já vai" | **momentum dismiss** | velocidade > ~0.11 px/ms dispensa, independente da distância |
| "segue o mouse, mas com atraso gostoso" | **spring follow** | valor do ponteiro passado por spring, não aplicado direto |
| "vai perdendo velocidade até parar" | **inertia / decay** | desaceleração, sem parada dura |
| "arrasta pro lado pra fechar" | **swipe to dismiss** | translate no arrasto + limiar por distância **ou** velocidade |

## Caráter de curva

| Descrição vaga | Curva |
|---|---|
| "responde na hora", "seco", "rápido" | `ease-out` forte — `cubic-bezier(0.23, 1, 0.32, 1)` |
| "suave nas duas pontas" | `ease-in-out` — `cubic-bezier(0.77, 0, 0.175, 1)` |
| "estilo iOS", "pesado, deslizante" | `cubic-bezier(0.32, 0.72, 0, 1)` |
| "constante", "sem aceleração" | `linear` |
| "vivo", "orgânico", "com peso" | spring, bounce 0.1–0.3 |
| "lento pra começar" | **não existe em UI** — é `ease-in`, e ele faz a interface parecer travada |

---

## Quando o termo não resolve

O pedido descreve **sensação**, não efeito ("quero que pareça caro", "quero que pareça rápido")? Não é vocabulário de motion, é calibração:

- "parecer caro" → menos motion, duração mais longa, curva mais suave, um momento de assinatura só
- "parecer rápido" → durações menores, ease-out forte, skeleton no lugar de spinner, tooltip instantâneo depois do primeiro
- "parecer vivo" → spring em vez de duração fixa, e movimento em resposta a input, não em loop
- "parecer sério" → motion só onde existe feedback ou mudança de estado; zero decoração
