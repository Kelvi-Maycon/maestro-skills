---
name: self-improvement
description: 'Captura automaticamente correções, preferências, regras novas e retrabalho recorrente do Kelvi na fila de melhoria deste assistente (memory/fila-melhoria.md no workspace). Usar quando ele corrigir como o assistente trabalha, repetir mudanças no mesmo tema, disser sempre/nunca/prefiro ou explicitar contexto durável sobre o jeito de trabalhar. Não usar para iteração normal de artefato nem para decisão ou fato de projeto (isso é da conhecimento-pessoal). Escreve apenas na fila; mudança em skill, system prompt ou SOUL é proposta para o Kelvi aplicar.'
---

# Self Improvement Seguro

Em tarefa somente leitura, a captura na fila continua autorizada, salvo se o Kelvi pediu para não gravar. A skill não amplia outra autorização de escrita.

## Objetivo

Guardar aprendizados do uso real sem deixar uma observação isolada reescrever as skills. Captura silenciosa agora; consolidação depois, pela `reflect` no Jarvis (o Kelvi leva a fila até lá) ou direto pelo Kelvi.

## Gatilhos

- Kelvi corrige COMO o assistente trabalhou: `na verdade`, `tá errado`, `para de`, `sempre faça`, `nunca faça`, `prefiro`, `da próxima vez`.
- A mesma parte, regra, formato ou comportamento recebe duas ou mais alterações numa tarefa ou em tarefas recentes.
- Kelvi explicita preferência ou regra sobre o jeito de trabalhar com uso futuro.
- Uma regra existente parece obsoleta, contraditória ou responsável por retrabalho.

Decisão, fato ou aprendizado de projeto vai para a `conhecimento-pessoal`. Não acionar para iteração normal, bug pontual, detalhe efêmero, hipótese descartada ou preferência inferida sem evidência.

## Fila de melhoria

Arquivo: `memory/fila-melhoria.md` no workspace deste assistente. Se não existir, criar com `# Fila de melhoria · <nome do assistente>`. Antes de adicionar, buscar tema equivalente na fila e consolidar em vez de duplicar.

```md
- [ ] AAAA-MM-DD | tipo=<correcao|preferencia|retrabalho|regra-obsoleta> | escopo=<todos-os-assistentes|assistente|skill:<nome>> | evidencia=<o que Kelvi disse ou repetiu> | proposta=<mudança durável candidata> | ocorrencias=N | origem=<nome do assistente>
```

- Correção explícita ou `sempre/nunca/prefiro`: registrar na primeira ocorrência.
- Retrabalho sem regra explícita: registrar a partir da segunda.
- Tema existente: atualizar evidência e `ocorrencias`; não criar outra linha.
- Sem segredos, tokens, credenciais nem dados pessoais desnecessários.

## Superfícies proibidas

Esta skill escreve só na fila; nunca altera diretamente:
- system prompt, SOUL, IDENTITY, USER ou `MEMORY.md` do assistente;
- qualquer `SKILL.md` ou arquivo de `references/`;
- conectores, canais, modelo, cron ou config do gateway;
- código, produto, produção, deploy ou sistema externo;
- `memory/decisoes.md`, `memory/contexto/` e `memory/entregas/` (vão pela `conhecimento-pessoal`).

Mudança que toque essas superfícies vira só uma entrada `proposta` na fila.

## Saída

Padrão invisível: não interromper a tarefa para narrar a captura. Se o Kelvi pedir o que foi aprendido, mostrar só as entradas relevantes e o caminho da fila.
