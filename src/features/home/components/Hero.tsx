import { optimizeUrl } from "../../../helpers/optimizeUrl";
import { richTextToPlain } from "../../../helpers/richTextToPlain";
import { useProfile } from "../../../hooks/useProfile";
import { buildWhatsAppLink } from "../../../lib/services/api";
import HeroSkeleton from "./HeroSkeleton";

export function Hero() {
  const { data: profile, loading } = useProfile();

  const whatsappLink = profile?.whatsapp
    ? buildWhatsAppLink(profile.whatsapp, "Hola, me gustaría hacer un pedido")
    : null;

  const bgImage = optimizeUrl(profile?.profileImage?.url || "");

  if (loading) {
    return <HeroSkeleton />;
  }

  return (
    <section
      id="inicio"
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-cream"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-5 md:top-20 md:left-10 w-20 h-20 md:w-32 md:h-32 rounded-full bg-emerald/5" />
        <div className="absolute bottom-10 right-5 md:bottom-20 md:right-10 w-32 h-32 md:w-48 md:h-48 rounded-full bg-cacao/5" />
        <div className="absolute top-1/3 right-1/4 w-16 h-16 md:w-24 md:h-24 rounded-full bg-emerald/3" />
      </div>

      <div className="container mx-auto px-6 py-16 md:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
          {/* Profile Image */}
          <div className="relative group">
            <div className="absolute inset-0 rounded-full bg-emerald/20 blur-2xl transform group-hover:scale-110 transition-transform duration-500" />
            <div className="relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-cream shadow-2xl">
              <div className="relative w-full h-full">
                {" "}
                {/* Contenedor necesario para simular 'fill' */}
                <img
                  src={bgImage}
                  alt={profile?.name || "Profile background"}
                  loading="eager" // Reemplaza a 'priority'
                  fetchPriority="high" // Refuerza la carga prioritaria
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover" // Simula 'fill' y 'object-cover'
                  sizes="(max-width: 768px) 224px, (max-width: 1024px) 288px, 320px"
                />
              </div>
            </div>
            {/* Decorative badge */}
            <div className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 w-16 h-16 md:w-20 md:h-20 rounded-full bg-emerald flex items-center justify-center shadow-lg">
              <svg
                className="w-8 h-8 md:w-10 md:h-10 text-cream"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                />
              </svg>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <p className="text-emerald font-medium tracking-widest uppercase text-sm mb-4">
              Repostería Artesanal
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-cacao mb-6 text-balance">
              {profile?.name ?? ""}
            </h1>
            <div className="space-y-4 text-cacao-light leading-relaxed">
              <p className="text-base md:text-lg">
                {richTextToPlain(profile?.description ?? null)}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-8">
              <a
                href="#catalogo"
                className="inline-flex items-center justify-center px-8 py-3 bg-cacao text-cream font-medium rounded-full hover:bg-cacao-light transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Ver Catálogo
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </a>
              <a
                href={whatsappLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 bg-emerald text-white font-medium rounded-full hover:bg-emerald-light transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                <svg
                  className="mr-2 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Hacer Pedido
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-cacao/50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
