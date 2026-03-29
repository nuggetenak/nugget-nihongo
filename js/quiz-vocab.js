// ══════════════════════════════════════════════════════
//  js/quiz-vocab.js — Nugget Nihongo
//  Vocab Quiz Mode: vocab_flash | vocab_mc | vocab_fill
//  Load SETELAH quiz-generator.js dan quiz-feedback.js
// ══════════════════════════════════════════════════════

(function () {

// ── State ───────────────────────────────────────────────
let vqDeck    = [];
let vqIdx     = 0;
let vqCorrect = 0;
let vqWrong   = 0;
let vqFlipped = false;
let vqAnswered= false;
let vqMode    = 'vocab_mc'; // vocab_flash | vocab_mc | vocab_fill

// ── Book filter state (dibagi pakai dengan browse-vocab) ─
// Bisa di-set sebelum startVocabQuiz() dipanggil
window.vqBookFilter  = { book: 'all', chapters: [] };

// ── POS label map ───────────────────────────────────────
const POS_LABEL = {
  'verb-u'   : 'Kata Kerja (Godan)',
  'verb-ru'  : 'Kata Kerja (Ichidan)',
  'verb-suru': 'Kata Kerja (する)',
  'verb-kuru': 'Kata Kerja Ireguler',
  'noun'     : 'Kata Benda',
  'i-adj'    : 'Kata Sifat い',
  'na-adj'   : 'Kata Sifat な',
  'adverb'   : 'Kata Keterangan',
  'particle' : 'Partikel',
  'expr'     : 'Ekspresi',
  'conj'     : 'Konjungsi',
  'prefix'   : 'Prefiks',
  'suffix'   : 'Sufiks',
  'counter'  : 'Kata Bilangan',
  'pronoun'  : 'Kata Ganti',
};

// ── Entry point: route dari startQuiz ──────────────────
const _vqPrevStartQuiz = window.startQuiz;
window.startQuiz = function (deck) {
  if (window._activeQuizMode === 'vocab_flash' ||
      window._activeQuizMode === 'vocab_mc'    ||
      window._activeQuizMode === 'vocab_fill') {
    startVocabQuiz(window._activeQuizMode);
    return;
  }
  _vqPrevStartQuiz(deck);
};

// ── setQuizMode override ────────────────────────────────
const _vqPrevSetQuizMode = window.setQuizMode;
window.setQuizMode = function (mode, btn) {
  window._activeQuizMode = mode;
  _vqPrevSetQuizMode(mode, btn);
};

// ── Hide all quiz panels ────────────────────────────────
function _hideAll() {
  ['quizSetup','quizActive','fillInActive','rearrangeActive',
   'conjugationActive','translationActive','errorFindActive',
   'multiChoiceActive','typeTrActive','quizResult','vocabQuizActive','mixedQuizActive'
  ].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
}

// ── Main start function ─────────────────────────────────
function startVocabQuiz(mode) {
  vqMode = mode || 'vocab_mc';

  // Determine jlpt filter dari quiz level pills (window.quizLevel di-expose oleh quiz.js)
  const jlpt = (window.quizLevel && window.quizLevel !== 'all') ? window.quizLevel : undefined;

  // Generate deck — prioritaskan book filter jika aktif
  const typeMap = {
    vocab_flash: 'flashcard',
    vocab_mc   : 'multichoice_meaning',
    vocab_fill : 'fill_word',
  };
  const genType = typeMap[vqMode] || 'multichoice_meaning';
  const n = 15;

  const bf = window.vqBookFilter || {};
  if (bf.book && bf.book !== 'all' && window.queryVocabByBook) {
    // Pakai pool dari buku — generate langsung tanpa memodifikasi quiz-generator
    const chaps = (bf.chapters && bf.chapters.length)
      ? bf.chapters
      : _allChaptersForQuiz(bf.book);
    const pool = window.queryVocabByBook(bf.book, chaps);
    if (pool.length >= 4) {
      vqDeck = _generateFromPool(genType, pool, n);
    } else {
      vqDeck = []; // pool terlalu kecil
    }
  } else {
    vqDeck = window.generateVocabQuiz
      ? window.generateVocabQuiz({ type: genType, jlpt, n })
      : [];
  }

  _hideAll();
  const container = document.getElementById('vocabQuizActive');
  if (!container) { console.error('vocabQuizActive not found'); return; }
  container.style.display = 'block';

  if (!vqDeck.length) {
    _showEmpty(container);
    return;
  }

  vqIdx = 0; vqCorrect = 0; vqWrong = 0;
  _renderQuestion();
}

// ── Empty state ─────────────────────────────────────────
function _showEmpty(container) {
  document.getElementById('vqCard').innerHTML = `
    <div class="fill-coming-soon">
      <div class="cs-icon">📚</div>
      <h3>Data belum tersedia</h3>
      <p>Vocab untuk level ini sedang disiapkan.<br>
      Coba pilih <strong>N5</strong> atau <strong>Semua Level</strong>.</p>
    </div>`;
  document.getElementById('vqProgressTxt').textContent = '0 / 0';
  document.getElementById('vqProgressFill').style.width = '0%';
  document.getElementById('vqScoreTxt').textContent = '✅ 0   ❌ 0';
}

// ── Render current question ─────────────────────────────
function _renderQuestion() {
  if (vqIdx >= vqDeck.length) { _showResult(); return; }
  vqAnswered = false;
  vqFlipped  = false;

  const q   = vqDeck[vqIdx];
  const pct = vqDeck.length ? (vqIdx / vqDeck.length * 100) : 0;

  document.getElementById('vqProgressFill').style.width = pct + '%';
  document.getElementById('vqProgressTxt').textContent  = `${vqIdx + 1} / ${vqDeck.length}`;
  document.getElementById('vqScoreTxt').innerHTML        =
    `✅ ${vqCorrect} &nbsp; ❌ ${vqWrong}`;

  // Level badge
  const badge = document.getElementById('vqLevelBadge');
  if (badge && q.jlpt) {
    badge.textContent  = q.jlpt.toUpperCase();
    badge.style.cssText =
      `background:var(--${q.jlpt}-dim);color:var(--${q.jlpt});border:1px solid var(--${q.jlpt}-border);`;
  }

  switch (vqMode) {
    case 'vocab_flash': _renderFlash(q); break;
    case 'vocab_mc'   : _renderMc(q);    break;
    case 'vocab_fill' : _renderFill(q);  break;
  }
}

// ─────────────────────────────────────────────────────
//  FLASHCARD MODE
// ─────────────────────────────────────────────────────
function _renderFlash(q) {
  const v = q.entry;
  _showPanel('vqFlashPanel');

  // Front face
  document.getElementById('vqFlashWord').textContent    = v.word;
  document.getElementById('vqFlashReading').textContent = v.reading;
  document.getElementById('vqFlashPos').textContent     = POS_LABEL[v.pos] || v.pos || '';

  // Back face (hidden until flip)
  document.getElementById('vqFlashMeaning').textContent = v.meaning_id;
  const ex = v.examples && v.examples[0];
  document.getElementById('vqFlashEx').textContent   = ex ? ex.jp : '';
  document.getElementById('vqFlashExId').textContent = ex ? ex.id : '';

  // Reset flip state
  const card = document.getElementById('vqFlashCard');
  card.classList.remove('flipped');
  document.getElementById('vqFlashBack').style.display  = 'none';
  document.getElementById('vqFlashFront').style.display = '';
  document.getElementById('vqAssessBtns').style.display = 'none';
  document.getElementById('vqFlashHint').style.display  = '';
}

window.vqFlipCard = function () {
  if (vqFlipped) return;
  vqFlipped = true;
  document.getElementById('vqFlashFront').style.display = 'none';
  document.getElementById('vqFlashBack').style.display  = '';
  document.getElementById('vqAssessBtns').style.display = 'flex';
  document.getElementById('vqFlashHint').style.display  = 'none';
};

window.vqAssess = function (rating) {
  if (!vqFlipped || vqAnswered) return;
  vqAnswered = true;
  if (rating === 'know')   vqCorrect++;
  else if (rating !== 'know') vqWrong++;
  // SRS update — map ke SM2 quality score (0–5)
  const srsQuality = { know: 4, unsure: 3, forgot: 0 };
  const q = vqDeck[vqIdx];
  if (window.srsReview && q.id) window.srsReview(q.id, srsQuality[rating] ?? 0);
  vqIdx++;
  setTimeout(_renderQuestion, 320);
};

// ─────────────────────────────────────────────────────
//  MULTICHOICE MEANING MODE
// ─────────────────────────────────────────────────────
function _renderMc(q) {
  _showPanel('vqMcPanel');
  document.getElementById('vqMcWord').textContent     = q.prompt;
  document.getElementById('vqMcQuestion').textContent = q.question;
  document.getElementById('vqMcFeedback').style.display = 'none';

  const choicesEl = document.getElementById('vqMcChoices');
  choicesEl.innerHTML = '';
  (q.choices || []).forEach(ch => {
    const btn = document.createElement('button');
    btn.className   = 'fill-choice';
    btn.textContent = ch;
    btn.onclick     = () => _mcAnswer(ch, q.answer, btn);
    choicesEl.appendChild(btn);
  });
}

function _mcAnswer(chosen, correct, btn) {
  if (vqAnswered) return;
  vqAnswered = true;

  const isRight = chosen === correct;
  if (isRight) vqCorrect++; else vqWrong++;

  // Highlight
  document.querySelectorAll('#vqMcChoices .fill-choice').forEach(b => {
    if (b.textContent === correct) b.classList.add('correct-choice');
    else if (b === btn && !isRight) b.classList.add('wrong-choice');
    b.disabled = true;
  });

  // Feedback
  const fb = document.getElementById('vqMcFeedback');
  fb.style.display = '';
  fb.innerHTML = `
    <div class="fill-feedback-verdict">${isRight ? '✅ Benar!' : '❌ Salah'}</div>
    ${!isRight ? `<div class="fill-explanation">Jawaban: <strong>${correct}</strong></div>` : ''}
    <button class="fill-next-btn" onclick="vqNext()">Lanjut →</button>`;
}

// ─────────────────────────────────────────────────────
//  FILL WORD MODE
// ─────────────────────────────────────────────────────
function _renderFill(q) {
  _showPanel('vqFillPanel');
  document.getElementById('vqFillSentence').innerHTML  = _renderBlanks(q.prompt);
  document.getElementById('vqFillMeaning').textContent = q.meaning || '';
  document.getElementById('vqFillFeedback').style.display = 'none';

  // Build choices (answer + 3 distractors from vocabDB)
  const choices = _buildFillChoices(q);
  const choicesEl = document.getElementById('vqFillChoices');
  choicesEl.innerHTML = '';
  choices.forEach(ch => {
    const btn = document.createElement('button');
    btn.className   = 'fill-choice';
    btn.textContent = ch;
    btn.onclick     = () => _fillAnswer(ch, q.answer, btn);
    choicesEl.appendChild(btn);
  });
}

function _renderBlanks(s) {
  return s.replace(/＿＿＿/g, '<span class="vq-blank">＿＿＿</span>');
}

function _buildFillChoices(q) {
  const pool = (window.vocabDB || [])
    .filter(v => v.word !== q.answer && v.pos === (q.entry && q.entry.pos))
    .map(v => v.word);
  const shuffled = pool.sort(() => Math.random() - 0.5).slice(0, 3);
  return [q.answer, ...shuffled].sort(() => Math.random() - 0.5);
}

function _fillAnswer(chosen, correct, btn) {
  if (vqAnswered) return;
  vqAnswered = true;

  const isRight = chosen === correct;
  if (isRight) vqCorrect++; else vqWrong++;

  document.querySelectorAll('#vqFillChoices .fill-choice').forEach(b => {
    if (b.textContent === correct) b.classList.add('correct-choice');
    else if (b === btn && !isRight) b.classList.add('wrong-choice');
    b.disabled = true;
  });

  // Fill in the blank
  const sentEl = document.getElementById('vqFillSentence');
  if (sentEl) {
    sentEl.innerHTML = sentEl.innerHTML.replace(
      /<span class="vq-blank">＿＿＿<\/span>/,
      `<span class="vq-blank-filled ${isRight ? 'correct' : 'wrong'}">${correct}</span>`
    );
  }

  const fb = document.getElementById('vqFillFeedback');
  fb.style.display = '';
  fb.innerHTML = `
    <div class="fill-feedback-verdict">${isRight ? '✅ Benar!' : '❌ Salah'}</div>
    ${!isRight ? `<div class="fill-explanation">Jawaban: <strong>${correct}</strong> (${q.meaning || ''})</div>` : ''}
    <button class="fill-next-btn" onclick="vqNext()">Lanjut →</button>`;
}

// ── Navigation ──────────────────────────────────────────
window.vqNext = function () {
  vqIdx++;
  _renderQuestion();
};

window.vqEndQuiz = function () {
  if (vqDeck.length === 0 || confirm('Akhiri quiz vocab sekarang?')) {
    _showResult();
  }
};

// ── Show/hide panels ────────────────────────────────────
function _showPanel(id) {
  ['vqFlashPanel','vqMcPanel','vqFillPanel'].forEach(pid => {
    const el = document.getElementById(pid);
    if (el) el.style.display = pid === id ? '' : 'none';
  });
}

// ── Result screen ───────────────────────────────────────
function _showResult() {
  _hideAll();
  const total = vqDeck.length;
  const pct   = total ? Math.round(vqCorrect / total * 100) : 0;

  // Reuse quizResult panel with custom content
  const resultEl = document.getElementById('quizResult');
  if (resultEl) {
    resultEl.style.display = '';

    // Update ring
    const circ = 2 * Math.PI * 52;
    const offset = circ * (1 - pct / 100);
    const ring = document.getElementById('ringFill');
    if (ring) ring.style.strokeDashoffset = offset;

    const titles = ['Luar Biasa! 🎉','Bagus Sekali! 👍','Terus Berlatih! 💪','Jangan Menyerah! 🔥'];
    const ti = pct >= 90 ? 0 : pct >= 70 ? 1 : pct >= 50 ? 2 : 3;

    const el = id => document.getElementById(id);
    if (el('resultPct'))      el('resultPct').textContent    = pct + '%';
    if (el('resultTitle'))    el('resultTitle').textContent  = titles[ti];
    if (el('resultSubtitle')) el('resultSubtitle').textContent =
      `${vqCorrect} benar dari ${total} soal vocab`;
    if (el('rKnow'))   el('rKnow').textContent   = vqCorrect;
    if (el('rUnsure')) el('rUnsure').textContent = 0;
    if (el('rForgot')) el('rForgot').textContent = vqWrong;
    if (el('retryMissedBtn')) el('retryMissedBtn').style.display = 'none';
    if (el('resultSrsHint'))  el('resultSrsHint').style.display  = 'none';
  }
}

// ── Helper: semua chapter dari buku (untuk quiz) ─────────
const QUIZ_BOOK_CHAPTERS = {
  'minna-no-nihongo-1': 25, 'minna-no-nihongo-2': 25,
  'irodori-a1': 9, 'irodori-a2-1': 9, 'irodori-a2-2': 9,
};
function _allChaptersForQuiz(bookKey) {
  const count = QUIZ_BOOK_CHAPTERS[bookKey] || 0;
  return Array.from({ length: count }, (_, i) => i + 1);
}

// ── Generate quiz dari custom pool ───────────────────────
function _generateFromPool(type, pool, n) {
  const shuffled = pool.slice().sort(() => Math.random() - 0.5);
  const sample   = shuffled.slice(0, Math.min(n, 20));
  const allPool  = window.vocabDB || pool;

  return sample.map(v => {
    if (type === 'flashcard') {
      return { id: v.id, jlpt: v.jlpt, entry: v, source: 'vocab' };
    }
    if (type === 'fill_word') {
      const ex = v.examples && v.examples[0];
      if (!ex) return null;
      return {
        id: v.id, jlpt: v.jlpt, entry: v,
        prompt : ex.jp.replace(new RegExp(v.word.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')), '＿＿＿'),
        answer : v.word,
        meaning: v.meaning_id,
      };
    }
    // default: multichoice_meaning
    const distractors = allPool
      .filter(x => x.id !== v.id && x.jlpt === v.jlpt && x.meaning_id)
      .sort(() => Math.random() - 0.5).slice(0, 3)
      .map(x => x.meaning_id);
    if (distractors.length < 3) return null;
    const choices = [v.meaning_id, ...distractors].sort(() => Math.random() - 0.5);
    return {
      id: v.id, jlpt: v.jlpt, entry: v,
      prompt  : v.word,
      question: `Apa arti dari "${v.reading || v.word}"?`,
      choices,
      answer  : v.meaning_id,
    };
  }).filter(Boolean);
}

// ── Expose ──────────────────────────────────────────────
window.startVocabQuiz = startVocabQuiz;

})();
