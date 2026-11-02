// SSW Construction (Lifelines & Utilities / ライフライン・設備 - Lifeline) Set 01
// Curriculum Reference: JAC (Japan Association for Construction Human Resources) & MLIT Official Textbooks

const sswLifelineSet01 = {
  id: "ssw-kensetsu-lifeline-set01",
  title: "SSW Tokutei Ginou: Kensetsu Lifeline & MEP Utilities Set 01",
  track: "ssw-kensetsu-lifeline",
  level: "A2-B1",
  tier: "standard",
  durationMinutes: 15,
  passingScorePercent: 70,
  recommendedRetakeIntervalDays: 7,
  focusAreas: [
    "Water Supply & Drainage Piping (Kyuuhaisui & Pipe Joining)",
    "Hydrostatic Pressure & Leakage Testing (Suiatsu Shiken)",
    "Electrical Conduit & Shock Prevention (Kanden Boushi & Kendenki)",
    "Gas Piping & Leak Detection Precautions",
    "Ceiling Plenum & Subfloor Pit Safety Protocols"
  ],
  questions: [
    {
      id: "lifeline-q01",
      section: "technical-vocabulary",
      format: "single-choice",
      promptJa: "給水管（きゅうすいかん）の配管工事が終わった後、パイプの接続部から水漏れがないか確認するために行う試験は何ですか。",
      promptEn: "After finishing water supply piping work, what test is conducted to verify there are no water leaks from pipe joints?",
      optionsJa: [
        "水圧試験（すああつしけん）",
        "通煙試験（つうえんしけん）",
        "打撃試験（だげきしけん）",
        "引張試験（ひっぱりしけん）"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAC Kensetsu Lifeline Text",
        chapter: "Chapter 2: Water Supply & Drainage Piping",
        pageOrUnit: "Unit 2.2 - Hydrostatic Pressure Testing"
      },
      explanation: {
        justification: "A hydrostatic pressure test (水圧試験 - suiatsu shiken) pressurizes the sealed piping system with water to a prescribed test pressure (e.g., $0.75 - 1.75\\text{ MPa}$ depending on pipe class) using a hydraulic pump, holding it for a specified duration to verify zero pressure drop and zero joint leakage.",
        distractorAutopsy: {
          "1": "A smoke test (通煙試験) is used to find odor leak pathways in drainage vent systems, not high-pressure water supply pipes.",
          "2": "An impact test (打撃試験) tests material toughness by hammering, which would damage plumbing joints.",
          "3": "A tensile test (引張試験) is a destructive laboratory test measuring ultimate tensile strength of steel coupons."
        },
        senseiMnemonic: "'Sui' (Air) + 'Atsu' (Tekanan) = Uji Tekan Air! Isi air, pompa sampai tekanan uji, cek jarum manometer anteng atau turun.",
        l1InterferenceAlert: "Sering disebut 'tes hidrostatik' atau 'tes pompa' di Indonesia. Di Jepang istilah standarnya adalah 水圧試験 (suiatsu shiken) dengan alat uji 水圧テストポンプ.",
        remedialPrescription: "Langkah 水圧試験: Tutup ujung (メクラ栓) $\\rightarrow$ Buang udara (エア抜き) $\\rightarrow$ Pompa sampai tekanan rencana $\\rightarrow$ Tahan waktu (保持時間) $\\rightarrow$ Cek apakah jarum turun (圧降下)."
      }
    },
    {
      id: "lifeline-q02",
      section: "safety-procedures",
      format: "single-choice",
      promptJa: "電気配線や機器の点検・修理を行う前に、感電（かんでん）を防ぐために最初に行うべき必須の安全手順は何ですか。",
      promptEn: "Before inspecting or repairing electrical wiring or equipment, what is the mandatory first safety procedure to prevent electric shock?",
      optionsJa: [
        "ブレーカーを落として電源を遮断し、検電器で電圧ゼロを確認する",
        "ゴム手袋をしているので、ブレーカーを入れたまま急いで作業する",
        "触ると危ない電線だけを養生テープで巻いておく",
        "先輩に「電気を消して」と叫んで、返事を待たずに配線に触る"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAC Kensetsu Lifeline Text",
        chapter: "Chapter 3: Electrical Installation & Shock Prevention",
        pageOrUnit: "Unit 3.1 - De-energization & Voltage Verification"
      },
      explanation: {
        justification: "To eliminate electric shock hazards, workers must de-energize the circuit at the breaker, apply lock-out/tag-out (LOTO), and verify zero residual voltage using a calibrated voltage detector (検電器 - kendenki) before contacting any conductors.",
        distractorAutopsy: {
          "1": "Insulated gloves are PPE, but working live without an urgent hot-line permit is illegal and dangerous.",
          "2": "Curing tape (養生テープ) has almost zero dielectric breakdown rating and does not insulate against AC mains.",
          "3": "Shouting without physical lockout and electrical test confirmation causes deadly shock if someone flips the switch back."
        },
        senseiMnemonic: "Kanden Boushi (Cegah Sengatan Listrik): 1. Matikan Breaker! 2. Pasang tanda 'Sedang Diperbaiki'! 3. Tempel Kendenki: 'Den'atsu Zero Yoshi!'",
        l1InterferenceAlert: "Di Indonesia, teknisi kadang menguji kabel masih ada strum atau tidak dengan punggung jari atau tespen murahan. Di Jepang, dilarang keras menyentuh kabel sebelum diuji dengan 検電器 (kendenki) berstandar industri.",
        remedialPrescription: "Kuasai 3 serangkai: 電源遮断 (pemutusan daya), 施錠・表示 (lockout/tagout), 検電 (kenden = tes voltase dengan sensor)."
      }
    },
    {
      id: "lifeline-q03",
      section: "technical-vocabulary",
      format: "single-choice",
      promptJa: "排水配管（はいすいはいかん）において、下水管からの悪臭や害虫が室内に侵入するのを防ぐために水（封水）を溜めておく器具を何と言いますか。",
      promptEn: "In drainage piping, what fixture holds a seal of water (Fuusui) to prevent foul sewer odors and pests from entering the room?",
      optionsJa: [
        "排水トラップ（トラップ）",
        "逆流防止弁（チャッキ弁）",
        "減圧弁（げんあつべん）",
        "ストレーナー（ろ過器）"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAC Kensetsu Lifeline Text",
        chapter: "Chapter 2: Water Supply & Drainage Piping",
        pageOrUnit: "Unit 2.4 - Drain Traps & Water Seal (Fuusui)"
      },
      explanation: {
        justification: "A drain trap (排水トラップ - haisui torappu, e.g., P-trap, S-trap, drum trap) retains a barrier of standing water called 'Fuusui' (封水 - water seal, typically $50 - 100\\text{ mm}$) to block hazardous noxious gases and insects from escaping upward.",
        distractorAutopsy: {
          "1": "A check valve (逆流防止弁 / チャッキ弁) prevents mechanical liquid backflow in piping, but does not rely on a standing water pool to block sewer gas.",
          "2": "A pressure reducing valve (減圧弁) regulates downstream fluid pressure.",
          "3": "A strainer (ストレーナー) filters out rust and coarse debris from pipes."
        },
        senseiMnemonic: "'Trap' = Perangkap air pelindung bau! Air yang tertahan di lekukan pipa (封水 - fuusui) menyumbat bau busuk got agar tak masuk kamar mandi.",
        l1InterferenceAlert: "Jika rumah baru tercium bau got, sering kali penyebabnya bukan pipa bocor, tapi 封水切れ (fuusui gire = air perangkap di leher angsa mengering).",
        remedialPrescription: "Istilah drainase: 排水トラップ (haisui torappu = perangkap leher angsa), 封水 (fuusui = genangan air penahan bau), 通気管 (tsuukikan = pipa ventilasi udara penyeimbang tekanan)."
      }
    },
    {
      id: "lifeline-q04",
      section: "on-site-dialogue",
      format: "single-choice",
      promptJa: "先輩「塩ビ管（PVC管）をつなぐときは、受口と差口の両方に（　　）を均一に塗って、奥まで一気に差し込んでしばらく押さえろ！」",
      promptEn: "Senior: 'When connecting PVC pipes, apply (    ) evenly to both the socket and spigot, insert all the way in one go, and hold firmly for a moment!'",
      optionsJa: [
        "専用の塩ビ用接着剤（接着用溶剤）",
        "潤滑油（マシンオイル）",
        "シールテープ",
        "石鹸水（せっけんすい）"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAC Kensetsu Lifeline Text",
        chapter: "Chapter 2: Water Supply & Drainage Piping",
        pageOrUnit: "Unit 2.1 - PVC Pipe Solvent Welding"
      },
      explanation: {
        justification: "Rigid PVC pipe joints utilize specialized solvent cement (塩ビ用接着剤 / 溶剤). It chemically dissolves/melts the PVC surfaces, fusing them cold. The joint must be shoved to full socket depth and held for several seconds to prevent the tapered socket from pushing the pipe back out (抜け戻り防止).",
        distractorAutopsy: {
          "1": "Lubricating oil (マシンオイル) destroys solvent bonding and contaminates drinking water pipes.",
          "2": "Thread seal tape (シールテープ) is exclusively for threaded metallic/plastic fittings, not solvent-weld slip sockets.",
          "3": "Soapy water is used for gasket rubber slip joints or gas leak bubble checks, not solvent cementing."
        },
        senseiMnemonic: "'Enbi setchakuzai' = Lem pipa PVC khusus pelebur plastik! Oles rata kedua sisi $\\rightarrow$ dorong mentok $\\rightarrow$ tahan 10 detik agar tidak membal keluar.",
        l1InterferenceAlert: "Banyak pekerja di Indonesia mengoles lem hanya pada ujung pipa (spigot) dan lupa mengoles bagian dalam soket (fitting), lalu langsung dilepas sehingga pipa terdorong mundur 1 cm. Sambungan harus dioles kedua sisi dan ditahan kuat.",
        remedialPrescription: "Kaidah sambung pipa PVC: 1. Bersihkan debu & keringkan $\\rightarrow$ 2. Oles lem pada soket & pipa $\\rightarrow$ 3. Masukkan lurus tanpa diputar berlebih $\\rightarrow$ 4. Tahan (保持) agar tidak 抜け戻り."
      }
    },
    {
      id: "lifeline-q05",
      section: "technical-vocabulary",
      format: "single-choice",
      promptJa: "配管のネジ接続部から気体や液体の漏れを防ぐために、ネジ山に巻き付ける白い薄いテープを何と言いますか。",
      promptEn: "What is the thin white tape wound around pipe threads to prevent gas or liquid leakage from threaded connections called?",
      optionsJa: [
        "シールテープ",
        "マスキングテープ",
        "両面テープ",
        "ダクトテープ"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAC Kensetsu Lifeline Text",
        chapter: "Chapter 2: Water Supply & Drainage Piping",
        pageOrUnit: "Unit 2.3 - Thread Sealing (Seal Tape)"
      },
      explanation: {
        justification: "PTFE thread seal tape (シールテープ - shiiru te-pu) is wrapped clockwise around male pipe threads to fill micro-voids between mating threads, creating a watertight/gastight seal upon torquing into female fittings.",
        distractorAutopsy: {
          "1": "Masking tape (マスキングテープ) is paper painter's tape for boundary caulking, offering zero pressure sealing.",
          "2": "Double-sided tape (両面テープ) bonds two flat surfaces.",
          "3": "Duct tape (ダクトテープ) is cloth adhesive tape for temporary wraps, incapable of sealing threaded pipe pressure."
        },
        senseiMnemonic: "'Seal Tape' = Pita putih PTFE perapat drat ulir. Selalu gulung searah jarum jam (kanan) mengikuti arah putar drat!",
        l1InterferenceAlert: "Gulung pita selalu SEARAH jarum jam (kabel ulir). Jika terbalik (berlawanan jarum jam), saat soket diputar kencang pita akan terurai berantakan dan bocor.",
        remedialPrescription: "Aturan シールテープ: Sisakan 1 ulir drat terdepan (jangan ditutup agar potongan pita tak masuk menyumbat pipa), tarik kencang, putar searah ulir 5-8 lilitan."
      }
    },
    {
      id: "lifeline-q06",
      section: "safety-procedures",
      format: "single-choice",
      promptJa: "ビルや住宅の天井裏（てんじょううら）に入って配線やダクトの工事を行うとき、足元で最も注意すべきことは何ですか。",
      promptEn: "When entering a ceiling plenum/cavity to work on wiring or ducts, what is the most critical caution regarding footing?",
      optionsJa: [
        "天井板（石膏ボードなど）に直接足を乗せず、野縁（のぶち）や足場板の上を踏む",
        "天井板は丈夫なので、どこを踏んで歩いても全く問題ない",
        "素足になって音を立てないようにゆっくり歩く",
        "天井裏の換気扇のファンに足を乗せて体重を支える"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAC Kensetsu Lifeline Text",
        chapter: "Chapter 4: Ceiling Plenum & Confined Spaces",
        pageOrUnit: "Unit 4.1 - Ceiling Plenum Walking Precautions"
      },
      explanation: {
        justification: "Ceiling lining boards (drywall/acoustic tiles) have zero structural load capacity. Stepping on them causes immediate brittle punch-through and a fatal fall to the floor below. Workers must walk solely on temporary catwalk planks laid across steel ceiling joists (野縁 / 吊り木).",
        distractorAutopsy: {
          "1": "Ceiling boards cannot bear human weight and will snap instantaneously.",
          "2": "Walking barefoot offers zero safety on rough sheet metal framing and exposed screw tips.",
          "3": "Ventilation fans have light aluminum blades and housings that collapse instantly under human body weight."
        },
        senseiMnemonic: "Plafon gypsum itu seperti kerupuk! Jangan pernah injak papan putihnya. Injaklah rangka besi joist (野縁) atau papan injakan pembantu.",
        l1InterferenceAlert: "Sering terjadi kecelakaan pekerja magang menginjak papan plafon hingga jebol terjatuh 3 meter ke lantai bawah. Injak hanya struktur rangka penahan beban (構造材).",
        remedialPrescription: "Aturan 天井裏 (Tenjou-ura): 1. Pasang papan injakan (足場板), 2. Bawa senter kepala (ヘッドライト), 3. Pakai helm & kacamata pelindung debu wol kaca (グラスウール)."
      }
    },
    {
      id: "lifeline-q07",
      section: "technical-vocabulary",
      format: "single-choice",
      promptJa: "電気配管工事で、コンクリート打ち込み時に電線を保護するために埋設（まいせつ）して使用されるオレンジ色の合成樹脂製可とう電線管は何ですか。",
      promptEn: "In electrical piping, what is the orange flexible synthetic resin conduit buried in concrete to protect electrical wires called?",
      optionsJa: [
        "CD管（コンバインドダクト管）",
        "PF管（プラフレキ管）",
        "鋼製電線管（配管用炭素鋼鋼管）",
        "耐熱塩ビ管（HT管）"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAC Kensetsu Lifeline Text",
        chapter: "Chapter 3: Electrical Installation & Shock Prevention",
        pageOrUnit: "Unit 3.3 - Electrical Conduits (CD vs PF)"
      },
      explanation: {
        justification: "CD pipe (CD管 - Combined Duct) is orange, non-flame retardant flexible conduit exclusively permitted for direct embedding inside reinforced concrete slabs and walls. For exposed wall surfaces, flame-retardant PF pipe (PF管 - Plaflex) must be used.",
        distractorAutopsy: {
          "1": "PF pipe (PF管) is flame-retardant (often gray/beige) used for exposed wiring or cavity spaces, not exclusively color-coded orange.",
          "2": "Steel conduit (鋼製電線管) is rigid metal tubing used for heavy mechanical or outdoor protection.",
          "3": "HT pipe (耐熱塩ビ管) is red-brown chlorinated PVC used for hot water plumbing, not electrical conduits."
        },
        senseiMnemonic: "Warna Oranye = 'CD kan' khusus cor beton! Karena mudah terbakar di udara bebas, CD管 haram dipasang telanjang di luar tembok.",
        l1InterferenceAlert: "Sering tertukar antara CD管 dan PF管. CD管 (oranye) HANYA untuk di dalam cor semen. Jika dipasang di plafon terbuka atau luar tembok, inspektur listrik akan menolak.",
        remedialPrescription: "Ingat beda fatal: CD管 (Oranye, 非難燃性 / tidak tahan api) $\\rightarrow$ Khusus cor beton. PF管 (Abu-abu/putih, 自己消火性 / tahan api) $\\rightarrow$ Boleh di luar cor."
      }
    },
    {
      id: "lifeline-q08",
      section: "safety-procedures",
      format: "single-choice",
      promptJa: "ガス配管の工事や開栓（かいせん）作業中に、ガス漏れの疑いがある場合、現場で絶対にやってはならない行動はどれですか。",
      promptEn: "During gas piping work or valve opening, if a gas leak is suspected, what action must NEVER be done on-site?",
      optionsJa: [
        "部屋の換気扇や電灯のスイッチをカチッと操作する",
        "ガスの元栓（メインバルブ）を速やかに閉める",
        "窓やドアを手動で静かに大きく開けて換気する",
        "火気の使用を直ちに禁止し、周囲の人を避難させる"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAC Kensetsu Lifeline Text",
        chapter: "Chapter 5: Gas Piping & HVAC Installation",
        pageOrUnit: "Unit 5.1 - Gas Leak Emergency Response"
      },
      explanation: {
        justification: "Never flip electrical switches, plug/unplug cords, or activate exhaust fans when gas leakage is suspected. The internal contact micro-spark inside switches ignites explosive gas-air mixtures instantaneously, triggering massive explosions.",
        distractorAutopsy: {
          "1": "Shutting the main gas cock (元栓を閉める) cut off the fuel supply, which is standard mandatory emergency action.",
          "2": "Manually and gently opening windows and doors ventilates natural gas without electrical spark hazards.",
          "3": "Prohibiting all ignition sources and evacuating personnel is strictly proper procedure."
        },
        senseiMnemonic: "Bau gas? JANGAN sentuh saklar lampu atau saklar exhaust! Bunga api mikro saklar = 'Dooom!' Meledakkan seisi ruangan. Buka jendela secara manual.",
        l1InterferenceAlert: "Refleks orang awam saat bau gas adalah menyalakan kipas/exhaust dinding untuk membuang bau. Ini kesalahan fatal yang paling sering memicu ledakan LPG/Town Gas.",
        remedialPrescription: "Prosedur 3 langkah darurat gas bocor: 1. Tutup valve (元栓閉止), 2. Buka jendela perlahan (手動換気), 3. Jangan pencet saklar apapun / jangan bunyikan bel."
      }
    },
    {
      id: "lifeline-q09",
      section: "on-site-dialogue",
      format: "single-choice",
      promptJa: "後輩「先輩、給湯配管（お湯のパイプ）の周りに巻くグラスウールなどのカバーは何のために取り付けるのですか。」先輩「それはパイプの熱を逃がさず、水が凍るのを防ぐ（　　）のためだよ。」",
      promptEn: "Junior: 'Senior, why do we wrap glass wool covers around hot water pipes?' Senior: 'That is for (    ) to prevent heat loss and stop water from freezing.'",
      optionsJa: [
        "保温・防露（ほおん・ぼうろ）",
        "着色・装飾（ちゃくしょく・そうしょく）",
        "重量増加（じゅうりょうぞうか）",
        "電波遮断（でんぱしゃだん）"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAC Kensetsu Lifeline Text",
        chapter: "Chapter 2: Water Supply & Drainage Piping",
        pageOrUnit: "Unit 2.5 - Pipe Insulation & Anti-Condensation"
      },
      explanation: {
        justification: "Pipe thermal insulation jacketing (保温材 - hounzai, such as glass wool or elastomeric foam) serves two core functions: Thermal insulation (保温 - retaining heat in hot water pipes and preventing freezing in winter) and Anti-condensation (防露 - bouro, preventing humid summer air from condensing sweat droplets on cold water lines).",
        distractorAutopsy: {
          "1": "Coloring and decoration are secondary aesthetic concerns; bare visual looks do not justify costly thermal wrapping.",
          "2": "Adding weight is undesirable because it strains pipe hanger supports (吊りバンド).",
          "3": "Pipe insulation materials have zero radio frequency shielding properties."
        },
        senseiMnemonic: "'Houn' (Jaga hangat) + 'Bouro' (Cegah embun menetes)! Bungkus pipa agar air panas tetap panas dan air dingin tidak berembun membasahi plafon.",
        l1InterferenceAlert: "Di iklim tropis Indonesia, pipa air jarang diinsulasi kecuali pipa AC. Di Jepang, pipa air dingin yang tak dibungkus akan 'berkeringat' hebat (結露 - ketsuro) dan merusak plafon gipsum.",
        remedialPrescription: "Duo fungsi insulasi: 1. 保温 (cegah air beku pecah pipa di musim dingin), 2. 防露 (cegah tetesan embun kondensasi di musim panas)."
      }
    },
    {
      id: "lifeline-q010",
      section: "technical-vocabulary",
      format: "single-choice",
      promptJa: "空調設備工事で、エアコン室内機で発生した結露水（けつろうすい）を屋外や排水管へ排出するための配管を何と言いますか。",
      promptEn: "In HVAC installation, what is the piping called that discharges condensation water generated by the air conditioner indoor unit to the outdoors or drain line?",
      optionsJa: [
        "ドレン配管（ドレン管）",
        "冷媒配管（れいばいはいかん）",
        "ダクト配管",
        "ベント管（通気管）"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAC Kensetsu Lifeline Text",
        chapter: "Chapter 5: Gas Piping & HVAC Installation",
        pageOrUnit: "Unit 5.2 - HVAC Drain Piping Slope"
      },
      explanation: {
        justification: "Condensate drain piping is called 'Drain pipe' (ドレン配管 / ドレン管). It must be installed with a continuous positive downward gradient (通常 1/50〜1/100 の下り勾配) to ensure gravity drainage of indoor coil sweat water without back-flooding the room.",
        distractorAutopsy: {
          "1": "Refrigerant piping (冷媒配管) circulates pressurized fluorocarbon gas/liquid (e.g., R32, R410A) between indoor and outdoor units.",
          "2": "Ducting (ダクト配管) channels conditioned supply and return air through galvanized sheet metal ducts.",
          "3": "Vent piping (ベント管 / 通気管) balances atmospheric air pressure inside sanitary drainage stacks."
        },
        senseiMnemonic: "'Drain' = Buangan air embun AC! Pasang pipa drain selalu miring ke bawah (下り勾配). Kalau datar atau naik, air AC meluap bocor ke lantai.",
        l1InterferenceAlert: "Sering terjadi kebocoran AC baru karena kemiringan (勾配 - koubai) pipa drain terbalik atau tersumbat lendir kotoran. Wajib tes tuang air (通水テスト).",
        remedialPrescription: "Kaidah pipa drain: 1. Pasang miring minimal 1/100, 2. Bungkus isolasi anti-embun, 3. Lakukan 通水テスト (tuang 1-2 liter air untuk verifikasi aliran lancar)."
      }
    },
    {
      id: "lifeline-q011",
      section: "safety-procedures",
      format: "single-choice",
      promptJa: "電動工具（ディスクグラインダーや電動ハンマなど）を使用する際、漏電（ろうでん）による感電事故を防ぐために取り付けるべき安全装置は何ですか。",
      promptEn: "When using power tools (disc grinder, rotary hammer), what safety device should be connected to prevent electric shock from earth leakage?",
      optionsJa: [
        "漏電遮断器（ポータブルアースリール / 漏電ブレーカー）",
        "変圧器（トランス）のみ",
        "タコ足配線タップ",
        "延長コードの結束バンド"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAC Kensetsu Lifeline Text",
        chapter: "Chapter 3: Electrical Installation & Shock Prevention",
        pageOrUnit: "Unit 3.2 - Ground Fault Interrupters (ELCB)"
      },
      explanation: {
        justification: "Earth leakage circuit breakers (漏電遮断器 - Rouden Shadanki / portable GFCI cord reels) instantly trip power within milliseconds if a tool casing becomes energized due to damaged insulation or water ingress, saving workers from ventricular fibrillation.",
        distractorAutopsy: {
          "1": "A transformer changes voltage levels but does not automatically detect ground leakage current without an integral breaker.",
          "2": "Multi-tap daisy-chain splitters (タコ足配線) cause electrical overloads and fire hazards.",
          "3": "Cable ties simply bundle cords and provide zero electrical safety cutoff."
        },
        senseiMnemonic: "'Rouden Shadanki' = Pemutus arus bocor! Bila ada kabel lecet atau kemasukan air, alat ini 'cetek' memutus listrik dalam 0.1 detik sebelum menyengat jantung.",
        l1InterferenceAlert: "Di proyek Jepang, mencolokkan gerinda listrik langsung ke stopkontak dinding tanpa unit 漏電遮断器 (ELCB) perantara adalah pelanggaran K3 yang langsung disetop pengawas.",
        remedialPrescription: "Peralatan wajib: 漏電遮断器付きコードリール (gulungan kabel dengan proteksi ELCB), tombol tes trip bulanan (テストボタン), kabel ground arde (アース線)."
      }
    },
    {
      id: "lifeline-q012",
      section: "technical-vocabulary",
      format: "single-choice",
      promptJa: "配管の途中に設けて、メンテナンスや緊急時に水の流れを完全に止めたり調節したりするためのバルブを何と言いますか。",
      promptEn: "What is the valve installed along a pipeline called that is used to completely shut off or regulate the flow of water during maintenance or emergencies?",
      optionsJa: [
        "仕切弁（ゲートバルブ）や玉形弁（グローブバルブ）",
        "安全ピン",
        "点検口（てんけんこう）",
        "ブラケット金具"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAC Kensetsu Lifeline Text",
        chapter: "Chapter 2: Water Supply & Drainage Piping",
        pageOrUnit: "Unit 2.6 - Valves & Flow Control"
      },
      explanation: {
        justification: "Gate valves (仕切弁 - shikiriben / gate valve) and globe valves (玉形弁 - tamagataben / globe valve) or ball valves (ボール弁) are flow-control valves installed to isolate pipe sectors for leak repair, fixture replacement, or emergency shutoff.",
        distractorAutopsy: {
          "1": "Safety pins (安全ピン) are mechanical retaining pins on fire extinguishers or shackles.",
          "2": "Inspection hatches (点検口) are access door openings in ceilings or walls to visually inspect hidden plumbing.",
          "3": "Bracket hardware (ブラケット金具) supports pipes against walls."
        },
        senseiMnemonic: "'Shikiri-ben' = Katup penyekat pemotong aliran! Putar searah jarum jam untuk menutup aliran air pipa saat perbaikan.",
        l1InterferenceAlert: "Ingat arah putaran valve standar: Putar kanan (searah jarum jam) = Tutup (閉 - Shime), Putar kiri (berlawanan jarum jam) = Buka (開 - Ake).",
        remedialPrescription: "Jenis valve: ゲートバルブ (tahan gesek rendah, posisi buka penuh/tutup penuh), ボールバルブ (cepat 90 derajat putar), バタフライバルブ (untuk pipa besar)."
      }
    },
    {
      id: "lifeline-q013",
      section: "safety-procedures",
      format: "single-choice",
      promptJa: "床下ピット（地下ピット）で配管工事を行う前、作業員の生命を守るために最初に行うべき測定は何ですか。",
      promptEn: "Before conducting piping work in a subfloor pit, what is the first measurement that must be conducted to protect workers' lives?",
      optionsJa: [
        "酸素濃度および硫化水素・可燃性ガス濃度の測定",
        "床のコンクリート強度の測定",
        "天井の高さと部屋の広さの測定",
        "ピット内の明るさ（照度）の測定"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAC Kensetsu Lifeline Text",
        chapter: "Chapter 4: Ceiling Plenum & Confined Spaces",
        pageOrUnit: "Unit 4.2 - Confined Space Gas Detection"
      },
      explanation: {
        justification: "Subfloor pits are confined spaces prone to oxygen depletion ($<18\\%$) and dangerous buildups of hydrogen sulfide ($H_2S$) or methane ($CH_4$). The atmosphere MUST be measured at multiple depths with a calibrated multi-gas detector before entry, followed by continuous blower ventilation.",
        distractorAutopsy: {
          "1": "Concrete compressive strength is verified during curing, irrelevant to entering workers' respiratory safety.",
          "2": "Geometric pit dimensions are checked from blueprints, not an urgent life-saving atmosphere pre-entry test.",
          "3": "While lighting is helpful, adequate oxygen and absence of lethal poison gas is the absolute first life-preserving condition."
        },
        senseiMnemonic: "Pit bawah tanah = Bahaya mati lemas! Ukur $O_2$ dan gas racun DULU sebelum kepala masuk ke lubang. Oksigen minimal $18\\%$!",
        l1InterferenceAlert: "Jangan pernah langsung melompat masuk ke manhole atau pit bawah tanah hanya karena 'kelihatannya kering dan tenang'. Gas beracun tak terlihat dan bisa merenggut nyawa dalam hitungan detik.",
        remedialPrescription: "Nilai ambang batas K3: Oksigen $\\ge 18\\%$, H2S $\\le 10\\text{ ppm}$, CO $\\le 50\\text{ ppm}$, Gas mudah terbakar $\\le 10\\%\\text{ LEL}$."
      }
    },
    {
      id: "lifeline-q014",
      section: "technical-vocabulary",
      format: "single-choice",
      promptJa: "配管を切断した直後、パイプの内側にできる鋭いギザギザ（バリ）を取り除くために使う工具は何ですか。",
      promptEn: "Immediately after cutting a pipe, what tool is used to remove the sharp burrs (Bari) formed on the inside of the cut edge?",
      optionsJa: [
        "リーマー（面取り器）",
        "パイプレンチ",
        "ウォーターポンププライヤー",
        "ラチェットレンチ"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAC Kensetsu Lifeline Text",
        chapter: "Chapter 1: Tools & Materials",
        pageOrUnit: "Unit 1.2 - Pipe Reaming & Deburring"
      },
      explanation: {
        justification: "A pipe reamer or deburring tool (リーマー / 面取り器 - mentoriki) scrapes off internal burrs (バリ - bari). If burrs are left inside, they cause turbulence, cavitation erosion, pipe narrowing, and snag hair/debris causing drain clogs.",
        distractorAutopsy: {
          "1": "A pipe wrench (パイプレンチ) grips and turns threaded iron pipes, not deburring edges.",
          "2": "Water pump pliers (ウォーターポンププライヤー) grip hex nuts and fittings with adjustable slip jaws.",
          "3": "A ratchet wrench (ラチェットレンチ) tightens bolts with a one-way ratcheting mechanism."
        },
        senseiMnemonic: "'Reamer' = Kerik duri pipa! Habis potong pipa tembaga/besi/pvc, buang taring tajamnya (バリ) pakai reamer agar air mengalir mulus.",
        l1InterferenceAlert: "Jangan lewatkan tahap reaming! Di pipa tembaga refrigeran AC, serpihan sisa potongan yang tidak di-reamer bisa tersedot ke kompresor dan merusaknya seketika.",
        remedialPrescription: "Tahapan potong pipa: 1. Potong siku dengan pipa cutter $\\rightarrow$ 2. Bersihkan gerigi dalam dengan リーマー $\\rightarrow$ 3. Haluskan bibir luar (面取り)."
      }
    },
    {
      id: "lifeline-q015",
      section: "on-site-dialogue",
      format: "single-choice",
      promptJa: "職長「今日でこの系統の通水テストは完了だ。最後に配管図面と照らし合わせて（　　）がないか確認ヨシ！」",
      promptEn: "Foreman: 'Today water flow testing for this line is completed. Finally, cross-check against the piping drawings to confirm there is no (    ) - Check OK!'",
      optionsJa: [
        "締め忘れやバルブの誤作動（配管ミス）",
        "作業員の昼休みの予定",
        "壁紙の色の流行",
        "外の天気の変化"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAC Kensetsu Lifeline Text",
        chapter: "Chapter 2: Water Supply & Drainage Piping",
        pageOrUnit: "Unit 2.7 - Handover Inspection & Valve Verification"
      },
      explanation: {
        justification: "At final commissioning, the lead technician and workers must verify that all joint fittings are tightened, no caps are forgotten, and valve positions (open/closed) precisely match schematics to prevent building-wide flooding.",
        distractorAutopsy: {
          "1": "Lunch break schedules are personal matters, not technical commissioning checklists.",
          "2": "Wallpaper color fashion trends have nothing to do with plumbing MEP verification.",
          "3": "Outside weather changes do not inspect internal plumbing valve alignments."
        },
        senseiMnemonic: "Final check instalasi pipa: Pastikan tidak ada baut kendor (締め忘れ) dan posisi kran buka/tutup pas sesuai denah!",
        l1InterferenceAlert: "Satu fitting yang lupa dikencangkan (締め忘れ) bisa mengakibatkan banjir jutaan yen saat pompa utama gedung dinyalakan. Wajib cek satu per satu dengan spidol inspeksi.",
        remedialPrescription: "Metode verifikasi Jepang: Gunakan spidol cat penanda (マーキング) pada setiap baut/sambungan yang sudah dikencangkan (トルクチェック済み)."
      }
    }
  ]
};

module.exports = sswLifelineSet01;
