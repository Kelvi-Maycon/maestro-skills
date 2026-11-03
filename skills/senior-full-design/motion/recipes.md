# Receitas de motion

Valores prontos por componente. Comece daqui, não de um arquivo em branco — inventar curva e duração na hora é como o motion sai fraco.

Todas usam os tokens do playbook:

```css
:root {
  --ease-out:    cubic-bezier(0.23, 1, 0.32, 1);
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
}
```

---

## Botão — feedback de press

O mais barato e o de maior retorno. Dá a sensação de que a interface ouviu.

```css
.botao {
  transition: transform 160ms var(--ease-out), background-color 160ms ease;
}
.botao:active { transform: scale(0.97); }
```

Escala entre 0.95 e 0.98. Vale pra qualquer coisa pressionável — card clicável, item de lista, ícone.

---

## Dropdown / popover / menu

Escala a partir do **gatilho**, não do centro.

```css
.popover {
  transform-origin: var(--transform-origin); /* fornecido pela lib de posicionamento */
  transition: opacity 180ms var(--ease-out), transform 180ms var(--ease-out);
}
.popover[data-closed] {
  opacity: 0;
  transform: scale(0.96);
}
```

Duração 150–250ms. Nunca `scale(0)`. Nunca `ease-in`.

---

## Tooltip

Atrasa na primeira, instantâneo nas seguintes — é isso que faz a barra de ferramentas inteira parecer rápida.

```css
.tooltip {
  transform-origin: var(--transform-origin);
  transition: opacity 125ms var(--ease-out), transform 125ms var(--ease-out);
}
.tooltip[data-closed] { opacity: 0; transform: scale(0.97); }
.tooltip[data-instant] { transition-duration: 0ms; }
```

Atraso de abertura: 400–700ms na primeira. Enquanto o grupo está "quente", zero atraso e zero animação.

---

## Modal

**Exceção da origem:** modal não está ancorado em gatilho, então fica centralizado.

```css
.overlay {
  transition: opacity 200ms var(--ease-out);
}
.modal {
  transform-origin: center;
  transition: opacity 220ms var(--ease-out), transform 220ms var(--ease-out);
}
.modal[data-closed] { opacity: 0; transform: scale(0.96) translateY(8px); }
```

O overlay entra um pouco antes do painel e sai um pouco depois. Duração 200–500ms.

---

## Drawer / bottom sheet

Porcentagem, não pixel — funciona com qualquer altura.

```css
.drawer {
  transform: translateY(0);
  transition: transform 400ms var(--ease-drawer);
}
.drawer[data-closed] { transform: translateY(100%); }
```

Com gesto de arrastar: use spring pra carregar velocidade na interrupção, e **momento** pra dispensar — velocidade acima de ~0.11 px/ms dispensa, mesmo sem passar o limiar de distância. Passou do limite natural, aplique amortecimento crescente em vez de parede invisível.

---

## Toast

Transition, nunca keyframe — toast é disparável rápido, e keyframe reinicia do zero.

```css
.toast {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 400ms ease, transform 400ms ease;
  @starting-style { opacity: 0; transform: translateY(100%); }
}
```

**Sai pelo caminho que entrou.** Entrou por baixo, sai por baixo — é isso que faz o arrastar-pra-dispensar parecer óbvio. Pause o timer quando a aba fica escondida.

---

## Acordeão

O único lugar onde animar `height` se tolera — não existe equivalente em transform.

```css
.painel {
  display: grid;
  grid-template-rows: 1fr;
  transition: grid-template-rows 250ms var(--ease-out);
}
.painel[data-closed] { grid-template-rows: 0fr; }
.painel > div { overflow: hidden; }
```

`grid-template-rows: 0fr → 1fr` anima altura sem precisar medir o conteúdo em JS.

---

## Stagger de entrada

```css
.item {
  opacity: 0;
  transform: translateY(8px);
  animation: entra 300ms var(--ease-out) forwards;
}
.item:nth-child(1) { animation-delay: 0ms; }
.item:nth-child(2) { animation-delay: 50ms; }
.item:nth-child(3) { animation-delay: 100ms; }
.item:nth-child(4) { animation-delay: 150ms; }

@keyframes entra { to { opacity: 1; transform: translateY(0); } }
```

30–80ms entre itens. Acima disso a interface parece lenta. Stagger é decorativo — nunca bloqueie interação enquanto roda.

---

## Segurar pra confirmar

Assimetria proposital: lento na fase de decisão, instantâneo na resposta.

```css
.overlay-confirma {
  clip-path: inset(0 100% 0 0);
  transition: clip-path 200ms var(--ease-out);   /* soltar: rápido */
}
.botao:active .overlay-confirma {
  clip-path: inset(0 0 0 0);
  transition: clip-path 2s linear;               /* segurar: deliberado */
}
```

---

## Indicador de aba

Transição de cor perfeita que temporizar cor nenhuma alcança: duplique a lista, estilize a cópia como ativa, e recorte a cópia pra só a aba ativa aparecer.

```css
.lista-ativa {
  clip-path: inset(0 calc(100% - var(--w)) 0 var(--x) round 8px);
  transition: clip-path 300ms var(--ease-in-out);
}
```

---

## Revelação no scroll

```css
.revela {
  opacity: 0;
  transform: translateY(16px);
  filter: blur(6px);
  transition: opacity 700ms var(--ease-out), transform 700ms var(--ease-out), filter 700ms var(--ease-out);
}
.revela[data-visivel] { opacity: 1; transform: none; filter: none; }
```

Dispare com `IntersectionObserver`, uma vez só, com margem negativa (~−100px) pra o elemento já estar entrando quando ativa. **Nunca** listener de scroll sem throttle.

---

## Comparador antes/depois

Sobreponha as duas imagens, recorte a de cima. Sem DOM extra, tudo acelerado por hardware.

```css
.camada-topo { clip-path: inset(0 var(--wipe, 50%) 0 0); }
```

Anime `--wipe` (por biblioteca ou por WAAPI) num loop lento de vai-e-volta, ou amarre à posição do arrasto.

---

## Máscara de blur em crossfade

Quando a troca entre dois estados não fica boa mesmo variando curva e duração: some blur durante a transição. Sem ele você vê dois objetos distintos se sobrepondo; com ele o olho lê uma transformação só.

```css
.conteudo { transition: filter 200ms ease, opacity 200ms ease; }
.conteudo.trocando { filter: blur(2px); opacity: 0.7; }
```

Abaixo de 20px. Blur pesado é caro, principalmente no Safari.

---

## Revelação palavra a palavra

Heading que acende palavra por palavra conforme o scroll cruza a linha de gatilho. O nome acessível fica inteiro; as palavras animadas são decorativas.

```html
<h2 aria-label="A frase inteira aqui">
  <span aria-hidden="true">
    <span class="palavra">A</span> <span class="palavra">frase</span> <span class="palavra">inteira</span> …
  </span>
</h2>
```

```css
.palavra { color: var(--texto-mudo); /* ~30% do caminho entre fundo e texto */ transition: color 300ms var(--ease-out); }
.palavra[data-ativa] { color: var(--texto); }
```

Ative em ordem de leitura: `IntersectionObserver` por palavra, ou um listener único passado por `requestAnimationFrame`. A palavra parte de cor abafada — nunca de opacidade zero, pra o texto continuar legível se o JS falhar. Nunca divida link ou markup com significado.

---

## Sempre junto

```css
@media (prefers-reduced-motion: reduce) {
  .revela, .toast, .modal, .drawer {
    transition-duration: 1ms;
    transform: none;
    filter: none;
  }
}

@media (hover: hover) and (pointer: fine) {
  .card:hover { transform: translateY(-2px); }
}
```

Reduced motion **não** é encurtar a animação — é entregar o estado final e manter a compreensão. Mantenha o que é opacidade e cor; tire deslocamento.
