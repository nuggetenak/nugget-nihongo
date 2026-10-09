import React, { useState, useEffect } from 'react';
import { BookOpen, ChevronRight, Volume2, Sparkles } from 'lucide-react';
import { loadBook, BookData, NormalizedVocab, NormalizedGrammar } from '../../lib/data/dataManager';
import { speakJapanese } from '../../lib/audio/tts';

interface BookTrackBrowserProps {
  vocabList: NormalizedVocab[];
  grammarList: NormalizedGrammar[];
  onSelectItem: (item: NormalizedVocab | NormalizedGrammar, type: 'vocab' | 'grammar') => void;
}

export const BookTrackBrowser: React.FC<BookTrackBrowserProps> = ({
  vocabList,
  grammarList,
  onSelectItem,
}) => {
  const [selectedBookKey, setSelectedBookKey] = useState<'minna1' | 'minna2' | 'irodori-a1' | 'irodori-a2-1'>('minna1');
  const [bookData, setBookData] = useState<BookData | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const books: Array<{ key: 'minna1' | 'minna2' | 'irodori-a1' | 'irodori-a2-1'; title: string; desc: string; icon: string }> = [
    { key: 'minna1', title: 'Minna no Nihongo I', desc: 'Bab 1 - 25 · Dasar Shokyuu I', icon: '📘' },
    { key: 'minna2', title: 'Minna no Nihongo II', desc: 'Bab 26 - 50 · Lanjutan Shokyuu II', icon: '📗' },
    { key: 'irodori-a1', title: 'Irodori A1', desc: 'Katsudou & Rikai A1 · Hidup di Jepang', icon: '📙' },
    { key: 'irodori-a2-1', title: 'Irodori A2.1', desc: 'Tingkat Lanjutan A2.1', icon: '📕' },
  ];

  useEffect(() => {
    setIsLoading(true);
    loadBook(selectedBookKey).then((data) => {
      setBookData(data);
      setSelectedChapter(1);
      setIsLoading(false);
    });
  }, [selectedBookKey]);

  const currentUnit = bookData?.units?.[selectedChapter];

  // Resolve matching vocab items
  const chapterVocabs = (currentUnit?.vocab_ids || [])
    .map((vid) => vocabList.find((v) => v.id === vid))
    .filter(Boolean) as NormalizedVocab[];

  // Resolve matching grammar items
  const chapterGrammars = (currentUnit?.grammar_ids || [])
    .map((gid) => grammarList.find((g) => g.id === gid))
    .filter(Boolean) as NormalizedGrammar[];

  const availableChapters = bookData ? Object.keys(bookData.units).map(Number).sort((a, b) => a - b) : [];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Book Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {books.map((b) => {
          const isSelected = selectedBookKey === b.key;
          return (
            <button
              key={b.key}
              onClick={() => setSelectedBookKey(b.key)}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'bg-amber-950/40 border-amber-500/50 shadow-sm'
                  : 'bg-surface-2 border-accent/20 hover:border-accent/40'
              }`}
            >
              <div className="text-2xl mb-1">{b.icon}</div>
              <div className="font-bold text-xs text-appText-bright leading-tight">{b.title}</div>
              <div className="text-[10px] text-appText-muted mt-0.5">{b.desc}</div>
            </button>
          );
        })}
      </div>

      {isLoading ? (
        <div className="py-12 text-center text-xs text-appText-muted animate-pulse">
          Memuat indeks kurikulum buku... 📚
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Chapter Selector Sidebar */}
          <div className="bg-surface border border-accent/20 rounded-2xl p-4 space-y-2 max-h-[500px] overflow-y-auto">
            <div className="text-xs font-bold text-appText-bright border-b border-accent/15 pb-2">
              Daftar Bab / Bab Pelajaran:
            </div>
            <div className="space-y-1">
              {availableChapters.map((ch) => {
                const u = bookData?.units[ch];
                const isSelected = selectedChapter === ch;
                return (
                  <button
                    key={ch}
                    onClick={() => setSelectedChapter(ch)}
                    className={`w-full p-2.5 rounded-xl text-left text-xs transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-accent text-bg font-bold shadow-sm'
                        : 'text-appText-muted hover:bg-surface-2 hover:text-appText-bright'
                    }`}
                  >
                    <div className="truncate pr-2">
                      <span className="font-mono font-bold mr-1.5">Bab {ch}:</span>
                      <span>{u?.topic || 'Latihan'}</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-60" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chapter Content Details */}
          <div className="md:col-span-2 space-y-6">
            {/* Header info */}
            <div className="bg-surface-2 border border-accent/20 rounded-2xl p-5 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-accent">
                Bab {selectedChapter} · Kurikulum Buku
              </span>
              <h3 className="text-lg font-bold text-appText-bright">
                {currentUnit?.topic || 'Materi Pelajaran'}
              </h3>
              <div className="text-xs text-appText-muted">
                {currentUnit?.vocab_ids?.length || 0} Kosakata terkait · {currentUnit?.grammar_ids?.length || 0} Pola Tata Bahasa
              </div>
            </div>

            {/* Vocab in this Chapter */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs text-appText-bright flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Kosakata Bab Ini:</span>
              </h4>

              {chapterVocabs.length === 0 ? (
                <div className="p-4 rounded-xl bg-surface-2/60 border border-accent/10 text-xs text-appText-muted italic">
                  Kosakata bab ini terhubung ke materi umum N5/N4.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {chapterVocabs.map((v) => (
                    <div
                      key={v.id}
                      onClick={() => onSelectItem(v, 'vocab')}
                      className="bg-surface-2 hover:bg-surface-3 border border-accent/20 rounded-xl p-3 flex items-start justify-between cursor-pointer transition-all hover:-translate-y-0.5"
                    >
                      <div>
                        <div className="font-jp font-bold text-base text-appText-bright">
                          {v.word}
                        </div>
                        {v.reading && v.reading !== v.word && (
                          <div className="text-[11px] font-jp text-amber-300">
                            【{v.reading}】
                          </div>
                        )}
                        <div className="text-xs text-appText font-medium mt-1">
                          {v.meaning}
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakJapanese(v.word);
                        }}
                        className="p-1 rounded-lg bg-surface text-appText-muted hover:text-accent transition-all shrink-0"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Grammar in this Chapter */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs text-appText-bright flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                <span>Tata Bahasa Bab Ini:</span>
              </h4>

              {chapterGrammars.length === 0 ? (
                <div className="p-4 rounded-xl bg-surface-2/60 border border-accent/10 text-xs text-appText-muted italic">
                  Tata bahasa bab ini terhubung ke materi pola kalimat N5/N4.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {chapterGrammars.map((g) => (
                    <div
                      key={g.id}
                      onClick={() => onSelectItem(g, 'grammar')}
                      className="bg-surface-2 hover:bg-surface-3 border border-accent/20 rounded-xl p-3.5 flex items-start justify-between cursor-pointer transition-all hover:-translate-y-0.5"
                    >
                      <div className="space-y-0.5">
                        <div className="font-jp font-bold text-sm text-appText-bright">
                          {g.pattern}
                        </div>
                        <div className="text-xs text-appText-muted">
                          {g.meaning}
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakJapanese(g.pattern);
                        }}
                        className="p-1 rounded-lg bg-surface text-appText-muted hover:text-accent transition-all shrink-0"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
