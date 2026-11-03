# Tokens — cor, tipo, espaço, raio, sombra

Valores concretos. Nada aqui é "sinta o que fica bom" — cada decisão tem uma regra que resolve.

---

## Cor

### Sistema é rampa, não cor solta

Uma rampa neutra, uma rampa de acento, e só as rampas de status que o produto realmente renderiza. Rampa de `warning` que ninguém importa é manutenção pra zero pixel. Segunda hue de acento só se ganha o lugar quando duas coisas precisam ser distinguíveis de relance.

**Todo degrau tem um trabalho.** A rampa não é um gradiente pra escolher a olho — cada degrau existe porque um papel precisa dele: fundo de página, hover de componente, borda, preenchimento sólido, texto de corpo. Não gere degrau que papel nenhum consome.

**Quatro propriedades de uma rampa bem formada:**
- Degraus avançam em lightness **percebida**, não no que o formato chama de lightness
- Hue constante de ponta a ponta
- Saturação pico no meio da rampa, caindo nas duas pontas
- Degraus mais densos na ponta clara que na escura

As duas pontas param antes do preto e do branco puros — nenhum dos dois carrega hue.

### Nome de primitivo vs. nome semântico

Primitivo nomeia valor (`--blue-500`) e **nunca é aplicado em componente**. Token semântico nomeia trabalho (`--color-text-secondary`), aponta pro primitivo, e é a única camada que componente referencia.

Essa costura é o que torna tema possível. Sem ela, dark mode vira auditar cada uso pra descobrir qual queria dizer "o acento" e qual só queria azul.

**Use token só no papel dele.** Nunca pegue emprestado porque o valor está certo hoje. Separador usado como cor de texto funciona até a borda clarear — e aí o texto vai junto. Papel sem token? Cria o token.

### Uma cor, um significado

Uma cor serve um propósito na interface inteira. Trate qualquer coisa dentro de 15° de hue como a mesma cor. Se o acento significa "interativo", essa hue num texto estático manda o usuário clicar no que não clica.

**Um preenchimento por tela.** Quando cor cheia significa ênfase primária, uma ação primária ganha e as vizinhas ficam neutras. Cor no fundo, não no rótulo — botão preenchido lê como primário do outro lado da sala; texto colorido em botão neutro lê como link.

Cor nunca é o único carregador de significado.

### Sem referência: gere, não escolha de um catálogo

Catálogo fixo de paletas significa que dois pedidos parecidos produzem o mesmo site — monocultura nova em cinco sabores. Classifique o humor pela ideia e gere:

| Humor | Sinais no pedido |
|---|---|
| **Premium / confiante** | fintech, banco, investimento, B2B, analytics, enterprise, jurídico, seguro, dashboard de ops |
| **Quente / acolhedor** | saúde, bem-estar, terapia, coaching, comunidade, educação geral, ONG, comida, marketplace pra pessoa física |
| **Técnico / builder** | ferramenta de dev, API, CLI, infra, devops, banco de dados, monitoramento, open source |
| **Brincalhão / consumer** | jogo, ferramenta de criador, público jovem, dating, música, social, qualquer coisa explicitamente "divertida" |
| **Elegante / editorial** | publicação, revista, blog, portfólio, moda, joia, galeria, agência, "premium mas suave" |

```bash
python3 scripts/generate_palette.py --mood <humor> [--mode light|dark] [--seed N]
```

Hue base dentro da faixa do humor, regra de harmonia pro acento (análoga / complementar / tríade / split / mono), e lightness por papel resolvida pra bater o piso de contraste **por construção** — em OKLCH, onde contraste é previsível. Sem `--seed`, paleta nova a cada rodada.

Pareie com o caráter tipográfico do humor:

| Humor | Display + corpo | Alternativa |
|---|---|---|
| Premium | Unbounded + Albert Sans | Geist + Geist |
| Quente | Zain + Nunito | Epilogue + Baskervville |
| Técnico | Archivo + IBM Plex Sans (mono só pra código/dado) | Geist + Geist Mono pra dado |
| Brincalhão | Urbanist + Open Sans | Fredoka + Nunito |
| Elegante | Gloock + Inter | EB Garamond + DM Mono |

### Contraste é contrato

Duas checagens, não uma:

1. **Texto de corpo vs. fundo** — 4,5:1 mínimo. Essa todo mundo lembra.
2. **Rótulo de botão vs. preenchimento primário** — também 4,5:1, e é a que escapa, porque é consequência da paleta, não um valor dentro dela. Cor que parecia ótima como amostra costuma entregar 2,5–3,6:1 com texto branco por cima.

Acento se checa só contra o fundo, no piso mais leve de 3:1 de componente de UI — o papel dele (link, destaque, pipoco pequeno) não é preenchimento sólido de botão.

```bash
python3 scripts/check_contrast.py --matrix text=#hex bg=#hex surface=#hex primary=#hex accent=#hex border=#hex on-primary=#hex
```

Grave a saída no `.design-lock.md`. **Par novo que aparece durante o build não é escolha livre** — é bandeira. Ordem de correção:

1. Reusar par já legal pra aquele propósito (quase sempre já está no lock)
2. Mexer na lightness dentro da própria família de hue — desloca lightness preserva o caráter, deslocar hue não — e rodar a matriz de novo
3. Cair pro neutro seguro da paleta (`text` ou `on-primary`) só naquele par
4. Restrição externa dura (hex fixo do cliente que não bate o piso) → **avise o usuário**, não entregue o par quebrado nem troque em silêncio

Meça o par **como renderizado**: primeiro plano contra o fundo em que ele de fato aparece, não contra o fundo da página.

### Gradiente

Espaço de interpolação é aparência, não correção:
- **`in oklab`** — melhor default: brilho uniforme, sem surpresa de hue
- **`in oklch`** — dá a volta na roda de hue, mantém vivo; use quando um gradiente de duas hues fica cinza no meio
- **sRGB (o default)** — escurece e apaga o meio. É o que quase toda interface tem, porque é o que sai sem pedir

---

## Tipografia

**Menos fonte, menos tamanho, menos peso.** Duas famílias no máximo — uma display, uma corpo. Mono só quando é funcionalmente necessário (código, dado, número que muda). Carregue só os pesos que você realmente usa; peso sintético do navegador é feio e mais lento.

**Escala com nome semântico**, não tamanho solto. `display`, `title`, `subtitle`, `body`, `caption`, `label` — o componente pede o papel, não o pixel.

A escala travada. Todo tamanho cai num destes degraus; não caiu exato, desce pro degrau imediatamente abaixo, levando o line-height do par:

| Papel | Tamanho | Line-height | Onde |
|---|---|---|---|
| `caption` | 12px | 1.35 | legenda, metadado, crédito |
| `label` | 13–14px | 1.4 | label de campo, chip, nav densa |
| `body-sm` | 14px | 1.5 | UI densa, tabela, sidebar |
| `body` | 16px | 1.55 | corpo default web |
| `body-lg` | 18px | 1.55 | corpo de landing/editorial |
| `subtitle` | 20–24px | 1.3 | subhead, lead, título de card |
| `title-sm` | 28–32px | 1.25 | h3, título de card grande — só subordinado a um `title` na mesma vista |
| `title` | 40–48px | 1.15–1.2 | título de seção (cumpre o piso de 2,5× o corpo) |
| `display` | `clamp(44px, 3.5vw + 30px, 64px)` | 1.05–1.1 | hero padrão (~4× o corpo no teto) |
| `display-xl` | `clamp(56px, 6vw + 32px, 96px)` | 1.0–1.05 | hero tipográfico/manifesto — um por página (até 6×) |

Degrau intermediário solto (`19px`, `22px`, `1.4rem`) não existe. Os `clamp()` de display são o teto que `../landing-page/hero.md` referencia — headline de 9–12 palavras desce ~15–20% em toda a faixa.

**Tamanho de heading desce com o nível.** `h3` maior que `h2` na mesma página é bug de sistema, não escolha.

**Line-height por papel:**
- Display grande (≥ 40px): 1.0–1.15
- Título: 1.2–1.3
- Corpo: 1.5–1.6
- Label/caption denso: 1.3–1.4

**Letter-spacing por tamanho:** display grande fecha (−0.02 a −0.04em); corpo fica em zero; label pequeno em caixa alta abre (+0.04 a +0.08em).

**Medida (largura de linha):** 45–75 caracteres pro corpo. Passou disso, o olho perde a linha na volta.

**Contraste de escala:** título ≥ 2,5× o corpo. No hero, 4–6× é normal — e é o que separa hierarquia de "tudo do mesmo tamanho".

**Quebra deliberada:** `text-wrap: balance` em heading, `text-wrap: pretty` em corpo. Nenhuma palavra órfã na última linha. Em heading de hero, quebre onde o pensamento quebra, não onde a caixa acaba.

**Número que muda usa `font-variant-numeric: tabular-nums`** — contador, preço, relógio, célula de tabela. Sem isso a linha dança a cada atualização.

**Input em mobile: 16px mínimo.** Abaixo disso o iOS dá zoom sozinho ao focar.

**Nunca como display:** Inter, Roboto, Arial, Open Sans, Helvetica, system-ui — salvo quando a marca ou a recipe manda. Lê como página de demo.

**Nunca:** itálico na interface, peso 900/black, três famílias.

### Script não-latino

CJK e coreano **não** são troca de fonte dentro do mesmo modelo — é outro modelo. Uma família só numa escala de peso, não duas famílias pareadas. Não reuse o instinto latino de "aperta o tracking": em CJK isso piora a leitura. Line-height mais folgado que a convenção latina de display. Em texto de UI, `word-break: keep-all`. Coreano: Pretendard é o ponto de partida seguro.

---

## Espaçamento

Base 4px. Degrau com papel, não só número:

| Token | Valor | Serve pra |
|---|---|---|
| `space-1` | 4px | fio de cabelo: ícone→rótulo, padding interno de badge |
| `space-2` | 8px | elementos muito relacionados: label e valor |
| `space-3` | 12px | interno de componente denso: célula de tabela, linha de nav de app |
| `space-4` | 16px | padding padrão de componente: botão, tile de métrica compacto |
| `space-6` | 24px | separação de grupo; **piso de padding interno de card de conteúdo** |
| `space-8` | 32px | card com peso real (tier destacado, painel de showcase) |
| `space-12` | 48px | seção compacta; gap entre elementos grandes dentro do hero |
| `space-16` | 64px | padding de seção default; piso das seções conectivas de uma landing |
| `space-24` | 96px | seção com peso real |
| `space-32` | 128px | seção pivô de landing (hero, prova principal) |
| `space-40` | 160px | seção que é o beat mais forte da página |
| `space-48` | 192px | teto observado em landing bem separada — uma seção só |

Valores entre degraus (20, 28, 40, 56) são legais mas raros — só quando um alinhamento específico pede. Projeto com seis valores arbitrários entre 16 e 32 lê como não-intencional.

### A regra que decide qual degrau: interno ≤ externo

O espaço **em volta** de um grupo é maior ou igual ao espaço **dentro** dele. É proximidade de Gestalt: perto agrupa, longe separa. Se o padding de um card é maior que o gap entre ele e o vizinho, o olho não acha onde um termina — exatamente a sensação de "apertado e confuso ao mesmo tempo".

Concreto: três cards de preço com 24px entre eles → cada card com 24px ou mais de padding interno, nunca menos.

### Piso por tipo de card

- **Compacto/denso** (tile de métrica, linha de lista, item de nav): 12–16px
- **Conteúdo** (feature, tier de preço, depoimento — tudo com heading + corpo): **24px mínimo**
- **Showcase/hero** (moldura de prova, tier em destaque): 32px ou mais

O card que carrega mais peso visual tem mais espaço interno, não o mesmo de todo mundo.

### Padding de seção — só landing/marketing

App shell fica na densidade compacta acima; tela de configuração com padding de hero só gasta scroll.

Numa landing, o **gap de fronteira** entre duas seções (padding de baixo de uma + padding de cima da outra) costuma dar 120–250px no desktop. Esse gap é a pausa que o visitante percebe antes da próxima ideia. Menor que isso, as seções borram numa rolagem só e nenhuma tem momento próprio.

Pese pelo papel — **não achate tudo no mesmo valor:**
- **Conectiva** (faixa de logos, barra de confiança, transição curta): 48–64px
- **Padrão** (explicação de feature, bloco de depoimento): 64–96px
- **Pivô** (hero, prova principal, a seção que carrega o argumento): 128–192px

Consistência mora **na regra** (como o tier é escolhido), não em forçar todo mundo pro mesmo número — essa chatura é um tell próprio.

Esses valores são desktop. No mobile, desça um ou dois tiers: seção pivô de 192px vira 96–128px abaixo de 40rem. O peso relativo se mantém, os absolutos comprimem.

**Respiro sozinho separa.** Landing boa com esse range de padding costuma manter o mesmo fundo do começo ao fim e deixar o espaço fazer o trabalho — sem faixa alternada, sem divisória.

---

## Raio

Uma gramática por projeto (ex.: 4 / 8 / 16 pra sm/md/lg), atribuída por **papel de componente**, não por gosto na hora. Misturar valor arbitrário entre componentes é o mesmo tipo de falha que espaçamento arbitrário.

**Fórmula do aninhado** — forma dentro de forma com gap menor que 32px:

```
raio interno = raio externo − gap        (só aplica se o resultado > 2; abaixo disso, deixa reto)
```

Card externo `16px` com `8px` de padding → elemento interno com `8px`.

Deriva de forma (pílula, card reto, card macio e controle circular convivendo sem regra semântica) é falha detectável: atribua raio por papel e consolide os tokens.

---

## Sombra e elevação

Declare a hierarquia de elevação (1 a 5) e use só ela. Regras:

- Sombra vem de uma fonte de luz só — todas as sombras do projeto caem pro mesmo lado.
- Sombra colorida e glow são decisão de marca, não default. A maioria dos sistemas usa preto com alpha baixo.
- Em dark mode, sombra quase não existe: elevação se comunica por **superfície mais clara**, não por sombra mais escura.
- `rgba(0,0,0,…)` puro em cima de fundo colorido acinzenta. Use a hue neutra do projeto com alpha.

---

## Dark mode

Duas decisões diferentes, não confunda:

- **Modo travado** (só claro ou só escuro) — o normal em site de marketing.
- **Toggle em runtime** — o normal em ferramenta interna. Gere o par a partir do **mesmo `--seed`** em `--mode light` e `--mode dark`, valide os dois com `check_contrast.py --matrix`, e grave a decisão no lock.

Adaptação nunca é inverter. Elevação sobe clareando superfície; saturação **desce** (cor saturada em fundo escuro vibra); contraste se rebalanceia porque branco puro em preto puro cansa a vista — use `#F7F8F8` sobre `#08090A`, não `#FFF` sobre `#000`.

Fundos escuros que funcionam: quase-preto com subtom quente ou frio, nunca `#000000` chapado como superfície principal.

---

## Gravar no lock

Depois de fechar, grave em `.design-lock.md`: paleta com papéis + matriz de contraste (pares legais), famílias e pesos, escala de espaçamento realmente usada, grade de raio, hierarquia de sombra, curva e duração de motion. A segunda tela reusa em vez de re-derivar. Formato: `../reference/style-lock.md`.
