import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useBlog } from '../hooks/useBlog';
import type { BlogArticle } from '../types';
import { richTextToPlain } from '../helpers/richTextToPlain';

export default function BlogPreview() {
  const { data } = useBlog();
  const navigate = useNavigate();

  const articles = Array.isArray(data) ? data.slice(0, 3) : [];

  if (!articles.length) return null;

  return (
    <section className="py-24 px-6" style={{ background: 'var(--brand-surface)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--brand-deep)' }}>Del blog</h2>
          <button
            type="button"
            onClick={() => navigate('/blog')}
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-200"
            style={{ color: 'var(--brand-mauve)' }}
          >
            Ver todos <ArrowRight size={15} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article: BlogArticle) => (
            <button
              key={article.id}
              type="button"
              onClick={() => navigate(`/blog/${article.slug}`)}
              className="group text-left rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ '--tw-ring-color': 'var(--brand-pink)' } as React.CSSProperties}
            >
              {article.coverImage ? (
                <img
                  src={article.coverImage.url}
                  alt={article.coverImage.alternativeText ?? article.title}
                  width={article.coverImage.width}
                  height={article.coverImage.height}
                  loading="lazy"
                  className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="w-full h-44" style={{ background: 'var(--brand-blush)' }} />
              )}
              <div className="p-5 flex flex-col gap-2">
                <h3 className="font-semibold leading-snug transition-colors duration-200 text-gray-800 group-hover:text-[var(--brand-mauve)]">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
                  {richTextToPlain(article?.content) || ''}
                </p>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 flex justify-center md:hidden">
          <button
            type="button"
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-200"
            style={{ color: 'var(--brand-mauve)' }}
          >
            Ver todos los artículos <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}
