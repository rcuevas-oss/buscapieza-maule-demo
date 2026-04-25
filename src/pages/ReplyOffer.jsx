import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Send, Upload, ArrowLeft, CheckCircle2, MapPin, Banknote } from 'lucide-react'
import { requestById, cities, formatCLP } from '../data/mockData.js'
import { UrgencyBadge } from '../components/StatusBadge.jsx'

export default function ReplyOffer() {
  const { id } = useParams()
  const navigate = useNavigate()
  const request = requestById(id)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    message: '',
    price: '',
    city: 'Linares',
    state: 'usado bueno',
    canShip: true,
    photoName: ''
  })

  if (!request) {
    return (
      <div className="mx-auto max-w-3xl p-10 text-center">
        <h1 className="font-display text-2xl text-white">Búsqueda no encontrada</h1>
        <button onClick={() => navigate(-1)} className="btn-secondary mt-4">Volver</button>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <div className="card p-10">
          <div className="mx-auto h-16 w-16 grid place-items-center rounded-full bg-neon/15 text-neon">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h1 className="mt-5 font-display text-2xl text-white">Oferta enviada en modo demo</h1>
          <p className="muted mt-2 text-sm">
            En la versión real, le llegaría una notificación al comprador y podría iniciar la conversación por WhatsApp.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Link to="/busquedas" className="btn-secondary">Ver más búsquedas</Link>
            <Link to="/tenant/responder" className="btn-primary">Mis respuestas</Link>
          </div>
        </div>
      </div>
    )
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/busquedas" className="text-sm text-zinc-400 hover:text-white inline-flex items-center gap-1 mb-4">
        <ArrowLeft className="h-4 w-4" /> Volver a búsquedas
      </Link>

      <div className="grid md:grid-cols-[1fr_320px] gap-6">
        <form onSubmit={onSubmit} className="card p-6 space-y-5">
          <div>
            <h1 className="section-title">Responder con oferta</h1>
            <p className="muted text-sm mt-1">
              Cuéntale al comprador qué tienes, cuánto vale y cómo recibirla.
            </p>
          </div>

          <div>
            <label className="label">Mensaje</label>
            <textarea
              required
              className="input min-h-[120px]"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tengo el repuesto en buenas condiciones, te puedo enviar fotos…"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Precio (CLP)</label>
              <input
                required
                className="input"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="45000"
                inputMode="numeric"
              />
            </div>
            <div>
              <label className="label">Ciudad</label>
              <select className="select" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}>
                {cities.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Estado de la pieza</label>
              <select className="select" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })}>
                <option value="nuevo">Nuevo</option>
                <option value="usado bueno">Usado en buen estado</option>
                <option value="usado regular">Usado regular</option>
                <option value="reparable">Reparable</option>
              </select>
            </div>
            <div>
              <label className="label">¿Disponible para envío?</label>
              <div className="flex gap-2">
                {[true, false].map((v) => (
                  <button
                    key={String(v)}
                    type="button"
                    onClick={() => setForm({ ...form, canShip: v })}
                    className={`chip cursor-pointer flex-1 justify-center !py-2 ${
                      form.canShip === v ? 'bg-neon/15 border-neon/50 text-neon' : ''
                    }`}
                  >
                    {v ? 'Sí' : 'No'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="label">Foto referencial</label>
            <label className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-carbon-700 bg-carbon-900/40 px-4 py-5 text-sm text-zinc-400 cursor-pointer hover:border-neon/40 hover:text-neon transition">
              <Upload className="h-4 w-4" />
              {form.photoName || 'Subir foto (visual, no se guarda)'}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setForm({ ...form, photoName: e.target.files?.[0]?.name || '' })}
              />
            </label>
          </div>

          <div className="flex justify-end pt-2">
            <button type="submit" className="btn-primary">
              <Send className="h-4 w-4" /> Enviar oferta
            </button>
          </div>
        </form>

        <aside className="card p-5 self-start lg:sticky lg:top-20">
          <div className="text-xs uppercase tracking-widest muted">Búsqueda</div>
          <h3 className="mt-1 font-display text-base font-semibold text-white">{request.title}</h3>
          <div className="mt-2 text-xs muted">por {request.author}</div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <UrgencyBadge urgency={request.urgency} />
            <span className="chip">{request.make}</span>
            {request.year && <span className="chip">{request.year}</span>}
          </div>
          <div className="mt-4 space-y-2 text-sm text-zinc-300">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-zinc-500" /> {request.city}
              {request.acceptShipping && <span className="ml-1 chip">Acepta envío</span>}
            </div>
            <div className="flex items-center gap-1.5">
              <Banknote className="h-4 w-4 text-zinc-500" /> Hasta {formatCLP(request.budget)}
            </div>
          </div>
          <p className="mt-4 text-sm text-zinc-300 border-t border-carbon-700/60 pt-4">
            {request.description}
          </p>
        </aside>
      </div>
    </div>
  )
}
