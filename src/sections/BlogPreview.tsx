import { useNavigate } from 'react-router-dom';
import { useBlog } from '../hooks/useBlog';
import type { BlogArticle } from '../types';

export default function BlogPreview() {
  const { data } = useBlog();
  const navigate = useNavigate();

  const articles = Array.isArray(data) ? data.slice(0, 3) : [];

  if (!articles.length) return null;

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Del blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  className="w-full h-40 object-cover"
                />
              ) : (
                <div className="w-full h-40 bg-pink-100 flex items-center justify-center">
                  <span className="text-4xl">📝</span>
                </div>
              )}
              <div className="p-4 flex flex-col gap-2">
                <h3 className="font-semibold text-gray-800 group-hover:text-pink-600 transition duration-300">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">{article.content}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
