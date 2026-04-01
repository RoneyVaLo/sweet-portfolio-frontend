import { Link, useParams } from 'react-router-dom';
import { useBlog } from '../hooks/useBlog';
import Skeleton from '../components/Skeleton';

function ArticleSkeleton() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">
      <Skeleton className="w-full h-72 rounded-2xl" />
      <Skeleton className="h-10 w-3/4" />
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data, loading, error } = useBlog(slug!);

  const article = !Array.isArray(data) ? data : null;

  return (
    <section className="py-16 px-6 bg-white min-h-screen">
      {/* Loading state */}
      {loading && <ArticleSkeleton />}

      {/* Error state */}
      {!loading && (error || !article) && (
        <div className="max-w-3xl mx-auto text-center py-16 flex flex-col items-center gap-4">
          <p className="text-red-500 text-lg font-medium">
            {error ?? 'No se encontró el artículo.'}
          </p>
          <p className="text-gray-500 text-sm">
            El artículo que buscas no existe o no está disponible.
          </p>
          <Link
            to="/blog"
            className="mt-2 inline-flex items-center gap-2 text-pink-600 hover:text-pink-800 font-medium transition duration-300"
          >
            ← Volver al blog
          </Link>
        </div>
      )}

      {/* Article content */}
      {!loading && !error && article && (
        <article className="max-w-3xl mx-auto flex flex-col gap-8">
          {/* Back link */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-800 font-medium transition duration-300 self-start"
          >
            ← Volver al blog
          </Link>

          {/* Cover image */}
          {article.coverImage && (
            <img
              src={article.coverImage.url}
              alt={article.coverImage.alternativeText ?? article.title}
              width={article.coverImage.width}
              height={article.coverImage.height}
              className="w-full max-h-96 object-cover rounded-2xl shadow-md"
            />
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            {article.title}
          </h1>

          {/* Rich text content */}
          <div
            className="prose prose-rose max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>
      )}
    </section>
  );
}
