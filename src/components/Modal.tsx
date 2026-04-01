import { useEffect, useRef, useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import type { Post } from '../types';
import { buildWhatsAppLink } from '../services/api';

interface ModalProps {
  post: Post | null;
  whatsapp?: string;
  onClose: () => void;
}

export default function Modal({ post, whatsapp, onClose }: ModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentIndex(0);
    setImageLoaded(false);
  }, [post]);

  useEffect(() => {
    setImageLoaded(false);
  }, [currentIndex]);

  useEffect(() => {
    if (!post) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [post]);

  useEffect(() => {
    if (!post) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
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
    if (Math.abs(delta) > 50) delta < 0 ? goNext() : goPrev();
    touchStartX.current = null;
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backdropRef.current) onClose();
  };

  if (!post) return null;

  const currentImage = post.images[currentIndex];
  const hasMultiple = post.images.length > 1;
  const whatsappLink = whatsapp
    ? buildWhatsAppLink(whatsapp, `Hola, me interesa este postre: ${post.description}`)
    : undefined;

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
      style={{ background: 'rgba(10, 5, 15, 0.75)', backdropFilter: 'blur(8px)' }}
      role="dialog"
      aria-modal="true"
      aria-label={post.description}
    >
      {/* Modal container — split layout on md+ */}
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
        style={{ maxHeight: '90vh' }}
      >

        {/* ── LEFT: Image panel ── */}
        <div
          className="relative md:w-[55%] flex-shrink-0 bg-stone-100 overflow-hidden"
          style={{ minHeight: '260px' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Image */}
          {currentImage ? (
            <>
              {/* Shimmer while loading */}
              {!imageLoaded && (
                <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-rose-50 to-stone-100" />
              )}
              <img
                key={currentImage.url}
                src={currentImage.url}
                alt={currentImage.alternativeText ?? post.description}
                width={currentImage.width}
                height={currentImage.height}
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                style={{ maxHeight: '70vh' }}
              />
            </>
          ) : (
            <div className="w-full h-full bg-rose-50" style={{ minHeight: '300px' }} />
          )}

          {/* Subtle gradient at bottom of image */}
          <div
            className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.35), transparent)' }}
          />

          {/* Dot indicators */}
          {hasMultiple && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 pointer-events-none">
              {post.images.map((_, idx) => (
                <span
                  key={idx}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: idx === currentIndex ? '20px' : '6px',
                    height: '6px',
                    background: idx === currentIndex ? 'white' : 'rgba(255,255,255,0.5)',
                  }}
                />
              ))}
            </div>
          )}

          {/* Prev / Next arrows */}
          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={goPrev}
                aria-label="Imagen anterior"
                className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white hover:scale-110"
                style={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(4px)' }}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Imagen siguiente"
                className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white hover:scale-110"
                style={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(4px)' }}
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Image counter badge */}
          {hasMultiple && (
            <div
              className="absolute top-4 left-4 px-2.5 py-1 rounded-full text-white text-xs font-medium tracking-wide"
              style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
            >
              {currentIndex + 1} / {post.images.length}
            </div>
          )}
        </div>

        {/* ── RIGHT: Info panel ── */}
        <div className="flex flex-col flex-1 overflow-y-auto">

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute top-4 right-4 z-20 flex items-center justify-center w-9 h-9 rounded-full bg-white/90 text-gray-500 hover:text-gray-800 hover:bg-white shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
          >
            <X size={16} strokeWidth={2.5} />
          </button>

          {/* Content */}
          <div className="flex flex-col gap-6 p-7 pt-8 flex-1">

            {/* Decorative accent */}
            <div className="w-8 h-0.5 rounded-full" style={{ background: 'var(--brand-pink)' }} />

            {/* Description */}
            <div className="flex flex-col gap-3">
              <p
                className="text-gray-700 leading-relaxed text-base"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {post.description}
              </p>
            </div>

            {/* Thumbnail strip (md+ only, inside info panel) */}
            {hasMultiple && (
              <div className="hidden md:flex gap-2 flex-wrap">
                {post.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Ver imagen ${idx + 1}`}
                    className="flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
                    style={{
                      outline: idx === currentIndex ? '2px solid var(--brand-mauve)' : '2px solid transparent',
                      outlineOffset: '2px',
                      opacity: idx === currentIndex ? 1 : 0.55,
                    }}
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

            {/* Spacer */}
            <div className="flex-1" />

            {/* CTA */}
            {whatsappLink && (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 w-full py-3.5 rounded-2xl text-white text-sm font-semibold tracking-wide transition-all duration-200 hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 shadow-sm hover:shadow-md"
                style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' }}
              >
                <MessageCircle size={18} />
                Pedir este postre
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
