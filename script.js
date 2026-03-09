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

  $$(".proj-card:not(.sc-game-card),.service-card,.testi-card,.blog-card,.pricing-card").forEach(
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

/* ══════════════════════════════════
   23. SKILLS 3D GLOBE — Three.js
══════════════════════════════════ */
(function initSkillsGlobe() {
  const canvas = document.getElementById("skillsGlobe");
  if (!canvas) return;

  // ── Data ──────────────────────────────────────
  const SKILLS = [
    {
      name: "HTML5",
      icon: "⬡",
      color: "#e34c26",
      pct: 90,
      level: "Expert",
      desc: "Semantic markup, accessibility, SEO and modern HTML5 structures.",
    },
    {
      name: "CSS3",
      icon: "◈",
      color: "#264de4",
      pct: 88,
      level: "Expert",
      desc: "Flexbox, Grid, animations, transitions and responsive design patterns.",
    },
    {
      name: "JavaScript",
      icon: "JS",
      color: "#f0db4f",
      pct: 72,
      level: "Advanced",
      desc: "DOM manipulation, REST APIs, ES6+, async/await and event-driven patterns.",
    },
    {
      name: "Figma",
      icon: "▣",
      color: "#a259ff",
      pct: 75,
      level: "Advanced",
      desc: "UI/UX design, prototyping, design systems and developer handoffs.",
    },
    {
      name: "Git",
      icon: "⑂",
      color: "#f1502f",
      pct: 80,
      level: "Advanced",
      desc: "Version control, branching workflows and GitHub Pages deployment.",
    },
    {
      name: "Responsive",
      icon: "⊞",
      color: "#00e5ff",
      pct: 85,
      level: "Expert",
      desc: "Mobile-first design, media queries and fluid layout systems.",
    },
    {
      name: "REST APIs",
      icon: "⇄",
      color: "#c8ff00",
      pct: 70,
      level: "Advanced",
      desc: "Integrating weather, currency exchange, and GitHub APIs in real projects.",
    },
    {
      name: "C Lang",
      icon: "C",
      color: "#a8b9cc",
      pct: 78,
      level: "Advanced",
      desc: "Algorithms, data structures, memory management and problem solving.",
    },
  ];

  // ── Three.js via CDN ──────────────────────────
  const script = document.createElement("script");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
  script.onload = buildGlobe;
  document.head.appendChild(script);

  function buildGlobe() {
    const W = canvas.parentElement.clientWidth;
    const H = canvas.parentElement.clientHeight;

    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);

    // ── Scene & Camera ──
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 1000);
    camera.position.z = 3.8;

    // ── Lighting ──
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const dirLight = new THREE.DirectionalLight(0xc8ff00, 0.8);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);
    const pointLight = new THREE.PointLight(0x00e5ff, 0.6, 10);
    pointLight.position.set(-3, 2, 3);
    scene.add(pointLight);

    // ── Core Geodesic Sphere ──
    const geoSphere = new THREE.IcosahedronGeometry(1.0, 2);
    const matSphere = new THREE.MeshPhongMaterial({
      color: 0x050510,
      emissive: 0x0a0a20,
      wireframe: false,
      transparent: true,
      opacity: 0.92,
    });
    const meshSphere = new THREE.Mesh(geoSphere, matSphere);
    scene.add(meshSphere);

    // Wireframe overlay
    const wireGeo = new THREE.IcosahedronGeometry(1.01, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x1a3a1a,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    scene.add(new THREE.Mesh(wireGeo, wireMat));

    // ── Outer ring glow spheres ──
    const ringRadii = [1.25, 1.55, 1.85];
    const ringColors = [0xc8ff00, 0x00e5ff, 0x8b5cf6];
    ringRadii.forEach((r, i) => {
      const rGeo = new THREE.IcosahedronGeometry(r, 1);
      const rMat = new THREE.MeshBasicMaterial({
        color: ringColors[i],
        wireframe: true,
        transparent: true,
        opacity: 0.06 - i * 0.015,
      });
      scene.add(new THREE.Mesh(rGeo, rMat));
    });

    // ── Orbital Ring lines ──
    function makeRing(radius, tiltX, tiltZ, color, opacity) {
      const points = [];
      for (let i = 0; i <= 128; i++) {
        const a = (i / 128) * Math.PI * 2;
        points.push(
          new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius),
        );
      }
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const mat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity,
      });
      const ring = new THREE.LineLoop(geo, mat);
      ring.rotation.x = tiltX;
      ring.rotation.z = tiltZ;
      scene.add(ring);
      return ring;
    }

    const rings = [
      makeRing(1.55, Math.PI / 2, 0, 0xc8ff00, 0.25),
      makeRing(1.55, Math.PI / 4, Math.PI / 6, 0x00e5ff, 0.18),
      makeRing(1.85, Math.PI / 3, -Math.PI / 5, 0x8b5cf6, 0.12),
    ];

    // ── Skill icon sprites orbiting ──
    // Distribute points on a sphere surface using Fibonacci lattice
    function fibonacciSphere(n, radius) {
      const pts = [];
      const golden = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < n; i++) {
        const y = 1 - (i / (n - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const theta = golden * i;
        pts.push(
          new THREE.Vector3(
            Math.cos(theta) * r * radius,
            y * radius,
            Math.sin(theta) * r * radius,
          ),
        );
      }
      return pts;
    }

    const orbitPositions = fibonacciSphere(SKILLS.length, 1.55);
    const skillNodes = [];

    // Create canvas textures for each skill label
    SKILLS.forEach((skill, i) => {
      // Texture canvas
      const tc = document.createElement("canvas");
      tc.width = 128;
      tc.height = 128;
      const ctx2 = tc.getContext("2d");

      // Outer glow circle
      const grad = ctx2.createRadialGradient(64, 64, 10, 64, 64, 62);
      grad.addColorStop(0, skill.color + "dd");
      grad.addColorStop(1, skill.color + "00");
      ctx2.fillStyle = grad;
      ctx2.beginPath();
      ctx2.arc(64, 64, 62, 0, Math.PI * 2);
      ctx2.fill();

      // Icon circle
      ctx2.fillStyle = "rgba(5,5,15,0.88)";
      ctx2.beginPath();
      ctx2.arc(64, 64, 36, 0, Math.PI * 2);
      ctx2.fill();

      ctx2.strokeStyle = skill.color;
      ctx2.lineWidth = 2.5;
      ctx2.beginPath();
      ctx2.arc(64, 64, 36, 0, Math.PI * 2);
      ctx2.stroke();

      // Icon text
      ctx2.fillStyle = skill.color;
      ctx2.font = "bold 22px JetBrains Mono, monospace";
      ctx2.textAlign = "center";
      ctx2.textBaseline = "middle";
      ctx2.fillText(skill.icon, 64, 60);

      // Name text
      ctx2.fillStyle = "rgba(240,240,245,0.85)";
      ctx2.font = "11px Outfit, sans-serif";
      ctx2.fillText(skill.name, 64, 84);

      const texture = new THREE.CanvasTexture(tc);
      const spriteMat = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        depthTest: false,
      });
      const sprite = new THREE.Sprite(spriteMat);
      const basePos = orbitPositions[i].clone();
      sprite.position.copy(basePos);
      sprite.scale.set(0.42, 0.42, 1);
      sprite.userData = { skill, basePos, idx: i, hovered: false };
      scene.add(sprite);
      skillNodes.push(sprite);
    });

    // ── Floating particles ──
    const particleCount = 120;
    const pPositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = 1.6 + Math.random() * 1.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pPositions[i * 3 + 2] = r * Math.cos(phi);
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xc8ff00,
      size: 0.015,
      transparent: true,
      opacity: 0.5,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ── Raycaster for hover ──
    const raycaster = new THREE.Raycaster();
    const mouse2D = new THREE.Vector2(-999, -999);
    let hoveredNode = null;

    // ── Info panel updater ──
    const panel = document.getElementById("skillInfoPanel");
    const sipIcon = document.getElementById("sipIcon");
    const sipName = document.getElementById("sipName");
    const sipLevel = document.getElementById("sipLevel");
    const sipDesc = document.getElementById("sipDesc");
    const sipBarFill = document.getElementById("sipBarFill");
    const sipPct = document.getElementById("sipPct");

    function showSkillInfo(skill) {
      if (!panel) return;
      panel.classList.add("active");
      sipIcon.textContent = skill.icon;
      sipName.textContent = skill.name;
      sipLevel.textContent = skill.level;
      sipDesc.textContent = skill.desc;
      sipBarFill.style.width = skill.pct + "%";
      sipPct.textContent = skill.pct + "%";

      // Highlight legend
      document.querySelectorAll(".legend-item").forEach((el) => {
        el.classList.toggle("active", el.dataset.skill === skill.name);
      });
    }

    function resetSkillInfo() {
      if (!panel) return;
      panel.classList.remove("active");
      sipIcon.textContent = "👆";
      sipName.textContent = "Hover a Skill";
      sipLevel.textContent = "——";
      sipDesc.textContent =
        "Drag to rotate the globe. Hover over any orbiting tech icon to see details about that skill.";
      sipBarFill.style.width = "0%";
      sipPct.textContent = "—";
      document
        .querySelectorAll(".legend-item")
        .forEach((el) => el.classList.remove("active"));
    }

    // Legend click
    document.querySelectorAll(".legend-item").forEach((el) => {
      el.addEventListener("click", () => {
        const skillName = el.dataset.skill;
        const found = SKILLS.find((s) => s.name === skillName);
        if (found) showSkillInfo(found);
      });
    });

    // ── Mouse & drag ──
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let autoRotate = { x: 0, y: 0.003 };
    let velocity = { x: 0, y: 0 };
    const pivot = new THREE.Group();
    scene.add(pivot);
    // Move everything into pivot
    [meshSphere, particles, ...skillNodes].forEach((o) => {
      scene.remove(o);
      pivot.add(o);
    });
    scene.children
      .filter((c) => c !== pivot && c !== dirLight && c !== pointLight)
      .forEach((c) => {
        if (c.isLine || c.isLineLoop || c.isMesh) {
          scene.remove(c);
          pivot.add(c);
        }
      });

    function getCanvasPos(e) {
      const rect = canvas.getBoundingClientRect();
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      return { x: cx - rect.left, y: cy - rect.top };
    }

    canvas.addEventListener("mousedown", (e) => {
      isDragging = true;
      const p = getCanvasPos(e);
      prevMouse = p;
      velocity = { x: 0, y: 0 };
    });

    canvas.addEventListener(
      "touchstart",
      (e) => {
        isDragging = true;
        const p = getCanvasPos(e);
        prevMouse = p;
      },
      { passive: true },
    );

    window.addEventListener("mouseup", () => {
      isDragging = false;
    });
    window.addEventListener("touchend", () => {
      isDragging = false;
    });

    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse2D.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse2D.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDragging) {
        const p = getCanvasPos(e);
        const dx = p.x - prevMouse.x;
        const dy = p.y - prevMouse.y;
        velocity.x = dy * 0.004;
        velocity.y = dx * 0.004;
        pivot.rotation.x += velocity.x;
        pivot.rotation.y += velocity.y;
        prevMouse = p;
      }
    });

    canvas.addEventListener(
      "touchmove",
      (e) => {
        if (isDragging) {
          const p = getCanvasPos(e);
          const dx = p.x - prevMouse.x;
          const dy = p.y - prevMouse.y;
          pivot.rotation.x += dy * 0.004;
          pivot.rotation.y += dx * 0.004;
          prevMouse = p;
        }
      },
      { passive: true },
    );

    // ── Resize ──
    function resize() {
      const w = canvas.parentElement.clientWidth;
      const h = canvas.parentElement.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener("resize", resize, { passive: true });

    // ── Animate ──
    let frame = 0;
    function animate() {
      requestAnimationFrame(animate);
      frame++;

      // Auto-rotate with damping
      if (!isDragging) {
        velocity.x *= 0.95;
        velocity.y *= 0.95;
        pivot.rotation.x += velocity.x + autoRotate.x;
        pivot.rotation.y += velocity.y + autoRotate.y;
      }

      // Pulse particles opacity
      pMat.opacity = 0.3 + Math.sin(frame * 0.02) * 0.2;

      // Ring slow spin
      rings.forEach((r, i) => {
        r.rotation.y += 0.001 * (i + 1) * 0.5;
      });

      // Hover detection
      raycaster.setFromCamera(mouse2D, camera);
      const hits = raycaster.intersectObjects(skillNodes);

      if (hits.length > 0) {
        const hit = hits[0].object;
        if (hoveredNode !== hit) {
          if (hoveredNode) {
            hoveredNode.scale.set(0.42, 0.42, 1);
            hoveredNode.userData.hovered = false;
          }
          hoveredNode = hit;
          hoveredNode.scale.set(0.58, 0.58, 1);
          hoveredNode.userData.hovered = true;
          showSkillInfo(hoveredNode.userData.skill);
          canvas.style.cursor = "pointer";
        }
      } else {
        if (hoveredNode) {
          hoveredNode.scale.set(0.42, 0.42, 1);
          hoveredNode.userData.hovered = false;
          hoveredNode = null;
          resetSkillInfo();
        }
        canvas.style.cursor = isDragging ? "grabbing" : "grab";
      }

      renderer.render(scene, camera);
    }
    animate();
  }
})();
