// ══════════════════════════════════════════════════════════════════
//  Nugget Nihongo — Centralized Application Version Config
//  Single source of truth across React SPA, Service Worker, and PWA
// ══════════════════════════════════════════════════════════════════

export const APP_VERSION = 'v19.3.3';
export const APP_VERSION_NUMBER = '19.3.3';
export const APP_RELEASE_NAME = 'Homepage 4-Tier Navigation, 3D Kana Flipcards, Kanji Stroke Physics & Zero-Clipping Modal Portals';
export const APP_BUILD_DATE = '2026-10-16';

export const APP_CHANGELOG_HIGHLIGHTS = [
  'Navigasi Beranda Terstruktur (4 Domain Belajar): Menghapus tab tumpang tindih "8 Jalur & SSW" dan "Level JLPT", digantikan 4 domain mandiri: Tata Bahasa (N5–N1), Kosakata & Kanji (N5–N1), Vokasional SSW (Kaigo, Gaishoku, Kensetsu), dan Statistik & Pencapaian.',
  'Flashcard Huruf Kana 3D Interaktif: Kartu Hiragana dan Katakana kini dapat dibalik 3D secara mulus dengan tombol pelafalan audio TTS mandiri untuk karakter utama dan kosakata contoh.',
  'Panduan Pembacaan Lengkap pada Contoh Kosakata: Seluruh contoh kata kana kini menampilkan kanji yang langsung didampingi pembacaan furigana dalam tanda kurung 【...】 (contoh: 朝【あさ】 (Pagi)), mencegah kebingungan pembelajar pemula.',
  'Fisika Goresan Kaligrafi Presisi Zero-Glitch: Animasi goresan kanji kini tuntas sampai goresan pamungkas dengan keyframe remount dinamis, goresan pendek titik terlindungi dari artefak berkedip, serta contoh kosakata terstruktur per bacaan Onyomi/Kunyomi.',
  'Latar Belakang Modal Gelap Penuh (Zero-Clipping): Seluruh modal dan drawer dimount ke document.body via React Portal sehingga latar gelap memayungi 100% layar tanpa celah terang di bawah navbar atau status bar ponsel.',
];
