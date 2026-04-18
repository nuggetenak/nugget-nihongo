// ══════════════════════════════════════
//  detail.js — Grammar Detail Modal
//  v2 — pakai window.buildBreakdownSafe dari quiz-feedback.js
//  Load order: setelah quiz-feedback.js, sebelum app.js
// ══════════════════════════════════════

(function () {

  // ── Open modal ──────────────────────────────────────────────
  window.openDetail = function (cardId) {
    const data = window.grammarData || [];
    let d = data.find(x => x.id === cardId);
    // Fallback: try vocab (openVocabDetail handles its own modal)
    if (!d && cardId && cardId.startsWith('vg-')) {
      if (window.openVocabDetail) window.openVocabDetail(cardId);
      return;
    }
    if (!d) return;

    const modal = document.getElementById('detailModal');
    if (!modal) return;

    const lv = d.level;

    // Connection badge — guard undefined
    const connHTML = d.connection
      ? `<div class="detail-connection ${lv}">${d.connection}</div>` : '';

    // Deskripsi penuh — guard undefined
    const descHTML = d.desc
      ? `<div class="detail-desc">${d.desc}</div>` : '';

    // Contoh kalimat dengan tombol breakdown
    const examplesHTML = (d.examples || []).map((e, i) => {
      const bdId    = `bd-${cardId}-${i}`;
      // Pakai buildBreakdownSafe dari quiz-feedback.js (sudah diload lebih dulu)
      const broken  = window.buildBreakdownSafe
        ? window.buildBreakdownSafe(e.jp)
        : e.jp;
      return `
      <div class="detail-example" id="ex-${bdId}">
        <div class="detail-ex-jp"  id="jp-${bdId}">${e.jp}</div>
        <div class="detail-ex-jp detail-ex-jp--broken"
             id="jp-bd-${bdId}" style="display:none">${broken}</div>
        <div class="detail-ex-id">${e.id}</div>
        <button class="detail-bd-btn"
                onclick="toggleBreakdown('${bdId}')"
                aria-label="Toggle breakdown">
          <span class="detail-bd-icon">⌥</span>
          <span class="detail-bd-label" id="bdlabel-${bdId}">Breakdown</span>
        </button>
      </div>`;
    }).join('');

    // Tips / nuance
    const tipsHTML = d.nuance ? `
      <div class="detail-tips">
        <div class="detail-tips-header">
          <span class="detail-tips-icon">💡</span>
          <span class="detail-tips-title">Tips Pemakaian</span>
        </div>
        <div class="detail-tips-body">${d.nuance}</div>
      </div>` : '';

    // Ilustrasi (hanya jika ada data)
    const illusHTML = d.illustration ? `
      <div class="detail-illustration">
        <img src="${d.illustration}" alt="Ilustrasi ${d.grammar}" loading="lazy">
      </div>` : '';

    // Bookmark & progress
    const isBm = window.bookmarks && window.bookmarks.has(d.id);
    const prog  = window.progress && window.progress[d.id];
    const progEmoji = prog ? ({ know: '✅', unsure: '😅', forgot: '❌' }[prog] || '') : '';
    const progBadge = progEmoji ? `<span class="detail-prog-badge">${progEmoji}</span>` : '';

    modal.querySelector('.detail-modal-inner').innerHTML = `
      <div class="detail-header ${lv}">
        <div class="detail-header-top">
          <button class="detail-close-btn" onclick="closeDetail()" aria-label="Tutup">✕</button>
          <div class="detail-header-badges">
            <span class="detail-level-tag ${lv}">${lv.toUpperCase()}</span>
            ${progBadge}
          </div>
          <button class="detail-bm-btn ${isBm ? 'bookmarked' : ''}"
                  id="detailBmBtn"
                  onclick="toggleBookmark('${d.id}', this, event); refreshDetailBm('${d.id}')"
                  aria-label="Bookmark">${isBm ? '⭐' : '☆'}</button>
        </div>
        <div class="detail-grammar">${d.grammar}</div>
        <div class="detail-reading">${d.reading}</div>
        <div class="detail-meaning">${d.meaning}</div>
      </div>

      <div class="detail-body">
        ${connHTML}
        ${descHTML}
        <div class="detail-section-label">Contoh Kalimat</div>
        <div class="detail-examples">${examplesHTML}</div>
        ${tipsHTML}
        ${illusHTML}
      </div>`;

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    const inner = modal.querySelector('.detail-modal-inner');
    if (inner) inner.scrollTop = 0;
  };


  // ── Close modal ──────────────────────────────────────────────
  window.closeDetail = function () {
    const modal = document.getElementById('detailModal');
    if (!modal) return;
    modal.classList.remove('show');
    document.body.style.overflow = '';
  };


  // ── Toggle breakdown per contoh kalimat ─────────────────────
  window.toggleBreakdown = function (bdId) {
    const normal = document.getElementById(`jp-${bdId}`);
    const broken = document.getElementById(`jp-bd-${bdId}`);
    const label  = document.getElementById(`bdlabel-${bdId}`);
    const btn    = normal?.closest('.detail-example')?.querySelector('.detail-bd-btn');
    if (!normal || !broken) return;

    const open = broken.style.display !== 'none';
    normal.style.display = open ? '' : 'none';
    broken.style.display = open ? 'none' : '';
    if (label) label.textContent = open ? 'Breakdown' : 'Ringkas';
    if (btn)   btn.classList.toggle('active', !open);
  };


  // ── Refresh bookmark icon di modal ───────────────────────────
  window.refreshDetailBm = function (cardId) {
    const btn = document.getElementById('detailBmBtn');
    if (!btn) return;
    const isNow = window.bookmarks && window.bookmarks.has(cardId);
    btn.textContent = isNow ? '⭐' : '☆';
    btn.classList.toggle('bookmarked', isNow);
  };


  // ── Event listeners (backdrop + swipe down) ──────────────────
  document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('detailModal');
    if (!modal) return;

    // Klik backdrop → tutup
    modal.addEventListener('click', function (e) {
      if (e.target === this) closeDetail();
    });

    // Swipe ke bawah untuk tutup
    let startY = 0;
    const inner = modal.querySelector('.detail-modal-inner');
    if (inner) {
      inner.addEventListener('touchstart', e => {
        startY = e.touches[0].clientY;
      }, { passive: true });
      inner.addEventListener('touchend', e => {
        const dy = e.changedTouches[0].clientY - startY;
        if (dy > 80 && inner.scrollTop < 5) closeDetail();
      }, { passive: true });
    }
  });

})();
