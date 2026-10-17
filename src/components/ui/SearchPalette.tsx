import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Volume2, BookOpen, Layers, ArrowRight } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { NormalizedVocab, NormalizedGrammar } from '../../lib/data/dataManager';
import { speakJapanese } from '../../lib/audio/tts';
import { initSearchPool, querySearchPool } from '../../lib/search/searchIndex';
import { useFocusTrap } from '../../hooks/useFocusTrap';

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
  const inputRef = useRef<HTMLInputElement>(null);
  const focusTrapRef = useFocusTrap<HTMLDivElement>(isOpen, onClose);

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
    }
  }, [isOpen]);

  // Handle escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Debounced live search
  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setVocabResults([]);
      setGrammarResults([]);
      return;
    }

    const timer = setTimeout(() => {
      const { vocabResults: v, grammarResults: g } = querySearchPool(q, 8);
      setVocabResults(v);
      setGrammarResults(g);
    }, 150);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 p-4 animate-in fade-in duration-200"
    >
      <div
        ref={focusTrapRef}
        role="dialog"
        aria-modal="true"
        aria-label="Kotak Pencarian Cepat Materi"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-surface border-2 border-accent/30 rounded-3xl overflow-hidden shadow-2xl space-y-4 animate-in zoom-in-95 duration-200 flex flex-col max-h-[80vh]"
      >
        {/* Search Header Input */}
        <div className="p-4 border-b border-accent/15 flex items-center gap-3">
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
              className="p-1 rounded-full hover:bg-surface-2 text-appText-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block text-[11px] font-mono bg-surface-2 text-appText-muted px-2 py-0.5 rounded border border-accent/20">
              ESC
            </kbd>
          )}
        </div>

        {/* Results Body */}
        <div className="p-4 overflow-y-auto space-y-5 flex-1">
          {!query.trim() ? (
            <div className="py-12 text-center space-y-2">
              <div className="text-3xl">🍙</div>
              <p className="text-sm font-semibold text-appText-bright">
                Pencarian Kilat Nugget Nihongo
              </p>
              <p className="text-xs text-appText-muted max-w-xs mx-auto">
                Ketikkan kata dalam bahasa Indonesia, romaji, kanji, atau hiragana.
              </p>
            </div>
          ) : vocabResults.length === 0 && grammarResults.length === 0 ? (
            <div className="py-10 text-center space-y-4">
              <div className="text-3xl">🔍</div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-appText-bright">
                  Tidak ada hasil untuk "{query}"
                </p>
                <p className="text-xs text-appText-muted max-w-sm mx-auto">
                  Coba periksa ejaan romaji atau ketuk salah satu saran kata kunci di bawah:
                </p>
              </div>

              {/* Helpful Suggestion Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 max-w-md mx-auto pt-1">
                {['taberu', 'sumimasen', 'arigatou', 'iku', 'desu', 'nomu', 'wa', 'kudasai'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setQuery(suggestion)}
                    className="px-3 py-1.5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-accent/20 text-xs font-semibold text-accent transition-all"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Vocab Section */}
              {vocabResults.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Kosakata ({vocabResults.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {vocabResults.map((v) => (
                      <div
                        key={v.id}
                        role="button"
                        tabIndex={0}
                        aria-label={`Kosakata ${v.word}, arti: ${v.meaning}`}
                        onClick={() => {
                          onSelectItem(v, 'vocab');
                          onClose();
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            onSelectItem(v, 'vocab');
                            onClose();
                          }
                        }}
                        className="p-3 rounded-2xl bg-surface-2 hover:bg-surface-3 border border-accent/15 hover:border-accent/40 flex items-center justify-between cursor-pointer transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-surface border border-accent/20 text-accent">
                            {v.level}
                          </span>
                          <div>
                            <div lang="ja" className="font-jp font-bold text-base text-appText-bright group-hover:text-amber-300">
                              {v.word}{' '}
                              {v.reading !== v.word && (
                                <span lang="ja" className="text-xs font-normal text-amber-400/80 font-jp">
                                  【{v.reading}】
                                </span>
                              )}
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
                            className="p-1.5 rounded-lg bg-surface text-appText-muted hover:text-accent transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                          <ArrowRight className="w-4 h-4 text-appText-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Grammar Section */}
              {grammarResults.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Tata Bahasa ({grammarResults.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {grammarResults.map((g) => (
                      <div
                        key={g.id}
                        role="button"
                        tabIndex={0}
                        aria-label={`Tata bahasa ${g.pattern}, arti: ${g.meaning}`}
                        onClick={() => {
                          onSelectItem(g, 'grammar');
                          onClose();
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            onSelectItem(g, 'grammar');
                            onClose();
                          }
                        }}
                        className="p-3 rounded-2xl bg-surface-2 hover:bg-surface-3 border border-accent/15 hover:border-accent/40 flex items-center justify-between cursor-pointer transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-surface border border-accent/20 text-accent">
                            {g.level}
                          </span>
                          <div>
                            <div lang="ja" className="font-jp font-bold text-sm text-appText-bright group-hover:text-amber-300">
                              {g.pattern}
                            </div>
                            <div className="text-xs text-appText-muted">{g.meaning}</div>
                          </div>
                        </div>

                        <ArrowRight className="w-4 h-4 text-appText-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-accent/15 bg-surface-2/40 text-[11px] text-appText-muted flex items-center justify-between px-5">
          <span>Pilih untuk melihat detail, contoh kalimat & audio</span>
          <span className="font-mono">ESC untuk tutup</span>
        </div>
      </div>
    </div>
  );
};
