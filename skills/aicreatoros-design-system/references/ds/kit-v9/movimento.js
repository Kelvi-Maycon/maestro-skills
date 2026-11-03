/* AiCreatorOS · movimento.js — capítulo 15 do Kit (página do kit, não copiar para peças).
   Laboratório de tokens (15.1), botões "Repetir" das primitivas (15.2) e técnicas com GSAP 3.15.0 e Three.js 0.186.1 (15.3).
   As bibliotecas carregam só quando o capítulo chega perto da tela. Sem biblioteca, sem WebGL ou com reduced-motion,
   o capítulo fica no estado final que está no HTML; ordenar (Flip) e trocar forma (Morph) continuam funcionando sem animação. */
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const ch = $('#movimento');
const M = window.aiosMovimento || { replay() {}, count() {}, calm: true };
const calmQ = matchMedia('(prefers-reduced-motion: reduce)');
const calm = () => calmQ.matches;
const html = document.documentElement;
const tok = n => getComputedStyle(html).getPropertyValue(n).trim();
const sec = (n, f) => { const v = tok(n), x = parseFloat(v); return isFinite(x) ? (/ms$/.test(v) ? x / 1000 : x) : f; };

if (ch) {
  /* 15.1 e 15.2: repetir. --go volta a 0 sem transição e sobe para 1 com a duração e a curva do token */
  const run = box => {
    if (calm()) return;
    box.classList.add('mv-reset'); box.style.setProperty('--go', 0); void box.offsetWidth;
    box.classList.remove('mv-reset'); requestAnimationFrame(() => box.style.setProperty('--go', 1));
    M.replay(box);
  };
  ch.addEventListener('click', e => {
    const r = e.target.closest('[data-mv-run]'); if (r) run($(r.dataset.mvRun));
    const p = e.target.closest('[data-replay]'); if (p) M.replay($(p.dataset.replay));
  });
  const lab = $('#mv-lab');
  if (lab && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { io.disconnect(); run(lab); } }, { rootMargin: '0px 0px -15% 0px' });
    io.observe(lab);
  }
  /* leitura de --p no espécime de data-scrub */
  const sc = $('#mv-p-scrub [data-scrub]'), pv = sc && $('[data-p]', sc);
  if (sc && pv) new MutationObserver(() => { const p = parseFloat(sc.style.getPropertyValue('--p')); if (isFinite(p)) pv.textContent = p.toFixed(2).replace('.', ','); }).observe(sc, { attributes: true, attributeFilter: ['style'] });

  const spot = $('#mv-p-spot');
  if (spot) new MutationObserver(() => { const g = n => spot.style.getPropertyValue(n); const w = spot.getBoundingClientRect();
    const pc = (v, t) => /px$/.test(v) ? Math.round(parseFloat(v) / t * 100) + '%' : v;
    $('[data-spot-x]', spot).textContent = pc(g('--mx'), w.width); $('[data-spot-y]', spot).textContent = pc(g('--my'), w.height);
    const a = parseFloat(g('--spot-a')); $('[data-spot-a]', spot).textContent = a === 1 ? '1 no hover' : a.toFixed(2).replace('.', ',') + ' em repouso'; }).observe(spot, { attributes: true, attributeFilter: ['style'] });

  /* Flip e Morph: a troca funciona sem GSAP; com GSAP e movimento, anima */
  const rank = $('#mv-rank');
  const FMT = { a: v => [v, '%'], t: v => [String(v).replace('.', ','), ' min'], c: v => [String(v).replace('.', ','), ' /1k'] };
  const ORD = { a: -1, t: 1, c: 1 };
  let G = null; // gsap quando carregado e com movimento
  const sortRank = k => {
    const rows = $$('li', rank), max = Math.max(...rows.map(li => +li.dataset[k]));
    const state = G && G.Flip ? G.Flip.getState(rows) : null;
    rows.sort((a, b) => (+a.dataset[k] - +b.dataset[k]) * ORD[k]).forEach((li, i) => {
      rank.append(li); $('.mono', li).textContent = String(i + 1).padStart(2, '0');
      const [v, u] = FMT[k](li.dataset[k]); $('b', li).innerHTML = v + '<small>' + u + '</small>';
      const w = +li.dataset[k] / max * 100;
      $('.mv-rank-bar i', li).style.setProperty('--v', w.toFixed(1) + '%');
    });
    if (state) G.Flip.from(state, { duration: sec('--dur-draw', .8), ease: 'aios-in-out', stagger: sec('--stagger', .04) / 2 });
  };
  if (rank) $('[data-group=mv-crit]').addEventListener('pick', e => sortRank(e.detail.k));

  const SHAPES = {
    arco: ['M112 190V110a48 48 0 0 1 96 0v80Z', 'M96 190V104a64 64 0 0 1 128 0v86'],
    coluna: ['M128 190V38h64v152Z', 'M112 190V22h96v168'],
    disco: ['M160 62a58 58 0 1 1 0 116a58 58 0 1 1 0-116Z', 'M160 46a74 74 0 1 1 0 148a74 74 0 1 1 0-148']
  };
  const fill = $('.mv-shape-fill'), line = $('.mv-shape-line');
  const morph = s => {
    const [f, l] = SHAPES[s];
    if (G && G.MorphSVGPlugin) {
      G.gsap.to(fill, { morphSVG: f, duration: sec('--dur-draw', .8), ease: 'aios-in-out' });
      line.setAttribute('d', l);
      G.gsap.fromTo(line, { drawSVG: '50% 50%' }, { drawSVG: '0% 100%', duration: sec('--dur-draw', .8), ease: 'aios-out', delay: .15 });
    } else { fill.setAttribute('d', f); line.setAttribute('d', l); }
  };
  if (fill) $('[data-group=mv-shape]').addEventListener('pick', e => morph(e.detail.s));

  /* carga das bibliotecas quando o capítulo chega perto */
  const libs = $('[data-mv-libs]');
  const V = 'https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/';
  const load = src => new Promise((ok, no) => { const s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = () => no(new Error(src)); document.head.append(s); });
  let started = false;
  const near = new IntersectionObserver(es => { if (!es.some(e => e.isIntersecting) || started) return; started = true; near.disconnect(); startGsap(); }, { rootMargin: '900px 0px' });
  near.observe($('.mv-libs', ch) || ch);

  async function startGsap() {
    try {
      await load(V + 'gsap.min.js');
      await Promise.all(['ScrollTrigger', 'SplitText', 'Flip', 'DrawSVGPlugin', 'MorphSVGPlugin', 'CustomEase'].map(n => load(V + n + '.min.js')));
    } catch (err) { if (libs) libs.textContent = 'GSAP indisponível · estado final'; return; }
    const { gsap, ScrollTrigger, SplitText, Flip, DrawSVGPlugin, MorphSVGPlugin, CustomEase } = window;
    gsap.registerPlugin(ScrollTrigger, SplitText, Flip, DrawSVGPlugin, MorphSVGPlugin, CustomEase);
    /* curvas do GSAP criadas a partir dos tokens: mudar o token muda a coreografia */
    const bez = n => tok(n).replace(/^cubic-bezier\(|\)$/g, '');
    CustomEase.create('aios', bez('--ease') || '.2,.6,.2,1');
    CustomEase.create('aios-out', bez('--ease-out') || '.16,1,.3,1');
    CustomEase.create('aios-in-out', bez('--ease-in-out') || '.65,0,.35,1');
    CustomEase.create('aios-back', bez('--ease-back') || '.34,1.56,.64,1');
    if (libs) libs.textContent = 'GSAP 3.15.0 · Three.js 0.186.1 · carregados';
    const T = { enter: sec('--dur-enter', .48), draw: sec('--dur-draw', .8), hero: sec('--dur-hero', 1.4), st: sec('--stagger', .04) };

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      G = { gsap, Flip, MorphSVGPlugin };

      /* coreografia em batidas: luz, forma, número, rótulo */
      const st = $('#mv-chore'), beats = $$('#mv-beats .mv-beat');
      if (st) {
        const num = $('.mv-num-v', st), end = +num.textContent, o = { v: 0 };
        const tl = gsap.timeline({ paused: true, defaults: { ease: 'aios-out' } });
        tl.addLabel('luz', 0).addLabel('forma', .3).addLabel('numero', .9).addLabel('rotulo', 1.3)
          .from('.mv-light', { scale: .35, autoAlpha: 0, duration: T.hero }, 'luz')
          .from('.mv-horizon', { drawSVG: '50% 50%', duration: T.draw, ease: 'aios-in-out' }, 'forma')
          .from($$('.mv-arch', st).reverse(), { drawSVG: '0%', duration: T.draw * 1.4, ease: 'aios-in-out', stagger: T.st * 2 }, 'forma+=.1')
          .from('.mv-arch-in', { drawSVG: '0%', duration: T.draw * 1.4, ease: 'aios-in-out' }, 'forma+=.25')
          .from('.mv-num', { yPercent: 30, autoAlpha: 0, duration: T.enter }, 'numero')
          .fromTo(o, { v: 0 }, { v: end, duration: T.draw, onUpdate: () => { num.textContent = Math.round(o.v); } }, 'numero')
          .from(['.mv-chore-kick', '.mv-chore-line'], { y: 16, autoAlpha: 0, duration: T.enter, stagger: T.st * 2 }, 'rotulo');
        const marks = [0, .3, .9, 1.3, tl.duration()];
        tl.eventCallback('onUpdate', () => { const t = tl.time(); beats.forEach((b, i) => b.style.setProperty('--b', Math.max(0, Math.min(1, (t - marks[i]) / (marks[i + 1] - marks[i]))).toFixed(3))); });
        tl.progress(0).pause();
        st._tl = tl;
        ScrollTrigger.create({ trigger: st, start: 'top 75%', once: true, onEnter: () => tl.restart() });
        $('[data-mv-play=chore]').onclick = () => tl.restart();
      }

      /* SplitText por linha, com máscara; refaz as linhas quando a largura muda */
      const lp = $('#mv-lines-p');
      let lines;
      if (lp) {
        const split = SplitText.create(lp, {
          type: 'lines', mask: 'lines', autoSplit: true,
          onSplit: self => { lines = gsap.from(self.lines, { yPercent: 105, duration: T.draw, ease: 'aios-out', stagger: T.st * 2.5, paused: true }); return lines; }
        });
        ScrollTrigger.create({ trigger: lp, start: 'top 80%', once: true, onEnter: () => lines && lines.restart() });
        $('[data-mv-play=lines]').onclick = () => lines && lines.restart();
      }

      /* ScrollTrigger com scrub: a faixa anda com a rolagem */
      const strip = $('#mv-strip'), track = strip && $('.mv-strip-track', strip), bar = $('#mv-strip-bar');
      if (strip) {
        strip.classList.add('is-scrub');
        gsap.to(track, {
          x: () => -(track.scrollWidth - strip.clientWidth), ease: 'none',
          scrollTrigger: { trigger: strip, start: 'top bottom', end: 'bottom top', scrub: .6, invalidateOnRefresh: true, onUpdate: s => bar && bar.style.setProperty('--sp', s.progress.toFixed(3)) }
        });
      }

      /* stagger em grade: a onda parte da célula clicada */
      const cells = $('#mv-cells');
      if (cells) {
        const bs = $$('b', cells);
        const dims = () => { const is = $$('i', cells), y = is[0].offsetTop, cols = is.filter(x => x.offsetTop === y).length; return [Math.ceil(is.length / cols), cols]; };
        const wave = from => { const [rows, cols] = dims(); return gsap.timeline()
          .fromTo(bs, { opacity: 0, scale: .2 }, { opacity: 1, scale: 1, duration: T.enter, ease: 'aios-out', stagger: { grid: [rows, cols], from, amount: .7 } })
          .to(bs, { opacity: 0, duration: T.draw, ease: 'aios', stagger: { grid: [rows, cols], from, amount: .7 } }, T.enter); };
        cells.onclick = e => { const i = $$('i', cells).indexOf(e.target.closest('i')); if (i >= 0) wave(i); };
        ScrollTrigger.create({ trigger: cells, start: 'top 80%', once: true, onEnter: () => wave('center') });
      }

      /* primeira entrada do Morph */
      if (fill) ScrollTrigger.create({ trigger: fill, start: 'top 85%', once: true, onEnter: () => gsap.from(line, { drawSVG: '50% 50%', duration: T.draw, ease: 'aios-out' }) });

      return () => { G = null; if (strip) { strip.classList.remove('is-scrub'); gsap.set(track, { clearProps: 'x' }); } };
    });
    ScrollTrigger.refresh();
  }

  /* Three.js: imagem Noir num plano com shader. O cursor é uma lanterna laranja que acende e ondula a cena; grão fino de filme por cima */
  const gl = $('#mv-gl');
  if (gl) {
    const fr = $('[data-gl-frames]', gl), stt = $('[data-gl-state]', gl);
    const say = t => { stt.textContent = t; };
    const hasGL = (() => { try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch { return false; } })();
    if (!hasGL) { say('Sem WebGL'); gl.dataset.gl = 'off'; }
    else {
      let begun = false;
      const soon = new IntersectionObserver(es => { if (begun || !es.some(e => e.isIntersecting)) return; begun = true; soon.disconnect(); startGL(); }, { rootMargin: '300px 0px' });
      soon.observe(gl);
    }
    async function startGL() {
      let THREE;
      try { THREE = await import('three'); } catch { say('Three indisponível'); return; }
      let renderer;
      try { renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, powerPreference: 'low-power' }); } catch { say('Sem WebGL'); return; }
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      const cv = renderer.domElement; cv.setAttribute('aria-hidden', 'true'); gl.prepend(cv);
      const scene = new THREE.Scene(), cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const rgb = c => { const m = c.match(/[\d.]+/g) || [0, 0, 0]; return new THREE.Vector3(m[0] / 255, m[1] / 255, m[2] / 255); };
      const U = { uRes: { value: new THREE.Vector2() }, uTime: { value: 0 }, uMouse: { value: new THREE.Vector2(.62, .5) }, uImg: { value: null }, uImgAr: { value: 1.5 },
        uInk: { value: new THREE.Vector3() }, uOrange: { value: new THREE.Vector3() }, uPaper: { value: new THREE.Vector3() } };
      /* cores dos tokens: fundo e texto computados do painel .ink (mudam no escuro) e --orange */
      const colors = () => { const cs = getComputedStyle(gl); U.uInk.value.copy(rgb(cs.backgroundColor)); U.uPaper.value.copy(rgb(cs.color));
        const probe = document.createElement('i'); probe.style.color = 'var(--orange)'; gl.append(probe); U.uOrange.value.copy(rgb(getComputedStyle(probe).color)); probe.remove(); };
      colors();
      const src = $('.mv-gl-fallback', gl).currentSrc || $('.mv-gl-fallback', gl).src;
      let tex;
      try { tex = await new THREE.TextureLoader().loadAsync(src); } catch { say('Imagem indisponível'); renderer.dispose(); cv.remove(); return; }
      tex.colorSpace = THREE.NoColorSpace; tex.minFilter = THREE.LinearFilter; tex.generateMipmaps = false;
      U.uImg.value = tex; U.uImgAr.value = tex.image.width / tex.image.height;
      const mat = new THREE.ShaderMaterial({
        uniforms: U,
        vertexShader: 'void main(){gl_Position=vec4(position.xy,0.,1.);}',
        fragmentShader: `
precision highp float;
uniform vec2 uRes;uniform float uTime;uniform vec2 uMouse;uniform sampler2D uImg;uniform float uImgAr;uniform vec3 uInk,uOrange,uPaper;
float h(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
void main(){
 vec2 uv=gl_FragCoord.xy/uRes;float ar=uRes.x/uRes.y;
 vec2 d=(uv-uMouse)*vec2(ar,1.);float r=length(d);
 float wave=sin(r*38.-uTime*2.4)*exp(-r*r*9.)*.006;
 vec2 st=uv+normalize(d+1e-5)*wave;
 vec2 c=st-.5;if(ar>uImgAr)c.y*=uImgAr/ar;else c.x*=ar/uImgAr;
 vec3 img=texture2D(uImg,c+.5).rgb;
 float lum=dot(img,vec3(.299,.587,.114));
 float lamp=exp(-r*r*5.)+.55*exp(-r*r*1.2);
 vec3 dark=mix(uInk,img,.16);
 vec3 lit=img*1.18+uOrange*.22*lum;
 vec3 col=mix(dark,lit,clamp(lamp,0.,1.));
 col+=uOrange*.16*exp(-r*r*14.);
 col=mix(col,uPaper,smoothstep(.72,1.,lum)*exp(-r*r*6.)*.18);
 col+=(h(gl_FragCoord.xy+fract(uTime)*97.)-.5)*.055;
 gl_FragColor=vec4(col,1.);
}`
      });
      scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat));
      const size = () => { const r = gl.getBoundingClientRect(), pr = renderer.getPixelRatio(); renderer.setSize(r.width, r.height, false); U.uRes.value.set(r.width * pr, r.height * pr); };
      size(); gl.classList.add('gl-on');
      let frames = 0, raf = 0, vis = false, t0 = performance.now(), tAcc = 0;
      const target = new THREE.Vector2(.62, .5); let idle = true;
      const draw = () => { renderer.render(scene, cam); frames++; fr.textContent = frames.toLocaleString('pt-BR'); gl.dataset.frames = frames; };
      const loop = now => { raf = requestAnimationFrame(loop); const dt = Math.min(64, now - t0); t0 = now; tAcc += dt / 1000; U.uTime.value = tAcc;
        if (idle) target.set(.62 + Math.sin(tAcc * .23) * .2, .5 + Math.sin(tAcc * .31) * .16);
        U.uMouse.value.lerp(target, .06); draw(); };
      const sync = () => {
        const go = vis && !document.hidden && !calm();
        if (go && !raf) { t0 = performance.now(); raf = requestAnimationFrame(loop); say('Rodando'); }
        else if (!go && raf) { cancelAnimationFrame(raf); raf = 0; }
        if (!go) say(calm() ? 'Quadro parado' : document.hidden ? 'Pausado · aba oculta' : 'Pausado fora da tela');
      };
      new IntersectionObserver(es => { vis = es[es.length - 1].isIntersecting; sync(); }).observe(gl);
      document.addEventListener('visibilitychange', sync);
      calmQ.addEventListener('change', () => { sync(); if (calm()) draw(); });
      new ResizeObserver(() => { size(); if (!raf) draw(); }).observe(gl);
      new MutationObserver(() => requestAnimationFrame(() => { colors(); if (!raf) draw(); })).observe(html, { attributes: true, attributeFilter: ['data-theme'] });
      gl.addEventListener('pointermove', e => { const r = gl.getBoundingClientRect(); idle = false; target.set((e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height); });
      gl.addEventListener('pointerleave', () => { idle = true; });
      if (calm()) { U.uMouse.value.copy(target); draw(); }
      sync();
    }
  }
}
