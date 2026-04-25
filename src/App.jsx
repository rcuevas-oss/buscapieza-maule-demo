import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import MobileBottomNav from './components/MobileBottomNav.jsx'

import Home from './pages/Home.jsx'
import SearchParts from './pages/SearchParts.jsx'
import PartDetail from './pages/PartDetail.jsx'
import PublishRequest from './pages/PublishRequest.jsx'
import ActiveRequests from './pages/ActiveRequests.jsx'
import ReplyOffer from './pages/ReplyOffer.jsx'
import UserDashboard from './pages/UserDashboard.jsx'
import TenantDashboard, { TenantsList } from './pages/TenantDashboard.jsx'
import SellerProfile from './pages/SellerProfile.jsx'
import AdminPanel from './pages/AdminPanel.jsx'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col pb-[72px] md:pb-0">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buscar" element={<SearchParts />} />
          <Route path="/repuesto/:id" element={<PartDetail />} />
          <Route path="/publicar-busqueda" element={<PublishRequest />} />
          <Route path="/busquedas" element={<ActiveRequests />} />
          <Route path="/responder/:id" element={<ReplyOffer />} />
          <Route path="/dashboard/*" element={<UserDashboard />} />
          <Route path="/tenant/*" element={<TenantDashboard />} />
          <Route path="/vendedores" element={<TenantsList />} />
          <Route path="/vendedores/:slug" element={<SellerProfile />} />
          <Route path="/admin/*" element={<AdminPanel />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  )
}

function NotFound() {
  return (
    <div className="mx-auto max-w-3xl p-16 text-center">
      <div className="font-display text-6xl font-bold text-neon">404</div>
      <h1 className="mt-3 font-display text-2xl text-white">Esta ruta no existe</h1>
      <p className="muted mt-2">Vuelve al inicio o usa el navbar.</p>
    </div>
  )
}
