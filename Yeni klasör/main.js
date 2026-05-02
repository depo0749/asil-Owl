// ==============================
// OWLISBA — MAIN JAVASCRIPT
// ==============================

// ── Custom Cursor ──
const cursor = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');
let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursor) {
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  }
});

function animateTrail() {
  trailX += (mouseX - trailX) * 0.12;
  trailY += (mouseY - trailY) * 0.12;
  if (cursorTrail) {
    cursorTrail.style.left = trailX + 'px';
    cursorTrail.style.top = trailY + 'px';
  }
  requestAnimationFrame(animateTrail);
}
animateTrail();

document.querySelectorAll('a, button, .video-card, .game-card, .social-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (cursor) { cursor.style.width = '20px'; cursor.style.height = '20px'; }
    if (cursorTrail) { cursorTrail.style.width = '50px'; cursorTrail.style.height = '50px'; }
  });
  el.addEventListener('mouseleave', () => {
    if (cursor) { cursor.style.width = '12px'; cursor.style.height = '12px'; }
    if (cursorTrail) { cursorTrail.style.width = '32px'; cursorTrail.style.height = '32px'; }
  });
});

// ── Navbar Scroll Effect ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }
});

// ── Hamburger Menu ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (mobileMenu.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });
}

// ── Particles ──
const particlesContainer = document.getElementById('particles');
if (particlesContainer) {
  const PARTICLE_COUNT = 40;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 3 + 1;
    const x = Math.random() * 100;
    const delay = Math.random() * 8;
    const duration = Math.random() * 6 + 6;
    const opacity = Math.random() * 0.4 + 0.1;
    const colors = ['#ff5f1f', '#ff8c42', '#ffe600', '#39ff14', '#00b4ff'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    p.style.cssText = `
      position: absolute;
      left: ${x}%;
      bottom: -10px;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: ${color};
      opacity: ${opacity};
      animation: floatUp ${duration}s ${delay}s infinite linear;
    `;
    particlesContainer.appendChild(p);
  }
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatUp {
      0%   { transform: translateY(0) translateX(0); opacity: 0; }
      10%  { opacity: 1; }
      90%  { opacity: 0.5; }
      100% { transform: translateY(-100vh) translateX(${Math.random() > 0.5 ? '' : '-'}${Math.random() * 60 + 20}px); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

// ── Scroll Reveal ──
const revealEls = document.querySelectorAll('.reveal, .video-card, .game-card, .social-card, .schedule-day, .stat-item, .server-box');
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── Counter Animation ──
function animateCounter(el, target, duration = 2000) {
  const start = performance.now();
  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(eased * target);
    el.textContent = value.toLocaleString('tr-TR');
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      animateCounter(el, target);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num[data-target]').forEach(el => counterObserver.observe(el));

// ── Copy IP Button ──
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const code = btn.previousElementSibling;
    if (code) {
      navigator.clipboard.writeText(code.textContent.trim()).then(() => {
        const original = btn.textContent;
        btn.textContent = '✓ Kopyalandı!';
        btn.style.background = 'var(--green)';
        btn.style.color = '#000';
        btn.style.borderColor = 'var(--green)';
        setTimeout(() => {
          btn.textContent = original;
          btn.style.background = '';
          btn.style.color = '';
          btn.style.borderColor = '';
        }, 2000);
      });
    }
  });
});

// ── Filter Tabs ──
document.querySelectorAll('.filter-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const group = tab.closest('.filter-tabs');
    group.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const filter = tab.dataset.filter;
    const cards = document.querySelectorAll('.video-card[data-game], .game-card');
    cards.forEach(card => {
      if (filter === 'all' || card.dataset.game === filter || !card.dataset.game) {
        card.style.display = '';
        setTimeout(() => card.classList.add('visible'), 50);
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ── Active Nav Link ──
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage) link.classList.add('active');
  else link.classList.remove('active');
});
