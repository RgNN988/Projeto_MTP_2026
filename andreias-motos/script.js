// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ===== REVEAL ANIMATIONS (Intersection Observer) =====
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, suffix) {
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);
    el.textContent = current + suffix;
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

const counterElements = document.querySelectorAll('.numero-value[data-target]');
let countersStarted = false;

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersStarted) {
      countersStarted = true;
      counterElements.forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '';
        animateCounter(el, target, suffix);
      });
      counterObserver.disconnect();
    }
  });
}, { threshold: 0.4 });

const numerosSection = document.querySelector('.numeros');
if (numerosSection) counterObserver.observe(numerosSection);

// ===== WHATSAPP FLUTUANTE =====
const whatsappToggle = document.getElementById('whatsappToggle');
const whatsappPanel = document.getElementById('whatsappPanel');
const whatsappClose = document.getElementById('whatsappClose');

let panelOpen = false;

function openPanel() {
  panelOpen = true;
  whatsappPanel.classList.add('open');
}

function closePanel() {
  panelOpen = false;
  whatsappPanel.classList.remove('open');
}

whatsappToggle.addEventListener('click', () => {
  if (panelOpen) {
    closePanel();
  } else {
    openPanel();
  }
});

whatsappClose.addEventListener('click', closePanel);

document.addEventListener('click', (e) => {
  const float = document.getElementById('whatsappFloat');
  if (panelOpen && !float.contains(e.target)) {
    closePanel();
  }
});

// Fechar painel ao clicar em uma opção
document.querySelectorAll('.whatsapp-option').forEach(opt => {
  opt.addEventListener('click', () => {
    setTimeout(closePanel, 200);
  });
});

// ===== SMOOTH SCROLL para links da navbar =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== LIGHTBOX =====
(function () {
  const lightbox  = document.getElementById('lightbox');
  const img       = document.getElementById('lightboxImg');
  const overlay   = document.getElementById('lightboxOverlay');
  const btnClose  = document.getElementById('lightboxClose');

  function open(src, alt) {
    img.src = src;
    img.alt = alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.cliente-foto img').forEach(el => {
    el.addEventListener('click', () => open(el.src, el.alt));
  });

  overlay.addEventListener('click', close);
  btnClose.addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();

// ===== HERO: animar na carga =====
window.addEventListener('load', () => {
  const heroElements = document.querySelectorAll('.hero .reveal, .hero .reveal-right');
  heroElements.forEach(el => {
    el.classList.add('visible');
  });
});

// ===== HERO CANVAS: Orbs minimalistas =====
(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H;
  let orbs = [];

  const ORBS = [
    { rx: 0.18, ry: 0.25, r: 220, opacity: 0.07, vx:  0.10, vy:  0.06 },
    { rx: 0.72, ry: 0.55, r: 280, opacity: 0.09, vx: -0.08, vy:  0.05 },
    { rx: 0.50, ry: 0.80, r: 180, opacity: 0.06, vx:  0.06, vy: -0.07 },
    { rx: 0.85, ry: 0.20, r: 200, opacity: 0.05, vx: -0.05, vy:  0.08 },
    { rx: 0.30, ry: 0.65, r: 150, opacity: 0.05, vx:  0.07, vy: -0.05 },
    { rx: 0.60, ry: 0.10, r: 160, opacity: 0.04, vx: -0.06, vy:  0.06 },
  ];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function init() {
    orbs = ORBS.map(o => ({ ...o, x: o.rx * W, y: o.ry * H }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    orbs.forEach(o => {
      const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
      g.addColorStop(0, `rgba(180,0,0,${o.opacity})`);
      g.addColorStop(1, 'rgba(180,0,0,0)');
      ctx.beginPath();
      ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();

      o.x += o.vx;
      o.y += o.vy;
      if (o.x < -o.r)      o.x = W + o.r;
      if (o.x > W + o.r)   o.x = -o.r;
      if (o.y < -o.r)      o.y = H + o.r;
      if (o.y > H + o.r)   o.y = -o.r;
    });

    requestAnimationFrame(draw);
  }

  resize();
  init();
  draw();

  window.addEventListener('resize', () => { resize(); init(); }, { passive: true });
})();
