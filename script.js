/* ── LOADER ─────────────────────────────────── */
let pct = 0;
const lpct = document.getElementById("lpct"),
  loader = document.getElementById("loader");
const tick = setInterval(() => {
  pct = Math.min(pct + Math.random() * 18, 100);
  lpct.textContent = Math.floor(pct) + "%";
  if (pct >= 100) {
    clearInterval(tick);
    setTimeout(() => loader.classList.add("done"), 400);
  }
}, 80);

/* ── CURSOR (desktop only) ──────────────────── */
const isTouchDevice = () => window.matchMedia("(hover: none)").matches;
const cur = document.getElementById("cur"),
  cur2 = document.getElementById("cur2");
let mx = 0,
  my = 0,
  tx = 0,
  ty = 0;

if (!isTouchDevice()) {
  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    cur.style.left = mx + "px";
    cur.style.top = my + "px";
  });
  (function loop() {
    tx += (mx - tx) * 0.1;
    ty += (my - ty) * 0.1;
    cur2.style.left = tx + "px";
    cur2.style.top = ty + "px";
    requestAnimationFrame(loop);
  })();
  document
    .querySelectorAll(
      "a,button,input,select,textarea,.pill,.tool-item,.service-card,.testi-card,.proj-card,.skill-card,.faq-item,.timeline-card",
    )
    .forEach((el) => {
      el.addEventListener("mouseenter", () =>
        document.body.classList.add("link-hover"),
      );
      el.addEventListener("mouseleave", () =>
        document.body.classList.remove("link-hover"),
      );
    });
}

/* ── HAMBURGER / MOBILE MENU ─────────────────── */
const hamburger = document.getElementById("hamburger"),
  mobMenu = document.getElementById("mobMenu");
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  mobMenu.classList.toggle("open");
  document.body.style.overflow = mobMenu.classList.contains("open")
    ? "hidden"
    : "";
});
document.querySelectorAll(".mob-link").forEach((a) => {
  a.addEventListener("click", () => {
    hamburger.classList.remove("open");
    mobMenu.classList.remove("open");
    document.body.style.overflow = "";
  });
});

/* ── NAV SCROLL ─────────────────────────────── */
const nav = document.getElementById("nav");
window.addEventListener("scroll", () =>
  nav.classList.toggle("scrolled", window.scrollY > 40),
);

/* ── SCROLL REVEAL ──────────────────────────── */
const srEls = document.querySelectorAll(".sr,.sr-left,.sr-right,.sr-scale");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        e.target.querySelectorAll(".sbar-fill").forEach((b) => {
          setTimeout(() => (b.style.width = b.dataset.w), 200);
        });
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 },
);
srEls.forEach((el) => io.observe(el));

/* Skill bars separate observer */
const sio = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.querySelectorAll(".sbar-fill").forEach((b, i) => {
          setTimeout(() => (b.style.width = b.dataset.w), i * 80);
        });
      }
    });
  },
  { threshold: 0.2 },
);
document.querySelectorAll(".skills-grid").forEach((el) => sio.observe(el));

/* ── SMOOTH SCROLL ──────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const t = document.querySelector(a.getAttribute("href"));
    if (t) {
      e.preventDefault();
      t.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* ── BIG COUNTERS ───────────────────────────── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || "";
  let count = 0;
  const dur = 1600;
  const step = Math.max(dur / target, 16);
  const t = setInterval(() => {
    count = Math.min(count + 1, target);
    el.innerHTML = count + "<em>" + suffix + "</em>";
    if (count >= target) clearInterval(t);
  }, step);
}
const cio = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        cio.unobserve(e.target);
      }
    });
  },
  { threshold: 0.5 },
);
document.querySelectorAll(".big-counter").forEach((el) => cio.observe(el));

/* ── BACK TO TOP ────────────────────────────── */
const backTop = document.getElementById("backTop");
window.addEventListener("scroll", () =>
  backTop.classList.toggle("show", window.scrollY > 500),
);
backTop.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" }),
);

/* ── CONTACT FORM ───────────────────────────── */
const form = document.getElementById("contactForm");
const formContent = document.getElementById("formContent");
const formSuccess = document.getElementById("formSuccess");
const formError = document.getElementById("formError");
const submitBtn = document.getElementById("submitBtn");
const submitText = document.getElementById("submitText");
const successEmail = document.getElementById("successEmail");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fname = form.fname.value.trim();
  const email = form.email.value.trim();
  const msg = form.message.value.trim();
  const consent = form.consent.checked;

  formError.style.display = "none";
  let valid = true;
  [form.fname, form.email, form.message].forEach((el) => {
    el.style.borderColor = "";
  });
  if (!fname) {
    form.fname.style.borderColor = "var(--rose)";
    valid = false;
  }
  if (!email || !email.includes("@")) {
    form.email.style.borderColor = "var(--rose)";
    valid = false;
  }
  if (!msg) {
    form.message.style.borderColor = "var(--rose)";
    valid = false;
  }
  if (!consent || !valid) {
    formError.style.display = "block";
    return;
  }

  document.getElementById("replyToField").value = email;
  submitBtn.disabled = true;
  submitText.textContent = "Sending...";

  try {
    const data = new FormData(form);
    const resp = await fetch(form.action, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });
    if (resp.ok) {
      successEmail.textContent = email;
      formContent.style.display = "none";
      formSuccess.style.display = "flex";
    } else {
      submitText.textContent = "Try Again";
      submitBtn.disabled = false;
      formError.textContent =
        "Something went wrong. Please email directly at rabarivishan2@gmail.com";
      formError.style.display = "block";
    }
  } catch (err) {
    submitText.textContent = "Send Message";
    submitBtn.disabled = false;
    formError.textContent =
      "Network error. Please email rabarivishan2@gmail.com directly.";
    formError.style.display = "block";
  }
});

/* ── TILT ON CARDS ──────────────────────────── */
if (!isTouchDevice()) {
  document
    .querySelectorAll(".proj-card,.service-card,.testi-card")
    .forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - 0.5) * 10;
        const y = ((e.clientY - r.top) / r.height - 0.5) * -10;
        card.style.transform = `translateY(-6px) perspective(800px) rotateX(${y}deg) rotateY(${x}deg)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
}

/* ── ACTIVE NAV LINK ────────────────────────── */
const sections = document.querySelectorAll("section[id],div[id]");
const navLinks = document.querySelectorAll(".nav-links a");
window.addEventListener(
  "scroll",
  () => {
    let cur = "";
    sections.forEach((s) => {
      if (window.scrollY >= s.offsetTop - 120) cur = s.id;
    });
    navLinks.forEach((a) => {
      a.style.color = "";
      if (a.getAttribute("href") === "#" + cur) a.style.color = "var(--lime)";
    });
  },
  { passive: true },
);

/* ── PARALLAX ORBS ──────────────────────────── */
window.addEventListener(
  "scroll",
  () => {
    const y = window.scrollY;
    document.querySelectorAll(".orb").forEach((orb, i) => {
      const speed = i === 0 ? 0.15 : i === 1 ? 0.1 : 0.2;
      orb.style.transform = `translateY(${y * speed}px)`;
    });
  },
  { passive: true },
);

/* ── STAGGER TOOLS GRID ─────────────────────── */
document.querySelectorAll(".tool-item").forEach((item, i) => {
  item.style.transitionDelay = `${i * 40}ms`;
});

/* ── FAQ ACCORDION ──────────────────────────── */
function toggleFaq(btn) {
  const item = btn.closest(".faq-item");
  const answer = item.querySelector(".faq-a");
  const isOpen = btn.classList.contains("open");

  // Close all
  document.querySelectorAll(".faq-q.open").forEach((q) => {
    q.classList.remove("open");
    q.closest(".faq-item").querySelector(".faq-a").classList.remove("open");
  });

  // Open clicked if it was closed
  if (!isOpen) {
    btn.classList.add("open");
    answer.classList.add("open");
  }
}

/* ── TIMELINE SCROLL ANIMATIONS ─────────────── */
const tlItems = document.querySelectorAll(".timeline-item");
const tlObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => {
          e.target.classList.add("visible");
        }, i * 100);
      }
    });
  },
  { threshold: 0.15 },
);
tlItems.forEach((el) => tlObserver.observe(el));
