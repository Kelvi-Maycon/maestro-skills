/* @ds-bundle: {"format":4,"namespace":"AiCreatorOSDesignSystem_a9067e","components":[{"name":"Wordmark"},{"name":"Icon"},{"name":"Anchor"},{"name":"Label"},{"name":"Button"},{"name":"IconButton"},{"name":"Link"},{"name":"Input"},{"name":"Select"},{"name":"Switch"},{"name":"Checkbox"},{"name":"ChipGroup"},{"name":"Segmented"},{"name":"Tabs"},{"name":"Kbd"},{"name":"Badge"},{"name":"Status"},{"name":"Delta"},{"name":"Toast"},{"name":"Banner"},{"name":"Tooltip"},{"name":"Dialog"},{"name":"Meter"},{"name":"EmptyState"},{"name":"Skeleton"},{"name":"Card"},{"name":"Row"},{"name":"Quote"},{"name":"Note"},{"name":"Avatar"},{"name":"Reader"},{"name":"Spec"},{"name":"Slide"},{"name":"DataPanel"},{"name":"Ledger"},{"name":"TargetTrack"},{"name":"Metric"},{"name":"Stat"},{"name":"Stats"},{"name":"Spark"},{"name":"Ring"},{"name":"Pips"},{"name":"Sparkline"},{"name":"Chart"},{"name":"StackBar"},{"name":"Breakdown"},{"name":"Insight"},{"name":"Legend"},{"name":"HBars"},{"name":"Funnel"},{"name":"Panel"},{"name":"SecHead"},{"name":"Toolbar"},{"name":"Table"},{"name":"Workspace"},{"name":"Rail"},{"name":"Menu"},{"name":"ContentPanel"},{"name":"MiniGrid"},{"name":"Mini"},{"name":"Editor"},{"name":"Log"}]} */
(function () {
  'use strict';
  var React = window.React;
  var h = React.createElement;
  var useState = React.useState;
  var useId = React.useId;
  var useRef = React.useRef;
  var useEffect = React.useEffect;
  var Fragment = React.Fragment;

  /* Geometria copiada do sprite do kit (Kit Completo.html, 19 <symbol> i-*, viewBox 24). */
  var ICONS = {"arrow":[["path",{"d":"M5 12h14"}],["path",{"d":"M13 6l6 6-6 6"}]],"back":[["path",{"d":"M19 12H5"}],["path",{"d":"M11 18l-6-6 6-6"}]],"diag":[["path",{"d":"M7 17 17 7"}],["path",{"d":"M8 7h9v9"}]],"down":[["path",{"d":"M6 9l6 6 6-6"}]],"plus":[["path",{"d":"M12 5v14"}],["path",{"d":"M5 12h14"}]],"search":[["circle",{"cx":11,"cy":11,"r":6}],["path",{"d":"m20 20-4.3-4.3"}]],"grid":[["rect",{"x":4,"y":4,"width":7,"height":7}],["rect",{"x":13,"y":4,"width":7,"height":7}],["rect",{"x":4,"y":13,"width":7,"height":7}],["rect",{"x":13,"y":13,"width":7,"height":7}]],"pen":[["path",{"d":"M4 20h4l11-11-4-4L4 16z"}],["path",{"d":"M14 5l4 4"}]],"clock":[["circle",{"cx":12,"cy":12,"r":8}],["path",{"d":"M12 7v5l3 2"}]],"alert":[["path",{"d":"M12 4 2 20h20z"}],["path",{"d":"M12 11v4"}],["circle",{"cx":12,"cy":17.5,"r":1.1,"fill":"currentColor","stroke":"none"}]],"image":[["rect",{"x":3,"y":5,"width":18,"height":14,"rx":2}],["circle",{"cx":9,"cy":10,"r":1.5,"fill":"currentColor","stroke":"none"}],["path",{"d":"M21 16l-5-5-9 8"}]],"sliders":[["path",{"d":"M4 7h10"}],["circle",{"cx":17,"cy":7,"r":2}],["path",{"d":"M4 17h6"}],["circle",{"cx":13,"cy":17,"r":2}],["path",{"d":"M16 17h4"}]],"save":[["path",{"d":"M6 4h12v17l-6-4-6 4z"}],["circle",{"cx":12,"cy":11,"r":1.4,"fill":"currentColor","stroke":"none"}]],"doc":[["path",{"d":"M7 3h7l5 5v13H7z"}],["path",{"d":"M14 3v5h5"}],["path",{"d":"M10 13h7"}],["path",{"d":"M10 17h5"}]],"layers":[["path",{"d":"M12 4 3 9l9 5 9-5z"}],["path",{"d":"M3 14l9 5 9-5"}]],"settings":[["circle",{"cx":12,"cy":12,"r":3}],["path",{"d":"M12 2v3"}],["path",{"d":"M12 19v3"}],["path",{"d":"M4.2 4.2l2.1 2.1"}],["path",{"d":"M17.7 17.7l2.1 2.1"}],["path",{"d":"M2 12h3"}],["path",{"d":"M19 12h3"}],["path",{"d":"M4.2 19.8l2.1-2.1"}],["path",{"d":"M17.7 6.3l2.1-2.1"}]],"ruler":[["path",{"d":"M3 17 17 3l4 4L7 21z"}],["path",{"d":"M7 7l2 2"}],["path",{"d":"M10 4l2 2"}],["path",{"d":"M13 9l2 2"}],["path",{"d":"M9 13l2 2"}]],"mail":[["rect",{"x":2,"y":4,"width":20,"height":16,"rx":2}],["path",{"d":"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"}]],"list":[["path",{"d":"M8 6h13"}],["path",{"d":"M8 12h13"}],["path",{"d":"M8 18h13"}],["path",{"d":"M3 6h.01"}],["path",{"d":"M3 12h.01"}],["path",{"d":"M3 18h.01"}]],"moon":[["path",{"d":"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"}]],"sun":[["circle",{"cx":12,"cy":12,"r":4}],["path",{"d":"M12 2v2"}],["path",{"d":"M12 20v2"}],["path",{"d":"m4.93 4.93 1.41 1.41"}],["path",{"d":"m17.66 17.66 1.41 1.41"}],["path",{"d":"M2 12h2"}],["path",{"d":"M20 12h2"}],["path",{"d":"m6.34 17.66-1.41 1.41"}],["path",{"d":"m19.07 4.93-1.41 1.41"}]]};

  function cx() {
    var out = [];
    for (var i = 0; i < arguments.length; i++) if (arguments[i]) out.push(arguments[i]);
    return out.join(' ') || undefined;
  }
  function rest(p, keys) {
    var o = {};
    for (var k in p) if (Object.prototype.hasOwnProperty.call(p, k) && keys.indexOf(k) < 0) o[k] = p[k];
    return o;
  }
  function el(type, props, kids) { return h.apply(null, [type, props].concat(kids)); }
  function isText(v) { return typeof v === 'string' || typeof v === 'number'; }
  function clamp(v) { v = Number(v) || 0; return v < 0 ? 0 : v > 100 ? 100 : v; }
  function opts(list) {
    return (list || []).map(function (o) { return isText(o) ? { value: String(o), label: String(o) } : o; });
  }
  function pct(v) { return Math.round(v * 10) / 10 + '%'; }
  function fmtPct(v) { return v.toFixed(1).replace('.', ',') + '%'; }
  function maxOf(list) { return Math.max.apply(null, list.concat([0])) || 1; }
  /* Acrescenta uma classe a um elemento já pronto (Badge, Delta, Meter…) sem trocar o resto. */
  function withClass(node, cls) {
    return React.isValidElement(node) ? React.cloneElement(node, { className: cx(cls, node.props.className) }) : node;
  }

  /* ── Marca ─────────────────────────────────────────── */

  /* Com label, o ícone carrega significado: role img e aria-label no lugar de aria-hidden. */
  function Icon(p) {
    var parts = ICONS[p.name];
    if (!parts) return null;
    var style = p.size ? Object.assign({ width: p.size + 'px', height: p.size + 'px' }, p.style) : p.style;
    return el('svg', Object.assign(rest(p, ['name', 'size', 'style', 'className', 'label']), {
      className: cx('i', p.className), viewBox: '0 0 24 24', style: style
    }, p.label ? { role: 'img', 'aria-label': p.label } : { 'aria-hidden': 'true' }), parts.map(function (part, i) { return h(part[0], Object.assign({ key: i }, part[1])); }));
  }

  /* Símbolo: três círculos de raio 3 · 5 · 8 (symbol #mark do kit). */
  function MarkSvg(p) {
    return h('svg', { className: (p && p.className) || 'mark', viewBox: '0 0 40 16', 'aria-hidden': 'true', style: p && p.style },
      h('circle', { cx: 3, cy: 8, r: 3, fill: 'var(--m1,#F05A37)' }),
      h('circle', { cx: 15, cy: 8, r: 5, fill: 'var(--m2,#8D8B86)' }),
      h('circle', { cx: 32, cy: 8, r: 8, fill: 'var(--m3,#1D1D1B)' }));
  }

  function Wordmark(p) {
    var showMark = p.mark !== false, showWord = p.word !== false;
    var word = showWord ? h('span', { className: showMark ? 'wordmark' : cx('wordmark', p.className), style: p.size ? { fontSize: p.size + 'px' } : undefined }, 'aicreator', h('em', null, 'os')) : null;
    if (showMark && showWord) return h('span', Object.assign(rest(p, ['mark', 'word', 'size', 'className']), { className: cx('brand', p.className) }), h(MarkSvg), word);
    if (showMark) return h(MarkSvg, { className: cx('mark', p.className), style: p.style });
    return word;
  }

  function Anchor(p) {
    return h('div', Object.assign(rest(p, ['number', 'label', 'dots', 'className']), { className: cx('anchor', p.className) }),
      h('b', null, p.number),
      h('span', { className: 'mono' }, p.label),
      h('span', { className: 'hr' }),
      p.dots === false ? null : h(MarkSvg, { className: 'dots' }));
  }

  function Label(p) {
    var meta = p.meta;
    return h('div', Object.assign(rest(p, ['label', 'meta', 'className']), { className: cx('lbl', p.className) }),
      h('span', { className: 'mono' }, p.label),
      h('span', { className: 'hr' }),
      meta == null ? null : isText(meta) ? h('span', { className: 'mono' }, meta) : meta);
  }

  /* ── Ações ─────────────────────────────────────────── */

  var SIZE = { sm: 'sm', lg: 'lg' };
  function Button(p) {
    var variant = p.variant || 'line', size = SIZE[p.size];
    var cls = cx('btn', size && 'btn-' + size, 'btn-' + variant, p.iconOnly && 'btn-icon', p.busy && 'busy', p.className);
    var kids = p.iconOnly ? [h(Icon, { key: 'o', name: p.icon || p.iconStart || 'plus' })] : [
      p.iconStart && !p.busy ? h(Icon, { key: 's', name: p.iconStart }) : null,
      p.children,
      p.icon && !p.busy ? h(Icon, { key: 'e', name: p.icon }) : null
    ];
    var base = rest(p, ['variant', 'size', 'icon', 'iconStart', 'iconOnly', 'label', 'busy', 'className', 'children', 'type']);
    if (p.iconOnly) base['aria-label'] = p.label;
    if (p.href) return el('a', Object.assign(base, { className: cls }), kids);
    return el('button', Object.assign({ type: p.type || 'button' }, base, { className: cls, 'aria-busy': p.busy ? 'true' : undefined }), kids);
  }

  function IconButton(p) {
    var cls = cx('ico', SIZE[p.size] && 'ico-' + p.size, p.variant === 'primary' && 'ico-orange', p.className);
    var base = Object.assign(rest(p, ['icon', 'variant', 'size', 'label', 'className', 'type']), { className: cls, 'aria-label': p.label });
    var icon = h(Icon, { name: p.icon || 'arrow' });
    if (p.href) return h('a', base, icon);
    return h('button', Object.assign({ type: p.type || 'button' }, base), icon);
  }

  function Link(p) {
    return h('a', Object.assign(rest(p, ['icon', 'className', 'children']), { className: cx('lnk', p.className) }),
      p.children, p.icon ? h(Icon, { name: p.icon }) : null);
  }

  /* ── Campos ────────────────────────────────────────── */

  function field(p, id, control) {
    var helpId = id + '-help';
    if (!p.label && !p.help && !p.error) return control;
    if (!p.help && !p.error) return h('label', { className: cx('field', p.className), style: p.style }, h('span', null, p.label), control);
    var msg = p.error
      ? h('span', { className: 'help err', id: helpId }, h(Icon, { name: 'alert', size: 16 }), p.error)
      : h('span', { className: 'help', id: helpId }, p.help);
    return h('div', { className: cx('field', p.className), style: p.style }, p.label ? h('label', { htmlFor: id }, p.label) : null, control, msg);
  }
  var FIELD_KEYS = ['label', 'icon', 'kbd', 'help', 'error', 'className', 'style', 'id', 'options'];

  function Input(p) {
    var auto = useId(), id = p.id || auto, wrapped = p.label || p.help || p.error;
    var input = h('input', Object.assign({ type: 'text' }, rest(p, FIELD_KEYS), {
      id: id, 'aria-invalid': p.error ? 'true' : undefined, 'aria-describedby': (p.help || p.error) ? id + '-help' : undefined
    }));
    var control = h('span', { className: cx('inp', p.error && 'err', !wrapped && p.className), style: wrapped ? undefined : p.style },
      p.icon ? h(Icon, { name: p.icon }) : null, input, p.kbd ? h('span', { className: 'kbd' }, p.kbd) : null);
    return field(p, id, control);
  }

  function Select(p) {
    var auto = useId(), id = p.id || auto, wrapped = p.label || p.help || p.error;
    var select = el('select', Object.assign(rest(p, FIELD_KEYS), {
      id: id, 'aria-invalid': p.error ? 'true' : undefined, 'aria-describedby': (p.help || p.error) ? id + '-help' : undefined
    }), opts(p.options).map(function (o) { return h('option', { key: o.value, value: o.value }, o.label); }));
    var control = h('span', { className: cx('inp', p.error && 'err', !wrapped && p.className), style: wrapped ? undefined : p.style },
      select, h(Icon, { name: 'down' }));
    return field(p, id, control);
  }

  function Switch(p) {
    var st = useState(!!p.defaultChecked), on = st[0];
    function toggle() { var next = !on; st[1](next); if (p.onChange) p.onChange(next); }
    var btn = h('button', {
      type: 'button', role: 'switch', className: cx('sw', !p.label && p.className), 'aria-checked': on ? 'true' : 'false',
      'aria-label': p.label || p['aria-label'], disabled: p.disabled, onClick: toggle
    });
    if (!p.label) return btn;
    return h('div', { className: cx('swrow', p.className), style: p.style }, h('span', null, p.label), btn);
  }

  function Checkbox(p) {
    return h('label', { className: cx('chk', p.className), style: p.style },
      h('input', Object.assign({ type: 'checkbox' }, rest(p, ['label', 'className', 'style', 'children']))),
      ' ', p.label != null ? p.label : p.children);
  }

  function ChipGroup(p) {
    var list = opts(p.options);
    var st = useState(p.defaultValue != null ? p.defaultValue : (list[0] && list[0].value));
    return el('div', { className: cx('chips', p.className), role: 'group', 'aria-label': p.label, style: p.style },
      list.map(function (o) {
        return h('button', {
          key: o.value, type: 'button', className: 'chip', 'aria-pressed': st[0] === o.value ? 'true' : 'false',
          onClick: function () { st[1](o.value); if (p.onChange) p.onChange(o.value); }
        }, o.icon ? h(Icon, { name: o.icon }) : null, o.label);
      }).concat(p.addLabel ? [h('button', { key: '+', type: 'button', className: 'chip chip-dash', onClick: p.onAdd }, h(Icon, { name: 'plus' }), p.addLabel)] : []));
  }

  function Segmented(p) {
    var list = opts(p.options);
    var st = useState(p.defaultValue != null ? p.defaultValue : (list[0] && list[0].value));
    return el('div', { className: cx('seg', p.className), role: 'group', 'aria-label': p.label, style: p.style },
      list.map(function (o) {
        return h('button', {
          key: o.value, type: 'button', 'aria-pressed': st[0] === o.value ? 'true' : 'false',
          onClick: function () { st[1](o.value); if (p.onChange) p.onChange(o.value); }
        }, o.icon ? h(Icon, { name: o.icon }) : null, o.label);
      }));
  }

  function Tabs(p) {
    var list = opts(p.options);
    var st = useState(p.defaultValue != null ? p.defaultValue : (list[0] && list[0].value));
    return el('div', { className: cx('tabs', p.className), role: 'tablist', 'aria-label': p.label, style: p.style },
      list.map(function (o) {
        return h('button', {
          key: o.value, type: 'button', className: 'tab', role: 'tab', 'aria-selected': st[0] === o.value ? 'true' : 'false',
          onClick: function () { st[1](o.value); if (p.onChange) p.onChange(o.value); }
        }, o.label, o.count != null ? h('b', null, o.count) : null);
      }));
  }

  function Kbd(p) {
    return h('span', Object.assign(rest(p, ['className']), { className: cx('kbd', p.className) }));
  }

  /* ── Feedback ──────────────────────────────────────── */

  var BADGE = { positive: 'badge-pos', live: 'badge-live', draft: 'badge-draft', warn: 'badge-warn', neg: 'badge-neg', info: 'badge-info' };
  function Badge(p) {
    return h('span', Object.assign(rest(p, ['tone', 'square', 'plain', 'className']), {
      className: cx('badge', BADGE[p.tone], p.square && 'badge-sq', p.plain && 'badge-plain', p.className)
    }));
  }

  /* Ponto de estado: sem texto, vira imagem com aria-label (item de menu, célula estreita). */
  var STATUS = { positive: 'status-pos', warn: 'status-warn', neg: 'status-neg', info: 'status-info', idle: 'status-idle', live: 'status-live' };
  function Status(p) {
    var bare = p.children == null || p.children === '';
    return h('span', Object.assign(bare ? { role: 'img', 'aria-label': p.label } : {}, rest(p, ['tone', 'label', 'className']), {
      className: cx('status', STATUS[p.tone], p.className)
    }));
  }

  /* direction dá a seta; tone (good, bad, plain) dá a cor quando descer é bom ou subir é ruim. */
  function Delta(p) {
    return h('span', Object.assign(rest(p, ['direction', 'tone', 'className']), {
      className: cx('delta', 'delta-' + (p.direction || 'up'), p.tone && 'delta-' + p.tone, p.className)
    }));
  }
  /* Aceita nó pronto ou { direction, tone, value }. */
  function deltaNode(d) {
    if (d == null || d === false) return null;
    if (typeof d === 'object' && !React.isValidElement(d) && !Array.isArray(d)) return h(Delta, { direction: d.direction, tone: d.tone }, d.value);
    return d;
  }

  /* positive: .toast-ok, ícone lima sobre a faixa de tinta. */
  function Toast(p) {
    return h('div', Object.assign({ role: 'status' }, rest(p, ['tone', 'icon', 'meta', 'className', 'children']), {
      className: cx('toast', p.tone === 'positive' && 'toast-ok', p.className)
    }),
      h(Icon, { name: p.icon || 'save' }),
      h('span', null, p.children),
      p.meta == null ? null : h('span', { className: 'mono' }, p.meta));
  }

  function Banner(p) {
    return h('div', Object.assign(rest(p, ['title', 'icon', 'className', 'children']), { className: cx('banner', p.className) }),
      h(Icon, { name: p.icon || 'alert' }),
      h('div', null, h('strong', null, p.title), p.children ? h('p', null, p.children) : null));
  }

  function Tooltip(p) {
    var tipId = useId();
    var st = useState(false), open = p.open || st[0];
    var child = React.isValidElement(p.children) ? React.cloneElement(p.children, { 'aria-describedby': tipId }) : p.children;
    return h('span', {
      className: cx('tipwrap', p.className),
      style: Object.assign(p.align === 'start' ? { justifyItems: 'start' } : {}, p.style),
      onMouseEnter: function () { st[1](true); }, onMouseLeave: function () { st[1](false); },
      onFocus: function () { st[1](true); }, onBlur: function () { st[1](false); }
    },
      h('span', { className: 'tip', role: 'tooltip', id: tipId, style: open ? undefined : { visibility: 'hidden' } }, p.label),
      child);
  }

  function Dialog(p) {
    var titleId = useId();
    var actions = p.actions !== undefined ? p.actions : [
      h(Button, { key: 'c', variant: 'line', onClick: p.onCancel }, p.cancelLabel || 'Cancelar'),
      h(Button, { key: 'ok', variant: 'primary', icon: 'arrow', onClick: p.onConfirm }, p.confirmLabel || 'Confirmar')
    ];
    return h('div', Object.assign({ role: 'dialog', 'aria-labelledby': titleId }, rest(p, ['kicker', 'title', 'actions', 'cancelLabel', 'confirmLabel', 'onCancel', 'onConfirm', 'className', 'children']), { className: cx('dialog', p.className) }),
      p.kicker ? h('span', { className: 'mono muted' }, p.kicker) : null,
      h('h4', { id: titleId }, p.title),
      p.children ? h('p', null, p.children) : null,
      el('div', { className: 'dialog-act' }, [].concat(actions)));
  }

  function Meter(p) {
    var v = clamp(p.value), goal = p.goal != null ? clamp(p.goal) : null;
    var scale = p.scale === true ? ['0', goal != null ? 'meta ' + goal + '%' : null, '100%'] : p.scale;
    return h('div', { className: cx('meter', p.className), style: goal != null ? Object.assign({ '--g': goal + '%' }, p.style) : p.style },
      p.label != null ? h('div', { className: 'rule-lbl', style: { color: 'var(--muted)' } },
        h('span', null, p.label), h('b', { style: { color: 'var(--ink)' } }, p.valueLabel != null ? p.valueLabel : v + '%')) : null,
      h('div', { className: cx('bar', p.small && 'bar-sm'), role: 'progressbar', 'aria-valuemin': 0, 'aria-valuemax': 100, 'aria-valuenow': v, 'aria-label': isText(p.label) ? String(p.label) : p['aria-label'] },
        h('span', { style: { width: v + '%' } }),
        goal != null ? h('i', { className: 'goal' }) : null),
      scale ? h('div', { className: 'scale' }, h('span', null, scale[0]), scale[1] != null ? h('b', null, scale[1]) : null, h('span', null, scale[2])) : null,
      p.caption ? h('span', { className: 'mono' }, p.caption) : null);
  }

  function EmptyState(p) {
    var error = p.tone === 'error';
    return h('div', Object.assign(rest(p, ['tone', 'icon', 'title', 'actions', 'className', 'style', 'children']), {
      className: cx('empty', p.className),
      style: error ? Object.assign({ borderColor: 'var(--orange)' }, p.style) : p.style
    }),
      h(Icon, { name: p.icon || (error ? 'alert' : 'doc') }),
      h('h4', null, p.title),
      p.children ? h('p', null, p.children) : null,
      p.actions || null);
  }

  function Skeleton(p) {
    var lines = p.lines == null ? 2 : p.lines, kids = [];
    if (p.media !== false) kids.push(h('i', { key: 'm', className: 'med' }));
    for (var i = 0; i < lines; i++) kids.push(h('i', { key: i, className: i === lines - 1 && lines > 1 ? 'sm' : undefined }));
    return el('div', { className: cx('skel', p.className), style: p.style, 'aria-busy': 'true', 'aria-label': p.label || 'Carregando' }, kids);
  }

  /* ── Leitura ───────────────────────────────────────── */

  function Avatar(p) {
    var tone = p.tone || 'ink';
    var style = p.size ? Object.assign({ width: p.size + 'px', height: p.size + 'px' }, p.style) : p.style;
    var cls = cx('avatar', p.mark && tone === 'ink' && 'ink', tone === 'orange' && 'orange', tone === 'paper' && 'paper', p.className);
    var body = p.src ? h('img', { src: p.src, alt: p.alt || '' }) : p.mark ? h(MarkSvg) : p.initial;
    return h('span', Object.assign(rest(p, ['initial', 'src', 'alt', 'mark', 'tone', 'size', 'className', 'style']), { className: cls, style: style }), body);
  }

  function Card(p) {
    var href = p.href || '#';
    return h('article', { className: cx('card acard', p.className), style: p.style },
      h('a', { className: 'media', href: href }, h('img', { src: p.image, alt: p.imageAlt || '', loading: 'lazy' }), p.tag ? h('span', { className: 'tag' }, p.tag) : null),
      h('div', { className: 'cbody' },
        p.meta ? h('span', { className: 'mono muted' }, p.meta) : null,
        h('h3', null, h('a', { href: href }, p.title)),
        p.children ? h('p', null, p.children) : null,
        h('div', { className: 'foot' },
          h('span', { className: 'mono' }, p.readTime),
          h(IconButton, { href: href, variant: 'primary', size: 'sm', label: p.actionLabel || 'Ler a matéria' }))));
  }

  function Row(p) {
    var href = p.href || '#';
    return h('article', { className: cx('card row', p.className), style: p.style },
      h('img', { src: p.image, alt: p.imageAlt || '', loading: 'lazy' }),
      h('div', null,
        p.kicker ? h('span', { className: 'mono' }, p.kicker) : null,
        h('h3', null, h('a', { href: href }, p.title)),
        p.children ? h('p', null, p.children) : null),
      h(IconButton, { href: href, size: 'sm', label: p.actionLabel || 'Ler' }));
  }

  function Quote(p) {
    return h('figure', { className: cx('card quote', p.className), style: p.style },
      p.kicker ? h('span', { className: 'mono muted kick' }, p.kicker) : null,
      h('blockquote', null, p.children),
      h('figcaption', null, h(Avatar, { initial: p.initial, src: p.avatar, size: 28, style: { fontSize: '15px' } }), p.author));
  }

  function Note(p) {
    return h('aside', { className: cx('note', p.className), style: p.style },
      p.kicker ? h('span', { className: 'mono muted' }, p.kicker) : null,
      h('p', null, p.children));
  }

  function nextPrev(item, icon, label) {
    return h('a', { key: icon, className: 'np', href: item.href || '#' },
      h('img', { src: item.image, alt: '' }),
      h('span', null, h('span', { className: 'mono' }, item.label || label), h('strong', null, item.title)),
      h('span', { className: 'ico ico-sm ico-orange' }, h(Icon, { name: icon })));
  }

  function Reader(p) {
    var a = p.author || {}, f = p.figure;
    return h('article', { className: cx('card reader', p.className), style: p.style },
      h('header', { className: 'r-head' },
        p.kicker ? h('span', { className: 'mono kick' }, p.kicker) : null,
        h('h3', null, p.title),
        p.lead ? h('p', null, p.lead) : null,
        h('div', { className: 'byline' },
          h(Avatar, { initial: a.initial, src: a.avatar }),
          h('span', null, h('strong', null, a.name), a.meta ? h('small', null, a.meta) : null),
          p.saveLabel === null ? null : h(Button, { variant: 'line', iconStart: 'save', onClick: p.onSave }, p.saveLabel || 'Salvar para depois'))),
      f ? h('figure', { className: 'r-fig' },
        h('img', { src: f.src, alt: f.alt || '', loading: 'lazy' }),
        (f.caption || f.credit) ? h('figcaption', null, h('span', null, f.caption), h('span', { className: 'mono' }, f.credit)) : null) : null,
      h('div', { className: 'r-grid' },
        h('div', { className: 'prose' }, p.children),
        p.aside ? h('aside', { className: 'aside' }, p.aside) : null),
      (p.prev || p.next) ? h('nav', { className: 'np-grid', 'aria-label': 'Continuar a leitura' },
        p.prev ? nextPrev(p.prev, 'back', 'Anterior') : null,
        p.next ? nextPrev(p.next, 'arrow', 'Próxima') : null) : null);
  }

  function Spec(p) {
    return el('dl', { className: cx('spec', p.className), style: p.style }, (p.items || []).map(function (it, i) {
      return h('div', { key: i }, h('dt', null, it.term), h('dd', null, it.value));
    }));
  }

  /* Carrossel 4:5: texto só na área segura; @ e contador só no rodapé (slide-chrome), nunca no topo. */
  function Slide(p) {
    var v = p.variant || 'cover';
    var kick = p.kicker ? h('span', { className: 'slide-kick' }, p.kicker) : null;
    var title = p.title ? h('h3', null, p.title) : null;
    var text = p.children ? h('p', null, p.children) : null;
    var note = p.note ? h('div', { className: 'slide-note' }, p.note) : null;
    var safe;
    if (v === 'cover') {
      safe = h('div', { className: 'slide-safe' }, kick, title, text, note);
    } else if (v === 'paper') {
      var body = p.bars ? el('div', { className: 'slide-bars' }, p.bars.map(function (b, i) {
        return h('div', { key: i, className: b.highlight ? 'hi' : undefined },
          h('span', null, b.label),
          h('b', null, b.value, b.unit ? h('small', null, b.unit) : null),
          h('i', { style: { '--v': clamp(b.share != null ? b.share : b.value) + '%' } }));
      })) : h('div', { className: 'slide-group' }, p.number != null ? h('span', { className: 'n' }, p.number) : null, title, text);
      safe = h('div', { className: 'slide-safe split' }, kick, body, note);
    } else {
      safe = h('div', { className: 'slide-safe split' }, h(MarkSvg), h('div', { className: 'slide-group' }, title, text, note));
    }
    return h('article', { className: cx('slide', 'slide-' + v, p.className), style: p.style },
      v === 'cover' && p.image ? h('img', { src: p.image, alt: p.imageAlt || '' }) : null,
      safe,
      (p.handle || p.page) ? h('div', { className: 'slide-chrome' }, h('span', null, p.handle), h('span', null, p.page)) : null);
  }

  /* ── Dados ─────────────────────────────────────────── */

  function DataPanel(p) {
    return h('div', { className: cx('ink data', p.className), style: p.style },
      h('div', { className: 'data-top' },
        h('div', null, p.kicker ? h('span', { className: 'mono kick muted' }, p.kicker) : null, h('h3', null, p.title)),
        p.source ? h('div', { className: 'src' },
          h('span', null, h(Icon, { name: 'doc' }), (p.source.label != null ? p.source.label : 'Fonte:') + ' ', h('b', null, p.source.value)),
          p.source.meta != null ? h('span', { className: 'mono' }, p.source.meta) : null)
          : p.meta ? h('span', { className: 'mono muted' }, p.meta) : null),
      p.children);
  }

  /* Com compare ou delta em algum item, todos ganham dd.cmp: o subgrid conta quatro linhas por coluna. */
  function Ledger(p) {
    var items = p.items || [];
    var cmp = items.some(function (it) { return it.compare != null || it.delta != null; });
    return el('dl', { className: cx('ledger', p.className), style: p.style }, items.map(function (it, i) {
      return h('div', { key: i, className: it.highlight ? 'hi' : undefined },
        h('dt', null, it.label),
        h('dd', null, it.value, it.unit ? h('small', null, it.unit) : null),
        cmp ? h('dd', { className: 'cmp' }, deltaNode(it.delta), it.compare) : null,
        it.note ? h('p', null, it.note) : null);
    }));
  }

  function TargetTrack(p) {
    var v = clamp(p.value), t = clamp(p.target), gap = Math.max(0, t - v);
    var gapLabel = p.gapLabel !== undefined ? p.gapLabel : (gap > 0 ? 'faltam ' + gap + ' pontos' : null);
    var ticks = p.ticks === false ? null : p.ticks || [p.minLabel || '0', '25', '50', '75', p.maxLabel || '100%'];
    return h('div', { className: cx('rule', p.className), style: p.style },
      h('div', { className: 'rule-lbl' }, h('span', null, p.label), gapLabel ? h('b', null, gapLabel) : null),
      h('div', { className: 'track', role: 'img', 'aria-label': v + '% de ' + t + '%', style: { '--v': v + '%', '--g': t + '%' } },
        h('span', { className: 'fill' }, h('b', null, p.valueLabel != null ? p.valueLabel : v + '%')),
        h('span', { className: 'gapfill' }),
        h('span', { className: 'target' }, h('span', null, p.targetLabel || 'Meta ' + t + '%'))),
      ticks ? el('div', { className: 'ticks' }, ticks.map(function (tk, i) { return h('span', { key: i }, tk); })) : null);
  }

  /* Métrica isolada: número em Instrument Sans tabular, unidade em small. */
  var METRIC = { sm: 'metric-sm', lg: 'metric-lg' };
  function Metric(p) {
    return h('span', Object.assign(rest(p, ['value', 'unit', 'size', 'className', 'children']), { className: cx('metric', METRIC[p.size], p.className) }),
      p.value != null ? p.value : p.children, p.unit != null ? h('small', null, p.unit) : null);
  }

  /* Peça de painel: rótulo, apoio à direita, número, visualização e rodapé. Dentro de Stats perde o card. */
  function Stat(p) {
    var aside = p.aside == null ? null : isText(p.aside) ? h('span', { className: 'stat-aside mono muted' }, p.aside) : withClass(p.aside, 'stat-aside');
    return h(p.plain ? 'div' : 'article', { className: cx(!p.plain && 'card', 'stat', p.className), style: p.style },
      h('span', { className: 'stat-label' }, p.icon ? h('span', { className: 'stat-ico' }, h(Icon, { name: p.icon })) : null, p.label),
      aside,
      p.value == null ? null : p.delta != null || p.note != null
        ? h('div', { className: 'stat-value' }, h(Metric, { value: p.value, unit: p.unit, size: p.size }), p.delta, p.note != null ? h('span', { className: 'help' }, p.note) : null)
        : h(Metric, { value: p.value, unit: p.unit, size: p.size }),
      p.viz ? withClass(p.viz, 'stat-viz') : null,
      p.row ? el('div', { className: 'stat-row' }, [].concat(p.row)) : null,
      p.foot != null ? h('span', { className: 'stat-foot' }, p.foot) : null);
  }

  function Stats(p) {
    var style = p.cols ? Object.assign({ '--cols': String(p.cols) }, p.style) : p.style;
    return h('div', { className: cx('stats', p.ink && 'ink', p.className), style: style },
      React.Children.map(p.children, function (c) { return React.isValidElement(c) ? React.cloneElement(c, { plain: true }) : c; }));
  }

  /* Barras verticais de série curta; a última fica laranja pelo CSS. Valores normalizados pelo maior. */
  function Spark(p) {
    var vals = (p.values || []).map(Number), max = maxOf(vals);
    var style = p.height ? Object.assign({ height: p.height + 'px' }, p.style) : p.style;
    return el('div', Object.assign(p.label ? { role: 'img', 'aria-label': p.label } : { 'aria-hidden': 'true' }, { className: cx('spark', p.className), style: style }),
      vals.map(function (v, i) { return h('i', { key: i, style: { '--v': pct(v / max * 100) } }); }));
  }

  function Ring(p) {
    var v = clamp(p.value);
    return h('span', { className: cx('ring', p.size === 'lg' && 'ring-lg', p.className), style: Object.assign({ '--p': String(v) }, p.style) },
      h('svg', { viewBox: '0 0 36 36', 'aria-hidden': 'true' },
        h('circle', { className: 'ring-track', cx: 18, cy: 18, r: 16, pathLength: 100 }),
        h('circle', { className: 'ring-value', cx: 18, cy: 18, r: 16, pathLength: 100 })),
      h('b', null, p.valueLabel != null ? p.valueLabel : Math.round(v) + '%'));
  }

  /* Contagem discreta: filled em tinta, depois highlighted em laranja, o resto vazio. */
  function Pips(p) {
    var total = p.total || 10, on = p.filled || 0, hi = p.highlighted || 0, kids = [];
    for (var i = 0; i < total; i++) kids.push(h('i', { key: i, className: i < on ? 'on' : i < on + hi ? 'hi' : undefined }));
    return el('div', Object.assign(p.label ? { role: 'img', 'aria-label': p.label } : { 'aria-hidden': 'true' }, { className: cx('pips', p.className), style: p.style }), kids);
  }

  /* Linha de tendência sem eixo: viewBox 100×40, 4 de folga em cima e embaixo; o ponto marca o último valor. */
  function r2(v) { return Math.round(v * 100) / 100; }
  function Sparkline(p) {
    var vals = (p.values || []).map(Number), n = vals.length;
    var lo = Math.min.apply(null, vals), hi = Math.max.apply(null, vals), span = hi - lo;
    var pts = vals.map(function (v, i) {
      return [n > 1 ? r2(i / (n - 1) * 100) : 0, span ? 4 + (1 - (v - lo) / span) * 32 : 20];
    });
    var line = pts.map(function (pt, i) { return (i ? 'L' : 'M') + pt[0] + ' ' + r2(pt[1]); }).join(' ');
    var last = pts[n - 1];
    return h('div', Object.assign(p.label ? { role: 'img', 'aria-label': p.label } : { 'aria-hidden': 'true' }, { className: cx('sparkline', p.highlight && 'hi', p.className), style: p.style }),
      n ? h('svg', { viewBox: '0 0 100 40', preserveAspectRatio: 'none' },
        h('path', { className: 'ar', d: line + ' L100 40 L0 40 Z' }),
        h('path', { className: 'ln', d: line })) : null,
      last ? h('i', { style: { '--y': r2(last[1] / 40 * 100) + '%' } }) : null);
  }

  function fmtNum(v) { return (Math.round(v * 1e6) / 1e6).toLocaleString('pt-BR'); }
  /* Topo do eixo: passo 1, 2, 2,5 ou 5 × 10^k que cobre o maior valor em `ticks` divisões. */
  function niceStep(raw) {
    if (!(raw > 0)) return 1;
    var k = Math.pow(10, Math.floor(Math.log(raw) / Math.LN10)), m = [1, 2, 2.5, 5, 10];
    for (var i = 0; i < m.length; i++) if (m[i] * k >= raw - 1e-9) return m[i] * k;
    return 10 * k;
  }
  function Chart(p) {
    var vals = (p.values || []).map(Number), n = vals.length, ticks = p.ticks || 4;
    var top = p.max || niceStep(maxOf(vals) / ticks) * ticks, step = top / ticks;
    var avg = p.average === true ? vals.reduce(function (a, b) { return a + b; }, 0) / (n || 1) : typeof p.average === 'number' ? p.average : null;
    var his = p.highlight == null ? [] : [].concat(p.highlight), lastHi = his.length ? his[his.length - 1] : -1;
    var labels = p.labels || vals.map(function (v, i) { return String(i + 1); });
    var dates = p.dates || labels;
    var plot = [];
    for (var t = 0; t <= ticks; t++) plot.push(h('span', { key: 'g' + t, className: cx('chart-grid', t === 0 && 'base'), style: { '--y': r2(t / ticks * 100) + '%' }, 'data-v': fmtNum(step * t) }));
    if (avg != null) plot.push(h('span', { key: 'avg', className: 'chart-avg', style: { '--y': pct(avg / top * 100) } }, h('b', null, 'média ' + Math.round(avg).toLocaleString('pt-BR'))));
    plot.push(el('div', { key: 'bars', className: 'chart-bars' }, vals.map(function (v, i) {
      return h('i', { key: i, className: his.indexOf(i) >= 0 ? 'hi' : undefined, style: { '--v': r2(clamp(v / top * 100)) + '%' }, 'data-n': fmtNum(v), 'data-d': dates[i] },
        i === lastHi && p.annotation != null ? h('b', null, p.annotation) : null);
    })));
    return h('figure', { className: cx('chart', p.className), style: p.style, 'aria-label': p.label },
      el('div', { className: 'chart-plot' }, plot),
      el('div', { className: 'chart-x', 'aria-hidden': 'true' }, labels.map(function (l, i) { return h('span', { key: i }, l); })));
  }

  /* Barra de composição: cada parte cresce na proporção do valor. tone: hi (laranja), on (tinta), sem tom (cinza). */
  function StackBar(p) {
    return el('div', { className: cx('stackbar', p.className), style: p.style, role: 'img', 'aria-label': p.label }, (p.items || []).map(function (it, i) {
      return h('i', { key: i, className: it.tone || undefined, style: { '--v': String(Number(it.value) || 0) } });
    }));
  }

  /* Detalhe da composição: marcador, rótulo, fatia, valor e variação. Sempre cinco células por linha. */
  function Breakdown(p) {
    return el('div', { className: cx('breakdown', p.className), style: p.style }, (p.items || []).map(function (it, i) {
      return h('div', { key: i },
        h('i', { className: it.tone || undefined }), h('span', null, it.label), h('small', null, it.share), h('b', null, it.value),
        deltaNode(it.delta) || h('span'));
    }));
  }

  function Insight(p) {
    return h('p', { className: cx('insight', p.className), style: p.style }, h(Icon, { name: p.icon || 'diag' }), h('span', null, p.children));
  }

  function Legend(p) {
    return el('div', { className: cx('legend', p.className), style: p.style }, (p.items || []).map(function (it, i) {
      return h('span', { key: i }, h('i', { className: it.tone || undefined }), it.label);
    }));
  }

  function HBars(p) {
    var items = p.items || [], max = p.max || maxOf(items.map(function (it) { return Number(it.value) || 0; })), kids = [];
    items.forEach(function (it, i) {
      kids.push(h('span', { key: 'l' + i }, it.label),
        h('i', { key: 'b' + i, className: it.highlight ? 'hi' : undefined, style: { '--v': Math.round(it.value / max * 100) + '%' } }),
        h('b', { key: 'v' + i }, it.valueLabel != null ? it.valueLabel : it.value));
    });
    return el('div', { className: cx('hbars', p.className), style: p.style }, kids);
  }

  /* Funil: taxa entre etapas calculada; a menor ganha .drop e o selo "maior queda". show="rate" mostra a fração da 1ª etapa. */
  function Funnel(p) {
    var steps = p.steps || [], first = Number(steps[0] && steps[0].value) || 1, kids = [], low = -1, lowRate = Infinity;
    for (var j = 1; j < steps.length; j++) {
      var r = steps[j].value / (steps[j - 1].value || 1);
      if (r < lowRate) { lowRate = r; low = j; }
    }
    if (steps.length < 3) low = -1;
    var dropLabel = p.dropLabel === undefined ? 'maior queda' : p.dropLabel;
    steps.forEach(function (s, i) {
      if (i > 0) {
        var drop = i === low;
        kids.push(h('div', { key: 'r' + i, className: cx('funnel-rate', drop && 'drop') },
          h('b', null, fmtPct(s.value / (steps[i - 1].value || 1) * 100)), s.rateLabel ? ' ' + s.rateLabel : null,
          drop && dropLabel ? ' ' : null, drop && dropLabel ? h(Badge, { tone: 'neg', square: true }, dropLabel) : null));
      }
      var share = s.value / first * 100;
      var shown = p.show === 'rate' ? (i === 0 ? '100%' : fmtPct(share)) : (s.valueLabel != null ? s.valueLabel : Number(s.value).toLocaleString('pt-BR'));
      kids.push(h('div', { key: 's' + i, className: 'funnel-step' },
        h('span', { className: 'funnel-n' }, i + 1),
        h('span', { className: 'funnel-name' }, h('strong', null, s.label), s.sub ? h('small', null, s.sub) : null),
        h('span', { className: 'funnel-bar' }, h('i', { style: { '--v': pct(share) } })),
        h('span', { className: 'funnel-value' }, shown)));
    });
    return el('div', { className: cx('funnel', p.className), style: p.style }, kids);
  }

  function toolsNode(tools) { return Array.isArray(tools) ? el('div', { className: 'panel-tools' }, tools) : tools || null; }
  /* Cabeçalho de painel: .kick de contexto acima do título; lista de ferramentas vai num .panel-tools. */
  function panelHead(s, key) {
    return h('div', { key: key, className: 'panel-head' },
      h('div', null, s.kicker ? h('span', { className: 'kick mono' }, s.kicker) : null, h('h4', null, s.title), s.caption ? h('p', null, s.caption) : null),
      toolsNode(s.tools));
  }
  /* Painel com cabeçalho: título, legenda e ferramentas à direita. flush ou sections: painel sem respiro,
     com faixa de indicadores e corpo em seções (2/3 + 1/3). */
  function Panel(p) {
    if (!p.flush && !p.sections) return h('div', { className: cx('card pad', p.className), style: p.style },
      panelHead(p), p.children);
    return h('article', { className: cx('card panel', p.className), style: p.style },
      p.title || p.tools ? panelHead(p) : null,
      p.stats || null,
      p.sections ? el('div', { className: 'panel-body' }, p.sections.map(function (s, i) {
        return h('section', { key: i }, s.title || s.tools ? panelHead(s) : null, s.content);
      })) : null,
      p.children);
  }

  /* Título de seção da vista: .kick mono de contexto, h3 com um <em>, linha de apoio e ferramentas à direita. */
  function SecHead(p) {
    return h('div', { className: cx('sec-head', p.className), style: p.style },
      h('div', null, p.kicker ? h('span', { className: 'kick mono' }, p.kicker) : null, h('h3', null, p.title), p.caption ? h('p', null, p.caption) : null),
      toolsNode(p.tools));
  }

  /* Barra acima da tabela: busca com atalho e ações. O item que vai para a direita recebe className "to-end". */
  function Toolbar(p) {
    return h('div', { className: cx('toolbar', p.className), style: p.style },
      p.search ? h('label', { className: 'inp' }, h(Icon, { name: 'search' }),
        h('input', { type: 'search', placeholder: p.search, 'aria-label': p.searchLabel || p.search }),
        p.shortcut ? h('span', { className: 'kbd' }, p.shortcut) : null) : null,
      p.children,
      p.note != null ? h('span', { className: 'toolbar-note to-end' }, p.note) : null,
      p.end ? [].concat(p.end).map(function (n, i) {
        var node = p.note == null && i === 0 ? withClass(n, 'to-end') : n;
        return React.isValidElement(node) && node.key == null ? React.cloneElement(node, { key: 'e' + i }) : node;
      }) : null);
  }

  function isCell(v) { return v && typeof v === 'object' && !React.isValidElement(v) && !Array.isArray(v); }
  function isNa(v) { return isCell(v) && !!v.na; }
  function tableCell(v) {
    if (isCell(v)) {
      if (v.na) return '–';
      if ('letter' in v || 'icon' in v) return h('div', { className: 'alt' }, h('i', { className: v.highlight ? 'hi' : undefined }, v.icon ? h(Icon, { name: v.icon }) : v.letter),
        h('span', null, h('strong', null, v.title), v.sub ? h('small', null, v.sub) : null));
      if ('share' in v) return h('div', { className: cx('share', v.highlight && 'hi'), style: { '--v': clamp(v.share) + '%' } },
        h('i'), h('span', { className: v.best ? 'best' : undefined }, v.value != null ? v.value : v.share + '%', v.sub ? h('small', null, v.sub) : null));
      if ('lvl' in v) return h('span', { className: 'lvl lvl-' + v.lvl }, v.value);
      if ('value' in v) return h(Fragment, null, v.best ? h('span', { className: 'best' }, v.value) : v.value, v.sub ? h('small', null, v.sub) : null);
    }
    return v;
  }
  /* Texto de uma célula (título, valor ou filhos de um nó), para ordenar e para o rótulo da seleção. */
  function cellText(v) {
    if (v == null || typeof v === 'boolean') return '';
    if (isText(v)) return String(v);
    if (Array.isArray(v)) return v.map(cellText).join('');
    if (React.isValidElement(v)) return cellText(v.props.children);
    if (typeof v === 'object') return v.na ? '' : cellText('title' in v ? v.title : 'value' in v ? v.value : 'share' in v ? v.share + '%' : null);
    return '';
  }
  /* Valor de ordenação: cell.sort; em coluna num, o número do texto em formato brasileiro; senão o texto. */
  function sortValue(v, num) {
    if (isCell(v) && 'sort' in v) return v.sort;
    var t = cellText(v);
    if (num) {
      var m = t.replace(/\./g, '').replace(',', '.').match(/-?\d+(\.\d+)?/);
      if (m) return parseFloat(m[0]);
    }
    return t;
  }
  /* Grupos de colunas: colunas vizinhas com o mesmo group formam um grupo; a seleção entra no primeiro e as ações no último. */
  function colGroups(cols) {
    var runs = [];
    if (!cols.some(function (c) { return c.group != null; })) return runs;
    cols.forEach(function (c, j) {
      var g = c.group == null ? '' : c.group, last = runs[runs.length - 1];
      if (last && last.label === g) last.n++; else runs.push({ label: g, start: j, n: 1 });
    });
    return runs;
  }
  function Table(p) {
    var cols = p.columns || [], rows = p.rows || [];
    var keyOf = function (r, i) { return r.key != null ? r.key : i; };
    var first = null;
    cols.some(function (c) { if (c.sort) { first = { key: c.key, dir: c.sort }; return true; } return false; });
    var sortSt = useState(first), sort = p.sortable ? sortSt[0] : null;
    var selSt = useState(function () { return rows.filter(function (r) { return r.selected; }).map(keyOf); });
    var lim = p.limit || 0, step = p.step || lim, shownSt = useState(lim);
    var allRef = useRef(null);
    var sel = selSt[0], total = rows.length, nSel = rows.filter(function (r, i) { return sel.indexOf(keyOf(r, i)) >= 0; }).length;
    useEffect(function () { if (allRef.current) allRef.current.indeterminate = nSel > 0 && nSel < total; });
    function setSel(next) { selSt[1](next); if (p.onSelectionChange) p.onSelectionChange(next); }
    var runs = colGroups(cols), opens = {};
    runs.forEach(function (r, i) { if (i > 0) opens[r.start] = true; });
    function cls(c, j, v) { return cx(c.num && 'num', isNa(v) && 'na', opens[j] && 'g0'); }
    function cells(tag, row) {
      return cols.map(function (c, j) { return h(tag, { key: c.key, className: cls(c, j, row[c.key]) }, tableCell(row[c.key])); });
    }
    var list = rows.map(function (r, i) { return { r: r, k: keyOf(r, i), i: i }; });
    if (sort) {
      var col = cols.filter(function (c) { return c.key === sort.key; })[0] || {};
      /* Valor ausente (na) fica no fim nos dois sentidos. */
      list.sort(function (a, b) {
        var na = (isNa(a.r[sort.key]) ? 1 : 0) - (isNa(b.r[sort.key]) ? 1 : 0);
        if (na) return na;
        var x = sortValue(a.r[sort.key], col.num), y = sortValue(b.r[sort.key], col.num);
        var k = typeof x === 'number' && typeof y === 'number' ? x - y : String(x).localeCompare(String(y), 'pt-BR');
        return (sort.dir === 'ascending' ? k : -k) || a.i - b.i;
      });
    }
    function sortBy(c) {
      var dir = sort && sort.key === c.key ? (sort.dir === 'descending' ? 'ascending' : 'descending') : (c.num ? 'descending' : 'ascending');
      sortSt[1]({ key: c.key, dir: dir });
    }
    var head = cols.map(function (c, j) {
      if (!p.sortable) return h('th', { key: c.key, className: cls(c, j), 'aria-sort': c.sort }, c.label, c.sort ? h(Icon, { name: 'down' }) : null);
      return h('th', { key: c.key, className: cls(c, j), 'aria-sort': sort && sort.key === c.key ? sort.dir : undefined },
        h('button', { className: 'th-sort', type: 'button', onClick: function () { sortBy(c); } }, c.label, h(Icon, { name: 'down' })));
    });
    if (p.selectable) head.unshift(h('th', { key: '_sel', className: 'sel' }, h('label', { className: 'chk' },
      h('input', { type: 'checkbox', ref: allRef, 'aria-label': 'Selecionar todas', checked: total > 0 && nSel === total,
        onChange: function (e) { setSel(e.target.checked ? rows.map(keyOf) : []); } }))));
    if (p.actions) head.push(h('th', { key: '_act', className: 'act', 'aria-label': 'Ações' }));
    var groupRow = runs.length ? el('tr', null, runs.map(function (r, i) {
      var span = r.n + (i === 0 && p.selectable ? 1 : 0) + (i === runs.length - 1 && p.actions ? 1 : 0);
      return h('th', { key: i, className: cx('grp', i > 0 && 'g0'), colSpan: span }, r.label);
    })) : null;
    /* limit: mostra as primeiras linhas e o rodapé "Mostrar mais" (step linhas por clique), como o data-limit do kit. */
    var n = list.length, shown = shownSt[0], vis = lim ? Math.min(shown, n) : n;
    var body = list.map(function (it, idx) {
      var on = sel.indexOf(it.k) >= 0, tds = cells('td', it.r);
      if (p.selectable) tds.unshift(h('td', { key: '_sel', className: 'sel' }, h('label', { className: 'chk' },
        h('input', { type: 'checkbox', checked: on, 'aria-label': 'Selecionar ' + (it.r.label != null ? it.r.label : cellText(it.r[cols[0] && cols[0].key])),
          onChange: function () { setSel(on ? sel.filter(function (k) { return k !== it.k; }) : sel.concat([it.k])); } }))));
      if (p.actions) tds.push(h('td', { key: '_act', className: 'act' }, p.actions(it.r)));
      return el('tr', { key: it.k, hidden: idx >= vis || undefined, 'aria-selected': p.selectable ? (on ? 'true' : 'false') : it.r.selected ? 'true' : undefined }, tds);
    });
    var more = lim && n > lim ? h('div', { className: 'tbl-more' }, vis < n
      ? [h('span', { key: 's' }, 'Mostrando ' + vis + ' de ' + n), h('button', { key: 'b', type: 'button', onClick: function () { shownSt[1](shown + step); } }, 'Mostrar mais ' + Math.min(step, n - vis))]
      : [h('span', { key: 's' }, 'Mostrando ' + n + ' de ' + n), h('button', { key: 'b', type: 'button', 'data-less': '', onClick: function () { shownSt[1](lim); } }, 'Mostrar menos')]) : null;
    var foot = null;
    if (p.foot) {
      var ftds = cells('td', p.foot);
      if (p.selectable) ftds.unshift(h('td', { key: '_sel' }));
      if (p.actions) ftds.push(h('td', { key: '_act' }));
      foot = h('tfoot', null, el('tr', null, ftds));
    }
    var toolbar = p.toolbar || null;
    if (p.selectable && React.isValidElement(toolbar) && toolbar.type === Toolbar && toolbar.props.note == null)
      toolbar = React.cloneElement(toolbar, { note: h(Fragment, null, h('b', null, nSel), ' de ' + total + ' ' + (nSel === 1 ? 'selecionada' : 'selecionadas')) });
    return h('div', { className: cx(p.ink ? 'ink' : 'card', 'pad stack', p.className), 'data-density': p.density || undefined, style: Object.assign({ gap: '16px' }, p.style) },
      p.head || null,
      toolbar,
      h('div', { className: 'tbl tbl-box' }, h('table', { 'data-sortable': p.sortable ? '' : undefined, 'data-limit': lim || undefined },
        h('thead', null, groupRow, el('tr', null, head)),
        el('tbody', null, body),
        foot)),
      more,
      p.footnote ? h('p', { className: 'help' }, p.footnote) : null);
  }

  /* ── Produto ───────────────────────────────────────── */

  function Workspace(p) {
    return h('div', Object.assign(rest(p, ['className']), { className: cx('ws', p.className) }));
  }

  function Rail(p) {
    var items = p.items || [];
    var st = useState(p.defaultValue !== undefined ? p.defaultValue : (items[0] && items[0].value));
    return el('nav', { className: cx('rail', p.className), style: p.style, 'aria-label': p.label || 'Áreas do produto' },
      [h(MarkSvg, { key: 'mark' })].concat(items.map(function (it) {
        return h('button', {
          key: it.value, type: 'button', 'aria-pressed': st[0] === it.value ? 'true' : 'false', 'aria-label': it.label,
          onClick: function () { st[1](it.value); if (p.onChange) p.onChange(it.value); }
        }, h(Icon, { name: it.icon }));
      }), p.initial ? [h('span', { key: 'av', className: 'avatar', 'aria-label': p.user }, p.initial)] : []));
  }

  function Menu(p) {
    var sections = p.sections || [];
    var first = null;
    sections.some(function (s) { return (s.items || []).some(function (it) { first = it.value; return true; }); });
    var st = useState(p.defaultValue !== undefined ? p.defaultValue : first);
    return el('aside', { className: cx('menu', p.variant === 'ink' && 'ink', p.className), style: p.style, 'aria-label': p.label || 'Menu contextual' }, [
      p.title ? h('h3', { key: 't' }, p.title) : null,
      p.search === false ? null : h('label', { key: 'q', className: 'inp' }, h(Icon, { name: 'search' }),
        h('input', { type: 'search', placeholder: p.search || 'Buscar', 'aria-label': p.searchLabel || p.search || 'Buscar' }))
    ].concat(sections.map(function (s, si) {
      return el(Fragment, { key: si }, [s.label ? h('span', { key: 'l', className: 'mlbl' }, s.label) : null].concat((s.items || []).map(function (it) {
        return h('button', {
          key: it.value, className: 'mi', type: 'button', 'aria-pressed': st[0] === it.value ? 'true' : 'false',
          onClick: function () { st[1](it.value); if (p.onChange) p.onChange(it.value); }
        }, it.icon ? h(Icon, { name: it.icon }) : null, it.label, it.count != null ? h('b', null, it.count) : null,
          it.status ? h(Status, { tone: it.status, label: it.statusLabel }) : null);
      })));
    })));
  }

  function ContentPanel(p) {
    var crumbs = p.crumbs || [], last = crumbs.length - 1, trail = [];
    crumbs.forEach(function (c, i) {
      if (i < last) trail.push(h('span', { key: 'c' + i }, c), h('span', { key: 's' + i }, '/'));
      else trail.push(h('b', { key: 'c' + i }, c));
    });
    return h('div', { className: cx('cont', p.className), style: p.style },
      h('div', { className: 'c-top' }, el('div', { className: 'crumbs' }, trail), p.tools ? h('div', { className: 'c-tools' }, p.tools) : null),
      p.plain ? p.children : h('div', { className: 'view' }, p.children));
  }

  function MiniGrid(p) {
    return h('div', { className: cx(p.list && 'as-list', p.className), style: p.style }, h('div', { className: 'minis' }, p.children));
  }

  function Mini(p) {
    return h('article', { className: cx('mini', p.className), style: p.style },
      h('img', { src: p.image, alt: p.imageAlt || '', loading: 'lazy' }),
      h('div', { className: 'mt' }, p.kicker ? h('span', { className: 'mono muted' }, p.kicker) : null, h('h4', null, p.title)),
      h('div', { className: 'meta' }, h('span', null, p.meta), p.status || null));
  }

  function Editor(p) {
    var st = useState(p.defaultText || '');
    var words = (st[0].trim().match(/\S+/g) || []).length;
    return h('div', { className: cx('editor', p.className), style: p.style },
      h('div', { className: 'ed-write' },
        h('div', { className: 'lbl', style: { margin: 0 } },
          h('span', { className: 'mono muted' }, p.kicker), h('span', { className: 'hr' }), h('span', { className: 'mono muted' }, words + ' palavras')),
        h('input', { className: 'ed-title', type: 'text', defaultValue: p.defaultTitle, 'aria-label': 'Título da matéria' }),
        h('textarea', { value: st[0], 'aria-label': 'Texto da matéria', onChange: function (e) { st[1](e.target.value); if (p.onChange) p.onChange(e.target.value); } }),
        p.tools ? h('div', { className: 'chips' }, p.tools) : null),
      p.side ? h('aside', { className: 'ed-side' }, p.side) : null);
  }

  function Log(p) {
    return el('div', { className: cx('log', p.className), style: p.style }, (p.entries || []).map(function (e, i) {
      return h('div', { key: i }, h('time', null, e.time),
        h('span', null, e.title ? h('b', null, e.title) : null, e.title && e.text ? ' · ' : null, e.text));
    }));
  }

  var api = {
    Wordmark: Wordmark, Icon: Icon, Anchor: Anchor, Label: Label,
    Button: Button, IconButton: IconButton, Link: Link,
    Input: Input, Select: Select, Switch: Switch, Checkbox: Checkbox, ChipGroup: ChipGroup, Segmented: Segmented, Tabs: Tabs, Kbd: Kbd,
    Badge: Badge, Status: Status, Delta: Delta, Toast: Toast, Banner: Banner, Tooltip: Tooltip, Dialog: Dialog, Meter: Meter, EmptyState: EmptyState, Skeleton: Skeleton,
    Card: Card, Row: Row, Quote: Quote, Note: Note, Avatar: Avatar, Reader: Reader, Spec: Spec, Slide: Slide,
    DataPanel: DataPanel, Ledger: Ledger, TargetTrack: TargetTrack, Metric: Metric, Stat: Stat, Stats: Stats, Spark: Spark, Ring: Ring, Pips: Pips,
    Sparkline: Sparkline, Chart: Chart, StackBar: StackBar, Breakdown: Breakdown, Insight: Insight, Legend: Legend,
    HBars: HBars, Funnel: Funnel, Panel: Panel, SecHead: SecHead, Toolbar: Toolbar, Table: Table,
    Workspace: Workspace, Rail: Rail, Menu: Menu, ContentPanel: ContentPanel, MiniGrid: MiniGrid, Mini: Mini, Editor: Editor, Log: Log
  };
  window.AiCreatorOSDesignSystem_a9067e = Object.assign(window.AiCreatorOSDesignSystem_a9067e || {}, api);
})();
