//  errorfind.js — Error Finding Quiz Mode
//  Soal: 4 kalimat, 1 yang salah — pilih yang salah
//  Tipe bank soal: { type:'error_find', choices[], answer, correction, grammarIds[], explanation }
// ══════════════════════════════════════════════════════════════════

let efDeck = [], efIdx = 0, efCorrect = 0, efWrong = 0;
let efAnswered = false;
let efResults = [];

// ── Bank getter ──────────────────────────────────────────────────
window.getErrorFindBank = function({ level, week } = {}) {
  const pool = window.bankSoalQuiz4 || [];
  return pool.filter(q =>
    q.type === 'error_find' &&
    (level === 'all' || !level || q.level === level) &&
    (week  === null  || week  === undefined || q.week  === week)
  );
};

// ── Route dari startQuiz ─────────────────────────────────────────
const _efOrigStartQuiz = window.startQuiz;
window.startQuiz = function(deck) {
  if (quizMode === 'error_find') { startErrorFindQuiz(); return; }
  _efOrigStartQuiz(deck);
};

// ── Start ────────────────────────────────────────────────────────
function startErrorFindQuiz() {
  const pool = window.getErrorFindBank({ level: quizLevel, week: quizWeek });

  ['quizActive','fillInActive','rearrangeActive',
   'conjugationActive','translationActive',
   'errorFindActive','multiChoiceActive','quizResult'
  ].forEach(id => { const el = document.getElementById(id); if (el) el.style.display = 'none'; });
  document.getElementById('quizSetup').style.display = 'none';

  const activeEl = document.getElementById('errorFindActive');
  if (!activeEl) { console.error('errorFindActive not found'); return; }
  activeEl.style.display = 'block';

  if (!pool.length) {
    document.getElementById('efCard').innerHTML = `
      <div class="fill-coming-soon">
        <div class="cs-icon">🔍</div>
        <h3>Soal belum tersedia</h3>
        <p>Bank soal Error Finding untuk level/minggu ini sedang disiapkan.<br>
        Sementara coba <strong>N3 atau N4</strong> yang sudah tersedia!</p>
      </div>`;
    document.getElementById('efProgressTxt').textContent = '0 / 0';
    document.getElementById('efProgressFill').style.width = '0%';
    document.getElementById('efScoreTxt').innerHTML = '—';
    return;
  }

  efDeck = [...pool].sort(() => Math.random() - 0.5);
  efIdx = 0; efCorrect = 0; efWrong = 0; efResults = [];
  showErrorFindQuestion();
}

// ── Tampilkan soal ────────────────────────────────────────────────
function showErrorFindQuestion() {
  if (efIdx >= efDeck.length) { showErrorFindResult(); return; }
  efAnswered = false;

  const q   = efDeck[efIdx];
  const pct = efDeck.length ? (efIdx / efDeck.length * 100) : 0;

  document.getElementById('efProgressFill').style.width = pct + '%';
  document.getElementById('efProgressTxt').textContent  = `${efIdx} / ${efDeck.length}`;
  document.getElementById('efScoreTxt').innerHTML       = `✅ ${efCorrect} &nbsp; ❌ ${efWrong}`;
  document.getElementById('efFeedback').style.display   = 'none';

  // Level badge — pakai level dari grammarId pertama atau dari soal
  const badge = document.getElementById('efLevelBadge');
  badge.textContent = q.level.toUpperCase();
  badge.style.cssText = `background:var(--${q.level}-dim);color:var(--${q.level});border:1px solid var(--${q.level}-border);`;

  // Grammar hint — gabungkan dari semua grammarIds
  const linked = (q.grammarIds || []).map(gid =>
    (window.grammarData || []).find(d => d.id === gid)
  ).filter(Boolean);
  document.getElementById('efGrammarHint').textContent = linked.length
    ? `関連: ${linked.map(d => d.grammar).join(' · ')}`
    : '';

  // Render 4 pilihan — label A B C D
  const labels = ['A', 'B', 'C', 'D'];
  document.getElementById('efChoices').innerHTML = q.choices.map((c, i) =>
    `<button class="ef-choice" onclick="efAnswer(${i}, this)" data-idx="${i}">
      <span class="ef-choice-label">${labels[i]}</span>
      <span class="ef-choice-text">${c}</span>
    </button>`
  ).join('');

  // Reanimate card
  const card = document.getElementById('efCard');
  card.style.animation = 'none';
  requestAnimationFrame(() => { card.style.animation = ''; });
}

// ── Jawab soal ────────────────────────────────────────────────────
window.efAnswer = function(choiceIdx, btn) {
  if (efAnswered) return;
  efAnswered = true;

  const q       = efDeck[efIdx];
  const correct = choiceIdx === q.answer;

  if (correct) efCorrect++; else efWrong++;
  efResults[efIdx] = correct;

  const labels = ['A', 'B', 'C', 'D'];

  // Highlight — tandai yang salah (answer) dan yang dipilih
  document.querySelectorAll('.ef-choice').forEach(b => {
    const idx = parseInt(b.dataset.idx);
    b.classList.add('disabled');
    if (idx === q.answer) b.classList.add('ef-reveal-wrong');   // tandai kalimat yang salah
    if (b === btn && correct)  b.classList.add('ef-selected-correct');
    if (b === btn && !correct) b.classList.add('ef-selected-missed');
  });

  // Feedback
  const verdict    = document.getElementById('efVerdict');
  const correction = document.getElementById('efCorrection');
  const expl       = document.getElementById('efExplanation');

  const efFeedback = document.getElementById('efFeedback');

  // Correction tetap tampil di posisinya
  correction.innerHTML = q.correction
    ? `<span class="ef-correction-label">✏️ Perbaikan:</span> ${q.correction}`
    : '';
  correction.style.display = q.correction ? 'block' : 'none';

  // Inject sentence + explanation via renderQuizFeedback (skipVerdict=true)
  window.renderQuizFeedback({
    correct,
    sentence     : q.correction || q.choices[q.answer],
    sentenceId   : `ef-${efIdx}`,
    explanation  : q.explanation,
    verdictEl    : null,
    explEl       : document.getElementById('efExplanation'),
    feedbackEl   : efFeedback,
    insertBefore : efFeedback.querySelector('.fill-next-btn'),
    skipVerdict  : true  // Verdict diset manual di bawah
  });

  // Set verdict SETELAH renderQuizFeedback agar tidak tertimpa
  verdict.innerHTML = correct
    ? `<span class="qfb-correct">✅ Benar! Kalimat ${labels[q.answer]} yang salah.</span>`
    : `<span class="qfb-wrong">❌ Salah. Kalimat ${labels[q.answer]} yang mengandung kesalahan.</span>`;

  // Score update
  document.getElementById('efScoreTxt').innerHTML = `✅ ${efCorrect} &nbsp; ❌ ${efWrong}`;
};

// ── Soal berikutnya ──────────────────────────────────────────────
window.efNext = function() {
  efIdx++;
  showErrorFindQuestion();
};

// ── Hasil ────────────────────────────────────────────────────────
function showErrorFindResult() {
  document.getElementById('errorFindActive').style.display = 'none';

  // Feed SRS
  if (window.saveProgress) {
    efDeck.forEach((q, idx) => {
      if (idx >= efIdx) return;
      const ids = q.grammarIds || [];
      ids.forEach(gid => window.saveProgress(gid, efResults[idx] ? 'know' : 'forgot'));
    });
  }

  qKnow   = efCorrect;
  qUnsure = 0;
  qForgot = efWrong;
  quizDeck = efDeck;
  quizIdx  = efDeck.length;
  missedDeck = [];
  if (window.recordQuizStat) window.recordQuizStat('errorfind', efCorrect, efDeck.length);
  showResult();

  const subEl = document.getElementById('resultSubtitle');
  if (subEl) subEl.textContent =
    `${efCorrect} dari ${efDeck.length} kalimat salah berhasil ditemukan.`;
}

window.endErrorFindQuiz = function() {
  document.getElementById('errorFindActive').style.display = 'none';
  showErrorFindResult();
};

// ── Patch restartQuiz ────────────────────────────────────────────
const _efOrigRestart = window.restartQuiz;
window.restartQuiz = function() {
  const el = document.getElementById('errorFindActive');
  if (el) el.style.display = 'none';
  _efOrigRestart();
};
