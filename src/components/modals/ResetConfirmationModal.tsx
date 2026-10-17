// ══════════════════════════════════════════════════════════════════
//  ResetConfirmationModal.tsx — Accessible Double-Safety Data Reset Modal
//  Ticket T-204: Replaces blocking window.confirm with accessible,
//  keyboard-navigable, multi-device responsive confirmation dialog
// ══════════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AlertTriangle, Trash2, X, ShieldAlert } from 'lucide-react';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

interface ResetConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ResetConfirmationModal: React.FC<ResetConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [confirmText, setConfirmText] = useState('');
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const trapRef = useFocusTrap<HTMLDivElement>(isOpen);
  useBodyScrollLock(isOpen);

  // Reset inputs when opened/closed
  useEffect(() => {
    if (!isOpen) {
      setConfirmText('');
      setHoldProgress(0);
      setIsHolding(false);
    }
  }, [isOpen]);

  // Handle keyboard Escape dismiss
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const HOLD_DURATION_MS = 3000;
  const HOLD_STEP_INTERVAL_MS = 150;

  // 3-second hold timer effect
  useEffect(() => {
    let interval: any = null;
    if (isHolding) {
      const stepIncrement = (HOLD_STEP_INTERVAL_MS / HOLD_DURATION_MS) * 100;
      interval = setInterval(() => {
        setHoldProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + stepIncrement;
        });
      }, HOLD_STEP_INTERVAL_MS);
    } else {
      setHoldProgress(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHolding]);

  if (!isOpen) return null;

  const isConfirmed = confirmText.trim().toUpperCase() === 'RESET' || holdProgress >= 100;

  const handleExecute = () => {
    if (!isConfirmed) return;
    onConfirm();
    onClose();
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={trapRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="reset-modal-title"
        aria-describedby="reset-modal-desc"
        className="w-full sm:max-w-md bg-surface border border-red-500/35 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl space-y-5 animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200 max-h-[90dvh] sm:max-h-[85vh] overflow-y-auto pb-[calc(1.5rem+env(safe-area-inset-bottom))]"
      >
        {/* Mobile handle indicator */}
        <div className="w-12 h-1.5 bg-accent/20 rounded-full mx-auto sm:hidden mb-2" />

        {/* Modal Header */}
        <div className="flex items-start justify-between gap-3 border-b border-red-500/20 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 id="reset-modal-title" className="text-base sm:text-lg font-black text-red-400">
                Konfirmasi Reset Data
              </h2>
              <p className="text-[11px] text-appText-muted">Tindakan ini tidak dapat dibatalkan</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup dialog reset"
            className="w-8 h-8 rounded-xl bg-surface-2 hover:bg-surface-3 flex items-center justify-center text-appText-muted hover:text-appText-bright transition-colors active:scale-95"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Warning Body */}
        <div id="reset-modal-desc" className="space-y-3 text-xs text-appText-muted leading-relaxed">
          <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 space-y-1.5">
            <div className="font-bold flex items-center gap-1.5 text-red-400">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Peringatan Permanen</span>
            </div>
            <p>
              Seluruh riwayat review FSRS, total perolehan XP, streak harian, tanaman di Kebun Kanji, dan preferensi lokal akan dihapus permanen kembali ke kondisi instalasi awal.
            </p>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="reset-confirm-input" className="block font-semibold text-appText-bright">
              Ketik <span className="text-red-400 font-mono font-bold tracking-wider">RESET</span> untuk konfirmasi:
            </label>
            <input
              id="reset-confirm-input"
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="Ketik RESET di sini..."
              autoComplete="off"
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-theme focus:border-red-500 text-appText-bright text-xs placeholder:text-appText-muted/50 focus:outline-none transition-colors font-mono"
            />
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-accent/15" />
            <span className="flex-shrink mx-3 text-[11px] text-appText-muted">atau tahan tombol 3 detik</span>
            <div className="flex-grow border-t border-accent/15" />
          </div>

          {/* Hold Button Progress Bar */}
          <div className="w-full h-2 rounded-full bg-surface-2 overflow-hidden border border-theme">
            <div
              className="h-full bg-red-500 transition-all duration-150"
              style={{ width: `${holdProgress}%` }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-theme text-appText-bright text-xs font-bold transition-all active:scale-95 text-center min-h-[40px]"
          >
            Batal
          </button>

          <button
            type="button"
            disabled={!isConfirmed}
            onClick={handleExecute}
            onMouseDown={() => setIsHolding(true)}
            onMouseUp={() => setIsHolding(false)}
            onMouseLeave={() => setIsHolding(false)}
            onTouchStart={() => setIsHolding(true)}
            onTouchEnd={() => setIsHolding(false)}
            className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all min-h-[40px] select-none ${
              isConfirmed
                ? 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/30 active:scale-95 cursor-pointer'
                : 'bg-red-950/50 border border-red-500/20 text-red-500/50 cursor-not-allowed'
            }`}
          >
            <Trash2 className="w-4 h-4" />
            <span>{isConfirmed ? 'Hapus Seluruh Data 🧹' : 'Tahan 3 Detik / Ketik RESET'}</span>
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null;
};
