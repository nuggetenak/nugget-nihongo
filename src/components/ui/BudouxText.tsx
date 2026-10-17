// ══════════════════════════════════════════════════════════════════
//  BudouxText.tsx — Semantic Line-Breaking Japanese Typography Component
//  Powered by Google BudouX phrase segmentation
//  Eliminates awkward kanji compound mid-word line breaks on mobile viewports
// ══════════════════════════════════════════════════════════════════

import React from 'react';
import { segmentBunsetsu } from '../../lib/japanese/budouxSegmenter';

interface BudouxTextProps {
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
    return <Component className={className}>{text}</Component>;
  }

  return (
    <Component className={`word-break-keep-all ${className}`}>
      {chunks.map((chunk, idx) => (
        <React.Fragment key={idx}>
          <span className="inline-block">{chunk}</span>
          {idx < chunks.length - 1 && <wbr />}
        </React.Fragment>
      ))}
    </Component>
  );
};
