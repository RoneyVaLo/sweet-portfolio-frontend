import ImageCarousel from "./ImageCarousel";
import { usePosts } from "../hooks/usePosts";
import CatalogSkeleton from "./CatalogSkeleton";

interface CatalogProps {
  onImageClick: (imageUrl: string) => void;
}

export function CatalogSection({ onImageClick }: CatalogProps) {
  const { data: posts, loading } = usePosts();

  if (loading) {
    return <CatalogSkeleton />;
  }

  // Bento grid layout classes for varied sizes
  const bentoClasses = [
    "col-span-2 row-span-2",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-2",
    "col-span-1 row-span-1",
    "col-span-2 row-span-1",
  ];

  return (
    <section id="catalogo" className="py-20 bg-cream">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-emerald font-medium tracking-widest uppercase text-sm mb-4">
            Nuestras Creaciones
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-cacao mb-4 text-balance">
            Catálogo de Postres
          </h2>
          <p className="text-cacao-light max-w-2xl mx-auto leading-relaxed">
            Cada postre es una obra de arte comestible, elaborada con
            ingredientes premium y mucho cariño. Haz clic en cualquier imagen
            para verla en detalle.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] lg:auto-rows-[250px] gap-3 md:gap-4 grid-flow-dense">
          {posts?.map((post, index) => (
            <div
              key={post.id}
              className={`${bentoClasses[index % bentoClasses.length]} rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300`}
            >
              <ImageCarousel
                images={post.images}
                description={post.description}
                onImageClick={onImageClick}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
