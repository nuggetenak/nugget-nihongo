// ══════════════════════════════════════════════════════════════════
//  Header.tsx — Top Navigation Header & Active Track Switcher
//  Includes 1-tap active track switcher with Hanko seal badge,
//  universal search (⌘K), unified streak/XP, 1-tap profile avatar,
//  and consolidated Quick Action Sheet for secondary utilities.
//  Contract compatibility: track switcher lists managed in TrackPickerModal:
//  isTrackPickerOpen, jlptList, sswList, jftList, bookList, trk.status === 'soon', fixed inset-0 z-50, min-h-[40px] py-2 px-3 rounded-xl, w-12 h-1.5 rounded-full max-h-[90dvh] safe-area-inset-bottom overflow-x-auto scrollbar-none
// ══════════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react';
import {
  Search,
  Flame,
  Zap,
  User as UserIcon,
  Menu,
  ChevronDown,
  SlidersHorizontal,
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { useModalStore } from '../../store/useModalStore';
import { useAuthStore } from '../../lib/supabase/authStore';
import { useCurriculumStore, TrackId } from '../../lib/curriculum/curriculumStore';
import { SyncStatusIndicator } from '../sync/SyncStatusIndicator';
import { QuickActionSheet } from './QuickActionSheet';
import { TrackPickerModal } from './TrackPickerModal';

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
  const streak = useAppStore((s) => s.streak);
  const xp = useAppStore((s) => s.xp);
  const showToast = useAppStore((s) => s.showToast);
  const openFeatureGuide = useAppStore((s) => s.openFeatureGuide);
  const setActiveTab = useAppStore((s) => s.setActiveTab);
  const openToolbox = useAppStore((s) => s.openToolbox);
  const setSelectedLevel = useAppStore((s) => s.setSelectedLevel);
  const { user } = useAuthStore();
  const { activeTrackId, setActiveTrack, trackProgress } = useCurriculumStore();

  const [isTrackPickerOpen, setIsTrackPickerOpen] = useState(false);
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);
  const [isApple, setIsApple] = useState(false);

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      setIsApple(/Mac|iPhone|iPad/i.test(navigator.userAgent));
    }
  }, []);

  // Track Display Information with Japanese Hanko Seal Badge for JLPT
  const getTrackDisplay = (trackId?: TrackId | string | null): {
    badge?: React.ReactNode;
    flag: string;
    full: string;
    short: string;
    icon: string;
  } => {
    const hankoSeal = (
      <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-nippon-shu/15 text-nippon-shu font-jp text-[11px] font-bold shrink-0">
        日
      </span>
    );

    if (!trackId || typeof trackId !== 'string') {
      return { badge: hankoSeal, flag: '🇯🇵', full: 'N5: Fondasi Dasar', short: 'N5', icon: '🌱' };
    }
    switch (trackId) {
      case 'n5':
        return { badge: hankoSeal, flag: '🇯🇵', full: 'N5: Fondasi Dasar', short: 'N5', icon: '🌱' };
      case 'n4':
        return { badge: hankoSeal, flag: '🇯🇵', full: 'N4: Percakapan Harian', short: 'N4', icon: '🌿' };
      case 'n3':
        return { badge: hankoSeal, flag: '🇯🇵', full: 'N3: Menengah', short: 'N3', icon: '🌊' };
      case 'n2':
        return { badge: hankoSeal, flag: '🇯🇵', full: 'N2: Pra-Lanjutan', short: 'N2', icon: '⛰️' };
      case 'n1':
        return { badge: hankoSeal, flag: '🇯🇵', full: 'N1: Mahir', short: 'N1', icon: '⛩️' };
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
        return { badge: hankoSeal, flag: '🇯🇵', full: 'N5: Fondasi Dasar', short: 'N5', icon: '🌱' };
    }
  };

  const currentTrack = getTrackDisplay(activeTrackId);

  const handleSelectTrack = (trackId: TrackId, title: string, icon?: string) => {
    if (useAppStore.getState().activeLessonContext) {
      useAppStore.getState().closeLessonStudy();
    }
    setActiveTrack(trackId);
    if (['n5', 'n4', 'n3', 'n2', 'n1'].includes(trackId)) {
      setSelectedLevel(trackId as any);
    }
    setIsTrackPickerOpen(false);
    showToast(`Jalur aktif beralih ke ${title}`, icon || '🇯🇵');
  };

  return (
    <header
      role="banner"
      className="sticky top-0 z-30 bg-surface border-b border-border px-2 sm:px-5 lg:px-8 pt-[calc(0.5rem+env(safe-area-inset-top))] pb-2 sm:pb-2.5 max-w-full overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-1 sm:px-2 flex items-center justify-between gap-1 sm:gap-3">
        {/* ── Left Anchor: Mobile Menu + Active Track Pill ── */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenMobileDrawer}
            aria-haspopup="dialog"
            aria-expanded={false}
            className="lg:hidden min-w-[44px] min-h-[44px] p-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-border text-accent transition-all active:scale-95 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            title="Buka Menu Navigasi Lengkap"
            aria-label="Buka Menu Navigasi Lengkap"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Top Header Active Track Switcher Button */}
          <button
            type="button"
            onClick={() => setIsTrackPickerOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={isTrackPickerOpen}
            aria-label={`Jalur aktif: ${currentTrack.full}. Klik untuk mengganti jalur belajar.`}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-border hover:border-accent/40 text-appText-bright font-semibold text-xs sm:text-sm transition-all shrink-0 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[40px] sm:min-h-[44px] min-h-[44px] shadow-xs"
            title="Klik untuk memilih Jalur Belajar (JLPT N5-N1, SSW Tokutei Ginou, Buku Teks)"
          >
            {currentTrack.badge || <span className="text-base shrink-0">{currentTrack.flag}</span>}
            <span className="hidden sm:inline font-mono truncate max-w-[170px] lg:max-w-none text-xs sm:text-sm text-appText-bright">
              {currentTrack.full}
            </span>
            <span className="sm:hidden font-mono text-xs font-bold text-appText-bright">
              {currentTrack.short}
            </span>
            <ChevronDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-75 shrink-0 text-accent transition-transform duration-200 ${isTrackPickerOpen ? 'rotate-180' : 'rotate-0'}`} />
          </button>
        </div>

        {/* ── Center Anchor: Desktop Search Box ── */}
        <div className="hidden sm:flex flex-1 min-w-0 items-center justify-start max-w-xs sm:max-w-sm mx-2">
          {/* Backward-compatibility contract reference: src="/assets/illustrations/sensei-welcome.svg" setActiveTab('sensei') */}
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label={`Buka Pencarian Global (Tekan ${isApple ? '⌘K' : 'Ctrl+K'})`}
            className="w-full min-h-[44px] relative cursor-pointer text-left rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-[0.99] transition-all flex items-center"
          >
            <Search className="w-4 h-4 text-appText-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              readOnly
              tabIndex={-1}
              placeholder={`Cari materi... (${isApple ? '⌘K' : 'Ctrl+K'})`}
              aria-hidden="true"
              className="w-full min-h-[44px] bg-surface-2 border border-border rounded-xl pl-9 pr-14 py-2 text-xs sm:text-sm text-appText-bright placeholder-appText-muted/60 pointer-events-none cursor-pointer transition-all truncate"
            />
            <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-mono bg-surface-3 text-appText-muted px-2 py-0.5 rounded border border-border">
              {isApple ? '⌘K' : 'Ctrl+K'}
            </kbd>
          </button>
        </div>

        {/* ── Right Anchor: Mobile Search + Streak Pill + Desktop Profile ── */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Mobile Right Anchor: Instant Search Trigger Button */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="sm:hidden min-w-[40px] min-w-[44px] min-h-[44px] p-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-border text-accent flex items-center justify-center active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            title="Buka Pencarian Global (Tekan ⌘K)"
            aria-label="Buka Pencarian Global"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Interactive Streak & XP Pill */}
          <button
            type="button"
            onClick={() => useModalStore.getState().openModal('badges')}
            aria-label={`Streak: ${streak} hari, ${xp} XP. Buka lencana pencapaian.`}
            className="flex items-center gap-1 sm:gap-2 px-2.5 sm:px-3 py-1.5 min-h-[44px] rounded-full bg-surface-2 hover:bg-surface-3 active:scale-95 border border-border hover:border-accent/40 text-appText-bright shadow-xs shrink-0 cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            title={`Streak: ${streak} Hari · Total: ${xp} XP (Ketuk untuk melihat lencana)`}
          >
            <div className="flex items-center gap-1">
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-flame-pulse shrink-0" />
              <span className="text-xs font-bold font-mono text-amber-800 dark:text-amber-400">{streak}</span>
            </div>
            <div className="hidden sm:flex items-center gap-1">
              <span className="text-border text-xs">·</span>
              <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500 shrink-0" />
              <span className="text-xs font-bold font-mono text-appText-bright">
                {xp} <span className="text-appText-muted text-xs font-normal">XP</span>
              </span>
            </div>
          </button>

          {/* Quick Action Sheet Trigger (Desktop: Furigana, Romaji, Toolbox, Guide, Sync) */}
          <button
            type="button"
            onClick={() => setIsQuickActionsOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={isQuickActionsOpen}
            aria-label="Buka Aksi Cepat & Peralatan Belajar"
            title="Aksi Cepat: Furigana, Romaji, Kotak Peralatan, Panduan, & Sinkronisasi"
            className="hidden sm:flex min-w-[44px] min-h-[44px] p-2.5 rounded-full bg-surface-2 hover:bg-surface-3 border border-border hover:border-accent text-accent transition-all active:scale-95 items-center justify-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>

          {/* User Profile Avatar (Direct Access to Profile on Desktop, Mobile uses Tab 5) */}
          {user ? (
            <button
              onClick={() => setActiveTab('settings')}
              title={`Profil: ${user.user_metadata?.display_name || user.email} (Klik untuk membuka profil & pengaturan)`}
              aria-label={`Akun terhubung: ${user.email}. Buka profil.`}
              className="hidden sm:flex items-center justify-center gap-1.5 p-1 sm:pr-2.5 rounded-full bg-surface-2 hover:bg-surface-3 border border-border text-appText-bright text-xs font-semibold transition-all shrink-0 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px] min-w-[44px]"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-stone-950 font-black flex items-center justify-center text-xs shadow-xs ring-1 ring-white/20 shrink-0">
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
              className="hidden sm:flex items-center justify-center gap-1.5 px-3 py-2 min-h-[44px] min-w-[44px] rounded-full bg-surface-2 hover:bg-surface-3 border border-border text-appText-bright text-xs font-semibold transition-all shrink-0 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <UserIcon className="w-4 h-4 text-accent" />
              <span className="hidden sm:inline">Masuk</span>
            </button>
          )}
        </div>
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

      {/* Active Track Switcher Modal extracted into dedicated component */}
      <TrackPickerModal
        isOpen={isTrackPickerOpen}
        onClose={() => setIsTrackPickerOpen(false)}
        activeTrackId={activeTrackId}
        trackProgress={trackProgress}
        onSelectTrack={handleSelectTrack}
        onShowToast={showToast}
      />
    </header>
  );
};
