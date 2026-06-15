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

// ── Dati modal rettore ─────────────────────────────────────────
const MODAL_DATA = {
  assenti: {
    title: 'Assenti oggi — 15 giu 2026',
    color: '#FCEBEB', textColor: '#A32D2D',
    items: [
      { ini: 'MR', nome: 'Rossi Marco',     sub: '3ªA Liceo Scientifico',  badge: 'Non giustificata', bc: '#FCEBEB', tc: '#A32D2D' },
      { ini: 'LF', nome: 'Ferrari Laura',   sub: '3ªA Liceo Scientifico',  badge: 'Non giustificata', bc: '#FCEBEB', tc: '#A32D2D' },
      { ini: 'GP', nome: 'Pelli Giulia',    sub: '4ªB Liceo Scientifico',  badge: 'Giustificata',     bc: '#EAF3DE', tc: '#3B6D11' },
      { ini: 'AC', nome: 'Conti Andrea',    sub: '4ªB Liceo Scientifico',  badge: 'Giustificata',     bc: '#EAF3DE', tc: '#3B6D11' },
      { ini: 'SB', nome: 'Basso Sofia',     sub: '5ªA Liceo Scientifico',  badge: 'Non giustificata', bc: '#FCEBEB', tc: '#A32D2D' },
      { ini: 'TR', nome: 'Riva Tommaso',    sub: '2ªC Scuola Media',       badge: 'Giustificata',     bc: '#EAF3DE', tc: '#3B6D11' },
      { ini: 'EN', nome: 'Neri Elisa',      sub: '2ªC Scuola Media',       badge: 'Non giustificata', bc: '#FCEBEB', tc: '#A32D2D' },
      { ini: 'PM', nome: 'Manzoni Pietro',  sub: '1ªB Scuola Media',       badge: 'Giustificata',     bc: '#EAF3DE', tc: '#3B6D11' },
    ]
  },
  presenti: {
    title: 'Presenti oggi — 15 giu 2026',
    color: '#EAF3DE', textColor: '#3B6D11',
    items: [
      { ini: 'AB', nome: 'Basso Andrea',    sub: '3ªA Liceo Scientifico',  badge: 'Presente', bc: '#EAF3DE', tc: '#3B6D11' },
      { ini: 'CM', nome: 'Conti Martina',   sub: '3ªA Liceo Scientifico',  badge: 'Presente', bc: '#EAF3DE', tc: '#3B6D11' },
      { ini: 'DS', nome: 'De Luca Sara',    sub: '3ªA Liceo Scientifico',  badge: 'Presente', bc: '#EAF3DE', tc: '#3B6D11' },
      { ini: 'FL', nome: 'Ferrari Luca',    sub: '4ªB Liceo Scientifico',  badge: 'Presente', bc: '#EAF3DE', tc: '#3B6D11' },
      { ini: 'PG', nome: 'Greco Paolo',     sub: '4ªB Liceo Scientifico',  badge: 'Presente', bc: '#EAF3DE', tc: '#3B6D11' },
      { ini: 'LR', nome: 'Lombardi Rosa',   sub: '5ªA Liceo Scientifico',  badge: 'Presente', bc: '#EAF3DE', tc: '#3B6D11' },
      { ini: 'GN', nome: 'Neri Giorgia',    sub: '5ªA Liceo Scientifico',  badge: 'Presente', bc: '#EAF3DE', tc: '#3B6D11' },
      { ini: 'VS', nome: 'Serra Valeria',   sub: '2ªC Scuola Media',       badge: 'Presente', bc: '#EAF3DE', tc: '#3B6D11' },
    ]
  },
  ritardi: {
    title: 'Ritardi — giugno 2026',
    color: '#FAEEDA', textColor: '#854F0B',
    items: [
      { ini: 'MR', nome: 'Rossi Marco',     sub: '3ªA · 28 mag, 1ª ora',   badge: '2 ritardi',  bc: '#FAEEDA', tc: '#854F0B' },
      { ini: 'GP', nome: 'Pelli Giulia',    sub: '4ªB · 5 giu, 2ª ora',    badge: '1 ritardo',  bc: '#FAEEDA', tc: '#854F0B' },
      { ini: 'AC', nome: 'Conti Andrea',    sub: '4ªB · 10 giu, 1ª ora',   badge: '1 ritardo',  bc: '#FAEEDA', tc: '#854F0B' },
      { ini: 'SB', nome: 'Basso Sofia',     sub: '5ªA · 3 giu, 1ª ora',    badge: '3 ritardi',  bc: '#FAEEDA', tc: '#854F0B' },
      { ini: 'TR', nome: 'Riva Tommaso',    sub: '2ªC · 12 giu, 1ª ora',   badge: '1 ritardo',  bc: '#FAEEDA', tc: '#854F0B' },
    ]
  },
  giustifiche: {
    title: 'Giustifiche in attesa',
    color: '#E6F1FB', textColor: '#185FA5',
    items: [
      { ini: 'MR', nome: 'Rossi Marco',     sub: '3ªA · Assenza 2 mag',    badge: 'In attesa',  bc: '#E6F1FB', tc: '#185FA5' },
      { ini: 'LF', nome: 'Ferrari Laura',   sub: '3ªA · Assenza 15 giu',   badge: 'In attesa',  bc: '#E6F1FB', tc: '#185FA5' },
      { ini: 'SB', nome: 'Basso Sofia',     sub: '5ªA · Assenza 10 giu',   badge: 'In attesa',  bc: '#E6F1FB', tc: '#185FA5' },
      { ini: 'EN', nome: 'Neri Elisa',      sub: '2ªC · Assenza 8 giu',    badge: 'In attesa',  bc: '#E6F1FB', tc: '#185FA5' },
    ]
  }
};

function openModal(type) {
  const data = MODAL_DATA[type];
  if (!data) return;

  document.getElementById('modal-title').textContent = data.title;

  const body = document.getElementById('modal-body');
  body.innerHTML = data.items.map(it => `
    <div class="modal-row">
      <div class="modal-avatar" style="background:${it.bc};color:${it.tc}">${it.ini}</div>
      <div class="modal-info">
        <div class="modal-nome">${it.nome}</div>
        <div class="modal-sub">${it.sub}</div>
      </div>
      <div class="modal-badge" style="background:${it.bc};color:${it.tc}">${it.badge}</div>
    </div>
  `).join('');

  document.getElementById('modal-overlay').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').style.display = 'none';
  document.body.style.overflow = '';
}

// Chiudi modal con tasto Esc
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

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
