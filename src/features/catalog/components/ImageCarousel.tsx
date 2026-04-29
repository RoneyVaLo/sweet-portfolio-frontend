import { useRef, useState } from "react";
import { optimizeUrl } from "../../../helpers/optimizeUrl";

const ImageCarousel = ({
  images,
  description,
  onImageClick,
}: {
  images: { url: string }[];
  description: string;
  onImageClick: (url: string) => void;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const scrollWidth = scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({
        left: scrollWidth * index,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollWidth = scrollRef.current.offsetWidth;
      const scrollLeft = scrollRef.current.scrollLeft;
      const newIndex = Math.round(scrollLeft / scrollWidth);
      setActiveIndex(newIndex);
    }
  };

  if (images.length === 1) {
    return (
      <div
        className="relative w-full h-full cursor-zoom-in group"
        onClick={() => onImageClick(images[0].url)}
      >
        <div className="relative w-full h-full">
          <img
            src={optimizeUrl(images[0].url)}
            alt={description}
            loading="eager" // Reemplaza a 'priority'
            fetchPriority="high" // Refuerza la carga prioritaria
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" // Simula 'fill' y 'object-cover'
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-cacao/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-cream font-serif text-lg font-medium">
            {description}
          </p>
        </div>
        <div className="absolute top-3 right-3 w-8 h-8 bg-cream/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg
            className="w-4 h-4 text-cacao"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
            />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full group">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex w-full h-full overflow-x-auto scroll-snap-x scrollbar-hide"
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="shrink-0 w-full h-full relative cursor-zoom-in"
            onClick={() => onImageClick(image.url)}
          >
            <div className="relative w-full h-full">
              <img
                src={optimizeUrl(image.url)}
                alt={`${description} ${index + 1}`}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-cacao/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Description */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none">
        <p className="text-cream font-serif text-lg font-medium">
          {description}
        </p>
      </div>

      {/* Zoom indicator */}
      <div className="absolute top-3 right-3 w-8 h-8 bg-cream/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <svg
          className="w-4 h-4 text-cacao"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
          />
        </svg>
      </div>

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              scrollToIndex(
                activeIndex > 0 ? activeIndex - 1 : images.length - 1,
              );
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-cream/90 backdrop-blur-sm flex items-center justify-center text-cacao hover:bg-cream hover:scale-110 transition-all duration-300 shadow-md opacity-0 group-hover:opacity-100 z-10"
            aria-label="Imagen anterior"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              scrollToIndex(
                activeIndex < images.length - 1 ? activeIndex + 1 : 0,
              );
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-cream/90 backdrop-blur-sm flex items-center justify-center text-cacao hover:bg-cream hover:scale-110 transition-all duration-300 shadow-md opacity-0 group-hover:opacity-100 z-10"
            aria-label="Imagen siguiente"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  scrollToIndex(index);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-cream w-4"
                    : "bg-cream/50 hover:bg-cream/75"
                }`}
                aria-label={`Ir a imagen ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}

      {/* Multiple images indicator */}
      <div className="absolute top-3 left-3 bg-cacao/80 backdrop-blur-sm text-cream text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5">
        <svg
          className="w-3 h-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span>{images.length}</span>
      </div>
    </div>
  );
};

export default ImageCarousel;
