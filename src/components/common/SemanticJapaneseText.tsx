// ══════════════════════════════════════════════════════════════════
//  SemanticJapaneseText.tsx — High-Precision Japanese Typography Wrapper
//  Powered by Google BudouX phrase segmentation
//  Eliminates awkward kanji compound mid-word line breaks on mobile viewports
//  Complies with Universal Mobile Responsive Rule §6
// ══════════════════════════════════════════════════════════════════

import React from 'react';
import { parseBunsetsu } from '../../lib/typography/budouxParser';

export interface SemanticJapaneseTextProps {
  text: string;
  className?: string;
  as?: 'span' | 'p' | 'div' | 'h1' | 'h2' | 'h3' | 'h4';
  title?: string;
}

export const SemanticJapaneseText: React.FC<SemanticJapaneseTextProps> = ({
  text,
  className = '',
  as: Component = 'span',
  title,
}) => {
  if (!text) return null;

  const chunks = parseBunsetsu(text);

  if (chunks.length <= 1) {
    return (
      <Component
        title={title}
        className={`inline-block [word-break:keep-all] [overflow-wrap:anywhere] font-japanese ${className}`}
      >
        {text}
      </Component>
    );
  }

  return (
    <Component
      title={title}
      className={`inline-block [word-break:keep-all] [overflow-wrap:anywhere] font-japanese ${className}`}
    >
      {chunks.map((chunk, idx) => (
        <React.Fragment key={idx}>
          <span className="inline-block">{chunk}</span>
          {idx < chunks.length - 1 && <wbr />}
        </React.Fragment>
      ))}
    </Component>
  );
};
