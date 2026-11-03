# Checkbox

Caixa de marcar nativa de 16 px, em cor de tinta, com o texto à direita. Com `type="radio"` vira opção circular de escolha única.

**Quando usar.** Para itens de lista de verificação ou opções que valem ao enviar: "Fonte ao lado", "Ressalva escrita", "Imagem declarada". Rádio para uma escolha entre poucas opções visíveis: "Semanal, Quinzenal, Mensal".

**O que você fornece.**
- `label`: o texto do item.
- `type="radio"` com o mesmo `name` em todas as opções do grupo; envolva o grupo em `role="radiogroup"` com `aria-label`.
- Demais props vão para o `<input>`: `defaultChecked`, `onChange`, `name`, `disabled`.

**Faça.**
- Agrupe itens relacionados numa pilha com 12 px de intervalo, ou em linha com `.chips` e 20 px entre itens.

**Não faça.**
- Não use para ligar e desligar algo na hora; isso é `Switch`.

Classes do kit: `.chk`, `.chk input[type=radio]`.
