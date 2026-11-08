// ══════════════════════════════════════════════════════════════════
//  Header.tsx — Top Navigation Header & Active Track Switcher
//  Includes 1-tap active track switcher ([🇯🇵 N5: Fondasi Dasar ▼]),
//  universal search (⌘K), unified streak/XP, 1-tap profile avatar,
//  and consolidated Quick Action Sheet for secondary utilities.
// ══════════════════════════════════════════════════════════════════

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  Search,
  Flame,
  Zap,
  User as UserIcon,
  Menu,
  ChevronDown,
  X,
  SlidersHorizontal,
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { useAuthStore } from '../../lib/supabase/authStore';
import { useCurriculumStore, TrackId } from '../../lib/curriculum/curriculumStore';
import { SyncStatusIndicator } from '../sync/SyncStatusIndicator';
import { QuickActionSheet } from './QuickActionSheet';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

interface HeaderProps {
  onOpenSearch?: () => void;
  onOpenShortcuts?: () => void;
  onOpenMobileDrawer?: () => void;
  onOpenToolbox?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenMobileDrawer,
  onOpenToolbox,
}) => {
  const {
    streak,
    xp,
    showToast,
    openFeatureGuide,
    setActiveTab,
    openToolbox,
    setSelectedLevel,
  } = useAppStore();
  const { user } = useAuthStore();
  const { activeTrackId, setActiveTrack, trackProgress } = useCurriculumStore();

  const [isTrackPickerOpen, setIsTrackPickerOpen] = useState(false);
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);
  const [pickerCategory, setPickerCategory] = useState<'jlpt' | 'ssw' | 'jft' | 'books'>('jlpt');
  const modalRef = useRef<HTMLDivElement>(null);
  useBodyScrollLock(isTrackPickerOpen);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isTrackPickerOpen) {
        setIsTrackPickerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTrackPickerOpen]);

  // Track Display Information
  const getTrackDisplay = (trackId?: TrackId | string | null) => {
    if (!trackId || typeof trackId !== 'string') {
      return { flag: '🇯🇵', full: 'N5: Fondasi Dasar', short: 'N5', icon: '🌱' };
    }
    switch (trackId) {
      case 'n5':
        return { flag: '🇯🇵', full: 'N5: Fondasi Dasar', short: 'N5', icon: '🌱' };
      case 'n4':
        return { flag: '🇯🇵', full: 'N4: Percakapan Harian', short: 'N4', icon: '🌿' };
      case 'n3':
        return { flag: '🇯🇵', full: 'N3: Menengah', short: 'N3', icon: '🌊' };
      case 'n2':
        return { flag: '🇯🇵', full: 'N2: Pra-Lanjutan', short: 'N2', icon: '⛰️' };
      case 'n1':
        return { flag: '🇯🇵', full: 'N1: Mahir', short: 'N1', icon: '⛩️' };
      case 'ssw-kaigo':
        return { flag: '👵', full: 'SSW: Kaigo (Lansia)', short: 'Kaigo', icon: '👵' };
      case 'ssw-food':
        return { flag: '🍱', full: 'SSW: Pabrik Makanan', short: 'Food', icon: '🍱' };
      case 'ssw-construction':
        return { flag: '👷', full: 'SSW: Konstruksi K3', short: 'Kensetsu', icon: '👷' };
      case 'ssw-agriculture':
        return { flag: '🌱', full: 'SSW: Pertanian', short: 'Nogyo', icon: '🌱' };
      case 'ssw-accommodation':
        return { flag: '🏨', full: 'SSW: Perhotelan', short: 'Hotel', icon: '🏨' };
      case 'ssw-building-cleaning':
        return { flag: '🧹', full: 'SSW: Pembersihan', short: 'Cleaning', icon: '🧹' };
      case 'jft-a1':
        return { flag: '🎌', full: 'JFT: Basic A1', short: 'JFT-A1', icon: '🎌' };
      case 'jft-a2':
        return { flag: '🎌', full: 'JFT: Basic A2', short: 'JFT-A2', icon: '🎌' };
      case 'seikatsu':
        return { flag: '🏮', full: 'Hidup di Jepang', short: 'Seikatsu', icon: '🏮' };
      case 'book-genki':
        return { flag: '📘', full: 'Buku: GENKI', short: 'Genki', icon: '📘' };
      case 'book-minna':
        return { flag: '📙', full: 'Buku: Minna', short: 'Minna', icon: '📙' };
      default:
        if (trackId.startsWith('ssw-')) {
          const sector = trackId.replace('ssw-', '');
          return { flag: '⚙️', full: `SSW: ${sector}`, short: 'SSW', icon: '⚙️' };
        }
        if (trackId.startsWith('book-')) {
          const title = trackId.replace('book-', '');
          return { flag: '📚', full: `Buku: ${title}`, short: 'Buku', icon: '📚' };
        }
        return { flag: '🇯🇵', full: 'N5: Fondasi Dasar', short: 'N5', icon: '🌱' };
    }
  };

  const currentTrack = getTrackDisplay(activeTrackId);

  // Curriculum definition groups for switcher modal
  const jlptList: Array<{ id: TrackId; title: string; subtitle: string; icon: string }> = [
    { id: 'n5', title: 'JLPT N5', subtitle: 'Pemula · Fondasi Tata Bahasa & Kosakata Dasar', icon: '🌱' },
    { id: 'n4', title: 'JLPT N4', subtitle: 'Dasar Harian · Pola Percakapan Praktis & Konjugasi', icon: '🌿' },
    { id: 'n3', title: 'JLPT N3', subtitle: 'Tingkat Menengah · Jembatan Percakapan Otentik', icon: '🌊' },
    { id: 'n2', title: 'JLPT N2', subtitle: 'Pra-Lanjutan · Bahasa Berita, Bisnis & Artikel Opini', icon: '⛰️' },
    { id: 'n1', title: 'JLPT N1', subtitle: 'Tingkat Mahir · Ekspresi Nuansa Sastra & Formal Tinggi', icon: '⛩️' },
  ];

  const sswList: Array<{ id: TrackId; title: string; subtitle: string; icon: string; status: 'active' | 'soon' }> = [
    { id: 'ssw-kaigo', title: 'SSW Keperawatan Lansia (Kaigo)', subtitle: 'Komunikasi empatik, Koe-kake, & SOP medis', icon: '👵', status: 'active' },
    { id: 'ssw-food', title: 'SSW Pabrik Makanan (Food Mfg)', subtitle: 'Sanitasi HACCP, pencegahan kontaminasi pangan', icon: '🍱', status: 'active' },
    { id: 'ssw-construction', title: 'SSW Konstruksi (Kensetsu)', subtitle: 'SOP K3 Gemba, komando akustik KYT & alat berat', icon: '👷', status: 'active' },
    { id: 'ssw-agriculture', title: 'SSW Pertanian (Nogyo)', subtitle: 'Budidaya tanaman rumah kaca & peternakan', icon: '🌱', status: 'active' },
    { id: 'ssw-accommodation', title: 'SSW Perhotelan (Shukuhaku)', subtitle: 'Resepsionis omotenashi, check-in & etika tamu', icon: '🏨', status: 'active' },
    { id: 'ssw-building-cleaning', title: 'SSW Pembersihan Gedung', subtitle: 'Sanitasi polisher & pemilahan limbah fasilitas', icon: '🧹', status: 'active' },
    { id: 'ssw-manufacturing', title: 'SSW Manufaktur & Pengolahan', subtitle: 'Mesin press, perakitan presisi, kontrol QC', icon: '⚙️', status: 'soon' },
    { id: 'ssw-automobile', title: 'SSW Perawatan Otomotif', subtitle: 'Servis rem, diagnostik OBD-II & ganti oli', icon: '🚗', status: 'soon' },
    { id: 'ssw-food-service', title: 'SSW Restoran (Gaishoku)', subtitle: 'Penyambutan tamu, handy order & sanitasi dapur', icon: '🍽️', status: 'soon' },
  ];

  const jftList: Array<{ id: TrackId; title: string; subtitle: string; icon: string }> = [
    { id: 'jft-a1', title: 'JFT-Basic A1', subtitle: 'Komunikasi dasar kehidupan harian di Jepang', icon: '🎌' },
    { id: 'jft-a2', title: 'JFT-Basic A2', subtitle: 'Standar minimum kelulusan visa kerja SSW', icon: '🎌' },
    { id: 'seikatsu', title: 'Panduan Hidup di Jepang', subtitle: 'SOP darurat gempa, pemilahan sampah, tata krama', icon: '🏮' },
  ];

  const bookList: Array<{ id: TrackId; title: string; subtitle: string; icon: string }> = [
    { id: 'book-genki', title: 'GENKI I & II', subtitle: 'The Japan Times · Standar percakapan global', icon: '📘' },
    { id: 'book-minna', title: 'Minna no Nihongo I & II', subtitle: '3A Corporation · Silabus LPK kanonikal', icon: '📙' },
    { id: 'book-soumatome', title: 'Nihongo Sou Matome', subtitle: 'ASK Publishing · Persiapan maraton JLPT', icon: '📗' },
    { id: 'book-tobira', title: 'Tobira: Advanced Gateway', subtitle: 'Kuroshio · Jembatan tingkat menengah otentik', icon: '🚪' },
    { id: 'book-quartet', title: 'QUARTET I & II', subtitle: 'The Japan Times · 4 Kemahiran Menengah', icon: '🎻' },
    { id: 'book-try', title: 'TRY! Communicative', subtitle: 'ASK Publishing · Tata bahasa berbasis dialog', icon: '🎯' },
  ];

  const handleSelectTrack = (trackId: TrackId, title: string) => {
    setActiveTrack(trackId);
    if (['n5', 'n4', 'n3', 'n2', 'n1'].includes(trackId)) {
      setSelectedLevel(trackId as any);
    }
    setIsTrackPickerOpen(false);
    showToast(`Jalur aktif beralih ke ${title}`, '🇯🇵');
  };

  return (
    <header
      role="banner"
      className="sticky top-0 z-30 bg-surface/95 backdrop-blur-md border-b border-accent/15 px-2 sm:px-5 lg:px-8 py-2 sm:py-2.5 flex items-center justify-between gap-1 sm:gap-3 max-w-full overflow-hidden"
    >
      {/* ── Anchor 1: Brand & Active Track Switcher (+ Mobile Drawer Trigger) ── */}
      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
        <button
          type="button"
          onClick={onOpenMobileDrawer}
          className="lg:hidden min-w-[44px] min-h-[44px] p-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-accent/20 text-accent transition-all active:scale-95 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          title="Buka Menu Navigasi Lengkap"
          aria-label="Buka Menu Navigasi Lengkap"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Top Header Active Track Switcher Button */}
        <button
          type="button"
          onClick={() => setIsTrackPickerOpen(true)}
          aria-label={`Jalur aktif: ${currentTrack.full}. Klik untuk mengganti jalur belajar.`}
          className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3.5 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/35 text-accent font-bold text-xs sm:text-sm transition-all shrink-0 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[40px] sm:min-h-[44px] shadow-sm"
          title="Klik untuk memilih Jalur Belajar (JLPT N5-N1, SSW Tokutei Ginou, Buku Teks)"
        >
          <span className="text-base shrink-0">{currentTrack.flag}</span>
          <span className="hidden sm:inline font-mono truncate max-w-[170px] lg:max-w-none text-xs sm:text-sm text-appText-bright">
            {currentTrack.full}
          </span>
          <span className="sm:hidden font-mono text-xs font-extrabold text-appText-bright">
            {currentTrack.short}
          </span>
          <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-75 shrink-0 text-accent" />
        </button>
      </div>

      {/* ── Anchor 2: Universal Search Trigger & Sensei Companion Center Anchor ── */}
      <div className="shrink-0 sm:flex-1 min-w-0 flex items-center justify-center sm:justify-start max-w-xs sm:max-w-sm">
        {/* Mobile Center Anchor: Friendly Sensei Mascot (Direct Shortcut to Sensei AI) */}
        <button
          type="button"
          onClick={() => setActiveTab('sensei')}
          className="sm:hidden min-w-[40px] min-h-[40px] p-1 rounded-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/25 flex items-center justify-center active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          title="Tanya Sensei AI"
          aria-label="Tanya Sensei AI"
        >
          <img
            src="/assets/illustrations/sensei-welcome.svg"
            alt="Sensei"
            className="w-7 h-7 rounded-full object-contain filter drop-shadow-xs"
          />
        </button>
        <button
          type="button"
          onClick={onOpenSearch}
          aria-label="Buka Pencarian Global (Tekan ⌘K)"
          className="hidden sm:block w-full relative cursor-pointer text-left rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-98 transition-all"
        >
          <Search className="w-4 h-4 text-appText-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            readOnly
            tabIndex={-1}
            placeholder="Cari materi... (⌘K)"
            aria-hidden="true"
            className="w-full bg-surface-2 border border-accent/20 rounded-xl pl-9 pr-12 py-2 text-xs sm:text-sm text-appText-bright placeholder-appText-muted/60 pointer-events-none cursor-pointer transition-all truncate"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-mono bg-surface-3/80 text-appText-muted px-2 py-0.5 rounded border border-accent/15">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* ── Anchor 3 & 4: Unified Status, Quick Action Sheet Trigger & Profile Avatar ── */}
      <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
        {/* Anchor 3: Unified Streak & XP Pill */}
        <div
          role="status"
          aria-label={`Streak: ${streak} hari, ${xp} XP`}
          className="flex items-center gap-1 sm:gap-2 px-2.5 sm:px-3 py-1.5 min-h-[40px] rounded-full bg-amber-500/10 hover:bg-amber-500/15 border border-amber-500/25 text-appText-bright shadow-sm shrink-0 select-none transition-all"
          title={`Streak: ${streak} Hari · Total: ${xp} XP`}
        >
          <div className="flex items-center gap-1">
            <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse shrink-0" />
            <span className="text-xs font-bold font-mono text-amber-800 dark:text-amber-400">{streak}</span>
          </div>
          <div className="hidden sm:flex items-center gap-1">
            <span className="text-accent/30 text-xs">·</span>
            <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
            <span className="text-xs font-bold font-mono text-appText-bright">
              {xp} <span className="text-appText-muted text-xs font-normal">XP</span>
            </span>
          </div>
        </div>

        {/* Quick Action Sheet Trigger (Desktop & Secondary Tools: Furigana, Romaji, Toolbox, Guide, Sync) */}
        <button
          type="button"
          onClick={() => setIsQuickActionsOpen(true)}
          aria-label="Buka Aksi Cepat & Peralatan Belajar"
          title="Aksi Cepat: Furigana, Romaji, Kotak Peralatan, Panduan, & Sinkronisasi"
          className="hidden sm:flex min-w-[40px] min-h-[40px] p-2 rounded-full bg-surface-2 hover:bg-surface-3 border border-accent/20 hover:border-accent text-accent transition-all active:scale-95 items-center justify-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>

        {/* Anchor 4: User Profile Avatar (Direct Access to Profile on Desktop, Mobile uses Tab 5) */}
        {user ? (
          <button
            onClick={() => setActiveTab('settings')}
            title={`Profil: ${user.user_metadata?.display_name || user.email} (Klik untuk membuka profil & pengaturan)`}
            aria-label={`Akun terhubung: ${user.email}. Buka profil.`}
            className="hidden sm:flex items-center justify-center gap-1.5 p-1 sm:pr-2.5 rounded-full bg-surface-2 hover:bg-surface-3 border border-accent/25 text-appText-bright text-xs font-semibold transition-all shrink-0 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[40px] min-w-[40px]"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-stone-950 font-black flex items-center justify-center text-xs shadow-sm ring-1 ring-white/20 shrink-0">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <span className="truncate hidden md:inline max-w-[90px] text-xs font-bold text-appText-bright">
              {user.user_metadata?.display_name || user.email?.split('@')[0]}
            </span>
          </button>
        ) : (
          <button
            onClick={() => useAuthStore.getState().openAuthModal('signin')}
            title="Masuk untuk sinkronisasi cloud & profil"
            aria-label="Masuk ke Akun Cloud"
            className="hidden sm:flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-1.5 min-h-[40px] min-w-[40px] rounded-full bg-surface-2 hover:bg-surface-3 border border-accent/20 text-appText-bright text-xs font-bold transition-all shrink-0 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <UserIcon className="w-4 h-4 text-accent" />
            <span className="hidden sm:inline">Masuk</span>
          </button>
        )}
      </div>

      {/* Secondary Utilities consolidated inside QuickActionSheet */}
      <QuickActionSheet
        isOpen={isQuickActionsOpen}
        onClose={() => setIsQuickActionsOpen(false)}
        onOpenToolbox={onOpenToolbox || openToolbox}
        onOpenFeatureGuide={openFeatureGuide}
      />

      {/* SyncStatusIndicator mounted for background telemetry & synchronization contract */}
      <div className="hidden" aria-hidden="true">
        <SyncStatusIndicator />
      </div>

      {/* Feature F2: Active Track Switcher Sheet / Modal (Mounted cleanly via Portal to document.body) */}
      {isTrackPickerOpen && typeof document !== 'undefined' && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Pilih Jalur Kurikulum Aktif"
          className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
          onClick={() => setIsTrackPickerOpen(false)}
        >
          <div
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl bg-surface border border-accent/25 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[85dvh] sm:max-h-[80vh] overflow-hidden pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:pb-0"
          >
            {/* Mobile Drag Handle */}
            <div className="w-12 h-1.5 rounded-full bg-accent/25 mx-auto mt-2.5 -mb-1 sm:hidden shrink-0" />

            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-accent/15 flex items-center justify-between">
              <div>
                <div className="text-base sm:text-lg font-bold text-appText-bright flex items-center gap-2">
                  <span>Pilih Jalur Belajar Aktif</span>
                  <span className="text-xs font-normal text-appText-muted">(Kurikulum Utama)</span>
                </div>
                <p className="text-xs text-appText-muted mt-0.5">
                  Ganti target JLPT, bidang kerja SSW, atau buku teks tanpa kehilangan progres
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsTrackPickerOpen(false)}
                aria-label="Tutup pemilihan jalur"
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-surface-2 hover:bg-surface-3 text-appText-muted hover:text-appText-bright flex items-center justify-center transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category Selector Tabs */}
            <div className="flex items-center gap-1.5 p-2 bg-surface-2 border-b border-accent/15 overflow-x-auto scrollbar-none shrink-0">
              <button
                type="button"
                onClick={() => setPickerCategory('jlpt')}
                className={`flex-1 min-w-0 min-h-[40px] py-2 px-3 rounded-xl text-xs font-bold transition-all text-center whitespace-nowrap active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  pickerCategory === 'jlpt'
                    ? 'bg-amber-500 text-stone-950 shadow-sm font-extrabold'
                    : 'text-appText-muted hover:text-appText-bright hover:bg-surface-3/50'
                }`}
              >
                🇯🇵 JLPT
              </button>
              <button
                type="button"
                onClick={() => setPickerCategory('ssw')}
                className={`flex-1 min-w-0 min-h-[40px] py-2 px-3 rounded-xl text-xs font-bold transition-all text-center whitespace-nowrap active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  pickerCategory === 'ssw'
                    ? 'bg-amber-500 text-stone-950 shadow-sm font-extrabold'
                    : 'text-appText-muted hover:text-appText-bright hover:bg-surface-3/50'
                }`}
              >
                💼 SSW Kerjasama
              </button>
              <button
                type="button"
                onClick={() => setPickerCategory('jft')}
                className={`flex-1 min-w-0 min-h-[40px] py-2 px-3 rounded-xl text-xs font-bold transition-all text-center whitespace-nowrap active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  pickerCategory === 'jft'
                    ? 'bg-amber-500 text-stone-950 shadow-sm font-extrabold'
                    : 'text-appText-muted hover:text-appText-bright hover:bg-surface-3/50'
                }`}
              >
                🎌 JFT Hidup
              </button>
              <button
                type="button"
                onClick={() => setPickerCategory('books')}
                className={`flex-1 min-w-0 min-h-[40px] py-2 px-3 rounded-xl text-xs font-bold transition-all text-center whitespace-nowrap active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  pickerCategory === 'books'
                    ? 'bg-amber-500 text-stone-950 shadow-sm font-extrabold'
                    : 'text-appText-muted hover:text-appText-bright hover:bg-surface-3/50'
                }`}
              >
                📚 Buku Teks
              </button>
            </div>

            {/* Track Options List */}
            <div className="p-3 sm:p-4 overflow-y-auto space-y-2 flex-1">
              {pickerCategory === 'jlpt' &&
                jlptList.map((trk) => {
                  const isSelected = activeTrackId === trk.id;
                  const stats = trackProgress[trk.id];
                  const completedCount = stats?.completedLessons?.length || 0;
                  return (
                    <button
                      key={trk.id}
                      type="button"
                      onClick={() => handleSelectTrack(trk.id, trk.title)}
                      className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all min-h-[56px] active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-500 text-appText-bright font-bold ring-1 ring-amber-500'
                          : 'bg-surface-2 hover:bg-surface-3 border-accent/15 text-appText'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-2xl shrink-0">{trk.icon}</span>
                        <div className="min-w-0">
                          <div className="font-bold text-sm text-appText-bright flex items-center gap-2">
                            <span>{trk.title}</span>
                            {isSelected && (
                              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-accent text-bg">
                                Aktif
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-appText-muted truncate">{trk.subtitle}</div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        {completedCount > 0 ? (
                          <span className="text-xs text-emerald-400 font-bold">
                            {completedCount} Tuntas
                          </span>
                        ) : (
                          <span className="text-xs text-appText-muted">Belum Dimulai</span>
                        )}
                      </div>
                    </button>
                  );
                })}

              {pickerCategory === 'ssw' &&
                sswList.map((trk) => {
                  const isSelected = activeTrackId === trk.id;
                  const stats = trackProgress[trk.id];
                  const completedCount = stats?.completedLessons?.length || 0;
                  return (
                    <button
                      key={trk.id}
                      type="button"
                      onClick={() => handleSelectTrack(trk.id, trk.title)}
                      className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all min-h-[56px] active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-500 text-appText-bright font-bold ring-1 ring-amber-500'
                          : 'bg-surface-2 hover:bg-surface-3 border-accent/15 text-appText'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-2xl shrink-0">{trk.icon}</span>
                        <div className="min-w-0">
                          <div className="font-bold text-sm text-appText-bright flex items-center gap-2">
                            <span className="truncate">{trk.title}</span>
                            {isSelected && (
                              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-accent text-bg shrink-0">
                                Aktif
                              </span>
                            )}
                            {trk.status === 'soon' && (
                              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-surface-3 text-amber-400 border border-amber-400/20 shrink-0">
                                Segera
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-appText-muted truncate">{trk.subtitle}</div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        {completedCount > 0 ? (
                          <span className="text-xs text-emerald-400 font-bold">
                            {completedCount} Tuntas
                          </span>
                        ) : (
                          <span className="text-xs text-appText-muted">8 Pelajaran</span>
                        )}
                      </div>
                    </button>
                  );
                })}

              {pickerCategory === 'jft' &&
                jftList.map((trk) => {
                  const isSelected = activeTrackId === trk.id;
                  const stats = trackProgress[trk.id];
                  const completedCount = stats?.completedLessons?.length || 0;
                  return (
                    <button
                      key={trk.id}
                      type="button"
                      onClick={() => handleSelectTrack(trk.id, trk.title)}
                      className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all min-h-[56px] active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-500 text-appText-bright font-bold ring-1 ring-amber-500'
                          : 'bg-surface-2 hover:bg-surface-3 border-accent/15 text-appText'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-2xl shrink-0">{trk.icon}</span>
                        <div className="min-w-0">
                          <div className="font-bold text-sm text-appText-bright flex items-center gap-2">
                            <span>{trk.title}</span>
                            {isSelected && (
                              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-accent text-bg">
                                Aktif
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-appText-muted truncate">{trk.subtitle}</div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        {completedCount > 0 ? (
                          <span className="text-xs text-emerald-400 font-bold">
                            {completedCount} Tuntas
                          </span>
                        ) : (
                          <span className="text-xs text-appText-muted">Tersedia</span>
                        )}
                      </div>
                    </button>
                  );
                })}

              {pickerCategory === 'books' &&
                bookList.map((trk) => {
                  const isSelected = activeTrackId === trk.id;
                  return (
                    <button
                      key={trk.id}
                      type="button"
                      onClick={() => handleSelectTrack(trk.id, trk.title)}
                      className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all min-h-[56px] active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-500 text-appText-bright font-bold ring-1 ring-amber-500'
                          : 'bg-surface-2 hover:bg-surface-3 border-accent/15 text-appText'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-2xl shrink-0">{trk.icon}</span>
                        <div className="min-w-0">
                          <div className="font-bold text-sm text-appText-bright flex items-center gap-2">
                            <span>{trk.title}</span>
                            {isSelected && (
                              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-accent text-bg">
                                Aktif
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-appText-muted truncate">{trk.subtitle}</div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs text-accent font-semibold">Buku Teks</span>
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
};
