import { useState } from 'react'

/**
 * Round avatar.
 * - If we have a curated photo for this name (in /img/avatars/<firstname>.jpg),
 *   we render it. That makes the cards read like real people.
 * - Otherwise we fall back to a deterministic gradient + initials, so any new
 *   author still gets a unique-looking avatar without remote calls.
 */

const KNOWN_PHOTO_SLUGS = new Set([
  'cristian',
  'felipe',
  'diego',
  'matias',
  'rodrigo',
  'camila'
])

const palette = [
  'from-emerald-500 to-emerald-700',
  'from-cyan-500 to-blue-700',
  'from-orange-500 to-red-700',
  'from-rose-500 to-fuchsia-700',
  'from-violet-500 to-purple-700',
  'from-amber-500 to-orange-700',
  'from-sky-500 to-indigo-700',
  'from-lime-500 to-emerald-700',
  'from-teal-500 to-cyan-700',
  'from-pink-500 to-rose-700'
]

function hash(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0
  return Math.abs(h)
}

function firstNameSlug(name) {
  if (!name) return ''
  return String(name)
    .trim()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .split(/\s+/)[0]
    .replace(/[^a-z]/g, '')
}

function initials(name) {
  if (!name) return '?'
  const parts = String(name).trim().split(/\s+/).filter(Boolean).slice(0, 2)
  if (parts.length === 0) return '?'
  return parts.map((p) => p[0].toUpperCase()).join('')
}

export default function Avatar({
  name = '',
  size = 'md', // 'sm' | 'md' | 'lg'
  showStatus = false,
  className = ''
}) {
  const sizes = {
    sm: 'h-8 w-8 text-[11px]',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base'
  }
  const dot = {
    sm: 'h-2 w-2 right-0 bottom-0',
    md: 'h-2.5 w-2.5 right-0 bottom-0',
    lg: 'h-3 w-3 right-0.5 bottom-0.5'
  }

  const cls = sizes[size] || sizes.md
  const slug = firstNameSlug(name)
  const hasPhoto = KNOWN_PHOTO_SLUGS.has(slug)
  const [photoFailed, setPhotoFailed] = useState(false)
  const showPhoto = hasPhoto && !photoFailed
  const photoSrc = `${import.meta.env.BASE_URL}img/avatars/${slug}.jpg`

  const grad = palette[hash(name) % palette.length]
  const init = initials(name)

  return (
    <div
      className={`relative inline-flex shrink-0 ${className}`}
      aria-label={name ? `Avatar de ${name}` : 'Avatar'}
    >
      {showPhoto ? (
        <img
          src={photoSrc}
          alt={name || 'Avatar'}
          loading="lazy"
          decoding="async"
          onError={() => setPhotoFailed(true)}
          className={`rounded-full object-cover shadow-md ring-2 ring-carbon-900/80 ${cls}`}
        />
      ) : (
        <div
          className={`grid place-items-center rounded-full font-display font-semibold text-white shadow-md ring-2 ring-carbon-900/80 bg-gradient-to-br ${grad} ${cls}`}
        >
          {init}
        </div>
      )}
      {showStatus && (
        <span
          className={`absolute rounded-full bg-emerald-400 ring-2 ring-carbon-900 ${dot[size] || dot.md}`}
          aria-label="En línea"
        />
      )}
    </div>
  )
}
