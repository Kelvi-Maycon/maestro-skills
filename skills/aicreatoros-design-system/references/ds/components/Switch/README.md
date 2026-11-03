# Switch

Interruptor de 32 × 20 px com botão de 14 px que corre 12 px e fica lima quando ligado.

**Quando usar.** Para uma preferência que vale na hora, sem botão de salvar: "Receber a edição semanal".

**O que você fornece.**
- `label`: o texto da preferência, à esquerda, em linha com o interruptor. Sem `label`, passe `aria-label`.
- `defaultChecked`: estado inicial. O componente guarda o estado e chama `onChange(ligado)`.
- `disabled`.

**Faça.**
- Escreva o rótulo como o que acontece quando ligado.

**Não faça.**
- Não use para escolha que só vale após enviar um formulário; isso é `Checkbox`.

**Cor.** Lima marca só estado positivo: aqui, ligado.

Classes do kit: `.sw`, `.swrow`.
