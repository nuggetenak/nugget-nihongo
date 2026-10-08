// ══════════════════════════════════════════════════════
//  particle-engine.js — Nugget Nihongo Japanese Particle Engine
//  Dedicated Morphosyntactic & Semantic Engine for Japanese Particles (助詞)
//
//  Theoretical & Pedagogical Basis:
//    - Pillar 2: Indonesian L1 Contrastive Analysis (§5.5, Sutedi 2016, Lianna 2020)
//    - Pillar 4: Processability Theory Stage Hierarchy (Pienemann 1998, Kawaguchi 2005)
//    - Multi-sense Polysemy & Collocation Grid (格助詞・係助詞・副助詞/取立助詞・接続助詞・終助詞)
//    - Combined Particle Stacking (複合助詞・重ね助詞: には, では, への, からの, よりは, だけに, etc.)
//    - Grammaticalization Mapping (Bare particle -> JLPT N4-N1 compound patterns)
//    - Morphological Boundary Tokenizer (Guards whole words, greetings, copulas from false slicing)
//
//  Architecture v16.2.0 — October 2026
// ══════════════════════════════════════════════════════

(function () {
  'use strict';

  var root = typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this);

  // ──────────────────────────────────────────────
  // §1  SINGLE PARTICLES REGISTRY (単独助詞)
  // ──────────────────────────────────────────────

  var PARTICLES = {
    // ── は (wa) ──────────────────────────────────
    'は': {
      particle: 'は',
      romaji: 'wa',
      category: 'kakarijoshi', // 係助詞 (Binding / Topic)
      jlpt: 'n5',
      overview_id: 'Partikel penanda topik pembicaraan (tema kalimat), kontras eksplisit/implisit, dan batas toleransi minimal.',
      senses: [
        {
          sense_id: 'wa-topic',
          function_jp: '主題・トピック',
          function_id: 'Menandai topik kalimat ("Adapun / mengenai / kalau...")',
          translation_id: 'adapun / adalah / [fokus topik]',
          collocation_pattern: '[Topik/Nomina] + は + [Predikat/Komentar]',
          example: {
            jp: '私はインドネシア人です。',
            reading: 'わたしは いんどねしあじんです。',
            id: 'Saya adalah orang Indonesia.'
          },
          l1_trap: 'Di bahasa Indonesia sering diterjemahkan "adalah", namun "は" bukan kata kerja, melainkan partikel yang mengangkat nomina menjadi topik pembicaraan.'
        },
        {
          sense_id: 'wa-contrast',
          function_jp: '対比・コントラスト',
          function_id: 'Menandai perbandingan / kontras eksplisit atau implisit',
          translation_id: 'kalau [hal ini] sih...',
          collocation_pattern: '[Hal A] + は + [Positif], [Hal B] + は + [Negatif]',
          example: {
            jp: 'お酒は飲みますが、タバコは吸いません。',
            reading: 'おさけは のみますが、たばこは すいません。',
            id: 'Kalau alkohol saya minum, tetapi kalau rokok tidak merokok.'
          },
          l1_trap: 'Ketika partikel は menggantikan を atau が pada klausa negatif, itu menyiratkan kontras tersembunyi (misal: 肉は食べない = kalau daging sih tidak makan, tapi makanan lain makan).'
        },
        {
          sense_id: 'wa-minimal-quantity',
          function_jp: '取り立て最低限度',
          function_id: 'Menandai perkiraan batas kuantitas minimum ("setidaknya / paling sedikit")',
          translation_id: 'setidaknya / minimal',
          collocation_pattern: '[Kuantitas/Waktu] + は + [Verba]',
          example: {
            jp: '毎日1時間は日本語を勉強します。',
            reading: 'まいにち いちじかんは にほんごを べんきょうします。',
            id: 'Setiap hari setidaknya 1 jam belajar bahasa Jepang.'
          },
          l1_trap: 'Angka yang langsung diikuti は berarti estimasi minimum pembicara.'
        }
      ]
    },

    // ── が (ga) ──────────────────────────────────
    'が': {
      particle: 'が',
      romaji: 'ga',
      category: 'kakujoshi', // 格助詞 (Case) & 接続助詞 (Conjunctive)
      jlpt: 'n5',
      overview_id: 'Partikel penanda subjek gramatikal, fenomena baru/spontan, objek kemampuan/kesukaan, dan konjungsi pertentangan (tetapi).',
      senses: [
        {
          sense_id: 'ga-subject',
          function_jp: '文法的主語・現象描写',
          function_id: 'Menandai subjek pelaku tindakan gramatikal atau penampakan fenomena baru',
          translation_id: '[subjek pelaku / yang]',
          collocation_pattern: '[Subjek/Fenomena] + が + [Verba / Adjektiva]',
          example: {
            jp: '雨が降っています。あ、あそこに猫がいます！',
            reading: 'あめが ふっています。あ、あそこに ねこが います！',
            id: 'Hujan sedang turun. Ah, di sebelah sana ada kucing!'
          },
          l1_trap: 'Gunakan が (bukan は) ketika melaporkan peristiwa yang baru saja tertangkap oleh panca indra di depan mata.'
        },
        {
          sense_id: 'ga-affective-object',
          function_jp: '対象（能力・好悪・希望）',
          function_id: 'Menandai objek rasa suka/benci, kemampuan verba potensial, kepemilikan, atau keinginan',
          translation_id: '[objek rasa / kemampuan / keinginan]',
          collocation_pattern: '[Nomina] + が + [できる / 分かる / 好き / 嫌い / 欲しい / 上手 / 下手]',
          example: {
            jp: '私は日本語が話せます。刺身が好きです。',
            reading: 'わたしは にほんごが はなせます。さしみが すきです。',
            id: 'Saya bisa berbicara bahasa Jepang. Saya suka sashimi.'
          },
          l1_trap: 'Di bahasa Indonesia orang berkata "bisa bahasa Jepang" (seperti objek penderita を), namun bahasa Jepang standar mewajibkan が (日本語が話せる).'
        },
        {
          sense_id: 'ga-conjunction',
          function_jp: '接続助詞（逆接・前置き）',
          function_id: 'Konjungsi penghubung klausa yang bermakna pertentangan ("tetapi") atau pengantar sopan',
          translation_id: 'tetapi / namun / ngomong-ngomong',
          collocation_pattern: '[Klausa 1] + が、+ [Klausa 2]',
          example: {
            jp: '高いですが、とても美味しいです。すみませんが、駅はどこですか？',
            reading: 'たかいですが、とても おいしいです。すみませんが、えきは どこですか？',
            id: 'Mahal, tetapi sangat enak. Permisi, stasiun ada di sebelah mana?'
          },
          l1_trap: 'が di tengah kalimat berfungsi sebagai konjungsi "tetapi", bukan partikel kasus subjek.'
        }
      ]
    },

    // ── を (o / wo) ───────────────────────────────
    'を': {
      particle: 'を',
      romaji: 'o',
      category: 'kakujoshi', // 格助詞 (Accusative)
      jlpt: 'n5',
      overview_id: 'Partikel penanda objek penderita langsung (akusatif), lintasan medium gerak, dan titik pelepasan/keluar.',
      senses: [
        {
          sense_id: 'o-direct-object',
          function_jp: '動作の直接対象',
          function_id: 'Menandai sasaran objek penderita langsung dari verba transitif',
          translation_id: '[objek penderita]',
          collocation_pattern: '[Nomina Objek] + を + [Verba Transitif]',
          example: {
            jp: '毎日水を飲みます。本を読みました。',
            reading: 'まいにち みずを のみます。ほんを よみました。',
            id: 'Setiap hari minum air. Sudah membaca buku.'
          },
          l1_trap: 'Hanya digunakan bersama verba transitif (他動詞). Verba intransitif tidak menggunakan を.'
        },
        {
          sense_id: 'o-passage-motion',
          function_jp: '移動の通過点・空間',
          function_id: 'Menandai ruang, jalur, medium, atau rute yang dilintasi verba gerak',
          translation_id: 'melintasi / di sepanjang / menyeberangi',
          collocation_pattern: '[Jalur/Langit/Taman] + を + [歩く / 走る / 飛ぶ / 渡る / 散歩する]',
          example: {
            jp: '鳥が空を飛んでいます。公園を散歩しましょう。',
            reading: 'とりが そらを とんでいます。こうえんを さんぽしましょう。',
            id: 'Burung terbang melintasi langit. Mari berjalan-jalan di taman.'
          },
          l1_trap: 'Orang Indonesia sering tergoda memakai で (*taman de jalan-jalan), padahal untuk verba gerak yang melintasi area wajib memakai を.'
        },
        {
          sense_id: 'o-detachment-exit',
          function_jp: '離脱点・出発点',
          function_id: 'Menandai titik pelepasan, keberangkatan, atau tempat keluar/turun',
          translation_id: 'turun dari / keluar dari / lulus dari',
          collocation_pattern: '[Kendaraan/Ruangan/Institusi] + を + [降りる / 出る / 卒業する]',
          example: {
            jp: '次の駅で電車を降ります。大学を卒業しました。',
            reading: 'つぎの えきで でんしゃを おります。だいがくを そつぎょうしました。',
            id: 'Turun dari kereta di stasiun berikutnya. Sudah lulus dari universitas.'
          },
          l1_trap: 'Bahasa Indonesia memakai "dari" (*turun dari kereta, *lulus dari kampus). Jangan pakai から! Untuk ruang yang ditinggalkan, bahasa Jepang memakai を.'
        }
      ]
    },

    // ── に (ni) ──────────────────────────────────
    'に': {
      particle: 'に',
      romaji: 'ni',
      category: 'kakujoshi', // 格助詞 (Case: Dative / Locative)
      jlpt: 'n5',
      overview_id: 'Partikel penanda titik waktu spesifik, lokasi keberadaan diam, target kedatangan, penerima tindakan, pelaku pasif, dan tujuan gerak.',
      senses: [
        {
          sense_id: 'ni-time-point',
          function_jp: '特定の時点',
          function_id: 'Titik waktu spesifik yang memiliki angka / patokan pasti',
          translation_id: 'pada / pukul',
          collocation_pattern: '[Jam / Tanggal / Hari] + に + [Tindakan]',
          example: {
            jp: '毎朝7時に起きます。日曜日に買い物へ行きます。',
            reading: 'まいあさ しちじに おきます。にちようびに かいものへ いきます。',
            id: 'Setiap pagi bangun pada pukul 7. Pergi belanja pada hari Minggu.'
          },
          l1_trap: 'Waktu relatif (今日, 明日, 毎日, 来週, 去年) TIDAK BOLEH diikuti partikel に!'
        },
        {
          sense_id: 'ni-existence',
          function_jp: '存在の場所・定着点',
          function_id: 'Lokasi keberadaan benda/orang (bersama verba diam / eksistensi)',
          translation_id: 'di / menetap di',
          collocation_pattern: '[Tempat] + に + [ある / いる / 住む / 泊まる / 座る / 置く]',
          example: {
            jp: '机の上に本があります。私はバリ島に住んでいます。',
            reading: 'つくえの うえに ほんが あります。わたしは ばりとうに すんでいます。',
            id: 'Di atas meja ada buku. Saya tinggal di pulau Bali.'
          },
          l1_trap: 'KESALAHAN UTAMA PENUTUR INDONESIA: Menggunakan で untuk lokasi tinggal (*バリ島で住んでいます). Jika verbanya 住む, ある, いる, 泊まる, WAJIB に!'
        },
        {
          sense_id: 'ni-destination',
          function_jp: '移動の着地点・帰着点',
          function_id: 'Titik target kedatangan / destinasi akhir pergerakan',
          translation_id: 'ke / tiba di / naik ke',
          collocation_pattern: '[Tempat Tujuan] + に + [行く / 来る / 帰る / 着く / 入る / 乗る]',
          example: {
            jp: '来月日本に行きます。午後3時に東京に着きます。電車に乗ります。',
            reading: 'らいげつ にほんに いきます。ごご さんじに とうきょうに つきます。でんしゃに のります。',
            id: 'Bulan depan akan pergi ke Jepang. Tiba di Tokyo pukul 3 sore. Naik kereta.'
          },
          l1_trap: 'Naik kendaraan menggunakan に, bukan を (misal: 電車に乗る = naik kereta).'
        },
        {
          sense_id: 'ni-recipient',
          function_jp: '動作の相手・受取人',
          function_id: 'Penerima tindakan / target interaksi satu arah',
          translation_id: 'kepada / ke',
          collocation_pattern: '[Penerima] + に + [あげる / 渡す / 貸す / 教える / 電話する]',
          example: {
            jp: '友達に誕生日プレゼントをあげました。',
            reading: 'ともだちに たんじょうび ぷれぜんとを あげました。',
            id: 'Memberikan hadiah ulang tahun kepada teman.'
          },
          l1_trap: 'Dalam interaksi satu arah (memberi, mengajar, menelepon), lawan interaksi ditandai dengan に.'
        },
        {
          sense_id: 'ni-purpose',
          function_jp: '移動の目的',
          function_id: 'Tujuan pergerakan (diikuti verba pergi/datang/pulang)',
          translation_id: 'untuk [melakukan]',
          collocation_pattern: '[Verba Masu-stem / Nomina Aksi] + に + [行く / 来る / 帰る]',
          example: {
            jp: 'デパートへ服を買いに行きます。日本へ勉強に来ました。',
            reading: 'でぱーとへ ふくを かいに いきます。にほんへ べんきょうに きました。',
            id: 'Pergi ke department store untuk membeli pakaian. Datang ke Jepang untuk belajar.'
          },
          l1_trap: 'Verba sebelum に wajib dipotong bentuk ます-nya (misal: 買いに行く, bukan *買うに行く).'
        },
        {
          sense_id: 'ni-passive-agent',
          function_jp: '受動態・使役態の動作主',
          function_id: 'Pelaku tindakan dalam kalimat pasif atau yang disuruh dalam kalimat kausatif',
          translation_id: 'oleh [pelaku]',
          collocation_pattern: '[Pelaku] + に + [Verba Pasif / Kausatif]',
          example: {
            jp: '先生に褒められました。母に買い物を頼まれました。',
            reading: 'せんせいに ほめられました。ははに かいものを たのまれました。',
            id: 'Dipuji oleh guru. Dimintai tolong belanja oleh ibu.'
          },
          l1_trap: 'Di bahasa Indonesia memakai kata "oleh". Dalam bahasa Jepang padanannya adalah に.'
        },
        {
          sense_id: 'ni-transformation',
          function_jp: '変化の結果',
          function_id: 'Hasil perubahan keadaan / status / keputusan',
          translation_id: 'menjadi',
          collocation_pattern: '[Status/Kondisi] + に + [なる / する / 決める]',
          example: {
            jp: '将来、医者になりたいです。コーヒーにします。',
            reading: 'しょうらい、いしゃに なりたいです。こーひーに します。',
            id: 'Kelak ingin menjadi dokter. Saya memutuskan pesan kopi.'
          },
          l1_trap: 'Untuk kata benda dan na-adjektiva, perubahan status menggunakan になる (misal: 元気になる).'
        },
        {
          sense_id: 'ni-rate',
          function_jp: '割合・頻度の基準',
          function_id: 'Satuan frekuensi / rasio dalam kurun waktu tertentu',
          translation_id: 'dalam [kurun waktu]',
          collocation_pattern: '[Kurun Waktu] + に + [Frekuensi] + 回',
          example: {
            jp: 'この薬は1日に3回飲んでください。',
            reading: 'この くすりは いちにちに さんかい のんでください。',
            id: 'Obat ini tolong diminum 3 kali dalam sehari.'
          },
          l1_trap: 'Partikel に dipakai setelah kurun waktu dasar (1日に = dalam sehari, 1週間に = dalam seminggu).'
        }
      ]
    },

    // ── で (de) ──────────────────────────────────
    'で': {
      particle: 'で',
      romaji: 'de',
      category: 'kakujoshi', // 格助詞 (Case: Instrumental / Locative of Action)
      jlpt: 'n5',
      overview_id: 'Partikel penanda tempat berlangsungnya aksi aktif dinamis, alat/sarana, penyebab, bahan, dan batasan totalitas.',
      senses: [
        {
          sense_id: 'de-location-action',
          function_jp: '動作・活動の場所',
          function_id: 'Lokasi tempat terjadinya aktivitas aktif dinamis',
          translation_id: 'di [tempat beraktivitas]',
          collocation_pattern: '[Tempat] + で + [Verba Aksi Aktif]',
          example: {
            jp: '図書館で静かに勉強します。レストランでご飯を食べました。',
            reading: 'としょかんで しずかに べんきょうします。れすとらんで ごはんを たべました。',
            id: 'Belajar dengan tenang di perpustakaan. Makan di restoran.'
          },
          l1_trap: 'Jika ada aktivitas dinamis (makan, belajar, olahraga, kerja, beli), gunakan で, bukan に!'
        },
        {
          sense_id: 'de-means-instrument',
          function_jp: '手段・道具・交通機関・言語',
          function_id: 'Alat, instrumen, kendaraan sarana, atau bahasa komunikasi',
          translation_id: 'dengan / menggunakan / naik',
          collocation_pattern: '[Alat/Kendaraan/Bahasa] + で + [Verba]',
          example: {
            jp: '箸でラーメンを食べます。電車で会社へ通います。日本語で話しましょう。',
            reading: 'はしで らーめんを たべます。でんしゃで かいしゃへ かよいます。にほんごで はなしましょう。',
            id: 'Makan ramen dengan sumpit. Pergi ke kantor naik kereta. Mari bicara dalam bahasa Jepang.'
          },
          l1_trap: 'Penutur Indonesia kerap lupa menandai bahasa komunikasi dengan で (日本語で = dalam bahasa Jepang).'
        },
        {
          sense_id: 'de-cause-reason',
          function_jp: '原因・理由',
          function_id: 'Penyebab peristiwa atau alasan kejadian alami di luar kendali',
          translation_id: 'karena / akibat',
          collocation_pattern: '[Kondisi/Bencana/Penyakit] + で + [Hasil]',
          example: {
            jp: '風邪で学校を休みました。大雨で電車が止まりました。',
            reading: 'かぜで がっこうを やすみました。おおあめで でんしゃが とまりました。',
            id: 'Libur sekolah karena flu. Kereta berhenti akibat hujan lebat.'
          },
          l1_trap: 'Penyebab yang ditandai で umumnya berupa nomina fenomena alam/penyakit yang tidak disengaja.'
        },
        {
          sense_id: 'de-material',
          function_jp: '材料（外見で分かるもの）',
          function_id: 'Bahan baku fisik yang wujud aslinya masih tampak terlihat jelas',
          translation_id: 'dari [bahan fisik]',
          collocation_pattern: '[Bahan] + で + 作る/できる',
          example: {
            jp: 'この机は木で作られています。',
            reading: 'この つくえは きで つくられています。',
            id: 'Meja ini dibuat dari kayu.'
          },
          l1_trap: 'Jika bahan baku masih tampak bentuknya gunakan で; jika melalui proses kimiawi/berubah wujud total gunakan から.'
        },
        {
          sense_id: 'de-total-limit',
          function_jp: '合計・限定・期限',
          function_id: 'Batasan totalitas jumlah, rentang waktu, atau kuantitas penyelesaian',
          translation_id: 'dengan total / dalam kurun',
          collocation_pattern: '[Jumlah/Waktu] + で',
          example: {
            jp: '全部で千円です。1時間で宿題を終わらせました。',
            reading: 'ぜんぶで せんえんです。いちじかんで しゅくだいを おわらせました。',
            id: 'Total semuanya seribu yen. Menyelesaikan PR dalam 1 jam.'
          },
          l1_trap: 'Kata 全部で atau 一人で menggunakan で untuk menandai status keutuhan/kondisi pelaku.'
        }
      ]
    },

    // ── へ (e / he) ──────────────────────────────
    'へ': {
      particle: 'へ',
      romaji: 'e',
      category: 'kakujoshi', // 格助詞 (Directional)
      jlpt: 'n5',
      overview_id: 'Partikel penanda arah orientasi pergerakan menuju suatu destinasi (fokus pada proses perjalanan).',
      senses: [
        {
          sense_id: 'he-direction',
          function_jp: '移動の方向性・志向性',
          function_id: 'Arah orientasi tujuan perjalanan (fokus pada proses mengarah)',
          translation_id: 'ke / menuju ke',
          collocation_pattern: '[Arah/Tujuan] + へ + [行く / 来る / 帰る / 向かう]',
          example: {
            jp: '明日、東京へ行きます。西へ向かって進んでください。',
            reading: 'あした、とうきょうへ いきます。にしへ むかって すすんでください。',
            id: 'Besok akan pergi ke Tokyo. Tolong maju mengarah ke barat.'
          },
          l1_trap: 'Huruf "へ" dibaca "e" saat berfungsi sebagai partikel. Lebih bernuansa sastrawi atau fokus ke proses arah.'
        },
        {
          sense_id: 'he-adnominal-target',
          function_jp: 'への（名詞修飾）',
          function_id: 'Menggabungkan partikel arah dengan の untuk menerangkan kata benda berikutnya',
          translation_id: 'untuk / kepada [penerima]',
          collocation_pattern: '[Penerima/Tujuan] + への + [Nomina]',
          example: {
            jp: '母への手紙を書きました。未来への希望。',
            reading: 'ははへの てがみを かきました。みらいへの きぼう。',
            id: 'Menulis surat untuk ibu. Harapan menuju masa depan.'
          },
          l1_trap: 'Partikel に tidak bisa digabung dengan の (*にの tidak ada), tetapi へ bisa menjadi への.'
        }
      ]
    },

    // ── と (to) ──────────────────────────────────
    'と': {
      particle: 'と',
      romaji: 'to',
      category: 'kakujoshi', // 格助詞 (Case) & 接続助詞 (Conjunctive)
      jlpt: 'n5',
      overview_id: 'Partikel penanda penggabungan setara, mitra tindakan bersama, isi kutipan, perbandingan, dan syarat mutlak alami.',
      senses: [
        {
          sense_id: 'to-exhaustive-list',
          function_jp: '完全列挙（名詞と名詞の結合）',
          function_id: 'Menghubungkan kata benda secara lengkap tuntas tanpa ada yang terlewat',
          translation_id: 'dan [semuanya]',
          collocation_pattern: '[Nomina A] + と + [Nomina B]',
          example: {
            jp: '机の上に本とペンがあります。',
            reading: 'つくえの うえに ほんと ぺんが あります。',
            id: 'Di atas meja ada buku dan pena (hanya 2 benda itu saja).'
          },
          l1_trap: 'Jika hanya menyebutkan sebagian contoh dari banyak benda, jangan gunakan と; gunakan や (ya).'
        },
        {
          sense_id: 'to-partner-mutual',
          function_jp: '相互的動作の相手',
          function_id: 'Mitra interaksi timbal balik (bersama-sama)',
          translation_id: 'dengan / bersama',
          collocation_pattern: '[Mitra] + と + [会う / 話す / 結婚する / けんかする / 相談する]',
          example: {
            jp: '昨日、友達と映画を見ました。彼と結婚します。',
            reading: 'きのう、ともだちと えいがを みました。かれと けっこんします。',
            id: 'Kemarin menonton film bersama teman. Akan menikah dengan dia.'
          },
          l1_trap: 'Verba yang membutuhkan interaksi dua arah setara (menikah, bertengkar, diskusi) wajib memakai と.'
        },
        {
          sense_id: 'to-quotation-target',
          function_jp: '引用・思考の内容',
          function_id: 'Menandai isi ucapan, pemikiran, atau penamaan',
          translation_id: 'bahwa / berkata "..." / mengira',
          collocation_pattern: '[Isi Ucapan/Pikiran] + と + [言う / 思う / 考える / 書く]',
          example: {
            jp: '田中さんは「明日行く」と言いました。日本は美しいと思います。',
            reading: 'たなかさんは「あしたいく」と いいました。にほんは うつくしいと おもいます。',
            id: 'Tanaka berkata "besok akan pergi". Saya pikir Jepang itu indah.'
          },
          l1_trap: 'Semua klausa opini (~と思います) wajib ditandai dengan partikel と.'
        },
        {
          sense_id: 'to-condition-natural',
          function_jp: '確定条件・自然現象',
          function_id: 'Syarat alami / kepastian mutlak ("jika A, pasti otomatis terjadi B")',
          translation_id: 'jika / begitu [kondisi]',
          collocation_pattern: '[Klausa Kamus] + と、+ [Akibat Otomatis]',
          example: {
            jp: '春になると、桜が咲きます。ボタンを押すと、水が出ます。',
            reading: 'はるになると、さくらが さきます。ぼたんを おすと、みずが でます。',
            id: 'Begitu musim semi tiba, sakura pasti mekar. Jika menekan tombol ini, air akan keluar.'
          },
          l1_trap: 'Klausa setelah と tidak boleh berisi perintah, ajakan, atau permohonan pembicara.'
        }
      ]
    },

    // ── から (kara) ──────────────────────────────
    'から': {
      particle: 'から',
      romaji: 'kara',
      category: 'kakujoshi', // 格助詞 (Case) & 接続助詞 (Conjunctive)
      jlpt: 'n5',
      overview_id: 'Partikel penanda titik awal waktu/ruang, bahan baku proses transformasi, dan alasan/sebab subjektif.',
      senses: [
        {
          sense_id: 'kara-spatial-origin',
          function_jp: '空間の起点・出発点',
          function_id: 'Titik awal keberangkatan atau asal suatu objek',
          translation_id: 'dari [tempat]',
          collocation_pattern: '[Tempat Awal] + から + [Pergerakan]',
          example: {
            jp: '駅から家まで歩いて帰りました。インドネシアから来ました。',
            reading: 'えきから いえまで あるいて かえりました。いんどねしあから きました。',
            id: 'Pulang berjalan kaki dari stasiun sampai ke rumah. Datang dari Indonesia.'
          },
          l1_trap: 'Sering berpasangan dengan まで (AからBまで = dari A hingga B).'
        },
        {
          sense_id: 'kara-temporal-origin',
          function_jp: '時間の始まり',
          function_id: 'Titik dimulainya suatu periode waktu atau kegiatan',
          translation_id: 'mulai dari / sejak [waktu]',
          collocation_pattern: '[Waktu/Jam] + から + [Aktivitas]',
          example: {
            jp: '会議は朝9時から始まります。',
            reading: 'かいぎは あさ くじから はじまります。',
            id: 'Rapat dimulai sejak pukul 9 pagi.'
          },
          l1_trap: 'Bisa berdiri sendiri tanpa まで jika hanya ingin menegaskan titik mula (misal: 明日から頑張る).'
        },
        {
          sense_id: 'kara-reason-subjective',
          function_jp: '主観的な理由・原因',
          function_id: 'Alasan subjektif dari sudut pandang pembicara (cocok untuk ajakan/perintah)',
          translation_id: 'karena / oleh sebab itu',
          collocation_pattern: '[Alasan] + から、+ [Tindakan/Ajakan]',
          example: {
            jp: '危ないですから、触らないでください。時間がありませんから、急ぎましょう。',
            reading: 'あぶないですから、さわらないでください。じかんが ありませんから、いそぎましょう。',
            id: 'Karena berbahaya, tolong jangan sentuh. Karena tidak ada waktu, ayo bergegas.'
          },
          l1_trap: 'Karena bersifat subjektif, から boleh diikuti perintah/ajakan (~てください, ~ましょう), sedangkan ので tidak boleh.'
        }
      ]
    },

    // ── まで (made) ──────────────────────────────
    'まで': {
      particle: 'まで',
      romaji: 'made',
      category: 'kakujoshi', // 副助詞 / 格助詞
      jlpt: 'n5',
      overview_id: 'Partikel penanda batas akhir ruang/waktu yang terus berlanjut hingga titik batas, atau derajat ekstrem yang mengejutkan.',
      senses: [
        {
          sense_id: 'made-spatial-limit',
          function_jp: '空間の終点・限界',
          function_id: 'Batas akhir titik jarak pergerakan',
          translation_id: 'sampai / hingga [tempat]',
          collocation_pattern: '[Tujuan Akhir] + まで',
          example: {
            jp: '駅まで走りました。',
            reading: 'えきまで はしりました。',
            id: 'Berlari sampai ke stasiun.'
          },
          l1_trap: 'Hati-hati perbedaan まで (sampai/selama) vs までに (paling lambat sebelum/deadline).'
        },
        {
          sense_id: 'made-temporal-limit',
          function_jp: '時間の継続の終点',
          function_id: 'Batas akhir kelangsungan waktu aktivitas yang terus berlanjut secara kontinu',
          translation_id: 'sampai / hingga [waktu]',
          collocation_pattern: '[Waktu] + まで + [Verba Kontinu: 勉強する / 待つ / 働く]',
          example: {
            jp: '午後5時まで図書館で勉強します。',
            reading: 'ごご ごじまで としょかんで べんきょうします。',
            id: 'Belajar di perpustakaan terus menerus hingga pukul 5 sore.'
          },
          l1_trap: 'Verba sebelum まで harus berupa aksi yang berdurasi panjang/kontinu (menunggu, bekerja, tidur).'
        },
        {
          sense_id: 'made-extreme-extent',
          function_jp: '極限・意外な展開',
          function_id: 'Menandai hal mengejutkan yang bahkan sampai tersentuh ("sampai-sampai / bahkan")',
          translation_id: 'bahkan sampai',
          collocation_pattern: '[Subjek/Hal Mengejutkan] + まで + [Predikat]',
          example: {
            jp: '親友にまで裏切られた。',
            reading: 'しんゆうにまで うらぎられた。',
            id: 'Bahkan sampai dikhianati oleh sahabat dekat sendiri.'
          },
          l1_trap: 'Nuansanya mirip dengan さえ, menyatakan derajat yang melampaui batas wajar.'
        }
      ]
    },

    // ── より (yori) ──────────────────────────────
    'より': {
      particle: 'より',
      romaji: 'yori',
      category: 'kakujoshi', // 格助詞 (Comparison & Origin)
      jlpt: 'n5',
      overview_id: 'Partikel penanda tolok ukur perbandingan ("daripada"), titik asal formal/tertulis, dan keterbatasan ("tidak ada selain").',
      senses: [
        {
          sense_id: 'yori-comparison-standard',
          function_jp: '比較の基準',
          function_id: 'Menandai patokan yang dibandingkan dalam kalimat komparatif',
          translation_id: 'daripada / dibandingkan dengan',
          collocation_pattern: '[Objek Patokan] + より + [Objek Utama] + のほうが + [Sifat]',
          example: {
            jp: '飛行機は新幹線より速いです。',
            reading: 'ひこうきは しんかんせんより はやいです。',
            id: 'Pesawat lebih cepat daripada kereta Shinkansen.'
          },
          l1_trap: 'Objek yang menempel pada より adalah yang posisinya "kalah" atau menjadi pembanding.'
        },
        {
          sense_id: 'yori-origin-formal',
          function_jp: '起点（書き言葉・改まった表現）',
          function_id: 'Titik asal mula dalam ragam tulis formal atau pengumuman resmi',
          translation_id: 'dari [ragam resmi]',
          collocation_pattern: '[Stasiun/Pihak] + より',
          example: {
            jp: '東京駅より発車いたします。主催者よりご案内申し上げます。',
            reading: 'とうきょうえきより はっしゃ いたします。しゅさいしゃより ごあんない もうしあげます。',
            id: 'Berangkat dari stasiun Tokyo. Pemberitahuan dari pihak penyelenggara.'
          },
          l1_trap: 'Dalam percakapan kasual gunakan から, より di sini hanya dipakai dalam pengumuman dinas/resmi.'
        },
        {
          sense_id: 'yori-limitation',
          function_jp: '〜よりほかない（限定）',
          function_id: 'Pola ketetapan bahwa tidak ada pilihan lain yang tersisa selain melakukan hal itu',
          translation_id: 'hanya bisa / tidak ada jalan lain selain',
          collocation_pattern: '[Verba Kamus] + よりほかない / よりない',
          example: {
            jp: 'バスがないので、歩いて行くよりほかない。',
            reading: 'ばすが ないので、あるいて いくより ほかない。',
            id: 'Karena tidak ada bus, tidak ada jalan lain selain berjalan kaki.'
          },
          l1_trap: 'Menyatakan kepasrahan karena ketiadaan opsi lain.'
        }
      ]
    },

    // ── も (mo) ──────────────────────────────────
    'も': {
      particle: 'も',
      romaji: 'mo',
      category: 'kakarijoshi', // 係助詞 (Binding / Inclusive)
      jlpt: 'n5',
      overview_id: 'Partikel penanda kesamaan/inklusi ("juga"), penegasan jumlah yang fantastis ("sampai-sampai"), dan paralelisme negatif ganda.',
      senses: [
        {
          sense_id: 'mo-additive',
          function_jp: '同類の追加・包括',
          function_id: 'Menyatakan bahwa predikat yang sama juga berlaku untuk subjek/objek lain',
          translation_id: 'juga / pun',
          collocation_pattern: '[Nomina] + も + [Predikat Sama]',
          example: {
            jp: '私も日本人ではありません。',
            reading: 'わたしも にほんじんでは ありません。',
            id: 'Saya juga bukan orang Jepang.'
          },
          l1_trap: 'Ketika menggunakan も, partikel は, が, dan を biasanya lebur dan digantikan langsung oleh も.'
        },
        {
          sense_id: 'mo-extreme-quantity',
          function_jp: '数量の多さの強調',
          function_id: 'Menegaskan bahwa suatu kuantitas sangat banyak di luar perkiraan',
          translation_id: 'sampai / hingga sebanyak',
          collocation_pattern: '[Kuantitas Besar] + も + [Verba Afirmatif]',
          example: {
            jp: '昨日は10時間も寝ました。ビールを5杯も飲んだ。',
            reading: 'きのうは じゅうじかんも ねました。びーるを ごはいも のんだ。',
            id: 'Kemarin saya tidur sampai 10 jam lamanya! Minum bir sampai 5 gelas!'
          },
          l1_trap: 'Jika kuantitas diikuti も, pembicara merasa angka tersebut sangat besar/banyak.'
        },
        {
          sense_id: 'mo-neither-nor',
          function_jp: '並立全否定',
          function_id: 'Menolak kedua belah pihak secara bersamaan ("baik A maupun B tidak...")',
          translation_id: 'baik ... maupun ... tidak',
          collocation_pattern: '[Nomina A] + も + [Nomina B] + も + [Negatif]',
          example: {
            jp: '肉も魚も食べません。',
            reading: 'にくも さかなも たべません。',
            id: 'Baik daging maupun ikan tidak saya makan.'
          },
          l1_trap: 'Pola ini mutlak berpasangan dengan predikat negatif di ujung kalimat.'
        }
      ]
    },

    // ── の (no) ──────────────────────────────────
    'の': {
      particle: 'の',
      romaji: 'no',
      category: 'kakujoshi', // 格助詞 (Genitive / Nominalizer)
      jlpt: 'n5',
      overview_id: 'Partikel penanda kepemilikan, modifikasi kata benda, penominasi klausa verba, dan partikel penjelas emosional.',
      senses: [
        {
          sense_id: 'no-possessive',
          function_jp: '所有・所属・属性',
          function_id: 'Menghubungkan dua kata benda untuk menandai pemilik, institusi, atau sifat',
          translation_id: 'milik / bagian dari / tentang',
          collocation_pattern: '[Nomina Pemilik/Atribut] + の + [Nomina Objek]',
          example: {
            jp: 'これは私の本です。日本の車。日本語の先生。',
            reading: 'これは わたしの ほん実す。にほんの くるま。にほんごの せんせい。',
            id: 'Ini adalah buku milik saya. Mobil Jepang. Guru bahasa Jepang.'
          },
          l1_trap: 'Di bahasa Jepang, kata benda penerang WAJIB di depan (misal: "guru bahasa Jepang" = 日本語の先生, bukan 先生の日本語).'
        },
        {
          sense_id: 'no-nominalization',
          function_jp: '動詞の準体言化（名詞化）',
          function_id: 'Mengubah kata kerja bentuk biasa menjadi kata benda yang bisa diberi partikel kasus',
          translation_id: 'hal / kegiatan [melakukan]',
          collocation_pattern: '[Verba Kamus] + のが + [好き / 得意 / 下手] / のを + [忘れる]',
          example: {
            jp: '私は音楽を聴くのが好きです。鍵をかけるのを忘れました。',
            reading: 'わたしは おんがくを きくのが すきです。かぎを かけるのを わすれました。',
            id: 'Saya suka mendengarkan musik. Lupa mengunci pintu.'
          },
          l1_trap: 'Verba tidak bisa langsung ditempel partikel が atau を (*聴くが好き salah). Wajib dinominasikan dengan の (聴くのが好き).'
        },
        {
          sense_id: 'no-pronoun-substitute',
          function_jp: '代名詞的用法',
          function_id: 'Menggantikan kata benda yang sudah disebutkan agar tidak berulang ("yang...")',
          translation_id: 'yang [berkriteria]',
          collocation_pattern: '[Adjektiva / Nomina の] + の',
          example: {
            jp: '赤い靴より、黒いのが欲しいです。',
            reading: 'あかいくつのより、くろいのが ほしいです。',
            id: 'Daripada sepatu merah, saya ingin yang hitam.'
          },
          l1_trap: '"の" di sini berfungsi seperti kata "one" dalam bahasa Inggris (the black one).'
        },
        {
          sense_id: 'no-explanatory',
          function_jp: '説明・理由の提示（〜のだ・〜んだ）',
          function_id: 'Meminta atau memberikan penjelasan konteks / latar belakang emosional',
          translation_id: 'sebenarnya karena / lho / kok',
          collocation_pattern: '[Bentuk Biasa] + のです / んだ / の？',
          example: {
            jp: 'どうして遅刻したの？ 実は電車が止まったんです。',
            reading: 'どうして ちこくしたの？ じつは でんしゃが とまったんです。',
            id: 'Kenapa kamu terlambat? Sebenarnya karena keretanya berhenti.'
          },
          l1_trap: 'Bukan sekadar menyatakan fakta polos, tetapi memberi penjelasan yang dicari lawan bicara.'
        }
      ]
    },

    // ── か (ka) ──────────────────────────────────
    'か': {
      particle: 'か',
      romaji: 'ka',
      category: 'shujoshi', // 終助詞 (Sentence-ending) & 副助詞 (Alternative)
      jlpt: 'n5',
      overview_id: 'Partikel penanda kalimat tanya (interogatif), pilihan alternatif ("atau"), dan kata ganti tak tentu.',
      senses: [
        {
          sense_id: 'ka-question',
          function_jp: '疑問・質問',
          function_id: 'Mengubah kalimat pernyataan menjadi kalimat tanya resmi',
          translation_id: 'apakah / kah?',
          collocation_pattern: '[Predikat Sopan / Biasa] + か',
          example: {
            jp: 'これはあなたの傘ですか？',
            reading: 'これは あなたの かさですか？',
            id: 'Apakah ini payung milik Anda?'
          },
          l1_trap: 'Dalam bahasa Jepang formal, tanda tanya "?" tidak wajib jika sudah diakhiri か, cukup tanda titik "。".'
        },
        {
          sense_id: 'ka-indefinite',
          function_jp: '不特定・不定称',
          function_id: 'Menempel pada kata tanya untuk membentuk makna tak tentu ("suatu / seseorang / sesuatu")',
          translation_id: 'suatu ... / seseorang / sesuatu',
          collocation_pattern: '[誰 / 何 / どこ / いつ] + か',
          example: {
            jp: '教室に誰かいますか？ 何か食べたいです。',
            reading: 'きょうしつに だれか いますか？ なにか たべたいです。',
            id: 'Apakah ada seseorang di dalam kelas? Saya ingin makan sesuatu.'
          },
          l1_trap: '誰か (seseorang) berbeda dengan 誰も (siapa pun). 誰か digunakan dalam kalimat tanya/positif.'
        },
        {
          sense_id: 'ka-alternative',
          function_jp: '選択',
          function_id: 'Memilih salah satu di antara dua opsi atau lebih',
          translation_id: 'atau',
          collocation_pattern: '[Pilihan A] + か + [Pilihan B]',
          example: {
            jp: 'コーヒーか紅茶のどちらがいいですか？',
            reading: 'こーひーか こうちゃの どちらが いいですか？',
            id: 'Mau kopi atau teh?'
          },
          l1_trap: 'Dalam menghubungkan kata benda sebagai pilihan, gunakan か, bukan または (terlalu formal).'
        }
      ]
    },

    // ── や (ya) ──────────────────────────────────
    'や': {
      particle: 'や',
      romaji: 'ya',
      category: 'heiritsujoshi', // 並立助詞 (Parallel)
      jlpt: 'n5',
      overview_id: 'Partikel penanda daftar sebagian (non-lengkap) dari sekumpulan kata benda ("dan lain-lain").',
      senses: [
        {
          sense_id: 'ya-non-exhaustive',
          function_jp: '不完全列挙・例示',
          function_id: 'Menyebutkan 2 atau 3 contoh perwakilan dari kelompok benda yang banyak',
          translation_id: 'dan [antara lain] / seperti ... dan ...',
          collocation_pattern: '[Nomina A] + や + [Nomina B] + （など）',
          example: {
            jp: '机の上に本やペンなどがあります。',
            reading: 'つくえの うえに ほんや ぺんなどが あります。',
            id: 'Di atas meja ada buku, pena, dan benda-benda lainnya.'
          },
          l1_trap: 'Gunakan や jika masih ada benda lain yang tidak disebutkan; gunakan と jika hanya ada benda itu saja.'
        }
      ]
    },

    // ── だけ (dake) ──────────────────────────────
    'だけ': {
      particle: 'だけ',
      romaji: 'dake',
      category: 'fukujoshi', // 副助詞 (Limitative)
      jlpt: 'n5',
      overview_id: 'Partikel pembatas netral objektif ("hanya / saja") tanpa membawa emosi keluhan atau rasa kurang.',
      senses: [
        {
          sense_id: 'dake-neutral-limit',
          function_jp: '客観的限定',
          function_id: 'Membatasi kuantitas atau ruang lingkup secara netral',
          translation_id: 'hanya / saja',
          collocation_pattern: '[Nomina/Kuantitas/Verba] + だけ',
          example: {
            jp: '私は水だけを飲みます。少し休むだけです。',
            reading: 'わたしは みずだけを のみます。すこし やすむだけです。',
            id: 'Saya hanya minum air saja. Hanya beristirahat sebentar.'
          },
          l1_trap: 'Bisa berpasangan dengan kalimat positif maupun negatif. Berbeda dari しか yang mutlak wajib negatif.'
        },
        {
          sense_id: 'dake-degree-capacity',
          function_jp: '可能な限りの限度',
          function_id: 'Menunjukkan batas kemampuan maksimal ("sebanyak / semampunya")',
          translation_id: 'sebanyak mungkin / semampunya',
          collocation_pattern: '[Verba Potensial] + だけ',
          example: {
            jp: '食べたいだけ食べてください。できるだけのことはやりました。',
            reading: 'たべたいだけ たべてください。できるだけの ことは やりました。',
            id: 'Silakan makan sebanyak yang kamu mau. Saya sudah melakukan semampu saya.'
          },
          l1_trap: 'Pola できるだけ berarti "sebisa mungkin".'
        }
      ]
    },

    // ── しか (shika) ─────────────────────────────
    'しか': {
      particle: 'しか',
      romaji: 'shika',
      category: 'fukujoshi', // 副助詞 (Exclusive Negative)
      jlpt: 'n5',
      overview_id: 'Partikel pembatas eksklusif bernada rasa kurang/mengeluh yang MUTLAK WAJIB berpasangan dengan verba negatif.',
      senses: [
        {
          sense_id: 'shika-negative-exclusivity',
          function_jp: '不満・不足を伴う限定全否定',
          function_id: 'Membatasi hanya pada hal itu dengan rasa mengeluh atau kekurangan ("cuma tinggal ini, tak ada yang lain")',
          translation_id: 'hanya [disertai rasa kurang / sedih]',
          collocation_pattern: '[Nomina/Kuantitas] + しか + [Verba Negatif: ない / ません]',
          example: {
            jp: '財布の中に千円しかありません。私にはあなたしかいない。',
            reading: 'さいふの なかに せんえんしか ありません。わたしには あなたしか いない。',
            id: 'Di dalam dompet hanya ada seribu yen saja (mengeluh sedikit). Bagi saya hanya ada kamu seorang.'
          },
          l1_trap: 'HUKUM MUTLAK: しか tidak pernah boleh berpasangan dengan kalimat positif (*千円しかあります adalah fatal error!).'
        }
      ]
    },

    // ── ほど (hodo) ──────────────────────────────
    'ほど': {
      particle: 'ほど',
      romaji: 'hodo',
      category: 'fukujoshi', // 副助詞 (Degree / Extent)
      jlpt: 'n4',
      overview_id: 'Partikel penanda tingkat ekstremitas, perkiraan kuantitas, perbandingan negatif, dan perubahan proporsional (semakin... semakin...).',
      senses: [
        {
          sense_id: 'hodo-extent-degree',
          function_jp: '極端な程度の比喩',
          function_id: 'Menggambarkan tingkat keadaan yang begitu ekstrem sampai menyerupai kiasan',
          translation_id: 'sampai-sampai / begitu ... hingga',
          collocation_pattern: '[Verba/Nomina] + ほど',
          example: {
            jp: '死ぬほど疲れました。声が出ないほど驚いた。',
            reading: 'しぬほど つかれました。こえが でないほど おどろいた。',
            id: 'Capeknya sampai-sampai serasa mau mati. Begitu kagetnya hingga tak bisa bersuara.'
          },
          l1_trap: 'Menyatakan hiperbola atau analogi tingkat intensitas perasaan/keadaan.'
        },
        {
          sense_id: 'hodo-proportional',
          function_jp: '比例的変化（〜ば〜ほど）',
          function_id: 'Menyatakan bahwa seiring bertambahnya syarat A, akibat B juga semakin menguat',
          translation_id: 'semakin ... semakin ...',
          collocation_pattern: '[Klausa Syarat ば/なら] + [Kata Kerja/Sifat] + ほど',
          example: {
            jp: '日本語は勉強すればするほど面白くなります。',
            reading: 'にほんごは べんきょうすれば するほど おもしろく なります。',
            id: 'Bahasa Jepang itu semakin dipelajari, akan menjadi semakin menarik.'
          },
          l1_trap: 'Kombinasi klasik: verba bentuk -ba diulang dengan bentuk kamus + ほど.'
        },
        {
          sense_id: 'hodo-negative-comparison',
          function_jp: '否定の比較（〜ほど〜ない）',
          function_id: 'Membandingkan bahwa hal A tidak mencapai derajat yang dimiliki hal B',
          translation_id: 'tidak se-... [hal B]',
          collocation_pattern: '[Nomina Pembanding] + ほど + [Adjektiva Negatif: くない / ではない]',
          example: {
            jp: '今年は去年ほど寒くありません。',
            reading: 'ことしは きょねんほど さむくありません。',
            id: 'Tahun ini tidak sedingin tahun lalu.'
          },
          l1_trap: 'Dalam perbandingan afirmatif gunakan より (去年より寒い), dalam perbandingan negatif gunakan ほど (去年ほど寒くない).'
        }
      ]
    },

    // ── くらい / ぐらい (kurai / gurai) ───────────
    'くらい': {
      particle: 'くらい',
      romaji: 'kurai',
      category: 'fukujoshi', // 副助詞 (Approximation / Degree)
      jlpt: 'n4',
      overview_id: 'Partikel penanda perkiraan kuantitas kasual, tingkat toleransi batas paling rendah ("setidaknya"), dan derajat keadaan.',
      senses: [
        {
          sense_id: 'kurai-approximation',
          function_jp: '数量・時間の概数',
          function_id: 'Menyatakan perkiraan kuantitas, harga, atau durasi secara kasual santai',
          translation_id: 'sekitar / kira-kira',
          collocation_pattern: '[Angka/Waktu] + くらい / ぐらい',
          example: {
            jp: '家から駅まで10分くらい歩きます。千円ぐらい貸してください。',
            reading: 'いえから えきまで じっぷんくらい あるきます。せんえんぐらい かしてください。',
            id: 'Dari rumah ke stasiun berjalan sekitar 10 menit. Tolong pinjami kira-kira seribu yen.'
          },
          l1_trap: 'Keduanya sama persis, "ぐらい" sedikit lebih umum terdengar dalam ragam lisan percakapan.'
        },
        {
          sense_id: 'kurai-minimal-degree',
          function_jp: '最低限の要求・軽視',
          function_id: 'Menyatakan standar tindakan paling mendasar yang paling tidak harus dipenuhi',
          translation_id: 'setidaknya / masa cuma ... saja',
          collocation_pattern: '[Tindakan Sederhana] + くらい（は）',
          example: {
            jp: '自分の名前くらいは漢字で書きなさい。挨拶くらいしてください。',
            reading: 'じぶんの なまえくらいは かんじで かきなさい。あいさつくらい してください。',
            id: 'Setidaknya tulislah nama sendiri dengan kanji! Paling tidak berikanlah salam!'
          },
          l1_trap: 'Menunjukkan bahwa pembicara menganggap hal itu sangat sepele atau tuntutan paling dasar.'
        }
      ]
    },

    // ── ばかり (bakari) ──────────────────────────
    'ばかり': {
      particle: 'ばかり',
      romaji: 'bakari',
      category: 'fukujoshi', // 副助詞 (Exclusivity / Recency)
      jlpt: 'n4',
      overview_id: 'Partikel penanda aksi yang dilakukan melulu/terus-menerus (~てばかり), aksi yang baru saja selesai (~たばかり), dan pembatas mutlak.',
      senses: [
        {
          sense_id: 'bakari-continuous-action',
          function_jp: '反復・継続（〜てばかりいる）',
          function_id: 'Menyindir tindakan yang diulang-ulang terus sampai mengabaikan kewajiban lain',
          translation_id: 'melulu / terus-menerus [bernada menyindir]',
          collocation_pattern: '[Verba Te-form] + ばかりいる',
          example: {
            jp: '弟は勉強しないでゲームをしてばかりいます。',
            reading: 'おとうとは べんきょうしないで げーむをしてばかり います。',
            id: 'Adik laki-laki saya tidak belajar, kerjanya main game melulu.'
          },
          l1_trap: 'Selalu mengandung nuansa kritik/keluhan terhadap kebiasaan yang tidak produktif.'
        },
        {
          sense_id: 'bakari-recent-action',
          function_jp: '直後の完了（〜たばかり）',
          function_id: 'Menyatakan bahwa suatu tindakan baru saja selesai dilakukan menurut perasaan pembicara',
          translation_id: 'baru saja [selesai dilakukan]',
          collocation_pattern: '[Verba Ta-form] + ばかり',
          example: {
            jp: '先月、日本に来たばかりです。さっき昼ご飯を食べたばかりです。',
            reading: 'せんげつ、にほんに きたばかりです。さっき ひるごはんを たべたばかりです。',
            id: 'Bulan lalu saya baru saja tiba di Jepang. Tadi saya baru saja makan siang.'
          },
          l1_trap: 'Meskipun sudah berlalu satu bulan, jika pembicara merasa hal itu "masih baru", たばかり tetap sah digunakan.'
        }
      ]
    },

    // ── さえ / すら (sae / sura) ─────────────────
    'さえ': {
      particle: 'さえ',
      romaji: 'sae',
      category: 'fukujoshi', // 副助詞 (Extreme focus)
      jlpt: 'n3',
      overview_id: 'Partikel penanda contoh paling ekstrem ("bahkan") dan syarat tunggal mutlak pembuka jalan (~さえ~ば).',
      senses: [
        {
          sense_id: 'sae-extreme-example',
          function_jp: '極端な例示（〜でさえ）',
          function_id: 'Mengangkat contoh paling dasar/ekstrem untuk menyiratkan bahwa hal lain tentu lebih lagi',
          translation_id: 'bahkan ... pun',
          collocation_pattern: '[Nomina] + さえ',
          example: {
            jp: '子供でさえ知っている常識です。ひらがなさえ読めない。',
            reading: 'こどもでさえ しっている じょうしきです。ひらがなさえ よめない。',
            id: 'Ini adalah akal sehat yang bahkan anak kecil pun tahu. Bahkan hiragana pun tak bisa membaca.'
          },
          l1_trap: 'Ketika menempel pada subjek, partikel が lebur menjadi さえ atau でさえ.'
        },
        {
          sense_id: 'sae-minimal-condition',
          function_jp: '唯一の必須条件（〜さえ〜ば）',
          function_id: 'Menyatakan bahwa asalkan satu syarat ini terpenuhi, maka hal lainnya sudah cukup',
          translation_id: 'asalkan saja / hanya dengan',
          collocation_pattern: '[Nomina/Stem] + さえ + [Verba/Sifat Bentuk Ba]',
          example: {
            jp: '薬を飲みさえすれば、すぐに風邪は治ります。お金さえあれば幸せだとは限らない。',
            reading: 'くすりを のみさえすれば、すぐに かぜは なおります。おかねさえ あれば しあわせだとは かぎらない。',
            id: 'Asalkan minum obat, flu akan segera sembuh. Memiliki uang saja belum tentu bahagia.'
          },
          l1_trap: 'Pola kunci: kata kerja masu-stem + さえすれば, atau kata benda + さえあれば.'
        }
      ]
    },

    // ── こそ (koso) ──────────────────────────────
    'こそ': {
      particle: 'こそ',
      romaji: 'koso',
      category: 'kakarijoshi', // 係助詞 (Emphatic)
      jlpt: 'n3',
      overview_id: 'Partikel penegas tekad bulat atau penunjuk sasaran tepat ("justru inilah / pasti kali ini").',
      senses: [
        {
          sense_id: 'koso-emphatic-focus',
          function_jp: '強い強調・特定',
          function_id: 'Menegaskan subjek/waktu dengan tekad kuat bahwa justru inilah yang sejati',
          translation_id: 'justru / pastilah / benar-benar',
          collocation_pattern: '[Waktu/Nomina/Alasan から] + こそ',
          example: {
            jp: '今年こそJLPT N2に合格してみせる。こちらこそよろしくお願いします。',
            reading: 'ことしこそ えぬつーに ごうかく してみせる。こちらこそ よろしく おねがいします。',
            id: 'Justru tahun inilah saya pasti akan lulus JLPT N2! Justru pihak sayalah yang memohon bimbingan.'
          },
          l1_trap: 'Frasa sopan "こちらこそ" berarti "justru dari pihak kamilah yang berterima kasih/memohon".'
        },
        {
          sense_id: 'koso-conditional-te-koso',
          function_jp: '〜てこそ（不可欠の前提）',
          function_id: 'Menyatakan bahwa hanya setelah mengalami hal A, barulah esensi sejati B dapat dipahami',
          translation_id: 'hanya setelah ... barulah',
          collocation_pattern: '[Verba Te-form] + こそ',
          example: {
            jp: '親になってこそ、親の苦労が分かる。',
            reading: 'おやになってこそ、おやの くろうが わかる。',
            id: 'Hanya setelah menjadi orang tua, barulah seseorang bisa memahami jerih payah orang tua.'
          },
          l1_trap: 'Menekankan prasyarat pengalaman hidup yang mutlak.'
        }
      ]
    },

    // ── など / なんか / なんて (nado) ──────────────
    'など': {
      particle: 'など',
      romaji: 'nado',
      category: 'fukujoshi', // 副助詞 (Exemplification / Humility)
      jlpt: 'n4',
      overview_id: 'Partikel penanda percontohan santai, perendahan diri (humility), atau pengabaian emosional.',
      senses: [
        {
          sense_id: 'nado-exemplification',
          function_jp: '例示・婉曲',
          function_id: 'Menyebutkan contoh secara santai untuk menyiratkan ada hal sejenis lainnya',
          translation_id: 'dan semacamnya / seperti',
          collocation_pattern: '[Nomina] + など',
          example: {
            jp: '休日は映画を見たり、買い物などをします。',
            reading: 'きゅうじつは えいがを みたり、かいものなどを します。',
            id: 'Pada hari libur saya menonton film, berbelanja, dan hal-hal semacamnya.'
          },
          l1_trap: 'Dalam percakapan kasual informal, など sering berubah menjadi なんか atau なんて.'
        },
        {
          sense_id: 'nado-humility-dismissive',
          function_jp: '謙遜・軽視（なんか・なんて）',
          function_id: 'Merendahkan diri sendiri (sopan) atau meremehkan suatu hal yang dianggap tidak penting',
          translation_id: 'hal seperti ... mah / hal semacam itu',
          collocation_pattern: '[Subjek/Klausa] + なんて / なんか',
          example: {
            jp: '私なんかまだまだ上手じゃありません。彼が嘘をつくなんて信じられない。',
            reading: 'わたしなんか まだまだ じょうずじゃ ありません。かれが うそをつくなんて しんじられない。',
            id: 'Orang seperti saya mah kemampuannya masih jauh. Hal seperti dia berbohong sungguh tak dapat dipercaya!'
          },
          l1_trap: 'なんて sering dipakai untuk mengungkapkan rasa kaget/emosi negatif atas fakta yang tak terduga.'
        }
      ]
    },

    // ── のに (noni) ──────────────────────────────
    'のに': {
      particle: 'のに',
      romaji: 'noni',
      category: 'setsuzokujoshi', // 接続助詞 (Conjunctive Adversative)
      jlpt: 'n4',
      overview_id: 'Partikel konjungsi penanda kontradiksi kenyataan di luar harapan yang disertai rasa kecewa, heran, atau penyesalan ("padahal").',
      senses: [
        {
          sense_id: 'noni-adversative-regret',
          function_jp: '逆接（不満・非難・後悔）',
          function_id: 'Menghubungkan dua klausa yang bertentangan dengan rasa kecewa karena hasil tidak sesuai ekspektasi',
          translation_id: 'padahal / meskipun sudah',
          collocation_pattern: '[Bentuk Biasa (Na-adj/Nomina + な)] + のに、+ [Hasil Tak Sesuai]',
          example: {
            jp: '一生懸命勉強したのに、試験に不合格でした。約束したのに来なかった。',
            reading: 'いっしょうけんめい べんきょうしたのに、しけんに ふごうかくでした。やくそくしたのに こなかった。',
            id: 'Padahal sudah belajar mati-matian, tetapi tidak lulus ujian. Padahal sudah berjanji, tetapi tidak datang.'
          },
          l1_trap: 'Berbeda dari けれども (yang netral), のに selalu sarat dengan emosi kekecewaan atau protes batin pembicara.'
        }
      ]
    },

    // ── ので (node) ──────────────────────────────
    'ので': {
      particle: 'ので',
      romaji: 'node',
      category: 'setsuzokujoshi', // 接続助詞 (Causal Objective)
      jlpt: 'n4',
      overview_id: 'Partikel konjungsi penanda sebab-akibat objektif yang halus, sopan, dan tidak memaksakan kehendak ("berhubung / karena").',
      senses: [
        {
          sense_id: 'node-objective-cause',
          function_jp: '客観的・穏やかな理由',
          function_id: 'Menyampaikan sebab alami atau keadaan objektif secara sopan dan santun',
          translation_id: 'karena / berhubung',
          collocation_pattern: '[Bentuk Biasa (Na-adj/Nomina + な)] + ので、+ [Akibat/Permintaan Maaf]',
          example: {
            jp: '電車が遅れたので、遅刻してしまいました。頭が痛いので、少し休んでもいいですか？',
            reading: 'でんしゃが おくれたので、ちこくして しまいました。あたまが いたいので、すこし やすんでも いいですか？',
            id: 'Berhubung kereta terlambat, saya jadi datang terlambat. Karena kepala pusing, bolehkah saya beristirahat sebentar?'
          },
          l1_trap: 'Klausa setelah ので TIDAK BOLEH berupa perintah langsung yang kasar (*雨なので傘を持って行きなさい salah -> wajib pakai から).'
        }
      ]
    },

    // ── ながら (nagara) ──────────────────────────
    'ながら': {
      particle: 'ながら',
      romaji: 'nagara',
      category: 'setsuzokujoshi', // 接続助詞 (Simultaneous)
      jlpt: 'n4',
      overview_id: 'Partikel penanda dua aksi yang dilakukan secara bersamaan oleh satu pelaku yang sama ("sambil").',
      senses: [
        {
          sense_id: 'nagara-simultaneous',
          function_jp: '同時並行動作（同一主語）',
          function_id: 'Dua tindakan berlangsung simultan oleh subjek yang sama (tindakan utama di belakang)',
          translation_id: 'sambil [melakukan]',
          collocation_pattern: '[Verba Masu-stem] + ながら + [Verba Utama]',
          example: {
            jp: '音楽を聴きながら、宿題をします。歩きながらスマホを見ないでください。',
            reading: 'おんがくを ききながら、しゅくだいを します。あるきながら すまほを みないでください。',
            id: 'Mengerjakan PR sambil mendengarkan musik. Tolong jangan melihat smartphone sambil berjalan.'
          },
          l1_trap: 'Aksi yang menjadi fokus utama pembicara selalu diletakkan setelah partikel ながら.'
        }
      ]
    },

    // ── つつ (tsutsu) ────────────────────────────
    'つつ': {
      particle: 'つつ',
      romaji: 'tsutsu',
      category: 'setsuzokujoshi', // 接続助詞 (Formal Simultaneous / Concession)
      jlpt: 'n2',
      overview_id: 'Partikel ragam formal tulis untuk aksi simultan ("seraya") atau pertentangan batin ("meski tahu... namun").',
      senses: [
        {
          sense_id: 'tsutsu-simultaneous-formal',
          function_jp: '文語的同時動作',
          function_id: 'Ragam tulis formal untuk aksi yang dilakukan bersamaan dengan penuh perhatian',
          translation_id: 'seraya / sembari',
          collocation_pattern: '[Verba Masu-stem] + つつ',
          example: {
            jp: '将来の計画を考えつつ、大学生活を送っています。',
            reading: 'しょうらいの けいかくを かんがえつつ、だいがくせいかつを おくっています。',
            id: 'Menjalani kehidupan kuliah seraya memikirkan rencana masa depan.'
          },
          l1_trap: 'Ragam formal dari ながら, umum dijumpai dalam pidato resmi atau artikel.'
        },
        {
          sense_id: 'tsutsu-concession',
          function_jp: '矛盾の継続（〜つつも）',
          function_id: 'Menyatakan kontradiksi antara kesadaran batin dengan tindakan nyata yang tetap dilakukan',
          translation_id: 'meskipun menyadari / walau tahu',
          collocation_pattern: '[Verba Masu-stem] + つつ（も）',
          example: {
            jp: '体に悪いと知りつつも、夜食を食べてしまう。',
            reading: 'からだに わるいと しりつつも、やしょくを たべてしまう。',
            id: 'Meskipun tahu itu tidak baik untuk tubuh, tetap saja makan larut malam.'
          },
          l1_trap: 'Sering dipakai bersama verba kesadaran mental (知る, 思う, 分かる).'
        }
      ]
    }
  };

  // ──────────────────────────────────────────────
  // §2  COMBINED PARTICLES (複合助詞・重ね助詞)
  // ──────────────────────────────────────────────

  var COMBINED_PARTICLES = {
    'には': {
      components: ['に', 'は'],
      romaji: 'ni wa',
      jlpt: 'n4',
      meaning_id: 'Bagi pihak tertentu / Untuk tujuan tertentu / Di tempat ini (sebagai topik atau kontras)',
      nuance_breakdown: 'Penggabungan partikel titik/tujuan "に" dengan partikel topikalisasi/kontras "は". Digunakan untuk mengangkat sasaran atau tempat menjadi tema pembicaraan khusus yang sering kali dikontraskan dengan yang lain.',
      stacking_rule: 'Menempel pada nomina tempat, orang, atau verba bentuk kamus (misal: 私には, 東京には, 行くには).',
      example: {
        jp: '私にはこの問題が難しすぎます。東京には高いビルがたくさんあります。',
        reading: 'わたしには この もんだいが むずかしすぎます。とうきょうには たかい びるが たくさん あります。',
        id: 'Bagi saya soal ini terlalu sulit. Kalau di Tokyo, ada banyak sekali gedung tinggi.'
      }
    },
    'では': {
      components: ['で', 'は'],
      romaji: 'de wa',
      jlpt: 'n4',
      meaning_id: 'Kalau di arena tempat itu / Dengan cara itu / Di dalam ranah kondisi tertentu',
      nuance_breakdown: 'Penggabungan partikel ruang lingkup "で" dengan partikel topikalisasi "は". Menetapkan batas arena atau kondisi pembicaraan secara tegas.',
      stacking_rule: 'Menempel pada nomina tempat atau sarana. Dalam ragam lisan percakapan, では sangat lazim disingkat menjadi じゃ (ja).',
      colloquial_contraction: 'じゃ (ja) — misal: これでは困る -> これじゃ困る',
      example: {
        jp: '日本では靴を脱いで部屋に入ります。これでは間に合いません。',
        reading: 'にほんでは くつを ぬいで へやに はいります。これでは まにあいません。',
        id: 'Kalau di Jepang, orang melepas sepatu saat masuk ke dalam ruangan. Kalau begini caranya tidak akan keburu.'
      }
    },
    'へは': {
      components: ['へ', 'は'],
      romaji: 'e wa',
      jlpt: 'n4',
      meaning_id: 'Kalau ke arah tujuan itu sih... (kontras orientasi)',
      nuance_breakdown: 'Penggabungan partikel arah "へ" dengan partikel kontras "は". Mengontraskan perjalanan ke arah tertentu dibandingkan arah lainnya.',
      stacking_rule: 'Menempel pada nomina tempat tujuan pergerakan.',
      example: {
        jp: '京都へは行きましたが、大阪へは行きませんでした。',
        reading: 'きょうとへは いきましたが、おおさかへは いきませんでした。',
        id: 'Kalau ke Kyoto saya pergi, tapi kalau ke Osaka saya tidak pergi.'
      }
    },
    'とは': {
      components: ['と', 'は'],
      romaji: 'to wa',
      jlpt: 'n3',
      meaning_id: 'Apakah yang dimaksud dengan... / Mengangkat definisi / Terkejut atas hal yang terjadi',
      nuance_breakdown: 'Penggabungan partikel kutipan/isi "と" dengan partikel topik "は". Dipakai untuk (1) mengangkat konsep abstrak untuk didefinisikan, atau (2) mengekspresikan rasa kaget yang mendalam.',
      stacking_rule: 'Menempel pada kata benda atau klausa bentuk biasa.',
      example: {
        jp: '幸せとは何でしょうか。彼が犯人だったとは驚きだ。',
        reading: 'しあわせとは なんでしょうか。かれが はんにんだったとは おどろきだ。',
        id: 'Apakah sebenarnya yang disebut dengan kebahagiaan itu? Sungguh mengejutkan bahwa dialah sang pelaku.'
      }
    },
    'からも': {
      components: ['から', 'も'],
      romaji: 'kara mo',
      jlpt: 'n4',
      meaning_id: 'Dari pihak itu pun juga / Dari sumber tersebut juga demikian',
      nuance_breakdown: 'Penggabungan partikel asal mula "から" dengan partikel inklusif "も". Menyatakan adanya sumber atau pihak tambahan yang melakukan/memberikan hal serupa.',
      stacking_rule: 'Menempel pada nomina asal/sumber.',
      example: {
        jp: '先生からも注意されました。友達からも手紙をもらった。',
        reading: 'せんせいからも ちゅうい されました。ともだちからも てがみを もらった。',
        id: 'Dari guru pun saya ditegur. Dari teman pun saya mendapat surat.'
      }
    },
    'での': {
      components: ['で', 'の'],
      romaji: 'de no',
      jlpt: 'n4',
      meaning_id: 'Yang berlangsung di... / Menggunakan sarana... (menerangkan kata benda berikutnya)',
      nuance_breakdown: 'Menghubungkan keterangan lokasi aktivitas "で" dengan nomina berikutnya menggunakan "の". Mengubah frasa adverbial menjadi frasa adnominal (pewatas kata benda).',
      stacking_rule: 'Pola wajib: [Tempat/Sarana] + での + [Nomina Inti].',
      example: {
        jp: '日本での生活は楽しいです。現地での調査。',
        reading: 'にほんでの せいかつは たのしいです。げんちでの ちょうさ。',
        id: 'Kehidupan yang dijalani di Jepang sangat menyenangkan. Investigasi di lapangan.'
      }
    },
    'への': {
      components: ['へ', 'の'],
      romaji: 'e no',
      jlpt: 'n4',
      meaning_id: 'Menuju ke... / Yang ditujukan kepada... (menerangkan kata benda berikutnya)',
      nuance_breakdown: 'Menghubungkan arah pergerakan atau sasaran penerima dengan nomina berikutnya.',
      stacking_rule: 'Pola wajib: [Tujuan/Sasaran] + への + [Nomina Inti]. Catatan penting: に tidak bisa digabung dengan の (*にの tidak ada), wajib menggunakan への!',
      example: {
        jp: '両親への感謝の気持ち。東京への旅。',
        reading: 'りょうしんへの かんしゃの きもち。とうきょうへの たび。',
        id: 'Rasa terima kasih yang ditujukan kepada kedua orang tua. Perjalanan menuju Tokyo.'
      }
    },
    'からの': {
      components: ['から', 'の'],
      romaji: 'kara no',
      jlpt: 'n4',
      meaning_id: 'Yang berasal dari... / Yang dimulai sejak...',
      nuance_breakdown: 'Menghubungkan titik asal mula ruang/waktu dengan nomina berikutnya.',
      stacking_rule: 'Pola wajib: [Asal/Waktu] + からの + [Nomina Inti].',
      example: {
        jp: '海外からの留学生。明日からの予定。',
        reading: 'かいがいからの りゅうがくせい。あしたからの よてい。',
        id: 'Mahasiswa asing yang datang dari luar negeri. Jadwal kegiatan yang dimulai sejak besok.'
      }
    },
    'との': {
      components: ['と', 'の'],
      romaji: 'to no',
      jlpt: 'n4',
      meaning_id: 'Bersama dengan pihak... / Hubungan relasi dengan...',
      nuance_breakdown: 'Menghubungkan mitra interaksi dengan nomina inti peristiwa (percakapan, pertemuan, perjanjian).',
      stacking_rule: 'Pola wajib: [Mitra] + との + [Nomina Pertemuan/Hubungan].',
      example: {
        jp: '先生との面談。彼との関係は良好です。',
        reading: 'せんせいとの めんだん。かれとの かんけいは りょうこうです。',
        id: 'Wawancara bersama guru. Hubungan relasi dengan dia berjalan baik.'
      }
    },
    'までの': {
      components: ['まで', 'の'],
      romaji: 'made no',
      jlpt: 'n4',
      meaning_id: 'Perjalanan hingga ke... / Kurun waktu sampai...',
      nuance_breakdown: 'Menghubungkan batas akhir rentang ruang/waktu dengan nomina inti.',
      stacking_rule: 'Pola wajib: [Titik Batas] + までの + [Nomina].',
      example: {
        jp: '駅までの道のりを教えてください。今日までの宿題。',
        reading: 'えきまでの みちのりを おしえてください。きょうまでの しゅくだい。',
        id: 'Tolong beritahu rute jalan sampai ke stasiun. PR yang berbatas waktu hingga hari ini.'
      }
    },
    'よりは': {
      components: ['より', 'は'],
      romaji: 'yori wa',
      jlpt: 'n3',
      meaning_id: 'Kalau dibandingkan dengan hal itu sih... (komparasi kontras tegas)',
      nuance_breakdown: 'Menambahkan nuansa topikalisasi/kontras pada tolok ukur perbandingan より.',
      stacking_rule: 'Menempel pada kata pembanding: [Pilihan A] + よりは + [Pilihan B].',
      example: {
        jp: '何もしないよりは、少しでも勉強したほうがいい。',
        reading: 'なにも しないよりは、すこしでも べんきょうしたほうが いい。',
        id: 'Daripada tidak melakukan apa-apa sama sekali, jauh lebih baik belajar walau sedikit.'
      }
    },
    'だけに': {
      components: ['だけ', 'に'],
      romaji: 'dake ni',
      jlpt: 'n2',
      meaning_id: 'Justru karena alasan itulah wajar jika...',
      nuance_breakdown: 'Menyatakan akibat proporsional yang sangat logis dan wajar karena adanya faktor pemicu khusus.',
      stacking_rule: 'Menempel pada bentuk biasa atau kata benda.',
      example: {
        jp: '一生懸命頑張っただけに、不合格のショックは大きかった。',
        reading: 'いっしょうけんめい がんばっただけに、ふごうかくの しょっくは おおきかった。',
        id: 'Justru karena sudah berjuang mati-matian, rasa syok akibat tidak lulus menjadi begitu besar.'
      }
    },
    'ばかりか': {
      components: ['ばかり', 'か'],
      romaji: 'bakari ka',
      jlpt: 'n2',
      meaning_id: 'Bukan hanya hal itu saja, bahkan hal yang lebih luar biasa pun juga...',
      nuance_breakdown: 'Pola akumulatif perluasan: kondisi tidak berhenti di A, tetapi merembet lebih jauh ke B.',
      stacking_rule: 'Umum berpasangan dengan 〜も atau 〜さえ di klausa belakang.',
      example: {
        jp: '彼は英語ばかりか、中国語やフランス語も話せる。',
        reading: 'かれは えいごばかりか、ちゅうごくごや ふらんすごも はなせる。',
        id: 'Dia bukan hanya bisa bahasa Inggris, bahkan bahasa Mandarin dan Prancis pun bisa dia tuturkan.'
      }
    },
    'くらいは': {
      components: ['くらい', 'は'],
      romaji: 'kurai wa',
      jlpt: 'n3',
      meaning_id: 'Setidaknya / paling tidak (tuntutan batas minimal)',
      nuance_breakdown: 'Mengangkat batas toleransi minimal yang paling sepele menjadi topik penegasan.',
      stacking_rule: 'Menempel pada kata benda atau verba.',
      example: {
        jp: '挨拶くらいはきちんとしなさい。',
        reading: 'あいさつくらいは きちんと しなさい。',
        id: 'Paling tidak berilah salam dengan sopan!'
      }
    },
    'ほどは': {
      components: ['ほど', 'は'],
      romaji: 'hodo wa',
      jlpt: 'n3',
      meaning_id: 'Kalau sampai taraf itu sih tidak begitu... (komparasi negatif bernada kontras)',
      nuance_breakdown: 'Mempertegas batas penolakan bahwa derajat suatu hal tidak sampai setinggi tolok ukur.',
      stacking_rule: 'Menempel pada patokan komparatif, predikat wajib negatif.',
      example: {
        jp: '試験は思っていたほどは難しくなかった。',
        reading: 'しけんは おもっていたほどは むずかしくなかった。',
        id: 'Ujiannya ternyata tidak sesulit yang saya bayangkan.'
      }
    },
    'さえも': {
      components: ['さえ', 'も'],
      romaji: 'sae mo',
      jlpt: 'n2',
      meaning_id: 'Bahkan sampai hal itu pun juga demikian (penegasan ekstrem ganda)',
      nuance_breakdown: 'Penguatan ganda dari さえ (ekstrem) dan も (inklusif) untuk efek dramatis.',
      stacking_rule: 'Menempel pada kata benda.',
      example: {
        jp: '家族にさえも真実を打ち明けることができなかった。',
        reading: 'かぞくにさえも しんじつを うちあける ことが できなかった。',
        id: 'Bahkan kepada keluarga sendiri pun saya tak sanggup menceritakan kebenarannya.'
      }
    },
    'すらも': {
      components: ['すら', 'も'],
      romaji: 'sura mo',
      jlpt: 'n1',
      meaning_id: 'Bahkan sampai batas sekecil itu pun (ragam sastrawi kental)',
      nuance_breakdown: 'Bentuk sastrawi dari さえも dengan nada yang lebih berat dan kritis.',
      stacking_rule: 'Menempel pada kata benda.',
      example: {
        jp: '生きる希望すらも失ってしまった。',
        reading: 'いきる きぼうすらも うしなって しまった。',
        id: 'Bahkan secercah harapan untuk hidup pun telah sirna.'
      }
    },
    'をも': {
      components: ['を', 'も'],
      romaji: 'o mo',
      jlpt: 'n1',
      meaning_id: 'Bahkan objek itu pun (akusatif sastrawi dramatis)',
      nuance_breakdown: 'Menggabungkan partikel objek langsung "を" dengan penekan "も" dalam sastra klasik/formal.',
      stacking_rule: 'Menempel pada objek penderita langsung.',
      example: {
        jp: '国のためなら命をも惜しまない。',
        reading: 'くにの ためなら いのちをも おしまない。',
        id: 'Demi membela negara, bahkan nyawa pun tak disayangkan.'
      }
    },
    'としては': {
      components: ['として', 'は'],
      romaji: 'to shite wa',
      jlpt: 'n3',
      meaning_id: 'Kalau ditinjau dari kapasitas/perannya sebagai...',
      nuance_breakdown: 'Menjadikan peran atau identitas sebagai tema evaluasi.',
      stacking_rule: 'Menempel pada kata benda profesi/peran: [Peran] + としては.',
      example: {
        jp: '彼個人の意見としては、賛成だそうだ。',
        reading: 'かれ こじんの いけんとしては、さんせいだ そうだ。',
        id: 'Sebagai pendapat pribadi dia, kabarnya dia setuju.'
      }
    },
    'としても': {
      components: ['として', 'も'],
      romaji: 'to shite mo',
      jlpt: 'n3',
      meaning_id: 'Bahkan seandainya bertindak sebagai... / Sekalipun dalam kapasitas...',
      nuance_breakdown: 'Konsesi hipotetis atas suatu peran atau asumsi pengandaian.',
      stacking_rule: 'Menempel pada kata benda atau klausa bentuk biasa.',
      example: {
        jp: '親としても、これ以上は手助けできない。',
        reading: 'おやとしても、これいじょうは てだすけ できない。',
        id: 'Sekalipun sebagai orang tua, lebih dari ini sudah tak bisa membantu lagi.'
      }
    },
    'にしては': {
      components: ['に', 'して', 'は'],
      romaji: 'ni shite wa',
      jlpt: 'n3',
      meaning_id: 'Untuk ukuran... hasilnya di luar dugaan (ironi / pujian tak disangka)',
      nuance_breakdown: 'Menyatakan bahwa kenyataan bertolak belakang dari standar wajar yang biasanya melekat pada hal itu.',
      stacking_rule: 'Menempel pada kata benda atau bentuk biasa: [Standar] + にしては.',
      example: {
        jp: '彼は外国人に日本語がとても上手ですね。初めてにしては上出来だ。',
        reading: 'かれは がいこくじんにしては にほんごが とても じょうずですね。はじめてにしては じょうできだ。',
        id: 'Untuk ukuran orang asing, bahasa Jepangnya sangat mahir ya. Untuk ukuran baru pertama kali, hasilnya luar biasa.'
      }
    },
    'にしろ': {
      components: ['に', 'しろ'],
      romaji: 'ni shiro',
      jlpt: 'n2',
      meaning_id: 'Mau A ataupun B / Sekalipun benar demikian...',
      nuance_breakdown: 'Konsesi pilihan terbuka: baik kondisi A maupun alternatifnya, kesimpulannya tetap sama.',
      stacking_rule: 'Menempel pada bentuk biasa atau kata benda: AにしろBにしろ.',
      example: {
        jp: '行くにしろ行かないにしろ、早く返事をしてください。',
        reading: 'いくにしろ いかないにしろ、はやく へんじを してください。',
        id: 'Mau pergi ataupun tidak pergi, tolong beri kabar secepatnya.'
      }
    },
    'につけ': {
      components: ['に', 'つけ'],
      romaji: 'ni tsuke',
      jlpt: 'n2',
      meaning_id: 'Setiap kali mengalami hal itu, selalu teringat/terpikir...',
      nuance_breakdown: 'Koneksi asosiasi mental spontan yang selalu terpicu tiap kali pemicu tersebut hadir.',
      stacking_rule: 'Menempel pada verba kamus: [Verba Pemicu] + につけ.',
      example: {
        jp: '写真を見るにつけ、故郷の家族を思い出す。',
        reading: 'しゃしんを みるにつけ、こきょうの かぞくを おもいだす。',
        id: 'Setiap kali melihat foto ini, saya selalu teringat keluarga di kampung halaman.'
      }
    }
  };

  // ──────────────────────────────────────────────
  // §3  COMPOUND GRAMMAR EVOLUTION (派生文法パターン)
  // ──────────────────────────────────────────────

  var COMPOUND_GRAMMAR = {
    'に': [
      { pattern: 'について', jlpt: 'n4', meaning: 'Mengenai / tentang topik pembicaraan', formula: '[Topik/Nomina] + について' },
      { pattern: 'にとって', jlpt: 'n3', meaning: 'Bagi / menurut sudut pandang pihak tertentu', formula: '[Pihak] + にとって' },
      { pattern: 'に対して', jlpt: 'n3', meaning: 'Terhadap pihak sasaran / sebaliknya berlawanan dengan', formula: '[Target] + に対して' },
      { pattern: 'によって', jlpt: 'n3', meaning: 'Oleh (pelaku pasif penemu/pencipta) / Melalui cara / Tergantung pada', formula: '[Penyebab/Cara] + によって' },
      { pattern: 'に関して', jlpt: 'n3', meaning: 'Berkenaan dengan / perihal (ragam formal dari について)', formula: '[Isu] + に関して' },
      { pattern: 'に比べて', jlpt: 'n3', meaning: 'Dibandingkan dengan patokan pembanding', formula: '[Patokan] + に比べて' },
      { pattern: 'に従って', jlpt: 'n2', meaning: 'Seiring berjalannya / mematuhi aturan pedoman', formula: '[Perubahan/Aturan] + に従って' },
      { pattern: 'に伴って', jlpt: 'n2', meaning: 'Seiring bertambahnya / menyertai suatu kejadian', formula: '[Fenomena] + に伴って' },
      { pattern: 'に基づいて', jlpt: 'n2', meaning: 'Berdasarkan pada landasan data/hukum/fakta', formula: '[Data/Hukum] + に基づいて' },
      { pattern: 'に際して', jlpt: 'n1', meaning: 'Menjelang / pada momen penting (acara resmi)', formula: '[Momen Resmi] + に際して' }
    ],
    'を': [
      { pattern: 'を通じて', jlpt: 'n3', meaning: 'Melalui perantara seseorang / sepanjang kurun waktu musim', formula: '[Perantara/Waktu] + を通じて' },
      { pattern: 'を通して', jlpt: 'n3', meaning: 'Melalui sarana perantara', formula: '[Sarana] + を通して' },
      { pattern: 'をめぐって', jlpt: 'n2', meaning: 'Seputar perselisihan / memperebutkan isu tertentu', formula: '[Isu/Konflik] + をめぐって' },
      { pattern: 'を込めて', jlpt: 'n3', meaning: 'Dengan sepenuh hati / mencurahkan perasaan', formula: '[Perasaan/Cinta] + を込めて' },
      { pattern: 'をきっかけに', jlpt: 'n3', meaning: 'Bermula dari momentum pemicu kejadian tersebut', formula: '[Momentum] + をきっかけに' },
      { pattern: 'を皮切りに', jlpt: 'n1', meaning: 'Diawali dengan rentetan kejadian berikutnya', formula: '[Awal] + を皮切りに' },
      { pattern: 'を問わず', jlpt: 'n2', meaning: 'Tanpa memandang / tidak mempersoalkan (usia/gender/kebangsaan)', formula: '[Kategori] + を問わず' }
    ],
    'から': [
      { pattern: 'からして', jlpt: 'n2', meaning: 'Dilihat dari contoh kecilnya saja sudah... / bahkan dari...', formula: '[Contoh Awal] + からして' },
      { pattern: 'から見ると', jlpt: 'n3', meaning: 'Dilihat dari sudut pandang pihak tertentu', formula: '[Pihak] + から見ると' },
      { pattern: 'からといって', jlpt: 'n3', meaning: 'Hanya karena alasan itu bukan berarti pasti...', formula: '[Alasan] + からといって' },
      { pattern: 'からには', jlpt: 'n3', meaning: 'Karena sudah bertekad/memutuskan maka sewajarnya...', formula: '[Tekad] + からには' }
    ],
    'と': [
      { pattern: 'として', jlpt: 'n3', meaning: 'Sebagai / bertindak dalam kapasitas peran', formula: '[Peran/Kapasitas] + として' },
      { pattern: 'とともに', jlpt: 'n3', meaning: 'Bersama dengan pihak / seiring berjalannya perubahan', formula: '[Nomina] + とともに' },
      { pattern: 'と同時に', jlpt: 'n3', meaning: 'Bersamaan dengan saat itu / sekaligus', formula: '[Waktu/Peristiwa] + と同時に' },
      { pattern: 'というと', jlpt: 'n3', meaning: 'Kalau membicarakan hal itu, yang terpikir adalah...', formula: '[Topik] + というと' }
    ],
    'で': [
      { pattern: 'ではないか', jlpt: 'n3', meaning: 'Bukankah begitu? (menegaskan dugaan pembicara)', formula: '[Klausa] + ではないか' },
      { pattern: 'でも', jlpt: 'n4', meaning: 'Bagaimana kalau minum teh atau semacamnya? (tawaran santai)', formula: '[Nomina] + でも' }
    ],
    'より': [
      { pattern: 'よりほかない', jlpt: 'n3', meaning: 'Tidak ada pilihan lain selain melakukan...', formula: '[Verba Kamus] + よりほかない' },
      { pattern: 'よりましだ', jlpt: 'n2', meaning: 'Masih jauh lebih baik dibanding kondisi terburuk itu', formula: '[Pilihan] + よりましだ' }
    ]
  };

  // ──────────────────────────────────────────────
  // §4  CONTRASTIVE CONFUSION PAIRS (混同ペア)
  // ──────────────────────────────────────────────

  var CONFUSION_PAIRS = {
    'は-vs-が': {
      pair: ['は', 'が'],
      title: 'は (Topik / Kontras) vs が (Subjek Gramatikal / Objek Kemampuan)',
      summary: 'Perbedaan paling fundamental dalam sintaks bahasa Jepang. は mengangkat tema pembicaraan (informasi lama/diketahui) atau memberi kontras, sedangkan が memfokuskan subjek pelaku (informasi baru/identifikasi eksklusif) atau objek verba rasa/kemampuan.',
      contrast_points: [
        {
          point: 'Informasi Lama vs Informasi Baru',
          wa_rule: 'Topik は sudah diketahui oleh kedua pembicara (misal: 象は鼻が長い = Kalau gajah, belalainya panjang).',
          ga_rule: 'Subjek が berupa fakta baru yang tiba-tiba muncul/dilihat (misal: あ、猫がいる！ = Lihat, ada kucing!).'
        },
        {
          point: 'Kata Tanya (疑問詞)',
          wa_rule: 'Kata tanya TIDAK PERNAH diikuti は (*誰は, *何は dilarang).',
          ga_rule: 'Kata tanya selalu wajib diikuti が (誰が来ましたか？ 何がありますか？).'
        },
        {
          point: 'Verba Potensial & Afektif',
          wa_rule: 'Hanya dipakai jika ingin menegaskan kontras (misal: 魚は食べられない = kalau ikan sih tidak bisa makan).',
          ga_rule: 'Standar gramatikal untuk objek rasa suka/kemampuan (日本語が話せる, コーヒーが好き).'
        },
        {
          point: 'Anak Kalimat (Subordinate Clause)',
          wa_rule: 'Jarang digunakan di dalam anak kalimat bertingkat.',
          ga_rule: 'Subjek di dalam anak kalimat wajib menggunakan が (友達が来たとき...).'
        }
      ],
      decision_flow: 'Apakah kata tersebut merupakan kata tanya? -> Gunakan が.\nApakah kalimat tersebut adalah kalimat penjelas di dalam anak kalimat? -> Gunakan が.\nApakah fokusnya pada identifikasi "Siapa yang melakukan"? -> Gunakan が.\nApakah kamu ingin mengangkat tema umum atau memberi perbandingan "kalau A sih..."? -> Gunakan は.'
    },

    'に-vs-で': {
      pair: ['に', 'で'],
      title: 'に (Titik Diam / Eksistensi / Tujuan) vs で (Lokasi Aksi Dinamis / Alat)',
      summary: 'Jebakan utama penutur bahasa Indonesia karena keduanya sama-sama diterjemahkan sebagai "DI". Kuncinya ada pada sifat kata kerja yang mengikutinya.',
      contrast_points: [
        {
          point: 'Sifat Verba: Diam vs Aksi Dinamis',
          ni_rule: 'Verba eksistensi/diam/menetap: ある, いる, 住む, 泊まる, 置く, 座る. (Contoh: 東京に住む, 部屋にいる).',
          de_rule: 'Verba aksi aktif: 食べる, 勉強する, 働く, 遊ぶ, 買う, 泳ぐ. (Contoh: レストランで食べる, 東京で働く).'
        },
        {
          point: 'Pusat Perhatian',
          ni_rule: 'Fokus pada titik koordinat di mana subjek menempel/berada (point of existence).',
          de_rule: 'Fokus pada panggung arena di mana aktivitas berlangsung (stage of activity).'
        }
      ],
      decision_flow: 'Apakah verbanya adalah ある, いる, 住む, atau 泊まる? -> WAJIB に.\nApakah ada aktivitas dinamis yang sedang dilakukan di tempat itu? -> WAJIB で.'
    },

    'に-vs-へ': {
      pair: ['に', 'へ'],
      title: 'に (Titik Sasaran Tiba) vs へ (Arah Orientasi Perjalanan)',
      summary: 'Keduanya bisa digunakan untuk arah pergerakan (日本に行く / 日本へ行く), namun memiliki titik berat fokus yang berbeda.',
      contrast_points: [
        {
          point: 'Titik Fokus',
          ni_rule: 'Fokus pada titik target kedatangan (pinpoint arrival destination: 駅に着く).',
          e_rule: 'Fokus pada arah dan perjalanan menuju ke sana (directional orientation: 西へ向かう).'
        },
        {
          point: 'Kombinasi dengan の',
          ni_rule: 'TIDAK BISA digabung dengan の (*にの tidak ada dalam tata bahasa Jepang).',
          e_rule: 'BISA digabung dengan の menjadi への (母への手紙 = surat untuk ibu).'
        }
      ],
      decision_flow: 'Apakah menerangkan kata benda berikutnya? -> Gunakan への.\nApakah fokus pada titik tiba yang spesifik? -> Gunakan に.'
    },

    'と-vs-に': {
      pair: ['と', 'に'],
      title: 'と (Kemitraan Timbal Balik Setara) vs に (Interaksi Satu Arah)',
      summary: 'Sering membingungkan pada kata kerja sosial seperti 会う (bertemu), 結婚する (menikah), atau 話す (berbicara).',
      contrast_points: [
        {
          point: 'Pertemuan (会う)',
          to_rule: '友達と会う: Pertemuan yang direncanakan bersama, kedua pihak saling menuju titik temu secara timbal balik.',
          ni_rule: '先生に会う: Pembicara sengaja mendatangi pihak lain secara sepihak (khususnya untuk orang yang dihormati).'
        },
        {
          point: 'Aksi Timbal Balik Mutlak',
          to_rule: 'Verba seperti 結婚する, けんかする, 相談する yang membutuhkan kesepakatan dua arah wajib memakai と.',
          ni_rule: 'Verba satu arah seperti 電話する, プレゼントをあげる wajib memakai に.'
        }
      ],
      decision_flow: 'Apakah tindakannya harus terjadi dua arah secara setara (menikah, bertengkar)? -> Gunakan と.\nApakah tindakan memberi/mendatangi pihak lain secara sepihak? -> Gunakan に.'
    },

    'だけ-vs-しか': {
      pair: ['だけ', 'しか'],
      title: 'だけ (Pembatas Netral) vs しか (Pembatas Bernada Kurang + Negatif Wajib)',
      summary: 'Keduanya berarti "hanya", namun memiliki struktur tata bahasa dan rasa emosional yang berlawanan.',
      contrast_points: [
        {
          point: 'Pola Predikat',
          dake_rule: 'Bisa berpasangan dengan kalimat positif (afirmatif) maupun negatif (りんごだけがある / りんごだけがない).',
          shika_rule: 'MUTLAK WAJIB berpasangan dengan predikat negatif (りんごしかない).'
        },
        {
          point: 'Nuansa Emosi',
          dake_rule: 'Netral atau merasa cukup ("Hanya ini saja sudah cukup").',
          shika_rule: 'Merasa kurang, mengeluh, atau keterbatasan ("Hanya tinggal ini saja, tidak ada yang lain").'
        }
      ],
      decision_flow: 'Apakah predikat kalimatnya berbentuk negatif? -> Bisa memakai しか.\nApakah kalimatnya bernada positif/cukup? -> WAJIB memakai だけ.'
    },

    'から-vs-ので': {
      pair: ['から', 'ので'],
      title: 'から (Alasan Subjektif / Perintah) vs ので (Sebab Objektif / Sopan)',
      summary: 'Keduanya berarti "karena", namun から berasal dari sudut pandang emosional pembicara, sedangkan ので memaparkan hubungan sebab-akibat objektif.',
      contrast_points: [
        {
          point: 'Tindak Lanjut Klausa',
          kara_rule: 'Boleh diikuti kalimat perintah, ajakan, atau larangan (危ないから触るな、時間があるから行こう).',
          node_rule: 'Tidak boleh diikuti kalimat perintah atau pemaksaan kehendak kasar (berfungsi untuk permohonan sopan / minta izin).'
        },
        {
          point: 'Nuansa Kesopanan',
          kara_rule: 'Lebih tegas, argumentatif, atau subjektif.',
          node_rule: 'Lebih halus, netral, dan menganggap situasi sebagai kejadian alamiah yang wajar.'
        }
      ],
      decision_flow: 'Apakah kalimat penutupnya berupa ajakan (~ましょう) atau perintah (~てください / ~なさい)? -> WAJIB から.\nApakah kamu sedang meminta izin atau menjelaskan alasan keterlambatan secara sopan? -> Gunakan ので.'
    },

    'のに-vs-ても': {
      pair: ['のに', 'ても'],
      title: 'のに (Kontradiksi Fakta Nyata + Kecewa) vs ても (Konsesi Hipotetis / Fakta Netral)',
      summary: 'Keduanya sering diterjemahkan "meskipun/padahal", namun のに hanya digunakan pada fakta riil yang mengecewakan, sedangkan ても dapat digunakan pada pengandaian masa depan.',
      contrast_points: [
        {
          point: 'Sifat Peristiwa',
          noni_rule: 'Hanya berlaku pada fakta yang sudah terjadi atau sedang berlangsung riil (約束したのに来なかった).',
          temo_rule: 'Dapat digunakan untuk pengandaian masa depan yang belum terjadi (雨が降っても行きます).'
        },
        {
          point: 'Beban Emosi',
          noni_rule: 'Sarat dengan emosi kekecewaan, protes, atau penyesalan.',
          temo_rule: 'Netral, menegaskan bahwa kondisi tersebut tidak menghalangi niat utama.'
        }
      ],
      decision_flow: 'Apakah ini pengandaian masa depan (seandainya hujan pun...)? -> Gunakan ても.\nApakah kamu merasa kecewa/protes atas janji yang dilanggar di masa lalu? -> Gunakan のに.'
    },

    'より-vs-ほど': {
      pair: ['より', 'ほど'],
      title: 'より (Tolok Ukur Afirmatif) vs ほど (Taraf Komparasi Negatif)',
      summary: 'Keduanya adalah pilar dalam kalimat perbandingan bahasa Jepang.',
      contrast_points: [
        {
          point: 'Bentuk Kalimat',
          yori_rule: 'Berpasangan dengan kalimat positif (AはBより大きい = A lebih besar daripada B).',
          hodo_rule: 'Berpasangan dengan kalimat negatif (BはAほど大きくない = B tidak sebesar A).'
        }
      ],
      decision_flow: 'Apakah kalimatnya positif (lebih... daripada)? -> Gunakan より.\nApakah kalimatnya negatif (tidak se-...)? -> Gunakan ほど.'
    },

    'さえ-vs-こそ': {
      pair: ['さえ', 'こそ'],
      title: 'さえ (Batas Ekstrem Minimum) vs こそ (Fokus Sasaran Tepat)',
      summary: 'Keduanya partikel penegas (係助詞), namun さえ menunjukkan batas terendah yang mengejutkan ("bahkan"), sedangkan こそ menegaskan bahwa sasaran itulah yang paling tepat ("justru").',
      contrast_points: [
        {
          point: 'Arah Penekanan',
          sae_rule: 'Contoh paling dasar yang tak disangka (ひらがなさえ読めない = bahkan hiragana pun tak bisa).',
          koso_rule: 'Penegasan tekad positif atau pembenaran (今年こそ合格する = justru tahun inilah saya pasti lulus).'
        }
      ],
      decision_flow: 'Apakah maksudnya "bahkan hal sepele pun..."? -> Gunakan さえ.\nApakah maksudnya "justru pihak inilah..." atau "pasti kali ini..."? -> Gunakan こそ.'
    },

    'くらい-vs-ほど': {
      pair: ['くらい', 'ほど'],
      title: 'くらい (Perkiraan Kasual / Taraf Minimal) vs ほど (Derajat Ekstrem / Proporsional)',
      summary: 'Keduanya bisa menyatakan perkiraan kuantitas atau derajat, namun くらい berbobot kasual sehari-hari, sedangkan ほど berbobot formal, hiperbolis, atau proporsional.',
      contrast_points: [
        {
          point: 'Perkiraan Angka',
          kurai_rule: 'Ragam santai sehari-hari (10分くらい = sekitar 10 menit).',
          hodo_rule: 'Lebih formal dan berjarak (10分ほどお待ちください = mohon tunggu sekitar 10 menit).'
        },
        {
          point: 'Taraf Derajat',
          kurai_rule: 'Bisa berarti tuntutan paling sepele (挨拶くらい = paling tidak beri salam).',
          hodo_rule: 'Kiasan hiperbola ekstrem (死ぬほど疲れた = capek setengah mati).'
        }
      ],
      decision_flow: 'Apakah kamu menuntut hal sepele ("setidaknya...")? -> Gunakan くらい.\nApakah kamu mengungkapkan kiasan hiperbola ("sampai-sampai serasa...")? -> Gunakan ほど.'
    }
  };

  // Romaji & alternate aliases for flexible lookups
  CONFUSION_PAIRS['wa-vs-ga'] = CONFUSION_PAIRS['は-vs-が'];
  CONFUSION_PAIRS['が-vs-は'] = CONFUSION_PAIRS['は-vs-が'];
  CONFUSION_PAIRS['ga-vs-wa'] = CONFUSION_PAIRS['は-vs-が'];

  CONFUSION_PAIRS['ni-vs-de'] = CONFUSION_PAIRS['に-vs-で'];
  CONFUSION_PAIRS['で-vs-に'] = CONFUSION_PAIRS['に-vs-で'];
  CONFUSION_PAIRS['de-vs-ni'] = CONFUSION_PAIRS['に-vs-で'];

  CONFUSION_PAIRS['ni-vs-e'] = CONFUSION_PAIRS['に-vs-へ'];
  CONFUSION_PAIRS['ni-vs-he'] = CONFUSION_PAIRS['に-vs-へ'];
  CONFUSION_PAIRS['へ-vs-に'] = CONFUSION_PAIRS['に-vs-へ'];
  CONFUSION_PAIRS['e-vs-ni'] = CONFUSION_PAIRS['に-vs-へ'];
  CONFUSION_PAIRS['he-vs-ni'] = CONFUSION_PAIRS['に-vs-へ'];

  CONFUSION_PAIRS['to-vs-ni'] = CONFUSION_PAIRS['と-vs-に'];
  CONFUSION_PAIRS['に-vs-と'] = CONFUSION_PAIRS['と-vs-に'];
  CONFUSION_PAIRS['ni-vs-to'] = CONFUSION_PAIRS['と-vs-に'];

  CONFUSION_PAIRS['dake-vs-shika'] = CONFUSION_PAIRS['だけ-vs-しか'];
  CONFUSION_PAIRS['しか-vs-だけ'] = CONFUSION_PAIRS['だけ-vs-しか'];
  CONFUSION_PAIRS['shika-vs-dake'] = CONFUSION_PAIRS['だけ-vs-しか'];

  CONFUSION_PAIRS['kara-vs-node'] = CONFUSION_PAIRS['から-vs-ので'];
  CONFUSION_PAIRS['ので-vs-から'] = CONFUSION_PAIRS['から-vs-ので'];
  CONFUSION_PAIRS['node-vs-kara'] = CONFUSION_PAIRS['から-vs-ので'];

  CONFUSION_PAIRS['noni-vs-temo'] = CONFUSION_PAIRS['のに-vs-ても'];
  CONFUSION_PAIRS['ても-vs-のに'] = CONFUSION_PAIRS['のに-vs-ても'];
  CONFUSION_PAIRS['temo-vs-noni'] = CONFUSION_PAIRS['のに-vs-ても'];

  CONFUSION_PAIRS['yori-vs-hodo'] = CONFUSION_PAIRS['より-vs-ほど'];
  CONFUSION_PAIRS['ほど-vs-より'] = CONFUSION_PAIRS['より-vs-ほど'];
  CONFUSION_PAIRS['hodo-vs-yori'] = CONFUSION_PAIRS['より-vs-ほど'];

  CONFUSION_PAIRS['sae-vs-koso'] = CONFUSION_PAIRS['さえ-vs-こそ'];
  CONFUSION_PAIRS['こそ-vs-さえ'] = CONFUSION_PAIRS['さえ-vs-こそ'];
  CONFUSION_PAIRS['koso-vs-sae'] = CONFUSION_PAIRS['さえ-vs-こそ'];

  CONFUSION_PAIRS['kurai-vs-hodo'] = CONFUSION_PAIRS['くらい-vs-ほど'];
  CONFUSION_PAIRS['ほど-vs-くらい'] = CONFUSION_PAIRS['くらい-vs-ほど'];
  CONFUSION_PAIRS['hodo-vs-kurai'] = CONFUSION_PAIRS['くらい-vs-ほど'];

  // ──────────────────────────────────────────────
  // §5  L1 INDONESIAN ERROR DIAGNOSTIC RULES
  // ──────────────────────────────────────────────

  var DIAGNOSTIC_RULES = [
    {
      id: 'rule-de-sumu',
      trigger: function (particle, verb) {
        return particle === 'で' && ['住む', 'すむ', '住んでいます', 'すんでいます', '住んで', 'すんで', '住み', 'すみ', '泊まる', 'とまる', '泊まり', 'とまり', 'ある', 'いる', 'あります', 'います'].some(function (v) { return verb.includes(v); });
      },
      severity: 'error',
      correction: 'に',
      explanation: 'Verba eksistensi atau menetap (住む, 泊まる, ある, いる) wajib menggunakan partikel "に", bukan "で".',
      bad_example: 'バリ島で住んでいます。',
      good_example: 'バリ島に住んでいます。'
    },
    {
      id: 'rule-ni-action',
      trigger: function (particle, verb) {
        return particle === 'に' && /(勉強|食べ|働|遊|泳|買|走|読|話|作|歌|寝)/.test(verb) && !/(行[くき]|来[るき]|帰[るり])/.test(verb);
      },
      severity: 'error',
      correction: 'で',
      explanation: 'Aktivitas dinamis yang dilakukan di suatu lokasi arena wajib menggunakan partikel "で", bukan "に".',
      bad_example: '図書館に勉強します。',
      good_example: '図書館で勉強します。'
    },
    {
      id: 'rule-o-noru',
      trigger: function (particle, verb) {
        return particle === 'を' && ['乗る', 'のる', '乗ります', 'のります', '乗って', 'のって', '乗り', 'のり'].some(function (v) { return verb.includes(v); });
      },
      severity: 'error',
      correction: 'に',
      explanation: 'Naik ke dalam kendaraan menggunakan partikel target kedatangan "に", bukan "を".',
      bad_example: '電車を乗ります。',
      good_example: '電車に乗ります。'
    },
    {
      id: 'rule-o-potential',
      trigger: function (particle, verb) {
        return particle === 'を' && (/(話せ|読め|書け|行け|飲め|食べられ|見られ|でき|弾け|作れ|泳げ|買え|待て|取れ|走れ)/.test(verb) || /([えれけせてねべめげぜ]る|[えれけせてねべめげぜ]ます)/.test(verb) || ['好き', '嫌い', '上手', '下手', '欲しい', '分かる', 'わかる', 'わかります'].some(function (v) { return verb.includes(v); }));
      },
      severity: 'warning',
      correction: 'が',
      explanation: 'Untuk verba potensial (kemampuan) dan adjektiva rasa/keinginan, objek standar dalam bahasa Jepang ditandai dengan "が", bukan "を".',
      bad_example: '日本語を話せます。',
      good_example: '日本語が話せます。'
    },
    {
      id: 'rule-shika-positive',
      trigger: function (particle, verb) {
        return particle === 'しか' && !/ない|ません|なかった|ませんでした|ず|ぬ/.test(verb);
      },
      severity: 'error',
      correction: 'だけ (atau ubah verba menjadi negatif)',
      explanation: 'Partikel "しか" mutlak wajib berpasangan dengan verba bentuk negatif (しか...ない). Jika ingin kalimat positif gunakan "だけ".',
      bad_example: '千円しかあります。',
      good_example: '千円しかありません。 / 千円だけあります。'
    },
    {
      id: 'rule-o-aimasu',
      trigger: function (particle, verb) {
        return particle === 'を' && (/(会う|あう|会います|あいます|会った|あった)/.test(verb) || /(結婚|相談|けんか)/.test(verb));
      },
      severity: 'error',
      correction: 'と (atau に)',
      explanation: 'Bertemu atau berinteraksi timbal balik dengan seseorang menggunakan partikel "と" atau "に", tidak boleh menggunakan "を".',
      bad_example: '友達を会います。',
      good_example: '友達と会います。 / 友達に会います。'
    },
    {
      id: 'rule-kara-exit',
      trigger: function (particle, verb) {
        return particle === 'から' && /(降りる|降ります|おりる|おります|出る|出ます|でる|でます|卒業)/.test(verb);
      },
      severity: 'warning',
      correction: 'を',
      explanation: 'Turun dari kendaraan atau keluar dari ruangan dalam bahasa Jepang standar menggunakan partikel "を", bukan "から".',
      bad_example: '電車から降ります。',
      good_example: '電車を降ります。'
    },
    {
      id: 'rule-relative-time-ni',
      trigger: function (particle, contextWord) {
        return particle === 'に' && ['今日', 'きょう', '明日', 'あした', 'きのう', '昨日', '毎日', 'まいにち', '今', 'いま', '来週', 'らいしゅう', '去年', 'きょねん', '来年', 'らいねん'].includes(contextWord);
      },
      severity: 'error',
      correction: '(tanpa partikel に)',
      explanation: 'Keterangan waktu relatif tanpa angka pasti (今日, 明日, 毎日, 去年, dll.) TIDAK BOLEH diikuti partikel "に".',
      bad_example: '明日に会いましょう。',
      good_example: '明日会いましょう。'
    },
    {
      id: 'rule-node-command',
      trigger: function (particle, verb) {
        return particle === 'ので' && /(なさい|てください|ましょう|ろ$|よ$|くれ|な$)/.test(verb);
      },
      severity: 'warning',
      correction: 'から',
      explanation: 'Klausa akhir yang berupa perintah, ajakan (~ましょう), atau larangan tidak cocok berpasangan dengan "ので". Gunakan "から".',
      bad_example: '雨ですので、傘を持って行きなさい。',
      good_example: '雨ですから、傘を持って行きなさい。'
    },
    {
      id: 'rule-dake-negative-complaint',
      trigger: function (particle, verb) {
        return particle === 'だけ' && /ありません|ない/.test(verb);
      },
      severity: 'info',
      correction: 'しか...ない (jika ingin bernada mengeluh)',
      explanation: 'Jika Anda bermaksud mengeluh bahwa jumlahnya sedikit/kurang, gunakan "しか" (千円しかありません). "だけありません" bermakna harfiah "hanya hal itu yang tidak ada".',
      bad_example: '千円だけありません。（maksudnya: cuma ada seribu）',
      good_example: '千円しかありません。'
    }
  ];

  // ──────────────────────────────────────────────
  // §6  MORPHOLOGICAL TOKENIZER & LEXICON GUARD
  // ──────────────────────────────────────────────

  // High-frequency Japanese words that contain particle characters (は, が, の, に, で, と, へ, も, て, か)
  // These words MUST NOT be sliced into fake particles!
  var PROTECTED_WORDS = [
    // Greetings & Conversational Phrases
    'おはようございます', 'おはよう', 'こんにちは', 'こんばんは', 'はじめまして',
    'ありがとうございます', 'ありがとう', 'いただきます', 'ごちそうさまでした', 'ごちそうさま',
    'すみません', 'ごめんなさい', 'さようなら', 'はい', 'いいえ', 'どうも', 'どうぞ', 'じゃあ', 'またね',
    // Copula & Inflected Auxiliaries
    'ではありませんでした', 'ではありません', 'じゃありませんでした', 'じゃありません',
    'ではない', 'じゃない', 'でした', 'です', 'だった', 'だ',
    'ます', 'ました', 'ません', 'ませんでした', 'ましょう',
    // Common Hiragana Nouns
    'ごはん', 'あさごはん', 'ひるごはん', 'ばんごはん', 'ゆうはん',
    'てがみ', 'えいが', 'ともだち', 'こども', 'きもの', 'くだもの', 'のみもの', 'たべもの',
    'おにぎり', 'にんじん', 'めがね', 'くるま', 'みず', 'おちゃ', 'おかね',
    'きのう', 'きょう', 'あした', 'あさ', 'ひる', 'よる', 'おてあらい', 'トイレ',
    'たまご', 'さかな', 'にく', 'やさい', 'りんご', 'みかん', 'いぬ', 'ねこ', 'とり',
    'ひと', 'まち', 'いえ', 'へや', 'うみ', 'やま', 'かわ', 'はなび', 'はな',
    'こと', 'もの', 'とき', 'ところ', 'わけ', 'はず', 'つもり',
    // Pronouns & Demonstratives
    'わたし', 'わたくし', 'あなた', 'ぼく', 'おれ', 'かれ', 'かのじょ',
    'これ', 'それ', 'あれ', 'どれ', 'ここ', 'そこ', 'あそこ', 'どこ',
    'だれ', 'どなた', 'なに', 'なん', 'いつ', 'どう', 'どんな',
    'どちら', 'こちら', 'そちら', 'あちら', 'この', 'その', 'あの', 'どの',
    // Adverbs & Common Adjectives
    'おもしろい', 'おもしろかった', 'おもしろくない',
    'かわいい', 'すき', 'すきです', 'きらい', 'じょうず', 'へた', 'しずか', 'にぎやか', 'べんり', 'げんき',
    'たくさん', 'すこし', 'ちょっと', 'とても', 'いつも', 'あまり', 'ぜんぜん',
    'ゆっくり', 'だんだん', 'もっと', 'ずっと', 'すぐ', 'まだ', 'もう', 'いっしょに', 'ひとりで',
    // Common Verbs written in Hiragana
    'かきます', 'かきました', 'かかない', 'かいて', 'かく',
    'たべます', 'たべました', 'たべない', 'たべて', 'たべる',
    'のみます', 'のみました', 'のまない', 'のんで', 'のむ',
    'いきます', 'いきました', 'いかない', 'いって', 'いく',
    'きます', 'きました', 'こない', 'きて', 'くる',
    'します', 'しました', 'しない', 'して', 'する',
    'はなします', 'はなしました', 'はなさない', 'はなして', 'はなす',
    'よみます', 'よみました', 'よまない', 'よんで', 'よむ',
    'みます', 'みました', 'みない', 'みて', 'みる',
    'あそびます', 'あそびました', 'あそばない', 'あそんで', 'あそぶ',
    'かいます', 'かいまして', 'かわない', 'かって', 'かう',
    'まちます', 'まちました', 'またない', 'まって', 'まつ',
    'すみます', 'すみました', 'すまない', 'すんで', 'すむ',
    'わかります', 'わかりました', 'わからない', 'わかる',
    'できます', 'できました', 'できない', 'できる',
    'あります', 'ありました', 'ない', 'ある',
    'います', 'いました', 'いない', 'いる'
  ];

  // Pre-sort protected words by length descending (greedy matching)
  PROTECTED_WORDS.sort(function (a, b) { return b.length - a.length; });

  var PARTICLES_MULTI = Object.keys(COMBINED_PARTICLES).concat([
    'ばかりでなく', 'どころか', 'としては', 'としても', 'にとって', 'に対して', 'によって',
    'を通じて', 'を通して', 'をめぐって', 'からして', 'から見ると', 'からには', 'からといって',
    'にしては', 'にしろ', 'にせよ', 'につけ', 'よりは', 'だけに', 'ばかりか', 'くらいは',
    'ぐらいは', 'ほどは', 'さえも', 'すらも', 'から', 'まで', 'より', 'ほど', 'くらい',
    'ぐらい', 'ばかり', 'さえ', 'すら', 'こそ', 'だけ', 'しか', 'など', 'なんか',
    'なんて', 'ので', 'のに', 'ても', 'でも', 'たら', 'ながら', 'けれど', 'けど'
  ]);
  // Remove duplicates and sort descending
  PARTICLES_MULTI = Array.from(new Set(PARTICLES_MULTI)).sort(function (a, b) { return b.length - a.length; });

  var PARTICLES_SINGLE = ['は', 'が', 'を', 'に', 'で', 'へ', 'と', 'も', 'の', 'か', 'ね', 'よ', 'わ', 'な', 'さ', 'ぞ', 'ぜ'];

  /**
   * Tokenizes a Japanese text into words, copula, particles, punctuation, and HTML tags.
   * Accurately prevents single letters from whole words from being misidentified as particles.
   * @param {string} text
   * @returns {Array<object>} Array of tokens
   */
  function tokenize(text) {
    if (!text || typeof text !== 'string') return [];
    var tokens = [];
    var i = 0;

    while (i < text.length) {
      // 1. Punctuation & Whitespace
      var punctMatch = text.slice(i).match(/^[、。！？\s.,!?…・~〜()「」『』]+/);
      if (punctMatch) {
        tokens.push({ text: punctMatch[0], type: 'punct', start: i });
        i += punctMatch[0].length;
        continue;
      }

      // 2. HTML Tags (pass through safely)
      if (text[i] === '<') {
        var htmlMatch = text.slice(i).match(/^<[^>]+>/);
        if (htmlMatch) {
          tokens.push({ text: htmlMatch[0], type: 'html', start: i });
          i += htmlMatch[0].length;
          continue;
        }
      }

      // 3. Protected Words from Core Lexicon (prevents words like はい, えいが, です from being sliced)
      var matchedWord = null;
      for (var wi = 0; wi < PROTECTED_WORDS.length; wi++) {
        var pw = PROTECTED_WORDS[wi];
        if (text.startsWith(pw, i)) {
          matchedWord = pw;
          break;
        }
      }
      if (matchedWord) {
        tokens.push({
          text: matchedWord,
          type: (matchedWord === 'です' || matchedWord === 'でした' || matchedWord === 'だ' || matchedWord === 'だった') ? 'copula' : 'word',
          start: i
        });
        i += matchedWord.length;
        continue;
      }

      // 4. Katakana sequence
      var kataMatch = text.slice(i).match(/^[\u30A0-\u30FF]+/);
      if (kataMatch) {
        tokens.push({ text: kataMatch[0], type: 'word', start: i });
        i += kataMatch[0].length;
        continue;
      }

      // 5. Kanji processing (Kanji nouns, compound words, okurigana)
      if (/[\u4E00-\u9FFF]/.test(text[i])) {
        var kanjiRun = text.slice(i).match(/^[\u4E00-\u9FFF]+/)[0];
        var afterKanji = text.slice(i + kanjiRun.length);

        // Check name suffixes (〜さん, 〜ちゃん, 〜くん, 〜さま, 〜たち)
        var suffixMatch = afterKanji.match(/^(?:さん|ちゃん|くん|さま|たち|がた)/);
        if (suffixMatch) {
          tokens.push({ text: kanjiRun + suffixMatch[0], type: 'word', start: i });
          i += kanjiRun.length + suffixMatch[0].length;
          continue;
        }

        // Check if immediately followed by a guaranteed particle (particles that can NEVER be okurigana)
        var startsWithParticle = null;
        for (var mi = 0; mi < PARTICLES_MULTI.length; mi++) {
          var mp = PARTICLES_MULTI[mi];
          if (afterKanji.startsWith(mp)) {
            // Guard: のです is の + です, not ので
            if (mp === 'ので' && (afterKanji.startsWith('のです') || afterKanji.startsWith('のでした'))) {
              continue;
            }
            startsWithParticle = mp;
            break;
          }
        }
        if (!startsWithParticle) {
          var guaranteedSingle = ['は', 'を', 'へ', 'も', 'の', 'か', 'ね', 'よ'];
          for (var gi = 0; gi < guaranteedSingle.length; gi++) {
            if (afterKanji.startsWith(guaranteedSingle[gi])) {
              startsWithParticle = guaranteedSingle[gi];
              break;
            }
          }
        }
        if (!startsWithParticle) {
          if (afterKanji.startsWith('が') && !afterKanji.startsWith('がない')) {
            startsWithParticle = 'が';
          } else if (afterKanji.startsWith('で') && !afterKanji.startsWith('です') && !afterKanji.startsWith('でした')) {
            startsWithParticle = 'で';
          } else if (afterKanji.startsWith('に') && !afterKanji.startsWith('にます')) {
            startsWithParticle = 'に';
          } else if (afterKanji.startsWith('と') && !/^[としさせ]/.test(afterKanji.slice(1))) {
            startsWithParticle = 'と';
          }
        }

        if (startsWithParticle) {
          // Kanji is a noun, emit kanji alone
          tokens.push({ text: kanjiRun, type: 'word', start: i });
          i += kanjiRun.length;
          continue;
        }

        // Check if Kanji is a verb or adjective with okurigana
        var verbMatch = text.slice(i).match(/^[\u4E00-\u9FFF]+(?:[ぁ-ん]*?(?:ます|ました|ません|ませんでした|ましょう|たい|たくない|たかった|ている|ています|ていた|ていました|てください|ないでください|ない|なかった|た|て|だ|で|る|う|く|ぐ|す|つ|ぬ|ぶ|む|い|かった|くなかった|くて|ければ))(?=[はがをにでへとものか、。！？\s]|$)/);
        if (verbMatch && verbMatch[0].length > 0) {
          tokens.push({ text: verbMatch[0], type: 'word', start: i });
          i += verbMatch[0].length;
          continue;
        }

        tokens.push({ text: kanjiRun, type: 'word', start: i });
        i += kanjiRun.length;
        continue;
      }

      // 6. Multi-character particles
      var matchedMultiP = null;
      for (var pmi = 0; pmi < PARTICLES_MULTI.length; pmi++) {
        var partMulti = PARTICLES_MULTI[pmi];
        if (text.startsWith(partMulti, i)) {
          // Guard: のです is の + です, not ので
          if (partMulti === 'ので' && (text.startsWith('のです', i) || text.startsWith('のでした', i))) {
            continue;
          }
          matchedMultiP = partMulti;
          break;
        }
      }
      if (matchedMultiP) {
        tokens.push({ text: matchedMultiP, type: 'particle', start: i });
        i += matchedMultiP.length;
        continue;
      }

      // 7. Single particles sitting at word boundaries
      if (PARTICLES_SINGLE.includes(text[i])) {
        tokens.push({ text: text[i], type: 'particle', start: i });
        i++;
        continue;
      }

      // Fallback: single character
      tokens.push({ text: text[i], type: 'char', start: i });
      i++;
    }

    return tokens;
  }

  // ──────────────────────────────────────────────
  // §7  SENTENCE ANALYZER & CONTEXT DISAMBIGUATOR
  // ──────────────────────────────────────────────

  /**
   * Resolves the most likely semantic sense for a particle given surrounding context.
   */
  function resolveLikelySense(p, before, after) {
    var meta = PARTICLES[p];
    if (!meta || !meta.senses || meta.senses.length === 0) return null;

    if (p === 'に') {
      if (/[0-9０-９時分日月年曜頃]/.test(before)) {
        return meta.senses.find(function (s) { return s.sense_id === 'ni-time-point'; }) || meta.senses[0];
      }
      if (/住|すむ|ある|いる|泊ま|座|置/.test(after)) {
        return meta.senses.find(function (s) { return s.sense_id === 'ni-existence'; }) || meta.senses[0];
      }
      if (/行|来|帰|着|入|乗/.test(after)) {
        return meta.senses.find(function (s) { return s.sense_id === 'ni-destination'; }) || meta.senses[0];
      }
      if (/あげる|渡す|貸す|教える|電話|会う/.test(after)) {
        return meta.senses.find(function (s) { return s.sense_id === 'ni-recipient'; }) || meta.senses[0];
      }
    } else if (p === 'で') {
      if (/バス|電車|車|新幹線|自転車|飛行機|船|ペン|箸|日本語|英語/.test(before)) {
        return meta.senses.find(function (s) { return s.sense_id === 'de-means-instrument'; }) || meta.senses[0];
      }
      if (/食べる|飲む|勉強|働く|遊ぶ|買う|見る|読む/.test(after)) {
        return meta.senses.find(function (s) { return s.sense_id === 'de-location-action'; }) || meta.senses[0];
      }
      if (/病気|事故|雨|風邪|理由/.test(before)) {
        return meta.senses.find(function (s) { return s.sense_id === 'de-cause-reason'; }) || meta.senses[0];
      }
    } else if (p === 'を') {
      if (/歩く|走る|飛ぶ|渡る|散歩/.test(after)) {
        return meta.senses.find(function (s) { return s.sense_id === 'o-passage-motion'; }) || meta.senses[0];
      }
      if (/降りる|出る|卒業/.test(after)) {
        return meta.senses.find(function (s) { return s.sense_id === 'o-detachment-exit'; }) || meta.senses[0];
      }
    } else if (p === 'と') {
      if (/一緒|会う|話す|結婚|相談|けんか/.test(after)) {
        return meta.senses.find(function (s) { return s.sense_id === 'to-partner-mutual'; }) || meta.senses[0];
      }
      if (/言う|思う|呼ぶ|書く/.test(after)) {
        return meta.senses.find(function (s) { return s.sense_id === 'to-quotation-target'; }) || meta.senses[0];
      }
    }

    return meta.senses[0];
  }

  /**
   * Scans a Japanese sentence, extracts all genuine particles (without false positives from words),
   * and annotates their contextual sense.
   * @param {string} sentence — Raw Japanese sentence
   * @returns {Array<object>} Array of detected particles with context explanations
   */
  function analyzeSentence(sentence) {
    if (!sentence || typeof sentence !== 'string') return [];
    var tokens = tokenize(sentence);
    var results = [];

    for (var ti = 0; ti < tokens.length; ti++) {
      var tok = tokens[ti];
      if (tok.type !== 'particle') continue;

      var p = tok.text;
      var pos = tok.start;
      var surroundingBefore = sentence.slice(Math.max(0, pos - 4), pos);
      var surroundingAfter = sentence.slice(pos + p.length, Math.min(sentence.length, pos + p.length + 6));

      if (COMBINED_PARTICLES[p]) {
        var cMeta = COMBINED_PARTICLES[p];
        results.push({
          type: 'combined',
          particle: p,
          position: pos,
          components: cMeta.components,
          meaning_id: cMeta.meaning_id,
          summary: cMeta.meaning_id,
          nuance: cMeta.nuance_breakdown,
          rule: cMeta.stacking_rule
        });
      } else if (PARTICLES[p]) {
        var sMeta = PARTICLES[p];
        var bestSense = resolveLikelySense(p, surroundingBefore, surroundingAfter);
        results.push({
          type: 'single',
          particle: p,
          position: pos,
          romaji: sMeta.romaji,
          category: sMeta.category,
          jlpt: sMeta.jlpt,
          overview_id: sMeta.overview_id,
          summary: sMeta.overview_id,
          context_clue: { before: surroundingBefore, after: surroundingAfter },
          primary_sense: bestSense,
          likely_function: bestSense ? bestSense.function_id : sMeta.overview_id
        });
      }
    }

    return results;
  }

  /**
   * Generates safe sentence breakdown HTML with particle highlighting.
   * Protects whole words (like はい, 映画, 手紙, ごはん, です) from being falsely sliced.
   * Preserves existing <b> tags.
   * @param {string} jpHtml
   * @returns {string} HTML string with <span class="bd-particle">
   */
  function breakdownHtml(jpHtml) {
    if (!jpHtml || typeof jpHtml !== 'string') return '';

    // Preserve existing <b> tags with placeholders
    var savedBold = [];
    var rawText = jpHtml.replace(/<b>([\s\S]*?)<\/b>/g, function (_, inner) {
      savedBold.push(inner);
      return '\x00' + (savedBold.length - 1) + '\x00';
    });

    var tokens = tokenize(rawText);
    var out = '';

    for (var ti = 0; ti < tokens.length; ti++) {
      var tok = tokens[ti];
      if (tok.type === 'particle') {
        out += '<span class="bd-particle">' + tok.text + '</span><span class="bd-gap"></span>';
      } else {
        out += tok.text;
      }
    }

    // Restore <b> tags
    out = out.replace(/\x00(\d+)\x00/g, function (_, i) {
      return '<b>' + savedBold[+i] + '</b>';
    });

    return out;
  }

  // ──────────────────────────────────────────────
  // §8  PUBLIC API
  // ──────────────────────────────────────────────

  function lookup(particle) {
    if (!particle) return null;
    var trimmed = particle.trim();
    if (COMBINED_PARTICLES[trimmed]) {
      return Object.assign({ type: 'combined' }, COMBINED_PARTICLES[trimmed]);
    }
    if (PARTICLES[trimmed]) {
      return Object.assign({ type: 'single' }, PARTICLES[trimmed]);
    }
    return null;
  }

  function compare(p1, p2) {
    if (!p1 || !p2) return null;
    var a = p1.trim();
    var b = p2.trim();
    var key1 = a + '-vs-' + b;
    var key2 = b + '-vs-' + a;

    var conf = CONFUSION_PAIRS[key1] || CONFUSION_PAIRS[key2];
    if (conf) return conf;

    // Check romaji aliases
    var meta1 = lookup(a);
    var meta2 = lookup(b);
    var r1 = (meta1 && meta1.romaji) ? meta1.romaji : a;
    var r2 = (meta2 && meta2.romaji) ? meta2.romaji : b;
    var rom1 = r1 + '-vs-' + r2;
    var rom2 = r2 + '-vs-' + r1;
    conf = CONFUSION_PAIRS[rom1] || CONFUSION_PAIRS[rom2];
    if (conf) return conf;

    // Fallback: build dynamic comparison
    if (!meta1 || !meta2) return null;

    return {
      pair: [p1, p2],
      title: p1 + ' vs ' + p2,
      summary: 'Perbandingan karakteristik partikel ' + p1 + ' dan ' + p2 + '.',
      p1_data: meta1,
      p2_data: meta2
    };
  }

  function getCompoundPatterns(particle) {
    if (!particle) return [];
    var p = particle.trim();
    return COMPOUND_GRAMMAR[p] || [];
  }

  function diagnose(particle, verb, contextWord) {
    if (!particle || !verb) return null;
    var p = particle.trim();
    var v = verb.trim();
    var c = contextWord ? contextWord.trim() : '';

    for (var i = 0; i < DIAGNOSTIC_RULES.length; i++) {
      var rule = DIAGNOSTIC_RULES[i];
      if (rule.trigger(p, v, c)) {
        return {
          id: rule.id,
          severity: rule.severity,
          particle: p,
          verb: v,
          correction: rule.correction,
          explanation: rule.explanation,
          bad_example: rule.bad_example,
          good_example: rule.good_example
        };
      }
    }

    return {
      status: 'valid',
      message: 'Kombinasi partikel dan kata kerja sesuai kaidah tata bahasa umum.'
    };
  }

  function listAll() {
    return {
      single: Object.keys(PARTICLES).map(function (k) { return Object.assign({ particle: k }, PARTICLES[k]); }),
      combined: Object.keys(COMBINED_PARTICLES).map(function (k) { return Object.assign({ pattern: k }, COMBINED_PARTICLES[k]); }),
      confusion_pairs: Object.keys(CONFUSION_PAIRS)
    };
  }

  // ──────────────────────────────────────────────
  // §9  EXPORTS
  // ──────────────────────────────────────────────

  var ParticleEngine = {
    lookup: lookup,
    compare: compare,
    getCompoundPatterns: getCompoundPatterns,
    diagnose: diagnose,
    tokenize: tokenize,
    analyzeSentence: analyzeSentence,
    breakdownHtml: breakdownHtml,
    listAll: listAll,
    PARTICLES: PARTICLES,
    COMBINED_PARTICLES: COMBINED_PARTICLES,
    COMPOUND_GRAMMAR: COMPOUND_GRAMMAR,
    CONFUSION_PAIRS: CONFUSION_PAIRS,
    DIAGNOSTIC_RULES: DIAGNOSTIC_RULES
  };

  root.ParticleEngine = ParticleEngine;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ParticleEngine;
  }

  console.log('[particle-engine] Japanese Particle Engine (助詞) v16.2.0 loaded');

})();
