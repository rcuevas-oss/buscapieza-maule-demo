import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Megaphone,
  Package,
  MessageCircle,
  Heart,
  User,
  Store,
  ShieldCheck,
  Settings
} from 'lucide-react'

const sections = {
  user: [
    { to: '/dashboard', label: 'Resumen', icon: LayoutDashboard, end: true },
    { to: '/dashboard/busquedas', label: 'Mis búsquedas', icon: Megaphone },
    { to: '/dashboard/publicaciones', label: 'Mis publicaciones', icon: Package },
    { to: '/dashboard/ofertas', label: 'Ofertas recibidas', icon: MessageCircle },
    { to: '/dashboard/favoritos', label: 'Favoritos', icon: Heart },
    { to: '/dashboard/perfil', label: 'Perfil', icon: User }
  ],
  tenant: [
    { to: '/tenant', label: 'Resumen tenant', icon: Store, end: true },
    { to: '/tenant/repuestos', label: 'Administrar repuestos', icon: Package },
    { to: '/tenant/responder', label: 'Responder búsquedas', icon: MessageCircle },
    { to: '/tenant/estadisticas', label: 'Estadísticas', icon: LayoutDashboard },
    { to: '/tenant/perfil', label: 'Perfil público', icon: Settings }
  ],
  admin: [
    { to: '/admin', label: 'Métricas', icon: LayoutDashboard, end: true },
    { to: '/admin/cola', label: 'Cola moderación', icon: ShieldCheck }
  ]
}

export default function DashboardLayout({ scope = 'user', title, subtitle, children, headerExtras }) {
  const items = sections[scope] || sections.user

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        {/* Mobile: horizontal scroll tabs */}
        <nav
          className="lg:hidden -mx-4 px-4 flex gap-2 overflow-x-auto scrollbar-none"
          aria-label="Secciones del panel"
          style={{ scrollbarWidth: 'none' }}
        >
          {items.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `shrink-0 inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm border transition ${
                  isActive
                    ? 'bg-neon/15 text-neon border-neon/40'
                    : 'bg-carbon-900 text-zinc-300 border-carbon-700/60'
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop: vertical sidebar */}
        <aside className="hidden lg:block card p-3 lg:sticky lg:top-20 self-start">
          <div className="px-3 py-2 mb-2 text-[11px] uppercase tracking-widest text-zinc-500">
            {scope === 'admin' ? 'Admin plataforma' : scope === 'tenant' ? 'Mi tenant' : 'Mi cuenta'}
          </div>
          <nav className="space-y-1">
            {items.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition ${
                    isActive
                      ? 'bg-neon/15 text-neon border border-neon/30'
                      : 'text-zinc-300 hover:text-white hover:bg-carbon-800/60 border border-transparent'
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main>
          {(title || headerExtras) && (
            <header className="flex items-start justify-between gap-4 mb-6">
              <div>
                {title && (
                  <h1 className="font-display text-2xl md:text-3xl font-semibold text-white tracking-tight">
                    {title}
                  </h1>
                )}
                {subtitle && <p className="muted mt-1 text-sm">{subtitle}</p>}
              </div>
              {headerExtras}
            </header>
          )}
          {children}
        </main>
      </div>
    </div>
  )
}

export function MetricCard({ label, value, hint, icon: Icon, accent = 'text-neon' }) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-widest text-zinc-500">{label}</span>
        {Icon && <Icon className={`h-4 w-4 ${accent}`} />}
      </div>
      <div className={`mt-2 font-display text-3xl font-bold text-white`}>{value}</div>
      {hint && <div className="mt-1 text-xs muted">{hint}</div>}
    </div>
  )
}
