import { cn } from "../../lib/utils";

interface ImageProps {
  src: string;
  alt: string;
  className: string;
  sizes?: string;
}

const Image = ({ src, alt, className, sizes }: ImageProps) => {
  return (
    <div className="relative w-full h-full">
      <img
        src={src}
        alt={alt}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className={cn("absolute inset-0 h-full w-full object-cover", className)}
        sizes={
          sizes || "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        }
      />
    </div>
  );
};

export default Image;
