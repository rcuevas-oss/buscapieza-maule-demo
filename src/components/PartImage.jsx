import { useState } from 'react'
import { Camera, Image as ImageIcon } from 'lucide-react'

/**
 * Curated local photos served from GitHub Pages CDN (sub-50ms).
 *
 * Was loremflickr (slow, ~9s first hop), then picsum.photos (fast but random
 * non-thematic). Now: 10 hand-picked Unsplash photos baked into the repo at
 * /img/parts/01.jpg ... 10.jpg, each matching a part category. Keyword
 * matching keeps the API backwards-compatible with the existing mockData.
 */

// Keyword → image-slot lookup. First hit wins; order is most-specific first.
const KEYWORD_TO_SLOT = [
  { kw: ['headlight', 'optic', 'óptic', 'foco', 'lampa'], slot: 1 },
  { kw: ['bumper', 'parachoque'], slot: 2 },
  { kw: ['wheel', 'rim', 'alloy', 'llanta', 'rueda'], slot: 3 },
  { kw: ['grille', 'parrilla'], slot: 4 },
  { kw: ['mirror', 'espejo'], slot: 5 },
  { kw: ['engine', 'alternator', 'motor'], slot: 6 },
  { kw: ['seat', 'bucket', 'asiento', 'baquet'], slot: 7 },
  { kw: ['hood', 'rear', 'tail', 'capot', 'capó'], slot: 8 },
  { kw: ['stereo', 'dashboard', 'tablero', 'panel'], slot: 9 },
  { kw: ['suspension', 'coilover', 'amortig'], slot: 10 }
]

function tagsToSlot(tags, seed = 0) {
  const t = (tags || '').toLowerCase()
  for (const { kw, slot } of KEYWORD_TO_SLOT) {
    if (kw.some((k) => t.includes(k))) return slot
  }
  // Fallback: distribute by seed across the 10 slots.
  return ((Number(seed) || 0) % 10) + 1
}

function buildUrl(slot) {
  const n = String(slot).padStart(2, '0')
  // Vite injects BASE_URL (= "/buscapieza-maule-demo/" on GitHub Pages, "/" in dev).
  return `${import.meta.env.BASE_URL}img/parts/${n}.jpg`
}

export default function PartImage({
  tags,
  seed = 1,
  hue = 60,
  count = 1,
  className = '',
  label,
  variant = 'card', // 'card' | 'hero'
  alt = 'Repuesto'
}) {
  const [failed, setFailed] = useState(false)
  const slot = tagsToSlot(tags, seed)
  const src = buildUrl(slot)

  return (
    <div
      className={`relative overflow-hidden bg-carbon-850 ${className}`}
      style={{ '--h': hue }}
    >
      {!failed ? (
        <img
          src={src}
          loading={variant === 'hero' ? 'eager' : 'lazy'}
          decoding="async"
          fetchpriority={variant === 'hero' ? 'high' : 'auto'}
          alt={alt}
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="mock-photo absolute inset-0 grid place-items-center text-white/25">
          <ImageIcon className="h-12 w-12" />
        </div>
      )}

      {/* Subtle dark overlay so text/badges read well over photos */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent pointer-events-none" />

      {label && (
        <div className="absolute bottom-2 left-2 rounded-md bg-black/60 backdrop-blur px-2 py-1 text-[10px] uppercase tracking-wider text-white/90">
          {label}
        </div>
      )}
      {count > 1 && (
        <div className="absolute top-2 right-2 inline-flex items-center gap-1 rounded-md bg-black/60 backdrop-blur px-2 py-1 text-[11px] text-white/90">
          <Camera className="h-3 w-3" /> {count}
        </div>
      )}
    </div>
  )
}
