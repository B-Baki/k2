const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

// ---- Today's hours highlight + open/closed badge ----
(function () {
  const isFr = document.documentElement.lang === 'fr-CA';
  const dayNames = isFr
    ? ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
    : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const now = new Date();
  const day = now.getDay();
  const time = now.getHours() * 60 + now.getMinutes();
  const isWeekend = day === 5 || day === 6;
  const eveningClose = isWeekend ? 1320 : 1290; // 22:00 or 21:30
  const isOpen = (time >= 720 && time < 900) || (time >= 1020 && time < eveningClose);

  // Highlight today's row
  document.querySelectorAll('.hours-table tbody tr').forEach(row => {
    if (row.cells[0]?.textContent.trim() === dayNames[day]) {
      row.classList.add('hours-today');
    }
  });

  // Add open/closed badge next to the "Heures / Hours" section label
  const label = document.querySelector('#hours .section-label');
  if (label) {
    const badge = document.createElement('span');
    badge.className = 'status-badge ' + (isOpen ? 'status-open' : 'status-closed');
    badge.textContent = isOpen
      ? (isFr ? 'Ouvert maintenant' : 'Open now')
      : (isFr ? 'Fermé' : 'Closed');
    label.appendChild(badge);
  }
})();

// ---- Active nav link on scroll ----
(function () {
  const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
  const targets = [...navLinks]
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  if (!targets.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  targets.forEach(t => observer.observe(t));
})();
