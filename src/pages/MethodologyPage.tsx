// ══════════════════════════════════════════════════════════════════
//  MethodologyPage.tsx — Public Pedagogical Accounting & Epistemic Boundaries
//  Source: METHODOLOGY-PAGE-NARRATIVE-v1.md (Corpus v30 Canonical Revision)
//  Research Basis: 807+ unique citations, 539+ verified DOIs, 18 SSW sectors
// ══════════════════════════════════════════════════════════════════

import React, { useState } from 'react';
import {
  BookOpen,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Scale,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Sparkles,
  Layers,
  Brain,
  Compass,
  Calculator,
  Users,
  Share2,
  FileText,
  ExternalLink,
  GitPullRequest,
  Database,
  Mail,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { IrasutoyaImage } from '../components/common/IrasutoyaImage';

interface ConflictResolutionItem {
  id: string;
  code: string;
  title: string;
  conflict: string;
  resolution: string;
  evidence: string;
}

const CONFLICT_RESOLUTIONS: ConflictResolutionItem[] = [
  {
    id: 'conf-1',
    code: 'CONF-01',
    title: 'Prinsip Redundansi vs Pengecualian Takarir L2',
    conflict: 'Mayer (2001) Cognitive Load Theory menyatakan bahwa menyajikan teks dan audio secara bersamaan membebani memori kerja (Redundancy Principle). Namun penelitian CALL/SLA menemukan pemula L2 sangat membutuhkan takarir simultan (L2 Captioning Exception).',
    resolution: 'Diselesaikan melalui Perancah Berbasis Level (Level-Gated Scaffolding): Pada N5–N4, teks kana dan audio disajikan bersamaan untuk memfasilitasi decoding fonologis. Pada N3+, romaji dihapus sepenuhnya, teks kana disembunyikan secara default, dan N1 beralih ke audio-first immersion.',
    evidence: 'Mayer (2001), Vanderplank (2010), ADR-008.',
  },
  {
    id: 'conf-2',
    code: 'CONF-02',
    title: 'Interleaving Efek vs Variasi Gamifikasi',
    conflict: 'Rohrer & Taylor (2007) menunjukkan bahwa mengacak jenis soal meningkatkan retensi diskriminatif (Interleaving). Namun pengacakan lintas domain yang terlalu liar menciptakan kekacauan kognitif yang memicu kecemasan dan keputusasaan pembelajar mandiri.',
    resolution: 'Diselesaikan melalui Interleaving Intra-Kategori (Within-Category Interleaving): Pengacakan hanya dilakukan di antara kategori gramatikal sejenis (misal: partikel dengan partikel lain, verba transitif dengan intransitif). Variasi lintas domain dialokasikan antar sesi mikro yang terpisah.',
    evidence: 'Rohrer & Taylor (2007), Sweller (1988), ADR-011.',
  },
  {
    id: 'conf-3',
    code: 'CONF-03',
    title: 'Budaya Malu (Shame) vs Papan Peringkat Publik',
    conflict: 'Gamifikasi Barat mengandalkan papan peringkat publik kompetitif (leaderboards) untuk memacu motivasi. Namun bagi pembelajar dewasa Indonesia dengan orientasi kolektivis (Hofstede IDV=14), peringkat publik justru memicu kecemasan bahasa (FLCA) dan rasa malu yang melumpuhkan produksi aktif.',
    resolution: 'Diselesaikan melalui Prioritas Sosio-Kultural Indonesia: Papan peringkat kompetitif dihapus secara total secara default. Evaluasi kesalahan bersifat privat dan aman. Motivasi dialihkan ke pencapaian tonggak komunal (Collective Community Milestones) dan self-mastery.',
    evidence: 'Horwitz et al. (1986), Hofstede (2011), Pramesti et al. (2019), ADR-004.',
  },
  {
    id: 'conf-4',
    code: 'CONF-04',
    title: 'Testing Effect vs Expertise Reversal Effect',
    conflict: 'Karpicke & Roediger (2008) membuktikan bahwa tes berulang memperkuat memori (Testing Effect). Namun Kalyuga (2007) menemukan bahwa perancah/panduan yang terus-menerus disajikan kepada pembelajar yang sudah mahir justru memperlambat performa mereka (Expertise Reversal).',
    resolution: 'Diselesaikan melalui Pemisahan Pengambilan Memori dari Perancah (Separation of Retrieval from Scaffolding): Item yang telah matang tetap diuji melalui active recall berjarak (FSRS interval bulanan), namun seluruh petunjuk visual, rincian tata bahasa, dan furigana dilepas secara bertahap.',
    evidence: 'Karpicke & Roediger (2008), Kalyuga (2007), Ye et al. (2022).',
  },
];

export const MethodologyPage: React.FC = () => {
  const { setActiveTab } = useAppStore();
  const [expandedSection, setExpandedSection] = useState<string | null>('section-1');
  const [expandedConflict, setExpandedConflict] = useState<string | null>('conf-1');

  // Interactive FSRS Simulator state
  const [fsrsStabilityDays, setFsrsStabilityDays] = useState<number>(10);
  const [fsrsElapsedDays, setFsrsElapsedDays] = useState<number>(7);
  const [personaFilter, setPersonaFilter] = useState<'ALL' | 'JLPT' | 'JFT' | 'SSW' | 'LIVING'>('ALL');
  const [copiedBibtex, setCopiedBibtex] = useState(false);

  // FSRS v4.5 Forgetting curve calculation:
  // R(t, S) = (1 + FACTOR * (t / S))^(-DECAY) where FACTOR = 0.19, DECAY = 0.5
  const fsrsRetrievability = Math.pow(1 + 0.19 * (fsrsElapsedDays / fsrsStabilityDays), -0.5);
  const retrievabilityPercent = Math.max(1, Math.min(100, Math.round(fsrsRetrievability * 100)));

  const isGoldenRetentionWindow = retrievabilityPercent >= 85 && retrievabilityPercent <= 92;
  const isOverdue = retrievabilityPercent < 85;

  const SAMPLE_PERSONAS = [
    {
      id: 'IDN-JP-001',
      name: 'Budi Santoso',
      origin: 'Cilacap, Jawa Tengah (22 th)',
      target: 'SSW Kaigo (Perawat Lansia)',
      pillar: 'SSW' as const,
      challenge: 'Keigo rasa empati lansia & aba-aba darurat choking/fall saat shift malam',
      quote: '"Belajar sambil kerja serabutan, butuh materi singkat 5-10 menit sebelum tidur."',
    },
    {
      id: 'IDN-JP-015',
      name: 'Rina Wulandari',
      origin: 'Surabaya, Jawa Timur (19 th)',
      target: 'JLPT N2 (Beasiswa Monbukagakusho)',
      pillar: 'JLPT' as const,
      challenge: 'Pitch accent kontur nada Tokyo & kanji majemuk abstrak (jukugo)',
      quote: '"Sering bingung bedain intonasi ame (hujan) vs ame (permen) pas presentasi."',
    },
    {
      id: 'IDN-JP-042',
      name: 'Ahmad Fauzi',
      origin: 'Karawang, Jawa Barat (26 th)',
      target: 'SSW Seizogyo (Manufaktur Mesin)',
      pillar: 'SSW' as const,
      challenge: 'Istilah keselamatan K3, mesin bubut CNC, dan format laporan Hou-Ren-Sou',
      quote: '"Instruksi pabrik di Jepang cepat banget, harus hafal istilah teknis luar kepala."',
    },
    {
      id: 'IDN-JP-088',
      name: 'Ni Kadek Ayu',
      origin: 'Denpasar, Bali (24 th)',
      target: 'SSW Shukuhaku (Perhotelan Ryokan)',
      pillar: 'SSW' as const,
      challenge: 'Bahasa hormat Sonkeigo & Kenjougo tingkat tinggi untuk tamu hotel tradisi',
      quote: '"Beda sedikit penggunaan o-kyaku-sama bisa dianggap kurang sopan."',
    },
    {
      id: 'IDN-JP-112',
      name: 'Muhammad Fajar',
      origin: 'Makassar, Sulawesi Selatan (21 th)',
      target: 'JFT-Basic A2 & Seikatsu',
      pillar: 'JFT' as const,
      challenge: 'Percakapan sehari-hari di balai kota (kuyakusho), supermarket, dan rumah sakit',
      quote: '"Butuh simulasi nyata cara ngurus asuransi dan lapor alamat di Jepang."',
    },
    {
      id: 'IDN-JP-165',
      name: 'Siti Rahmawati',
      origin: 'Bandung, Jawa Barat (28 th)',
      target: 'Living & Working in Japan',
      pillar: 'LIVING' as const,
      challenge: 'Nuansa komunikasi konteks tinggi (kuuki wo yomu) dan etika kerja kantoran',
      quote: '"Bukan cuma tata bahasa, tapi cara merespons tanpa menyinggung rekan kerja."',
    },
  ];

  const filteredPersonas = SAMPLE_PERSONAS.filter(
    (p) => personaFilter === 'ALL' || p.pillar === personaFilter
  );

  const BIBTEX_CODE = `@misc{nuggetnihongo2026,
  author = {Nugget Nihongo Research Collective},
  title = {Nugget Nihongo: Open-Source Japanese Pedagogy Corpus and FSRS Adaptive Platform for Indonesian L1 Learners},
  year = {2026},
  url = {https://github.com/nuggetenak/nugget-nihongo},
  note = {Corpus v30, 807+ citations, 19 SSW Sectors}
}`;

  const copyBibtex = () => {
    navigator.clipboard.writeText(BIBTEX_CODE);
    setCopiedBibtex(true);
    setTimeout(() => setCopiedBibtex(false), 2000);
  };

  const toggleSection = (id: string) => {
    setExpandedSection((prev) => (prev === id ? null : id));
  };

  const toggleConflict = (id: string) => {
    setExpandedConflict((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-bg text-appText pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12 pt-6 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full overflow-x-hidden">
      {/* Back Button & Top Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setActiveTab('about')}
          className="min-h-[40px] px-3.5 py-2 rounded-xl bg-card border border-border text-xs sm:text-sm font-semibold hover:border-amber-500/50 active:scale-95 transition-all flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Tentang</span>
        </button>

        <span className="text-xs font-mono font-medium text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30">
          Corpus v30 Canonical
        </span>
      </div>

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card via-card/95 to-amber-950/20 border border-border p-6 sm:p-10 mb-8 shadow-xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Metodologi Pedagogis & Batas Epistemik
            </h1>
            <p className="text-xs sm:text-sm text-muted font-medium">
              Transparansi Ilmiah Nugget Nihongo untuk Pembelajar Dewasa Indonesia
            </p>
          </div>
        </div>

        <p className="text-sm sm:text-base text-appText/90 leading-relaxed mt-4 max-w-3xl">
          Dokumen ini bukan materi pemasaran, melainkan pertanggungjawaban pedagogis terbuka (pedagogical accounting). 
          Kami membedah fondasi ilmiah, adaptasi fonologis L1 Bahasa Indonesia, algoritma FSRS v4.5, serta batas-batas kejujuran epistemik atas apa yang telah terbukti dan apa yang belum kami klaim.
        </p>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-6 pt-6 border-t border-border/60 text-xs sm:text-sm text-muted">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>807+ Sitasi Ilmiah Terverifikasi</span>
          </div>
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-amber-400 shrink-0" />
            <span>539+ DOI Internasional</span>
          </div>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-400 shrink-0" />
            <span>19 Sektor Vokasional SSW & JLPT N5–N1</span>
          </div>
        </div>
      </div>

      {/* ── 6 CANONICAL NARRATIVE SECTIONS ── */}
      <div className="space-y-4 mb-10">
        <h2 className="text-xl font-bold tracking-tight text-white mb-2 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-400" />
          6 Kerangka Narasi Utama (The Narrative Arc)
        </h2>

        {/* Section 1 */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden transition-all">
          <button
            onClick={() => toggleSection('section-1')}
            className="w-full min-h-[52px] p-4 sm:p-5 flex items-center justify-between text-left hover:bg-neutral-800/40 active:scale-[0.99] transition-all"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 font-bold text-sm flex items-center justify-center shrink-0 border border-amber-500/20">
                1
              </span>
              <span className="font-bold text-sm sm:text-base text-white truncate">
                Siapa Target Pembelajar Kami (Who We Built This For)
              </span>
            </div>
            {expandedSection === 'section-1' ? <ChevronUp className="w-5 h-5 text-muted shrink-0" /> : <ChevronDown className="w-5 h-5 text-muted shrink-0" />}
          </button>
          {expandedSection === 'section-1' && (
            <div className="p-4 sm:p-6 pt-0 border-t border-border/50 text-sm leading-relaxed text-appText/90 space-y-3">
              <p>
                Nugget Nihongo dibuat untuk satu kelompok pembelajar yang spesifik: <strong>orang dewasa Indonesia yang belajar Bahasa Jepang sebagai bahasa kedua (L2).</strong> Kami tidak mencoba melayani semua pembelajar bahasa di dunia. Ini bukan kelemahan — ini pilihan desain yang disengaja.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-muted">
                <li><strong className="text-white">Tujuan Konkret:</strong> Persiapan sertifikasi kejuruan SSW (Tokutei Ginou) untuk penempatan kerja di Jepang, ujian JLPT untuk studi/karir, atau keterlibatan budaya jangka panjang.</li>
                <li><strong className="text-white">Profil Psikologis Spesifik:</strong> Fenomena <em>malu</em> (kesadaran sosial kolektivis yang dapat menghambat produksi aktif), motivasi instrumental tinggi pada kohort vokasional, dan kebiasaan awal belajar yang dipandu instruktur sebelum beralih ke belajar mandiri.</li>
                <li><strong className="text-white">Jarak Linguistik Riil:</strong> Bahasa Indonesia dan Jepang memiliki titik transfer positif (fonologi konsonan-vokal yang tumpang tindih) serta titik interferensi sistematis yang wajib diajarkan secara eksplisit (seperti penanda topik <em>wa</em> vs subjek <em>ga</em>, dan urutan kata SVO vs SOV).</li>
              </ul>
            </div>
          )}
        </div>

        {/* Section 2 */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden transition-all">
          <button
            onClick={() => toggleSection('section-2')}
            className="w-full min-h-[52px] p-4 sm:p-5 flex items-center justify-between text-left hover:bg-neutral-800/40 active:scale-[0.99] transition-all"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 font-bold text-sm flex items-center justify-center shrink-0 border border-amber-500/20">
                2
              </span>
              <span className="font-bold text-sm sm:text-base text-white truncate">
                Bagaimana Platform Mengajarkan Kosakata (How We Teach Vocabulary)
              </span>
            </div>
            {expandedSection === 'section-2' ? <ChevronUp className="w-5 h-5 text-muted shrink-0" /> : <ChevronDown className="w-5 h-5 text-muted shrink-0" />}
          </button>
          {expandedSection === 'section-2' && (
            <div className="p-4 sm:p-6 pt-0 border-t border-border/50 text-sm leading-relaxed text-appText/90 space-y-3">
              <p>
                Inti teknis kami berpusat pada <strong>FSRS v4.5</strong> (Free Spaced Repetition Scheduler), algoritma pemodelan memori modern yang menghitung peluruhan retrievabilitas <code className="text-amber-400 font-mono text-xs px-1.5 py-0.5 bg-neutral-900 rounded">R(t, S) = (1 + FACTOR · t / S)^(-DECAY)</code> dan menjadwalkan repetisi tepat sebelum titik lupa.
              </p>
              <p>
                Kami menerapkan <strong>19 parameter bobot terkalibrasi khusus penutur Indonesia</strong>. Berdasarkan temuan Matsunaga (1999), pembelajar tanpa latar belakang kanji (non-kanji background) memerlukan 2.3× paparan lebih banyak dibandingkan penutur bahasa beraksara Hanzi. Karena itu, prior kesulitan kanji awal kami naikkan secara proporsional agar jadwal review tidak melompat terlalu dini.
              </p>
            </div>
          )}
        </div>

        {/* Section 3 */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden transition-all">
          <button
            onClick={() => toggleSection('section-3')}
            className="w-full min-h-[52px] p-4 sm:p-5 flex items-center justify-between text-left hover:bg-neutral-800/40 active:scale-[0.99] transition-all"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 font-bold text-sm flex items-center justify-center shrink-0 border border-amber-500/20">
                3
              </span>
              <span className="font-bold text-sm sm:text-base text-white truncate">
                Bagaimana Mengajarkan Bahasa Jepang Spesifik (Orthography & Grammar)
              </span>
            </div>
            {expandedSection === 'section-3' ? <ChevronUp className="w-5 h-5 text-muted shrink-0" /> : <ChevronDown className="w-5 h-5 text-muted shrink-0" />}
          </button>
          {expandedSection === 'section-3' && (
            <div className="p-4 sm:p-6 pt-0 border-t border-border/50 text-sm leading-relaxed text-appText/90 space-y-3">
              <p>
                Bahasa Jepang memiliki keunikan ortografis ganda: silabis transparan (Kana) dan morfografis-logografis kompleks (Kanji). Kami tidak memperlakukan kanji sebagai gambar acak, melainkan sebagai objek struktural dengan komponen radikal semantik dan komponen fonetik.
              </p>
              <p>
                Titik-titik interferensi tajam diajarkan secara langsung:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3 bg-neutral-900/60 rounded-xl border border-border">
                  <div className="text-xs font-bold text-amber-400">Sistem Partikel Kasus</div>
                  <div className="text-xs text-muted mt-1">Pembedaan は, が, を, に yang tidak memiliki analog leksikal dalam Bahasa Indonesia.</div>
                </div>
                <div className="p-3 bg-neutral-900/60 rounded-xl border border-border">
                  <div className="text-xs font-bold text-blue-400">Keigo Indeksikal</div>
                  <div className="text-xs text-muted mt-1">Keigo sebagai kontinum jarak sosial (uchi vs soto), bukan sekadar terjemahan sopan diskrit.</div>
                </div>
                <div className="p-3 bg-neutral-900/60 rounded-xl border border-border">
                  <div className="text-xs font-bold text-emerald-400">Pitch Accent</div>
                  <div className="text-xs text-muted mt-1">Visualisasi kontur pitch mora (Atamadaka, Nakadaka, Odaka, Heiban) melalui HVPT.</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 4 */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden transition-all">
          <button
            onClick={() => toggleSection('section-4')}
            className="w-full min-h-[52px] p-4 sm:p-5 flex items-center justify-between text-left hover:bg-neutral-800/40 active:scale-[0.99] transition-all"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 font-bold text-sm flex items-center justify-center shrink-0 border border-amber-500/20">
                4
              </span>
              <span className="font-bold text-sm sm:text-base text-white truncate">
                Bagaimana Platform Beradaptasi pada Individu (Adaptive Personalization)
              </span>
            </div>
            {expandedSection === 'section-4' ? <ChevronUp className="w-5 h-5 text-muted shrink-0" /> : <ChevronDown className="w-5 h-5 text-muted shrink-0" />}
          </button>
          {expandedSection === 'section-4' && (
            <div className="p-4 sm:p-6 pt-0 border-t border-border/50 text-sm leading-relaxed text-appText/90 space-y-3">
              <p>
                Dua pembelajar dengan durasi belajar yang sama dapat memiliki hasil yang berbeda 2–5 kali lipat karena variasi memori kerja, bakat fonologis, dan kecemasan afektif.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-muted">
                <li><strong className="text-white">Computer Adaptive Testing (CAT):</strong> Diagnosis tingkat kemahiran dalam 6–12 butir soal menggunakan kriteria henti dinamis presisi tinggi (<code className="text-amber-400 font-mono text-xs">SEM ≤ 0.35</code>).</li>
                <li><strong className="text-white">Otonomi Penuh:</strong> Anda memilih modul, tempo, dan mode belajar. Tidak ada progresi paksa, sesuai prinsip Self-Determination Theory (SDT).</li>
              </ul>
            </div>
          )}
        </div>

        {/* Section 5: Epistemic Honesty Table */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden transition-all">
          <button
            onClick={() => toggleSection('section-5')}
            className="w-full min-h-[52px] p-4 sm:p-5 flex items-center justify-between text-left hover:bg-neutral-800/40 active:scale-[0.99] transition-all"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 font-bold text-sm flex items-center justify-center shrink-0 border border-emerald-500/20">
                5
              </span>
              <span className="font-bold text-sm sm:text-base text-white truncate">
                Temuan Riset: Kejujuran Epistemik (What We Claim vs What We DO NOT Claim)
              </span>
            </div>
            {expandedSection === 'section-5' ? <ChevronUp className="w-5 h-5 text-muted shrink-0" /> : <ChevronDown className="w-5 h-5 text-muted shrink-0" />}
          </button>
          {expandedSection === 'section-5' && (
            <div className="p-4 sm:p-6 pt-0 border-t border-border/50 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {/* Proven */}
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2.5">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Yang Terbukti Secara Ilmiah (Well-Established)</span>
                  </div>
                  <ul className="space-y-2 text-xs text-neutral-300 leading-relaxed">
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-400">•</span>
                      <span>Spaced retrieval practice secara konsisten mengungguli massed cramming dalam retensi jangka panjang.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-400">•</span>
                      <span>Latihan produksi aktif (output practice) esensial untuk memicu proceduralisasi kompetensi komunikatif.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-400">•</span>
                      <span>Kecemasan bahasa (FLCA) merusak kemampuan produksi bicara jauh lebih parah daripada kemampuan reseptif membaca.</span>
                    </li>
                  </ul>
                </div>

                {/* Not Claimed */}
                <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2.5">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                    <XCircle className="w-4 h-4 shrink-0" />
                    <span>Yang TIDAK Kami Klaim Terbukti (Honest Boundaries)</span>
                  </div>
                  <ul className="space-y-2 text-xs text-neutral-300 leading-relaxed">
                    <li className="flex items-start gap-1.5">
                      <span className="text-rose-400">•</span>
                      <span>Kami TIDAK mengklaim FSRS terbukti lebih unggul dari SM-2 dalam Randomized Controlled Trial (RCT) independen eksternal.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-rose-400">•</span>
                      <span>Kami TIDAK mengklaim lulus JLPT N4 saja cukup untuk bekerja di sektor Kaigo/SSW tanpa keigo sosio-pragmatik autentik.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-rose-400">•</span>
                      <span>Kami TIDAK mengklaim gamifikasi secara otomatis meningkatkan pembelajaran bahasa tanpa bukti pedagogis pendukung.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 6: Research Agenda */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden transition-all">
          <button
            onClick={() => toggleSection('section-6')}
            className="w-full min-h-[52px] p-4 sm:p-5 flex items-center justify-between text-left hover:bg-neutral-800/40 active:scale-[0.99] transition-all"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 font-bold text-sm flex items-center justify-center shrink-0 border border-blue-500/20">
                6
              </span>
              <span className="font-bold text-sm sm:text-base text-white truncate">
                Agenda Riset Berkelanjutan (Platform Research Agenda)
              </span>
            </div>
            {expandedSection === 'section-6' ? <ChevronUp className="w-5 h-5 text-muted shrink-0" /> : <ChevronDown className="w-5 h-5 text-muted shrink-0" />}
          </button>
          {expandedSection === 'section-6' && (
            <div className="p-4 sm:p-6 pt-0 border-t border-border/50 text-sm leading-relaxed text-appText/90 space-y-3">
              <p>
                Beberapa pertanyaan empiris belum memiliki jawaban definitif dalam pustaka SLA dunia. Melalui platform ini (dengan izin pengguna yang sepenuhnya anonim), kami menyumbangkan data empiris untuk 3 agenda riset:
              </p>
              <div className="space-y-2 pt-1 text-xs">
                <div className="p-3 bg-neutral-900/60 rounded-xl border border-border">
                  <strong className="text-white">Studi 1:</strong> Profil orientasi motivasi instrumental vs integratif pembelajar vokasional Indonesia berbasis L2MSS.
                </div>
                <div className="p-3 bg-neutral-900/60 rounded-xl border border-border">
                  <strong className="text-white">Studi 2:</strong> Pola transfer negatif dan probabilitas eror morfologis-sintaksis L1 Indonesia → Jepang secara longitudinal.
                </div>
                <div className="p-3 bg-neutral-900/60 rounded-xl border border-border">
                  <strong className="text-white">Studi 3:</strong> Pengukuran kuantitatif kecemasan afektif (malu) terhadap latensi respons produksi tuturan Jepang.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── THEORETICAL CONFLICT RESOLUTION REGISTRY (CONF-01 TO CONF-04) ── */}
      <div className="bg-card border border-border rounded-3xl p-5 sm:p-8 shadow-xl mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Resolusi Konflik Teoretis (CONF-01 s.d. CONF-04)
            </h2>
            <p className="text-xs text-muted">
              Penyelesaian Tegangan Antara Prinsip Teori Kognitif Universal dan Realitas Pembelajar Indonesia
            </p>
          </div>
        </div>

        <div className="space-y-3 mt-4">
          {CONFLICT_RESOLUTIONS.map((item) => {
            const isExpanded = expandedConflict === item.id;
            return (
              <div key={item.id} className="border border-border/70 rounded-2xl bg-neutral-900/50 overflow-hidden">
                <button
                  onClick={() => toggleConflict(item.id)}
                  className="w-full min-h-[48px] p-4 flex items-center justify-between text-left hover:bg-neutral-800/40 active:scale-[0.99] transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 shrink-0">
                      {item.code}
                    </span>
                    <span className="font-semibold text-xs sm:text-sm text-neutral-200 truncate">
                      {item.title}
                    </span>
                  </div>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-muted shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted shrink-0" />}
                </button>

                {isExpanded && (
                  <div className="p-4 pt-0 border-t border-border/40 text-xs sm:text-sm space-y-2.5 leading-relaxed">
                    <div className="p-3 bg-neutral-950/60 rounded-xl border border-neutral-800 text-neutral-300">
                      <div className="text-xs font-bold text-rose-400 uppercase tracking-wide mb-1">Dilema / Konflik Teori:</div>
                      {item.conflict}
                    </div>
                    <div className="p-3 bg-emerald-950/20 rounded-xl border border-emerald-500/30 text-emerald-200">
                      <div className="text-xs font-bold text-emerald-400 uppercase tracking-wide mb-1">Resolusi Nugget Nihongo:</div>
                      {item.resolution}
                    </div>
                    <div className="text-xs text-muted font-mono pt-1">
                      Landasan Pustaka: {item.evidence}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── INTERACTIVE FSRS v4.5 FORMULA VISUALIZER ── */}
      <div className="bg-card border border-border rounded-3xl p-5 sm:p-8 shadow-xl mb-8 card-interactive-lift">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-border/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Simulasi Interaktif Retensi Memori FSRS v4.5
              </h2>
              <p className="text-xs text-muted">
                Kalkulasi Peluruhan Ingatan $R(t, S)$ Berdasarkan Interval Stabilitas dan Hari Berlalu
              </p>
            </div>
          </div>
          <span className="self-start sm:self-auto text-xs font-mono font-semibold px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
            Ye et al. (2022) · Target 90%
          </span>
        </div>

        {/* Live Calculation Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-2xl bg-neutral-900/80 border border-border flex flex-col justify-between">
            <span className="text-xs text-muted font-medium">Stabilitas Memori ($S$)</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
                {fsrsStabilityDays}
              </span>
              <span className="text-xs text-neutral-400 font-medium">hari</span>
            </div>
            <input
              type="range"
              min="1"
              max="60"
              value={fsrsStabilityDays}
              onChange={(e) => setFsrsStabilityDays(Number(e.target.value))}
              className="mt-3 w-full accent-amber-500 cursor-pointer"
            />
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900/80 border border-border flex flex-col justify-between">
            <span className="text-xs text-muted font-medium">Hari Sejak Latihan Terakhir ($t$)</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
                {fsrsElapsedDays}
              </span>
              <span className="text-xs text-neutral-400 font-medium">hari</span>
            </div>
            <input
              type="range"
              min="0"
              max="60"
              value={fsrsElapsedDays}
              onChange={(e) => setFsrsElapsedDays(Number(e.target.value))}
              className="mt-3 w-full accent-amber-500 cursor-pointer"
            />
          </div>

          <div className={`p-4 rounded-2xl border flex flex-col justify-between transition-colors ${
            isGoldenRetentionWindow
              ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
              : isOverdue
              ? 'bg-rose-950/20 border-rose-500/30 text-rose-300'
              : 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
          }`}>
            <span className="text-xs font-semibold uppercase tracking-wider">
              Peluang Ingat ($R$)
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl sm:text-4xl font-black font-mono">
                {retrievabilityPercent}%
              </span>
            </div>
            <span className="text-xs mt-2 font-medium">
              {isGoldenRetentionWindow
                ? '⭐ Zona Emas Review! Otak siap dikuatkan kembali.'
                : isOverdue
                ? '⚠️ Memori mulai memudar. Segera lakukan review aktif.'
                : '✅ Masih sangat segar dalam memori kerja.'}
            </span>
          </div>
        </div>

        {/* Formula Explanation */}
        <div className="p-4 rounded-2xl bg-neutral-950/60 border border-neutral-800 text-xs sm:text-sm text-neutral-300 space-y-2">
          <div className="font-mono text-xs text-amber-400 font-semibold">
            Rumus: R(t, S) = (1 + 0.19 · (t / S))^(-0.5)
          </div>
          <p className="text-xs text-muted leading-relaxed">
            Nugget Nihongo menerapkan <strong>Pengali Matsunaga (2.3×)</strong> untuk karakter kanji bagi pembelajar berlatar belakang Bahasa Indonesia (non-kanji L1). Kartu kosakata kanji baru dijadwalkan dengan repetisi lebih rapat di fase awal sebelum stabilitas ($S$) dilepas bertahap ke interval mingguan dan bulanan.
          </p>
        </div>
      </div>

      {/* ── 200 INDONESIAN LEARNER PERSONAS RESEARCH MATRIX ── */}
      <div className="bg-card border border-border rounded-3xl p-5 sm:p-8 shadow-xl mb-8 card-interactive-lift">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-border/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Validasi Lapangan: Matriks 200 Persona Indonesia
              </h2>
              <p className="text-xs text-muted">
                Sampel Demografis Pembelajar dari Sabang sampai Merauke yang Diuji di Simulator
              </p>
            </div>
          </div>
          <span className="self-start sm:self-auto text-xs font-mono font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
            200 Personas Dataset
          </span>
        </div>

        {/* Pillar Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 mb-4">
          {(['ALL', 'JLPT', 'JFT', 'SSW', 'LIVING'] as const).map((pillar) => (
            <button
              key={pillar}
              onClick={() => setPersonaFilter(pillar)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 active:scale-95 ${
                personaFilter === pillar
                  ? 'bg-amber-500 text-neutral-950 shadow-sm'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-border'
              }`}
            >
              {pillar === 'ALL'
                ? 'Semua Kohort (200)'
                : pillar === 'JLPT'
                ? 'JLPT N5–N1'
                : pillar === 'JFT'
                ? 'JFT-Basic A2'
                : pillar === 'SSW'
                ? 'SSW Vokasional (19 Sektor)'
                : 'Living in Japan'}
            </button>
          ))}
        </div>

        {/* Persona Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {filteredPersonas.map((persona) => (
            <div
              key={persona.id}
              className="p-4 rounded-2xl bg-neutral-900/60 border border-border hover:border-amber-500/40 transition-all space-y-2 card-interactive-lift"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-sm text-white">{persona.name}</span>
                  <span className="text-xs text-muted ml-2 font-mono">({persona.origin})</span>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-amber-400 border border-border">
                  {persona.pillar}
                </span>
              </div>
              <div className="text-xs text-amber-300 font-medium">
                🎯 Target: {persona.target}
              </div>
              <div className="text-xs text-neutral-300 leading-relaxed">
                <strong className="text-muted">Titik Kritis:</strong> {persona.challenge}
              </div>
              <p className="text-xs italic text-neutral-400 bg-neutral-950/60 p-2.5 rounded-xl border border-neutral-800/80">
                {persona.quote}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── OPEN SCIENCE & COMMUNITY COLLABORATION PROTOCOL ── */}
      <div className="bg-gradient-to-br from-card via-card to-amber-950/20 border border-amber-500/30 rounded-3xl p-5 sm:p-8 shadow-xl mb-8 card-interactive-lift">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Protokol Kolaborasi Riset Terbuka (Open Science)
            </h2>
            <p className="text-xs text-muted">
              Undangan Terbuka bagi Peneliti Bahasa, Pengajar LPK, dan Penutur Asli untuk Berkontribusi
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
          Nugget Nihongo dibangun dengan prinsip ilmu pengetahuan terbuka (*Open Science*). Seluruh data kurikulum, matriks interferensi L1, dan spesifikasi ujian dipublikasikan secara transparan di bawah lisensi Creative Commons (CC BY-SA 4.0). Kami mengundang komunitas akademik dan praktisi lapangan untuk ikut menyempurnakan korpus ini:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-2xl bg-neutral-900/70 border border-border space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <GitPullRequest className="w-4 h-4" />
              <span>1. Koreksi Nuansa & Dialek Lokal</span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Kirimkan masukan titik salah kaprah tata bahasa dari bahasa daerahmu (Jawa, Sunda, Minang, Batak, Bugis, Bali) melalui GitHub Issues.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900/70 border border-border space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <Database className="w-4 h-4" />
              <span>2. Transkrip Percakapan Gemba Autentik</span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Bagi alumni Tokutei Ginou atau kenshusei yang memiliki rekaman aba-aba kerja nyata di pabrik, kapal, atau panti jompo, bantu perkaya bank soal skenario kami.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900/70 border border-border space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-400">
              <Calculator className="w-4 h-4" />
              <span>3. Kalibrasi Bobot FSRS</span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Peneliti pemodelan memori dipersilakan menguji ulang dataset repetisi terbuka kami untuk mencari parameter decay optimal bagi non-kanji learners.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900/70 border border-border space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-400">
              <FileText className="w-4 h-4" />
              <span>4. Sitasi Skripsi & Publikasi Ilmiah</span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Seluruh dataset dapat digunakan gratis untuk penelitian skripsi, tesis, dan jurnal dengan menyertakan sitasi resmi APA 7th atau BibTeX di bawah ini.
            </p>
          </div>
        </div>

        {/* BibTeX Code Box */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted">
            <span className="font-semibold text-neutral-300">Format Sitasi Akademik (BibTeX):</span>
            <button
              onClick={copyBibtex}
              className="px-3 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-amber-400 text-xs font-mono font-bold transition-all active:scale-95 border border-border"
            >
              {copiedBibtex ? '✅ Tersalin!' : 'Salin BibTeX'}
            </button>
          </div>
          <pre className="p-3.5 rounded-2xl bg-neutral-950/90 border border-neutral-800 text-[11px] font-mono text-neutral-300 overflow-x-auto">
            {BIBTEX_CODE}
          </pre>
        </div>

        {/* Research & Corpus Inquiry Contact */}
        <div className="mt-6 p-4 rounded-2xl bg-neutral-900/80 border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-bold text-amber-300 flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-400" />
              <span>Inquiry Riset & Kolaborasi Korpus Terbuka</span>
            </div>
            <p className="text-xs text-neutral-300">
              Pertanyaan metodologi, permohonan data penelitian, atau telaah kurikulum dapat diajukan langsung ke tim pengembang.
            </p>
          </div>
          <a
            href="mailto:nuggetnihongo@gmail.com?subject=Inquiry%20Riset%20dan%20Metodologi%20Nugget%20Nihongo"
            className="px-4 py-2.5 min-h-[44px] rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 hover:text-amber-200 text-xs font-bold flex items-center gap-2 transition-all shrink-0 active:scale-95"
          >
            <span>Hubungi: nuggetnihongo@gmail.com ↗</span>
          </a>
        </div>
      </div>
    </div>
  );
};
