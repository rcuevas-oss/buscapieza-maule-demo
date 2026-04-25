import { Routes, Route, Link } from 'react-router-dom'
import {
  Megaphone, Package, MessageCircle, Heart, User, Plus,
  ArrowUpRight, Star
} from 'lucide-react'
import DashboardLayout, { MetricCard } from '../components/DashboardLayout.jsx'
import RequestCard from '../components/RequestCard.jsx'
import PartCard from '../components/PartCard.jsx'
import { dummyUser, requests, parts, offersForRequest, tenantBySlug, formatCLP } from '../data/mockData.js'

function Overview() {
  const myRequests = requests.slice(0, 2)
  const recentOffers = offersForRequest

  return (
    <DashboardLayout
      scope="user"
      title={`Hola, ${dummyUser.name.split(' ')[0]} 👋`}
      subtitle={`Estás en tu panel de comprador · ${dummyUser.city}`}
      headerExtras={
        <Link to="/publicar-busqueda" className="btn-primary">
          <Plus className="h-4 w-4" /> Nueva búsqueda
        </Link>
      }
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <MetricCard label="Búsquedas activas" value={dummyUser.metrics.activeRequests} hint="Esperando ofertas" icon={Megaphone} />
        <MetricCard label="Repuestos publicados" value={dummyUser.metrics.publishedParts} hint="Como vendedor" icon={Package} />
        <MetricCard label="Ofertas recibidas" value={dummyUser.metrics.receivedOffers} hint="En tus búsquedas" icon={MessageCircle} />
        <MetricCard label="Contactos generados" value={dummyUser.metrics.contactsGenerated} hint="Vía WhatsApp" icon={ArrowUpRight} />
      </div>

      <section className="mb-8">
        <div className="flex items-end justify-between mb-3">
          <h2 className="font-display text-lg font-semibold text-white">Mis búsquedas activas</h2>
          <Link to="/dashboard/busquedas" className="link-neon text-sm">Ver todas</Link>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {myRequests.map((r) => <RequestCard key={r.id} request={r} compact />)}
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between mb-3">
          <h2 className="font-display text-lg font-semibold text-white">Ofertas recientes</h2>
          <Link to="/dashboard/ofertas" className="link-neon text-sm">Ver todas</Link>
        </div>
        <div className="card divide-y divide-carbon-700/60">
          {recentOffers.map((o) => {
            const tenant = tenantBySlug(o.tenantSlug)
            return (
              <div key={o.id} className="p-4 flex items-start gap-4">
                <div className={`h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br ${tenant?.accent} grid place-items-center text-carbon-950 font-bold`}>
                  {tenant?.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display text-sm font-semibold text-white">{tenant?.name}</span>
                    <span className="font-display text-base font-bold text-neon">{formatCLP(o.price)}</span>
                  </div>
                  <p className="mt-1 text-sm text-zinc-300">{o.message}</p>
                  <div className="mt-1.5 text-xs muted">
                    {o.city} · {o.state} · {o.canShip ? 'envía' : 'solo retiro'}
                  </div>
                </div>
                <button
                  onClick={() => alert('Demo: abriría el chat de WhatsApp con el vendedor.')}
                  className="btn-primary !py-2"
                >
                  Contactar
                </button>
              </div>
            )
          })}
        </div>
      </section>
    </DashboardLayout>
  )
}

function MyRequests() {
  return (
    <DashboardLayout scope="user" title="Mis búsquedas" subtitle="Lo que estás buscando">
      <div className="grid md:grid-cols-2 gap-4">
        {requests.slice(0, 3).map((r) => <RequestCard key={r.id} request={r} />)}
      </div>
    </DashboardLayout>
  )
}

function MyPublications() {
  const mine = parts.filter((p) => p.tenantSlug === dummyUser.tenantSlug)
  return (
    <DashboardLayout
      scope="user"
      title="Mis publicaciones"
      subtitle="Repuestos que estás vendiendo"
      headerExtras={
        <button
          onClick={() => alert('Demo: abriría el formulario de publicación de repuesto.')}
          className="btn-primary"
        >
          <Plus className="h-4 w-4" /> Publicar repuesto
        </button>
      }
    >
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {mine.map((p) => <PartCard key={p.id} part={p} />)}
      </div>
    </DashboardLayout>
  )
}

function MyOffers() {
  return (
    <DashboardLayout scope="user" title="Ofertas recibidas" subtitle="Respuestas a tus búsquedas">
      <div className="card divide-y divide-carbon-700/60">
        {offersForRequest.map((o) => {
          const tenant = tenantBySlug(o.tenantSlug)
          return (
            <div key={o.id} className="p-4 flex items-start gap-4">
              <div className={`h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br ${tenant?.accent} grid place-items-center text-carbon-950 font-bold`}>
                {tenant?.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display text-sm font-semibold text-white">{tenant?.name}</div>
                <p className="mt-1 text-sm text-zinc-300">{o.message}</p>
                <div className="mt-1.5 text-xs muted">{o.city} · {formatCLP(o.price)}</div>
              </div>
              <div className="inline-flex items-center gap-1 text-amber-300 text-xs">
                <Star className="h-3.5 w-3.5 fill-current" /> {tenant?.rating}
              </div>
            </div>
          )
        })}
      </div>
    </DashboardLayout>
  )
}

function Favorites() {
  const favs = parts.slice(0, 4)
  return (
    <DashboardLayout scope="user" title="Favoritos" subtitle="Repuestos guardados">
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {favs.map((p) => <PartCard key={p.id} part={p} />)}
      </div>
    </DashboardLayout>
  )
}

function Profile() {
  return (
    <DashboardLayout scope="user" title="Perfil" subtitle="Tus datos de contacto">
      <div className="card p-6 space-y-4 max-w-xl">
        <div>
          <label className="label">Nombre</label>
          <input className="input" defaultValue={dummyUser.name} />
        </div>
        <div>
          <label className="label">Email</label>
          <input className="input" defaultValue={dummyUser.email} />
        </div>
        <div>
          <label className="label">WhatsApp</label>
          <input className="input" defaultValue={dummyUser.whatsapp} />
        </div>
        <div>
          <label className="label">Ciudad</label>
          <input className="input" defaultValue={dummyUser.city} />
        </div>
        <button
          onClick={() => alert('Demo: guardaría los cambios de perfil.')}
          className="btn-primary"
        >
          Guardar cambios
        </button>
      </div>
    </DashboardLayout>
  )
}

export default function UserDashboard() {
  return (
    <Routes>
      <Route index element={<Overview />} />
      <Route path="busquedas" element={<MyRequests />} />
      <Route path="publicaciones" element={<MyPublications />} />
      <Route path="ofertas" element={<MyOffers />} />
      <Route path="favoritos" element={<Favorites />} />
      <Route path="perfil" element={<Profile />} />
    </Routes>
  )
}
