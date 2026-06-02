# NOVERA — Web

Lloc web estàtic de NOVERA (HTML + CSS + JS, sense build).

## Estructura

```
index.html         # Pàgina principal (venedors)
compradors.html    # Canal Compradors
legal.html         # Avís legal, privacitat, cookies, canal ètic
image-slot.js      # Component de slots d'imatge (drag & drop)
assets/            # CSS i JS
  novera.css
  canal.css  canal.js
  legal.css  legal.js
  questionnaire.js
```

## Desenvolupament local

No cal cap dependència. Obre `index.html` amb un servidor estàtic:

```bash
npx serve .
# o
python3 -m http.server 5173
```

## Desplegament (Vercel)

Projecte 100% estàtic — **sense framework ni build**.
- Framework Preset: **Other**
- Build Command: *(buit)*
- Output Directory: `.` (arrel)

## Notes

- Les imatges del hero i seccions són *slots* (`<image-slot>`) que es completen
  arrossegant-hi una foto; per producció, substitueix-los per `<img>` reals.
- Dades fiscals i textos legals revisats a `legal.html`.
