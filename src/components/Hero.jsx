import { Link } from 'react-router-dom'
import { Search, Megaphone, Tag, MapPin, Sparkles } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-carbon-800/80">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            'radial-gradient(60% 60% at 75% 20%, rgba(255,106,26,0.22) 0%, transparent 60%), radial-gradient(40% 40% at 10% 90%, rgba(220,38,38,0.14) 0%, transparent 70%)'
        }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-20">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/10 px-3 py-1 text-xs text-neon">
              <Sparkles className="h-3.5 w-3.5" /> Comunidad local del Maule
            </span>
            <h1 className="mt-4 font-display text-[2.25rem] leading-[1.05] sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              Encuentra <span className="text-neon">repuestos usados</span><br />
              cerca de Linares.
            </h1>
            <p className="mt-4 text-base sm:text-lg text-zinc-300 max-w-xl leading-relaxed">
              Publica lo que <span className="text-white font-medium">necesitas</span> y recibe ofertas de vendedores, desarmadurías y cazadores locales. Sin chatear con 20 contactos en Marketplace.
            </p>

            <div className="mt-6 grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3">
              <Link to="/buscar" className="btn-primary !py-3">
                <Search className="h-4 w-4" /> Buscar
              </Link>
              <Link to="/publicar-busqueda" className="btn-secondary !py-3">
                <Megaphone className="h-4 w-4" /> Publicar
              </Link>
              <Link to="/tenant" className="btn-ghost !py-3 col-span-2 sm:col-auto">
                <Tag className="h-4 w-4" /> Vender repuesto
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-xs sm:text-sm text-zinc-400">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-neon" /> Linares · San Javier · Talca
              </span>
              <span className="hidden sm:inline">·</span>
              <span>+200 piezas activas</span>
              <span className="hidden sm:inline">·</span>
              <span>5 cazadores verificados</span>
            </div>
          </div>

          <div className="relative max-w-md mx-auto lg:max-w-none lg:mx-0 w-full">
            <div className="card p-4 sm:p-5 -rotate-2 hover:rotate-0 transition shadow-2xl">
              <div className="text-xs muted">Búsqueda activa · Linares</div>
              <div className="mt-1 font-display text-base sm:text-lg text-white">
                Foco izquierdo Nissan B16 2011
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="chip">Nissan</span>
                <span className="chip">B16</span>
                <span className="chip">2011</span>
                <span className="badge bg-rose-500/15 text-rose-300 border-rose-500/30">Urgente</span>
              </div>
              <div className="mt-3 text-sm text-zinc-300">
                Pago al tiro · Hasta <span className="text-neon font-semibold">$50.000</span>
              </div>
            </div>
            <div className="card p-4 sm:p-5 mt-3 sm:mt-4 ml-6 sm:ml-8 rotate-1 hover:rotate-0 transition shadow-2xl">
              <div className="text-xs muted">Oferta · Piezas B16 Linares</div>
              <div className="mt-1 font-display text-sm sm:text-base text-white">
                Tengo el izquierdo, mica intacta
              </div>
              <div className="mt-3 text-sm text-zinc-300">
                $45.000 · Confirmado hoy ·{' '}
                <span className="text-neon">vía WhatsApp</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
