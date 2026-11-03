# Guia de Decisão de Stack

Use este guia no Passo 1 (Research) para recomendar a stack ideal ao usuário. A recomendação deve ser baseada no tipo de projeto e nas necessidades reais: não em preferência pessoal.

## Princípio: escolher o que tem mais comunidade e docs

A melhor stack para projetos construídos com AI é a que tem mais documentação, exemplos e comunidade. Isso porque a AI depende de padrões conhecidos para gerar código de qualidade. Stack obscura = AI com menos referência = código pior.

## Decisão por tipo de projeto

### SaaS / App Web com autenticação e banco de dados

Tipo: app com login, dashboard, CRUD, dados persistentes.

| Decisão | Recomendação padrão | Alternativa | Quando usar alternativa |
|---------|---------------------|-------------|------------------------|
| Front | Next.js (App Router) | Remix | Se precisa de SSR pesado sem Vercel |
| Estilização | Tailwind CSS | shadcn/ui + Tailwind | Se quer componentes prontos e bonitos |
| Back/API | Next.js API Routes | Supabase Edge Functions | Se precisa de lógica server-side separada |
| Banco | Supabase (PostgreSQL) | PlanetScale (MySQL) | Se já usa MySQL ou precisa de branching |
| ORM | Prisma | Drizzle | Se quer mais controle sobre queries |
| Auth | Supabase Auth | NextAuth.js / Clerk | Se precisa de providers específicos |
| Hospedagem | Vercel | Railway | Se precisa de backend custom / Docker |
| Pagamentos | Stripe | Mercado Pago | Se foco é Brasil e precisa de Pix |

### Landing Page / Site institucional

Tipo: site estático ou semi-estático, foco em conversão e SEO.

| Decisão | Recomendação padrão | Alternativa | Quando usar alternativa |
|---------|---------------------|-------------|------------------------|
| Framework | Next.js (Static) | Astro | Se é 100% estático, sem interatividade |
| Estilização | Tailwind CSS | - | - |
| CMS | Notion como CMS via API | Contentful / Sanity | Se precisa de CMS robusto com editor visual |
| Hospedagem | Vercel | Netlify | Se prefere Netlify ou já usa |
| Analytics | Vercel Analytics / Plausible | GA4 | Se precisa de relatórios detalhados |
| Forms | Resend + React Email | Formspree | Se não quer codar backend para forms |

### Marketplace / Plataforma dois lados

Tipo: app com dois tipos de usuário (vendedor/comprador, freelancer/cliente, etc.)

| Decisão | Recomendação padrão | Notas |
|---------|---------------------|-------|
| Front | Next.js | - |
| Back | Supabase + Edge Functions | Row Level Security é essencial para separar dados |
| Banco | Supabase (PostgreSQL) | Precisa de boas policies de RLS |
| Auth | Supabase Auth | Roles diferentes por tipo de usuário |
| Pagamentos | Stripe Connect | Para split de pagamentos entre plataforma e vendedor |
| Busca | Algolia / Meilisearch | Se tem catálogo grande e precisa de busca rápida |
| Upload | Supabase Storage / Cloudinary | Cloudinary se precisa de transformação de imagens |

### Dashboard / Painel interno

Tipo: app para visualizar dados, relatórios, métricas internas.

| Decisão | Recomendação padrão | Notas |
|---------|---------------------|-------|
| Front | Next.js + Recharts | Recharts para gráficos, Tremor para dashboards prontos |
| Back | Next.js API Routes | - |
| Banco | Supabase | Views e funções SQL para queries complexas |
| Auth | Supabase Auth | Só acesso interno, pode ser invite-only |
| Hospedagem | Vercel | - |

### App Mobile

Tipo: app para celular (iOS e/ou Android).

| Decisão | Recomendação padrão | Alternativa | Quando usar alternativa |
|---------|---------------------|-------------|------------------------|
| Framework | React Native + Expo | Flutter | Se precisa de animações mais complexas |
| Navegação | Expo Router | React Navigation | Se precisa de controle fino sobre nav |
| Back | Supabase | Firebase | Se já usa ecossistema Google |
| Auth | Supabase Auth | Firebase Auth | Se usa Firebase como back |
| Push notifications | Expo Notifications | OneSignal | Se precisa de segmentação avançada |

## Libs comuns por problema

Independente do tipo de projeto, estes problemas aparecem frequentemente:

| Problema | Lib recomendada | Por quê |
|----------|----------------|---------|
| Editor de texto rico | TipTap | Extensível, boa API, baseado em ProseMirror |
| Upload de arquivos | UploadThing / Supabase Storage | Simple de integrar, gerencia storage |
| Envio de email | Resend + React Email | API moderna, templates em React |
| Pagamentos (global) | Stripe | Padrão da indústria, docs excelentes |
| Pagamentos (Brasil) | Mercado Pago / Stripe | Stripe se precisa de cartão, MP se precisa de Pix |
| Validação de forms | Zod + React Hook Form | Type-safe, performático |
| Estado global | Zustand | Simples, sem boilerplate |
| Drag and drop | dnd-kit | Moderno, acessível, performático |
| Data tables | TanStack Table | Headless, flexível, paginação/sort/filter |
| Animações | Framer Motion | API declarativa, boa com React |
| Geração de PDF | React-PDF / jsPDF | React-PDF para exibir, jsPDF para gerar |
| Markdown | React Markdown / MDX | Depende se precisa de componentes dentro do MD |
| Rate limiting | Upstash Rate Limit | Serverless-friendly, Redis-based |
| Cron / Jobs | Inngest / Trigger.dev | Para background jobs em serverless |

## Regras de decisão

1. **Na dúvida, vai de Next.js + Supabase + Vercel**: essa combo tem a maior quantidade de docs, exemplos e comunidade. A AI performa melhor com ela.

2. **Lib madura > lib nova**: prefira libs com 1+ ano, 5k+ stars no GitHub, e docs boas. Libs novas podem ser melhores, mas a AI tem menos exemplos para gerar código correto.

3. **Menos tecnologias = melhor**: cada tecnologia adicional é mais um ponto de falha. Se o Supabase resolve auth, banco e storage, não adicione Firebase só para push notifications.

4. **O usuário não precisa saber os detalhes**: ao apresentar a stack, explicar em 1 frase o que cada tecnologia faz e por que ela foi escolhida. Sem jargão desnecessário.
