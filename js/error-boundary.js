// ══════════════════════════════════════════════════════
//  js/error-boundary.js — Nugget Nihongo
//  Global error recovery screen.
//  Load PERTAMA setelah version.js — sebelum semua file lain.
// ══════════════════════════════════════════════════════

(function () {

const IGNORED = [
  'ResizeObserver loop',   // benign browser warning
  'Script error',          // cross-origin, tidak actionable
];

function _shouldIgnore(msg) {
  return IGNORED.some(s => msg && msg.includes(s));
}

function _showRecovery(msg, src) {
  // Jangan tampilkan recovery kalau sudah ada
  if (document.getElementById('errorRecovery')) return;

  const div = document.createElement('div');
  div.id = 'errorRecovery';
  div.innerHTML = `
    <div class="eb-inner">
      <div class="eb-icon">⚠️</div>
      <h2 class="eb-title">Ups, ada yang error</h2>
      <p class="eb-msg">Halaman mengalami masalah tak terduga.<br>
      Data belajarmu aman — tidak ada yang hilang.</p>
      <details class="eb-detail">
        <summary>Detail teknis</summary>
        <code>${_escape(msg || 'Unknown error')}</code>
        ${src ? `<code class="eb-src">${_escape(src)}</code>` : ''}
      </details>
      <div class="eb-actions">
        <button class="eb-btn eb-btn-primary" onclick="location.reload()">🔄 Muat Ulang</button>
        <button class="eb-btn eb-btn-secondary" onclick="
          localStorage.clear();
          location.reload();
        ">🗑️ Reset & Muat Ulang</button>
      </div>
      <p class="eb-warn">⚠️ "Reset & Muat Ulang" akan menghapus progress & bookmark.</p>
    </div>`;
  document.body.appendChild(div);

  // Log ke console untuk debug
  console.error('[ErrorBoundary]', msg, src);
}

function _escape(s) {
  return String(s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── Global JS error ─────────────────────────────────────
window.onerror = function (msg, src, line, col, err) {
  if (_shouldIgnore(msg)) return false;
  const loc = src ? `${src}:${line}:${col}` : '';
  _showRecovery(err ? err.message : msg, loc);
  return false; // biarkan console juga log
};

// ── Unhandled promise rejection ─────────────────────────
window.addEventListener('unhandledrejection', function (e) {
  const msg = e.reason && e.reason.message ? e.reason.message : String(e.reason);
  if (_shouldIgnore(msg)) return;
  _showRecovery(msg);
});

// ── Expose manual trigger (untuk testing) ──────────────
window.triggerErrorRecovery = function (msg) {
  _showRecovery(msg || 'Manual trigger');
};

})();
