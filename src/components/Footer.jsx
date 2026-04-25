import { Link } from 'react-router-dom'
import { Wrench, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-carbon-800/80 bg-carbon-950/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-neon text-carbon-950">
              <Wrench className="h-5 w-5" strokeWidth={2.5} />
            </span>
            <div className="font-display text-base font-semibold text-white">
              BuscaPieza <span className="text-neon">Maule</span>
            </div>
          </div>
          <p className="mt-3 text-sm text-zinc-400 max-w-xs">
            Comunidad local de repuestos usados. Cazadores, desarmadurías y vendedores particulares del Maule.
          </p>
          <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-zinc-500">
            <MapPin className="h-3.5 w-3.5" /> Linares · San Javier · Talca · Parral
          </p>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold text-white">Producto</h4>
          <ul className="mt-3 space-y-2 text-sm text-zinc-400">
            <li><Link to="/buscar" className="hover:text-neon">Buscar repuesto</Link></li>
            <li><Link to="/busquedas" className="hover:text-neon">Búsquedas activas</Link></li>
            <li><Link to="/publicar-busqueda" className="hover:text-neon">Publicar búsqueda</Link></li>
            <li><Link to="/tenant" className="hover:text-neon">Soy vendedor</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold text-white">Comunidad</h4>
          <ul className="mt-3 space-y-2 text-sm text-zinc-400">
            <li><Link to="/vendedores/piezas-b16-linares" className="hover:text-neon">Cazadores destacados</Link></li>
            <li><Link to="/vendedores/desarmaduria-san-javier" className="hover:text-neon">Desarmadurías</Link></li>
            <li><Link to="/admin" className="hover:text-neon">Panel admin (demo)</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold text-white">Demo</h4>
          <ul className="mt-3 space-y-2 text-sm text-zinc-400">
            <li>Datos ficticios</li>
            <li>Sin backend real</li>
            <li>WhatsApp simulado</li>
            <li>Pagos no integrados</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-carbon-800/80 py-5 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} BuscaPieza Maule · Maqueta visual aislada · Hecha en el Maule.
      </div>
    </footer>
  )
}
