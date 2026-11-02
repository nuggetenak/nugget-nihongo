/**
 * SSW Agriculture (Nougyou / 農業 - 耕種・畜産) Golden Set 01
 * Grounded in MAFF (Ministry of Agriculture, Forestry and Fisheries) & ASCA Official Textbooks
 * 15 Items: Pesticide Spraying (Wind Alignment), Tractor PTO, Tekika Thinning, Greenhouse Climate, Livestock Biosecurity
 */

function getSSWAgricultureSet() {
  return {
    setId: 'ssw-agriculture-set01',
    trackType: 'ssw',
    sswSectorId: 'ssw-agriculture',
    title: 'Set Latihan SSW Agriculture (Pertanian & Peternakan) - 01',
    description: 'Simulasi modular 15 menit menguji istilah budidaya tanaman, keselamatan mesin pertanian (traktor & PTO), penyemprotan pestisida, sortasi buah (senbetsu), dan biosekuriti kandang.',
    targetUnits: 'Kurikulum Vokasional Pertanian: Budidaya Tanaman, Pengoperasian Mesin Tani, Panen & K3 Kebun/Kandang',
    totalItems: 15,
    timeLimitMinutes: 15,
    passingScore: 10,
    items: [
      {
        id: 'SSW-AG-S01-Q01',
        trackType: 'ssw',
        sswSectorId: 'ssw-agriculture',
        mondaiNumber: 1,
        mondaiType: 'ssw_k3_procedure',
        instructionJp: '農薬散布の安全手順として最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah posisi arah angin yang benar saat menyemprotkan pestisida di kebun.',
        prompt: '農薬（のうやく）を 散布するとき、風向きに対して どのように散布するのが 正しいですか。',
        targetWord: '風上',
        options: [
          '風上（かざかみ）を背にして、風下（かざしも）に向かって散布する',
          '風下（かざしも）に立ち、風上に向かって散布する',
          '風が強く吹き荒れている台風のような時に散布する',
          '風向きは一切気にせず、自分の歩きたい方向に散布する'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Saat menyemprot pestisida, operator wajib selalu membelakangi arah angin / berdiri di atas angin (風上を背にする) dan menyemprotkan kabut racun ke arah bawah angin (風下に向かって). Jika berdiri di bawah angin, kabut kimia beracun akan berbalik menerpa wajah, mata, dan pernapasan operator.',
          distractorAutopsy: {
            '1': 'Opsi 1 BENAR MUTLAK: Berdiri membelakangi angin (di posisi atas angin) dan semprot ke arah bawah angin.',
            '2': 'Berdiri di bawah angin membuat kabut racun terbang langsung ke tubuh operator.',
            '3': 'Menyemprot saat angin kencang menyebabkan racun melayang liar (drifting) ke tanaman tetangga dan pemukiman.',
            '4': 'Mengabaikan arah angin mengakibatkan keracunan zat kimia akut (農薬中毒).'
          },
          mnemonicSensei: 'Semprot Pestisida: Punggung membelakangi angin! (風上を背にする). Biarkan angin meniup racun menjauhi badanmu.',
          l1InterferenceAlert: 'Di pedesaan tradisional Indonesia, petani kadang menyemprot tanpa memperhitungkan hembusan angin. Di pertanian Jepang, arah angin wajib dicek dengan bendera pita sebelum membuka kran semprot.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-agri-01',
            unitNumber: 1,
            unitTitleId: 'Budidaya Tanaman, Pengendalian Hama & Pestisida',
            lessonId: 'les-ssw-ag-01',
            vocabId: 'vg-ssw-ag-001',
            advice: 'Aturan semprot: 1. Berdiri di 风上 (atas angin), 2. Semprot ke arah 风下 (bawah angin), 3. Jangan semprot jika angin kencang (> 3 m/s).'
          },
          safetyTip: 'Gunakan masker khusus pestisida dengan filter karbon aktif, bukan masker bedah tipis.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-agriculture',
          unitId: 'unit-curriculum-ssw-agri-01',
          unitNumber: 1,
          unitTitleId: 'Budidaya Tanaman, Pengendalian Hama & Pestisida'
        }
      },
      {
        id: 'SSW-AG-S01-Q02',
        trackType: 'ssw',
        sswSectorId: 'ssw-agriculture',
        mondaiNumber: 2,
        mondaiType: 'ssw_k3_procedure',
        instructionJp: 'トラクター作業の安全ルールとして最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah aturan mutlak untuk mencegah tubuh terlilit pada poros PTO traktor.',
        prompt: 'トラクターの PTOシャフト（動力取り出し軸）の 周りで作業するとき、巻き込まれ事故を 防ぐための 最重要ルールは 何ですか。',
        targetWord: 'PTO安全カバー',
        options: [
          'PTO安全カバーを必ず装着し、エンジンを停止してから近づく',
          'だぶだぶのゆったりした長袖を着て作業する',
          '手袋として軍手（布製手袋）をはめてシャフトを直接触る',
          '回転している最中に手や足で泥を払い落とす'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Poros PTO traktor berputar pada 540 hingga 1000 RPM dengan torsi raksasa. Pakaian longgar, handuk leher, atau sarung tangan yang tersentuh poros terbuka akan terlilit seketika dan mencelakakan pekerja fatal. Penutup pelindung (PTO安全カバー) wajib terpasang dan mesin traktor wajib dimatikan (OFF) sebelum mendekat.',
          distractorAutopsy: {
            '1': 'Opsi 1 BENAR MUTLAK: Selalu pasang penutup PTO dan matikan mesin traktor sebelum mendekat.',
            '2': 'Pakaian longgar dan kebesaran adalah penyebab utama kain tersangkut pada poros berputar.',
            '3': 'Sarung tangan rajut kain (軍手) sangat mudah terlilit poros dan menarik tangan masuk ke girboks.',
            '4': 'Menyentuh poros berputar dengan tangan/kaki mengakibatkan patah tulang atau amputasi seketika.'
          },
          mnemonicSensei: 'Poros PTO berputar ribuan kali per menit! Kunci mati mesin baru sentuh, pasang cover pelindung selalu!',
          l1InterferenceAlert: 'Banyak kecelakaan fatal magang pertanian di Jepang berawal dari handuk yang dikalungkan di leher (首かけタオル) terlilit poros traktor. Dilarang keras mengalungkan handuk!',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-agri-02',
            unitNumber: 2,
            unitTitleId: 'Keselamatan Pengoperasian Mesin & Alat Pertanian',
            advice: 'Larangan mesin putar tani: 1. Pasang PTOカバー, 2. Mesin wajib OFF saat pengecekan, 3. Dilarang pakaian longgar/handuk leher/sarung tangan rajut.'
          },
          safetyTip: 'Sebelum menghidupkan mesin traktor, bunyikan klakson untuk memperingatkan orang di sekeliling roda.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-agriculture',
          unitId: 'unit-curriculum-ssw-agri-02',
          unitNumber: 2,
          unitTitleId: 'Keselamatan Pengoperasian Mesin & Alat Pertanian'
        }
      },
      {
        id: 'SSW-AG-S01-Q03',
        trackType: 'ssw',
        sswSectorId: 'ssw-agriculture',
        mondaiNumber: 3,
        mondaiType: 'ssw_technical_terminology',
        instructionJp: '栽培管理の用語として最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah istilah merontokkan buah berlebih agar buah tersisa tumbuh besar dan manis.',
        prompt: '果樹（トマトやりんごなど）の 栽培で、大きく甘い果実を 収穫するために、余分な花や 小さな実を 摘み取る作業を 何と言いますか。',
        targetWord: '摘果',
        options: [
          '摘果（てきか / 実すぐり）',
          '土寄せ（つちよせ）',
          '中耕（ちゅうこう）',
          '定植（ていしょく）'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Penjarangan buah disebut "Tekika" (摘果 / 実すぐり). Dengan membuang buah yang cacat, kerdil, atau berdesakan, nutrisi pohon terfokus pada buah-buah terbaik sehingga menghasilkan buah berukuran besar, manis, dan berkelas pasar tinggi (秀品).',
          distractorAutopsy: {
            '1': '摘果（てきか） adalah KUNCI BENAR (penjarangan/pemilahan buah muda di pohon).',
            '2': '土寄せ (pembumbunan tanah) menimbun tanah ke pangkal batang tanaman agar kokoh.',
            '3': '中耕 (pendangiran) menggemburkan tanah di antara barisan tanaman untuk membunuh gulma muda.',
            '4': '定植 (teishoku) adalah pemindahan bibit muda dari persemaian ke lahan bedengan permanen.'
          },
          mnemonicSensei: 'Teki (Memetik) + Ka (Buah) = Petik buah yang kerdil/cacat! Sisakan buah montok agar nutrisinya tidak terbagi-bagi.',
          l1InterferenceAlert: 'Bagi pemula, terasa sayang membuang buah muda yang banyak. Namun di Jepang, kualitas (kemanisan dan ukuran) dihargai jauh lebih tinggi daripada kuantitas buah kecil yang berharga murah.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-agri-01',
            unitNumber: 1,
            unitTitleId: 'Budidaya Tanaman, Pengendalian Hama & Pestisida',
            advice: 'Kosakata budidaya: 摘花 (tekka = rontokkan bunga), 摘果 (tekika = seleksi buah), 摘心 (tekishin = pangkas pucuk daun).'
          },
          safetyTip: 'Gunakan gunting pemangkas khusus buah dengan ujung membulat agar mata pisau tidak menusuk kulit buah di sampingnya.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-agriculture',
          unitId: 'unit-curriculum-ssw-agri-01',
          unitNumber: 1,
          unitTitleId: 'Budidaya Tanaman, Pengendalian Hama & Pestisida'
        }
      },
      {
        id: 'SSW-AG-S01-Q04',
        trackType: 'ssw',
        sswSectorId: 'ssw-agriculture',
        mondaiNumber: 4,
        mondaiType: 'ssw_k3_procedure',
        instructionJp: 'ハウス内作業の環境管理として最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah tindakan pengendalian suhu greenhouse saat musim panas untuk mencegah heatstroke.',
        prompt: 'ビニールハウス（施設園芸）の 内部で夏場に 作業する際、熱中症を 防ぐための 管理として 正しいものは どれですか。',
        targetWord: '遮光ネット',
        options: [
          'サイドのビニールを開け、換気扇（ファン）を回し、遮光ネット（寒冷紗）を活用する',
          '湿気と熱を閉じ込めるために、ハウスの窓やドアを完全に閉め切る',
          '体温が下がると風邪を引くため、厚着をして長時間の連続作業を行う',
          'ハウス内の温度計は見ずに、自分の勘だけで限界まで耐える'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Greenhouse plastik mengurung radiasi panas matahari dan suhunya bisa menembus 45°C di musim panas. Membuka tirai samping, menyalakan exhaust fan ventilasi, dan membentangkan jaring peneduh (遮光ネット / 寒冷紗) mutlak dilakukan bersama jadwal rehidrasi teratur.',
          distractorAutopsy: {
            '1': 'Opsi 1 BENAR: Buka tirai samping, nyalakan exhaust fan, dan pasang jaring peneduh hitam.',
            '2': 'Menutup rapat jendela dan pintu menyebabkan suhu melonjak melewati 50°C dan memicu kematian seketika.',
            '3': 'Pakaian tebal mencegah penguapan keringat dan mempercepat sengatan panas.',
            '4': 'Mengabaikan termometer dan mengandalkan ketahanan fisik berujung kolaps tidak sadarkan diri.'
          },
          mnemonicSensei: 'Greenhouse musim panas bagai sauna raksasa! Buka tirai samping, nyalakan blower, pasang jaring peneduh (遮光ネット)!',
          l1InterferenceAlert: 'Suhu di dalam greenhouse Jepang jauh lebih menyengat daripada sawah terbuka di Indonesia. Panas radiasi infra-merah di bawah plastik bisa memicu dehidrasi kilat.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-agri-01',
            unitNumber: 1,
            unitTitleId: 'Budidaya Tanaman, Pengendalian Hama & Pestisida',
            advice: 'Kombinasi pendinginan greenhouse: 1. 換気ファン (kipas exhaust), 2. 遮光ネット (shading net), 3. Minum air + garam berkala.'
          },
          safetyTip: 'Gunakan baju kerja berkipas angin (空調服 - kuuchoufuku) untuk membantu sirkulasi udara dingin di dalam greenhouse.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-agriculture',
          unitId: 'unit-curriculum-ssw-agri-01',
          unitNumber: 1,
          unitTitleId: 'Budidaya Tanaman, Pengendalian Hama & Pestisida'
        }
      },
      {
        id: 'SSW-AG-S01-Q05',
        trackType: 'ssw',
        sswSectorId: 'ssw-agriculture',
        mondaiNumber: 5,
        mondaiType: 'ssw_technical_terminology',
        instructionJp: '出荷調製の用語として最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah istilah pemilahan hasil panen berdasarkan ukuran, berat, dan mutu sebelum dikemas.',
        prompt: '収穫した 農作物を 大きさ・重さ・色・傷の有無などによって ランク分けし、箱詰めする作業を 何と言いますか。',
        targetWord: '選別',
        options: [
          '選別（せんべつ）・調製（ちょうせい）',
          '育苗（いくびょう）',
          '播種（はしゅ）',
          '土壌消毒（どじょうしょうどく）'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Sortasi dan persiapan panen disebut "Senbetsu" (選別) dan "Chousei" (調製). Hasil panen dikelompokkan sesuai standar Koperasi Pertanian Jepang (JA) ke dalam tingkat mutu (秀 - Shu, 優 - Yuu, 良 - Ryou) dan ukuran (2L, L, M, S) sebelum dimasukkan ke dalam kardus kemasan resmi.',
          distractorAutopsy: {
            '1': '選別・調製 adalah KUNCI BENAR (pemilahan grade mutu dan pengepakan hasil panen).',
            '2': '育苗 (ikubyou) adalah pemeliharaan bibit di persemaian.',
            '3': '播種 (hashu) adalah penaburan benih ke tanah persemaian.',
            '4': '土壌消毒 (dojou shoudoku) adalah sterilisasi tanah dari patogen jamur/bakteri.'
          },
          mnemonicSensei: 'Senbetsu = Memilih & Memisahkan! Grade A (秀 - mulus), Grade B (優 - sedikit gores), Grade C (良 - bengkok). Jangan sampai salah kotak!',
          l1InterferenceAlert: 'Di pasar tradisional Indonesia cabai atau buah sering dicampur dalam satu karung. Di Jepang, satu buah tomat yang salah ukuran atau bergores di kotak "Grade A" bisa membuat seluruh palet ditolak pasar lelang JA.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-agri-03',
            unitNumber: 3,
            unitTitleId: 'Panen, Sortasi (Senbetsu) & Pengelolaan Pasca Panen',
            advice: 'Tingkatan mutu JA: 秀 (Shu = Istimewa/sempurna), 優 (Yuu = Baik), 良 (Ryou = Cukup baik). Ukuran: 2L, L, M, S.'
          },
          safetyTip: 'Saat menyusun kardus sayuran ke atas palet (palletizing), gunakan pola kunci silang agar tumpukan tidak roboh saat diangkut forklift.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-agriculture',
          unitId: 'unit-curriculum-ssw-agri-03',
          unitNumber: 3,
          unitTitleId: 'Panen, Sortasi (Senbetsu) & Pengelolaan Pasca Panen'
        }
      },
      {
        id: 'SSW-AG-S01-Q06',
        trackType: 'ssw',
        sswSectorId: 'ssw-agriculture',
        mondaiNumber: 6,
        mondaiType: 'ssw_k3_procedure',
        instructionJp: '草刈り作業の保護具として最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah APD wajib saat mengoperasikan mesin pemotong rumput (karibaraiki) untuk mencegah kebutaan.',
        prompt: '農場で 刈払機（かりばらいき / 草刈り機）を 使用して 雑草を刈る際、小石の飛散による 失明や ケガを防ぐための 必須装備は どれですか。',
        targetWord: 'フェイスシールド',
        options: [
          'フェイスシールド（または保護メガネ）および飛散防止カバー',
          'サンダルとサングラスのみ',
          '麦わら帽子と軍手のみ',
          '普通の長靴だけでメガネは不要'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Mata pisau mesin babat rumput berputar di atas 5000 RPM. Bila mengenai kerikil, batu akan terpental dengan kecepatan peluru. Face shield / kacamata pelindung dan penutup pengaman pisau (飛散防止カバー) wajib dipasang, ditambah pelindung tulang kering (すね当て).',
          distractorAutopsy: {
            '1': 'Opsi 1 BENAR: Face shield pelindung wajah dan cover pelindung percikan pada pisau.',
            '2': 'Sandal membuat kaki rentan tertebas pisau, dan kacamata hitam biasa tidak tahan benturan peluru batu.',
            '3': 'Topi jerami dan sarung tangan kain tidak memberi perlindungan dari serpihan batu berkecepatan tinggi.',
            '4': 'Tanpa kacamata pelindung, cipratan kerikil mengakibatkan pecah kornea mata dan kebutaan permanen.'
          },
          mnemonicSensei: 'Mesin babat rumput = Pelempar batu liar! Face shield di muka, cover pengaman di pisau, pelindung tulang kering di kaki.',
          l1InterferenceAlert: 'Di Indonesia banyak pemotong rumput hanya memakai topi biasa tanpa pelindung mata. Di Jepang, batu terpental dari pisau mesin babat adalah penyebab kebutaan kerja nomor 1 di pertanian.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-agri-02',
            unitNumber: 2,
            unitTitleId: 'Keselamatan Pengoperasian Mesin & Alat Pertanian',
            advice: 'Set pemotong rumput: フェイスシールド (pelindung wajah), 飛散防止カバー (cover pisau), すね当て (pelindung tulang kering).'
          },
          safetyTip: 'Pastikan tidak ada orang lain berada dalam radius 15 meter dari operator mesin babat rumput.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-agriculture',
          unitId: 'unit-curriculum-ssw-agri-02',
          unitNumber: 2,
          unitTitleId: 'Keselamatan Pengoperasian Mesin & Alat Pertanian'
        }
      },
      {
        id: 'SSW-AG-S01-Q07',
        trackType: 'ssw',
        sswSectorId: 'ssw-agriculture',
        mondaiNumber: 7,
        mondaiType: 'ssw_hou_ren_so_sbar',
        instructionJp: '台風対策の指示会話として、（　　）に入る最も適切な言葉を一つ選びなさい。',
        instructionId: 'Pilihlah sabuk pengikat atap plastik greenhouse agar tidak terbawa angin badai.',
        prompt: '農場長「今日の夕方から 大雨と 強風の予報が出ているぞ。ハウスの（　　）を しっかり点検して、風で飛ばされないように 締め直せ！」',
        targetWord: 'ハウスバンド',
        options: [
          'ハウスバンド（マイカ線・押さえ紐）',
          '農機具のペンキのツヤ',
          '休憩所の灰皿',
          '畑の雑草の長さ'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Sebelum badai topan melanda, tali pengikat atap plastik greenhouse (ハウスバンド / マイカ線) harus diperiksa dan dikencangkan ke patok tanah agar kulit plastik tidak menggelembung terlepas ditiup angin badai atau merusak rangka pipa galvanis.',
          distractorAutopsy: {
            '1': 'ハウスバンド（マイカ線） adalah KUNCI BENAR (tali sabuk penahan atap plastik greenhouse).',
            '2': 'Kilap cat alat mesin tidak ada hubungannya dengan ketahanan badai topan.',
            '3': 'Asbak ruang istirahat tidak melindungi plastik greenhouse dari angin kencang.',
            '4': 'Panjang rumput liar tidak menahan robekan plastik atap saat badai.'
          },
          mnemonicSensei: 'House Band = Sabuk Pengikat Atap Plastik! Kencangkan tali band ke patok tanah agar plastik greenhouse tidak terbang diterbangkan badai.',
          l1InterferenceAlert: 'Bila atap plastik terlepas sedikit saja saat badai, angin akan masuk dari celah itu dan merobek seluruh atap greenhouse dalam sekejap. Harus diperiksa ikatan sabuknya.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-agri-01',
            unitNumber: 1,
            unitTitleId: 'Budidaya Tanaman, Pengendalian Hama & Pestisida',
            advice: 'Antisipasi topan: Kencangkan ハウスバンド -> Tutup rapat semua pintu/ventilasi -> Bersihkan selokan air (明渠).'
          },
          safetyTip: 'Setelah badai reda, jangan langsung menyentuh kabel listrik yang menimpa rangka greenhouse sebelum teknisi PLN memeriksa.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-agriculture',
          unitId: 'unit-curriculum-ssw-agri-01',
          unitNumber: 1,
          unitTitleId: 'Budidaya Tanaman, Pengendalian Hama & Pestisida'
        }
      },
      {
        id: 'SSW-AG-S01-Q08',
        trackType: 'ssw',
        sswSectorId: 'ssw-agriculture',
        mondaiNumber: 8,
        mondaiType: 'ssw_technical_terminology',
        instructionJp: '家畜衛生管理として最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah tindakan biosekuriti mutlak di pintu masuk peternakan untuk mencegah flu burung dan flu babi.',
        prompt: '畜産農業（牛・豚・鶏など）において、伝染病（鳥インフルエンザや 豚熱など）の 農場内への侵入を 防ぐために 出入口で行う 最も基本的な 衛生管理は 何ですか。',
        targetWord: '専用長靴',
        options: [
          '専用の衣服・長靴への履き替えと、車両・手指の徹底的な消毒',
          '動物たちに大きな声で「こんにちは」と元気に挨拶する',
          '出入口のドアを常に開け放して風通しをよくしておく',
          '近所の野良猫や野生動物を畜舎内に自由に招き入れる'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Standar kebersihan peternakan Jepang (飼養衛生管理基準) mewajibkan penggantian sepatu boot khusus kandang, penyemprotan disinfektan pada roda kendaraan di kolam desinfeksi, mencuci tangan, dan memakai wearpack bersih guna memblokir masuknya virus mematikan.',
          distractorAutopsy: {
            '1': 'Opsi 1 BENAR MUTLAK: Ganti pakaian/sepatu boot khusus kandang dan disinfeksi kendaraan/tangan.',
            '2': 'Menyapa ternak dengan lantang tidak memiliki efek sterilisasi virus mikrobiologis.',
            '3': 'Membuka pintu kandang selebar-lebarnya mengundang burung liar dan tikus pembawa wabah masuk ke kandang.',
            '4': 'Membiarkan kucing liar masuk merupakan pelanggaran berat biosekuriti yang membawa bibit penyakit.'
          },
          mnemonicSensei: 'Biosecurity Peternakan: Ganti sepatu boot khusus + semprot disinfektan roda + cuci tangan! Jangan biarkan virus flu masuk kandang.',
          l1InterferenceAlert: 'Satu ekor ternak terinfeksi flu burung di Jepang berakibat pemusnahan total (殺処分 - satsushobun) ratusan ribu ekor ternak dan kerugian miliaran rupiah. Disinfeksi bukan formalitas!',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-agri-04',
            unitNumber: 4,
            unitTitleId: 'Peternakan (Chikusan), Kebersihan Ternak & Biosekuriti',
            advice: 'Prosedur masuk kandang: Injak karpet disinfektan (消毒マット) -> Ganti boot bersih (専用長靴) -> Pakai wearpack bersih (防護服).'
          },
          safetyTip: 'Ganti cairan disinfektan pada bak pencuci kaki minimal satu kali seminggu atau bila cairan sudah keruh bercampur tanah.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-agriculture',
          unitId: 'unit-curriculum-ssw-agri-04',
          unitNumber: 4,
          unitTitleId: 'Peternakan (Chikusan), Kebersihan Ternak & Biosekuriti'
        }
      },
      {
        id: 'SSW-AG-S01-Q09',
        trackType: 'ssw',
        sswSectorId: 'ssw-agriculture',
        mondaiNumber: 9,
        mondaiType: 'ssw_k3_procedure',
        instructionJp: '農薬保管の法的ルールとして最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah aturan hukum mutlak dalam penyimpanan obat pestisida beracun.',
        prompt: '農薬や 肥料を 保管する倉庫（農薬保管庫）の 管理方法として、法令で 定められている 必須のルールは どれですか。',
        targetWord: '施錠管理',
        options: [
          '必ず頑丈な鍵（カギ）をかけて施錠管理し、関係者以外立ち入り禁止にする',
          '誰でもいつでも自由に持って行けるように、扉を開けておく',
          '清涼飲料水のペットボトルに移し替えて並べておく',
          '日光が一日中直接当たる屋外の地面に野積みにしておく'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Berdasarkan UU Pengendalian Zat Beracun Jepang (Dokugeki-hou), lemari/gudang penyimpanan pestisida wajib dikunci rapat (施錠管理), diberi tanda larangan masuk bagi pihak yang tidak berkepentingan, dan dicatat di buku keluar-masuk barang untuk mencegah pencurian atau salah minum.',
          distractorAutopsy: {
            '1': 'Opsi 1 BENAR MUTLAK: Selalu kunci gembok lemari pestisida dan batasi akses hanya untuk petugas berwenang.',
            '2': 'Membuka pintu bebas berisiko obat beracun dicuri atau terminum oleh anak-anak.',
            '3': 'Memindahkan pestisida ke botol bekas minuman adalah penyebab nomor satu kasus keracunan fatal (誤飲).',
            '4': 'Menjemur pestisida di terik matahari merusak stabilitas kimiawi obat dan menimbulkan bahaya kebakaran.'
          },
          mnemonicSensei: 'Nouyaku (Racun Kimia Pertanian) = Wajib Gembok (施錠)! Jangan pernah simpan racun di botol bekas teh/Aqua.',
          l1InterferenceAlert: 'Di Indonesia sisa racun sering dituang ke botol air mineral bekas. Di Jepang, perbuatan ini dilarang keras secara hukum dan pelakunya diancam pidana denda/penjara.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-agri-01',
            unitNumber: 1,
            unitTitleId: 'Budidaya Tanaman, Pengendalian Hama & Pestisida',
            advice: 'Aturan lemari racun: Wajib gembok (施錠) -> Tulisan tebal 医薬用外毒物/劇物 -> Buku catatan keluar masuk -> Dilarang pindah wadah botol minum.'
          },
          safetyTip: 'Simpan kunci lemari pestisida di tempat terpisah yang hanya diketahui oleh penanggung jawab kebun.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-agriculture',
          unitId: 'unit-curriculum-ssw-agri-01',
          unitNumber: 1,
          unitTitleId: 'Budidaya Tanaman, Pengendalian Hama & Pestisida'
        }
      },
      {
        id: 'SSW-AG-S01-Q010',
        trackType: 'ssw',
        sswSectorId: 'ssw-agriculture',
        mondaiNumber: 10,
        mondaiType: 'ssw_hou_ren_so_sbar',
        instructionJp: '収穫作業の指示会話として、（　　）に入る最も適切な言葉を一つ選びなさい。',
        instructionId: 'Pilihlah cara memegang buah stroberi saat dipetik agar tidak lebam bonyok.',
        prompt: '先輩「このイチゴは 傷みやすいから、ヘタの少し上の茎（くき）を ハサミで切って、果実には（　　）ように 優しくパックに入れろ！」',
        targetWord: '触れない',
        options: [
          'できるだけ直接指で強く触れない',
          '強くギュッと握りしめる',
          '上から勢いよく放り投げる',
          '手で表面を力いっぱい擦（こす）る'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Stroberi matang memiliki kulit yang sangat halus. Memegang badan buah dengan jari tangan yang hangat menyebabkan memar lebam (打痕) yang akan menghitam dan busuk dalam 24 jam. Pemanen memegang tangkainya di atas kelopak bunga (ヘタ) tanpa menekan badan buah.',
          distractorAutopsy: {
            '1': 'できるだけ直接指で強く触れない adalah KUNCI BENAR (jangan menekan langsung buah dengan jari hangat).',
            '2': 'Menggenggam erat meremukkan daging buah dan membuatnya langsung tak layak jual.',
            '3': 'Melempar buah dari ketinggian membuat stroberi pecah terbentur wadah plastik.',
            '4': 'Menggosok permukaan buah mengikis lapisan lilin pelindung alami (bloom) dan merusak kulit.'
          },
          mnemonicSensei: 'Panen stroberi Jepang: Pegang tangkainya, jangan remas buahnya! Suhu hangat jari tangan bisa membuat stroberi lebam dan bonyok.',
          l1InterferenceAlert: 'Buah stroberi Jepang dijual sebagai buah mewah per butir. Sentuhan kasar sedikit saja membatalkan nilai jualnya dari 1000 yen menjadi barang buangan.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-agri-03',
            unitNumber: 3,
            unitTitleId: 'Panen, Sortasi (Senbetsu) & Pengelolaan Pasca Panen',
            advice: 'Petik buah sensitif: Pegang tangkai (果柄) -> Gunting tangkai sisakan 1 cm -> Taruh lembut di tray tanpa menekan buah.'
          },
          safetyTip: 'Gunakan sarung tangan katun tipis bila memetik buah berkulit halus untuk mengurangi transfer panas dari telapak tangan.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-agriculture',
          unitId: 'unit-curriculum-ssw-agri-03',
          unitNumber: 3,
          unitTitleId: 'Panen, Sortasi (Senbetsu) & Pengelolaan Pasca Panen'
        }
      },
      {
        id: 'SSW-AG-S01-Q011',
        trackType: 'ssw',
        sswSectorId: 'ssw-agriculture',
        mondaiNumber: 11,
        mondaiType: 'ssw_k3_procedure',
        instructionJp: '刃物の安全使用として最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah tindakan keselamatan saat menggunakan arit (kama) atau gunting dahan di ladang.',
        prompt: '畑で 鎌（かま）や 剪定ばさみなどの 刃物を使って 作業するときの 正しい安全動作は どれですか。',
        targetWord: '鎌',
        options: [
          '刃を引く方向に自分の手や足、他の作業員がいないことを確認して刃を動かす',
          '刃物を手で持ったまま畑の中を走って移動する',
          '使っていない鎌を刃を上に向けて地面の草むらに放置しておく',
          '刃物を他の人に手渡すとき、刃先を相手に向けて突き出す'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Saat menarik arit pemotong atau gunting pangkas, pastikan jalur ayunan mata pisau bebas dari tangan kiri penahan rumput, lutut sendiri, atau rekan kerja di sampingnya. Menarik pisau ke arah anggota badan sendiri sangat berbahaya bila rumput mendadak putus.',
          distractorAutopsy: {
            '1': 'Opsi 1 BENAR: Pastikan arah tarikan pisau bebas dari tangan, kaki, atau orang lain di dekatnya.',
            '2': 'Berlari sambil membawa arit terbuka berisiko menusuk dada bila tersandung pematang.',
            '3': 'Meninggalkan arit menghadap ke atas di rumput menciptakan jebakan tebas bagi kaki kawan yang melangkah.',
            '4': 'Saat menyerahkan pisau ke orang lain, selalu sodorkan bagian gagangnya (柄), bukan mata pisaunya.'
          },
          mnemonicSensei: 'Pegang Arit (鎌): Tangan penahan jangan pernah segaris dengan mata pisau! Serahkan lewat gagangnya, simpan di sarung saat tak dipakai.',
          l1InterferenceAlert: 'Sering terjadi kecelakaan pemula memotong rumput dengan menarik arit ke arah jempol tangan kirinya sendiri. Posisi tangan kiri harus selalu berada di belakang jalur tarikan arit.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-agri-02',
            unitNumber: 2,
            unitTitleId: 'Keselamatan Pengoperasian Mesin & Alat Pertanian',
            advice: 'Aturan 刃物: Jalur potong bebas anggota badan -> Simpan di sarung panggul (サック) -> Oper alat lewat gagang (柄).'
          },
          safetyTip: 'Bersihkan getah tanaman dan asah mata arit dengan batu asah secara berkala agar tidak membutuhkan tenaga berlebih saat memotong.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-agriculture',
          unitId: 'unit-curriculum-ssw-agri-02',
          unitNumber: 2,
          unitTitleId: 'Keselamatan Pengoperasian Mesin & Alat Pertanian'
        }
      },
      {
        id: 'SSW-AG-S01-Q012',
        trackType: 'ssw',
        sswSectorId: 'ssw-agriculture',
        mondaiNumber: 12,
        mondaiType: 'ssw_technical_terminology',
        instructionJp: '栽培資材の名称として最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah nama plastik penutup bedengan tanah untuk mencegah kekeringan dan gulma rumput liar.',
        prompt: '野菜の栽培において、土壌の乾燥防止、地温の調整、および雑草の繁茂を防ぐために 畝（うね）の表面を覆う ビニールフィルムを 何と呼びますか。',
        targetWord: 'マルチ',
        options: [
          'マルチ（マルチフィルム）',
          '防虫ネット',
          '遮光カーテン',
          'ブルーシート'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Plastik penutup bedengan tanah disebut Mulsa / Mulch (マルチ / マルチフィルム, plastik hitam, perak, atau bening). Mulsa menahan kelembapan air tanah, mengatur suhu perakaran tanaman, dan menahan tumbuhnya gulma rumput liar karena menghalangi sinar matahari.',
          distractorAutopsy: {
            '1': 'マルチ（マルチフィルム） adalah KUNCI BENAR (plastik mulsa penutup bedengan tanah).',
            '2': '防虫ネット (jaring anti serangga) adalah kawat kelambu jaring penangkal hama kutu daun.',
            '3': '遮光カーテン (tirai peneduh) tergantung di rangka atap greenhouse.',
            '4': 'ブルーシート (terpal biru) untuk alas jemur gabah atau penutup tumpukan pupuk kandang.'
          },
          mnemonicSensei: 'Mulch (Maruchi) = Selimut Bedengan Tanah! Menjaga kelembapan tanah, menghangatkan akar, dan membuat rumput liar mati tak kena matahari.',
          l1InterferenceAlert: 'Sering disebut "plastik mulsa" di Indonesia. Di Jepang disebut マルチ (maruchi) atau マルチシート. Pemasangannya harus ditarik kencang tanpa kerutan (ピント張る).',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-agri-01',
            unitNumber: 1,
            unitTitleId: 'Budidaya Tanaman, Pengendalian Hama & Pestisida',
            advice: 'Tipe mulsa Jepang: 黒マルチ (hitam = basmi rumput), 透明マルチ (transparan = hangatkan tanah musim dingin), 銀マルチ (perak = pantulkan cahaya & usir kutu).'
          },
          safetyTip: 'Timbun tepi plastik mulsa dengan tanah secara merata agar tidak tersingkap saat diterpa angin kencang.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-agriculture',
          unitId: 'unit-curriculum-ssw-agri-01',
          unitNumber: 1,
          unitTitleId: 'Budidaya Tanaman, Pengendalian Hama & Pestisida'
        }
      },
      {
        id: 'SSW-AG-S01-Q013',
        trackType: 'ssw',
        sswSectorId: 'ssw-agriculture',
        mondaiNumber: 13,
        mondaiType: 'ssw_technical_terminology',
        instructionJp: '収穫後処理の用語として最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah proses pendinginan cepat sayuran pasca panen untuk menekan panas respirasi.',
        prompt: '収穫した直後の 野菜の呼吸熱を 抑えて鮮度を保つために、冷蔵庫に入れる前に 素早く芯まで冷やす 工程を 何と言いますか。',
        targetWord: '予冷',
        options: [
          '予冷（よれい）',
          '加温（かおん）',
          '湯通し（ゆどおし）',
          '乾燥（かんそう）'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Pendinginan awal pasca panen disebut "Yorei" (予冷 - pre-cooling). Sayuran segar yang baru dipetik dari ladang menyimpan panas respirasi tinggi; mendinginkan bagian tengah sayur secara kilat ke suhu 2-5°C menghentikan pembusukan dan mempertahankan kesegaran renyah.',
          distractorAutopsy: {
            '1': '予冷（よれい） adalah KUNCI BENAR (pendinginan cepat awal sebelum masuk cold storage).',
            '2': '加温 (pemanasan) menghangatkan greenhouse di musim dingin, kebalikan dari mendinginkan sayur.',
            '3': '湯通し (blanching) merebus sayur sebentar dengan air panas, yang merusak kesegaran sayur mentah.',
            '4': '乾燥 (pengeringan) untuk biji-bijian/gabah, bukan sayuran daun segar.'
          },
          mnemonicSensei: 'Yo (Awal) + Rei (Dingin) = Pendinginan Awal Kilat! Hilangkan panas ladang secepat mungkin agar sayur tetap segar renyah.',
          l1InterferenceAlert: 'Menaruh sayuran panas langsung ke kulkas biasa membuat bagian dalam sayur tetap hangat berjam-jam dan cepat layu membusuk. Harus lewat fasilitas pendinginan cepat (予冷施設).',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-agri-03',
            unitNumber: 3,
            unitTitleId: 'Panen, Sortasi (Senbetsu) & Pengelolaan Pasca Panen',
            advice: 'Metode 予冷: 差圧通風予冷 (angin dingin bertekanan), 真空予冷 (vakum untuk selada/brokoli), 氷冷 (es batu cair).'
          },
          safetyTip: 'Pastikan sayuran tidak terkena hembusan angin beku langsung di bawah 0°C agar daun tidak mengalami luka dingin (low-temperature injury).'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-agriculture',
          unitId: 'unit-curriculum-ssw-agri-03',
          unitNumber: 3,
          unitTitleId: 'Panen, Sortasi (Senbetsu) & Pengelolaan Pasca Panen'
        }
      },
      {
        id: 'SSW-AG-S01-Q014',
        trackType: 'ssw',
        sswSectorId: 'ssw-agriculture',
        mondaiNumber: 14,
        mondaiType: 'ssw_hou_ren_so_sbar',
        instructionJp: '牛舎作業の注意会話として、（　　）に入る最も適切な言葉を一つ選びなさい。',
        instructionId: 'Pilihlah alasan mengapa harus menyapa lembut saat berjalan di belakang pantat sapi.',
        prompt: '先輩「牛舎の清掃中に 牛の後ろを通るときは、（　　）ように 声をかけながら 距離をとって通れよ！」',
        targetWord: '後ろ足で蹴られない',
        options: [
          '牛が驚いて後ろ足で蹴（け）られない',
          '牛が寝てしまわない',
          '牛がお腹を空かせない',
          '牛が笑わない'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Sapi memiliki sudut pandang luas tetapi memiliki titik buta (blind spot) tepat di belakang pantatnya. Mendekati sapi dari belakang tanpa bersuara mengejutkan sapi, memicu tendangan kaki belakang (蹴り - keri) berkekuatan ratusan kilogram yang bisa mematahkan tulang rusuk pekerja.',
          distractorAutopsy: {
            '1': '牛が驚いて後ろ足で蹴られない adalah KUNCI BENAR (mencegah sapi kaget dan melayangkan tendangan belakang).',
            '2': 'Menyapa tidak mempengaruhi pola tidur sapi.',
            '3': 'Suara manusia tidak mempengaruhi rasa lapar biologis sapi.',
            '4': 'Sapi tidak memiliki ekspresi tertawa manusiawi.'
          },
          mnemonicSensei: 'Sapi kaget = Tendangan maut melayang! Jangan lewat di belakang pantat sapi tanpa bersuara. Panggil lembut "Hai hai~" agar dia tahu posisimu.',
          l1InterferenceAlert: 'Banyak pekerja terluka parah (patah tulang rusuk atau paha) akibat berjalan meleng di belakang sapi perah/pedaging. Sapi menendang ke belakang dan ke samping dengan sangat cepat.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-agri-04',
            unitNumber: 4,
            unitTitleId: 'Peternakan (Chikusan), Kebersihan Ternak & Biosekuriti',
            advice: 'Aturan mendekati sapi: Dekati dari arah samping bahu (斜め前方) -> Panggil lembut sebelum menyentuh -> Jaga jarak aman >= 2 meter bila lewat belakang.'
          },
          safetyTip: 'Perhatikan telinga dan ekor sapi: Bila telinga ditarik ke belakang dan ekor mengibas keras, tandanya sapi sedang gelisah dan waspada.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-agriculture',
          unitId: 'unit-curriculum-ssw-agri-04',
          unitNumber: 4,
          unitTitleId: 'Peternakan (Chikusan), Kebersihan Ternak & Biosekuriti'
        }
      },
      {
        id: 'SSW-AG-S01-Q015',
        trackType: 'ssw',
        sswSectorId: 'ssw-agriculture',
        mondaiNumber: 15,
        mondaiType: 'ssw_k3_procedure',
        instructionJp: '体調不良時の応急対応として最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah tindakan prioritas utama bila merasa pusing, mual, atau gemetar saat bekerja di ladang.',
        prompt: '農作業中に 体調が悪くなり、めまいや 吐き気、手足の震えを 感じたときの 最優先の対応は どれですか。',
        targetWord: '作業を中止',
        options: [
          '直ちに作業を中止して涼しい日陰に移動し、農場長や仲間に知らせて水分・塩分を補給する',
          'みんなに心配をかけないように、倒れるまで黙って一人で作業を続ける',
          '我慢して走って自宅まで帰り、布団に入って暖かくして寝る',
          '熱いお茶を大量に飲んで、さらに汗をかいて治そうとする'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Pusing, mual, dan gemetar adalah gejala akut sengatan panas stadium II/III (熱中症) atau keracunan pestisida. Segera hentikan kerja, pindah ke tempat teduh berangin, lapor ke penanggung jawab kebun, longgarkan pakaian, minum cairan berelektrolit, dan kompres es pada pembuluh darah leher/ketiak/selangkangan.',
          distractorAutopsy: {
            '1': 'Opsi 1 BENAR MUTLAK: Segera hentikan kerja, pindah ke tempat teduh, lapor rekan/atasan, dan minum air garam.',
            '2': 'Memaksakan diri bekerja sampai pingsan menyebabkan kerusakan otak permanen dan kematian.',
            '3': 'Berlari pulang sendirian berisiko kolaps pingsan di parit sawah tanpa diketahui orang lain.',
            '4': 'Meminum teh panas mendidih menaikkan suhu inti tubuh dan memperparah syok hipertermia.'
          },
          mnemonicSensei: 'Pusing atau mual di ladang? STOP kerja seketika -> Lapor ke atasan -> Dinginkan ketiak dan leher dengan es/air dingin!',
          l1InterferenceAlert: 'Budaya "Gaman" (menahan sakit tanpa mengeluh) sangat salah diterapkan pada dehidrasi panas. Di pertanian Jepang, terlambat melapor gejala panas dianggap kelalaian keselamatan kerja fatal.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-agri-01',
            unitNumber: 1,
            unitTitleId: 'Budidaya Tanaman, Pengendalian Hama & Pestisida',
            advice: 'Pertolongan pertama sengatan panas: Pindahkan ke tempat teduh -> Longgarkan baju -> Kompres es di leher/ketiak -> Minum oralit/pocari -> Hubungi 119 bila tak sadar.'
          },
          safetyTip: 'Jika korban tidak mampu memegang botol minum sendiri atau bicaranya meracau, jangan paksakan menuang air ke mulutnya: segera telepon ambulans 119.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-agriculture',
          unitId: 'unit-curriculum-ssw-agri-01',
          unitNumber: 1,
          unitTitleId: 'Budidaya Tanaman, Pengendalian Hama & Pestisida'
        }
      }
    ]
  };
}

module.exports = { getSSWAgricultureSet };
