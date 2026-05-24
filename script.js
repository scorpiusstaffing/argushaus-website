/* Argushaus — minimal scroll-reveal & nav behavior */
(function () {
  'use strict';

  const revealTargets = document.querySelectorAll(
    '.hero-meta, .hero-title, .hero-sub, .hero-cta, ' +
    '.stat, .section-head, .display-h2, .lead-text, ' +
    '.body-prose, .value-item, .city-row, .method-step, .contact-card'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Tiny stagger for visual rhythm
          const delay = Math.min(i * 30, 200);
          setTimeout(() => entry.target.classList.add('is-visible'), delay);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach(el => io.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }

  // Smooth anchor scroll
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id === '#' || id === '#top') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - 60;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
