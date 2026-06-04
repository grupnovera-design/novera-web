/* ════════════════════════════════════════════════════════════
   NOVERA — Descobreix: qüestionari multi-pas + recomanació
   ════════════════════════════════════════════════════════════ */
(function () {
  const root = document.getElementById('quiz');
  if (!root) return;

  const TOTAL = 6;
  const state = { step: 1, answers: {} };

  const steps   = [...root.querySelectorAll('.quiz-step')];
  const segs     = [...root.querySelectorAll('.quiz-progress .seg')];
  const stepLbl  = root.querySelector('.quiz-steplabel');
  const backBtn  = root.querySelector('.quiz-back');
  const stage    = root.querySelector('.quiz-stage');
  const topBar   = root.querySelector('.quiz-top');
  const result   = root.querySelector('.quiz-result');

  /* ---- copy per pla recomanat ---- */
  const PLANS = {
    basic: {
      name: 'Basic',
      tag: 'El punt de partida intel·ligent',
      desc: 'Pel teu perfil, el camí més eficient és començar amb respatller professional i seguretat legal, mantenint els costos sota control. Tu portes el ritme; nosaltres posem la base.'
    },
    pro: {
      name: 'Pro',
      tag: 'El nostre model més equilibrat',
      desc: 'La teva situació demana delegar la part complexa sense perdre el control. Ens ocupem de visites, negociació i coordinació; tu només decideixes si acceptes l\'oferta.'
    },
    premium: {
      name: 'Premium',
      tag: 'Tranquil·litat absoluta',
      desc: 'Pel tipus de propietat i el que valores, el millor camí és delegar-ho tot. Estratègia de sortida a mida, reportatge premium i acompanyament fins a la postfirma. Tu, sense preocupar-te de res.'
    }
  };

  const TIPUS_LABEL = { pis:'Pis', casa:'Casa', xalet:'Xalet', villa:'Villa', terreny:'Terreny', local:'Local' };
  const SIT_LABEL = {
    ara:'Vendre ara', mesos:'Pròxims mesos', explorant:'Explorant opcions', curiositat:'Curiositat'
  };

  /* ---- recomanació ---- */
  function recommend(a) {
    const imp = a.important, tipus = a.tipus, sit = a.situacio;
    let plan = 'pro';
    if (imp === 'delegar') plan = 'premium';
    else if (imp === 'costos') plan = 'basic';
    else if (imp === 'legals' || imp === 'rapid' || imp === 'preu') plan = 'pro';

    // immobles d'alt standing → eleva a premium (excepte si la prioritat és cost)
    if ((tipus === 'villa' || tipus === 'xalet') && imp !== 'costos') plan = 'premium';
    // només explorant + costos → manté basic
    if ((sit === 'explorant' || sit === 'curiositat') && imp === 'costos') plan = 'basic';
    return plan;
  }

  /* ---- render pas ---- */
  function render() {
    steps.forEach((s, i) => s.classList.toggle('active', i === state.step - 1));
    segs.forEach((seg, i) => seg.classList.toggle('done', i < state.step));
    stepLbl.textContent = 'Pas ' + state.step + ' de ' + TOTAL;
    backBtn.hidden = state.step === 1;
    syncNext();
  }

  /* ---- validació del botó "següent" del pas actual ---- */
  function syncNext() {
    const cur = steps[state.step - 1];
    const next = cur.querySelector('.quiz-next');
    if (!next) return;
    const need = cur.dataset.field;
    if (cur.dataset.kind === 'form') {
      const ok = [...cur.querySelectorAll('[required]')].every(i => i.value.trim() !== '');
      next.disabled = !ok;
    } else if (need) {
      next.disabled = !state.answers[need];
    }
  }

  function go(n) {
    state.step = Math.max(1, Math.min(TOTAL, n));
    render();
    // manté la targeta visible en avançar
    if (window.matchMedia('(max-width:640px)').matches) {
      root.scrollIntoView({ block:'nearest' });
    }
  }

  /* ---- esdeveniments ---- */
  root.addEventListener('click', (e) => {
    // opció seleccionable
    const opt = e.target.closest('.quiz-opt');
    if (opt) {
      const field = opt.closest('.quiz-step').dataset.field;
      const val = opt.dataset.val;
      state.answers[field] = val;
      opt.parentElement.querySelectorAll('.quiz-opt').forEach(o => o.classList.remove('sel'));
      opt.classList.add('sel');
      syncNext();
      // auto-avança suau (no a l'últim pas de selecció abans del form ho deixem fluid igual)
      clearTimeout(window.__qadv);
      window.__qadv = setTimeout(() => { if (state.step < TOTAL) go(state.step + 1); }, 420);
      return;
    }
    // botó següent
    if (e.target.closest('.quiz-next')) {
      const cur = steps[state.step - 1];
      if (cur.dataset.kind === 'form') { finish(); return; }
      go(state.step + 1);
      return;
    }
    // enrere
    if (e.target.closest('.quiz-back')) { go(state.step - 1); return; }
    // reinici
    if (e.target.closest('.result-restart')) { restart(); return; }
  });

  // inputs (adreça + dades de contacte)
  root.addEventListener('input', (e) => {
    const inp = e.target.closest('.quiz-input');
    if (!inp) return;
    const cur = steps[state.step - 1];
    if (cur.dataset.field) state.answers[cur.dataset.field] = inp.value;
    syncNext();
  });

  // enter al camp d'adreça avança
  root.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    const cur = steps[state.step - 1];
    const next = cur.querySelector('.quiz-next');
    if (next && !next.disabled && cur.dataset.kind !== 'form') { e.preventDefault(); go(state.step + 1); }
  });

  /* ---- final: pantalla premium ---- */
  function finish() {
    const cur = steps[TOTAL - 1];
    state.answers.nom    = cur.querySelector('[name="nom"]').value.trim();
    state.answers.email  = cur.querySelector('[name="email"]').value.trim();
    state.answers.tel    = cur.querySelector('[name="tel"]').value.trim();

    const key = recommend(state.answers);
    const p = PLANS[key];
    const first = (state.answers.nom || '').split(' ')[0];

    result.querySelector('.r-hello').textContent = first ? (first + ', el teu camí és clar.') : 'El teu camí és clar.';
    result.querySelector('.r-plan').textContent = 'NOVERA ' + p.name;
    result.querySelector('.r-tag').textContent = p.tag;
    result.querySelector('.r-desc').textContent = p.desc;

    // meta chips
    const meta = result.querySelector('.result-meta');
    meta.innerHTML = '';
    const chips = [];
    if (state.answers.adreca) chips.push(['Immoble', state.answers.adreca]);
    if (state.answers.tipus)  chips.push(['Tipus', TIPUS_LABEL[state.answers.tipus]]);
    if (state.answers.situacio) chips.push(['Situació', SIT_LABEL[state.answers.situacio]]);
    chips.forEach(([k, v]) => {
      const s = document.createElement('span');
      s.innerHTML = k + ' · <b></b>';
      s.querySelector('b').textContent = v;
      meta.appendChild(s);
    });

    // transició a resultat
    stage.style.display = 'none';
    topBar.style.display = 'none';
    backBtn.style.display = 'none';
    segs.forEach(s => s.classList.add('done'));
    result.classList.add('active');
    root.scrollIntoView({ behavior:'smooth', block:'center' });

    // → envia el lead als correus de NOVERA
    if (window.NOVERAforms) {
      const LABELS = { adreca:'Adreça immoble', situacio:'Situació', gestio:'Gestió actual', important:'Prioritat', termini:'Termini' };
      const fields = { 'Tipus de formulari': 'Venedor — Descobreix el teu camí' };
      Object.keys(state.answers).forEach(k => {
        if (['nom','email','tel'].includes(k)) return;
        fields[LABELS[k] || k] = state.answers[k];
      });
      fields['Nom'] = state.answers.nom || '';
      fields['Email'] = state.answers.email || '';
      fields['Telèfon'] = state.answers.tel || '';
      fields['Pla recomanat'] = 'NOVERA ' + p.name;
      window.NOVERAforms.send({
        subject: 'Nova anàlisi de venedor · ' + (state.answers.nom || 'sense nom'),
        replyto: state.answers.email,
        fields
      });
    }
  }

  function restart() {
    state.step = 1; state.answers = {};
    result.classList.remove('active');
    stage.style.display = '';
    topBar.style.display = '';
    backBtn.style.display = '';
    root.querySelectorAll('.quiz-opt.sel').forEach(o => o.classList.remove('sel'));
    root.querySelectorAll('.quiz-input').forEach(i => i.value = '');
    render();
    root.scrollIntoView({ behavior:'smooth', block:'center' });
  }

  render();
})();
