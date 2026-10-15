// ══════════════════════════════════════════════════════
//  js/browse-vocab.js — Nugget Nihongo
//  Vocab Browse Tab: filter by JLPT, POS, search, Buku
//  Load SETELAH vocab-index.js dan browse.js
//  v14.5 — TASK-UI-BOOK-FILTER + TASK-UI-BOOK-PROGRESS
// ══════════════════════════════════════════════════════

(function () {

// ── State ───────────────────────────────────────────────
let vbLevel    = 'all';
let vbPos      = 'all';
let vbSearch   = '';
let vbBook     = 'all';  // 'all' | book key e.g. 'minna-no-nihongo-1'
let vbChapters = [];      // [] = semua chapter buku; [1,2,3] = chapter tertentu

// ── Book metadata (label + chapter/unit count) ──────────
const BOOK_META = {
  'minna-no-nihongo-1': { label: 'Minna I',      icon: '📘', chapters: 25, unit: 'Bab'  },
  'minna-no-nihongo-2': { label: 'Minna II',     icon: '📗', chapters: 25, unit: 'Bab'  },
  'irodori-a1'        : { label: 'Irodori A1',   icon: '🌸', chapters: 9,  unit: 'Unit' },
  'irodori-a2-1'      : { label: 'Irodori A2-1', icon: '🌺', chapters: 9,  unit: 'Unit' },
  'irodori-a2-2'      : { label: 'Irodori A2-2', icon: '🌻', chapters: 9,  unit: 'Unit' },
};

const POS_LABEL = {
  'verb-u'   : 'Kata Kerja',
  'verb-ru'  : 'Kata Kerja',
  'verb-suru': 'Kata Kerja',
  'verb-kuru': 'Kata Kerja',
  'noun'     : 'Kata Benda',
  'i-adj'    : 'Kata Sifat い',
  'na-adj'   : 'Kata Sifat な',
  'adverb'   : 'Kata Keterangan',
  'particle' : 'Partikel',
  'expr'     : 'Ekspresi',
  'conj'     : 'Konjungsi',
  'counter'  : 'Kata Bilangan',
  'pronoun'  : 'Kata Ganti',
};

// ── Switch between Grammar and Vocab browse tabs ────────
window.switchBrowseTab = function (tab, btn) {
  const grammarEls = [
    'main', 'progressPanel', 'catPanel',
    'levelSortPanel', 'sortFilterRow', 'weekStrip', 'searchInput',
  ];

  document.querySelectorAll('.browse-subtab').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const filterBar  = document.querySelector('#browsePage .filter-bar');
  const searchRow  = document.querySelector('#browsePage .search-row');
  const vocabPanel = document.getElementById('vocabBrowsePanel');

  if (tab === 'vocab') {
    if (filterBar) filterBar.style.display = 'none';
    if (searchRow) searchRow.style.display = 'none';
    grammarEls.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
    if (vocabPanel) vocabPanel.style.display = '';
    _vbRenderBookPanel();
    _vbRenderProgress();
    _vbRender();
    _updateBadge();
  } else {
    if (filterBar) filterBar.style.display = '';
    if (searchRow) searchRow.style.display = '';
    const mainEl = document.getElementById('main');
    if (mainEl) mainEl.style.display = '';
    if (vocabPanel) vocabPanel.style.display = 'none';
    if (window.browseInit) window.browseInit();
  }
};

// ── Pill filters ────────────────────────────────────────
window.vbPillLevel = function (level, btn) {
  vbLevel = level;
  document.querySelectorAll('#vocabBrowsePanel .level-pills .pill').forEach(b => {
    b.className = b.className.replace(/ active[-\w]*/g, '');
  });
  if (btn) btn.classList.add(level === 'all' ? 'active-all' : `active-${level}`);
  _vbRender();
};

window.vbPillPos = function (pos, btn) {
  vbPos = pos;
  document.querySelectorAll('#vocabPosRow .cat-chip').forEach(b => {
    b.className = 'cat-chip';
  });
  if (btn) btn.classList.add(pos === 'all' ? 'active-all-cat' : 'active-cat');
  _vbRender();
};

window.vbSearch = function (q) {
  vbSearch = q.trim().toLowerCase();
  _vbRender();
};

// ── Book filter public API ───────────────────────────────
// FIX A: tombol buku selalu bisa diklik — hasData hanya ubah tampilan
window.vbSelectBook = function (bookKey) {
  vbBook     = bookKey;
  vbChapters = [];
  _syncQuizBookFilter();
  _vbRenderBookPanel();
  _vbRenderProgress();
  _vbRender();
};

window.vbToggleChapter = function (num, btn) {
  const idx = vbChapters.indexOf(num);
  if (idx === -1) {
    vbChapters.push(num);
    if (btn) btn.classList.add('active-ch');
  } else {
    vbChapters.splice(idx, 1);
    if (btn) btn.classList.remove('active-ch');
  }
  _syncQuizBookFilter();
  _vbRender();
  _vbRenderProgress();
};

// FIX B: shortcut "Pilih Semua" chapter
window.vbSelectAllChapters = function () {
  const meta = BOOK_META[vbBook];
  if (!meta) return;
  vbChapters = Array.from({ length: meta.chapters }, (_, i) => i + 1);
  _syncQuizBookFilter();
  _vbRenderBookPanel();
  _vbRender();
  _vbRenderProgress();
};

// FIX B: shortcut reset ke "Semua" (tidak ada chapter dipilih = tampilkan semua)
window.vbClearChapters = function () {
  vbChapters = [];
  _syncQuizBookFilter();
  _vbRenderBookPanel();
  _vbRender();
  _vbRenderProgress();
};

// Expose refresh untuk dipanggil dari luar (misal setelah data book masuk)
window.vbRefreshBookFilter = function () {
  _vbRenderBookPanel();
  _vbRenderProgress();
  _vbRender();
};

// ── FIX C: Sync state ke quiz-vocab ─────────────────────
// Sebelumnya vqBookFilter tidak pernah di-sync dari browse
function _syncQuizBookFilter() {
  if (typeof window.vqBookFilter !== 'undefined') {
    window.vqBookFilter = { book: vbBook, chapters: vbChapters.slice() };
  }
}

// ── Build filtered vocab list ────────────────────────────
function _vbFilter() {
  if (vbBook !== 'all') {
    const chaps = vbChapters.length ? vbChapters : _allChaptersOf(vbBook);
    const pool  = window.queryVocabByBook ? window.queryVocabByBook(vbBook, chaps) : [];
    return pool.filter(_applyPosSearch);
  }
  return (window.vocabDB || []).filter(v => {
    if (vbLevel !== 'all' && v.jlpt !== vbLevel) return false;
    return _applyPosSearch(v);
  });
}

// Shared POS + search predicate (extracted untuk DRY)
function _applyPosSearch(v) {
  if (vbPos !== 'all') {
    if      (vbPos === 'verb-u') { if (!v.pos || !v.pos.startsWith('verb')) return false; }
    else if (vbPos === 'noun')   { if (!v.pos || !v.pos.startsWith('noun')) return false; }
    else if (v.pos !== vbPos)    return false;
  }
  if (vbSearch) {
    const s = vbSearch;
    return (
      (v.word      && v.word.includes(s))                      ||
      (v.reading   && v.reading.includes(s))                   ||
      (v.romaji    && v.romaji.includes(s))                    ||
      (v.meaning_id && v.meaning_id.toLowerCase().includes(s)) ||
      (v.meaning_en && v.meaning_en.toLowerCase().includes(s))
    );
  }
  return true;
}

// ── Render vocab cards ───────────────────────────────────
function _vbRender() {
  const grid    = document.getElementById('vocabGrid');
  const countEl = document.getElementById('vocabCountTxt');
  if (!grid) return;

  // FIX D: buku dipilih tapi belum ada data → empty state kontekstual (bukan generic)
  if (vbBook !== 'all') {
    const availableBooks = window.listBooks ? window.listBooks() : [];
    if (!availableBooks.includes(vbBook)) {
      const meta = BOOK_META[vbBook] || {};
      if (countEl) countEl.textContent = '0 kata';
      grid.innerHTML = `
        <div class="vb-empty vb-empty-book">
          <div class="cs-icon">${meta.icon || '📖'}</div>
          <h3>${meta.label || vbBook}</h3>
          <p>Data kosakata untuk buku ini<br>sedang disiapkan.</p>
          <p class="vb-empty-sub">Tersedia setelah Agent Book mengisi<br>daftar kata per bab.</p>
        </div>`;
      return;
    }
  }

  const list = _vbFilter();
  if (countEl) countEl.textContent = `${list.length} kata`;

  if (!list.length) {
    // FIX E: bedakan "chapter kosong data" vs "filter tidak ada hasil"
    const emptyMsg = (vbBook !== 'all' && vbChapters.length)
      ? `Belum ada kata untuk bab yang dipilih.<br>Coba pilih bab lain atau klik <em>Semua</em>.`
      : `Tidak ada kata yang cocok.<br>Coba ubah filter atau kata kunci pencarian.`;
    grid.innerHTML = `<div class="vb-empty"><div class="cs-icon">🔍</div><p>${emptyMsg}</p></div>`;
    return;
  }

  grid.innerHTML = list.map(_vbCardHTML).join('');
}

function _vbCardHTML(v) {
  const posLabel = POS_LABEL[v.pos] || v.pos || '';
  const jlpt     = v.jlpt || 'n5';
  const ex       = v.examples && v.examples[0];
  const exHtml   = ex
    ? `<div class="vb-ex"><span class="vb-ex-jp">${ex.jp}</span>
       <span class="vb-ex-id">${ex.id}</span></div>`
    : '';

  return `
  <div class="vb-card" onclick="openVocabDetail('${v.id}')" role="button" tabindex="0">
    <div class="vb-card-head">
      <span class="vb-jlpt-badge vb-jlpt-${jlpt}">${jlpt.toUpperCase()}</span>
      <span class="vb-pos-tag">${posLabel}</span>
      <span class="vb-detail-hint">⤢</span>
    </div>
    <div class="vb-word">${v.word}</div>
    <div class="vb-reading">${v.reading} <span class="vb-romaji">${v.romaji || ''}</span></div>
    <div class="vb-meaning">${v.meaning_id}</div>
    ${v.nuance ? `<div class="vb-nuance">${v.nuance}</div>` : ''}
    ${exHtml}
  </div>`;
}

// ── Update badge count ───────────────────────────────────
function _updateBadge() {
  const badge = document.getElementById('bstVocabCount');
  if (badge) badge.textContent = (window.vocabDB || []).length;
}

// ── Book filter panel render ─────────────────────────────
function _vbRenderBookPanel() {
  const panel = document.getElementById('vbBookPanel');
  if (!panel) return;

  const availableBooks = window.listBooks ? window.listBooks() : [];
  const allActive      = vbBook === 'all';

  // ── Pill row buku ──────────────────────────────────────
  let html = `<div class="vb-book-pills">
    <button class="vb-book-pill ${allActive ? 'active' : ''}"
      onclick="vbSelectBook('all')">📚 Semua</button>`;

  for (const [key, meta] of Object.entries(BOOK_META)) {
    const hasData  = availableBooks.includes(key);
    const isActive = vbBook === key;
    // FIX A: tombol selalu ada & bisa diklik — soon-pill hanya beda gaya
    html += `
    <button
      class="vb-book-pill ${isActive ? 'active' : ''} ${!hasData ? 'vb-book-soon-pill' : ''}"
      onclick="vbSelectBook('${key}')"
      aria-label="${meta.label}${!hasData ? ' — sedang disiapkan' : ''}"
    >${meta.icon} ${meta.label}${!hasData ? `<span class="vb-book-soon">Soon</span>` : ''}</button>`;
  }
  html += `</div>`;

  // ── Chapter strip — hanya saat buku dipilih ────────────
  if (vbBook !== 'all') {
    const meta     = BOOK_META[vbBook];
    const count    = meta ? meta.chapters : 0;
    const unitName = meta ? meta.unit : 'Bab';
    const hasData  = availableBooks.includes(vbBook);
    const allSel   = vbChapters.length === count;

    html += `<div class="vb-chapter-wrap">
      <div class="vb-chapter-controls">
        <span class="vb-chapter-label">${unitName}:</span>
        <button class="vb-ch-ctrl ${!vbChapters.length ? 'active-ch-ctrl' : ''}"
          onclick="vbClearChapters()">Semua</button>
        <button class="vb-ch-ctrl ${allSel && count > 0 ? 'active-ch-ctrl' : ''}"
          onclick="vbSelectAllChapters()">Pilih Semua</button>
      </div>
      <div class="vb-chapter-strip">`;

    for (let i = 1; i <= count; i++) {
      const isChActive = vbChapters.includes(i);
      // FIX A: chapter tetap render + bisa diklik meski belum ada data
      html += `<button
          class="vb-ch-pill ${isChActive ? 'active-ch' : ''} ${!hasData ? 'vb-ch-soon' : ''}"
          onclick="vbToggleChapter(${i}, this)"
          ${!hasData ? 'title="Data belum tersedia"' : ''}
        >${i}</button>`;
    }
    html += `</div></div>`;
  }

  panel.innerHTML = html;
}

// ── Book progress render ─────────────────────────────────
function _vbRenderProgress() {
  const panel = document.getElementById('vbProgressPanel');
  if (!panel) return;

  if (vbBook === 'all') {
    panel.style.display = 'none';
    return;
  }

  const availableBooks = window.listBooks ? window.listBooks() : [];
  if (!availableBooks.includes(vbBook)) {
    panel.style.display = 'none';
    return;
  }

  // FIX F: progress tampil sejak buku dipilih — bukan hanya saat chapter dipilih
  const chaps     = vbChapters.length ? vbChapters.slice().sort((a, b) => a - b) : _allChaptersOf(vbBook);
  const vocabList = window.queryVocabByBook ? window.queryVocabByBook(vbBook, chaps) : [];

  if (!vocabList.length) {
    panel.style.display = 'none';
    return;
  }

  // Hitung SRS stats
  let newCount = 0, learningCount = 0, knownCount = 0;
  for (const v of vocabList) {
    const s = window.srsStatus ? window.srsStatus(v.id) : 'new';
    if      (s === 'mature') knownCount++;
    else if (s === 'new')    newCount++;
    else                     learningCount++;
  }

  const total    = vocabList.length;
  const pctDone  = total ? Math.round(knownCount / total * 100) : 0;
  const bookMeta = BOOK_META[vbBook] || {};
  const unitName = bookMeta.unit || 'Bab';

  // FIX F: chapter label lebih cerdas — contiguous range vs list
  let chapterLabel;
  if (!vbChapters.length) {
    chapterLabel = `Semua ${unitName}`;
  } else if (vbChapters.length === 1) {
    chapterLabel = `${unitName} ${vbChapters[0]}`;
  } else {
    const sorted       = vbChapters.slice().sort((a, b) => a - b);
    const isContiguous = sorted.every((v, i) => i === 0 || v === sorted[i - 1] + 1);
    chapterLabel = isContiguous
      ? `${unitName} ${sorted[0]}–${sorted[sorted.length - 1]}`
      : `${unitName} ${sorted.join(', ')}`;
  }

  panel.style.display = '';
  panel.innerHTML = `
    <div class="vb-prog-header">
      <span class="vb-prog-title">${bookMeta.icon || '📖'} ${bookMeta.label || vbBook} · ${chapterLabel}</span>
      <span class="vb-prog-pct">${pctDone}% hafal</span>
    </div>
    <div class="vb-prog-bar-wrap">
      <div class="vb-prog-bar">
        <div class="vb-prog-fill vb-prog-known"    style="width:${total ? knownCount / total * 100 : 0}%"></div>
        <div class="vb-prog-fill vb-prog-learning" style="width:${total ? learningCount / total * 100 : 0}%"></div>
      </div>
    </div>
    <div class="vb-prog-legend">
      <span class="vb-prog-dot vb-dot-known"></span><span>${knownCount} Hafal</span>
      <span class="vb-prog-dot vb-dot-learning"></span><span>${learningCount} Sedang</span>
      <span class="vb-prog-dot vb-dot-new"></span><span>${newCount} Baru</span>
      <span class="vb-prog-total">${total} kata total</span>
    </div>`;
}

// ── Helper: array chapter 1..N dari buku ─────────────────
function _allChaptersOf(bookKey) {
  const meta = BOOK_META[bookKey];
  if (!meta) return [];
  return Array.from({ length: meta.chapters }, (_, i) => i + 1);
}

})();
