// ══════════════════════════════════════════════════════════════════
//  CommunityHubModal.tsx — Official Community Study Lounge & Portals
//  Central gateway for Indonesian learners: official social media,
//  daily kanji challenges, curated mnemonics, Trakteer & email support
// ══════════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react';
import {
  X,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Heart,
  Share2,
  Mail,
  Coffee,
  Check,
  Send,
  Flame,
  Award,
} from 'lucide-react';
import { IrasutoyaImage } from '../common/IrasutoyaImage';
import { useModalStore } from '../../store/useModalStore';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

interface CommunityHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MnemonicItem {
  id: string;
  kanji: string;
  meaning: string;
  mnemonic: string;
  author: string;
  upvotes: number;
}

const INITIAL_MNEMONICS: MnemonicItem[] = [
  {
    id: 'mn_001',
    kanji: '休',
    meaning: 'Istirahat (やすむ)',
    mnemonic: 'Ada Orang (亻) sedang bersandar di Pohon (木) untuk beristirahat.',
    author: 'Tim Pedagogi Nugget',
    upvotes: 0,
  },
  {
    id: 'mn_002',
    kanji: '森',
    meaning: 'Hutan lebat (もり)',
    mnemonic: 'Tiga pohon (木 + 木 + 木) berkumpul menjadi hutan yang sangat lebat.',
    author: 'Spesialis Visual SSW',
    upvotes: 0,
  },
  {
    id: 'mn_003',
    kanji: '明',
    meaning: 'Terang / Jelas (あかるい)',
    mnemonic: 'Matahari (日) dan Bulan (月) bersanding menciptakan cahaya yang sangat terang.',
    author: 'Kurasi Memori N5',
    upvotes: 0,
  },
];

// Today's Kanji Challenge table based on day of week
const DAILY_KANJI = [
  { day: 'Minggu', char: '日', meaning: 'Matahari / Hari', strokeCount: 4, tip: 'Tarik garis tegak kiri, lalu kotak bersambung!' },
  { day: 'Senin', char: '月', meaning: 'Bulan / Bulan Kalender', strokeCount: 4, tip: 'Bentuk sabit dengan dua garis mendatar di dalam.' },
  { day: 'Selasa', char: '火', meaning: 'Api / Hari Selasa', strokeCount: 4, tip: 'Dua titik percikan api di kiri-kanan sebelum garis utama.' },
  { day: 'Rabu', char: '水', meaning: 'Air / Hari Rabu', strokeCount: 4, tip: 'Goresan tengah vertikal berlekuk dengan dua sayap cipratan.' },
  { day: 'Kamis', char: '木', meaning: 'Pohon / Kayu', strokeCount: 4, tip: 'Palang horizontal lalu vertikal dan akar merentang.' },
  { day: 'Jumat', char: '金', meaning: 'Emas / Uang / Logam', strokeCount: 8, tip: 'Atap payung pelindung di atas tumpukan emas.' },
  { day: 'Sabtu', char: '土', meaning: 'Tanah / Bumi', strokeCount: 3, tip: 'Garis bawah lebih panjang dari garis atas tanda tanah subur.' },
];

export const CommunityHubModal: React.FC<CommunityHubModalProps> = ({ isOpen, onClose }) => {
  const containerRef = useFocusTrap<HTMLDivElement>(isOpen, onClose);
  useBodyScrollLock(isOpen);

  const [upvotedIds, setUpvotedIds] = useState<Set<string>>(new Set());
  const [mnemonics, setMnemonics] = useState<MnemonicItem[]>(INITIAL_MNEMONICS);
  const [copiedShare, setCopiedShare] = useState(false);

  // Determine today's kanji challenge
  const dayIndex = new Date().getDay(); // 0 is Sunday
  const todayChallenge = DAILY_KANJI[dayIndex];

  // Close modal on Escape key
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

  useEffect(() => {
    try {
      const saved = localStorage.getItem('nn_community_mnemonic_upvotes');
      if (saved) {
        setUpvotedIds(new Set(JSON.parse(saved)));
      }
    } catch {}
  }, []);

  if (!isOpen) return null;

  const handleToggleUpvote = (id: string) => {
    const updatedSet = new Set(upvotedIds);
    const isAdding = !updatedSet.has(id);

    if (isAdding) {
      updatedSet.add(id);
    } else {
      updatedSet.delete(id);
    }

    setUpvotedIds(updatedSet);
    try {
      localStorage.setItem('nn_community_mnemonic_upvotes', JSON.stringify(Array.from(updatedSet)));
    } catch {}

    setMnemonics((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          return {
            ...m,
            upvotes: isAdding ? m.upvotes + 1 : m.upvotes - 1,
          };
        }
        return m;
      })
    );
  };

  const handleShareChallenge = async () => {
    const text = `🎌 Tantangan Kanji Hari Ini di Nugget Nihongo: "${todayChallenge.char}" (${todayChallenge.meaning})! Ayo gabung belajar bahasa Jepang gratis: https://x.com/NuggetNihongo #NuggetNihongo`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Tantangan Kanji Nugget Nihongo',
          text,
          url: 'https://x.com/NuggetNihongo',
        });
        return;
      } catch {}
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    } catch {}
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="community-modal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        ref={containerRef}
        className="card-interactive-lift bg-surface border border-accent/25 rounded-t-3xl sm:rounded-2xl max-w-lg w-full max-h-[90dvh] sm:max-h-[92vh] flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Mobile Drag Indicator */}
        <div className="w-12 h-1.5 rounded-full bg-accent/25 mx-auto mt-2.5 -mb-1 sm:hidden shrink-0" />

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-accent/15 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0 overflow-hidden shadow-xs">
              <IrasutoyaImage
                assetId="senpai_studying"
                className="w-7 h-7 object-contain"
                alt="Study Lounge"
                animateFloat
              />
            </div>
            <div>
              <h2
                id="community-modal-title"
                className="text-base font-extrabold text-appText-bright tracking-tight flex items-center gap-1.5"
              >
                Study Lounge & Kanal Resmi
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                  Resmi
                </span>
              </h2>
              <p className="text-xs text-appText-muted">
                Tantangan harian, kanal sosial resmi, & dukungan pemelajar
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-xl hover:bg-surface-2 flex items-center justify-center text-appText-muted hover:text-appText-bright transition-colors active:scale-95"
            aria-label="Tutup komunitas"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 pb-[calc(2rem+env(safe-area-inset-bottom))]">
          {/* Daily Kanji Challenge Card (System-generated daily pick for learners to share) */}
          <div className="relative overflow-hidden p-4 rounded-2xl bg-gradient-to-br from-amber-500/15 via-surface-2 to-amber-500/5 border border-amber-500/30 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                Tantangan Kanji Harian ({todayChallenge.day})
              </span>
              <button
                type="button"
                onClick={handleShareChallenge}
                className="flex items-center gap-1.5 px-3 py-1.5 min-h-[40px] rounded-lg bg-surface hover:bg-surface-2 text-appText-muted hover:text-appText-bright text-xs font-bold border border-accent/20 transition-all active:scale-95"
                title="Bagikan tantangan ke media sosial"
              >
                {copiedShare ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-accent" />
                    <span>Bagikan ke Medsos</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-surface border-2 border-amber-500/40 flex items-center justify-center text-3xl font-serif font-black text-amber-700 dark:text-amber-300 shadow-md">
                {todayChallenge.char}
              </div>
              <div className="space-y-1">
                <div className="text-sm font-extrabold text-appText-bright">
                  {todayChallenge.meaning}
                </div>
                <div className="text-xs text-appText-muted">
                  {todayChallenge.strokeCount} Goresan · {todayChallenge.tip}
                </div>
              </div>
            </div>
          </div>

          {/* Official Social Media Portals Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold text-appText-bright uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-accent" />
                Kanal Resmi Media Sosial
              </h3>
              <span className="text-[10px] text-appText-muted font-medium">
                Terkonfirmasi Aktif & Persiapan
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* X / Twitter (CONFIRMED ACTIVE) */}
              <a
                href="https://x.com/NuggetNihongo"
                target="_blank"
                rel="noopener noreferrer"
                className="card-interactive-lift p-3 rounded-xl bg-surface-2 border border-accent/15 hover:border-accent/40 flex items-center justify-between group transition-all active:scale-95 min-h-[52px]"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-stone-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    𝕏
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-appText-bright truncate group-hover:text-accent flex items-center gap-1.5">
                      X (Twitter)
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="Aktif" />
                    </div>
                    <div className="text-[11px] text-appText-muted truncate">@NuggetNihongo</div>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-appText-muted group-hover:text-accent shrink-0 ml-2" />
              </a>

              {/* Trakteer Creator Support (CONFIRMED ACTIVE) */}
              <a
                href="https://trakteer.id/nugget-nihongo"
                target="_blank"
                rel="noopener noreferrer"
                className="card-interactive-lift p-3 rounded-xl bg-gradient-to-r from-red-500/10 to-amber-500/10 border border-red-500/30 hover:border-red-500/60 flex items-center justify-between group transition-all active:scale-95 min-h-[52px]"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#be1e2d] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                    <Coffee className="w-4 h-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-appText-bright truncate group-hover:text-red-500 flex items-center gap-1.5">
                      Trakteer Sensei
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="Aktif" />
                    </div>
                    <div className="text-[11px] text-appText-muted truncate">Traktir Kopi & Dukung Server</div>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-appText-muted group-hover:text-red-500 shrink-0 ml-2" />
              </a>

              {/* Instagram (IN PREPARATION - USER CONFIRMED NOT YET CREATED) */}
              <div
                className="p-3 rounded-xl bg-surface-2/60 border border-dashed border-accent/20 flex items-center justify-between opacity-80 min-h-[52px]"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500/50 via-rose-500/50 to-purple-600/50 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    📸
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-appText-bright truncate flex items-center gap-1.5">
                      Instagram
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/25">
                        Segera Hadir
                      </span>
                    </div>
                    <div className="text-[11px] text-appText-muted truncate">@nugget.nihongo (Persiapan)</div>
                  </div>
                </div>
              </div>

              {/* Threads (IN PREPARATION) */}
              <div
                className="p-3 rounded-xl bg-surface-2/60 border border-dashed border-accent/20 flex items-center justify-between opacity-80 min-h-[52px]"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-stone-900/60 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    🧵
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-appText-bright truncate flex items-center gap-1.5">
                      Threads
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/25">
                        Segera Hadir
                      </span>
                    </div>
                    <div className="text-[11px] text-appText-muted truncate">@nugget.nihongo (Persiapan)</div>
                  </div>
                </div>
              </div>

              {/* Discord (IN PREPARATION - USER CONFIRMED NOT YET CREATED) */}
              <div
                className="p-3 rounded-xl bg-surface-2/60 border border-dashed border-accent/20 flex items-center justify-between opacity-80 min-h-[52px]"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#5865F2]/50 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    🎮
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-appText-bright truncate flex items-center gap-1.5">
                      Discord Lounge
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/25">
                        Segera Hadir
                      </span>
                    </div>
                    <div className="text-[11px] text-appText-muted truncate">Voice & Tanya Soal (Persiapan)</div>
                  </div>
                </div>
              </div>

              {/* Email Resmi (CONFIRMED ACTIVE) */}
              <a
                href="mailto:nuggetnihongo@gmail.com?subject=Tanya%20Nugget%20Nihongo"
                className="card-interactive-lift p-3 rounded-xl bg-surface-2 border border-accent/15 hover:border-accent/40 flex items-center justify-between group transition-all active:scale-95 min-h-[52px]"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold text-xs shrink-0">
                    <Mail className="w-4 h-4 text-accent" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-appText-bright truncate group-hover:text-accent flex items-center gap-1.5">
                      Email Support
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="Aktif" />
                    </div>
                    <div className="text-[11px] text-appText-muted truncate">nuggetnihongo@gmail.com</div>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-appText-muted group-hover:text-accent shrink-0 ml-2" />
              </a>
            </div>
          </div>

          {/* Curated Mnemonic Showcase (Curated learning aids) */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-appText-bright uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Koleksi Tips & Mnemonik Kanji Terkurasi
            </h3>
            <div className="space-y-2.5">
              {mnemonics.map((item) => {
                const isUpvoted = upvotedIds.has(item.id);
                return (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl bg-surface-2 border border-accent/15 flex items-start gap-3 transition-colors hover:border-accent/30"
                  >
                    <div className="w-10 h-10 rounded-lg bg-surface border border-accent/20 flex items-center justify-center text-xl font-serif font-black text-amber-700 dark:text-amber-300 shrink-0">
                      {item.kanji}
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-extrabold text-appText-bright truncate">
                          {item.meaning}
                        </span>
                        <span className="text-[10px] text-appText-muted shrink-0">
                          oleh {item.author}
                        </span>
                      </div>
                      <p className="text-xs text-appText leading-relaxed">
                        {item.mnemonic}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggleUpvote(item.id)}
                      className={`flex flex-col items-center justify-center p-2 min-w-[40px] min-h-[40px] rounded-lg text-xs font-bold transition-all active:scale-95 ${
                        isUpvoted
                          ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                          : 'bg-surface hover:bg-surface-3 text-appText-muted hover:text-rose-500 border border-accent/15'
                      }`}
                      title={isUpvoted ? 'Hapus dari daftar simpan' : 'Simpan mnemonik ini'}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${isUpvoted ? 'fill-current text-rose-500' : ''}`}
                      />
                      <span className="text-[10px] mt-0.5">{isUpvoted ? 'Tersimpan' : 'Simpan'}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Official Email Support Gateway */}
          <div className="p-3.5 rounded-xl bg-surface-2 border border-accent/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <Mail className="w-4 h-4 text-accent shrink-0" />
              <div className="min-w-0">
                <div className="text-xs font-bold text-appText-bright">Hubungi Kami via Email</div>
                <div className="text-[11px] text-appText-muted truncate">nuggetnihongo@gmail.com</div>
              </div>
            </div>
            <a
              href="mailto:nuggetnihongo@gmail.com?subject=Tanya%20Nugget%20Nihongo"
              className="px-3.5 py-2 min-h-[40px] rounded-lg bg-accent text-bg text-xs font-extrabold flex items-center gap-1.5 transition-all active:scale-95 shrink-0"
            >
              Kirim Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
