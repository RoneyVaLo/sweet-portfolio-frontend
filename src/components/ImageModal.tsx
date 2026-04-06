import { useEffect, useState, useCallback } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "./ui/Image";

interface ImageModalProps {
  imageUrl: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const ImageModal = ({ imageUrl, isOpen, onClose }: ImageModalProps) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isZoomed) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setPosition({ x, y });
    },
    [isZoomed],
  );

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
    if (!isZoomed) {
      setPosition({ x: 50, y: 50 });
    }
  };

  // Reset zoom when modal closes
  useEffect(() => {
    if (!isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsZoomed(false);
      setPosition({ x: 50, y: 50 });
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isZoomed) {
          setIsZoomed(false);
        } else {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, isZoomed, onClose]);

  if (!imageUrl) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-cacao/80 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed inset-4 md:inset-8 lg:inset-16 z-50 flex items-center justify-center data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          <Dialog.Title className="sr-only">
            Vista ampliada de imagen
          </Dialog.Title>
          <Dialog.Description className="sr-only">
            Imagen de postre en vista ampliada. Haz clic para hacer zoom.
          </Dialog.Description>

          {/* Close button */}
          <Dialog.Close asChild>
            <button
              className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-cream/90 hover:bg-cream flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
              aria-label="Cerrar"
            >
              <svg
                className="w-6 h-6 text-cacao"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </Dialog.Close>

          {/* Zoom indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 bg-cream/90 px-4 py-2 rounded-full shadow-lg">
            <p className="text-cacao text-sm font-medium flex items-center gap-2">
              {isZoomed ? (
                <>
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
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"
                    />
                  </svg>
                  Clic para alejar
                </>
              ) : (
                <>
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
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                  </svg>
                  Clic para acercar
                </>
              )}
            </p>
          </div>

          {/* Image container */}
          <div
            className={`relative w-full h-full overflow-hidden rounded-2xl bg-cacao/20 ${
              isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
            }`}
            onClick={toggleZoom}
            onMouseMove={handleMouseMove}
          >
            <div
              className="relative w-full h-full transition-transform duration-300 ease-out"
              style={{
                transform: isZoomed ? "scale(2)" : "scale(1)",
                transformOrigin: `${position.x}% ${position.y}%`,
              }}
            >
              <Image
                src={imageUrl}
                alt="Vista ampliada del postre"
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ImageModal;
