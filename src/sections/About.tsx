import { richTextToPlain } from '../helpers/richTextToPlain';
import { useProfile } from '../hooks/useProfile';

export default function About() {
  const { data: profile } = useProfile();

  return (
    <section className="py-24 px-6" style={{ background: 'var(--brand-surface)' }}>
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Image */}
        <div className="flex-shrink-0 w-52 h-52 md:w-72 md:h-72 rounded-3xl overflow-hidden shadow-lg" style={{ outline: '4px solid white', outlineOffset: '0px' }}>
          {profile?.profileImage ? (
            <img
              src={profile.profileImage.url}
              alt={profile.profileImage.alternativeText ?? profile.name}
              width={profile.profileImage.width}
              height={profile.profileImage.height}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full" style={{ background: 'var(--brand-blush)' }} />
          )}
        </div>

        {/* Text */}
        <div className="flex flex-col gap-5 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--brand-deep)' }}>Sobre nosotros</h2>
          <p className="leading-relaxed text-base max-w-prose" style={{ color: 'var(--brand-mauve)', opacity: 0.85 }}>
            {richTextToPlain(profile?.description ?? null)}
          </p>
        </div>
      </div>
    </section>
  );
}
