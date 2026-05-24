/* Argushaus — minimal scroll-reveal */
(function () {
  'use strict';

  // Add .reveal to all hero & section content that should fade in
  const revealTargets = document.querySelectorAll(
    '.hero-meta, .hero-title, .hero-sub, .hero-cities, .hero-cta, ' +
    '.section .col-left, .section .col-right, ' +
    '.cities-header, .city, .contact-block'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

    revealTargets.forEach(el => io.observe(el));
  } else {
    // Fallback: just show everything
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }

  // Smooth anchor scrolling (older Safari fallback)
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id === '#' || id === '#top') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
