/* ════════════════════════════════════════════════════════════
   NOVERA — Canal Compradors: perfil de cerca (multi-pas)
   ════════════════════════════════════════════════════════════ */
(function () {
  const root = document.getElementById('tool');
  if (!root) return;

  const TOTAL = 6;
  const state = {
    step: 1,
    zones: [],
    budgetMin: 150000,
    budgetMax: 600000,
    tipus: [],
    prioritats: [],
    hipoteca: null,
    nom: '', email: '', tel: ''
  };
  const MAX_PRIOR = 5;

  const steps  = [...root.querySelectorAll('.tool-step')];
  const segs    = [...root.querySelectorAll('.tool-progress .seg')];
  const stepLbl = root.querySelector('.tool-steplabel');
  const backBtn = root.querySelector('.tool-back');
  const topBar  = root.querySelector('.tool-top');
  const stage   = root.querySelector('.tool-stage');
  const done    = root.querySelector('.tool-done');

  const euro = n => new Intl.NumberFormat('ca-ES').format(n) + ' €';

  /* ── zones (tags lliures + suggeriments) ── */
  const tagsWrap = root.querySelector('.tf-tags');
  const zoneInput = root.querySelector('#zone-input');
  function renderTags() {
    tagsWrap.innerHTML = '';
    state.zones.forEach((z, i) => {
      const t = document.createElement('span');
      t.className = 'tf-tag';
      t.innerHTML = '<span></span><button aria-label="treure" data-rm="' + i + '">×</button>';
      t.querySelector('span').textContent = z;
      tagsWrap.appendChild(t);
    });
    syncNext();
  }
  function addZone(val) {
    val = (val || '').trim();
    if (!val) return;
    if (!state.zones.some(z => z.toLowerCase() === val.toLowerCase())) state.zones.push(val);
    renderTags();
  }

  /* ── budget dual slider ── */
  const rMin = root.querySelector('#b-min');
  const rMax = root.querySelector('#b-max');
  const fill = root.querySelector('.range-fill');
  const outMin = root.querySelector('#out-min');
  const outMax = root.querySelector('#out-max');
  const GAP = 50000;
  function syncBudget() {
    let lo = +rMin.value, hi = +rMax.value;
    if (lo > hi - GAP) {
      if (document.activeElement === rMin) { lo = hi - GAP; rMin.value = lo; }
      else { hi = lo + GAP; rMax.value = hi; }
    }
    state.budgetMin = lo; state.budgetMax = hi;
    const min = +rMin.min, max = +rMin.max;
    const pLo = (lo - min) / (max - min) * 100;
    const pHi = (hi - min) / (max - min) * 100;
    fill.style.left = pLo + '%';
    fill.style.width = (pHi - pLo) + '%';
    outMin.textContent = euro(lo);
    outMax.textContent = hi >= max ? euro(hi) + '+' : euro(hi);
  }

  /* ── render ── */
  function render() {
    steps.forEach((s, i) => s.classList.toggle('active', i === state.step - 1));
    segs.forEach((seg, i) => seg.classList.toggle('done', i < state.step));
    stepLbl.textContent = 'Pas ' + state.step + ' de ' + TOTAL;
    backBtn.hidden = state.step === 1;
    syncNext();
  }

  function syncNext() {
    const cur = steps[state.step - 1];
    const next = cur.querySelector('.tool-next');
    if (!next) return;
    const kind = cur.dataset.kind;
    let ok = true;
    if (kind === 'zones')   ok = state.zones.length > 0;
    else if (kind === 'budget') ok = true;
    else if (kind === 'tipus')  ok = state.tipus.length > 0;
    else if (kind === 'prior')  ok = state.prioritats.length > 0;
    else if (kind === 'hipoteca') ok = !!state.hipoteca;
    else if (kind === 'form') {
      const filled = [...cur.querySelectorAll('[required]:not([type=checkbox])')].every(i => i.value.trim() !== '');
      const consent = cur.querySelector('input[name=consent]');
      ok = filled && (!consent || consent.checked);
    }
    next.disabled = !ok;
  }

  function go(n) {
    state.step = Math.max(1, Math.min(TOTAL, n));
    render();
    root.scrollIntoView({ behavior:'smooth', block:'center' });
  }

  /* ── events ── */
  root.addEventListener('click', (e) => {
    // suggestion chip
    const sg = e.target.closest('.sg');
    if (sg) { addZone(sg.dataset.zone); return; }
    // remove tag
    const rm = e.target.closest('[data-rm]');
    if (rm) { state.zones.splice(+rm.dataset.rm, 1); renderTags(); return; }
    // multi-select card (tipus)
    const ms = e.target.closest('.ms-card');
    if (ms) {
      const v = ms.dataset.val;
      const i = state.tipus.indexOf(v);
      if (i >= 0) { state.tipus.splice(i, 1); ms.classList.remove('sel'); }
      else { state.tipus.push(v); ms.classList.add('sel'); }
      syncNext(); return;
    }
    // priority chip (max 5)
    const chip = e.target.closest('.chip');
    if (chip) {
      const v = chip.dataset.val;
      const i = state.prioritats.indexOf(v);
      if (i >= 0) { state.prioritats.splice(i, 1); chip.classList.remove('sel'); }
      else if (state.prioritats.length < MAX_PRIOR) { state.prioritats.push(v); chip.classList.add('sel'); }
      updateChips(); syncNext(); return;
    }
    // single-select (hipoteca)
    const ss = e.target.closest('.ss-opt');
    if (ss) {
      state.hipoteca = ss.dataset.val;
      ss.parentElement.querySelectorAll('.ss-opt').forEach(o => o.classList.remove('sel'));
      ss.classList.add('sel'); syncNext();
      clearTimeout(window.__ccadv);
      window.__ccadv = setTimeout(() => { if (state.step < TOTAL) go(state.step + 1); }, 420);
      return;
    }
    // next
    if (e.target.closest('.tool-next')) {
      const cur = steps[state.step - 1];
      if (cur.dataset.kind === 'form') { finish(); return; }
      go(state.step + 1); return;
    }
    // back
    if (e.target.closest('.tool-back')) { go(state.step - 1); return; }
    // restart
    if (e.target.closest('.done-restart')) { restart(); return; }
  });

  function updateChips() {
    const full = state.prioritats.length >= MAX_PRIOR;
    root.querySelectorAll('.chip').forEach(c => {
      c.classList.toggle('disabled', full && !c.classList.contains('sel'));
    });
    const cnt = root.querySelector('.chips-count b');
    if (cnt) cnt.textContent = state.prioritats.length + ' / ' + MAX_PRIOR;
  }

  // zone input: enter to add
  zoneInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); addZone(zoneInput.value); zoneInput.value = ''; }
  });
  zoneInput.addEventListener('blur', () => { if (zoneInput.value.trim()) { addZone(zoneInput.value); zoneInput.value=''; } });

  // budget sliders
  [rMin, rMax].forEach(r => r.addEventListener('input', syncBudget));

  // form inputs
  root.addEventListener('input', (e) => {
    if (steps[state.step-1].dataset.kind === 'form' &&
        (e.target.closest('.tf-input') || e.target.name === 'consent')) syncNext();
  });
  root.addEventListener('change', (e) => {
    if (e.target.name === 'consent') syncNext();
  });

  /* ── finish ── */
  const TIPUS_LABEL = { pis:'Pis', casa:'Casa', inversio:'Inversió', segona:'Segona residència' };
  const HIP_LABEL = { aprovada:'Hipoteca aprovada', proces:'En procés', no:'Encara no', assessorament:'Vol assessorament' };

  function finish() {
    const f = steps[TOTAL - 1];
    state.nom = f.querySelector('[name=nom]').value.trim();
    state.email = f.querySelector('[name=email]').value.trim();
    state.tel = f.querySelector('[name=tel]').value.trim();

    const first = state.nom.split(' ')[0];
    done.querySelector('.done-hello').textContent = first ? (first + ', ja hi ets dins.') : 'Ja hi ets dins.';

    const prof = done.querySelector('.done-profile');
    prof.innerHTML = '';
    const chips = [];
    if (state.zones.length) chips.push(['Zona', state.zones.join(' · ')]);
    chips.push(['Pressupost', euro(state.budgetMin) + ' – ' + euro(state.budgetMax)]);
    if (state.tipus.length) chips.push(['Tipus', state.tipus.map(t => TIPUS_LABEL[t]).join(', ')]);
    if (state.hipoteca) chips.push(['Hipoteca', HIP_LABEL[state.hipoteca]]);
    chips.forEach(([k, v]) => {
      const s = document.createElement('span');
      s.innerHTML = k + ' · <b></b>';
      s.querySelector('b').textContent = v;
      prof.appendChild(s);
    });

    stage.style.display = 'none';
    topBar.style.display = 'none';
    backBtn.style.display = 'none';
    segs.forEach(s => s.classList.add('done'));
    done.classList.add('active');
    root.scrollIntoView({ behavior:'smooth', block:'center' });

    // → envia el perfil de comprador als correus de NOVERA
    if (window.NOVERAforms) {
      window.NOVERAforms.send({
        subject: 'Nou perfil de comprador · ' + (state.nom || 'sense nom'),
        replyto: state.email,
        fields: {
          'Tipus de formulari': 'Comprador — Canal Compradors',
          'Nom': state.nom,
          'Email': state.email,
          'Telèfon': state.tel,
          'Zones': state.zones.join(', '),
          'Pressupost': euro(state.budgetMin) + ' – ' + euro(state.budgetMax),
          'Tipus d\'immoble': state.tipus.map(t => TIPUS_LABEL[t] || t).join(', '),
          'Prioritats': state.prioritats.join(', '),
          'Hipoteca': HIP_LABEL[state.hipoteca] || state.hipoteca || ''
        }
      });
    }
  }

  function restart() {
    state.step = 1; state.zones = []; state.tipus = []; state.prioritats = []; state.hipoteca = null;
    state.nom = state.email = state.tel = '';
    done.classList.remove('active');
    stage.style.display = ''; topBar.style.display = ''; backBtn.style.display = '';
    root.querySelectorAll('.ms-card.sel,.chip.sel,.ss-opt.sel').forEach(o => o.classList.remove('sel'));
    root.querySelectorAll('.chip.disabled').forEach(c => c.classList.remove('disabled'));
    root.querySelectorAll('.tf-input').forEach(i => i.value = '');
    rMin.value = 150000; rMax.value = 600000;
    renderTags(); updateChips(); syncBudget(); render();
    root.scrollIntoView({ behavior:'smooth', block:'center' });
  }

  renderTags(); updateChips(); syncBudget(); render();
})();
