module.exports = {
  "les-n4-u05-01": {
    "pedagogical_framework": {
      "what": {
        "summary": "Membedakan batas waktu mutlak (~made ni) vs rentang durasi terus-menerus (~made), kejadian dalam jeda waktu (~aida ni), dan partikel frekuensi (~ni).",
        "canDo": "Bisa menyepakati deadline pengumpulan laporan kerja shift dan jadwal pengecekan mesin.",
        "targetPatterns": [
          "[Waktu / Verba Kamus] までに (paling lambat sebelum)",
          "[Waktu / Verba Kamus] まで (sampai / hingga durasi berakhir)",
          "[Kata Benda] の 間に / [V-te iru] 間に (selagi / sementara)",
          "[Periode] に [Frekuensi] 回 (frekuensi per periode)"
        ],
        "coreVocabSample": [
          "きげん",
          "しめきり",
          "ほうこくしょ",
          "ていしゅつ",
          "てんけん",
          "まにあう"
        ]
      },
      "sensei_context": {
        "sceneIntro": "Di ruang operasional pabrik. Tanaka-senpai menjelaskan jadwal pengumpulan laporan harian (nippou) dan frekuensi pengecekan suhu mesin kepada Budi.",
        "dailyMission": "Gunakan 〜までに untuk menyatakan tenggat waktu tegas dan 〜間に untuk aksi yang diselesaikan di sela waktu kerja.",
        "whyOrder": "Setelah menyusun rencana hidup di Unit 1-4, di tempat kerja Jepang disiplin deadline (kigen) adalah aturan nomor satu yang tidak boleh ditawar."
      },
      "cultural_notes": {
        "title": "Ketaatan Terhadap Tenggat Waktu (納期・期限の厳守 - Nouki Genshu)",
        "etiquette": "Di dunia industri Jepang, 〜までに berarti pekerjaan sudah harus rampung di meja atasan sebelum jam yang ditentukan, bukan baru mulai dikirim pada menit terakhir.",
        "taboos": "Jangan pernah tertukar antara まで (durasi kontinu sampai jam X) dan までに (batas akhir aksi selesai sebelum jam X). Kesalahan ini fatal dalam penjadwalan."
      },
      "pronunciation_tips": {
        "title": "Ketukan Partikel Sambung \"Made ni\" vs \"Aida ni\"",
        "moraNote": "Kata \"made ni\" memiliki 3 mora (ma-de-ni) dengan aksen datar merata.",
        "soundTip": "Pada frasa \"aida ni\", sambungkan vokal a-i secara halus tanpa jeda tersendat."
      },
      "common_pitfalls": [
        {
          "title": "Tertukar Antara 〜まで (Durasi Berkelanjutan) vs 〜までに (Batas Akhir Selesai)",
          "caseScenario": "Ingin mengatakan \"kumpulkan laporan sebelum jam 5\", tetapi malah memakai まで.",
          "pitfallWarning": "\"５時【ごじ】まで レポートを 出【だ】してください。\"",
          "rightSolution": "\"５時【ごじ】までに レポートを 出【だ】してください。\"",
          "explanation": "〜まで berarti aktivitas dilakukan terus-menerus hingga jam 5 (misal: belajar sampai jam 5). Untuk aksi tunggal yang harus selesai sebelum jam 5, wajib memakai 〜までに."
        },
        {
          "title": "Tertukar Antara 間に (Aksi Selesai di Tengah Jeda) vs 間 (Sepanjang Seluruh Jeda)",
          "caseScenario": "Mengatakan \"Tolong jaga kantor selagi saya rapat\".",
          "pitfallWarning": "\"会議【かいぎ】の 間に 留守番【るすばん】を してください。\"",
          "rightSolution": "\"会議【かいぎ】の 間【あいだ】、留守番【るすばん】を してください。\"",
          "explanation": "Jika aksinya berlangsung sepanjang durasi jeda secara terus-menerus, gunakan 間 (tanpa に). Jika aksinya terjadi sekali di tengah rentang jeda, gunakan 間に."
        }
      ],
      "who_and_when": {
        "situational_context": "Instruksi shift kerja, perjanjian serah terima pesanan, janji temu dokter, atau pengumpulan tugas kursus.",
        "social_relations": "Digunakan oleh atasan saat memberikan instruksi, atau oleh staf saat memastikan komitmen batas waktu.",
        "when_not_to_use": "Jangan memakai 〜までに jika maksud kalimatnya adalah melakukan kegiatan santai sepanjang sore tanpa batas target."
      },
      "scenario": {
        "title": "Kesepakatan Batas Waktu Laporan Harian",
        "setting": "Ruang kendali pabrik, pukul 14.00",
        "narrative": "Tanaka mengingatkan Budi bahwa laporan shift harus selesai sebelum pukul 17.00 dan meminta mesin dicek dua kali per shift."
      }
    },
    "dialogue": [
      {
        "id": "d1",
        "speaker": "Tanaka",
        "speakerRole": "Supervisor Pabrik",
        "avatar": "🧑‍💼",
        "jp": "ブディさん、今日【きょう】の 日報【にっぽう】は 何時【なんじ】までに 出【だ】せますか。",
        "furigana": "ブディさん、今日の 日報は 何時までに 出せますか。",
        "romaji": "Budi-san, kyou no nippou wa nanji made ni dasemasu ka.",
        "idText": "Budi-san, laporan harian hari ini paling lambat jam berapa bisa kamu serahkan?"
      },
      {
        "id": "d2",
        "speaker": "Budi",
        "speakerRole": "Pembelajar Indonesia",
        "avatar": "🙋‍♂️",
        "jp": "５時【ごじ】までに 作成【さくせい】して 提出【ていしゅつ】します。",
        "furigana": "５時までに 作成して 提出します。",
        "romaji": "Goji made ni sakusei shite teishutsu shimasu.",
        "idText": "Paling lambat jam 5 sore saya akan menyusun dan menyerahkannya."
      },
      {
        "id": "d3",
        "speaker": "Tanaka",
        "speakerRole": "Supervisor Pabrik",
        "avatar": "🧑‍💼",
        "jp": "頼【たの】みますね。それから、先輩【せんぱい】が 休憩【きゅうけい】している 間【あいだ】に、メーターを 確認【かくにん】してください。",
        "furigana": "頼みますね。それから、先輩が 休憩している 間に、メーターを 確認してください。",
        "romaji": "Tanomimasu ne. Sorekara, senpai ga kyuukei shite iru aida ni, me-ta- o kakunin shite kudasai.",
        "idText": "Tolong ya. Lalu, selagi senior sedang istirahat, tolong periksa meteran indikator."
      },
      {
        "id": "d4",
        "speaker": "Budi",
        "speakerRole": "Pembelajar Indonesia",
        "avatar": "🙋‍♂️",
        "jp": "承知【しょうち】しました。点検【てんけん】は １日【いちにち】に 何回【なんかい】 行【おこな】いますか。",
        "furigana": "承知しました。点検は １日に 何回 行いますか。",
        "romaji": "Shouchi shimashita. Tenken wa ichinichi ni nankai okonaimasu ka.",
        "idText": "Saya pahami. Pemeriksaan dilakukan berapa kali dalam sehari?"
      },
      {
        "id": "d5",
        "speaker": "Tanaka",
        "speakerRole": "Supervisor Pabrik",
        "avatar": "🧑‍💼",
        "jp": "１シフトに ２回【にかい】 チェックすれば 十分【じゅうぶん】ですよ。",
        "furigana": "１シフトに ２回 チェックすれば 十分ですよ。",
        "romaji": "Ichi-shifuto ni nikai chekku sureba juubun desu yo.",
        "idText": "Cukup kamu cek 2 kali per satu shift kerja kok."
      },
      {
        "id": "d6",
        "speaker": "Budi",
        "speakerRole": "Pembelajar Indonesia",
        "avatar": "🙋‍♂️",
        "jp": "分【わ】かりました！ 時間【じかん】に 間【ま】に 合【あ】うように しっかり 進【すす】めます。",
        "furigana": "分かりました！ 時間に 間に 合うように しっかり 進めます。",
        "romaji": "Wakarimashita! Jikan ni ma ni au you ni shikkari susumemasu.",
        "idText": "Baik saya mengerti! Saya akan jalankan dengan baik agar tepat waktu."
      }
    ],
    "drills": [
      {
        "id": "drill-1",
        "type": "vocab_context",
        "instruction": "Langkah 1 (Konsep Kata): Pilihlah istilah yang tepat untuk batas waktu mutlak pengumpulan laporan.",
        "sentencePrompt": "Istilah batas waktu atau tenggat waktu dalam dunia kerja adalah:",
        "options": [
          "締切【しめきり】 (Batas tenggat waktu)",
          "休憩【きゅうけい】 (Istirahat sejenak)",
          "点検【てんけん】 (Pemeriksaan mesin)",
          "日報【にっぽう】 (Laporan harian)"
        ],
        "correctAnswer": "締切【しめきり】 (Batas tenggat waktu)",
        "explanation": "締切 (shimekiri) atau 期限 (kigen) adalah istilah untuk batas akhir penyerahan berkas atau tugas.",
        "diagnosticFeedback": {
          "休憩【きゅうけい】 (Istirahat sejenak)": "Salah: 休憩 (kyuukei) berarti waktu jeda atau rehat.",
          "点検【てんけん】 (Pemeriksaan mesin)": "Salah: 点検 (tenken) berarti inspeksi atau pemeriksaan teknis.",
          "日報【にっぽう】 (Laporan harian)": "Salah: 日報 (nippou) adalah objek laporannya, bukan batas waktunya."
        }
      },
      {
        "id": "drill-2",
        "type": "grammar_choice",
        "instruction": "Langkah 2 (Seleksi Pola Deadline): Lengkapi kalimat tenggat pengumpulan tugas.",
        "sentencePrompt": "明日【あした】の 朝【あさ】９時【くじ】（　　）、この 書類【しょるい】を 提出【ていしゅつ】してください。",
        "options": [
          "までに",
          "まで",
          "あいだ",
          "から"
        ],
        "correctAnswer": "までに",
        "explanation": "Pengumpulan dokumen adalah aksi tunggal yang memiliki batas waktu mutlak, sehingga harus menggunakan までに.",
        "diagnosticFeedback": {
          "まで": "Salah: まで menyatakan durasi terus-menerus (misal: bekerja sampai jam 9), bukan batas akhir aksi.",
          "あいだ": "Salah: あいだ menyatakan rentang waktu (selama/selagi), bukan batas waktu jam tertentu.",
          "から": "Salah: から menyatakan titik awal permulaan (sejak jam 9)."
        }
      },
      {
        "id": "drill-3",
        "type": "particle_select",
        "instruction": "Langkah 3 (Partikel Frekuensi & Rentang): Pilihlah partikel yang tepat untuk menyatakan aksi di sela waktu.",
        "sentencePrompt": "田中【たなか】さんが 戻【もど】って くる（　　）に、机【つくえ】の 上【うえ】を 片付【かたづ】けます。",
        "options": [
          "間【あいだ】",
          "時【とき】",
          "前【まえ】",
          "後【あと】"
        ],
        "correctAnswer": "間【あいだ】",
        "explanation": "Frasa 〜ている間に berarti \"selagi / di tengah-tengah rentang waktu seseorang melakukan sesuatu\".",
        "diagnosticFeedback": {
          "時【とき】": "Salah: 時に kurang lazim berpasangan dengan bentuk ている untuk makna di sela waktu.",
          "前【まえ】": "Salah: 前 berpasangan dengan verba bentuk kamus (戻る前に), bukan bentuk te-kuru.",
          "後【あと】": "Salah: 後 berpasangan dengan bentuk lampau (戻った後に)."
        }
      },
      {
        "id": "drill-4",
        "type": "sentence_ordering",
        "instruction": "Langkah 4 (Susun Kalimat): Rangkai potongan kata menjadi kalimat frekuensi minum obat yang benar.",
        "sentencePrompt": "Susunlah kata-kata berikut agar bermakna: \"Minum obat ini 3 kali dalam 1 hari\".",
        "tokens": [
          "この 薬【くすり】を",
          "１日【いちにち】に",
          "飲【の】んでください",
          "３回【さんかい】"
        ],
        "correctOrder": [
          0,
          1,
          3,
          2
        ],
        "options": [
          "この 薬【くすり】を １日【いちにち】に ３回【さんかい】 飲【の】んでください。",
          "この 薬【くすり】を ３回【さんかい】 １日【いちにち】に 飲【の】んでください。",
          "１日【いちにち】に 飲【の】んでください この 薬【くすり】を ３回【さんかい】。",
          "３回【さんかい】 飲【の】んでください １日【いちにち】に この 薬【くすり】を。"
        ],
        "correctAnswer": "この 薬【くすり】を １日【いちにち】に ３回【さんかい】 飲【の】んでください。",
        "explanation": "Pola frekuensi waktu adalah [Periode] に [Frekuensi] 回 + [Verba]: 1日 に 3回 飲みます.",
        "diagnosticFeedback": {
          "この 薬【くすり】を ３回【さんかい】 １日【いちにち】に 飲【の】んでください。": "Kurang tepat: Satuan periode waktu (1日 に) didahulukan sebelum frekuensi (3回).",
          "１日【いちにち】に 飲【の】んでください この 薬【くすり】を ３回【さんかい】。": "Salah susun: Verba penutup kalimat diletakkan di akhir.",
          "３回【さんかい】 飲【の】んでください １日【いちにち】に この 薬【くすり】を。": "Salah susun: Predikat wajib berada di ujung kalimat."
        }
      },
      {
        "id": "drill-5",
        "type": "nuance_analysis",
        "instruction": "Langkah 5 (Analisis Nuansa): Analisislah perbedaan implikasi kalimat kerja.",
        "sentencePrompt": "Manakah kalimat yang menyatakan bahwa tugas tersebut WAJIB sudah selesai sebelum jam 17.00?",
        "options": [
          "１７時【じゅうななじ】までに 仕事【しごと】を 終【お】わらせます。",
          "１７時【じゅうななじ】まで 仕事【しごと】を 続【つづ】けます。",
          "１７時【じゅうななじ】から 仕事【しごと】を 始【はじ】めます。",
          "１７時【じゅうななじ】の 間に 仕事【しごと】を 休【やす】みます。"
        ],
        "correctAnswer": "１７時【じゅうななじ】までに 仕事【しごと】を 終【お】わらせます。",
        "explanation": "Partikel までに menegaskan target penyelesaian paling lambat sebelum jam yang ditentukan.",
        "diagnosticFeedback": {
          "１７時【じゅうななじ】まで 仕事【しごと】を 続【つづ】けます。": "Salah: Ini berarti terus bekerja tanpa henti hingga jam 17.00.",
          "１７時【じゅうななじ】から 仕事【しごと】を 始【はじ】めます。": "Salah: Ini menyatakan permulaan jam kerja pukul 17.00.",
          "１７時【じゅうななじ】の 間に 仕事【しごと】を 休【やす】みます。": "Salah struktur tata bahasa partikel."
        }
      }
    ],
    "can_do_challenge": {
      "statement": "Bisa menyepakati deadline pengumpulan laporan kerja shift.",
      "situation": "Ditanya oleh atasan kapan kamu bisa menyerahkan laporan inspeksi barang.",
      "promptTask": "Katakan bahwa kamu akan menyerahkannya paling lambat pukul 4 sore!",
      "modelAnswer": "夕方【ゆうがた】４時【よじ】までに 提出【ていしゅつ】します。",
      "modelAnswerId": "Saya akan menyerahkannya paling lambat pukul 4 sore.",
      "culturalEtiquette": "Ucapkan dengan kontak mata fokus dan anggukan tegas tanda komitmen.",
      "skillUnlocked": [
        "Menguasai ketepatan pemakaian 〜までに untuk deadline",
        "Mampu berkoordinasi jadwal kerja tanpa miskomunikasi"
      ]
    },
    "pocket_summary": {
      "keyFormula": "[Waktu] までに (paling lambat sebelum) vs [Waktu] まで (sampai terus-menerus)",
      "coreWords": [
        "きげん",
        "しめきり",
        "ていしゅつ",
        "てんけん"
      ],
      "coreWarning": "Gunakan までに untuk deadline penyerahan tugas; jangan gunakan まで yang bermakna durasi berulang.",
      "quickDialogue": "A: 何時までに？ → B: ５時までに提出します。"
    }
  },
  "les-n4-u05-02": {
    "pedagogical_framework": {
      "what": {
        "summary": "Menyatakan fase presisi momen aksi: tepat akan mulai (V-ru tokoro), sedang berlangsung saat ini (V-te iru tokoro), dan baru saja selesai (V-ta tokoro).",
        "canDo": "Bisa mengabarkan progres tugas seketika melalui radio kerja, telepon, atau laporan lisan.",
        "targetPatterns": [
          "[Verba Kamus] ところです (tepat akan mulai)",
          "[Verba-te] いる ところです (sedang tepat berlangsung)",
          "[Verba-ta] ところです (baru saja selesai rampung)"
        ],
        "coreVocabSample": [
          "これから",
          "いま",
          "たったいま",
          "かくにん",
          "れんらく",
          "おわる"
        ]
      },
      "sensei_context": {
        "sceneIntro": "Di area gudang logistik. Sakura menghubungi Budi melalui interkom untuk menanyakan apakah pengemasan kardus sudah beres.",
        "dailyMission": "Gunakan tiga variasi bentuk \"tokoro da\" untuk mengabarkan status riil pekerjaan detik ini juga.",
        "whyOrder": "Dalam budaya kerja Hou-Ren-So (Lapor-Kabar-Konsultasi), atasan sering menanyakan status terkini: \"Ima dou natte iru?\". Pola tokoro da memberikan ketepatan waktu absolut."
      },
      "cultural_notes": {
        "title": "Komunikasi Progres Kerja Spontan (進捗報告 - Shinchoku Houkoku)",
        "etiquette": "Ketika atasan menanyakan perkembangan tugas, menjawab \"Sedang saya kerjakan tepat sekarang\" (ima yatte iru tokoro desu) jauh lebih informatif daripada sekadar menjawab \"hai\".",
        "taboos": "Hindari mengatakan V-ta tokoro desu jika aksi tersebut sudah selesai berjam-jam yang lalu. Pola ini hanya untuk hal yang baru tuntas beberapa detik atau menit yang lalu."
      },
      "pronunciation_tips": {
        "title": "Penekanan Kata Keterangan Waktu Bersama \"Tokoro\"",
        "moraNote": "Pasangan alami: これから (korekara) + V-ru; 今 (ima) + V-te iru; たった今 (tatta ima) + V-ta.",
        "soundTip": "Ucapkan \"tokoro desu\" dengan intonasi turun merendah di akhir kalimat."
      },
      "common_pitfalls": [
        {
          "title": "Salah Memasangkan Bentuk Verba dengan Kata Keterangan Waktu",
          "caseScenario": "Menggunakan \"tatta ima\" (baru saja) dengan bentuk kamus V-ru.",
          "pitfallWarning": "\"たった今【いま】 食【た】べる ところです。\"",
          "rightSolution": "\"たった今【いま】 食【た】べた ところです。\"",
          "explanation": "たった今 (tatta ima = baru saja beberapa detik lalu) wajib dipasangkan dengan bentuk lampau V-ta tokoro desu."
        },
        {
          "title": "Tertukar Antara 〜たところ (Baru Selesai Detik Ini) vs 〜たばかり (Baru Terjadi dalam Skala Relatif)",
          "caseScenario": "Mengatakan baru masuk perusahaan bulan lalu menggunakan tokoro desu.",
          "pitfallWarning": "\"先月【せんげつ】 この 会社【かいしゃ】に 入【はい】った ところです。\"",
          "rightSolution": "\"先月【せんげつ】 この 会社【かいしゃ】に 入【はい】った ばかりです。\"",
          "explanation": "V-ta tokoro terikat pada waktu fisik yang sangat baru (hitungan menit/detik). Jika sudah lewat berminggu-minggu tetapi secara psikologis terasa baru, gunakan 〜たばかり."
        }
      ],
      "who_and_when": {
        "situational_context": "Saat menjawab panggilan telepon kantor, radio panggil HT di gudang, atau pertanyaan atasan yang lewat di depan meja kerja.",
        "social_relations": "Sangat lazim dipakai staf kepada atasan (bentuk Teineigo) maupun antarsesama rekan kerja.",
        "when_not_to_use": "Jangan gunakan pada keadaan pasif atau sifat alami yang tidak memiliki dinamika proses aksi."
      },
      "scenario": {
        "title": "Laporan Status Pengepakan Barang",
        "setting": "Gudang distribusi barang, pukul 11.15",
        "narrative": "Sakura menanyakan apakah Budi sudah mengirim kardus suku cadang. Budi menjelaskan bahwa ia baru saja selesai mengecek dan tepat akan memuatnya ke truk."
      }
    },
    "dialogue": [
      {
        "id": "d1",
        "speaker": "Sakura",
        "speakerRole": "Mentor Logistik",
        "avatar": "👩‍🏫",
        "jp": "ブディさん、荷物【にもつ】の 梱包【こんぽう】は もう 終【お】わりましたか。",
        "furigana": "ブディさん、荷物の 梱包は もう 終わりましたか。",
        "romaji": "Budi-san, nimotsu no konpou wa mou owarimashita ka.",
        "idText": "Budi-san, apakah pengepakan barangnya sudah selesai?"
      },
      {
        "id": "d2",
        "speaker": "Budi",
        "speakerRole": "Pembelajar Indonesia",
        "avatar": "🙋‍♂️",
        "jp": "はい、たった今【いま】 確認【かくにん】が 終【お】わった ところです。",
        "furigana": "はい、たった今 確認が 終わった ところです。",
        "romaji": "Hai, tatta ima kakunin ga owatta tokoro desu.",
        "idText": "Iya, baru saja saya selesai melakukan pengecekan."
      },
      {
        "id": "d3",
        "speaker": "Sakura",
        "speakerRole": "Mentor Logistik",
        "avatar": "👩‍🏫",
        "jp": "トラックへの 積【つ】み込【こ】みは どうですか。",
        "furigana": "トラックへの 積み込みは どうですか。",
        "romaji": "Torakku e no tsumikomi wa dou desu ka.",
        "idText": "Bagaimana dengan pemuatan ke dalam truk?"
      },
      {
        "id": "d4",
        "speaker": "Budi",
        "speakerRole": "Pembelajar Indonesia",
        "avatar": "🙋‍♂️",
        "jp": "これから トラックに 積【つ】み込【こ】む ところです。すぐ 運【はこ】びます。",
        "furigana": "これから トラックに 積み込む ところです。すぐ 運びます。",
        "romaji": "Kore kara torakku ni tsumikomu tokoro desu. Sugu hakobimasu.",
        "idText": "Tepat sekarang saya baru mau memuatnya ke truk. Akan segera saya angkut."
      },
      {
        "id": "d5",
        "speaker": "Sakura",
        "speakerRole": "Mentor Logistik",
        "avatar": "👩‍🏫",
        "jp": "助【たす】かります。ドライバーさんが 今【いま】 事務所【じむしょ】で 待【ま】っている ところですからね。",
        "furigana": "助かります。ドライバーさんが 今 事務所で 待っている ところですからね。",
        "romaji": "Tasukarimasu. Doraiba-san ga ima jimusho de matte iru tokoro desu kara ne.",
        "idText": "Sangat membantu. Karena sopirnya tepat saat ini sedang menunggu di kantor."
      },
      {
        "id": "d6",
        "speaker": "Budi",
        "speakerRole": "Pembelajar Indonesia",
        "avatar": "🙋‍♂️",
        "jp": "承知【しょうち】しました！ 急【いそ】いで 積【つ】み込【こ】みを 完了【かんりょう】させます。",
        "furigana": "承知しました！ 急いで 積み込みを 完了させます。",
        "romaji": "Shouchi shimashita! Isoide tsumikomi o kanryou sasemasu.",
        "idText": "Saya pahami! Saya akan bergegas menuntaskan pemuatannya."
      }
    ],
    "drills": [
      {
        "id": "drill-1",
        "type": "vocab_context",
        "instruction": "Langkah 1 (Konsep Kata): Pilihlah keterangan waktu yang bermakna \"baru saja beberapa detik/menit lalu\".",
        "sentencePrompt": "Kata keterangan waktu yang paling tepat disandingkan dengan [V-ta] ところです adalah:",
        "options": [
          "たった今【いま】 (Baru saja detik ini)",
          "これから (Mulai sekarang / tepat akan)",
          "さっきから (Sejak tadi)",
          "いつか (Suatu saat nanti)"
        ],
        "correctAnswer": "たった今【いま】 (Baru saja detik ini)",
        "explanation": "たった今 menegaskan bahwa kejadian baru saja tuntas sesaat yang lalu.",
        "diagnosticFeedback": {
          "これから (Mulai sekarang / tepat akan)": "Salah: これから berpasangan dengan bentuk V-ru tokoro (tepat akan mulai).",
          "さっきから (Sejak tadi)": "Salah: さっきから menyatakan durasi kelangsungan sejak tadi.",
          "いつか (Suatu saat nanti)": "Salah: いつか menyatakan waktu yang belum pasti di masa depan."
        }
      },
      {
        "id": "drill-2",
        "type": "grammar_choice",
        "instruction": "Langkah 2 (Seleksi Bentuk Momen): Pilihlah bentuk kata kerja yang tepat untuk menyatakan \"tepat sedang makan siang\".",
        "sentencePrompt": "A: 今【いま】 何【なに】を していますか。 → B: お昼【ひる】ごはんを（　　）ところです。",
        "options": [
          "食【た】べて いる",
          "食【た】べる",
          "食【た】べた",
          "食【た】べよう"
        ],
        "correctAnswer": "食【た】べて いる",
        "explanation": "Untuk aksi yang sedang persis berlangsung di tengah jalan, gunakan [V-te] いる ところです.",
        "diagnosticFeedback": {
          "食【た】べる": "Salah: 食べるところ berarti baru akan mulai makan.",
          "食【た】べた": "Salah: 食べたところ berarti baru saja beres makan.",
          "食【た】べよう": "Salah: Bentuk kehendak tidak bersambung langsung dengan tokoro desu."
        }
      },
      {
        "id": "drill-3",
        "type": "particle_select",
        "instruction": "Langkah 3 (Partikel & Format Tokoro): Lengkapi kalimat laporan kesiapan.",
        "sentencePrompt": "会議【かいぎ】の 資料【しりょう】を 今【いま】から 印刷【いんさつ】する（　　）です。",
        "options": [
          "ところ",
          "ばかり",
          "とおり",
          "はず"
        ],
        "correctAnswer": "ところ",
        "explanation": "今から + V-ru + ところです = tepat baru akan memulai mencetak dokumen.",
        "diagnosticFeedback": {
          "ばかり": "Salah: ばかり tidak dipasangkan dengan kata \"今から\" untuk aksi yang belum mulai.",
          "とおり": "Salah: とおり berarti sesuai dengan instruksi.",
          "はず": "Salah: はず berarti seharusnya berdasarkan dugaan logis."
        }
      },
      {
        "id": "drill-4",
        "type": "sentence_ordering",
        "instruction": "Langkah 4 (Susun Kalimat): Rangkai potongan kata menjadi laporan bahwa kereta baru saja tiba.",
        "sentencePrompt": "Susunlah kata-kata berikut: \"Kereta baru saja tiba di peron\".",
        "tokens": [
          "電車【でんしゃ】が",
          "ホームに",
          "着【つ】いた",
          "ところです"
        ],
        "correctOrder": [
          0,
          1,
          2,
          3
        ],
        "options": [
          "電車【でんしゃ】が ホームに 着【つ】いた ところです。",
          "ホームに 電車【でんしゃ】が ところです 着【つ】いた。",
          "着【つ】いた 電車【でんしゃ】が ホームに ところです。",
          "ところです 電車【でんしゃ】が ホームに 着【つ】いた。"
        ],
        "correctAnswer": "電車【でんしゃ】が ホームに 着【つ】いた ところです。",
        "explanation": "Urutan baku: Subjek (電車が) + Tempat (ホームに) + V-ta (着いた) + ところです.",
        "diagnosticFeedback": {
          "ホームに 電車【でんしゃ】が ところです 着【つ】いた。": "Salah susun: Predikat verba terpotong di akhir.",
          "着【つ】いた 電車【でんしゃ】が ホームに ところです。": "Salah susun partikel.",
          "ところです 電車【でんしゃ】が ホームに 着【つ】いた。": "Salah struktur."
        }
      },
      {
        "id": "drill-5",
        "type": "nuance_analysis",
        "instruction": "Langkah 5 (Analisis Nuansa): Analisislah situasi yang tepat untuk \"これから 出かける ところです\".",
        "sentencePrompt": "Kalimat \"これから 出【で】かける ところです\" diucapkan ketika:",
        "options": [
          "Sepatu sudah dipakai dan tangan sedang memegang gagang pintu untuk keluar",
          "Baru saja pulang sampai di dalam kamar",
          "Sedang berjalan di tengah jalan menuju stasiun",
          "Masih tidur di tempat tidur dan belum bersiap-siap"
        ],
        "correctAnswer": "Sepatu sudah dipakai dan tangan sedang memegang gagang pintu untuk keluar",
        "explanation": "これから V-ru tokoro desu menunjukkan bahwa pembicara sudah siap 100% dan tepat akan melangkah keluar detik itu.",
        "diagnosticFeedback": {
          "Baru saja pulang sampai di dalam kamar": "Salah: Ini adalah situasi V-ta tokoro (baru saja kembali).",
          "Sedang berjalan di tengah jalan menuju stasiun": "Salah: Ini situasi V-te iru tokoro (sedang di jalan).",
          "Masih tidur di tempat tidur dan belum bersiap-siap": "Salah: Belum mencapai titik momen aksi tokoro."
        }
      }
    ],
    "can_do_challenge": {
      "statement": "Bisa mengabarkan progres tugas seketika melalui radio kerja atau telepon.",
      "situation": "Senior menelepon menanyakan apakah kamu sudah berangkat ke lokasi gudang.",
      "promptTask": "Katakan bahwa kamu tepat saat ini baru mau berangkat dari kantor!",
      "modelAnswer": "今【いま】から 事務所【じむしょ】を 出【で】る ところです。",
      "modelAnswerId": "Tepat sekarang saya baru mau berangkat dari kantor.",
      "culturalEtiquette": "Jawab dengan cepat tanpa membuat lawan bicara menunggu ketidakpastian.",
      "skillUnlocked": [
        "Menguasai 3 tahapan presisi momen tindakan via tokoro da",
        "Mampu melaporkan kondisi kerja seketika secara profesional"
      ]
    },
    "pocket_summary": {
      "keyFormula": "これから + V-ru (akan) / 今 + V-te iru (sedang) / たった今 + V-ta (baru saja) + ところです",
      "coreWords": [
        "これから",
        "いま",
        "たったいま",
        "かくにん"
      ],
      "coreWarning": "Pola ini mengunci momen seketika; jangan gunakan V-ta tokoro untuk kejadian yang sudah berhari-hari lewat.",
      "quickDialogue": "A: 今どう？ → B: たった今終わったところです。"
    }
  },
  "les-n4-u05-03": {
    "pedagogical_framework": {
      "what": {
        "summary": "Menyatakan aksi yang baru saja tuntas dalam persepsi subjektif (~ta bakari), permulaan gradual terencana (~hajimeru), dan permulaan spontan/meledak di luar kendali (~dasu).",
        "canDo": "Bisa menceritakan insiden mesin yang tiba-tiba berbunyi keras atau perubahan cuaca mendadak.",
        "targetPatterns": [
          "[Verba-ta] ばかり (baru saja dilakukan / masih segar)",
          "[Verba Masu-stem] 始【はじ】める (mulai melakukan secara wajar/bertahap)",
          "[Verba Masu-stem] 出【だ】す (tiba-tiba meletup / mulai secara spontan)",
          "[Kata Benda / V-te] ばかり (hanya ... melulu / melulu melakukan)"
        ],
        "coreVocabSample": [
          "きゅうに",
          "とつぜん",
          "ならい始める",
          "なき出す",
          "こしょう",
          "おと"
        ]
      },
      "sensei_context": {
        "sceneIntro": "Di bengkel pemeliharaan mesin. Kenji dan Budi sedang memeriksa lini konveyor saat tiba-tiba mesin mengeluarkan getaran dan bunyi derit tajam.",
        "dailyMission": "Gunakan 〜出す untuk fenomena yang meledak tiba-tiba tanpa kendali, dan 〜始める untuk aksi permulaan biasa.",
        "whyOrder": "Pekerja pabrik dan teknisi lapangan wajib bisa mendeskripsikan anomali operasional (kapan mesin mulai berbunyi, mendadak mogok) dengan presisi."
      },
      "cultural_notes": {
        "title": "Laporan Kerusakan & Anomali Peralatan (異常発生時の報告 - Ijou Hassei)",
        "etiquette": "Ketika terjadi keganjilan pada mesin, sampaikan momen awal kejadiannya dengan jelas menggunakan 〜出しました (mendadak berbunyi) agar teknisi senior bisa menganalisis penyebabnya.",
        "taboos": "Jangan memakai 〜出す untuk tindakan terencana atas kemauan sendiri (seperti \"saya berniat mulai belajar besok\"). Gunakan 〜始める."
      },
      "pronunciation_tips": {
        "title": "Intonasi Spontanitas pada Sufiks \"-Dasu\"",
        "moraNote": "Sufiks 出す (dasu) dilekatkan langsung ke batang verba masu: naki-dasu (menangis mendadak), furi-dasu (turun hujan tiba-tiba).",
        "soundTip": "Ucapkan kata keterangan \"kyuu ni\" dengan aksen sedikit tajam untuk menekankan efek kejutan."
      },
      "common_pitfalls": [
        {
          "title": "Memakai 〜出す untuk Aksi Terencana Sengaja",
          "caseScenario": "Ingin mengatakan \"Besok saya mulai belajar untuk ujian\".",
          "pitfallWarning": "\"明日【あした】から 勉強【べんきょう】し 出【だ】します。\"",
          "rightSolution": "\"明日【あした】から 勉強【べんきょう】し 始【はじ】めます。\"",
          "explanation": "〜出す hanya untuk fenomena spontan, mendadak, atau emosi yang meledak di luar kontrol kemauan manusia. Untuk rencana teratur, gunakan 〜始める."
        },
        {
          "title": "Salah Bentuk Sambung Sebelum 〜始める dan 〜出す",
          "caseScenario": "Menyambungkan verba bentuk kamus utuh sebelum hajimeru.",
          "pitfallWarning": "\"雨【あめ】が 降【ふ】る 出【だ】しました。\"",
          "rightSolution": "\"雨【あめ】が 降【ふ】り 出【だ】しました。\"",
          "explanation": "Pola 〜始める dan 〜出す wajib disambung ke batang kata kerja bentuk masu (Masu-stem): 降ります -> 降り出しました."
        }
      ],
      "who_and_when": {
        "situational_context": "Laporan insiden keselamatan kerja K3, menceritakan perubahan cuaca buruk di jalan, atau menceritakan anak kecil yang tiba-tiba menangis.",
        "social_relations": "Ragam sopan (Hajimemashita / Dashimashita) di tempat kerja kepada atasan dan rekan kerja.",
        "when_not_to_use": "Jangan gunakan 〜出す untuk kegiatan tenang yang diawali secara bertahap dan sistematis."
      },
      "scenario": {
        "title": "Insiden Mesin Konveyor yang Mendadak Berbunyi",
        "setting": "Lini perakitan nomor 2, pukul 15.30",
        "narrative": "Budi melaporkan kepada Kenji bahwa konveyor yang baru saja diganti rantainya tiba-tiba mengeluarkan bunyi aneh dan berhenti."
      }
    },
    "dialogue": [
      {
        "id": "d1",
        "speaker": "Budi",
        "speakerRole": "Pembelajar Indonesia",
        "avatar": "🙋‍♂️",
        "jp": "ケンジさん！ コンベアが 急【きゅう】に 異音【いおん】を 出【だ】し 始【はじ】めました！",
        "furigana": "ケンジさん！ コンベアが 急に 異音を 出し 始めました！",
        "romaji": "Kenji-san! Konbea ga kyuu ni ion o dashi hajimemashita!",
        "idText": "Kenji-san! Konveyornya tiba-tiba mulai mengeluarkan suara bising yang aneh!"
      },
      {
        "id": "d2",
        "speaker": "Kenji",
        "speakerRole": "Teknisi Senior",
        "avatar": "🧑‍💻",
        "jp": "えっ？ この 部品【ぶひん】は 先週【せんしゅう】 交換【こうかん】した ばかりだよ。",
        "furigana": "えっ？ この 部品は 先週 交換した ばかりだよ。",
        "romaji": "E? Kono buhin wa senshuu koukan shita bakari da yo.",
        "idText": "Eh? Komponen ini baru saja diganti minggu lalu lho."
      },
      {
        "id": "d3",
        "speaker": "Budi",
        "speakerRole": "Pembelajar Indonesia",
        "avatar": "🙋‍♂️",
        "jp": "さっき モーターが 激【はげ】しく 揺【ゆ】れ 出【だ】して、止【と】まって しまいました。",
        "furigana": "さっき モーターが 激しく 揺れ 出して、止まって しまいました。",
        "romaji": "Sakki mo-ta- ga hageshiku yure dashite, tomatte shimaimashita.",
        "idText": "Tadi motornya mendadak bergetar hebat lalu berhenti berputar."
      },
      {
        "id": "d4",
        "speaker": "Kenji",
        "speakerRole": "Teknisi Senior",
        "avatar": "🧑‍💻",
        "jp": "すぐ 非常【ひじょう】ボタンを 押【お】して 電源【でんげん】を 切【き】ろう。危険【きけん】だから 離【はな】れて！",
        "furigana": "すぐ 非常ボタンを 押して 電源を 切ろう。危険だから 離れて！",
        "romaji": "Sugu hijou botan o oshite dengen o kirou. Kiken dakara hanarete!",
        "idText": "Ayo segera tekan tombol darurat dan matikan sumber listrik. Karena bahaya, menjauhlah!"
      },
      {
        "id": "d5",
        "speaker": "Budi",
        "speakerRole": "Pembelajar Indonesia",
        "avatar": "🙋‍♂️",
        "jp": "はい！ 電源【でんげん】を 切【き】りました。外【そと】も 雨【あめ】が 降【ふ】り 出【だ】しましたね。",
        "furigana": "はい！ 電源を 切りました。外も 雨が 降り 出しましたね。",
        "romaji": "Hai! Dengen o kirimashita. Soto mo ame ga furi dashimashita ne.",
        "idText": "Baik! Daya listrik sudah dimatikan. Di luar pun hujan tiba-tiba mulai turun ya."
      },
      {
        "id": "d6",
        "speaker": "Kenji",
        "speakerRole": "Teknisi Senior",
        "avatar": "🧑‍💻",
        "jp": "落【お】ち着【つ】いて 原因【げんいん】を 調【しら】べよう。報告【ほうこく】してくれて ありがとう。",
        "furigana": "落ち着いて 原因を 調べよう。報告してくれて ありがとう。",
        "romaji": "Ochitsuite gen'in o shirabeyou. Houkoku shite kurete arigatou.",
        "idText": "Mari kita tenang dan selidiki penyebabnya. Terima kasih sudah segera melapor."
      }
    ],
    "drills": [
      {
        "id": "drill-1",
        "type": "vocab_context",
        "instruction": "Langkah 1 (Konsep Kata): Pilihlah kata keterangan yang mencerminkan kejadian mendadak tanpa aba-aba.",
        "sentencePrompt": "Kata keterangan yang paling sering menyertai pola 〜出す adalah:",
        "options": [
          "急【きゅう】に (Secara tiba-tiba)",
          "だんだん (Secara bertahap)",
          "ゆっくり (Secara perlahan)",
          "かならず (Pasti selalu)"
        ],
        "correctAnswer": "急【きゅう】に (Secara tiba-tiba)",
        "explanation": "急に (kyuu ni) atau 突然 (totsuzen) berpadu erat dengan sufiks 〜出す untuk aksi spontan.",
        "diagnosticFeedback": {
          "だんだん (Secara bertahap)": "Salah: だんだん menyatakan perubahan gradual bertahap, bukan letupan mendadak.",
          "ゆっくり (Secara perlahan)": "Salah: ゆっくり menyatakan tempo santai lambat.",
          "かならず (Pasti selalu)": "Salah: かならず menyatakan keniscayaan mutlak."
        }
      },
      {
        "id": "drill-2",
        "type": "grammar_choice",
        "instruction": "Langkah 2 (Sufiks Permulaan): Lengkapi kalimat hujan yang mendadak turun deras di tengah jalan.",
        "sentencePrompt": "空【そら】が 暗【くら】く なって、突然【とつぜん】 雨【あめ】が（　　）。",
        "options": [
          "降【ふ】り 出【だ】しました",
          "降【ふ】り 終【お】わりました",
          "降【ふ】る つもりです",
          "降【ふ】り 続【つづ】けました"
        ],
        "correctAnswer": "降【ふ】り 出【だ】しました",
        "explanation": "Untuk fenomena alam yang tiba-tiba terjadi tanpa kendali manusia, gunakan Masu-stem + 出す (降り出しました).",
        "diagnosticFeedback": {
          "降り 終わりました": "Salah: Ini bermakna hujan selesai reda.",
          "降る つもりです": "Salah: Alam tidak memiliki kehendak/niat (tsumori).",
          "降り 続けました": "Salah: Ini bermakna terus-menerus turun hujan tanpa henti."
        }
      },
      {
        "id": "drill-3",
        "type": "particle_select",
        "instruction": "Langkah 3 (Nuansa Baru Terjadi): Pilihlah pola yang tepat untuk barang yang baru saja dibeli kemarin.",
        "sentencePrompt": "この スマホは 昨日【きのう】 買【か】った（　　）なのに、壊【こわ】れて しまいました。",
        "options": [
          "ばかり",
          "ところ",
          "とおり",
          "ながら"
        ],
        "correctAnswer": "ばかり",
        "explanation": "Pola V-ta + ばかり menyatakan kejadian yang secara subjektif masih dirasa baru saja terjadi (walau sudah kemarin).",
        "diagnosticFeedback": {
          "ところ": "Salah: V-ta tokoro terikat pada momen detik/menit yang baru lewat sesaat, bukan kemarin.",
          "とおり": "Salah: とおり berarti sesuai patokan.",
          "ながら": "Salah: ながら menyatakan dua aksi simultan."
        }
      },
      {
        "id": "drill-4",
        "type": "sentence_ordering",
        "instruction": "Langkah 4 (Susun Kalimat): Rangkai kalimat bayi yang mendadak menangis keras.",
        "sentencePrompt": "Susunlah kata-kata berikut: \"Bayi itu tiba-tiba menangis keras\".",
        "tokens": [
          "赤【あか】ちゃんが",
          "突然【とつぜん】",
          "泣【な】き",
          "出【だ】しました"
        ],
        "correctOrder": [
          0,
          1,
          2,
          3
        ],
        "options": [
          "赤【あか】ちゃんが 突然【とつぜん】 泣【な】き 出【だ】しました。",
          "突然【とつぜん】 泣【な】き 赤【あか】ちゃんが 出【だ】しました。",
          "泣【な】き 赤【あか】ちゃんが 突然【とつぜん】 出【だ】しました。",
          "出【だ】しました 突然【とつぜん】 赤【あか】ちゃんが 泣【な】き。"
        ],
        "correctAnswer": "赤【あか】ちゃんが 突然【とつぜん】 泣【な】き 出【だ】しました。",
        "explanation": "Urutan: Subjek (赤ちゃんが) + Keterangan (突然) + Masu-stem (泣き) + 出しました.",
        "diagnosticFeedback": {
          "突然【とつぜん】 泣【な】き 赤【あか】ちゃんが 出【だ】しました。": "Salah susun partikel.",
          "泣【な】き 赤【あか】ちゃんが 突然【とつぜん】 出【だ】しました。": "Salah susun frasa verba majemuk.",
          "出【だ】しました 突然【とつぜん】 赤【あか】ちゃんが 泣【な】き。": "Predikat salah tempat."
        }
      },
      {
        "id": "drill-5",
        "type": "nuance_analysis",
        "instruction": "Langkah 5 (Analisis Nuansa): Bedakan makna 〜始める vs 〜出す.",
        "sentencePrompt": "Manakah kalimat yang tepat untuk menyatakan resolusi belajar secara bertahap dan teratur?",
        "options": [
          "来週【らいしゅう】から 日本語【にほんご】の 教室【きょうしつ】に 通【かよ】い 始【はじ】めます。",
          "来週【らいしゅう】から 日本語【にほんご】の 教室【きょうしつ】に 通【かよ】い 出【だ】します。",
          "昨日【きのう】から 日本語【にほんご】を 忘【わす】れ 出【だ】しました。",
          "来週【らいしゅう】から 日本語【にほんご】を やめ 出【だ】します。"
        ],
        "correctAnswer": "来週【らいしゅう】から 日本語【にほんご】の 教室【きょうしつ】に 通【かよ】い 始【はじ】めます。",
        "explanation": "Aksi yang disengaja atas tekad manusia secara teratur menggunakan 〜始める, bukan 〜出す.",
        "diagnosticFeedback": {
          "来週【らいしゅう】から 日本語【にほんご】の 教室【きょうしつ】に 通【かよ】い 出【だ】します。": "Tidak alami: 〜出す tidak dipakai untuk rencana kemauan diri sendiri.",
          "昨日【きのう】から 日本語【にほんご】を 忘【わす】れ 出【だ】しました。": "Salah pemakaian tata bahasa.",
          "来週【らいしゅう】から 日本語【にほんご】を やめ 出【だ】します。": "Salah pemakaian pola."
        }
      }
    ],
    "can_do_challenge": {
      "statement": "Bisa menceritakan insiden mesin yang tiba-tiba berbunyi keras.",
      "situation": "Melaporkan kepada pengawas bahwa mesin pemotong tiba-tiba mengeluarkan bunyi aneh.",
      "promptTask": "Katakan bahwa mesin tiba-tiba mulai mengeluarkan suara aneh!",
      "modelAnswer": "機械【きかい】が 急【きゅう】に 変【へん】な 音【おと】を 出【だ】し 始【はじ】めました。",
      "modelAnswerId": "Mesin tiba-tiba mulai mengeluarkan suara yang aneh.",
      "culturalEtiquette": "Gunakan nada sigap dan sebutkan subjek objeknya secara terperinci.",
      "skillUnlocked": [
        "Mampu membedakan permulaan gradual (hajimeru) vs spontan (dasu)",
        "Mampu melaporkan anomali peralatan kerja seketika"
      ]
    },
    "pocket_summary": {
      "keyFormula": "Masu-stem + 始める (mulai teratur) / Masu-stem + 出す (meledak tiba-tiba) / V-ta + ばかり (baru saja)",
      "coreWords": [
        "きゅうに",
        "とつぜん",
        "こしょう",
        "おと"
      ],
      "coreWarning": "Jangan gunakan 〜出す untuk rencana yang disengaja; pola ini khusus fenomena meletup tanpa kendali.",
      "quickDialogue": "A: どうしたの？ → B: 急に雨が降り出しました。"
    }
  },
  "les-n4-u06-01": {
    "pedagogical_framework": {
      "what": {
        "summary": "Melakukan tindakan persiapan terlebih dahulu demi kemudahan di masa mendatang (~te oku) dan memahami pasangan kata kerja transitif (tadoshi + を) vs intransitif (jidoushi + が).",
        "canDo": "Bisa menyiapkan materi rapat sebelum tamu bisnis tiba dan mengomunikasikan persiapan fasilitas.",
        "targetPatterns": [
          "[Verba-te] おく (melakukan persiapan terlebih dahulu)",
          "[Kata Benda] を [Verba Transitif] (membuka pintu, mematikan lampu)",
          "[Kata Benda] が [Verba Intransitif] (pintu terbuka, lampu mati)",
          "[Verba-te] おいて ください (tolong siapkan/biarkan terlebih dahulu)"
        ],
        "coreVocabSample": [
          "じゅんび",
          "あける",
          "あく",
          "しめる",
          "しまる",
          "コピーする",
          "ならべる"
        ]
      },
      "sensei_context": {
        "sceneIntro": "Di ruang rapat kantor Tokyo. Sakura dan Budi bertugas menyiapkan ruangan sebelum rombongan klien perusahaan rekanan tiba pukul 14.00.",
        "dailyMission": "Gunakan 〜ておく untuk mengonfirmasi persiapan kerja, dan pastikan partikel を vs が tepat sesuai jenis kata kerjanya.",
        "whyOrder": "Persiapan matang (段取り dandori) adalah nilai luhur kerja di Jepang. Menyiapkan segala sesuatunya terlebih dahulu (〜ておく) mencerminkan profesionalisme tinggi."
      },
      "cultural_notes": {
        "title": "Etika Dandori (段取り): Budaya Persiapan Sebelum Waktu Dimulai",
        "etiquette": "Di kantor Jepang, persiapan ruangan selesai 15 menit sebelum acara dimulai. Melaporkan \"sudah saya siapkan sebelumnya\" (junbi shite okimashita) memberikan ketenangan bagi atasan.",
        "taboos": "Dalam percakapan lisan santai, 〜ておく sering disingkat menjadi 〜とく (misal: kaitoku, yattoku). Namun kepada atasan, tetap gunakan ragam sopan utuh 〜ておきます."
      },
      "pronunciation_tips": {
        "title": "Pelafalan Bentuk Singkat Santai \"-Toku\" vs Sopan \"-Te oku\"",
        "moraNote": "Shite okimasu (6 mora) -> shitokimasu (5 mora). Jaga vokal [o] tetap jelas.",
        "soundTip": "Jangan memisahkan sambungan antara verba bentuk-te dan oku dengan jeda napas panjang."
      },
      "common_pitfalls": [
        {
          "title": "Tertukar Pasangan Partikel Transitif (他動詞) vs Intransitif (自動詞)",
          "caseScenario": "Ingin mengatakan \"pintu terbuka sendiri\" tetapi malah memakai partikel を.",
          "pitfallWarning": "\"ドアを 開【あ】きます。\" (Ini berarti subjek sengaja membuka pintu)",
          "rightSolution": "\"ドアが 開【あ】きます。\" (Pintu membuka/terbuka secara alami)",
          "explanation": "Verba intransitif (自動詞 jidoushi) fokus pada keadaan/perubahan alami dan memakai partikel が. Verba transitif (他動詞 tadoushi) ada agen yang melakukan aksi sengaja dan memakai partikel を."
        },
        {
          "title": "Lupa Mengubah Verba ke Bentuk Te Sebelum \"Oku\"",
          "caseScenario": "Menyambungkan bentuk kamus langsung ke oku.",
          "pitfallWarning": "\"資料【しりょう】を 準備【じゅんび】する おきます。\"",
          "rightSolution": "\"資料【しりょう】を 準備【じゅんび】して おきます。\"",
          "explanation": "Pola persiapan wajib menggunakan verba bentuk sambung -te: [V-te] + おく."
        }
      ],
      "who_and_when": {
        "situational_context": "Persiapan ruang rapat, reservasi tiket dinas luar kota, merapikan perkakas pabrik sebelum pergantian shift.",
        "social_relations": "Sangat sering diucapkan oleh staf kepada atasan saat melaporkan inisiatif persiapan mandiri.",
        "when_not_to_use": "Jangan gunakan 〜ておく untuk aksi refleks mendadak yang tidak memiliki tujuan jangka panjang."
      },
      "scenario": {
        "title": "Persiapan Ruang Presentasi Sebelum Klien Datang",
        "setting": "Ruang rapat lantai 3, pukul 13.30",
        "narrative": "Sakura meminta Budi memfotokopi materi dan menyalakan pendingin ruangan agar siap saat tamu datang."
      }
    },
    "dialogue": [
      {
        "id": "d1",
        "speaker": "Sakura",
        "speakerRole": "Mentor Kantor",
        "avatar": "👩‍🏫",
        "jp": "ブディさん、２時【にじ】に お客【きゃく】様【さま】が 来【こ】られますよ。会議室【かいぎしつ】の 準備【じゅんび】は どうですか。",
        "furigana": "ブディさん、２時に お客様が 来られますよ。会議室の 準備は どうですか。",
        "romaji": "Budi-san, niji ni okyaku-sama ga koraremasu yo. Kaigishitsu no junbi wa dou desu ka.",
        "idText": "Budi-san, jam 2 tamu kita akan datang lho. Bagaimana persiapan ruang rapatnya?"
      },
      {
        "id": "d2",
        "speaker": "Budi",
        "speakerRole": "Pembelajar Indonesia",
        "avatar": "🙋‍♂️",
        "jp": "資料【しりょう】を １０部【じゅうぶ】 コピーして 机【つくえ】に 並【なら】べて おきました。",
        "furigana": "資料を １０部 コピーして 机に 並べて おきました。",
        "romaji": "Shiryou o juubu kopi- shite tsukue ni narabete okimashita.",
        "idText": "Saya sudah memfotokopi materi sebanyak 10 rangkap dan menatanya di atas meja."
      },
      {
        "id": "d3",
        "speaker": "Sakura",
        "speakerRole": "Mentor Kantor",
        "avatar": "👩‍🏫",
        "jp": "素晴らしい！ エアコンを つけて、部屋【へや】を 涼【すず】しく して おいてくれますか。",
        "furigana": "素晴らしい！ エアコンを つけて、部屋を 涼しく して おいてくれますか。",
        "romaji": "Subarashii! Eakon o tsukete, heya o suzushiku shite oite kuremasu ka.",
        "idText": "Luar biasa! Bisakah tolong nyalakan AC dan buat ruangannya sejuk terlebih dahulu?"
      },
      {
        "id": "d4",
        "speaker": "Budi",
        "speakerRole": "Pembelajar Indonesia",
        "avatar": "🙋‍♂️",
        "jp": "はい、すぐ つけて おきます。窓【まど】が 開【あ】いて いますね。閉【し】めましょうか。",
        "furigana": "はい、すぐ つけて おきます。窓が 開いて いますね。閉めましょうか。",
        "romaji": "Hai, sugu tsukete okimasu. Mado ga aite imasu ne. Shimemashou ka.",
        "idText": "Baik, akan segera saya nyalakan terlebih dahulu. Jendelanya sedang terbuka ya. Mau saya tutupkan?"
      },
      {
        "id": "d5",
        "speaker": "Sakura",
        "speakerRole": "Mentor Kantor",
        "avatar": "👩‍🏫",
        "jp": "ええ、窓【まど】を 閉【し】めて おいてください。準備【じゅんび】万端【ばんたん】ですね。",
        "furigana": "ええ、窓を 閉めて おいてください。準備万端ですね。",
        "romaji": "Ee, mado o shimete oite kudasai. Junbibantan desu ne.",
        "idText": "Iya, tolong tutupkan jendelanya terlebih dahulu ya. Persiapan kita sudah mantap ya."
      },
      {
        "id": "d6",
        "speaker": "Budi",
        "speakerRole": "Pembelajar Indonesia",
        "avatar": "🙋‍♂️",
        "jp": "お茶【ちゃ】も 用意【ようい】して おきますので、安心【あんしん】してください！",
        "furigana": "お茶も 用意して おきますので、安心して ください！",
        "romaji": "Ocha mo youi shite okimasu node, anshin shite kudasai!",
        "idText": "Teh juga akan saya siapkan terlebih dahulu, jadi tenang saja!"
      }
    ],
    "drills": [
      {
        "id": "drill-1",
        "type": "vocab_context",
        "instruction": "Langkah 1 (Konsep Pasangan Verba): Pilihlah kata kerja transitif (tindakan sengaja manusia) yang tepat.",
        "sentencePrompt": "Kalimat manakah yang merupakan tindakan menyalakan AC secara sengaja?",
        "options": [
          "エアコンを つけます (Menyalakan AC)",
          "エアコンが つきます (AC menyala sendiri)",
          "エアコンが 消【き】えます (AC padam sendiri)",
          "エアコンが 壊【こわ】れます (AC rusak)"
        ],
        "correctAnswer": "エアコンを つけます (Menyalakan AC)",
        "explanation": "他動詞 (tadoushi): objek + を + つけます = menyalakan sesuatu dengan sengaja.",
        "diagnosticFeedback": {
          "エアコンが つきます (AC menyala sendiri)": "Salah: Ini adalah verba intransitif (keadaan menyala alami).",
          "エアコンが 消【き】えます (AC padam sendiri)": "Salah: Ini intransitif (padam).",
          "エアコンが 壊【こわ】れます (AC rusak)": "Salah: Ini intransitif (rusak)."
        }
      },
      {
        "id": "drill-2",
        "type": "grammar_choice",
        "instruction": "Langkah 2 (Pola Persiapan): Pilihlah bentuk yang tepat untuk aksi persiapan sebelum bepergian.",
        "sentencePrompt": "旅行【りょこう】の 前【まえ】に、ホテルを（　　）おきます。",
        "options": [
          "予約【よやく】して",
          "予約【よやく】する",
          "予約【よやく】した",
          "予約【よやく】しながら"
        ],
        "correctAnswer": "予約【よやく】して",
        "explanation": "Pola persiapan sebelumnya adalah [Verba-te] + おく (予約しておきます).",
        "diagnosticFeedback": {
          "予約【よやく】する": "Salah: Bentuk kamus tidak bersambung langsung dengan okimasu.",
          "予約【よやく】した": "Salah: Bentuk lampau tidak disambung ke okimasu.",
          "予約【よやく】しながら": "Salah: ながら menyatakan dua aksi simultan."
        }
      },
      {
        "id": "drill-3",
        "type": "particle_select",
        "instruction": "Langkah 3 (Partikel Transitif vs Intransitif): Tentukan partikel yang benar untuk pintu yang tertutup rapat.",
        "sentencePrompt": "風【かぜ】で ドア（　　）閉【し】まりました。",
        "options": [
          "が",
          "を",
          "に",
          "で"
        ],
        "correctAnswer": "が",
        "explanation": "閉まる (shimaru) adalah kata kerja intransitif (自動詞), sehingga subjek pembuat keadaannya ditandai dengan partikel が.",
        "diagnosticFeedback": {
          "を": "Salah: を dipakai untuk kata kerja transitif (閉める shimeru).",
          "に": "Salah: に menandai tujuan atau titik waktu.",
          "で": "Salah: で di depan menandai sebab angin (kaze de)."
        }
      },
      {
        "id": "drill-4",
        "type": "sentence_ordering",
        "instruction": "Langkah 4 (Susun Kalimat): Rangkai kalimat persiapan memeriksa jadwal kereta sebelum pergi.",
        "sentencePrompt": "Susunlah kata-kata: \"Sebelum pergi, periksalah jadwal kereta terlebih dahulu\".",
        "tokens": [
          "出【で】かける 前【まえ】に",
          "電車【でんしゃ】の 時間【じかん】を",
          "調【しら】べて",
          "おいてください"
        ],
        "correctOrder": [
          0,
          1,
          2,
          3
        ],
        "options": [
          "出【で】かける 前【まえ】に 電車【でんしゃ】の 時間【じかん】を 調【しら】べて おいてください。",
          "電車【でんしゃ】の 時間【じかん】を 出【で】かける 前【まえ】に おいてください 調【しら】べて。",
          "調【しら】べて 電車【でんしゃ】の 時間【じかん】を 出【で】かける 前【まえ】に おいてください。",
          "おいてください 電車【でんしゃ】の 時間【じかん】を 出【で】かける 前【まえ】に 調【しら】べて。"
        ],
        "correctAnswer": "出【で】かける 前【まえ】に 電車【でんしゃ】の 時間【じかん】を 調【しら】べて おいてください。",
        "explanation": "Keterangan waktu (出かける前に) + Objek (電車の時間を) + V-te oku (調べておいてください).",
        "diagnosticFeedback": {
          "電車【でんしゃ】の 時間【じかん】を 出【で】かける 前【まえ】に おいてください 調【しら】べて。": "Salah struktur predikat terpisah.",
          "調【しら】べて 電車【でんしゃ】の 時間【じかん】を 出【で】かける 前【まえ】に おいてください。": "Salah urutan.",
          "おいてください 電車【でんしゃ】の 時間【じかん】を 出【で】かける 前【まえ】に 調【しら】べて。": "Salah susun fatal."
        }
      },
      {
        "id": "drill-5",
        "type": "nuance_analysis",
        "instruction": "Langkah 5 (Analisis Nuansa): Analisislah makna ungkapan \"そのままにしておいてください\".",
        "sentencePrompt": "Ungkapan \"そのままに して おいてください\" memiliki arti:",
        "options": [
          "Biarkan saja begitu apa adanya untuk persiapan nanti",
          "Segera bersihkan dan buang semua barangnya",
          "Bawa barang tersebut pulang ke rumah sekarang",
          "Ubah posisinya menjadi terbalik"
        ],
        "correctAnswer": "Biarkan saja begitu apa adanya untuk persiapan nanti",
        "explanation": "〜ておく selain persiapan masa depan juga berarti mempertahankan kondisi yang ada (membiarkan seperti itu demi tujuan tertentu).",
        "diagnosticFeedback": {
          "Segera bersihkan dan buang semua barangnya": "Salah: Ini adalah kata片付ける (katadzukeru).",
          "Bawa barang tersebut pulang ke rumah sekarang": "Salah: Ini kata 持ち帰る (mochikaeru).",
          "Ubah posisinya menjadi terbalik": "Salah: Ini bukan makna sono mama ni shite oku."
        }
      }
    ],
    "can_do_challenge": {
      "statement": "Bisa menyiapkan materi rapat sebelum tamu bisnis tiba.",
      "situation": "Mentor menanyakan apakah dokumen untuk rapat siang nanti sudah siap.",
      "promptTask": "Katakan bahwa kamu sudah mencetak dan menyiapkan dokumennya terlebih dahulu!",
      "modelAnswer": "はい、資料【しりょう】を 印刷【いんさつ】して 準備【じゅんび】して おきました。",
      "modelAnswerId": "Ya, saya sudah mencetak dan menyiapkan dokumennya terlebih dahulu.",
      "culturalEtiquette": "Tunjukkan kesiapan proaktif dengan laporan lugas dan tersenyum ramah.",
      "skillUnlocked": [
        "Menguasai formulasi aksi persiapan V-te oku",
        "Memahami kontras transitif (tadoushi) dan intransitif (jidoushi)"
      ]
    },
    "pocket_summary": {
      "keyFormula": "[V-te] + おく (persiapan sebelumnya) / を 他動詞 vs が 自動詞",
      "coreWords": [
        "じゅんび",
        "あける",
        "あく",
        "しめる",
        "しまる"
      ],
      "coreWarning": "Ingat: Objek を berpasangan dengan verba sengaja (他動詞); subjek が berpasangan dengan verba alami (自動詞).",
      "quickDialogue": "A: 準備は？ → B: 資料をコピーしておきました。"
    }
  },
  "les-n4-u06-02": {
    "pedagogical_framework": {
      "what": {
        "summary": "Membedakan keadaan hasil tindakan sengaja seseorang yang tertata (~te aru) vs keadaan alami hasil perubahan yang sedang berlangsung (~te iru).",
        "canDo": "Bisa mengecek papan pengumuman kerja dan memastikan pintu darurat terkunci rapi.",
        "targetPatterns": [
          "[Kata Benda] が [Verba Transitif-te] ある (dalam keadaan sengaja dipersiapkan/tertata)",
          "[Kata Benda] が [Verba Intransitif-te] いる (dalam keadaan terpasang/terbuka secara alami)",
          "カレンダーに 予定【よてい】が 書【か】いて あります (jadwal sudah tertulis rapi)"
        ],
        "coreVocabSample": [
          "はってある",
          "かいてある",
          "ならべてある",
          "しまってある",
          "かぎがかかる"
        ]
      },
      "sensei_context": {
        "sceneIntro": "Di lorong pabrik dekat pintu darurat. Tanaka mengajak Budi melakukan inspeksi harian sebelum shift malam dimulai.",
        "dailyMission": "Gunakan 〜てある saat menjelaskan barang yang sengaja ditaruh/ditulis oleh seseorang untuk tujuan tertentu.",
        "whyOrder": "Setelah mempelajari persiapan aktif (〜ておく), pembelajar perlu mengenali hasil dari persiapan tersebut yang tertinggal di ruangan (〜てある)."
      },
      "cultural_notes": {
        "title": "Manajemen Visual 5S di Tempat Kerja Jepang: Seiri & Seiton",
        "etiquette": "Di pabrik Jepang, setiap alat memiliki tempatnya. Mengatakan \"Kunci sudah tergantung di papan\" (kagi ga kakete arimasu) membuktikan sistem 5S berjalan tertib.",
        "taboos": "Jangan menggunakan verba intransitif dengan 〜ある (seperti ドアが開いてある - salah!). 〜てある HANYA menerima verba transitif."
      },
      "pronunciation_tips": {
        "title": "Penekanan Partikel \"Ga\" pada Pola Keadaan Hasil",
        "moraNote": "Pada kalimat \"shiryou ga narabete arimasu\", partikel \"ga\" mengikat benda sebagai fokus pandangan mata.",
        "soundTip": "Ucapkan \"te arimasu\" dengan lembut tanpa intonasi bertanya."
      },
      "common_pitfalls": [
        {
          "title": "Memasangkan Verba Intransitif ke Pola 〜てある",
          "caseScenario": "Ingin mengatakan jendela dalam keadaan terbuka dengan verba aku.",
          "pitfallWarning": "\"窓【まど】が 開【あ】いて あります。\"",
          "rightSolution": "\"窓【まど】が 開【あ】けて あります。\" (Sengaja dibuka orang) atau \"窓【まど】が 開【あ】いて います。\" (Kondisi terbuka)",
          "explanation": "〜てある HANYA bisa berpasangan dengan kata kerja transitif (他動詞: 開ける -> 開けてある). Jika memakai kata kerja intransitif (自動詞: 開く), wajib berpasangan dengan 〜ている (開いている)."
        },
        {
          "title": "Salah Menaruh Partikel Objek を Sebelum 〜てある",
          "caseScenario": "Memakai partikel を pada kalimat kondisi tertata.",
          "pitfallWarning": "\"壁【かべ】に ポスターを 貼【は】って あります。\"",
          "rightSolution": "\"壁【かべ】に ポスターが 貼【は】って あります。\"",
          "explanation": "Dalam pola 〜てある, fokusnya adalah kondisi keberadaan benda, sehingga partikel penandanya berubah dari を menjadi が."
        }
      ],
      "who_and_when": {
        "situational_context": "Pemeriksaan keselamatan kerja harian, mengecek ketersediaan inventaris toko, membaca pengumuman di asrama.",
        "social_relations": "Digunakan secara profesional oleh supervisor dan teknisi dalam mendeskripsikan kondisi fasilitas.",
        "when_not_to_use": "Jangan gunakan pada makhluk bernyawa (manusia/hewan) yang sedang berdiam diri."
      },
      "scenario": {
        "title": "Inspeksi Papan Pengumuman dan Pintu Darurat",
        "setting": "Pintu keluar darurat pabrik, pukul 16.45",
        "narrative": "Tanaka memeriksa apakah peta jalur evakuasi sudah tertempel di dinding dan memastikan kunci darurat tersimpan aman."
      }
    },
    "dialogue": [
      {
        "id": "d1",
        "speaker": "Tanaka",
        "speakerRole": "Supervisor Pabrik",
        "avatar": "🧑‍💼",
        "jp": "ブディさん、掲示板【けいじばん】の 避難【ひなん】マップは 確認【かくにん】しましたか。",
        "furigana": "ブディさん、掲示板の 避難マップは 確認しましたか。",
        "romaji": "Budi-san, keijiban no hinan mappu wa kakunin shimashita ka.",
        "idText": "Budi-san, apakah peta evakuasi di papan pengumuman sudah kamu pastikan?"
      },
      {
        "id": "d2",
        "speaker": "Budi",
        "speakerRole": "Pembelajar Indonesia",
        "avatar": "🙋‍♂️",
        "jp": "はい、壁【かべ】に 新【あたら】しい 地図【ちず】が 貼【は】って あります。",
        "furigana": "はい、壁に 新しい 地図が 貼って あります。",
        "romaji": "Hai, kabe ni atarashii chizu ga hatte arimasu.",
        "idText": "Iya, di dinding sudah tertempel peta baru (yang sengaja dipasang)."
      },
      {
        "id": "d3",
        "speaker": "Tanaka",
        "speakerRole": "Supervisor Pabrik",
        "avatar": "🧑‍💼",
        "jp": "非常口【ひじょうぐち】の 鍵【かぎ】は どうなっていますか。",
        "furigana": "非常口の 鍵は どうなっていますか。",
        "romaji": "Hijouguchi no kagi wa dou natte imasu ka.",
        "idText": "Bagaimana dengan kunci pintu daruratnya?"
      },
      {
        "id": "d4",
        "speaker": "Budi",
        "speakerRole": "Pembelajar Indonesia",
        "avatar": "🙋‍♂️",
        "jp": "ケースの 中【なか】に 鍵【かぎ】が ちゃんと しまって あります。",
        "furigana": "ケースの 中に 鍵が ちゃんと しまって あります。",
        "romaji": "Ke-su no naka ni kagi ga chanto shimatte arimasu.",
        "idText": "Di dalam kotak penyimpanan kuncinya sudah tersimpan dengan rapi."
      },
      {
        "id": "d5",
        "speaker": "Tanaka",
        "speakerRole": "Supervisor Pabrik",
        "avatar": "🧑‍💼",
        "jp": "非常扉【ひじょうとびら】の 前【まえ】に 物【もの】が 置【お】いて ありませんね。よし、安全【あんぜん】です。",
        "furigana": "非常扉の 前に 物が 置いて ありませんね。よし、安全です。",
        "romaji": "Hijoutobira no mae ni mono ga oite arimasen ne. Yoshi, anzen desu.",
        "idText": "Di depan pintu darurat tidak ada barang yang sengaja ditaruh menghalangi ya. Bagus, kondisi aman."
      },
      {
        "id": "d6",
        "speaker": "Budi",
        "speakerRole": "Pembelajar Indonesia",
        "avatar": "🙋‍♂️",
        "jp": "毎朝【まいあさ】 チェック表【ひょう】に 記号【きごう】が 書【か】いて あるか 見【み】て おきます！",
        "furigana": "毎朝 チェック表に 記号が 書いて あるか 見て おきます！",
        "romaji": "Maiasa chekkuhyou ni kigou ga kaite aru ka mite okimasu!",
        "idText": "Setiap pagi saya akan pastikan apakah tanda centang di lembar cek sudah tertulis rapi!"
      }
    ],
    "drills": [
      {
        "id": "drill-1",
        "type": "vocab_context",
        "instruction": "Langkah 1 (Konsep Kata): Pilihlah istilah yang tepat untuk \"sudah tertempel rapi di dinding\".",
        "sentencePrompt": "Frasa yang tepat untuk poster yang sengaja ditempel di dinding adalah:",
        "options": [
          "貼【は】って あります (Sudah sengaja ditempel)",
          "貼【は】って います (Sedang menempel secara alami)",
          "貼【は】り 始【はじ】めます (Mulai menempel)",
          "貼【は】り 出【だ】します (Mendadak menempel)"
        ],
        "correctAnswer": "貼【は】って あります (Sudah sengaja ditempel)",
        "explanation": "貼る adalah verba transitif (他動詞). Bentuk 〜てある menyatakan keadaan hasil tindakan yang sengaja dilakukan.",
        "diagnosticFeedback": {
          "貼って います (Sedang menempel secara alami)": "Kurang tepat: 貼る adalah kata kerja transitif, lebih tepat dipasangkan dengan ある untuk keadaan hasil tindakan manusia.",
          "貼り 始めます (Mulai menempel)": "Salah: Ini menyatakan permulaan aksi.",
          "貼り 出します (Mendadak menempel)": "Salah: Tidak ada konteks letupan mendadak."
        }
      },
      {
        "id": "drill-2",
        "type": "grammar_choice",
        "instruction": "Langkah 2 (Seleksi Transitif vs Intransitif): Lengkapi kalimat kondisi jendela kantor.",
        "sentencePrompt": "部屋【へや】が 暑【あつ】かったので、窓【まど】が（　　）あります。",
        "options": [
          "開【あ】けて",
          "開【あ】いて",
          "閉【し】まって",
          "開【あ】く"
        ],
        "correctAnswer": "開【あ】けて",
        "explanation": "Pola 〜てある HANYA menerima verba transitif (他動詞: 開ける -> 開けてあります). Verba 開いて adalah intransitif.",
        "diagnosticFeedback": {
          "開いて": "Salah: 開く adalah intransitif, pasangannya adalah 開いています bukan 開いてあります.",
          "閉まって": "Salah: 閉まる adalah intransitif (tertutup).",
          "開く": "Salah: Bentuk kamus tidak bisa bersambung langsung dengan arimasu."
        }
      },
      {
        "id": "drill-3",
        "type": "particle_select",
        "instruction": "Langkah 3 (Partikel Penanda Keadaan): Pilihlah partikel yang tepat untuk nama yang tertulis di buku.",
        "sentencePrompt": "教科書【きょうかしょ】の 表紙【ひょうし】に 名前【なまえ】（　　）書【か】いて あります。",
        "options": [
          "が",
          "を",
          "に",
          "で"
        ],
        "correctAnswer": "が",
        "explanation": "Dalam pola [Tempat] に [Benda] が [V-te] ある, benda yang berada dalam keadaan tersebut ditandai dengan partikel が.",
        "diagnosticFeedback": {
          "を": "Salah: Meskipun 書く adalah transitif, dalam pola hasil keadaan 〜てある partikelnya berubah menjadi が.",
          "に": "Salah: に sudah dipakai untuk menandai lokasi (表紙に).",
          "で": "Salah: で menandai sarana atau alat."
        }
      },
      {
        "id": "drill-4",
        "type": "sentence_ordering",
        "instruction": "Langkah 4 (Susun Kalimat): Rangkai kalimat jadwal kerja yang tertulis rapi di kalender.",
        "sentencePrompt": "Susunlah kata-kata berikut: \"Jadwal rapat sudah tertulis rapi di kalender\".",
        "tokens": [
          "カレンダーに",
          "会議【かいぎ】の 予定【よてい】が",
          "書【か】いて",
          "あります"
        ],
        "correctOrder": [
          0,
          1,
          2,
          3
        ],
        "options": [
          "カレンダーに 会議【かいぎ】の 予定【よてい】が 書【か】いて あります。",
          "会議【かいぎ】の 予定【よてい】が カレンダーに あります 書【か】いて。",
          "書【か】いて カレンダーに 会議【かいぎ】の 予定【よてい】が あります。",
          "あります 会議【かいぎ】の 予定【よてい】が カレンダーに 書【か】いて。"
        ],
        "correctAnswer": "カレンダーに 会議【かいぎ】の 予定【よてい】が 書【か】いて あります。",
        "explanation": "Lokasi (カレンダーに) + Subjek keadaan (会議の予定が) + V-te aru (書いてあります).",
        "diagnosticFeedback": {
          "会議【かいぎ】の 予定【よてい】が カレンダーに あります 書【か】いて。": "Salah susun predikat terpisah.",
          "書【か】いて カレンダーに 会議【かいぎ】の 予定【よてい】が あります。": "Salah urutan awal kalimat.",
          "あります 会議【かいぎ】の 予定【よてい】が カレンダーに 書【か】いて。": "Salah posisi verba bantu."
        }
      },
      {
        "id": "drill-5",
        "type": "nuance_analysis",
        "instruction": "Langkah 5 (Analisis Nuansa): Bedakan nuansa \"ドアが開いている\" vs \"ドアが開けてある\".",
        "sentencePrompt": "Pernyataan \"ドアが開けてある\" mengimplikasikan bahwa:",
        "options": [
          "Seseorang sengaja membuka pintu tersebut demi tujuan tertentu (misal sirkulasi udara)",
          "Pintu tersebut terbuka sendiri karena hembusan angin sepoi-sepoi",
          "Pintu tersebut rusak engselnya sehingga tidak bisa ditutup",
          "Pintu tersebut sedang dalam proses diganti yang baru oleh tukang kayu"
        ],
        "correctAnswer": "Seseorang sengaja membuka pintu tersebut demi tujuan tertentu (misal sirkulasi udara)",
        "explanation": "〜てある selalu menyiratkan adanya niat/tujuan manusia di balik kondisi benda tersebut.",
        "diagnosticFeedback": {
          "Pintu tersebut terbuka sendiri karena hembusan angin sepoi-sepoi": "Salah: Ini adalah nuansa ドアが開いている (kondisi alami).",
          "Pintu tersebut rusak engselnya sehingga tidak bisa ditutup": "Salah: Kerusakan adalah 故障している.",
          "Pintu tersebut sedang dalam proses diganti yang baru oleh tukang kayu": "Salah: Ini bukan makna te-aru."
        }
      }
    ],
    "can_do_challenge": {
      "statement": "Bisa mengecek papan pengumuman kerja dan memastikan pintu darurat terkunci rapi.",
      "situation": "Ditanya oleh pengawas apakah instruksi kerja sudah dipasang di papan.",
      "promptTask": "Katakan bahwa lembar instruksi sudah tertempel rapi di papan pengumuman!",
      "modelAnswer": "はい、掲示板【けいじばん】に 指示書【しじしょ】が 貼【は】って あります。",
      "modelAnswerId": "Ya, lembar instruksi sudah tertempel rapi di papan pengumuman.",
      "culturalEtiquette": "Tunjuk ke arah papan pengumuman dengan tangan terbuka santun.",
      "skillUnlocked": [
        "Menguasai deskripsi keadaan hasil sengaja via V-te aru",
        "Mampu melakukan inspeksi fasilitas kerja mandiri"
      ]
    },
    "pocket_summary": {
      "keyFormula": "[Kata Benda] が [Verba Transitif-te] ある (tertata sengaja) vs [Kata Benda] が [Verba Intransitif-te] いる (alami)",
      "coreWords": [
        "はってある",
        "かいてある",
        "ならべてある",
        "しまってある"
      ],
      "coreWarning": "Ingat: Jangan pernah memasangkan verba intransitif ke 〜てある (misal: ドアが開いてある adalah SALAH).",
      "quickDialogue": "A: 地図は？ → B: 壁に貼ってあります。"
    }
  },
  "les-n4-u07-01": {
    "pedagogical_framework": {
      "what": {
        "summary": "Menyampaikan permohonan maaf yang tulus dan santun atas kesalahan/keterlambatan (~te sumimasen / gomennasai) dan mengungkapkan rasa syukur atas hasil yang melegakan hati (~te yokatta).",
        "canDo": "Bisa meminta maaf kepada atasan saat datang terlambat karena kendala kereta dan mengabarkan situasi dengan lega.",
        "targetPatterns": [
          "[Verba-te] すみません / 申【もう】し訳【わけ】ありません (maaf sudah / mohon maaf atas)",
          "[Verba-nai -> nakute] すみません (maaf karena tidak...)",
          "[Verba-te] よかった (syukurlah sudah...)",
          "[Verba-nai -> nakute] よかった (syukurlah tidak...)"
        ],
        "coreVocabSample": [
          "おくれる",
          "ちこく",
          "ちえんしょうめいしょ",
          "じこ",
          "あんしんする",
          "たすかる"
        ]
      },
      "sensei_context": {
        "sceneIntro": "Di pintu masuk kantor perusahaan. Budi datang terengah-engah terlambat 15 menit karena jalur kereta tertahan gangguan sinyal.",
        "dailyMission": "Gunakan frasa 〜てすみません untuk meminta maaf atas ketidaknyamanan, dan sertakan surat bukti keterlambatan kereta (chien shoumeisho).",
        "whyOrder": "Di Jepang, keterlambatan tanpa konfirmasi adalah pelanggaran etika berat. Pembelajar harus menguasai tata cara minta maaf yang profesional dan elegan."
      },
      "cultural_notes": {
        "title": "Keterlambatan Kereta & Surat Bukti Chien Shoumeisho (遅延証明書)",
        "etiquette": "Jika kereta terlambat di Jepang, mintalah surat \"Chien Shoumeisho\" dari petugas stasiun atau unduh dari aplikasi kereta. Serahkan ke atasan sambil membungkuk sopan meminta maaf.",
        "taboos": "Jangan menggunakan kata \"gomen ne\" kepada atasan atau senior. Gunakan ragam formal: お待たせして申し訳ありません (Omatase shite moushiwake arimasen)."
      },
      "pronunciation_tips": {
        "title": "Intonasi Permohonan Maaf Santun yang Tulus",
        "moraNote": "Frasa \"okurete sumimasen\" diucapkan dengan nada merendah dan jeda lembut.",
        "soundTip": "Pada saat mengucapkan \"moushiwake arimasen\", tundukkan kepala sekitar 30 derajat."
      },
      "common_pitfalls": [
        {
          "title": "Memakai Alasan Sebelum \"Kara\" Tanpa Permohonan Maaf Berbentuk -Te",
          "caseScenario": "Hanya mengatakan \"Densha ga okureta kara\" tanpa meminta maaf.",
          "pitfallWarning": "\"電車【でんしゃ】が 遅【おく】れましたから。\" (Terdengar membela diri)",
          "rightSolution": "\"電車【でんしゃ】が 遅【おく】れて、遅刻【ちこく】して すみません。\" (Santun dan profesional)",
          "explanation": "Di Jepang, atasan ingin mendengar permohonan maaf atas dampaknya terlebih dahulu, baru penjelasan faktualnya melalui verba bentuk sambung -te sumimasen."
        },
        {
          "title": "Salah Bentuk Negatif untuk Permohonan Maaf (De wa nakute)",
          "caseScenario": "Meminta maaf karena tidak menghubungi lebih awal.",
          "pitfallWarning": "\"連絡【れんらく】しない すみません。\"",
          "rightSolution": "\"連絡【れんらく】しなくて すみませんでした。\"",
          "explanation": "Bentuk sangkalan sebelum sumimasen wajib diubah menjadi bentuk [V-nakute]: renraku shinakute sumimasen."
        }
      ],
      "who_and_when": {
        "situational_context": "Terlambat masuk kerja karena kendala transportasi, kelupaan membawa dokumen penting, atau bersyukur atas hasil tes kesehatan yang baik.",
        "social_relations": "Wajib digunakan oleh bawahan kepada atasan, atau antarrekan kerja.",
        "when_not_to_use": "Jangan memakai 〜てよかった saat membicarakan kemalangan atau musibah yang menimpa orang lain."
      },
      "scenario": {
        "title": "Permohonan Maaf Keterlambatan Kereta di Pagi Hari",
        "setting": "Lobi kantor lantai 2, pukul 08.45",
        "narrative": "Budi tiba terlambat karena gangguan kereta dan segera meminta maaf kepada Tanaka-senpai sambil menunjukkan bukti keterlambatan."
      }
    },
    "dialogue": [
      {
        "id": "d1",
        "speaker": "Budi",
        "speakerRole": "Pembelajar Indonesia",
        "avatar": "🙋‍♂️",
        "jp": "田中【たなか】さん、遅【おく】れて 本当【ほんとう】に すみません！",
        "furigana": "田中さん、遅れて 本当に すみません！",
        "romaji": "Tanaka-san, okurete hontou ni sumimasen!",
        "idText": "Tanaka-san, sungguh mohon maaf sebesar-besarnya saya datang terlambat!"
      },
      {
        "id": "d2",
        "speaker": "Tanaka",
        "speakerRole": "Supervisor Kantor",
        "avatar": "🧑‍💼",
        "jp": "ブディさん、どうしたの？ 息【いき】が 切【き】れているよ。",
        "furigana": "ブディさん、どうしたの？ 息が 切れているよ。",
        "romaji": "Budi-san, dou shita no? Iki ga kirete iru yo.",
        "idText": "Budi-san, kamu kenapa? Nafasmu sampai terengah-engah begitu."
      },
      {
        "id": "d3",
        "speaker": "Budi",
        "speakerRole": "Pembelajar Indonesia",
        "avatar": "🙋‍♂️",
        "jp": "電車【でんしゃ】の 信号【しんごう】トラブルで ２０分【にじゅっぷん】 止【と】まって しまいました。遅延【ちえん】証明書【しょうめいしょ】です。",
        "furigana": "電車の 信号トラブルで ２０分 止まって しまいました。遅延証明書です。",
        "romaji": "Densha no shingou toraburu de nijuppun tomatte shimaimashita. Chien shoumeisho desu.",
        "idText": "Karena kendala sinyal kereta, perjalanan tertahan 20 menit. Ini surat bukti keterlambatan dari stasiun."
      },
      {
        "id": "d4",
        "speaker": "Tanaka",
        "speakerRole": "Supervisor Kantor",
        "avatar": "🧑‍💼",
        "jp": "そうだったんだね。事故【じこ】に 巻【ま】き込【こ】まれなくて よかったよ。怪我【けが】は なかった？",
        "furigana": "そうだったんだね。事故に 巻き込まれなくて よかったよ。怪我は なかった？",
        "romaji": "Sou datta n da ne. Jiko ni makikomarenakute yokatta yo. Kega wa nakatta?",
        "idText": "Ternyata begitu ya. Syukurlah kamu tidak terlibat dalam kecelakaan. Tidak ada luka apa-apa kan?"
      },
      {
        "id": "d5",
        "speaker": "Budi",
        "speakerRole": "Pembelajar Indonesia",
        "avatar": "🙋‍♂️",
        "jp": "はい、怪我【けが】は ありませんでした。ご心配【しんぱい】を おかけして 申【もう】し訳【わけ】ありません。",
        "furigana": "はい、怪我は ありませんでした。ご心配を おかけして 申し訳ありません。",
        "romaji": "Hai, kega wa arimasen deshita. Goshinpai o okake shite moushiwake arimasen.",
        "idText": "Iya, saya tidak mengalami luka apa pun. Mohon maaf sudah membuat Anda khawatir."
      },
      {
        "id": "d6",
        "speaker": "Tanaka",
        "speakerRole": "Supervisor Kantor",
        "avatar": "🧑‍💼",
        "jp": "無事【ぶじ】で 安心【あんしん】したよ。お茶【ちゃ】を 飲【の】んで 呼吸【こきゅう】を 整【ととの】えてから 始【はじ】めよう。",
        "furigana": "無事で 安心したよ。お茶を 飲んで 呼吸を 整えてから 始めよう。",
        "romaji": "Buji de anshin shita yo. Ocha o nonde kokyuu o totonoete kara hajimeyou.",
        "idText": "Syukurlah kamu selamat, saya merasa lega. Minum teh dulu untuk menenangkan nafas, baru setelah itu kita mulai."
      }
    ],
    "drills": [
      {
        "id": "drill-1",
        "type": "vocab_context",
        "instruction": "Langkah 1 (Konsep Kata): Pilihlah dokumen resmi stasiun yang membuktikan keterlambatan jadwal kereta.",
        "sentencePrompt": "Surat bukti resmi dari stasiun bahwa kereta mengalami keterlambatan adalah:",
        "options": [
          "遅延【ちえん】証明書【しょうめいしょ】",
          "領収書【りょうしゅうしょ】 (Kwitansi bayar)",
          "身分【みぶん】証明書【しょうめいしょ】 (KTP/ID)",
          "健康【けんこう】保険証【ほけんしょう】 (Kartu BPJS/Asuransi)"
        ],
        "correctAnswer": "遅延【ちえん】証明書【しょうめいしょ】",
        "explanation": "遅延証明書 (chien shoumeisho) adalah bukti sah bahwa keterlambatan disebabkan gangguan teknis moda transportasi publik.",
        "diagnosticFeedback": {
          "領収書【りょうしゅうしょ】 (Kwitansi bayar)": "Salah: 領収書 adalah kuitansi pembayaran tanda terima uang.",
          "身分【みぶん】証明書【しょうめいしょ】 (KTP/ID)": "Salah: 身分証明書 adalah kartu identitas pengenal diri.",
          "健康【けんこう】保険証【ほけんしょう】 (Kartu BPJS/Asuransi)": "Salah: 健康保険証 adalah kartu asuransi kesehatan."
        }
      },
      {
        "id": "drill-2",
        "type": "grammar_choice",
        "instruction": "Langkah 2 (Formula Minta Maaf): Lengkapi ungkapan permohonan maaf karena datang terlambat.",
        "sentencePrompt": "約束【やくそく】の 時間【じかん】に（　　）すみませんでした。",
        "options": [
          "遅【おく】れて",
          "遅【おく】れる",
          "遅【おく】れた",
          "遅【おく】れそう"
        ],
        "correctAnswer": "遅【おく】れて",
        "explanation": "Pola permohonan maaf atas aksi yang dilakukan adalah [Verba-te] + すみません (遅れてすみません).",
        "diagnosticFeedback": {
          "遅れる": "Salah: Bentuk kamus tidak bisa bersambung langsung ke sumimasen.",
          "遅れた": "Salah: Bentuk lampau ta tidak bisa langsung ke sumimasen tanpa konektor.",
          "遅れそう": "Salah: Ini bermakna kelihatannya akan terlambat."
        }
      },
      {
        "id": "drill-3",
        "type": "particle_select",
        "instruction": "Langkah 3 (Ekspresi Syukur Melegakan): Lengkapi kalimat rasa syukur tidak turun hujan lebat saat berkemah.",
        "sentencePrompt": "雨【あめ】が 降【ふ】ら（　　）本当【ほんとう】に よかったです。",
        "options": [
          "なくて",
          "ないで",
          "ずに",
          "なければ"
        ],
        "correctAnswer": "なくて",
        "explanation": "Untuk menyatakan syukur atas hal negatif yang TIDAK terjadi, gunakan [Verba-nai -> nakute] + よかった (降らなくてよかった).",
        "diagnosticFeedback": {
          "ないで": "Salah: ないで bermakna \"tanpa melakukan\", bukan alasan syukur.",
          "ずに": "Salah: ずに adalah bentuk formal dari naide.",
          "なければ": "Salah: なければ bermakna pengandaian \"jika tidak\"."
        }
      },
      {
        "id": "drill-4",
        "type": "sentence_ordering",
        "instruction": "Langkah 4 (Susun Kalimat): Rangkai kalimat permohonan maaf karena lambat membalas pesan email.",
        "sentencePrompt": "Susunlah kata-kata: \"Mohon maaf balasan email dari saya terlambat\".",
        "tokens": [
          "返信【へんしん】が",
          "遅【おく】くなって",
          "申【もう】し訳【わけ】",
          "ありませんでした"
        ],
        "correctOrder": [
          0,
          1,
          2,
          3
        ],
        "options": [
          "返信【へんしん】が 遅【おく】くなって 申【もう】し訳【わけ】 ありませんでした。",
          "遅【おく】くなって 返信【へんしん】が ありませんでした 申【もう】し訳【わけ】。",
          "申【もう】し訳【わけ】 返信【へんしん】が 遅【おく】くなって ありませんでした。",
          "ありませんでした 遅【おく】くなって 返信【へんしん】が 申【もう】し訳【わけ】。"
        ],
        "correctAnswer": "返信【へんしん】が 遅【おく】くなって 申【もう】し訳【わけ】 ありませんでした。",
        "explanation": "Subjek (返信が) + I-adj te-form (遅くなって) + Moushiwake arimasen deshita.",
        "diagnosticFeedback": {
          "遅【おく】くなって 返信【へんしん】が ありませんでした 申【もう】し訳【わけ】。": "Salah susun frasa.",
          "申【もう】し訳【わけ】 返信【へんしん】が 遅【おく】くなって ありませんでした。": "Salah urutan pembuka kalimat.",
          "ありませんでした 遅【おく】くなって 返信【へんしん】が 申【もう】し訳【わけ】。": "Salah posisi verba negatif."
        }
      },
      {
        "id": "drill-5",
        "type": "nuance_analysis",
        "instruction": "Langkah 5 (Analisis Nuansa): Analisislah makna ungkapan \"早く病院に行ってよかったですね\".",
        "sentencePrompt": "Ungkapan \"早【はや】く 病院【びょういん】に 行【い】って よかったですね\" memiliki arti:",
        "options": [
          "Syukurlah kamu segera pergi periksa ke rumah sakit (sehingga penyakitnya tidak parah)",
          "Kamu sebaiknya segera pergi ke rumah sakit sekarang juga",
          "Tidak perlu pergi ke rumah sakit karena sakitnya biasa saja",
          "Apakah kamu sudah pernah pergi ke rumah sakit sebelumnya?"
        ],
        "correctAnswer": "Syukurlah kamu segera pergi periksa ke rumah sakit (sehingga penyakitnya tidak parah)",
        "explanation": "V-te yokatta desu ne mengekspresikan rasa lega dan simpati positif bahwa tindakan masa lalu membawa dampak baik.",
        "diagnosticFeedback": {
          "Kamu sebaiknya segera pergi ke rumah sakit sekarang juga": "Salah: Ini adalah saran V-ta hou ga ii desu yo.",
          "Tidak perlu pergi ke rumah sakit karena sakitnya biasa saja": "Salah: Ini adalah ikanaide mo ii desu.",
          "Apakah kamu sudah pernah pergi ke rumah sakit sebelumnya?": "Salah: Ini adalah pola pengalaman itta koto ga arimasu ka."
        }
      }
    ],
    "can_do_challenge": {
      "statement": "Bisa meminta maaf kepada atasan saat datang terlambat karena kendala kereta.",
      "situation": "Tiba di kantor terlambat 15 menit dan melapor kepada manajer departemen.",
      "promptTask": "Minta maaflah dengan sopan bahwa keretanya terlambat sehingga kamu datang terlambat!",
      "modelAnswer": "電車【でんしゃ】が 遅【おく】れて、遅刻【ちこく】してしまい 申【もう】し訳【わけ】ありませんでした。",
      "modelAnswerId": "Kereta mengalami keterlambatan, mohon maaf sebesar-besarnya saya terlambat masuk.",
      "culturalEtiquette": "Tundukkan badan sekitar 30 derajat sambil menyerahkan surat bukti keterlambatan.",
      "skillUnlocked": [
        "Menguasai etika dan formula permohonan maaf profesional V-te moushiwake arimasen",
        "Mampu mengekspresikan rasa lega emosional positif V-te yokatta"
      ]
    },
    "pocket_summary": {
      "keyFormula": "[V-te / V-nakute] + すみません (maaf atas) / [V-te / V-nakute] + よかった (syukurlah)",
      "coreWords": [
        "おくれる",
        "ちこく",
        "ちえんしょうめいしょ",
        "あんしんする"
      ],
      "coreWarning": "Gunakan bentuk sambung -te untuk permohonan maaf; jangan hanya mengulang alasan tanpa kata maaf.",
      "quickDialogue": "A: 遅れてすみません。 → B: 無事でよかった！"
    }
  },
  "les-n4-u07-02": {
    "pedagogical_framework": {
      "what": {
        "summary": "Menyatakan keadaan yang dibiarkan tetap berlangsung apa adanya tanpa perubahan yang semestinya (~mama), serta mengungkapkan peristiwa yang terkadang terjadi sesekali (~koto ga aru).",
        "canDo": "Bisa menegur rekan yang lupa mematikan sakelar AC atau lampu kerja dan menjelaskan kebiasaan harian.",
        "targetPatterns": [
          "[Verba-ta] まま (dibiarkan tetap dalam keadaan ...)",
          "[Kata Benda] の まま / [I-Adj] まま (dalam kondisi aslinya)",
          "[Verba Kamus] ことが ある (kadang-kadang / ada kalanya terjadi)",
          "[Verba-nai] ことが ある (kadang-kadang tidak ...)"
        ],
        "coreVocabSample": [
          "つけたまま",
          "あけたまま",
          "わすれる",
          "しょうエネ",
          "たまに",
          "ときどき"
        ]
      },
      "sensei_context": {
        "sceneIntro": "Di ruang istirahat staf kantor saat jam pulang kerja. Sakura mendapati sakelar pendingin ruangan dan lampu wastafel masih menyala padahal sudah kosong.",
        "dailyMission": "Gunakan frasa 〜たまま untuk mengingatkan tindakan yang lupa dituntaskan, dan 〜ことがある untuk frekuensi kejadian sesekali.",
        "whyOrder": "Penghematan energi dan kedisiplinan mematikan sakelar (shou-ene) adalah bagian penting dari budaya kerja dan asrama di Jepang."
      },
      "cultural_notes": {
        "title": "Kedisiplinan Penghematan Energi (省エネ - Shou-Ene) di Jepang",
        "etiquette": "Sebelum pulang dari kantor atau meninggalkan kamar asrama, pastikan AC, lampu, dan keran air tidak dibiarkan menyala (tsuketa mama ni shinai). Ini adalah etika dasar hidup bersama.",
        "taboos": "Jangan tertukar antara V-ta koto ga aru (pengalaman pernah sekali di masa lalu) vs V-ru koto ga aru (kejadian yang kadang terjadi berulang di masa sekarang)."
      },
      "pronunciation_tips": {
        "title": "Intonasi Teguran Halus \"-Ta mama desu yo\"",
        "moraNote": "Frasa \"tsuketa mama\" memiliki 5 mora (tsu-ke-ta-ma-ma) dengan nada datar ramah.",
        "soundTip": "Tambahkan partikel penegas empati \"yo\" di akhir kalimat agar teguran tidak terdengar memarahi."
      },
      "common_pitfalls": [
        {
          "title": "Tertukar Antara V-ta koto ga aru (Pengalaman) vs V-ru koto ga aru (Kadang Terjadi)",
          "caseScenario": "Ingin mengatakan \"saya kadang-kadang lupa membawa payung\".",
          "pitfallWarning": "\"傘【かさ】を 忘【わす】れた ことが あります。\" (Artinya: Saya pernah punya pengalaman lupa payung)",
          "rightSolution": "\"たまに 傘【かさ】を 忘【わす】れる ことが あります。\" (Benar: Kadang-kadang terjadi kebiasaan)",
          "explanation": "Bentuk kamus V-ru + ことがある berarti rutinitas yang kadang terjadi sesekali. Bentuk lampau V-ta + ことがある berarti riwayat pengalaman masa lalu."
        },
        {
          "title": "Salah Bentuk Kata Benda Sebelum \"Mama\"",
          "caseScenario": "Menyambungkan kata benda ke mama tanpa partikel no.",
          "pitfallWarning": "\"昔【むかし】 ままです。\"",
          "rightSolution": "\"昔【むかし】の ままです。\"",
          "explanation": "Kata benda wajib disambung dengan partikel の sebelum mama: Mukashi no mama (tetap seperti masa lampau)."
        }
      ],
      "who_and_when": {
        "situational_context": "Pemeriksaan sakelar fasilitas kantor sebelum pulang, mengingatkan teman asrama yang lupa mencabut colokan listrik, atau obrolan santai kebiasaan tidur.",
        "social_relations": "Sangat sering diucapkan oleh pengawas asrama, mentor kerja, maupun antarteman sekamar.",
        "when_not_to_use": "Jangan gunakan teguran keras kepada tamu kehormatan perusahaan."
      },
      "scenario": {
        "title": "Teguran Ramah Mematikan Sakelar Lampu Kantor",
        "setting": "Dapur kantor lantai 1, pukul 18.00",
        "narrative": "Budi menyadari lampu pantry masih menyala dan mengingatkan Kenji bahwa lampu dibiarkan menyala begitu saja."
      }
    },
    "dialogue": [
      {
        "id": "d1",
        "speaker": "Budi",
        "speakerRole": "Pembelajar Indonesia",
        "avatar": "🙋‍♂️",
        "jp": "ケンジさん、給湯室【きゅうとうしつ】の 電気が ついた ままでしたよ。",
        "furigana": "ケンジさん、給湯室の 電気が ついた ままでしたよ。",
        "romaji": "Kenji-san, kyuutoushitsu no denki ga tsuita mama deshita yo.",
        "idText": "Kenji-san, lampu ruang dapur air dibiarkan tetap menyala begitu saja lho."
      },
      {
        "id": "d2",
        "speaker": "Kenji",
        "speakerRole": "Rekan Kerja",
        "avatar": "🧑‍💻",
        "jp": "あ、いけない！ コーヒーを 入【い】れて、そのまま 戻【もど】って きちゃった。",
        "furigana": "あ、いけない！ コーヒーを 入れて、そのまま 戻って きちゃった。",
        "romaji": "A, ikenai! Ko-hi- o irete, sono mama modotte kichatta.",
        "idText": "Aduh, gawat! Habis menyeduh kopi, saya langsung kembali begitu saja."
      },
      {
        "id": "d3",
        "speaker": "Budi",
        "speakerRole": "Pembelajar Indonesia",
        "avatar": "🙋‍♂️",
        "jp": "私【わたし】が 消【け】して おきましたから、大丈夫【だいじょうぶ】ですよ。",
        "furigana": "私が 消して おきましたから、大丈夫ですよ。",
        "romaji": "Watashi ga keshite okimashita kara, daijoubu desu yo.",
        "idText": "Sudah saya matikan tadi, jadi aman kok."
      },
      {
        "id": "d4",
        "speaker": "Kenji",
        "speakerRole": "Rekan Kerja",
        "avatar": "🧑‍💻",
        "jp": "ありがとう、ブディ。急【いそ】いで いると、時々【ときどき】 うっかり 忘【わす】れる ことが あるんだ。",
        "furigana": "ありがとう、ブディ。急いで いると、時々 うっかり 忘れる ことが あるんだ。",
        "romaji": "Arigatou, Budi. Isoide iru to, tokidoki ukkari wasureru koto ga aru n da.",
        "idText": "Terima kasih ya Budi. Kalau sedang terburu-buru, memang kadang-kadang ada kalanya saya teledor lupa."
      },
      {
        "id": "d5",
        "speaker": "Budi",
        "speakerRole": "Pembelajar Indonesia",
        "avatar": "🙋‍♂️",
        "jp": "誰【だれ】でも そういう ことが ありますよね。省【しょう】エネのために 気【き】を つけましょう。",
        "furigana": "誰でも そういう ことが ありますよね。省エネのために 気を つけましょう。",
        "romaji": "Dare demo sou iu koto ga arimasu yo ne. Shou-ene no tame ni ki o tsukemashou.",
        "idText": "Siapa pun kadang mengalami hal seperti itu ya. Mari kita saling jaga demi hemat energi."
      },
      {
        "id": "d6",
        "speaker": "Kenji",
        "speakerRole": "Rekan Kerja",
        "avatar": "🧑‍💻",
        "jp": "そうだね！ 声【こえ】を かけてくれて 助【たす】かったよ。",
        "furigana": "そうだね！ 声を かけてくれて 助かったよ。",
        "romaji": "Sou da ne! Koe o kakete kurete tasukatta yo.",
        "idText": "Betul sekali! Terima kasih sudah menegur dan mengingatkan saya."
      }
    ],
    "drills": [
      {
        "id": "drill-1",
        "type": "vocab_context",
        "instruction": "Langkah 1 (Konsep Kata): Pilihlah kata keterangan frekuensi yang bermakna \"kadang-kadang / sesekali\".",
        "sentencePrompt": "Kata keterangan yang paling cocok menyertai pola [V-ru] ことが ある adalah:",
        "options": [
          "時々【ときどき】 / たまに (Kadang-kadang)",
          "いつも (Selalu setiap saat)",
          "ぜんぜん (Sama sekali tidak)",
          "かならず (Pasti tanpa kecuali)"
        ],
        "correctAnswer": "時々【ときどき】 / たまに (Kadang-kadang)",
        "explanation": "時々 (tokidoki) atau たまに (tamani) mencerminkan frekuensi berkala yang terjadi sesekali.",
        "diagnosticFeedback": {
          "いつも (Selalu setiap saat)": "Salah: いつも menyatakan kebiasaan mutlak rutin terus-menerus.",
          "ぜんぜん (Sama sekali tidak)": "Salah: ぜんぜん harus berpasangan dengan bentuk negatif.",
          "かならず (Pasti tanpa kecuali)": "Salah: かならず menyatakan kepastian 100%."
        }
      },
      {
        "id": "drill-2",
        "type": "grammar_choice",
        "instruction": "Langkah 2 (Pola Keadaan Bertahan): Lengkapi kalimat larangan tidur dengan sepatu masih terpasang.",
        "sentencePrompt": "靴【くつ】を（　　）まま、部屋【へや】に 入【はい】らないで ください。",
        "options": [
          "履【は】いた",
          "履【は】く",
          "履【は】いて",
          "履【は】かない"
        ],
        "correctAnswer": "履【は】いた",
        "explanation": "Pola dibiarkan dalam kondisi aksi selesai adalah [Verba-ta] + まま (履いたまま = tetap memakai sepatu).",
        "diagnosticFeedback": {
          "履く": "Salah: Bentuk kamus tidak dipasangkan dengan mama untuk keadaan aksi tubuh.",
          "履いて": "Salah: Bentuk te tidak bersambung langsung ke mama.",
          "履かない": "Salah: Ini bermakna tanpa memakai sepatu (hakanai mama)."
        }
      },
      {
        "id": "drill-3",
        "type": "particle_select",
        "instruction": "Langkah 3 (Partikel Kata Benda Sebelum Mama): Tentukan partikel penyambung kata benda.",
        "sentencePrompt": "昔【むかし】（　　）ままの 美【うつく】しい 景色【けしき】が 残【のこ】って います。",
        "options": [
          "の",
          "な",
          "に",
          "で"
        ],
        "correctAnswer": "の",
        "explanation": "Kata benda wajib menggunakan partikel の sebelum kata まま (昔のまま = apa adanya seperti zaman dulu).",
        "diagnosticFeedback": {
          "な": "Salah: な dipakai untuk kata sifat-na (例: 静かなまま).",
          "に": "Salah: に tidak dipakai sebagai penyambung kata benda ke mama.",
          "で": "Salah: で menandai sarana."
        }
      },
      {
        "id": "drill-4",
        "type": "sentence_ordering",
        "instruction": "Langkah 4 (Susun Kalimat): Rangkai kalimat pengakuan bahwa kadang-kadang sarapan terlewatkan.",
        "sentencePrompt": "Susunlah kata-kata: \"Kadang-kadang ada kalanya saya tidak sarapan pagi\".",
        "tokens": [
          "忙【いそが】しい ときは",
          "朝【あさ】ごはんを",
          "食【た】べない",
          "ことが あります"
        ],
        "correctOrder": [
          0,
          1,
          2,
          3
        ],
        "options": [
          "忙【いそが】しい ときは 朝【あさ】ごはんを 食【た】べない ことが あります。",
          "朝【あさ】ごはんを 忙【いそが】しい ときは ことが あります 食【た】べない。",
          "食【た】べない 忙【いそが】しい ときは 朝【あさ】ごはんを ことが あります。",
          "ことが あります 朝【あさ】ごはんを 食【た】べない 忙【いそが】しい ときは。"
        ],
        "correctAnswer": "忙【いそが】しい ときは 朝【あさ】ごはんを 食【た】べない ことが あります。",
        "explanation": "Kondisi (忙しいときは) + Objek (朝ごはんを) + V-nai (食べない) + ことがあります.",
        "diagnosticFeedback": {
          "朝【あさ】ごはんを 忙【いそが】しい ときは ことが あります 食【た】べない。": "Salah struktur predikat.",
          "食【た】べない 忙【いそが】しい ときは 朝【あさ】ごはんを ことが あります。": "Salah susun verba terpotong.",
          "ことが あります 朝【あさ】ごはんを 食【た】べない 忙【いそが】しい ときは。": "Salah susun fatal."
        }
      },
      {
        "id": "drill-5",
        "type": "nuance_analysis",
        "instruction": "Langkah 5 (Analisis Nuansa): Bedakan makna \"日本へ行ったことがある\" vs \"日本へ行くことがある\".",
        "sentencePrompt": "Kalimat \"仕事【しごと】で 日本【にほん】へ 行【い】く ことが あります\" memiliki makna:",
        "options": [
          "Kadang-kadang dalam urusan kerja ada kalanya saya pergi ke Jepang (kebiasaan berkala)",
          "Saya pernah punya pengalaman sekali pergi ke Jepang di masa lalu",
          "Saya bertekad untuk pergi ke Jepang tahun depan",
          "Saya sedang berada di dalam pesawat menuju ke Jepang sekarang"
        ],
        "correctAnswer": "Kadang-kadang dalam urusan kerja ada kalanya saya pergi ke Jepang (kebiasaan berkala)",
        "explanation": "Verba Kamus + ことがある menyatakan kejadian rutin yang kadang terjadi. Kalau V-ta + ことがある barulah menyatakan riwayat pengalaman masa lalu.",
        "diagnosticFeedback": {
          "Saya pernah punya pengalaman sekali pergi ke Jepang di masa lalu": "Salah: Ini adalah bentuk lampau 行ったことがある.",
          "Saya bertekad untuk pergi ke Jepang tahun depan": "Salah: Ini adalah pola niat 行くつもりです.",
          "Saya sedang berada di dalam pesawat menuju ke Jepang sekarang": "Salah: Ini adalah pola 行っているところです."
        }
      }
    ],
    "can_do_challenge": {
      "statement": "Bisa menegur rekan yang lupa mematikan sakelar AC kantor.",
      "situation": "Melihat AC di ruang istirahat masih berbunyi menyala padahal rekan kerja sudah beranjak pergi.",
      "promptTask": "Tegur rekanmu dengan ramah bahwa pendingin ruangannya masih menyala!",
      "modelAnswer": "エアコンが ついた ままでしたよ。消【け】しましょうか。",
      "modelAnswerId": "AC-nya masih dibiarkan menyala begitu saja lho. Mau saya matikan?",
      "culturalEtiquette": "Ucapkan dengan nada bersahabat dan tawarkan bantuan solusi tanpa nada menyalahkan.",
      "skillUnlocked": [
        "Menguasai ekspresi kondisi terabaikan via V-ta mama",
        "Mampu membedakan rutinitas sesekali (V-ru koto ga aru) vs pengalaman lampau"
      ]
    },
    "pocket_summary": {
      "keyFormula": "[V-ta / N-no] + まま (tetap dibiarkan apa adanya) / [V-ru / V-nai] + ことがある (kadang-kadang)",
      "coreWords": [
        "つけたまま",
        "あけたまま",
        "わすれる",
        "たまに"
      ],
      "coreWarning": "V-ru koto ga aru = kadang-kadang terjadi; V-ta koto ga aru = pernah berpengalaman di masa lalu.",
      "quickDialogue": "A: 電気がついたままだよ。 → B: ごめん、消してきます！"
    }
  }
};
