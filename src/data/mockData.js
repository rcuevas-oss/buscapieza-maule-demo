// Datos dummy centralizados — toda la maqueta lee de aquí.
// Sin secretos, sin credenciales, sin endpoints reales.

export const cities = [
  'Linares',
  'San Javier',
  'Parral',
  'Talca',
  'Longaví',
  'Yerbas Buenas',
  'Villa Alegre',
  'Cauquenes'
]

export const categories = [
  { slug: 'opticas', label: 'Ópticas', icon: 'Lightbulb' },
  { slug: 'parachoques', label: 'Parachoques', icon: 'Shield' },
  { slug: 'llantas', label: 'Llantas', icon: 'CircleDot' },
  { slug: 'motores', label: 'Motores', icon: 'Cog' },
  { slug: 'cajas', label: 'Cajas', icon: 'Box' },
  { slug: 'interior', label: 'Interior', icon: 'Armchair' },
  { slug: 'suspension', label: 'Suspensión', icon: 'Gauge' },
  { slug: 'tuning', label: 'Tuning', icon: 'Flame' },
  { slug: 'electrico', label: 'Eléctrico', icon: 'Zap' },
  { slug: 'carroceria', label: 'Carrocería', icon: 'Car' }
]

export const popularCars = [
  { make: 'Nissan', model: 'Sentra B16', tag: 'B16', emoji: '🏁' },
  { make: 'Nissan', model: 'V16', tag: 'V16', emoji: '🚗' },
  { make: 'Honda', model: 'Civic', tag: 'Civic', emoji: '🏎️' },
  { make: 'Toyota', model: 'Yaris', tag: 'Yaris', emoji: '🚙' },
  { make: 'Suzuki', model: 'Swift', tag: 'Swift', emoji: '🛻' },
  { make: 'Hyundai', model: 'Accent', tag: 'Accent', emoji: '🚘' },
  { make: 'Chevrolet', model: 'Corsa', tag: 'Corsa', emoji: '🚖' },
  { make: 'Mazda', model: '3', tag: 'Mazda 3', emoji: '🏁' }
]

export const tenants = [
  {
    slug: 'piezas-b16-linares',
    name: 'Piezas B16 Linares',
    type: 'cazador',
    typeLabel: 'Cazador / particular',
    city: 'Linares',
    verified: true,
    rating: 4.8,
    reviewCount: 47,
    plan: 'pro',
    specialty: 'Nissan B16, V16, ópticas, carrocería, tuning',
    bio: 'Llevamos 6 años desarmando B16 en el sur. Si lo necesitas, lo encontramos.',
    whatsapp: '+56 9 5555 0001',
    publishedCount: 23,
    answeredRequests: 89,
    accent: 'from-lime-400 to-emerald-500'
  },
  {
    slug: 'desarmaduria-san-javier',
    name: 'Desarmaduría San Javier',
    type: 'desarmaduria',
    typeLabel: 'Desarmaduría',
    city: 'San Javier',
    verified: true,
    rating: 4.6,
    reviewCount: 132,
    plan: 'desarmaduria',
    specialty: 'Multimarca, motores, cajas, electrónico',
    bio: 'Desarmaduría establecida desde 2008. Boleta y garantía de 7 días.',
    whatsapp: '+56 9 5555 0002',
    publishedCount: 184,
    answeredRequests: 312,
    accent: 'from-orange-400 to-red-500'
  },
  {
    slug: 'jdm-maule',
    name: 'JDM Maule',
    type: 'cazador',
    typeLabel: 'Cazador especializado',
    city: 'Talca',
    verified: true,
    rating: 4.9,
    reviewCount: 28,
    plan: 'pro',
    specialty: 'JDM, ópticas importadas, performance Honda y Nissan',
    bio: 'Importamos y rescatamos piezas JDM. Comunidad tuning del Maule.',
    whatsapp: '+56 9 5555 0003',
    publishedCount: 14,
    answeredRequests: 56,
    accent: 'from-cyan-400 to-blue-500'
  },
  {
    slug: 'repuestos-el-taller',
    name: 'Repuestos El Taller',
    type: 'taller',
    typeLabel: 'Taller mecánico',
    city: 'Linares',
    verified: false,
    rating: 4.2,
    reviewCount: 11,
    plan: 'gratis',
    specialty: 'Frenos, suspensión, eléctrico',
    bio: 'Taller de barrio en Linares. Vendemos lo que sale de servicios.',
    whatsapp: '+56 9 5555 0004',
    publishedCount: 6,
    answeredRequests: 19,
    accent: 'from-amber-400 to-orange-500'
  },
  {
    slug: 'tuning-parral',
    name: 'Tuning Parral',
    type: 'particular',
    typeLabel: 'Vendedor particular',
    city: 'Parral',
    verified: false,
    rating: 4.4,
    reviewCount: 9,
    plan: 'gratis',
    specialty: 'Butacas, suspensión deportiva, llantas',
    bio: 'Vendo lo que voy cambiando en mis proyectos personales.',
    whatsapp: '+56 9 5555 0005',
    publishedCount: 4,
    answeredRequests: 7,
    accent: 'from-fuchsia-400 to-pink-500'
  }
]

// Imágenes ficticias: usamos gradientes y placeholders inline (sin red).
// El componente PartCard renderiza un fondo con gradient + ícono cuando no hay foto.

export const parts = [
  {
    id: 'p-001',
    title: 'Foco delantero derecho Nissan Sentra B16 2010',
    category: 'opticas',
    make: 'Nissan',
    model: 'Sentra B16',
    yearFrom: 2007,
    yearTo: 2012,
    engine: '1.6 GA16',
    price: 45000,
    city: 'Linares',
    status: 'disponible',
    confirmedDaysAgo: 2,
    tenantSlug: 'piezas-b16-linares',
    description: 'Foco original sin trizaduras, mica intacta. Solo retiro o envío por Starken con costo del comprador.',
    photoHue: 60,
    imageTags: 'car,headlight,nissan',
    imageSeed: 101,
    images: 4,
    canShip: true,
    publishedDaysAgo: 3
  },
  {
    id: 'p-002',
    title: 'Parachoque delantero Honda Civic 1998',
    category: 'parachoques',
    make: 'Honda',
    model: 'Civic',
    yearFrom: 1996,
    yearTo: 2000,
    engine: '1.6 D16',
    price: 80000,
    city: 'Talca',
    status: 'disponible',
    confirmedDaysAgo: 1,
    tenantSlug: 'jdm-maule',
    description: 'Parachoque tipo EK con detalles menores. Pintado en negro mate. Ideal restauración JDM.',
    photoHue: 200,
    imageTags: 'honda,civic,bumper',
    imageSeed: 102,
    images: 6,
    canShip: false,
    publishedDaysAgo: 5
  },
  {
    id: 'p-003',
    title: 'Llantas aro 15 4x100 (juego de 4)',
    category: 'llantas',
    make: 'Universal',
    model: '4x100',
    yearFrom: null,
    yearTo: null,
    engine: null,
    price: 180000,
    city: 'San Javier',
    status: 'disponible',
    confirmedDaysAgo: 0,
    tenantSlug: 'desarmaduria-san-javier',
    description: 'Juego completo, sin neumáticos. Sirven para B16, Civic, Yaris y similares 4x100.',
    photoHue: 30,
    imageTags: 'wheels,rims,alloy',
    imageSeed: 103,
    images: 5,
    canShip: true,
    publishedDaysAgo: 1
  },
  {
    id: 'p-004',
    title: 'Máscara Nissan V16 estilo JDM',
    category: 'tuning',
    make: 'Nissan',
    model: 'V16',
    yearFrom: 1990,
    yearTo: 1998,
    engine: 'GA16',
    price: 65000,
    city: 'Linares',
    status: 'reservado',
    confirmedDaysAgo: 4,
    tenantSlug: 'piezas-b16-linares',
    description: 'Máscara V16 modificada estilo JDM con malla negra. Reservada hasta el viernes.',
    photoHue: 100,
    imageTags: 'car,grille,nissan',
    imageSeed: 104,
    images: 3,
    canShip: true,
    publishedDaysAgo: 8
  },
  {
    id: 'p-005',
    title: 'Espejo lateral Toyota Yaris 2016',
    category: 'carroceria',
    make: 'Toyota',
    model: 'Yaris',
    yearFrom: 2014,
    yearTo: 2018,
    engine: '1.5 NZ',
    price: 28000,
    city: 'Talca',
    status: 'disponible',
    confirmedDaysAgo: 0,
    tenantSlug: 'desarmaduria-san-javier',
    description: 'Espejo derecho eléctrico, sin tapa pintada. Funciona perfecto.',
    photoHue: 280,
    imageTags: 'car,mirror,toyota',
    imageSeed: 105,
    images: 2,
    canShip: true,
    publishedDaysAgo: 2
  },
  {
    id: 'p-006',
    title: 'Alternador Suzuki Swift 2015',
    category: 'electrico',
    make: 'Suzuki',
    model: 'Swift',
    yearFrom: 2012,
    yearTo: 2017,
    engine: '1.2 K12',
    price: 55000,
    city: 'San Javier',
    status: 'disponible',
    confirmedDaysAgo: 1,
    tenantSlug: 'desarmaduria-san-javier',
    description: 'Alternador probado en banco. 7 días de garantía. Boleta disponible.',
    photoHue: 220,
    imageTags: 'alternator,car,engine',
    imageSeed: 106,
    images: 3,
    canShip: true,
    publishedDaysAgo: 4
  },
  {
    id: 'p-007',
    title: 'Butacas deportivas negras (par)',
    category: 'interior',
    make: 'Universal',
    model: 'Bucket',
    yearFrom: null,
    yearTo: null,
    engine: null,
    price: 250000,
    city: 'Parral',
    status: 'disponible',
    confirmedDaysAgo: 0,
    tenantSlug: 'tuning-parral',
    description: 'Butacas tipo bucket usadas, tela negra con costura roja. Sin rieles.',
    photoHue: 0,
    imageTags: 'racing,seat,bucket',
    imageSeed: 107,
    images: 5,
    canShip: false,
    publishedDaysAgo: 6
  },
  {
    id: 'p-008',
    title: 'Capó Hyundai Accent 2012',
    category: 'carroceria',
    make: 'Hyundai',
    model: 'Accent',
    yearFrom: 2011,
    yearTo: 2014,
    engine: '1.4 G4FA',
    price: 90000,
    city: 'Linares',
    status: 'no_confirmado',
    confirmedDaysAgo: 14,
    tenantSlug: 'repuestos-el-taller',
    description: 'Capó usado, sin grandes daños. Disponibilidad pendiente de confirmar.',
    photoHue: 150,
    imageTags: 'car,hood,sedan',
    imageSeed: 108,
    images: 2,
    canShip: false,
    publishedDaysAgo: 21
  },
  {
    id: 'p-009',
    title: 'Radio Android universal 2 DIN',
    category: 'electrico',
    make: 'Universal',
    model: 'Android 2DIN',
    yearFrom: null,
    yearTo: null,
    engine: null,
    price: 75000,
    city: 'Linares',
    status: 'disponible',
    confirmedDaysAgo: 0,
    tenantSlug: 'piezas-b16-linares',
    description: 'Radio Android nuevo en caja. Pantalla 7", WiFi, GPS, cámara incluida.',
    photoHue: 250,
    imageTags: 'car,stereo,dashboard',
    imageSeed: 109,
    images: 4,
    canShip: true,
    publishedDaysAgo: 1
  },
  {
    id: 'p-010',
    title: 'Suspensión deportiva usada (kit completo)',
    category: 'suspension',
    make: 'Universal',
    model: 'Coilover',
    yearFrom: null,
    yearTo: null,
    engine: null,
    price: 320000,
    city: 'Parral',
    status: 'vendido',
    confirmedDaysAgo: 30,
    tenantSlug: 'tuning-parral',
    description: 'Coilovers usados, regulables en altura. Vendidos.',
    photoHue: 320,
    imageTags: 'car,suspension,coilover',
    imageSeed: 110,
    images: 3,
    canShip: true,
    publishedDaysAgo: 35
  }
]

export const requests = [
  {
    id: 'r-001',
    title: 'Busco foco izquierdo Nissan Sentra B16 2011',
    category: 'opticas',
    make: 'Nissan',
    model: 'Sentra B16',
    year: 2011,
    engine: '1.6 GA16',
    city: 'Linares',
    budget: 50000,
    urgency: 'alta',
    acceptShipping: true,
    publishedDaysAgo: 1,
    offers: 4,
    description: 'Necesito el lado izquierdo, sin trizaduras. Pago al tiro.',
    author: 'Cristián M.'
  },
  {
    id: 'r-002',
    title: 'Busco parachoque delantero Honda Civic 1998',
    category: 'parachoques',
    make: 'Honda',
    model: 'Civic',
    year: 1998,
    engine: '1.6 D16',
    city: 'Talca',
    budget: 90000,
    urgency: 'media',
    acceptShipping: false,
    publishedDaysAgo: 3,
    offers: 2,
    description: 'Cualquier color, prefiero original. Solo retiro en Talca.',
    author: 'Felipe R.'
  },
  {
    id: 'r-003',
    title: 'Busco ópticas JDM para Nissan V16',
    category: 'tuning',
    make: 'Nissan',
    model: 'V16',
    year: 1995,
    engine: 'GA16',
    city: 'Linares',
    budget: 120000,
    urgency: 'baja',
    acceptShipping: true,
    publishedDaysAgo: 6,
    offers: 1,
    description: 'Ópticas estilo JDM, idealmente con halo o LED. Proyecto restauración.',
    author: 'Diego P.'
  },
  {
    id: 'r-004',
    title: 'Busco llantas 4x100 aro 15',
    category: 'llantas',
    make: 'Universal',
    model: '4x100',
    year: null,
    engine: null,
    city: 'San Javier',
    budget: 180000,
    urgency: 'alta',
    acceptShipping: true,
    publishedDaysAgo: 0,
    offers: 6,
    description: 'Para Civic 96. Sin neumáticos está bien.',
    author: 'Matías V.'
  },
  {
    id: 'r-005',
    title: 'Busco butacas deportivas económicas',
    category: 'interior',
    make: 'Universal',
    model: 'Bucket',
    year: null,
    engine: null,
    city: 'Parral',
    budget: 200000,
    urgency: 'baja',
    acceptShipping: false,
    publishedDaysAgo: 9,
    offers: 3,
    description: 'No necesitan rieles. Color libre.',
    author: 'Camila S.'
  },
  {
    id: 'r-006',
    title: 'Busco caja Hyundai Accent 2012',
    category: 'cajas',
    make: 'Hyundai',
    model: 'Accent',
    year: 2012,
    engine: '1.4 G4FA',
    city: 'Linares',
    budget: 250000,
    urgency: 'alta',
    acceptShipping: true,
    publishedDaysAgo: 2,
    offers: 0,
    description: 'Caja mecánica, idealmente revisada. Urgente para entregar el auto.',
    author: 'Rodrigo C.'
  }
]

export const offersForRequest = [
  {
    id: 'o-001',
    requestId: 'r-001',
    tenantSlug: 'piezas-b16-linares',
    price: 45000,
    city: 'Linares',
    state: 'usado bueno',
    canShip: true,
    message: 'Tengo el izquierdo, mica intacta. Te mando foto al WhatsApp.',
    daysAgo: 0
  },
  {
    id: 'o-002',
    requestId: 'r-001',
    tenantSlug: 'desarmaduria-san-javier',
    price: 38000,
    city: 'San Javier',
    state: 'usado regular',
    canShip: true,
    message: 'Tengo uno con detalle menor en mica. Boleta y garantía 7 días.',
    daysAgo: 0
  }
]

export const dummyUser = {
  name: 'Rodrigo C.',
  city: 'Linares',
  whatsapp: '+56 9 5555 1234',
  email: 'rodrigo@example.cl',
  tenantSlug: 'piezas-b16-linares',
  isAdmin: true,
  metrics: {
    activeRequests: 2,
    publishedParts: 23,
    receivedOffers: 11,
    contactsGenerated: 47
  }
}

export const adminMetrics = {
  registeredUsers: 312,
  activeTenants: 28,
  pendingPosts: 7,
  reportedPosts: 3,
  activeRequests: 41,
  generatedOffers: 138,
  verifiedSellers: 12,
  weeklyContacts: 89
}

export const adminQueue = [
  { id: 'q-001', type: 'publicacion', title: 'Foco trasero Mazda 3 2010', tenant: 'Repuestos El Taller', status: 'pendiente', daysAgo: 0 },
  { id: 'q-002', type: 'reporte', title: 'Llantas aro 17 — posible duplicado', tenant: 'Tuning Parral', status: 'reportado', daysAgo: 1 },
  { id: 'q-003', type: 'verificacion', title: 'Verificar Desarmaduría San Javier', tenant: 'Desarmaduría San Javier', status: 'pendiente', daysAgo: 2 },
  { id: 'q-004', type: 'publicacion', title: 'Caja Suzuki Swift 2015', tenant: 'JDM Maule', status: 'pendiente', daysAgo: 0 },
  { id: 'q-005', type: 'reporte', title: 'Motor Honda Civic — sospecha vendida', tenant: 'Repuestos El Taller', status: 'reportado', daysAgo: 3 }
]

export const statusMeta = {
  disponible: { label: 'Disponible', color: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30', dot: 'bg-emerald-400' },
  reservado: { label: 'Reservado', color: 'bg-amber-500/15 text-amber-300 border-amber-500/30', dot: 'bg-amber-400' },
  vendido: { label: 'Vendido', color: 'bg-zinc-500/15 text-zinc-400 border-zinc-500/30', dot: 'bg-zinc-500' },
  no_confirmado: { label: 'No confirmado', color: 'bg-rose-500/15 text-rose-300 border-rose-500/30', dot: 'bg-rose-400' }
}

export const urgencyMeta = {
  baja: { label: 'Urgencia baja', color: 'bg-zinc-700/40 text-zinc-300 border-zinc-600/40' },
  media: { label: 'Urgencia media', color: 'bg-amber-500/15 text-amber-300 border-amber-500/30' },
  alta: { label: 'Urgencia alta', color: 'bg-rose-500/15 text-rose-300 border-rose-500/30' }
}

export const formatCLP = (n) =>
  '$' + new Intl.NumberFormat('es-CL').format(n)

export const tenantBySlug = (slug) => tenants.find((t) => t.slug === slug)
export const partById = (id) => parts.find((p) => p.id === id)
export const requestById = (id) => requests.find((r) => r.id === id)
export const partsByTenant = (slug) => parts.filter((p) => p.tenantSlug === slug)
