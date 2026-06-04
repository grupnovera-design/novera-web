/* ════════════════════════════════════════════════════════════
   NOVERA — Enviament de formularis (Web3Forms)
   Envia cada formulari a DUES adreces de correu alhora:
     · comercial@clubnovera.com   (principal)
     · grupnovera@gmail.com       (còpia)
   Sense servidor — funciona en hosting estàtic (GitHub Pages).

   ▶ PAS ÚNIC PER ACTIVAR-HO (gratuït):
     1. Entra a https://web3forms.com  → "Create Access Key"
        · Posa  comercial@clubnovera.com  → rebràs una Access Key per correu.
        · Repeteix amb  grupnovera@gmail.com  → rebràs una segona Access Key.
     2. Enganxa les dues claus aquí sota (substitueix els текstos en MAJÚSCULES).
        Les Access Keys són públiques i segures (només són un àlies del correu).
   Mentre no les posis, els formularis funcionen però NO s'envia cap correu.
   ════════════════════════════════════════════════════════════ */
window.NOVERAforms = (function () {
  "use strict";

  // ▼▼▼ ENGANXA AQUÍ LES TEVES ACCESS KEYS ▼▼▼
  var KEY_PRINCIPAL = "49cb09fa-e2e6-4fed-b978-4e3a5a519efb";   // → comercial@clubnovera.com
  var KEY_COPIA     = "7d715a09-d571-4e67-832a-dd1fb1ddb470";  // → grupnovera@gmail.com (còpia)
  // ▲▲▲ ─────────────────────────────────────── ▲▲▲

  var ENDPOINT = "https://api.web3forms.com/submit";

  function isReal(k) { return k && k.indexOf("WEB3FORMS_KEY_") !== 0; }

  // opts: { subject, fields:{label:value,…}, replyto }
  function send(opts) {
    opts = opts || {};
    var fields = opts.fields || {};
    var keys = [KEY_PRINCIPAL, KEY_COPIA].filter(isReal);

    if (!keys.length) {
      console.warn("[NOVERA] Formularis: encara no hi ha cap Access Key de Web3Forms configurada a assets/forms.js — no s'ha enviat cap correu. Dades recollides:", fields);
      return Promise.resolve(false);
    }

    var message = Object.keys(fields).map(function (k) {
      return k + ": " + (fields[k] == null ? "" : fields[k]);
    }).join("\n");

    var requests = keys.map(function (key) {
      var body = { access_key: key,
        subject: opts.subject || "Nou formulari · NOVERA",
        from_name: "Web NOVERA",
        replyto: opts.replyto || "",
        message: message };
      for (var k in fields) if (Object.prototype.hasOwnProperty.call(fields, k)) body[k] = fields[k];
      return fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(body)
      }).then(function (r) { return r.json(); })
        .catch(function (e) { console.warn("[NOVERA] enviament fallit:", e); return { success: false }; });
    });

    return Promise.all(requests).then(function (res) {
      var ok = res.some(function (r) { return r && r.success; });
      if (ok) console.log("[NOVERA] Formulari enviat correctament.");
      return ok;
    });
  }

  return { send: send };
})();
