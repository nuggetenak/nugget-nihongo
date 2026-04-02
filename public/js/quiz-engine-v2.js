// ══════════════════════════════════════════════════════
//  quiz-engine-v2.js — Nugget Nihongo
//  Central quiz engine: FSRS-aware card selection,
//  dynamic question generation, replaces static bank-soal.
//  Load AFTER: grammar-index.js, vocab-index.js, fsrs-engine.js, quiz-generator.js
//
//  Exports (window.*):
//    quizEngine          object  Main engine API
//    getBankSoal(opts)    fn     Backward-compat: generates fill-in questions dynamically
//    getFillInBank(opts)  fn     Alias for getBankSoal
//    bankSoalQuiz4        array  Backward-compat: dynamically generated pool
// ══════════════════════════════════════════════════════

(function () {
'use strict';

// ── Helpers ────────────────────────────────────────────
function shuffle(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

function getGrammarPattern(card) {
  // Compat: old data uses 'grammar', new uses 'pattern'
  return card.pattern || card.grammar || '';
}

function getGrammarReading(card) {
  return card.reading || '';
}

function stripHtml(str) {
  return (str || '').replace(/<[^>]+>/g, '');
}

// ── FSRS-Aware Card Selection ──────────────────────────
// Picks cards intelligently: due first, then new cards

function selectCards(opts) {
  opts = opts || {};
  var source = opts.source || 'both';     // 'grammar'|'vocab'|'both'
  var level = opts.level || null;          // 'n5'|'n4'|...|null for all
  var cat = opts.cat || null;
  var n = opts.n || 10;
  var mode = opts.mode || 'mixed';        // 'due'|'new'|'mixed'|'weakness'

  var pool = [];

  // Collect from databases
  if (source === 'grammar' || source === 'both') {
    var gData = window.grammarDB || window.grammarData || [];
    for (var i = 0; i < gData.length; i++) {
      var g = gData[i];
      if (g.cat === 'dummy') continue;
      if (level && g.level !== level) continue;
      if (cat && g.cat !== cat) continue;
      pool.push({ card: g, type: 'grammar' });
    }
  }
  if (source === 'vocab' || source === 'both') {
    var vData = window.vocabDB || [];
    for (var i = 0; i < vData.length; i++) {
      var v = vData[i];
      if (level && v.jlpt !== level) continue;
      pool.push({ card: v, type: 'vocab' });
    }
  }

  if (pool.length === 0) return [];

  // Categorize by SRS status
  var due = [];
  var newCards = [];
  var all = [];
  var now = new Date();

  for (var i = 0; i < pool.length; i++) {
    var item = pool[i];
    var srsEntry = window.srsData ? window.srsData[item.card.id] : null;

    if (!srsEntry || !srsEntry.card || srsEntry.card.state === 0) {
      newCards.push(item);
    } else if (new Date(srsEntry.card.due) <= now) {
      due.push(item);
    }
    all.push(item);
  }

  var selected = [];

  if (mode === 'due') {
    selected = shuffle(due).slice(0, n);
  } else if (mode === 'new') {
    selected = shuffle(newCards).slice(0, n);
  } else if (mode === 'weakness') {
    // Sort by retrievability (lowest first)
    var withR = all.filter(function(item) {
      var entry = window.srsData ? window.srsData[item.card.id] : null;
      return entry && entry.card && entry.card.reps > 0;
    }).map(function(item) {
      var R = window.srsRetrievability ? window.srsRetrievability(item.card.id) : 1;
      return { item: item, R: R };
    }).sort(function(a, b) { return a.R - b.R; });
    selected = withR.slice(0, n).map(function(x) { return x.item; });
  } else {
    // Mixed: due cards first (up to 70%), then new cards
    var dueSlice = shuffle(due).slice(0, Math.ceil(n * 0.7));
    var remaining = n - dueSlice.length;
    var newSlice = shuffle(newCards).slice(0, remaining);
    // If still not enough, pad with random
    if (dueSlice.length + newSlice.length < n) {
      var extra = shuffle(all).slice(0, n - dueSlice.length - newSlice.length);
      selected = shuffle(dueSlice.concat(newSlice).concat(extra));
    } else {
      selected = shuffle(dueSlice.concat(newSlice));
    }
  }

  return selected;
}

// ── Question Generators ────────────────────────────────

// Q-05: Grammar Fill-in (replaces bank-soal fill_in)
function generateFillIn(grammarCard, allGrammar) {
  var examples = grammarCard.examples || [];
  if (examples.length === 0) return null;

  var ex = examples[Math.floor(Math.random() * examples.length)];
  var jp = ex.jp || '';

  // Find bold-tagged portion as the answer
  var boldMatch = jp.match(/<b>(.*?)<\/b>/);
  var answer = boldMatch ? stripHtml(boldMatch[1]) : '';
  var sentence = boldMatch
    ? jp.replace(/<b>.*?<\/b>/, '（▢）')
    : jp + '（▢）';
  sentence = stripHtml(sentence);

  if (!answer) return null;

  // Generate distractors from same-level grammar patterns
  var sameLevel = allGrammar.filter(function(g) {
    return g.level === grammarCard.level && g.id !== grammarCard.id;
  });

  // Try to get answer-like distractors from other examples
  var distractorAnswers = [];
  var shuffledGrammar = shuffle(sameLevel);
  for (var i = 0; i < shuffledGrammar.length && distractorAnswers.length < 3; i++) {
    var gEx = (shuffledGrammar[i].examples || [])[0];
    if (gEx && gEx.jp) {
      var bm = gEx.jp.match(/<b>(.*?)<\/b>/);
      if (bm && bm[1] !== answer) {
        distractorAnswers.push(stripHtml(bm[1]));
      }
    }
  }

  // If not enough distractors, use pattern names
  while (distractorAnswers.length < 3 && shuffledGrammar.length > distractorAnswers.length) {
    var pat = getGrammarPattern(shuffledGrammar[distractorAnswers.length]);
    if (pat && pat !== getGrammarPattern(grammarCard)) {
      distractorAnswers.push(pat.replace(/[〜～]/g, ''));
    }
  }

  var choices = shuffle([answer].concat(distractorAnswers.slice(0, 3)));
  var answerIdx = choices.indexOf(answer);

  return {
    id: grammarCard.id,
    level: grammarCard.level,
    type: 'fill_in',
    sentence: sentence,
    translation: ex.id || '',
    choices: choices,
    answer: answerIdx,
    grammarId: grammarCard.id,
    explanation: grammarCard.meaning + ' — ' + (grammarCard.desc || '').substring(0, 100),
    source: 'grammar',
    entry: grammarCard,
  };
}

// Q-08: Sentence Rearrangement
function generateRearrange(grammarCard) {
  var examples = grammarCard.examples || [];
  if (examples.length === 0) return null;

  var ex = examples[Math.floor(Math.random() * examples.length)];
  var jp = stripHtml(ex.jp || '');
  if (jp.length < 8) return null;

  // Split sentence into ~4 parts
  var chars = jp.split('');
  var partLen = Math.max(2, Math.floor(chars.length / 4));
  var parts = [];
  for (var i = 0; i < chars.length; i += partLen) {
    parts.push(chars.slice(i, i + partLen).join(''));
  }
  // Ensure exactly 4 parts
  while (parts.length > 4) {
    parts[parts.length - 2] += parts[parts.length - 1];
    parts.pop();
  }
  while (parts.length < 4 && parts[0].length > 3) {
    var first = parts[0];
    var mid = Math.floor(first.length / 2);
    parts.splice(0, 1, first.substring(0, mid), first.substring(mid));
  }

  var correctOrder = parts.slice();
  var shuffled = shuffle(parts.slice());
  // Ensure shuffled differs from correct
  var attempts = 0;
  while (shuffled.join('') === correctOrder.join('') && attempts < 10) {
    shuffled = shuffle(parts.slice());
    attempts++;
  }

  return {
    id: grammarCard.id,
    level: grammarCard.level,
    type: 'rearrange',
    parts: shuffled,
    answer: correctOrder,
    sentence: jp,
    translation: ex.id || '',
    grammarId: grammarCard.id,
    explanation: getGrammarPattern(grammarCard) + ': ' + grammarCard.meaning,
    source: 'grammar',
    entry: grammarCard,
  };
}

// Q-09: Confusion Pair Drill
function generateConfusionPair(card, type) {
  var pairs = card.confusion_pairs || [];
  if (pairs.length === 0) return null;

  // Pick a confusion pair
  var pairId = pairs[Math.floor(Math.random() * pairs.length)];
  var pairCard = null;

  if (type === 'grammar') {
    pairCard = window.getGrammar ? window.getGrammar(pairId) : null;
  } else {
    pairCard = window.getVocab ? window.getVocab(pairId) : null;
  }
  if (!pairCard) return null;

  // Pick an example from one of them and ask which pattern fits
  var target, other;
  if (Math.random() < 0.5) {
    target = card; other = pairCard;
  } else {
    target = pairCard; other = card;
  }

  var examples = target.examples || [];
  if (examples.length === 0) return null;
  var ex = examples[Math.floor(Math.random() * examples.length)];

  var targetLabel = type === 'grammar'
    ? getGrammarPattern(target) + ' (' + target.meaning + ')'
    : target.word + ' (' + target.meaning_id + ')';
  var otherLabel = type === 'grammar'
    ? getGrammarPattern(other) + ' (' + other.meaning + ')'
    : other.word + ' (' + other.meaning_id + ')';

  var choices = shuffle([
    { label: targetLabel, correct: true },
    { label: otherLabel, correct: false },
  ]);

  return {
    id: target.id,
    type: 'confusion_pair',
    context: stripHtml(ex.jp || ''),
    translation: ex.id || '',
    question: 'Pola/kata mana yang tepat untuk kalimat ini?',
    choices: choices.map(function(c) { return c.label; }),
    answer: choices.findIndex(function(c) { return c.correct; }),
    target_id: target.id,
    pair_id: other.id,
    explanation: type === 'grammar'
      ? (target.nuance || target.desc || '')
      : (target.nuance || ''),
    source: type,
    entry: target,
  };
}

// Q-07: Cloze Deletion (from examples)
function generateCloze(card, type) {
  var examples = card.examples || [];
  if (examples.length === 0) return null;

  var ex = examples[Math.floor(Math.random() * examples.length)];
  var jp = stripHtml(ex.jp || '');
  if (jp.length < 5) return null;

  // For vocab: hide the word itself
  // For grammar: hide the bold-tagged portion
  var answer, blanked;

  if (type === 'vocab') {
    var word = card.word || card.reading || '';
    if (jp.includes(word)) {
      blanked = jp.replace(word, '＿＿＿');
      answer = word;
    } else if (card.reading && jp.includes(card.reading)) {
      blanked = jp.replace(card.reading, '＿＿＿');
      answer = card.reading;
    } else {
      return null;
    }
  } else {
    var boldMatch = (ex.jp || '').match(/<b>(.*?)<\/b>/);
    if (boldMatch) {
      answer = stripHtml(boldMatch[1]);
      blanked = jp.replace(answer, '＿＿＿');
    } else {
      return null;
    }
  }

  return {
    id: card.id,
    type: 'cloze',
    sentence: blanked,
    translation: ex.id || '',
    answer: answer,
    hint: type === 'grammar' ? getGrammarPattern(card) : card.meaning_id,
    source: type,
    entry: card,
  };
}

// Q-13: Context Grammar (situational)
function generateContextGrammar(grammarCard, allGrammar) {
  if (!grammarCard.nuance && !grammarCard.desc) return null;

  var context = grammarCard.nuance || grammarCard.desc || '';
  context = stripHtml(context).substring(0, 150);

  var pattern = getGrammarPattern(grammarCard);

  // Distractors: same-cat grammar points
  var sameCat = allGrammar.filter(function(g) {
    return g.cat === grammarCard.cat && g.id !== grammarCard.id;
  });
  if (sameCat.length < 2) {
    sameCat = allGrammar.filter(function(g) {
      return g.level === grammarCard.level && g.id !== grammarCard.id;
    });
  }
  var distractors = shuffle(sameCat).slice(0, 3).map(function(g) {
    return getGrammarPattern(g);
  });

  var choices = shuffle([pattern].concat(distractors));

  return {
    id: grammarCard.id,
    type: 'context_grammar',
    context: context,
    question: 'Pola grammar mana yang paling tepat?',
    choices: choices,
    answer: choices.indexOf(pattern),
    explanation: pattern + ': ' + grammarCard.meaning,
    source: 'grammar',
    entry: grammarCard,
  };
}

// ── Main Engine API ────────────────────────────────────
window.quizEngine = {

  // Generate a quiz session
  generate: function (opts) {
    opts = opts || {};
    var quizType = opts.quizType || 'mixed';
    var n = opts.n || 10;
    var level = opts.level || null;
    var source = opts.source || 'both';
    var mode = opts.mode || 'mixed';

    var cards = selectCards({
      source: source,
      level: level,
      n: n * 2, // select more, filter later
      mode: mode,
    });

    var allGrammar = window.grammarDB || window.grammarData || [];
    var questions = [];

    for (var i = 0; i < cards.length && questions.length < n; i++) {
      var item = cards[i];
      var q = null;

      if (quizType === 'fill_in' && item.type === 'grammar') {
        q = generateFillIn(item.card, allGrammar);
      } else if (quizType === 'rearrange' && item.type === 'grammar') {
        q = generateRearrange(item.card);
      } else if (quizType === 'confusion_pair') {
        q = generateConfusionPair(item.card, item.type);
      } else if (quizType === 'cloze') {
        q = generateCloze(item.card, item.type);
      } else if (quizType === 'context_grammar' && item.type === 'grammar') {
        q = generateContextGrammar(item.card, allGrammar);
      } else if (quizType === 'mixed') {
        // Randomly pick a quiz type appropriate for this card
        var types = item.type === 'grammar'
          ? ['fill_in', 'cloze', 'context_grammar', 'rearrange']
          : ['cloze'];
        var picked = types[Math.floor(Math.random() * types.length)];

        if (picked === 'fill_in') q = generateFillIn(item.card, allGrammar);
        else if (picked === 'cloze') q = generateCloze(item.card, item.type);
        else if (picked === 'context_grammar') q = generateContextGrammar(item.card, allGrammar);
        else if (picked === 'rearrange') q = generateRearrange(item.card);
      }

      if (q) questions.push(q);
    }

    return questions;
  },

  // Generate questions for a specific quiz mode
  forMode: function (mode, opts) {
    opts = opts || {};
    switch (mode) {
      case 'daily_review':
        return this.generate({ mode: 'due', n: opts.n || 20, quizType: 'mixed' });
      case 'weakness':
        return this.generate({ mode: 'weakness', n: opts.n || 10, quizType: 'mixed' });
      case 'quick10':
        return this.generate({ mode: 'mixed', n: 10, quizType: 'mixed' });
      case 'level_drill':
        return this.generate({ level: opts.level, n: opts.n || 15, quizType: opts.quizType || 'mixed', source: opts.source || 'both' });
      default:
        return this.generate(opts);
    }
  },

  // Stats
  stats: function () {
    var gPool = (window.grammarDB || []).filter(function(g) { return g.cat !== 'dummy'; });
    var vPool = window.vocabDB || [];
    var withExamples = gPool.filter(function(g) { return g.examples && g.examples.length > 0; });
    var withConfusion = gPool.filter(function(g) { return g.confusion_pairs && g.confusion_pairs.length > 0; });
    return {
      grammar_total: gPool.length,
      grammar_with_examples: withExamples.length,
      grammar_with_confusion: withConfusion.length,
      vocab_total: vPool.length,
      quiz_types_available: ['fill_in', 'rearrange', 'confusion_pair', 'cloze', 'context_grammar', 'mixed'],
    };
  },
};

// ── Backward Compatibility Layer ───────────────────────
// These functions replace the dead bank-soal files

// getBankSoal: returns fill-in questions dynamically
window.getBankSoal = function (opts) {
  opts = opts || {};
  var level = opts.level || null;
  var n = opts.n || opts.count || 20;
  return window.quizEngine.generate({
    quizType: 'fill_in',
    level: level,
    n: n,
    source: 'grammar',
    mode: 'mixed',
  });
};

// Alias
window.getFillInBank = window.getBankSoal;

// bankSoalQuiz4: used by translation.js, errorfind.js, multichoice.js
// Generate a pool on load and expose as array
var _quiz4Pool = [];
function _buildQuiz4Pool() {
  var allGrammar = window.grammarDB || window.grammarData || [];
  var pool = [];

  // Generate fill-in questions
  var fillIns = window.quizEngine.generate({
    quizType: 'fill_in', n: 60, source: 'grammar', mode: 'mixed'
  });
  pool = pool.concat(fillIns);

  // Generate context grammar
  var contexts = window.quizEngine.generate({
    quizType: 'context_grammar', n: 40, source: 'grammar', mode: 'mixed'
  });
  // Adapt to multi_choice format
  for (var i = 0; i < contexts.length; i++) {
    var c = contexts[i];
    pool.push({
      id: c.id,
      level: c.entry ? c.entry.level : 'n3',
      type: 'multi_choice',
      context: c.context,
      choices: c.choices,
      answer: c.answer,
      grammarIds: [c.id],
      explanation: c.explanation,
    });
  }

  // Generate rearrange
  var rearranges = window.quizEngine.generate({
    quizType: 'rearrange', n: 40, source: 'grammar', mode: 'mixed'
  });
  pool = pool.concat(rearranges);

  return shuffle(pool);
}

// Lazy build on first access
Object.defineProperty(window, 'bankSoalQuiz4', {
  get: function () {
    if (_quiz4Pool.length === 0) {
      _quiz4Pool = _buildQuiz4Pool();
    }
    return _quiz4Pool;
  },
  configurable: true,
});

// Also provide window.bankSoal for fillin.js compat
Object.defineProperty(window, 'bankSoal', {
  get: function () {
    return window.getBankSoal({ n: 40 });
  },
  configurable: true,
});

console.log('[quiz-engine-v2] Loaded |', window.quizEngine.stats().grammar_total, 'grammar,',
  window.quizEngine.stats().vocab_total, 'vocab available');

})();
