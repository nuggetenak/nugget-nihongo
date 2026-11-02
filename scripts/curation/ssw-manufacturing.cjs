/**
 * SSW Manufacturing (Seizougyou / 素形材・産業機械・電気電子情報関連製造業) Golden Set 01
 * Grounded in METI (Ministry of Economy, Trade and Industry) & JAIM Official Textbooks
 * 15 Items: Lathes & No-Glove Rule, Nogisu / Micrometer, E-Stop, Swarf (Kiriko), Red Box NG Segregation
 */

function getSSWManufacturingSet() {
  return {
    setId: 'ssw-manufacturing-set01',
    trackType: 'ssw',
    sswSectorId: 'ssw-manufacturing',
    title: 'Set Latihan SSW Manufacturing (Manufaktur & Mesin Industri) - 01',
    description: 'Simulasi modular 15 menit menguji istilah bengkel mesin (senban/bor), larangan sarung tangan kain (gunte kinshi), alat ukur presisi (nogisu/micrometer), penanganan tatal besi (kiriko), dan kontrol mutu (赤箱).',
    targetUnits: 'Kurikulum Vokasional Manufaktur: Pengoperasian Mesin Perkakas, Pengukuran Presisi, Pemotongan Logam & K3 Pabrik',
    totalItems: 15,
    timeLimitMinutes: 15,
    passingScore: 10,
    items: [
      {
        id: 'SSW-MF-S01-Q01',
        trackType: 'ssw',
        sswSectorId: 'ssw-manufacturing',
        mondaiNumber: 1,
        mondaiType: 'ssw_k3_procedure',
        instructionJp: '回転機械作業の禁止保護具として最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah perlengkapan yang HARAM DIPAKAI saat mengoperasikan mesin berputar seperti bubut atau bor.',
        prompt: '旋盤（せんばん）や ボール盤（ドリル盤）など、高速で回転する 工作機械で 作業するとき、巻き込まれ防止のために「絶対に着用してはならない」ものは 何ですか。',
        targetWord: '軍手',
        options: [
          '軍手（布製・糸製の手袋）',
          '保護メガネ（安全ゴーグル）',
          '安全靴',
          '作業帽（つば付き作業キャップ）'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Berdasarkan regulasi METI dan UU K3 Jepang, mengenakan sarung tangan rajut kain (軍手 - gunte) saat mengoperasikan mesin perkakas dengan poros berputar (mesin bubut, bor, frais) DILARANG KERAS. Serat benang kain yang terurai akan tersangkut seketika pada chuck/poros yang berputar kencang, menyeret jari dan lengan operator ke dalam mesin dan berakibat amputasi fatal.',
          distractorAutopsy: {
            '1': '軍手（布製・糸製の手袋） adalah KUNCI BENAR (haram dipakai karena memicu terseret ke poros berputar).',
            '2': 'Kacamata pelindung (保護メガネ) justru wajib dipakai untuk menahan serpihan logam tatal.',
            '3': 'Sepatu safety (安全靴) melindungi kaki dari kejatuhan balok logam atau perkakas.',
            '4': 'Topi kerja dengan rambut terikat rapi mencegah rambut tersangkut pada poros berputar.'
          },
          mnemonicSensei: 'Mesin berputar = HARAM SARUNG TANGAN KAIN (軍手禁止)! Satu helai benang rajut tersangkut, tangan terseret masuk dalam sekejap mata. Kerja bubut/bor wajib tangan telanjang (素手).',
          l1InterferenceAlert: 'Di bengkel informal Indonesia, banyak pekerja memakai sarung tangan rajut putih untuk segala pekerjaan. Di pabrik manufaktur Jepang, memakai sarung tangan kain di depan mesin bubut/bor adalah pelanggaran fatal nomor satu.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-mfg-01',
            unitNumber: 1,
            unitTitleId: 'Keselamatan Mesin Perkakas & Pencegahan Terbelit Poros',
            lessonId: 'les-ssw-mf-01',
            vocabId: 'vg-ssw-mf-001',
            advice: 'Aturan mesin putar: 1. 回転部分の作業は「軍手禁止」 (Dilarang sarung tangan kain), 2. Lengan baju dikancing rapat (袖口を絞る), 3. Rambut dimasukkan ke dalam topi.'
          },
          safetyTip: 'Jika telapak tangan berkeringat atau licin, gunakan kapur magnesium atau bersihkan tangan dengan kain lap uesu, jangan gunakan sarung tangan rajut.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-manufacturing',
          unitId: 'unit-curriculum-ssw-mfg-01',
          unitNumber: 1,
          unitTitleId: 'Keselamatan Mesin Perkakas & Pencegahan Terbelit Poros'
        }
      },
      {
        id: 'SSW-MF-S01-Q02',
        trackType: 'ssw',
        sswSectorId: 'ssw-manufacturing',
        mondaiNumber: 2,
        mondaiType: 'ssw_technical_terminology',
        instructionJp: '精密測定器の名称として最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah nama alat ukur sorong geser untuk mengukur diameter luar, diameter dalam, dan kedalaman benda kerja.',
        prompt: '製品の 長さ、外径（そとけい）、内径（ないけい）、および 深さを 1台で 測定できる、スライド式の 精密測定器は 何ですか。',
        targetWord: 'ノギス',
        options: [
          'ノギス（バーニアキャリパー）',
          'スケール（巻き尺）',
          '直角定規（スコヤ）',
          'シックネスゲージ（すきまゲージ）'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Jangka sorong (ノギス - nogisu / vernier caliper) dilengkapi rahang luar (外側用ジョウ), rahang dalam (内側用クチバシ), batang pengukur kedalaman (デプスバー), dan bidang ukur undakan, sehingga mampu mengukur empat dimensi fisik berbeda dengan presisi 0.05 mm atau 0.01 mm digital.',
          distractorAutopsy: {
            '1': 'ノギス（バーニアキャリパー） adalah KUNCI BENAR (jangka sorong serbaguna 4 fungsi).',
            '2': '巻き尺 / スケール (meteran gulung) memiliki presisi 1 mm kasar untuk kayu/bangunan.',
            '3': '直角定規 / スコヤ (penggaris siku) menguji kesikuan sudut 90 derajat.',
            '4': 'シックネスゲージ (feeler gauge) untuk mengukur celah renggang tipis.'
          },
          mnemonicSensei: 'Nogisu = Jangka sorong serbaguna! Rahang bawah ukur diameter luar, paruh atas ukur diameter dalam, ekor belakang ukur kedalaman.',
          l1InterferenceAlert: 'Di Indonesia lazim disebut "jangka sorong", "sketmat", atau "vernier caliper". Di Jepang sebutan resminya adalah ノギス (nogisu).',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-mfg-02',
            unitNumber: 2,
            unitTitleId: 'Pengukuran Presisi (Nogisu & Micrometer) & Gambar Teknik',
            advice: '4 Fungsi ノギス: 外側測定 (diameter luar), 内側測定 (diameter dalam), 深さ測定 (kedalaman), 段差測定 (ketinggian tangga beda level).'
          },
          safetyTip: 'Saat mengukur dengan rahang luar nogisu, pastikan benda kerja dijepit dekat dengan pangkal rahang, bukan di ujung ujung tipis rahang.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-manufacturing',
          unitId: 'unit-curriculum-ssw-mfg-02',
          unitNumber: 2,
          unitTitleId: 'Pengukuran Presisi (Nogisu & Micrometer) & Gambar Teknik'
        }
      },
      {
        id: 'SSW-MF-S01-Q03',
        trackType: 'ssw',
        sswSectorId: 'ssw-manufacturing',
        mondaiNumber: 3,
        mondaiType: 'ssw_k3_procedure',
        instructionJp: '切粉処理の安全手順として最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah metode aman untuk membersihkan tatal besi (kiriko) tajam sisa pembubutan.',
        prompt: '金属の 切削加工中、機械の 刃物から 長くつながって 排出される 鋭い金属の 削りカス（切粉 - きりこ）の 安全な除去方法は どれですか。',
        targetWord: '切粉',
        options: [
          '機械を停止させ、専用の金属フックや刷毛（ブラシ）を使って取り除く',
          '機械が高速回転している最中に、素手で引っ張ってちぎり取る',
          '手袋をした手で力いっぱい回転軸の周りを拭き取る',
          '口で思い切り息を吹きかけて切粉を飛ばす'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Tatal logam (切粉 / きりこ - kiriko) bersuhu membara dan setajam silet bedah. Operator wajib menghentikan mesin perkakas dan menggunakan tongkat kait penarik khusus (切粉フック) atau kuas pembersih (刷毛). Menarik tatal dengan tangan kosong saat mesin berputar berakibat putusnya urat jari seketika.',
          distractorAutopsy: {
            '1': 'Opsi 1 BENAR MUTLAK: Matikan mesin, lalu gunakan tongkat kait pembersih tatal atau kuas sikat.',
            '2': 'Menarik tatal berputar dengan tangan kosong langsung menyayat telapak tangan dan memotong urat tendon.',
            '3': 'Menyeka dengan sarung tangan memicu terbelitnya tangan ke dalam putaran mesin.',
            '4': 'Meniup tatal dengan mulut melontarkan serpihan logam tajam langsung menusuk mata.'
          },
          mnemonicSensei: 'Tatal besi bubut (切粉 - kiriko) setajam silet bedah! Matikan mesin -> Tarik pakai tongkat kait (フック) atau sapu pakai kuas (刷毛). JANGAN disentuh tangan kosong!',
          l1InterferenceAlert: 'Melihat tatal besi yang menggulung panjang, pemula sering refleks menariknya dengan tangan. Tatal yang tertarik bisa langsung memotong jari seperti kawat baja panas. Gunakan selalu kait logam (切粉フック).',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-mfg-01',
            unitNumber: 1,
            unitTitleId: 'Keselamatan Mesin Perkakas & Pencegahan Terbelit Poros',
            advice: '3 Aturan Kiriko: 1. Stop mesin dulu, 2. Gunakan 切粉かき出しフック (kait penarik), 3. Pakai kacamata pelindung untuk serpihan terpental.'
          },
          safetyTip: 'Gunakan penyapu magnet (magnetic sweeper) untuk membersihkan serpihan tatal kecil yang berserakan di lantai mesin.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-manufacturing',
          unitId: 'unit-curriculum-ssw-mfg-01',
          unitNumber: 1,
          unitTitleId: 'Keselamatan Mesin Perkakas & Pencegahan Terbelit Poros'
        }
      },
      {
        id: 'SSW-MF-S01-Q04',
        trackType: 'ssw',
        sswSectorId: 'ssw-manufacturing',
        mondaiNumber: 4,
        mondaiType: 'ssw_hou_ren_so_sbar',
        instructionJp: '品質管理の異常処置として最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah tindakan pertama yang benar saat menemukan produk cacat (NG) di lini produksi.',
        prompt: '加工後の 部品の寸法を 検査したところ、図面の公差（許容範囲）から 外れた「不良品（NG品）」を 発見しました。直ちにとるべき 行動は 何ですか。',
        targetWord: '赤箱',
        options: [
          '良品と混ざらないように「赤箱（不良品専用箱）」に隔離し、直ちにリーダー（班長）に報告する',
          'バレないように良品の箱の底の方にこっそり隠しておく',
          'ハンマーで叩いて強引に変形させ、無理やり寸法を合わせる',
          '自分で勝手に判断して、誰にも言わずにゴミ箱へ捨てる'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Untuk menjamin mutu produk, komponen cacat (不良品 / NG品) wajib segera dipisahkan ke dalam Kotak Merah khusus barang cacat (赤箱 / 不良品専用箱) dan diberi label penolakan, lalu segera dilaporkan (Hou-Ren-So) ke pimpinan regu (班長 / リーダー) guna mencegah cacat berulang.',
          distractorAutopsy: {
            '1': 'Opsi 1 BENAR MUTLAK: Pisahkan ke Kotak Merah (赤箱) agar tidak tercampur barang bagus dan lapor Hanchou.',
            '2': 'Menyembunyikan barang cacat di dasar kotak barang bagus memicu klaim cacat massal dari klien.',
            '3': 'Memukul dengan palu merusak struktur metalurgi logam dan toleransi geometris benda kerja.',
            '4': 'Membuang ke tempat sampah secara diam-diam menyembunyikan keausan mata pahat mesin dari tim perbaikan.'
          },
          mnemonicSensei: 'Barang Cacat (NG品)? Pisahkan ke Kotak Merah (赤箱) + Segera Lapor Hanchou! Jangan disembunyikan di bawah tumpukan barang bagus.',
          l1InterferenceAlert: 'Rasa takut dimarahi sering membuat pekerja baru tergoda menyembunyikan produk cacat. Di industri manufaktur Jepang, menyembunyikan cacat adalah dosa terbesar yang berujung pemecatan; sedangkan melapor cepat justru dipuji.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-mfg-03',
            unitNumber: 3,
            unitTitleId: 'Manajemen Mutu (QC), Penanganan Barang Cacat & 5S Pabrik',
            advice: 'Prosedur barang NG: Hentikan mesin bila cacat berulang -> Taruh di 赤箱 (kotak merah berlabel) -> Segera lapor Hou-Ren-So ke atasan.'
          },
          safetyTip: 'Tuliskan jenis cacat (misal: "Ukuran luar minus 0.08 mm") pada label kartu merah (赤札) yang ditempelkan pada benda kerja cacat.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-manufacturing',
          unitId: 'unit-curriculum-ssw-mfg-03',
          unitNumber: 3,
          unitTitleId: 'Manajemen Mutu (QC), Penanganan Barang Cacat & 5S Pabrik'
        }
      },
      {
        id: 'SSW-MF-S01-Q05',
        trackType: 'ssw',
        sswSectorId: 'ssw-manufacturing',
        mondaiNumber: 5,
        mondaiType: 'ssw_technical_terminology',
        instructionJp: '締付工具の名称として最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah kunci pengencang baut presisi yang berbunyi "klik" saat torsi rencana tercapai.',
        prompt: 'ボルトやナットを 締める際、締め付け力（トルク）が 規定値に達すると「カチッ」と 音や感触で 知らせてくれる 専用の測定工具は 何ですか。',
        targetWord: 'トルクレンチ',
        options: [
          'トルクレンチ',
          'モンキーレンチ',
          'パイプレンチ',
          '六角棒スパナ（L型レンチ）'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Kunci torsi (トルクレンチ - toruku renchi) mengencangkan baut hingga torsi target yang ditentukan dalam satuan Newton-meter ($N\\cdot m$). Mekanisme pegas internal akan berbunyi klik dan memberi umpan balik getar saat batas tercapai, mencegah baut putus atau kendor karena getaran mesin.',
          distractorAutopsy: {
            '1': 'トルクレンチ adalah KUNCI BENAR (torque wrench pengencang baut berbunyi klik pada torsi tepat).',
            '2': 'モンキーレンチ (kunci inggris) memiliki kelonggaran rahang dan tidak memiliki indikator torsi kalibrasi.',
            '3': 'パイプレンチ (kunci pipa) bergigi tajam khusus pipa ledeng dan merusak kepala baut bersegi.',
            '4': '六角棒スパナ (kunci L) mengandalkan tenaga tangan tanpa batasan torsi presisi.'
          },
          mnemonicSensei: 'Torque Wrench = Kunci pas presisi! Begitu terdengar bunyi "Klik!", stop putar. Jangan dipaksa putar dua kali lagi.',
          l1InterferenceAlert: 'Banyak mekanik mengira semakin kencang baut semakin bagus. Baut yang dikencangkan berlebihan akan mengalami peregangan plastis (baut mulur) dan patah di tengah jalan.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-mfg-04',
            unitNumber: 4,
            unitTitleId: 'Perakitan Komponen, Pengencangan Baut Torsi & Perkakas Tangan',
            advice: 'Aturan Torukurenchi: Setel nilai torsi target -> Tarik perlahan -> Bunyi "Klik" satu kali -> Selesai. Reset ke torsi nol sebelum disimpan kembali.'
          },
          safetyTip: 'Tarik tuas kunci torsi ke arah badan Anda, jangan mendorong tuas menjauh, agar badan tidak terpelanting bila baut mendadak patah.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-manufacturing',
          unitId: 'unit-curriculum-ssw-mfg-04',
          unitNumber: 4,
          unitTitleId: 'Perakitan Komponen, Pengencangan Baut Torsi & Perkakas Tangan'
        }
      },
      {
        id: 'SSW-MF-S01-Q06',
        trackType: 'ssw',
        sswSectorId: 'ssw-manufacturing',
        mondaiNumber: 6,
        mondaiType: 'ssw_k3_procedure',
        instructionJp: '非常時対応のスイッチとして最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah tombol darurat yang harus dipukul dengan telapak tangan seketika bila mesin mengalami anomali bahaya.',
        prompt: '機械が 異常な音を立てたり、ワーク（工作物）が 吹き飛ぶなどの 緊急事態が 発生したとき、誰でも瞬時に 押すべきスイッチは 何ですか。',
        targetWord: '非常停止ボタン',
        options: [
          '非常停止ボタン（エマージェンシーストップ / 赤い押しキノコ型ボタン）',
          'メイン電源のブレーカー',
          'スピード調節ダイヤル',
          '作業灯の照明スイッチ'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Tombol berhenti darurat / E-stop (非常停止ボタン, tombol merah bentuk kepala jamur) terhubung langsung ke sirkuit relai keselamatan untuk memutus daya penggerak dan mengaktifkan rem elektromagnetik dalam hitungan pecahan detik.',
          distractorAutopsy: {
            '1': 'Opsi 1 BENAR MUTLAK: Pukul tombol merah kepala jamur (Emergency Stop) dengan telapak tangan.',
            '2': 'Breaker utama terkunci di dalam panel listrik, memakan waktu terlalu lama saat bahaya darurat.',
            '3': 'Memutar kenop kecepatan tidak menghentikan inersia seketika dan bisa salah putar mempercepat putaran.',
            '4': 'Saklar lampu kerja hanya menggelapkan ruangan tanpa menghentikan putaran motor mesin.'
          },
          mnemonicSensei: 'Tombol Jamur Merah = Tombol Penyelamat Nyawa! Ada suara aneh atau rekan terjepit, hantam tombol merah ini dengan telapak tangan seketika.',
          l1InterferenceAlert: 'Jangan ragu menekan tombol darurat karena takut dimarahi atau produksi berhenti! Keselamatan nyawa manusia selalu berada di atas jadwal produksi.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-mfg-01',
            unitNumber: 1,
            unitTitleId: 'Keselamatan Mesin Perkakas & Pencegahan Terbelit Poros',
            advice: 'Aturan 非常停止: 1. Pukul tombol merah dengan telapak tangan, 2. Pastikan mesin benar-benar diam, 3. Lapor ke penanggung jawab untuk reset penguncian.'
          },
          safetyTip: 'Ketahui lokasi tombol emergency stop pada setiap mesin baru sebelum Anda mulai mengoperasikan mesin tersebut.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-manufacturing',
          unitId: 'unit-curriculum-ssw-mfg-01',
          unitNumber: 1,
          unitTitleId: 'Keselamatan Mesin Perkakas & Pencegahan Terbelit Poros'
        }
      },
      {
        id: 'SSW-MF-S01-Q07',
        trackType: 'ssw',
        sswSectorId: 'ssw-manufacturing',
        mondaiNumber: 7,
        mondaiType: 'ssw_technical_terminology',
        instructionJp: '仕上げ加工の用語として最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah istilah proses menghilangkan duri tajam logam sisa pemotongan atau stamping.',
        prompt: '機械加工や プレス加工の後に残る、工作物の縁（へり）の 鋭いトゲや 出っ張りを 削り落として 滑らかにする作業を 何と言いますか。',
        targetWord: 'バリ取り',
        options: [
          'バリ取り・面取り（ばりとり・めんとり）',
          '焼入れ（やくいれ）',
          '電鍍（めっき）',
          '鍛造（たんぞう）'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Pembersihan duri sisa pemotongan disebut "Baritori" (バリ取り) dan "Mentori" (面取り - chamfering). Menghilangkan duri tajam dengan kikir, alat pengikis berputar, atau mesin gerinda mencegah benda kerja macet saat dirakit dan melindungi tangan dari luka sobek.',
          distractorAutopsy: {
            '1': 'バリ取り・面取り adalah KUNCI BENAR (pembersihan duri logam dan pemotongan sudut miring).',
            '2': '焼入れ (quenching) adalah perlakuan panas pendinginan kilat untuk mengeraskan baja.',
            '3': 'めっき (plating) adalah pelapisan permukaan logam dengan seng/krom anti-karat.',
            '4': '鍛造 (forging) adalah penempaan logam panas membara dengan mesin palu cetak.'
          },
          mnemonicSensei: 'Bari = Duri tajam logam; Tori = Menghilangkan. Baritori = membersihkan duri sisa potong dengan kikir besi atau alat pengikis.',
          l1InterferenceAlert: 'Logam yang baru dipotong memiliki tepian setajam pisau bedah (バリ). Jangan pernah meraba tepian potongan logam dengan ujung jari tanpa sarung tangan kulit.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-mfg-04',
            unitNumber: 4,
            unitTitleId: 'Perakitan Komponen, Pengencangan Baut Torsi & Perkakas Tangan',
            advice: 'Alat deburring: ヤスリ (kikir), バリ取りバー (deburring blade scraper), 面取りカッター (chamfering cutter).'
          },
          safetyTip: 'Gunakan sarung tangan anti-potong (cut-resistant gloves) saat melakukan pekerjaan baritori manual dengan kikir besi.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-manufacturing',
          unitId: 'unit-curriculum-ssw-mfg-04',
          unitNumber: 4,
          unitTitleId: 'Perakitan Komponen, Pengencangan Baut Torsi & Perkakas Tangan'
        }
      },
      {
        id: 'SSW-MF-S01-Q08',
        trackType: 'ssw',
        sswSectorId: 'ssw-manufacturing',
        mondaiNumber: 8,
        mondaiType: 'ssw_k3_procedure',
        instructionJp: 'プレス機械の安全装置として最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah fungsi sensor tirai cahaya pengaman pada mesin pres penekan logam.',
        prompt: 'プレス機械に 手を入れて材料を セットする際、作業員の手挟まれ事故を 防ぐための 光線式安全装置（エリアセンサー）の 機能として 正しいものは どれですか。',
        targetWord: '光線式安全装置',
        options: [
          '光線を遮ると、スライド（金型）の下降が瞬時に停止する',
          '光線を遮ると、金型がさらに高速で勢いよく落下する',
          '金型に手が挟まれた後に、警報ブザーが鳴るだけである',
          '作業員の手を吸盤のように自動で引っ張り出してくれる'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Sensor tirai cahaya keselamatan (光線式安全装置 / safety light curtain) memancarkan tirai sinar inframerah di depan cetakan cetak pres. Jika tangan atau jari memotong sinar saat cetakan sedang bergerak turun, sensor langsung mengunci rem hidrolik dan menghentikan cetakan seketika.',
          distractorAutopsy: {
            '1': 'Opsi 1 BENAR MUTLAK: Saat sinar terpotong tangan, gerakan turun cetakan (slide) langsung berhenti seketika.',
            '2': 'Mempercepat gerakan saat sinar terhalang adalah kegagalan mematikan yang mustahil.',
            '3': 'Membunyikan alarm setelah tangan remuk terjepit tidak ada gunanya untuk pencegahan kecelakaan.',
            '4': 'Sensor adalah perangkat optik murni, tidak memiliki tangan robotik penarik tangan manusia.'
          },
          mnemonicSensei: 'Sensor Tirai Cahaya: Sinar inframerah terhalang tangan = Mesin pres "STOP Seketika!" Mencegah tangan gepeng terhimpit cetakan baja.',
          l1InterferenceAlert: 'Meskipun ada sensor pengaman, pekerja dilarang sengaja memasukkan tangan saat cetakan bergerak. Wajib gunakan tongkat penjepit (手工具 / ピンセット) untuk mengambil bahan kecil.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-mfg-01',
            unitNumber: 1,
            unitTitleId: 'Keselamatan Mesin Perkakas & Pencegahan Terbelit Poros',
            advice: 'Pengecekan harian sensor press: Sebelum produksi mulai, uji halangi sensor dengan tongkat uji -> Pastikan cetakan berhenti mendadak (急停止機能テスト).'
          },
          safetyTip: 'Dilarang menonaktifkan atau menempelkan lakban pada lensa sensor tirai cahaya untuk mempercepat kerja.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-manufacturing',
          unitId: 'unit-curriculum-ssw-mfg-01',
          unitNumber: 1,
          unitTitleId: 'Keselamatan Mesin Perkakas & Pencegahan Terbelit Poros'
        }
      },
      {
        id: 'SSW-MF-S01-Q09',
        trackType: 'ssw',
        sswSectorId: 'ssw-manufacturing',
        mondaiNumber: 9,
        mondaiType: 'ssw_technical_terminology',
        instructionJp: '図面公差の読み方として最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah rentang ukuran yang dinyatakan lolos (bagus) bila gambar kerja tertulis diameter 20 ± 0.05 mm.',
        prompt: '図面に「φ20 ± 0.05」と 記載されている場合、製品の直径として 合格（良品）となる 寸法範囲は どれですか。',
        targetWord: '公差',
        options: [
          '19.95mm から 20.05mm まで',
          '19.50mm から 20.50mm まで',
          '20.00mm ちょうどでなければ全て失格',
          '20.05mm から 20.50mm まで'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Simbol gambar teknik "φ20 ± 0.05" menunjukkan diameter nominal 20 mm dengan batas atas toleransi +0.05 mm (20.05 mm) dan batas bawah toleransi -0.05 mm (19.95 mm). Semua produk dengan ukuran antara 19.95 mm hingga 20.05 mm dinyatakan lolos uji (良品).',
          distractorAutopsy: {
            '1': '19.95mm から 20.05mm まで adalah KUNCI BENAR (20 - 0.05 s/d 20 + 0.05 mm).',
            '2': '± 0.05 berarti 5 perseratus milimeter, bukan 5 persepuluh milimeter (± 0.50).',
            '3': 'Pabrik manufaktur menerima toleransi (公差範囲); menuntut tepat 20.000 mm mutlak adalah hal mustahil dalam proses bubut massal.',
            '4': 'Rentang 20.05 hingga 20.50 mm adalah barang cacat kebesaran (out-of-spec).'
          },
          mnemonicSensei: 'Simbol toleransi ± 0.05: Batas atas +0.05 = 20.05, Batas bawah -0.05 = 19.95. Ukuran mikrometer harus berada di antara dua batas ini!',
          l1InterferenceAlert: 'Jangan salah membaca desimal: 0.05 mm (50 mikron) sering tertukar dengan 0.5 mm (setengah milimeter). Selisih 0.45 mm pada mesin bubut adalah kegagalan fatal.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-mfg-02',
            unitNumber: 2,
            unitTitleId: 'Pengukuran Presisi (Nogisu & Micrometer) & Gambar Teknik',
            advice: 'Rumus batas: 最大許容寸法 (ukuran maks) = 20 + 0.05 = 20.05 mm; 最小許容寸法 (ukuran min) = 20 - 0.05 = 19.95 mm.'
          },
          safetyTip: 'Pastikan suhu benda kerja sudah dingin kembali ke suhu ruang sebelum mengukur toleransi 0.01 mm, karena logam memuai saat panas.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-manufacturing',
          unitId: 'unit-curriculum-ssw-mfg-02',
          unitNumber: 2,
          unitTitleId: 'Pengukuran Presisi (Nogisu & Micrometer) & Gambar Teknik'
        }
      },
      {
        id: 'SSW-MF-S01-Q010',
        trackType: 'ssw',
        sswSectorId: 'ssw-manufacturing',
        mondaiNumber: 10,
        mondaiType: 'ssw_hou_ren_so_sbar',
        instructionJp: '清掃指示の会話として、（　　）に入る最も適切な言葉を一つ選びなさい。',
        instructionId: 'Pilihlah kain lap pembersih khusus industri untuk membersihkan meja mesin.',
        prompt: '先輩「金型を 取り付ける前に、定盤（じょうばん）の上に ゴミや切り粉が 残っていないか、（　　）で 綺麗に拭き取れ！」',
        targetWord: 'ウエス',
        options: [
          'ウエス（工業用清掃布）',
          '紙やすり（サンドペーパー）',
          'ワイヤーブラシ',
          '水たまりの雑巾'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Kain majun lap industri pabrik disebut Uesu (ウエス - dari bahasa Inggris "waste cloth"). Meja presisi (定盤) dan dudukan cetakan harus dilap bersih dengan uesu. Sebutir pasir atau serpihan tatal yang terganjal di bawah cetakan seberat puluhan kilogram akan membuat cetakan miring dan merusak akurasi presisi.',
          distractorAutopsy: {
            '1': 'ウエス（工業用清掃布） adalah KUNCI BENAR (kain lap majun khusus pembersih meja mesin).',
            '2': 'Amplas (サンドペーパー) akan menggores dan merusak permukaan meja presisi berkalibrasi.',
            '3': 'Sikat kawat baja mengikis dan merusak kerataan bidang meja mesin.',
            '4': 'Kain pel basah berlumpur membawa butiran pasir tajam dan memicu karat kilat pada besi cor.'
          },
          mnemonicSensei: 'Uesu (ウエス) = Kain lap khusus pabrik! Lap bersih meja mesin dan cetakan agar tidak ada sebutir debu pun yang mengganjal.',
          l1InterferenceAlert: 'Di pabrik Jepang, kain majun lap disebut ウエス (uesu). Meja mesin (定盤) harus selalu berkilat tanpa pasir atau serbuk besi sebelum cetakan diletakkan.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-mfg-03',
            unitNumber: 3,
            unitTitleId: 'Manajemen Mutu (QC), Penanganan Barang Cacat & 5S Pabrik',
            advice: 'Kaidah pasang cetakan: Lap meja dengan uesu -> Cek dengan telapak tangan (meraba keberadaan debu/pasir) -> Naikkan cetakan perlahan.'
          },
          safetyTip: 'Kain uesu yang terkena oli mesin mudah terbakar sendiri bila menumpuk di tempat panas; buang ke tempat sampah uesu khusus berpenutup logam.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-manufacturing',
          unitId: 'unit-curriculum-ssw-mfg-03',
          unitNumber: 3,
          unitTitleId: 'Manajemen Mutu (QC), Penanganan Barang Cacat & 5S Pabrik'
        }
      },
      {
        id: 'SSW-MF-S01-Q011',
        trackType: 'ssw',
        sswSectorId: 'ssw-manufacturing',
        mondaiNumber: 11,
        mondaiType: 'ssw_technical_terminology',
        instructionJp: '超精密測定器の名称として最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah nama alat ukur ketebalan presisi 0.01 mm yang menjepit benda kerja antara anvil dan spindle.',
        prompt: '100分の1ミリ（0.01mm）単位の さらに精密な 外径測定を 行うために、スピンドルと アンビルで 材料を挟んで 測定する工具は 何ですか。',
        targetWord: 'マイクロメーター',
        options: [
          'マイクロメーター',
          '定規（ものさし）',
          '分度器（プロトラクター）',
          '巻尺（メジャー）'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Mikrometer luar (マイクロメーター - outside micrometer) memanfaatkan ulir presisi dengan jarak pitch 0.5 mm yang dibagi ke dalam 50 garis ukur thimble silinder putar, memungkinkan pengukuran super presisi hingga 0.01 mm, dilengkapi rachet pemutar (ラチェットストップ) agar tekanan jepit konstan.',
          distractorAutopsy: {
            '1': 'マイクロメーター adalah KUNCI BENAR (alat ukur presisi tinggi 0.01 mm).',
            '2': 'Penggaris biasa (ものさし) hanya mengukur milimeter utuh.',
            '3': 'Busur derajat (分度器) mengukur sudut derajat kemiringan, bukan ketebalan.',
            '4': 'Meteran gulung (巻尺) untuk ukuran sentimeter pekerjaan kasar.'
          },
          mnemonicSensei: 'Micrometer = Pengukur ketebalan super-presisi 0.01 mm! Putar pemutar rachet kecilnya sampai berbunyi "tik-tik-tik" 3 kali untuk tekanan ukur pas.',
          l1InterferenceAlert: 'Saat memutar micrometer, jangan putar badannya (thimble) terlalu keras! Putar ujung rachet kecilnya (ラチェット) sampai berbunyi klik 2-3 kali agar tidak merusak ulir mikro.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-mfg-02',
            unitNumber: 2,
            unitTitleId: 'Pengukuran Presisi (Nogisu & Micrometer) & Gambar Teknik',
            advice: 'Aturan マイクロメーター: Bersihkan bidang ukur -> Cek titik nol (ゼロ点確認) -> Gunakan ラチェットストップ (ratchet stop).'
          },
          safetyTip: 'Simpan micrometer dalam kotak penyimpanannya dengan bidang anvil dan spindle sedikit renggang (tidak menempel rapat) agar suhu tidak mempengaruhi tegangan alat.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-manufacturing',
          unitId: 'unit-curriculum-ssw-mfg-02',
          unitNumber: 2,
          unitTitleId: 'Pengukuran Presisi (Nogisu & Micrometer) & Gambar Teknik'
        }
      },
      {
        id: 'SSW-MF-S01-Q012',
        trackType: 'ssw',
        sswSectorId: 'ssw-manufacturing',
        mondaiNumber: 12,
        mondaiType: 'ssw_k3_procedure',
        instructionJp: '砥石交換時の安全基準として最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah prosedur pengujian yang wajib dilakukan menurut hukum setelah mengganti batu gerinda baru.',
        prompt: 'グラインダー（両頭グラインダーなど）の 砥石（といし）を 取り替えた直後、法令で 義務付けられている 安全確認手順は 何ですか。',
        targetWord: '試運転',
        options: [
          '砥石の覆い（安全カバー）を取り付け、3分間以上の試運転（から運転）を行う',
          'カバーを外したまま、すぐに全力で金属を押し当てて削ってみる',
          '試運転は時間の無駄なので省略し、直ちに量産作業に入る',
          '砥石をハンマーで思い切り叩いて割れないか確かめる'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Berdasarkan Peraturan K3 Industri Jepang (An\'ei-soku Pasal 118), setelah mengganti batu gerinda baru, pekerja wajib memasang cover pelindung dan melakukan uji putar kosong (試運転) minimal 3 menit (dan minimal 1 menit sebelum mulai kerja harian). Bila batu gerinda cacat retak rambut, ia akan pecah meledak saat putaran awal; berdiri di luar garis putaran menghindarkan serpihan maut.',
          distractorAutopsy: {
            '1': 'Opsi 1 BENAR MUTLAK: Pasang penutup cover pengaman dan lakukan uji putar kosong selama 3 menit atau lebih.',
            '2': 'Mengoperasikan tanpa cover membuat serpihan ledakan batu gerinda berkecepatan >100 km/jam menembus kepala.',
            '3': 'Melewatkan uji coba melanggar hukum; batu gerinda yang retak rambut akan meledak saat kena beban.',
            '4': 'Memukul batu gerinda dengan palu justru menghancurkan struktur keramik vitrified yang rapuh.'
          },
          mnemonicSensei: 'Ganti batu gerinda baru? Wajib uji putar kosong (試運転) minimal 3 MENIT! Berdirilah di samping cover, jangan segaris dengan putaran batu.',
          l1InterferenceAlert: 'Batu gerinda yang cacat retak rambut akan meledak pecah berkeping-keping saat putaran maksimal. Tiga menit pertama adalah saat paling kritis.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-mfg-01',
            unitNumber: 1,
            unitTitleId: 'Keselamatan Mesin Perkakas & Pencegahan Terbelit Poros',
            advice: 'Prosedur 砥石交換: 1. Uji ketuk suara (打音検査 - bunyi "ting" nyaring), 2. Pasang cover pengaman, 3. 試運転 3 分間 (putar kosong 3 menit).'
          },
          safetyTip: 'Celah jarak antara batu gerinda dan meja penopang benda kerja (ワークレスト) harus disetel maksimal 2-3 mm agar benda kerja tidak terjepit ke dalam celah.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-manufacturing',
          unitId: 'unit-curriculum-ssw-mfg-01',
          unitNumber: 1,
          unitTitleId: 'Keselamatan Mesin Perkakas & Pencegahan Terbelit Poros'
        }
      },
      {
        id: 'SSW-MF-S01-Q013',
        trackType: 'ssw',
        sswSectorId: 'ssw-manufacturing',
        mondaiNumber: 13,
        mondaiType: 'ssw_technical_terminology',
        instructionJp: '5S定位置管理の用語として最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah metode penyimpanan perkakas dengan papan bergambar siluet bentuk alat.',
        prompt: '製造現場で、工具や 治具を 元の場所に戻しやすくし、紛失や 探すムダをなくすための 工夫として 最も適切なものは どれですか。',
        targetWord: '姿置き',
        options: [
          '工具の形をくり抜いたウレタンフォームや、シルエット線を描いた定位置管理（姿置き）',
          'すべての工具を大きな箱の中にまとめて放り込んでおく',
          '各作業員が自分のロッカーに工具を隠して鍵をかけておく',
          '工場内のあちこちの床に適当に散らばせて置いておく'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Penyimpanan bayangan bentuk / shadow board (姿置き - sugata-oki / 定位置管理) menampilkan garis siluet atau busa cekungan sesuai bentuk alat. Siapapun dapat langsung melihat dalam 1 detik bila ada alat yang hilang dan mengembalikannya ke posisi tepat tanpa membuang waktu berpikir.',
          distractorAutopsy: {
            '1': '工具の形をくり抜いた定位置管理（姿置き） adalah KUNCI BENAR (shadow board / penyimpanan bentuk siluet perkakas).',
            '2': 'Menumpuk semua alat dalam satu kotak besar menggores alat presisi dan membuang waktu mengaduk-aduk.',
            '3': 'Menyimpan alat di loker pribadi merugikan rekan kerja lain dan menimbulkan pemborosan pembelian ganda.',
            '4': 'Menebarkan alat di lantai memicu tersandung dan merusak perkakas.'
          },
          mnemonicSensei: 'Sugata-oki = Papan Bayangan Alat! Setiap kunci pas punya gambar siluetnya sendiri. Sekali lihat langsung tahu: "Kunci nomor 12 hilang!"',
          l1InterferenceAlert: 'Di pabrik Jepang, mencari barang lebih dari 10 detik dihitung sebagai pemborosan (ムダ - muda). Semua alat punya "alamat rumah" tetap (定位置).',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-mfg-03',
            unitNumber: 3,
            unitTitleId: 'Manajemen Mutu (QC), Penanganan Barang Cacat & 5S Pabrik',
            advice: 'Prinsip 3 Tei (三定): 1. 定位置 (lokasi tetap), 2. 定品 (barang tetap), 3. 定量 (jumlah tetap).'
          },
          safetyTip: 'Bila ada perkakas yang rusak atau aus, segera laporkan ke bagian peralatan untuk ditukar baru, jangan kembalikan alat rusak ke papan.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-manufacturing',
          unitId: 'unit-curriculum-ssw-mfg-03',
          unitNumber: 3,
          unitTitleId: 'Manajemen Mutu (QC), Penanganan Barang Cacat & 5S Pabrik'
        }
      },
      {
        id: 'SSW-MF-S01-Q014',
        trackType: 'ssw',
        sswSectorId: 'ssw-manufacturing',
        mondaiNumber: 14,
        mondaiType: 'ssw_hou_ren_so_sbar',
        instructionJp: '作業標準の指示会話として、（　　）に入る最も適切な言葉を一つ選びなさい。',
        instructionId: 'Pilihlah poin krusial keselamatan dan kualitas yang wajib dibaca bersama dari SOP sebelum merakit lot baru.',
        prompt: '班長「これより第3ロットの 組み立てに入る。始める前に、全員で 手順書の（　　）を 声に出して 読み合わせしよう！」',
        targetWord: '急所',
        options: [
          '作業手順と急所（安全ポイント・品質ポイント）',
          '工場の昨年の売上金額',
          '社内旅行のパンフレット',
          '今朝のテレビニュースの話題'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Lembar Instruksi Kerja Standar (作業標準書 / 手順書) merinci urutan langkah kerja dan titik kritis penting (急所 - kyuusho) baik terkait poin keselamatan maupun poin mutu. Membaca bersama secara lantang (読み合わせ) menyatukan pemahaman seluruh anggota tim sebelum proses.',
          distractorAutopsy: {
            '1': '作業手順と急所（安全ポイント・品質ポイント） adalah KUNCI BENAR (langkah kerja & titik kritis K3/kualitas).',
            '2': 'Laporan angka penjualan tahun lalu adalah metrik manajemen umum, bukan instruksi lini perakitan.',
            '3': 'Brosur liburan perusahaan tidak ada kaitannya dengan pencegahan kesalahan perakitan.',
            '4': 'Topik berita televisi pagi tidak memperjelas instruksi kerja spesifik produk.'
          },
          mnemonicSensei: 'SOP Pabrik Jepang: Selalu cek "Kyuusho" (Titik Kritis)! Bagian mana yang berisiko tangan terjepit dan bagian mana yang berisiko baut miring.',
          l1InterferenceAlert: 'Bekerja hanya berdasarkan ingatan (勘や記憶) dilarang keras. Jika prosedur diperbarui sedikit saja, seluruh tim wajib membaca bersama lembar revisinya.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-mfg-03',
            unitNumber: 3,
            unitTitleId: 'Manajemen Mutu (QC), Penanganan Barang Cacat & 5S Pabrik',
            advice: 'Komponen SOP: 作業手順 (langkah kerja) + 急所 (titik kritis) + 理由 (alasan kenapa harus demikian).'
          },
          safetyTip: 'Jika ada langkah kerja yang berbeda antara kebiasaan di lini dengan isi dokumen SOP, segera laporkan ke pimpinan untuk dievaluasi.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-manufacturing',
          unitId: 'unit-curriculum-ssw-mfg-03',
          unitNumber: 3,
          unitTitleId: 'Manajemen Mutu (QC), Penanganan Barang Cacat & 5S Pabrik'
        }
      },
      {
        id: 'SSW-MF-S01-Q015',
        trackType: 'ssw',
        sswSectorId: 'ssw-manufacturing',
        mondaiNumber: 15,
        mondaiType: 'ssw_k3_procedure',
        instructionJp: '溶接作業の保護具として最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah kombinasi APD lengkap saat melakukan pengelasan busur listrik.',
        prompt: '溶接（アーク溶接や CO2溶接）作業を 行う際、アーク光による 失明や 皮膚の炎症を 防ぐために 着用すべき 保護具の組み合わせは どれですか。',
        targetWord: '遮光面',
        options: [
          '遮光面（溶接用保護面）、長袖作業着、皮手袋、および足カバー',
          '普通のサングラス、半袖シャツ、短パン、サンダル',
          '紙マスクと水泳用ゴーグルのみ',
          '素手、素肌で作業し、目を細めて見ながら溶接する'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Busur las listrik memancarkan sinar ultraviolet dan inframerah sangat kuat (>3000°C). Helm kedok las penyaring cahaya (遮光面) mencegah konjungtivitis busur listrik (電気性眼炎 - arc eye). Sarung tangan kulit tebal (皮手袋), baju lengan panjang katun/kulit rapat, dan pelindung kaki mencegah luka bakar radiasi sinar UV dan percikan logam cair.',
          distractorAutopsy: {
            '1': 'Opsi 1 BENAR MUTLAK: Topeng kedok las (遮光面), baju lengan panjang rapat, sarung tangan kulit, dan pelindung kaki.',
            '2': 'Kacamata hitam biasa dan kaos lengan pendek menyebabkan kulit melepuh terbakar radiasi UV parah.',
            '3': 'Masker kertas dan kacamata renang tidak memiliki filter optik sinar las dan mudah meleleh terbakar.',
            '4': 'Melihat sinar las secara langsung dengan mata telanjang menyebabkan kerusakan retina permanen.'
          },
          mnemonicSensei: 'Sinar Las (アーク光) = Sinar UV perusak mata dan kulit! Wajib: Topeng las (遮光面) + Sarung tangan kulit tebal (皮手袋) + Baju lengan panjang rapat.',
          l1InterferenceAlert: 'Banyak pekerja pemula terkena kelilipan api las (電気性眼炎) di malam hari setelah mengintip sinar las tanpa kedok las. Matanya akan terasa seperti ditaburi pasir panas semalaman.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-mfg-01',
            unitNumber: 1,
            unitTitleId: 'Keselamatan Mesin Perkakas & Pencegahan Terbelit Poros',
            advice: 'Aturan las: 1. Pasang partisi tirai pelindung (遮光カーテン) agar rekan sebelah tak kena sinar, 2. Gunakan nomor filter kaca las yang sesuai amper (遮光度番号), 3. Nyalakan exhaust asap las.'
          },
          safetyTip: 'Gunakan kacamata pelindung bening di balik helm las saat mengetok terak sisa las (slag chipping) agar serpihan terak panas tidak mengenai mata.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-manufacturing',
          unitId: 'unit-curriculum-ssw-mfg-01',
          unitNumber: 1,
          unitTitleId: 'Keselamatan Mesin Perkakas & Pencegahan Terbelit Poros'
        }
      }
    ]
  };
}

module.exports = { getSSWManufacturingSet };
