---
name: clareza-dashboard-dados
description: 'Transforma dashboard ou métrica técnica em especificação clara e implementável por desenvolvedor: definição, fórmula, fonte, período, filtros, textos, tooltips e glossário por componente. Usar quando o Kelvi pedir para revisar, explicar ou corrigir a clareza de uma dashboard, card, gráfico ou métrica, ou montar o pedido de correção para o dev. Não usar para análise exploratória ou decisão de growth (growth-data-expert) nem para implementar a dashboard sem pedido.'
---

# Clareza Dashboard Dados

## Overview

Skill para transformar dashboards e metricas tecnicas em uma especificacao clara, auditavel e implementavel por desenvolvedor.
O objetivo nao e melhorar copy isolada; e reduzir erro de interpretacao preservando a logica original do dado.

## Invocacao

Aciona pelo pedido de clareza de dashboard ou metrica, ou explicitamente com `$clareza-dashboard-dados` / `/clareza-dashboard-dados`.
Trate todo texto do pedido como contexto do dashboard, banco, query, screenshot, rota, arquivo ou pedido do Kelvi.

Por padrao, entregue o documento em Markdown no chat. Crie arquivo final somente se o usuario pedir explicitamente.

## Quick Reference

| Cenario | Como Resolver |
|---|---|
| Dashboard confusa | Mapear componentes, metricas, filtros e textos; entregar documento de correcao por componente. |
| Metrica tecnica | Reconstruir definicao, formula, fonte, grao, filtros, inclusoes, exclusoes e interpretacao. |
| Termos tecnicos | Reescrever em portugues claro; se mantiver termo tecnico, usar `Termo* (explicacao curta)` e criar glossario. |
| Falta de contexto | Fazer perguntas objetivas apenas quando a regra nao puder ser inferida com seguranca. |
| Pedido para dev | Gerar instrucoes implementaveis: componente, problema, texto novo, comportamento esperado e criterio de aceite. |
| Dashboard de growth | Proteger coorte, denominador, periodo, segmentacao e decisao que o numero informa. |

## Principio Central

Cada pessoa deve conseguir cair no meio da dashboard e entender:

1. O que o numero mede.
2. De onde ele vem.
3. Qual periodo, filtro e coorte foram aplicados.
4. O que esta incluido e excluido.
5. Como interpretar sem confundir com outra metrica.
6. Qual acao ou decisao aquele dado ajuda a tomar, quando isso existir.

Se qualquer resposta depender de memoria tribal, conversa anterior ou leitura de outro lugar, a dashboard ainda nao esta clara.

## Escopo

### Entra

- Auditoria semantica de dashboards, cards, graficos, tabelas, filtros, abas e tooltips.
- Leitura de banco, schema, queries, dbt/models, arquivos de dashboard, screenshots e documentacao quando disponiveis.
- Reescrita de labels, titulos, subtitulos, descricoes, tooltips, notas, legendas e glossario.
- Documento extenso com pontos de correcao para desenvolvedor.
- Perguntas pendentes quando a regra de negocio nao estiver provada.
- Checklist de acessibilidade, clareza local e risco de interpretacao.

### Fica fora

- Alterar a logica da metrica sem aprovacao.
- Inventar regra de negocio, formula, fonte ou filtro.
- Fazer analise exploratoria para decidir estrategia; se for esse o pedido, usar `growth-data-expert`.
- Validar query tecnica profunda quando existir skill/fonte mais especifica; se for Nekt, respeitar o contrato técnico de `growth-data-expert`.
- Implementar a dashboard no codigo, salvo pedido explicito.
- Criar arquivo final, deck ou relatorio salvo sem pedido explicito.

## Modelo De Execucao

### 1. Localizar Evidencias

Antes de reescrever, encontre o que prova a logica:

- arquivos da dashboard;
- queries SQL;
- models/dbt/semantic layer;
- componentes de BI;
- schema, tabelas e colunas;
- filtros default;
- screenshots ou rotas;
- docs existentes;
- regras narradas pelo usuario.

Classifique cada ponto como:

- `fato`: provado por codigo, query, schema, doc ou input direto.
- `inferencia`: deduzido com boa base, mas nao provado diretamente.
- `pergunta`: precisa do Kelvi/dev/owner para nao inventar.

Nao transforme inferencia em fato.

### 2. Criar Inventario Da Dashboard

Monte uma lista dos elementos visiveis:

- pagina/aba;
- card;
- grafico;
- tabela;
- filtro;
- tooltip;
- legenda;
- nota;
- callout;
- exportacao;
- drilldown/link.

Para cada elemento, registre:

- nome atual;
- funcao na tela;
- metrica principal;
- metricas de apoio;
- dimensoes/cortes;
- filtros aplicados;
- problema de clareza;
- risco de interpretacao errada.

### 3. Reconstruir Cada Metrica

Cada metrica importante precisa desta ficha:

| Campo | Obrigatorio |
|---|---|
| Nome atual | Sim |
| Nome recomendado | Sim |
| Definicao em portugues | Sim |
| Formula | Sim, ou `nao inferivel` |
| Fonte/tabelas/models | Sim, ou `nao localizado` |
| Grao | Sim: venda, usuario, lead, conta, evento, dia etc. |
| Periodo | Sim |
| Coorte | Quando aplicavel |
| Filtros | Sim |
| Inclui | Sim |
| Exclui | Sim |
| Atualizacao/freshness | Quando disponivel |
| Como interpretar | Sim |
| Erros comuns | Sim |
| Texto final da UI | Sim |
| Tooltip curto | Quando util |
| Glossario longo | Quando houver termo tecnico |
| Instrucao para dev | Sim |
| Status | `pronto`, `depende de resposta`, `nao inferivel` |

### 4. Reescrever Para Clareza Local

Use este padrao em cada bloco:

1. Nome humano da metrica.
2. Frase curta de definicao.
3. Contexto minimo: periodo, filtro e coorte.
4. Numero com unidade e base quando houver taxa.
5. Interpretacao ou cuidado.

Exemplo de direcao:

- Ruim: `CAC`
- Melhor: `CAC* (custo de aquisicao de cliente) no periodo selecionado`
- Nota curta: `Quanto foi gasto, em media, para gerar cada novo cliente considerado nesta tela.`

Para taxas, nao deixe numero solto:

- Ruim: `8,3%`
- Melhor: `8,3% das vendas foram reembolsadas, ou 854 de 10.292 vendas no periodo.`

### 5. Tratar Termos Tecnicos

Priorize portugues claro.
Quando o termo tecnico for necessario, mantenha o termo e acrescente uma explicacao curta em portugues:

`CAC* (custo de aquisicao de cliente)`

Regra do asterisco:

- o `*` marca que existe explicacao completa;
- deve virar link interno, ancora ou controle focavel;
- nao pode ser apenas decoracao visual;
- no documento para dev, especifique o destino do link;
- se o destino ainda nao existir, criar item no glossario recomendado.

Cada item de glossario deve conter:

- termo;
- nome em portugues;
- definicao simples;
- formula, se houver;
- fonte dos dados;
- exemplo de leitura;
- cuidado/erro comum;
- componentes onde aparece;
- texto de `aria-label` ou equivalente acessivel, quando houver UI web.

### 6. Escolher Tooltip, Nota Ou Glossario

Use o menor suporte que resolve a interpretacao:

| Tipo | Quando usar | Quando nao usar |
|---|---|---|
| Label claro | Nome do dado esta ruim | Quando precisa explicar regra de calculo longa |
| Subtitulo | Contexto curto de filtro/periodo/coorte | Quando fica repetitivo demais em tabela densa |
| Tooltip | Ajuda complementar, nao essencial | Se sem tooltip o usuario entende errado |
| Nota fixa | Cuidado importante para interpretar o numero | Para definicoes triviais |
| Glossario `*` | Termo tecnico recorrente ou formula longa | Para palavra comum em portugues |
| Secao metodologica | Regra complexa, fonte, freshness ou ressalva grande | Quando basta um tooltip curto |

Se a informacao e essencial para nao interpretar errado, nao esconda apenas em tooltip.

### 7. Gerar Documento Para Desenvolvedor

Use esta estrutura:

```md
# Documento de Correcao de Clareza da Dashboard

## 1. Resumo Executivo
## 2. Problemas Criticos de Interpretacao
## 3. Mapa Da Dashboard
## 4. Inventario De Metricas
## 5. Correcoes Por Componente
## 6. Glossario Tecnico Com Asteriscos
## 7. Regras De Tooltip, Nota E Link Interno
## 8. Perguntas Pendentes
## 9. Checklist De Implementacao Para Dev
## 10. Criterios De Aceite
```

Em `Correcoes Por Componente`, cada item deve seguir:

```md
### [Pagina/Aba] > [Componente]

Status: pronto | depende de resposta | nao inferivel

Problema atual:
- ...

Risco de interpretacao:
- ...

Texto atual:
> ...

Texto recomendado:
> ...

Definicao da metrica:
- ...

Fonte/logica:
- ...

Instrucao para dev:
- ...

Criterio de aceite:
- ...
```

## Perguntas

Pergunte apenas quando a resposta muda o documento ou evita inventar regra.
Perguntas boas sao fechadas, rastreaveis e ligadas a um componente.

Formato:

```md
## Perguntas Pendentes

| Prioridade | Componente | Pergunta | Por que importa | Default se nao responder |
|---|---|---|---|---|
| Alta | Card Receita | Receita usa valor bruto ou liquido de reembolso? | Muda titulo, definicao e formula. | Marcar como `depende de resposta`. |
```

Se uma pergunta bloquear uma recomendacao, marque o item como `depende de resposta`.
Se nao bloquear, use o melhor default e declare a inferencia.

## Checklist Antes De Entregar

Antes de finalizar, verifique:

- Cada metrica tem nome, definicao, fonte, periodo, filtro e interpretacao.
- Toda taxa tem base: `X de Y (%)`.
- Todo termo tecnico necessario tem `*` e item de glossario.
- Nenhum tooltip contem informacao essencial que deveria estar visivel.
- Nenhum texto altera a regra de negocio sem marcar decisao pendente.
- Cada correcao tem instrucao implementavel para dev.
- Cada recomendacao tem evidencia, inferencia declarada ou pergunta.
- A pessoa consegue entender um card isolado sem ler a dashboard inteira.
- Links `*` tem destino previsto e texto acessivel.
- O documento separa claramente `pronto`, `depende de resposta` e `nao inferivel`.

## Common Mistakes

| Erro | Por que acontece | Correcao |
|---|---|---|
| Reescrever sem entender a formula | Parece tarefa de copy, mas e semantica de dado | Primeiro reconstruir logica, depois escrever |
| Usar tooltip para tudo | Esconde contexto essencial | Informacao critica vira label, subtitulo ou nota fixa |
| Trocar termo tecnico por palavra simples imprecisa | Clareza vira erro de definicao | Manter termo tecnico com `*` e explicacao |
| Omitir denominador | Taxa parece mais clara, mas perde base | Sempre escrever `X de Y (%)` quando aplicavel |
| Inventar fonte ou filtro | Falta acesso ao banco/query | Marcar `nao inferivel` ou perguntar |
| Documento bonito sem instrucao de dev | Nao vira implementacao | Cada item precisa de componente, texto e criterio de aceite |

## References

Leia `references/padroes-clareza-dashboard.md` quando precisar reforcar criterios de acessibilidade, plain language, visualizacao de dados, semantic layer, tooltips e glossario.
