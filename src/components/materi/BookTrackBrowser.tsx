// ══════════════════════════════════════════════════════════════════
//  BookTrackBrowser.tsx — Perpustakaan 9 Buku Teks & Authentic Drills
//  Covers Minna, Genki, Soumatome, Tobira, Quartet, TRY!, SKM,
//  Irodori, and Marugoto with interactive signature drills
// ══════════════════════════════════════════════════════════════════

import React, { useState, useEffect, useMemo } from 'react';
import {
  BookOpen,
  ChevronRight,
  Volume2,
  Sparkles,
  Award,
  Zap,
  CheckCircle2,
  Layers,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Info,
} from 'lucide-react';
import {
  loadBookDrills,
  loadStagedBooksCatalog,
  BookSeriesMeta,
  AuthenticDrillItem,
} from '../../lib/data/authenticExerciseManager';
import { BOOK_PEDAGOGY_REGISTRY } from '../../lib/data/bookPedagogyMatrix';
import { AuthenticDrillModal } from './AuthenticDrillModal';
import { speakJapanese } from '../../lib/audio/tts';
import { useAppStore } from '../../store/useAppStore';
import { NormalizedVocab, NormalizedGrammar } from '../../lib/data/dataManager';

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
  const { openLessonStudy } = useAppStore();

  const [booksCatalog, setBooksCatalog] = useState<BookSeriesMeta[]>([]);
  const [selectedBookId, setSelectedBookId] = useState<string>('minna');
  const [selectedVolumeIndex, setSelectedVolumeIndex] = useState<number>(0);
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [drillsByChapter, setDrillsByChapter] = useState<
    Record<string, { chapter: number | string; topic?: string; drills: AuthenticDrillItem[] }>
  >({});
  const [isLoadingCatalog, setIsLoadingCatalog] = useState<boolean>(true);
  const [isLoadingDrills, setIsLoadingDrills] = useState<boolean>(false);

  // Drill Modal state
  const [isDrillModalOpen, setIsDrillModalOpen] = useState(false);

  // Load 9-Book staged catalog
  useEffect(() => {
    let isMounted = true;
    loadStagedBooksCatalog().then((books) => {
      if (isMounted) {
        setBooksCatalog(books);
        setIsLoadingCatalog(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const activeBook = useMemo(() => {
    return booksCatalog.find((b) => b.id === selectedBookId) || booksCatalog[0];
  }, [booksCatalog, selectedBookId]);

  const activeVolume = useMemo(() => {
    if (!activeBook || !activeBook.volumes) return null;
    return activeBook.volumes[selectedVolumeIndex] || activeBook.volumes[0];
  }, [activeBook, selectedVolumeIndex]);

  const [isPedagogyExpanded, setIsPedagogyExpanded] = useState<boolean>(true);

  const activePedagogy = useMemo(() => {
    return BOOK_PEDAGOGY_REGISTRY[selectedBookId] || null;
  }, [selectedBookId]);

  const chapterRationale = useMemo(() => {
    if (!activePedagogy || !activePedagogy.chapterRationales) return null;
    return activePedagogy.chapterRationales[selectedChapter] || null;
  }, [activePedagogy, selectedChapter]);

  // Load authentic drills whenever activeBook or activeVolume changes
  useEffect(() => {
    if (!activeBook) return;
    setIsLoadingDrills(true);

    const volumeKey =
      selectedBookId === 'minna'
        ? selectedVolumeIndex === 1
          ? '2'
          : '1'
        : selectedBookId === 'genki'
        ? selectedVolumeIndex === 1
          ? '2'
          : '1'
        : selectedBookId === 'quartet'
        ? selectedVolumeIndex === 1
          ? '2'
          : '1'
        : activeVolume?.jlpt || activeVolume?.label || '1';

    loadBookDrills(selectedBookId, volumeKey)
      .then((drillsMap) => {
        setDrillsByChapter(drillsMap || {});
        setSelectedChapter(1);
        setIsLoadingDrills(false);
      })
      .catch(() => {
        setDrillsByChapter({});
        setIsLoadingDrills(false);
      });
  }, [selectedBookId, selectedVolumeIndex, activeVolume]);

  const totalChapters = useMemo(() => {
    if (!activeVolume) return 25;
    return (
      activeVolume.chapters ||
      activeVolume.units ||
      activeVolume.weeks ||
      activeVolume.lessons ||
      activeVolume.topics ||
      10
    );
  }, [activeVolume]);

  const chapterList = useMemo(() => {
    const list: number[] = [];
    for (let i = 1; i <= totalChapters; i++) {
      list.push(i);
    }
    return list;
  }, [totalChapters]);

  const currentChapterDrillData = drillsByChapter[String(selectedChapter)] || {
    chapter: selectedChapter,
    topic: `Bab ${selectedChapter}`,
    drills: [],
  };

  const currentDrills = currentChapterDrillData.drills || [];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 9-Book Series Switcher Carousel */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-accent" />
            <span className="text-xs font-bold uppercase tracking-wider text-appText-bright">
              Katalog 9 Buku Teks Jepang Resmi
            </span>
          </div>
          <span className="text-[11px] text-accent font-semibold">
            {booksCatalog.length} Seri Kanonikal
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {booksCatalog.map((b) => {
            const isSelected = selectedBookId === b.id;
            return (
              <button
                key={b.id}
                onClick={() => {
                  setSelectedBookId(b.id);
                  setSelectedVolumeIndex(0);
                }}
                className={`p-3 rounded-2xl border text-left transition-all active:scale-98 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-500/20 border-accent text-appText-bright shadow-glow font-bold'
                    : 'bg-surface-2 border-accent/15 text-appText-muted hover:border-accent/40 hover:text-appText-bright'
                }`}
              >
                <div>
                  <div className="text-xs font-black truncate">{b.title}</div>
                  <div className="text-[10px] font-jp text-accent truncate mt-0.5">
                    {b.title_ja}
                  </div>
                </div>
                <div className="text-[9px] text-appText-muted/80 mt-2 truncate">
                  {b.publisher}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Book Volumes & Editions Pills */}
      {activeBook && activeBook.volumes && activeBook.volumes.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
          <span className="text-xs font-bold text-appText-muted shrink-0 mr-1">Jilid / Level:</span>
          {activeBook.volumes.map((vol, idx) => {
            const isSelected = selectedVolumeIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedVolumeIndex(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all active:scale-95 cursor-pointer ${
                  isSelected
                    ? 'bg-accent text-bg shadow-sm font-extrabold'
                    : 'bg-surface-2 border border-accent/20 text-appText-muted hover:text-appText-bright'
                }`}
              >
                {vol.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Main Chapter Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Chapter Carousel (Mobile) & Sidebar (Desktop) */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-appText-bright flex items-center justify-between">
            <span>Daftar Bab ({totalChapters}):</span>
            <span className="text-[10px] font-mono text-accent">
              {activeVolume?.label || activeBook?.title}
            </span>
          </div>

          {/* Mobile Horizontal Scroll */}
          <div className="md:hidden flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
            {chapterList.map((ch) => {
              const isSelected = selectedChapter === ch;
              return (
                <button
                  key={ch}
                  onClick={() => setSelectedChapter(ch)}
                  className={`min-h-[40px] px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all active:scale-95 ${
                    isSelected
                      ? 'bg-accent text-bg shadow-sm font-extrabold'
                      : 'bg-surface-2 border border-accent/20 text-appText-muted hover:text-appText-bright'
                  }`}
                >
                  Bab {ch}
                </button>
              );
            })}
          </div>

          {/* Desktop Vertical List */}
          <div className="hidden md:block bg-surface border border-accent/20 rounded-2xl p-3 space-y-1 max-h-[520px] overflow-y-auto">
            {chapterList.map((ch) => {
              const isSelected = selectedChapter === ch;
              const drillData = drillsByChapter[String(ch)];
              return (
                <button
                  key={ch}
                  onClick={() => setSelectedChapter(ch)}
                  className={`w-full p-2.5 rounded-xl text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-accent text-bg font-extrabold shadow-sm'
                      : 'text-appText-muted hover:bg-surface-2 hover:text-appText-bright'
                  }`}
                >
                  <div className="truncate pr-2">
                    <span className="font-mono font-bold mr-1.5">Bab {ch}:</span>
                    <span>{drillData?.topic || `Materi Pelajaran ${ch}`}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-60" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Chapter Details & Authentic Drills Showcase */}
        <div className="md:col-span-2 space-y-5">
          {/* Chapter Banner */}
          <div className="bg-surface-2 border border-accent/20 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div className="space-y-1 min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-accent">
                Bab {selectedChapter} · {activeVolume?.label || activeBook?.title}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-appText-bright truncate">
                {currentChapterDrillData.topic || `Latihan Bab ${selectedChapter}`}
              </h3>
              <p className="text-xs text-appText-muted">
                {activeBook?.credit_short || 'Kurikulum Buku Standar'}
              </p>
            </div>

            <button
              onClick={() => openLessonStudy('n5', `unit-n5-${selectedChapter}`, `les-n5-u${selectedChapter}-01`, 'book')}
              className="min-h-[44px] px-4 py-2 rounded-xl bg-surface-3 hover:bg-surface border border-accent/25 hover:border-accent text-appText-bright font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 shrink-0"
            >
              <BookOpen className="w-4 h-4 text-accent" />
              <span>Buka di Studio Belajar</span>
            </button>
          </div>

          {/* ── 5W+1H Pedagogical Rationale & Comparative SLA Card ── */}
          {activePedagogy && (
            <div className="bg-surface border border-accent/20 rounded-2xl overflow-hidden shadow-sm transition-all">
              <button
                type="button"
                onClick={() => setIsPedagogyExpanded((prev) => !prev)}
                className="w-full p-4 bg-surface-2/60 hover:bg-surface-2 border-b border-accent/10 flex items-center justify-between gap-3 text-left transition-colors active:scale-98"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-sm shrink-0">
                    💡
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs sm:text-sm text-appText-bright">
                        Logika Metodologi 5W+1H
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/15 text-accent font-bold uppercase tracking-wider hidden sm:inline">
                        Pedagogi Buku
                      </span>
                    </div>
                    <p className="text-[11px] text-appText-muted truncate">
                      {activePedagogy.philosophy}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-accent font-bold shrink-0">
                  <span className="hidden sm:inline">{isPedagogyExpanded ? 'Tutup' : 'Bedah Alasan'}</span>
                  {isPedagogyExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isPedagogyExpanded && (
                <div className="p-4 sm:p-5 space-y-4 animate-in fade-in duration-200 text-xs">
                  {/* Chapter-Specific Insight if available */}
                  {chapterRationale && (
                    <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 space-y-1">
                      <div className="font-bold text-amber-300 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>Kenapa Bab {selectedChapter} Mengajarkan Pola Ini Duluan?</span>
                      </div>
                      <p className="text-appText leading-relaxed">
                        {chapterRationale.whyNow}
                      </p>
                      <div className="text-[11px] text-amber-400/90 pt-1 border-t border-amber-500/20">
                        <strong>Perbandingan Antar-Buku:</strong> {chapterRationale.contrastInsight}
                      </div>
                    </div>
                  )}

                  {/* 5W+1H Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-surface-2 border border-accent/10 space-y-1">
                      <span className="font-bold text-accent uppercase text-[10px] tracking-wider block">
                        👤 WHO · Untuk Siapa?
                      </span>
                      <p className="text-appText-muted leading-relaxed">
                        {activePedagogy.who}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-surface-2 border border-accent/10 space-y-1">
                      <span className="font-bold text-accent uppercase text-[10px] tracking-wider block">
                        🎯 WHAT · Fokus Materi
                      </span>
                      <p className="text-appText-muted leading-relaxed">
                        {activePedagogy.what}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-surface-2 border border-accent/10 space-y-1">
                      <span className="font-bold text-accent uppercase text-[10px] tracking-wider block">
                        ⏱️ WHEN · Urutan Penyajian
                      </span>
                      <p className="text-appText-muted leading-relaxed">
                        {activePedagogy.when}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-surface-2 border border-accent/10 space-y-1">
                      <span className="font-bold text-accent uppercase text-[10px] tracking-wider block">
                        📍 WHERE · Konteks Situasi
                      </span>
                      <p className="text-appText-muted leading-relaxed">
                        {activePedagogy.where}
                      </p>
                    </div>
                  </div>

                  {/* WHY & HOW */}
                  <div className="space-y-2 pt-1 border-t border-accent/10">
                    <div className="space-y-1">
                      <span className="font-bold text-accent uppercase text-[10px] tracking-wider block">
                        ❓ WHY · Mengapa Urutannya Berbeda dari Buku Lain?
                      </span>
                      <p className="text-appText-bright leading-relaxed">
                        {activePedagogy.why}
                      </p>
                    </div>

                    <div className="space-y-1 pt-1">
                      <span className="font-bold text-accent uppercase text-[10px] tracking-wider block">
                        🛠️ HOW · Bagaimana Latihannya Membangun Reflek?
                      </span>
                      <p className="text-appText-muted leading-relaxed">
                        {activePedagogy.how}
                      </p>
                    </div>
                  </div>

                  {/* Comparative Highlights */}
                  {activePedagogy.comparativeHighlights && activePedagogy.comparativeHighlights.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-accent/10">
                      <span className="font-bold text-appText-muted uppercase text-[10px] tracking-wider block">
                        Komparasi Langsung dengan Seri Lain:
                      </span>
                      <div className="space-y-1.5">
                        {activePedagogy.comparativeHighlights.map((comp, cIdx) => (
                          <div key={cIdx} className="p-2.5 rounded-lg bg-surface-3/70 border border-accent/15 text-[11px] leading-relaxed">
                            <strong className="text-accent">vs {comp.versusBookName}: </strong>
                            <span className="text-appText">{comp.distinction}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Authentic Signature Drills Runner Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-surface to-surface-2 border border-amber-500/30 space-y-3.5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-accent-hot" />
                <span className="text-xs font-bold uppercase tracking-wider text-accent-hot">
                  Bank Latihan Otentik ({currentDrills.length} Drill)
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-accent border border-amber-500/30">
                100% Pedagogis
              </span>
            </div>

            <p className="text-xs text-appText-muted leading-relaxed">
              Latihan dirancang khusus mengikuti mekanisme asli buku: transformasi isyarat kata (Renshuu B), dialog berpasangan (Renshuu C), susun bintang (★), dan cloze partikel (Mondai).
            </p>

            {currentDrills.length > 0 ? (
              <button
                onClick={() => setIsDrillModalOpen(true)}
                className="w-full py-3 px-4 rounded-xl bg-accent hover:bg-accent-hot text-bg font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-glow active:scale-98 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-bg" />
                <span>Mulai Latihan Otentik ({currentDrills.length} Soal)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="p-3 rounded-xl bg-surface-3/60 text-center text-xs text-appText-muted italic">
                Drill otentik bab ini sedang diindeks dari arsip kurikulum.
              </div>
            )}
          </div>

          {/* Legal Attribution Notice */}
          {activeBook?.legal_note && (
            <div className="p-3 rounded-xl bg-surface-2/40 border border-accent/10 text-[11px] text-appText-muted/80 leading-relaxed">
              <span className="font-bold text-accent">Attribution Notice: </span>
              {activeBook.legal_note}
            </div>
          )}
        </div>
      </div>

      {/* Drill Player Modal */}
      <AuthenticDrillModal
        isOpen={isDrillModalOpen}
        onClose={() => setIsDrillModalOpen(false)}
        bookTitle={activeBook?.title || 'Buku Teks'}
        chapterTitle={`Bab ${selectedChapter}: ${currentChapterDrillData.topic || ''}`}
        drills={currentDrills}
      />
    </div>
  );
};
