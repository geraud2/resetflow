import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { Bell, Search, Menu, Waves, X } from 'lucide-react';
import { useState } from 'react';

export function AdminLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const pageTitles: Record<string, string> = {
    '/admin': 'Dashboard',
    '/admin/activites': 'Activités',
    '/admin/animateurs': 'Animateurs',
    '/admin/reservations': 'Réservations',
    '/admin/qrcodes': 'QR Codes',
    '/admin/notifications': 'Notifications',
    '/admin/parametres': 'Paramètres',
  };

  const menuItems = [
    { label: 'Dashboard', path: '/admin' },
    { label: 'Activités', path: '/admin/activites' },
    { label: 'Animateurs', path: '/admin/animateurs' },
    { label: 'Réservations', path: '/admin/reservations' },
    { label: 'QR Codes', path: '/admin/qrcodes' },
    { label: 'Notifications', path: '/admin/notifications' },
    { label: 'Paramètres', path: '/admin/parametres' },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #050d1a 0%, #0a1628 50%, #050d1a 100%)' }}>
      {/* Sidebar desktop - toujours visible sur lg */}
      <Sidebar />

      {/* Header mobile */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-30 backdrop-blur-xl bg-white/5 border-b border-white/10 px-4 py-3 flex items-center gap-3">
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          className="text-white/60 hover:text-white"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div className="flex items-center gap-2 flex-1">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center">
            <Waves className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white">ResortFlow</span>
        </div>
        <button className="relative text-white/60 hover:text-white">
          <Bell size={20} />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-sky-500 rounded-full" />
        </button>
      </header>

      {/* Menu mobile overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <div className="absolute left-0 top-0 bottom-0 w-64 backdrop-blur-xl bg-white/10 border-r border-white/20 p-6">
            <div className="flex items-center gap-2 mb-8 pb-4 border-b border-white/10">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-sky-500 to-cyan-500 flex items-center justify-center">
                <Waves size={18} className="text-white" />
              </div>
              <span className="font-bold text-white text-lg">ResortFlow</span>
            </div>
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    location.pathname === item.path 
                      ? 'bg-sky-500/20 text-sky-400' 
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Contenu principal */}
      <main className="lg:pl-64 pt-16 lg:pt-0 min-h-screen">
        {/* Top bar desktop */}
        <div className="hidden lg:flex items-center justify-between px-8 py-5 border-b border-white/10">
          <div>
            <h1 className="text-xl font-bold text-white">
              {pageTitles[location.pathname] || 'Administration'}
            </h1>
            <p className="text-xs text-white/40 mt-0.5">
              {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white/5 backdrop-blur rounded-xl px-3 py-2 flex items-center gap-2 text-white/40">
              <Search size={14} />
              <span className="text-sm">Rechercher...</span>
            </div>
            <div className="relative">
              <button className="w-9 h-9 bg-white/5 backdrop-blur rounded-xl flex items-center justify-center text-white/60 hover:text-white transition-colors">
                <Bell size={16} />
              </button>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-sky-500 rounded-full animate-pulse" />
            </div>
            <img
              src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100"
              className="w-9 h-9 rounded-xl object-cover ring-2 ring-sky-500/30"
              alt="Admin"
            />
          </div>
        </div>

        {/* Contenu dynamique de la page */}
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-4 lg:p-8"
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
}