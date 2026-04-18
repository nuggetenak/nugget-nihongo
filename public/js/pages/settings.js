// ══════════════════════════════════════
//  pages/settings.js — Settings page logic
//  Phase 3 · Nugget Nihongo
//
//  Exposes:
//    window.initSettingsPage()
//    window.openMoreSheet()
//    window.closeMoreSheet()
// ══════════════════════════════════════

(function () {
  'use strict';

  // ── Open / close ⋯ More bottom-sheet ─────────────
  window.openMoreSheet = function () {
    var overlay = document.getElementById('moreSheetOverlay');
    if (overlay) overlay.classList.add('open');
  };

  window.closeMoreSheet = function () {
    var overlay = document.getElementById('moreSheetOverlay');
    if (overlay) overlay.classList.remove('open');
  };

  // ── Navigate to a page tab ────────────────────────
  function _navTo(tab) {
    window.closeMoreSheet();
    // find the matching tab button and trigger switchTab
    var map = {
      settings : 'tabBtnSettings',
      about    : 'tabBtnAbout',
      browse   : 'tabBtnBrowse',
    };
    var btnId = map[tab];
    if (btnId) {
      var btn = document.getElementById(btnId);
      if (btn) btn.click();
    }
  }

  // ── More-sheet nav items ──────────────────────────
  window._moreNavTo = _navTo;

  // ── Settings page init ────────────────────────────
  window.initSettingsPage = function () {
    _bindThemeSelect();
    _bindFontSize();
    _bindReduceMotion();
    _bindFurigana();
    _bindRomaji();
    _bindCardTarget();
    _bindResetConvo();
    _bindClearData();
    _reflectCurrentValues();
  };

  // ── Theme ─────────────────────────────────────────
  function _bindThemeSelect() {
    var sel = document.getElementById('spThemeSelect');
    if (!sel) return;
    sel.addEventListener('change', function () {
      var v = sel.value;
      if (v === 'dark')   { document.body.classList.remove('light'); }
      if (v === 'light')  { document.body.classList.add('light'); }
      if (v === 'system') {
        var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.body.classList.toggle('light', !prefersDark);
      }
      localStorage.setItem('nn_theme', v);
      _syncThemeIcon(v);
    });
  }

  function _syncThemeIcon(v) {
    var icon = document.getElementById('themeNavIcon');
    if (!icon) return;
    icon.textContent = v === 'light' ? '\uD83C\uDF1E' : '\uD83C\uDF19';
  }

  // ── Font size ─────────────────────────────────────
  function _bindFontSize() {
    var btns = document.querySelectorAll('[data-fontsize]');
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        btns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var sz = btn.dataset.fontsize; // 'small'|'medium'|'large'
        var map = { small: '14px', medium: '16px', large: '18px' };
        document.documentElement.style.fontSize = map[sz] || '16px';
        localStorage.setItem('nn_fontsize', sz);
      });
    });
  }

  // ── Reduce motion ─────────────────────────────────
  function _bindReduceMotion() {
    var tog = document.getElementById('spReduceMotion');
    if (!tog) return;
    tog.addEventListener('change', function () {
      document.documentElement.classList.toggle('reduce-motion', tog.checked);
      localStorage.setItem('nn_reduce_motion', tog.checked ? '1' : '0');
    });
  }

  // ── Furigana ──────────────────────────────────────
  function _bindFurigana() {
    var sel = document.getElementById('spFurigana');
    if (!sel) return;
    sel.addEventListener('change', function () {
      localStorage.setItem('nn_furigana', sel.value);
    });
  }

  // ── Romaji ────────────────────────────────────────
  function _bindRomaji() {
    var sel = document.getElementById('spRomaji');
    if (!sel) return;
    sel.addEventListener('change', function () {
      localStorage.setItem('nn_romaji', sel.value);
    });
  }

  // ── Daily card target ─────────────────────────────
  function _bindCardTarget() {
    var sel = document.getElementById('spCardTarget');
    if (!sel) return;
    sel.addEventListener('change', function () {
      localStorage.setItem('nn_card_target', sel.value);
    });
  }

  // ── Reset Sensei convo ────────────────────────────
  function _bindResetConvo() {
    var btn = document.getElementById('spResetConvo');
    if (!btn) return;
    btn.addEventListener('click', function () {
      if (!confirm('Reset riwayat percakapan Sensei? Ini tidak bisa dibatalkan.')) return;
      // ai-tutor.js keeps history in memory; clear the storage key it uses
      localStorage.removeItem('nn_ai_history');
      if (window.resetAITutorHistory) window.resetAITutorHistory();
      _showToast('Riwayat Sensei direset.');
    });
  }

  // ── Clear all data ────────────────────────────────
  function _bindClearData() {
    var btn = document.getElementById('spClearData');
    if (!btn) return;
    btn.addEventListener('click', function () {
      if (!confirm('Hapus SEMUA data lokal? FSRS progress, bookmark, streak — semua hilang. Ini tidak bisa dibatalkan.')) return;
      if (!confirm('Yakin? Data tidak bisa dikembalikan.')) return;
      // Clear every nn_ key
      var keysToRemove = [];
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (k && k.startsWith('nn_')) keysToRemove.push(k);
      }
      keysToRemove.forEach(function (k) { localStorage.removeItem(k); });
      // Also clear IDB via localState if available
      if (window.localState && window.localState.clearAll) window.localState.clearAll();
      _showToast('Data lokal dihapus. Refresh halaman ya.');
    });
  }

  // ── Reflect current values on page open ──────────
  function _reflectCurrentValues() {
    // Theme
    var theme = localStorage.getItem('nn_theme') || 'dark';
    var sel = document.getElementById('spThemeSelect');
    if (sel) sel.value = theme;

    // Font size
    var fs = localStorage.getItem('nn_fontsize') || 'medium';
    var fsBtn = document.querySelector('[data-fontsize="' + fs + '"]');
    if (fsBtn) fsBtn.classList.add('active');

    // Reduce motion
    var rm = document.getElementById('spReduceMotion');
    if (rm) rm.checked = localStorage.getItem('nn_reduce_motion') === '1';

    // Furigana
    var fur = localStorage.getItem('nn_furigana') || 'always';
    var furSel = document.getElementById('spFurigana');
    if (furSel) furSel.value = fur;

    // Romaji
    var rom = localStorage.getItem('nn_romaji') || 'n5n4';
    var romSel = document.getElementById('spRomaji');
    if (romSel) romSel.value = rom;

    // Card target
    var ct = localStorage.getItem('nn_card_target') || '10';
    var ctSel = document.getElementById('spCardTarget');
    if (ctSel) ctSel.value = ct;

    // Version
    var vEl = document.getElementById('spVersionPill');
    if (vEl && window.APP_VERSION) vEl.textContent = window.APP_VERSION;
  }

  // ── Toast util (shared) ───────────────────────────
  function _showToast(msg) {
    var t = document.createElement('div');
    t.textContent = msg;
    t.style.cssText = [
      'position:fixed', 'bottom:calc(var(--nav-h) + 1rem + var(--safe-bottom))',
      'left:50%', 'transform:translateX(-50%)',
      'background:var(--surface-3)', 'color:var(--text)',
      'padding:0.6rem 1.2rem', 'border-radius:20px',
      'font-size:0.82rem', 'z-index:9999',
      'box-shadow:var(--shadow-lg)', 'pointer-events:none',
      'opacity:0', 'transition:opacity 0.2s',
    ].join(';');
    document.body.appendChild(t);
    requestAnimationFrame(function () {
      t.style.opacity = '1';
      setTimeout(function () {
        t.style.opacity = '0';
        setTimeout(function () { t.remove(); }, 300);
      }, 2500);
    });
  }

  // Expose toast for other modules too
  window.showToast = function (msg) { _showToast(msg); };

})();

// ── Lainnya sheet — 3-way theme + active state sync ──────────────
window.setThemeFromSheet = function (v) {
  if (v === 'dark')   { document.body.classList.remove('light'); }
  if (v === 'light')  { document.body.classList.add('light'); }
  if (v === 'system') {
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.body.classList.toggle('light', !prefersDark);
  }
  localStorage.setItem('nn_theme', v);
  _syncSheetThemeBtns(v);
};

function _syncSheetThemeBtns(v) {
  var btns = document.querySelectorAll('#moreThemeSeg .ms-theme-btn');
  btns.forEach(function (btn) {
    btn.classList.toggle('active', btn.dataset.theme === v ||
      (v === 'system' && btn.dataset.theme === 'system'));
  });
}

// Sync sheet theme buttons on open
var _origOpen = window.openMoreSheet;
window.openMoreSheet = function () {
  if (_origOpen) _origOpen();
  var cur = localStorage.getItem('nn_theme') || 'dark';
  _syncSheetThemeBtns(cur);
  // Update user row if logged in
  var profile = window._currentProfile;
  if (profile) {
    var nameEl = document.getElementById('moreSheetUserName');
    var subEl  = document.getElementById('moreSheetUserSub');
    if (nameEl) nameEl.textContent = profile.display_name || profile.email || 'Pengguna';
    if (subEl)  subEl.textContent  = 'Tersinkron ke cloud ☁️';
  }
};
