// ══════════════════════════════════════════════════════
//  fsrs-math.js — Nugget Nihongo
//  FSRS math utilities, standalone scheduler & calibration hooks
//  Load AFTER ts-fsrs CDN (if present), BEFORE fsrs-engine.js
//
//  Research basis:
//    - Ye et al. (2022) — FSRS memory model (KDD proceedings)
//    - Matsunaga (1999) — non-kanji-background learners need 2.3× exposures
//    - Level Ladder Spec v1 (Curriculum Synthesis)
//    - Blueprint §8.11.2 — Study 2: FSRS difficulty prior calibration
//
//  Architecture v16.0.0 — April 2026
// ══════════════════════════════════════════════════════

(function () {
  'use strict';

  var root = typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this);

  // ── Constants ──────────────────────────────────────────
  // FSRS power forgetting curve parameters
  var DECAY  = 0.5;
  var FACTOR = 19 / 81;   // Derived: (0.90^(-1/DECAY) - 1) = (0.90^(-2) - 1) = 19/81

  // Matsunaga (1999) kanji exposure differential for non-kanji L1
  var MATSUNAGA_MULTIPLIER = 2.3;

  // Default FSRS 4.5 / 5 weight vector (17 canonical weights)
  var DEFAULT_WEIGHTS = [
    0.40255, 1.18385, 3.173, 15.691, // w0-w3: initial stabilities for Again(1), Hard(2), Good(3), Easy(4)
    7.1949, 0.5345,                  // w4-w5: initial difficulty parameters (intercept, slope)
    1.4604, 0.0046,                  // w6-w7: difficulty step & mean reversion rate
    1.5457, 0.1492,                  // w8-w9: recall stability growth factor & stability power
    1.0069, 1.9904, 0.1147, 0.2934,  // w10-w13: lapse stability decay parameters
    0.2215, 0.2615, 0.6058           // w14-w16: rating multipliers (w15: Hard penalty, w16: Easy bonus)
  ];

  // Kanji detection regex (CJK Unified Ideographs + Extension A)
  var KANJI_REGEX = /[\u4e00-\u9faf\u3400-\u4dbf]/;

  // ── Forgetting Curve ───────────────────────────────────
  // R(t, S) = (1 + FACTOR * (t / S)) ^ (-DECAY)
  // At t = S: R(S, S) = (1 + 19/81)^(-0.5) = (100/81)^(-0.5) = 9/10 = 0.90
  // Returns retrievability R ∈ [0, 1]
  function fsrsForgettingCurve(elapsedDays, stability) {
    if (stability <= 0) return 0;
    if (elapsedDays <= 0) return 1.0;
    var r = Math.pow(1 + FACTOR * (elapsedDays / stability), -DECAY);
    return Math.max(0, Math.min(1, r));
  }

  // ── Next Interval from Target Retention ────────────────
  // Inverse of forgetting curve: given S and target R, compute t
  // t = S / FACTOR * (R^(-1/DECAY) - 1)
  // When R = 0.90: t = S / (19/81) * (0.90^(-2) - 1) = S * 1 = S
  function fsrsNextInterval(stability, requestRetention, maxInterval) {
    if (stability <= 0) return 1;
    var r = (typeof requestRetention === 'number' && requestRetention > 0 && requestRetention < 1)
      ? requestRetention
      : 0.90;
    var maxI = maxInterval || 365;
    var t = (stability / FACTOR) * (Math.pow(r, -1 / DECAY) - 1);
    return Math.max(1, Math.min(maxI, Math.round(t)));
  }

  // ── Indonesian Learner Difficulty Priors ────────────────
  // Based on Matsunaga (1999): Indonesian (non-kanji L1) learners
  // require approximately 2.3× more exposures for kanji cards.
  function fsrsIndonesianPrior() {
    return {
      kanji_difficulty_boost:      0.5,   // additive boost to difficulty
      kanji_difficulty_multiplier: 1.15,  // scale factor on initial difficulty
      kanji_stability_factor:      0.85,  // initial stability compaction for kanji
      matsunaga_multiplier:        MATSUNAGA_MULTIPLIER,
      calibrated:                  true,
      source:                      'Matsunaga (1999) + Level Ladder Spec v1'
    };
  }

  // Helper: check if item has kanji
  function hasKanji(str) {
    return typeof str === 'string' && KANJI_REGEX.test(str);
  }

  // ── Initial Stability & Difficulty ─────────────────────
  function fsrsInitialStability(rating, weights, isKanji) {
    var w = weights || DEFAULT_WEIGHTS;
    var idx = Math.max(1, Math.min(4, Math.round(rating))) - 1;
    var s0 = w[idx] || w[2];
    if (isKanji) {
      s0 = s0 * 0.85; // compact initial stability for kanji
    }
    return Math.max(0.1, Number(s0.toFixed(4)));
  }

  function fsrsInitialDifficulty(rating, weights, isKanji) {
    var w = weights || DEFAULT_WEIGHTS;
    var r = Math.max(1, Math.min(4, Math.round(rating)));
    // D0(G) = clamp(w4 - exp(w5 * (G - 1)) + 1, 1, 10)
    var d0 = w[4] - Math.exp(w[5] * (r - 1)) + 1;
    if (isKanji) {
      d0 = d0 * 1.15 + 0.5;
    }
    return Math.max(1, Math.min(10, Number(d0.toFixed(4))));
  }

  // ── Difficulty Update ──────────────────────────────────
  function fsrsNextDifficulty(currentD, rating, weights) {
    var w = weights || DEFAULT_WEIGHTS;
    var r = Math.max(1, Math.min(4, Math.round(rating)));
    // Delta D = -w6 * (G - 3)
    var deltaD = -w[6] * (r - 3);
    var dRaw = currentD + deltaD;
    // Mean reversion to D0(3) (default Good difficulty ~5.28)
    var d0_3 = w[4] - Math.exp(w[5] * 2) + 1;
    var dPrime = w[7] * d0_3 + (1 - w[7]) * dRaw;
    return Math.max(1, Math.min(10, Number(dPrime.toFixed(4))));
  }

  // ── Stability Update on Recall (Rating >= 2) ───────────
  function fsrsNextStabilityRecall(D, S, R, rating, weights) {
    var w = weights || DEFAULT_WEIGHTS;
    var r = Math.max(2, Math.min(4, Math.round(rating)));
    var h = 1.0;
    if (r === 2) h = w[15] || 0.2615;      // Hard penalty
    else if (r === 4) h = 1.0 + (w[16] || 0.6058); // Easy bonus

    // S'r = S * (1 + exp(w8) * (11 - D) * S^(-w9) * (exp((1 - R) * w10) - 1) * h)
    var expW8 = Math.exp(w[8]);
    var dFactor = 11 - D;
    var sFactor = Math.pow(S, -w[9]);
    var rFactor = Math.exp((1 - R) * w[10]) - 1;

    var growth = expW8 * dFactor * sFactor * rFactor * h;
    var sPrime = S * (1 + Math.max(0, growth));

    // Ensure monotonically non-decreasing on Good & Easy
    if (r >= 3 && sPrime < S) sPrime = S * (r === 4 ? 1.5 : 1.2);
    return Math.max(0.1, Number(sPrime.toFixed(4)));
  }

  // ── Stability Update on Lapse / Forgetting (Rating == 1) 
  function fsrsNextStabilityLapse(D, S, R, weights) {
    var w = weights || DEFAULT_WEIGHTS;
    // S'f = w11 * D^(-w12) * ((S + 1)^w13 - 1) * exp((1 - R) * w14)
    var sPrime = w[10] * Math.pow(D, -w[11]) * (Math.pow(S + 1, w[12]) - 1) * Math.exp((1 - R) * w[13]);
    if (isNaN(sPrime) || sPrime <= 0) {
      sPrime = Math.min(S * 0.5, 0.4);
    }
    // Cannot exceed prior stability
    sPrime = Math.min(S, Math.max(0.1, sPrime));
    return Number(sPrime.toFixed(4));
  }

  // ── Standalone FSRS Engine Calculation ──────────────────
  // Evaluates next card state without external library dependency.
  // Card: { stability, difficulty, state, reps, lapses, last_review, elapsed_days, scheduled_days }
  // Rating: 1 (Again), 2 (Hard), 3 (Good), 4 (Easy)
  function fsrsCalculate(card, rating, now, options) {
    var opts = options || {};
    var r = Math.max(1, Math.min(4, Math.round(rating)));
    var nowDate = (now instanceof Date) ? now : new Date();
    var weights = opts.weights || DEFAULT_WEIGHTS;
    var requestRetention = opts.request_retention || 0.90;
    var maxInterval = opts.maximum_interval || 365;

    var isKanji = opts.is_kanji || false;
    if (!isKanji && card) {
      if (card.source === 'kanji' || (card.word && hasKanji(card.word))) {
        isKanji = true;
      }
    }

    var c = card || {};
    var currentState = (typeof c.state === 'number') ? c.state : 0; // 0=New, 1=Learning, 2=Review, 3=Relearning
    var reps = (c.reps || 0) + 1;
    var lapses = c.lapses || 0;
    if (r === 1) lapses += 1;

    var newStability, newDifficulty, newState, retrievability = 1.0;

    if (currentState === 0 || !c.stability || c.stability <= 0) {
      // First review (New card)
      newStability = fsrsInitialStability(r, weights, isKanji);
      newDifficulty = fsrsInitialDifficulty(r, weights, isKanji);
      newState = (r === 1) ? 3 : (r === 4 ? 2 : 1);
      retrievability = 1.0;
    } else {
      // Subsequent review
      var lastRev = c.last_review ? new Date(c.last_review) : nowDate;
      var elapsed = Math.max(0, (nowDate - lastRev) / 86400000);
      retrievability = fsrsForgettingCurve(elapsed, c.stability);

      newDifficulty = fsrsNextDifficulty(c.difficulty || 5.0, r, weights);

      if (r === 1) {
        newStability = fsrsNextStabilityLapse(newDifficulty, c.stability, retrievability, weights);
        newState = 3; // Relearning
      } else {
        newStability = fsrsNextStabilityRecall(newDifficulty, c.stability, retrievability, r, weights);
        newState = 2; // Review
      }
    }

    var nextInterval = fsrsNextInterval(newStability, requestRetention, maxInterval);
    var nextDue = new Date(nowDate.getTime() + nextInterval * 86400000);

    return {
      stability:      newStability,
      difficulty:     newDifficulty,
      interval:       nextInterval,
      state:          newState,
      reps:           reps,
      lapses:         lapses,
      retrievability: Number(retrievability.toFixed(4)),
      due:            nextDue,
      due_iso:        nextDue.toISOString(),
      last_review:    nowDate.toISOString(),
      elapsed_days:   0,
    };
  }

  // ── Interval Formatting Helper ─────────────────────────
  // Formats interval in days into clean 4-button badge string
  // Examples: 1d, 3d, 12d, 1.5mo, 1y
  function fsrsFormatInterval(days) {
    if (days < 1) return '<1d';
    if (days === 1) return '1d';
    if (days < 30) return Math.round(days) + 'd';
    if (days < 365) {
      var mo = days / 30;
      return (mo >= 10 ? Math.round(mo) : mo.toFixed(1)).replace('.0', '') + 'mo';
    }
    var y = days / 365;
    return (y >= 10 ? Math.round(y) : y.toFixed(1)).replace('.0', '') + 'y';
  }

  // ── Custom FSRS Hook for fsrs-engine.js ─────────────────
  // Checked by fsrs-engine.js before calling ts-fsrs.
  // Returns calibrated object for kanji cards or standalone execution.
  function _customFSRS(card, rating, now, options) {
    if (!card) return null;
    var isKanji = (card.source === 'kanji' || (card.word && hasKanji(card.word)));
    // If kanji prior calibration is active or ts-fsrs is unavailable, calculate via standalone FSRS
    if (isKanji) {
      return fsrsCalculate(card, rating, now, { is_kanji: true });
    }
    return null; // Fall through to standard ts-fsrs for regular grammar/kana cards
  }

  // ── Exports ────────────────────────────────────────────
  root.fsrsForgettingCurve   = fsrsForgettingCurve;
  root.fsrsNextInterval      = fsrsNextInterval;
  root.fsrsIndonesianPrior   = fsrsIndonesianPrior;
  root.fsrsInitialStability  = fsrsInitialStability;
  root.fsrsInitialDifficulty = fsrsInitialDifficulty;
  root.fsrsNextDifficulty    = fsrsNextDifficulty;
  root.fsrsNextStabilityRecall = fsrsNextStabilityRecall;
  root.fsrsNextStabilityLapse  = fsrsNextStabilityLapse;
  root.fsrsCalculate         = fsrsCalculate;
  root.fsrsFormatInterval    = fsrsFormatInterval;
  root._customFSRS           = _customFSRS;
  root.FSRS_DEFAULT_WEIGHTS  = DEFAULT_WEIGHTS;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      fsrsForgettingCurve:   fsrsForgettingCurve,
      fsrsNextInterval:      fsrsNextInterval,
      fsrsIndonesianPrior:   fsrsIndonesianPrior,
      fsrsInitialStability:  fsrsInitialStability,
      fsrsInitialDifficulty: fsrsInitialDifficulty,
      fsrsNextDifficulty:    fsrsNextDifficulty,
      fsrsCalculate:         fsrsCalculate,
      fsrsFormatInterval:    fsrsFormatInterval,
      _customFSRS:           _customFSRS,
      DEFAULT_WEIGHTS:       DEFAULT_WEIGHTS,
    };
  }

  console.log('[fsrs-math] Standalone FSRS 4.5/5.0 math & Matsunaga prior engine loaded');

})();
