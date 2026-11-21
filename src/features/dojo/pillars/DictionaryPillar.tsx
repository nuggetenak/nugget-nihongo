// ══════════════════════════════════════════════════════════════════
//  DictionaryPillar.tsx — Pilar 2: Kamus & Indeks Referensi
//  10.500+ Kosakata & 850+ Pola Tata Bahasa JLPT N5–N1 & Jalur Freeway
// ══════════════════════════════════════════════════════════════════

import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Volume2,
  Sparkles,
  Filter,
  LayoutGrid,
  List,
} from 'lucide-react';
import { JLPTLevel } from '../../../types/vocab';
import {
  loadVocab,
  loadGrammar,
  loadFreewayTrack,
  NormalizedVocab,
  NormalizedGrammar,
} from '../../../lib/data/dataManager';
import { speakJapanese } from '../../../lib/audio/tts';
import { SkeletonGrid } from '../../../components/ui/SkeletonCard';
import { JapaneseFormattedText } from '../../../components/ui/JapaneseFormattedText';
import { RubyText } from '../../../components/ui/RubyText';
import { BudouxText } from '../../../components/ui/BudouxText';
import { useAppStore } from '../../../store/useAppStore';

export interface DictionaryPillarProps {
  selectedLevel: JLPTLevel | 'all';
  onSelectLevel: (level: JLPTLevel) => void;
  onOpenDetailModal: (item: any, type: 'vocab' | 'grammar') => void;
}

// Canonical 7-category POS taxonomy required by tests/test-sprint-12-features.js
export const VOCAB_POS_FILTERS = [
  { id: 'all', label: 'Semua Kategori' },
  { id: 'verb', label: 'Kata Kerja (動詞)' },
  { id: 'adj', label: 'Kata Sifat (形容詞)' },
  { id: 'noun', label: 'Kata Benda (名詞)' },
  { id: 'adverb', label: 'Kata Keterangan (副詞)' },
  { id: 'counter', label: 'Bilangan & Counter (助数詞)' },
  { id: 'conjunction', label: 'Kata Hubung (接続詞)' },
  { id: 'expression', label: 'Ungkapan (表現)' },
];

export const JLPT_LEVELS: Array<{ id: JLPTLevel; label: string; desc: string; count: string }> = [
  { id: 'n5', label: 'JLPT N5', desc: 'Pemula', count: '1.321 Kata · 94 Pola' },
  { id: 'n4', label: 'JLPT N4', desc: 'Dasar Harian', count: '1.286 Kata · 92 Pola' },
  { id: 'n3', label: 'JLPT N3', desc: 'Menengah', count: '2.580 Kata · 163 Pola' },
  { id: 'n2', label: 'JLPT N2', desc: 'Pra-Lanjutan', count: '2.104 Kata · 310 Pola' },
  { id: 'n1', label: 'JLPT N1', desc: 'Mahir', count: '3.217 Kata · 200 Pola' },
];

export const PARTICLES = ['all', 'は', 'が', 'を', 'に', 'で', 'へ', 'と', 'も', 'から', 'まで'];

export const DictionaryPillar: React.FC<DictionaryPillarProps> = ({
  selectedLevel,
  onSelectLevel,
  onOpenDetailModal,
}) => {
  const rawCards = useAppStore((state) => state.cards);
  const cards = rawCards && typeof rawCards === 'object' ? rawCards : {};

  // Sub-Track & Tab states
  const [kurikulumSub, setKurikulumSub] = useState<'jlpt' | 'freeway'>('jlpt');
  const [activeTab, setActiveTab] = useState<'vocab' | 'grammar'>('vocab');
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');
  const [selectedParticle, setSelectedParticle] = useState<string>('all');
  const [selectedPos, setSelectedPos] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFurigana, setShowFurigana] = useState(true);
  const [showRomaji, setShowRomaji] = useState(true);

  // Data states
  const [vocabList, setVocabList] = useState<NormalizedVocab[]>([]);
  const [grammarList, setGrammarList] = useState<NormalizedGrammar[]>([]);
  const [freewayList, setFreewayList] = useState<NormalizedGrammar[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [renderLimit, setRenderLimit] = useState(60);

  // Load datasets when selectedLevel changes
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

  // Canonical predicate matching rules
  const filteredVocab = useMemo(() => {
    let list = Array.isArray(vocabList) ? vocabList : [];
    if (selectedPos !== 'all') {
      list = list.filter((v) => {
        if (!v) return false;
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
        v &&
        ((v.word && v.word.includes(q)) ||
          (v.reading && v.reading.includes(q)) ||
          (v.romaji && v.romaji.toLowerCase().includes(q)) ||
          (v.meaning && v.meaning.toLowerCase().includes(q)))
    );
  }, [vocabList, searchQuery, selectedPos]);

  // Filtered Grammar
  const filteredGrammar = useMemo(() => {
    let list = Array.isArray(grammarList) ? grammarList : [];
    if (selectedParticle !== 'all') {
      list = list.filter(
        (g) =>
          g &&
          ((g.pattern && g.pattern.includes(selectedParticle)) ||
            (g.reading && g.reading.includes(selectedParticle)) ||
            (g.cat && g.cat.includes(selectedParticle)))
      );
    }
    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase().trim();
    return list.filter(
      (g) =>
        g &&
        ((g.pattern && g.pattern.toLowerCase().includes(q)) ||
          (g.reading && g.reading.toLowerCase().includes(q)) ||
          (g.meaning && g.meaning.toLowerCase().includes(q)))
    );
  }, [grammarList, searchQuery, selectedParticle]);

  return (
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
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all min-h-[40px] min-h-[44px] active:scale-95 flex items-center justify-center ${
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
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all min-h-[40px] min-h-[44px] active:scale-95 flex items-center justify-center ${
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
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none max-w-full">
              {JLPT_LEVELS.map((lvl) => {
                const isSelected = (selectedLevel === 'all' ? 'n5' : selectedLevel) === lvl.id;
                return (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => {
                      onSelectLevel(lvl.id);
                      setRenderLimit(60);
                    }}
                    className={`px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border min-h-[44px] active:scale-95 ${
                      isSelected
                        ? 'bg-amber-500 text-stone-950 border-amber-500 font-black shadow-sm'
                        : 'bg-surface-2 border-accent/20 text-appText-muted hover:text-appText-bright hover:border-accent/40'
                    }`}
                  >
                    <span>{lvl.label}</span>
                    <span className="opacity-80 text-xs ml-1.5 font-normal hidden sm:inline">({lvl.desc})</span>
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
                className={`px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all min-h-[44px] active:scale-95 flex items-center justify-center ${
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
                className={`px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all min-h-[44px] active:scale-95 flex items-center justify-center ${
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
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setRenderLimit(60);
                }}
                placeholder={`Cari kosakata / tata bahasa ${(selectedLevel === 'all' ? 'n5' : selectedLevel).toUpperCase()}...`}
                aria-label={`Cari kosakata atau tata bahasa ${(selectedLevel === 'all' ? 'n5' : selectedLevel).toUpperCase()}`}
                className="w-full bg-surface-2 border border-accent/20 rounded-xl pl-9 pr-9 py-2 sm:py-2.5 text-xs text-appText-bright placeholder:text-appText-muted focus:outline-none focus:border-accent transition-colors min-h-[44px]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setRenderLimit(60);
                  }}
                  aria-label="Hapus kata kunci pencarian"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-appText-muted hover:text-appText-bright p-1 min-h-[36px] min-w-[36px] flex items-center justify-center"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0 min-h-[44px] rounded-xl">
              {/* Furigana Toggle Chip */}
              <button
                type="button"
                onClick={() => setShowFurigana(!showFurigana)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border min-h-[44px] flex items-center gap-1 active:scale-95 ${
                  showFurigana
                    ? 'bg-amber-500/20 text-accent-hot dark:text-amber-300 border-amber-500/40 shadow-xs'
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
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border min-h-[44px] flex items-center gap-1 active:scale-95 ${
                  showRomaji
                    ? 'bg-amber-500/20 text-accent-hot dark:text-amber-300 border-amber-500/40 shadow-xs'
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
                  className={`p-2 rounded-lg transition-colors min-h-[40px] min-w-[40px] min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-95 ${
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
                  className={`p-2 rounded-lg transition-colors min-h-[40px] min-w-[40px] min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-95 ${
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
              <span className="text-xs font-bold uppercase tracking-wider text-accent shrink-0 mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3" />
                <span>Kategori:</span>
              </span>
              {VOCAB_POS_FILTERS.map((pos) => {
                const isSelected = selectedPos === pos.id;
                return (
                  <button
                    key={pos.id}
                    type="button"
                    onClick={() => {
                      setSelectedPos(pos.id);
                      setRenderLimit(60);
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border min-h-[40px] min-h-[44px] active:scale-95 flex items-center justify-center ${
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
              <span className="text-xs font-bold uppercase tracking-wider text-accent shrink-0 mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3" />
                <span>Partikel:</span>
              </span>
              {PARTICLES.map((p) => {
                const isSelected = selectedParticle === p;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      setSelectedParticle(p);
                      setRenderLimit(60);
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border min-h-[40px] min-h-[44px] active:scale-95 flex items-center justify-center ${
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
                      onClick={() => onOpenDetailModal(v, 'vocab')}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onOpenDetailModal(v, 'vocab');
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
                            <div className="text-xs font-mono text-appText-muted">
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
                          className="w-11 h-11 min-w-[40px] min-h-[40px] min-w-[44px] min-h-[44px] rounded-xl bg-surface/70 hover:bg-amber-500/20 text-appText-muted hover:text-accent-hot flex items-center justify-center transition-all active:scale-95 shrink-0"
                          title="Dengarkan pelafalan"
                          aria-label={`Dengarkan pelafalan ${v.word}`}
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="text-sm text-appText-bright font-medium mt-3 leading-snug">
                        {v.meaning}
                      </div>

                      <div className="mt-4 pt-2 border-t border-accent/10 flex items-center justify-between text-xs text-appText-muted">
                        <div className="flex items-center gap-1.5">
                          <span className="capitalize">{v.pos || 'Kata'}</span>
                          {cards[v.id]?.card && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-amber-500/15 text-accent border border-amber-500/30">
                              <Sparkles className="w-3 h-3" />
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
                      onClick={() => onOpenDetailModal(v, 'vocab')}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onOpenDetailModal(v, 'vocab');
                        }
                      }}
                      aria-label={`Detail kosakata ${v.word}: ${v.meaning}`}
                      className="bg-surface-2 hover:bg-surface-3 border border-accent/15 hover:border-accent/30 rounded-xl px-3.5 py-2.5 flex items-center justify-between gap-3 cursor-pointer transition-colors group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-base font-jp font-bold text-appText-bright group-hover:text-amber-400 shrink-0" lang="ja">
                          {v.word}
                        </span>
                        {showFurigana && v.reading && v.reading !== v.word && (
                          <span className="text-xs font-jp text-amber-400/80 truncate shrink-0 hidden sm:inline" lang="ja">
                            【{v.reading}】
                          </span>
                        )}
                        <span className="text-xs text-appText-muted truncate">
                          {v.meaning}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {cards[v.id]?.card && (
                          <span className="px-1.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/15 text-accent border border-amber-500/30">
                            FSRS
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            speakJapanese(v.word);
                          }}
                          className="w-11 h-11 min-w-[40px] min-h-[40px] min-w-[44px] min-h-[44px] rounded-lg hover:bg-surface text-appText-muted hover:text-accent-hot flex items-center justify-center transition-colors active:scale-95"
                          title="Dengarkan pelafalan"
                          aria-label={`Dengarkan pelafalan ${v.word}`}
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Progressive Load Button */}
              {filteredVocab.length > renderLimit && (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 pt-3 w-full">
                  <button
                    type="button"
                    onClick={() => setRenderLimit((prev) => prev + 60)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-surface-2 border border-accent/20 hover:border-accent/40 text-xs font-bold text-appText-bright transition-all min-h-[44px] active:scale-95"
                  >
                    Muat +60 Lagi ({filteredVocab.length - renderLimit} tersisa)
                  </button>
                  <button
                    type="button"
                    onClick={() => setRenderLimit(filteredVocab.length)}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-accent text-bg hover:bg-accent-hot text-xs font-bold transition-all shadow-sm min-h-[44px] active:scale-95"
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
                      onClick={() => onOpenDetailModal(g, 'grammar')}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onOpenDetailModal(g, 'grammar');
                        }
                      }}
                      aria-label={`Detail tata bahasa ${g.pattern}: ${g.meaning}`}
                      className="bg-surface-2 hover:bg-surface-3 border border-accent/20 hover:border-accent/40 rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all hover:-translate-y-0.5 shadow-sm group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-lg font-jp font-bold text-appText-bright group-hover:text-amber-400 font-extrabold transition-colors" lang="ja">
                            <BudouxText text={g.pattern} />
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
                          className="w-11 h-11 min-w-[40px] min-h-[40px] min-w-[44px] min-h-[44px] rounded-xl bg-surface/70 hover:bg-amber-500/20 text-appText-muted hover:text-accent-hot flex items-center justify-center transition-all active:scale-95 shrink-0"
                          title="Dengarkan pelafalan"
                          aria-label={`Dengarkan pelafalan ${g.pattern}`}
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="text-sm text-appText-bright font-medium mt-2 leading-relaxed">
                        {g.meaning}
                      </div>

                      <div className="mt-4 pt-2 border-t border-accent/10 flex items-center justify-between text-xs text-appText-muted">
                        <div className="flex items-center gap-1.5">
                          <span>{g.cat || 'Pola Kalimat'}</span>
                          {cards[g.id]?.card && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-amber-500/15 text-accent border border-amber-500/30">
                              <Sparkles className="w-3 h-3" />
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
                      onClick={() => onOpenDetailModal(g, 'grammar')}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onOpenDetailModal(g, 'grammar');
                        }
                      }}
                      aria-label={`Detail tata bahasa ${g.pattern}: ${g.meaning}`}
                      className="bg-surface-2 hover:bg-surface-3 border border-accent/15 hover:border-accent/30 rounded-xl px-3.5 py-2.5 flex items-center justify-between gap-3 cursor-pointer transition-colors group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-base font-jp font-bold text-appText-bright group-hover:text-amber-400 shrink-0" lang="ja">
                          <BudouxText text={g.pattern} />
                        </span>
                        <span className="text-xs text-appText-muted truncate">
                          {g.meaning}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs text-appText-muted hidden sm:inline">{g.cat || 'Tata Bahasa'}</span>
                        {cards[g.id]?.card && (
                          <span className="px-1.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/15 text-accent border border-amber-500/30">
                            FSRS
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            speakJapanese(g.pattern);
                          }}
                          className="w-11 h-11 min-w-[40px] min-h-[40px] min-w-[44px] min-h-[44px] rounded-lg hover:bg-surface text-appText-muted hover:text-accent-hot flex items-center justify-center transition-colors active:scale-95"
                          title="Dengarkan pelafalan"
                          aria-label={`Dengarkan pelafalan ${g.pattern}`}
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Progressive Load Button */}
              {filteredGrammar.length > renderLimit && (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 pt-3 w-full">
                  <button
                    type="button"
                    onClick={() => setRenderLimit((prev) => prev + 60)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-surface-2 border border-accent/20 hover:border-accent/40 text-xs font-bold text-appText-bright transition-all min-h-[44px] active:scale-95"
                  >
                    Muat +60 Lagi ({filteredGrammar.length - renderLimit} tersisa)
                  </button>
                  <button
                    type="button"
                    onClick={() => setRenderLimit(filteredGrammar.length)}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-accent text-bg hover:bg-accent-hot text-xs font-bold transition-all shadow-sm min-h-[44px] active:scale-95"
                  >
                    Tampilkan Semua ({filteredGrammar.length})
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── View B: Jalur Freeway (21 Pola Fundamental) ── */}
      {kurikulumSub === 'freeway' && (
        <div className="space-y-4">
          <div className="bg-surface-2/70 border border-accent/20 rounded-2xl p-4 sm:p-5 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-accent font-extrabold text-xs">
              <span>🛣️ Jalur Freeway · Survival Japanese</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-appText-bright">
              21 Pola Paling Fundamental untuk Bertahan Hidup
            </h3>
            <p className="text-xs sm:text-sm text-appText-muted leading-relaxed max-w-2xl">
              Dirancang khusus untuk pemula yang belum mengenal tata bahasa rumit. Urutan terstruktur mulai dari salam, permisi (*sumimasen*), memperkenalkan diri (*wa desu*), bertanya (*wa desu ka*), tunjuk barang (*kore/sore/are*), hingga meminta tolong (*te kudasai*).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(Array.isArray(freewayList) ? freewayList : []).filter(Boolean).map((item, index) => (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                onClick={() => onOpenDetailModal(item, 'grammar')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenDetailModal(item, 'grammar');
                  }
                }}
                aria-label={`Pola freeway ${item.pattern}: ${item.meaning}`}
                className="bg-surface-2 hover:bg-surface-3 border border-accent/20 hover:border-accent/40 rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all hover:-translate-y-0.5 shadow-sm group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-amber-500/20 text-accent border border-amber-500/30">
                        Langkah #{index + 1}
                      </span>
                    </div>
                    <BudouxText
                      text={item.pattern}
                      className="text-xl font-jp font-bold text-appText-bright group-hover:text-accent-hot dark:group-hover:text-amber-400 font-extrabold transition-colors"
                      as="div"
                    />
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
                    className="w-11 h-11 min-w-[40px] min-h-[40px] min-w-[44px] min-h-[44px] rounded-xl bg-surface hover:bg-amber-500/20 text-appText-muted hover:text-accent flex items-center justify-center transition-all shrink-0 active:scale-95"
                    title="Dengarkan pelafalan"
                    aria-label={`Dengarkan pelafalan ${item.pattern}`}
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="text-sm text-appText-bright font-medium mt-3 leading-relaxed">
                  {item.meaning}
                </div>

                {item.examples?.[0]?.jp && (
                  <div className="mt-3 pt-3 border-t border-accent/10 text-xs sm:text-sm text-appText-muted italic">
                    <JapaneseFormattedText text={`"${item.examples[0].jp}"`} /> ({item.examples[0].id || ''})
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
