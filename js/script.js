/* =========================================
   XDify - Main Script
   ========================================= */

'use strict';

// ============================================
// Loading Screen
// ============================================
function initLoadingScreen() {
  const screen = document.getElementById('loading-screen');
  if (!screen) return;
  
  setTimeout(() => {
    screen.classList.add('hidden');
    document.body.style.overflow = '';
  }, 2000);
}

// ============================================
// Custom Cursor
// ============================================
function initCursor() {
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  const hoverTargets = 'a, button, .btn, .glass-card, .rank-card, .gamemode-card, .points-card, .vote-card, .mode-card-mini, label, input, textarea, .ip-copy-btn, .accordion-header';

  document.addEventListener('mouseover', e => {
    if (e.target.closest(hoverTargets)) {
      dot.classList.add('hover');
      ring.classList.add('hover');
    }
  });

  document.addEventListener('mouseout', e => {
    if (e.target.closest(hoverTargets)) {
      dot.classList.remove('hover');
      ring.classList.remove('hover');
    }
  });
}

// ============================================
// Navbar
// ============================================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  // Scroll behavior
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    navbar.classList.toggle('scrolled', current > 50);
    lastScroll = current;
  }, { passive: true });

  // Active link
  const navLinks = document.querySelectorAll('.nav-links a, .nav-mobile-overlay a');
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Hamburger
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileOverlay = document.querySelector('.nav-mobile-overlay');
  
  if (hamburger && mobileOverlay) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileOverlay.classList.toggle('open');
      document.body.style.overflow = mobileOverlay.classList.contains('open') ? 'hidden' : '';
    });

    mobileOverlay.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileOverlay.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
}

// ============================================
// Theme Toggle
// ============================================
function initTheme() {
  ThemeManager.init();
  
  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.addEventListener('click', () => ThemeManager.toggle());
  }
}

// ============================================
// Language Switcher
// ============================================
function initLanguage() {
  LanguageManager.init();
  
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      if (lang) LanguageManager.set(lang);
    });
  });
}

// ============================================
// Ripple Effect
// ============================================
function initRipple() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      ripple.style.left = (e.clientX - rect.left - 50) + 'px';
      ripple.style.top = (e.clientY - rect.top - 50) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// ============================================
// Toast Notifications
// ============================================
function showToast(message, type = 'info', duration = 3500) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const icons = { success: '✅', error: '❌', info: '💎' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type] || '💬'}</span> ${message}`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fadeout');
    setTimeout(() => toast.remove(), 350);
  }, duration);
}

// ============================================
// IP Copy
// ============================================
function initIPCopy() {
  const copyBtn = document.querySelector('.ip-copy-btn');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', async () => {
    const ip = document.querySelector('.ip-address')?.textContent || 'play.xdify.net';
    try {
      await navigator.clipboard.writeText(ip);
      const origText = copyBtn.textContent;
      copyBtn.textContent = LanguageManager.t('hero.ip.copied');
      showToast(`IP copied: ${ip}`, 'success');
      setTimeout(() => { copyBtn.textContent = origText; }, 2000);
    } catch {
      showToast('Could not copy. IP: play.xdify.net', 'info');
    }
  });
}

// ============================================
// Back to Top
// ============================================
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============================================
// Scroll Reveal
// ============================================
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    observer.observe(el);
  });
}

// ============================================
// Counter Animation
// ============================================
function animateCounter(el, target, duration = 2000) {
  const start = performance.now();
  const startVal = 0;
  
  function update(timestamp) {
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(startVal + (target - startVal) * eased);
    el.textContent = value.toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target.toLocaleString() + (el.dataset.suffix || '');
  }
  requestAnimationFrame(update);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.done) {
        entry.target.dataset.done = 'true';
        const target = parseInt(entry.target.dataset.counter);
        animateCounter(entry.target, target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

// ============================================
// Particle System
// ============================================
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animId;

  function resize() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
  }

  function getAccentColor() {
    const theme = document.documentElement.getAttribute('data-theme');
    return theme === 'light' ? 'rgba(200,150,12,' : 'rgba(0,212,255,';
  }

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4 - 0.1;
      this.opacity = Math.random() * 0.4 + 0.1;
      this.life = 0;
      this.maxLife = Math.random() * 200 + 150;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life++;
      if (this.life > this.maxLife || this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
        this.reset();
        this.y = canvas.height + 5;
      }
    }
    draw() {
      const alpha = this.opacity * Math.sin((this.life / this.maxLife) * Math.PI);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = getAccentColor() + alpha + ')';
      ctx.fill();
    }
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });

  const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 12000));
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const alpha = (1 - dist / 120) * 0.08;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = getAccentColor() + alpha + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => { p.update(); p.draw(); });
    animId = requestAnimationFrame(animate);
  }

  animate();

  // Cleanup on page leave
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { cancelAnimationFrame(animId); }
    else { animate(); }
  });
}

// ============================================
// Server Status (mock + real attempt)
// ============================================
async function initServerStatus() {
  const statusEl = document.getElementById('server-status-text');
  const playersEl = document.getElementById('server-players');
  const maxEl = document.getElementById('server-max');
  const pingEl = document.getElementById('server-ping');
  const dotEl = document.querySelector('.status-dot');
  
  if (!statusEl) return;

  // Show loading state
  const updateStatus = (online, players, max, ping, version) => {
    if (dotEl) {
      dotEl.classList.toggle('offline', !online);
    }
    if (statusEl) statusEl.textContent = online ? LanguageManager.t('status.online') : LanguageManager.t('status.offline');
    if (playersEl) playersEl.textContent = online ? players : '—';
    if (maxEl) maxEl.textContent = online ? max : '—';
    if (pingEl) pingEl.textContent = online ? `${ping}ms` : '—';
  };

  // Try real API (mcsrvstat.us public API, no auth needed)
  try {
    const res = await fetch('https://api.mcsrvstat.us/2/play.xdify.net', { signal: AbortSignal.timeout(4000) });
    if (res.ok) {
      const data = await res.json();
      if (data.online) {
        updateStatus(true, data.players?.online || 0, data.players?.max || 500, '12', data.version || '1.21');
        return;
      }
    }
  } catch {}

  // Fallback: stylized demo data
  updateStatus(true, 247, 500, '12', '1.21.x');
}

// ============================================
// Gift Code Form
// ============================================
function initGiftCode() {
  const form = document.getElementById('gift-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const result = document.getElementById('gift-result');
    const username = document.getElementById('gift-username')?.value.trim();
    const code = document.getElementById('gift-code')?.value.trim();

    if (!username || !code) {
      showToast('Please fill in all fields.', 'error');
      return;
    }

    btn.textContent = '...';
    btn.disabled = true;

    await new Promise(r => setTimeout(r, 1400));

    btn.textContent = LanguageManager.t('gift.btn');
    btn.disabled = false;

    // Simulate validation
    const isValid = code.startsWith('XD') && code.length >= 8;

    if (result) {
      result.className = `gift-result ${isValid ? 'success' : 'error'}`;
      const msgEl = document.getElementById('gift-message');
      if (msgEl) msgEl.textContent = LanguageManager.t(isValid ? 'gift.success' : 'gift.error');
    }

    showToast(LanguageManager.t(isValid ? 'gift.success' : 'gift.error'), isValid ? 'success' : 'error');
  });
}

// ============================================
// Contact Form
// ============================================
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = '...';
    btn.disabled = true;
    await new Promise(r => setTimeout(r, 1200));
    btn.textContent = LanguageManager.t('support.form.send');
    btn.disabled = false;
    form.reset();
    showToast(LanguageManager.t('support.form.sent'), 'success');
  });
}

// ============================================
// Accordion (Rules)
// ============================================
function initAccordion() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const body = header.nextElementSibling;
      const isOpen = header.classList.contains('active');
      
      // Close all
      document.querySelectorAll('.accordion-header').forEach(h => {
        h.classList.remove('active');
        const b = h.nextElementSibling;
        if (b) b.classList.remove('open');
      });

      // Open clicked if it was closed
      if (!isOpen) {
        header.classList.add('active');
        if (body) body.classList.add('open');
      }
    });
  });

  // Open first by default
  const firstHeader = document.querySelector('.accordion-header');
  if (firstHeader) {
    firstHeader.click();
  }
}

// ============================================
// Parallax
// ============================================
function initParallax() {
  const shapes = document.querySelectorAll('.shape');
  if (!shapes.length) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    shapes.forEach((shape, i) => {
      const speed = (i + 1) * 0.08;
      shape.style.transform = `translateY(${scrollY * speed}px) scale(1)`;
    });
  }, { passive: true });
}

// ============================================
// Page Transitions
// ============================================
function initPageTransitions() {
  const overlay = document.getElementById('page-transition-overlay');
  if (!overlay) return;

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || link.target === '_blank') return;

    link.addEventListener('click', (e) => {
      e.preventDefault();
      overlay.classList.add('active');
      setTimeout(() => {
        window.location.href = href;
      }, 450);
    });
  });

  // Animate out on load
  window.addEventListener('load', () => {
    overlay.classList.remove('active');
  });
}

// ============================================
// Mode cards auto-scroll animation
// ============================================
function initModeCardsScroll() {
  const container = document.querySelector('.modes-scroll-container');
  if (!container) return;

  let scrollDir = 1;
  let autoScroll;

  function startScroll() {
    autoScroll = setInterval(() => {
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) scrollDir = -1;
      if (container.scrollLeft <= 0) scrollDir = 1;
      container.scrollLeft += scrollDir * 1.2;
    }, 25);
  }

  container.addEventListener('mouseenter', () => clearInterval(autoScroll));
  container.addEventListener('mouseleave', startScroll);
  startScroll();
}

// ============================================
// Init
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.overflow = 'hidden';
  
  initTheme();
  initLanguage();
  initLoadingScreen();
  initCursor();
  initNavbar();
  initRipple();
  initBackToTop();
  initScrollReveal();
  initCounters();
  initParticles();
  initIPCopy();
  initServerStatus();
  initGiftCode();
  initContactForm();
  initAccordion();
  initParallax();
  initPageTransitions();
  initModeCardsScroll();
});