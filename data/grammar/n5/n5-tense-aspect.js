// ──────────────────────────────────────────────────────────────
//  n5-tense-aspect.js — Nugget Nihongo · JLPT N5 Grammar (Category: tense-aspect)
//  14 entries
//  Edit directly — merge with: node scripts/merge-grammar.js
// ──────────────────────────────────────────────────────────────

window.grammarN5_Tense_Aspect = [

{
  "id": "gn5-00028",
  "level": "n5",
  "pattern": "〜た (lampau plain)",
  "reading": "〜ta",
  "meaning": "lampau bentuk biasa",
  "cat": "past-tense",
  "connection": "V → Vた",
  "desc": "Bentuk lampau verba dalam gaya biasa. Terbentuk dari bentuk te dengan mengganti て/で menjadi た/だ.",
  "nuance": null,
  "examples": [
    {
      "jp": "きのうえいがを<b>みた</b>。",
      "id": "Kemarin nonton film."
    },
    {
      "jp": "ごはんを<b>たべた</b>。",
      "id": "Sudah makan nasi."
    }
  ],
  "see_also_grammar": [
    "gn5-00027"
  ],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
},

{
  "id": "gn5-00029",
  "level": "n5",
  "pattern": "〜ている",
  "reading": "〜te iru",
  "meaning": "sedang ... / dalam keadaan ...",
  "cat": "progressive-state",
  "connection": "Vて + いる",
  "desc": "<b>〜ている</b> menyatakan: (1) tindakan yang sedang berlangsung, atau (2) keadaan hasil dari suatu tindakan yang sudah terjadi.",
  "nuance": null,
  "examples": [
    {
      "jp": "いまほんを<b>よんでいます</b>。",
      "id": "Sekarang sedang membaca buku."
    },
    {
      "jp": "かれはけっこんして<b>います</b>。",
      "id": "Dia sudah menikah (dalam keadaan menikah)."
    },
    {
      "jp": "あめがふって<b>います</b>。",
      "id": "Sedang hujan."
    }
  ],
  "confusion_pairs": [
    "gn3-00134",
    "gn5-00089",
    "gn4-00014",
    "gn4-00018",
    "gn3-00129",
    "gn3-00085",
    "gn2-00294",
    "gn1-00186"
  ],
  "see_also_grammar": [],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
},

{
  "id": "gn5-00033",
  "level": "n5",
  "pattern": "〜てから",
  "reading": "〜te kara",
  "meaning": "setelah melakukan ...",
  "cat": "sequential-temporal",
  "connection": "Vて + から + V2",
  "desc": "<b>〜てから</b> menyatakan bahwa tindakan pertama selesai, baru kemudian tindakan kedua dilakukan.",
  "nuance": null,
  "examples": [
    {
      "jp": "てを<b>あらってから</b>たべます。",
      "id": "Cuci tangan dulu baru makan."
    },
    {
      "jp": "しゅくだいをして<b>から</b>、あそびましょう。",
      "id": "Setelah PR selesai, mari bermain."
    }
  ],
  "confusion_pairs": [
    "gn5-00054",
    "gn5-00055",
    "gn3-00091",
    "gn3-00011",
    "gn2-00006",
    "gn2-00114",
    "gn1-00018",
    "gn1-00028",
    "gn1-00045"
  ],
  "see_also_grammar": [
    "gn5-00047"
  ],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
},

{
  "id": "gn5-00034",
  "level": "n5",
  "pattern": "〜ながら",
  "reading": "〜nagara",
  "meaning": "sambil ...",
  "cat": "sequential-temporal",
  "connection": "V-ます語幹 + ながら",
  "desc": "<b>〜ながら</b> menyatakan dua tindakan dilakukan secara bersamaan oleh subjek yang sama. Tindakan kedua (setelah ながら) biasanya adalah tindakan utama.",
  "nuance": null,
  "examples": [
    {
      "jp": "おんがくをき<b>きながら</b>べんきょうします。",
      "id": "Belajar sambil mendengarkan musik."
    },
    {
      "jp": "あるき<b>ながら</b>はなします。",
      "id": "Berbicara sambil berjalan."
    }
  ],
  "see_also_grammar": [],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
},

{
  "id": "gn5-00036",
  "level": "n5",
  "pattern": "〜てみる",
  "reading": "〜te miru",
  "meaning": "mencoba melakukan ...",
  "cat": "inception-continuation",
  "connection": "Vて + みる",
  "desc": "<b>〜てみる</b> menyatakan mencoba melakukan sesuatu untuk pertama kali atau untuk melihat hasilnya.",
  "nuance": null,
  "examples": [
    {
      "jp": "すしを<b>たべてみました</b>。",
      "id": "Mencoba makan sushi."
    },
    {
      "jp": "このみちをあるい<b>てみましょう</b>。",
      "id": "Coba berjalan di jalan ini."
    }
  ],
  "confusion_pairs": [
    "gn3-00172"
  ],
  "see_also_grammar": [],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
},

{
  "id": "gn5-00051",
  "level": "n5",
  "pattern": "〜ことがある",
  "reading": "〜koto ga aru",
  "meaning": "pernah ... / kadang-kadang ...",
  "cat": "completion-regret",
  "connection": "Vた + ことがある (pengalaman) / Vる + ことがある (kadang-kadang)",
  "desc": "<b>Vた + ことがある</b>: pernah melakukan sesuatu (pengalaman). <b>Vる + ことがある</b>: kadang-kadang terjadi sesuatu.",
  "nuance": null,
  "examples": [
    {
      "jp": "にほんへ<b>いったことがあります</b>。",
      "id": "Pernah pergi ke Jepang."
    },
    {
      "jp": "にほんごをわすれる<b>ことがある</b>。",
      "id": "Kadang-kadang lupa bahasa Jepang."
    }
  ],
  "confusion_pairs": [
    "gn3-00179"
  ],
  "see_also_grammar": [
    "gn5-00050"
  ],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
},

{
  "id": "gn5-00054",
  "level": "n5",
  "pattern": "〜前に",
  "reading": "〜mae ni",
  "meaning": "sebelum ...",
  "cat": "sequential-temporal",
  "connection": "Vる / N + の + 前に",
  "desc": "<b>〜前に</b> menyatakan suatu tindakan dilakukan sebelum tindakan lain. Verba sebelum 前に selalu dalam bentuk present/dictionary form.",
  "nuance": null,
  "examples": [
    {
      "jp": "ねる<b>まえに</b>、はをみがきます。",
      "id": "Sikat gigi sebelum tidur."
    },
    {
      "jp": "しょくじの<b>まえに</b>てをあらいます。",
      "id": "Cuci tangan sebelum makan."
    }
  ],
  "confusion_pairs": [
    "gn5-00055",
    "gn5-00033",
    "gn2-00106",
    "gn2-00132",
    "gn1-00036"
  ],
  "see_also_grammar": [
    "gn5-00055"
  ],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
},

{
  "id": "gn5-00055",
  "level": "n5",
  "pattern": "〜後で",
  "reading": "〜ato de",
  "meaning": "setelah ...",
  "cat": "sequential-temporal",
  "connection": "Vた / N + の + 後で",
  "desc": "<b>〜後で</b> menyatakan suatu tindakan dilakukan setelah tindakan lain. Verba sebelum 後で selalu dalam bentuk lampau.",
  "nuance": null,
  "examples": [
    {
      "jp": "しゅくだいをした<b>あとで</b>、あそびます。",
      "id": "Bermain setelah PR selesai."
    },
    {
      "jp": "しょくじの<b>あとで</b>コーヒーをのみます。",
      "id": "Minum kopi setelah makan."
    }
  ],
  "confusion_pairs": [
    "gn5-00033",
    "gn5-00054"
  ],
  "see_also_grammar": [
    "gn5-00054",
    "gn5-00033"
  ],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
},

{
  "id": "gn5-00056",
  "level": "n5",
  "pattern": "〜とき",
  "reading": "〜toki",
  "meaning": "ketika ... / saat ...",
  "cat": "sequential-temporal",
  "connection": "V plain / Adj plain / N + の + とき",
  "desc": "<b>〜とき</b> menyatakan waktu atau keadaan ketika sesuatu terjadi. Bentuk verba sebelum とき tergantung hubungan waktu kedua klausa.",
  "nuance": null,
  "examples": [
    {
      "jp": "こどものとき、よくやまへいきました。",
      "id": "Waktu kecil, sering pergi ke gunung."
    },
    {
      "jp": "にほんへいく<b>とき</b>、かいものをします。",
      "id": "Saat pergi ke Jepang, saya belanja."
    }
  ],
  "confusion_pairs": [
    "gn1-00184",
    "gn4-00016"
  ],
  "see_also_grammar": [
    "gn5-00054",
    "gn5-00055"
  ],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
},

{
  "id": "gn5-00063",
  "level": "n5",
  "pattern": "〜になる",
  "reading": "〜ni naru",
  "meaning": "menjadi ...",
  "cat": "inception-continuation",
  "connection": "N / Adj-na + に + なる / Adj-i → Adj-く + なる",
  "desc": "<b>〜になる</b> menyatakan perubahan keadaan: menjadi sesuatu yang berbeda dari sebelumnya.",
  "nuance": null,
  "examples": [
    {
      "jp": "はるになりました。",
      "id": "Sudah menjadi musim semi."
    },
    {
      "jp": "にほんごが<b>じょうずになりたい</b>です。",
      "id": "Ingin menjadi mahir berbahasa Jepang."
    },
    {
      "jp": "そとが<b>くらくなった</b>。",
      "id": "Di luar menjadi gelap."
    }
  ],
  "confusion_pairs": [
    "gn5-00064",
    "gn5-00053"
  ],
  "see_also_grammar": [
    "gn5-00064"
  ],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
},

{
  "id": "gn5-00064",
  "level": "n5",
  "pattern": "〜にする",
  "reading": "〜ni suru",
  "meaning": "menjadikan ... / memilih ...",
  "cat": "inception-continuation",
  "connection": "N / Adj-na + に + する / Adj-i → Adj-く + する",
  "desc": "<b>〜にする</b> menyatakan memilih sesuatu, menjadikan sesuatu dalam keadaan tertentu, atau mengubah sesuatu secara sengaja.",
  "nuance": null,
  "examples": [
    {
      "jp": "のみものはコーヒー<b>にします</b>。",
      "id": "Minumannya saya pilih kopi."
    },
    {
      "jp": "へやをきれい<b>にしました</b>。",
      "id": "Membuat kamar menjadi bersih."
    }
  ],
  "confusion_pairs": [
    "gn5-00063",
    "gn2-00021",
    "gn5-00052"
  ],
  "see_also_grammar": [
    "gn5-00063"
  ],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
},

{
  "id": "gn5-00080",
  "level": "n5",
  "pattern": "〜てしまう",
  "reading": "〜te shimau",
  "meaning": "sudah ... (selesai/tidak sengaja)",
  "cat": "completion-regret",
  "connection": "Vて + しまう",
  "desc": "<b>〜てしまう</b> menyatakan: (1) suatu tindakan selesai secara total, atau (2) melakukan sesuatu secara tidak sengaja/menyesal.",
  "nuance": null,
  "examples": [
    {
      "jp": "しゅくだいをぜんぶやって<b>しまいました</b>。",
      "id": "PR sudah selesai dikerjakan semua."
    },
    {
      "jp": "さいふをわすれて<b>しまった</b>！",
      "id": "Tidak sengaja lupa dompet!"
    }
  ],
  "confusion_pairs": [
    "gn3-00134",
    "gn3-00133"
  ],
  "see_also_grammar": [
    "gn5-00029"
  ],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
},

{
  "id": "gn5-00082",
  "level": "n5",
  "pattern": "もう V-ました",
  "reading": "mou V-mashita",
  "meaning": "sudah V (selesai)",
  "cat": "completion-regret",
  "connection": "もう + V(ます-form past)",
  "desc": "<b>もう V-ました</b> menyatakan bahwa suatu tindakan sudah selesai dilakukan. もう menambah nuansa \"sudah\" atau \"sekarang sudah\".",
  "nuance": null,
  "examples": [
    {
      "jp": "<b>もう</b>宿題をしました。",
      "id": "Saya sudah mengerjakan PR."
    },
    {
      "jp": "荷物は<b>もう</b>送りましたか？",
      "id": "Apakah barang bawaannya sudah dikirim?"
    },
    {
      "jp": "<b>もう</b>ご飯を食べましたか？",
      "id": "Apakah kamu sudah makan?"
    }
  ],
  "confusion_pairs": [
    "gn5-00083"
  ],
  "see_also_grammar": [
    "gn5-00083"
  ],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
},

{
  "id": "gn5-00083",
  "level": "n5",
  "pattern": "まだ V-ます / まだ V-ていません",
  "reading": "mada V-masu / mada V-te imasen",
  "meaning": "masih V / belum V",
  "cat": "progressive-state",
  "connection": "まだ + V(ます) または まだ + V-ていません",
  "desc": "<b>まだ V-ます</b> = masih melakukan V (sedang berlanjut). <b>まだ V-ていません</b> = belum selesai melakukan V.",
  "nuance": null,
  "examples": [
    {
      "jp": "<b>まだ</b>仕事をしています。",
      "id": "Saya masih bekerja."
    },
    {
      "jp": "報告書は<b>まだ</b>書いていません。",
      "id": "Laporan belum saya tulis."
    },
    {
      "jp": "<b>まだ</b>決めていません。",
      "id": "Saya belum memutuskan."
    }
  ],
  "confusion_pairs": [
    "gn5-00082"
  ],
  "see_also_grammar": [
    "gn5-00082"
  ],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
}

];
