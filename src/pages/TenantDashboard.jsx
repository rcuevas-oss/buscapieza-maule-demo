import { Routes, Route, Link } from 'react-router-dom'
import { Wrench, Plus, MessageCircle, Eye, MapPin, BarChart3 } from 'lucide-react'
import DashboardLayout, { MetricCard } from '../components/DashboardLayout.jsx'
import PartCard from '../components/PartCard.jsx'
import RequestCard from '../components/RequestCard.jsx'
import { VerifiedBadge, PlanBadge, StatusBadge } from '../components/StatusBadge.jsx'
import { tenants, tenantBySlug, partsByTenant, requests, dummyUser, formatCLP } from '../data/mockData.js'

const myTenant = tenantBySlug(dummyUser.tenantSlug)

function Overview() {
  return (
    <DashboardLayout
      scope="tenant"
      title={myTenant.name}
      subtitle={`${myTenant.typeLabel} · ${myTenant.city}`}
      headerExtras={
        <Link to="/tenant/repuestos" className="btn-primary">
          <Plus className="h-4 w-4" /> Publicar repuesto
        </Link>
      }
    >
      <div className="card p-6 mb-6 flex flex-wrap items-center gap-4">
        <div className={`h-16 w-16 shrink-0 rounded-2xl bg-gradient-to-br ${myTenant.accent} grid place-items-center text-carbon-950`}>
          <Wrench className="h-7 w-7" strokeWidth={2.5} />
        </div>
        <div className="flex-1 min-w-[220px]">
          <div className="font-display text-xl text-white">{myTenant.name}</div>
          <p className="text-sm muted mt-1">{myTenant.bio}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <VerifiedBadge verified={myTenant.verified} />
            <PlanBadge plan={myTenant.plan} />
            <span className="chip"><MapPin className="h-3 w-3" /> {myTenant.city}</span>
          </div>
        </div>
        <Link to={`/vendedores/${myTenant.slug}`} className="btn-secondary">
          <Eye className="h-4 w-4" /> Ver perfil público
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <MetricCard label="Publicaciones" value={myTenant.publishedCount} hint="Activas + vendidas" icon={Wrench} />
        <MetricCard label="Búsquedas respondidas" value={myTenant.answeredRequests} hint="Histórico" icon={MessageCircle} />
        <MetricCard label="Reputación" value={myTenant.rating} hint={`${myTenant.reviewCount} reseñas`} icon={BarChart3} />
        <MetricCard label="Plan actual" value={myTenant.plan === 'pro' ? 'Pro' : myTenant.plan === 'desarmaduria' ? 'Desarmaduría' : 'Gratis'} hint="Cambia cuando quieras" icon={Wrench} />
      </div>

      <section className="mb-8">
        <div className="flex items-end justify-between mb-3">
          <h2 className="font-display text-lg font-semibold text-white">Mis repuestos publicados</h2>
          <Link to="/tenant/repuestos" className="link-neon text-sm">Administrar</Link>
        </div>
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {partsByTenant(myTenant.slug).slice(0, 3).map((p) => <PartCard key={p.id} part={p} />)}
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between mb-3">
          <h2 className="font-display text-lg font-semibold text-white">Búsquedas que podrías responder</h2>
          <Link to="/tenant/responder" className="link-neon text-sm">Ver todas</Link>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {requests.slice(0, 2).map((r) => <RequestCard key={r.id} request={r} compact />)}
        </div>
      </section>
    </DashboardLayout>
  )
}

function ManageParts() {
  const list = partsByTenant(myTenant.slug)
  return (
    <DashboardLayout
      scope="tenant"
      title="Administrar repuestos"
      subtitle={`${list.length} publicaciones en ${myTenant.name}`}
      headerExtras={
        <button
          onClick={() => alert('Demo: abriría el formulario de nueva publicación.')}
          className="btn-primary"
        >
          <Plus className="h-4 w-4" /> Nueva publicación
        </button>
      }
    >
      <div className="card overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead className="bg-carbon-850 text-zinc-400 text-xs uppercase tracking-wider">
            <tr>
              <th className="text-left px-4 py-3">Repuesto</th>
              <th className="text-left px-4 py-3 hidden md:table-cell">Estado</th>
              <th className="text-left px-4 py-3 hidden md:table-cell">Ciudad</th>
              <th className="text-right px-4 py-3">Precio</th>
              <th className="text-right px-4 py-3">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-carbon-800">
            {list.map((p) => (
              <tr key={p.id} className="hover:bg-carbon-850/40">
                <td className="px-4 py-3">
                  <Link to={`/repuesto/${p.id}`} className="text-white hover:text-neon">
                    {p.title}
                  </Link>
                  <div className="text-xs muted mt-0.5">{p.make} {p.model}</div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell"><StatusBadge status={p.status} /></td>
                <td className="px-4 py-3 hidden md:table-cell text-zinc-300">{p.city}</td>
                <td className="px-4 py-3 text-right font-display font-semibold text-neon">{formatCLP(p.price)}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => alert('Demo: editar publicación.')}
                    className="btn-ghost !py-1.5 !px-2 text-xs"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  )
}

function ReplyRequests() {
  return (
    <DashboardLayout scope="tenant" title="Responder búsquedas" subtitle="Búsquedas activas que coinciden con tu especialidad">
      <div className="grid md:grid-cols-2 gap-4">
        {requests.map((r) => <RequestCard key={r.id} request={r} />)}
      </div>
    </DashboardLayout>
  )
}

function Stats() {
  const stats = [
    { label: 'Vistas a publicaciones', value: '1.842', hint: 'Últimos 30 días' },
    { label: 'Clicks a WhatsApp', value: '167', hint: 'Conversión 9%' },
    { label: 'Búsquedas respondidas', value: myTenant.answeredRequests, hint: 'Histórico' },
    { label: 'Reseñas positivas', value: `${myTenant.rating}/5`, hint: `${myTenant.reviewCount} reseñas` }
  ]
  return (
    <DashboardLayout scope="tenant" title="Estadísticas" subtitle="Cómo le va a tu tienda en BuscaPieza Maule">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {stats.map((s) => (
          <MetricCard key={s.label} label={s.label} value={s.value} hint={s.hint} icon={BarChart3} />
        ))}
      </div>
      <div className="card p-6 h-72 grid place-items-center muted">
        Gráfico demo · acá iría la evolución mensual
      </div>
    </DashboardLayout>
  )
}

function PublicProfile() {
  return (
    <DashboardLayout scope="tenant" title="Perfil público" subtitle="Lo que ven los compradores">
      <div className="card p-6 space-y-4 max-w-xl">
        <div>
          <label className="label">Nombre de la tienda</label>
          <input className="input" defaultValue={myTenant.name} />
        </div>
        <div>
          <label className="label">Tipo</label>
          <select className="select" defaultValue={myTenant.type}>
            <option value="particular">Vendedor particular</option>
            <option value="cazador">Cazador</option>
            <option value="desarmaduria">Desarmaduría</option>
            <option value="taller">Taller mecánico</option>
          </select>
        </div>
        <div>
          <label className="label">Especialidad</label>
          <input className="input" defaultValue={myTenant.specialty} />
        </div>
        <div>
          <label className="label">Bio</label>
          <textarea className="input min-h-[100px]" defaultValue={myTenant.bio} />
        </div>
        <button
          onClick={() => alert('Demo: guardaría los cambios del perfil tenant.')}
          className="btn-primary"
        >
          Guardar
        </button>
      </div>
    </DashboardLayout>
  )
}

export default function TenantDashboard() {
  return (
    <Routes>
      <Route index element={<Overview />} />
      <Route path="repuestos" element={<ManageParts />} />
      <Route path="responder" element={<ReplyRequests />} />
      <Route path="estadisticas" element={<Stats />} />
      <Route path="perfil" element={<PublicProfile />} />
    </Routes>
  )
}

export function TenantsList() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="section-title">Tenants en BuscaPieza Maule</h1>
      <p className="muted text-sm mt-1">Vendedores, desarmadurías y cazadores locales.</p>
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        {tenants.map((t) => (
          <Link
            key={t.slug}
            to={`/vendedores/${t.slug}`}
            className="card p-4 flex gap-4 hover:border-neon/40 transition"
          >
            <div className={`h-14 w-14 shrink-0 rounded-2xl bg-gradient-to-br ${t.accent} grid place-items-center text-carbon-950`}>
              <Wrench className="h-6 w-6" strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <div className="font-display text-base text-white">{t.name}</div>
              <div className="text-xs muted">{t.typeLabel} · {t.city}</div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <VerifiedBadge verified={t.verified} />
                <PlanBadge plan={t.plan} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
