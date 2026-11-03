# Geometria de controle — altura, padding, raio, borda, estado, óptica

Números concretos pra consertar superfície que já existe. A escala de espaçamento, os pisos de card e a hierarquia de sombra do projeto vivem em `../design/tokens.md` — aqui é como o controle individual se comporta dentro dela.

---

## Grade de controle

Altura, padding e rótulo andam juntos. Escolher altura sozinha é a origem de metade dos "botão estranho".

| Papel | Altura | Padding-x | Rótulo | Raio |
|---|---|---|---|---|
| `xs` — ícone em linha densa, chip | 24px | 6–8px | 12px | 4–6px |
| `sm` — toolbar, tabela, filtro | 32px | 10–12px | 13–14px | 6px |
| `md` — default de app e formulário | 40px | 14–16px | 14–15px | 8px |
| `lg` — primário de mobile, CTA de conteúdo | 48px | 20–24px | 16px | 8–10px |
| `xl` — CTA único de hero | 56px | 28–32px | 16–18px | 10–12px |

**Três degraus por projeto, no máximo quatro.** Cinco tamanhos de botão é sintoma de instância, não flexibilidade.

### A razão que diagnostica "botão muito alto"

```
altura ÷ tamanho do rótulo = 2,4 a 3,0
```

Rótulo de 14px pede 34–42px de altura. Achou 56px com rótulo de 14px? São 4,0× — não é botão, é faixa.

- Acima de **3,4×**: alto demais, ajuste.
- Acima de **4,0×**: quase sempre bug de layout, não escolha. Duas causas dominam:
  - `align-items: stretch` (o default do flex) esticando o botão pra altura do vizinho mais alto
  - padding de seção ou de card aplicado no controle por herança de classe
- Abaixo de **2,0×**: o rótulo encosta na borda e o alvo costuma cair abaixo de 24px.

**Padding-x ≈ 2 a 2,5× o padding-y.** Padding igual nos quatro lados lê como quadrado apertado — a leitura horizontal precisa de mais folga que a vertical.

**Controles na mesma linha compartilham a altura.** Campo de 38px ao lado de botão de 40px é o desalinhamento que todo mundo vê e ninguém consegue nomear. Input, select, botão e chip da mesma linha saem do mesmo degrau.

**Largura mínima em botão de rótulo curto.** "OK", "Sim", "Ir" com padding puro viram botões minúsculos ao lado dos irmãos. Piso de `min-width` em 64px (`sm`) / 80px (`md`) mantém o ritmo da barra de ação.

---

## Ícone dentro do controle

- Tamanho do ícone = tamanho do rótulo, arredondado pro degrau do icon set (rótulo 14px → ícone 16px)
- Gap ícone→rótulo: **6px** em `sm`, **8px** em `md` e `lg`
- Ícone **trailing** leva 2–4px a menos de padding do lado dele — o `viewBox` já carrega folga interna
- Botão só de ícone é quadrado: altura = largura, ícone centrado, `aria-label` obrigatório
- Ícone dentro de botão com texto é `aria-hidden`
- Um afixo por alvo. Ícone à esquerda **e** chevron à direita no mesmo botão é indecisão

---

## Borda

O problema quase nunca é a espessura. É **contraste** e **papel**.

- Borda que carrega significado — limite de input, contorno de botão secundário, foco, seleção — precisa de **3:1 contra o fundo em que aparece** (WCAG 1.4.11). `#E5E7EB` sobre branco dá ~1,3:1: existe no código, não existe na tela. É a causa nº 1 de "não parece um campo".
- Separador puramente decorativo pode ficar abaixo disso — ele não comunica alvo.
- **1px é o repouso.** 2px só como estado (foco, seleção, erro). Se o repouso já é 2px, o estado não tem pra onde subir.
- **Borda de estado não muda a caixa.** Trocar 1px por 2px no hover empurra o conteúdo 1px e a tela "pula". Três saídas: `box-shadow: inset 0 0 0 2px`, `outline` com `outline-offset`, ou reservar a espessura no repouso com cor transparente.
- **Borda, sombra e preenchimento juntos** no mesmo elemento é redundância. Escolha dois; três é o visual "sobrecarregado" que ninguém sabe explicar.
- Borda de card em fundo escuro raramente funciona: no escuro, separação vem de **superfície mais clara**, não de borda mais escura.

---

## Raio

Uma gramática de três degraus, atribuída por **papel** (`../design/tokens.md`), nunca escolhida na hora.

**Aninhado:**

```
raio interno = raio externo − gap        (resultado ≤ 2 → deixa reto)
```

Card de `16px` com `8px` de padding → elemento interno com `8px`. Interno igual ao externo é o "canto errado" que se vê e não se aponta: os cantos de dentro ficam visualmente mais fechados que os de fora.

**Pílula (`9999px`) é semântica, não gosto.** Se pílula significa "chip/tag", nenhum botão de ação é pílula. Misturar pílula, card reto e card macio sem regra é deriva de forma.

**Raio grande exige padding grande.** `border-radius: 16px` com `8px` de padding faz o conteúdo brigar com a curva no canto.

---

## Estados — a magnitude do delta

Existir não basta; tem que dar pra ver. O checklist de *quais* estados são obrigatórios está em `../ux/PLAYBOOK.md` — aqui é *quanto* cada um muda.

| Estado | Delta que se enxerga |
|---|---|
| hover | superfície anda **um degrau da rampa** (~4–6% de lightness), ou a borda vai de `border` pra `border-strong`. `opacity: 0.9` não é hover — é sujeira |
| active | `translateY(1px)` ou `scale(0.97)`, ≤ 100ms, sem easing de entrada. É o feedback físico, e no toque é o único que existe |
| focus | anel de 2px com `outline-offset: 2px` e ≥ 3:1 contra o fundo onde aparece. `:focus-visible`; `outline: none` só com substituto equivalente |
| disabled | par de token próprio, com o rótulo ainda ≥ 3:1 pra continuar legível. **Nunca `opacity` no container** — apaga borda, ícone e rótulo juntos e derruba o contraste de tudo de uma vez |
| loading | a caixa **não muda de tamanho**: o spinner ocupa o lugar do rótulo, ou o rótulo troca por um de largura parecida. Botão que encolhe ao enviar move a interface inteira |
| selected | dois sinais, como qualquer affordance: preenchimento **e** borda, ou preenchimento **e** marca |

**Teste:** screenshot do repouso e do estado, lado a lado. Não dá pra apontar a diferença em um segundo → o delta é pequeno demais.

**Hover sempre com gate de ponteiro** (`@media (hover: hover) and (pointer: fine)`) — sem isso, no toque o estado gruda depois do tap.

**Todo hover tem um `:focus-visible` par.** Estado que só existe no ponteiro deixa quem usa teclado sem feedback nenhum.

---

## Correções ópticas

Matemática centraliza caixa; o olho centraliza massa. Onde as duas divergem, o olho ganha.

| Situação | Correção |
|---|---|
| ícone assimétrico (play, seta, enviar) em botão circular | desloca **3–6% da largura do ícone** pro lado da ponta — 1px num ícone de 24px |
| rótulo sentado baixo dentro de botão ou chip | `text-box: trim-both cap alphabetic`; fallback: **1–2px a menos** de padding embaixo |
| elemento redondo parece menor que o quadrado vizinho | escala o redondo **4–8%** pra cima (o círculo inscrito cobre ~79% da área do quadrado) |
| label em caixa alta a 12px parece grudado | `letter-spacing` **+0.04 a +0.06em**; corpo em 0; display acima de 40px em **−0.01 a −0.02em** |
| ícone com folga só de um lado | apara o `viewBox` no icon set, ou tira **2–4px** do padding daquele lado |
| aspas ou marcador quebrando a borda esquerda do bloco | `::before` com margem negativa, ou `text-indent` negativo na primeira linha |

**Correção óptica mora no componente, com nome.** `--optical-shift-play: 1px` é revisável; um `translateX(1px)` solto numa instância é dívida invisível que ninguém entende em três meses — e que a próxima pessoa "conserta" de volta.

**Não distribua correção óptica pela escala inteira.** Ela vale pro caso, não pro sistema: se todo ícone precisa de deslocamento, o problema é o icon set, não o alinhamento.
