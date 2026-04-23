// ──────────────────────────────────────────────────────────────
//  n5-expressions.js — Nugget Nihongo · JLPT N5 Grammar
//  5 entries | Category: expressions
//  Edit directly — merge with: node scripts/merge-grammar.js
// ──────────────────────────────────────────────────────────────

window.grammarN5_Expressions = [

{
    id         : 'gn5-00086',
    level      : 'n5',
    pattern    : 'N は ちょっと…',
    reading    : 'N wa chotto...',
    meaning    : '[N] agak... (penolakan tidak langsung / ekspresi keengganan)',
    cat        : 'expression',
    connection : 'N + は + ちょっと + … (kalimat digantung)',
    desc       : 'Ekspresi sopan untuk menyatakan keengganan atau ketidaksukaan tanpa mengatakan "tidak" secara langsung. Kalimat sengaja tidak diselesaikan — lawan bicara memahami maknanya dari konteks.',
    nuance     : 'ちょっと secara harfiah = sedikit, tapi dalam konteks ini menjadi eufemisme untuk penolakan. Sangat umum dan penting dalam komunikasi Jepang yang tidak langsung.',
    examples   : [
      { jp: 'わさびは、<b>ちょっと</b>…。', id: 'Wasabi... agak susah (tidak suka).' },
      { jp: '月曜日は、<b>ちょっと</b>…。', id: 'Senin itu... agak susah.' },
      { jp: 'それは<b>ちょっと</b>…。', id: 'Itu... agak...' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : 'polite',
    exceptions : null,
    notes      : 'Pattern from Irodori 入門 L5. Ekspresi khas budaya Jepang: indirect refusal.',
  },

{
    id         : 'gn5-00088',
    level      : 'n5',
    pattern    : 'N、【数】お願いします / ください',
    reading    : 'N, [number] onegaishimasu / kudasai',
    meaning    : 'tolong [N] sebanyak [jumlah] (memesan atau meminta barang)',
    cat        : 'expression',
    connection : 'N + jumlah (hitotsu/futatsu/...) + お願いします atau ください',
    desc       : 'Pola untuk memesan atau meminta barang dengan jumlah tertentu. Gunakan penghitung umum ひとつ・ふたつ・みっつ… untuk makanan/benda. Urutan: nama barang → jumlah → お願いします.',
    nuance     : 'お願いします lebih sopan dari ください. Di restoran, toko, dll. Untuk barang tipis/panjang/kecil gunakan penghitung spesifik (本、枚、冊, dll.).',
    examples   : [
      { jp: 'コーヒー、<b>ひとつお願いします</b>。', id: 'Satu kopi, tolong.' },
      { jp: '生ビール3つと、ウーロン茶1つ、<b>お願いします</b>。', id: 'Tiga bir draft dan satu oolong tea, tolong.' },
      { jp: 'これ、<b>ふたつください</b>。', id: 'Ini, dua, tolong.' },
    ],
    see_also_grammar : ['gn5-00030'],
    see_also_vocab   : [],
    register   : 'polite',
    exceptions : null,
    notes      : 'Pattern from Irodori 入門 L6.',
  },

{
    id         : 'gn5-00090',
    level      : 'n5',
    pattern    : 'どれ / どの N',
    reading    : 'dore / dono N',
    meaning    : 'yang mana (memilih dari beberapa pilihan)',
    cat        : 'interrogative',
    connection : 'どれ (berdiri sendiri) / どの + N',
    desc       : '<b>どれ</b> = "yang mana?" digunakan saat ada 3+ pilihan dan objeknya sudah diketahui. <b>どの+N</b> = "N yang mana?" Berbeda dengan どちら/どっち yang dipakai untuk 2 pilihan.',
    nuance     : 'どれ berdiri sendiri; どの selalu diikuti nomina. Untuk 2 pilihan, gunakan どちら/どっち. Untuk menanyakan orang, gunakan どの方/どなた (formal).',
    examples   : [
      { jp: '<b>どれ</b>がいいですか？', id: 'Yang mana yang bagus?' },
      { jp: '<b>どの</b>かばんですか？', id: 'Tas yang mana?' },
      { jp: '<b>どれ</b>にしますか？', id: 'Mau pilih yang mana?' },
    ],
    see_also_grammar : ['gn5-00018'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : 'Pattern from Irodori 入門 L9.',
  },

{
    id         : 'gn5-00091',
    level      : 'n5',
    pattern    : 'N が わかります / できます',
    reading    : 'N ga wakarimasu / dekimasu',
    meaning    : 'mengerti N / bisa melakukan N',
    cat        : 'expression',
    connection : 'N + が + わかります atau できます',
    desc       : 'Verba <b>わかります</b> (mengerti/paham) dan <b>できます</b> (bisa/mampu) digunakan dengan partikel <b>が</b>, bukan を. Partikel が menandai objek pemahaman/kemampuan.',
    nuance     : 'Kesalahan umum: menggunakan を alih-alih が. わかります dan できます adalah verba potensial/stative yang membutuhkan が. できます juga bisa digunakan dengan ことができます (gn5-00050).',
    examples   : [
      { jp: '日本語が少し<b>わかります</b>。', id: 'Saya sedikit mengerti bahasa Jepang.' },
      { jp: '料理が<b>できます</b>。', id: 'Saya bisa memasak.' },
      { jp: '漢字があまり<b>わかりません</b>。', id: 'Saya kurang paham kanji.' },
    ],
    see_also_grammar : ['gn5-00006', 'gn5-00050'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : 'Pattern from Irodori 入門 L12.',
  },

{
    id         : 'gn5-00093',
    level      : 'n5',
    pattern    : 'どんな N',
    reading    : 'donna N',
    meaning    : 'N seperti apa / N yang bagaimana (menanyakan deskripsi)',
    cat        : 'interrogative',
    connection : 'どんな + N + ですか？',
    desc       : '<b>どんな</b> digunakan untuk menanyakan deskripsi atau karakteristik sebuah nomina. Setara dengan "what kind of" atau "what is [N] like?" dalam bahasa Inggris. Jawaban biasanya berupa adjektif.',
    nuance     : 'Berbeda dengan どの (memilih dari pilihan tertentu). どんな menanyakan sifat umum tanpa referensi pilihan spesifik.',
    examples   : [
      { jp: '<b>どんな</b>人ですか？', id: 'Orangnya seperti apa?' },
      { jp: '<b>どんな</b>料理が好きですか？', id: 'Suka masakan seperti apa?' },
      { jp: '<b>どんな</b>仕事をしていますか？', id: 'Kamu bekerja di bidang apa?' },
    ],
    see_also_grammar : ['gn5-00090'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : 'Pattern from Irodori 入門 L15.',
  }

];
