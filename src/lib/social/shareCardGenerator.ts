// ══════════════════════════════════════════════════════════════════
//  shareCardGenerator.ts — Shareable Kanji Study & Mastery Card Engine
//  Renders high-res 1080x1080 social media cards on HTML5 Canvas
//  Features: calligraphy render, accuracy badge, Goukaku Hanko seal,
//  and Web Share API / PNG download fallback for Indonesian learners
// ══════════════════════════════════════════════════════════════════

export interface KanjiCardOptions {
  character: string;
  meaning: string;
  score: number;
  jlptLevel?: string;
  strokesCount?: number;
  theme?: 'dark' | 'light';
  width?: number;
  height?: number;
}

export interface GeneratedCardResult {
  dataUrl: string;
  blob?: Blob;
  width: number;
  height: number;
}

/**
 * Generates standard share text for Indonesian learners
 */
export function getKanjiShareText(character: string, meaning: string, score: number): string {
  const safeChar = character || '字';
  const safeMeaning = meaning || 'Kanji Mastery';
  const safeScore = Math.max(0, Math.min(100, Math.round(Number(score) || 100)));
  return `Saya menyelesaikan latihan kanji "${safeChar}" (${safeMeaning}) dengan skor akurasi ${safeScore}% di Nugget Nihongo! 🎌✨ #NuggetNihongo`;
}

/**
 * Generates an SVG markup representation of the 1080x1080 Mastery Card
 * Ideal for headless SSR, server-side previews, and test environments
 */
export function generateKanjiMasterySvg(options: KanjiCardOptions): string {
  const {
    character = '字',
    meaning = 'Kanji Mastery',
    score = 100,
    jlptLevel = 'N5',
    strokesCount = 4,
    theme = 'dark',
    width = 1080,
    height = 1080,
  } = options;

  const safeChar = character || '字';
  const safeMeaning = meaning || 'Kanji Mastery';
  const safeScore = Math.max(0, Math.min(100, Math.round(Number(score) || 100)));
  const safeLevel = (jlptLevel || 'N5').toUpperCase();
  const safeStrokes = Math.max(1, strokesCount || 1);

  const isDark = theme === 'dark';
  const bgColor = isDark ? '#121110' : '#F7F4EE';
  const cardBgColor = isDark ? '#1A1816' : '#FFFFFF';
  const goldColor = '#F59E0B';
  const primaryTextColor = isDark ? '#FDFBF7' : '#1A1816';
  const mutedTextColor = isDark ? '#A8A29E' : '#78716C';
  const sealColor = '#DC2626';

  const pad = 60;
  const cardW = width - pad * 2;
  const cardH = height - pad * 2;
  const boxSize = 420;
  const boxX = (width - boxSize) / 2;
  const boxY = pad + 160;

  const sealSize = 90;
  const sealX = boxX + boxSize - sealSize - 16;
  const sealY = boxY + boxSize - sealSize - 16;
  const scoreBadgeY = boxY + boxSize + 60;
  const metaY = scoreBadgeY + 65;
  const footerY = pad + cardH - 55;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="${width}" height="${height}" fill="${bgColor}"/>
    <rect x="${pad}" y="${pad}" width="${cardW}" height="${cardH}" rx="36" fill="${cardBgColor}" stroke="${goldColor}" stroke-width="4"/>
    <text x="${width / 2}" y="${pad + 60}" text-anchor="middle" dominant-baseline="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" font-size="32" fill="${goldColor}">NUGGET NIHONGO</text>
    <text x="${width / 2}" y="${pad + 105}" text-anchor="middle" dominant-baseline="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="500" font-size="24" fill="${mutedTextColor}">Latihan Menulis Kanji &amp; Verifikasi Goresan</text>
    <rect x="${boxX}" y="${boxY}" width="${boxSize}" height="${boxSize}" fill="${isDark ? '#141312' : '#FAFAF9'}" stroke="${isDark ? 'rgba(245, 158, 11, 0.3)' : 'rgba(217, 119, 6, 0.3)'}" stroke-width="3"/>
    <line x1="${boxX}" y1="${boxY + boxSize / 2}" x2="${boxX + boxSize}" y2="${boxY + boxSize / 2}" stroke="${isDark ? 'rgba(245, 158, 11, 0.2)' : 'rgba(217, 119, 6, 0.2)'}" stroke-width="1.5" stroke-dasharray="8,8"/>
    <line x1="${boxX + boxSize / 2}" y1="${boxY}" x2="${boxX + boxSize / 2}" y2="${boxY + boxSize}" stroke="${isDark ? 'rgba(245, 158, 11, 0.2)' : 'rgba(217, 119, 6, 0.2)'}" stroke-width="1.5" stroke-dasharray="8,8"/>
    <text x="${width / 2}" y="${boxY + boxSize / 2 + 15}" text-anchor="middle" dominant-baseline="middle" font-family="'Noto Serif JP', 'Hiragino Mincho ProN', serif" font-weight="900" font-size="${boxSize * 0.72}" fill="${primaryTextColor}">${safeChar}</text>
    <rect x="${sealX}" y="${sealY}" width="${sealSize}" height="${sealSize}" rx="14" fill="none" stroke="${sealColor}" stroke-width="4"/>
    <text x="${sealX + sealSize / 2}" y="${sealY + sealSize / 2}" text-anchor="middle" dominant-baseline="middle" font-family="'Noto Serif JP', serif" font-weight="bold" font-size="30" fill="${sealColor}">合格</text>
    <rect x="${(width - 320) / 2}" y="${scoreBadgeY - 28}" width="320" height="56" rx="28" fill="${isDark ? 'rgba(245, 158, 11, 0.15)' : 'rgba(245, 158, 11, 0.2)'}" stroke="${goldColor}" stroke-width="2"/>
    <text x="${width / 2}" y="${scoreBadgeY}" text-anchor="middle" dominant-baseline="middle" font-family="system-ui, sans-serif" font-weight="bold" font-size="26" fill="${goldColor}">★ ${safeScore}% Akurasi Goresan</text>
    <text x="${width / 2}" y="${metaY}" text-anchor="middle" dominant-baseline="middle" font-family="system-ui, sans-serif" font-weight="bold" font-size="36" fill="${primaryTextColor}">${safeMeaning}</text>
    <text x="${width / 2}" y="${metaY + 45}" text-anchor="middle" dominant-baseline="middle" font-family="system-ui, sans-serif" font-weight="500" font-size="24" fill="${mutedTextColor}">Level ${safeLevel} · ${safeStrokes} Langkah Goresan</text>
    <text x="${width / 2}" y="${footerY}" text-anchor="middle" dominant-baseline="middle" font-family="system-ui, sans-serif" font-weight="bold" font-size="22" fill="${mutedTextColor}">🎌 Belajar Bahasa Jepang di nuggetnihongo.com · 𝕏 @NuggetNihongo</text>
  </svg>`;
}

/**
 * Generates an elegant 1080x1080 image card for social sharing
 */
export async function generateKanjiMasteryCard(
  options: KanjiCardOptions
): Promise<GeneratedCardResult> {
  const {
    character = '字',
    meaning = 'Kanji Mastery',
    score = 100,
    jlptLevel = 'N5',
    strokesCount = 4,
    theme = 'dark',
    width = 1080,
    height = 1080,
  } = options;

  const safeChar = character || '字';
  const safeMeaning = meaning || 'Kanji Mastery';
  const safeScore = Math.max(0, Math.min(100, Math.round(Number(score) || 100)));
  const safeLevel = (jlptLevel || 'N5').toUpperCase();
  const safeStrokes = Math.max(1, strokesCount || 1);

  // Headless / SSR Fallback
  if (typeof document === 'undefined') {
    const svg = generateKanjiMasterySvg(options);
    return {
      dataUrl: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`,
      width,
      height,
    };
  }

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Canvas 2D context not available');
  }

  const isDark = theme === 'dark';
  const bgColor = isDark ? '#121110' : '#F7F4EE';
  const cardBgColor = isDark ? '#1A1816' : '#FFFFFF';
  const goldColor = '#F59E0B';
  const primaryTextColor = isDark ? '#FDFBF7' : '#1A1816';
  const mutedTextColor = isDark ? '#A8A29E' : '#78716C';
  const sealColor = '#DC2626';

  // 1. Outer Background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  // 2. Inner Frame / Card Container
  const pad = 60;
  const cardW = width - pad * 2;
  const cardH = height - pad * 2;
  const radius = 36;

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(pad, pad, cardW, cardH, radius);
  ctx.fillStyle = cardBgColor;
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = goldColor;
  ctx.stroke();
  ctx.restore();

  // 3. Header Branding
  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = 'bold 32px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = goldColor;
  ctx.fillText('NUGGET NIHONGO', width / 2, pad + 60);

  ctx.font = '500 24px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = mutedTextColor;
  ctx.fillText('Latihan Menulis Kanji & Verifikasi Goresan', width / 2, pad + 105);
  ctx.restore();

  // 4. Kanji Grid Box (Traditional Shuji 4-quadrant guidelines)
  const boxSize = 420;
  const boxX = (width - boxSize) / 2;
  const boxY = pad + 160;

  ctx.save();
  ctx.fillStyle = isDark ? '#141312' : '#FAFAF9';
  ctx.fillRect(boxX, boxY, boxSize, boxSize);
  ctx.strokeStyle = isDark ? 'rgba(245, 158, 11, 0.3)' : 'rgba(217, 119, 6, 0.3)';
  ctx.lineWidth = 3;
  ctx.strokeRect(boxX, boxY, boxSize, boxSize);

  // Dashed crosshairs (quadrant guidelines)
  ctx.setLineDash([8, 8]);
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = isDark ? 'rgba(245, 158, 11, 0.2)' : 'rgba(217, 119, 6, 0.2)';

  // Horizontal guide
  ctx.beginPath();
  ctx.moveTo(boxX, boxY + boxSize / 2);
  ctx.lineTo(boxX + boxSize, boxY + boxSize / 2);
  ctx.stroke();

  // Vertical guide
  ctx.beginPath();
  ctx.moveTo(boxX + boxSize / 2, boxY);
  ctx.lineTo(boxX + boxSize / 2, boxY + boxSize);
  ctx.stroke();
  ctx.restore();

  // 5. Large Kanji Character Render
  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `900 ${boxSize * 0.72}px "Noto Serif JP", "Hiragino Mincho ProN", serif`;
  ctx.fillStyle = primaryTextColor;
  ctx.fillText(safeChar, width / 2, boxY + boxSize / 2 + 15);
  ctx.restore();

  // 6. Traditional Goukaku / Certified Hanko Seal (Stamp)
  const sealSize = 90;
  const sealX = boxX + boxSize - sealSize - 16;
  const sealY = boxY + boxSize - sealSize - 16;

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(sealX, sealY, sealSize, sealSize, 14);
  ctx.strokeStyle = sealColor;
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = sealColor;
  ctx.font = 'bold 30px "Noto Serif JP", serif';
  ctx.fillText('合格', sealX + sealSize / 2, sealY + sealSize / 2);
  ctx.restore();

  // 7. Accuracy Score & Mastery Badge
  const scoreBadgeY = boxY + boxSize + 60;
  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Badge pill
  const pillW = 320;
  const pillH = 56;
  ctx.beginPath();
  ctx.roundRect((width - pillW) / 2, scoreBadgeY - pillH / 2, pillW, pillH, 28);
  ctx.fillStyle = isDark ? 'rgba(245, 158, 11, 0.15)' : 'rgba(245, 158, 11, 0.2)';
  ctx.fill();
  ctx.strokeStyle = goldColor;
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.font = 'bold 26px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = goldColor;
  ctx.fillText(`★ ${safeScore}% Akurasi Goresan`, width / 2, scoreBadgeY);
  ctx.restore();

  // 8. Meaning & JLPT Metadata
  const metaY = scoreBadgeY + 65;
  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = 'bold 36px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = primaryTextColor;
  ctx.fillText(safeMeaning, width / 2, metaY);

  ctx.font = '500 24px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = mutedTextColor;
  ctx.fillText(`Level ${safeLevel} · ${safeStrokes} Langkah Goresan`, width / 2, metaY + 45);
  ctx.restore();

  // 9. Footer Social Handle & Verification
  const footerY = pad + cardH - 55;
  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = 'bold 22px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = mutedTextColor;
  ctx.fillText('🎌 Belajar Bahasa Jepang di nuggetnihongo.com · 𝕏 @NuggetNihongo', width / 2, footerY);
  ctx.restore();

  const dataUrl = canvas.toDataURL('image/png');
  const blob = await new Promise<Blob | undefined>((resolve) =>
    canvas.toBlob((b) => resolve(b || undefined), 'image/png')
  );

  return {
    dataUrl,
    blob,
    width,
    height,
  };
}

/**
 * Triggers native Web Share API with image file or downloads fallback PNG
 */
export async function shareKanjiCard(options: KanjiCardOptions): Promise<boolean> {
  try {
    const result = await generateKanjiMasteryCard(options);

    if (result.blob && typeof navigator !== 'undefined' && navigator.share) {
      const file = new File(
        [result.blob],
        `nugget-kanji-${options.character}.png`,
        { type: 'image/png' }
      );

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: `Latihan Kanji ${options.character} di Nugget Nihongo`,
          text: getKanjiShareText(options.character, options.meaning, options.score),
          files: [file],
        });
        return true;
      }
    }

    // Fallback: trigger download
    downloadKanjiCard(result.dataUrl, `kanji-${options.character}-mastery.png`);
    return true;
  } catch (err) {
    console.warn('[shareCardGenerator] Share failed, fallback to download:', err);
    try {
      const result = await generateKanjiMasteryCard(options);
      downloadKanjiCard(result.dataUrl, `kanji-${options.character}-mastery.png`);
      return true;
    } catch {
      return false;
    }
  }
}

/**
 * Triggers client-side PNG download
 */
export function downloadKanjiCard(dataUrl: string, filename = 'kanji-mastery.png'): void {
  if (typeof document === 'undefined' || !dataUrl) return;
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
