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
      className="group relative w-full overflow-hidden rounded-2xl shadow-md cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
    >
      {image ? (
        <img
          src={image.url}
          alt={image.alternativeText ?? post.description}
          width={image.width}
          height={image.height}
          loading="lazy"
          className="w-full aspect-square object-cover transition duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="w-full aspect-square bg-gray-200 rounded-2xl" />
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 rounded-2xl p-4">
        <p className="text-white text-sm line-clamp-3">{post.description}</p>
      </div>
    </button>
  );
}
