import { useState } from 'react'
import { Camera, Image as ImageIcon } from 'lucide-react'

/**
 * Real photos via picsum.photos (Fastly CDN) with stable seed per part.
 * Was loremflickr — replaced because its origin is slow (multi-second loads on
 * GitHub Pages). Picsum responds via Fastly edge in <300ms.
 * Falls back to a colorful gradient if the image fails to load.
 * Mobile-aware: srcset + sizes + lazy loading.
 */
function buildUrl(tags, w, h, seed) {
  // tags is kept in the API for compatibility but not used by picsum.
  // Stable seed → same photo every time for a given part.
  void tags
  return `https://picsum.photos/seed/${seed}/${w}/${h}.jpg`
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

  // card: 4:3 aspect — request narrower variants for mobile bandwidth.
  // hero: 16:10 detail — bigger sizes.
  const dims =
    variant === 'hero'
      ? [
          { w: 600, h: 400 },
          { w: 1000, h: 666 },
          { w: 1400, h: 933 }
        ]
      : [
          { w: 400, h: 300 },
          { w: 640, h: 480 },
          { w: 960, h: 720 }
        ]

  const sizesAttr =
    variant === 'hero'
      ? '(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 720px'
      : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'

  return (
    <div
      className={`relative overflow-hidden bg-carbon-850 ${className}`}
      style={{ '--h': hue }}
    >
      {!failed && tags ? (
        <img
          src={buildUrl(tags, dims[1].w, dims[1].h, seed)}
          srcSet={dims.map((d) => `${buildUrl(tags, d.w, d.h, seed)} ${d.w}w`).join(', ')}
          sizes={sizesAttr}
          loading="lazy"
          decoding="async"
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
