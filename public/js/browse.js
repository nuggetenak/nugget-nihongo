//  browse.js — Filter, render kartu, progress
//  Edit di sini untuk ubah logika browse.
// ══════════════════════════════════════

// ── State ──
let activeLevel = 'all', activeWeek = null, activeCat = 'all';
let searchText = '', sortBy = 'level', bookmarkMode = false;

const catLabel = {
  // Architecture v3 — Taxonomy v2 L1 canonical cat labels
  'copula':'Kopula', 'existence':'Eksistensi', 'predicate-adjective':'Predikat Adjektif',
  'te-form-use':'Bentuk Te', 'negative':'Negatif', 'past-tense':'Bentuk Lampau',
  'progressive-state':'Progresif/Keadaan', 'potential':'Potensial',
  'passive':'Pasif', 'causative':'Kausatif', 'volitional-intention':'Volisional/Niat',
  'permission-prohibition':'Izin/Larangan', 'obligation-necessity':'Keharusan',
  'desire-want':'Keinginan', 'conjecture-possibility':'Dugaan/Kemungkinan',
  'hearsay-report':'Kabar/Laporan',
  'conditional-to':'Kondisional (と)', 'conditional-ba':'Kondisional (ば)',
  'conditional-tara':'Kondisional (たら)', 'conditional-nara':'Kondisional (なら)',
  'reason-cause':'Sebab/Akibat', 'contrast-concession':'Kontras/Konsesi',
  'purpose':'Tujuan', 'sequential-temporal':'Urutan/Waktu', 'listing-addition':'Daftar/Tambahan',
  'limitation-only':'Pembatasan', 'extent-degree':'Tingkat/Derajat', 'comparison':'Perbandingan',
  'nominalization':'Nominalisasi', 'quotation-thought':'Kutipan/Pikiran',
  'relative-clause':'Klausa Relatif',
  'completion-regret':'Penyelesaian/Penyesalan', 'inception-continuation':'Awal/Kelanjutan',
  'directional-aspect':'Aspek Arah',
  'sonkeigo-pattern':'Sonkeigo', 'kenjougo-pattern':'Kenjougo', 'teineigo-pattern':'Teineigo',
  'sentence-final-modality':'Modalitas Akhir', 'sentence-final-request':'Permintaan/Perintah',
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
// Super-category mapping — English cat values from grammar data
const SUPER_CAT_MAP = {
  'bentuk-kata':       ['te-form-use','verb-form','passive','causative','directional-aspect','relative-clause'],
  'waktu-aspek':       ['sequential-temporal','progressive-state','inception-continuation','past-tense','waktu','kebiasaan','bersamaan'],
  'modal-ekspresi':    ['conditional-tara','conditional-ba','conditional-nara','kondisional','obligation-necessity','keharusan','permission-prohibition','conjecture-possibility','kemungkinan','dugaan','potential'],
  'hubungan-kalimat':  ['reason-cause','contrast-concession','kontras','konsesi','comparison','perbandingan','listing-addition','enumerasi','negative','logika','limitation-only','pembatasan'],
  'komunikasi-sosial': ['sentence-final-request','sentence-final-modality','teineigo-pattern','quotation-thought','hearsay-report'],
  'perasaan-niat':     ['desire-want','volitional-intention','completion-regret','purpose','perasaan','keputusan','cara'],
  'partikel-struktur': ['particle','nominalization','copula','predicate-adjective','existence','interrogative','referensi'],
  'derajat-ekspresi':  ['expression','adverb','extent-degree','penekanan','rentang','pembatasan'],
};
let activeSuperCat = null;
let _currentRevealedEl = null; // accordion: only one card open at a time

function setSuperCat(superKey, btn) {
  activeSuperCat = superKey;
  activeCat = 'all'; // use super-cat expansion instead
  document.querySelectorAll('.supercat-chip, .cat-chip').forEach(b => {
    b.className = b.classList.contains('supercat-chip') ? 'supercat-chip' : 'cat-chip';
  });
  btn.classList.add('active');
  render();
}

function setCat(cat, btn) {
  activeCat = cat;
  activeSuperCat = null;
  document.querySelectorAll('.supercat-chip, .cat-chip').forEach(b => {
    b.className = b.classList.contains('supercat-chip') ? 'supercat-chip' : 'cat-chip';
  });
  btn.classList.add(cat === 'all' ? 'active-all-cat' : 'active');
  render();
}

function filterSearch(val) { searchText = val; render(); }

// ── Render ──
// ── Skeleton helper ──────────────────────────────────────────────
function showSkeleton(container, count) {
  count = count || 6;
  var html = '<div class="sk-section">'
    + '<div class="sk-section-hdr sk-shimmer"></div>'
    + '<div class="sk-grid">';
  for (var i = 0; i < count; i++) {
    html += '<div class="sk-card">'
      + '<div class="sk-line sk-line--md sk-shimmer"></div>'
      + '<div class="sk-line sk-line--lg sk-shimmer"></div>'
      + '<div class="sk-line sk-line--sm sk-shimmer"></div>'
      + '<div style="display:flex;gap:6px;margin-top:auto;padding-top:0.5rem">'
      + '<div class="sk-line sk-line--tag sk-shimmer"></div>'
      + '<div class="sk-line sk-line--tag sk-shimmer"></div>'
      + '</div>'
      + '</div>';
  }
  html += '</div></div>';
  container.innerHTML = html;
}

function render() {
  const main = document.getElementById('main');
  if (!main) return;
  main.innerHTML = '';

  const data = (window.grammarData || []).filter(Boolean);

  // Update grammar count badge
  const gBadge = document.getElementById('bstGrammarCount');
  if (gBadge) gBadge.textContent = data.length;

  let filtered = data.filter(d => {
    if (bookmarkMode) return window.bookmarks && window.bookmarks.has(d.id);
    const ml = activeLevel === 'all' || d.level === activeLevel;
    const mw = activeWeek === null || d.week === activeWeek;
    const mc = activeCat === 'all'
      ? (activeSuperCat ? (SUPER_CAT_MAP[activeSuperCat] || []).includes(d.cat) : true)
      : d.cat === activeCat;
    const q  = searchText.toLowerCase();
    const ms = !q
      || (d.grammar && d.grammar.toLowerCase().includes(q))
      || (d.meaning && d.meaning.toLowerCase().includes(q))
      || (d.reading && d.reading.toLowerCase().includes(q))
      || (d.desc && d.desc.toLowerCase().includes(q))
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
        dir * (levelOrder.indexOf(a && a.level) - levelOrder.indexOf(b && b.level))
        || (a.week||0) - (b.week||0)
        || (a.day||0) - (b.day||0));
    } else if (sortBy === 'cat') {
      filtered.sort((a,b) =>
        a.cat.localeCompare(b.cat)
        || levelOrder.indexOf(a && a.level) - levelOrder.indexOf(b && b.level)
        || (a.week||0) - (b.week||0)
        || (a.day||0) - (b.day||0));
    }
  } else {
    filtered.sort((a,b) => (a.week||0) - (b.week||0) || (a.day||0) - (b.day||0));
  }

  // Group & render
  if (activeLevel !== 'all') {
    // Architecture v3: global grammar has no week field — group by cat
    const hasWeeks = filtered.some(d => d.week);
    if (hasWeeks) {
      // Legacy week-based grouping (book lens view)
      const weeks = [...new Set(filtered.map(d => d.week))].sort((a,b) => a-b);
      weeks.forEach(wk => {
        const items = filtered.filter(d => d.week === wk);
        if (!items.length) return;
        const meta = window.levelMeta[activeLevel];
        const wkInfo = meta && meta.weeks && meta.weeks.find(w => w.w === wk);
        const theme = wkInfo ? ` · ${wkInfo.theme}` : '';

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
    } else {
      // Architecture v3: cat-based grouping for global grammar data
      filtered.sort((a,b) => (a.cat || '').localeCompare(b.cat || ''));
      const cats = [...new Set(filtered.map(d => d.cat))].sort();
      cats.forEach(cat => {
        const items = filtered.filter(d => d.cat === cat);
        if (!items.length) return;
        renderSection(main, activeLevel, items, catLabel[cat] || cat, items.length);
      });
    }
  } else if (sortBy === 'cat') {
    const cats = [...new Set(filtered.map(d => d.cat))].sort();
    cats.forEach(cat => {
      const items = filtered.filter(d => d.cat === cat);
      if (!items.length) return;
      renderSection(main, items[0].level || 'n5', items, catLabel[cat] || cat, items.length);
    });
  } else {
    const orderedLevels = sortOrder === 'desc' ? [...levelOrder].reverse() : levelOrder;
    orderedLevels.forEach(lv => {
      const items = filtered.filter(d => d && d.level === lv);
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
    const exHTML = d.examples.map(e =>
      `<div class="card-example">
         <div class="jp">${e.jp}</div>
         <div class="id">${e.id}</div>
       </div>`).join('');
    const nuanceHTML = d.nuance
      ? `<div class="peel-nuance"><span class="nuance-label">💡</span>${d.nuance}</div>` : '';
    const dayBadge = d.day ? `<span class="tag day-tag">${d.day}日目</span>` : '';
    const catDisplay = catLabel[d.cat] || d.cat;
    const lv = d.level || 'n5';

    // SRS status dot
    const srs = window.srsData && window.srsData[d.id];
    let statusLabel = 'Baru', statusClass = 'new';
    if (srs) {
      if (srs.interval >= 21)     { statusLabel = 'Lancar';  statusClass = 'mature'; }
      else if (srs.interval >= 7) { statusLabel = 'Ingat';   statusClass = 'young'; }
      else                        { statusLabel = 'Belajar'; statusClass = 'learning'; }
    }

    const isBookmarked = window.bookmarks && window.bookmarks.has(d.id);

    const el = document.createElement('div');
    el.className = `peel-wrap ${lv}${d.cat === 'dummy' ? ' dummy' : ''}`;
    el.innerHTML = `
      <!-- Back layer: meaning revealed from below -->
      <div class="peel-back">
        <div class="peel-back-examples">${exHTML}</div>
        ${nuanceHTML}
        <div class="peel-back-label">ARTI</div>
        <div class="peel-back-meaning">${d.meaning}</div>
      </div>
      <!-- Front ticket: lifts on hold, locks on Peek btn -->
      <div class="peel-front">
        <div class="peel-top-row">
          <span class="peel-level-pill ${lv}">${lv.toUpperCase()}</span>
          <div style="flex:1"></div>
          <span class="peel-status ${statusClass}">
            <span class="peel-status-dot"></span>${statusLabel}
          </span>
          <div class="peel-actions">
            <button class="peel-bm-btn${isBookmarked ? ' bookmarked' : ''}"
              onclick="event.stopPropagation(); toggleBookmark('${d.id}',this,event)"
              aria-label="Bookmark">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="${isBookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </button>
            <button class="peel-detail-btn"
              onclick="event.stopPropagation(); openDetail('${d.id}')"
              aria-label="Detail">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
            </button>
          </div>
        </div>
        <div class="peel-grammar">${d.grammar}</div>
        <div class="peel-reading">${d.reading}</div>
        <div class="peel-bottom-row">
          <span class="peel-meta">${dayBadge ? d.day + '日目 · ' : ''}${catDisplay}</span>
          <button class="peel-peek-btn peel-hint--peek"
            onclick="event.stopPropagation();"
            aria-label="Peek">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            Peek
          </button>
          <button class="peel-peek-btn peel-hint--close" style="display:none"
            onclick="event.stopPropagation();"
            aria-label="Tutup">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
            Tutup
          </button>
        </div>
      </div>`;

    // ── Peel interaction ─────────────────────────────────────────
    const front     = el.querySelector('.peel-front');
    const peekBtn   = el.querySelector('.peel-hint--peek');
    const closeBtn  = el.querySelector('.peel-hint--close');
    let revealed = false;

    function setRevealed(r) {
      // Accordion: close previous card before opening this one
      if (r && _currentRevealedEl && _currentRevealedEl !== el) {
        const prev = _currentRevealedEl;
        const prevClose = prev.querySelector('.peel-hint--close');
        const prevPeek  = prev.querySelector('.peel-hint--peek');
        prev.classList.remove('revealed', 'peeking');
        if (prevClose) prevClose.style.display = 'none';
        if (prevPeek)  prevPeek.style.display  = 'inline-flex';
      }
      revealed = r;
      el.classList.toggle('revealed', r);
      el.classList.remove('peeking');
      peekBtn.style.display  = r ? 'none'        : 'inline-flex';
      closeBtn.style.display = r ? 'inline-flex' : 'none';
      _currentRevealedEl = r ? el : (_currentRevealedEl === el ? null : _currentRevealedEl);
    }

    // Peek btn tap = permanent reveal/hide
    peekBtn.addEventListener('click',  function() { setRevealed(true);  });
    closeBtn.addEventListener('click', function() { setRevealed(false); });

    // Hold on peekBtn ONLY = temporary peek (scroll-safe, rest of card untouched)
    peekBtn.addEventListener('touchstart', function(e) {
      e.stopPropagation();
      if (!revealed) el.classList.add('peeking');
    }, { passive: true });
    peekBtn.addEventListener('touchend',    function() { el.classList.remove('peeking'); });
    peekBtn.addEventListener('touchcancel', function() { el.classList.remove('peeking'); });

    // Desktop: hold on peekBtn only
    peekBtn.addEventListener('mousedown',  function(e) { e.stopPropagation(); if (!revealed) el.classList.add('peeking'); });
    peekBtn.addEventListener('mouseup',    function() { el.classList.remove('peeking'); });
    peekBtn.addEventListener('mouseleave', function() { el.classList.remove('peeking'); });

    grid.appendChild(el);
  });
  container.appendChild(sec);
}

// ── Progress panel — SRS-powered ──
function updateProgressPanel() {
  const data     = (window.grammarData || []).filter(Boolean);
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
  // Also update Latihan hero due count
  const heroCount = document.getElementById('latihanHeroDueCount');
  if (heroCount) {
    heroCount.textContent = dueAll.length > 0
      ? dueAll.length + ' kartu nunggu'
      : 'Semua beres! 🎉';
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
window.setSuperCat = setSuperCat;
window.filterSearch = filterSearch;


// ── Category accordion toggle ─────────────────────────────────────
window.toggleCatGroup = function (hdr) {
  var body = hdr.nextElementSibling;
  var isOpen = hdr.classList.contains('open');
  hdr.classList.toggle('open', !isOpen);
  body.classList.toggle('open', !isOpen);
};
