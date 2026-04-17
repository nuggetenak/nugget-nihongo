// ══════════════════════════════════════════════════════════════════
//  ai-validator.js — Structural validator (Stage 3 of G+C+V pipeline)
//  FRONTEND-OVERHAUL-PLAN.md §15.2 Stage 3
//
//  Deterministic, no LLM. Runs CLIENT-SIDE (deviates from plan §15.8
//  which listed workers/ai-validator.js) because the vocab DB
//  (public/data/vocab/*.js ~100KB) lives in the browser, not the Worker.
//  Keeping the validator here avoids shipping the full vocab index
//  into every Worker request.
//
//  Exports (window.AIValidator):
//    validateQuizQuestion(q, ctx) → { pass, failures: [...] }
//    validateQuizBatch(questions, ctx) → { passing: [...], rejected: [...] }
//    checkMojibake(s) → bool
//
//  Rules (each failure is a reason string):
//    R1. Schema: required fields present + correct types
//    R2. Target present: target pattern appears literally in prompt OR answer
//    R3. No spoiler: answer text does NOT appear verbatim in prompt
//    R4. Level leak: all non-target vocab in prompt ≤ target level
//    R5. Mojibake: no replacement chars, no invalid UTF
//    R6. Distractor quality: for MCQ, distractors are non-empty,
//        unique, and not substring-duplicates of answer
//    R7. Answer-in-choices: for MCQ, the answer must appear in choices
// ══════════════════════════════════════════════════════════════════

(function (global) {
  'use strict';

  // ── Level ordering ──────────────────────────────────────────────
  // Lower number = easier. A question at level L may contain vocab
  // at level ≤ L. e.g. N4 quiz may use N5 or N4 vocab, NOT N3.
  const LEVEL_RANK = { n5: 1, n4: 2, n3: 3, n2: 4, n1: 5 };

  function levelRank(lvl) {
    if (!lvl) return 99;
    return LEVEL_RANK[String(lvl).toLowerCase()] || 99;
  }

  // ── Mojibake / encoding check ───────────────────────────────────
  // U+FFFD = replacement char, appears when decoding fails.
  // Also reject lone surrogate halves and common mojibake patterns.
  function checkMojibake(s) {
    if (typeof s !== 'string') return true; // treat as mojibake if not string
    if (s.includes('\uFFFD')) return true;
    // Lone high/low surrogate detection
    for (let i = 0; i < s.length; i++) {
      const c = s.charCodeAt(i);
      if (c >= 0xD800 && c <= 0xDBFF) {
        // high surrogate — must be followed by low
        const next = s.charCodeAt(i + 1);
        if (!(next >= 0xDC00 && next <= 0xDFFF)) return true;
        i++;
      } else if (c >= 0xDC00 && c <= 0xDFFF) {
        // lone low surrogate
        return true;
      }
    }
    // Classic UTF-8-mis-decoded-as-Latin-1 signature: chars from Latin Ext
    // like "ãƒ" "ä¸" "é™" in what should be Japanese text. Heuristic only.
    if (/[\u00C0-\u00FF]{3,}/.test(s) && /[\u3040-\u30FF\u4E00-\u9FFF]/.test(s) === false) {
      // If the string contains 3+ consecutive Latin-Ext chars and no Japanese,
      // it's likely garbled. But we only flag this if the string was MEANT to be
      // Japanese — caller should decide. For now skip: too noisy.
    }
    return false;
  }

  // ── Tokenize Japanese text into candidate vocab lookups ─────────
  // We don't have a morphological analyzer in the browser. Heuristic:
  // extract maximal runs of kanji, and kanji+kana combos. For each,
  // try to match against the vocab index at successively longer prefixes.
  // This is imperfect but catches obvious N3+ vocab in N5 prompts.
  function extractCandidateTerms(text) {
    if (!text) return [];
    const terms = new Set();
    // Match runs of JP chars (kanji/hiragana/katakana)
    const jpRe = /[\u3040-\u30FF\u4E00-\u9FFF々ヶヵ]+/g;
    let m;
    while ((m = jpRe.exec(text)) !== null) {
      const run = m[0];
      // Add the full run and each kanji-containing sub-span of length 2-6
      terms.add(run);
      for (let len = 2; len <= Math.min(6, run.length); len++) {
        for (let i = 0; i + len <= run.length; i++) {
          const sub = run.slice(i, i + len);
          // only interested if it contains at least 1 kanji
          if (/[\u4E00-\u9FFF]/.test(sub)) terms.add(sub);
        }
      }
    }
    return Array.from(terms);
  }

  // ── R1: Schema ──────────────────────────────────────────────────
  function checkSchema(q) {
    const fails = [];
    if (!q || typeof q !== 'object') { fails.push('R1: not an object'); return fails; }
    const requiredStrings = ['id', 'type', 'prompt', 'answer', 'level'];
    for (const k of requiredStrings) {
      if (typeof q[k] !== 'string' || !q[k].trim()) fails.push(`R1: missing or empty field '${k}'`);
    }
    const allowedTypes = ['mcq', 'fill', 'rearrange', 'translate'];
    if (q.type && !allowedTypes.includes(q.type)) fails.push(`R1: invalid type '${q.type}'`);
    if (q.type === 'mcq') {
      if (!Array.isArray(q.choices) || q.choices.length < 2) fails.push('R1: mcq requires choices[] with ≥2 items');
      else if (q.choices.some(c => typeof c !== 'string' || !c.trim())) fails.push('R1: mcq choices must be non-empty strings');
    }
    if (q.level && !LEVEL_RANK[String(q.level).toLowerCase()]) fails.push(`R1: invalid level '${q.level}'`);
    return fails;
  }

  // ── R2: Target present ──────────────────────────────────────────
  function checkTargetPresent(q, target) {
    if (!target) return []; // no target = skip
    const hay = `${q.prompt || ''} ${q.answer || ''}`;
    if (!hay.includes(target)) {
      return [`R2: target pattern '${target}' not found in prompt or answer`];
    }
    return [];
  }

  // ── R3: No spoiler ──────────────────────────────────────────────
  function checkNoSpoiler(q) {
    if (!q.prompt || !q.answer) return [];
    const a = q.answer.trim();
    // Short answers (1-2 chars) are often particles or kana which CAN
    // legitimately appear in the prompt as hints. Only flag longer answers.
    if (a.length < 3) return [];
    if (q.prompt.includes(a)) {
      return [`R3: answer '${a}' appears verbatim in prompt`];
    }
    return [];
  }

  // ── R4: Level leak ──────────────────────────────────────────────
  // vocabLevelIndex: Map<jpTerm, levelString> built from vocab-n*.js files
  function checkLevelLeak(q, targetLevel, vocabLevelIndex) {
    if (!vocabLevelIndex || !vocabLevelIndex.size) return []; // no index = skip
    const maxRank = levelRank(targetLevel);
    if (maxRank >= 99) return [];

    const terms = extractCandidateTerms(q.prompt || '');
    const leaks = [];
    const seen = new Set();
    for (const t of terms) {
      if (seen.has(t)) continue;
      seen.add(t);
      const lvl = vocabLevelIndex.get(t);
      if (lvl && levelRank(lvl) > maxRank) {
        leaks.push(`${t}[${lvl}]`);
      }
    }
    if (leaks.length) {
      // Dedupe + cap reported leaks at 3
      const capped = leaks.slice(0, 3).join(', ');
      return [`R4: prompt contains vocab above level ${targetLevel}: ${capped}${leaks.length > 3 ? ` (+${leaks.length - 3} more)` : ''}`];
    }
    return [];
  }

  // ── R5: Mojibake ────────────────────────────────────────────────
  function checkEncoding(q) {
    const fields = ['prompt', 'answer', 'explanation_id'];
    for (const f of fields) {
      if (q[f] && checkMojibake(q[f])) return [`R5: mojibake in field '${f}'`];
    }
    if (Array.isArray(q.choices)) {
      for (let i = 0; i < q.choices.length; i++) {
        if (checkMojibake(q.choices[i])) return [`R5: mojibake in choices[${i}]`];
      }
    }
    return [];
  }

  // ── R6: Distractor quality ──────────────────────────────────────
  function checkDistractors(q) {
    if (q.type !== 'mcq') return [];
    const fails = [];
    const choices = q.choices || [];
    const uniq = new Set(choices.map(c => (c || '').trim()));
    if (uniq.size !== choices.length) fails.push('R6: duplicate choices in mcq');
    // Distractors that are strict substrings of answer are low quality
    const a = (q.answer || '').trim();
    for (const c of choices) {
      const cs = (c || '').trim();
      if (cs && cs !== a && a.includes(cs) && cs.length >= 2) {
        fails.push(`R6: distractor '${cs}' is substring of answer '${a}'`);
        break;
      }
    }
    return fails;
  }

  // ── R7: Answer in choices ───────────────────────────────────────
  function checkAnswerInChoices(q) {
    if (q.type !== 'mcq') return [];
    if (!Array.isArray(q.choices)) return []; // R1 already caught
    const a = (q.answer || '').trim();
    const present = q.choices.some(c => (c || '').trim() === a);
    if (!present) return [`R7: answer '${a}' not in choices[]`];
    return [];
  }

  // ── Top-level question validator ────────────────────────────────
  function validateQuizQuestion(q, ctx) {
    ctx = ctx || {};
    const target = ctx.target || '';
    const level = ctx.level || q?.level || '';
    const vocabIdx = ctx.vocabLevelIndex || null;

    const failures = [];
    // R1 first — if schema fails, other rules may crash
    const schemaFails = checkSchema(q);
    failures.push(...schemaFails);
    if (schemaFails.length === 0) {
      failures.push(...checkTargetPresent(q, target));
      failures.push(...checkNoSpoiler(q));
      failures.push(...checkLevelLeak(q, level, vocabIdx));
      failures.push(...checkEncoding(q));
      failures.push(...checkDistractors(q));
      failures.push(...checkAnswerInChoices(q));
    }
    return { pass: failures.length === 0, failures };
  }

  // ── Batch validator ─────────────────────────────────────────────
  function validateQuizBatch(questions, ctx) {
    const passing = [];
    const rejected = [];
    if (!Array.isArray(questions)) return { passing, rejected };
    for (const q of questions) {
      const result = validateQuizQuestion(q, ctx);
      if (result.pass) passing.push(q);
      else rejected.push({ question: q, failures: result.failures });
    }
    return { passing, rejected };
  }

  // ── Build a vocab level index from vocabN5..vocabN1 globals ─────
  // Caller passes the arrays (or they pull from window.vocabN5 etc.)
  function buildVocabLevelIndex(vocabByLevel) {
    const idx = new Map();
    const fields = ['kanji', 'word', 'reading', 'term']; // accept common shapes
    for (const [level, arr] of Object.entries(vocabByLevel || {})) {
      if (!Array.isArray(arr)) continue;
      for (const entry of arr) {
        if (!entry) continue;
        for (const f of fields) {
          const v = entry[f];
          if (typeof v === 'string' && v) {
            // Only keep the LOWEST level (= hardest constraint) per term.
            // If term already indexed at a lower level, skip.
            const existing = idx.get(v);
            if (!existing || levelRank(level) < levelRank(existing)) {
              idx.set(v, level);
            }
          }
        }
      }
    }
    return idx;
  }

  // ── Public API ──────────────────────────────────────────────────
  const API = {
    validateQuizQuestion,
    validateQuizBatch,
    buildVocabLevelIndex,
    checkMojibake,
    extractCandidateTerms,
    // exposed for tests
    _rules: {
      checkSchema,
      checkTargetPresent,
      checkNoSpoiler,
      checkLevelLeak,
      checkEncoding,
      checkDistractors,
      checkAnswerInChoices,
    },
    _LEVEL_RANK: LEVEL_RANK,
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = API;
  } else {
    global.AIValidator = API;
  }
})(typeof window !== 'undefined' ? window : globalThis);
