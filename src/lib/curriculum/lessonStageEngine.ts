// ══════════════════════════════════════════════════════════════════
//  lessonStageEngine.ts — Pure Stage Progression & Anti-Exploit Engine
//  Encapsulates 4-Stage Study Lifecycles, Anti-Skip Locks & Scoring Math
// ══════════════════════════════════════════════════════════════════

export type LessonStageId = 'dialogue' | 'explanation' | 'drills' | 'cando';

export interface LessonStageDefinition {
  id: LessonStageId;
  order: number;
  label: string;
  shortLabel: string;
  progressPercent: number;
  description: string;
}

export const LESSON_PASSING_THRESHOLD = 80;

export const LESSON_STAGES: readonly LessonStageDefinition[] = [
  {
    id: 'dialogue',
    order: 1,
    label: '1. Dialog Otentik',
    shortLabel: '1. Dialog',
    progressPercent: 25,
    description: 'Percakapan bimodal alami dan konteks situasi dunia nyata',
  },
  {
    id: 'explanation',
    order: 2,
    label: '2. Bedah Materi & Pola',
    shortLabel: '2. Bedah Materi',
    progressPercent: 50,
    description: 'Analisis 3 pilar: tata bahasa, kosakata/pitch accent, dan jebakan umum',
  },
  {
    id: 'drills',
    order: 3,
    label: '3. Cek Pemahaman',
    shortLabel: '3. Cek Pemahaman',
    progressPercent: 75,
    description: 'Tangga progresif 5 langkah dengan umpan balik diagnostik instan',
  },
  {
    id: 'cando',
    order: 4,
    label: '4. Tantangan Nyata',
    shortLabel: '4. Tantangan Nyata',
    progressPercent: 100,
    description: 'Tantangan Can-Do komunikatif, ringkasan saku, dan integrasi FSRS',
  },
] as const;

/**
 * Cek apakah Tahap 4 (Can-Do) terkunci untuk pengguna.
 * Aturan anti-eksploit: terkunci jika pelajaran BELUM tuntas sebelumnya DAN skor latihan null atau < 80.
 */
export function isStage4Locked(drillScore: number | null | undefined, isLessonDone: boolean): boolean {
  if (isLessonDone) return false;
  if (drillScore === null || drillScore === undefined || Number.isNaN(drillScore)) return true;
  return drillScore < LESSON_PASSING_THRESHOLD;
}

/**
 * Validasi apakah transisi dari currentStage ke targetStage diizinkan.
 */
export function canNavigateToStage(
  targetStage: LessonStageId,
  currentStage: LessonStageId,
  drillScore: number | null | undefined,
  isLessonDone: boolean
): { allowed: boolean; reason?: string } {
  if (targetStage === currentStage) {
    return { allowed: true };
  }

  // Jika target adalah Can-Do, terapkan guard anti-eksploit
  if (targetStage === 'cando') {
    const locked = isStage4Locked(drillScore, isLessonDone);
    if (locked) {
      return {
        allowed: false,
        reason: 'Tahap 4 Terkunci: Selesaikan Cek Pemahaman (Tahap 3) dengan skor minimal 80% untuk membuka Tantangan Nyata!',
      };
    }
  }

  // Tahap 1, 2, 3 bebas diakses kembali kapan saja untuk peninjauan
  return { allowed: true };
}

/**
 * Tentukan tahap berikutnya yang valid dalam alur 4 tahap.
 */
export function getNextStage(
  currentStage: LessonStageId,
  drillScore: number | null | undefined,
  isLessonDone: boolean
): LessonStageId | null {
  switch (currentStage) {
    case 'dialogue':
      return 'explanation';
    case 'explanation':
      return 'drills';
    case 'drills':
      return !isStage4Locked(drillScore, isLessonDone) ? 'cando' : null;
    case 'cando':
      return null;
    default:
      return null;
  }
}

/**
 * Tentukan tahap sebelumnya dalam alur 4 tahap.
 */
export function getPreviousStage(currentStage: LessonStageId): LessonStageId | null {
  switch (currentStage) {
    case 'cando':
      return 'drills';
    case 'drills':
      return 'explanation';
    case 'explanation':
      return 'dialogue';
    case 'dialogue':
      return null;
    default:
      return null;
  }
}

/**
 * Hitung skor persentase Cek Pemahaman (Micro-Drill) secara aman.
 * Menjamin pertahanan terhadap pembagian nol, NaN, dan pembulatan akurat [0, 100].
 */
export function calculateDrillScore(totalDrills: number, correctFirstAttempt: number): number {
  if (!Number.isFinite(totalDrills) || totalDrills <= 0) {
    return 100; // Jika tidak ada soal, otomatis dianggap 100% tuntas
  }
  if (!Number.isFinite(correctFirstAttempt) || correctFirstAttempt <= 0) {
    return 0;
  }
  const ratio = Math.min(correctFirstAttempt / totalDrills, 1.0);
  return Math.max(0, Math.min(100, Math.round(ratio * 100)));
}

/**
 * Ambil metadata dan progres persentase tahap.
 */
export function getStageMetadata(stageId: LessonStageId): LessonStageDefinition {
  const found = LESSON_STAGES.find((s) => s.id === stageId);
  return found || LESSON_STAGES[0];
}

/**
 * Format string badge kelulusan pelajaran.
 */
export function formatCompletionBadgeText(drillScore: number | null | undefined): string {
  const score = drillScore !== null && drillScore !== undefined && !Number.isNaN(drillScore)
    ? Math.max(0, Math.min(100, Math.round(drillScore)))
    : 100;
  return `Tuntas (${score}%)`;
}
