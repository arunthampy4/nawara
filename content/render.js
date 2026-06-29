const fs = require("fs");
const path = require("path");

module.exports = function render(ctx) {
  const { BIZ, I, SERVICE_ICON, SERVICES, whatsappLink, WA_DEFAULT, logoMark, layout } = ctx;

  /* ---------------- shared snippets ---------------- */
  const heroCTAs = (prefix) => `
    <div class="mt-8 flex flex-col gap-3 sm:flex-row">
      <a href="${prefix}index.html#contact" class="btn-gradient text-base !px-7 !py-4">Book Service ${I.arrow}</a>
      <a href="${WA_DEFAULT}" target="_blank" rel="noopener" class="btn-whatsapp text-base !px-7 !py-4">${I.whatsapp} WhatsApp Us</a>
    </div>`;

  const quoteForm = `
    <form class="space-y-4" action="${WA_DEFAULT}" method="get" onsubmit="return nawaraQuote(event)">
      <div class="grid gap-4 sm:grid-cols-2">
        <div>
          <label class="mb-1.5 block text-sm font-semibold text-ink" for="q-name">Full name</label>
          <input id="q-name" name="name" required class="w-full rounded-xl border border-mist-200 bg-mist-50 px-4 py-3 text-ink outline-none transition focus:border-brand-blue focus:bg-white" placeholder="Your name" />
        </div>
        <div>
          <label class="mb-1.5 block text-sm font-semibold text-ink" for="q-phone">Phone</label>
          <input id="q-phone" name="phone" required class="w-full rounded-xl border border-mist-200 bg-mist-50 px-4 py-3 text-ink outline-none transition focus:border-brand-blue focus:bg-white" placeholder="+968 …" />
        </div>
      </div>
      <div>
        <label class="mb-1.5 block text-sm font-semibold text-ink" for="q-service">Service needed</label>
        <select id="q-service" name="service" class="w-full rounded-xl border border-mist-200 bg-mist-50 px-4 py-3 text-ink outline-none transition focus:border-brand-blue focus:bg-white">
          ${SERVICES.map((s) => `<option>${s.name}</option>`).join("")}
          <option>Other / Custom plan</option>
        </select>
      </div>
      <div>
        <label class="mb-1.5 block text-sm font-semibold text-ink" for="q-msg">Message</label>
        <textarea id="q-msg" name="message" rows="3" class="w-full rounded-xl border border-mist-200 bg-mist-50 px-4 py-3 text-ink outline-none transition focus:border-brand-blue focus:bg-white" placeholder="Tell us about your space and preferred timing…"></textarea>
      </div>
      <button type="submit" class="btn-gradient w-full text-base !py-4">Send via WhatsApp ${I.arrow}</button>
      <p class="text-center text-xs text-slatey-400">We'll reply quickly during working hours — ${BIZ.hours}.</p>
    </form>
    <script>
      function nawaraQuote(e){
        e.preventDefault();
        var f=e.target;
        var t="New quote request%0A%0AName: "+encodeURIComponent(f.name.value)+
              "%0APhone: "+encodeURIComponent(f.phone.value)+
              "%0AService: "+encodeURIComponent(f.service.value)+
              "%0AMessage: "+encodeURIComponent(f.message.value);
        window.open("https://wa.me/${BIZ.whatsapp}?text="+t,"_blank");
        return false;
      }
    </script>`;

  const contactSection = (prefix) => `
  <section id="contact" class="bg-mist-50 py-20 sm:py-28">
    <div class="container-x">
      <div class="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div data-reveal>
          <span class="pill-blue">Get in touch</span>
          <h2 class="mt-5 text-3xl sm:text-4xl">Book your service or request a free quote</h2>
          <p class="mt-4 max-w-md text-lg text-slatey-500">Tell us what you need and our team will get back to you fast. Reliable cleaning, sanitization, pest control and manpower — across Muscat.</p>
          <div class="mt-8 space-y-4">
            <a href="tel:${BIZ.phoneTel}" class="flex items-center gap-4 rounded-2xl border border-mist-200 bg-white p-4 shadow-card transition hover:shadow-cardHover">
              <span class="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">${I.phone}</span>
              <span><span class="block text-xs font-semibold uppercase tracking-wider text-slatey-400">Call us</span><span class="block font-bold text-ink">${BIZ.phoneDisplay}</span></span>
            </a>
            <a href="${WA_DEFAULT}" target="_blank" rel="noopener" class="flex items-center gap-4 rounded-2xl border border-mist-200 bg-white p-4 shadow-card transition hover:shadow-cardHover">
              <span class="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1FA855]/10 text-[#1FA855]">${I.whatsapp}</span>
              <span><span class="block text-xs font-semibold uppercase tracking-wider text-slatey-400">WhatsApp</span><span class="block font-bold text-ink">Chat with our team</span></span>
            </a>
            <a href="mailto:${BIZ.email}" class="flex items-center gap-4 rounded-2xl border border-mist-200 bg-white p-4 shadow-card transition hover:shadow-cardHover">
              <span class="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green/10 text-brand-leaf">${I.mail}</span>
              <span><span class="block text-xs font-semibold uppercase tracking-wider text-slatey-400">Email</span><span class="block font-bold text-ink">${BIZ.email}</span></span>
            </a>
            <div class="flex items-center gap-4 rounded-2xl border border-mist-200 bg-white p-4 shadow-card">
              <span class="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal">${I.location}</span>
              <span><span class="block text-xs font-semibold uppercase tracking-wider text-slatey-400">Location</span><span class="block font-bold text-ink">${BIZ.address}</span></span>
            </div>
          </div>
        </div>
        <div data-reveal>
          <div class="rounded-3xl border border-mist-200 bg-white p-7 shadow-soft sm:p-9">
            <h3 class="text-xl font-bold text-ink">Request a free quote</h3>
            <p class="mt-1 mb-6 text-sm text-slatey-500">No obligation — just honest advice and a fair price.</p>
            ${quoteForm}
          </div>
        </div>
      </div>
    </div>
  </section>`;

  /* ---------------- HOME ---------------- */
  function homeBody() {
    const prefix = "";
    const serviceCards = SERVICES.map(
      (s) => `
      <a href="services/${s.slug}.html" class="service-card group" data-reveal>
        <span class="icon-badge">${SERVICE_ICON[s.iconKey]}</span>
        <h3 class="mt-6 text-xl">${s.name}</h3>
        <p class="mt-2 flex-1 text-slatey-500">${s.short}</p>
        <span class="link-arrow mt-6">Learn More ${I.arrowUpRight}</span>
      </a>`
    ).join("\n");

    const why = [
      { icon: I.shieldCheck, t: "Trusted Local Experts", d: "A locally based Omani company operating with high ethical standards and proven processes." },
      { icon: I.bolt, t: "Fast Response Team", d: "Quick scheduling and a reliable crew that shows up on time, every time." },
      { icon: I.star, t: "Quality You Can See", d: "Tested methods, German-recommended products and high-end equipment for consistent results." },
      { icon: I.users, t: "Skilled & Vetted Staff", d: "Trained, background-checked professionals for residential and commercial sites." },
    ];

    const stats = [
      { n: "2000+", l: "Customers across Muscat" },
      { n: "6", l: "Specialised services" },
      { n: "100%", l: "Eco-friendly products" },
      { n: "7", l: "Days a week support" },
    ];

    const faqs = [
      { q: "Which areas in Muscat do you cover?", a: "We serve homes and businesses across all of Muscat and the wider Oman region — including Al Khuwair, Ruwi, Al Mawaleh, Seeb, Bawshar and more." },
      { q: "Are your cleaning products safe for children and pets?", a: "Yes. We use non-toxic, eco-friendly products and German-recommended equipment that are safe around children, pets and all surface types." },
      { q: "Do you offer one-off cleans or only contracts?", a: "Both. You can book a single one-off clean or set up a recurring daily, weekly or monthly schedule — whatever suits you." },
      { q: "How do I get a price?", a: "Call or WhatsApp us, or send the quick quote form. For larger jobs we'll do a short survey and give you a clear, fixed price with no surprises." },
      { q: "Is the pest control treatment odorless and safe to stay during?", a: "Our standard insect treatments are odorless and hassle-free, so in most cases there's no need to leave the premises. We'll always advise you per job." },
    ];
    const faqJsonLd = `<script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    })}</script>`;

    return `
  <!-- HERO -->
  <section class="relative overflow-hidden">
    <div class="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-brand-blue/10 blur-3xl"></div>
    <div class="pointer-events-none absolute -right-24 top-40 h-80 w-80 rounded-full bg-brand-green/10 blur-3xl"></div>
    <div class="container-x relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
      <div data-reveal>
        <span class="pill-blue"><span class="h-1.5 w-1.5 rounded-full bg-brand-green"></span> ${BIZ.city} • ${BIZ.country}</span>
        <h1 class="mt-6 font-display text-4xl font-extrabold leading-[1.07] text-ink sm:text-5xl lg:text-6xl">
          Professional <span class="gradient-text">Cleaning &amp; Maintenance</span> Services in Muscat
        </h1>
        <p class="mt-6 max-w-xl text-lg leading-relaxed text-slatey-500">
          Reliable cleaning solutions for homes and businesses — including deep cleaning, pest control, sanitization, termite treatment and manpower supply.
        </p>
        ${heroCTAs(prefix)}
        <div class="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <div class="flex items-center gap-2.5 text-sm font-semibold text-ink"><span class="text-brand-leaf">${I.shieldCheck}</span> Trusted Local Cleaning Experts</div>
          <div class="flex items-center gap-2.5 text-sm font-semibold text-ink"><span class="text-brand-blue">${I.clock}</span> Fast Response &amp; Reliable Team</div>
        </div>
      </div>
      <div class="relative" data-reveal>
        <div class="relative overflow-hidden rounded-3xl border border-mist-200 bg-white shadow-float">
          <img src="assets/hero.svg" alt="Spotless, professionally cleaned modern living room in Muscat" class="w-full" width="640" height="520" loading="eager" />
        </div>
        <div class="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 shadow-soft backdrop-blur sm:left-6 sm:top-6">
          <span class="h-2.5 w-2.5 rounded-full bg-brand-green"></span>
          <span class="text-sm font-bold text-ink">Available Today</span>
        </div>
        <div class="absolute -bottom-5 right-2 flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-float sm:right-6 animate-floaty">
          <span class="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gradient text-white">${I.shieldCheck}</span>
          <span><span class="block font-display text-lg font-extrabold text-ink">2000+ Customers</span><span class="block text-xs text-slatey-400">across Muscat</span></span>
        </div>
      </div>
    </div>
  </section>

  <!-- STATS -->
  <section class="border-y border-mist-100 bg-mist-50">
    <div class="container-x grid grid-cols-2 gap-6 py-10 sm:grid-cols-4">
      ${stats.map((s) => `<div class="text-center" data-reveal><div class="font-display text-3xl font-extrabold gradient-text sm:text-4xl">${s.n}</div><div class="mt-1 text-sm font-medium text-slatey-500">${s.l}</div></div>`).join("\n")}
    </div>
  </section>

  <!-- SERVICES -->
  <section id="services" class="py-20 sm:py-28">
    <div class="container-x">
      <div class="mx-auto max-w-2xl text-center" data-reveal>
        <span class="pill-green">Our Services</span>
        <h2 class="mt-5 text-3xl font-extrabold sm:text-4xl lg:text-5xl">Everything you need to keep your space spotless</h2>
        <p class="mt-4 text-lg text-slatey-500">One trusted team for cleaning, pest control, sanitization and manpower — across Muscat.</p>
      </div>
      <div class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        ${serviceCards}
      </div>
      <div class="mt-12 flex flex-col items-center justify-between gap-5 rounded-3xl bg-brand-gradient-soft p-8 text-center sm:flex-row sm:text-left" data-reveal>
        <p class="text-lg font-bold text-ink">Need a custom plan for your home or business?</p>
        <a href="#contact" class="btn-gradient !px-7 !py-4">Request a Free Quote ${I.arrow}</a>
      </div>
    </div>
  </section>

  <!-- WHY US -->
  <section id="why" class="bg-mist-50 py-20 sm:py-28">
    <div class="container-x">
      <div class="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div data-reveal>
          <span class="pill-blue">Why Choose Us</span>
          <h2 class="mt-5 text-3xl font-extrabold sm:text-4xl">A cleaning partner Muscat businesses &amp; families rely on</h2>
          <p class="mt-4 text-lg text-slatey-500">Our mission is to provide safe, high-quality services that exceed expectations at a very reasonable cost — built on tested processes, quality products, high-end equipment and skilled employees.</p>
          <div class="mt-8 grid gap-4 sm:grid-cols-2">
            ${why.map((w) => `
            <div class="rounded-2xl border border-mist-200 bg-white p-6 shadow-card">
              <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">${w.icon}</span>
              <h3 class="mt-4 text-lg">${w.t}</h3>
              <p class="mt-1.5 text-sm text-slatey-500">${w.d}</p>
            </div>`).join("\n")}
          </div>
        </div>
        <div class="lg:pl-6" data-reveal>
          <div class="rounded-3xl bg-brand-gradient p-1 shadow-float">
            <div class="rounded-[1.4rem] bg-white p-8">
              <h3 class="text-2xl">What we do</h3>
              <p class="mt-2 text-sm text-slatey-500">Cleaning, deep sanitizing, maintenance, pest control, loading &amp; unloading and manpower supply.</p>
              <ul class="mt-6 space-y-4">
                ${["Cleaning & deep cleaning", "Sanitation & disinfection services", "Pest control & termite treatment", "Manpower supply", "Loading & unloading services", "Cleaning & maintenance services"]
                  .map((t) => `<li class="flex items-center gap-3 text-ink"><span class="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-brand-gradient text-white">${I.check}</span><span class="font-medium">${t}</span></li>`)
                  .join("\n")}
              </ul>
              <a href="#contact" class="btn-gradient mt-8 w-full">Get started ${I.arrow}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- HOW IT WORKS -->
  <section id="how" class="py-20 sm:py-28">
    <div class="container-x">
      <div class="mx-auto max-w-2xl text-center" data-reveal>
        <span class="pill-blue">How It Works</span>
        <h2 class="mt-5 text-3xl font-extrabold sm:text-4xl lg:text-5xl">Booking us is quick and easy</h2>
        <p class="mt-4 text-lg text-slatey-500">From first call to a spotless space — four simple steps, zero hassle.</p>
      </div>
      <div class="relative mt-16">
        <div class="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-mist-200 to-transparent lg:block"></div>
        <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          ${[
            { icon: I.phone, t: "Get in touch", d: "Call, WhatsApp or send the quick form with what you need." },
            { icon: I.clipboard, t: "Survey & quote", d: "We assess your space and share a clear, fair price — no surprises." },
            { icon: I.sparkles, t: "We get to work", d: "Our trained team arrives on time with eco-friendly, German-grade equipment." },
            { icon: I.smile, t: "Enjoy the result", d: "Relax in a spotless, sanitized and pest-free space — guaranteed." },
          ]
            .map(
              (s, i) => `
          <div class="relative text-center" data-reveal>
            <div class="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-brand-blue shadow-card ring-1 ring-mist-200">
              ${s.icon}
              <span class="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-brand-gradient font-display text-xs font-extrabold text-white shadow-soft">${i + 1}</span>
            </div>
            <h3 class="mt-6 text-lg">${s.t}</h3>
            <p class="mt-2 text-sm text-slatey-500">${s.d}</p>
          </div>`
            )
            .join("\n")}
        </div>
      </div>
    </div>
  </section>

  <!-- ABOUT -->
  <section id="about" class="bg-mist-50 py-20 sm:py-28">
    <div class="container-x">
      <div class="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-5" data-reveal>
          <div class="relative">
            <div class="rounded-3xl bg-brand-gradient-soft p-8">
              ${logoMark("h-28 w-48")}
              <p class="mt-6 font-display text-2xl font-extrabold text-ink">Cleaning Company in Oman</p>
              <p class="mt-3 text-lg" dir="rtl" lang="ar">${BIZ.nameAr}</p>
              <div class="mt-8 grid grid-cols-2 gap-4">
                <div class="rounded-2xl bg-white p-5 shadow-card"><div class="font-display text-2xl font-extrabold gradient-text">German</div><div class="text-sm text-slatey-500">recommended equipment</div></div>
                <div class="rounded-2xl bg-white p-5 shadow-card"><div class="font-display text-2xl font-extrabold gradient-text">Eco</div><div class="text-sm text-slatey-500">friendly products</div></div>
              </div>
            </div>
          </div>
        </div>
        <div class="lg:col-span-7" data-reveal>
          <span class="pill-green">About Us</span>
          <h2 class="mt-5 text-3xl font-extrabold sm:text-4xl">A locally based Omani cleaning &amp; contracting company</h2>
          <p class="mt-5 text-lg leading-relaxed text-slatey-500">
            Nawara Muscat Trading &amp; Contracting specialises in cleaning, deep sanitizing, maintenance, pest control, loading &amp; unloading and manpower supply. Established with a high ethical manner, we provide quality services drawn from experience across a wide range of industries.
          </p>
          <p class="mt-4 text-lg leading-relaxed text-slatey-500">
            Our mission is to provide safe, high-quality services that exceed our clients' expectations and deliver great satisfaction at a very reasonable cost. Our approach is based on tested processes, methods, quality products, high-end equipment and skilled employees — ensuring a consistent level of quality. We serve commercial clients from large corporates to smaller businesses requiring frequent cleaning and other services.
          </p>
          <div class="mt-8 flex flex-wrap gap-3">
            ${["Loading & Unloading", "Manpower Supply", "Pest Control", "Cleaning & Deep Cleaning", "Sanitation Services", "Maintenance"]
              .map((t) => `<span class="rounded-full border border-mist-200 bg-mist-50 px-4 py-2 text-sm font-semibold text-ink-soft">${t}</span>`)
              .join("\n")}
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- TESTIMONIALS -->
  <section class="py-20 sm:py-28">
    <div class="container-x">
      <div class="mx-auto max-w-2xl text-center" data-reveal>
        <span class="pill-green">Testimonials</span>
        <h2 class="mt-5 text-3xl font-extrabold sm:text-4xl lg:text-5xl">Trusted by homes &amp; businesses in Muscat</h2>
        <p class="mt-4 text-lg text-slatey-500">A few words from the people and teams we keep spotless.</p>
      </div>
      <div class="mt-14 grid gap-6 lg:grid-cols-3">
        ${[
          { q: "Fast, professional and thorough. The team deep-cleaned our villa before moving in and it felt brand new. Highly recommended.", n: "Ahmed Al-Balushi", r: "Homeowner, Al Khuwair" },
          { q: "We use Nawara for monthly office cleaning and pest control. Always on time, always reliable — exactly what a busy office needs.", n: "Mariam Al-Saadi", r: "Office Manager, Ruwi" },
          { q: "Booked the sofa and carpet cleaning and the results were impressive. Friendly staff and a very fair price. Will use again.", n: "John Mathew", r: "Resident, Al Mawaleh" },
        ]
          .map(
            (t) => `
        <figure class="flex h-full flex-col rounded-2xl border border-mist-200 bg-white p-7 shadow-card" data-reveal>
          <span class="text-brand-blue/30">${I.quote}</span>
          <div class="mt-3 flex gap-0.5 text-amber-400">${I.star}${I.star}${I.star}${I.star}${I.star}</div>
          <blockquote class="mt-4 flex-1 leading-relaxed text-ink-soft">“${t.q}”</blockquote>
          <figcaption class="mt-6 flex items-center gap-3">
            <span class="flex h-11 w-11 items-center justify-center rounded-full bg-brand-gradient font-display font-bold text-white">${t.n.split(" ").map((w) => w[0]).slice(0, 2).join("")}</span>
            <span><span class="block font-bold text-ink">${t.n}</span><span class="block text-sm text-slatey-400">${t.r}</span></span>
          </figcaption>
        </figure>`
          )
          .join("\n")}
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section id="faq" class="bg-mist-50 py-20 sm:py-28">
    <div class="container-x">
      <div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-5" data-reveal>
          <span class="pill-blue">FAQ</span>
          <h2 class="mt-5 text-3xl font-extrabold sm:text-4xl">Frequently asked questions</h2>
          <p class="mt-4 text-lg text-slatey-500">Can't find what you're looking for? Our team is one message away.</p>
          <div class="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a href="tel:${BIZ.phoneTel}" class="btn-gradient">${I.phone} Call ${BIZ.phoneDisplay}</a>
            <a href="${WA_DEFAULT}" target="_blank" rel="noopener" class="btn-whatsapp">${I.whatsapp} WhatsApp Us</a>
          </div>
        </div>
        <div class="lg:col-span-7" data-reveal>
          <div class="divide-y divide-mist-200 overflow-hidden rounded-2xl border border-mist-200 bg-white">
            ${faqs
              .map(
                (f) => `
            <details class="group">
              <summary class="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-semibold text-ink transition hover:text-brand-blue">
                <span>${f.q}</span>
                <span class="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-mist-100 text-brand-blue transition-transform duration-300 group-open:rotate-45">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" class="h-4 w-4"><path d="M12 5v14M5 12h14"/></svg>
                </span>
              </summary>
              <p class="px-6 pb-5 -mt-1 leading-relaxed text-slatey-500">${f.a}</p>
            </details>`
              )
              .join("\n")}
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA BAND -->
  <section class="bg-mist-50 pb-20 pt-4 sm:pb-28">
    <div class="container-x">
      <div class="relative overflow-hidden rounded-3xl bg-brand-gradient px-8 py-14 text-center shadow-float sm:px-16 sm:py-20" data-reveal>
        <div class="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10"></div>
        <div class="pointer-events-none absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-white/10"></div>
        <h2 class="relative mx-auto max-w-2xl text-3xl font-extrabold text-white sm:text-4xl">Ready for a spotless, healthier space?</h2>
        <p class="relative mx-auto mt-4 max-w-xl text-lg text-white/90">Hire Nawara Muscat today and get professional cleaning, pest control and sanitization across Muscat and Oman.</p>
        <div class="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a href="tel:${BIZ.phoneTel}" class="btn !bg-white !text-brand-dark hover:!-translate-y-0.5 text-base !px-7 !py-4">${I.phone} Call ${BIZ.phoneDisplay}</a>
          <a href="${WA_DEFAULT}" target="_blank" rel="noopener" class="btn border border-white/40 !text-white hover:!bg-white/10 text-base !px-7 !py-4">${I.whatsapp} Chat With Us</a>
        </div>
      </div>
    </div>
  </section>

  ${contactSection(prefix)}
  ${faqJsonLd}`;
  }

  /* ---------------- SERVICE PAGE ---------------- */
  function renderBlocks(blocks) {
    return blocks
      .map((b) => {
        if (b.h2) return `<h2>${b.h2}</h2>`;
        if (b.h3) return `<h3>${b.h3}</h3>`;
        if (b.p) return `<p>${b.p}</p>`;
        if (b.lead) return `<p class="text-lg text-ink-soft">${b.lead}</p>`;
        if (b.ul) return `<ul>${b.ul.map((i) => `<li>${i}</li>`).join("")}</ul>`;
        if (b.steps)
          return `<div class="mt-6 grid gap-5 sm:grid-cols-2">${b.steps
            .map(
              (s, i) => `<div class="rounded-2xl border border-mist-200 bg-mist-50 p-6">
                <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient font-display text-lg font-extrabold text-white">${i + 1}</span>
                <h3 class="mt-4 mb-2 text-lg">${s.t}</h3>
                <p class="text-slatey-500">${s.d}</p>
              </div>`
            )
            .join("")}</div>`;
        return "";
      })
      .join("\n");
  }

  function serviceBody(svc) {
    const prefix = "../";
    const others = SERVICES.filter((s) => s.slug !== svc.slug).slice(0, 3);
    return `
  <!-- BREADCRUMB + HERO -->
  <section class="relative overflow-hidden bg-mist-50">
    <div class="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand-blue/10 blur-3xl"></div>
    <div class="container-x relative grid items-center gap-12 py-14 lg:grid-cols-2 lg:py-20">
      <div data-reveal>
        <nav class="mb-6 flex items-center gap-2 text-sm text-slatey-400">
          <a href="${prefix}index.html" class="hover:text-brand-blue">Home</a><span>/</span>
          <a href="${prefix}index.html#services" class="hover:text-brand-blue">Services</a><span>/</span>
          <span class="text-ink">${svc.name}</span>
        </nav>
        <span class="pill-blue">${svc.eyebrow}</span>
        <h1 class="mt-5 font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl lg:text-5xl">${svc.h1}</h1>
        <p class="mt-5 max-w-xl text-lg leading-relaxed text-slatey-500">${svc.lead}</p>
        <div class="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="tel:${BIZ.phoneTel}" class="btn-gradient text-base !px-7 !py-4">${I.phone} Call Now</a>
          <a href="${whatsappLink("Hello Nawara Muscat, I'm interested in your " + svc.name + " service.")}" target="_blank" rel="noopener" class="btn-whatsapp text-base !px-7 !py-4">${I.whatsapp} Chat With Us</a>
        </div>
      </div>
      <div data-reveal>
        <div class="relative mx-auto max-w-md">
          <div class="rounded-3xl bg-brand-gradient p-1 shadow-float">
            <div class="flex flex-col items-center rounded-[1.4rem] bg-white p-10 text-center">
              <span class="flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-gradient text-white">${SERVICE_ICON[svc.iconKey]}</span>
              <h2 class="mt-6 text-2xl">${svc.name}</h2>
              <p class="mt-2 text-slatey-500">${svc.short}</p>
              <div class="mt-6 w-full space-y-3 text-left">
                ${["Eco-friendly, safe products", "Trained & vetted professionals", "Affordable, transparent pricing"]
                  .map((t) => `<div class="flex items-center gap-3 text-ink"><span class="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-brand-gradient text-white">${I.check}</span><span class="text-sm font-medium">${t}</span></div>`)
                  .join("")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CONTENT -->
  <section class="py-16 sm:py-20">
    <div class="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
      <article class="prose-nawara lg:col-span-8">
        ${renderBlocks(svc.blocks)}
        <div class="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl bg-brand-gradient-soft p-7 sm:flex-row">
          <p class="text-lg font-bold text-ink">Ready to book ${svc.name.toLowerCase()}?</p>
          <a href="${prefix}index.html#contact" class="btn-gradient !px-6 !py-3.5">Get a Free Quote ${I.arrow}</a>
        </div>
      </article>
      <aside class="lg:col-span-4">
        <div class="sticky top-24 space-y-6">
          <div class="rounded-2xl border border-mist-200 bg-white p-6 shadow-card">
            <h3 class="text-lg">Talk to our team</h3>
            <p class="mt-1 text-sm text-slatey-500">Fast response, friendly advice and a fair quote.</p>
            <a href="tel:${BIZ.phoneTel}" class="btn-gradient mt-5 w-full">${I.phone} ${BIZ.phoneDisplay}</a>
            <a href="${WA_DEFAULT}" target="_blank" rel="noopener" class="btn-whatsapp mt-3 w-full">${I.whatsapp} WhatsApp</a>
          </div>
          <div class="rounded-2xl border border-mist-200 bg-mist-50 p-6">
            <h3 class="text-lg">Other services</h3>
            <ul class="mt-4 space-y-2">
              ${others
                .map(
                  (s) => `<li><a href="${s.slug}.html" class="link-arrow !text-ink hover:!text-brand-blue">${s.name} ${I.arrowUpRight}</a></li>`
                )
                .join("\n")}
            </ul>
          </div>
        </div>
      </aside>
    </div>
  </section>

  ${contactSection(prefix)}`;
  }

  /* ---------------- WRITE FILES ---------------- */
  const outHome = layout({
    title: "Nawara Muscat | Professional Cleaning & Maintenance Services in Muscat, Oman",
    description:
      "Nawara Muscat Trading & Contracting — professional cleaning, pest control, termite treatment, sanitization and cleaning manpower supply across Muscat, Oman. Book your service today.",
    prefix: "",
    active: "home",
    canonical: BIZ.domain + "/",
    body: homeBody(),
  });
  fs.writeFileSync(path.join(__dirname, "..", "index.html"), outHome);

  SERVICES.forEach((svc) => {
    const out = layout({
      title: `${svc.name} in Muscat | Nawara Muscat`,
      description: `${svc.lead}`.slice(0, 158),
      prefix: "../",
      active: "services",
      canonical: `${BIZ.domain}/services/${svc.slug}.html`,
      body: serviceBody(svc),
    });
    fs.writeFileSync(path.join(__dirname, "..", "services", `${svc.slug}.html`), out);
  });

  // sitemap.xml
  const today = new Date().toISOString().slice(0, 10);
  const urls = [
    { loc: BIZ.domain + "/", pri: "1.0" },
    ...SERVICES.map((s) => ({ loc: `${BIZ.domain}/services/${s.slug}.html`, pri: "0.8" })),
  ];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((u) => `  <url><loc>${u.loc}</loc><lastmod>${today}</lastmod><priority>${u.pri}</priority></url>`)
  .join("\n")}
</urlset>
`;
  fs.writeFileSync(path.join(__dirname, "..", "sitemap.xml"), sitemap);

  // robots.txt
  fs.writeFileSync(
    path.join(__dirname, "..", "robots.txt"),
    `User-agent: *\nAllow: /\n\nSitemap: ${BIZ.domain}/sitemap.xml\n`
  );

  console.log("✓ Generated index.html + " + SERVICES.length + " service pages + sitemap.xml + robots.txt");
};
