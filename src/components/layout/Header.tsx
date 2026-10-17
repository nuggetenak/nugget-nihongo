import React from 'react';
import { Search, Flame, Zap, Download, RefreshCw, User as UserIcon, Cloud, HelpCircle, Compass, Menu, Wrench } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { usePwaStore } from '../../lib/pwa/pwaStore';
import { useAuthStore } from '../../lib/supabase/authStore';
import { OfflineStatusPill } from '../ui/OfflineStatusPill';
import { SyncStatusIndicator } from '../sync/SyncStatusIndicator';
import { JLPTLevel } from '../../types/vocab';

interface HeaderProps {
  onOpenSearch?: () => void;
  onOpenShortcuts?: () => void;
  onOpenMobileDrawer?: () => void;
  onOpenToolbox?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch, onOpenShortcuts, onOpenMobileDrawer, onOpenToolbox }) => {
  const {
    streak, xp,
    showFurigana, setShowFurigana,
    showRomaji, setShowRomaji, showToast,
    openFeatureGuide, setActiveTab, openToolbox
  } = useAppStore();
  const { isInstalled, setShowInstallModal } = usePwaStore();
  const { user, syncStatus, openAuthModal, syncNow } = useAuthStore();

  return (
    <header role="banner" className="sticky top-0 z-30 bg-surface/90 backdrop-blur-md border-b border-accent/15 px-2.5 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4 max-w-full overflow-hidden">
      {/* Mobile brand & Menu Drawer Toggle (hidden on desktop) */}
      <div className="flex lg:hidden items-center gap-1.5 shrink-0">
        <button
          type="button"
          onClick={onOpenMobileDrawer}
          className="min-w-[44px] min-h-[44px] p-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-accent/20 text-accent transition-all active:scale-95 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          title="Buka Menu Navigasi Lengkap"
          aria-label="Buka Menu Navigasi Lengkap"
        >
          <Menu className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={onOpenMobileDrawer}
          aria-label="Buka Menu Navigasi Samping"
          className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-95 transition-transform"
        >
          <img
            src="/icons/icon-192.png"
            alt="Nugget Nihongo"
            className="w-7 h-7 rounded-lg object-cover shadow-sm ring-1 ring-amber-500/30"
          />
        </button>
      </div>

      {/* Search Input Bar with Shortcut Indicator */}
      <button 
        type="button"
        onClick={onOpenSearch}
        aria-label="Buka Pencarian Global (Tekan ⌘K)"
        className="flex-1 min-w-0 max-w-md relative cursor-pointer text-left block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-appText-muted absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          readOnly
          tabIndex={-1}
          placeholder="Cari materi..."
          aria-hidden="true"
          className="w-full bg-surface-2 border border-accent/20 rounded-xl pl-7 sm:pl-9 pr-3 sm:pr-12 py-1.5 sm:py-2 text-xs sm:text-sm text-appText-bright placeholder-appText-muted/60 pointer-events-none cursor-pointer transition-all truncate"
        />
        <kbd className="hidden sm:inline-block absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono bg-surface-3/80 text-appText-muted px-1.5 py-0.5 rounded border border-accent/15">
          ⌘K
        </kbd>
      </button>

      {/* Quick Furigana & Romaji Toggles (Desktop only) */}
      <div className="hidden xl:flex items-center gap-1 bg-surface-2 p-1 rounded-xl border border-accent/15 text-[11px]" role="group" aria-label="Pengaturan Tampilan Bacaan">
        <button
          onClick={() => {
            setShowFurigana(!showFurigana);
            showToast(showFurigana ? 'Furigana dinonaktifkan' : 'Furigana diaktifkan', '文');
          }}
          role="switch"
          aria-checked={showFurigana}
          aria-label="Aktifkan furigana kana di atas kanji"
          className={`px-2 py-0.5 rounded-lg font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
            showFurigana ? 'bg-amber-500/20 text-accent-hot border border-amber-500/30' : 'text-appText-muted hover:text-appText-bright'
          }`}
          title="Toggle Furigana (Shortcut: F)"
        >
          文 {showFurigana ? 'ON' : 'OFF'}
        </button>
        <button
          onClick={() => {
            setShowRomaji(!showRomaji);
            showToast(showRomaji ? 'Romaji dinonaktifkan' : 'Romaji diaktifkan', '🔤');
          }}
          role="switch"
          aria-checked={showRomaji}
          aria-label="Aktifkan huruf latin romaji"
          className={`px-2 py-0.5 rounded-lg font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
            showRomaji ? 'bg-amber-500/20 text-accent-hot border border-amber-500/30' : 'text-appText-muted hover:text-appText-bright'
          }`}
          title="Toggle Romaji (Shortcut: R)"
        >
          🔤 {showRomaji ? 'ON' : 'OFF'}
        </button>
      </div>

      {/* Gamification Badges: Streak, XP & Offline Indicator */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {/* Offline Status Pill */}
        <OfflineStatusPill />

        {/* Study Toolbox Button (Peralatan Belajar) */}
        <button
          onClick={onOpenToolbox || openToolbox}
          title="Kotak Peralatan Belajar (Bagan Kana, Konjugasi, Nuansa, CAT Placement)"
          aria-label="Kotak Peralatan Belajar"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-surface-2 hover:bg-surface-3 text-appText-bright border border-accent/20 hover:border-accent text-xs font-bold transition-all shadow-sm active:scale-95 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <Wrench className="w-3.5 h-3.5 text-accent" />
          <span className="hidden sm:inline">Peralatan</span>
        </button>

        {/* Navigation & Feature Guide Button (Desktop/Tablet) */}
        <button
          onClick={openFeatureGuide}
          title="Panduan Fitur & Bantuan (Tekan untuk melihat seluruh modul & tips)"
          aria-label="Panduan Fitur & Bantuan"
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-accent border border-accent/25 text-xs font-bold transition-all shadow-sm active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Panduan</span>
        </button>

        {/* Desktop Shortcuts Help Button */}
        {onOpenShortcuts && (
          <button
            onClick={onOpenShortcuts}
            title="Pintasan Keyboard (Tekan ?)"
            aria-label="Pintasan Keyboard"
            className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-surface-2 hover:bg-surface-3 border border-accent/20 text-appText-muted hover:text-accent transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        )}

        {/* Streak Flame */}
        <div 
          role="status"
          aria-label={`Streak harian: ${streak} hari aktif berturut-turut`}
          className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-accent-hot shadow-sm shrink-0"
        >
          <Flame className="w-3.5 sm:w-4 h-3.5 sm:h-4 fill-amber-500 text-amber-500 animate-pulse" />
          <span className="text-xs font-bold font-mono">{streak}</span>
        </div>

        {/* XP Pill (Desktop/Tablet) */}
        <div 
          role="status"
          aria-label={`Total pengalaman: ${xp} XP`}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-2 border border-accent/20 text-appText-bright shadow-sm shrink-0"
        >
          <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs font-bold font-mono">{xp} XP</span>
        </div>

        {/* PWA Install Button (Desktop/Tablet) */}
        {!isInstalled && (
          <button
            onClick={() => setShowInstallModal(true)}
            title="Pasang Aplikasi (PWA)"
            aria-label="Pasang Aplikasi Progressive Web App"
            className="hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Pasang</span>
          </button>
        )}

        {/* Supabase Cloud Sync Status Indicator (Ticket T-106) */}
        <SyncStatusIndicator />

        {/* User Account / Sign In Pill */}
        {user ? (
          <button
            onClick={() => setActiveTab('settings')}
            title={`Akun: ${user.email} (Buka Pengaturan Akun)`}
            aria-label={`Akun terhubung: ${user.email}`}
            className="flex items-center gap-1.5 p-1 sm:px-2.5 sm:py-1.5 rounded-full bg-surface-2 border border-accent/25 text-appText-bright text-xs font-semibold hover:border-accent transition-all max-w-[120px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <div className="w-6 h-6 rounded-full bg-amber-500/20 text-accent font-bold flex items-center justify-center text-[10px] shrink-0">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <span className="truncate hidden sm:inline">
              {user.user_metadata?.display_name || user.email?.split('@')[0]}
            </span>
          </button>
        ) : (
          <button
            onClick={() => openAuthModal('signin')}
            title="Masuk untuk sinkronisasi cloud"
            aria-label="Masuk ke Akun Cloud"
            className="flex items-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-full bg-surface-2 hover:bg-surface-3 border border-accent/20 hover:border-accent text-appText-bright text-xs font-semibold transition-all shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <UserIcon className="w-3.5 h-3.5 text-accent" />
            <span className="hidden sm:inline">Masuk</span>
          </button>
        )}
      </div>
    </header>
  );
};
