import { useState } from "react";
import Navbar from "./components/Navbar";
import ImageModal from "./components/ImageModal";
// import { Footer } from "./components/footer";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { Hero, Footer } from "./features/home";
import BlogSection from "./features/blog";
import CatalogSection from "./features/catalog";
import { useBlog } from "./features/blog/hooks/useBlog";
import { FAQ } from "./features/faq";

export default function App() {
  const [modalImage, setModalImage] = useState<string | null>(null);
  const { data: blogs, loading: blogsLoading } = useBlog();

  const openImageModal = (imageUrl: string) => {
    setModalImage(imageUrl);
  };

  const closeImageModal = () => {
    setModalImage(null);
  };

  return (
    <main className="min-h-screen bg-cream">
      <Navbar showBlog={!blogsLoading && !!blogs && blogs.length > 0} />
      <Hero />
      <CatalogSection onImageClick={openImageModal} />
      <BlogSection />
      <FAQ />
      <Footer showBlog={!blogsLoading && !!blogs && blogs.length > 0} />
      <WhatsAppButton />
      <ImageModal
        imageUrl={modalImage}
        isOpen={!!modalImage}
        onClose={closeImageModal}
      />
    </main>
  );
}
