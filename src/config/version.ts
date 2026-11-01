// ══════════════════════════════════════════════════════════════════
//  Nugget Nihongo — Centralized Application Version Config
//  Single source of truth across React SPA, Service Worker, and PWA
// ══════════════════════════════════════════════════════════════════

export const APP_VERSION = 'v21.0.0';
export const APP_VERSION_NUMBER = '21.0.0';
export const APP_RELEASE_NAME = '5-Pass Enterprise Architecture Overhaul: Design Tokens, Modal Lifecycle, Sensei AI W3C Ruby, BYOK Security & Performance Budget';
export const APP_BUILD_DATE = '2026-11-01';

export const APP_CHANGELOG_HIGHLIGHTS = [
  '5-Pass Enterprise Architecture Overhaul (v21.0.0): Tuntas mengeksekusi 5 tahap audit forensik arsitektural (Token Desain, Navigasi & Kuis, Siklus Hidup Modal, Sensei W3C Ruby & Keamanan Proxy, serta Anggaran Kinerja 500 kB).',
  'Pembersihan Token Desain & Kontras WCAG 2.1 AA: Eliminasi seluruh kode warna hex manual tak standar digantikan semantic design tokens (bg-surface, text-appText, border-accent) dengan mode kontras tinggi sempurna.',
  'Konsolidasi Modal Global (Single Source of Truth): Sentralisasi 18 modal ke GlobalModalManager dan useModalStore, membasmi duplikasi mount pada App.tsx dan mencegah scroll bleed.',
  'Sensei AI W3C Semantic Ruby & Proksi Aman: Standardisasi tag <ruby><rt><rp> furigana bebas pergeseran tata letak, perutean AI via Cloudflare Worker serverless /api/chat, dan dukungan Bring-Your-Own-Key (BYOK).',
  'Modularisasi Pengaturan & Skala Rem Non-Destruktif: Dekonstruksi SettingsPage 1.788 baris menjadi 4 modul domain independen dengan penyesuaian font rem murni ramah aksesibilitas.',
  'Anggaran Kinerja 500 kB & Streaming iOS Safari: Pemisahan manualChunks Rollup (app-infra), lolos 100% verifikasi batas 500 kB (52 dari 52 berkas), dan penanganan byte-range RFC 7233 di Service Worker.',
];
