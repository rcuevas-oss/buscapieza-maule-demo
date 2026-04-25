import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Search, Megaphone, Plus, Wrench, User } from 'lucide-react'

const links = [
  { to: '/buscar', label: 'Buscar repuesto', icon: Search },
  { to: '/busquedas', label: 'Búsquedas activas', icon: Megaphone },
  { to: '/publicar-busqueda', label: 'Publicar búsqueda', icon: Plus }
]

export default function Navbar() {
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-40 border-b border-carbon-800/80 bg-carbon-950/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 md:h-16 items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2.5 group min-w-0">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-neon text-carbon-950 shadow-neon group-hover:rotate-6 transition shrink-0">
              <Wrench className="h-5 w-5" strokeWidth={2.5} />
            </span>
            <div className="leading-tight min-w-0">
              <div className="font-display text-[15px] md:text-base font-semibold text-white tracking-tight truncate">
                BuscaPieza <span className="text-neon">Maule</span>
              </div>
              <div className="hidden md:block text-[10px] uppercase tracking-widest text-zinc-500">demo · sandbox</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {links.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                    isActive
                      ? 'bg-carbon-800 text-white'
                      : 'text-zinc-400 hover:text-white hover:bg-carbon-800/60'
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <button onClick={() => navigate('/dashboard')} className="btn-ghost">
              <User className="h-4 w-4" />
              Mi panel
            </button>
            <button onClick={() => navigate('/publicar-busqueda')} className="btn-primary">
              <Plus className="h-4 w-4" />
              Publicar
            </button>
          </div>

          {/* Mobile: search shortcut (primary actions live in MobileBottomNav) */}
          <button
            type="button"
            onClick={() => navigate('/buscar')}
            aria-label="Buscar repuestos"
            className="md:hidden grid h-10 w-10 place-items-center rounded-xl bg-carbon-800 text-zinc-200 active:scale-95 transition"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  )
}
