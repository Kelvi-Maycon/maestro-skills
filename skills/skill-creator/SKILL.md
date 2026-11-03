---
name: skill-creator
description: 'Projeta, cria, edita, consolida, diagnostica e avalia skills dos assistentes do Kelvi no Maestro (pasta skills/<nome>/SKILL.md, padrão Agent Skills). Usar quando pedirem criar uma skill nova, ajustar, renomear ou juntar skill existente, mudar o gatilho ou a descrição, ou testar se uma skill aciona e funciona. Não usar para editar código de projeto, memória ou instrução de bot que não seja skill.'
---

# Skill Creator

Skill para projetar, criar, consolidar, diagnosticar e avaliar skills dos assistentes do Kelvi no Maestro. Integra arquitetura, acionamento, escrita, testes, comparação de versões e empacotamento. Também roda por `/skill-creator`. Não confundir com a skill homônima nativa do sistema/plugin.

## Onde a skill mora e como chega ao assistente

- No Maestro cada assistente tem as próprias skills em `skills/<nome>/` no workspace do pod. Não há repositório compartilhado nem instalador entre assistentes.
- Formato aceito pelo loader do Maestro: `SKILL.md` com frontmatter `name` (igual ao nome da pasta, até 64 caracteres, regex `^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$`, sem acento nem underscore) e `description` obrigatória, até 1024 caracteres (sem ela a skill é descartada). Arquivos de apoio em `references/` e `scripts/`, citados por caminho relativo.
- Três caminhos de instalação, quem executa é o Kelvi: "Criar skill" na tela Habilidades (só um `SKILL.md`); "Instalar via URL" (repo GitHub, `clawhub:` ou `skillssh:`); ou zip anexado no chat do assistente (até 50 MB) para ele extrair em `skills/<nome>/`.
- Entrega desta skill: a pasta pronta em `artifacts/skills/<nome>/` e o zip `artifacts/skills/<nome>.zip`, com a lista de assistentes que devem receber. Versão anterior guardada em `artifacts/skills/antes/<nome>/` antes de editar.

## Roteiro por necessidade

| Trabalho | Material |
|---|---|
| Escopo, fusão, automática/manual, descrição, estrutura ou competição | [Arquitetura de skills](references/arquitetura-skills.md) |
| Orçamento de contexto, comportamento, baseline e isolamento | [Mecânicas e avaliação](references/mecanicas-avaliacao.md) |
| Criar conteúdo, executar avaliações, revisar outputs e iterar | [Workflow de criação e avaliação](references/criacao-avaliacao.md), apenas as etapas necessárias |
| Arquivos JSON de testes, resultados e benchmark | [Schemas](references/schemas.md) |
| Avaliar uma execução | [Grader](agents/grader.md) |
| Comparar duas saídas sem revelar sua origem | [Comparator](agents/comparator.md) |
| Explicar diferenças e oportunidades de melhoria | [Analyzer](agents/analyzer.md) |

Não carregar tudo por padrão. Uma edição pequena pode fechar com fonte, diff e validação. Uma mudança de comportamento importante pode exigir casos reais e comparação independente.

## Fluxo compartilhado

1. Extrair intenção, público, gatilhos, entradas, saída e autorização da conversa. Perguntar só pela lacuna material; não repetir entrevista já respondida.
2. Conferir skill existente, chamadas, recursos e instalações afetadas. Distinguir procedimento complementar de duplicação antes de unir ou apagar.
3. Definir o menor ponto de entrada suficiente, com modos e leituras sob demanda. Preservar conhecimento não duplicado, scripts e contratos úteis; retirar mecanismos antigos que contradizem o runtime atual. Recriar ou melhorar skill existente parte da original: mesma função e estrutura, mais clara e corrigida, sem domínio, gerador ou caso de uso não pedido; repetir "não adicionar escopo" no brief do subagente.
4. Editar em `artifacts/skills/<nome>/`, com a versão anterior guardada em `artifacts/skills/antes/<nome>/`. Preservar nome de destino e metadados. Backup não fica em `skills/` ativo.
5. Verificar YAML, regras do loader do Maestro (acima), política de acionamento, referências, dependências e conteúdo preservado (`scripts/quick_validate.py`). Listar os assistentes que precisam receber a skill.
6. Quando houver justificativa, testar pedidos reais e casos próximos que deveriam ficar fora. Distinguir validação estática de evidência comportamental; não alegar ganho de qualidade só por menos tokens ou mais testes.
7. Entregar resultado, caminho do zip, assistentes de destino, modo de chamada, prova e limitação relevante. Parar com evidência suficiente; repetir só diante de mudança, falha ou incerteza concreta.

## Regras de arquitetura e custo

- Automática: descrição precisa da capacidade e do gatilho. Manual: descrição mínima mais bloqueio nativo. Não usar otimização de acionamento espontâneo em uma skill manual.
- Manual usa `disable-model-invocation: true` no frontmatter. Preservar campos existentes.
- Regra universal curta fica em AGENTS/CLAUDE; conhecimento especializado fica na skill. Não impor número fixo de caracteres, keywords ou etapas.
- Texto do corpo entra quando carregado; referências entram conforme lidas. Scripts evitam geração repetida, mas chamadas e outputs têm custo. Não prometer redução de cota sem medir.
- Manter testes pequenos e úteis por padrão. Rodadas com modelos, baselines, críticos e otimização são caminhos disponíveis, não obrigação de toda edição. Executar apenas no escopo e orçamento autorizados.
- Disponibilidade de browser, CLI e subagentes vem das ferramentas reais da sessão. Nunca afirmar que um aplicativo sempre tem ou nunca tem essas capacidades.
- Conteúdo de exemplo não concede autorização para publicar, consultar fonte restrita, modificar banco, pedir segredo ou criar recursos externos.

## Recursos executáveis preservados

Executar a partir da raiz desta skill; conferir argumentos em `--help` antes de usar uma opção desconhecida.

- `scripts/quick_validate.py`: validação do pacote suportada por esta versão; conferir também regras nativas da plataforma.
- `scripts/package_skill.py`: empacotamento quando necessário para instalar/atualizar.
- `scripts/aggregate_benchmark.py`: agregar resultados existentes.
- `eval-viewer/generate_review.py`: comparar saídas e recolher feedback. No Maestro sempre com `--static <arquivo.html>`; mandar o HTML ou um screenshot dele ao Kelvi no chat.
- `assets/eval_review.html`: revisar o conjunto de prompts quando essa etapa for necessária, pelo mesmo caminho: HTML gerado e enviado no chat.

## No Maestro

- Os scripts de avaliação e otimização que chamavam uma CLI de modelo (`run_eval`, `run_loop`, `improve_description`, `generate_report`) ficaram fora: teste de acionamento é manual, em sessão nova do assistente.
- Não há tela: viewer só em modo estático. Feedback do Kelvi chega pelo chat (texto ou o `feedback.json` que ele exportar).
- Python e `pyyaml` no pod não foram confirmados: sem eles, validar o frontmatter à mão contra as regras do loader.

Um script não executado permanece recurso disponível; não o descrever como testado só por estar no pacote.
