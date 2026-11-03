# Affordance — o que é clicável parece clicável

O design flat tirou a sombra e o relevo dos controles sem colocar nada no lugar. O resultado é a queixa mais comum de interface: **"eu não sei onde dá pra clicar"**. Não é frescura de usuário — é sinal faltando.

Dois erros, igualmente caros:

- **Alvo invisível** — é clicável e não parece. A pessoa não usa a funcionalidade.
- **Falso affordance** — parece clicável e não é. O clique morto ensina a pessoa a desconfiar do resto da tela.

---

## A regra dos dois sinais

Todo alvo carrega **pelo menos dois** sinais de interatividade, e **pelo menos um funciona sem ponteiro**.

Hover não existe no toque. Cursor não existe no toque nem no teclado. Um alvo cujos dois sinais são hover e cursor está invisível pra boa parte de quem usa.

**Sinais que valem sozinhos** (independentes de ponteiro)
preenchimento sólido · borda ≥ 3:1 contra o fundo · elevação/sombra · sublinhado · afixo de ícone (seta, chevron, link externo) · rótulo que é verbo de resultado ("Ver relatório") · posição em zona de controle reconhecida (toolbar, footer de card, barra de ação)

**Sinais de reforço** (nunca sozinhos)
cor do texto · hover · cursor · tooltip · microanimação

Cor de texto sozinha reprova duas vezes: cai pra quem não distingue a hue, e depende de a pessoa já ter aprendido a paleta do produto. O que salva parte disso é **consistência**: a mesma cor significa "interativo" na interface inteira e **nunca** aparece em texto estático. Cor de acento em heading decorativo destrói o sinal pra tela toda.

---

## Sinal por tipo de alvo

| Alvo | Sinais obrigatórios |
|---|---|
| Ação primária | preenchimento sólido + rótulo-verbo + os cinco estados |
| Ação secundária | borda ≥ 3:1 + rótulo-verbo + os cinco estados |
| Ação terciária / ghost | rótulo-verbo **e** (zona de controle reconhecida **ou** afixo de ícone); hover revela superfície |
| Link em corpo de texto | sublinhado em repouso, ou cor + sublinhado no hover — cor sozinha não basta |
| Linha ou card clicável inteiro | afixo **persistente** (chevron/seta) + hover de superfície inteira + cursor |
| Botão só de ícone | `aria-label` + área ≥ 24px + moldura ou fundo no hover + tooltip |
| Aba | indicador claro do item atual; a aba **inativa** ainda precisa parecer alvo |
| Célula editável em tabela | borda ou fundo de campo em repouso — "parece só texto" é o erro clássico da tabela editável |
| Chip / filtro selecionável | dois sinais no estado selecionado: preenchimento **e** borda, ou preenchimento **e** marca |
| Item arrastável | alça visível (grip) — cursor `grab` sozinho não existe no toque |

---

## Botão com cara de botão

O checklist literal, na ordem em que resolve:

1. **Superfície própria** — preenchimento sólido, ou borda ≥ 3:1 contra o fundo em que aparece. Ghost sem nenhum dos dois só sobrevive dentro de zona de controle óbvia (colado num primário, dentro de uma toolbar). Solto no meio do conteúdo, ghost é texto.
2. **Forma retangular com raio.** É a forma que a pessoa reconhece como botão desde sempre; o flat design tirou a profundidade, não a forma. Raio da gramática do projeto, nunca improvisado.
3. **Rótulo que é o resultado.** "Excluir projeto", não "OK". Verbo primeiro.
4. **Altura e padding da grade** (`geometry.md`), não "o que sobrou em volta do texto".
5. **Os cinco estados visíveis** — hover, active, focus, disabled, loading.
6. **Um preenchimento sólido por vista.** Se tudo é primário, nada é — e a hierarquia que fazia o botão saltar desaparece.

### Sobre o ícone

Ícone **não** é o que faz um botão parecer botão — superfície, forma, rótulo e estado fazem. Ícone ganha o lugar exatamente **onde não há superfície**: ali ele vira o segundo sinal, independente de ponteiro, que estava faltando.

| Ícone entra | Ícone fica fora |
|---|---|
| link ou ghost que precisa do segundo sinal (`Ver relatório ›`) | botão preenchido, que já tem superfície, forma e rótulo |
| ação com direção: voltar, avançar, expandir, abrir em nova aba, baixar | decoração pra "ficar mais bonito" |
| ação destrutiva ou de sistema, onde o ícone acelera o reconhecimento | ícone genérico que não nomeia a ação (estrela, raio, círculo) |
| linha/card clicável inteiro — chevron fixo à direita | quando já existe outro afixo no mesmo alvo |

Ícone decorativo em botão preenchido não aumenta affordance: adiciona ruído, mais uma coisa pra alinhar e mais uma pra manter.

**Regra de consistência:** o mesmo ícone significa a mesma ação na interface inteira. Chevron pra "expande" e chevron pra "navega" na mesma tela é ruído com cara de sistema.

---

## Falso affordance

Procure e apague:

- Card com sombra, raio e padding de botão que não é clicável
- Heading com fundo de barra de ação
- Badge estático com aparência de chip selecionável
- Texto estático sublinhado, ou em cor de link
- Ícone decorativo herdando `cursor: pointer` do container
- Linha de tabela com hover de superfície e nenhuma ação
- `cursor: not-allowed` sozinho, que sinaliza bloqueio sem desabilitar nada
- Elevação usada como enfeite: se sombra significa "elevado e acionável", nada estático leva sombra

**Regra de simetria:** se um card é clicável e o card irmão não é, os dois precisam parecer diferentes. Igualdade visual entre alvo e não-alvo é pior que ambos fracos.

---

## Superfície clicável inteira

Card, linha de lista e linha de tabela clicáveis produzem a maior parte do "não sabia que dava pra clicar":

- Afixo **persistente** (chevron/seta), não revelado só no hover
- Hover muda a **superfície inteira**, não só a cor do texto
- `<a>` ou `<button>` real envolvendo. Se for `div`, então `role`, `tabIndex={0}` e handler de `Enter`/`Espaço` — os três, sempre juntos
- **Um alvo por linha.** Botão dentro de linha clicável precisa de `stopPropagation` e de separação visual óbvia
- Ação destrutiva **nunca** herda o clique da linha
- O alvo aninhado nunca é o único caminho: quem usa teclado precisa alcançar os dois

---

## Alvo e área de clique

- **24×24 CSS px** é o piso de qualquer alvo de ponteiro (WCAG 2.5.8, nível AA). Alvo menor só passa se tiver espaçamento suficiente em volta pra somar 24×24 sem sobrepor o vizinho.
- **44×44** para alvo primário de toque, e para qualquer coisa usada em movimento.
- O ícone **mantém o tamanho visual**. A área cresce por padding, ou por pseudo-elemento quando o padding quebraria o layout:

```css
.icon-btn { position: relative; }
.icon-btn::after { content: ""; position: absolute; inset: -8px; }
```

- **Rótulo faz parte do alvo.** Checkbox e radio com `<label>` associado dobram a área sem mudar um pixel.
- Alvos vizinhos precisam de gap real. Dois ícones de 24px encostados formam um alvo de 48px que erra metade das vezes.
- Área maior que o visual é bom; **área menor** é o bug invisível — acontece quando o `<a>` envolve só o texto e o padding vive no pai.

---

## Teste de duas passadas

**Passada 1 — screenshot estático, sem hover, sem cursor.**
Aponte tudo que é clicável. Deixou de apontar um alvo → sinal fraco. Apontou o que não é → falso affordance.

**Passada 2 — a mesma imagem em escala de cinza.**
Ainda dá pra apontar? Se não, a interatividade estava carregada só na hue e cai pra daltônico.

**Fecho — `Tab` do começo ao fim da tela.**
Tudo que recebe foco e não parecia alvo é um buraco. Tudo que é alvo e o `Tab` pula é outro. Craft de teclado e foco: `../ux/interface-quality.md`.
