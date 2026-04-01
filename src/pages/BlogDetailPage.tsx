import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useBlog } from '../hooks/useBlog';
import Skeleton from '../components/Skeleton';
import { richTextToPlain } from '../helpers/richTextToPlain';

function ArticleSkeleton() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">
      <Skeleton className="w-full h-72 rounded-3xl" />
      <Skeleton className="h-10 w-3/4 rounded-xl" />
      <div className="flex flex-col gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className={`h-4 rounded-lg ${i % 3 === 2 ? 'w-4/5' : 'w-full'}`} />
        ))}
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
      {loading && (
        <div className="max-w-3xl mx-auto">
          <ArticleSkeleton />
        </div>
      )}

      {!loading && (error || !article) && (
        <div className="max-w-3xl mx-auto text-center py-20 flex flex-col items-center gap-4">
          <p className="font-medium mb-1" style={{ color: 'var(--brand-rose)' }}>
            {error ?? 'No se encontró el artículo.'}
          </p>
          <p className="text-gray-400 text-sm">
            El artículo que buscas no existe o no está disponible.
          </p>
          <Link
            to="/blog"
            className="mt-2 inline-flex items-center gap-1.5 font-medium text-sm transition-colors duration-200"
            style={{ color: 'var(--brand-mauve)' }}
          >
            <ArrowLeft size={15} /> Volver al blog
          </Link>
        </div>
      )}

      {!loading && !error && article && (
        <article className="max-w-3xl mx-auto flex flex-col gap-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 font-medium text-sm transition-colors duration-200 self-start"
            style={{ color: 'var(--brand-mauve)' }}
          >
            <ArrowLeft size={15} /> Volver al blog
          </Link>

          {article.coverImage && (
            <img
              src={article.coverImage.url}
              alt={article.coverImage.alternativeText ?? article.title}
              width={article.coverImage.width}
              height={article.coverImage.height}
              className="w-full max-h-96 object-cover rounded-3xl shadow-md"
            />
          )}

          <h1 className="text-4xl md:text-5xl font-bold leading-tight" style={{ color: 'var(--brand-deep)' }}>
            {article.title}
          </h1>

          <div className="prose prose-rose max-w-none text-gray-600 leading-relaxed">
            <p>{richTextToPlain(article.content)}</p>
          </div>
        </article>
      )}
    </section>
  );
}
