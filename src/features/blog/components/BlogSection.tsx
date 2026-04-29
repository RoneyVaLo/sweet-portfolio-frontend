import { useState } from "react";
import type { BlogArticle } from "../../../types";
import BlogSkeleton from "./BlogSkeleton";
import Image from "../../../components/ui/Image";
import { richTextToPlain } from "../../../helpers/richTextToPlain";
import * as Dialog from "@radix-ui/react-dialog";
import { useBlog } from "../hooks/useBlog";
import { optimizeUrl } from "../../../helpers/optimizeUrl";

export function BlogSection() {
  const [selectedBlog, setSelectedBlog] = useState<BlogArticle | null>(null);
  const { data: blogs, loading } = useBlog();

  if (loading) {
    return <BlogSkeleton />;
  }

  if (!blogs || blogs.length === 0) {
    return null;
  }

  return (
    <>
      <section id="blog" className="py-20 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-emerald font-medium tracking-widest uppercase text-sm mb-4">
              Tips & Consejos
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-cacao mb-4 text-balance">
              Blog de Repostería
            </h2>
            <p className="text-cacao-light max-w-2xl mx-auto leading-relaxed">
              Descubre secretos, técnicas y consejos para elevar tus creaciones
              dulces al siguiente nivel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs?.map((blog, index) => (
              <article
                key={blog.id}
                className="group bg-cream rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <Image
                    src={optimizeUrl(blog?.coverImage?.url || "")}
                    alt={blog.title}
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-cacao/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6">
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-cacao mb-3 group-hover:text-emerald transition-colors duration-300 text-balance">
                    {blog.title}
                  </h3>
                  <p className="text-cacao-light leading-relaxed mb-4 line-clamp-3">
                    {richTextToPlain(blog?.content) || ""}
                  </p>
                  <button
                    onClick={() => setSelectedBlog(blog)}
                    className="inline-flex items-center text-emerald font-medium hover:text-emerald-light transition-colors duration-300 group/btn"
                  >
                    Leer más
                    <svg
                      className="ml-2 w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Detail Modal */}
      <Dialog.Root
        open={!!selectedBlog}
        onOpenChange={(open) => !open && setSelectedBlog(null)}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-cacao/60 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[95vw] max-w-3xl max-h-[90vh] overflow-hidden bg-cream rounded-2xl shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
            {selectedBlog && (
              <>
                {/* Header Image */}
                <div className="relative h-56 md:h-72 overflow-hidden">
                  <Image
                    src={optimizeUrl(selectedBlog?.coverImage?.url || "")}
                    alt={selectedBlog.title}
                    className="object-cover"
                    sizes="(max-width: 768px) 95vw, 768px"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-cacao/70 via-cacao/20 to-transparent" />

                  {/* Close Button */}
                  <Dialog.Close className="absolute top-4 right-4 w-10 h-10 rounded-full bg-cream/90 backdrop-blur-sm flex items-center justify-center text-cacao hover:bg-cream hover:scale-110 transition-all duration-300 shadow-lg">
                    <svg
                      className="w-5 h-5"
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
                    <span className="sr-only">Cerrar</span>
                  </Dialog.Close>

                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <span className="inline-block px-3 py-1 bg-emerald/90 text-cream text-xs font-medium rounded-full mb-3">
                      Tips & Consejos
                    </span>
                    <Dialog.Title className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-cream text-balance leading-tight">
                      {selectedBlog.title}
                    </Dialog.Title>
                  </div>
                </div>

                {/* Content */}
                <div className="overflow-y-auto max-h-[calc(90vh-18rem)]">
                  <div className="p-6 md:p-8">
                    <Dialog.Description asChild>
                      <div className="prose prose-lg max-w-none">
                        <p className="text-cacao-light leading-relaxed mb-4 last:mb-0">
                          {richTextToPlain(selectedBlog.content) || ""}
                        </p>
                      </div>
                    </Dialog.Description>

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-cacao/10 flex items-center gap-2 text-sm text-cacao-light">
                      <svg
                        className="w-5 h-5 text-emerald"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                      <span>Artículo de Antojitos Sheo</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
