// ══════════════════════════════════════════════════════════════════
//  KeyboardShortcutsModal.tsx — Desktop Keyboard Shortcut Cheat Sheet
//  Triggered by '?' key or Help button
// ══════════════════════════════════════════════════════════════════

import React, { useEffect } from 'react';
import { X, Command, Keyboard, Zap, Sparkles } from 'lucide-react';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const shortcutGroups = [
    {
      title: 'Navigasi & Pencarian',
      shortcuts: [
        { keys: ['⌘', 'K'], label: 'Buka Pencarian Global (Kanji/Vocab/Pola)' },
        { keys: ['?'], label: 'Buka Bantuan Pintasan Keyboard ini' },
        { keys: ['Esc'], label: 'Tutup modal / overlay yang sedang terbuka' },
      ],
    },
    {
      title: 'Tampilan Aksara',
      shortcuts: [
        { keys: ['F'], label: 'Nyalakan / Matikan Furigana di atas Kanji' },
        { keys: ['R'], label: 'Nyalakan / Matikan Bantuan Ejaan Romaji' },
      ],
    },
    {
      title: 'Arena Kuis & Flashcard',
      shortcuts: [
        { keys: ['Space'], label: 'Balik Kartu Flashcard / Lanjut ke soal berikutnya' },
        { keys: ['1'], label: 'Rating "Lupa" (Flashcard) atau Pilih Jawaban 1' },
        { keys: ['2'], label: 'Rating "Ragu" (Flashcard) atau Pilih Jawaban 2' },
        { keys: ['3'], label: 'Rating "Hafal" (Flashcard) atau Pilih Jawaban 3' },
        { keys: ['4'], label: 'Pilih Jawaban 4 (Pilihan Ganda)' },
        { keys: ['Enter'], label: 'Konfirmasi jawaban / Lanjut' },
      ],
    },
  ];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-label="Pintasan Keyboard Desktop"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-surface border-2 border-accent/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in zoom-in-95 duration-200"
      >
        <div className="flex items-center justify-between border-b border-accent/15 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-accent shadow-glow">
              <Keyboard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-appText-bright">Pintasan Keyboard</h2>
              <p className="text-xs text-appText-muted">Akses kilat untuk pengguna desktop & power learners.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-2 hover:bg-surface-3 flex items-center justify-center text-appText-muted hover:text-appText-bright transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-5 max-h-[60vh] overflow-y-auto pr-1">
          {shortcutGroups.map((group, idx) => (
            <div key={idx} className="space-y-2.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-accent">
                {group.title}
              </div>
              <div className="space-y-1.5">
                {group.shortcuts.map((sc, sIdx) => (
                  <div
                    key={sIdx}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-surface-2/60 border border-accent/10 hover:border-accent/25 transition-all text-xs"
                  >
                    <span className="text-appText-bright">{sc.label}</span>
                    <div className="flex items-center gap-1 shrink-0 ml-3">
                      {sc.keys.map((k, kIdx) => (
                        <kbd
                          key={kIdx}
                          className="px-2 py-1 rounded-lg bg-surface-3 border border-accent/25 text-[11px] font-mono font-bold text-accent-hot shadow-sm"
                        >
                          {k}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-accent/15 flex items-center justify-between text-xs text-appText-muted">
          <span>💡 Tekan <kbd className="font-mono text-accent">?</kbd> kapan saja untuk membuka</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-accent hover:bg-accent-hot text-bg font-bold text-xs transition-all shadow-sm"
          >
            Mengerti
          </button>
        </div>
      </div>
    </div>
  );
};
