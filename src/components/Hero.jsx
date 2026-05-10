import { Link } from 'react-router-dom'
import { Search, Megaphone, Tag, MapPin, Sparkles, Camera } from 'lucide-react'

export default function Hero() {
  const base = import.meta.env.BASE_URL

  return (
    <section className="relative isolate overflow-hidden border-b border-carbon-800/80">
      {/* Foto del auto a pantalla completa */}
      <img
        src={`${base}img/hero-car.jpg`}
        alt=""
        aria-hidden
        loading="eager"
        fetchpriority="high"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[70%_center]"
      />

      {/* Gradient izquierda → derecha para legibilidad del texto */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-carbon-950 via-carbon-950/85 to-carbon-950/20 sm:via-carbon-950/70 sm:to-transparent"
      />
      {/* Gradient inferior para el borde con la grilla */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-carbon-950 to-transparent"
      />
      {/* Glow neon arriba derecha sobre el auto */}
      <div
        aria-hidden
        className="absolute -right-24 -top-24 -z-10 h-[420px] w-[420px] rounded-full bg-orange-500/10 blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32 min-h-[560px] md:min-h-[640px] flex">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 items-center w-full">
          {/* Columna izquierda — texto */}
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/10 backdrop-blur px-3 py-1 text-xs text-neon">
              <Sparkles className="h-3.5 w-3.5" /> Comunidad local del Maule
            </span>
            <h1 className="mt-5 font-display text-[2.5rem] leading-[0.98] sm:text-5xl lg:text-[68px] font-bold tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
              Encuentra <span className="text-neon">repuestos usados</span><br />
              cerca de Linares.
            </h1>
            <p className="mt-5 text-base sm:text-lg text-zinc-200 max-w-xl leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
              Publica lo que <span className="text-white font-medium">necesitas</span> y recibe ofertas de vendedores, desarmadurías y cazadores locales. Sin chatear con 20 contactos en Marketplace.
            </p>

            <div className="mt-7 grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3">
              <Link to="/buscar" className="btn-primary !py-3 shadow-xl shadow-orange-500/20">
                <Search className="h-4 w-4" /> Buscar
              </Link>
              <Link to="/publicar-busqueda" className="btn-secondary !py-3 backdrop-blur">
                <Megaphone className="h-4 w-4" /> Publicar
              </Link>
              <Link to="/tenant" className="btn-ghost !py-3 col-span-2 sm:col-auto backdrop-blur">
                <Tag className="h-4 w-4" /> Vender repuesto
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap gap-x-4 gap-y-2 text-xs sm:text-sm text-zinc-300">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-neon" /> Linares · San Javier · Talca
              </span>
              <span className="hidden sm:inline opacity-50">·</span>
              <span>+200 piezas activas</span>
              <span className="hidden sm:inline opacity-50">·</span>
              <span>5 cazadores verificados</span>
            </div>
          </div>

          {/* Columna derecha — pills flotantes sobre la foto del auto (solo desktop) */}
          <div className="relative hidden lg:flex flex-col gap-4 items-end">
            <div className="card p-3.5 max-w-[280px] shadow-2xl border-neon/30 bg-carbon-950/80 backdrop-blur-md -rotate-1">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-neon">
                <span className="relative inline-flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
                </span>
                Búsqueda activa · Linares
              </div>
              <div className="mt-1.5 font-display text-sm text-white leading-tight">
                Foco izquierdo Nissan B16 2011
              </div>
              <div className="mt-1 text-xs text-zinc-300">
                Hasta <span className="text-neon font-semibold">$50.000</span> · Pago al tiro
              </div>
            </div>

            <div className="card p-3.5 max-w-[260px] shadow-2xl border-cyan-500/30 bg-carbon-950/80 backdrop-blur-md rotate-1 ml-12">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-cyan-300">
                <Camera className="h-3 w-3" /> Oferta recibida
              </div>
              <div className="mt-1.5 font-display text-xs text-white leading-tight">
                Tengo el izquierdo, mica intacta
              </div>
              <div className="mt-1 text-[11px] text-zinc-300">
                $45.000 · Confirmado hoy · vía WhatsApp
              </div>
            </div>

            <div className="card p-3 max-w-[220px] shadow-2xl border-orange-500/30 bg-carbon-950/80 backdrop-blur-md -rotate-1 mr-6">
              <div className="text-[10px] uppercase tracking-wider text-orange-300">
                Confirmado hace 2h
              </div>
              <div className="mt-1 font-display text-xs text-white leading-tight">
                Llantas aro 15 4x100 (juego)
              </div>
              <div className="mt-1 text-[11px] text-zinc-300">
                $180.000 · Acepta envío
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
