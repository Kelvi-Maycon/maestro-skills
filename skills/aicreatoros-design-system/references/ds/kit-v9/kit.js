(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
/* tema: o botão .tema alterna data-theme="dark" no <html> e grava a escolha (aios-tema). O script do <head> aplica a escolha antes do primeiro paint; a troca de ícone é CSS */
const html=document.documentElement,temas=$$('.tema');let trocaT;
const temaSync=()=>{const d=html.dataset.theme==='dark';temas.forEach(b=>{b.setAttribute('aria-label',d?'Ativar modo claro':'Ativar modo escuro')})};
temas.forEach(b=>b.addEventListener('click',()=>{const d=html.dataset.theme!=='dark';
if(!matchMedia('(prefers-reduced-motion: reduce)').matches){html.classList.add('tema-troca');clearTimeout(trocaT);trocaT=setTimeout(()=>html.classList.remove('tema-troca'),200)}
if(d)html.dataset.theme='dark';else delete html.dataset.theme;try{localStorage.setItem('aios-tema',d?'dark':'light')}catch(e){}temaSync()}));
temaSync();
const links=$$('.top nav a'),byId=new Map(links.map(a=>[a.hash.slice(1),a]));
const io=new IntersectionObserver(es=>{es.forEach(e=>{if(!e.isIntersecting)return;const k=e.target.dataset.part||e.target.id;if(!byId.has(k))return;links.forEach(a=>a.classList.remove('on'));byId.get(k).classList.add('on')})},{rootMargin:'-25% 0px -65% 0px'});
$$('section[id]').forEach(s=>io.observe(s));
const bar=$('#prog');
if(bar){const set=()=>{const h=document.documentElement;const m=h.scrollHeight-h.clientHeight;bar.style.width=(m>0?Math.min(1,h.scrollTop/m)*100:0)+'%'};addEventListener('scroll',set,{passive:true});addEventListener('resize',set);set()}
$$('[role=switch]').forEach(b=>b.addEventListener('click',()=>b.setAttribute('aria-checked',String(b.getAttribute('aria-checked')!=='true'))));
$$('[data-group]').forEach(g=>g.addEventListener('click',e=>{const b=e.target.closest('button[aria-pressed]');if(!b||!g.contains(b))return;$$('button[aria-pressed]',g).forEach(x=>x.setAttribute('aria-pressed',String(x===b)));g.dispatchEvent(new CustomEvent('pick',{detail:b.dataset}))}));
const ws=$('#ws');
if(ws){const panels=$$('[data-panel]',ws),crumb=$('#crumb');
const show=v=>{panels.forEach(p=>p.hidden=p.dataset.panel!==v);$$('.rail [data-view],.menu [data-view]',ws).forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.view===v)));if(v!=='acervo')$$('.menu [data-cat]',ws).forEach(b=>b.setAttribute('aria-pressed','false'));crumb.textContent=v==='editor'?'Rascunhos':'Acervo'};
ws.addEventListener('click',e=>{const b=e.target.closest('[data-view],[data-cat]');if(b)show(b.dataset.view||'acervo')});
$('#cats').addEventListener('pick',e=>{const c=e.detail.cat;$$('#minis .mini').forEach(m=>m.hidden=c!=='all'&&m.dataset.cat!==c)});
$('#vt').addEventListener('pick',e=>$('#acervo-view').classList.toggle('as-list',e.detail.mode==='list'));}
$$('[role=tablist]').forEach(t=>t.addEventListener('click',e=>{const b=e.target.closest('[role=tab]');if(b)$$('[role=tab]',t).forEach(x=>x.setAttribute('aria-selected',String(x===b)))}));
const dens=$('#dens');if(dens)$('[data-group=densidade]',dens).addEventListener('pick',e=>{const d=e.detail.d;if(d)dens.dataset.density=d;else delete dens.dataset.density});
$$('[data-group=funil]').forEach(g=>g.addEventListener('pick',e=>$$('.funnel-value',g.closest('.card')).forEach(v=>v.textContent=v.dataset[e.detail.show])));
const ta=$('#ta'),wc=$('#wc');if(ta){const f=()=>wc.textContent=(ta.value.trim().match(/\S+/g)||[]).length+' palavras';ta.addEventListener('input',f);f()}
$$('form').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();const ok=$('[data-ok]',f);if(ok)ok.hidden=false}));
/* movimento: peças crescem ao entrar na tela; números contam até o valor. Sem JS ou com reduced-motion, tudo aparece pronto */
const calm=matchMedia('(prefers-reduced-motion: reduce)').matches;
const ANIM='.hbars,.share,.funnel,.meter,.track,.spark,.chart,.pips,.ring,.sparkline,.stackbar';
const COUNT='.metric,.ledger dd:not(.cmp),[data-count]';
const tok=(n,f)=>{const v=getComputedStyle(html).getPropertyValue(n).trim(),x=parseFloat(v);return isFinite(x)?(/ms$/.test(v)?x:x*1000):f};
/* número pt-BR: prefixo e sufixo ficam; ponto de milhar só se o valor final tem; casas decimais do valor final */
const count=el=>{const w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);let t;while((t=w.nextNode())&&!/\d/.test(t.textContent));if(!t)return;
const raw=t._raw||(t._raw=t.textContent),m=raw.match(/^([^\d]*?)(\d{1,3}(?:\.\d{3})+|\d+)(?:,(\d+))?([\s\S]*)$/);if(!m)return;
const d=(m[3]||'').length,end=parseFloat(m[2].replace(/\./g,'')+'.'+(m[3]||'0')),grp=m[2].includes('.');
const fmt=v=>{const[i,f]=v.toFixed(d).split('.');return m[1]+(grp?i.replace(/\B(?=(\d{3})+(?!\d))/g,'.'):i)+(f?','+f:'')+m[4]};
if(!el._c)el.style.minWidth=el.getBoundingClientRect().width+'px';const id=el._c=(el._c||0)+1,t0=performance.now(),dur=tok('--dur-draw',800);
const step=now=>{if(el._c!==id)return;const k=Math.min(1,(now-t0)/dur),e=1-Math.pow(1-k,3);t.textContent=fmt(end*e);if(k<1)requestAnimationFrame(step);else{t.textContent=raw;el.style.minWidth='';el._c=0}};requestAnimationFrame(step)};
/* primitivas de movimento (Kit, capítulo 15): entram uma vez ao aparecer; data-stagger no pai põe os filhos em cascata de --stagger */
const REVEAL='[data-reveal],[data-split],[data-draw]';
const split=el=>{const label=el.textContent.replace(/\s+/g,' ').trim();let n=0;
const walk=(from,into)=>from.childNodes.forEach(c=>{if(c.nodeType===3){c.textContent.split(/(\s+)/).forEach(p=>{if(!p)return;if(!p.trim()){into.append(' ');return}
const sw=document.createElement('span'),si=document.createElement('span');sw.className='split-w';si.className='split-i';si.style.setProperty('--wi',n++);si.textContent=p;sw.append(si);into.append(sw)})}
else if(c.nodeType===1){if(c.tagName==='BR'){into.append(c.cloneNode());return}const k=c.cloneNode(false);walk(c,k);into.append(k)}});
const box=document.createElement('span');box.setAttribute('aria-hidden','true');walk(el,box);el.replaceChildren(box);el.setAttribute('aria-label',label)};
const replay=root=>{if(calm||!root)return;const els=[root,...root.querySelectorAll('*')];els.filter(e=>e.matches(REVEAL)).forEach(e=>e.classList.remove('is-in'));void root.offsetWidth;
els.filter(e=>e.matches(REVEAL)).forEach(e=>e.classList.add('is-in'));els.filter(e=>e.matches(COUNT)).forEach(count)};
window.aiosMovimento={replay,count,calm};
if(!calm&&'IntersectionObserver' in window){const dashed=new Set($$('[data-draw]').filter(e=>getComputedStyle(e).strokeDasharray!=='none'));
document.documentElement.classList.add('js-anim');
$$(ANIM).forEach(a=>[...a.querySelectorAll(':scope>i,.funnel-bar i,.chart-bars i')].forEach((x,i)=>x.style.setProperty('--i',i)));
const seen=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target;seen.unobserve(el);if(el.matches(COUNT))count(el);else el.classList.add('in')}),{rootMargin:'0px 0px -8% 0px'});
$$(ANIM).forEach(el=>seen.observe(el));$$(COUNT).forEach(el=>{if(!el.closest('.slide'))seen.observe(el)});
$$('[data-split]').forEach(split);
dashed.forEach(e=>e.classList.add('is-in'));$$('[data-draw]').forEach(e=>{if(!dashed.has(e))e.setAttribute('pathLength','1')});
/* traço de SVG é observado pelo <svg> dono: um path recortado ou sem área nunca cruzaria a tela sozinho */
const own=new Map(),rv=new IntersectionObserver(es=>{const hit=es.filter(e=>e.isIntersecting).map(e=>e.target).sort((a,b)=>a.compareDocumentPosition(b)&4?-1:1),k=new Map();
hit.forEach(t=>{rv.unobserve(t);(own.get(t)||[]).forEach(el=>{const g=el.parentElement&&el.parentElement.closest('[data-stagger]'),i=g?(k.get(g)||0):0;if(g)k.set(g,i+1);el.style.setProperty('--si',Math.min(i,12));el.classList.add('is-in')})})},{rootMargin:'0px 0px -8% 0px'});
$$(REVEAL).forEach(el=>{if(el.classList.contains('is-in'))return;const t=el.matches('[data-draw]')&&el.ownerSVGElement||el;if(!own.has(t)){own.set(t,[]);rv.observe(t)}own.get(t).push(el)});
/* data-scrub: --p de 0 (bloco entrando por baixo) a 1 (saindo por cima), na janela ou no contêiner que rola; só atualiza o que está na tela */
const scrubs=$$('[data-scrub]');if(scrubs.length){const live=new Set(),port=new Map();
const portOf=el=>{for(let p=el.parentElement;p&&p!==document.body;p=p.parentElement){const o=getComputedStyle(p).overflowY;if(/auto|scroll/.test(o)&&p.scrollHeight>p.clientHeight)return p}return null};
let raf=0;const upd=()=>{raf=0;live.forEach(el=>{if(!port.has(el))port.set(el,portOf(el));const v=port.get(el),r=el.getBoundingClientRect(),top=v?v.getBoundingClientRect().top:0,h=v?v.clientHeight:innerHeight;
el.style.setProperty('--p',Math.min(1,Math.max(0,(top+h-r.top)/(h+r.height))).toFixed(3))})};const req=()=>{if(!raf)raf=requestAnimationFrame(upd)};
const sio=new IntersectionObserver(es=>{es.forEach(e=>e.isIntersecting?live.add(e.target):live.delete(e.target));req()});scrubs.forEach(s=>sio.observe(s));
addEventListener('scroll',req,{passive:true,capture:true});addEventListener('resize',()=>{port.clear();req()})}
/* data-spot e data-tilt: só com ponteiro fino que passa por cima. --spot-a no style do elemento vira a luz de repouso */
if(matchMedia('(hover:hover) and (pointer:fine)').matches){
const follow=(el,fn)=>{let f=0,x=0,y=0;el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();x=(e.clientX-r.left)/r.width;y=(e.clientY-r.top)/r.height;if(!f)f=requestAnimationFrame(()=>{f=0;fn(x,y,r)})})};
$$('[data-spot]').forEach(el=>{const rest=el.style.getPropertyValue('--spot-a')||0;follow(el,(x,y,r)=>{el.style.setProperty('--mx',(x*r.width).toFixed(0)+'px');el.style.setProperty('--my',(y*r.height).toFixed(0)+'px')});
el.addEventListener('pointerenter',()=>el.style.setProperty('--spot-a',1));el.addEventListener('pointerleave',()=>el.style.setProperty('--spot-a',rest))});
$$('[data-tilt]').forEach(el=>{follow(el,(x,y)=>{el.classList.add('tilt-live');el.style.setProperty('--rx',((.5-y)*12).toFixed(2)+'deg');el.style.setProperty('--ry',((x-.5)*12).toFixed(2)+'deg')});
el.addEventListener('pointerleave',()=>{el.classList.remove('tilt-live');el.style.setProperty('--rx','0deg');el.style.setProperty('--ry','0deg')})})}
/* .ticker: duplica os itens (cópia escondida do leitor de tela) para o loop sem emenda; roda só na tela e pausa no hover e no foco */
const tio=new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle('is-on',e.isIntersecting)));
$$('.ticker').forEach(t=>{const tr=$('.ticker-track',t);if(!tr||!tr.children.length)return;[...tr.children].forEach(c=>{const k=c.cloneNode(true);k.setAttribute('aria-hidden','true');k.querySelectorAll('a,button,[tabindex]').forEach(a=>a.tabIndex=-1);if(k.matches('a,button'))k.tabIndex=-1;tr.append(k)});
t.classList.add('is-loop');const sp=+(t.dataset.speed||60),set=()=>t.style.setProperty('--ticker-dur',Math.max(8,tr.scrollWidth/2/sp).toFixed(1)+'s');set();new ResizeObserver(set).observe(t);tio.observe(t)})}
/* indicador deslizante no segmentado e nas abas */
const slide=(box,item,on,cls)=>{const ind=document.createElement('i');ind.className=cls;ind.setAttribute('aria-hidden','true');box.prepend(ind);box.classList.add('has-ind');
const place=()=>{const b=box.querySelector(on);if(!b){ind.style.opacity=0;return}ind.style.opacity=1;ind.style.setProperty('--x',b.offsetLeft+'px');ind.style.setProperty('--w',b.offsetWidth+'px')};
place();requestAnimationFrame(()=>ind.classList.add('ready'));box.addEventListener('click',e=>{if(e.target.closest(item))requestAnimationFrame(place)});new ResizeObserver(place).observe(box);$$(item,box).forEach(b=>new ResizeObserver(place).observe(b))};
$$('.seg').forEach(g=>slide(g,'button','[aria-pressed=true]','seg-ind'));
$$('.tabs').forEach(t=>slide(t,'[role=tab]','[aria-selected=true]','tabs-ind'));
/* tabela longa: data-limit mostra as primeiras linhas e cria o rodapé "Mostrar mais" (data-step linhas por clique) */
$$('table[data-limit]').forEach(tb=>{const body=tb.tBodies[0],lim=+tb.dataset.limit,step=+(tb.dataset.step||lim);let shown=lim;
const more=document.createElement('div');more.className='tbl-more';(tb.closest('.tbl')||tb).after(more);
const apply=()=>{const rows=[...body.rows],n=rows.length,vis=Math.min(shown,n);rows.forEach((r,i)=>r.hidden=i>=vis);
more.innerHTML=n<=lim?'':vis<n?`<span>Mostrando ${vis} de ${n}</span><button type="button">Mostrar mais ${Math.min(step,n-vis)}</button>`:`<span>Mostrando ${n} de ${n}</span><button type="button" data-less>Mostrar menos</button>`;more.hidden=!more.innerHTML};
more.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;shown=b.hasAttribute('data-less')?lim:shown+step;apply()});tb._limit=apply;apply()});
/* tabela: ordenar pelo cabeçalho (linhas deslizam para a nova posição) e selecionar linhas */
$$('table[data-sortable]').forEach(tb=>{const body=tb.tBodies[0];
tb.tHead.addEventListener('click',e=>{const b=e.target.closest('.th-sort');if(!b)return;const th=b.closest('th'),col=+b.dataset.col;const cur=th.getAttribute('aria-sort'),dir=cur?(cur==='descending'?'ascending':'descending'):(th.classList.contains('num')?'descending':'ascending');
$$('th[aria-sort]',tb.tHead).forEach(x=>x.removeAttribute('aria-sort'));th.setAttribute('aria-sort',dir);
const rows=[...body.rows],top=new Map(rows.map(r=>[r,r.getBoundingClientRect().top]));const val=r=>{const v=r.cells[col].dataset.v;return isNaN(v)?v:+v};
const na=r=>r.cells[col].classList.contains('na');rows.sort((a,c)=>{if(na(a)!==na(c))return na(a)-na(c);const x=val(a),y=val(c);const k=typeof x==='number'?x-y:String(x).localeCompare(y,'pt-BR');return dir==='ascending'?k:-k}).forEach(r=>body.append(r));if(tb._limit)tb._limit();
if(calm)return;rows.forEach(r=>{if(r.hidden||!top.get(r))return;const dy=top.get(r)-r.getBoundingClientRect().top;if(!dy)return;r.classList.remove('moving');r.style.transform=`translateY(${dy}px)`;requestAnimationFrame(()=>{r.classList.add('moving');r.style.transform=''})})});
const all=$('[data-all]',tb),boxes=$$('tbody input[type=checkbox]',tb),dono=tb.closest('.pn,.card')||document,note=$('[data-sel-count]',dono),barra=$('.sel-barra',dono);
const sync=()=>{const n=boxes.filter(x=>x.checked).length;boxes.forEach(x=>x.closest('tr').setAttribute('aria-selected',String(x.checked)));if(all){all.checked=n===boxes.length;all.indeterminate=n>0&&n<boxes.length}if(note)note.innerHTML=`<b>${n}</b> de ${boxes.length} ${n===1?'selecionada':'selecionadas'}`;if(barra){barra.hidden=!n;const bn=$('[data-sel-n]',barra);if(bn)bn.innerHTML=`<b>${n}</b> ${n===1?'selecionada':'selecionadas'}`}};
boxes.forEach(x=>x.addEventListener('change',sync));if(all)all.addEventListener('change',()=>{boxes.forEach(x=>x.checked=all.checked);sync()});
/* clicar na linha seleciona (fora de botão, link e campo); Limpar seleção na barra .sel-barra zera */
if(boxes.length)body.addEventListener('click',e=>{if(e.target.closest('a,button,input,label,select,textarea'))return;const b=$('input[type=checkbox]',e.target.closest('tr')||document.createElement('tr'));if(b){b.checked=!b.checked;sync()}});
if(barra){const lp=$('[data-sel-limpar]',barra);if(lp)lp.addEventListener('click',()=>{boxes.forEach(x=>x.checked=false);sync()})}sync()});
/* sumário: o item da seção na tela ganha aria-current (scrollspy) */
$$('.sumario').forEach(nav=>{const links=$$('ol a[href^="#"]',nav),alvos=links.map(a=>document.getElementById(decodeURIComponent(a.hash.slice(1)))).filter(Boolean);if(!alvos.length||!('IntersectionObserver' in window))return;
const marca=id=>links.forEach(a=>a.hash==='#'+id?a.setAttribute('aria-current','true'):a.removeAttribute('aria-current'));
const io=new IntersectionObserver(es=>{const v=es.filter(x=>x.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top)[0];if(v)marca(v.target.id)},{rootMargin:'0px 0px -60% 0px'});alvos.forEach(a=>io.observe(a))});
/* rótulos sem colisão: meta da escala do .meter e da trilha .track ficam dentro da peça e nunca encostam no vizinho (a margem de 8 px vale como colisão) */
const hit=(a,b)=>a.right+8>b.left&&a.left-8<b.right;
const fit=()=>{$$('.meter .scale').forEach(sc=>{const b=$(':scope>b',sc);if(!b)return;const ends=$$(':scope>span',sc);b.style.translate='';ends.forEach(x=>x.style.visibility='');
const S=sc.getBoundingClientRect();let r=b.getBoundingClientRect();if(r.left<S.left)b.style.translate='0 0';else if(r.right>S.right)b.style.translate='-100% 0';r=b.getBoundingClientRect();ends.forEach(x=>{if(hit(x.getBoundingClientRect(),r))x.style.visibility='hidden'})});
$$('.track').forEach(t=>{const sp=$('.target span',t),fb=$('.fill b',t);if(!sp)return;const T=t.getBoundingClientRect(),cs=getComputedStyle(t),pc=v=>parseFloat(cs.getPropertyValue(v))/100*T.width+T.left;
const gx=pc('--g'),ws=sp.getBoundingClientRect().width,box=k=>({left:gx-ws*k,right:gx+ws*(1-k)});let k=.5;if(gx-ws/2<T.left)k=0;else if(gx+ws/2>T.right)k=1;
if(fb){fb.style.visibility='';const vx=pc('--v'),wb=fb.getBoundingClientRect().width,q={left:vx-wb/2,right:vx+wb/2};if(hit(q,box(k))){k=vx<gx?0:1;if(hit(q,box(k)))fb.style.visibility='hidden'}}
sp.style.transform=`translateX(${-k*100}%)`})};
fit();addEventListener('resize',fit);if(document.fonts)document.fonts.ready.then(fit);
})();
