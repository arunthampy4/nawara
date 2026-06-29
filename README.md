# Nawara Muscat Trading & Contracting — Website

Marketing website for **Nawara Muscat Trading & Contracting** — a locally based
Omani company providing cleaning, sanitization, pest control, termite treatment
and cleaning-manpower supply across Muscat, Oman.

- **Live domain:** https://nawaramuscat.com
- **Stack:** Static HTML + [Tailwind CSS](https://tailwindcss.com) (compiled), zero runtime dependencies.
- **Hosting:** Works on any static host — Netlify, Vercel, GitHub Pages, cPanel, S3, etc. No server or Node runtime required in production.

> ℹ️ The previous domain `nawaraco.com` expired and was lost. The site now uses
> `nawaramuscat.com` — all canonical URLs, the sitemap and structured data point there.
> Update the domain in **one place** (`build-site.js` → `BIZ.domain`) if it ever changes.

---

## What's in the box

| Page | File |
|------|------|
| Home (hero, services, why-us, about, contact) | `index.html` |
| Building & House Cleaning | `services/building-house-cleaning.html` |
| Sofa & Carpet Cleaning | `services/sofa-carpet-cleaning.html` |
| Pest Control Service | `services/pest-control.html` |
| Termites Treatment | `services/termites-treatment.html` |
| Sanitization Services | `services/sanitization.html` |
| Cleaning Manpower Supply | `services/cleaning-manpower-supply.html` |

Plus `sitemap.xml`, `robots.txt`, `assets/` (logo, favicon, hero illustration)
and self-hosted fonts in `fonts/` (Plus Jakarta Sans + Inter — no Google Fonts
request at runtime).

## Features

- Fully responsive, mobile-first design with a sticky header + mobile menu.
- Brand palette derived from the Nawara logo (water-drop blue → leaf green gradient).
- Click-to-call, WhatsApp deep-links and a quote form that sends to WhatsApp.
- Floating WhatsApp button on every page.
- SEO: per-page titles/descriptions, canonical URLs, Open Graph tags,
  `CleaningService` JSON-LD structured data, sitemap and robots.txt.
- Scroll-reveal animations (progressive enhancement — content is fully visible without JS).
- **Arabic-ready** (see below).

---

## Editing content

All content and configuration live in plain JS so the HTML can be regenerated
consistently:

- **`build-site.js`** — business details (`BIZ`: phone, email, hours, domain),
  the logo/icons, shared header & footer, and the page `layout()`.
- **`content/services.js`** — the 6 services and all their long-form copy.
- **`content/render.js`** — the home page and service-page templates,
  plus sitemap/robots generation.
- **`src/input.css`** + **`tailwind.config.js`** — design system (colors, fonts, components).

After editing any of the above, regenerate the site:

```bash
npm install        # first time only
node build-site.js # regenerate index.html + service pages + sitemap + robots
npm run build      # compile dist/styles.css (minified)
```

> Edit the generated `.html` files? Don't — they are overwritten by
> `node build-site.js`. Change the source JS/CSS instead.

### Handy scripts

```bash
npm run build   # compile Tailwind once (minified)
npm run watch   # recompile CSS on change while developing
```

## Local preview

Open `index.html` directly, or serve the folder:

```bash
npx serve .      # or: python3 -m http.server
```

## Deploy

Upload the whole repository **except** `node_modules/`, `src/`, `content/`,
`build-site.js`, `tailwind.config.js`, `package*.json` (those are build-time
only). The runtime site is just:

```
index.html  services/  dist/  assets/  fonts/  sitemap.xml  robots.txt
```

The simplest path: connect the repo to Netlify/Vercel/GitHub Pages and publish
the root. No build command is required because `dist/styles.css` is committed —
though you may set `npm run build` as the build step if preferred.

### Deploying to Hostinger (file manager / cPanel)

1. Run `node build-site.js && npm run build` locally so `index.html`,
   `services/`, `dist/`, `sitemap.xml` and `robots.txt` are up to date.
2. In Hostinger → **Files → File Manager**, open `public_html`.
3. Upload these to `public_html` (keep the folder structure):
   `index.html`, `services/`, `dist/`, `assets/`, `fonts/`, `sitemap.xml`, `robots.txt`.
   *(You can skip `node_modules/`, `src/`, `content/` and the build files — they're not needed at runtime.)*
   Tip: zip those folders, upload the zip, then "Extract" inside `public_html`.
4. Point the `nawaramuscat.com` domain at the hosting and enable free SSL.
   The site is static, so it works immediately — no Node/PHP setup required.

> After uploading, submit `https://nawaramuscat.com/sitemap.xml` in
> Google Search Console to help recover ranking lost with the old domain.

## Things to personalise before launch

- **Contact details** — `info@nawaramuscat.com`, hours and address are sensible
  defaults in `build-site.js` (`BIZ`). Replace with the real ones.
- **Testimonials** — the three reviews in `content/render.js` are realistic
  **samples**; swap them for genuine client reviews before going live.
- **Photos** — hero and service visuals are clean SVG illustrations. Dropping in
  real job photos (in `assets/`) will make the site pop.

---

## Arabic version (planned)

The site is structured to add an Arabic (RTL) version cleanly later:

- Business name is already bilingual (`BIZ.nameAr`) and rendered with `dir="rtl"`.
- Plan: add an `ar/` directory generated from the same templates with
  `<html lang="ar" dir="rtl">`, an Arabic font subset, and a language switcher
  in the header. Tailwind's logical utilities + a small RTL pass handle layout
  mirroring. Content strings would move into a `content/i18n.js` map.

English is the current scope; Arabic can be layered on without restructuring.
