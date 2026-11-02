// SSW Construction (Civil Engineering / 土木 - Doboku) Set 01
// Curriculum Reference: JAC (Japan Association for Construction Human Resources) & MLIT Official Textbooks

const sswDobokuSet01 = {
  id: "ssw-kensetsu-doboku-set01",
  title: "SSW Tokutei Ginou: Kensetsu Doboku (Civil Engineering) Set 01",
  track: "ssw-kensetsu-doboku",
  level: "A2-B1",
  tier: "standard",
  durationMinutes: 15,
  passingScorePercent: 70,
  recommendedRetakeIntervalDays: 7,
  focusAreas: [
    "Kussaku (Excavation) & Trench Shoring Safety",
    "Heavy Machinery & Hydraulic Excavator Blind Spot Protocols",
    "Yuudouin (Signaling) & Pointing-and-Calling (Yubisashi Koshou)",
    "Hazard Prediction (KYK) & Site Communication",
    "Slope & Drainage Management (Norimen / Haisui)"
  ],
  questions: [
    {
      id: "doboku-q01",
      section: "safety-procedures",
      format: "single-choice",
      promptJa: "油圧ショベル（バックホウ）が旋回（せんかい）する作業範囲（はんい）について、正しいルールはどれですか。",
      promptEn: "What is the correct safety rule regarding the turning/swinging radius of a hydraulic excavator (backhoe)?",
      optionsJa: [
        "作業員はショベルの旋回範囲内に絶対に立ち入ってはならない",
        "ヘルメットをかぶっていれば、旋回範囲内で作業してもよい",
        "オペレーター（運転手）と目が合っていれば、近づいてよい",
        "ショベルの後ろ側は安全なので、旋回範囲内を通ってもよい"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAC Kensetsu Doboku Text",
        chapter: "Chapter 2: Heavy Equipment & Machinery Safety",
        pageOrUnit: "Unit 2.1 - Hydraulic Excavator Clearance"
      },
      explanation: {
        justification: "Per MLIT and JAC safety regulations, the entire swing radius (旋回範囲 - senkai han'i) of a hydraulic excavator is a strict no-entry zone (立入禁止区域). Operators have severe blind spots, especially to the counterweight rear, and struck-by hazards are a primary fatality cause.",
        distractorAutopsy: {
          "1": "Wearing a helmet does not protect against several tons of swinging counterweight impact.",
          "2": "Eye contact can be fleeting and distracted; clear physical exclusion zones are required by law.",
          "3": "The rear counterweight area is the most dangerous blind spot (死角 - shikaku), not a safe corridor."
        },
        senseiMnemonic: "Ingat prinsip 'Senkai = Sekai terlarang': Lingkaran putar beko adalah zona haram sentuh! 360 derajat harus steril dari manusia.",
        l1InterferenceAlert: "Di Indonesia, pekerja sering mendekat ke samping beko untuk memberi tahu rekan atau istirahat di dekat roda rantai. Di Jepang, masuk ke radius putar tanpa izin/stop mesin adalah pelanggaran berat K3 (Kenseki / Sanksi).",
        remedialPrescription: "Kuasai istilah: 旋回範囲 (senkai han'i = radius putar), 立入禁止 (tachiiri kinshi = dilarang masuk), 死角 (shikaku = titik buta)."
      }
    },
    {
      id: "doboku-q02",
      section: "technical-vocabulary",
      format: "single-choice",
      promptJa: "深さ2メートル以上の溝（みぞ）を手作業で掘削（くっさく）するとき、土砂崩壊（どしゃほうかい）を防ぐために必ず設置するものは何ですか。",
      promptEn: "When excavating a trench deeper than 2 meters by hand, what must be installed to prevent earth collapse?",
      optionsJa: [
        "土止め支保工（どどめしほこう）",
        "保安柵（ほあんさく）",
        "カラーコーン",
        "トラロープ"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAC Kensetsu Doboku Text",
        chapter: "Chapter 3: Trench & Earth Excavation",
        pageOrUnit: "Unit 3.2 - Shoring & Collapse Prevention"
      },
      explanation: {
        justification: "Under Japan's Industrial Safety and Health Act (Roudou Anzen Eisei-hou), trench excavations of 2m or deeper legally mandate trench shoring (土止め支保工 - dodome shihokou) using walers, struts, and sheeting to resist soil lateral pressure and protect workers from trench cave-in burial.",
        distractorAutopsy: {
          "1": "Safety fencing (保安柵) warns pedestrians around the perimeter but provides zero structural earth-retention inside the trench.",
          "2": "Color cones (カラーコーン) are lightweight traffic markers, not structural shoring supports.",
          "3": "Tiger rope (トラロープ - yellow/black warning rope) is only a visual deterrent."
        },
        senseiMnemonic: "'Dodome' = Menahan (Tomeru) Tanah (Do)! Tanpa dodome shihokou, tanah longsor menimbun dalam hitungan detik.",
        l1InterferenceAlert: "Di proyek non-resmi Indonesia, galian sering dibiarkan terbuka tegak lurus tanpa dinding penahan. Di Jepang, kedalaman $\\ge 2\\text{ m}$ tanpa dodome adalah pelanggaran kriminal keselamatan kerja.",
        remedialPrescription: "Hafalkan komponen: 土止め支保工 (dodome shihokou = penahan tanah), 矢板 (yaita = turap lembaran), 腹起し (haraokoshi = balok pengikat horizontal), 切込 / 切保工 (kiribari = struts penyangga)."
      }
    },
    {
      id: "doboku-q03",
      section: "on-site-dialogue",
      format: "single-choice",
      promptJa: "現場監督「おい、これより地下の掘削に入る。まず図面を見て（　　）の位置を確認しろ！」",
      promptEn: "Site Supervisor: 'Hey, we are starting underground excavation now. First look at the blueprint and verify the locations of (    )!'",
      optionsJa: [
        "埋設物（まいせつぶつ）",
        "私有物（しゆうぶつ）",
        "残留物（ざんりゅうぶつ）",
        "漂流物（ひょうりゅうぶつ）"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAC Kensetsu Doboku Text",
        chapter: "Chapter 3: Trench & Earth Excavation",
        pageOrUnit: "Unit 3.1 - Underground Utility Survey"
      },
      explanation: {
        justification: "Before any excavation, Japanese civil regulations mandate locating underground buried utilities (埋設物 - maisetsubutsu) such as high-voltage electrical conduits, gas mains, water/sewerage pipes, and fiber optics. Severing a gas or power main causes catastrophic fires or area-wide blackouts.",
        distractorAutopsy: {
          "1": "私有物 (shiyuubutsu) means personal belongings/private property.",
          "2": "残留物 (zanryuubutsu) means residual waste or chemical residue.",
          "3": "漂流物 (hyouryuubutsu) means flotsam / drifting objects on water."
        },
        senseiMnemonic: "'Mai' (埋まる = tertimbun) + 'Setsu' (設ける = dipasang) + 'Butsu' (物 = benda) $\\rightarrow$ Utilitas bawah tanah (pipa gas, kabel PLN, pipa air).",
        l1InterferenceAlert: "Jangan samakan dengan 'gomi' atau 'haikibutsu'. Maisetsubutsu adalah aset utilitas aktif vital yang tertanam di bawah tanah.",
        remedialPrescription: "Catat prosedur: Konfirmasi gambar denah $\\rightarrow$ Tes galian manual/hati-hati (試験掘り - shikenbori) $\\rightarrow$ Beri tanda pita peringatan."
      }
    },
    {
      id: "doboku-q04",
      section: "safety-procedures",
      format: "single-choice",
      promptJa: "現場で誘導員（ゆうどういん）がダンプトラックをバックさせるとき、正しい誘導の方法はどれですか。",
      promptEn: "When a site signaller/guide directs a dump truck in reverse, what is the correct signaling method?",
      optionsJa: [
        "運転手のバックミラーから見える安全な位置に立ち、明確な合図を出す",
        "トラックの真後ろに立ち、車体に手で触れながらバックさせる",
        "運転手に任せて、自分は周りの通行人のみを注意して見ておく",
        "トラックの荷台に乗って、上から運転手に指示を出す"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAC Kensetsu Doboku Text",
        chapter: "Chapter 2: Heavy Equipment & Machinery Safety",
        pageOrUnit: "Unit 2.3 - Vehicle Marshalling & Signaling"
      },
      explanation: {
        justification: "A guide signalman (誘導員 - yuudouin) must stand in a designated safe position where they are clearly visible in the driver's side mirrors, never directly behind the vehicle, giving unambiguous standard whistle/arm signals.",
        distractorAutopsy: {
          "1": "Standing directly behind the truck is the most dangerous fatal pinch/crush zone (挟まれ・巻き込まれ).",
          "2": "The signalman must maintain synchronized two-way command with the truck driver while managing pedestrians.",
          "3": "Riding on the cargo bed or step board during maneuvering is strictly forbidden."
        },
        senseiMnemonic: "Prinsip kaca spion: 'Kalau kamu tak bisa melihat wajah sopir di spion, sopir pasti tak bisa melihatmu!' Berdirilah di zona pandang aman.",
        l1InterferenceAlert: "Di beberapa area parkir tradisional di Indonesia, tukang parkir sering menepuk pantat truk/mobil sambil berdiri tepat di belakang knalpot. Di proyek konstruksi Jepang, berdiri tepat di belakang bak truk mundur adalah pelanggaran fatal.",
        remedialPrescription: "Pelajari bunyi peluit: Peluit panjang = Stop (止まれ), Peluit pendek teratur = Mundur pelan (オーライ・バック)."
      }
    },
    {
      id: "doboku-q05",
      section: "quality-control",
      format: "single-choice",
      promptJa: "コンクリートを型枠（かたわく）に流し込むとき、内部の空気を抜いて密実（みつじつ）にするために使う機械は何ですか。",
      promptEn: "When pouring concrete into formwork, what machine is used to extract air pockets and compact the mixture?",
      optionsJa: [
        "バイブレーター（棒状振動機）",
        "ランマー（転圧機）",
        "プレートコンパクター",
        "グラインダー（研削機）"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAC Kensetsu Doboku Text",
        chapter: "Chapter 4: Concrete Placement & Compaction",
        pageOrUnit: "Unit 4.2 - Vibration & Curing"
      },
      explanation: {
        justification: "A concrete poker vibrator (棒状振動機 / バイブレーター) is immersed vertically into freshly poured concrete to eliminate entrapped air bubbles and ensure thorough compaction around rebars, preventing honeycombing (ジャンカ / 豆板).",
        distractorAutopsy: {
          "1": "A rammer (ランマー) is an impact soil compactor used for trench backfill, not fluid concrete formwork.",
          "2": "A plate compactor (プレートコンパクター) is used for flat asphalt or gravel surface smoothing.",
          "3": "A grinder (グラインダー) is a high-speed abrasive tool for grinding metal or dried concrete edges."
        },
        senseiMnemonic: "Vibrator = getaran pemadat beton cair. Masukkan tegak lurus, jangan sentuh besi rebar terlalu lama agar semen tidak terurai!",
        l1InterferenceAlert: "Sering salah membedakan alat pemadat tanah (rammer/plate) dengan pemadat beton (vibrator). Ranmaa untuk tanah timbunan, Baibureetaa untuk beton basah.",
        remedialPrescription: "Catat aturan getar: Selipkan tegak (垂直挿入), interval 50cm, tahan 5-15 detik sampai permukaan berkilat, cabut perlahan."
      }
    },
    {
      id: "doboku-q06",
      section: "safety-procedures",
      format: "single-choice",
      promptJa: "朝の作業開始前に行う、危険を予測して安全対策を決めるミーティングを何と呼びますか。",
      promptEn: "What is the pre-work morning meeting called where workers predict site hazards and agree on safety countermeasures?",
      optionsJa: [
        "KYK（危険予知活動）",
        "JIT（ジャストインタイム）",
        "QC（品質管理サークル）",
        "OJT（職場内訓練）"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAC Kensetsu Doboku Text",
        chapter: "Chapter 1: Site Safety Management",
        pageOrUnit: "Unit 1.2 - KYK & TBM Morning Meeting"
      },
      explanation: {
        justification: "KYK stands for Kiken Yochi Katsudou (危険予知活動 - Hazard Prediction Activity). Workers assemble before shifts to identify potential operational dangers on the task sheet and establish concrete countermeasures, ending with Pointing and Calling (指差し呼称).",
        distractorAutopsy: {
          "1": "JIT (Just In Time) is a Toyota manufacturing inventory management philosophy.",
          "2": "QC (Quality Control) focuses on statistical product defect reduction.",
          "3": "OJT (On-the-Job Training) refers to apprentice skills training during live work."
        },
        senseiMnemonic: "'K' = Kiken (Bahaya), 'Y' = Yochi (Prediksi), 'K' = Katsudou (Aktivitas). 'Waspadai bahaya sebelum mencelakai!'",
        l1InterferenceAlert: "Bukan sekadar 'briefing' umum, KYK mewajibkan setiap pekerja menyebutkan risiko spesifik tugasnya hari itu dan sepakat pada satu slogan tindakan pencegahan.",
        remedialPrescription: "Langkah 4 tahap KYK: 1R (Apa bahayanya?) $\\rightarrow$ 2R (Mana yang paling krusial?) $\\rightarrow$ 3R (Bagaimana solusinya?) $\\rightarrow$ 4R (Target tindakan kita: '〇〇ヨシ！')."
      }
    },
    {
      id: "doboku-q07",
      section: "technical-vocabulary",
      format: "single-choice",
      promptJa: "土木工事で、切土（きりど）や盛土（もりど）によって作られた人工的な斜面（しゃめん）のことを何と呼びますか。",
      promptEn: "In civil construction, what is the term for an artificial slope formed by soil cutting or embankment filling?",
      optionsJa: [
        "法面（のりめん）",
        "天端（てんば）",
        "擁壁（ようへき）",
        "路床（ろしょう）"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAC Kensetsu Doboku Text",
        chapter: "Chapter 3: Trench & Earth Excavation",
        pageOrUnit: "Unit 3.3 - Slope & Embankment Terminology"
      },
      explanation: {
        justification: "An inclined artificial earth slope resulting from excavation (切土) or embankment filling (盛土) is called 'Norimen' (法面). Managing slope stability, netting, and vegetation against rainwater washouts is central to civil works.",
        distractorAutopsy: {
          "1": "天端 (tenba) refers to the flat crown or top uppermost edge of a wall, dam, or structure.",
          "2": "擁壁 (youheki) refers to a rigid retaining wall made of concrete or masonry.",
          "3": "路床 (roshou) refers to the subgrade earth layer beneath road pavement."
        },
        senseiMnemonic: "'Nori' seperti menuruni lereng perbukitan! Lereng miring tanah = Norimen (法面).",
        l1InterferenceAlert: "Sering tertukar antara 'Norimen' (lereng miring tanah) dan 'Youheki' (dinding beton penahan tanah vertikal/miring).",
        remedialPrescription: "Pahami kata turunan: 法面保護 (norimen hogo = proteksi lereng), 法尻 (norijiri = kaki lereng), 法肩 (norikata = bahu lereng)."
      }
    },
    {
      id: "doboku-q08",
      section: "safety-procedures",
      format: "single-choice",
      promptJa: "工事現場において、強風（きょうふう）や悪天候時の作業中止基準として正しいものはどれですか。",
      promptEn: "On a construction site, what is the correct standard for suspending work during strong winds or inclement weather?",
      optionsJa: [
        "10分間の平均風速が毎秒10メートル以上になったら、高所作業を中止する",
        "小雨が降ってきたら、どんな作業も直ちに全て中止しなければならない",
        "風が強くても、命綱（フルハーネス）があれば作業を続けてよい",
        "作業中止の判断は、各作業員が自分の気分で決める"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAC Kensetsu Doboku Text",
        chapter: "Chapter 1: Site Safety Management",
        pageOrUnit: "Unit 1.4 - Weather Suspension Standards"
      },
      explanation: {
        justification: "Under Japanese labor safety rules (An'ei-soku Article 522), when 10-minute average wind speeds reach 10 m/s or greater, high-altitude and tower crane lifting operations must be suspended immediately due to extreme fall and swinging load hazards.",
        distractorAutopsy: {
          "1": "Light rain (小雨) does not legally require full site shutdown unless excavation trench flooding or lightning risks emerge.",
          "2": "Full-body harnesses prevent fatal falls from sudden slips, but wind gust forces over 10 m/s cause loss of balance and equipment collisions.",
          "3": "Weather shutdowns are strictly declared by the site director (現場責任者/元方安全衛生管理者), not individual whims."
        },
        senseiMnemonic: "Angka keramat: 'Kaze 10m/s = Yamero!'. Kecepatan angin 10 meter per detik adalah batas mutlak stop kerja ketinggian.",
        l1InterferenceAlert: "Di beberapa proyek lokal, gerimis atau angin kencang sering diabaikan selama masih bisa berdiri. Di Jepang, ada anemometer digital di site; begitu menyentuh 10 m/s sirene/instruksi stop berbunyi.",
        remedialPrescription: "Ketahui standar alam: 風速 10m/s (angin kencang), 震度 4 以上の地震 (gempa skala Shindo 4+ wajib inspeksi tebing/trench sebelum masuk kembali)."
      }
    },
    {
      id: "doboku-q09",
      section: "on-site-dialogue",
      format: "single-choice",
      promptJa: "先輩「大雨の後は、法面が緩（ゆる）んでいるかもしれないから、（　　）がないかよく点検しろよ！」",
      promptEn: "Senior: 'After heavy rain, the slope might be loose, so inspect carefully to see if there are any (    )!'",
      optionsJa: [
        "はらみやクラック（ひび割れ）",
        "ペンキの剥（は）がれ",
        "草の生え具合",
        "ゴミの散乱"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAC Kensetsu Doboku Text",
        chapter: "Chapter 3: Trench & Earth Excavation",
        pageOrUnit: "Unit 3.4 - Post-Rain Inspection"
      },
      explanation: {
        justification: "Post-rain slope inspections mandate checking for soil swelling/bulging (はらみ - harami) and tension cracks (クラック / ひび割れ - hibiware). These are imminent precursors to catastrophic slope collapse (法面崩壊).",
        distractorAutopsy: {
          "1": "Peeling paint (ペンキの剥がれ) is a cosmetic issue on metal containers, irrelevant to slope soil stability.",
          "2": "Grass growth conditions (草の生え具合) are landscaping concerns, not immediate geotechnical collapse indicators.",
          "3": "Scattered garbage (ゴミの散乱) is a 5S housekeeping matter, not a slope failure symptom."
        },
        senseiMnemonic: "'Harami' = perut menggembung (tanah mendorong keluar karena air jenuh), 'Kurakku' = retakan. Dua tanda ini = lari, tanah mau longsor!",
        l1InterferenceAlert: "Jangan remehkan retakan kecil di tanah atas galian setelah hujan. Rembesan air (湧水 - yuusui) dan retakan 1cm bisa memicu longsoran puluhan ton.",
        remedialPrescription: "Ingat 3 tanda bahaya tebing: はらみ (gembung), 亀裂・ひび割れ (retakan), 湧水・濁り水 (rembesan air mendadak keruh)."
      }
    },
    {
      id: "doboku-q010",
      section: "technical-vocabulary",
      format: "single-choice",
      promptJa: "道路工事の現場で、夜間に一般車両や歩行者から作業箇所を見えやすくするために設置するものは何ですか。",
      promptEn: "At a road construction site, what is installed to make the work area visible to passing vehicles and pedestrians at night?",
      optionsJa: [
        "チューブライトや回転灯（こうてんとう）",
        "防音シート（ぼうおんシート）",
        "養生マット（ようじょうマット）",
        "目隠しフェンス（めかくしフェンス）"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAC Kensetsu Doboku Text",
        chapter: "Chapter 5: Road Works & Traffic Safety",
        pageOrUnit: "Unit 5.2 - Night Illumination & Warning Devices"
      },
      explanation: {
        justification: "For night road works, high-visibility illumination devices such as LED tube lights (チューブライト), revolving warning beacons (回転灯), and arrow blinkers (矢印板) are required to prevent motorist collisions.",
        distractorAutopsy: {
          "1": "Soundproof sheets (防音シート) reduce noise for adjacent residences, not vehicle visual guidance.",
          "2": "Curing mats (養生マット) protect concrete surfaces during drying or floor scratching.",
          "3": "Blind fences (目隠しフェンス) block sightlines to hide clutter, which does not illuminate hazards at night."
        },
        senseiMnemonic: "Malam hari di jalan raya: Butuh lampu berputar (回転灯) dan lampu selang LED (チューブライト) agar tidak diseruduk mobil!",
        l1InterferenceAlert: "Pakaian rompi reflektif saja tidak cukup. Area barikade fisik wajib menyala dengan daya mandiri (baterai/genset solar).",
        remedialPrescription: "Katalog perlengkapan jalan malam: チューブライト (tube light), 工事用回転灯 (beacon), 矢印板 (rambu panah berkedip), 反射ベスト (rompi reflektif)."
      }
    },
    {
      id: "doboku-q011",
      section: "safety-procedures",
      format: "single-choice",
      promptJa: "クレーン作業で荷物を吊り上げるとき、ワイヤーロープがピンと張った地切り（じぎり）の高さで行うべき正しい動作はどれですか。",
      promptEn: "When lifting a cargo load with a crane, what is the correct action to take at the 'Jigiri' (just cleared off the ground) height?",
      optionsJa: [
        "地上10〜20cmで一旦停止し、玉掛けの緩みや荷の傾きを確認する",
        "勢いをつけて一気に目的の高さまで巻き上げる",
        "荷物が揺れている場合、手で直接強く押さえて止める",
        "地切りしたら、すぐに真下に入って底面を支える"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAC Kensetsu Doboku Text",
        chapter: "Chapter 2: Heavy Equipment & Machinery Safety",
        pageOrUnit: "Unit 2.4 - Crane Rigging & Jigiri Protocol"
      },
      explanation: {
        justification: "'Jigiri' (地切り) is the critical inspection moment when a hoisted load is raised 10-20 cm off the ground. The crane operator MUST pause hoisting while the slinger checks sling tension, balance, and center-of-gravity before continuing.",
        distractorAutopsy: {
          "1": "Hoisting non-stop with momentum risks sudden tipping, snapping slings, and uncontrollable pendulum swings.",
          "2": "Never grab a swinging heavy load directly with bare hands; use guide ropes (介錯ロープ - kaishaku ro-pu).",
          "3": "Standing directly underneath a suspended load (吊り荷の下) is strictly prohibited by law."
        },
        senseiMnemonic: "'Jigiri' = Terangkat dari bumi (Ji)! Berhenti di 20 cm, teriak 'Jigiri Yoshi!', cek tali kencang baru naik terus.",
        l1InterferenceAlert: "Kebiasaan mendorong barang gantung pakai tangan kosong sangat berbahaya. Jari bisa terjepit atau tubuh terpelanting jika beban berayun. Selalu gunakan tali kendali (介錯ロープ).",
        remedialPrescription: "Hafalkan tahapan angkat crane: 1. Angkat 10-20 cm (地切り) $\\rightarrow$ 2. Cek kestabilan & sling $\\rightarrow$ 3. Kendalikan dengan 介錯ロープ (kaishaku ro-pu)."
      }
    },
    {
      id: "doboku-q012",
      section: "technical-vocabulary",
      format: "single-choice",
      promptJa: "土木工事で土を埋め戻した後、締め固め（転圧 - てんあつ）が不十分だと将来どのような問題が起きますか。",
      promptEn: "In civil engineering, after backfilling soil, what problem will occur in the future if compaction (Ten'atsu) is insufficient?",
      optionsJa: [
        "地盤が沈下（ちんか）して道路に穴やくぼみができる",
        "土の水分が完全に抜けて砂漠化する",
        "地中の温度が急激に上昇して発火する",
        "土がコンクリートのように硬くなりすぎて掘れなくなる"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAC Kensetsu Doboku Text",
        chapter: "Chapter 4: Compaction & Backfill",
        pageOrUnit: "Unit 4.4 - Settlement & Compaction Quality"
      },
      explanation: {
        justification: "Inadequate compaction (締め固め / 転圧不足) leaves high porosity in the soil. Over time, under traffic vibration and groundwater infiltration, severe ground settlement (地盤沈下 - jiban chinka) and sinkholes (陥没 - kanbotsu) develop.",
        distractorAutopsy: {
          "1": "Soil does not turn into a desert simply due to poor compaction.",
          "2": "Normal civil soil backfills do not generate spontaneous thermal combustion.",
          "3": "Insufficient compaction causes soil to remain soft and loose, the exact opposite of becoming excessively hardened."
        },
        senseiMnemonic: "'Ten'atsu' (転圧) kurang = 'Chinka' (沈下 = amblas)! Jalan raya bisa ambrol berlubang (sinkhole) jika pemadatan asal-asalan.",
        l1InterferenceAlert: "Menimbun tanah bukan sekadar meratakan permukaan dengan cangkul. Harus dipadatkan berlapis-lapis (30cm per layer) dengan alat pemadat (rammer/roller).",
        remedialPrescription: "Kuasai kata kunci: 転圧 (ten'atsu = pemadatan), 地盤沈下 (jiban chinka = penurunan tanah), 陥没 (kanbotsu = lubang amblas/sinkhole)."
      }
    },
    {
      id: "doboku-q013",
      section: "on-site-dialogue",
      format: "single-choice",
      promptJa: "先輩「よし、このパイプの位置、水平器（すいへいき）で測ってくれ。」後輩「はい、気泡（きほう）が（　　）にあるので、水平になっています！」",
      promptEn: "Senior: 'Alright, measure the position of this pipe with the bubble spirit level.' Junior: 'Yes, the air bubble is (    ), so it is level!'",
      optionsJa: [
        "2本の基準線のちょうど真ん中",
        "一番右の端（はし）",
        "一番左の端（はし）",
        "完全に見えなくなっているところ"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAC Kensetsu Doboku Text",
        chapter: "Chapter 5: Road Works & Piping Measurement",
        pageOrUnit: "Unit 5.1 - Spirit Level Measurement"
      },
      explanation: {
        justification: "A spirit level (水平器 - suiheiki) indicates perfect horizontal alignment when the internal liquid bubble (気泡 - kihou) sits dead-center between the two indicator lines (2本の線の真ん中).",
        distractorAutopsy: {
          "1": "A bubble resting on the far right indicates a rightward tilt.",
          "2": "A bubble resting on the far left indicates a leftward tilt.",
          "3": "If the bubble disappears, the level is defective or positioned beyond its measuring angle."
        },
        senseiMnemonic: "Kihou (gelembung) pas di tengah 2 garis = Suoheki Yoshi (Datar sempurna!).",
        l1InterferenceAlert: "Waterpass (istilah Indonesia) di Jepang disebut 水平器 (suiheiki). Gelembung harus di tengah garis acuan (目盛線のセンター).",
        remedialPrescription: "Peralatan ukur dasar lapangan: 水平器 (suiheiki = waterpass), スケール / コンベックス (meteran gulung), 下げ振り (sagefuri = unting-unting bandul lot)."
      }
    },
    {
      id: "doboku-q014",
      section: "safety-procedures",
      format: "single-choice",
      promptJa: "マンホール内や深い地下ピット内に入って作業するとき、最も警戒しなければならない災害は何ですか。",
      promptEn: "When entering a manhole or deep underground pit to work, what is the most hazardous disaster that must be guarded against?",
      optionsJa: [
        "酸素欠乏症（さんそけつぼうしょう）や硫化水素中毒（りゅうかすいそちゅうどく）",
        "直射日光による日焼け",
        "強風によるあおられ転倒",
        "高所からの落下物による直撃"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAC Kensetsu Doboku Text",
        chapter: "Chapter 3: Trench & Earth Excavation",
        pageOrUnit: "Unit 3.5 - Confined Space & Oxygen Deficiency Safety"
      },
      explanation: {
        justification: "Underground manholes and pits are enclosed spaces where organic decomposition consumes oxygen ($<18\\%$) and generates lethal hydrogen sulfide ($H_2S$). Entering without forced ventilation and multi-gas detector checks leads to immediate loss of consciousness and fatal asphyxiation (酸欠症).",
        distractorAutopsy: {
          "1": "Deep enclosed pits are underground in total darkness; sunburn is impossible.",
          "2": "Subsurface enclosed spaces are shielded from atmospheric high-velocity wind gusts.",
          "3": "While dropped objects can occur, toxic gas inhalation is the predominant immediate killer in pit work."
        },
        senseiMnemonic: "'Sanketsu' = Kurang Oksigen ($<18\\%$). Gas beracun tak terlihat dan tak berbau (atau bau telur busuk). Cek gas detector & hidupkan blower!",
        l1InterferenceAlert: "Banyak pekerja mengira jika tidak ada bau maka ruangan aman. Oksigen tipis tidak berbau sama sekali; satu tarikan napas bisa membuat pingsan seketika.",
        remedialPrescription: "Aturan 酸欠 (Sanketsu): 1. Ukur kadar $O_2$ ($\\ge 18\\%$) & $H_2S$ ($\\le 10\\text{ ppm}$) $\\rightarrow$ 2. Blower ventilasi terus menerus $\\rightarrow$ 3. Pasang tripod penolong dan tali pengaman."
      }
    },
    {
      id: "doboku-q015",
      section: "quality-control",
      format: "single-choice",
      promptJa: "作業終了後に行う「整理・整頓・清掃・清潔・躾（しつけ）」の職場環境改善活動を総称して何と言いますか。",
      promptEn: "What is the collective term for the site environment improvement practice of Seiri, Seiton, Seisou, Seiketsu, and Shitsuke performed after work?",
      optionsJa: [
        "5S活動（ごえすかつどう）",
        "4S活動（よんえすかつどう）",
        "3K活動（さんけいかつどう）",
        "PDCAサイクル"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAC Kensetsu Doboku Text",
        chapter: "Chapter 1: Site Safety Management",
        pageOrUnit: "Unit 1.1 - 5S Site Discipline"
      },
      explanation: {
        justification: "The 5S methodology comprises 整理 (Seiri - Sort), 整頓 (Seiton - Set in Order), 清掃 (Seisou - Shine/Clean), 清潔 (Seiketsu - Standardize), and 躾 (Shitsuke - Sustain/Discipline). It forms the bedrock of Japanese construction safety and zero-accident culture.",
        distractorAutopsy: {
          "1": "4S omits Shitsuke (Discipline/Habitual training).",
          "2": "3K (Kitsui, Kitanai, Kiken) refers to the negative stereotype of dirty/demanding/dangerous labor, not a safety methodology.",
          "3": "PDCA (Plan-Do-Check-Act) is a general continuous management framework, not the specific 5S workplace housekeeping standard."
        },
        senseiMnemonic: "5S: Pilah (Seiri), Tata (Seiton), Bersih (Seisou), Rawat (Seiketsu), Rajin (Shitsuke). Lapangan rapi = Nol kecelakaan!",
        l1InterferenceAlert: "Di proyek konstruksi Jepang, perkakas yang ditinggalkan berserakan bukan sekadar 'berantakan', tapi pemicu tersandung (つまずき - tsumazuki) dan cedera serius.",
        remedialPrescription: "Hafalkan terjemahan resmi: 整理 = buang yang tak perlu; 整頓 = taruh barang pada tempatnya agar 10 detik langsung ketemu."
      }
    }
  ]
};

module.exports = sswDobokuSet01;
