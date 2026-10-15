// ══════════════════════════════════════════════════════
//  js/daily-word.js — Nugget Nihongo v14.3
//  Daily Word: pilih satu kata dari vocabDB berdasarkan
//  tanggal hari ini (deterministik, ganti tiap tengah malam).
//  Expose: window.initDailyWord()
// ══════════════════════════════════════════════════════

(function () {

  // ── Pilih kata hari ini ─────────────────────────────
  function getDailyWord() {
    const db = window.vocabDB;
    if (!db || !db.length) return null;
    // Filter pool: hanya entry yang punya examples dan nuance
    const pool = db.filter(e => e.examples && e.examples.length > 0 && e.nuance);
    if (!pool.length) return null;
    // Days since Unix epoch → indeks deterministik
    const dayIdx = Math.floor(Date.now() / 86400000);
    return pool[dayIdx % pool.length];
  }

  // ── Render ke #dailyWordBlock ───────────────────────
  function renderDailyWord() {
    const block = document.getElementById('dailyWordBlock');
    if (!block) return;

    const w = getDailyWord();
    if (!w) { block.style.display = 'none'; return; }

    const jlpt = (w.jlpt || '').toLowerCase();
    block.innerHTML = `
      <div class="dw-header">
        <span class="dw-label">✨ Kata Hari Ini</span>
        ${jlpt ? `<span class="dw-jlpt dw-jlpt-${jlpt}">${jlpt.toUpperCase()}</span>` : ''}
      </div>
      <div class="dw-word">${w.word || ''}</div>
      ${w.reading ? `<div class="dw-reading">${w.reading}</div>` : ''}
      <div class="dw-meaning">${w.meaning_id || ''}</div>
      ${w.examples && w.examples[0]
        ? `<div class="dw-ex"><span class="dw-ex-jp">${w.examples[0].jp}</span>
           <span class="dw-ex-id">${w.examples[0].id}</span></div>`
        : ''}
    `;
    block.style.display = '';
  }

  window.initDailyWord = renderDailyWord;

})();
