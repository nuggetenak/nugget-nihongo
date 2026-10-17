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
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

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

        <span className="text-[11px] font-mono font-medium text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30">
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
                      <div className="text-[11px] font-bold text-rose-400 uppercase tracking-wide mb-1">Dilema / Konflik Teori:</div>
                      {item.conflict}
                    </div>
                    <div className="p-3 bg-emerald-950/20 rounded-xl border border-emerald-500/30 text-emerald-200">
                      <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wide mb-1">Resolusi Nugget Nihongo:</div>
                      {item.resolution}
                    </div>
                    <div className="text-[11px] text-muted font-mono pt-1">
                      Landasan Pustaka: {item.evidence}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
