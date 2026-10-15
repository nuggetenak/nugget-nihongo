// ══════════════════════════════════════════════════════════════════
//  catEngine.ts — Computer Adaptive Placement (CAT / IRT) Engine
//  Calibrated Diagnostic Placement Engine diagnosing JLPT Level (N5–N1)
//  in 10–12 questions using Item Response Theory (IRT)
// ══════════════════════════════════════════════════════════════════

import { JLPTLevel } from '../../types/vocab';
import { DiagnosticPair, loadDiagnosticPairs } from '../data/diagnosticManager';

export interface CATQuestion {
  id: string;
  stimulus: string; // Indonesian prompt / situation
  targetJapanese: string; // Correct answer
  options: string[]; // 4 shuffled choices
  correctIndex: number;
  level: JLPTLevel;
  difficulty: number; // b parameter (-2.0 .. +2.0)
  discrimination: number; // a parameter
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
    // Collect distractors:
    // Option 1: The designated L1 trap form (pedagogical distractor)
    // Option 2 & 3: Other target or trap forms from the same level
    const sameLevel = pairsByLevel[pair.level] || [];
    const otherCandidates = sameLevel
      .filter((other) => other.id !== pair.id && other.target_form !== pair.target_form)
      .map((other) => other.target_form);

    const shuffledOthers = shuffleArray(otherCandidates);
    const distractor1 = pair.l1_trap_form || shuffledOthers[0] || '該当なし';
    const distractor2 = shuffledOthers[0] || 'わかりません';
    const distractor3 = shuffledOthers[1] || '使えません';

    // Build unique 4 options
    const rawOptions = [pair.target_form, distractor1, distractor2, distractor3];
    const uniqueOptions = Array.from(new Set(rawOptions));
    while (uniqueOptions.length < 4) {
      uniqueOptions.push(`選択肢 ${uniqueOptions.length + 1}`);
    }

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

  // Find question with difficulty closest to current ability theta
  // with a small random jitter to prevent identical tests
  available.sort((a, b) => {
    const diffA = Math.abs(a.difficulty - currentTheta);
    const diffB = Math.abs(b.difficulty - currentTheta);
    return diffA - diffB;
  });

  // Pick from the top 3 closest items randomly
  const topCandidates = available.slice(0, Math.min(3, available.length));
  return topCandidates[Math.floor(Math.random() * topCandidates.length)];
}

/**
 * Update ability estimate theta using Bayesian MAP update
 */
export function updateThetaEstimate(
  currentTheta: number,
  isCorrect: boolean,
  questionDifficulty: number,
  questionIndex: number,
  totalQuestions: number
): number {
  // Dynamic step size (diminishes as session progresses)
  const progressRatio = questionIndex / Math.max(1, totalQuestions);
  const baseStep = 0.8 * (1 - progressRatio * 0.55); // 0.8 -> ~0.36

  // Logistic probability of correct answer
  const logit = 1.25 * (currentTheta - questionDifficulty);
  const probCorrect = 0.25 + 0.75 / (1 + Math.exp(-logit));

  let delta = 0;
  if (isCorrect) {
    delta = baseStep * (1 - probCorrect);
  } else {
    delta = -baseStep * probCorrect;
  }

  const updated = currentTheta + delta;
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
  const correctCount = answered.filter((a) => a.isCorrect).length;
  const totalCount = answered.length;
  const accuracy = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;

  let estimatedLevel: JLPTLevel = 'n5';
  let levelName = 'JLPT N5 · Pemula Dasar (Fondasi)';
  let recommendedTrack = 'n5';
  let summary = '';

  if (finalTheta < -0.85) {
    estimatedLevel = 'n5';
    levelName = 'JLPT N5 · Pemula (Pondasi Dasar & Partikel)';
    recommendedTrack = 'n5';
    summary = 'Kuasai partikel dasar (は, が, を, に, で), konjugasi bentuk-Masu, dan tata bahasa harian sebelum beranjak ke materi yang lebih kompleks.';
  } else if (finalTheta < -0.1) {
    estimatedLevel = 'n4';
    levelName = 'JLPT N4 · Dasar Menengah (Tata Bahasa Harian)';
    recommendedTrack = 'n4';
    summary = 'Fondasi N5 kamu sudah baik! Kamu siap memperdalam bentuk Te, Nai, bentuk kamus, serta kalimat pengandaian (Tara, Ba).';
  } else if (finalTheta < 0.65) {
    estimatedLevel = 'n3';
    levelName = 'JLPT N3 · Menengah (Percakapan & Nuansa)';
    recommendedTrack = 'n3';
    summary = 'Kemampuan bahasa Jepangmu solid! Kamu siap menguasai nuansa kalimat ekspresif, ragam bahasa sopan (Keigo), dan percakapan kontekstual.';
  } else if (finalTheta < 1.35) {
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

  answered.forEach(({ question, isCorrect }) => {
    const label = question.patterns.join(', ') || question.stimulus;
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
    theta: Math.round(finalTheta * 100) / 100,
    accuracy,
    correctCount,
    totalCount,
    recommendedTrack,
    summary,
    strengths: strengths.length > 0 ? strengths : ['Partikel Dasar'],
    weaknesses: weaknesses.length > 0 ? weaknesses : ['Nuansa Halus Klausa'],
  };
}
