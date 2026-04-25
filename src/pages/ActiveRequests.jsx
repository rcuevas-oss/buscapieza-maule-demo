import { useMemo, useState } from 'react'
import { Search, Flame, MapPin } from 'lucide-react'
import RequestCard from '../components/RequestCard.jsx'
import { requests, cities } from '../data/mockData.js'

export default function ActiveRequests() {
  const [q, setQ] = useState('')
  const [city, setCity] = useState('')
  const [urgency, setUrgency] = useState('')
  const [tab, setTab] = useState('all')

  const filtered = useMemo(() => {
    return requests.filter((r) => {
      if (q && !r.title.toLowerCase().includes(q.toLowerCase())) return false
      if (city && r.city !== city) return false
      if (urgency && r.urgency !== urgency) return false
      if (tab === 'urgent' && r.urgency !== 'alta') return false
      if (tab === 'unanswered' && r.offers > 0) return false
      return true
    })
  }, [q, city, urgency, tab])

  const urgentNearLinares = requests.filter(
    (r) => r.urgency === 'alta' && ['Linares', 'San Javier', 'Parral'].includes(r.city)
  )

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-6">
        <h1 className="section-title">Búsquedas activas</h1>
        <p className="muted text-sm mt-1">
          Compradores del Maule esperando ofertas. Si tienes la pieza, responde con tu propuesta.
        </p>
      </header>

      {urgentNearLinares.length > 0 && (
        <section className="card p-5 mb-6 border-rose-500/30 bg-rose-500/[0.04]">
          <div className="flex items-center gap-2 text-rose-300 font-display font-semibold">
            <Flame className="h-4 w-4" /> Búsquedas urgentes cerca de Linares
          </div>
          <div className="mt-3 grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {urgentNearLinares.map((r) => (
              <RequestCard key={r.id} request={r} compact />
            ))}
          </div>
        </section>
      )}

      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Foco B16, llantas 4x100, butacas…"
            className="input !pl-10"
          />
        </div>
        <select className="select max-w-[180px]" value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="">Todo el Maule</option>
          {cities.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select className="select max-w-[180px]" value={urgency} onChange={(e) => setUrgency(e.target.value)}>
          <option value="">Cualquier urgencia</option>
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>
      </div>

      <div className="flex gap-1 mb-5 border-b border-carbon-800/80">
        {[
          { key: 'all', label: 'Todas' },
          { key: 'urgent', label: 'Urgentes' },
          { key: 'unanswered', label: 'Sin ofertas aún' }
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2.5 text-sm border-b-2 transition ${
              tab === t.key
                ? 'border-neon text-neon'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="card p-10 text-center">
          <div className="text-zinc-300 font-display text-lg">Sin búsquedas que coincidan</div>
          <p className="muted text-sm mt-1">
            Cambia los filtros o vuelve más tarde — los compradores publican todos los días.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((r) => (
            <RequestCard key={r.id} request={r} />
          ))}
        </div>
      )}

      <div className="mt-8 text-xs muted inline-flex items-center gap-1">
        <MapPin className="h-3.5 w-3.5" /> Cobertura: Linares · San Javier · Parral · Talca · Longaví · Yerbas Buenas
      </div>
    </div>
  )
}
