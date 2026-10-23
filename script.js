// Use native hash navigation for real sections and avoid errors from placeholder links.
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');
    if (!href || href === '#') {
      event.preventDefault();
      return;
    }
    const target = document.getElementById(href.slice(1));
    if (!target) {
      event.preventDefault();
      return;
    }
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', href);
  });
});

// Reveal sections/cards as they enter the viewport, while keeping content visible
// when JavaScript's IntersectionObserver is unavailable.
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('section, .card').forEach((element) => {
    element.classList.add('reveal');
    observer.observe(element);
  });
} else {
  document.querySelectorAll('section, .card').forEach((element) => element.classList.add('is-visible'));
}
