# BuscaPieza Maule — Maqueta visual

Marketplace local de repuestos usados de autos para la región del Maule.
**Solo demo visual, sin backend real, sin pagos, sin WhatsApp API.**

## Cómo correr

```bash
cd sandbox/buscapieza-maule-demo
npm install
npm run dev
```

Por defecto abre en http://localhost:5180

## Stack

- React 18 + Vite 5
- React Router 6 (rutas en cliente)
- Tailwind CSS 3 (estética dark + naranja racing #ff6a1a + Rajdhani)
- lucide-react (iconos)
- Datos mock en `src/data/mockData.js`

## Rutas

| Ruta                          | Vista                                   |
|-------------------------------|-----------------------------------------|
| `/`                           | Landing                                 |
| `/buscar`                     | Marketplace tradicional + filtros       |
| `/repuesto/:id`               | Detalle de repuesto                     |
| `/publicar-busqueda`          | Form para publicar búsqueda             |
| `/busquedas`                  | Marketplace invertido (búsquedas)       |
| `/responder/:id`              | Form para responder con oferta          |
| `/dashboard`                  | Dashboard del usuario (subrutas)        |
| `/tenant`                     | Dashboard del tenant/vendedor           |
| `/vendedores`                 | Listado de tenants                      |
| `/vendedores/:slug`           | Perfil público del vendedor             |
| `/admin`                      | Panel admin de plataforma               |
| `/admin/cola`                 | Cola de moderación                      |

## Qué está simulado

- Acciones de WhatsApp → `alert()` con mensaje informativo
- Submits de formularios → confirmación visual, no envían a un backend
- Subida de fotos → solo muestra el nombre del archivo
- Filtros del marketplace → corren en cliente sobre datos mock
- Reportes / aprobaciones admin → solo `alert()`

## Estructura

```
buscapieza-maule-demo/
├── package.json
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── data/
    │   └── mockData.js
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── Hero.jsx
    │   ├── PartCard.jsx
    │   ├── RequestCard.jsx
    │   ├── TenantCard.jsx
    │   ├── StatusBadge.jsx
    │   ├── MockPhoto.jsx
    │   ├── FilterSidebar.jsx
    │   └── DashboardLayout.jsx
    ├── pages/
    │   ├── Home.jsx
    │   ├── SearchParts.jsx
    │   ├── PartDetail.jsx
    │   ├── PublishRequest.jsx
    │   ├── ActiveRequests.jsx
    │   ├── ReplyOffer.jsx
    │   ├── UserDashboard.jsx
    │   ├── TenantDashboard.jsx
    │   ├── SellerProfile.jsx
    │   └── AdminPanel.jsx
    └── styles/
        └── globals.css
```

## Para conectar a backend real (etapa 2)

- Centralizar accesos en `src/data/mockData.js` → reemplazar por un cliente HTTP/PocketBase.
- Multi-tenant: cada `tenant.slug` ya está modelado, basta sumar tabla `tenants` y FK desde `parts`/`requests`.
- Auth real (login + sesión) — agregar `<AuthProvider>` arriba de `<App />`.
- WhatsApp: hoy los CTAs llaman `alert()`. Cambiarlos por `https://wa.me/<numero>?text=<mensaje>`.
- Subida de imágenes: hoy solo lee el filename. Conectar a R2/Supabase Storage.
- Moderación admin: hoy solo `alert()`. Wirear endpoints PATCH/DELETE.

## No incluido (a propósito)

- Sin secretos, API keys ni credenciales reales.
- Sin código de pasarela de pago.
- Sin integración WhatsApp Business API.
- Sin lógica de notificaciones reales.
- Sin tests automatizados (es maqueta visual).
