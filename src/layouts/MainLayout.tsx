import { Link, Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Nav */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-rose-100 shadow-sm">
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="text-xl font-bold text-pink-600 hover:text-pink-800 transition duration-300"
          >
            🍰 Dulce Portafolio
          </Link>
          <Link
            to="/blog"
            className="text-sm font-medium text-gray-600 hover:text-pink-600 transition duration-300"
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
      <footer className="bg-rose-50 border-t border-rose-100 py-8 px-6 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Dulce Portafolio. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
