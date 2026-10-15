import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Sparkles,
  BookOpen,
  Layers,
  Volume2,
  PenTool,
  Filter,
  CheckCircle2,
  X
} from 'lucide-react';
import {
  MasterKanjiItem,
  loadKanjiByLevel,
  loadMasterKanjiIndex,
  loadKanjiBookLens
} from '../../lib/data/kanjiManager';
import { KanjiStrokeModal } from './KanjiStrokeModal';
import { voiceManager } from '../../lib/audio/voiceManager';

interface KanjiDojoViewProps {
  onAskSensei?: (context: string) => void;
}

type LevelFilter = 'all' | 'n5' | 'n4' | 'n3' | 'n2' | 'n1';
type BookLensFilter = 'all' | 'genki' | 'minna' | 'soumatome';

export const KanjiDojoView: React.FC<KanjiDojoViewProps> = ({ onAskSensei }) => {
  const [selectedLevel, setSelectedLevel] = useState<LevelFilter>('n5');
  const [selectedLens, setSelectedLens] = useState<BookLensFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [kanjiList, setKanjiList] = useState<MasterKanjiItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedKanji, setSelectedKanji] = useState<MasterKanjiItem | null>(null);
  const [isStrokeModalOpen, setIsStrokeModalOpen] = useState<boolean>(false);
  const [bookLensData, setBookLensData] = useState<any | null>(null);

  // Load kanji for the selected level
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const fetchLevelData = async () => {
      try {
        if (selectedLevel === 'all') {
          // Default load N5 & N4 initially for performance
          const [n5, n4] = await Promise.all([
            loadKanjiByLevel('n5'),
            loadKanjiByLevel('n4')
          ]);
          if (isMounted) {
            setKanjiList([...n5, ...n4]);
            setLoading(false);
          }
        } else {
          const data = await loadKanjiByLevel(selectedLevel);
          if (isMounted) {
            setKanjiList(data);
            setLoading(false);
          }
        }
      } catch (err) {
        console.warn('Failed to load kanji list:', err);
        if (isMounted) setLoading(false);
      }
    };

    fetchLevelData();

    return () => {
      isMounted = false;
    };
  }, [selectedLevel]);

  // Load book lens data when book lens changes
  useEffect(() => {
    if (selectedLens === 'all') {
      setBookLensData(null);
      return;
    }

    let isMounted = true;
    loadKanjiBookLens(selectedLens).then((data) => {
      if (isMounted) setBookLensData(data);
    });

    return () => {
      isMounted = false;
    };
  }, [selectedLens]);

  // Extract set of characters allowed by the selected book lens
  const bookLensChars = useMemo<Set<string> | null>(() => {
    if (!bookLensData || !bookLensData.lessons) return null;
    const charSet = new Set<string>();
    Object.values(bookLensData.lessons).forEach((lesson: any) => {
      if (lesson.characters && Array.isArray(lesson.characters)) {
        lesson.characters.forEach((c: string) => charSet.add(c));
      }
    });
    return charSet;
  }, [bookLensData]);

  // Filtered kanji based on lens and search query
  const filteredKanji = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return kanjiList.filter((item) => {
      // Book Lens filter
      if (bookLensChars && !bookLensChars.has(item.character)) {
        return false;
      }

      // Search query filter
      if (!q) return true;
      if (item.character.includes(q)) return true;
      if (item.readings.onyomi.some((r) => r.toLowerCase().includes(q))) return true;
      if (item.readings.kunyomi.some((r) => r.toLowerCase().includes(q))) return true;
      if (item.meanings.id.some((m) => m.toLowerCase().includes(q))) return true;
      if (item.radical.name_id.toLowerCase().includes(q)) return true;

      return false;
    });
  }, [kanjiList, bookLensChars, searchQuery]);

  const handleCardClick = (item: MasterKanjiItem) => {
    setSelectedKanji(item);
    setIsStrokeModalOpen(true);
  };

  const handleAudioPlay = (e: React.MouseEvent, char: string) => {
    e.stopPropagation();
    voiceManager.speakText(char);
  };

  return (
    <div className="w-full max-w-full space-y-6 pb-12">
      {/* Dojo Banner & Hero */}
      <div className="rounded-2xl border border-theme bg-surface-variant/20 p-5 sm:p-7 relative overflow-hidden shadow-sm">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5 min-w-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-theme-primary/10 text-theme-primary border border-theme-primary/20 text-xs font-bold tracking-wide">
              <Sparkles size={14} />
              <span>Dojo Kanji Master · 2.383 Kanji N5–N1</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-text tracking-tight">
              Kurikulum & Urutan Goresan Kanji
            </h1>
            <p className="text-xs sm:text-sm text-muted max-w-2xl leading-relaxed">
              Kuasai kanji melalui kurikulum terstruktur JLPT N5–N1 atau lensa buku pegangan populer
              (GENKI, Minna no Nihongo, Soumatome), lengkap dengan animasi vektor goresan (KanjiVG) dan latihan kanvas interaktif.
            </p>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-theme">
            <div className="text-left sm:text-right">
              <span className="text-2xl sm:text-3xl font-black text-theme-primary">
                {filteredKanji.length}
              </span>
              <span className="text-xs text-muted block font-medium">Kanji Tersedia</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="space-y-3">
        {/* Level Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 max-w-full">
          <span className="text-xs font-bold text-muted uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <Layers size={14} />
            <span>Level:</span>
          </span>
          {[
            { id: 'all', label: 'N5+N4 Dasar' },
            { id: 'n5', label: 'N5 (84 Kanji)' },
            { id: 'n4', label: 'N4 (169 Kanji)' },
            { id: 'n3', label: 'N3 (387 Kanji)' },
            { id: 'n2', label: 'N2 (398 Kanji)' },
            { id: 'n1', label: 'N1 (1.345 Kanji)' }
          ].map((lvl) => (
            <button
              key={lvl.id}
              onClick={() => setSelectedLevel(lvl.id as LevelFilter)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all active:scale-95 ${
                selectedLevel === lvl.id
                  ? 'bg-theme-primary text-white shadow-sm'
                  : 'bg-surface border border-theme text-muted hover:text-text hover:bg-surface-variant'
              }`}
            >
              {lvl.label}
            </button>
          ))}
        </div>

        {/* Book Lens Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 max-w-full">
          <span className="text-xs font-bold text-muted uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <BookOpen size={14} />
            <span>Lensa Buku:</span>
          </span>
          {[
            { id: 'all', label: 'Semua (Standar JLPT)' },
            { id: 'genki', label: 'GENKI I & II (303 Kanji)' },
            { id: 'minna', label: 'Minna no Nihongo (518 Kanji)' },
            { id: 'soumatome', label: 'Nihongo Sou Matome' }
          ].map((lens) => (
            <button
              key={lens.id}
              onClick={() => setSelectedLens(lens.id as BookLensFilter)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all active:scale-95 ${
                selectedLens === lens.id
                  ? 'bg-amber-600 text-white font-bold shadow-sm'
                  : 'bg-surface border border-theme text-muted hover:text-text hover:bg-surface-variant'
              }`}
            >
              {lens.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
            <Search size={18} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kanji (karakter, onyomi, kunyomi, atau arti Indonesia: makan, hari, air)..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-theme bg-surface text-text text-sm placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-theme-primary/30 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted hover:text-text"
              aria-label="Bersihkan pencarian"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Kanji Cards Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3 text-muted">
          <div className="w-10 h-10 border-3 border-theme-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium">Memuat pustaka kanji...</p>
        </div>
      ) : filteredKanji.length === 0 ? (
        <div className="py-16 text-center rounded-2xl border border-dashed border-theme bg-surface-variant/20 p-8 space-y-3">
          <p className="text-base font-bold text-text">Kanji tidak ditemukan</p>
          <p className="text-xs text-muted max-w-md mx-auto">
            Tidak ada kanji yang cocok dengan kriteria pencarian "{searchQuery}" atau filter buku yang dipilih.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedLens('all');
            }}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-theme-primary text-white hover:brightness-110 active:scale-95 transition-all"
          >
            Reset Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filteredKanji.map((item) => {
            const meaningsId = item.meanings.id.join(', ');
            const onyomiPreview = item.readings.onyomi.slice(0, 2).join('、');
            const kunyomiPreview = item.readings.kunyomi.slice(0, 2).join('、');

            return (
              <div
                key={item.id}
                onClick={() => handleCardClick(item)}
                className="group relative rounded-xl border border-theme bg-surface hover:border-theme-primary/50 hover:shadow-md transition-all duration-200 cursor-pointer p-4 flex flex-col justify-between overflow-hidden active:scale-[0.98]"
              >
                {/* Top Badge: Level & Strokes */}
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-black bg-theme-primary/10 text-theme-primary border border-theme-primary/20">
                    {item.level}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-muted font-medium">
                      {item.strokes} g
                    </span>
                    <button
                      onClick={(e) => handleAudioPlay(e, item.character)}
                      aria-label={`Dengarkan ${item.character}`}
                      className="p-1 text-muted hover:text-theme-primary rounded transition-colors active:scale-90"
                    >
                      <Volume2 size={13} />
                    </button>
                  </div>
                </div>

                {/* Center Character */}
                <div className="my-2 text-center">
                  <span className="text-4xl sm:text-5xl font-black font-japanese text-text group-hover:text-theme-primary transition-colors">
                    {item.character}
                  </span>
                </div>

                {/* Bottom: Meaning and Readings */}
                <div className="space-y-1 pt-2 border-t border-theme/60 text-center">
                  <p className="text-xs font-bold text-text truncate">
                    {meaningsId}
                  </p>
                  <p className="text-[10px] text-muted font-japanese truncate">
                    {onyomiPreview || kunyomiPreview || '-'}
                  </p>
                </div>

                {/* Subtle Hover Cue */}
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-theme-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center" />
              </div>
            );
          })}
        </div>
      )}

      {/* Interactive Kanji Detail & Stroke Modal */}
      <KanjiStrokeModal
        kanji={selectedKanji}
        isOpen={isStrokeModalOpen}
        onClose={() => setIsStrokeModalOpen(false)}
        onAskSensei={(char) => {
          if (onAskSensei) {
            onAskSensei(`Sensei, mohon jelaskan etimologi, cara mengingat (mnemonic), dan penggunaan kanji 「${char}」 beserta contoh kalimat sehari-hari.`);
          }
        }}
      />
    </div>
  );
};
