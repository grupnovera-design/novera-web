/* ════════════════════════════════════════════════════════════
   NOVERA — Consentiment de cookies (RGPD / LSSI-CE / UE)
   Banner amb Acceptar-ho tot · Rebutjar · Configurar.
   Persisteix a localStorage. Les analítiques/màrqueting
   només s'haurien d'activar si l'usuari ho consent.
   ════════════════════════════════════════════════════════════ */
(function () {
  const KEY = 'novera_cookie_consent_v1';
  const banner = document.getElementById('cookieBanner');
  if (!banner) return;

  const config = banner.querySelector('.cookie-config');
  const toggles = {
    analytics: banner.querySelector('[data-cat="analytics"]'),
    marketing: banner.querySelector('[data-cat="marketing"]')
  };

  function stored() {
    try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; }
  }
  function save(consent) {
    consent.ts = new Date().toISOString();
    try { localStorage.setItem(KEY, JSON.stringify(consent)); } catch (e) {}
    applyConsent(consent);
  }
  function applyConsent(c) {
    // Punt d'integració: aquí s'activarien scripts de tercers només si hi ha consentiment.
    window.dispatchEvent(new CustomEvent('novera:consent', { detail: c }));
  }

  function show() { requestAnimationFrame(() => banner.classList.add('show')); }
  function hide() { banner.classList.remove('show'); }

  // estat inicial
  const existing = stored();
  if (!existing) {
    setTimeout(show, 900);
  } else {
    applyConsent(existing);
  }

  banner.addEventListener('click', (e) => {
    const t = e.target.closest('[data-ck]');
    if (t) {
      const action = t.dataset.ck;
      if (action === 'accept') { save({ necessary:true, analytics:true, marketing:true }); hide(); }
      else if (action === 'reject') { save({ necessary:true, analytics:false, marketing:false }); hide(); }
      else if (action === 'config') {
        config.classList.toggle('open');
        t.textContent = config.classList.contains('open') ? 'Amagar opcions' : 'Configurar';
      }
      else if (action === 'save') {
        save({ necessary:true, analytics:toggles.analytics.classList.contains('on'), marketing:toggles.marketing.classList.contains('on') });
        hide();
      }
      return;
    }
    // toggles dins config
    const tg = e.target.closest('.ck-toggle:not(.locked)');
    if (tg) { tg.classList.toggle('on'); }
  });

  // permet reobrir el banner des d'enllaços "configurar cookies"
  document.addEventListener('click', (e) => {
    const opener = e.target.closest('[data-open-cookies]');
    if (opener) { e.preventDefault(); config.classList.remove('open');
      const cfgBtn = banner.querySelector('[data-ck="config"]'); if (cfgBtn) cfgBtn.textContent='Configurar';
      show(); }
  });
})();
