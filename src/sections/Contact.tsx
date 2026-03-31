import { useProfile } from '../hooks/useProfile';
import { buildWhatsAppLink } from '../services/api';
import Button from '../components/Button';

export default function Contact() {
  const { data: profile } = useProfile();

  const whatsappLink =
    profile?.whatsapp
      ? buildWhatsAppLink(profile.whatsapp, 'Hola, me gustaría hacer un pedido')
      : null;

  const instagramUrl =
    profile?.instagram
      ? `https://instagram.com/${profile.instagram.replace(/^@/, '')}`
      : null;

  return (
    <section className="py-16 px-6 bg-pink-50">
      <div className="max-w-xl mx-auto flex flex-col items-center gap-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Contáctanos</h2>

        {whatsappLink && (
          <Button href={whatsappLink} variant="whatsapp" className="w-full text-lg py-4">
            Hacer pedido por WhatsApp
          </Button>
        )}

        {instagramUrl && (
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-pink-600 hover:text-pink-800 font-medium transition duration-300"
          >
            <span>📸</span>
            <span>{profile?.instagram}</span>
          </a>
        )}

        {profile?.location && (
          <p className="flex items-center gap-2 text-gray-600">
            <span>📍</span>
            <span>{profile.location}</span>
          </p>
        )}
      </div>
    </section>
  );
}
