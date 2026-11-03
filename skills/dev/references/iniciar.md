# Modo iniciar: setup completo de projeto

## Objetivo

Sair de PRD/SPEC validados para projeto iniciado com scaffold, git, docs, arquivo de instruções do projeto (`CLAUDE.md` ou `AGENTS.md`, conforme o agente que vai trabalhar no projeto), config do runtime e primeira implementação rastreável.
A chamada deve criar uma base executável, não um plano bonito.

- Extraia stack, comandos, fases e restrições antes de criar arquivo.
- Não invente dependências fora da SPEC.
- Termine com comandos de verificação rodados e próximos passos reais.

Você orquestra o setup do projeto. Quando o usuário enviar PRD + SPEC, execute TODO o fluxo abaixo de forma AUTOMÁTICA, sem pedir confirmação entre etapas. O usuário já validou PRD e SPEC antes de chegar aqui (modo planejar, [planejar.md](planejar.md)).

## Modo de operação

### Projeto novo (default)
Executa o fluxo completo: git init -> scaffold -> docs e arquivo de instruções -> config do runtime -> implementação.

### Projeto existente (apenas quando o usuário pedir explicitamente)
Pula git init e scaffold (etapas 2 e 3). Só gera docs, arquivo de instruções, config do runtime e plano de fases.
Detecta: se já existe package.json, .git ou código fonte -> modo existente.
Se o pedido for só documentar projeto existente, sem SPEC nem plano de fases, use o modo documentar ([documentar.md](documentar.md)).

---

## Fluxo completo (executar em ordem)

### Etapa 1: extrair contexto da SPEC

Leia o PRD e a SPEC fornecidos. Extraia e memorize:

- **Nome do projeto**
- **Stack completa** (framework, linguagem, DB, CSS, deploy)
- **Fases de implementação** (ordem, dependências, escopo de cada)
- **Comandos** (dev, test, build, lint, migrate)
- **Convenções** (naming, estrutura de pastas, patterns)
- **O que NÃO fazer** (restrições explícitas da SPEC)
- **Integrações** (APIs externas, serviços, auth)

### Etapa 2: criar pasta e git init

```bash
mkdir -p <nome-do-projeto>
cd <nome-do-projeto>
git init
```

### Etapa 3: scaffold do projeto

Baseado na stack extraída da SPEC:

1. Inicializar o gerenciador de pacotes (npm init, pnpm init etc.)
2. Instalar dependências listadas na SPEC
3. Criar estrutura de pastas conforme arquitetura da SPEC
4. Criar arquivos de config (tsconfig, tailwind, prisma, .env.example etc.)
5. Criar .gitignore apropriado para a stack

**IMPORTANTE:** não invente dependências. Use APENAS o que está na SPEC.

### Etapa 4: docs e arquivo de instruções

Rodar o fluxo do modo documentar ([documentar.md](documentar.md)) com PRD/SPEC como contexto. Ele cria `docs/`, `handoff/` e gera o arquivo de instruções do projeto (`CLAUDE.md` ou `AGENTS.md`, conforme o agente que vai trabalhar no projeto) uma vez só, já com descrição, comandos, stack, convenções, testes, git, NÃO FAZER, índice dos docs e manutenção viva. Em projeto ainda sem código, a fonte é a SPEC.

### Etapa 5: configurar o runtime

Depende do runtime que está executando. Criar só o que for realmente útil para o projeto.

#### Claude: `.claude/settings.json`

```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "permissions": {
    "allow": [
      "Read",
      "Edit",
      "Write",
      "Glob",
      "Grep",
      "Bash(<comandos de dev/test/build extraídos da SPEC>)"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Bash(curl *)",
      "Read(./.env)",
      "Read(./.env.*)"
    ]
  }
}
```

Adaptar allow/deny à stack real do projeto.

#### `AGENTS.md` como fonte principal (quando o projeto não for rodar no Claude)

O `AGENTS.md` é o lugar correto para comandos, convenções, arquitetura e guardrails do repo. Ele deve trazer comandos exatos de dev/test/build/lint/migrate, a regra para nunca ler ou imprimir `.env*`, os comandos destrutivos proibidos e os docs consultados sob demanda (isso já sai da etapa 4). Não inventar schema de permissões nem arquivo de config de outro runtime sem a SPEC pedir.

#### Regras por área (se o projeto tiver múltiplas áreas)

Criar regras modulares APENAS se a SPEC definir convenções diferentes por área:
- `code-style.md`: convenções de código
- `testing.md`: regras de teste
- Claude: em `.claude/rules/`, com frontmatter `paths:` para escopo por diretório.
- Com `AGENTS.md`: como docs auxiliares linkados a partir dele; não criar formato próprio se o repo ainda não usa.

### Etapa 6: gerar plano de fases

Criar o plano de implementação extraído das fases da SPEC na ferramenta de plano do runtime (lista de tarefas da sessão):
- Cada fase da SPEC vira um item
- Ordem respeita dependências da SPEC
- Primeira fase marcada como in_progress

### Etapa 7: commit inicial

```bash
git add -A
git commit -m "chore: project setup via dev iniciar

- Scaffold com <stack>
- docs/, handoff/ e arquivo de instruções configurados
- Config do runtime (`.claude/` ou `AGENTS.md`) quando aplicável
- Plano de <N> fases pronto"
```

### Etapa 8: iniciar Fase 1

Começar a implementação da primeira fase da SPEC automaticamente, seguindo o Passo 3 de [planejar.md](planejar.md) (regras de ouro, gate determinístico typecheck/lint/test, PROGRESS.md).
Seguir a ordem e o escopo definidos na SPEC.
Usar o checklist de verificação da fase antes de marcar como completa.

---

## Regras importantes

1. **Tudo vem da SPEC**: não invente features, deps ou convenções que não estão na SPEC.
2. **Automático**: execute todas as etapas sem pedir confirmação.
3. **Arquivo de instruções com no máximo 80 linhas**: conciso e acionável (regras em [documentar.md](documentar.md)).
4. **Guardrails restritivos**: sempre negar leitura de `.env*` e comandos destrutivos (deny no `.claude/settings.json` no Claude; proibição explícita no `AGENTS.md` nos demais).
5. **Fases na ordem**: respeitar sequência e dependências da SPEC.
6. **Projeto existente**: se o usuário pedir para configurar projeto existente, pular etapas 2 e 3.
7. **Sem over-engineering**: criar regras por área só se necessário, não por default em projetos simples.
