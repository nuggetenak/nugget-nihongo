// ══════════════════════════════════════════════════════════════════
//  kanjiRadicalExtractor.ts — Kangxi Radical Taxonomy & Decomposition
//  Maps radical elements to Indonesian pedagogical meanings and stroke counts
// ══════════════════════════════════════════════════════════════════

export interface RadicalMetadata {
  radical: string;
  kangxiNumber: number;
  strokeCount: number;
  nameJa: string;
  nameId: string;
  meaningId: string;
}

const COMMON_RADICALS_MAP: Record<string, RadicalMetadata> = {
  '一': { radical: '一', kangxiNumber: 1, strokeCount: 1, nameJa: 'いち', nameId: 'Satu', meaningId: 'Garis horizontal, angka satu, kesatuan' },
  '丨': { radical: '丨', kangxiNumber: 2, strokeCount: 1, nameJa: 'ぼう', nameId: 'Tongkat', meaningId: 'Garis vertikal, tongkat penyangga' },
  '丶': { radical: '丶', kangxiNumber: 3, strokeCount: 1, nameJa: 'てん', nameId: 'Titik', meaningId: 'Tetesan, percikan, titik fokus' },
  '丿': { radical: '丿', kangxiNumber: 4, strokeCount: 1, nameJa: 'の', nameId: 'Goresan Miring', meaningId: 'Tebasan atau lengkungan miring ke kiri' },
  '乙': { radical: '乙', kangxiNumber: 5, strokeCount: 1, nameJa: 'おつ', nameId: 'Kedua / Belut', meaningId: 'Garis melengkung kait, tanda urutan kedua' },
  '亅': { radical: '亅', kangxiNumber: 6, strokeCount: 1, nameJa: 'はねぼう', nameId: 'Kait', meaningId: 'Kait pancing atau ujung melengkung' },
  '人': { radical: '人', kangxiNumber: 9, strokeCount: 2, nameJa: 'ひと', nameId: 'Manusia', meaningId: 'Manusia, orang, sosok pribadi' },
  '亻': { radical: '亻', kangxiNumber: 9, strokeCount: 2, nameJa: 'にんべん', nameId: 'Orang (Sisi Kiri)', meaningId: 'Bentuk samping dari radikal manusia' },
  '口': { radical: '口', kangxiNumber: 30, strokeCount: 3, nameJa: 'くち', nameId: 'Mulut', meaningId: 'Mulut, pintu masuk, bukaan, perkataan' },
  '土': { radical: '土', kangxiNumber: 32, strokeCount: 3, nameJa: 'つち', nameId: 'Tanah', meaningId: 'Tanah, bumi, lempung, tempat berpijak' },
  '日': { radical: '日', kangxiNumber: 72, strokeCount: 4, nameJa: 'ひ / にち', nameId: 'Matahari / Hari', meaningId: 'Matahari, cahaya siang, waktu, hari' },
  '月': { radical: '月', kangxiNumber: 74, strokeCount: 4, nameJa: 'つき', nameId: 'Bulan / Daging', meaningId: 'Bulan di langit atau organ daging tubuh (nikuzuki)' },
  '木': { radical: '木', kangxiNumber: 75, strokeCount: 4, nameJa: 'き', nameId: 'Pohon / Kayu', meaningId: 'Pohon berakar, kayu hutan, bahan bangunan' },
  '水': { radical: '水', kangxiNumber: 85, strokeCount: 4, nameJa: 'みず', nameId: 'Air', meaningId: 'Aliran air, cairan, sungai jernih' },
  '氵': { radical: '氵', kangxiNumber: 85, strokeCount: 3, nameJa: 'さんずい', nameId: 'Air (Sisi Kiri)', meaningId: 'Tiga tetesan air sampingan' },
  '火': { radical: '火', kangxiNumber: 86, strokeCount: 4, nameJa: 'ひ', nameId: 'Api', meaningId: 'Kobaran api, nyala panas, memasak' },
  '灬': { radical: '灬', kangxiNumber: 86, strokeCount: 4, nameJa: 'れんが', nameId: 'Api (Bawah)', meaningId: 'Empat bara api di dasar kanji' },
  '田': { radical: '田', kangxiNumber: 102, strokeCount: 5, nameJa: 'た', nameId: 'Sawah', meaningId: 'Petak sawah bertingkat, lahan pertanian padi' },
  '目': { radical: '目', kangxiNumber: 109, strokeCount: 5, nameJa: 'め', nameId: 'Mata', meaningId: 'Mata penglihatan, pandangan, wawasan' },
  '言': { radical: '言', kangxiNumber: 149, strokeCount: 7, nameJa: 'ことば / げん', nameId: 'Kata / Bahasa', meaningId: 'Perkataan terucap, ujaran bahasa, pesan' },
  '辶': { radical: '辶', kangxiNumber: 162, strokeCount: 3, nameJa: 'しんにょう', nameId: 'Jalan / Melangkah', meaningId: 'Jalanan berkelok, perjalanan, melangkah maju' },
  '門': { radical: '門', kangxiNumber: 169, strokeCount: 8, nameJa: 'もん', nameId: 'Gerbang', meaningId: 'Gerbang besar berpintu ganda, gapura kuil' },
};

/**
 * Retrieves semantic Indonesian metadata for a given KanjiVG radical element
 */
export function getRadicalInfo(element: string): RadicalMetadata {
  if (!element) {
    return {
      radical: '？',
      kangxiNumber: 0,
      strokeCount: 1,
      nameJa: '不明',
      nameId: 'Komponen Lain',
      meaningId: 'Bagian elemen pembentuk karakter kanji',
    };
  }

  const found = COMMON_RADICALS_MAP[element];
  if (found) return found;

  return {
    radical: element,
    kangxiNumber: 0,
    strokeCount: element.length,
    nameJa: element,
    nameId: `Komponen ${element}`,
    meaningId: `Elemen grafis pembentuk kanji (${element})`,
  };
}

/**
 * Decomposes an array of KanjiVG radical tags into rich Indonesian pedagogical explanations
 */
export function decomposeRadicals(radicalElements: string[]): RadicalMetadata[] {
  if (!Array.isArray(radicalElements)) return [];
  return radicalElements.map((elem) => getRadicalInfo(elem));
}
