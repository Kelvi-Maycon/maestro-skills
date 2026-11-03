# Craft de interface — o que separa "parece desenhado" de "é bem construído"

Isso vale pra **tudo que sai**, inclusive componente puxado de biblioteca. Restilizar pros tokens travados é a mesma passada em que você verifica estes itens — componente de terceiro não ganha passe livre.

---

## Teclado

- Tab alcança todo controle interativo, na ordem visual
- Enter e Espaço acionam botão; Enter aciona link
- Escape fecha overlay, dropdown e modal
- Foco fica preso dentro de modal aberto e **volta pro gatilho** quando fecha
- Seta navega dentro de grupo composto (tabs, menu, lista de opções)
- Nada é acessível só por hover — hover é reforço, nunca o único caminho
- Nenhum `tabindex` positivo

## Foco

- **Anel visível em todo elemento focável.** `outline: none` só com substituto visível equivalente
- Contraste do anel ≥ 3:1 contra o fundo em que ele aparece — inclusive sobre superfície colorida
- `:focus-visible` pra não mostrar anel em clique de mouse, mas mostrar sempre em teclado
- O anel não é cortado por `overflow: hidden` do pai

## Nome acessível

- Todo input com `<label>` associado. Placeholder **não** é label
- Botão só de ícone com `aria-label`
- Imagem com significado tem `alt` descritivo; decorativa tem `alt=""`
- Ícone dentro de botão com texto é `aria-hidden`
- Link cujo texto é "clique aqui" ou "saiba mais" fora de contexto não tem nome útil

## Formulário

- `type` correto (`email`, `tel`, `url`, `number`) — muda teclado no mobile e validação nativa
- `autocomplete` e `name` corretos pra autofill funcionar
- Validação na saída do campo, não a cada tecla; erro ao lado do campo, específico, com o caminho da correção
- Erro associado ao campo por `aria-describedby`
- Estado de envio: botão desabilita e mostra progresso; envio duplo bloqueado
- **Colar nunca bloqueado** — senha, código de verificação e cartão principalmente
- Input com no mínimo 16px no mobile (abaixo disso o iOS dá zoom sozinho)
- Campo obrigatório marcado antes do envio, não depois

## Imagem e mídia

- `width` e `height` explícitos, ou `aspect-ratio` — sem isso o layout pula ao carregar
- `loading="lazy"` abaixo da dobra; a imagem do hero **não** é lazy
- Formato moderno com fallback; `srcset` para densidades
- Vídeo com `poster`, e sem autoplay com som

## Estado da URL

- Filtro, aba, busca, paginação e item aberto que importam ficam na URL
- Recarregar, compartilhar e voltar precisam funcionar
- Navegação por history não quebra estado nem foco

## Locale e formatação

- `Intl.DateTimeFormat`, `Intl.NumberFormat`, `Intl.RelativeTimeFormat` — nunca formatação manual
- Moeda com o código correto, não símbolo hardcoded
- `lang` no `<html>`; `dir` quando houver conteúdo RTL
- Texto que expande em outro idioma não estoura o componente

## Texto e overflow

- Nome longo, e-mail longo, título longo não quebram o layout — truncar com reticências **e** manter o conteúdo acessível (tooltip, title, ou expansão)
- Lista longa: virtualize ou pagine, não renderize 10.000 nós
- Zoom até 200% sem perder conteúdo nem gerar scroll horizontal
- Texto selecionável onde faz sentido copiar (código, ID, valor)

## Componente do sistema

- **Chip, tag, botão e aba com número ou rótulo dinâmico ficam sempre em uma linha.** Quebrar em duas muda a altura padrão do componente
- Rótulo e contagem se separam visualmente (`Todas — 42`, número em cor distinta), nunca colados
- Nenhum controle encosta na borda: ícone e seta respeitam o padding interno

## Performance percebida

- Nada que bloqueie a primeira renderização sem necessidade
- Fonte com `font-display: swap` e fallback de métrica parecida, pra não pular layout
- Skeleton com a forma real do conteúdo, não spinner genérico
- Abaixo de ~400ms, sem indicador nenhum

## Copy de interface

- Voz ativa, e diz o que fazer agora
- Botão descreve o resultado ("Excluir projeto"), não "OK"
- Sem exclamação em sucesso, sem "Ops!" em erro
- Vocabulário de quem lê, não do time interno
- Sentence case

---

## Sinalize à primeira vista

Estes não precisam de investigação — vendo, já é achado:

`outline: none` sem substituto · `href="#"` · imagem sem `alt` · input sem label · botão de ícone sem `aria-label` · `<div onclick>` no lugar de `<button>` · `tabindex` positivo · `onPaste` bloqueando · data formatada à mão · `transition: all` · `ease-in` em UI · hover sem gate de ponteiro · `alert()` como tratamento de erro · texto de placeholder em produção
