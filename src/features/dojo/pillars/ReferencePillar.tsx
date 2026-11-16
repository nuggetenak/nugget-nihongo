// ══════════════════════════════════════════════════════════════════
//  ReferencePillar.tsx — Pilar 3: Pustaka Referensi & Alat Bantu
//  8 Alat Referensi Tata Bahasa, 9 Buku Teks Standar & Kemahiran Inti
// ══════════════════════════════════════════════════════════════════

import React, { useState } from 'react';

export interface DojoToolMeta {
  id:
    | 'kanji'
    | 'choukai'
    | 'pitch'
    | 'cat'
    | 'keigo'
    | 'counters'
    | 'conjugation'
    | 'nuance'
    | 'kotowaza'
    | 'kana'
    | 'books';
  categoryId: 'kemahiran' | 'referensi';
  categoryName: string;
  categoryIcon: string;
  clusterId: number;
  clusterName: string;
  clusterIcon: string;
  title: string;
  jpTitle: string;
  desc: string;
  badge: string;
  badgeColor: string;
  icon: string;
  actionType: 'subview' | 'modal';
  canDo: string;
}

export const DOJO_TOOLS: DojoToolMeta[] = [
  // ── Kategori 1: Latihan Kemahiran Inti (Core Modules) ──
  {
    id: 'kanji',
    categoryId: 'kemahiran',
    categoryName: 'Latihan Kemahiran Inti',
    categoryIcon: '🥋',
    clusterId: 1,
    clusterName: 'Latihan Keterampilan Inti',
    clusterIcon: '🥋',
    title: 'Kanji Dojo & Stroke Animator',
    jpTitle: '漢字道場・筆順',
    desc: '6.000+ Kanji Jouyou, Jinmeiyou & Kanken lengkap dengan animasi goresan SVG, deteksi urutan guratan, dan kanji canvas interaktif.',
    badge: '6.000+ Kanji · SVG Animasi',
    badgeColor: 'bg-surface-3/90 text-accent-hot dark:text-amber-300 border-amber-500/30 font-semibold',
    icon: '漢',
    actionType: 'subview',
    canDo: 'Mengenali dan menulis Kanji sesuai urutan goresan standar.',
  },
  {
    id: 'choukai',
    categoryId: 'kemahiran',
    categoryName: 'Latihan Kemahiran Inti',
    categoryIcon: '🥋',
    clusterId: 1,
    clusterName: 'Latihan Keterampilan Inti',
    clusterIcon: '🥋',
    title: 'Simulator Menyimak Choukai (CBT Resmi)',
    jpTitle: '聴解CBTシミュレーター',
    desc: 'Official listening tracks & audio drills otentik dengan 163 soal simulasi ujian Choukai berstandar JLPT dan JFT-Basic CBT lengkap naskah transkrip.',
    badge: '163 Soal · Ujian Resmi CBT',
    badgeColor: 'bg-surface-3/90 text-accent-hot dark:text-amber-300 border-amber-500/30 font-semibold',
    icon: '🎧',
    actionType: 'subview',
    canDo: 'Memahami percakapan cepat dan instruksi audio simulasi ujian.',
  },
  {
    id: 'books',
    categoryId: 'kemahiran',
    categoryName: 'Latihan Kemahiran Inti',
    categoryIcon: '🥋',
    clusterId: 3,
    clusterName: 'Perpustakaan & Referensi',
    clusterIcon: '📚',
    title: 'Eksplorasi Buku Teks',
    jpTitle: '標準教科書ライブラリ',
    desc: 'Kurikulum dan pustaka latihan terpadu dari 9 seri buku teks standar: GENKI I & II, Minna no Nihongo I & II, Tobira, Irodori, dan Marugoto.',
    badge: '9 Seri Buku Populer',
    badgeColor: 'bg-surface-3/90 text-accent-hot dark:text-amber-300 border-amber-500/30 font-semibold',
    icon: '📖',
    actionType: 'subview',
    canDo: 'Menyelaraskan studi mandiri dengan kurikulum buku teks standar kursus dan LPK.',
  },

  // ── Kategori 2: Peralatan & Referensi Tata Bahasa (Reference & Practice Utilities) ──
  {
    id: 'kana',
    categoryId: 'referensi',
    categoryName: 'Peralatan & Referensi Tata Bahasa',
    categoryIcon: '🔤',
    clusterId: 3,
    clusterName: 'Perpustakaan & Referensi',
    clusterIcon: '📚',
    title: 'Bagan Aksara Kana',
    jpTitle: '五十音表・かなチャート',
    desc: 'Bagan interaktif 46 Hiragana dan 46 Katakana dengan audio pelafalan asli, tabel dakuten, handakuten, serta kombinasi yoon.',
    badge: '46 Hiragana & Katakana',
    badgeColor: 'bg-surface-3/90 text-appText-bright border-accent/25 font-semibold',
    icon: '🔤',
    actionType: 'modal',
    canDo: 'Membaca dan melafalkan seluruh alfabet fonetik Kana.',
  },
  {
    id: 'conjugation',
    categoryId: 'referensi',
    categoryName: 'Peralatan & Referensi Tata Bahasa',
    categoryIcon: '🔄',
    clusterId: 2,
    clusterName: 'Laboratorium Tata Bahasa & Budaya',
    clusterIcon: '🔬',
    title: 'Matriks Konjugasi Kata Kerja',
    jpTitle: '動詞活用エンジン',
    desc: 'Matriks 9 bentuk perubahan kata kerja Jepang (Te, Masu, Nai, Ba, Tara, Perintah, Pasif, Kausatif, Potensial) dan Yomitan deinflector.',
    badge: '9 Bentuk Konjugasi',
    badgeColor: 'bg-surface-3/90 text-appText-bright border-accent/25 font-semibold',
    icon: '🔄',
    actionType: 'modal',
    canDo: 'Menguasai pola perubahan bentuk kata kerja secara sistematis.',
  },
  {
    id: 'nuance',
    categoryId: 'referensi',
    categoryName: 'Peralatan & Referensi Tata Bahasa',
    categoryIcon: '⚖️',
    clusterId: 2,
    clusterName: 'Laboratorium Tata Bahasa & Budaya',
    clusterIcon: '🔬',
    title: 'Komparasi Nuansa Tata Bahasa',
    jpTitle: 'ニュアンス比較',
    desc: 'Komparator perbedaan makna pola tata bahasa yang mirip (seperti 〜ように vs 〜ために) agar tidak tertukar dalam konteks percakapan nyata.',
    badge: 'Analisis Perbedaan Makna',
    badgeColor: 'bg-surface-3/90 text-appText-bright border-accent/25 font-semibold',
    icon: '⚖️',
    actionType: 'modal',
    canDo: 'Membedakan nuansa halus antar pola tata bahasa serupa.',
  },
  {
    id: 'keigo',
    categoryId: 'referensi',
    categoryName: 'Peralatan & Referensi Tata Bahasa',
    categoryIcon: '💼',
    clusterId: 2,
    clusterName: 'Laboratorium Tata Bahasa & Budaya',
    clusterIcon: '🔬',
    title: 'Pelatih Keigo & Bahasa Bisnis',
    jpTitle: '敬語ビジネストレーナー',
    desc: 'Kuasai tata krama komunikasi bisnis Jepang: Sonkeigo (hormat), Kenjougo (merendah), Teineigo (sopan), dan etiket kerja dunia nyata.',
    badge: 'Sonkeigo & Kenjougo',
    badgeColor: 'bg-surface-3/90 text-appText-bright border-accent/25 font-semibold',
    icon: '💼',
    actionType: 'modal',
    canDo: 'Berkomunikasi santun dan profesional di lingkungan kerja Jepang.',
  },
  {
    id: 'counters',
    categoryId: 'referensi',
    categoryName: 'Peralatan & Referensi Tata Bahasa',
    categoryIcon: '🔢',
    clusterId: 2,
    clusterName: 'Laboratorium Tata Bahasa & Budaya',
    clusterIcon: '🔬',
    title: 'Pelatih Bilangan & Counter (助数詞)',
    jpTitle: '助数詞トレーナー',
    desc: '16 Unit penghitung objek Jepang (本, 匹, 枚, 冊, dll.) lengkap dengan hukum fonetik pelafalan bunyi sengau dan kuis interaktif.',
    badge: '16 Unit Penghitung Objek',
    badgeColor: 'bg-surface-3/90 text-appText-bright border-accent/25 font-semibold',
    icon: '🔢',
    actionType: 'modal',
    canDo: 'Menghitung berbagai jenis benda dengan kata bantu bilangan yang akurat.',
  },
  {
    id: 'cat',
    categoryId: 'referensi',
    categoryName: 'Peralatan & Referensi Tata Bahasa',
    categoryIcon: '🧠',
    clusterId: 1,
    clusterName: 'Latihan Keterampilan Inti',
    clusterIcon: '🥋',
    title: 'Tes Penempatan Adaptif CAT',
    jpTitle: '適応型プレースメントテスト',
    desc: 'Tes adaptif berbasis Computer Adaptive Testing (IRT) untuk mendiagnosis level kemahiran JLPT N5–N1 secara cepat dalam 10–12 butir soal.',
    badge: '10–12 Soal · Diagnosis IRT',
    badgeColor: 'bg-surface-3/90 text-appText-bright border-accent/25 font-semibold',
    icon: '🧠',
    actionType: 'modal',
    canDo: 'Mengetahui level kemahiran saat ini secara obyektif.',
  },
  {
    id: 'kotowaza',
    categoryId: 'referensi',
    categoryName: 'Peralatan & Referensi Tata Bahasa',
    categoryIcon: '🏮',
    clusterId: 2,
    clusterName: 'Laboratorium Tata Bahasa & Budaya',
    clusterIcon: '🔬',
    title: 'Galeri 366+ Peribahasa Kotowaza',
    jpTitle: '日めくり諺366選',
    desc: 'Koleksi 366+ peribahasa dan ungkapan bijak Jepang harian dengan konteks budaya otentik, asal-usul sejarah, dan visual filosofis.',
    badge: '366+ Peribahasa Lengkap',
    badgeColor: 'bg-surface-3/90 text-appText-bright border-accent/25 font-semibold',
    icon: '🏮',
    actionType: 'modal',
    canDo: 'Memperkaya wawasan kultural dan peribahasa sehari-hari.',
  },
  {
    id: 'pitch',
    categoryId: 'referensi',
    categoryName: 'Peralatan & Referensi Tata Bahasa',
    categoryIcon: '📈',
    clusterId: 2,
    clusterName: 'Laboratorium Tata Bahasa & Budaya',
    clusterIcon: '🔬',
    title: 'Visualizer Kontur Pitch Accent',
    jpTitle: 'ピッチアクセント可視化',
    desc: 'Deteksi dan visualisasi 4 pola nada Tokyo (Heiban, Atamadaka, Nakadaka, Odaka) dengan kurva pitch interaktif & 10 pasangan minimal.',
    badge: '4 Pola Tokyo · Kurva Nada',
    badgeColor: 'bg-surface-3/90 text-appText-bright border-accent/25 font-semibold',
    icon: '📈',
    actionType: 'modal',
    canDo: 'Melafalkan kosakata dengan intonasi aksen Tokyo yang natural.',
  },
];

export interface ReferencePillarProps {
  onOpenTool: (toolId: DojoToolMeta['id']) => void;
}

export const ReferencePillar: React.FC<ReferencePillarProps> = ({ onOpenTool }) => {
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<'all' | 'kemahiran' | 'referensi'>('all');

  const renderDojoToolCard = (tool: DojoToolMeta) => (
    <div
      key={tool.id}
      role="button"
      tabIndex={0}
      onClick={() => onOpenTool(tool.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenTool(tool.id);
        }
      }}
      aria-label={`${tool.title}: ${tool.desc}`}
      className="bg-surface-2 hover:bg-surface-3 border border-accent/20 hover:border-amber-500/50 rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-95 min-h-[220px]"
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2.5">
          <div className="w-12 h-12 rounded-xl bg-surface/90 border border-accent/25 flex items-center justify-center text-xl shadow-xs group-hover:scale-105 group-hover:border-amber-500/40 transition-all shrink-0 font-japanese font-black">
            {tool.icon}
          </div>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${tool.badgeColor} shrink-0`}>
            {tool.badge}
          </span>
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-appText-bright group-hover:text-amber-400 transition-colors leading-snug">
            {tool.title}
          </h3>
          <p className="text-xs sm:text-sm font-mono text-appText-muted mt-0.5" lang="ja">
            {tool.jpTitle}
          </p>
        </div>
        <p className="text-sm text-appText-muted leading-relaxed">
          {tool.desc}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-accent/15 flex items-center justify-between text-xs">
        <span className="text-xs text-appText-muted font-medium leading-tight pr-2">
          {tool.canDo}
        </span>
        <span className="text-xs sm:text-sm text-amber-400 font-extrabold group-hover:translate-x-1 transition-transform shrink-0">
          Buka →
        </span>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-appText-bright tracking-tight flex items-center gap-2">
              <span>🔬</span>
              <span>Alat Bantu, Simulator Ujian & Pustaka Referensi</span>
            </h3>
            <p className="text-xs text-appText-muted mt-0.5">
              Akses modul referensi tata bahasa, eksplorasi 9 buku teks standar, dan simulator ujian CBT resmi.
            </p>
          </div>
        </div>

        {/* Category Filter Pill Bar: Semua Alat (11), Kemahiran Inti (3), Peralatan & Referensi (8) */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 max-w-full">
          {[
            { id: 'all', label: 'Semua Alat (11)', icon: '🥋' },
            { id: 'kemahiran', label: 'Kemahiran Inti (3)', icon: '🥋' },
            { id: 'referensi', label: 'Peralatan & Referensi (8)', icon: '🔬' },
          ].map((tab) => {
            const isSelected = selectedCategoryFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategoryFilter(tab.id as any)}
                aria-pressed={isSelected}
                aria-label={`Filter alat: ${tab.label}`}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap shrink-0 transition-all active:scale-95 flex items-center gap-2 min-h-[40px] border ${
                  isSelected
                    ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-sm font-black'
                    : 'bg-surface-2 border-accent/20 text-appText-muted hover:text-appText-bright hover:border-accent/40'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── KATEGORI 1: LATIHAN KEMAHIRAN INTI (CORE MODULES) ── */}
      {(selectedCategoryFilter === 'all' || selectedCategoryFilter === 'kemahiran') && (
        <section className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-accent/15 pb-2.5">
            <div className="flex items-center gap-2.5">
              <span className="text-lg">🥋</span>
              <div>
                <h2 className="text-sm sm:text-base font-extrabold text-appText-bright tracking-tight">
                  Latihan Kemahiran Inti
                </h2>
                <span className="text-xs text-appText-muted font-normal hidden sm:inline">
                  · Core Modules: Kanji, Choukai & Eksplorasi Buku Teks (3 Modul)
                </span>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-accent bg-surface-2 px-2.5 py-1 rounded-full border border-accent/20">
              3 Modul Utama
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DOJO_TOOLS.filter((t) => t.categoryId === 'kemahiran').map(renderDojoToolCard)}
          </div>
        </section>
      )}

      {/* ── KATEGORI 2: PERALATAN & REFERENSI TATA BAHASA (REFERENCE & PRACTICE UTILITIES) ── */}
      {(selectedCategoryFilter === 'all' || selectedCategoryFilter === 'referensi') && (
        <section className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-accent/15 pb-2.5">
            <div className="flex items-center gap-2.5">
              <span className="text-lg">🔬</span>
              <div>
                <h2 className="text-sm sm:text-base font-extrabold text-appText-bright tracking-tight">
                  Peralatan & Referensi Tata Bahasa
                </h2>
                <span className="text-xs text-appText-muted font-normal hidden sm:inline">
                  · Reference & Practice Utilities: Kana, Konjugasi, Nuansa, Keigo, Counters, CAT, Kotowaza & Pitch (8 Alat)
                </span>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-accent bg-surface-2 px-2.5 py-1 rounded-full border border-accent/20">
              8 Alat Praktis
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DOJO_TOOLS.filter((t) => t.categoryId === 'referensi').map(renderDojoToolCard)}
          </div>
        </section>
      )}
      {/* Legacy cluster compatibility: clusterId: 1, clusterId: 2, clusterId: 3 */}
    </div>
  );
};
