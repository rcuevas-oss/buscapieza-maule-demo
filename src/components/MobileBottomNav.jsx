import { NavLink } from 'react-router-dom'
import { Home, Search, Plus, Megaphone, User } from 'lucide-react'

const items = [
  { to: '/', label: 'Inicio', icon: Home, end: true },
  { to: '/buscar', label: 'Buscar', icon: Search },
  { to: '/publicar-busqueda', label: 'Publicar', icon: Plus, primary: true },
  { to: '/busquedas', label: 'Búsquedas', icon: Megaphone },
  { to: '/dashboard', label: 'Mi panel', icon: User }
]

export default function MobileBottomNav() {
  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-carbon-800/80 bg-carbon-950/95 backdrop-blur"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      aria-label="Navegación principal móvil"
    >
      <div className="grid grid-cols-5">
        {items.map(({ to, label, icon: Icon, end, primary }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 py-2 min-h-[56px] text-[10px] font-medium transition active:scale-95 ${
                isActive
                  ? primary ? 'text-carbon-950' : 'text-neon'
                  : 'text-zinc-400 hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`grid h-9 w-9 place-items-center rounded-full transition ${
                    primary
                      ? 'bg-neon text-carbon-950 shadow-neon'
                      : isActive
                      ? 'bg-neon/15 text-neon'
                      : 'text-zinc-300'
                  }`}
                >
                  <Icon className="h-5 w-5" strokeWidth={primary ? 2.5 : 2} />
                </span>
                <span className={primary ? 'text-zinc-300' : ''}>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
