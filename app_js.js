// ── Role switcher ──────────────────────────────────────────────
function setRole(role, el) {
  document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  document.querySelectorAll('.section-view').forEach(v => v.classList.remove('active'));
  document.getElementById('view-' + role).classList.add('active');
}

// ── Calendario presenze (vista Genitore) ───────────────────────
function buildCalendar() {
  const grid = document.getElementById('cal-grid');
  if (!grid) return;

  const days = ['L', 'M', 'M', 'G', 'V', 'S', 'D'];
  const absent  = [2, 15];   // giornate assenza non giustificata
  const justified = [3];     // giornate giustificate
  const today = 15;

  // intestazioni
  days.forEach(d => {
    const el = document.createElement('div');
    el.className = 'cal-day-label';
    el.textContent = d;
    grid.appendChild(el);
  });

  // celle giorni (giugno = 30 giorni, inizia di lunedì)
  for (let i = 1; i <= 30; i++) {
    const el = document.createElement('div');
    el.className = 'cal-day';
    el.textContent = i;

    if (absent.includes(i))     { el.style.background = '#FCEBEB'; el.style.color = '#A32D2D'; }
    else if (justified.includes(i)) { el.style.background = '#EAF3DE'; el.style.color = '#3B6D11'; }
    else                        { el.style.background = '#f5f5f7'; el.style.color = '#1d1d1f'; }

    if (i === today) el.classList.add('today');
    grid.appendChild(el);
  }
}

// ── Registro presenze (vista Docente) ──────────────────────────
function buildPresenze() {
  const grid = document.getElementById('presenze-grid');
  if (!grid) return;

  const studenti = [
    'Basso A.', 'Conti M.', 'De Luca S.', 'Ferrari L.',
    'Greco P.', 'Lombardi R.', 'Manzoni G.', 'Neri C.',
    'Pelli A.', 'Riva T.', 'Rossi M.', 'Serra V.'
  ];
  const assenti = [2, 7]; // indici degli assenti

  studenti.forEach((nome, i) => {
    const isAssente = assenti.includes(i);
    const item = document.createElement('div');
    item.className = 'presenza-item';

    const nameEl = document.createElement('span');
    nameEl.className = 'presenza-nome';
    nameEl.textContent = nome;

    const badge = document.createElement('div');
    badge.className = 'presenza-badge ' + (isAssente ? 'pb-a' : 'pb-p');
    badge.textContent = isAssente ? 'A' : 'P';

    // toggle presenza al click
    item.addEventListener('click', () => {
      const isA = badge.classList.contains('pb-a');
      badge.classList.toggle('pb-a', !isA);
      badge.classList.toggle('pb-p', isA);
      badge.textContent = isA ? 'P' : 'A';
    });

    item.appendChild(nameEl);
    item.appendChild(badge);
    grid.appendChild(item);
  });
}

// ── Init ───────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  buildCalendar();
  buildPresenze();
});
