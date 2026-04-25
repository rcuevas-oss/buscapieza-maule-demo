import { Filter, RotateCcw } from 'lucide-react'
import { cities, categories, popularCars, statusMeta } from '../data/mockData.js'

export default function FilterSidebar({ filters, setFilters, onReset }) {
  const update = (patch) => setFilters((prev) => ({ ...prev, ...patch }))

  return (
    <aside className="card p-5 lg:sticky lg:top-20 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-base font-semibold text-white inline-flex items-center gap-2">
          <Filter className="h-4 w-4 text-neon" /> Filtros
        </h3>
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-zinc-400 hover:text-neon inline-flex items-center gap-1"
        >
          <RotateCcw className="h-3 w-3" /> Reset
        </button>
      </div>

      <div>
        <label className="label">Marca</label>
        <select
          className="select"
          value={filters.make}
          onChange={(e) => update({ make: e.target.value })}
        >
          <option value="">Todas las marcas</option>
          {[...new Set(popularCars.map((c) => c.make))].map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
          <option value="Universal">Universal</option>
        </select>
      </div>

      <div>
        <label className="label">Ciudad</label>
        <select
          className="select"
          value={filters.city}
          onChange={(e) => update({ city: e.target.value })}
        >
          <option value="">Todo el Maule</option>
          {cities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="label">Categoría</label>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => {
            const active = filters.category === cat.slug
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => update({ category: active ? '' : cat.slug })}
                className={`chip cursor-pointer min-h-[36px] ${
                  active ? 'bg-neon/15 border-neon/50 text-neon' : ''
                }`}
              >
                {cat.label}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <label className="label">Estado</label>
        <div className="space-y-1.5">
          {Object.entries(statusMeta).map(([key, meta]) => (
            <label key={key} className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer min-h-[36px]">
              <input
                type="checkbox"
                checked={filters.statuses.includes(key)}
                onChange={(e) => {
                  const next = e.target.checked
                    ? [...filters.statuses, key]
                    : filters.statuses.filter((s) => s !== key)
                  update({ statuses: next })
                }}
                className="accent-neon h-4 w-4"
              />
              <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
              {meta.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="label">Precio máximo</label>
        <input
          type="range"
          min="0"
          max="500000"
          step="10000"
          value={filters.maxPrice}
          onChange={(e) => update({ maxPrice: Number(e.target.value) })}
          className="w-full accent-neon"
        />
        <div className="flex justify-between text-xs muted mt-1">
          <span>$0</span>
          <span className="text-neon font-medium">
            {filters.maxPrice === 500000
              ? 'Sin tope'
              : '$' + filters.maxPrice.toLocaleString('es-CL')}
          </span>
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.shipping}
            onChange={(e) => update({ shipping: e.target.checked })}
            className="accent-neon"
          />
          Solo con envío disponible
        </label>
      </div>
    </aside>
  )
}
