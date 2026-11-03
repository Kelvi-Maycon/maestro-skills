# Rota: Motion

Transformar um pedido de movimento numa implementação que sobrevive a uma revisão rigorosa.

**Dois modos de falhar, e o primeiro é pior:**

1. **Animar o que não devia animar.** O portão abaixo existe pra às vezes produzir zero linha de código. Isso é sucesso, não fuga.
2. **Animar a coisa certa com o ingrediente errado** — `ease-in` numa entrada, `scale(0)`, keyframe num toast, duração que faz o dropdown parecer lento.

Nunca apresente motion como menu de opções. Decida, diga o raciocínio em uma linha, escreva o código.

---

## Regras duras

1. **Rode a sequência em ordem.** Passos 1 e 2 são portão. Não escolha curva antes de saber se anima.
2. **Nenhum valor aproximado.** Curva, duração e spring saem das tabelas. Nunca invente `cubic-bezier(0.4, 0, 0.2, 1)` porque parece familiar.
3. **Estenda os tokens do projeto, não bifurque.** Já existe `--ease-out` ou escala de duração? Use. Sistema paralelo é defeito.
4. **Reduced motion e gate de hover embarcam com a animação**, não como follow-up.
5. **Ferramenta mais barata que resolve.** Não instale biblioteca de motion pra um fade.

---

## 1. Deve animar?

| Frequência | Decisão |
|---|---|
| 100+ vezes/dia (atalho de teclado, command palette) | **Não anima. Nunca.** Pare aqui. |
| Dezenas de vezes/dia (hover, navegação em lista) | Só quase imperceptível — rápido e sutil, ou nada |
| Ocasional (modal, drawer, toast) | Animação padrão |
| Raro / primeira vez (onboarding, sucesso, celebração) | Aqui mora o orçamento de encanto |

**Ação iniciada por teclado é desqualificação, não julgamento.** O Raycast não tem animação de abrir/fechar — e isso está certo pra algo aberto centenas de vezes por dia.

Reprovou no portão: diga isso com todas as letras e não escreva a animação. Ofereça a alternativa sem movimento (mudança instantânea de estado, affordance estática).

---

## 2. Qual o propósito?

Nomeie em uma destas palavras antes de continuar:

- **Feedback** — confirmar que a interface ouviu
- **Consistência espacial** — mostrar de onde veio ou pra onde foi
- **Indicação de estado** — tornar a mudança legível
- **Evitar salto brusco** — costurar conteúdo que teleportaria
- **Explicação** — demonstrar como algo funciona (marketing/onboarding)
- **Encanto** — permitido **só** no tier raro/primeira vez

Não consegue nomear? Não constrói. "Fica legal" num elemento visto com frequência é motivo pra parar.

Cheque também **função**: dado que a pessoa está lendo ou usando não se mexe por estilo. Efeito decorativo que segue o mouse cabe em página de marketing, não num gráfico de banco.

---

## 3. Ferramenta — desça e pare na primeira que serve

| Preciso de | Ferramenta |
|---|---|
| hover, press, cor, toggle de estado que eu controlo por classe ou atributo | **CSS transition** |
| animação de entrada no mount, sem estado de JS | **`@starting-style`** |
| movimento predeterminado que precisa continuar suave com a página carregando | **CSS animation** (roda fora da main thread) |
| controle programático com performance de CSS, sem biblioteca | **WAAPI** (`element.animate()`) |
| spring, layout animation, animação de saída, valor dirigido por gesto | **biblioteca de motion** |

CSS animation vence JS sob carga — roda fora da main thread, enquanto animação baseada em `requestAnimationFrame` perde frame enquanto o navegador carrega, roda script ou pinta.

Se a tarefa pede um **componente** (toast, drawer, command menu, dropdown) e não uma animação, pare e use um primitivo acessível pronto. Fazer isso à mão termina em `<div>` sem gestão de foco.

---

## 4. Propriedades

- **Só `transform` e `opacity`.** Pulam layout e paint, rodam na GPU. `width`/`height`/`margin`/`padding`/`top`/`left` disparam os três. (`clip-path` é a quarta sancionada. `height` só se tolera em acordeão, onde não existe equivalente em transform.)
- **Nunca `scale(0)`.** Comece em `scale(0.9–0.97)` + `opacity: 0`. Nada no mundo real aparece do nada.
- **`transform-origin` no gatilho** pra popover, dropdown, menu, tooltip. **Modal é exceção** — não está ancorado em gatilho, fica centralizado.
- **Porcentagem em `translate()`** é relativa ao próprio tamanho do elemento: `translateY(100%)` move a própria altura, seja qual for o conteúdo. Prefira a pixel fixo.
- **Em biblioteca de motion, use a string completa de transform.** Os atalhos `x`/`y`/`scale` não são acelerados por hardware e perdem frame sob carga.
- **Nunca dirija o transform de um filho por variável CSS no pai** — recalcula estilo de todos os filhos. Seta `transform` direto no elemento.

---

## 5. Curva e duração — ou spring

**Curva, em ordem de decisão:**

| Situação | Curva |
|---|---|
| entrando ou saindo | `ease-out` |
| movendo / se transformando na tela | `ease-in-out` |
| hover / mudança de cor | `ease` |
| movimento constante (marquee, progresso) | `linear` |
| default | `ease-out` |

**Nunca `ease-in` em UI.** Ele começa devagar, atrasando exatamente o instante em que a pessoa está olhando. `ease-out` a 200ms **parece** mais rápido que `ease-in` a 200ms.

As curvas nativas do CSS são fracas demais. Use estas:

```css
--ease-out:    cubic-bezier(0.23, 1, 0.32, 1);      /* ease-out forte pra UI */
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);     /* movimento na tela */
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);      /* curva de drawer estilo iOS */
```

Precisa de curva que não está aqui? Pegue pronta em easing.dev ou easings.co. Não faça à mão.

**Duração:**

| Elemento | Duração |
|---|---|
| feedback de press | 100–160ms |
| tooltip, popover pequeno | 125–200ms |
| dropdown, select | 150–250ms |
| modal, drawer | 200–500ms |
| marketing / explicativo | pode ser mais longo |

**UI fica abaixo de 300ms.** Um dropdown de 180ms parece mais responsivo que um de 400ms.

**Percepção de velocidade é performance.** Spinner girando mais rápido faz o carregamento parecer mais rápido com o mesmo tempo real. Tooltip instantâneo depois do primeiro faz a barra inteira parecer mais rápida.

**Vá de spring** quando o movimento é: arrasto com momento · elemento que deve parecer vivo · gesto que a pessoa pode interromper ou reverter · decorativo seguindo o mouse.

```js
{ type: "spring", duration: 0.5, bounce: 0.2 }             // estilo Apple, mais fácil de raciocinar
{ type: "spring", mass: 1, stiffness: 100, damping: 10 }   // física tradicional, mais controle
```

Bounce entre 0.1 e 0.3, e evite bounce na maior parte da UI — reserve pra arrastar-pra-dispensar e interação brincalhona. Spring **carrega velocidade através da interrupção**; CSS e keyframe reiniciam do zero.

---

## 6. Interrupção e saída

- **Transition, não keyframe, pra qualquer coisa disparável rápido** — toast, toggle, o que a pessoa consegue acionar duas vezes em um segundo. Transition remira do valor atual; keyframe reinicia do zero.
- **Sai pelo caminho que entrou.** Toast que entra por baixo sai por baixo — caminho simétrico é o que faz o arrastar-pra-dispensar parecer óbvio.
- **Tempo assimétrico onde a pessoa está decidindo.** Devagar na fase deliberada (segurar-pra-confirmar: 2s linear), rápido na resposta do sistema (soltar: 200ms ease-out).
- **Blur mascara transição imperfeita.** Crossfade que não fica bom mesmo trocando curva e duração: some `filter: blur(2px)` durante a troca. Sem o blur você vê dois objetos distintos se sobrepondo; o blur costura os dois num só. Mantenha abaixo de 20px — blur pesado é caro, principalmente no Safari.
- **Stagger em entrada múltipla:** 30–80ms entre itens. Atraso longo faz a interface parecer lenta. Stagger é decorativo — nunca bloqueie interação enquanto roda.

---

## 7. Reduced motion e gate de ponteiro

Embarcam com a animação, toda vez.

```css
@media (prefers-reduced-motion: reduce) {
  .elemento { animation: fade 0.2s ease; }  /* mantém opacidade/cor, tira movimento */
}

@media (hover: hover) and (pointer: fine) {
  .elemento:hover { transform: scale(1.05); }  /* toque dispara hover falso no tap */
}
```

Reduced motion significa **menos e mais suave**, não zero — mantenha o que ajuda a compreender, tire deslocamento e mudança de posição. Em scroll scrubbado ou pinado, renderize o **estado final imediatamente**, não uma versão encurtada.

---

## Motion em scroll (landing e narrativa)

Escala pelo dial de motion declarado, não por reflexo.

- Revelação na entrada da viewport: `translateY(16px) + blur(6px) + opacity 0` → estado final, 600–800ms com curva custom. Use `IntersectionObserver` ou o equivalente `whileInView` da biblioteca.
- **Nunca `window.addEventListener('scroll')` sem throttle** — reflow contínuo, mata performance no mobile. Se precisar de listener, passe por `requestAnimationFrame`.
- **Um motor de smooth scroll, nunca dois.** Escolha um, conecte certo ao trigger de scroll, atualize as medidas depois que fonte e mídia carregarem, destrua no cleanup.
- **Um momento de espetáculo por página.** Vários marquees, capítulos pinados e loops ambientes competindo na mesma superfície viram ruído. Escolha um e deixe as outras transições quietas.
- Revelação palavra a palavra em heading: mantenha o nome acessível **não dividido**, esconda as palavras decorativas da tecnologia assistiva, e nunca divida link ou markup com significado. Sem JS, o texto continua visível.
- Nunca atualize estado amplo de framework a cada frame de scroll ou de ponteiro. Use CSS, motion values ou observer.

---

## Never ship

| Nunca | Em vez disso |
|---|---|
| `transition: all` | nomeie as propriedades |
| entrada com `scale(0)` | `scale(0.95)` + `opacity: 0` |
| `ease-in` em elemento de UI | `ease-out` ou curva custom forte |
| `ease-out` nativo numa animação deliberada | `cubic-bezier(0.23, 1, 0.32, 1)` |
| animação em atalho de teclado ou ação 100+/dia | nenhuma animação |
| duração de UI acima de 300ms sem motivo | 150–250ms |
| `transform-origin: center` em popover ancorado | origem no gatilho (modal isento) |
| keyframe em toast, toggle, elemento disparável rápido | transition |
| animar `width`/`height`/`margin`/`padding`/`top`/`left` | `transform` / `opacity` |
| atalho `x`/`y`/`scale` de biblioteca sob carga | string completa de `transform` |
| `:hover` sem gate de ponteiro | `@media (hover: hover) and (pointer: fine)` |
| `prefers-reduced-motion` ausente | variante mais suave, não zero |
| tudo entrando ao mesmo tempo | stagger de 30–80ms |
| animação que, removida, não muda entendimento nenhum | remova |

Auditoria mecânica:

```bash
python3 scripts/audit_motion.py <arquivos>
```

---

## Entrega

Escreva o código. Depois, em poucas linhas:

- **Resultado do portão** — tier de frequência e propósito nomeado. Rejeitou algo do pedido? Diga o quê e por quê.
- **Ingredientes** — ferramenta, propriedades, curva, duração ou spring, uma linha cada.
- **O que checar no olho** — quando o resultado depende de sensação que não dá pra julgar pelo código (crossfade, bounce de spring, equilíbrio de opacidade e altura numa lista entrando), diga isso e aponte a checagem: rode a 2–5× a duração ou no inspetor de animação, passe frame a frame, teste gesto em aparelho real, e **olhe de novo no dia seguinte com olho descansado**.

Não infle isso em relatório. O código é a entrega.

---

## Arquivos

| Preciso de | Leia |
|---|---|
| implementação pronta por componente (botão, dropdown, tooltip, modal, drawer, toast, acordeão, stagger, segurar-pra-confirmar, indicador de tab, revelação em scroll, arrastar-pra-dispensar) | `recipes.md` |
| descrição vaga → nome exato do efeito ("aquele negócio que pula quando o popover abre") | `vocabulary.md` |
| revisar motion que já existe | `../critique/PLAYBOOK.md` |
