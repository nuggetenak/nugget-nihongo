// ══════════════════════════════════════════════════════════════════
//  authenticExerciseManager.ts — Bridge for 9 Canonical Textbooks
//  Loads and manages authentic signature exercises & drills
// ══════════════════════════════════════════════════════════════════

export interface AuthenticDrillItem {
  id: string;
  chapter: number | string;
  mechanic: string;
  title: string;
  instruction: string;
  prompt?: string;
  sentence_prompt?: string;
  dialogue_prompt?: {
    speaker_a: string;
    speaker_b_blank: string;
  };
  cue_tokens?: string[];
  options: string[];
  correct_answer: string;
  explanation: string;
  diagnostic_feedback?: Record<string, string>;
  roleplay_cue?: string;
}

export interface BookSeriesMeta {
  id: string;
  title: string;
  title_ja: string;
  publisher: string;
  publisher_ja: string;
  url: string;
  levels: string[];
  jlpt: string[];
  volumes: Array<{
    label: string;
    vocab_file?: string;
    grammar_file?: string;
    units?: number;
    chapters?: number;
    weeks?: number;
    lessons?: number;
    topics?: number;
    jlpt: string;
    status: string;
  }>;
  credit_text: string;
  credit_short: string;
  legal_note?: string;
}

declare global {
  interface Window {
    nuggetSourcesStaged?: {
      version: string;
      books: BookSeriesMeta[];
    };
    nuggetExerciseRegistry?: any;
    [key: string]: any;
  }
}

// Script loader cache
const loadedScripts = new Set<string>();

function loadScript(src: string): Promise<void> {
  if (loadedScripts.has(src)) return Promise.resolve();

  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      loadedScripts.add(src);
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => {
      loadedScripts.add(src);
      resolve();
    };
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

/**
 * Load the master 9-book staged catalog
 */
export async function loadStagedBooksCatalog(): Promise<BookSeriesMeta[]> {
  if (window.nuggetSourcesStaged?.books) {
    return window.nuggetSourcesStaged.books;
  }

  try {
    await loadScript('/data/staged-expansion/books/sources-staged.js');
    return window.nuggetSourcesStaged?.books || [];
  } catch (err) {
    console.warn('[authenticExerciseManager] Could not load sources-staged.js, using fallback metadata', err);
    return getFallbackBooksCatalog();
  }
}

/**
 * Load exercise drills for a specific book volume
 */
export async function loadBookDrills(bookId: string, volumeKey?: string): Promise<Record<string, { chapter: number | string; topic?: string; drills: AuthenticDrillItem[] }>> {
  let scriptPath = '';
  let varName = '';

  switch (bookId) {
    case 'minna':
      if (volumeKey === '2' || volumeKey === 'mn-2') {
        scriptPath = '/data/staged-expansion/exercises/minna/exercises-minna-2.js';
        varName = 'exercisesMinna2';
      } else {
        scriptPath = '/data/staged-expansion/exercises/minna/exercises-minna-1.js';
        varName = 'exercisesMinna1';
      }
      break;

    case 'genki':
      if (volumeKey === '2' || volumeKey === 'genki-2') {
        scriptPath = '/data/staged-expansion/exercises/genki/exercises-genki-2.js';
        varName = 'exercisesGenki2';
      } else {
        scriptPath = '/data/staged-expansion/exercises/genki/exercises-genki-1.js';
        varName = 'exercisesGenki1';
      }
      break;

    case 'soumatome': {
      const lvl = volumeKey?.toLowerCase().replace('n', '') || '5';
      scriptPath = `/data/staged-expansion/exercises/soumatome/exercises-sm-n${lvl}.js`;
      varName = `exercisesSoumatomeN${lvl}`;
      break;
    }

    case 'shin-kanzen-master': {
      const lvl = volumeKey?.toLowerCase().replace('n', '') || '3';
      scriptPath = `/data/staged-expansion/exercises/shin-kanzen-master/exercises-skm-n${lvl}.js`;
      varName = `exercisesSKMN${lvl}`;
      break;
    }

    case 'tobira':
      scriptPath = '/data/staged-expansion/exercises/tobira/exercises-tobira.js';
      varName = 'exercisesTobira';
      break;

    case 'quartet':
      if (volumeKey === '2') {
        scriptPath = '/data/staged-expansion/exercises/quartet/exercises-quartet-2.js';
        varName = 'exercisesQuartet2';
      } else {
        scriptPath = '/data/staged-expansion/exercises/quartet/exercises-quartet-1.js';
        varName = 'exercisesQuartet1';
      }
      break;

    case 'try': {
      const lvl = volumeKey?.toLowerCase().replace('n', '') || '5';
      scriptPath = `/data/staged-expansion/exercises/try/exercises-try-n${lvl}.js`;
      varName = `exercisesTryN${lvl}`;
      break;
    }

    case 'irodori':
      if (volumeKey === 'a2-1') {
        scriptPath = '/data/staged-expansion/exercises/irodori/exercises-ir-a2-1.js';
        varName = 'exercisesIrodoriA2_1';
      } else if (volumeKey === 'a2-2') {
        scriptPath = '/data/staged-expansion/exercises/irodori/exercises-ir-a2-2.js';
        varName = 'exercisesIrodoriA2_2';
      } else {
        scriptPath = '/data/staged-expansion/exercises/irodori/exercises-ir-a1.js';
        varName = 'exercisesIrodoriA1';
      }
      break;

    case 'marugoto':
      if (volumeKey === 'a2-1') {
        scriptPath = '/data/staged-expansion/exercises/marugoto/exercises-marugoto-a2-1.js';
        varName = 'exercisesMarugotoA2_1';
      } else if (volumeKey === 'a2-2') {
        scriptPath = '/data/staged-expansion/exercises/marugoto/exercises-marugoto-a2-2.js';
        varName = 'exercisesMarugotoA2_2';
      } else {
        scriptPath = '/data/staged-expansion/exercises/marugoto/exercises-marugoto-a1.js';
        varName = 'exercisesMarugotoA1';
      }
      break;

    default:
      return {};
  }

  try {
    await loadScript(scriptPath);
    const data = window[varName];
    if (data?.chapters) {
      return data.chapters;
    } else if (data?.units) {
      return data.units;
    } else if (data?.lessons) {
      return data.lessons;
    } else if (data?.weeks) {
      return data.weeks;
    } else if (data?.topics) {
      return data.topics;
    }
    return {};
  } catch (err) {
    console.warn(`[authenticExerciseManager] Could not load drills for ${bookId} (${scriptPath})`, err);
    return {};
  }
}

/**
 * Fallback metadata if external script fails to load
 */
function getFallbackBooksCatalog(): BookSeriesMeta[] {
  return [
    {
      id: 'irodori',
      title: 'Irodori: Japanese for Life in Japan',
      title_ja: 'いろどり 生活の日本語',
      publisher: 'The Japan Foundation',
      publisher_ja: '国際交流基金',
      url: 'https://www.irodori.jpf.go.jp/',
      levels: ['A1', 'A2-1', 'A2-2'],
      jlpt: ['n5', 'n4'],
      volumes: [
        { label: 'Starter A1', units: 18, jlpt: 'n5', status: 'ready' },
        { label: 'Elementary 1 A2-1', units: 18, jlpt: 'n4', status: 'ready' },
        { label: 'Elementary 2 A2-2', units: 18, jlpt: 'n4', status: 'ready' },
      ],
      credit_text: 'Mengacu pada kurikulum resmi Irodori karya The Japan Foundation.',
      credit_short: 'Irodori (The Japan Foundation)',
    },
    {
      id: 'minna',
      title: 'Minna no Nihongo Shokyuu',
      title_ja: 'みんなの日本語 初級',
      publisher: '3A Corporation',
      publisher_ja: 'スリーエーネットワーク',
      url: 'https://www.3anet.co.jp/np/books/3600/',
      levels: ['Shokyuu I', 'Shokyuu II'],
      jlpt: ['n5', 'n4'],
      volumes: [
        { label: 'Shokyuu I (Bab 1-25)', chapters: 25, jlpt: 'n5', status: 'ready' },
        { label: 'Shokyuu II (Bab 26-50)', chapters: 25, jlpt: 'n4', status: 'ready' },
      ],
      credit_text: 'Diorganisir berdasarkan urutan kurikulum standar Minna no Nihongo (3A Corporation).',
      credit_short: 'Minna no Nihongo (3A Corp.)',
    },
    {
      id: 'soumatome',
      title: 'Nihongo Sou Matome Series',
      title_ja: '日本語総まとめ',
      publisher: 'ASK Publishing',
      publisher_ja: 'アスク出版',
      url: 'https://www.ask-books.com/jp/somatome/',
      levels: ['N5', 'N4', 'N3', 'N2', 'N1'],
      jlpt: ['n5', 'n4', 'n3', 'n2', 'n1'],
      volumes: [
        { label: 'N5 Bunpou & Goi', weeks: 6, jlpt: 'n5', status: 'ready' },
        { label: 'N4 Bunpou & Goi', weeks: 6, jlpt: 'n4', status: 'ready' },
        { label: 'N3 Bunpou & Goi', weeks: 6, jlpt: 'n3', status: 'ready' },
        { label: 'N2 Bunpou & Goi', weeks: 8, jlpt: 'n2', status: 'ready' },
        { label: 'N1 Bunpou & Goi', weeks: 8, jlpt: 'n1', status: 'ready' },
      ],
      credit_text: 'Pengelompokan pola belajar mingguan mengacu pada Nihongo Sou Matome (ASK Publishing).',
      credit_short: 'Sou Matome (ASK Publishing)',
    },
    {
      id: 'genki',
      title: 'GENKI: An Integrated Course in Elementary Japanese',
      title_ja: '初級日本語 げんき',
      publisher: 'The Japan Times Publishing',
      publisher_ja: 'ジャパンタイムズ出版',
      url: 'https://genki3.japantimes.co.jp/',
      levels: ['Elementary I', 'Elementary II'],
      jlpt: ['n5', 'n4'],
      volumes: [
        { label: 'Genki I (Bab 1-12)', chapters: 12, jlpt: 'n5', status: 'ready' },
        { label: 'Genki II (Bab 13-23)', chapters: 11, jlpt: 'n4', status: 'ready' },
      ],
      credit_text: 'Urutan bab mengacu pada buku ajar GENKI (The Japan Times Publishing).',
      credit_short: 'GENKI (The Japan Times)',
    },
    {
      id: 'shin-kanzen-master',
      title: 'Shin Kanzen Master Series (新完全マスター)',
      title_ja: '新完全マスター',
      publisher: '3A Corporation',
      publisher_ja: 'スリーエーネットワーク',
      url: 'https://www.3anet.co.jp/np/books/skm/',
      levels: ['N3', 'N2', 'N1'],
      jlpt: ['n3', 'n2', 'n1'],
      volumes: [
        { label: 'N3 Bunpou & Goi', units: 12, jlpt: 'n3', status: 'ready' },
        { label: 'N2 Bunpou & Goi', units: 14, jlpt: 'n2', status: 'ready' },
        { label: 'N1 Bunpou & Goi', units: 15, jlpt: 'n1', status: 'ready' },
      ],
      credit_text: 'Taksonomi klasifikasi fungsi gramatika mengacu pada Shin Kanzen Master (3A Corporation).',
      credit_short: 'Shin Kanzen Master (3A Corp.)',
    },
    {
      id: 'tobira',
      title: 'Tobira: Gateway to Advanced Japanese',
      title_ja: '上級へのとびら',
      publisher: 'Kuroshio Publishers',
      publisher_ja: 'くろしお出版',
      url: 'https://tobiraweb.9640.jp/',
      levels: ['Intermediate Bridge'],
      jlpt: ['n3', 'n2'],
      volumes: [
        { label: 'Tobira (Bab 1-15)', chapters: 15, jlpt: 'n3-n2', status: 'ready' },
      ],
      credit_text: 'Tema wacana budaya mengacu pada Tobira (Kuroshio Publishers).',
      credit_short: 'Tobira (Kuroshio Publishers)',
    },
    {
      id: 'quartet',
      title: 'QUARTET: Intermediate Japanese across 4 Skills',
      title_ja: '中級日本語 クァルテット',
      publisher: 'The Japan Times Publishing',
      publisher_ja: 'ジャパンタイムズ出版',
      url: 'https://quartet.japantimes.co.jp/',
      levels: ['Intermediate I', 'Intermediate II'],
      jlpt: ['n3', 'n2'],
      volumes: [
        { label: 'QUARTET I (Lessons 1-6)', lessons: 6, jlpt: 'n3', status: 'ready' },
        { label: 'QUARTET II (Lessons 7-12)', lessons: 6, jlpt: 'n2', status: 'ready' },
      ],
      credit_text: 'Silabus 4 keahlian bahasa terpadu mengacu pada QUARTET (The Japan Times Publishing).',
      credit_short: 'QUARTET (The Japan Times)',
    },
    {
      id: 'try',
      title: 'TRY! Japanese Language Proficiency Test',
      title_ja: 'TRY! 日本語能力試験',
      publisher: 'ASK Publishing / AOTS',
      publisher_ja: 'アスク出版 / AOTS',
      url: 'https://www.ask-books.com/jp/try/',
      levels: ['N5', 'N4', 'N3', 'N2', 'N1'],
      jlpt: ['n5', 'n4', 'n3', 'n2', 'n1'],
      volumes: [
        { label: 'TRY! N5', chapters: 9, jlpt: 'n5', status: 'ready' },
        { label: 'TRY! N4', chapters: 10, jlpt: 'n4', status: 'ready' },
        { label: 'TRY! N3', chapters: 11, jlpt: 'n3', status: 'ready' },
        { label: 'TRY! N2', chapters: 12, jlpt: 'n2', status: 'ready' },
        { label: 'TRY! N1', chapters: 10, jlpt: 'n1', status: 'ready' },
      ],
      credit_text: 'Struktur kurikulum komunikatif mengacu pada seri TRY! (ASK Publishing).',
      credit_short: 'TRY! JLPT (ASK Publishing)',
    },
    {
      id: 'marugoto',
      title: 'Marugoto: Japanese Language and Culture',
      title_ja: 'まるごと 日本のことばと文化',
      publisher: 'The Japan Foundation / Sanshusha',
      publisher_ja: '国際交流基金 / 三修社',
      url: 'https://www.marugoto.org/',
      levels: ['Starter A1', 'Elementary 1 A2-1', 'Elementary 2 A2-2'],
      jlpt: ['n5', 'n4'],
      volumes: [
        { label: 'Starter A1', topics: 9, jlpt: 'n5', status: 'ready' },
        { label: 'Elementary 1 A2-1', topics: 9, jlpt: 'n4', status: 'ready' },
        { label: 'Elementary 2 A2-2', topics: 9, jlpt: 'n4', status: 'ready' },
      ],
      credit_text: 'Kerangka topik dan standar JF Standard mengacu pada Marugoto (The Japan Foundation).',
      credit_short: 'Marugoto (The Japan Foundation)',
    },
  ];
}
