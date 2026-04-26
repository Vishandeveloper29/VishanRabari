/* ============================================================
   VISHAN RABARI — PORTFOLIO  |  script.js
   All interactions, animations, globe, gravity, game, form
============================================================ */

const $ = (s, ctx = document) => ctx.querySelector(s);
const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];
const isTouch = () => window.matchMedia('(hover:none)').matches;

/* ══════════════════════════════════
   1. LOADER
══════════════════════════════════ */
(function initLoader() {
  const ldrBar = $('#ldrBar'), ldrPct = $('#ldrPct'), loader = $('#loader');
  let pct = 0;
  const t = setInterval(() => {
    pct = Math.min(pct + Math.random() * 14 + 4, 100);
    const p = Math.floor(pct);
    if (ldrPct) ldrPct.textContent = p + '%';
    if (ldrBar) ldrBar.style.width = p + '%';
    if (pct >= 100) { clearInterval(t); setTimeout(() => loader?.classList.add('done'), 450); }
  }, 60);
})();

/* ══════════════════════════════════
   2. THEME TOGGLE
══════════════════════════════════ */
(function initTheme() {
  const toggle = $('#themeToggle');
  const html = document.documentElement;
  html.setAttribute('data-theme', localStorage.getItem('vr-theme') || 'dark');
  toggle?.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('vr-theme', next);
    toggle.style.transform = 'scale(.8) rotate(180deg)';
    setTimeout(() => (toggle.style.transform = ''), 400);
  });
})();

/* ══════════════════════════════════
   3. SCROLL PROGRESS BAR
══════════════════════════════════ */
window.addEventListener('scroll', () => {
  const bar = $('#scrollBar');
  if (bar) {
    const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = Math.min(pct, 100) + '%';
  }
}, { passive: true });

/* ══════════════════════════════════
   4. PARTICLE CANVAS
══════════════════════════════════ */
(function initParticles() {
  const canvas = $('#particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], mouse = { x: -9999, y: -9999 };
  const COUNT = window.innerWidth < 600 ? 40 : 80;
  const MAX_DIST = 120;
  const COLORS = ['#c8ff00', '#00e5ff', '#8b5cf6', '#ff2d55', '#ffd166'];

  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }

  class Particle {
    constructor() { this.reset(true); }
    reset(initial) {
      this.x = Math.random() * W; this.y = initial ? Math.random() * H : -10;
      this.vx = (Math.random() - .5) * .4; this.vy = (Math.random() - .5) * .4;
      this.r = Math.random() * 1.5 + .5; this.alpha = Math.random() * .5 + .2;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    }
    update() {
      const dx = this.x - mouse.x, dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 80) { this.vx += (dx / dist) * .3; this.vy += (dy / dist) * .3; }
      this.vx *= .98; this.vy *= .98;
      this.x += this.vx; this.y += this.vy;
      if (this.x < -10) this.x = W + 10; if (this.x > W + 10) this.x = -10;
      if (this.y < -10) this.y = H + 10; if (this.y > H + 10) this.y = -10;
    }
    draw() {
      ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color; ctx.globalAlpha = this.alpha; ctx.fill(); ctx.globalAlpha = 1;
    }
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < MAX_DIST) {
          ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = 'rgba(200,255,0,0.06)'; ctx.globalAlpha = (1 - d / MAX_DIST) * .4;
          ctx.lineWidth = .5; ctx.stroke(); ctx.globalAlpha = 1;
        }
      }
    }
  }

  resize();
  particles = Array.from({ length: COUNT }, () => new Particle());
  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
  window.addEventListener('touchmove', e => { mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY; }, { passive: true });
  window.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });

  (function loop() {
    ctx.clearRect(0, 0, W, H);
    drawConnections();
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  })();
})();

/* ══════════════════════════════════
   5. CUSTOM CURSOR
══════════════════════════════════ */
(function initCursor() {
  const cur = $('#cur'), cur2 = $('#cur2');
  if (isTouch() || !cur || !cur2) return;
  let mx = 0, my = 0, tx = 0, ty = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cur.style.left = mx + 'px'; cur.style.top = my + 'px';
  });
  (function curLoop() {
    tx += (mx - tx) * .12; ty += (my - ty) * .12;
    cur2.style.left = tx + 'px'; cur2.style.top = ty + 'px';
    requestAnimationFrame(curLoop);
  })();
  $$('a,button,input,select,textarea,.pill,.service-card,.proj-card,.testi-card,.blog-card,.pricing-card,.process-step').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('link-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('link-hover'));
  });
})();

/* ══════════════════════════════════
   6. MAGNETIC BUTTONS
══════════════════════════════════ */
if (!isTouch()) {
  $$('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * .3;
      const y = (e.clientY - r.top - r.height / 2) * .3;
      btn.style.transform = `translate(${x}px,${y}px)`;
    });
    btn.addEventListener('mouseleave', () => (btn.style.transform = ''));
  });
}

/* ══════════════════════════════════
   7. NAV + HAMBURGER
══════════════════════════════════ */
(function initNav() {
  const hamburger = $('#hamburger'), mobMenu = $('#mobMenu'), nav = $('#nav');
  hamburger?.addEventListener('click', () => {
    const open = mobMenu.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    mobMenu.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  });
  $$('.mob-link').forEach(a => a.addEventListener('click', () => {
    mobMenu?.classList.remove('open');
    hamburger?.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
    mobMenu?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }));
  window.addEventListener('scroll', () => nav?.classList.toggle('scrolled', window.scrollY > 40), { passive: true });
  // Active link
  const sections = $$('section[id]');
  window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 130) cur = s.id; });
    $$('.nav-links a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
  }, { passive: true });
})();

/* ══════════════════════════════════
   8. SMOOTH SCROLL
══════════════════════════════════ */
$$('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    const target = document.getElementById(href.slice(1));
    if (target) { e.preventDefault(); window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' }); }
  });
});

/* ══════════════════════════════════
   9. TYPEWRITER
══════════════════════════════════ */
(function initTypewriter() {
  const el = $('#twWord');
  if (!el) return;
  const words = ['Landing Pages', 'Web Apps', 'UI/UX Interfaces', 'E-Commerce Sites', 'API Experiences', 'Pixel-Perfect Designs'];
  let wi = 0, ci = 0, del = false;
  function tick() {
    const word = words[wi];
    if (!del) { el.textContent = word.slice(0, ++ci); if (ci === word.length) { del = true; setTimeout(tick, 1800); return; } }
    else { el.textContent = word.slice(0, --ci); if (ci === 0) { del = false; wi = (wi + 1) % words.length; } }
    setTimeout(tick, del ? 50 : 90);
  }
  setTimeout(tick, 2200);
})();

/* ══════════════════════════════════
   10. SCROLL REVEAL + SKILL BARS
══════════════════════════════════ */
(function initScrollReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add('visible');
      // Skill bars
      el.querySelectorAll('.sbar-fill').forEach((bar, i) => {
        const targetW = parseInt(bar.dataset.w);
        const pctEl = bar.closest('.sbar-wrap')?.querySelector('.sbar-pct');
        const card = bar.closest('.skill-card');
        setTimeout(() => {
          bar.style.width = bar.dataset.w;
          if (pctEl) {
            let count = 0; const steps = 60; const inc = targetW / steps; const iv = 1600 / steps;
            const t = setInterval(() => {
              count = Math.min(count + inc, targetW);
              pctEl.textContent = Math.floor(count) + '%';
              if (count >= targetW) { clearInterval(t); pctEl.textContent = targetW + '%'; }
            }, iv);
          }
          setTimeout(() => card?.classList.add('bar-animated'), 800);
        }, i * 100 + 200);
      });
      // Bento stat bars
      el.querySelectorAll('.bc-stat-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.w || '0';
      });
      io.unobserve(el);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });
  $$('.sr').forEach(el => io.observe(el));
})();

/* ══════════════════════════════════
   11. HERO COUNTERS
══════════════════════════════════ */
$$('.counter').forEach(el => {
  const target = parseInt(el.dataset.target);
  const cio = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    let count = 0; const step = Math.ceil(target / 40);
    const t = setInterval(() => { count = Math.min(count + step, target); el.textContent = count; if (count >= target) clearInterval(t); }, 40);
    cio.disconnect();
  }, { threshold: .5 });
  cio.observe(el);
});

/* ══════════════════════════════════
   12. HERO LETTER STAGGER
══════════════════════════════════ */
document.querySelectorAll('.ht-line').forEach((line, li) => {
  const letters = line.querySelectorAll('.ht-letter');
  const base = [0.6, 0.75, 0.9][li] || 0.6;
  letters.forEach((letter, i) => {
    letter.style.opacity = '0';
    letter.style.animation = 'revealUp 0.6s forwards';
    letter.style.animationDelay = (base + i * 0.04) + 's';
  });
});

/* ══════════════════════════════════
   13. PARALLAX ORBS
══════════════════════════════════ */
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  $$('.orb').forEach((orb, i) => { orb.style.transform = `translateY(${y * [.15, .1, .2][i] ?? .12}px)`; });
}, { passive: true });

/* ══════════════════════════════════
   14. PROJECT FILTER
══════════════════════════════════ */
(function initFilter() {
  const btns = $$('.pf-btn'), cards = $$('.proj-card');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
      btn.classList.add('active'); btn.setAttribute('aria-selected', 'true');
      const filter = btn.dataset.filter;
      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.cat === filter;
        if (!match) { card.classList.add('filtering-out'); setTimeout(() => card.classList.add('hidden'), 300); }
        else { card.classList.remove('hidden', 'filtering-out'); requestAnimationFrame(() => { card.style.opacity = '1'; card.style.transform = ''; }); }
      });
    });
  });
})();

/* ══════════════════════════════════
   15. PREVIEW MODAL
══════════════════════════════════ */
(function initPreview() {
  const modal = $('#previewModal'), backdrop = $('#previewBackdrop'), closeBtn = $('#previewClose');
  const iframe = $('#previewIframe'), loader = $('#previewLoader');
  const title = $('#previewTitle'), extLink = $('#previewExternalLink');

  $$('.preview-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const url = btn.dataset.url;
      const name = btn.closest('.proj-card')?.querySelector('.proj-name')?.textContent || 'Project';
      title.textContent = name + ' — Preview';
      extLink.href = url; iframe.src = '';
      modal.removeAttribute('hidden'); document.body.style.overflow = 'hidden';
      loader.classList.remove('hide');
      requestAnimationFrame(() => { iframe.src = url; });
      iframe.onload = () => loader.classList.add('hide');
      setTimeout(() => loader.classList.add('hide'), 5000);
    });
  });

  function close() { modal.setAttribute('hidden', ''); document.body.style.overflow = ''; iframe.src = ''; }
  closeBtn?.addEventListener('click', close);
  backdrop?.addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();

/* ══════════════════════════════════
   16. CARD TILT (desktop only)
══════════════════════════════════ */
if (!isTouch()) {
  // Code card
  const codeCard = $('#codeCard');
  if (codeCard) {
    codeCard.addEventListener('mousemove', e => {
      const r = codeCard.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - .5) * 14;
      const y = ((e.clientY - r.top) / r.height - .5) * -14;
      codeCard.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) translateY(-6px)`;
    });
    codeCard.addEventListener('mouseleave', () => { codeCard.style.transform = ''; });
  }
  // Project / service / blog / pricing cards
  $$('.proj-card:not(.sc-game-card),.service-card,.testi-card,.blog-card,.pricing-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - .5) * 6;
      const y = ((e.clientY - r.top) / r.height - .5) * -6;
      card.style.transform = `translateY(-4px) perspective(900px) rotateX(${y}deg) rotateY(${x}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

/* ══════════════════════════════════
   17. TESTIMONIALS CAROUSEL
══════════════════════════════════ */
(function initCarousel() {
  const carousel = $('#testiCarousel'), dotsWrap = $('#testiDots');
  const prevBtn = $('#testiPrev'), nextBtn = $('#testiNext');
  if (!carousel) return;
  const cards = $$('.testi-card', carousel);
  let current = 0, autoplay;

  cards.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('role', 'button'); dot.setAttribute('tabindex', '0');
    dot.addEventListener('click', () => goTo(i));
    dot.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') goTo(i); });
    dotsWrap?.appendChild(dot);
  });

  function getW() { return (cards[0]?.getBoundingClientRect().width || 0) + 20; }
  function goTo(idx) {
    current = (idx + cards.length) % cards.length;
    carousel.style.transform = `translateX(-${current * getW()}px)`;
    $$('.testi-dot', dotsWrap).forEach((d, i) => d.classList.toggle('active', i === current));
    cards.forEach((c, i) => c.classList.toggle('active-testi', i === current));
    clearInterval(autoplay); autoplay = setInterval(() => goTo(current + 1), 4500);
  }
  prevBtn?.addEventListener('click', () => goTo(current - 1));
  nextBtn?.addEventListener('click', () => goTo(current + 1));
  let touchStartX = 0;
  carousel.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  carousel.addEventListener('touchend', e => {
    const dx = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 40) goTo(current + (dx > 0 ? 1 : -1));
  }, { passive: true });
  window.addEventListener('resize', () => {
    carousel.style.transition = 'none';
    carousel.style.transform = `translateX(-${current * getW()}px)`;
    requestAnimationFrame(() => { carousel.style.transition = ''; });
  }, { passive: true });
  goTo(0);
})();

/* ══════════════════════════════════
   18. FAQ ACCORDION
══════════════════════════════════ */
$$('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.closest('.faq-item').querySelector('.faq-a');
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    $$('.faq-q[aria-expanded="true"]').forEach(q => {
      q.setAttribute('aria-expanded', 'false');
      q.closest('.faq-item').querySelector('.faq-a').setAttribute('hidden', '');
    });
    if (!isOpen) { btn.setAttribute('aria-expanded', 'true'); answer.removeAttribute('hidden'); }
  });
});

/* ══════════════════════════════════
   19. CONTACT FORM
══════════════════════════════════ */
(function initForm() {
  const form = $('#contactForm'), formContent = $('#formContent'), formSuccess = $('#formSuccess');
  const formError = $('#formError'), submitBtn = $('#submitBtn'), submitText = $('#submitText');
  const successEmail = $('#successEmail'), msgArea = $('#msg'), charCounter = $('#charCounter');

  msgArea?.addEventListener('input', () => {
    const len = msgArea.value.length;
    if (charCounter) {
      charCounter.textContent = len + ' / 500';
      charCounter.className = 'char-counter' + (len > 450 ? ' warn' : '') + (len >= 500 ? ' limit' : '');
    }
  });

  function validateField(input, hintId, rules) {
    const hint = $(hintId); const val = input.value.trim();
    for (const rule of rules) {
      if (!rule.test(val)) {
        input.classList.remove('valid'); input.classList.add('error');
        if (hint) { hint.textContent = rule.msg; hint.className = 'field-hint err'; }
        return false;
      }
    }
    input.classList.remove('error'); input.classList.add('valid');
    if (hint) { hint.textContent = '✓ Looks good'; hint.className = 'field-hint ok'; }
    return true;
  }

  $('#fname')?.addEventListener('blur', function () { validateField(this, '#fname-hint', [{ test: v => v.length >= 2, msg: 'Name must be at least 2 characters' }]); });
  $('#femail')?.addEventListener('blur', function () { validateField(this, '#femail-hint', [{ test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg: 'Enter a valid email address' }]); });
  $('#msg')?.addEventListener('blur', function () { validateField(this, '#msg-hint', [{ test: v => v.length >= 20, msg: 'Message must be at least 20 characters' }]); });

  form?.addEventListener('submit', async e => {
    e.preventDefault();
    const fname = form.fname.value.trim(), email = form.femail.value.trim();
    const msg = form.message.value.trim(), consent = form.consent.checked;
    formError?.setAttribute('hidden', '');
    $$('.fi').forEach(el => el.classList.remove('error'));
    let valid = true;
    if (!fname || fname.length < 2) { form.fname.classList.add('error'); valid = false; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { form.femail.classList.add('error'); valid = false; }
    if (!msg || msg.length < 10) { form.message.classList.add('error'); valid = false; }
    if (!consent) valid = false;
    if (!valid) {
      formError?.removeAttribute('hidden');
      if (formError) formError.textContent = 'Please fill in all required fields and accept the terms.';
      return;
    }
    if (submitBtn) submitBtn.disabled = true;
    if (submitText) submitText.textContent = 'Sending…';
    try {
      const resp = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (resp.ok) {
        if (successEmail) successEmail.textContent = email;
        if (formContent) { formContent.style.display = 'none'; formContent.setAttribute('hidden', ''); }
        if (formSuccess) { formSuccess.removeAttribute('hidden'); formSuccess.style.display = 'flex'; }
        launchConfetti();
      } else throw new Error('Server error');
    } catch {
      if (submitText) submitText.textContent = 'Send Message';
      if (submitBtn) submitBtn.disabled = false;
      formError?.removeAttribute('hidden');
      if (formError) formError.textContent = 'Failed to send. Please email rabarivishan2@gmail.com directly.';
    }
  });
})();

function launchConfetti() {
  const container = $('#confetti'); if (!container) return;
  const colors = ['#c8ff00', '#00e5ff', '#ff2d55', '#ffd166', '#8b5cf6'];
  for (let i = 0; i < 50; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.cssText = `left:${Math.random() * 100}%;top:-10px;background:${colors[i % colors.length]};--tx:${(Math.random() - .5) * 220}px;animation-delay:${Math.random() * .8}s;width:${Math.random() * 6 + 4}px;height:${Math.random() * 6 + 4}px;border-radius:${Math.random() > .5 ? '50%' : '2px'}`;
    container.appendChild(piece);
  }
}

/* ══════════════════════════════════
   20. BACK TO TOP
══════════════════════════════════ */
const backTop = $('#backTop');
window.addEventListener('scroll', () => backTop?.classList.toggle('show', window.scrollY > 500), { passive: true });
backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ══════════════════════════════════
   21. TOUCH FEEDBACK
══════════════════════════════════ */
if (isTouch()) {
  $$('.proj-card,.service-card,.skill-card,.blog-card,.pricing-card').forEach(card => {
    card.addEventListener('touchstart', () => (card.style.opacity = '.85'), { passive: true });
    card.addEventListener('touchend', () => { setTimeout(() => (card.style.opacity = ''), 150); }, { passive: true });
  });
}

/* ══════════════════════════════════
   22. KEYBOARD ACCESSIBILITY
══════════════════════════════════ */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    // Close mobile menu
    const mobMenu = $('#mobMenu'), hamburger = $('#hamburger');
    mobMenu?.classList.remove('open'); hamburger?.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false'); mobMenu?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // Close preview
    const modal = $('#previewModal');
    if (modal && !modal.hasAttribute('hidden')) {
      modal.setAttribute('hidden', ''); document.body.style.overflow = '';
      const iframe = $('#previewIframe'); if (iframe) iframe.src = '';
    }
  }
});

/* ══════════════════════════════════
   23. SKILLS 3D GLOBE (Three.js)
══════════════════════════════════ */
(function initGlobe() {
  const canvas = document.getElementById('skillsGlobe');
  if (!canvas) return;

  const SKILLS = [
    { name: 'HTML5', icon: '⬡', color: '#e34c26', pct: 90, level: 'Expert', desc: 'Semantic markup, accessibility, SEO and modern HTML5 structures.' },
    { name: 'CSS3', icon: '◈', color: '#264de4', pct: 88, level: 'Expert', desc: 'Flexbox, Grid, animations, transitions and responsive design patterns.' },
    { name: 'JavaScript', icon: 'JS', color: '#f0db4f', pct: 72, level: 'Advanced', desc: 'DOM manipulation, REST APIs, ES6+, async/await and event-driven patterns.' },
    { name: 'Figma', icon: '▣', color: '#a259ff', pct: 75, level: 'Advanced', desc: 'UI/UX design, prototyping, design systems and developer handoffs.' },
    { name: 'Git', icon: '⑂', color: '#f1502f', pct: 80, level: 'Advanced', desc: 'Version control, branching workflows and GitHub Pages deployment.' },
    { name: 'Responsive', icon: '⊞', color: '#00e5ff', pct: 85, level: 'Expert', desc: 'Mobile-first design, media queries and fluid layout systems.' },
    { name: 'REST APIs', icon: '⇄', color: '#c8ff00', pct: 70, level: 'Advanced', desc: 'Integrating weather, currency exchange, and GitHub APIs in real projects.' },
    { name: 'C Lang', icon: 'C', color: '#a8b9cc', pct: 78, level: 'Advanced', desc: 'Algorithms, data structures, memory management and problem solving.' },
  ];

  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
  script.onload = buildGlobe;
  document.head.appendChild(script);

  function buildGlobe() {
    const W = canvas.parentElement.clientWidth, H = canvas.parentElement.clientHeight;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H); renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 1000);
    camera.position.z = 3.8;

    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const dir = new THREE.DirectionalLight(0xc8ff00, 0.8); dir.position.set(5, 5, 5); scene.add(dir);
    const pt = new THREE.PointLight(0x00e5ff, 0.6, 10); pt.position.set(-3, 2, 3); scene.add(pt);

    const geoS = new THREE.IcosahedronGeometry(1.0, 2);
    const matS = new THREE.MeshPhongMaterial({ color: 0x050510, emissive: 0x0a0a20, wireframe: false, transparent: true, opacity: .92 });
    const meshS = new THREE.Mesh(geoS, matS); scene.add(meshS);
    const wireG = new THREE.IcosahedronGeometry(1.01, 2);
    const wireM = new THREE.MeshBasicMaterial({ color: 0x1a3a1a, wireframe: true, transparent: true, opacity: .35 });
    scene.add(new THREE.Mesh(wireG, wireM));

    function makeRing(r, tx, tz, color, opacity) {
      const pts = []; for (let i = 0; i <= 128; i++) { const a = (i / 128) * Math.PI * 2; pts.push(new THREE.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r)); }
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity });
      const ring = new THREE.LineLoop(geo, mat); ring.rotation.x = tx; ring.rotation.z = tz; scene.add(ring); return ring;
    }
    const rings = [
      makeRing(1.55, Math.PI / 2, 0, 0xc8ff00, .25),
      makeRing(1.55, Math.PI / 4, Math.PI / 6, 0x00e5ff, .18),
      makeRing(1.85, Math.PI / 3, -Math.PI / 5, 0x8b5cf6, .12),
    ];

    function fibSphere(n, r) {
      const pts = [], golden = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < n; i++) {
        const y = 1 - (i / (n - 1)) * 2, rad = Math.sqrt(1 - y * y), theta = golden * i;
        pts.push(new THREE.Vector3(Math.cos(theta) * rad * r, y * r, Math.sin(theta) * rad * r));
      }
      return pts;
    }

    const orbitPos = fibSphere(SKILLS.length, 1.55);
    const skillNodes = [];
    SKILLS.forEach((skill, i) => {
      const tc = document.createElement('canvas'); tc.width = 128; tc.height = 128;
      const ctx2 = tc.getContext('2d');
      const grad = ctx2.createRadialGradient(64, 64, 10, 64, 64, 62);
      grad.addColorStop(0, skill.color + 'dd'); grad.addColorStop(1, skill.color + '00');
      ctx2.fillStyle = grad; ctx2.beginPath(); ctx2.arc(64, 64, 62, 0, Math.PI * 2); ctx2.fill();
      ctx2.fillStyle = 'rgba(5,5,15,.88)'; ctx2.beginPath(); ctx2.arc(64, 64, 36, 0, Math.PI * 2); ctx2.fill();
      ctx2.strokeStyle = skill.color; ctx2.lineWidth = 2.5; ctx2.beginPath(); ctx2.arc(64, 64, 36, 0, Math.PI * 2); ctx2.stroke();
      ctx2.fillStyle = skill.color; ctx2.font = 'bold 22px JetBrains Mono,monospace'; ctx2.textAlign = 'center'; ctx2.textBaseline = 'middle'; ctx2.fillText(skill.icon, 64, 60);
      ctx2.fillStyle = 'rgba(240,240,245,.85)'; ctx2.font = '11px Outfit,sans-serif'; ctx2.fillText(skill.name, 64, 84);
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(tc), transparent: true, depthTest: false }));
      sprite.position.copy(orbitPos[i]); sprite.scale.set(.42, .42, 1); sprite.userData = { skill, idx: i };
      scene.add(sprite); skillNodes.push(sprite);
    });

    const pCount = 120; const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      const r = 1.6 + Math.random() * 1.2, theta = Math.random() * Math.PI * 2, phi = Math.acos(2 * Math.random() - 1);
      pPos[i * 3] = r * Math.sin(phi) * Math.cos(theta); pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta); pPos[i * 3 + 2] = r * Math.cos(phi);
    }
    const pGeo = new THREE.BufferGeometry(); pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ color: 0xc8ff00, size: .015, transparent: true, opacity: .5 });
    const pCloud = new THREE.Points(pGeo, pMat);

    const pivot = new THREE.Group(); scene.add(pivot);
    [meshS, pCloud, ...skillNodes].forEach(o => { scene.remove(o); pivot.add(o); });
    scene.children.filter(c => c !== pivot && c !== dir && c !== pt).forEach(c => { if (c.isLine || c.isLineLoop || c.isMesh) { scene.remove(c); pivot.add(c); } });

    const raycaster = new THREE.Raycaster(), mouse2D = new THREE.Vector2(-999, -999);
    let hoveredNode = null, isDragging = false, prevMouse = { x: 0, y: 0 }, velocity = { x: 0, y: 0 };

    const sipIcon = $('#sipIcon'), sipName = $('#sipName'), sipLevel = $('#sipLevel'), sipDesc = $('#sipDesc'), sipBarFill = $('#sipBarFill'), sipPct = $('#sipPct'), panel = $('#skillInfoPanel');
    function showSkill(skill) {
      if (!panel) return; panel.classList.add('active');
      sipIcon.textContent = skill.icon; sipName.textContent = skill.name;
      sipLevel.textContent = skill.level; sipDesc.textContent = skill.desc;
      sipBarFill.style.width = skill.pct + '%'; sipPct.textContent = skill.pct + '%';
      $$('.legend-item').forEach(el => el.classList.toggle('active', el.dataset.skill === skill.name));
    }
    function resetSkill() {
      if (!panel) return; panel.classList.remove('active');
      sipIcon.textContent = '👆'; sipName.textContent = 'Hover a Skill'; sipLevel.textContent = '——';
      sipDesc.textContent = 'Drag to rotate the globe. Hover over any orbiting tech icon to see details.';
      sipBarFill.style.width = '0%'; sipPct.textContent = '—';
      $$('.legend-item').forEach(el => el.classList.remove('active'));
    }

    $$('.legend-item').forEach(el => {
      el.addEventListener('click', () => {
        const sk = SKILLS.find(s => s.name === el.dataset.skill);
        if (sk) showSkill(sk);
      });
    });

    function getCP(e) {
      const r = canvas.getBoundingClientRect();
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      return { x: cx - r.left, y: cy - r.top };
    }

    canvas.addEventListener('mousedown', e => { isDragging = true; prevMouse = getCP(e); velocity = { x: 0, y: 0 }; });
    canvas.addEventListener('touchstart', e => { isDragging = true; prevMouse = getCP(e); }, { passive: true });
    window.addEventListener('mouseup', () => { isDragging = false; });
    window.addEventListener('touchend', () => { isDragging = false; });

    canvas.addEventListener('mousemove', e => {
      const rect = canvas.getBoundingClientRect();
      mouse2D.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse2D.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      if (isDragging) {
        const p = getCP(e); const dx = p.x - prevMouse.x, dy = p.y - prevMouse.y;
        velocity.x = dy * .004; velocity.y = dx * .004;
        pivot.rotation.x += velocity.x; pivot.rotation.y += velocity.y; prevMouse = p;
      }
    });
    canvas.addEventListener('touchmove', e => {
      if (isDragging) {
        const p = getCP(e); const dx = p.x - prevMouse.x, dy = p.y - prevMouse.y;
        pivot.rotation.x += dy * .004; pivot.rotation.y += dx * .004; prevMouse = p;
      }
    }, { passive: true });

    function resize() {
      const w = canvas.parentElement.clientWidth, h = canvas.parentElement.clientHeight;
      camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h);
    }
    window.addEventListener('resize', resize, { passive: true });

    let frame = 0;
    (function animate() {
      requestAnimationFrame(animate); frame++;
      if (!isDragging) { velocity.x *= .95; velocity.y *= .95; pivot.rotation.x += velocity.x + 0; pivot.rotation.y += velocity.y + .003; }
      pMat.opacity = .3 + Math.sin(frame * .02) * .2;
      rings.forEach((r, i) => { r.rotation.y += .001 * (i + 1) * .5; });
      raycaster.setFromCamera(mouse2D, camera);
      const hits = raycaster.intersectObjects(skillNodes);
      if (hits.length) {
        const hit = hits[0].object;
        if (hoveredNode !== hit) {
          if (hoveredNode) { hoveredNode.scale.set(.42, .42, 1); }
          hoveredNode = hit; hoveredNode.scale.set(.58, .58, 1);
          showSkill(hoveredNode.userData.skill); canvas.style.cursor = 'pointer';
        }
      } else {
        if (hoveredNode) { hoveredNode.scale.set(.42, .42, 1); hoveredNode = null; resetSkill(); }
        canvas.style.cursor = isDragging ? 'grabbing' : 'grab';
      }
      renderer.render(scene, camera);
    })();
  }
})();

/* ══════════════════════════════════
   24. GRAVITY SKILLS CANVAS (#skills2)
══════════════════════════════════ */
(function initGravity() {
  const canvas = document.getElementById('gravCanvas');
  if (!canvas) return;

  const PLANETS = [
    { name: 'HTML5', icon: '⬡', color: '#e34c26', cat: 'Core', tagline: 'Structure of the web', desc: 'Semantic markup, accessibility, forms, SEO. The backbone of every project I build.', tags: ['Semantic', 'Accessibility', 'SEO'], r: 34 },
    { name: 'CSS3', icon: '◈', color: '#264de4', cat: 'Core', tagline: 'Design that moves', desc: 'Grid, Flexbox, animations, custom properties, responsive systems.', tags: ['Grid', 'Flexbox', 'Animations'], r: 30 },
    { name: 'JavaScript', icon: 'JS', color: '#f0db4f', cat: 'Core', tagline: 'Logic and life', desc: 'DOM, ES6+, async/await, event handling, API integrations.', tags: ['ES6+', 'DOM', 'REST APIs'], r: 36 },
    { name: 'Figma', icon: '▣', color: '#a259ff', cat: 'Design', tagline: 'Ideas made visible', desc: 'UI design, prototyping, design tokens, and developer handoffs.', tags: ['Prototyping', 'UI Design', 'Tokens'], r: 26 },
    { name: 'Git', icon: '⑂', color: '#f1502f', cat: 'Tools', tagline: 'Version control', desc: 'Branching, merging, GitHub Pages deployment and collaborative workflows.', tags: ['GitHub', 'CI/CD', 'Versioning'], r: 24 },
    { name: 'REST API', icon: '⇄', color: '#00e5ff', cat: 'Core', tagline: 'Data in motion', desc: 'Fetch, Axios, async patterns and real integrations in 4 live apps.', tags: ['Fetch', 'JSON', 'Auth'], r: 28 },
    { name: 'Responsive', icon: '⊞', color: '#c8ff00', cat: 'Core', tagline: 'Every screen, perfect', desc: 'Mobile-first CSS, fluid layouts, media queries, rem/em units.', tags: ['Mobile-First', 'Media Queries', 'Fluid'], r: 32 },
    { name: 'C Language', icon: 'C', color: '#a8b9cc', cat: 'CS', tagline: 'Low-level thinking', desc: 'Algorithms, pointers, memory management and problem solving.', tags: ['Algorithms', 'Pointers', 'Logic'], r: 22 },
    { name: 'GSAP', icon: '⚡', color: '#88ce02', cat: 'Tools', tagline: 'Premium motion', desc: 'ScrollTrigger, timelines, easing functions for pro-level animations.', tags: ['Timelines', 'ScrollTrigger', 'Easing'], r: 20 },
    { name: 'Performance', icon: '◎', color: '#ffd166', cat: 'Tools', tagline: 'Fast by default', desc: 'Core Web Vitals, Lighthouse, lazy loading, code splitting & minification.', tags: ['Lighthouse', 'Web Vitals', 'Lazy Load'], r: 22 },
    { name: 'React', icon: '⚛', color: '#61dafb', cat: 'Learning', tagline: 'Learning in progress', desc: 'Components, hooks, props & state — actively building projects in React.', tags: ['Hooks', 'Components', 'JSX'], r: 26 },
  ];

  const ctx = canvas.getContext('2d');
  let W, H, bodies = [], dragging = null, dragOffX = 0, dragOffY = 0, hoveredBody = null;
  const G = 0, DAMPING = 0.985;

  const skCard = document.getElementById('skCard');
  const skIco = document.getElementById('skIco'), skName = document.getElementById('skName');
  const skCat = document.getElementById('skCat'), skTagline = document.getElementById('skTagline');
  const skDesc = document.getElementById('skDesc'), skTags = document.getElementById('skTags');
  const skCardBar = document.getElementById('skCardBar');

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    W = canvas.width = rect.width; H = canvas.height = rect.height;
  }

  function initBodies() {
    bodies = PLANETS.map(p => {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * Math.min(W, H) * 0.35 + p.r + 10;
      return {
        ...p,
        x: W / 2 + Math.cos(angle) * dist,
        y: H / 2 + Math.sin(angle) * dist,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        mass: p.r * p.r,
      };
    });
  }

  function drawBody(b) {
    const hovered = b === hoveredBody;
    // glow
    if (hovered) {
      const grd = ctx.createRadialGradient(b.x, b.y, b.r * .5, b.x, b.y, b.r * 2.2);
      grd.addColorStop(0, b.color + '55'); grd.addColorStop(1, b.color + '00');
      ctx.beginPath(); ctx.arc(b.x, b.y, b.r * 2.2, 0, Math.PI * 2);
      ctx.fillStyle = grd; ctx.fill();
    }
    // body
    const grad = ctx.createRadialGradient(b.x - b.r * .3, b.y - b.r * .3, b.r * .1, b.x, b.y, b.r);
    grad.addColorStop(0, b.color + 'ee'); grad.addColorStop(1, b.color + '77');
    ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fillStyle = grad; ctx.fill();
    // border
    ctx.strokeStyle = hovered ? '#fff' : b.color + 'aa';
    ctx.lineWidth = hovered ? 2 : 1; ctx.stroke();
    // icon
    ctx.fillStyle = '#fff'; ctx.font = `bold ${Math.max(10, b.r * .55)}px JetBrains Mono, monospace`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(b.icon, b.x, b.y);
  }

  function physics() {
    bodies.forEach(b => {
      if (b === dragging) return;
      // soft boundary
      const margin = b.r + 8;
      if (b.x < margin) { b.vx = Math.abs(b.vx) * .8; b.x = margin; }
      if (b.x > W - margin) { b.vx = -Math.abs(b.vx) * .8; b.x = W - margin; }
      if (b.y < margin) { b.vy = Math.abs(b.vy) * .8; b.y = margin; }
      if (b.y > H - margin) { b.vy = -Math.abs(b.vy) * .8; b.y = H - margin; }
      // collisions
      bodies.forEach(other => {
        if (other === b) return;
        const dx = other.x - b.x, dy = other.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minDist = b.r + other.r + 4;
        if (dist < minDist && dist > 0) {
          const nx = dx / dist, ny = dy / dist;
          const overlap = (minDist - dist) / 2;
          b.x -= nx * overlap; b.y -= ny * overlap;
          const dv = (b.vx - other.vx) * nx + (b.vy - other.vy) * ny;
          if (dv > 0) { b.vx -= dv * nx * .4; b.vy -= dv * ny * .4; }
        }
      });
      b.vx *= DAMPING; b.vy *= DAMPING;
      b.x += b.vx; b.y += b.vy;
    });
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    physics();
    bodies.forEach(drawBody);
    requestAnimationFrame(loop);
  }

  function showCard(b, mx, my) {
    if (!skCard) return;
    skIco.textContent = b.icon; skName.textContent = b.name; skCat.textContent = b.cat;
    skTagline.textContent = b.tagline; skDesc.textContent = b.desc;
    skCardBar.style.background = `linear-gradient(90deg, ${b.color}, #00e5ff)`;
    skTags.innerHTML = b.tags.map(t => `<span class="svc-tag">${t}</span>`).join('');
    const cw = 300, ch = 180;
    let cx = mx + 16, cy = my - 20;
    if (cx + cw > window.innerWidth) cx = mx - cw - 16;
    if (cy + ch > window.innerHeight) cy = my - ch - 10;
    skCard.style.left = cx + 'px'; skCard.style.top = cy + 'px';
    skCard.classList.add('show');
  }

  function hideCard() { skCard?.classList.remove('show'); }

  function getBody(mx, my) {
    const rect = canvas.getBoundingClientRect();
    const cx = mx - rect.left, cy = my - rect.top;
    return bodies.find(b => Math.hypot(b.x - cx, b.y - cy) < b.r);
  }

  canvas.addEventListener('mousemove', e => {
    if (dragging) {
      const rect = canvas.getBoundingClientRect();
      dragging.x = e.clientX - rect.left - dragOffX;
      dragging.y = e.clientY - rect.top - dragOffY;
      dragging.vx = (e.movementX || 0) * .8;
      dragging.vy = (e.movementY || 0) * .8;
      hideCard(); return;
    }
    const b = getBody(e.clientX, e.clientY);
    if (b) { hoveredBody = b; canvas.style.cursor = 'grab'; showCard(b, e.clientX, e.clientY); }
    else { hoveredBody = null; canvas.style.cursor = 'default'; hideCard(); }
  });

  canvas.addEventListener('mousedown', e => {
    const b = getBody(e.clientX, e.clientY);
    if (b) {
      const rect = canvas.getBoundingClientRect();
      dragging = b; dragOffX = e.clientX - rect.left - b.x; dragOffY = e.clientY - rect.top - b.y;
      canvas.style.cursor = 'grabbing'; hideCard();
    }
  });

  window.addEventListener('mouseup', () => { if (dragging) { canvas.style.cursor = 'default'; dragging = null; } });
  canvas.addEventListener('mouseleave', () => { hoveredBody = null; hideCard(); });

  // Touch support
  canvas.addEventListener('touchstart', e => {
    const t = e.touches[0];
    const b = getBody(t.clientX, t.clientY);
    if (b) {
      const rect = canvas.getBoundingClientRect();
      dragging = b; dragOffX = t.clientX - rect.left - b.x; dragOffY = t.clientY - rect.top - b.y;
      showCard(b, t.clientX, t.clientY); e.preventDefault();
    }
  }, { passive: false });

  canvas.addEventListener('touchmove', e => {
    if (dragging) {
      const t = e.touches[0], rect = canvas.getBoundingClientRect();
      const prevX = dragging.x, prevY = dragging.y;
      dragging.x = t.clientX - rect.left - dragOffX;
      dragging.y = t.clientY - rect.top - dragOffY;
      dragging.vx = (dragging.x - prevX) * .8;
      dragging.vy = (dragging.y - prevY) * .8;
      e.preventDefault();
    }
  }, { passive: false });

  canvas.addEventListener('touchend', () => { dragging = null; hideCard(); });

  window.addEventListener('resize', () => { resize(); }, { passive: true });
  resize(); initBodies(); loop();
})();

/* ══════════════════════════════════
   25. STAR CATCHER GAME
══════════════════════════════════ */
(function initGame() {
  let score = 0, time = 10, best = 0, interval, running = false;
  const arena = document.getElementById('sc-arena');
  const star = document.getElementById('sc-star');
  const overlay = document.getElementById('sc-overlay');
  const scoreEl = document.getElementById('sc-score-val');
  const timeEl = document.getElementById('sc-time-val');
  const bestEl = document.getElementById('sc-best-val');
  const playBtn = document.getElementById('scPlayBtn');
  if (!arena) return;

  function rand(max) { return Math.floor(Math.random() * max); }

  function moveStar() {
    const maxX = arena.offsetWidth - 40, maxY = arena.offsetHeight - 40;
    star.style.left = Math.max(4, rand(maxX)) + 'px';
    star.style.top = Math.max(4, rand(maxY)) + 'px';
  }

  function spawnParticles(x, y) {
    const items = ['✨', '💫', '🌟', '⚡', '🔥'];
    for (let i = 0; i < 6; i++) {
      const p = document.createElement('div');
      p.className = 'sc-particle';
      const angle = ((Math.PI * 2) / 6) * i, dist = 35 + rand(30);
      p.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
      p.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
      p.style.left = x - 10 + 'px'; p.style.top = y - 10 + 'px';
      p.textContent = items[rand(items.length)];
      arena.appendChild(p);
      setTimeout(() => p.parentNode?.removeChild(p), 800);
    }
  }

  function start() {
    if (running) return;
    score = 0; time = 10; running = true;
    scoreEl.textContent = '0'; timeEl.textContent = '10';
    timeEl.classList.remove('sc-danger');
    arena.querySelector('.sc-newbest')?.remove();
    overlay.classList.add('sc-hidden');
    moveStar();

    star.onclick = function (e) {
      if (!running) return;
      score++;
      scoreEl.textContent = score;
      scoreEl.style.animation = 'none';
      requestAnimationFrame(() => { scoreEl.style.animation = 'sc-scoreflash .3s ease'; });
      star.classList.add('sc-pop');
      setTimeout(() => star.classList.remove('sc-pop'), 250);
      const rect = arena.getBoundingClientRect();
      spawnParticles(e.clientX - rect.left, e.clientY - rect.top);
      moveStar();
    };

    interval = setInterval(() => {
      time--;
      timeEl.textContent = time;
      if (time <= 3) timeEl.classList.add('sc-danger');
      if (time <= 0) end();
    }, 1000);
  }

  function end() {
    running = false; clearInterval(interval); star.onclick = null;
    timeEl.classList.remove('sc-danger');
    const isNew = score > best;
    if (isNew) {
      best = score; bestEl.textContent = best;
      const badge = document.createElement('div');
      badge.className = 'sc-newbest'; badge.textContent = '🏆 New Best!';
      arena.appendChild(badge);
    }
    let rating = '💪 Keep going!';
    if (score >= 20) rating = '🔥 Insane!';
    else if (score >= 15) rating = '⚡ Lightning!';
    else if (score >= 10) rating = '✨ Great job!';
    else if (score >= 5) rating = '👍 Not bad!';

    overlay.classList.remove('sc-hidden');
    overlay.innerHTML = `<div class="sc-ov-icon">${isNew ? '🏆' : '⏰'}</div>
      <div class="sc-ov-title">TIME'S UP</div>
      <div class="sc-final">${score}</div>
      <div class="sc-rating">${rating}</div>
      ${isNew ? '<div style="font-size:.55rem;color:#ffd166;font-weight:800;letter-spacing:1px;">NEW HIGH SCORE!</div>' : ''}
      <button class="sc-play-btn" id="scPlayBtn2">▶ AGAIN</button>`;
    document.getElementById('scPlayBtn2').addEventListener('click', start);
  }

  playBtn?.addEventListener('click', start);
})();
