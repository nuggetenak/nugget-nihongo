// ══════════════════════════════════════════════════════════════════
//  kotowaza.ts — Koleksi Peribahasa & Filosofi Bahasa Jepang
//  Dipilih secara deterministik per hari untuk inspirasi belajar
// ══════════════════════════════════════════════════════════════════

export interface Kotowaza {
  id: string;
  jp: string;
  reading: string;
  romaji: string;
  meaning: string;
  wisdom: string;
  category: string;
}

export const KOTOWAZA_COLLECTION: Kotowaza[] = [
  {
    id: 'ktw-01',
    jp: '七転び八起き',
    reading: 'ななころびやおき',
    romaji: 'Nana korobi ya oki',
    meaning: 'Jatuh tujuh kali, bangkit delapan kali',
    wisdom: 'Simbol ketabahan sejati (ganbaru). Jangan pernah menyerah meskipun berkali-kali menghadapi kesulitan dalam belajar.',
    category: 'Ketekunan',
  },
  {
    id: 'ktw-02',
    jp: '一期一会',
    reading: 'いちごいちえ',
    romaji: 'Ichigo ichie',
    meaning: 'Satu kesempatan, satu pertemuan seumur hidup',
    wisdom: 'Berasal dari upacara minum teh (Chanoyu). Hargai setiap momen dan pertemuan belajar hari ini karena tak akan terulang sama persis.',
    category: 'Kesadaran Diri',
  },
  {
    id: 'ktw-03',
    jp: '塵も積もれば山となる',
    reading: 'ちりもつもればやまとなる',
    romaji: 'Chiri mo tsumoreba yama to naru',
    meaning: 'Debu yang terkumpul lama-lama akan menjadi gunung',
    wisdom: 'Sedikit demi sedikit, lama-lama menjadi bukit. Belajar 5 kata per hari akan menjadi ribuan kosa kata dalam hitungan bulan.',
    category: 'Konsistensi',
  },
  {
    id: 'ktw-04',
    jp: '継続は力なり',
    reading: 'けいぞくはちからなり',
    romaji: 'Keizoku wa chikara nari',
    meaning: 'Konsistensi adalah kekuatan sejati',
    wisdom: 'Bukan kepintaran sesaat yang membuat seseorang mahir berbahasa Jepang, melainkan kebiasaan konsisten yang diulang setiap hari.',
    category: 'Konsistensi',
  },
  {
    id: 'ktw-05',
    jp: '猿も木から落ちる',
    reading: 'さるもきからおちる',
    romaji: 'Saru mo ki kara ochiru',
    meaning: 'Bahkan monyet pun bisa jatuh dari pohon',
    wisdom: 'Bahkan seorang ahli sekalipun bisa membuat kekeliruan. Jangan takut salah saat menjawab kuis atau berbicara bahasa Jepang.',
    category: 'Kerendahan Hati',
  },
  {
    id: 'ktw-06',
    jp: '石の上にも三年',
    reading: 'いしのうえにもさんねん',
    romaji: 'Ishi no ue ni mo sannen',
    meaning: 'Duduk di atas batu dingin selama tiga tahun pun akan menjadi hangat',
    wisdom: 'Kesabaran akan membuahkan hasil manis. Menguasai kanji dan tata bahasa membutuhkan waktu dan ketekunan yang tenang.',
    category: 'Kesabaran',
  },
  {
    id: 'ktw-07',
    jp: '千里の道も一歩から',
    reading: 'せんりのみちもいっぽから',
    romaji: 'Senri no michi mo ippo kara',
    meaning: 'Perjalanan seribu ri dimulai dari satu langkah pertama',
    wisdom: 'Langkah pertama sering kali terasa paling berat. Mulailah dari satu huruf Hiragana hari ini, dan jalan panjangmu akan terbuka lebar.',
    category: 'Permulaan',
  },
  {
    id: 'ktw-08',
    jp: '急がば回れ',
    reading: 'いそがばまわれ',
    romaji: 'Isogaba maware',
    meaning: 'Jika terburu-buru, pilihlah jalan memutar yang aman',
    wisdom: 'Biar lambat asal selamat. Jangan terburu-buru menghafal rumus cepat tanpa memahami dasar partikel dan akar katanya.',
    category: 'Kebijaksanaan',
  },
  {
    id: 'ktw-09',
    jp: '習うより慣れよ',
    reading: 'ならうよりなれよ',
    romaji: 'Narau yori nare yo',
    meaning: 'Lebih baik membiasakan diri daripada sekadar belajar teori',
    wisdom: 'Praktik langsung lewat mendengarkan dan membuat kalimat jauh lebih efektif daripada sekadar menghafal buku tata bahasa secara pasif.',
    category: 'Praktik',
  },
  {
    id: 'ktw-10',
    jp: '雨降って地固まる',
    reading: 'あめふってじかたまる',
    romaji: 'Ame futte ji katamaru',
    meaning: 'Setelah hujan badai turun, tanah justru menjadi semakin padat dan kokoh',
    wisdom: 'Kekeliruan dan kesulitan dalam ujian justru akan memperkuat pemahamanmu untuk jangka panjang.',
    category: 'Optimisme',
  },
  {
    id: 'ktw-11',
    jp: '初心忘るべからず',
    reading: 'しょしんわするべからず',
    romaji: 'Shoshin wasuru bekarazu',
    meaning: 'Jangan pernah melupakan niat awalmu saat pertama kali memulai',
    wisdom: 'Berasal dari teater Noh Zeami. Saat merasa jenuh di level menengah, ingatlah kembali alasan pertama mengapa kamu mencintai bahasa Jepang.',
    category: 'Motivasi',
  },
  {
    id: 'ktw-12',
    jp: '善は急げ',
    reading: 'ぜんはいそげ',
    romaji: 'Zen wa isoge',
    meaning: 'Kebaikan harus disegerakan tanpa menunda',
    wisdom: 'Ketika memiliki niat baik untuk belajar hari ini, segera lakukan sekarang tanpa menunggu nanti malam atau besok.',
    category: 'Aksi',
  },
];

export function getDailyKotowaza(): Kotowaza {
  const dayIndex = Math.floor(Date.now() / 86400000);
  return KOTOWAZA_COLLECTION[dayIndex % KOTOWAZA_COLLECTION.length];
}
