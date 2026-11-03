---
date: 2026-09-05
tags: [marketing, validacao-oferta, teste]
related: ["[[README]]", "[[desejos-intrinsecos-e-modificadores]]", "[[schwartz-desejo-consciencia-sofisticacao]]"]
---

# Teste de aderência de mercado em 3 camadas

## Premissa

- Objetivo: saber **o que as pessoas pagariam pra ter** antes de existir produto, método ou entregável estruturado.
- Velocidade de aprendizado = volume de sinal ÷ latência do sinal. Produzir mais só resolve o numerador.
- Onde o loop trava (em ordem): latência da métrica → regra de decisão não pré-combinada → sample size → produção.
- Feedback rápido é escolha de **onde** e **o que** medir, antes de ser capacidade de produção.

## As 3 camadas

| Camada | Valida | Métrica | Latência |
|---|---|---|---|
| 1. Anúncio → clique | atenção, ângulo, interesse, nível de consciência | CTR | horas |
| 2. LP → checkout | promessa forte, one belief, argumento lógico | taxa LP→checkout | horas/dias |
| 3. Checkout → pago | vale o preço | conversão / pré-venda | dias |

- Cada camada filtra. Ângulo morre no clique sem precisar de LP.
- Ranking vem da **combinação** das camadas, não de camada isolada. Ângulo pode ganhar na 1 e perder na 2.
- Clique e lead mentem; dinheiro não. Sinal real = checkout iniciado ou pago.
- Furo lógico mata na camada 2, não na 1: a pessoa clica no ângulo e desiste na LP. Ver [[verossimilhanca-sofisma-paltering]].

## O que entra / fica fora

**Entra**
- Promessa + preço + botão de pagar, sem produto atrás (smoke test de oferta).
- Variações **reais** de ângulo e oferta — não micro-variação de cor de botão.
- Regra de kill/escala definida antes de rodar.
- Nível de consciência como variável do teste: mesmo desejo, headline pra nível 2 vs nível 3 dá CTR diferente.

**Fica fora (neste estágio)**
- Método, entregável, qualidade da entrega.
- Reembolso, LTV, retenção.
- Narrativa ≠ método: ângulo que converte no anúncio não prova que a entrega funciona. Isso é outro teste, depois.

## Agressividade por camada (decidido 2026-09-05)

| Camada | Linha | Carrega |
|---|---|---|
| Anúncio | gray claro | problema, curiosidade, inimigo, mecanismo batizado, cena. **Sem** número de resultado, prazo, atributo pessoal ("você tem X"), antes/depois — Meta sobe CPM e reprova |
| LP | gray encostado no black | promessa inteira, sofisma, prova em cadeia |
| Checkout | gray encostado no black | oferta, urgência real, risco reverso |

- Anúncio abre a dúvida; LP responde. Camuflagem (Schwartz) + hipótese "sem promessa no hook" (guia).
- Anúncio tênue ≠ fraco: curiosidade + mecanismo batizado dá CTR qualificado; "perca 10kg em 7 dias" é claim de estágio 2 em mercado 3–4.
- Regra do ranking: paga-se por checkout, não por clique. CTR alto + LP fraca = CPA caro.

## Dois níveis de teste

1. **Teste amplo** — ângulos soltos por desejo (desejo × modificador), **sem one belief ainda**. Camada 1 → desejo vencedor.
2. **One belief + big idea** nascem em cima do desejo vencedor.
3. **Teste fino** — ângulos pro belief, variando modificador, mecanismo e nível de consciência → LP → checkout.

Ângulo antes no amplo; belief antes no fino.

## Decidido (2026-09-05)

- **Pré-venda real**, preço cheio de teste (R$ 27). Intenção infla 3–5×. Micro produto básico sempre entregue, construído só pro desejo que vendeu. Detalhe em [[fase-3-pecas-do-amplo]] e [[fase-4-regua-e-rodar]].
