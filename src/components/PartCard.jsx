import { Link } from 'react-router-dom'
import { MapPin, MessageCircle, Truck, Clock } from 'lucide-react'
import PartImage from './PartImage.jsx'
import { StatusBadge } from './StatusBadge.jsx'
import { formatCLP, tenantBySlug } from '../data/mockData.js'

export default function PartCard({ part }) {
  const tenant = tenantBySlug(part.tenantSlug)
  const confirmedLabel =
    part.confirmedDaysAgo === 0
      ? 'Confirmado hoy'
      : part.confirmedDaysAgo <= 3
      ? `Confirmado hace ${part.confirmedDaysAgo}d`
      : part.status === 'no_confirmado'
      ? `No confirmado · hace ${part.confirmedDaysAgo}d`
      : `Hace ${part.confirmedDaysAgo}d`

  return (
    <article className="card overflow-hidden flex flex-col group hover:border-neon/40 transition">
      <Link to={`/repuesto/${part.id}`} className="block">
        <PartImage
          category={part.category}
          count={part.images}
          className="aspect-[4/3] w-full"
          label={part.category}
          alt={part.title}
        />
      </Link>
      <div className="flex-1 flex flex-col p-4 gap-3">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/repuesto/${part.id}`} className="block">
            <h3 className="font-display text-[15px] font-semibold text-white leading-snug line-clamp-2 group-hover:text-neon transition">
              {part.title}
            </h3>
          </Link>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-display text-xl font-bold text-neon">
            {formatCLP(part.price)}
          </span>
          <StatusBadge status={part.status} />
        </div>

        <div className="flex flex-wrap gap-1.5">
          <span className="chip">{part.make}</span>
          {part.model && <span className="chip">{part.model}</span>}
          {part.yearFrom && (
            <span className="chip">
              {part.yearFrom}–{part.yearTo}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-xs muted">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" /> {part.city}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {confirmedLabel}
          </span>
        </div>

        {tenant && (
          <Link
            to={`/vendedores/${tenant.slug}`}
            className="text-xs text-zinc-400 hover:text-neon truncate"
          >
            por <span className="font-medium text-zinc-200">{tenant.name}</span>
            {tenant.verified && <span className="text-cyan-300 ml-1">✓</span>}
          </Link>
        )}

        <div className="flex items-center gap-2 pt-1">
          <Link to={`/repuesto/${part.id}`} className="btn-secondary flex-1 !py-2">
            Ver detalle
          </Link>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              alert('Demo: este botón abriría WhatsApp con un mensaje prellenado al vendedor.')
            }}
            className="btn-primary !py-2"
          >
            <MessageCircle className="h-4 w-4" />
            Consultar
          </button>
        </div>

        {part.canShip && (
          <div className="text-[11px] text-zinc-500 inline-flex items-center gap-1">
            <Truck className="h-3 w-3" /> Acepta envío
          </div>
        )}
      </div>
    </article>
  )
}
