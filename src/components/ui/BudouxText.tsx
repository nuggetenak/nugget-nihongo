// ══════════════════════════════════════════════════════════════════
//  BudouxText.tsx — Semantic Line-Breaking Japanese Typography Component
//  Powered by Google BudouX phrase segmentation
//  Eliminates awkward kanji compound mid-word line breaks on mobile viewports
//  Compliant with Universal Multi-Device Responsive Design Rule
// ══════════════════════════════════════════════════════════════════

import React from 'react';
import { segmentBunsetsu } from '../../lib/japanese/budouxSegmenter';

export interface BudouxTextProps {
  text: string;
  className?: string;
  as?: 'span' | 'p' | 'div' | 'h1' | 'h2' | 'h3' | 'h4';
}

export const BudouxText: React.FC<BudouxTextProps> = ({
  text,
  className = '',
  as: Component = 'span',
}) => {
  if (!text) return null;
  const chunks = segmentBunsetsu(text);

  if (chunks.length <= 1) {
    return (
      <Component lang="ja" className={`break-words max-w-full font-japanese ${className}`}>
        {text}
      </Component>
    );
  }

  return (
    <Component lang="ja" className={`break-keep break-words max-w-full font-japanese ${className}`}>
      {chunks.map((chunk, idx) => (
        <React.Fragment key={idx}>
          <span className="inline-block max-w-full">{chunk}</span>
          {idx < chunks.length - 1 && <wbr />}
        </React.Fragment>
      ))}
    </Component>
  );
};

export default BudouxText;
