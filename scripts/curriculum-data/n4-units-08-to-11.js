module.exports = {
  "les-n4-u08-01": {
    "pedagogical_framework": {
      "what": {
        "summary": "Sistem memberi dan menerima bantuan (授受表現 juju hyougen: 〜てあげる, 〜てくれる, 〜てもらう) dan menyampaikan harapan agar orang lain melakukan sesuatu (~te hoshii / moraitai).",
        "canDo": "Bisa berterima kasih atas bantuan rekan kerja dan meminta tolong mengajari operasional sistem baru.",
        "targetPatterns": [
          "[Verba-te] あげる (melakukan bantuan untuk orang lain setara/bawah)",
          "[Verba-te] くれる (seseorang berbuat baik untuk saya/kelompok saya)",
          "[Verba-te] もらう (saya menerima jasa kebaikan dari seseorang)",
          "[Orang] に [Verba-te] ほしい / もらいたい (ingin seseorang melakukan ...)"
        ],
        "coreVocabSample": [
          "てつだう",
          "おしえる",
          "せつめい",
          "あんない",
          "うれしい",
          "かんしゃ"
        ]
      },
      "sensei_context": {
        "sceneIntro": "Di meja kerja departemen TI. Sakura dengan sabar membantu Budi yang kesulitan memasukkan data ke dalam sistem inventaris baru.",
        "dailyMission": "Gunakan 〜てくれる saat menerima pertolongan spontan, dan 〜てもらう saat sengaja memohon bantuan orang lain.",
        "whyOrder": "Hubungan interpersonal di tempat kerja Jepang sangat bertumpu pada kesadaran saling berutang budi (On) dan apresiasi pertolongan (〜てくれる / 〜てもらう)."
      },
      "cultural_notes": {
        "title": "Etika Memberi & Menerima Bantuan (授受表現の心理 - Juju Hyougen)",
        "etiquette": "Jangan pernah mengatakan \"...te agemashou ka\" kepada atasan, karena mengesankan kamu merasa lebih superior dengan berbuat amal kepada atasan. Gunakan bentuk hormat O-... shimashou ka.",
        "taboos": "Hindari memakai 〜てあげる di hadapan orang yang baru dikenal karena terdengar arogan (\"saya sudi menolongmu\"). Gunakan 〜てあげる hanya untuk bawahan, teman akrab, atau anak-anak."
      },
      "pronunciation_tips": {
        "title": "Intonasi Partikel Penanda Arah Bantuan (Ni vs Ga)",
        "moraNote": "Rumus baku: [Pemberi] が [Saya] に 〜てくれる; [Saya] が [Pemberi] に 〜てもらう.",
        "soundTip": "Tekankan rasa terima kasih dengan intonasi hangat pada kata \"kurete arigatou\"."
      },
      "common_pitfalls": [
        {
          "title": "Tertukar Subjek antara 〜てくれる vs 〜てもらう",
          "caseScenario": "Mengatakan bahwa rekan kerja membantu saya dengan subjek rekan kerja.",
          "pitfallWarning": "\"田中【たなか】さんは 私【わたし】を 手伝【てつだ】って もらいました。\"",
          "rightSolution": "\"田中【たなか】さんが 私【わたし】を 手伝【てつだ】って くれました。\" (Benar: Tanaka yang memberi) atau \"私【わたし】は 田中【たなか】さんに 手伝【てつだ】って もらいました。\" (Benar: Saya yang menerima bantuan dari Tanaka)",
          "explanation": "Dalam 〜てくれる, subjek kalimat adalah si penolong (Tanaka-san ga). Dalam 〜てもらう, subjek kalimat adalah si penerima bantuan (Watashi wa)."
        },
        {
          "title": "Memakai 〜てほしい Kepada Atasan",
          "caseScenario": "Meminta atasan memeriksa dokumen: \"Kachou ni mite hoshii desu\".",
          "pitfallWarning": "\"課長【かちょう】に 見【み】て ほしいです。\" (Terdengar menuntut/tidak sopan)",
          "rightSolution": "\"課長【かちょう】に 見【み】て いただきたいです。\" atau \"見【み】て いただけませんか。\"",
          "explanation": "〜てほしい mengekspresikan keinginan pribadi pembicara secara blak-blakan. Kepada atasan, wajib menggunakan Keigo itadaitai / itadakemasen ka."
        }
      ],
      "who_and_when": {
        "situational_context": "Mengucapkan terima kasih saat dibantu rekan kerja, meminta bimbingan senior, atau menawarkan bantuan kepada teman magang.",
        "social_relations": "Sangat vital dalam komunikasi horizontal antarrekan kerja dan vertikal dengan senior.",
        "when_not_to_use": "Jangan gunakan 〜てあげる langsung kepada pelanggan (omokyaku-sama) atau atasan kantor."
      },
      "scenario": {
        "title": "Bantuan Mempelajari Software Sistem Baru",
        "setting": "Meja kerja kantor, pukul 10.30",
        "narrative": "Budi berterima kasih karena Sakura telah meluangkan waktu mengajarinya cara memasukkan data shift kerja."
      }
    },
    "dialogue": [
      {
        "id": "d1",
        "speaker": "Budi",
        "speakerRole": "Pembelajar Indonesia",
        "avatar": "🙋‍♂️",
        "jp": "サクラさん、昨日【きのう】は システムの 使【つか】い方【かた】を 教【おし】えてくれて 本当【ほんとう】に ありがとうございました。",
        "furigana": "サクラさん、昨日は システムの 使い方を 教えてくれて 本当に ありがとうございました。",
        "romaji": "Sakura-san, kinou wa shisutemu no tsukaikata o oshiete kurete hontou ni arigatou gozaimashita.",
        "idText": "Sakura-san, kemarin terima kasih banyak sudah berbaik hati mengajari saya cara menggunakan sistem."
      },
      {
        "id": "d2",
        "speaker": "Sakura",
        "speakerRole": "Senior Kantor",
        "avatar": "👩‍🏫",
        "jp": "どういたしまして！ もう 一人【ひとり】で 入力【にゅうりょく】 できそうですか。",
        "furigana": "どういたしまして！ もう 一人で 入力 できそうですか。",
        "romaji": "Dou itashimashite! Mou hitori de nyuuryoku dekisou desu ka.",
        "idText": "Sama-sama! Apakah kamu sudah merasa bisa menginput data sendiri?"
      },
      {
        "id": "d3",
        "speaker": "Budi",
        "speakerRole": "Pembelajar Indonesia",
        "avatar": "🙋‍♂️",
        "jp": "はい！ 田中【たなか】さんにも 画面【がめん】を 見【み】て もらって、無事【ぶじ】に 登録【とうろく】 できました。",
        "furigana": "はい！ 田中さんにも 画面を 見て もらって、無事に 登録 できました。",
        "romaji": "Hai! Tanaka-san ni mo gamen o mite moratte, buji ni touroku dekimashita.",
        "idText": "Iya! Saya juga sudah dibantu diperiksakan layarnya oleh Tanaka-san, dan pendaftaran berhasil lancar."
      },
      {
        "id": "d4",
        "speaker": "Sakura",
        "speakerRole": "Senior Kantor",
        "avatar": "👩‍🏫",
        "jp": "よかったですね。もし 分【わ】からない ことがあったら、遠慮【えんりょ】なく 言【い】ってくださいね。",
        "furigana": "よかったですね。もし 分からない ことがあったら、遠慮なく 言ってくださいね。",
        "romaji": "Yokatta desu ne. Moshi wakaranai koto ga attara, enryonaku itte kudasai ne.",
        "idText": "Syukurlah ya. Kalau ada hal yang tidak kamu pahami, jangan sungkan berbicara ya."
      },
      {
        "id": "d5",
        "speaker": "Budi",
        "speakerRole": "Pembelajar Indonesia",
        "avatar": "🙋‍♂️",
        "jp": "ありがとうございます。今度【こんど】は 私【わたし】も 後輩【こうはい】の 荷物【にもつ】運【はこ】びを 手伝【てつだ】って あげようと 思【おも】います。",
        "furigana": "ありがとうございます。今度は 私も 後輩の 荷物運びを 手伝って あげようと 思います。",
        "romaji": "Arigatou gozaimasu. Kondo wa watashi mo kouhai no nimotsuhakobi o tetsudatte ageyou to omoimasu.",
        "idText": "Terima kasih banyak. Lain kali saya berniat ingin ganti membantu membawakan barang bawaan adik kelas."
      },
      {
        "id": "d6",
        "speaker": "Sakura",
        "speakerRole": "Senior Kantor",
        "avatar": "👩‍🏫",
        "jp": "その 気持【きも】ちが 素敵【すてき】ですね！ チームで 助【たす】け合【あ】いましょう。",
        "furigana": "その 気持ちが 素敵ですね！ チームで 助け合いましょう。",
        "romaji": "Sono kimochi ga suteki desu ne! Chi-mu de tasukeaimashou.",
        "idText": "Perasaan peduli itu sungguh luar biasa! Mari kita saling membantu dalam tim."
      }
    ],
    "drills": [
      {
        "id": "drill-1",
        "type": "vocab_context",
        "instruction": "Langkah 1 (Konsep Kata): Pilihlah kata yang tepat untuk aksi saling tolong-menolong dalam tim.",
        "sentencePrompt": "Istilah dalam bahasa Jepang untuk aksi saling membantu antarrekan adalah:",
        "options": [
          "助【たす】け合【あ】い (Saling membantu)",
          "一人【ひとり】歩【ある】き (Berjalan sendirian)",
          "言【い】い合【あ】い (Saling berdebat)",
          "待【ま】ち合【あ】わせ (Janji bertemu)"
        ],
        "correctAnswer": "助【たす】け合【あ】い (Saling membantu)",
        "explanation": "助け合い (tasukeai) adalah nilai kebajikan kerja sama gotong-royong dalam budaya Jepang.",
        "diagnosticFeedback": {
          "一人歩き (Berjalan sendirian)": "Salah: 一人歩き berarti bertindak sendiri tanpa bimbingan.",
          "言い合い (Saling berdebat)": "Salah: 言い合い berarti pertengkaran mulut.",
          "待ち合わせ (Janji bertemu)": "Salah: 待ち合わせ adalah janji temu di tempat tertentu."
        }
      },
      {
        "id": "drill-2",
        "type": "grammar_choice",
        "instruction": "Langkah 2 (Seleksi Arah Bantuan): Pilihlah pola yang tepat saat rekan kerja membantumu membawa barang berat.",
        "sentencePrompt": "重【おも】い 荷物【にもつ】を ケンジさんが（　　）。",
        "options": [
          "運【はこ】んで くれました",
          "運【はこ】んで あげました",
          "運【はこ】んで もらいました",
          "運【はこ】びたいです"
        ],
        "correctAnswer": "運【はこ】んで くれました",
        "explanation": "Subjek penolong adalah Kenji-san (ケンジさんが) dan penerima manfaat adalah pembicara, maka pola yang benar adalah 〜てくれました.",
        "diagnosticFeedback": {
          "運んで あげました": "Salah: Ini bermakna pembicara yang membantu mengangkatkan untuk Kenji.",
          "運んで もらいました": "Salah: Jika subjeknya ケンジさんが, polanya bukan moraimashita (moraimashita subjeknya adalah 私).",
          "運びたいです": "Salah: Ini menyatakan keinginan pribadi diri sendiri."
        }
      },
      {
        "id": "drill-3",
        "type": "particle_select",
        "instruction": "Langkah 3 (Partikel Penanda Sumber Bantuan): Lengkapi partikel untuk si penolong dalam pola morau.",
        "sentencePrompt": "私【わたし】は 田中【たなか】さん（　　）日本語【にほんご】の 作文【さくぶん】を 直【なお】して もらいました。",
        "options": [
          "に",
          "を",
          "が",
          "へ"
        ],
        "correctAnswer": "に",
        "explanation": "Dalam pola [Penerima] は [Pemberi] に V-te morau, orang yang memberikan jasa kebaikan ditandai dengan partikel に.",
        "diagnosticFeedback": {
          "を": "Salah: を menandai objek karangan (作文を).",
          "が": "Salah: が dipakai jika polanya kuremashita (田中さんが直してくれました).",
          "へ": "Salah: へ menandai arah pergerakan fisik."
        }
      },
      {
        "id": "drill-4",
        "type": "sentence_ordering",
        "instruction": "Langkah 4 (Susun Kalimat): Rangkai kalimat ucapan terima kasih telah diajari bahasa Jepang.",
        "sentencePrompt": "Susunlah kata-kata: \"Terima kasih telah mengajari saya bahasa Jepang\".",
        "tokens": [
          "日本語【にほんご】を",
          "親切【しんせつ】に",
          "教【おし】えてくれて",
          "ありがとうございました"
        ],
        "correctOrder": [
          0,
          1,
          2,
          3
        ],
        "options": [
          "日本語【にほんご】を 親切【しんせつ】に 教【おし】えてくれて ありがとうございました。",
          "親切【しんせつ】に 日本語【にほんご】を ありがとうございました 教【おし】えてくれて。",
          "教【おし】えてくれて 日本語【にほんご】を 親切【しんせつ】に ありがとうございました。",
          "ありがとうございました 日本語【にほんご】を 親切【しんせつ】に 教【おし】えてくれて。"
        ],
        "correctAnswer": "日本語【にほんご】を 親切【しんせつ】に 教【おし】えてくれて ありがとうございました。",
        "explanation": "Objek (日本語を) + Keterangan (親切に) + V-te kurete (教えてくれて) + Arigatou gozaimashita.",
        "diagnosticFeedback": {
          "親切【しんせつ】に 日本語【にほんご】を ありがとうございました 教【おし】えてくれて。": "Salah susun frasa terima kasih terbalik.",
          "教【おし】えてくれて 日本語【にほんご】を 親切【しんせつ】に ありがとうございました。": "Salah urutan awal.",
          "ありがとうございました 日本語【にほんご】を 親切【しんせつ】に 教【おし】えてくれて。": "Salah penempatan salam penutup."
        }
      },
      {
        "id": "drill-5",
        "type": "nuance_analysis",
        "instruction": "Langkah 5 (Analisis Nuansa): Analisislah mengapa frasa \"荷物を運んであげましょうか\" tidak boleh diucapkan kepada atasan.",
        "sentencePrompt": "Mengapa Anda sebaiknya TIDAK berkata \"荷物を運んであげましょうか\" kepada manajer kantor?",
        "options": [
          "Karena 〜てあげる terdengar sombong seperti memandang rendah atasan sebagai pihak yang dikasihani",
          "Karena membawa barang atasan adalah tindakan yang dilarang oleh hukum perburuhan",
          "Karena kata 運ぶ hanya boleh dipakai untuk hewan dan benda cair",
          "Karena kalimat tersebut mengandung bentuk sangkalan negatif yang kasar"
        ],
        "correctAnswer": "Karena 〜てあげる terdengar sombong seperti memandang rendah atasan sebagai pihak yang dikasihani",
        "explanation": "Pola 〜てあげる menyiratkan hubungan hierarki dari atas ke bawah. Kepada atasan, wajib menggunakan ragam merendah (Kenjougo): お持ちしましょうか.",
        "diagnosticFeedback": {
          "Karena membawa barang atasan adalah tindakan yang dilarang oleh hukum perburuhan": "Salah: Membantu atasan adalah hal lumrah, yang salah hanyalah tata bahasanya.",
          "Karena kata 運ぶ hanya boleh dipakai untuk hewan dan benda cair": "Salah: 運ぶ berarti mengangkut benda apa pun.",
          "Karena kalimat tersebut mengandung bentuk sangkalan negatif yang kasar": "Salah: Kalimat tersebut bukan kalimat sangkalan."
        }
      }
    ],
    "can_do_challenge": {
      "statement": "Bisa berterima kasih atas bantuan rekan kerja dan meminta bimbingan santun.",
      "situation": "Rekan kerja meluangkan waktu 30 menit untuk mengajarimu cara mengoperasikan mesin bor.",
      "promptTask": "Ucapkan terima kasih bahwa dia sudah berbaik hati mengajarimu dengan ramah!",
      "modelAnswer": "親切【しんせつ】に 教【おし】えてくれて 本当【ほんとう】に ありがとうございました。",
      "modelAnswerId": "Terima kasih banyak sudah berbaik hati mengajari saya dengan sangat ramah.",
      "culturalEtiquette": "Tundukkan badan sedikit dan tersenyumlah hangat tanda ketulusan apresiasi.",
      "skillUnlocked": [
        "Menguasai sistem transaksi bantuan V-te kureru / morau",
        "Mampu menyampaikan rasa syukur secara kultural Jepang"
      ]
    },
    "pocket_summary": {
      "keyFormula": "[Pemberi] が 〜てくれる (kebaikan ke saya) / [Saya] が [Pemberi] に 〜てもらう (saya menerima bantuan)",
      "coreWords": [
        "てつだう",
        "おしえる",
        "せつめい",
        "かんしゃ"
      ],
      "coreWarning": "Jangan gunakan 〜てあげる kepada atasan; gunakan Kenjougo お...します.",
      "quickDialogue": "A: 教えてくれてありがとう！ → B: またいつでも聞いてね。"
    }
  },
  "les-n4-u08-02": {
    "pedagogical_framework": {
      "what": {
        "summary": "Meminta tolong atau permohonan izin dengan tingkatan kesantunan bertingkat (~te kuremasen ka / moraemasen ka / kudasaimasen ka), serta menanyakan batas izin (~te mo ii) dan dispensasi kelonggaran (~nakute mo ii).",
        "canDo": "Bisa memohon bimbingan pengisian formulir bank secara santun kepada staf loket dan menanyakan kelonggaran berkas.",
        "targetPatterns": [
          "[Verba-te] くれませんか / もらえませんか (maukah / bisakah tolong...)",
          "[Verba-te] くださいませんか / いただけませんか (sangat santun: sudikah kiranya...)",
          "[Verba-te] も いいですか (bolehkah saya... / apakah tidak masalah jika...)",
          "[Verba-nai -> nakute] も いいです (tidak perlu ... juga boleh)"
        ],
        "coreVocabSample": [
          "きにゅう",
          "こうざ",
          "ふりこみ",
          "みぶんしょう",
          "ハンコ",
          "いんかん"
        ]
      },
      "sensei_context": {
        "sceneIntro": "Di loket bank kantor pos Tokyo. Budi hendak membuka rekening tabungan gaji dan meminta staf loket membantunya memeriksa isian kanji pada formulir.",
        "dailyMission": "Gunakan 〜てもらえませんか untuk memohon bantuan santun di loket publik, dan pastikan izin dokumen via 〜てもいいですか.",
        "whyOrder": "Berinteraksi di loket bank, balai kota (kuyakusho), dan imigrasi membutuhkan formulir permohonan santun agar urusan administrasi berjalan mulus."
      },
      "cultural_notes": {
        "title": "Etika Berurusan di Loket Publik Jepang (窓口での丁寧な依頼)",
        "etiquette": "Saat meminta bantuan staf publik, mendahului kalimat dengan kata maaf pengetuk pintu \"Sumimasen ga...\" lalu menutup dengan \"...te itadakemasen ka\" menciptakan impresi yang sangat terpelajar.",
        "taboos": "Hindari memakai bentuk perintah langsung \"Kite kudasai\" kepada petugas jika kamu yang berstatus pemohon. Gunakan bentuk permohonan izin: \"Mite moraemasen ka\"."
      },
      "pronunciation_tips": {
        "title": "Intonasi Mengalun Lembut pada Permohonan Negatif Santun",
        "moraNote": "Frasa \"moraemasen ka\" diucapkan dengan intonasi naik tipis di suku kata terakhir [ka?].",
        "soundTip": "Jangan memotong suku kata \"masen ka\" dengan nada ketus datar."
      },
      "common_pitfalls": [
        {
          "title": "Tertukar Antara 〜なくてもいい (Boleh Tidak Melakukan) vs 〜てはいけない (Dilarang)",
          "caseScenario": "Ingin mengatakan \"kamu tidak perlu tanda tangan di sini jika tidak punya cap stempel\".",
          "pitfallWarning": "\"サインを しては いけません。\" (Artinya: Dilarang keras tanda tangan!)",
          "rightSolution": "\"サインは 書【か】かなくても いいですよ。\" (Benar: Boleh tidak tanda tangan / tidak wajib)",
          "explanation": "〜てはいけません adalah larangan keras (prohibition). 〜なくてもいいです adalah dispensasi kelonggaran bahwa tindakan tersebut opsional (tidak wajib)."
        },
        {
          "title": "Menggunakan 〜てもいいですか untuk Menawarkan Bantuan Diri Sendiri",
          "caseScenario": "Ingin menawarkan membawakan payung teman tapi malah memakai te mo ii desu ka.",
          "pitfallWarning": "\"傘【かさ】を 貸【か】しても いいですか。\" (Terdengar seperti meminta izin untuk meminjamkan)",
          "rightSolution": "\"傘【かさ】を 貸【か】しましょうか。\" (Benar: Menawarkan jasa)",
          "explanation": "〜てもいいですか berarti meminta izin untuk keuntungan diri sendiri (\"bolehkah saya...\"). Untuk menawarkan bantuan ke orang lain, gunakan 〜ましょうか."
        }
      ],
      "who_and_when": {
        "situational_context": "Loket bank pembukaan rekening, kantor pos, pendaftaran asuransi kantor desa, menanyakan aturan seragam pabrik.",
        "social_relations": "Sangat lazim dan elegan digunakan pemohon jasa kepada petugas pelayanan publik.",
        "when_not_to_use": "Jangan gunakan permohonan ultra-panjang berbelit kepada teman dekat saat santai di kamar asrama."
      },
      "scenario": {
        "title": "Membuka Rekening Tabungan di Bank Kantor Pos",
        "setting": "Loket Bank Kantor Pos Shinjuku, pukul 11.00",
        "narrative": "Budi meminta bantuan staf loket untuk memeriksa formulir pembukaan rekening tabungan dan menanyakan apakah stempel inkan wajib dibawa."
      }
    },
    "dialogue": [
      {
        "id": "d1",
        "speaker": "Budi",
        "speakerRole": "Pembelajar Indonesia",
        "avatar": "🙋‍♂️",
        "jp": "すみません、口座【こうざ】を 作【つく】りたいのですが、書【か】き方【かた】を 教【おし】えて もらえませんか。",
        "furigana": "すみません、口座を 作りたいのですが、書き方を 教えて もらえませんか。",
        "romaji": "Sumimasen, kouza o tsukuritai no desu ga, kakikata o oshiete moraemasen ka.",
        "idText": "Permisi, saya ingin membuka rekening tabungan, sudikah kiranya membantu mengajari cara pengisiannya?"
      },
      {
        "id": "d2",
        "speaker": "Sakura",
        "speakerRole": "Staf Loket Bank",
        "avatar": "👩‍💼",
        "jp": "かしこまりました。こちらの 用紙【ようし】に お名前【なまえ】と ご住所【じゅうしょ】を ご記入【きにゅう】ください。",
        "furigana": "かしこまりました。こちらの 用紙に お名前と ご住所を ご記入ください。",
        "romaji": "Kashikomarimashita. Kochira no youshi ni onamae to gojuusho o gokinyuu kudasai.",
        "idText": "Baik saya pahami dengan hormat. Silakan mengisi nama dan alamat Anda pada formulir ini."
      },
      {
        "id": "d3",
        "speaker": "Budi",
        "speakerRole": "Pembelajar Indonesia",
        "avatar": "🙋‍♂️",
        "jp": "名前【なまえ】は アルファベットで 書【か】いても いいですか。",
        "furigana": "名前は アルファベットで 書いても いいですか。",
        "romaji": "Namae wa arufabetto de kaite mo ii desu ka.",
        "idText": "Apakah namanya boleh saya tulis menggunakan huruf alfabet latin?"
      },
      {
        "id": "d4",
        "speaker": "Sakura",
        "speakerRole": "Staf Loket Bank",
        "avatar": "👩‍💼",
        "jp": "はい、在留【ざいりゅう】カードと 同【おな】じ 表記【ひょうき】で 書【か】いていただければ 大丈夫【だいじょうぶ】ですよ。",
        "furigana": "はい、在留カードと 同じ 表記で 書いていただければ 大丈夫ですよ。",
        "romaji": "Hai, zairyuu ka-do to onaji hyouki de kaite itadakereba daijoubu desu yo.",
        "idText": "Iya, asalkan ditulis sama persis dengan ejaan di Kartu Izin Tinggal (Zairyu Card) tidak masalah kok."
      },
      {
        "id": "d5",
        "speaker": "Budi",
        "speakerRole": "Pembelajar Indonesia",
        "avatar": "🙋‍♂️",
        "jp": "印鑑【いんかん】を 持【も】って いないのですが、サインでも いいですか。",
        "furigana": "印鑑を 持って いないのですが、サインでも いいですか。",
        "romaji": "Inkan o motte inai no desu ga, sain de mo ii desu ka.",
        "idText": "Saya tidak membawa stempel inkan, apakah boleh menggunakan tanda tangan?"
      },
      {
        "id": "d6",
        "speaker": "Sakura",
        "speakerRole": "Staf Loket Bank",
        "avatar": "👩‍💼",
        "jp": "外国籍【がいこくせき】の お客様【きゃくさま】は 印鑑【いんかん】が なくても いいですよ。サインで 結構【けっこう】です。",
        "furigana": "外国籍の お客様は 印鑑が なくても いいですよ。サインで 結構です。",
        "romaji": "Gaikokuseki no okyaku-sama wa inkan ga nakute mo ii desu yo. Sain de kekkou desu.",
        "idText": "Untuk nasabah berkewarganegaraan asing boleh tidak ada stempel kok. Cukup dengan tanda tangan saja."
      }
    ],
    "drills": [
      {
        "id": "drill-1",
        "type": "vocab_context",
        "instruction": "Langkah 1 (Konsep Kata): Pilihlah istilah yang tepat untuk stempel resmi pribadi di Jepang.",
        "sentencePrompt": "Stempel nama resmi pribadi yang digunakan untuk transaksi bank dan dokumen legal di Jepang disebut:",
        "options": [
          "印鑑【いんかん】 / 判子【はんこ】",
          "領収書【りょうしゅうしょ】 (Kwitansi)",
          "切符【きっぷ】 (Karcis)",
          "看板【かんばん】 (Papan nama)"
        ],
        "correctAnswer": "印鑑【いんかん】 / 判子【はんこ】",
        "explanation": "印鑑 (inkan) atau 判子 (hanko) adalah cap stempel legal pengganti tanda tangan di Jepang.",
        "diagnosticFeedback": {
          "領収書【りょうしゅうしょ】 (Kwitansi)": "Salah: 領収書 adalah tanda bukti pembayaran uang.",
          "切符【きっぷ】 (Karcis)": "Salah: 切符 adalah tiket transportasi.",
          "看板【かんばん】 (Papan nama)": "Salah: 看板 adalah papan plang reklame toko."
        }
      },
      {
        "id": "drill-2",
        "type": "grammar_choice",
        "instruction": "Langkah 2 (Permohonan Santun Bertingkat): Pilihlah permohonan yang paling santun dan halus kepada petugas bank.",
        "sentencePrompt": "この 漢字【かんじ】の 読【よ】み方【かた】を（　　）。",
        "options": [
          "教【おし】えて くださいませんか",
          "教【おし】えろ",
          "教【おし】えて くれ",
          "教【おし】えなさい"
        ],
        "correctAnswer": "教【おし】えて くださいませんか",
        "explanation": "Pola [V-te] + くださいませんか adalah tingkatan permohonan santun tinggi yang sangat elegan kepada petugas loket.",
        "diagnosticFeedback": {
          "教えろ": "Salah: Ini adalah bentuk perintah kasar (Meireikei).",
          "教えて くれ": "Salah: Ini adalah ragam kasual akrab yang tidak sopan untuk staf bank.",
          "教えなさい": "Salah: Ini adalah perintah orang tua/guru kepada anak kecil."
        }
      },
      {
        "id": "drill-3",
        "type": "particle_select",
        "instruction": "Langkah 3 (Kelonggaran Tanpa Keharusan): Pilihlah bentuk yang tepat untuk menyatakan \"boleh tidak membayar sekarang\".",
        "sentencePrompt": "今日【きょう】は お金【かね】を（　　）いいですよ。明日【あした】 お願【ねが】いします。",
        "options": [
          "払【はら】わなくても",
          "払【はら】って",
          "払【はら】っては",
          "払【はら】わなければ"
        ],
        "correctAnswer": "払【はら】わなくても",
        "explanation": "Pola [V-nai -> nakute] + もいいです menyatakan kelonggaran izin (tidak wajib / boleh tidak melakukan).",
        "diagnosticFeedback": {
          "払って": "Salah: 払ってもいい berarti boleh membayar.",
          "払っては": "Salah: 払ってはいけない berarti larangan membayar.",
          "払わなければ": "Salah: 払わなければならない berarti harus membayar."
        }
      },
      {
        "id": "drill-4",
        "type": "sentence_ordering",
        "instruction": "Langkah 4 (Susun Kalimat): Rangkai permohonan izin meminjam pulpen di loket formulir.",
        "sentencePrompt": "Susunlah kata-kata: \"Bolehkah saya meminjam pulpen ini sebentar?\".",
        "tokens": [
          "この ボールペンを",
          "ちょっと",
          "借【か】りても",
          "いいですか"
        ],
        "correctOrder": [
          0,
          1,
          2,
          3
        ],
        "options": [
          "この ボールペンを ちょっと 借【か】りても いいですか。",
          "ちょっと この ボールペンを いいですか 借【か】りても。",
          "借【か】りても この ボールペンを ちょっと いいですか。",
          "いいですか ちょっと この ボールペンを 借【か】りても。"
        ],
        "correctAnswer": "この ボールペンを ちょっと 借【か】りても いいですか。",
        "explanation": "Objek (このボールペンを) + Keterangan (ちょっと) + Permohonan izin (借りてもいいですか).",
        "diagnosticFeedback": {
          "ちょっと この ボールペンを いいですか 借【か】りても。": "Salah susun partikel predikat terpotong.",
          "借【か】りても この ボールペンを ちょっと いいですか。": "Salah posisi verba sambung.",
          "いいですか ちょっと この ボールペンを 借【か】りても。": "Salah struktur total."
        }
      },
      {
        "id": "drill-5",
        "type": "nuance_analysis",
        "instruction": "Langkah 5 (Analisis Nuansa): Analisislah perbedaan \"書類を出さなくてもいい\" vs \"書類を出してはいけない\".",
        "sentencePrompt": "Pernyataan \"今日【きょう】は 書類【しょるい】を 出【だ】さなくても いいです\" berarti:",
        "options": [
          "Hari ini Anda tidak wajib menyerahkan dokumen (bisa diserahkan besok, tapi kalau mau diserahkan hari ini juga boleh)",
          "Hari ini Anda dilarang keras menyerahkan dokumen karena kantor tutup",
          "Anda harus segera menyerahkan dokumen sekarang juga tanpa ditunda",
          "Dokumen Anda ditolak oleh petugas karena ada kekeliruan"
        ],
        "correctAnswer": "Hari ini Anda tidak wajib menyerahkan dokumen (bisa diserahkan besok, tapi kalau mau diserahkan hari ini juga boleh)",
        "explanation": "〜なくてもいい menyatakan tiadanya kewajiban mutlak (kelonggaran sukarela), sangat berbeda dari 〜てはいけない (larangan keras).",
        "diagnosticFeedback": {
          "Hari ini Anda dilarang keras menyerahkan dokumen karena kantor tutup": "Salah: Ini adalah pola 〜てはいけません.",
          "Anda harus segera menyerahkan dokumen sekarang juga tanpa ditunda": "Salah: Ini adalah pola 〜なければなりません.",
          "Dokumen Anda ditolak oleh petugas karena ada kekeliruan": "Salah: Ini bukan makna tata bahasa tersebut."
        }
      }
    ],
    "can_do_challenge": {
      "statement": "Bisa memohon bimbingan pengisian formulir bank secara santun kepada staf loket.",
      "situation": "Berada di loket kantor pos dan tidak tahu cara menulis kolom alamat kanji.",
      "promptTask": "Mohonlah kepada petugas loket agar sudi membantumu melihat formulir ini!",
      "modelAnswer": "すみません、この 申請書【しんせいしょ】を 見【み】て もらえませんか。",
      "modelAnswerId": "Permisi, sudikah kiranya memeriksa formulir permohonan ini untuk saya?",
      "culturalEtiquette": "Awali dengan kata \"sumimasen\" dan serahkan dokumen dengan kedua belah tangan.",
      "skillUnlocked": [
        "Menguasai hierarki permohonan santun bertingkat",
        "Mampu berurusan di institusi publik Jepang secara mandiri"
      ]
    },
    "pocket_summary": {
      "keyFormula": "[V-te] + もらえませんか / くださいませんか (mohon bantuan) / [V-te] もいい (boleh) / [V-nakute] もいい (tidak wajib)",
      "coreWords": [
        "きにゅう",
        "こうざ",
        "いんかん",
        "ハンコ"
      ],
      "coreWarning": "V-nakute mo ii = tidak perlu/opsional; V-te wa ikenai = dilarang keras. Jangan sampai tertukar!",
      "quickDialogue": "A: 印鑑は必要？ → B: サインがあれば無くてもいいですよ。"
    }
  },
  "les-n4-u09-01": {
    "pedagogical_framework": {
      "what": {
        "summary": "Membentuk kalimat pasif langsung (直接受身 chokusetsu ukemi: verba Gol 1 -areru, Gol 2 -rareru, Gol 3 sareru/korareru) untuk fakta publik, sejarah, serta bahan pembuatan karya (~kara tsukuru / ~de dekite iru).",
        "canDo": "Bisa memandu rekan kerja mengenai sejarah pabrik atau bangunan bersejarah dan asal bahan baku produk.",
        "targetPatterns": [
          "[Verba-reru / rareru] (bentuk pasif umum)",
          "[Kata Benda] は [Tahun / Tokoh] に [Verba Pasif] (didirikan / dibangun / ditemukan)",
          "[Bahan Terlihat Fisik] で できている (terbuat dari bahan padat)",
          "[Bahan Olahan Kimia] から 作【つく】られる (dibuat dari bahan mentah/fermentasi)"
        ],
        "coreVocabSample": [
          "たてられる",
          "はっけんされる",
          "ゆしゅつされる",
          "せきゆ",
          "プラスチック",
          "げんりょう"
        ]
      },
      "sensei_context": {
        "sceneIntro": "Di museum sejarah industri pabrik otomotif Nagoya. Kenji memandu Budi melihat pameran lini perakitan mobil pertama di Jepang.",
        "dailyMission": "Gunakan bentuk pasif (ukemi) untuk menjelaskan peristiwa bersejarah yang tidak berfokus pada subjek manusia tunggal.",
        "whyOrder": "Setelah menguasai kalimat aktif di level N5, pembelajar N4 harus mampu membaca artikel berita objektif, papan informasi sejarah museum, dan manual spesifikasi produk."
      },
      "cultural_notes": {
        "title": "Pasif Objektif dalam Narasi Publik & Media Jepang (客観的事実の受身)",
        "etiquette": "Ketika menjelaskan sejarah gedung atau produk perusahaan, bahasa Jepang formal selalu memakai kalimat pasif (tateraremashita, seizou sarete imasu) agar terdengar berwibawa dan tidak berpusat pada ego perseorangan.",
        "taboos": "Perhatikan perbedaan bahan: jika bentuk aslinya masih terlihat jelas (seperti kayu pada meja), gunakan でできている. Jika sudah berubah zat (seperti beras menjadi sake), gunakan から作られる."
      },
      "pronunciation_tips": {
        "title": "Konjugasi Halus Bunyi Pasif Vokal -A + Reru",
        "moraNote": "Golongan 1: kaku -> kak-areru; tsukuru -> tsukur-areru; nomu -> nom-areru.",
        "soundTip": "Pada Golongan 2 (taberareru, homerareta), jaga artikulasi mora -ra-re- agar tidak terdengar tergesa."
      },
      "common_pitfalls": [
        {
          "title": "Tertukar Antara \"De dekite iru\" (Bahan Kasat Mata) vs \"Kara tsukurareru\" (Bahan Kimia/Proses)",
          "caseScenario": "Mengatakan bahwa kecap asin dibuat dari kedelai.",
          "pitfallWarning": "\"醤油【しょうゆ】は 大豆【だいず】で できて います。\"",
          "rightSolution": "\"醤油【しょうゆ】は 大豆【だいず】から 作【つく】られます。\"",
          "explanation": "Bahan yang mengalami transformasi wujud fisik/kimia (seperti kedelai menjadi cairan kecap) wajib menggunakan から. Jika wujud aslinya masih tampak (seperti meja kayu), gunakan で."
        },
        {
          "title": "Salah Konjugasi Pasif Verba Golongan 1 Berakhiran Vokal U (Suara Wa-reru)",
          "caseScenario": "Mengubah kata kerja kauf/kau (membeli) menjadi pasif.",
          "pitfallWarning": "\"買【か】あれる (ka-areru)\"",
          "rightSolution": "\"買【か】われる (ka-wareru)\"",
          "explanation": "Verba Golongan 1 yang berakhiran huruf u (seperti 買う, 言う, 使う) berubah menjadi baris -wa: 買われる, 言われる, 使われる."
        }
      ],
      "who_and_when": {
        "situational_context": "Pemanduan tur pabrik bagi tamu mitra kerja, presentasi materi produk di ruang seminar, membaca papan petunjuk cagar budaya.",
        "social_relations": "Ragam narasi formal dan objektif yang sangat profesional di hadapan publik.",
        "when_not_to_use": "Jangan gunakan pada percakapan kasual santai yang membicarakan aktivitas pribadi sehari-hari."
      },
      "scenario": {
        "title": "Pemanduan Sejarah Pabrik Otomotif Pertama",
        "setting": "Museum Sejarah Pabrik Nagoya, pukul 13.30",
        "narrative": "Kenji menjelaskan kepada Budi bahwa pabrik ini didirikan pada tahun 1950 dan mobil buatannya diekspor ke seluruh dunia."
      }
    },
    "dialogue": [
      {
        "id": "d1",
        "speaker": "Kenji",
        "speakerRole": "Senior Pabrik",
        "avatar": "🧑‍💻",
        "jp": "ブディ、この 工場【こうじょう】は いつ 建【た】てられたか 知【し】っている？",
        "furigana": "ブディ、この 工場は いつ 建てられたか 知っている？",
        "romaji": "Budi, kono koujou wa itsu taterareta ka shitte iru?",
        "idText": "Budi, kamu tahu kapan pabrik ini pertama kali dibangun?"
      },
      {
        "id": "d2",
        "speaker": "Budi",
        "speakerRole": "Pembelajar Indonesia",
        "avatar": "🙋‍♂️",
        "jp": "看板【かんばん】に １９５０年【せんきゅうひゃくごじゅうねん】に 創設【そうせつ】されたと 書【か】いて あります！",
        "furigana": "看板に １９５０年に 創設されたと 書いて あります！",
        "romaji": "Kanban ni sen-kyuuhyaku-gojuunen ni sousetsu sareta to kaite arimasu!",
        "idText": "Di papan tertulis bahwa pabrik ini didirikan pada tahun 1950!"
      },
      {
        "id": "d3",
        "speaker": "Kenji",
        "speakerRole": "Senior Pabrik",
        "avatar": "🧑‍💻",
        "jp": "そうなんだ。ここで 作【つく】られた 車【くるま】は、世界中【せかいじゅう】に 輸出【ゆしゅつ】されているんだよ。",
        "furigana": "そうなんだ。ここで 作られた 車は、世界中に 輸出されているんだよ。",
        "romaji": "Sou na n da. Koko de tsukurareta kuruma wa, sekaijuu ni yushutsu sarete iru n da yo.",
        "idText": "Betul sekali. Mobil yang diproduksi di sini diekspor ke seluruh penjuru dunia lho."
      },
      {
        "id": "d4",
        "speaker": "Budi",
        "speakerRole": "Pembelajar Indonesia",
        "avatar": "🙋‍♂️",
        "jp": "車【くるま】の バンパーは 軽【かる】い プラスチックで できているんですね。",
        "furigana": "車の バンパーは 軽い プラスチックで できているんですね。",
        "romaji": "Kuruma no banpa- wa karui purasuchikku de dekite iru n desu ne.",
        "idText": "Bumper mobilnya ternyata terbuat dari bahan plastik yang ringan ya."
      },
      {
        "id": "d5",
        "speaker": "Kenji",
        "speakerRole": "Senior Pabrik",
        "avatar": "🧑‍💻",
        "jp": "プラスチックは 石油【せきゆ】から 作【つく】られるから、加工【かこう】が しやすいんだ。",
        "furigana": "プラスチックは 石油から 作られるから、加工が しやすいんだ。",
        "romaji": "Purasuchikku wa sekiyu kara tsukurareru kara, kakou ga shiyasui n da.",
        "idText": "Karena plastik dibuat dari minyak bumi melalui proses kimia, pengolahannya menjadi sangat mudah."
      },
      {
        "id": "d6",
        "speaker": "Budi",
        "speakerRole": "Pembelajar Indonesia",
        "avatar": "🙋‍♂️",
        "jp": "技術【ぎじゅつ】の 歴史【れきし】が よく 分【わ】かりました。見学【けんがく】できて よかったです！",
        "furigana": "技術の 歴史が よく 分かりました。見学できて よかったです！",
        "romaji": "Gijutsu no rekishi ga yoku wakarimashita. Kengaku dekite yokatta desu!",
        "idText": "Saya jadi sangat memahami sejarah perkembangannya. Syukurlah bisa ikut tur studi orientasi ini!"
      }
    ],
    "drills": [
      {
        "id": "drill-1",
        "type": "vocab_context",
        "instruction": "Langkah 1 (Konsep Pasif Sejarah): Pilihlah kata kerja pasif yang bermakna \"didirikan / dibangun\".",
        "sentencePrompt": "Bentuk pasif dari kata kerja 建てる (membangun gedung) adalah:",
        "options": [
          "建【た】てられる (Dibangun)",
          "建【た】たせる (Menyuruh membangun)",
          "建【た】ち始【はじ】める (Mulai dibangun)",
          "建【た】てておく (Mempersiapkan bangunan)"
        ],
        "correctAnswer": "建【た】てられる (Dibangun)",
        "explanation": "Verba Golongan 2: 建てる -> buang -ru + rareru = 建てられる (dibangun).",
        "diagnosticFeedback": {
          "建たせる (Menyuruh membangun)": "Salah: Ini adalah bentuk kausatif (shieki).",
          "立ち始める (Mulai dibangun)": "Salah: Ini adalah bentuk permulaan.",
          "建てておく (Mempersiapkan bangunan)": "Salah: Ini adalah bentuk persiapan te-oku."
        }
      },
      {
        "id": "drill-2",
        "type": "grammar_choice",
        "instruction": "Langkah 2 (Seleksi Bahan Pembuatan): Lengkapi kalimat asal bahan meja kayu.",
        "sentencePrompt": "この 机【つくえ】は 丈夫【じょうぶ】な 木【き】（　　）できて います。",
        "options": [
          "で",
          "から",
          "に",
          "を"
        ],
        "correctAnswer": "で",
        "explanation": "Untuk bahan yang wujud fisiknya masih terlihat jelas kasat mata (kayu pada meja), gunakan partikel で (でできている).",
        "diagnosticFeedback": {
          "から": "Salah: から dipakai jika bahan mentah mengalami perubahan zat kimia (contoh: anggur menjadi wine).",
          "に": "Salah: に menandai tujuan.",
          "を": "Salah: を menandai objek kalimat aktif."
        }
      },
      {
        "id": "drill-3",
        "type": "particle_select",
        "instruction": "Langkah 3 (Pasif Konjugasi Golongan 1): Pilihlah bentuk pasif yang benar untuk kata 使う (memakai).",
        "sentencePrompt": "日本【にほん】の アニメは 世界中【せかいじゅう】で（　　）います。",
        "options": [
          "見【み】られて",
          "見【み】させて",
          "見【み】て",
          "見【み】えられて"
        ],
        "correctAnswer": "見【み】られて",
        "explanation": "Verba Golongan 2 見る dalam bentuk pasif menjadi 見られる (見られています = ditonton oleh orang sedunia).",
        "diagnosticFeedback": {
          "見させて": "Salah: Ini bentuk kausatif (menyuruh menonton).",
          "見て": "Salah: Ini bentuk aktif te.",
          "見えられて": "Salah: Konjugasi salah."
        }
      },
      {
        "id": "drill-4",
        "type": "sentence_ordering",
        "instruction": "Langkah 4 (Susun Kalimat): Rangkai kalimat sejarah candi Borobudur yang dibangun di Indonesia.",
        "sentencePrompt": "Susunlah kata-kata: \"Candi Borobudur dibangun di Indonesia\".",
        "tokens": [
          "ボロブドゥールは",
          "インドネシアで",
          "昔【むかし】",
          "建【た】てられました"
        ],
        "correctOrder": [
          0,
          1,
          2,
          3
        ],
        "options": [
          "ボロブドゥールは インドネシアで 昔【むかし】 建【た】てられました。",
          "インドネシアで 昔【むかし】 建【た】てられました ボロブドゥールは。",
          "建【た】てられました ボロブドゥールは インドネシアで 昔【むかし】。",
          "昔【むかし】 建【た】てられました インドネシアで ボロブドゥールは。"
        ],
        "correctAnswer": "ボロブドゥールは インドネシアで 昔【むかし】 建【た】てられました。",
        "explanation": "Topik (ボロブドゥールは) + Tempat aksi (インドネシアで) + Waktu (昔) + Pasif lampau (建てられました).",
        "diagnosticFeedback": {
          "インドネシアで 昔【むかし】 建【た】てられました ボロブドゥールは。": "Salah susun: Topik kalimat terlempar ke akhir.",
          "建【た】てられました ボロブドゥールは インドネシアで 昔【むかし】。": "Salah posisi predikat.",
          "昔【むかし】 建【た】てられました インドネシアで ボロブドゥールは。": "Salah struktur."
        }
      },
      {
        "id": "drill-5",
        "type": "nuance_analysis",
        "instruction": "Langkah 5 (Analisis Nuansa): Analisislah mengapa kalimat pasif sering dipakai dalam berita dan buku sejarah.",
        "sentencePrompt": "Alasan utama kalimat pasif (Ukemi) sering dipakai dalam buku sejarah dan pemanduan museum adalah:",
        "options": [
          "Untuk menonjolkan objek fakta sejarah dan peristiwa penting tanpa berpusat pada subjek perseorangan yang subjektif",
          "Karena dalam bahasa Jepang kalimat aktif dilarang untuk mendeskripsikan masa lalu",
          "Karena kalimat pasif lebih pendek jumlah hurufnya daripada kalimat aktif",
          "Agar pendengar merasa kebingungan mengenai siapa pelaku sesungguhnya"
        ],
        "correctAnswer": "Untuk menonjolkan objek fakta sejarah dan peristiwa penting tanpa berpusat pada subjek perseorangan yang subjektif",
        "explanation": "Pasif langsung fakta publik (直接受身) menciptakan nada objektif, netral, dan fokus pada pencapaian peristiwanya.",
        "diagnosticFeedback": {
          "Karena dalam bahasa Jepang kalimat aktif dilarang untuk mendeskripsikan masa lalu": "Salah: Kalimat aktif tentu saja boleh digunakan.",
          "Karena kalimat pasif lebih pendek jumlah hurufnya daripada kalimat aktif": "Salah: Kalimat pasif justru memiliki konjugasi lebih panjang.",
          "Agar pendengar merasa kebingungan mengenai siapa pelaku sesungguhnya": "Salah: Tujuannya bukan membingungkan."
        }
      }
    ],
    "can_do_challenge": {
      "statement": "Bisa memandu rekan kerja mengenai sejarah pabrik atau bangunan budaya di kota.",
      "situation": "Menjelaskan kepada tamu kunjungan bahwa pabrik ini dibangun 50 tahun yang lalu.",
      "promptTask": "Katakan bahwa pabrik ini dibangun pada 50 tahun yang lalu!",
      "modelAnswer": "この 工場【こうじょう】は ５０年【ごじゅうねん】前【まえ】に 建【た】てられました。",
      "modelAnswerId": "Pabrik ini dibangun pada 50 tahun yang lalu.",
      "culturalEtiquette": "Tunjuk ke arah bangunan dengan gestur telapak tangan terbuka mengarah ke atas.",
      "skillUnlocked": [
        "Menguasai formulasi pasif langsung verba reru/rareru",
        "Mampu menjelaskan asal usul bahan produk (de dekite iru / kara tsukurareru)"
      ]
    },
    "pocket_summary": {
      "keyFormula": "Verba Pasif (Ukemi) / [Bahan Tampak] で できている / [Bahan Kimia/Mentah] から 作られる",
      "coreWords": [
        "たてられる",
        "はっけんされる",
        "ゆしゅつされる",
        "せきゆ"
      ],
      "coreWarning": "Meja dari kayu = ki DE dekite iru; sake dari beras = kome KARA tsukurareru.",
      "quickDialogue": "A: これは木で？ → B: はい、木でできています。"
    }
  },
  "les-n4-u09-02": {
    "pedagogical_framework": {
      "what": {
        "summary": "Menyatakan penanda agen penyebab atau metode penentu (~ni yotte / ni yoru), sikap perlakuan terhadap sasaran (~ni taishite), dan kedudukan peran status resmi (~to shite).",
        "canDo": "Bisa berbicara mewakili posisi peserta magang teknis dalam sambutan resmi dan menjelaskan aturan berdasar regulasi.",
        "targetPatterns": [
          "[Kata Benda] によって (disebabkan oleh / tergantung pada / ditentukan oleh)",
          "[Kata Benda] による [Kata Benda] (yang disebabkan oleh ...)",
          "[Kata Benda] に 対【たい】して (terhadap / kepada sasaran)",
          "[Kata Benda] として (sebagai / dalam kapasitas kedudukan)"
        ],
        "coreVocabSample": [
          "じっしゅうせい",
          "だいひょう",
          "たいど",
          "ほうりつ",
          "きそく",
          "えいきょう"
        ]
      },
      "sensei_context": {
        "sceneIntro": "Di aula penyambutan peserta magang baru. Budi menyampaikan pidato perwakilan sambutan sebagai duta pembelajar Indonesia di hadapan direktur perusahaan.",
        "dailyMission": "Gunakan 〜として untuk menyatakan peran kedudukan resmi, dan 〜に対して untuk sikap hormat terhadap senior dan mitra.",
        "whyOrder": "Setelah memahami kalimat pasif di Lesson 1, pola 〜によって melengkapi agen pencipta karya pasif, dan 〜として memantapkan identitas formal di dunia kerja."
      },
      "cultural_notes": {
        "title": "Kesadaran Peran & Kedudukan Sosial di Jepang (立場と役割の意識)",
        "etiquette": "Ungkapan \"Kenshuusei to shite...\" (Sebagai peserta pelatihan...) menunjukkan kesadaran tinggi akan batas tanggung jawab dan etos belajar yang sangat dihargai oleh pimpinan perusahaan Jepang.",
        "taboos": "Jangan tertukar antara 〜に対して (sikap kepada pihak luar) vs 〜にとって (menurut sudut pandang penilaian diri)."
      },
      "pronunciation_tips": {
        "title": "Penjagaan Ketukan Frasa Formal \"Ni yotte\" & \"To shite\"",
        "moraNote": "Ni yot-te memiliki konsonan ganda sokon (jeda 1 mora di tengah).",
        "soundTip": "Ucapkan \"to shite\" dengan artikulasi tegas dan intonasi resmi berwibawa."
      },
      "common_pitfalls": [
        {
          "title": "Tertukar Antara 〜として (Sebagai Peran Status) vs 〜にとって (Menurut Sudut Pandang)",
          "caseScenario": "Ingin mengatakan \"Bagi saya bahasa Jepang itu penting\".",
          "pitfallWarning": "\"私【わたし】として 日本語【にほんご】は 大切【たいせつ】です。\"",
          "rightSolution": "\"私【わたし】にとって 日本語【にほんご】は 大切【たいせつ】です。\"",
          "explanation": "〜にとって berarti \"bagi / menurut sudut pandang penilaian\". Sedangkan 〜として berarti \"dalam peran / kedudukan resmi sebagai\"."
        },
        {
          "title": "Lupa Mengubah 〜によって Menjadi 〜による Sebelum Kata Benda",
          "caseScenario": "Menyambungkan kata benda di belakang tanpa perubahan ke による.",
          "pitfallWarning": "\"台風【たいふう】によって 被害【ひがい】\"",
          "rightSolution": "\"台風【たいふう】による 被害【ひがい】\"",
          "explanation": "Sebelum kata kerja gunakan 〜によって, tetapi sebelum kata benda wajib menggunakan bentuk penghubung 〜による [N]."
        }
      ],
      "who_and_when": {
        "situational_context": "Pidato sambutan kedatangan peserta magang, pemaparan evaluasi kerja bulanan, koordinasi penegakan disiplin K3.",
        "social_relations": "Ragam resmi formal tinggi yang biasa digunakan dalam forum resmi perusahaan.",
        "when_not_to_use": "Jangan gunakan bahasa kaku ini untuk obrolan santai membeli camilan di toserba konbini."
      },
      "scenario": {
        "title": "Pidato Sambutan Mewakili Peserta Magang Indonesia",
        "setting": "Aula serbaguna perusahaan, pukul 09.00",
        "narrative": "Budi berbicara di depan podium mewakili 10 rekan magang dan berjanji akan bersungguh-sungguh belajar sebagai pembelajar teknis."
      }
    },
    "dialogue": [
      {
        "id": "d1",
        "speaker": "Budi",
        "speakerRole": "Pembelajar Indonesia",
        "avatar": "🙋‍♂️",
        "jp": "皆様【みなさま】、技能【ぎのう】実習生【じっしゅうせい】の 代表【だいひょう】として 一言【ひとこと】 ご挨拶【あいさつ】いたします。",
        "furigana": "皆様、技能実習生の 代表として 一言 ご挨拶いたします。",
        "romaji": "Minasama, ginou jisshuusei no daihyou to shite hitokoto go-aisatsu itashimasu.",
        "idText": "Hadirin sekalian, sebagai perwakilan peserta pemagangan teknis, izinkan saya menyampaikan sepatah kata sambutan."
      },
      {
        "id": "d2",
        "speaker": "Tanaka",
        "speakerRole": "Kepala Divisi",
        "avatar": "🧑‍💼",
        "jp": "立派【りっぱ】な 挨拶【あいさつ】ですね。指導員【しどういん】の 皆【みな】さんも 喜【よろこ】んでいますよ。",
        "furigana": "立派な 挨拶ですね。指導員の 皆さんも 喜んでいますよ。",
        "romaji": "Rippa na aisatsu desu ne. Shidouin no minasan mo yorokonde imasu yo.",
        "idText": "Sambutan yang sangat mengagumkan. Para instruktur pembimbing pun merasa sangat bahagia lho."
      },
      {
        "id": "d3",
        "speaker": "Budi",
        "speakerRole": "Pembelajar Indonesia",
        "avatar": "🙋‍♂️",
        "jp": "仕事【しごと】の やり方【かた】は 国【くに】によって 違【ちが】いますが、しっかり ルールを 守【まも】ります。",
        "furigana": "仕事の やり方は 国によって 違いますが、しっかり ルールを 守ります。",
        "romaji": "Shigoto no yarikata wa kuni ni yotte chigaimasu ga, shikkari ru-ru o mamorimasu.",
        "idText": "Meskipun metode kerja berbeda-beda tergantung negaranya, kami akan mematuhi aturan kerja dengan disiplin."
      },
      {
        "id": "d4",
        "speaker": "Tanaka",
        "speakerRole": "Kepala Divisi",
        "avatar": "🧑‍💼",
        "jp": "安全【あんぜん】規則【きそく】に対【たい】して、真剣【しんけん】に 取【と】り組【く】む 姿勢【しせい】が 一番【いちばん】 大切【たいせつ】ですよ。",
        "furigana": "安全規則に対して、真剣に 取り組む 姿勢が 一番 大切ですよ。",
        "romaji": "Anzen kisoku ni taishite, shinken ni torikumu shisei ga ichiban taisetsu desu yo.",
        "idText": "Sikap bersungguh-sungguh terhadap regulasi keselamatan kerja adalah hal yang paling berharga."
      },
      {
        "id": "d5",
        "speaker": "Budi",
        "speakerRole": "Pembelajar Indonesia",
        "avatar": "🙋‍♂️",
        "jp": "はい！ 不注意【ふちゅうい】による 事故【じこ】が 起【お】きないように、確認【かくにん】を 徹底【てってい】します。",
        "furigana": "はい！ 不注意による 事故が 起きないように、確認を 徹底します。",
        "romaji": "Hai! Fuchuui ni yoru jiko ga okinai you ni, kakunin o tettei shimasu.",
        "idText": "Baik! Agar tidak terjadi kecelakaan kerja yang disebabkan oleh kecerobohan, kami akan menerapkan pengecekan tuntas."
      },
      {
        "id": "d6",
        "speaker": "Tanaka",
        "speakerRole": "Kepala Divisi",
        "avatar": "🧑‍💼",
        "jp": "頼【たの】もしいですね。これから 一緒【いっしょ】に 頑張【がんば】りましょう！",
        "furigana": "頼もしいですね。これから 一緒に 頑張りましょう！",
        "romaji": "Tanomoshii desu ne. Kore kara issho ni gambarimashou!",
        "idText": "Sangat bisa diandalkan. Mulai sekarang mari kita bersemangat bersama!"
      }
    ],
    "drills": [
      {
        "id": "drill-1",
        "type": "vocab_context",
        "instruction": "Langkah 1 (Konsep Kata): Pilihlah istilah yang tepat untuk status kedudukan sebagai peserta pemagangan resmi.",
        "sentencePrompt": "Istilah resmi bahasa Jepang untuk peserta pemagangan teknis kerja adalah:",
        "options": [
          "技能【ぎのう】実習生【じっしゅうせい】",
          "留学生【りゅうがくせい】 (Pelajar asing)",
          "観光客【かんこうきゃく】 (Wisatawan)",
          "案内係【あんないがかり】 (Petugas informasi)"
        ],
        "correctAnswer": "技能【ぎのう】実習生【じっしゅうせい】",
        "explanation": "技能実習生 (ginou jisshuusei) adalah sebutan resmi bagi peserta magang kerja industri di Jepang.",
        "diagnosticFeedback": {
          "留学生【りゅうがくせい】 (Pelajar asing)": "Salah: 留学生 adalah mahasiswa atau pelajar sekolah.",
          "観光客【かんこうきゃく】 (Wisatawan)": "Salah: 観光客 adalah turis pelancong.",
          "案内係【あんないがかり】 (Petugas informasi)": "Salah: 案内係 adalah pemandu loket resepsionis."
        }
      },
      {
        "id": "drill-2",
        "type": "grammar_choice",
        "instruction": "Langkah 2 (Pola Kedudukan Peran): Lengkapi kalimat berbicara dalam kapasitas sebagai perwakilan kelompok.",
        "sentencePrompt": "クラスの 代表【だいひょう】（　　）、先生【せんせい】に お礼【れい】を 言【い】いました。",
        "options": [
          "として",
          "にとって",
          "に対して",
          "によって"
        ],
        "correctAnswer": "として",
        "explanation": "Pola [Kata Benda] + として menyatakan kedudukan, fungsi, atau kapasitas peran resmi (\"sebagai perwakilan\").",
        "diagnosticFeedback": {
          "にとって": "Salah: にとって berarti menurut sudut pandang penilaian pribadi.",
          "に対して": "Salah: に対して berarti terhadap suatu pihak/sasaran.",
          "によって": "Salah: によって berarti disebabkan oleh atau tergantung."
        }
      },
      {
        "id": "drill-3",
        "type": "particle_select",
        "instruction": "Langkah 3 (Pola Modifikasi Agen Sebelum Kata Benda): Pilihlah bentuk penghubung yang tepat sebelum kata benda kecelakaan.",
        "sentencePrompt": "大雨【おおあめ】（　　）被害【ひがい】が 広【ひろ】がって います。",
        "options": [
          "による",
          "によって",
          "として",
          "に対して"
        ],
        "correctAnswer": "による",
        "explanation": "Di depan kata benda (被害 higai = kerusakan), pola penanda sebab wajib berbentuk 〜による [N].",
        "diagnosticFeedback": {
          "によって": "Salah: によって digunakan langsung di depan kata kerja, bukan sebelum kata benda.",
          "として": "Salah: として bermakna sebagai peran.",
          "に対して": "Salah: に対して bermakna terhadap."
        }
      },
      {
        "id": "drill-4",
        "type": "sentence_ordering",
        "instruction": "Langkah 4 (Susun Kalimat): Rangkai kalimat bahwa kebiasaan hidup berbeda tergantung budayanya.",
        "sentencePrompt": "Susunlah kata-kata: \"Kebiasaan hidup berbeda tergantung negaranya\".",
        "tokens": [
          "生活【せいかつ】の 習慣【しゅうかん】は",
          "国【くに】に",
          "よって",
          "違【ちが】います"
        ],
        "correctOrder": [
          0,
          1,
          2,
          3
        ],
        "options": [
          "生活【せいかつ】の 習慣【しゅうかん】は 国【くに】に よって 違【ちが】います。",
          "国【くに】に 生活【せいかつ】の 習慣【しゅうかん】は 違【ちが】います よって。",
          "違【ちが】います 国【くに】に よって 生活【せいかつ】の 習慣【しゅうかん】は。",
          "よって 国【くに】に 生活【せいかつ】の 習慣【しゅうかん】は 違【ちが】います。"
        ],
        "correctAnswer": "生活【せいかつ】の 習慣【しゅうかん】は 国【くに】に よって 違【ちが】います。",
        "explanation": "Topik (生活の習慣は) + Kuni ni yotte (tergantung negaranya) + Chigaimasu (berbeda).",
        "diagnosticFeedback": {
          "国【くに】に 生活【せいかつ】の 習慣【しゅうかん】は 違【ちが】います よって。": "Salah susun konektor di akhir.",
          "違【ちが】います 国【くに】に よって 生活【せいかつ】の 習慣【しゅうかん】は。": "Salah posisi verba.",
          "よって 国【くに】に 生活【せいかつ】の 習慣【しゅうかん】は 違【ちが】います。": "Salah susun frasa awal."
        }
      },
      {
        "id": "drill-5",
        "type": "nuance_analysis",
        "instruction": "Langkah 5 (Analisis Nuansa): Analisislah makna kalimat \"お客様に対して丁寧に話します\".",
        "sentencePrompt": "Kalimat \"お客様【きゃくさま】に 対【たい】して 丁寧【ていねい】に 話【はな】します\" menekankan:",
        "options": [
          "Sikap sopan dan perlakuan santun yang ditujukan kepada pihak pelanggan sebagai sasaran interaksi",
          "Berbicara santai seperti kepada teman sebaya",
          "Membicarakan keburukan pelanggan di belakang mereka",
          "Menolak untuk melayani pembeli yang datang"
        ],
        "correctAnswer": "Sikap sopan dan perlakuan santun yang ditujukan kepada pihak pelanggan sebagai sasaran interaksi",
        "explanation": "〜に対して menandai pihak atau sasaran penerima sikap, perlakuan, atau respon moral.",
        "diagnosticFeedback": {
          "Berbicara santai seperti kepada teman sebaya": "Salah: Justru ditekankan berbicara sopan (丁寧に話します).",
          "Membicarakan keburukan pelanggan di belakang mereka": "Salah: Bertolak belakang dengan arti teks.",
          "Menolak untuk melayani pembeli yang datang": "Salah: Tidak ada makna penolakan."
        }
      }
    ],
    "can_do_challenge": {
      "statement": "Bisa berbicara mewakili posisi peserta magang teknis dalam sambutan resmi.",
      "situation": "Diminta memperkenalkan diri dan menyampaikan komitmen pada hari pertama masuk kerja.",
      "promptTask": "Katakan bahwa sebagai peserta magang kamu akan berjuang sekuat tenaga!",
      "modelAnswer": "実習生【じっしゅうせい】として 一生懸命【いっしょうけんめい】 頑張【がんば】ります。",
      "modelAnswerId": "Sebagai peserta pemagangan saya akan berusaha dengan sungguh-sungguh sekuat tenaga.",
      "culturalEtiquette": "Berdirilah tegak, tatap hadirin dengan senyum mantap, dan bungkukkan badan 30 derajat usai berucap.",
      "skillUnlocked": [
        "Menguasai identitas kedudukan formal via N + to shite",
        "Mampu menghubungkan relasi sebab variasi via ni yotte / ni yoru"
      ]
    },
    "pocket_summary": {
      "keyFormula": "[N] として (sebagai peran) / [N] によって (tergantung / oleh) / [N] による [N] / [N] に対して (terhadap sasaran)",
      "coreWords": [
        "じっしゅうせい",
        "だいひょう",
        "きそく",
        "たいど"
      ],
      "coreWarning": "N to shite = kapasitas resmi; N ni totte = menurut sudut pandang opini.",
      "quickDialogue": "A: 代表として？ → B: はい、代表として挨拶します。"
    }
  },
  "les-n4-u10-01": {
    "pedagogical_framework": {
      "what": {
        "summary": "Mengekspresikan kontras kekecewaan antara harapan vs kenyataan yang bertolak belakang (~noni) dan konjungsi kejutan tak terduga (tokoroga = namun di luar dugaan).",
        "canDo": "Bisa menceritakan kronologi kendala kiriman paket yang tidak kunjung tiba padahal sudah dipesan sejak lama.",
        "targetPatterns": [
          "[Verba/Adjektiva Bentuk Biasa / N + na] のに (padahal ... / mengharapkan A tapi malah terjadi B)",
          "文１。ところが、文２。 (Namun di luar dugaan, ...)",
          "約束【やくそく】したのに、来【こ】なかった (padahal sudah janji, tapi tidak datang)"
        ],
        "coreVocabSample": [
          "にもつ",
          "とどく",
          "れんらく",
          "へんじ",
          "ちゅうもん",
          "ざんねん"
        ]
      },
      "sensei_context": {
        "sceneIntro": "Di kantor divisi logistik asrama. Budi menunggu paket buku pelajaran yang dipesan seminggu lalu dengan layanan kilat tetapi belum juga sampai di depan pintu.",
        "dailyMission": "Gunakan partikel penegas kekecewaan 〜のに untuk menceritakan kesenjangan antara fakta riil dan ekspektasi.",
        "whyOrder": "Dalam kehidupan nyata, tidak semua hal berjalan mulus sesuai rencana. Pembelajar harus mampu mengungkapkan rasa kecewa atau anomali tanpa terdengar mengumpat kasar."
      },
      "cultural_notes": {
        "title": "Ekspresi Kekecewaan Halus dalam Budaya Keluhan Jepang (不満の遠回しな表現)",
        "etiquette": "Ketika mengajukan komplain atau menanyakan pesanan yang tertunda, gunakan akhiran 〜のに... dengan nada menggantung halus agar terkesan mengundang klarifikasi, bukan menuduh.",
        "taboos": "Jangan menggunakan kata benda langsung sebelum noni tanpa partikel な (seperti 雨のに - salah!). Kata benda dan kata sifat-na wajib menggunakan な: 雨なのに, 暇なのに."
      },
      "pronunciation_tips": {
        "title": "Nada Menggantung pada Partikel Kontras \"Noni\"",
        "moraNote": "Pada akhir kalimat bernuansa kecewa, vokal [i] pada \"noni...\" diucapkan sedikit memanjang dan merendah lembut.",
        "soundTip": "Kata sambung \"Tokoroga\" diucapkan dengan jeda tegas setelah koma untuk menandai titik balik kejadian."
      },
      "common_pitfalls": [
        {
          "title": "Lupa Menambahkan \"Na\" untuk Kata Benda dan Sifat-Na Sebelum \"Noni\"",
          "caseScenario": "Mengatakan \"padahal hari Minggu\" langsung menempelkan noni.",
          "pitfallWarning": "\"日曜日【にちようび】のに、仕事【しごと】が あります。\"",
          "rightSolution": "\"日曜日【にちようび】なのに、仕事【しごと】が あります。\"",
          "explanation": "Kata benda (N) dan Adjektiva-na wajib menyisipkan な sebelum noni: 日曜日なのに (padahal hari Minggu)."
        },
        {
          "title": "Tertukar Antara 〜のに (Kekecewaan Kontras) vs 〜ても (Meskipun Netral)",
          "caseScenario": "Mengungkapkan rasa heran kecewa karena sudah minum obat tapi belum sembuh.",
          "pitfallWarning": "\"薬【くすり】を 飲【の】んでも、熱【ねつ】が 下【さ】がりません。\" (Ini netral objektif)",
          "rightSolution": "\"薬【くすり】を 飲【の】んだのに、熱【ねつ】が 下【さ】がりません。\" (Menekankan kekecewaan emosional)",
          "explanation": "〜ても bersifat konsesi logis umum. 〜のに sarat dengan emosi subjektif kekecewaan, kejutan, atau rasa tidak puas dari pembicara."
        }
      ],
      "who_and_when": {
        "situational_context": "Menanyakan status pesanan toko online yang molor, menceritakan sudah belajar giat tapi nilai ujian turun, kendala janji temu.",
        "social_relations": "Sangat lazim dipakai saat curhat kepada rekan kerja, mentor asrama, maupun pengajuan keluhan sopan.",
        "when_not_to_use": "Jangan gunakan 〜のに untuk hal-hal yang hasilnya justru sangat menyenangkan (tidak dipakai untuk berita gembira)."
      },
      "scenario": {
        "title": "Komplain Kiriman Buku Pelajaran yang Terlambat",
        "setting": "Lobi kantor pos asrama, pukul 17.00",
        "narrative": "Budi menceritakan kepada Sakura bahwa paket bukunya belum tiba padahal sudah dijanjikan sampai kemarin sore."
      }
    },
    "dialogue": [
      {
        "id": "d1",
        "speaker": "Sakura",
        "speakerRole": "Mentor Asrama",
        "avatar": "👩‍🏫",
        "jp": "ブディさん、浮【う】かない 顔【かお】を していますね。どうしたの？",
        "furigana": "ブディさん、浮かない 顔を していますね。どうしたの？",
        "romaji": "Budi-san, ukanai kao o shite imasu ne. Dou shita no?",
        "idText": "Budi-san, wajahmu tampak murung ya. Ada apa gerangan?"
      },
      {
        "id": "d2",
        "speaker": "Budi",
        "speakerRole": "Pembelajar Indonesia",
        "avatar": "🙋‍♂️",
        "jp": "先週【せんしゅう】 頼【たの】んだ 専門書【せんもんしょ】が、まだ 届【とど】かないんです。",
        "furigana": "先週 頼んだ 専門書が、まだ 届かないんです。",
        "romaji": "Senshuu tanonda senmonsho ga, mada todokanai n desu.",
        "idText": "Buku referensi kejuruan yang saya pesan minggu lalu belum sampai juga."
      },
      {
        "id": "d3",
        "speaker": "Sakura",
        "speakerRole": "Mentor Asrama",
        "avatar": "👩‍🏫",
        "jp": "速達【そくたつ】で 送【おく】ってもらったんじゃなかった？",
        "furigana": "速達で 送ってもらったんじゃなかった？",
        "romaji": "Sokutatsu de okutte morattan janakatta?",
        "idText": "Bukankah kemarin kamu minta dikirimkan pakai pos kilat khusus?"
      },
      {
        "id": "d4",
        "speaker": "Budi",
        "speakerRole": "Pembelajar Indonesia",
        "avatar": "🙋‍♂️",
        "jp": "はい。昨日【きのう】 着【つ】く はずだったのに、まだ 配達【はいたつ】中【ちゅう】の ままなんです。",
        "furigana": "はい。昨日 着く はずだったのに、まだ 配達中の ままなんです。",
        "romaji": "Hai. Kinou tsuku hazu datta noni, mada haitatsu-chuu no mama na n desu.",
        "idText": "Iya. Padahal seharusnya kemarin sudah sampai, tetapi statusnya masih tertahan dalam pengiriman."
      },
      {
        "id": "d5",
        "speaker": "Sakura",
        "speakerRole": "Mentor Asrama",
        "avatar": "👩‍🏫",
        "jp": "追跡【ついせき】番号【ばんごう】で 調【しら】べてみた？",
        "furigana": "追跡番号で 調べてみた？",
        "romaji": "Tsuiseki bangou de shirabete mita?",
        "idText": "Sudah coba kamu lacak dengan nomor resi pelacakannya?"
      },
      {
        "id": "d6",
        "speaker": "Budi",
        "speakerRole": "Pembelajar Indonesia",
        "avatar": "🙋‍♂️",
        "jp": "電話【でんわ】した ところ、大雪【おおゆき】で トラックが 止【と】まっているそうです。",
        "furigana": "電話した ところ、大雪で トラックが 止まっているそうです。",
        "romaji": "Denwa shita tokoro, ooyuki de torakku ga tomatte iru sou desu.",
        "idText": "Saat saya menelepon, kabarnya truk pengangkut tertahan karena badai salju lebat."
      }
    ],
    "drills": [
      {
        "id": "drill-1",
        "type": "vocab_context",
        "instruction": "Langkah 1 (Konsep Kata): Pilihlah kata yang mencerminkan rasa kecewa atau sayang sekali atas hasil yang tidak terwujud.",
        "sentencePrompt": "Ungkapan perasaan kecewa atau disayangkan dalam bahasa Jepang adalah:",
        "options": [
          "残念【ざんねん】です (Sangat disayangkan/kecewa)",
          "安心【あんしん】です (Merasa lega)",
          "満足【まんぞく】です (Sangat puas)",
          "楽しみです (Sangat menantikan)"
        ],
        "correctAnswer": "残念【ざんねん】です (Sangat disayangkan/kecewa)",
        "explanation": "残念 (zannen) sering berpadu dengan kalimat berpartikel 〜のに untuk mengutarakan rasa kecewa.",
        "diagnosticFeedback": {
          "安心です (Merasa lega)": "Salah: 安心 berarti tenang melegakan hati.",
          "満足です (Sangat puas)": "Salah: 満足 berarti puas atas hasil baik.",
          "楽しみです (Sangat menantikan)": "Salah: 楽しみ berarti antusias menunggu masa depan."
        }
      },
      {
        "id": "drill-2",
        "type": "grammar_choice",
        "instruction": "Langkah 2 (Pola Sambung Noni): Lengkapi kalimat rasa heran badan belum sembuh padahal sudah minum obat.",
        "sentencePrompt": "薬【くすり】を（　　）のに、まだ 熱【ねつ】が 下【さ】がりません。",
        "options": [
          "飲【の】んだ",
          "飲【の】みます",
          "飲【の】んで",
          "飲【の】もう"
        ],
        "correctAnswer": "飲【の】んだ",
        "explanation": "Pola kontras kekecewaan adalah [Verba Bentuk Biasa (Futsuukei)] + のに (飲んだのに = padahal sudah minum obat).",
        "diagnosticFeedback": {
          "飲みます": "Salah: Bentuk masu tidak disambung langsung ke noni.",
          "飲んで": "Salah: Bentuk te tidak bersambung langsung ke noni.",
          "飲もう": "Salah: Bentuk ikoukei tidak cocok untuk aksi yang sudah terlaksana."
        }
      },
      {
        "id": "drill-3",
        "type": "particle_select",
        "instruction": "Langkah 3 (Partikel Kata Sifat-Na & Benda Sebelum Noni): Tentukan penyambung kata sifat-na yang benar.",
        "sentencePrompt": "彼【かれ】は 日本語【にほんご】が 上手【じょうず】（　　）のに、全然【ぜんぜん】 話【はな】そうと しません。",
        "options": [
          "な",
          "の",
          "だ",
          "に"
        ],
        "correctAnswer": "な",
        "explanation": "Untuk Kata Sifat-Na dan Kata Benda, wajib menggunakan な sebelum partikel のに (上手なのに).",
        "diagnosticFeedback": {
          "の": "Salah: の dipakai sebelum tame ni, bukan sebelum noni.",
          "だ": "Salah: だ berubah menjadi な sebelum noni.",
          "に": "Salah: に bukan partikel penyambung sebelum noni."
        }
      },
      {
        "id": "drill-4",
        "type": "sentence_ordering",
        "instruction": "Langkah 4 (Susun Kalimat): Rangkai kalimat konjungsi kontras kejutan tak terduga.",
        "sentencePrompt": "Susunlah kata-kata: \"Saya sudah menunggu di stasiun. Namun di luar dugaan, teman saya tidak kunjung datang\".",
        "tokens": [
          "駅【えき】で 待【ま】っていました。",
          "ところが、",
          "友達【ともだち】が",
          "来【こ】なかったのです。"
        ],
        "correctOrder": [
          0,
          1,
          2,
          3
        ],
        "options": [
          "駅【えき】で 待【ま】っていました。 ところが、 友達【ともだち】が 来【こ】なかったのです。",
          "ところが、 駅【えき】で 待【ま】っていました。 友達【ともだち】が 来【こ】なかったのです。",
          "友達【ともだち】が 駅【えき】で 待【ま】っていました。 来【こ】なかったのです。 ところが、",
          "来【こ】なかったのです。 ところが、 友達【ともだち】が 駅【えき】で 待【ま】っていました。"
        ],
        "correctAnswer": "駅【えき】で 待【ま】っていました。 ところが、 友達【ともだち】が 来【こ】なかったのです。",
        "explanation": "Kalimat harapan 1 (待っていました) + Konjungsi kontras (ところが、) + Fakta tak terduga (友達が来なかった).",
        "diagnosticFeedback": {
          "ところが、 駅【えき】で 待【ま】っていました。 友達【ともだち】が 来【こ】なかったのです。": "Salah penempatan konjungsi di awal.",
          "友達【ともだち】が 駅【えき】で 待【ま】っていました。 来【こ】なかったのです。 ところが、": "Salah urutan konjungsi di akhir.",
          "来【こ】なかったのです。 ところが、 友達【ともだち】が 駅【えき】で 待【ま】っていました。": "Salah susun urutan logis cerita."
        }
      },
      {
        "id": "drill-5",
        "type": "nuance_analysis",
        "instruction": "Langkah 5 (Analisis Nuansa): Analisislah beban emosional pada kalimat berakhiran \"...noni\".",
        "sentencePrompt": "Kalimat \"今日【きょう】は 日曜日【にちようび】なのに…\" yang terhenti di tengah menyiratkan:",
        "options": [
          "Rasa kecewa atau mengeluh karena hari Minggu yang seharusnya libur malah harus tetap bekerja atau tertimpa urusan lain",
          "Rasa gembira luar biasa karena bisa berlibur seharian",
          "Pertanyaan tentang hari apa besok pagi",
          "Kepastian bahwa hari Minggu adalah hari ibadah"
        ],
        "correctAnswer": "Rasa kecewa atau mengeluh karena hari Minggu yang seharusnya libur malah harus tetap bekerja atau tertimpa urusan lain",
        "explanation": "Kalimat yang diakhiri dengan 〜のに... mencerminkan keluhan halus atas kenyataan yang tidak adil atau bertentangan dengan harapan wajar.",
        "diagnosticFeedback": {
          "Rasa gembira luar biasa karena bisa berlibur seharian": "Salah: のに tidak dipakai untuk merayakan kegembiraan.",
          "Pertanyaan tentang hari apa besok pagi": "Salah: Ini bukan kalimat tanya.",
          "Kepastian bahwa hari Minggu adalah hari ibadah": "Salah: Ini bukan makna kontekstualnya."
        }
      }
    ],
    "can_do_challenge": {
      "statement": "Bisa menceritakan kronologi kendala kiriman barang yang tidak kunjung tiba padahal sudah dipesan.",
      "situation": "Melaporkan kepada instruktur asrama bahwa pesanan suku cadang seragam kerja belum kunjung tiba.",
      "promptTask": "Katakan bahwa padahal kamu sudah memesannya minggu lalu, tetapi belum sampai juga!",
      "modelAnswer": "先週【せんしゅう】 注文【ちゅうもん】したのに、まだ 届【とど】かないんです。",
      "modelAnswerId": "Padahal saya sudah memesannya minggu lalu, tetapi belum sampai juga.",
      "culturalEtiquette": "Gunakan nada suara mengadu ramah dan tunjukkan bukti struk pemesanan dari ponsel.",
      "skillUnlocked": [
        "Menguasai ekspresi kontras kekecewaan 〜のに",
        "Mampu menghubungkan peralihan tak terduga via ところが"
      ]
    },
    "pocket_summary": {
      "keyFormula": "[Bentuk Biasa / N+な] + のに (padahal) / 文1。ところが、文2。 (namun di luar dugaan)",
      "coreWords": [
        "にもつ",
        "とどく",
        "ちゅうもん",
        "ざんねん"
      ],
      "coreWarning": "Ingat partikel な sebelum noni untuk kata benda: 雨なのに (bukan 雨のに).",
      "quickDialogue": "A: 薬飲んだ？ → B: 飲んだのに治りません。"
    }
  },
  "les-n4-u10-02": {
    "pedagogical_framework": {
      "what": {
        "summary": "Menyatakan konsesi pantang menyerah meski dalam rintangan berat (~te mo / Adj-kute mo / N-demo), konfirmasi retoris atau kejutan pembuktian (~janai ka / dewa nai ka), dan partikel penegas ekstrem (~demo = bahkan ... sekalipun).",
        "canDo": "Bisa menegaskan semangat kerja pantang menyerah meski kondisi hujan deras dan mengonfirmasi pencapaian tim.",
        "targetPatterns": [
          "[Verba-te] も / [I-Adj -> kute] も (meskipun / walaupun ... tetap)",
          "[Kata Benda / Na-Adj] でも (meskipun berupa ... / bahkan ... sekalipun)",
          "[Kalimat Biasa] じゃないか / ではないか (bukankah ... ?! / ternyata ... !)",
          "どんなに 大変【たいへん】でも (betapa pun beratnya)"
        ],
        "coreVocabSample": [
          "あめ",
          "たいへん",
          "あきらめない",
          "せいこう",
          "どりょく",
          "がんばる"
        ]
      },
      "sensei_context": {
        "sceneIntro": "Di lokasi pelatihan luar ruangan pabrik saat hujan rintik. Budi dan Kenji tetap antusias menyelesaikan modul simulasi pemadam api darurat.",
        "dailyMission": "Gunakan 〜ても untuk menyatakan tekad pantang menyerah dan 〜じゃないか untuk memberikan semangat kejutan.",
        "whyOrder": "Pekerja dan pembelajar di Jepang sangat menghargai etos gigih (Ganbari). Pola konsesi 〜ても adalah kalimat wajib untuk menunjukkan komitmen tinggi."
      },
      "cultural_notes": {
        "title": "Etos Ketekunan Pantang Menyerah (不屈の精神 - Nanakorobi Yaoki)",
        "etiquette": "Ungkapan \"Ame ga futte mo gambarimasu\" (Meski hujan turun saya akan tetap bersemangat) dipandang sangat positif oleh atasan sebagai cerminan jiwa bertanggung jawab.",
        "taboos": "Jangan menggunakan kata \"janai ka!\" dengan nada membentak marah kepada orang yang lebih tua. Nada intonasi menentukan apakah ini pujian hangat atau teguran ketus."
      },
      "pronunciation_tips": {
        "title": "Intonasi Penegasan pada Pola Konsesi \"-Te mo\"",
        "moraNote": "Tekankan sedikit kata penguat seperti \"donna ni\" atau \"tatoe\" di awal kalimat.",
        "soundTip": "Pada frasa pujian kejutan \"...janai ka!\", akhiri dengan nada naik ceria."
      },
      "common_pitfalls": [
        {
          "title": "Salah Mengubah Kata Sifat-i ke Bentuk Konsesi (Kutemo)",
          "caseScenario": "Ingin mengatakan \"meskipun mahal saya tetap ingin beli\".",
          "pitfallWarning": "\"高【たか】いでも、買【か】いたいです。\"",
          "rightSolution": "\"高【たか】くても、買【か】いたいです。\"",
          "explanation": "Kata sifat-i diubah menjadi bentuk [kute] sebelum partikel mo: 高い -> 高くても. Partikel でも hanya untuk kata benda dan kata sifat-na."
        },
        {
          "title": "Tertukar Antara 〜ても (Kondisi Hipotetis Walaupun) vs 〜のに (Fakta Realita Padahal)",
          "caseScenario": "Mengatakan tekad bahwa besok sekalipun hujan akan tetap pergi.",
          "pitfallWarning": "\"明日【あした】 雨【あめ】が 降【ふ】るのに、行【い】きます。\"",
          "rightSolution": "\"明日【あした】 雨【あめ】が 降【ふ】っても、行【い】きます。\"",
          "explanation": "〜のに hanya dipakai untuk fakta yang SUDAH atau SEDANG terjadi secara nyata. Untuk pengandaian masa depan yang belum tentu terjadi, wajib memakai 〜ても."
        }
      ],
      "who_and_when": {
        "situational_context": "Pernyataan komitmen kerja proyek lapangan, menyemangati rekan yang lelah, merayakan hasil simulasi yang ternyata sukses.",
        "social_relations": "Sangat sering diucapkan sesama rekan seperjuangan untuk saling menguatkan mental tim.",
        "when_not_to_use": "Jangan gunakan konsesi 〜ても untuk alasan yang membenarkan kecerobohan K3 (misal: \"meski bahaya saya tetap terobos\" - terlarang!)."
      },
      "scenario": {
        "title": "Simulasi Tanggap Darurat di Tengah Hujan",
        "setting": "Lapangan uji keselamatan K3 pabrik, pukul 16.00",
        "narrative": "Budi dan Kenji berhasil menyelesaikan latihan pemadaman api tepat waktu meskipun cuaca diguyur hujan gerimis."
      }
    },
    "dialogue": [
      {
        "id": "d1",
        "speaker": "Kenji",
        "speakerRole": "Rekan Kerja Senior",
        "avatar": "🧑‍💻",
        "jp": "ブディ、雨【あめ】が 強【つよ】く なってきたよ。大丈夫【だいじょうぶ】かい？",
        "furigana": "ブディ、雨が 強く なってきたよ。大丈夫かい？",
        "romaji": "Budi, ame ga tsuyoku natte kita yo. Daijoubu kai?",
        "idText": "Budi, hujannya mulai bertambah deras lho. Kamu tidak apa-apa?"
      },
      {
        "id": "d2",
        "speaker": "Budi",
        "speakerRole": "Pembelajar Indonesia",
        "avatar": "🙋‍♂️",
        "jp": "はい！ 雨【あめ】が 降【ふ】っても、最後【さいご】まで やり抜【ぬ】きます！",
        "furigana": "はい！ 雨が 降っても、最後まで やり抜きます！",
        "romaji": "Hai! Ame ga futte mo, saigo made yarinukimasu!",
        "idText": "Iya! Walaupun hujan turun, saya akan tetap menuntaskannya sampai titik akhir!"
      },
      {
        "id": "d3",
        "speaker": "Kenji",
        "speakerRole": "Rekan Kerja Senior",
        "avatar": "🧑‍💻",
        "jp": "よし、ホースの バルブを 開【あ】けて！ 標的【ひょうてき】に 水【みず】を 当【あ】てるんだ。",
        "furigana": "よし、ホースの バルブを 開けて！ 標的に 水を 当てるんだ。",
        "romaji": "Yoshi, ho-su no barubu o akete! Hyouteki ni mizu o ateru n da.",
        "idText": "Bagus, buka katup selang pemadamnya! Arahkan semprotan air tepat ke sasaran."
      },
      {
        "id": "d4",
        "speaker": "Budi",
        "speakerRole": "Pembelajar Indonesia",
        "avatar": "🙋‍♂️",
        "jp": "標的【ひょうてき】が 倒【たお】れました！ タイムは どうですか。",
        "furigana": "標的が 倒れました！ タイムは どうですか。",
        "romaji": "Hyouteki ga taoremashita! Taimu wa dou desu ka.",
        "idText": "Targetnya sudah berhasil roboh! Bagaimana catatan waktunya?"
      },
      {
        "id": "d5",
        "speaker": "Kenji",
        "speakerRole": "Rekan Kerja Senior",
        "avatar": "🧑‍💻",
        "jp": "すごい！ 目標【もくひょう】の ３分【さんぷん】以内【いない】に 終【お】わったじゃないか！ 合格【ごうかく】だよ。",
        "furigana": "すごい！ 目標の ３分以内に 終わったじゃないか！ 合格だよ。",
        "romaji": "Sugoi! Mokuhyou no sanpun inai ni owatta janai ka! Goukaku da yo.",
        "idText": "Hebat sekali! Bukankah kamu berhasil menuntaskannya dalam waktu kurang dari target 3 menit?! Kamu lulus!"
      },
      {
        "id": "d6",
        "speaker": "Budi",
        "speakerRole": "Pembelajar Indonesia",
        "avatar": "🙋‍♂️",
        "jp": "やった！ どんなに 難【むずか】しくても、諦【あきら】めずに 努力【どりょく】して よかったです！",
        "furigana": "やった！ どんなに 難しくても、諦めずに 努力して よかったです！",
        "romaji": "Yatta! Donna ni muzukashikute mo, akiramezu ni doryoku shite yokatta desu!",
        "idText": "Hore berhasil! Betapa pun sulitnya, syukurlah saya berusaha tanpa menyerah!"
      }
    ],
    "drills": [
      {
        "id": "drill-1",
        "type": "vocab_context",
        "instruction": "Langkah 1 (Konsep Kata): Pilihlah kata yang tepat untuk usaha sungguh-sungguh pantang menyerah.",
        "sentencePrompt": "Istilah dalam bahasa Jepang untuk usaha keras dan daya upaya maksimal adalah:",
        "options": [
          "努力【どりょく】 (Usaha keras/ikhtiar)",
          "遠慮【えんりょ】 (Sikap sungkan)",
          "後悔【こうかい】 (Penyesalan)",
          "油断【ゆだん】 (Keteledoran)"
        ],
        "correctAnswer": "努力【どりょく】 (Usaha keras/ikhtiar)",
        "explanation": "努力 (doryoku) adalah ikhtiar usaha keras berkesinambungan untuk mencapai tujuan.",
        "diagnosticFeedback": {
          "遠慮【えんりょ】 (Sikap sungkan)": "Salah: 遠慮 adalah rasa sungkan atau menahan diri.",
          "後悔【こうかい】 (Penyesalan)": "Salah: 後悔 adalah rasa menyesal.",
          "油断【ゆだん】 (Keteledoran)": "Salah: 油断 adalah lengah atau ceroboh."
        }
      },
      {
        "id": "drill-2",
        "type": "grammar_choice",
        "instruction": "Langkah 2 (Pola Konsesi Kata Sifat): Lengkapi kalimat tekad belajar meski materi sangat sulit.",
        "sentencePrompt": "いくら 日本語【にほんご】が（　　）、最後【さいご】まで 諦【あきら】めません。",
        "options": [
          "難【むずか】しくても",
          "難【むずか】しいでも",
          "難【むずか】しくて",
          "難【むずか】しいのに"
        ],
        "correctAnswer": "難【むずか】しくても",
        "explanation": "Kata Sifat-i diubah menjadi bentuk [kute] + も: 難しくても = walaupun sulit.",
        "diagnosticFeedback": {
          "難しいでも": "Salah: でも hanya dipakai untuk kata benda dan kata sifat-na, bukan kata sifat-i.",
          "難しくて": "Salah: Hanya bentuk sambung te biasa tanpa makna konsesi walaupun.",
          "難しいのに": "Salah: のに tidak dipasangkan dengan kata penguat pengandaian \"ikura\"."
        }
      },
      {
        "id": "drill-3",
        "type": "particle_select",
        "instruction": "Langkah 3 (Pola Penegas Ekstrem): Pilihlah partikel yang tepat untuk \"bahkan anak kecil sekalipun bisa\".",
        "sentencePrompt": "この スマホは 簡単【かんたん】ですから、子供【こども】（　　）使【つか】えます。",
        "options": [
          "でも",
          "のに",
          "より",
          "ほど"
        ],
        "correctAnswer": "でも",
        "explanation": "Partikel でも pada kata benda dapat berfungsi menegaskan contoh ekstrem: \"bahkan anak kecil pun bisa menggunakannya\".",
        "diagnosticFeedback": {
          "のに": "Salah: のに bermakna padahal.",
          "より": "Salah: より menandai pembanding komparasi.",
          "ほど": "Salah: ほど menandai tingkat perkiraan derajad."
        }
      },
      {
        "id": "drill-4",
        "type": "sentence_ordering",
        "instruction": "Langkah 4 (Susun Kalimat): Rangkai kalimat pujian kejutan bahwa masakan tersebut ternyata sangat lezat.",
        "sentencePrompt": "Susunlah kata-kata: \"Bukankah masakan ini ternyata sangat lezat?!\".",
        "tokens": [
          "この 料理【りょうり】、",
          "とても",
          "おいしい",
          "じゃないか！"
        ],
        "correctOrder": [
          0,
          1,
          2,
          3
        ],
        "options": [
          "この 料理【りょうり】、 とても おいしい じゃないか！",
          "とても おいしい じゃないか！ この 料理【りょうり】、",
          "じゃないか！ とても おいしい この 料理【りょうり】、",
          "この 料理【りょうり】、 じゃないか！ とても おいしい"
        ],
        "correctAnswer": "この 料理【りょうり】、 とても おいしい じゃないか！",
        "explanation": "Topik (この料理) + Keterangan (とても) + Sifat (おいしい) + Janai ka (bukankah ternyata...!).",
        "diagnosticFeedback": {
          "とても おいしい じゃないか！ この 料理【りょうり】、": "Salah susun terbalik.",
          "じゃないか！ とても おいしい この 料理【りょうり】、": "Salah posisi partikel penutup.",
          "この 料理【りょうり】、 じゃないか！ とても おいしい": "Salah struktur penegasan."
        }
      },
      {
        "id": "drill-5",
        "type": "nuance_analysis",
        "instruction": "Langkah 5 (Analisis Nuansa): Analisislah fungsi partikel \"じゃないか\" dalam obrolan sesama rekan kerja.",
        "sentencePrompt": "Ketika Kenji berkata kepada Budi \"目標に間に合ったじゃないか！\", maknanya adalah:",
        "options": [
          "Pujian gembira yang mengonfirmasi bahwa Budi ternyata berhasil melampaui target dengan sukses",
          "Kemarahan karena Budi datang terlambat melampaui target waktu",
          "Pertanyaan formal yang meragukan apakah tugasnya sudah selesai",
          "Larangan untuk tidak menyelesaikan tugas tepat waktu"
        ],
        "correctAnswer": "Pujian gembira yang mengonfirmasi bahwa Budi ternyata berhasil melampaui target dengan sukses",
        "explanation": "〜じゃないか dalam intonasi ceria berfungsi sebagai ungkapan rasa kagum dan konfirmasi kejutan positif (ternyata kamu berhasil!).",
        "diagnosticFeedback": {
          "Kemarahan karena Budi datang terlambat melampaui target waktu": "Salah: Ini bukan kalimat kemarahan.",
          "Pertanyaan formal yang meragukan apakah tugasnya sudah selesai": "Salah: Ini ungkapan seruan penegasan, bukan keraguan.",
          "Larangan untuk tidak menyelesaikan tugas tepat waktu": "Salah: Tidak ada makna larangan sama sekali."
        }
      }
    ],
    "can_do_challenge": {
      "statement": "Bisa menegaskan semangat kerja pantang menyerah meski kondisi hujan deras.",
      "situation": "Saat shift kerja diwarnai cuaca buruk dan rekan kerja bertanya apakah kamu masih kuat.",
      "promptTask": "Tegaskan bahwa walaupun hujan deras kamu akan tetap berjuang sekuat tenaga!",
      "modelAnswer": "雨【あめ】が 降【ふ】っても、一生懸命【いっしょうけんめい】 頑張【がんば】ります！",
      "modelAnswerId": "Walaupun hujan turun, saya akan tetap berusaha sekuat tenaga!",
      "culturalEtiquette": "Ucapkan dengan kepalan tangan mantap dan tatapan optimis penuh semangat.",
      "skillUnlocked": [
        "Menguasai ekspresi konsesi komitmen [V-te] mo",
        "Mampu menggunakan seruan afirmatif kejutan 〜じゃないか"
      ]
    },
    "pocket_summary": {
      "keyFormula": "[V-te] も / [Adj-kute] も / [N] でも (walaupun) / [Kalimat] じゃないか (bukankah ternyata!)",
      "coreWords": [
        "あめ",
        "たいへん",
        "どりょく",
        "せいこう"
      ],
      "coreWarning": "Kata sifat-i = takakute mo (bukan takai demo). Partikel demo khusus kata benda/sifat-na.",
      "quickDialogue": "A: 大変だよ？ → B: 大変でも頑張ります！"
    }
  },
  "les-n4-u11-01": {
    "pedagogical_framework": {
      "what": {
        "summary": "Bentuk kausatif (使役形 shiekikei: verba Gol 1 -aseru, Gol 2 -saseru, Gol 3 saseru/kosaseru), permohonan izin cuti diri sendiri (~sasete kudasai / moraitai), dan kewajiban mutlak (~nakereba naranai / nakya).",
        "canDo": "Bisa memohon izin pulang lebih awal (soutai) kepada atasan saat sakit demam dan memahami aturan absensi.",
        "targetPatterns": [
          "[Verba Kausatif-te] ください / いただけませんか (izinkan saya melakukan ...)",
          "[Verba-nai -> nakereba] ならない / いけない (wajib / harus melakukan)",
          "[Verba-nai -> nakya / nakucha] (harus ... - kasual)",
          "[Orang] に [Aksi] を させる (membuat / menyuruh seseorang melakukan)"
        ],
        "coreVocabSample": [
          "そうたい",
          "きゅうか",
          "やすむ",
          "ねつ",
          "きょか",
          "たいちょう"
        ]
      },
      "sensei_context": {
        "sceneIntro": "Di ruang kantor kepala bagian (Kachou). Budi merasa badannya sangat panas menggigil saat jam kerja siang dan ingin memohon izin pulang lebih awal untuk berobat.",
        "dailyMission": "Gunakan bentuk permohonan izin kausatif \"Yasumasete itadakemasen ka\" untuk memohon izin pulang secara profesional.",
        "whyOrder": "Memohon izin cuti darurat (soutai/yuukyuu) menuntut etika Keigo dan kausatif tingkat tinggi agar atasan memahami kondisi kesehatan bawahan dengan empati."
      },
      "cultural_notes": {
        "title": "Tata Cara Izin Pulang Cepat (早退 - Soutai) di Perusahaan Jepang",
        "etiquette": "Ketika sakit di tempat kerja, jangan langsung berkemas pulang. Temui atasan langsung, laporkan suhu tubuh, dan katakan: \"Taichou ga suguremasen node, soutai sasete itadakemasen ka?\".",
        "taboos": "Jangan memakai bentuk kausatif perintah kepada atasan. Bentuk kausatif V-sasete HANYA dipakai untuk merendahkan diri sendiri saat memohon izin melakukan sesuatu."
      },
      "pronunciation_tips": {
        "title": "Pelafalan Kausatif Izin Lembut \"-Sasete kudasai\"",
        "moraNote": "Ya-su-ma-se-te memiliki 5 mora teratur tanpa aksen kejut.",
        "soundTip": "Pada saat mengucapkan \"moushiwake arimasen\", tundukkan kepala dengan santun."
      },
      "common_pitfalls": [
        {
          "title": "Salah Memilih Subjek Pemohon dalam Pola Kausatif Izin",
          "caseScenario": "Memohon izin pulang tapi keliru menggunakan bentuk perintah biasa \"kaette kudasai\".",
          "pitfallWarning": "\"早【はや】く 帰【かえ】って ください。\" (Artinya: Menyuruh atasan pulang!)",
          "rightSolution": "\"早【はや】く 帰【かえ】らせて ください。\" (Benar: Izinkan saya yang pulang)",
          "explanation": "[V-te] ください berarti menyuruh lawan bicara melakukan aksi. [V-sasete] ください berarti memohon izin agar DIRI SENDIRI yang diizinkan melakukan aksi tersebut."
        },
        {
          "title": "Tertukar Antara 〜なければならない (Wajib Formal) vs 〜なくてもいい (Boleh Tidak)",
          "caseScenario": "Mengatakan harus minum obat 3 kali.",
          "pitfallWarning": "\"薬【くすり】を 飲【の】まなくても ならない。\"",
          "rightSolution": "\"薬【くすり】を 飲【の】まなければ ならない。\"",
          "explanation": "Rumus keharusan wajib adalah [V-nai -> nakereba] + ならない / いけない."
        }
      ],
      "who_and_when": {
        "situational_context": "Memohon izin pulang sakit (soutai), mengajukan cuti tahunan (yuukyuu kyuuka), menjelaskan kewajiban membawa paspor saat ke imigrasi.",
        "social_relations": "Sangat vital dan baku diucapkan oleh bawahan kepada manajer/supervisor.",
        "when_not_to_use": "Jangan memakai ragam kasual nakya kepada direktur utama perusahaan."
      },
      "scenario": {
        "title": "Permohonan Izin Pulang Cepat Karena Demam Tinggi",
        "setting": "Meja manajer lantai 1, pukul 14.00",
        "narrative": "Budi mengalami demam 38 derajat dan memohon izin kepada Tanaka-kachou untuk pulang lebih awal memeriksakan diri ke klinik."
      }
    },
    "dialogue": [
      {
        "id": "d1",
        "speaker": "Budi",
        "speakerRole": "Pembelajar Indonesia",
        "avatar": "🙋‍♂️",
        "jp": "田中【たなか】課長【かちょう】、今【いま】 お時間【じかん】 よろしいでしょうか。",
        "furigana": "田中課長、今 お時間 よろしいでしょうか。",
        "romaji": "Tanaka-kachou, ima ojikan yoroshii deshou ka.",
        "idText": "Tanaka-kachou, apakah saat ini Bapak ada waktu luang sebentar?"
      },
      {
        "id": "d2",
        "speaker": "Tanaka",
        "speakerRole": "Kepala Bagian",
        "avatar": "🧑‍💼",
        "jp": "ええ、どうしましたか、ブディさん。顔【かお】が 赤【あか】いですよ。",
        "furigana": "ええ、どうしましたか、ブディさん。顔が 赤いですよ。",
        "romaji": "Ee, dou shimashita ka, Budi-san. Kao ga akai desu yo.",
        "idText": "Iya, ada apa Budi-san? Wajahmu tampak memerah lho."
      },
      {
        "id": "d3",
        "speaker": "Budi",
        "speakerRole": "Pembelajar Indonesia",
        "avatar": "🙋‍♂️",
        "jp": "熱【ねつ】を 測【はか】ったところ、３８度【さんじゅうはちど】 ありました。病院【びょういん】へ 行【い】かなければ なりません。",
        "furigana": "熱を 測ったところ、３８度 ありました。病院へ 行かなければ なりません。",
        "romaji": "Netsu o hakatta tokoro, sanjuuhachido arimashita. Byouin e ikanakereba narimasen.",
        "idText": "Saat saya ukur suhu tubuh, ternyata mencapai 38 derajat. Saya harus pergi memeriksakan diri ke rumah sakit."
      },
      {
        "id": "d4",
        "speaker": "Tanaka",
        "speakerRole": "Kepala Bagian",
        "avatar": "🧑‍💼",
        "jp": "それは 高熱【こうねつ】ですね！ 無理【むり】を しては いけませんよ。",
        "furigana": "それは 高熱ですね！ 無理を しては いけませんよ。",
        "romaji": "Sore wa kounetsu desu ne! Muri o shite wa ikemasen yo.",
        "idText": "Wah itu demam tinggi! Kamu tidak boleh memaksakan diri bekerja lho."
      },
      {
        "id": "d5",
        "speaker": "Budi",
        "speakerRole": "Pembelajar Indonesia",
        "avatar": "🙋‍♂️",
        "jp": "大変【たいへん】 申【もう】し訳【わけ】ありませんが、今日【きょう】は 早退【そうたい】させて いただけないでしょうか。",
        "furigana": "大変 申し訳ありませんが、今日は 早退させて いただけないでしょうか。",
        "romaji": "Taihen moushiwake arimasen ga, kyou wa soutai sasete itadakenai deshou ka.",
        "idText": "Sungguh mohon maaf sebesar-besarnya, apakah kiranya hari ini saya diizinkan untuk pulang lebih awal?"
      },
      {
        "id": "d6",
        "speaker": "Tanaka",
        "speakerRole": "Kepala Bagian",
        "avatar": "🧑‍💼",
        "jp": "もちろんです。すぐ 帰【かえ】って 診察【しんさつ】を 受【う】けてください。お大事【だいじ】に！",
        "furigana": "もちろんです。すぐ 帰って 診察を 受けてください。お大事に！",
        "romaji": "Mochiron desu. Sugu kaette shinsatsu o ukete kudasai. Odaiji ni!",
        "idText": "Tentu saja boleh. Segeralah pulang dan periksakan diri ke dokter. Semoga lekas sembuh ya!"
      }
    ],
    "drills": [
      {
        "id": "drill-1",
        "type": "vocab_context",
        "instruction": "Langkah 1 (Konsep Kata): Pilihlah istilah yang tepat untuk pulang kerja lebih awal sebelum jam selesai shift.",
        "sentencePrompt": "Istilah resmi dalam dunia kerja Jepang untuk izin pulang mendahului jam kerja adalah:",
        "options": [
          "早退【そうたい】 (Pulang cepat)",
          "遅刻【ちこく】 (Terlambat datang)",
          "残業【ざんぎょう】 (Lembur kerja)",
          "出張【しゅっちょう】 (Dinas luar)"
        ],
        "correctAnswer": "早退【そうたい】 (Pulang cepat)",
        "explanation": "早退 (soutai) adalah istilah sah kepegawaian untuk izin meninggalkan tempat kerja lebih awal.",
        "diagnosticFeedback": {
          "遅刻【ちこく】 (Terlambat datang)": "Salah: 遅刻 adalah datang terlambat.",
          "残業【ざんぎょう】 (Lembur kerja)": "Salah: 残業 adalah lembur bekerja melewati jam reguler.",
          "出張【しゅっちょう】 (Dinas luar)": "Salah: 出張 adalah perjalanan dinas tugas kantor."
        }
      },
      {
        "id": "drill-2",
        "type": "grammar_choice",
        "instruction": "Langkah 2 (Pola Permohonan Izin Kausatif): Lengkapi permohonan santun agar diri sendiri diizinkan beristirahat.",
        "sentencePrompt": "体調【たいちょう】が 悪【わる】いので、今日【きょう】は（　　）いただけませんか。",
        "options": [
          "休【やす】ませて",
          "休【やす】んで",
          "休【やす】まされて",
          "休【やす】む"
        ],
        "correctAnswer": "休【やす】ませて",
        "explanation": "Verba Golongan 1: 休む -> kausatif 休ませる -> bentuk te 休ませて いただけませんか = sudikah kiranya mengizinkan saya istirahat.",
        "diagnosticFeedback": {
          "休んで": "Salah: 休んでいただけませんか berarti memohon lawan bicara yang beristirahat.",
          "休まされて": "Salah: Ini bentuk pasif kausatif (dipaksa istirahat).",
          "休む": "Salah: Bentuk kamus tidak bersambung ke itadakemasen ka."
        }
      },
      {
        "id": "drill-3",
        "type": "particle_select",
        "instruction": "Langkah 3 (Formula Keharusan Mutlak): Pilihlah rumus yang tepat untuk kewajiban mematuhi aturan kerja.",
        "sentencePrompt": "会社【かいしゃ】の ルールは 絶対【ぜったい】に 守【まも】ら（　　）なりません。",
        "options": [
          "なければ",
          "なくても",
          "ないで",
          "ないなら"
        ],
        "correctAnswer": "なければ",
        "explanation": "Pola keharusan mutlak hukum/aturan adalah [V-nai -> nakereba] + ならない (守らなければなりません).",
        "diagnosticFeedback": {
          "なくても": "Salah: なくてもいい bermakna tidak perlu/opsional.",
          "ないで": "Salah: ないで bermakna tanpa melakukan.",
          "ないなら": "Salah: bukan rumus keharusan narimasen."
        }
      },
      {
        "id": "drill-4",
        "type": "sentence_ordering",
        "instruction": "Langkah 4 (Susun Kalimat): Rangkai kalimat memohon izin untuk mengemukakan pendapat dalam rapat.",
        "sentencePrompt": "Susunlah kata-kata: \"Izinkan saya menyampaikan pendapat sebentar\".",
        "tokens": [
          "私【わたし】に",
          "意見【いけん】を",
          "言【い】わせて",
          "ください"
        ],
        "correctOrder": [
          0,
          1,
          2,
          3
        ],
        "options": [
          "私【わたし】に 意見【いけん】を 言【い】わせて ください。",
          "意見【いけん】を 私【わたし】に ください 言【い】わせて。",
          "言【い】わせて 私【わたし】に 意見【いけん】を ください。",
          "ください 私【わたし】に 意見【いけん】を 言【い】わせて。"
        ],
        "correctAnswer": "私【わたし】に 意見【いけん】を 言【い】わせて ください。",
        "explanation": "Subjek izin (私に) + Objek (意見を) + Kausatif-te (言わせて) + ください.",
        "diagnosticFeedback": {
          "意見【いけん】を 私【わたし】に ください 言【い】わせて。": "Salah susun predikat.",
          "言【い】わせて 私【わたし】に 意見【いけん】を ください。": "Salah posisi verba sambung.",
          "ください 私【わたし】に 意見【いけん】を 言【い】わせて。": "Salah penempatan kata permohonan di awal."
        }
      },
      {
        "id": "drill-5",
        "type": "nuance_analysis",
        "instruction": "Langkah 5 (Analisis Nuansa): Bedakan fungsi \"帰ってください\" vs \"帰らせてください\".",
        "sentencePrompt": "Perbedaan mendasar antara \"帰ってください\" dan \"帰らせてください\" adalah:",
        "options": [
          "\"帰ってください\" menyuruh lawan bicara pulang, sedangkan \"帰らせてください\" memohon izin agar diri sendiri yang pulang",
          "Keduanya memiliki arti yang persis sama tanpa perbedaan",
          "\"帰らせてください\" adalah kalimat perintah kasar untuk mengusir tamu",
          "\"帰ってください\" hanya boleh diucapkan di rumah sakit"
        ],
        "correctAnswer": "\"帰ってください\" menyuruh lawan bicara pulang, sedangkan \"帰らせてください\" memohon izin agar diri sendiri yang pulang",
        "explanation": "Bentuk kausatif -sasete kudasai memindahkan agen tindakan kepada pembicara sebagai pihak yang memohon izin.",
        "diagnosticFeedback": {
          "Keduanya memiliki arti yang persis sama tanpa perbedaan": "Salah: Subjek pelakunya bertolak belakang.",
          "\"帰らせてください\" adalah kalimat perintah kasar untuk mengusir tamu": "Salah: Justru permohonan izin santun untuk diri sendiri.",
          "\"帰ってください\" hanya boleh diucapkan di rumah sakit": "Salah: Bisa diucapkan di mana saja."
        }
      }
    ],
    "can_do_challenge": {
      "statement": "Bisa memohon izin pulang lebih awal (soutai) kepada atasan saat sakit demam.",
      "situation": "Merasa kepala pusing dan demam di tengah shift kerja kantor pabrik.",
      "promptTask": "Mohonlah kepada atasan agar diizinkan pulang lebih awal hari ini!",
      "modelAnswer": "体調【たいちょう】が 悪【わる】いので、早退【そうたい】させて いただけないでしょうか。",
      "modelAnswerId": "Karena kondisi badan saya kurang sehat, sudikah kiranya mengizinkan saya pulang lebih awal?",
      "culturalEtiquette": "Ucapkan dengan nada santun merendah dan bungkukkan badan tanda permohonan tulus.",
      "skillUnlocked": [
        "Menguasai permohonan izin kausatif V-sasete itadakemasen ka",
        "Mampu mengekspresikan keharusan mutlak V-nakereba narimasen"
      ]
    },
    "pocket_summary": {
      "keyFormula": "[V-Kausatif-te] + ください / いただけませんか (izinkan saya) / [V-nakereba] ならない (wajib)",
      "coreWords": [
        "そうたい",
        "きゅうか",
        "やすむ",
        "ねつ"
      ],
      "coreWarning": "Kaette kudasai = menyuruh orang lain pulang; Kaerasete kudasai = memohon izin agar diri sendiri yang pulang.",
      "quickDialogue": "A: どうしたの？ → B: 早退させていただけませんか。"
    }
  },
  "les-n4-u11-02": {
    "pedagogical_framework": {
      "what": {
        "summary": "Larangan mutlak keselamatan K3 (~te wa ikenai), bentuk perintah tegas (命令形 meireikei), bentuk larangan keras (禁止形 kinshikei: V-ru + na), serta instruksi otoritatif santun (~nasai).",
        "canDo": "Bisa membaca papan peringatan K3 di area konstruksi dan mematuhi instruksi keselamatan darurat seketika.",
        "targetPatterns": [
          "[Verba-te] は いけません / いけない (dilarang keras / tidak boleh)",
          "[Verba Bentuk Perintah] (Meireikei: 押せ！ 逃げろ！ 止まれ！)",
          "[Verba Kamus] + な！ (Kinshikei: 触るな！ 入るな！ 動かすな！)",
          "[Verba Masu-stem] + なさい (lakukanlah - instruksi terarah)"
        ],
        "coreVocabSample": [
          "きけん",
          "ちゅうい",
          "さわるな",
          "はいってはいけない",
          "ヘルメット",
          "あんぜん"
        ]
      },
      "sensei_context": {
        "sceneIntro": "Di area bengkel alat berat dan konstruksi. Tanaka memandu Budi mengenakan helm keselamatan dan membaca rambu-rambu bahaya tegangan tinggi.",
        "dailyMission": "Pahami makna rambu Meireikei dan Kinshikei untuk menyelamatkan nyawa seketika dalam situasi darurat K3.",
        "whyOrder": "Di pabrik dan lokasi konstruksi Jepang, instruksi keselamatan darurat tidak menggunakan kalimat sopan yang panjang. Pembelajar WAJIB mengenali bentuk perintah/larangan instan demi keselamatan jiwa."
      },
      "cultural_notes": {
        "title": "Komunikasi Keselamatan Kerja K3 Jepang (安全第一 - Anzen Daiichi)",
        "etiquette": "Dalam kondisi darurat kebakaran atau mesin macet, teriakan seperti \"Nigero!\" (Lari!) atau \"Sawaru na!\" (Jangan sentuh!) bukan tanda kemarahan, melainkan instruksi penyelamatan nyawa darurat.",
        "taboos": "Jangan pernah menggunakan Meireikei (perintah kasar) dalam percakapan kerja sehari-hari yang tenang kepada siapa pun."
      },
      "pronunciation_tips": {
        "title": "Artikulasi Rambu Larangan Singkat \"Kinshikei\"",
        "moraNote": "Bentuk kamus + な diucapkan dengan nada tegas menghentak: Sa-wa-ru-na! Ha-i-ru-na!",
        "soundTip": "Bentuk 〜てはいけません diucapkan dengan nada datar tegas tanpa intonasi keraguan."
      },
      "common_pitfalls": [
        {
          "title": "Tertukar Antara Partikel Larangan \"Na!\" vs Partikel Afirmatif Santai \"Naa\"",
          "caseScenario": "Mendengar teriakan \"Sawaru na!\" tetapi mengiranya sebagai obrolan santai.",
          "pitfallWarning": "\"触【さわ】るな (Sawaru na)\" dianggap obrolan santai.",
          "rightSolution": "\"触【さわ】るな！\" adalah larangan mutlak: \"Dilarang menyentuh sama sekali!\".",
          "explanation": "Verba kamus + な pendek menghentak adalah bentuk larangan keras (禁止形 kinshikei) yang menandakan bahaya maut."
        },
        {
          "title": "Memakai Bentuk \"~Nasai\" Kepada Atasan atau Senior",
          "caseScenario": "Meminta atasan membaca laporan: \"Yominasai\".",
          "pitfallWarning": "\"課長【かちょう】、この 報告書【ほうこくしょ】を 読【よ】みなさい。\"",
          "rightSolution": "\"課長【かちょう】、この 報告書【ほうこくしょ】を お読【よ】みください。\"",
          "explanation": "〜なさい adalah perintah dari figur berwenang (orang tua ke anak, dokter ke pasien, guru ke murid). Kepada atasan, wajib menggunakan Keigo."
        }
      ],
      "who_and_when": {
        "situational_context": "Papan rambu peringatan area konstruksi, prosedur evakuasi gempa/kebakaran, briefing K3 sebelum masuk bengkel perakitan.",
        "social_relations": "Digunakan oleh instruktur K3 dan supervisor pabrik saat mengarahkan keselamatan teknis.",
        "when_not_to_use": "Jangan gunakan bentuk Meireikei/Kinshikei dalam pergaulan santai normal."
      },
      "scenario": {
        "title": "Inspeksi Rambu K3 di Bengkel Alat Berat",
        "setting": "Area fabrikasi logam pabrik, pukul 08.15",
        "narrative": "Tanaka mengajarkan arti rambu bahaya \"Sawaru na\" dan memastikan Budi memakai helm keselamatan sebelum melangkah ke area mesin pres."
      }
    },
    "dialogue": [
      {
        "id": "d1",
        "speaker": "Tanaka",
        "speakerRole": "Supervisor K3",
        "avatar": "🧑‍💼",
        "jp": "ブディさん、作業場【さぎょうば】に 入【はい】る 前【まえ】に、ヘルメットを 着用【ちゃくよう】しなさい。",
        "furigana": "ブディさん、作業場に 入る 前に、ヘルメットを 着用しなさい。",
        "romaji": "Budi-san, sagyouba ni hairu mae ni, herumetto o chakuyou shinasai.",
        "idText": "Budi-san, sebelum masuk ke area bengkel kerja, kenakanlah helm keselamatanmu."
      },
      {
        "id": "d2",
        "speaker": "Budi",
        "speakerRole": "Pembelajar Indonesia",
        "avatar": "🙋‍♂️",
        "jp": "はい！ あご紐【ひも】も しっかり 締【し】めました。安全【あんぜん】第一【だいいち】ですね。",
        "furigana": "はい！ あご紐も しっかり 締めました。安全第一ですね。",
        "romaji": "Hai! Agohimo mo shikkari shimemashita. Anzen daiichi desu ne.",
        "idText": "Baik! Tali dagu helm juga sudah saya kencangkan dengan rapat. Utamakan keselamatan ya."
      },
      {
        "id": "d3",
        "speaker": "Tanaka",
        "speakerRole": "Supervisor K3",
        "avatar": "🧑‍💼",
        "jp": "あそこに「立入【たちい】り禁止【きんし】・入【はい】るな」と 書【か】いて ありますね。何【なに】が あっても 入【はい】っては いけませんよ。",
        "furigana": "あそこに「立入り禁止・入るな」と 書いて ありますね。何が あっても 入っては いけませんよ。",
        "romaji": "Asoko ni \"Tachiiri kinshi, hairu na\" to kaite arimasu ne. Nani ga atte mo haitte wa ikemasen yo.",
        "idText": "Di sebelah sana tertulis \"Dilarang Masuk (Hairu na)\" kan ya. Apa pun yang terjadi, kamu tidak boleh masuk ke sana lho."
      },
      {
        "id": "d4",
        "speaker": "Budi",
        "speakerRole": "Pembelajar Indonesia",
        "avatar": "🙋‍♂️",
        "jp": "承知【しょうち】しました。黄色【きいろ】い 線【せん】の 外側【そとがわ】を 歩【ある】きます。",
        "furigana": "承知しました。黄色い 線の 外側を 歩きます。",
        "romaji": "Shouchi shimashita. Kiiroi sen no sotogawa o arukimasu.",
        "idText": "Saya pahami. Saya akan selalu berjalan di sisi luar garis penanda kuning."
      },
      {
        "id": "d5",
        "speaker": "Tanaka",
        "speakerRole": "Supervisor K3",
        "avatar": "🧑‍💼",
        "jp": "機械【きかい】が 動【うご】いている 時【とき】は、絶対に 触【さわ】るな！ 挟【はさ】まれる 危険【きけん】が あるからね。",
        "furigana": "機械が 動いている 時は、絶対に 触るな！ 挟まれる 危険が あるからね。",
        "romaji": "Kikai ga ugoite iru toki wa, zettai ni sawaru na! Hasamareru kiken ga aru kara ne.",
        "idText": "Saat mesin sedang bergerak, jangan sekali-kali menyentuhnya! Karena ada bahaya terjepit."
      },
      {
        "id": "d6",
        "speaker": "Budi",
        "speakerRole": "Pembelajar Indonesia",
        "avatar": "🙋‍♂️",
        "jp": "はい！ 指差【ゆびさ】し呼称【こしょう】で 確認【かくにん】してから 行動【こうどう】します。",
        "furigana": "はい！ 指差し呼称で 確認してから 行動します。",
        "romaji": "Hai! Yubisashi koshou de kakunin shite kara koudou shimasu.",
        "idText": "Baik! Saya akan memastikan dengan tunjuk-sebut (Yubisashi Koshou) baru bertindak."
      }
    ],
    "drills": [
      {
        "id": "drill-1",
        "type": "vocab_context",
        "instruction": "Langkah 1 (Konsep Kata): Pilihlah istilah slogan keselamatan kerja terpenting di Jepang.",
        "sentencePrompt": "Slogan keselamatan nomor satu di seluruh pabrik dan lokasi konstruksi Jepang adalah:",
        "options": [
          "安全【あんぜん】第一【だいいち】 (Utamakan keselamatan)",
          "利益【りえき】第一 (Utamakan laba)",
          "能率【のうりつ】第一 (Utamakan kecepatan)",
          "遠慮【えんりょ】第一 (Utamakan rasa sungkan)"
        ],
        "correctAnswer": "安全【あんぜん】第一【だいいち】 (Utamakan keselamatan)",
        "explanation": "安全第一 (Anzen Daiichi = Safety First) adalah nilai mutlak tanpa kompromi di industri Jepang.",
        "diagnosticFeedback": {
          "利益第一 (Utamakan laba)": "Salah: Keselamatan jiwa selalu berada di atas laba bisnis.",
          "能率第一 (Utamakan kecepatan)": "Salah: Kecepatan tidak boleh mengorbankan keselamatan.",
          "遠慮第一 (Utamakan rasa sungkan)": "Salah: Dalam bahaya K3 tidak boleh sungkan melapor."
        }
      },
      {
        "id": "drill-2",
        "type": "grammar_choice",
        "instruction": "Langkah 2 (Pola Rambu Larangan Keras): Pilihlah bentuk larangan keras (Kinshikei) dari kata 触る (menyentuh).",
        "sentencePrompt": "Papan tanda bahaya listrik tegangan tinggi: \"危【あぶ】ない！ （　　）！\"",
        "options": [
          "触【さわ】るな",
          "触【さわ】りなさい",
          "触【さわ】らないで",
          "触【さわ】れ"
        ],
        "correctAnswer": "触【さわ】るな",
        "explanation": "Bentuk Larangan Keras (Kinshikei): Verba Kamus + な！ (触るな = Jangan sentuh!).",
        "diagnosticFeedback": {
          "触りなさい": "Salah: Ini adalah instruksi \"sentuhlah!\".",
          "触らないで": "Salah: Ini adalah permohonan santun, bukan rambu peringatan instan.",
          "触れ": "Salah: Ini adalah bentuk perintah \"sentuh!\"."
        }
      },
      {
        "id": "drill-3",
        "type": "particle_select",
        "instruction": "Langkah 3 (Formula Larangan Formal): Lengkapi kalimat larangan mengambil foto di area militer/pabrik rahasia.",
        "sentencePrompt": "ここで 写真【しゃしん】を 撮【と】って（　　）いけません。",
        "options": [
          "は",
          "も",
          "が",
          "を"
        ],
        "correctAnswer": "は",
        "explanation": "Pola larangan formal tertulis adalah [Verba-te] + は いけません (撮ってはいけません).",
        "diagnosticFeedback": {
          "も": "Salah: 撮ってもいい bermakna boleh mengambil foto.",
          "が": "Salah: bukan rumus tata bahasa larangan.",
          "を": "Salah: bukan partikel larangan."
        }
      },
      {
        "id": "drill-4",
        "type": "sentence_ordering",
        "instruction": "Langkah 4 (Susun Kalimat): Rangkai instruksi ibu/guru agar anak segera tidur.",
        "sentencePrompt": "Susunlah kata-kata: \"Sudah larut malam, segeralah tidur!\".",
        "tokens": [
          "もう 夜【よる】遅【おそ】いから、",
          "早【はや】く",
          "寝【ね】なさい",
          "！"
        ],
        "correctOrder": [
          0,
          1,
          2,
          3
        ],
        "options": [
          "もう 夜【よる】遅【おそ】いから、 早【はや】く 寝【ね】なさい ！",
          "早【はや】く もう 夜【よる】遅【おそ】いから、 ！ 寝【ね】なさい",
          "寝【ね】なさい もう 夜【よる】遅【おそ】いから、 早【はや】く ！",
          "！ 寝【ね】なさい 早【はや】く もう 夜【よる】遅【おそ】いから、"
        ],
        "correctAnswer": "もう 夜【よる】遅【おそ】いから、 早【はや】く 寝【ね】なさい ！",
        "explanation": "Alasan (夜遅いから) + Keterangan (早く) + Perintah terarah (寝なさい).",
        "diagnosticFeedback": {
          "早【はや】く もう 夜【よる】遅【おそ】いから、 ！ 寝【ね】なさい": "Salah urutan anak kalimat.",
          "寝【ね】なさい もう 夜【よる】遅【おそ】いから、 早【はや】く ！": "Salah posisi predikat di depan.",
          "！ 寝【ね】なさい 早【はや】く もう 夜【よる】遅【おそ】いから、": "Salah susun total."
        }
      },
      {
        "id": "drill-5",
        "type": "nuance_analysis",
        "instruction": "Langkah 5 (Analisis Nuansa): Analisislah mengapa rambu darurat memakai bentuk perintah singkat (Meireikei/Kinshikei).",
        "sentencePrompt": "Alasan rambu darurat K3 di pabrik memakai kata \"逃げろ\" (Nigero!) atau \"入るな\" (Hairu na!) adalah:",
        "options": [
          "Karena dalam detik-detik genting bahaya maut, instruksi harus dipahami dalam tempo 0,1 detik tanpa distorsi kesopanan",
          "Karena pengelola pabrik tidak menghormati pekerja",
          "Karena huruf kanjinya sudah habis dari percetakan",
          "Karena bahasa Jepang tidak memiliki kata sopan untuk api dan kebakaran"
        ],
        "correctAnswer": "Karena dalam detik-detik genting bahaya maut, instruksi harus dipahami dalam tempo 0,1 detik tanpa distorsi kesopanan",
        "explanation": "Kejelasan mutlak dan kecepatan reaksi instan adalah kunci penyelamatan jiwa dalam K3.",
        "diagnosticFeedback": {
          "Karena pengelola pabrik tidak menghormati pekerja": "Salah: Ini murni faktor keselamatan nyawa.",
          "Karena huruf kanjinya sudah habis dari percetakan": "Salah: Alasan mengada-ada.",
          "Karena bahasa Jepang tidak memiliki kata sopan untuk api dan kebakaran": "Salah: Bahasa Jepang tentu memiliki kosakata sopan."
        }
      }
    ],
    "can_do_challenge": {
      "statement": "Bisa membaca papan peringatan K3 di area konstruksi atau pabrik manufaktur.",
      "situation": "Melihat rambu bahaya di dekat panel gardu listrik tegangan tinggi bengkel.",
      "promptTask": "Bacakan dan jelaskan peringatan bahwa dilarang keras menyentuh panel itu!",
      "modelAnswer": "「触【さわ】るな」と 書【か】いて あります。危険【きけん】ですから 触【さわ】っては いけません。",
      "modelAnswerId": "Tertulis \"Jangan Sentuh!\". Karena berbahaya, kita tidak boleh menyentuhnya.",
      "culturalEtiquette": "Tunjuk rambu bahaya dengan jari telunjuk mantap tanda konfirmasi K3 (Yubisashi Koshou).",
      "skillUnlocked": [
        "Mampu membaca dan merespons rambu darurat Meireikei dan Kinshikei",
        "Menguasai penegakan aturan keselamatan kerja V-te wa ikemasen"
      ]
    },
    "pocket_summary": {
      "keyFormula": "[V-te] は いけません (larangan formal) / [V-ru] + な！ (larangan keras K3) / [V-Masu] + なさい (perintah terarah)",
      "coreWords": [
        "きけん",
        "ちゅうい",
        "さわるな",
        "ヘルメット"
      ],
      "coreWarning": "Kinshikei (V-ru + na) = peringatan bahaya maut. Jangan tertukar dengan partikel santai naa.",
      "quickDialogue": "A: あの看板は？ → B: 「入るな」と書いてあります！"
    }
  }
};
