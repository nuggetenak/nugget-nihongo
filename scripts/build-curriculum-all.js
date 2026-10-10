// ══════════════════════════════════════════════════════════════
//  build-curriculum-all.js — Master Compiler for All Curriculum Tracks
//  Compiles N4, N3, N2, N1, and SSW Tracks into public/data/curriculum/
// ══════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const outDir = path.join(ROOT, 'public/data/curriculum');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Helper to safely load data
function loadData(file, varName) {
  const filePath = path.join(ROOT, file);
  if (!fs.existsSync(filePath)) return [];
  const win = {};
  try {
    eval(fs.readFileSync(filePath, 'utf8').replace('window.', 'win.'));
    return win[varName] || [];
  } catch (e) {
    console.warn(`Could not load ${file}:`, e.message);
    return [];
  }
}

const grammarN4 = loadData('public/data/grammar/grammar-n4.js', 'grammarN4');
const vocabN4 = loadData('public/data/vocab/vocab-n4.js', 'vocabN4');

const grammarN3 = loadData('public/data/grammar/grammar-n3.js', 'grammarN3');
const vocabN3 = loadData('public/data/vocab/vocab-n3.js', 'vocabN3');

const grammarN2 = loadData('public/data/grammar/grammar-n2.js', 'grammarN2');
const vocabN2 = loadData('public/data/vocab/vocab-n2.js', 'vocabN2');

const grammarN1 = loadData('public/data/grammar/grammar-n1.js', 'grammarN1');
const vocabN1 = loadData('public/data/vocab/vocab-n1.js', 'vocabN1');

// Partition array into N chunks
function chunkArray(arr, numChunks) {
  const chunks = [];
  const perChunk = Math.ceil(arr.length / numChunks);
  for (let i = 0; i < numChunks; i++) {
    chunks.push(arr.slice(i * perChunk, (i + 1) * perChunk));
  }
  return chunks;
}

// Generic track generator for standard levels
function buildLevelCurriculum(level, grammarList, vocabList, unitDefs) {
  const grammarChunks = chunkArray(grammarList, 10);
  const vocabChunks = chunkArray(vocabList, 10);

  const units = unitDefs.map((def, idx) => {
    const unitG = grammarChunks[idx] || [];
    const unitV = vocabChunks[idx] || [];

    const lessons = [
      {
        id: `les-${level}-u${String(idx + 1).padStart(2, '0')}-01`,
        lesson_number: 1,
        title_id: `${def.title_id} (Pengenalan Pola & Input)`,
        title_jp: `${def.title_jp}（基礎）`,
        desc_id: `Pengenalan struktur inti dan pola dasar ${def.title_id}.`,
        can_do_statement: def.can_do_summary,
        grammar_ids: unitG.slice(0, Math.ceil(unitG.length / 2)).map(g => g.id),
        vocab_ids: unitV.slice(0, Math.ceil(unitV.length / 2)).map(v => v.id),
      },
      {
        id: `les-${level}-u${String(idx + 1).padStart(2, '0')}-02`,
        lesson_number: 2,
        title_id: `${def.title_id} (Penerapan & Produksi Aktif)`,
        title_jp: `${def.title_jp}（応用と産出）`,
        desc_id: `Latihan produksi aktif, perbandingan nuansa, dan konsolidasi.`,
        can_do_statement: def.can_do_summary,
        grammar_ids: unitG.slice(Math.ceil(unitG.length / 2)).map(g => g.id),
        vocab_ids: unitV.slice(Math.ceil(unitV.length / 2)).map(v => v.id),
      }
    ];

    return {
      unit_number: idx + 1,
      id: `unit-${level}-${String(idx + 1).padStart(2, '0')}`,
      level: level,
      pt_stage: def.pt_stage || 3,
      title_id: def.title_id,
      title_jp: def.title_jp,
      theme: def.theme,
      icon: def.icon,
      can_do_summary: def.can_do_summary,
      l2d_focus_notes: def.l2d_focus_notes || '',
      grammar_ids: unitG.map(g => g.id),
      vocab_ids: unitV.map(v => v.id),
      lessons
    };
  });

  return {
    meta: {
      track_id: `curriculum-${level}`,
      level: level,
      version: '1.0.0',
      total_units: units.length,
      total_grammar_points: grammarList.length,
      total_vocab_points: vocabList.length,
      authoritative: true
    },
    units
  };
}

// 1. N4 Unit Definitions
const n4UnitsDef = [
  { title_id: 'Niat, Rencana & Rekomendasi', title_jp: '意志と助言', theme: 'Intention & Advice', icon: '🎯', can_do_summary: 'Bisa merencanakan kegiatan dan memberi saran sopan.' },
  { title_id: 'Kemampuan, Izin & Kapasitas', title_jp: '可能と許可', theme: 'Potential & Permission', icon: '⚡', can_do_summary: 'Bisa menjelaskan keterampilan kerja dan izin bertindak.' },
  { title_id: 'Rantai Kronologis & Keharusan', title_jp: '順序と義務', theme: 'Sequence & Obligation', icon: '📋', can_do_summary: 'Bisa mengurutkan SOP kerja dan menyatakan keharusan.' },
  { title_id: 'Aspek Kondisi & Persiapan', title_jp: '状態と準備', theme: 'Aspect & Preparation', icon: '🛠️', can_do_summary: 'Bisa melaporkan persiapan kerja dan kondisi resultant.' },
  { title_id: 'Bantuan & Arah Tindakan', title_jp: '授受表現', theme: 'Benefactives Giving/Receiving', icon: '🤝', can_do_summary: 'Bisa meminta dan memberi bantuan secara santun.' },
  { title_id: 'Suara Pasif & Pengalaman Korban', title_jp: '受身と迷惑', theme: 'Passive & Adverse Experience', icon: '🛡️', can_do_summary: 'Bisa menceritakan kendala kerja dengan konstruksi pasif.' },
  { title_id: 'Kausatif & Permohonan Izin', title_jp: '使役と許可', theme: 'Causative & Leave Request', icon: '✉️', can_do_summary: 'Bisa meminta izin cuti sakit dan mematuhi instruksi atasan.' },
  { title_id: 'Sistem Pengandaian & Syarat', title_jp: '条件表現', theme: 'Conditionals To/Tara/Ba/Nara', icon: '🔀', can_do_summary: 'Bisa menjelaskan cara kerja mesin dan memberikan rute.' },
  { title_id: 'Dugaan, Bukti Visual & Kabar', title_jp: '推量と伝聞', theme: 'Evidentiality & Conjecture', icon: '🔍', can_do_summary: 'Bisa menduga anomali mesin dan menyampaikan kabar pengumuman.' },
  { title_id: 'Fondasi Keigo & Kesantunan Kerja', title_jp: '敬語の基礎', theme: 'Workplace Keigo Foundations', icon: '👔', can_do_summary: 'Bisa menyapa tamu dan menjawab telepon standar kantor.' }
];

// 2. N3 Unit Definitions
const n3UnitsDef = [
  { title_id: 'Perbandingan, Rasio & Standar', title_jp: '比較と基準', theme: 'Comparison & Proportion', icon: '⚖️', can_do_summary: 'Bisa membandingkan data produksi dan metode kerja.' },
  { title_id: 'Batasan, Lingkup & Representasi', title_jp: '範囲と代表', theme: 'Scope & Representation', icon: '📐', can_do_summary: 'Bisa mendefinisikan batasan aturan spesifik departemen.' },
  { title_id: 'Kausalitas, Tanggung Jawab & Dampak', title_jp: '原因と帰責', theme: 'Causality & Responsibility', icon: '💡', can_do_summary: 'Bisa menganalisis faktor kegagalan dan dampak positif bimbingan.' },
  { title_id: 'Momentum & Jendela Kesempatan', title_jp: '機会と時間帯', theme: 'Temporal Windows (Uchi ni)', icon: '⏳', can_do_summary: 'Bisa memanfaatkan jeda waktu dan melaporkan gangguan di tengah tugas.' },
  { title_id: 'Keyakinan Logis & Keharusan Moral', title_jp: '確信と当為', theme: 'Certainty & Duty (Beki da)', icon: '🧭', can_do_summary: 'Bisa menyimpulkan kegagalan sistem dan etika kerja profesional.' },
  { title_id: 'Negasi Parsial & Keraguan Halus', title_jp: '部分否定と推測', theme: 'Nuanced Negation', icon: '🎭', can_do_summary: 'Bisa menyanggah pendapat secara halus tanpa konfrontasi.' },
  { title_id: 'Usaha, Ketuntasan & Kondisi Kritis', title_jp: '努力と完結', theme: 'Effort & Completion (Yarikiru)', icon: '🔥', can_do_summary: 'Bisa melaporkan progres tugas mendekati akhir.' },
  { title_id: 'Tendensi & Karakteristik Negatif', title_jp: '傾向と様子', theme: 'Tendency & Suffixes (Gachi/Darake)', icon: '⚠️', can_do_summary: 'Bisa melaporkan kelemahan desain alat yang sering tersumbat.' },
  { title_id: 'Sudut Pandang, Peran & Paradoks', title_jp: '立場と役割', theme: 'Perspective & Role', icon: '👤', can_do_summary: 'Bisa berbicara mewakili posisi jabatan kerja.' },
  { title_id: 'Topik Wacana, Diskusi & Negosiasi', title_jp: '議題と論点', theme: 'Discourse & Negotiation', icon: '📊', can_do_summary: 'Bisa mempresentasikan materi dalam rapat tim operasional.' }
];

// 3. N2 Unit Definitions
const n2UnitsDef = [
  { title_id: 'Kondisi Ekstrem & Batas Emosi', title_jp: '極限と感情', theme: 'Extremes & Affect', icon: '🌊', can_do_summary: 'Bisa mengekspresikan dorongan empati mendalam secara tepat.' },
  { title_id: 'Keharusan Mutlak & Keterpaksaan', title_jp: '余儀と不可避', theme: 'Inevitable Action', icon: '⛓️', can_do_summary: 'Bisa melaporkan perubahan kebijakan mendadak akibat krisis.' },
  { title_id: 'Waktu Simultanitas & Suksesi Instan', title_jp: '契機と即時', theme: 'Immediate Succession', icon: '⚡', can_do_summary: 'Bisa menyusun alur koordinasi darurat cepat.' },
  { title_id: 'Hubungan Logis & Penegasan Absolut', title_jp: '必然と限定', theme: 'Absolute Logic', icon: '💎', can_do_summary: 'Bisa menegaskan penyebab tunggal keberhasilan proyek.' },
  { title_id: 'Pertimbangan & Penilaian Objektif', title_jp: '根拠と準拠', theme: 'Evaluation (Fumaete)', icon: '📑', can_do_summary: 'Bisa mengevaluasi program kerja berdasarkan data faktual.' },
  { title_id: 'Kontradiksi & Paradoks Tajam', title_jp: '逆接と譲歩', theme: 'Paradox & Concession', icon: '🔄', can_do_summary: 'Bisa menganalisis anomali pasar di luar ekspektasi wajar.' },
  { title_id: 'Korelasi & Skala Berkelanjutan', title_jp: '連動と比例', theme: 'Correlation & Scale', icon: '📈', can_do_summary: 'Bisa memaparkan efek domino perubahan makroekonomi.' },
  { title_id: 'Sasaran Tindakan & Ruang Lingkup', title_jp: '対象と領域', theme: 'Scope & Target Area', icon: '🎯', can_do_summary: 'Bisa membatasi ruang lingkup riset dan sengketa kerja.' },
  { title_id: 'Syarat Ketat & Asumsi Hipotetis', title_jp: '厳格条件', theme: 'Rigorous Conditions', icon: '🔒', can_do_summary: 'Bisa merumuskan klausul syarat kontrak kerja.' },
  { title_id: 'Retorika Formal & Resolusi Institusi', title_jp: '公的結論', theme: 'Institutional Synthesis', icon: '🏛️', can_do_summary: 'Bisa menyampaikan penolakan atau keputusan korporat resmi.' }
];

// 4. N1 Unit Definitions
const n1UnitsDef = [
  { title_id: 'Kecepatan Reaksi Sastrawi', title_jp: '瞬間描写', theme: 'Literary Immediacy', icon: '⚡', can_do_summary: 'Bisa membaca wacana sastra dan berita editorial cepat.' },
  { title_id: 'Determinasi, Otoritas & Batas', title_jp: '依拠と権威', theme: 'Authority & Scope', icon: '📜', can_do_summary: 'Bisa memahami dokumen traktat regulasi kementerian.' },
  { title_id: 'Puncak Emosi Batin & Jiwa', title_jp: '心情の極み', theme: 'Profound Affective States', icon: '🕊️', can_do_summary: 'Bisa menyampaikan simpati dan belasungkawa diplomatik.' },
  { title_id: 'Moralitas Profesi & Larangan Keras', title_jp: '倫理と戒律', theme: 'Moral Imperatives (Bekarazu)', icon: '⚖️', can_do_summary: 'Bisa menguraikan kode etik profesional dewan komisaris.' },
  { title_id: 'Eksklusivitas & Keistimewaan Unik', title_jp: '固有と唯一', theme: 'Unique Exclusivity', icon: '👑', can_do_summary: 'Bisa memuji keunggulan komparatif produk tanpa tanding.' },
  { title_id: 'Kausalitas Fatal & Takdir', title_jp: '宿命と必然', theme: 'Fatal Causality', icon: '🌌', can_do_summary: 'Bisa menganalisis akar penyebab krisis sejarah/institusional.' },
  { title_id: 'Pembatasan Maksimal & Kepasrahan', title_jp: '極限譲歩', theme: 'Maximal Concession', icon: '🛡️', can_do_summary: 'Bisa menerima kompromi negosiasi kritis tingkat tinggi.' },
  { title_id: 'Karakteristik Fisik Menyeluruh', title_jp: '充満と様態', theme: 'Full Permeation', icon: '🌧️', can_do_summary: 'Bisa mendeskripsikan kondisi visual bencana fisik komprehensif.' },
  { title_id: 'Ketiadaan Sarana & Penyesalan Akut', title_jp: '無力と顛末', theme: 'Helplessness & Irony', icon: '🍂', can_do_summary: 'Bisa merefleksikan kegagalan program kerja strategis.' },
  { title_id: 'Retorika Eksekutif & Wacana Mahir', title_jp: '最高峰統語', theme: 'Executive Discourse Synthesis', icon: '🏆', can_do_summary: 'Bisa berpidato dan memimpin dewan sidang internasional.' }
];

// 5. SSW Track Builders
function buildSSWCurriculum(trackId, title, sectorName, icon, modules) {
  const units = modules.map((mod, idx) => ({
    unit_number: idx + 1,
    id: `unit-${trackId}-${String(idx + 1).padStart(2, '0')}`,
    level: 'n4_ssw',
    pt_stage: 3,
    title_id: mod.title_id,
    title_jp: mod.title_jp,
    theme: mod.theme,
    icon: mod.icon || icon,
    can_do_summary: mod.can_do,
    l2d_focus_notes: mod.k3_notes || '',
    grammar_ids: mod.grammar_ids || ['gn4-00010', 'gn4-00013', 'gn4-00021'],
    vocab_ids: mod.vocab_ids || ['vg-n4-00001', 'vg-n4-00002'],
    lessons: [
      {
        id: `les-${trackId}-u${String(idx + 1).padStart(2, '0')}-01`,
        lesson_number: 1,
        title_id: `${mod.title_id} (Prosedur & Terminologi)`,
        title_jp: `${mod.title_jp}（手順と用語）`,
        desc_id: `Standar operasional prosedur dan terminologi keselamatan kerja ${mod.title_id}.`,
        can_do_statement: mod.can_do,
        grammar_ids: mod.grammar_ids || ['gn4-00010', 'gn4-00013'],
        vocab_ids: mod.vocab_ids || ['vg-n4-00001']
      },
      {
        id: `les-${trackId}-u${String(idx + 1).padStart(2, '0')}-02`,
        lesson_number: 2,
        title_id: `${mod.title_id} (Simulasi Darurat & Laporan SBAR)`,
        title_jp: `${mod.title_jp}（緊急時SBAR報告）`,
        desc_id: `Simulasi tanggap darurat dan pelaporan baku SBAR kepada supervisor.`,
        can_do_statement: mod.can_do,
        grammar_ids: mod.grammar_ids || ['gn4-00021'],
        vocab_ids: mod.vocab_ids || ['vg-n4-00002']
      }
    ]
  }));

  return {
    meta: {
      track_id: trackId,
      title: title,
      sector: sectorName,
      version: '1.0.0',
      total_units: units.length,
      authoritative: true
    },
    units
  };
}

const sswKaigoModules = [
  { title_id: 'Sapaan Empatik & Izin Tindakan (Koe-kake)', title_jp: '声かけと共感挨拶', theme: 'Greeting & Rapport', can_do: 'Bisa meminta izin verbal dengan ramah sebelum menyentuh lansia.' },
  { title_id: 'Bantuan Makan & Pencegahan Tersedak (Shokuji)', title_jp: '食事介助と誤嚥予防', theme: 'Eating & Choking Safety', can_do: 'Bisa memberi makan bertahap dan merespons kondisi tersedak Heimlich.' },
  { title_id: 'Mobilisasi Kursi Roda & Pencegahan Jatuh', title_jp: '移動介助と転倒予防', theme: 'Wheelchair & Falls', can_do: 'Bisa mengunci rem kursi roda dan memandu lansia bangun aman.' },
  { title_id: 'Bantuan Mandi & Privasi Pasien (Nyuyoku)', title_jp: '入浴介助と羞恥心配慮', theme: 'Bathing & Privacy', can_do: 'Bisa mengecek suhu air hangat dan menjaga privasi lansia.' },
  { title_id: 'Dekoding 42 Onomatopoeia Nyeri Fisik', title_jp: '痛みのオノマトペ解読', theme: 'Pain Decoding', can_do: 'Bisa membedakan rasa nyeri menusuk chikuchiku vs berdenyut zukinzukin.' },
  { title_id: 'De-eskalasi Agitasi Demensia (Ninchishou)', title_jp: '認知症ケアと対応', theme: 'Dementia Care', can_do: 'Bisa menenangkan lansia gelisah tanpa membantah ilusi mereka.' },
  { title_id: 'Pelaporan Catatan Shift (Moushiokuri)', title_jp: '申し送りと介護記録', theme: 'Shift Handover', can_do: 'Bisa mencatat intake cairan, suhu tubuh, dan buang air.' },
  { title_id: 'Protokol Pelaporan Medis Darurat SBAR', title_jp: '緊急時SBAR医療報告', theme: 'SBAR Escalation', can_do: 'Bisa melapor insiden jatuh dan dugaan fraktur tulang 119 SBAR.' }
];

const sswFoodModules = [
  { title_id: 'Sanitasi Diri & Prosedur Masuk Pabrik Steril', title_jp: '衛生着と入室手順', theme: 'Sanitation & Entry', can_do: 'Bisa memakai APD steril, mencuci tangan 6-langkah, dan air shower.' },
  { title_id: '7 Prinsip HACCP & Titik Kendali Kritis CCP', title_jp: 'HACCP7原則とCCP管理', theme: 'HACCP Principles', can_do: 'Bisa memantau suhu sterilisasi pemanasan inti 85C dan detektor logam.' },
  { title_id: 'Deklarasi 8 Alergen Wajib Hukum Jepang', title_jp: '特定原材料8品目管理', theme: 'Allergen Compliance', can_do: 'Bisa mencegah kontaminasi silang 8 alergen statutori MAFF.' },
  { title_id: 'Sistem Kode 4 Warna Talenan & Pisau', title_jp: 'まな板4色区分管理', theme: 'Color Coding', can_do: 'Bisa memisahkan talenan daging, ikan, sayur, dan matang.' },
  { title_id: 'Pengemasan Hermetis & Karantina Patahan Pisau', title_jp: 'レトルト密封と異物混入', theme: 'Packaging & Contamination', can_do: 'Bisa mengarantina batch jika alarm detektor logam berbunyi.' },
  { title_id: 'Protokol Outbreak Norovirus & Klorin 1.000 ppm', title_jp: 'ノロウイルス対応', theme: 'Norovirus Quarantine', can_do: 'Bisa mengisolasi area muntahan dan disinfeksi klorin 1000 ppm.' },
  { title_id: 'Sekkyaku 7-Daigo & Layanan Omotenashi Restoran', title_jp: '接客7大用語と接遇', theme: 'Omotenashi Service', can_do: 'Bisa menyapa tamu, mencatat pesanan, dan meminta maaf sopan.' },
  { title_id: 'Penanganan Komplain & SBAR Syok Anafilaksis', title_jp: 'クレーム対応とアナフィラキシー', theme: 'Complaint & Anaphylaxis SBAR', can_do: 'Bisa menangani komplain rambut dan panggil 119 untuk syok alergi.' }
];

const sswConstructionModules = [
  { title_id: 'APD Wajib Konstruksi & Senam Pagi KYK', title_jp: '保護具と朝礼KYK活動', theme: 'PPE & Morning Routine', can_do: 'Bisa mengecek tali dagu helm, sepatu baja, dan hazard KYK.' },
  { title_id: 'Protokol Pointing-and-Calling (Shiteki Koshou)', title_jp: '指差呼称プロトコル', theme: 'Pointing-and-Calling', can_do: 'Bisa mengecek sakelar dan kait derek dengan rumus Yoshi.' },
  { title_id: 'Pekerjaan Ketinggian & Pencegahan Jatuh (Tsuiraku)', title_jp: '高所作業と墜落防止', theme: 'Fall Arrest & Scaffolding', can_do: 'Bisa mengaitkan harness ganda di perancah lantai 4.' },
  { title_id: 'Pekerjaan Galian & Shoring Longsor Parit', title_jp: '掘削作業と土砂崩壊防止', theme: 'Trench Collapse', can_do: 'Bisa memasang kotak pelindung shoring dan evakuasi longsor.' },
  { title_id: 'Pengoperasian Crane, Sling & Zona Bahaya Radius', title_jp: 'クレーン玉掛けと旋回半径', theme: 'Crane & Rigging Safety', can_do: 'Bisa memberi isyarat peluit derek dan barikade radius putar.' },
  { title_id: 'Bahaya Kelistrikan & Pencegahan Sengatan (Kanden)', title_jp: '感電防止とLOTO遮断', theme: 'Electrocution & LOTO', can_do: 'Bisa menjaga jarak kabel 6600V dan memutus daya sakelar.' },
  { title_id: 'Ruang Terbatas, Terowongan & Asfiksia Gas Beracun', title_jp: '閉鎖空間と酸素欠乏症', theme: 'Confined Space Anoxia', can_do: 'Bisa mengecek oksigen >18% dan menyalakan blower udara segar.' },
  { title_id: 'Protokol 4-Tier Rousai & Pelaporan Bencana SBAR', title_jp: '労災4段階とSBAR報告', theme: 'Rousai & Disaster SBAR', can_do: 'Bisa melapor kecelakaan kerja ke kementerian dan ambulans 119.' }
];

function writeCurriculumFiles(filenameBase, varName, data) {
  const jsonPath = path.join(outDir, `${filenameBase}.json`);
  const jsPath = path.join(outDir, `${filenameBase}.js`);

  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
  const jsContent = `// ── ${filenameBase}.js ────────────────────────────────────────\n` +
    `// Generated by build-curriculum-all.js (Corpus v30 / Jalur C + G)\n` +
    `window.${varName} = ${JSON.stringify(data, null, 2)};\n` +
    `if (typeof module !== 'undefined' && module.exports) {\n  module.exports = { ${varName}: window.${varName} };\n}\n`;
  fs.writeFileSync(jsPath, jsContent, 'utf8');

  console.log(`Generated: ${filenameBase}.json & .js (${data.units.length} units)`);
}

function main() {
  console.log('Compiling all curriculum tracks...');

  // Build N4
  const n4Data = buildLevelCurriculum('n4', grammarN4, vocabN4, n4UnitsDef);
  writeCurriculumFiles('curriculum-n4', 'curriculumN4', n4Data);

  // Build N3
  const n3Data = buildLevelCurriculum('n3', grammarN3, vocabN3, n3UnitsDef);
  writeCurriculumFiles('curriculum-n3', 'curriculumN3', n3Data);

  // Build N2
  const n2Data = buildLevelCurriculum('n2', grammarN2, vocabN2, n2UnitsDef);
  writeCurriculumFiles('curriculum-n2', 'curriculumN2', n2Data);

  // Build N1
  const n1Data = buildLevelCurriculum('n1', grammarN1, vocabN1, n1UnitsDef);
  writeCurriculumFiles('curriculum-n1', 'curriculumN1', n1Data);

  // Build SSW Kaigo
  const sswKaigoData = buildSSWCurriculum('curriculum-ssw-kaigo', 'Kurikulum SSW Keperawatan Lansia (Kaigo)', 'Kaigo', '👵', sswKaigoModules);
  writeCurriculumFiles('curriculum-ssw-kaigo', 'curriculumSSWKaigo', sswKaigoData);

  // Build SSW Food
  const sswFoodData = buildSSWCurriculum('curriculum-ssw-food', 'Kurikulum SSW Pengolahan Makanan & Restoran', 'Pengolahan Makanan & Restoran', '🍱', sswFoodModules);
  writeCurriculumFiles('curriculum-ssw-food', 'curriculumSSWFood', sswFoodData);

  // Build SSW Construction
  const sswConstData = buildSSWCurriculum('curriculum-ssw-construction', 'Kurikulum SSW Konstruksi (JAC)', 'Konstruksi', '🏗️', sswConstructionModules);
  writeCurriculumFiles('curriculum-ssw-construction', 'curriculumSSWConstruction', sswConstData);

  console.log('\nAll 7 curriculum tracks compiled successfully!');
}

main();
