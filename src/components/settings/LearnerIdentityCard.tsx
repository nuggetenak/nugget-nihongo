import React, { useState } from 'react';
import {
  User,
  Award,
  Sparkles,
  Edit3,
  Check,
  X,
  Palette,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
} from 'lucide-react';
import { SyncStatusPill } from '../ui/SyncStatusPill';

export interface CulturalAvatar {
  id: string;
  icon: string;
  name: string;
  nameJp: string;
  desc: string;
}

export const CULTURAL_AVATARS: CulturalAvatar[] = [
  { id: 'daruma', icon: '🏮', name: 'Daruma', nameJp: '達磨 (だるま)', desc: 'Pantang Menyerah & Keberuntungan' },
  { id: 'manekineko', icon: '🐱', name: 'Maneki-Neko', nameJp: '招き猫', desc: 'Pemikat Rezeki & Kemakmuran' },
  { id: 'samurai', icon: '⚔️', name: 'Samurai', nameJp: '侍 (武士道)', desc: 'Disiplin Tinggi & Keteguhan Jiwa' },
  { id: 'sakura', icon: '🌸', name: 'Sakura', nameJp: '桜 (さくら)', desc: 'Keindahan, Harmoni & Harapan Baru' },
  { id: 'fuji', icon: '🗻', name: 'Gunung Fuji', nameJp: '富士山', desc: 'Puncak Tertinggi & Keagungan' },
  { id: 'origami', icon: '🦢', name: 'Origami Tsuru', nameJp: '折り鶴', desc: 'Ketelitian Seni & Seribu Harapan' },
  { id: 'tanuki', icon: '🍃', name: 'Tanuki', nameJp: '狸 (たぬき)', desc: 'Transformasi Cerdas & Keceriaan' },
  { id: 'kitsune', icon: '🦊', name: 'Kitsune', nameJp: '狐 (きつね)', desc: 'Kecerdikan & Utusan Dewa Inari' },
  { id: 'shinkansen', icon: '🚅', name: 'Shinkansen', nameJp: '新幹線', desc: 'Kecepatan, Presisi & Masa Depan' },
];

interface LearnerIdentityCardProps {
  user: any;
  customDisplayName: string;
  customAvatar: string;
  onSaveDisplayName: (name: string) => void;
  onSaveAvatar: (avatar: string) => void;
  levelInfo: { level: number; title: string; titleJp?: string };
  nextLevelProgress: { currentLevelXp: number; nextLevelXp: number; percent: number; xpNeeded?: number };
  xp: number;
  showToast: (msg: string, icon?: string) => void;
}

export const LearnerIdentityCard: React.FC<LearnerIdentityCardProps> = ({
  user,
  customDisplayName,
  customAvatar,
  onSaveDisplayName,
  onSaveAvatar,
  levelInfo,
  nextLevelProgress,
  xp,
  showToast,
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [isAvatarPickerOpen, setIsAvatarPickerOpen] = useState(false);
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [imageLoadError, setImageLoadError] = useState(false);

  // Fallback identity resolution
  const resolvedDisplayName =
    customDisplayName ||
    user?.user_metadata?.full_name ||
    user?.user_metadata?.display_name ||
    user?.email?.split('@')[0] ||
    'Pembelajar Nugget';

  const resolvedAvatar =
    customAvatar ||
    user?.user_metadata?.avatar_url ||
    '🏮'; // Default cultural avatar: Daruma

  // Reset image error state whenever avatar changes
  React.useEffect(() => {
    setImageLoadError(false);
  }, [resolvedAvatar]);

  const isImageAvatar =
    resolvedAvatar.startsWith('http://') ||
    resolvedAvatar.startsWith('https://') ||
    resolvedAvatar.startsWith('data:image/');

  const handleStartEditName = () => {
    setNameInput(resolvedDisplayName);
    setIsEditingName(true);
  };

  const handleSaveName = () => {
    const trimmed = nameInput.trim();
    if (!trimmed) {
      showToast('Nama profil tidak boleh kosong', '⚠️');
      return;
    }
    onSaveDisplayName(trimmed);
    setIsEditingName(false);
    showToast('Nama profil berhasil disimpan!', '✨');
  };

  const handleCancelName = () => {
    setIsEditingName(false);
  };

  const handleSelectPresetAvatar = (avatar: CulturalAvatar) => {
    onSaveAvatar(avatar.icon);
    setIsAvatarPickerOpen(false);
    showToast(`Avatar diubah ke ${avatar.name} ${avatar.icon}`, '🗾');
  };

  const handleSaveCustomUrl = () => {
    const trimmed = customUrlInput.trim();
    if (!trimmed) return;
    onSaveAvatar(trimmed);
    setCustomUrlInput('');
    setIsAvatarPickerOpen(false);
    showToast('Avatar kustom berhasil diterapkan!', '🖼️');
  };

  return (
    <div className="bg-surface border border-accent/25 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm space-y-5 relative overflow-hidden">
      {/* Decorative ambient background blur */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-56 h-56 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Identity Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-accent/15 pb-4">
        <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
          {/* Avatar Tile with Picker Trigger */}
          <div className="relative group shrink-0">
            {isImageAvatar && !imageLoadError ? (
              <img
                src={resolvedAvatar}
                alt="Avatar Pengguna"
                onError={() => {
                  setImageLoadError(true);
                  showToast('Gambar avatar tidak dapat dimuat, menampilkan avatar budaya bawaan', '🏮');
                }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-accent/30 shadow-xs"
              />
            ) : (
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-accent/20 via-surface-2 to-surface-3 border-2 border-accent/30 flex items-center justify-center text-3xl sm:text-4xl shadow-inner select-none"
                title={imageLoadError ? 'Avatar kustom gagal dimuat (fallback budaya bawaan)' : undefined}
              >
                {imageLoadError ? '🏮' : resolvedAvatar}
              </div>
            )}

            {/* Quick Change Avatar Overlay Button (Touch target >= 40px) */}
            <button
              onClick={() => setIsAvatarPickerOpen(!isAvatarPickerOpen)}
              title="Ganti Avatar Khas Jepang"
              aria-label="Pilih Avatar Khas Jepang"
              className="absolute -bottom-1 -right-1 min-w-[40px] min-h-[40px] p-2 rounded-xl bg-accent text-bg shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Palette className="w-4 h-4" />
            </button>
          </div>

          {/* User Display Name & Account Status */}
          <div className="min-w-0 flex-1">
            {isEditingName ? (
              <div className="flex items-center gap-2 w-full max-w-sm">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveName();
                    if (e.key === 'Escape') handleCancelName();
                  }}
                  autoFocus
                  maxLength={40}
                  placeholder="Ketik nama profil..."
                  className="flex-1 min-w-0 px-3 py-1.5 text-sm sm:text-base font-bold bg-surface-2 border border-accent rounded-xl text-appText-bright focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <button
                  onClick={handleSaveName}
                  title="Simpan Nama"
                  aria-label="Simpan Nama"
                  className="min-w-[40px] min-h-[40px] p-2 rounded-xl bg-accent text-bg hover:opacity-90 active:scale-95 transition-all flex items-center justify-center shrink-0"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCancelName}
                  title="Batal"
                  aria-label="Batal Ubah Nama"
                  className="min-w-[40px] min-h-[40px] p-2 rounded-xl bg-surface-3 text-appText-muted hover:text-appText-bright active:scale-95 transition-all flex items-center justify-center shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 flex-wrap min-w-0">
                <h2
                  className="text-lg sm:text-xl font-extrabold text-appText-bright truncate max-w-[180px] xs:max-w-[220px] sm:max-w-xs"
                  title={resolvedDisplayName}
                >
                  {resolvedDisplayName}
                </h2>
                <button
                  onClick={handleStartEditName}
                  title="Ubah Nama Profil"
                  aria-label="Ubah Nama Profil"
                  className="min-w-[40px] min-h-[40px] p-2 rounded-xl text-appText-muted hover:text-accent hover:bg-accent/10 active:scale-95 transition-all flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-accent/15 text-accent font-bold border border-accent/25">
                  Lv. {levelInfo.level}
                </span>
              </div>
            )}

            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <p className="text-xs text-appText-muted truncate max-w-full">
                {user?.email || 'Akun Tamu Lokal (Tersimpan di Perangkat)'}
              </p>
              <button
                onClick={() => setIsAvatarPickerOpen(!isAvatarPickerOpen)}
                className="text-xs font-semibold text-accent hover:underline flex items-center gap-1.5 min-h-[40px] py-1"
              >
                {isAvatarPickerOpen ? 'Tutup Galeri Avatar' : 'Ubah Avatar Budaya Jepang'}
                {isAvatarPickerOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Sync Status Pill */}
        <div className="self-start sm:self-auto shrink-0">
          <SyncStatusPill />
        </div>
      </div>

      {/* Japanese Avatar Picker Drawer */}
      {isAvatarPickerOpen && (
        <div className="p-4 sm:p-5 rounded-2xl bg-surface-2/80 border border-accent/20 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-appText-bright flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent" />
                Galeri Avatar Budaya Jepang (文化アバター)
              </h3>
              <p className="text-xs text-appText-muted mt-0.5">
                Pilih simbol keberuntungan atau karakter khas Jepang sebagai cerminan semangat belajarmu.
              </p>
            </div>
            <button
              onClick={() => setIsAvatarPickerOpen(false)}
              className="p-1.5 rounded-lg text-appText-muted hover:text-appText-bright hover:bg-surface-3 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 9 Cultural Avatar Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
            {CULTURAL_AVATARS.map((item) => {
              const isSelected = resolvedAvatar === item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectPresetAvatar(item)}
                  className={`p-3 card-interactive-lift rounded-xl border text-left transition-all active:scale-95 flex items-start gap-2.5 min-h-[52px] ${
                    isSelected
                      ? 'bg-accent/15 border-accent shadow-xs'
                      : 'bg-surface/70 border-accent/15 hover:border-accent/40 hover:bg-surface'
                  }`}
                >
                  <span className="text-2xl sm:text-3xl shrink-0 select-none mt-0.5">{item.icon}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className={`text-xs sm:text-sm font-bold truncate ${isSelected ? 'text-accent' : 'text-appText-bright'}`}>
                        {item.name}
                      </span>
                      {isSelected && <span className="text-xs text-accent font-bold">✓</span>}
                    </div>
                    <p className="text-xs text-appText-muted truncate font-serif">{item.nameJp}</p>
                    <p className="text-xs text-appText-muted line-clamp-1 mt-0.5 opacity-80">{item.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Custom Avatar Input */}
          <div className="pt-2 border-t border-accent/15">
            <label className="text-xs font-semibold text-appText-muted flex items-center gap-1.5 mb-2">
              <ImageIcon className="w-3.5 h-3.5 text-accent" />
              Gunakan Emoji atau URL Gambar Kustom
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={customUrlInput}
                onChange={(e) => setCustomUrlInput(e.target.value)}
                placeholder="Tempel URL gambar (https://...) atau emoji (misal: 🌸)"
                className="flex-1 min-w-0 px-3 py-2 text-xs sm:text-sm bg-surface border border-accent/20 rounded-xl text-appText-bright focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                onClick={handleSaveCustomUrl}
                disabled={!customUrlInput.trim()}
                className="px-4 py-2 rounded-xl bg-accent text-bg text-xs font-bold disabled:opacity-40 hover:opacity-90 active:scale-95 transition-all shrink-0"
              >
                Terapkan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Prominent Gelar Kemahiran & Level Progress Banner */}
      <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-surface-2/60 border border-accent/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5 min-w-0">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-accent shrink-0" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-appText-muted">
              Gelar Kemahiran Pembelajar
            </span>
          </div>
          <div className="text-base sm:text-lg font-extrabold text-appText-bright tracking-tight flex items-center gap-2 flex-wrap">
            <span>{levelInfo.title}</span>
            {levelInfo.titleJp && (
              <span className="text-xs sm:text-sm font-serif font-normal text-accent bg-accent/10 px-2 py-0.5 rounded-lg border border-accent/20">
                {levelInfo.titleJp}
              </span>
            )}
          </div>
          <p className="text-xs text-appText-muted">
            Total Pengalaman Akumulatif: <strong className="text-appText-bright font-mono">{xp} XP</strong>
          </p>
        </div>

        {/* Next Level Progression Bar */}
        <div className="w-full sm:w-64 space-y-1.5 shrink-0">
          <div className="flex items-center justify-between text-xs text-appText-muted font-mono">
            <span>Progress Level {levelInfo.level + 1}</span>
            <span className="font-bold text-accent">{nextLevelProgress.percent}%</span>
          </div>
          <div className="w-full bg-surface-3 h-2 rounded-full overflow-hidden">
            <div
              className="bg-accent h-full rounded-full transition-all duration-500"
              style={{ width: `${nextLevelProgress.percent}%` }}
            />
          </div>
          <div className="text-xs text-appText-muted font-mono flex items-center justify-between">
            <span>{nextLevelProgress.currentLevelXp} XP</span>
            <span>{nextLevelProgress.nextLevelXp} XP</span>
          </div>
        </div>
      </div>
    </div>
  );
};
