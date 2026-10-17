// ══════════════════════════════════════════════════════════════════
//  grammarTaxonomyId.ts — Taksonomi Tata Bahasa Jepang Standar Indonesia
//  Kamus istilah gramatika ramah pembelajar bahasa Indonesia (SLA)
//  Menghilangkan kebingungan antara istilah linguistik Barat & Jepang
// ══════════════════════════════════════════════════════════════════

export type GrammarCategory =
  | 'partikel'
  | 'konjugasi_verba'
  | 'adjektiva'
  | 'keigo'
  | 'pola_kalimat'
  | 'aspek_kala'
  | 'modalitas';

export interface GrammarTermDetail {
  id: string;
  jpName: string;
  kanji: string;
  romaji: string;
  idName: string;
  category: GrammarCategory;
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1' | 'ALL';
  penjelasanSingkat: string;
  analogiIndonesia: string;
  contohPola: string;
  perangkapUmum: string;
}

export const GRAMMAR_TAXONOMY_ID: Record<string, GrammarTermDetail> = {
  // ── Partikel Pokok ───────────────────────────────────────────────
  wa_topic: {
    id: 'wa_topic',
    jpName: 'は (トピック助詞)',
    kanji: '係助詞「は」',
    romaji: 'wa (topic joshi)',
    idName: 'Partikel Penanda Topik ("Adapun...")',
    category: 'partikel',
    level: 'N5',
    penjelasanSingkat: 'Menandai tema atau pokok pembicaraan utama yang sudah diketahui bersama.',
    analogiIndonesia: 'Mirip frasa "Kalau membicarakan si X...", "Adapun...", atau intonasi jeda di awal kalimat.',
    contohPola: '私はインドネシア人です (Watashi wa Indonesia-jin desu)',
    perangkapUmum: 'Sering tertukar dengan partikel "ga". "Wa" menekankan informasi SETELAHNYA, bukan subjeknya.',
  },
  ga_subject: {
    id: 'ga_subject',
    jpName: 'が (格助詞)',
    kanji: '格助詞「が」',
    romaji: 'ga (kaku joshi)',
    idName: 'Partikel Penanda Pelaku / Subjek Gramatikal',
    category: 'partikel',
    level: 'N5',
    penjelasanSingkat: 'Menandai siapa atau apa yang melakukan aksi atau memiliki sifat, sering membawa informasi baru.',
    analogiIndonesia: 'Mirip kata "yang" penegas penunjuk pelaku: "Dialah YANG melakukannya".',
    contohPola: '雨が降っています (Ame ga futte imasu)',
    perangkapUmum: 'Digunakan saat subjek baru pertama kali diperkenalkan atau menjawab pertanyaan "Siapa/Apa yang...?"',
  },
  wo_object: {
    id: 'wo_object',
    jpName: 'を (目的語助詞)',
    kanji: '格助詞「を」',
    romaji: 'wo / o (mokutekigo joshi)',
    idName: 'Partikel Penanda Objek Penderita',
    category: 'partikel',
    level: 'N5',
    penjelasanSingkat: 'Menandai benda atau sasaran langsung yang dikenai perbuatan transitif.',
    analogiIndonesia: 'Dalam bahasa Indonesia langsung ditaruh setelah kata kerja aktif: "makan [nasi]".',
    contohPola: 'ご飯を食べます (Gohan o tabemasu)',
    perangkapUmum: 'Jangan gunakan pada kata kerja intransitif seperti iku, kuru, aru, iru.',
  },
  ni_target: {
    id: 'ni_target',
    jpName: 'に (到達点・時間助詞)',
    kanji: '格助詞「に」',
    romaji: 'ni (toutatsuten / jikan joshi)',
    idName: 'Partikel Penanda Waktu Spesifik & Titik Tujuan Akhir',
    category: 'partikel',
    level: 'N5',
    penjelasanSingkat: 'Menandai waktu pasti (berangka), target kedatangan, atau penerima manfaat.',
    analogiIndonesia: 'Bisa berarti "pada (jam...)", "ke (titik tiba)", atau "kepada (orang)".',
    contohPola: '7時に起きます (Shichiji ni okimasu) / 友達に会います (Tomodachi ni aimasu)',
    perangkapUmum: 'Tidak digunakan untuk waktu relatif seperti "besok (ashita)", "kemarin (kinou)", "tiap hari (mainichi)".',
  },
  de_means: {
    id: 'de_means',
    jpName: 'で (手段・場所助詞)',
    kanji: '格助詞「で」',
    romaji: 'de (shudan / basho joshi)',
    idName: 'Partikel Penanda Alat / Cara & Lokasi Aktivitas Berlangsung',
    category: 'partikel',
    level: 'N5',
    penjelasanSingkat: 'Menandai alat transportasi, bahasa perantara, sarana, atau tempat di mana aktivitas dilakukan.',
    analogiIndonesia: 'Bisa berarti "dengan (alat/kendaraan)", "menggunakan", atau "di (tempat melakukan aksi)".',
    contohPola: '電車で行きます (Densha de ikimasu) / 図書館で勉強します (Toshokan de benkyou shimasu)',
    perangkapUmum: 'Beda dengan "ni". "De" untuk tempat aksi berlangsung aktif; "ni" untuk lokasi keberadaan statis (ada/berada).',
  },

  // ── Konjugasi Verba ──────────────────────────────────────────────
  jishokei: {
    id: 'jishokei',
    jpName: '辞書形',
    kanji: '辞書形',
    romaji: 'jishokei',
    idName: 'Bentuk Kamus (Bentuk Dasar / Informal Non-Lampau)',
    category: 'konjugasi_verba',
    level: 'N5',
    penjelasanSingkat: 'Bentuk kata kerja asli sebelum mengalami perubahan akhiran, berakhiran vokal u.',
    analogiIndonesia: 'Kata dasar di kamus seperti "makan", "minum", "tidur".',
    contohPola: '食べる (taberu), 行く (iku), 話す (hanasu)',
    perangkapUmum: 'Digunakan dalam percakapan kasual (tamego) atau sebagai anak kalimat sebelum partikel tertentu (mae ni, koto).',
  },
  tekei: {
    id: 'tekei',
    jpName: 'て形',
    kanji: 'て形',
    romaji: 'tekei',
    idName: 'Bentuk Te (Bentuk Penghubung & Permohonan)',
    category: 'konjugasi_verba',
    level: 'N5',
    penjelasanSingkat: 'Bentuk fleksibel untuk menyambung klausa urutan waktu, memohon (te kudasai), atau kondisi sedang (te iru).',
    analogiIndonesia: 'Mirip kata sambung "...lalu...", "...kemudian...", atau awalan "tolong...".',
    contohPola: '食べて (tabete), 行って (itte), 読んで (yonde)',
    perangkapUmum: 'Perubahan bunyi berbeda antara Golongan 1 (Godan), Golongan 2 (Ichidan), dan Golongan 3 (Irregular).',
  },
  takei: {
    id: 'takei',
    jpName: 'た形',
    kanji: 'た形',
    romaji: 'takei',
    idName: 'Bentuk Ta (Bentuk Lampau Informal / Selesai)',
    category: 'konjugasi_verba',
    level: 'N5',
    penjelasanSingkat: 'Menandai tindakan yang telah terjadi atau selesai di masa lalu secara informal.',
    analogiIndonesia: 'Kata kerja yang diberi penanda aspek "sudah" atau keterangan lampau "kemarin".',
    contohPola: '食べた (tabeta), 行った (itta), 読んだ (yonda)',
    perangkapUmum: 'Pola perubahannya identik 100% dengan bentuk Te (cukup ganti te/de menjadi ta/da).',
  },
  naikei: {
    id: 'naikei',
    jpName: 'ない形',
    kanji: 'ない形',
    romaji: 'naikei',
    idName: 'Bentuk Nai (Bentuk Negatif Informal)',
    category: 'konjugasi_verba',
    level: 'N5',
    penjelasanSingkat: 'Menyatakan penyangkalan atau "tidak melakukan" dalam ragam kasual atau anak kalimat.',
    analogiIndonesia: 'Sama dengan memberi kata "tidak" di depan kata kerja: "tidak makan".',
    contohPola: '食べない (tabenai), 行かない (ikanai), 話さない (hanasanai)',
    perangkapUmum: 'Kata kerja akhiran "u" menjadi "wanai" (bukan anai), misalnya kau -> kawanai.',
  },
  kanoukei: {
    id: 'kanoukei',
    jpName: '可能形',
    kanji: '可能形',
    romaji: 'kanoukei',
    idName: 'Bentuk Potensial (Kesanggupan / Bisa / Mampu)',
    category: 'konjugasi_verba',
    level: 'N4',
    penjelasanSingkat: 'Menyatakan kemampuan subjek atau kelayakan suatu kondisi untuk dilakukan.',
    analogiIndonesia: 'Kata "bisa", "mampu", atau "dapat" di depan kata kerja.',
    contohPola: '食べられる (taberareru - bisa makan), 行ける (ikeru - bisa pergi)',
    perangkapUmum: 'Partikel objek yang biasanya "o" pada bentuk biasa sering berubah menjadi "ga" pada bentuk potensial.',
  },
  ukemikei: {
    id: 'ukemikei',
    jpName: '受身形',
    kanji: '受身形',
    romaji: 'ukemikei',
    idName: 'Bentuk Pasif (Dikenai Tindakan / Pasif Penderitaan Meiwaku)',
    category: 'konjugasi_verba',
    level: 'N4',
    penjelasanSingkat: 'Menyatakan bahwa subjek dikenai tindakan orang lain, sering bermakna dirugikan/direpotkan.',
    analogiIndonesia: 'Awalan "di-" atau "ter-" dalam bahasa Indonesia (misal: "dimarahi", "terinjak").',
    contohPola: '叱られる (shikarareru - dimarahi), 踏まれる (fumareru - terinjak)',
    perangkapUmum: 'Dalam bahasa Jepang ada "meiwaku ukemi" (pasif penderitaan), contoh: "ame ni furareta" (kehujanan sampai repot).',
  },
  shiekikei: {
    id: 'shiekikei',
    jpName: '使役形',
    kanji: '使役形',
    romaji: 'shiekikei',
    idName: 'Bentuk Kausatif (Menyuruh / Membiarkan / Mengizinkan)',
    category: 'konjugasi_verba',
    level: 'N4',
    penjelasanSingkat: 'Menyatakan subjek memerintahkan, memaksa, atau mengizinkan pihak lain melakukan aksi.',
    analogiIndonesia: 'Kata "menyuruh...", "membiarkan...", atau imbuhan "memper-...-kan".',
    contohPola: '食べさせる (tabesaseru - menyuruh makan), 行かせる (ikaseru - menyuruh pergi)',
    perangkapUmum: 'Orang yang disuruh ditandai dengan partikel "ni" (transitif) atau "o" (intransitif).',
  },
  shieki_ukemikei: {
    id: 'shieki_ukemikei',
    jpName: '使役受身形',
    kanji: '使役受身形',
    romaji: 'shieki ukemikei',
    idName: 'Bentuk Kausatif-Pasif (Terpaksa / Dipaksa Melakukan Sesuatu)',
    category: 'konjugasi_verba',
    level: 'N3',
    penjelasanSingkat: 'Kombinasi kausatif + pasif untuk menyatakan bahwa subjek dipaksa melakukan hal yang tidak diinginkannya.',
    analogiIndonesia: 'Frasa "terpaksa harus..." atau "dipaksa... padahal malas/enggan".',
    contohPola: '食べさせられる (tabesaserareru / tabesasareru - terpaksa makan), 待たされる (matasareru - dibuat menunggu lama)',
    perangkapUmum: 'Sering disingkat dalam percakapan: ikasaserareru -> ikasareru.',
  },

  // ── Keigo (Tata Bahasa Kehormatan) ──────────────────────────────
  sonkeigo: {
    id: 'sonkeigo',
    jpName: '尊敬語',
    kanji: '尊敬語',
    romaji: 'sonkeigo',
    idName: 'Sonkeigo (Bahasa Penghormatan untuk Meninggikan Lawan Bicara)',
    category: 'keigo',
    level: 'N4',
    penjelasanSingkat: 'Digunakan khusus untuk merujuk pada perbuatan atasan, pelanggan, atau orang yang dihormati.',
    analogiIndonesia: 'Kata-kata halus seperti "beliau bersabda / berkenan / rawuh".',
    contohPola: '召し上がる (meshiagaru - makan), いらっしゃる (irassharu - pergi/datang/ada)',
    perangkapUmum: 'JANGAN PERNAH gunakan sonkeigo untuk mendeskripsikan tindakan diri sendiri atau keluarga sendiri.',
  },
  kenjougo: {
    id: 'kenjougo',
    jpName: '謙譲語',
    kanji: '謙譲語',
    romaji: 'kenjougo',
    idName: 'Kenjougo (Bahasa Perendahan Diri untuk Merendahkan Tindakan Sendiri)',
    category: 'keigo',
    level: 'N4',
    penjelasanSingkat: 'Mengecilkan dan merendahkan perbuatan diri sendiri saat berhadapan dengan atasan atau pihak luar.',
    analogiIndonesia: 'Kata-kata santun seperti "hamba memohon", "saya menghaturkan", "saya sowan".',
    contohPola: 'いただく (itadaku - makan/menerima), 参る (mairu - pergi/datang), 申す (mousu - bernama)',
    perangkapUmum: 'JANGAN gunakan kenjougo untuk lawan bicara karena artinya merendahkan mereka.',
  },
  teineigo: {
    id: 'teineigo',
    jpName: '丁寧語',
    kanji: '丁寧語',
    romaji: 'teineigo',
    idName: 'Teineigo (Bahasa Sopan Standar desu/masu)',
    category: 'keigo',
    level: 'N5',
    penjelasanSingkat: 'Ragam bahasa santun standar yang netral dan aman dipakai kepada siapa pun.',
    analogiIndonesia: 'Bahasa Indonesia baku yang sopan dan menggunakan sapaan "Bapak/Ibu".',
    contohPola: '〜です (-desu), 〜ます (-masu), ございます (-gozaimasu)',
    perangkapUmum: 'Ragam standar yang wajib dikuasai sebelum mempelajari sonkeigo dan kenjougo.',
  },
};

/**
 * Mengambil detail istilah tata bahasa berdasarkan kunci pengenal.
 */
export function getGrammarTermId(termKey: string): GrammarTermDetail | undefined {
  return GRAMMAR_TAXONOMY_ID[termKey];
}

/**
 * Mengambil seluruh daftar taksonomi tata bahasa Indonesia standar.
 */
export function getAllGrammarTermsId(): GrammarTermDetail[] {
  return Object.values(GRAMMAR_TAXONOMY_ID);
}

/**
 * Mencari istilah tata bahasa berdasarkan kata kunci (Romaji, Kanji, atau Indonesia).
 */
export function searchGrammarTermsId(query: string): GrammarTermDetail[] {
  if (!query) return [];
  const q = query.toLowerCase().trim();
  return getAllGrammarTermsId().filter(
    (item) =>
      item.id.toLowerCase().includes(q) ||
      item.idName.toLowerCase().includes(q) ||
      item.romaji.toLowerCase().includes(q) ||
      item.kanji.includes(q) ||
      item.penjelasanSingkat.toLowerCase().includes(q)
  );
}
