import { Link, Outlet, useLocation } from 'react-router-dom'

export default function RootLayout() {
  const location = useLocation()
  return (
    <div className="min-h-screen">
      <nav className="border-b bg-white/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="font-extrabold text-xl">InstaMERN</Link>
          <div className="flex items-center gap-3">
            <Link to="/" className={linkClass(location.pathname === '/')}>Feed</Link>
            <Link to="/new" className={linkClass(location.pathname === '/new')}>New</Link>
            <Link to="/login" className={linkClass(location.pathname === '/login')}>Login</Link>
          </div>
        </div>
      </nav>
      <main className="max-w-2xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}

function linkClass(active) {
  return `px-3 py-1 rounded ${active ? 'bg-gray-900 text-white' : 'hover:bg-gray-100'}`
}