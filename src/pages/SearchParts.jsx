import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import FilterSidebar from '../components/FilterSidebar.jsx'
import PartCard from '../components/PartCard.jsx'
import { parts } from '../data/mockData.js'

const defaultFilters = {
  q: '',
  make: '',
  city: '',
  category: '',
  statuses: ['disponible', 'reservado', 'no_confirmado'],
  maxPrice: 500000,
  shipping: false
}

export default function SearchParts() {
  const [searchParams] = useSearchParams()
  const [filters, setFilters] = useState({
    ...defaultFilters,
    make: searchParams.get('make') || '',
    category: searchParams.get('cat') || ''
  })
  const [showFilters, setShowFilters] = useState(false)
  const [sort, setSort] = useState('recent')

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      make: searchParams.get('make') || '',
      category: searchParams.get('cat') || ''
    }))
  }, [searchParams])

  const filtered = useMemo(() => {
    let r = parts.filter((p) => {
      if (filters.q && !p.title.toLowerCase().includes(filters.q.toLowerCase())) return false
      if (filters.make && p.make !== filters.make) return false
      if (filters.city && p.city !== filters.city) return false
      if (filters.category && p.category !== filters.category) return false
      if (!filters.statuses.includes(p.status)) return false
      if (filters.maxPrice < 500000 && p.price > filters.maxPrice) return false
      if (filters.shipping && !p.canShip) return false
      return true
    })
    if (sort === 'price-asc') r = [...r].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') r = [...r].sort((a, b) => b.price - a.price)
    if (sort === 'recent') r = [...r].sort((a, b) => a.publishedDaysAgo - b.publishedDaysAgo)
    return r
  }, [filters, sort])

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-6">
        <h1 className="section-title">Buscar repuestos</h1>
        <p className="muted text-sm mt-1">
          {filtered.length} resultado{filtered.length === 1 ? '' : 's'} en el Maule
        </p>
      </header>

      <div className="flex gap-2 mb-4 sticky top-14 md:top-16 z-20 bg-carbon-950/85 backdrop-blur py-2 -mx-1 px-1">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input
            type="search"
            value={filters.q}
            onChange={(e) => setFilters((p) => ({ ...p, q: e.target.value }))}
            placeholder="Foco B16, parachoque Civic…"
            className="input !pl-10"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="select max-w-[180px] hidden md:block"
        >
          <option value="recent">Más recientes</option>
          <option value="price-asc">Precio: menor a mayor</option>
          <option value="price-desc">Precio: mayor a menor</option>
        </select>
        <button
          type="button"
          onClick={() => setShowFilters(true)}
          aria-label="Abrir filtros"
          className="btn-secondary lg:hidden !px-3"
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span className="hidden sm:inline">Filtros</span>
        </button>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-6">
        {/* Sidebar visible on lg+ */}
        <div className="hidden lg:block">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            onReset={() => setFilters(defaultFilters)}
          />
        </div>

        {/* Mobile drawer overlay */}
        {showFilters && (
          <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
            <button
              type="button"
              aria-label="Cerrar filtros"
              onClick={() => setShowFilters(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />
            <div className="absolute inset-y-0 right-0 w-[88%] max-w-sm bg-carbon-950 border-l border-carbon-800 overflow-y-auto"
                 style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-carbon-800 bg-carbon-950 px-4 py-3">
                <span className="font-display text-base font-semibold text-white">Filtros</span>
                <button
                  type="button"
                  onClick={() => setShowFilters(false)}
                  aria-label="Cerrar"
                  className="grid h-9 w-9 place-items-center rounded-lg bg-carbon-800 text-zinc-200 active:scale-95"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="p-3">
                <FilterSidebar
                  filters={filters}
                  setFilters={setFilters}
                  onReset={() => setFilters(defaultFilters)}
                />
              </div>
              <div className="sticky bottom-0 border-t border-carbon-800 bg-carbon-950 p-3">
                <button
                  type="button"
                  onClick={() => setShowFilters(false)}
                  className="btn-primary w-full !py-3"
                >
                  Ver {filtered.length} resultado{filtered.length === 1 ? '' : 's'}
                </button>
              </div>
            </div>
          </div>
        )}

        <div>
          {filtered.length === 0 ? (
            <div className="card p-10 text-center">
              <div className="text-zinc-300 font-display text-lg">Sin resultados</div>
              <p className="muted text-sm mt-1">
                Ajusta los filtros o publica una búsqueda para que los cazadores te respondan.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((p) => (
                <PartCard key={p.id} part={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
