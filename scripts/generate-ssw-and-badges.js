// ══════════════════════════════════════════════════════════════════
//  generate-ssw-and-badges.js — 18 SSW Insignias & 14 Tiered Medallions
//  Creates scalable vector SVG assets for vocational tracks & gamification
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const SSW_ICONS_DIR = path.join(ROOT_DIR, 'public/icons/ssw');
const BADGES_DIR = path.join(ROOT_DIR, 'public/assets/badges');

if (!fs.existsSync(SSW_ICONS_DIR)) fs.mkdirSync(SSW_ICONS_DIR, { recursive: true });
if (!fs.existsSync(BADGES_DIR)) fs.mkdirSync(BADGES_DIR, { recursive: true });

// ── 1. 18 SSW SECTOR INSIGNIAS ────────────────────────────────────
const SSW_SECTORS = [
  { id: 'kaigo', kanji: '護', label: 'Kaigo', color: '#ec4899', grad: ['#f43f5e', '#be185d'], iconPath: 'M32 18 C24 10, 10 20, 18 34 L32 48 L46 34 C54 20, 40 10, 32 18 Z' },
  { id: 'building-cleaning', kanji: '清', label: 'Cleaning', color: '#06b6d4', grad: ['#06b6d4', '#0e7490'], iconPath: 'M24 16 L40 16 L44 32 L20 32 Z M28 32 L28 50 M36 32 L36 50' },
  { id: 'construction', kanji: '建', label: 'Construction', color: '#f59e0b', grad: ['#f59e0b', '#b45309'], iconPath: 'M20 44 L44 44 L42 28 C42 20, 22 20, 22 28 Z M22 44 L16 48 L48 48 L42 44' },
  { id: 'food-service', kanji: '食', label: 'Food Service', color: '#f97316', grad: ['#fb923c', '#c2410c'], iconPath: 'M22 14 L22 28 C22 32, 28 34, 30 34 L30 50 M38 14 L42 22 L38 50' },
  { id: 'food-manufacturing', kanji: '製', label: 'Food Mfg', color: '#eab308', grad: ['#fde047', '#a16207'], iconPath: 'M18 20 L46 20 L46 46 L18 46 Z M26 20 L26 46 M38 20 L38 46' },
  { id: 'agriculture', kanji: '農', label: 'Agriculture', color: '#22c55e', grad: ['#4ade80', '#15803d'], iconPath: 'M32 48 L32 24 C32 16, 20 18, 20 28 C20 36, 32 42, 32 48 Z M32 30 C38 22, 46 26, 44 34 C42 40, 32 44, 32 48' },
  { id: 'fishery', kanji: '漁', label: 'Fishery', color: '#0ea5e9', grad: ['#38bdf8', '#0369a1'], iconPath: 'M16 32 C26 20, 42 24, 48 32 C42 40, 26 44, 16 32 Z M48 32 L54 26 M48 32 L54 38' },
  { id: 'automobile', kanji: '車', label: 'Automobile', color: '#ef4444', grad: ['#f87171', '#b91c1c'], iconPath: 'M18 36 C18 26, 24 22, 32 22 C40 22, 46 26, 46 36 L18 36 Z M24 38 A4 4 0 1 0 24 46 A4 4 0 1 0 24 38 M40 38 A4 4 0 1 0 40 46 A4 4 0 1 0 40 38' },
  { id: 'aviation', kanji: '空', label: 'Aviation', color: '#6366f1', grad: ['#818cf8', '#4338ca'], iconPath: 'M32 14 L36 28 L52 36 L52 40 L36 36 L36 46 L40 50 L40 52 L32 50 L24 52 L24 50 L28 46 L28 36 L12 40 L12 36 L28 28 Z' },
  { id: 'industrial-machinery', kanji: '機', label: 'Machinery', color: '#64748b', grad: ['#94a3b8', '#334155'], iconPath: 'M32 20 A12 12 0 1 0 32 44 A12 12 0 1 0 32 20 Z M32 26 A6 6 0 1 0 32 38 A6 6 0 1 0 32 26' },
  { id: 'electric-electronics', kanji: '電', label: 'Electronics', color: '#a855f7', grad: ['#c084fc', '#7e22ce'], iconPath: 'M34 14 L20 32 L30 32 L26 50 L44 28 L32 28 Z' },
  { id: 'shipbuilding', kanji: '造', label: 'Shipbuilding', color: '#14b8a6', grad: ['#2dd4bf', '#0f766e'], iconPath: 'M32 16 L32 44 M20 28 C20 42, 44 42, 44 28 M26 22 L38 22' },
  { id: 'hospitality', kanji: '宿', label: 'Hospitality', color: '#f43f5e', grad: ['#fb7185', '#be123c'], iconPath: 'M18 46 L18 24 L32 16 L46 24 L46 46 Z M28 46 L28 36 L36 36 L36 46' },
  { id: 'logistics', kanji: '運', label: 'Logistics', color: '#3b82f6', grad: ['#60a5fa', '#1d4ed8'], iconPath: 'M16 22 L38 22 L38 42 L16 42 Z M38 28 L46 32 L46 42 L38 42 Z M24 44 A4 4 0 1 0 24 50 M42 44 A4 4 0 1 0 42 50' },
  { id: 'railway', kanji: '鉄', label: 'Railway', color: '#10b981', grad: ['#34d399', '#047857'], iconPath: 'M22 18 L42 18 L42 40 L22 40 Z M26 44 L18 52 M38 44 L46 52 M22 36 L42 36' },
  { id: 'forestry', kanji: '林', label: 'Forestry', color: '#15803d', grad: ['#22c55e', '#14532d'], iconPath: 'M32 14 L44 32 L36 32 L46 46 L18 46 L28 32 L20 32 Z M30 46 L30 52 L34 52 L34 46' },
  { id: 'timber', kanji: '木', label: 'Timber', color: '#d97706', grad: ['#f59e0b', '#78350f'], iconPath: 'M18 24 C18 18, 24 18, 24 24 L24 44 C24 50, 18 50, 18 44 Z M24 20 L44 20 C50 20, 50 44, 44 44 L24 44' },
  { id: 'manufacturing', kanji: '素', label: 'Sokeizai', color: '#8b5cf6', grad: ['#a78bfa', '#5b21b6'], iconPath: 'M20 20 L44 20 L40 44 L24 44 Z M28 20 L28 44 M36 20 L36 44' }
];

function generateSswInsignias() {
  console.log(`🛡️ Generating ${SSW_SECTORS.length} SSW Sector Vector Insignias...`);
  for (const s of SSW_SECTORS) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="grad_${s.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${s.grad[0]}" />
      <stop offset="100%" stop-color="${s.grad[1]}" />
    </linearGradient>
    <filter id="shadow_${s.id}" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.5"/>
    </filter>
  </defs>
  <rect width="64" height="64" rx="16" fill="#171410" stroke="${s.color}" stroke-opacity="0.3" stroke-width="1.5" />
  <circle cx="32" cy="32" r="24" fill="url(#grad_${s.id})" opacity="0.15" />
  <path d="${s.iconPath}" fill="none" stroke="url(#grad_${s.id})" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#shadow_${s.id})" />
  <circle cx="50" cy="14" r="9" fill="#0D0B08" stroke="${s.color}" stroke-width="1.2" />
  <text x="50" y="17.5" font-family="'Noto Sans JP', sans-serif" font-size="10" font-weight="900" fill="#fff" text-anchor="middle">${s.kanji}</text>
</svg>`;
    fs.writeFileSync(path.join(SSW_ICONS_DIR, `${s.id}.svg`), svg, 'utf8');
  }
  console.log(`  ✓ Successfully generated ${SSW_SECTORS.length} SSW SVG insignias in public/icons/ssw/`);
}

// ── 2. 14+ TIERED GAMIFICATION MEDALLIONS ────────────────────────
const BADGES = [
  { id: 'vocab-10', tier: 'bronze', title: 'First Words', symbol: '🌱', fill: '#cd7f32' },
  { id: 'vocab-100', tier: 'silver', title: 'Word Collector', symbol: '📚', fill: '#c0c0c0' },
  { id: 'vocab-500', tier: 'gold', title: 'Vocabulary Warrior', symbol: '⚔️', fill: '#ffd700' },
  { id: 'vocab-1000', tier: 'platinum', title: 'Lexicon Master', symbol: '👑', fill: '#e5e4e2' },
  { id: 'grammar-10', tier: 'bronze', title: 'Grammar Beginner', symbol: '🔤', fill: '#cd7f32' },
  { id: 'grammar-50', tier: 'silver', title: 'Pattern Spotter', symbol: '🔍', fill: '#c0c0c0' },
  { id: 'grammar-100', tier: 'gold', title: 'Bunpou Architect', symbol: '🏛️', fill: '#ffd700' },
  { id: 'streak-3', tier: 'bronze', title: 'Awal Baik', symbol: '🔥', fill: '#cd7f32' },
  { id: 'streak-7', tier: 'silver', title: 'Satu Pekan', symbol: '⚡', fill: '#c0c0c0' },
  { id: 'streak-30', tier: 'gold', title: 'Satu Bulan', symbol: '🏆', fill: '#ffd700' },
  { id: 'quiz-first', tier: 'bronze', title: 'Langkah Pertama', symbol: '🎯', fill: '#cd7f32' },
  { id: 'quiz-perfect', tier: 'gold', title: 'Sempurna', symbol: '💯', fill: '#ffd700' },
  { id: 'night-owl', tier: 'silver', title: 'Night Owl', symbol: '🦉', fill: '#818cf8' },
  { id: 'early-bird', tier: 'gold', title: 'Early Bird', symbol: '🌅', fill: '#f59e0b' }
];

function generateBadges() {
  console.log(`🎖️ Generating ${BADGES.length} Gamification Medallions in public/assets/badges/...`);
  for (const b of BADGES) {
    const rimColor = b.tier === 'gold' ? '#F59E0B' : b.tier === 'silver' ? '#94A3B8' : b.tier === 'platinum' ? '#E2E8F0' : '#B45309';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
  <defs>
    <radialGradient id="rim_${b.id}" cx="40%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#fff" stop-opacity="0.5" />
      <stop offset="40%" stop-color="${rimColor}" />
      <stop offset="100%" stop-color="#1c1917" />
    </radialGradient>
    <filter id="badgeShadow_${b.id}">
      <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#000" flood-opacity="0.6"/>
    </filter>
  </defs>
  <!-- Outer Medallion Disc -->
  <circle cx="40" cy="40" r="36" fill="url(#rim_${b.id})" stroke="${rimColor}" stroke-width="2" filter="url(#badgeShadow_${b.id})" />
  <!-- Inner Ring -->
  <circle cx="40" cy="40" r="28" fill="#171410" stroke="${rimColor}" stroke-width="1.5" stroke-dasharray="3 2" />
  <!-- Center Emblem -->
  <text x="40" y="47" font-size="24" text-anchor="middle" dominant-baseline="central">${b.symbol}</text>
  <!-- Stars Accent -->
  <circle cx="40" cy="16" r="2" fill="${rimColor}" />
  <circle cx="40" cy="64" r="2" fill="${rimColor}" />
</svg>`;
    fs.writeFileSync(path.join(BADGES_DIR, `${b.id}.svg`), svg, 'utf8');
  }
  console.log(`  ✓ Successfully generated ${BADGES.length} Medallion SVGs in public/assets/badges/`);
}

function main() {
  console.log('🚀 INITIALIZING SPRINT 25 SSW INSIGNIAS & GAMIFICATION BADGES...\n');
  generateSswInsignias();
  generateBadges();
  console.log('\n🎉 ASSET GENERATION FINISHED WITH 100% SUCCESS!');
}

main();
