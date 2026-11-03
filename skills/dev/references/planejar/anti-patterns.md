# Anti-Patterns: Guard Rails do SDD

Consultar este arquivo em TODOS os passos. Estes são os 5 problemas mais comuns quando AI gera código, e cada um deles tem uma causa raiz na context window ou na falta de direcionamento.

## 1. Overengineering

**O que é:** A AI cria uma solução 5x mais complexa do que o necessário.

**Por que acontece:** A AI não sabe que existe uma forma mais simples. Quando você não diz explicitamente qual abordagem usar, ela tende a criar abstrações desnecessárias: classes, factories, providers, wrappers, onde uma função simples resolveria.

**Exemplo real:**
- Pedido: "Criar um botão de logout"
- O que a AI faz: cria um AuthProvider, um useAuth hook, um LogoutButton component, um auth middleware, uma auth utility class
- O que bastava: um botão que chama `supabase.auth.signOut()`

**Como evitar:**
- Na SPEC, ser explícito sobre a abordagem: "usar função X da lib Y"
- Se a implementação de algo leva mais de 50 linhas, questionar se não existe uma forma mais simples
- Antes de criar uma abstração (hook, provider, utility), perguntar: "isso vai ser usado em mais de 2 lugares?" Se não, não criar

**Self-check:** "Consigo explicar essa implementação em 1 frase? Se não, provavelmente está complicada demais."

## 2. Reinventar a roda

**O que é:** A AI cria algo do zero quando já existe uma lib madura que resolve.

**Por que acontece:** A AI não sabe que a lib existe, ou sabe mas não está na context window. Então ela faz o melhor que pode: que geralmente é uma versão pior do que a lib já oferece.

**Exemplo real:**
- Pedido: "Criar um editor de texto formatado"
- O que a AI faz: começa a criar um editor com contentEditable, parser de markdown customizado, toolbar customizada: centenas de linhas
- O que bastava: `npm install @tiptap/react` e configurar em 30 linhas

**Como evitar:**
- No Passo 1 (Research), pesquisar libs para CADA funcionalidade não-trivial
- Listar as libs no PRD.md com links de docs
- Na SPEC, referenciar a lib e o trecho da doc que mostra como implementar
- No Passo 3, rodar mini-research por task: consultar docs da lib antes de implementar
- Regra: se o problema já foi resolvido por uma lib com 5k+ stars no GitHub, usar a lib

**Self-check:** "Estou criando algo que eu poderia instalar com npm/pip? Se sim, pesquisar antes de codar."

## 3. Código duplicado

**O que é:** O mesmo código aparece em 2+ lugares do projeto, às vezes com pequenas variações.

**Por que acontece:** A context window estourou. A AI criou um componente de botão 500 mensagens atrás, mas agora não lembra que ele existe. Então cria outro. Agora você tem Button.tsx e CustomButton.tsx fazendo a mesma coisa, e qualquer mudança precisa ser feita em ambos.

**Exemplo real:**
- Na Fase 1, criou `components/Button.tsx` com estilização e variantes
- Na Fase 4, precisa de um botão → cria `features/dashboard/DashboardButton.tsx` com código praticamente idêntico
- Resultado: 2 botões, 2x manutenção, inconsistência visual inevitável

**Como evitar:**
- Na SPEC, listar explicitamente os componentes reutilizáveis e onde eles devem ser importados
- Criar componentes base nas primeiras fases e referenciar nas fases seguintes: "usar o Button de `components/Button.tsx`"
- No Passo 3 (Implement), rodar mini-research antes de cada task: buscar na codebase código reutilizável
- Antes de criar qualquer componente novo, verificar se já existe um similar

**Self-check:** "Esse código já existe em algum lugar do projeto? Se sim, importar ao invés de reescrever."

## 4. Responsabilidades misturadas

**O que é:** Um único arquivo faz coisas que deveriam estar separadas: lógica de negócio, chamadas de API, formatação visual, validação, tudo junto.

**Por que acontece:** A AI tende a resolver tudo no arquivo em que está trabalhando no momento. Se ela está editando uma page, ela coloca a query do banco, a lógica de transformação e o componente visual tudo no mesmo arquivo. Mais rápido de escrever, pesadelo de manter.

**Exemplo real:**
- Arquivo `pages/dashboard.tsx` com: query SQL inline, função de formatação de dados, lógica de filtro, 3 componentes visuais, handler de eventos, chamada de API externa
- Resultado: arquivo de 500+ linhas impossível de debugar, testar ou modificar sem quebrar outra coisa

**Como evitar:**
- Na SPEC, definir a estrutura de arquivos com responsabilidade clara:
  - `components/` → componentes visuais (UI pura)
  - `hooks/` ou `lib/` → lógica reutilizável
  - `services/` ou `actions/` → chamadas de API/banco
  - `utils/` → funções utilitárias puras
- Cada arquivo deve ter UMA responsabilidade que você consegue descrever em 1 frase
- Se um arquivo passa de 150 linhas, provavelmente precisa ser dividido

**Self-check:** "Consigo descrever o que esse arquivo faz em 1 frase? Se preciso de 'e' na descrição ('faz X e Y e Z'), precisa ser dividido."

## 5. Lógica no front-end (Thin Client / Fat Server)

**O que é:** Regras de negócio, validações críticas ou secrets expostos no front-end (client-side), onde qualquer usuário pode ver e manipular.

**Por que acontece:** A AI tende a resolver tudo onde é mais rápido. Se ela está num componente React e precisa validar algo, ela valida ali mesmo: no client. Se precisa de uma chave de API, ela importa direto. Não é por mal, é porque ela otimiza pra "funcionar", não pra "ser seguro".

**Exemplo real:**
- Validação de "somente admin pode ver isso" feita com `if (user.role === 'admin')` no componente React → qualquer pessoa abre o DevTools, muda o role no state, e vê tudo
- Chave do Supabase service_role (full access) importada num componente client-side → qualquer pessoa abre o DevTools e copia a chave
- Preço de produto calculado no front-end → usuário manipula o preço antes de enviar pro checkout

**Como evitar:**
- **Regra de ouro:** front-end só captura intenção (cliques, inputs) e renderiza respostas. Zero lógica de negócio.
- **Validação:** toda validação que protege o sistema vai no server action ou API route. Validação no form é só pra UX (feedback rápido pro usuário): nunca é a validação real.
- **Secrets:** nenhuma chave no front-end. Tudo via variáveis de ambiente server-side (`process.env` em server actions, não em componentes client).
- **Controle de acesso:** toda checagem de role/permissão no server. Nunca confiar no state do client.
- **Cálculos sensíveis:** preço, desconto, limites: tudo no server. Front-end recebe o resultado.
- Na SPEC, marcar explicitamente na regra de arquitetura: "Thin Client / Fat Server"

**Self-check:** "Se um usuário abrir o DevTools, ele consegue ver ou manipular essa lógica? Se sim, mover pro server."

## 6. Vitória prematura

**O que é:** O agente declara uma fase ou task como "concluída" sem que os sensores externos confirmem. Ele marca ✅ baseado no próprio julgamento: "tá bom o suficiente", "o código parece certo", "provavelmente os testes passam".

**Por que acontece:** Quando a mesma instância que implementa também decide se está pronto, ela vai tender a confirmar o próprio trabalho. É viés de auto-avaliação. Documentado pela Anthropic como uma das falhas mais comuns de agentes sem harness.

**Exemplo real:**
- Agente implementa 4 server actions numa fase
- Declara "Fase 2 concluída! Tudo funcionando."
- Na verdade: typecheck tem 3 erros, um teste quebrou por regressão, o lint reclama de 12 warnings
- O usuário só descobre quando tenta rodar o projeto em outra sessão

**Como evitar:**
- A decisão de "done" não é do agente: é do exit code. Rodar os 3 comandos (typecheck, lint, test) ao fim de cada fase e só avançar se os 3 retornarem 0.
- Colar o output real dos comandos na mensagem, não um resumo. "Output diz: 8 tests passed" é prova; "Testes passando ✅" é autodeclaração.
- Se os comandos não existem no projeto, criar scripts básicos antes de começar a implementação (ainda no Passo 2 ou início do Passo 3).

**Self-check:** "Eu rodei os 3 comandos (typecheck/lint/test) e vi exit 0 nos 3, ou estou deduzindo que eles passariam?"

## Checklist rápido (usar a cada fase do Passo 3)

Antes de finalizar cada fase de implementação, rodar este checklist mental:

| # | Pergunta | Se sim → |
|---|----------|----------|
| 1 | Tem algo aqui que poderia ser mais simples? | Simplificar |
| 2 | Estou criando algo que já existe como lib? | Usar a lib |
| 3 | Esse código já existe em outro lugar do projeto? | Importar |
| 4 | Esse arquivo faz mais de uma coisa? | Separar |
| 5 | Estou implementando algo que não está na SPEC? | Remover |
| 6 | Algum arquivo passou de 150 linhas? | Considerar dividir |
| 7 | Tem lógica de negócio ou secret no front-end? | Mover pro server |
| 8 | Rodei typecheck/lint/test e vi exit 0 real nos 3? | Se não, rodar antes de declarar fase concluída |
| 9 | Atualizei o PROGRESS.md com o estado da fase? | Se não, atualizar antes de limpar o contexto (sessão nova do assistente, ou `/clear` num agente de terminal) |
