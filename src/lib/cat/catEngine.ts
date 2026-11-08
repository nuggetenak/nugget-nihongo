// ══════════════════════════════════════════════════════════════════
//  catEngine.ts — Computer Adaptive Placement (CAT / IRT) Engine
//  Calibrated Diagnostic Placement Engine diagnosing JLPT Level (N5–N1)
//  in 10–12 questions using Item Response Theory (IRT)
// ══════════════════════════════════════════════════════════════════

import type { JLPTLevel } from '../../types/vocab.ts';
import type { DiagnosticPair } from '../data/diagnosticManager.ts';
import { loadDiagnosticPairs } from '../data/diagnosticManager.ts';
export type { CATQuestionItem } from '../../types/cat.ts';

export interface CATQuestion {
  id: string;
  stimulus: string; // Indonesian prompt / situation
  targetJapanese: string; // Correct answer
  options: string[]; // 4 shuffled choices
  correctIndex: number;
  level: JLPTLevel;
  difficulty: number; // b parameter (-2.0 .. +2.0)
  discrimination: number; // a parameter
  guessing?: number; // c parameter (pseudo-guessing, default 0.25)
  explanation: string;
  patterns: string[];
  rootCause: string;
}

export interface CATSessionState {
  currentQuestionIndex: number;
  totalQuestions: number;
  currentTheta: number; // estimated ability
  answeredQuestions: Array<{
    question: CATQuestion;
    selectedOption: number;
    isCorrect: boolean;
  }>;
  isComplete: boolean;
  result?: CATResult;
}

export interface CATResult {
  estimatedLevel: JLPTLevel;
  levelName: string;
  theta: number; // ability parameter
  sem: number; // standard error of measurement
  accuracy: number; // percentage
  correctCount: number;
  totalCount: number;
  recommendedTrack: string;
  summary: string;
  strengths: string[];
  weaknesses: string[];
}

// Convert level + fsrs_difficulty to IRT difficulty parameter b
function calculateDifficultyB(level: JLPTLevel, fsrsDifficulty: number): number {
  let baseB = 0;
  switch (level) {
    case 'n5':
      baseB = -1.4;
      break;
    case 'n4':
      baseB = -0.6;
      break;
    case 'n3':
      baseB = 0.1;
      break;
    case 'n2':
      baseB = 0.85;
      break;
    case 'n1':
      baseB = 1.55;
      break;
    default:
      baseB = 0;
  }
  // Fine-tune with fsrs_difficulty (typically 4.0 - 9.0)
  const normalizedFsrs = ((fsrsDifficulty || 6.5) - 6.5) * 0.1;
  return Math.max(-2.2, Math.min(2.2, baseB + normalizedFsrs));
}

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Prepare question bank from loaded diagnostic pairs
export async function buildCATQuestionPool(): Promise<CATQuestion[]> {
  const pairs = await loadDiagnosticPairs();
  if (!pairs || pairs.length === 0) {
    return [];
  }

  // Group by level to extract realistic distractors
  const pairsByLevel: Record<string, DiagnosticPair[]> = {};
  pairs.forEach((p) => {
    if (!pairsByLevel[p.level]) pairsByLevel[p.level] = [];
    pairsByLevel[p.level].push(p);
  });

  const pool: CATQuestion[] = [];

  pairs.forEach((pair) => {
    // Robust 4-option distractor generation:
    // 1. Target form (correct answer)
    // 2. Pedagogical distractor (designated L1 trap form)
    // 3. Same-level candidate target forms
    // 4. Fallback same-level trap forms or global candidates (zero synthetic placeholders)
    const sameLevel = pairsByLevel[pair.level] || [];
    const otherCandidates = sameLevel
      .filter((other) => other.id !== pair.id && other.target_form !== pair.target_form)
      .map((other) => other.target_form);

    const shuffledOthers = shuffleArray(otherCandidates);
    const chosenOptions = new Set<string>();
    chosenOptions.add(pair.target_form);

    // Pedagogical distractor: designated L1 trap form if distinct from target
    if (pair.l1_trap_form && pair.l1_trap_form.trim() !== '' && pair.l1_trap_form !== pair.target_form) {
      chosenOptions.add(pair.l1_trap_form);
    }

    // Secondary candidates: other target forms from same level
    for (const other of shuffledOthers) {
      if (chosenOptions.size >= 4) break;
      if (other && !chosenOptions.has(other)) {
        chosenOptions.add(other);
      }
    }

    // Tertiary candidates: other trap forms from same level
    if (chosenOptions.size < 4) {
      const otherTraps = shuffleArray(
        sameLevel
          .filter((other) => other.id !== pair.id && other.l1_trap_form)
          .map((other) => other.l1_trap_form as string)
      );
      for (const trap of otherTraps) {
        if (chosenOptions.size >= 4) break;
        if (trap && !chosenOptions.has(trap)) {
          chosenOptions.add(trap);
        }
      }
    }

    // Global pool fallback: candidates from other levels
    if (chosenOptions.size < 4) {
      const allOtherCandidates = shuffleArray(
        pairs
          .filter((other) => other.id !== pair.id)
          .map((other) => other.target_form)
      );
      for (const cand of allOtherCandidates) {
        if (chosenOptions.size >= 4) break;
        if (cand && !chosenOptions.has(cand)) {
          chosenOptions.add(cand);
        }
      }
    }

    // Final grammatical fallback
    const fallbackDistractors = ['該当なし', 'わかりません', '使えません', '文法的に不適切'];
    for (const fb of fallbackDistractors) {
      if (chosenOptions.size >= 4) break;
      if (!chosenOptions.has(fb)) {
        chosenOptions.add(fb);
      }
    }

    const uniqueOptions = Array.from(chosenOptions);
    const shuffled = shuffleArray(uniqueOptions.slice(0, 4));
    const correctIndex = shuffled.indexOf(pair.target_form);

    pool.push({
      id: pair.id,
      stimulus: pair.stimulus_l1 || pair.title,
      targetJapanese: pair.target_form,
      options: shuffled,
      correctIndex: correctIndex !== -1 ? correctIndex : 0,
      level: pair.level,
      difficulty: calculateDifficultyB(pair.level, pair.fsrs_difficulty),
      discrimination: 1.25,
      explanation: `${pair.root_cause} ${pair.prescription || ''}`,
      patterns: pair.patterns || [],
      rootCause: pair.root_cause || '',
    });
  });

  return pool;
}

/**
 * 3-Parameter Logistic (3PL) Item Response Function:
 * P(theta) = c + (1 - c) / (1 + exp(-logit))
 * logit = a * (theta - b)
 *
 * Numerically clamped on logit in [-20, 20] to prevent exp overflow/underflow.
 */
export function calculate3PLProbability(
  theta: number,
  difficulty: number,
  discrimination = 1.25,
  guessing = 0.25
): number {
  const safeTheta = Number.isFinite(theta) ? theta : 0;
  const safeB = Number.isFinite(difficulty) ? difficulty : 0;
  const safeA = Number.isFinite(discrimination) && discrimination > 0 ? discrimination : 1.25;
  const safeC = Number.isFinite(guessing) && guessing >= 0 && guessing < 1 ? guessing : 0.25;

  const logit = Math.max(-20, Math.min(20, safeA * (safeTheta - safeB)));
  const pStar = 1 / (1 + Math.exp(-logit));
  const p = safeC + (1 - safeC) * pStar;
  return Math.min(0.9999, Math.max(safeC, p));
}

/**
 * Maps continuous latent ability parameter theta to JLPT level category.
 * Thresholds:
 * theta < -0.85: N5
 * -0.85 <= theta < -0.10: N4
 * -0.10 <= theta < 0.65: N3
 * 0.65 <= theta < 1.35: N2
 * theta >= 1.35: N1
 */
export function mapThetaToJLPTLevel(theta: number): JLPTLevel {
  const safeTheta = Number.isFinite(theta) ? theta : -1.0;
  if (safeTheta < -0.85) return 'n5';
  if (safeTheta < -0.1) return 'n4';
  if (safeTheta < 0.65) return 'n3';
  if (safeTheta < 1.35) return 'n2';
  return 'n1';
}

export interface CATLevelBridgeRecommendation {
  jlptLevel: JLPTLevel;
  jftLevel: 'jft-a1' | 'jft-a2' | 'b1-proficient';
  sswReadiness: 'belum-siap' | 'siap-ujian-a2' | 'sangat-siap' | 'tingkat-supervisor';
  recommendedTrack: string;
  description: string;
}

/**
 * Bridges CAT latent ability estimates to JLPT, JFT-Basic A1/A2, and SSW 19-sector tracks.
 */
export function bridgeCATResultToCurriculum(
  theta: number,
  primaryGoal: 'jlpt' | 'jft' | 'ssw' = 'jlpt',
  sswSector?: string
): CATLevelBridgeRecommendation {
  const safeTheta = Number.isFinite(theta) ? theta : -1.0;
  const jlptLevel = mapThetaToJLPTLevel(safeTheta);

  let jftLevel: 'jft-a1' | 'jft-a2' | 'b1-proficient' = 'jft-a1';
  let sswReadiness: 'belum-siap' | 'siap-ujian-a2' | 'sangat-siap' | 'tingkat-supervisor' = 'belum-siap';
  let recommendedTrack = jlptLevel as string;
  let description = '';

  if (safeTheta < -0.85) {
    jftLevel = 'jft-a1';
    sswReadiness = 'belum-siap';
    recommendedTrack = primaryGoal === 'jft' ? 'jft-a1' : 'n5';
    description = 'Perkuat kosakata dasar, partikel, dan pola kalimat harian A1 sebelum mengambil ujian SSW.';
  } else if (safeTheta < -0.1) {
    jftLevel = 'jft-a2';
    sswReadiness = 'siap-ujian-a2';
    recommendedTrack = primaryGoal === 'ssw' && sswSector ? `ssw-${sswSector}` : primaryGoal === 'jft' ? 'jft-a2' : 'n4';
    description = 'Kemampuan setara JFT-Basic A2! Kamu memenuhi syarat dasar kelulusan Tokutei Ginou SSW.';
  } else if (safeTheta < 0.65) {
    jftLevel = 'b1-proficient';
    sswReadiness = 'sangat-siap';
    recommendedTrack = primaryGoal === 'ssw' && sswSector ? `ssw-${sswSector}` : 'n3';
    description = 'Kemampuan setara N3/B1! Sangat siap untuk komunikasi lancar di tempat kerja (Gemba).';
  } else if (safeTheta < 1.35) {
    jftLevel = 'b1-proficient';
    sswReadiness = 'tingkat-supervisor';
    recommendedTrack = 'n2';
    description = 'Kemampuan tingkat N2! Siap memimpin tim kerja, membaca manual teknis, dan komunikasi bisnis formal.';
  } else {
    jftLevel = 'b1-proficient';
    sswReadiness = 'tingkat-supervisor';
    recommendedTrack = 'n1';
    description = 'Kemahiran mendekati penutur asli! Menguasai ekspresi kompleks dan dokumen regulasi resmi.';
  }

  return {
    jlptLevel,
    jftLevel,
    sswReadiness,
    recommendedTrack,
    description,
  };
}

/**
 * 3PL Item Response Theory (IRT) Item Fisher Information:
 * I_i(theta) = a_i^2 * ((P_i(theta) - c_i)^2 / (1 - c_i)^2) * ((1 - P_i(theta)) / P_i(theta))
 *
 * For a 4-option multiple-choice question, c_i = 0.25 (guessing parameter).
 */
export function calculateFisherInformation(
  question: Pick<CATQuestion, 'difficulty'> & { discrimination?: number; guessing?: number },
  theta: number
): number {
  if (!question) return 0.0001;
  const safeTheta = Number.isFinite(theta) ? theta : 0;
  const a = Number.isFinite(question.discrimination) && (question.discrimination ?? 0) > 0 ? (question.discrimination as number) : 1.25;
  const b = Number.isFinite(question.difficulty) ? question.difficulty : 0;
  const c = Number.isFinite(question.guessing) && (question.guessing ?? 0) >= 0 && (question.guessing ?? 0) < 1 ? (question.guessing as number) : 0.25;

  const logit = Math.max(-20, Math.min(20, a * (safeTheta - b)));
  const pStar = 1 / (1 + Math.exp(-logit));
  const p = c + (1 - c) * pStar;

  if (p <= 0.0001 || p >= 0.9999) return 0.0001;

  const pMinusC = p - c;
  const oneMinusC = 1 - c;
  const info = (a * a) * ((pMinusC * pMinusC) / (oneMinusC * oneMinusC)) * ((1 - p) / p);
  return Number.isFinite(info) ? Math.max(0.0001, info) : 0.0001;
}

/**
 * Standard Error of Measurement (SEM):
 * SEM(theta) = 1 / sqrt(I_prior + sum_{i=1}^n I_i(theta))
 *
 * Prior information: standard normal prior N(0, 1) has Fisher Information = 1.0.
 */
export function calculateCATSEM(
  answeredItems: Array<
    | { question: Pick<CATQuestion, 'difficulty'> & { discrimination?: number; guessing?: number } }
    | (Pick<CATQuestion, 'difficulty'> & { discrimination?: number; guessing?: number })
  >,
  theta: number
): number {
  let totalInformation = 1.0; // Standard normal prior (sigma_0 = 1.0)
  if (Array.isArray(answeredItems)) {
    for (const item of answeredItems) {
      const q = item && 'question' in item ? item.question : item;
      if (q) {
        totalInformation += calculateFisherInformation(q, theta);
      }
    }
  }
  return 1 / Math.sqrt(totalInformation);
}

export const CAT_TARGET_SEM = 0.35;
export const CAT_MIN_QUESTIONS = 6;
export const CAT_MAX_QUESTIONS = 12;

/**
 * CAT dynamic stopping criterion:
 * Stops when standard error of measurement SEM <= 0.35 after at least 6 questions,
 * or when maximum test length (12 questions) is reached.
 */
export function shouldStopCAT(
  answeredCount: number,
  sem: number,
  minQuestions: number = CAT_MIN_QUESTIONS,
  maxQuestions: number = CAT_MAX_QUESTIONS
): boolean {
  const safeCount = Number.isFinite(answeredCount) ? answeredCount : 0;
  const safeSem = Number.isFinite(sem) ? sem : 999.0;
  if (safeCount >= maxQuestions) return true;
  if (safeCount >= minQuestions && safeSem <= CAT_TARGET_SEM) return true;
  return false;
}

/**
 * Select the best next question that maximizes Fisher Information
 * at the current estimated ability theta
 */
export function selectNextCATQuestion(
  pool: CATQuestion[],
  usedQuestionIds: Set<string>,
  currentTheta: number
): CATQuestion | null {
  const available = pool.filter((q) => !usedQuestionIds.has(q.id));
  if (available.length === 0) return null;

  // Rank available questions by Fisher Information at current theta estimate
  const scored = available.map((q) => ({
    question: q,
    info: calculateFisherInformation(q, currentTheta),
  }));

  scored.sort((a, b) => b.info - a.info);

  // Pick from the top 3 highest information items with slight randomization for test variety
  const topCandidates = scored.slice(0, Math.min(3, scored.length));
  return topCandidates[Math.floor(Math.random() * topCandidates.length)].question;
}

/**
 * Update ability estimate theta using Bayesian MAP update
 */
export function updateThetaEstimate(
  currentTheta: number,
  isCorrect: boolean,
  questionDifficulty: number,
  questionIndex: number,
  totalQuestions: number,
  discrimination = 1.25,
  guessing = 0.25
): number {
  const safeTheta = Number.isFinite(currentTheta) ? currentTheta : 0;
  const safeDifficulty = Number.isFinite(questionDifficulty) ? questionDifficulty : 0;
  const safeIndex = Number.isFinite(questionIndex) && questionIndex >= 0 ? questionIndex : 0;
  const safeTotal = Number.isFinite(totalQuestions) && totalQuestions > 0 ? totalQuestions : 12;
  const safeDiscrim = Number.isFinite(discrimination) && discrimination > 0 ? discrimination : 1.25;
  const safeGuessing = Number.isFinite(guessing) && guessing >= 0 && guessing < 1 ? guessing : 0.25;

  // Dynamic step size (diminishes as session progresses)
  const progressRatio = safeIndex / Math.max(1, safeTotal);
  const baseStep = 0.8 * (1 - progressRatio * 0.55); // 0.8 -> ~0.36

  // Logistic probability of correct answer
  const logit = Math.max(-20, Math.min(20, safeDiscrim * (safeTheta - safeDifficulty)));
  const probCorrect = safeGuessing + (1 - safeGuessing) / (1 + Math.exp(-logit));

  let delta = 0;
  if (isCorrect) {
    delta = baseStep * (1 - probCorrect);
  } else {
    delta = -baseStep * probCorrect;
  }

  const updated = safeTheta + delta;
  // Clamp between -2.2 and +2.2
  return Math.max(-2.2, Math.min(2.2, updated));
}

/**
 * Compute final diagnostic placement result
 */
export function finalizeCATResult(
  answered: Array<{ question: CATQuestion; isCorrect: boolean }>,
  finalTheta: number
): CATResult {
  const safeAnswered = Array.isArray(answered) ? answered : [];
  const correctCount = safeAnswered.filter((a) => a && a.isCorrect).length;
  const totalCount = safeAnswered.length;
  const accuracy = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
  const safeTheta = Number.isFinite(finalTheta)
    ? finalTheta
    : totalCount > 0 && accuracy >= 80
      ? 1.0
      : totalCount > 0 && accuracy >= 50
        ? 0.0
        : -1.2;
  const sem = Math.round(calculateCATSEM(safeAnswered, safeTheta) * 1000) / 1000;

  let estimatedLevel: JLPTLevel = 'n5';
  let levelName = 'JLPT N5 · Pemula Dasar (Fondasi)';
  let recommendedTrack = 'n5';
  let summary = '';

  if (safeTheta < -0.85) {
    estimatedLevel = 'n5';
    levelName = 'JLPT N5 · Pemula (Pondasi Dasar & Partikel)';
    recommendedTrack = 'n5';
    summary = 'Kuasai partikel dasar (は, が, を, に, で), konjugasi bentuk-Masu, dan tata bahasa harian sebelum beranjak ke materi yang lebih kompleks.';
  } else if (safeTheta < -0.1) {
    estimatedLevel = 'n4';
    levelName = 'JLPT N4 · Dasar Menengah (Tata Bahasa Harian)';
    recommendedTrack = 'n4';
    summary = 'Fondasi N5 kamu sudah baik! Kamu siap memperdalam bentuk Te, Nai, bentuk kamus, serta kalimat pengandaian (Tara, Ba).';
  } else if (safeTheta < 0.65) {
    estimatedLevel = 'n3';
    levelName = 'JLPT N3 · Menengah (Percakapan & Nuansa)';
    recommendedTrack = 'n3';
    summary = 'Kemampuan bahasa Jepangmu solid! Kamu siap menguasai nuansa kalimat ekspresif, ragam bahasa sopan (Keigo), dan percakapan kontekstual.';
  } else if (safeTheta < 1.35) {
    estimatedLevel = 'n2';
    levelName = 'JLPT N2 · Menengah Atas (Teks & Kerja)';
    recommendedTrack = 'n2';
    summary = 'Tingkat kemahiranmu tinggi! Kamu mampu memahami artikel, berita, serta pola ekspresi formal dan idiomatis.';
  } else {
    estimatedLevel = 'n1';
    levelName = 'JLPT N1 · Mahir & Lanjut (Ekspresi Alami)';
    recommendedTrack = 'n1';
    summary = 'Kemahiranmu luar biasa! Kamu menguasai struktur bacaan tingkat lanjut, dokumen resmi, dan beragam nuansa ekspresi penutur asli.';
  }

  // Extract strengths and areas of focus
  const strengths: string[] = [];
  const weaknesses: string[] = [];

  safeAnswered.forEach((entry) => {
    if (!entry || !entry.question) return;
    const { question, isCorrect } = entry;
    const label = (question.patterns && question.patterns.join(', ')) || question.stimulus || 'Tata Bahasa';
    if (isCorrect) {
      if (!strengths.includes(label) && strengths.length < 3) {
        strengths.push(label);
      }
    } else {
      if (!weaknesses.includes(label) && weaknesses.length < 3) {
        weaknesses.push(label);
      }
    }
  });

  return {
    estimatedLevel,
    levelName,
    theta: Math.round(safeTheta * 100) / 100,
    sem,
    accuracy,
    correctCount,
    totalCount,
    recommendedTrack,
    summary,
    strengths: strengths.length > 0 ? strengths : ['Partikel Dasar'],
    weaknesses: weaknesses.length > 0 ? weaknesses : ['Nuansa Halus Klausa'],
  };
}
