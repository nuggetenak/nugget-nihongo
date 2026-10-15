import React from 'react';

interface JapaneseFormattedTextProps {
  text: string;
  className?: string;
  highlightClass?: string;
}

/**
 * JapaneseFormattedText
 * Safely parses raw string with embedded `<b>` and `</b>` tags into React elements
 * with golden amber accent highlight, avoiding raw HTML leaks like `<b>` showing up in text.
 */
export const JapaneseFormattedText: React.FC<JapaneseFormattedTextProps> = ({
  text,
  className = '',
  highlightClass = 'font-bold text-accent-hot dark:text-accent',
}) => {
  if (!text) return null;

  // If no <b> tags, render as plain text
  if (!text.includes('<b>')) {
    return <span className={className}>{text}</span>;
  }

  // Split by <b> and </b> tags
  const parts = text.split(/(<\/?b>)/g);
  let isBold = false;

  return (
    <span className={className}>
      {parts.map((part, idx) => {
        if (part === '<b>') {
          isBold = true;
          return null;
        }
        if (part === '</b>') {
          isBold = false;
          return null;
        }
        if (isBold) {
          return (
            <span key={idx} className={highlightClass}>
              {part}
            </span>
          );
        }
        return <React.Fragment key={idx}>{part}</React.Fragment>;
      })}
    </span>
  );
};
