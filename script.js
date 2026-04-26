/* ============================================================
   VISHAN RABARI — PORTFOLIO v2  |  script.js  (PRIMARY)
   All core interactive handlers — nav, cursor, particles,
   theme, hamburger, counters, filter, carousel, FAQ,
   modal, scroll-reveal, back-to-top, Star Catcher game
============================================================ */

'use strict';

/* ══════════════════════════════════
   SCROLL PROGRESS BAR
══════════════════════════════════ */
(function initScrollBar() {
  const bar = document.getElementById('scrollBar');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = max > 0 ? (window.scrollY / max * 100) + '%' : '0';
  }, { passive: true });
})();

/* ══════════════════════════════════
   CUSTOM CURSOR
══════════════════════════════════ */
(function initCursor() {
  const cur = document.getElementById('cur');
  const cur2 = document.getElementById('cur2');
  if (!cur || !cur2) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  let mx = -200, my = -200, cx = -200, cy = -200;
  let rafId;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });

  function loop() {
    cur.style.left = mx + 'px';
    cur.style.top = my + 'px';
    cx += (mx - cx) * 0.12;
    cy += (my - cy) * 0.12;
    cur2.style.left = cx + 'px';
    cur2.style.top = cy + 'px';
    rafId = requestAnimationFrame(loop);
  }
  loop();

  // Hover effect on interactive elements
  document.addEventListener('mouseover', e => {
    if (e.target.closest('a, button, input, select, textarea, [role="button"], .magnetic')) {
      document.body.classList.add('link-hover');
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest('a, button, input, select, textarea, [role="button"], .magnetic')) {
      document.body.classList.remove('link-hover');
    }
  });

  // Magnetic button effect
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${dx * 0.25}px, ${dy * 0.25}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
})();

/* ══════════════════════════════════
   PARTICLE CANVAS
══════════════════════════════════ */
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  const COUNT = window.innerWidth < 768 ? 40 : 80;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  function rand(min, max) { return Math.random() * (max - min) + min; }

  for (let i = 0; i < COUNT; i++) {
    particles.push({
      x: rand(0, window.innerWidth),
      y: rand(0, window.innerHeight),
      r: rand(0.4, 1.6),
      vx: rand(-0.18, 0.18),
      vy: rand(-0.18, 0.18),
      alpha: rand(0.1, 0.55)
    });
  }

  let frameCount = 0;
  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,255,0,${p.alpha})`;
      ctx.fill();
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;
    });

    // Draw connecting lines between close particles
    if (frameCount % 2 === 0) { // skip every other frame for perf
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(200,255,0,${0.06 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }
    frameCount++;
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ══════════════════════════════════
   LOADER
══════════════════════════════════ */
(function initLoader() {
  const loader = document.getElementById('loader');
  const bar = document.getElementById('ldrBar');
  const pct = document.getElementById('ldrPct');
  if (!loader) return;

  // FIX: Use a two-phase approach.
  // Phase 1: animate to 85% quickly (fake progress feel).
  // Phase 2: jump to 100% only when window.load fires.
  // This prevents the loader from hiding before fonts/images
  // are ready (which would leave layout unstable for GSAP).
  let progress = 0;
  let done = false;

  const interval = setInterval(() => {
    if (done) return;
    // Slow down as we approach 85 so it never auto-completes
    const increment = progress < 60 ? 12 : progress < 80 ? 4 : 0.8;
    progress = Math.min(progress + increment, 85);
    if (bar) bar.style.width = progress + '%';
    if (pct) pct.textContent = Math.floor(progress) + '%';
  }, 80);

  function finish() {
    if (done) return;
    done = true;
    clearInterval(interval);
    progress = 100;
    if (bar) bar.style.width = '100%';
    if (pct) pct.textContent = '100%';
    // Small pause so user sees 100% before hiding
    setTimeout(() => loader.classList.add('done'), 350);
  }

  window.addEventListener('load', finish, { once: true });
  // Safety net: always hide after 4s max even if load never fires
  setTimeout(finish, 4000);
})();

/* ══════════════════════════════════
   THEME TOGGLE
══════════════════════════════════ */
(function initTheme() {
  const btn = document.getElementById('themeToggle');
  const html = document.documentElement;

  // Persist preference
  const saved = localStorage.getItem('vr-theme');
  if (saved) html.setAttribute('data-theme', saved);

  if (!btn) return;
  btn.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('vr-theme', next);
  });
})();

/* ══════════════════════════════════
   NAV — scroll class + active links
══════════════════════════════════ */
(function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  // Active link highlight based on scroll position
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-60px 0px -40% 0px' });

  sections.forEach(s => observer.observe(s));
})();

/* ══════════════════════════════════
   HAMBURGER / MOBILE MENU
══════════════════════════════════ */
(function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('mobMenu');
  if (!hamburger || !menu) return;

  function closeMenu() {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    menu.classList.toggle('open', isOpen);
    menu.setAttribute('aria-hidden', String(!isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  menu.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
})();

/* ══════════════════════════════════
   HERO TYPEWRITER
══════════════════════════════════ */
(function initTypewriter() {
  const el = document.getElementById('twWord');
  if (!el) return;
  const words = ['Landing Pages', 'Web Apps', 'E-Commerce', 'UI Experiences', 'Fast Websites', 'REST API Apps'];
  let wi = 0, ci = 0, deleting = false;

  function tick() {
    const word = words[wi];
    el.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
    let delay = deleting ? 50 : 90;
    if (!deleting && ci > word.length) { delay = 1600; deleting = true; }
    if (deleting && ci < 0) { deleting = false; wi = (wi + 1) % words.length; ci = 0; delay = 300; }
    setTimeout(tick, delay);
  }
  setTimeout(tick, 1400);
})();

/* ══════════════════════════════════
   COUNTER ANIMATION
══════════════════════════════════ */
(function initCounters() {
  const counters = document.querySelectorAll('.counter[data-target]');
  if (!counters.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      let start = 0;
      const duration = 1400;
      const step = timestamp => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        el.textContent = Math.floor(progress * target);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
      };
      requestAnimationFrame(step);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => io.observe(c));
})();

/* ══════════════════════════════════
   SCROLL REVEAL (.sr elements)
══════════════════════════════════ */
(function initScrollReveal() {
  // Skip if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.sr').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  // Inject base SR styles once
  // FIX: exclude elements that have their own CSS keyframe animations
  // (.ht-line, .hero-kicker, .hero-sub, .hero-ctas, .hero-typewriter, .hero-right,
  //  .hero-stats) — they start at opacity:0 via CSS and reveal via CSS animation.
  // If we also set opacity:0 via JS, they get stuck invisible when GSAP
  // tries to control the same property.
  const style = document.createElement('style');
  style.textContent = `
    .sr:not(.ht-line):not(.hero-kicker):not(.hero-sub):not(.hero-ctas):not(.hero-typewriter):not(.hero-right):not(.hero-stats):not(.stat-item) {
      opacity: 0;
      transform: translateY(32px);
      transition: opacity 0.65s cubic-bezier(0.4,0,0.2,1), transform 0.65s cubic-bezier(0.4,0,0.2,1);
    }
    .sr.sr-delay-1 { transition-delay: 0.1s; }
    .sr.sr-delay-2 { transition-delay: 0.2s; }
    .sr.sr-delay-3 { transition-delay: 0.3s; }
    .sr.sr-delay-4 { transition-delay: 0.4s; }
    .sr.sr-d1 { transition-delay: 0.1s; }
    .sr.sr-d2 { transition-delay: 0.2s; }
    .sr.sr-d3 { transition-delay: 0.3s; }
    .sr.sr-d4 { transition-delay: 0.4s; }
    .sr.visible { opacity: 1 !important; transform: none !important; }
  `;
  document.head.appendChild(style);

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.sr').forEach(el => io.observe(el));
})();

/* ══════════════════════════════════
   PROJECT FILTERS
══════════════════════════════════ */
(function initProjectFilters() {
  const buttons = document.querySelectorAll('.pf-btn');
  const cards = document.querySelectorAll('.proj-card');
  if (!buttons.length || !cards.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.dataset.filter;
      cards.forEach(card => {
        const show = filter === 'all' || card.dataset.cat === filter;
        card.style.display = show ? '' : 'none';
        // Animate in
        if (show) {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.94) translateY(20px)';
          requestAnimationFrame(() => {
            card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
            card.style.opacity = '1';
            card.style.transform = '';
          });
        }
      });
    });
  });
})();

/* ══════════════════════════════════
   PROJECT PREVIEW MODAL
══════════════════════════════════ */
(function initPreviewModal() {
  const modal = document.getElementById('previewModal');
  const iframe = document.getElementById('previewIframe');
  const closeBtn = document.getElementById('previewClose');
  const backdrop = document.getElementById('previewBackdrop');
  const loader = document.getElementById('previewLoader');
  const titleEl = document.getElementById('previewTitle');
  const extLink = document.getElementById('previewExternalLink');
  if (!modal || !iframe) return;

  function openModal(url, name) {
    modal.hidden = false;
    if (loader) loader.classList.remove('hide');
    if (titleEl) titleEl.textContent = name || 'Project Preview';
    if (extLink) extLink.href = url;
    iframe.src = url;
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.hidden = true;
    iframe.src = '';
    document.body.style.overflow = '';
  }

  iframe.addEventListener('load', () => {
    if (loader) loader.classList.add('hide');
  });

  document.querySelectorAll('.preview-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const url = btn.dataset.url;
      const name = btn.closest('.proj-card')?.querySelector('.proj-name')?.textContent || 'Preview';
      openModal(url, name);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });
})();

/* ══════════════════════════════════
   TESTIMONIALS CAROUSEL
══════════════════════════════════ */
(function initTestiCarousel() {
  const carousel = document.getElementById('testiCarousel');
  const prevBtn = document.getElementById('testiPrev');
  const nextBtn = document.getElementById('testiNext');
  const dotsContainer = document.getElementById('testiDots');
  if (!carousel) return;

  const cards = Array.from(carousel.querySelectorAll('.testi-card'));
  let current = 0;
  let autoTimer;

  // Build dots
  if (dotsContainer) {
    cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
      dot.addEventListener('click', () => go(i));
      dotsContainer.appendChild(dot);
    });
  }

  function go(index) {
    current = (index + cards.length) % cards.length;
    // CSS scroll snap handles visual; we just update dots & ARIA
    cards.forEach((c, i) => {
      c.setAttribute('aria-hidden', String(i !== current));
    });
    dotsContainer?.querySelectorAll('.testi-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
    // Smooth scroll to card
    cards[current].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { go(current - 1); resetAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { go(current + 1); resetAuto(); });

  // Keyboard navigation
  carousel.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') { go(current - 1); resetAuto(); }
    if (e.key === 'ArrowRight') { go(current + 1); resetAuto(); }
  });

  // Auto-advance
  function startAuto() {
    autoTimer = setInterval(() => go(current + 1), 5000);
  }
  function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
  }
  startAuto();

  // Pause on hover / focus
  carousel.addEventListener('mouseenter', () => clearInterval(autoTimer));
  carousel.addEventListener('mouseleave', startAuto);
  carousel.addEventListener('focusin', () => clearInterval(autoTimer));
  carousel.addEventListener('focusout', startAuto);
})();

/* ══════════════════════════════════
   FAQ ACCORDION
══════════════════════════════════ */
(function initFAQ() {
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-a');
      const isOpen = !answer.hidden;

      // Close all others
      document.querySelectorAll('.faq-item').forEach(fi => {
        fi.querySelector('.faq-a').hidden = true;
        fi.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        fi.classList.remove('open');
      });

      // Toggle this one
      if (!isOpen) {
        answer.hidden = false;
        btn.setAttribute('aria-expanded', 'true');
        item.classList.add('open');
      }
    });
  });
})();

/* ══════════════════════════════════
   BACK TO TOP
══════════════════════════════════ */
(function initBackTop() {
  const btn = document.getElementById('backTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ══════════════════════════════════
   SKILLS GLOBE (canvas)
   Interactive 3D orbit of skill icons
══════════════════════════════════ */
(function initSkillsGlobe() {
  const canvas = document.getElementById('skillsGlobe');
  if (!canvas) return;

  const io = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    io.disconnect();
    buildGlobe(canvas);
  }, { threshold: 0.1 });
  io.observe(canvas);

  function buildGlobe(canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, cx, cy;

    function resize() {
      const container = canvas.parentElement;
      W = canvas.width = container.clientWidth;
      H = canvas.height = container.clientHeight;
      cx = W / 2; cy = H / 2;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const skills = [
      { name: 'HTML5', icon: '⬡', color: '#e34c26', level: 90, cat: 'Core' },
      { name: 'CSS3', icon: '◈', color: '#264de4', level: 88, cat: 'Core' },
      { name: 'JavaScript', icon: 'JS', color: '#f0db4f', level: 82, cat: 'Core' },
      { name: 'Figma', icon: '▣', color: '#a259ff', level: 78, cat: 'Design' },
      { name: 'Git', icon: '⑂', color: '#f1502f', level: 75, cat: 'Tools' },
      { name: 'Responsive', icon: '⊞', color: '#ffb347', level: 90, cat: 'Design' },
      { name: 'REST APIs', icon: '⇄', color: '#ff6b00', level: 72, cat: 'Tools' },
      { name: 'C Lang', icon: 'C', color: '#a8b9cc', level: 65, cat: 'Lang' },
      { name: 'GSAP', icon: '▶', color: '#ff8c42', level: 68, cat: 'Tools' },
      { name: 'React', icon: '⚛', color: '#ffd166', level: 40, cat: 'Learning' },
      { name: 'Node.js', icon: '⬡', color: '#ff9f1c', level: 35, cat: 'Learning' },
      { name: 'SEO', icon: '◎', color: '#ffd166', level: 70, cat: 'Tools' }
    ];

    // Distribute skills on sphere surface (Fibonacci spiral)
    const phi = Math.PI * (3 - Math.sqrt(5));
    skills.forEach((s, i) => {
      const y = 1 - (i / (skills.length - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;
      s._x = Math.cos(theta) * r;
      s._y = y;
      s._z = Math.sin(theta) * r;
    });

    let rotX = 0.3, rotY = 0, dragging = false, lastMX = 0, lastMY = 0;
    let hoveredSkill = null;
    const RADIUS = Math.min(W, H) * 0.34;

    // Info panel
    const panel = document.getElementById('skillInfoPanel');
    const sipIcon = document.getElementById('sipIcon');
    const sipName = document.getElementById('sipName');
    const sipLevel = document.getElementById('sipLevel');
    const sipDesc = document.getElementById('sipDesc');
    const sipBarFill = document.getElementById('sipBarFill');
    const sipPct = document.getElementById('sipPct');

    const skillDescs = {
      'HTML5': 'Semantic markup, accessibility, forms & SEO-friendly structure.',
      'CSS3': 'Grid, Flexbox, animations, variables, clip-path & responsive design.',
      'JavaScript': 'ES6+, DOM, async/await, fetch, event-driven patterns.',
      'Figma': 'UI design, prototyping, components & design systems.',
      'Git': 'Branching, PRs, GitHub workflows & collaborative coding.',
      'Responsive': 'Mobile-first breakpoints, fluid grids & touch optimization.',
      'REST APIs': 'Fetching, parsing JSON, OpenWeather, GitHub & currency APIs.',
      'C Lang': 'Fundamentals, pointers, memory management.',
      'GSAP': 'Timeline animations, ScrollTrigger, advanced motion.',
      'React': 'Learning — components, hooks, state management.',
      'Node.js': 'Learning — server-side JS, npm ecosystem.',
      'SEO': 'Core Web Vitals, meta tags, performance auditing.'
    };

    function project(x, y, z) {
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const y2 = y * cosX - z * sinX;
      const z2 = y * sinX + z * cosX;
      const x2 = x * cosY + z2 * sinY;
      const z3 = -x * sinY + z2 * cosY;
      const scale = (z3 + 2.5) / 3.5;
      return { sx: cx + x2 * RADIUS * scale, sy: cy + y2 * RADIUS * scale, scale, z: z3 };
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // Globe wireframe
      ctx.strokeStyle = 'rgba(200,255,0,0.04)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI;
        ctx.beginPath();
        for (let j = 0; j <= 60; j++) {
          const t = (j / 60) * Math.PI * 2;
          const x = Math.cos(a) * Math.cos(t + rotY);
          const y = Math.sin(a);
          const z = Math.cos(a) * Math.sin(t + rotY);
          const p = project(x, y, z);
          j === 0 ? ctx.moveTo(p.sx, p.sy) : ctx.lineTo(p.sx, p.sy);
        }
        ctx.stroke();
      }

      // Sort by Z for correct rendering order
      const projected = skills.map(s => {
        const p = project(s._x, s._y, s._z);
        return { ...s, ...p };
      }).sort((a, b) => a.z - b.z);

      projected.forEach(s => {
        const size = 18 * s.scale + 8;
        const alpha = 0.35 + s.scale * 0.65;
        const isHovered = hoveredSkill && hoveredSkill.name === s.name;

        ctx.globalAlpha = alpha;

        // Glow
        if (isHovered || s.scale > 0.88) {
          const grd = ctx.createRadialGradient(s.sx, s.sy, 0, s.sx, s.sy, size * 2.5);
          grd.addColorStop(0, s.color + '55');
          grd.addColorStop(1, 'transparent');
          ctx.fillStyle = grd;
          ctx.beginPath();
          ctx.arc(s.sx, s.sy, size * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Circle
        ctx.beginPath();
        ctx.arc(s.sx, s.sy, size, 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? s.color + 'cc' : 'rgba(10,10,20,0.7)';
        ctx.fill();
        ctx.strokeStyle = s.color + (isHovered ? 'ff' : '88');
        ctx.lineWidth = isHovered ? 1.5 : 0.8;
        ctx.stroke();

        // Icon text
        ctx.fillStyle = s.color;
        ctx.font = `bold ${Math.max(8, size * 0.65)}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(s.icon, s.sx, s.sy);

        ctx.globalAlpha = 1;
      });

      // Rotation
      if (!dragging) rotY += 0.004;
      requestAnimationFrame(draw);
    }
    draw();

    // Mouse interaction
    canvas.addEventListener('mousedown', e => { dragging = true; lastMX = e.clientX; lastMY = e.clientY; });
    window.addEventListener('mouseup', () => { dragging = false; });
    canvas.addEventListener('mousemove', e => {
      if (dragging) {
        rotY += (e.clientX - lastMX) * 0.008;
        rotX += (e.clientY - lastMY) * 0.008;
        lastMX = e.clientX; lastMY = e.clientY;
      }
      // Check hover
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left, my = e.clientY - rect.top;
      const projected = skills.map(s => { const p = project(s._x, s._y, s._z); return { ...s, ...p }; });
      hoveredSkill = null;
      projected.forEach(s => {
        const size = 18 * s.scale + 8;
        if (Math.hypot(mx - s.sx, my - s.sy) < size) hoveredSkill = s;
      });
      canvas.style.cursor = hoveredSkill ? 'pointer' : 'grab';

      if (hoveredSkill && panel) {
        if (sipIcon) sipIcon.textContent = hoveredSkill.icon;
        if (sipName) sipName.textContent = hoveredSkill.name;
        if (sipLevel) sipLevel.textContent = hoveredSkill.cat + ' · ' + hoveredSkill.level + '%';
        if (sipDesc) sipDesc.textContent = skillDescs[hoveredSkill.name] || '';
        if (sipBarFill) sipBarFill.style.width = hoveredSkill.level + '%';
        if (sipPct) sipPct.textContent = hoveredSkill.level + '%';
      }
    });

    // Touch support
    let lastTX = 0, lastTY = 0;
    canvas.addEventListener('touchstart', e => { lastTX = e.touches[0].clientX; lastTY = e.touches[0].clientY; }, { passive: true });
    canvas.addEventListener('touchmove', e => {
      e.preventDefault();
      rotY += (e.touches[0].clientX - lastTX) * 0.008;
      rotX += (e.touches[0].clientY - lastTY) * 0.008;
      lastTX = e.touches[0].clientX; lastTY = e.touches[0].clientY;
    }, { passive: false });
  }
})();

/* ══════════════════════════════════
   GRAVITY CANVAS — Physics Skill Planets
══════════════════════════════════ */
(function initGravCanvas() {
  const canvas = document.getElementById('gravCanvas');
  if (!canvas) return;

  const io = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    io.disconnect();
    buildGrav(canvas);
  }, { threshold: 0.1 });
  io.observe(canvas);

  function buildGrav(canvas) {
    const ctx = canvas.getContext('2d');
    let W, H;

    function resize() {
      const stage = canvas.closest('.gravity-stage') || canvas.parentElement;
      W = canvas.width = stage.clientWidth;
      H = canvas.height = stage.clientHeight;
    }
    resize();
    window.addEventListener('resize', () => { resize(); initBalls(); }, { passive: true });

    const SKILLS = [
      { name: 'HTML', color: '#e34c26', r: 32 }, { name: 'CSS', color: '#264de4', r: 30 },
      { name: 'JS', color: '#f0db4f', r: 36 }, { name: 'Figma', color: '#a259ff', r: 26 },
      { name: 'Git', color: '#f1502f', r: 24 }, { name: 'REST', color: '#ff6b00', r: 22 },
      { name: 'GSAP', color: '#ff8c42', r: 20 }, { name: 'React', color: '#ffd166', r: 24 },
      { name: 'CSS Grid', color: '#ffb347', r: 20 }, { name: 'SEO', color: '#ffd166', r: 18 },
      { name: 'C Lang', color: '#a8b9cc', r: 18 }, { name: 'Node', color: '#ff9f1c', r: 20 }
    ];

    let balls = [];
    let dragged = null, dragOffX = 0, dragOffY = 0;

    function initBalls() {
      balls = SKILLS.map((s, i) => ({
        ...s,
        x: s.r + Math.random() * (W - s.r * 2),
        y: s.r + Math.random() * (H * 0.6),
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2
      }));
    }
    initBalls();

    const GRAVITY = 0.25, DAMPING = 0.7, FRICTION = 0.99;

    function update() {
      balls.forEach(b => {
        if (b === dragged) return;
        b.vy += GRAVITY;
        b.vx *= FRICTION;
        b.vy *= FRICTION;
        b.x += b.vx;
        b.y += b.vy;

        if (b.x - b.r < 0) { b.x = b.r; b.vx *= -DAMPING; }
        if (b.x + b.r > W) { b.x = W - b.r; b.vx *= -DAMPING; }
        if (b.y - b.r < 0) { b.y = b.r; b.vy *= -DAMPING; }
        if (b.y + b.r > H) { b.y = H - b.r; b.vy *= -DAMPING; }
      });

      // Simple ball-ball collision
      for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
          const a = balls[i], bb = balls[j];
          const dx = bb.x - a.x, dy = bb.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = a.r + bb.r;
          if (dist < minDist && dist > 0) {
            const nx = dx / dist, ny = dy / dist;
            const overlap = (minDist - dist) / 2;
            a.x -= nx * overlap; a.y -= ny * overlap;
            bb.x += nx * overlap; bb.y += ny * overlap;
            const dv = (a.vx - bb.vx) * nx + (a.vy - bb.vy) * ny;
            if (dv > 0) {
              a.vx -= dv * nx; a.vy -= dv * ny;
              bb.vx += dv * nx; bb.vy += dv * ny;
            }
          }
        }
      }
    }

    function render() {
      ctx.clearRect(0, 0, W, H);
      balls.forEach(b => {
        // Shadow glow
        ctx.shadowColor = b.color;
        ctx.shadowBlur = 18;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        const grd = ctx.createRadialGradient(b.x - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.1, b.x, b.y, b.r);
        grd.addColorStop(0, b.color + 'cc');
        grd.addColorStop(1, b.color + '55');
        ctx.fillStyle = grd;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#fff';
        ctx.font = `bold ${Math.max(9, b.r * 0.44)}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(b.name, b.x, b.y);
      });
      update();
      requestAnimationFrame(render);
    }
    render();

    // Drag support
    function getPos(e) {
      const r = canvas.getBoundingClientRect();
      return e.touches
        ? { x: e.touches[0].clientX - r.left, y: e.touches[0].clientY - r.top }
        : { x: e.clientX - r.left, y: e.clientY - r.top };
    }
    function startDrag(e) {
      const { x, y } = getPos(e);
      dragged = balls.find(b => Math.hypot(b.x - x, b.y - y) < b.r) || null;
      if (dragged) { dragOffX = dragged.x - x; dragOffY = dragged.y - y; dragged.vx = 0; dragged.vy = 0; }
    }
    function moveDrag(e) {
      if (!dragged) return;
      e.preventDefault();
      const { x, y } = getPos(e);
      dragged.vx = (x + dragOffX - dragged.x) * 0.35;
      dragged.vy = (y + dragOffY - dragged.y) * 0.35;
      dragged.x = x + dragOffX;
      dragged.y = y + dragOffY;
    }
    function endDrag() { dragged = null; }

    canvas.addEventListener('mousedown', startDrag);
    canvas.addEventListener('touchstart', startDrag, { passive: true });
    window.addEventListener('mousemove', moveDrag);
    canvas.addEventListener('touchmove', moveDrag, { passive: false });
    window.addEventListener('mouseup', endDrag);
    window.addEventListener('touchend', endDrag);
  }
})();

/* ══════════════════════════════════
   STAR CATCHER MINI-GAME
══════════════════════════════════ */
(function initStarCatcher() {
  const arena = document.getElementById('sc-arena');
  if (!arena) return;

  let score = 0, bestScore = 0, lives = 3, gameActive = false;
  let starTimer, gameTimer, countTimer;
  const TIME_LIMIT = 30;
  let timeLeft = TIME_LIMIT;

  // Load best score from localStorage
  try { bestScore = parseInt(localStorage.getItem('vr-starcatcher-best') || '0', 10); } catch {}

  function getEl(id) { return arena.querySelector('#' + id) || document.getElementById(id); }

  function showOverlay(show) {
    const ov = getEl('sc-overlay');
    if (ov) ov.classList.toggle('sc-hidden', !show);
  }

  function updateScore(val) {
    score = val;
    const el = getEl('sc-score');
    if (el) el.textContent = score;
    if (score > bestScore) {
      bestScore = score;
      try { localStorage.setItem('vr-starcatcher-best', bestScore); } catch {}
      const bEl = getEl('sc-best');
      if (bEl) bEl.textContent = bestScore;
    }
  }

  function updateLives(val) {
    lives = val;
    const el = getEl('sc-lives');
    if (el) el.textContent = '❤️'.repeat(Math.max(0, lives));
    if (lives <= 0) endGame();
  }

  function spawnParticle(x, y) {
    for (let i = 0; i < 6; i++) {
      const p = document.createElement('div');
      p.className = 'sc-particle';
      p.style.cssText = `left:${x}px;top:${y}px;--tx:${(Math.random() - 0.5) * 80}px;--ty:${(Math.random() - 0.5) * 80}px`;
      p.textContent = ['⭐', '✨', '💫'][Math.floor(Math.random() * 3)];
      arena.appendChild(p);
      setTimeout(() => p.remove(), 800);
    }
  }

  function spawnStar() {
    if (!gameActive) return;
    const star = document.createElement('div');
    star.style.cssText = `
      position:absolute;
      width:clamp(36px,8vw,52px);
      height:clamp(36px,8vw,52px);
      display:flex;align-items:center;justify-content:center;
      font-size:clamp(22px,5vw,32px);
      cursor:pointer;
      z-index:5;
      animation:sc-catchpop 0.25s ease;
      left:${5 + Math.random() * 80}%;
      top:${10 + Math.random() * 75}%;
    `;
    star.textContent = Math.random() > 0.2 ? '⭐' : '💣';
    const isBomb = star.textContent === '💣';
    arena.appendChild(star);

    const duration = Math.max(900, 2200 - score * 28);
    let caught = false;

    star.addEventListener('click', () => {
      if (!gameActive || caught) return;
      caught = true;
      const rect = star.getBoundingClientRect();
      const aRect = arena.getBoundingClientRect();
      star.remove();
      if (isBomb) {
        updateLives(lives - 1);
        arena.style.animation = 'none';
        arena.offsetHeight;
        arena.style.animation = '';
      } else {
        spawnParticle(rect.left - aRect.left + 20, rect.top - aRect.top + 20);
        updateScore(score + 1);
      }
    });

    const timeout = setTimeout(() => {
      if (!caught && star.parentElement) {
        star.remove();
        if (!isBomb) updateLives(lives - 1);
      }
    }, duration);
    star._timeout = timeout;

    const nextDelay = Math.max(400, 1400 - score * 18);
    starTimer = setTimeout(spawnStar, nextDelay);
  }

  function startGame() {
    score = 0;
    lives = 3;
    timeLeft = TIME_LIMIT;
    gameActive = true;
    showOverlay(false);
    updateScore(0);
    updateLives(3);

    const timeEl = getEl('sc-time');
    if (timeEl) timeEl.textContent = timeLeft;

    spawnStar();

    gameTimer = setInterval(() => {
      timeLeft--;
      if (timeEl) timeEl.textContent = timeLeft;
      if (timeLeft <= 0) endGame();
    }, 1000);
  }

  function endGame() {
    gameActive = false;
    clearTimeout(starTimer);
    clearInterval(gameTimer);
    arena.querySelectorAll('[style*="position:absolute"]').forEach(el => {
      if (el.textContent === '⭐' || el.textContent === '💣') el.remove();
    });
    showOverlay(true);

    const finalEl = getEl('sc-final');
    if (finalEl) finalEl.textContent = score;

    if (score === bestScore && score > 0) {
      const nb = document.createElement('div');
      nb.className = 'sc-newbest';
      nb.textContent = '🏆 NEW BEST!';
      arena.appendChild(nb);
      setTimeout(() => nb.remove(), 2500);
    }
  }

  // Play button
  const playBtn = arena.querySelector('.sc-play-btn') || document.querySelector('.sc-play-btn');
  if (playBtn) playBtn.addEventListener('click', startGame);

  // Best score display
  const bEl = getEl('sc-best');
  if (bEl) bEl.textContent = bestScore;
})();

/* ══════════════════════════════════
   LEGEND ITEM CLICK — highlight globe skill
══════════════════════════════════ */
(function initLegendClick() {
  document.querySelectorAll('.legend-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.legend-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });
})();
﻿/* ============================================================
   GSAP WAYPOINTS + 3D CHARACTER + LAZY LOADING — ADD-ON
   Paste this entire block at the BOTTOM of your script.js
   (after the last line of the Star Catcher game section)
============================================================ */

/* ══════════════════════════════════
   LAZY LOADING — Images & Iframes
══════════════════════════════════ */
(function initLazyLoad() {
  // Native lazy for all images without it
  document.querySelectorAll('img:not([loading])').forEach(img => {
    img.setAttribute('loading', 'lazy');
    img.setAttribute('decoding', 'async');
  });

  // Lazy load heavy sections (skills globe, gravity canvas) — defer canvas init until in view
  const deferredCanvases = ['skillsGlobe', 'gravCanvas'];
  deferredCanvases.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.dataset.lazyCanvas = 'true';
  });

  // Lazy iframe observer (preview modal iframes — already handled, skip)
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      if (el.dataset.src) {
        el.src = el.dataset.src;
        delete el.dataset.src;
      }
      if (el.dataset.bgSrc) {
        el.style.backgroundImage = `url(${el.dataset.bgSrc})`;
        delete el.dataset.bgSrc;
      }
      imgObserver.unobserve(el);
    });
  }, { rootMargin: '200px 0px' });

  document.querySelectorAll('[data-src], [data-bg-src]').forEach(el => imgObserver.observe(el));

  // Defer non-critical font loading
  if ('fonts' in document) {
    document.fonts.ready.then(() => {
      document.documentElement.classList.add('fonts-loaded');
    });
  }
})();

/* ══════════════════════════════════
   3D DESK CHARACTER (Three.js)
   Placed in the About section
══════════════════════════════════ */
(function init3DCharacter() {
  // Create mount point inside about section
  const aboutSection = document.getElementById('about');
  if (!aboutSection) return;

  const wrap = document.createElement('div');
  wrap.id = 'desk3dWrap';
  wrap.setAttribute('aria-hidden', 'true');
  wrap.style.cssText = `
    position:absolute;
    bottom:0;
    right:clamp(16px,6vw,80px);
    width:clamp(140px,22vw,280px);
    height:clamp(180px,28vw,360px);
    pointer-events:none;
    z-index:3;
    overflow:hidden;
  `;
  aboutSection.style.position = 'relative';
  aboutSection.appendChild(wrap);

  const canvas3d = document.createElement('canvas');
  canvas3d.id = 'deskCharCanvas';
  canvas3d.style.cssText = 'width:100%;height:100%;display:block;';
  wrap.appendChild(canvas3d);

  // Load Three.js (may already be loaded by globe — reuse)
  function buildCharacter() {
    if (typeof THREE === 'undefined') return;
    const W = wrap.clientWidth, H = wrap.clientHeight;
    const renderer = new THREE.WebGLRenderer({ canvas: canvas3d, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.set(0, 2.2, 5.5);
    camera.lookAt(0, 1.0, 0);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const keyLight = new THREE.DirectionalLight(0xff6b00, 0.9);
    keyLight.position.set(3, 5, 4);
    keyLight.castShadow = true;
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0xffb347, 0.4);
    fillLight.position.set(-3, 3, 2);
    scene.add(fillLight);
    const rimLight = new THREE.DirectionalLight(0xe63946, 0.3);
    rimLight.position.set(0, 1, -3);
    scene.add(rimLight);

    // Helper: rounded box
    function rBox(w, h, d, r, segs) {
      r = Math.min(r, w / 2.1, h / 2.1, d / 2.1);
      const shape = new THREE.Shape();
      shape.absarc(w / 2 - r, h / 2 - r, r, 0, Math.PI / 2);
      shape.absarc(-w / 2 + r, h / 2 - r, r, Math.PI / 2, Math.PI);
      shape.absarc(-w / 2 + r, -h / 2 + r, r, Math.PI, Math.PI * 1.5);
      shape.absarc(w / 2 - r, -h / 2 + r, r, Math.PI * 1.5, Math.PI * 2);
      const extrudeSettings = { depth: d, bevelEnabled: true, bevelSize: r, bevelThickness: r, bevelSegments: segs || 2, extrudePath: undefined };
      const geo = new THREE.ExtrudeGeometry(shape, { depth: d - r * 2, bevelEnabled: true, bevelSize: r, bevelThickness: r, bevelSegments: segs || 2 });
      geo.center();
      return geo;
    }

    // Materials
    const matSkin = new THREE.MeshStandardMaterial({ color: 0xf5c9a0, roughness: 0.7, metalness: 0.0 });
    const matShirt = new THREE.MeshStandardMaterial({ color: 0x1a1a2e, roughness: 0.6, metalness: 0.1 });
    const matPants = new THREE.MeshStandardMaterial({ color: 0x0f0f1f, roughness: 0.8, metalness: 0.0 });
    const matDesk = new THREE.MeshStandardMaterial({ color: 0x2a1a0a, roughness: 0.4, metalness: 0.15 });
    const matScreen = new THREE.MeshStandardMaterial({ color: 0x05050a, roughness: 0.1, metalness: 0.5 });
    const matGlowScreen = new THREE.MeshStandardMaterial({ color: 0xff6b00, roughness: 0.0, metalness: 0.0, emissive: 0xff6b00, emissiveIntensity: 0.6 });
    const matChair = new THREE.MeshStandardMaterial({ color: 0x111118, roughness: 0.7, metalness: 0.3 });
    const matMetal = new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.2, metalness: 0.9 });
    const matHair = new THREE.MeshStandardMaterial({ color: 0x1a0a00, roughness: 0.8 });
    const matGlass = new THREE.MeshStandardMaterial({ color: 0xaaddff, roughness: 0.05, metalness: 0.0, transparent: true, opacity: 0.35 });
    const matMug = new THREE.MeshStandardMaterial({ color: 0xff6b00, roughness: 0.5, metalness: 0.1 });

    const root = new THREE.Group();
    scene.add(root);

    /* ── DESK ── */
    const desk = new THREE.Group();
    // Tabletop
    const topGeo = new THREE.BoxGeometry(3.2, 0.12, 1.6);
    const top = new THREE.Mesh(topGeo, matDesk);
    top.position.set(0, 0, 0);
    top.castShadow = true;
    desk.add(top);
    // Legs
    [[1.4, -0.5, 0.65], [-1.4, -0.5, 0.65], [1.4, -0.5, -0.65], [-1.4, -0.5, -0.65]].forEach(([x, y, z]) => {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.0, 8), matMetal);
      leg.position.set(x, y, z);
      leg.castShadow = true;
      desk.add(leg);
    });
    desk.position.set(0, 0.5, 0.4);
    root.add(desk);

    /* ── MONITOR ── */
    const monitor = new THREE.Group();
    // Stand base
    const standBase = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.26, 0.04, 16), matMetal);
    standBase.position.set(0, 0.07, 0);
    monitor.add(standBase);
    // Stand pole
    const standPole = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.38, 8), matMetal);
    standPole.position.set(0, 0.27, 0);
    monitor.add(standPole);
    // Monitor body
    const monBody = new THREE.Mesh(new THREE.BoxGeometry(1.7, 1.0, 0.07), matScreen);
    monBody.position.set(0, 0.8, 0);
    monBody.castShadow = true;
    monitor.add(monBody);
    // Screen glow (orange warm feel)
    const screenGeo = new THREE.PlaneGeometry(1.54, 0.86);
    const screen = new THREE.Mesh(screenGeo, matGlowScreen);
    screen.position.set(0, 0.8, 0.042);
    monitor.add(screen);
    // Code lines on screen
    const codeMat = new THREE.MeshBasicMaterial({ color: 0x001100, transparent: true, opacity: 0.55 });
    [0.24, 0.12, 0.0, -0.12, -0.24].forEach((y, i) => {
      const w = [0.8, 1.1, 0.6, 0.9, 0.7][i];
      const bar = new THREE.Mesh(new THREE.PlaneGeometry(w, 0.045), codeMat);
      bar.position.set(-0.3, 0.8 + y, 0.044);
      monitor.add(bar);
    });
    // Bezel
    const bezel = new THREE.Mesh(new THREE.BoxGeometry(1.78, 1.08, 0.05), matChair);
    bezel.position.set(0, 0.8, -0.005);
    monitor.add(bezel);
    monitor.position.set(-0.05, 0.12, -0.45);
    desk.add(monitor);

    /* ── KEYBOARD ── */
    const kb = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.04, 0.28), matChair);
    kb.position.set(-0.1, 0.075, 0.2);
    desk.add(kb);
    // Key grid
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 10; c++) {
        const key = new THREE.Mesh(new THREE.BoxGeometry(0.062, 0.018, 0.062), new THREE.MeshStandardMaterial({ color: 0x222230, roughness: 0.4 }));
        key.position.set(-0.1 - 0.34 + c * 0.075, 0.097, 0.2 - 0.08 + r * 0.085);
        desk.add(key);
      }
    }

    /* ── MUG ── */
    const mugGeo = new THREE.CylinderGeometry(0.095, 0.08, 0.2, 12);
    const mug = new THREE.Mesh(mugGeo, matMug);
    mug.position.set(1.0, 0.1, 0.3);
    desk.add(mug);
    // Mug inner (darker)
    const mugInner = new THREE.Mesh(new THREE.CylinderGeometry(0.078, 0.078, 0.15, 12), new THREE.MeshStandardMaterial({ color: 0x050510, roughness: 1.0 }));
    mugInner.position.set(1.0, 0.13, 0.3);
    desk.add(mugInner);

    /* ── CHAIR ── */
    const chair = new THREE.Group();
    // Seat
    const seat = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.1, 0.9), matChair);
    seat.position.set(0, 0, 0);
    chair.add(seat);
    // Back
    const back = new THREE.Mesh(new THREE.BoxGeometry(0.96, 0.9, 0.1), matChair);
    back.position.set(0, 0.5, -0.45);
    back.rotation.x = -0.15;
    chair.add(back);
    // Backrest support
    const bSupport = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.5, 0.08), matMetal);
    bSupport.position.set(0, 0.3, -0.38);
    chair.add(bSupport);
    // Arm rests
    [-0.52, 0.52].forEach(x => {
      const arm = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.06, 0.55), matChair);
      arm.position.set(x, 0.28, 0.05);
      chair.add(arm);
      const armPole = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.28, 8), matMetal);
      armPole.position.set(x, 0.14, 0.05);
      chair.add(armPole);
    });
    // Gas cylinder
    const gas = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.55, 8), matMetal);
    gas.position.set(0, -0.3, 0);
    chair.add(gas);
    // Star base with wheels
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      const spoke = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.52, 6), matMetal);
      spoke.position.set(Math.cos(a) * 0.26, -0.57, Math.sin(a) * 0.26);
      spoke.rotation.y = a;
      spoke.rotation.z = Math.PI / 2; /* FIX: removed duplicate first assignment that was overwritten */
      chair.add(spoke);
      const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.06, 8), new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.5 }));
      wheel.position.set(Math.cos(a) * 0.52, -0.63, Math.sin(a) * 0.52);
      wheel.rotation.z = Math.PI / 2;
      chair.add(wheel);
    }
    chair.position.set(0.15, -0.42, 1.05);
    root.add(chair);

    /* ── PERSON ── */
    const person = new THREE.Group();

    // Torso
    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.6, 0.3), matShirt);
    torso.position.set(0, 0.3, 0);
    torso.castShadow = true;
    person.add(torso);

    // Neck
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.14, 8), matSkin);
    neck.position.set(0, 0.67, 0);
    person.add(neck);

    // Head
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.38, 0.34), matSkin);
    head.position.set(0, 0.93, 0.02);
    head.castShadow = true;
    person.add(head);

    // Hair
    const hair = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.18, 0.36), matHair);
    hair.position.set(0, 1.1, 0.0);
    person.add(hair);
    // Hair front lock
    const hairFront = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.1, 0.14), matHair);
    hairFront.position.set(0, 1.05, 0.17);
    hairFront.rotation.x = -0.3;
    person.add(hairFront);

    // Ears
    [-0.21, 0.21].forEach(x => {
      const ear = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.09, 0.08), matSkin);
      ear.position.set(x, 0.92, 0.02);
      person.add(ear);
    });

    // Eyes
    [[-0.1, 0.96, 0.18], [0.1, 0.96, 0.18]].forEach(([x, y, z]) => {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.032, 6, 6), new THREE.MeshStandardMaterial({ color: 0x111122, roughness: 0.1 }));
      eye.position.set(x, y, z);
      person.add(eye);
      const eyeShine = new THREE.Mesh(new THREE.SphereGeometry(0.01, 4, 4), new THREE.MeshBasicMaterial({ color: 0xffffff }));
      eyeShine.position.set(x + 0.01, y + 0.01, z + 0.025);
      person.add(eyeShine);
    });

    // Glasses
    const glassMat = new THREE.MeshStandardMaterial({ color: 0xff6b00, roughness: 0.2, metalness: 0.8 });
    [-0.1, 0.1].forEach(x => {
      const frame = new THREE.Mesh(new THREE.TorusGeometry(0.065, 0.012, 6, 16), glassMat);
      frame.position.set(x, 0.96, 0.175);
      frame.rotation.x = Math.PI / 2;
      person.add(frame);
      const lens = new THREE.Mesh(new THREE.CircleGeometry(0.058, 16), matGlass);
      lens.position.set(x, 0.96, 0.178);
      person.add(lens);
    });
    // Bridge
    const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.012, 0.012), glassMat);
    bridge.position.set(0, 0.96, 0.178);
    person.add(bridge);

    // Smile
    const smileCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-0.07, 0.875, 0.19),
      new THREE.Vector3(0, 0.86, 0.192),
      new THREE.Vector3(0.07, 0.875, 0.19)
    );
    const smilePoints = smileCurve.getPoints(10);
    const smileGeo = new THREE.BufferGeometry().setFromPoints(smilePoints);
    const smile = new THREE.Line(smileGeo, new THREE.LineBasicMaterial({ color: 0x884422, linewidth: 1 }));
    person.add(smile);

    // Arms
    // Upper arms
    [[-0.34, 0.34, 0, -0.5], [0.34, 0.34, 0, 0.5]].forEach(([x, y, z, rot]) => {
      const uArm = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.065, 0.36, 8), matShirt);
      uArm.position.set(x, y, z);
      uArm.rotation.z = rot;
      person.add(uArm);
    });

    // Left forearm (resting on desk, pointing forward)
    const lForearm = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.05, 0.34, 8), matSkin);
    lForearm.position.set(-0.38, 0.12, 0.32);
    lForearm.rotation.x = Math.PI / 2;
    lForearm.rotation.z = 0.2;
    person.add(lForearm);
    // Left hand on keyboard
    const lHand = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.055, 0.12), matSkin);
    lHand.position.set(-0.32, 0.1, 0.5);
    person.add(lHand);

    // Right forearm
    const rForearm = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.05, 0.3, 8), matSkin);
    rForearm.position.set(0.34, 0.14, 0.28);
    rForearm.rotation.x = 1.4;
    rForearm.rotation.z = -0.25;
    person.add(rForearm);
    // Right hand on mouse
    const rHand = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.055, 0.12), matSkin);
    rHand.position.set(0.44, 0.1, 0.48);
    person.add(rHand);

    // Mouse
    const mouseMesh = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.045, 0.155), new THREE.MeshStandardMaterial({ color: 0x222230, roughness: 0.4, metalness: 0.3 }));
    mouseMesh.position.set(0.55, 0.075, 0.38);
    desk.add(mouseMesh);

    // Legs/pants
    [[-0.15, -0.42, 0], [0.15, -0.42, 0]].forEach(([x, y, z]) => {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.09, 0.6, 8), matPants);
      leg.position.set(x, y, z);
      person.add(leg);
    });
    // Feet
    [[-0.15, -0.74, 0.14], [0.15, -0.74, 0.14]].forEach(([x, y, z]) => {
      const foot = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.24), new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.7 }));
      foot.position.set(x, y, z);
      person.add(foot);
    });

    person.position.set(0.1, 0.58, 0.82);
    root.add(person);

    /* ── AMBIENT PARTICLES around monitor ── */
    const pCount = 12;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 1.2;
      pPos[i * 3 + 1] = Math.random() * 0.8 + 0.3;
      pPos[i * 3 + 2] = -0.6 + Math.random() * 0.2;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMesh = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0xff6b00, size: 0.025, transparent: true, opacity: 0.7 }));
    desk.add(pMesh);

    /* ── FLOOR SHADOW PLANE ── */
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(6, 4),
      new THREE.ShadowMaterial({ opacity: 0.25 })
    );
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -1.05;
    plane.receiveShadow = true;
    root.add(plane);

    root.position.set(0, -0.5, 0);
    root.rotation.y = -0.3;

    // Resize handler
    const ro = new ResizeObserver(() => {
      const w = wrap.clientWidth, h = wrap.clientHeight;
      if (w < 10 || h < 10) return;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    });
    ro.observe(wrap);

    // Animation: gentle bob + typing fingers
    let frame = 0;
    let headBobTarget = 0, headBob = 0;
    let screenBlink = 0;

    function animate() {
      requestAnimationFrame(animate);
      frame++;

      // Head subtle nod (thinking)
      headBobTarget = Math.sin(frame * 0.018) * 0.04;
      headBob += (headBobTarget - headBob) * 0.04;
      head.rotation.x = headBob + Math.sin(frame * 0.009) * 0.015;
      head.rotation.y = Math.sin(frame * 0.012) * 0.06;
      neck.rotation.x = headBob * 0.5;
      hair.rotation.x = head.rotation.x;
      hair.rotation.y = head.rotation.y;

      // Tiny breathing torso
      torso.scale.y = 1 + Math.sin(frame * 0.025) * 0.012;

      // Fingers typing (subtle hand Z position oscillation)
      lHand.position.z = 0.5 + Math.abs(Math.sin(frame * 0.22)) * 0.025;
      rHand.position.z = 0.48 + Math.abs(Math.sin(frame * 0.19 + 0.8)) * 0.02;

      // Monitor screen emissive pulse (like code compiling)
      screenBlink = Math.sin(frame * 0.03);
      matGlowScreen.emissiveIntensity = 0.45 + screenBlink * 0.2;

      // Mug gentle rotation
      mug.rotation.y = frame * 0.008;

      // Particle float
      const pPositions = pGeo.attributes.position.array;
      for (let i = 0; i < pCount; i++) {
        pPositions[i * 3 + 1] += 0.002;
        if (pPositions[i * 3 + 1] > 1.1) pPositions[i * 3 + 1] = 0.3;
      }
      pGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    }

    // Only animate when in view (performance)
    const charObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        animate();
        charObserver.disconnect();
      }
    }, { threshold: 0.1 });
    charObserver.observe(wrap);
  }

  // Load Three.js immediately if not already present (don't wait 60 polling cycles = 12 seconds)
  function ensureThreeJS(cb) {
    if (typeof THREE !== 'undefined') {
      cb();
      return;
    }
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    s.onload = cb;
    s.onerror = () => console.warn('Three.js failed to load — 3D character unavailable.');
    document.head.appendChild(s);
  }

  ensureThreeJS(buildCharacter);

/* ══════════════════════════════════
   GSAP SCROLLTRIGGER WAYPOINTS
   Fixed: waits for full page load,
   prevents scroll-jacking, every
   waypoint uses ScrollTrigger so
   nothing fires before its section
   enters the viewport.
══════════════════════════════════ */
(function initGSAP() {

  // FIX 1: Only start after full page load + 50ms settle time.
  // This prevents GSAP from running while the loader overlay is
  // still visible, which caused ScrollTrigger to measure layout
  // at position 0 and misfire all waypoints at once.
  function whenReady(cb) {
    if (document.readyState === 'complete') {
      setTimeout(cb, 50);
    } else {
      window.addEventListener('load', () => setTimeout(cb, 50), { once: true });
    }
  }

  // FIX 2: Skip re-injecting a script that is already loaded.
  function loadScript(src, cb) {
    if (document.querySelector('script[src="' + src + '"]')) { cb(); return; }
    const s = document.createElement('script');
    s.src = src;
    s.onload = cb;
    s.onerror = () => console.warn('GSAP load failed:', src);
    document.head.appendChild(s);
  }

  whenReady(() => {
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js', () => {
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js', initAnimations);
    });
  });

  function initAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    // Respect reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // FIX 3: Refresh after registration so trigger positions are
    // calculated against the actual current scroll position.
    ScrollTrigger.refresh();

    /* ─── WAYPOINT 1: HERO TITLE LETTERS ─── */
    // FIX 4: Use ScrollTrigger instead of a bare delay so letters
    // only animate when the hero is actually in view (not on every
    // page load regardless of scroll position).
    ScrollTrigger.create({
      trigger: '.hero-title',
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.fromTo('.hero-title .ht-letter', {
          opacity: 0, y: 60, rotateX: -80,
          transformOrigin: 'bottom center'
        }, {
          opacity: 1, y: 0, rotateX: 0,
          stagger: { amount: 0.7, from: 'start' },
          ease: 'back.out(1.4)',
          duration: 0.7,
          clearProps: 'all'
        });
      }
    });

    /* ─── WAYPOINT 2: HERO STATS ─── */
    // FIX 5: Same fix — wrapped in ScrollTrigger.
    ScrollTrigger.create({
      trigger: '.hero-stats',
      start: 'top 95%',
      once: true,
      onEnter: () => {
        gsap.fromTo('.stat-item', {
          opacity: 0, y: 40, scaleY: 0.4
        }, {
          opacity: 1, y: 0, scaleY: 1,
          stagger: 0.12,
          ease: 'power3.out',
          duration: 0.6
        });
      }
    });

    /* ─── WAYPOINT 3: MARQUEE ITEMS FLASH-IN ─── */
    ScrollTrigger.create({
      trigger: '.marquee-wrap',
      start: 'top 90%',
      onEnter: () => {
        gsap.fromTo('.m-item', {
          opacity: 0,
          scaleX: 0
        }, {
          opacity: 1,
          scaleX: 1,
          stagger: 0.04,
          ease: 'power2.out',
          duration: 0.35
        });
      },
      once: true
    });

    /* ─── WAYPOINT 4: ABOUT SECTION — SPLIT SLIDE ─── */
    ScrollTrigger.create({
      trigger: '#about',
      start: 'top 75%',
      onEnter: () => {
        // Body slides from left
        gsap.fromTo('.about-body', {
          opacity: 0,
          x: -80,
          clipPath: 'inset(0 100% 0 0)'
        }, {
          opacity: 1,
          x: 0,
          clipPath: 'inset(0 0% 0 0)',
          ease: 'power3.out',
          duration: 0.9
        });
        // ID card slides from right + flip
        gsap.fromTo('.id-card', {
          opacity: 0,
          x: 80,
          rotateY: 25
        }, {
          opacity: 1,
          x: 0,
          rotateY: 0,
          ease: 'power3.out',
          duration: 1.0,
          delay: 0.2
        });
        // Tech pills pop in
        gsap.fromTo('.pill', {
          opacity: 0,
          scale: 0.4,
          y: 20
        }, {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.06,
          ease: 'back.out(2)',
          duration: 0.5,
          delay: 0.5
        });
      },
      once: true
    });

    /* ─── WAYPOINT 5: SERVICE CARDS STAGGERED CASCADE ─── */
    ScrollTrigger.create({
      trigger: '#services',
      start: 'top 70%',
      onEnter: () => {
        gsap.fromTo('.service-card', {
          opacity: 0,
          y: 60,
          scale: 0.88,
          rotateX: 15
        }, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          stagger: {
            amount: 0.8,
            grid: 'auto',
            from: 'center'
          },
          ease: 'power3.out',
          duration: 0.7,
          transformOrigin: 'top center'
        });
      },
      once: true
    });

    /* ─── WAYPOINT 6: SKILLS GLOBE REVEAL ─── */
    ScrollTrigger.create({
      trigger: '#skills',
      start: 'top 70%',
      onEnter: () => {
        gsap.fromTo('.globe-container', {
          opacity: 0,
          scale: 0.4,
          rotation: -15
        }, {
          opacity: 1,
          scale: 1,
          rotation: 0,
          ease: 'elastic.out(1, 0.6)',
          duration: 1.4
        });
        gsap.fromTo('.skills-info-panel', {
          opacity: 0,
          x: 50
        }, {
          opacity: 1,
          x: 0,
          ease: 'power3.out',
          duration: 0.8,
          delay: 0.4
        });
        // Legend items stagger
        gsap.fromTo('.legend-item', {
          opacity: 0,
          x: 30
        }, {
          opacity: 1,
          x: 0,
          stagger: 0.08,
          ease: 'power2.out',
          duration: 0.4,
          delay: 0.6
        });
      },
      once: true
    });

    /* ─── WAYPOINT 7: PROJECT CARDS FLIP-IN ─── */
    ScrollTrigger.create({
      trigger: '#projects',
      start: 'top 65%',
      onEnter: () => {
        gsap.fromTo('.proj-card', {
          opacity: 0,
          y: 80,
          rotateY: -20,
          transformPerspective: 800
        }, {
          opacity: 1,
          y: 0,
          rotateY: 0,
          stagger: {
            amount: 1.0,
            grid: 'auto',
            from: 'start'
          },
          ease: 'power3.out',
          duration: 0.75
        });
      },
      once: true
    });

    /* ─── WAYPOINT 8: PROCESS STEPS — TIMELINE DRAW ─── */
    ScrollTrigger.create({
      trigger: '#process',
      start: 'top 70%',
      onEnter: () => {
        const tl = gsap.timeline();
        tl.fromTo('.process-step', {
          opacity: 0,
          y: 50,
          scale: 0.85
        }, {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.18,
          ease: 'back.out(1.5)',
          duration: 0.65
        });
        tl.fromTo('.step-icon', {
          scale: 0,
          rotation: -180
        }, {
          scale: 1,
          rotation: 0,
          stagger: 0.18,
          ease: 'back.out(2)',
          duration: 0.6
        }, '<0.15');
      },
      once: true
    });

    /* ─── WAYPOINT 9: GRAVITY SKILLS CANVAS — PLANETS DROP ─── */
    ScrollTrigger.create({
      trigger: '#skills2',
      start: 'top 70%',
      onEnter: () => {
        gsap.fromTo('.sk-strip-item', {
          opacity: 0,
          y: 30
        }, {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          ease: 'power3.out',
          duration: 0.5,
          delay: 0.4
        });
        gsap.fromTo('.gravity-badge', {
          opacity: 0,
          scale: 0.5
        }, {
          opacity: 1,
          scale: 1,
          ease: 'back.out(2)',
          duration: 0.6
        });
        // Heading words
        gsap.fromTo('.sk-title', {
          opacity: 0,
          y: 40,
          skewY: 4
        }, {
          opacity: 1,
          y: 0,
          skewY: 0,
          ease: 'power3.out',
          duration: 0.75
        });
      },
      once: true
    });

    /* ─── WAYPOINT 10: TIMELINE ITEMS — DRAW LINE + SLIDE ─── */
    ScrollTrigger.create({
      trigger: '#experience',
      start: 'top 70%',
      onEnter: () => {
        // The timeline line draws itself
        gsap.fromTo('.timeline-line', {
          scaleY: 0,
          transformOrigin: 'top center'
        }, {
          scaleY: 1,
          ease: 'power2.inOut',
          duration: 1.5
        });
        // Cards alternate left/right
        gsap.fromTo('.timeline-card', {
          opacity: 0,
          x: (i) => i % 2 === 0 ? -60 : 60,
          y: 20
        }, {
          opacity: 1,
          x: 0,
          y: 0,
          stagger: 0.2,
          ease: 'power3.out',
          duration: 0.7,
          delay: 0.3
        });
        gsap.fromTo('.timeline-dot', {
          scale: 0,
          rotation: 360
        }, {
          scale: 1,
          rotation: 0,
          stagger: 0.2,
          ease: 'back.out(2)',
          duration: 0.55,
          delay: 0.5
        });
      },
      once: true
    });

    /* ─── WAYPOINT 11: BENTO GRID — MASONRY POP ─── */
    ScrollTrigger.create({
      trigger: '#overview',
      start: 'top 65%',
      onEnter: () => {
        const bentoOrder = ['.bc-hero', '.bc-quote', '.bc-stats', '.bc-stack', '.bc-avail', '.bc-proj', '.bc-cta'];
        bentoOrder.forEach((sel, i) => {
          const el = document.querySelector(sel);
          if (!el) return;
          gsap.fromTo(el, {
            opacity: 0,
            y: 50 + i * 5,
            scale: 0.9
          }, {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: 'power3.out',
            duration: 0.7,
            delay: i * 0.1
          });
        });
      },
      once: true
    });

    /* ─── WAYPOINT 12: PRICING CARDS — SCALE UP WITH POPULAR BOUNCE ─── */
    ScrollTrigger.create({
      trigger: '#pricing',
      start: 'top 70%',
      onEnter: () => {
        gsap.fromTo('.pricing-card:not(.pricing-popular)', {
          opacity: 0,
          y: 60,
          scale: 0.9
        }, {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.2,
          ease: 'power3.out',
          duration: 0.7
        });
        gsap.fromTo('.pricing-popular', {
          opacity: 0,
          y: 40,
          scale: 0.75
        }, {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: 'elastic.out(1.2, 0.5)',
          duration: 1.1,
          delay: 0.2
        });
      },
      once: true
    });

    /* ─── WAYPOINT 13: CTA BANNER — TEXT CURTAIN REVEAL ─── */
    ScrollTrigger.create({
      trigger: '.cta-banner',
      start: 'top 75%',
      onEnter: () => {
        const tl = gsap.timeline();
        tl.fromTo('.cta-banner-eyebrow', {
          opacity: 0,
          x: -40
        }, {
          opacity: 1,
          x: 0,
          ease: 'power2.out',
          duration: 0.5
        });
        tl.fromTo('.cta-banner-title', {
          opacity: 0,
          y: 50,
          clipPath: 'inset(0 0 100% 0)'
        }, {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0 0 0% 0)',
          ease: 'power3.out',
          duration: 0.8
        }, '-=0.2');
        tl.fromTo('.cta-banner-sub', {
          opacity: 0,
          y: 20
        }, {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          duration: 0.6
        }, '-=0.4');
        tl.fromTo('.cta-banner-btns', {
          opacity: 0,
          scale: 0.85
        }, {
          opacity: 1,
          scale: 1,
          ease: 'back.out(1.5)',
          duration: 0.5
        }, '-=0.3');
      },
      once: true
    });

    /* ─── WAYPOINT 14: TESTIMONIALS — CAROUSEL ITEMS SWING IN ─── */
    ScrollTrigger.create({
      trigger: '#testimonials',
      start: 'top 70%',
      onEnter: () => {
        gsap.fromTo('.testi-card', {
          opacity: 0,
          y: 70,
          rotateX: 30,
          transformPerspective: 600
        }, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.15,
          ease: 'power3.out',
          duration: 0.75
        });
      },
      once: true
    });

    /* ─── WAYPOINT 15: CONTACT — HEADLINE CHARACTER SPLIT ─── */
    ScrollTrigger.create({
      trigger: '#contact',
      start: 'top 70%',
      onEnter: () => {
        const headline = document.querySelector('.contact-headline');
        if (headline) {
          gsap.fromTo(headline, {
            opacity: 0,
            x: -100,
            skewX: 10
          }, {
            opacity: 1,
            x: 0,
            skewX: 0,
            ease: 'power3.out',
            duration: 0.9
          });
        }
        gsap.fromTo('.contact-items .ci', {
          opacity: 0,
          x: -40
        }, {
          opacity: 1,
          x: 0,
          stagger: 0.12,
          ease: 'power2.out',
          duration: 0.55,
          delay: 0.3
        });
        gsap.fromTo('.form-card', {
          opacity: 0,
          y: 50,
          rotateY: -10
        }, {
          opacity: 1,
          y: 0,
          rotateY: 0,
          ease: 'power3.out',
          duration: 0.9,
          delay: 0.2
        });
      },
      once: true
    });

    /* ─── WAYPOINT 16: FOOTER — FADE UP WITH LOGO SPIN ─── */
    ScrollTrigger.create({
      trigger: 'footer',
      start: 'top 90%',
      onEnter: () => {
        gsap.fromTo('.foot-logo', {
          opacity: 0,
          rotation: -20,
          scale: 0.5
        }, {
          opacity: 1,
          rotation: 0,
          scale: 1,
          ease: 'back.out(2)',
          duration: 0.7
        });
        gsap.fromTo('.foot-copy', {
          opacity: 0,
          y: 20
        }, {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          duration: 0.5,
          delay: 0.2
        });
        gsap.fromTo('.foot-link', {
          opacity: 0,
          y: 15
        }, {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          ease: 'power2.out',
          duration: 0.4,
          delay: 0.3
        });
      },
      once: true
    });

    /* ─── CONTINUOUS: PARALLAX HORIZONTAL SCROLL ON CASE STUDY ─── */
    gsap.to('.cs-badge', {
      x: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: '#casestudy',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5
      }
    });

    /* ─── CONTINUOUS: BLOG CARDS SUBTLE PARALLAX ─── */
    document.querySelectorAll('.blog-card').forEach((card, i) => {
      gsap.fromTo(card, { y: 40 + i * 15 }, {
        y: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '#blog',
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 2
        }
      });
    });

    /* ─── CONTINUOUS: FAQ LINE DRAW ─── */
    ScrollTrigger.create({
      trigger: '#faq',
      start: 'top 70%',
      onEnter: () => {
        gsap.fromTo('.faq-item', {
          opacity: 0,
          x: 50
        }, {
          opacity: 1,
          x: 0,
          stagger: 0.12,
          ease: 'power3.out',
          duration: 0.55
        });
      },
      once: true
    });

    /* ─── SECTION EYEBROWS — UNDERLINE DRAW ─── */
    ScrollTrigger.batch('.sec-eyebrow', {
      onEnter: (batch) => {
        gsap.fromTo(batch, {
          opacity: 0,
          x: -30
        }, {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          ease: 'power2.out',
          duration: 0.5
        });
      },
      once: true,
      start: 'top 85%'
    });

    /* ─── DESK CHARACTER POP-IN ─── */
    ScrollTrigger.create({
      trigger: '#about',
      start: 'top 70%',
      onEnter: () => {
        const charWrap = document.getElementById('desk3dWrap');
        if (!charWrap) return;
        gsap.fromTo(charWrap, {
          opacity: 0,
          y: 60,
          scale: 0.7,
          rotation: -8
        }, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          ease: 'elastic.out(1, 0.6)',
          duration: 1.5,
          delay: 0.6
        });
      },
      once: true
    });

    /* ─── HOVER MAGNETIC FOLLOW ENHANCEMENT (GSAP version) ─── */
    if (!window.matchMedia('(hover: none)').matches) {
      document.querySelectorAll('.btn-lime, .btn-outline').forEach(btn => {
        btn.addEventListener('mouseenter', function (e) {
          gsap.to(this, { scale: 1.06, duration: 0.25, ease: 'power2.out' });
        });
        btn.addEventListener('mouseleave', function () {
          gsap.to(this, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.5)' });
        });
      });
    }

    // FIX: Double-refresh — once when fonts load, once 200ms
    // later to catch any late layout shifts (images, lazy fonts).
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
      setTimeout(() => ScrollTrigger.refresh(), 200);
    });
  }
})();

/* ══════════════════════════════════
   PERFORMANCE: Pause animations
   when tab is hidden
══════════════════════════════════ */
/* ══════════════════════════════════
   CONTACT FORM — Validation & Submit
   (formError banner + formSuccess state
    were in HTML but handler was missing)
══════════════════════════════════ */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  const errorBanner = document.getElementById('formError');
  const formContent = document.getElementById('formContent');
  const formSuccess = document.getElementById('formSuccess');
  const submitBtn = document.getElementById('submitBtn');
  const submitText = document.getElementById('submitText');
  const charCounter = document.getElementById('charCounter');
  const msgField = document.getElementById('msg');
  const successEmail = document.getElementById('successEmail');

  if (!form) return;

  // Character counter for message field
  if (msgField && charCounter) {
    msgField.addEventListener('input', () => {
      charCounter.textContent = `${msgField.value.length} / 500`;
    });
  }

  // Inline field hint helpers
  function setHint(id, msg, isError) {
    const hint = document.getElementById(id);
    if (!hint) return;
    hint.textContent = msg;
    hint.style.color = isError ? 'var(--rose)' : 'var(--lime)';
  }

  // Client-side validation
  function validate() {
    let valid = true;

    const fname = document.getElementById('fname');
    if (!fname || !fname.value.trim()) {
      setHint('fname-hint', 'First name is required.', true);
      valid = false;
    } else {
      setHint('fname-hint', '✓', false);
    }

    const femail = document.getElementById('femail');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!femail || !emailPattern.test(femail.value.trim())) {
      setHint('femail-hint', 'Enter a valid email address.', true);
      valid = false;
    } else {
      setHint('femail-hint', '✓', false);
    }

    if (!msgField || !msgField.value.trim()) {
      setHint('msg-hint', 'Message is required.', true);
      valid = false;
    } else {
      setHint('msg-hint', '✓', false);
    }

    const consent = document.getElementById('consent');
    if (!consent || !consent.checked) {
      valid = false;
    }

    return valid;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Hide previous error
    if (errorBanner) errorBanner.hidden = true;

    if (!validate()) {
      if (errorBanner) errorBanner.hidden = false;
      errorBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Loading state
    if (submitBtn) submitBtn.disabled = true;
    if (submitText) submitText.textContent = 'Sending…';

    try {
      const data = new FormData(form);
      const res = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        // Show success state
        const emailVal = document.getElementById('femail')?.value || '';
        if (successEmail) successEmail.textContent = emailVal;
        if (formContent) formContent.hidden = true;
        if (formSuccess) formSuccess.hidden = false;
      } else {
        throw new Error('Server error');
      }
    } catch {
      if (errorBanner) {
        errorBanner.textContent = 'Something went wrong. Please try again or email directly.';
        errorBanner.hidden = false;
      }
      if (submitBtn) submitBtn.disabled = false;
      if (submitText) submitText.textContent = 'Send Message';
    }
  });
})();
  if (typeof gsap !== 'undefined') {
    document.hidden ? gsap.globalTimeline.pause() : gsap.globalTimeline.resume();
  }
});

/* ══════════════════════════════════
   LAZY LOAD: Section-level
   heavy JS (globe + gravity)
   only when user reaches them
══════════════════════════════════ */
(function deferHeavySections() {
  const targets = [
    { id: 'skills', cb: () => { /* Globe already lazy via charObserver */ } },
    { id: 'skills2', cb: () => { /* Gravity already lazy init */ } },
    {
      id: 'overview', cb: () => {
        // Animate bento bars only when in view
        document.querySelectorAll('.bc-stat-bar-fill').forEach(bar => {
          if (bar.dataset.w) {
            const io = new IntersectionObserver(([e]) => {
              if (e.isIntersecting) { bar.style.width = bar.dataset.w; io.disconnect(); }
            }, { threshold: 0.3 });
            io.observe(bar);
          }
        });
      }
    }
  ];

  targets.forEach(({ id, cb }) => {
    const el = document.getElementById(id);
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { cb(); io.disconnect(); }
    }, { rootMargin: '150px 0px', threshold: 0 });
    io.observe(el);
  });
})();
