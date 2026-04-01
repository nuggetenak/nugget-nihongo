//  translation.js — Translation Quiz Mode
//  Soal: terjemahkan kalimat ID→JP atau JP→ID (pilihan ganda)
//  Tipe bank soal: { type:'translation', direction, prompt, choices[], answer, grammarId, explanation }
// ══════════════════════════════════════════════════════════════════

let transDeck = [], transIdx = 0, transCorrect = 0, transWrong = 0;
let transAnswered = false;
let transResults = []; // per-soal untuk SRS feed

// ── Bank getter ──────────────────────────────────────────────────
window.getTranslationBank = function({ level, week } = {}) {
  const pool = window.bankSoalQuiz4 || [];
  return pool.filter(q =>
    q.type === 'translation' &&
    (level === 'all' || !level || q.level === level) &&
    (week  === null  || week  === undefined || q.week  === week)
  );
};

// ── Route dari startQuiz ─────────────────────────────────────────
const _transOrigStartQuiz = window.startQuiz;
window.startQuiz = function(deck) {
  if (quizMode === 'translation') { startTranslationQuiz(); return; }
  _transOrigStartQuiz(deck);
};

// ── Label arah terjemahan ─────────────────────────────────────────
const TRANS_DIR_LABEL = {
  id_to_jp: { icon: '🇮🇩 → 🇯🇵', text: 'Terjemahkan ke Bahasa Jepang' },
  jp_to_id: { icon: '🇯🇵 → 🇮🇩', text: 'Terjemahkan ke Bahasa Indonesia' },
};

// ── Start ────────────────────────────────────────────────────────
function startTranslationQuiz() {
  const pool = window.getTranslationBank({ level: quizLevel, week: quizWeek });

  // Hide all panels
  ['quizActive','fillInActive','rearrangeActive',
   'conjugationActive','translationActive',
   'errorFindActive','multiChoiceActive','quizResult'
  ].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  document.getElementById('quizSetup').style.display = 'none';

  const activeEl = document.getElementById('translationActive');
  if (!activeEl) { console.error('translationActive not found'); return; }
  activeEl.style.display = 'block';

  if (!pool.length) {
    document.getElementById('transCard').innerHTML = `
      <div class="fill-coming-soon">
        <div class="cs-icon">🔄</div>
        <h3>Soal belum tersedia</h3>
        <p>Bank soal Translation untuk level/minggu ini sedang disiapkan.<br>
        Sementara coba <strong>N3 atau N4</strong> yang sudah tersedia!</p>
      </div>`;
    document.getElementById('transProgressTxt').textContent = '0 / 0';
    document.getElementById('transProgressFill').style.width = '0%';
    document.getElementById('transScoreTxt').innerHTML = '—';
    return;
  }

  transDeck = [...pool].sort(() => Math.random() - 0.5);
  transIdx = 0; transCorrect = 0; transWrong = 0; transResults = [];
  showTranslationQuestion();
}

// ── Tampilkan soal ────────────────────────────────────────────────
function showTranslationQuestion() {
  if (transIdx >= transDeck.length) { showTranslationResult(); return; }
  transAnswered = false;

  const q   = transDeck[transIdx];
  const pct = transDeck.length ? (transIdx / transDeck.length * 100) : 0;

  document.getElementById('transProgressFill').style.width = pct + '%';
  document.getElementById('transProgressTxt').textContent  = `${transIdx} / ${transDeck.length}`;
  document.getElementById('transScoreTxt').innerHTML       = `✅ ${transCorrect} &nbsp; ❌ ${transWrong}`;
  document.getElementById('transFeedback').style.display   = 'none';

  // Level badge
  const badge = document.getElementById('transLevelBadge');
  badge.textContent = q.level.toUpperCase();
  badge.style.cssText = `background:var(--${q.level}-dim);color:var(--${q.level});border:1px solid var(--${q.level}-border);`;

  // Arah terjemahan
  const dir   = TRANS_DIR_LABEL[q.direction] || { icon: '🔄', text: 'Terjemahkan' };
  const dirEl = document.getElementById('transDirBadge');
  dirEl.textContent = dir.icon;
  dirEl.title       = dir.text;

  document.getElementById('transDirectionLabel').textContent = dir.text;
  document.getElementById('transPrompt').textContent         = q.prompt;

  // Grammar hint
  const linked = (window.grammarData || []).find(d => d.id === q.grammarId);
  document.getElementById('transGrammarHint').textContent =
    linked ? `関連: ${linked.grammar} — ${linked.meaning}` : '';

  // Choices (shuffle)
  const shuffled = q.choices
    .map((c, i) => ({ c, i }))
    .sort(() => Math.random() - 0.5);

  document.getElementById('transChoices').innerHTML = shuffled.map(({ c, i }) =>
    `<button class="fill-choice trans-choice" onclick="transAnswer(${i}, this)" data-idx="${i}">${c}</button>`
  ).join('');

  // Reanimate card
  const card = document.getElementById('transCard');
  card.style.animation = 'none';
  requestAnimationFrame(() => { card.style.animation = ''; });
}

// ── Jawab soal ────────────────────────────────────────────────────
window.transAnswer = function(choiceIdx, btn) {
  if (transAnswered) return;
  transAnswered = true;

  const q       = transDeck[transIdx];
  const correct = choiceIdx === q.answer;

  if (correct) transCorrect++; else transWrong++;
  transResults[transIdx] = correct;

  // Highlight tombol
  document.querySelectorAll('.trans-choice').forEach(b => {
    const idx = parseInt(b.dataset.idx);
    b.classList.add('disabled');
    if (idx === q.answer)          b.classList.add('reveal-correct');
    if (b === btn && !correct)     b.classList.add('selected-wrong');
    if (b === btn && correct)      b.classList.add('selected-correct');
  });

  // Feedback
  const verdict = document.getElementById('transVerdict');
  const expl    = document.getElementById('transExplanation');
  const answer  = document.getElementById('transCorrectAnswer');

  answer.style.display = 'none'; // Handled oleh renderQuizFeedback

  const transFeedback = document.getElementById('transFeedback');
  window.renderQuizFeedback({
    correct,
    answerLabel  : correct ? null : q.choices[q.answer],
    sentence     : q.choices[q.answer],
    sentenceId   : `trans-${transIdx}`,
    explanation  : q.explanation,
    verdictEl    : document.getElementById('transVerdict'),
    explEl       : document.getElementById('transExplanation'),
    feedbackEl   : transFeedback,
    insertBefore : transFeedback.querySelector('.fill-next-btn')
  });

  // Score update
  document.getElementById('transScoreTxt').innerHTML = `✅ ${transCorrect} &nbsp; ❌ ${transWrong}`;
};

// ── Soal berikutnya ──────────────────────────────────────────────
window.transNext = function() {
  transIdx++;
  showTranslationQuestion();
};

// ── Hasil ────────────────────────────────────────────────────────
function showTranslationResult() {
  document.getElementById('translationActive').style.display = 'none';

  // Feed SRS
  if (window.saveProgress) {
    transDeck.forEach((q, idx) => {
      if (idx >= transIdx) return;
      if (q.grammarId) window.saveProgress(q.grammarId, transResults[idx] ? 'know' : 'forgot');
    });
  }

  // Inject ke result screen shared
  qKnow   = transCorrect;
  qUnsure = 0;
  qForgot = transWrong;
  quizDeck = transDeck;
  quizIdx  = transDeck.length;
  missedDeck = [];
  showResult();

  // Override subtitle
  const subEl = document.getElementById('resultSubtitle');
  if (subEl) subEl.textContent =
    `${transCorrect} dari ${transDeck.length} terjemahan benar.`;
}

window.endTranslationQuiz = function() {
  document.getElementById('translationActive').style.display = 'none';
  showTranslationResult();
};

// ── Patch restartQuiz ────────────────────────────────────────────
const _transOrigRestart = window.restartQuiz;
window.restartQuiz = function() {
  const transEl = document.getElementById('translationActive');
  if (transEl) transEl.style.display = 'none';
  _transOrigRestart();
};
