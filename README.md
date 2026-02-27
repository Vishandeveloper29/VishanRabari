# 🚀 Vishan Rabari — Portfolio v2

<div align="center">

![Portfolio Banner](https://img.shields.io/badge/Portfolio-v2.0-c8ff00?style=for-the-badge&logo=code&logoColor=black)
![Status](https://img.shields.io/badge/Status-Live-brightgreen?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)

<br/>

**A pixel-perfect, fully animated personal portfolio for Frontend Developer Vishan Rabari.**  
Built with pure HTML, CSS, and Vanilla JavaScript — zero frameworks, zero dependencies.

<br/>

[🌐 Live Demo](#) · [📁 GitHub](https://github.com/Vishandeveloper29) · [📧 Contact](mailto:rabarivishan2@gmail.com) · [💼 LinkedIn](https://www.linkedin.com/in/vishan-rabari-7634ab392)

</div>

---

## 📋 Table of Contents

- [✨ Overview](#-overview)
- [🎨 Features](#-features)
- [🗂️ Project Structure](#️-project-structure)
- [📄 Sections Breakdown](#-sections-breakdown)
- [🛠️ Tech Stack](#️-tech-stack)
- [🎭 Design System](#-design-system)
- [⚙️ JavaScript Modules](#️-javascript-modules)
- [📱 Responsive Design](#-responsive-design)
- [♿ Accessibility](#-accessibility)
- [🚀 Performance](#-performance)
- [🔌 Integrations](#-integrations)
- [💻 Getting Started](#-getting-started)
- [🔧 Customization Guide](#-customization-guide)
- [📦 Projects Showcase](#-projects-showcase)
- [💰 Pricing Plans](#-pricing-plans)
- [📬 Contact & Socials](#-contact--socials)
- [📝 License](#-license)

---

## ✨ Overview

This is **Vishan Rabari's personal portfolio website** — a fully hand-coded, zero-framework frontend showcase designed to demonstrate not just who Vishan is, but *how* he builds. Every animation, every interaction, and every line of CSS was crafted from scratch to represent the highest standard of modern frontend development.

The portfolio includes:

- A **dark/light mode** system with localStorage persistence
- An animated **particle canvas** background with mouse interaction
- A fully **filterable project grid** with live preview modals
- An animated **testimonials carousel** with autoplay and swipe support
- A **live contact form** powered by Formspree with real-time validation
- Smooth **scroll-based reveal animations** using IntersectionObserver
- A custom **typewriter effect** cycling through developer specialties
- **Animated skill bars** with real-time number counters

> **Goal:** To show potential clients and employers that Vishan doesn't just write code — he creates experiences.

---

## 🎨 Features

### Visual & Interaction
| Feature | Description |
|---|---|
| 🌑 **Dark / Light Mode** | Full theme switch with smooth CSS transitions and `localStorage` memory |
| 🎇 **Particle Canvas** | 40–80 animated particles with mouse repulsion and inter-particle connection lines |
| 🖱️ **Custom Cursor** | Dual-layer cursor (dot + ring) with magnetic pull on interactive elements |
| 🌊 **Scroll Progress Bar** | Gradient progress bar at top of page reflecting scroll position |
| 🔄 **Loader Animation** | Full-screen loader with animated progress bar and glitch logo effect |
| 🎞️ **Scroll Reveal Animations** | All sections animate in via IntersectionObserver with staggered delays |
| 💫 **Parallax Orbs** | Background blurred color orbs that scroll at different speeds |
| ✍️ **Typewriter Effect** | Cycles through developer specialties: Landing Pages, Web Apps, UI/UX, etc. |
| 🧲 **Magnetic Buttons** | Buttons that shift toward the cursor on hover (desktop only) |
| 🪄 **Card Tilt Effect** | 3D perspective tilt on the code card and project/service cards on hover |
| 🎊 **Confetti Animation** | 50-piece confetti burst on successful form submission |
| 📊 **Animated Stat Counters** | Hero stats count up from 0 when they enter the viewport |
| 📈 **Skill Bar Animation** | Skill bars fill with live percentage counter (1.6s cubic-bezier ease) |
| 🎠 **Testimonials Carousel** | Auto-playing carousel with swipe support, dot navigation, and arrow controls |

### Functionality
| Feature | Description |
|---|---|
| 📂 **Project Filter** | Filterable grid by category: All, Web APIs, E-Commerce, Design, Clones |
| 🖥️ **Live Project Preview** | Modal with embedded iframe + loading spinner + fallback external link |
| 📋 **FAQ Accordion** | Accessible accordion with smooth max-height CSS transitions |
| 📝 **Contact Form** | Real-time field validation, character counter, Formspree backend, success state |
| ☰ **Mobile Menu** | Full-screen overlay mobile navigation with staggered link animations |
| 🔝 **Back to Top** | Animated scroll-to-top button that appears after scrolling 500px |
| 🔊 **Marquee Strip** | Dual-row skill marquee (forward + reverse) that pauses on hover |
| ⌨️ **Keyboard Navigation** | Full keyboard accessibility: Escape closes modals and menus |

---

## 🗂️ Project Structure

```
vishan-portfolio/
│
├── index.html              # Main HTML — all sections, markup, SVG icons
├── style.css               # Complete stylesheet — themes, components, responsive
├── script.js               # All JavaScript — 22 organized modules
├── Vishan_dev_CV (2).pdf   # Downloadable resume
└── README.md               # This file
```

> **Note:** The project is intentionally zero-dependency — no build tools, no npm, no bundler. Just open `index.html` in a browser.

---

## 📄 Sections Breakdown

### 1. 🏠 Hero Section (`#home`)
The first impression. Features:
- Animated text reveal with staggered delays (0.5s – 1.3s)
- Three-line title: `FRONTEND` / `DEVELOPER` (stroke) / `& CREATOR` (lime)
- Floating badges: ⚡ Fast Delivery · ✨ 28+ Repos · 🏆 100% Satisfied
- **Interactive code card** with 3D tilt effect displaying a `vishan.js` object
- **Typewriter effect** cycling through 6 specialties
- **Stats bar**: 28+ GitHub Repos · 1yr Experience · 15+ Projects · 100% Satisfaction
- Animated background grid + parallax orbs

### 2. 👤 About Section (`#about`)
Two-column layout:
- **Left:** Bio, tech pill tags, and fun facts
- **Right:** ID card component (sticky on desktop) with avatar, status badge, contact list, and social links

### 3. 🛠️ Services Section (`#services`)
Six service cards in a responsive grid:
1. Landing Pages — from ₹6,000
2. E-Commerce — from ₹12,000
3. Web Apps — from ₹10,000
4. UI/UX Design — from ₹5,000
5. Responsive Design — included in all plans
6. Performance Audit — from ₹5,000

Each card has hover effects, background number watermarks, category tags, and an animated arrow.

### 4. 💼 Projects Section (`#projects`)
Filterable project grid with 6 featured projects:

| Project | Category | Live |
|---------|----------|------|
| ApexDeck Design System | Design | GitHub |
| LK Mart E-Commerce | E-Commerce | [lkmart.onrender.com](https://lkmart.onrender.com/) |
| Currency Converter | Web API | [Live ↗](https://vishandeveloper29.github.io/Currency-Converter/) |
| Weather App | Web API | [Live ↗](https://vishandeveloper29.github.io/Weather-app/) |
| GitHub Explorer | Web API | [Live ↗](https://vishandeveloper29.github.io/GitHub-Explorer/) |
| Netflix Clone | Clone | GitHub |

Each project card features a custom browser chrome mockup UI, hover overlay with preview/live/code buttons, and a live preview modal.

### 5. ⚙️ Process Section (`#process`)
Four-step workflow cards:
1. **Discover** — Day 1
2. **Design** — Day 1–2
3. **Develop** — Day 2–4
4. **Deliver** — Day 4–5

### 6. 📊 Skills Section (`#skills`)
Eight skill cards with animated progress bars:

| Skill | Level | Proficiency |
|-------|-------|-------------|
| HTML5 | Expert | 90% |
| CSS3 | Expert | 88% |
| JavaScript | Advanced | 72% |
| Figma | Advanced | 75% |
| Git & GitHub | Advanced | 80% |
| Responsive Design | Expert | 85% |
| REST APIs | Advanced | 70% |
| C Language | Advanced | 78% |

### 7. 🗓️ Experience / Timeline (`#experience`)
Five milestone cards on an animated vertical timeline:
- 2025 — Started Learning Web Dev
- 2025 Late — JavaScript & DOM Mastery
- 2025 — First Freelance Projects
- 2025 Late — Figma & UI/UX Design
- **2026 Now — Advanced Projects & React (Current)**

### 8. 💰 Pricing Section (`#pricing`)
Three transparent pricing tiers:

| Plan | Price | Best For |
|------|-------|----------|
| Starter | ₹8,000/project | Landing pages & personal sites |
| Popular ⭐ | ₹25,000/project | Small businesses & e-commerce |
| Premium | ₹35,000/project | Full-scale web applications |

### 9. 🎯 CTA Banner
Full-width call-to-action with radial gradient background and dual CTA buttons.

### 10. 💬 Testimonials Section (`#testimonials`)
Auto-playing carousel featuring 4 client testimonials with 5-star ratings:
- Dhruv Mangukiya — Startup Founder
- Naresh Kriplani — E-Commerce Owner
- Ravi Mehta — Freelance Photographer
- Priya Desai — Brand Manager

### 11. 📰 Blog Section (`#blog`)
Three dev-note blog cards:
- "5 CSS Tricks I Use on Every Project" — CSS Tips
- "Building a Cart Without Any Framework" — JavaScript
- "Why I Started Using Figma Before Coding" — Design

### 12. ❓ FAQ Section (`#faq`)
Five accessible accordion items covering:
- Project timeline
- Budget ranges
- International clients
- Mobile responsiveness
- Post-delivery support

### 13. 📬 Contact Section (`#contact`)
Two-column layout:
- **Left:** Headline, sub-copy, and contact items (Email, GitHub, WhatsApp, Location)
- **Right:** Multi-field form with real-time validation, character counter, and Formspree submission

### 14. 🦶 Footer
Clean footer with logo, copyright, and social links (GitHub, LinkedIn, Email).

---

## 🛠️ Tech Stack

```
Frontend Only — Zero Frameworks — Zero Dependencies
```

| Technology | Usage |
|------------|-------|
| **HTML5** | Semantic structure, ARIA roles, landmark regions |
| **CSS3** | Custom properties, Grid, Flexbox, Keyframe animations |
| **Vanilla JavaScript ES6+** | DOM manipulation, IntersectionObserver, Canvas API, Fetch API |
| **Canvas 2D API** | Particle system with mouse repulsion and connection lines |
| **CSS Custom Properties** | Complete theme system (dark/light) |
| **IntersectionObserver** | Scroll-triggered reveal animations and skill bar counters |
| **Formspree** | Contact form backend (serverless form handling) |
| **Google Fonts** | Bebas Neue, Outfit, JetBrains Mono |

---

## 🎭 Design System

### Color Palette

#### Dark Theme (Default)
```css
--bg:     #05050a   /* Background */
--bg2:    #080812   /* Alt background */
--bg3:    #0c0c1a   /* Card surfaces */
--fg:     #f0f0f5   /* Primary text */
--fg2:    rgba(240,240,245,.55)  /* Secondary text */
--fg3:    rgba(240,240,245,.28)  /* Muted text */
--lime:   #c8ff00   /* Accent / CTA */
--cyan:   #00e5ff   /* Secondary accent */
--rose:   #ff2d55   /* Hover / danger */
--violet: #8b5cf6   /* Purple accent */
--gold:   #ffd166   /* Stars / highlights */
--orange: #ff7c2a   /* Warm accent */
```

#### Light Theme
```css
--bg:     #f5f5f0   /* Background */
--fg:     #0a0a12   /* Primary text */
--lime:   #5a9600   /* Adjusted for contrast */
--cyan:   #0088aa   /* Adjusted for contrast */
```

### Typography

| Variable | Font | Usage |
|----------|------|-------|
| `--ff-d` | `Bebas Neue` | Display headings, titles, numbers |
| `--ff-b` | `Outfit` | Body text, descriptions |
| `--ff-m` | `JetBrains Mono` | Labels, tags, code, small caps |

### Spacing
```css
--px: clamp(16px, 5vw, 72px)    /* Horizontal padding — responsive */
--py: clamp(56px, 10vw, 120px)  /* Vertical padding — responsive */
--radius: 16px                   /* Border radius */
```

### Transitions
```css
--trans: all .3s cubic-bezier(.4, 0, .2, 1)
```

### Z-Index Scale
```
0     — Particle canvas
1     — Section backgrounds
2     — Section content
200   — Back to top button
300   — Theme toggle
400   — Mobile menu
500   — Navigation header
9997  — Noise overlay
9998  — Scroll progress bar
9999  — Custom cursor
10000 — Loader
```

---

## ⚙️ JavaScript Modules

The `script.js` file is organized into **22 clearly labeled sections**:

```javascript
/* 1.  Particle Canvas         — Canvas 2D API, mouse repulsion, connections    */
/* 2.  Dark/Light Mode Toggle  — localStorage theme persistence                 */
/* 3.  Scroll Progress         — Scroll progress bar width calculation          */
/* 4.  Loader                  — Animated progress bar (0 → 100%)               */
/* 5.  Custom Cursor           — Dual cursor with lag/follow effect             */
/* 6.  Magnetic Buttons        — Mouse-offset transform on .magnetic elements   */
/* 7.  Nav & Hamburger         — Mobile menu toggle, scroll active link         */
/* 8.  Smooth Scroll           — Offset smooth scroll for anchor links          */
/* 9.  Typewriter              — Word cycling with delete/type animation        */
/* 10. Scroll Reveal           — Single IntersectionObserver for all .sr items  */
/* 11. Hero Counters           — Number count-up animation for stat items       */
/* 12. Parallax Orbs           — Scroll-based Y translation on orb elements     */
/* 13. Project Filter          — Category filter with transition out animation  */
/* 14. Live Preview Modal      — iframe modal with loader, close handlers       */
/* 15. Testimonials Carousel   — Auto-play, touch swipe, dot nav, arrow nav     */
/* 16. FAQ Accordion           — Accessible open/close with ARIA attributes     */
/* 17. Code Card Tilt          — 3D perspective tilt on hero code card          */
/* 18. Contact Form            — Real-time validation, Formspree fetch submit   */
/* 19. Confetti                — 50-piece animated confetti on success          */
/* 20. Back to Top             — Show/hide and scroll-to-top on click           */
/* 21. Keyboard Accessibility  — Escape key handler for modals and menus        */
/* 22. Touch Feedback          — Tap opacity feedback on mobile cards           */
```

### Module Details

#### Module 1: Particle Canvas
```javascript
// Configuration
const COUNT = window.innerWidth < 600 ? 40 : 80;
const MAX_DIST = 120;      // Max connection distance
const COLORS = ["#c8ff00", "#00e5ff", "#8b5cf6", "#ff2d55", "#ffd166"];

// Each particle has:
// - Random position, velocity, radius, alpha, color
// - Mouse repulsion within 80px radius
// - Velocity damping: vx *= 0.98 (smooth deceleration)
// - Edge wrapping (not bouncing)
```

#### Module 10: Scroll Reveal
```javascript
// Single IntersectionObserver handles:
// 1. Fade-in of .sr elements
// 2. Skill bar animation with number counters
// 3. Bar-animated class for skill level label reveal

const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    // animate skill bars...
    io.unobserve(entry.target);
  });
}, { threshold: 0.1, rootMargin: "0px 0px -36px 0px" });
```

#### Module 15: Testimonials Carousel
```javascript
// Auto-advances every 4500ms
// Resets timer on manual interaction
// Touch events: swipe threshold = 40px
// Responsive card width recalculated on window resize
```

#### Module 18: Contact Form
Real-time validation rules:
- **Name:** minimum 2 characters
- **Email:** regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- **Message:** minimum 20 characters (blur) / 10 characters (submit)
- **Consent checkbox:** required

```javascript
const resp = await fetch(contactForm.action, {
  method: "POST",
  body: new FormData(contactForm),
  headers: { Accept: "application/json" }
});
```

---

## 📱 Responsive Design

The site uses a **mobile-first** approach with these breakpoints:

```css
/* Mobile base — 320px+ */
/* Small mobile */
@media (min-width: 480px) { }
/* Large mobile */
@media (min-width: 600px) { }
/* Tablet portrait */
@media (min-width: 700px) { }
/* Tablet */
@media (min-width: 768px) { }
/* Tablet landscape */
@media (min-width: 900px) { }
/* Small desktop */
@media (min-width: 1000px) { }
/* Desktop */
@media (min-width: 1024px) { }
/* Large desktop */
@media (min-width: 1100px) { }
/* XL desktop */
@media (min-width: 1200px) { }
```

### Responsive Component Behavior

| Component | Mobile | Tablet | Desktop |
|-----------|--------|--------|---------|
| Nav | Hamburger menu | Hamburger menu | Full links + Hire Me |
| Hero | Stacked | Stacked | Side-by-side |
| Float badges | Hidden | Visible | Visible |
| Services grid | 1 column | 2 columns | 3 columns |
| Projects grid | 1 column | 2 columns | 3 columns (featured = 2) |
| Skills grid | 1 column | 2 columns | 3–4 columns |
| Timeline | Left-aligned | Left-aligned | Alternating sides |
| Pricing grid | 1 column | 3 columns | 3 columns |
| About grid | Stacked | Stacked | 2 columns |
| Contact | Stacked | Stacked | 2 columns |
| Hero stats | 2×2 grid | 4 columns | 4 columns |
| Testimonial cards | Full width | 2 per view | 3 per view |

### Typography Scaling
All key font sizes use `clamp()` for fluid scaling without breakpoints:
```css
.hero-title  { font-size: clamp(44px, 12vw, 140px) }
.sec-title   { font-size: clamp(32px, 6vw, 76px)   }
.stat-n      { font-size: clamp(22px, 5vw, 50px)   }
body text    { font-size: clamp(14px, 1.8vw, 16px)  }
```

---

## ♿ Accessibility

The portfolio follows WCAG 2.1 guidelines with these implementations:

### ARIA & Semantics
```html
<!-- Landmark regions -->
<header id="nav">          <!-- Banner landmark -->
<main> / <section>         <!-- Main / section landmarks -->
<footer>                   <!-- Contentinfo landmark -->
<nav class="mob-menu">     <!-- Navigation landmark -->

<!-- ARIA attributes -->
aria-label="Toggle menu"
aria-expanded="false"
aria-hidden="true"         <!-- Decorative elements -->
aria-modal="true"          <!-- Preview modal -->
aria-live="polite"         <!-- Typewriter region -->
role="status"              <!-- Loader -->
role="dialog"              <!-- Preview modal -->
role="tablist"             <!-- Project filters -->
role="tab"                 <!-- Filter buttons -->
aria-selected="true/false" <!-- Active filter state -->
```

### Keyboard Navigation
- `Escape` — closes mobile menu and preview modal
- `Tab` — navigates all interactive elements
- `Enter` / `Space` — activates testimonial dots
- `ArrowLeft` / `ArrowRight` — navigate testimonial carousel (when focused)

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    transition-duration: .01ms !important;
  }
  html { scroll-behavior: auto; }
  .sr { opacity: 1; transform: none; }
}
```

### Focus Management
- Preview modal traps focus within container when open
- Mobile menu disables body scroll (`overflow: hidden`) when open
- Custom cursor is hidden on touch/pointer:coarse devices

---

## 🚀 Performance

### Techniques Used
- **`will-change: transform`** on animated particle canvas and carousel
- **`passive: true`** on all scroll and touch event listeners
- **Single IntersectionObserver** instance for all scroll reveals (no per-element observers)
- **requestAnimationFrame** for cursor follow loop and carousel resize recalculation
- **`pointer-events: none`** on decorative elements (canvas, noise, orbs)
- **Lazy loading** on preview iframe (`loading="lazy"`)
- **Font display swap** via Google Fonts `display=swap`
- **Reduced particle count** on mobile: 40 particles vs 80 on desktop
- **Unobserve after trigger**: `io.unobserve(el)` called after each element animates in

### Asset Strategy
- Zero external JavaScript libraries
- SVG icons inline (no icon font, no image requests)
- CSS animations instead of JavaScript where possible
- No build step, no bundling overhead

---

## 🔌 Integrations

### Formspree (Contact Form)
```
Endpoint: https://formspree.io/f/xreajndd
Method: POST
Content-Type: multipart/form-data
Accept: application/json
```

Form fields submitted:
- `fname` — First name
- `lname` — Last name (optional)
- `email` — Email address
- `subject` — Project type (dropdown)
- `budget` — Budget range (dropdown)
- `message` — Message body
- `consent` — Checkbox confirmation
- `_subject` — Hidden: "New Portfolio Contact — Vishan Rabari"

### Google Fonts
```html
<link href="https://fonts.googleapis.com/css2?
  family=Bebas+Neue&
  family=Outfit:wght@300;400;500;600;700;900&
  family=JetBrains+Mono:wght@300;400;500;700&
  display=swap" rel="stylesheet" />
```

### Social / External Links

| Platform | URL |
|----------|-----|
| GitHub | https://github.com/Vishandeveloper29 |
| LinkedIn | https://www.linkedin.com/in/vishan-rabari-7634ab392 |
| Instagram | http://www.instagram.com/thevishandeveloper7 |
| WhatsApp | https://wa.me/918141314836 |
| Email | rabarivishan2@gmail.com |

---

## 💻 Getting Started

### Prerequisites
No prerequisites. No Node.js, no npm, no build tools required.

### Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/Vishandeveloper29/portfolio.git

# 2. Navigate to the folder
cd portfolio

# 3. Open in browser (option A — direct)
open index.html

# 3. Open in browser (option B — VS Code Live Server)
# Install "Live Server" extension → Right click index.html → Open with Live Server

# 3. Open in browser (option C — Python simple server)
python -m http.server 8080
# Then visit http://localhost:8080
```

### Folder Setup
```
No build step needed. The project runs exactly as-is from the file system.
```

---

## 🔧 Customization Guide

### Changing Personal Info

**In `index.html`:**

```html
<!-- Update your name -->
<strong>Vishan Rabari</strong>

<!-- Update your location -->
<strong>Gandhidham, Gujarat</strong>

<!-- Update your email -->
<a href="mailto:YOUR_EMAIL">YOUR_EMAIL</a>

<!-- Update your GitHub -->
<a href="https://github.com/YOUR_USERNAME">

<!-- Update WhatsApp number -->
<a href="https://wa.me/YOURPHONENUMBER">

<!-- Update resume file -->
<a href="YOUR_RESUME.pdf" download>
```

### Changing the Color Theme

**In `style.css`, update the `:root` and `[data-theme]` blocks:**

```css
:root {
  --lime:   #c8ff00;   /* Change to your accent color */
  --cyan:   #00e5ff;   /* Change to your secondary accent */
  --rose:   #ff2d55;   /* Change to your hover/danger color */
}
```

### Adding a New Project Card

Copy this template into the `#projGrid` div in `index.html`:

```html
<div class="proj-card sr" data-cat="api">
  <div class="proj-vis">
    <div class="proj-vis-bg" style="background: linear-gradient(145deg, #001, #002, #003)"></div>
    <div class="proj-overlay">
      <a href="GITHUB_URL" target="_blank" class="ov-btn">Code</a>
      <button class="ov-btn preview-btn" data-url="LIVE_URL">Preview</button>
      <a href="LIVE_URL" target="_blank" class="ov-btn">Live ↗</a>
    </div>
  </div>
  <div class="proj-meta">
    <div class="proj-tags">
      <span class="tag tag-cyan">Web API</span>
      <span class="tag tag-lime">Category</span>
    </div>
    <div class="proj-name">Project Name</div>
    <p class="proj-desc">Short description of the project.</p>
  </div>
  <div class="proj-footer">
    <span class="proj-tech">HTML · CSS · JS</span>
    <a href="LIVE_URL" target="_blank" class="proj-gh">Live ↗</a>
  </div>
</div>
```

**Available `data-cat` values:** `api` · `ecommerce` · `design` · `clone`  
**Available tag classes:** `tag-lime` · `tag-cyan` · `tag-rose` · `tag-violet`

### Updating the Contact Form

Replace the Formspree endpoint with your own:

```html
<form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

Sign up free at [formspree.io](https://formspree.io) to get your own form ID.

### Changing Typewriter Words

**In `script.js`, update the `words` array:**

```javascript
const words = [
  "Landing Pages",
  "Web Apps",
  "Your Custom Text",   // ← Add or edit here
  "More Custom Text",
];
```

### Updating Skill Bar Values

**In `index.html`, change the `data-w` attribute:**

```html
<div class="sbar-fill" data-w="90%"></div>   <!-- Change 90% to your value -->
```

Also update the skill level label and `data-label` on the parent card accordingly.

---

## 📦 Projects Showcase

### ApexDeck — Design System
A comprehensive modern design system and component library. Focuses on consistent spacing, typography, interaction patterns, and scalable Figma-to-code handoffs.

**Stack:** HTML · CSS · JavaScript · Figma  
**GitHub:** [Vishandeveloper29](https://github.com/Vishandeveloper29)

---

### LK Mart — E-Commerce Frontend
Full-featured e-commerce frontend with product listings, shopping cart, and seamless checkout UX. Deployed on Render.

**Stack:** HTML · CSS · JavaScript  
**Live:** [lkmart.onrender.com](https://lkmart.onrender.com/)

---

### Currency Converter
Real-time currency conversion tool supporting 150+ world currencies. Integrates a live exchange rate API with a clean, minimal interface.

**Stack:** JavaScript · REST API  
**Live:** [vishandeveloper29.github.io/Currency-Converter](https://vishandeveloper29.github.io/Currency-Converter/)

---

### Weather App
Live weather dashboard using OpenWeatherMap API. Features city search, animated weather icons, temperature, humidity, and wind speed display.

**Stack:** JavaScript · OpenWeather API  
**Live:** [vishandeveloper29.github.io/Weather-app](https://vishandeveloper29.github.io/Weather-app/)

---

### GitHub Explorer
Search and explore GitHub user profiles and repositories in real-time using the GitHub REST API. Displays repo stats, languages, and star counts.

**Stack:** JavaScript · GitHub API  
**Live:** [vishandeveloper29.github.io/GitHub-Explorer](https://vishandeveloper29.github.io/GitHub-Explorer/)

---

### Netflix Clone
Pixel-perfect clone of the Netflix landing page. Responsive layout with hover effects, gradient backgrounds, and UI-accurate typography.

**Stack:** HTML · CSS  
**GitHub:** [Netflix-Clone](https://github.com/Vishandeveloper29/Netflix-Clone)

---

## 💰 Pricing Plans

All plans include:
- ✅ Mobile-first responsive design
- ✅ Cross-browser tested
- ✅ Source code handoff
- ✅ 7-day post-delivery support

| | Starter | Popular ⭐ | Premium |
|---|---|---|---|
| **Price** | ₹8,000 | ₹25,000 | ₹35,000 |
| **Pages** | 1–3 | Up to 8 | Unlimited |
| **Responsive** | ✅ | ✅ | ✅ |
| **Contact Form** | ✅ | ✅ | ✅ |
| **Animations** | Basic | Custom | Advanced |
| **E-Commerce Cart** | ❌ | ✅ | ✅ |
| **API Integrations** | ❌ | ✅ | Multiple |
| **Figma File** | ❌ | ✅ | ✅ |
| **Full Design System** | ❌ | ❌ | ✅ |
| **Performance Audit** | ❌ | ❌ | ✅ |
| **Delivery** | 3 days | 5 days | Quoted |
| **Support** | 7 days | 7 days | 14 days |

> Have a custom requirement? [Let's talk →](#-contact--socials)

---

## 📬 Contact & Socials

<div align="center">

| Channel | Link |
|---------|------|
| 📧 **Email** | [rabarivishan2@gmail.com](mailto:rabarivishan2@gmail.com) |
| 💼 **LinkedIn** | [vishan-rabari-7634ab392](https://www.linkedin.com/in/vishan-rabari-7634ab392) |
| 🐙 **GitHub** | [Vishandeveloper29](https://github.com/Vishandeveloper29) |
| 📸 **Instagram** | [@thevishandeveloper7](http://www.instagram.com/thevishandeveloper7) |
| 💬 **WhatsApp** | [+91 81413 14836](https://wa.me/918141314836) |
| 📍 **Location** | Gandhidham, Gujarat 370210, India |

</div>

> I typically respond within **24 hours**. For fastest response, WhatsApp is recommended.

---

## 🙏 Acknowledgements

- [Formspree](https://formspree.io/) — for the serverless contact form backend
- [Google Fonts](https://fonts.google.com/) — Bebas Neue, Outfit, JetBrains Mono
- [Bootstrap Icons](https://icons.getbootstrap.com/) — inspiration for some SVG paths used in the Process section

---

## 📝 License

```
MIT License

Copyright (c) 2025 Vishan Rabari

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

<div align="center">

Built with ❤️ and ☕ from **Gandhidham, Gujarat, India**

**Vishan Rabari** · Frontend Developer · Freelancer · Creator

[![GitHub](https://img.shields.io/github/followers/Vishandeveloper29?style=social)](https://github.com/Vishandeveloper29)

*"I don't just write code — I craft experiences."*

</div>
