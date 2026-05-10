import { Link } from 'react-router-dom'
import { MapPin, MessageSquareReply, Clock, Banknote } from 'lucide-react'
import { UrgencyBadge } from './StatusBadge.jsx'
import Avatar from './Avatar.jsx'
import { formatCLP } from '../data/mockData.js'

export default function RequestCard({ request, compact = false }) {
  return (
    <article className="card p-4 flex flex-col gap-3 hover:border-neon/40 transition">
      <div className="flex items-start gap-3">
        <Avatar name={request.author} size="md" showStatus />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-[15px] font-semibold text-white leading-snug">
              {request.title}
            </h3>
            <UrgencyBadge urgency={request.urgency} />
          </div>
          <div className="mt-1 text-xs muted">
            <span className="text-zinc-200 font-medium">{request.author}</span>{' '}
            · publicado{' '}
            {request.publishedDaysAgo === 0
              ? 'hoy'
              : `hace ${request.publishedDaysAgo}d`}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <span className="chip">{request.make}</span>
        {request.model && <span className="chip">{request.model}</span>}
        {request.year && <span className="chip">{request.year}</span>}
        {request.engine && <span className="chip">{request.engine}</span>}
      </div>

      {!compact && request.description && (
        <p className="text-sm text-zinc-300 line-clamp-2">{request.description}</p>
      )}

      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="flex items-center gap-1.5 muted">
          <MapPin className="h-3.5 w-3.5" /> {request.city}
        </div>
        <div className="flex items-center gap-1.5 muted">
          <Banknote className="h-3.5 w-3.5" /> Hasta {formatCLP(request.budget)}
        </div>
        <div className="flex items-center gap-1.5 muted justify-end">
          <Clock className="h-3.5 w-3.5" /> {request.offers} ofertas
        </div>
      </div>

      <Link to={`/responder/${request.id}`} className="btn-primary !py-2 mt-1">
        <MessageSquareReply className="h-4 w-4" />
        Responder con oferta
      </Link>
    </article>
  )
}
