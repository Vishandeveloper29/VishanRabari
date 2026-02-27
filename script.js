/* ═══════════════════════════════════════════════════
   VISHAN RABARI — PORTFOLIO v2  |  script.js
   Particle Canvas · Dark/Light Mode · Testimonial Carousel
   Live Previews · Animated Skill Bars · All bugs fixed
═══════════════════════════════════════════════════ */

const $ = (s, ctx = document) => ctx.querySelector(s);
const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];
const isTouch = () => window.matchMedia("(hover:none)").matches;

/* ══════════════════════════════════
   1. PARTICLE CANVAS
══════════════════════════════════ */
(function initParticles() {
  const canvas = $("#particleCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let W,
    H,
    particles = [],
    mouse = { x: -9999, y: -9999 };
  const COUNT = window.innerWidth < 600 ? 40 : 80;
  const MAX_DIST = 120;
  const COLORS = ["#c8ff00", "#00e5ff", "#8b5cf6", "#ff2d55", "#ffd166"];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() {
      this.reset(true);
    }
    reset(initial) {
      this.x = Math.random() * W;
      this.y = initial ? Math.random() * H : -10;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.r = Math.random() * 1.5 + 0.5;
      this.alpha = Math.random() * 0.5 + 0.2;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    }
    update() {
      // Mouse repulsion
      const dx = this.x - mouse.x,
        dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 80) {
        this.vx += (dx / dist) * 0.3;
        this.vy += (dy / dist) * 0.3;
      }
      this.vx *= 0.98;
      this.vy *= 0.98;
      this.x += this.vx;
      this.y += this.vy;
      // Wrap around edges
      if (this.x < -10) this.x = W + 10;
      if (this.x > W + 10) this.x = -10;
      if (this.y < -10) this.y = H + 10;
      if (this.y > H + 10) this.y = -10;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < MAX_DIST) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = "rgba(200,255,0,0.06)";
          ctx.globalAlpha = (1 - d / MAX_DIST) * 0.4;
          ctx.lineWidth = 0.5;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }
  }

  function init() {
    resize();
    particles = Array.from({ length: COUNT }, () => new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    drawConnections();
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener(
    "mousemove",
    (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    },
    { passive: true },
  );
  window.addEventListener(
    "touchmove",
    (e) => {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    },
    { passive: true },
  );
  window.addEventListener("mouseleave", () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  init();
  animate();
})();

/* ══════════════════════════════════
   2. DARK / LIGHT MODE TOGGLE
══════════════════════════════════ */
const themeToggle = $("#themeToggle");
const htmlEl = document.documentElement;

// Load saved preference
const savedTheme = localStorage.getItem("vr-theme") || "dark";
htmlEl.setAttribute("data-theme", savedTheme);

themeToggle?.addEventListener("click", () => {
  const current = htmlEl.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  htmlEl.setAttribute("data-theme", next);
  localStorage.setItem("vr-theme", next);

  // Animate the toggle button
  themeToggle.style.transform = "scale(.8) rotate(180deg)";
  setTimeout(() => {
    themeToggle.style.transform = "";
  }, 400);
});

/* ══════════════════════════════════
   3. SCROLL PROGRESS
══════════════════════════════════ */
const scrollBar = $("#scrollBar");
window.addEventListener(
  "scroll",
  () => {
    const pct =
      (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) *
      100;
    if (scrollBar) scrollBar.style.width = Math.min(pct, 100) + "%";
  },
  { passive: true },
);

/* ══════════════════════════════════
   4. LOADER
══════════════════════════════════ */
const ldrBar = $("#ldrBar");
const ldrPct = $("#ldrPct");
const loader = $("#loader");
let pct = 0;
const loaderTick = setInterval(() => {
  pct = Math.min(pct + Math.random() * 14 + 4, 100);
  const p = Math.floor(pct);
  if (ldrPct) ldrPct.textContent = p + "%";
  if (ldrBar) ldrBar.style.width = p + "%";
  if (pct >= 100) {
    clearInterval(loaderTick);
    setTimeout(() => loader?.classList.add("done"), 450);
  }
}, 60);

/* ══════════════════════════════════
   5. CUSTOM CURSOR
══════════════════════════════════ */
const cur = $("#cur");
const cur2 = $("#cur2");
let mx = 0,
  my = 0,
  tx = 0,
  ty = 0;

if (!isTouch() && cur && cur2) {
  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    cur.style.left = mx + "px";
    cur.style.top = my + "px";
  });
  (function cursorLoop() {
    tx += (mx - tx) * 0.12;
    ty += (my - ty) * 0.12;
    cur2.style.left = tx + "px";
    cur2.style.top = ty + "px";
    requestAnimationFrame(cursorLoop);
  })();
  const hoverEls =
    "a,button,input,select,textarea,.pill,.service-card,.proj-card,.skill-card,.testi-card,.blog-card,.pricing-card,.process-step";
  $$(hoverEls).forEach((el) => {
    el.addEventListener("mouseenter", () =>
      document.body.classList.add("link-hover"),
    );
    el.addEventListener("mouseleave", () =>
      document.body.classList.remove("link-hover"),
    );
  });
}

/* ══════════════════════════════════
   6. MAGNETIC BUTTONS
══════════════════════════════════ */
if (!isTouch()) {
  $$(".magnetic").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.3;
      const y = (e.clientY - r.top - r.height / 2) * 0.3;
      btn.style.transform = `translate(${x}px,${y}px)`;
    });
    btn.addEventListener("mouseleave", () => (btn.style.transform = ""));
  });
}

/* ══════════════════════════════════
   7. NAV & HAMBURGER
══════════════════════════════════ */
const hamburger = $("#hamburger");
const mobMenu = $("#mobMenu");
const nav = $("#nav");

hamburger?.addEventListener("click", () => {
  const open = mobMenu.classList.toggle("open");
  hamburger.classList.toggle("open", open);
  hamburger.setAttribute("aria-expanded", String(open));
  mobMenu.setAttribute("aria-hidden", String(!open));
  document.body.style.overflow = open ? "hidden" : "";
});

$$(".mob-link").forEach((a) => a.addEventListener("click", closeMobMenu));

function closeMobMenu() {
  mobMenu?.classList.remove("open");
  hamburger?.classList.remove("open");
  hamburger?.setAttribute("aria-expanded", "false");
  mobMenu?.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

window.addEventListener(
  "scroll",
  () => {
    nav?.classList.toggle("scrolled", window.scrollY > 40);
  },
  { passive: true },
);

// Active nav link on scroll
const navLinks = $$(".nav-links a");
const sections = $$("section[id]");
window.addEventListener(
  "scroll",
  () => {
    let current = "";
    sections.forEach((s) => {
      if (window.scrollY >= s.offsetTop - 130) current = s.id;
    });
    navLinks.forEach((a) =>
      a.classList.toggle("active", a.getAttribute("href") === "#" + current),
    );
  },
  { passive: true },
);

/* ══════════════════════════════════
   8. SMOOTH SCROLL
══════════════════════════════════ */
$$('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const href = a.getAttribute("href");
    if (href === "#") return;
    const target = document.getElementById(href.slice(1));
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 72,
        behavior: "smooth",
      });
    }
  });
});

/* ══════════════════════════════════
   9. TYPEWRITER
══════════════════════════════════ */
const twWord = $("#twWord");
const words = [
  "Landing Pages",
  "Web Apps",
  "UI/UX Interfaces",
  "E-Commerce Sites",
  "API Experiences",
  "Pixel-Perfect Designs",
];
let wIdx = 0,
  cIdx = 0,
  deleting = false;

function typeWriter() {
  if (!twWord) return;
  const word = words[wIdx];
  if (!deleting) {
    twWord.textContent = word.slice(0, ++cIdx);
    if (cIdx === word.length) {
      deleting = true;
      setTimeout(typeWriter, 1800);
      return;
    }
  } else {
    twWord.textContent = word.slice(0, --cIdx);
    if (cIdx === 0) {
      deleting = false;
      wIdx = (wIdx + 1) % words.length;
    }
  }
  setTimeout(typeWriter, deleting ? 50 : 90);
}
setTimeout(typeWriter, 2200);

/* ══════════════════════════════════
   10. SCROLL REVEAL — single observer
   (fixes original race condition bug)
══════════════════════════════════ */
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add("visible");

      // Animated skill bar with number counter
      el.querySelectorAll(".sbar-fill").forEach((bar, i) => {
        const targetW = parseInt(bar.dataset.w);
        const pctEl = bar.closest(".sbar-wrap")?.querySelector(".sbar-pct");
        const card = bar.closest(".skill-card");

        setTimeout(
          () => {
            bar.style.width = bar.dataset.w;

            if (pctEl) {
              let count = 0;
              const duration = 1600;
              const steps = 60;
              const increment = targetW / steps;
              const interval = duration / steps;
              const t = setInterval(() => {
                count = Math.min(count + increment, targetW);
                pctEl.textContent = Math.floor(count) + "%";
                if (count >= targetW) {
                  clearInterval(t);
                  pctEl.textContent = targetW + "%";
                }
              }, interval);
            }

            setTimeout(() => card?.classList.add("bar-animated"), 800);
          },
          i * 100 + 200,
        );
      });

      io.unobserve(el);
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -36px 0px" },
);

$$(".sr").forEach((el) => io.observe(el));

/* ══════════════════════════════════
   11. HERO COUNTERS
══════════════════════════════════ */
$$(".counter").forEach((el) => {
  const target = parseInt(el.dataset.target);
  const cio = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      let count = 0;
      const step = Math.ceil(target / 40);
      const t = setInterval(() => {
        count = Math.min(count + step, target);
        el.textContent = count;
        if (count >= target) clearInterval(t);
      }, 40);
      cio.disconnect();
    },
    { threshold: 0.5 },
  );
  cio.observe(el);
});

/* ══════════════════════════════════
   12. PARALLAX ORBS
══════════════════════════════════ */
window.addEventListener(
  "scroll",
  () => {
    const y = window.scrollY;
    $$(".orb").forEach((orb, i) => {
      orb.style.transform = `translateY(${y * [0.15, 0.1, 0.2][i] ?? 0.12}px)`;
    });
  },
  { passive: true },
);

/* ══════════════════════════════════
   13. PROJECT FILTER WITH COUNT BADGES
══════════════════════════════════ */
const filterBtns = $$(".pf-btn");
const projCards = $$(".proj-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => {
      b.classList.remove("active");
      b.setAttribute("aria-selected", "false");
    });
    btn.classList.add("active");
    btn.setAttribute("aria-selected", "true");
    const filter = btn.dataset.filter;

    projCards.forEach((card) => {
      const match = filter === "all" || card.dataset.cat === filter;
      if (!match) {
        card.classList.add("filtering-out");
        setTimeout(() => card.classList.add("hidden"), 300);
      } else {
        card.classList.remove("hidden", "filtering-out");
        requestAnimationFrame(() => {
          card.style.opacity = "1";
          card.style.transform = "";
        });
      }
    });
  });
});

/* ══════════════════════════════════
   14. LIVE PROJECT PREVIEW MODAL
══════════════════════════════════ */
const previewModal = $("#previewModal");
const previewBackdrop = $("#previewBackdrop");
const previewClose = $("#previewClose");
const previewIframe = $("#previewIframe");
const previewLoader = $("#previewLoader");
const previewTitle = $("#previewTitle");
const previewExtLink = $("#previewExternalLink");

$$(".preview-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const url = btn.dataset.url;
    const name =
      btn.closest(".proj-card")?.querySelector(".proj-name")?.textContent ||
      "Project";

    previewTitle.textContent = name + " — Preview";
    previewExtLink.href = url;
    previewIframe.src = "";

    previewModal.removeAttribute("hidden");
    document.body.style.overflow = "hidden";

    // Show loader, then load
    previewLoader.classList.remove("hide");
    requestAnimationFrame(() => {
      previewIframe.src = url;
    });

    previewIframe.onload = () => previewLoader.classList.add("hide");
    // Fallback in case iframe never fires onload (blocked by X-Frame-Options)
    setTimeout(() => previewLoader.classList.add("hide"), 5000);
  });
});

function closePreview() {
  previewModal.setAttribute("hidden", "");
  document.body.style.overflow = "";
  previewIframe.src = "";
}

previewClose?.addEventListener("click", closePreview);
previewBackdrop?.addEventListener("click", closePreview);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closePreview();
});

/* ══════════════════════════════════
   15. TESTIMONIALS CAROUSEL
   (auto-play + swipe support)
══════════════════════════════════ */
(function initCarousel() {
  const carousel = $("#testiCarousel");
  const dotsWrap = $("#testiDots");
  const prevBtn = $("#testiPrev");
  const nextBtn = $("#testiNext");
  if (!carousel) return;

  const cards = $$(".testi-card", carousel);
  let current = 0;
  let autoplay;

  // Build dots
  cards.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.className = "testi-dot" + (i === 0 ? " active" : "");
    dot.setAttribute("aria-label", "Go to testimonial " + (i + 1));
    dot.setAttribute("role", "button");
    dot.setAttribute("tabindex", "0");
    dot.addEventListener("click", () => goTo(i));
    dot.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") goTo(i);
    });
    dotsWrap?.appendChild(dot);
  });

  function getCardWidth() {
    return cards[0]?.getBoundingClientRect().width + 20 || 0; // 20 = gap
  }

  function goTo(idx) {
    current = (idx + cards.length) % cards.length;
    carousel.style.transform = `translateX(-${current * getCardWidth()}px)`;
    $$(".testi-dot", dotsWrap).forEach((d, i) =>
      d.classList.toggle("active", i === current),
    );
    cards.forEach((c, i) => c.classList.toggle("active-testi", i === current));
    resetAutoplay();
  }

  function resetAutoplay() {
    clearInterval(autoplay);
    autoplay = setInterval(() => goTo(current + 1), 4500);
  }

  prevBtn?.addEventListener("click", () => goTo(current - 1));
  nextBtn?.addEventListener("click", () => goTo(current + 1));

  // Touch/swipe
  let touchStartX = 0;
  carousel.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX;
    },
    { passive: true },
  );
  carousel.addEventListener(
    "touchend",
    (e) => {
      const dx = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(dx) > 40) goTo(current + (dx > 0 ? 1 : -1));
    },
    { passive: true },
  );

  // Keyboard
  document.addEventListener("keydown", (e) => {
    if (e.target.closest(".testi-carousel-wrap")) {
      if (e.key === "ArrowLeft") goTo(current - 1);
      if (e.key === "ArrowRight") goTo(current + 1);
    }
  });

  // Recompute on resize
  window.addEventListener(
    "resize",
    () => {
      carousel.style.transition = "none";
      carousel.style.transform = `translateX(-${current * getCardWidth()}px)`;
      requestAnimationFrame(() => {
        carousel.style.transition = "";
      });
    },
    { passive: true },
  );

  // Init
  goTo(0);
})();

/* ══════════════════════════════════
   16. FAQ ACCORDION (accessible)
══════════════════════════════════ */
$$(".faq-q").forEach((btn) => {
  btn.addEventListener("click", () => {
    const answer = btn.closest(".faq-item").querySelector(".faq-a");
    const isOpen = btn.getAttribute("aria-expanded") === "true";

    $$('.faq-q[aria-expanded="true"]').forEach((q) => {
      q.setAttribute("aria-expanded", "false");
      q.closest(".faq-item").querySelector(".faq-a").setAttribute("hidden", "");
    });

    if (!isOpen) {
      btn.setAttribute("aria-expanded", "true");
      answer.removeAttribute("hidden");
    }
  });
});

/* ══════════════════════════════════
   17. CODE CARD TILT
══════════════════════════════════ */
if (!isTouch()) {
  const codeCard = $("#codeCard");
  if (codeCard) {
    codeCard.addEventListener("mousemove", (e) => {
      const r = codeCard.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 14;
      const y = ((e.clientY - r.top) / r.height - 0.5) * -14;
      codeCard.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) translateY(-6px)`;
    });
    codeCard.addEventListener("mouseleave", () => {
      codeCard.style.transform = "";
    });
  }

  $$(".proj-card,.service-card,.testi-card,.blog-card,.pricing-card").forEach(
    (card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - 0.5) * 6;
        const y = ((e.clientY - r.top) / r.height - 0.5) * -6;
        card.style.transform = `translateY(-4px) perspective(900px) rotateX(${y}deg) rotateY(${x}deg)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    },
  );
}

/* ══════════════════════════════════
   18. CONTACT FORM — real-time validation + char counter
══════════════════════════════════ */
const contactForm = $("#contactForm");
const formContent = $("#formContent");
const formSuccess = $("#formSuccess");
const formError = $("#formError");
const submitBtn = $("#submitBtn");
const submitText = $("#submitText");
const successEmail = $("#successEmail");

// Char counter
const msgArea = $("#msg");
const charCounter = $("#charCounter");
msgArea?.addEventListener("input", () => {
  const len = msgArea.value.length;
  if (charCounter) {
    charCounter.textContent = len + " / 500";
    charCounter.className =
      "char-counter" +
      (len > 450 ? " warn" : "") +
      (len >= 500 ? " limit" : "");
  }
});

// Real-time field hints
function validateField(input, hintId, rules) {
  const hint = $(hintId);
  const val = input.value.trim();
  for (const rule of rules) {
    if (!rule.test(val)) {
      input.classList.remove("valid");
      input.classList.add("error");
      if (hint) {
        hint.textContent = rule.msg;
        hint.className = "field-hint err";
      }
      return false;
    }
  }
  input.classList.remove("error");
  input.classList.add("valid");
  if (hint) {
    hint.textContent = "✓ Looks good";
    hint.className = "field-hint ok";
  }
  return true;
}

$("#fname")?.addEventListener("blur", function () {
  validateField(this, "#fname-hint", [
    { test: (v) => v.length >= 2, msg: "Name must be at least 2 characters" },
  ]);
});
$("#femail")?.addEventListener("blur", function () {
  validateField(this, "#femail-hint", [
    {
      test: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      msg: "Enter a valid email address",
    },
  ]);
});
$("#msg")?.addEventListener("blur", function () {
  validateField(this, "#msg-hint", [
    {
      test: (v) => v.length >= 20,
      msg: "Message must be at least 20 characters",
    },
  ]);
});

contactForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fname = contactForm.fname.value.trim();
  const email = contactForm.femail.value.trim();
  const msg = contactForm.message.value.trim();
  const consent = contactForm.consent.checked;

  formError?.setAttribute("hidden", "");
  $$(".fi").forEach((el) => el.classList.remove("error"));

  let valid = true;
  if (!fname || fname.length < 2) {
    contactForm.fname.classList.add("error");
    valid = false;
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    contactForm.femail.classList.add("error");
    valid = false;
  }
  if (!msg || msg.length < 10) {
    contactForm.message.classList.add("error");
    valid = false;
  }
  if (!consent) valid = false;

  if (!valid) {
    formError?.removeAttribute("hidden");
    if (formError)
      formError.textContent =
        "Please fill in all required fields and accept the terms.";
    return;
  }

  if (submitBtn) submitBtn.disabled = true;
  if (submitText) submitText.textContent = "Sending…";

  try {
    const resp = await fetch(contactForm.action, {
      method: "POST",
      body: new FormData(contactForm),
      headers: { Accept: "application/json" },
    });
    if (resp.ok) {
      if (successEmail) successEmail.textContent = email;
      if (formContent) formContent.style.display = "none";
      if (formSuccess) formSuccess.removeAttribute("hidden");
      launchConfetti();
    } else {
      throw new Error("Server error");
    }
  } catch {
    if (submitText) submitText.textContent = "Send Message";
    if (submitBtn) submitBtn.disabled = false;
    formError?.removeAttribute("hidden");
    if (formError)
      formError.textContent =
        "Failed to send. Please email rabarivishan2@gmail.com directly.";
  }
});

/* ══════════════════════════════════
   19. CONFETTI
══════════════════════════════════ */
function launchConfetti() {
  const container = $("#confetti");
  if (!container) return;
  const colors = ["#c8ff00", "#00e5ff", "#ff2d55", "#ffd166", "#8b5cf6"];
  for (let i = 0; i < 50; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.cssText = `left:${Math.random() * 100}%;top:-10px;background:${colors[i % colors.length]};--tx:${(Math.random() - 0.5) * 220}px;animation-delay:${Math.random() * 0.8}s;width:${Math.random() * 6 + 4}px;height:${Math.random() * 6 + 4}px;border-radius:${Math.random() > 0.5 ? "50%" : "2px"}`;
    container.appendChild(piece);
  }
}

/* ══════════════════════════════════
   20. BACK TO TOP
══════════════════════════════════ */
const backTop = $("#backTop");
window.addEventListener(
  "scroll",
  () => {
    backTop?.classList.toggle("show", window.scrollY > 500);
  },
  { passive: true },
);
backTop?.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" }),
);

/* ══════════════════════════════════
   21. KEYBOARD ACCESSIBILITY
══════════════════════════════════ */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeMobMenu();
    closePreview();
  }
});

/* ══════════════════════════════════
   22. TOUCH: Add tap feedback
══════════════════════════════════ */
if (isTouch()) {
  $$(
    ".proj-card, .service-card, .skill-card, .blog-card, .pricing-card",
  ).forEach((card) => {
    card.addEventListener("touchstart", () => (card.style.opacity = ".85"), {
      passive: true,
    });
    card.addEventListener(
      "touchend",
      () => {
        setTimeout(() => (card.style.opacity = ""), 150);
      },
      { passive: true },
    );
  });
}
