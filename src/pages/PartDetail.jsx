import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft, MessageCircle, Heart, Flag, MapPin, Truck,
  ShieldCheck, Clock, AlertTriangle, ChevronLeft, ChevronRight, Wrench, Star
} from 'lucide-react'
import { partById, tenantBySlug, formatCLP } from '../data/mockData.js'
import { StatusBadge, VerifiedBadge } from '../components/StatusBadge.jsx'
import PartImage from '../components/PartImage.jsx'

export default function PartDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const part = partById(id)
  const [active, setActive] = useState(0)
  const [saved, setSaved] = useState(false)

  if (!part) {
    return (
      <div className="mx-auto max-w-3xl p-10 text-center">
        <h1 className="font-display text-2xl text-white">Repuesto no encontrado</h1>
        <button onClick={() => navigate(-1)} className="btn-secondary mt-4">Volver</button>
      </div>
    )
  }

  const tenant = tenantBySlug(part.tenantSlug)
  const total = part.images || 1

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-zinc-400 hover:text-white inline-flex items-center gap-1 mb-4"
      >
        <ArrowLeft className="h-4 w-4" /> Volver
      </button>

      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8">
        <div>
          <div className="card overflow-hidden relative">
            <PartImage
              partId={part.id}
              category={part.category}
              count={total}
              className="aspect-[4/3] w-full"
              label={`${active + 1} / ${total}`}
              alt={part.title}
              variant="hero"
            />
            {total > 1 && (
              <>
                <button
                  onClick={() => setActive((a) => (a - 1 + total) % total)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-black/60 hover:bg-black/80 text-white"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setActive((a) => (a + 1) % total)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-black/60 hover:bg-black/80 text-white"
                  aria-label="Siguiente"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {Array.from({ length: total }).map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Ver foto ${i + 1}`}
                className={`overflow-hidden rounded-lg border ${
                  active === i ? 'border-neon shadow-neon' : 'border-carbon-700/60'
                }`}
              >
                <PartImage
                  partId={part.id}
                  category={part.category}
                  className="aspect-square w-full"
                  alt=""
                />
              </button>
            ))}
          </div>

          <section className="card p-6 mt-6">
            <h2 className="font-display text-lg font-semibold text-white">Descripción</h2>
            <p className="mt-3 text-sm text-zinc-300 leading-relaxed">{part.description}</p>
          </section>

          <section className="card p-6 mt-6">
            <h2 className="font-display text-lg font-semibold text-white">Compatibilidad</h2>
            <dl className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-wider muted">Marca</dt>
                <dd className="text-white mt-0.5">{part.make}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider muted">Modelo</dt>
                <dd className="text-white mt-0.5">{part.model || '—'}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider muted">Año</dt>
                <dd className="text-white mt-0.5">
                  {part.yearFrom ? `${part.yearFrom}–${part.yearTo}` : 'Universal'}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider muted">Motor</dt>
                <dd className="text-white mt-0.5">{part.engine || '—'}</dd>
              </div>
            </dl>
          </section>
        </div>

        <aside className="space-y-4">
          <div className="card p-6">
            <StatusBadge status={part.status} />
            <h1 className="mt-3 font-display text-2xl md:text-3xl font-semibold text-white leading-tight">
              {part.title}
            </h1>
            <div className="mt-2 flex items-center gap-3 text-sm muted">
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-4 w-4" /> {part.city}
              </span>
              {part.canShip && (
                <span className="inline-flex items-center gap-1">
                  <Truck className="h-4 w-4" /> Acepta envío
                </span>
              )}
            </div>
            <div className="mt-5 font-display text-4xl font-bold text-neon">
              {formatCLP(part.price)}
            </div>

            <div className={`mt-4 rounded-xl border p-3 text-sm flex items-start gap-2 ${
              part.status === 'no_confirmado'
                ? 'border-rose-500/30 bg-rose-500/10 text-rose-200'
                : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200'
            }`}>
              {part.status === 'no_confirmado' ? (
                <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
              ) : (
                <ShieldCheck className="h-4 w-4 mt-0.5 shrink-0" />
              )}
              <div>
                {part.status === 'no_confirmado'
                  ? `Disponibilidad no confirmada hace ${part.confirmedDaysAgo} días`
                  : part.confirmedDaysAgo === 0
                  ? 'Disponibilidad confirmada hoy'
                  : `Disponibilidad confirmada hace ${part.confirmedDaysAgo} día${part.confirmedDaysAgo === 1 ? '' : 's'}`}
              </div>
            </div>

            <div className="mt-5 grid gap-2">
              <button
                onClick={() => alert('Demo: abriría WhatsApp con un mensaje prellenado al vendedor.')}
                className="btn-primary !py-3"
              >
                <MessageCircle className="h-5 w-5" />
                Consultar por WhatsApp
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSaved((s) => !s)}
                  className={saved ? 'btn-primary !py-2' : 'btn-secondary !py-2'}
                >
                  <Heart className={`h-4 w-4 ${saved ? 'fill-current' : ''}`} />
                  {saved ? 'Guardado' : 'Guardar'}
                </button>
                <button
                  onClick={() => alert('Demo: este flujo enviaría el reporte al panel admin.')}
                  className="btn-ghost !py-2"
                >
                  <Flag className="h-4 w-4" />
                  Reportar
                </button>
              </div>
            </div>
          </div>

          {tenant && (
            <Link to={`/vendedores/${tenant.slug}`} className="card p-5 block hover:border-neon/40 transition">
              <div className="flex items-center gap-3">
                <div className={`h-12 w-12 shrink-0 rounded-xl bg-gradient-to-br ${tenant.accent} grid place-items-center text-carbon-950`}>
                  <Wrench className="h-5 w-5" strokeWidth={2.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-display text-base font-semibold text-white truncate">
                    {tenant.name}
                  </div>
                  <div className="text-xs muted">{tenant.typeLabel} · {tenant.city}</div>
                </div>
                <div className="inline-flex items-center gap-1 text-amber-300 text-xs">
                  <Star className="h-3.5 w-3.5 fill-current" /> {tenant.rating}
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <VerifiedBadge verified={tenant.verified} />
                <span className="chip">{tenant.publishedCount} publicaciones</span>
              </div>
              <div className="mt-3 text-xs text-zinc-400">
                Especialidad: <span className="text-zinc-200">{tenant.specialty}</span>
              </div>
            </Link>
          )}

          <div className="card p-4 text-xs muted flex items-start gap-2">
            <Clock className="h-4 w-4 mt-0.5 shrink-0 text-zinc-500" />
            <div>
              Publicado hace {part.publishedDaysAgo === 0 ? 'menos de un día' : `${part.publishedDaysAgo} días`}.
              Última confirmación de disponibilidad hace {part.confirmedDaysAgo} día{part.confirmedDaysAgo === 1 ? '' : 's'}.
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
