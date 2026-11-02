// ══════════════════════════════════════════════════════════════════
//  DokkaiSheet.tsx — Responsive Reading Passage Stimulus Viewer
//  Research Basis: Dokkai Cognitive Load Budget, Anti-Scroll Fatigue
//  Split View (Desktop) & Sticky Collapsible Preview (Mobile)
// ══════════════════════════════════════════════════════════════════

import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, FileText, ExternalLink } from 'lucide-react';
import { ReadingPassagePayload } from '../../types/exercise';

interface DokkaiSheetProps {
  passage: ReadingPassagePayload;
  className?: string;
}

const GENRE_LABELS: Record<string, { label: string; icon: string; color: string }> = {
  short_notice: { label: 'Pemberitahuan Singkat', icon: '📢', color: 'border-amber-500/30 text-amber-400 bg-amber-500/10' },
  email: { label: 'Surat Elektronik (Email)', icon: '✉️', color: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10' },
  instruction: { label: 'Petunjuk & Regulasi', icon: '📋', color: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10' },
  realia_table: { label: 'Tabel & Dokumen Realia', icon: '📊', color: 'border-purple-500/30 text-purple-400 bg-purple-500/10' },
  work_memo: { label: 'Memo Lapangan Kerja', icon: '📝', color: 'border-rose-500/30 text-rose-400 bg-rose-500/10' },
  essay: { label: 'Esai Pemikiran & Opini', icon: '📖', color: 'border-amber-500/30 text-amber-300 bg-amber-500/10' },
};

export const DokkaiSheet: React.FC<DokkaiSheetProps> = ({ passage, className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const genreMeta = GENRE_LABELS[passage.genre] || {
    label: 'Wacana Membaca (Dokkai)',
    icon: '📄',
    color: 'border-theme text-appText-muted bg-surface-2',
  };

  const paragraphs = passage.passageText.split('\n').filter((p) => p.trim().length > 0);

  return (
    <div
      className={`bg-surface border border-theme rounded-2xl sm:rounded-3xl p-4 sm:p-6 space-y-4 shadow-sm ${className}`}
    >
      {/* ── HEADER WITH GENRE CHIP & TOGGLE ────────────────────────── */}
      <div className="flex items-center justify-between gap-3 border-b border-theme/60 pb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
            <BookOpen className="w-4 h-4 text-amber-400" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full border shrink-0 ${genreMeta.color}`}>
                {genreMeta.icon} {genreMeta.label}
              </span>
            </div>
            {passage.passageTitle && (
              <h4 className="text-xs sm:text-sm font-extrabold text-appText-bright truncate mt-1">
                {passage.passageTitle}
              </h4>
            )}
          </div>
        </div>

        {/* Mobile Expand / Collapse Button */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="min-h-[38px] px-3 py-1.5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-theme text-xs font-bold text-appText-bright flex items-center gap-1.5 transition-all active:scale-95 shrink-0 shadow-sm"
          title={isExpanded ? 'Sembunyikan wacana' : 'Buka wacana'}
        >
          <span>{isExpanded ? 'Ciutkan' : 'Buka Teks'}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* ── PASSAGE CONTENT BODY ───────────────────────────────────── */}
      {isExpanded ? (
        <div className="space-y-3.5 text-sm sm:text-base text-appText-bright leading-relaxed sm:leading-loose font-japanese bg-surface-2/40 border border-theme/60 rounded-2xl p-4 sm:p-5 max-h-[360px] sm:max-h-[450px] overflow-y-auto scrollbar-thin">
          {passage.imageUrl && (
            <div className="rounded-xl overflow-hidden border border-theme mb-3">
              <img
                src={passage.imageUrl}
                alt={passage.passageTitle || 'Dokumen Realia'}
                className="w-full max-h-60 object-contain bg-black/20"
                loading="lazy"
              />
            </div>
          )}

          {paragraphs.map((para, pIdx) => (
            <p key={pIdx} className="break-words indent-4">
              {para}
            </p>
          ))}
        </div>
      ) : (
        /* Collapsed compact preview banner */
        <div
          onClick={() => setIsExpanded(true)}
          className="cursor-pointer bg-surface-2/40 hover:bg-surface-2/70 border border-dashed border-theme rounded-xl p-3 flex items-center justify-between gap-3 text-xs text-appText-muted transition-all"
        >
          <div className="flex items-center gap-2 truncate">
            <FileText className="w-4 h-4 text-accent shrink-0" />
            <span className="truncate italic">
              "{paragraphs[0]?.slice(0, 60)}..."
            </span>
          </div>
          <span className="font-bold text-amber-400 shrink-0">Buka Teks Bacaan →</span>
        </div>
      )}
    </div>
  );
};
