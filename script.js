/* Argushaus — page counter + reveal motion */
(function () {
  'use strict';

  /* ---------- Reveal animations ---------- */
  const revealTargets = document.querySelectorAll(
    '.label, .display, .body-line, .link-underline, ' +
    '.cities-stack, .cities-note, .contact-list, .hero-cities'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  // Hero headline is special-cased in CSS via .is-visible class
  const heroHeadline = document.querySelector('.hero-headline');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });

    revealTargets.forEach(el => io.observe(el));
    if (heroHeadline) io.observe(heroHeadline);
  } else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
    if (heroHeadline) heroHeadline.classList.add('is-visible');
  }

  /* ---------- Page counter (updates on scroll) ---------- */
  const counterEl = document.getElementById('counter-current');
  const screens   = Array.from(document.querySelectorAll('.screen[data-index]'));

  if (counterEl && screens.length && 'IntersectionObserver' in window) {
    const counterIO = new IntersectionObserver((entries) => {
      // Find the most-visible screen
      let bestRatio = 0;
      let bestIndex = counterEl.textContent;
      entries.forEach(entry => {
        if (entry.intersectionRatio > bestRatio) {
          bestRatio = entry.intersectionRatio;
          bestIndex = entry.target.getAttribute('data-index');
        }
      });
      // Cross-check all screens to find current most-visible
      const currentBest = screens
        .map(s => {
          const rect = s.getBoundingClientRect();
          const visible = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
          return { idx: s.getAttribute('data-index'), v: visible };
        })
        .sort((a, b) => b.v - a.v)[0];
      if (currentBest && currentBest.idx !== counterEl.textContent) {
        counterEl.style.opacity = '0';
        setTimeout(() => {
          counterEl.textContent = currentBest.idx;
          counterEl.style.opacity = '1';
        }, 120);
      }
    }, { threshold: [0, 0.25, 0.5, 0.75, 1] });

    screens.forEach(s => counterIO.observe(s));
  }

  /* ---------- Smooth anchor scroll (offset for fixed nav) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id === '#' || id === '#top') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - 20;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
