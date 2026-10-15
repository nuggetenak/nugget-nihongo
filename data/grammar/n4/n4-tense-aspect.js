// ──────────────────────────────────────────────────────────────
//  n4-tense-aspect.js — Nugget Nihongo · JLPT N4 Grammar (Category: tense-aspect)
//  19 entries
//  Edit directly — merge with: node scripts/merge-grammar.js
// ──────────────────────────────────────────────────────────────

window.grammarN4_Tense_Aspect = [

{
  "id": "gn4-00011",
  "level": "n4",
  "pattern": "〜までに",
  "reading": "〜made ni",
  "meaning": "paling lambat ... / sebelum ...",
  "cat": "sequential-temporal",
  "connection": "N (waktu) / Vる + までに",
  "desc": "<b>〜までに</b> menyatakan batas waktu: tindakan harus selesai sebelum atau pada waktu tersebut. Berbeda dari まで yang menyatakan durasi.",
  "nuance": null,
  "examples": [
    {
      "jp": "レポートは15日<b>までに</b>出してください。",
      "id": "Tolong kumpulkan laporan paling lambat tanggal 15."
    },
    {
      "jp": "9時<b>までに</b>来てください。",
      "id": "Tolong datang sebelum jam 9."
    }
  ],
  "confusion_pairs": [
    "gn4-00092",
    "gn2-00109",
    "gn1-00016",
    "gn1-00097",
    "gn1-00093"
  ],
  "see_also_grammar": [],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
},

{
  "id": "gn4-00012",
  "level": "n4",
  "pattern": "〜間に (あいだに)",
  "reading": "〜aida ni",
  "meaning": "selagi ... / sementara ...",
  "cat": "sequential-temporal",
  "connection": "N + の + 間に / Vている + 間に",
  "desc": "<b>〜間に</b> menyatakan suatu tindakan/kejadian lain terjadi di dalam rentang waktu tertentu. Menekankan bahwa kejadian sisipan terjadi di dalam durasi tersebut.",
  "nuance": null,
  "examples": [
    {
      "jp": "夏休みの<b>間に</b>旅行する予定です。",
      "id": "Saya berencana berwisata selama liburan musim panas."
    },
    {
      "jp": "買い物に行っている<b>間に</b>、友だちが来ました。",
      "id": "Selagi saya pergi belanja, teman datang."
    }
  ],
  "confusion_pairs": [
    "gn3-00007"
  ],
  "see_also_grammar": [],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
},

{
  "id": "gn4-00013",
  "level": "n4",
  "pattern": "Vるところ",
  "reading": "V-ru tokoro",
  "meaning": "tepat akan ...",
  "cat": "completion-regret",
  "connection": "Vる + ところです",
  "desc": "<b>Vるところ</b> menyatakan bahwa suatu tindakan tepat akan dimulai (belum dimulai).",
  "nuance": null,
  "examples": [
    {
      "jp": "今から家を出る<b>ところ</b>です。",
      "id": "Saya tepat akan keluar rumah sekarang."
    },
    {
      "jp": "これから食事を始める<b>ところ</b>です。",
      "id": "Saya tepat akan mulai makan."
    }
  ],
  "confusion_pairs": [
    "gn3-00172"
  ],
  "see_also_grammar": [
    "gn4-00014",
    "gn4-00015"
  ],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
},

{
  "id": "gn4-00014",
  "level": "n4",
  "pattern": "Vているところ",
  "reading": "V-te iru tokoro",
  "meaning": "tepat sedang ...",
  "cat": "completion-regret",
  "connection": "Vている + ところです",
  "desc": "<b>Vているところ</b> menyatakan bahwa suatu tindakan tepat sedang berlangsung pada saat ini.",
  "nuance": null,
  "examples": [
    {
      "jp": "今、料理を作っている<b>ところ</b>です。",
      "id": "Sekarang saya tepat sedang memasak."
    },
    {
      "jp": "今、会議中です。話し合っている<b>ところ</b>です。",
      "id": "Sekarang sedang rapat. Tepat sedang berdiskusi."
    }
  ],
  "confusion_pairs": [
    "gn5-00029"
  ],
  "see_also_grammar": [
    "gn4-00013",
    "gn4-00015"
  ],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
},

{
  "id": "gn4-00015",
  "level": "n4",
  "pattern": "Vたところ",
  "reading": "V-ta tokoro",
  "meaning": "baru saja selesai ...",
  "cat": "completion-regret",
  "connection": "Vた + ところです",
  "desc": "<b>Vたところ</b> menyatakan bahwa suatu tindakan baru saja selesai (momen sangat dekat).",
  "nuance": null,
  "examples": [
    {
      "jp": "今、授業が終わった<b>ところ</b>です。",
      "id": "Pelajaran baru saja selesai."
    },
    {
      "jp": "「宿題終わった？」「今終わった<b>ところ</b>。」",
      "id": "\"PR-nya sudah selesai?\" \"Baru saja selesai.\""
    }
  ],
  "confusion_pairs": [
    "gn4-00010",
    "gn4-00091"
  ],
  "see_also_grammar": [
    "gn4-00013",
    "gn4-00014"
  ],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
},

{
  "id": "gn4-00017",
  "level": "n4",
  "pattern": "Vておく",
  "reading": "V-te oku",
  "meaning": "melakukan ... terlebih dahulu (persiapan)",
  "cat": "progressive-state",
  "connection": "Vて + おく",
  "desc": "<b>Vておく</b> menyatakan melakukan sesuatu terlebih dahulu sebagai persiapan, atau membiarkan sesuatu dalam keadaan tertentu.",
  "nuance": null,
  "examples": [
    {
      "jp": "旅行の前にホテルを予約して<b>おきます</b>。",
      "id": "Sebelum berwisata, saya pesan hotel terlebih dahulu."
    },
    {
      "jp": "ドアを開け<b>ておいて</b>ください。",
      "id": "Tolong biarkan pintu tetap terbuka."
    }
  ],
  "confusion_pairs": [
    "gn3-00134",
    "gn3-00131",
    "gn4-00018"
  ],
  "see_also_grammar": [],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
},

{
  "id": "gn4-00018",
  "level": "n4",
  "pattern": "V(他動詞)てある",
  "reading": "V-tadoushi-te aru",
  "meaning": "sudah dilakukan (keadaan hasil dari tindakan sengaja)",
  "cat": "progressive-state",
  "connection": "Vて (他動詞) + ある",
  "desc": "<b>Vてある</b> digunakan dengan verba transitif, menyatakan keadaan hasil dari suatu tindakan yang dilakukan secara sengaja oleh seseorang.",
  "nuance": null,
  "examples": [
    {
      "jp": "黒板に日程が書い<b>てあります</b>。",
      "id": "Jadwal sudah tertulis di papan tulis (oleh seseorang)."
    },
    {
      "jp": "部屋の窓が開け<b>てあります</b>。",
      "id": "Jendela kamar sudah dibuka (oleh seseorang)."
    }
  ],
  "confusion_pairs": [
    "gn5-00029",
    "gn4-00017"
  ],
  "see_also_grammar": [
    "gn4-00019"
  ],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
},

{
  "id": "gn4-00019",
  "level": "n4",
  "pattern": "V(自動詞)ている (keadaan hasil)",
  "reading": "V-jidoushi-te iru (keadaan)",
  "meaning": "dalam keadaan ... (hasil dari proses alami)",
  "cat": "progressive-state",
  "connection": "Vて (自動詞) + いる",
  "desc": "<b>V自動詞+ている</b> dengan verba intransitif menyatakan keadaan yang merupakan hasil dari proses alami atau kejadian. Berbeda dari Vてある.",
  "nuance": null,
  "examples": [
    {
      "jp": "窓が開い<b>ています</b>。",
      "id": "Jendelanya terbuka (dalam keadaan terbuka)."
    },
    {
      "jp": "電気がつい<b>ています</b>。",
      "id": "Lampu menyala (dalam keadaan menyala)."
    }
  ],
  "confusion_pairs": [
    "gn3-00134"
  ],
  "see_also_grammar": [
    "gn4-00018"
  ],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
},

{
  "id": "gn4-00020",
  "level": "n4",
  "pattern": "Vたまま",
  "reading": "V-ta mama",
  "meaning": "tetap dalam keadaan ...",
  "cat": "progressive-state",
  "connection": "Vた + まま / Adjい語幹 + まま / N + の + まま",
  "desc": "<b>〜たまま</b> menyatakan bahwa suatu keadaan dibiarkan tidak berubah, sering menyiratkan bahwa seharusnya sudah berubah.",
  "nuance": null,
  "examples": [
    {
      "jp": "靴を履いた<b>まま</b>家に入ってはいけません。",
      "id": "Tidak boleh masuk rumah dengan sepatu masih dipakai."
    },
    {
      "jp": "父はめがねをかけた<b>まま</b>寝ました。",
      "id": "Ayah tidur dengan kacamata masih terpasang."
    }
  ],
  "confusion_pairs": [
    "gn3-00055"
  ],
  "see_also_grammar": [],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
},

{
  "id": "gn4-00021",
  "level": "n4",
  "pattern": "V始める (はじめる)",
  "reading": "V-hajimeru",
  "meaning": "mulai ...",
  "cat": "completion-regret",
  "connection": "V-ます語幹 + 始める",
  "desc": "<b>〜始める</b> menyatakan awal dari suatu tindakan atau proses.",
  "nuance": null,
  "examples": [
    {
      "jp": "雨が降り<b>始めました</b>。",
      "id": "Hujan mulai turun."
    },
    {
      "jp": "6歳からピアノを習い<b>始めました</b>。",
      "id": "Mulai belajar piano sejak usia 6 tahun."
    }
  ],
  "see_also_grammar": [
    "gn4-00022"
  ],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
},

{
  "id": "gn4-00022",
  "level": "n4",
  "pattern": "V出す (だす)",
  "reading": "V-dasu",
  "meaning": "tiba-tiba mulai ...",
  "cat": "completion-regret",
  "connection": "V-ます語幹 + 出す",
  "desc": "<b>〜出す</b> menyatakan awal mendadak dari suatu tindakan atau perubahan. Lebih tiba-tiba dari 〜始める.",
  "nuance": null,
  "examples": [
    {
      "jp": "こどもが突然泣き<b>出した</b>。",
      "id": "Anak itu tiba-tiba menangis."
    },
    {
      "jp": "彼は急に走り<b>出した</b>。",
      "id": "Dia tiba-tiba berlari."
    }
  ],
  "see_also_grammar": [
    "gn4-00021"
  ],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
},

{
  "id": "gn4-00040",
  "level": "n4",
  "pattern": "Vようになる",
  "reading": "V-you ni naru",
  "meaning": "menjadi bisa ... / mulai bisa ...",
  "cat": "inception-continuation",
  "connection": "Vる/Vない + ようになる",
  "desc": "<b>〜ようになる</b> menyatakan perubahan kemampuan atau kebiasaan secara gradual. Menekankan proses perubahan.",
  "nuance": null,
  "examples": [
    {
      "jp": "練習したら、泳げる<b>ようになりました</b>。",
      "id": "Setelah berlatih, saya jadi bisa berenang."
    },
    {
      "jp": "日本に来てから、早起きする<b>ようになりました</b>。",
      "id": "Sejak datang ke Jepang, saya mulai terbiasa bangun pagi."
    }
  ],
  "confusion_pairs": [
    "gn2-00021",
    "gn3-00122"
  ],
  "see_also_grammar": [
    "gn4-00041"
  ],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
},

{
  "id": "gn4-00043",
  "level": "n4",
  "pattern": "〜くする / 〜にする",
  "reading": "〜ku suru / ni suru",
  "meaning": "membuat menjadi ... / menjadikan ...",
  "cat": "inception-continuation",
  "connection": "Adj-i語幹 + くする / Adj-na/N + にする",
  "desc": "<b>Adj-くする</b> dan <b>Adj-na/Nにする</b> menyatakan mengubah sesuatu menjadi keadaan tertentu secara sengaja.",
  "nuance": null,
  "examples": [
    {
      "jp": "音を大き<b>くしてください</b>。",
      "id": "Tolong keraskan volumenya."
    },
    {
      "jp": "部屋をきれい<b>にしました</b>。",
      "id": "Saya membereskan kamar."
    }
  ],
  "see_also_grammar": [],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
},

{
  "id": "gn4-00064",
  "level": "n4",
  "pattern": "〜てすみません / 〜てごめんなさい",
  "reading": "〜te sumimasen / te gomen nasai",
  "meaning": "maaf sudah ... / maaf telah ...",
  "cat": "completion-regret",
  "connection": "Vて + すみません (formal) / ごめんなさい (kasual)",
  "desc": "Digunakan untuk meminta maaf atas suatu tindakan yang sudah dilakukan. すみません lebih formal dan sopan. ごめんなさい lebih kasual.",
  "nuance": null,
  "examples": [
    {
      "jp": "遅れ<b>てすみません</b>。",
      "id": "Maaf sudah terlambat."
    },
    {
      "jp": "忘れ<b>てごめんなさい</b>。",
      "id": "Maaf sudah lupa."
    }
  ],
  "see_also_grammar": [
    "gn4-00065"
  ],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
},

{
  "id": "gn4-00073",
  "level": "n4",
  "pattern": "他動詞 / 自動詞 (transitif / intransitif)",
  "reading": "tadoushi / jidoushi",
  "meaning": "verba transitif / intransitif",
  "cat": "verb-form",
  "connection": "他動詞: N + を + V (ada objek); 自動詞: N + が + V (tidak ada objek)",
  "desc": "<b>他動詞</b> (transitif) membutuhkan objek langsung (を). <b>自動詞</b> (intransitif) tidak membutuhkan objek. Banyak verba Jepang berpasangan dalam kategori ini.",
  "nuance": null,
  "examples": [
    {
      "jp": "(他) ドアを<b>開けました</b>。 (自) ドアが<b>開きました</b>。",
      "id": "(他) Saya membuka pintu. (自) Pintu terbuka."
    },
    {
      "jp": "(他) 電気を<b>消しました</b>。 (自) 電気が<b>消えました</b>。",
      "id": "(他) Saya mematikan lampu. (自) Lampu padam."
    }
  ],
  "see_also_grammar": [
    "gn4-00018",
    "gn4-00019"
  ],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
},

{
  "id": "gn4-00086",
  "level": "n4",
  "pattern": "〜まま",
  "reading": "〜mama",
  "meaning": "begitu saja / apa adanya",
  "cat": "progressive-state",
  "connection": "Vた / Adj-plain / N + の + まま",
  "desc": "<b>〜まま</b> menyatakan suatu keadaan dibiarkan tidak berubah. Sering dengan nuansa \"seharusnya sudah berubah tapi tidak\".",
  "nuance": null,
  "examples": [
    {
      "jp": "窓を開けた<b>まま</b>出かけてしまった。",
      "id": "Saya pergi keluar dengan jendela masih terbuka."
    },
    {
      "jp": "心のまま<b>に</b>生きたい。",
      "id": "Ingin hidup mengikuti kata hati."
    }
  ],
  "confusion_pairs": [
    "gn3-00055",
    "gn3-00069",
    "gn1-00089"
  ],
  "see_also_grammar": [
    "gn4-00020"
  ],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
},

{
  "id": "gn4-00089",
  "level": "n4",
  "pattern": "〜ことがある (kadang-kadang)",
  "reading": "〜koto ga aru",
  "meaning": "kadang-kadang terjadi ... / ada kalanya ...",
  "cat": "completion-regret",
  "connection": "Vる (present) + ことがある",
  "desc": "<b>Vる + ことがある</b> menyatakan bahwa suatu tindakan atau kejadian kadang-kadang terjadi (bukan selalu). Berbeda dari Vた + ことがある (pengalaman masa lalu).",
  "nuance": null,
  "examples": [
    {
      "jp": "私は朝ご飯を食べない<b>ことがあります</b>。",
      "id": "Terkadang saya tidak sarapan."
    },
    {
      "jp": "バスが遅れる<b>ことがある</b>ので、早めに出てください。",
      "id": "Karena bus kadang terlambat, berangkatlah lebih awal."
    }
  ],
  "see_also_grammar": [],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
},

{
  "id": "gn4-00091",
  "level": "n4",
  "pattern": "V-たばかりです",
  "reading": "V-ta bakari desu",
  "meaning": "baru saja V (baru selesai)",
  "cat": "completion-regret",
  "connection": "V(plain past た-form) + ばかり",
  "desc": "<b>V-たばかり</b> menyatakan bahwa suatu tindakan baru saja selesai dilakukan. Menekankan kesegaran/kebaruan dari tindakan tersebut.",
  "nuance": null,
  "examples": [
    {
      "jp": "日本に来た<b>ばかり</b>なので、まだ慣れていません。",
      "id": "Saya baru saja tiba di Jepang jadi belum terbiasa."
    },
    {
      "jp": "ご飯を食べた<b>ばかり</b>です。",
      "id": "Saya baru saja makan."
    },
    {
      "jp": "仕事を始めた<b>ばかり</b>で、覚えることがたくさんあります。",
      "id": "Baru saja mulai bekerja jadi banyak hal yang perlu diingat."
    }
  ],
  "confusion_pairs": [
    "gn4-00015"
  ],
  "see_also_grammar": [
    "gn5-00082"
  ],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
},

{
  "id": "gn4-00092",
  "level": "n4",
  "pattern": "V-るまで、〜",
  "reading": "V-ru made",
  "meaning": "sampai V / hingga V",
  "cat": "sequential-temporal",
  "connection": "V(dictionary form) + まで + clause",
  "desc": "<b>V-るまで</b> menyatakan batas waktu akhir dari suatu tindakan atau keadaan. Artinya \"sampai/hingga terjadi V\".",
  "nuance": null,
  "examples": [
    {
      "jp": "電車が来る<b>まで</b>ここで待ってください。",
      "id": "Tolong tunggu di sini sampai kereta datang."
    },
    {
      "jp": "試験が終わる<b>まで</b>帰れません。",
      "id": "Saya tidak bisa pulang sampai ujian selesai."
    },
    {
      "jp": "準備ができる<b>まで</b>少し待ってください。",
      "id": "Tolong tunggu sebentar sampai persiapan selesai."
    }
  ],
  "confusion_pairs": [
    "gn4-00011"
  ],
  "see_also_grammar": [
    "gn5-00033",
    "gn5-00054"
  ],
  "see_also_vocab": [],
  "register": null,
  "exceptions": null,
  "notes": null
}

];
