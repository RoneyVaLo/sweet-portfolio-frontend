import { MessageCircle, MapPin } from 'lucide-react';
import { useProfile } from '../hooks/useProfile';
import { buildWhatsAppLink } from '../services/api';
import Button from '../components/Button';

export default function Contact() {
  const { data: profile } = useProfile();

  const whatsappLink = profile?.whatsapp
    ? buildWhatsAppLink(profile.whatsapp, 'Hola, me gustaría hacer un pedido')
    : null;

  const instagramUrl = profile?.instagram
    ? `https://instagram.com/${profile.instagram.replace(/^@/, '')}`
    : null;

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-md mx-auto flex flex-col items-center gap-8 text-center">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--brand-deep)' }}>Contáctanos</h2>
          <p className="text-sm" style={{ color: 'var(--brand-mauve)', opacity: 0.7 }}>Estamos listos para endulzar tu día</p>
        </div>

        <div className="w-full flex flex-col gap-3">
          {whatsappLink && (
            <Button href={whatsappLink} variant="whatsapp" className="w-full py-3.5 text-base">
              <MessageCircle size={18} />
              Hacer pedido por WhatsApp
            </Button>
          )}

          {instagramUrl && (
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ border: '1.5px solid var(--brand-pink)', color: 'var(--brand-mauve)', background: 'transparent' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              {profile?.instagram}
            </a>
          )}
        </div>

        {profile?.location && (
          <p className="flex items-center gap-2 text-sm" style={{ color: 'var(--brand-mauve)', opacity: 0.7 }}>
            <MapPin size={15} style={{ color: 'var(--brand-pink)' }} className="flex-shrink-0" />
            <span>{profile.location}</span>
          </p>
        )}
      </div>
    </section>
  );
}
