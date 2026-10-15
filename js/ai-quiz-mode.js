// ══════════════════════════════════════════════════════════════════
//  ai-quiz-mode.js — "Latihan AI" quiz mode integration
//  Phase 5.5b — wires AIContentEngine into the quiz flow.
//
//  Feature-flagged: only active when nn_feature_ai_quiz_gen === '1'.
//  Intercepts setQuizMode('ai_quiz') and startQuiz() in the same
//  chain-override pattern as quiz-mixed.js and quiz-vocab.js.
//
//  Load order: must load AFTER ai-content-engine.js and quiz-mixed.js.
//              Placed at the bottom of <script> tags in index.html.
//
//  What it does:
//    - Shows #modeAIQuiz button on DOMContentLoaded if flag is on
//    - On startQuiz() when quizMode === 'ai_quiz':
//        1. Shows loading state
//        2. Calls AIContentEngine.generateQuiz with current level + target
//        3. On success: renders questions in the existing multi-choice UI
//           with AIFeedback widgets attached to each card
//        4. On failure / short delivery: loads fallback drills instead
// ══════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  var FLAG = 'nn_feature_ai_quiz_gen';

  function isEnabled() {
    try { return localStorage.getItem(FLAG) === '1'; } catch { return false; }
  }

  // ── Show the AI quiz button if flag on ────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    if (!isEnabled()) return;
    var btn = document.getElementById('modeAIQuiz');
    if (btn) btn.style.display = '';
  });

  // ── setQuizMode override (chain pattern) ──────────────────────
  var _prevSetQuizMode = window.setQuizMode;
  window.setQuizMode = function (mode, btn) {
    if (_prevSetQuizMode) _prevSetQuizMode(mode, btn);
    if (mode === 'ai_quiz') {
      window._activeQuizMode = 'ai_quiz';
    }
  };

  // ── startQuiz override ────────────────────────────────────────
  var _prevStartQuiz = window.startQuiz;
  window.startQuiz = function (deck) {
    if (window._activeQuizMode !== 'ai_quiz') {
      if (_prevStartQuiz) _prevStartQuiz(deck);
      return;
    }
    if (!isEnabled()) {
      if (_prevStartQuiz) _prevStartQuiz(deck);
      return;
    }
    startAIQuiz();
  };

  // ── AI Quiz flow ──────────────────────────────────────────────
  function _hideAll() {
    ['quizSetup','quizActive','fillInActive','rearrangeActive',
     'conjugationActive','translationActive','errorFindActive',
     'multiChoiceActive','typeTrActive','quizResult',
     'vocabQuizActive','mixedQuizActive','aiQuizActive',
    ].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
  }

  function _getLevel() {
    try { return window.quizLevel && window.quizLevel !== 'all' ? window.quizLevel : 'n4'; }
    catch { return 'n4'; }
  }

  function _getTarget() {
    // Try to derive from current grammar selection or SRS due cards
    try {
      if (window.quizGrammarId) return { target_id: window.quizGrammarId, target: window.quizGrammarId };
      if (window.srsDueToday) {
        var due = window.srsDueToday();
        var first = due[0];
        if (first) return { target_id: first.id, target: first.pattern || first.word || first.id };
      }
    } catch {}
    return { target: '〜ために', target_id: 'gn4-tame' }; // sensible default
  }

  function startAIQuiz() {
    _hideAll();

    // Ensure container exists (create on first run)
    var container = document.getElementById('aiQuizActive');
    if (!container) {
      container = document.createElement('div');
      container.id = 'aiQuizActive';
      container.className = 'page-inner';
      var quizPage = document.getElementById('quizPage');
      if (quizPage) quizPage.appendChild(container);
    }
    container.style.display = 'block';
    container.innerHTML = '<div class="ai-quiz-loading"><div class="ai-quiz-spinner"></div>' +
      '<p class="ai-quiz-hint">Sensei lagi buatin soal khusus buat kamu…</p></div>';

    var level = _getLevel();
    var targetObj = _getTarget();
    var goals = [];
    try { goals = JSON.parse(localStorage.getItem('nn_goals') || '[]'); } catch {}

    if (!window.AIContentEngine || !window.AIContentEngine.isEnabled()) {
      _showFallback(container, level, 'AI quiz engine belum aktif.');
      return;
    }

    window.AIContentEngine.generateQuiz({
      target:         targetObj.target,
      target_id:      targetObj.target_id,
      level:          level,
      count:          10,
      type:           'mcq',
    }).then(function (result) {
      var questions = result && result.questions ? result.questions : [];
      if (!questions.length || result.short_of_target) {
        _showFallback(container, level, questions.length
          ? 'Soal AI hanya ' + questions.length + ' — ditambah soal cadangan.'
          : null);
        return;
      }
      _renderAIQuiz(container, questions, result.stats);
    }).catch(function (e) {
      console.error('[ai-quiz-mode] generateQuiz failed:', e.message);
      _showFallback(container, level, 'Sensei lagi ramai. Pakai soal cadangan dulu.');
    });
  }

  function _renderAIQuiz(container, questions, stats) {
    var crossProvider = stats && stats.cross_provider;
    var providerNote = crossProvider
      ? 'Generator: ' + (stats.generator_provider || '?') + ' → Critic: ' + (stats.critic_provider || '?')
      : '';

    var html = '<div class="ai-quiz-header">' +
      '<h3 class="ai-quiz-title">Latihan AI</h3>' +
      (providerNote ? '<span class="ai-quiz-provider-note">' + providerNote + '</span>' : '') +
      '<span class="ai-quiz-count">' + questions.length + ' soal</span>' +
      '</div>';
    html += '<div class="ai-quiz-list" id="aiQuizList"></div>';
    html += '<div class="ai-quiz-footer">' +
      '<button class="btn-primary" onclick="window._aiQuizCheckAll()">Selesai &amp; Cek</button>' +
      '</div>';
    container.innerHTML = html;

    var list = container.querySelector('#aiQuizList');
    questions.forEach(function (q, i) {
      var card = _buildQuestionCard(q, i);
      list.appendChild(card);
      // Attach feedback widget
      if (window.AIFeedback) {
        var fbContainer = card.querySelector('.ai-quiz-fb');
        if (fbContainer) window.AIFeedback.renderWidget(fbContainer, q, { itemType: 'quiz_question' });
      }
    });

    // Check-all handler
    window._aiQuizCheckAll = function () { _checkAll(container, questions); };
  }

  function _buildQuestionCard(q, idx) {
    var card = document.createElement('div');
    card.className = 'ai-quiz-card';
    card.dataset.questionId = q.id;

    var promptHtml = '<div class="ai-quiz-prompt"><span class="ai-quiz-num">' + (idx + 1) + '.</span> ' +
      _escHtml(q.prompt) + '</div>';

    var choicesHtml = '<div class="ai-quiz-choices">';
    (q.choices || []).forEach(function (c, ci) {
      var label = String.fromCharCode(65 + ci); // A B C D
      choicesHtml += '<button class="ai-quiz-choice" data-value="' + _escAttr(c) + '" ' +
        'onclick="window._aiQuizSelect(this)">' +
        '<span class="ai-quiz-choice-label">' + label + '</span>' +
        '<span class="ai-quiz-choice-text">' + _escHtml(c) + '</span>' +
        '</button>';
    });
    choicesHtml += '</div>';

    var fbHtml = '<div class="ai-quiz-fb"></div>';
    card.innerHTML = promptHtml + choicesHtml + fbHtml;
    return card;
  }

  // Select a choice (deselect others in same card)
  window._aiQuizSelect = function (btn) {
    var card = btn.closest('.ai-quiz-card');
    if (!card || card.dataset.answered === '1') return;
    card.querySelectorAll('.ai-quiz-choice').forEach(function (b) { b.classList.remove('selected'); });
    btn.classList.add('selected');
  };

  function _checkAll(container, questions) {
    var correct = 0;
    questions.forEach(function (q) {
      var card = container.querySelector('[data-question-id="' + q.id + '"]');
      if (!card) return;
      card.dataset.answered = '1';
      var selected = card.querySelector('.ai-quiz-choice.selected');
      card.querySelectorAll('.ai-quiz-choice').forEach(function (btn) {
        var val = btn.dataset.value;
        if (val === q.answer) btn.classList.add('correct');
        else if (btn === selected) btn.classList.add('wrong');
        btn.disabled = true;
      });
      if (selected && selected.dataset.value === q.answer) correct++;
      // Show explanation
      if (q.explanation_id) {
        var exp = document.createElement('div');
        exp.className = 'ai-quiz-explanation';
        exp.textContent = q.explanation_id;
        card.appendChild(exp);
      }
    });
    // Score bar
    var scoreEl = document.createElement('div');
    scoreEl.className = 'ai-quiz-score';
    scoreEl.innerHTML = '<strong>' + correct + '/' + questions.length + '</strong> benar';
    container.querySelector('#aiQuizList').before(scoreEl);
    container.querySelector('.ai-quiz-footer').innerHTML =
      '<button class="btn-secondary" onclick="window.switchTab(\'quiz\')">Kembali</button>';
  }

  function _showFallback(container, level, message) {
    container.innerHTML = '<div class="ai-quiz-fallback-msg">' +
      (message ? '<p class="ai-quiz-fallback-note">' + _escHtml(message) + '</p>' : '') +
      '<p>Memuat soal cadangan…</p></div>';

    var src = window.offlineAI && window.offlineAI.getFallbackDrills
      ? window.offlineAI.getFallbackDrills(level)
      : Promise.resolve([]);

    src.then(function (questions) {
      if (!questions || !questions.length) {
        container.innerHTML = '<div class="ai-quiz-error">' +
          '<p>Sensei lagi nggak bisa generate soal dan soal cadangan juga nggak ketemu.</p>' +
          '<p>Coba lagi nanti, atau pilih mode latihan lain.</p>' +
          '<button class="btn-secondary" onclick="window.switchTab(\'quiz\')">Kembali</button>' +
          '</div>';
        return;
      }
      _renderAIQuiz(container, questions, null);
    });
  }

  function _escHtml(s) {
    return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;')
      .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
  function _escAttr(s) { return _escHtml(s); }

  // ── Inline CSS for AI quiz UI ─────────────────────────────────
  (function injectStyles() {
    if (document.getElementById('ai-quiz-styles')) return;
    var s = document.createElement('style');
    s.id = 'ai-quiz-styles';
    s.textContent = [
      '#aiQuizActive{padding:1rem;max-width:640px;margin:0 auto}',
      '.ai-quiz-loading{display:flex;flex-direction:column;align-items:center;',
        'justify-content:center;min-height:200px;gap:1rem}',
      '.ai-quiz-spinner{width:32px;height:32px;border:3px solid var(--border-2,#ddd);',
        'border-top-color:var(--accent,#2563eb);border-radius:50%;',
        'animation:ai-spin .8s linear infinite}',
      '@keyframes ai-spin{to{transform:rotate(360deg)}}',
      '.ai-quiz-hint{color:var(--muted,#888);font-size:13px}',
      '.ai-quiz-header{display:flex;align-items:baseline;gap:.5rem;',
        'flex-wrap:wrap;margin-bottom:1rem}',
      '.ai-quiz-title{font-size:1.1rem;font-weight:700;margin:0}',
      '.ai-quiz-provider-note{font-size:10px;color:var(--muted,#888);',
        'border:1px solid var(--border-2,#ddd);padding:2px 6px;border-radius:8px}',
      '.ai-quiz-count{margin-left:auto;font-size:12px;color:var(--muted,#888)}',
      '.ai-quiz-score{background:var(--surface-2,#f0f7ff);border-radius:10px;',
        'padding:.6rem 1rem;margin-bottom:.75rem;font-size:1rem;',
        'border:1px solid var(--border-2,#ddd)}',
      '.ai-quiz-card{background:var(--surface,#fff);border:1px solid var(--border-2,#ddd);',
        'border-radius:12px;padding:1rem;margin-bottom:.75rem}',
      '.ai-quiz-prompt{font-size:.95rem;line-height:1.5;margin-bottom:.75rem}',
      '.ai-quiz-num{font-weight:700;color:var(--accent,#2563eb);margin-right:.25rem}',
      '.ai-quiz-choices{display:flex;flex-direction:column;gap:.4rem;margin-bottom:.5rem}',
      '.ai-quiz-choice{display:flex;align-items:center;gap:.5rem;',
        'background:var(--surface-2,#f8f8f8);border:1.5px solid var(--border-2,#ddd);',
        'border-radius:8px;padding:.5rem .75rem;cursor:pointer;',
        'text-align:left;transition:all .15s;font-size:.9rem}',
      '.ai-quiz-choice.selected{border-color:var(--accent,#2563eb);',
        'background:rgba(37,99,235,.08)}',
      '.ai-quiz-choice.correct{border-color:#16a34a;background:rgba(22,163,74,.1);color:#15803d}',
      '.ai-quiz-choice.wrong{border-color:#dc2626;background:rgba(220,38,38,.08);color:#b91c1c}',
      '.ai-quiz-choice:disabled{cursor:default}',
      '.ai-quiz-choice-label{font-weight:700;min-width:1rem;color:var(--muted,#888)}',
      '.ai-quiz-explanation{font-size:.82rem;color:var(--muted,#666);',
        'background:var(--surface-2,#f8f8f8);border-radius:6px;',
        'padding:.4rem .6rem;margin-top:.5rem;line-height:1.5}',
      '.ai-quiz-fallback-msg,.ai-quiz-error{color:var(--muted,#888);',
        'font-size:.9rem;padding:1rem;text-align:center}',
      '.ai-quiz-footer{padding:.75rem 0;display:flex;gap:.5rem;justify-content:center}',
      '.ai-quiz-fb{margin-top:.25rem}',
    ].join('');
    document.head.appendChild(s);
  })();

})();
