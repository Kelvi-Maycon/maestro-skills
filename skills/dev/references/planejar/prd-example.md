# Exemplo de PRD.md

Este é o formato que o PRD deve seguir. O exemplo abaixo é de um app fictício de gestão de hábitos para referência.

---

```markdown
# PRD: HabitFlow

## O que é
App web para rastrear hábitos diários com streaks, lembretes e visualização de progresso. O usuário marca seus hábitos como feitos a cada dia e vê seu histórico em calendário.

## Usuário
Pessoas que querem criar e manter hábitos consistentes: público geral, não técnico, 20-40 anos.

## Features MVP (em ordem de prioridade)
1. Cadastro/login de usuário
2. Criar, editar e deletar hábitos
3. Marcar hábito como feito no dia (check/uncheck)
4. Visualizar streak atual (dias consecutivos)
5. Calendário de progresso (verde = feito, vazio = não feito)
6. Dashboard com resumo (total de hábitos, streak mais longo, % de conclusão da semana)

## Features futuras (NÃO entra no MVP)
- Lembretes por push notification
- Compartilhar progresso com amigos
- Categorias de hábitos
- Exportar dados em CSV
- App mobile nativo

## Stack

| Decisão | Escolha | Por quê |
|---------|---------|---------|
| Front | Next.js 14 (App Router) | SSR, boa DX, maior comunidade React |
| Estilização | Tailwind CSS + shadcn/ui | Componentes prontos, consistência visual fácil |
| Back/API | Next.js Server Actions | Sem precisar de API separada, colocation de código |
| Banco | Supabase (PostgreSQL) | Auth + banco + realtime num serviço só |
| ORM | Prisma | Type-safe, migrations automáticas, boa com Supabase |
| Auth | Supabase Auth | Google + email/password, integrado com o banco |
| Hospedagem | Vercel | Deploy automático, boa com Next.js |

## Libs Recomendadas

| Problema | Lib | Por quê |
|----------|-----|---------|
| Validação de forms | Zod + React Hook Form | Type-safe, leve, boa DX |
| Calendário visual | react-calendar ou custom com date-fns | Leve, customizável |
| Datas | date-fns | Mais leve que Moment, tree-shakeable |
| Ícones | Lucide React | Consistente com shadcn/ui |
| Toast/notificações | Sonner | Bonito, simples, integra bem com shadcn |

## Documentações Relevantes

### Supabase Auth (email + Google)
```ts
// Setup do client
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(URL, ANON_KEY)

// Login com email
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@email.com',
  password: 'password'
})

// Login com Google
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google'
})

// Pegar usuário logado
const { data: { user } } = await supabase.auth.getUser()
```

### Prisma com Supabase
```prisma
// schema.prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  habits    Habit[]
  createdAt DateTime @default(now())
}

model Habit {
  id        String      @id @default(uuid())
  name      String
  userId    String
  user      User        @relation(fields: [userId], references: [id])
  entries   HabitEntry[]
  createdAt DateTime    @default(now())
}

model HabitEntry {
  id        String   @id @default(uuid())
  habitId   String
  habit     Habit    @relation(fields: [habitId], references: [id])
  date      DateTime
  completed Boolean  @default(true)
  @@unique([habitId, date])
}
```

### Next.js Server Actions (padrão de uso)
```ts
// app/actions/habits.ts
'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createHabit(formData: FormData) {
  const name = formData.get('name') as string
  // ... validação com Zod
  await prisma.habit.create({ data: { name, userId } })
  revalidatePath('/dashboard')
}
```

## Padrões de Referência

### Estrutura de pastas (Next.js App Router)
```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx (landing page)
├── components/
│   ├── ui/ (shadcn components)
│   └── habits/ (habit-specific components)
├── lib/
│   ├── prisma.ts
│   ├── supabase.ts
│   └── utils.ts
├── actions/
│   └── habits.ts (server actions)
└── types/
    └── index.ts
```
```

---

## Regras do PRD

1. **Ser específico**: "Calendário de progresso" não basta. "Calendário de progresso mostrando verde para dias completados e cinza para dias não completados" é melhor.

2. **Incluir code snippets reais**: não pseudocódigo. Os snippets devem vir das docs oficiais ou de implementações de referência testadas.

3. **Separar MVP de futuro**: o anti-scope explícito previne a AI de implementar features que não foram pedidas.

4. **Documentações relevantes = trechos, não links**: a AI precisa do conteúdo na context window, não de um link que ela não vai acessar no Passo 2.

5. **Stack justificada**: cada escolha com "por quê" em 1 frase. Isso ajuda o usuário a entender e a AI a respeitar as escolhas.
