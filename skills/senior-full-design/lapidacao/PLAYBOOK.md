# Lapidação — refino e recriação

## Escopo e autoridade

Rota interna da `senior-full-design`. Aplicar quando a skill principal for invocada para lapidar, polir, corrigir inconsistências ou recriar uma interface. O contrato visual do pedido e do projeto prevalece sobre os defaults numéricos deste playbook. Só consultar `../ui/PLAYBOOK.md` ou `../redesign/PLAYBOOK.md` para detalhes necessários; não repetir auditorias já realizadas.

"Goal" abaixo significa um critério de aceite do trabalho, não uma autorização para abrir meta persistente, tarefa, automação ou mais escopo. Usar ferramentas de metas somente se o usuário pedir. Em revisão somente leitura, produzir diagnóstico e critério proposto sem editar código, handoff ou configuração.

## Overview

Transforma julgamento estético subjetivo em violações objetivas, corrigidas e provadas
visualmente. Dois modos de execução — LAPIDAR (refino cirúrgico) e RECRIAR (redesign
página por página) — e um critério de aceite claro, definido antes de editar e proporcional ao escopo autorizado.

## Quick Reference

| Situação | O que fazer |
|----------|-------------|
| Refino ou recriação autorizados | Definir critério de aceite proporcional e referência; aproveitar o contrato existente |
| UI quase pronta, "lapidar/polir/refinar" | Modo LAPIDAR — correção por régua, mudança mínima |
| Refazer/recriar/redesign autorizado | Modo RECRIAR — página por página, preservando requisitos e contratos |
| Escopo em $ARGUMENTS | Restringir à tela/componente/fluxo indicado |
| Sem argumentos | Usar a tela/fluxo do pedido e do contexto; perguntar só se faltar alvo material. App inteiro exige esse escopo explícito |
| Design system ativo na conversa | É a única fonte de verdade visual — nada fora dele |
| Sem design system ativo | Extrair o sistema implícito do próprio app (ver Referência-ouro) |
| Palavra "ultracode" presente | Fan-out multi-agente na auditoria (ver seção ultracode) |

---

## GOAL — default, sempre o primeiro passo

A skill não pergunta o que o usuário quer alcançar. Ela **descobre e declara**. Isso existe
porque "melhorar o design" é um alvo móvel: sem um goal escrito, o trabalho vira polimento
infinito sem critério de parada. O goal transforma a tarefa num contrato verificável.

### Como construir o critério de aceite

1. **Reconhecimento** — rode o app, percorra as telas do escopo, tire screenshots.
   Inventarie: páginas, componentes recorrentes, estados visíveis.
2. **Diagnóstico** — classifique o que viu:
   - Violações pontuais de régua numa base sólida → o problema é acabamento.
   - Inconsistência sistêmica (cada tela com layout, larguras, hierarquia e componentes
     próprios) → o problema é estrutural.
3. **Escreva o goal** — um bloco curto, declarado no início da resposta, contendo:
   - **Definição de pronto** — a frase-contrato (ex.: "zero violação de régua em todas as
     telas do escopo, verificado rodando" ou "todas as páginas indistinguíveis do
     padrão-ouro, lado a lado").
   - **Modo escolhido** e o porquê em uma linha.
   - **Referência-ouro** — o elemento/tela que define o nível (ver abaixo).
   - **Critérios de aceite** — 3 a 6 itens mensuráveis, não opinativos.
   - **Ordem de ataque** — sequência de telas/componentes.
4. **Execute contra o goal.** Toda decisão durante o trabalho responde a ele. Terminou
   só quando cada critério de aceite fecha — não quando "parece bom".

O pedido, suas correções e a autorização vigente definem o limite do critério; declarar um goal não amplia esses limites. Para uma correção pequena, uma frase de aceite basta. Não criar relatório ou checkpoint extra por rotina.

### Referência-ouro

Todo app tem um elemento mais bem resolvido que os outros (uma sidebar, um card, um header).
Identifique-o no reconhecimento e promova-o a padrão de qualidade: todo o resto sobe até
o nível dele. Nunca rebaixe a referência para combinar com uma tela fraca — eleve a tela.
Se um design system estiver ativo na conversa, ele é o contrato e a referência-ouro é o
melhor exemplo *aplicado* dele.

---

## Roteamento de modo

Escolha um modo no goal e declare. Nunca misture os dois na mesma tela.

- **RECRIAR** quando: o pedido fala em refazer/recriar/redesign/"muito melhor", ou há autorização para reforma estrutural e o diagnóstico confirma inconsistência sistêmica. Sem essa autorização, apontar a causa e manter o refino no escopo pedido; encontrar três telas inconsistentes não autoriza recriar o produto.
- **LAPIDAR** quando: a base é sólida e as violações são pontuais e rastreáveis.
- **Na dúvida**, LAPIDAR — é o caminho de menor mudança visual e preserva intenção.
  Se no meio do LAPIDAR surgir problema estrutural, explicar o impacto. Mudar para RECRIAR somente se esse trabalho estiver autorizado.

---

## Réguas de avaliação (valem nos dois modos)

As escalas abaixo são defaults de diagnóstico quando não há contrato do projeto. Tokens existentes e intenção da peça podem exigir outros valores; divergência numérica sozinha não é defeito. Acessibilidade é verificada pela norma aplicável, não por heurísticas estéticas. APCA, alvo de 44px, grade e limite de larguras não devem ser confundidos com requisitos universais de WCAG AA.

Cada correção rastreia a UMA régua. O que não viola régua não se toca (em LAPIDAR).

**Spacing** — preferir a escala do projeto; como fallback, grade de 4px. Todo padding/margin/gap ∈ {4, 8, 12, 16, 24, 32, 48, 64};
maiores em múltiplos de 8. Zero valores órfãos (13, 17, 22px).

**Texto** — grade de 2px em font-size e line-height. Line-height 1.4–1.6 no corpo,
1.1–1.25 em títulos. Como default de leitura, corpo de 16px; interfaces densas seguem o sistema validado e a legibilidade real. Escala com passos perceptíveis
(14/16/20/24/32 — nunca 15/16/17).

**Alinhamento** — tudo ancora numa borda compartilhada; um único eixo por página, do
título ao conteúdo às ações. Alinhamento óptico vence o matemático: ícones, glifos e
formas assimétricas se ajustam ao peso visual, não ao bounding box. Nada "quase alinhado".

**Larguras** — buscar poucos contratos estáveis; como ponto de partida, 2 larguras de página: uma para telas densas
de dados, outra para telas de foco/leitura. Nenhuma página inventa a própria largura.

**Contraste** — WCAG AA mínimo: 4.5:1 corpo, 3:1 texto grande (≥24px ou ≥19px bold) e
elementos de UI (ícones, bordas, foco). Alvo APCA Lc≥75 no corpo. Placeholder, texto
secundário e disabled também precisam ser legíveis.

**Hierarquia** — máx 3 níveis de ênfase por tela, criados por tamanho OU peso OU cor OU
espaço — nunca os quatro juntos. Uma única ação primária por tela, com destaque óbvio;
duas ações disputando atenção = hierarquia falhou.

**Cor** — uso semântico, não decorativo. Cor de ação ≠ cor de status ≠ cor de texto.
Nenhuma cor fora do sistema.

**Tipografia** — máx 2 famílias. Rótulos, metadados e números com o mesmo cuidado dos
títulos: números tabulares alinhados, datas num formato único, capitalização uniforme.

**Consistência** — mesma função, mesmo tratamento. Raios, sombras, pesos, durações,
paddings de botão e tamanhos de ícone idênticos entre instâncias iguais. O que aparece
em duas páginas é idêntico nas duas.

**Proximidade** — agrupar por significado: mais espaço entre grupos do que dentro deles.

**Estados** — todo elemento interativo tem hover, focus visível pra teclado, active,
disabled e, quando aplicável, loading/error. Nenhum estado faltando ou idêntico ao default.
Microinterações discretas e uniformes — um único padrão de hover/transição no produto.

**Vazio/erro/carregando** — sempre desenhados. Empty state bonito e útil, que convida à
ação — vazio constrangedor é página malfeita.

**Alvo de toque** — área clicável ≥ 44px, mesmo com ícone menor.

**Responsivo** — sem overflow, sem quebra de layout, sem texto cortado nos breakpoints
relevantes.

---

## Modo LAPIDAR — refino, não redesign

Você não admira o que está bonito; caça o que está errado. Cada elemento fora do lugar
é um bug até prova em contrário.

1. **Audite** contra cada régua, tela por tela, estado por estado. Registre cada violação
   como `{elemento · régua quebrada · valor atual → correto}`.
2. **Priorize**: alinhamento e spacing (estrutura) → contraste e tipografia (legibilidade)
   → hierarquia e cor (foco) → estados, consistência e responsivo (acabamento).
3. **Corrija cirurgicamente** — só o que viola régua. Não reposicione, não recolora, não
   "melhore" o que já está correto. Entre duas correções válidas, a de menor mudança
   visual. Prefira tokens/variáveis existentes a valores crus.
4. **Verifique rodando** (ver Prova).

Restrições: preserve layout, conteúdo, marca e intenção. Sem componentes novos, sem
reflow de seções, sem trocar paleta, sem reescrever copy, sem inventar conteúdo ou ícone.

## Modo RECRIAR — redesign página por página

Uma página por vez, nunca duas. Ciclo completo antes de avançar:

1. **Auditoria impiedosa** — liste tudo que está errado ou medíocre, com especificidade.
   "Está feio" não é diagnóstico; "três larguras de card diferentes no mesmo grid" é.
2. **Pergunta de propósito** — qual é a única coisa mais importante que o usuário faz
   nesta página? O design inteiro se organiza em torno dela. Um usuário novo precisa
   entender a página e achar a ação principal em menos de 3 segundos.
3. **Redesign** — hierarquia deliberada (o olho sabe onde ir primeiro, segundo, terceiro),
   ritmo de espaçamento constante, um eixo, respiro generoso. Corte o que não serve ao
   propósito. Nada genérico: proibido resultado com cara de template de dashboard —
   cartões-clichê, ícones decorativos sem função, enfeite que não informa.
4. **Estados completos** — vazio, carregando, erro, sucesso, hover, foco, disabled.
5. **Prova de consistência** — compare com as páginas já refeitas: mesmos títulos, mesmos
   espaçamentos, mesmos botões, mesmos cards, mesmo tom.
6. **Autocrítica** — olhe como um crítico que quer reprovar o trabalho. Achou algo que um
   designer excelente apontaria em review? Volte. Só então a próxima página.

**Ordem de trabalho**: fundamentos globais primeiro (shell, navegação, componentes base —
o que se repete nasce uma vez e é reusado), depois a página-vitrine do produto, depois os
fluxos principais na ordem de uso, depois secundárias e onboarding, e por fim uma passada
de consistência no app inteiro comparando todas as páginas entre si.

---

## ultracode — auditoria paralela

Quando a ativação contém "ultracode": fan-out multi-agente. Cada agente audita um
conjunto de telas/componentes/estados em paralelo e devolve violações no formato
`{elemento · régua · atual → correto}`. Consolide num único plano de correção sem
conflito (dois agentes tocando o mesmo componente = uma decisão só) antes de editar
qualquer coisa. A correção em si é sequencial — paralelize o diagnóstico, não a cirurgia.

---

## Prova — nada está pronto sem rodar

Polish não se prova no código. Abra a tela rodando (browser/preview), confira o resultado
e os estados, tire screenshot por página alterada. Compare com o critério de aceite do
goal, não com memória. Se não deu pra rodar, diga explicitamente o motivo e o que ficou
sem verificação — nunca declare pronto no escuro.

## Saída obrigatória

Dimensionar a saída à mudança; consolidar com a entrega da skill principal, sem duplicar tabelas. Em trabalho amplo:

1. **Critério de aceite**: definição de pronto, modo, referência-ouro, critérios de
   aceite, ordem de ataque.
2. **LAPIDAR**: tabela de violações (elemento · régua · antes → depois) + correções +
   uma linha por correção citando a régua. **RECRIAR**: por página — problemas da
   auditoria, decisões e porquês, resultado.
3. **PROVA**: o que foi visto rodando e o que mudou visualmente, critério a critério
   do goal.

Sem prosa decorativa.

## Common Mistakes

| Erro | Por que acontece | Correção |
|------|------------------|----------|
| Começar a corrigir sem goal escrito | Ansiedade de entregar rápido | Goal primeiro, sempre — é o critério de parada |
| Redesenhar em modo LAPIDAR | "Já que estou aqui..." | Cada mudança rastreia uma régua; sem régua, sem toque |
| Polir tela a tela sobre base inconsistente | Diagnóstico raso | Explicar a causa; recriação só no escopo autorizado |
| Declarar pronto pelo código | Preguiça de rodar | Prova visual obrigatória, screenshot por página |
| Rebaixar a referência-ouro pra combinar com o resto | Caminho de menor esforço | A referência puxa pra cima, nunca desce |
| Duas páginas "prontas" que não parecem o mesmo produto | Pular a prova de consistência | Comparar lado a lado antes de avançar |
| Largura de página sem justificativa | Exceção vira regra | Reusar contrato ou justificar necessidade funcional |
