// ══════════════════════════════════════════════════════
//  fsrs-4d-engine.js — Nugget Nihongo
//  4-Dimensional FSRS Spaced Repetition Engine with
//  Parent-Child Inheritance / Knowledge Graph Spillover
//
//  Dimensions:
//    - visual   : Recognition of Kanji/Reading (Flashcards)
//    - context  : Grammar application in sentences (Quizzes/Mockups)
//    - auditory : Listening comprehension (Audio drills)
//    - verbal   : Speaking production (Voice drills)
// ══════════════════════════════════════════════════════

(function (root, factory) {
  var exp = factory(root);
  if (typeof module === 'object' && module.exports) {
    module.exports = exp;
  }
  if (root) {
    root.FSRS4DEngine = exp;
  }
})(typeof globalThis !== 'undefined' ? globalThis : (typeof window !== 'undefined' ? window : this), function (root) {
  'use strict';

  // ── CONSTANTS & HYPERPARAMETERS ──────────────────────
  var DIMENSIONS = ['visual', 'context', 'auditory', 'verbal'];

  var RATING = {
    AGAIN: 1,
    HARD:  2,
    GOOD:  3,
    EASY:  4
  };

  var STATE = {
    NEW:        0,
    LEARNING:   1,
    REVIEW:     2,
    RELEARNING: 3
  };

  var PARAMS = {
    requestRetention: 0.9,
    maxInterval: 36500, // 100 years max
    w: [
      0.4072, 1.1829, 3.1262, 15.4722, // Initial stabilities for Again, Hard, Good, Easy
      7.2102, 0.5316, 1.0651, 0.0234,  // Difficulty weights
      1.616,  0.1544, 1.0824,          // Stability review weights
      1.9813, 0.0953, 0.2975, 2.2042   // Forgetting & recall weights
    ],
    // Inheritance / Spillover Tuning
    inheritanceFactor: 0.20,    // Parent -> Child boost (20% of delta)
    childFeedbackFactor: 0.05,  // Child -> Parent micro-boost (5% of delta)
    maxStabilityCeiling: 365.0  // 1 year ceiling for single spillover step
  };

  // ── CORE FSRS MATH (Dimension-Specific) ──────────────

  function initDimensionAtom(atomId, atomType, dimension) {
    return {
      atom_id: atomId,
      atom_type: atomType,
      dimension: dimension,
      stability: 0,
      difficulty: 0,
      elapsed_days: 0,
      scheduled_days: 0,
      reps: 0,
      lapses: 0,
      state: STATE.NEW,
      last_review: null,
      due: new Date()
    };
  }

  function create4DAtom(atomId, atomType, metadata) {
    metadata = metadata || {};
    var atom = {
      atom_id: atomId,
      atom_type: atomType, // 'vocab', 'grammar', 'kanji', 'particle'
      parents: metadata.parents || [], // Parent IDs (e.g. kanji '食', grammar 'gn5-00001')
      children: metadata.children || [],
      dimensions: {}
    };

    for (var i = 0; i < DIMENSIONS.length; i++) {
      var dim = DIMENSIONS[i];
      atom.dimensions[dim] = initDimensionAtom(atomId, atomType, dim);
    }

    return atom;
  }

  /**
   * Calculates Retrievability R(t)
   * Formula: R(t) = (1 + factor * t / S)^-w
   */
  function retrievability(stability, elapsedDays) {
    if (stability <= 0) return 0;
    if (elapsedDays <= 0) return 1.0;
    return Math.pow(1 + (19 / 81) * (elapsedDays / stability), -0.5);
  }

  /**
   * Updates a single dimension using FSRS formula
   */
  function reviewDimension(dimState, rating, now) {
    now = now || new Date();
    var s = dimState.stability;
    var d = dimState.difficulty;
    var reps = dimState.reps;
    var lapses = dimState.lapses;
    var state = dimState.state;
    var lastReview = dimState.last_review ? new Date(dimState.last_review) : null;

    var elapsedDays = lastReview ? Math.max(0, (now.getTime() - lastReview.getTime()) / (1000 * 86400)) : 0;
    var oldStability = s;

    // 1. Initial review (State: NEW)
    if (state === STATE.NEW) {
      s = PARAMS.w[rating - 1];
      d = Math.max(1, Math.min(10, PARAMS.w[4] - Math.exp(PARAMS.w[5] * (rating - 1)) + 1));
      reps = 1;
      lapses = rating === RATING.AGAIN ? 1 : 0;
      state = rating === RATING.AGAIN ? STATE.LEARNING : STATE.REVIEW;
    } else {
      // 2. Existing card review
      var r = retrievability(s, elapsedDays);

      // Update Difficulty
      var deltaD = -PARAMS.w[6] * (rating - 3);
      d = Math.max(1, Math.min(10, d + deltaD));

      if (rating === RATING.AGAIN) {
        // Lapse
        s = Math.max(0.1, PARAMS.w[11] * Math.pow(d, -PARAMS.w[12]) * (Math.pow(s + 1, PARAMS.w[13]) - 1) * Math.exp(PARAMS.w[14] * (1 - r)));
        lapses += 1;
        state = STATE.RELEARNING;
      } else {
        // Success (Hard, Good, Easy)
        var hardPenalty = rating === RATING.HARD ? PARAMS.w[15] || 0.8 : 1.0;
        var easyBonus = rating === RATING.EASY ? PARAMS.w[16] || 1.3 : 1.0;
        s = s * (1 + Math.exp(PARAMS.w[8]) * (11 - d) * Math.pow(s, -PARAMS.w[9]) * (Math.exp((1 - r) * PARAMS.w[10]) - 1) * hardPenalty * easyBonus);
        state = STATE.REVIEW;
      }
      reps += 1;
    }

    // Interval Calculation
    var interval = Math.max(1, Math.round(s * (Math.pow(PARAMS.requestRetention, -1 / 0.5) - 1) / (19 / 81)));
    interval = Math.min(PARAMS.maxInterval, interval);

    var nextDue = new Date(now.getTime() + interval * 86400 * 1000);

    return {
      updated: {
        atom_id: dimState.atom_id,
        atom_type: dimState.atom_type,
        dimension: dimState.dimension,
        stability: Math.round(s * 100) / 100,
        difficulty: Math.round(d * 100) / 100,
        elapsed_days: Math.round(elapsedDays * 10) / 10,
        scheduled_days: interval,
        reps: reps,
        lapses: lapses,
        state: state,
        last_review: now.toISOString(),
        due: nextDue.toISOString()
      },
      stabilityDelta: s - oldStability
    };
  }

  // ── INHERITANCE / SPILLOVER LOGIC ────────────────────

  /**
   * Propagates knowledge gain across Knowledge Graph:
   * When parent (e.g. Kanji 食) gains stability, boost children (e.g. 食べる, 食べ物).
   * @param {object} parentAtom - The 4D atom that was reviewed
   * @param {string} dimension - 'visual' | 'context' | 'auditory' | 'verbal'
   * @param {number} deltaStability - The stability increase
   * @param {Array<object>} childAtoms - Child 4D atoms associated with this parent
   */
  function applyInheritanceSpillover(parentAtom, dimension, deltaStability, childAtoms) {
    if (deltaStability <= 0 || !childAtoms || childAtoms.length === 0) return [];
    var affectedChildren = [];

    var boost = deltaStability * PARAMS.inheritanceFactor;

    for (var i = 0; i < childAtoms.length; i++) {
      var child = childAtoms[i];
      if (!child || !child.dimensions || !child.dimensions[dimension]) continue;

      var dim = child.dimensions[dimension];
      var currentS = dim.stability;

      // Dampen boost if child is already highly mature
      var ceilingRatio = Math.max(0, 1 - (currentS / PARAMS.maxStabilityCeiling));
      var finalBoost = Math.round(boost * ceilingRatio * 100) / 100;

      if (finalBoost > 0) {
        dim.stability = Math.round((dim.stability + finalBoost) * 100) / 100;
        // If child was brand new, promote to learning baseline
        if (dim.state === STATE.NEW) {
          dim.state = STATE.LEARNING;
          dim.difficulty = 5.0; // Default moderate difficulty
        }
        affectedChildren.push({
          atom_id: child.atom_id,
          dimension: dimension,
          inherited_boost: finalBoost,
          new_stability: dim.stability
        });
      }
    }

    return affectedChildren;
  }

  // ── MULTI-DIMENSIONAL MASTERY AGGREGATION ────────────

  /**
   * Computes retrievability for a single dimension atom.
   */
  function getDimensionRetrievability(dimState, now) {
    if (!dimState) return 0;
    now = now || new Date();
    var lastReview = dimState.last_review ? new Date(dimState.last_review) : null;
    var elapsed = lastReview ? Math.max(0, (now.getTime() - lastReview.getTime()) / (1000 * 86400)) : 0;
    return retrievability(dimState.stability, elapsed);
  }

  /**
   * Computes weighted overall mastery score [0..100] across 4 dimensions:
   * Visual (35%), Context (35%), Auditory (15%), Verbal (15%).
   */
  function computeOverallMastery(atom, now) {
    if (!atom || !atom.dimensions) return 0;
    now = now || new Date();
    var weights = { visual: 0.35, context: 0.35, auditory: 0.15, verbal: 0.15 };
    var total = 0;
    var weightSum = 0;

    for (var i = 0; i < DIMENSIONS.length; i++) {
      var dim = DIMENSIONS[i];
      var w = weights[dim] || 0.25;
      var dimState = atom.dimensions[dim];
      if (dimState && dimState.stability > 0) {
        var r = getDimensionRetrievability(dimState, now);
        var maturity = Math.min(1.0, dimState.stability / 30);
        var score = (maturity * 0.6 + r * 0.4) * 100;
        total += score * w;
      }
      weightSum += w;
    }

    return Math.round((total / (weightSum || 1)) * 10) / 10;
  }

  // ── SELF-TEST & VERIFICATION SUITE ────────────────────

  function selfTest() {
    var tests = [
      {
        name: '4D Atom initializes all 4 dimensions independently',
        run: function () {
          var atom = create4DAtom('vn5-taberu', 'vocab');
          return (
            atom.dimensions.visual &&
            atom.dimensions.context &&
            atom.dimensions.auditory &&
            atom.dimensions.verbal &&
            atom.dimensions.visual.state === STATE.NEW
          );
        }
      },
      {
        name: 'Reviewing visual dimension updates visual stability without touching auditory',
        run: function () {
          var atom = create4DAtom('vn5-taberu', 'vocab');
          var rev = reviewDimension(atom.dimensions.visual, RATING.GOOD);
          atom.dimensions.visual = rev.updated;

          return (
            atom.dimensions.visual.stability > 0 &&
            atom.dimensions.visual.reps === 1 &&
            atom.dimensions.auditory.reps === 0 &&
            atom.dimensions.auditory.stability === 0
          );
        }
      },
      {
        name: 'Inheritance spillover boosts child vocabulary when parent kanji advances',
        run: function () {
          var kanji = create4DAtom('kanji-shoku', 'kanji');
          var vocab1 = create4DAtom('vocab-taberu', 'vocab');
          var vocab2 = create4DAtom('vocab-tabemono', 'vocab');

          var rev = reviewDimension(kanji.dimensions.visual, RATING.EASY);
          kanji.dimensions.visual = rev.updated;

          var spillovers = applyInheritanceSpillover(kanji, 'visual', rev.stabilityDelta, [vocab1, vocab2]);

          return (
            spillovers.length === 2 &&
            vocab1.dimensions.visual.stability > 0 &&
            vocab2.dimensions.visual.stability > 0 &&
            spillovers[0].inherited_boost > 0
          );
        }
      },
      {
        name: 'Retrievability decreases as elapsed days increase',
        run: function () {
          var s = 10.0;
          var rDay1 = retrievability(s, 1);
          var rDay10 = retrievability(s, 10);
          var rDay30 = retrievability(s, 30);
          return rDay1 > rDay10 && rDay10 > rDay30 && rDay1 <= 1.0;
        }
      }
    ];

    return tests.map(function (t) {
      var pass = false;
      try {
        pass = t.run();
      } catch (e) {
        pass = false;
      }
      return { name: t.name, pass: pass };
    });
  }

  return {
    DIMENSIONS: DIMENSIONS,
    RATING: RATING,
    STATE: STATE,
    PARAMS: PARAMS,
    create4DAtom: create4DAtom,
    reviewDimension: reviewDimension,
    retrievability: retrievability,
    getDimensionRetrievability: getDimensionRetrievability,
    computeOverallMastery: computeOverallMastery,
    applyInheritanceSpillover: applyInheritanceSpillover,
    selfTest: selfTest
  };
});
