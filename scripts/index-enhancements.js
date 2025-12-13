(function() {
  const q = (sel, ctx = document) => ctx.querySelector(sel);
  const qa = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  function setupSearch() {
    const input = q('#site-search');
    const cards = qa('.link-card');
    if (!input || !cards.length) return;

    const normalize = (text) => text.toLowerCase().trim();

    input.addEventListener('input', () => {
      const term = normalize(input.value);
      cards.forEach((card) => {
        const text = normalize(card.innerText || '');
        const match = !term || text.includes(term);
        card.style.display = match ? '' : 'none';
      });
    });
  }

  function setupStats() {
    const statsGrid = q('#stats-grid');
    if (!statsGrid) return;

    const sections = qa('[data-section-key]');
    const totalLinks = qa('.link-card').length;

    statsGrid.innerHTML = sections.map((section) => {
      const key = section.getAttribute('data-section-key');
      const label = section.getAttribute('data-section-label') || key;
      const count = qa('.link-card', section).length;
      return `<li class="stat-card"><div class="stat-label">${label}</div><div class="stat-value">${count}</div></li>`;
    }).join('');

    const totalNode = q('#stats-total');
    if (totalNode) totalNode.textContent = totalLinks;
  }

  function setupNav() {
    const navLinks = qa('.top-nav a[href^="#"]');
    if (!navLinks.length) return;
    navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href').replace('#', '');
        const target = q(`#${targetId}`);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    setupSearch();
    setupStats();
    setupNav();
  });
})();
