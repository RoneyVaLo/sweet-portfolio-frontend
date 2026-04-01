import { useProfile } from '../hooks/useProfile';
import { buildWhatsAppLink } from '../services/api';
import Button from '../components/Button';
import { richTextToPlain } from '../helpers/richTextToPlain';

export default function Hero() {
  const { data: profile } = useProfile();

  const whatsappLink =
    profile?.whatsapp
      ? buildWhatsAppLink(profile.whatsapp, 'Hola, me gustaría hacer un pedido')
      : null;

  const bgImage = profile?.profileImage?.url;

  return (
    <section
      className="relative flex min-h-screen items-center justify-center text-center px-6"
      style={bgImage ? { backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

      <div className="relative z-10 flex flex-col items-center gap-6 max-w-xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
          {profile?.name ?? ''}
        </h1>
        <p className="text-lg md:text-xl text-white/90 drop-shadow">
          {richTextToPlain(profile?.description ?? null)}
        </p>
        {whatsappLink && (
          <Button href={whatsappLink} variant="whatsapp" className="text-lg px-8 py-4">
            Hacer pedido por WhatsApp
          </Button>
        )}
      </div>
    </section>
  );
}
