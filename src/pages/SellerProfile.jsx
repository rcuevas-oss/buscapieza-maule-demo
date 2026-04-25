import { Link, useParams, useNavigate } from 'react-router-dom'
import { Wrench, MapPin, Star, MessageCircle, ArrowLeft, Calendar } from 'lucide-react'
import PartCard from '../components/PartCard.jsx'
import { VerifiedBadge, PlanBadge } from '../components/StatusBadge.jsx'
import { tenantBySlug, partsByTenant } from '../data/mockData.js'

const fakeReviews = [
  { author: 'Diego P.', rating: 5, text: 'Llegó la pieza en 2 días, todo perfecto. Recomendado.', daysAgo: 4 },
  { author: 'Camila S.', rating: 5, text: 'El cazador respondió al toque por WhatsApp.', daysAgo: 9 },
  { author: 'Felipe R.', rating: 4, text: 'Buena onda, llegó con un detalle menor pero acordamos rebaja.', daysAgo: 18 }
]

export default function SellerProfile() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const tenant = tenantBySlug(slug)

  if (!tenant) {
    return (
      <div className="mx-auto max-w-3xl p-10 text-center">
        <h1 className="font-display text-2xl text-white">Vendedor no encontrado</h1>
        <button onClick={() => navigate(-1)} className="btn-secondary mt-4">Volver</button>
      </div>
    )
  }

  const tenantParts = partsByTenant(tenant.slug)

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-zinc-400 hover:text-white inline-flex items-center gap-1 mb-4"
      >
        <ArrowLeft className="h-4 w-4" /> Volver
      </button>

      <div className={`relative overflow-hidden rounded-3xl border border-carbon-700/60 p-6 md:p-10 bg-gradient-to-br ${tenant.accent}`}>
        <div className="absolute inset-0 bg-carbon-950/85" />
        <div className="relative z-10 flex flex-wrap items-start gap-6">
          <div className={`h-20 w-20 shrink-0 rounded-3xl bg-gradient-to-br ${tenant.accent} grid place-items-center text-carbon-950 shadow-2xl`}>
            <Wrench className="h-9 w-9" strokeWidth={2.5} />
          </div>
          <div className="flex-1 min-w-[260px]">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">{tenant.name}</h1>
              {tenant.verified && (
                <span className="badge bg-cyan-500/15 text-cyan-300 border-cyan-500/30">✓ Verificado</span>
              )}
            </div>
            <p className="mt-2 text-zinc-300 max-w-xl">{tenant.bio}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="chip"><MapPin className="h-3 w-3" /> {tenant.city}</span>
              <span className="chip">{tenant.typeLabel}</span>
              <span className="chip">
                <Star className="h-3 w-3 text-amber-400 fill-amber-400" /> {tenant.rating} ({tenant.reviewCount})
              </span>
              <PlanBadge plan={tenant.plan} />
              <VerifiedBadge verified={tenant.verified} />
            </div>
          </div>
          <button
            onClick={() => alert(`Demo: abriría WhatsApp con ${tenant.whatsapp}`)}
            className="btn-primary"
          >
            <MessageCircle className="h-4 w-4" /> Contactar
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-8 mt-8">
        <main>
          <section>
            <div className="flex items-end justify-between mb-3">
              <h2 className="font-display text-xl font-semibold text-white">
                Publicaciones activas ({tenantParts.length})
              </h2>
              <Link to="/buscar" className="link-neon text-sm">Ver más en el marketplace</Link>
            </div>
            {tenantParts.length === 0 ? (
              <div className="card p-8 text-center muted">Este vendedor no tiene publicaciones activas.</div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {tenantParts.map((p) => <PartCard key={p.id} part={p} />)}
              </div>
            )}
          </section>

          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold text-white mb-3">Reseñas</h2>
            <div className="card divide-y divide-carbon-700/60">
              {fakeReviews.map((r, i) => (
                <div key={i} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-white font-medium">{r.author}</div>
                    <div className="inline-flex gap-0.5 text-amber-400">
                      {Array.from({ length: r.rating }).map((_, k) => (
                        <Star key={k} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-zinc-300">{r.text}</p>
                  <div className="mt-1 text-xs muted inline-flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> hace {r.daysAgo}d
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        <aside className="space-y-4">
          <div className="card p-5">
            <h3 className="font-display text-base font-semibold text-white">Especialidad</h3>
            <p className="mt-2 text-sm text-zinc-300">{tenant.specialty}</p>
          </div>
          <div className="card p-5">
            <h3 className="font-display text-base font-semibold text-white">Métricas públicas</h3>
            <ul className="mt-3 space-y-2 text-sm text-zinc-300">
              <li className="flex justify-between">
                <span className="muted">Publicaciones</span>
                <span className="text-white font-medium">{tenant.publishedCount}</span>
              </li>
              <li className="flex justify-between">
                <span className="muted">Búsquedas respondidas</span>
                <span className="text-white font-medium">{tenant.answeredRequests}</span>
              </li>
              <li className="flex justify-between">
                <span className="muted">Reputación</span>
                <span className="text-white font-medium">{tenant.rating} ({tenant.reviewCount})</span>
              </li>
            </ul>
          </div>
          <div className="card p-5 border-rose-500/20">
            <button
              onClick={() => alert('Demo: enviaría reporte al admin.')}
              className="btn-danger w-full"
            >
              Reportar vendedor
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}
