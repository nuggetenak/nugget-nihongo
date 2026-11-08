// ══════════════════════════════════════════════════════════════════
//  cbtTimer.ts — CBT Countdown & Scaffolding Timer Engine
//  Standardized for JLPT & Prometric JFT-Basic 15-Minute Exam Sessions
// ══════════════════════════════════════════════════════════════════

export interface CbtTimerState {
  remainingSeconds: number;
  isPaused: boolean;
  isSubmitted: boolean;
  mode: 'strict' | 'guided';
}

/**
 * Formats seconds into mm:ss display with NaN, negative and infinite boundaries protection
 */
export function formatTimer(totalSec: number): string {
  if (
    typeof totalSec !== 'number' ||
    Number.isNaN(totalSec) ||
    !Number.isFinite(totalSec)
  ) {
    return '00:00';
  }
  const safeSec = Math.max(0, Math.floor(totalSec));
  const mins = Math.floor(safeSec / 60);
  const secs = safeSec % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

/**
 * Calculates net time spent during examination
 */
export function calculateTimeSpent(
  timeLimitMinutes: number,
  remainingSeconds: number,
  mode: 'strict' | 'guided'
): number {
  if (mode === 'strict') {
    const limitSec = Math.max(0, (timeLimitMinutes || 15) * 60);
    return Math.max(0, limitSec - Math.max(0, remainingSeconds));
  }
  return Math.max(0, remainingSeconds || 0);
}

/**
 * Identifies urgent timer window (<= 3 minutes remaining in strict mode)
 */
export function isUrgentTime(remainingSeconds: number, mode: 'strict' | 'guided'): boolean {
  return mode === 'strict' && remainingSeconds <= 180 && remainingSeconds > 60;
}

/**
 * Identifies critical timer window (<= 1 minute remaining in strict mode)
 */
export function isCriticalTime(remainingSeconds: number, mode: 'strict' | 'guided'): boolean {
  return mode === 'strict' && remainingSeconds <= 60;
}

/**
 * Computes passing threshold (defaults to 70% if not custom-specified)
 */
export function computePassingScore(
  totalQuestions: number,
  customPassingScore?: number
): number {
  return customPassingScore || Math.ceil(totalQuestions * 0.7);
}

/**
 * Evaluates test outcome against passing standards
 */
export function evaluateCbtResult(
  correctCount: number,
  totalQuestions: number,
  customPassingScore?: number
): { percentage: number; isPassed: boolean; passingThreshold: number } {
  const safeTotal = Math.max(1, totalQuestions);
  const safeCorrect = Math.max(0, Math.min(safeTotal, correctCount));
  const percentage = Math.round((safeCorrect / safeTotal) * 100);
  const passingThreshold = computePassingScore(safeTotal, customPassingScore);
  return {
    percentage,
    isPassed: safeCorrect >= passingThreshold,
    passingThreshold,
  };
}
