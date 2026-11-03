---
date: 2026-09-05
tags: [marketing, processo, validacao-oferta]
related: ["[[ordem-de-criacao]]", "[[fase-3-pecas-do-amplo]]", "[[fase-4-regua-e-rodar]]", "[[teste-de-aderencia-3-camadas]]", "[[schwartz-desejo-consciencia-sofisticacao]]"]
status: fechado
---

# Fase 5 — Leitura, fino e escala

> [!important] Fechado em 2026-09-05. Esta é a regra. A proposta original ficou no arquivo do Kelvi, fora do repo. Mudança de regra entra aqui.

## Princípio

**Só o desejo vencedor. Uma alavanca por rodada. A camada que falhou decide a alavanca.** Validado = ROAS após reembolso ≥ 1 (bruto ≈ 1,18 com r=15%), ver [[fase-4-regua-e-rodar]] (2026-09-11). Antes disso é compra de dado, e nada escala.

## As 3 sub-fases

| | 5a — Fino | 5b — Lateralizar | 5c — Verticalizar |
|---|---|---|---|
| **Pergunta** | como vender esse desejo? | quantos jeitos de entrar nessa porta funcionam? | quanto dá pra escalar? |
| **Escopo** | só o desejo vencedor | só a porta vencedora | só os melhores anúncios de 5b |
| **Estrutura** | ABO, matriz de 4 contra controle | 4 CBOs **diferentes entre si** (modificador, formato, hook) dentro da porta, 8 anúncios cada | 1 CBO **nova** com os vencedores |
| **Orçamento** | ticket/dia por conjunto | o que faz os 32 chegarem nas travas | **≥ 7 × CPA alvo/dia** (CPA 54 → R$ 380+; com folga 10× → R$ 540) |
| **Aprendizado do Meta** | não importa — é teste | não importa — é teste | é o objetivo: 50 conversões/7 dias. Nada de degrau de 20% |
| **Alavanca** | belief · ticket médio · hook | ampliar a porta, não testar porta nova | escala |
| **Vídeo** | não | não | só se a pré-escala validar |
| **Entra quando** | vencedor do amplo (bom caminho ou forte) | **validado**: ROAS após reembolso ≥ 1, ≥ 5 vendas | ROAS após reembolso ≥ 1 sustentado em 5b |
| **Sai quando** | ROAS após reembolso ≥ 1 · 3 rodadas sem cruzar 2× ticket · 3 beliefs sem sinal | melhores identificados | CPA > 2× alvo por 3 dias seguidos **após** o aprendizado → corta 50%, não mata (primeiros 3 dias não se lê) |
| **Controle** | anúncio vencedor do amplo | idem | amplo e 5b seguem rodando |

## 1. Régua de validação

Vereditos do amplo (morto · respira · bom caminho · forte) e o que cada um manda pra 5a: [[fase-4-regua-e-rodar]] §5. Validado (→ 5b) e escalável (→ 5c): linha "Entra quando" da tabela acima.

## 2. Roteador de gargalo (escolhe a alavanca da rodada 1 do fino)

| Sintoma no vencedor | Hipótese | Rodada 1 |
|---|---|---|
| CTR bom, LP→checkout < 10% | o gancho abriu o loop e a LP não fecha | diagnóstico por scroll: saiu em 5 s = não leu → corrige só cabeça/primeira dobra; rolou até o preço e saiu = não acreditou → reescreve lead + 3 crenças em cima da curiosidade do anúncio vencedor, com mais verossimilhança. Persistindo: belief #2 |
| LP ≥ 10%, pago < 35% | preço, oferta ou risco | preço (2 pontos) ou garantia mais forte |
| Taxas boas, CPA entre R$ 54 e 108 | copy funciona; a alavanca é **ticket médio** | preço + order bump + upsell; A/B de copy em segundo plano |
| Uma porta muito acima das outras | desejo mais latente que o previsto | ampliar a porta: rodada de variações de hook/modificador; belief novo pro ângulo em rodada separada |

Regras: só um sintoma manda — o de cima na cadeia vence (camada 1 antes da 2, 2 antes da 3), porque gargalo de cima esconde o de baixo. Sintoma fora da tabela = hipótese nova no ledger antes de testar.

## 3. Alavancas do fino (5a)

O ledger diz **qual camada** falhou; a alavanca é o que existe pra mexer nela. Não se testa variável de camada boa.

| Camada que falhou | Alavanca | Detalhe |
|---|---|---|
| 2 · LP (LP→checkout fraco) | **Belief** #1 vs #2 | corpo da LP inteiro |
| 3 · Checkout (pago fraco) ou tudo bom com CPA alto | **Ticket médio** | preço 27 → 47 → 97, order bump, upsell, garantia |
| 1 · Anúncio (CTR/CPC fraco) ou ampliar porta | **Hook** | matriz de 4 (4, 8, 12, 16) na porta vencedora; modificador livre por porta (inclui preguiça / "eu faço por você"); termo chiclete é uma das variações, não rodada própria |

- Termo chiclete não se isola por venda. Aparece no CTR da porta "mecanismo" e no verbatim de quem comprou.
- Ordem de saturação (2026-09-12, Dereck Carneiro): quanto mais perto do primeiro contato, mais rápido morre. Chiclete → formato → hook → causa. Causa validada não satura; o que satura é a solução/entregável (a pessoa pensa "já tentei isso"). Na queda, trocar nessa ordem e preservar a causa; renovar a solução com o vocabulário em alta antes de trocar o belief.
- Hipótese de leilão por chiclete: usar o mesmo chiclete de quem gasta mais dá vantagem a ele; chiclete mais forte de um concorrente rouba o público ("Monjaro natural" → "Monjaro brasileiro" → "sal rosa"). Peça caindo com controles estáveis: conferir na Biblioteca se apareceu concorrente com o mesmo chiclete antes de declarar fadiga. Não comprovado; tratar como hipótese de diagnóstico ao lado de [[meta-politica-qualidade-e-diagnostico]].
- **Fechamento** como rodada própria da camada 3 (2026-09-12, Dereck Carneiro no Segredos da Escala #14): caso dele foi de 0,7% pra 2% de conversão mexendo só no fechamento, copy intacta. Ordem: produto → como funciona em termos concretos (quantidade, tempo, o que ela faz) → benefícios → âncora → preço → CTA 1 → **bônus** → garantia → CTA. Bônus depois do preço: no preço ela diz "talvez", o bônus vira "sim" (Fladlien). Três regras de bônus: quebra uma objeção declarada; seria vendável sozinho como upsell; done-for-you que remove o trabalho da consequência lógica seguinte. Presente surpresa (Bencivenga): um bônus não revelado, só curiosidade; ele não isolou, mas o suporte recebe pergunta. Pré-checkout: página entre LP e checkout com depoimentos e objeções, foi o que tirou uma oferta de break-even. FAQ entra aqui. Testar fechamento como se testa lead: um elemento por rodada, controle rodando. Números dele são anedota sem denominador; direção, não meta.
- Ticket médio (rodada de bump/upsell): duas regras de desenho. **Upsell pela consequência do resultado** ("vai emagrecer, e a pele fica flácida"), não produto adjacente. **Personalização como salto de valor**: a versão genérica "pode não funcionar pra você porque depende de X" → quiz → plano/software; transforma e-book em produto que sustenta ticket maior. O número dele (40% de conversão de upsell, nutra EUA) é referência de mercado, não meta.
- Rodada = 4 dias, mesmas travas da fase 4, matriz de 4 contra o controle. Controle sempre roda.

## 4. LP completa — quando entra

Gatilhos: rodada de **belief** (reescreve o corpo → já completo) ou rodada de **ticket médio** (2 planos, bump e upsell precisam da página inteira). Se o roteador mandar pra hook, a LP curta continua.

LP completa = 10 crenças (claim–prova–benefício, prova perto da dúvida) · recusa honesta · escada de intensidade da promessa · 5 objeções (serve pra mim? funciona? funciona pra mim? por que você? por que agora?) · bônus · 2 planos + downsell no clique do barato · FAQ. Prova: depoimento real de quem comprou no amplo, provas do brief. Slot só onde ainda não tem. Ainda nada inventado.

## 5. Parada do fino (5a → 5b ou morte)

| Condição | Decisão |
|---|---|
| CPA ≤ ticket médio × (1 − r) (ROAS após reembolso ≥ 1) com ≥ 5 vendas | validado → 5b (5b já é mais dado; não se exige 2 rodadas) |
| Belief: **máx. 3 por ângulo**; o 3º só entra se o 1º ou o 2º deu sinal (respira/bom caminho) | 3 sem sinal → mata o ângulo |
| 3 rodadas sem cruzar 2× ticket | mata |
| Camadas 1–2 boas, camada 3 não sobe com preço/bump/garantia | é oferta, não copy. Para e registra |

Por que 3 rodadas: 12 dias + amplo ≈ 3 semanas por desejo. Mais que isso virou o loop lento.

## Complementos operacionais — 2026-09-11

- 5a: [[oferta-copy-e-pesquisa-aplicada]] quando falhar oferta/argumento; escolher uma correção da rubrica, não refazer tudo.
- 5b: [[anuncios-estaticos-formatos-e-producao]] para formatos e hooks dentro da porta vencedora. Marcar formato/versão no ledger e preservar controle.
- 5c: [[meta-politica-qualidade-e-diagnostico]] para fadiga, saturação e anomalia. Sintoma gera hipótese; números genéricos de aumento de orçamento não substituem a régua.
- Variante com pouca entrega é **inconclusiva**, não fracasso comprovado. Reteste separado pode caber no orçamento previsto; não adotar taxa genérica de “20% de zombies vencedoras”.

## 6. Depoimento e debrief

- Perguntas de pós-compra: **não por enquanto** (opção registrada: "o que te fez comprar?" / "o que quase te fez não comprar?").
- Depoimento: na entrega do micro produto, manda o exemplo hiper-realista; a pessoa devolve com as palavras dela. Preenche o slot.
- **Debrief lite** (meia página, fim de cada sub-fase): belief confirmado/refutado com a linha do ledger · porta e modificador vencedores corrigem o diagnóstico Schwartz · onde régua e roteador erraram. **Alimenta o próximo belief** e a fase 1 do próximo desejo.

## Saída da fase

Promessa vencedora + belief + termo chiclete + porta + hook + preço/ticket médio · peças vencedoras · N pagantes · depoimentos coletados · debrief. Entrada do estágio seguinte (entregável, retenção, LTV) — fora de escopo aqui.

## Pronto quando

Critério de parada bateu (validado e escalado, ou morto com motivo no ledger). Debrief escrito.
