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
  | 'forestry';

export interface VocationalPanicScenario extends PanicScenarioItem {
  sector: VocationalSector;
  riskCategory: 'CRITICAL_SAFETY' | 'MEDICAL_EMERGENCY' | 'ENVIRONMENTAL_DISASTER';
  standardProtocol: string; // e.g. SBAR, LOTO, Heimlich, Williamson
  kanseiUtterance: string;  // Emergency shout / acoustic command
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
      'Hubungi 119 dengan format SBAR: lokasi proyek, lantai, kondisi nafas korban.'
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
