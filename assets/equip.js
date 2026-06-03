/* ════════════════════════════════════════════════════════════
   NOVERA — "L'EQUIP" · sistema orbital de coordinació
   Una sola font de dades → render radial (desktop) o stack (mòbil).
   ════════════════════════════════════════════════════════════ */
(function(){
  const NODES = [
    { id:'juridic',     t:'Jurídic',              d:'Contractes, revisions i protecció legal.',                 icon:'shield'  },
    { id:'doc',         t:'Documentació',         d:'Certificats, tràmits i coordinació administrativa.',       icon:'doc'     },
    { id:'tecnica',     t:'Àrea Tècnica',         d:'Arquitectes tècnics, informes i certificacions.',          icon:'compass' },
    { id:'presentacio', t:'Presentació',          d:'Fotografia i vídeo professional.',                         icon:'camera'  },
    { id:'collab',      t:'Col·laboradors',       d:'Professionals externs quan una actuació aporta valor.',    icon:'network' },
    { id:'mercat',      t:'Estratègia de Mercat', d:'Coneixement local, posicionament i estratègia comercial.', icon:'chart'   },
  ];

  const A = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"';
  const ICONS = {
    shield:  `<svg ${A}><path d="M12 3l7 3v5.2c0 4.3-2.9 7.5-7 8.8-4.1-1.3-7-4.5-7-8.8V6l7-3z"/><path d="M9 11.8l2 2 4-4.4"/></svg>`,
    doc:     `<svg ${A}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h5"/></svg>`,
    compass: `<svg ${A}><circle cx="12" cy="5" r="2"/><path d="M11 6.8 6.6 19M13 6.8 17.4 19"/><path d="M9.3 14.4h5.4"/></svg>`,
    camera:  `<svg ${A}><rect x="3" y="7" width="18" height="13" rx="2.2"/><path d="M8.2 7l1.5-2.6h4.6L15.8 7"/><circle cx="12" cy="13.4" r="3.2"/></svg>`,
    network: `<svg ${A}><circle cx="12" cy="5.5" r="2.1"/><circle cx="5.5" cy="17.5" r="2.1"/><circle cx="18.5" cy="17.5" r="2.1"/><path d="M10.7 7.2 6.8 15.4M13.3 7.2 17.2 15.4M7.6 17.5h8.8"/></svg>`,
    chart:   `<svg ${A}><path d="M4 4v16h16"/><path d="M7.5 14.5l3.2-3.4 3 3L20 7"/><path d="M20 11V7h-4"/></svg>`,
  };

  const host = document.getElementById('systemOrbit');
  if (!host) return;

  const R = 34;           // radi de l'òrbita en %
  const START = -90;      // primer node a dalt
  function pos(i){
    const a = (START + i*60) * Math.PI / 180;
    return { x: 50 + R*Math.cos(a), y: 50 + R*Math.sin(a) };
  }

  function renderRadial(){
    let spokes = '';
    NODES.forEach((n,i) => {
      const p = pos(i);
      spokes += `<g class="spoke" data-id="${n.id}">`
        + `<line class="spoke-base" x1="50" y1="50" x2="${p.x.toFixed(2)}" y2="${p.y.toFixed(2)}"/>`
        + `<line class="spoke-pulse" x1="${p.x.toFixed(2)}" y1="${p.y.toFixed(2)}" x2="50" y2="50" style="animation-delay:${(-i*0.62).toFixed(2)}s"/>`
        + `</g>`;
    });
    const svg = `<svg class="orbit-svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">`
      + `<circle class="orbit-ring" cx="50" cy="50" r="${R}"/>${spokes}</svg>`;

    const core = `<div class="core">`
      + `<span class="core-halo"></span><span class="core-ring"></span>`
      + `<span class="core-mark">NOVERA</span><span class="core-sub">Nucli de coordinació</span></div>`;

    let nodes = '';
    NODES.forEach((n,i) => {
      const p = pos(i);
      const dir = p.y < 50 ? 'up' : 'down';
      nodes += `<button type="button" class="node dir-${dir}" data-id="${n.id}" `
        + `style="left:${p.x.toFixed(2)}%;top:${p.y.toFixed(2)}%;--di:${i}" `
        + `aria-label="${n.t}. ${n.d}">`
        + `<span class="node-card"><span class="node-icon">${ICONS[n.icon]}</span>`
        + `<span class="node-title">${n.t}</span></span>`
        + `<span class="node-desc"><span class="nd-title">${n.t}</span>`
        + `<span class="nd-text">${n.d}</span></span></button>`;
    });

    host.className = 'system-orbit mode-radial';
    host.innerHTML = svg + core + nodes;
    wireRadial();
  }

  function wireRadial(){
    const spokes = {};
    host.querySelectorAll('.spoke').forEach(s => spokes[s.dataset.id] = s);
    host.querySelectorAll('.node').forEach(node => {
      const id = node.dataset.id;
      const on  = () => { node.classList.add('active');    spokes[id] && spokes[id].classList.add('lit'); };
      const off = () => { node.classList.remove('active'); spokes[id] && spokes[id].classList.remove('lit'); };
      node.addEventListener('mouseenter', on);
      node.addEventListener('mouseleave', off);
      node.addEventListener('focus', on);
      node.addEventListener('blur', off);
    });
  }

  function renderStack(){
    let rows = '';
    NODES.forEach((n,i) => {
      rows += `<div class="srow" style="--di:${i}">`
        + `<span class="node-icon">${ICONS[n.icon]}</span>`
        + `<span class="srow-body"><span class="node-title">${n.t}</span>`
        + `<span class="nd-text">${n.d}</span></span></div>`;
    });
    host.className = 'system-orbit mode-stack';
    host.innerHTML = `<div class="stack-core"><span class="core-mark">NOVERA</span>`
      + `<span class="core-sub">Nucli de coordinació</span></div>`
      + `<div class="stack-rail">${rows}</div>`;
  }

  const mq = window.matchMedia('(max-width: 860px)');
  let isStack = null;
  function render(){
    const next = mq.matches;
    if (next === isStack) return;   // evita re-render innecessari (p.ex. canvis d'alçada)
    isStack = next;
    next ? renderStack() : renderRadial();
  }
  render();
  (mq.addEventListener ? mq.addEventListener('change', render) : mq.addListener(render));
})();
