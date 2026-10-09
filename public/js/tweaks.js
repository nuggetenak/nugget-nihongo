// ══════════════════════════════════════
//  tweaks.js — Accent switcher, density, furigana
//  Claude Design Tweaks Panel
//  Exposes: window.initTweaks()
// ══════════════════════════════════════
(function () {
  'use strict';

  var ACCENTS = {
    amber:  { main: '#F59E0B', hot: '#FBBF24', ember: '#D97706' },
    sakura: { main: '#F472B6', hot: '#F9A8D4', ember: '#BE185D' },
    matcha: { main: '#84CC16', hot: '#A3E635', ember: '#4D7C0F' },
    indigo: { main: '#818CF8', hot: '#A5B4FC', ember: '#4338CA' },
  };

  function applyAccent(name) {
    var a = ACCENTS[name] || ACCENTS.amber;
    var r = document.documentElement.style;
    r.setProperty('--accent',     a.main);
    r.setProperty('--accent-hot', a.hot);
    r.setProperty('--gold',       a.hot);
    r.setProperty('--ember',      a.ember);
    // Persist
    localStorage.setItem('nn_accent', name);
    // Sync UI
    document.querySelectorAll('[data-accent]').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.accent === name);
    });
  }

  function applyDensity(d) {
    var pad = d === 'compact' ? '8px' : d === 'airy' ? '18px' : '12px';
    document.documentElement.style.setProperty('--density-pad', pad);
    localStorage.setItem('nn_density', d);
    document.querySelectorAll('[data-density]').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.density === d);
    });
  }

  function applyFurigana(f) {
    document.documentElement.dataset.furigana = f;
    localStorage.setItem('nn_furigana', f);
    document.querySelectorAll('[data-furigana]').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.furigana === f);
    });
  }

  function injectPanel() {
    if (document.getElementById('tweaksPanel')) return;
    var panel = document.createElement('div');
    panel.id = 'tweaksPanel';
    panel.className = 'tweaks-panel';
    panel.innerHTML = [
      '<div class="tweaks-header">',
      '  <span class="tweaks-title">Tweaks</span>',
      '  <button class="tweaks-close" onclick="closeTweaks()">✕</button>',
      '</div>',

      '<div class="tweaks-row">',
      '  <div class="tweaks-label">Accent</div>',
      '  <div class="tweaks-accents">',
      '    <button class="tw-accent-dot" data-accent="amber"  style="background:#F59E0B" title="Amber"></button>',
      '    <button class="tw-accent-dot" data-accent="sakura" style="background:#F472B6" title="Sakura"></button>',
      '    <button class="tw-accent-dot" data-accent="matcha" style="background:#84CC16" title="Matcha"></button>',
      '    <button class="tw-accent-dot" data-accent="indigo" style="background:#818CF8" title="Indigo"></button>',
      '  </div>',
      '</div>',

      '<div class="tweaks-row">',
      '  <div class="tweaks-label">Kepadatan</div>',
      '  <div class="tweaks-seg">',
      '    <button class="tw-seg-btn" data-density="compact">Rapat</button>',
      '    <button class="tw-seg-btn active" data-density="comfy">Pas</button>',
      '    <button class="tw-seg-btn" data-density="airy">Lega</button>',
      '  </div>',
      '</div>',

      '<div class="tweaks-row">',
      '  <div class="tweaks-label">Furigana</div>',
      '  <div class="tweaks-seg">',
      '    <button class="tw-seg-btn" data-furigana="always">Selalu</button>',
      '    <button class="tw-seg-btn active" data-furigana="auto">Auto</button>',
      '    <button class="tw-seg-btn" data-furigana="never">Tidak</button>',
      '  </div>',
      '</div>',
    ].join('\n');
    document.body.appendChild(panel);

    // Wire accent buttons
    panel.querySelectorAll('[data-accent]').forEach(function (btn) {
      btn.addEventListener('click', function () { applyAccent(btn.dataset.accent); });
    });
    // Wire density buttons
    panel.querySelectorAll('[data-density]').forEach(function (btn) {
      btn.addEventListener('click', function () { applyDensity(btn.dataset.density); });
    });
    // Wire furigana buttons
    panel.querySelectorAll('[data-furigana]').forEach(function (btn) {
      btn.addEventListener('click', function () { applyFurigana(btn.dataset.furigana); });
    });
  }

  window.openTweaks = function () {
    injectPanel();
    var p = document.getElementById('tweaksPanel');
    if (p) p.classList.add('open');
  };
  window.closeTweaks = function () {
    var p = document.getElementById('tweaksPanel');
    if (p) p.classList.remove('open');
  };

  // Long-press on "N" logo → open tweaks (Easter egg)
  window.initTweaks = function () {
    var logo = document.querySelector('.header-logo');
    if (!logo) return;
    var timer;
    logo.addEventListener('pointerdown', function () {
      timer = setTimeout(function () { window.openTweaks(); }, 800);
    });
    logo.addEventListener('pointerup',   function () { clearTimeout(timer); });
    logo.addEventListener('pointerleave',function () { clearTimeout(timer); });

    // Restore saved prefs
    var savedAccent   = localStorage.getItem('nn_accent');
    var savedDensity  = localStorage.getItem('nn_density');
    var savedFurigana = localStorage.getItem('nn_furigana');
    if (savedAccent)   applyAccent(savedAccent);
    if (savedDensity)  applyDensity(savedDensity);
    if (savedFurigana) applyFurigana(savedFurigana);
  };

})();
