import React from 'react';
import { Search, Flame, Zap, Download, RefreshCw, User as UserIcon, Cloud, HelpCircle, Compass, Menu } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { usePwaStore } from '../../lib/pwa/pwaStore';
import { useAuthStore } from '../../lib/supabase/authStore';
import { OfflineStatusPill } from '../ui/OfflineStatusPill';
import { JLPTLevel } from '../../types/vocab';

interface HeaderProps {
  onOpenSearch?: () => void;
  onOpenShortcuts?: () => void;
  onOpenMobileDrawer?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch, onOpenShortcuts, onOpenMobileDrawer }) => {
  const {
    streak, xp, selectedLevel, setSelectedLevel,
    showFurigana, setShowFurigana,
    showRomaji, setShowRomaji, showToast,
    openFeatureGuide, setActiveTab
  } = useAppStore();
  const { isInstalled, setShowInstallModal } = usePwaStore();
  const { user, syncStatus, openAuthModal, syncNow } = useAuthStore();

  const levels: (JLPTLevel | 'all')[] = ['all', 'n5', 'n4', 'n3', 'n2', 'n1'];

  return (
    <header className="sticky top-0 z-30 bg-surface/90 backdrop-blur-md border-b border-accent/15 px-2.5 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4 max-w-full overflow-hidden">
      {/* Mobile brand & Menu Drawer Toggle (hidden on desktop) */}
      <div className="flex lg:hidden items-center gap-1.5 shrink-0">
        <button
          onClick={onOpenMobileDrawer}
          className="p-1.5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-accent/20 text-accent transition-all active:scale-95"
          title="Buka Menu Navigasi Lengkap"
        >
          <Menu className="w-4 h-4" />
        </button>
        <img
          src="/icons/icon-192.png"
          alt="Nugget Nihongo"
          onClick={onOpenMobileDrawer}
          className="w-7 h-7 rounded-lg object-cover shadow-sm ring-1 ring-amber-500/30 cursor-pointer"
        />
      </div>

      {/* Search Input Bar with Shortcut Indicator */}
      <div 
        onClick={onOpenSearch}
        className="flex-1 min-w-0 max-w-md relative cursor-pointer"
      >
        <Search className="w-4 h-4 text-appText-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          readOnly
          onClick={onOpenSearch}
          placeholder="Cari kanji, kosakata, pola tata bahasa..."
          className="w-full bg-surface-2 border border-accent/20 rounded-xl pl-9 pr-12 py-2 text-xs md:text-sm text-appText-bright placeholder-appText-muted/60 focus:outline-none focus:border-accent cursor-pointer transition-all"
        />
        <kbd className="hidden sm:inline-block absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono bg-surface-3/80 text-appText-muted px-1.5 py-0.5 rounded border border-accent/15">
          ⌘K
        </kbd>
      </div>

      {/* Level Filters (Desktop/Tablet) */}
      <div className="hidden md:flex items-center gap-1 bg-surface-2 p-1 rounded-xl border border-accent/15">
        {levels.map((lvl) => {
          const isSelected = selectedLevel === lvl;
          return (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all uppercase ${
                isSelected
                  ? 'bg-accent text-bg font-extrabold shadow-sm'
                  : 'text-appText-muted hover:text-appText-bright'
              }`}
            >
              {lvl}
            </button>
          );
        })}
      </div>

      {/* Quick Furigana & Romaji Toggles (Desktop only) */}
      <div className="hidden xl:flex items-center gap-1 bg-surface-2 p-1 rounded-xl border border-accent/15 text-[11px]">
        <button
          onClick={() => {
            setShowFurigana(!showFurigana);
            showToast(showFurigana ? 'Furigana dinonaktifkan' : 'Furigana diaktifkan', '文');
          }}
          className={`px-2 py-0.5 rounded-lg font-bold transition-all ${
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
          className={`px-2 py-0.5 rounded-lg font-bold transition-all ${
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

        {/* Navigation & Feature Guide Button (Desktop/Tablet) */}
        <button
          onClick={openFeatureGuide}
          title="Panduan Fitur & Bantuan (Tekan untuk melihat seluruh modul & tips)"
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-accent border border-accent/25 text-xs font-bold transition-all shadow-sm active:scale-95"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Panduan</span>
        </button>

        {/* Desktop Shortcuts Help Button */}
        {onOpenShortcuts && (
          <button
            onClick={onOpenShortcuts}
            title="Pintasan Keyboard (Tekan ?)"
            className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-surface-2 hover:bg-surface-3 border border-accent/20 text-appText-muted hover:text-accent transition-all"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        )}

        {/* Streak Flame */}
        <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-accent-hot shadow-sm shrink-0">
          <Flame className="w-3.5 sm:w-4 h-3.5 sm:h-4 fill-amber-500 text-amber-500 animate-pulse" />
          <span className="text-xs font-bold font-mono">{streak}</span>
        </div>

        {/* XP Pill (Desktop/Tablet) */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-2 border border-accent/20 text-appText-bright shadow-sm shrink-0">
          <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs font-bold font-mono">{xp} XP</span>
        </div>

        {/* PWA Install Button (Desktop/Tablet) */}
        {!isInstalled && (
          <button
            onClick={() => setShowInstallModal(true)}
            title="Pasang Aplikasi (PWA)"
            className="hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-all active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Pasang</span>
          </button>
        )}

        {/* Supabase Cloud Sync & Account */}
        {user ? (
          <div className="flex items-center gap-1 sm:gap-1.5">
            <button
              onClick={syncNow}
              title={syncStatus === 'syncing' ? 'Sedang sinkronisasi...' : 'Tersinkron ke Cloud (Klik untuk sinkron ulang)'}
              className={`hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-full border text-xs font-semibold transition-all ${
                syncStatus === 'syncing'
                  ? 'bg-amber-500/15 border-amber-500/35 text-amber-300'
                  : syncStatus === 'error'
                  ? 'bg-red-500/15 border-red-500/35 text-red-300'
                  : 'bg-emerald-500/15 border-emerald-500/35 text-emerald-300'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
              <span className="hidden md:inline">
                {syncStatus === 'syncing' ? 'Sync...' : 'Cloud'}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              title={`Akun: ${user.email} (Buka Pengaturan Akun)`}
              className="flex items-center gap-1.5 p-1 sm:px-2.5 sm:py-1.5 rounded-full bg-surface-2 border border-accent/25 text-appText-bright text-xs font-semibold hover:border-accent transition-all max-w-[120px]"
            >
              <div className="w-6 h-6 rounded-full bg-amber-500/20 text-accent font-bold flex items-center justify-center text-[10px] shrink-0">
                {user.email?.charAt(0).toUpperCase()}
              </div>
              <span className="truncate hidden sm:inline">
                {user.user_metadata?.display_name || user.email?.split('@')[0]}
              </span>
            </button>
          </div>
        ) : (
          <button
            onClick={() => openAuthModal('signin')}
            title="Masuk untuk sinkronisasi cloud"
            className="flex items-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-full bg-surface-2 hover:bg-surface-3 border border-accent/20 hover:border-accent text-appText-bright text-xs font-semibold transition-all shrink-0"
          >
            <UserIcon className="w-3.5 h-3.5 text-accent" />
            <span className="hidden sm:inline">Masuk</span>
          </button>
        )}
      </div>
    </header>
  );
};
