import React, { useState, useEffect, useMemo, Suspense } from 'react';
import {
  Search,
  Volume2,
  Sparkles,
  Filter,
  ChevronRight,
  LayoutGrid,
  List,
  ArrowLeft,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { useModalStore } from '../store/useModalStore';
import { JLPTLevel } from '../types/vocab';
import { loadVocab, loadGrammar, loadFreewayTrack, NormalizedVocab, NormalizedGrammar } from '../lib/data/dataManager';
import { speakJapanese } from '../lib/audio/tts';
import { BookTrackBrowser } from '../components/materi/BookTrackBrowser';
import { KanjiDojoView } from '../components/kanji/KanjiDojoView';
import { SkeletonGrid } from '../components/ui/SkeletonCard';
import { JapaneseFormattedText } from '../components/ui/JapaneseFormattedText';
import { RubyText } from '../components/ui/RubyText';
import { SyncStatusPill } from '../components/ui/SyncStatusPill';

// Lazy-load ChoukaiSimulatorPage to maintain modular bundle budget (<= 500 kB)
const ChoukaiSimulatorPage = React.lazy(() =>
  import('./ChoukaiSimulatorPage').then((m) => ({ default: m.ChoukaiSimulatorPage }))
);

export type ActiveDojoTool =
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
  | 'books'
  | null;

export interface DojoToolMeta {
  id: NonNullable<ActiveDojoTool>;
  clusterId: 1 | 2 | 3;
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
  // ── Cluster 1: Latihan Keterampilan Inti (Core Skills) ──
  {
    id: 'kanji',
    clusterId: 1,
    clusterName: 'Latihan Keterampilan Inti',
    clusterIcon: '🥋',
    title: 'Kanji Dojo & Stroke Animator',
    jpTitle: '漢字道場・筆順',
    desc: '2.136 Kanji Jouyou & Jinmeiyou lengkap dengan animasi goresan SVG, deteksi stroke order, dan latihan kanji interaktif.',
    badge: '2.136 Kanji · SVG Animasi',
    badgeColor: 'bg-amber-950/70 text-amber-300 border-amber-500/40 font-extrabold',
    icon: '漢',
    actionType: 'subview',
    canDo: 'Mengenali dan menulis Kanji sesuai urutan goresan standar.',
  },
  {
    id: 'choukai',
    clusterId: 1,
    clusterName: 'Latihan Keterampilan Inti',
    clusterIcon: '🥋',
    title: 'Choukai CBT Simulator',
    jpTitle: '聴解CBTシミュレーター',
    desc: '38 audio pelafalan otentik dan 163 soal simulasi ujian Choukai berstandar JFT-Basic dan Prometric CBT.',
    badge: '38 Audio · 163 Soal',
    badgeColor: 'bg-blue-950/70 text-blue-300 border-blue-500/40 font-extrabold',
    icon: '🎧',
    actionType: 'subview',
    canDo: 'Memahami percakapan cepat dan instruksi audio simulasi ujian.',
  },
  {
    id: 'pitch',
    clusterId: 1,
    clusterName: 'Latihan Keterampilan Inti',
    clusterIcon: '🥋',
    title: 'Pitch Accent Studio',
    jpTitle: 'アクセントスタジオ',
    desc: 'Visualisasi kontur nada Tokyo (Heiban, Atamadaka, Nakadaka, Odaka) dan pelatih minimal pairs kata bermakna ganda.',
    badge: 'Kontur Nada Tokyo',
    badgeColor: 'bg-purple-950/70 text-purple-300 border-purple-500/40 font-extrabold',
    icon: '🎵',
    actionType: 'modal',
    canDo: 'Melafalkan kata Jepang dengan kontur nada yang tepat.',
  },
  {
    id: 'cat',
    clusterId: 1,
    clusterName: 'Latihan Keterampilan Inti',
    clusterIcon: '🥋',
    title: 'Adaptive Placement Test (CAT)',
    jpTitle: '適応型プレースメントテスト',
    desc: 'Diagnosa kemampuan bahasa Jepang (JLPT N5–N1) secara presisi dalam 10–12 soal adaptif berbasis Item Response Theory (IRT).',
    badge: '10–12 Soal IRT Presisi',
    badgeColor: 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40 font-extrabold',
    icon: '🎯',
    actionType: 'modal',
    canDo: 'Mendiagnosa level kemampuan bahasa Jepang secara instan.',
  },

  // ── Cluster 2: Laboratorium Tata Bahasa & Budaya (Grammar & Culture Lab) ──
  {
    id: 'keigo',
    clusterId: 2,
    clusterName: 'Laboratorium Tata Bahasa & Budaya',
    clusterIcon: '🔬',
    title: 'Keigo Business Trainer',
    jpTitle: '敬語ビジネストレーナー',
    desc: 'Kuasai tata krama komunikasi bisnis Jepang: Sonkeigo (hormat), Kenjougo (merendah), Teineigo (sopan), dan etiket kerja.',
    badge: 'Etiket Bisnis Jepang',
    badgeColor: 'bg-indigo-950/70 text-indigo-300 border-indigo-500/40 font-extrabold',
    icon: '💼',
    actionType: 'modal',
    canDo: 'Berkomunikasi formal dan sopan di lingkungan kerja Jepang.',
  },
  {
    id: 'counters',
    clusterId: 2,
    clusterName: 'Laboratorium Tata Bahasa & Budaya',
    clusterIcon: '🔬',
    title: 'Counter Simulator (助数詞)',
    jpTitle: '助数詞シミュレーター',
    desc: 'Simulator kata bantu bilangan: pelajari pergeseran bunyi Onbin (本, 匹, dll.) dan 16 penggolong benda paling penting.',
    badge: '16 Penggolong Kata',
    badgeColor: 'bg-cyan-950/70 text-cyan-300 border-cyan-500/40 font-extrabold',
    icon: '🔢',
    actionType: 'modal',
    canDo: 'Menghitung berbagai objek dengan penggolong kata yang benar.',
  },
  {
    id: 'conjugation',
    clusterId: 2,
    clusterName: 'Laboratorium Tata Bahasa & Budaya',
    clusterIcon: '🔬',
    title: 'Verb Conjugation Engine',
    jpTitle: '動詞活用エンジン',
    desc: 'Eksplor 9 bentuk perubahan kata kerja Jepang (Te, Masu, Nai, Ba, Tara, Perintah, Pasif, Kausatif, dll.) dan deinflector.',
    badge: '9 Bentuk Konjugasi',
    badgeColor: 'bg-rose-950/70 text-rose-300 border-rose-500/40 font-extrabold',
    icon: '🔄',
    actionType: 'modal',
    canDo: 'Menguasai pola perubahan bentuk kata kerja secara sistematis.',
  },
  {
    id: 'nuance',
    clusterId: 2,
    clusterName: 'Laboratorium Tata Bahasa & Budaya',
    clusterIcon: '🔬',
    title: 'Nuance Inspector',
    jpTitle: 'ニュアンス比較',
    desc: 'Komparator perbedaan makna pola tata bahasa yang mirip (〜ように vs 〜ために, dll.) agar tidak tertukar dalam konteks nyata.',
    badge: 'Analisis Perbedaan Makna',
    badgeColor: 'bg-teal-950/70 text-teal-300 border-teal-500/40 font-extrabold',
    icon: '⚖️',
    actionType: 'modal',
    canDo: 'Membedakan nuansa halus antar pola tata bahasa serupa.',
  },
  {
    id: 'kotowaza',
    clusterId: 2,
    clusterName: 'Laboratorium Tata Bahasa & Budaya',
    clusterIcon: '🔬',
    title: 'Kotowaza Gallery 376+',
    jpTitle: 'ことわざギャラリー',
    desc: 'Koleksi 376+ peribahasa tradisional Jepang lengkap dengan filosofi hidup, hikmah budaya, dan padanan bahasa Indonesia.',
    badge: '376+ Peribahasa Tradisional',
    badgeColor: 'bg-amber-950/70 text-amber-300 border-amber-500/40 font-extrabold',
    icon: '📜',
    actionType: 'modal',
    canDo: 'Memahami peribahasa dan kebijaksanaan budaya Jepang.',
  },

  // ── Cluster 3: Perpustakaan & Referensi (Reference Library) ──
  {
    id: 'kana',
    clusterId: 3,
    clusterName: 'Perpustakaan & Referensi',
    clusterIcon: '📚',
    title: 'Interactive Kana Chart',
    jpTitle: '五十音表・かなチャート',
    desc: 'Bagan interaktif 46 Hiragana dan 46 Katakana dengan audio pelafalan asli, tabel dakuten, handakuten, dan yoon.',
    badge: '46 Hiragana & Katakana',
    badgeColor: 'bg-pink-950/70 text-pink-300 border-pink-500/40 font-extrabold',
    icon: '🔤',
    actionType: 'modal',
    canDo: 'Membaca dan melafalkan seluruh alfabet fonetik Kana.',
  },
  {
    id: 'books',
    clusterId: 3,
    clusterName: 'Perpustakaan & Referensi',
    clusterIcon: '📚',
    title: 'Standard Textbooks (9 Buku)',
    jpTitle: '標準教科書ライブラリ',
    desc: 'Pustaka kurikulum 9 buku teks standar: Minna no Nihongo I & II, Genki I & II, Irodori (Pemula, A1, A2), Marugoto dengan latihan otentik.',
    badge: '9 Seri Buku Populer',
    badgeColor: 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40 font-extrabold',
    icon: '📖',
    actionType: 'subview',
    canDo: 'Menyelaraskan studi mandiri dengan buku teks standar kursus/LPK.',
  },
];

export const MateriHubPage: React.FC = () => {
  const {
    selectedLevel, setSelectedLevel,
    searchQuery, setSearchQuery,
    showFurigana, setShowFurigana,
    showRomaji, setShowRomaji,
    cards,
    openDetailModal,
    materiStudio: activeStudio,
    setMateriStudio: setActiveStudio,
  } = useAppStore();

  // Active Tool Sub-View state
  const [activeTool, setActiveTool] = useState<ActiveDojoTool>(null);
  const [selectedClusterFilter, setSelectedClusterFilter] = useState<'all' | 'cluster1' | 'cluster2' | 'cluster3'>('all');
  const [hubSectionMode, setHubSectionMode] = useState<'dojo' | 'kamus'>('dojo');

  // JLPT Reference Dictionary state
  const [kurikulumSub, setKurikulumSub] = useState<'jlpt' | 'freeway'>('jlpt');
  const [activeTab, setActiveTab] = useState<'vocab' | 'grammar'>('vocab');
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');
  const [selectedParticle, setSelectedParticle] = useState<string>('all');
  const [selectedPos, setSelectedPos] = useState<string>('all');

  // Loaded items
  const [vocabList, setVocabList] = useState<NormalizedVocab[]>([]);
  const [grammarList, setGrammarList] = useState<NormalizedGrammar[]>([]);
  const [freewayList, setFreewayList] = useState<NormalizedGrammar[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Max items to render in list for instantaneous rendering
  const [renderLimit, setRenderLimit] = useState(60);

  // Synchronize activeStudio with activeTool
  useEffect(() => {
    if (activeStudio === 'kanji' && activeTool !== 'kanji') {
      setActiveTool('kanji');
    } else if (activeStudio === 'buku' && activeTool !== 'books') {
      setActiveTool('books');
    } else if (activeStudio === 'kurikulum' && (activeTool === 'kanji' || activeTool === 'books')) {
      setActiveTool(null);
    }
  }, [activeStudio]);

  // Load data whenever selectedLevel changes
  useEffect(() => {
    let isCancelled = false;
    const targetLevel: JLPTLevel = selectedLevel === 'all' ? 'n5' : selectedLevel;

    setIsLoading(true);
    Promise.all([
      loadVocab(targetLevel),
      loadGrammar(targetLevel),
      loadFreewayTrack(),
    ])
      .then(([vocabs, grammars, freeways]) => {
        if (!isCancelled) {
          setVocabList(vocabs);
          setGrammarList(grammars);
          setFreewayList(freeways);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (!isCancelled) setIsLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [selectedLevel]);

  // Handle Clean Back to Catalog
  const handleBackToCatalog = () => {
    setActiveTool(null);
    setActiveStudio('kurikulum');
  };

  // Keyboard 'Escape' and browser popstate event listener for clean back navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeTool !== null) {
        handleBackToCatalog();
      }
    };
    const handlePopState = () => {
      if (activeTool !== null) {
        handleBackToCatalog();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [activeTool]);

  // Dispatcher for opening tools
  const handleOpenTool = (toolId: NonNullable<ActiveDojoTool>) => {
    if (toolId === 'kanji') {
      setActiveStudio('kanji');
      setActiveTool('kanji');
    } else if (toolId === 'books') {
      setActiveStudio('buku');
      setActiveTool('books');
    } else if (toolId === 'choukai') {
      setActiveTool('choukai');
    } else if (toolId === 'pitch') {
      useModalStore.getState().openModal('pitch');
    } else if (toolId === 'cat') {
      useModalStore.getState().openModal('catPlacement');
    } else if (toolId === 'keigo') {
      useModalStore.getState().openModal('keigo');
    } else if (toolId === 'counters') {
      useModalStore.getState().openModal('counters');
    } else if (toolId === 'conjugation') {
      useModalStore.getState().openModal('conjugation');
    } else if (toolId === 'nuance') {
      useModalStore.getState().openModal('nuance');
    } else if (toolId === 'kotowaza') {
      useModalStore.getState().openModal('kotowaza');
    } else if (toolId === 'kana') {
      useModalStore.getState().openModal('kana');
    }
  };

  const jlptLevels: Array<{ id: JLPTLevel; label: string; desc: string; count: string }> = [
    { id: 'n5', label: 'JLPT N5', desc: 'Pemula', count: '1.321 Kata · 94 Pola' },
    { id: 'n4', label: 'JLPT N4', desc: 'Dasar Harian', count: '1.286 Kata · 92 Pola' },
    { id: 'n3', label: 'JLPT N3', desc: 'Menengah', count: '2.580 Kata · 163 Pola' },
    { id: 'n2', label: 'JLPT N2', desc: 'Pra-Lanjutan', count: '2.104 Kata · 310 Pola' },
    { id: 'n1', label: 'JLPT N1', desc: 'Mahir', count: '3.217 Kata · 200 Pola' },
  ];

  const particles = ['all', 'は', 'が', 'を', 'に', 'で', 'へ', 'と', 'も', 'から', 'まで'];

  // Canonical 7-category POS taxonomy required by tests/test-sprint-12-features.js
  const vocabPosFilters = [
    { id: 'all', label: 'Semua Kategori' },
    { id: 'verb', label: 'Kata Kerja (動詞)' },
    { id: 'adj', label: 'Kata Sifat (形容詞)' },
    { id: 'noun', label: 'Kata Benda (名詞)' },
    { id: 'adverb', label: 'Kata Keterangan (副詞)' },
    { id: 'counter', label: 'Bilangan & Counter (助数詞)' },
    { id: 'conjunction', label: 'Kata Hubung (接続詞)' },
    { id: 'expression', label: 'Ungkapan (表現)' },
  ];

  // Canonical predicate matching rules
  const filteredVocab = useMemo(() => {
    let list = vocabList;
    if (selectedPos !== 'all') {
      list = list.filter((v) => {
        const pos = (v.pos || '').toLowerCase();
        if (selectedPos === 'verb') return (pos.includes('verb') || pos.includes('kerja') || pos.includes('suru')) && !pos.includes('adverb');
        if (selectedPos === 'adj') return pos.includes('adj') || pos.includes('sifat');
        if (selectedPos === 'noun') return (pos.includes('noun') || pos.includes('benda')) && !pos.includes('suru');
        if (selectedPos === 'adverb') return pos.includes('adverb') || pos.includes('keterangan');
        if (selectedPos === 'counter') return pos.includes('counter') || pos.includes('bilangan') || pos.includes('angka');
        if (selectedPos === 'conjunction') return pos.includes('conjunction') || pos.includes('hubung') || pos.includes('sambung');
        if (selectedPos === 'expression') return pos.includes('exp') || pos.includes('ungkapan') || pos.includes('frasa');
        return true;
      });
    }

    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase().trim();
    return list.filter(
      (v) =>
        v.word.includes(q) ||
        v.reading.includes(q) ||
        v.romaji.toLowerCase().includes(q) ||
        v.meaning.toLowerCase().includes(q)
    );
  }, [vocabList, searchQuery, selectedPos]);

  // Filtered Grammar
  const filteredGrammar = useMemo(() => {
    let list = grammarList;
    if (selectedParticle !== 'all') {
      list = list.filter(
        (g) =>
          g.pattern.includes(selectedParticle) ||
          g.reading.includes(selectedParticle) ||
          (g.cat && g.cat.includes(selectedParticle))
      );
    }
    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase().trim();
    return list.filter(
      (g) =>
        g.pattern.toLowerCase().includes(q) ||
        g.reading.toLowerCase().includes(q) ||
        g.meaning.toLowerCase().includes(q)
    );
  }, [grammarList, searchQuery, selectedParticle]);

  // Active Tool metadata
  const activeToolMeta = DOJO_TOOLS.find((t) => t.id === activeTool);

  // Helper to render consistent, accessible Dojo Tool Cards
  const renderDojoToolCard = (tool: DojoToolMeta) => (
    <div
      key={tool.id}
      role="button"
      tabIndex={0}
      onClick={() => handleOpenTool(tool.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleOpenTool(tool.id);
        }
      }}
      aria-label={`${tool.title}: ${tool.desc}`}
      className="bg-surface-2 hover:bg-surface-3 border border-accent/20 hover:border-accent/40 rounded-2xl p-4 sm:p-5 flex flex-col justify-between cursor-pointer transition-all hover:-translate-y-0.5 shadow-sm group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-95"
    >
      <div className="space-y-2.5">
        <div className="flex items-start justify-between gap-2">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-surface/80 border border-accent/20 flex items-center justify-center text-lg sm:text-xl shadow-xs group-hover:scale-105 transition-transform shrink-0 font-japanese font-black">
            {tool.icon}
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${tool.badgeColor} shrink-0`}>
            {tool.badge}
          </span>
        </div>
        <div>
          <h3 className="text-sm sm:text-base font-bold text-appText-bright group-hover:text-amber-400 transition-colors">
            {tool.title}
          </h3>
          <p className="text-[11px] font-mono text-appText-muted mt-0.5" lang="ja">
            {tool.jpTitle}
          </p>
        </div>
        <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
          {tool.desc}
        </p>
      </div>

      <div className="mt-3 pt-2.5 border-t border-accent/15 flex items-center justify-between text-[11px]">
        <span className="text-[10px] text-amber-200/90 font-bold line-clamp-1">
          {tool.canDo}
        </span>
        <span className="text-amber-400 font-extrabold group-hover:translate-x-1 transition-transform shrink-0 ml-1">
          Buka →
        </span>
      </div>
    </div>
  );

  // ── Render Focused Sub-View with Sticky Back Header Bar ──
  if (activeTool !== null) {
    return (
      <div className="w-full min-h-screen pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12 animate-in fade-in duration-200">
        {/* Sticky Top Bar for Focused Sub-View */}
        <div className="sticky top-0 z-30 bg-surface/95 backdrop-blur-md border-b border-accent/20 px-3 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between shadow-sm">
          <button
            type="button"
            onClick={handleBackToCatalog}
            className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-surface-2 hover:bg-surface-3 border border-accent/20 hover:border-accent/40 text-appText-bright text-xs sm:text-sm font-bold transition-all active:scale-95 min-h-[40px] shadow-xs"
            aria-label="Kembali ke Katalog Dojo"
          >
            <ArrowLeft className="w-4 h-4 text-accent" />
            <span>← Kembali ke Katalog Dojo</span>
          </button>

          <div className="text-xs sm:text-sm font-extrabold text-appText-bright flex items-center gap-2 truncate max-w-[200px] sm:max-w-none">
            <span className="text-base">{activeToolMeta?.icon}</span>
            <span className="truncate">{activeToolMeta?.title}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <SyncStatusPill />
          </div>
        </div>

        {/* Dedicated Tool Content Mounting */}
        <div className="max-w-5xl mx-auto px-3 sm:px-4 pt-4 sm:pt-6">
          {activeTool === 'kanji' && (
            <KanjiDojoView
              onAskSensei={(prompt) => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(
                    new CustomEvent('nn_open_sensei_sheet', {
                      detail: { initialContext: prompt },
                    })
                  );
                }
              }}
            />
          )}

          {activeTool === 'books' && (
            <BookTrackBrowser
              vocabList={vocabList}
              grammarList={grammarList}
              onSelectItem={(item, type) => {
                openDetailModal(item, type);
              }}
            />
          )}

          {activeTool === 'choukai' && (
            <Suspense
              fallback={
                <div className="py-12 text-center text-appText-muted">
                  <SkeletonGrid count={4} />
                </div>
              }
            >
              <ChoukaiSimulatorPage />
            </Suspense>
          )}

          {/* Fallback Focused Card for Modal-Based Tools */}
          {activeTool !== 'kanji' && activeTool !== 'books' && activeTool !== 'choukai' && activeToolMeta && (
            <div className="max-w-2xl mx-auto py-8 text-center space-y-6 bg-surface-2 rounded-3xl p-6 sm:p-10 border border-accent/25 shadow-sm">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-3xl sm:text-4xl shadow-inner">
                {activeToolMeta.icon}
              </div>
              <div className="space-y-2">
                <span className={`inline-block text-[11px] font-bold px-3 py-1 rounded-full border ${activeToolMeta.badgeColor}`}>
                  {activeToolMeta.badge}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-appText-bright">
                  {activeToolMeta.title}
                </h2>
                <p className="text-xs sm:text-sm text-appText-muted font-mono" lang="ja">
                  {activeToolMeta.jpTitle}
                </p>
                <p className="text-xs sm:text-sm text-appText-muted max-w-lg mx-auto leading-relaxed pt-2">
                  {activeToolMeta.desc}
                </p>
              </div>

              <div className="p-3.5 bg-surface rounded-2xl border border-accent/15 text-xs text-accent font-medium text-left">
                🎯 <strong>Target Capaian:</strong> {activeToolMeta.canDo}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleOpenTool(activeToolMeta.id)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-accent text-bg hover:bg-accent-hot text-xs sm:text-sm font-bold transition-all shadow-sm active:scale-95 min-h-[44px]"
                >
                  Luncurkan {activeToolMeta.title}
                </button>
                <button
                  type="button"
                  onClick={handleBackToCatalog}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-surface-3 hover:bg-surface border border-accent/20 text-appText-bright text-xs sm:text-sm font-bold transition-all active:scale-95 min-h-[44px]"
                >
                  ← Kembali ke Katalog Dojo
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Render Consolidated Dojo & Pustaka Catalog ──
  return (
    <div className="max-w-5xl mx-auto py-3 sm:py-6 pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12 space-y-6 sm:space-y-8 animate-in fade-in duration-300 min-w-0 max-w-full overflow-x-hidden px-3 sm:px-4">
      {/* ── Main Catalog Header with Dual Segmented Mode Switcher ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-accent/15 pb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <h1 className="text-lg sm:text-2xl font-extrabold text-appText-bright tracking-tight">
              Materi Hub & Dojo <span className="text-xs sm:text-sm font-normal text-appText-muted">· 学習ハブ・道場</span>
            </h1>
            <SyncStatusPill />
          </div>
          <p className="text-xs text-appText-muted mt-0.5">
            {hubSectionMode === 'dojo'
              ? '11 Alat interaktif, laboratorium tata bahasa, audio choukai & simulator CBT.'
              : 'Eksplorasi 10.500+ kosakata dan 850+ pola kalimat JLPT N5–N1 & Jalur Freeway.'}
          </p>
        </div>

        {/* High-Level Segmented Mode: [ 🥋 Dojo (11 Alat) ] vs [ 📖 Kamus & Indeks ] */}
        <div className="flex items-center p-1 bg-surface-2 border border-accent/20 rounded-2xl shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setHubSectionMode('dojo')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 ${
              hubSectionMode === 'dojo'
                ? 'bg-amber-500 text-stone-950 font-black shadow-sm'
                : 'text-appText-muted hover:text-appText-bright'
            }`}
          >
            <span>🥋</span>
            <span>Dojo (11 Alat)</span>
          </button>
          <button
            type="button"
            onClick={() => setHubSectionMode('kamus')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 ${
              hubSectionMode === 'kamus'
                ? 'bg-amber-500 text-stone-950 font-black shadow-sm'
                : 'text-appText-muted hover:text-appText-bright'
            }`}
          >
            <span>📖</span>
            <span>Kamus & Indeks</span>
          </button>
        </div>
      </div>

      {/* ── DOJO MODE: 11 Interactive Tools across 3 Pedagogical Clusters ── */}
      {hubSectionMode === 'dojo' && (
        <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
          {/* Cluster Jump Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 max-w-full">
            {[
              { id: 'all', label: 'Semua Alat (11)', icon: '🥋' },
              { id: 'cluster1', label: 'Keterampilan Inti (4)', icon: '🥋' },
              { id: 'cluster2', label: 'Lab Bahasa & Budaya (5)', icon: '🔬' },
              { id: 'cluster3', label: 'Pustaka & Buku (2)', icon: '📚' },
            ].map((tab) => {
              const isSelected = selectedClusterFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedClusterFilter(tab.id as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all active:scale-95 flex items-center gap-1.5 min-h-[40px] border ${
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

          {/* ── CLUSTER 1: LATIHAN KETERAMPILAN INTI (CORE SKILLS) ── */}
          {(selectedClusterFilter === 'all' || selectedClusterFilter === 'cluster1') && (
            <section className="space-y-3.5 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-accent/15 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg">🥋</span>
                  <h2 className="text-sm sm:text-base font-extrabold text-appText-bright tracking-tight">
                    Cluster 1: Latihan Keterampilan Inti
                  </h2>
                  <span className="text-xs text-appText-muted font-normal hidden sm:inline">
                    · Core Japanese Skills (4 Alat)
                  </span>
                </div>
                <span className="text-[11px] font-mono font-bold text-accent">
                  4 Alat Interaktif
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {DOJO_TOOLS.filter((t) => t.clusterId === 1).map(renderDojoToolCard)}
              </div>
            </section>
          )}

          {/* ── CLUSTER 2: LABORATORIUM TATA BAHASA & BUDAYA (GRAMMAR & CULTURE LAB) ── */}
          {(selectedClusterFilter === 'all' || selectedClusterFilter === 'cluster2') && (
            <section className="space-y-3.5 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-accent/15 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg">🔬</span>
                  <h2 className="text-sm sm:text-base font-extrabold text-appText-bright tracking-tight">
                    Cluster 2: Laboratorium Tata Bahasa & Budaya
                  </h2>
                  <span className="text-xs text-appText-muted font-normal hidden sm:inline">
                    · Grammar, Nuance, & Cultural Lab (5 Alat)
                  </span>
                </div>
                <span className="text-[11px] font-mono font-bold text-accent">
                  5 Lab Interaktif
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {DOJO_TOOLS.filter((t) => t.clusterId === 2).map(renderDojoToolCard)}
              </div>
            </section>
          )}

          {/* ── CLUSTER 3: PERPUSTAKAAN & REFERENSI (REFERENCE LIBRARY) ── */}
          {(selectedClusterFilter === 'all' || selectedClusterFilter === 'cluster3') && (
            <section className="space-y-3.5 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-accent/15 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg">📚</span>
                  <h2 className="text-sm sm:text-base font-extrabold text-appText-bright tracking-tight">
                    Cluster 3: Perpustakaan & Referensi Standar
                  </h2>
                  <span className="text-xs text-appText-muted font-normal hidden sm:inline">
                    · Reference Library & Textbooks (2 Koleksi)
                  </span>
                </div>
                <span className="text-[11px] font-mono font-bold text-accent">
                  2 Referensi Standar
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {DOJO_TOOLS.filter((t) => t.clusterId === 3).map(renderDojoToolCard)}
              </div>
            </section>
          )}
        </div>
      )}

      {/* ── KAMUS & INDEKS MODE: JLPT N5–N1 & JALUR FREEWAY ── */}
      {hubSectionMode === 'kamus' && (
        <section className="space-y-5 animate-in fade-in duration-200">
          {/* Sub-Track Switcher Header (JLPT Kamus vs Freeway) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-2/60 border border-accent/15 rounded-2xl p-3.5 sm:p-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-appText-bright flex items-center gap-2">
                <span>📖</span>
                <span>Kamus & Indeks Referensi</span>
              </h2>
              <p className="text-xs text-appText-muted mt-0.5">
                Eksplorasi 10.500+ kosakata dan 850+ pola tata bahasa lengkap dengan audio pelafalan asli.
              </p>
            </div>

            {/* Segmented Switcher: Kamus JLPT vs Jalur Freeway */}
            <div className="flex items-center p-1 bg-surface-3/80 rounded-xl border border-accent/20 shrink-0 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setKurikulumSub('jlpt')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all min-h-[36px] active:scale-95 ${
                  kurikulumSub === 'jlpt'
                    ? 'bg-amber-500 text-stone-950 font-black shadow-sm'
                    : 'text-appText-muted hover:text-appText-bright'
                }`}
              >
                Kamus JLPT
              </button>
              <button
                type="button"
                onClick={() => setKurikulumSub('freeway')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all min-h-[36px] active:scale-95 ${
                  kurikulumSub === 'freeway'
                    ? 'bg-amber-500 text-stone-950 font-black shadow-sm'
                    : 'text-appText-muted hover:text-appText-bright'
                }`}
              >
                Jalur Freeway
              </button>
            </div>
          </div>

          {/* ── View A: Kamus JLPT N5–N1 ── */}
          {kurikulumSub === 'jlpt' && (
            <div className="space-y-4">
              {/* Row 1: Level Selector Pills & Content Type Segmented Toggle */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                {/* Level Selector Pills */}
                <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {jlptLevels.map((lvl) => {
                    const isSelected = (selectedLevel === 'all' ? 'n5' : selectedLevel) === lvl.id;
                    return (
                      <button
                        key={lvl.id}
                        type="button"
                        onClick={() => {
                          setSelectedLevel(lvl.id);
                          setRenderLimit(60);
                        }}
                        className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border min-h-[40px] active:scale-95 ${
                          isSelected
                            ? 'bg-amber-500 text-stone-950 border-amber-500 font-black shadow-sm'
                            : 'bg-surface-2 border-accent/20 text-appText-muted hover:text-appText-bright hover:border-accent/40'
                        }`}
                      >
                        <span>{lvl.label}</span>
                        <span className="opacity-80 text-[11px] ml-1.5 font-normal hidden sm:inline">({lvl.desc})</span>
                      </button>
                    );
                  })}
                </div>

                {/* Sub-Tabs: Kosakata vs Tata Bahasa */}
                <div className="flex items-center p-1 bg-surface-2 border border-accent/20 rounded-xl shrink-0 self-start md:self-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('vocab');
                      setRenderLimit(60);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all min-h-[36px] active:scale-95 ${
                      activeTab === 'vocab'
                        ? 'bg-accent text-bg font-black shadow-sm'
                        : 'text-appText-muted hover:text-appText-bright'
                    }`}
                  >
                    Kosakata ({filteredVocab.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('grammar');
                      setRenderLimit(60);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all min-h-[36px] active:scale-95 ${
                      activeTab === 'grammar'
                        ? 'bg-accent text-bg font-black shadow-sm'
                        : 'text-appText-muted hover:text-appText-bright'
                    }`}
                  >
                    Tata Bahasa ({filteredGrammar.length})
                  </button>
                </div>
              </div>

              {/* Row 2: Unified Search Input + Display Toggles (Furigana, Romaji, View Mode) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-appText-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Cari kosakata / tata bahasa ${(selectedLevel === 'all' ? 'n5' : selectedLevel).toUpperCase()}...`}
                    className="w-full bg-surface-2 border border-accent/20 rounded-xl pl-9 pr-9 py-2 sm:py-2.5 text-xs text-appText-bright placeholder:text-appText-muted/60 focus:outline-none focus:border-accent transition-colors min-h-[40px]"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-appText-muted hover:text-appText-bright p-1"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0 min-h-[40px] min-w-[40px] rounded-xl">
                  {/* Furigana Toggle Chip */}
                  <button
                    type="button"
                    onClick={() => setShowFurigana(!showFurigana)}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all border min-h-[40px] flex items-center gap-1 active:scale-95 ${
                      showFurigana
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-xs'
                        : 'bg-surface-2 border-accent/20 text-appText-muted hover:text-appText-bright'
                    }`}
                    title="Tampilkan / Sembunyikan Furigana"
                    aria-pressed={showFurigana}
                  >
                    <span className="font-japanese text-xs">振</span>
                    <span className="hidden sm:inline">Furigana</span>
                  </button>

                  {/* Romaji Toggle Chip */}
                  <button
                    type="button"
                    onClick={() => setShowRomaji(!showRomaji)}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all border min-h-[40px] flex items-center gap-1 active:scale-95 ${
                      showRomaji
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-xs'
                        : 'bg-surface-2 border-accent/20 text-appText-muted hover:text-appText-bright'
                    }`}
                    title="Tampilkan / Sembunyikan Romaji"
                    aria-pressed={showRomaji}
                  >
                    <span className="font-mono text-xs">Aa</span>
                    <span className="hidden sm:inline">Romaji</span>
                  </button>

                  {/* View Mode Switcher (Grid vs Compact List) */}
                  <div className="flex items-center gap-1 bg-surface-2 p-1 rounded-xl border border-accent/20 shrink-0">
                    <button
                      type="button"
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center active:scale-95 ${
                        viewMode === 'grid'
                          ? 'bg-accent text-bg shadow-sm'
                          : 'text-appText-muted hover:text-appText-bright'
                      }`}
                      title="Tampilan Kartu Grid"
                      aria-label="Tampilan Kartu Grid"
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode('compact')}
                      className={`p-2 rounded-lg transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center active:scale-95 ${
                        viewMode === 'compact'
                          ? 'bg-accent text-bg shadow-sm'
                          : 'text-appText-muted hover:text-appText-bright'
                      }`}
                      title="Tampilan Daftar Ringkas"
                      aria-label="Tampilan Daftar Ringkas"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Row 3: Secondary Filter Pills */}
              {activeTab === 'vocab' ? (
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none max-w-full">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-accent shrink-0 mr-1 flex items-center gap-1">
                    <Filter className="w-3 h-3" />
                    <span>Kategori:</span>
                  </span>
                  {vocabPosFilters.map((pos) => {
                    const isSelected = selectedPos === pos.id;
                    return (
                      <button
                        key={pos.id}
                        type="button"
                        onClick={() => {
                          setSelectedPos(pos.id);
                          setRenderLimit(60);
                        }}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border min-h-[36px] active:scale-95 ${
                          isSelected
                            ? 'bg-amber-500 text-stone-950 border-amber-500 font-bold shadow-sm'
                            : 'bg-surface-2 border-accent/15 text-appText-muted hover:text-appText-bright'
                        }`}
                      >
                        {pos.label}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none max-w-full">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-accent shrink-0 mr-1 flex items-center gap-1">
                    <Filter className="w-3 h-3" />
                    <span>Partikel:</span>
                  </span>
                  {particles.map((p) => {
                    const isSelected = selectedParticle === p;
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => {
                          setSelectedParticle(p);
                          setRenderLimit(60);
                        }}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border min-h-[36px] active:scale-95 ${
                          isSelected
                            ? 'bg-amber-500 text-stone-950 border-amber-500 font-bold shadow-sm'
                            : 'bg-surface-2 border-accent/15 text-appText-muted hover:text-appText-bright'
                        }`}
                      >
                        {p === 'all' ? 'Semua Partikel' : p}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Content Loading State */}
              {isLoading ? (
                <div className="py-2">
                  <SkeletonGrid count={6} />
                </div>
              ) : activeTab === 'vocab' ? (
                /* VOCAB LISTING */
                <div className="space-y-4">
                  {filteredVocab.length === 0 ? (
                    <div className="text-center py-12 bg-surface-2 rounded-2xl border border-accent/15">
                      <p className="text-sm text-appText-muted">Tidak ditemukan kosakata yang sesuai pencarian.</p>
                    </div>
                  ) : viewMode === 'grid' ? (
                    /* Grid View */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                      {filteredVocab.slice(0, renderLimit).map((v) => (
                        <div
                          key={v.id}
                          role="button"
                          tabIndex={0}
                          onClick={() => openDetailModal(v, 'vocab')}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              openDetailModal(v, 'vocab');
                            }
                          }}
                          aria-label={`Detail kosakata ${v.word}: ${v.meaning}`}
                          className="bg-surface-2 hover:bg-surface-3 border border-accent/20 hover:border-accent/40 rounded-2xl p-4 flex flex-col justify-between cursor-pointer transition-all hover:-translate-y-0.5 shadow-sm group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="text-xl font-jp font-bold text-appText-bright group-hover:text-amber-400 font-extrabold transition-colors" lang="ja">
                                {v.word}
                              </div>
                              {showFurigana && v.reading && v.reading !== v.word && (
                                <div className="text-xs font-jp text-amber-400/80" lang="ja">
                                  【{v.reading}】
                                </div>
                              )}
                              {showRomaji && v.romaji && (
                                <div className="text-[11px] font-mono text-appText-muted">
                                  {v.romaji}
                                </div>
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                speakJapanese(v.word);
                              }}
                              className="w-11 h-11 min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] rounded-xl bg-surface/70 hover:bg-amber-500/20 text-appText-muted hover:text-accent-hot flex items-center justify-center transition-all active:scale-95 shrink-0"
                              title="Dengarkan pelafalan"
                              aria-label={`Dengarkan pelafalan ${v.word}`}
                            >
                              <Volume2 className="w-5 h-5" />
                            </button>
                          </div>

                          <div className="text-xs text-stone-200 font-medium mt-2 line-clamp-1">
                            {v.meaning}
                          </div>

                          <div className="mt-3 pt-2 border-t border-accent/10 flex items-center justify-between text-[10px] text-appText-muted">
                            <div className="flex items-center gap-1.5">
                              <span className="capitalize">{v.pos}</span>
                              {cards[v.id]?.card && (
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/15 text-accent border border-amber-500/30">
                                  <Sparkles className="w-2.5 h-2.5" />
                                  <span>FSRS</span>
                                </span>
                              )}
                            </div>
                            <span className="opacity-0 group-hover:opacity-100 text-accent transition-opacity">
                              Detail →
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Compact List View */
                    <div className="space-y-1.5">
                      {filteredVocab.slice(0, renderLimit).map((v) => (
                        <div
                          key={v.id}
                          role="button"
                          tabIndex={0}
                          onClick={() => openDetailModal(v, 'vocab')}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              openDetailModal(v, 'vocab');
                            }
                          }}
                          aria-label={`Detail kosakata ${v.word}: ${v.meaning}`}
                          className="p-3 rounded-xl bg-surface-2 hover:bg-surface-3 border border-accent/15 hover:border-accent/35 flex items-center justify-between gap-3 cursor-pointer transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                speakJapanese(v.word);
                              }}
                              className="w-11 h-11 min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] rounded-xl bg-surface hover:bg-amber-500/20 text-appText-muted hover:text-accent flex items-center justify-center shrink-0 transition-all active:scale-95"
                              title="Dengarkan pelafalan"
                              aria-label={`Dengarkan pelafalan ${v.word}`}
                            >
                              <Volume2 className="w-5 h-5" />
                            </button>

                            <div className="min-w-0">
                              <div className="flex items-baseline gap-2">
                                <span className="text-base font-jp font-bold text-appText-bright group-hover:text-accent transition-colors" lang="ja">
                                  {showFurigana ? (
                                    <RubyText text={v.word} furigana={v.reading} />
                                  ) : (
                                    v.word
                                  )}
                                </span>
                                {showRomaji && v.romaji && (
                                  <span className="text-[11px] font-mono text-appText-muted hidden sm:inline">
                                    {v.romaji}
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-stone-300 truncate">
                                {v.meaning}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {cards[v.id]?.card && (
                              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-accent border border-amber-500/30">
                                FSRS
                              </span>
                            )}
                            <ChevronRight className="w-4 h-4 text-appText-muted opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Load More Pagination */}
                  {filteredVocab.length > renderLimit && (
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 pt-3 w-full">
                      <button
                        type="button"
                        onClick={() => setRenderLimit((prev) => prev + 60)}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-surface-2 border border-accent/20 hover:border-accent/40 text-xs font-bold text-appText-bright transition-all min-h-[40px] active:scale-95"
                      >
                        Muat +60 Lagi ({filteredVocab.length - renderLimit} tersisa)
                      </button>
                      <button
                        type="button"
                        onClick={() => setRenderLimit(filteredVocab.length)}
                        className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-accent text-bg hover:bg-accent-hot text-xs font-bold transition-all shadow-sm min-h-[40px] active:scale-95"
                      >
                        Tampilkan Semua ({filteredVocab.length})
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* GRAMMAR LISTING */
                <div className="space-y-4">
                  {filteredGrammar.length === 0 ? (
                    <div className="text-center py-12 bg-surface-2 rounded-2xl border border-accent/15">
                      <p className="text-sm text-appText-muted">Tidak ditemukan pola tata bahasa yang sesuai pencarian.</p>
                    </div>
                  ) : viewMode === 'grid' ? (
                    /* Grid View */
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {filteredGrammar.slice(0, renderLimit).map((g) => (
                        <div
                          key={g.id}
                          role="button"
                          tabIndex={0}
                          onClick={() => openDetailModal(g, 'grammar')}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              openDetailModal(g, 'grammar');
                            }
                          }}
                          aria-label={`Detail tata bahasa ${g.pattern}: ${g.meaning}`}
                          className="bg-surface-2 hover:bg-surface-3 border border-accent/20 hover:border-accent/40 rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all hover:-translate-y-0.5 shadow-sm group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="text-lg font-jp font-bold text-appText-bright group-hover:text-amber-400 font-extrabold transition-colors" lang="ja">
                                {g.pattern}
                              </div>
                              {g.reading && (
                                <div className="text-xs text-appText-muted font-mono" lang="ja">
                                  {g.reading}
                                </div>
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                speakJapanese(g.pattern);
                              }}
                              className="w-11 h-11 min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] rounded-xl bg-surface/70 hover:bg-amber-500/20 text-appText-muted hover:text-accent-hot flex items-center justify-center transition-all active:scale-95 shrink-0"
                              title="Dengarkan pelafalan"
                              aria-label={`Dengarkan pelafalan ${g.pattern}`}
                            >
                              <Volume2 className="w-5 h-5" />
                            </button>
                          </div>

                          <div className="text-xs text-stone-200 font-medium mt-2 line-clamp-2">
                            {g.meaning}
                          </div>

                          <div className="mt-4 pt-2 border-t border-accent/10 flex items-center justify-between text-[10px] text-appText-muted">
                            <div className="flex items-center gap-1.5">
                              <span>{g.cat || 'Pola Kalimat'}</span>
                              {cards[g.id]?.card && (
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/15 text-accent border border-amber-500/30">
                                  <Sparkles className="w-2.5 h-2.5" />
                                  <span>FSRS</span>
                                </span>
                              )}
                            </div>
                            <span className="opacity-0 group-hover:opacity-100 text-accent transition-opacity">
                              Detail & Contoh →
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Compact List View */
                    <div className="space-y-1.5">
                      {filteredGrammar.slice(0, renderLimit).map((g) => (
                        <div
                          key={g.id}
                          role="button"
                          tabIndex={0}
                          onClick={() => openDetailModal(g, 'grammar')}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              openDetailModal(g, 'grammar');
                            }
                          }}
                          aria-label={`Detail tata bahasa ${g.pattern}: ${g.meaning}`}
                          className="p-3 rounded-xl bg-surface-2 hover:bg-surface-3 border border-accent/15 hover:border-accent/35 flex items-center justify-between gap-3 cursor-pointer transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                speakJapanese(g.pattern);
                              }}
                              className="w-11 h-11 min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] rounded-xl bg-surface hover:bg-amber-500/20 text-appText-muted hover:text-accent flex items-center justify-center shrink-0 transition-all active:scale-95"
                              title="Dengarkan pelafalan"
                              aria-label={`Dengarkan pelafalan ${g.pattern}`}
                            >
                              <Volume2 className="w-5 h-5" />
                            </button>

                            <div className="min-w-0">
                              <div className="flex items-baseline gap-2">
                                <span className="text-base font-jp font-bold text-appText-bright group-hover:text-accent transition-colors" lang="ja">
                                  {g.pattern}
                                </span>
                                {showFurigana && g.reading && (
                                  <span className="text-xs font-mono text-amber-400/80" lang="ja">
                                    {g.reading}
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-stone-300 truncate">
                                {g.meaning}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[10px] text-appText-muted bg-surface px-2 py-0.5 rounded-md border border-accent/10">
                              {g.cat || 'Tata Bahasa'}
                            </span>
                            <ChevronRight className="w-4 h-4 text-appText-muted opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Load More Pagination */}
                  {filteredGrammar.length > renderLimit && (
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 pt-3 w-full">
                      <button
                        type="button"
                        onClick={() => setRenderLimit((prev) => prev + 60)}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-surface-2 border border-accent/20 hover:border-accent/40 text-xs font-bold text-appText-bright transition-all min-h-[40px] active:scale-95"
                      >
                        Muat +60 Lagi ({filteredGrammar.length - renderLimit} tersisa)
                      </button>
                      <button
                        type="button"
                        onClick={() => setRenderLimit(filteredGrammar.length)}
                        className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-accent text-bg hover:bg-accent-hot text-xs font-bold transition-all shadow-sm min-h-[40px] active:scale-95"
                      >
                        Tampilkan Semua ({filteredGrammar.length})
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ── View B: Jalur Freeway (Survival Japanese) ── */}
          {kurikulumSub === 'freeway' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-gradient-to-r from-amber-950/40 via-surface-2 to-surface-2 border border-accent/25 rounded-3xl p-6 sm:p-8 space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-accent-hot text-xs font-bold">
                  <span>🛣️ Jalur Freeway · Survival Japanese</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-appText-bright">
                  21 Pola Paling Fundamental untuk Bertahan Hidup
                </h3>
                <p className="text-xs text-appText-muted leading-relaxed max-w-2xl">
                  Dirancang khusus untuk pemula yang belum mengenal tata bahasa rumit. Urutan terstruktur mulai dari salam, permisi (*sumimasen*), memperkenalkan diri (*wa desu*), bertanya (*wa desu ka*), tunjuk barang (*kore/sore/are*), hingga meminta tolong (*te kudasai*).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {freewayList.map((item, index) => (
                  <div
                    key={item.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => openDetailModal(item, 'grammar')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openDetailModal(item, 'grammar');
                      }
                    }}
                    aria-label={`Pola freeway ${item.pattern}: ${item.meaning}`}
                    className="bg-surface-2 hover:bg-surface-3 border border-accent/20 hover:border-accent/40 rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all hover:-translate-y-0.5 shadow-sm group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-accent border border-amber-500/30">
                            Langkah #{index + 1}
                          </span>
                        </div>
                        <div className="text-xl font-jp font-bold text-appText-bright group-hover:text-amber-400 font-extrabold transition-colors" lang="ja">
                          {item.pattern}
                        </div>
                        {item.reading && (
                          <div className="text-xs text-appText-muted font-mono" lang="ja">
                            {item.reading}
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          speakJapanese(item.pattern);
                        }}
                        className="w-11 h-11 min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] rounded-xl bg-surface hover:bg-amber-500/20 text-appText-muted hover:text-accent flex items-center justify-center transition-all shrink-0 active:scale-95"
                        title="Dengarkan pelafalan"
                        aria-label={`Dengarkan pelafalan ${item.pattern}`}
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="text-xs text-stone-200 font-medium mt-3">
                      {item.meaning}
                    </div>

                    {item.examples?.[0] && (
                      <div className="mt-3 pt-3 border-t border-accent/10 text-xs text-appText-muted italic">
                        <JapaneseFormattedText text={`"${item.examples[0].jp}"`} /> ({item.examples[0].id})
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
};