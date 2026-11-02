/**
 * SSW Construction - Civil Engineering (Kensetsu Doboku / 建設土木) Golden Set 01
 * Grounded in JAC (Japan Association for Construction Human Resources) & MLIT Official Textbooks
 * 15 Items: Excavation, Trench Shoring, Heavy Equipment Blind Spots, Yuudouin Signaling, 5S & K3
 */

function getSSWDobokuSet() {
  return {
    setId: 'ssw-kensetsu-doboku-set01',
    trackType: 'ssw',
    sswSectorId: 'ssw-kensetsu-doboku',
    title: 'Set Latihan SSW Kensetsu Doboku (Teknik Sipil) - 01',
    description: 'Simulasi modular 15 menit menguji istilah teknik sipil lapangan, keselamatan alat berat (backhoe), penahan tanah galian (dodome), pemadatan tanah, dan sinyal pemandu (yuudouin).',
    targetUnits: 'Kurikulum Vokasional Kensetsu Doboku: Penggalian, Keselamatan Beko, Pengendalian Longsor & K3 Lapangan',
    totalItems: 15,
    timeLimitMinutes: 15,
    passingScore: 10,
    items: [
      {
        id: 'SSW-DB-S01-Q01',
        trackType: 'ssw',
        sswSectorId: 'ssw-kensetsu-doboku',
        mondaiNumber: 1,
        mondaiType: 'ssw_k3_procedure',
        instructionJp: '重機の安全管理について、最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah aturan keselamatan alat berat excavator yang paling tepat.',
        prompt: '油圧ショベル（バックホウ）が 旋回（せんかい）する 作業範囲（はんい）について、正しいルールは どれですか。',
        targetWord: '旋回範囲',
        options: [
          '作業員はショベルの旋回範囲内に絶対に立ち入ってはならない',
          'ヘルメットをかぶっていれば、旋回範囲内で作業してもよい',
          'オペレーター（運転手）と目が合っていれば、近づいてよい',
          'ショベルの後ろ側は安全なので、旋回範囲内を通ってもよい'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Sesuai regulasi MLIT dan JAC, seluruh radius putar (旋回範囲 - senkai han\'i) ekskavator adalah zona terlarang (立入禁止区域). Operator memiliki blind spot besar (死角) terutama di bagian counterweight belakang, dan benturan swing adalah penyebab kecelakaan fatal nomor satu.',
          distractorAutopsy: {
            '1': 'Opsi 1 BENAR MUTLAK: Seluruh radius putaran adalah area steril dilarang masuk.',
            '2': 'Helm tidak mampu menahan benturan counterweight seberat belasan ton.',
            '3': 'Kontak mata sekilas tidak menjamin operator tidak memutar tuas saat konsentrasi terbagi.',
            '4': 'Bagian belakang counterweight justru merupakan titik buta paling berbahaya (死角).'
          },
          mnemonicSensei: 'Senkai = Sekai Terlarang! Radius putar beko adalah zona haram disentuh.',
          l1InterferenceAlert: 'Di proyek informal Indonesia, pekerja sering santai berdiri di samping beko atau numpang lewat di belakang pantat alat. Di Jepang, masuk radius swing tanpa izin/tanpa mesin mati adalah pelanggaran K3 berat.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kensetsu-01',
            unitNumber: 1,
            unitTitleId: 'Dasar Keselamatan Alat Berat & Penggalian Lapangan',
            lessonId: 'les-ssw-db-01',
            vocabId: 'vg-ssw-db-001',
            advice: 'Kuasai kosakata: 旋回範囲 (radius putar), 立入禁止 (dilarang masuk), 死角 (titik buta).'
          },
          safetyTip: 'Jika harus mendekati beko, hubungi pemandu (yuudouin) atau beri tanda sampai bucket diletakkan di tanah dan mesin dimatikan.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kensetsu-doboku',
          unitId: 'unit-curriculum-ssw-kensetsu-01',
          unitNumber: 1,
          unitTitleId: 'Dasar Keselamatan Alat Berat & Penggalian Lapangan'
        }
      },
      {
        id: 'SSW-DB-S01-Q02',
        trackType: 'ssw',
        sswSectorId: 'ssw-kensetsu-doboku',
        mondaiNumber: 2,
        mondaiType: 'ssw_technical_terminology',
        instructionJp: '掘削工事の安全設備として最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah struktur penahan galian tanah yang paling tepat.',
        prompt: '深さ2メートル以上の 溝（みぞ）を手作業で 掘削（くっさく）するとき、土砂崩壊（どしゃほうかい）を 防ぐために 必ず設置するものは 何ですか。',
        targetWord: '土止め支保工',
        options: [
          '土止め支保工（どどめしほこう）',
          '保安柵（ほあんさく）',
          'カラーコーン',
          'トラロープ'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Berdasarkan UU K3 Jepang (Roudou Anzen Eisei-hou), galian parit sedalam 2 meter atau lebih wajib dipasangi struktur penahan tanah (土止め支保工 - dodome shihokou) menggunakan turap (yaita), balok pengikat (haraokoshi), dan struts penyangga (kiribari) untuk mencegah pekerja tertimbun longsoran.',
          distractorAutopsy: {
            '1': '土止め支保工（どどめしほこう） adalah KUNCI BENAR (penahan dinding galian tanah).',
            '2': '保安柵 (pagar pembatas) hanya menjaga orang di atas tidak terperosok, bukan menahan tanah galian.',
            '3': 'カラーコーン (traffic cone) hanya penanda visual lalu lintas.',
            '4': 'トラロープ (tali belang kuning-hitam) tidak memiliki kekuatan mekanis menahan tanah.'
          },
          mnemonicSensei: 'Dodome = Do (Tanah) + Tome (Tahan)! Penahan tanah agar pekerja galian tidak tertimbun hidup-hidup.',
          l1InterferenceAlert: 'Di Indonesia, galian tanah 2-3 meter sering dibiarkan vertikal tanpa dinding penahan. Di Jepang, galian dalam tanpa dodome adalah pelanggaran pidana.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kensetsu-01',
            unitNumber: 1,
            unitTitleId: 'Dasar Keselamatan Alat Berat & Penggalian Lapangan',
            lessonId: 'les-ssw-db-02',
            vocabId: 'vg-ssw-db-002',
            advice: 'Pelajari komponen: 土止め支保工 (dodome shihokou), 矢板 (yaita), 腹起し (haraokoshi), 切保工 (kiribari).'
          },
          safetyTip: 'Setelah hujan lebat, selalu periksa apakah ada pergeseran tanah pada dodome sebelum turun ke dalam parit galian.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kensetsu-doboku',
          unitId: 'unit-curriculum-ssw-kensetsu-01',
          unitNumber: 1,
          unitTitleId: 'Dasar Keselamatan Alat Berat & Penggalian Lapangan'
        }
      },
      {
        id: 'SSW-DB-S01-Q03',
        trackType: 'ssw',
        sswSectorId: 'ssw-kensetsu-doboku',
        mondaiNumber: 3,
        mondaiType: 'ssw_hou_ren_so_sbar',
        instructionJp: '現場での指示会話として、（　　）に入る最も適切な言葉を一つ選びなさい。',
        instructionId: 'Pilihlah istilah utilitas tertanam bawah tanah yang paling tepat.',
        prompt: '現場監督「おい、これより 地下の掘削に入る。まず 図面を見て（　　）の位置を 確認しろ！」',
        targetWord: '埋設物',
        options: [
          '埋設物（まいせつぶつ）',
          '私有物（しゆうぶつ）',
          '残留物（ざんりゅうぶつ）',
          '漂流物（ひょうりゅうぶつ）'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Sebelum menggali tanah, wajib memeriksa keberadaan utilitas bawah tanah (埋設物 - maisetsubutsu) seperti pipa gas, kabel PLN tegangan tinggi, pipa air bersih/limbah, dan kabel fiber optik untuk mencegah kebakaran gas atau pemadaman massal.',
          distractorAutopsy: {
            '1': '埋設物（まいせつぶつ） adalah KUNCI BENAR (benda/pipa tertanam bawah tanah).',
            '2': '私有物 (barang milik pribadi) tidak berkaitan dengan utilitas tanah.',
            '3': '残留物 (residu/sisa zat kimia) bukan istilah utilitas infrastruktur.',
            '4': '漂流物 (benda terapung di air) sama sekali tidak relevan.'
          },
          mnemonicSensei: 'Mai (Tertimbun) + Setsu (Dipasang) + Butsu (Benda) = Pipa & kabel utilitas yang dipasang tertanam di bawah tanah!',
          l1InterferenceAlert: 'Jangan menganggap tanah kosong itu bersih. Selalu ada kabel atau pipa bertekanan tinggi tertanam. Wajib konfirmasi dengan uji galian manual perlahan (試験掘り - shikenbori).',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kensetsu-01',
            unitNumber: 1,
            unitTitleId: 'Dasar Keselamatan Alat Berat & Penggalian Lapangan',
            advice: 'Pahami prosedur: Konfirmasi gambar utilitas -> Tandai dengan pita -> Uji gali hati-hati dengan sekop tangan.'
          },
          safetyTip: 'Jika cangkul mengenai pipa atau kabel dengan tanda peringatan, hentikan galian seketika dan lapor pengawas.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kensetsu-doboku',
          unitId: 'unit-curriculum-ssw-kensetsu-01',
          unitNumber: 1,
          unitTitleId: 'Dasar Keselamatan Alat Berat & Penggalian Lapangan'
        }
      },
      {
        id: 'SSW-DB-S01-Q04',
        trackType: 'ssw',
        sswSectorId: 'ssw-kensetsu-doboku',
        mondaiNumber: 4,
        mondaiType: 'ssw_k3_procedure',
        instructionJp: 'トラックの誘導手順として最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah posisi dan metode pemanduan truk mundur yang paling aman.',
        prompt: '現場で 誘導員（ゆうどういん）が ダンプトラックを バックさせるとき、正しい 誘導の方法は どれですか。',
        targetWord: '誘導員',
        options: [
          '運転手のバックミラーから見える安全な位置に立ち、明確な合図を出す',
          'トラックの真後ろに立ち、車体に手で触れながらバックさせる',
          '運転手に任せて、自分は周りの通行人のみを注意して見ておく',
          'トラックの荷台に乗って、上から運転手に指示を出す'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Pemandu (誘導員 - yuudouin) harus berdiri di zona pandang aman di mana wajahnya terlihat di kaca spion sopir, tidak boleh berada tepat di belakang truk, serta memberikan isyarat peluit dan tangan yang tegas.',
          distractorAutopsy: {
            '1': 'Opsi 1 BENAR: Berdiri terlihat di spion samping sopir dan memberi sinyal tegas.',
            '2': 'Berdiri tepat di belakang truk mundur adalah area terjepit paling mematikan (挟まれ・巻き込まれ).',
            '3': 'Pemandu wajib menjaga sinkronisasi dua arah dengan sopir truk dan mengamati lingkungan sekeliling.',
            '4': 'Naik di bak truk saat manuver dilarang keras.'
          },
          mnemonicSensei: 'Prinsip Spion: Jika kamu tak bisa lihat wajah sopir di spion, sopir pasti tak bisa lihat badanmu!',
          l1InterferenceAlert: 'Di Indonesia juru parkir sering menepuk pantat truk mundur dari jarak dekat. Di konstruksi Jepang, berdiri tepat di belakang truk mundur adalah pelanggaran keselamatan fatal.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kensetsu-02',
            unitNumber: 2,
            unitTitleId: 'Pengaturan Lalu Lintas & Pemanduan Kendaraan Proyek',
            advice: 'Hafalkan kode peluit: Peluit panjang = Stop (止まれ), Peluit pendek berulang = Mundur pelan (オーライ).'
          },
          safetyTip: 'Jangan pernah berjalan mundur sambil memandu. Selalu perhatikan pijakan kaki di belakang Anda.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kensetsu-doboku',
          unitId: 'unit-curriculum-ssw-kensetsu-02',
          unitNumber: 2,
          unitTitleId: 'Pengaturan Lalu Lintas & Pemanduan Kendaraan Proyek'
        }
      },
      {
        id: 'SSW-DB-S01-Q05',
        trackType: 'ssw',
        sswSectorId: 'ssw-kensetsu-doboku',
        mondaiNumber: 5,
        mondaiType: 'ssw_technical_terminology',
        instructionJp: 'コンクリート打設器具として最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah alat pemadat getar cor beton yang paling tepat.',
        prompt: 'コンクリートを 型枠（かたわく）に 流し込むとき、内部の空気を抜いて 密実（みつじつ）にするために 使う機械は 何ですか。',
        targetWord: 'バイブレーター',
        options: [
          'バイブレーター（棒状振動機）',
          'ランマー（転圧機）',
          'プレートコンパクター',
          'グラインダー（研削機）'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Poker vibrator (棒状振動機 / バイブレーター) dimasukkan tegak lurus ke dalam adukan cor beton basah untuk mengeluarkan gelembung udara dan memadatkan campuran agar tidak keropos (honeycombing / ジャンカ).',
          distractorAutopsy: {
            '1': 'バイブレーター adalah KUNCI BENAR (vibrator pemadat beton basah).',
            '2': 'ランマー (rammer) adalah mesin pemadat tanah uruk galian.',
            '3': 'プレートコンパクター (plate compactor) adalah mesin pemadat permukaan aspal/sirtu.',
            '4': 'グラインダー (grinder) adalah mesin gerinda pemotong/penghalus logam.'
          },
          mnemonicSensei: 'Vibrator = Getaran pengusir gelembung cor! Masukkan tegak lurus, jangan sentuh besi terlalu lama.',
          l1InterferenceAlert: 'Jangan tertukar alat pemadat tanah (Rammer) dengan alat pemadat beton basah (Vibrator). Ranmaa untuk tanah urukan, Baibureetaa untuk semen cor.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kensetsu-03',
            unitNumber: 3,
            unitTitleId: 'Pengecoran Beton & Pengujian Lapangan',
            advice: 'Aturan getar: Masukkan tegak, tahan 5-15 detik hingga semen berkilat, cabut perlahan.'
          },
          safetyTip: 'Hindari menyentuhkan ujung vibrator langsung ke besi tulangan dalam waktu lama karena bisa merusak ikatan beton sebelumnya.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kensetsu-doboku',
          unitId: 'unit-curriculum-ssw-kensetsu-03',
          unitNumber: 3,
          unitTitleId: 'Pengecoran Beton & Pengujian Lapangan'
        }
      },
      {
        id: 'SSW-DB-S01-Q06',
        trackType: 'ssw',
        sswSectorId: 'ssw-kensetsu-doboku',
        mondaiNumber: 6,
        mondaiType: 'ssw_k3_procedure',
        instructionJp: '安全活動の用語として最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah istilah aktivitas prediksi bahaya sebelum mulai kerja.',
        prompt: '朝の作業開始前に 行う、危険を予測して 安全対策を決める ミーティングを 何と呼びますか。',
        targetWord: 'KYK',
        options: [
          'KYK（危険予知活動）',
          'JIT（ジャストインタイム）',
          'QC（品質管理サークル）',
          'OJT（職場内訓練）'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'KYK adalah singkatan dari Kiken Yochi Katsudou (危険予知活動). Tim berkumpul sebelum jam kerja untuk membedah potensi bahaya spesifik hari itu, merumuskan tindakan pencegahan, dan menyepakati slogan 指差し呼称 (yubisashi koshou).',
          distractorAutopsy: {
            '1': 'KYK（危険予知活動） adalah KUNCI BENAR (Hazard Prediction Activity).',
            '2': 'JIT (Just In Time) adalah metode manajemen stok logistik pabrik.',
            '3': 'QC (Quality Control) fokus pada cacat kualitas barang pabrik.',
            '4': 'OJT (On-the-Job Training) adalah pelatihan keterampilan magang saat praktek.'
          },
          mnemonicSensei: 'K = Kiken (Bahaya), Y = Yochi (Prediksi), K = Katsudou (Aktivitas). Sadari bahaya sebelum celaka!',
          l1InterferenceAlert: 'Bukan sekadar briefing biasa. Setiap pekerja wajib menyebutkan 1 risiko dari tugasnya dan sepakat pada 1 target tindakan bersama.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kensetsu-01',
            unitNumber: 1,
            unitTitleId: 'Dasar Keselamatan Alat Berat & Penggalian Lapangan',
            advice: '4 Tahap KYK: 1R Bahaya apa? -> 2R Mana paling parah? -> 3R Bagaimana solusinya? -> 4R Target tindakan kita: 〇〇ヨシ！'
          },
          safetyTip: 'Di akhir KYK selalu lakukan sentuhan bahu (タッチ＆コール) dan teriakan "〇〇ヨシ！" untuk menyatukan konsentrasi tim.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kensetsu-doboku',
          unitId: 'unit-curriculum-ssw-kensetsu-01',
          unitNumber: 1,
          unitTitleId: 'Dasar Keselamatan Alat Berat & Penggalian Lapangan'
        }
      },
      {
        id: 'SSW-DB-S01-Q07',
        trackType: 'ssw',
        sswSectorId: 'ssw-kensetsu-doboku',
        mondaiNumber: 7,
        mondaiType: 'ssw_technical_terminology',
        instructionJp: '土木工事の構造用語として最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah istilah lereng miring buatan pada pekerjaan tanah.',
        prompt: '土木工事で、切土（きりど）や 盛土（もりど）によって 作られた 人工的な 斜面（しゃめん）のことを 何と呼びますか。',
        targetWord: '法面',
        options: [
          '法面（のりめん）',
          '天端（てんば）',
          '擁壁（ようへき）',
          '路床（ろしょう）'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Lereng miring buatan dari hasil galian (切土) atau timbunan (盛土) disebut "Norimen" (法面). Pengelolaan stabilitas lereng, pemasangan jaring penahan, dan drainase air adalah inti pekerjaan sipil.',
          distractorAutopsy: {
            '1': '法面（のりめん） adalah KUNCI BENAR (lereng miring tanah galian/timbunan).',
            '2': '天端 (tenba) adalah permukaan paling atas (puncak datar) dari dinding atau tanggul.',
            '3': '擁壁 (youheki) adalah dinding kaku penahan tanah dari beton/batu kali.',
            '4': '路床 (roshou) adalah lapisan dasar tanah di bawah perkerasan jalan raya.'
          },
          mnemonicSensei: 'Nori = Seperti meluncur di lereng bukit! Lereng tanah buatan = Norimen (法面).',
          l1InterferenceAlert: 'Jangan tertukar antara Norimen (lereng tanah miring terbuka) dengan Youheki (dinding tegak beton penahan tanah).',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kensetsu-04',
            unitNumber: 4,
            unitTitleId: 'Pekerjaan Tanah, Lereng & Saluran Drainase',
            advice: 'Pahami turunan kata: 法面保護 (norimen hogo = proteksi lereng), 法尻 (norijiri = kaki lereng), 法肩 (norikata = bahu lereng).'
          },
          safetyTip: 'Saat membersihkan rumput atau memasang jaring di norimen miring, selalu pasang tali pengaman (shin-tsuna).'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kensetsu-doboku',
          unitId: 'unit-curriculum-ssw-kensetsu-04',
          unitNumber: 4,
          unitTitleId: 'Pekerjaan Tanah, Lereng & Saluran Drainase'
        }
      },
      {
        id: 'SSW-DB-S01-Q08',
        trackType: 'ssw',
        sswSectorId: 'ssw-kensetsu-doboku',
        mondaiNumber: 8,
        mondaiType: 'ssw_k3_procedure',
        instructionJp: '悪天候時の作業ルールとして最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah standar penghentian kerja saat angin kencang di lapangan.',
        prompt: '工事現場において、強風（きょうふう）や 悪天候時の 作業中止基準として 正しいものは どれですか。',
        targetWord: '強風',
        options: [
          '10分間の平均風速が毎秒10メートル以上になったら、高所作業を中止する',
          '小雨が降ってきたら、どんな作業も直ちに全て中止しなければならない',
          '風が強くても、命綱（フルハーネス）があれば作業を続けてよい',
          '作業中止の判断は、各作業員が自分の気分で決める'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Berdasarkan Peraturan K3 Jepang (An\'ei-soku Pasal 522), bila kecepatan angin rata-rata selama 10 menit mencapai 10 meter/detik atau lebih, pekerjaan di ketinggian dan pengangkatan crane wajib dihentikan seketika.',
          distractorAutopsy: {
            '1': 'Opsi 1 BENAR MUTLAK: Kecepatan angin rata-rata $\\ge 10\\text{ m/s}$ wajib stop kerja ketinggian.',
            '2': 'Gerimis kecil (小雨) tidak otomatis membatalkan seluruh pekerjaan sipil.',
            '3': 'Full harness melindungi dari jatuh, tapi hempasan angin $\\ge 10\\text{ m/s}$ memicu benturan material dan kehilangan keseimbangan.',
            '4': 'Keputusan penghentian kerja adalah wewenang penanggung jawab lapangan resmi, bukan selera pribadi.'
          },
          mnemonicSensei: 'Angka keramat angin: 10 m/s = STOP! Angin di atas 10 meter per detik = dilarang naik scaffolding.',
          l1InterferenceAlert: 'Di Indonesia, pekerja sering terus memanjat perancah meski angin kencang. Di Jepang ada anemometer digital di lapangan; menyentuh 10 m/s langsung terdengar instruksi berhenti.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kensetsu-01',
            unitNumber: 1,
            unitTitleId: 'Dasar Keselamatan Alat Berat & Penggalian Lapangan',
            advice: 'Standar bahaya alam: Angin 10 m/s (stop ketinggian), Gempa Shindo 4+ (inspeksi dinding galian sebelum masuk kembali).'
          },
          safetyTip: 'Saat angin kencang mendadak, amankan lembaran seng dan triplek agar tidak terbang membahayakan jalan raya.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kensetsu-doboku',
          unitId: 'unit-curriculum-ssw-kensetsu-01',
          unitNumber: 1,
          unitTitleId: 'Dasar Keselamatan Alat Berat & Penggalian Lapangan'
        }
      },
      {
        id: 'SSW-DB-S01-Q09',
        trackType: 'ssw',
        sswSectorId: 'ssw-kensetsu-doboku',
        mondaiNumber: 9,
        mondaiType: 'ssw_hou_ren_so_sbar',
        instructionJp: '現場での安全点検会話として、（　　）に入る最も適切な言葉を一つ選びなさい。',
        instructionId: 'Pilihlah tanda bahaya longsor tebing setelah hujan deras.',
        prompt: '先輩「大雨の後は、法面が 緩（ゆる）んでいるかもしれないから、（　　）がないか よく点検しろよ！」',
        targetWord: 'はらみ',
        options: [
          'はらみやクラック（ひび割れ）',
          'ペンキの剥（は）がれ',
          '草の生え具合',
          'ゴミの散乱'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Inspeksi lereng tanah pasca hujan wajib memeriksa penggelembungan tanah (はらみ - harami) dan retakan tarikan (クラック / ひび割れ - hibiware). Dua gejala ini merupakan tanda awal keruntuhan tebing (法面崩壊).',
          distractorAutopsy: {
            '1': 'はらみやクラック（ひび割れ） adalah KUNCI BENAR (gembung dan retakan tanda longsor).',
            '2': 'Cat mengelupas hanya masalah tampilan wadah/container.',
            '3': 'Kondisi tumbuhnya rumput tidak menunjukkan bahaya longsor mendesak.',
            '4': 'Sampah tercecer adalah urusan 5S, bukan kestabilan lereng geoteknik.'
          },
          mnemonicSensei: 'Harami (Perut gembung berisi air jenuh) + Kurakku (Retakan tanah) = Tanda tebing mau longsor!',
          l1InterferenceAlert: 'Jangan sepelekan retakan kecil 1 cm di atas tebing galian setelah hujan. Air yang merembes ke celah itu bisa melongsorkan puluhan ton tanah dalam hitungan detik.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kensetsu-04',
            unitNumber: 4,
            unitTitleId: 'Pekerjaan Tanah, Lereng & Saluran Drainase',
            advice: '3 Tanda bahaya tebing: はらみ (gembung), 亀裂・クラック (retak), 湧水 (rembesan air mendadak keruh).'
          },
          safetyTip: 'Jika menemukan rembesan air mendadak keruh dari tebing tanah, segera evakuasi tim menjauh dari bawah lereng.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kensetsu-doboku',
          unitId: 'unit-curriculum-ssw-kensetsu-04',
          unitNumber: 4,
          unitTitleId: 'Pekerjaan Tanah, Lereng & Saluran Drainase'
        }
      },
      {
        id: 'SSW-DB-S01-Q010',
        trackType: 'ssw',
        sswSectorId: 'ssw-kensetsu-doboku',
        mondaiNumber: 10,
        mondaiType: 'ssw_technical_terminology',
        instructionJp: '夜間工事の安全設備として最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah lampu peringatan malam hari pada proyek jalan raya.',
        prompt: '道路工事の 現場で、夜間に 一般車両や 歩行者から 作業箇所を 見えやすくするために 設置するものは 何ですか。',
        targetWord: 'チューブライト',
        options: [
          'チューブライトや回転灯（こうてんとう）',
          '防音シート（ぼうおんシート）',
          '養生マット（ようじょうマット）',
          '目隠しフェンス（めかくしフェンス）'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Pekerjaan jalan malam hari wajib dilengkapi perangkat penerangan dan visual tinggi seperti selang lampu LED (チューブライト), lampu sirine putar (回転灯), dan rambu panah berkedip (矢印板) untuk mencegah tabrakan kendaraan umum.',
          distractorAutopsy: {
            '1': 'チューブライトや回転灯 adalah KUNCI BENAR (lampu selang LED & lampu peringatan berputar).',
            '2': '防音シート (terpal peredam bising) untuk meredam suara, bukan pemandu visual malam hari.',
            '3': '養生マット (matras pelindung lantai) melindungi semen basah dari goresan.',
            '4': '目隠しフェンス (pagar penutup pandangan) justru menghalangi pandangan jika tidak dipasangi lampu.'
          },
          mnemonicSensei: 'Malam hari di jalan: Wajib lampu selang (チューブライト) dan lampu putar (回転灯) agar tidak diseruduk mobil!',
          l1InterferenceAlert: 'Memakai rompi reflektif saja tidak cukup. Barikade fisik wajib memiliki penerangan mandiri yang menyala terang dari jarak 100 meter.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kensetsu-02',
            unitNumber: 2,
            unitTitleId: 'Pengaturan Lalu Lintas & Pemanduan Kendaraan Proyek',
            advice: 'Katalog rambu malam: チューブライト (tube light), 工事用回転灯 (beacon), 矢印板 (panah led berkedip).'
          },
          safetyTip: 'Pastikan aki genset untuk lampu malam dicek level bensinnya sebelum jam sif malam dimulai.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kensetsu-doboku',
          unitId: 'unit-curriculum-ssw-kensetsu-02',
          unitNumber: 2,
          unitTitleId: 'Pengaturan Lalu Lintas & Pemanduan Kendaraan Proyek'
        }
      },
      {
        id: 'SSW-DB-S01-Q011',
        trackType: 'ssw',
        sswSectorId: 'ssw-kensetsu-doboku',
        mondaiNumber: 11,
        mondaiType: 'ssw_k3_procedure',
        instructionJp: 'クレーン玉掛け作業のルールとして最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah prosedur pengangkatan barang crane saat mencapai ketinggian jigiri.',
        prompt: 'クレーン作業で 荷物を 吊り上げるとき、ワイヤーロープが ピンと張った 地切り（じぎり）の 高さで行うべき 正しい動作は どれですか。',
        targetWord: '地切り',
        options: [
          '地上10〜20cmで一旦停止し、玉掛けの緩みや荷の傾きを確認する',
          '勢いをつけて一気に目的の高さまで巻き上げる',
          '荷物が揺れている場合、手で直接強く押さえて止める',
          '地切りしたら、すぐに真下に入って底面を支える'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Jigiri (地切り) adalah momen krusial pengangkatan awal 10-20 cm dari tanah. Operator crane WAJIB berhenti sejenak agar rigger memeriksa kekencangan sling kawat, titik berat beban, dan kemiringan sebelum naik penuh.',
          distractorAutopsy: {
            '1': 'Opsi 1 BENAR: Berhenti sejenak di 10-20 cm dan cek keseimbangan serta ikatan sling.',
            '2': 'Mengangkat langsung dengan kecepatan tinggi memicu sling putus atau muatan terpelanting.',
            '3': 'Jangan memegang beban ayun langsung dengan tangan telanjang; gunakan tali pemandu (介錯ロープ).',
            '4': 'Berdiri di bawah muatan gantung (吊り荷の下) adalah pelanggaran pidana K3.'
          },
          mnemonicSensei: 'Jigiri = Terangkat dari tanah! Berhenti di 20 cm, teriak "Jigiri Yoshi!", baru kerek ke atas.',
          l1InterferenceAlert: 'Kebiasaan menahan barang gantung crane langsung dengan tangan kosong sangat berbahaya. Jika terayun, tangan bisa putus terjepit. Wajib gunakan tali kendali (介錯ロープ).',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kensetsu-02',
            unitNumber: 2,
            unitTitleId: 'Pengaturan Lalu Lintas & Pemanduan Kendaraan Proyek',
            advice: '3 Langkah angkat beban: 1. Angkat 10-20 cm (地切り) -> 2. Cek sling & keseimbangan -> 3. Pandu dengan tali 介錯ロープ.'
          },
          safetyTip: 'Dilarang keras berdiri atau melintas di bawah barang yang sedang diangkat crane dalam kondisi apapun.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kensetsu-doboku',
          unitId: 'unit-curriculum-ssw-kensetsu-02',
          unitNumber: 2,
          unitTitleId: 'Pengaturan Lalu Lintas & Pemanduan Kendaraan Proyek'
        }
      },
      {
        id: 'SSW-DB-S01-Q012',
        trackType: 'ssw',
        sswSectorId: 'ssw-kensetsu-doboku',
        mondaiNumber: 12,
        mondaiType: 'ssw_technical_terminology',
        instructionJp: '埋戻し転圧の品質管理として最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah akibat dari pemadatan tanah urukan yang tidak memadai.',
        prompt: '土木工事で 土を 埋め戻した後、締め固め（転圧 - てんあつ）が 不十分だと 将来どのような 問題が 起きますか。',
        targetWord: '転圧',
        options: [
          '地盤が沈下（ちんか）して道路に穴やくぼみができる',
          '土の水分が完全に抜けて砂漠化する',
          '地中の温度が急激に上昇して発火する',
          '土がコンクリートのように硬くなりすぎて掘れなくなる'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Pemadatan tanah urukan yang tidak memadai (転圧不足) menyisakan rongga udara dan air. Seiring berjalannya waktu dan getaran kendaraan di atasnya, tanah akan amblas (地盤沈下 - jiban chinka) dan menciptakan lubang jalan (sinkhole / 陥没).',
          distractorAutopsy: {
            '1': '地盤が沈下して道路に穴ができる adalah KUNCI BENAR (tanah amblas & jalan berlubang).',
            '2': 'Tanah galian biasa tidak otomatis mengering menjadi padang pasir.',
            '3': 'Tanah urukan normal tidak menimbulkan fenomena terbakar sendiri di bawah tanah.',
            '4': 'Kurang pemadatan membuat tanah rapuh/gembur, bukan membatu keras.'
          },
          mnemonicSensei: 'Ten\'atsu (Pemadatan) kurang = Chinka (Amblas)! Jalan aspal bisa jebol berlubang.',
          l1InterferenceAlert: 'Menguruk tanah bukan cuma menutup lubang dengan cangkul. Harus dipadatkan lapis demi lapis (maks 30 cm per lapis) dengan alat pemadat (rammer/roller).',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kensetsu-04',
            unitNumber: 4,
            unitTitleId: 'Pekerjaan Tanah, Lereng & Saluran Drainase',
            advice: 'Kuasai istilah: 転圧 (ten\'atsu = pemadatan), 地盤沈下 (jiban chinka = tanah amblas), 陥没 (kanbotsu = lubang sinkhole).'
          },
          safetyTip: 'Saat mengoperasikan tamping rammer, jaga keseimbangan badan agar kaki tidak tergilas pelat pemadat.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kensetsu-doboku',
          unitId: 'unit-curriculum-ssw-kensetsu-04',
          unitNumber: 4,
          unitTitleId: 'Pekerjaan Tanah, Lereng & Saluran Drainase'
        }
      },
      {
        id: 'SSW-DB-S01-Q013',
        trackType: 'ssw',
        sswSectorId: 'ssw-kensetsu-doboku',
        mondaiNumber: 13,
        mondaiType: 'ssw_hou_ren_so_sbar',
        instructionJp: '測定器具の使い方として、（　　）に入る最も適切な言葉を一つ選びなさい。',
        instructionId: 'Pilihlah posisi gelembung pada waterpass saat kondisi sudah datar sempurna.',
        prompt: '先輩「よし、このパイプの位置、水平器（すいへいき）で 測ってくれ。」後輩「はい、気泡（きほう）が（　　）にあるので、水平になっています！」',
        targetWord: '水平器',
        options: [
          '2本の基準線のちょうど真ん中',
          '一番右の端（はし）',
          '一番左の端（はし）',
          '完全に見えなくなっているところ'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Waterpass (水平器 - suiheiki) menunjukkan bidang datar sempurna ketika gelembung udara di dalam tabung cairan berada tepat di tengah-tengah antara dua garis pembatas acuan (2本の線の真ん中).',
          distractorAutopsy: {
            '1': '2本の基準線のちょうど真ん中 adalah KUNCI BENAR (tepat di tengah 2 garis acuan).',
            '2': 'Bila gelembung di ujung kanan, berarti sisi kanan lebih tinggi (miring).',
            '3': 'Bila gelembung di ujung kiri, berarti sisi kiri lebih tinggi (miring).',
            '4': 'Jika gelembung hilang, waterpass rusak atau posisi kemiringan terlalu ekstrem.'
          },
          mnemonicSensei: 'Kihou (Gelembung) pas di tengah garis = Suiheiki Yoshi (Datar sempurna!).',
          l1InterferenceAlert: 'Waterpass di Jepang disebut 水平器 (suiheiki). Gelembung udara harus pas di tengah garis pembatas, bukan cuma "kira-kira rata".',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kensetsu-04',
            unitNumber: 4,
            unitTitleId: 'Pekerjaan Tanah, Lereng & Saluran Drainase',
            advice: 'Alat ukur dasar: 水平器 (suiheiki = waterpass), スケール (meteran), 下げ振り (sagefuri = bandul lot).'
          },
          safetyTip: 'Jangan menjatuhkan atau melempar waterpass karena tabung kaca akriliknya bisa bergeser dan kehilangan presisi kalibrasi.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kensetsu-doboku',
          unitId: 'unit-curriculum-ssw-kensetsu-04',
          unitNumber: 4,
          unitTitleId: 'Pekerjaan Tanah, Lereng & Saluran Drainase'
        }
      },
      {
        id: 'SSW-DB-S01-Q014',
        trackType: 'ssw',
        sswSectorId: 'ssw-kensetsu-doboku',
        mondaiNumber: 14,
        mondaiType: 'ssw_k3_procedure',
        instructionJp: '密閉空間の災害防止として最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah bahaya utama saat bekerja di dalam lubang manhole atau pit bawah tanah.',
        prompt: 'マンホール内や 深い地下ピット内に 入って作業するとき、最も警戒しなければならない 災害は 何ですか。',
        targetWord: '酸素欠乏症',
        options: [
          '酸素欠乏症（さんそけつぼうしょう）や硫化水素中毒（りゅうかすいそちゅうどく）',
          '直射日光による日焼け',
          '強風によるあおられ転倒',
          '高所からの落下物による直撃'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Manhole dan pit bawah tanah adalah ruang terbatas (confined spaces) di mana pembusukan organik menguras oksigen ($<18\\%$) dan menghasilkan gas hidrogen sulfida ($H_2S$) beracun. Masuk tanpa blower ventilasi dan sensor detektor gas berakibat pingsan seketika dan kematian (酸欠症).',
          distractorAutopsy: {
            '1': '酸素欠乏症や硫化水素中毒 adalah KUNCI BENAR (mati lemas kekurangan oksigen & racun H2S).',
            '2': 'Pit bawah tanah gelap total, tidak ada sengatan terik matahari.',
            '3': 'Ruang tertutup di bawah tanah terlindung dari terpaan angin luar.',
            '4': 'Meski tertimpa barang bisa terjadi, keracunan gas adalah pembunuh tercepat tanpa aba-aba.'
          },
          mnemonicSensei: 'Sanketsu = Kekurangan Oksigen ($<18\\%$)! Gas racun tak berwarna dan bisa tak berbau. Wajib cek gas detector dan hidupkan blower tiup.',
          l1InterferenceAlert: 'Banyak pekerja mengira jika ruangan tidak berbau maka aman. Oksigen tipis tidak memiliki bau apapun; sekali hirup langsung hilang kesadaran.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kensetsu-01',
            unitNumber: 1,
            unitTitleId: 'Dasar Keselamatan Alat Berat & Penggalian Lapangan',
            advice: 'Aturan 酸欠 (Sanketsu): Ukur kadar O2 (>= 18%) & H2S (<= 10 ppm) -> Pasang blower tiup -> Siapkan tripod harness penyelamat.'
          },
          safetyTip: 'Jika rekan di dalam pit pingsan, JANGAN PERNAH melompat masuk tanpa masker oksigen mandiri. Segera hidupkan blower dan minta bantuan 119.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kensetsu-doboku',
          unitId: 'unit-curriculum-ssw-kensetsu-01',
          unitNumber: 1,
          unitTitleId: 'Dasar Keselamatan Alat Berat & Penggalian Lapangan'
        }
      },
      {
        id: 'SSW-DB-S01-Q015',
        trackType: 'ssw',
        sswSectorId: 'ssw-kensetsu-doboku',
        mondaiNumber: 15,
        mondaiType: 'ssw_technical_terminology',
        instructionJp: '環境改善活動の名称として最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah nama aktivitas perapian dan pembersihan area kerja 5S.',
        prompt: '作業終了後に 行う「整理・整頓・清掃・清潔・躾（しつけ）」の 職場環境改善活動を 総称して 何と言いますか。',
        targetWord: '5S活動',
        options: [
          '5S活動（ごえすかつどう）',
          '4S活動（よんえすかつどう）',
          '3K活動（さんけいかつどう）',
          'PDCAサイクル'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Metodologi 5S mencakup 整理 (Seiri - Ringkas/Pilah), 整頓 (Seiton - Rapi/Tata), 清掃 (Seisou - Resik/Bersih), 清潔 (Seiketsu - Rawat/Standar), dan 躾 (Shitsuke - Rajin/Disiplin). 5S adalah fondasi keselamatan konstruksi Jepang menuju nihil kecelakaan (ゼロ災).',
          distractorAutopsy: {
            '1': '5S活動（ごえすかつどう） adalah KUNCI BENAR (Seiri, Seiton, Seisou, Seiketsu, Shitsuke).',
            '2': '4S tidak memasukkan pilar Shitsuke (Disiplin/pembiasaan diri).',
            '3': '3K (Kitsui, Kitanai, Kiken) adalah stereotip kerja berat/kotor/bahaya, bukan metode keselamatan.',
            '4': 'PDCA (Plan-Do-Check-Act) adalah siklus manajemen umum organisasi.'
          },
          mnemonicSensei: '5S: Pilah (Seiri), Tata (Seiton), Bersih (Seisou), Rawat (Seiketsu), Rajin (Shitsuke). Lapangan rapi = Nol kecelakaan!',
          l1InterferenceAlert: 'Di proyek konstruksi Jepang, perkakas berserakan bukan cuma dianggap jorok, tapi merupakan pemicu utama tersandung (つまずき) dan celaka patah tulang.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kensetsu-01',
            unitNumber: 1,
            unitTitleId: 'Dasar Keselamatan Alat Berat & Penggalian Lapangan',
            advice: 'Hafalkan arti: 整理 = buang yang tak perlu; 整頓 = taruh barang pada posisinya agar 10 detik langsung ketemu.'
          },
          safetyTip: 'Sebelum pulang kerja, pastikan semua perkakas masuk ke kotak alat dan kabel listrik digulung rapi.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kensetsu-doboku',
          unitId: 'unit-curriculum-ssw-kensetsu-01',
          unitNumber: 1,
          unitTitleId: 'Dasar Keselamatan Alat Berat & Penggalian Lapangan'
        }
      }
    ]
  };
}

module.exports = { getSSWDobokuSet };
