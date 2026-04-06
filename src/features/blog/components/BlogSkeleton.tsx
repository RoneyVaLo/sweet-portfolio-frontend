const BlogSkeleton = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="h-4 w-32 bg-cream rounded animate-pulse mx-auto mb-4" />
          <div className="h-12 w-64 bg-cream rounded animate-pulse mx-auto mb-4" />
          <div className="h-4 w-96 bg-cream rounded animate-pulse mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-cream rounded-2xl overflow-hidden animate-pulse"
            >
              <div className="h-48 bg-border" />
              <div className="p-6 space-y-4">
                <div className="h-6 w-3/4 bg-border rounded" />
                <div className="h-4 w-full bg-border rounded" />
                <div className="h-4 w-2/3 bg-border rounded" />
                <div className="h-4 w-24 bg-border rounded mt-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSkeleton;
