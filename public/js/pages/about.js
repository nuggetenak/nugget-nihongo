// ══════════════════════════════════════
//  pages/about.js — About page logic
//  Phase 3 · Nugget Nihongo
//
//  Exposes: window.initAboutPage()
// ══════════════════════════════════════

(function () {
  'use strict';

  window.initAboutPage = function () {
    _bindCiteToggle();
    _setVersion();
  };

  function _bindCiteToggle() {
    var btn = document.getElementById('abCiteToggle');
    var list = document.getElementById('abCiteList');
    if (!btn || !list) return;
    btn.addEventListener('click', function () {
      var open = list.classList.toggle('open');
      btn.textContent = open
        ? 'Sembunyikan referensi \u25B2'
        : 'Lihat semua referensi (736) \u25BC';
    });
  }

  function _setVersion() {
    var v = window.APP_VERSION || '—';
    var el = document.getElementById('abVersion');
    if (el) el.textContent = v;
    var ms = document.getElementById('msAppVersion');
    if (ms) ms.textContent = v;
    var label = document.getElementById('msVersionLabel');
    if (label) label.textContent = v + ' · dibuat dengan 🍵';
  }

})();
