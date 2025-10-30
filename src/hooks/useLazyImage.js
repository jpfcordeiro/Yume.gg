import { useEffect, useRef, useState } from 'react';

/**
 * useLazyImage Hook
 * Implementa lazy loading de imagens com Intersection Observer
 */
export const useLazyImage = (initialSrc = null, threshold = 0.1) => {
  const imageRef = useRef(null);
  const [src, setSrc] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (initialSrc) {
            setSrc(initialSrc);
          }
          // Parar de observar após a imagem ficar visível
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, [initialSrc, threshold]);

  return {
    imageRef,
    src,
    isVisible,
    setSrc
  };
};

export default useLazyImage;
