/**
 * quiz-typetr.js — Translation Typing Quiz
 * Mode: JP → ID  atau  ID → JP  (vice versa, random per soal)
 * Depends: lang-core.js (window.langGetQuestion)
 * Fuzzy: Levenshtein distance, toleransi TOLERANCE
 */

'use strict';

// ─── Config ───────────────────────────────────
const TYPETR_TOTAL    = 10;
const TOLERANCE       = 0.20;  // 20% karakter beda = masih diterima
const KEYWORD_PASS    = 0.6;   // minimal 60% keyword harus ada
// ─────────────────────────────────────────────

let ttrDeck     = [];
let ttrIdx      = 0;
let ttrCorrect  = 0;
let ttrWrong    = 0;
let ttrResults  = [];
let ttrLevel    = 'all';
let ttrWeek     = 'all';

// ─── Levenshtein ──────────────────────────────
function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => i === 0 ? j : j === 0 ? i : 0)
  );
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i-1] === b[j-1]
        ? dp[i-1][j-1]
        : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
  return dp[m][n];
}

function normalize(str) {
  return str.toLowerCase().replace(/[.,!?;:「」。、]/g, '').replace(/\s+/g, ' ').trim();
}

/**
 * checkAnswer(userInput, question)
 * Returns { correct, score, missing }
 */
function checkAnswer(userInput, question) {
  const expected = normalize(question.direction === 'jp_to_id' ? question.id : question.jp);
  const input    = normalize(userInput);

  // 1. Exact
  if (input === expected) return { correct: true, score: 1, missing: [] };

  // 2. Fuzzy
  const dist      = levenshtein(input, expected);
  const maxLen    = Math.max(input.length, expected.length);
  const ratio     = 1 - dist / maxLen;
  const fuzzyPass = ratio >= (1 - TOLERANCE);

  // 3. Keyword (hanya untuk JP→ID)
  let keyPass   = true;
  let missing   = [];
  if (question.direction === 'jp_to_id' && question.keywords?.length) {
    const hits   = question.keywords.filter(kw => input.includes(kw));
    keyPass      = hits.length / question.keywords.length >= KEYWORD_PASS;
    missing      = question.keywords.filter(kw => !input.includes(kw));
  }

  const correct = fuzzyPass && keyPass;
  return { correct, score: ratio, missing };
}

// ─── Init ─────────────────────────────────────
window.startTypeTrQuiz = function() {
  ttrIdx = ttrCorrect = ttrWrong = 0;
  ttrResults = [];

  const opts = {
    level      : ttrLevel !== 'all' ? ttrLevel : undefined,
    preferPool : true
  };

  // Build deck: ambil TYPETR_TOTAL soal unik
  const seen = new Set();
  ttrDeck    = [];
  let tries  = 0;
  while (ttrDeck.length < TYPETR_TOTAL && tries < 100) {
    tries++;
    const q = window.langGetQuestion(opts);
    if (!q || seen.has(q.jp)) continue;
    seen.add(q.jp);
    // Random direction per soal
    q.direction = Math.random() < 0.5 ? 'jp_to_id' : 'id_to_jp';
    ttrDeck.push(q);
  }

  document.getElementById('quizSetup').style.display       = 'none';
  document.getElementById('quizActive').style.display      = 'none';
  document.getElementById('quizResult').style.display      = 'none';
  document.getElementById('typeTrActive').style.display    = 'block';

  showTtrQuestion();
};

// ─── Render soal ──────────────────────────────
function showTtrQuestion() {
  if (ttrIdx >= ttrDeck.length) { showTtrResult(); return; }

  const q   = ttrDeck[ttrIdx];
  const pct = ttrDeck.length ? (ttrIdx / ttrDeck.length * 100) : 0;

  document.getElementById('ttrProgressBar').style.width = `${pct}%`;
  document.getElementById('ttrProgressTxt').textContent = `${ttrIdx} / ${ttrDeck.length}`;
  document.getElementById('ttrScoreTxt').innerHTML      = `✅ ${ttrCorrect} &nbsp; ❌ ${ttrWrong}`;
  document.getElementById('ttrFeedback').style.display  = 'none';

  // Prompt
  const isJpToId  = q.direction === 'jp_to_id';
  const promptStr = isJpToId ? q.jp : q.id;
  const labelStr  = isJpToId ? 'Terjemahkan ke Bahasa Indonesia:' : 'Terjemahkan ke Bahasa Jepang:';
  const placeholderStr = isJpToId ? 'Ketik terjemahan Indonesia...' : 'Ketik dalam huruf Jepang...';

  document.getElementById('ttrLabel').textContent       = labelStr;
  document.getElementById('ttrPrompt').textContent      = promptStr;
  document.getElementById('ttrInput').value             = '';
  document.getElementById('ttrInput').placeholder       = placeholderStr;
  document.getElementById('ttrInput').disabled          = false;

  // Grammar hint jika ada
  const hint = document.getElementById('ttrGrammarHint');
  if (q.grammarHint || q.grammarId) {
    hint.textContent   = q.grammarHint ? `🔖 ${q.grammarHint}` : `🔖 ${q.grammarId}`;
    hint.style.display = 'block';
  } else {
    hint.style.display = 'none';
  }

  document.getElementById('ttrInput').focus();
}

// ─── Submit ───────────────────────────────────
window.ttrSubmit = function() {
  const input = document.getElementById('ttrInput').value.trim();
  if (!input) return;

  const q      = ttrDeck[ttrIdx];
  const result = checkAnswer(input, q);

  ttrResults[ttrIdx] = result.correct;
  if (result.correct) ttrCorrect++; else ttrWrong++;

  document.getElementById('ttrInput').disabled = true;

  // Feedback
  const isJpToId  = q.direction === 'jp_to_id';
  const correct   = result.correct;
  const answerStr = isJpToId ? q.id : q.jp;

  window.renderQuizFeedback({
    correct,
    answerLabel  : correct ? null : answerStr,
    sentence     : answerStr,
    sentenceId   : `ttr-${ttrIdx}`,
    explanation  : result.missing?.length
      ? `Kata kunci yang terlewat: <b>${result.missing.join(', ')}</b>`
      : (q.grammarHint ? `Pola: ${q.grammarHint}` : null),
    verdictEl    : document.getElementById('ttrVerdict'),
    explEl       : document.getElementById('ttrExplanation'),
    feedbackEl   : document.getElementById('ttrFeedback'),
    insertBefore : document.getElementById('ttrNextBtn')
  });

  document.getElementById('ttrScoreTxt').innerHTML = `✅ ${ttrCorrect} &nbsp; ❌ ${ttrWrong}`;
};

window.ttrNext = function() {
  ttrIdx++;
  showTtrQuestion();
};

// Enter key submit
document.addEventListener('keydown', e => {
  const active = document.getElementById('typeTrActive');
  if (!active || active.style.display === 'none') return;
  const fb = document.getElementById('ttrFeedback');
  if (e.key === 'Enter') {
    if (fb.style.display === 'none' || !fb.style.display) {
      window.ttrSubmit();
    } else {
      window.ttrNext();
    }
  }
});

// ─── Result ───────────────────────────────────
function showTtrResult() {
  document.getElementById('typeTrActive').style.display = 'none';

  const total   = ttrResults.length;
  const correct = ttrResults.filter(Boolean).length;
  const pct     = total ? Math.round(correct / total * 100) : 0;
  const emoji   = pct >= 80 ? '🎉' : pct >= 50 ? '😊' : '💪';

  document.getElementById('ttrResultScore').textContent   = `${correct} / ${total}`;
  document.getElementById('ttrResultPct').textContent     = `${pct}%`;
  document.getElementById('ttrResultEmoji').textContent   = emoji;
  document.getElementById('typeTrResult').style.display  = 'block';
  if (window.recordQuizStat) window.recordQuizStat('typetr', correct, total);
}

window.ttrRestart = function() {
  document.getElementById('typeTrResult').style.display = 'none';
  window.startTypeTrQuiz();
};

window.ttrBackToSetup = function() {
  document.getElementById('typeTrActive').style.display = 'none';
  document.getElementById('typeTrResult').style.display = 'none';
  document.getElementById('quizSetup').style.display    = 'block';
};
