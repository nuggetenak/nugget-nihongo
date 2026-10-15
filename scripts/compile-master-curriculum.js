// ══════════════════════════════════════════════════════════════════
//  compile-master-curriculum.js — Master Curriculum Data Compiler
//  Generates complete pre-compiled static curriculum datasets:
//  - 19 Official SSW Sectors (Tokutei Ginou)
//  - Dedicated JFT-Basic Tracks (A1 & A2 with 4 exam sections)
//  - Living in Japan (Seikatsu Nihongo: Shiyakusho, Gomi, Bank, Bousai)
//  - 9 Master Book Lenses (Genki, Minna, Soumatome, Tobira, etc.)
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CURRICULUM_DIR = path.join(ROOT, 'public/data/curriculum');
const STAGED_BOOKS_DIR = path.join(ROOT, 'public/data/staged-expansion/books');

if (!fs.existsSync(CURRICULUM_DIR)) {
  fs.mkdirSync(CURRICULUM_DIR, { recursive: true });
}

// ── 1. SSW 16 ADDITIONAL SECTORS BLUEPRINT ─────────────────────
const SSW_ADDITIONAL_SECTORS = [
  {
    id: 'agriculture',
    sectorJa: '農業',
    title: 'Kurikulum SSW Pertanian & Hortikultura (Nogyo)',
    icon: '🌱',
    units: [
      {
        title_id: 'Operasional Budidaya Tanaman & Rumah Kaca',
        title_jp: '施設園芸と栽培管理',
        theme: 'Crop Cultivation',
        can_do: 'Mampu memahami instruksi pemupukan, penyiraman otomatis, dan pemeliharaan rumah kaca.',
        safety: 'Protokol ventilasi rumah kaca dan penggunaan masker pestisida.'
      },
      {
        title_id: 'Manajemen Peternakan & Pengolahan Pakan',
        title_jp: '畜産管理と給餌作業',
        theme: 'Livestock Care',
        can_do: 'Mampu memberi pakan ternak sesuai jadwal, mendeteksi sapi/unggas sakit, dan sanitasi kandang.',
        safety: 'Protokol biosekuriti dan pencegahan penyakit menular ternak.'
      },
      {
        title_id: 'Pemanenan, Sortir Kualitas & Pengepakan',
        title_jp: '収穫・選別・出荷調製',
        theme: 'Harvest & Sorting',
        can_do: 'Mampu menyortir buah/sayur berdasarkan grade ukuran, warna, dan mengepak ke dalam karton.',
        safety: 'Ergonomi angkat beban berat dan pencegahan cedera pinggang.'
      },
      {
        title_id: 'Pengoperasian Mesin Traktor & Pemotong Rumput',
        title_jp: '農業機械の安全操作',
        theme: 'Machinery Operation',
        can_do: 'Mampu memeriksa oli, menyalakan traktor, dan mengoperasikan mesin pemotong rumput (Kariharaki).',
        safety: 'Pemeriksaan harian mata pisau dan pencegahan bahaya terlilit mesin putar.'
      }
    ]
  },
  {
    id: 'accommodation',
    sectorJa: '宿泊',
    title: 'Kurikulum SSW Perhotelan & Hospitality (Shukuhaku)',
    icon: '🏨',
    units: [
      {
        title_id: 'Layanan Resepsionis & Check-in Tamu',
        title_jp: 'フロント接客とチェックイン手続き',
        theme: 'Front Desk',
        can_do: 'Mampu menyambut tamu hotel dengan Keigo sopan, memproses kunci kamar, dan menjelaskan fasilitas.',
        safety: 'Prosedur kerahasiaan identitas tamu dan penanganan kunci darurat.'
      },
      {
        title_id: 'Housekeeping & Penyiapan Kamar Tamu (Bed-making)',
        title_jp: '客室清掃とベッドメイキング',
        theme: 'Housekeeping',
        can_do: 'Mampu mengganti sprei kamar, merapikan duvet selimut, dan melengkapi amenities kamar mandi.',
        safety: 'Pencegahan tertusuk jarum/benda tajam residu dan pemisahan cucian linen kotor.'
      },
      {
        title_id: 'Layanan Restoran Hotel & Sarapan Buffet',
        title_jp: 'ホテルレストランと朝食サービス',
        theme: 'Dining Service',
        can_do: 'Mampu mengantar tamu ke meja makan, menjelaskan menu alergen, dan mengosongkan piring kosong.',
        safety: 'Pemberitahuan label alergi makanan dan pencegahan tumpahan kuah panas.'
      },
      {
        title_id: 'Penanganan Permintaan Khusus & Keluhan Tamu (Omotenashi)',
        title_jp: '顧客要望対応とトラブル対応',
        theme: 'Guest Care & Omotenashi',
        can_do: 'Mampu mendengarkan keluhan tamu dengan empati (Koushin) dan menyampaikan permohonan maaf formal.',
        safety: 'Eskalasi cepat ke manajer jaga saat terjadi insiden di kamar tamu.'
      }
    ]
  },
  {
    id: 'building-cleaning',
    sectorJa: 'ビルクリーニング',
    title: 'Kurikulum SSW Pembersihan Gedung (Building Cleaning)',
    icon: '🧹',
    units: [
      {
        title_id: 'Pembersihan Lantai Keras & Wet-Mopping',
        title_jp: '硬質床面の日常清掃とモップ掛け',
        theme: 'Hard Floor Maintenance',
        can_do: 'Mampu menyapu debu dengan flat-mop, mengepel lantai dengan cairan disinfektan, dan memasang tanda licin.',
        safety: 'Pemasangan rambu lantai basah (Kiken Ashimoto Chuui).'
      },
      {
        title_id: 'Pembersihan Sanitasi Toilet Gedung Perkantoran',
        title_jp: '衛生陶器およびトイレ定期清掃',
        theme: 'Restroom Sanitation',
        can_do: 'Mampu mendisinfeksi kloset duduk, mengisi ulang sabun cair dan kertas tisu toilet.',
        safety: 'Penggunaan sarung tangan karet nitril dan masker pelindung uap bahan kimia.'
      },
      {
        title_id: 'Pengoperasian Mesin Polisher Lantai & Ekstraksi Karpet',
        title_jp: '床面ポリッシャーとカーペット清掃',
        theme: 'Machine Operations',
        can_do: 'Mampu mengendalikan mesin polisher lantai dan menyedot debu karpet dengan vacuum cleaner industri.',
        safety: 'Manajemen kabel listrik agar tidak terlindas mesin atau tersandung pengunjung.'
      },
      {
        title_id: 'Pembersihan Kaca Jendela & Pengumpulan Sampah Kantor',
        title_jp: 'ガラス清掃と廃棄物分別回収',
        theme: 'Window & Waste',
        can_do: 'Mampu mengelap kaca jendela dengan squeegee karet dan memilah sampah kertas kantor.',
        safety: 'Kunci pengaman tangga lipat step-ladder saat membersihkan area tinggi.'
      }
    ]
  },
  {
    id: 'manufacturing',
    sectorJa: '製造（素形材・産業機械・電気電子）',
    title: 'Kurikulum SSW Manufaktur & Pengolahan Bahan (Seizou)',
    icon: '⚙️',
    units: [
      {
        title_id: 'Operasi Mesin Press & Pemotongan Logam',
        title_jp: 'プレス加工と金属切断作業',
        theme: 'Metal Press',
        can_do: 'Mampu memasang lembaran logam ke mesin press, menekan tombol interlock ganda, dan memeriksa ketebalan.',
        safety: 'Protokol sensor pengaman interlock cahaya agar tangan tidak terjepit.'
      },
      {
        title_id: 'Pengecoran Logam & Pencetakan Pasir (Chuzou)',
        title_jp: '鋳造作業と溶解炉管理',
        theme: 'Casting & Foundry',
        can_do: 'Mampu menuangkan cairan logam panas ke cetakan pasir dan memisahkan terak besi.',
        safety: 'Pemakaian helm face-shield pelindung percikan panas dan sepatu safety anti-panas.'
      },
      {
        title_id: 'Perakitan Komponen Mekanikal Presisi',
        title_jp: '精密機械部品の組立作業',
        theme: 'Precision Assembly',
        can_do: 'Mampu membaca lembar SOP gambar teknik (Seizu) dan mengencangkan baut dengan torque-wrench.',
        safety: 'Pemeriksaan torsi pengencangan baut untuk mencegah komponen lepas saat uji getar.'
      },
      {
        title_id: 'Inspeksi Dimensi & Pengendalian Kualitas (QC)',
        title_jp: 'ノギス・マイクロメータ検査と品質管理',
        theme: 'Quality Control',
        can_do: 'Mampu mengukur dimensi produk dengan jangka sorong (Nogisu) dan mikrometer, mencatat lembar QC.',
        safety: 'Pencegahan produk cacat (Defect) terkirim ke stasiun kerja berikutnya.'
      }
    ]
  },
  {
    id: 'automobile',
    sectorJa: '自動車整備',
    title: 'Kurikulum SSW Perawatan & Servis Otomotif (Jidousha Seibi)',
    icon: '🚗',
    units: [
      {
        title_id: 'Inspeksi Berkala & Penggantian Oli Mesin',
        title_jp: '定期点検とエンジンオイル交換',
        theme: 'Routine Maintenance',
        can_do: 'Mampu menaikkan mobil dengan hydraulic lift, menguras oli bekas, dan mengganti filter oli.',
        safety: 'Pemasangan pin pengaman mekanik pada hydraulic lift sebelum masuk ke kolong mobil.'
      },
      {
        title_id: 'Pemeriksaan Sistem Rem & Rotasi Ban',
        title_jp: 'ブレーキ点検とタイヤ交換・ホイールバランス',
        theme: 'Brake & Tires',
        can_do: 'Mampu mengukur ketebalan kampas rem (Brake pad), mengganti ban, dan mengencangkan mur dengan torque wrench.',
        safety: 'Pembersihan debu rem dengan brake cleaner aerosol tanpa meniup dengan angin kompresor.'
      },
      {
        title_id: 'Diagnostik Kelistrikan Mobil & Scan OBD-II',
        title_jp: '自動車電装品点検とOBDスキャン診断',
        theme: 'Electrical & Diagnostics',
        can_do: 'Mampu menghubungkan scanner OBD-II, membaca kode DTC error, dan menguji voltase aki baterai.',
        safety: 'Pelepasan kutub negatif baterai sebelum menyentuh kabel rangkaian utama.'
      },
      {
        title_id: 'Penjelasan Lembar Hasil Servis kepada Pelanggan',
        title_jp: '点検整備記録簿の説明と顧客対応',
        theme: 'Customer Explanation',
        can_do: 'Mampu menjelaskan komponen yang diganti kepada pelanggan dengan bahasa sopan dan estimasi biaya.',
        safety: 'Memastikan penutup jok dan stir pelindung bersih sebelum mobil diserahkan ke pelanggan.'
      }
    ]
  },
  {
    id: 'aviation',
    sectorJa: '航空（空港グランドハンドリング）',
    title: 'Kurikulum SSW Layanan Darat Bandara (Aviation Ground Handling)',
    icon: '✈️',
    units: [
      {
        title_id: 'Pemanduan Pesawat Masuk Apron (Marshalling)',
        title_jp: '航空機マーシャリングと駐機誘導',
        theme: 'Marshalling',
        can_do: 'Mampu memberi aba-aba marshalling wand kepada pilot menuju garis stop bay apron.',
        safety: 'Waspada zona bahaya semburan mesin jet (Jet blast) dan hisapan intake turbin.'
      },
      {
        title_id: 'Pemuatan & Pembongkaran Bagasi Pesawat (Baggage Handling)',
        title_jp: '手荷物・貨物の搭降載作業',
        theme: 'Cargo & Baggage',
        can_do: 'Mampu menyusun koper di kompartemen kargo pesawat (Bulk hold) sesuai weight & balance chart.',
        safety: 'Penguncian latch ULD container kargo dan pemakaian safety shoes bertutup baja.'
      },
      {
        title_id: 'Pengoperasian Kendaraan Ramp GSE (Towing & High-lift)',
        title_jp: '空港特殊車両（GSE）の安全運転',
        theme: 'GSE Operations',
        can_do: 'Mampu mengemudikan traktor penarik bagasi dan menempelkan tangga penumpang ke pintu pesawat.',
        safety: 'Batas kecepatan maksimal 15 km/jam di area apron dan jaga jarak aman dari sayap pesawat.'
      },
      {
        title_id: 'Pembersihan Kabin Pesawat & Pengisian Air Bersih',
        title_jp: '機内清掃と給水・汚水処理作業',
        theme: 'Cabin Cleaning & Servicing',
        can_do: 'Mampu merapikan sabuk pengaman kursi, mengganti kantong sampah, dan membersihkan lavatory.',
        safety: 'Pemeriksaan barang bawaan penumpang yang tertinggal (Lost and found) dan lapor keamanan.'
      }
    ]
  },
  {
    id: 'fishery',
    sectorJa: '漁業（漁船漁業・養殖業）',
    title: 'Kurikulum SSW Perikanan & Akuakultur (Gyogyo)',
    icon: '🐟',
    units: [
      {
        title_id: 'Pengoperasian Jaring Ikan di Kapal Tangkap',
        title_jp: '漁労作業と網の投揚作業',
        theme: 'Net Operations',
        can_do: 'Mampu melempar dan menarik jaring pukat atau jaring insang sesuai komando kapten kapal.',
        safety: 'Wajib memakai jaket pelampung (Life jacket) dan waspada terlilit tali jaring bergerak.'
      },
      {
        title_id: 'Sortir Ikan & Pembekuan di Palka Kapal',
        title_jp: '魚の選別・氷蔵および船内冷凍',
        theme: 'Sorting & Freezing',
        can_do: 'Mampu menyortir ikan berdasarkan jenis/ukuran, mencampur es curah, dan menyusun di ruang pendingin palka.',
        safety: 'Pencegahan radang dingin (Frostbite) saat bekerja di ruang palka pembeku minus 20°C.'
      },
      {
        title_id: 'Pemberian Pakan & Perawatan Keramba Budidaya (Yoshoku)',
        title_jp: '養殖いけすの管理と給餌作業',
        theme: 'Aquaculture Management',
        can_do: 'Mampu menebar pelet pakan ikan di keramba jaring apung laut dan memeriksa kesehatan ikan.',
        safety: 'Jaga keseimbangan kaki di atas titian keramba saat ombak tinggi.'
      },
      {
        title_id: 'Pemeliharaan Tali-Temali & Alat Tangkap Ikan',
        title_jp: 'ロープワークと漁具の補修・仕立て',
        theme: 'Ropework & Gear Maintenance',
        can_do: 'Mampu mengikat simpul simpul kapal (Knotting) dan menambal lubang jaring yang sobek.',
        safety: 'Pemeriksaan ketajaman jarum jaring dan penggunaan pisau lipat kapal dengan sarung pengaman.'
      }
    ]
  },
  {
    id: 'food-service',
    sectorJa: '外食業',
    title: 'Kurikulum SSW Pelayanan Restoran & Kuliner (Gaishoku)',
    icon: '🍽️',
    units: [
      {
        title_id: 'Penyambutan Tamu & Penerimaan Pesanan (Hall)',
        title_jp: 'ホール接客とハンディ注文入力',
        theme: 'Table Service',
        can_do: 'Mampu mengucapkan "Irasshaimase", mengantar tamu ke meja, dan mencatat pesanan via tablet handy.',
        safety: 'Pencegahan tumpahan minuman panas saat menyajikan di meja anak-anak.'
      },
      {
        title_id: 'Pengolahan Bahan Makanan di Dapur (Kitchen Preparation)',
        title_jp: '厨房での食材仕込みと衛生管理',
        theme: 'Kitchen Prep',
        can_do: 'Mampu memotong sayuran, menakar bumbu, dan menyiapkan porsi bahan sesuai resep standar.',
        safety: 'Pemisahan talenan pisau untuk daging mentah vs sayuran segar (cegah kontaminasi silang).'
      },
      {
        title_id: 'Penyajian Makanan & Pencucian Alat Makan (Wash Area)',
        title_jp: '料理の配膳と自動洗浄機オペレーション',
        theme: 'Serving & Dishwashing',
        can_do: 'Mampu menata hidangan di atas baki nampan dan mengoperasikan mesin pencuci piring otomatis.',
        safety: 'Pengaturan suhu air bilas minimal 80°C untuk sterilisasi higienis.'
      },
      {
        title_id: 'Transaksi Kasir & Kebersihan Meja (Register & Busser)',
        title_jp: 'レジ会計とテーブルリセット',
        theme: 'Cashier & Turnover',
        can_do: 'Mampu menghitung uang kembalian kasir dengan sopan dan membersihkan meja makan untuk tamu berikutnya.',
        safety: 'Penyemprotan alkohol disinfektan pada meja makan setelah tamu selesai.'
      }
    ]
  },
  {
    id: 'industrial-machinery',
    sectorJa: '産業機械製造業',
    title: 'Kurikulum SSW Permesinan Industri (Sangyou Kikai)',
    icon: '🏭',
    units: [
      {
        title_id: 'Pengoperasian Mesin Bubut & Milling Konvensional',
        title_jp: '旋盤・フライス盤加工と切削作業',
        theme: 'Machining',
        can_do: 'Mampu memasang benda kerja pada chuck mesin bubut, menyetel kecepatan putar spindel, dan membubut silinder.',
        safety: 'Dilarang keras memakai sarung tangan rajut saat mengoperasikan mesin berputar.'
      },
      {
        title_id: 'Pengelasan Konstruksi Mesin (Arc & Co2 Welding)',
        title_jp: '半自動溶接とビード外観検査',
        theme: 'Welding',
        can_do: 'Mampu menyalakan busur las CO2, mengarahkan torch las dengan kecepatan konstan, dan membersihkan kerak terak.',
        safety: 'Penggunaan kacamata pelindung gelap shading level 10 dan ventilasi hisap asap las.'
      },
      {
        title_id: 'Pengecatan Industri & Pelapisan Anti-Karat',
        title_jp: '工業塗装と防錆処理作業',
        theme: 'Industrial Coating',
        can_do: 'Mampu membersihkan permukaan logam dengan degreaser, menyemprotkan cat primer dengan spray gun.',
        safety: 'Pemakaian respirator masker organik karbon aktif saat penyemprotan cat.'
      },
      {
        title_id: 'Pengujian Fungsi & Uji Beban Mesin Pabrik',
        title_jp: '機械の試運転と動作確認検査',
        theme: 'Commissioning & Testing',
        can_do: 'Mampu menekan tombol start siklus uji coba mesin, memantau tekanan hidrolik, dan menghentikan darurat.',
        safety: 'Lokasi tombol Emergency Stop (E-Stop) harus diketahui sebelum menyalakan mesin.'
      }
    ]
  },
  {
    id: 'electric-electronic',
    sectorJa: '電気電子情報関連産業',
    title: 'Kurikulum SSW Elektrik & Elektronik (Denki Denshi)',
    icon: '⚡',
    units: [
      {
        title_id: 'Pemasangan Komponen PCB & Solder Manual',
        title_jp: 'プリント基板実装と手ハンダ付け作業',
        theme: 'PCB & Soldering',
        can_do: 'Mampu memasang komponen resistor/IC ke lubang PCB, menyolder dengan timah solder, dan memotong kawat sisa.',
        safety: 'Pemakaian gelang grounding anti-statis (ESD wrist strap) untuk melindungi komponen microchip.'
      },
      {
        title_id: 'Perakitan Kabel Harness & Pemasangan Konektor',
        title_jp: 'ワイヤーハーネス加工と端子圧着',
        theme: 'Wire Harness',
        can_do: 'Mampu mengupas kulit kabel dengan wire stripper dan mengepres terminal skun dengan tang crimping.',
        safety: 'Uji tarik kabel (Pull-test) untuk memastikan konektor terkunci sempurna.'
      },
      {
        title_id: 'Pemeriksaan Rangkaian Sirkuit dengan Multimeter',
        title_jp: 'テスターによる通電検査と電圧測定',
        theme: 'Circuit Inspection',
        can_do: 'Mampu mengukur voltase, hambatan resistor, dan kontinuitas sirkuit menggunakan digital multimeter.',
        safety: 'Pastikan rangkaian tidak terhubung sumber listrik PLN sebelum menguji kontinuitas.'
      },
      {
        title_id: 'Pengepakan Produk Elektronik & Labeling Barcode',
        title_jp: '電子製品の最終外観検査と梱包出荷',
        theme: 'Packing & QA',
        can_do: 'Mampu memeriksa goresan casing luar, menempelkan stiker nomor seri barcode, dan mengepak boks karton.',
        safety: 'Penanganan hati-hati komponen kaca LCD agar tidak retak terkena benturan.'
      }
    ]
  },
  {
    id: 'shipbuilding',
    sectorJa: '造船・舶用工業',
    title: 'Kurikulum SSW Perkapalan & Kemaritiman (Zousen)',
    icon: '🚢',
    units: [
      {
        title_id: 'Penyambungan Plat Lambung Kapal (Ship Hull Fitting)',
        title_jp: '船体ブロックのぎ装・構造組立',
        theme: 'Hull Fitting',
        can_do: 'Mampu mengukur kelurusan pelat baja lambung kapal, memasang klem pengunci, dan tack-welding.',
        safety: 'Pemasangan harness tali pengaman (Full-body safety harness) saat bekerja di ketinggian dok kapal.'
      },
      {
        title_id: 'Pengelasan Otomatis Pelat Baja Tebal (Submerged Arc)',
        title_jp: '厚板自動溶接と非破壊検査準備',
        theme: 'Heavy Welding',
        can_do: 'Mampu mengoperasikan traktor las otomatis untuk menyambung pelat baja dek kapal tebal.',
        safety: 'Pengujian visual tidak ada rongga udara (Blowhole) pada alur sambungan las.'
      },
      {
        title_id: 'Pemasangan Pipa Ruang Mesin Kapal (Pipe Fitting)',
        title_jp: '機関室配管とバルブの据付作業',
        theme: 'Engine Room Piping',
        can_do: 'Mampu merangkai sambungan pipa pendingin laut dan mengencangkan flens baut katup valve.',
        safety: 'Pemeriksaan kadar oksigen ruang palka sempit tertutup (Confined space entry permit).'
      },
      {
        title_id: 'Pengecatan Lambung Kapal Anti-Teritip (Antifouling)',
        title_jp: '船体サンドブラストと防汚塗装',
        theme: 'Blasting & Coating',
        can_do: 'Mampu menyemprotkan pasir grit blasting untuk merontokkan karat dan mengecat lambung luar bawah air.',
        safety: 'Pemakaian helm air-fed helmet bertekanan udara bersih saat sandblasting.'
      }
    ]
  },
  {
    id: 'logistics',
    sectorJa: '物流・自動車運送業',
    title: 'Kurikulum SSW Logistik & Pergudangan (Butsuryuu)',
    icon: '📦',
    units: [
      {
        title_id: 'Penerimaan Barang Masuk & Scanning Barcode WMS',
        title_jp: '入荷検品とハンディターミナル検品',
        theme: 'Receiving & Inbound',
        can_do: 'Mampu mencocokkan surat jalan dengan fisik dus barang menggunakan scanner terminal genggam (Handy).',
        safety: 'Pemeriksaan kondisi fisik palet kayu agar tidak patah saat dimuat ke rak tinggi.'
      },
      {
        title_id: 'Pengoperasian Forklift Gudang (Reach & Counter)',
        title_jp: 'フォークリフト荷役作業と高層ラック格納',
        theme: 'Forklift Operations',
        can_do: 'Mampu mengambil palet barang, bermanuver di lorong gudang sempit, dan menaruh di rak bertingkat.',
        safety: 'Bunyikan klakson di setiap persimpangan lorong buta (Shikaku) dan cek 360 derajat.'
      },
      {
        title_id: 'Picking Pesanan & Pengepakan E-Commerce',
        title_jp: 'ピッキング作業と出荷仕分け梱包',
        theme: 'Picking & Packing',
        can_do: 'Mampu mengambil barang sesuai daftar pick-list, membungkus bubble-wrap, dan menempelkan resi pengiriman.',
        safety: 'Penggunaan cutter pengaman (Safety box cutter) dengan mata pisau tersembunyi.'
      },
      {
        title_id: 'Manajemen Stok & Stock Opname Berkala (Tanahoroshi)',
        title_jp: '棚卸し作業とロケーション在庫管理',
        theme: 'Inventory Audit',
        can_do: 'Mampu menghitung jumlah fisik barang di rak penyimpanan dan mencocokkan selisih di sistem komputer.',
        safety: 'Dilarang memanjat rak besi gudang tanpa tangga platform berpijakan resmi.'
      }
    ]
  },
  {
    id: 'railway',
    sectorJa: '鉄道',
    title: 'Kurikulum SSW Operasional Perkeretaapian (Tetsudou)',
    icon: '🚆',
    units: [
      {
        title_id: 'Pelayanan Peron Stasiun & Pemanduan Penumpang',
        title_jp: '駅ホーム監視と旅客案内',
        theme: 'Station Platform',
        can_do: 'Mampu mengumumkan keberangkatan kereta, memandu penumpang berkebutuhan khusus, dan mengecek pintu peron.',
        safety: 'Penunjukan jari dan konfirmasi lisan (Shisa Kanko) pada sinyal lampu keberangkatan.'
      },
      {
        title_id: 'Pembersihan Cepat Rangkaian Kereta (Shinkansen Cleaning)',
        title_jp: '車両基地および折り返し車内清掃',
        theme: 'Train Turnaround Cleaning',
        can_do: 'Mampu membalik arah kursi kereta, mengganti sarung sandaran kepala, dan membersihkan sampah dalam 7 menit.',
        safety: 'Koordinasi aba-aba peluit sebelum mengoperasikan tuas pembalik kursi otomatis.'
      },
      {
        title_id: 'Pemeriksaan Rel Kereta & Bantalan Rel (Kido Seibi)',
        title_jp: '軌道点検とマクラギ保守作業',
        theme: 'Track Maintenance',
        can_do: 'Mampu memeriksa lebar spoor rel dengan mistar ukur dan mengencangkan baut pengikat rel bantalan beton.',
        safety: 'Penugasan petugas pengawas sinyal datangnya kereta (Miharisho) di ujung lintasan kerja.'
      },
      {
        title_id: 'Perawatan Berkala Bogie & Sistem Roda Kereta Api',
        title_jp: '台車点検と車輪踏面摩耗測定',
        theme: 'Bogie Inspection',
        can_do: 'Mampu mengetuk baut rangka bogie dengan palu uji bunyi (Dashingo) untuk mendeteksi retak.',
        safety: 'Pemasangan ganjal roda anti-gelinding (Chock) sebelum mekanik masuk ke kolong gerbong.'
      }
    ]
  },
  {
    id: 'forestry',
    sectorJa: '林業',
    title: 'Kurikulum SSW Kehutanan & Pengelolaan Hutan (Ringyou)',
    icon: '🌲',
    units: [
      {
        title_id: 'Penanaman Bibit Pohon & Penyiangan Gulma (Shitakari)',
        title_jp: '植林作業と下刈り作業',
        theme: 'Silviculture & Weeding',
        can_do: 'Mampu menggali lubang tanam di lereng bukit terjal dan membersihkan semak belukar liar.',
        safety: 'Pemakaian sepatu boot bergerigi anti-selip (Spike boots) saat berjalan di tebing miring.'
      },
      {
        title_id: 'Pengoperasian Chainsaw & Penebangan Pohon Terarah',
        title_jp: 'チェーンソー安全操作と伐倒作業',
        theme: 'Chainsaw & Felling',
        can_do: 'Mampu memotong takik rebah pohon (Tsukikomi), menentukan arah roboh kayu, dan memotong ranting dahan.',
        safety: 'Wajib memakai celana khusus pelindung serat anti-gergaji chainsaw (Chainsaw chaps).'
      },
      {
        title_id: 'Pengangkutan Batang Kayu dengan Kabel Winch (Shuuzai)',
        title_jp: '架線集材とグラップルローダー集積',
        theme: 'Timber Extraction',
        can_do: 'Mampu memasang kawat sling baja pada batang gelondongan dan mengoperasikan mesin derek winch.',
        safety: 'Jaga jarak radius bahaya kabel baja tegang yang berpotensi putus memantul.'
      },
      {
        title_id: 'Pemeliharaan Gergaji Mesin & Penajaman Rantai (Me-tate)',
        title_jp: 'ソーチェーンの目立てと日常点検',
        theme: 'Chainsaw Maintenance',
        can_do: 'Mampu mengikir mata rantai gergaji dengan kikir bulat pada sudut 30 derajat dan menyetel rantai kendor.',
        safety: 'Mematikan mesin dan mendinginkan blok knalpot sebelum mengisi bensin campuran oli.'
      }
    ]
  },
  {
    id: 'timber',
    sectorJa: '木材産業',
    title: 'Kurikulum SSW Industri Kayu & Penggergajian (Mokuzai)',
    icon: '🪵',
    units: [
      {
        title_id: 'Pemotongan Gelondongan Kayu dengan Mesin Band-saw',
        title_jp: '製材帯鋸盤による原木挽き割り作業',
        theme: 'Sawmilling',
        can_do: 'Mampu menaruh gelondongan kayu pada kereta carriage gergaji pita dan membelah menjadi balok kayu.',
        safety: 'Pencegahan kayu terlempar balik (Kick-back) dengan pelat pemisah belah (Riving knife).'
      },
      {
        title_id: 'Pengeringan Kayu di Kiln & Uji Kadar Air (Kansou)',
        title_jp: '木材人工乾燥機管理と含水率測定',
        theme: 'Kiln Drying',
        can_do: 'Mampu menyusun tumpukan balok kayu dengan spacer pengatur angin dan mengukur moisture meter.',
        safety: 'Pengaturan ventilasi udara panas agar tidak terjadi kebakaran debu kayu serbuk gergaji.'
      },
      {
        title_id: 'Penyerutan Presisi & Pembuatan Sambungan Kayu',
        title_jp: 'モルダー自動かんな盤とプレカット加工',
        theme: 'Planing & Precut',
        can_do: 'Mampu mengumpankan papan kayu ke mesin serut otomatis dan memeriksa kehalusan permukaan kayu.',
        safety: 'Pemakaian pelindung telinga earmuff dari kebisingan desibel mesin serut tinggi.'
      },
      {
        title_id: 'Grading Mutu Kayu JAS & Pengepakan Ekspor',
        title_jp: 'JAS規格木材等級選別と結束出荷',
        theme: 'Quality Grading',
        can_do: 'Mampu memeriksa mata kayu (Knot), retakan serat kayu, dan membundel kayu dengan strapping band baja.',
        safety: 'Pemakaian sarung tangan kulit tebal pelindung serpihan kayu tajam (Splinter).'
      }
    ]
  },
  {
    id: 'textile',
    sectorJa: '繊維・衣服縫製業',
    title: 'Kurikulum SSW Industri Tekstil & Garmen (Seni & Housei)',
    icon: '🧵',
    units: [
      {
        title_id: 'Pemotongan Pola Kain Lembaran Otomatis (Cutting)',
        title_jp: '自動裁断機（CAM）と生地延反作業',
        theme: 'Fabric Cutting',
        can_do: 'Mampu menggelar gulungan kain berlapis-lapis secara rata dan mengoperasikan mesin potong pisau vertikal.',
        safety: 'Penggunaan sarung tangan jaring kawat baja pada tangan yang menahan kain potong.'
      },
      {
        title_id: 'Penjahitan Mesin Industri High-Speed (Lockstitch & Overlock)',
        title_jp: '工業用本縫いミシンとロックミシン操作',
        theme: 'Industrial Sewing',
        can_do: 'Mampu memasang jarum mesin, memasang benang atas/bawah spul sekoci, dan menjahit lurus keliman baju.',
        safety: 'Pemasangan kawat pelindung jari (Finger guard) di sekitar jarum jahit yang bergerak cepat.'
      },
      {
        title_id: 'Pengepresan Uap & Setrika Uap Garmen (Finishing Ironing)',
        title_jp: '中間プレスと仕上げスチームアイロン',
        theme: 'Steam Ironing',
        can_do: 'Mampu menyetrika kerah kemeja, lipatan celana, dan mengoperasikan mesin press uap bodi jas.',
        safety: 'Pencegahan luka bakar uap panas bersuhu 130°C saat membuka tutup plat penekan.'
      },
      {
        title_id: 'Inspeksi Jarum Patah & Pengemasan Produk Ekspor (Kenshin)',
        title_jp: '検針機による混入検査と袋詰め出荷',
        theme: 'Needle Detection & Packing',
        can_do: 'Mampu melewatkan pakaian jadi melalui mesin detektor jarum (Kenshinki) dan memasang tag harga.',
        safety: 'Jika alarm detektor berbunyi, wajib melacak patahan jarum sampai ditemukan sebelum barang dikirim.'
      }
    ]
  }
];

// Helper to write file
function writeCurriculumFiles(filenameBase, data, windowVarName) {
  const jsonPath = path.join(CURRICULUM_DIR, `${filenameBase}.json`);
  const jsPath = path.join(CURRICULUM_DIR, `${filenameBase}.js`);

  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');

  const jsContent = `// ── ${filenameBase}.js ────────────────────────────────────────\n` +
    `// Generated by compile-master-curriculum.js\n` +
    `window.${windowVarName} = ${JSON.stringify(data, null, 2)};\n`;

  fs.writeFileSync(jsPath, jsContent, 'utf8');
}

// ── 2. COMPILE ALL 16 SSW SECTOR CURRICULUMS ──────────────────
console.log('Compiling 16 Additional SSW Sectors...');
for (const sector of SSW_ADDITIONAL_SECTORS) {
  const trackId = `curriculum-ssw-${sector.id}`;
  const windowVar = `curriculumSSW_${sector.id.replace(/-/g, '_')}`;

  const units = sector.units.map((uDef, idx) => {
    const unitNumber = idx + 1;
    const unitId = `unit-${trackId}-${String(unitNumber).padStart(2, '0')}`;

    const lessons = [
      {
        id: `les-${trackId}-u${String(unitNumber).padStart(2, '0')}-01`,
        lesson_number: 1,
        title_id: `${uDef.title_id} (SOP & Terminologi Kerja)`,
        title_jp: `${uDef.title_jp}（手順と専門用語）`,
        desc_id: `Standar operasional prosedur resmi, kosakata kunci, dan protokol kerja di tempat kerja Jepang.`,
        can_do_statement: uDef.can_do,
        grammar_ids: ['gn4-00021'],
        vocab_ids: [`v-ssw-${sector.id}-001`, `v-ssw-${sector.id}-002`],
        pedagogical_framework: {
          what: {
            summary: `Penguasaan istilah operasional dan komunikasi sopan dalam bidang ${sector.sectorJa}.`,
            canDo: uDef.can_do,
            targetPatterns: ['〜てください', '〜てもいいですか'],
            coreVocabSample: [`v-ssw-${sector.id}-001`]
          },
          sensei_context: {
            sceneIntro: `Kamu sedang bertugas di stasiun kerja bidang ${sector.sectorJa} di Jepang. Mandor (Koujoucho / Shunin) memberikan instruksi shift pagi ini.`,
            dailyMission: uDef.can_do,
            whyOrder: `Pondasi keselamatan kerja Jepang selalu diawali dari pemahaman instruksi lisan di tempat kerja.`
          },
          cultural_notes: {
            title: `Budaya Keselamatan Kerja & Horenso di Bidang ${sector.sectorJa}`,
            etiquette: `Sebelum memulai pekerjaan, ucapkan 'Yoroshiku onegai shimasu' dan pastikan helm keselamatan serta APD terpasang kencang.`,
            taboos: `Jangan pernah memulai mengoperasikan mesin sebelum ada instruksi 'Yoshi!' dari mandor pendamping.`
          },
          pronunciation_tips: {
            title: 'Tips Pelafalan Aba-Aba Suara Lantang',
            moraNote: 'Gunakan suara diafragma yang tegas dan jelas saat menjawab perintah atasan.',
            soundTip: 'Katakan "Hai, kashikomarimashita" dengan tegas tanpa ragu-ragu.'
          },
          common_pitfalls: [
            {
              title: 'Jebakan Asumsi Mandiri (Dokusen)',
              caseScenario: 'Ragu tentang tombol mesin tetapi mencoba menekan tanpa bertanya.',
              pitfallWarning: '❌ Bertindak sendiri tanpa melapor saat ada bunyi aneh pada mesin.',
              rightSolution: '✅ Segera hentikan pekerjaan, lapor supervisor: "Sumimasen, ijin ga arimasu."',
              explanation: 'Prinsip nomor satu pekerja Jepang adalah Horenso (Houkoku, Renraku, Soudan).'
            }
          ]
        },
        dialogue: [
          {
            id: 'd1',
            speaker: 'Atasan (Tanaka-san)',
            speakerRole: 'Supervisor Kerja',
            jp: '作業を始める前に、保護具を確認してください。',
            furigana: 'さぎょうをはじめるまえに、ほごぐをかくにんしてください。',
            romaji: 'Sagyou wo hajimeru mae ni, hogogu wo kakunin shite kudasai.',
            idText: 'Sebelum memulai pekerjaan, tolong pastikan alat pelindung diri Anda sudah terpasang.'
          },
          {
            id: 'd2',
            speaker: 'Anda (Pekerja SSW)',
            speakerRole: 'Staf Operasional',
            jp: 'はい、了解いたしました！点検よし！',
            furigana: 'はい、りょうかいいいたしました！てんけんよし！',
            romaji: 'Hai, ryoukai itashimashita! Tenken yoshi!',
            idText: 'Baik, saya mengerti! Pemeriksaan siap/aman!'
          }
        ],
        drills: [
          {
            id: 'dr1',
            type: 'multiple-choice',
            prompt: `Apa tindakan pertama sebelum memulai pekerjaan di sektor ${sector.sectorJa}?`,
            options: [
              'Memeriksa alat pelindung diri (Hogogu) dan konfirmasi aman (Yoshi)',
              'Langsung menekan tombol mesin tanpa instruksi',
              'Pergi istirahat makan siang',
              'Mematikan lampu pabrik'
            ],
            correctAnswer: 'Memeriksa alat pelindung diri (Hogogu) dan konfirmasi aman (Yoshi)',
            explanation: 'SOP keselamatan kerja Jepang mewajibkan pemeriksaan APD sebelum menyentuh peralatan kerja.'
          }
        ]
      },
      {
        id: `les-${trackId}-u${String(unitNumber).padStart(2, '0')}-02`,
        lesson_number: 2,
        title_id: `${uDef.title_id} (Simulasi Darurat & Laporan SBAR)`,
        title_jp: `${uDef.title_jp}（緊急時対応と報告）`,
        desc_id: `Simulasi tanggap darurat, mitigasi kecelakaan kerja K3, dan teknik pelaporan ringkas kepada atasan.`,
        can_do_statement: `Mampu melaporkan insiden keselamatan atau kendala operasional dengan cepat dan tepat.`,
        grammar_ids: ['gn4-00028'],
        vocab_ids: [`v-ssw-${sector.id}-003`],
        pedagogical_framework: {
          what: {
            summary: 'Komunikasi tanggap darurat dan pelaporan cepat saat terjadi kendala.',
            canDo: 'Bisa melaporkan insiden darurat dengan formula situasi-latar belakang-solusi.',
            targetPatterns: ['〜てしまいました', '〜てください'],
            coreVocabSample: [`v-ssw-${sector.id}-003`]
          },
          sensei_context: {
            sceneIntro: `Tiba-tiba terjadi ketidaksesuaian operasional di tempat kerja. Kamu harus segera melapor kepada mandor.`,
            dailyMission: 'Menyampaikan laporan kendala kerja dalam 15 detik pertama.',
            whyOrder: 'Dalam situasi krisis industri Jepang, kecepatan pelaporan menyelamatkan nyawa dan aset pabrik.'
          },
          cultural_notes: {
            title: 'Etika Tanggap Darurat di Tempat Kerja Jepang',
            etiquette: 'Berbicaralah dengan nada tenang namun tegas, tatap mata supervisor, dan tunjukkan lokasi masalah.',
            taboos: 'Jangan menyembunyikan kesalahan atau menunda laporan karena takut dimarahi.'
          },
          common_pitfalls: [
            {
              title: 'Jebakan Menunda Laporan',
              caseScenario: 'Ada tetesan oli atau baut longgar tapi didiamkan.',
              pitfallWarning: '❌ "Nanti saja lapornya saat jam istirahat siang."',
              rightSolution: '✅ Segera lapor saat itu juga: "Shunin, ima yoroshii desu ka."',
              explanation: 'Kecelakaan kerja fatal sering berawal dari kelalaian kecil yang tidak segera dilaporkan.'
            }
          ]
        },
        dialogue: [
          {
            id: 'd1',
            speaker: 'Anda (Pekerja SSW)',
            speakerRole: 'Staf Operasional',
            jp: '主任、すみません！機械に異常音が聞こえます。すぐに確認をお願いします。',
            furigana: 'しゅにん、すみません！きかいにいじょうおんがきこえます。すぐにかくにんをおねがいします。',
            romaji: 'Shunin, sumimasen! Kikai ni ijouon ga kikoemasu. Sugu ni kakunin wo onegai shimasu.',
            idText: 'Mandor, permisi! Terdengar suara tidak wajar pada mesin. Mohon segera diperiksa.'
          },
          {
            id: 'd2',
            speaker: 'Mandor (Shunin)',
            speakerRole: 'Supervisor Kerja',
            jp: 'よく気づいてくれた！直ちに停止ボタンを押して安全を確保しよう。',
            furigana: 'よくきづいてくれた！ただちにていしボタンをおしてあんぜんをかくほしよう。',
            romaji: 'Yoku kizuite kureta! Tadachi ni teishi botan wo oshite anzen wo kakuho shiyou.',
            idText: 'Terima kasih sudah sigap menyadarinya! Segera tekan tombol berhenti dan amankan lokasi.'
          }
        ],
        drills: [
          {
            id: 'dr1',
            type: 'multiple-choice',
            prompt: 'Apa yang harus dikatakan saat mendengar suara aneh pada mesin kerja?',
            options: [
              '主任、機械に異常音が聞こえます。確認をお願いします。',
              '大丈夫ですから、そのまま続けましょう。',
              '明日の朝、報告すればいいです。',
              '何も聞こえませんでした。'
            ],
            correctAnswer: '主任、機械に異常音が聞こえます。確認をお願いします。',
            explanation: 'Melaporkan kejanggalan suara mesin secara langsung adalah tindakan keselamatan yang tepat.'
          }
        ]
      }
    ];

    return {
      unit_number: unitNumber,
      id: unitId,
      level: 'n4_ssw',
      pt_stage: 3,
      title_id: uDef.title_id,
      title_jp: uDef.title_jp,
      theme: uDef.theme,
      icon: sector.icon,
      can_do_summary: uDef.can_do,
      l2d_focus_notes: uDef.safety,
      grammar_ids: ['gn4-00021', 'gn4-00028'],
      vocab_ids: [`v-ssw-${sector.id}-001`, `v-ssw-${sector.id}-002`, `v-ssw-${sector.id}-003`],
      lessons
    };
  });

  const fullData = {
    meta: {
      track_id: trackId,
      title: sector.title,
      sector: sector.sectorJa,
      version: '1.2.0',
      total_units: units.length,
      authoritative: true
    },
    units
  };

  writeCurriculumFiles(trackId, fullData, windowVar);
}
console.log('✓ Successfully generated 16 SSW sector curriculum datasets.');

// ── 3. COMPILE JFT-BASIC TRACKS (A1 & A2) ─────────────────────
console.log('\nCompiling JFT-Basic Tracks (A1 & A2)...');
const JFT_TRACKS = [
  {
    trackId: 'curriculum-jft-a1',
    windowVar: 'curriculumJFT_A1',
    level: 'jft-a1',
    title: 'Kurikulum JFT-Basic A1 (Starter Can-do)',
    units: [
      {
        unit_number: 1,
        title_id: 'Seksi 1: Moji to Goi (Huruf & Kosakata Formulaik)',
        title_jp: '文字と語彙（ひらがな・カタカナ・基本語彙）',
        theme: 'Alphabet & Basic Lexicon',
        icon: '🔤',
        can_do: 'Mampu membaca Hiragana, Katakana, dan kosakata salam perjumpaan sehari-hari.',
        desc: 'Mengenal huruf Jepang dasar dan pelafalan formulaik yang sering muncul di soal Seksi 1 JFT-Basic.'
      },
      {
        unit_number: 2,
        title_id: 'Seksi 2: Kaiwa to Hyougen (Ungkapan Percakapan Situasional)',
        title_jp: '会話と表現（日常のあいさつと自己紹介）',
        theme: 'Situational Dialogue',
        icon: '💬',
        can_do: 'Mampu memperkenalkan diri, menyebutkan pekerjaan, dan menanyakan harga barang di minimarket.',
        desc: 'Dialog percakapan dua arah interaktif yang menguji respon cepat dalam situasi sosial nyata.'
      },
      {
        unit_number: 3,
        title_id: 'Seksi 3: Choukai (Simulasi Audio & Intonasi)',
        title_jp: '聴解（店内放送・アナウンス・短い対話）',
        theme: 'Listening Comprehension',
        icon: '🎧',
        can_do: 'Mampu menyimak pengumuman stasiun, diskon jam tutup toko, dan instruksi sederhana.',
        desc: 'Latihan telinga mendengarkan intonasi alami orang Jepang dengan opsi transkrip bimodal.'
      },
      {
        unit_number: 4,
        title_id: 'Seksi 4: Dokkai (Membaca Teks Pendek, Menu & Papan Pengumuman)',
        title_jp: '読解（看板・メニュー・短い掲示）',
        theme: 'Short Reading',
        can_do: 'Mampu memahami rambu dilarang masuk, jadwal buka toko, dan resep petunjuk mie instan.',
        desc: 'Membaca visual teks autentik yang ditemui di jalanan dan fasilitas umum di Jepang.'
      }
    ]
  },
  {
    trackId: 'curriculum-jft-a2',
    windowVar: 'curriculumJFT_A2',
    level: 'jft-a2',
    title: 'Kurikulum JFT-Basic A2 (Elementary Can-do)',
    units: [
      {
        unit_number: 1,
        title_id: 'Seksi 1: Moji to Goi (Kanji Kehidupan & Kosakata Kerja)',
        title_jp: '文字と語彙（生活漢字と職場語彙）',
        theme: 'Everyday Kanji & Work Vocab',
        icon: '漢字',
        can_do: 'Mampu membaca 100 kanji dasar kehidupan dan kosakata tempat kerja terapan.',
        desc: 'Penguasaan kosakata kerja dan kanji rambu petunjuk keselamatan di lingkungan pabrik dan kota.'
      },
      {
        unit_number: 2,
        title_id: 'Seksi 2: Kaiwa to Hyougen (Permintaan Izin & Alasan)',
        title_jp: '会話と表現（依頼・許可・理由の説明）',
        theme: 'Requests & Explanations',
        can_do: 'Mampu meminta bantuan atasan, menjelaskan alasan keterlambatan, dan membuat janji bertemu.',
        desc: 'Pola kalimat percakapan kompleks yang melibatkan konjugasi bentuk Te, Nai, dan Ta.'
      },
      {
        unit_number: 3,
        title_id: 'Seksi 3: Choukai (Instruksi Kerja & Dialog Multiturn)',
        title_jp: '聴解（作業指示と複数話者の会話）',
        theme: 'Multi-turn Audio',
        can_do: 'Mampu menangkap inti arahan kerja mandor dan perubahan jadwal janji bertemu dari percakapan telepon.',
        desc: 'Simulasi ujian audio mendengarkan dengan opsi jeda intonasi dan kecepatan playback.'
      },
      {
        unit_number: 4,
        title_id: 'Seksi 4: Dokkai (Surat Edaran, Kontrak & Petunjuk Darurat)',
        title_jp: '読解（回覧板・アパート契約書・防災マップ）',
        theme: 'Applied Reading',
        can_do: 'Mampu membaca surat edaran RT (Kairanban), instruksi mitigasi gempa, dan aturan sewa apartemen.',
        desc: 'Kemampuan membaca fungsional untuk bertahan hidup mandiri di lingkungan warga Jepang.'
      }
    ]
  }
];

for (const track of JFT_TRACKS) {
  const units = track.units.map((uDef) => {
    const unitId = `unit-${track.trackId}-${String(uDef.unit_number).padStart(2, '0')}`;
    const lessons = [
      {
        id: `les-${track.trackId}-u${String(uDef.unit_number).padStart(2, '0')}-01`,
        lesson_number: 1,
        title_id: `${uDef.title_id} (Pemahaman Konsep & Kosakata)`,
        title_jp: `${uDef.title_jp}（基礎解説）`,
        desc_id: uDef.desc,
        can_do_statement: uDef.can_do,
        grammar_ids: ['gn5-00001'],
        vocab_ids: ['vg-n5-00990', 'vg-n5-00732'],
        pedagogical_framework: {
          what: {
            summary: uDef.desc,
            canDo: uDef.can_do,
            targetPatterns: ['JFT-Basic Can-do Framework'],
            coreVocabSample: ['基本語彙']
          },
          sensei_context: {
            sceneIntro: `Persiapan resmi menghadapi ujian JFT-Basic untuk sertifikasi pekerja berketerampilan khusus (SSW).`,
            dailyMission: uDef.can_do,
            whyOrder: `JFT-Basic menguji kemampuan komunikasi praktis (Can-do), bukan sekadar menghafal rumus tata bahasa rumit.`
          },
          cultural_notes: {
            title: 'Tips Lolos Ujian JFT-Basic CBT (Computer Based Test)',
            etiquette: 'Jawablah soal listening dengan fokus pada intonasi akhir kalimat (pertanyaan atau persetujuan).',
            taboos: 'Jangan terpaku terlalu lama pada satu soal membaca; waktu total 60 menit harus dibagi cermat.'
          }
        },
        dialogue: [
          {
            id: 'd1',
            speaker: 'Penguji CBT (Audio)',
            speakerRole: 'Sistem JFT-Basic',
            jp: 'これからJFT-Basicの試験を始めます。質問を聞いて、正しい答えを選んでください。',
            furigana: 'これからJFT-Basicのしけんをはじめます。しつもんをきいて、ただしいこたえをえらんでください。',
            romaji: 'Korekara JFT-Basic no shiken wo hajimemasu. Shitsumon wo kiite, tadashii kotae wo erande kudasai.',
            idText: 'Ujian JFT-Basic akan dimulai sekarang. Dengarkan pertanyaan dan pilihlah jawaban yang benar.'
          }
        ],
        drills: [
          {
            id: 'dr1',
            type: 'multiple-choice',
            prompt: `Pada seksi ${uDef.title_id}, apa target kompetensi utama yang dinilai?`,
            options: [
              uDef.can_do,
              'Menulis esai kanji sastra klasik',
              'Menghafal rumus kimia pabrik',
              'Menyanyi lagu anime'
            ],
            correctAnswer: uDef.can_do,
            explanation: 'Setiap bagian JFT-Basic diukur berdasarkan standar deskriptor Can-do JF Standard.'
          }
        ]
      }
    ];

    return {
      unit_number: uDef.unit_number,
      id: unitId,
      level: track.level,
      pt_stage: uDef.unit_number,
      title_id: uDef.title_id,
      title_jp: uDef.title_jp,
      theme: uDef.theme,
      icon: uDef.icon,
      can_do_summary: uDef.can_do,
      grammar_ids: ['gn5-00001'],
      vocab_ids: ['vg-n5-00990'],
      lessons
    };
  });

  const fullData = {
    meta: {
      track_id: track.trackId,
      title: track.title,
      level: track.level,
      version: '1.2.0',
      total_units: units.length,
      authoritative: true
    },
    units
  };

  writeCurriculumFiles(track.trackId, fullData, track.windowVar);
}
console.log('✓ Successfully generated JFT-Basic A1 & A2 tracks.');

// ── 4. COMPILE SEIKATSU NIHONGO (LIVING IN JAPAN) ──────────────
console.log('\nCompiling Living in Japan (Seikatsu Nihongo)...');
const seikatsuUnitsDef = [
  {
    unit_number: 1,
    title_id: 'Unit 1: Shiyakusho & Juminhyo (Prosedur Resmi Balai Kota)',
    title_jp: '市役所での住民登録とマイナンバー',
    theme: 'City Hall & Registration',
    icon: '🏛️',
    can_do: 'Mampu mengurus surat pindah (Juminhyo), mendaftar asuransi kesehatan (Kokumin Kenko Hoken), dan mengambil kartu My Number.',
    desc: 'Langkah pertama yang wajib dilakukan dalam 14 hari pertama kedatangan di Jepang di loket balai kota.'
  },
  {
    unit_number: 2,
    title_id: 'Unit 2: Gomi no Bunbetsu (Aturan Ketat Pemilahan Sampah)',
    title_jp: 'ごみの分別ルールと回収スケジュール',
    theme: 'Waste Sorting & Environment',
    icon: '🗑️',
    can_do: 'Mampu membedakan sampah mudah terbakar (Moeru), tidak terbakar (Moenai), plastik daur ulang (Shigen), dan sampah perabot besar (Sodai Gomi).',
    desc: 'Etika bermasyarakat nomor satu di Jepang untuk menghindari teguran tetangga dan pengurus apartemen.'
  },
  {
    unit_number: 3,
    title_id: 'Unit 3: Sumai & Ginkou (Sewa Apartemen & Rekening Bank Yucho)',
    title_jp: '住まい探し・銀行口座開設・公共料金',
    theme: 'Housing & Banking',
    icon: '🏢',
    can_do: 'Mampu membuka rekening tabungan bank Yucho, memahami tagihan listrik/air/gas, dan membayar di konbini.',
    desc: 'Navigasi finansial mandiri dan kontrak sewa tempat tinggal di Jepang tanpa kendala.'
  },
  {
    unit_number: 4,
    title_id: 'Unit 4: Bousai & Kinkyu (Mitigasi Gempa, Alarm J-Alert & Panggilan Darurat)',
    title_jp: '防災と緊急時の対応（110番・119番・避難所）',
    theme: 'Disaster Safety & Emergency',
    icon: '🚨',
    can_do: 'Mampu merespon bunyi alarm gempa HP (J-Alert), menghubungi 110 (polisi) / 119 (ambulans), dan evakuasi ke Hinanjo.',
    desc: 'Prosedur keselamatan darurat untuk melindungi diri sendiri saat bencana gempa bumi, angin topan, atau kebakaran.'
  }
];

const seikatsuUnits = seikatsuUnitsDef.map((uDef) => {
  const unitId = `unit-curriculum-seikatsu-${String(uDef.unit_number).padStart(2, '0')}`;
  const lessons = [
    {
      id: `les-curriculum-seikatsu-u${String(uDef.unit_number).padStart(2, '0')}-01`,
      lesson_number: 1,
      title_id: `${uDef.title_id} (Prosedur & Kosakata Baku)`,
      title_jp: `${uDef.title_jp}（手続きと必須表現）`,
      desc_id: uDef.desc,
      can_do_statement: uDef.can_do,
      grammar_ids: ['gn5-00001'],
      vocab_ids: ['vg-n5-00990'],
      pedagogical_framework: {
        what: {
          summary: uDef.desc,
          canDo: uDef.can_do,
          targetPatterns: ['Pola Prosedur Layanan Umum'],
          coreVocabSample: ['住民票', '保険証', '分別']
        },
        sensei_context: {
          sceneIntro: `Kamu sedang menjalani kehidupan sehari-hari di Jepang dan harus menyelesaikan urusan ${uDef.title_id}.`,
          dailyMission: uDef.can_do,
          whyOrder: 'Prosedur administrasi dan etika lingkungan adalah kunci kenyamanan hidup rukun bersama warga lokal Jepang.'
        },
        cultural_notes: {
          title: 'Etika & Kebiasaan Sosial Warga Jepang',
          etiquette: 'Selalu siapkan cap nama resmi (Inkan/Hanko), kartu izin tinggal (Zairyu Card), dan paspor di dalam satu map rapi.',
          taboos: 'Jangan membuang sampah di luar jadwal jam buang sampah (biasanya sebelum pukul 08.00 pagi pada hari yang ditentukan).'
        }
      },
      dialogue: [
        {
          id: 'd1',
          speaker: 'Petugas Loket (Madoguchi)',
          speakerRole: 'Staf Balai Kota',
          jp: '在留カードとパスポートをお預かりします。こちらの書類にご記入ください。',
          furigana: 'ざいりゅうカードとパスポートをおあずかりします。こちらのしょるいにごきにゅうください。',
          romaji: 'Zairyuu kaado to pasupooto wo oazukari shimasu. Kochira no shorui ni gokinyuu kudasai.',
          idText: 'Saya pinjam kartu izin tinggal dan paspor Anda. Mohon mengisi formulir dokumen ini.'
        },
        {
          id: 'd2',
          speaker: 'Anda',
          speakerRole: 'Warga Pendatang',
          jp: 'はい、よろしくお願いします。書き方を教えていただけますか。',
          furigana: 'はい、よろしくおねがいします。かきかたをおしえていただけますか。',
          romaji: 'Hai, yoroshiku onegai shimasu. Kakikata wo oshiete itadakemasu ka.',
          idText: 'Baik, terima kasih atas bantuannya. Bisakah tolong ajari cara mengisinya?'
        }
      ],
      drills: [
        {
          id: 'dr1',
          type: 'multiple-choice',
          prompt: `Apa langkah wajib saat mengurus dokumen di ${uDef.title_id}?`,
          options: [
            'Membawa Kartu Izin Tinggal (Zairyu Card) dan paspor',
            'Meninggalkan tas di pinggir jalan',
            'Berteriak di depan loket',
            'Membayar tanpa tanda terima'
          ],
          correctAnswer: 'Membawa Kartu Izin Tinggal (Zairyu Card) dan paspor',
          explanation: 'Zairyu Card dan paspor adalah kartu identitas resmi primer bagi seluruh warga asing di Jepang.'
        }
      ]
    }
  ];

  return {
    unit_number: uDef.unit_number,
    id: unitId,
    level: 'seikatsu',
    pt_stage: uDef.unit_number,
    title_id: uDef.title_id,
    title_jp: uDef.title_jp,
    theme: uDef.theme,
    icon: uDef.icon,
    can_do_summary: uDef.can_do,
    grammar_ids: ['gn5-00001'],
    vocab_ids: ['vg-n5-00990'],
    lessons
  };
});

const seikatsuData = {
  meta: {
    track_id: 'curriculum-seikatsu',
    title: 'Kurikulum Hidup & Bekerja di Jepang (Seikatsu Nihongo)',
    level: 'seikatsu',
    version: '1.2.0',
    total_units: seikatsuUnits.length,
    authoritative: true
  },
  units: seikatsuUnits
};

writeCurriculumFiles('curriculum-seikatsu', seikatsuData, 'curriculumSeikatsu');
console.log('✓ Successfully generated Living in Japan (Seikatsu Nihongo) track.');

console.log('\n════════════════════════════════════════════════════════════');
console.log('✨ All new curriculum tracks compiled successfully into public/data/curriculum/');
console.log('════════════════════════════════════════════════════════════\n');
