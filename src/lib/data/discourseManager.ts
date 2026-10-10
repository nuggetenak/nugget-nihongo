// ══════════════════════════════════════════════════════════════════
//  discourseManager.ts — Macro-Discourse & Collocation Engine (N2/N1)
//  Research basis: ADR-009 (Choubun Discourse Dissector & Nuance Matrix)
//  Addresses Kritik 4: Deconstructing authentic extended discourse & collocations
// ══════════════════════════════════════════════════════════════════

import { JLPTLevel } from '../../types/vocab';
import { QuizQuestionItem } from '../../types/quiz';

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export type DiscourseRole = 'premise' | 'antithesis' | 'evidence' | 'synthesis' | 'conclusion';

export interface DiscourseSegment {
  id: string;
  text: string;
  role: DiscourseRole;
  keyMarkers: string[];
  explanation_id: string;
}

export interface DiscoursePassage {
  id: string;
  title_jp: string;
  title_id: string;
  level: 'n2' | 'n1';
  genre: 'editorial' | 'essay' | 'business_memo' | 'corporate_policy';
  full_text: string;
  segments: DiscourseSegment[];
  comprehensionQuestions: Array<{
    prompt: string;
    options: string[];
    answer: string;
    explanation: string;
  }>;
}

export interface CollocationNuancePattern {
  pattern: string;
  meaning: string;
  nuance: string;
  collocations: string[];
  distributionConstraint: string;
}

export interface CollocationNuanceEntry {
  id: string;
  title: string;
  level: 'n2' | 'n1';
  domain: string;
  patterns: CollocationNuancePattern[];
  diagnostic_contrast: string;
}

// Canonical Pre-loaded N2 & N1 Discourse Passages
export const CANONICAL_PASSAGES: DiscoursePassage[] = [
  {
    id: 'disc-n2-01',
    title_jp: 'AI技術の導入と労働市場の変容',
    title_id: 'Pengenalan Teknologi AI dan Transformasi Pasar Kerja',
    level: 'n2',
    genre: 'editorial',
    full_text:
      '現代社会において、AI技術の発展は目覚ましく、多くの産業で自動化が進められている。この技術革新は生産性の向上をもたらす反面、従来の人間の雇用を脅かすのではないかという懸念も根強い。実際、定型業務を中心とする職種においては省人化が加速しているものの、人間にしかできない創造的対話や共感力を要する分野の需要はむしろ拡大している。したがって、技術革新を単に恐れるのではなく、リスキリングを通じて新たな価値を創出することこそが求められているにほかならない。',
    segments: [
      {
        id: 'seg-n2-01-1',
        text: '現代社会において、AI技術の発展は目覚ましく、多くの産業で自動化が進められている。',
        role: 'premise',
        keyMarkers: ['において', 'が進められている'],
        explanation_id: 'Premis Umum: Mengangkat latar belakang perkembangan AI dan otomatisasi industri.',
      },
      {
        id: 'seg-n2-01-2',
        text: 'この技術革新は生産性の向上をもたらす反面、従来の人間の雇用を脅かすのではないかという懸念も根強い。',
        role: 'antithesis',
        keyMarkers: ['反面', 'のではないか'],
        explanation_id: 'Antitesis / Paradoks: Menyoroti dua sisi bertolak belakang (produktivitas vs ancaman PHK).',
      },
      {
        id: 'seg-n2-01-3',
        text: '実際、定型業務を中心とする職種においては省人化が加速しているものの、人間にしかできない創造的対話や共感力を要する分野の需要はむしろ拡大している。',
        role: 'evidence',
        keyMarkers: ['を中心とする', 'ものの', 'むしろ'],
        explanation_id: 'Bukti / Elaborasi Data: Bukti faktual bahwa pekerjaan empati dan kreativitas tetap tumbuh.',
      },
      {
        id: 'seg-n2-01-4',
        text: 'したがって、技術革新を単に恐れるのではなく、リスキリングを通じて新たな価値を創出することこそが求められているにほかならない。',
        role: 'synthesis',
        keyMarkers: ['を通じて', 'こそが', 'にほかならない'],
        explanation_id: 'Sintesis & Resolusi Penutup: Resolusi tegas bahwa reskilling adalah jawaban mutlak.',
      },
    ],
    comprehensionQuestions: [
      {
        prompt: 'Berdasarkan teks di atas, peran retorika dari kalimat yang memuat pola "反面" adalah:',
        options: [
          'Memperkenalkan antitesis atau paradoks terhadap premis sebelumnya',
          'Menyajikan kesimpulan final dari sudut pandang penulis',
          'Menguraikan data statistik kuantitatif lapangan',
          'Menolak sama sekali penggunaan teknologi AI',
        ],
        answer: 'Memperkenalkan antitesis atau paradoks terhadap premis sebelumnya',
        explanation: 'Pola "〜反面" digunakan untuk menghadirkan dua aspek yang bertolak belakang dari satu fenomena yang sama.',
      },
    ],
  },
  {
    id: 'disc-n1-01',
    title_jp: '企業倫理と持続可能性の法的責任',
    title_id: 'Etika Korporasi dan Tanggung Jawab Hukum Keberlanjutan',
    level: 'n1',
    genre: 'corporate_policy',
    full_text:
      '企業の社会的責任が問われる昨今、利益の最大化のみを追求する姿勢はもはや社会的に許容され得ない。短期的な収益性のいかんにかかわらず、環境保全と人権尊重を最優先に位置づけることなしには、企業の存続すら危うい時代となった。経営幹部たる者は、法令遵守にとどまらず、崇高な倫理規範に照らして日々の意思決定を行わねばならず、不正の兆候を見過ごす行為はプロフェッショナルとしてあるまじき背信である。',
    segments: [
      {
        id: 'seg-n1-01-1',
        text: '企業の社会的責任が問われる昨今、利益の最大化のみを追求する姿勢はもはや社会的に許容され得ない。',
        role: 'premise',
        keyMarkers: ['が問われる', '得ない'],
        explanation_id: 'Premis Fondasional: Menegaskan bahwa orientasi laba semata sudah tidak dapat ditoleransi.',
      },
      {
        id: 'seg-n1-01-2',
        text: '短期的な収益性のいかんにかかわらず、環境保全と人権尊重を最優先に位置づけることなしには、企業の存続すら危うい時代となった。',
        role: 'evidence',
        keyMarkers: ['いかんにかかわらず', 'ことなしには'],
        explanation_id: 'Syarat Ketat & Batasan: Menetapkan syarat mutlak tanpa memandang profit jangka pendek.',
      },
      {
        id: 'seg-n1-01-3',
        text: '経営幹部たる者は、法令遵守にとどまらず、崇高な倫理規範に照らして日々の意思決定を行わねばならず、不正の兆候を見過ごす行為はプロフェッショナルとしてあるまじき背信である。',
        role: 'conclusion',
        keyMarkers: ['たる者', 'にとどまらず', 'あるまじき'],
        explanation_id: 'Resolusi Moral Eksekutif: Memakai pola N1 "あるまじき" untuk larangan keras etika profesi.',
      },
    ],
    comprehensionQuestions: [
      {
        prompt: 'Pola "あるまじき" pada kalimat penutup menunjukkan nuansa pragmatis apa?',
        options: [
          'Larangan moralitas keras yang haram dilakukan oleh seorang profesional',
          'Perkiraan probabilitas rendah berdasarkan pengamatan visual',
          'Penyesalan ringan atas ketidaksengajaan masa lalu',
          'Harapan informal kepada bawahan di tempat kerja',
        ],
        answer: 'Larangan moralitas keras yang haram dilakukan oleh seorang profesional',
        explanation: 'Pola N1 "〜あるまじき" melekat pada profesi atau status (cth: pro / perawat / guru) untuk menegaskan tabu etika mutlak.',
      },
    ],
  },
];

// Canonical Pre-loaded N2 & N1 Collocation & Nuance Contrast Entries
export const CANONICAL_COLLOCATIONS: CollocationNuanceEntry[] = [
  {
    id: 'colloc-n1-time',
    title: 'Suksesi Waktu Seketika N1 (や否や vs が早いか vs そばから vs なり)',
    level: 'n1',
    domain: 'Temporal Immediacy',
    patterns: [
      {
        pattern: '〜や否や',
        meaning: 'Seketika / Begitu X langsung Y',
        nuance: 'Deskripsi objektif netral; transisi sangat cepat antara dua peristiwa eksternal.',
        collocations: ['ベルが鳴るや否や', '顔を見るや否や'],
        distributionConstraint: 'Klausa kedua berupa fakta deskriptif, tidak boleh berupa kalimat perintah atau niat penutur.',
      },
      {
        pattern: '〜が早いか',
        meaning: 'Mendahului / Baru saja X buru-buru Y',
        nuance: 'Subjek bergegas melakukan tindakan kedua seolah-olah mendahului selesainya aksi pertama.',
        collocations: ['チャイムが鳴るが早いか教室を飛び出した', '指示を聞くが早いか駆け出した'],
        distributionConstraint: 'Subjek biasanya orang ketiga yang bertindak tergesa-gesa.',
      },
      {
        pattern: '〜そばから',
        meaning: 'Baru saja X langsung terulang Y (sia-sia)',
        nuance: 'Siklus berulang yang melelahkan atau menjengkelkan penutur (misal: baru dibersihkan langsung kotor lagi).',
        collocations: ['掃除するそばから散らかす', '覚えるそばから忘れる'],
        distributionConstraint: 'Predikat kedua berkonotasi negatif atau kegagalan yang berulang.',
      },
      {
        pattern: '〜なり',
        meaning: 'Seketika spontan melakukan aksi tak terduga',
        nuance: 'Tindakan spontan yang tiba-tiba dan di luar dugaan oleh orang ketiga.',
        collocations: ['部屋に入るなり倒れ込んだ', '手紙を読むなり泣き出した'],
        distributionConstraint: 'Subjek orang ketiga; verba bentuk kamus di awal.',
      },
    ],
    diagnostic_contrast:
      'Waspadai: Jika ada konotasi berulang yang melelahkan (baru diajari langsung lupa), WAJIB gunakan 〜そばから, bukan や否や.',
  },
  {
    id: 'colloc-n2-scope',
    title: 'Batasan & Skala N2 (にすぎない vs にとどまらない vs に限らず)',
    level: 'n2',
    domain: 'Limitation & Scope',
    patterns: [
      {
        pattern: '〜にすぎない',
        meaning: 'Hanya sekadar... (tidak lebih dari itu)',
        nuance: 'Menilai entitas bernilai rendah atau sepele dibanding yang dibayangkan.',
        collocations: ['一過性のブームにすぎない', '単なる言い訳にすぎない'],
        distributionConstraint: 'Melekat pada nomina atau verba biasa dengan nuansa merendahkan taksiran.',
      },
      {
        pattern: '〜にとどまらない',
        meaning: 'Tidak terbatas hanya pada lingkup X (meluas)',
        nuance: 'Dampak atau fenomena meluas jauh melampaui batas awal yang diperkirakan.',
        collocations: ['国内にとどまらず海外へ拡大', '一企業の損失にとどまらない'],
        distributionConstraint: 'Sering dipasangkan dengan dampak makro nasional atau global.',
      },
      {
        pattern: '〜に限らず',
        meaning: 'Tidak hanya X, tetapi juga lingkup yang lebih luas',
        nuance: 'Penyebutan contoh spesifik yang mewakili kategori umum yang lebih luas.',
        collocations: ['若者に限らず高齢者も', '平日に限らず休日も'],
        distributionConstraint: 'Biasanya menghubungkan dua nomina yang berstatus setara dalam cakupan.',
      },
    ],
    diagnostic_contrast:
      'Waspadai: "にすぎない" bermakna meremehkan ("hanya sekadar"), sedangkan "にとどまらない" bermakna perluasan dampak.',
  },
];

/**
 * Loads discourse passages, optionally filtered by JLPT level
 */
export function loadDiscoursePassages(level?: 'n2' | 'n1'): DiscoursePassage[] {
  if (level) {
    return CANONICAL_PASSAGES.filter((p) => p.level === level);
  }
  return CANONICAL_PASSAGES;
}

/**
 * Loads collocation nuance entries, optionally filtered by JLPT level
 */
export function loadCollocationMatrix(level?: 'n2' | 'n1'): CollocationNuanceEntry[] {
  if (level) {
    return CANONICAL_COLLOCATIONS.filter((c) => c.level === level);
  }
  return CANONICAL_COLLOCATIONS;
}

/**
 * Generate discourse deconstruction quiz questions for N2/N1 learners
 */
export function generateDiscourseQuestions(
  passages: DiscoursePassage[],
  count = 2
): QuizQuestionItem[] {
  const questions: QuizQuestionItem[] = [];
  const selected = shuffle(passages).slice(0, count);

  for (const p of selected) {
    for (const q of p.comprehensionQuestions) {
      questions.push({
        id: `disc-${p.id}-${Date.now()}`,
        mode: 'discourse-deconstruct',
        prompt: `[Dekonstruksi Wacana Makro ${p.level.toUpperCase()}] Analisis peran retorika dalam wacana:`,
        targetItem: {
          id: p.id,
          word: p.title_jp,
          reading: p.title_id,
          romaji: p.genre,
          meaning: p.title_id,
          level: p.level,
          pos: 'discourse',
          examples: [{ jp: p.full_text, id: p.title_id }],
        } as any,
        questionText: `📰 ${p.title_jp} (${p.title_id})\n\n"${p.full_text}"\n\n❓ Pertanyaan: ${q.prompt}`,
        subText: `Genre: ${p.genre.toUpperCase()}`,
        correctAnswer: q.answer,
        options: shuffle(q.options),
        explanation: `✅ Kunci Analisis: ${q.explanation}\n\nStruktur Wacana:\n${p.segments.map((s) => `• [${s.role.toUpperCase()}] ${s.explanation_id}`).join('\n')}`,
        level: p.level,
      });
    }
  }

  return questions;
}

/**
 * Generate collocation nuance contrast discrimination quiz questions
 */
export function generateCollocationQuestions(
  entries: CollocationNuanceEntry[],
  count = 2
): QuizQuestionItem[] {
  const questions: QuizQuestionItem[] = [];
  const selected = shuffle(entries).slice(0, count);

  for (const entry of selected) {
    for (const pat of entry.patterns) {
      const distractors = entry.patterns
        .filter((p) => p.pattern !== pat.pattern)
        .map((p) => p.nuance);
      const options = shuffle([pat.nuance, ...distractors.slice(0, 3)]);

      questions.push({
        id: `colloc-${entry.id}-${pat.pattern}-${Date.now()}`,
        mode: 'collocation-matrix',
        prompt: `[Diferensiasi Nuansa Kolokasi ${entry.level.toUpperCase()}] Pilih nuansa pragmatis yang paling tepat untuk pola:`,
        targetItem: {
          id: entry.id,
          word: pat.pattern,
          reading: pat.meaning,
          romaji: pat.collocations.join(', '),
          meaning: pat.meaning,
          level: entry.level,
          pos: 'collocation',
          examples: pat.collocations.map((c) => ({ jp: c, id: pat.meaning })),
        } as any,
        questionText: `Pola: 「${pat.pattern}」\nKolokasi khas: ${pat.collocations.join(' / ')}`,
        subText: `Batasan Distribusi: ${pat.distributionConstraint}`,
        correctAnswer: pat.nuance,
        options,
        explanation: `✅ Nuansa Pola: ${pat.nuance}\n⚠️ Pembeda Kritis: ${entry.diagnostic_contrast}`,
        level: entry.level,
        collocationContrast: {
          patternA: pat.pattern,
          patternB: distractors[0] || '',
          difference: entry.diagnostic_contrast,
        },
      });
    }
  }

  return questions;
}
