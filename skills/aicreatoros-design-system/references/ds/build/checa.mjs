#!/usr/bin/env node
// Roda kit-v9/checa.js numa página e lista os achados de alinhamento e regras visuais.
// Uso: node build/checa.mjs <arquivo.html|url> [--w 1920 --h 1080] [--mobile] [--escuro] [--root pasta] [--json saida.json]
// Larguras de conferência: 1920 (padrão), 1440 (--w 1440 --h 900) e 390 (--mobile).
// Playwright: PLAYWRIGHT_DIR=<pasta com node_modules/playwright> quando definido; senão usa o instalado no projeto; sem ele, baixa playwright@1.62.1 pelo npx. Chrome: AGENT_BROWSER_EXECUTABLE_PATH
// (ou CHROME_PATH) quando definido, senão o Chromium do próprio Playwright.
// --escuro: abre a página no tema escuro (grava aios-tema=dark antes do carregamento, como o botão de tema).
// Saída: 0 sem achados, 1 com achados, 2 erro de ambiente/uso.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const DS = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CHECA = path.join(DS, 'kit-v9', 'checa.js');
const PW_VERSAO = '1.62.1';
const CHROME = process.env.AGENT_BROWSER_EXECUTABLE_PATH || process.env.CHROME_PATH || undefined;

const args = process.argv.slice(2);
const opt = { w: 1920, h: 1080, mobile: false, escuro: false, root: null, json: null, alvo: null };
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === '--w') opt.w = +args[++i];
  else if (a === '--h') opt.h = +args[++i];
  else if (a === '--mobile') opt.mobile = true;
  else if (a === '--escuro') opt.escuro = true;
  else if (a === '--root') opt.root = path.resolve(args[++i]);
  else if (a === '--json') opt.json = path.resolve(args[++i]);
  else if (!opt.alvo) opt.alvo = a;
}
if (!opt.alvo) {
  console.error('Uso: node build/checa.mjs <arquivo.html|url> [--w 1920 --h 1080] [--mobile] [--escuro] [--root pasta] [--json saida.json]');
  process.exit(2);
}
if (opt.mobile) { opt.w = 390; opt.h = 844; }

// Reserva: pacote do cache do npx, achado pelo binário que o `npx -p` põe no PATH.
function playwrightDoNpx() {
  const bin = execFileSync('npx', ['-y', '-p', `playwright@${PW_VERSAO}`, 'sh', '-c', 'command -v playwright'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  return path.dirname(fs.realpathSync(bin));
}

let pw;
const PW_DIR = process.env.PLAYWRIGHT_DIR; // pasta de projeto com node_modules/playwright
if (PW_DIR) { try { pw = await import(pathToFileURL(path.join(path.resolve(PW_DIR), 'node_modules', 'playwright', 'index.mjs')).href); } catch {} }
if (!pw) try { pw = await import('playwright'); } catch {
  try { pw = await import(pathToFileURL(path.join(playwrightDoNpx(), 'index.mjs')).href); } catch {
    console.error(`Playwright não encontrado. Instale com:\n  npm i -D playwright@${PW_VERSAO}` + (CHROME ? '' : ` && npx playwright@${PW_VERSAO} install chromium`));
    process.exit(2);
  }
}
const chromium = pw.chromium || pw.default?.chromium;

const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif', '.avif': 'image/avif', '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.otf': 'font/otf', '.mp4': 'video/mp4', '.webm': 'video/webm', '.txt': 'text/plain; charset=utf-8' };

let servidor = null, url = opt.alvo;
if (!/^https?:\/\//.test(opt.alvo)) {
  const arq = path.resolve(opt.alvo);
  if (!fs.existsSync(arq)) { console.error('Arquivo não encontrado: ' + arq); process.exit(2); }
  // raiz: --root, senão a pasta acima que tem styles.css (modelos/*.html usa ../styles.css), senão a pasta do arquivo
  let raiz = opt.root;
  for (let d = path.dirname(arq); !raiz && d !== path.dirname(d); d = path.dirname(d)) if (fs.existsSync(path.join(d, 'styles.css'))) raiz = d;
  raiz ||= path.dirname(arq);
  const rel = path.relative(raiz, arq);
  if (rel.startsWith('..')) { console.error('--root precisa conter o arquivo'); process.exit(2); }
  servidor = http.createServer((req, res) => {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let f = path.join(raiz, p);
    if (!f.startsWith(raiz)) { res.writeHead(403); return res.end(); }
    if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
    fs.readFile(f, (err, buf) => {
      if (err) { res.writeHead(404); return res.end(); }
      res.writeHead(200, { 'content-type': MIME[path.extname(f).toLowerCase()] || 'application/octet-stream' });
      res.end(buf);
    });
  });
  await new Promise(r => servidor.listen(0, '127.0.0.1', r));
  url = `http://127.0.0.1:${servidor.address().port}/` + rel.split(path.sep).map(encodeURIComponent).join('/');
}

let browser, codigo = 2;
try {
  browser = await chromium.launch(CHROME ? { executablePath: CHROME } : {});
  const ctx = await browser.newContext({
    viewport: { width: opt.w, height: opt.h },
    deviceScaleFactor: 1,
    isMobile: opt.mobile, hasTouch: opt.mobile,
    reducedMotion: 'reduce',
  });
  if (opt.escuro) await ctx.addInitScript(() => { try { localStorage.setItem('aios-tema', 'dark'); } catch {} });
  const page = await ctx.newPage();
  const erros = [];
  page.on('pageerror', e => erros.push(e.message));
  const faltando = []; // CSS, JS ou fonte local que não carregou invalida a checagem
  page.on('response', r => { if (r.status() >= 400 && r.url().startsWith(url.slice(0, url.indexOf('/', 8)))) faltando.push(r.status() + ' ' + decodeURIComponent(new URL(r.url()).pathname)); });
  const t0 = Date.now();
  await page.goto(url, { waitUntil: 'load', timeout: 30000 });
  if (opt.escuro) await page.evaluate(() => { document.documentElement.dataset.theme = 'dark'; });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  if (faltando.length) throw new Error('arquivo da página não carregou (' + faltando.slice(0, 4).join(', ') + '); use --root com a pasta que contém os caminhos relativos');
  await page.addScriptTag({ path: CHECA });
  const res = await page.evaluate(() => window.checaAlinhamento({ silencioso: true }));
  const total = res.achados.length;

  console.log(`checa: ${opt.alvo} @ ${opt.w}×${opt.h}${opt.mobile ? ' mobile' : ''}${opt.escuro ? ' escuro' : ''} · ${total} achado(s) · checagem ${res.ms} ms · total ${Date.now() - t0} ms`);
  if (erros.length) console.log('  erros JS da página: ' + erros.slice(0, 3).join(' | '));
  const grupos = {};
  for (const a of res.achados) (grupos[a.tipo] ||= []).push(a);
  for (const [tipo, lst] of Object.entries(grupos)) {
    console.log(`\n${tipo} (${lst.length})`);
    for (const a of lst.slice(0, 8)) console.log(`  ${a.onde}${a.texto ? ' · "' + a.texto + '"' : ''} · ${a.detalhe}${a.px ? ' · ' + a.px + 'px' : ''}`);
    if (lst.length > 8) console.log(`  … mais ${lst.length - 8}`);
  }
  if (opt.json) fs.writeFileSync(opt.json, JSON.stringify({ alvo: opt.alvo, viewport: [opt.w, opt.h], mobile: opt.mobile, escuro: opt.escuro, ...res }, null, 2));
  codigo = total ? 1 : 0;
} catch (e) {
  console.error('checa falhou: ' + (e && e.message || e));
  codigo = 2;
} finally {
  if (browser) await browser.close();
  if (servidor) servidor.close();
}
process.exit(codigo);
