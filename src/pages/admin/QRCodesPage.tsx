import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, Download, Share2, Waves, RefreshCw, Sparkles, Flame, Zap, Eye, Heart, Bell, Menu, X, Home, LayoutDashboard, Calendar, Users, Ticket, Settings, LogOut, Activity, Star, Trophy, Award, Globe, MapPin, Clock } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { activities } from '../../data/mockData';
import { Link, useLocation } from 'react-router-dom';

function MockQRCode({ size = 160 }: { size?: number }) {
  const cells = 21;
  const cellSize = size / cells;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rounded-lg">
      <rect width={size} height={size} fill="white" rx="8" />
      {Array.from({ length: cells }).map((_, row) =>
        Array.from({ length: cells }).map((_, col) => {
          const isCorner = (row < 7 && col < 7) || (row < 7 && col >= cells - 7) || (row >= cells - 7 && col < 7);
          const isInnerCorner = (row >= 2 && row < 5 && col >= 2 && col < 5) ||
            (row >= 2 && row < 5 && col >= cells - 5 && col < cells - 2) ||
            (row >= cells - 5 && row < cells - 2 && col >= 2 && col < 5);
          const isOuterBorder = isCorner && !((row >= 1 && row < 6 && col >= 1 && col < 6) ||
            (row >= 1 && row < 6 && col >= cells - 6 && col < cells - 1) ||
            (row >= cells - 6 && row < cells - 1 && col >= 1 && col < 6));
          const isDark = isOuterBorder || isInnerCorner || (!isCorner && Math.random() > 0.6);
          if (!isDark) return null;
          return (
            <rect
              key={`${row}-${col}`}
              x={col * cellSize + 1}
              y={row * cellSize + 1}
              width={cellSize - 1}
              height={cellSize - 1}
              fill="#0ea5e9"
              rx="1"
            />
          );
        })
      )}
    </svg>
  );
}

export function QRCodesPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Calendar, label: 'Activités', path: '/admin/activites' },
    { icon: Users, label: 'Animateurs', path: '/admin/animateurs' },
    { icon: Ticket, label: 'Réservations', path: '/admin/reservations' },
    { icon: QrCode, label: 'QR Codes', path: '/admin/qrcodes' },
    { icon: Bell, label: 'Notifications', path: '/admin/notifications' },
    { icon: Settings, label: 'Paramètres', path: '/admin/parametres' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      
      {/* Header Fixe */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-slate-900/95 backdrop-blur-xl shadow-2xl border-b border-white/10' : 'bg-transparent'
        }`}
      >
        <div className="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl blur-lg opacity-50 animate-pulse" />
              <div className="relative w-10 h-10 bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Activity size={20} className="text-white" />
              </div>
            </motion.div>
            <div>
              <h1 className="text-white font-bold text-lg">RESORTFLOW <span className="text-sky-400">AI</span></h1>
              <p className="text-white/40 text-[10px] hidden sm:block">Gestion d'animation hôtelière</p>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30' 
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all">
              <Bell size={18} className="text-white/70" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setMobileMenuOpen(true)} className="lg:hidden p-2 rounded-xl bg-white/10">
              <Menu size={18} className="text-white" />
            </motion.button>
            <motion.img whileHover={{ scale: 1.05 }} src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop" alt="Admin" className="hidden sm:block w-9 h-9 rounded-xl object-cover ring-2 ring-sky-500/30 cursor-pointer" />
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 lg:hidden" onClick={() => setMobileMenuOpen(false)}>
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }} className="absolute left-0 top-0 bottom-0 w-72 bg-gradient-to-b from-slate-900 to-slate-950 border-r border-white/10 p-6" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center">
                    <Activity size={20} className="text-white" />
                  </div>
                  <span className="text-white font-bold text-lg">RESORTFLOW AI</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg bg-white/10"><X size={18} className="text-white" /></button>
              </div>
              <nav className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link key={item.path} to={item.path} onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30' : 'text-white/60 hover:text-white hover:bg-white/10'}`}>
                      <Icon size={18} /><span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  );
                })}
                <div className="pt-4 mt-4 border-t border-white/10">
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"><LogOut size={18} /><span className="text-sm font-medium">Déconnexion</span></button>
                </div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pt-20 pb-24 lg:pb-8">
        <div className="p-4 sm:p-6 lg:p-8 space-y-8">
          
          {/* Hero Section */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-600/20 via-blue-600/20 to-indigo-600/20 backdrop-blur-xl p-6 sm:p-8 border border-white/20">
            <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-r from-sky-500/30 to-cyan-500/30 rounded-full blur-3xl" />
            <motion.div animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 5, repeat: Infinity, delay: 0.5 }} className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }} className="px-3 py-1 bg-white/20 backdrop-blur rounded-full">
                  <span className="text-white/90 text-xs font-medium flex items-center gap-1"><Sparkles size={12} className="text-amber-300" /> Accès instantané</span>
                </motion.div>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.3 }} className="px-3 py-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur rounded-full border border-amber-500/30">
                  <span className="text-amber-300 text-xs font-medium flex items-center gap-1"><Flame size={12} /> 8,412 scans</span>
                </motion.div>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.4 }} className="px-3 py-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur rounded-full border border-emerald-500/30">
                  <span className="text-emerald-300 text-xs font-medium flex items-center gap-1"><Zap size={12} /> Taux adoption 94%</span>
                </motion.div>
              </div>
              <motion.h2 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="text-3xl sm:text-5xl font-bold text-white mb-2">QR Codes</motion.h2>
              <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="text-white/60 text-base">Codes d'accès rapide pour vos clients</motion.p>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: Eye, label: 'Scans aujourd\'hui', value: '247', color: 'from-sky-500/20 to-blue-500/20', border: 'border-sky-500/30', textColor: 'text-sky-400' },
              { icon: Activity, label: 'Scans ce mois', value: '8,412', color: 'from-amber-500/20 to-orange-500/20', border: 'border-amber-500/30', textColor: 'text-amber-400' },
              { icon: Star, label: 'Taux adoption', value: '94%', color: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-500/30', textColor: 'text-purple-400' },
              { icon: Users, label: 'Clients actifs', value: '1,247', color: 'from-emerald-500/20 to-teal-500/20', border: 'border-emerald-500/30', textColor: 'text-emerald-400' },
            ].map((stat, idx) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 + idx * 0.1 }} whileHover={{ y: -5, scale: 1.02 }} className={`bg-gradient-to-br ${stat.color} backdrop-blur-xl rounded-xl p-3 border ${stat.border} transition-all duration-300`}>
                <div className="flex items-center gap-2 mb-1"><stat.icon size={14} className={stat.textColor} /><span className="text-white/50 text-xs">{stat.label}</span></div>
                <div className={`text-lg font-bold ${stat.textColor}`}>{stat.value}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Main QR Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/20"
          >
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex flex-col items-center gap-4">
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="p-4 rounded-2xl shadow-2xl bg-white"
                  style={{ boxShadow: '0 20px 60px rgba(14,165,233,0.3)' }}
                >
                  <MockQRCode size={200} />
                </motion.div>
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary" icon={<Download size={14} />}>PNG</Button>
                  <Button size="sm" variant="secondary" icon={<Share2 size={14} />}>Partager</Button>
                  <Button size="sm" variant="secondary" icon={<RefreshCw size={14} />}>Régénérer</Button>
                </div>
              </div>
              <div className="flex-1 text-center lg:text-left">
                <div className="flex items-center gap-3 mb-4 justify-center lg:justify-start">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 flex items-center justify-center">
                    <Waves className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">Code d'accès Principal</div>
                    <div className="text-sm text-white/50">Resort Grand Palais — Été 2026</div>
                  </div>
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  Ce QR code permet à vos clients de s'enregistrer et d'accéder à toutes les activités disponibles. 
                  Affichez-le dans le lobby, la piscine et les zones de loisirs.
                </p>
                <div className="grid grid-cols-3 gap-3 max-w-md mx-auto lg:mx-0">
                  <div className="bg-white/5 rounded-xl p-3 text-center">
                    <div className="text-xl font-bold text-sky-400">247</div>
                    <div className="text-white/40 text-xs">Scans aujourd'hui</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 text-center">
                    <div className="text-xl font-bold text-amber-400">8,412</div>
                    <div className="text-white/40 text-xs">Total ce mois</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 text-center">
                    <div className="text-xl font-bold text-emerald-400">94%</div>
                    <div className="text-white/40 text-xs">Taux adoption</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Activity QR Codes */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">QR Codes par activité</h3>
                <p className="text-white/40 text-sm">Accès rapide pour chaque activité</p>
              </div>
              <Button variant="secondary" icon={<Download size={14} />}>Tout exporter</Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {activities.slice(0, 8).map((act, i) => (
                <motion.div
                  key={act.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + i * 0.05 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/20 hover:border-white/30 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex justify-center mb-3">
                    <motion.div whileHover={{ scale: 1.05 }} className="p-2 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
                      <MockQRCode size={100} />
                    </motion.div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-white">{act.name}</div>
                    <div className="flex items-center justify-center gap-2 text-white/40 text-xs mt-1">
                      <Clock size={10} /> {act.time}
                      <MapPin size={10} /> {act.location.split(' ')[0]}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 flex items-center justify-center gap-1 py-1.5 text-xs bg-white/10 hover:bg-white/20 rounded-lg text-white/60 hover:text-white transition-colors">
                      <Download size={11} /> PNG
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1 py-1.5 text-xs bg-white/10 hover:bg-white/20 rounded-lg text-white/60 hover:text-white transition-colors">
                      <QrCode size={11} /> SVG
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation Mobile */}
            
    </div>
  );
}