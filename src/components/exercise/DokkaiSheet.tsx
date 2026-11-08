// ══════════════════════════════════════════════════════════════════
//  DokkaiSheet.tsx — Responsive Reading Passage Stimulus Viewer
//  Research Basis: Dokkai Cognitive Load Budget, Anti-Scroll Fatigue
//  Split View (Desktop) & Sticky Collapsible Preview (Mobile)
//  Universal Multi-Device Responsive Design & Cultural Anchors
// ══════════════════════════════════════════════════════════════════

import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, FileText, ExternalLink } from 'lucide-react';
import { ReadingPassagePayload } from '../../types/exercise';
import { IrasutoyaImage } from '../common/IrasutoyaImage';
import { parseDokkaiParagraphs, getDokkaiGenreMeta } from '../../lib/exercise/dokkaiExplainer';

interface DokkaiSheetProps {
  passage: ReadingPassagePayload;
  className?: string;
}

export const GENRE_LABELS: Record<string, { label: string; icon: string; color: string }> = {
  short_notice: { label: 'Pemberitahuan Singkat', icon: '📢', color: 'border-amber-500/30 text-amber-800 dark:text-amber-300 bg-amber-500/10 font-bold' },
  email: { label: 'Surat Elektronik (Email)', icon: '✉️', color: 'border-cyan-500/30 text-cyan-800 dark:text-cyan-300 bg-cyan-500/10 font-bold' },
  instruction: { label: 'Petunjuk & Regulasi', icon: '📋', color: 'border-emerald-500/30 text-emerald-800 dark:text-emerald-300 bg-emerald-500/10 font-bold' },
  realia_table: { label: 'Tabel & Dokumen Realia', icon: '📊', color: 'border-purple-500/30 text-purple-800 dark:text-purple-300 bg-purple-500/10 font-bold' },
  work_memo: { label: 'Memo Lapangan Kerja', icon: '📝', color: 'border-rose-500/30 text-rose-800 dark:text-rose-300 bg-rose-500/10 font-bold' },
  essay: { label: 'Esai Pemikiran & Opini', icon: '📖', color: 'border-amber-500/30 text-amber-800 dark:text-amber-300 bg-amber-500/10 font-bold' },
};

export const DokkaiSheet: React.FC<DokkaiSheetProps> = ({ passage, className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!passage || !passage.passageText) return null;

  const genreMeta = getDokkaiGenreMeta(passage.genre);
  const paragraphs = parseDokkaiParagraphs(passage.passageText);

  return (
    <div
      className={`card-interactive-lift bg-surface border border-theme rounded-2xl sm:rounded-3xl p-4 sm:p-6 space-y-4 shadow-sm ${className}`}
    >
      {/* ── HEADER WITH GENRE CHIP & TOGGLE ────────────────────────── */}
      <div className="flex items-center justify-between gap-3 border-b border-theme/60 pb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
            <IrasutoyaImage
              assetId="senpai_studying"
              className="w-8 h-8 object-contain"
              alt="Wacana Membaca Dokkai"
              animateFloat
            />
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
          className="min-h-[40px] px-3.5 py-2 rounded-xl bg-surface-2 hover:bg-surface-3 border border-theme text-xs font-bold text-appText-bright flex items-center gap-1.5 transition-all active:scale-95 shrink-0 shadow-sm"
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
          className="card-interactive-lift cursor-pointer bg-surface-2/40 hover:bg-surface-2/70 border border-dashed border-theme rounded-xl p-3 flex items-center justify-between gap-3 text-xs text-appText-muted transition-all active:scale-95"
        >
          <div className="flex items-center gap-2 truncate">
            <FileText className="w-4 h-4 text-accent shrink-0" />
            <span className="truncate italic">
              "{paragraphs[0]?.slice(0, 60)}..."
            </span>
          </div>
          <span className="font-bold text-amber-800 dark:text-amber-400 shrink-0">Buka Teks Bacaan →</span>
        </div>
      )}
    </div>
  );
};

export default DokkaiSheet;
