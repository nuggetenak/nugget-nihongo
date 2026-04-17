// ══════════════════════════════════════════════════════════════════
//  ai-content-engine.js — G+C+V pipeline orchestrator (Phase 5.5a)
//  FRONTEND-OVERHAUL-PLAN.md §15.2
//
//  FEATURE FLAG: this module does nothing until localStorage
//  'nn_feature_ai_quiz_gen' is set to '1'. No UI surfaces it yet.
//  Ship-to-users requires all 5 quality gates in §15.7 to pass first.
//
//  Pipeline:
//    1. Generator      — calls /generate-quiz on Worker (§15.2 Stage 1)
//    2. Critic         — calls /critique on Worker, cross-provider (Stage 2)
//    3. Validator      — client-side AIValidator rules (Stage 3)
//    4. Assembly       — intersects Critic APPROVED + Validator pass
//    5. Retry          — if < target count, re-generate with rejection hints
//    6. Serve + Track  — returns questions with full lineage metadata
//
//  Exports (window.AIContentEngine):
//    isEnabled() → bool
//    generateQuiz({ target, target_id, level, count, type, confusion_pairs })
//      → Promise<{ questions: [...withLineage], stats: {...} }>
//    _pipeline (for tests)
//
//  Lineage metadata attached to every served question:
//    {
//      ...originalQuestion,
//      source: 'ai-gen',
//      lineage: {
//        lineage_id: 'aig-{ts}-{n}',
//        generator_provider: 'groq',
//        generator_model: 'llama-3.3-70b-versatile',
//        critic_provider: 'gemini',
//        critic_verdict: 'APPROVED',
//        validator_pass: true,
//        generated_at: ISO,
//        critiqued_at: ISO,
//        prompt_version: 'v1.0',
//        retry_round: 0,
//      }
//    }
// ══════════════════════════════════════════════════════════════════

(function (global) {
  'use strict';

  const FEATURE_FLAG_KEY = 'nn_feature_ai_quiz_gen';
  const WORKER_URL_KEY = 'nn_ai_worker_url';
  const DEFAULT_WORKER_URL = 'https://nugget-nihongo-ai.nugrohopangestu85.workers.dev';
  const PROMPT_VERSION = 'v1.0';
  const MAX_RETRY_ROUNDS = 2; // §15.2 step 4: re-gen once or twice if <target pass

  // ── Feature flag ────────────────────────────────────────────────
  function isEnabled() {
    try {
      return localStorage.getItem(FEATURE_FLAG_KEY) === '1';
    } catch {
      return false;
    }
  }

  function workerBase() {
    try {
      const stored = localStorage.getItem(WORKER_URL_KEY);
      if (stored) {
        // stored value may include '/chat' suffix from ai-tutor.js — strip it
        return stored.replace(/\/chat$/, '').replace(/\/$/, '');
      }
    } catch {}
    return DEFAULT_WORKER_URL;
  }

  // ── Stage 1: Generator ──────────────────────────────────────────
  async function callGenerator(params) {
    const res = await fetch(workerBase() + '/generate-quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (!res.ok) {
      const err = await res.text().catch(() => '');
      throw new Error(`generator ${res.status}: ${err.slice(0, 200)}`);
    }
    return res.json(); // { questions, meta }
  }

  // ── Stage 2: Critic ─────────────────────────────────────────────
  async function callCritic({ questions, target, level, generator_provider }) {
    const res = await fetch(workerBase() + '/critique', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questions, target, level, generator_provider }),
    });
    if (!res.ok) {
      const err = await res.text().catch(() => '');
      throw new Error(`critic ${res.status}: ${err.slice(0, 200)}`);
    }
    return res.json(); // { verdicts, meta }
  }

  // ── Build vocab level index from global vocab arrays ────────────
  // Cached because it's derived from static data that never changes in-session.
  let _vocabIdxCache = null;
  function getVocabLevelIndex() {
    if (_vocabIdxCache) return _vocabIdxCache;
    if (!global.AIValidator || typeof global.AIValidator.buildVocabLevelIndex !== 'function') {
      return null;
    }
    const byLevel = {};
    for (const lvl of ['n5', 'n4', 'n3', 'n2', 'n1']) {
      const key = 'vocab' + lvl.toUpperCase(); // e.g. vocabN5
      if (Array.isArray(global[key])) byLevel[lvl] = global[key];
    }
    _vocabIdxCache = global.AIValidator.buildVocabLevelIndex(byLevel);
    return _vocabIdxCache;
  }

  // ── Stage 3+4: Validator + Assembly ─────────────────────────────
  function validateAndIntersect(questions, verdicts, ctx) {
    if (!global.AIValidator) {
      console.warn('[ai-content-engine] AIValidator not loaded — skipping stage 3');
      return { passing: questions, rejected: [], reasons: {} };
    }
    const verdictById = new Map();
    for (const v of verdicts || []) {
      if (v && v.id) verdictById.set(v.id, v);
    }

    const passing = [];
    const rejected = [];
    const reasons = {};

    for (const q of questions) {
      const v = verdictById.get(q.id);
      const criticOK = v && (v.verdict === 'APPROVED' || v.verdict === 'REVISE');
      const criticHardReject = v && v.verdict === 'REJECTED';
      const validatorResult = global.AIValidator.validateQuizQuestion(q, ctx);

      const reasonList = [];
      if (!v) reasonList.push('no critic verdict received');
      if (criticHardReject) reasonList.push(`critic REJECTED: ${(v.reasons || []).join('; ')}`);
      if (!validatorResult.pass) reasonList.push(`validator fail: ${validatorResult.failures.join('; ')}`);

      // Pass only when Critic approves AND Validator passes (AND logic per §15.2)
      const pass = criticOK && validatorResult.pass;
      if (pass) {
        passing.push({ q, critic_verdict: v.verdict });
      } else {
        rejected.push({ q, reasons: reasonList });
        reasons[q.id] = reasonList;
      }
    }

    return { passing, rejected, reasons };
  }

  // ── Attach lineage metadata to a served question ────────────────
  function attachLineage(q, critic_verdict, genMeta, critMeta, retryRound) {
    return {
      ...q,
      source: 'ai-gen',
      lineage: {
        lineage_id: q.id,
        generator_provider: genMeta.generator_provider,
        generator_model: genMeta.generator_model,
        critic_provider: critMeta.critic_provider,
        critic_model: critMeta.critic_model,
        critic_verdict,
        validator_pass: true,
        generated_at: genMeta.generated_at,
        critiqued_at: critMeta.critiqued_at,
        cross_provider: critMeta.cross_provider === true,
        prompt_version: PROMPT_VERSION,
        retry_round: retryRound,
      },
    };
  }

  // ── Pipeline: one round ─────────────────────────────────────────
  async function runRound(params, retryRound, rejectionHints) {
    // Stage 1
    const genParams = { ...params };
    if (rejectionHints && rejectionHints.length) {
      // Append hints to the target so the next gen tries harder
      genParams.target = `${params.target} (previous rejections: ${rejectionHints.slice(0, 3).join('; ')})`;
    }
    const genRes = await callGenerator(genParams);
    const questions = Array.isArray(genRes.questions) ? genRes.questions : [];
    if (!questions.length) {
      return { passing: [], genMeta: genRes.meta || {}, critMeta: {}, rejected: [], reasons: {} };
    }

    // Stage 2
    let critRes = { verdicts: [], meta: {} };
    try {
      critRes = await callCritic({
        questions,
        target: params.target,
        level: params.level,
        generator_provider: genRes.meta?.generator_provider,
      });
    } catch (e) {
      console.warn('[ai-content-engine] critic failed, will rely on validator only:', e.message);
      // Soft-fail: treat all as APPROVED by critic so validator alone decides.
      critRes = {
        verdicts: questions.map(q => ({ id: q.id, verdict: 'APPROVED', reasons: ['critic unavailable'], severity: 'low' })),
        meta: { critic_provider: 'none', critic_model: 'critic-unavailable', cross_provider: false, critiqued_at: new Date().toISOString() },
      };
    }

    // Stage 3 + 4
    const vocabIdx = getVocabLevelIndex();
    const ctx = {
      target: params.target || '',
      level: params.level,
      vocabLevelIndex: vocabIdx,
    };
    const { passing, rejected, reasons } = validateAndIntersect(questions, critRes.verdicts, ctx);

    const withLineage = passing.map(({ q, critic_verdict }) =>
      attachLineage(q, critic_verdict, genRes.meta || {}, critRes.meta || {}, retryRound)
    );

    return {
      passing: withLineage,
      rejected,
      reasons,
      genMeta: genRes.meta || {},
      critMeta: critRes.meta || {},
    };
  }

  // ── Public: generateQuiz (full pipeline) ────────────────────────
  async function generateQuiz(params) {
    if (!isEnabled()) {
      throw new Error('ai-content-engine disabled — set localStorage.nn_feature_ai_quiz_gen=1 to enable');
    }
    if (!params || typeof params !== 'object') throw new Error('params required');
    const count = Math.min(Math.max(parseInt(params.count) || 10, 1), 20);
    const normalized = {
      target: params.target || '',
      target_id: params.target_id || '',
      level: params.level || 'n4',
      count,
      type: params.type || 'mcq',
      confusion_pairs: Array.isArray(params.confusion_pairs) ? params.confusion_pairs : [],
      userId: params.userId,
    };

    const aggregate = [];
    const allRejected = [];
    const stats = {
      rounds: 0,
      total_generated: 0,
      total_rejected: 0,
      critic_rejections: 0,
      validator_rejections: 0,
      generator_provider: null,
      critic_provider: null,
      cross_provider: false,
    };

    let hints = [];
    for (let round = 0; round <= MAX_RETRY_ROUNDS && aggregate.length < count; round++) {
      let r;
      try {
        r = await runRound(normalized, round, hints);
      } catch (e) {
        console.error(`[ai-content-engine] round ${round} failed:`, e.message);
        break;
      }
      stats.rounds = round + 1;
      stats.total_generated += r.passing.length + r.rejected.length;
      stats.total_rejected += r.rejected.length;
      for (const rej of r.rejected) {
        for (const reason of rej.reasons) {
          if (reason.startsWith('critic')) stats.critic_rejections++;
          if (reason.startsWith('validator')) stats.validator_rejections++;
        }
      }
      if (!stats.generator_provider && r.genMeta.generator_provider) {
        stats.generator_provider = r.genMeta.generator_provider;
        stats.critic_provider = r.critMeta.critic_provider || null;
        stats.cross_provider = r.critMeta.cross_provider === true;
      }

      aggregate.push(...r.passing);
      allRejected.push(...r.rejected);

      // Build hints for next round from most common rejection reasons
      hints = r.rejected.flatMap(x => x.reasons).slice(0, 5);
    }

    return {
      questions: aggregate.slice(0, count),
      rejected: allRejected,
      stats,
      requested_count: count,
      delivered_count: Math.min(aggregate.length, count),
      short_of_target: aggregate.length < count,
    };
  }

  // ── Public API ──────────────────────────────────────────────────
  const API = {
    isEnabled,
    generateQuiz,
    // testing hooks
    _pipeline: {
      validateAndIntersect,
      attachLineage,
      getVocabLevelIndex,
      workerBase,
    },
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = API;
  } else {
    global.AIContentEngine = API;
  }
})(typeof window !== 'undefined' ? window : globalThis);
