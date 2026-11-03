# Mapa do sistema: ADAPTA-LPS/campaigns

Fonte: `origin/main` em 07/10/2026 (commit `172e162`). Antes de confiar num caminho ou comando daqui, conferir que ainda existe no repo.

## Por que existe

O Framer cobrou US$ 140 mil/ano pela banda do `lp.adapta.org`. As LPs foram recriadas em código, mesmas URLs.
Hospedagem: Cloudflare Workers (decidido em 06/10; a Vercel saiu do código).
Domínio do site novo: `exclusivo.adapta.org`. O DNS do `lp.adapta.org` ainda aponta para o Framer, que também é o `FALLBACK_ORIGIN` (caminho que não existe no repo é servido de lá).
Pendências vivas e decisões do usuário: `HANDOFF.md` no repo.

## Pastas

| Caminho | O que tem | Alcance de uma edição |
|---|---|---|
| `src/content/lps/<caminho>.yaml` | Uma página por arquivo; caminho = URL | A página + variações que fazem `extends` dela |
| `src/content/offers/<nome>.yaml` | Oferta: checkout, webhook (nome), campos do lead | Toda página com essa oferta em `plans` (e as variações delas) |
| `src/components/blocks/<grupo>/<tipo>/` | Bloco: `<Tipo>.astro` + `schema.ts` | Toda página com `type: <tipo>` (contando herança: `footer` ~63, `thanks` ~41, `vsl` ~31) |
| `src/components/blocks/<grupo>/_pecas/`, `_campos.ts` | Peças comuns de um grupo (`base`, `inflection`, `upsell`, `medicos-maestro`) | Todos os blocos do grupo **e** blocos de outros grupos que importam a peça |
| `src/components/blocks/*.gen.ts` | Registro gerado por `npm run blocos` | Nunca editar |
| `src/components/{ui,skins,lead,site}/` | Botão, container, popup, formulário de lead | Site inteiro |
| `src/layouts/LP.astro` | Layout de toda página (tracking, Vturb) | Site inteiro |
| `src/lib/` | Merge de variação (`lp-merge.ts`), leitura das LPs (`lps.ts`), webhooks, skins | Site inteiro |
| `src/data/` | Planos, modelos, ferramentas, depoimentos usados por blocos | Toda página cujo bloco lê o arquivo |
| `src/config/site.ts` | GTM `GTM-W895R3M`, Clarity, Humblytics | Site inteiro; teste exige os três em toda LP |
| `src/content.config.ts` | Schema das collections `lps` e `offers` | Site inteiro (build barra YAML inválido) |
| `src/pages/[...slug].astro` | Rota única que gera todas as páginas | Site inteiro |
| `src/pages/api/lead.ts` | Recebe o lead e repassa ao webhook | Todo formulário de toda página |
| `src/worker.ts`, `wrangler.jsonc` | Worker da Cloudflare, fallback para o Framer, domínio | Site inteiro, inclusive páginas que ainda estão no Framer |
| `src/assets/` | Imagens (otimizadas no build) | Páginas que citam o arquivo; imagem padrão de bloco = todas |
| `scripts/` | Build, QA, compare, afetadas, check-secrets | Processo de build/CI |
| `.github/workflows/ci.yml` | Testes no PR, publicação no merge | Publicação de tudo |

Caminhos reservados (não usar como caminho de LP): `blocos`, `paginas`, `painel`, `design-system`, `api`, `health.txt` (`src/lib/lps.ts`).

## Página e variação

Página completa (exemplo `cariani/l3-v2-cut-nw.yaml`): `title`, `description`, `noindex`, `vturb`, `plans` (plano → oferta), `sections` (lista de `type: <bloco>` + campos do bloco).

Variação (exemplo `clube-das-ias/l4-c-vslnew-cl2-pt.yaml`):
```yaml
extends: clube-das-ias/l4-c-vslnew-cl2
plans: { gold: clube-das-ias-pt }
patch:
  heroHub:
    cta: { href: "#offer" }
```
- `patch` muda campos de uma seção pelo `type`. Lista dentro do `patch` substitui a lista inteira.
- `remove`, `move`, `add` tiram, reordenam ou incluem seções.
- Variação de variação existe: o alcance de uma base é recursivo.
- Mudou mais da metade da página: vira página nova (skill `nova-lp` do repo).

Regras do schema: página com `vsl` exige `vturb` e vice-versa; todo `popup`/`plan` citado precisa estar em `plans`.

## Comandos

| Para | Comando |
|---|---|
| Dev (lead em teste) | `LEAD_DRY_RUN=1 npx astro dev --background --port 4321` |
| Dev pronto? | `curl http://localhost:4321/_astro/status` → `{"ok": true}` |
| Parar dev | `npx astro dev stop` |
| Tipos, worker, segredos no código | `npm run check` |
| Testes de páginas | `LP=<p1>,<p2> npm test` (sem `LP` = ~1h30, 1.920 testes) |
| QA visual 390/1440 no build | `LP=<página> npm run qa` (faz build) · `-- --no-build` reaproveita |
| Checkouts, Vturb, links internos existem | `npm run backup` (precisa de build e internet) |
| Páginas afetadas pelo que está commitado | `node scripts/afetadas.mjs origin/main` |
| HTML idêntico entre dois builds | `npm run compare -- <pasta-antes>` |
| Bloco novo | `npm run novo-bloco -- <campanha> <nome>` |
| Regerar registro de blocos | `npm run blocos` |
| Mapa de webhooks (só nomes) | `npm run webhooks` |
| Catálogo de blocos / guia de páginas | `/blocos`, `/paginas` no dev |

Proibidos para o agente: `npm run deploy`, `npm run previa`, `npm run novo-webhook` (grava segredo na Cloudflare), `npm run test:update`.

## CI (`.github/workflows/ci.yml`)

PR (não rascunho; mudança só em `.md`, `docs/`, `.claude/`, `.vscode/` não roda):
1. `planejar`: `afetadas.mjs` decide `nada`, `paginas` (lista) ou `tudo`.
2. `testes`: build, `check-secrets`, Playwright mobile e desktop, `qa`. Mais de 8 páginas: 3 máquinas.
3. Check agregado **"CI ok"**: é o que precisa estar verde.

Push no `main` (inclui merge de PR):
- Job **"publicar na Cloudflare"**: build de produção (`DEPLOY_ENV=production`, lead real liga aqui), `check-secrets`, `wrangler deploy`.
- Não roda Playwright nem QA. Por isso push direto no `main` publica sem teste, e o `main` não tem proteção (GitHub Free).
- Sem `CLOUDFLARE_API_TOKEN`, o job só emite o aviso "não publicou" e termina verde.

## Pontos cegos conhecidos

- **Import entre grupos:** `afetadas.mjs` deduz o grupo de `_pecas` pela pasta. `upsell/iconCards/IconCards.astro` importa `inflection/_pecas/Head.astro`; mudar o `Head` testa só páginas com blocos de `inflection`. Ao mexer em `_pecas`, procurar importadores com `rg`.
- **Sem snapshot visual:** os testes não comparam imagem. Mudança de visual que não quebra layout passa no CI. A conferência em 390 e 1440 é do agente.
- **`afetadas.mjs` lê só commits** (`origin/main...HEAD`): mudança não commitada não aparece.
- **Docs do repo desatualizados em pontos:** `CLAUDE.md` diz que Inflection, Imersão CEOs e Bolsa Médicos usam `look: framer`, mas nenhum YAML dessas campanhas declara isso. Conferir no YAML, não na doc.
- **`compare` com cópia velha:** `cp -R dist/client /tmp/antes` com `/tmp/antes` existente copia para dentro dela. Limpar o destino antes; copiar só `*.html`, `*.css`, `*.js` com rsync.

## Fluxo do lead

Formulário (popup ou na página) → `POST /api/lead` → valida campos da oferta, junta UTM/`gclid`/`fbclid` → webhook `WEBHOOK_<NOME>` (segredo do Worker) → n8n.
Em teste: `LEAD_DRY_RUN=1` e `go.adapta.org` interceptado. Lead real só sai do build de produção.
Checkout: campo `checkout` da oferta (`https://go.adapta.org/checkout/<slug>` ou caminho interno); `forwardParams` repassa UTM para o checkout.
