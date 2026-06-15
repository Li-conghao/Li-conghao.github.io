/*
 * Shared JavaScript for the multi‑page site.
 *
 * Features:
 * 1. Fade‑in animations: elements with the .fade-in class will fade into view
 *    when they scroll into the viewport. This uses IntersectionObserver.
 * 2. Active navigation highlighting: the link corresponding to the current
 *    page’s pathname is given an 'active' class so users always know where
 *    they are in the site hierarchy.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Fade‑in observer
  const fadeElements = document.querySelectorAll('.fade-in');
  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  fadeElements.forEach(el => fadeObserver.observe(el));

  // Highlight nav item based on current path
  const currentPath = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    // If link ends with currentPath or index.html when path is empty
    const href = link.getAttribute('href');
    const linkPath = href.split('/').pop();
    if (currentPath === '' && linkPath === 'index.html') {
      link.classList.add('active');
    } else if (currentPath === linkPath) {
      link.classList.add('active');
    }
  });
});