import React, { useState } from 'react';
import { AppModalShell } from '../ui/AppModalShell';
import { TrackId } from '../../lib/curriculum/curriculumStore';

export interface SwitcherTrackItem {
  id: TrackId;
  title: string;
  subtitle: string;
  icon: string | React.ReactNode;
  status?: 'active' | 'soon';
}

const JLPT_LIST: SwitcherTrackItem[] = [
  { id: 'n5', title: 'JLPT N5', subtitle: 'Pemula · Fondasi Tata Bahasa & Kosakata Dasar', icon: '🌱' },
  { id: 'n4', title: 'JLPT N4', subtitle: 'Dasar Harian · Pola Percakapan Praktis & Konjugasi', icon: '🌿' },
  { id: 'n3', title: 'JLPT N3', subtitle: 'Tingkat Menengah · Jembatan Percakapan Otentik', icon: '🌊' },
  { id: 'n2', title: 'JLPT N2', subtitle: 'Pra-Lanjutan · Bahasa Berita, Bisnis & Artikel Opini', icon: '⛰️' },
  { id: 'n1', title: 'JLPT N1', subtitle: 'Tingkat Mahir · Ekspresi Nuansa Sastra & Formal Tinggi', icon: '⛩️' },
];

const SSW_LIST: SwitcherTrackItem[] = [
  { id: 'ssw-kaigo', title: 'SSW Keperawatan Lansia (Kaigo)', subtitle: 'Komunikasi empatik, Koe-kake, & SOP medis', icon: '👵', status: 'active' },
  { id: 'ssw-food', title: 'SSW Pabrik Makanan (Food Mfg)', subtitle: 'Sanitasi HACCP, pencegahan kontaminasi pangan', icon: '🍱', status: 'active' },
  { id: 'ssw-construction', title: 'SSW Konstruksi (Kensetsu)', subtitle: 'SOP K3 konstruksi, komando akustik KYT & alat berat', icon: '👷', status: 'active' },
  { id: 'ssw-agriculture', title: 'SSW Pertanian (Nogyo)', subtitle: 'Budidaya tanaman rumah kaca & peternakan', icon: '🌱', status: 'active' },
  { id: 'ssw-accommodation', title: 'SSW Perhotelan (Shukuhaku)', subtitle: 'Resepsionis omotenashi, check-in & etika tamu', icon: '🏨', status: 'active' },
  { id: 'ssw-building-cleaning', title: 'SSW Pembersihan Gedung', subtitle: 'Sanitasi polisher & pemilahan limbah fasilitas', icon: '🧹', status: 'active' },
  { id: 'ssw-manufacturing', title: 'SSW Manufaktur & Pengolahan', subtitle: 'Mesin press, perakitan presisi, kontrol QC', icon: '⚙️', status: 'soon' },
  { id: 'ssw-automobile', title: 'SSW Perawatan Otomotif', subtitle: 'Servis rem, diagnostik OBD-II & ganti oli', icon: '🚗', status: 'soon' },
  { id: 'ssw-food-service', title: 'SSW Restoran (Gaishoku)', subtitle: 'Penyambutan tamu, handy order & sanitasi dapur', icon: '🍽️', status: 'soon' },
];

const JFT_LIST: SwitcherTrackItem[] = [
  { id: 'jft-a1', title: 'JFT-Basic A1', subtitle: 'Komunikasi dasar kehidupan harian di Jepang', icon: '🎌' },
  { id: 'jft-a2', title: 'JFT-Basic A2', subtitle: 'Standar minimum kelulusan visa kerja SSW', icon: '🎌' },
  { id: 'seikatsu', title: 'Panduan Hidup di Jepang', subtitle: 'SOP darurat gempa, pemilahan sampah, tata krama', icon: '🏮' },
];

const BOOKS_LIST: SwitcherTrackItem[] = [
  { id: 'book-genki', title: 'GENKI I & II', subtitle: 'The Japan Times · Standar percakapan global', icon: '📘' },
  { id: 'book-minna', title: 'Minna no Nihongo I & II', subtitle: '3A Corporation · Silabus LPK kanonikal', icon: '📙' },
  { id: 'book-soumatome', title: 'Nihongo Sou Matome', subtitle: 'ASK Publishing · Persiapan maraton JLPT', icon: '📗' },
  { id: 'book-tobira', title: 'Tobira: Advanced Gateway', subtitle: 'Kuroshio · Jembatan tingkat menengah otentik', icon: '🚪' },
  { id: 'book-quartet', title: 'QUARTET I & II', subtitle: 'The Japan Times · 4 Kemahiran Menengah', icon: '🎻' },
  { id: 'book-try', title: 'TRY! Communicative', subtitle: 'ASK Publishing · Tata bahasa berbasis dialog', icon: '🎯' },
];

type CategoryKey = 'jlpt' | 'ssw' | 'jft' | 'books';

interface TrackPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTrackId: TrackId;
  trackProgress: Record<string, { completedLessons?: string[] }>;
  onSelectTrack: (trackId: TrackId, title: string, icon?: string) => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const TrackPickerModal: React.FC<TrackPickerModalProps> = ({
  isOpen,
  onClose,
  activeTrackId,
  trackProgress,
  onSelectTrack,
  onShowToast,
}) => {
  const [pickerCategory, setPickerCategory] = useState<CategoryKey>('jlpt');

  const categories: { key: CategoryKey; label: string; short: string; list: SwitcherTrackItem[] }[] = [
    { key: 'jlpt', label: 'JLPT', short: 'JLPT', list: JLPT_LIST },
    { key: 'ssw', label: 'SSW Vokasional', short: 'SSW', list: SSW_LIST },
    { key: 'jft', label: 'JFT & Seikatsu', short: 'JFT', list: JFT_LIST },
    { key: 'books', label: 'Buku Teks', short: 'Buku', list: BOOKS_LIST },
  ];

  const currentList = categories.find((c) => c.key === pickerCategory)?.list || JLPT_LIST;

  return (
    <AppModalShell
      isOpen={isOpen}
      onClose={onClose}
      title="Pilih Jalur Belajar Aktif"
      subtitle="Ganti target JLPT, bidang kerja SSW, atau buku teks tanpa kehilangan progres"
      size="lg"
      className="max-h-[85dvh] sm:max-h-[80vh]"
      bodyClassName="p-0 flex flex-col"
    >
      {/* Category Selector Tabs */}
      <div className="flex items-center gap-1.5 p-2 bg-surface-2/60 border-b border-border overflow-x-auto scrollbar-none shrink-0">
        {categories.map((cat) => {
          const isActive = pickerCategory === cat.key;
          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => setPickerCategory(cat.key)}
              className={`flex-1 min-w-0 min-h-[40px] py-2 px-3 rounded-xl text-xs font-semibold transition-all text-center whitespace-nowrap active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                isActive
                  ? 'bg-accent text-white dark:text-stone-950 font-bold shadow-xs'
                  : 'text-appText-muted hover:text-appText-bright hover:bg-surface-3/60'
              }`}
            >
              <span className="sr-only">{cat.label}</span>
              <span className="hidden sm:inline">{cat.label}</span>
              <span className="sm:hidden" aria-hidden="true">{cat.short}</span>
            </button>
          );
        })}
      </div>

      {/* DRY Track Items List */}
      <div className="p-3 sm:p-4 overflow-y-auto space-y-2 flex-1">
        {currentList.map((trk) => {
          const isSelected = activeTrackId === trk.id;
          const stats = trackProgress[trk.id];
          const completedCount = stats?.completedLessons?.length || 0;
          const isSoon = trk.status === 'soon';

          return (
            <button
              key={trk.id}
              type="button"
              onClick={() => {
                if (isSoon) {
                  onShowToast(`${trk.title} sedang disiapkan oleh tim pedagogis & dewan SSW`, '⏳');
                  return;
                }
                const iconStr = typeof trk.icon === 'string' ? trk.icon : '🇯🇵';
                onSelectTrack(trk.id, trk.title, iconStr);
              }}
              className={`w-full p-3 sm:p-3.5 rounded-xl border text-left flex items-center justify-between gap-3 transition-all min-h-[56px] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                isSelected
                  ? 'bg-accent/10 border-accent/60 text-appText-bright font-semibold'
                  : isSoon
                  ? 'bg-surface-2/40 border-transparent opacity-60 cursor-not-allowed text-appText-muted'
                  : 'bg-surface hover:bg-surface-2 border-border/70 text-appText'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-2xl shrink-0">{trk.icon}</span>
                <div className="min-w-0">
                  <div className="font-semibold text-sm text-appText-bright flex items-center gap-2">
                    <span className="truncate">{trk.title}</span>
                    {isSelected && (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-accent text-white dark:text-stone-950 shrink-0">
                        Aktif
                      </span>
                    )}
                    {isSoon && (
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-surface-3 text-appText-muted shrink-0">
                        Segera
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-appText-muted line-clamp-1 sm:line-clamp-none mt-0.5 leading-snug">{trk.subtitle}</div>
                </div>
              </div>

              <div className="text-right shrink-0">
                {completedCount > 0 ? (
                  <div className="space-y-1">
                    <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold block">
                      {completedCount} Selesai
                    </span>
                    <div className="w-16 h-1 rounded-full bg-surface-3 overflow-hidden ml-auto">
                      <div
                        className="h-full bg-emerald-600 dark:bg-emerald-400 rounded-full"
                        style={{ width: `${Math.min(100, Math.max(15, completedCount * 12))}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <span className="text-xs text-appText-muted">Belum Dimulai</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </AppModalShell>
  );
};
