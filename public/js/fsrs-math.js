// ══════════════════════════════════════════════════════
//  fsrs-math.js — Nugget Nihongo
//  FSRS math utilities & calibration hooks
//  Load AFTER ts-fsrs CDN, BEFORE fsrs-engine.js
//
//  Research basis:
//    - Ye et al. (2022) — FSRS memory model (KDD proceedings)
//    - Matsunaga (1999) — non-kanji-background learners need 2.3× exposures
//    - Blueprint §8.11.2 — Study 2: FSRS difficulty prior calibration
//
//  Architecture v15.6.0 — 8 April 2026
// ══════════════════════════════════════════════════════

(function () {
  'use strict';

  // ── Constants ──────────────────────────────────────────
  // FSRS power forgetting curve parameters
  var DECAY  = 0.5;
  var FACTOR = 19 / 81;   // (1/DECAY - 1)

  // Matsunaga (1999) kanji exposure differential for non-kanji L1
  var MATSUNAGA_MULTIPLIER = 2.3;

  // ── Forgetting Curve ───────────────────────────────────
  // R(t, S) = (1 + FACTOR * t / S) ^ (-1/DECAY)
  // Returns retrievability R ∈ [0, 1]
  window.fsrsForgettingCurve = function (elapsedDays, stability) {
    if (stability <= 0) return 0;
    return Math.pow(1 + FACTOR * (elapsedDays / stability), -1 / DECAY);
  };

  // ── Next Interval from Target Retention ────────────────
  // Inverse of forgetting curve: given S and target R, compute t
  // t = S / FACTOR * (R^(-DECAY) - 1)
  window.fsrsNextInterval = function (stability, requestRetention) {
    if (stability <= 0 || requestRetention <= 0 || requestRetention >= 1) return 0;
    return stability / FACTOR * (Math.pow(requestRetention, -DECAY) - 1);
  };

  // ── Indonesian Learner Difficulty Priors ────────────────
  // Returns suggested difficulty adjustments for non-kanji-background learners.
  // Based on Matsunaga (1999): Indonesian (non-kanji L1) learners
  // require approximately 2.3× more exposures for kanji cards.
  //
  // Currently returns defaults. Replace with calibrated values when
  // post-launch Study 2 data (§8.11.2) becomes available.
  window.fsrsIndonesianPrior = function () {
    return {
      kanji_difficulty_boost:  0,     // additive boost to difficulty (0 = no change yet)
      kanji_stability_factor: 1.0,   // multiplier on initial stability (1.0 = default)
      matsunaga_multiplier:   MATSUNAGA_MULTIPLIER,
      calibrated:             false, // true once Study 2 data is applied
      note: 'Defaults. Calibrate after 10K+ kanji review events (Blueprint §8.11.2).'
    };
  };

  // ── Custom FSRS Algorithm Placeholder ──────────────────
  // Signature: (card, rating, now) → { stability, difficulty, interval } | null
  //
  // card   = { stability, difficulty, state, reps, lapses, elapsed_days, ... }
  // rating = 1 (Again) | 2 (Hard) | 3 (Good) | 4 (Easy)
  // now    = Date object
  //
  // Return an object with { stability, difficulty, interval } to OVERRIDE
  // the standard ts-fsrs calculation. Return null to fall through to ts-fsrs.
  //
  // ⚠️  INJECT YOUR CUSTOM FSRS PARAMETERS HERE
  //     This hook is checked by fsrs-engine.js before calling ts-fsrs.
  //     When Blueprint Study 2 delivers Indonesian-specific parameters,
  //     implement them here.
  window._customFSRS = function (card, rating, now) {
    // TODO: Replace with custom algorithm when calibration data is available.
    // Example future implementation:
    //   var priors = window.fsrsIndonesianPrior();
    //   if (card.source === 'kanji' && priors.calibrated) {
    //     return { stability: ..., difficulty: ..., interval: ... };
    //   }
    return null; // null = use standard ts-fsrs
  };

  console.log('[fsrs-math] FSRS math utilities loaded');

})();
