const HeroSkeleton = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-cream">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-cacao animate-pulse" />
        <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-emerald animate-pulse" />
      </div>

      <div className="container mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Profile Image Skeleton */}
          <div className="relative">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-secondary animate-pulse" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-secondary animate-pulse" />
          </div>

          {/* Content Skeleton */}
          <div className="flex-1 text-center lg:text-left space-y-6 max-w-2xl">
            <div className="h-4 w-32 bg-secondary rounded animate-pulse mx-auto lg:mx-0" />
            <div className="h-12 md:h-16 w-3/4 bg-secondary rounded animate-pulse mx-auto lg:mx-0" />
            <div className="space-y-3">
              <div className="h-4 w-full bg-secondary rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-secondary rounded animate-pulse" />
              <div className="h-4 w-4/5 bg-secondary rounded animate-pulse" />
            </div>
            <div className="flex gap-4 justify-center lg:justify-start pt-4">
              <div className="h-12 w-40 bg-secondary rounded-full animate-pulse" />
              <div className="h-12 w-40 bg-secondary rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSkeleton;
