// ══════════════════════════════════════════════════════════════════
//  panicScenarioManager.ts — Gemba K3 & Vocational Emergency Scenarios
//  Research Basis: ADR-009, Sakamoto et al. (2014), JNIOSH (2020), SBAR Protocol
//  Powers Panic Simulator (Cover-Recall-Check under 5s/8s pressure)
// ══════════════════════════════════════════════════════════════════

import { JLPTLevel } from '../../types/vocab';
import { PanicScenarioItem } from '../../types/quiz';

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export type VocationalSector =
  | 'kaigo'
  | 'construction'
  | 'manufacturing'
  | 'agriculture'
  | 'fisheries'
  | 'food_processing'
  | 'restaurant'
  | 'forestry'
  | 'building_cleaning'
  | 'automobile'
  | 'aviation'
  | 'machinery'
  | 'electronics'
  | 'shipbuilding'
  | 'accommodation'
  | 'logistics'
  | 'railway'
  | 'timber'
  | 'textile';

export interface VocationalPanicScenario extends PanicScenarioItem {
  sector: VocationalSector;
  riskCategory: 'CRITICAL_SAFETY' | 'MEDICAL_EMERGENCY' | 'ENVIRONMENTAL_DISASTER';
  standardProtocol: string; // e.g. SBAR, LOTO, Heimlich, Williamson
  kanseiUtterance: string;  // Emergency shout / acoustic command
  /** Point-and-Call (指差呼称 / Yubisashi Kosho) Gemba target */
  pointAndCallTarget?: {
    label: string;
    actionPhraseJp: string;
    actionPhraseId: string;
    targetXPercent: number;
    targetYPercent: number;
    touchDurationMs?: number; // 2000ms target hold duration
  };
}

export const CANONICAL_PANIC_SCENARIOS: VocationalPanicScenario[] = [
  // ── KLASTER I: KEPERAWATAN / KAIGO ──
  {
    id: 'panic-kaigo-01',
    sector: 'kaigo',
    riskCategory: 'MEDICAL_EMERGENCY',
    standardProtocol: 'Protokol Tersedak & Panggilan 119 SBAR',
    kanseiUtterance: '看護師さん！詰まりました！ (Kangoshi-san! Tsumarimashita!)',
    situation: 'Pasien lansia tersedak bakso/dango saat makan siang, wajah membiru (sianosis) dan memegang leher.',
    japaneseOutput: '背部叩打法を行います！看護師さん、吸引器をお願いします！',
    romaji: 'Haibu kōdahō o okonaimasu! Kangoshi-san, kyūinki o onegai shimasu!',
    actionChecklist: [
      'Pukul punggung di antara tulang belikat (Haibu kōdahō) dengan telapak tangan kuat-kuat.',
      'Jika pasien sadar, lakukan dorongan perut (Heimlich) atau posisikan miring stabil.',
      'Segera lapor perawat dan siapkan pipa suction (kyūin).',
      'Jika hilang kesadaran, hubungi 119 dan mulai kompresi dada (shinzō massāji).'
    ],
    context: 'Panti Lansia (Tokuyō) · Ruang Makan Siang',
    level: 'n4',
    timeoutSeconds: 5,
  },
  {
    id: 'panic-kaigo-02',
    sector: 'kaigo',
    riskCategory: 'MEDICAL_EMERGENCY',
    standardProtocol: 'Protokol Jatuh Tento & SBAR',
    kanseiUtterance: '大丈夫ですか！動かないで！ (Daijōbu desu ka! Ugokanaide!)',
    situation: 'Pasien jatuh dari tempat tidur ke lantai kamar mandi, mengerang kesakitan di bagian pangkal paha.',
    japaneseOutput: '足を動かさないでください！今、看護師を呼びます！',
    romaji: 'Ashi o ugokasanaide kudasai! Ima, kangoshi o yobimasu!',
    actionChecklist: [
      'Larang pasien bangun sendiri untuk menghindari pergeseran fraktur femur (patah tulang paha).',
      'Cek respon kesadaran dan pernapasan.',
      'Tekan bel darurat (nāsu kōru) dan laporkan posisi jatuh persis.',
      'Catat waktu insiden untuk pembuatan formulir Hiyari-Hatto.'
    ],
    context: 'Kamar Pasien · Samping Tempat Tidur',
    level: 'n4',
    timeoutSeconds: 5,
  },
  {
    id: 'panic-kaigo-03',
    sector: 'kaigo',
    riskCategory: 'CRITICAL_SAFETY',
    standardProtocol: 'De-eskalasi Empati Demensia',
    kanseiUtterance: '落ち着いてください (Ochitsuite kudasai)',
    situation: 'Pasien demensia berat mengalami delusi, mengamuk menolak minum obat dan melempar cangkir air.',
    japaneseOutput: '驚かせてしまい申し訳ありません。少し休みましょう。',
    romaji: 'Odorokasete shimai mōshiwake arimasen. Sukoshi yasumimashō.',
    actionChecklist: [
      'Mundur selangkah, jangan gunakan kekerasan fisik atau membantah kata-katanya.',
      'Gunakan nada suara lembut, sejajarkan kontak mata sedikit di bawah ketinggian pasien.',
      'Ajak staf pendamping kedua untuk keselamatan lingkungan.',
      'Alihkan fokus pembicaraan ke topik kenangan masa lalu yang menyenangkan.'
    ],
    context: 'Ruang Rekreasi Panti · Waktu Minum Obat Sore',
    level: 'n3',
    timeoutSeconds: 8,
  },

  // ── KLASTER II: KONSTRUKSI (JAC) ──
  {
    id: 'panic-jac-01',
    sector: 'construction',
    riskCategory: 'CRITICAL_SAFETY',
    standardProtocol: 'Evakuasi Korban Jatuh & Imobilisasi Leher',
    kanseiUtterance: '危ない！墜落だ！ (Abunai! Tsuiraku da!)',
    situation: 'Rekan kerja jatuh dari perancah lantai 4, tergantung di tali peredam kejut (absorber harness) dalam kondisi lemas.',
    japaneseOutput: '直ちに作業停止！親綱を固定して救助班を呼べ！',
    romaji: 'Tadachini sagyō teishi! Oyazuna o kotei shite kyūjohan o yobe!',
    actionChecklist: [
      'Hentikan seluruh mesin dan derek di area sekitar seketika.',
      'Cegah sindrom trauma suspensi (harness hang syndrome) dengan mempercepat evakuasi tali.',
      'Imobilisasi leher dan tulang belakang saat korban diturunkan ke tanah datar.',
      'Hubungi 119 dengan format SBAR: lokasi proyek, lantai, kondisi napas korban.'
    ],
    context: 'Proyek Gedung Bertingkat · Perancah Luar (Ashiba)',
    level: 'n4',
    timeoutSeconds: 5,
  },
  {
    id: 'panic-jac-02',
    sector: 'construction',
    riskCategory: 'CRITICAL_SAFETY',
    standardProtocol: 'Shoring & Penyelamatan Parit Tertimbun',
    kanseiUtterance: '山崩れだ！逃げろ！ (Yamakuzure da! Nigero!)',
    situation: 'Dinding galian pipa parit ambruk akibat rembesan air, separuh badan pekerja tertimbun tanah berat.',
    japaneseOutput: '二次崩壊に注意！重機を止め、手作業で掘り出せ！',
    romaji: 'Niji hōkai ni chūi! Jūki o tome, te-sagyō de horidase!',
    actionChecklist: [
      'Matikan ekskavator untuk mencegah getaran yang memicu longsor susulan.',
      'Pasang papan shoring pengaman sebelum mendekati titik galian.',
      'Gali timbunan di sekitar dada korban dengan sekop/tangan agar korban bisa bernapas.',
      'Siapkan tabung oksigen darurat dan tandu spinal.'
    ],
    context: 'Galian Pipa Bawah Tanah · Kedalaman 3 Meter',
    level: 'n4',
    timeoutSeconds: 5,
  },
  {
    id: 'panic-jac-03',
    sector: 'construction',
    riskCategory: 'CRITICAL_SAFETY',
    standardProtocol: 'Penyelamatan Sengatan Listrik',
    kanseiUtterance: '触るな！感電だ！ (Sawaruna! Kanden da!)',
    situation: 'Pekerja menyentuh kabel tenaga tinggi sementara tanah basah diguyur hujan, korban kejang menempel pada tiang.',
    japaneseOutput: '主電源を切れ！直接体に触るな！絶縁棒を使え！',
    romaji: 'Shudengen o kire! Chokusetsu karada ni sawaruna! Zetsuenbō o tsukae!',
    actionChecklist: [
      'JANGAN sentuh korban dengan tangan telanjang!',
      'Matikan breaker / sakelar daya utama di panel distribusi dalam radius terdekat.',
      'Gunakan tongkat kayu kering atau pipa PVC isolator untuk melepaskan kontak kabel.',
      'Cek denyut nadi karotis setelah arus terputus total; bersiap RJP.'
    ],
    context: 'Instalasi Listrik Darurat Lapangan Proyek',
    level: 'n4',
    timeoutSeconds: 5,
  },
  {
    id: 'panic-jac-04',
    sector: 'construction',
    riskCategory: 'CRITICAL_SAFETY',
    standardProtocol: 'Zona Eksklusi Radius Derek',
    kanseiUtterance: '頭上注意！逃げろ！ (Zujō chūi! Nigero!)',
    situation: 'Seling pengikat kawat derek terpelintir dan mulai putus saat mengangkat balok baja seberat 2 ton di atas kerumunan pekerja.',
    japaneseOutput: '吊り荷の下から離れろ！クレーン旋回停止！',
    romaji: 'Tsurini no shita kara hanarero! Kurēn senkai teishi!',
    actionChecklist: [
      'Beri komando seruan lantang agar seluruh personil keluar dari radius ayunan crane.',
      'Isyaratkan operator derek untuk menghentikan putaran horizontal seketika.',
      'Pasang barikade tali kuning penanda zona bahaya.',
      'Jangan berada di bawah beban tergantung (tsurini).'
    ],
    context: 'Area Pengangkatan Beban Berat (Tamagake)',
    level: 'n4',
    timeoutSeconds: 5,
  },
  {
    id: 'panic-jac-05',
    sector: 'construction',
    riskCategory: 'CRITICAL_SAFETY',
    standardProtocol: 'Protokol Ruang Terbatas & Gas Asfiksia',
    kanseiUtterance: '入るな！酸欠だ！ (Hairuna! Sanketsu da!)',
    situation: 'Pekerja pingsan seketika saat baru menuruni tangga lubang manhole gorong-gorong sedalam 5 meter.',
    japaneseOutput: '換気ファンを最大に回せ！送気マスクなしで入るな！',
    romaji: 'Kanki fan o saidai ni mawase! Sōki masuku nashi de hairuna!',
    actionChecklist: [
      'Larang rekan kerja melompat masuk menolong tanpa alat bantu pernapasan mandiri (SCBA).',
      'Nyalakan blower suplai udara segar kapasitas tinggi ke dasar lubang.',
      'Lakukan uji multi-sensor kadar oksigen (>18%) dan gas hidrogen sulfida (<10 ppm).',
      'Gunakan tripod katrol penarik (tripod winch) untuk mengangkat korban ke atas.'
    ],
    context: 'Gorong-gorong Bawah Tanah (Manhole)',
    level: 'n3',
    timeoutSeconds: 6,
  },

  // ── KLASTER III: MANUFAKTUR (JAIM) ──
  {
    id: 'panic-jaim-01',
    sector: 'manufacturing',
    riskCategory: 'CRITICAL_SAFETY',
    standardProtocol: 'E-Stop Darurat & LOTO Mesin Cetak',
    kanseiUtterance: '非常停止！手を巻き込まれた！ (Hijō teishi! Te o makikomareta!)',
    situation: 'Sarung tangan operator tersangkut rol penggilas pelat logam putaran tinggi, jari mulai tertarik ke celah mesin.',
    japaneseOutput: '非常停止ボタンを押せ！逆転レバーを引くな！',
    romaji: 'Hijō teishi botan o ose! Gyakuten rebā o hikuna!',
    actionChecklist: [
      'Pukul tombol merah darurat E-Stop besar dengan telapak tangan seketika.',
      'JANGAN putar balik arah mesin secara tiba-tiba karena dapat memperparah kerusakan jaringan tubuh.',
      'Lakukan LOTO (Lock-out/Tag-out) sakelar listrik sebelum tim mekanik membuka celah rol secara manual.',
      'Pasang torniket di atas luka untuk mengendalikan perdarahan masif.'
    ],
    context: 'Pabrik Perakitan Mesin Press & Rol',
    level: 'n4',
    timeoutSeconds: 5,
  },

  // ── KLASTER IV: AGRIKULTUR (MAFF) ──
  {
    id: 'panic-agri-01',
    sector: 'agriculture',
    riskCategory: 'CRITICAL_SAFETY',
    standardProtocol: 'Penyelamatan Traktor Terguling (ROPS)',
    kanseiUtterance: 'トラクターが倒れた！ (Toraktā ga taoreta!)',
    situation: 'Traktor roda empat tergelincir di pematang tanggul sawah yang licin, traktor miring 90 derajat menimpa kaki pengemudi.',
    japaneseOutput: 'エンジンを止めろ！燃料漏れに火気厳禁だ！',
    romaji: 'Enjin o tomero! Nenryō-more ni kaki genkin da!',
    actionChecklist: [
      'Matikan kunci kontak mesin traktor seketika untuk memutus putaran poros PTO.',
      'Pastikan tidak ada bahan pemicu api karena potensi kebocoran bahan bakar solar/bensin.',
      'Topang bodi traktor dengan balok kayu sebelum mendongkrak kaki korban.',
      'Panggil pertolongan warga sekitar dan ambulans 119.'
    ],
    context: 'Lahan Pertanian Basah · Tanggul Pematang',
    level: 'n4',
    timeoutSeconds: 5,
  },
  {
    id: 'panic-agri-02',
    sector: 'agriculture',
    riskCategory: 'MEDICAL_EMERGENCY',
    standardProtocol: 'Dekontaminasi Pestisida & Lembar SDS',
    kanseiUtterance: '農薬を浴びた！ (Nōyaku o abita!)',
    situation: 'Selang semprot pestisida insektisida organofosfat pecah di dalam rumah kaca, cairan pekat menyembur ke mata dan wajah pekerja.',
    japaneseOutput: '大量の水で目を洗え！衣服を脱いで洗い流せ！',
    romaji: 'Tairyō no mizu de me o arae! Ifuku o nuide arainagase!',
    actionChecklist: [
      'Bawa korban keluar ke udara terbuka seketika.',
      'Bilas mata dan kulit dengan air bersih mengalir minimal 15 menit tanpa henti.',
      'Lepas semua pakaian yang terkontaminasi dan bungkus plastik tertutup.',
      'Bawa lembar SDS (Safety Data Sheet) botol pestisida ke instalasi gawat darurat.'
    ],
    context: 'Greenhouse Tomat · Penyemprotan Rutin',
    level: 'n4',
    timeoutSeconds: 5,
  },
  {
    id: 'panic-agri-03',
    sector: 'agriculture',
    riskCategory: 'ENVIRONMENTAL_DISASTER',
    standardProtocol: 'Protokol Karantina Flu Burung HPAI',
    kanseiUtterance: '大量死だ！鳥インフル疑い！ (Tairyōshi da! Tori-infuru utagai!)',
    situation: 'Ditemukan lebih dari 50 ekor ayam petelur mati mendadak dengan jengger membiru di satu blok kandang tertutup.',
    japaneseOutput: '鶏舎を即時封鎖！消毒ゲートを通って家畜保健所に連絡！',
    romaji: 'Keisha o sokuji fūsa! Shōdoku gēto o tōtte kachiku hokenjo ni renraku!',
    actionChecklist: [
      'Karantina total kandang: jangan keluarkan telur, unggas, atau peralatan kotor.',
      'Karyawan wajib melewati bilik disinfeksi desinfektan dan mengganti sepatu bot.',
      'Segera hubungi Pusat Kesehatan Hewan Ternak Pemerintah Daerah (Kachiku Hokenjo).',
      'Pasang papan peringatan larangan masuk untuk pihak luar.'
    ],
    context: 'Peternakan Unggas Komersial · Kandang A',
    level: 'n3',
    timeoutSeconds: 7,
  },

  // ── KLASTER V: PERIKANAN (MAFF) ──
  {
    id: 'panic-fish-01',
    sector: 'fisheries',
    riskCategory: 'CRITICAL_SAFETY',
    standardProtocol: 'Man Overboard (MOB) & Williamson Turn',
    kanseiUtterance: '落水！左舷から人が落ちた！ (Rakusui! Sagen kara hito ga ochita!)',
    situation: 'Ombak besar menghantam kapal di laut lepas bersuhu 4°C, anak buah kapal terlempar ke laut tanpa tali pengaman.',
    japaneseOutput: '浮環を投げろ！見張りは目を離すな！船長、ウィリアムソン旋回を！',
    romaji: 'Fukan o nagero! Mihari wa me o hanasuna! Senchō, Wiriamuson senkai o!',
    actionChecklist: [
      'Lemparkan pelampung cincin (fukan) yang menyala ke arah jatuhnya korban seketika.',
      'Tunjuk satu orang sebagai pengamat (eye-lock) yang tidak boleh melepas pandangan dari korban.',
      'Nakhoda melakukan manuver Williamson untuk memutar balik haluan kapal ke jalur lintasan semula.',
      'Siapkan selimut termal dan ruang hangat untuk penanganan hipotermia mendesak.'
    ],
    context: 'Kapal Penangkap Ikan Cakalang · Samudera Pasifik',
    level: 'n3',
    timeoutSeconds: 5,
  },
  {
    id: 'panic-fish-02',
    sector: 'fisheries',
    riskCategory: 'CRITICAL_SAFETY',
    standardProtocol: 'Pemutusan Hidrolik Line-Hauler',
    kanseiUtterance: 'ドラムを止めろ！腕が巻かれる！ (Doramu o tomero! Ude ga makareru!)',
    situation: 'Lengan baju nelayan tersangkut pada penggulung tali pancing rawai hidrolik berkecepatan tinggi.',
    japaneseOutput: '油圧バルブを閉めろ！ナイフで幹縄を切れ！',
    romaji: 'Yuatsu barubu o shimero! Naifu de mikinawa o kire!',
    actionChecklist: [
      'Tarik tuas pemutus tekanan hidrolik (hydraulic dump valve) seketika.',
      'Gunakan pisau gemba tajam untuk memotong tali induk pengikat sebelum tulang patah.',
      'Jangan menarik paksa tangan korban berlawanan arah putaran drum mesin.',
      'Beri pertolongan pertama hemostatis dan hubungi penjaga pantai (118 Kaiho).'
    ],
    context: 'Dek Belakang Kapal Rawai Tuna (Longline)',
    level: 'n4',
    timeoutSeconds: 5,
  },
  {
    id: 'panic-fish-03',
    sector: 'fisheries',
    riskCategory: 'ENVIRONMENTAL_DISASTER',
    standardProtocol: 'Mitigasi Pasang Merah / Red Tide (Akashio)',
    kanseiUtterance: '赤潮が来た！生簀を沈めろ！ (Akashio ga kita! Ikesu o shizumero!)',
    situation: 'Air laut pelabuhan berubah warna menjadi cokelat kemerahan pekat, ikan kakap di keramba mulai megap-megap di permukaan.',
    japaneseOutput: '給餌を直ちに中止！酸素ポンプを起動し、沈下式生簀を下げろ！',
    romaji: 'Kyūji o tadachini chūshi! Sanso ponpu o kidō shi, chinkashiki ikesu o sagero!',
    actionChecklist: [
      'Segera hentikan seluruh pemberian pakan untuk mencegah pembusukan dan konsumsi oksigen.',
      'Nyalakan aerator pompa oksigen mikro-bubble di dalam keramba.',
      'Tenggelamkan jaring keramba sistem submersible ke lapisan air yang lebih dalam dan bersih.',
      'Lapor ke koperasi perikanan lokal (Gyokyō) untuk pemantauan densitas fitoplankton.'
    ],
    context: 'Budidaya Ikan Keramba Jaring Apung Teluk',
    level: 'n3',
    timeoutSeconds: 7,
  },

  // ── KLASTER VI: INDUSTRI PENGOLAHAN MAKANAN (MAFF) ──
  {
    id: 'panic-food-01',
    sector: 'food_processing',
    riskCategory: 'CRITICAL_SAFETY',
    standardProtocol: 'Karantina Hermetis Autoclave Retort',
    kanseiUtterance: '減圧異常！シール不良だ！ (Gen\'atsu ijō! Shīru furyō da!)',
    situation: 'Tekanan pada mesin autoclave pengemas kaleng turun mendadak di tengah proses sterilisasi panas 121°C.',
    japaneseOutput: '蒸気バルブを閉鎖！当該ロットを全数隔離して検査へ！',
    romaji: 'Jōki barubu o heisa! Tōgai rotto o zensū kakuri shite kensa e!',
    actionChecklist: [
      'Tutup katup uap utama untuk mencegah ledakan bejana bertekanan tinggi.',
      'Pasang label merah "NON-CONFORMING / TAHAN" pada keranjang autoclave.',
      'Karantina seluruh kaleng pada batch nomor produksi tersebut untuk mencegah kontaminasi botulinum.',
      'Laporkan ke kepala kendali mutu (HACCP Quality Assurance).'
    ],
    context: 'Pabrik Pengalengan Makanan · Ruang Sterilisasi Retort',
    level: 'n4',
    timeoutSeconds: 6,
  },
  {
    id: 'panic-food-02',
    sector: 'food_processing',
    riskCategory: 'CRITICAL_SAFETY',
    standardProtocol: 'Prosedur Benda Asing Detektor Logam',
    kanseiUtterance: '警報！金属片混入！ (Keihō! Kinzokuhen konnyū!)',
    situation: 'Alarm detektor logam berbunyi nyaring di konveyor pengemasan nugget, ditemukan ujung pisau filet patah sepanjang 2 mm.',
    japaneseOutput: 'ラインを止めろ！直前30分間の製品をすべて差し押さえろ！',
    romaji: 'Rain o tomero! Chokuzen sanjuppunkan no seihin o subete sashiosaero!',
    actionChecklist: [
      'Tekan tombol penghenti konveyor jalur pengemasan seketika.',
      'Karantina semua produk yang melintas 30 menit ke belakang sejak pisau dilaporkan utuh.',
      'Jalankan pemindaian ulang menggunakan mesin inspeksi X-ray sensitivitas tinggi.',
      'Cocokkan patahan bilah dengan pisau milik operator pemotong daging.'
    ],
    context: 'Jalur Pengemasan Otomatis Makanan Olahan',
    level: 'n4',
    timeoutSeconds: 5,
  },
  {
    id: 'panic-food-03',
    sector: 'food_processing',
    riskCategory: 'MEDICAL_EMERGENCY',
    standardProtocol: 'Protokol Disinfeksi Norovirus Klorin 1000 ppm',
    kanseiUtterance: '嘔吐事故発生！立ち入るな！ (Ōto jiko hassei! Tachiiruna!)',
    situation: 'Karyawan muntah di lantai ruang ganti sebelum pintu airlock area higienis produksi makanan siap saji.',
    japaneseOutput: '半径3メートルを即時封鎖！次亜塩素酸ナトリウム1000ppmを用意！',
    romaji: 'Hankei san mētoru o sokuji fūsa! Jiaensosan natoriumu sen-pīpīemu o yōi!',
    actionChecklist: [
      'Barikade area dengan radius minimal 3 meter seketika agar tidak terinjak.',
      'Gunakan APD lengkap: masker, sarung tangan ganda, apron plastik, penutup sepatu.',
      'Tutup muntahan dengan kertas penyerap yang dibasahi sodium hipoklorit 1.000 ppm.',
      'Karyawan yang muntah wajib dipulangkan dan mengikuti uji PCR/feses sebelum boleh bekerja kembali.'
    ],
    context: 'Pintu Masuk Ruang Produksi Bersih (Zonasi Higiene)',
    level: 'n3',
    timeoutSeconds: 6,
  },

  // ── KLASTER VII: RESTORAN & OMOTENASHI ──
  {
    id: 'panic-resto-01',
    sector: 'restaurant',
    riskCategory: 'CRITICAL_SAFETY',
    standardProtocol: 'Permintaan Maaf Sekkyaku & Ganti Baru',
    kanseiUtterance: '申し訳ございません (Mōshiwake gozaimasen)',
    situation: 'Tamu marah besar menunjukkan sehelai rambut di dalam mangkuk ramen panas yang baru saja dihidangkan.',
    japaneseOutput: '大変失礼いたしました。直ちに新しいものとお取替えいたします。',
    romaji: 'Taihen shitsurei itashimashita. Tadachini atarashī mono to otorikae itashimasu.',
    actionChecklist: [
      'Bungkukkan badan 45 derajat (Saikeirei) dan sampaikan permohonan maaf tulus tanpa mencari alasan.',
      'Tarik mangkuk tersebut dengan kedua tangan dan segera buatkan pesanan baru prioritas utama.',
      'Laporkan ke manajer restoran (*Tenchō*) untuk menyapa langsung ke meja tamu.',
      'Periksa ulang penutup kepala dan jaring rambut seluruh staf dapur.'
    ],
    context: 'Area Meja Tamu Restoran Ramen Sibuk',
    level: 'n4',
    timeoutSeconds: 5,
  },
  {
    id: 'panic-resto-02',
    sector: 'restaurant',
    riskCategory: 'MEDICAL_EMERGENCY',
    standardProtocol: 'Protokol Syok Anafilaksis Alergen',
    kanseiUtterance: '呼吸困難！アレルギー発作だ！ (Kokyū konnan! Arerugī hossa da!)',
    situation: 'Tamu anak mengalami pembengkakan bibir parah, batuk tersengal-sengal dan sesak napas setelah memakan hidangan yang tidak sengaja mengandung soba/kacang.',
    japaneseOutput: '119番をお願いします！エピペンをお持ちですか！足を高く寝かせて！',
    romaji: 'Ichi-ichi-kyū-ban o onegai shimasu! Epipen o omochi desu ka! Ashi o takaku nekasete!',
    actionChecklist: [
      'Minta rekan menelepon 119 ambulans seketika dengan format SBAR dugaan anafilaksis.',
      'Tanyakan ke orang tua apakah membawa suntikan darurat EpiPen dan bantu penggunaannya.',
      'Baringkan anak dengan kaki ditinggikan (posisi syok), jangan paksa duduk atau berdiri.',
      'Amankan sampel makanan yang dikonsumsi untuk diserahkan ke tim medis rumah sakit.'
    ],
    context: 'Restoran Keluarga · Meja Makan Bilik',
    level: 'n3',
    timeoutSeconds: 5,
  },
  {
    id: 'panic-resto-03',
    sector: 'restaurant',
    riskCategory: 'CRITICAL_SAFETY',
    standardProtocol: 'Pemadaman Kebakaran Minyak (APAR Kimia Basah)',
    kanseiUtterance: '火事だ！油が燃えている！ (Kaji da! Abura ga moete iru!)',
    situation: 'Minyak pada penggorengan tempura memanas melampaui titik nyala dan menyemburkan lidah api setinggi 1 meter ke exhaust dapur.',
    japaneseOutput: '水をかけるな！ガスの元栓を閉め、湿った布か消火器を使え！',
    romaji: 'Mizu o kakeruna! Gasu no motosen o shime, shimitta nuno ka shōkaki o tsukae!',
    actionChecklist: [
      'JANGAN PERNAH menyiramkan air ke minyak menyala (bahaya ledakan uap masif boilover)!',
      'Tutup katup suplai gas utama (motosen) seketika.',
      'Tutup wajan dengan tutup logam besar atau selimut basah tebal dari pinggir.',
      'Gunakan APAR khusus dapur kimia basah (Wet Chemical / Kelas K).',
      'Evakuasi seluruh tamu jika asap pekat memenuhi area makan.'
    ],
    context: 'Dapur Panas Restoran · Penggorengan Tempura',
    level: 'n4',
    timeoutSeconds: 5,
    pointAndCallTarget: {
      label: 'Katup Gas Utama',
      actionPhraseJp: 'ガスの元栓、閉鎖ヨシ！',
      actionPhraseId: 'Katup gas utama ditutup, aman!',
      targetXPercent: 50,
      targetYPercent: 75,
      touchDurationMs: 2000,
    },
  },

  // ── KLASTER IX: EKSPANSI K3 T-28 (36 SCENARIOS COMPLETION) ──
  {
    id: 'panic-kaigo-04',
    sector: 'kaigo',
    riskCategory: 'MEDICAL_EMERGENCY',
    standardProtocol: 'Protokol Henti Jantung Lansia & Panggilan AED',
    kanseiUtterance: '呼吸が止まっています！AEDを持ってきてください！ (Kokyū ga tomatte imasu! AED o motte kite kudasai!)',
    situation: 'Lansia tiba-tiba kolaps di lorong panti, denyut nadi karotis tidak teraba dan tidak ada hembusan napas.',
    japaneseOutput: '心臓マッサージを開始します！119番通報とAEDの準備をお願いします！',
    romaji: 'Shinzō massāji o kaishi shimasu! 119-ban tsūhō to AED no junbi o onegai shimasu!',
    actionChecklist: [
      'Panggil bantuan perawat dan teriakkan aktivasi tim darurat.',
      'Segera lakukan kompresi dada 100-120x per menit di tengah dada.',
      'Instruksikan staf lain menghubungi 119 dan membawa unit AED.',
      'Pasang bantalan elektroda AED begitu alat tiba dan ikuti instruksi suara.'
    ],
    context: 'Panti Lansia · Lorong Kamar Istirahat',
    level: 'n4',
    timeoutSeconds: 5,
    pointAndCallTarget: {
      label: 'Titik Kompresi Dada (Sternum)',
      actionPhraseJp: '胸骨圧迫、位置ヨシ！',
      actionPhraseId: 'Titik kompresi sternum, posisi tepat!',
      targetXPercent: 50,
      targetYPercent: 50,
      touchDurationMs: 2000,
    },
  },
  {
    id: 'panic-kaigo-05',
    sector: 'kaigo',
    riskCategory: 'CRITICAL_SAFETY',
    standardProtocol: 'Protokol De-eskalasi Agitasi Akut & Benda Tajam',
    kanseiUtterance: '危ない！ハサミを置いてください！ (Abunai! Hasami o oite kudasai!)',
    situation: 'Pasien demensia stadium lanjut mengalami delirium akut dan mengacungkan gunting perban ke arah perawat.',
    japaneseOutput: '刺激せず距離を取ってください！ゆっくり声をかけてハサミを床に置いてもらいましょう！',
    romaji: 'Shigeki sezu kyori o totte kudasai! Yukkuri koe o kakete hasami o yuka ni oite moraimashō!',
    actionChecklist: [
      'Jaga jarak aman minimal 2 meter dan jangan melakukan konfrontasi fisik langsung.',
      'Bicara dengan nada suara tenang, datar, dan tangan terbuka tampak jelas.',
      'Minta rekan kerja menutup pintu area dan memanggil pimpinan unit medis.',
      'Arahkan pasien secara lembut untuk meletakkan gunting ke atas meja/lantai.'
    ],
    context: 'Panti Lansia · Ruang Perawatan Bersama',
    level: 'n4',
    timeoutSeconds: 5,
    pointAndCallTarget: {
      label: 'Jarak Aman Intervensi',
      actionPhraseJp: '安全距離２メートル、確保ヨシ！',
      actionPhraseId: 'Jarak aman 2 meter, aman!',
      targetXPercent: 50,
      targetYPercent: 60,
      touchDurationMs: 2000,
    },
  },
  {
    id: 'panic-jac-06',
    sector: 'construction',
    riskCategory: 'CRITICAL_SAFETY',
    standardProtocol: 'Protokol Bahaya Kejatuhan Material Derek (Tsurini Rakka)',
    kanseiUtterance: '頭上注意！吊り荷が落ちるぞ！退避！ (Zujō chūi! Tsurini ga ochiru zo! Taihi!)',
    situation: 'Tali sling derek pengangkat balok H-beam meregang putus di ketinggian lantai 4 tepat di atas pekerja bawah.',
    japaneseOutput: '吊り荷の下から今すぐ離れろ！退避エリアへ走れ！',
    romaji: 'Tsurini no shita kara ima sugu hanarero! Taihi eria e hashire!',
    actionChecklist: [
      'Berteriak sekuat tenaga memberi peringatan ke seluruh personel di bawah.',
      'Lari tegak lurus menjauhi proyeksi jatuhnya beban (hazard zone).',
      'Jangan menengadah ke atas terlalu lama; segera berlindung di balik struktur beton kokoh.',
      'Bunyikan sirine darurat proyek untuk menghentikan seluruh aktivitas mesin.'
    ],
    context: 'Proyek Konstruksi Gedung · Area Pengangkatan Derek Kaki Menara',
    level: 'n4',
    timeoutSeconds: 5,
    pointAndCallTarget: {
      label: 'Zona Bebas Beban Derek',
      actionPhraseJp: '吊り荷下立ち入り禁止、ヨシ！',
      actionPhraseId: 'Dilarang masuk bawah beban derek, aman!',
      targetXPercent: 50,
      targetYPercent: 40,
      touchDurationMs: 2000,
    },
  },
  {
    id: 'panic-jaim-02',
    sector: 'manufacturing',
    riskCategory: 'CRITICAL_SAFETY',
    standardProtocol: 'Protokol Kebocoran Bahan Kimia Korosif (Spill Kit & Eye Wash)',
    kanseiUtterance: '薬品流出だ！非常停止を押せ！ (Yakuhin ryūshutsu da! Hijō teishi o ose!)',
    situation: 'Pipa distribusi asam sulfat mengalami retak tekanan tinggi dan menyemprotkan cairan korosif ke lantai dan pakaian operator.',
    japaneseOutput: '非常停止ボタンを押して中和剤を撒け！被災者を緊急シャワーへ連れて行け！',
    romaji: 'Hijō teishi botan o oshite chūwazai o make! Hisaisha o kinkyū shawā e tsurete ike!',
    actionChecklist: [
      'Tekan tombol E-STOP untuk mematikan pompa sirkulasi bahan kimia.',
      'Bawa korban terkena semprotan langsung ke safety shower / eye-wash terdekat, bilas minimal 15 menit.',
      'Gunakan masker respirator gas asam dan sarung tangan neoprena.',
      'Taburkan serbuk penetral / spill kit absorber untuk mengurung genangan asam.'
    ],
    context: 'Pabrik Kimia & Komponen Presisi · Jalur Pelapisan Elektroplating',
    level: 'n4',
    timeoutSeconds: 5,
    pointAndCallTarget: {
      label: 'Tuas Emergency Shower',
      actionPhraseJp: '緊急シャワー流水、ヨシ！',
      actionPhraseId: 'Aliran shower darurat, aman!',
      targetXPercent: 70,
      targetYPercent: 30,
      touchDurationMs: 2000,
    },
  },
  {
    id: 'panic-jaim-03',
    sector: 'manufacturing',
    riskCategory: 'CRITICAL_SAFETY',
    standardProtocol: 'Protokol Kebakaran Listrik Tegangan Tinggi (APAR CO2)',
    kanseiUtterance: '分電盤から出火！ブレーカーを落とせ！ (Bundenban kara shukka! Burēkā o ototose!)',
    situation: 'Panel distribusi daya 400V meletup korsleting kabel dan mengeluarkan asap tebal disertai lidah api menyala.',
    japaneseOutput: '水は絶対に使うな！主電源ブレーカーを遮断し、CO2消火器で初期消火せよ！',
    romaji: 'Mizu wa zettai ni tsukauna! Shudengen burēkā o shadan shi, CO2 shōkaki de shoki shōka seyo!',
    actionChecklist: [
      'Matikan sakelar daya utama jika dapat dijangkau dengan aman.',
      'Gunakan HANYA APAR jenis Karbon Dioksida (CO2) atau Serbuk Kimia Kering Kelas C.',
      'DILARANG KERAS menyemprotkan air ke peralatan bertegangan listrik aktif.',
      'Segera evakuasi area tertutup untuk mencegah sesak napas akibat gas CO2.'
    ],
    context: 'Pabrik Otomotif · Ruang Kontrol Kelistrikan Lini Perakitan',
    level: 'n4',
    timeoutSeconds: 5,
    pointAndCallTarget: {
      label: 'Sakelar Pemutus Sirkuit Utama',
      actionPhraseJp: '主電源遮断、オフ・ヨシ！',
      actionPhraseId: 'Pemutus daya utama mati, aman!',
      targetXPercent: 45,
      targetYPercent: 55,
      touchDurationMs: 2000,
    },
  },
  {
    id: 'panic-jaim-04',
    sector: 'manufacturing',
    riskCategory: 'CRITICAL_SAFETY',
    standardProtocol: 'Protokol Evakuasi Kecelakaan Forklift Terguling',
    kanseiUtterance: 'リフト横転！人が挟まれた！ (Rifuto ōten! Hito ga hasamamareta!)',
    situation: 'Forklift menikung tajam membawa muatan berlebih di jalur licin dan terguling menindih kaki operator.',
    japaneseOutput: 'エンジンを止めろ！ジャッキで車体を浮かせ、担架を用意しろ！',
    romaji: 'Enjin o tomero! Jakki de shatai o ukase, tanka o yōi shiro!',
    actionChecklist: [
      'Matikan kontak mesin forklift seketika untuk mencegah risiko kebakaran bahan bakar.',
      'Jangan menarik paksa korban; gunakan hydraulic jack untuk mengangkat bodi forklift dengan stabil.',
      'Pasang penyangga kayu kokoh di bawah bodi sebelum menolong kaki korban.',
      'Hubungi ambulans 119 dan siapkan tandu darurat.'
    ],
    context: 'Gudang Logistik Pabrik · Jalur Utama Lintasan Forklift',
    level: 'n4',
    timeoutSeconds: 5,
    pointAndCallTarget: {
      label: 'Kunci Kontak Mesin Forklift',
      actionPhraseJp: 'エンジン停止、キルスイッチ・ヨシ！',
      actionPhraseId: 'Mesin mati, sakelar mati aman!',
      targetXPercent: 55,
      targetYPercent: 65,
      touchDurationMs: 2000,
    },
  },
  {
    id: 'panic-jaim-05',
    sector: 'manufacturing',
    riskCategory: 'CRITICAL_SAFETY',
    standardProtocol: 'Protokol Ancaman Ledakan Debu Metalik (Dust Explosion)',
    kanseiUtterance: '集塵機が異常加熱！粉塵爆発の恐れ！ (Shūjinki ga ijō kanetsu! Funjin bakuhatsu no osore!)',
    situation: 'Sistem pengumpul debu aluminium penggilingan pipa bergetar dahsyat dan suhunya melonjak menembus 90°C disertai bau hangus.',
    japaneseOutput: 'グラインダー作業を全停止！ブロワーを切って全員避難ハッチから退避せよ！',
    romaji: 'Guraindā sagyō o zenteishi! Burowā o kitte zen\'in hinan hacchi kara taihi seyo!',
    actionChecklist: [
      'Hentikan seluruh proses pengamplasan dan pemotongan yang menghasilkan percikan api.',
      'Matikan sistem peniup angin (blower) untuk mencegah sirkulasi debu terkonsentrasi.',
      'Jauhi saluran pipa pengumpul debu dan jangan memukul bodi tabung saringan.',
      'Evakuasi seluruh kru pabrik keluar radius 50 meter melalui pintu darurat.'
    ],
    context: 'Pabrik Logam Ringan · Bengkel Pemolesan Profil Aluminium',
    level: 'n4',
    timeoutSeconds: 5,
    pointAndCallTarget: {
      label: 'Tombol Stop Blower Blower',
      actionPhraseJp: '集塵ブロワー緊急停止、ヨシ！',
      actionPhraseId: 'Blower pengumpul debu berhenti darurat, aman!',
      targetXPercent: 60,
      targetYPercent: 40,
      touchDurationMs: 2000,
    },
  },
  {
    id: 'panic-agri-04',
    sector: 'agriculture',
    riskCategory: 'CRITICAL_SAFETY',
    standardProtocol: 'Protokol Terbelit Mesin Pencacah Gabah (Combine Harvester)',
    kanseiUtterance: '手が巻き込まれた！機械を止めろ！ (Te ga makikomareta! Kikai o tomero!)',
    situation: 'Tangan petani tersangkut puli pengumpan gabah saat membersihkan jerami yang menyumbat tanpa mematikan mesin pemanen.',
    japaneseOutput: '緊急停止バーを引け！主クラッチを切り、腕を無理に引っ張るな！',
    romaji: 'Kinkyū teishi bā o hike! Shu kuracchi o kiri, ude o muri ni hipparuna!',
    actionChecklist: [
      'Tarik tuas emergency stop bar / matikan kopling utama (shu kuracchi) mesin pemanen.',
      'JANGAN menarik paksa lengan yang terjepit karena berisiko amputasi jaringan.',
      'Putar puli pembalik secara manual dengan kunci pas untuk melonggarkan jepitan.',
      'Pasang balut tekan di atas titik perdarahan dan segera telepon 119.'
    ],
    context: 'Lahan Pertanian Padi · Sawah Musim Panen Raya',
    level: 'n4',
    timeoutSeconds: 5,
    pointAndCallTarget: {
      label: 'Tuas Kopling Utama Mesin',
      actionPhraseJp: '主クラッチ解放、切・ヨシ！',
      actionPhraseId: 'Kopling utama dilepas, posisi mati aman!',
      targetXPercent: 50,
      targetYPercent: 60,
      touchDurationMs: 2000,
    },
  },
  {
    id: 'panic-fish-04',
    sector: 'fisheries',
    riskCategory: 'CRITICAL_SAFETY',
    standardProtocol: 'Protokol Keracunan Gas Amonia Palka Kapal Ikan (Gyosō)',
    kanseiUtterance: '魚倉でアンモニア漏れ！上に上がれ！ (Gyosō de anmonia more! Ue ni agare!)',
    situation: 'Pipa refrigerant di palka pembeku ikan bocor; udara di ruang bawah kapal berbau menyengat menusuk mata dan tenggorokan.',
    japaneseOutput: '息を止めて甲板へ脱出しろ！送風機を回し、空気呼吸器なしで絶対に入るな！',
    romaji: 'Iki o tomete kanpan e dasshutsu shiro! Sōfūki o mawashi, kūki kokyūki nashi de zettai ni hairuna!',
    actionChecklist: [
      'Tutup hidung dan mulut dengan kain basah, segera panjat tangga palka ke geladak atas.',
      'Nyalakan blower ventilasi kapal untuk membuang akumulasi gas amonia.',
      'Dilarang keras turun kembali tanpa perlengkapan Self-Contained Breathing Apparatus (SCBA).',
      'Lapor nakhoda kapal untuk membunyikan lonceng darurat evakuasi lambung kapal.'
    ],
    context: 'Kapal Ikan Tangkap Laut Dalam · Ruang Palka Pembekuan Cepat',
    level: 'n4',
    timeoutSeconds: 5,
    pointAndCallTarget: {
      label: 'Pintu Palka Menuju Geladak',
      actionPhraseJp: '脱出ハッチ開放、退避ヨシ！',
      actionPhraseId: 'Pintu palka dibuka, evakuasi aman!',
      targetXPercent: 50,
      targetYPercent: 20,
      touchDurationMs: 2000,
    },
  },
  {
    id: 'panic-food-04',
    sector: 'food_processing',
    riskCategory: 'CRITICAL_SAFETY',
    standardProtocol: 'Protokol Kontaminasi Pecahan Logam/Kaca Konveyor Makanan',
    kanseiUtterance: 'ライン上で瓶が破裂！破片混入！ (Rain-jō de bin ga haretsu! Hahen konnyū!)',
    situation: 'Botol saus kaca pecah berhamburan di atas konveyor pengemasan terbuka saat botol-botol berjalan berkecepatan tinggi.',
    japaneseOutput: 'ライン停止ボタンを押せ！破裂地点の前後５メートルの製品をすべて廃棄隔離しろ！',
    romaji: 'Rain teishi botan o ose! Haretsu chiten no zengo go-mētoru no seihin o subete haiki kakuri shiro!',
    actionChecklist: [
      'Segera tekan tombol STOP darurat lini konveyor kemasan.',
      'Beri tanda isolasi merah pada produk 5 meter ke depan dan ke belakang titik pecahan.',
      'Jangan membersihkan pecahan kaca dengan tangan kosong; gunakan sikat khusus dan vacuum HEPA.',
      'Lakukan uji detektor logam/x-ray ulang sebelum lini produksi diizinkan menyala kembali.'
    ],
    context: 'Pabrik Pengolahan Makanan · Lini Pengisian dan Pembotolan Saus',
    level: 'n4',
    timeoutSeconds: 5,
    pointAndCallTarget: {
      label: 'Tombol Stop Darurat Lini Konveyor',
      actionPhraseJp: '製造ライン非常停止、ヨシ！',
      actionPhraseId: 'Lini produksi berhenti darurat, aman!',
      targetXPercent: 65,
      targetYPercent: 45,
      touchDurationMs: 2000,
    },
  },
  {
    id: 'panic-resto-04',
    sector: 'restaurant',
    riskCategory: 'CRITICAL_SAFETY',
    standardProtocol: 'Protokol Keracunan Karbon Monoksida Ruang Pencuci Piring',
    kanseiUtterance: 'ガスが充満している！目が眩む！ (Gasu ga jūman shite iru! Me ga kuramu!)',
    situation: 'Boiler air panas dapur mengalami pembakaran tidak sempurna di ruang pencuci piring tanpa ventilasi; staf lemas dan pusing.',
    japaneseOutput: '換気扇を全開にしろ！ボイラーを止め、倒れた仲間を風通しの良い屋外へ運べ！',
    romaji: 'Kankisen o zenkai ni shiro! Boirā o tome, taoreta nakama o kazetōshi no yoi okugai e hakobe!',
    actionChecklist: [
      'Segera matikan katup gas boiler pemanas air dapur.',
      'Buka seluruh pintu darurat dan putar tombol exhaust fan ke kecepatan maksimal.',
      'Pindahkan rekan kerja yang lemas ke udara terbuka di luar bangunan restoran.',
      'Panggil ambulans 119 dan berikan oksigen murni jika ada petugas terlatih.'
    ],
    context: 'Restoran Masakan Jepang · Ruang Cuci Piring Tertutup (Dishwashing)',
    level: 'n4',
    timeoutSeconds: 5,
    pointAndCallTarget: {
      label: 'Tuas Sakelar Exhaust Fan',
      actionPhraseJp: '排気ファン全開、換気ヨシ！',
      actionPhraseId: 'Kipas exhaust menyala penuh, ventilasi aman!',
      targetXPercent: 40,
      targetYPercent: 30,
      touchDurationMs: 2000,
    },
  },
  {
    id: 'panic-forest-01',
    sector: 'forestry',
    riskCategory: 'CRITICAL_SAFETY',
    standardProtocol: 'Protokol Tendangan Balik Gergaji Mesin (Chainsaw Kickback)',
    kanseiUtterance: 'キックバックだ！大出血！止血帯！ (Kikkubakku da! Daishukketsu! Shiketsutai!)',
    situation: 'Ujung bilah gergaji mesin membentur simpul kayu keras dan terpental ke belakang, menyayat paha kiri operator.',
    japaneseOutput: 'チェーンソーのエンジンを切れ！大腿部を止血帯で縛り上げ、ドクターヘリを呼べ！',
    romaji: 'Chēnsō no enjin o kire! Daitaibu o shiketsutai de shibariage, dokutāheri o yobe!',
    actionChecklist: [
      'Kunci rem rantai gergaji (chain brake) dan matikan sakelar mesin seketika.',
      'Pasang tourniquet / torniket hemostatik darurat di atas luka paha, putar tongkat pengencang kuat-kuat.',
      'Tulis waktu pemasangan tourniquet di dahi korban.',
      'Minta pimpinan regu menghubungi helikopter ambulans darurat (Doctor Heli) dengan koordinat GPS.'
    ],
    context: 'Hutan Produksi Kayu Cedar · Lereng Tebang Punggung Bukit',
    level: 'n4',
    timeoutSeconds: 5,
    pointAndCallTarget: {
      label: 'Tuas Rem Rantai Gergaji (Chain Brake)',
      actionPhraseJp: 'チェーンブレーキ作動、停止ヨシ！',
      actionPhraseId: 'Rem rantai aktif, berhenti aman!',
      targetXPercent: 50,
      targetYPercent: 50,
      touchDurationMs: 2000,
    },
  },
  {
    id: 'panic-forest-02',
    sector: 'forestry',
    riskCategory: 'CRITICAL_SAFETY',
    standardProtocol: 'Protokol Pohon Tumbang Anomali Arah (Tōboku Ijou)',
    kanseiUtterance: '倒木方向異常！退避路へ走れ！ (Tōboku hōkō ijō! Taihiro e hashire!)',
    situation: 'Pohon pinus raksasa setinggi 30 meter terbelah di pangkal akibat hembusan angin mendadak dan tumbang berlawanan dengan takik rebah.',
    japaneseOutput: '伐採木の真後ろに逃げるな！45度斜め後方の退避路へ全力で走れ！',
    romaji: 'Bassaiki no maushiro ni nigeruna! 45-do naname kōhō no taihiro e zenryoku de hashire!',
    actionChecklist: [
      'Segera lepaskan pegangan chainsaw dan jangan berusaha menyelamatkan alat.',
      'Lari menuju jalur evakuasi yang sudah dibuka di sudut 45 derajat miring ke belakang pohon.',
      'Dilarang keras lari lurus ke belakang pangkal pohon (bahaya hentakan kickback pangkal kayu).',
      'Teriakkan peringatan darurat ke operator traktor tarik di lereng bawah.'
    ],
    context: 'Kawasan Penebangan Kayu Hutan Lindung · Lereng Curam 35 Derajat',
    level: 'n4',
    timeoutSeconds: 5,
    pointAndCallTarget: {
      label: 'Rambu Jalur Evakuasi 45 Derajat',
      actionPhraseJp: '４５度斜め退避路、確保ヨシ！',
      actionPhraseId: 'Jalur evakuasi miring 45 derajat, aman!',
      targetXPercent: 30,
      targetYPercent: 70,
      touchDurationMs: 2000,
    },
  },
  {
    id: 'panic-forest-03',
    sector: 'forestry',
    riskCategory: 'MEDICAL_EMERGENCY',
    standardProtocol: 'Protokol Serangan Tawon Vespa Raksasa (Suzumebachi)',
    kanseiUtterance: 'スズメバチだ！手で払うな！伏せろ！ (Suzumebachi da! Te de harauna! Fusero!)',
    situation: 'Ujung dahan pohon membentur sarang tawon vespa tanah; puluhan tawon raksasa mendengung agresif menyerang regu tebang.',
    japaneseOutput: '走って逃げるな、姿勢を低くして静かに後退しろ！刺されたらすぐエピペンを打て！',
    romaji: 'Hashitte nigeruna, shisei o hikuku shite shizuka ni kōtai shiro! Sasaretara sugu epipen o ute!',
    actionChecklist: [
      'Dilarang mengayunkan tangan atau berteriak histeris (memicu feromon serangan lebah).',
      'Merunduk serendah mungkin dan mundur perlahan keluar radius 20 meter dari sarang.',
      'Bila ada anggota regu yang disengat dan sesak napas, segera suntikkan EpiPen ke paha luar.',
      'Segera bawa korban ke rumah sakit sebelum terjadi syok anafilaktik.'
    ],
    context: 'Area Perhutanan Pegunungan · Jalur Penebangan Vegetasi Bawah',
    level: 'n4',
    timeoutSeconds: 5,
    pointAndCallTarget: {
      label: 'Kotak Injektor EpiPen Otomatis',
      actionPhraseJp: 'エピペン携帯、確認ヨシ！',
      actionPhraseId: 'Injektor EpiPen siap dibawa, aman!',
      targetXPercent: 70,
      targetYPercent: 60,
      touchDurationMs: 2000,
    },
  },
  {
    id: 'panic-forest-04',
    sector: 'forestry',
    riskCategory: 'ENVIRONMENTAL_DISASTER',
    standardProtocol: 'Protokol Tanah Longsor Lereng Tebang Hutan (Dosha Kuzure)',
    kanseiUtterance: '山が崩れるぞ！尾根へ逃げろ！ (Yama ga kuzureru zo! One e nigero!)',
    situation: 'Hujan deras semalam memicu retakan tanah selebar 20 cm di lereng atas traktor penarik kayu dan tebing mulai merosot.',
    japaneseOutput: '重機を捨てて高台の尾根へ登れ！谷底の作業道には絶対に下りるな！',
    romaji: 'Jūki o sutete takadai no one e nobore! Tanisoko no sagyōdō ni wa zettai ni oriruna!',
    actionChecklist: [
      'Segera tinggalkan kabin alat berat eskavator/skidder dan jangan buang waktu memutar balik armada.',
      'Lari mendaki menuju punggung bukit (ridge/one) yang bertanah padat dan berbatu.',
      'DILARANG KERAS lari menuruni jurang atau menyusuri alur lembah air.',
      'Gunakan peluit darurat untuk memastikan seluruh personel regu berkumpul di titik aman puncak.'
    ],
    context: 'Operasi Pembalakan Lereng Pegunungan Tinggi · Jalur Skidder Kayu',
    level: 'n4',
    timeoutSeconds: 5,
    pointAndCallTarget: {
      label: 'Titik Kumpul Darurat Punggung Bukit',
      actionPhraseJp: '尾根高台避難場所、ヨシ！',
      actionPhraseId: 'Titik evakuasi punggung bukit, aman!',
      targetXPercent: 50,
      targetYPercent: 15,
      touchDurationMs: 2000,
    },
  },

  // ── KLASTER IX: PEMBERSIHAN GEDUNG (BUILDING CLEANING) ──
  {
    id: 'panic-cleaning-01',
    sector: 'building_cleaning',
    riskCategory: 'CRITICAL_SAFETY',
    standardProtocol: 'Protokol Bilas Mata Darurat Bahan Kimia Klorin (Sen\'gan)',
    kanseiUtterance: '目を洗え！水で流し続けろ！ (Me o arae! Mizu de nagashitsuzukero!)',
    situation: 'Percikan cairan pembersih asam kuat klorin mengenai mata pekerja saat mengoplos disinfektan toilet.',
    japaneseOutput: '目をこすらないで流水で15分間洗い流せ！救急箱の洗眼器を持ってこい！',
    romaji: 'Me o kosuranaide ryūsui de jūgofun-kan arainagase! Kyūkyūbako no sengan-ki o motte koi!',
    actionChecklist: [
      'Jangan mengucek mata yang terkena bahan kimia agar kornea tidak robek.',
      'Bilas mata langsung di bawah air mengalir minimal 15 menit tanpa henti.',
      'Ambil alat pencuci mata darurat (eyewash station) dan laporkan ke penyelia.',
      'Bawa botol label zat kimia asli ke klinik mata terdekat.'
    ],
    context: 'Gedung Perkantoran Shinjuku · Ruang Janitor Penyimpanan Kimia',
    level: 'n4',
    timeoutSeconds: 5,
    pointAndCallTarget: {
      label: 'Kran Air Bilas Darurat',
      actionPhraseJp: '流水洗眼装置、ヨシ！',
      actionPhraseId: 'Alat bilas mata darurat, aman!',
      targetXPercent: 50,
      targetYPercent: 30,
      touchDurationMs: 2000,
    },
  },
  {
    id: 'panic-cleaning-02',
    sector: 'building_cleaning',
    riskCategory: 'CRITICAL_SAFETY',
    standardProtocol: 'Protokol Gondola Miring Ketinggian (Gondora Teishi)',
    kanseiUtterance: '動くな！命綱を掴め！ (Ugokuna! Inochizuna o tsukame!)',
    situation: 'Kabel sling gondola pembersih kaca lantai 15 tersangkut dan membuat keranjang miring 40 derajat di ketinggian 50 meter.',
    japaneseOutput: 'フルハーネスを親綱に掛け直せ！非常停止ボタンを押して救助を待て！',
    romaji: 'Furu hānesu o oyazuna ni kakenaose! Hijō teishi botan o oshite kyūjo o mate!',
    actionChecklist: [
      'Kaitkan kait ganda full harness ke tali pengaman independen (oyazuna).',
      'Tekan tombol darurat gondola untuk mengunci motor derek hoist.',
      'Jangan mencoba meloncat ke balkon atau memanjat kerangka gondola.',
      'Hubungi ruang kendali gedung lewat interkom darurat.'
    ],
    context: 'Gedung Pencakar Langit Roppongi · Dinding Kaca Eksterior Lantai 15',
    level: 'n4',
    timeoutSeconds: 5,
    pointAndCallTarget: {
      label: 'Tombol Darurat Gondola',
      actionPhraseJp: 'ゴンドラ非常停止、ヨシ！',
      actionPhraseId: 'Stop darurat gondola, aman!',
      targetXPercent: 80,
      targetYPercent: 60,
      touchDurationMs: 2000,
    },
  },

  // ── KLASTER X: PERAWATAN OTOMOTIF (AUTOMOBILE MAINTENANCE) ──
  {
    id: 'panic-auto-01',
    sector: 'automobile',
    riskCategory: 'CRITICAL_SAFETY',
    standardProtocol: 'Protokol Dongkrak Hidrolik Anjlok (Rifuto Kōka)',
    kanseiUtterance: '車の下から出ろ！危ない！ (Kuruma no shita kara dero! Abunai!)',
    situation: 'Penyangga dongkrak hidrolik berderit retak saat mekanik berada di kolong mobil van 2.5 ton.',
    japaneseOutput: '今すぐリフトの下から這い出ろ！安全ロックが外れている！',
    romaji: 'Ima sugu rifuto no shita kara haidero! Anzen rokku ga hazurete iru!',
    actionChecklist: [
      'Segera merayap keluar dari bawah kolong kendaraan tanpa memikirkan peralatan.',
      'Pastikan pengunci mekanis (safety lock tooth) terpasang sebelum bekerja di bawah lift.',
      'Pasang balok kayu pengganjal darurat di bawah roda.',
      'Tarik tuas penurun darurat hanya jika kolong sudah steril dari personel.'
    ],
    context: 'Bengkel Servis Dealer Mobil · Kolong Pit Lift 2 Tiang',
    level: 'n4',
    timeoutSeconds: 5,
    pointAndCallTarget: {
      label: 'Pengunci Mekanis Lift',
      actionPhraseJp: 'リフト安全ロック爪、ヨシ！',
      actionPhraseId: 'Kait pengunci lift, aman!',
      targetXPercent: 30,
      targetYPercent: 50,
      touchDurationMs: 2000,
    },
  },
  {
    id: 'panic-auto-02',
    sector: 'automobile',
    riskCategory: 'CRITICAL_SAFETY',
    standardProtocol: 'Protokol Kebakaran Uap Bensin (Kasaiboushi)',
    kanseiUtterance: '火事だ！消火器を持ってこい！ (Kaji da! Shōkaki o motte koi!)',
    situation: 'Percikan gerinda menyambar uap bensin saat tangki bahan bakar mobil diturunkan ke lantai servis.',
    japaneseOutput: '電源を遮断しろ！泡消火器で根元から吹き付けろ！水は絶対に掛けるな！',
    romaji: 'Dengen o shadan shiro! Awa shōkaki de nemoto kara fukitsukero! Mizu wa zettai ni kakeruna!',
    actionChecklist: [
      'DILARANG menyiramkan air ke kebakaran minyak atau bensin karena api akan menyebar.',
      'Gunakan alat pemadam api busa atau serbuk kimia kering (ABC dry powder).',
      'Arahkan corong pemadam ke titik pangkal api dengan gerakan menyapu.',
      'Tekan tombol alarm kebakaran gedung dan evakuasi tabung gas oksigen/asetilen.'
    ],
    context: 'Bengkel Cat & Reparasi Bodi · Ruang Kuras Tangki BBM',
    level: 'n4',
    timeoutSeconds: 5,
    pointAndCallTarget: {
      label: 'Tabung Pemadam Busa Kimia',
      actionPhraseJp: 'ABC粉末消火器、ヨシ！',
      actionPhraseId: 'Tabung APAR busa, aman!',
      targetXPercent: 70,
      targetYPercent: 75,
      touchDurationMs: 2000,
    },
  },

  // ── KLASTER XI: LAYANAN BANDARA (AVIATION GROUND HANDLING) ──
  {
    id: 'panic-aviation-01',
    sector: 'aviation',
    riskCategory: 'CRITICAL_SAFETY',
    standardProtocol: 'Protokol Bahaya Hisap Turbin Jet (Enjin Suikomi Boushi)',
    kanseiUtterance: 'エンジンから離れろ！退避！ (Enjin kara hanarero! Taihi!)',
    situation: 'Mesin jet Boeing 787 mendadak uji putaran tinggi saat staf apron berada 4 meter di depan corong mesin intake.',
    japaneseOutput: 'インテークの吸い込み危険区域から直ちに横方向へ退避しろ！',
    romaji: 'Intēku no suikomi kiken kuiki kara tadachini yoko hōkō e taihi shiro!',
    actionChecklist: [
      'Segera lari tegak lurus menyamping keluar dari zona bahaya hisap 7.5 meter di depan mesin.',
      'Pegang helm pelindung telinga agar tidak tersedot masuk ke baling-baling bilah turbin.',
      'Beri isyarat silang tangan darurat kepada kapten pilot di kokpit.',
      'Matikan mesin kendaraan ground support equipment di dekat apron.'
    ],
    context: 'Bandara Internasional Haneda · Apron Stand Parkir Pesawat No. 42',
    level: 'n4',
    timeoutSeconds: 5,
    pointAndCallTarget: {
      label: 'Zona Aman Samping Garis Apron',
      actionPhraseJp: 'エンジン危険境界外、ヨシ！',
      actionPhraseId: 'Di luar zona bahaya mesin, aman!',
      targetXPercent: 15,
      targetYPercent: 80,
      touchDurationMs: 2000,
    },
  },
  {
    id: 'panic-aviation-02',
    sector: 'aviation',
    riskCategory: 'CRITICAL_SAFETY',
    standardProtocol: 'Protokol Kereta Kargo Apron Licin Salju (Towing Kiken)',
    kanseiUtterance: 'ブレーキを踏め！スリップだ！ (Burēki o fume! Surippu da!)',
    situation: 'Traktor penarik gerobak kontainer bagasi meluncur tak terkendali di atas permukaan es licin apron bandara.',
    japaneseOutput: 'ハンドルを切るな！ポンピングブレーキで減速して退避帯へ入れ！',
    romaji: 'Handoru o kiruna! Ponpingu burēki de gensoku shite taihitai e ire!',
    actionChecklist: [
      'Jangan membanting setir secara mendadak agar gerobak kontainer tidak terlipat (jackknife).',
      'Injak rem secara berulang perlahan untuk mendapatkan cengkeraman ban salju.',
      'Bunyikan klakson panjang untuk memperingatkan staf pengatur lalu lintas apron.',
      'Arahkan armada ke gundukan salju buatan tepi apron jika rem tidak mencengkeram.'
    ],
    context: 'Bandara New Chitose Hokkaido · Jalur Traksi Apron Bersalju',
    level: 'n4',
    timeoutSeconds: 5,
    pointAndCallTarget: {
      label: 'Tuas Rem Darurat Traktor',
      actionPhraseJp: '非常ブレーキレバー、ヨシ！',
      actionPhraseId: 'Tuas rem darurat traktor, aman!',
      targetXPercent: 55,
      targetYPercent: 65,
      touchDurationMs: 2000,
    },
  },

  // ── KLASTER XII: PERMESINAN INDUSTRI (INDUSTRIAL MACHINERY) ──
  {
    id: 'panic-machinery-01',
    sector: 'machinery',
    riskCategory: 'CRITICAL_SAFETY',
    standardProtocol: 'Protokol Terbelit Mesin Bubut Lathe (Makikomi Boushi)',
    kanseiUtterance: '非常停止を押せ！手が挟まった！ (Hijō teishi o ose! Te ga hasamatta!)',
    situation: 'Lengan baju operator tersangkut di as spindle mesin bubut CNC yang berputar cepat.',
    japaneseOutput: '足踏み非常停止スイッチを蹴れ！主電源ブレーカーを落とせ！',
    romaji: 'Ashibumi hijō teishi suitchi o kere! Shudengen burēkā o otose!',
    actionChecklist: [
      'Segera injak pedal darurat di bawah mesin atau tekan tombol stop merah berbentuk jamur.',
      'DILARANG MENARIK tangan dengan paksa selagi chuck berputar.',
      'Putus sakelar daya utama mesin untuk mencegah restart otomatis.',
      'Periksa perdarahan dan hubungi tim pertolongan pertama K3 pabrik.'
    ],
    context: 'Pabrik Komponen Presisi Ota-ku · Ruang Mesin Bubut CNC',
    level: 'n4',
    timeoutSeconds: 5,
    pointAndCallTarget: {
      label: 'Pedal Kaki Stop Darurat',
      actionPhraseJp: '足踏み非常停止バー、ヨシ！',
      actionPhraseId: 'Pedal stop darurat kaki, aman!',
      targetXPercent: 40,
      targetYPercent: 90,
      touchDurationMs: 2000,
    },
  },
  {
    id: 'panic-machinery-02',
    sector: 'machinery',
    riskCategory: 'CRITICAL_SAFETY',
    standardProtocol: 'Protokol Kebocoran Oli Hidrolik Tekanan Tinggi (Kōatsu Yatsu)',
    kanseiUtterance: '触るな！高圧油が吹き出している！ (Sawaruna! Kōatsuyu ga fukidashite iru!)',
    situation: 'Selang mesin pres hidrolik 200 bar robek seukuran jarum dan menyemburkan fluida berkecepatan peluru.',
    japaneseOutput: '手で穴を塞ぐな！油圧ポンプを止めて圧力を抜け！',
    romaji: 'Te de ana o fusaguna! Yuatsu ponpu o tomete atsuryoku o nuke!',
    actionChecklist: [
      'DILARANG KERAS menyentuh semburan minyak karena dapat menembus kulit (hydraulic injection injury).',
      'Matikan pompa daya hidrolik dan buka katup pelepas tekanan tangki reservoir.',
      'Pasang barikade peringatan di sekitar genangan minyak pelumas.',
      'Segera ke UGD jika ada anggota tubuh yang terpapar semburan meski tidak tampak luka luar.'
    ],
    context: 'Lantai Fabrikasi Mesin Cetak Logam · Stasiun Pres Hidrolik',
    level: 'n4',
    timeoutSeconds: 5,
    pointAndCallTarget: {
      label: 'Katup Pelepas Tekanan Hidrolik',
      actionPhraseJp: '油圧解放バルブ、ヨシ！',
      actionPhraseId: 'Katup pelepas tekanan oli, aman!',
      targetXPercent: 85,
      targetYPercent: 40,
      touchDurationMs: 2000,
    },
  },

  // ── KLASTER XIII: ELEKTRIK & ELEKTRONIK (ELECTRIC & ELECTRONICS) ──
  {
    id: 'panic-elec-01',
    sector: 'electronics',
    riskCategory: 'CRITICAL_SAFETY',
    standardProtocol: 'Protokol Sengatan Listrik Tegangan Tinggi (Kanden Boushi)',
    kanseiUtterance: '触るな！感電している！ (Sawaruna! Kanden shite iru!)',
    situation: 'Teknisi uji PCB tersengat arus bocor 400V dan kaku menempel pada rel konduktor tembaga panel.',
    japaneseOutput: '素手で触るな！絶縁棒で引き離して主ブレーカーを落とせ！',
    romaji: 'Sudede sawaruna! Zetsuen-bō de hikihanashite shu-burēkā o otose!',
    actionChecklist: [
      'DILARANG menyentuh tubuh korban dengan tangan telanjang agar tidak ikut tersengat.',
      'Gunakan tongkat kayu kering atau bahan isolator untuk melepaskan korban dari sumber arus.',
      'Turunkan sakelar pemutus daya utama (circuit breaker) segera.',
      'Lakukan pijat jantung RJP dan siapkan alat defibrilator AED.'
    ],
    context: 'Laboratorium Uji Panel Daya Tenaga Surya · Rak Rakitan Inverter',
    level: 'n4',
    timeoutSeconds: 5,
    pointAndCallTarget: {
      label: 'Tuas Sakelar Induk Pemutus Daya',
      actionPhraseJp: '高圧主ブレーカー遮断、ヨシ！',
      actionPhraseId: 'Pemutus daya tegangan tinggi, aman!',
      targetXPercent: 20,
      targetYPercent: 35,
      touchDurationMs: 2000,
    },
  },
  {
    id: 'panic-elec-02',
    sector: 'electronics',
    riskCategory: 'CRITICAL_SAFETY',
    standardProtocol: 'Protokol Thermal Runaway Baterai Lithium (Ritan Kasai)',
    kanseiUtterance: 'バッテリーが膨らんでいる！離れろ！ (Batterī ga fukurande iru! Hanarero!)',
    situation: 'Modul baterai lithium pada jalur perakitan mendadak berasap putih pekat dan menggelembung panas.',
    japaneseOutput: '水は掛けるな！防火砂を被せて金属製密閉缶に隔離しろ！',
    romaji: 'Mizu wa kakeruna! Bōka-suna o kabusete kinzoku-sei mippei-kan ni kakuri shiro!',
    actionChecklist: [
      'Jauhi ruangan karena asap baterai mengandung gas asam fluorida (HF) yang sangat mematikan.',
      'Timbun modul dengan pasir kering khusus kebakaran logam (Kelas D).',
      'Pindahkan baterai ke dalam drum logam pengaman berpencegah percikan.',
      'Nyalakan sistem ventilasi pembuang asap darurat ke luar gedung.'
    ],
    context: 'Lini Perakitan Baterai Mobil Listrik (EV) · Ruang Uji Pengisian Cepat',
    level: 'n4',
    timeoutSeconds: 5,
    pointAndCallTarget: {
      label: 'Ember Pasir Khusus Kebakaran Logam',
      actionPhraseJp: '乾燥砂消火バケツ、ヨシ！',
      actionPhraseId: 'Pasir kering pemadam baterai, aman!',
      targetXPercent: 75,
      targetYPercent: 85,
      touchDurationMs: 2000,
    },
  },

  // ── KLASTER XIV: PERKAPALAN & MARITIM (SHIPBUILDING) ──
  {
    id: 'panic-ship-01',
    sector: 'shipbuilding',
    riskCategory: 'CRITICAL_SAFETY',
    standardProtocol: 'Protokol Gas Beracun Ruang Palka Ganda (Sanso Ketsubou)',
    kanseiUtterance: '入るな！酸欠だ！倒れている！ (Hairuna! Sanketsu da! Taorete iru!)',
    situation: 'Dua tukang las pingsan di dalam tangki dasar ganda kapal tanker (double bottom tank) akibat penumpukan gas argon las.',
    japaneseOutput: '換気ファンを最大に回せ！空気呼吸器を装着して救助用ロープで引き上げろ！',
    romaji: 'Kanki fan o saidai ni mawase! Kūki kokyūki o sōchaku shite kyūjyo-yō rōpu de hikiagero!',
    actionChecklist: [
      'DILARANG masuk tanpa masker tabung oksigen bertekanan mandiri (SCBA).',
      'Gas pelindung las (argon/CO2) lebih berat dari udara dan mengendap di dasar tangki.',
      'Nyalakan blower ventilasi palka dengan kapasitas aliran udara maksimal.',
      'Tarik korban menggunakan tali harness pengaman yang terpasang di manhole palka.'
    ],
    context: 'Galangan Kapal Nagasaki · Blok Tangki Palka Bawah Air',
    level: 'n4',
    timeoutSeconds: 5,
    pointAndCallTarget: {
      label: 'Blower Ventilasi Udara Segar',
      actionPhraseJp: '送風機最大換気、ヨシ！',
      actionPhraseId: 'Blower ventilasi maksimal, aman!',
      targetXPercent: 50,
      targetYPercent: 20,
      touchDurationMs: 2000,
    },
  },
  {
    id: 'panic-ship-02',
    sector: 'shipbuilding',
    riskCategory: 'CRITICAL_SAFETY',
    standardProtocol: 'Protokol Kerusakan Seling Derek Blok Kapal 50 Ton (Kēburu Danretsu)',
    kanseiUtterance: 'ワイヤーが切れるぞ！吊り荷の下から出ろ！ (Waiyā ga kireru zo! Tsurini no shita kara dero!)',
    situation: 'Kawat seling derek gantry 50 ton terdengar sobek bersuara keras saat mengangkat blok haluan kapal di atas dok kering.',
    japaneseOutput: '吊り荷の旋回半径から退避しろ！絶対に吊り荷の真下に立つな！',
    romaji: 'Tsurini no senkai hankei kara taihi shiro! Zettai ni tsurini no mashita ni tatsuna!',
    actionChecklist: [
      'Lari keluar dari radius putaran derek minimal 20 meter ke arah luar dok.',
      'DILARANG berdiri di bawah beban gantung sekecil apapun.',
      'Bunyikan sirine darurat derek gantry untuk menghentikan seluruh aktivitas dok.',
      'Turunkan beban ke balok bantalan kayu terdekat jika motor derek masih merespon.'
    ],
    context: 'Dok Kering Galangan Kapal Yokohama · Area Rakitan Blok Lambung',
    level: 'n4',
    timeoutSeconds: 5,
    pointAndCallTarget: {
      label: 'Radius Aman Luar Lintasan Derek',
      actionPhraseJp: 'クレーン旋回外安全帯、ヨシ！',
      actionPhraseId: 'Zona aman luar radius derek, aman!',
      targetXPercent: 25,
      targetYPercent: 70,
      touchDurationMs: 2000,
    },
  },

  // ── KLASTER XV: PERHOTELAN (ACCOMMODATION & HOSPITALITY) ──
  {
    id: 'panic-hotel-01',
    sector: 'accommodation',
    riskCategory: 'MEDICAL_EMERGENCY',
    standardProtocol: 'Protokol Syok Anafilaksis Alergi Tamu Hotel (Arerugī Shokku)',
    kanseiUtterance: 'お客様が倒れました！息ができません！ (Okyakusama ga taoremashita! Iki ga dekimasen!)',
    situation: 'Tamu kamar hotel mengalami pembengkakan bibir parah, sesak napas berat, dan denyut nadi melemah setelah makan room service.',
    japaneseOutput: '119番通報で救急車を呼べ！エピペンをお持ちか荷物を確認しろ！',
    romaji: 'Ichi-ichi-kyū-ban tsūhō de kyūkyūsha o yobe! Epipen o omochi ka nimotsu o kakunin shiro!',
    actionChecklist: [
      'Telepon 119 dan sebutkan dugaan syok anafilaksis akibat alergen makanan.',
      'Tanyakan atau cari suntikan otomatis EpiPen pada barang bawaan tamu.',
      'Posisikan tamu berbaring terlentang dengan kedua kaki diangkat 30 cm untuk menjaga pasokan darah ke otak.',
      'Pantau jalan napas dan bersiap lakukan bantuan napas buatan.'
    ],
    context: 'Hotel Bintang 5 Kyoto · Kamar Tamu Suite Lantai 8',
    level: 'n4',
    timeoutSeconds: 5,
    pointAndCallTarget: {
      label: 'Injektor Epinefrin Darurat',
      actionPhraseJp: 'エピペン携帯確認、ヨシ！',
      actionPhraseId: 'Pemeriksaan alat suntik alergi, aman!',
      targetXPercent: 60,
      targetYPercent: 50,
      touchDurationMs: 2000,
    },
  },
  {
    id: 'panic-hotel-02',
    sector: 'accommodation',
    riskCategory: 'ENVIRONMENTAL_DISASTER',
    standardProtocol: 'Protokol Evakuasi Kebakaran Hotel Malam Hari (Kaji Hinan)',
    kanseiUtterance: '火災報知器鳴動！非常階段へ誘導しろ！ (Kasai hōchiki meidō! Hijō kaidan e yūdō shiro!)',
    situation: 'Alarm kebakaran berbunyi di lantai 6 hotel pada jam 02.00 dini hari dan tercium bau asap pekat dari lorong linen.',
    japaneseOutput: '非常放送を流せ！エレベーターを停止して非常階段の誘導灯を点灯しろ！',
    romaji: 'Hijō hōsō o nagase! Erebētā o teishi shite hijō kaidan no yūdōtō o tentō shiro!',
    actionChecklist: [
      'Aktifkan siaran darurat otomatis bilingual Jepang-Inggris ke seluruh kamar.',
      'Kunci lift agar turun ke lantai dasar dan larang tamu menggunakan lift.',
      'Bawa senter darurat dan ketuk pintu kamar sambil mengarahkan tamu ke tangga darurat.',
      'Tutup pintu darurat tahan api (bōkado) setelah semua tamu melewati koridor.'
    ],
    context: 'Hotel Bisnis Osaka Umeda · Koridor Kamar Tamu Lantai 6',
    level: 'n4',
    timeoutSeconds: 5,
    pointAndCallTarget: {
      label: 'Pintu Darurat Tangga Kebakaran',
      actionPhraseJp: '非常階段誘導灯、ヨシ！',
      actionPhraseId: 'Lampu penunjuk tangga darurat, aman!',
      targetXPercent: 45,
      targetYPercent: 25,
      touchDurationMs: 2000,
    },
  },

  // ── KLASTER XVI: LOGISTIK & TRANSPORTASI (LOGISTICS) ──
  {
    id: 'panic-logis-01',
    sector: 'logistics',
    riskCategory: 'CRITICAL_SAFETY',
    standardProtocol: 'Protokol Terjepit Truk Mundur Loading Dock (Hasamare Boushi)',
    kanseiUtterance: '止まれ！後ろに人がいる！ (Tomare! Ushiro ni hito ga iru!)',
    situation: 'Truk trailer 10 ton sedang mundur ke pintu dok muat dan hampir menjepit checker barang di antara dinding tembok.',
    japaneseOutput: 'トラックの側面を叩け！大声でクラクションを鳴らせ！',
    romaji: 'Torakku no sokumen o tatake! Ōgoe de kurakushon o narase!',
    actionChecklist: [
      'Pukul bodi samping kabin atau teriak keras agar sopir segera menginjak rem.',
      'DILARANG menyelip di antara bodi truk dan pembatas dok saat kendaraan bergerak.',
      'Gunakan peluit komando mundur standar dengan nada ritmis pendek.',
      'Pastikan ganjal roda ban (chock/waidome) terpasang sebelum bongkar muat.'
    ],
    context: 'Gudang Pusat Logistik Tokyo Bay · Pintu Loading Dock No. 8',
    level: 'n4',
    timeoutSeconds: 5,
    pointAndCallTarget: {
      label: 'Tombol Klakson Darurat Dok',
      actionPhraseJp: 'ドック非常警報、ヨシ！',
      actionPhraseId: 'Alarm sirine dok muat, aman!',
      targetXPercent: 70,
      targetYPercent: 40,
      touchDurationMs: 2000,
    },
  },
  {
    id: 'panic-logis-02',
    sector: 'logistics',
    riskCategory: 'CRITICAL_SAFETY',
    standardProtocol: 'Protokol Keruntuhan Rak Palet Tinggi (Rakku Hōkai)',
    kanseiUtterance: 'ラックが倒れるぞ！通路から逃げろ！ (Rakku ga taoreru zo! Tsūro kara nigero!)',
    situation: 'Garpu forklift menyenggol tiang penyangga rak palet gudang tingkat 4 dan tumpukan kardus 800 kg mulai condong miring.',
    japaneseOutput: '通路を直ちに離れろ！荷物の落下予想範囲にバリケードを張れ！',
    romaji: 'Tsūro o tadachini hanarero! Nimotsu no rakka yosō hani ni barikēdo o hare!',
    actionChecklist: [
      'Lari menyamping menjauhi lorong rak dan jangan mencoba menahan barang jatuh.',
      'Evakuasi seluruh operator forklift di lorong sebelah untuk mencegah efek domino.',
      'Tutup pintu kompartemen lorong gudang dengan rantai pengaman.',
      'Gunakan forklift jangkauan tinggi untuk menstabilkan struktur penyangga baja.'
    ],
    context: 'Gudang Suhu Dingin E-commerce Saitama · Lorong Rak Baja Tingkat 4',
    level: 'n4',
    timeoutSeconds: 5,
    pointAndCallTarget: {
      label: 'Palang Pintu Pengaman Lorong',
      actionPhraseJp: '通路立入禁止ロープ、ヨシ！',
      actionPhraseId: 'Palang pembatas lorong bahaya, aman!',
      targetXPercent: 35,
      targetYPercent: 75,
      touchDurationMs: 2000,
    },
  },

  // ── KLASTER XVII: OPERASIONAL KERETA API (RAILWAY) ──
  {
    id: 'panic-rail-01',
    sector: 'railway',
    riskCategory: 'CRITICAL_SAFETY',
    standardProtocol: 'Protokol Penumpang Jatuh ke Rel Peron (Homu Tenraku)',
    kanseiUtterance: '非常停止ボタンを押せ！線路に人が落ちた！ (Hijō teishi botan o ose! Senro ni hito ga ochita!)',
    situation: 'Seorang penumpang lansia terpeleset jatuh ke celah rel peron stasiun saat lampu sinyal kereta masuk menyala.',
    japaneseOutput: 'ホーム柱の列車非常停止ボタンを押せ！赤旗を線路に向けて振れ！',
    romaji: 'Hōmu hashira no ressha hijō teishi botan o ose! Akahata o senro ni mukete fure!',
    actionChecklist: [
      'Segera tekan Tombol Darurat Kereta (Ressha Hijō Teishi Botan) di tiang peron terdekat.',
      'DILARANG melompat ke rel tanpa konfirmasi kereta di hulu telah berhenti total.',
      'Arahkan korban merapat ke bawah ceruk dinding peron (taihi supesu) jika kereta terlalu dekat.',
      'Beri isyarat bahaya darurat ke arah masinis menggunakan lampu suar atau bendera merah.'
    ],
    context: 'Stasiun Kereta Komuter Shinjuku · Peron Jalur 3 Ramai Penumpang',
    level: 'n4',
    timeoutSeconds: 5,
    pointAndCallTarget: {
      label: 'Tombol Darurat Kereta di Tiang Peron',
      actionPhraseJp: '列車非常停止ボタン、ヨシ！',
      actionPhraseId: 'Tombol stop kereta darurat, aman!',
      targetXPercent: 50,
      targetYPercent: 45,
      touchDurationMs: 2000,
    },
  },
  {
    id: 'panic-rail-02',
    sector: 'railway',
    riskCategory: 'CRITICAL_SAFETY',
    standardProtocol: 'Protokol Pintu Kereta Terjepit Tas (Doa Hasami Rissha)',
    kanseiUtterance: '発車を止めろ！扉に挟まっている！ (Hassha o tomere! Tobira ni hasamatte iru!)',
    situation: 'Tali ransel penumpang terjepit pintu Shinkansen dan penumpang terseret di peron saat kereta mulai bergerak perlahan.',
    japaneseOutput: '非常ブレーキブザーを鳴らせ！車掌に直ちに停止合図を出せ！',
    romaji: 'Hijō burēki buzā o narase! Shashō ni tadachini teishi aizu o dase!',
    actionChecklist: [
      'Bunyikan peluit panjang tajam dan kibarkan kedua tangan menyilang di atas kepala.',
      'Tekan tombol pembuka pintu peron otomatis jika dilengkapi pintu pelindung (platform screen door).',
      'Pegang korban untuk mencegah terseret ke celah rel selagi kereta mengerem.',
      'Laporkan ke kepala stasiun untuk verifikasi keselamatan seluruh sensor pintu.'
    ],
    context: 'Stasiun Shinkansen Nagoya · Peron Kereta Cepat Jalur Nozomi',
    level: 'n4',
    timeoutSeconds: 5,
    pointAndCallTarget: {
      label: 'Sakelar Lampu Isyarat Darurat Masinis',
      actionPhraseJp: '車掌停止合図ブザー、ヨシ！',
      actionPhraseId: 'Klakson sinyal stop kondektur, aman!',
      targetXPercent: 65,
      targetYPercent: 30,
      touchDurationMs: 2000,
    },
  },

  // ── KLASTER XVIII: PENGOLAHAN KAYU (TIMBER PROCESSING) ──
  {
    id: 'panic-timber-01',
    sector: 'timber',
    riskCategory: 'CRITICAL_SAFETY',
    standardProtocol: 'Protokol Patah Gergaji Pita Raksasa (Obinoko Danretsu)',
    kanseiUtterance: '帯鋸が暴れている！身を伏せろ！ (Obinoko ga abarete iru! Mi o fusero!)',
    situation: 'Bilah gergaji pita raksasa (band-saw) retak dan putus saat membelah kayu gelondongan cedar berdiameter 80 cm.',
    japaneseOutput: '防護板の裏へ伏せろ！即座に帯鋸モーターの主電源を切れ！',
    romaji: 'Bōgoban no ura e fusero! Sokuzani obinoko mōtā no shudengen o kire!',
    actionChecklist: [
      'Tiarap di balik tameng baja pelindung mesin untuk menghindari sabetan bilah baja berkecepatan tinggi.',
      'Matikan sakelar elektromagnetik gergaji segera.',
      'DILARANG mendekat sebelum putaran roda pulley gergaji berhenti total.',
      'Periksa apakah ada serpihan baja yang menancap pada gelondongan kayu.'
    ],
    context: 'Pabrik Penggergajian Kayu Prefektur Akita · Jalur Band-saw Utama',
    level: 'n4',
    timeoutSeconds: 5,
    pointAndCallTarget: {
      label: 'Sakelar Pemutus Daya Gergaji Pita',
      actionPhraseJp: '製材主電源遮断、ヨシ！',
      actionPhraseId: 'Pemutus daya gergaji pita, aman!',
      targetXPercent: 25,
      targetYPercent: 55,
      touchDurationMs: 2000,
    },
  },
  {
    id: 'panic-timber-02',
    sector: 'timber',
    riskCategory: 'CRITICAL_SAFETY',
    standardProtocol: 'Protokol Ledakan Serbuk Kayu Cyclone (Funshinjaku)',
    kanseiUtterance: '集塵機から火花だ！散水しろ！ (Shūjinki kara hibana da! Sansui shiro!)',
    situation: 'Blower penyedot serbuk gergaji kayu kering memercikkan bara api di corong silo penyimpan serbuk.',
    japaneseOutput: 'サイクロンの給気を止めろ！自動消火スプリンクラーを作動させろ！',
    romaji: 'Saikuron no kyūki o tomere! Jidō shōka supurinkurā o sadō sasero!',
    actionChecklist: [
      'Tutup katup aliran udara masuk blower silo agar tidak terjadi ledakan debu (dust explosion).',
      'Nyalakan sistem penyemprot air (sprinkler) di dalam tangki siklon serbuk kayu.',
      'Evakuasi seluruh pekerja dari radius 30 meter di sekitar menara silo luar pabrik.',
      'Gunakan pemadam api semprotan kabut air bertekanan rendah.'
    ],
    context: 'Pabrik Kayu Lapis Plywood Shizuoka · Menara Silo Penampung Serbuk',
    level: 'n4',
    timeoutSeconds: 5,
    pointAndCallTarget: {
      label: 'Katup Penyiram Air Tangki Silo',
      actionPhraseJp: 'サイクロン散水バルブ、ヨシ！',
      actionPhraseId: 'Katup penyiram siklon, aman!',
      targetXPercent: 80,
      targetYPercent: 30,
      touchDurationMs: 2000,
    },
  },

  // ── KLASTER XIX: TEKSTIL & GARMEN (TEXTILE & SEWING) ──
  {
    id: 'panic-textile-01',
    sector: 'textile',
    riskCategory: 'CRITICAL_SAFETY',
    standardProtocol: 'Protokol Jarum Patah Menembus Jari (Hari Oshin Jiko)',
    kanseiUtterance: 'ミシンを止めろ！指に針が刺さった！ (Mishin o tomere! Yubi ni hari ga sasatta!)',
    situation: 'Jarum mesin jahit industri kecepatan tinggi patah dan menancap menembus kuku jari operator saat menjahit kain tebal.',
    japaneseOutput: '無理に針を抜くな！フットペダルから足を離して電源プラグを抜け！',
    romaji: 'Muri ni hari o nukuna! Futto pedaru kara ashi o hanashite dengen puragu o nuke!',
    actionChecklist: [
      'Angkat kaki dari pedal gas mesin jahit segera agar jarum tidak berulang menusuk.',
      'DILARANG mencabut jarum patah sendiri karena patahan logam dapat tertinggal di dalam sendi tulang.',
      'Lepaskan jarum bersama sepatu penindas (presser foot) jika memungkinkan untuk melonggarkan jari.',
      'Bawa patahan ujung jarum yang tersisa ke dokter bedah ortopedi untuk konfirmasi kelengkapan mata jarum.'
    ],
    context: 'Pabrik Garmen Seragam Kerja Gifu · Lini Jahit Mesin Otomatis',
    level: 'n4',
    timeoutSeconds: 5,
    pointAndCallTarget: {
      label: 'Sakelar Daya Mesin Jahit Industri',
      actionPhraseJp: 'ミシン主電源プラグ遮断、ヨシ！',
      actionPhraseId: 'Steker daya mesin jahit, aman!',
      targetXPercent: 45,
      targetYPercent: 60,
      touchDurationMs: 2000,
    },
  },
  {
    id: 'panic-textile-02',
    sector: 'textile',
    riskCategory: 'CRITICAL_SAFETY',
    standardProtocol: 'Protokol Rol Mesin Kalender Kain Menjepit Tangan (Rōru Makikomi)',
    kanseiUtterance: '巻き込まれるぞ！非常ワイヤーを引け！ (Makikomareru zo! Hijō waiyā o hike!)',
    situation: 'Ujung lengan pakaian pekerja terseret masuk ke antara silinder rol panas mesin finishing kain berputar cepat.',
    japaneseOutput: '胸の高さの緊急停止ワイヤーを引け！ロール逆回転ボタンを押せ！',
    romaji: 'Mune no takasa no kinkyū teishi waiyā o hike! Rōru gyaku-kaiten botan o ose!',
    actionChecklist: [
      'Tarik kawat darurat (trip wire) horizontal di depan mesin menggunakan tubuh atau tangan.',
      'Tekan tombol pembalik arah rol (reverse jog) untuk melepaskan jepitan kain.',
      'DILARANG menyentuh silinder logam yang bersuhu 180 derajat Celsius.',
      'Beri pertolongan pertama luka bakar dan kompresi jika terjadi cedera remuk (crush injury).'
    ],
    context: 'Pabrik Pencelupan & Penyempurnaan Tekstil Kyoto · Mesin Rol Kalender Panas',
    level: 'n4',
    timeoutSeconds: 5,
    pointAndCallTarget: {
      label: 'Kawat Trip Darurat Rol',
      actionPhraseJp: '非常停止トリップワイヤー、ヨシ！',
      actionPhraseId: 'Kawat darurat rol mesin, aman!',
      targetXPercent: 55,
      targetYPercent: 40,
      touchDurationMs: 2000,
    },
  },
];

/**
 * Load all canonical panic scenarios, optionally filtered by vocational sector.
 */
export function loadPanicScenarios(sector?: VocationalSector): VocationalPanicScenario[] {
  if (sector) {
    return CANONICAL_PANIC_SCENARIOS.filter((s) => s.sector === sector);
  }
  return CANONICAL_PANIC_SCENARIOS;
}

/**
 * Get a specific panic scenario by ID.
 */
export function getPanicScenarioById(id: string): VocationalPanicScenario | null {
  return CANONICAL_PANIC_SCENARIOS.find((s) => s.id === id) || null;
}

/**
 * Get random panic scenarios for drill generation.
 */
export function getRandomPanicScenarios(count = 5, sector?: VocationalSector): VocationalPanicScenario[] {
  const pool = loadPanicScenarios(sector);
  return shuffle(pool).slice(0, count);
}
