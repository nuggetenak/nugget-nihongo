//  FILL-IN QUIZ MODE
// ══════════════════════════════════════
let quizMode = 'flip'; // 'flip' | 'fill'
let fillDeck = [], fillIdx = 0, fillCorrect = 0, fillWrong = 0;
let fillAnswered = false;

window.setQuizMode = function(mode, btn) {
  quizMode = mode;
  document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
};

window.switchQuizCategory = function(cat, tab) {
  // Update tab active
  document.querySelectorAll('.qcat-tab').forEach(t => t.classList.remove('active'));
  if (tab) tab.classList.add('active');

  // Tampilkan group yang sesuai
  document.querySelectorAll('.quiz-mode-group').forEach(g => g.classList.remove('active'));
  const group = document.getElementById('qcat-' + cat);
  if (group) group.classList.add('active');

  // Auto-select mode btn pertama di group yang aktif
  const firstBtn = group && group.querySelector('.mode-btn');
  if (firstBtn) {
    const modeMap = {
      flip: 'flip', fill: 'fill', rearrange: 'rearrange',
      multi_choice: 'multi_choice', conjugation: 'conjugation',
      translation: 'translation', error_find: 'error_find',
      vocab_flash: 'vocab_flash', vocab_mc: 'vocab_mc', vocab_fill: 'vocab_fill',
      mixed_review: 'mixed_review',
    };
    // Cari mode dari id button (strip "mode" prefix, lowercase, strip underscores)
    const rawId  = firstBtn.id.replace(/^mode/i, '').toLowerCase();
    const modeKey = Object.keys(modeMap).find(k =>
      k.replace(/_/g,'') === rawId || modeMap[k].replace(/_/g,'') === rawId
    ) || 'flip';
    window.setQuizMode(modeMap[modeKey] || modeKey, firstBtn);
  }
};

// Override startQuiz to route based on mode
const _origStartQuiz = window.startQuiz;
window.startQuiz = function(deck) {
  if (quizMode === 'typetr')    { window.startTypeTrQuiz(); return; }
  if (quizMode === 'fill')      { startFillQuiz();      return; }
  if (quizMode === 'rearrange') { startRearrangeQuiz(); return; }
  _origStartQuiz(deck);
};

function startFillQuiz() {
  const pool = (window.getFillInBank || window.getBankSoal || (() => []))({
    level: quizLevel,
    week:  quizWeek
  });

  // hide setup, show fill-in active
  document.getElementById('quizSetup').style.display  = 'none';
  document.getElementById('quizActive').style.display = 'none';
  document.getElementById('quizResult').style.display = 'none';
  document.getElementById('fillInActive').style.display = 'block';

  if (!pool.length) {
    // Fallback: try without level/week filter
    const fallbackPool = (window.getFillInBank || window.getBankSoal || (() => []))({ level: null, n: 20 });
    if (fallbackPool.length) {
      fillDeck = fallbackPool.sort(() => Math.random() - 0.5);
      fillIdx = 0; fillCorrect = 0; fillWrong = 0;
      showFillQuestion();
      return;
    }
    document.getElementById('fillCard').innerHTML = `
      <div class="fill-coming-soon">
        <div class="cs-icon">🚧</div>
        <h3>Belum ada soal</h3>
        <p>Mulai belajar kartu grammar dulu, baru soal Fill-In akan tersedia.<br>
        <button class="cs-action-btn" onclick="window.switchTab('browse', document.querySelector('[aria-label=Materi]'))">Ke Browse →</button></p>
      </div>`;
    document.getElementById('fillProgressTxt').textContent = '0 / 0';
    document.getElementById('fillProgressFill').style.width = '0%';
    document.getElementById('fillScoreTxt').innerHTML = '—';
    return;
  }

  fillDeck = pool.sort(() => Math.random() - 0.5);
  fillIdx = 0; fillCorrect = 0; fillWrong = 0;
  showFillQuestion();
}

function showFillQuestion() {
  if (fillIdx >= fillDeck.length) { showFillResult(); return; }
  fillAnswered = false;
  const q = fillDeck[fillIdx];

  // Progress
  const pct = fillDeck.length ? (fillIdx / fillDeck.length * 100) : 0;
  document.getElementById('fillProgressFill').style.width = pct + '%';
  document.getElementById('fillProgressTxt').textContent = `${fillIdx} / ${fillDeck.length}`;
  document.getElementById('fillScoreTxt').innerHTML = `✅ ${fillCorrect} &nbsp; ❌ ${fillWrong}`;

  // Level badge
  const badge = document.getElementById('fillLevelBadge');
  badge.textContent = q.level.toUpperCase();
  badge.style.cssText = `background:var(--${q.level}-dim);color:var(--${q.level});border:1px solid var(--${q.level}-border);`;

  // Sentence with blank
  const sentenceHtml = q.sentence.replace('▢',
    `<span class="fill-blank" id="fillBlankSpan">　　　</span>`
  );
  document.getElementById('fillSentence').innerHTML = sentenceHtml;

  // Grammar hint (linked grammar point)
  const linked = (window.grammarData || []).find(d => d.id === q.grammarId);
  document.getElementById('fillGrammarHint').textContent =
    linked ? `関連: ${linked.grammar} — ${linked.meaning}` : '';

  // Shuffle choices
  const shuffled = [...q.choices].map((c, i) => ({ c, i }))
                                  .sort(() => Math.random() - 0.5);
  document.getElementById('fillChoices').innerHTML = shuffled.map(({ c, i }) =>
    `<button class="fill-choice" onclick="fillAnswer(${i}, this)" data-idx="${i}">${c}</button>`
  ).join('');

  // Hide feedback
  document.getElementById('fillFeedback').style.display = 'none';

  // Reanimate card
  const card = document.getElementById('fillCard');
  card.style.animation = 'none';
  requestAnimationFrame(() => { card.style.animation = ''; });
}

window.fillAnswer = function(choiceIdx, btn) {
  if (fillAnswered) return;
  fillAnswered = true;
  const q = fillDeck[fillIdx];
  const correct = (choiceIdx === q.answer);

  if (correct) { fillCorrect++; } else { fillWrong++; }

  // Update blank
  const blank = document.getElementById('fillBlankSpan');
  if (blank) {
    blank.textContent = q.choices[q.answer];
    blank.className = 'fill-blank ' + (correct ? 'answered-correct' : 'answered-wrong');
  }

  // Style choices
  document.querySelectorAll('.fill-choice').forEach(b => {
    const idx = parseInt(b.dataset.idx);
    b.classList.add('disabled');
    if (idx === q.answer) b.classList.add('reveal-correct');
    if (b === btn && !correct) b.classList.add('selected-wrong');
    if (b === btn && correct)  b.classList.add('selected-correct');
  });

  // Show feedback
  const feedback     = document.getElementById('fillFeedback');
  const fullSentence = q.sentence.replace('▢', `<b>${q.choices[q.answer]}</b>`);
  window.renderQuizFeedback({
    correct,
    answerLabel  : correct ? null : q.choices[q.answer],
    sentence     : fullSentence,
    sentenceId   : `fill-${fillIdx}`,
    explanation  : q.explanation,
    verdictEl    : document.getElementById('fillVerdict'),
    explEl       : document.getElementById('fillExplanation'),
    feedbackEl   : feedback,
    insertBefore : feedback.querySelector('.fill-next-btn')
  });

  // Update score display
  document.getElementById('fillScoreTxt').innerHTML = `✅ ${fillCorrect} &nbsp; ❌ ${fillWrong}`;
};

window.fillNext = function() {
  fillIdx++;
  showFillQuestion();
};

function showFillResult() {
  document.getElementById('fillInActive').style.display = 'none';
  // Reuse existing result screen, inject fill stats
  const played = fillDeck.length;
  const pct    = played > 0 ? Math.round(fillCorrect / played * 100) : 0;
  qKnow   = fillCorrect;
  qUnsure = 0;
  qForgot = fillWrong;
  quizDeck = fillDeck;
  quizIdx  = played;
  missedDeck = [];
  if (window.markStudyActivity) window.markStudyActivity(); // TASK-UI-7
  if (window.recordQuizStat) window.recordQuizStat('fill', fillCorrect, played);
  showResult();
}

window.endFillQuiz = function() {
  document.getElementById('fillInActive').style.display = 'none';
  showFillResult();
};

// restartQuiz patch to also hide fill-in & rearrange
const _origRestartQuiz = window.restartQuiz;
window.restartQuiz = function() {
  document.getElementById('fillInActive').style.display    = 'none';
  document.getElementById('rearrangeActive').style.display = 'none';
  document.getElementById('quizResult').style.display      = 'none';
  document.getElementById('quizSetup').style.display       = 'block';
  if (window.updateQuickReviewCard) window.updateQuickReviewCard();
  if (typeof _origRestartQuiz === 'function') _origRestartQuiz();  // TASK-UI-6
};

// ══════════════════════════════════════
//  REARRANGE QUIZ MODE (★ placement — 問題2 JLPT format)
//  Skeleton: UI + routing siap. Logic aktif begitu bank soal rearrange cukup.
// ══════════════════════════════════════
let reaDeck = [], reaIdx = 0, reaCorrect = 0, reaWrong = 0;
let reaAnswered = false, reaSelected = null;
let reaResults = []; // true/false per soal untuk SRS feed

function startRearrangeQuiz() {
  const pool = (window.getRearrangeBank || (() => []))({
    level: quizLevel,
    week:  quizWeek
  });

  document.getElementById('quizSetup').style.display      = 'none';
  document.getElementById('quizActive').style.display     = 'none';
  document.getElementById('fillInActive').style.display   = 'none';
  document.getElementById('quizResult').style.display     = 'none';
  document.getElementById('rearrangeActive').style.display = 'block';

  if (!pool.length) {
    var _fb = window.quizEngine
      ? window.quizEngine.generate({ quizType: 'rearrange', level: null, n: 20, source: 'grammar', mode: 'mixed' })
      : [];
    if (_fb.length) {
      pool = _fb;
    } else {
      document.getElementById('reaCard').innerHTML = `
        <div class="fill-coming-soon">
          <div class="cs-icon">🔀</div>
          <h3>Belum ada soal Susun Kalimat</h3>
          <p>Mulai belajar kartu grammar dulu agar soal tersedia.<br>
          <button class="cs-action-btn" onclick="window.switchTab('browse',document.querySelector('[aria-label=Materi]'))">Ke Browse →</button></p>
        </div>`;
      document.getElementById('reaProgressTxt').textContent = '0 / 0';
      document.getElementById('reaProgressFill').style.width = '0%';
      document.getElementById('reaScoreTxt').innerHTML = '—';
      return;
    }
  }

  reaDeck = pool.sort(() => Math.random() - 0.5);
  reaIdx = 0; reaCorrect = 0; reaWrong = 0; reaResults = [];
  showRearrangeQuestion();
}

function showRearrangeQuestion() {
  if (reaIdx >= reaDeck.length) { showRearrangeResult(); return; }
  reaAnswered = false;
  reaSelected = null;

  const q = reaDeck[reaIdx];
  const pct = reaDeck.length ? (reaIdx / reaDeck.length * 100) : 0;
  document.getElementById('reaProgressFill').style.width = pct + '%';
  document.getElementById('reaProgressTxt').textContent = `${reaIdx} / ${reaDeck.length}`;
  document.getElementById('reaScoreTxt').innerHTML = `✅ ${reaCorrect} &nbsp; ❌ ${reaWrong}`;
  document.getElementById('reaFeedback').style.display = 'none';

  // Build sentence frame — split on _____ slots
  const frame = q.sentence.split('_____');
  let frameHTML = '';
  frame.forEach((part, i) => {
    frameHTML += `<span class="rea-frame-text">${part}</span>`;
    if (i < frame.length - 1) {
      frameHTML += `<span class="rea-slot">${i === q.star_pos ? '★' : '　　'}</span>`;
    }
  });
  document.getElementById('reaSentence').innerHTML = frameHTML;

  // Hint di luar grid — insert sebelum #reaParts
  const reaCard    = document.getElementById('reaCard');
  const reaPartsEl = document.getElementById('reaParts');
  let hintEl = document.getElementById('reaHint');
  if (!hintEl) {
    hintEl = document.createElement('div');
    hintEl.id = 'reaHint';
    hintEl.className = 'rea-hint';
    reaCard.insertBefore(hintEl, reaPartsEl);
  }
  hintEl.textContent = `Pilih kata yang tepat untuk posisi ★ (slot ke-${q.star_pos + 1})`;

  // Shuffle parts — 4 tombol di grid 2 kolom
  const shuffledIdxs = [...q.parts.keys()].sort(() => Math.random() - 0.5);
  reaPartsEl.innerHTML = shuffledIdxs.map((origIdx, displayPos) => `
    <button class="rea-part-btn" data-orig="${origIdx}"
      onclick="selectReaPart(this, ${origIdx}, '${q.id}')">
      ${displayPos + 1}. ${q.parts[origIdx]}
    </button>`).join('');
}

function selectReaPart(btn, origIdx, qId) {
  if (reaAnswered) return;
  reaAnswered = true;
  reaSelected = origIdx;

  const q = reaDeck.find(q => q.id === qId);
  const correctOrigIdx = q.answer[q.star_pos];
  const isCorrect = origIdx === correctOrigIdx;

  // Highlight
  document.querySelectorAll('.rea-part-btn').forEach(b => {
    const bOrig = parseInt(b.dataset.orig);
    if (bOrig === correctOrigIdx) b.classList.add('correct');
    else if (bOrig === origIdx)   b.classList.add('wrong');
    b.disabled = true;
  });

  const reaFeedback = document.getElementById('reaFeedback');

  reaResults[reaIdx] = isCorrect;
  if (isCorrect) reaCorrect++; else reaWrong++;
  document.getElementById('reaScoreTxt').innerHTML = `✅ ${reaCorrect} &nbsp; ❌ ${reaWrong}`;

  // Kalimat utuh dari parts urutan benar, grammar di-bold
  const fullRea = q.answer.map((partIdx, pos) =>
    pos === q.star_pos ? `<b>${q.parts[partIdx]}</b>` : q.parts[partIdx]
  ).join('');

  // Urutan benar (tetap tampil di reaCorrectOrder)
  document.getElementById('reaCorrectOrder').innerHTML =
    `<span class="rea-order-label">Urutan benar:</span><br>` +
    q.answer.map(i => q.parts[i]).join(' → ');

  window.renderQuizFeedback({
    correct      : isCorrect,
    answerLabel  : isCorrect ? null : q.parts[correctOrigIdx],
    sentence     : fullRea,
    sentenceId   : `rea-${reaIdx}`,
    explanation  : q.explanation,
    verdictEl    : document.getElementById('reaVerdict'),
    explEl       : document.getElementById('reaExplanation'),
    feedbackEl   : reaFeedback,
    insertBefore : reaFeedback.querySelector('.rea-next-btn')
  });
}

window.reaNext = function() {
  reaIdx++;
  showRearrangeQuestion();
};

function showRearrangeResult() {
  document.getElementById('rearrangeActive').style.display = 'none';
  const played = reaDeck.length;
  const pct    = played > 0 ? Math.round(reaCorrect / played * 100) : 0;

  // Feed hasil ke SRS grammar card terkait
  if (window.srsUpdate && reaDeck.length) {
    reaDeck.forEach((q, idx) => {
      // Cek apakah soal ini sudah dijawab (idx < reaIdx) — reaIdx = soal berikutnya
      if (idx >= reaIdx) return;
      const ids = q.grammarIds || (q.grammarId ? [q.grammarId] : []);
      // Cari apakah jawaban soal ini benar: tracking lewat reaResults[]
      const wasCorrect = reaResults[idx] === true;
      ids.forEach(gid => {
        window.saveProgress(gid, wasCorrect ? 'know' : 'forgot');
      });
    });
  }

  // Subtitle khusus rearrange berdasarkan skor
  const subtitleMap =
    pct === 100 ? '🎉 Sempurna! Semua urutan kalimat benar!' :
    pct >= 80   ? `✨ ${reaCorrect} dari ${played} benar — hampir sempurna!` :
    pct >= 60   ? `📖 ${reaCorrect} dari ${played} benar — review kalimat yang salah ya!` :
    pct >= 40   ? `💪 ${reaCorrect} dari ${played} benar — coba lagi setelah baca grammar-nya!` :
                  `🔥 ${reaCorrect} dari ${played} benar — yuk pelajari ulang dulu!`;

  // Inject ke result screen sebelum showResult()
  const subEl = document.getElementById('resultSubtitle');
  if (subEl) subEl.dataset.reaOverride = subtitleMap;

  qKnow   = reaCorrect;
  qUnsure = 0;
  qForgot = reaWrong;
  quizDeck = reaDeck;
  quizIdx  = played;
  missedDeck = [];
  if (window.markStudyActivity) window.markStudyActivity(); // TASK-UI-7
  if (window.recordQuizStat) window.recordQuizStat('rearrange', reaCorrect, reaDeck.length);
  showResult();

  // Override subtitle setelah showResult() set-nya
  if (subEl && subEl.dataset.reaOverride) {
    subEl.textContent = subEl.dataset.reaOverride;
    delete subEl.dataset.reaOverride;
  }
}

window.endRearrangeQuiz = function() {
  document.getElementById('rearrangeActive').style.display = 'none';
  showRearrangeResult();
};

