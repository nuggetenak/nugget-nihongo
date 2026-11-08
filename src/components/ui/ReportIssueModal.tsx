// ══════════════════════════════════════════════════════════════════
//  ReportIssueModal.tsx — In-App Content Error & Feedback Modal
//  Allows learners to report unnatural sentences, typos, or wrong answers
// ══════════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react';
import { X, Flag, AlertTriangle, Send, CheckCircle2, Sparkles } from 'lucide-react';
import { useReportStore, ReportCategory, ContentReport } from '../../lib/report/reportStore';
import { useAppStore } from '../../store/useAppStore';
import { scrubSensitiveData } from '../../lib/telemetry/errorReporter';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { IrasutoyaImage } from '../common/IrasutoyaImage';

export interface ReportItemContext {
  itemId: string;
  itemType: ContentReport['itemType'];
  originalJapanese: string;
  originalTranslation?: string;
}

interface ReportIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  context: ReportItemContext | null;
}

const CATEGORIES: Array<{ id: ReportCategory; label: string; desc: string; icon: string }> = [
  {
    id: 'unnatural_japanese',
    label: 'Kalimat Tidak Alami / Kaku',
    desc: 'Nuansa bahasa kurang lazim bagi penutur asli Jepang',
    icon: '🎌',
  },
  {
    id: 'wrong_translation',
    label: 'Terjemahan Keliru / Kurang Tepat',
    desc: 'Arti bahasa Indonesia tidak cocok dengan konteks',
    icon: '📝',
  },
  {
    id: 'wrong_answer',
    label: 'Kunci Jawaban Kuis Salah',
    desc: 'Jawaban yang benar ditandai salah atau opsi mengecoh',
    icon: '❌',
  },
  {
    id: 'typo',
    label: 'Salah Ketik / Ejaan (Typo)',
    desc: 'Ada kesalahan kanji, kana, atau huruf latin',
    icon: '🔤',
  },
  {
    id: 'audio_issue',
    label: 'Masalah Audio / Pelafalan',
    desc: 'Suara TTS salah baca atau aksen terdengar aneh',
    icon: '🔊',
  },
  {
    id: 'other',
    label: 'Hal Lainnya',
    desc: 'Kritik, saran konteks, atau catatan tambahan',
    icon: '💡',
  },
];

export const ReportIssueModal: React.FC<ReportIssueModalProps> = ({
  isOpen,
  onClose,
  context,
}) => {
  const containerRef = useFocusTrap<HTMLDivElement>(isOpen, onClose);
  useBodyScrollLock(isOpen);
  const { submitReport, isSubmitting } = useReportStore();
  const { showToast } = useAppStore();

  const [category, setCategory] = useState<ReportCategory>('unnatural_japanese');
  const [description, setDescription] = useState('');
  const [suggestedCorrection, setSuggestedCorrection] = useState('');

  // Close on Escape key
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

  if (!isOpen || !context) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      showToast('Mohon berikan sedikit penjelasan mengenai kesalahan.', '⚠️');
      return;
    }

    const res = await submitReport({
      itemId: context.itemId,
      itemType: context.itemType,
      originalJapanese: context.originalJapanese,
      originalTranslation: context.originalTranslation,
      category,
      description: scrubSensitiveData(description.trim()),
      suggestedCorrection: suggestedCorrection.trim() ? scrubSensitiveData(suggestedCorrection.trim()) : undefined,
    });

    showToast(res.message, '🚩');
    setDescription('');
    setSuggestedCorrection('');
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Laporkan Masalah Materi"
    >
      <div
        ref={containerRef}
        className="w-full max-w-lg bg-surface border-t sm:border border-accent/25 rounded-t-3xl sm:rounded-3xl p-5 sm:p-7 shadow-2xl relative space-y-5 max-h-[88dvh] sm:max-h-[90vh] overflow-y-auto pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:pb-7"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Handle */}
        <div className="w-12 h-1.5 rounded-full bg-accent/25 mx-auto -mt-1 mb-2 sm:hidden shrink-0" />
        {/* Header */}
        <div className="flex items-center justify-between border-b border-accent/15 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0 overflow-hidden shadow-glow">
              <IrasutoyaImage
                assetId="daruma_recovery"
                className="w-9 h-9 object-contain"
                alt="Laporkan Masalah Materi"
                animateFloat
              />
            </div>
            <div>
              <h2 className="text-base font-bold text-appText-bright">Laporkan Masalah Materi</h2>
              <p className="text-xs text-appText-muted">Bantu kami menjaga kualitas materi kurikulum</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-surface-2 hover:bg-surface-3 text-appText-muted hover:text-appText-bright transition-all flex items-center justify-center active:scale-95"
            title="Tutup"
            aria-label="Tutup laporan masalah"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item Context Preview Box */}
        <div className="card-interactive-lift bg-surface-2/70 border border-accent/20 rounded-2xl p-4 space-y-1.5">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
            <span>Bagian yang Dilaporkan</span>
            <span className="font-mono opacity-75">({context.itemType})</span>
          </div>
          <div className="text-base sm:text-lg font-jp font-bold text-appText-bright" lang="ja">
            {context.originalJapanese}
          </div>
          {context.originalTranslation && (
            <div className="text-xs text-appText-muted leading-relaxed">
              Arti saat ini: "{context.originalTranslation}"
            </div>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-appText-bright block">
              Jenis Masalah:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {CATEGORIES.map((cat) => {
                const isSelected = category === cat.id;
                return (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`card-interactive-lift p-3 rounded-xl border text-left transition-all flex items-start gap-2.5 active:scale-95 ${
                      isSelected
                        ? 'bg-amber-500/20 border-accent text-amber-900 dark:text-amber-200 font-bold shadow-sm'
                        : 'bg-surface-2 hover:bg-surface-3 border-accent/15 text-appText-muted hover:text-appText-bright'
                    }`}
                  >
                    <span className="text-lg leading-none shrink-0 mt-0.5">{cat.icon}</span>
                    <div className="space-y-0.5 min-w-0">
                      <div className="text-xs font-bold leading-tight">{cat.label}</div>
                      <div className="text-xs opacity-75 line-clamp-1">{cat.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-appText-bright block">
              Penjelasan Kesalahan: <span className="text-rose-600 dark:text-rose-400 font-bold">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Contoh: Partikelnya terasa kaku, biasanya penutur asli memakai に daripada で dalam situasi ini..."
              rows={3}
              required
              className="w-full bg-surface-2 border border-accent/20 rounded-xl p-3 text-xs text-appText-bright placeholder:text-appText-muted focus:outline-none focus:border-accent transition-colors resize-none"
            />
          </div>

          {/* Suggested Correction (Optional) */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-appText-bright block">
              Usulan Perbaikan (Opsional):
            </label>
            <input
              type="text"
              value={suggestedCorrection}
              onChange={(e) => setSuggestedCorrection(e.target.value)}
              placeholder="Contoh kalimat / arti yang lebih alami..."
              className="w-full bg-surface-2 border border-accent/20 rounded-xl px-3 py-2 text-xs text-appText-bright placeholder:text-appText-muted focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          {/* Direct Email Support Fallback */}
          <div className="pt-2 border-t border-accent/10 flex items-center justify-between text-[11px] text-appText-muted">
            <span>Butuh bantuan lebih lanjut?</span>
            <a
              href={`mailto:nuggetnihongo@gmail.com?subject=Laporan%20Item%20${encodeURIComponent(context.itemId)}&body=Halo%20Tim%20Nugget%20Nihongo,%0A%0AItem:%20${encodeURIComponent(context.originalJapanese)}%0AJenis:%20${encodeURIComponent(context.itemType)}%0A%0APesan:%20`}
              className="text-accent font-bold hover:underline flex items-center gap-1"
            >
              Email ke nuggetnihongo@gmail.com
            </a>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2.5 min-h-[44px] rounded-xl bg-surface-2 hover:bg-surface-3 text-appText-muted hover:text-appText-bright text-xs font-bold transition-colors active:scale-95"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 min-h-[44px] rounded-xl bg-accent text-bg hover:bg-accent-hot text-xs font-extrabold flex items-center gap-2 transition-all shadow-glow active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Mengirim...</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim Laporan 🚀</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
