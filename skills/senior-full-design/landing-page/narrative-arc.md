# Arco narrativo

Uma página que rotaciona por todas as macroestruturas ainda lê como "seções sem fio condutor" se o argumento nunca foi construído. Variedade e coerência são propriedades diferentes — a página precisa das duas.

Este arquivo responde **por que cada seção existe e em que ordem**. A macroestrutura responde como ela parece. Feche este primeiro.

---

## Os seis beats

| Beat | A pergunta que responde | O que dá errado |
|---|---|---|
| **Gancho** | qual é a promessa, em uma frase | promessa genérica que serve pra qualquer concorrente |
| **Problema** | o que está quebrado ou em jogo hoje | inventar dor que o público não sente, ou pular direto pro produto |
| **Solução** | como o produto resolve isso | descrever features em vez de resolver o problema declarado |
| **Como funciona** | qual é o fluxo concreto | abstrato demais pra a pessoa se imaginar usando |
| **Prova** | qual é a evidência real | evidência fabricada, ou prova longe da claim que ela sustenta |
| **Fechamento** | qual é o pedido | pedido diferente do que o gancho prometeu |

**Mínimo quatro beats distintos. Cinco é o default.** Beat fundido ou pulado de propósito: diga qual e por quê.

---

## Ordem não é fixa

A sequência canônica é a de cima, mas o arco se reordena pelo que o público já sabe quando chega:

| Situação | Ordem |
|---|---|
| Tráfego frio, produto desconhecido | problema → gancho → solução → como → prova → fecha |
| Tráfego de anúncio com promessa já feita | gancho (espelhando o anúncio) → prova → solução → fecha |
| Alta intenção (e-mail pra base, retargeting) | gancho → prova → fecha, e só isso |
| Categoria nova que ninguém procura | problema → como o mundo funciona hoje → solução → prova → fecha |
| Objeção pesada de confiança | gancho → objeção → prova → solução → fecha |

**Case a mensagem com a origem.** Vindo de anúncio, o hero espelha a headline do anúncio e mantém a mesma promessa e o mesmo tom visual. Quebrar isso é onde a conversão vaza sem ninguém ver.

---

## Cada beat tem um teste

**Gancho** — dá pra trocar o nome do produto por um concorrente e a frase continuar verdadeira? Então não é um gancho, é uma categoria.

**Problema** — o público reconheceria isso como uma dor que ele **tem**, com as palavras dele? Dor descrita no vocabulário do time interno não é reconhecida.

**Solução** — ela conecta explicitamente com o problema declarado dois beats antes? Se a solução responde outra coisa, o arco quebrou no meio.

**Como funciona** — depois de ler, a pessoa consegue se imaginar fazendo? Três passos concretos vencem qualquer parágrafo sobre a arquitetura.

**Prova** — é verificável? Número real, nome real, resultado real. E ela está **ao lado da claim** que sustenta, não numa seção genérica?

**Fechamento** — pede exatamente a mesma coisa que o gancho prometeu, com a mesma linguagem?

---

## O beat e o arquétipo

Cada beat recebe um arquétipo (`component-archetypes.md`), e a escolha vem do **tipo de evidência que existe de verdade**:

- Prova é quantitativa e real → `proof-metric` ou macroestrutura Stat-Led
- Prova é o trabalho em si → `proof-case` ou Gallery Grid
- Prova é quem usa → `proof-logos`, só com permissão
- Prova não existe → o beat vira demonstração (`hero-demo`, `feat-compare`), não depoimento inventado

Beat sem evidência real não vira beat com evidência falsa. Vira outro beat.

---

## Declare antes de construir

Uma linha, em voz alta, antes do primeiro bloco de código:

> Arco: problema → gancho → solução → como funciona → prova → fecha. Macroestrutura: Long-Scroll Narrative (a última foi Feature Stack). Prova = um case real com antes/depois, porque não temos logos liberados.
