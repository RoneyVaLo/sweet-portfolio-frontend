import type { Post } from '../types';

interface CardProps {
  post: Post;
  onClick: (post: Post) => void;
}

export default function Card({ post, onClick }: CardProps) {
  const image = post.images[0];

  return (
    <button
      type="button"
      onClick={() => onClick(post)}
      className="group relative w-full overflow-hidden rounded-2xl shadow-sm hover:shadow-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 transition-shadow duration-300"
      aria-label={post.description}
    >
      {image ? (
        <img
          src={image.url}
          alt={image.alternativeText ?? post.description}
          width={image.width}
          height={image.height}
          loading="lazy"
          className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="w-full aspect-square" style={{ background: 'var(--brand-blush)' }} />
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/65 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
        <p className="text-white text-sm leading-snug line-clamp-3">{post.description}</p>
      </div>
    </button>
  );
}
