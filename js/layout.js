const SITE = {
  phoneDisplay: "+91 88670 55353",
  phoneTel: "+918867055353",
  phoneDisplay2: "+91 88670 75353",
  phoneTel2: "+918867075353",
  whatsapp: "918867055353",
  email: "info@citydreamsblr.com",
  url: "https://citydreamsblr.com",
  cityLine: "Ashwath Nagar, RMV 2nd Stage, Bengaluru 560094"
};

const SERVICE_GROUPS = [
  ["Pest control", [
    "Cockroach Control",
    "Ant Control",
    "Bed Bug Control",
    "Rodent Control",
    "Flies Control",
    "Mosquito Control",
    "Termite Control",
    "Bird Control",
    "Mold Control",
    "Dust Mite Control",
    "Wasp Control",
    "Spider Control",
    "Flea Control",
    "Beehive Removal",
    "Silverfish Control"
  ]],
  ["Cleaning", [
    "Deep Home Cleaning",
    "Kitchen & Bathroom",
    "Sofa & Mattress",
    "Move-in / Move-out",
    "Office Cleaning",
    "Post-treatment Sanitising"
  ]]
];

const PEST_LINKS = [
  ["cockroach", "Cockroach Control"],
  ["ant", "Ant Control"],
  ["bed-bugs", "Bed Bug Control"],
  ["rodent", "Rodent Control"],
  ["flies", "Flies Control"],
  ["mosquito", "Mosquito Control"],
  ["termite", "Termite Control"],
  ["bird", "Bird Control"],
  ["mold", "Mold Control"],
  ["dust-mites", "Dust Mite Control"],
  ["wasp", "Wasp Control"],
  ["spider", "Spider Control"],
  ["fleas", "Flea Control"],
  ["beehive", "Beehive Removal"],
  ["silverfish", "Silverfish Control"]
];

function brand() {
  return '<a class="logo" href="index.html"><img src="city_dreams_logo.png" alt="City Dreams Pest and Hygiene Solutions"></a>';
}

function serviceOptions() {
  return SERVICE_GROUPS.map(([label, items]) => {
    const options = items.map((name) => `<option value="${name}">${name}</option>`).join("");
    return `<optgroup label="${label}">${options}</optgroup>`;
  }).join("");
}

function quoteFields(prefix) {
  return `
    <div class="field">
      <label for="${prefix}-name">Name</label>
      <input id="${prefix}-name" name="name" autocomplete="name" required>
      <p class="error"></p>
    </div>
    <div class="field">
      <label for="${prefix}-phone">Phone number</label>
      <input id="${prefix}-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="10-digit mobile" required>
      <p class="error"></p>
    </div>
    <div class="field">
      <label for="${prefix}-service">Service</label>
      <select id="${prefix}-service" class="js-service" name="service" required>
        <option value="">Select a service</option>
        ${serviceOptions()}
      </select>
      <p class="error"></p>
    </div>`;
}

const header = document.querySelector("#header-root");
const footer = document.querySelector("#footer-root");

if (header) {
  header.innerHTML = `
    <a class="skip" href="#main">Skip to content</a>
    <header class="site-header">
      <div class="topbar">
        <div class="container topbar__inner">
          <p class="topbar__tag">Pest control and cleaning across Bengaluru</p>
          <div class="topbar__links">
            <a class="js-phone" href="tel:${SITE.phoneTel}">${SITE.phoneDisplay}</a>
            <a class="js-phone-2" href="tel:${SITE.phoneTel2}">${SITE.phoneDisplay2}</a>
            <a class="js-email" href="mailto:${SITE.email}">${SITE.email}</a>
          </div>
        </div>
      </div>
      <div class="navwrap">
        <div class="container nav">
          ${brand()}
          <input class="nav-check" id="nav-check" type="checkbox">
          <label class="nav-toggle" for="nav-check" aria-label="Open menu"><span class="nav-toggle__bars"></span></label>
          <nav class="menu" id="menu">
            <a href="index.html" data-nav="home">Home</a>
            <a href="about.html" data-nav="about">About Us</a>
            <details class="dropdown">
              <summary data-nav="services">Services</summary>
              <div class="dropdown__panel" id="services-menu">
                ${PEST_LINKS.map(([id, name]) => `<a href="services.html#${id}">${name}</a>`).join("")}
                <a class="dropdown__all" href="services.html">View all services</a>
              </div>
            </details>
            <a href="cleaning.html" data-nav="cleaning">Cleaning Services</a>
            <a href="blog.html" data-nav="blog">Blogs</a>
            <a href="contact.html" data-nav="contact">Contact Us</a>
          </nav>
          <a class="btn btn--sm btn--gold btn--nav" href="contact.html">Free consultation</a>
        </div>
      </div>
    </header>`;
}

if (footer) {
  footer.innerHTML = `
    <footer class="footer">
      <div class="container footer-grid">
        <div>
          ${brand()}
          <p style="margin-top:0.9rem">Pest control and cleaning for apartments, houses, cafes, and small offices. We inspect first, then treat the source.</p>
          <p style="margin-top:0.7rem"><a href="${SITE.url}">citydreamsblr.com</a></p>
        </div>
        <div>
          <h3>Quick links</h3>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="cleaning.html">Cleaning services</a></li>
            <li><a href="blog.html">Blogs</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
        <div>
          <h3>Services</h3>
          <ul>
            <li><a href="services.html#cockroach">Cockroach control</a></li>
            <li><a href="services.html#termite">Termite control</a></li>
            <li><a href="services.html#rodent">Rodent control</a></li>
            <li><a href="services.html#mosquito">Mosquito control</a></li>
            <li><a href="services.html">View all</a></li>
          </ul>
        </div>
        <div>
          <form class="quote-card js-quote" novalidate>
            <h2>Request a callback</h2>
            <p class="lead" style="margin-bottom:0.8rem">Share the pest and your number. We confirm the next slot on WhatsApp.</p>
            ${quoteFields("footer")}
            <button class="btn btn--gold" type="submit">Send on WhatsApp</button>
            <p class="form-note" role="status"></p>
          </form>
        </div>
      </div>
      <div class="container legal">
        <p>&copy; <span class="js-year"></span> City Dreams Pest Control, Bengaluru.</p>
        <p><a href="${SITE.url}">citydreamsblr.com</a> | ${SITE.cityLine}</p>
      </div>
    </footer>
    <div class="modal" id="quote-modal" hidden>
      <div class="modal__dialog" role="dialog" aria-modal="true" aria-labelledby="quote-title">
        <button class="modal__close" type="button" data-close-quote aria-label="Close">x</button>
        <p class="kicker">Book a visit</p>
        <h2 id="quote-title">Tell us what you are seeing</h2>
        <p class="lead" style="margin:0.4rem 0 1rem">A name, a mobile number, and the service. We reply with a time.</p>
        <form class="js-quote stack" novalidate>
          ${quoteFields("modal")}
          <button class="btn" type="submit">Send on WhatsApp</button>
          <p class="form-note" role="status"></p>
        </form>
      </div>
    </div>
    <a class="whatsapp js-whatsapp" href="https://wa.me/${SITE.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp City Dreams">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.34 4.94L2 22l5.39-1.4a10 10 0 0 0 4.65 1.18h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2zm5.76 14.05c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.12.11-1.81-.11-.41-.14-.95-.31-1.64-.61-2.88-1.25-4.76-4.15-4.9-4.34-.14-.19-1.16-1.54-1.16-2.94s.73-2.08 1-2.37c.24-.26.64-.38 1.02-.38.12 0 .23 0 .33.01.3.01.45.03.65.51.24.58.82 2 .89 2.15.07.14.12.32.02.51-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.55.16.26.7 1.15 1.5 1.86 1.03.92 1.9 1.2 2.16 1.34.26.14.42.12.58-.07.16-.19.68-.79.86-1.06.18-.26.36-.22.6-.13.24.09 1.53.72 1.79.85.26.13.43.19.5.3.06.11.06.64-.18 1.32z"/></svg>
    </a>
    <div class="mobile-call">
      <a href="tel:${SITE.phoneTel}">Call</a>
      <a href="contact.html">Book a visit</a>
    </div>`;
}

document.querySelectorAll(".js-year").forEach((el) => {
  el.textContent = String(new Date().getFullYear());
});

window.CityDreams = { SITE, SERVICE_GROUPS };
