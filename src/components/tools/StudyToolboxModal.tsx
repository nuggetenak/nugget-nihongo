// ══════════════════════════════════════════════════════════════════
//  StudyToolboxModal.tsx — Kotak Peralatan Belajar (Unified Learning Tools)
//  Consolidates all essential Japanese reference utilities & diagnostic tools
//  into a single, elegant, and responsive modal bottom-sheet
// ══════════════════════════════════════════════════════════════════

import React from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Wrench,
  Table,
  RotateCcw,
  Scale,
  Quote,
  Target,
  Compass,
  HelpCircle,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useFocusTrap } from '../../hooks/useFocusTrap';

interface StudyToolboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenKana: () => void;
  onOpenConjugation: () => void;
  onOpenNuance: () => void;
  onOpenKotowaza: () => void;
  onOpenCatPlacement: () => void;
  onOpenFeatureGuide: () => void;
  onOpenShortcuts: () => void;
}

interface ToolItem {
  id: string;
  name: string;
  nameJp: string;
  desc: string;
  icon: React.ReactNode;
  badge?: string;
  action: () => void;
}

export const StudyToolboxModal: React.FC<StudyToolboxModalProps> = ({
  isOpen,
  onClose,
  onOpenKana,
  onOpenConjugation,
  onOpenNuance,
  onOpenKotowaza,
  onOpenCatPlacement,
  onOpenFeatureGuide,
  onOpenShortcuts,
}) => {
  const containerRef = useFocusTrap<HTMLDivElement>(isOpen, onClose);
  if (!isOpen) return null;

  const tools: ToolItem[] = [
    {
      id: 'cat',
      name: 'Tes Penempatan Mandiri',
      nameJp: '適応型レベル判定',
      desc: 'Tes kilat 10 soal untuk menentukan rekomendasi level JLPT belajarmu (N5–N1) secara akurat.',
      icon: <Target className="w-5 h-5 text-amber-400" />,
      badge: '10 Soal Kilat',
      action: () => {
        onClose();
        onOpenCatPlacement();
      },
    },
    {
      id: 'kana',
      name: 'Bagan Kana Interaktif',
      nameJp: '五十音図・仮名表',
      desc: 'Tabel lengkap Hiragana & Katakana dengan audio pelafalan asli, dakuten, dan youon.',
      icon: <Table className="w-5 h-5 text-emerald-400" />,
      badge: 'Audio Asli',
      action: () => {
        onClose();
        onOpenKana();
      },
    },
    {
      id: 'conjugation',
      name: 'Simulator Konjugasi Verba',
      nameJp: '動詞活用シミュレーター',
      desc: 'Latih dan periksa perubahan bentuk kata kerja: Te, Nai, Ta, Masu, Potensial, Pasif, dan Kausatif.',
      icon: <RotateCcw className="w-5 h-5 text-purple-400" />,
      badge: '9 Bentuk',
      action: () => {
        onClose();
        onOpenConjugation();
      },
    },
    {
      id: 'nuance',
      name: 'Komparator Nuansa Tata Bahasa',
      nameJp: '文法ニュアンス比較',
      desc: 'Bedah perbedaan halus antara pola mirip yang sering membingungkan (contoh: に vs で, は vs が).',
      icon: <Scale className="w-5 h-5 text-blue-400" />,
      badge: 'Anti-Tukar',
      action: () => {
        onClose();
        onOpenNuance();
      },
    },
    {
      id: 'kotowaza',
      name: 'Galeri 52 Peribahasa (ことわざ)',
      nameJp: '伝統のことわざ集',
      desc: 'Koleksi hikmah dan ungkapan tradisional Jepang lengkap dengan bacaan, arti, dan audio.',
      icon: <Quote className="w-5 h-5 text-amber-300" />,
      badge: '52 Mutiara',
      action: () => {
        onClose();
        onOpenKotowaza();
      },
    },
    {
      id: 'guide',
      name: 'Direktori Panduan Fitur',
      nameJp: '機能ガイド・使い方',
      desc: 'Penjelasan menyeluruh mengenai fitur aplikasi, kurikulum 8 jalur, dan kiat belajar efektif.',
      icon: <Compass className="w-5 h-5 text-cyan-400" />,
      action: () => {
        onClose();
        onOpenFeatureGuide();
      },
    },
    {
      id: 'shortcuts',
      name: 'Pintasan Keyboard (Desktop)',
      nameJp: 'キーボードショートカット',
      desc: 'Daftar hotkey cepat (⌘K, ?, F, R, Spasi, 1-4) untuk navigasi kilat di komputer desktop.',
      icon: <HelpCircle className="w-5 h-5 text-rose-400" />,
      badge: '⌘K · ?',
      action: () => {
        onClose();
        onOpenShortcuts();
      },
    },
  ];

  const modalContent = (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Kotak Peralatan Belajar"
    >
      {/* Modal Card / Responsive Bottom-Sheet */}
      <div
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-surface border-t-2 sm:border border-accent/25 rounded-t-3xl sm:rounded-3xl shadow-2xl z-10 max-h-[90dvh] sm:max-h-[92vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200 pb-[max(1rem,env(safe-area-inset-bottom))]"
      >
        {/* Mobile Drag Indicator */}
        <div className="flex sm:hidden justify-center pt-2.5 pb-1">
          <div className="w-12 h-1.5 rounded-full bg-accent/30" />
        </div>

        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-accent/15 bg-surface-2/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-accent flex items-center justify-center shrink-0 border border-amber-500/30">
              <Wrench className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-extrabold text-appText-bright truncate">
                Kotak Peralatan Belajar
              </h2>
              <div className="text-[11px] text-accent font-semibold truncate flex items-center gap-1.5">
                <span>Alat Referensi, Bagan, & Diagnosis Kilat</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-surface hover:bg-surface-3 text-appText-muted hover:text-appText-bright transition-colors active:scale-95 flex items-center justify-center"
            title="Tutup"
            aria-label="Tutup kotak peralatan belajar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tools Grid / List */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-2.5 flex-1 min-w-0 scrollbar-thin">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={tool.action}
              className="w-full p-3.5 rounded-2xl bg-surface-2 hover:bg-surface-3 border border-accent/15 hover:border-accent/40 text-left transition-all group flex items-center justify-between gap-3 active:scale-98 shadow-sm"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-surface border border-accent/15 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                  {tool.icon}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-bold text-appText-bright group-hover:text-accent transition-colors truncate">
                      {tool.name}
                    </span>
                    {tool.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-accent-hot border border-amber-500/25 shrink-0">
                        {tool.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-appText-muted line-clamp-1 leading-relaxed mt-0.5">
                    {tool.desc}
                  </p>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-appText-muted/50 group-hover:text-accent group-hover:translate-x-0.5 transition-all shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
