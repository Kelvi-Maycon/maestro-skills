# Hero

O hero tem **um** trabalho. O erro padrão é transformá-lo num resumo do site inteiro: trilho de workflow, barra de métricas, selo flutuante, chip de status, dois mockups e mais um parágrafo. Tudo isso compete com a proposta de valor.

Complexidade é permitida dentro do produto. Não é automaticamente permitida na primeira impressão dele.

---

## Comece pela resposta de cinco segundos

Antes de escrever markup, complete a frase:

> Este produto ajuda **[usuário específico]** a conseguir **[resultado valioso]** por meio de **[mecanismo distinto]**.

O resultado vira a headline. O mecanismo vira o subhead.

Se o hero precisa de um diagrama, quatro métricas e um parágrafo pra explicar o produto, **a mensagem ainda não está afiada.** O problema é a frase, não o layout.

---

## Orçamento de atenção

Limite de partida, não cota a preencher:

| Elemento | Regra |
|---|---|
| Eyebrow | opcional, só se acrescenta contexto que a headline não dá |
| Headline | uma promessa, tipicamente 6–12 palavras |
| Subhead | uma frase, 16–28 palavras, no máximo duas linhas no desktop |
| CTA primário | **um** |
| CTA secundário | só se serve um caminho de menor compromisso (demo, doc, prova) |
| Visual | **um**, provando o resultado |
| Navegação | quieta — não compete com o CTA |

Fora do orçamento, e todos por reflexo, não por necessidade: fileira de confiança, chips de feature, trilho de workflow, sidebar de métrica, selo flutuante, carimbo decorativo, linha de órbita, rodapé de status, segundo mockup.

Isso não some — **desce**. Na seção seguinte vira prova de verdade em vez de poluição de hero.

---

## Tamanho da headline segue a contagem de palavras

Contagem de palavras e tamanho de display andam juntos. Tratar como regras independentes é o que produz hero com uma palavra por linha ocupando a viewport inteira.

| Palavras | Tamanho |
|---|---|
| 3–5 | **o mesmo** teto da faixa de 6–8. Headline curta não é licença pra aumentar |
| 6–8 | tamanho de display cheio — o topo do `clamp()` do projeto |
| 9–12 | um degrau abaixo, ~15–20% menor em toda a faixa do `clamp()` |
| 1–2 | caso raro; trate como peça de direção de arte deliberada, não como default |

Headline curta deve ler em **1–2 linhas**. Quebrando em 3+, especialmente uma palavra por linha, o tamanho está grande demais pro container — desça o degrau em vez de esticar a altura da seção. Punch vem da escolha da palavra e do respiro, não de estourar o teto da escala.

Se a headline precisa da ponta longa do orçamento **e** do tamanho cheio pra dizer o que precisa, o sinal é cortar a headline — não deixar a tipografia carregar o excesso.

**Piso de line-height:** apertar tem limite físico. No peso e tamanho realmente usados, descendentes (g, y, p, q, j) e pontuação de uma linha não podem encostar na linha de baixo. `line-height: 0.87` em display bold e grande é jeito conhecido de causar isso. Confira **olhando**, não pelo número — o valor seguro em 400/3rem corta em 800/6rem.

---

## Um visual de prova

Mostre o **resultado desejável**, não a maquinaria que produz o resultado.

| Tipo de produto | O visual certo |
|---|---|
| Ferramenta de criação/geração | um output finalizado excelente |
| Dashboard | recorte na **uma** decisão que importa, não o app shell inteiro |
| Produto de workflow | o estado concluído; os passos ficam abaixo da dobra |
| Produto físico | uma imagem forte em contexto, não colagem de apoio |
| Serviço abstrato | uma ilustração clara, ou um antes/depois colado à promessa |

No máximo **uma** moldura externa em volta do visual. Dashboard dentro de dashboard não. Cada rótulo dentro da moldura precisa justificar o lugar.

**Chip de métrica** é permitido como anotação: um número real com rótulo de uma a três palavras, **em cima** do visual (encostando na borda ou no canto), nunca flutuando sozinho no vazio — flutuando vira um quarto grupo de hero. No máximo um, dois no limite. O número tem que ser **real**, apurado do próprio produto. Escala de legenda, não de manchete.

**Comparação vira animação, não colagem.** Quando a prova é fundamentalmente um antes/depois e você tem os dois estados como assets separados, não achate num PNG só: sobreponha as duas camadas, recorte a de cima com `clip-path: inset()` dirigido por uma custom property, e anime essa property num loop lento de vai-e-volta.

---

## Composição

- Headline e visual com territórios separados e respiro generoso entre eles.
- **Um lado domina levemente.** Colunas de peso igual leem como template mecânico.
- **Uma quebra de regra intencional, no máximo**: um sangramento controlado, uma borda fora da grade, ou uma barra de acento contida. Não empilhe gestos decorativos.
- **A paleta do hero é mais quieta que a das seções abaixo.** O acento identifica a frase-chave, ou a ação, ou o detalhe do visual — não os três no volume máximo.
- Logo estabelecido que não combina com o tema novo: **preserve o logo** e resolva pelo espaço em volta, escala ou container. Nunca recolorindo a marca.

---

## Checagem antes de seguir pra próxima seção

- [ ] A promessa é legível em cinco segundos sem rolar
- [ ] Um CTA primário; o secundário, se existe, tem caminho distinto
- [ ] Um visual, uma moldura
- [ ] Nada dentro do hero que sobreviveria melhor na seção de baixo
- [ ] Tamanho da headline bate com a contagem de palavras; sem palavra órfã; sem uma palavra por linha
- [ ] Descendentes não encostam na linha seguinte, no peso e tamanho reais
- [ ] CTA visível dentro da viewport inicial nos breakpoints alvo
- [ ] Nav não compete com o CTA
