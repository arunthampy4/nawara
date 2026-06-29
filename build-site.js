/*
 * Static site generator for Nawara Muscat Trading & Contracting.
 * Run: node build-site.js  ->  emits index.html + services/*.html
 * Then: npm run build       ->  compiles dist/styles.css via Tailwind
 */
const fs = require("fs");
const path = require("path");

/* ------------------------------------------------------------------ */
/* Business config — single source of truth                            */
/* ------------------------------------------------------------------ */
const BIZ = {
  name: "Nawara Muscat Trading & Contracting",
  shortName: "Nawara Muscat",
  nameAr: "نوارة مسقط للتجارة والمقاولات",
  domain: "https://nawaramuscat.com",
  phoneDisplay: "+968 9570 7785",
  phoneTel: "+96895707785",
  whatsapp: "96895707785",
  email: "info@nawaramuscat.com",
  city: "Muscat",
  country: "Oman",
  address: "Muscat, Sultanate of Oman",
  hours: "Sat – Thu: 7:00 AM – 9:00 PM",
};

const whatsappLink = (msg) =>
  `https://wa.me/${BIZ.whatsapp}?text=${encodeURIComponent(msg)}`;
const WA_DEFAULT = whatsappLink(
  "Hello Nawara Muscat, I'd like to know more about your cleaning services."
);

/* ------------------------------------------------------------------ */
/* SVG: logo mark                                                      */
/* ------------------------------------------------------------------ */
let _logoSeq = 0;
let LOGO_PREFIX = ""; // set per-page by layout() so the image path resolves correctly

// Inline SVG fallback (shown only if assets/logo-mark.png is not present yet)
function logoSvg(cls) {
  const u = `nl${++_logoSeq}`; // unique gradient ids per instance
  return `<svg class="${cls}" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="${u}g" x1="22" y1="22" x2="98" y2="108" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#6CC24A"/><stop offset="1" stop-color="#2E9B3E"/>
    </linearGradient>
    <linearGradient id="${u}b" x1="42" y1="30" x2="80" y2="88" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#41B6EA"/><stop offset="1" stop-color="#1C77C0"/>
    </linearGradient>
    <linearGradient id="${u}d" x1="48" y1="12" x2="72" y2="56" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#5CC3F1"/><stop offset="1" stop-color="#1A84CE"/>
    </linearGradient>
  </defs>
  <path d="M83.2 35.5 A34 34 0 1 1 36.8 35.5" fill="none" stroke="url(#${u}g)" stroke-width="12.5" stroke-linecap="round"/>
  <path d="M66 39 C 84 45 86 71 67 83 C 58 88 47 87 41.5 81.5 C 54 82 61 73 61 61 C 61 51 60 44 66 39 Z" fill="url(#${u}b)"/>
  <path d="M60 13 C 67.5 25.5 75 33 75 41.2 A 15 15 0 1 1 45 41.2 C 45 33 52.5 25.5 60 13 Z" fill="url(#${u}d)"/>
  <ellipse cx="54.5" cy="35" rx="3.3" ry="5" fill="#fff" opacity=".42"/>
</svg>`;
}

// Logo mark: uses assets/logo-mark.png when present, otherwise the inline SVG.
// Drop the real icon (transparent PNG/SVG) at assets/logo-mark.png and it is used automatically.
function logoMark(cls = "h-10 w-10") {
  return `<span class="${cls} relative inline-block align-middle">
    <img src="${LOGO_PREFIX}assets/logo-mark.svg" alt="Nawara Muscat logo" class="absolute inset-0 h-full w-full object-contain" onerror="this.style.display='none';this.nextElementSibling.style.display='block';" />
    <span style="display:none" class="block h-full w-full">${logoSvg("h-full w-full")}</span>
  </span>`;
}

function logoFull(prefix) {
  // Header shows the full brand lockup (assets/logo-mark.svg) on its own.
  // Falls back to the inline icon + text if the file is missing.
  return `<a href="${prefix}index.html" class="flex items-center group" aria-label="Nawara Muscat Trading &amp; Contracting — Home">
    <img src="${prefix}assets/logo-mark.svg" alt="Nawara Muscat Trading &amp; Contracting" class="h-16 w-auto sm:h-[84px] transition-transform group-hover:scale-[1.03]" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" />
    <span style="display:none" class="items-center gap-3">
      ${logoSvg("h-11 w-11")}
      <span class="flex flex-col leading-tight">
        <span class="font-display font-extrabold text-[15px] sm:text-base text-ink tracking-tight">Nawara Muscat</span>
        <span class="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] text-slatey-400">Trading &amp; Contracting</span>
      </span>
    </span>
  </a>`;
}

/* ------------------------------------------------------------------ */
/* SVG icons                                                           */
/* ------------------------------------------------------------------ */
const I = {
  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-[1.05em] w-[1.05em]"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>`,
  whatsapp: `<svg viewBox="0 0 24 24" fill="currentColor" class="h-[1.15em] w-[1.15em]"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.13c-.24.68-1.42 1.32-1.95 1.36-.5.05-.5.41-3.16-.66-2.66-1.07-4.3-3.8-4.43-3.97-.13-.17-1.05-1.4-1.05-2.67 0-1.27.66-1.9.9-2.16.24-.26.52-.32.7-.32l.5.01c.16.01.38-.06.59.45.24.58.81 2 .88 2.14.07.14.12.31.02.49-.1.18-.15.29-.29.45-.14.16-.3.36-.43.48-.14.14-.29.29-.12.57.17.28.74 1.22 1.59 1.98 1.09.97 2.01 1.27 2.29 1.41.28.14.45.12.61-.07.16-.19.7-.81.89-1.09.18-.28.37-.23.61-.14.24.09 1.55.73 1.81.86.26.13.44.2.5.31.07.11.07.62-.17 1.3Z"/></svg>`,
  arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
  arrowUpRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M7 17 17 7M8 7h9v9"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="h-3.5 w-3.5"><path d="M20 6 9 17l-5-5"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
  shieldCheck: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></svg>`,
  bolt: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z"/></svg>`,
  location: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>`,
  star: `<svg viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z"/></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" class="h-7 w-7"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  building: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" class="h-7 w-7"><rect x="4" y="2" width="16" height="20" rx="1.5"/><path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/></svg>`,
  sofa: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" class="h-7 w-7"><path d="M5 11V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4"/><path d="M3 13a2 2 0 0 1 2-2 2 2 0 0 1 2 2v2h10v-2a2 2 0 0 1 4 0v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-5Z"/><path d="M6 19v2M18 19v2"/></svg>`,
  bug: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" class="h-7 w-7"><path d="M8 9V6a4 4 0 0 1 8 0v3"/><rect x="7" y="9" width="10" height="11" rx="5"/><path d="M12 13v6M3 13h4M3 8l3 2M3 18l3-2M21 13h-4M21 8l-3 2M21 18l-3-2"/></svg>`,
  spray: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" class="h-7 w-7"><path d="M9 11h6a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z"/><path d="M9 11V6a2 2 0 0 1 2-2h2M13 4V2M17 6h.01M20 4h.01M17 9h.01M20 11h.01M21 7h.01"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>`,
  clipboard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M9 12l2 2 4-4"/></svg>`,
  sparkles: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6"><path d="M12 3l1.9 4.6L18.5 9.5 13.9 11.4 12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3ZM19 14l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2ZM5 15l.6 1.5L7 17l-1.4.5L5 19l-.6-1.5L3 17l1.4-.5L5 15Z"/></svg>`,
  smile: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6"><circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></svg>`,
  quote: `<svg viewBox="0 0 24 24" fill="currentColor" class="h-8 w-8"><path d="M7.5 6C5 6 3 8 3 10.5S5 15 7.5 15c0 2-1.2 3.3-3 3.7-.4.1-.5.6-.2.9.2.2.5.2.7.1C8.4 18.4 11 15.7 11 11.5 11 8.5 9.5 6 7.5 6Zm9 0C14 6 12 8 12 10.5S14 15 16.5 15c0 2-1.2 3.3-3 3.7-.4.1-.5.6-.2.9.2.2.5.2.7.1 3.4-1.4 6-4.1 6-8.3C20 8.5 18.5 6 16.5 6Z"/></svg>`,
};

/* service-specific big icons map */
const SERVICE_ICON = {
  building: I.building,
  sofa: I.sofa,
  bug: I.bug,
  shield: I.shieldCheck.replace("h-5 w-5", "h-7 w-7"),
  spray: I.spray,
  users: I.users,
};

/* ------------------------------------------------------------------ */
/* Services data                                                       */
/* ------------------------------------------------------------------ */
const SERVICES = require("./content/services.js")(BIZ);

/* ------------------------------------------------------------------ */
/* Header + Footer                                                     */
/* ------------------------------------------------------------------ */
function header(prefix, active) {
  const link = (href, label, id) =>
    `<a href="${href}" class="nav-link ${active === id ? "!text-brand-blue" : ""}">${label}</a>`;
  return `<header class="sticky top-0 z-50 border-b border-mist-100 bg-white/85 backdrop-blur-md">
  <div class="container-x flex min-h-[92px] items-center justify-between gap-4 py-2">
    ${logoFull(prefix)}
    <nav class="hidden items-center gap-8 lg:flex">
      ${link(prefix + "index.html", "Home", "home")}
      ${link(prefix + "index.html#services", "Services", "services")}
      ${link(prefix + "index.html#why", "Why Us", "why")}
      ${link(prefix + "index.html#about", "About", "about")}
      ${link(prefix + "index.html#contact", "Contact", "contact")}
    </nav>
    <div class="flex items-center gap-3">
      <a href="tel:${BIZ.phoneTel}" class="hidden items-center gap-2 text-sm font-bold text-ink md:flex">
        <span class="flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">${I.phone}</span>
        <span>${BIZ.phoneDisplay}</span>
      </a>
      <a href="${prefix}index.html#contact" class="btn-gradient !px-5 !py-2.5 hidden sm:inline-flex">Book Now</a>
      <button id="menuBtn" aria-label="Open menu" class="lg:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-mist-200 text-ink">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="h-5 w-5"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
      </button>
    </div>
  </div>
  <div id="mobileMenu" class="hidden border-t border-mist-100 bg-white lg:hidden">
    <nav class="container-x flex flex-col gap-1 py-4">
      <a href="${prefix}index.html" class="rounded-lg px-3 py-2.5 font-semibold text-ink hover:bg-mist-50">Home</a>
      <a href="${prefix}index.html#services" class="rounded-lg px-3 py-2.5 font-semibold text-ink hover:bg-mist-50">Services</a>
      <a href="${prefix}index.html#why" class="rounded-lg px-3 py-2.5 font-semibold text-ink hover:bg-mist-50">Why Us</a>
      <a href="${prefix}index.html#about" class="rounded-lg px-3 py-2.5 font-semibold text-ink hover:bg-mist-50">About</a>
      <a href="${prefix}index.html#contact" class="rounded-lg px-3 py-2.5 font-semibold text-ink hover:bg-mist-50">Contact</a>
      <div class="mt-2 flex gap-2">
        <a href="tel:${BIZ.phoneTel}" class="btn-outline flex-1">Call</a>
        <a href="${WA_DEFAULT}" target="_blank" rel="noopener" class="btn-whatsapp flex-1">WhatsApp</a>
      </div>
    </nav>
  </div>
</header>`;
}

function footer(prefix) {
  const svcLinks = SERVICES.map(
    (s) =>
      `<li><a href="${prefix}services/${s.slug}.html" class="text-slatey-400 hover:text-white transition-colors">${s.name}</a></li>`
  ).join("\n");
  return `<footer class="bg-ink text-white">
  <div class="container-x py-16">
    <div class="grid gap-12 lg:grid-cols-4">
      <div class="lg:col-span-1">
        <div class="flex items-center gap-3">
          ${logoSvg("h-11 w-11")}
          <span class="flex flex-col leading-tight">
            <span class="font-display font-extrabold text-white">Nawara Muscat</span>
            <span class="text-[11px] font-semibold uppercase tracking-[0.14em] text-slatey-400">Trading &amp; Contracting</span>
          </span>
        </div>
        <p class="mt-5 text-sm leading-relaxed text-slatey-400">A locally based Omani company for cleaning, deep sanitizing, maintenance, pest control and manpower supply across Muscat.</p>
        <p class="mt-4 font-display text-lg" dir="rtl" lang="ar">${BIZ.nameAr}</p>
      </div>
      <div>
        <h4 class="text-sm font-bold uppercase tracking-wider text-white">Services</h4>
        <ul class="mt-5 space-y-3 text-sm">${svcLinks}</ul>
      </div>
      <div>
        <h4 class="text-sm font-bold uppercase tracking-wider text-white">Company</h4>
        <ul class="mt-5 space-y-3 text-sm">
          <li><a href="${prefix}index.html#about" class="text-slatey-400 hover:text-white transition-colors">About Us</a></li>
          <li><a href="${prefix}index.html#why" class="text-slatey-400 hover:text-white transition-colors">Why Choose Us</a></li>
          <li><a href="${prefix}index.html#services" class="text-slatey-400 hover:text-white transition-colors">All Services</a></li>
          <li><a href="${prefix}index.html#contact" class="text-slatey-400 hover:text-white transition-colors">Get a Free Quote</a></li>
        </ul>
      </div>
      <div>
        <h4 class="text-sm font-bold uppercase tracking-wider text-white">Get in touch</h4>
        <ul class="mt-5 space-y-4 text-sm">
          <li class="flex items-start gap-3"><span class="text-brand-cyan mt-0.5">${I.phone}</span><a href="tel:${BIZ.phoneTel}" class="text-slatey-400 hover:text-white">${BIZ.phoneDisplay}</a></li>
          <li class="flex items-start gap-3"><span class="text-brand-cyan mt-0.5">${I.mail}</span><a href="mailto:${BIZ.email}" class="text-slatey-400 hover:text-white">${BIZ.email}</a></li>
          <li class="flex items-start gap-3"><span class="text-brand-cyan mt-0.5">${I.location}</span><span class="text-slatey-400">${BIZ.address}</span></li>
          <li class="flex items-start gap-3"><span class="text-brand-cyan mt-0.5">${I.clock}</span><span class="text-slatey-400">${BIZ.hours}</span></li>
        </ul>
      </div>
    </div>
    <div class="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 sm:flex-row">
      <p class="text-xs text-slatey-400">© ${new Date().getFullYear()} ${BIZ.name}. All rights reserved.</p>
      <p class="text-xs text-slatey-400">Cleaning &amp; Maintenance Services in Muscat, Oman</p>
    </div>
  </div>
</footer>`;
}

/* Floating WhatsApp button + mobile-menu script */
function floatingWA() {
  return `<a href="${WA_DEFAULT}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp"
  class="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#1FA855] text-white shadow-float transition-transform hover:scale-110">
  <span class="text-2xl">${I.whatsapp}</span>
</a>`;
}

const SCRIPT = `<script>
  (function(){
    var b=document.getElementById('menuBtn'),m=document.getElementById('mobileMenu');
    if(b&&m){b.addEventListener('click',function(){m.classList.toggle('hidden');});}
    // reveal-on-scroll (progressive enhancement: content is fully visible without JS)
    var els=document.querySelectorAll('[data-reveal]');
    function showAll(){els.forEach(function(el){el.style.opacity=1;el.style.transform='none';});}
    if('IntersectionObserver' in window){
      els.forEach(function(el){el.style.opacity=0;el.style.transform='translateY(20px)';el.style.transition='opacity .6s ease, transform .6s ease';});
      var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.style.opacity=1;e.target.style.transform='none';io.unobserve(e.target);}});},{threshold:0,rootMargin:'0px 0px -8% 0px'});
      els.forEach(function(el){io.observe(el);});
      // safety net: never leave content hidden
      window.addEventListener('load',function(){setTimeout(showAll,2500);});
    }
  })();
</script>`;

/* ------------------------------------------------------------------ */
/* Layout                                                              */
/* ------------------------------------------------------------------ */
function layout({ title, description, prefix, active, body, canonical }) {
  LOGO_PREFIX = prefix; // so logo image path resolves on home and /services/ pages
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <link rel="canonical" href="${canonical}" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:site_name" content="${BIZ.name}" />
  <meta name="theme-color" content="#1295D8" />
  <link rel="icon" href="${prefix}assets/favicon.svg" type="image/svg+xml" />
  <link rel="stylesheet" href="${prefix}dist/styles.css" />
  <script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CleaningService",
    name: BIZ.name,
    alternateName: BIZ.nameAr,
    image: BIZ.domain + "/assets/favicon.svg",
    url: BIZ.domain + "/",
    telephone: BIZ.phoneTel,
    email: BIZ.email,
    priceRange: "$$",
    areaServed: { "@type": "City", name: "Muscat" },
    address: { "@type": "PostalAddress", addressLocality: "Muscat", addressCountry: "OM" },
    openingHours: "Sa-Th 07:00-21:00",
    description:
      "Professional cleaning, pest control, termite treatment, sanitization and cleaning manpower supply across Muscat, Oman.",
    makesOffer: SERVICES.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.name, url: BIZ.domain + "/services/" + s.slug + ".html" },
    })),
  })}</script>
</head>
<body>
  ${header(prefix, active)}
  <main>
${body}
  </main>
  ${footer(prefix)}
  ${floatingWA()}
  ${SCRIPT}
</body>
</html>`;
}

module.exports = {
  BIZ,
  I,
  SERVICE_ICON,
  SERVICES,
  whatsappLink,
  WA_DEFAULT,
  logoMark,
  layout,
};

/* If run directly, delegate to the page builders */
if (require.main === module) {
  require("./content/render.js")(module.exports);
}
