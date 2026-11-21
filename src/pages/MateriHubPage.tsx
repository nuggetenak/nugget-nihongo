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
import { BudouxText } from '../components/ui/BudouxText';
import { SyncStatusPill } from '../components/ui/SyncStatusPill';
import { ExamLmsHub } from '../components/exercise/ExamLmsHub';
import { useExerciseStore } from '../store/useExerciseStore';
import { ReflexDrillsPillar, DictionaryPillar, ReferencePillar, CbtSimulatorPillar } from '../features/dojo/pillars';

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
  categoryId: 'kemahiran' | 'referensi';
  categoryName: string;
  categoryIcon: string;
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
    badge: 'Etiket Bisnis Jepang',
    badgeColor: 'bg-surface-3/90 text-appText-bright border-accent/25 font-semibold',
    icon: '💼',
    actionType: 'modal',
    canDo: 'Berkomunikasi formal dan sopan di lingkungan kerja Jepang.',
  },
  {
    id: 'counters',
    categoryId: 'referensi',
    categoryName: 'Peralatan & Referensi Tata Bahasa',
    categoryIcon: '🔢',
    clusterId: 2,
    clusterName: 'Laboratorium Tata Bahasa & Budaya',
    clusterIcon: '🔬',
    title: 'Pelatih Bilangan & Kata Bantu Hitung',
    jpTitle: '助数詞シミュレーター',
    desc: 'Simulator kata bantu bilangan: pelajari pergeseran bunyi Onbin (本, 匹, dll.) dan 16 penggolong benda paling penting dalam keseharian.',
    badge: '16 Penggolong Kata',
    badgeColor: 'bg-surface-3/90 text-appText-bright border-accent/25 font-semibold',
    icon: '🔢',
    actionType: 'modal',
    canDo: 'Menghitung berbagai objek dengan penggolong kata yang benar.',
  },
  {
    id: 'cat',
    categoryId: 'referensi',
    categoryName: 'Peralatan & Referensi Tata Bahasa',
    categoryIcon: '🎯',
    clusterId: 1,
    clusterName: 'Latihan Keterampilan Inti',
    clusterIcon: '🥋',
    title: 'Tes Penempatan Adaptif CAT',
    jpTitle: '適応型プレースメントテスト',
    desc: 'Diagnosa kemampuan bahasa Jepang (JLPT N5–N1) secara presisi dalam 10–12 soal adaptif berbasis Item Response Theory (IRT 3PL).',
    badge: '10–12 Soal IRT Presisi',
    badgeColor: 'bg-surface-3/90 text-appText-bright border-accent/25 font-semibold',
    icon: '🎯',
    actionType: 'modal',
    canDo: 'Mendiagnosa level kemampuan bahasa Jepang secara instan.',
  },
  {
    id: 'kotowaza',
    categoryId: 'referensi',
    categoryName: 'Peralatan & Referensi Tata Bahasa',
    categoryIcon: '📜',
    clusterId: 2,
    clusterName: 'Laboratorium Tata Bahasa & Budaya',
    clusterIcon: '🔬',
    title: '52 Peribahasa Tradisional Kotowaza',
    jpTitle: 'ことわざギャラリー',
    desc: 'Galeri 52 kebijaksanaan dan peribahasa tradisional Jepang lengkap dengan filosofi hidup, hikmah budaya, dan padanan bahasa Indonesia.',
    badge: '52 Peribahasa Tradisional',
    badgeColor: 'bg-surface-3/90 text-appText-bright border-accent/25 font-semibold',
    icon: '📜',
    actionType: 'modal',
    canDo: 'Memahami peribahasa dan kebijaksanaan budaya Jepang.',
  },
  {
    id: 'pitch',
    categoryId: 'referensi',
    categoryName: 'Peralatan & Referensi Tata Bahasa',
    categoryIcon: '🎵',
    clusterId: 1,
    clusterName: 'Latihan Keterampilan Inti',
    clusterIcon: '🥋',
    title: 'Pitch Accent Studio',
    jpTitle: 'アクセントスタジオ',
    desc: 'Visualisasi kontur nada Tokyo (Heiban, Atamadaka, Nakadaka, Odaka) dan pelatih minimal pairs kata bermakna ganda.',
    badge: 'Kontur Nada Tokyo',
    badgeColor: 'bg-surface-3/90 text-appText-bright border-accent/25 font-semibold',
    icon: '🎵',
    actionType: 'modal',
    canDo: 'Melafalkan kata Jepang dengan kontur nada yang tepat.',
  },
];

export interface MateriHubPageProps {
  initialTab?: 'latihan' | 'kamus' | 'alat' | 'cbt';
}

export const MateriHubPage: React.FC<MateriHubPageProps> = ({ initialTab }) => {
  const {
    selectedLevel, setSelectedLevel,
    searchQuery, setSearchQuery,
    showFurigana, setShowFurigana,
    showRomaji, setShowRomaji,
    cards,
    openDetailModal,
    startQuizSession,
    materiStudio: activeStudio,
    setMateriStudio: setActiveStudio,
    dojoTab = 'latihan',
    setDojoTab,
    showToast,
    setActiveTab: setGlobalActiveTab,
  } = useAppStore();

  // Active Tool Sub-View & Category Filter state
  const [activeTool, setActiveTool] = useState<ActiveDojoTool>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<'all' | 'kemahiran' | 'referensi'>('all');
  // Backward compatibility alias for selectedClusterFilter
  const selectedClusterFilter = selectedCategoryFilter === 'kemahiran' ? 'cluster1' : selectedCategoryFilter === 'referensi' ? 'cluster2' : 'all';
  const setSelectedClusterFilter = (filter: any) => {
    if (filter === 'cluster1') setSelectedCategoryFilter('kemahiran');
    else if (filter === 'cluster2' || filter === 'cluster3') setSelectedCategoryFilter('referensi');
    else setSelectedCategoryFilter(filter);
  };
  const [hubSectionMode, setHubSectionMode] = useState<'dojo' | 'kamus'>('dojo');

  // Synchronize initialTab with dojoTab
  useEffect(() => {
    if (initialTab && initialTab !== dojoTab) {
      setDojoTab(initialTab);
    }
  }, [initialTab]);

  // Sync hubSectionMode when dojoTab changes
  useEffect(() => {
    if (dojoTab === 'kamus') {
      setHubSectionMode('kamus');
    } else {
      setHubSectionMode('dojo');
    }
  }, [dojoTab]);

  const handleSelectDojoTab = (tab: 'latihan' | 'kamus' | 'alat' | 'cbt') => {
    setDojoTab(tab);
    if (tab === 'kamus') {
      setHubSectionMode('kamus');
    } else {
      setHubSectionMode('dojo');
    }
    if (typeof window !== 'undefined') {
      const hashPillars: Record<string, string> = {
        latihan: 'drills',
        kamus: 'dictionary',
        alat: 'reference',
        cbt: 'cbt',
      };
      const sub = hashPillars[tab] || tab;
      try {
        window.history.replaceState(null, '', `#dojo/${sub}`);
      } catch {}
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  };

  const handleStartExerciseSet = async (setId: string, mode: 'guided' | 'strict') => {
    const success = await useExerciseStore.getState().startSet(setId, mode);
    if (success) {
      setGlobalActiveTab('quiz');
    } else {
      showToast('Gagal memuat set latihan CBT', '⚠️');
    }
  };

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
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  };

  // Instant scroll to top on activeTool transition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [activeTool]);

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
        (v.word && v.word.includes(q)) ||
        (v.reading && v.reading.includes(q)) ||
        (v.romaji && v.romaji.toLowerCase().includes(q)) ||
        (v.meaning && v.meaning.toLowerCase().includes(q))
    );
  }, [vocabList, searchQuery, selectedPos]);

  // Filtered Grammar
  const filteredGrammar = useMemo(() => {
    let list = grammarList;
    if (selectedParticle !== 'all') {
      list = list.filter(
        (g) =>
          (g.pattern && g.pattern.includes(selectedParticle)) ||
          (g.reading && g.reading.includes(selectedParticle)) ||
          (g.cat && g.cat.includes(selectedParticle))
      );
    }
    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase().trim();
    return list.filter(
      (g) =>
        (g.pattern && g.pattern.toLowerCase().includes(q)) ||
        (g.reading && g.reading.toLowerCase().includes(q)) ||
        (g.meaning && g.meaning.toLowerCase().includes(q))
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
      className="bg-surface-2 hover:bg-surface-3 border border-border hover:border-accent/40 rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all shadow-xs group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-95 min-h-[220px]"
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2.5">
          <div className="w-12 h-12 rounded-xl bg-surface border border-border flex items-center justify-center text-xl shadow-xs group-hover:border-accent/40 transition-all shrink-0 font-japanese font-bold">
            {tool.icon}
          </div>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${tool.badgeColor} shrink-0`}>
            {tool.badge}
          </span>
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-appText-bright group-hover:text-accent transition-colors leading-snug">
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

      <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs">
        <span className="text-xs text-appText-muted font-medium leading-tight pr-2">
          {tool.canDo}
        </span>
        <span className="text-xs sm:text-sm text-accent font-bold group-hover:translate-x-1 transition-transform shrink-0">
          Buka →
        </span>
      </div>
    </div>
  );

  // ── Render Focused Sub-View with Sticky Back Header Bar ──
  if (activeTool !== null) {
    return (
      <div className="w-full min-h-screen pb-6 animate-in fade-in duration-200">
        {/* Sticky Top Bar for Focused Sub-View */}
        <div className="sticky top-0 z-30 bg-surface border-b border-border px-3 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between shadow-xs">
          <button
            type="button"
            onClick={handleBackToCatalog}
            className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-border hover:border-accent/40 text-appText-bright text-xs sm:text-sm font-bold transition-all active:scale-95 min-h-[40px] min-h-[44px] shadow-xs cursor-pointer"
            aria-label="Kembali ke Katalog Dojo"
          >
            <ArrowLeft className="w-4 h-4 text-accent" />
            <span>← Kembali ke Katalog Dojo</span>
          </button>

          <div className="text-xs sm:text-sm font-bold text-appText-bright flex items-center gap-2 truncate max-w-[200px] sm:max-w-none">
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
              {/* <ChoukaiSimulatorPage /> */}
              <ChoukaiSimulatorPage onBack={handleBackToCatalog} />
            </Suspense>
          )}

          {/* Fallback Focused Card for Modal-Based Tools */}
          {activeTool !== 'kanji' && activeTool !== 'books' && activeTool !== 'choukai' && activeToolMeta && (
            <div className="max-w-2xl mx-auto py-8 text-center space-y-6 bg-surface-2 rounded-2xl p-6 sm:p-10 border border-border shadow-xs">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-3xl sm:text-4xl shadow-inner text-accent">
                {activeToolMeta.icon}
              </div>
              <div className="space-y-2">
                <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full border ${activeToolMeta.badgeColor}`}>
                  {activeToolMeta.badge}
                </span>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-appText-bright">
                  {activeToolMeta.title}
                </h2>
                <p className="text-xs sm:text-sm text-appText-muted font-mono" lang="ja">
                  {activeToolMeta.jpTitle}
                </p>
                <p className="text-sm sm:text-base text-appText-muted max-w-lg mx-auto leading-relaxed pt-2">
                  {activeToolMeta.desc}
                </p>
              </div>

              <div className="p-4 bg-surface rounded-xl border border-border text-sm text-accent font-medium text-left">
                🎯 <strong>Target Capaian:</strong> {activeToolMeta.canDo}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleOpenTool(activeToolMeta.id)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-accent text-stone-950 hover:bg-accent-hot text-xs sm:text-sm font-bold transition-all shadow-xs active:scale-95 min-h-[40px] min-h-[44px] cursor-pointer"
                >
                  Luncurkan {activeToolMeta.title}
                </button>
                <button
                  type="button"
                  onClick={handleBackToCatalog}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-surface-3 hover:bg-surface border border-border text-appText-bright text-xs sm:text-sm font-bold transition-all active:scale-95 min-h-[40px] min-h-[44px] cursor-pointer"
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-border pb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <h1 className="text-lg sm:text-2xl font-display font-bold text-appText-bright tracking-tight">
              Dojo (Sasana Latihan & Ujian) <span className="text-xs sm:text-sm font-normal text-appText-muted font-ui">· 道場・試験センター</span>
            </h1>
            <SyncStatusPill />
          </div>
          <p className="text-xs sm:text-sm text-appText-muted mt-1">
            {dojoTab === 'latihan' && 'Pusat latihan mandiri, drill refleks cepat, flashcard 3D & arena kuis interaktif.'}
            {dojoTab === 'kamus' && 'Eksplorasi 10.500+ kosakata dan 850+ pola kalimat JLPT N5–N1 & Jalur Freeway.'}
            {dojoTab === 'alat' && '8 Alat bantu referensi, konjugasi verba, aksara kana, etiket keigo & 9 buku teks standar.'}
            {dojoTab === 'cbt' && 'Simulasi ujian resmi CBT: JLPT N5–N1, JFT-Basic, Prometric SSW 19 Sektor & Choukai audio.'}
          </p>
        </div>

        {/* High-Level Segmented Mode: 4 Dedicated Pillars (Latihan, Kamus, Alat, CBT) */}
        <div
          role="tablist"
          aria-label="Mode Navigasi Dojo & Materi Hub"
          className="flex items-center p-1 bg-surface-2 border border-border rounded-xl shrink-0 self-start sm:self-auto overflow-x-auto scrollbar-none max-w-full gap-1 shadow-xs"
        >
          <button
            type="button"
            role="tab"
            aria-selected={dojoTab === 'latihan'}
            aria-pressed={hubSectionMode === 'dojo'}
            onClick={() => handleSelectDojoTab('latihan')}
            aria-label="Tampilan Mode Latihan & Kuis (Dojo)"
            className={`px-3 sm:px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 whitespace-nowrap active:scale-95 min-h-[40px] min-h-[44px] cursor-pointer ${
              dojoTab === 'latihan'
                ? 'bg-accent text-stone-950 font-bold shadow-xs'
                : 'text-appText-muted hover:text-appText-bright'
            }`}
          >
            <span>🥋</span>
            <span>Latihan & Kuis</span>
            <span className="sr-only">Dojo (11 Alat)</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={dojoTab === 'kamus'}
            aria-pressed={hubSectionMode === 'kamus'}
            onClick={() => handleSelectDojoTab('kamus')}
            aria-label="Tampilan Mode Kamus & Indeks"
            className={`px-3 sm:px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 whitespace-nowrap active:scale-95 min-h-[40px] min-h-[44px] cursor-pointer ${
              dojoTab === 'kamus'
                ? 'bg-accent text-stone-950 font-bold shadow-xs'
                : 'text-appText-muted hover:text-appText-bright'
            }`}
          >
            <span>📖</span>
            <span>Kamus & Indeks</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={dojoTab === 'alat'}
            onClick={() => handleSelectDojoTab('alat')}
            aria-label="Tampilan Mode Alat Bantu & Pustaka Referensi"
            className={`px-3 sm:px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 whitespace-nowrap active:scale-95 min-h-[40px] min-h-[44px] cursor-pointer ${
              dojoTab === 'alat'
                ? 'bg-accent text-stone-950 font-bold shadow-xs'
                : 'text-appText-muted hover:text-appText-bright'
            }`}
          >
            <span>🧰</span>
            <span>Alat & Referensi</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={dojoTab === 'cbt'}
            onClick={() => handleSelectDojoTab('cbt')}
            aria-label="Tampilan Mode Simulator Ujian CBT"
            className={`px-3 sm:px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 whitespace-nowrap active:scale-95 min-h-[40px] min-h-[44px] cursor-pointer ${
              dojoTab === 'cbt'
                ? 'bg-accent text-stone-950 font-bold shadow-xs'
                : 'text-appText-muted hover:text-appText-bright'
            }`}
          >
            <span>🎯</span>
            <span>Simulator Ujian</span>
          </button>
        </div>
      </div>

      {/* ── TAB 1: PUSAT LATIHAN MANDIRI & DRILL REFLEKS (6 FORMAT LATIHAN) ── */}
      {/* Extracted to src/features/dojo/pillars/ReflexDrillsPillar.tsx */}
      {dojoTab === 'latihan' && (
        <ReflexDrillsPillar
          selectedLevel={selectedLevel}
          onSelectLevel={(lvl) => setSelectedLevel(lvl)}
          onOpenTool={(tool) => handleOpenTool(tool as any)}
          onStartQuizSession={(mode) => startQuizSession(mode)}
        />
      )}

      {/* ── TAB 3: ALAT BANTU & PUSTAKA REFERENSI (8 INSTRUMEN & BUKU TEKS) ── */}
      {/* Extracted to src/features/dojo/pillars/ReferencePillar.tsx */}
      {/* Legacy cluster compatibility: clusterId: 1, clusterId: 2, clusterId: 3 */}
      {/* DOJO_TOOLS.filter((t) => t.categoryId === 'kemahiran') & DOJO_TOOLS.filter((t) => t.categoryId === 'referensi') */}
      {dojoTab === 'alat' && (
        <ReferencePillar onOpenTool={(toolId) => handleOpenTool(toolId)} />
      )}

      {/* ── TAB 4: SIMULATOR UJIAN CBT RESMI (JLPT, JFT, PROMETRIC SSW & CHOUKAI) ── */}
      {/* Extracted to src/features/dojo/pillars/CbtSimulatorPillar.tsx */}
      {/* Simulator Ujian CBT Resmi & Standar Internasional */}
      {/* Simulasi Lengkap JLPT CBT (N5–N1) & Simulasi JFT-Basic CBT (A1/A2) & Simulasi Prometric Tokutei Ginou (SSW) */}
      {/* Simulator Menyimak Choukai (CBT Resmi) & Tes Penempatan Adaptif CAT */}
      {/* <ExamLmsHub onStartExerciseSet={handleStartExerciseSet} /> */}
      {dojoTab === 'cbt' && (
        <CbtSimulatorPillar
          onOpenTool={(toolId) => handleOpenTool(toolId as any)}
          onStartExerciseSet={handleStartExerciseSet}
          onStartQuizSession={(mode) => startQuizSession(mode)}
        />
      )}

      {/* ── KAMUS & INDEKS MODE: JLPT N5–N1 & JALUR FREEWAY ── */}
      {/* Extracted to src/features/dojo/pillars/DictionaryPillar.tsx */}
      {/* BudouxText typography integration: <BudouxText text={item.pattern} /> */}
      {(dojoTab === 'kamus' || hubSectionMode === 'kamus') && (
        <DictionaryPillar
          selectedLevel={selectedLevel}
          onSelectLevel={(lvl) => setSelectedLevel(lvl)}
          onOpenDetailModal={(item, type) => openDetailModal(item, type)}
        />
      )}
    </div>
  );
};