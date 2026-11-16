// ══════════════════════════════════════════════════════════════════
//  DokkaiSheet.tsx — Responsive Reading Passage Stimulus Viewer
//  Research Basis: Dokkai Cognitive Load Budget, Anti-Scroll Fatigue
//  Split View (Desktop) & Sticky Collapsible Preview (Mobile)
//  Universal Multi-Device Responsive Design & Cultural Anchors
// ══════════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react';
import { BookOpen, ChevronDown, ChevronUp, FileText, ExternalLink, Eye, EyeOff, Maximize2, X } from 'lucide-react';
import { ReadingPassagePayload } from '../../types/exercise';
import { IrasutoyaImage } from '../common/IrasutoyaImage';
import { parseDokkaiParagraphs, getDokkaiGenreMeta } from '../../lib/exercise/dokkaiExplainer';
import { RubyText } from '../ui/RubyText';

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
  advertisement: { label: 'Iklan & Brosur (広告)', icon: '🏷️', color: 'border-orange-500/30 text-orange-800 dark:text-orange-300 bg-orange-500/10 font-bold' },
  pamphlet: { label: 'Pamflet & Selebaran', icon: '📄', color: 'border-blue-500/30 text-blue-800 dark:text-blue-300 bg-blue-500/10 font-bold' },
  business_letter: { label: 'Surat Resmi Bisnis', icon: '📬', color: 'border-indigo-500/30 text-indigo-800 dark:text-indigo-300 bg-indigo-500/10 font-bold' },
  info_retrieval: { label: 'Pencarian Informasi Realia', icon: '🔍', color: 'border-teal-500/30 text-teal-800 dark:text-teal-300 bg-teal-500/10 font-bold' },
};

export const DokkaiSheet: React.FC<DokkaiSheetProps> = ({ passage, className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showFurigana, setShowFurigana] = useState(true);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Close image modal on Escape key
  useEffect(() => {
    if (!isImageModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsImageModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isImageModalOpen]);

  if (!passage || !passage.passageText) return null;

  const genreMeta = getDokkaiGenreMeta(passage.genre);
  const paragraphs = parseDokkaiParagraphs(passage.passageText);

  const textSizeClasses =
    fontSize === 'large'
      ? 'text-base sm:text-lg leading-loose'
      : 'text-sm sm:text-base leading-relaxed sm:leading-loose';

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

        {/* Action Controls: Font Scaler, Furigana Toggle & Expand/Collapse */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* A- / A+ Font Size Scaler */}
          <button
            type="button"
            onClick={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
            className="min-h-[40px] px-2.5 py-1.5 rounded-xl border border-theme text-xs font-bold transition-all flex items-center gap-1 active:scale-95 bg-surface-2 hover:bg-surface-3 text-appText-muted hover:text-appText-bright"
            title={fontSize === 'normal' ? 'Perbesar Ukuran Teks (A+)' : 'Ukuran Teks Standar (A-)'}
            aria-label="Ubah Ukuran Teks"
          >
            <span className="font-bold">{fontSize === 'normal' ? 'A+' : 'A-'}</span>
          </button>

          {/* Furigana Toggle */}
          <button
            type="button"
            onClick={() => setShowFurigana(!showFurigana)}
            className={`min-h-[40px] px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1 active:scale-95 ${
              showFurigana
                ? 'bg-amber-500/15 border-amber-500/30 text-accent-hot dark:text-amber-300'
                : 'bg-surface-2 border-theme text-appText-muted hover:text-appText-bright'
            }`}
            title={showFurigana ? 'Sembunyikan Furigana' : 'Tampilkan Furigana'}
            aria-pressed={showFurigana}
          >
            <span className="font-japanese text-xs">振</span>
            <span className="hidden sm:inline">Furigana</span>
          </button>

          {/* Expand/Collapse Toggle */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="min-h-[40px] px-3.5 py-2 rounded-xl bg-surface-2 hover:bg-surface-3 border border-theme text-xs font-bold text-appText-bright flex items-center gap-1.5 transition-all active:scale-95 shrink-0 shadow-sm"
            title={isExpanded ? 'Sembunyikan wacana' : 'Buka wacana'}
            aria-expanded={isExpanded}
          >
            <span>{isExpanded ? 'Ciutkan' : 'Buka Teks'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* ── PASSAGE CONTENT BODY ───────────────────────────────────── */}
      {isExpanded ? (
        <div className={`space-y-3.5 ${textSizeClasses} text-appText-bright font-japanese bg-surface-2/40 border border-theme/60 rounded-2xl p-4 sm:p-5 max-h-[360px] sm:max-h-[450px] overflow-y-auto scrollbar-thin`}>
          {passage.imageUrl && !imageError && (
            <div
              onClick={() => setIsImageModalOpen(true)}
              className="relative group rounded-xl overflow-hidden border border-theme mb-3 bg-black/10 cursor-pointer"
              title="Ketuk untuk memperbesar gambar dokumen realia"
            >
              <img
                src={passage.imageUrl}
                alt={passage.passageTitle || 'Dokumen Realia'}
                className="w-full max-h-60 object-contain bg-black/20 group-hover:opacity-95 transition-opacity"
                loading="lazy"
                onError={() => setImageError(true)}
              />
              <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-surface/90 border border-theme text-xs font-bold text-appText-bright flex items-center gap-1 shadow-sm opacity-90 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Perbesar</span>
              </div>
            </div>
          )}

          {passage.imageUrl && imageError && (
            <div className="p-3 rounded-xl border border-dashed border-theme bg-surface-2/40 text-xs text-appText-muted flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Dokumen Realia (Simulasi Berkas)</span>
            </div>
          )}

          {paragraphs.map((para, pIdx) => (
            <p key={pIdx} className="break-words indent-4">
              <RubyText text={para} showFurigana={showFurigana} />
            </p>
          ))}
        </div>
      ) : (
        /* Collapsed compact preview banner */
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          className="w-full card-interactive-lift cursor-pointer bg-surface-2/40 hover:bg-surface-2/70 border border-dashed border-theme rounded-xl p-3 flex items-center justify-between gap-3 text-xs text-appText-muted transition-all active:scale-95 text-left"
          aria-expanded={isExpanded}
        >
          <div className="flex items-center gap-2 truncate">
            <FileText className="w-4 h-4 text-accent shrink-0" />
            <span className="truncate italic">
              "{paragraphs[0]?.slice(0, 60)}..."
            </span>
          </div>
          <span className="font-bold text-amber-800 dark:text-amber-400 shrink-0">Buka Teks Bacaan →</span>
        </button>
      )}

      {/* ── REALIA IMAGE LIGHTBOX MODAL ────────────────────────────── */}
      {isImageModalOpen && passage.imageUrl && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Pratinjau Dokumen Realia"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm p-4 sm:p-6 flex flex-col items-center justify-center animate-fade-in"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] bg-surface border border-theme rounded-3xl p-4 sm:p-6 flex flex-col space-y-3 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-theme pb-3">
              <div className="flex items-center gap-2 min-w-0">
                <FileText className="w-4 h-4 text-amber-500 shrink-0" />
                <h3 className="text-sm sm:text-base font-bold text-appText-bright truncate">
                  {passage.passageTitle || 'Dokumen Realia Lengkap'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsImageModalOpen(false)}
                className="min-h-[40px] min-w-[40px] rounded-xl bg-surface-2 hover:bg-surface-3 border border-theme flex items-center justify-center text-appText-muted hover:text-appText-bright transition-all active:scale-95"
                title="Tutup Pratinjau Gambar"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-auto flex items-center justify-center p-2 rounded-2xl bg-black/30 border border-theme/40">
              <img
                src={passage.imageUrl}
                alt={passage.passageTitle || 'Dokumen Realia'}
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl shadow-md"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DokkaiSheet;
