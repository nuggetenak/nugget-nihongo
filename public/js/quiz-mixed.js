// ══════════════════════════════════════════════════════
//  js/quiz-mixed.js — Nugget Nihongo v14.3
//  Mixed Quiz Mode: grammar flashcard + vocab multichoice
//  interleaved dalam satu sesi.
//  Bergantung pada: quiz-generator.js, quiz-vocab.js
//  Expose: window.startMixedQuiz()
// ══════════════════════════════════════════════════════

(function () {

// ── State ────────────────────────────────────────────
let mxDeck     = [];
let mxIdx      = 0;
let mxCorrect  = 0;
let mxWrong    = 0;
let mxAnswered = false;
let mxFlipped  = false;

// ── startQuiz override ───────────────────────────────
const _mxPrevStartQuiz = window.startQuiz;
window.startQuiz = function (deck) {
  if (window._activeQuizMode === 'mixed_review') {
    startMixedQuiz();
    return;
  }
  _mxPrevStartQuiz(deck);
};

// ── setQuizMode override ─────────────────────────────
const _mxPrevSetQuizMode = window.setQuizMode;
window.setQuizMode = function (mode, btn) {
  window._activeQuizMode = mode;
  _mxPrevSetQuizMode(mode, btn);
};

// ── Hide all quiz panels ─────────────────────────────
function _hideAll() {
  ['quizSetup','quizActive','fillInActive','rearrangeActive',
   'conjugationActive','translationActive','errorFindActive',
   'multiChoiceActive','typeTrActive','quizResult',
   'vocabQuizActive','mixedQuizActive'
  ].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
}

// ── Main entry ───────────────────────────────────────
function startMixedQuiz() {
  const jlpt  = (window.quizLevel && window.quizLevel !== 'all') ? window.quizLevel : undefined;
  const level = jlpt;

  mxDeck = window.generateMixedQuiz
    ? window.generateMixedQuiz({ jlpt, level, n: 20 })
    : [];

  _hideAll();
  const container = document.getElementById('mixedQuizActive');
  if (!container) { console.error('mixedQuizActive not found'); return; }
  container.style.display = 'block';

  mxIdx = 0; mxCorrect = 0; mxWrong = 0;

  if (!mxDeck.length) {
    _showEmpty(container);
    return;
  }
  _renderItem();
}

// ── Empty state ──────────────────────────────────────
function _showEmpty(container) {
  const cardSlot = container.querySelector('#mxFlashPanel,#mxMcPanel');
  if (cardSlot) {
    _showPanel('mxFlashPanel');
    document.getElementById('mxFlashGrammar').textContent = '';
    document.getElementById('mxFlashReading').textContent = '';
    document.getElementById('mxFlashHint').style.display  = 'none';
  }
  document.getElementById('mxProgressTxt').textContent = '0 / 0';
  document.getElementById('mxProgressFill').style.width = '0%';
  document.getElementById('mxScoreTxt').innerHTML = '✅ 0 &nbsp; ❌ 0';

  const fallback = document.getElementById('mxEmptyMsg');
  if (fallback) fallback.style.display = '';
}

// ── Render current item ──────────────────────────────
function _renderItem() {
  if (mxIdx >= mxDeck.length) { _showResult(); return; }
  mxAnswered = false;
  mxFlipped  = false;

  const item = mxDeck[mxIdx];
  const pct  = mxDeck.length ? (mxIdx / mxDeck.length * 100) : 0;

  document.getElementById('mxProgressFill').style.width = pct + '%';
  document.getElementById('mxProgressTxt').textContent  = `${mxIdx + 1} / ${mxDeck.length}`;
  document.getElementById('mxScoreTxt').innerHTML       = `✅ ${mxCorrect} &nbsp; ❌ ${mxWrong}`;

  // Level / source badge
  const lvlBadge = document.getElementById('mxLevelBadge');
  const lvl = item.jlpt || item.level || '';
  if (lvlBadge && lvl) {
    lvlBadge.textContent = lvl.toUpperCase();
    lvlBadge.style.cssText =
      `background:var(--${lvl}-dim);color:var(--${lvl});border:1px solid var(--${lvl}-border);display:inline-block`;
  } else if (lvlBadge) {
    lvlBadge.style.display = 'none';
  }

  const srcBadge = document.getElementById('mxSourceBadge');
  if (srcBadge) {
    const isVocab = item.source === 'vocab';
    srcBadge.textContent  = isVocab ? '📚 Kosakata' : '📖 Grammar';
    srcBadge.className    = 'mx-source-badge ' + (isVocab ? 'mx-src-vocab' : 'mx-src-grammar');
  }

  // Route ke renderer yang sesuai
  if (item.source === 'vocab' || item.type === 'multichoice_meaning') {
    _renderMc(item);
  } else {
    _renderFlash(item);
  }
}

// ─────────────────────────────────────────────────────
//  GRAMMAR FLASHCARD
// ─────────────────────────────────────────────────────
function _renderFlash(item) {
  _showPanel('mxFlashPanel');

  document.getElementById('mxFlashGrammar').textContent = item.front  || item.grammar || '';
  document.getElementById('mxFlashReading').textContent = item.front_sub || item.reading || '';
  document.getElementById('mxFlashMeaning').textContent = item.back   || item.meaning || '';

  // Ambil contoh dari desc atau examples[0]
  let desc = item.desc || '';
  if (!desc && item.examples && item.examples[0]) {
    desc = item.examples[0].jp + ' → ' + item.examples[0].id;
  }
  document.getElementById('mxFlashDesc').textContent = desc;

  // Reset flip state
  document.getElementById('mxFlashFront').style.display  = '';
  document.getElementById('mxFlashBack').style.display   = 'none';
  document.getElementById('mxAssessBtns').style.display  = 'none';
  document.getElementById('mxFlashHint').style.display   = '';
  document.getElementById('mxFlashCard').classList.remove('flipped');
}

window.mxFlipCard = function () {
  if (mxFlipped) return;
  mxFlipped = true;
  document.getElementById('mxFlashFront').style.display = 'none';
  document.getElementById('mxFlashBack').style.display  = '';
  document.getElementById('mxAssessBtns').style.display = 'flex';
  document.getElementById('mxFlashHint').style.display  = 'none';
};

window.mxAssess = function (rating) {
  if (!mxFlipped || mxAnswered) return;
  mxAnswered = true;
  if (rating === 'know') mxCorrect++; else mxWrong++;
  mxIdx++;
  setTimeout(_renderItem, 320);
};

// ─────────────────────────────────────────────────────
//  VOCAB MULTICHOICE
// ─────────────────────────────────────────────────────
function _renderMc(item) {
  _showPanel('mxMcPanel');

  document.getElementById('mxMcWord').textContent    = item.prompt || item.front || '';
  document.getElementById('mxMcQuestion').textContent = item.question || 'Apa arti kata ini?';
  document.getElementById('mxMcFeedback').style.display = 'none';

  const choicesEl = document.getElementById('mxMcChoices');
  choicesEl.innerHTML = '';
  (item.choices || []).forEach(ch => {
    const btn = document.createElement('button');
    btn.className   = 'fill-choice';
    btn.textContent = ch;
    btn.onclick     = () => _mcAnswer(ch, item.answer, btn, item);
    choicesEl.appendChild(btn);
  });
}

function _mcAnswer(chosen, correct, btn, item) {
  if (mxAnswered) return;
  mxAnswered = true;

  const isRight = chosen === correct;
  if (isRight) mxCorrect++; else mxWrong++;

  document.querySelectorAll('#mxMcChoices .fill-choice').forEach(b => {
    if (b.textContent === correct) b.classList.add('correct-choice');
    else if (b === btn && !isRight) b.classList.add('wrong-choice');
    b.disabled = true;
  });

  // SRS vocab update
  if (window.srsReview && item.id) {
    window.srsReview(item.id, isRight ? 4 : 1);
  }

  const fb = document.getElementById('mxMcFeedback');
  fb.style.display = '';
  fb.innerHTML = `
    <div class="fill-feedback-verdict">${isRight ? '✅ Benar!' : '❌ Salah'}</div>
    ${!isRight ? `<div class="fill-explanation">Jawaban: <strong>${correct}</strong></div>` : ''}
    <button class="fill-next-btn" onclick="mxNext()">Lanjut →</button>`;
}

// ── Navigation ───────────────────────────────────────
window.mxNext = function () {
  mxIdx++;
  _renderItem();
};

window.mxEndQuiz = function () {
  if (mxDeck.length === 0 || confirm('Akhiri Mixed Quiz sekarang?')) {
    _showResult();
  }
};

// ── Show/hide panels ─────────────────────────────────
function _showPanel(id) {
  ['mxFlashPanel','mxMcPanel'].forEach(pid => {
    const el = document.getElementById(pid);
    if (el) el.style.display = pid === id ? '' : 'none';
  });
}

// ── Result screen ─────────────────────────────────────
function _showResult() {
  _hideAll();
  const total = mxDeck.length;
  const pct   = total ? Math.round(mxCorrect / total * 100) : 0;

  const resultEl = document.getElementById('quizResult');
  if (!resultEl) return;
  resultEl.style.display = '';

  const circ  = 2 * Math.PI * 52;
  const ring  = document.getElementById('ringFill');
  if (ring) ring.style.strokeDashoffset = circ * (1 - pct / 100);

  const titles = ['Luar Biasa! 🎉','Bagus Sekali! 👍','Terus Berlatih! 💪','Jangan Menyerah! 🔥'];
  const ti     = pct >= 90 ? 0 : pct >= 70 ? 1 : pct >= 50 ? 2 : 3;

  const el = id => document.getElementById(id);
  if (el('resultPct'))      el('resultPct').textContent    = pct + '%';
  if (el('resultTitle'))    el('resultTitle').textContent  = titles[ti];
  if (el('resultSubtitle')) el('resultSubtitle').textContent =
    `${mxCorrect} benar dari ${total} soal (Grammar + Kosakata)`;
  if (el('rKnow'))   el('rKnow').textContent   = mxCorrect;
  if (el('rUnsure')) el('rUnsure').textContent = 0;
  if (el('rForgot')) el('rForgot').textContent = mxWrong;
  if (el('retryMissedBtn')) el('retryMissedBtn').style.display = 'none';
  if (el('resultSrsHint'))  el('resultSrsHint').style.display  = 'none';
}

// ── Expose ───────────────────────────────────────────
window.startMixedQuiz = startMixedQuiz;

})();
