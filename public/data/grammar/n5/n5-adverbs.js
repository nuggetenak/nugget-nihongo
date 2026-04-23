// ──────────────────────────────────────────────────────────────
//  n5-adverbs.js — Nugget Nihongo · JLPT N5 Grammar
//  1 entries | Category: adverbs
//  Edit directly — merge with: node scripts/merge-grammar.js
// ──────────────────────────────────────────────────────────────

window.grammarN5_Adverbs = [

{
    id         : 'gn5-00087',
    level      : 'n5',
    pattern    : 'いつも / よく / あまり〜ない',
    reading    : 'itsumo / yoku / amari〜nai',
    meaning    : 'selalu / sering / jarang (adverbia frekuensi)',
    cat        : 'adverb',
    connection : 'Adverbia + V-ます / V-ません',
    desc       : 'Adverbia yang menyatakan frekuensi kegiatan: <b>いつも</b> (selalu, setiap saat), <b>よく</b> (sering), <b>あまり</b> (jarang — harus dipakai dengan bentuk negatif).',
    nuance     : 'あまり HARUS diikuti negatif (あまり〜ません/ない). Jika dipakai dengan positif artinya berbeda. たいてい (biasanya) dan ときどき (kadang-kadang) adalah adverbia frekuensi terkait.',
    examples   : [
      { jp: '<b>いつも</b>バスで行きます。', id: 'Saya selalu pergi naik bus.' },
      { jp: '<b>よく</b>図書館で勉強します。', id: 'Saya sering belajar di perpustakaan.' },
      { jp: 'お肉は<b>あまり</b>食べません。', id: 'Saya jarang makan daging.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : 'あまり hanya digunakan dengan bentuk negatif untuk menyatakan frekuensi rendah.',
    notes      : 'Pattern from Irodori 入門 L5.',
  }

];
