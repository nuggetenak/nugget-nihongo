// ══════════════════════════════════════
//  pages/onboarding.js — 3-screen force-through
//  Phase 3 · Nugget Nihongo
//
//  Guard: localStorage['nn_onboarded'] === '1' → skip
//  Exposes: window.initOnboarding()
// ══════════════════════════════════════

(function () {
  'use strict';

  var STORAGE_KEY      = 'nn_onboarded';
  var LEVEL_KEY        = 'nn_starting_level';
  var GOALS_KEY        = 'nn_goals';
  var MAX_GOALS        = 3;

  var _selectedLevel   = null;
  var _selectedGoals   = [];
  var _currentScreen   = 0;   // 0-based; screens 0,1,2

  // ── DOM refs (populated on init) ─────────────────
  var $overlay, $dots, $screens;

  // ── Public init ──────────────────────────────────
  window.initOnboarding = function () {
    if (localStorage.getItem(STORAGE_KEY) === '1') return; // already done

    $overlay  = document.getElementById('onboardingOverlay');
    if (!$overlay) return;

    $dots     = Array.from($overlay.querySelectorAll('.ob-dot'));
    $screens  = Array.from($overlay.querySelectorAll('.ob-screen'));

    _bindEvents();
    _showScreen(0);
    $overlay.classList.remove('ob-hidden');
  };

  // ── Internal helpers ─────────────────────────────
  function _showScreen(idx) {
    _currentScreen = idx;
    $screens.forEach(function (s, i) {
      s.classList.toggle('active', i === idx);
    });
    $dots.forEach(function (d, i) {
      d.classList.toggle('active', i === idx);
      d.classList.toggle('done',   i < idx);
    });
  }

  function _next() {
    if (_currentScreen < $screens.length - 1) {
      _showScreen(_currentScreen + 1);
    } else {
      _finish();
    }
  }

  function _finish() {
    // Screen 3: ensure at least 1 goal (default to first if none picked)
    if (_selectedGoals.length === 0) _selectedGoals.push('belajar');

    // Write to localStorage
    localStorage.setItem(STORAGE_KEY, '1');
    if (_selectedLevel) localStorage.setItem(LEVEL_KEY, _selectedLevel);
    localStorage.setItem(GOALS_KEY, JSON.stringify(_selectedGoals));

    // Hide overlay
    $overlay.classList.add('ob-hidden');

    // Dismiss welcome banner (it's redundant after onboarding)
    var wb = document.getElementById('welcomeBanner');
    if (wb) wb.style.display = 'none';
    localStorage.setItem('wb-dismissed', '1');
  }

  function _bindEvents() {
    // ── Screen 1: next button
    var btn1 = document.getElementById('obBtn1');
    if (btn1) btn1.addEventListener('click', _next);

    // ── Screen 2: level cards
    var levelCards = $overlay.querySelectorAll('.ob-level-card');
    levelCards.forEach(function (card) {
      card.addEventListener('click', function () {
        levelCards.forEach(function (c) { c.classList.remove('selected'); });
        card.classList.add('selected');
        _selectedLevel = card.dataset.level;
      });
    });

    var btn2 = document.getElementById('obBtn2');
    if (btn2) btn2.addEventListener('click', _next);

    var skip2 = document.getElementById('obSkip2');
    if (skip2) skip2.addEventListener('click', function () {
      _selectedLevel = 'unknown';
      _next();
    });

    // ── Screen 3: goal items (multi-select, max 3)
    var goalItems = $overlay.querySelectorAll('.ob-goal-item');
    goalItems.forEach(function (item) {
      item.addEventListener('click', function () {
        var g = item.dataset.goal;
        var idx = _selectedGoals.indexOf(g);
        if (idx >= 0) {
          _selectedGoals.splice(idx, 1);
          item.classList.remove('selected');
        } else {
          if (_selectedGoals.length >= MAX_GOALS) {
            // Remove oldest selection
            var oldest = _selectedGoals.shift();
            var oldEl = $overlay.querySelector('[data-goal="' + oldest + '"]');
            if (oldEl) oldEl.classList.remove('selected');
          }
          _selectedGoals.push(g);
          item.classList.add('selected');
        }
        _updateFinishBtn();
      });
    });

    var btn3 = document.getElementById('obBtn3');
    if (btn3) btn3.addEventListener('click', _finish);
  }

  function _updateFinishBtn() {
    var btn3 = document.getElementById('obBtn3');
    if (!btn3) return;
    var hasGoals = _selectedGoals.length > 0;
    btn3.textContent = hasGoals ? 'Selesai \u2713' : 'Langsung mulai';
  }

})();
