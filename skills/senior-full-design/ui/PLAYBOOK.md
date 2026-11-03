# Rota: UI

Quando a interface **já existe e já funciona**, mas a superfície está desleixada: padding improvisado, botão de 56px com rótulo de 14px, borda que só existe no código, e metade dos alvos não parece alvo.

Esta rota não redesenha. Não troca paleta, não troca fonte, não remonta seção. Ela pega a linguagem visual que já está lá e **faz ela ser executada direito**.

---

## Não é esta rota

| Sintoma | Rota certa |
|---|---|
| ninguém completa o fluxo; o passo está na ordem errada; formulário abandona | `../ux/PLAYBOOK.md` |
| "esse produto parece de 2014" — a linguagem visual inteira é o problema | `../redesign/PLAYBOOK.md` |
| "tá bom?", "me dá uma nota" — quer diagnóstico, não conserto | `../critique/PLAYBOOK.md` |
| a tela ainda não existe | `../design/PLAYBOOK.md` |
| a interação existe, mas está morta ou travada | `../motion/PLAYBOOK.md` |

**A pergunta que separa UX de UI:** o alvo está no lugar certo e ainda assim ninguém clica?

- Está no lugar errado, compete com outro elemento, ou o fluxo pede coisa demais → **UX**.
- Está no lugar certo, com o peso certo, e mesmo assim não parece clicável → **aqui**.

---

## Contrato desta rota

**Muda:** valor de espaçamento · altura e padding de controle · raio · largura, cor e presença de borda · superfície de estado (hover, active, focus, disabled, loading, selected) · área de clique · afixo de ícone · correção óptica · **consistência entre instâncias do mesmo componente**.

**Não muda:** hue da paleta · família e escala tipográfica · estrutura de layout e ordem de seção · copy · qual componente foi escolhido (não troque `select` por combobox) · imagem e ilustração · rota, evento de analytics, nome de campo de formulário.

Se o conserto certo exige sair dessa lista, **pare e diga em uma linha**. Vira redesign, e é outra rota. Não migre em silêncio — "fui arrumar o padding e troquei a paleta" é o modo de falha desta rota.

---

## Passe 0 — Inventário (não edita)

Antes de opinar, conte. "Parece desleixado" é sensação. **"Onze alturas de botão distintas" é fato** — e é o fato que decide qual conserto serve.

```bash
python3 scripts/ui_audit.py <arquivos ou diretório>
```

| Censo | Leitura |
|---|---|
| altura explícita de controle | mais de 4 valores = não existe grade de controle |
| raio | mais de 4 valores = deriva de forma |
| espaçamento fora de múltiplo de 4 e usado poucas vezes | improvisação, não escolha |
| cor de borda | mais de 3 = borda sem papel definido |
| alvo abaixo de 24px | falha dura, entra antes de qualquer estética |

Um projeto com 3 alturas e 3 raios tem **botão feio** — conserta caso a caso.
Um projeto com 11 alturas e 7 raios **não tem botão** — tem instâncias. Esse se resolve fixando a grade e migrando tudo pra ela; ajustar um por um só produz o décimo segundo valor.

**Fixe a grade antes de editar.** Escolha os degraus pela **moda** do que já está no código (o valor mais repetido), não pelo que você acha bonito — assim a maior parte do projeto já está certa e o diff fica pequeno. Grades de partida em `geometry.md`.

---

## Sintoma → causa → conserto

O índice rápido. Cada linha aponta pro passe que resolve.

| O que se diz | Causa quase sempre | Conserto |
|---|---|---|
| "esse botão tá muito alto" | altura herdada de outro papel, ou `align-items: stretch` esticando pro vizinho | razão altura ÷ rótulo pra 2,4–3,0× · passe 3 |
| "não sei o que é clicável" | um sinal só, e o sinal é hover ou cor | dois sinais, um independente de ponteiro · passe 1 |
| "isso não parece botão" | ghost sem superfície nem borda, solto no conteúdo | preenchimento ou borda ≥ 3:1 · passe 1 |
| "a borda tá estranha" | borda abaixo de 3:1, ou raio fora da gramática, ou borda + sombra + preenchimento juntos | passe 3 |
| "cliquei e não era clicável" | falso affordance: card com cara de botão | passe 1 |
| "tá apertado e confuso ao mesmo tempo" | interno > externo: padding do card maior que o gap entre cards | passe 4 |
| "parece que nada acontece quando clico" | delta de estado imperceptível (`opacity: .9` como hover) | passe 5 |
| "tá desalinhado mas o Figma diz que não" | alinhamento de caixa onde o olho pede massa | passe 6 |
| "no celular eu erro o botão" | alvo abaixo de 24/44px | passe 2 |

---

## Ordem de conserto

Do que quebra o uso pro que só refina. **Pare quando o pedido foi atendido** — esta rota não é desculpa pra varrer o produto inteiro.

### 1. Affordance
O que é clicável parece clicável; o que não é, não parece. Único passe que decide se a pessoa consegue usar o produto. → `affordance.md`

### 2. Alvo
Todo alvo de ponteiro com no mínimo **24×24 CSS px** (WCAG 2.5.8, AA); alvo primário de toque em 44×44. Ícone pequeno **mantém o tamanho visual** e ganha área por padding ou pseudo-elemento — engordar o ícone estraga a composição pra resolver acessibilidade. → `affordance.md`

### 3. Geometria do controle
Altura, padding, raio, borda, gap de ícone. É aqui que "botão muito alto" e "borda estranha" morrem. → `geometry.md`

### 4. Ritmo do espaço
Escala única; **interno ≤ externo**; mesma classe de elemento com o mesmo valor. A escala, os pisos de padding por tipo de card e o peso de seção estão em `../design/tokens.md` — esta rota aplica, não redefine.

### 5. Estados
A pergunta não é "existe?", é **"dá pra ver?"**. Magnitude de delta por estado em `geometry.md`.

### 6. Óptica
As correções que a matemática erra: ícone assimétrico descentralizado, rótulo sentado baixo dentro do botão, círculo que parece menor que o quadrado ao lado. → `geometry.md`

Passe 1 e 2 são obrigatórios sempre que a rota é acionada. Do 3 em diante, entra o que o pedido cobre.

---

## A regra que evita o conserto virar bagunça

**Consertar instância cria dívida; consertar o componente paga dívida.**

Achou o mesmo problema em três lugares? Não corrija os três — corrija a definição do componente e deixe as três instâncias herdarem. Se o projeto não tem componente pra isso, o achado vira: "existem 14 botões escritos à mão; o conserto é um componente". Diga isso em vez de editar 14 arquivos.

Correção que precisa ser repetida por item não é correção.

---

## Verificação

Craft de interface **não se prova por leitura de diff**. `padding: 14px → 16px` está certo no código e errado na tela metade das vezes.

Obrigatório antes de dizer pronto:

1. **Screenshot antes e depois**, mesmo enquadramento, mesmo zoom.
2. Se a correção não aparece na comparação lado a lado, ela não foi aplicada ou não valia — reverta.
3. **Estados provados na interação real**: hover com ponteiro, foco por `Tab`, disabled, loading. Ler o CSS não conta.
4. Uma passada em 320px de largura e uma em 200% de zoom. Apertar espaçamento quebra exatamente aí.
5. Nenhum contrato da lista "não muda" foi tocado — confira o lado `-` do diff, onde regressão mora.

```bash
python3 scripts/ui_audit.py <arquivos alterados>
python3 scripts/check_contrast.py --matrix text=#hex bg=#hex surface=#hex border=#hex primary=#hex on-primary=#hex
```

Não deu pra renderizar: escreva `não verificado: <motivo>`.

---

## Saída

```markdown
## Inventário
- Altura de controle: 7 valores (28, 32, 34, 36, 40, 44, 52) → grade fixada em 32 / 40 / 48
- Raio: 5 valores (4, 6, 8, 10, 16) → grade fixada em 6 / 10 / 16
- Espaçamento fora da escala: 13, 17, 18, 21, 27
- Borda: 3 cores, 2 abaixo de 3:1
- Alvos abaixo de 24px: 9

## Corrigido
| Onde | Era | Virou | Por quê |
|---|---|---|---|
| `Button.tsx` primário | h 52px / rótulo 14px | h 40px / rótulo 14px | razão 3,7× → 2,9× |
| `Card.tsx` linha clicável | só hover de texto | chevron persistente + hover de superfície | segundo sinal independente de ponteiro |

## Não toquei (fora do contrato desta rota)
- A paleta entrega `border` em 1,3:1 contra a superfície. Subir isso muda um token global — decisão sua.

## Prova
- antes.png / depois.png · estados verificados por interação · 320px e 200% ok
```

Achado que sobrou **fora** do contrato entra na seção "não toquei", com o custo em uma linha. Nunca como edição silenciosa.

---

## Arquivos

| Preciso de | Leia |
|---|---|
| clicável vs. estático, botão com cara de botão, quando o ícone entra, alvo | `affordance.md` |
| grade de altura, padding, raio, borda, magnitude de estado, correção óptica | `geometry.md` |
| a escala de espaçamento, pisos de card, raio e sombra do sistema | `../design/tokens.md` |
| teclado, foco, form, imagem, URL, locale — craft funcional | `../ux/interface-quality.md` |
| a lei por trás do sintoma (proximidade, contraste de destaque, custo de decisão) | `../ux/laws.md` |
