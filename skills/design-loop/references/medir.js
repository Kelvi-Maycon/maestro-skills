// Mede o render aberto: rodar no contexto da página (page.evaluate, ferramenta de JS do navegador ou console) e ler o JSON.
// Rodar igual na referência e no nosso render, no mesmo viewport. Não altera a página.
// Colisão e corte são candidatos: camada empilhada de propósito (crossfade, carrossel) também aparece; conferir no screenshot.
(() => {
  const vw = document.documentElement.clientWidth;
  const px = v => Math.round(parseFloat(v) * 10) / 10;
  const bump = (m, k, v = 1) => m.set(k, (m.get(k) || 0) + v);
  const top = (m, n = 8) => [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, n).map(([k, v]) => `${k} (${v})`);
  const rgb = c => (c.startsWith('rgb') ? c.match(/[\d.]+/g).map(Number) : null);
  const lum = ([r, g, b]) => [r, g, b].reduce((t, v, i) => {
    v /= 255;
    return t + [0.2126, 0.7152, 0.0722][i] * (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  }, 0);
  const alfa = c => (c ? c[3] ?? 1 : 1);
  const opaco = s => s.backgroundImage !== 'none' || alfa(rgb(s.backgroundColor)) >= 0.5;
  const sobre = (c, b) => { const a = alfa(c); return [0, 1, 2].map(i => c[i] * a + b[i] * (1 - a)); };
  const fundo = el => {
    const camadas = [];
    for (let e = el; e; e = e.parentElement) {
      const s = getComputedStyle(e);
      if (s.backgroundImage !== 'none') return null;
      const c = rgb(s.backgroundColor);
      if (!c) return null;
      if (alfa(c) > 0) camadas.push(c);
      if (alfa(c) >= 0.99) break;
    }
    return camadas.reduceRight((base, c) => sobre(c, base), [255, 255, 255]);
  };
  const camadaPropria = (el, outro) => {
    for (let e = el; e && !e.contains(outro); e = e.parentElement) if (opaco(getComputedStyle(e))) return true;
    return false;
  };
  const nome = (el, txt) => `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}${el.classList[0] ? '.' + el.classList[0] : ''} "${txt.slice(0, 30)}"`;
  const tamanhos = new Map(), cores = new Map(), fontes = new Map(), fundos = new Map(), espacos = new Map(), duracoes = new Map();
  const textos = [], contraste = [], cortado = [], fora = [];
  let naoMedido = 0;

  for (const el of document.querySelectorAll('body *')) {
    if (el.checkVisibility && !el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })) continue;
    const s = getComputedStyle(el), r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) continue;
    if (r.right > vw + 1 && r.left < vw) fora.push(el);
    const bg = rgb(s.backgroundColor);
    if (bg && (bg[3] ?? 1) > 0) bump(fundos, s.backgroundColor);
    for (const p of ['marginTop', 'marginBottom', 'paddingTop', 'paddingBottom', 'rowGap', 'columnGap']) {
      const v = px(s[p]);
      if (v > 0) bump(espacos, v);
    }
    for (const d of `${s.transitionDuration},${s.animationDuration}`.split(',')) {
      const ms = Math.round(parseFloat(d) * (d.includes('ms') ? 1 : 1000));
      if (ms > 0) bump(duracoes, ms);
    }
    const no = [...el.childNodes].find(n => n.nodeType === 3 && n.textContent.trim());
    if (!no) continue;
    const txt = no.textContent.trim(), size = px(s.fontSize);
    bump(tamanhos, size, txt.length);
    bump(cores, s.color, txt.length);
    bump(fontes, `${s.fontFamily.split(',')[0].replace(/["']/g, '').trim()} ${s.fontWeight}`, txt.length);
    if (el.scrollWidth > el.clientWidth + 1 && s.overflowX !== 'visible') cortado.push(nome(el, txt));
    const fg = rgb(s.color), bk = fundo(el);
    if (!fg || !bk) naoMedido++;
    else {
      const [a, b] = [lum(sobre(fg, bk)), lum(bk)].sort((x, y) => y - x), razao = Math.round(((a + 0.05) / (b + 0.05)) * 10) / 10;
      const grande = size >= 24 || (size >= 18.66 && +s.fontWeight >= 700);
      if (razao < (grande ? 3 : 4.5)) contraste.push(`${nome(el, txt)} ${razao}:1`);
    }
    const range = document.createRange();
    range.selectNode(no);
    if (textos.length < 500) textos.push({ el, txt, linhas: [...range.getClientRects()] });
  }

  const toca = (p, q) => {
    const x = Math.min(p.right, q.right) - Math.max(p.left, q.left);
    const y = Math.min(p.bottom, q.bottom) - Math.max(p.top, q.top);
    return x > 2 && y > 0.4 * Math.min(p.height, q.height);
  };
  const colisoes = [];
  for (let i = 0; i < textos.length; i++) for (let j = i + 1; j < textos.length; j++) {
    const a = textos[i], b = textos[j];
    if (a.txt === b.txt || a.el.contains(b.el) || b.el.contains(a.el)) continue;
    if (!a.linhas.some(p => b.linhas.some(q => toca(p, q)))) continue;
    if (camadaPropria(a.el, b.el) || camadaPropria(b.el, a.el)) continue;
    colisoes.push(`${nome(a.el, a.txt)} × ${nome(b.el, b.txt)}`);
  }

  const ordem = [...tamanhos.entries()].sort((a, b) => b[1] - a[1]);
  const corpo = ordem.length ? ordem[0][0] : 0, maior = Math.max(0, ...tamanhos.keys());
  const estourou = document.documentElement.scrollWidth > vw + 1;
  return JSON.stringify({
    viewport: `${vw}x${innerHeight}`,
    estouroHorizontal: estourou ? fora.filter(e => !fora.some(o => o !== e && e.contains(o))).slice(0, 5).map(e => nome(e, e.textContent.trim())) : [],
    textoCortado: cortado.slice(0, 5),
    colisaoDeTexto: colisoes.slice(0, 5),
    contrasteBaixo: { total: contraste.length, exemplos: contraste.slice(0, 8), naoMedido },
    tipo: { distintos: tamanhos.size, corpo, maior, razao: corpo ? Math.round((maior / corpo) * 10) / 10 : 0, tamanhos: top(tamanhos) },
    fontes: top(fontes, 6),
    coresDeTexto: { distintas: cores.size, uso: top(cores) },
    fundos: { distintos: fundos.size, uso: top(fundos) },
    espacamentos: top(espacos, 10),
    duracoesMs: top(duracoes, 6),
  }, null, 1);
})()
