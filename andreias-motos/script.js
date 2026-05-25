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

// ===== HERO: animar na carga =====
window.addEventListener('load', () => {
  const heroElements = document.querySelectorAll('.hero .reveal, .hero .reveal-right');
  heroElements.forEach(el => {
    el.classList.add('visible');
  });
});
