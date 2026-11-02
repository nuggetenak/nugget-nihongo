// SSW Manufacturing (素形材・産業機械・電気電子情報関連製造業 - Seizougyou) Set 01
// Curriculum Reference: METI (Ministry of Economy, Trade and Industry) & JAIM Official Textbooks

const sswManufacturingSet01 = {
  id: "ssw-manufacturing-set01",
  title: "SSW Tokutei Ginou: Manufacturing & Industrial Machinery Set 01",
  track: "ssw-manufacturing",
  level: "A2-B1",
  tier: "standard",
  durationMinutes: 15,
  passingScorePercent: 70,
  recommendedRetakeIntervalDays: 7,
  focusAreas: [
    "Rotating Machinery Safety (Lathes, Drill Presses & No-Glove Rule)",
    "Precision Measurement Instruments (Nogisu & Micrometer)",
    "Machine Interlocks, Emergency Stop Buttons & Light Curtains",
    "Metal Swarf (Kiriko) Management & Chip Clearing Hooks",
    "Torque Tightening Standards & Defect Containment (NG Red Boxes)"
  ],
  questions: [
    {
      id: "mfg-q01",
      section: "safety-procedures",
      format: "single-choice",
      promptJa: "旋盤（せんばん）やボール盤（ドリル盤）など、高速で回転する工作機械で作業するとき、巻き込まれ防止のために「絶対に着用してはならない」ものは何ですか。",
      promptEn: "When operating machine tools with high-speed rotating spindles such as lathes or drill presses, what must NEVER be worn to prevent entanglement?",
      optionsJa: [
        "軍手（布製・糸製の手袋）",
        "保護メガネ（安全ゴーグル）",
        "安全靴",
        "作業帽（つば付き作業キャップ）"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAIM Seizougyou Text",
        chapter: "Chapter 2: Machine Tool Safety & Entanglement Prevention",
        pageOrUnit: "Unit 2.1 - Rotating Spindles & No-Glove Rule"
      },
      explanation: {
        justification: "Under METI and Japanese industrial safety law, wearing cloth/knit gloves (軍手 - gunte) while operating revolving machinery (lathes, drilling machines, milling spindles) is strictly forbidden. Loose woven textile fibers catch instantly on spinning chucks, dragging the operator's fingers and hand into the spindle, resulting in devastating traumatic amputations.",
        distractorAutopsy: {
          "1": "Protective safety glasses are mandatory to shield eyes from flying metal chips and coolant spray.",
          "2": "Safety shoes protect feet from heavy metal billets, workpieces, or tooling drops.",
          "3": "Caps with hair neatly tucked inside prevent long hair from catching on spinning shafts."
        },
        senseiMnemonic: "Mesin berputar = 'HARAM SARUNG TANGAN KAIN (軍手禁止)'! Satu helai benang rajut tersangkut putaran bor, tangan terseret masuk dalam sekejap mata. Kerja bubut/bor wajib tangan telanjang (素手).",
        l1InterferenceAlert: "Di bengkel informal Indonesia, banyak pekerja memakai sarung tangan rajut putih untuk segala pekerjaan. Di pabrik manufaktur Jepang, memakai sarung tangan rajut di depan mesin bubut/bor adalah pelanggaran fatal nomor satu.",
        remedialPrescription: "Kaidah mesin putar: 1. 回転部分の作業は「軍手禁止」 (Dilarang sarung tangan kain), 2. Lengan baju dikancing rapat (袖口を絞る), 3. Rambut dimasukkan ke dalam topi."
      }
    },
    {
      id: "mfg-q02",
      section: "technical-vocabulary",
      format: "single-choice",
      promptJa: "製品の長さ、外径（そとけい）、内径（ないけい）、および深さを1台で測定できる、スライド式の精密測定器は何ですか。",
      promptEn: "What sliding precision measuring instrument can measure product length, outside diameter, inside diameter, and depth all in one tool?",
      optionsJa: [
        "ノギス（バーニアキャリパー）",
        "スケール（巻き尺）",
        "直角定規（スコヤ）",
        "シックネスゲージ（すきまゲージ）"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAIM Seizougyou Text",
        chapter: "Chapter 1: Precision Measurement & Blueprint Reading",
        pageOrUnit: "Unit 1.1 - Vernier Calipers (Nogisu) Anatomy"
      },
      explanation: {
        justification: "A vernier caliper (ノギス - nogisu) features outside jaws (外側用ジョウ), inside jaws (内側用クチバシ), and a depth bar (デプスバー), allowing high-precision measurement ($0.05\\text{ mm}$ or $0.01\\text{ mm}$ digital) across four physical dimensions in a single instrument.",
        distractorAutopsy: {
          "1": "A tape measure (スケール) measures general dimensions with $1\\text{ mm}$ tolerance, incapable of fine internal bore measurements.",
          "2": "A try-square (スコヤ) inspects $90^\\circ$ perpendicularity of milled blocks.",
          "3": "A thickness feeler gauge (すきまゲージ) measures narrow gap clearances, not external diameters."
        },
        senseiMnemonic: "'Nogisu' = Jangka sorong serbaguna! Rahang bawah ukur diameter luar, paruh atas ukur diameter dalam, ekor belakang ukur kedalaman celah.",
        l1InterferenceAlert: "Di Indonesia lazim disebut 'jangka sorong', 'sketmat', atau 'vernier caliper'. Di Jepang sebutan resminya adalah ノギス (nogisu).",
        remedialPrescription: "4 fungsi ノギス: 1. 外側測定 (diameter luar), 2. 内側測定 (diameter dalam), 3. 深さ測定 (kedalaman), 4. 段差測定 (ketinggian tangga beda level)."
      }
    },
    {
      id: "mfg-q03",
      section: "safety-procedures",
      format: "single-choice",
      promptJa: "金属の切削加工中、機械の刃物から長くつながって排出される鋭い金属の削りカス（切粉 - きりこ）の安全な除去方法はどれですか。",
      promptEn: "During metal machining, what is the safe method to remove sharp metallic chips/swarf (Kiriko) discharged from the cutting tool?",
      optionsJa: [
        "機械を停止させ、専用の金属フックや刷毛（ブラシ）を使って取り除く",
        "機械が高速回転している最中に、素手で引っ張ってちぎり取る",
        "手袋をした手で力いっぱい回転軸の周りを拭き取る",
        "口で思い切り息を吹きかけて切粉を飛ばす"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAIM Seizougyou Text",
        chapter: "Chapter 2: Machine Tool Safety & Entanglement Prevention",
        pageOrUnit: "Unit 2.3 - Swarf (Kiriko) Handling & Hook Tools"
      },
      explanation: {
        justification: "Metal swarf (切粉 / きりこ - kiriko) is razor-sharp and burning hot. Workers must stop the machine and use dedicated clearing hooks (切粉除去フック) or magnetic pick-up rods and hand brushes (刷毛). Grabbing spinning chips by hand results in instant severed arteries or limb entrapment.",
        distractorAutopsy: {
          "1": "Snatching chips with bare hands while spinning slices deep into palms, fingers, and tendons.",
          "2": "Wiping near spinning spindles with gloves causes immediate lethal snagging and drag-in.",
          "3": "Blowing chips with breath sends high-speed metal splinters directly into eyes."
        },
        senseiMnemonic: "Tatal besi bubut (切粉 - kiriko) setajam silet bedah! Matikan mesin $\\rightarrow$ Tarik pakai tongkat kait (フック) atau sapu pakai kuas kuas (刷毛). JANGAN disentuh tangan kosong!",
        l1InterferenceAlert: "Melihat tatal besi yang menggulung panjang, pemula sering refleks menariknya dengan tangan. Tatal yang tertarik bisa langsung memotong jari seperti kawat baja panas. Gunakan selalu kait logam (切粉フック).",
        remedialPrescription: "3 aturan Kiriko: 1. Stop mesin dulu, 2. Gunakan 切粉かき出しフック (kait penarik), 3. Pakai kacamata pelindung untuk serpihan terpental."
      }
    },
    {
      id: "mfg-q04",
      section: "quality-control",
      format: "single-choice",
      promptJa: "加工後の部品の寸法を検査したところ、図面の公差（許容範囲）から外れた「不良品（NG品）」を発見しました。直ちにとるべき行動は何ですか。",
      promptEn: "Upon inspecting part dimensions after machining, you discover a defective (NG) part out of blueprint tolerance. What action must be taken immediately?",
      optionsJa: [
        "良品と混ざらないように「赤箱（不良品専用箱）」に隔離し、直ちにリーダー（班長）に報告する",
        "バレないように良品の箱の底の方にこっそり隠しておく",
        "ハンマーで叩いて強引に変形させ、無理やり寸法を合わせる",
        "自分で勝手に判断して、誰にも言わずにゴミ箱へ捨てる"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAIM Seizougyou Text",
        chapter: "Chapter 4: Quality Control & Defect Containment",
        pageOrUnit: "Unit 4.1 - Defect Segregation & Red Box Rule"
      },
      explanation: {
        justification: "To uphold total quality assurance, defective non-conforming parts (不良品 / NG品) must be instantly segregated into a designated Red Box (赤箱 / 不良品箱) with a rejection tag, and immediately reported to the squad leader (班長 / リーダー) to halt line defects at the source.",
        distractorAutopsy: {
          "1": "Hiding defective parts inside good production lots causes customer recalls and massive contract penalties.",
          "2": "Hammering machined metal parts destroys metallurgical grain structure and geometric tolerances.",
          "3": "Discarding scrap in secret conceals recurring machine tool wear or dimensional offset drifts from maintenance teams."
        },
        senseiMnemonic: "Barang cacat (NG品)? 'Pisahkan ke Kotak Merah (赤箱) + Segera Lapor Hanchou!' Jangan disembunyikan di bawah tumpukan barang bagus.",
        l1InterferenceAlert: "Rasa takut dimarahi sering membuat pekerja baru tergoda menyembunyikan produk cacat. Di industri manufaktur Jepang, menyembunyikan cacat adalah dosa terbesar yang berujung pemecatan; sedangkan melapor cacat secara cepat justru dipuji.",
        remedialPrescription: "Prosedur barang NG: 1. Hentikan mesin bila cacat berulang $\\rightarrow$ 2. Taruh di 赤箱 (kotak merah berlabel) $\\rightarrow$ 3. Segera laporkan Hou-Ren-So ke atasan."
      }
    },
    {
      id: "mfg-q05",
      section: "technical-vocabulary",
      format: "single-choice",
      promptJa: "ボルトやナットを締める際、締め付け力（トルク）が規定値に達すると「カチッ」と音や感触で知らせてくれる専用の測定工具は何ですか。",
      promptEn: "When tightening bolts and nuts, what dedicated measuring tool notifies you with a 'click' sound and tactile click once the specified tightening torque is reached?",
      optionsJa: [
        "トルクレンチ",
        "モンキーレンチ",
        "パイプレンチ",
        "六角棒スパナ（L型レンチ）"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAIM Seizougyou Text",
        chapter: "Chapter 3: Assembly & Fastening Operations",
        pageOrUnit: "Unit 3.2 - Torque Wrench Tightening Standards"
      },
      explanation: {
        justification: "A torque wrench (トルクレンチ) tightens threaded fasteners to an exact engineered torque ($N\\cdot m$). It contains an internal spring mechanism that emits an audible and tactile click when reaching the setpoint, preventing both bolt shearing and vibrational loosening.",
        distractorAutopsy: {
          "1": "An adjustable wrench (モンキーレンチ) has loose jaw backlash and provides no calibrated torque threshold feedback.",
          "2": "A pipe wrench (パイプレンチ) has serrated teeth for plumbing, stripping bolt heads.",
          "3": "A standard Allen key (六角棒スパナ) provides manual leverage without torque-limiting calibration."
        },
        senseiMnemonic: "'Torque Wrench' = Kunci pas presisi! Begitu terdengar bunyi 'Klik!', stop kencangkan. Jangan dipaksa putar dua kali lagi.",
        l1InterferenceAlert: "Banyak mekanik mengira semakin kencang baut semakin bagus. Baut yang dikencangkan berlebihan akan mengalami peregangan plastis (baut mulur) dan patah di tengah jalan.",
        remedialPrescription: "Aturan Torukurenchi: Setel nilai torsi target $\\rightarrow$ Tarik perlahan $\\rightarrow$ Bunyi 'Klik' satu kali $\\rightarrow$ Selesai. Reset ke torsi nol sebelum disimpan kembali."
      }
    },
    {
      id: "mfg-q06",
      section: "safety-procedures",
      format: "single-choice",
      promptJa: "機械が異常な音を立てたり、ワーク（工作物）が吹き飛ぶなどの緊急事態が発生したとき、誰でも瞬時に押すべきスイッチは何ですか。",
      promptEn: "When an emergency occurs, such as a machine making abnormal screeching noises or a workpiece flying off, what switch must anyone press instantaneously?",
      optionsJa: [
        "非常停止ボタン（エマージェンシーストップ / 赤い押しキノコ型ボタン）",
        "メイン電源のブレーカー",
        "スピード調節ダイヤル",
        "作業灯の照明スイッチ"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAIM Seizougyou Text",
        chapter: "Chapter 2: Machine Tool Safety & Entanglement Prevention",
        pageOrUnit: "Unit 2.2 - Emergency Stop (E-Stop) Protocol"
      },
      explanation: {
        justification: "The emergency stop push button (非常停止ボタン / E-stop, red mushroom palm-button) is hardwired directly into safety relays to cut actuator power immediately and apply electro-mechanical brakes, halting hazardous motion within fractions of a second.",
        distractorAutopsy: {
          "1": "The main breaker is inside closed electrical panels, requiring far too much time to unlock and access during urgent danger.",
          "2": "Turning speed knobs does not immediately arrest momentum and could accidentally accelerate motion.",
          "3": "The lamp lighting switch only darkens the workspace without interrupting drive motors."
        },
        senseiMnemonic: "'Tombol Jamur Merah' = Tombol penyelamat nyawa! Ada suara aneh atau rekan terjepit, hantam tombol merah ini dengan telapak tangan seketika.",
        l1InterferenceAlert: "Jangan ragu menekan tombol darurat karena takut dimarahi atau produksi berhenti! Keselamatan nyawa manusia selalu berada di atas jadwal produksi.",
        remedialPrescription: "Kaidah 非常停止: 1. Pukul tombol merah dengan telapak tangan (手のひらで叩く), 2. Pastikan mesin benar-benar diam, 3. Lapor ke penanggung jawab untuk reset penguncian."
      }
    },
    {
      id: "mfg-q07",
      section: "technical-vocabulary",
      format: "single-choice",
      promptJa: "機械加工やプレス加工の後に残る、工作物の縁（へり）の鋭いトゲや出っ張りを削り落として滑らかにする作業を何と言いますか。",
      promptEn: "What is the process called of scraping off and smoothing sharp burrs or protrusions left on the edges of workpieces after machining or stamping?",
      optionsJa: [
        "バリ取り・面取り（ばりとり・めんとり）",
        "焼入れ（やくいれ）",
        "電鍍（めっき）",
        "鍛造（たんぞう）"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAIM Seizougyou Text",
        chapter: "Chapter 3: Assembly & Fastening Operations",
        pageOrUnit: "Unit 3.1 - Deburring & Chamfering (Baritori/Mentori)"
      },
      explanation: {
        justification: "Deburring and chamfering is called 'Baritori' (バリ取り) and 'Mentori' (面取り). Removing jagged burrs with files, scrapers, or rotary grinders prevents assembly fit interferences and lacerations to handlers and end-users.",
        distractorAutopsy: {
          "1": "Quenching / hardening (焼入れ) is a thermal heat treatment process to increase steel hardness by rapid water/oil cooling.",
          "2": "Electroplating (めっき) is depositing an anti-corrosion metal film onto surfaces.",
          "3": "Forging (鍛造) is hammering red-hot metal billets into shapes."
        },
        senseiMnemonic: "'Bari' = Duri tajam logam; 'Tori' = Menghilangkan. Baritori = membersihkan duri sisa potong dengan kikir besi atau alat pengikis.",
        l1InterferenceAlert: "Logam yang baru dipotong memiliki tepian setajam pisau bedah (バリ). Jangan pernah meraba tepian potongan logam dengan ujung jari tanpa sarung tangan kulit.",
        remedialPrescription: "Alat deburring: ヤスリ (kikir), バリ取りバー (deburring blade scraper), 面取りカッター (chamfering cutter)."
      }
    },
    {
      id: "mfg-q08",
      section: "safety-procedures",
      format: "single-choice",
      promptJa: "プレス機械に手を入れて材料をセットする際、作業員の手挟まれ事故を防ぐための光線式安全装置（エリアセンサー）の機能として正しいものはどれですか。",
      promptEn: "When setting materials into a press machine, what is the correct function of the optical light curtain safety device (area sensor) to prevent worker hand-crush accidents?",
      optionsJa: [
        "光線を遮ると、スライド（金型）の下降が瞬時に停止する",
        "光線を遮ると、金型がさらに高速で勢いよく落下する",
        "金型に手が挟まれた後に、警報ブザーが鳴るだけである",
        "作業員の手を吸盤のように自動で引っ張り出してくれる"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAIM Seizougyou Text",
        chapter: "Chapter 2: Machine Tool Safety & Entanglement Prevention",
        pageOrUnit: "Unit 2.4 - Press Machine Light Curtains"
      },
      explanation: {
        justification: "An optical safety light curtain (光線式安全装置) projects an array of infrared beams across the die hazard zone. If an operator's hands or fingers break any beam while the ram is moving down, safety interlocks instantaneously halt ram movement.",
        distractorAutopsy: {
          "1": "Accelerating the downward stroke upon beam interruption would be lethal, defeating all safety purpose.",
          "2": "Sounding an alarm after crushing occurs is useless for crush prevention.",
          "3": "Sensors are purely optical photo-receivers; they lack robotic vacuum arms to pull human limbs."
        },
        senseiMnemonic: "Sensor Tirai Cahaya (光線式安全装置): Sinar inframerah terhalang tangan = Mesin press 'STOP Seketika!' Cegah tangan gepeng terhimpit cetakan baja.",
        l1InterferenceAlert: "Meskipun ada sensor pengaman, pekerja dilarang sengaja memasukkan tangan saat cetakan bergerak. Wajib gunakan tongkat penjepit (手工具 / ピンセット) untuk mengambil bahan kecil.",
        remedialPrescription: "Pengecekan harian sensor press: Sebelum produksi mulai, uji halangi sensor dengan tongkat uji $\\rightarrow$ Pastikan cetakan berhenti mendadak (急停止機能テスト)."
      }
    },
    {
      id: "mfg-q09",
      section: "technical-vocabulary",
      format: "single-choice",
      promptJa: "図面に「$\\phi 20 \\pm 0.05$」と記載されている場合、製品の直径として合格（良品）となる寸法範囲はどれですか。",
      promptEn: "When a blueprint indicates '$\\phi 20 \\pm 0.05$', what is the acceptable dimensional range for the product diameter to be judged as conforming (good)?",
      optionsJa: [
        "19.95mm から 20.05mm まで",
        "19.50mm から 20.50mm まで",
        "20.00mm ちょうどでなければ全て失格",
        "20.05mm から 20.50mm まで"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAIM Seizougyou Text",
        chapter: "Chapter 1: Precision Measurement & Blueprint Reading",
        pageOrUnit: "Unit 1.2 - Blueprint Tolerances & Limits"
      },
      explanation: {
        justification: "In engineering drawings, '$\\phi 20 \\pm 0.05$' denotes a nominal diameter of $20\\text{ mm}$ with an upper limit tolerance of $+0.05\\text{ mm}$ ($20.05\\text{ mm}$) and lower limit tolerance of $-0.05\\text{ mm}$ ($19.95\\text{ mm}$). Any measurement between $19.95\\text{ mm}$ and $20.05\\text{ mm}$ inclusive is conforming.",
        distractorAutopsy: {
          "1": "$\\pm 0.05$ means five hundredths of a millimeter, not five tenths ($\\pm 0.50$).",
          "2": "Engineering manufacturing accepts parts within tolerance limits (公差範囲); requiring $20.000\\text{ mm}$ absolute perfection is impossible in physical machining.",
          "3": "A range from $20.05$ to $20.50$ is entirely out-of-tolerance on the high side."
        },
        senseiMnemonic: "Simbol toleransi $\\pm 0.05$: Batas atas $+0.05 = 20.05$, Batas bawah $-0.05 = 19.95$. Ukuran mikrometer harus berada di antara dua batas ini!",
        l1InterferenceAlert: "Jangan salah membaca desimal: $0.05\\text{ mm}$ (50 mikron) sering tertukar dengan $0.5\\text{ mm}$ (setengah milimeter). Selisih 0.45 mm pada mesin bubut adalah kegagalan fatal.",
        remedialPrescription: "Rumus batas: 最大許容寸法 (ukuran maks) = $20 + 0.05 = 20.05\\text{ mm}$; 最小許容寸法 (ukuran min) = $20 - 0.05 = 19.95\\text{ mm}$."
      }
    },
    {
      id: "mfg-q010",
      section: "on-site-dialogue",
      format: "single-choice",
      promptJa: "先輩「金型を取り付ける前に、定盤（じょうばん）の上にゴミや切り粉が残っていないか、（　　）で綺麗に拭き取れ！」",
      promptEn: "Senior: 'Before mounting the die, wipe the surface plate clean with a (    ) to ensure no dust or swarf remains!'",
      optionsJa: [
        "ウエス（工業用清掃布）",
        "紙やすり（サンドペーパー）",
        "ワイヤーブラシ",
        "水たまりの雑巾"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAIM Seizougyou Text",
        chapter: "Chapter 3: Assembly & Fastening Operations",
        pageOrUnit: "Unit 3.3 - Surface Plate Preparation & Wiping"
      },
      explanation: {
        justification: "An industrial wiping rag (ウエス - uesu, from English 'waste cloth') is used to thoroughly wipe precision surface plates, machine ways, and die mountings. A single microscopic metal particle clamped under a heavy die causes angle tilting and damaged precision surfaces.",
        distractorAutopsy: {
          "1": "Sandpaper (紙やすり) scratches and ruins calibrated precision ground surface plates.",
          "2": "A steel wire brush scores grooves into flat reference surfaces.",
          "3": "A soaking wet muddy floor rag introduces abrasive grit and rapid surface rusting."
        },
        senseiMnemonic: "'Uesu' (ウエス) = Kain lap khusus industri pabrik! Lap bersih meja mesin dan cetakan agar tidak ada sebutir debu pun yang mengganjal.",
        l1InterferenceAlert: "Di pabrik Jepang, kain majun lap disebut ウエス (uesu). Meja mesin (定盤) harus selalu berkilat tanpa pasir atau serbuk besi sebelum cetakan diletakkan.",
        remedialPrescription: "Kaidah pasang cetakan: Lap meja dengan uesu $\\rightarrow$ Cek dengan telapak tangan (手のひらでゴミの有無を触診) $\\rightarrow$ Naikkan cetakan."
      }
    },
    {
      id: "mfg-q011",
      section: "technical-vocabulary",
      format: "single-choice",
      promptJa: "100分の1ミリ（0.01mm）単位のさらに精密な外径測定を行うために、スピンドルとアンビルで材料を挟んで測定する工具は何ですか。",
      promptEn: "What precision measuring tool clamps materials between an anvil and spindle to measure outside dimensions down to the 1/100th of a millimeter (0.01mm) level?",
      optionsJa: [
        "マイクロメーター",
        "定規（ものさし）",
        "分度器（プロトラクター）",
        "巻尺（メジャー）"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAIM Seizougyou Text",
        chapter: "Chapter 1: Precision Measurement & Blueprint Reading",
        pageOrUnit: "Unit 1.3 - Micrometer Measurement Principles"
      },
      explanation: {
        justification: "An outside micrometer (マイクロメーター - maikurome-ta-) utilizes a precision screw thread with $0.5\\text{ mm}$ pitch divided into 50 thimble graduations, enabling high-precision measurement down to $0.01\\text{ mm}$ (or $0.001\\text{ mm}$ with vernier/digital gauge), equipped with a ratchet stop (ラチェットストップ) for constant measuring force.",
        distractorAutopsy: {
          "1": "A ruler (ものさし) only resolves whole millimeters.",
          "2": "A protractor (分度器) measures angular degrees, not linear diameters.",
          "3": "A tape measure (巻尺) measures meters and centimeters for building rough cuts."
        },
        senseiMnemonic: "'Micrometer' = Pengukur ketebalan super-presisi 0.01 mm! Putar pemutar rachet sampai berbunyi 'tik-tik-tik' 3 kali untuk tekanan ukur pas.",
        l1InterferenceAlert: "Saat memutar micrometer, jangan putar badannya (thimble) terlalu keras! Putar ujung rachet kecilnya (ラチェット) sampai berbunyi klik 2-3 kali agar tidak merusak ulir mikro.",
        remedialPrescription: "Aturan マイクロメーター: Bersihkan bidang ukur $\\rightarrow$ Cek titik nol (ゼロ点確認) $\\rightarrow$ Gunakan ラチェットストップ (ratchet stop)."
      }
    },
    {
      id: "mfg-q012",
      section: "safety-procedures",
      format: "single-choice",
      promptJa: "グラインダー（両頭グラインダーなど）の砥石（といし）を取り替えた直後、法令で義務付けられている安全確認手順は何ですか。",
      promptEn: "Immediately after replacing the grinding wheel of a bench grinder, what safety verification procedure is legally mandated?",
      optionsJa: [
        "砥石の覆い（安全カバー）を取り付け、3分間以上の試運転（から運転）を行う",
        "カバーを外したまま、すぐに全力で金属を押し当てて削ってみる",
        "試運転は時間の無駄なので省略し、直ちに量産作業に入る",
        "砥石をハンマーで思い切り叩いて割れないか確かめる"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAIM Seizougyou Text",
        chapter: "Chapter 2: Machine Tool Safety & Entanglement Prevention",
        pageOrUnit: "Unit 2.5 - Grinding Wheel Replacement & Test Run"
      },
      explanation: {
        justification: "Under Japan's Industrial Safety and Health Regulations (An'ei-soku Article 118), when replacing a grinding wheel, workers must mount protective hoods and perform a test run (試運転) for at least 3 minutes (1 minute before daily shifts). If a wheel has invisible hairline cracks, it will shatter during initial spin-up, and standing away from the rotational plane prevents fatal shrapnel impacts.",
        distractorAutopsy: {
          "1": "Operating without safety guards allows exploding wheel fragments ($>100\\text{ km/h}$) to penetrate skull and torso.",
          "2": "Skipping the mandatory test run violates safety law; defective wheels fracture under initial load.",
          "3": "Striking the wheel with a hammer can shatter brittle vitrified abrasives."
        },
        senseiMnemonic: "Ganti batu gerinda baru? Wajib uji putar kosong (試運転) minimal 3 MENIT! Berdirilah di samping cover, jangan berdiri segaris dengan putaran piringan.",
        l1InterferenceAlert: "Batu gerinda yang retak rambut (ada cacat) akan meledak pecah berkeping-keping saat putaran maksimal. Tiga menit pertama adalah saat paling kritis.",
        remedialPrescription: "Prosedur 砥石交換: 1. Tes ketuk suara (打音検査 - bunyi 'ting' nyaring berarti utuh), 2. Pasang cover pengaman, 3. 試運転 3 分間 (putar kosong 3 menit)."
      }
    },
    {
      id: "mfg-q013",
      section: "quality-control",
      format: "single-choice",
      promptJa: "製造現場で、工具や治具を元の場所に戻しやすくし、紛失や探すムダをなくすための工夫として最も適切なものはどれですか。",
      promptEn: "In a manufacturing facility, what is the most appropriate practice to make tools and jigs easy to return to their designated places, eliminating loss and searching waste?",
      optionsJa: [
        "工具の形をくり抜いたウレタンフォームや、シルエット線を描いた定位置管理（姿置き）",
        "すべての工具を大きな箱の中にまとめて放り込んでおく",
        "各作業員が自分のロッカーに工具を隠して鍵をかけておく",
        "工場内のあちこちの床に適当に散らばせて置いておく"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAIM Seizougyou Text",
        chapter: "Chapter 5: 5S & Kaizen in Manufacturing",
        pageOrUnit: "Unit 5.1 - Visual Management & Shadow Boards"
      },
      explanation: {
        justification: "Shadow boards or foam cutouts (姿置き - sugata-oki / 定位置管理) visually display tool outlines. Anyone can immediately spot missing tools within one second and return them to the exact dedicated position without thinking.",
        distractorAutopsy: {
          "1": "Tossing tools in a deep box scratches calibrated tools and causes huge time waste digging for items.",
          "2": "Hoarding tools in personal lockers deprives team members and leads to duplicate purchasing.",
          "3": "Scattering tools on the shop floor causes trip accidents and damaged tooling."
        },
        senseiMnemonic: "'Sugata-oki' = Papan bayangan alat! Setiap kunci pas punya gambar siluetnya sendiri. Sekali lihat langsung tahu: 'Kunci nomor 12 hilang!'",
        l1InterferenceAlert: "Di pabrik Jepang, mencari barang lebih dari 10 detik dihitung sebagai pemborosan (ムダ - muda). Semua alat punya 'alamat rumah' tetap (定位置).",
        remedialPrescription: "Prinsip 3 Tei (三定): 1. 定位置 (teichi = lokasi tetap), 2. 定品 (teihin = barang tetap), 3. 定量 (teiryou = jumlah tetap)."
      }
    },
    {
      id: "mfg-q014",
      section: "on-site-dialogue",
      format: "single-choice",
      promptJa: "班長「これより第3ロットの組み立てに入る。始める前に、全員で手順書の（　　）を声に出して読み合わせしよう！」",
      promptEn: "Squad Leader: 'We will now begin assembly of Lot 3. Before starting, let us all read out loud and cross-check the (    ) in the standard operating procedure!'",
      optionsJa: [
        "作業手順と急所（安全ポイント・品質ポイント）",
        "工場の昨年の売上金額",
        "社内旅行のパンフレット",
        "今朝のテレビニュースの話題"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAIM Seizougyou Text",
        chapter: "Chapter 5: 5S & Kaizen in Manufacturing",
        pageOrUnit: "Unit 5.2 - Standard Operating Procedures & Key Points"
      },
      explanation: {
        justification: "Standard Operating Procedures (作業標準書 / 手順書) detail both the physical process steps and the critical safety and quality key points (急所 - kyuusho). Reading these key points aloud ensures synchronized understanding across all operators.",
        distractorAutopsy: {
          "1": "Annual macro financial sales figures are management metrics, not assembly line work instructions.",
          "2": "Company vacation pamphlets have zero technical relevance to assembly error prevention.",
          "3": "Morning television news chitchat does not clarify safety and torque instructions."
        },
        senseiMnemonic: "SOP Pabrik Jepang: Selalu cek 'Kyuusho' (Titik Kritis)! Bagian mana yang berisiko tangan terjepit dan bagian mana yang berisiko baut miring.",
        l1InterferenceAlert: "Bekerja hanya berdasarkan ingatan (勘や記憶) dilarang keras. Jika prosedur diperbarui sedikit saja, seluruh tim wajib membaca bersama lembar revisinya.",
        remedialPrescription: "Komponen SOP: 作業手順 (langkah kerja) + 急所 (titik kritis) + 理由 (alasan kenapa harus demikian)."
      }
    },
    {
      id: "mfg-q015",
      section: "safety-procedures",
      format: "single-choice",
      promptJa: "溶接（アーク溶接やCO2溶接）作業を行う際、アーク光による失明や皮膚の炎症を防ぐために着用すべき保護具の組み合わせはどれですか。",
      promptEn: "When performing welding work (arc welding, CO2 welding), what combination of PPE should be worn to prevent blindness and skin burns from intense arc radiation?",
      optionsJa: [
        "遮光面（溶接用保護面）、長袖作業着、皮手袋、および足カバー",
        "普通のサングラス、半袖シャツ、短パン、サンダル",
        "紙マスクと水泳用ゴーグルのみ",
        "素手、素肌で作業し、目を細めて見ながら溶接する"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAIM Seizougyou Text",
        chapter: "Chapter 2: Machine Tool Safety & Entanglement Prevention",
        pageOrUnit: "Unit 2.6 - Welding Radiation & PPE Compliance"
      },
      explanation: {
        justification: "Electric welding arcs emit intense ultraviolet and infrared radiation ($>3000^\\circ\\text{C}$). Appropriate shade welding filters/helmets (遮光面) prevent flash burns to the cornea (電気性眼炎 - arc eye). Heavy leather welding gloves (皮手袋), spark gaiters, and long cotton/leather sleeves prevent severe UV radiation burns and molten spatter fires.",
        distractorAutopsy: {
          "1": "Sunglasses and short sleeves result in third-degree UV skin burns and severe eye flash blisters.",
          "2": "Paper masks and swim goggles offer zero optical radiation filtering and ignite under sparks.",
          "3": "Squinting bare eyes directly at a 5000-degree electric arc causes acute retinal burn damage and photokeratitis."
        },
        senseiMnemonic: "Sinar Las (アーク光) = Sinar UV penghancur mata dan kulit! Wajib: Topeng las (遮光面) + Sarung tangan kulit tebal (皮手袋) + Baju lengan panjang rapat.",
        l1InterferenceAlert: "Banyak pekerja pemula terkena 'mata kelilipan api las' (電気性眼炎) di malam hari setelah mengintip sinar las tanpa kedok las. Matanya akan terasa seperti ditaburi pasir panas semalaman.",
        remedialPrescription: "Kaidah las: 1. Pasang partisi tirai pelindung (遮光カーテン) agar rekan sebelah tak kena sinar, 2. Gunakan nomor filter kaca las yang sesuai amper (遮光度番号), 3. Nyalakan exhaust asap las."
      }
    }
  ]
};

module.exports = sswManufacturingSet01;
