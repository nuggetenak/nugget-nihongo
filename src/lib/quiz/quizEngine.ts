// ══════════════════════════════════════════════════════════════════
//  quizEngine.ts — Nugget Nihongo Quiz Generation Engine
//  Generates 7 distinct pedagogical drill types from real DB data
//  Research basis: FSRS v4 + Error-tolerant encouraging feedback
// ══════════════════════════════════════════════════════════════════

import { JLPTLevel } from '../../types/vocab';
import { QuizMode } from '../../types/quiz';
import { NormalizedVocab, NormalizedGrammar } from '../data/dataManager';
import { conjugate, FORMS } from '../grammar/conjugation';
import { FSRSCard } from '../../types/fsrs';
import { DiagnosticPair } from '../data/diagnosticManager';

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

  if (mode === 'listening') {
    const shuffledVocab = shuffle(vocabPool);
    const selected = shuffledVocab.slice(0, count);
    for (const v of selected) {
      const distractors = getVocabDistractors(v, vocabPool, 3);
      const options = shuffle([v.meaning, ...distractors]);
      questions.push({
        id: `list-${v.id}-${Date.now()}`,
        mode: 'listening',
        prompt: 'Dengarkan pelafalan audio lalu pilih arti yang tepat:',
        targetItem: v,
        questionText: v.word,
        subText: v.reading !== v.word ? v.reading : undefined,
        correctAnswer: v.meaning,
        options,
        explanation: `Audio menyebutkan "${v.word}" (${v.reading}) yang berarti "${v.meaning}".`,
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

  if (mode === 'translation') {
    // Collect authentic sentence examples from grammar & vocab
    const sentenceCandidates: Array<{
      jp: string;
      id: string;
      reading?: string;
      target: NormalizedVocab | NormalizedGrammar;
    }> = [];

    for (const g of grammarPool) {
      for (const ex of g.examples) {
        if (ex.jp && ex.id && ex.jp.length >= 8 && ex.jp.length <= 50) {
          sentenceCandidates.push({
            jp: ex.jp.replace(/<[^>]*>/g, ''),
            id: ex.id,
            target: g,
          });
        }
      }
    }

    for (const v of vocabPool) {
      for (const ex of v.examples) {
        if (ex.jp && ex.id && ex.jp.length >= 8 && ex.jp.length <= 50) {
          sentenceCandidates.push({
            jp: ex.jp.replace(/<[^>]*>/g, ''),
            id: ex.id,
            reading: v.reading,
            target: v,
          });
        }
      }
    }

    const shuffledCandidates = shuffle(sentenceCandidates);
    const selected = shuffledCandidates.slice(0, count);

    for (const item of selected) {
      const otherSentences = shuffledCandidates.filter((s) => s.id !== item.id && s.jp !== item.jp);
      const distractorItems = shuffle(otherSentences).slice(0, 3);
      const distractors = distractorItems.map((d) => d.id);

      const generalDistractors = [
        'Saya berencana pergi ke perpustakaan nanti sore.',
        'Meskipun cuaca dingin, kegiatan di luar ruangan tetap berjalan.',
        'Tolong jangan lupa mengunci pintu sebelum tidur.',
        'Kemarin saya belajar tata bahasa Jepang sampai larut malam.',
      ].filter((d) => d !== item.id && !distractors.includes(d));

      while (distractors.length < 3 && generalDistractors.length > 0) {
        distractors.push(generalDistractors.pop()!);
      }

      const options = shuffle([item.id, ...distractors]);

      questions.push({
        id: `trans-${Date.now()}-${Math.random()}`,
        mode: 'translation',
        prompt: 'Pilihlah terjemahan bahasa Indonesia yang paling tepat:',
        targetItem: item.target,
        questionText: item.jp,
        subText: item.reading ? `【${item.reading}】` : undefined,
        correctAnswer: item.id,
        options,
        explanation: `Kalimat "${item.jp}" memiliki terjemahan yang tepat: "${item.id}".`,
        level,
      });
    }

    if (questions.length > 0) return questions;
  }

  if (mode === 'error-find') {
    // JLPT High-Yield Error Trap Bank
    interface ErrorTrapTemplate {
      levels: JLPTLevel[];
      sentenceWithError: string;
      wrongPart: string;
      correctAnswer: string;
      options: string[];
      fullCorrectSentence: string;
      translation: string;
      explanation: string;
    }

    const ERROR_TRAP_BANK: ErrorTrapTemplate[] = [
      {
        levels: ['n5', 'n4'],
        sentenceWithError: '明日、駅の前で友達[ を ]会います。',
        wrongPart: 'を',
        correctAnswer: 'に',
        options: ['に', 'で', 'へ', 'と'],
        fullCorrectSentence: '明日、駅の前で友達に会います。',
        translation: 'Besok, saya akan bertemu teman di depan stasiun.',
        explanation: 'Kata kerja 会う (bertemu) berpasangan dengan partikel に untuk orang yang ditemui (友達に会う), BUKAN partikel objek を.',
      },
      {
        levels: ['n5'],
        sentenceWithError: '毎朝、歩いて学校[ を ]行きます。',
        wrongPart: 'を',
        correctAnswer: 'へ',
        options: ['へ', 'を', 'で', 'から'],
        fullCorrectSentence: '毎朝、歩いて学校へ行きます。',
        translation: 'Setiap pagi, saya pergi ke sekolah dengan berjalan kaki.',
        explanation: 'Arah perpindahan menuju suatu tempat (行く, 来る, 帰る) menggunakan partikel へ atau に, BUKAN partikel objek を.',
      },
      {
        levels: ['n5', 'n4'],
        sentenceWithError: '教室の机の上[ で ]辞書があります。',
        wrongPart: 'で',
        correctAnswer: 'に',
        options: ['に', 'で', 'へ', 'を'],
        fullCorrectSentence: '教室の机の上に辞書があります。',
        translation: 'Ada kamus di atas meja ruang kelas.',
        explanation: 'Keberadaan benda mati atau hidup (ある / いる) di suatu lokasi menggunakan partikel に, sedangkan で digunakan untuk tempat terjadinya aktivitas aktif.',
      },
      {
        levels: ['n5'],
        sentenceWithError: '私は魚[ を ]好きではありません。',
        wrongPart: 'を',
        correctAnswer: 'が',
        options: ['が', 'を', 'に', 'で'],
        fullCorrectSentence: '私は魚が好きではありません。',
        translation: 'Saya tidak suka ikan.',
        explanation: 'Kata sifat 好き (suka) dan 嫌い (benci) memerlukan partikel が untuk menandai hal yang disukai/dibenci, bukan を.',
      },
      {
        levels: ['n5', 'n4'],
        sentenceWithError: 'お金がありませんから、パン[ しか ]買います。',
        wrongPart: '買います',
        correctAnswer: '買えません (hanya bisa / negatif)',
        options: ['買えません (hanya bisa / negatif)', '買います', '買いました', '買うでしょう'],
        fullCorrectSentence: 'お金がありませんから、パンしか買いません。',
        translation: 'Karena tidak punya uang, saya hanya bisa membeli roti.',
        explanation: 'Partikel しか (hanya) WAJIB selalu diikuti oleh kata kerja bentuk NEGATIF (〜ない / 〜ません) untuk menunjukkan keterbatasan.',
      },
      {
        levels: ['n5', 'n4'],
        sentenceWithError: '朝から晩[ までに ]ずっと雨が降っていました。',
        wrongPart: 'までに',
        correctAnswer: 'まで',
        options: ['まで', 'までに', 'から', 'より'],
        fullCorrectSentence: '朝から晩までずっと雨が降っていました。',
        translation: 'Hujan terus turun dari pagi sampai malam.',
        explanation: 'Aktivitas yang berlanjut terus-menerus menggunakan まで (sampai). Sedangkan までに (paling lambat / sebelum) hanya untuk tenggat waktu tunggal (deadline).',
      },
      {
        levels: ['n4', 'n3'],
        sentenceWithError: '日本へ[ 行くことがあります ]か。',
        wrongPart: '行くことがあります',
        correctAnswer: '行ったことがあります (pernah)',
        options: ['行ったことがあります (pernah)', '行くことがあります', '行ってあります', '行かないことがあります'],
        fullCorrectSentence: '日本へ行ったことがありますか。',
        translation: 'Apakah Anda pernah pergi ke Jepang?',
        explanation: 'Menyatakan pengalaman lampau "pernah" menggunakan bentuk lampau biasa [Kata Kerja た形 + ことがある]. Bentuk kamus [辞書形 + ことがある] berarti "kadang-kadang melakukan".',
      },
      {
        levels: ['n4', 'n3'],
        sentenceWithError: '雨が[ 降るそう ]ですから、傘を持って行きます。',
        wrongPart: '降るそう',
        correctAnswer: '降りそう (kelihatannya akan)',
        options: ['降りそう (kelihatannya akan)', '降るそう', '降ったそう', '降らないそう'],
        fullCorrectSentence: '雨が降りそうですから、傘を持って行きます。',
        translation: 'Karena kelihatannya akan turun hujan, saya akan membawa payung.',
        explanation: 'Perkiraan visual langsung (様態 - kelihatannya mau hujan) menggunakan Stem kata kerja (降り) + そう. Bentuk kamus 降る + そう berarti kabar angin dari orang lain (伝聞 - katanya akan hujan).',
      },
      {
        levels: ['n3', 'n2'],
        sentenceWithError: '高い料理だからといって、必ずしも美味しい[ わけではない ]とは言えません。',
        wrongPart: 'わけではない',
        correctAnswer: 'とは限らない (belum tentu)',
        options: ['とは限らない (belum tentu)', 'わけではない', 'はずがない', 'べきではない'],
        fullCorrectSentence: '高い料理だからといって、必ずしも美味しいとは限らない。',
        translation: 'Hanya karena masakannya mahal, belum tentu rasanya enak.',
        explanation: 'Kombinasi dengan kata 必ずしも (belum tentu / tidak selalu) secara alami berpasangan dengan pola 〜とは限らない.',
      },
      {
        levels: ['n3', 'n2', 'n1'],
        sentenceWithError: '年を取る[ にしたがって ]、視力が弱くなってきた。',
        wrongPart: 'にしたがって',
        correctAnswer: 'につれて (seiring bertambahnya)',
        options: ['につれて (seiring bertambahnya)', 'にしては', 'に反して', 'にとって'],
        fullCorrectSentence: '年を取るにつれて、視力が弱くなってきた。',
        translation: 'Seiring bertambahnya usia, penglihatan semakin melemah.',
        explanation: 'Perubahan alamiah bertahap pada kondisi tubuh seiring berjalannya waktu lazim menggunakan 〜につれて.',
      },
    ];

    // Filter traps suitable for the active level
    const matchedTraps = ERROR_TRAP_BANK.filter(
      (t) => t.levels.includes(level) || t.levels.includes('n5')
    );

    const shuffledTraps = shuffle(matchedTraps).slice(0, count);

    for (const trap of shuffledTraps) {
      questions.push({
        id: `err-${Date.now()}-${Math.random()}`,
        mode: 'error-find',
        prompt: 'Temukan bagian yang salah atau perbaikan yang tepat untuk bagian dalam kurung [ ]:',
        targetItem: grammarPool[0] || vocabPool[0],
        questionText: trap.sentenceWithError,
        subText: `Arti: "${trap.translation}"`,
        correctAnswer: trap.correctAnswer,
        options: shuffle(trap.options),
        explanation: `${trap.explanation}\nKalimat yang benar: "${trap.fullCorrectSentence}"`,
        level,
      });
    }

    if (questions.length > 0) return questions;
  }

  // Graceful vocab fallback
  const shuffledVocab = shuffle(vocabPool).slice(0, count);
  for (const v of shuffledVocab) {
    const distractors = getVocabDistractors(v, vocabPool, 3);
    const options = shuffle([v.meaning, ...distractors]);
    questions.push({
      id: `trans-${v.id}`,
      mode,
      prompt: 'Pilihlah arti kata yang paling tepat:',
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
  // Strip trailing punctuation
  const clean = sentence.replace(/[。！？\s]+$/, '');

  // Split after particles and natural grammatical pauses
  const parts = clean.split(/(?<=[はがをにでへとからもより、])/g).filter(Boolean);
  if (parts.length >= 3 && parts.length <= 6) {
    return parts;
  }

  // If too many chunks, merge adjacent short ones
  if (parts.length > 6) {
    const combined: string[] = [];
    for (let i = 0; i < parts.length; i += 2) {
      if (i + 1 < parts.length) {
        combined.push(parts[i] + parts[i + 1]);
      } else {
        if (combined.length > 0) {
          combined[combined.length - 1] += parts[i];
        } else {
          combined.push(parts[i]);
        }
      }
    }
    if (combined.length >= 3) return combined;
  }

  // Fallback: chunk by 2-4 chars
  const chunks: string[] = [];
  let i = 0;
  while (i < clean.length) {
    const len = Math.min(3, clean.length - i);
    chunks.push(clean.slice(i, i + len));
    i += len;
  }
  return chunks;
}

/**
 * Count how many cards are due for review today according to FSRS
 */
export function getFSRSDueCount(cardsMap: Record<string, { card: FSRSCard; source?: string }>): number {
  const now = new Date();
  let count = 0;
  for (const record of Object.values(cardsMap)) {
    if (record?.card) {
      if (!record.card.due || new Date(record.card.due) <= now) {
        count++;
      }
    }
  }
  return count;
}

/**
 * Generate a smart FSRS Daily Review session (due cards prioritized first, then new items)
 */
export function generateFSRSDueQuestions(
  cardsMap: Record<string, { card: FSRSCard; source?: string }>,
  vocabPool: NormalizedVocab[],
  grammarPool: NormalizedGrammar[],
  level: JLPTLevel,
  count = 10
): QuizQuestionItem[] {
  const now = new Date();
  const dueVocab: NormalizedVocab[] = [];
  const otherVocab: NormalizedVocab[] = [];

  const vocabMap = new Map<string, NormalizedVocab>();
  for (const v of vocabPool) {
    vocabMap.set(v.id, v);
  }

  // Find due vocabs
  for (const [id, record] of Object.entries(cardsMap)) {
    const v = vocabMap.get(id);
    if (v && record?.card) {
      if (!record.card.due || new Date(record.card.due) <= now) {
        dueVocab.push(v);
      }
    }
  }

  for (const v of vocabPool) {
    if (!dueVocab.some(dv => dv.id === v.id)) {
      otherVocab.push(v);
    }
  }

  // Combine due items first, fill remaining with others
  const targetPool = [...shuffle(dueVocab), ...shuffle(otherVocab)].slice(0, count);
  const questions: QuizQuestionItem[] = [];

  for (const v of targetPool) {
    const distractors = getVocabDistractors(v, vocabPool, 3);
    const options = shuffle([v.meaning, ...distractors]);
    questions.push({
      id: `fsrs-${v.id}-${Date.now()}`,
      mode: 'flashcard',
      prompt: 'Review FSRS Harian (Ingat arti kata ini?):',
      targetItem: v,
      questionText: v.word,
      subText: v.reading !== v.word ? v.reading : undefined,
      correctAnswer: v.meaning,
      options,
      explanation: `Kata "${v.word}" (${v.reading}) berarti "${v.meaning}". ${v.examples[0] ? `Contoh: ${v.examples[0].jp}` : ''}`,
      level,
    });
  }

  return questions;
}

/**
 * Regenerate questions specifically for missed/incorrect items (Mistake Notebook)
 */
export function generateMistakeQuestions(
  missedQuestions: QuizQuestionItem[]
): QuizQuestionItem[] {
  return missedQuestions.map((q) => ({
    ...q,
    id: `retry-${q.id}-${Date.now()}`,
    prompt: `[Ulangi Kesalahan] ${q.prompt}`,
  }));
}

/**
 * Generate diagnostic confusion pair drill questions from the 300 compiled items
 */
export function generateDiagnosticQuestions(
  pairs: DiagnosticPair[],
  count = 10,
  level?: JLPTLevel
): QuizQuestionItem[] {
  let pool = pairs;
  if (level) {
    const filtered = pool.filter((p) => p.level === level);
    if (filtered.length > 0) pool = filtered;
  }

  const selected = shuffle(pool).slice(0, count);
  const questions: QuizQuestionItem[] = [];

  for (const item of selected) {
    const isPhon = item.archetype === 'audio_speed_gate';
    const optA = item.target_form;
    const optB = item.l1_trap_form || (item.patterns && item.patterns[1]) || 'Lainnya';
    const options = shuffle([optA, optB]);

    questions.push({
      id: `diag-${item.id}-${Date.now()}`,
      mode: isPhon ? 'listening' : 'error-find',
      prompt: isPhon
        ? `[Diskriminasi Fonologis ${item.level.toUpperCase()}] Pilih bentuk ujaran/pasangan yang benar:`
        : `[Diagnostik L1 Indonesia ${item.level.toUpperCase()}] Hindari jebakan interferensi bahasa Indonesia:`,
      targetItem: {
        id: item.id,
        word: item.title,
        reading: item.accent_pattern || item.target_form,
        romaji: item.patterns.join(' vs '),
        meaning: item.stimulus_l1,
        level: item.level,
        pos: isPhon ? 'phonology' : 'contrastive',
        examples: [{ jp: item.target_form, id: item.stimulus_l1 }],
      } as any,
      questionText: isPhon
        ? `${item.title} — ${item.particle_pitch || item.accent_pattern || ''}`
        : `${item.title}: "${item.stimulus_l1}"`,
      subText: isPhon
        ? `Tantangan: ${item.stimulus_l1}`
        : `Bentuk yang salah (jebakan L1): ${item.l1_trap_form}`,
      correctAnswer: item.target_form,
      options,
      explanation: `✅ Bentuk benar: ${item.target_form}\n⚠️ Aturan: ${item.prescription}\n🔍 Analisis: ${item.root_cause}`,
      level: item.level,
    });
  }

  return questions;
}

