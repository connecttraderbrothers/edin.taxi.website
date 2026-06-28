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
const heroScrollIndicator = document.querySelector('.hero-scroll-indicator');
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 50);
  if (heroScrollIndicator) {
    heroScrollIndicator.classList.toggle('faded', window.scrollY > 120);
  }
});

// â”€â”€â”€ ANIMATED STAT COUNTERS â”€â”€â”€
function animateCount(el) {
  const target = Number(el.dataset.target);
  const duration = 1600;
  const start = performance.now();
  function tick(now) {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(target * eased);
    if (t < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  }
  requestAnimationFrame(tick);
}
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-count').forEach(el => statObserver.observe(el));

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

// â"€â"€â"€ COVERAGE BACKGROUND SWAP (DESKTOP) â"€â"€â"€
const coverageCards = document.querySelectorAll('.coverage-card[data-area]');
const coverageBgImgs = document.querySelectorAll('.coverage-bg-img[data-area]');

coverageCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    const area = card.dataset.area;
    coverageBgImgs.forEach(img => img.classList.toggle('active', img.dataset.area === area));
  });
  card.addEventListener('mouseleave', () => {
    coverageBgImgs.forEach(img => img.classList.toggle('active', img.dataset.area === 'edinburgh'));
  });
});

// â"€â"€â"€ COVERAGE CAROUSEL (SLIDING GALLERY) â"€â"€â"€
const carouselInner = document.querySelector('.coverage-carousel-inner');
const carouselSlides = document.querySelectorAll('.coverage-carousel-slide');
const carouselDots = document.querySelectorAll('.coverage-dot');
const carouselTrack = document.querySelector('.coverage-carousel-track');
const carouselPrev = document.querySelector('.coverage-arrow-prev');
const carouselNext = document.querySelector('.coverage-arrow-next');
let currentSlide = 0;

function goToSlide(index) {
  const total = carouselSlides.length;
  currentSlide = (index + total) % total; // wrap around
  if (carouselInner) {
    carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;
  }
  carouselDots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
}

carouselDots.forEach(dot => {
  dot.addEventListener('click', () => goToSlide(Number(dot.dataset.index)));
});

if (carouselPrev) carouselPrev.addEventListener('click', () => goToSlide(currentSlide - 1));
if (carouselNext) carouselNext.addEventListener('click', () => goToSlide(currentSlide + 1));

// Swipe support
let touchStartX = 0;
let touchStartY = 0;

if (carouselTrack) {
  carouselTrack.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  carouselTrack.addEventListener('touchend', e => {
    const diffX = touchStartX - e.changedTouches[0].clientX;
    const diffY = touchStartY - e.changedTouches[0].clientY;
    // Only treat as horizontal swipe if mostly horizontal movement
    if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) goToSlide(currentSlide + 1);
      else goToSlide(currentSlide - 1);
    }
  }, { passive: true });
}
