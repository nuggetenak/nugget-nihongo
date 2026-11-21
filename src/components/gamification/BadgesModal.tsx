// ══════════════════════════════════════════════════════════════════
//  BadgesModal.tsx — Japanese Editorial Craft Achievement Badges Modal
//  Complies with WCAG 2.1 AA dialog standards, focus trapping,
//  body scroll lock, safe-area ergonomics & authentic Irasutoya Hanko stamp
// ══════════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Lock } from 'lucide-react';
import { useGamificationStore } from '../../lib/gamification/gamificationStore';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { IrasutoyaImage } from '../common/IrasutoyaImage';

interface BadgesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BadgesModal: React.FC<BadgesModalProps> = ({ isOpen, onClose }) => {
  const { badges } = useGamificationStore();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'vocab' | 'grammar' | 'streak' | 'special'>('all');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const containerRef = useFocusTrap<HTMLDivElement>(isOpen, onClose);
  useBodyScrollLock(isOpen);

  // Close modal on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === 'undefined') return null;

  const earnedCount = badges.filter((b) => b.earned).length;

  const categories = [
    { id: 'all', label: 'Semua' },
    { id: 'vocab', label: 'Kosakata' },
    { id: 'grammar', label: 'Tata Bahasa' },
    { id: 'streak', label: 'Streak' },
    { id: 'special', label: 'Spesial' },
  ] as const;

  const filteredBadges =
    selectedCategory === 'all'
      ? badges
      : badges.filter((b) => b.category === selectedCategory);

  const modalContent = (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
    >
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="badges-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-surface border-t sm:border border-border rounded-t-3xl sm:rounded-2xl p-5 sm:p-7 space-y-4 shadow-xl relative max-h-[88dvh] sm:max-h-[85vh] flex flex-col animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200 pb-[max(1.25rem,env(safe-area-inset-bottom))]"
      >
        {/* Mobile Drag Handle Pill */}
        <div className="w-12 h-1.5 rounded-full bg-border mx-auto -mt-1 mb-2 sm:hidden shrink-0" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-3.5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 overflow-hidden shadow-xs">
              <IrasutoyaImage
                assetId="hanko_excellent"
                className="w-9 h-9 object-contain"
                alt="Lencana Prestasi Nugget Nihongo"
                animatePop
              />
            </div>
            <div>
              <h2 id="badges-modal-title" className="text-lg font-display font-bold text-appText-bright">
                Lencana Prestasi
              </h2>
              <div className="text-xs text-accent font-semibold font-mono">
                {earnedCount} dari {badges.length} Lencana Terbuka
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-11 h-11 min-h-[44px] min-w-[44px] rounded-xl bg-surface-2 hover:bg-surface-3 flex items-center justify-center text-appText-muted hover:text-appText-bright transition-all active:scale-95 border border-border"
            title="Tutup"
            aria-label="Tutup modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 shrink-0 max-w-full" role="tablist" aria-label="Kategori Lencana">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedCategory(cat.id)}
                className={`min-h-[40px] px-3.5 py-1.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all active:scale-95 border cursor-pointer ${
                  isSelected
                    ? 'bg-accent text-white dark:text-stone-950 border-accent shadow-xs'
                    : 'bg-surface-2 hover:bg-surface-3 border-border text-appText-muted hover:text-appText-bright'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto pr-1 flex-1">
          {filteredBadges.map((b) => (
            <div
              key={b.id}
              className={`card-interactive-lift p-3.5 rounded-xl border flex items-start gap-3 transition-all ${
                b.earned
                  ? 'bg-accent/5 dark:bg-amber-950/20 border-accent/25 shadow-xs'
                  : 'bg-surface-2/40 border-border opacity-60'
              }`}
            >
              <div className="w-11 h-11 p-1 rounded-lg bg-surface shrink-0 shadow-xs flex items-center justify-center overflow-hidden border border-border">
                {!failedImages[b.id] ? (
                  <img
                    src={`/assets/badges/${b.id}.svg`}
                    alt={b.name}
                    className={`w-9 h-9 object-contain transition-all ${
                      b.earned ? 'filter-none scale-100' : 'grayscale opacity-40 scale-90'
                    }`}
                    onError={() => {
                      setFailedImages((prev) => ({ ...prev, [b.id]: true }));
                    }}
                  />
                ) : (
                  <span className={`text-xl transition-all select-none ${b.earned ? 'scale-100' : 'grayscale opacity-40 scale-90'}`}>
                    {b.icon || '🎖️'}
                  </span>
                )}
              </div>

              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <div className="font-bold text-sm text-appText-bright truncate">{b.name}</div>
                  {b.earned ? (
                    <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30 shrink-0">
                      Terbuka ✓
                    </span>
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-appText-muted shrink-0" />
                  )}
                </div>

                <div className="text-xs text-appText-muted leading-tight">{b.desc}</div>

                {b.earned && b.earnedAt && (
                  <div className="text-xs text-accent pt-0.5 font-mono">
                    Didapat: {b.earnedAt.slice(0, 10)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
