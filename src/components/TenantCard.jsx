import { Link } from 'react-router-dom'
import { MapPin, Star, Wrench } from 'lucide-react'
import { VerifiedBadge, PlanBadge } from './StatusBadge.jsx'

export default function TenantCard({ tenant }) {
  return (
    <Link
      to={`/vendedores/${tenant.slug}`}
      className="card p-4 flex gap-4 hover:border-neon/40 transition"
    >
      <div
        className={`h-16 w-16 shrink-0 rounded-2xl bg-gradient-to-br ${tenant.accent} grid place-items-center text-carbon-950`}
      >
        <Wrench className="h-7 w-7" strokeWidth={2.5} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-base font-semibold text-white truncate">
            {tenant.name}
          </h3>
          <div className="inline-flex items-center gap-1 text-amber-300 text-xs">
            <Star className="h-3.5 w-3.5 fill-current" /> {tenant.rating}
          </div>
        </div>
        <div className="text-xs muted mt-0.5">{tenant.typeLabel}</div>
        <div className="mt-2 flex items-center gap-3 text-xs muted">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" /> {tenant.city}
          </span>
          <span>{tenant.publishedCount} publicaciones</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <VerifiedBadge verified={tenant.verified} />
          <PlanBadge plan={tenant.plan} />
        </div>
      </div>
    </Link>
  )
}
