import { useNavigate } from 'react-router-dom';
import { useBlog } from '../hooks/useBlog';
import Skeleton from '../components/Skeleton';
import type { BlogArticle } from '../types';
import { richTextToPlain } from '../helpers/richTextToPlain';

function BlogCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden shadow-md bg-rose-50 flex flex-col gap-0">
      <Skeleton className="w-full h-48" />
      <div className="p-4 flex flex-col gap-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
}

export default function BlogListPage() {
  const { data, loading, error } = useBlog();
  const navigate = useNavigate();

  const articles = Array.isArray(data) ? data : [];

  return (
    <section className="py-16 px-6 bg-white min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">Blog</h1>

        {/* Error state */}
        {error && (
          <div className="text-center py-16">
            <p className="text-red-500 text-lg font-medium mb-2">
              No se pudo cargar el blog.
            </p>
            <p className="text-gray-500 text-sm">{error}</p>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && articles.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">Aún no hay artículos publicados.</p>
          </div>
        )}

        {/* Articles grid */}
        {!loading && !error && articles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article: BlogArticle) => (
              <button
                key={article.id}
                type="button"
                onClick={() => navigate(`/blog/${article.slug}`)}
                className="group text-left rounded-2xl overflow-hidden shadow-md bg-rose-50 hover:shadow-lg transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
              >
                {article.coverImage ? (
                  <img
                    src={article.coverImage.url}
                    alt={article.coverImage.alternativeText ?? article.title}
                    width={article.coverImage.width}
                    height={article.coverImage.height}
                    loading="lazy"
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-pink-100 flex items-center justify-center">
                    <span className="text-5xl">📝</span>
                  </div>
                )}
                <div className="p-4 flex flex-col gap-2">
                  <h2 className="font-semibold text-gray-800 group-hover:text-pink-600 transition duration-300">
                    {article.title}
                  </h2>
                  <p className="text-sm text-gray-500 line-clamp-3">{richTextToPlain(article?.content)}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
