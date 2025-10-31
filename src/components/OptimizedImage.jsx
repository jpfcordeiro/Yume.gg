import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * OptimizedImage Component
 * Oferece loading lazy, skeleton loading, error handling e acessibilidade
 */
export const OptimizedImage = ({
  src,
  alt,
  className = '',
  placeholderColor = 'var(--deep-void)',
  onLoad,
  onError,
  width,
  height,
  objectFit = 'cover'
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  return (
    <div
      className="optimized-image-wrapper"
      style={{
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : 'auto',
        aspectRatio: width && height ? `${width} / ${height}` : 'auto',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '8px',
        backgroundColor: placeholderColor
      }}
    >
      {/* Skeleton Loading */}
      {isLoading && !hasError && (
        <motion.div
          className="image-skeleton"
            style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
              background: `linear-gradient(90deg, ${placeholderColor} 0%, rgba(var(--deep-void-rgb), 0.6) 50%, ${placeholderColor} 100%)`,
            backgroundSize: '200% 100%',
            zIndex: 1
          }}
          animate={{
            backgroundPosition: ['200% 0', '-200% 0']
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      )}

      {/* Imagem Real */}
      {!hasError && (
        <img
          src={src}
          alt={alt}
          className={className}
          loading="lazy"
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          style={{
            width: '100%',
            height: '100%',
            objectFit,
            objectPosition: 'center',
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out',
            display: 'block'
          }}
        />
      )}

      {/* Error State */}
      {hasError && (
        <div
          className="image-error"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            background: 'rgba(var(--neon-pink-rgb), 0.1)',
            border: '2px dashed rgba(var(--neon-pink-rgb), 0.5)',
            borderRadius: '8px',
            color: 'rgba(var(--ghost-white-rgb), 0.7)',
            fontSize: '0.9rem',
            padding: '1rem',
            textAlign: 'center',
            flexDirection: 'column',
            gap: '0.5rem'
          }}
        >
          <span style={{ fontSize: '2rem' }}>⚠️</span>
          <span>Imagem não pôde ser carregada</span>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
