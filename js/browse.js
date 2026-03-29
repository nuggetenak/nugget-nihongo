//  browse.js — Filter, render kartu, progress
//  Edit di sini untuk ubah logika browse.
// ══════════════════════════════════════

// ── State ──
let activeLevel = 'all', activeWeek = null, activeCat = 'all';
let searchText = '', sortBy = 'level', bookmarkMode = false;

const catLabel = {
  'adverbia':'Adverbia', 'aspek':'Aspek', 'aspek-kerja':'Aspek-kerja',
  'batas-waktu':'Batas-waktu', 'bersamaan':'Bersamaan', 'cara':'Cara',
  'definisi':'Definisi', 'demonstrativa':'Demonstrativa', 'derajat':'Derajat',
  'dugaan':'Dugaan', 'ekspektasi':'Ekspektasi', 'ekspresi':'Ekspresi',
  'enumerasi':'Enumerasi', 'formal':'Formal', 'frekuensi':'Frekuensi',
  'hampir':'Hampir', 'harapan':'Harapan', 'inferensi':'Inferensi',
  'izin':'Izin', 'kabar':'Kabar', 'kasual':'Kasual',
  'kata-benda-kualitas':'Kata-benda-kualitas', 'kausatif':'Kausatif',
  'kausatif-pasif':'Kausatif-pasif', 'keadaan':'Keadaan',
  'keadaan-hasil':'Keadaan-hasil', 'kebiasaan':'Kebiasaan',
  'keharusan':'Keharusan', 'kehendak':'Kehendak', 'keinginan':'Keinginan',
  'kemudahan':'Kemudahan', 'kemungkinan':'Kemungkinan', 'kenangan':'Kenangan',
  'keputusan':'Keputusan', 'kesempatan':'Kesempatan', 'kewajiban':'Kewajiban',
  'kondisional':'Kondisional', 'konfirmasi':'Konfirmasi', 'konjungsi':'Konjungsi',
  'konsesi':'Konsesi', 'kontras':'Kontras', 'kutipan':'Kutipan',
  'larangan':'Larangan', 'logika':'Logika', 'materi':'Materi',
  'memberi-menerima':'Memberi-menerima', 'niat':'Niat', 'nominalisasi':'Nominalisasi',
  'partikel':'Partikel', 'partikel-akhir':'Partikel-akhir', 'pasif':'Pasif',
  'pembatasan':'Pembatasan', 'penekanan':'Penekanan', 'penemuan':'Penemuan',
  'pengalaman':'Pengalaman', 'penggantian':'Penggantian', 'pengulangan':'Pengulangan',
  'penjelasan':'Penjelasan', 'penyangkalan':'Penyangkalan', 'penyesalan':'Penyesalan',
  'peran':'Peran', 'perbandingan':'Perbandingan', 'perintah':'Perintah',
  'peristiwa':'Peristiwa', 'permintaan':'Permintaan', 'permintaan-sopan':'Permintaan-sopan',
  'persepsi':'Persepsi', 'persiapan':'Persiapan', 'perspektif':'Perspektif',
  'perubahan':'Perubahan', 'perumpamaan':'Perumpamaan', 'potensi':'Potensi',
  'referensi':'Referensi', 'rentang':'Rentang', 'saran':'Saran',
  'sebab':'Sebab', 'sebab-akibat':'Sebab-akibat', 'te-bentuk':'Te-bentuk',
  'transitif-intransitif':'Transitif-intransitif', 'tujuan':'Tujuan',
  'usaha':'Usaha', 'waktu':'Waktu'
};
const levelOrder = ['n1','n2','n3','n4','n5'];
const progressEmoji = { know:'✅', unsure:'😅', forgot:'❌' };

// ── Level pills ──
function pillLevel(lv, btn) {
  bookmarkMode = false;
  activeLevel = lv; activeWeek = null; activeCat = 'all';

  // Tutup semua sort panel & reset sortOrder
  if (typeof _closeAllSortPanels === 'function') _closeAllSortPanels();
  sortOrder = 'asc';

  // Scope HANYA ke browse pills — tidak menyentuh quiz pills
  const browsePills = document.querySelectorAll('#browsePage .level-pills .pill');
  browsePills.forEach(b => {
    b.classList.remove('active-all','active-n1','active-n2','active-n3','active-n4','active-n5','active-bookmark');
  });
  btn.classList.add(lv === 'all' ? 'active-all' : `active-${lv}`);

  // Sort row: hanya muncul saat "Semua"
  const sfRow = document.getElementById('sortFilterRow');
  if (sfRow) sfRow.style.display = lv === 'all' ? '' : 'none';

  // Kategori panel: tutup selalu (browse tidak pakai kategori panel)
  const panel = document.getElementById('catPanel');
  if (panel) panel.classList.remove('show');
  catPanelOpen = false;

  // Reset cat chips
  document.querySelectorAll('#browsePage .cat-chip').forEach(b => b.className = 'cat-chip');
  const catAll = document.getElementById('cat-all');
  if (catAll) catAll.classList.add('active-all-cat');

  // Reset sort chips
  document.querySelectorAll('.sort-chip').forEach(b => b.classList.remove('active'));
  if (lv === 'all') {
    const first = document.querySelector('.sort-chip');
    if (first) first.classList.add('active');
    sortBy = 'level';
  }

  buildWeekStrip(lv);
  render();
}

function pillBookmark(btn) {
  bookmarkMode = true;
  activeLevel = 'all'; activeWeek = null; activeCat = 'all';

  // Tutup semua sort panel & reset
  if (typeof _closeAllSortPanels === 'function') _closeAllSortPanels();
  sortOrder = 'asc';

  const browsePills = document.querySelectorAll('#browsePage .level-pills .pill');
  browsePills.forEach(b => {
    b.classList.remove('active-all','active-n1','active-n2','active-n3','active-n4','active-n5','active-bookmark');
  });
  btn.classList.add('active-bookmark');

  const sfRow = document.getElementById('sortFilterRow');
  if (sfRow) sfRow.style.display = 'none';
  const panel = document.getElementById('catPanel');
  if (panel) panel.classList.remove('show');
  const strip = document.getElementById('weekStrip');
  if (strip) { strip.classList.remove('show'); strip.innerHTML = ''; }
  render();
}

// ── Week strip ──
function buildWeekStrip(lv) {
  const strip = document.getElementById('weekStrip');
  if (!strip) return;
  const meta = window.levelMeta && window.levelMeta[lv];
  if (lv === 'all' || !meta || !meta.weeks || !meta.weeks.length) {
    strip.classList.remove('show');
    strip.innerHTML = '';
    return;
  }
  strip.innerHTML = `
    <button class="week-pill active" onclick="selectWeek(null,this)">
      <span class="week-num-badge">ALL</span>
      <span class="week-theme">Semua</span>
    </button>
    ${meta.weeks.map(w => `
      <button class="week-pill${w.ready ? '' : ' coming'}"
        ${w.ready ? `onclick="selectWeek(${w.w},this)"` : 'disabled'}>
        <span class="week-num-badge">W${w.w}</span>
        <span class="week-theme">${w.theme}</span>
      </button>`).join('')}
  `;
  strip.classList.add('show');
}

function selectWeek(wk, btn) {
  activeWeek = wk;
  document.querySelectorAll('.week-pill').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  render();
}

// ── Sort chips (hanya Level & Kategori) ──
let catPanelOpen = false;

let levelSortOpen = false;
let sortOrder = 'asc'; // 'asc' = N1→N5, 'desc' = N5→N1

function _closeAllSortPanels() {
  document.getElementById('levelSortPanel').classList.remove('show');
  document.getElementById('catPanel').classList.remove('show');
  document.getElementById('sortLevelArrow').style.transform = '';
  document.getElementById('sortCatArrow').style.transform = '';
  levelSortOpen = false;
  catPanelOpen = false;
}

function setSort(s, btn) {
  if (s === 'level') {
    const wasOpen = levelSortOpen;
    _closeAllSortPanels();
    if (!wasOpen) {
      levelSortOpen = true;
      document.getElementById('levelSortPanel').classList.add('show');
      document.getElementById('sortLevelArrow').style.transform = 'rotate(180deg)';
    }
    activeCat = 'all';
    document.querySelectorAll('#catPanel .cat-chip').forEach(b => b.className = 'cat-chip');
    const catAll = document.getElementById('cat-all');
    if (catAll) catAll.classList.add('active-all-cat');
    sortBy = 'level';
    document.querySelectorAll('.sort-chip').forEach(b => b.classList.remove('active'));
    document.getElementById('sortLevelBtn').classList.add('active');
    render();

  } else if (s === 'cat') {
    const wasOpen = catPanelOpen;
    _closeAllSortPanels();
    if (!wasOpen) {
      catPanelOpen = true;
      document.getElementById('catPanel').classList.add('show');
      document.getElementById('sortCatArrow').style.transform = 'rotate(180deg)';
      sortBy = 'cat';
      document.querySelectorAll('.sort-chip').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    } else {
      sortBy = 'level';
      activeCat = 'all';
      document.querySelectorAll('#catPanel .cat-chip').forEach(b => b.className = 'cat-chip');
      const catAll = document.getElementById('cat-all');
      if (catAll) catAll.classList.add('active-all-cat');
      document.querySelectorAll('.sort-chip').forEach(b => b.classList.remove('active'));
      document.getElementById('sortLevelBtn').classList.add('active');
    }
    render();
  }
}

function setSortOrder(order, btn) {
  sortOrder = order;
  document.querySelectorAll('#levelSortPanel .cat-chip').forEach(b => b.className = 'cat-chip');
  btn.classList.add('active-all-cat');
  render();
}

// ── Kategori chips ──
function setCat(cat, btn) {
  activeCat = cat;
  document.querySelectorAll('.cat-chip').forEach(b => b.className = 'cat-chip');
  btn.classList.add(cat === 'all' ? 'active-all-cat' : 'active');
  render();
}

function filterSearch(val) { searchText = val; render(); }

// ── Render ──
function render() {
  const main = document.getElementById('main');
  if (!main) return;
  main.innerHTML = '';

  const data = window.grammarData || [];

  let filtered = data.filter(d => {
    if (bookmarkMode) return window.bookmarks && window.bookmarks.has(d.id);
    const ml = activeLevel === 'all' || d.level === activeLevel;
    const mw = activeWeek === null || d.week === activeWeek;
    const mc = activeCat === 'all' || d.cat === activeCat;
    const q  = searchText.toLowerCase();
    const ms = !q
      || d.grammar.toLowerCase().includes(q)
      || d.meaning.toLowerCase().includes(q)
      || d.reading.toLowerCase().includes(q)
      || d.desc.toLowerCase().includes(q)
      || (d.nuance && d.nuance.toLowerCase().includes(q));
    return ml && mw && mc && ms;
  });

  const el = document.getElementById('statCount');
  if (el) el.textContent = filtered.length;

  if (!filtered.length) {
    main.innerHTML = `<div class="empty-state"><div class="icon">🔍</div>Tidak ada grammar yang cocok.</div>`;
    return;
  }

  // Sort
  if (activeLevel === 'all') {
    if (sortBy === 'level') {
      const dir = sortOrder === 'desc' ? -1 : 1;
      filtered.sort((a,b) =>
        dir * (levelOrder.indexOf(a.level) - levelOrder.indexOf(b.level))
        || (a.week||0) - (b.week||0)
        || (a.day||0) - (b.day||0));
    } else if (sortBy === 'cat') {
      filtered.sort((a,b) =>
        a.cat.localeCompare(b.cat)
        || levelOrder.indexOf(a.level) - levelOrder.indexOf(b.level)
        || (a.week||0) - (b.week||0)
        || (a.day||0) - (b.day||0));
    }
  } else {
    filtered.sort((a,b) => (a.week||0) - (b.week||0) || (a.day||0) - (b.day||0));
  }

  // Group & render
  if (activeLevel !== 'all') {
    const weeks = [...new Set(filtered.map(d => d.week))].sort((a,b) => a-b);
    weeks.forEach(wk => {
      const items = filtered.filter(d => d.week === wk);
      if (!items.length) return;
      const meta = window.levelMeta[activeLevel];
      const wkInfo = meta && meta.weeks && meta.weeks.find(w => w.w === wk);
      const theme = wkInfo ? ` · ${wkInfo.theme}` : '';

      // Week header
      const wkSec = document.createElement('div');
      wkSec.className = 'section week-section';
      wkSec.innerHTML = `
        <div class="section-header ${activeLevel}">
          <div class="section-title">${activeLevel.toUpperCase()} 第${wk}週${theme}</div>
          <div class="section-count">${items.length}</div>
        </div>`;
      main.appendChild(wkSec);

      // Sub-group by day
      const days = [...new Set(items.map(d => d.day).filter(Boolean))].sort((a,b) => a-b);
      if (days.length > 1) {
        days.forEach(dy => {
          const dayItems = items.filter(d => d.day === dy);
          if (!dayItems.length) return;
          renderSection(main, activeLevel, dayItems,
            `${dy}日目`, dayItems.length, true);
        });
        // Items without day field (edge case)
        const noDayItems = items.filter(d => !d.day);
        if (noDayItems.length) renderSection(main, activeLevel, noDayItems, '—', noDayItems.length, true);
      } else {
        // Single day or no day info — render flat
        renderSection(main, activeLevel, items, `${days[0] ? days[0]+'日目' : ''}`, items.length, true);
      }
    });
  } else if (sortBy === 'cat') {
    const cats = [...new Set(filtered.map(d => d.cat))].sort();
    cats.forEach(cat => {
      const items = filtered.filter(d => d.cat === cat);
      if (!items.length) return;
      renderSection(main, items[0].level, items, catLabel[cat] || cat, items.length);
    });
  } else {
    const orderedLevels = sortOrder === 'desc' ? [...levelOrder].reverse() : levelOrder;
    orderedLevels.forEach(lv => {
      const items = filtered.filter(d => d.level === lv);
      if (!items.length) return;
      const meta = window.levelMeta[lv];
      renderSection(main, lv, items, `${lv.toUpperCase()} · ${meta ? meta.name : ''}`, items.length);
    });
  }
}

function renderSection(container, lv, items, title, count, isSubDay = false) {
  const sec = document.createElement('div');
  sec.className = isSubDay ? 'section day-subsection' : 'section';
  sec.innerHTML = `
    <div class="section-header ${isSubDay ? 'day-header' : lv}">
      <div class="section-title">${title}</div>
      <div class="section-count">${count}</div>
    </div>
    <div class="cards"></div>`;
  const grid = sec.querySelector('.cards');

  items.forEach(d => {
    const exBack = d.examples.map(e =>
      `<div class="card-example">
         <div class="jp">${e.jp}</div>
         <div class="id">${e.id}</div>
       </div>`).join('');
    const nuanceHTML = d.nuance
      ? `<div class="card-nuance"><span class="nuance-label">💡</span>${d.nuance}</div>` : '';
    const dayBadge = d.day ? `<span class="tag day-tag">${d.day}日目</span>` : '';
    const catDisplay = catLabel[d.cat] || d.cat;

    const prog = window.progress && window.progress[d.id];
    const progBadge = prog ? `<div class="card-progress-badge">${progressEmoji[prog]}</div>` : '';
    const isBookmarked = window.bookmarks && window.bookmarks.has(d.id);
    const bmBtn = `<button class="bookmark-btn${isBookmarked ? ' bookmarked' : ''}"
      onclick="toggleBookmark('${d.id}',this,event)">${isBookmarked ? '⭐' : '☆'}</button>`;

    const el = document.createElement('div');
    el.className = `flip-wrap ${d.level}${d.cat === 'dummy' ? ' dummy' : ''}`;
    el.onclick = function() { this.classList.toggle('flipped'); };
    el.innerHTML = `
      ${bmBtn}
      <div class="flip-inner">
        <div class="face front">
          ${progBadge}
          <div class="card-level-dot"></div>
          <div class="card-grammar">${d.grammar}</div>
          <div class="card-reading">${d.reading}</div>
          <div class="card-meaning">${d.meaning}</div>
          <div class="card-connection">${d.connection}</div>
          <div class="card-desc">${d.desc}</div>
          <div class="front-bottom">
            <div class="card-tags">
              <span class="tag ${d.level}">${d.level.toUpperCase()}</span>
              ${dayBadge}
              <span class="tag">${catDisplay}</span>
            </div>
            <span class="flip-hint">contoh →</span>
          </div>
          <button class="card-expand-btn"
                  onclick="event.stopPropagation(); openDetail('${d.id}')"
                  aria-label="Detail">⤢</button>
        </div>
        <div class="face back">
          <div class="back-label">Contoh Kalimat</div>
          <div class="card-examples">${exBack}</div>
          ${nuanceHTML}
        </div>
      </div>`;
    grid.appendChild(el);
  });
  container.appendChild(sec);
}

// ── Progress panel — SRS-powered ──
function updateProgressPanel() {
  const data     = window.grammarData || [];
  const srs      = window.srsData     || {};
  const panel    = document.getElementById('progressPanel');
  if (!panel) return;

  const today    = Math.floor(Date.now() / 86400000);
  const realData = data.filter(d => d.cat !== 'dummy');

  // Count anything that's been touched
  const seen = realData.filter(d => srs[d.id] && srs[d.id].reps > 0);
  if (!seen.length) { panel.classList.remove('show'); updateQuickReviewCard(); return; }
  panel.classList.add('show');

  const totalAll = realData.length;
  const totalSeen = seen.length;
  document.getElementById('progressPanelTotal').textContent =
    `${totalSeen} / ${totalAll} dipelajari`;

  // Due today banner
  const dueAll = realData.filter(d => {
    const c = srs[d.id];
    return !c || c.due <= today;
  });
  const dueBanner = document.getElementById('progressDueBanner');
  const dueCountEl = document.getElementById('dueCount');
  if (dueBanner && dueCountEl) {
    dueCountEl.textContent = dueAll.length;
    dueBanner.style.display = dueAll.length > 0 ? 'flex' : 'none';
  }

  // Per level bars — Mature / Young / Learning / (unseen = empty space)
  levelOrder.forEach(lv => {
    const lvData = realData.filter(d => d.level === lv);
    const total  = lvData.length;
    if (!total) return;

    let mature = 0, young = 0, learning = 0;
    lvData.forEach(d => {
      const c = srs[d.id];
      if (!c || c.reps === 0) return; // unseen
      if (c.interval >= 21)      mature++;
      else if (c.interval >= 7)  young++;
      else                       learning++;
    });
    const done = mature + young + learning;

    const pct = 100 / total;
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.style.width = `${val * pct}%`; };
    set(`plv-mature-${lv}`,   mature);
    set(`plv-young-${lv}`,    young);
    set(`plv-learning-${lv}`, learning);
    const cnt = document.getElementById(`plv-count-${lv}`);
    if (cnt) cnt.textContent = `${done}/${total}`;
  });

  updateQuickReviewCard();
}

function updateQuickReviewCard() {
  const today   = Math.floor(Date.now() / 86400000);
  const due     = window.srsDueToday ? window.srsDueToday() : [];
  const card    = document.getElementById('quickReviewCard');
  const divider = document.getElementById('quizDivider');
  const cnt     = document.getElementById('qrDueCount');
  if (!card) return;
  if (due.length > 0) {
    card.style.display = 'flex';
    if (divider) divider.style.display = 'flex';
    if (cnt) cnt.textContent = due.length;
  } else {
    card.style.display = 'none';
    if (divider) divider.style.display = 'none';
  }
}

// Expose for app.js
window.browseInit = function() {
  render();
  updateProgressPanel();
  updateQuickReviewCard();
};
window.render = render;
window.updateProgressPanel = updateProgressPanel;
window.updateQuickReviewCard = updateQuickReviewCard;
window.pillLevel = pillLevel;
window.pillBookmark = pillBookmark;
window.buildWeekStrip = buildWeekStrip;
window.selectWeek = selectWeek;
window.setSort = setSort;
window.setCat = setCat;
window.filterSearch = filterSearch;

