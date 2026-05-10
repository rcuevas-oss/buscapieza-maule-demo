import { Link } from 'react-router-dom'
import { Search, Megaphone, Tag, MapPin, Sparkles, Camera } from 'lucide-react'

const heroPhotos = [
  { id: 'p-007', label: 'Butacas deportivas', tag: 'Interior', span: 'col-span-2 row-span-2' },
  { id: 'p-001', label: 'Foco Sentra B16', tag: 'Óptica', span: '' },
  { id: 'p-003', label: 'Llantas 4x100', tag: 'Llantas', span: '' },
  { id: 'p-010', label: 'Coilovers', tag: 'Suspensión', span: '' },
  { id: 'p-006', label: 'Alternador Swift', tag: 'Eléctrico', span: '' }
]

export default function Hero() {
  const base = import.meta.env.BASE_URL

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
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-center">
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

          {/* Mosaico de piezas reales + card flotante */}
          <div className="relative w-full">
            <div className="relative grid grid-cols-3 grid-rows-3 gap-2 sm:gap-3 aspect-[4/3] sm:aspect-[5/4]">
              {heroPhotos.map((p, i) => (
                <figure
                  key={p.id}
                  className={`relative overflow-hidden rounded-xl border border-carbon-700/70 bg-carbon-900 shadow-xl transition-transform duration-500 hover:-translate-y-0.5 hover:border-neon/40 ${p.span}`}
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <img
                    src={`${base}img/parts/${p.id}.jpg`}
                    alt={p.label}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2 sm:p-3">
                    <div className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.16em] text-neon">
                      {p.tag}
                    </div>
                    <div className="mt-0.5 font-display text-[11px] sm:text-xs text-white truncate">
                      {p.label}
                    </div>
                  </div>
                </figure>
              ))}
            </div>

            {/* Pill flotante "búsqueda activa" superpuesta */}
            <div className="hidden sm:block absolute -bottom-3 -left-3 lg:-left-6 max-w-[260px] card p-3 shadow-2xl border-neon/30 bg-carbon-900/95 backdrop-blur">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-neon">
                <span className="relative inline-flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
                </span>
                Búsqueda activa · Linares
              </div>
              <div className="mt-1 font-display text-sm text-white leading-tight">
                Foco izquierdo Nissan B16 2011
              </div>
              <div className="mt-1 text-xs text-zinc-300">
                Hasta <span className="text-neon font-semibold">$50.000</span> · Pago al tiro
              </div>
            </div>

            {/* Pill flotante "oferta recibida" arriba derecha */}
            <div className="hidden lg:block absolute -top-3 -right-3 max-w-[240px] card p-3 shadow-2xl border-cyan-500/30 bg-carbon-900/95 backdrop-blur">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-cyan-300">
                <Camera className="h-3 w-3" /> Oferta recibida
              </div>
              <div className="mt-1 font-display text-xs text-white leading-tight">
                Tengo el izquierdo, mica intacta
              </div>
              <div className="mt-1 text-[11px] text-zinc-300">
                $45.000 · Confirmado hoy
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
