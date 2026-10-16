/* Small, dependency-free enhancements. All site copy is editable in index.html. */
(function () {
  'use strict';
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('primary-nav');
  const projectCards = document.querySelectorAll('.project-card');
  const projectGrid = document.getElementById('project-grid');
  const certFilters = document.querySelectorAll('.cert-filter-btn');
  const certCards = document.querySelectorAll('.cert-card');
  const certGallery = document.querySelector('.cert-gallery');
  const projectsSection = document.getElementById('projects');
  const experienceSection = document.getElementById('experience');
  const skillsSection = document.getElementById('skills');
  const certificatesSection = document.getElementById('certificates');

  if (!(projectsSection instanceof HTMLElement) || !(experienceSection instanceof HTMLElement)
      || !(skillsSection instanceof HTMLElement) || !(certificatesSection instanceof HTMLElement)) {
    throw new Error('Portfolio section order could not be initialized.');
  }
  // Keep experience before featured work and certificates below the technical stack.
  projectsSection.before(experienceSection);
  certificatesSection.before(skillsSection);

  // Sort by the date printed on the certificate; year-only dates sort to Jan 1.
  [...certCards]
    .sort((a, b) => b.dataset.date.localeCompare(a.dataset.date))
    .forEach(card => certGallery.appendChild(card));

  [...projectCards]
    .sort((a, b) => {
      const dateA = a.dataset.date;
      const dateB = b.dataset.date;
      if (!dateA && !dateB) return 0;
      if (!dateA) return -1;
      if (!dateB) return 1;
      return dateB.localeCompare(dateA);
    })
    .forEach(card => projectGrid.appendChild(card));
  const irrigationCard = projectGrid.querySelector('.project-card-irrigation');
  const lastProjectCard = projectGrid.lastElementChild;
  if (irrigationCard && lastProjectCard && irrigationCard !== lastProjectCard) {
    projectGrid.insertBefore(irrigationCard, lastProjectCard);
  }

  // Use saved theme if one has been selected, otherwise display dark by default.
  try {
    if (localStorage.getItem('portfolio-theme') === 'light') root.dataset.theme = 'light';
  } catch (e) { /* localStorage may be unavailable in private/local file contexts. */ }
  const setThemeLabel = () => themeToggle.setAttribute('aria-label', root.dataset.theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
  setThemeLabel();
  themeToggle.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    try { localStorage.setItem('portfolio-theme', root.dataset.theme); } catch (e) { /* optional */ }
    setThemeLabel();
  });

  // Accessible mobile menu.
  menuToggle.addEventListener('click', () => {
    const opened = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(opened));
    menuToggle.setAttribute('aria-label', opened ? 'Close menu' : 'Open menu');
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
  }));

  document.querySelectorAll('.project-open[data-dialog]').forEach(button => {
    const dialog = document.getElementById(button.dataset.dialog);
    if (!(dialog instanceof HTMLDialogElement)) {
      throw new Error(`Details dialog not found: ${button.dataset.dialog}`);
    }
    const closeButton = dialog.querySelector('.dialog-close');
    if (!(closeButton instanceof HTMLButtonElement)) {
      throw new Error(`Details dialog close button not found: ${button.dataset.dialog}`);
    }
    button.addEventListener('click', () => dialog.showModal());
    closeButton.addEventListener('click', () => dialog.close());
    dialog.addEventListener('cancel', event => {
      event.preventDefault();
      if (dialog.open) dialog.close();
    });
    dialog.addEventListener('click', event => {
      if (event.target === dialog) dialog.close();
    });
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      document.querySelectorAll('.project-dialog[open]').forEach(dialog => dialog.close());
    }
  }, true);

  certFilters.forEach(button => {
    button.addEventListener('click', () => {
      const chosen = button.dataset.filter;
      certFilters.forEach(other => {
        const isActive = other === button;
        other.classList.toggle('active', isActive);
        other.setAttribute('aria-pressed', String(isActive));
      });
      certCards.forEach(card => { card.hidden = chosen !== 'all' && card.dataset.category !== chosen; });
    });
  });

  // Tiny scroll progress indicator.
  let scrollPending = false;
  function refreshScroll() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    document.getElementById('page-progress').style.width = (scrollable > 0 ? window.scrollY / scrollable * 100 : 0) + '%';
    scrollPending = false;
  }
  window.addEventListener('scroll', () => {
    if (!scrollPending) { scrollPending = true; window.requestAnimationFrame(refreshScroll); }
  }, { passive: true });
  refreshScroll();

  // Set current year automatically.
  document.getElementById('year').textContent = new Date().getFullYear();
})();
