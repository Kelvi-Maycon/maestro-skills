# Rota: UX

Quando o problema é **comportamento**, não aparência: ninguém acha o botão, o formulário abandona, o fluxo trava, a tela tecnicamente correta não funciona.

Diagnóstico antes de conserto. A maior parte do "isso está feio" na verdade é hierarquia quebrada, agrupamento errado ou estado faltando — nenhum dos três se resolve com cor.

**Não é esta rota** quando o alvo já está no lugar certo, com o peso certo, e o problema é a superfície: padding improvisado, botão alto demais, borda que some, nada parecendo clicável. Isso é `../ui/PLAYBOOK.md`.

---

## 1. Classifique a tela antes de opinar

Densidade, escolha de componente e motion mudam completamente com o tipo. Aplicar a régua errada é o erro mais comum:

| Tipo | O que ela precisa | Falha típica |
|---|---|---|
| **Narrativa de marketing** | ensinar pelo scroll, um argumento por seção | densidade de dashboard, sem respiro |
| **App shell** (dashboard, ferramenta interna) | sair da frente, densidade alta, grade estável | headline gigante e card cinematográfico atrapalhando a varredura |
| **Formulário transacional** | um caminho, erro recuperável, sem surpresa | campo demais, validação hostil |
| **Vista de dados** | comparação legível, data-ink alto | gradiente e 3D escondendo a escala |
| **Editor / canvas** | ferramenta perto do trabalho, estado sempre visível | chrome competindo com o conteúdo |
| **Configuração** | encontrabilidade, agrupamento, valor atual óbvio | lista chapada de switch sem hierarquia |
| **Vazio / carregando / sucesso** | dizer o que fazer agora | painel em branco, spinner genérico |

**Estilo de marketing em UI operacional** é um caso próprio de falha: título enorme, respiro exagerado, gesto de baixa densidade — tudo isso impede varredura. Suba a densidade, estabilize a grade, deixe o estado claro.

---

## 2. As perguntas que diagnosticam

**Ponto de entrada.** Qual elemento captura o olho primeiro — e ele é *a coisa mais importante* da tela? Existe um dominante, ou a atenção se espalha? O ponto de entrada bate com o objetivo primário daquela tela?

**Fluxo do olho.** O caminho depois da aterrissagem é deliberado? Tem beco sem saída, loop, salto confuso? Ele leva naturalmente até a ação principal?

**Peso.** Diferença de tamanho entre níveis de hierarquia é de pelo menos 1,5× (2,5× entre título e corpo)? Negrito está sendo usado com parcimônia suficiente pra ainda significar algo?

**Ênfase.** Existe exatamente **uma** zona de ênfase primária por vista? Cor, contraste e movimento estão enfatizando — ou tão em excesso que se cancelam?

**Agrupamento.** O que está junto pertence junto? O espaço interno de cada grupo é menor que o espaço entre grupos?

**Custo de decisão.** Quantas escolhas simultâneas a tela oferece? Dá pra agrupar, adiar ou definir um default bom?

**Estado.** O que acontece quando está vazio, carregando, com erro, sem permissão, com dado longo demais, com dado nenhum?

---

## 3. Regras de fluxo

**Formulário**
- Ordem que a pessoa pensa, não a ordem do banco de dados
- Agrupe em blocos de ~4 campos; bloco maior que isso quebra em etapas
- Label sempre visível; placeholder não é label (some quando digita e leva o contexto junto)
- Valide na saída do campo, não a cada tecla; erro fica ao lado do campo, específico, dizendo como resolver
- Nunca bloqueie colar — em campo de senha, código e cartão isso é hostilidade pura
- Um campo por linha na maioria dos casos; lado a lado só quando os dois são naturalmente pareados (cidade/UF)
- Botão primário só um; ação destrutiva separada visualmente das outras
- Autofill funcionando: `autocomplete`, `name` e `type` corretos

**Navegação**
- Escolha o padrão pela estrutura do produto: tabs (3–5 destinos irmãos), drawer (muitos destinos, uso ocasional), hierarquia (profundidade real), hub (entrada em tarefas distintas)
- Item atual sempre indicado
- Caminho de volta em toda tela
- Estado importante reflete na URL — a pessoa precisa poder recarregar, compartilhar e voltar

**Onboarding**
- Otimize tempo até o primeiro valor, não completude do tour
- Revele progressivamente; não ensine o que ainda não é necessário
- Deixe pular, e deixe voltar depois

**Busca**
- Zero-resultado é uma tela desenhada, com sugestão e caminho alternativo — nunca "nada encontrado"
- Refinamento visível e reversível
- Resultado mostra por que casou com a busca

**Espera**
- Abaixo de ~400ms, resposta parece instantânea — não coloque spinner aí, coloca ruído
- Skeleton com a forma do conteúdo real vence spinner circular
- Acima de ~1s, diga o que está acontecendo; acima de ~5s, dê progresso ou estimativa
- Update otimista onde a operação quase sempre dá certo — e reversão clara quando falhar

---

## 4. Estados — a lista completa

Todo elemento interativo e toda tela de app saem com:

| Estado | O que não pode faltar |
|---|---|
| default | — |
| hover | mudança perceptível, com gate de ponteiro |
| focus | **anel visível**, sempre. Não é opcional, não é feio, não se remove |
| active/pressed | feedback físico: `scale(0.97)` ou `translateY(1px)` |
| disabled | motivo legível de por que está desabilitado |
| loading | skeleton com a forma real; botão trava e mostra progresso |
| empty | visão de "como começar", com ação — nunca painel em branco |
| error | inline, específico, com saída. Nunca `alert()` |
| success | confirmação que não exige leitura de modal |
| overflow | texto longo, nome longo, lista longa, zoom em 200% |

Tela que só fica boa com dado de exemplo perfeito não está pronta.

Esta tabela diz **quais** estados. **Quanto** cada um muda — a magnitude que faz o delta ser perceptível — está em `../ui/geometry.md`.

---

## 5. Acessibilidade — piso, não extra

Isso passa por cima de decisão estética, sem pedir licença:

- **Teclado alcança tudo.** Tab chega, Enter/Espaço aciona, Escape fecha, foco não escapa de modal aberto e volta pro gatilho quando fecha.
- **Foco visível** com contraste próprio de pelo menos 3:1 contra o fundo em que aparece.
- **Nome acessível** em todo controle: input com label associado, botão só de ícone com `aria-label`, imagem com significado com `alt` (imagem decorativa com `alt=""`).
- **Contraste**: 4,5:1 pra texto de corpo, 3:1 pra texto grande e pra componente de UI (borda de input, ícone que carrega significado).
- **Cor nunca é o único sinal.** Erro em vermelho também traz ícone e texto.
- **Ordem do DOM = ordem visual.** Reordenar só com CSS quebra teclado e leitor de tela.
- **Alvo de toque ≥ 44px**, com espaçamento entre alvos vizinhos.
- **`prefers-reduced-motion`** respeitado; movimento vira estado final imediato.
- **Zoom até 200%** sem perder conteúdo nem gerar scroll horizontal.
- **HTML semântico** antes de ARIA. `<button>` real vence `<div role="button">` sempre.
- **Dimensão explícita em imagem** pra não pular layout no carregamento.
- **`Intl.*` pra data, número e moeda** — não formate à mão.

Checagem completa de craft de interface: `interface-quality.md`.

---

## 6. Escrita de interface

O texto é parte do UX, não decoração:

- Voz ativa. "Não conseguimos salvar suas alterações", não "Ocorreu um erro ao salvar".
- Diga o que fazer agora, não só o que aconteceu.
- Sem exclamação em sucesso, sem "Ops!" em erro.
- Botão descreve o resultado: "Excluir projeto", não "OK".
- Vocabulário de quem lê, não do time. Termo interno que o usuário não usa sai ou vem traduzido na mesma frase.
- Sentence case. Sem Title Case Em Tudo.

---

## Saída do diagnóstico

Por dimensão (entrada, fluxo, peso, ênfase, agrupamento, estado):

1. **Observação** — o que se vê, neutro e factual
2. **Problema** — o que quebra e por que importa
3. **Correção** — mudança específica e acionável, com valor

Classifique cada dimensão: `passa` / `problema menor` / `problema grave`.

---

## Arquivos

| Preciso de | Leia |
|---|---|
| a lei por trás do sintoma (agrupamento, custo de decisão, memória, ordem, contraste de destaque) | `laws.md` |
| checagens duras de craft: teclado, foco, form, imagem, URL, locale, performance | `interface-quality.md` |
| consertar a superfície: affordance, altura de controle, borda, alvo, magnitude de estado | `../ui/PLAYBOOK.md` |
| dar nota e ranquear achados | `../critique/PLAYBOOK.md` |
