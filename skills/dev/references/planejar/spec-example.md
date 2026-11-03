# Exemplo de SPEC.md

Este é o formato que a SPEC deve seguir. O exemplo abaixo é de um app fictício de gestão de hábitos para referência.

A SPEC precisa ser tão específica que a AI consiga implementar apenas lendo ela: sem ambiguidade, sem decisões criativas, sem margem para interpretação.

**Novidade v2:** Cada fase agora é composta de **tasks atômicas**. Cada task lista arquivos, testes e critério de done. Isso mantém a context window limpa e dá controle granular ao usuário.

---

```markdown
# HabitFlow: SPEC

## Stack
- Next.js 14 (App Router): framework fullstack com SSR
- Tailwind CSS + shadcn/ui: estilização e componentes prontos
- Supabase: banco PostgreSQL + auth + storage
- Prisma: ORM type-safe com migrations
- Vitest: testes unit/integration
- Vercel: hospedagem com deploy automático

## Design Tokens

### Cores (Primary 7-stop)
- 50: #F0EEFF
- 100: #D9D4FF
- 300: #A89AFF
- 500: #6C63FF ★ (primária)
- 700: #4A3FCC
- 800: #362E99
- 900: #231F66

### Cores (Neutral 7-stop, tinted com primary hue)
- BG: #F8F7FF
- 50: #F0EFF5
- 200: #D4D2E0
- 400: #9896A8
- 600: #5C5A6E
- 800: #2D2B45
- 950: #1A1930

### Cores Semânticas
- Acento/Sucesso: #44D9A5 (streaks, checkmarks)
- Erro: #EF4444
- Superfície: #FFFFFF (cards, modais; light mode)
- Texto primário: #1A1930
- Texto secundário: #5C5A6E

### Fontes
- Primária (títulos, botões, nav): Inter, peso 600/700
- Secundária (corpo): Inter, peso 400/500

### Espaçamento
- Grid base: 8px
- Valores: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64

### Radius & Shadows
- Cards: rounded-xl (12px), shadow-sm
- Botões: rounded-full (pill)
- Inputs: rounded-lg (8px)

### Referências visuais
- Estilo clean/minimalista similar ao Notion
- Ícones: Lucide React (outlined SVG, stroke only)

## Regra de Arquitetura: Thin Client / Fat Server

- **Front-end (client):** Só captura intenção do usuário (cliques, inputs) e renderiza respostas. Zero lógica de negócio.
- **Back-end (server):** Toda validação, regra de negócio, acesso a banco, chamadas externas.
- **Secrets:** Nenhuma chave, token ou secret no front-end. Tudo via variáveis de ambiente server-side.
- **Validação:** Zod no server action (obrigatório) + Zod no form (opcional, UX only).

## Estrutura de Arquivos

```
habitflow/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx          # Página de login (email + Google)
│   │   │   └── signup/
│   │   │       └── page.tsx          # Página de cadastro
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx            # Layout com sidebar e header
│   │   │   ├── page.tsx              # Dashboard principal com resumo
│   │   │   └── habits/
│   │   │       └── page.tsx          # Lista de hábitos com calendário
│   │   ├── layout.tsx                # Root layout (fonts, providers)
│   │   └── page.tsx                  # Landing page pública
│   ├── components/
│   │   ├── ui/                       # Componentes shadcn (Button, Card, Dialog, etc)
│   │   ├── habits/
│   │   │   ├── HabitCard.tsx         # Card de um hábito com check e streak
│   │   │   ├── HabitForm.tsx         # Form para criar/editar hábito
│   │   │   ├── HabitCalendar.tsx     # Calendário de progresso do hábito
│   │   │   └── HabitList.tsx         # Lista de todos os hábitos
│   │   ├── dashboard/
│   │   │   ├── StatsCards.tsx        # Cards de resumo (total, streak, %)
│   │   │   └── WeeklyProgress.tsx    # Barra de progresso da semana
│   │   └── layout/
│   │       ├── Sidebar.tsx           # Sidebar de navegação
│   │       └── Header.tsx            # Header com perfil e logout
│   ├── actions/
│   │   ├── habits.ts                 # Server actions de hábitos (CRUD)
│   │   ├── habits.test.ts            # Testes das server actions de hábitos
│   │   ├── entries.ts                # Server actions de entries (check/uncheck)
│   │   └── entries.test.ts           # Testes das server actions de entries
│   ├── lib/
│   │   ├── prisma.ts                 # Client Prisma singleton
│   │   ├── supabase/
│   │   │   ├── client.ts             # Client-side Supabase client
│   │   │   └── server.ts             # Server-side Supabase client
│   │   ├── utils.ts                  # Funções utilitárias (formatDate, calcStreak)
│   │   └── utils.test.ts             # Testes das funções utilitárias
│   └── types/
│       └── index.ts                  # Types compartilhados
├── prisma/
│   └── schema.prisma                 # Schema do banco
├── .env.local                        # Variáveis de ambiente (não commitar)
├── tailwind.config.ts                # Config do Tailwind com design tokens
├── vitest.config.ts                  # Config do Vitest
├── next.config.js                    # Config do Next.js
└── package.json
```

## Fases de Implementação

### Fase 1: Setup do projeto e banco de dados

**O que esta fase entrega:** Projeto Next.js rodando com Supabase conectado, schema do banco criado, auth funcionando, e Vitest configurado.

#### Task 1.1: Inicializar projeto e dependências

**Descrição:** Criar projeto Next.js com todas as dependências.

**Arquivos a criar:**
- `package.json`: dependências:
  - next, react, react-dom
  - @supabase/supabase-js, @prisma/client, prisma
  - tailwindcss, @tailwindcss/typography
  - zod, react-hook-form, @hookform/resolvers
  - lucide-react, sonner, date-fns
  - vitest, @testing-library/react (devDependencies)

- `vitest.config.ts`: configuração do Vitest com paths do Next.js

- `.env.local`: template com variáveis necessárias (sem valores reais)

**Critério de done:** `npm install` roda sem erros.

---

#### Task 1.2: Configurar banco de dados (Prisma + Supabase)

**Descrição:** Criar schema do banco e conectar com Supabase.

**Arquivos a criar:**
- `prisma/schema.prisma`: schema completo:
  - Model User: id, email, name, habits[], createdAt
  - Model Habit: id, name, userId, user, entries[], createdAt, updatedAt
  - Model HabitEntry: id, habitId, habit, date, completed, @@unique([habitId, date])

- `src/lib/prisma.ts`: client Prisma singleton:
  ```ts
  import { PrismaClient } from '@prisma/client'
  const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
  export const prisma = globalForPrisma.prisma || new PrismaClient()
  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
  ```

**Critério de done:** `npx prisma db push` cria as tabelas. `npx prisma studio` mostra User, Habit, HabitEntry.

---

#### Task 1.3: Configurar Supabase clients e design tokens

**Descrição:** Criar Supabase clients (browser + server) e configurar Tailwind com design tokens.

**Arquivos a criar:**
- `src/lib/supabase/client.ts`: Supabase client (browser)
- `src/lib/supabase/server.ts`: Supabase client (server)
- `tailwind.config.ts`: com cores customizadas dos design tokens
- `src/app/layout.tsx`: root layout com fonte Inter (Google Fonts)

**Critério de done:** `npm run dev` inicia sem erros. Fonte Inter carrega.

---

### Fase 2: Auth (login, signup, logout)

**O que esta fase entrega:** Páginas de login e signup funcionando com email/password e Google. Middleware protegendo rotas do dashboard.

#### Task 2.1: Criar páginas de auth (UI)

**Descrição:** Criar páginas de login e signup com forms.

**Arquivos a criar:**
- `src/app/(auth)/login/page.tsx`: página de login
  - Form com email + password (usar React Hook Form + Zod)
  - Botão "Entrar com Google"
  - Link para signup
  - Aplicar design tokens: cores primárias nos botões, fundo BG

- `src/app/(auth)/signup/page.tsx`: página de signup
  - Form com name, email, password
  - Botão "Cadastrar com Google"
  - Link para login
  - Mesmos design tokens

**Critério de done:** Ambas as páginas renderizam. Forms aparecem com design tokens aplicados.

---

#### Task 2.2: Implementar lógica de auth (server actions)

**Descrição:** Criar server actions de auth usando Supabase.

**Arquivos a criar:**
- `src/actions/auth.ts`: server actions:
  - `signInWithEmail(formData)`: validação Zod + `supabase.auth.signInWithPassword`
  - `signUpWithEmail(formData)`: validação Zod + `supabase.auth.signUp`
  - `signInWithGoogle()`: `supabase.auth.signInWithOAuth({ provider: 'google' })`
  - `signOut()`: `supabase.auth.signOut()`

- `src/actions/auth.test.ts`: testes:
  - signInWithEmail com dados válidos → não retorna erro
  - signInWithEmail sem email → retorna erro de validação Zod
  - signUpWithEmail com senha fraca → retorna erro
  - signOut → executa sem erro

**Arquivos a modificar:**
- `src/app/(auth)/login/page.tsx`: conectar form com server actions
- `src/app/(auth)/signup/page.tsx`: conectar form com server actions

**Critério de done:** `npx vitest run auth` passa. Login com email funciona.

---

#### Task 2.3: Middleware de proteção de rotas

**Descrição:** Criar middleware que protege rotas do dashboard.

**Arquivos a criar:**
- `src/middleware.ts`:
  - Rotas `/dashboard/*` → redirecionar para `/login` se não autenticado
  - Rotas `/login`, `/signup` → redirecionar para `/dashboard` se já autenticado

**Critério de done:** Acessar /dashboard sem login → redireciona para /login. Acessar /login já logado → redireciona para /dashboard.

---

### Fase 3: CRUD de hábitos

**O que esta fase entrega:** Usuário consegue criar, ver, editar e deletar hábitos no dashboard.

#### Task 3.1: Criar server actions de hábitos

**Descrição:** CRUD de hábitos no back-end.

**Arquivos a criar:**
- `src/actions/habits.ts`: server actions:
  - `createHabit(formData)`: cria hábito vinculado ao userId
  - `updateHabit(id, formData)`: atualiza nome do hábito
  - `deleteHabit(id)`: deleta hábito e todas suas entries
  - Todas validam com Zod server-side e usam `revalidatePath`

- `src/actions/habits.test.ts`: testes:
  - createHabit com dados válidos → retorna habit criado
  - createHabit sem nome → retorna erro de validação
  - updateHabit com id inexistente → retorna erro
  - deleteHabit → deleta habit e entries associadas

**Critério de done:** `npx vitest run habits` passa.

---

#### Task 3.2: Criar componentes de hábitos (UI)

**Descrição:** Componentes visuais para listar e gerenciar hábitos.

**Mini-research:** Buscar na codebase se já existe algum componente de Card ou Form reutilizável antes de criar.

**Arquivos a criar:**
- `src/components/habits/HabitForm.tsx`: form de criar/editar
  - Input de nome do hábito
  - Modo criação (vazio) e edição (preenchido)
  - Validação client-side com Zod (UX only: validação real no server action)
  - Submit via server action

- `src/components/habits/HabitCard.tsx`: card de um hábito
  - Nome do hábito
  - Botão de check para hoje (placeholder: lógica na Fase 4)
  - Menu com editar/deletar (usar DropdownMenu do shadcn)
  - Design tokens: card com rounded-xl, shadow-sm

- `src/components/habits/HabitList.tsx`: lista de hábitos
  - Renderiza HabitCards
  - Estado vazio: "Nenhum hábito ainda. Crie seu primeiro!"
  - Botão "Novo hábito" que abre Dialog com HabitForm

**Critério de done:** Lista renderiza, criar hábito → aparece na lista, editar e deletar funcionam. Design tokens aplicados.

---

#### Task 3.3: Criar página de hábitos

**Descrição:** Página que conecta componentes com dados do servidor.

**Arquivos a criar:**
- `src/app/(dashboard)/habits/page.tsx`:
  - Server component que busca hábitos do usuário logado
  - Importa HabitList

**Critério de done:** Página carrega com hábitos do usuário. CRUD completo funciona end-to-end.

---

### Fase 4: Check-in diário e streaks

**O que esta fase entrega:** Usuário marca hábitos como feitos no dia. Streak é calculado e exibido.

#### Task 4.1: Criar server actions e utils de entries

**Descrição:** Lógica de check/uncheck e cálculo de streak.

**Arquivos a criar:**
- `src/actions/entries.ts`:
  - `toggleEntry(habitId, date)`: cria entry se não existe, deleta se existe
  - Constraint: máximo 1 entry por hábito por dia (@@unique no schema)

- `src/lib/utils.ts`: funções utilitárias:
  - `calcStreak(entries[])`: calcula dias consecutivos até hoje
  - `formatDate(date)`: formata data para display
  - `isToday(date)`: verifica se a data é hoje

- `src/actions/entries.test.ts`:
  - toggleEntry cria entry quando não existe
  - toggleEntry deleta entry quando já existe
  - toggleEntry respeita constraint unique

- `src/lib/utils.test.ts`:
  - calcStreak com 3 dias consecutivos → retorna 3
  - calcStreak com gap no meio → retorna streak desde último gap
  - calcStreak sem entries → retorna 0
  - isToday com hoje → true
  - isToday com ontem → false

**Critério de done:** `npx vitest run entries utils` passa.

---

#### Task 4.2: Integrar check-in nos componentes

**Descrição:** Conectar lógica de toggle e streak no HabitCard.

**Mini-research:** Verificar como HabitCard.tsx foi construído na Task 3.2: importar, não recriar.

**Arquivos a modificar:**
- `src/components/habits/HabitCard.tsx`: adicionar:
  - Botão de check que chama `toggleEntry` (server action)
  - Visual diferente quando check de hoje está feito (cor acento #44D9A5)
  - Badge com streak: "🔥 5 dias"

**Critério de done:** Clicar check → marca (verde). Clicar de novo → desmarca. Streak calcula corretamente.

---

### Fase 5: Calendário e Dashboard

**O que esta fase entrega:** Visualização de progresso em calendário e dashboard com estatísticas.

#### Task 5.1: Criar componente de calendário

**Descrição:** Grid mensal mostrando dias completados.

**Arquivos a criar:**
- `src/components/habits/HabitCalendar.tsx`:
  - Grid mensal com dias
  - Dias com entry completada: fundo acento (#44D9A5)
  - Dias sem entry: fundo neutro (Neutral-50)
  - Navegação entre meses

**Critério de done:** Calendário renderiza. Dias verdes correspondem a entries reais.

---

#### Task 5.2: Criar componentes de dashboard

**Descrição:** Cards de estatísticas e progresso semanal.

**Arquivos a criar:**
- `src/components/dashboard/StatsCards.tsx`:
  - Total de hábitos ativos
  - Maior streak atual
  - % de conclusão da semana

- `src/components/dashboard/WeeklyProgress.tsx`:
  - Barra de progresso visual (últimos 7 dias)
  - Mostra cada dia da semana com status

**Critério de done:** Stats calculam corretamente com dados reais.

---

#### Task 5.3: Criar layout do dashboard e páginas

**Descrição:** Layout com sidebar/header e páginas de dashboard.

**Mini-research:** Verificar se componentes de layout do shadcn podem ser reutilizados.

**Arquivos a criar:**
- `src/components/layout/Sidebar.tsx`, links: Dashboard, Meus Hábitos. Ícones Lucide.
- `src/components/layout/Header.tsx`: nome do usuário, botão de logout.
- `src/app/(dashboard)/layout.tsx`: sidebar fixa à esquerda, header no topo, conteúdo à direita.
- `src/app/(dashboard)/page.tsx`: StatsCards + WeeklyProgress + hábitos de hoje.

**Arquivos a modificar:**
- `src/app/(dashboard)/habits/page.tsx`: adicionar calendário expandível por hábito.

**Critério de done:** Dashboard mostra stats corretas. Sidebar navega. Layout responsivo em mobile.

---

## O que NÃO fazer
- Push notifications (service worker, complexo pro MVP)
- Funcionalidade social (compartilhar, seguir amigos)
- Categorias de hábitos
- Export de dados (CSV, PDF)
- Temas (dark mode)
- App mobile nativo

## Próximos passos (pós-MVP)
1. Dark mode (Tailwind já suporta)
2. Categorias de hábitos com cores
3. Push notifications com Expo
4. Compartilhar streak em redes sociais
5. Export de dados em CSV
```

---

## O que torna essa SPEC boa

1. **Tasks atômicas**: cada task tem escopo pequeno (máximo 3 arquivos), descrição clara, e critério de done testável. A AI nunca precisa interpretar.

2. **Testes embutidos nas tasks**: cada task que cria lógica já especifica os cenários de teste. Isso garante regressão entre fases.

3. **Mini-research antes de implementar**: tasks que podem duplicar código já existente marcam explicitamente "verificar codebase antes de criar".

4. **Thin client / fat server**: regra de arquitetura explícita no topo da SPEC. Toda validação Zod acontece no server action. Front-end só valida pra UX.

5. **Fases incrementais**: cada fase funciona sozinha. Após a Fase 2, auth já funciona.

6. **Code snippets para padrões não-óbvios**: o Prisma singleton, por exemplo.

7. **Anti-scope explícito**: previne a AI de adicionar dark mode, push notifications ou qualquer coisa fora do MVP.

8. **Design tokens com 7-stop**: paleta comprimida que elimina decisões arbitrárias de cor.

9. **Modificações são explícitas**: "HabitCard.tsx: adicionar botão de check". A AI sabe qual arquivo mexer e o que adicionar.
