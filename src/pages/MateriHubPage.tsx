import React, { useState, useEffect, useMemo } from 'react';
import { BookOpen, Award, BookMarked, Search, Volume2, Sparkles, Filter, ChevronRight, Layers } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { JLPTLevel } from '../types/vocab';
import { loadVocab, loadGrammar, NormalizedVocab, NormalizedGrammar } from '../lib/data/dataManager';
import { speakJapanese } from '../lib/audio/tts';
import { DetailModal } from '../components/ui/DetailModal';

export const MateriHubPage: React.FC = () => {
  const { selectedLevel, setSelectedLevel, searchQuery, setSearchQuery } = useAppStore();
  const [activeTrack, setActiveTrack] = useState<'jlpt' | 'buku'>('jlpt');
  const [activeTab, setActiveTab] = useState<'all' | 'vocab' | 'grammar'>('vocab');

  // Loaded items
  const [vocabList, setVocabList] = useState<NormalizedVocab[]>([]);
  const [grammarList, setGrammarList] = useState<NormalizedGrammar[]>([]);
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
    ]).then(([vocabs, grammars]) => {
      if (!isCancelled) {
        setVocabList(vocabs);
        setGrammarList(grammars);
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
    if (!searchQuery.trim()) return grammarList;
    const q = searchQuery.toLowerCase().trim();
    return grammarList.filter(
      (g) =>
        g.pattern.toLowerCase().includes(q) ||
        g.reading.toLowerCase().includes(q) ||
        g.meaning.toLowerCase().includes(q)
    );
  }, [grammarList, searchQuery]);

  // Max items to render in list for instantaneous rendering
  const [renderLimit, setRenderLimit] = useState(60);

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-extrabold text-appText-bright mb-1">Materi Hub · 学習ハブ</h1>
        <p className="text-xs text-appText-muted">Eksplor 4.800+ kosakata dan 850+ tata bahasa JLPT dengan audio pelafalan asli.</p>
      </div>

      {/* The Two-Door Gateways (Side-by-side on desktop/tablet) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div
          onClick={() => setActiveTrack('jlpt')}
          className={`cursor-pointer rounded-3xl p-6 border-2 transition-all duration-200 ${
            activeTrack === 'jlpt'
              ? 'bg-amber-950/30 border-amber-500/60 shadow-glow'
              : 'bg-surface border-accent/20 hover:border-accent/40'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-accent-hot flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-accent px-2.5 py-0.5 rounded-full bg-amber-500/15">
              Jalur Standar
            </span>
          </div>
          <h2 className="text-lg font-bold text-appText-bright">Jalur JLPT (N5 — N1)</h2>
          <p className="text-xs text-appText-muted mt-1 leading-relaxed">
            Terstruktur rapi sesuai standar resmi ujian kemampuan bahasa Jepang internasional.
          </p>
        </div>

        <div
          onClick={() => setActiveTrack('buku')}
          className={`cursor-pointer rounded-3xl p-6 border-2 transition-all duration-200 ${
            activeTrack === 'buku'
              ? 'bg-amber-950/30 border-amber-500/60 shadow-glow'
              : 'bg-surface border-accent/20 hover:border-accent/40'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-accent-hot flex items-center justify-center">
              <BookMarked className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-accent px-2.5 py-0.5 rounded-full bg-amber-500/15">
              Jalur Buku Pegangan
            </span>
          </div>
          <h2 className="text-lg font-bold text-appText-bright">Jalur Buku Teks</h2>
          <p className="text-xs text-appText-muted mt-1 leading-relaxed">
            Cocok bagi yang belajar dengan buku Minna no Nihongo atau materi praktis Irodori Japan Foundation.
          </p>
        </div>
      </div>

      {/* JLPT Level Selector Pills */}
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
              Menampilkan level {(selectedLevel === 'all' ? 'n5' : selectedLevel).toUpperCase()}
            </span>
          </div>

          {/* Content Grid */}
          {isLoading ? (
            <div className="py-12 text-center text-xs text-appText-muted animate-pulse">
              Memuat database kosakata & tata bahasa... 🍙
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
                        {v.reading && v.reading !== v.word && (
                          <div className="text-xs font-jp text-amber-400/80">
                            【{v.reading}】
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
                <div className="text-center pt-2">
                  <button
                    onClick={() => setRenderLimit((prev) => prev + 60)}
                    className="px-6 py-2.5 rounded-xl bg-surface-2 border border-accent/20 hover:border-accent/40 text-xs font-bold text-appText-bright transition-all"
                  >
                    Muat Lebih Banyak ({filteredVocab.length - renderLimit} tersisa)
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
                <div className="text-center pt-2">
                  <button
                    onClick={() => setRenderLimit((prev) => prev + 60)}
                    className="px-6 py-2.5 rounded-xl bg-surface-2 border border-accent/20 hover:border-accent/40 text-xs font-bold text-appText-bright transition-all"
                  >
                    Muat Lebih Banyak ({filteredGrammar.length - renderLimit} tersisa)
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Book Track Placeholder */}
      {activeTrack === 'buku' && (
        <div className="bg-surface border border-accent/20 rounded-2xl p-8 text-center space-y-3">
          <div className="text-4xl">📚</div>
          <h3 className="font-bold text-base text-appText-bright">Jalur Buku Teks</h3>
          <p className="text-xs text-appText-muted max-w-md mx-auto leading-relaxed">
            Materi terindeks per bab untuk Minna no Nihongo I & II serta Irodori A1 & A2 sedang dikaitkan ke indeks kosakata terpadu.
          </p>
        </div>
      )}

      {/* Detail Modal */}
      <DetailModal
        item={selectedItem}
        type={itemType}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
};
