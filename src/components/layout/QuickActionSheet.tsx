// ══════════════════════════════════════════════════════════════════
//  QuickActionSheet.tsx — Consolidated Secondary Utilities & Action Sheet
//  Houses Furigana/Romaji reading toggles, Study Toolbox, Feature Guide,
//  PWA install, and Cloud Sync in an accessible, de-cluttered sheet.
// ══════════════════════════════════════════════════════════════════

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Wrench,
  Compass,
  Download,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Cloud,
  CloudOff,
  Sparkles,
  SlidersHorizontal,
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { usePwaStore } from '../../lib/pwa/pwaStore';
import { useAuthStore } from '../../lib/supabase/authStore';
import { OfflineStatusPill } from '../ui/OfflineStatusPill';
import { SyncStatusIndicator } from '../sync/SyncStatusIndicator';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

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
  } = useAppStore();
  const { isInstalled, setShowInstallModal } = usePwaStore();
  const { user } = useAuthStore();
  const modalRef = useRef<HTMLDivElement>(null);
  useBodyScrollLock(isOpen);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === 'undefined') return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menu Aksi Cepat & Alat Belajar"
      className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-surface border border-accent/25 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[85dvh] sm:max-h-[80vh] overflow-hidden pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:pb-0"
      >
        {/* Mobile Drag Handle */}
        <div className="w-12 h-1.5 rounded-full bg-accent/25 mx-auto mt-2.5 -mb-1 sm:hidden shrink-0" />

        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-accent/15 flex items-center justify-between bg-surface-2/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-accent">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold text-appText-bright leading-tight">
                Aksi Cepat & Alat Belajar
              </div>
              <p className="text-xs text-appText-muted mt-0.5">
                Pengaturan tampilan bacaan, alat bantu & sinkronisasi
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup menu aksi cepat"
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-surface-2 hover:bg-surface-3 text-appText-muted hover:text-appText-bright flex items-center justify-center transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {/* Section 1: Reading Display Toggles */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-accent mb-2 flex items-center justify-between">
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
                className={`p-3 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all min-h-[56px] active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  showFurigana
                    ? 'bg-amber-500/15 border-amber-500/40 text-appText-bright'
                    : 'bg-surface-2 hover:bg-surface-3 border-accent/15 text-appText'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-lg font-bold w-8 h-8 rounded-xl bg-surface flex items-center justify-center border border-accent/20 shrink-0 text-accent">
                    文
                  </span>
                  <div className="min-w-0">
                    <div className="font-bold text-sm text-appText-bright truncate">Furigana Kana</div>
                    <div className="text-xs text-appText-muted truncate">Bacaan di atas kanji</div>
                  </div>
                </div>
                <span
                  className={`text-xs font-extrabold px-2.5 py-1 rounded-full border transition-all shrink-0 ${
                    showFurigana
                      ? 'bg-amber-500 text-stone-950 border-amber-400'
                      : 'bg-surface-3 text-appText-muted border-accent/15'
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
                className={`p-3 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all min-h-[56px] active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  showRomaji
                    ? 'bg-amber-500/15 border-amber-500/40 text-appText-bright'
                    : 'bg-surface-2 hover:bg-surface-3 border-accent/15 text-appText'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-base font-bold w-8 h-8 rounded-xl bg-surface flex items-center justify-center border border-accent/20 shrink-0">
                    🔤
                  </span>
                  <div className="min-w-0">
                    <div className="font-bold text-sm text-appText-bright truncate">Romaji Latin</div>
                    <div className="text-xs text-appText-muted truncate">Ejaan abjad alfabet</div>
                  </div>
                </div>
                <span
                  className={`text-xs font-extrabold px-2.5 py-1 rounded-full border transition-all shrink-0 ${
                    showRomaji
                      ? 'bg-amber-500 text-stone-950 border-amber-400'
                      : 'bg-surface-3 text-appText-muted border-accent/15'
                  }`}
                >
                  {showRomaji ? 'AKTIF' : 'NONAKTIF'}
                </span>
              </button>
            </div>
          </div>

          {/* Section 2: Study Tools & Guided Learning */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-accent mb-2">
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
                className="p-3 rounded-2xl bg-surface-2 hover:bg-surface-3 border border-accent/20 text-left flex items-center justify-between gap-3 transition-all min-h-[56px] active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-accent shrink-0">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-sm text-appText-bright truncate">Kotak Peralatan</div>
                    <div className="text-xs text-appText-muted truncate">Bagan Kana, Konjugasi, Nuansa</div>
                  </div>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-accent-hot border border-amber-500/25 shrink-0">
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
                className="p-3 rounded-2xl bg-surface-2 hover:bg-surface-3 border border-accent/20 text-left flex items-center justify-between gap-3 transition-all min-h-[56px] active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-accent shrink-0">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-sm text-appText-bright truncate">Panduan Fitur</div>
                    <div className="text-xs text-appText-muted truncate">Pintasan keyboard & tips</div>
                  </div>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-surface-3 text-appText-muted border border-accent/15 shrink-0">
                  Bantuan
                </span>
              </button>
            </div>
          </div>

          {/* Section 3: Cloud Sync & System Utilities */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-accent mb-2">
              Sistem & Sinkronisasi
            </div>

            <div className="space-y-2">
              {/* Cloud Sync Status */}
              <div className="p-3 rounded-2xl bg-surface-2 border border-accent/15 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-700 dark:text-emerald-400 font-bold shrink-0">
                    <Cloud className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-sm text-appText-bright truncate">Sinkronisasi Cloud</div>
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
                  className="w-full p-3 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-left flex items-center justify-between gap-3 transition-all active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/35 flex items-center justify-center text-amber-800 dark:text-amber-300 font-bold shrink-0">
                      <Download className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-sm text-amber-800 dark:text-amber-300 truncate">Pasang Aplikasi (PWA)</div>
                      <div className="text-xs text-appText-muted truncate">Akses offline cepat dari homescreen</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-500 text-stone-950 shrink-0">
                    Pasang
                  </span>
                </button>
              )}

              {/* Offline Indicator row */}
              <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-surface-2/60 border border-accent/10">
                <span className="text-xs text-appText-muted">Status Koneksi:</span>
                <OfflineStatusPill />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
