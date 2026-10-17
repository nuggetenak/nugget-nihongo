// ══════════════════════════════════════════════════════════════════
//  UpdatePromptToast.tsx — PWA Non-Intrusive Update Notification
//  Ticket T-01: Prompt-based Service Worker Update Flow
//  Complies with Universal Multi-Device Responsive Design Rule
// ══════════════════════════════════════════════════════════════════

import React, { useState } from 'react';
import { RefreshCw, X, Sparkles } from 'lucide-react';
import { usePwaStore } from '../../lib/pwa/pwaStore';

export const UpdatePromptToast: React.FC = () => {
  const { hasUpdate, applyUpdate } = usePwaStore();
  const [isDismissed, setIsDismissed] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  if (!hasUpdate || isDismissed) {
    return null;
  }

  const handleUpdate = () => {
    setIsUpdating(true);
    applyUpdate();
  };

  return (
    <div
      role="alert"
      aria-live="polite"
      className="fixed z-50 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] sm:bottom-6 left-3 right-3 sm:left-auto sm:right-6 sm:max-w-md bg-surface border border-accent/40 rounded-2xl p-3.5 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="flex items-center gap-3">
        {/* Animated Icon Badge */}
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-stone-950 shrink-0 shadow-md">
          {isUpdating ? (
            <RefreshCw className="w-5 h-5 animate-spin" />
          ) : (
            <Sparkles className="w-5 h-5 fill-current" />
          )}
        </div>

        {/* Text Details */}
        <div className="flex-1 min-w-0">
          <h4 className="text-xs sm:text-sm font-extrabold text-appText-bright truncate">
            Versi Baru Tersedia! 🍙
          </h4>
          <p className="text-[11px] text-appText-muted line-clamp-1">
            Muat ulang untuk menerapkan pembaruan sistem.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleUpdate}
            disabled={isUpdating}
            className="min-h-[40px] px-3 py-1.5 rounded-xl bg-accent hover:bg-accent-hot text-bg font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isUpdating ? 'animate-spin' : ''}`} />
            <span>{isUpdating ? 'Memuat...' : 'Perbarui'}</span>
          </button>

          <button
            onClick={() => setIsDismissed(true)}
            className="min-h-[40px] min-w-[40px] p-2 rounded-xl text-appText-muted hover:text-appText-bright hover:bg-surface-2 flex items-center justify-center active:scale-95 transition-colors"
            title="Nanti Saja"
            aria-label="Tutup notifikasi pembaruan"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
