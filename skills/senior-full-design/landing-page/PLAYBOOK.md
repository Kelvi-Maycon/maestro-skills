# Rota: Landing page

Landing page não é home. Home serve várias intenções. Landing ganha **uma**:

> uma oferta → um público → uma ação primária.

Se o pedido tem mais de uma ação primária, ou é home, ou é uma landing mal briefada. Resolva isso antes de desenhar.

---

## 1. Intake — pergunte tudo de uma vez, uma vez só

Só pergunte o que falta, em um bloco. Faltou resposta? Assuma, declare a suposição em uma linha e siga. Não trave o build.

**Oferta**
- Qual é a ÚNICA ação primária? (trial, demo, compra, waitlist, download)
- O que exatamente a pessoa recebe?
- O que conta como conversão? (clique, cadastro, compra)

**Público**
- Quem é o ICP e qual problema ele está tentando resolver?
- Três objeções principais — por que ele não compra hoje
- De onde vem o tráfego? (ads, busca, social, e-mail)
- O que ele já sabe quando chega?

**Prova**
- Logos, depoimentos, números, cases
- Screenshot, vídeo, GIF do produto
- Garantia, reembolso, cancelamento

**Restrição**
- Voz da marca, direção visual, prioridade mobile

---

## 2. Arco narrativo antes de forma

A página é um argumento, não uma pilha de seções bonitas. Defina os beats **antes** de escolher o layout — a forma existe pra carregar o argumento, nunca o contrário.

| Beat | Pergunta que responde |
|---|---|
| **Gancho** | qual é a promessa, em uma frase |
| **Problema** | o que está quebrado ou em jogo hoje |
| **Solução** | como o produto resolve |
| **Como funciona** | o fluxo concreto |
| **Prova** | qual é a evidência real |
| **Fechamento** | qual é o pedido |

Mínimo quatro beats distintos; cinco é o default. Beat fundido ou pulado de propósito: diga qual e por quê.

---

## 3. Escolha a macroestrutura — e rode contra a última

Duas páginas com paletas diferentes ainda lêem como o mesmo template se compartilham a mesma **forma**. O ritmo `hero → 3 cards → depoimento → CTA → rodapé` é o tell mais forte de "IA fez isso" no nível de página, e ele sobrevive a uma paleta perfeita.

Escolha uma macroestrutura pelo arco, **diferente da última entregue** (registrada em `.design-lock.md`). Estes são os nomes canônicos — forma detalhada, critérios de escolha e regra de rotação em `macrostructures.md`:

| Macroestrutura | Quando |
|---|---|
| **Feature Stack** | 3–6 capacidades distintas e visualizáveis, cada uma merecendo visual próprio |
| **Bento Showcase** | muitas features pequenas, mais convincentes de relance do que em sequência |
| **Editorial Index** | conteúdo denso, autoridade, portfólio, longform |
| **Long-Scroll Narrative** | precisa educar e vencer ceticismo antes do pitch; manifesto; lançamento |
| **Stat-Led** | a história é genuinamente quantitativa **e os números são reais** |
| **Gallery Grid** | o trabalho ou o produto em imagem é o pitch |
| **Product Demo / Workbench** | ver o produto rodando é o argumento mais forte |
| **Split Diptych** | produto de voz única, sensação de direção de arte |
| **Conversational FAQ** | objeção específica ou lacuna de confiança domina a venda |
| **Manifesto** | ponto de vista forte em declarações grandes; a contenção é o design |
| **Catalogue** | muitos SKUs, preço como página, changelog, produto denso em spec |
| **Poster Fold** | a marca ou uma imagem é a mensagem — evento, moda, lançamento |
| **Comparison First** | intenção de busca inclui alternativas ("X vs Y", "melhor pra") |
| **Single Offer Page** | tráfego de alta intenção, oferta curta: download, waitlist, inscrição |

Declare em voz alta antes de construir: **qual macroestrutura, como difere da última, e a sequência de beats.** Escolher no papel é o que quebra o atrator padrão — escolher enquanto constrói volta pro default.

Arquétipos que preenchem (nav, hero, feature, prova, CTA, rodapé): `component-archetypes.md`.

---

## 4. Estrutura de conteúdo

**Acima da dobra (obrigatório)**
1. Headline — resultado + público
2. Subheadline — como, com especificidade
3. CTA primário — verbo + o que recebe
4. Um sinal de prova — logo, número ou depoimento curto
5. Visual do hero — screenshot, vídeo ou ilustração forte

**Meio (o argumento)**
6. Problema → solução, uma seção
7. Benefícios, 3 a 5, orientados a resultado
8. Como funciona, 3 passos
9. Prova social

**Fim (objeção)**
10. FAQ, 6 a 12 perguntas
11. Reversão de risco — trial, cancele quando quiser, garantia
12. CTA final, idêntico ao do topo

Regras do hero (orçamento de atenção, foco único, limites de copy): `hero.md`.

---

## 5. Copy que converte

**Fórmulas de headline**
- "{Resultado} sem {dor}"
- "O {categoria} para {público}"
- "{Resultado} em {tempo}"

**CTA** — verbo + o que recebe. Nunca "Saiba mais" ou "Enviar". Use "Começar teste grátis", "Agendar demo", "Baixar o checklist".

**Benefício antes de feature.** Feature é o que faz; benefício é o que isso significa pra pessoa.

**Específico vence vago:**
- Não: "Economize tempo e otimize processos"
- Sim: "Corte o relatório semanal de 4 horas pra 15 minutos"

**Bullets de benefício**: benefício em negrito, depois a prova. `**Iteração mais rápida** — três variações de layout em um clique.`

**Prova cola na afirmação.** O depoimento fica ao lado da claim que ele sustenta, não numa seção genérica lá embaixo.

**Objeção é seção, não rodapé.** Oferta de atrito alto: suba o FAQ.

**Escreva falando.** Se lido em voz alta soa robotizado, reescreve. Proibido: "Elevate", "Seamless", "Unleash", "Next Gen", "Game changer", "revolucionário", "no mundo de hoje".

---

## 6. Sistema visual — valores, não improviso

Nada de valor inventado no meio do caminho. Tudo resolve na escala declarada. Valores completos — escala tipográfica travada, rampas de cor, sombra, dark mode: `../design/tokens.md`.

### Tipografia
- **Uma família por site.** Segunda só se o pedido pedir; mono só quando é funcionalmente necessário (código, dado, número).
- **Nunca Inter, Roboto, Arial, Open Sans, Helvetica como display** — salvo quando a marca ou a recipe manda.
- Nunca itálico na interface. Nunca peso 900/black — para em bold.
- Todo tamanho cai num degrau da escala. Não sobra `text-[19px]`, `font-size: 22px`, `1.4rem`. Não caiu exato: desce pro degrau imediatamente abaixo, levando o line-height do par.
- Contraste título/corpo mínimo 2.5×; no hero, 4–6× é normal.
- `text-wrap: balance` em heading, `text-wrap: pretty` em corpo. Nenhuma palavra órfã sozinha na última linha.

### Espaçamento
Escolha a escala uma vez, grave no lock, reuse. Valores: `2 · 4 · 8 · 12 · 16 · 24 · 32 · 40 · 48 · 64 · 80 · 96 · 128 · 192`.

Duas regras que decidem se a página respira:
- **Interno ≤ externo.** O padding de um card é menor ou igual ao gap entre ele e o vizinho. Violar isso é o que faz um layout parecer apertado num lugar e vazio no outro ao mesmo tempo.
- **Padding de seção pesa por papel.** Seção pivô (hero, prova principal) ganha 128–192px. Aplicar o mesmo valor em toda seção é o que faz a página inteira ler como "nada tem momento próprio".
- Card de conteúdo (preço, feature, depoimento) tem piso de 24px de padding interno.

### Raio
Uma gramática de raio, aplicada por papel de componente. Forma aninhada com gap menor que 32px:

```
raio interno = raio externo − gap        (só quando o resultado > 2)
```

Card externo 16px com 8px de padding → elemento interno com 8px.

### Fundo e borda
- Borda vai em volta inteira ou não vai. Nunca só de um lado.
- Fundo é chapado. Gradiente de fundo é o tell número um.
- Se a direção pede gradiente, o lugar dele é no texto do heading do hero, e só ali.

### Ícones
Um set por projeto, mesma espessura de traço em tudo. Phosphor, Solar, Lucide, Tabler, Iconoir. Nunca Material Icons/Symbols como default, nunca emoji no lugar de ícone.

```bash
python3 scripts/fetch_icons.py --search "termo" --mood <mood>
python3 scripts/fetch_icons.py --icons nome1 nome2 --mood <mood> --color "#accent" --out design/assets/icons
```

---

## 7. Conteúdo realista

Os tells de página gerada, todos evitáveis:

- Nada de Lorem ipsum — escreva rascunho de copy real.
- Nada de "John Doe" — nomes plausíveis e variados.
- Nada de "Acme Corp", "Nexus", "SmartFlow" — invente nome contextual que soe real.
- Nada de número redondo falso (`99.99%`, `50%`, `$100.00`) — use `47,2%`, `R$ 89`, dado orgânico.
- Sentence case nos headers, não Title Case Em Tudo.
- Voz ativa. "Não conseguimos salvar suas alterações", não "Ocorreu um erro".
- Sem exclamação em sucesso, sem "Ops!" em erro. "Falha na conexão. Tente de novo."
- Avatar único por pessoa, datas de post variadas.

**Nada de prova inventada.** Número, depoimento, logo de cliente e selo de segurança fabricados destroem credibilidade — e a pessoa percebe quando os números não batem. Sem prova real: placeholder marcado, ou a seção não existe.

---

## 8. Requisitos de entrega

O que sempre esquecem e faz a página parecer inacabada:

- Política de privacidade e termos no rodapé
- 404 customizada com a marca
- Validação de formulário no cliente (formato de e-mail, campo obrigatório)
- Link "pular para o conteúdo" pra teclado
- Favicon da marca
- `<title>`, meta description, `og:image`, tags sociais
- Alt em toda imagem com significado
- HTML semântico: `<nav>`, `<main>`, `<article>`, `<section>`
- Caminho de volta em toda página
- Item atual indicado na navegação

**SEO/AEO**: página de campanha só de ads ou oferta com prazo → `noindex`. Oferta perene com intenção de busca casando com a promessa → indexa, com title, meta, links internos e o FAQ em pergunta/resposta literal (schema de FAQ quando fizer sentido).

---

## 9. Ordem de construção

Seção por seção, nesta ordem: **hero → benefícios → como funciona → prova → FAQ → CTA final.**

Nunca reconstrua a página inteira a cada iteração. Seção por seção mantém o diff revisável e o controle com o usuário.

Antes do código, devolva nesta ordem: outline das seções · copy do hero · benefícios · passos · FAQ · recomendação de index/noindex · macroestrutura escolhida e por quê.

---

## Checklist

**Estratégia**
- [ ] Uma oferta, um público, uma ação primária
- [ ] Nenhum CTA concorrente acima da dobra
- [ ] Arco com no mínimo 4 beats, declarado
- [ ] Macroestrutura escolhida por nome e diferente da última
- [ ] Número específico no lugar de verbo vago
- [ ] Pelo menos uma reversão de risco
- [ ] Prova ao lado da claim que ela sustenta

**Visual**
- [ ] Uma família tipográfica, sem itálico, sem black
- [ ] Todo tamanho num degrau da escala
- [ ] Todo espaçamento na escala; interno ≤ externo; seção pivô com padding maior
- [ ] Raio aninhado pela fórmula
- [ ] Sem borda de um lado só, sem gradiente de fundo
- [ ] Um set de ícones, mesma espessura
- [ ] Toda seção que pedia visual tem visual real

**Conteúdo e entrega**
- [ ] Sem lorem, sem marca placeholder, sem número redondo falso, sem clichê de IA
- [ ] Hover, active, focus, loading, empty e error presentes
- [ ] Sem link morto; item de nav atual indicado
- [ ] 404, legal, validação, favicon, meta, alt
- [ ] `anti_slop_scan.py` e `audit_motion.py` limpos de HIGH
