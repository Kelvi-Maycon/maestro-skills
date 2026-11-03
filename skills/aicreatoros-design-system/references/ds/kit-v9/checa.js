/* checa.js — verificador de alinhamento e regras visuais do AiCreatorOS DS.
   Regras de camada (rev. 31/10/2026): caixa-alta, mono-fora, camada (painel ≥ 1,18 · cabeçalho ≥ 1,15 · divisória ≥ 1,5 · desabilitado ≥ 3:1),
   espaco-fora (escala 4 · 8 · 12 · 16 · 24 em tela de produto) e titulo-desalinhado.
   Uso: colar no console (ou injetar por Playwright/javascript_tool) e chamar
   checaAlinhamento() → {achados:[{tipo,onde,texto,detalhe,px}], resumo:{tipo:n}}.
   opts: {silencioso:true} não imprime console.table; {tipos:['sobreposicao',...]} limita as checagens.
   Não altera a página: pseudo-elementos com texto (ex.: rótulos do eixo y do .chart) viram <span> temporários
   só durante a medição e são removidos no fim. */
(() => {
  const LIMA = [216, 243, 90];
  const CONT_SEL = '.card,.panel,.panel-body>*,.stat,section,[class*=card]';
  const LAYOUT_SEL = 'main,header,section,footer,.wrap,[class*=wrap],[class*=container]';
  const PULA = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE', 'HEAD', 'TITLE', 'OPTION']);
  // botão não entra: fantasma (sem fundo nem borda) não desenha caixa; os outros caem na regra de fundo/borda
  const MIDIA = new Set(['IMG', 'SVG', 'CANVAS', 'VIDEO', 'IFRAME', 'INPUT', 'SELECT', 'TEXTAREA', 'PICTURE', 'OBJECT', 'EMBED']);

  function checaAlinhamento(opts = {}) {
    const t0 = performance.now();
    const quer = t => !opts.tipos || opts.tipos.includes(t);
    const achados = [];
    const cs = new Map();
    const st = el => { let s = cs.get(el); if (!s) { s = getComputedStyle(el); cs.set(el, s); } return s; };
    const px = v => parseFloat(v) || 0;
    const r1 = n => Math.round(n * 10) / 10;

    /* ---------- utilidades ---------- */
    const rgba = c => {
      const m = /rgba?\(([^)]+)\)/.exec(c || '');
      if (!m) return null;
      const p = m[1].split(/[\s,/]+/).filter(Boolean).map(parseFloat);
      return [p[0], p[1], p[2], p.length > 3 ? p[3] : 1];
    };
    const lum = ([r, g, b]) => {
      const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
      return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
    };
    const ehLima = c => c && c[3] > 0.5 && Math.abs(c[0] - LIMA[0]) <= 6 && Math.abs(c[1] - LIMA[1]) <= 6 && Math.abs(c[2] - LIMA[2]) <= 6;
    const nome = el => {
      if (!el || el.nodeType !== 1) return '';
      if (el.dataset && el.dataset.checaPseudo) return nome(el.parentElement) + '::' + el.dataset.checaPseudo;
      let s = el.tagName.toLowerCase();
      if (el.id) return s + '#' + el.id;
      const c = [...el.classList].filter(k => !k.startsWith('checa')).slice(0, 2);
      if (c.length) s += '.' + c.join('.');
      return s;
    };
    const onde = el => {
      const partes = [];
      let e = el, n = 0;
      while (e && e.nodeType === 1 && e !== document.body && n < 4) {
        partes.unshift(nome(e));
        if (e.id && !(e.dataset && e.dataset.checaPseudo)) break;
        e = e.dataset && e.dataset.checaPseudo ? e.parentElement.parentElement : e.parentElement;
        n++;
      }
      return partes.join(' > ');
    };
    const curto = s => { s = (s || '').replace(/\s+/g, ' ').trim(); return s.length > 60 ? s.slice(0, 57) + '…' : s; };
    const inter = (a, b) => ({ l: Math.max(a.l, b.l), t: Math.max(a.t, b.t), r: Math.min(a.r, b.r), b: Math.min(a.b, b.b) });
    const vazio = a => a.r - a.l <= 0 || a.b - a.t <= 0;
    const box = r => ({ l: r.left, t: r.top, r: r.right, b: r.bottom });
    const INF = { l: -1e9, t: -1e9, r: 1e9, b: 1e9 };

    /* ---------- pseudo-elementos com texto viram spans temporários ---------- */
    const temp = [];
    const estiloTemp = document.createElement('style');
    estiloTemp.textContent = '[data-checa-hide~=before]::before,[data-checa-hide~=after]::after{content:none!important}';
    const SEM_COPIA = new Set(['content', 'quotes', 'counter-reset', 'counter-increment', 'counter-set', 'transition', 'transition-property', 'transition-duration', 'transition-delay', 'animation', 'animation-name', 'animation-duration']);
    // propriedades lógicas duplicam as físicas e, copiadas depois, desfazem left/right do pseudo
    const LOGICA = /^(inset-|margin-(inline|block)|padding-(inline|block)|border-(inline|block)|(min-|max-)?(inline|block)-size|scroll-(margin|padding)-(inline|block)|contain-intrinsic-(inline|block))/;
    const textoPseudo = (el, c) => {
      if (!c || c === 'none' || c === 'normal') return '';
      let out = '', m, re = /"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)'|attr\(\s*([\w-]+)\s*\)/g;
      while ((m = re.exec(c))) out += m[3] ? (el.getAttribute(m[3]) || '') : (m[1] ?? m[2]).replace(/\\(.)/g, '$1');
      return out.trim() ? out : '';
    };
    try {
      document.head.appendChild(estiloTemp);
      const alvos = [];
      for (const el of document.body.querySelectorAll('*')) {
        if (PULA.has(el.tagName) || el.closest('svg')) continue;
        for (const q of ['before', 'after']) {
          const p = getComputedStyle(el, '::' + q);
          if (p.display === 'none' || p.visibility === 'hidden' || px(p.opacity) === 0) continue;
          const txt = textoPseudo(el, p.content);
          if (txt) alvos.push([el, q, p, txt]);
        }
      }
      for (const [el, q, p, txt] of alvos) {
        const s = document.createElement('span');
        for (let i = 0; i < p.length; i++) { const k = p[i]; if (!SEM_COPIA.has(k) && !LOGICA.test(k)) s.style.setProperty(k, p.getPropertyValue(k)); }
        s.style.transition = 'none'; s.style.animation = 'none';
        s.dataset.checaPseudo = q;
        s.textContent = txt;
        el.setAttribute('data-checa-hide', ((el.getAttribute('data-checa-hide') || '') + ' ' + q).trim());
        q === 'before' ? el.insertBefore(s, el.firstChild) : el.appendChild(s);
        temp.push(s);
      }

      /* ---------- visibilidade e recorte ---------- */
      const opac = new Map();
      const opaco = el => {
        if (!el || el.nodeType !== 1) return true;
        if (opac.has(el)) return opac.get(el);
        const s = st(el);
        const v = px(s.opacity) > 0.02 && s.display !== 'none' && opaco(el.parentElement);
        opac.set(el, v); return v;
      };
      const posicionado = s => s.position !== 'static' || s.transform !== 'none' || s.filter !== 'none' || s.contain.includes('paint') || s.contain.includes('layout');
      const blocoCont = el => {
        const s = st(el);
        if (s.position === 'fixed') return null;
        let p = el.parentElement;
        if (s.position === 'absolute') while (p && p !== document.documentElement && !posicionado(st(p))) p = p.parentElement;
        return p;
      };
      const clipMemo = new Map(), dentroMemo = new Map();
      // recorte que um elemento aplica aos filhos
      const clipDentro = el => {
        if (!el || el === document.documentElement) return INF;
        if (dentroMemo.has(el)) return dentroMemo.get(el);
        let c = clipDe(el);
        const s = st(el);
        const ox = s.overflowX !== 'visible', oy = s.overflowY !== 'visible';
        if (ox || oy) {
          const r = el.getBoundingClientRect();
          const pad = { l: r.left + px(s.borderLeftWidth), t: r.top + px(s.borderTopWidth), r: r.right - px(s.borderRightWidth), b: r.bottom - px(s.borderBottomWidth) };
          c = inter(c, { l: ox ? pad.l : -1e9, r: ox ? pad.r : 1e9, t: oy ? pad.t : -1e9, b: oy ? pad.b : 1e9 });
        }
        if (s.clip && s.clip.startsWith('rect') && s.position.match(/absolute|fixed/)) c = { l: 0, t: 0, r: 0, b: 0 };
        if (s.clipPath && /inset\(\s*50%/.test(s.clipPath)) c = { l: 0, t: 0, r: 0, b: 0 };
        dentroMemo.set(el, c); return c;
      };
      // recorte aplicado ao próprio elemento
      const clipDe = el => {
        if (clipMemo.has(el)) return clipMemo.get(el);
        const cb = blocoCont(el);
        const c = cb ? clipDentro(cb) : INF;
        clipMemo.set(el, c); return c;
      };
      const pegajoso = new Map();
      const camada = el => { // contexto sticky/fixed mais próximo
        if (!el || el === document.body) return null;
        if (pegajoso.has(el)) return pegajoso.get(el);
        const s = st(el);
        const v = (s.position === 'sticky' || s.position === 'fixed') ? el : camada(el.parentElement);
        pegajoso.set(el, v); return v;
      };

      /* ---------- coleta de textos ---------- */
      const itens = [];
      const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      const rg = document.createRange();
      for (let n = tw.nextNode(); n; n = tw.nextNode()) {
        const txt = n.nodeValue;
        if (!txt || !txt.trim()) continue;
        const el = n.parentElement;
        if (!el || PULA.has(el.tagName) || el.closest('svg')) continue;
        const s = st(el);
        if (s.visibility !== 'visible' || !opaco(el)) continue;
        rg.selectNodeContents(n);
        const cl = clipDe(el);
        const clipEl = clipDentro(el);
        const fs = px(s.fontSize);
        const rects = [], brutos = [];
        for (const r of rg.getClientRects()) {
          if (r.width < 0.5 || r.height < 0.5) continue;
          const b = box(r);
          brutos.push(b);
          const c = inter(b, inter(cl, clipEl));
          if (vazio(c) || (c.r - c.l) * (c.b - c.t) < 2) continue;
          // faixa vertical do corpo da letra (evita acusar entrelinha apertada)
          const mid = (b.t + b.b) / 2, h = Math.min(b.b - b.t, fs) / 2;
          rects.push({ l: c.l, r: c.r, t: Math.max(c.t, mid - h), b: Math.min(c.b, mid + h) });
        }
        if (!rects.length) continue;
        itens.push({ n, el, txt, rects, brutos, s });
      }

      const contMemo = new Map();
      const contSet = new Set(document.querySelectorAll(CONT_SEL));
      const contDe = el => { // contêiner mais próximo
        let e = el;
        while (e && e !== document.body) { if (contSet.has(e)) return e; e = e.parentElement; }
        return null;
      };
      const caixaConteudo = el => {
        if (contMemo.has(el)) return contMemo.get(el);
        const s = st(el), r = el.getBoundingClientRect();
        const c = {
          l: r.left + px(s.borderLeftWidth) + px(s.paddingLeft), r: r.right - px(s.borderRightWidth) - px(s.paddingRight),
          t: r.top + px(s.borderTopWidth) + px(s.paddingTop), b: r.bottom - px(s.borderBottomWidth) - px(s.paddingBottom),
        };
        contMemo.set(el, c); return c;
      };
      const visual = el => { // tem fundo, borda ou é mídia
        if (MIDIA.has(el.tagName.toUpperCase())) return true;
        const s = st(el);
        const bg = rgba(s.backgroundColor);
        if ((bg && bg[3] > 0.05) || s.backgroundImage !== 'none') return true;
        for (const k of ['Top', 'Right', 'Bottom', 'Left']) {
          if (px(s['border' + k + 'Width']) > 0 && s['border' + k + 'Style'] !== 'none') { const c = rgba(s['border' + k + 'Color']); if (c && c[3] > 0.05) return true; }
        }
        return false;
      };
      const add = (tipo, el, texto, detalhe, v) => achados.push({ tipo, onde: onde(el), texto: curto(texto), detalhe, px: r1(v) });

      /* ---------- sobreposicao ---------- */
      if (quer('sobreposicao')) {
        const CEL = 96, grade = new Map(), vistos = new Set();
        const fora = el => { const p = st(el).position; return p === 'absolute' || p === 'fixed'; };
        const foraDoFluxo = el => { for (let e = el; e && e !== document.body; e = e.parentElement) { if (fora(e)) return true; if (st(e).display.includes('block') || st(e).display.includes('flex') || st(e).display.includes('grid')) break; } return false; };
        itens.forEach((it, i) => it.rects.forEach(r => {
          for (let x = Math.floor(r.l / CEL); x <= Math.floor(r.r / CEL); x++)
            for (let y = Math.floor(r.t / CEL); y <= Math.floor(r.b / CEL); y++) {
              const k = x + ',' + y; let a = grade.get(k); if (!a) grade.set(k, a = []);
              for (const [j, q] of a) {
                if (j === i) continue;
                const par = j < i ? j + ':' + i : i + ':' + j;
                if (vistos.has(par)) continue;
                const A = itens[i], B = itens[j];
                if (A.el === B.el || A.el.contains(B.el) || B.el.contains(A.el)) { vistos.add(par); continue; }
                const ow = Math.min(r.r, q.r) - Math.max(r.l, q.l), oh = Math.min(r.b, q.b) - Math.max(r.t, q.t);
                // texto fora do fluxo encostado em outro na mesma linha também conta (ex.: "10.8Meta")
                const encostado = oh > 1 && ow > -1 && ow <= 1 && (foraDoFluxo(A.el) || foraDoFluxo(B.el));
                if (!((ow > 1 && oh > 1) || encostado)) continue;
                vistos.add(par);
                if (camada(A.el) !== camada(B.el)) continue; // célula sticky rola por cima de propósito
                add('sobreposicao', A.el, A.txt.trim() + ' × ' + B.txt.trim(), (ow > 1 ? 'sobrepõe ' : 'encosta em ') + onde(B.el), Math.max(0, Math.min(ow, oh)));
              }
              a.push([i, r]);
            }
        }));
      }

      /* ---------- fora-da-borda / quase-alinhado / transborda (texto) ---------- */
      const alinDir = el => { // texto alinhado ao centro/direita não conta para borda esquerda
        for (let e = el; e && e !== document.body; e = e.parentElement) {
          const s = st(e);
          if (/center|right|end/.test(s.textAlign) && !s.display.startsWith('inline')) return true;
          if (!s.display.startsWith('inline')) {
            const p = e.parentElement && st(e.parentElement);
            if (p && /flex|grid/.test(p.display) && (/center|end|right/.test(p.justifyContent) || /center|end/.test(s.justifySelf) || s.marginLeft === 'auto')) return true;
            if (s.marginLeft !== '0px' && px(s.marginLeft) > 0 && s.marginLeft === s.marginRight) return true;
            return false;
          }
        }
        return false;
      };
      const temAntes = (it, cont, x0, x1, y) => { // algo visível (ícone, ponto) entre a borda e o texto
        for (let e = it.el; e && e !== cont; e = e.parentElement) {
          const r = e.getBoundingClientRect();
          if (r.left < x1 - 0.5 && visual(e) && e !== it.el) return true;
        }
        const pontos = document.elementsFromPoint((x0 + x1) / 2, y);
        return pontos.some(e => cont.contains(e) && e !== cont && !e.contains(it.n) && visual(e));
      };
      const repBorda = new Set();
      if (quer('fora-da-borda') || quer('quase-alinhado') || quer('transborda')) {
        for (const it of itens) {
          const cont = contDe(it.el);
          if (!cont) continue;
          const cc = caixaConteudo(cont);
          if (cc.r - cc.l < 1) continue;
          // caixa visual: se o texto está dentro de um chip/botão com fundo, alinha a caixa, não o texto
          // (só vale se a caixa contém o texto; rótulo do eixo y fica fora da linha de grade que o carrega)
          const tl = Math.min(...it.rects.map(r => r.l)), tr = Math.max(...it.rects.map(r => r.r));
          let alvo = null;
          for (let e = it.el; e && e !== cont; e = e.parentElement) {
            if (!visual(e)) continue;
            const b = e.getBoundingClientRect();
            if (b.left <= tl + 0.5 && b.right >= tr - 0.5) alvo = e;
          }
          // caixa recortada pelo contêiner que rola (carrossel com overflow-x) não passa da borda
          const ab = alvo && inter(box(alvo.getBoundingClientRect()), clipDe(alvo));
          if (ab && vazio(ab)) continue;
          const L = ab ? ab.l : tl;
          const R = ab ? ab.r : tr;
          const y = (it.rects[0].t + it.rects[0].b) / 2;
          const dono = alvo || it.el;
          const dl = cc.l - L;
          if (quer('fora-da-borda') && dl > 0.5 && !repBorda.has(dono)) {
            repBorda.add(dono);
            add('fora-da-borda', dono, alvo ? alvo.textContent : it.txt, 'começa ' + r1(dl) + 'px antes da borda de conteúdo de ' + nome(cont), dl);
          } else if (quer('quase-alinhado') && -dl >= 1 && -dl <= 6 && !repBorda.has(dono) && !it.el.closest('td,th') && !alinDir(it.el) && !temAntes(it, cont, cc.l, L, y)) {
            repBorda.add(dono);
            add('quase-alinhado', dono, alvo ? alvo.textContent : it.txt, 'começa ' + r1(-dl) + 'px depois da borda de conteúdo de ' + nome(cont), -dl);
          }
          const dr = R - cc.r;
          if (quer('transborda') && dr > 1 && !repBorda.has(dono)) {
            repBorda.add(dono);
            add('transborda', dono, alvo ? alvo.textContent : it.txt, 'passa ' + r1(dr) + 'px da borda direita de ' + nome(cont), dr);
          }
        }
      }

      /* ---------- percurso único de elementos ---------- */
      const todos = [...document.body.querySelectorAll('*')].filter(el => !PULA.has(el.tagName) && !(el.parentElement && el.parentElement.closest('svg')));

      /* ---------- transborda (scrollWidth) ---------- */
      if (quer('transborda')) {
        const cands = [];
        const doc = document.documentElement;
        if (doc.scrollWidth > doc.clientWidth + 1) add('transborda', doc, '', 'página rola na horizontal: ' + doc.scrollWidth + ' > ' + doc.clientWidth, doc.scrollWidth - doc.clientWidth);
        for (const el of todos) {
          if (el.tagName.toLowerCase() === 'svg' || !el.clientWidth || el.scrollWidth <= el.clientWidth + 1) continue;
          const s = st(el);
          if (/auto|scroll/.test(s.overflowX) || s.textOverflow === 'ellipsis' || s.visibility !== 'visible' || !opaco(el)) continue;
          const r = el.getBoundingClientRect();
          const dir = r.left + px(s.borderLeftWidth) + el.clientWidth;
          const noFluxo = it => { for (let e = it.el; e && e !== el; e = e.parentElement) if (/absolute|fixed/.test(st(e).position)) return false; return true; };
          // texto cortado de propósito por reticências dentro de el não é o culpado (a linha pode sangrar só o fundo)
          const reticente = it => { for (let e = it.el; e && e !== el; e = e.parentElement) if (st(e).textOverflow === 'ellipsis' && st(e).overflowX !== 'visible') return true; return false; };
          const t = itens.find(it => el.contains(it.n) && it.brutos.some(b => b.r > dir + 1) && noFluxo(it) && !reticente(it) && !/auto|scroll/.test(st(it.el).overflowX));
          if (!t) continue;
          if (vazio(inter(clipDe(el), box(r)))) continue;
          cands.push([el, t, el.scrollWidth - el.clientWidth]);
        }
        const els = cands.map(c => c[0]);
        for (const [el, t, d] of cands) {
          if (els.some(o => o !== el && el.contains(o))) continue; // só o mais interno
          if (repBorda.has(t.el)) continue;
          add('transborda', el, t.txt, 'scrollWidth ' + el.scrollWidth + ' > clientWidth ' + el.clientWidth + ' (overflow-x ' + st(el).overflowX + ')', d);
        }
      }

      /* ---------- faixa-vazia ---------- */
      if (quer('faixa-vazia')) {
        // fim do conteúdo visível por subárvore, em um passe
        const fim = new Map();
        const textoFim = new Map();
        for (const it of itens) { const b = Math.max(...it.rects.map(r => r.b)); textoFim.set(it.el, Math.max(textoFim.get(it.el) ?? -1e9, b)); }
        const fimDe = el => {
          if (fim.has(el)) return fim.get(el);
          let f = textoFim.get(el) ?? -1e9;
          const s = st(el);
          if (s.display !== 'none' && s.visibility === 'visible' && opaco(el) && visual(el)) {
            const r = el.getBoundingClientRect();
            if (r.width > 0 && r.height > 0) f = Math.max(f, Math.min(r.bottom, clipDe(el).b));
          }
          if (el.tagName.toLowerCase() !== 'svg') for (const c of el.children) f = Math.max(f, fimDe(c));
          fim.set(el, f); return f;
        };
        const fimConteudo = col => { // conteúdo da coluna, sem contar a própria caixa
          let f = textoFim.get(col) ?? -1e9;
          for (const c of col.children) f = Math.max(f, fimDe(c));
          return f;
        };
        const repFaixa = new Set();
        for (const el of todos) {
          const s = st(el);
          const flexLinha = /flex/.test(s.display) && !/column/.test(s.flexDirection);
          if (!(/grid/.test(s.display) || flexLinha)) continue;
          if (/auto|scroll/.test(s.overflowX)) continue; // trilho/carrossel: itens não são colunas alinhadas
          if (el.closest('nav')) continue; // colunas de links num índice terminam onde a lista acaba
          // faixa só aparece se há caixa: a coluna, o contêiner da linha ou um card/painel
          const comCaixa = visual(el) || el.matches(CONT_SEL);
          const filhos = [...el.children].filter(c => { const cs2 = st(c); return !/absolute|fixed/.test(cs2.position) && cs2.display !== 'none' && c.getBoundingClientRect().height > 0; });
          if (filhos.length < 2) continue;
          const linhas = [];
          for (const c of filhos) {
            const t = c.getBoundingClientRect().top;
            let l = linhas.find(x => Math.abs(x.t - t) <= 2);
            if (!l) linhas.push(l = { t, cols: [] });
            l.cols.push(c);
          }
          for (const l of linhas) {
            if (l.cols.length < 2) continue;
            // desce por filho único esticado (ex.: card dentro da célula do grid)
            const cols = l.cols.map(c => {
              let e = c;
              for (;;) {
                const vis = [...e.children].filter(k => !/absolute|fixed/.test(st(k).position) && k.getBoundingClientRect().height > 0);
                if (vis.length !== 1) break;
                const cc = caixaConteudo(e), kr = vis[0].getBoundingClientRect();
                if (Math.abs(kr.bottom - cc.b) > 2 || Math.abs(kr.top - cc.t) > 2) break;
                e = vis[0];
              }
              return e;
            });
            const base = Math.max(...l.cols.map(c => caixaConteudo(c).b));
            // vão = borda inferior de conteúdo da coluna (mais o que falta para a linha, se a coluna não estica) − fim do conteúdo
            const med = cols.map((c, k) => ({ c, orig: l.cols[k], fim: fimConteudo(c) }))
              .filter(m => m.fim > -1e9)
              .map(m => ({ ...m, gap: caixaConteudo(m.c).b + (base - caixaConteudo(m.orig).b) - m.fim }));
            if (med.length < 2) continue;
            // barra lateral, menu e mockup de celular terminam antes do conteúdo por natureza
            const lateral = m => m.orig.matches('aside,nav,[class*=menu],[class*=side],.phone') || st(m.orig).position === 'sticky' || m.orig.querySelector(':scope>*') && [...m.orig.querySelectorAll('*')].slice(0, 50).some(k => st(k).position === 'sticky');
            if (!comCaixa && !med.some(m => visual(m.orig) || visual(m.c))) continue;
            const cheio = med.some(m => m.gap < 16);
            for (const m of med) {
              if (!cheio || m.gap <= 48 || repFaixa.has(m.orig) || lateral(m)) continue;
              repFaixa.add(m.orig);
              const txt = m.c.textContent.trim();
              add('faixa-vazia', m.c, txt, m.gap.toFixed(0) + 'px vazios embaixo; coluna vizinha em ' + nome(el) + ' termina a ' + Math.min(...med.map(x => x.gap)).toFixed(0) + 'px', m.gap);
            }
          }
        }
      }

      /* ---------- vazio-no-card ---------- */
      // sobra dentro de uma caixa: faixa horizontal sem texto nem peça visual, no meio ou no fim do card
      if (quer('vazio-no-card')) {
        const CARD = '.card,.panel,[class*=card],.stat,.note,.quote,.recipe';
        const PECA = 'img,svg,canvas,video,iframe,picture,figure,[role=img],[class*=chart],[class*=plot],[class*=bar],[class*=track],[class*=meter],[class*=spark],[class*=ring],input,select,textarea,button,hr';
        const textoPor = new Map();
        for (const it of itens) { let a = textoPor.get(it.el); if (!a) textoPor.set(it.el, a = []); a.push(...it.rects); }
        for (const el of todos) {
          if (!el.matches(CARD) || !visual(el)) continue;
          const s = st(el);
          if (s.display === 'none' || s.visibility !== 'visible' || /auto|scroll/.test(s.overflowY)) continue;
          const c = caixaConteudo(el), alt = c.b - c.t;
          if (alt < 160 || c.r - c.l < 120) continue;
          const faixas = [];
          const cobre = (t, b) => { t = Math.max(t, c.t); b = Math.min(b, c.b); if (b > t) faixas.push([t, b]); };
          for (const d of el.querySelectorAll('*')) {
            const sd = st(d);
            if (sd.display === 'none' || sd.visibility === 'hidden' || +sd.opacity === 0) continue;
            const tr = textoPor.get(d);
            if (tr) for (const r of tr) cobre(r.t, r.b);
            if (d.matches(PECA) || visual(d)) { const r = d.getBoundingClientRect(); if (r.width > 1 && r.height > 1) cobre(r.top, r.bottom); }
          }
          const tr0 = textoPor.get(el); if (tr0) for (const r of tr0) cobre(r.t, r.b);
          if (!faixas.length) continue;
          faixas.sort((x, y) => x[0] - y[0]);
          let fim = faixas[0][1], maior = 0, onde2 = '';
          for (const [t, b] of faixas.slice(1)) { if (t - fim > maior) { maior = t - fim; onde2 = 'no meio'; } fim = Math.max(fim, b); }
          if (c.b - fim > maior) { maior = c.b - fim; onde2 = 'embaixo'; }
          if (maior >= 72 && maior >= alt * 0.18) add('vazio-no-card', el, el.textContent, maior.toFixed(0) + 'px vazios ' + onde2 + ' (' + Math.round(maior / alt * 100) + '% da altura do conteúdo)', maior);
        }
      }

      /* ---------- max-width ---------- */
      if (quer('max-width')) {
        const regrasCh = [];
        for (const sh of document.styleSheets) {
          let rs; try { rs = sh.cssRules; } catch { continue; }
          const anda = lst => { for (const r of lst) { if (r.cssRules && !r.selectorText) anda(r.cssRules); else if (r.style && /\d(ch|em|rem|vw|%)\b/.test(r.style.maxWidth)) regrasCh.push(r.selectorText); } };
          if (rs) anda(rs);
        }
        const medidaTexto = el => (el.style.maxWidth && /(ch|em|rem|vw|%)$/.test(el.style.maxWidth)) || regrasCh.some(sel => { try { return el.matches(sel); } catch { return false; } });
        for (const el of document.querySelectorAll(LAYOUT_SEL)) {
          if (el.matches('p,li,h1,h2,h3,h4,h5,h6,dialog,[role=dialog],.modal,[class*=modal],.phone') || el.closest('.phone,dialog,[role=dialog],.modal')) continue;
          const s = st(el);
          if (s.maxWidth === 'none' || !s.maxWidth.endsWith('px') || px(s.maxWidth) < 900 || s.display === 'none') continue;
          const p = el.parentElement; if (!p) continue;
          // margens pela geometria: o computado de margin:auto nem sempre vem resolvido
          const r = el.getBoundingClientRect(), pc = caixaConteudo(p), w = r.width;
          const ml = r.left - pc.l, mr = pc.r - r.right;
          if (!(ml > 0.5 && Math.abs(ml - mr) < 1)) continue;
          if (w >= pc.r - pc.l - 1 || medidaTexto(el)) continue;
          add('max-width', el, '', 'max-width ' + s.maxWidth + ' centralizado; ocupa ' + r1(w) + 'px de ' + r1(pc.r - pc.l) + 'px do pai', pc.r - pc.l - w);
        }
      }

      /* ---------- lima-no-claro ---------- */
      if (quer('lima-no-claro')) {
        const fundoDe = el => { // compõe camadas translúcidas até achar um fundo opaco (sem fundo: branco)
          const camadas = [];
          for (let e = el; e; e = e.parentElement) {
            const c = rgba(st(e).backgroundColor);
            if (c && c[3] > 0.05) { camadas.push(c); if (c[3] >= 0.99) break; }
          }
          let base = [255, 255, 255];
          for (const c of camadas.reverse()) base = base.map((v, i) => v * (1 - c[3]) + c[i] * c[3]);
          return base.map(Math.round).concat(1);
        };
        for (const el of todos) {
          const s = st(el);
          if (s.visibility !== 'visible' || !opaco(el)) continue;
          const r = el.getBoundingClientRect();
          if (r.width < 1 || r.height < 1 || vazio(inter(clipDe(el), box(r)))) continue;
          if (el.closest('[class*=swatch],.bars')) continue; // amostra de cor da marca (.swatch e faixa .bars do panorama)
          const bg = rgba(s.backgroundColor), co = rgba(s.color);
          const proprio = [...el.childNodes].some(n => n.nodeType === 3 && n.nodeValue.trim());
          let modo = null, fundo;
          if (ehLima(bg)) { modo = 'fundo'; fundo = fundoDe(el.parentElement); }
          else if (proprio && ehLima(co)) { modo = 'texto'; fundo = fundoDe(el); }
          if (!modo || lum(fundo) <= 0.5) continue;
          add('lima-no-claro', el, el.textContent, 'lima como ' + modo + ' sobre fundo rgb(' + fundo.slice(0, 3).join(',') + ') luminância ' + lum(fundo).toFixed(2), 0);
        }
      }

      /* ---------- numero-em-mono ---------- */
      if (quer('numero-em-mono')) {
        const NUM = /^[+\-−±]?\s*(R\$|US\$|\$|€|£)?\s*[+\-−]?\s*\d[\d.,\s]*\s*(%|p\.?p\.?)?$/;
        const ROTULO = /^(\d{1,2}|\d{2}\.\d{1,2}|(19|20)\d\d)$/;
        const feitos = new Set();
        for (const it of itens) {
          const el = it.el;
          if (feitos.has(el)) continue; feitos.add(el);
          if (!/mono/i.test(it.s.fontFamily)) continue;
          const proprio = [...el.childNodes].filter(n => n.nodeType === 3).map(n => n.nodeValue).join('').trim();
          if (!proprio || !NUM.test(proprio) || el.children.length) continue;
          if (ROTULO.test(proprio)) continue; // índice (01, 12), seção (01.3) ou ano (2026) são rótulo, não valor
          add('numero-em-mono', el, proprio, 'número em ' + it.s.fontFamily.split(',')[0].replace(/"/g, ''), 0);
        }
      }

      /* ---------- regras de camada (rev. 31/10/2026) ---------- */
      const fundoAte = el => { // fundo composto atrás de el (el incluso), até um fundo opaco; sem fundo: a página
        const camadas = [];
        for (let e = el; e; e = e.parentElement) {
          const c = rgba(st(e).backgroundColor);
          if (c && c[3] > 0.05) { camadas.push(c); if (c[3] >= 0.99) break; }
        }
        let base = rgba(st(document.documentElement).backgroundColor);
        base = base && base[3] > 0.99 ? base.slice(0, 3) : [255, 255, 255];
        for (const c of camadas.reverse()) base = base.map((v, i) => v * (1 - c[3]) + c[i] * c[3]);
        return base;
      };
      const sobre = (c, fundo) => fundo.map((v, i) => v * (1 - c[3]) + c[i] * c[3]);
      const razao = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
      const visivel = el => { const r = el.getBoundingClientRect(); return r.width > 1 && r.height > 1 && st(el).visibility === 'visible' && opaco(el) && !vazio(inter(clipDe(el), box(r))); };
      const ARTE = '.slide,.mail,.phone,[class*=swatch]'; // arte de formato fixo e amostra de cor ficam fora

      /* caixa-alta: rótulo com text-transform uppercase calculado */
      if (quer('caixa-alta')) {
        const feitos = new Set();
        for (const it of itens) {
          if (feitos.has(it.el)) continue; feitos.add(it.el);
          if (it.s.textTransform !== 'uppercase' || !/[a-zà-ÿ]/.test(it.txt)) continue;
          add('caixa-alta', it.el, it.txt, 'text-transform uppercase; rótulo em caixa normal', 0);
        }
      }

      /* mono-fora: fonte mono fora de code, kbd, samp, pre e .cod */
      if (quer('mono-fora')) {
        const feitos = new Set();
        for (const it of itens) {
          if (feitos.has(it.el)) continue; feitos.add(it.el);
          if (!/mono/i.test(it.s.fontFamily.split(',')[0])) continue;
          if (it.el.closest('code,kbd,samp,pre,.cod,.kbd')) continue;
          add('mono-fora', it.el, it.txt, 'fonte ' + it.s.fontFamily.split(',')[0].replace(/"/g, '') + ' fora de código curto (code, kbd, .cod)', 0);
        }
      }

      /* camada: painel contra o fundo ≥ 1,18; cabeçalho contra o corpo ≥ 1,15; divisória contra o painel ≥ 1,5; texto de botão desabilitado ≥ 3 */
      if (quer('camada')) {
        const MIN = { painel: 1.18, cab: 1.15, linha: 1.5, desab: 3 };
        const f2 = n => n.toFixed(2).replace('.', ',');
        for (const el of document.querySelectorAll('.pn,.card,.menu')) {
          if (!visivel(el) || el.closest(ARTE) || el.classList.contains('ink') || el.closest('.ink')) continue;
          const bg = rgba(st(el).backgroundColor);
          if (!bg || bg[3] < 0.5) continue;
          const atras = fundoAte(el.parentElement), meu = sobre(bg, atras);
          const k = razao(meu, atras);
          if (k < MIN.painel) add('camada', el, '', 'painel contra o fundo ' + f2(k) + ' (mínimo 1,18); painel dentro de painel ou superfície errada', MIN.painel - k);
        }
        for (const el of document.querySelectorAll('.pn-cab,.pn-rodape,.pn-coluna-cab,.panel>.panel-head,th')) {
          if (!visivel(el) || el.closest(ARTE)) continue;
          const corpo = el.matches('th') ? el.closest('table').parentElement : el.parentElement.closest('.pn,.panel') || el.parentElement;
          const bgCorpo = fundoAte(corpo), meu = fundoAte(el);
          const k = razao(meu, bgCorpo);
          if (k < MIN.cab) add('camada', el, el.textContent, 'cabeçalho contra o corpo ' + f2(k) + ' (mínimo 1,15)', MIN.cab - k);
        }
        const LADOS = ['Top', 'Right', 'Bottom', 'Left'];
        for (const el of document.querySelectorAll('.pn,.pn-cab,.kpis,.lin>li,.tb td:first-child,.aviso,.sel-barra')) {
          if (!visivel(el) || el.closest(ARTE)) continue;
          const s = st(el);
          const lado = LADOS.find(k => px(s['border' + k + 'Width']) > 0 && s['border' + k + 'Style'] !== 'none');
          if (!lado) { if (el.matches('.pn,.pn-cab')) add('camada', el, '', 'sem divisória: painel e cabeçalho precisam de borda de 1 px', 1); continue; }
          const c = rgba(s['border' + lado + 'Color']); if (!c) continue;
          const ref = fundoAte(el.matches('.pn-cab') ? el.parentElement : el);
          const k = razao(sobre(c, ref), ref);
          if (k < MIN.linha) add('camada', el, '', 'divisória contra o fundo ' + f2(k) + ' (mínimo 1,5)', MIN.linha - k);
        }
        for (const el of document.querySelectorAll('button:disabled,.btn.is-disabled,.btn:disabled')) {
          if (!visivel(el) || el.closest(ARTE)) continue;
          const c = rgba(st(el).color); if (!c) continue;
          const ref = fundoAte(el), k = razao(sobre(c, ref), ref);
          if (k < MIN.desab) add('camada', el, el.textContent, 'texto de botão desabilitado ' + f2(k) + ':1 (mínimo 3:1)', MIN.desab - k);
        }
      }

      /* espaco-fora: padding e gap fora da escala 4 · 8 · 12 · 16 · 24 (2 de ajuste fino; acima de 24, múltiplo de 8) em tela de produto */
      if (quer('espaco-fora')) {
        const PROD = '.ws,.pn,.kpis,.tb,.lin,.aviso,.sel-barra,.lote,.page-head';
        const CTRL = 'button,input,select,textarea,.inp,.btn,.ico,.chip,.seg,.badge,.delta,.lvl,.kbd,.tag,.status,.sw,.chk,.th-sort,.avatar,.tab,.dl-sem,.best,code,kbd';
        const ok = v => v < 0.5 || [1, 2, 4, 8, 12, 16, 24].some(x => Math.abs(v - x) < 0.6) || (v > 24 && Math.abs(v / 8 - Math.round(v / 8)) * 8 < 0.6);
        const PROPS = ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'rowGap', 'columnGap'];
        for (const el of todos) {
          if (!el.closest(PROD) || el.closest(CTRL) || el.closest(ARTE) || el.dataset.checaPseudo) continue;
          const s = st(el);
          if (s.display === 'none' || s.display === 'inline' || !visivel(el)) continue;
          const flexOuGrid = /flex|grid/.test(s.display);
          const ruins = [];
          for (const k of PROPS) {
            if ((k === 'rowGap' || k === 'columnGap') && (!flexOuGrid || s[k] === 'normal')) continue;
            const v = px(s[k]);
            if (!ok(v)) ruins.push(k.replace(/[A-Z]/g, m => '-' + m.toLowerCase()) + ' ' + r1(v));
          }
          if (ruins.length) add('espaco-fora', el, '', ruins.join(', '), 0);
        }
      }

      /* titulo-desalinhado: painéis vizinhos na mesma fileira com o título em alturas diferentes */
      if (quer('titulo-desalinhado')) {
        const TIT = '.pn-tit,.panel-head h4,.sec-head h3';
        const pais = new Set([...document.querySelectorAll('.pn,.card,.panel')].map(e => e.parentElement));
        for (const pai of pais) {
          const filhos = [...pai.children].filter(c => c.matches('.pn,.card,.panel') && visivel(c));
          const fileiras = [];
          for (const c of filhos) {
            const t = c.getBoundingClientRect().top;
            let f = fileiras.find(x => Math.abs(x.t - t) <= 1);
            if (!f) fileiras.push(f = { t, itens: [] });
            const tit = c.querySelector(TIT);
            if (tit && visivel(tit)) f.itens.push([c, tit, tit.getBoundingClientRect().top]);
          }
          for (const f of fileiras) {
            if (f.itens.length < 2) continue;
            const ys = f.itens.map(x => x[2]), d = Math.max(...ys) - Math.min(...ys);
            if (d > 1) add('titulo-desalinhado', f.itens[0][0], f.itens.map(x => x[1].textContent.trim()).join(' | '), 'títulos de painéis vizinhos a ' + r1(d) + 'px de distância na vertical', d);
          }
        }
      }
    } finally {
      for (const s of temp) s.remove();
      for (const el of document.querySelectorAll('[data-checa-hide]')) el.removeAttribute('data-checa-hide');
      estiloTemp.remove();
    }

    const resumo = {};
    for (const a of achados) resumo[a.tipo] = (resumo[a.tipo] || 0) + 1;
    const ms = Math.round(performance.now() - t0);
    if (!opts.silencioso) {
      console.table(achados);
      console.log('checaAlinhamento:', achados.length, 'achado(s) em', ms, 'ms', resumo);
    }
    return { achados, resumo, ms };
  }
  window.checaAlinhamento = checaAlinhamento;
})();
