import { useState } from "react";
import Navbar from "./components/Navbar";
import ImageModal from "./components/ImageModal";
// import { Footer } from "./components/footer";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { Hero, Footer } from "./features/home";
import BlogSection from "./features/blog";
import CatalogSection from "./features/catalog";

export default function App() {
  const [modalImage, setModalImage] = useState<string | null>(null);

  const openImageModal = (imageUrl: string) => {
    setModalImage(imageUrl);
  };

  const closeImageModal = () => {
    setModalImage(null);
  };

  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <Hero />
      <CatalogSection onImageClick={openImageModal} />
      <BlogSection />
      <Footer />
      <WhatsAppButton />
      <ImageModal
        imageUrl={modalImage}
        isOpen={!!modalImage}
        onClose={closeImageModal}
      />
    </main>
  );
}
