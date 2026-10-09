// ══════════════════════════════════════════════════════════════════
//  ReportIssueModal.tsx — In-App Content Error & Feedback Modal
//  Allows learners to report unnatural sentences, typos, or wrong answers
// ══════════════════════════════════════════════════════════════════

import React, { useState } from 'react';
import { X, Flag, AlertTriangle, Send, CheckCircle2, Sparkles } from 'lucide-react';
import { useReportStore, ReportCategory, ContentReport } from '../../lib/report/reportStore';
import { useAppStore } from '../../store/useAppStore';

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
  const { submitReport, isSubmitting } = useReportStore();
  const { showToast } = useAppStore();

  const [category, setCategory] = useState<ReportCategory>('unnatural_japanese');
  const [description, setDescription] = useState('');
  const [suggestedCorrection, setSuggestedCorrection] = useState('');

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
      description: description.trim(),
      suggestedCorrection: suggestedCorrection.trim() || undefined,
    });

    showToast(res.message, '🚩');
    setDescription('');
    setSuggestedCorrection('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-surface border border-accent/25 rounded-3xl p-6 sm:p-7 shadow-2xl relative space-y-5 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-accent/15 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-accent">
              <Flag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-appText-bright">Laporkan Masalah Materi</h2>
              <p className="text-xs text-appText-muted">Bantu kami menjaga kualitas materi kurikulum</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-surface-2 hover:bg-surface-3 text-appText-muted hover:text-appText-bright transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item Context Preview Box */}
        <div className="bg-surface-2/70 border border-accent/20 rounded-2xl p-4 space-y-1.5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
            <span>Bagian yang Dilaporkan</span>
            <span className="font-mono opacity-60">({context.itemType})</span>
          </div>
          <div className="text-base sm:text-lg font-jp font-bold text-appText-bright">
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
                    className={`p-3 rounded-xl border text-left transition-all flex items-start gap-2.5 ${
                      isSelected
                        ? 'bg-amber-500/20 border-accent text-accent-hot shadow-sm'
                        : 'bg-surface-2 hover:bg-surface-3 border-accent/15 text-appText-muted hover:text-appText-bright'
                    }`}
                  >
                    <span className="text-lg leading-none shrink-0 mt-0.5">{cat.icon}</span>
                    <div className="space-y-0.5 min-w-0">
                      <div className="text-xs font-bold leading-tight">{cat.label}</div>
                      <div className="text-[10px] opacity-75 line-clamp-1">{cat.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-appText-bright block">
              Penjelasan Kesalahan: <span className="text-red-400">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Contoh: Partikelnya terasa kaku, biasanya penutur asli memakai に daripada で dalam situasi ini..."
              rows={3}
              required
              className="w-full bg-surface-2 border border-accent/20 rounded-xl p-3 text-xs text-appText-bright placeholder:text-appText-muted/50 focus:outline-none focus:border-accent transition-colors resize-none"
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
              className="w-full bg-surface-2 border border-accent/20 rounded-xl px-3 py-2 text-xs text-appText-bright placeholder:text-appText-muted/50 focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 text-appText-muted hover:text-appText-bright text-xs font-bold transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl bg-accent text-bg hover:bg-accent-hot text-xs font-extrabold flex items-center gap-2 transition-all shadow-glow active:scale-95 disabled:opacity-50"
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
