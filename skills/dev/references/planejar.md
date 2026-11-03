# Modo planejar: SDD (Spec Driven Development)

## Objetivo

Conduzir PRD -> SPEC -> implementação com contexto comprimido, decisões explícitas e menos erro de IA.
A chamada deve transformar ideia solta em artefatos que guiam construção verificável.

- Separe pesquisa, planejamento e implementação; cada etapa gera artefato que alimenta a próxima.
- Leia as referências certas por etapa e corte informação que não muda execução.
- Amarre aceite e testes aos requisitos antes de construir.

## Modo interno

- Use PRD/SPEC como disciplina de execução; não obrigue o Kelvi a ver documentos se a tarefa cabe numa implementação direta.
- Para feature pequena em repo existente, aplique o raciocínio internamente e edite direto.
- Para projeto grande ou novo produto, gere/atualize artefatos só quando isso realmente destrava execução.

Método de 3 passos para construir software com IA de forma estruturada. Cada passo produz um artefato comprimido que alimenta o próximo, com contexto limpo entre eles.

## Por que este método existe

Quando a IA gera código sem estrutura (vibe coding), ela produz problemas previsíveis: overengineering, código duplicado, reinvenção de roda, responsabilidades misturadas, gafes de segurança. Isso acontece porque a context window enche com informação irrelevante e a IA perde a capacidade de gerar output de qualidade.

O SDD resolve isso com um princípio simples: cada passo pesquisa e comprime, para que o próximo passo trabalhe com contexto enxuto e 100% relevante. Funciona como um funil: entra muita informação, sai só o essencial.

## Fluxo dos 3 passos

```
PASSO 1: Research  -> Output: PRD.md
        ↓ (usuário limpa o contexto)
PASSO 2: Plan      -> Output: SPEC.md (com tasks atômicas)
        ↓ (usuário limpa o contexto)
PASSO 3: Implement -> Output: código funcionando + testes
```

Limpar o contexto entre cada passo (sessão nova do assistente, ou `/clear` num agente de terminal) é o que faz o método funcionar. Sem isso, a context window acumula lixo dos passos anteriores e a qualidade degrada. Cada passo começa com contexto zerado, recebendo apenas o artefato comprimido do passo anterior.

Projeto novo: depois da SPEC aprovada, o Passo 3 roda dentro do modo iniciar ([iniciar.md](iniciar.md)), que faz scaffold, git, docs e então implementa seguindo as regras do Passo 3 abaixo. Feature em codebase existente (Cenário B): Passo 3 direto.

## Referências detalhadas

Para detalhes de cada etapa, ler os arquivos em `planejar/`:

| Arquivo | Quando ler |
|---------|-----------|
| [planejar/stack-guide.md](planejar/stack-guide.md) | No Passo 1, ao recomendar stack para o usuário |
| [planejar/anti-patterns.md](planejar/anti-patterns.md) | Em TODOS os passos, como guard rail |
| [planejar/prd-example.md](planejar/prd-example.md) | No Passo 1, ao gerar o PRD.md |
| [planejar/spec-example.md](planejar/spec-example.md) | No Passo 2, ao gerar a SPEC.md |

---

## PASSO 1: Research

**Objetivo:** entender o que o usuário quer construir e reunir todo contexto necessário (stack, libs, docs, padrões) comprimido num PRD.md.

**Antes de começar:** ler [planejar/stack-guide.md](planejar/stack-guide.md) para ter o framework de decisão de stack.

### Detectar o cenário

**Cenário A, projeto novo (sem codebase):** o usuário tem uma ideia e precisa de tudo: stack, arquitetura, identidade visual, implementação. É o cenário mais comum para não-devs.

**Cenário B, feature nova (codebase existente):** o usuário já tem um projeto rodando e quer adicionar funcionalidade. O foco é entender a codebase existente antes de propor mudanças.

### 1. Perguntas ao usuário (máximo 4)

Fazer APENAS perguntas que você não consegue responder sozinho:

- **O que é?** Descreva em 1-2 frases o que seu app/site faz.
- **Pra quem?** Quem vai usar isso?
- **O que é essencial?** Se você pudesse lançar com apenas 3 features, quais seriam?
- **Preferências?** Tem algo que você já sabe que quer usar? (opcional)

Se o usuário não souber responder algo técnico, recomende você mesmo. O usuário não é obrigado a saber programar.

### 2. Pesquisa ativa

Após as respostas, pesquisar ativamente (web search, docs, GitHub):

**Stack:** consultar [planejar/stack-guide.md](planejar/stack-guide.md) e recomendar a stack ideal para o tipo de projeto. Justificar cada escolha em 1 frase.

**Libs que resolvem problemas prontos:** para cada problema comum no projeto (auth, editor de texto, pagamentos, email, upload de arquivos etc.), buscar a lib mais estabelecida. O objetivo é usar soluções prontas sempre que possível; a IA não deve reinventar o que já existe.

**Documentações:** ler os trechos relevantes das docs oficiais das tecnologias escolhidas. Extrair só o que é necessário para esta implementação específica.

**Padrões de referência:** buscar exemplos de implementação similares em GitHub, docs oficiais, Stack Overflow. Se encontrar um repo de referência bom, anotar os padrões de código relevantes.

### 3. Gerar PRD.md

Consultar [planejar/prd-example.md](planejar/prd-example.md) para o formato esperado. O PRD deve conter:

- Descrição do projeto e usuário
- Features MVP priorizadas
- Stack completa com justificativas
- Libs recomendadas (problema -> lib -> por quê)
- Trechos relevantes de documentações (só o que importa)
- Code snippets de referência encontrados na pesquisa
- Para Cenário B: arquivos existentes afetados + o que pode ser reutilizado

O PRD é um resumo comprimido. Ele filtra toda a pesquisa e retém só informação acionável. Nada de contexto inútil.

### 4. Validar e transicionar

Mostrar o PRD ao usuário. Pedir feedback. Ajustar se necessário. Quando aprovado:

> PRD aprovado. Agora limpe o contexto (**sessão nova** do assistente).
> Na próxima mensagem, mande: **"Leia o PRD.md e gere a spec"** junto com o arquivo PRD.md.

---

## PASSO 2: Plan / Spec

**Objetivo:** transformar o PRD num plano tático de implementação, com identidade visual definida, arquitetura de arquivos clara e tasks atômicas organizadas em fases incrementais.

**O contexto deve estar limpo.** O usuário limpou o contexto e está passando o PRD.md.

### 2.1 Identidade visual

O visual precisa estar definido antes de qualquer código, porque ele influencia a estrutura de componentes.

Diga ao usuário:

> Antes de planejar o código, vamos definir o visual:
>
> 1. **Cores:** entre no [Adobe Color](https://color.adobe.com/pt/explore) e escolha uma paleta. Me mande os códigos hex.
> 2. **Fontes:** entre no [Google Fonts](https://fonts.google.com/) e escolha uma fonte primária (títulos) e uma secundária (corpo de texto).
> 3. **Referências:** me mande 2-3 links de apps/sites cujo visual você gosta.

Aguardar o usuário. Não avançar sem as definições visuais.

Quando o usuário voltar com as escolhas, registrar como Design Tokens:
- Cores com hex (primária, secundária, acento, background, texto)
- Fontes com nome exato do Google Fonts
- Links de referência visual

### 2.2 Definições de produto

Com base no PRD, refinar e validar com o usuário:

- **Features MVP ranqueadas**: em que ordem construir (as mais importantes primeiro)
- **Fluxos do usuário**: jornada passo a passo dentro do app (ex.: "usuário abre o app -> vê dashboard -> clica em criar -> preenche form -> salva")
- **Anti-scope**: lista explícita do que NÃO entra no MVP. Previne scope creep e mantém o foco.

Apresentar e confirmar antes de avançar.

### 2.3 Stack (validação)

Apresentar a stack do PRD de forma simples para o usuário validar:

| Decisão | Escolha | Por quê |
|---------|---------|---------|
| Front | X | [1 frase] |
| Back/API | X | [1 frase] |
| Banco de dados | X | [1 frase] |
| Auth | X | [1 frase] |
| Hospedagem | X | [1 frase] |
| Libs principais | X, Y, Z | [1 frase cada] |

Perguntar: "Concorda ou quer mudar algo?" Aguardar aprovação.

### 2.4 Gerar SPEC.md (com tasks atômicas)

Consultar [planejar/spec-example.md](planejar/spec-example.md) para o formato detalhado. A spec precisa ser tão específica que a IA consiga implementar apenas lendo ela, sem ambiguidade.

Elementos obrigatórios da SPEC:

- **Design Tokens**: cores, fontes, referências visuais (extraídos da skill ou do input manual)
- **Stack**: todas as tecnologias com justificativa
- **Estrutura de arquivos**: árvore completa com descrição de cada arquivo
- **Fases de implementação**, cada fase com:
  - O que entrega (1 frase)
  - **Tasks atômicas**, cada task com:
    - Descrição curta (1 frase)
    - Arquivos a criar (path + o que faz + detalhes + snippets)
    - Arquivos a modificar (path + o que muda + por quê)
    - Teste(s): arquivo de teste + cenários a cobrir (se a task cria lógica)
    - Critério de done (como saber que a task está completa)
  - Verificação da fase (comandos automáticos + checagens manuais)
- **Regra de arquitetura thin client / fat server**: front-end só captura intenção do usuário e renderiza. Toda lógica de negócio, validação e regras ficam no back-end. Nenhuma chave ou secret no front-end.
- **Anti-scope**: o que NÃO fazer
- **Próximos passos**: features futuras pós-MVP

Cada fase deve ser incremental e funcionar sozinha. Não criar fases gigantes. Cada task dentro da fase deve ser pequena o suficiente para não lotar a context window.

**Regra para tamanho de tasks:** se uma task cria/modifica mais de 3 arquivos, ela é grande demais; quebre em tasks menores.

### 2.5 Validar e transicionar

Mostrar a SPEC ao usuário. Iterar se necessário. Quando aprovada:

> SPEC aprovada. Agora limpe o contexto (**sessão nova** do assistente).
> Projeto novo: na próxima mensagem, rode o modo iniciar (`dev iniciar`) junto com PRD.md e SPEC.md.
> Feature em codebase existente: mande **"Implemente essa SPEC.md"** junto com o arquivo SPEC.md.

---

## PASSO 3: Implement

**Objetivo:** executar a SPEC task por task, verificando cada uma antes de avançar.

**O contexto deve estar limpo.** O usuário limpou o contexto e está passando a SPEC.md.

### Regras de ouro

1. **Seguir a spec**: implementar exatamente o que está escrito. Se algo não está na spec, não implementar.
2. **Uma task por vez**: completar, verificar (incluindo teste), mostrar resultado, aguardar aprovação ao final de cada fase.
3. **Consultar anti-patterns**: ler [planejar/anti-patterns.md](planejar/anti-patterns.md) e fazer self-check a cada fase.
4. **Não decidir sozinho**: se encontrar problema ou ambiguidade, perguntar ao usuário com opções claras.
5. **Thin client / fat server**: toda lógica de negócio no back-end. Front-end só captura intenção e renderiza.
6. **Sensores decidem "done", não o agente**: nenhuma fase é declarada concluída sem os comandos de verificação (typecheck/lint/test) retornarem exit code 0. Se qualquer um falhar, corrigir antes de reportar progresso. Auto-avaliação sem sensor externo vira vitória prematura: o agente cola ✅ em tudo que ele mesmo fez.

### Fluxo por fase

```
Para cada fase na SPEC:
  1. Anunciar: "Fase N: [nome]. Vou implementar [1 frase]"
  2. Para cada task da fase:
     a. Mini-research: buscar na codebase código reutilizável + consultar docs das libs envolvidas
     b. Criar/modificar os arquivos listados na task
     c. Aplicar design tokens em componentes visuais
     d. Escrever teste(s) da task (se a task cria lógica)
     e. Rodar testes da task + testes das fases anteriores (regressão)
     f. Se teste falha: corrigir antes de avançar pra próxima task
  3. Gate determinístico de fim de fase (obrigatório, nesta ordem):
     - Rodar typecheck (`pnpm typecheck` ou equivalente): exit 0 obrigatório
     - Rodar linter (`pnpm lint`): exit 0 obrigatório
     - Rodar suite de testes (`pnpm test`): exit 0 obrigatório
     - Se QUALQUER um falhar: NÃO declarar fase concluída. Corrigir, rodar de novo.
     - Só reportar "fase concluída" depois dos 3 ✅ reais (exit code 0)
     - Colar o output real dos comandos na mensagem, como prova de que rodou.
  4. Atualizar PROGRESS.md (ver "Estado entre sessões")
  5. Mostrar resultado: "Fase N concluída. [output dos 3 comandos]" e perguntar: "Posso avançar para a Fase N+1?"
  6. Se ajuste pedido: ajustar antes de avançar
```

**Por que o gate determinístico é regra separada:** o agente que implementa tem viés natural de declarar vitória. Se ele decide sozinho se "está bom", vai achar que está; esse é o padrão "vitória prematura" documentado pela Anthropic. A única forma de bloquear isso é externalizar a decisão para a ferramenta cujo exit code o agente não controla.

### Mini-research por task

Antes de implementar cada task, rodar uma pesquisa rápida:

1. **Buscar na codebase**: existem componentes, hooks, utils ou patterns reutilizáveis? Se sim, importar em vez de recriar.
2. **Consultar docs**: se a task envolve uma lib externa (Supabase, Prisma, Stripe etc.), ler o trecho relevante da doc antes de implementar. Não adivinhar a API.

Isso evita os 2 anti-patterns mais comuns: código duplicado e reinvenção de roda.

### Testes por task

**Regra simples:** cada task que cria lógica (server action, API route, util, hook, validação) gera pelo menos 1 teste automatizado.

**O que testar:**
- Server actions / API routes: input válido + inválido
- Funções utilitárias: edge cases
- Validações Zod: dados válidos e inválidos
- Lógica de negócio: cenários reais

**O que NÃO testar no MVP:**
- Componentes visuais puros: verificação manual
- Layouts e estilização: verificação visual
- Integrações de terceiros (auth provider, payment): teste manual

**Stack de testes padrão:** Vitest (ou Jest). Arquivo: `[nome].test.ts` ao lado do arquivo testado.

### Estado entre sessões (PROGRESS.md)

A implementação raramente acontece em sessão única. O usuário retoma depois de horas ou dias, troca de máquina, abre nova janela. Sem arquivo de estado canônico, o agente começa do zero e gasta tokens reconstruindo contexto, ou pior, refaz trabalho que já estava pronto.

**Regra:** manter um `PROGRESS.md` na raiz do projeto. É o arquivo que o agente lê ANTES da SPEC ao retomar sessão.

**Ao iniciar implementação:** criar `PROGRESS.md` vazio com o header.

**Ao concluir cada fase (depois do gate determinístico passar):** atualizar com append, nunca reescrever.

Formato:

```markdown
# PROGRESS: [nome do projeto]

## Estado atual
- Fase ativa: Fase N+1 (próxima a implementar)
- Última sessão: 2026-04-17

## Fase 1: [nome] ✅ 2026-04-15
- Arquivos criados: app/page.tsx, lib/auth.ts, components/Header.tsx
- Testes: 8/8 passando
- Verificações: typecheck ✅ | lint ✅ | test ✅
- Decisões/trade-offs: usei Supabase Auth em vez de Clerk (decisão do usuário na fase)

## Fase 2: [nome] ✅ 2026-04-16
- Arquivos criados: ...
- Testes: 12/12 passando
- Verificações: typecheck ✅ | lint ✅ | test ✅
- Notas: ajuste na validação Zod depois de bug encontrado no teste de integração

## Fase 3: [nome] 🔄 em andamento
- Task atual: 3.2 (criar server action de checkout)
- Bloqueio: nenhum
```

**Ao retomar sessão (primeiro prompt depois de limpar o contexto):** o agente lê `PROGRESS.md` primeiro, depois a `SPEC.md`, depois confirma estado com o usuário: "Última fase concluída foi a N. Próxima é a N+1: [nome]. Posso começar?"

**Por que isso importa:** sem esse arquivo, o agente tenta descobrir o estado lendo o código e os commits, o que é custoso em tokens e propenso a erro. PROGRESS.md é o handoff explícito entre sessões.

### Comunicação com usuário

**Ao iniciar fase:** "Fase [N]: [Nome]. Vou implementar [1 frase do que entrega]"

**Ao concluir fase:** mostrar o output real dos 3 comandos do gate (typecheck/lint/test) + confirmar PROGRESS.md atualizado. Perguntar se pode avançar.

**Se encontrar problema:** explicar o problema, apresentar 2 opções de solução, perguntar qual o usuário prefere.

### Após todas as fases

1. Gate final: typecheck + lint + test na suite completa (exit 0 em todos)
2. Verificação final: tudo roda, tudo integrado, design tokens consistentes
3. Atualizar `PROGRESS.md` com a entrada final: "Projeto concluído em [data]"
4. Entregar resumo: o que foi construído, stack utilizada, como rodar, como rodar testes
5. Listar próximos passos sugeridos do anti-scope
6. Se o usuário quiser adicionar features: iniciar novo ciclo SDD

---

## Guard rails (ativos em TODOS os passos)

Consultar [planejar/anti-patterns.md](planejar/anti-patterns.md) para detalhes. Resumo:

| Anti-pattern | Sinal de alerta | Ação |
|-------------|-----------------|------|
| Overengineering | Solução com mais de 2x a complexidade necessária | Simplificar; buscar a solução mais simples que funciona |
| Reinventar roda | Criando algo que já existe como lib | Pesquisar lib estabelecida e usar ela |
| Código duplicado | Mesmo código aparecendo em 2+ lugares | Importar de onde já existe ou criar componente reutilizável |
| Responsabilidades misturadas | Arquivo fazendo mais de uma coisa | Separar em arquivos com responsabilidade única |
| Lógica no front-end | Regra de negócio, validação ou secret no client | Mover para o back-end: thin client, fat server |
| Vitória prematura | Declarar fase "concluída" sem rodar typecheck/lint/test | Parar. Rodar os 3 comandos. Só avançar com exit 0 real em todos. |

---

## Ambientes de uso

### Chat (Maestro ou app de desktop)

Os 3 passos rodam na mesma sessão. Pedir para limpar o contexto entre cada passo (sessão nova do assistente, ou `/clear` num agente de terminal). O fluxo é conversacional: o agente guia o usuário por cada etapa, faz perguntas quando necessário, só avança com validação.

### Terminal (agente de código em CLI)

Cada passo roda numa sessão limpa: Research gera PRD.md, Plan lê PRD.md e gera SPEC.md, Implement lê SPEC.md e implementa task por task.
