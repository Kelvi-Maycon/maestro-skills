// Gera project/components/ a partir de build/: bundle.js, bundle.css, <Comp>/preview.html, <Comp>/README.md.
// Também monta build/harness/ para a verificação no Chrome. Uso: node build/make.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { KIT_CSS, parse, componentRules, render } from './css.mjs';

const B = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(B, '..', 'components');
const NS = 'AiCreatorOSDesignSystem_a9067e';
const DS = path.join(B, '..');
const TOKENS = path.join(B, 'tokens-publicado.css'); // tokens.css publicado, espelho de tokens/*.css (republicar junto)
const fail = m => { console.error('ERRO: ' + m); process.exit(1); };

// ── bundle.js ──────────────────────────────────────────
const src = fs.readFileSync(path.join(B, 'bundle.src.js'), 'utf8');
const icons = JSON.parse(fs.readFileSync(path.join(B, 'icons.json'), 'utf8'));
if (!src.includes('/*ICONS*/')) fail('placeholder ICONS ausente');
const apiBlock = src.match(/var api = \{([\s\S]*?)\};/);
if (!apiBlock) fail('bloco api não encontrado');
const names = [...apiBlock[1].matchAll(/(\w+):\s*(\w+)/g)].map(m => { if (m[1] !== m[2]) fail('api ' + m[1] + ' != ' + m[2]); return m[1]; });
const header = '/* @ds-bundle: ' + JSON.stringify({ format: 4, namespace: NS, components: names.map(name => ({ name })) }) + ' */';
const js = header + '\n' + src.replace('/*ICONS*/', JSON.stringify(icons));

// ── bundle.css ─────────────────────────────────────────
const ROOT = `:root{
--sans:"Instrument Sans",system-ui,sans-serif; /* @kind font */
--serif:"ITC Garamond Cond",Georgia,serif; /* @kind font */
--mono:"JetBrains Mono",ui-monospace,monospace; /* @kind font */
--font-ui:var(--sans);--font-editorial:var(--serif);--font-data:var(--mono);
--fs-mono:11px;--fs-meta:13px;--fs-ui:14px;--fs-control:14px;--fs-body:17px;--fs-lead:21px;
--fs-h3:30px;--fs-h2:40px;--fs-display:56px;--fs-num:44px; /* @kind other */
--lh-body:1.5;}`;
const kitCss = fs.readFileSync(KIT_CSS, 'utf8');
// Seletores de elemento da tabela do kit (table, thead, tbody, tfoot, tr, th, td) ficam presos a .tbl para não vazar na página;
// :where() não soma especificidade, então .num continua vencendo o text-align de th como no kit.
const TBL = ':where(.tbl) ';
const TABLE_EL = /^(?:(table|thead|tbody|tfoot|tr|th|td)\b|:is\((?:td|th)(?:,(?:td|th))*\))/;
// Vírgula de lista de seletores, fora de parênteses: ":is(td,th)" fica inteiro.
const splitSel = sel => {
  const out = [];
  let depth = 0, cur = '';
  for (const ch of sel) {
    if (ch === '(') depth++;
    else if (ch === ')') depth--;
    if (ch === ',' && !depth) { out.push(cur.trim()); cur = ''; } else cur += ch;
  }
  return out.concat(cur.trim());
};
const scopeTable = r => {
  if (r.keyframes) return r;
  const parts = splitSel(r.selector);
  if (!parts.some(s => TABLE_EL.test(s))) return r;
  const sel = parts.map(s => TABLE_EL.test(s) ? TBL + s : s).join(',');
  return { ...r, selector: sel, text: sel + r.text.slice(r.selector.length) };
};
const rules = componentRules(kitCss).map(scopeTable);
const KIT_MARK = '/* ── Componentes: regras de kit-v9/kit.css, texto exato (layout do documento do kit fica fora; seletores de elemento da tabela presos a :where(.tbl)) ── */';
const css = ROOT + '\n\n' + KIT_MARK + '\n' + render(rules) + '\n';

// ── previews e READMEs ─────────────────────────────────
function sections(file, re) {
  const txt = fs.readFileSync(path.join(B, file), 'utf8');
  const out = [];
  for (const chunk of txt.split(/^(?==== )/m)) {
    const m = chunk.match(re);
    if (!m) { if (chunk.trim()) fail(file + ': bloco sem cabeçalho'); continue; }
    out.push({ m, body: chunk.slice(m[0].length).trim() });
  }
  return out;
}
const previews = sections('previews.txt', /^=== (\w+) \| ([^|\n]+?) \| height=(\d+)(?: \| width=(\d+))?\n/).map(({ m, body }) =>
  ({ name: m[1], group: m[2].trim(), height: +m[3], width: m[4] ? +m[4] : null, body }));
const readmes = new Map(sections('readmes.md', /^=== (\w+)\n/).map(({ m, body }) => [m[1], body]));

const setEq = (a, b, what) => {
  const A = new Set(a), Bs = new Set(b);
  const miss = [...A].filter(x => !Bs.has(x)), extra = [...Bs].filter(x => !A.has(x));
  if (miss.length || extra.length) fail(what + ' faltando: ' + miss + ' sobrando: ' + extra);
};
setEq(names, previews.map(p => p.name), 'previews');
setEq(names, [...readmes.keys()], 'readmes');
const GROUPS = ['Ações', 'Campos', 'Feedback', 'Leitura', 'Dados', 'Produto', 'Marca'];
for (const p of previews) if (!GROUPS.includes(p.group)) fail('grupo inválido ' + p.group);

const imgDir = path.join(B, 'img');
const IMGS = Object.fromEntries(fs.readdirSync(imgDir).filter(f => f.endsWith('.webp')).map(f =>
  [f.replace(/\.webp$/, '').replace('-', ''), 'data:image/webp;base64,' + fs.readFileSync(path.join(imgDir, f)).toString('base64')]));

function previewHtml(p) {
  const used = [...new Set([...p.body.matchAll(/IMG\.(\w+)/g)].map(m => m[1]))];
  for (const k of used) if (!IMGS[k]) fail(p.name + ': imagem ' + k + ' não existe');
  const imgLine = used.length ? 'var IMG = {\n' + used.map(k => '  ' + k + ": '" + IMGS[k] + "'").join(',\n') + '\n};\n' : '';
  const marker = `<!-- @dsCard group="${p.group}" height=${p.height}${p.width ? ' width=' + p.width : ''} -->`;
  return `${marker}
<!doctype html>
<html lang="pt-BR">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${p.name}: preview</title></head>
<body>
<div id="root" style="padding:24px"></div>
<script>
var D = window.${NS}, h = React.createElement;
${imgLine}function render(node) { ReactDOM.createRoot(document.getElementById('root')).render(node); }
${p.body}
</script>
</body>
</html>
`;
}

// ── escrita ────────────────────────────────────────────
fs.mkdirSync(OUT, { recursive: true });
for (const d of fs.readdirSync(OUT)) {
  const full = path.join(OUT, d);
  if (fs.statSync(full).isDirectory() && d !== 'Cover' && !names.includes(d)) fs.rmSync(full, { recursive: true });
}
fs.writeFileSync(path.join(OUT, 'bundle.js'), js);
fs.writeFileSync(path.join(OUT, 'bundle.css'), css);
const htmlByName = {};
for (const p of previews) {
  const dir = path.join(OUT, p.name);
  fs.mkdirSync(dir, { recursive: true });
  const html = previewHtml(p);
  if (Buffer.byteLength(html) > 256 * 1024) fail(p.name + ': preview acima de 256 KB');
  htmlByName[p.name] = html;
  fs.writeFileSync(path.join(dir, 'preview.html'), html);
  fs.writeFileSync(path.join(dir, 'README.md'), '# ' + p.name + '\n\n' + readmes.get(p.name).trim() + '\n');
}

// ── verificações estáticas ─────────────────────────────
for (const bad of ['</script', '<!--', 'import ', 'eval(', 'new Function', 'fetch(']) {
  if (js.toLowerCase().includes(bad.toLowerCase())) fail('bundle.js contém ' + bad);
}
// Cada regra do bloco do kit existe literal no kit.css (o kit também já prende seletores a :where(.tbl)); o resto é o :root.
const kitPart = css.slice(css.indexOf(KIT_MARK) + KIT_MARK.length);
const kitPlain = kitCss.split(TBL).join('');
const notInKit = parse(kitPart).filter(r => !kitPlain.includes(r.text.split(TBL).join('')));
const scopedCount = rules.filter(r => !r.keyframes && r.selector.includes(TBL)).length;
const leaking = rules.filter(r => !r.keyframes && splitSel(r.selector).some(s => TABLE_EL.test(s)));
if (leaking.length) fail('seletor de elemento de tabela sem .tbl: ' + leaking.map(r => r.selector));
for (const [n, h] of Object.entries(htmlByName)) if (n !== 'Table' && /<table|h\('table'/.test(h)) fail(n + ' usa <table>');
if (/h\('table'/.test(js) && js.split("h('table'").length !== 2) fail('mais de um componente cria <table>');
if (notInKit.length) fail('regras fora do kit: ' + notInKit.map(r => r.selector).join(' | '));
// Toda var(--x) sem fallback (bundle.css, bundle.js, previews) existe no tokens.css publicado ou no :root do bundle.css.
const tokens = fs.readFileSync(TOKENS, 'utf8');
// Parâmetros que o componente escreve no style inline (--g da meta, --v das barras) também contam como definidos.
const defined = new Set([...(tokens + css).matchAll(/(--[\w-]+)\s*:/g), ...js.matchAll(/'(--[\w-]+)'\s*:/g)].map(m => m[1]));
const undefIn = txt => [...new Set([...txt.matchAll(/var\((--[\w-]+)(\s*,?)/g)].filter(m => !m[2].includes(',') && !defined.has(m[1])).map(m => m[1]))];
for (const [what, txt] of [['bundle.css', css], ['bundle.js', js], ...Object.entries(htmlByName)]) {
  const u = undefIn(txt);
  if (u.length) fail(what + ': variáveis sem definição no tokens.css publicado e sem fallback: ' + u);
}
for (const n of names) for (const f of ['preview.html', 'README.md']) if (!fs.existsSync(path.join(OUT, n, f))) fail(n + '/' + f);
if (names.includes('Cover')) fail('Cover no header');

// ── harness local (não faz parte da entrega) ───────────
const H = path.join(B, 'harness');
fs.mkdirSync(path.join(H, 'fonts'), { recursive: true });
for (const f of fs.readdirSync(path.join(DS, 'assets', 'fonts'))) fs.copyFileSync(path.join(DS, 'assets', 'fonts', f), path.join(H, 'fonts', f));
fs.writeFileSync(path.join(H, 'tokens.css'), tokens);
fs.copyFileSync(path.join(OUT, 'bundle.css'), path.join(H, 'bundle.css'));
fs.copyFileSync(path.join(OUT, 'bundle.js'), path.join(H, 'bundle.js'));
const PRE = `<script>window.__errs=[];window.addEventListener('error',function(e){__errs.push('error: '+(e.message||(e.target&&(e.target.src||e.target.href))))},true);window.addEventListener('unhandledrejection',function(e){__errs.push('rejection: '+e.reason)});(function(){var ce=console.error,cw=console.warn;console.error=function(){__errs.push('console.error: '+[].map.call(arguments,String).join(' '));return ce.apply(console,arguments)};console.warn=function(){__errs.push('console.warn: '+[].map.call(arguments,String).join(' '));return cw.apply(console,arguments)}})();</script>
<link rel="stylesheet" href="tokens.css"><link rel="stylesheet" href="bundle.css">
<script src="https://cdn.jsdelivr.net/npm/react@18.3.1/umd/react.production.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/react-dom@18.3.1/umd/react-dom.production.min.js"></script>
<script src="bundle.js"></script>`;
const frame = html => {
  const body = html.slice(html.indexOf('\n') + 1).replace('<html', '<html data-theme="default"');
  if (!body.includes('<head>')) fail('preview sem <head>');
  return body.replace('<head>', '<head>\n' + PRE);
};
const all = [...previews.map(p => ({ name: p.name, width: p.width, height: p.height, html: htmlByName[p.name] }))];
const coverPath = path.join(OUT, 'Cover', 'preview.html');
if (fs.existsSync(coverPath)) {
  const c = fs.readFileSync(coverPath, 'utf8');
  const m = c.split('\n')[0].match(/height=(\d+)/);
  all.push({ name: 'Cover', width: 960, height: m ? +m[1] : 320, html: c });
}
for (const a of all) fs.writeFileSync(path.join(H, a.name + '.html'), frame(a.html));
const list = all.map(a => ({ name: a.name, width: a.width || 760, height: a.height }));
fs.writeFileSync(path.join(H, 'index.html'), `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>harness</title>
<style>body{margin:0;padding:16px;background:#ddd;font:12px monospace}#list{display:flex;flex-wrap:wrap;gap:16px;align-items:flex-start}figure{margin:0}figcaption{margin-bottom:4px}.box{overflow:hidden;background:#fff;outline:1px solid #999}.box iframe{border:0;transform-origin:0 0;display:block}</style></head>
<body><pre id="report">carregando</pre><div id="list"></div><script>
var L=${JSON.stringify(list)},MAX=740,done=0;
L.forEach(function(c){var s=Math.min(1,MAX/c.width),f=document.createElement('figure');f.id='f-'+c.name;
f.innerHTML='<figcaption>'+c.name+' · '+c.width+'×'+c.height+'</figcaption>';var b=document.createElement('div');b.className='box';b.style.width=c.width*s+'px';b.style.height=c.height*s+'px';
var i=document.createElement('iframe');i.src=c.name+'.html';i.width=c.width;i.height=c.height;i.style.transform='scale('+s+')';i.onload=function(){done++};b.appendChild(i);f.appendChild(b);document.getElementById('list').appendChild(f);c.frame=i});
function report(){return L.map(function(c){var w=c.frame.contentWindow,d=w.document,r=d.getElementById('root');return{name:c.name,errs:w.__errs,h:c.height,need:d.documentElement.scrollHeight,sw:d.documentElement.scrollWidth,cw:c.width,empty:r?!r.firstElementChild:null}})}
window.__report=report;
(function wait(){if(done<L.length)return setTimeout(wait,200);setTimeout(function(){document.getElementById('report').textContent=JSON.stringify(report().filter(function(x){return (x.errs&&x.errs.length)||x.need>x.h||x.sw>x.cw||x.empty}),null,1)},1500)})();
</script></body></html>`);

// ── arquivos da raiz: _ds_bundle.js, _ds_manifest.json, _adherence.oxlintrc.json ──
// Componentes e tokens saem daqui, não à mão; cards, fontes e regras do lint ficam como estão no arquivo.
const ROOTDIR = path.join(B, '..');
fs.writeFileSync(path.join(ROOTDIR, '_ds_bundle.js'), js);
const manifestPath = path.join(ROOTDIR, '_ds_manifest.json'), adherencePath = path.join(ROOTDIR, '_adherence.oxlintrc.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const adherence = JSON.parse(fs.readFileSync(adherencePath, 'utf8'));
const oldKind = Object.fromEntries(manifest.tokens.map(t => [t.name, t.kind]));
const tokenList = [];
for (const f of ['colors', 'typography', 'layout']) {
  const txt = fs.readFileSync(path.join(ROOTDIR, 'tokens', f + '.css'), 'utf8');
  const body = txt.slice(txt.indexOf(':root{') + 6, txt.indexOf('}', txt.indexOf(':root{'))) + '}';
  for (const m of body.matchAll(/(--[\w-]+)\s*:\s*([^;}]*?)\s*[;}]\s*(?:\/\*([^*]*)\*\/)?/g)) {
    const value = m[2].replace(/\/\*[\s\S]*?\*\//g, '').trim();
    const note = (m[2].match(/\/\*([^*]*)\*\//) || [])[1] || m[3] || '';
    const tagged = (note.match(/@kind (\w+)/) || [])[1];
    const ref = (value.match(/^var\((--[\w-]+)\)$/) || [])[1];
    const kind = oldKind[m[1]] || tagged || (/^(#|rgba?\()/.test(value) ? 'color' : ref && tokenList.find(t => t.name === ref)?.kind) ||
      (/px\b|^calc\(/.test(value) ? 'spacing' : 'other');
    tokenList.push({ name: m[1], value, kind, definedIn: 'tokens/' + f + '.css' });
  }
}
if (!tokenList.length) fail('nenhum token lido de tokens/*.css');
manifest.components = names.map(name => ({ name, sourcePath: 'components/bundle.js' }));
manifest.tokens = tokenList;
fs.writeFileSync(manifestPath, JSON.stringify(manifest));
const om = adherence['x-omelette'];
om.components = Object.fromEntries(names.map(n => [n, (om.components && om.components[n]) || { replaces: [] }]));
om.tokens = tokenList.map(t => t.name).sort();
om.tokenKinds = Object.fromEntries(tokenList.map(t => [t.name, t.kind]));
fs.writeFileSync(adherencePath, JSON.stringify(adherence, null, 2));
for (const c of manifest.cards) if (!fs.existsSync(path.join(ROOTDIR, c.path))) fail('card sem arquivo: ' + c.path);

console.log('componentes:', names.length, '| regras do kit:', rules.length, '| presas a .tbl:', scopedCount, '| bundle.js', js.length, 'B | bundle.css', css.length, 'B');
