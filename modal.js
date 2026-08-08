(function () {
  const modal = document.querySelector('[data-modal]');
  const modalWindow = modal.querySelector('.modal-window');
  const track = document.querySelector('[data-carousel-track]');
  const closeBtn = modal.querySelector('[data-modal-close]');
  const prevBtn = modal.querySelector('[data-modal-prev]');
  const nextBtn = modal.querySelector('[data-modal-next]');
  const titleEl = modal.querySelector('[data-modal-title]');
  const bodyEl = modal.querySelector('[data-modal-body]');
  const pageContent = document.querySelector('[data-page-content]');

  // Each card supplies its own title and colour theme automatically;
  // its <template> next to it supplies the unique modal body,
  // including any images you add yourself.
  const cards = Array.from(track.querySelectorAll('.carousel-card'));
  const templates = Array.from(track.querySelectorAll('template[data-modal-content]'));

  const projects = cards.map((card, i) => ({
    title: card.querySelector('h3').textContent,
    projectTheme: card.dataset.projectTheme || '',
    bodyHTML: templates[i] ? templates[i].innerHTML : '',
  }));

  let currentIndex = 0;
  let lastFocusedEl = null;

  function renderProject(index) {
    const project = projects[index];
    titleEl.textContent = project.title;
    bodyEl.innerHTML = project.bodyHTML; // each project's own content, unique per card
    modalWindow.setAttribute('data-project-theme', project.projectTheme); // picks up that project's CSS colour overrides
    modal.querySelector('.modal-scroll').scrollTop = 0; // reset scroll on nav
    currentIndex = index;
  }

  function openModal(index) {
    lastFocusedEl = document.activeElement;
    renderProject(index);
    modal.setAttribute('data-open', 'true');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (pageContent) pageContent.classList.add('is-desaturated');
    closeBtn.focus();
  }

  function closeModal() {
    modal.setAttribute('data-open', 'false');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (pageContent) pageContent.classList.remove('is-desaturated');
    if (lastFocusedEl) lastFocusedEl.focus();
  }

  function showPrev() {
    renderProject((currentIndex - 1 + projects.length) % projects.length);
  }

  function showNext() {
    renderProject((currentIndex + 1) % projects.length);
  }

  cards.forEach((card, index) => {
    card.addEventListener('click', () => openModal(index));
  });

  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (modal.getAttribute('data-open') !== 'true') return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });

  prevBtn.addEventListener('click', showPrev);
  nextBtn.addEventListener('click', showNext);
})();