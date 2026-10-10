import React, { useState, useEffect, useMemo } from 'react';
import {
  BookOpen,
  Award,
  BookMarked,
  Search,
  Volume2,
  Sparkles,
  Filter,
  ChevronRight,
  Layers,
  LayoutGrid,
  List,
  Compass,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { JLPTLevel } from '../types/vocab';
import { loadVocab, loadGrammar, NormalizedVocab, NormalizedGrammar } from '../lib/data/dataManager';
import { speakJapanese } from '../lib/audio/tts';
import { DetailModal } from '../components/ui/DetailModal';
import { BookTrackBrowser } from '../components/materi/BookTrackBrowser';
import { KanaChartModal } from '../components/kana/KanaChartModal';
import { ConjugationModal } from '../components/grammar/ConjugationModal';
import { NuanceCompareModal } from '../components/grammar/NuanceCompareModal';
import { SkeletonGrid } from '../components/ui/SkeletonCard';
import { loadFreewayTrack } from '../lib/data/dataManager';

export const MateriHubPage: React.FC = () => {
  const {
    selectedLevel, setSelectedLevel,
    searchQuery, setSearchQuery,
    showFurigana, showRomaji,
    cards,
  } = useAppStore();

  const [activeTrack, setActiveTrack] = useState<'jlpt' | 'buku' | 'freeway'>('jlpt');
  const [activeTab, setActiveTab] = useState<'all' | 'vocab' | 'grammar'>('vocab');
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');
  const [selectedParticle, setSelectedParticle] = useState<string>('all');
  const [selectedPos, setSelectedPos] = useState<string>('all');

  const [isKanaOpen, setIsKanaOpen] = useState(false);
  const [isConjugationOpen, setIsConjugationOpen] = useState(false);
  const [isNuanceOpen, setIsNuanceOpen] = useState(false);

  // Loaded items
  const [vocabList, setVocabList] = useState<NormalizedVocab[]>([]);
  const [grammarList, setGrammarList] = useState<NormalizedGrammar[]>([]);
  const [freewayList, setFreewayList] = useState<NormalizedGrammar[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Selected item for modal
  const [selectedItem, setSelectedItem] = useState<(NormalizedVocab | NormalizedGrammar) | null>(null);
  const [itemType, setItemType] = useState<'vocab' | 'grammar'>('vocab');

  // Max items to render in list for instantaneous rendering
  const [renderLimit, setRenderLimit] = useState(60);

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

  const jlptLevels: Array<{ id: JLPTLevel; label: string; desc: string; count: string }> = [
    { id: 'n5', label: 'JLPT N5', desc: 'Pemula', count: '991 Kata · 94 Pola' },
    { id: 'n4', label: 'JLPT N4', desc: 'Dasar Harian', count: '946 Kata · 92 Pola' },
    { id: 'n3', label: 'JLPT N3', desc: 'Menengah', count: '2.368 Kata · 163 Pola' },
    { id: 'n2', label: 'JLPT N2', desc: 'Pra-Lanjutan', count: '344 Kata · 310 Pola' },
    { id: 'n1', label: 'JLPT N1', desc: 'Mahir', count: '190 Kata · 200 Pola' },
  ];

  const particles = ['all', 'は', 'が', 'を', 'に', 'で', 'へ', 'と', 'も', 'から', 'まで'];
  const vocabPosFilters = [
    { id: 'all', label: 'Semua Kategori' },
    { id: 'verb', label: 'Kata Kerja (動詞)' },
    { id: 'adj', label: 'Kata Sifat (形容詞)' },
    { id: 'noun', label: 'Kata Benda (名詞)' },
    { id: 'expression', label: 'Ungkapan (表現)' },
  ];

  // Filtered Vocab
  const filteredVocab = useMemo(() => {
    let list = vocabList;
    if (selectedPos !== 'all') {
      list = list.filter((v) => {
        const pos = (v.pos || '').toLowerCase();
        if (selectedPos === 'verb') return pos.includes('verb') || pos.includes('kerja');
        if (selectedPos === 'adj') return pos.includes('adj') || pos.includes('sifat');
        if (selectedPos === 'noun') return pos.includes('noun') || pos.includes('benda');
        if (selectedPos === 'expression') return pos.includes('exp') || pos.includes('ungkapan');
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

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-6 sm:space-y-7 animate-in fade-in duration-300">
      {/* Header and Quick Tools */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-appText-bright mb-1 tracking-tight">
            Materi Hub · 学習ハブ
          </h1>
          <p className="text-xs sm:text-sm text-appText-muted">
            Eksplor 4.800+ kosakata dan 850+ tata bahasa lengkap dengan audio pelafalan asli.
          </p>
        </div>

        {/* Floating Quick Study Tools */}
        <div className="flex flex-wrap items-center gap-2 shrink-0 self-start sm:self-auto">
          <button
            onClick={() => setIsKanaOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/35 text-accent-hot text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
          >
            <span>Tabel Kana</span>
            <span className="font-mono text-xs">あ/ア</span>
          </button>
          <button
            onClick={() => setIsConjugationOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-surface-2 hover:bg-surface-3 border border-accent/25 text-appText-bright text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
          >
            <span>Konjugasi</span>
            <span>🔄</span>
          </button>
          <button
            onClick={() => setIsNuanceOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-surface-2 hover:bg-surface-3 border border-accent/25 text-appText-bright text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
          >
            <span>Inspektor Nuansa</span>
            <span>⚖️</span>
          </button>
        </div>
      </div>

      {/* Streamlined Segmented Track Switcher */}
      <div className="flex items-center gap-2 p-1.5 bg-surface rounded-2xl border border-accent/20 overflow-x-auto scrollbar-none shadow-sm">
        <button
          onClick={() => setActiveTrack('jlpt')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeTrack === 'jlpt'
              ? 'bg-accent text-bg shadow-sm font-extrabold'
              : 'text-appText-muted hover:text-appText-bright hover:bg-surface-2'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Kurikulum JLPT (N5–N1)</span>
        </button>

        <button
          onClick={() => setActiveTrack('buku')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeTrack === 'buku'
              ? 'bg-accent text-bg shadow-sm font-extrabold'
              : 'text-appText-muted hover:text-appText-bright hover:bg-surface-2'
          }`}
        >
          <BookMarked className="w-4 h-4" />
          <span>Jalur Buku Teks</span>
        </button>

        <button
          onClick={() => setActiveTrack('freeway')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeTrack === 'freeway'
              ? 'bg-accent text-bg shadow-sm font-extrabold'
              : 'text-appText-muted hover:text-appText-bright hover:bg-surface-2'
          }`}
        >
          <span>🛣️</span>
          <span>Freeway Survival (0 Nol)</span>
        </button>
      </div>

      {/* JLPT Track Main View */}
      {activeTrack === 'jlpt' && (
        <div className="space-y-4">
          {/* Level Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {jlptLevels.map((lvl) => {
              const isSelected = (selectedLevel === 'all' ? 'n5' : selectedLevel) === lvl.id;
              return (
                <button
                  key={lvl.id}
                  onClick={() => {
                    setSelectedLevel(lvl.id);
                    setRenderLimit(60);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                    isSelected
                      ? 'bg-amber-500 text-bg border-amber-500 shadow-sm'
                      : 'bg-surface-2 border-accent/20 text-appText-muted hover:text-appText-bright hover:border-accent/40'
                  }`}
                >
                  <span>{lvl.label}</span>
                  <span className="opacity-75 text-[11px] ml-1.5 font-normal">({lvl.desc})</span>
                </button>
              );
            })}
          </div>

          {/* Unified Search & View Controls Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-appText-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Cari kosakata / tata bahasa ${(selectedLevel === 'all' ? 'n5' : selectedLevel).toUpperCase()} (kanji, kana, arti, romaji)...`}
                className="w-full bg-surface-2 border border-accent/20 rounded-xl pl-10 pr-10 py-2.5 text-xs text-appText-bright placeholder:text-appText-muted/60 focus:outline-none focus:border-accent transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-appText-muted hover:text-appText-bright p-1"
                >
                  ✕
                </button>
              )}
            </div>

            {/* View Mode Switcher (Grid vs Compact List) */}
            <div className="flex items-center gap-1 bg-surface-2 p-1 rounded-xl border border-accent/15 self-end sm:self-auto shrink-0">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-accent text-bg shadow-sm'
                    : 'text-appText-muted hover:text-appText-bright'
                }`}
                title="Tampilan Kartu Grid"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('compact')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'compact'
                    ? 'bg-accent text-bg shadow-sm'
                    : 'text-appText-muted hover:text-appText-bright'
                }`}
                title="Tampilan Daftar Ringkas"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Sub-Tabs: Kosakata vs Tata Bahasa */}
          <div className="flex items-center justify-between border-b border-accent/15 pb-2.5 pt-1">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setActiveTab('vocab');
                  setRenderLimit(60);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'vocab'
                    ? 'bg-amber-500/20 text-accent-hot border border-amber-500/35'
                    : 'text-appText-muted hover:text-appText-bright'
                }`}
              >
                Kosakata ({filteredVocab.length})
              </button>
              <button
                onClick={() => {
                  setActiveTab('grammar');
                  setRenderLimit(60);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'grammar'
                    ? 'bg-amber-500/20 text-accent-hot border border-amber-500/35'
                    : 'text-appText-muted hover:text-appText-bright'
                }`}
              >
                Tata Bahasa ({filteredGrammar.length})
              </button>
            </div>

            <span className="text-[11px] text-appText-muted font-mono font-bold">
              Level {(selectedLevel === 'all' ? 'n5' : selectedLevel).toUpperCase()}
            </span>
          </div>

          {/* Secondary Filter Pills */}
          {activeTab === 'vocab' ? (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-[10px] font-bold uppercase tracking-wider text-accent shrink-0 mr-1">
                Kategori:
              </span>
              {vocabPosFilters.map((pos) => {
                const isSelected = selectedPos === pos.id;
                return (
                  <button
                    key={pos.id}
                    onClick={() => {
                      setSelectedPos(pos.id);
                      setRenderLimit(60);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                      isSelected
                        ? 'bg-accent text-bg border-accent font-bold shadow-sm'
                        : 'bg-surface-2 border-accent/15 text-appText-muted hover:text-appText-bright'
                    }`}
                  >
                    {pos.label}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-[10px] font-bold uppercase tracking-wider text-accent shrink-0 mr-1">
                Partikel:
              </span>
              {particles.map((p) => {
                const isSelected = selectedParticle === p;
                return (
                  <button
                    key={p}
                    onClick={() => {
                      setSelectedParticle(p);
                      setRenderLimit(60);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                      isSelected
                        ? 'bg-accent text-bg border-accent font-bold shadow-sm'
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
                      onClick={() => {
                        setSelectedItem(v);
                        setItemType('vocab');
                      }}
                      className="bg-surface-2 hover:bg-surface-3 border border-accent/20 hover:border-accent/40 rounded-2xl p-4 flex flex-col justify-between cursor-pointer transition-all hover:-translate-y-0.5 shadow-sm group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-xl font-jp font-bold text-appText-bright group-hover:text-amber-300 transition-colors">
                            {v.word}
                          </div>
                          {showFurigana && v.reading && v.reading !== v.word && (
                            <div className="text-xs font-jp text-amber-400/80">
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
                          onClick={(e) => {
                            e.stopPropagation();
                            speakJapanese(v.word);
                          }}
                          className="p-1.5 rounded-lg bg-surface/70 hover:bg-amber-500/20 text-appText-muted hover:text-accent-hot transition-all"
                          title="Dengarkan pelafalan"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-xs text-appText font-medium mt-2 line-clamp-1">
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
                      onClick={() => {
                        setSelectedItem(v);
                        setItemType('vocab');
                      }}
                      className="p-3 rounded-xl bg-surface-2 hover:bg-surface-3 border border-accent/15 hover:border-accent/35 flex items-center justify-between gap-3 cursor-pointer transition-colors group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            speakJapanese(v.word);
                          }}
                          className="p-1.5 rounded-lg bg-surface hover:bg-amber-500/20 text-appText-muted hover:text-accent shrink-0"
                          title="Dengarkan pelafalan"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="min-w-0">
                          <div className="flex items-baseline gap-2">
                            <span className="text-base font-jp font-bold text-appText-bright group-hover:text-accent transition-colors">
                              {v.word}
                            </span>
                            {v.reading && v.reading !== v.word && (
                              <span className="text-xs font-jp text-amber-400/80">
                                {v.reading}
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-appText-muted truncate">
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
                <div className="flex items-center justify-center gap-3 pt-3">
                  <button
                    onClick={() => setRenderLimit((prev) => prev + 60)}
                    className="px-5 py-2.5 rounded-xl bg-surface-2 border border-accent/20 hover:border-accent/40 text-xs font-bold text-appText-bright transition-all"
                  >
                    Muat +60 Lagi ({filteredVocab.length - renderLimit} tersisa)
                  </button>
                  <button
                    onClick={() => setRenderLimit(filteredVocab.length)}
                    className="px-4 py-2.5 rounded-xl bg-accent text-bg hover:bg-accent-hot text-xs font-bold transition-all shadow-sm"
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
                      onClick={() => {
                        setSelectedItem(g);
                        setItemType('grammar');
                      }}
                      className="bg-surface-2 hover:bg-surface-3 border border-accent/20 hover:border-accent/40 rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all hover:-translate-y-0.5 shadow-sm group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-lg font-jp font-bold text-appText-bright group-hover:text-amber-300 transition-colors">
                            {g.pattern}
                          </div>
                          {g.reading && (
                            <div className="text-xs text-appText-muted font-mono">
                              {g.reading}
                            </div>
                          )}
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            speakJapanese(g.pattern);
                          }}
                          className="p-1.5 rounded-lg bg-surface/70 hover:bg-amber-500/20 text-appText-muted hover:text-accent-hot transition-all"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-xs text-appText font-medium mt-2 line-clamp-2">
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
                      onClick={() => {
                        setSelectedItem(g);
                        setItemType('grammar');
                      }}
                      className="p-3 rounded-xl bg-surface-2 hover:bg-surface-3 border border-accent/15 hover:border-accent/35 flex items-center justify-between gap-3 cursor-pointer transition-colors group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            speakJapanese(g.pattern);
                          }}
                          className="p-1.5 rounded-lg bg-surface hover:bg-amber-500/20 text-appText-muted hover:text-accent shrink-0"
                          title="Dengarkan pelafalan"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="min-w-0">
                          <div className="flex items-baseline gap-2">
                            <span className="text-base font-jp font-bold text-appText-bright group-hover:text-accent transition-colors">
                              {g.pattern}
                            </span>
                            {g.reading && (
                              <span className="text-xs font-mono text-appText-muted">
                                {g.reading}
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-appText-muted truncate">
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
                <div className="flex items-center justify-center gap-3 pt-3">
                  <button
                    onClick={() => setRenderLimit((prev) => prev + 60)}
                    className="px-5 py-2.5 rounded-xl bg-surface-2 border border-accent/20 hover:border-accent/40 text-xs font-bold text-appText-bright transition-all"
                  >
                    Muat +60 Lagi ({filteredGrammar.length - renderLimit} tersisa)
                  </button>
                  <button
                    onClick={() => setRenderLimit(filteredGrammar.length)}
                    className="px-4 py-2.5 rounded-xl bg-accent text-bg hover:bg-accent-hot text-xs font-bold transition-all shadow-sm"
                  >
                    Tampilkan Semua ({filteredGrammar.length})
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Jalur Buku Teks (Minna no Nihongo & Irodori) */}
      {activeTrack === 'buku' && (
        <BookTrackBrowser
          vocabList={vocabList}
          grammarList={grammarList}
          onSelectItem={(item, type) => {
            setSelectedItem(item);
            setItemType(type);
          }}
        />
      )}

      {/* Jalur Freeway (Survival Japanese for Beginners) */}
      {activeTrack === 'freeway' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="bg-gradient-to-r from-amber-950/40 via-surface-2 to-surface-2 border border-accent/25 rounded-3xl p-6 sm:p-8 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-accent-hot text-xs font-bold">
              <span>🛣️ Jalur Freeway · Survival Japanese</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-appText-bright">
              21 Pola Paling Fundamental untuk Bertahan Hidup
            </h2>
            <p className="text-xs text-appText-muted leading-relaxed max-w-2xl">
              Dirancang khusus untuk pemula yang belum mengenal tata bahasa rumit. Urutan terstruktur mulai dari salam, permisi (*sumimasen*), memperkenalkan diri (*wa desu*), bertanya (*wa desu ka*), tunjuk barang (*kore/sore/are*), hingga meminta tolong (*te kudasai*).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {freewayList.map((item, index) => (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedItem(item);
                  setItemType('grammar');
                }}
                className="bg-surface-2 hover:bg-surface-3 border border-accent/20 hover:border-accent/40 rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all hover:-translate-y-0.5 shadow-sm group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-accent border border-amber-500/30">
                        Langkah #{index + 1}
                      </span>
                    </div>
                    <div className="text-xl font-jp font-bold text-appText-bright group-hover:text-amber-300 transition-colors">
                      {item.pattern}
                    </div>
                    {item.reading && (
                      <div className="text-xs text-appText-muted font-mono">
                        {item.reading}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speakJapanese(item.pattern);
                    }}
                    className="p-2 rounded-xl bg-surface hover:bg-amber-500/20 text-appText-muted hover:text-accent transition-all shrink-0"
                    title="Dengarkan pelafalan"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-xs text-appText font-medium mt-3">
                  {item.meaning}
                </div>

                {item.examples?.[0] && (
                  <div className="mt-3 pt-3 border-t border-accent/10 text-xs text-appText-muted italic">
                    "{item.examples[0].jp}" ({item.examples[0].id})
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detail Modal */}
      <DetailModal item={selectedItem} type={itemType} onClose={() => setSelectedItem(null)} />

      {/* Kana Chart Modal (Hiragana & Katakana) */}
      <KanaChartModal isOpen={isKanaOpen} onClose={() => setIsKanaOpen(false)} />

      {/* Verb Conjugation Matrix Modal */}
      <ConjugationModal isOpen={isConjugationOpen} onClose={() => setIsConjugationOpen(false)} />

      {/* Grammar Nuance Comparison Inspector Modal */}
      <NuanceCompareModal isOpen={isNuanceOpen} onClose={() => setIsNuanceOpen(false)} />
    </div>
  );
};
