import { statusMeta, urgencyMeta } from '../data/mockData.js'

export function StatusBadge({ status }) {
  const meta = statusMeta[status] || statusMeta.no_confirmado
  return (
    <span className={`badge ${meta.color}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
      {meta.label}
    </span>
  )
}

export function UrgencyBadge({ urgency }) {
  const meta = urgencyMeta[urgency] || urgencyMeta.baja
  return <span className={`badge ${meta.color}`}>{meta.label}</span>
}

export function PlanBadge({ plan }) {
  const map = {
    gratis: 'bg-zinc-700/40 text-zinc-300 border-zinc-600/40',
    pro: 'bg-neon/15 text-neon border-neon/30',
    desarmaduria: 'bg-orange-500/15 text-orange-300 border-orange-500/30'
  }
  const labels = { gratis: 'Plan gratis', pro: 'Plan Pro', desarmaduria: 'Plan desarmaduría' }
  return <span className={`badge ${map[plan] || map.gratis}`}>{labels[plan] || plan}</span>
}

export function VerifiedBadge({ verified }) {
  if (!verified) {
    return (
      <span className="badge bg-zinc-700/40 text-zinc-400 border-zinc-600/40">
        No verificado
      </span>
    )
  }
  return (
    <span className="badge bg-cyan-500/15 text-cyan-300 border-cyan-500/30">
      ✓ Verificado
    </span>
  )
}
