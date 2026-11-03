# Guia de Animação — Veo 3

## Índice
1. Fundamentos Inegociáveis
2. Pensamento de Câmera
3. Camadas de Vida por Contexto
4. Guia por Estilo
5. Anti-Artefatos

---

## 1. Fundamentos Inegociáveis

Todo prompt de animação Veo 3 DEVE começar com preservação de geometria. Sem isso, Veo inventa estruturas, deforma terreno e cria elementos que não existiam na imagem original.

Abrir sempre com algo como:
```
Convert this image into an ultra-realistic cinematic video.
STRICTLY preserve all geometry and structures. No new elements.
```

Depois disso, a criatividade entra. Nada de specs técnicos rígidos (duration, fps, resolution) — só poluem o prompt sem benefício. O modelo já sabe os defaults.

---

## 2. Pensamento de Câmera

O movimento de câmera é a narrativa do vídeo. Não existe "movimento padrão" — cada cena pede um tipo diferente baseado no que o espectador quer sentir.

### A Pergunta Fundamental

Antes de escolher qualquer movimento, perguntar: **"O que o espectador quer ver mais de perto? Qual é a jornada visual ideal?"**

| Cenário | O que o espectador quer | Movimento ideal |
|---------|------------------------|-----------------|
| Vulcão ativo | Se aproximar do perigo | Zoom agressivo em direção ao cratér + rotação lenta revelando lava descendo |
| Machu Picchu | Sentir a grandeza | Começar em detalhe das pedras e pull-back revelando a escala épica |
| Tokyo neon | Imersão na cidade | Dolly forward entre prédios como se caminhasse pela rua |
| Praia paradisíaca | Relaxamento | Glide lateral suave como se flutuasse sobre a água |
| Castelo fantasia | Admiração épica | Crane up lento revelando a escala impossível do cenário |
| Paisagem aérea | Descoberta | Forward glide que vai revelando o terreno aos poucos |
| Diorama de mapa | Curiosidade pelo detalhe | Push-in que mergulha no mundo miniatura |

### Vocabulário de Câmera

| Movimento | O que faz | Estabilidade |
|-----------|----------|-------------|
| Push-in zoom | Aproxima do sujeito | ★★★★★ Mais estável |
| Pull-back reveal | Afasta revelando contexto | ★★★★★ |
| Dolly forward | Avança ATRAVÉS da cena | ★★★★☆ |
| Dolly lateral | Desliza lateralmente | ★★★★☆ |
| Crane up | Sobe revelando de baixo pra cima | ★★★☆☆ |
| Rotação parcial (≤30°) | Gira ao redor do sujeito | ★★★☆☆ |
| Rack focus | Muda o foco de um plano para outro | ★★★★☆ |

**Regra de ouro:** máximo 2 movimentos simultâneos. Zoom + rotação parcial = ok. Zoom + rotação + dolly = caos.

### Combinações Inteligentes

Em vez de usar sempre "slow push-in zoom", combinar movimentos que servem a narrativa:

- **Aproximação + revelação lateral:** push-in zoom enquanto rotaciona 15-20° — revela um lado da cena que a imagem estática não mostrava
- **Imersão progressiva:** dolly forward com ligeiro tilt down — como se o espectador mergulhasse no mundo
- **Grandeza épica:** começar em macro detail → pull-back expansivo revelando a escala total
- **Tensão:** zoom lento e constante, quase imperceptível, que faz o espectador sentir que está sendo puxado

---

## 3. Camadas de Vida por Contexto

A câmera sozinha não basta. Cada cena precisa de 2-3 elementos vivos que existam no contexto real da cena. Escolher os que fazem sentido — não repetir sempre os mesmos.

### Elementos Universais (funcionam em quase todo contexto)

| Elemento | Como descrever |
|----------|---------------|
| Luz e sombra | Shadows shifting subtly with camera movement |
| Atmosfera | Faint atmospheric haze adding depth between layers |

### Elementos por Ambiente

**Água (rios, mar, lagos, fontes)**
- Ondulação suave com reflexos distorcendo
- Espuma quebrando em margens
- Barcos ou objetos flutuando lentamente
- Brilho do sol/lua na superfície

**Cidade Diurna**
- Bandeiras e tecidos ao vento
- Pássaros em voo distante
- Sombras de nuvens passando no chão
- Pessoas em movimento (se a escala permitir)

**Cidade Noturna**
- Luzes de janelas piscando em ritmos diferentes (não todas sincronizadas)
- Neon pulsando com glow suave
- Reflexos em superfícies molhadas ondulando
- Faróis de carro criando light trails
- Lua visível com clouds passando na frente ocasionalmente

**Natureza / Montanhas**
- Vento nas copas das árvores
- Nuvens baixas serpenteando entre vales
- Pássaros ou partículas de pólen no ar
- Neve ou folhas caindo

**Vulcão / Fogo**
- Lava com brilho pulsante (não constante — tem ritmo orgânico)
- Fumaça subindo e expandindo
- Embers e faíscas flutuando no ar
- Superfícies ao redor brilhando com reflected glow

**Neve / Inverno**
- Flocos de neve caindo em velocidade variada
- Vapor de respiração (se tiver figuras)
- Gelo com brilho sutil refratando luz
- Wind chill visível movendo neve no chão

**Praia / Tropical**
- Ondas quebrando em ciclo
- Palmeiras balançando com vento
- Areia brilhando com partículas
- Água transparente com caustics no fundo

---

## 4. Guia por Estilo

Ao invés de templates rígidos para copiar, aqui está o pensamento por estilo:

### Map Diorama 3D

O diorama é um mundo miniatura. O movimento de câmera deve fazer o espectador sentir que está se debruçando sobre uma maquete viva.

Câmera: push-in que "mergulha" no diorama, opcionalmente com rotação parcial lenta (15-20°) para mostrar profundidade.

Vida: elementos do diorama que dariam a impressão de ser "ativado" — luzes acendendo, água começando a se mover, fumaça surgindo. Como se o mundo miniatura estivesse acordando.

### Miniature Tilt-Shift

O efeito tilt-shift DEVE ser mantido durante toda a animação (blur em cima e embaixo).

Câmera: dolly lateral lenta ou push-in suave. Nunca movimentos bruscos — quebraria a ilusão de miniatura.

Vida: veículos em movimento levemente acelerado (efeito time-lapse sutil), pessoas pequenas caminhando, objetos que reforcem a escala de brinquedo.

### Fantasy Epic

Escala e grandiosidade. O espectador deve sentir a magnitude do impossível.

Câmera: crane up ou pull-back lento revelando escala. Alternativa: push-in épico que mergulha na cena.

Vida: elementos mágicos (partículas brilhantes, runas luminosas, aurora), atmosfera dramática (nuvens rápidas, névoa), bandeiras/tecidos ao vento.

### Neon Cyberpunk

Imersão total na cidade. O espectador deve sentir que está caminhando pelas ruas.

Câmera: dolly forward entre estruturas. Movimentos que criam profundidade e paralaxe — foreground se movendo mais rápido que background.

Vida: neon piscando assincronamente, chuva contínua, reflexos em todas as superfícies molhadas, hologramas com animação sutil.

### Aerial Reveal

Descoberta progressiva do terreno. Cada segundo deve revelar mais da paisagem.

Câmera: forward glide sobre o terreno, ou crane up partindo do nível do solo.

Vida: sombras de nuvens movendo no terreno, rios fluindo, vegetação ondulando ao vento. Usar scale cues (estradas, construções) para manter noção de tamanho.

### Cinematic Macro

Mundo microscópico ganhando vida. Movimento quase imperceptível que hipnotiza.

Câmera: push-in extremamente lento, ou rack focus mudando de plano. Movimentos mínimos — qualquer coisa grande demais quebra a escala macro.

Vida: gotículas rolando, luz caustic dançando, fibras ou partículas flutuando em slow motion.

---

## 5. Anti-Artefatos

Regras que evitam os erros mais comuns de geração de vídeo:

1. **Rotação máxima: 30° total** — orbit completo (360°) é artefato garantido
2. **Máximo 2 movimentos de câmera simultâneos** — mais que isso confunde o modelo
3. **Palavras proibidas:** "transform", "change", "morph" — usar "maintain", "preserve", "lock"
4. **Smoke/fog com moderação** — Veo tende a exagerar elementos atmosféricos
5. **Se o resultado ficar instável:** remover rotação, manter só zoom puro
6. **Para loop:** especificar "ending frame matches opening frame composition"
7. **Elementos de vida: máximo 3 tipos** — mais vira caos visual
