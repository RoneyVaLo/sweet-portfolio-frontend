import { useState } from 'react';
import { usePosts } from '../hooks/usePosts';
import { useProfile } from '../hooks/useProfile';
import Card from '../components/Card';
import Modal from '../components/Modal';
import Skeleton from '../components/Skeleton';
import type { Post } from '../types';

export default function Gallery() {
  const { data: posts, loading, error } = usePosts();
  const { data: profile } = useProfile();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Nuestros postres</h2>

        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="aspect-square w-full" />
              ))
            : posts?.map((post) => (
                <Card key={post.id} post={post} onClick={setSelectedPost} />
              ))}
        </div>
      </div>

      <Modal
        post={selectedPost}
        whatsapp={profile?.whatsapp ?? undefined}
        onClose={() => setSelectedPost(null)}
      />
    </section>
  );
}
