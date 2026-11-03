# Arquétipos de componente

A macroestrutura é a forma da página. Estes são as **peças** que a preenchem. Cada uma tem um ID estável (pra registrar no lock e rotacionar) e botões de variação.

**Regra de rotação:** nav, rodapé e hero precisam diferir da última construção. Reusou um arquétipo? Mude pelo menos um botão.

---

## Nav

| ID | Forma | Serve |
|---|---|---|
| `nav-inline` | logo à esquerda, links no centro ou à direita, CTA na ponta | default de SaaS; seguro |
| `nav-pill` | pílula flutuante destacada do topo, fundo com blur | direção de arte, produto premium |
| `nav-minimal` | só logo + uma ação; navegação mora no rodapé ou num menu | manifesto, pôster, portfólio |
| `nav-sidebar` | coluna lateral persistente | app shell, doc, catálogo longo |
| `nav-mega` | dropdown com colunas e descrição | produto com muitas linhas ou público segmentado |
| `nav-overlay` | hambúrguer que abre overlay de tela cheia com links grandes | estúdio, editorial, mobile-first |

**Botões:** fixo vs. some no scroll · transparente sobre o hero vs. sólido desde o topo · com CTA vs. sem · com indicador de seção atual.

---

## Hero

| ID | Forma |
|---|---|
| `hero-split` | copy de um lado, visual do outro, um lado dominando levemente |
| `hero-centered` | copy centralizada, visual abaixo — **precisa de justificativa**, é o default estatístico |
| `hero-fullbleed` | imagem ou composição ocupa a tela; copy sobreposta |
| `hero-demo` | o produto rodando é a peça principal, cortado pela viewport |
| `hero-type` | só tipografia, sem imagem; a escala é o visual |
| `hero-stat` | um número dominante como âncora |
| `hero-diptych` | duas colunas de peso comparável, com uma divisória forte |

**Botões:** visual à esquerda vs. à direita · com chip de métrica vs. sem · com prova logo abaixo vs. prova só depois · CTA único vs. primário + secundário.

Regras completas: `hero.md`.

---

## Feature / capacidade

| ID | Forma |
|---|---|
| `feat-band` | faixa full-width por feature, texto e visual alternando lado |
| `feat-bento` | grade assimétrica de tiles, cada um com um fragmento de UI |
| `feat-list` | lista vertical densa com marcador visual pequeno |
| `feat-tabs` | um painel, várias abas — só uma feature visível por vez |
| `feat-steps` | passos numerados formando um fluxo |
| `feat-compare` | tabela ou par lado a lado de antes/depois |

**Nunca:** três cards com ícone e dois parágrafos cada. É o arquétipo mais gerado e o mais vazio — cada um deles é texto onde deveria ter visual.

**Botões:** quantas por seção · visual real vs. diagrama · com número vs. sem.

---

## Prova

| ID | Forma |
|---|---|
| `proof-logos` | faixa de logos de cliente — **só com permissão real** |
| `proof-quote` | um depoimento grande, com rosto e cargo |
| `proof-grid` | várias citações menores em grade |
| `proof-metric` | números reais com rótulo curto |
| `proof-case` | um estudo de caso com antes/depois e resultado |
| `proof-inline` | prova encaixada ao lado da claim que ela sustenta, sem seção própria |

`proof-inline` é o mais forte e o menos usado. Prova ao lado da afirmação vence prova numa seção genérica no rodapé da página.

**Sem prova real:** o arquétipo não existe. Não invente logo, número nem depoimento.

---

## CTA

| ID | Forma |
|---|---|
| `cta-band` | faixa de largura total com fundo de contraste |
| `cta-card` | card centralizado, elevado do fundo |
| `cta-inline` | dentro do fluxo, sem faixa própria |
| `cta-sticky` | barra que aparece depois de N% de scroll |
| `cta-split` | ação primária + caminho de menor compromisso lado a lado |

**Botões:** repete a headline do hero vs. reformula · com reversão de risco na linha de baixo vs. sem.

O CTA final repete a **mesma promessa** do topo. Promessa nova no fim significa que a página tem duas ofertas.

---

## Rodapé

| ID | Forma |
|---|---|
| `foot-columns` | colunas por categoria, o clássico |
| `foot-minimal` | uma linha: logo, legal, contato |
| `foot-sitemap` | mapa completo, denso, para site grande |
| `foot-statement` | uma declaração grande + links pequenos abaixo |

Obrigatório em qualquer um: privacidade, termos, caminho de contato.

---

## Cabeçalho de seção

| ID | Forma |
|---|---|
| `head-eyebrow` | rótulo pequeno em caixa alta + título + parágrafo |
| `head-plain` | só o título |
| `head-lead` | frase de abertura que já é o conteúdo, sem título separado |
| `head-numbered` | número do capítulo + título |
| `head-none` | a seção abre direto no conteúdo |

**`head-eyebrow` em toda seção é falha detectável.** O mesmo empilhamento rótulo + título + parágrafo repetido cria ritmo mecanicamente templatizado. Varie: às vezes uma frase de abertura, às vezes um número, às vezes nada.

---

## Como preencher uma macroestrutura

1. A macroestrutura fixa quantas seções e qual o ritmo
2. Cada beat do arco recebe **um** arquétipo
3. Nav, hero e rodapé conferidos contra a última construção
4. Feature e prova escolhidos pelo tipo de evidência que existe de verdade, não pelo que ficaria bonito
5. Registre a combinação no `.design-lock.md`
