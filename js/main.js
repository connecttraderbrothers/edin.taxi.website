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

// â"€â"€â"€ COVERAGE CAROUSEL (MOBILE) â"€â"€â"€
const carouselSlides = document.querySelectorAll('.coverage-carousel-slide');
const carouselDots = document.querySelectorAll('.coverage-dot');
let currentSlide = 0;

function goToSlide(index) {
  carouselSlides.forEach(s => s.classList.remove('active'));
  carouselDots.forEach(d => d.classList.remove('active'));
  carouselSlides[index].classList.add('active');
  carouselDots[index].classList.add('active');
  currentSlide = index;
}

carouselDots.forEach(dot => {
  dot.addEventListener('click', () => goToSlide(Number(dot.dataset.index)));
});

// Swipe support
const carouselTrack = document.querySelector('.coverage-carousel-track');
let touchStartX = 0;

if (carouselTrack) {
  carouselTrack.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  carouselTrack.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentSlide < carouselSlides.length - 1) goToSlide(currentSlide + 1);
      else if (diff < 0 && currentSlide > 0) goToSlide(currentSlide - 1);
    }
  }, { passive: true });

  // Tap on slide to show as section background (click changes bg briefly)
  carouselSlides.forEach(slide => {
    slide.addEventListener('click', () => {
      const area = slide.dataset.area;
      const section = document.querySelector('.coverage-section');
      const img = slide.querySelector('img');
      if (img) {
        section.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${img.src}')`;
        section.style.backgroundSize = 'cover';
        section.style.backgroundPosition = 'center';
      }
    });
  });
}
