import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, XCircle, Lightbulb, Shield, CircleDot, Cog, Box, Armchair, Gauge, Flame, Zap, Car, MessageSquareReply } from 'lucide-react'
import Hero from '../components/Hero.jsx'
import RequestCard from '../components/RequestCard.jsx'
import { categories, popularCars, requests } from '../data/mockData.js'

const iconMap = { Lightbulb, Shield, CircleDot, Cog, Box, Armchair, Gauge, Flame, Zap, Car }

export default function Home() {
  const activeRequests = requests.slice(0, 3)

  return (
    <>
      <Hero />

      {/* Categorías */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="section-title">Categorías populares</h2>
            <p className="muted text-sm mt-1">Encuentra lo que tu auto necesita.</p>
          </div>
          <Link to="/buscar" className="link-neon text-sm inline-flex items-center gap-1">
            Ver todas <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] || Cog
            return (
              <Link
                key={cat.slug}
                to={`/buscar?cat=${cat.slug}`}
                className="card p-4 flex flex-col items-center justify-center gap-2 hover:border-neon/40 hover:bg-carbon-800/60 transition aspect-square"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-neon/10 text-neon">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-sm text-zinc-200">{cat.label}</span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Autos populares */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="section-title">Autos populares en el Maule</h2>
            <p className="muted text-sm mt-1">Los modelos que más se buscan por aquí.</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {popularCars.map((car) => (
            <Link
              key={car.tag}
              to={`/buscar?make=${encodeURIComponent(car.make)}`}
              className="group card px-4 py-3 hover:border-neon/40 transition flex items-center gap-3"
            >
              <span className="text-2xl leading-none">{car.emoji}</span>
              <div>
                <div className="text-xs muted">{car.make}</div>
                <div className="font-display text-sm text-white group-hover:text-neon">{car.model}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="section-title text-center">Cómo funciona</h2>
        <p className="muted text-sm mt-1 text-center">3 pasos. Sin vueltas.</p>

        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {[
            {
              n: '01',
              title: 'Publica la pieza que buscas',
              text: 'Cuéntanos qué necesitas, para qué auto y tu presupuesto. Toma menos de 1 minuto.'
            },
            {
              n: '02',
              title: 'Recibe respuestas locales',
              text: 'Vendedores, desarmadurías y cazadores del Maule responden con ofertas y fotos.'
            },
            {
              n: '03',
              title: 'Coordina por WhatsApp',
              text: 'Hablas directo con el vendedor. Retiro local, envío o boleta — tú eliges.'
            }
          ].map((step) => (
            <div key={step.n} className="card p-6">
              <div className="font-display text-4xl font-bold text-neon">{step.n}</div>
              <h3 className="mt-2 font-display text-lg text-white">{step.title}</h3>
              <p className="muted text-sm mt-1">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Búsquedas activas */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="section-title">Búsquedas activas cerca de ti</h2>
            <p className="muted text-sm mt-1">Compradores del Maule esperando ofertas.</p>
          </div>
          <Link to="/busquedas" className="link-neon text-sm inline-flex items-center gap-1">
            Ver todas <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {activeRequests.map((r) => (
            <RequestCard key={r.id} request={r} compact />
          ))}
        </div>
      </section>

      {/* Comparativa */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="section-title text-center">¿Por qué no usar Marketplace?</h2>
        <p className="muted text-sm mt-2 text-center max-w-2xl mx-auto">
          Marketplace está lleno de repuestos, pero también de problemas. BuscaPieza Maule existe para resolverlos.
        </p>
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <div className="card p-6 border-rose-500/20">
            <div className="text-rose-400 inline-flex items-center gap-2 font-display text-base font-semibold">
              <XCircle className="h-5 w-5" /> Facebook Marketplace
            </div>
            <ul className="mt-4 space-y-2.5 text-sm text-zinc-300">
              <li className="flex gap-2"><XCircle className="h-4 w-4 text-rose-400 mt-0.5 shrink-0" /> Publicaciones mezcladas con todo</li>
              <li className="flex gap-2"><XCircle className="h-4 w-4 text-rose-400 mt-0.5 shrink-0" /> Difícil filtrar por auto/modelo/año</li>
              <li className="flex gap-2"><XCircle className="h-4 w-4 text-rose-400 mt-0.5 shrink-0" /> Stock desactualizado</li>
              <li className="flex gap-2"><XCircle className="h-4 w-4 text-rose-400 mt-0.5 shrink-0" /> Sin reputación por rubro</li>
              <li className="flex gap-2"><XCircle className="h-4 w-4 text-rose-400 mt-0.5 shrink-0" /> Tienes que escribir uno por uno</li>
            </ul>
          </div>
          <div className="card p-6 border-neon/40 bg-neon/[0.03]">
            <div className="text-neon inline-flex items-center gap-2 font-display text-base font-semibold">
              <CheckCircle2 className="h-5 w-5" /> BuscaPieza Maule
            </div>
            <ul className="mt-4 space-y-2.5 text-sm text-zinc-200">
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-neon mt-0.5 shrink-0" /> Solo repuestos, nada más</li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-neon mt-0.5 shrink-0" /> Filtros por marca, modelo, motor y año</li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-neon mt-0.5 shrink-0" /> Confirmación visible de disponibilidad</li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-neon mt-0.5 shrink-0" /> Vendedores y cazadores locales con reputación</li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-neon mt-0.5 shrink-0" /> Publicas una búsqueda y te llegan ofertas</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="card p-8 md:p-12 border-neon/40 bg-gradient-to-br from-carbon-900 to-carbon-850">
          <div className="grid md:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-semibold text-white">
                ¿No encontraste tu pieza?
              </h3>
              <p className="muted mt-2">
                Publica una búsqueda en 30 segundos. Los cazadores del Maule te van a leer.
              </p>
            </div>
            <Link to="/publicar-busqueda" className="btn-primary text-base !px-6 !py-3">
              <MessageSquareReply className="h-5 w-5" /> Publicar mi búsqueda
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
