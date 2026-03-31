import { useEffect, useRef, useState, useCallback } from 'react';
import type { Post } from '../types';
import { buildWhatsAppLink } from '../services/api';
import Button from './Button';

interface ModalProps {
  post: Post | null;
  whatsapp?: string;
  onClose: () => void;
}

export default function Modal({ post, whatsapp, onClose }: ModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  // Reset index when post changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [post]);

  // Block body scroll while open
  useEffect(() => {
    if (!post) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [post]);

  // Close on Escape key
  useEffect(() => {
    if (!post) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [post, onClose]);

  const goNext = useCallback(() => {
    if (!post) return;
    setCurrentIndex((i) => (i + 1) % post.images.length);
  }, [post]);

  const goPrev = useCallback(() => {
    if (!post) return;
    setCurrentIndex((i) => (i - 1 + post.images.length) % post.images.length);
  }, [post]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      delta < 0 ? goNext() : goPrev();
    }
    touchStartX.current = null;
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backdropRef.current) onClose();
  };

  if (!post) return null;

  const currentImage = post.images[currentIndex];
  const whatsappLink = whatsapp
    ? buildWhatsAppLink(whatsapp, `Hola, me interesa este postre: ${post.description}`)
    : undefined;

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-3 right-3 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-black/40 text-white hover:bg-black/60 transition duration-300"
        >
          ✕
        </button>

        {/* Main image */}
        <div
          className="relative flex-shrink-0 bg-gray-100"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {currentImage ? (
            <img
              src={currentImage.url}
              alt={currentImage.alternativeText ?? post.description}
              width={currentImage.width}
              height={currentImage.height}
              className="w-full max-h-[50vh] object-contain rounded-t-2xl"
            />
          ) : (
            <div className="w-full h-64 bg-gray-200 rounded-t-2xl" />
          )}

          {/* Prev / Next arrows */}
          {post.images.length > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                aria-label="Imagen anterior"
                className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-black/40 text-white hover:bg-black/60 transition duration-300"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Imagen siguiente"
                className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-black/40 text-white hover:bg-black/60 transition duration-300"
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {post.images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto px-4 py-2 bg-gray-50">
            {post.images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Ver imagen ${idx + 1}`}
                className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition duration-300 ${
                  idx === currentIndex ? 'border-pink-500' : 'border-transparent'
                }`}
              >
                <img
                  src={img.url}
                  alt={img.alternativeText ?? `Imagen ${idx + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}

        {/* Description + CTA */}
        <div className="flex flex-col gap-4 p-4 overflow-y-auto">
          <p className="text-gray-700 text-sm">{post.description}</p>
          {whatsappLink && (
            <Button href={whatsappLink} variant="whatsapp" className="w-full">
              Pedir este postre
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
