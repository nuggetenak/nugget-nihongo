// ══════════════════════════════════════════════════════════════════
//  IrasutoyaImage.tsx — Resilient, Offline-Aware Irasutoya Illustration Component
//  Renders authentic Japanese illustrations by Takashi Mifune (irasutoya.com)
//  with graceful offline fallback, skeleton shimmer, and micro-animations.
// ══════════════════════════════════════════════════════════════════

import React, { useState } from 'react';
import { getIrasutoyaAsset } from '../../lib/assets/irasutoyaCatalog';

export interface IrasutoyaImageProps {
  assetId: string;
  alt?: string;
  className?: string;
  containerClassName?: string;
  animateFloat?: boolean;
  animatePop?: boolean;
  fallbackSize?: 'sm' | 'md' | 'lg' | 'xl';
  showAttributionTooltip?: boolean;
}

export const IrasutoyaImage: React.FC<IrasutoyaImageProps> = ({
  assetId,
  alt,
  className = 'w-full h-full object-contain',
  containerClassName = 'relative inline-flex items-center justify-center overflow-hidden',
  animateFloat = false,
  animatePop = false,
  fallbackSize = 'md',
  showAttributionTooltip = false,
}) => {
  const asset = getIrasutoyaAsset(assetId);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const fallbackEmojiSize = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-5xl',
    xl: 'text-7xl',
  }[fallbackSize];

  const animationClass = animateFloat
    ? 'animate-float-gentle'
    : animatePop
    ? 'animate-bounce-pop'
    : '';

  const computedAlt = alt || `${asset.titleId} (${asset.titleJp}) · いらすとや`;

  const imageUrl = asset.localUrl || asset.cdnUrl;

  return (
    <div
      className={`${containerClassName} ${animationClass}`}
      title={showAttributionTooltip ? `${asset.titleJp} (イラスト：いらすとや)` : undefined}
    >
      {!hasError && imageUrl ? (
        <>
          {/* Skeleton shimmer before loaded */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-surface-2/80 animate-shimmer-flow rounded-xl" />
          )}
          <img
            src={imageUrl}
            alt={computedAlt}
            loading="lazy"
            decoding="async"
            crossOrigin={imageUrl.startsWith('http') ? 'anonymous' : undefined}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`${className} transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </>
      ) : (
        /* Graceful Offline & Error Fallback with Styled Wa-Bento Badge */
        <div
          className={`flex items-center justify-center select-none ${fallbackEmojiSize}`}
          role="img"
          aria-label={computedAlt}
        >
          <span>{asset.fallbackEmoji}</span>
        </div>
      )}
    </div>
  );
};

export default IrasutoyaImage;
