import { useProfile } from '../hooks/useProfile';

export default function About() {
  const { data: profile } = useProfile();

  return (
    <section className="py-16 px-6 bg-rose-50">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Image */}
        <div className="flex-shrink-0 w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-md">
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
            <div className="w-full h-full bg-pink-200 flex items-center justify-center">
              <span className="text-5xl">🍰</span>
            </div>
          )}
        </div>

        {/* Text */}
        <div className="flex flex-col gap-4 text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-800">Sobre nosotros</h2>
          <p className="text-gray-600 leading-relaxed">{profile?.description ?? ''}</p>
        </div>
      </div>
    </section>
  );
}
