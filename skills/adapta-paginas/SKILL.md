---
name: adapta-paginas
description: 'Regras para mexer nas páginas de campanha da Adapta (repo ADAPTA-LPS/campaigns, exclusivo.adapta.org): sistema, alcance de cada edição, conferência, travas de publicação e erros proibidos. Usar quando o Kelvi pedir para criar, alterar, conferir, subir ou publicar uma LP, oferta, bloco ou formulário do repo campaigns, ou perguntar algo sobre essas páginas (link da VSL, qual oferta, quem usa um bloco). Não usar para páginas que ainda estão no Framer (lp.adapta.org), nem para e-mail, WhatsApp ou Guru (usar copilot-adapta).'
---

# adapta-paginas

Este repo é a estrutura digital de vendas da Adapta.
São ~85 páginas de campanha com tráfego pago rodando, checkout e captura de lead.
Página quebrada no ar = anúncio pagando por clique numa página que não vende, lead perdido, checkout errado.
Por isso: cuidado acima de velocidade, edição pontual acima de solução elegante.

## O repo

- GitHub: https://github.com/ADAPTA-LPS/campaigns
- Clone deste assistente: `work/campaigns` no workspace do pod (`gh repo clone ADAPTA-LPS/campaigns work/campaigns`, depois `npm ci`). Cada assistente do Maestro tem o próprio pod, então o clone é só dele.
- Uma branch tem um dono: o assistente que criou (Adapta Páginas ou Adapta Bot). Não mexer, commitar nem fazer merge em branch do outro; se precisar, perguntar ao Kelvi.
- No ar: `https://exclusivo.adapta.org` (Cloudflare Workers, Worker `adapta-lps`). `lp.adapta.org` ainda é o Framer; caminho que não existe no repo é servido de lá.
- Publica sozinho: merge no `main` dispara o job "publicar na Cloudflare" (~6 min). Não existe "salvar sem publicar" no `main`.

## Como funciona (resumo)

- Astro 7 estático. Cada página é um YAML em `src/content/lps/<caminho>.yaml`; o caminho do arquivo é a URL.
- Página completa lista `sections` com `type: <bloco>`. Variação (`extends: <base>`) herda tudo da base e muda só o que estiver em `patch`, `remove`, `move`, `add`.
- Bloco = pasta `src/components/blocks/<grupo>/<tipo>/` com `<Tipo>.astro` + `schema.ts`. Um bloco serve a todas as páginas que usam aquele `type`.
- Oferta (checkout, webhook pelo nome, campos do lead) = `src/content/offers/<nome>.yaml`, referenciada em `plans:` das páginas. Uma oferta pode servir várias páginas.
- Lead vai para `/api/lead` (`src/pages/api/lead.ts`), que repassa ao webhook guardado como segredo do Worker. Em teste, `LEAD_DRY_RUN=1`.
- VSL é Vturb: `vturb` no YAML; o que vem depois da seção `vsl` fica escondido até `vturb.seconds`.
- Pedido de link para ver a VSL no Vturb: responder `https://app.vturb.com/players/<vturb.player>`, com o `player` do YAML da página (ou da base no `extends`, se a variação não tiver um próprio). Não mandar o `player.js` nem o `.m3u8`.
- CI no PR testa só as páginas afetadas (`scripts/afetadas.mjs`) e dá o check "CI ok".

Mapa completo de pastas, comandos, CI e quem depende de quem: [references/sistema.md](references/sistema.md). Ler antes da primeira edição da sessão.

Receitas detalhadas ficam nas skills do próprio repo (`.claude/skills/`, dentro de `work/campaigns`): `nova-lp` (criar/alterar), `qa-lp` (conferir), `publicar-lp` (PR, deploy, desfazer), `consultar-lps` (perguntas). Usar como manual. Onde contradizerem esta skill, vale esta.

## 0. Dúvida: parar e confirmar

Dúvida = parar antes do próximo passo e perguntar ao Kelvi. Nunca seguir com a interpretação "mais provável" por conta própria.

Conta como dúvida:
- Pedido com mais de uma leitura possível (qual página, qual seção, qual texto, qual variação).
- Falta texto, valor, link, imagem ou oferta exata.
- Alcance incerto: não dá para afirmar que a mudança fica só na página pedida.
- Resultado inesperado: teste falhou, página mudou onde não devia, CI vermelho, estado do git estranho, comando com erro.
- Passo que esta skill não prevê, ou regra do repo que contradiz o pedido.

Como perguntar, numa mensagem curta:
```
❓ DÚVIDA antes de seguir
O que já sei: <fato>
O que não sei: <a dúvida concreta>
Opções: 1) <opção> (recomendada, porque <motivo>)  2) <opção>
Qual sigo?
```
Uma dúvida por vez. Enquanto não houver resposta, nada é editado, commitado ou publicado. O que já estava feito fica como está, sem desfazer por conta própria.

## 1. Abertura (toda vez que for chamada)

Primeira resposta, antes de qualquer edição:
1. Repo e clone deste assistente (acima).
2. Estado do git:
   ```bash
   git -C work/campaigns fetch -q
   git -C work/campaigns status -sb
   git -C work/campaigns rev-list --left-right --count HEAD...origin/main
   ```
3. Reportar: branch atual, commits à frente/atrás do `main`, arquivos modificados, merge/rebase em andamento.

Trava: merge ou rebase em andamento (`UU`, `MERGE_HEAD`), mudanças que não são desta sessão, ou branch de outro assunto → não editar. Mostrar o estado e perguntar. Pode haver outra sessão deste assistente trabalhando na mesma pasta.

## 2. Edição pontual primeiro

- Uma página, uma mudança, o menor número de arquivos.
- Mudança numa variação vai no `patch` dela, nunca na base.
- Preferir mudar o YAML da página a mudar bloco, oferta ou código.
- Nada de refatorar, "aproveitar para melhorar", criar abstração ou mexer em arquivo vizinho.
- Pedido grande ou que mexe em muitas coisas: parar, dividir em passos pontuais, mostrar a lista e fazer um por vez, cada um conferido antes do próximo.
- Copy, preço, bônus, link, checkout e ordem das seções só mudam com pedido explícito e com o texto/valor exato que o Kelvi mandou. Faltou dado: perguntar, não inventar.

## 3. Alcance: classificar antes de editar

| Nível | O que é | Exemplos |
|---|---|---|
| **A. Só a página** | Mudança que só aparece na página pedida | `patch` de uma variação; YAML de página sem variações que herdem o trecho mexido; imagem nova usada só por ela |
| **B. Outras páginas** | Arquivo de conteúdo compartilhado | YAML de página base com variações; oferta em `plans` de mais de uma página; `schema.ts`/`.astro` de bloco; `_pecas`/`_campos` de grupo; imagem citada por várias páginas |
| **C. Sistema** | Código que vale para o site inteiro | `src/layouts/`, `src/lib/`, `src/data/`, `src/components/{ui,skins,lead,site}/`, `src/styles/`, `src/config/`, `scripts/`, `src/worker.ts`, `src/pages/api/lead.ts`, `src/content.config.ts`, `astro.config.mjs`, `wrangler.jsonc`, `package.json`, `.github/` |

Como medir o alcance antes de editar (detalhes em `references/sistema.md`):
- Variações de uma base: `rg -l "extends: <caminho-da-base>" src/content/lps` (repetir para variação de variação).
- Quem usa uma oferta: `rg -l "<nome-da-oferta>" src/content/lps`.
- Quem usa um bloco: `rg -l "type: <tipo>\b" src/content/lps` + as variações dessas páginas.
- Peça importada por outro grupo: `rg -l "<grupo>/_pecas/<Peca>" src/components` (o `afetadas.mjs` não pega import entre grupos, ex.: `upsell/iconCards` usa `inflection/_pecas/Head.astro`).
- Depois do commit, conferir com `node scripts/afetadas.mjs origin/main` (lê só o que está commitado).

Na dúvida entre dois níveis, tratar como o mais alto.

## 4. Aviso de alcance (nível B ou C)

Antes de editar, parar e mostrar exatamente neste formato:

```
⚠️ ALCANCE: esta mudança mexe em N páginas além de <página pedida>
Arquivo compartilhado: <arquivo>
Páginas afetadas: <lista completa, ou contagem + as 5 mais importantes e "ver lista">
O que pode quebrar: <concreto: checkout errado em X, seção some em Y, formulário não envia>
Alternativa só na página: <como fazer via patch/oferta nova/variação, ou "não existe">
Sigo com a edição compartilhada ou faço a alternativa?
```

Sem resposta clara, não edita.
Nível C só com pedido explícito do Kelvi depois desse aviso; por padrão, propor a alternativa pontual.
Oferta compartilhada que precisa mudar só para uma página: criar oferta nova para ela, não editar a compartilhada.

## 5. Conferência por tipo de mudança

| Mudança | Prova antes de pedir para publicar |
|---|---|
| Texto, nome, link, imagem numa página (A) | Dev server + conferir a página (curl ou `agent-browser`). Sem build, sem cópia de `dist`, sem `compare` |
| Estrutura de uma página (A): seção, patch, oferta própria, formulário | Dev + página em 390 e 1440 + `npm run check` + `LP=<página> npm test` |
| Outras páginas (B) | Tudo acima em **cada** página afetada: `LP=<p1>,<p2>,... npm test` e cada uma aberta em 390 e 1440 |
| Sistema (C) | B + `npm run compare` provando HTML idêntico nas páginas que não deviam mudar |

Regras da conferência:
- Página em 390 e 1440 (sem VSL): `agent-browser` no dev, com screenshot em largura mobile (390) e desktop (1440), e olhar as duas imagens.
- Dev sempre com lead em teste: `LEAD_DRY_RUN=1 npx astro dev --background --port 4321`; pronto quando `curl http://localhost:4321/_astro/status` responde `{"ok": true}`.
- Mudou `schema.ts`: `npm run blocos`, `npx astro dev stop`, `rm -f .astro/data-store.json`, subir de novo.
- `npm test` sem `LP=` leva ~1h30. Sempre com `LP=`.
- `compare`: o "antes" sai de um worktree do `origin/main`; copiar só HTML/CSS/JS com rsync para uma pasta limpa (`rm -rf` antes). Nunca `cp -R dist/client` inteiro (~3.700 imagens, já travou 17 min).
- Página com VSL: áudio sempre mudo (bloco abaixo).
- Teste reprovado ou página com diferença inesperada = parar e reportar. Não "ajustar o teste".

### Página com VSL: áudio sempre mudo

VSL tocando com som durante a conferência é falha.

**O mudo vale só para o navegador do agente, na conferência.** A VSL que vai ao ar continua com som para quem assiste.
- Bloqueio do Vturb e player falso rodam só na conferência, nunca entram no código da página.
- Proibido mexer em som para "resolver" o áudio: `muted`, `volume`, autoplay ou atributo do player em YAML, `Vsl.astro`, `LP.astro`, `schema.ts` ou qualquer arquivo commitado.
- Diff com mudança de som da VSL que o Kelvi não pediu: desfazer antes do commit.

- Texto, link, preço ou checkout em página de VSL: conferir com `curl` + `rg`, sem abrir navegador.
- Visual de página com VSL: nunca no `agent-browser` nem na VSL real. Script de mudo não segura o Vturb: em 08/10/2026 o som tocou 2x (reload do dev apagou o script; autoplay com som lembrado pela origem, vídeo em shadowRoot fechado).
- Conferência visual só pelo Playwright do repo com o Vturb bloqueado e player falso: `chromium.launch({ args: ["--mute-audio"] })` (com `executablePath` do Chrome do pod quando houver) + `fakeVturb` e `unlock` copiados de `tests/lp.spec.ts` (abortam `/converteai|vturb\.com/` e definem `vturb-smartplayer` falso), ou `LP=<página> npm test`.
- Confirmar na lista de requests que nada de `converteai`/`vturb.com` carregou. Carregou: fechar na hora e avisar.
- Saiu som: fechar a aba na hora e avisar.
- `npm test`/`npm run qa` do repo: não mexer na config deles. Se o Kelvi relatar áudio vindo dos testes, parar e avisar.

## 6. Subir pro git: sequência fixa

Pedido "sobe pro git", "publica", "manda pro ar" = esta sequência, nesta ordem, sem pular passo.
Publicar = merge no `main`. Só com pedido explícito.

**Nível A**: o pedido do Kelvi autoriza a sequência inteira, desde que a prova da seção 5 já esteja feita.
**Nível B ou C**: a sequência para em duas confirmações, em mensagens separadas (passos 1 e 4).

### 1. Commit e push
Branch sempre a partir do `main` atualizado, um assunto por branch:
```bash
git fetch -q && git switch -c lp/<pagina>-<o-que-mudou> origin/main
git add <arquivos da mudança>          # nunca git add -A
git commit -m "<página>: <o que mudou, em português>"
git push -u origin HEAD
```
B ou C, antes do push: mostrar o aviso de alcance de novo, a lista de páginas afetadas, a prova de cada uma (seção 5) e o diff. Perguntar: **"Confirmação 1 de 2: posso subir a branch e abrir o PR?"**

### 2. PR na `main`
```bash
gh pr create --repo ADAPTA-LPS/campaigns --base main --title "<página>: <o que mudou>" --body "<o que mudou, páginas afetadas, prova>"
```
Mandar o link do PR ao Kelvi. PR pronto, não rascunho (rascunho não roda o CI).

### 3. Esperar o CI em blocos de até 60 s
```bash
timeout 60 gh pr checks <n> --repo ADAPTA-LPS/campaigns --watch --interval 15
```
- Exit 124 = ainda rodando: dar uma linha de estado (rodando, quantas máquinas, o que já passou) e rodar o próximo bloco. Sem mudança: só a linha, sem outra ação.
- "CI ok" verde: avisar o Kelvi com link do PR e "CI ok" verde. Só então seguir ao passo 4.
- Vermelho: parar a espera, ler o log da falha (`gh run view <id> --log-failed`), reportar local, causa e correção proposta. Não fazer merge, não reabrir o CI no escuro, não mexer no teste para passar.
- A espera acaba no resultado. Se a sessão mudar de assunto, parar de esperar e dizer ao Kelvi em que estado o CI ficou.

### 4. Merge na `main`
B ou C, antes do merge: mostrar link do PR, commit, "CI ok" verde, quantas páginas mudam no ar e que o merge publica em ~6 min. Perguntar: **"Confirmação 2 de 2: posso fazer o merge e publicar estas N páginas?"**
```bash
gh pr merge <n> --repo ADAPTA-LPS/campaigns --merge
```
Nunca com CI vermelho ou rodando.

Contam como confirmação só respostas do Kelvi depois da pergunta, sobre aquela pergunta. Ok dado antes da prova não vale. Qualquer mudança depois de uma confirmação zera a contagem.

### 5. Conferir as páginas no ar em `exclusivo.adapta.org`
Esperar o job "publicar na Cloudflare" terminar (~6 min), em blocos de até 60 s (`timeout 60 gh run watch <id> --repo ADAPTA-LPS/campaigns --exit-status`; exit 124 = rodando):
```bash
gh run list --repo ADAPTA-LPS/campaigns --branch main --workflow ci.yml -L 1
gh run view <id> --repo ADAPTA-LPS/campaigns --log | rg "não publicou"
```
- Job verde com o aviso "não publicou" = não foi ao ar. Parar e reportar.
- Job verde sem o aviso: abrir cada página mexida (e, em B ou C, cada página afetada) em `https://exclusivo.adapta.org/<caminho>`.
- Texto, link, preço ou checkout: `curl -s https://exclusivo.adapta.org/<caminho> | rg "<trecho novo>"` e confirmar que o antigo sumiu.
- Visual, seção, formulário, VSL: `agent-browser` em 390 e 1440; página de VSL só por Playwright com Vturb bloqueado e player falso (seção 5); formulário sem enviar lead real.
- Página nova ou com conteúdo antigo: cache ou fallback do Framer. Reconferir uma vez após 2 minutos; persistindo, reportar.
- Relatório: `Verificado: <página> no ar com <o que mudou>.` por página, ou `Falhou:` com o que apareceu.

Desfazer: `git revert` do merge por um novo PR, com a mesma sequência e as mesmas travas. Nunca reescrever o `main`.

## 7. Erros proibidos

Git e publicação
- Push direto no `main` (publica sem rodar nenhum teste).
- `npm run deploy` ou `npm run previa` da máquina local (pod do Maestro inclusive).
- Merge com CI vermelho ou rodando; force push; reescrever histórico.
- `git stash`; `git switch -c` a partir de branch de outro assunto; misturar assuntos num PR.
- Commitar `.env*`, `dist/`, `qa-report/`, `.astro/`.

Conteúdo
- Mudar copy, preço, bônus, link, checkout ou ordem sem pedido. Texto do Framer entra exato, erros de digitação inclusive.
- Editar a base quando o pedido é numa variação.
- Editar oferta compartilhada para mudar uma página só.

Código e marca
- Editar `*.gen.ts` à mão (são gerados por `npm run blocos`).
- Bloco novo fora de `npm run novo-bloco -- <campanha> <nome>`; página nova como arquivo em `src/pages/`.
- Hex solto: só classes do design system (`turquoise-*`, `adaptive-*`, `--brand-*`). Fonte sempre Special Gothic Adapta.
- HTML inválido (`<div>` dentro de `<p>`, tag aberta): o Astro 7 não corrige.

Segredos e leads
- Lead real em teste: sempre `LEAD_DRY_RUN=1`.
- Imprimir `.env.local` ou URL de webhook; escrever "n8n" ou "webhook" em texto público (`check-secrets` reprova).

Ambiente
- `pkill -f playwright` ou matar processo que a sessão não abriu.
- Rodar dois Playwright em paralelo; usar `127.0.0.1` em vez de `localhost`.
- Abrir página de VSL no `agent-browser` ou com o Vturb real carregando.
- Deixar a VSL muda no código ou no YAML: o mudo é só da conferência local.
- Mexer em Framer, DNS, Vturb, segredos do Worker ou configurações do GitHub: fora do escopo desta skill; só com pedido explícito e separado.

## 8. Encerrar

- Parar o que a sessão abriu: `npx astro dev stop`, servidor do QA, aba do `agent-browser`, worktree de `compare` (`git worktree remove`), pasta temporária. O clone `work/campaigns` fica.
- Relatório final: o que mudou (arquivos), páginas afetadas, prova (`Verificado:`/`Não verificado:`/`Falhou:`), estado do PR/publicação e o que ficou pendente.

## No Maestro

- Precisa: conector GitHub ligado neste assistente com acesso a ADAPTA-LPS/campaigns, `gh` autenticado no pod (`gh auth status`; o login é do Kelvi) e o clone `work/campaigns`.
- Shell, `git`, `node`/`npm` e Playwright no pod não foram confirmados na migração. Conferir na primeira sessão (`git --version`, `node -v`, `gh --version`). Sem eles, trabalhar só pelo conector GitHub: branch, commit e PR pelo conector, CI do PR como prova, e conferência visual pelo navegador na URL de preview; dizer ao Kelvi que dev server, `npm test` e `compare` locais ficaram de fora.
- Credenciais como variáveis do assistente, configuradas pelo Kelvi: `CLOUDFLARE_API_TOKEN`, `LEAD_DRY_RUN` e `WEBHOOK_<NOME>`; nunca imprimir o valor. Conferir só a existência (`test -n "$CLOUDFLARE_API_TOKEN" && echo ok`).
- `wrangler` só pelo `npx wrangler` do repo. Os comandos proibidos acima continuam proibidos.
- Playwright sem navegador: `npx playwright install chromium` (sem `--with-deps`, que pede sudo); se falhar, avisar o Kelvi.
- Faltou login, clone ou credencial: dizer ao Kelvi o nome do que falta e parar a parte que depende dele.
