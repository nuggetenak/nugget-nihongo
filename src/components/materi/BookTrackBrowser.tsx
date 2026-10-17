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
  const [selectedTrackFilter, setSelectedTrackFilter] = useState<'all' | 'academic' | 'communicative' | 'exam' | 'culture'>('all');
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

    let volumeKey = '1';
    if (selectedBookId === 'minna' || selectedBookId === 'genki' || selectedBookId === 'quartet') {
      volumeKey = selectedVolumeIndex === 1 ? '2' : '1';
    } else if (selectedBookId === 'irodori' || selectedBookId === 'marugoto') {
      volumeKey = selectedVolumeIndex === 0 ? 'a1' : selectedVolumeIndex === 1 ? 'a2-1' : 'a2-2';
    } else {
      volumeKey = activeVolume?.jlpt || activeVolume?.label || '1';
    }

    const offset =
      selectedBookId === 'minna' && selectedVolumeIndex === 1
        ? 25
        : selectedBookId === 'genki' && selectedVolumeIndex === 1
        ? 12
        : selectedBookId === 'quartet' && selectedVolumeIndex === 1
        ? 6
        : 0;

    loadBookDrills(selectedBookId, volumeKey)
      .then((drillsMap) => {
        setDrillsByChapter(drillsMap || {});
        setSelectedChapter(1 + offset);
        setIsLoadingDrills(false);
      })
      .catch(() => {
        setDrillsByChapter({});
        setIsLoadingDrills(false);
      });
  }, [selectedBookId, selectedVolumeIndex, activeVolume]);

  const chapterOffset = useMemo(() => {
    if (selectedBookId === 'minna' && selectedVolumeIndex === 1) return 25;
    if (selectedBookId === 'genki' && selectedVolumeIndex === 1) return 12;
    if (selectedBookId === 'quartet' && selectedVolumeIndex === 1) return 6;
    return 0;
  }, [selectedBookId, selectedVolumeIndex]);

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
      list.push(i + chapterOffset);
    }
    return list;
  }, [totalChapters, chapterOffset]);

  const currentChapterDrillData = drillsByChapter[String(selectedChapter)] ||
    drillsByChapter[String(selectedChapter - chapterOffset)] || {
    chapter: selectedChapter,
    topic: selectedBookId === 'soumatome' ? `Minggu ${selectedChapter}` : selectedBookId === 'quartet' ? `Pelajaran ${selectedChapter}` : `Bab ${selectedChapter}`,
    drills: [],
  };

  const currentDrills = currentChapterDrillData.drills || [];

  const BOOK_COVER_MAP: Record<string, { base: string; fallback: string }> = {
    minna: { base: '/assets/generated/book-cover-minna', fallback: '/assets/generated/book-cover-minna.jpg' },
    genki: { base: '/assets/generated/book-cover-genki', fallback: '/assets/generated/book-cover-genki.jpg' },
    marugoto: { base: '/assets/generated/book-cover-marugoto', fallback: '/assets/generated/book-cover-marugoto.jpg' },
    irodori: { base: '/assets/generated/book-cover-irodori', fallback: '/assets/generated/book-cover-irodori.jpg' },
    tobira: { base: '/assets/generated/book-cover-tobira', fallback: '/assets/generated/book-cover-tobira.jpg' },
    'shin-kanzen-master': { base: '/assets/generated/book-cover-shinkanzen', fallback: '/assets/generated/book-cover-shinkanzen.jpg' },
    shin_kanzen_master: { base: '/assets/generated/book-cover-shinkanzen', fallback: '/assets/generated/book-cover-shinkanzen.jpg' },
    soumatome: { base: '/assets/generated/book-cover-soumatome', fallback: '/assets/generated/book-cover-soumatome.jpg' },
    dekiru: { base: '/assets/generated/book-cover-dekiru', fallback: '/assets/generated/book-cover-dekiru.jpg' },
    quartet: { base: '/assets/generated/book-cover-quartet', fallback: '/assets/generated/book-cover-quartet.jpg' },
    try: { base: '/assets/generated/book-cover-try', fallback: '/assets/generated/book-cover-try.jpg' },
  };

  const BOOK_TRACK_MAPPING: Record<string, 'academic' | 'communicative' | 'exam' | 'culture'> = {
    minna: 'academic',
    genki: 'academic',
    quartet: 'academic',
    irodori: 'communicative',
    marugoto: 'communicative',
    soumatome: 'exam',
    shin_kanzen_master: 'exam',
    'shin-kanzen-master': 'exam',
    try: 'exam',
    tobira: 'culture',
  };

  const filteredBooks = useMemo(() => {
    if (selectedTrackFilter === 'all') return booksCatalog;
    return booksCatalog.filter((b) => BOOK_TRACK_MAPPING[b.id] === selectedTrackFilter);
  }, [booksCatalog, selectedTrackFilter]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 4 Categorized Learning Paths Filter */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-accent" />
            <span className="text-xs font-bold uppercase tracking-wider text-appText-bright">
              Perpustakaan 9 Buku Teks Jepang Resmi
            </span>
          </div>
          <span className="text-[11px] text-accent font-semibold">
            {filteredBooks.length} dari {booksCatalog.length} Seri
          </span>
        </div>

        {/* Path Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 max-w-full">
          {[
            { id: 'all', label: 'Semua (9 Buku)', icon: '📚' },
            { id: 'academic', label: 'Jalur Akademik (Minna, Genki, Quartet)', icon: '🏛️' },
            { id: 'communicative', label: 'Jalur Komunikatif & SSW (Irodori, Marugoto)', icon: '🗣️' },
            { id: 'exam', label: 'Jalur Ujian JLPT (Soumatome, SKM, TRY!)', icon: '🎯' },
            { id: 'culture', label: 'Jalur Budaya & Menengah (Tobira)', icon: '⛩️' },
          ].map((track) => (
            <button
              key={track.id}
              onClick={() => {
                setSelectedTrackFilter(track.id as any);
                // If current selectedBookId not in new filtered list, auto-select first of that track
                if (track.id !== 'all') {
                  const firstOfTrack = booksCatalog.find((b) => BOOK_TRACK_MAPPING[b.id] === track.id);
                  if (firstOfTrack) {
                    setSelectedBookId(firstOfTrack.id);
                    setSelectedVolumeIndex(0);
                  }
                }
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all active:scale-95 flex items-center gap-1.5 ${
                selectedTrackFilter === track.id
                  ? 'bg-accent text-bg shadow-sm font-extrabold'
                  : 'bg-surface-2 border border-accent/20 text-appText-muted hover:text-appText-bright'
              }`}
            >
              <span>{track.icon}</span>
              <span>{track.label}</span>
            </button>
          ))}
        </div>

        {/* Books Cards Grid with Official Illustrated Covers */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {filteredBooks.map((b) => {
            const isSelected = selectedBookId === b.id;
            const cover = BOOK_COVER_MAP[b.id] || { base: '/assets/generated/book-cover-minna', fallback: '/assets/generated/book-cover-minna.jpg' };
            const jlptBadges = b.jlpt ? b.jlpt.map((j) => j.toUpperCase()).join('·') : 'N5';

            return (
              <button
                key={b.id}
                onClick={() => {
                  setSelectedBookId(b.id);
                  setSelectedVolumeIndex(0);
                }}
                className={`group rounded-2xl border text-left transition-all active:scale-98 cursor-pointer flex flex-col overflow-hidden ${
                  isSelected
                    ? 'bg-amber-500/15 border-accent text-appText-bright shadow-glow ring-2 ring-accent'
                    : 'bg-surface-2 border-accent/15 text-appText-muted hover:border-accent/40 hover:text-appText-bright'
                }`}
              >
                {/* Book Cover Banner Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-900">
                  <picture className="w-full h-full block">
                    <source
                      type="image/avif"
                      srcSet={`${cover.base}-thumb.avif`}
                    />
                    <source
                      type="image/webp"
                      srcSet={`${cover.base}-thumb.webp 400w, ${cover.base}-hero.webp 1200w`}
                      sizes="(max-width: 640px) 50vw, 400px"
                    />
                    <img
                      src={cover.fallback}
                      alt={b.title}
                      width={400}
                      height={250}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/25 to-transparent pointer-events-none" />
                  
                  {/* JLPT / CEFR Level Pill */}
                  <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md text-[10px] font-black bg-stone-950/90 text-amber-400 border border-amber-500/40 backdrop-blur-xs">
                    {jlptBadges}
                  </span>

                  {/* Japanese Kanji / Kana Title Overlay */}
                  <span className="absolute bottom-1.5 left-2 right-2 font-japanese text-[11px] font-bold text-white drop-shadow truncate">
                    {b.title_ja}
                  </span>
                </div>

                {/* Card Meta Content */}
                <div className="p-2.5 sm:p-3 flex flex-col justify-between flex-1">
                  <div>
                    <h4 className="text-xs font-black text-appText-bright line-clamp-1 leading-snug">
                      {b.title}
                    </h4>
                    <p className="text-[10px] text-appText-muted/90 truncate mt-0.5 font-medium">
                      {b.publisher}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-accent/10 text-[9.5px]">
                    <span className="text-accent font-semibold">
                      {b.volumes?.length || 1} Jilid Lengkap
                    </span>
                    {isSelected && (
                      <span className="text-accent font-bold">✓ Terpilih</span>
                    )}
                  </div>
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
              const sectionLabel =
                selectedBookId === 'soumatome'
                  ? `Minggu ${ch}`
                  : selectedBookId === 'quartet'
                  ? `Lesson ${ch}`
                  : `Bab ${ch}`;
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
                  {sectionLabel}
                </button>
              );
            })}
          </div>

          {/* Desktop Vertical List */}
          <div className="hidden md:block bg-surface border border-accent/20 rounded-2xl p-3 space-y-1 max-h-[520px] overflow-y-auto">
            {chapterList.map((ch) => {
              const isSelected = selectedChapter === ch;
              const drillData = drillsByChapter[String(ch)] || drillsByChapter[String(ch - chapterOffset)];
              const sectionLabel =
                selectedBookId === 'soumatome'
                  ? `Minggu ${ch}`
                  : selectedBookId === 'quartet'
                  ? `Lesson ${ch}`
                  : `Bab ${ch}`;
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
                    <span className="font-mono font-bold mr-1.5">{sectionLabel}:</span>
                    <span>{drillData?.topic || (selectedBookId === 'soumatome' ? `Minggu ${ch}` : selectedBookId === 'quartet' ? `Pelajaran ${ch}` : `Materi Pelajaran ${ch}`)}</span>
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
          <div className="bg-surface-2 border border-accent/20 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-16 h-12 sm:w-20 sm:h-14 rounded-xl overflow-hidden shrink-0 border border-accent/30 shadow-md bg-stone-900">
                <picture className="w-full h-full block">
                  <source
                    type="image/avif"
                    srcSet={`${(BOOK_COVER_MAP[selectedBookId] || BOOK_COVER_MAP.minna).base}-thumb.avif`}
                  />
                  <source
                    type="image/webp"
                    srcSet={`${(BOOK_COVER_MAP[selectedBookId] || BOOK_COVER_MAP.minna).base}-thumb.webp`}
                  />
                  <img
                    src={(BOOK_COVER_MAP[selectedBookId] || BOOK_COVER_MAP.minna).fallback}
                    alt={activeBook?.title}
                    width={80}
                    height={56}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              </div>
              <div className="space-y-0.5 min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-accent">
                  Bab {selectedChapter} · {activeVolume?.label || activeBook?.title}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-appText-bright truncate">
                  {currentChapterDrillData.topic || `Latihan Bab ${selectedChapter}`}
                </h3>
                <p className="text-xs text-appText-muted truncate">
                  {activeBook?.credit_short || 'Kurikulum Buku Standar'}
                </p>
              </div>
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
        chapterTitle={currentChapterDrillData.topic ? `Bab ${selectedChapter}: ${currentChapterDrillData.topic}` : `Bab ${selectedChapter}`}
        drills={currentDrills}
      />
    </div>
  );
};
