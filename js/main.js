// â”€â”€â”€ PRELOADER â”€â”€â”€
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hidden');
  }, 2000);
});

// â”€â”€â”€ CUSTOM CURSOR â”€â”€â”€
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX - 5 + 'px';
  cursor.style.top = e.clientY - 5 + 'px';
});
document.querySelectorAll('a, button, .brand-card, .service-item, .coverage-card, .team-card, .contact-method, .form-group input, .form-group select, .form-group textarea').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.style.transform = 'scale(3)');
  el.addEventListener('mouseleave', () => cursor.style.transform = 'scale(1)');
});

// â”€â”€â”€ NAV SCROLL â”€â”€â”€
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 50);
});

// â”€â”€â”€ REVEAL ON SCROLL â”€â”€â”€
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 100);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
