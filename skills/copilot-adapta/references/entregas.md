# Registro de entregas do mês

O Kelvi documenta tudo o que fez no mês e marca o trabalho dia a dia. O registro fica na memória deste assistente, em `memory/entregas/` do workspace.

## Onde

- Um arquivo por mês, em `memory/entregas/AAAA-MM.md` (ex.: `2026-10.md`). Se ainda não existir, criar a pasta e o arquivo com o título `# Entregas · <mês por extenso> <ano>`.
- Dentro dele, uma seção por dia, em ordem cronológica: `## DD/MM (dia da semana)`.
- Acrescentar no fim do arquivo (append, ex.: `cat >> ... <<'EOF'`, começando com linha em branco).
- Não apagar nem reescrever o que já está lá. Só acrescentar no dia certo. Se a seção do dia não existir, criá-la no fim do arquivo. Ler o fim do arquivo logo antes de acrescentar.

## Formato do dia

```markdown
## 14/10 (qua)

- [x] ManyChat: 7 templates WhatsApp "[Adapta one 27] [Renovação] [Recuperação de renovação] [api1–7]" criados e enviados à Meta (6 aprovados no dia)
- [x] ManyChat: automações rec-msg01…07-one27 com os templates, publicadas (LIVE)
- [x] AC: 5 e-mails da Renovação One 27 como templates editáveis (100106–100110)
- [ ] Pendente: aprovação Meta da api7; página da nova recuperação
```

- Cada linha diz o sistema (AC, ManyChat, Guru, Planner, Página…) e o que ficou feito, com o nome ou ID que permite achar depois.
- `[x]` para o que foi feito e conferido. `[ ]` para o que ficou pendente, com o motivo quando houver.
- Resultado com número leva fonte e período (ex.: "Reativação +1,3 pp, AB-0016, set/26").
- Sem resumo de conversa e sem frase genérica. Uma linha por entrega.

## Quando escrever

- Ao fim de cada entrega feita com esta skill, adicionar a linha no dia de hoje (data de hoje no fuso de Brasília: o pod pode estar em UTC, usar `TZ=America/Sao_Paulo date +%d/%m`). Não esperar o fim do dia.
- Quando o Kelvi contar algo que fez fora da sessão ("subi a página X"), registrar também.
- Pedido de "fechamento do mês" ou "o que fiz em <mês>": ler o arquivo do mês e entregar o resumo agrupado por sistema e projeto.
