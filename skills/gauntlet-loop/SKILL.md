---
name: gauntlet-loop
description: 'Manual-only: /gauntlet-loop. Melhora um entregável até o nível combinado com contrato, provas escritas antes do artefato, crítica por degraus e campeã contra desafiante.'
disable-model-invocation: true
---

# Gauntlet Loop

Melhorar até o nível combinado, provando cobertura, qualidade e ausência de regressão. A rodada só existe para resolver uma lacuna observável; mais agentes, texto ou tentativas não provam qualidade.

## Invocacao

Manual: `/gauntlet-loop`, ou pedido explícito para usá-la. No Maestro não há subagente: crítico rápido e crítico forte são passadas do próprio assistente, cada uma com brief escrito do zero antes de abrir o artefato, sem reler o raciocínio do builder; o forte confere tudo de novo, com a ordem invertida quando houver comparação. Declarar na entrega que a crítica foi própria. Para crítica independente de verdade, o Kelvi pode abrir uma sessão nova do assistente só com contrato e artefato.

## Intenção e modos

- **EXECUTAR:** invocação explícita com tarefa concreta → executar, verificar e corrigir até a condição de saída.
- **COMPILAR:** pedido de prompt/brief para outro agente → usar [compilação](references/compilar.md); entregar o prompt, sem executar a tarefa.
- **EXPLICAR:** pergunta sobre a skill → responder, sem iniciar o loop. Se o usuário pedir alteração da própria skill, esse é o alvo autorizado.

Não acionar por menção genérica a qualidade, revisão ou melhoria. A skill não amplia autorização para publicar, gastar, apagar dados ou operar sistemas externos.

## 1. Contrato suficiente

Extrair da conversa: entrega e uso real; escopo; requisitos obrigatórios; critérios decisivos; prova; invariantes; nível-alvo. Perguntar só se faltar uma decisão material. Não impor entrevista, quantidade fixa de critérios ou novos documentos.

- **Cobertura:** mudança repetida → enumerar instâncias e estado esperado com [cobertura](references/cobertura.md).
- **Qualidade:** melhorar conteúdo, comportamento ou acabamento → definir como julgar o artefato real com [avaliação](references/avaliacao.md).
- **Mista:** manter um contrato integrado com critérios por tarefa. Uma aprovação não cobre requisitos de outra; não duplicar o ciclo inteiro.

O alvo padrão é **atingir** o contrato. `Igualar` exige referência comparável; `vencer` exige pedido explícito de superar. Para comparação, abrir uma referência real e pertinente antes de usá-la como barra. Sem referência fornecida, buscar uma quando isso decidir a qualidade; não pesquisar só para cumprir ritual. Sem acesso ou comparação válida, declarar a lacuna e avançar apenas no que puder ser provado.

**Provas antes do artefato:** quem julga escreve, só com o contrato em mãos, o que vai conferir e como é uma versão aprovada; depois abre a entrega. O autor recebe o contrato, nunca essa lista. Juiz que vê a entrega primeiro aprova o que parece plausível.

## 2. Baseline e divisão

Preservar a versão existente e a prova relevante antes de alterar. Sem artefato, construir uma V1 coerente e completa antes de polir; com a abordagem em aberto, até 3 V1 distintas em paralelo, escolher às cegas e seguir com uma. Falha preexistente independente fica separada das regressões.

Decompor somente partes que possam ser alteradas e julgadas com independência; manter um responsável pela integração. Partes acopladas têm um dono e avançam em série: paralelismo serve a candidatas da mesma parte e a críticos, que só leem. Edição determinística pequena pode fechar com mudança e prova direta. Julgamento substantivo pede crítica independente quando disponível e autorizada; sem ela, identificar a revisão como própria e declarar a limitação. O verificador pode ser um teste ou ferramenta, sem outro agente.

## 3. Rodada com consequência

1. **Provar do barato ao caro:** checagem determinística (teste, lint, medição, busca) → crítico rápido só sobre o que mudou → crítico forte na saída. Versão reprovada num degrau não sobe ao seguinte.
2. **Julgar a versão real:** crítico de contexto fresco recebe contrato, artefato, referência e restrições, sem a defesa nem o histórico do autor. Devolve veredito por critério, com evidência localizada e como medir.
3. **Escolher o maior gap:** em cobertura, corrigir a classe inteira de faltantes em lote; em qualidade, atacar a causa de maior impacto. Resolver estrutura, conteúdo central e função antes do polimento.
4. **Mudar com hipótese:** dizer internamente qual efeito se espera e qual prova o confirmará. Evitar reescrita aleatória.
5. **Verificar efeito e regressão:** executar a prova pertinente, incluindo cobertura e invariantes afetados. Mudança visual exige observar a renderização durante a iteração quando ela decide o resultado; reutilizar a sessão de navegador.
6. **Campeã ou desafiante:** comparar a nova versão com a melhor guardada; em julgamento subjetivo, às cegas e repetindo com a ordem invertida. Melhora comprovada sem regressão material vira campeã; caso contrário, restaurar a campeã. Atualizar somente as provas invalidadas pela mudança.

O crítico rápido reprova sozinho. Aprovação só vale confirmada pelo crítico forte: o erro caro é aprovar.

Evidência identifica versão, área/estado, resultado e limitações. Elogio ou nota isolada não aprova. Em tarefa longa, registrar no acompanhamento existente: `gap → mudança → prova → decisão`. Tarefa curta dispensa arquivo de rodadas; tarefa somente leitura não autoriza escrevê-lo.

## 4. Estagnação e custo

Gap que volta na rodada seguinte: medir a afirmação do crítico antes de tentar de novo. Ele pode estar errado, e a correção pode ser o inverso do que pediu. Gap confirmado que resiste a duas rodadas, ou rodada sem evidência nova: parar de repetir, investigar a causa e mudar estratégia, representação, ferramenta, divisão ou o modelo/esforço de quem constrói. Se tentativas distintas demonstrarem o mesmo bloqueio e não houver investigação útil, informar a dependência concreta e os gaps, sem inventar vitória.

Respeitar teto de tempo/custo/tokens definido pelo usuário; não inventar limite de rodadas nem continuar por inércia. Medir tokens apenas quando fornecidos pelo runtime; chamadas e caracteres são medidas diferentes. Reaproveitar baseline, leituras e provas ainda válidas; repetir somente por mudança, falha ou incerteza concreta.

## 5. Saída e integração

Entregar a campeã, que pode não ser a última versão. Conferir a **versão final integrada** com o crítico forte: objetivo e requisitos; cobertura completa do escopo; função; coerência; nível-alvo; invariantes e regressões. Revalidar o que a integração pode ter invalidado. Prova de outra versão ou soma de aprovações locais não basta.

Concluir somente sem requisito obrigatório pendente nem gap crítico, com o alvo demonstrado. Ao atingir teto ou bloqueio concreto, entregar melhor estado verificado, pendências e dependência exata, sem chamar de concluído. Comunicar resultado e `Verificado: <prova>`; usar `Não verificado: <lacuna>` onde couber.

Se `design-loop` também for explicitamente invocada, reutilizar sua barra, renders e avaliações para os critérios visuais. Não repetir a mesma crítica nem acioná-la automaticamente.
