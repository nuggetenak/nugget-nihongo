//  multichoice.js — Multiple Choice Grammar Quiz Mode
//  Soal: baca konteks situasi → pilih ekspresi grammar paling tepat
//  Tipe bank soal: { type:'multi_choice', context, choices[], answer, grammarIds[], explanation }
// ══════════════════════════════════════════════════════════════════

let mcDeck = [], mcIdx = 0, mcCorrect = 0, mcWrong = 0;
let mcAnswered = false;
let mcResults = [];

// ── Bank getter ──────────────────────────────────────────────────
window.getMultiChoiceBank = function({ level, week } = {}) {
  const pool = window.bankSoalQuiz4 || [];
  return pool.filter(q =>
    q.type === 'multi_choice' &&
    (level === 'all' || !level || q.level === level) &&
    (week  === null  || week  === undefined || q.week  === week)
  );
};

// ── Route dari startQuiz ─────────────────────────────────────────
const _mcOrigStartQuiz = window.startQuiz;
window.startQuiz = function(deck) {
  if (quizMode === 'multi_choice') { startMultiChoiceQuiz(); return; }
  _mcOrigStartQuiz(deck);
};

// ── Start ────────────────────────────────────────────────────────
function startMultiChoiceQuiz() {
  const pool = window.getMultiChoiceBank({ level: quizLevel, week: quizWeek });

  ['quizActive','fillInActive','rearrangeActive',
   'conjugationActive','translationActive',
   'errorFindActive','multiChoiceActive','quizResult'
  ].forEach(id => { const el = document.getElementById(id); if (el) el.style.display = 'none'; });
  document.getElementById('quizSetup').style.display = 'none';

  const activeEl = document.getElementById('multiChoiceActive');
  if (!activeEl) { console.error('multiChoiceActive not found'); return; }
  activeEl.style.display = 'block';

  if (!pool.length) {
    // Fallback: generate from all grammar without level restriction
    var _fb = window.quizEngine
      ? window.quizEngine.generate({ quizType: 'mixed', level: null, n: 20, source: 'grammar', mode: 'mixed' })
      : [];
    if (_fb.length) {
      pool = _fb;
    } else {
      document.getElementById('mcCard').innerHTML = `
        <div class="fill-coming-soon">
          <div class="cs-icon">🎯</div>
          <h3>Belum ada soal Pilihan Ganda</h3>
          <p>Mulai belajar kartu grammar dulu agar soal tersedia.<br>
          <button class="cs-action-btn" onclick="window.switchTab('browse',document.querySelector('[aria-label=Materi]'))">Ke Browse →</button></p>
        </div>`;
      document.getElementById('mcProgressTxt').textContent = '0 / 0';
      document.getElementById('mcProgressFill').style.width = '0%';
      document.getElementById('mcScoreTxt').innerHTML = '—';
      return;
    }
  }

  mcDeck = [...pool].sort(() => Math.random() - 0.5);
  mcIdx = 0; mcCorrect = 0; mcWrong = 0; mcResults = [];
  showMultiChoiceQuestion();
}

// ── Tampilkan soal ────────────────────────────────────────────────
function showMultiChoiceQuestion() {
  if (mcIdx >= mcDeck.length) { showMultiChoiceResult(); return; }
  mcAnswered = false;

  const q   = mcDeck[mcIdx];
  const pct = mcDeck.length ? (mcIdx / mcDeck.length * 100) : 0;

  document.getElementById('mcProgressFill').style.width = pct + '%';
  document.getElementById('mcProgressTxt').textContent  = `${mcIdx} / ${mcDeck.length}`;
  document.getElementById('mcScoreTxt').innerHTML       = `✅ ${mcCorrect} &nbsp; ❌ ${mcWrong}`;
  document.getElementById('mcFeedback').style.display   = 'none';

  // Level badge
  const badge = document.getElementById('mcLevelBadge');
  badge.textContent = q.level.toUpperCase();
  badge.style.cssText = `background:var(--${q.level}-dim);color:var(--${q.level});border:1px solid var(--${q.level}-border);`;

  // Konteks situasi
  document.getElementById('mcContext').textContent = q.context;

  // Grammar hint — dari grammarIds
  const linked = (q.grammarIds || []).map(gid =>
    (window.grammarData || []).find(d => d.id === gid)
  ).filter(Boolean);
  document.getElementById('mcGrammarHint').textContent = linked.length
    ? `関連: ${linked.map(d => d.grammar).join(' · ')}`
    : '';

  // Choices — 4 tombol, di-shuffle
  const shuffled = q.choices
    .map((c, i) => ({ c, i }))
    .sort(() => Math.random() - 0.5);

  document.getElementById('mcChoices').innerHTML = shuffled.map(({ c, i }) =>
    `<button class="fill-choice mc-choice" onclick="mcAnswer(${i}, this)" data-idx="${i}">${c}</button>`
  ).join('');

  // Reanimate card
  const card = document.getElementById('mcCard');
  card.style.animation = 'none';
  requestAnimationFrame(() => { card.style.animation = ''; });
}

// ── Jawab soal ────────────────────────────────────────────────────
window.mcAnswer = function(choiceIdx, btn) {
  if (mcAnswered) return;
  mcAnswered = true;

  const q       = mcDeck[mcIdx];
  const correct = choiceIdx === q.answer;

  if (correct) mcCorrect++; else mcWrong++;
  mcResults[mcIdx] = correct;

  // Highlight tombol
  document.querySelectorAll('.mc-choice').forEach(b => {
    const idx = parseInt(b.dataset.idx);
    b.classList.add('disabled');
    if (idx === q.answer)        b.classList.add('reveal-correct');
    if (b === btn && !correct)   b.classList.add('selected-wrong');
    if (b === btn && correct)    b.classList.add('selected-correct');
  });

  // Feedback
  const verdict = document.getElementById('mcVerdict');
  const expl    = document.getElementById('mcExplanation');
  const why     = document.getElementById('mcWhyCorrect');

  why.style.display = 'none'; // Handled oleh renderQuizFeedback

  const mcFeedback = document.getElementById('mcFeedback');
  window.renderQuizFeedback({
    correct,
    answerLabel  : correct ? null : q.choices[q.answer],
    sentence     : q.choices[q.answer],
    sentenceId   : `mc-${mcIdx}`,
    explanation  : q.explanation,
    verdictEl    : verdict,
    explEl       : expl,
    feedbackEl   : mcFeedback,
    insertBefore : mcFeedback.querySelector('.fill-next-btn')
  });

  // Score update
  document.getElementById('mcScoreTxt').innerHTML = `✅ ${mcCorrect} &nbsp; ❌ ${mcWrong}`;
};

// ── Soal berikutnya ──────────────────────────────────────────────
window.mcNext = function() {
  mcIdx++;
  showMultiChoiceQuestion();
};

// ── Hasil ────────────────────────────────────────────────────────
function showMultiChoiceResult() {
  document.getElementById('multiChoiceActive').style.display = 'none';

  // Feed SRS
  if (window.saveProgress) {
    mcDeck.forEach((q, idx) => {
      if (idx >= mcIdx) return;
      const ids = q.grammarIds || [];
      ids.forEach(gid => window.saveProgress(gid, mcResults[idx] ? 'know' : 'forgot'));
    });
  }

  qKnow   = mcCorrect;
  qUnsure = 0;
  qForgot = mcWrong;
  quizDeck = mcDeck;
  quizIdx  = mcDeck.length;
  missedDeck = [];
  if (window.recordQuizStat) window.recordQuizStat('multi_choice', mcCorrect, mcDeck.length);
  showResult();

  const subEl = document.getElementById('resultSubtitle');
  if (subEl) subEl.textContent =
    `${mcCorrect} dari ${mcDeck.length} pilihan kontekstual tepat.`;
}

window.endMultiChoiceQuiz = function() {
  document.getElementById('multiChoiceActive').style.display = 'none';
  showMultiChoiceResult();
};

// ── Patch restartQuiz ────────────────────────────────────────────
const _mcOrigRestart = window.restartQuiz;
window.restartQuiz = function() {
  const el = document.getElementById('multiChoiceActive');
  if (el) el.style.display = 'none';
  _mcOrigRestart();
};
