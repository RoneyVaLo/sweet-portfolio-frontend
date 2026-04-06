const CatalogSkeleton = () => {
  const skeletonItems = [
    "col-span-2 row-span-2",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-2",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
  ];

  return (
    <section id="catalogo" className="py-20 bg-cream">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="h-4 w-32 bg-secondary rounded animate-pulse mx-auto mb-4" />
          <div className="h-12 w-64 bg-secondary rounded animate-pulse mx-auto mb-4" />
          <div className="h-4 w-96 bg-secondary rounded animate-pulse mx-auto" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] md:auto-rows-[250px] gap-4">
          {skeletonItems.map((className, index) => (
            <div
              key={index}
              className={`${className} bg-secondary rounded-2xl animate-pulse`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CatalogSkeleton;
