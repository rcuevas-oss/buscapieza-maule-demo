import { Routes, Route } from 'react-router-dom'
import {
  Users, Store, Wrench, Megaphone, MessageCircle, ShieldCheck,
  CheckCircle2, XCircle, Star, Flag, Eye
} from 'lucide-react'
import DashboardLayout, { MetricCard } from '../components/DashboardLayout.jsx'
import { adminMetrics, adminQueue, tenants } from '../data/mockData.js'

function Overview() {
  return (
    <DashboardLayout
      scope="admin"
      title="Panel admin"
      subtitle="BuscaPieza Maule · vista del operador de la plataforma"
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <MetricCard label="Usuarios registrados" value={adminMetrics.registeredUsers} icon={Users} hint="+18 esta semana" />
        <MetricCard label="Tenants activos" value={adminMetrics.activeTenants} icon={Store} hint="+3 nuevos" />
        <MetricCard label="Repuestos publicados" value={adminMetrics.activeRequests * 4} icon={Wrench} hint="Activos" />
        <MetricCard label="Búsquedas activas" value={adminMetrics.activeRequests} icon={Megaphone} hint="Esperando ofertas" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        <MetricCard label="Ofertas generadas" value={adminMetrics.generatedOffers} icon={MessageCircle} accent="text-cyan-300" />
        <MetricCard label="Vendedores verificados" value={adminMetrics.verifiedSellers} icon={ShieldCheck} accent="text-cyan-300" />
        <MetricCard label="Pendientes moderación" value={adminMetrics.pendingPosts} icon={Flag} accent="text-amber-300" />
        <MetricCard label="Reportes abiertos" value={adminMetrics.reportedPosts} icon={Flag} accent="text-rose-300" />
      </div>

      <section className="mb-8">
        <h2 className="font-display text-lg font-semibold text-white mb-3">Tenants destacables</h2>
        <div className="card overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead className="bg-carbon-850 text-zinc-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="text-left px-4 py-3">Tenant</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Tipo</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Ciudad</th>
                <th className="text-right px-4 py-3">Reputación</th>
                <th className="text-right px-4 py-3">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-carbon-800">
              {tenants.map((t) => (
                <tr key={t.slug} className="hover:bg-carbon-850/40">
                  <td className="px-4 py-3">
                    <div className="text-white">{t.name}</div>
                    <div className="text-xs muted">{t.specialty}</div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-zinc-300">{t.typeLabel}</td>
                  <td className="px-4 py-3 hidden md:table-cell text-zinc-300">{t.city}</td>
                  <td className="px-4 py-3 text-right">
                    <span className="inline-flex items-center gap-1 text-amber-300">
                      <Star className="h-3.5 w-3.5 fill-current" /> {t.rating}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right space-x-1">
                    {!t.verified && (
                      <button
                        onClick={() => alert(`Demo: verificar ${t.name}`)}
                        className="btn-ghost !py-1 !px-2 text-xs"
                      >
                        <ShieldCheck className="h-3.5 w-3.5" />
                        Verificar
                      </button>
                    )}
                    <button
                      onClick={() => alert(`Demo: destacar ${t.name}`)}
                      className="btn-ghost !py-1 !px-2 text-xs"
                    >
                      <Star className="h-3.5 w-3.5" />
                      Destacar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </DashboardLayout>
  )
}

function ModerationQueue() {
  const labels = {
    publicacion: { label: 'Publicación', color: 'bg-blue-500/15 text-blue-300 border-blue-500/30' },
    reporte: { label: 'Reporte', color: 'bg-rose-500/15 text-rose-300 border-rose-500/30' },
    verificacion: { label: 'Verificación', color: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30' }
  }
  return (
    <DashboardLayout
      scope="admin"
      title="Cola de moderación"
      subtitle="Acciones pendientes que requieren tu revisión"
    >
      <div className="card divide-y divide-carbon-700/60">
        {adminQueue.map((q) => {
          const meta = labels[q.type] || labels.publicacion
          return (
            <div key={q.id} className="p-4 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
              <div className="flex items-center gap-3">
                <span className={`badge ${meta.color}`}>{meta.label}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-medium">{q.title}</div>
                <div className="text-xs muted mt-0.5">
                  {q.tenant} · {q.daysAgo === 0 ? 'hoy' : `hace ${q.daysAgo}d`}
                </div>
              </div>
              <div className="flex gap-1.5 flex-wrap sm:justify-end">
                <button
                  onClick={() => alert(`Demo: ver ${q.title}`)}
                  className="btn-ghost !py-1.5 !px-2.5 text-xs"
                >
                  <Eye className="h-3.5 w-3.5" /> Ver
                </button>
                {q.type === 'publicacion' && (
                  <>
                    <button
                      onClick={() => alert(`Demo: aprobar ${q.title}`)}
                      className="btn-primary !py-1.5 !px-2.5 text-xs"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" /> Aprobar
                    </button>
                    <button
                      onClick={() => alert(`Demo: bloquear ${q.title}`)}
                      className="btn-danger !py-1.5 !px-2.5 text-xs"
                    >
                      <XCircle className="h-3.5 w-3.5" /> Bloquear
                    </button>
                  </>
                )}
                {q.type === 'reporte' && (
                  <>
                    <button
                      onClick={() => alert(`Demo: marcar revisado`)}
                      className="btn-secondary !py-1.5 !px-2.5 text-xs"
                    >
                      Marcar revisado
                    </button>
                    <button
                      onClick={() => alert(`Demo: bloquear publicación`)}
                      className="btn-danger !py-1.5 !px-2.5 text-xs"
                    >
                      <XCircle className="h-3.5 w-3.5" /> Bloquear
                    </button>
                  </>
                )}
                {q.type === 'verificacion' && (
                  <button
                    onClick={() => alert(`Demo: verificar tenant`)}
                    className="btn-primary !py-1.5 !px-2.5 text-xs"
                  >
                    <ShieldCheck className="h-3.5 w-3.5" /> Verificar
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </DashboardLayout>
  )
}

export default function AdminPanel() {
  return (
    <Routes>
      <Route index element={<Overview />} />
      <Route path="cola" element={<ModerationQueue />} />
    </Routes>
  )
}
