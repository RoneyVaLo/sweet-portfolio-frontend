import { Link, Outlet, useLocation } from 'react-router-dom';

export default function MainLayout() {
  const location = useLocation();

  return (
    <div className="min-h-dvh flex flex-col bg-white">
      {/* Nav */}
      <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b" style={{ borderColor: 'var(--brand-blush)' }}>
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="text-lg font-semibold tracking-tight transition-colors duration-200"
            style={{ fontFamily: "'Playfair Display', serif", color: 'var(--brand-deep)' }}
          >
            Dulce Portafolio
          </Link>
          <Link
            to="/blog"
            className="text-sm font-medium transition-colors duration-200"
            style={{
              color: location.pathname.startsWith('/blog') ? 'var(--brand-mauve)' : '#6b7280',
            }}
          >
            Blog
          </Link>
        </nav>
      </header>

      {/* Page content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t py-10 px-6 text-center" style={{ background: 'var(--brand-surface)', borderColor: 'var(--brand-blush)' }}>
        <p className="text-sm tracking-wide" style={{ color: 'var(--brand-mauve)', opacity: 0.7 }}>
          © {new Date().getFullYear()} Dulce Portafolio · Todos los derechos reservados
        </p>
      </footer>
    </div>
  );
}
