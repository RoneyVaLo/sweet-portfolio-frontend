export function FaqSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="h-16 rounded-2xl bg-secondary/50 animate-pulse"
        />
      ))}
    </div>
  );
}
