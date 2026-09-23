const { SITE } = window.CityDreams;

document.querySelectorAll("a.js-phone").forEach((el) => {
  el.href = `tel:${SITE.phoneTel}`;
  if (!el.hasAttribute("data-keep-label")) el.textContent = SITE.phoneDisplay;
});

document.querySelectorAll("a.js-phone-2").forEach((el) => {
  el.href = `tel:${SITE.phoneTel2}`;
  if (!el.hasAttribute("data-keep-label")) el.textContent = SITE.phoneDisplay2;
});

document.querySelectorAll("a.js-email").forEach((el) => {
  el.href = `mailto:${SITE.email}`;
  el.textContent = SITE.email;
});

const page = document.body.dataset.page;
document.querySelectorAll(`[data-nav="${page}"]`).forEach((el) => {
  el.setAttribute("aria-current", "page");
});

const navWrap = document.querySelector(".navwrap");
const onScroll = () => navWrap?.classList.toggle("is-stuck", window.scrollY > 8);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

const menu = document.querySelector(".menu");
const navCheck = document.querySelector(".nav-check");

menu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    if (navCheck) navCheck.checked = false;
  });
});

const modal = document.querySelector("#quote-modal");

function openModal() {
  if (!modal) return;
  modal.hidden = false;
  document.body.classList.add("modal-open");
  modal.querySelector("input")?.focus();
}

function closeModal() {
  if (!modal) return;
  modal.hidden = true;
  document.body.classList.remove("modal-open");
}

document.querySelectorAll("[data-open-quote]").forEach((button) => {
  button.addEventListener("click", openModal);
});

modal?.querySelectorAll("[data-close-quote]").forEach((button) => {
  button.addEventListener("click", closeModal);
});

modal?.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

function localMobile(value) {
  const digits = value.replace(/\D/g, "");
  const local = digits.length === 12 && digits.startsWith("91") ? digits.slice(2) : digits;
  return /^[6-9]\d{9}$/.test(local) ? local : "";
}

document.querySelectorAll(".js-quote").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = form.elements.name;
    const phone = form.elements.phone;
    const service = form.elements.service;
    let valid = true;

    const checks = [
      [name, name.value.trim().length >= 2, "Enter your name."],
      [phone, Boolean(localMobile(phone.value)), "Enter a 10-digit mobile number."],
      [service, Boolean(service.value), "Choose a service."]
    ];

    const email = form.elements.email;
    if (email) {
      const emailOk = !email.value.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
      checks.push([email, emailOk, "Enter a valid email or leave it blank."]);
    }

    checks.forEach(([field, ok, message]) => {
      const wrap = field.closest(".field");
      wrap.classList.toggle("is-invalid", !ok);
      wrap.querySelector(".error").textContent = ok ? "" : message;
      field.setAttribute("aria-invalid", String(!ok));
      if (!ok) valid = false;
    });

    const note = form.querySelector(".form-note");
    note.textContent = "";
    if (!valid) return;

    const emailValue = email ? email.value.trim() : "";
    const area = form.elements.area?.value.trim();
    const message = form.elements.message?.value.trim();
    const lines = [
      "Hello City Dreams Bengaluru, I would like to book a visit.",
      `Name: ${name.value.trim()}`,
      `Phone: ${localMobile(phone.value)}`,
      `Service: ${service.value}`
    ];
    if (emailValue) lines.push(`Email: ${emailValue}`);
    if (area) lines.push(`Area: ${area}`);
    if (message) lines.push(`Notes: ${message}`);

    const url = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener");
    note.append(`Thanks, ${name.value.trim()}. If WhatsApp did not open, use this link: `);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.target = "_blank";
    anchor.rel = "noopener";
    anchor.textContent = "Open WhatsApp";
    note.append(anchor);
  });
});

document.querySelectorAll("select.js-service").forEach((select) => {
  if (select.options.length > 1) return;
  window.CityDreams.SERVICE_GROUPS.forEach(([label, items]) => {
    const group = document.createElement("optgroup");
    group.label = label;
    items.forEach((name) => {
      const option = document.createElement("option");
      option.value = name;
      option.textContent = name;
      group.append(option);
    });
    select.append(group);
  });
});

const params = new URLSearchParams(location.search);
const chosen = params.get("service");
if (chosen) {
  document.querySelectorAll("select[name='service']").forEach((select) => {
    if ([...select.options].some((option) => option.value === chosen)) select.value = chosen;
  });
}

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach((item) => {
      item.classList.toggle("is-active", item === button);
    });
    document.querySelectorAll("[data-cat]").forEach((card) => {
      const show = category === "all" || card.dataset.cat === category;
      card.classList.toggle("is-hidden", !show);
    });
  });
});

const slider = document.querySelector("[data-slider]");
if (slider) {
  const track = slider.querySelector(".slider__track");
  const slides = [...track.children];
  const dots = slider.querySelector(".slider__dots");
  let index = 0;

  slides.forEach((_, slideIndex) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Show testimonial ${slideIndex + 1}`);
    dot.addEventListener("click", () => go(slideIndex));
    dots.append(dot);
  });

  function go(next) {
    index = (next + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.querySelectorAll("button").forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === index);
      dot.setAttribute("aria-current", dotIndex === index ? "true" : "false");
    });
  }

  slider.querySelector("[data-prev]").addEventListener("click", () => go(index - 1));
  slider.querySelector("[data-next]").addEventListener("click", () => go(index + 1));
  go(0);

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    let timer = setInterval(() => go(index + 1), 7000);
    slider.addEventListener("mouseenter", () => clearInterval(timer));
    slider.addEventListener("mouseleave", () => {
      timer = setInterval(() => go(index + 1), 7000);
    });
  }
}

const counters = document.querySelectorAll("[data-count]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function paintCount(el) {
  el.textContent = `${el.dataset.count}${el.dataset.suffix || ""}`;
}

if (!counters.length || reduceMotion) {
  counters.forEach(paintCount);
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min(1, (now - start) / 900);
        const value = Math.round(target * (1 - (1 - progress) ** 3));
        el.textContent = `${value}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.6 });
  counters.forEach((el) => observer.observe(el));
}
