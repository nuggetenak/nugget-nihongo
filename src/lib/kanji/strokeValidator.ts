// ══════════════════════════════════════════════════════════════════
//  strokeValidator.ts — Interactive Touch-Drawing Stroke Validation Engine
//  Discrete Fréchet Distance • Multi-Segment Cosine Angular Alignment
//  Stroke Direction & Backwards-Drawing Detection • Accuracy Scoring (>=80%)
// ══════════════════════════════════════════════════════════════════

export interface Point2D {
  x: number;
  y: number;
}

export type StrokeFeedback =
  | 'perfect'
  | 'good'
  | 'wrong_direction'
  | 'too_far'
  | 'too_short'
  | 'distorted';

export interface StrokeValidationDetails {
  frechetScore: number;
  corridorScore: number;
  angleScore: number;
}

export interface StrokeValidationResult {
  isValid: boolean;
  score: number; // 0 to 100
  feedback: StrokeFeedback;
  furthestSampleIndex: number;
  frechetDistance?: number;
  angularSimilarity?: number;
  progressRatio?: number;
  meanDistance?: number;
  details?: StrokeValidationDetails;
}

export interface ValidationOptions {
  startTolerancePx?: number;
  maxMeanDistancePx?: number;
  minProgressRatio?: number;
  maxFrechetDistance?: number;
  minAngularSimilarity?: number;
  minPassScore?: number;
}

export const DEFAULT_OPTIONS: Required<ValidationOptions> = {
  startTolerancePx: 26,
  maxMeanDistancePx: 20,
  minProgressRatio: 0.70,
  maxFrechetDistance: 24,
  minAngularSimilarity: 0.35,
  minPassScore: 80,
};

export const DEFAULT_VALIDATION_OPTIONS = DEFAULT_OPTIONS;

/**
 * Safely resolves user-provided options with default fallbacks
 */
export function resolveOptions(options?: ValidationOptions): Required<ValidationOptions> {
  return {
    startTolerancePx:
      typeof options?.startTolerancePx === 'number' && !Number.isNaN(options.startTolerancePx)
        ? options.startTolerancePx
        : DEFAULT_OPTIONS.startTolerancePx,
    maxMeanDistancePx:
      typeof options?.maxMeanDistancePx === 'number' && !Number.isNaN(options.maxMeanDistancePx)
        ? options.maxMeanDistancePx
        : DEFAULT_OPTIONS.maxMeanDistancePx,
    minProgressRatio:
      typeof options?.minProgressRatio === 'number' && !Number.isNaN(options.minProgressRatio)
        ? options.minProgressRatio
        : DEFAULT_OPTIONS.minProgressRatio,
    maxFrechetDistance:
      typeof options?.maxFrechetDistance === 'number' && !Number.isNaN(options.maxFrechetDistance)
        ? options.maxFrechetDistance
        : DEFAULT_OPTIONS.maxFrechetDistance,
    minAngularSimilarity:
      typeof options?.minAngularSimilarity === 'number' && !Number.isNaN(options.minAngularSimilarity)
        ? options.minAngularSimilarity
        : DEFAULT_OPTIONS.minAngularSimilarity,
    minPassScore:
      typeof options?.minPassScore === 'number' && !Number.isNaN(options.minPassScore)
        ? options.minPassScore
        : DEFAULT_OPTIONS.minPassScore,
  };
}

/**
 * Robust Euclidean Distance between two 2D points with NaN/null safety
 */
export function euclideanDistance(p1: Point2D, p2: Point2D): number {
  if (
    !p1 ||
    !p2 ||
    typeof p1.x !== 'number' ||
    typeof p1.y !== 'number' ||
    typeof p2.x !== 'number' ||
    typeof p2.y !== 'number' ||
    Number.isNaN(p1.x) ||
    Number.isNaN(p1.y) ||
    Number.isNaN(p2.x) ||
    Number.isNaN(p2.y)
  ) {
    return Infinity;
  }
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Calculates total cumulative arc length of a discrete 2D trajectory
 */
export function getStrokeTrajectoryLength(points: Point2D[]): number {
  if (!Array.isArray(points) || points.length < 2) return 0;
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    const d = euclideanDistance(points[i - 1], points[i]);
    if (Number.isFinite(d)) {
      total += d;
    }
  }
  return total;
}

/**
 * Resamples any stroke trajectory into equidistant points along its arc length
 * Normalizes variable touch sample rates (60Hz vs 120Hz ProMotion screens)
 */
export function resampleStrokePoints(points: Point2D[], targetCount = 30): Point2D[] {
  if (!Array.isArray(points) || points.length === 0) return [];
  if (points.length === 1 || targetCount <= 1) return [{ x: points[0].x, y: points[0].y }];

  const totalLength = getStrokeTrajectoryLength(points);
  if (totalLength === 0) {
    return Array.from({ length: targetCount }, () => ({ x: points[0].x, y: points[0].y }));
  }

  const segmentLength = totalLength / (targetCount - 1);
  const result: Point2D[] = [{ x: points[0].x, y: points[0].y }];

  let currentDist = 0;
  let segStartIdx = 0;

  for (let i = 1; i < targetCount - 1; i++) {
    const targetDist = i * segmentLength;
    while (segStartIdx < points.length - 1) {
      const p1 = points[segStartIdx];
      const p2 = points[segStartIdx + 1];
      const step = euclideanDistance(p1, p2);
      if (currentDist + step >= targetDist) {
        const remaining = targetDist - currentDist;
        const ratio = step > 0 ? remaining / step : 0;
        result.push({
          x: p1.x + ratio * (p2.x - p1.x),
          y: p1.y + ratio * (p2.y - p1.y),
        });
        break;
      }
      currentDist += step;
      segStartIdx++;
    }
  }

  const last = points[points.length - 1];
  result.push({ x: last.x, y: last.y });
  return result;
}

/**
 * Computes Discrete Fréchet Distance (DFD) between two discrete curves P and Q
 * Using memory-efficient O(m) space 2-row dynamic programming
 */
export function discreteFrechetDistance(p: Point2D[], q: Point2D[]): number {
  if (!Array.isArray(p) || !Array.isArray(q)) return Infinity;
  const n = p.length;
  const m = q.length;

  if (n === 0 || m === 0) return Infinity;
  if (n === 1 && m === 1) return euclideanDistance(p[0], q[0]);

  // Two row buffer to conserve memory
  let prevRow = new Float64Array(m);
  let currRow = new Float64Array(m);

  // Base case: (0, 0)
  prevRow[0] = euclideanDistance(p[0], q[0]);

  // Base case: first row (0, j)
  for (let j = 1; j < m; j++) {
    prevRow[j] = Math.max(prevRow[j - 1], euclideanDistance(p[0], q[j]));
  }

  // Iterate rows i = 1..n-1
  for (let i = 1; i < n; i++) {
    // Base case for column 0 (i, 0)
    currRow[0] = Math.max(prevRow[0], euclideanDistance(p[i], q[0]));

    for (let j = 1; j < m; j++) {
      const d = euclideanDistance(p[i], q[j]);
      const minPrev = Math.min(prevRow[j], currRow[j - 1], prevRow[j - 1]);
      currRow[j] = Math.max(d, minPrev);
    }

    // Swap row buffers
    const temp = prevRow;
    prevRow = currRow;
    currRow = temp;
  }

  return Number.isFinite(prevRow[m - 1]) ? prevRow[m - 1] : Infinity;
}

/**
 * Calculates multi-segment cosine angular similarity between two trajectories
 * Returns a value between -1.0 (opposite/backwards) to 1.0 (identical direction)
 */
export function calculateAngularSimilarity(
  userPoints: Point2D[],
  targetPoints: Point2D[],
  segments = 4
): number {
  if (
    !Array.isArray(userPoints) ||
    !Array.isArray(targetPoints) ||
    userPoints.length < 2 ||
    targetPoints.length < 2
  ) {
    return 0;
  }

  const uStart = userPoints[0];
  const uEnd = userPoints[userPoints.length - 1];
  const tStart = targetPoints[0];
  const tEnd = targetPoints[targetPoints.length - 1];

  if (!uStart || !uEnd || !tStart || !tEnd) return 0;

  // Global start-to-end vector check
  const uGlobal = {
    x: uEnd.x - uStart.x,
    y: uEnd.y - uStart.y,
  };
  const tGlobal = {
    x: tEnd.x - tStart.x,
    y: tEnd.y - tStart.y,
  };

  const uMag = Math.sqrt(uGlobal.x * uGlobal.x + uGlobal.y * uGlobal.y);
  const tMag = Math.sqrt(tGlobal.x * tGlobal.x + tGlobal.y * tGlobal.y);

  if (uMag < 4 || tMag < 4) return 1.0; // Point stroke (dot/ten)

  const globalDot = Math.max(
    -1,
    Math.min(1, (uGlobal.x * tGlobal.x + uGlobal.y * tGlobal.y) / (uMag * tMag))
  );

  // If globally drawn backwards (e.g. right-to-left instead of left-to-right)
  if (globalDot < -0.2) {
    return globalDot;
  }

  // Multi-segment piecewise tangent alignment
  let totalSim = 0;
  let count = 0;
  const segs = Math.max(1, Math.floor(segments || 4));

  for (let s = 0; s < segs; s++) {
    const uIdx1 = Math.floor((s / segs) * (userPoints.length - 1));
    const uIdx2 = Math.floor(((s + 1) / segs) * (userPoints.length - 1));
    const tIdx1 = Math.floor((s / segs) * (targetPoints.length - 1));
    const tIdx2 = Math.floor(((s + 1) / segs) * (targetPoints.length - 1));

    const pU1 = userPoints[uIdx1];
    const pU2 = userPoints[uIdx2];
    const pT1 = targetPoints[tIdx1];
    const pT2 = targetPoints[tIdx2];

    if (!pU1 || !pU2 || !pT1 || !pT2) continue;

    const uv = {
      x: pU2.x - pU1.x,
      y: pU2.y - pU1.y,
    };
    const tv = {
      x: pT2.x - pT1.x,
      y: pT2.y - pT1.y,
    };

    const um = Math.sqrt(uv.x * uv.x + uv.y * uv.y);
    const tm = Math.sqrt(tv.x * tv.x + tv.y * tv.y);

    if (um > 2 && tm > 2) {
      const dot = (uv.x * tv.x + uv.y * tv.y) / (um * tm);
      totalSim += Math.max(-1, Math.min(1, dot));
      count++;
    }
  }

  const segmentSim = count > 0 ? totalSim / count : globalDot;
  // Blend global and segment similarity
  const blended = 0.4 * globalDot + 0.6 * segmentSim;
  return Math.max(-1, Math.min(1, blended));
}

/**
 * Validates a user's drawn stroke path against reference sampled points
 * Using Discrete Fréchet Distance & Multi-Segment Directional Cosine Similarity
 */
export function validateStrokeWithFrechet(
  userPoints: Point2D[],
  targetPoints: Point2D[],
  options?: ValidationOptions
): StrokeValidationResult {
  const opts = resolveOptions(options);

  if (
    !Array.isArray(userPoints) ||
    userPoints.length < 2 ||
    !Array.isArray(targetPoints) ||
    targetPoints.length < 2
  ) {
    return {
      isValid: false,
      score: 0,
      feedback: 'too_short',
      furthestSampleIndex: 0,
      frechetDistance: Infinity,
      angularSimilarity: 0,
      progressRatio: 0,
    };
  }

  // 1. Check starting point proximity
  const startDist = euclideanDistance(userPoints[0], targetPoints[0]);
  if (startDist > opts.startTolerancePx) {
    return {
      isValid: false,
      score: Math.max(0, Math.round(100 - startDist * 2.5)),
      feedback: 'too_far',
      furthestSampleIndex: 0,
      frechetDistance: Math.round(startDist * 10) / 10,
      angularSimilarity: 0,
      progressRatio: 0,
    };
  }

  // 2. Check directional vector alignment & detect backwards drawing
  const angularSim = calculateAngularSimilarity(userPoints, targetPoints);
  if (angularSim < opts.minAngularSimilarity) {
    return {
      isValid: false,
      score: Math.max(10, Math.round(30 + angularSim * 20)),
      feedback: 'wrong_direction',
      furthestSampleIndex: 0,
      frechetDistance: Infinity,
      angularSimilarity: Math.round(angularSim * 100) / 100,
      progressRatio: 0.1,
    };
  }

  // 3. Compute Discrete Fréchet Distance
  const frechetDist = discreteFrechetDistance(userPoints, targetPoints);

  // 4. Track progress along target stroke
  let furthestIndex = 0;
  let accumulatedDistance = 0;

  for (const uPt of userPoints) {
    let minDist = Infinity;
    let closestTargetIdx = 0;

    for (let tIdx = furthestIndex; tIdx < targetPoints.length; tIdx++) {
      const d = euclideanDistance(uPt, targetPoints[tIdx]);
      if (d < minDist) {
        minDist = d;
        closestTargetIdx = tIdx;
      }
    }

    if (minDist <= opts.maxMeanDistancePx && closestTargetIdx > furthestIndex) {
      furthestIndex = closestTargetIdx;
    }
    accumulatedDistance += minDist;
  }

  const meanDistance = accumulatedDistance / userPoints.length;
  const progressRatio = furthestIndex / (targetPoints.length - 1);

  // Evaluate progress threshold
  if (progressRatio < opts.minProgressRatio) {
    return {
      isValid: false,
      score: Math.round(progressRatio * 75),
      feedback: 'too_short',
      furthestSampleIndex: furthestIndex,
      frechetDistance: Math.round(frechetDist * 10) / 10,
      angularSimilarity: Math.round(angularSim * 100) / 100,
      progressRatio: Math.round(progressRatio * 100) / 100,
      meanDistance: Math.round(meanDistance * 10) / 10,
    };
  }

  // Evaluate curve distortion via Fréchet distance
  if (frechetDist > opts.maxFrechetDistance) {
    return {
      isValid: false,
      score: Math.max(20, Math.round(100 - frechetDist * 2.5)),
      feedback: 'distorted',
      furthestSampleIndex: furthestIndex,
      frechetDistance: Math.round(frechetDist * 10) / 10,
      angularSimilarity: Math.round(angularSim * 100) / 100,
      progressRatio: Math.round(progressRatio * 100) / 100,
      meanDistance: Math.round(meanDistance * 10) / 10,
    };
  }

  // Composite accuracy scoring formula:
  // - 50% Fréchet accuracy (tight curve fidelity)
  // - 30% Mean corridor distance
  // - 20% Angular tangent alignment
  const frechetScore = Math.max(0, 100 - frechetDist * 2.2);
  const corridorScore = Math.max(0, 100 - meanDistance * 2.8);
  const angleScore = Math.max(0, angularSim * 100);

  const rawCompositeScore = Math.round(
    0.5 * frechetScore + 0.3 * corridorScore + 0.2 * angleScore
  );

  const finalScore = Math.max(50, Math.min(100, rawCompositeScore));
  const isValid = finalScore >= opts.minPassScore;
  const feedback: StrokeFeedback = finalScore >= 92 ? 'perfect' : isValid ? 'good' : 'distorted';

  return {
    isValid,
    score: finalScore,
    feedback,
    furthestSampleIndex: furthestIndex,
    frechetDistance: Math.round(frechetDist * 10) / 10,
    angularSimilarity: Math.round(angularSim * 100) / 100,
    progressRatio: Math.round(progressRatio * 100) / 100,
    meanDistance: Math.round(meanDistance * 10) / 10,
    details: {
      frechetScore: Math.round(frechetScore * 10) / 10,
      corridorScore: Math.round(corridorScore * 10) / 10,
      angleScore: Math.round(angleScore * 10) / 10,
    },
  };
}

/**
 * Backward-compatible wrapper delegating to validateStrokeWithFrechet
 */
export function validateStrokeDrawing(
  userPoints: Point2D[],
  targetPoints: Point2D[],
  options?: ValidationOptions
): StrokeValidationResult {
  return validateStrokeWithFrechet(userPoints, targetPoints, options);
}
