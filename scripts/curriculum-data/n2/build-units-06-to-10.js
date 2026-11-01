// ══════════════════════════════════════════════════════════════════
//  scripts/curriculum-data/n2/build-units-06-to-10.js
//  Bespoke Gold-Standard Curated Content for N2 Units 6–10 (10 Lessons)
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'units-06-to-10.js');

const u06_10 = {
  // ─────────────────────────────────────────────────────────────
  // UNIT 6: Keharusan Normatif, Keterpaksaan Logis & Aturan Bersama
  // ─────────────────────────────────────────────────────────────
  'les-n2-u06-01': {
    pedagogical_framework: {
      what: {
        summary: 'Menguasai ekspresi kepatuhan regulasi institusi: 〜ことになっている (telah menjadi aturan/regulasi baku) dan keterpaksaan rasional: 〜ざるを得ない (terpaksa harus dilakukan demi keselamatan/kepatuhan).',
        canDo: 'Bisa menjelaskan ketentuan SOP kepatuhan data dan mengambil keputusan darurat yang tak terhindarkan dalam audit perusahaan.',
        targetPatterns: [
          'V-dict / V-nai + ことになっている (telah ditetapkan sebagai regulasi/aturan umum)',
          'V-nai + ざるを得ない (terpaksa harus ... tiada pilihan lain)'
        ],
        coreVocabSample: ['きやく', 'じゅんしゅ', 'かんさ', 'ほご', 'きそく', 'しょうにん', 'たいおう', 'けってい']
      },
      sensei_context: {
        sceneIntro: 'Kantor cabang Tokyo saat audit kepatuhan regulasi keselamatan kerja dan perlindungan data. Nakamura (Manajer SDM & Regulasi) meninjau protokol keamanan informasi bersama Budi.',
        dailyMission: 'Gunakan "koto ni natte iru" untuk menegaskan regulasi baku dan "zaru o enai" saat menjelaskan tindakan perbaikan mendesak.',
        whyOrder: 'Di level N2, pembelajar harus mampu membedakan aturan objektif eksternal (koto ni natte iru) dari komitmen personal (koto ni shite iru) dan mengekspresikan keputusan rasional yang tak terelakkan.'
      },
      cultural_notes: {
        title: 'Kepatuhan Regulasi (コンプライアンス遵守) dalam Budaya Korporat Jepang',
        etiquette: 'Menjelaskan aturan dengan frasa "koto ni natte orimasu" terdengar objektif dan profesional, tidak terkesan memaksakan kehendak pribadi kepada lawan bicara.',
        taboos: 'Jangan melanggar ketetapan "koto ni natte iru" tanpa otorisasi tertulis dari bagian kepatuhan hukum (Houmubu).'
      },
      pronunciation_tips: {
        title: 'Artikulasi "Zaru o enai" yang Mengalir',
        moraNote: 'Frasa "za-ru-o-e-na-i" memiliki 6 mora. Lafalkan secara berkesinambungan tanpa jeda tersendat di tengah mora o.',
        soundTip: 'Pada "koto ni natte iru", jaga nada heiban datar tanpa lonjakan aksen mendadak.'
      },
      common_pitfalls: [
        {
          title: 'Tertukar Antara 〜ことになっている (Aturan Institusi) vs 〜ことにしている (Disiplin Pribadi)',
          caseScenario: 'Ingin mengatakan bahwa kantor mewajibkan memakai kartu ID.',
          pitfallWarning: '社員証【しゃいんしょう】を つける ことに しています。 (Artinya disiplin pribadi, bukan aturan kantor)',
          rightSolution: '社員証【しゃいんしょう】を つける ことに なっています。 (Tepat: aturan baku perusahaan)',
          explanation: '〜ことになっている menandakan aturan, jadwal, atau hukum yang ditentukan pihak luar, sedangkan 〜ことにしている adalah kebiasaan pribadi.'
        },
        {
          title: 'Salah Konjugasi pada Verba Suru untuk 〜ざるを得ない',
          caseScenario: 'Mengonjugasikan suru menjadi shizaru o enai.',
          pitfallWarning: '延期【えんき】しざるを えない。 (Bentuk tidak baku)',
          rightSolution: '延期【えんき】せざるを えない。 (Tepat: konjugasi khusus suru -> se-zaru)',
          explanation: 'Verba suru memiliki bentuk konjugasi irregular khusus sebelum ざるを得ない, yaitu せざるを得ない (bukan shizaru).'
        }
      ],
      who_and_when: {
        situational_context: 'Audit kepatuhan tahunan, penjelasan aturan kerja kepada karyawan baru, dan perumusan mitigasi insiden.',
        social_relations: 'Komunikasi formal manajerial antara Manajer SDM (Nakamura) dan staf operasional (Budi).',
        when_not_to_use: 'Jangan gunakan "zaru o enai" untuk hal-hal yang dilakukan dengan sukacita atau atas kemauan sendiri.'
      },
      scenario: {
        title: 'Audit Keamanan Data Server Tokyo',
        setting: 'Ruang Rapat Audit Kepatuhan, Lantai 12 Marunouchi, pukul 09.30',
        narrative: 'Nakamura menginspeksi kepatuhan enkripsi basis data pelanggan pasca pembaruan regulasi privasi.'
      }
    },
    dialogue: [
      {
        id: 'd1',
        speaker: 'Nakamura',
        speakerRole: 'Manajer SDM & Regulasi',
        avatar: '👩‍💼',
        jp: 'ブディさん、新【あたら】しい セキュリティ規約【きやく】では、顧客【こきゃく】データは 全【すべ】て 暗号【あんごう】化【か】して 保管【ほかん】する ことに なっていますよね？',
        furigana: 'ブディさん、新しい セキュリティ規約では、顧客データは 全て 暗号化して 保管する ことに なっていますよね？',
        romaji: 'Budi-san, atarashii sekyuriti kiyaku dewa, kokyaku deeta wa subete angouka shite hokan suru koto ni natte imasu yo ne?',
        idText: 'Budi, berdasarkan regulasi keamanan baru, semua data pelanggan telah ditetapkan untuk disimpan dalam bentuk terenkripsi, bukan?'
      },
      {
        id: 'd2',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: 'はい、中村【なかむら】さん！ 規約【きやく】の 通【とお】り、全【すべ】ての サーバーで 自動【じどう】暗号【あんごう】化【か】を 完了【かんりょう】する ことに なっております。',
        furigana: 'はい、中村さん！ 規約の 通り、全ての サーバーで 自動暗号化を 完了する ことに なっております。',
        romaji: 'Hai, Nakamura-san! Kiyaku no toori, subete no saabaa de jidou angouka o kanryou suru koto ni natte orimasu.',
        idText: 'Ya, Nakamura-san! Sesuai regulasi, telah ditetapkan bahwa enkripsi otomatis diselesaikan di semua server.'
      },
      {
        id: 'd3',
        speaker: 'Nakamura',
        speakerRole: 'Manajer SDM & Regulasi',
        avatar: '👩‍💼',
        jp: '旧型【きゅうがた】サーバーの 移行【いこう】が 遅【おく】れた 場合【ばあい】は、一時的【いちじてき】に システムを 停止【ていし】せざるを 得【え】ませんね。',
        furigana: '旧型サーバーの 移行が 遅れた 場合は、一時的に システムを 停止せざるを 得ませんね。',
        romaji: 'Kyuugata saabaa no ikou ga okureta baai wa, ichijiteki ni shisutemu o teishi sezaru o emasen ne.',
        idText: 'Jika migrasi server model lama terlambat, maka mau tidak mau kita terpaksa harus menghentikan sistem untuk sementara ya.'
      },
      {
        id: 'd4',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: 'はい。停止【ていし】という 事態【じたい】を 避【さ】けるため、今夜【こんや】のうちに 全【すべ】ての バックアップと 移行【いこう】を 完了【かんりょう】させます！',
        furigana: 'はい。停止という 事態を 避けるため、今夜のうちに 全ての バックアップと 移行を 完了させます！',
        romaji: 'Hai. Teishi to iu jitai o sakeru tame, konya no uchi ni subete no bakkuappu to ikou o kanryou sasemasu!',
        idText: 'Ya. Demi menghindari situasi penghentian sistem, saya akan menuntaskan semua pencadangan dan migrasi malam ini juga!'
      }
    ],
    drills: [
      {
        id: 'drill-1',
        type: 'vocab_context',
        instruction: 'Langkah 1 (Arti Kosakata): Apakah makna kontekstual dari kata "規約 (きやく)" dalam tata kelola perusahaan?',
        sentencePrompt: 'Istilah "社内【しゃない】規約【きやく】" bermakna:',
        options: [
          'Ketentuan atau anggaran dasar regulasi resmi perusahaan',
          'Daftar menu makan siang di kantin karyawan',
          'Tiket undian berhadiah akhir tahun kantor',
          'Jadwal libur cuti bersama musim panas'
        ],
        correctAnswer: 'Ketentuan atau anggaran dasar regulasi resmi perusahaan',
        explanation: '"規約 (きやく)" bermakna anggaran dasar, perjanjian regulasi, atau ketentuan formal yang mengikat.',
        diagnosticFeedback: {
          'Daftar menu makan siang di kantin karyawan': 'Salah: Menu makanan adalah 献立 (kondate) atau メニュー.',
          'Tiket undian berhadiah akhir tahun kantor': 'Salah: Undian adalah 抽選 (chuusen) atau 福引 (fukubiki).',
          'Jadwal libur cuti bersama musim panas': 'Salah: Jadwal libur adalah 夏季休暇日程 (kaki kyuuka nittei).'
        }
      },
      {
        id: 'drill-2',
        type: 'cloze',
        instruction: 'Langkah 2 (Pola Kalimat): Lengkapi kalimat dengan pola keterpaksaan rasional yang tidak dapat dihindari:',
        sentencePrompt: '台風【たいふう】の 直撃【ちょくげき】により、明日【あした】の 工場【こうじょう】見学【けんがく】は 中止【ちゅうし】[　　]。',
        options: [
          'せざるを 得【え】ない',
          'しざるを 得【え】ない',
          'する ことに している',
          'した 上【うえ】で ある'
        ],
        correctAnswer: 'せざるを 得【え】ない',
        explanation: 'Untuk verba 中止する, bentuk baku keterpaksaan adalah 中止せざるを得ない (terpaksa harus dibatalkan).',
        diagnosticFeedback: {
          'しざるを 得【え】ない': 'Kekeliruan Morfologi: Verba suru menjadi se-zaru (bukan shi-zaru).',
          'する ことに している': 'Kekeliruan Subjek: 〜ことにしている berarti keputusan santai pribadi, bukan pembatalan darurat bencana alam.',
          'した 上【うえ】で ある': 'Kekeliruan Pola: 〜上で bermakna "setelah menuntaskan prasyarat", tidak pas untuk kalimat deklarasi pembatalan.'
        }
      },
      {
        id: 'drill-3',
        type: 'trap_detect',
        instruction: 'Langkah 3 (Kaidah Aturan Institusi): Manakah kalimat yang menggunakan 〜ことになっている secara tepat?',
        sentencePrompt: 'Pilihlah kalimat yang menggunakan 〜ことになっている dengan makna aturan/jadwal baku:',
        options: [
          'この 部屋【へや】では、靴【くつ】を 脱【ぬ】ぐ ことに なっています。',
          '私【わたし】は 毎朝【まいあさ】 走【はし】る ことに なっています。',
          '昨日【きのう】 買【か】い物【もの】に 行【い】く ことに なっていました。',
          'リンゴが 赤【あか】く なる ことに なっています。'
        ],
        correctAnswer: 'この 部屋【へや】では、靴【くつ】を 脱【ぬ】ぐ ことに なっています。',
        explanation: 'Melepas sepatu di ruangan tertentu adalah aturan/norma institusional objektif, sangat tepat memakai 〜ことになっている.',
        diagnosticFeedback: {
          '私【わたし】は 毎朝【まいあさ】 走【はし】る ことに なっています。': 'Kekeliruan Subjek: Lari pagi adalah kebiasaan pribadi, tepatnya 走ることにしている.',
          '昨日【きのう】 買【か】い物【もの】に 行【い】く ことに なっていました。': 'Kekeliruan Waktu: Rencana belanja kasual masa lalu tidak pas memakai pola aturan institusional.',
          'リンゴが 赤【あか】く なる ことに なっています。': 'Kekeliruan Alami: Fenomena pematangan buah adalah proses biologis alamiah, bukan regulasi manusia.'
        }
      },
      {
        id: 'drill-4',
        type: 'reorder',
        instruction: 'Langkah 4 (Susun Kalimat): Susun potongan frasa berikut menjadi kalimat penegasan kepatuhan:',
        sentencePrompt: 'Susunlah frasa-frasa berikut:',
        options: [
          '顧客【こきゃく】データは 全【すべ】て 暗号【あんごう】化【か】して 保管【ほかん】する ことに なっている',
          '暗号【あんごう】化【か】して 顧客【こきゃく】データは 全【すべ】て 保管【ほかん】する ことに なっている',
          '保管【ほかん】する ことに なっている 顧客【こきゃく】データは 全【すべ】て 暗号【あんごう】化【か】して',
          '顧客【こきゃく】データは ことに なっている 全【すべ】て 暗号【あんごう】化【か】して 保管【ほかん】する'
        ],
        correctAnswer: '顧客【こきゃく】データは 全【すべ】て 暗号【あんごう】化【か】して 保管【ほかん】する ことに なっている',
        explanation: 'Urutan baku: Topik (顧客データは) + kuantor (全て) + verba sambung (暗号化して) + verba inti (保管する) + pola aturan (ことになっている).',
        diagnosticFeedback: {
          '暗号【あんごう】化【か】して 顧客【こきゃく】データは 全【すべ】て 保管【ほかん】する ことに なっている': 'Kekeliruan Topik: Frasa sambung mendahului topik penjelas kalimat.',
          '保管【ほかん】する ことに なっている 顧客【こきゃく】データは 全【すべ】て 暗号【あんごう】化【か】して': 'Kekeliruan Penutup: Predikat diletakkan di awal dan menggantung di akhir frasa te.',
          '顧客【こきゃく】データは ことに なっている 全【すべ】て 暗号【あんごう】化【か】して 保管【ほかん】する': 'Struktur Terputus: Pola penutup memotong di tengah sebelum verba utama.'
        },
        tokens: ['顧客【こきゃく】データは', '全【すべ】て 暗号【あんごう】化【か】して', '保管【ほかん】する', 'ことに なっている'],
        correctOrder: ['0', '1', '2', '3']
      },
      {
        id: 'drill-5',
        type: 'response',
        instruction: 'Langkah 5 (Sikap Proaktif Audit): Saat Nakamura menyatakan: 「旧型サーバーの 移行が 遅れた 場合は、一時的に システムを 停止せざるを 得ませんね」, apa respons terbaik Anda?',
        sentencePrompt: 'Pilihlah tanggapan profesional yang menunjukkan komitmen mitigasi proaktif:',
        options: [
          'はい。停止【ていし】という 事態【じたい】を 避【さ】けるため、今夜【こんや】のうちに 全【すべ】ての バックアップと 移行【いこう】を 完了【かんりょう】させます！',
          'システムが 止【と】まっても 私【わたし】には 関係【かんけい】ないので、好【す】きに 止【と】めてください。',
          '中村【なかむら】さん、セキュリティ規約【きやく】なんて 厳【きび】しすぎて バカバカしいですよ。',
          'サーバーなんて 壊【こわ】れたら 壊【こわ】れたで、新【あたら】しいのを 買【か】えば いいじゃないですか。'
        ],
        correctAnswer: 'はい。停止【ていし】という 事態【じたい】を 避【さ】けるため、今夜【こんや】のうちに 全【すべ】ての バックアップと 移行【いこう】を 完了【かんりょう】させます！',
        explanation: 'Menunjukkan inisiatif mencegah kerugian operasional dan dedikasi menjaga ketersediaan sistem.',
        diagnosticFeedback: {
          'システムが 止【と】まっても 私【わたし】には 関係【かんけい】ないので、好【す】きに 止【と】めてください。': 'Abai & Tidak Bertanggung Jawab: Sikap masa bodoh terhadap kelangsungan sistem membahayakan operasional perusahaan.',
          '中村【なかむら】さん、セキュリティ規約【きやく】なんて 厳【きび】しすぎて バカバカしいですよ。': 'Menghina Regulasi: Menyebut regulasi keamanan konyol adalah pelanggaran berat etika kerja.',
          'サーバーなんて 壊【こわ】れたら 壊【こわ】れたで、新【あたら】しいのを 買【か】えば いいじゃないですか。': 'Meremehkan Aset: Mengabaikan integritas data pelanggan dan menganggap enteng risiko sistem.'
        }
      }
    ]
  },

  'les-n2-u06-02': {
    pedagogical_framework: {
      what: {
        summary: 'Menguasai pelaporan berbasis sumber resmi: 〜によると / 〜によれば (menurut data/laporan resmi) dan ketergantungan kondisi: 〜次第だ / 〜次第です (semuanya bergantung pada...).',
        canDo: 'Bisa mengutip temuan hasil audit ketenagakerjaan dan menjelaskan faktor penentu keberhasilan sertifikasi mutu.',
        targetPatterns: [
          'N + によると / によれば (menurut sumber ...)',
          'N + 次第だ / 次第で (tergantung pada faktor ...)'
        ],
        coreVocabSample: ['かんさ', 'ほうこくしょ', 'けっか', 'ひょうか', 'きじゅん', 'しんさ', 'たいせい', 'どりょく']
      },
      sensei_context: {
        sceneIntro: 'Ruang briefing audit Marunouchi. Nakamura membedah draf laporan sementara dari inspektorat kementerian ketenagakerjaan bersama Budi.',
        dailyMission: 'Kutip temuan audit dengan "chousa kekka ni yoruto" dan tegaskan faktor penentu dengan "korekara no taiou shidai desu".',
        whyOrder: 'Pola ~ni yoruto memperkuat kredibilitas argumentasi dengan menyandarkannya pada fakta empiris, sementara ~shidai da menegaskan bahwa masa depan ditentukan oleh tindakan nyata.'
      },
      cultural_notes: {
        title: 'Pelaporan Berbasis Bukti (エビデンスに基づく報告) dan Ketergantungan Hasil',
        etiquette: 'Menyandarkan laporan pada sumber formal (chousa ni yoruto) mencegah kesan spekulatif. Menutup dengan 〜次第です menunjukkan kesiapan berjuang hingga batas akhir.',
        taboos: 'Jangan menggunakan 〜によると tanpa predikat penutup yang tepat (seperti 〜そうだ atau 〜とのことだ) dalam menyampaikan kabar pihak ketiga.'
      },
      pronunciation_tips: {
        title: 'Intonasi Rujukan Objektif',
        moraNote: 'Pada "ni yoru to", artikulasikan morfem to dengan jeda mikro sebelum memasuki isi kutipan.',
        soundTip: 'Pada "shidai desu", turunkan nada sopan secara mantap.'
      },
      common_pitfalls: [
        {
          title: 'Lupa Predikat Penutup Kabar setelah 〜によると',
          caseScenario: 'Mengutip berita tanpa menambahkan 〜そうだ atau 〜とのことだ di akhir kalimat.',
          pitfallWarning: '天気【てんき】予報【よほう】に よると、明日【あした】は 雨【あめ】だ。 (Terasa kaku/terputus)',
          rightSolution: '天気【てんき】予報【よほう】に よると、明日【あした】は 雨【あめ】だ そうだ。 (Tepat)',
          explanation: 'Dalam ragam formal bahasa Jepang, klausa 〜によると wajib diimbangi predikat kabar angin atau kutipan (〜そうだ / 〜ということだ / 〜とのことだ).'
        },
        {
          title: 'Tertukar Antara 〜次第 (Segera Setelah) vs 〜次第だ (Tergantung Pada)',
          caseScenario: 'Mengartikan "shirabe shidai" sebagai tergantung.',
          pitfallWarning: '結果【けっか】を 調【しら】べ 次第【しだい】です。 (Rancu)',
          rightSolution: '結果【けっか】は 努力【どりょく】 次第【しだい】です。 (Tepat: Nomina + shidai da = tergantung)',
          explanation: 'V-masu + 次第 berarti "segera setelah", sedangkan Nomina + 次第だ berarti "tergantung pada faktor tersebut".'
        }
      ],
      who_and_when: {
        situational_context: 'Penyampaian hasil riset pasar, evaluasi berkala proyek, dan pelaporan berita resmi ke dewan direksi.',
        social_relations: 'Koordinasi strategis antara pimpinan kepatuhan dan analis data.',
        when_not_to_use: 'Jangan gunakan ni yoruto untuk mengutip perasaan batin diri sendiri (seperti "menurut saya sendiri").'
      },
      scenario: {
        title: 'Telaah Temuan Laporan Audit Ketenagakerjaan',
        setting: 'Ruang Arsip Kepatuhan Tokyo, pukul 15.00',
        narrative: 'Nakamura dan Budi menganalisis rekomendasi pengawas ketenagakerjaan mengenai jam kerja lembur.'
      }
    },
    dialogue: [
      {
        id: 'd1',
        speaker: 'Nakamura',
        speakerRole: 'Manajer SDM & Regulasi',
        avatar: '👩‍💼',
        jp: 'ブディさん、外部【がいぶ】監査【かんさ】の 中間【ちゅうかん】報告【ほうこく】書【しょ】に よると、現場【げんば】の 労務【ろうむ】管理【かんり】は 高【たか】く 評価【ひょうか】されている そうですよ。',
        furigana: 'ブディさん、外部監査の 中間報告書に よると、現場の 労務管理は 高く 評価されている そうですよ。',
        romaji: 'Budi-san, gaibu kansa no chuukan houkokusho ni yoru to, gemba no roumu kanri wa takaku hyouka sarete iru sou desu yo.',
        idText: 'Budi, menurut laporan sementara audit eksternal, manajemen ketenagakerjaan lapangan kita dinilai sangat tinggi lho.'
      },
      {
        id: 'd2',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: '本当【ほんとう】ですか！ チーム全員【ぜんいん】で 労働【ろうどう】時間【じかん】の 遵守【じゅんしゅ】に 努【つと】めてきた 甲斐【かい】が ありました。',
        furigana: '本当ですか！ チーム全員で 労働時間の 遵守に 努めてきた 甲斐が ありました。',
        romaji: 'Hontou desu ka! Chiimu zenin de roudou jikan no junshu ni tsutomete kita kai ga arimashita.',
        idText: 'Benarkah! Upaya seluruh tim yang telah berusaha mematuhi jam kerja benar-benar membuahkan hasil berharga.'
      },
      {
        id: 'd3',
        speaker: 'Nakamura',
        speakerRole: 'Manajer SDM & Regulasi',
        avatar: '👩‍💼',
        jp: 'ええ。ただ、最終【さいしゅう】的【てき】な 認定【にんてい】が 得【え】られるか どうかは、今月【こんげつ】の 改善【かいぜん】報告【ほうこく】の 内容【ないよう】次第【しだい】です。',
        furigana: 'ええ。ただ、最終的な 認定が 得られるか どうかは、今月の 改善報告の 内容次第です。',
        romaji: 'Ee. Tada, saishuutekina nintei ga erareru ka dou ka wa, kongetsu no kaizen houkoku no naiyou shidai desu.',
        idText: 'Benar. Namun, apakah sertifikasi akhir bisa diperoleh atau tidak, semuanya tergantung pada isi laporan perbaikan bulan ini.'
      },
      {
        id: 'd4',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: '承知【しょうち】いたしました！ 確実【かくじつ】な 認定【にんてい】取得【しゅとく】に 向【む】けて、データに 基【もと】づく 改善【かいぜん】書【しょ】を 丁寧【ていねい】に まとめてまいります。',
        furigana: '承知いたしました！ 確実な 認定取得に 向けて、データに 基づく 改善書を 丁寧に まとめてまいります。',
        romaji: 'Shouchi itashimashita! Kakujitsuna nintei shutoku ni mukete, deeta ni motozuku kaizensho o teinei ni matomete mairimasu.',
        idText: 'Dimengerti! Menuju perolehan sertifikasi yang pasti, saya akan menyusun dokumen perbaikan berbasis data dengan saksama.'
      }
    ],
    drills: [
      {
        id: 'drill-1',
        type: 'vocab_context',
        instruction: 'Langkah 1 (Arti Kosakata): Apakah makna kontekstual dari kata "監査 (かんさ)" dalam tata kelola institusi?',
        sentencePrompt: 'Istilah "外部【がいぶ】監査【かんさ】" bermakna:',
        options: [
          'Pemeriksaan kepatuhan resmi oleh auditor independen luar',
          'Pesta perayaan ulang tahun perusahaan di hotel mewah',
          'Pembagian dividen saham kepada pemilik modal',
          'Pemberian hadiah cendera mata kepada tamu asing'
        ],
        correctAnswer: 'Pemeriksaan kepatuhan resmi oleh auditor independen luar',
        explanation: '"監査 (かんさ)" bermakna inspeksi, audit, dan verifikasi independen terhadap kepatuhan regulasi atau keuangan.',
        diagnosticFeedback: {
          'Pesta perayaan ulang tahun perusahaan di hotel mewah': 'Salah: Perayaan adalah 記念式典 (kinen shikiten).',
          'Pembagian dividen saham kepada pemilik modal': 'Salah: Pembagian dividen adalah 配当金の分配 (haitoukin no bumpai).',
          'Pemberian hadiah cendera mata kepada tamu asing': 'Salah: Cendera mata adalah 記念品 (kinenhin) atau お土産 (omiyage).'
        }
      },
      {
        id: 'drill-2',
        type: 'cloze',
        instruction: 'Langkah 2 (Pola Kalimat): Lengkapi kalimat dengan pola yang menyatakan ketergantungan pada suatu faktor kunci:',
        sentencePrompt: '手術【しゅじゅつ】が 成功【せいこう】するか どうかは、医師【いし】の 腕【うで】と 患者【かんじゃ】の 体力【たいりょく】[　　]。',
        options: [
          '次第【しだい】だ',
          'に よると',
          'に 応【おう】じた',
          'せざるを 得【え】ない'
        ],
        correctAnswer: '次第【しだい】だ',
        explanation: 'Nomina + 次第だ menyatakan bahwa hasil sepenuhnya bergantung pada faktor tersebut (tergantung keahlian dokter dan stamina pasien).',
        diagnosticFeedback: {
          'に よると': 'Kekeliruan Pola: 〜によると menyatakan sumber kutipan warta berita, bukan penentu keberhasilan.',
          'に 応【おう】じた': 'Kekeliruan Sintaksis: 〜に応じた membutuhkan nomina setelahnya, sedangkan di sini kalimat berada di posisi predikat penutup.',
          'せざるを 得【え】ない': 'Kekeliruan Nuansa: 〜ざるを得ない menyatakan keterpaksaan tindakan, tidak nyambung dengan frasa bergantung pada.'
        }
      },
      {
        id: 'drill-3',
        type: 'trap_detect',
        instruction: 'Langkah 3 (Kesesuaian Predikat Kutipan): Manakah kalimat yang menggunakan 〜によると secara benar dengan predikat penutupnya?',
        sentencePrompt: 'Pilihlah kalimat yang menggunakan 〜によると secara gramatikal dan berpasangan tepat:',
        options: [
          '新聞【しんぶん】の 報道【ほうどう】に よると、新【あたら】しい 法律【ほうりつ】が 可決【かけつ】された そうだ。',
          '私【わたし】の 考え【かんがえ】に よると、この 案【あん】は 失敗【しっぱい】する。',
          '新聞【しんぶん】の 報道【ほうどう】に よると、明日【あした】 会議【かいぎ】を 始【はじ】めましょう。',
          '彼【かれ】の 話【はなし】に よると、リンゴは 美味【おい】しい です。'
        ],
        correctAnswer: '新聞【しんぶん】の 報道【ほうどう】に よると、新【あたら】しい 法律【ほうりつ】が 可決【かけつ】された そうだ。',
        explanation: '〜によると wajib berpasangan dengan predikat kabar angin/kutipan seperti 〜そうだ atau 〜ということだ.',
        diagnosticFeedback: {
          '私【わたし】の 考え【かんがえ】に よると、この 案【あん】は 失敗【しっぱい】する。': 'Kekeliruan Subjek: 〜によると tidak boleh digunakan untuk pikiran atau opini pribadi diri sendiri (gunakan 私の考えでは).',
          '新聞【しんぶん】の 報道【ほうどう】に よると、明日【あした】 会議【かいぎ】を 始【はじ】めましょう。': 'Kekeliruan Predikat: 〜によると tidak boleh dipadukan dengan ajakan (〜ましょう) atau perintah.',
          '彼【かれ】の 話【はなし】に よると、リンゴは 美味【おい】しい です。': 'Kekeliruan Predikat: Kurang predikat kabar angin (〜そうだ/とのこと) di akhir kalimat.'
        }
      },
      {
        id: 'drill-4',
        type: 'reorder',
        instruction: 'Langkah 4 (Susun Kalimat): Susun frasa-frasa berikut menjadi kalimat pernyataan faktor penentu:',
        sentencePrompt: 'Susunlah frasa-frasa berikut:',
        options: [
          '認定【にんてい】が 得【え】られるかは 改善【かいぜん】報告【ほうこく】の 内容【ないよう】次第【しだい】です',
          '改善【かいぜん】報告【ほうこく】の 認定【にんてい】が 得【え】られるかは 内容【ないよう】次第【しだい】です',
          '内容【ないよう】次第【しだい】です 認定【にんてい】が 得【え】られるかは 改善【かいぜん】報告【ほうこく】の',
          '得【え】られるかは 認定【にんてい】が 改善【かいぜん】報告【ほうこく】の 内容【ないよう】次第【しだい】です'
        ],
        correctAnswer: '認定【にんてい】が 得【え】られるかは 改善【かいぜん】報告【ほうこく】の 内容【ないよう】次第【しだい】です',
        explanation: 'Urutan baku: Topik klausa bersyarat (認定が得られるかは) + nomina penentu (改善報告の内容) + predikat penutup (次第です).',
        diagnosticFeedback: {
          '改善【かいぜん】報告【ほうこく】の 認定【にんてい】が 得【え】られるかは 内容【ないよう】次第【しだい】です': 'Kekeliruan Modifikasi: Frasa modifikasi "kaizen houkoku no" terpisah dari objeknya "naiyou".',
          '内容【ないよう】次第【しだい】です 認定【にんてい】が 得【え】られるかは 改善【かいぜん】報告【ほうこく】の': 'Predikat Terbalik: Meletakkan predikat di awal kalimat.',
          '得【え】られるかは 認定【にんてい】が 改善【かいぜん】報告【ほうこく】の 内容【ないよう】次第【しだい】です': 'Subjek Terbalik: Verba ditaruh sebelum subjek partikel ga.'
        },
        tokens: ['認定【にんてい】が', '得【え】られるかは', '改善【かいぜん】報告【ほうこく】の', '内容【ないよう】次第【しだい】です'],
        correctOrder: ['0', '1', '2', '3']
      },
      {
        id: 'drill-5',
        type: 'response',
        instruction: 'Langkah 5 (Komitmen Menuntaskan): Saat Nakamura menyampaikan: 「最終的な 認定が 得られるか どうかは、今月の 改善報告の 内容次第です」, apa respons terbaik Anda?',
        sentencePrompt: 'Pilihlah tanggapan yang menunjukkan kesungguhan dan profesionalisme tinggi:',
        options: [
          '承知【しょうち】いたしました！ 確実【かくじつ】な 認定【にんてい】取得【しゅとく】に 向【む】けて、データに 基【もと】づく 改善【かいぜん】書【しょ】を 丁寧【ていねい】に まとめてまいります。',
          '監査【かんさ】なんて どうでもいいので、適当【てきとう】に 数字【すうじ】を でっち上【あ】げて 提出【ていしゅつ】しておきますね。',
          'どうせ 認可【にんか】なんて 取【と】れませんから、今【いま】から 諦【あきら】めて 飲【の】みに 行【い】きましょう。',
          '私【わたし】の せいじゃありません。中村【なかむら】さんが 一人【ひとり】で レポートを 書【か】いてください。'
        ],
        correctAnswer: '承知【しょうち】いたしました！ 確実【かくじつ】な 認定【にんてい】取得【しゅとく】に 向【む】けて、データに 基【もと】づく 改善【かいぜん】書【しょ】を 丁寧【ていねい】に まとめてまいります。',
        explanation: 'Menunjukkan komitmen terhadap integritas data dan tekad mengamankan sertifikasi bagi tim.',
        diagnosticFeedback: {
          '監査【かんさ】なんて どうでもいいので、適当【てきとう】に 数字【すうじ】を でっち上【あ】げて 提出【ていしゅつ】しておきますね。': 'Pemalsuan Data: Memalsukan angka dalam audit adalah tindak pidana fatal dalam bisnis.',
          'どうせ 認可【にんか】なんて 取【と】れませんから、今【いま】から 諦【あきら】めて 飲【の】みに 行【い】きましょう。': 'Defaitis & Malas: Menyerah sebelum berjuang merusak reputasi seluruh divisi SDM.',
          '私【わたし】の せいじゃありません。中村【なかむら】さんが 一人【ひとり】で レポートを 書【か】いてください。': 'Melempar Tugas: Menolak bekerja sama dengan manajer sangat tidak pantas.'
        }
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // UNIT 7: Penilaian Subjektif, Hakikat Alami & Kesan Mendalam
  // ─────────────────────────────────────────────────────────────
  'les-n2-u07-01': {
    pedagogical_framework: {
      what: {
        summary: 'Menguasai ungkapan apresiasi berbobot estetis: 〜ものがある (memiliki sisi yang sangat terasa berbobot/mengagumkan) dan batasan kepantasan etis: 〜ものではない (tidak selayaknya dilakukan secara moral/etis).',
        canDo: 'Bisa mengevaluasi karya inovasi arsitektur ramah lingkungan dan mengingatkan batasan etika penghematan biaya produksi.',
        targetPatterns: [
          'A-i / Na-na / V-dict + ものがある (memiliki daya tarik / nuansa yang sangat terasa)',
          'V-dict + ものではない (tidak selayaknya ... tidak patut secara etis)'
        ],
        coreVocabSample: ['せんれん', 'くふう', 'はいりょ', 'かんせい', 'びとく', 'ひょうげん', 'ちょうわ', 'せっけい']
      },
      sensei_context: {
        sceneIntro: 'Studio evaluasi desain produk ramah lingkungan di Shibuya. Sakura (Konsultan Manajemen) meninjau maket paviliun bambu berkelanjutan bersama Budi.',
        dailyMission: 'Gunakan "mono ga aru" untuk memuji kecanggihan konsep desain dan "mono dewa nai" untuk menjaga integritas standar keselamatan.',
        whyOrder: 'Pola ~mono ga aru memberikan kedalaman apresiasi kultural tingkat menengah-atas (kepekaan rasa), sementara ~mono dewa nai adalah rambu etis yang membimbing batasan profesional.'
      },
      cultural_notes: {
        title: 'Apresiasi Bernuansa (深みのある評価) dan Batasan Kepantasan (品格と倫理)',
        etiquette: 'Dalam dunia desain Jepang, memuji dengan "miryoku-teki na mono ga arimasu" terdengar jauh lebih elegan dan berwibawa daripada sekadar mengatakan "sugoi desu".',
        taboos: 'Hindari memakai 〜ものではない untuk menggurui atasan secara langsung di forum publik karena terdengar seperti mendikte moralitas lawan bicara.'
      },
      pronunciation_tips: {
        title: 'Intonasi Penilaian Berbobot',
        moraNote: 'Pada "mono ga aru", lafalkan mo-no-ga-a-ru dengan tempo tenang mengalir tanpa aksen mendesak.',
        soundTip: 'Pada "mono dewa nai", beri sedikit penekanan tegas pada de-wa untuk menandai keteguhan prinsip etis.'
      },
      common_pitfalls: [
        {
          title: 'Tertukar Antara 〜ものがある (Kesan Mendalam) vs 〜ことだ (Perintah Halus)',
          caseScenario: 'Ingin mengungkapkan rasa kagum tetapi memakai kotoda.',
          pitfallWarning: '彼【かれ】の 努力【どりょく】には 感心【かんしん】する ことだ。 (Terdengar seperti nasihat menggurui)',
          rightSolution: '彼【かれ】の 努力【どりょく】には 感心【かんしん】する ものが ある。 (Tepat: kesan mendalam yang dirasakan pembicara)',
          explanation: '〜ものがある mencerminkan resonansi batin subjektif yang mendalam atas suatu kenyataan (memiliki sisi yang membuat kagum).'
        },
        {
          title: 'Memakai 〜ものではない untuk Larangan Fisik Sederhana',
          caseScenario: 'Memakai mono dewa nai untuk larangan membuang sampah biasa.',
          pitfallWarning: 'ここには ゴミを 捨【す】てる ものではない。 (Terlalu berlebihan/filosofis)',
          rightSolution: '約束【やくそく】を 破【やぶ】る ものではない。 (Tepat: menyangkut moralitas kepantasan)',
          explanation: '〜ものではない khusus digunakan untuk norma moral, akal sehat umum, atau etika perilaku manusia, bukan rambu larangan teknis.'
        }
      ],
      who_and_when: {
        situational_context: 'Pameran karya arsitektur, ulasan desain produk, editorial majalah industri, dan diskusi etika bisnis.',
        social_relations: 'Apresiasi estetik kolegial antara konsultan desain senior (Sakura) dan praktisi inovasi (Budi).',
        when_not_to_use: 'Jangan gunakan pada hal-hal sepele yang tidak memiliki bobot penilaian rasa atau moral.'
      },
      scenario: {
        title: 'Evaluasi Maket Paviliun Ramah Lingkungan Shibuya',
        setting: 'Studio Desain Shibuya, Lantai 5, pukul 11.30',
        narrative: 'Sakura mengagumi struktur lengkung kayu maket Budi yang memadukan teknik tradisional Jepang dan bambu Nusantara.'
      }
    },
    dialogue: [
      {
        id: 'd1',
        speaker: 'Sakura',
        speakerRole: 'Konsultan Manajemen',
        avatar: '👩‍🏫',
        jp: 'ブディさん、この 竹【たけ】と 木材【もくざい】を 融合【ゆうごう】させた デザインには、目【め】を 見張【みは】る ものが ありますね！',
        furigana: 'ブディさん、この 竹と 木材を 融合させた デザインには、目を 見張る ものが ありますね！',
        romaji: 'Budi-san, kono take to mokuzai o yuugou saseta dezain ni wa, me o miharu mono ga arimasu ne!',
        idText: 'Budi, pada desain yang memadukan bambu dan kayu ini, benar-benar ada sisi yang membuat mata terkesima ya!'
      },
      {
        id: 'd2',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: 'ありがとうございます！ 日本【にほん】の 伝統【でんとう】工法【こうほう】と インドネシアの 素材【そざい】の 調和【ちょうわ】を 意識【いしき】して 設計【せっけい】いたしました。',
        furigana: 'ありがとうございます！ 日本の 伝統工法と インドネシアの 素材の 調和を 意識して 設計いたしました。',
        romaji: 'Arigatou gozaimasu! Nihon no dentou kouhou to Indoneshia no sozai no chouwa o ishiki shite sekkei itashimashita.',
        idText: 'Terima kasih banyak! Saya merancangnya dengan penuh kesadaran akan keselarasan antara teknik tradisional Jepang dan material Indonesia.'
      },
      {
        id: 'd3',
        speaker: 'Sakura',
        speakerRole: 'Konsultan Manajemen',
        avatar: '👩‍🏫',
        jp: '素晴【すば】らしいです。ただ、コスト削減【さくげん】のために 強度【きょうど】計算【けいさん】を 妥協【だきょう】する ような ことは、プロとして 決【けっ】して すべきもの【もの】では ありませんよ。',
        furigana: '素晴らしいです。ただ、コスト削減のために 強度計算を 妥協する ような ことは、プロとして 決して すべきものでは ありませんよ。',
        romaji: 'Subarashii desu. Tada, kosuto sakugen no tame ni kyoudo keisan o dakyou suru youna koto wa, puro to shite kesshite subeki mono dewa arimasen yo.',
        idText: 'Luar biasa. Namun, hal seperti mengorbankan perhitungan kekuatan struktur demi pemotongan biaya sama sekali bukanlah hal yang layak dilakukan sebagai profesional.'
      },
      {
        id: 'd4',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: 'もちろんです！ 美【うつく】しさと 同時【どうじ】に 耐震【たいしん】基準【きじゅん】を 完璧【かんぺき】に 満【み】たすよう、厳格【げんかく】に 検証【けんしょう】を 重【かさ】ねてまいります。',
        furigana: 'もちろんです！ 美しさと 同時に 耐震基準を 完璧に 満たすよう、厳格に 検証を 重ねてまいります。',
        romaji: 'Mochiron desu! Utsukushisa to douji ni taishin kijun o kampeki ni mitasu you, genkaku ni kenshou o kasanete mairimasu.',
        idText: 'Tentu saja! Bersamaan dengan keindahan, saya akan melakukan verifikasi ketat berulang kali agar memenuhi standar ketahanan gempa secara sempurna.'
      }
    ],
    drills: [
      {
        id: 'drill-1',
        type: 'vocab_context',
        instruction: 'Langkah 1 (Arti Kosakata): Apakah makna kontekstual dari kata "洗練 (せんれん)" dalam dunia kreasi arsitektur?',
        sentencePrompt: 'Istilah "洗練【せんれん】された デザイン" bermakna:',
        options: [
          'Desain yang terpoles elegan, matang, dan bebas dari elemen kasar',
          'Desain murahan yang dibuat dalam waktu sepuluh menit',
          'Pencoretan gambar sketsa dengan spidol hitam secara kasar',
          'Penjualan barang rongsokan di pasar loak kota'
        ],
        correctAnswer: 'Desain yang terpoles elegan, matang, dan bebas dari elemen kasar',
        explanation: '"洗練 (せんれん)" bermakna keanggunan yang terasah, estetika yang matang, dan kepiawaian seni yang tinggi.',
        diagnosticFeedback: {
          'Desain murahan yang dibuat dalam waktu sepuluh menit': 'Salah: Karya instan murahan adalah 粗悪品 (soakuhin) atau 安物.',
          'Pencoretan gambar sketsa dengan spidol hitam secara kasar': 'Salah: Coretan kasar adalah 落書き (rakugaki) atau 乱筆.',
          'Penjualan barang rongsokan di pasar loak kota': 'Salah: Barang loak adalah 骨董品 (kottouhin) atau ガラクタ.'
        }
      },
      {
        id: 'drill-2',
        type: 'cloze',
        instruction: 'Langkah 2 (Pola Kalimat): Lengkapi kalimat dengan pola apresiasi mendalam yang berbobot estetis:',
        sentencePrompt: '彼【かれ】の 描【えが】く 水墨【すいぼく】画【が】には、言葉【ことば】では 言【い】い表【あらわ】せない [　　]。',
        options: [
          '深【ふか】い ものが ある',
          '深【ふか】い ものではない',
          '深【ふか】い ことに している',
          '深【ふか】い わけには いかない'
        ],
        correctAnswer: '深【ふか】い ものが ある',
        explanation: 'A-i + ものがある menyatakan adanya keindahan/kedalaman yang sangat terasa di hati pembicara.',
        diagnosticFeedback: {
          '深【ふか】い ものではない': 'Kekeliruan Makna: 〜ものではない menyatakan larangan moral, tidak cocok untuk apresiasi seni.',
          '深【ふか】い ことに している': 'Kekeliruan Pola: 〜ことにしている berarti tekad disiplin diri, tidak nyambung dengan sifat lukisan.',
          '深【ふか】い わけには いかない': 'Kekeliruan Pola: 〜わけにはいかない menyatakan batasan kewajiban sosial, tidak pas untuk mendeskripsikan estetika.'
        }
      },
      {
        id: 'drill-3',
        type: 'trap_detect',
        instruction: 'Langkah 3 (Kaidah Kepantasan Etis): Manakah kalimat yang menggunakan 〜ものではない secara tepat?',
        sentencePrompt: 'Pilihlah kalimat yang menggunakan 〜ものではない dengan nuansa etika yang benar:',
        options: [
          '人【ひと】の 悪口【わるくち】を 陰【かげ】で 言【い】う ものではない。',
          '疲【つか】れたときは、無理【むり】して 走【はし】る ものが ある。',
          '明日【あした】は 楽【たの】しい 旅行【りょこう】に 行【い】く ものではない。',
          'お腹【なか】が 空【す】いたから、ご飯【はん】を 食【た】べる ものではない。'
        ],
        correctAnswer: '人【ひと】の 悪口【わるくち】を 陰【かげ】で 言【い】う ものではない。',
        explanation: 'Membicarakan keburukan orang lain di belakang adalah pelanggaran norma etika/kepantasan umum, sangat pas memakai 〜ものではない.',
        diagnosticFeedback: {
          '疲【つか】れたときは、無理【むり】して 走【はし】る ものが ある。': 'Kekeliruan Pola: Di sini dibutuhkan larangan/nasihat (hashiru mono dewa nai), bukan mono ga aru.',
          '明日【あした】は 楽【たの】しい 旅行【りょこう】に 行【い】く ものではない。': 'Kekeliruan Konteks: Berlibur bukanlah perbuatan terlarang secara etis.',
          'お腹【なか】が 空【す】いたから、ご飯【はん】を 食【た】べる ものではない。': 'Kekeliruan Logika: Makan saat lapar adalah kebutuhan fisiologis normal, bukan larangan moral.'
        }
      },
      {
        id: 'drill-4',
        type: 'reorder',
        instruction: 'Langkah 4 (Susun Kalimat): Susun potongan frasa berikut menjadi kalimat apresiasi desain:',
        sentencePrompt: 'Susunlah frasa-frasa berikut:',
        options: [
          'この デザインには 目【め】を 見張【みは】る ものが ありますね',
          '目【め】を 見張【みは】る この デザインには ありますね ものが',
          'ものが ありますね この デザインには 目【め】を 見張【みは】る',
          'この デザインには ありますね ものが 目【め】を 見張【みは】る'
        ],
        correctAnswer: 'この デザインには 目【め】を 見張【みは】る ものが ありますね',
        explanation: 'Urutan baku: Frasa topik objek apresiasi (このデザインには) + idiom verba (目を見張る) + pola penutup rasa (ものがありますね).',
        diagnosticFeedback: {
          '目【め】を 見張【みは】る この デザインには ありますね ものが': 'Kekeliruan Urutan: Pola penutup terpisah dan terlempar acak.',
          'ものが ありますね この デザインには 目【め】を 見張【みは】る': 'Predikat di Depan: Meletakkan predikat rasa sebelum subjek penjelas.',
          'この デザインには ありますね ものが 目【め】を 見張【みは】る': 'Verba Terbalik: Verba modifikasi arimasu ditaruh mendahului nomina mono.'
        },
        tokens: ['この デザインには', '目【め】を 見張【みは】る', 'ものが', 'ありますね'],
        correctOrder: ['0', '1', '2', '3']
      },
      {
        id: 'drill-5',
        type: 'response',
        instruction: 'Langkah 5 (Komitmen Mutu & Etika): Saat Sakura mengingatkan: 「コスト削減のために 強度計算を 妥協するようなことは、プロとして 決して すべきものではありませんよ」, apa respons terbaik Anda?',
        sentencePrompt: 'Pilihlah tanggapan yang menunjukkan kepatuhan etis tertinggi:',
        options: [
          'もちろんです！ 美【うつく】しさと 同時【どうじ】に 耐震【たいしん】基準【きじゅん】を 完璧【かんぺき】に 満【み】たすよう、厳格【げんかく】に 検証【けんしょう】を 重【かさ】ねてまいります。',
          'バレなければ 大丈夫【だいじょうぶ】ですよ。柱【はしら】を 半分【はんぶん】に 削【けず】って 浮【う】いた お金【かね】で 焼肉【やきにく】を 食【た】べましょう！',
          '強度【きょうど】なんて どうでもいいです。見【み】た目【め】さえ カッコよければ お客【きゃく】さんは 騙【だま】せますから。',
          'さくらさん、そんな 面倒【めんどう】な 計算【けいさん】、自分【じぶん】で やれば いいじゃないですか。'
        ],
        correctAnswer: 'もちろんです！ 美【うつく】しさと 同時【どうじ】に 耐震【たいしん】基準【きじゅん】を 完璧【かんぺき】に 満【み】たすよう、厳格【げんかく】に 検証【けんしょう】を 重【かさ】ねてまいります。',
        explanation: 'Menjunjung tinggi standar keselamatan publik dan menolak kompromi mutu demi keuntungan sepihak.',
        diagnosticFeedback: {
          'バレなければ 大丈夫【だいじょうぶ】ですよ。柱【はしら】を 半分【はんぶん】に 削【けず】って 浮【う】いた お金【かね】で 焼肉【やきにく】を 食【た】べましょう！': 'Kriminal & Fatal: Mengurangi struktur penyangga gedung membahayakan nyawa manusia dan merupakan kejahatan.',
          '強度【きょうど】なんて どうでもいいです。見【み】た目【め】さえ カッコよければ お客【きゃく】さんは 騙【だま】せますから。': 'Penipuan Konsumen: Niat menipu pelanggan merusak seluruh kehormatan profesi arsitek.',
          'さくらさん、そんな 面倒【めんどう】な 計算【けいさん】、自分【じぶん】で やれば いいじゃないですか。': 'Sikap Pembangkang: Menolak arahan verifikasi keselamatan dari konsultan senior.'
        }
      }
    ]
  },

  'les-n2-u07-02': {
    pedagogical_framework: {
      what: {
        summary: 'Menguasai keyakinan analisis pakar: 〜に相違ない (pasti tak diragukan lagi berakar pada data) dan pengajuan hipotesis persuasif: 〜ではないか / 〜ではないだろうか (bukankah ada kemungkinan / saya meyakini bahwa...).',
        canDo: 'Bisa mempresentasikan proyeksi penerimaan pasar atas inovasi produk dengan argumentasi logis yang meyakinkan investor.',
        targetPatterns: [
          'V / A / Na / N + に相違ない (pasti demikian ... tiada keraguan sedikit pun)',
          'V-plain / N + ではないか / ではないだろうか (bukankah ... mengajukan sudut pandang persuasif)'
        ],
        coreVocabSample: ['かくしん', 'じゅよう', 'みとおし', 'きょうごう', 'ゆういせい', 'ていあん', 'しじょう', 'ふきゅう']
      },
      sensei_context: {
        sceneIntro: 'Ruang presentasi studio Shibuya. Sakura mendengarkan pemaparan Budi mengenai analisis proyeksi penjualan furnitur bambu ramah lingkungan ke pasar perkantoran Tokyo.',
        dailyMission: 'Gunakan "ni soui nai" untuk menegaskan keunggulan komparatif produk dan ajukan hipotesis ekspansi dengan "de wa nai darou ka".',
        whyOrder: 'Dalam wacana formal N2, meyakinkan pemangku kepentingan membutuhkan perpaduan antara kepastian berbasis data (ni soui nai) dan nada diplomatis persuasif (de wa nai ka).'
      },
      cultural_notes: {
        title: 'Keyakinan Berwibawa (確信の表明) dan Retorika Persuasif (説得のレトリック)',
        etiquette: 'Gunakan 〜に相違ない dalam presentasi resmi untuk menunjukkan kepercayaan diri penuh atas riset yang dilakukan.',
        taboos: 'Hindari memakai kalimat bernada mutlak tanpa disertai data lampiran pendukung dalam rapat dewan direksi.'
      },
      pronunciation_tips: {
        title: 'Tempo Penegasan "Ni Soui Nai"',
        moraNote: 'Lafalkan "ni sou-i nai" dengan ritme tegas pada kata sou-i untuk mencerminkan kepastian yang tak tergoyahkan.',
        soundTip: 'Pada "de wa nai darou ka", gunakan intonasi naik-turun halus untuk mengundang kesepakatan audiens.'
      },
      common_pitfalls: [
        {
          title: 'Tertukar Antara 〜に相違ない (Ragam Tulisan/Resmi) vs 〜に違いない (Ragam Percakapan Umum)',
          caseScenario: 'Memakai ni soui nai dalam obrolan santai sehari-hari antar teman.',
          pitfallWarning: '明日【あした】 雨【あめ】が 降【ふ】るに 相違【そうい】ない よ。 (Terlalu kaku/arkais untuk obrolan santai)',
          rightSolution: '明日【あした】 雨【あめ】が 降【ふ】るに 違【ちが】いない よ。 (Tepat dalam ragam lisan)',
          explanation: '〜に相違ない adalah padanan formal dan tertulis dari 〜に違いない, sangat tepat dipakai dalam dokumen, pidato resmi, atau laporan bisnis.'
        },
        {
          title: 'Salah Nada Mengira 〜ではないか sebagai Pertanyaan Bingung',
          caseScenario: 'Menganggap de wa nai ka sebagai pertanyaan yang tidak tahu jawabannya.',
          pitfallWarning: 'これ、何【なに】ではないか？ (Salah)',
          rightSolution: '新【あたら】しい チャンスでは ないだろうか。 (Tepat: penegasan pendapat)',
          explanation: 'Pola 〜ではないか / 〜ではないだろうか bukan pertanyaan yang menanti jawaban, melainkan teknik retorika persuasif untuk menyatakan pendapat pembicara sendiri secara halus.'
        }
      ],
      who_and_when: {
        situational_context: 'Presentasi proposal bisnis, analisis kompetitor pasar modal, dan sidang penentuan strategi korporat.',
        social_relations: 'Pemaparan analis bisnis junior di hadapan mitra konsultasi strategis.',
        when_not_to_use: 'Jangan gunakan pada dugaan spekulatif yang sama sekali tidak memiliki dasar fakta empiris.'
      },
      scenario: {
        title: 'Pemaparan Studi Kelayakan Pasar Shibuya',
        setting: 'Ruang Pitching Investor Shibuya, pukul 16.00',
        narrative: 'Budi memaparkan data tren pembelian konsumen generasi muda yang condong memilih material ramah lingkungan.'
      }
    },
    dialogue: [
      {
        id: 'd1',
        speaker: 'Sakura',
        speakerRole: 'Konsultan Manajemen',
        avatar: '👩‍🏫',
        jp: 'ブディさん、若年【じゃくねん】層【そう】の エコ意識【いしき】の 高【たか】まりを 見【み】ると、この 商品【しょうひん】の 需要【じゅよう】は 今後【こんご】さらに 拡大【かくだい】するに 相違【そうい】ありませんね。',
        furigana: 'ブディさん、若年層の エコ意識の 高まりを 見ると、この 商品の 需要は 今後さらに 拡大するに 相違ありませんね。',
        romaji: 'Budi-san, jakunensou no eko ishiki no takamari o miru to, kono shouhin no juyou wa kongo sarani kakudai suru ni soui arimasen ne.',
        idText: 'Budi, melihat meningkatnya kesadaran lingkungan di kalangan generasi muda, permintaan produk ini ke depannya pasti akan semakin meluas tanpa diragukan lagi ya.'
      },
      {
        id: 'd2',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: 'はい、さくらさん！ アンケート調査【ちょうさ】の 結果【けっか】からも、８割【はちわり】以上【いじょう】の 企業【きぎょう】が 導入【どうにゅう】に 前向【まえむ】きであるに 相違【そうい】ありません。',
        furigana: 'はい、さくらさん！ アンケート調査の 結果からも、８割以上の 企業が 導入に 前向きであるに 相違ありません。',
        romaji: 'Hai, Sakura-san! Ankeeto chousa no kekka kara mo, hachiwari ijou no kigyou ga dounyuu ni maemuki de aru ni soui arimasen.',
        idText: 'Ya, Sakura-san! Dari hasil survei kuesioner pun, tak diragukan lagi bahwa lebih dari 80% perusahaan bersikap positif terhadap adopsi produk ini.'
      },
      {
        id: 'd3',
        speaker: 'Sakura',
        speakerRole: 'Konsultan Manajemen',
        avatar: '👩‍🏫',
        jp: 'であれば、オフィス空間【くうかん】向【む】けの パッケージ提案【ていあん】を 同時【どうじ】に 進【すす】めるべきでは ないでしょうか。',
        furigana: 'であれば、オフィス空間向けの パッケージ提案を 同時に 進めるべきでは ないでしょうか。',
        romaji: 'De areba, ofisu kuukan muke no pakkeeji teian o douji ni susumerubeki dewa nai darou ka.',
        idText: 'Jika demikian, bukankah kita selayaknya memajukan proposal paket penataan ruang kantor secara bersamaan?'
      },
      {
        id: 'd4',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: '大変【たいへん】示唆【しさ】に 富【と】む ご提案【ていあん】です！ 早速【さっそく】、法人【ほうじん】向【む】けの カタログ構成【こうせい】案【あん】を 作成【さくせい】いたします。',
        furigana: '大変示唆に 富む ご提案です！ 早速、法人向けの カタログ構成案を 作成いたします。',
        romaji: 'Taihen shisa ni tomu goteian desu! Sassoku, houjin muke no katarogu kouseian o sakusei itashimasu.',
        idText: 'Saran yang sangat kaya akan wawasan! Segera, saya akan menyusun draf struktur katalog khusus untuk korporasi.'
      }
    ],
    drills: [
      {
        id: 'drill-1',
        type: 'vocab_context',
        instruction: 'Langkah 1 (Arti Kosakata): Apakah makna kontekstual dari kata "需要 (じゅよう)" dalam riset bisnis?',
        sentencePrompt: 'Istilah "市場【しじょう】の 需要【じゅよう】" bermakna:',
        options: [
          'Kebutuhan atau permintaan pasar atas barang/jasa tertentu',
          'Penutupan pabrik secara massal akibat pailit',
          'Pembuangan limbah beracun ke sungai',
          'Keterlambatan pengiriman paket pos internasional'
        ],
        correctAnswer: 'Kebutuhan atau permintaan pasar atas barang/jasa tertentu',
        explanation: '"需要 (じゅよう)" bermakna permintaan pasar (demand), berlawanan dengan penawaran (供給 - kyoukyuu).',
        diagnosticFeedback: {
          'Penutupan pabrik secara massal akibat pailit': 'Salah: Pailit adalah 倒産 (tousan) atau 破産 (hasan).',
          'Pembuangan limbah beracun ke sungai': 'Salah: Pembuangan limbah adalah 産業廃棄物の投棄 (sangyou haikibutsu no touki).',
          'Keterlambatan pengiriman paket pos internasional': 'Salah: Keterlambatan pengiriman adalah 配送遅延 (haisou chien).'
        }
      },
      {
        id: 'drill-2',
        type: 'cloze',
        instruction: 'Langkah 2 (Pola Kalimat): Lengkapi kalimat dengan pola kepastian formal berbasis bukti:',
        sentencePrompt: 'これだけの 証拠【しょうこ】が 揃【そろ】っている 以上【いじょう】、彼【かれ】の 主張【しゅちょう】が 正【ただ】しいに [　　]。',
        options: [
          '相違【そうい】ない',
          'ものがある',
          'ものではない',
          '次第【しだい】だ'
        ],
        correctAnswer: '相違【そうい】ない',
        explanation: '〜に相違ない menyatakan kepastian mutlak yang didukung bukti kuat (pasti benar tanpa keraguan).',
        diagnosticFeedback: {
          'ものがある': 'Kekeliruan Nuansa: 〜ものがある bermakna memiliki kesan mendalam, bukan kesimpulan kepastian fakta.',
          'ものではない': 'Kekeliruan Pola: 〜ものではない menyatakan larangan moral, tidak cocok dengan kata benar (tadashii).',
          '次第【しだい】だ': 'Kekeliruan Makna: 〜次第だ bermakna tergantung pada, bertentangan dengan kepastian mutlak bukti lengkap.'
        }
      },
      {
        id: 'drill-3',
        type: 'trap_detect',
        instruction: 'Langkah 3 (Retorika Persuasif): Manakah kalimat yang menggunakan 〜ではないだろうか untuk mengajukan opini secara santun?',
        sentencePrompt: 'Pilihlah kalimat yang menggunakan 〜ではないだろうか secara tepat:',
        options: [
          '今【いま】こそ 新【あたら】しい 市場【しじょう】へ 挑戦【ちょうせん】すべきでは ないだろうか。',
          '今【いま】何時【なんじ】では ないだろうか。',
          '彼【かれ】は 誰【だれ】では ないだろうか。',
          'ここが 東京【とうきょう】では ないだろうか、教【おし】えてください。'
        ],
        correctAnswer: '今【いま】こそ 新【あたら】しい 市場【しじょう】へ 挑戦【ちょうせん】すべきでは ないだろうか。',
        explanation: '〜ではないだろうか digunakan untuk mengajukan gagasan atau opini pembicara secara persuasif dan elegan (bukankah saatnya kita menantang pasar baru).',
        diagnosticFeedback: {
          '今【いま】何時【なんじ】では ないだろうか。': 'Kekeliruan Fungsi: Menanyakan jam adalah pertanyaan fakta langsung, tepatnya 今何時ですか.',
          '彼【かれ】は 誰【だれ】では ないだろうか。': 'Kekeliruan Fungsi: Menanyakan identitas orang adalah pertanyaan informasi, tepatnya 彼は誰ですか.',
          'ここが 東京【とうきょう】では ないだろうか、教【おし】えてください。': 'Kekeliruan Pragmatik: Pola ini bukan untuk meminta informasi arah jalan yang tidak diketahui pembicara.'
        }
      },
      {
        id: 'drill-4',
        type: 'reorder',
        instruction: 'Langkah 4 (Susun Kalimat): Susun frasa-frasa berikut menjadi kalimat pernyataan kepastian pasar:',
        sentencePrompt: 'Susunlah frasa-frasa berikut:',
        options: [
          'この 商品【しょうひん】の 需要【じゅよう】は 拡大【かくだい】するに 相違【そうい】ありません',
          '拡大【かくだい】するに 相違【そうい】ありません この 商品【しょうひん】の 需要【じゅよう】は',
          '需要【じゅよう】は 相違【そうい】ありません この 商品【しょうひん】の 拡大【かくだい】するに',
          'この 商品【しょうひん】の 相違【そうい】ありません 拡大【かくだい】するに 需要【じゅよう】は'
        ],
        correctAnswer: 'この 商品【しょうひん】の 需要【じゅよう】は 拡大【かくだい】するに 相違【そうい】ありません',
        explanation: 'Urutan baku: Topik subjek (この商品の需要は) + predikat verba (拡大するに) + penutup kepastian formal (相違ありません).',
        diagnosticFeedback: {
          '拡大【かくだい】するに 相違【そうい】ありません この 商品【しょうひん】の 需要【じゅよう】は': 'Predikat Terbalik: Meletakkan predikat di awal sebelum subjek kalimat.',
          '需要【じゅよう】は 相違【そうい】ありません この 商品【しょうひん】の 拡大【かくだい】するに': 'Sintaksis Terputus: Frasa kepastian memotong di antara subjek dan verba.',
          'この 商品【しょうひん】の 相違【そうい】ありません 拡大【かくだい】するに 需要【じゅよう】は': 'Susunan Rusak: Penutup ditempatkan sebelum kata kerja utama.'
        },
        tokens: ['この 商品【しょうひん】の', '需要【じゅよう】は', '拡大【かくだい】するに', '相違【そうい】ありません'],
        correctOrder: ['0', '1', '2', '3']
      },
      {
        id: 'drill-5',
        type: 'response',
        instruction: 'Langkah 5 (Apresiasi Ide Strategis): Saat Sakura menyarankan: 「オフィス空間向けの パッケージ提案を 同時に 進めるべきでは ないでしょうか」, apa respons terbaik Anda?',
        sentencePrompt: 'Pilihlah tanggapan profesional yang menyambut ide mentor dengan sigap:',
        options: [
          '大変【たいへん】示唆【しさ】に 富【と】む ご提案【ていあん】です！ 早速【さっそく】、法人【ほうじん】向【む】けの カタログ構成【こうせい】案【あん】を 作成【さくせい】いたします。',
          'そんな 余計【よけい】な 仕事【しごと】、増【ふ】やさないでください。私【わたし】は 今【いま】の ままで 十分【じゅうぶん】です。',
          '法人【ほうじん】なんて 相手【あいて】に しても 儲【もう】かりませんよ。さくらさんは ビジネスを 分【わ】かっていませんね。',
          'カタログを 作【つく】るのは 面倒【めんどう】ですから、さくらさんが 全部【ぜんぶ】 書【か】いてください。'
        ],
        correctAnswer: '大変【たいへん】示唆【しさ】に 富【と】む ご提案【ていあん】です！ 早速【さっそく】、法人【ほうじん】向【む】けの カタログ構成【こうせい】案【あん】を 作成【さくせい】いたします。',
        explanation: 'Mengapresiasi gagasan rekan senior (Shisa ni tomu goteian) dan langsung mengambil langkah konkret (sassoku).',
        diagnosticFeedback: {
          'そんな 余計【よけい】な 仕事【しごと】、増【ふ】やさないでください。私【わたし】は 今【いま】の ままで 十分【じゅうぶん】です。': 'Malas & Menolak Berkembang: Menganggap peluang ekspansi sebagai beban merusak prospek bisnis.',
          '法人【ほうじん】なんて 相手【あいて】に しても 儲【もう】かりませんよ。さくらさんは ビジネスを 分【わ】かっていませんね。': 'Meremehkan Mentor: Menghina analisis bisnis konsultan senior adalah pelanggaran etika serius.',
          'カタログを 作【つく】るのは 面倒【めんどう】ですから、さくらさんが 全部【ぜんぶ】 書【か】いてください。': 'Melempar Pekerjaan: Menolak tugas penyusunan portofolio produk.'
        }
      }
    ]
  }
};

// Write out file
const outContent = `// ══════════════════════════════════════════════════════════════════
//  scripts/curriculum-data/n2/units-06-to-10.js
//  Bespoke Gold-Standard Content for N2 Units 6–10
// ══════════════════════════════════════════════════════════════════

module.exports = ${JSON.stringify(u06_10, null, 2)};
`;

fs.writeFileSync(targetFile, outContent, 'utf8');
console.log(`✅ units-06-to-10.js updated! Total lessons: ${Object.keys(u06_10).length}`);
