import React, { useState, useRef, useEffect } from 'react';

interface ProductImageProps {
  src?: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  className = '',
  fallbackSrc = '/figmaAssets/frame-176.svg',
  onLoad,
  onError,
}) => {
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setCurrentSrc(src);
    setIsLoading(true);
    setHasError(false);
  }, [src]);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    if (currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    }
    onError?.();
  };

  const handleRetry = () => {
    if (src && src !== currentSrc) {
      setCurrentSrc(src);
      setIsLoading(true);
      setHasError(false);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
          <div className="text-gray-400 text-sm">Loading...</div>
        </div>
      )}
      
      <img
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
      />
      
      {hasError && currentSrc === fallbackSrc && (
        <div className="absolute inset-0 bg-gray-100 flex flex-col items-center justify-center text-gray-500 text-sm">
          <div className="mb-2">Image unavailable</div>
          {src && src !== fallbackSrc && (
            <button
              onClick={handleRetry}
              className="text-blue-500 hover:text-blue-700 underline text-xs"
            >
              Retry
            </button>
          )}
        </div>
      )}
    </div>
  );
};