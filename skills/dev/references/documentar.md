# Modo documentar: base de conhecimento viva

## Objetivo

Criar a base de conhecimento viva de um projeto para que sessões futuras não errem por falta de contexto.
A chamada deve documentar fatos reais de arquitetura, banco, decisões, glossário e integrações.

- Extraia fatos do código/DB real antes de documentar.
- Crie docs mínimos, úteis e mantíveis; sem stub bonito.
- Registre a manutenção viva no arquivo de instruções do projeto (`CLAUDE.md` ou `AGENTS.md`, conforme o agente que vai trabalhar no projeto) e verifique cada afirmação contra a fonte.

Você está criando (ou normalizando) a documentação VIVA de um projeto: arquitetura, banco, decisões, definições, integrações.

Roda em projeto NOVO ou EXISTENTE. **NÃO** faz scaffold de código, não instala dependências, não cria features; isso é trabalho do modo iniciar ([iniciar.md](iniciar.md)). Aqui você cria SÓ a camada de conhecimento que se mantém viva. Quando chamado pelo modo iniciar, PRD/SPEC são o contexto.

Contexto opcional (projeto novo sem código ainda): o texto que vier depois do comando, ou PRD/SPEC quando vier do modo iniciar.
Se vazio, leia o projeto existente e extraia tudo do código real.

Objetivo operacional: ao final, o projeto tem `docs/` populado COM DADOS REAIS (não stub), `handoff/` pronto e o arquivo de instruções do projeto (`CLAUDE.md` ou `AGENTS.md`, conforme o agente que vai trabalhar no projeto) com o índice dos docs + a regra de manutenção viva. "Pronto" só com os arquivos criados e o conteúdo verificado contra o código/DB real.

## Método

### 1. Detectar contexto (antes de escrever nada)
- Working dir = raiz do projeto.
- Existe código? (package.json, src/, .git, migrations, pyproject etc.) -> projeto existente. Senão -> novo: use o contexto recebido + pergunte o mínimo necessário.
- Detectar stack lendo configs reais (linguagem, framework, DB, deploy). Não chutar.
- Existe projeto Supabase no conector "Supabase pessoal" (conta claude.ai)? Identificar QUAL corresponde a este projeto (pelo nome/working dir). Se ambíguo, perguntar 1x. Conector ausente no bot (`claude mcp list`): avisar o Kelvi e marcar database.md como "a confirmar".

### 2. Criar estrutura na raiz (só o que não existir)
```
docs/architecture.md
docs/database.md
docs/decisions.md
docs/glossary.md
docs/integrations.md
handoff/HANDOFF.md   (se não existir; mesmo formato do compacta-resumo)
```

### 3. Popular DE VERDADE (proibido stub vazio)
- **architecture.md**: mapear pastas REAIS, fluxo de dados, módulos/serviços, pontos de entrada. Projeto novo sem código: escrever a arquitetura pretendida a partir do contexto recebido/SPEC. Tabelas e diagrama ASCII onde ajudar.
- **database.md**: **puxar o schema REAL pelo conector "Supabase pessoal"** (`list_tables`; se precisar de RLS/policies/índices, `execute_sql` no catálogo ou `get_advisors`). Documentar: tabela -> colunas (tipo, PK/FK, nullable), relações, RLS, índices. Sem DB ainda -> seção marcada "sem DB, preencher na 1ª migration".
- **decisions.md**: ADR. Registrar as decisões estruturais já tomadas (stack, arquitetura, padrões) como itens: `[DD/MM] Decisão: razão em 1 linha`. Append-only no futuro.
- **glossary.md**: termos do domínio do projeto (o que cada conceito significa NESTE projeto). Evita a IA reinterpretar errado.
- **integrations.md**: serviços externos: APIs, webhooks, n8n, MCPs, analytics, auth. Por item: papel, onde está configurado, env var/credencial (nome, nunca valor).

Formato de todo doc: conciso, escaneável, tabela onde couber, zero prosa floreada. Primeira linha de cada: `> Atualizado [DD/MM]. Mantido vivo, regra no <arquivo de instruções>.` (`CLAUDE.md` ou `AGENTS.md`, conforme o agente que vai trabalhar no projeto).

### 4. Arquivo de instruções do projeto (`CLAUDE.md` ou `AGENTS.md`, conforme o agente que vai trabalhar no projeto)

Este é o único lugar da `dev` que gera esse arquivo; o modo iniciar chama esta etapa.

- Projeto JÁ tem o arquivo -> **adicionar/atualizar** as seções abaixo que faltarem, sem destruir o resto.
- Não tem -> criar com o template abaixo. Projeto existente sem SPEC: preencher só o que dá para detectar (nome, comandos, stack) + as duas seções finais; o resto só se houver fonte real.

Template (NO MÁXIMO 80 linhas no total):

```markdown
# <Nome do Projeto>

## Descrição
<1-2 linhas do que é o projeto, extraído do PRD ou do código>

## Comandos
- Dev: `<comando>`
- Test: `<comando>`
- Build: `<comando>`
- Lint: `<comando>`
<outros comandos relevantes, ex.: migrate>

## Arquitetura
- <pasta>: <propósito>
<mapear estrutura principal; detalhe fica em docs/architecture.md>

## Stack
<listar tecnologias com versões>

## Convenções
<regras de código da SPEC: naming, patterns, imports>

## Testes
<como testar, onde ficam os testes, qual runner>

## Git
<branch naming, commit convention>

## NÃO FAZER
<restrições da SPEC>
- Nunca ler ou imprimir `.env*`.
- <comandos destrutivos proibidos>

## Base de conhecimento (docs/)
Ler sob demanda, NÃO tudo de uma vez:
- docs/architecture.md: estrutura, fluxo, módulos
- docs/database.md: schema, tabelas, RLS
- docs/decisions.md: ADR (por que cada escolha)
- docs/glossary.md: termos do domínio
- docs/integrations.md: serviços externos

## Manutenção viva (OBRIGATÓRIO)
Quando uma mudança alterar, atualizar o doc NO MESMO passo (não depois):
- schema/migration -> docs/database.md
- estrutura de pastas/módulos/fluxo -> docs/architecture.md
- decisão estrutural (stack, padrão, trade-off) -> docs/decisions.md (append, com data + razão)
- termo novo do domínio -> docs/glossary.md
- nova integração/serviço -> docs/integrations.md
Doc desatualizado MENTE pra IA e ela erra com confiança. Atualizar junto com a mudança.
Promoção: decisão de sessão (handoff `## Decisões`) que vira estrutural sobe pra docs/decisions.md.
```

As duas seções finais (Base de conhecimento e Manutenção viva) entram exatamente como acima.

**Regras do arquivo de instruções:**
- Cada linha deve ser ACIONÁVEL (se remover e o agente não erra, deletar).
- Sem personalidade ("seja profissional"), sem teoria, sem história.
- Comandos exatos, não genéricos.
- Extrair tudo da SPEC ou do código real, não inventar.

### 5. Verificar e reportar
- Conferir cada doc contra a fonte real (código/DB); não deixar afirmação inventada.
- Reportar curto: o que foi criado, o que foi populado de verdade, o que ficou pendente (ex.: DB vazio, glossário a completar).

## Regras
- Tudo vem do código/DB/SPEC real. Não inventar tabela, módulo ou decisão.
- Doc enxuto > doc completo-e-mentiroso. Na dúvida, marcar "a confirmar" em vez de chutar.
- Não tocar em código de aplicação. Só docs/, handoff/ e o arquivo de instruções (`CLAUDE.md` ou `AGENTS.md`, conforme o agente que vai trabalhar no projeto).
- Idempotente: rodar de novo num projeto já configurado = reconciliar, não duplicar.
