import React, { useState, useEffect, useMemo } from 'react';
import { BookOpen, Award, BookMarked, Search, Volume2, Sparkles, Filter, ChevronRight, Layers } from 'lucide-react';
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
    showFurigana, showRomaji
  } = useAppStore();
  const [activeTrack, setActiveTrack] = useState<'jlpt' | 'buku' | 'freeway'>('jlpt');
  const [activeTab, setActiveTab] = useState<'all' | 'vocab' | 'grammar'>('vocab');
  const [isKanaOpen, setIsKanaOpen] = useState(false);
  const [isConjugationOpen, setIsConjugationOpen] = useState(false);
  const [isNuanceOpen, setIsNuanceOpen] = useState(false);
  const [selectedParticle, setSelectedParticle] = useState<string>('all');

  // Loaded items
  const [vocabList, setVocabList] = useState<NormalizedVocab[]>([]);
  const [grammarList, setGrammarList] = useState<NormalizedGrammar[]>([]);
  const [freewayList, setFreewayList] = useState<NormalizedGrammar[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Selected item for modal
  const [selectedItem, setSelectedItem] = useState<(NormalizedVocab | NormalizedGrammar) | null>(null);
  const [itemType, setItemType] = useState<'vocab' | 'grammar'>('vocab');

  // Load data whenever selectedLevel changes
  useEffect(() => {
    let isCancelled = false;
    const targetLevel: JLPTLevel = selectedLevel === 'all' ? 'n5' : selectedLevel;

    setIsLoading(true);
    Promise.all([
      loadVocab(targetLevel),
      loadGrammar(targetLevel),
      loadFreewayTrack(),
    ]).then(([vocabs, grammars, freeways]) => {
      if (!isCancelled) {
        setVocabList(vocabs);
        setGrammarList(grammars);
        setFreewayList(freeways);
        setIsLoading(false);
      }
    }).catch(() => {
      if (!isCancelled) setIsLoading(false);
    });

    return () => {
      isCancelled = true;
    };
  }, [selectedLevel]);

  const jlptLevels: Array<{ id: JLPTLevel; label: string; desc: string; count: string }> = [
    { id: 'n5', label: 'JLPT N5', desc: 'Pemula Dasar', count: '991 Kata · 94 Pola' },
    { id: 'n4', label: 'JLPT N4', desc: 'Percakapan Harian', count: '946 Kata · 92 Pola' },
    { id: 'n3', label: 'JLPT N3', desc: 'Menengah', count: '2.368 Kata · 163 Pola' },
    { id: 'n2', label: 'JLPT N2', desc: 'Pra-Lanjutan', count: '344 Kata · 310 Pola' },
    { id: 'n1', label: 'JLPT N1', desc: 'Mahir / Profesional', count: '190 Kata · 200 Pola' },
  ];

  const particles = ['all', 'は', 'が', 'を', 'に', 'で', 'へ', 'と', 'も', 'から', 'まで'];

  // Filtered lists
  const filteredVocab = useMemo(() => {
    if (!searchQuery.trim()) return vocabList;
    const q = searchQuery.toLowerCase().trim();
    return vocabList.filter(
      (v) =>
        v.word.includes(q) ||
        v.reading.includes(q) ||
        v.romaji.toLowerCase().includes(q) ||
        v.meaning.toLowerCase().includes(q)
    );
  }, [vocabList, searchQuery]);

  const filteredGrammar = useMemo(() => {
    let list = grammarList;
    if (selectedParticle !== 'all') {
      list = list.filter((g) =>
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

  // Max items to render in list for instantaneous rendering
  const [renderLimit, setRenderLimit] = useState(60);

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-appText-bright mb-1">Materi Hub · 学習ハブ</h1>
          <p className="text-xs text-appText-muted">Eksplor 4.800+ kosakata dan 850+ tata bahasa JLPT dengan audio pelafalan asli.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 shrink-0 self-start sm:self-auto">
          <button
            onClick={() => setIsKanaOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/35 text-accent-hot text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span>Tabel Kana</span>
            <span className="font-mono text-xs">あ/ア</span>
          </button>
          <button
            onClick={() => setIsConjugationOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-surface-2 hover:bg-surface-3 border border-accent/25 text-appText-bright text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span>Konjugasi</span>
            <span>🔄</span>
          </button>
          <button
            onClick={() => setIsNuanceOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-surface-2 hover:bg-surface-3 border border-accent/25 text-appText-bright text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span>Inspektor Nuansa</span>
            <span>⚖️</span>
          </button>
        </div>
      </div>

      {/* The Three Gateways (JLPT, Buku Teks, Freeway) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          onClick={() => setActiveTrack('jlpt')}
          className={`cursor-pointer rounded-3xl p-5 border-2 transition-all duration-200 ${
            activeTrack === 'jlpt'
              ? 'bg-amber-950/30 border-amber-500/60 shadow-glow'
              : 'bg-surface border-accent/20 hover:border-accent/40'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-accent-hot flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-accent px-2 py-0.5 rounded-full bg-amber-500/15">
              Standar Resmi
            </span>
          </div>
          <h2 className="text-base font-bold text-appText-bright">Jalur JLPT (N5 — N1)</h2>
          <p className="text-[11px] text-appText-muted mt-1 leading-relaxed">
            Standar kurikulum resmi tes kemampuan bahasa Jepang.
          </p>
        </div>

        <div
          onClick={() => setActiveTrack('buku')}
          className={`cursor-pointer rounded-3xl p-5 border-2 transition-all duration-200 ${
            activeTrack === 'buku'
              ? 'bg-amber-950/30 border-amber-500/60 shadow-glow'
              : 'bg-surface border-accent/20 hover:border-accent/40'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-accent-hot flex items-center justify-center">
              <BookMarked className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-accent px-2 py-0.5 rounded-full bg-amber-500/15">
              Buku Pegangan
            </span>
          </div>
          <h2 className="text-base font-bold text-appText-bright">Jalur Buku Teks</h2>
          <p className="text-[11px] text-appText-muted mt-1 leading-relaxed">
            Minna no Nihongo & modul percakapan praktis Irodori.
          </p>
        </div>

        <div
          onClick={() => setActiveTrack('freeway')}
          className={`cursor-pointer rounded-3xl p-5 border-2 transition-all duration-200 ${
            activeTrack === 'freeway'
              ? 'bg-amber-950/30 border-amber-500/60 shadow-glow'
              : 'bg-surface border-accent/20 hover:border-accent/40'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-accent-hot flex items-center justify-center">
              <span className="text-xl">🛣️</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-accent px-2 py-0.5 rounded-full bg-amber-500/15">
              0 Pengetahuan
            </span>
          </div>
          <h2 className="text-base font-bold text-appText-bright">Jalur Freeway (Survival)</h2>
          <p className="text-[11px] text-appText-muted mt-1 leading-relaxed">
            21 pola paling penting untuk bertahan hidup di Jepang.
          </p>
        </div>
      </div>

      {/* JLPT Level Selector Pills & Inline Search */}
      {activeTrack === 'jlpt' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {jlptLevels.map((lvl) => {
              const isSelected = (selectedLevel === 'all' ? 'n5' : selectedLevel) === lvl.id;
              return (
                <button
                  key={lvl.id}
                  onClick={() => {
                    setSelectedLevel(lvl.id);
                    setRenderLimit(60);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                    isSelected
                      ? 'bg-accent text-bg border-accent shadow-sm'
                      : 'bg-surface-2 border-accent/20 text-appText-muted hover:text-appText-bright'
                  }`}
                >
                  {lvl.label} ({lvl.desc})
                </button>
              );
            })}
          </div>

          {/* Inline Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-appText-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Cari kosakata / pola tata bahasa ${(selectedLevel === 'all' ? 'n5' : selectedLevel).toUpperCase()} (kanji, kana, arti, romaji)...`}
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

          {/* Sub-Tabs: Kosakata vs Tata Bahasa */}
          <div className="flex items-center justify-between border-b border-accent/15 pb-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('vocab')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'vocab'
                    ? 'bg-amber-500/20 text-accent-hot border border-amber-500/35'
                    : 'text-appText-muted hover:text-appText-bright'
                }`}
              >
                Kosakata ({filteredVocab.length})
              </button>
              <button
                onClick={() => setActiveTab('grammar')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'grammar'
                    ? 'bg-amber-500/20 text-accent-hot border border-amber-500/35'
                    : 'text-appText-muted hover:text-appText-bright'
                }`}
              >
                Tata Bahasa ({filteredGrammar.length})
              </button>
            </div>

            <span className="text-[11px] text-appText-muted">
              Level {(selectedLevel === 'all' ? 'n5' : selectedLevel).toUpperCase()}
            </span>
          </div>

          {/* Particle Quick Filter Pills (Tier 1 & 2) */}
          {activeTab === 'grammar' && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
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

          {/* Content Grid */}
          {isLoading ? (
            <div className="py-2">
              <SkeletonGrid count={6} />
            </div>
          ) : activeTab === 'vocab' ? (
            <div className="space-y-4">
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
                      <span className="capitalize">{v.pos}</span>
                      <span className="opacity-0 group-hover:opacity-100 text-accent transition-opacity">
                        Detail →
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {filteredVocab.length > renderLimit && (
                <div className="flex items-center justify-center gap-3 pt-2">
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
            <div className="space-y-4">
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
                      <span>{g.cat || 'Pola Kalimat'}</span>
                      <span className="opacity-0 group-hover:opacity-100 text-accent transition-opacity">
                        Detail & Contoh →
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {filteredGrammar.length > renderLimit && (
                <div className="flex items-center justify-center gap-3 pt-2">
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
      <DetailModal
        item={selectedItem}
        type={itemType}
        onClose={() => setSelectedItem(null)}
      />

      {/* Kana Chart Modal (Hiragana & Katakana) */}
      <KanaChartModal
        isOpen={isKanaOpen}
        onClose={() => setIsKanaOpen(false)}
      />

      {/* Verb Conjugation Matrix Modal */}
      <ConjugationModal
        isOpen={isConjugationOpen}
        onClose={() => setIsConjugationOpen(false)}
      />

      {/* Grammar Nuance Comparison Inspector Modal */}
      <NuanceCompareModal
        isOpen={isNuanceOpen}
        onClose={() => setIsNuanceOpen(false)}
      />
    </div>
  );
};
