//  conjugation.js — Conjugation Quiz Mode
//  Soal: ubah kata kerja ke bentuk tertentu (pilihan ganda)
//  Tipe bank soal: { type:'conjugation', instruction, base, choices[], answer, grammarId, explanation }
// ══════════════════════════════════════════════════════════════════

let conjDeck = [], conjIdx = 0, conjCorrect = 0, conjWrong = 0;
let conjAnswered = false;
let conjResults = []; // per-soal untuk SRS feed

// ── Bank getter ──────────────────────────────────────────────────
window.getConjugationBank = function({ level, week } = {}) {
  const pool = window.bankSoalQuiz4 || [];
  return pool.filter(q =>
    q.type === 'conjugation' &&
    (level === 'all' || !level || q.level === level) &&
    (week  === null  || week  === undefined || q.week  === week)
  );
};

// ── Route dari startQuiz ─────────────────────────────────────────
const _conjOrigStartQuiz = window.startQuiz;
window.startQuiz = function(deck) {
  if (quizMode === 'conjugation') { startConjugationQuiz(); return; }
  _conjOrigStartQuiz(deck);
};

// ── Helper: sembunyikan semua panel aktif ────────────────────────
function hideAllQuizPanels() {
  ['quizActive','fillInActive','rearrangeActive',
   'conjugationActive','translationActive',
   'errorFindActive','multiChoiceActive','quizResult'
  ].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
}

// ── Start ────────────────────────────────────────────────────────
function startConjugationQuiz() {
  const pool = window.getConjugationBank({ level: quizLevel, week: quizWeek });

  hideAllQuizPanels();
  document.getElementById('quizSetup').style.display = 'none';

  const activeEl = document.getElementById('conjugationActive');
  if (!activeEl) { console.error('conjugationActive not found'); return; }
  activeEl.style.display = 'block';

  if (!pool.length) {
    document.getElementById('conjCard').innerHTML = `
      <div class="fill-coming-soon">
        <div class="cs-icon">🔤</div>
        <h3>Soal belum tersedia</h3>
        <p>Bank soal Conjugation untuk level/minggu ini sedang disiapkan.<br>
        Sementara coba <strong>N3 atau N4</strong> yang sudah tersedia!</p>
      </div>`;
    document.getElementById('conjProgressTxt').textContent = '0 / 0';
    document.getElementById('conjProgressFill').style.width = '0%';
    document.getElementById('conjScoreTxt').innerHTML = '—';
    return;
  }

  conjDeck = [...pool].sort(() => Math.random() - 0.5);
  conjIdx = 0; conjCorrect = 0; conjWrong = 0; conjResults = [];
  showConjugationQuestion();
}

// ── Tampilkan soal ────────────────────────────────────────────────
function showConjugationQuestion() {
  if (conjIdx >= conjDeck.length) { showConjugationResult(); return; }
  conjAnswered = false;

  const q   = conjDeck[conjIdx];
  const pct = conjDeck.length ? (conjIdx / conjDeck.length * 100) : 0;

  document.getElementById('conjProgressFill').style.width = pct + '%';
  document.getElementById('conjProgressTxt').textContent  = `${conjIdx} / ${conjDeck.length}`;
  document.getElementById('conjScoreTxt').innerHTML       = `✅ ${conjCorrect} &nbsp; ❌ ${conjWrong}`;
  document.getElementById('conjFeedback').style.display   = 'none';

  // Level badge
  const badge = document.getElementById('conjLevelBadge');
  badge.textContent = q.level.toUpperCase();
  badge.style.cssText = `background:var(--${q.level}-dim);color:var(--${q.level});border:1px solid var(--${q.level}-border);`;

  // Soal
  document.getElementById('conjInstruction').textContent = q.instruction;
  document.getElementById('conjBase').textContent        = q.base;

  // Grammar hint
  const linked = (window.grammarData || []).find(d => d.id === q.grammarId);
  document.getElementById('conjGrammarHint').textContent =
    linked ? `関連: ${linked.grammar} — ${linked.meaning}` : '';

  // Choices (shuffle)
  const shuffled = q.choices
    .map((c, i) => ({ c, i }))
    .sort(() => Math.random() - 0.5);

  document.getElementById('conjChoices').innerHTML = shuffled.map(({ c, i }) =>
    `<button class="fill-choice conj-choice" onclick="conjAnswer(${i}, this)" data-idx="${i}">${c}</button>`
  ).join('');

  // Reanimate card
  const card = document.getElementById('conjCard');
  card.style.animation = 'none';
  requestAnimationFrame(() => { card.style.animation = ''; });
}

// ── Jawab soal ────────────────────────────────────────────────────
window.conjAnswer = function(choiceIdx, btn) {
  if (conjAnswered) return;
  conjAnswered = true;

  const q       = conjDeck[conjIdx];
  const correct = choiceIdx === q.answer;

  if (correct) conjCorrect++; else conjWrong++;
  conjResults[conjIdx] = correct;

  // Highlight tombol
  document.querySelectorAll('.conj-choice').forEach(b => {
    const idx = parseInt(b.dataset.idx);
    b.classList.add('disabled');
    if (idx === q.answer)          b.classList.add('reveal-correct');
    if (b === btn && !correct)     b.classList.add('selected-wrong');
    if (b === btn && correct)      b.classList.add('selected-correct');
  });

  // Tampilkan jawaban benar di bawah base word
  const baseEl = document.getElementById('conjBase');
  const arrow  = document.createElement('span');
  arrow.className = 'conj-answer-reveal';
  arrow.innerHTML = ` → <strong style="color:${correct ? 'var(--accent-green)' : 'var(--accent-red)'}">${q.choices[q.answer]}</strong>`;
  // Hapus arrow sebelumnya jika ada
  const oldArrow = document.querySelector('.conj-answer-reveal');
  if (oldArrow) oldArrow.remove();
  baseEl.after(arrow);

  // Feedback
  const conjFeedback = document.getElementById('conjFeedback');
  const conjSentence = `${q.base} → <b>${q.choices[q.answer]}</b>`;
  window.renderQuizFeedback({
    correct,
    answerLabel  : correct ? null : q.choices[q.answer],
    sentence     : conjSentence,
    sentenceId   : `conj-${conjIdx}`,
    explanation  : q.explanation,
    verdictEl    : document.getElementById('conjVerdict'),
    explEl       : document.getElementById('conjExplanation'),
    feedbackEl   : conjFeedback,
    insertBefore : conjFeedback.querySelector('.fill-next-btn')
  });

  // Score update
  document.getElementById('conjScoreTxt').innerHTML = `✅ ${conjCorrect} &nbsp; ❌ ${conjWrong}`;
};

// ── Soal berikutnya ──────────────────────────────────────────────
window.conjNext = function() {
  // Hapus arrow jawaban
  const oldArrow = document.querySelector('.conj-answer-reveal');
  if (oldArrow) oldArrow.remove();
  conjIdx++;
  showConjugationQuestion();
};

// ── Hasil ────────────────────────────────────────────────────────
function showConjugationResult() {
  document.getElementById('conjugationActive').style.display = 'none';

  // Feed SRS
  if (window.saveProgress) {
    conjDeck.forEach((q, idx) => {
      if (idx >= conjIdx) return;
      if (q.grammarId) window.saveProgress(q.grammarId, conjResults[idx] ? 'know' : 'forgot');
    });
  }

  // Inject ke result screen shared
  qKnow   = conjCorrect;
  qUnsure = 0;
  qForgot = conjWrong;
  quizDeck = conjDeck;
  quizIdx  = conjDeck.length;
  missedDeck = [];
  showResult();

  // Override subtitle agar relevan
  const subEl = document.getElementById('resultSubtitle');
  if (subEl) subEl.textContent =
    `${conjCorrect} dari ${conjDeck.length} bentuk kata kerja benar.`;
}

window.endConjugationQuiz = function() {
  document.getElementById('conjugationActive').style.display = 'none';
  showConjugationResult();
};

// ── Patch restartQuiz ────────────────────────────────────────────
const _conjOrigRestart = window.restartQuiz;
window.restartQuiz = function() {
  const conjEl = document.getElementById('conjugationActive');
  if (conjEl) conjEl.style.display = 'none';
  _conjOrigRestart();
};
