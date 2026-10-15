// ══════════════════════════════════════════════════════════════════
//  ResearchMethodologyModal.tsx — Landasan Riset Kurikulum Nugget Nihongo
//  Dedicated Academic Reference Hub: Processability Theory (Pienemann),
//  SLA Output Hypothesis (Swain), & L1 Contrastive Substratum Engine
// ══════════════════════════════════════════════════════════════════

import React from 'react';
import { X, BookOpen, GraduationCap, Award, Compass, ShieldCheck, Sparkles } from 'lucide-react';

interface ResearchMethodologyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResearchMethodologyModal: React.FC<ResearchMethodologyModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="research-modal-title"
    >
      <div className="relative w-full max-w-3xl max-h-[90dvh] sm:max-h-[92vh] bg-surface rounded-3xl border border-accent/30 shadow-2xl overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 sm:p-6 bg-surface/95 backdrop-blur-sm border-b border-accent/20">
          <div className="flex items-center gap-3 min-w-0">
            <span className="p-2 sm:p-2.5 rounded-2xl bg-amber-500/15 text-accent border border-amber-500/25 shrink-0">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
            </span>
            <div className="min-w-0">
              <h2
                id="research-modal-title"
                className="text-base sm:text-lg font-extrabold text-appText-bright truncate"
              >
                Landasan Kurikulum & Riset Ilmiah
              </h2>
              <p className="text-[11px] text-appText-muted truncate">
                Metode Belajar Terstruktur yang Disesuaikan untuk Penutur Indonesia
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] p-2 rounded-2xl bg-surface-2 hover:bg-surface-3 border border-accent/20 text-appText-muted hover:text-appText-bright transition-all flex items-center justify-center shrink-0 active:scale-95"
            title="Tutup"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-6 text-appText text-xs sm:text-sm leading-relaxed">
          {/* Executive Overview */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-surface-2 to-surface-2 border border-accent/20 space-y-2">
            <div className="flex items-center gap-2 text-accent font-extrabold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Sains di Balik Efektivitas Belajar</span>
            </div>
            <p className="text-appText">
              Kurikulum Nugget Nihongo dirancang menggunakan pendekatan pemerolehan bahasa modern yang ramah
              dan disesuaikan khusus untuk pola pikir penutur bahasa Indonesia. Seluruh materi diatur bertahap
              agar mudah dicerna dan tidak terasa memberatkan otak.
            </p>
          </div>

          {/* 3 Core Scientific Pillars */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>Tiga Pilar Belajar Efektif</span>
            </h3>

            {/* Pillar 1 */}
            <div className="p-4 rounded-2xl bg-surface-2 border border-accent/15 space-y-2">
              <div className="font-extrabold text-appText-bright flex items-center gap-2 text-sm">
                <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-accent text-xs">Pilar 1</span>
                <span>Tangga Penguasaan Bertahap (Step-by-step Mastery)</span>
              </div>
              <p className="text-appText-muted text-xs leading-relaxed">
                Otak manusia belajar bahasa paling efektif jika dimulai dari pola sederhana sebelum masuk ke kalimat kompleks.
                Nugget Nihongo mengurutkan 850+ materi tata bahasa secara bertingkat: dari kata tunggal, frasa sehari-hari, hingga anak kalimat bertingkat,
                sehingga kamu tidak bingung dan fondasimu selalu kuat.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-4 rounded-2xl bg-surface-2 border border-accent/15 space-y-2">
              <div className="font-extrabold text-appText-bright flex items-center gap-2 text-sm">
                <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-400 text-xs">Pilar 2</span>
                <span>Antisipasi Kebiasaan Bahasa Indonesia (L1 Smart Bridge)</span>
              </div>
              <p className="text-appText-muted text-xs leading-relaxed">
                Penutur bahasa Indonesia terbiasa dengan susunan Subjek-Predikat-Objek dan kata "adalah", sedangkan
                bahasa Jepang meletakkan kata kerja di akhir kalimat dengan partikel penanda. Nugget Nihongo langsung menandai
                titik-titik jebakan yang sering membingungkan dan memberikan contoh kontras ❌ vs ✅ agar refleks bahasa Jepangmu terbentuk alami.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-4 rounded-2xl bg-surface-2 border border-accent/15 space-y-2">
              <div className="font-extrabold text-appText-bright flex items-center gap-2 text-sm">
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-xs">Pilar 3</span>
                <span>Praktik Aktif Langsung (Active Recall & Drills)</span>
              </div>
              <p className="text-appText-muted text-xs leading-relaxed">
                Kamu tidak akan cepat fasih jika hanya membaca pasif. Setiap modul di Nugget Nihongo
                langsung mengajakmu menyusun kalimat mandiri melalui <strong>Cek Pemahaman Kilat</strong>,
                latihan susun kata, dan simulasi dialog sebelum beralih ke topik berikutnya.
              </p>
            </div>
          </div>

          {/* Legal & Open Educational Framework */}
          <div className="p-4 rounded-2xl bg-surface-2 border border-accent/15 space-y-2">
            <div className="font-extrabold text-appText-bright flex items-center gap-2 text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Konten 100% Orisinal & Legal</span>
            </div>
            <p className="text-appText-muted text-xs leading-relaxed">
              Seluruh materi dan kurikulum mengacu pada standar resmi JLPT dan Japan Foundation (JF Standard).
              Semua contoh kalimat, dialog situasi, rekaman audio, arti kosakata, dan panduan belajar disusun
              100% orisinal mandiri oleh tim Nugget Nihongo secara legal, transparan, dan bebas hak cipta pihak ketiga.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 z-10 p-4 sm:p-5 bg-surface/95 backdrop-blur-sm border-t border-accent/20 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-6 py-2.5 rounded-2xl bg-accent text-bg font-extrabold text-xs active:scale-95 shadow-md"
          >
            Tutup & Lanjut Belajar 🚀
          </button>
        </div>
      </div>
    </div>
  );
};
