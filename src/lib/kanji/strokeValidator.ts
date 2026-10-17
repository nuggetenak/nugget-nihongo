// ══════════════════════════════════════════════════════════════════
//  strokeValidator.ts — Interactive Touch-Drawing Stroke Validation Engine
//  Validates user gesture coordinates against target KanjiVG stroke paths
// ══════════════════════════════════════════════════════════════════

export interface Point2D {
  x: number;
  y: number;
}

export interface StrokeValidationResult {
  isValid: boolean;
  score: number; // 0 to 100
  feedback: 'perfect' | 'good' | 'wrong_direction' | 'too_far' | 'too_short';
  furthestSampleIndex: number;
}

export interface ValidationOptions {
  startTolerancePx?: number;
  maxMeanDistancePx?: number;
  minProgressRatio?: number;
}

const DEFAULT_OPTIONS: Required<ValidationOptions> = {
  startTolerancePx: 26,
  maxMeanDistancePx: 22,
  minProgressRatio: 0.65,
};

function euclideanDistance(p1: Point2D, p2: Point2D): number {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Validates a user's drawn stroke path against reference sampled points
 */
export function validateStrokeDrawing(
  userPoints: Point2D[],
  targetPoints: Point2D[],
  options?: ValidationOptions
): StrokeValidationResult {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  if (!userPoints || userPoints.length < 2 || !targetPoints || targetPoints.length < 2) {
    return {
      isValid: false,
      score: 0,
      feedback: 'too_short',
      furthestSampleIndex: 0,
    };
  }

  // 1. Check starting point proximity
  const startDist = euclideanDistance(userPoints[0], targetPoints[0]);
  if (startDist > opts.startTolerancePx) {
    return {
      isValid: false,
      score: Math.max(0, Math.round(100 - startDist * 2)),
      feedback: 'too_far',
      furthestSampleIndex: 0,
    };
  }

  // 2. Check directional vector alignment (start to end)
  const userVec = {
    x: userPoints[userPoints.length - 1].x - userPoints[0].x,
    y: userPoints[userPoints.length - 1].y - userPoints[0].y,
  };
  const targetVec = {
    x: targetPoints[targetPoints.length - 1].x - targetPoints[0].x,
    y: targetPoints[targetPoints.length - 1].y - targetPoints[0].y,
  };

  const userMag = Math.sqrt(userVec.x * userVec.x + userVec.y * userVec.y);
  const targetMag = Math.sqrt(targetVec.x * targetVec.x + targetVec.y * targetVec.y);

  if (targetMag > 8 && userMag > 8) {
    const dot = (userVec.x * targetVec.x + userVec.y * targetVec.y) / (userMag * targetMag);
    // If dot product is negative or too low, direction is wrong (e.g. drawn backwards)
    if (dot < 0.2) {
      return {
        isValid: false,
        score: 30,
        feedback: 'wrong_direction',
        furthestSampleIndex: 0,
      };
    }
  }

  // 3. Track progress along target stroke
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

  if (progressRatio < opts.minProgressRatio) {
    return {
      isValid: false,
      score: Math.round(progressRatio * 80),
      feedback: 'too_short',
      furthestSampleIndex: furthestIndex,
    };
  }

  if (meanDistance > opts.maxMeanDistancePx) {
    return {
      isValid: false,
      score: Math.max(0, Math.round(100 - meanDistance * 3)),
      feedback: 'too_far',
      furthestSampleIndex: furthestIndex,
    };
  }

  // Quality score based on mean distance accuracy
  const score = Math.max(60, Math.min(100, Math.round(100 - meanDistance * 1.5)));
  const feedback = score >= 90 ? 'perfect' : 'good';

  return {
    isValid: true,
    score,
    feedback,
    furthestSampleIndex: furthestIndex,
  };
}
