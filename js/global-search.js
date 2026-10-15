// ══════════════════════════════════════════════════════
//  js/global-search.js — Nugget Nihongo
//  Global Search: cari grammar + vocab sekaligus
//  Load SETELAH vocab-index.js dan grammar-index.js
// ══════════════════════════════════════════════════════

(function () {

let _gsOpen    = false;
let _gsDebounce = null;

// ── Toggle overlay ──────────────────────────────────────
window.gsOpen = function () {
  const overlay = document.getElementById('globalSearchOverlay');
  const input   = document.getElementById('gsInput');
  if (!overlay) return;
  _gsOpen = true;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => input && input.focus(), 80);
};

window.gsClose = function () {
  const overlay = document.getElementById('globalSearchOverlay');
  if (!overlay) return;
  _gsOpen = false;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
};

// ── Input handler with debounce ─────────────────────────
window.gsInput = function (val) {
  clearTimeout(_gsDebounce);
  _gsDebounce = setTimeout(() => _gsRender(val.trim()), 200);
};

// ── Search engine ────────────────────────────────────────
function _gsRender(q) {
  const resultsEl = document.getElementById('gsResults');
  if (!resultsEl) return;

  if (!q || q.length < 1) {
    resultsEl.innerHTML = `<div class="gs-empty">Ketik kata, grammar, atau arti...</div>`;
    return;
  }

  const lower = q.toLowerCase();

  // ── Search vocab ──────────────────────────────────────
  const vocabHits = (window.vocabDB || []).filter(v =>
    (v.word    && v.word.includes(q))            ||
    (v.reading && v.reading.includes(q))          ||
    (v.romaji  && v.romaji.toLowerCase().includes(lower)) ||
    (v.meaning_id && v.meaning_id.toLowerCase().includes(lower)) ||
    (v.meaning_en && v.meaning_en.toLowerCase().includes(lower))
  ).slice(0, 8);

  // ── Search grammar ────────────────────────────────────
  const grammarHits = (window.grammarData || []).filter(c =>
    c.cat !== 'dummy' && (
      (c.grammar && c.grammar.includes(q))          ||
      (c.reading && c.reading.includes(q))           ||
      (c.meaning && c.meaning.toLowerCase().includes(lower)) ||
      (c.desc    && c.desc.toLowerCase().includes(lower))
    )
  ).slice(0, 8);

  if (!vocabHits.length && !grammarHits.length) {
    resultsEl.innerHTML = `
      <div class="gs-empty">
        <div class="gs-empty-icon">🔍</div>
        Tidak ada hasil untuk "<strong>${_esc(q)}</strong>"
      </div>`;
    return;
  }

  let html = '';

  if (vocabHits.length) {
    html += `<div class="gs-section-label">📚 Kosakata (${vocabHits.length})</div>`;
    html += vocabHits.map(v => `
      <button class="gs-item gs-item-vocab" onclick="gsPickVocab('${v.id}')">
        <div class="gs-item-main">
          <span class="gs-word">${_esc(v.word)}</span>
          <span class="gs-reading">${_esc(v.reading)}</span>
          <span class="gs-jlpt-dot gs-jlpt-${v.jlpt}">${(v.jlpt||'').toUpperCase()}</span>
        </div>
        <div class="gs-item-sub">${_esc(v.meaning_id)}</div>
      </button>`).join('');
  }

  if (grammarHits.length) {
    html += `<div class="gs-section-label">📖 Grammar (${grammarHits.length})</div>`;
    html += grammarHits.map(c => `
      <button class="gs-item gs-item-grammar" onclick="gsPickGrammar('${c.id}')">
        <div class="gs-item-main">
          <span class="gs-word">${_esc(c.grammar)}</span>
          <span class="gs-reading">${_esc(c.reading || '')}</span>
          <span class="gs-jlpt-dot gs-jlpt-${c.level}">${(c.level||'').toUpperCase()}</span>
        </div>
        <div class="gs-item-sub">${_esc(c.meaning)}</div>
      </button>`).join('');
  }

  resultsEl.innerHTML = html;
}

// ── Pick handlers ────────────────────────────────────────
window.gsPickVocab = function (id) {
  window.gsClose();
  // Switch ke browse tab → vocab sub-tab → buka detail
  if (window.switchTab) window.switchTab('browse', document.getElementById('tabBtnBrowse'));
  setTimeout(() => {
    const bstVocab = document.getElementById('bstVocab');
    if (window.switchBrowseTab) window.switchBrowseTab('vocab', bstVocab);
    setTimeout(() => { if (window.openVocabDetail) window.openVocabDetail(id); }, 100);
  }, 80);
};

window.gsPickGrammar = function (id) {
  window.gsClose();
  // Switch ke browse tab → buka grammar detail modal
  if (window.switchTab) window.switchTab('browse', document.getElementById('tabBtnBrowse'));
  setTimeout(() => {
    // Pastikan grammar tab aktif
    const bstGrammar = document.getElementById('bstGrammar');
    if (window.switchBrowseTab) window.switchBrowseTab('grammar', bstGrammar);
    setTimeout(() => { if (window.openDetail) window.openDetail(id); }, 100);
  }, 80);
};

// ── Keyboard shortcut ────────────────────────────────────
document.addEventListener('keydown', function (e) {
  // Cmd/Ctrl + K → open
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    _gsOpen ? window.gsClose() : window.gsOpen();
  }
  if (e.key === 'Escape' && _gsOpen) window.gsClose();
});

// ── Backdrop click ───────────────────────────────────────
document.addEventListener('click', function (e) {
  const overlay = document.getElementById('globalSearchOverlay');
  if (overlay && overlay.classList.contains('open') && e.target === overlay) {
    window.gsClose();
  }
});

function _esc(s) {
  return String(s||'')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

})();
