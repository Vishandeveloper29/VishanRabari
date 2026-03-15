/* ═══════════════════════════════════════════════════════
   VISHAN RABARI PORTFOLIO — Main Script
   Complete rewrite: Theme system, Animations, Waypoints
   ═══════════════════════════════════════════════════════ */

'use strict';

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

/* ═══════════════════════════════
   LENIS SMOOTH SCROLL
═══════════════════════════════ */
let lenis;
if (window.Lenis) {
  lenis = new Lenis({ lerp: 0.08, smooth: true, direction: 'vertical' });
  function lenisRaf(time) { lenis.raf(time); requestAnimationFrame(lenisRaf); }
  requestAnimationFrame(lenisRaf);
  if (typeof ScrollTrigger !== 'undefined') lenis.on('scroll', ScrollTrigger.update);
}

/* ═══════════════════════════════
   LOADER
═══════════════════════════════ */
const ldrBar = $('#ldrBar'), ldrPct = $('#ldrPct'), loader = $('#loader');
let pct = 0;
const lt = setInterval(() => {
  pct = Math.min(pct + Math.random() * 14 + 4, 100);
  const p = Math.floor(pct);
  if (ldrPct) ldrPct.textContent = p + '%';
  if (ldrBar) ldrBar.style.width = p + '%';
  if (pct >= 100) {
    clearInterval(lt);
    setTimeout(() => {
      loader?.classList.add('done');
      initHeroAnimations();
    }, 450);
  }
}, 60);

/* ═══════════════════════════════
   CUSTOM CURSOR
═══════════════════════════════ */
/* Custom cursor disabled — using default browser cursor */
// const cx = $('#cx'), cr = $('#cr');

/* ═══════════════════════════════
   SCROLL PROGRESS BAR
═══════════════════════════════ */
const prog = $('#prog');
window.addEventListener('scroll', () => {
  const p = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  if (prog) prog.style.width = Math.min(p, 100) + '%';
}, { passive: true });

/* ═══════════════════════════════
   NAVIGATION
═══════════════════════════════ */
const nav = $('#nav'), hb = $('#hb'), mobMenu = $('#mobMenu');
window.addEventListener('scroll', () => {
  nav?.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

hb?.addEventListener('click', () => {
  const open = mobMenu.classList.toggle('open');
  hb.classList.toggle('open', open);
  hb.setAttribute('aria-expanded', String(open));
  mobMenu.setAttribute('aria-hidden', String(!open));
  document.body.style.overflow = open ? 'hidden' : '';
});

$$('.mob-nav a').forEach(a => a.addEventListener('click', () => {
  mobMenu?.classList.remove('open'); hb?.classList.remove('open');
  hb?.setAttribute('aria-expanded', 'false'); mobMenu?.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}));

/* Active nav links */
const navLinks = $$('.nav-links a');
const sections = $$('section[id]');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 130) cur = s.id; });
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
}, { passive: true });

/* ═══════════════════════════════
   SMOOTH SCROLL
═══════════════════════════════ */
$$('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href'); if (href === '#') return;
    const t = document.getElementById(href.slice(1));
    if (t) {
      e.preventDefault();
      const top = t.getBoundingClientRect().top + window.scrollY - 72;
      lenis ? lenis.scrollTo(top, { duration: 1.2 }) : window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ═══════════════════════════════
   STORY PROGRESS SIDEBAR
═══════════════════════════════ */
const spDots = $$('.sp-dot');
spDots.forEach(d => {
  d.addEventListener('click', () => {
    const t = document.getElementById(d.dataset.sec);
    if (t) {
      const top = t.getBoundingClientRect().top + window.scrollY - 72;
      lenis ? lenis.scrollTo(top, { duration: 1.2 }) : window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 200) cur = s.id; });
  spDots.forEach(d => d.classList.toggle('active', d.dataset.sec === cur));
}, { passive: true });

/* ═══════════════════════════════
   HERO STARS (night)
═══════════════════════════════ */
(function createStars() {
  const sl = $('#starsLayer'); if (!sl) return;
  const count = window.innerWidth < 600 ? 40 : 80;
  for (let i = 0; i < count; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size = Math.random() * 2.2 + .4;
    s.style.cssText = `width:${size}px;height:${size}px;left:${Math.random() * 100}%;top:${Math.random() * 65}%;--d:${2 + Math.random() * 4}s;--del:${Math.random() * 3}s;--o:${.3 + Math.random() * .7}`;
    sl.appendChild(s);
  }
})();

/* ═══════════════════════════════
   CLOUDS
═══════════════════════════════ */
(function createClouds() {
  const cl = $('#cloudsLayer'); if (!cl) return;
  const clouds = [
    { top: '8%', left: '-22%', w: 220, h: 80, speed: 85, delay: 0 },
    { top: '14%', left: '108%', w: 190, h: 68, speed: 110, delay: -28 },
    { top: '5%', left: '-32%', w: 280, h: 95, speed: 145, delay: -55 },
    { top: '20%', left: '115%', w: 160, h: 60, speed: 100, delay: -70 },
  ];
  const style = document.createElement('style');
  clouds.forEach((_, i) => {
    style.textContent += `@keyframes cloudMove${i}{ from{transform:translateX(0)} to{transform:translateX(${i % 2 === 0 ? '' : '-'}calc(100vw + 320px))} }`;
  });
  clouds.forEach((c, i) => {
    const g = document.createElement('div');
    g.className = 'cloud-group';
    g.style.cssText = `position:absolute;top:${c.top};left:${c.left};width:${c.w}px;height:${c.h}px;animation:cloudMove${i} ${c.speed}s linear infinite ${c.delay}s`;
    const puffs = [
      { l: '10%', t: '40%', w: '45%', h: '70%' }, { l: '30%', t: '15%', w: '40%', h: '80%' },
      { l: '55%', t: '30%', w: '38%', h: '65%' }, { l: '0%', t: '55%', w: '100%', h: '45%' },
    ];
    puffs.forEach(p => {
      const puff = document.createElement('div');
      puff.className = 'c-puff';
      puff.style.cssText = `position:absolute;left:${p.l};top:${p.t};width:${p.w};height:${p.h}`;
      g.appendChild(puff);
    });
    cl.appendChild(g);
  });
  document.head.appendChild(style);
})();

/* ═══════════════════════════════
   SUN POSITION + PARALLAX
═══════════════════════════════ */
(function positionSun() {
  const sw = $('#sunWrap'); if (!sw) return;
  const sunSize = Math.min(150, window.innerWidth * .11);
  sw.style.top = window.innerHeight * .08 + 'px';
  sw.style.left = window.innerWidth * .08 + 'px';
  sw.style.width = sunSize + 'px'; sw.style.height = sunSize + 'px';
})();

window.addEventListener('scroll', () => {
  const sw = $('#sunWrap'); if (!sw) return;
  sw.style.transform = `translateY(${window.scrollY * .15}px)`;
}, { passive: true });

/* ═══════════════════════════════
   HERO ANIMATIONS
═══════════════════════════════ */
function initHeroAnimations() {
  const els = [
    { el: $('.hero-eyebrow'), delay: 100 },
    { el: $('.hero-title'), delay: 300 },
    { el: $('.hero-sub'), delay: 500 },
    { el: $('.hero-desc'), delay: 650 },
    { el: $('.hero-ctas'), delay: 800 },
  ];
  els.forEach(({ el, delay }) => {
    if (!el) return;
    setTimeout(() => {
      el.style.transition = 'opacity .8s ease, transform .8s cubic-bezier(.34,1.56,.64,1)';
      el.style.opacity = '1'; el.style.transform = 'translateY(0) rotateX(0)';
    }, delay);
  });
  const stats = $('#heroStats');
  if (stats) setTimeout(() => { stats.style.transition = 'opacity .7s ease'; stats.style.opacity = '1'; }, 1000);
}

/* ═══════════════════════════════
   TYPEWRITER
═══════════════════════════════ */
const twWord = $('#twWord');
const words = ['Landing Pages', 'Web Apps', 'UI/UX Interfaces', 'E-Commerce Sites', 'API Experiences', 'Pixel-Perfect Designs'];
let wIdx = 0, cIdx = 0, deleting = false;
function typeWriter() {
  if (!twWord) return;
  const word = words[wIdx];
  if (!deleting) {
    twWord.textContent = word.slice(0, ++cIdx);
    if (cIdx === word.length) { deleting = true; setTimeout(typeWriter, 1800); return; }
  } else {
    twWord.textContent = word.slice(0, --cIdx);
    if (cIdx === 0) { deleting = false; wIdx = (wIdx + 1) % words.length; }
  }
  setTimeout(typeWriter, deleting ? 50 : 90);
}
setTimeout(typeWriter, 2200);

/* ═══════════════════════════════
   HERO COUNTERS
═══════════════════════════════ */
$$('.counter').forEach(el => {
  const target = parseInt(el.dataset.target);
  const obs = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    let count = 0; const step = Math.ceil(target / 40);
    const t = setInterval(() => { count = Math.min(count + step, target); el.textContent = count; if (count >= target) clearInterval(t); }, 40);
    obs.disconnect();
  }, { threshold: .5 });
  obs.observe(el);
});

/* ═══════════════════════════════
   SCROLL REVEAL
═══════════════════════════════ */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    el.style.transition = 'opacity .75s ease, transform .75s cubic-bezier(.22,1,.36,1)';
    el.style.opacity = '1';
    el.style.transform = 'translateY(0) translateX(0) scale(1)';

    /* Skill bars */
    el.querySelectorAll('.sbar-fill').forEach((bar, i) => {
      const targetW = parseInt(bar.dataset.w);
      const pctEl = bar.closest('.sbar-wrap')?.querySelector('.sbar-pct');
      const card = bar.closest('.skill-card');
      setTimeout(() => {
        bar.style.transition = 'width 1.6s cubic-bezier(.22,1,.36,1)';
        bar.style.width = bar.dataset.w;
        if (pctEl) {
          let c = 0; const steps = 60, interval = 1600 / steps, inc = targetW / steps;
          const t = setInterval(() => { c = Math.min(c + inc, targetW); pctEl.textContent = Math.floor(c) + '%'; if (c >= targetW) { clearInterval(t); pctEl.textContent = targetW + '%'; } }, interval);
        }
        setTimeout(() => card?.classList.add('bar-animated'), 800);
      }, i * 100 + 200);
    });

    /* Timeline items */
    el.querySelectorAll('.tl-item').forEach((item, i) => {
      setTimeout(() => {
        item.style.transition = 'opacity .6s ease, transform .6s cubic-bezier(.22,1,.36,1)';
        item.style.opacity = '1'; item.style.transform = 'translateX(0)';
      }, i * 120 + 100);
    });

    revealObs.unobserve(el);
  });
}, { threshold: .08, rootMargin: '0px 0px -36px 0px' });

$$('.r0,.r-left,.r-right,.r-scale,.s-eye,.s-title').forEach(el => {
  if (el.classList.contains('r-left')) { el.style.transform = 'translateX(-48px)'; el.style.opacity = '0'; }
  else if (el.classList.contains('r-right')) { el.style.transform = 'translateX(48px)'; el.style.opacity = '0'; }
  else if (el.classList.contains('r-scale')) { el.style.transform = 'scale(.88)'; el.style.opacity = '0'; }
  else if (el.classList.contains('s-eye')) { el.style.transform = 'translateX(-24px)'; el.style.opacity = '0'; }
  else { el.style.transform = 'translateY(48px)'; el.style.opacity = '0'; }
  revealObs.observe(el);
});

/* ═══════════════════════════════
   WAYPOINTS — original
═══════════════════════════════ */
const wpIds = ['wp-about', 'wp-services', 'wp-projects', 'wp-process', 'wp-skills', 'wp-experience', 'wp-pricing', 'wp-testimonials', 'wp-blog', 'wp-faq', 'wp-contact'];
const wpObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('wp-visible'); wpObs.unobserve(e.target); } });
}, { threshold: .25 });
wpIds.forEach(id => { const el = document.getElementById(id); if (el) wpObs.observe(el); });

/* ═══════════════════════════════
   EXTRA WAYPOINTS — injected
═══════════════════════════════ */
const extraWaypoints = [
  { afterId: 'about', icon: '🏗️', text: 'Building the vision', color: 'var(--sky-mid)' },
  { afterId: 'services', icon: '💡', text: 'Every pixel intentional', color: 'var(--house-red)' },
  { afterId: 'projects', icon: '🎯', text: 'Code that ships', color: 'var(--house-teal)' },
  { afterId: 'skills', icon: '🔬', text: 'Craft meets engineering', color: 'var(--grass-bright)' },
  { afterId: 'experience', icon: '🚀', text: 'Always levelling up', color: 'var(--house-orange)' },
  { afterId: 'pricing', icon: '🤝', text: 'Fair work, real value', color: 'var(--sun-core)' },
  { afterId: 'testimonials', icon: '❤️', text: 'Happy clients always', color: 'var(--house-pink)' },
  { afterId: 'blog', icon: '📖', text: 'Sharing what I learn', color: 'var(--sky-mid)' },
];

extraWaypoints.forEach(({ afterId, icon, text, color }) => {
  const sec = document.getElementById(afterId); if (!sec) return;
  const wp = document.createElement('div');
  wp.className = 'wp-extra';
  wp.innerHTML = `
    <span class="wp-extra-icon">${icon}</span>
    <span class="wp-extra-text" style="color:${color}">${text}</span>
    <div class="wp-extra-line" style="background:linear-gradient(90deg,${color}44,transparent)"></div>
  `;
  const container = sec.querySelector('.about-grid,.svc-grid,.proj-grid,.skills-grid,.tl-wrap,.pricing-grid,.ts-wrap,.bl-grid');
  if (container) container.after(wp); else sec.appendChild(wp);
});

const wpExObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('wp-visible'); wpExObs.unobserve(e.target); } });
}, { threshold: .3 });
document.querySelectorAll('.wp-extra').forEach(el => wpExObs.observe(el));

/* ═══════════════════════════════
   PROJECT FILTERS
═══════════════════════════════ */
const filterBtns = $$('.pf-btn'), projCards = $$('.proj-card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
    btn.classList.add('active'); btn.setAttribute('aria-selected', 'true');
    const filter = btn.dataset.filter;
    projCards.forEach(card => {
      const match = filter === 'all' || card.dataset.cat === filter;
      if (!match) { card.classList.add('filtering-out'); setTimeout(() => card.classList.add('hidden'), 300); }
      else { card.classList.remove('hidden', 'filtering-out'); requestAnimationFrame(() => { card.style.opacity = '1'; card.style.transform = ''; }); }
    });
  });
});

/* ═══════════════════════════════
   PREVIEW MODAL
═══════════════════════════════ */
const previewModal = $('#previewModal'), previewBackdrop = $('#previewBackdrop'), previewClose = $('#previewClose'),
  previewIframe = $('#previewIframe'), previewLoader = $('#previewLoader'), previewTitle = $('#previewTitle'), previewExtLink = $('#previewExtLink');

$$('.preview-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const url = btn.dataset.url;
    const name = btn.closest('.proj-card')?.querySelector('.proj-name')?.textContent || 'Project';
    previewTitle.textContent = name + ' — Preview'; previewExtLink.href = url; previewIframe.src = '';
    previewModal.removeAttribute('hidden'); document.body.style.overflow = 'hidden';
    previewLoader.classList.remove('hide'); requestAnimationFrame(() => { previewIframe.src = url; });
    previewIframe.onload = () => previewLoader.classList.add('hide');
    setTimeout(() => previewLoader.classList.add('hide'), 5000);
  });
});

function closePreview() {
  previewModal?.setAttribute('hidden', ''); document.body.style.overflow = ''; if (previewIframe) previewIframe.src = '';
}
previewClose?.addEventListener('click', closePreview);
previewBackdrop?.addEventListener('click', closePreview);

/* ═══════════════════════════════
   FAQ ACCORDION
═══════════════════════════════ */
$$('.fq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.closest('.fq-item').querySelector('.fq-a');
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    $$('.fq-q[aria-expanded="true"]').forEach(q => {
      q.setAttribute('aria-expanded', 'false');
      q.closest('.fq-item').querySelector('.fq-a').setAttribute('hidden', '');
    });
    if (!isOpen) { btn.setAttribute('aria-expanded', 'true'); answer.removeAttribute('hidden'); }
  });
});

/* ═══════════════════════════════
   CONTACT FORM
═══════════════════════════════ */
const contactForm = $('#contactForm'), formContent = $('#formContent'), formSuccess = $('#formSuccess'),
  formError = $('#formError'), submitBtn = $('#submitBtn'), submitText = $('#submitText'), successEmail = $('#successEmail');

contactForm?.addEventListener('submit', async e => {
  e.preventDefault();
  const fname = contactForm.fname.value.trim(), email = contactForm.femail.value.trim(),
    msg = contactForm.message.value.trim(), consent = contactForm.consent.checked;
  formError?.setAttribute('hidden', '');
  if (!fname || fname.length < 2 || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !msg || msg.length < 10 || !consent) {
    formError?.removeAttribute('hidden'); return;
  }
  if (submitBtn) submitBtn.disabled = true;
  if (submitText) submitText.textContent = 'Sending…';
  try {
    const resp = await fetch(contactForm.action, { method: 'POST', body: new FormData(contactForm), headers: { Accept: 'application/json' } });
    if (resp.ok) {
      if (successEmail) successEmail.textContent = email;
      if (formContent) formContent.style.display = 'none';
      if (formSuccess) formSuccess.style.display = 'block';
      launchConfetti();
    } else throw new Error('error');
  } catch {
    if (submitText) submitText.textContent = 'Send Message';
    if (submitBtn) submitBtn.disabled = false;
    formError?.removeAttribute('hidden');
    if (formError) formError.textContent = 'Failed to send. Please email rabarivishan2@gmail.com directly.';
  }
});

/* ═══════════════════════════════
   CONFETTI
═══════════════════════════════ */
function launchConfetti() {
  const c = $('#confetti'); if (!c) return;
  const colors = ['#F5C842', '#F28C28', '#E8524A', '#40B8A0', '#9B5FCF', '#6DB33F'];
  for (let i = 0; i < 60; i++) {
    const p = document.createElement('div'); p.className = 'confetti-piece';
    p.style.cssText = `left:${Math.random() * 100}%;top:-10px;background:${colors[i % colors.length]};--tx:${(Math.random() - .5) * 230}px;animation-delay:${Math.random() * .8}s;width:${Math.random() * 6 + 4}px;height:${Math.random() * 6 + 4}px;border-radius:${Math.random() > .5 ? '50%' : '2px'}`;
    c.appendChild(p);
  }
}

/* ═══════════════════════════════
   BACK TO TOP
═══════════════════════════════ */
const backTop = $('#backTop');
window.addEventListener('scroll', () => { backTop?.classList.toggle('show', window.scrollY > 500); }, { passive: true });
backTop?.addEventListener('click', () => { lenis ? lenis.scrollTo(0, { duration: 1.5 }) : window.scrollTo({ top: 0, behavior: 'smooth' }); });

/* ═══════════════════════════════
   KEYBOARD SHORTCUTS
═══════════════════════════════ */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closePreview();
    mobMenu?.classList.remove('open'); hb?.classList.remove('open'); document.body.style.overflow = '';
  }
  if (e.key.toLowerCase() === 't' && !e.target.matches('input,textarea,select')) {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  }
});

/* ═══════════════════════════════════════════════
   DAY / NIGHT THEME SYSTEM — Complete
═══════════════════════════════════════════════ */

const html = document.documentElement;

/* Flash overlay element */
const flashOverlay = document.createElement('div');
flashOverlay.className = 'theme-flash-overlay';
document.body.appendChild(flashOverlay);

function spawnShootingStars(count = 3) {
  if (html.getAttribute('data-theme') !== 'dark') return;
  const hero = document.querySelector('.hero'); if (!hero) return;
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const s = document.createElement('div');
      s.className = 'shooting-star';
      s.style.cssText = `
        top:${4 + Math.random() * 30}%;
        left:${55 + Math.random() * 35}%;
        --ss-dur:${1.2 + Math.random() * 1.8}s;
        --ss-del:0s;
      `;
      hero.appendChild(s);
      setTimeout(() => s.remove(), 3500);
    }, i * 350);
  }
}

function spawnDayBirds() {
  if (html.getAttribute('data-theme') !== 'light') return;
  const birds = ['🐦', '🐦', '🦅', '🐦'];
  birds.forEach((b, i) => {
    setTimeout(() => {
      const bird = document.createElement('div');
      bird.className = 'theme-bird';
      bird.textContent = b;
      bird.style.cssText = `top:${6 + i * 4}%;left:-40px;font-size:${12 + Math.random() * 8}px`;
      document.body.appendChild(bird);
      requestAnimationFrame(() => bird.classList.add('fly'));
      setTimeout(() => bird.remove(), 8000);
    }, i * 700);
  });
}

function triggerThemeFlash(theme, btnEl) {
  if (!btnEl) return;
  const rect = btnEl.getBoundingClientRect();
  const ox = ((rect.left + rect.width / 2) / window.innerWidth * 100).toFixed(1) + '%';
  const oy = ((rect.top + rect.height / 2) / window.innerHeight * 100).toFixed(1) + '%';
  flashOverlay.style.transformOrigin = ox + ' ' + oy;
  flashOverlay.className = 'theme-flash-overlay';
  void flashOverlay.offsetWidth;
  flashOverlay.classList.add(theme === 'light' ? 'flash-day' : 'flash-night');
  setTimeout(() => { flashOverlay.className = 'theme-flash-overlay'; }, 700);
}

function applyTheme(theme, btnEl) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('vr-theme', theme);

  const toggleBtn = btnEl || document.getElementById('themeToggle');
  if (toggleBtn) {
    toggleBtn.setAttribute('data-tooltip', theme === 'dark' ? 'Switch to Day ☀️' : 'Switch to Night 🌙');
    triggerThemeFlash(theme, toggleBtn);
    // Button spin animation
    toggleBtn.style.transition = 'transform 0.55s cubic-bezier(.34,1.56,.64,1), box-shadow 0.35s ease';
    toggleBtn.style.transform = 'scale(1.18) rotate(360deg)';
    setTimeout(() => { toggleBtn.style.transform = ''; }, 600);
  }

  // Spawn ambient effects
  if (theme === 'dark') {
    setTimeout(spawnShootingStars, 300);
    // Update cloud appearance immediately via re-observing
    $$('.c-puff').forEach(p => {
      p.style.background = 'rgba(25,40,75,0.55)';
      p.style.boxShadow = 'none';
    });
  } else {
    setTimeout(spawnDayBirds, 200);
    $$('.c-puff').forEach(p => {
      p.style.background = 'rgba(255,255,255,0.96)';
      p.style.boxShadow = 'inset -4px -8px 18px rgba(100,155,200,0.2)';
    });
  }

  // Update orbs blend mode
  $$('.orb-ambient').forEach(orb => {
    orb.style.mixBlendMode = theme === 'light' ? 'multiply' : 'screen';
    orb.style.opacity = theme === 'light' ? '0.15' : '0.18';
  });
}

/* Init theme on load */
(function initTheme() {
  const saved = localStorage.getItem('vr-theme') || 'dark';
  html.setAttribute('data-theme', saved);

  const toggleBtn = document.getElementById('themeToggle');
  if (toggleBtn) {
    toggleBtn.setAttribute('data-tooltip', saved === 'dark' ? 'Switch to Day ☀️' : 'Switch to Night 🌙');
    toggleBtn.addEventListener('click', () => {
      const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next, toggleBtn);
    });
  }

  // Apply initial state without animation
  if (saved === 'light') {
    $$('.c-puff').forEach(p => {
      p.style.background = 'rgba(255,255,255,0.96)';
      p.style.boxShadow = 'inset -4px -8px 18px rgba(100,155,200,0.2)';
    });
  } else {
    $$('.c-puff').forEach(p => {
      p.style.background = 'rgba(25,40,75,0.55)';
      p.style.boxShadow = 'none';
    });
  }

  // Night effect on load
  if (saved === 'dark') setTimeout(() => spawnShootingStars(2), 2000);
})();

/* Periodic shooting stars (night only) */
setInterval(() => spawnShootingStars(2), 14000);

/* ═══════════════════════════════
   HERO PARALLAX SCROLL
═══════════════════════════════ */
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const sy = window.scrollY;
      if (sy < window.innerHeight) {
        $$('.cloud-group').forEach((cloud, i) => {
          cloud.style.transform = `translateY(${sy * (i + 1) * 0.04}px)`;
        });
        const terrain = $('.terrain-scene');
        if (terrain) terrain.style.transform = `translateY(${sy * 0.08}px)`;
        const hc = $('.hero-content');
        if (hc) hc.style.transform = `translateY(${sy * 0.07}px)`;
      }
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

/* ═══════════════════════════════
   STAGGER CARD ANIMATIONS
═══════════════════════════════ */
const cardAnimObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const cards = entry.target.querySelectorAll('.svc,.proj-card,.ts,.bl,.price-card,.process-step,.skill-card');
    cards.forEach((card, i) => {
      if (parseFloat(window.getComputedStyle(card).opacity) > 0.5) return;
      card.style.opacity = '0'; card.style.transform = 'translateY(28px) scale(0.97)';
      setTimeout(() => {
        card.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(.22,1,.36,1)';
        card.style.opacity = '1'; card.style.transform = 'translateY(0) scale(1)';
      }, i * 75 + 80);
    });
    cardAnimObs.unobserve(entry.target);
  });
}, { threshold: 0.06 });
sections.forEach(s => cardAnimObs.observe(s));

/* ═══════════════════════════════
   MOUSE PARALLAX ON ORBS
═══════════════════════════════ */
document.addEventListener('mousemove', e => {
  const mx = (e.clientX / window.innerWidth - .5) * 25;
  const my = (e.clientY / window.innerHeight - .5) * 25;
  $$('.orb-ambient').forEach((orb, i) => {
    const f = ((i % 3) + 1) * 0.35;
    orb.style.transform = `translate(${mx * f}px, ${my * f}px)`;
  });
}, { passive: true });

/* ═══════════════════════════════
   3D TILT on cards (desktop)
═══════════════════════════════ */
if (window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
  $$('.svc,.price-card,.ts,.skill-card,.process-step').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - .5) * 8;
      const y = ((e.clientY - r.top) / r.height - .5) * -8;
      card.style.transform = `translateY(-8px) perspective(900px) rotateX(${y}deg) rotateY(${x}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

/* ═══════════════════════════════
   HILL DIVIDERS PARALLAX
═══════════════════════════════ */
window.addEventListener('scroll', () => {
  $$('.hill-divider').forEach((div, i) => {
    const rect = div.getBoundingClientRect();
    if (rect.top > window.innerHeight || rect.bottom < 0) return;
    const offset = rect.top * 0.03;
    const svg = div.querySelector('svg');
    if (svg) svg.style.transform = `translateY(${offset}px)`;
  });
}, { passive: true });

/* ═══════════════════════════════
   WAYPOINT CLICK → SMOOTH SCROLL
═══════════════════════════════ */
$$('.waypoint-wrap').forEach(wp => {
  wp.style.cursor = 'pointer';
  wp.addEventListener('click', () => {
    const secId = wp.id?.replace('wp-', '');
    if (!secId) return;
    const sec = document.getElementById(secId);
    if (!sec) return;
    const top = sec.getBoundingClientRect().top + window.scrollY - 80;
    lenis ? lenis.scrollTo(top, { duration: 1.2 }) : window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ═══════════════════════════════
   STAR CATCHER MINI GAME
═══════════════════════════════ */
(function () {
  let scScore = 0, scTime = 10, scBest = 0, scInterval, scRunning = false;
  const arena = document.getElementById('sc-arena'), star = document.getElementById('sc-star'),
    overlay = document.getElementById('sc-overlay'), scoreEl = document.getElementById('sc-score-val'),
    timeEl = document.getElementById('sc-time-val'), bestEl = document.getElementById('sc-best-val'),
    playBtn = document.getElementById('scPlayBtn');
  if (!arena) return;
  const rand = max => Math.floor(Math.random() * max);
  function moveStar() {
    star.style.left = Math.max(4, rand(arena.offsetWidth - 36)) + 'px';
    star.style.top = Math.max(4, rand(arena.offsetHeight - 36)) + 'px';
  }
  function spawnParticles(x, y) {
    const items = ['✨', '💫', '🌟', '⚡', '🏠'];
    for (let i = 0; i < 6; i++) {
      const p = document.createElement('div'); p.className = 'sc-particle'; p.textContent = items[rand(items.length)];
      const angle = (Math.PI * 2 / 6) * i, dist = 35 + rand(30);
      p.style.setProperty('--tx', Math.cos(angle) * dist + 'px'); p.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
      p.style.left = (x - 10) + 'px'; p.style.top = (y - 10) + 'px'; arena.appendChild(p);
      setTimeout(() => { if (p.parentNode) p.parentNode.removeChild(p); }, 800);
    }
  }
  function scStart() {
    if (scRunning) return; scScore = 0; scTime = 10; scRunning = true;
    scoreEl.textContent = '0'; timeEl.textContent = '10'; timeEl.classList.remove('sc-danger');
    const old = arena.querySelector('.sc-newbest'); if (old) old.parentNode.removeChild(old);
    overlay.classList.add('sc-hidden'); moveStar();
    star.onclick = e => {
      if (!scRunning) return; scScore++; scoreEl.textContent = scScore;
      star.classList.add('sc-pop'); setTimeout(() => star.classList.remove('sc-pop'), 250);
      const rect = arena.getBoundingClientRect(); spawnParticles(e.clientX - rect.left, e.clientY - rect.top); moveStar();
    };
    scInterval = setInterval(() => {
      scTime--; timeEl.textContent = scTime; if (scTime <= 3) timeEl.classList.add('sc-danger');
      if (scTime <= 0) scEnd();
    }, 1000);
  }
  function scEnd() {
    scRunning = false; clearInterval(scInterval); star.onclick = null; timeEl.classList.remove('sc-danger');
    const isNew = scScore > scBest;
    if (isNew) {
      scBest = scScore; bestEl.textContent = scBest;
      const b = document.createElement('div'); b.className = 'sc-newbest'; b.textContent = '🏆 New Best!'; arena.appendChild(b);
    }
    let rating = '💪 Keep going!';
    if (scScore >= 20) rating = '🔥 Insane!'; else if (scScore >= 15) rating = '⚡ Lightning!'; else if (scScore >= 10) rating = '✨ Great job!'; else if (scScore >= 5) rating = '👍 Not bad!';
    overlay.classList.remove('sc-hidden');
    overlay.innerHTML = `<div class="sc-ov-icon">${isNew ? '🏆' : '⏰'}</div><div class="sc-ov-title">TIME'S UP</div><div class="sc-final">${scScore}</div><div class="sc-rating">${rating}</div>${isNew ? '<div style="font-size:.55rem;color:#ffd166;font-weight:800;letter-spacing:1px">NEW HIGH SCORE!</div>' : ''}<button class="sc-play-btn" id="scPlayBtn2">▶ AGAIN</button>`;
    document.getElementById('scPlayBtn2')?.addEventListener('click', scStart);
  }
  playBtn?.addEventListener('click', scStart);
})();

/* ═══════════════════════════════
   SKILLS 3D GLOBE
═══════════════════════════════ */
(function initGlobe() {
  const canvas = document.getElementById('skillsGlobe'); if (!canvas || !window.THREE) return;
  const SKILLS = [
    { name: 'HTML5', icon: '⬡', color: '#e34c26', pct: 90, level: 'Expert', desc: 'Semantic markup, accessibility, SEO and modern HTML5 structures.' },
    { name: 'CSS3', icon: '◈', color: '#264de4', pct: 88, level: 'Expert', desc: 'Flexbox, Grid, animations, transitions and responsive design.' },
    { name: 'JavaScript', icon: 'JS', color: '#f0db4f', pct: 72, level: 'Advanced', desc: 'DOM manipulation, REST APIs, ES6+, async/await patterns.' },
    { name: 'Figma', icon: '▣', color: '#a259ff', pct: 75, level: 'Advanced', desc: 'UI/UX design, prototyping, design systems and handoffs.' },
    { name: 'Git', icon: '⑂', color: '#f1502f', pct: 80, level: 'Advanced', desc: 'Version control, branching and GitHub Pages deployment.' },
    { name: 'Responsive', icon: '⊞', color: '#40B8A0', pct: 85, level: 'Expert', desc: 'Mobile-first design, media queries and fluid layouts.' },
    { name: 'REST APIs', icon: '⇄', color: '#F5C842', pct: 70, level: 'Advanced', desc: 'Integrating weather, currency and GitHub APIs.' },
    { name: 'C Lang', icon: 'C', color: '#a8b9cc', pct: 78, level: 'Advanced', desc: 'Algorithms, data structures and problem solving.' },
  ];

  const W = canvas.parentElement.clientWidth, H = canvas.parentElement.clientHeight;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); renderer.setSize(W, H); renderer.setClearColor(0x000000, 0);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, W / H, .1, 1000); camera.position.z = 3.8;
  scene.add(new THREE.AmbientLight(0xffffff, .4));
  const dirLight = new THREE.DirectionalLight(0xF5C842, .8); dirLight.position.set(5, 5, 5); scene.add(dirLight);
  const pointLight = new THREE.PointLight(0x40B8A0, .6, 10); pointLight.position.set(-3, 2, 3); scene.add(pointLight);

  const pivot = new THREE.Group(); scene.add(pivot);

  // Globe sphere
  const geoSphere = new THREE.IcosahedronGeometry(1.0, 2);
  const matSphere = new THREE.MeshPhongMaterial({ color: 0x1a0f0a, emissive: 0x0a0505, wireframe: false, transparent: true, opacity: .92 });
  pivot.add(new THREE.Mesh(geoSphere, matSphere));
  const wireMat = new THREE.MeshBasicMaterial({ color: 0x3a2010, wireframe: true, transparent: true, opacity: .35 });
  pivot.add(new THREE.Mesh(new THREE.IcosahedronGeometry(1.01, 2), wireMat));

  // Rings
  function makeRing(r, rx, rz, color, op) {
    const pts = []; for (let i = 0; i <= 128; i++) { const a = (i / 128) * Math.PI * 2; pts.push(new THREE.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r)); }
    const ring = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color, transparent: true, opacity: op }));
    ring.rotation.x = rx; ring.rotation.z = rz; scene.add(ring); return ring;
  }
  const rings = [
    makeRing(1.55, Math.PI / 2, 0, 0xF5C842, .25),
    makeRing(1.55, Math.PI / 4, Math.PI / 6, 0x40B8A0, .18),
    makeRing(1.85, Math.PI / 3, -Math.PI / 5, 0x9B5FCF, .12),
  ];

  // Fibonacci sphere positions
  function fibSphere(n, r) { const pts = [], g = Math.PI * (3 - Math.sqrt(5)); for (let i = 0; i < n; i++) { const y = 1 - (i / (n - 1)) * 2, rad = Math.sqrt(1 - y * y), t = g * i; pts.push(new THREE.Vector3(Math.cos(t) * rad * r, y * r, Math.sin(t) * rad * r)); } return pts; }
  const orbitPositions = fibSphere(SKILLS.length, 1.55);

  // Skill sprites
  const skillNodes = [];
  SKILLS.forEach((skill, i) => {
    const tc = document.createElement('canvas'); tc.width = 128; tc.height = 128;
    const ctx = tc.getContext('2d');
    const grad = ctx.createRadialGradient(64, 64, 10, 64, 64, 62); grad.addColorStop(0, skill.color + 'dd'); grad.addColorStop(1, skill.color + '00');
    ctx.fillStyle = grad; ctx.beginPath(); ctx.arc(64, 64, 62, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(26,15,10,.88)'; ctx.beginPath(); ctx.arc(64, 64, 36, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = skill.color; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(64, 64, 36, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = skill.color; ctx.font = 'bold 22px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(skill.icon, 64, 60);
    ctx.fillStyle = 'rgba(255,248,240,.85)'; ctx.font = '11px sans-serif'; ctx.fillText(skill.name, 64, 84);
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(tc), transparent: true, depthTest: false }));
    sprite.position.copy(orbitPositions[i]); sprite.scale.set(.42, .42, 1);
    sprite.userData = { skill, hovered: false }; pivot.add(sprite); skillNodes.push(sprite);
  });

  // Particles
  const pCount = 120, pPos = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount; i++) { const r = 1.6 + Math.random() * 1.2, t = Math.random() * Math.PI * 2, p = Math.acos(2 * Math.random() - 1); pPos[i * 3] = r * Math.sin(p) * Math.cos(t); pPos[i * 3 + 1] = r * Math.sin(p) * Math.sin(t); pPos[i * 3 + 2] = r * Math.cos(p); }
  const pGeo = new THREE.BufferGeometry(); pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  const pMat = new THREE.PointsMaterial({ color: 0xF5C842, size: .015, transparent: true, opacity: .4 });
  pivot.add(new THREE.Points(pGeo, pMat));

  // Interaction
  const raycaster = new THREE.Raycaster(), mouse2D = new THREE.Vector2(-999, -999);
  let isDragging = false, prevMouse = { x: 0, y: 0 }, velocity = { x: 0, y: 0 }, hoveredNode = null;
  const panel = document.getElementById('skillInfoPanel'), sipIcon = document.getElementById('sipIcon'),
    sipName = document.getElementById('sipName'), sipLevel = document.getElementById('sipLevel'),
    sipDesc = document.getElementById('sipDesc'), sipBarFill = document.getElementById('sipBarFill'),
    sipPct = document.getElementById('sipPct');

  function showSkillInfo(skill) {
    if (!panel) return; panel.classList.add('active');
    sipIcon.textContent = skill.icon; sipName.textContent = skill.name; sipLevel.textContent = skill.level;
    sipDesc.textContent = skill.desc; sipBarFill.style.width = skill.pct + '%'; sipPct.textContent = skill.pct + '%';
    $$('.legend-item').forEach(el => el.classList.toggle('active', el.dataset.skill === skill.name));
  }
  function resetSkillInfo() {
    if (!panel) return; panel.classList.remove('active');
    sipIcon.textContent = '👆'; sipName.textContent = 'Hover a Skill'; sipLevel.textContent = '——';
    sipDesc.textContent = 'Drag to rotate the globe. Hover a tech icon for details.';
    sipBarFill.style.width = '0%'; sipPct.textContent = '—';
    $$('.legend-item').forEach(el => el.classList.remove('active'));
  }
  $$('.legend-item').forEach(el => { el.addEventListener('click', () => { const f = SKILLS.find(s => s.name === el.dataset.skill); if (f) showSkillInfo(f); }); });

  const getPos = e => { const r = canvas.getBoundingClientRect(); const cx = e.touches ? e.touches[0].clientX : e.clientX, cy = e.touches ? e.touches[0].clientY : e.clientY; return { x: cx - r.left, y: cy - r.top }; };
  canvas.addEventListener('mousedown', e => { isDragging = true; prevMouse = getPos(e); velocity = { x: 0, y: 0 }; });
  canvas.addEventListener('touchstart', e => { isDragging = true; prevMouse = getPos(e); }, { passive: true });
  window.addEventListener('mouseup', () => { isDragging = false; }); window.addEventListener('touchend', () => { isDragging = false; });
  canvas.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect(); mouse2D.x = ((e.clientX - r.left) / r.width) * 2 - 1; mouse2D.y = -((e.clientY - r.top) / r.height) * 2 + 1;
    if (isDragging) { const p = getPos(e); velocity.x = (p.y - prevMouse.y) * .004; velocity.y = (p.x - prevMouse.x) * .004; pivot.rotation.x += velocity.x; pivot.rotation.y += velocity.y; prevMouse = p; }
  });
  canvas.addEventListener('touchmove', e => { if (isDragging) { const p = getPos(e); pivot.rotation.x += (p.y - prevMouse.y) * .004; pivot.rotation.y += (p.x - prevMouse.x) * .004; prevMouse = p; } }, { passive: true });
  window.addEventListener('resize', () => { const w = canvas.parentElement.clientWidth, h = canvas.parentElement.clientHeight; camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h); }, { passive: true });

  let frame = 0;
  function animate() {
    requestAnimationFrame(animate); frame++;
    if (!isDragging) { velocity.x *= .95; velocity.y *= .95; pivot.rotation.x += velocity.x; pivot.rotation.y += .003 + velocity.y; }
    pMat.opacity = .3 + Math.sin(frame * .02) * .2;
    rings.forEach((r, i) => { r.rotation.y += .001 * (i + 1) * .5; });
    raycaster.setFromCamera(mouse2D, camera);
    const hits = raycaster.intersectObjects(skillNodes);
    if (hits.length > 0) {
      const hit = hits[0].object;
      if (hoveredNode !== hit) { if (hoveredNode) { hoveredNode.scale.set(.42, .42, 1); hoveredNode.userData.hovered = false; } hoveredNode = hit; hoveredNode.scale.set(.58, .58, 1); hoveredNode.userData.hovered = true; showSkillInfo(hoveredNode.userData.skill); canvas.style.cursor = 'pointer'; }
    } else {
      if (hoveredNode) { hoveredNode.scale.set(.42, .42, 1); hoveredNode.userData.hovered = false; hoveredNode = null; resetSkillInfo(); }
      canvas.style.cursor = isDragging ? 'grabbing' : 'grab';
    }
    renderer.render(scene, camera);
  }
  animate();
})();

console.log('✅ Vishan Portfolio — Press T to toggle theme');
