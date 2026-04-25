import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Megaphone, Upload, CheckCircle2, ArrowLeft } from 'lucide-react'
import { cities, popularCars, urgencyMeta } from '../data/mockData.js'

export default function PublishRequest() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    whatsapp: '',
    city: 'Linares',
    make: '',
    model: '',
    year: '',
    engine: '',
    part: '',
    budget: '',
    urgency: 'media',
    acceptShipping: 'si',
    description: '',
    photoName: ''
  })
  const [errors, setErrors] = useState({})

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }))

  const onSubmit = (e) => {
    e.preventDefault()
    const next = {}
    if (!form.name.trim()) next.name = 'Requerido'
    if (!form.whatsapp.trim()) next.whatsapp = 'Requerido'
    if (!form.part.trim()) next.part = 'Cuéntanos qué pieza buscas'
    if (!form.make.trim()) next.make = 'Requerido'
    setErrors(next)
    if (Object.keys(next).length === 0) setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <div className="card p-10">
          <div className="mx-auto h-16 w-16 grid place-items-center rounded-full bg-neon/15 text-neon">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h1 className="mt-5 font-display text-2xl text-white">
            Búsqueda publicada en modo demo
          </h1>
          <p className="muted mt-2 text-sm">
            En la versión real, esto llegaría a vendedores y cazadores del Maule. Te avisaríamos por WhatsApp cuando alguien responda con una oferta.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Link to="/busquedas" className="btn-secondary">Ver búsquedas activas</Link>
            <Link to="/" className="btn-primary">Volver al inicio</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/" className="text-sm text-zinc-400 hover:text-white inline-flex items-center gap-1 mb-4">
        <ArrowLeft className="h-4 w-4" /> Volver
      </Link>

      <header className="mb-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/10 px-3 py-1 text-xs text-neon">
          <Megaphone className="h-3.5 w-3.5" /> Marketplace invertido
        </span>
        <h1 className="mt-3 section-title">Publicar búsqueda</h1>
        <p className="muted mt-1 text-sm">
          Cuéntanos qué pieza necesitas. Vendedores, desarmadurías y cazadores del Maule te van a leer.
        </p>
      </header>

      <form onSubmit={onSubmit} className="card p-6 space-y-6">
        <section className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label">Nombre <span className="text-rose-400">*</span></label>
            <input className="input" value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Tu nombre" />
            {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="label">WhatsApp <span className="text-rose-400">*</span></label>
            <input className="input" value={form.whatsapp} onChange={(e) => update('whatsapp', e.target.value)} placeholder="+56 9…" inputMode="tel" />
            {errors.whatsapp && <p className="text-xs text-rose-400 mt-1">{errors.whatsapp}</p>}
          </div>
          <div>
            <label className="label">Ciudad</label>
            <select className="select" value={form.city} onChange={(e) => update('city', e.target.value)}>
              {cities.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Acepta envío</label>
            <div className="flex gap-2">
              {['si', 'no'].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => update('acceptShipping', v)}
                  className={`chip cursor-pointer flex-1 justify-center !py-2 ${
                    form.acceptShipping === v ? 'bg-neon/15 border-neon/50 text-neon' : ''
                  }`}
                >
                  {v === 'si' ? 'Sí, acepto envío' : 'No, solo retiro'}
                </button>
              ))}
            </div>
          </div>
        </section>

        <hr className="border-carbon-700/60" />

        <section className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label">Marca <span className="text-rose-400">*</span></label>
            <input
              list="makes"
              className="input"
              value={form.make}
              onChange={(e) => update('make', e.target.value)}
              placeholder="Nissan, Honda, Toyota…"
            />
            <datalist id="makes">
              {[...new Set(popularCars.map((c) => c.make))].map((m) => <option key={m} value={m} />)}
            </datalist>
            {errors.make && <p className="text-xs text-rose-400 mt-1">{errors.make}</p>}
          </div>
          <div>
            <label className="label">Modelo</label>
            <input className="input" value={form.model} onChange={(e) => update('model', e.target.value)} placeholder="Sentra B16, Civic…" />
          </div>
          <div>
            <label className="label">Año</label>
            <input className="input" value={form.year} onChange={(e) => update('year', e.target.value)} placeholder="2010" inputMode="numeric" />
          </div>
          <div>
            <label className="label">Motor o versión</label>
            <input className="input" value={form.engine} onChange={(e) => update('engine', e.target.value)} placeholder="1.6 GA16, 1.5 NZ…" />
          </div>
        </section>

        <hr className="border-carbon-700/60" />

        <section className="space-y-4">
          <div>
            <label className="label">Pieza buscada <span className="text-rose-400">*</span></label>
            <input
              className="input"
              value={form.part}
              onChange={(e) => update('part', e.target.value)}
              placeholder="Foco delantero derecho, parachoque, butacas…"
            />
            {errors.part && <p className="text-xs text-rose-400 mt-1">{errors.part}</p>}
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label">Presupuesto máximo (CLP)</label>
              <input className="input" value={form.budget} onChange={(e) => update('budget', e.target.value)} placeholder="50000" inputMode="numeric" />
            </div>
            <div>
              <label className="label">Urgencia</label>
              <div className="flex gap-2">
                {Object.entries(urgencyMeta).map(([key, meta]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => update('urgency', key)}
                    className={`chip cursor-pointer flex-1 justify-center !py-2 ${
                      form.urgency === key ? meta.color : ''
                    }`}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div>
            <label className="label">Descripción adicional</label>
            <textarea
              className="input min-h-[110px]"
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              placeholder="Detalles que ayuden al vendedor a saber si tiene lo que buscas."
            />
          </div>
          <div>
            <label className="label">Foto referencial (opcional)</label>
            <label className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-carbon-700 bg-carbon-900/40 px-4 py-6 text-sm text-zinc-400 cursor-pointer hover:border-neon/40 hover:text-neon transition">
              <Upload className="h-4 w-4" />
              {form.photoName || 'Subir foto referencial (visual, no se guarda)'}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => update('photoName', e.target.files?.[0]?.name || '')}
              />
            </label>
          </div>
        </section>

        <div className="flex items-center justify-between gap-3 pt-2">
          <p className="text-xs muted max-w-md">
            Maqueta visual: este formulario no envía datos a un servidor. Solo muestra el flujo.
          </p>
          <button type="submit" className="btn-primary">
            <Megaphone className="h-4 w-4" /> Publicar búsqueda
          </button>
        </div>
      </form>
    </div>
  )
}
