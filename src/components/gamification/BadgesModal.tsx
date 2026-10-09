import React from 'react';
import { X, Award, CheckCircle2, Lock } from 'lucide-react';
import { useGamificationStore, BadgeItem } from '../../lib/gamification/gamificationStore';

interface BadgesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BadgesModal: React.FC<BadgesModalProps> = ({ isOpen, onClose }) => {
  const { badges } = useGamificationStore();

  if (!isOpen) return null;

  const earnedCount = badges.filter((b) => b.earned).length;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-surface border-2 border-accent/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[85vh] flex flex-col animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-accent/15 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-accent-hot flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-appText-bright">Lencana Prestasi</h2>
              <div className="text-xs text-appText-muted font-medium">
                {earnedCount} dari {badges.length} Lencana Terbuka
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-2 hover:bg-surface-3 flex items-center justify-center text-appText-muted hover:text-appText-bright transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto pr-1 flex-1">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`p-4 rounded-2xl border flex items-start gap-3 transition-all ${
                b.earned
                  ? 'bg-amber-950/20 border-amber-500/40 shadow-sm'
                  : 'bg-surface-2/50 border-accent/10 opacity-60'
              }`}
            >
              <div className="text-3xl p-2 rounded-xl bg-surface shrink-0 shadow-inner">
                {b.icon}
              </div>

              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-sm text-appText-bright">{b.name}</div>
                  {b.earned ? (
                    <span className="text-[10px] font-bold text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded-full border border-green-500/25">
                      Terbuka ✓
                    </span>
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-appText-muted" />
                  )}
                </div>

                <div className="text-xs text-appText-muted leading-tight">{b.desc}</div>

                {b.earned && b.earnedAt && (
                  <div className="text-[10px] text-accent/80 pt-1 font-mono">
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
};
