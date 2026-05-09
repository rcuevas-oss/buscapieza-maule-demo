import { Camera, Image as ImageIcon } from 'lucide-react'
import {
  Lightbulb,
  Shield,
  CircleDot,
  Cog,
  Box,
  Armchair,
  Gauge,
  Flame,
  Zap,
  Car
} from 'lucide-react'

/**
 * Illustrated placeholder per category — no fake photos.
 *
 * Honest placeholder: marketplaces like MercadoLibre or Yapo show category
 * icons until sellers upload real photos of the actual part. Trying to use
 * generic Unsplash shots was confusing the user (e.g. McLaren image labeled
 * "Espejo lateral Yaris"). When real sellers publish, their photos replace
 * this and the API stays the same.
 */

const CATEGORY_ICONS = {
  opticas: Lightbulb,
  parachoques: Shield,
  llantas: CircleDot,
  motores: Cog,
  cajas: Box,
  interior: Armchair,
  suspension: Gauge,
  tuning: Flame,
  electrico: Zap,
  carroceria: Car
}

const CATEGORY_LABELS = {
  opticas: 'Óptica',
  parachoques: 'Parachoque',
  llantas: 'Llanta',
  motores: 'Motor',
  cajas: 'Caja',
  interior: 'Interior',
  suspension: 'Suspensión',
  tuning: 'Tuning',
  electrico: 'Eléctrico',
  carroceria: 'Carrocería'
}

export default function PartImage({
  category,
  count = 1,
  className = '',
  label,
  variant = 'card', // 'card' | 'hero'
  alt = 'Repuesto'
}) {
  const Icon = CATEGORY_ICONS[category] || ImageIcon
  const categoryLabel = CATEGORY_LABELS[category] || ''

  const iconSize =
    variant === 'hero'
      ? 'h-28 w-28 md:h-36 md:w-36'
      : 'h-16 w-16 sm:h-20 sm:w-20'

  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative overflow-hidden bg-gradient-to-br from-carbon-900 via-carbon-850 to-carbon-900 ${className}`}
    >
      {/* Grid pattern overlay — subtle industrial vibe */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Diagonal gradient accent */}
      <div
        aria-hidden
        className="absolute -top-1/4 -right-1/4 h-2/3 w-2/3 rounded-full bg-orange-500/10 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-1/4 -left-1/4 h-1/2 w-1/2 rounded-full bg-cyan-500/[0.06] blur-3xl"
      />

      {/* Centered icon with glow */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="relative">
          <div
            aria-hidden
            className="absolute inset-0 -m-6 rounded-full bg-orange-500/15 blur-2xl"
          />
          <div className="relative flex flex-col items-center gap-3">
            <Icon
              className={`${iconSize} text-orange-400/95 drop-shadow-[0_0_18px_rgba(251,146,60,0.35)]`}
              strokeWidth={1.4}
            />
            {variant === 'hero' && categoryLabel && (
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">
                {categoryLabel}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bottom dark gradient for badges */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent pointer-events-none" />

      {/* Faint corner watermark — "imagen referencial" */}
      {variant !== 'hero' && (
        <span className="absolute top-2 left-2 font-mono text-[9px] uppercase tracking-[0.16em] text-white/35">
          Imagen referencial
        </span>
      )}

      {/* Existing label slot (category name from caller) */}
      {label && (
        <div className="absolute bottom-2 left-2 rounded-md bg-black/60 backdrop-blur px-2 py-1 text-[10px] uppercase tracking-wider text-white/90">
          {label}
        </div>
      )}

      {/* Photo count badge */}
      {count > 1 && (
        <div className="absolute top-2 right-2 inline-flex items-center gap-1 rounded-md bg-black/60 backdrop-blur px-2 py-1 text-[11px] text-white/90">
          <Camera className="h-3 w-3" /> {count}
        </div>
      )}
    </div>
  )
}
