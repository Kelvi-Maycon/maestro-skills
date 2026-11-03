// Extrai de kit-v9/kit.css só as regras de componente, texto exato de cada regra.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const KIT_CSS = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'kit-v9', 'kit.css');

// Parser mínimo: regras de topo, @media com regras internas, @keyframes como bloco inteiro.
export function parse(css) {
  const out = [];
  let i = 0;
  const skipWs = () => {
    for (;;) {
      while (i < css.length && /\s/.test(css[i])) i++;
      if (css.startsWith('/*', i)) { const e = css.indexOf('*/', i + 2); i = e + 2; continue; }
      break;
    }
  };
  const block = () => { // assume css[i] === '{', devolve índice após o '}' correspondente
    let d = 0;
    for (; i < css.length; i++) {
      if (css[i] === '{') d++;
      else if (css[i] === '}') { d--; if (d === 0) { i++; return; } }
    }
  };
  const rules = (end, media) => {
    for (;;) {
      skipWs();
      if (i >= end || css[i] === '}') return;
      const start = i;
      const brace = css.indexOf('{', i);
      const prelude = css.slice(i, brace).trim();
      if (prelude.startsWith('@media')) {
        i = brace + 1;
        let d = 1, j = i;
        for (; j < css.length; j++) { if (css[j] === '{') d++; else if (css[j] === '}') { d--; if (d === 0) break; } }
        rules(j, prelude);
        i = j + 1;
        continue;
      }
      i = brace;
      block();
      out.push({ media, selector: prelude, text: css.slice(start, i).trim(), keyframes: prelude.startsWith('@keyframes') });
    }
  };
  rules(css.length, null);
  return out;
}

// Famílias de layout do documento do kit (capítulos, painéis de especificação, aplicações 11–14).
const DOC_LAYOUT = [
  /^html\b/, /^\.wrap\b/, /^\.top\b/, /^\.top-in\b/, /^\.progress\b/, /^\.intro\b/, /^\.hero\b/, /^\.idx\b/,
  /^\.ch\b/, /^\.head\b/, /^\.body\b/, /^\.g2\b/, /^\.g3\b/, /^\.states\b/, /^\.stage\b/, /^\.rules\b/,
  /^\.swatch/, /^\.type-/, /^\.t-/, /^\.imgs\b/, /^\.fig\b/, /^\.crop/, /^\.recipe\b/,
  /^\.mailgrid\b/, /^\.mail\b/, /^\.env\b/, /^\.mbody\b/, /^\.cover\b/, /^\.story\b/, /^\.signoff\b/,
  /^\.social\b/, /^\.prof\b/, /^\.end\b/, /^\.end-/, /^\.part/, /^\.pano/, /^(a)?\.tile/, /^\.bars\b/, /^\.ladder\b/,
  /^\.imgstrip\b/, /^\.glyphs\b/, /^\.gridfig\b/, /^\.cols/, /^\.stackfig\b/, /^\.iconset\b/, /^\.ig\b/,
  /^\.icon-sizes\b/, /^\.site/, /^\.phones?\b/, /^\.ph-/, /^\.mv-/
];
export function isDocLayout(sel) {
  // vírgula de topo: a de dentro de :is()/:where() não separa seletores
  const parts = [];
  let d = 0, ini = 0;
  for (let k = 0; k < sel.length; k++) {
    if (sel[k] === '(') d++; else if (sel[k] === ')') d--;
    else if (sel[k] === ',' && d === 0) { parts.push(sel.slice(ini, k).trim()); ini = k + 1; }
  }
  parts.push(sel.slice(ini).trim());
  const flags = parts.map(s => DOC_LAYOUT.some(r => r.test(s)));
  if (flags.every(Boolean)) return true;
  if (flags.some(Boolean)) throw new Error('grupo misto: ' + sel);
  return false;
}

// `html{scroll-behavior:smooth;...}` e o `html{scroll-behavior:auto}` do reduced-motion ficam fora (rolagem do documento).
export function componentRules(css) {
  return parse(css).filter(r => r.keyframes || !isDocLayout(r.selector));
}

export function render(list) {
  const lines = [];
  let media = undefined, buf = [];
  const flush = () => {
    if (!buf.length) return;
    lines.push(media ? media + '{\n' + buf.join('\n') + '\n}' : buf.join('\n'));
    buf = [];
  };
  for (const r of list) {
    if (r.media !== media) { flush(); media = r.media; }
    buf.push(r.text);
  }
  flush();
  return lines.join('\n');
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const css = fs.readFileSync(KIT_CSS, 'utf8');
  const all = parse(css);
  const kept = all.filter(r => r.keyframes || !isDocLayout(r.selector));
  console.log('regras no kit:', all.length, 'mantidas:', kept.length);
  console.log(all.filter(r => !kept.includes(r)).map(r => (r.media ? r.media + ' ' : '') + r.selector).join('\n'));
}
