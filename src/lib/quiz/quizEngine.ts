// ══════════════════════════════════════════════════════════════════
//  quizEngine.ts — Nugget Nihongo Quiz Generation Engine
//  Generates 7 distinct pedagogical drill types from real DB data
//  Research basis: FSRS v4 + Error-tolerant encouraging feedback
// ══════════════════════════════════════════════════════════════════

import { JLPTLevel } from '../../types/vocab';
import { QuizMode } from '../../types/quiz';
import { NormalizedVocab, NormalizedGrammar } from '../data/dataManager';
import { conjugate, FORMS } from '../grammar/conjugation';

export interface QuizQuestionItem {
  id: string;
  mode: QuizMode;
  prompt: string;
  targetItem: NormalizedVocab | NormalizedGrammar;
  questionText: string;
  subText?: string;
  correctAnswer: string;
  options?: string[]; // for multiple choice
  tokens?: string[];  // for rearrange
  explanation: string;
  level: JLPTLevel;
}

// Utility to shuffle array
export function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Generate 3 smart distractors from a vocab pool
 */
function getVocabDistractors(correctItem: NormalizedVocab, pool: NormalizedVocab[], count = 3): string[] {
  const filtered = pool.filter((v) => v.id !== correctItem.id && v.meaning !== correctItem.meaning);
  const shuffled = shuffle(filtered);
  const distractors: string[] = [];
  for (const item of shuffled) {
    if (!distractors.includes(item.meaning)) {
      distractors.push(item.meaning);
    }
    if (distractors.length >= count) break;
  }
  // Fallbacks if pool is small
  const fallbacks = ['bertemu', 'makan', 'pergi', 'melihat', 'membaca', 'menulis', 'mendengar'];
  while (distractors.length < count) {
    for (const fb of fallbacks) {
      if (fb !== correctItem.meaning && !distractors.includes(fb)) {
        distractors.push(fb);
        if (distractors.length >= count) break;
      }
    }
    break;
  }
  return distractors;
}

/**
 * Generate a complete set of quiz questions for any selected mode
 */
export function generateQuizQuestions(
  mode: QuizMode,
  vocabPool: NormalizedVocab[],
  grammarPool: NormalizedGrammar[],
  level: JLPTLevel,
  count = 10
): QuizQuestionItem[] {
  const questions: QuizQuestionItem[] = [];

  if (mode === 'flashcard') {
    const shuffledVocab = shuffle(vocabPool);
    const selected = shuffledVocab.slice(0, count);
    for (const v of selected) {
      questions.push({
        id: `fc-${v.id}-${Date.now()}`,
        mode: 'flashcard',
        prompt: 'Ingat arti kata ini?',
        targetItem: v,
        questionText: v.word,
        subText: v.reading !== v.word ? v.reading : undefined,
        correctAnswer: v.meaning,
        explanation: v.nuance || `Arti: ${v.meaning}. Contoh: ${v.examples[0]?.jp || '-'}`,
        level,
      });
    }
    return questions;
  }

  if (mode === 'multiple-choice') {
    const shuffledVocab = shuffle(vocabPool);
    const selected = shuffledVocab.slice(0, count);
    for (const v of selected) {
      const distractors = getVocabDistractors(v, vocabPool, 3);
      const options = shuffle([v.meaning, ...distractors]);
      questions.push({
        id: `mc-${v.id}-${Date.now()}`,
        mode: 'multiple-choice',
        prompt: 'Pilihlah arti yang paling tepat:',
        targetItem: v,
        questionText: v.word,
        subText: v.reading !== v.word ? `【${v.reading}】` : undefined,
        correctAnswer: v.meaning,
        options,
        explanation: `Kata "${v.word}" (${v.reading}) berarti "${v.meaning}".`,
        level,
      });
    }
    return questions;
  }

  if (mode === 'conjugation') {
    // Find verbs from vocab pool
    const verbs = vocabPool.filter((v) => v.pos.includes('verb') || /[うくぐすつぬぶむる]$/.test(v.word));
    const targetForms: Array<{ key: string; label: string }> = [
      { key: 'te', label: 'Bentuk Te (て形)' },
      { key: 'nai', label: 'Bentuk Negatif Lampau/Kini (ない形)' },
      { key: 'ta', label: 'Bentuk Lampau Biasa (た形)' },
      { key: 'masu', label: 'Bentuk Sopan Present (ます形)' },
      { key: 'potential', label: 'Bentuk Potensial (可能形)' },
      { key: 'ba', label: 'Bentuk Pengandaian (ば形)' },
    ];

    const shuffledVerbs = shuffle(verbs.length > 0 ? verbs : vocabPool);
    for (const v of shuffledVerbs) {
      if (questions.length >= count) break;
      const formSpec = targetForms[Math.floor(Math.random() * targetForms.length)];
      const conjugated = conjugate(v.word, formSpec.key);
      if (conjugated && conjugated !== v.word) {
        // Generate choices
        const wrong1 = conjugate(v.word, formSpec.key === 'te' ? 'ta' : 'te') || v.word + 'ない';
        const wrong2 = conjugate(v.word, 'masu') || v.word + 'ます';
        const wrong3 = v.word + 'る';
        const rawOptions = [conjugated, wrong1, wrong2, wrong3].filter((x, idx, a) => a.indexOf(x) === idx);
        while (rawOptions.length < 4) rawOptions.push(conjugated + 'よ');
        const options = shuffle(rawOptions.slice(0, 4));

        questions.push({
          id: `conj-${v.id}-${formSpec.key}`,
          mode: 'conjugation',
          prompt: `Ubahlah ke dalam ${formSpec.label}:`,
          targetItem: v,
          questionText: v.word,
          subText: `Arti: ${v.meaning}`,
          correctAnswer: conjugated,
          options,
          explanation: `Bentuk ${formSpec.label} dari ${v.word} adalah "${conjugated}".`,
          level,
        });
      }
    }
    return questions;
  }

  if (mode === 'rearrange') {
    // Use examples from grammar or vocab with length between 12 and 40 chars
    const candidates: Array<{ jp: string; id: string; target: NormalizedVocab | NormalizedGrammar }> = [];
    for (const g of grammarPool) {
      for (const ex of g.examples) {
        if (ex.jp.length >= 10 && ex.jp.length <= 40) {
          candidates.push({ jp: ex.jp.replace(/<[^>]*>/g, ''), id: ex.id, target: g });
        }
      }
    }
    for (const v of vocabPool) {
      for (const ex of v.examples) {
        if (ex.jp.length >= 10 && ex.jp.length <= 40) {
          candidates.push({ jp: ex.jp.replace(/<[^>]*>/g, ''), id: ex.id, target: v });
        }
      }
    }

    const shuffledCandidates = shuffle(candidates).slice(0, count);
    for (const c of shuffledCandidates) {
      // Split into 4-6 meaningful chunks
      const tokens = splitIntoTokens(c.jp);
      if (tokens.length >= 3) {
        questions.push({
          id: `rearr-${Date.now()}-${Math.random()}`,
          mode: 'rearrange',
          prompt: 'Susunlah kata-kata berikut agar sesuai dengan artinya:',
          targetItem: c.target,
          questionText: c.id, // prompt is the Indonesian meaning
          subText: 'Ketuk potongan kata secara berurutan',
          correctAnswer: c.jp,
          tokens: shuffle(tokens),
          explanation: `Kalimat yang benar: "${c.jp}" (${c.id})`,
          level,
        });
      }
    }
    return questions;
  }

  if (mode === 'fill-in') {
    // Extract particles or keywords from example sentences
    const candidates: Array<{ jp: string; id: string; target: NormalizedVocab | NormalizedGrammar }> = [];
    for (const g of grammarPool) {
      for (const ex of g.examples) {
        candidates.push({ jp: ex.jp.replace(/<[^>]*>/g, ''), id: ex.id, target: g });
      }
    }

    const shuffled = shuffle(candidates).slice(0, count);
    for (const c of shuffled) {
      // Find a particle (は, が, を, に, で, へ, と, も, から, まで)
      const particleMatch = c.jp.match(/(は|が|を|に|で|へ|と|も|から|まで)/);
      if (particleMatch && particleMatch.index !== undefined) {
        const p = particleMatch[0];
        const blanked = c.jp.slice(0, particleMatch.index) + ' [ ? ] ' + c.jp.slice(particleMatch.index + p.length);
        const particlePool = ['は', 'が', 'を', 'に', 'で', 'へ', 'と', 'も'];
        const otherParticles = particlePool.filter((x) => x !== p);
        const options = shuffle([p, ...shuffle(otherParticles).slice(0, 3)]);

        questions.push({
          id: `fill-${Date.now()}-${Math.random()}`,
          mode: 'fill-in',
          prompt: 'Pilihlah partikel yang tepat untuk melengkapi kalimat:',
          targetItem: c.target,
          questionText: blanked,
          subText: `Arti: "${c.id}"`,
          correctAnswer: p,
          options,
          explanation: `Partikel yang tepat adalah "${p}". Kalimat lengkap: "${c.jp}".`,
          level,
        });
      }
    }
    return questions;
  }

  // Translation & Error Find fallbacks
  const shuffledVocab = shuffle(vocabPool).slice(0, count);
  for (const v of shuffledVocab) {
    const distractors = getVocabDistractors(v, vocabPool, 3);
    const options = shuffle([v.meaning, ...distractors]);
    questions.push({
      id: `trans-${v.id}`,
      mode,
      prompt: mode === 'translation' ? 'Terjemahkan kata berikut ke bahasa Indonesia:' : 'Temukan terjemahan yang benar:',
      targetItem: v,
      questionText: v.word,
      subText: v.reading,
      correctAnswer: v.meaning,
      options,
      explanation: `"${v.word}" (${v.reading}) berarti "${v.meaning}".`,
      level,
    });
  }
  return questions;
}

/**
 * Split sentence into natural Japanese phrase chunks
 */
function splitIntoTokens(sentence: string): string[] {
  // Simple token splitter using particles and punctuation boundaries
  const parts = sentence.split(/(?<=[はがをにでへと、。！？])/g).filter(Boolean);
  if (parts.length >= 3 && parts.length <= 6) {
    return parts;
  }
  // Fallback: chunk by 2-4 chars
  const chunks: string[] = [];
  let i = 0;
  while (i < sentence.length) {
    const len = Math.min(3, sentence.length - i);
    chunks.push(sentence.slice(i, i + len));
    i += len;
  }
  return chunks;
}
