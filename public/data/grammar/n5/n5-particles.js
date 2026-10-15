// ──────────────────────────────────────────────────────────────
//  n5-particles.js — Nugget Nihongo · JLPT N5 Grammar (Category: particles)
//  20 entries
//  Edit directly — merge with: node scripts/merge-grammar.js
// ──────────────────────────────────────────────────────────────

window.grammarN5_Particles = [

{
  "id": "gn5-00005",
  "level": "n5",
  "pattern": "は (topik)",
  "reading": "wa",
  "meaning": "partikel topik",
  "cat": "particle",
  "connection": "N + は",
  "desc": "<b>は</b> menandai topik kalimat — apa yang sedang dibicarakan. Berbeda dari が yang menandai subjek gramatikal.",
  "nuance": null,
  "examples": [
    {
      "jp": "<b>わたしは</b>にほんごを べんきょうします。",
      "id": "Saya belajar bahasa Jepang."
    },
    {
      "jp": "<b>このみせは</b>やすいです。",
      "id": "Toko ini murah."
    }
  ],
  "confusion_pairs": [
    "gn5-00006",
    "gn5-00016"
  ],
  "see_also_grammar": [
    "gn5-00006"
  ],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
},

{
  "id": "gn5-00006",
  "level": "n5",
  "pattern": "が (subjek)",
  "reading": "ga",
  "meaning": "partikel subjek",
  "cat": "particle",
  "connection": "N + が",
  "desc": "<b>が</b> menandai subjek gramatikal kalimat. Digunakan untuk menekankan subjek, dalam kalimat tanya dengan siapa/apa, atau dengan adjektif keadaan.",
  "nuance": null,
  "examples": [
    {
      "jp": "<b>だれが</b>きましたか。",
      "id": "Siapa yang datang?"
    },
    {
      "jp": "<b>ねこが</b>います。",
      "id": "Ada kucing."
    },
    {
      "jp": "<b>にほんごが</b>すきです。",
      "id": "Saya suka bahasa Jepang."
    }
  ],
  "confusion_pairs": [
    "gn5-00005",
    "gn5-00007",
    "gn5-00016"
  ],
  "see_also_grammar": [
    "gn5-00005"
  ],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
},

{
  "id": "gn5-00007",
  "level": "n5",
  "pattern": "を (objek)",
  "reading": "o",
  "meaning": "partikel objek langsung",
  "cat": "particle",
  "connection": "N + を + V",
  "desc": "<b>を</b> menandai objek langsung dari verba. Menunjukkan apa yang dikenai tindakan.",
  "nuance": null,
  "examples": [
    {
      "jp": "ごはん<b>を</b>たべます。",
      "id": "Makan nasi."
    },
    {
      "jp": "にほんご<b>を</b>べんきょうします。",
      "id": "Belajar bahasa Jepang."
    },
    {
      "jp": "おんがく<b>を</b>ききます。",
      "id": "Mendengarkan musik."
    }
  ],
  "confusion_pairs": [
    "gn5-00008",
    "gn5-00011",
    "gn5-00006"
  ],
  "see_also_grammar": [],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
},

{
  "id": "gn5-00008",
  "level": "n5",
  "pattern": "に (arah/tujuan)",
  "reading": "ni",
  "meaning": "partikel arah atau tujuan",
  "cat": "particle",
  "connection": "N (tempat/orang) + に + V (gerak/memberi)",
  "desc": "<b>に</b> menandai arah pergerakan atau tujuan. Juga menandai penerima dalam verba memberi/menerima.",
  "nuance": null,
  "examples": [
    {
      "jp": "がっこう<b>に</b>いきます。",
      "id": "Pergi ke sekolah."
    },
    {
      "jp": "ともだち<b>に</b>てがみをかきます。",
      "id": "Menulis surat kepada teman."
    }
  ],
  "confusion_pairs": [
    "gn5-00013",
    "gn5-00007",
    "gn5-00012"
  ],
  "see_also_grammar": [
    "gn5-00009",
    "gn5-00010",
    "gn5-00013"
  ],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
},

{
  "id": "gn5-00009",
  "level": "n5",
  "pattern": "に (keberadaan)",
  "reading": "ni",
  "meaning": "partikel lokasi keberadaan",
  "cat": "particle",
  "connection": "N (tempat) + に + N + が + あります/います",
  "desc": "<b>に</b> menandai lokasi tempat sesuatu berada, digunakan bersama あります (benda) atau います (makhluk hidup).",
  "nuance": null,
  "examples": [
    {
      "jp": "テーブルのうえ<b>に</b>ほんがあります。",
      "id": "Ada buku di atas meja."
    },
    {
      "jp": "こうえん<b>に</b>こどもがいます。",
      "id": "Ada anak-anak di taman."
    }
  ],
  "confusion_pairs": [
    "gn5-00011"
  ],
  "see_also_grammar": [
    "gn5-00008",
    "gn5-00058",
    "gn5-00059"
  ],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
},

{
  "id": "gn5-00010",
  "level": "n5",
  "pattern": "に (waktu)",
  "reading": "ni",
  "meaning": "partikel waktu spesifik",
  "cat": "particle",
  "connection": "N (waktu spesifik) + に",
  "desc": "<b>に</b> menandai waktu spesifik terjadinya suatu tindakan. Digunakan dengan angka waktu (jam, hari, bulan, tahun).",
  "nuance": null,
  "examples": [
    {
      "jp": "しちじ<b>に</b>おきます。",
      "id": "Bangun jam tujuh."
    },
    {
      "jp": "にちようび<b>に</b>えいがをみます。",
      "id": "Menonton film pada hari Minggu."
    }
  ],
  "confusion_pairs": [
    "gn5-00020",
    "gn4-00001"
  ],
  "see_also_grammar": [
    "gn5-00008"
  ],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
},

{
  "id": "gn5-00011",
  "level": "n5",
  "pattern": "で (lokasi tindakan)",
  "reading": "de",
  "meaning": "partikel lokasi tindakan",
  "cat": "particle",
  "connection": "N (tempat) + で + V (tindakan)",
  "desc": "<b>で</b> menandai tempat berlangsungnya suatu tindakan. Berbeda dari に yang menandai keberadaan/lokasi statis.",
  "nuance": null,
  "examples": [
    {
      "jp": "としょかん<b>で</b>べんきょうします。",
      "id": "Belajar di perpustakaan."
    },
    {
      "jp": "レストラン<b>で</b>たべます。",
      "id": "Makan di restoran."
    }
  ],
  "confusion_pairs": [
    "gn5-00009",
    "gn5-00007",
    "gn5-00062"
  ],
  "see_also_grammar": [
    "gn5-00009",
    "gn5-00012"
  ],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
},

{
  "id": "gn5-00012",
  "level": "n5",
  "pattern": "で (cara/alat)",
  "reading": "de",
  "meaning": "partikel cara atau alat",
  "cat": "particle",
  "connection": "N (alat/cara) + で + V",
  "desc": "<b>で</b> menandai alat, sarana, atau cara yang digunakan untuk melakukan tindakan.",
  "nuance": null,
  "examples": [
    {
      "jp": "はし<b>で</b>たべます。",
      "id": "Makan dengan sumpit."
    },
    {
      "jp": "でんしゃ<b>で</b>かいしゃへいきます。",
      "id": "Pergi ke kantor naik kereta."
    },
    {
      "jp": "にほんご<b>で</b>はなします。",
      "id": "Berbicara dalam bahasa Jepang."
    }
  ],
  "confusion_pairs": [
    "gn5-00008"
  ],
  "see_also_grammar": [
    "gn5-00011"
  ],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
},

{
  "id": "gn5-00013",
  "level": "n5",
  "pattern": "へ (arah)",
  "reading": "e",
  "meaning": "partikel arah pergerakan",
  "cat": "particle",
  "connection": "N (tempat) + へ + V (gerak)",
  "desc": "<b>へ</b> menandai arah pergerakan. Menekankan arah perjalanan menuju suatu tempat.",
  "nuance": null,
  "examples": [
    {
      "jp": "にほん<b>へ</b>いきたいです。",
      "id": "Ingin pergi ke Jepang."
    },
    {
      "jp": "うち<b>へ</b>かえります。",
      "id": "Pulang ke rumah."
    }
  ],
  "confusion_pairs": [
    "gn5-00008",
    "gn5-00020"
  ],
  "see_also_grammar": [
    "gn5-00008"
  ],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
},

{
  "id": "gn5-00014",
  "level": "n5",
  "pattern": "と (dan)",
  "reading": "to",
  "meaning": "partikel dan (menghubungkan nomina)",
  "cat": "particle",
  "connection": "N + と + N",
  "desc": "<b>と</b> menghubungkan dua nomina atau lebih dengan makna \"dan\". Berbeda dari や yang merupakan daftar tidak lengkap.",
  "nuance": null,
  "examples": [
    {
      "jp": "パン<b>と</b>ぎゅうにゅうをかいました。",
      "id": "Membeli roti dan susu."
    },
    {
      "jp": "やまだくん<b>と</b>すずきさんがきました。",
      "id": "Yamada-kun dan Suzuki-san datang."
    }
  ],
  "see_also_grammar": [
    "gn5-00015"
  ],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
},

{
  "id": "gn5-00015",
  "level": "n5",
  "pattern": "と (bersama)",
  "reading": "to",
  "meaning": "partikel bersama dengan",
  "cat": "particle",
  "connection": "N (orang) + と + V",
  "desc": "<b>と</b> menandai orang yang bersama-sama melakukan suatu tindakan.",
  "nuance": null,
  "examples": [
    {
      "jp": "ともだち<b>と</b>えいがをみます。",
      "id": "Menonton film bersama teman."
    },
    {
      "jp": "かぞく<b>と</b>りょこうしました。",
      "id": "Berwisata bersama keluarga."
    }
  ],
  "see_also_grammar": [
    "gn5-00014"
  ],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
},

{
  "id": "gn5-00016",
  "level": "n5",
  "pattern": "も (juga)",
  "reading": "mo",
  "meaning": "partikel juga / pun",
  "cat": "particle",
  "connection": "N + も",
  "desc": "<b>も</b> berarti \"juga\" atau \"pun\", menunjukkan bahwa sesuatu sama berlakunya dengan yang sudah disebutkan. Menggantikan は, が, atau を.",
  "nuance": null,
  "examples": [
    {
      "jp": "わたし<b>も</b>にほんごをべんきょうします。",
      "id": "Saya juga belajar bahasa Jepang."
    },
    {
      "jp": "すしがすきです。てんぷら<b>も</b>すきです。",
      "id": "Suka sushi. Juga suka tempura."
    }
  ],
  "confusion_pairs": [
    "gn5-00005",
    "gn5-00006"
  ],
  "see_also_grammar": [
    "gn5-00005"
  ],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
},

{
  "id": "gn5-00017",
  "level": "n5",
  "pattern": "の (posesif/modifikasi)",
  "reading": "no",
  "meaning": "partikel milik / modifikasi nomina",
  "cat": "particle",
  "connection": "N1 + の + N2",
  "desc": "<b>の</b> menghubungkan dua nomina: N1 memiliki atau menerangkan N2. Juga bisa menggantikan nomina yang sudah diketahui konteksnya.",
  "nuance": null,
  "examples": [
    {
      "jp": "わたし<b>の</b>ほん",
      "id": "buku saya"
    },
    {
      "jp": "にほんご<b>の</b>きょうかしょ",
      "id": "buku teks bahasa Jepang"
    },
    {
      "jp": "どれがあなた<b>の</b>ですか。",
      "id": "Yang mana milik kamu?"
    }
  ],
  "see_also_grammar": [],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
},

{
  "id": "gn5-00018",
  "level": "n5",
  "pattern": "か (tanya)",
  "reading": "ka",
  "meaning": "partikel pertanyaan",
  "cat": "particle",
  "connection": "文 + か",
  "desc": "<b>か</b> di akhir kalimat mengubahnya menjadi kalimat tanya. Dalam gaya polite, tidak memerlukan tanda tanya.",
  "nuance": null,
  "examples": [
    {
      "jp": "これはほんです<b>か</b>。",
      "id": "Apakah ini buku?"
    },
    {
      "jp": "なんじですか。",
      "id": "Jam berapa sekarang?"
    }
  ],
  "see_also_grammar": [],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
},

{
  "id": "gn5-00019",
  "level": "n5",
  "pattern": "ね / よ / よね (kalimat akhir)",
  "reading": "ne / yo / yone",
  "meaning": "partikel akhir kalimat",
  "cat": "particle",
  "connection": "文 + ね / よ / よね",
  "desc": "<b>ね</b>: mencari persetujuan pendengar (\"kan?\", \"ya?\"). <b>よ</b>: menegaskan informasi kepada pendengar. <b>よね</b>: menegaskan sekaligus mencari konfirmasi.",
  "nuance": null,
  "examples": [
    {
      "jp": "いいてんきです<b>ね</b>。",
      "id": "Cuaca bagus, ya."
    },
    {
      "jp": "このみちをまっすぐいけばいいです<b>よ</b>。",
      "id": "Lurus saja di jalan ini."
    },
    {
      "jp": "あしたはやすみです<b>よね</b>。",
      "id": "Besok libur, kan?"
    }
  ],
  "see_also_grammar": [],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
},

{
  "id": "gn5-00020",
  "level": "n5",
  "pattern": "から / まで",
  "reading": "kara / made",
  "meaning": "dari ... sampai ...",
  "cat": "particle",
  "connection": "N (awal) + から + N (akhir) + まで",
  "desc": "<b>から</b> menandai titik awal (waktu atau tempat). <b>まで</b> menandai titik akhir. Bisa dipakai sendiri-sendiri atau bersama.",
  "nuance": null,
  "examples": [
    {
      "jp": "くじ<b>から</b>ごご六じ<b>まで</b>はたらきます。",
      "id": "Bekerja dari jam 9 sampai jam 6 sore."
    },
    {
      "jp": "とうきょう<b>から</b>おおさか<b>まで</b>しんかんせんでいきます。",
      "id": "Pergi dari Tokyo ke Osaka naik shinkansen."
    }
  ],
  "confusion_pairs": [
    "gn5-00010",
    "gn5-00013"
  ],
  "see_also_grammar": [],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
},

{
  "id": "gn5-00021",
  "level": "n5",
  "pattern": "より (perbandingan)",
  "reading": "yori",
  "meaning": "lebih dari / dibanding",
  "cat": "particle",
  "connection": "N + より",
  "desc": "<b>より</b> digunakan dalam perbandingan, berarti \"lebih dari\" atau \"dibanding\".",
  "nuance": null,
  "examples": [
    {
      "jp": "でんしゃはバス<b>より</b>はやいです。",
      "id": "Kereta lebih cepat dari bus."
    },
    {
      "jp": "きのう<b>より</b>きょうのほうがさむいです。",
      "id": "Hari ini lebih dingin dari kemarin."
    }
  ],
  "see_also_grammar": [
    "gn5-00052",
    "gn5-00053"
  ],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
},

{
  "id": "gn5-00022",
  "level": "n5",
  "pattern": "だけ (hanya)",
  "reading": "dake",
  "meaning": "hanya / saja",
  "cat": "particle",
  "connection": "N / Vる / Vた + だけ",
  "desc": "<b>だけ</b> membatasi jumlah atau cakupan: \"hanya\", \"cuma\", \"saja\".",
  "nuance": null,
  "examples": [
    {
      "jp": "みず<b>だけ</b>のみます。",
      "id": "Minum air saja."
    },
    {
      "jp": "ひとつ<b>だけ</b>ください。",
      "id": "Tolong satu saja."
    }
  ],
  "confusion_pairs": [
    "gn3-00036",
    "gn4-00010",
    "gn5-00023"
  ],
  "see_also_grammar": [
    "gn5-00023"
  ],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
},

{
  "id": "gn5-00023",
  "level": "n5",
  "pattern": "しか〜ない",
  "reading": "shika〜nai",
  "meaning": "hanya (dengan negatif)",
  "cat": "particle",
  "connection": "N + しか + Vない",
  "desc": "<b>しか〜ない</b> berarti \"hanya\", tapi selalu diikuti bentuk negatif. Sering menyiratkan rasa kurang puas atau terbatas.",
  "nuance": null,
  "examples": [
    {
      "jp": "お金が100円<b>しか</b>ありません。",
      "id": "Uangnya cuma ada 100 yen."
    },
    {
      "jp": "かれ<b>しか</b>しらない。",
      "id": "Hanya dia yang tahu."
    }
  ],
  "confusion_pairs": [
    "gn5-00022"
  ],
  "see_also_grammar": [
    "gn5-00022"
  ],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
},

{
  "id": "gn5-00085",
  "level": "n5",
  "pattern": "から (asal/arah datang)",
  "reading": "kara (asal)",
  "meaning": "dari [tempat/orang] — menunjukkan asal atau titik keberangkatan",
  "cat": "particle",
  "connection": "【場所/人】から + V kedatangan (来ます、帰ります、dll.)",
  "desc": "Partikel <b>から</b> menunjukkan asal atau titik keberangkatan. Pada level ini diajarkan sebagai pola tetap <b>【場所】から来ました</b> untuk menyatakan asal negara/kota.",
  "nuance": null,
  "examples": [
    {
      "jp": "ブラジル<b>から</b>来ました。",
      "id": "Saya berasal dari Brasil."
    },
    {
      "jp": "インドネシア<b>から</b>来ました。",
      "id": "Saya dari Indonesia."
    },
    {
      "jp": "大阪<b>から</b>来ました。",
      "id": "Saya datang dari Osaka."
    }
  ],
  "see_also_grammar": [
    "gn5-00020"
  ],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
}

];
