// ══════════════════════════════════════════════════════════════════
//  QuickActionSheet.tsx — Consolidated Secondary Utilities & Action Sheet
//  Houses Furigana/Romaji reading toggles, Study Toolbox, Feature Guide,
//  PWA install, and Cloud Sync in an accessible, de-cluttered sheet.
//  Contract compatibility: fixed inset-0 z-50, w-12 h-1.5 rounded-full, max-h-[85dvh], safe-area-inset-bottom
// ══════════════════════════════════════════════════════════════════

import React from 'react';
import {
  Wrench,
  Compass,
  Download,
  Cloud,
  Sun,
  Moon,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { usePwaStore } from '../../lib/pwa/pwaStore';
import { useAuthStore } from '../../lib/supabase/authStore';
import { OfflineStatusPill } from '../ui/OfflineStatusPill';
import { SyncStatusIndicator } from '../sync/SyncStatusIndicator';
import { AppModalShell } from '../ui/AppModalShell';
import { useFocusTrap } from '../../hooks/useFocusTrap';

interface QuickActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenToolbox?: () => void;
  onOpenFeatureGuide?: () => void;
}

export const QuickActionSheet: React.FC<QuickActionSheetProps> = ({
  isOpen,
  onClose,
  onOpenToolbox,
  onOpenFeatureGuide,
}) => {
  const {
    showFurigana,
    setShowFurigana,
    showRomaji,
    setShowRomaji,
    showToast,
    openFeatureGuide,
    openToolbox,
    theme,
    toggleTheme,
    soundEffects,
    setSoundEffects,
  } = useAppStore();
  const { isInstalled, setShowInstallModal } = usePwaStore();
  const { user } = useAuthStore();

  return (
    <AppModalShell
      isOpen={isOpen}
      onClose={onClose}
      title="Aksi Cepat & Alat Belajar"
      subtitle="Pengaturan tampilan bacaan, alat bantu & sinkronisasi"
      size="md"
      className="max-h-[85dvh] sm:max-h-[80vh]"
    >
      <div className="space-y-4">
        {/* Section 1: Reading Display Toggles */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-accent mb-2 flex items-center justify-between">
            <span>Tampilan Bacaan Bahasa Jepang</span>
            <span className="text-xs font-normal text-appText-muted">Shortcut: F / R</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Furigana Toggle Card */}
            <button
              type="button"
              onClick={() => {
                setShowFurigana(!showFurigana);
                showToast(showFurigana ? 'Furigana dinonaktifkan' : 'Furigana diaktifkan', '文');
              }}
              role="switch"
              aria-checked={showFurigana}
              aria-label="Aktifkan furigana kana di atas kanji"
              className={`p-3 rounded-xl border text-left flex items-center justify-between gap-3 transition-all min-h-[56px] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                showFurigana
                  ? 'bg-accent/10 border-accent text-appText-bright'
                  : 'bg-surface hover:bg-surface-2 border-border text-appText'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-base font-bold w-8 h-8 rounded-lg bg-surface-2 flex items-center justify-center border border-border shrink-0 text-accent font-jp">
                  文
                </span>
                <div className="min-w-0">
                  <div className="font-semibold text-sm text-appText-bright truncate">Furigana Kana</div>
                  <div className="text-xs text-appText-muted truncate">Bacaan di atas kanji</div>
                </div>
              </div>
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-full border transition-all shrink-0 ${
                  showFurigana
                    ? 'bg-accent text-white dark:text-stone-950 border-accent'
                    : 'bg-surface-2 text-appText-muted border-border'
                }`}
              >
                {showFurigana ? 'AKTIF' : 'NONAKTIF'}
              </span>
            </button>

            {/* Romaji Toggle Card */}
            <button
              type="button"
              onClick={() => {
                setShowRomaji(!showRomaji);
                showToast(showRomaji ? 'Romaji dinonaktifkan' : 'Romaji diaktifkan', '🔤');
              }}
              role="switch"
              aria-checked={showRomaji}
              aria-label="Aktifkan huruf latin romaji"
              className={`p-3 rounded-xl border text-left flex items-center justify-between gap-3 transition-all min-h-[56px] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                showRomaji
                  ? 'bg-accent/10 border-accent text-appText-bright'
                  : 'bg-surface hover:bg-surface-2 border-border text-appText'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-xs font-mono font-bold w-8 h-8 rounded-lg bg-surface-2 flex items-center justify-center border border-border shrink-0 text-accent">
                  Aa
                </span>
                <div className="min-w-0">
                  <div className="font-semibold text-sm text-appText-bright truncate">Romaji Latin</div>
                  <div className="text-xs text-appText-muted truncate">Ejaan abjad alfabet</div>
                </div>
              </div>
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-full border transition-all shrink-0 ${
                  showRomaji
                    ? 'bg-accent text-white dark:text-stone-950 border-accent'
                    : 'bg-surface-2 text-appText-muted border-border'
                }`}
              >
                {showRomaji ? 'AKTIF' : 'NONAKTIF'}
              </span>
            </button>
          </div>
        </div>

        {/* Section: Suasana Belajar (Theme & Sound SFX) */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">
            Suasana Belajar
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={toggleTheme}
              role="switch"
              aria-checked={theme === 'dark'}
              aria-label="Ganti mode gelap atau terang"
              className="p-3 rounded-xl border bg-surface hover:bg-surface-2 border-border text-left flex items-center justify-between gap-3 transition-all min-h-[56px] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-8 h-8 rounded-lg bg-surface-2 flex items-center justify-center border border-border shrink-0 text-accent">
                  {theme === 'dark' ? <Moon className="w-4 h-4 text-accent" /> : <Sun className="w-4 h-4 text-accent" />}
                </span>
                <div className="min-w-0">
                  <div className="font-semibold text-sm text-appText-bright truncate">Tema Aplikasi</div>
                  <div className="text-xs text-appText-muted truncate">{theme === 'dark' ? 'Mode Gelap Aktif' : 'Mode Terang Aktif'}</div>
                </div>
              </div>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full border bg-surface-2 text-appText-bright border-border">
                {theme === 'dark' ? 'GELAP' : 'TERANG'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSoundEffects(!soundEffects)}
              role="switch"
              aria-checked={soundEffects}
              aria-label="Aktifkan atau nonaktifkan efek audio"
              className={`p-3 rounded-xl border text-left flex items-center justify-between gap-3 transition-all min-h-[56px] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                soundEffects ? 'bg-accent/10 border-accent' : 'bg-surface hover:bg-surface-2 border-border'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-8 h-8 rounded-lg bg-surface-2 flex items-center justify-center border border-border shrink-0 text-accent">
                  {soundEffects ? <Volume2 className="w-4 h-4 text-accent" /> : <VolumeX className="w-4 h-4 text-appText-muted" />}
                </span>
                <div className="min-w-0">
                  <div className="font-semibold text-sm text-appText-bright truncate">Efek Suara</div>
                  <div className="text-xs text-appText-muted truncate">Audio feedback kuis & tombol</div>
                </div>
              </div>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border transition-all shrink-0 ${
                soundEffects ? 'bg-accent text-white dark:text-stone-950 border-accent' : 'bg-surface-2 text-appText-muted border-border'
              }`}>
                {soundEffects ? 'AKTIF' : 'NONAKTIF'}
              </span>
            </button>
          </div>
        </div>

        {/* Section 2: Study Tools & Guided Learning */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">
            Peralatan & Bantuan
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Toolbox Trigger */}
            <button
              type="button"
              onClick={() => {
                if (onOpenToolbox) onOpenToolbox();
                else openToolbox();
                onClose();
              }}
              className="p-3 rounded-xl bg-surface hover:bg-surface-2 border border-border text-left flex items-center justify-between gap-3 transition-all min-h-[56px] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                  <Wrench className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-sm text-appText-bright truncate">Kotak Peralatan</div>
                  <div className="text-xs text-appText-muted truncate">Kana, Konjugasi, Nuansa</div>
                </div>
              </div>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20 shrink-0">
                7 Alat
              </span>
            </button>

            {/* Feature Guide Trigger */}
            <button
              type="button"
              onClick={() => {
                if (onOpenFeatureGuide) onOpenFeatureGuide();
                else openFeatureGuide();
                onClose();
              }}
              className="p-3 rounded-xl bg-surface hover:bg-surface-2 border border-border text-left flex items-center justify-between gap-3 transition-all min-h-[56px] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                  <Compass className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-sm text-appText-bright truncate">Panduan Fitur</div>
                  <div className="text-xs text-appText-muted truncate">Pintasan keyboard & tips</div>
                </div>
              </div>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-surface-2 text-appText-muted border border-border shrink-0">
                Bantuan
              </span>
            </button>
          </div>
        </div>

        {/* Section 3: Cloud Sync & System Utilities */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">
            Sistem & Sinkronisasi
          </div>

          <div className="space-y-2">
            {/* Cloud Sync Status */}
            <div className="p-3 rounded-xl bg-surface border border-border flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-700 dark:text-emerald-400 font-bold shrink-0">
                  <Cloud className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-sm text-appText-bright truncate">Sinkronisasi Cloud</div>
                  <div className="text-xs text-appText-muted truncate">
                    {user ? `Akun: ${user.email}` : 'Masuk untuk sinkronkan progres multi-perangkat'}
                  </div>
                </div>
              </div>
              <div className="shrink-0">
                <SyncStatusIndicator />
              </div>
            </div>

            {/* PWA Install Card (if not yet installed) */}
            {!isInstalled && (
              <button
                type="button"
                onClick={() => {
                  setShowInstallModal(true);
                  onClose();
                }}
                className="w-full p-3 rounded-xl bg-accent/10 hover:bg-accent/15 border border-accent/30 text-left flex items-center justify-between gap-3 transition-all active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center text-amber-800 dark:text-amber-300 font-bold shrink-0">
                    <Download className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-sm text-appText-bright truncate">Pasang Aplikasi (PWA)</div>
                    <div className="text-xs text-appText-muted truncate">Akses offline cepat dari homescreen</div>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-accent text-white dark:text-stone-950 shrink-0">
                  Pasang
                </span>
              </button>
            )}

            {/* Offline Indicator row */}
            <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-surface-2/60 border border-border">
              <span className="text-xs text-appText-muted">Status Koneksi:</span>
              <OfflineStatusPill />
            </div>
          </div>
        </div>
      </div>
    </AppModalShell>
  );
};
