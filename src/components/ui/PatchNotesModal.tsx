// ══════════════════════════════════════════════════════════════════
//  PatchNotesModal.tsx — Riwayat Versi & Catatan Rilis Nugget Nihongo
//  Modal interaktif untuk meninjau pembaruan fitur dari v1 ke v17
// ══════════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Sparkles,
  GitCommit,
  Calendar,
  Layers,
  ChevronDown,
  ChevronUp,
  Tag,
  CheckCircle2,
  Rocket,
  History,
} from 'lucide-react';
import { PATCH_NOTES_HISTORY, PatchNote } from '../../lib/data/patchNotes';
import { APP_VERSION } from '../../config/version';

interface PatchNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PatchNotesModal: React.FC<PatchNotesModalProps> = ({ isOpen, onClose }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'major'>('all');
  const [showTechnical, setShowTechnical] = useState(false);
  const [expandedVersions, setExpandedVersions] = useState<Record<string, boolean>>({
    [APP_VERSION]: true, // Expanded by default
  });

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleExpand = (version: string) => {
    setExpandedVersions((prev) => ({
      ...prev,
      [version]: !prev[version],
    }));
  };

  const filteredHistory = PATCH_NOTES_HISTORY.filter((note) => {
    if (selectedFilter === 'major') return note.type === 'major';
    return true;
  });

  const modalContent = (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Catatan Rilis dan Pembaruan"
    >
      <div
        className="relative w-full max-w-2xl bg-surface border-t-2 sm:border border-accent/25 rounded-t-3xl sm:rounded-3xl p-4 sm:p-7 shadow-2xl space-y-4 sm:space-y-5 animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200 max-h-[90dvh] sm:max-h-[88vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Indicator */}
        <div className="w-12 h-1.5 rounded-full bg-accent/25 mx-auto -mt-1 mb-1 sm:hidden shrink-0" />

        {/* Subtle background glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-accent/15 pb-3 sm:pb-4 shrink-0 gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-accent flex items-center justify-center shrink-0">
              <History className="w-5 h-5 text-accent-hot" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <h2 className="text-base sm:text-xl font-extrabold text-appText-bright truncate">
                  Catatan Rilis
                </h2>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-accent text-bg">
                  v{APP_VERSION}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-appText-muted mt-0.5 truncate">
                Riwayat evolusi dan catatan perubahan Nugget Nihongo.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-2 hover:bg-surface-3 flex items-center justify-center text-appText-muted hover:text-appText-bright transition-all shrink-0 active:scale-95"
            aria-label="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Pills & Technical Mode Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95 ${
                selectedFilter === 'all'
                  ? 'bg-amber-500 text-stone-950 shadow-sm font-black'
                  : 'text-appText-muted hover:text-appText-bright bg-surface-2 border border-theme'
              }`}
            >
              Semua Versi ({PATCH_NOTES_HISTORY.length})
            </button>
            <button
              onClick={() => setSelectedFilter('major')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95 ${
                selectedFilter === 'major'
                  ? 'bg-amber-500 text-stone-950 shadow-sm font-black'
                  : 'text-appText-muted hover:text-appText-bright bg-surface-2 border border-theme'
              }`}
            >
              Rilis Mayor ({PATCH_NOTES_HISTORY.filter((n) => n.type === 'major').length})
            </button>
          </div>

          <button
            onClick={() => setShowTechnical(!showTechnical)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border active:scale-95 ${
              showTechnical
                ? 'bg-amber-500/15 border-amber-500/40 text-accent font-extrabold shadow-sm'
                : 'bg-surface-2 border-theme text-appText-muted hover:text-appText-bright'
            }`}
            title="Alihkan antara bahasa ramah pembelajar dan detail teknis arsitektur"
          >
            <span>{showTechnical ? '⚙️ Detail Teknis (Dev)' : '🌿 Bahasa Ramah Pelajar'}</span>
          </button>
        </div>

        {/* Timeline Notes List (Scrollable) */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 sm:pr-2 scrollbar-thin pb-6">
          {filteredHistory.map((note) => {
            const isCurrent = note.version === APP_VERSION;
            const isExpanded = !!expandedVersions[note.version];

            return (
              <div
                key={note.version}
                className={`rounded-2xl border transition-all ${
                  isCurrent
                    ? 'bg-surface-2/90 border-amber-500/40 shadow-sm'
                    : 'bg-surface-2/50 border-accent/15 hover:border-accent/30'
                }`}
              >
                {/* Note Header / Toggle */}
                <div
                  onClick={() => toggleExpand(note.version)}
                  className="p-4 sm:p-5 flex items-start justify-between gap-3 cursor-pointer select-none"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono font-extrabold text-sm sm:text-base text-appText-bright">
                        {note.version}
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          Versi Kamu
                        </span>
                      )}
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                          note.type === 'major'
                            ? 'bg-amber-500/15 border-amber-500/30 text-accent'
                            : 'bg-surface-3 border-accent/20 text-appText-muted'
                        }`}
                      >
                        {note.type === 'major' ? 'Rilis Akbar' : 'Pembaruan'}
                      </span>
                    </div>

                    <div className="text-xs sm:text-sm font-bold text-accent-hot">
                      {note.releaseName}
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] text-appText-muted">
                      <Calendar className="w-3 h-3 text-appText-muted" />
                      <span>{note.date}</span>
                    </div>
                  </div>

                  <div className="p-1 rounded-lg bg-surface hover:bg-surface-3 text-appText-muted shrink-0 transition-colors mt-1">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>

                {/* Friendly Learner Summary Card (When available) */}
                {note.friendlySummary && (
                  <div className="mx-4 sm:mx-5 mb-3 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-xs text-appText-bright leading-relaxed flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <div>
                      <span className="font-extrabold text-accent">Pembaruan untuk Kamu: </span>
                      <span>{note.friendlySummary}</span>
                    </div>
                  </div>
                )}

                {/* Highlights List */}
                <div className="px-4 sm:px-5 pb-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-appText-muted mb-2">
                    {showTechnical ? 'Sorotan Teknis Arsitektur:' : 'Poin Penting untuk Belajar:'}
                  </div>
                  <ul className="space-y-1.5">
                    {note.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-appText flex items-start gap-2 leading-relaxed">
                        <span className="text-accent shrink-0 mt-0.5">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Detailed Breakdown (Shown when expanded AND showTechnical is active) */}
                {isExpanded && showTechnical && note.details && note.details.length > 0 && (
                  <div className="px-4 sm:px-5 pb-5 pt-3 border-t border-accent/10 space-y-3.5 animate-in fade-in duration-200">
                    <div className="text-[11px] font-extrabold uppercase text-amber-500 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Spesifikasi & Log Rekayasa (Dev Log)</span>
                    </div>
                    {note.details.map((d, di) => (
                      <div key={di} className="space-y-1.5">
                        <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                          <Tag className="w-3 h-3" />
                          <span>{d.category}</span>
                        </div>
                        <ul className="space-y-1 pl-4">
                          {d.items.map((item, ii) => (
                            <li key={ii} className="text-[11px] text-appText-muted leading-relaxed list-disc">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="pt-2 pb-[max(0.25rem,env(safe-area-inset-bottom))] border-t border-accent/15 flex items-center justify-between text-xs text-appText-muted shrink-0">
          <span className="hidden sm:inline">Nugget Nihongo PWA Offline Engine</span>
          <span className="text-[11px] sm:hidden font-mono text-accent">v{APP_VERSION}</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-accent text-bg font-bold text-xs hover:bg-accent-hot transition-all shadow-sm active:scale-95 ml-auto"
          >
            Tutup Catatan
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
