import { useNavigate } from 'react-router-dom';
import { useBlog } from '../hooks/useBlog';
import Skeleton from '../components/Skeleton';
import type { BlogArticle } from '../types';
import { richTextToPlain } from '../helpers/richTextToPlain';

function BlogCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-sm flex flex-col gap-0">
      <Skeleton className="w-full h-48 rounded-none" />
      <div className="p-5 flex flex-col gap-3">
        <Skeleton className="h-4 w-3/4 rounded-lg" />
        <Skeleton className="h-3 w-full rounded-lg" />
        <Skeleton className="h-3 w-5/6 rounded-lg" />
      </div>
    </div>
  );
}

export default function BlogListPage() {
  const { data, loading, error } = useBlog();
  const navigate = useNavigate();

  const articles = Array.isArray(data) ? data : [];

  return (
    <section className="py-20 px-6 bg-white min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold" style={{ color: 'var(--brand-deep)' }}>Blog</h1>
          <p className="mt-3 text-sm" style={{ color: 'var(--brand-mauve)', opacity: 0.7 }}>Recetas, consejos y novedades</p>
        </div>

        {/* Error state */}
        {error && (
          <div className="text-center py-16">
            <p className="font-medium mb-1" style={{ color: 'var(--brand-rose)' }}>No se pudo cargar el blog.</p>
            <p className="text-gray-400 text-sm">{error}</p>
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
          <div className="text-center py-20">
            <p className="text-gray-400">Aún no hay artículos publicados.</p>
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
                className="group text-left rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 border border-gray-100"
              >
                {article.coverImage ? (
                  <img
                    src={article.coverImage.url}
                    alt={article.coverImage.alternativeText ?? article.title}
                    width={article.coverImage.width}
                    height={article.coverImage.height}
                    loading="lazy"
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="w-full h-48" style={{ background: 'var(--brand-blush)' }} />
                )}
                <div className="p-5 flex flex-col gap-2">
                  <h2 className="font-semibold text-gray-800 transition-colors duration-200 leading-snug group-hover:text-[var(--brand-mauve)]">
                    {article.title}
                  </h2>
                  <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed">
                    {richTextToPlain(article?.content)}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
