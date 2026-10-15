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
                Nugget Nihongo SLA & L1 Contrastive Acquisition Framework
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] p-2 rounded-2xl bg-surface-2 hover:bg-surface-3 border border-accent/20 text-appText-muted hover:text-appText-bright transition-all flex items-center justify-center shrink-0 active:scale-95"
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
              Kurikulum Nugget Nihongo tidak sekadar menyalin daftar tata bahasa buku komersial, melainkan
              disusun menggunakan pendekatan <strong>Second Language Acquisition (SLA)</strong> modern dan
              pemetaan psikolinguistik penutur bahasa Indonesia. Seluruh materi diarahkan agar otak pembelajar
              dapat mencerna struktur bahasa Jepang secara bertahap tanpa beban kognitif berlebih (*cognitive overload*).
            </p>
          </div>

          {/* 3 Core Scientific Pillars */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>Tiga Pilar Metodologi Utama</span>
            </h3>

            {/* Pillar 1 */}
            <div className="p-4 rounded-2xl bg-surface-2 border border-accent/15 space-y-2">
              <div className="font-extrabold text-appText-bright flex items-center gap-2 text-sm">
                <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-accent text-xs">Pilar 1</span>
                <span>Processability Theory (Pienemann, 1998)</span>
              </div>
              <p className="text-appText-muted text-xs leading-relaxed">
                Manusia mengakuisisi tata bahasa asing melalui hierarki pemrosesan saraf yang tetap: diawali dari
                akses kata tunggal (*Lemma*), prosedur kategori frasa (*Category*), hingga hubungan klausa bertingkat
                (*Subordinate Clause*). Nugget Nihongo mengurutkan 850+ tata bahasa mengikuti tangga hierarki ini,
                sehingga materi rumit baru diperkenalkan setelah pondasi struktur di bawahnya tuntas otomatis di alam bawah sadar.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-4 rounded-2xl bg-surface-2 border border-accent/15 space-y-2">
              <div className="font-extrabold text-appText-bright flex items-center gap-2 text-sm">
                <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-400 text-xs">Pilar 2</span>
                <span>L1 Contrastive Substratum Engine (Interferensi Bahasa Ibu)</span>
              </div>
              <p className="text-appText-muted text-xs leading-relaxed">
                Penutur bahasa Indonesia memiliki kebiasaan berpikir struktur <strong>SVO</strong> (Subjek-Verba-Objek)
                dan kopula kata kerja "adalah". Bahasa Jepang menggunakan struktur <strong>SOV</strong> dan partikel penanda kasus.
                Engine kami secara proaktif mendeteksi titik rawan kesalahan (seperti penerjemahan harfiah kata "adalah"
                menjadi kopula di tengah kalimat) dan memberikan latihan kontrasif ❌ vs ✅ untuk melatih refleks berpikir asli Jepang.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-4 rounded-2xl bg-surface-2 border border-accent/15 space-y-2">
              <div className="font-extrabold text-appText-bright flex items-center gap-2 text-sm">
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-xs">Pilar 3</span>
                <span>The Pushed Output & Noticing Hypothesis (Swain & Schmidt)</span>
              </div>
              <p className="text-appText-muted text-xs leading-relaxed">
                Pembelajar tidak akan fasih hanya dengan pasif mendengarkan. Setiap pelajaran di Nugget Nihongo
                langsung menantang pengguna untuk memproduksi kalimat mandiri melalui <strong>Cek Pemahaman Kilat</strong>
                dan simulasi percakapan di tempat (*in-place micro-drills*) sebelum berpindah ke topik berikutnya.
              </p>
            </div>
          </div>

          {/* Legal & Open Educational Framework */}
          <div className="p-4 rounded-2xl bg-surface-2 border border-accent/15 space-y-2">
            <div className="font-extrabold text-appText-bright flex items-center gap-2 text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Integritas Doktrin Hukum & Hak Cipta Terbuka</span>
            </div>
            <p className="text-appText-muted text-xs leading-relaxed">
              Silabus materi disusun berdasarkan <em>Idea-Expression Distinction</em> (doktrin hukum internasional hak cipta).
              Urutan kompetensi pedagogis diselaraskan dengan standar resmi JLPT dan JF Standard, namun seluruh kalimat contoh,
              uraian dialog, panduan audio, glosarium arti bahasa Indonesia, dan ilustrasi disusun 100% orisinal mandiri oleh tim
              Nugget Nihongo tanpa menduplikasi teks milik penerbit komersial manapun.
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
