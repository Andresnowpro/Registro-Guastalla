// ── Utenti hardcoded ───────────────────────────────────────────
const USERS = {
  'studente':  { password: 'studente1234',  role: 'studente',  label: 'Studente' },
  'genitore':  { password: 'genitore1234',  role: 'genitore',  label: 'Genitore' },
  'docente':   { password: 'docente1234',   role: 'docente',   label: 'Docente'  },
  'rettore':   { password: 'rettore1234',   role: 'rettore',   label: 'Rettore'  },
};

// ── Login ──────────────────────────────────────────────────────
function doLogin() {
  const usr = document.getElementById('usr').value.trim().toLowerCase();
  const pwd = document.getElementById('pwd').value;
  const errEl = document.getElementById('login-error');

  const user = USERS[usr];
  if (!user || user.password !== pwd) {
    errEl.style.display = 'flex';
    document.getElementById('pwd').value = '';
    return;
  }

  errEl.style.display = 'none';
  sessionStorage.setItem('role', user.role);
  sessionStorage.setItem('label', user.label);
  showApp(user.role, user.label);
}

// Invio con tasto Enter
document.addEventListener('DOMContentLoaded', () => {
  ['usr', 'pwd'].forEach(id => {
    document.getElementById(id).addEventListener('keydown', e => {
      if (e.key === 'Enter') doLogin();
    });
  });

  // Ripristina sessione se già loggato
  const savedRole = sessionStorage.getItem('role');
  const savedLabel = sessionStorage.getItem('label');
  if (savedRole) {
    showApp(savedRole, savedLabel);
  }

  buildCalendar();
  buildPresenze();
});

// ── Mostra app ─────────────────────────────────────────────────
function showApp(role, label) {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('app').style.display = 'block';

  // Badge ruolo in topbar
  document.getElementById('topbar-role-badge').textContent = label;

  // Mostra solo la view del ruolo
  document.querySelectorAll('.section-view').forEach(v => v.classList.remove('active'));
  const view = document.getElementById('view-' + role);
  if (view) view.classList.add('active');
}

// ── Logout ─────────────────────────────────────────────────────
function doLogout() {
  sessionStorage.clear();
  document.getElementById('app').style.display = 'none';
  document.getElementById('login-screen').style.display = 'flex';
  document.getElementById('usr').value = '';
  document.getElementById('pwd').value = '';
  document.getElementById('login-error').style.display = 'none';
}

// ── Calendario presenze (vista Genitore) ───────────────────────
function buildCalendar() {
  const grid = document.getElementById('cal-grid');
  if (!grid) return;

  const days = ['L', 'M', 'M', 'G', 'V', 'S', 'D'];
  const absent    = [2, 15];
  const justified = [3];
  const today = 15;

  days.forEach(d => {
    const el = document.createElement('div');
    el.className = 'cal-day-label';
    el.textContent = d;
    grid.appendChild(el);
  });

  for (let i = 1; i <= 30; i++) {
    const el = document.createElement('div');
    el.className = 'cal-day';
    el.textContent = i;

    if (absent.includes(i))       { el.style.background = '#FCEBEB'; el.style.color = '#A32D2D'; }
    else if (justified.includes(i)){ el.style.background = '#EAF3DE'; el.style.color = '#3B6D11'; }
    else                           { el.style.background = '#f5f5f7'; el.style.color = '#1d1d1f'; }

    if (i === today) el.classList.add('today');
    grid.appendChild(el);
  }
}

// ── Registro presenze (vista Docente) ──────────────────────────
function buildPresenze() {
  const grid = document.getElementById('presenze-grid');
  if (!grid) return;

  const studenti = [
    'Basso A.','Conti M.','De Luca S.','Ferrari L.',
    'Greco P.','Lombardi R.','Manzoni G.','Neri C.',
    'Pelli A.','Riva T.','Rossi M.','Serra V.'
  ];
  const assenti = [2, 7];

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
