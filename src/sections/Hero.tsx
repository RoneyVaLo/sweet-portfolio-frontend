import { MessageCircle, ChevronDown } from 'lucide-react';
import { useProfile } from '../hooks/useProfile';
import { buildWhatsAppLink } from '../services/api';
import Button from '../components/Button';
import { richTextToPlain } from '../helpers/richTextToPlain';

export default function Hero() {
  const { data: profile } = useProfile();

  const whatsappLink = profile?.whatsapp
    ? buildWhatsAppLink(profile.whatsapp, 'Hola, me gustaría hacer un pedido')
    : null;

  const bgImage = profile?.profileImage?.url;

  return (
    <section
      className="relative flex min-h-dvh items-center justify-center text-center px-6 overflow-hidden"
      style={
        bgImage
          ? {
              backgroundImage: `url(${bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
            }
          : { background: 'linear-gradient(135deg, #3d1a30 0%, #5e3b53 50%, #2a0c1f 100%)' }
      }
    >
      {/* Brand-tinted overlay — preserves image warmth while ensuring readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(160deg, rgba(42,12,31,0.55) 0%, rgba(94,59,83,0.45) 40%, rgba(42,12,31,0.72) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Soft radial glow echoing the pink palette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 60%, rgba(250,154,211,0.18) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 max-w-2xl">
        {/* Decorative rule */}
        <div
          className="flex items-center gap-3"
          aria-hidden="true"
        >
          <span className="block h-px w-10 bg-rose-300/60" />
          <span className="block h-1.5 w-1.5 rounded-full bg-rose-300/80" />
          <span className="block h-px w-10 bg-rose-300/60" />
        </div>

        <h1
          className="text-5xl md:text-7xl font-bold text-white leading-tight"
          style={{ textShadow: '0 2px 24px rgba(42,12,31,0.5)' }}
        >
          {profile?.name ?? ''}
        </h1>

        <p className="text-lg md:text-xl leading-relaxed max-w-lg" style={{ color: 'rgba(255,214,238,0.92)' }}>
          {richTextToPlain(profile?.description ?? null)}
        </p>

        {whatsappLink && (
          <Button href={whatsappLink} variant="whatsapp" className="text-base px-8 py-3.5 mt-2">
            <MessageCircle size={18} />
            Hacer pedido por WhatsApp
          </Button>
        )}
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60"
        aria-hidden="true"
      >
        <ChevronDown
          size={22}
          className="text-rose-200 animate-bounce"
          style={{ animationDuration: '2s' }}
        />
      </div>
    </section>
  );
}
