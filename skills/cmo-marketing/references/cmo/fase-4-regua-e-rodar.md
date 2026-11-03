---
date: 2026-09-05
tags: [marketing, processo, validacao-oferta]
related: ["[[ordem-de-criacao]]", "[[fase-3-pecas-do-amplo]]", "[[fase-5-leitura-e-fino]]", "[[teste-de-aderencia-3-camadas]]"]
status: fechado
---

# Fase 4 — Régua de decisão + rodar

> [!important] Fechado em 2026-09-05. Esta é a regra. A proposta original ficou no arquivo do Kelvi, fora do repo. Mudança de regra entra aqui. Números valem pra ticket R$ 27; ao mudar o ticket, recalcular pela fórmula.

## Princípio

**A régua é escrita antes do primeiro real gasto. Decisão por linha da régua, não por debate.** É o gargalo 2 do loop (regra de decisão não pré-combinada) resolvido. O amplo é **compra de dado**: prejuízo aceitável = orçamento inteiro, ROAS 0 no pior caso. Receita que voltar é desconto no preço do dado.

## Entrada

- Peças da fase 3 aprovadas pelo juiz.
- Ticket de teste (R$ 27) e teto de perda (brief).
- Pixel + CAPI + UTM instalados e testados com 1 compra real antes de ligar.

## 1. Desenho das campanhas

```
Campanha 1 — Desejo A (ABO, vendas)     R$ 108/dia
├─ Conjunto A1 · porta Problema      R$ 27/dia · 1 anúncio
├─ Conjunto A2 · porta Mecanismo     R$ 27/dia · 1 anúncio
├─ Conjunto A3 · porta Inimigo       R$ 27/dia · 1 anúncio
└─ Conjunto A4 · porta Cena          R$ 27/dia · 1 anúncio
Campanhas 2, 3, 4 — Desejos B, C, D (idem)
```

| Item | Valor | Por quê |
|---|---|---|
| Campanhas | **4** — uma por desejo | matar desejo = pausar 1 campanha; ler desejo vs desejo = comparar 4 linhas |
| Tipo | **ABO** | CBO decide com 500 impressões e concentra em 1–2 conjuntos. CBO só no fino (5b/5c) |
| Conjuntos por campanha | **4** — um por porta | |
| Anúncios por conjunto | **1** | com 4 no mesmo conjunto o Meta entrega 80% pra 1 e os outros nunca atingem trava |
| Orçamento | **R$ 27/dia por conjunto** (= ticket/dia) → R$ 432/dia no dia 1; cai com as travas | |
| Objetivo | Vendas / evento compra. < 3 compras na conta em 48h → iniciar checkout | otimizar pra clique traz curioso; fica em aprendizado limitado, e não importa: o amplo mede, não escala |
| Público | Amplo, sem interesse, Advantage+. Posicionamento automático | o hook qualifica, não o targeting |
| Igual nos 16 | corpo da LP por desejo, checkout, bônus de pré-venda, preço R$ 27 | |
| Diferente | anúncio + cabeça da LP | |
| Rodar | **4 desejos de uma vez** | |

## 2. Prejuízo aceitável

| Nível | Teto |
|---|---|
| Por anúncio | R$ 108 (4× ticket) · R$ 162 (6×) se LP→checkout ≥ 10% |
| Por desejo | R$ 432 |
| Amplo inteiro | ~R$ 1.300 (16 × R$ 54 até o corte de 48h + sobreviventes) |

## 3. A fórmula que amarra as travas

CPA = CPC ÷ (LP→checkout × pago). Com pago 35% e alvo CPA ≤ R$ 108: **LP necessária = CPC ÷ 37,8**. Teto realista de LP em tráfego frio low ticket: 15%. (Ticket 47 → LP nec. = CPC ÷ 65,8.)

Taxas "boas": CTR ≥ 2% · LP→checkout ≥ 10% · pago ≥ 35%. Abaixo disso o funil não fecha nem a R$ 97.

### Reembolso entra na conta (2026-09-11)

ROAS do dia não é ROAS final. O reembolso chega **depois** da janela de medição — a garantia de 7 dias é o direito de arrependimento do CDC, e o comprador de pré-venda só recebe o entregável no dia da entrega.

- Referência de planejamento trazida pela pesquisa: **10–20% de reembolso**, não taxa medida da conta. Sem taxa própria, usar provisoriamente **15%**.
- **Validado = ROAS após reembolso ≥ 1**, com ≥5 vendas. Calcular `ROAS bruto × (1 − r)`; com r=15%, corte bruto exato `1/0,85 ≈ 1,17647` (1,18 exibido), CPA ≤ ticket médio × 0,85. Não aplicar desconto duas vezes a receita já líquida de reembolso. Empate após reembolso ainda não é lucro após taxas/impostos/custos.
- Na aba **Leituras**, registrar receita bruta, reembolsos, taxa adotada (estimada/observada), receita após reembolso e os dois ROAS. Manter 3 abas. Reconciliar pedidos por ID na fonte de vendas. Rever os 15% com ≥20 vendas de coorte com janela de reembolso observada; 20 vendas recentes não eliminam o atraso.
- Os tetos de prejuízo (4× / 6× ticket) não mudam: eles governam gasto, não retorno.

## 4. Travas — na ordem em que o dado chega

| Trava | Quando | Mata se | Por quê |
|---|---|---|---|
| 1 · CPM | 1.000 imp. | > R$ 120 (qualquer CTR) | Custo acima do teto econômico do teste; investigar causa, não presumir punição |
| 2 · CPC | 1.500 imp. | > R$ 3,80 | LP necessária > 10%. **Trava principal**: CPM e CTR já estão dentro dela |
| 3 · CTR | 3.000 imp. | < 0,8% | piso absoluto. CTR 0,8–1% = atenção no máximo, mesmo com CPC bom |
| 4 · LP | 100 visitas | < 3% **ou** < metade da LP necessária (CPC ÷ 37,8) | a cadeia não converge |
| 5 · Pago | 20 checkouts | < 15% | precisaria LP > 20% |
| 6 · Venda | 4× ticket (6× se LP ≥ 10%) | 0 vendas | sample existe e nada aconteceu |

Faixas de CPC aos 1.500 imp.: **forte ≤ 1,90 · ok ≤ 2,65 · atenção ≤ 3,80 · mata > 3,80**.
Régua relativa: aos 48h, mata a metade de baixo por desejo; desejo com 4 mortos morre inteiro.

Diagnóstico (2026-09-11): [[meta-politica-qualidade-e-diagnostico]]. A trava limita gasto; restrição, qualidade, leilão e mix são causas diferentes. Aplicar a trava e registrar hipótese para a próxima peça. Não substituir R$120 por benchmark de agência.

### Grid CPM × CTR (CPC na célula)

🟢 forte · 🟡 ok · 🟠 atenção · 🔴 mata

| CPM \ CTR | 0,5% | 0,8% | 1% | 1,5% | 2% | 3% | 4% |
|---|---|---|---|---|---|---|---|
| **20** | 🔴 4,00 | 🟠 2,50* | 🟡 2,00 | 🟢 1,33 | 🟢 1,00 | 🟢 0,67 | 🟢 0,50 |
| **40** | 🔴 8,00 | 🔴 5,00 | 🔴 4,00 | 🟠 2,67 | 🟡 2,00 | 🟢 1,33 | 🟢 1,00 |
| **60** | 🔴 | 🔴 7,50 | 🔴 6,00 | 🔴 4,00 | 🟠 3,00 | 🟡 2,00 | 🟢 1,50 |
| **80** | 🔴 | 🔴 | 🔴 8,00 | 🔴 5,33 | 🔴 4,00 | 🟠 2,67 | 🟡 2,00 |
| **100** | 🔴 | 🔴 | 🔴 10,00 | 🔴 6,67 | 🔴 5,00 | 🟠 3,33 | 🟡 2,50 |
| **120+** | 🔴 | 🔴 | 🔴 | 🔴 | 🔴 | 🔴 4,00 | 🔴 hard kill |

\* CTR < 1% nunca passa de 🟠. CPM é o custo do mercado, CTR é o mérito da copy; a régua é a combinação.

## 5. Veredito por anúncio/ângulo (aos 96h)

| Veredito | Critério | Significa | Vai pra |
|---|---|---|---|
| **Morto** | 0 venda a 4× ticket (6× com LP ≥ 10%) | desejo/porta não paga | — |
| **Respira** | 0–1 venda, LP→checkout ≥ 10% | belief segura; problema é checkout/preço | fino só se for o melhor do desejo |
| **Bom caminho** | ≥ 2 vendas, CPA ≤ R$ 108 | desejo paga, conta não fecha | 5a, roteador decide a rodada 1 |
| **Forte** | ≥ 2 vendas, CPA ≤ R$ 54 | copy boa, só falta ticket. **Não é validado** (ROAS 0,5) | 5a, rodada 1 = ticket médio |

Vencedor do desejo = combinação das camadas: CPA quando há venda; sem venda, LP→checkout × CTR. **Validado** só existe na fase 5: CPA ≤ ticket médio × (1 − r), ROAS após reembolso ≥ 1, com ≥ 5 vendas.

## 6. Cadência de leitura

- **2× ao dia: 8–9h e 16h.** Em cada leitura, só aplica trava cujo sample foi atingido. Nada de "tô sentindo".
- Matar = **pausar** o conjunto. Nunca editar anúncio vivo (zera o aprendizado).
- **48h e 96h** são os dois pontos de ranking e decisão de vencedor. As leituras diárias só matam. Aos 96h não se estende "mais 2 dias".

## 7. Entrega

- Pré-venda real, data de entrega (7 dias) na LP e no checkout. Garantia declarada.
- **Micro produto básico sempre**, construído só pro desejo que vendeu, dentro da data. Comprador de desejo morto: micro produto ou reembolso, caso a caso.
- E-mail de confirmação com promessa e data.

## 8. Ledger (planilha, 3 abas)

| Aba | O que tem | Quando |
|---|---|---|
| **Peças** | 1 linha por anúncio: desejo · porta · hook · formato · versão · id · campanha/conjunto · dúvida que abre · cabeça da LP · régua aplicável | antes de ligar |
| **Leituras** (append-only) | 1 linha por anúncio por leitura: data/hora · gasto · imp · CPM · cliques · CTR · CPC · visitas · checkouts · %LP · vendas · %pago · CPA · receita bruta · reembolsos · taxa adotada/origem · receita após reembolso · ROAS bruto/após reembolso · trava atingida? | 8h e 16h |
| **Decisões** | 1 linha por ação: anúncio · ação · **nº da trava + valor** · quem · quando | na hora |

Decisão sem número de trava não entra. Ranking dos 96h sai da aba Leituras. A aba Decisões é o debrief pronto.

## 9. Tracking

- Pixel + **CAPI** (sem CAPI perde 20–40% das compras; com sample de 5 vendas isso mata o teste; Hotmart/Kiwify/Cakto têm nativo).
- UTM `desejo_porta_id`; o mesmo parâmetro escolhe a cabeça da LP.
- Teste antes de ligar: 1 compra real, evento no Gerenciador.

## Saída da fase

Ledger completo. Desejo vencedor + ranking de portas com veredito, ou **"nenhum aderiu"** — resultado válido: volta pra fase 1 com outro lote (dos 10 desejos, sobram 6).

## Pronto quando

- Toda decisão do ledger aponta pra uma linha da régua.
- Existe vencedor com veredito, ou a declaração "nenhum aderiu".
- Quem pagou tem data de entrega ou reembolso.
