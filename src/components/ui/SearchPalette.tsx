import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, Volume2, BookOpen, Layers, ArrowRight, Clock, Trash2, Filter } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { NormalizedVocab, NormalizedGrammar } from '../../lib/data/dataManager';
import { speakJapanese } from '../../lib/audio/tts';
import { initSearchPool, querySearchPool } from '../../lib/search/searchIndex';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { IrasutoyaImage } from '../common/IrasutoyaImage';
import { RubyText } from './RubyText';

interface SearchPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectItem: (item: NormalizedVocab | NormalizedGrammar, type: 'vocab' | 'grammar') => void;
}

export const SearchPalette: React.FC<SearchPaletteProps> = ({ isOpen, onClose, onSelectItem }) => {
  const [query, setQuery] = useState('');
  const [vocabResults, setVocabResults] = useState<NormalizedVocab[]>([]);
  const [grammarResults, setGrammarResults] = useState<NormalizedGrammar[]>([]);
  const [isInitializing, setIsInitializing] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [levelFilter, setLevelFilter] = useState<'all' | 'N5' | 'N4' | 'N3'>('all');
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem('nn_recent_searches');
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string') : [];
    } catch {
      return [];
    }
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const focusTrapRef = useFocusTrap<HTMLDivElement>(isOpen, onClose);
  const selectedItemRef = useRef<HTMLDivElement>(null);

  // Filtered results based on level
  const filteredVocab = useMemo(() => {
    if (levelFilter === 'all') return vocabResults;
    return vocabResults.filter((v) => v.level.toUpperCase() === levelFilter);
  }, [vocabResults, levelFilter]);

  const filteredGrammar = useMemo(() => {
    if (levelFilter === 'all') return grammarResults;
    return grammarResults.filter((g) => g.level.toUpperCase() === levelFilter);
  }, [grammarResults, levelFilter]);

  // Combined results array for keyboard navigation
  const combinedResults = useMemo(() => [
    ...(Array.isArray(filteredVocab) ? filteredVocab : []).map((v) => ({ item: v, type: 'vocab' as const })),
    ...(Array.isArray(filteredGrammar) ? filteredGrammar : []).map((g) => ({ item: g, type: 'grammar' as const })),
  ], [filteredVocab, filteredGrammar]);

  // Reset selectedIndex whenever results list changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [combinedResults]);

  // Scroll active item into view
  useEffect(() => {
    selectedItemRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [selectedIndex]);

  // Save recent search
  const saveRecentSearch = (term: string) => {
    const trimmed = (term || '').trim();
    if (!trimmed) return;
    try {
      const safeRecent = Array.isArray(recentSearches) ? recentSearches : [];
      const updated = [
        trimmed,
        ...safeRecent.filter((x) => typeof x === 'string' && x.toLowerCase() !== trimmed.toLowerCase()),
      ].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('nn_recent_searches', JSON.stringify(updated));
    } catch {}
  };

  const clearRecentSearches = () => {
    try {
      localStorage.removeItem('nn_recent_searches');
      setRecentSearches([]);
    } catch {}
  };

  // Initialize search pool lazily on palette open (Ticket T-36: Eliminate eager 10-script DOM bomb)
  useEffect(() => {
    if (isOpen) {
      setIsInitializing(true);
      initSearchPool().then(() => setIsInitializing(false));
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setVocabResults([]);
      setGrammarResults([]);
      setSelectedIndex(0);
      setLevelFilter('all');
    }
  }, [isOpen]);

  // Handle escape, arrow keys and Enter navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        if (combinedResults.length > 0) {
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % combinedResults.length);
        }
      } else if (e.key === 'ArrowUp') {
        if (combinedResults.length > 0) {
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + combinedResults.length) % combinedResults.length);
        }
      } else if (e.key === 'Enter') {
        if (combinedResults.length > 0 && combinedResults[selectedIndex]) {
          e.preventDefault();
          const target = combinedResults[selectedIndex];
          saveRecentSearch(query || ('word' in target.item ? target.item.word : target.item.pattern));
          onSelectItem(target.item, target.type);
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, combinedResults, selectedIndex, onSelectItem, query, recentSearches]);

  // Debounced live search
  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setVocabResults([]);
      setGrammarResults([]);
      return;
    }

    const timer = setTimeout(() => {
      const { vocabResults: v, grammarResults: g } = querySearchPool(q, 10);
      setVocabResults(v);
      setGrammarResults(g);
    }, 150);

    return () => clearTimeout(timer);
  }, [query]);

  const getLevelBadgeClass = (lvl: string) => {
    const norm = lvl.toLowerCase();
    if (norm.includes('n5')) return 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30';
    if (norm.includes('n4')) return 'bg-sky-500/15 text-sky-800 dark:text-sky-300 border-sky-500/30';
    if (norm.includes('n3')) return 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30';
    return 'bg-surface border-accent/20 text-amber-800 dark:text-amber-300';
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-14 sm:pt-20 p-3 sm:p-4 animate-in fade-in duration-200"
    >
      <div
        ref={focusTrapRef}
        role="dialog"
        aria-modal="true"
        aria-label="Kotak Pencarian Cepat Materi"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-surface border-2 border-accent/30 focus-within:border-accent focus-within:shadow-[0_0_30px_rgba(245,158,11,0.25)] rounded-3xl overflow-hidden shadow-2xl space-y-3 animate-in zoom-in-95 duration-200 flex flex-col max-h-[85dvh] sm:max-h-[80vh]"
      >
        {/* Search Header Input */}
        <div className="p-3 sm:p-4 border-b border-accent/15 flex items-center gap-3">
          <Search className="w-5 h-5 text-accent shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded={query.trim().length > 0}
            aria-autocomplete="list"
            aria-label="Cari kanji, kosakata, pola tata bahasa"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari kanji, kosakata, pola tata bahasa..."
            className="w-full bg-transparent text-base sm:text-lg text-appText-bright placeholder-appText-muted/60 focus:outline-none font-medium"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              aria-label="Hapus kata kunci pencarian"
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full hover:bg-surface-2 text-appText-muted hover:text-appText-bright flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block text-xs font-mono bg-surface-2 text-appText-muted px-2 py-0.5 rounded border border-accent/20">
              ESC
            </kbd>
          )}
        </div>

        {/* Level Filter Pills Bar */}
        <div className="px-4 pb-1 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs">
          <span className="text-appText-muted shrink-0 flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3 text-accent" />
            <span>Level:</span>
          </span>
          {(['all', 'N5', 'N4', 'N3'] as const).map((lvl) => (
            <button
              key={lvl}
              type="button"
              onClick={() => setLevelFilter(lvl)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all shrink-0 active:scale-95 ${
                levelFilter === lvl
                  ? 'bg-amber-500 text-stone-950 shadow-xs'
                  : 'bg-surface-2 hover:bg-surface-3 text-appText-muted hover:text-appText-bright border border-accent/15'
              }`}
            >
              {lvl === 'all' ? 'Semua' : lvl}
            </button>
          ))}
        </div>

        {/* ARIA Live Announcer */}
        <div aria-live="polite" className="sr-only">
          {query.trim()
            ? `Ditemukan ${filteredVocab.length} kosakata dan ${filteredGrammar.length} pola tata bahasa.`
            : 'Menampilkan saran pencarian dan riwayat.'}
        </div>

        {/* Results Body */}
        <div className="p-4 pt-1 overflow-y-auto space-y-5 flex-1">
          {!query.trim() ? (
            <div className="py-4 space-y-5">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="space-y-2 text-left">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-accent px-1">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-accent" />
                      <span>Riwayat Pencarian</span>
                    </span>
                    <button
                      type="button"
                      onClick={clearRecentSearches}
                      className="text-appText-muted hover:text-rose-400 text-xs flex items-center gap-1 active:scale-95 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Hapus</span>
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => setQuery(term)}
                        className="px-3 py-1.5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-accent/20 text-xs font-bold text-appText-bright flex items-center gap-1.5 active:scale-95 transition-all"
                      >
                        <Clock className="w-3 h-3 text-accent" />
                        <span>{term}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Suggestions */}
              <div className="space-y-2 text-left">
                <div className="text-xs font-bold uppercase tracking-wider text-accent px-1">
                  Kata Kunci Populer
                </div>
                <div className="flex flex-wrap gap-2">
                  {['taberu', 'sumimasen', 'arigatou', 'iku', 'desu', 'nomu', 'wa', 'kudasai'].map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => setQuery(suggestion)}
                      className="px-3 py-1.5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-accent/20 text-xs font-bold text-accent active:scale-95 transition-all"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>

              {/* Illustration Info */}
              <div className="py-4 text-center space-y-2">
                <div className="w-16 h-16 mx-auto flex items-center justify-center">
                  <IrasutoyaImage
                    assetId="senpai_studying"
                    className="w-16 h-16 object-contain"
                    alt="Pencarian Kilat Nugget Nihongo"
                    animateFloat
                  />
                </div>
                <p className="text-xs text-appText-muted max-w-xs mx-auto">
                  Ketikkan kata dalam bahasa Indonesia, romaji, kanji, atau hiragana.
                </p>
              </div>
            </div>
          ) : filteredVocab.length === 0 && filteredGrammar.length === 0 ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 mx-auto flex items-center justify-center">
                <IrasutoyaImage
                  assetId="daruma_recovery"
                  className="w-14 h-14 object-contain"
                  alt="Tidak Ada Hasil"
                  animateFloat
                />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-appText-bright">
                  Tidak ada hasil untuk "{query}" {levelFilter !== 'all' ? `di level ${levelFilter}` : ''}
                </p>
                <p className="text-xs text-appText-muted max-w-sm mx-auto">
                  Coba periksa ejaan romaji atau ganti filter level ke "Semua".
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Vocab Section */}
              {filteredVocab.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Kosakata ({filteredVocab.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {filteredVocab.map((v, idx) => {
                      const isSelected = selectedIndex === idx;
                      return (
                        <div
                          key={v.id}
                          ref={isSelected ? selectedItemRef : undefined}
                          role="button"
                          tabIndex={0}
                          aria-label={`Kosakata ${v.word}, arti: ${v.meaning}`}
                          onClick={() => {
                            saveRecentSearch(query || v.word);
                            onSelectItem(v, 'vocab');
                            onClose();
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              saveRecentSearch(query || v.word);
                              onSelectItem(v, 'vocab');
                              onClose();
                            }
                          }}
                          className={`card-interactive-lift p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                            isSelected
                              ? 'ring-2 ring-amber-500 bg-amber-500/15 border-amber-500/50 shadow-md'
                              : 'bg-surface-2 hover:bg-surface-3 border-accent/15 hover:border-accent/40'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`text-xs font-extrabold uppercase px-2 py-0.5 rounded-full border ${getLevelBadgeClass(v.level)}`}>
                              {v.level}
                            </span>
                            <div>
                              <div lang="ja" className="font-jp font-bold text-base text-appText-bright group-hover:text-amber-600 dark:group-hover:text-amber-300">
                                <RubyText
                                  text={v.word}
                                  furigana={v.reading !== v.word ? v.reading : undefined}
                                  showFurigana
                                />
                              </div>
                              <div className="text-xs text-appText-muted">{v.meaning}</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              aria-label={`Putar pelafalan kata ${v.word}`}
                              title={`Putar pelafalan kata ${v.word}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                speakJapanese(v.word);
                              }}
                              className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-lg bg-surface hover:bg-surface-3 text-appText-muted hover:text-accent transition-all flex items-center justify-center active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                            <ArrowRight className="w-4 h-4 text-appText-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Grammar Section */}
              {filteredGrammar.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Tata Bahasa ({filteredGrammar.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {filteredGrammar.map((g, idx) => {
                      const isSelected = selectedIndex === filteredVocab.length + idx;
                      return (
                        <div
                          key={g.id}
                          ref={isSelected ? selectedItemRef : undefined}
                          role="button"
                          tabIndex={0}
                          aria-label={`Tata bahasa ${g.pattern}, arti: ${g.meaning}`}
                          onClick={() => {
                            saveRecentSearch(query || g.pattern);
                            onSelectItem(g, 'grammar');
                            onClose();
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              saveRecentSearch(query || g.pattern);
                              onSelectItem(g, 'grammar');
                              onClose();
                            }
                          }}
                          className={`card-interactive-lift p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                            isSelected
                              ? 'ring-2 ring-amber-500 bg-amber-500/15 border-amber-500/50 shadow-md'
                              : 'bg-surface-2 hover:bg-surface-3 border-accent/15 hover:border-accent/40'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`text-xs font-extrabold uppercase px-2 py-0.5 rounded-full border ${getLevelBadgeClass(g.level)}`}>
                              {g.level}
                            </span>
                            <div>
                              <div lang="ja" className="font-jp font-bold text-sm text-appText-bright group-hover:text-amber-600 dark:group-hover:text-amber-300">
                                {g.pattern}
                              </div>
                              <div className="text-xs text-appText-muted">{g.meaning}</div>
                            </div>
                          </div>

                          <ArrowRight className="w-4 h-4 text-appText-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-accent/15 bg-surface-2/40 text-xs text-appText-muted flex items-center justify-between px-5">
          <span>Pilih untuk melihat detail, contoh kalimat & audio</span>
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="hidden sm:inline">↑↓ Navigasi</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">↵ Pilih</span>
            <span className="hidden sm:inline">·</span>
            <span>ESC Tutup</span>
          </div>
        </div>
      </div>
    </div>
  );
};
