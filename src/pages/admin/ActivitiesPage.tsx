import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Plus, Clock, MapPin, Users, X, Star, Trophy, Award, TrendingUp, Calendar, Sparkles, Flame, Crown, Zap, Eye, Heart, Share2, Bell, Menu } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { activities } from '../../data/mockData';
import { Link, useLocation } from 'react-router-dom';

const categories = ['Tous', 'Water', 'Sport', 'Wellness', 'Fitness', 'Kids'];

export function ActivitiesPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [selected, setSelected] = useState<typeof activities[0] | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filtered = activities.filter((a) => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'Tous' || a.category === activeCategory;
    return matchSearch && matchCat;
  });

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/admin' },
    { icon: Calendar, label: 'Activités', path: '/admin/activites' },
    { icon: Users, label: 'Animateurs', path: '/admin/animateurs' },
    { icon: Ticket, label: 'Réservations', path: '/admin/reservations' },
    { icon: QrCode, label: 'QR Codes', path: '/admin/qrcodes' },
    { icon: Bell, label: 'Notifications', path: '/admin/notifications' },
    { icon: Settings, label: 'Paramètres', path: '/admin/parametres' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      
      {/* Header Fixe avec animation */}
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
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
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
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all"
            >
              <Bell size={18} className="text-white/70" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-white/10"
            >
              <Menu size={18} className="text-white" />
            </motion.button>
            <motion.img 
              whileHover={{ scale: 1.05 }}
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop" 
              alt="Admin" 
              className="hidden sm:block w-9 h-9 rounded-xl object-cover ring-2 ring-sky-500/30 cursor-pointer"
            />
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div 
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="absolute left-0 top-0 bottom-0 w-72 bg-gradient-to-b from-slate-900 to-slate-950 border-r border-white/10 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center">
                    <Activity size={20} className="text-white" />
                  </div>
                  <span className="text-white font-bold text-lg">RESORTFLOW AI</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg bg-white/10">
                  <X size={18} className="text-white" />
                </button>
              </div>
              <nav className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        isActive 
                          ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30' 
                          : 'text-white/60 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Icon size={18} />
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content avec padding pour header fixe */}
      <main className="pt-20 pb-24 lg:pb-8">
        <div className="p-4 sm:p-6 lg:p-8 space-y-8">
          
          {/* Hero Section Animée */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-600/20 via-blue-600/20 to-indigo-600/20 backdrop-blur-xl p-6 sm:p-8 border border-white/20"
          >
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-r from-sky-500/30 to-cyan-500/30 rounded-full blur-3xl"
            />
            <motion.div 
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
              className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-full blur-3xl"
            />
            <div className="relative">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="px-3 py-1 bg-white/20 backdrop-blur rounded-full"
                >
                  <span className="text-white/90 text-xs font-medium flex items-center gap-1">
                    <Sparkles size={12} className="text-amber-300" /> Interface Premium
                  </span>
                </motion.div>
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.3 }}
                  className="px-3 py-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur rounded-full border border-amber-500/30"
                >
                  <span className="text-amber-300 text-xs font-medium flex items-center gap-1">
                    <Flame size={12} /> Live Analytics
                  </span>
                </motion.div>
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.4 }}
                  className="px-3 py-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur rounded-full border border-emerald-500/30"
                >
                  <span className="text-emerald-300 text-xs font-medium flex items-center gap-1">
                    <Zap size={12} /> Temps réel
                  </span>
                </motion.div>
              </div>
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="text-3xl sm:text-5xl font-bold text-white mb-2"
              >
                Activités
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="text-white/60 text-base"
              >
                {filtered.length} activité{filtered.length > 1 ? 's' : ''} disponible{filtered.length > 1 ? 's' : ''}
              </motion.p>
            </div>
          </motion.div>

          {/* Stats Cards Animées */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            {[
              { icon: Calendar, label: 'Aujourd\'hui', value: activities.length, color: 'from-sky-500/20 to-blue-500/20', border: 'border-sky-500/30', textColor: 'text-sky-400' },
              { icon: Users, label: 'Participants', value: '247', color: 'from-emerald-500/20 to-teal-500/20', border: 'border-emerald-500/30', textColor: 'text-emerald-400' },
              { icon: Trophy, label: 'Populaire', value: 'Water Polo', color: 'from-amber-500/20 to-orange-500/20', border: 'border-amber-500/30', textColor: 'text-amber-400' },
              { icon: Star, label: 'Top animateur', value: 'Ahmed', color: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-500/30', textColor: 'text-purple-400' },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + idx * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`bg-gradient-to-br ${stat.color} backdrop-blur-xl rounded-xl p-3 border ${stat.border} transition-all duration-300`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <stat.icon size={14} className={stat.textColor} />
                  <span className="text-white/50 text-xs">{stat.label}</span>
                </div>
                <div className={`text-lg font-bold ${stat.textColor}`}>{stat.value}</div>
                {stat.label === 'Top animateur' && <div className="text-white/30 text-[10px]">⭐ 4.9/5</div>}
                {stat.label === 'Populaire' && <div className="text-white/30 text-[10px]">45 participants</div>}
                {stat.label === 'Participants' && <div className="text-white/30 text-[10px]">actifs</div>}
                {stat.label === 'Aujourd\'hui' && <div className="text-white/30 text-[10px]">activités</div>}
              </motion.div>
            ))}
          </motion.div>

          {/* Search & Filters Animés */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher une activité..."
                className="w-full bg-white/10 backdrop-blur-xl rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-sky-500/50 border border-white/20 transition-all"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {categories.map((cat, idx) => (
                <motion.button
                  key={cat}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + idx * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                    activeCategory === cat
                      ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-lg shadow-sky-500/30'
                      : 'bg-white/10 text-white/60 hover:text-white hover:bg-white/20 border border-white/20'
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4">
            <AnimatePresence>
              {filtered.slice(0, 5).map((act, idx) => {
                const pct = Math.round((act.participants / act.maxParticipants) * 100);
                return (
                  <motion.div
                    key={act.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ y: -3 }}
                    onClick={() => setSelected(act)}
                    className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl overflow-hidden border border-white/20 cursor-pointer transition-all duration-300"
                  >
                    <div className="relative h-32">
                      <img src={act.image} alt={act.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute top-2 right-2">
                        <Badge variant={act.status as 'active' | 'full' | 'upcoming'} dot>
                          {act.status === 'active' ? 'En cours' : act.status === 'full' ? 'Complet' : 'À venir'}
                        </Badge>
                      </div>
                      <div className="absolute bottom-2 left-3">
                        <div className="text-white font-bold text-base">{act.name}</div>
                        <div className="flex items-center gap-2 text-white/70 text-xs">
                          <Clock size={10} /> {act.time}
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 text-white/60 text-xs">
                          <MapPin size={12} className="text-sky-400" />
                          {act.location}
                        </div>
                        <div className="flex items-center gap-1 text-white/60 text-xs">
                          <Users size={12} className="text-sky-400" />
                          {act.participants}/{act.maxParticipants}
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            className="h-full rounded-full"
                            style={{ background: act.color }}
                          />
                        </div>
                        <span className="text-white/40 text-[10px]">{pct}%</span>
                      </div>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10">
                        <div className="text-white/40 text-[10px]">Animateur: {act.animateur}</div>
                        <motion.button 
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-1 bg-sky-500/20 rounded-lg text-sky-400 text-xs font-medium"
                        >
                          Détails
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            {filtered.length > 5 && (
              <motion.button 
                whileHover={{ scale: 1.02 }}
                className="w-full py-2 text-center text-sky-400 text-sm font-medium"
              >
                Voir plus ({filtered.length - 5})
              </motion.button>
            )}
          </div>

          {/* Desktop Grid */}
          <div className="hidden lg:grid grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((act, i) => {
                const pct = Math.round((act.participants / act.maxParticipants) * 100);
                return (
                  <motion.div
                    key={act.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    onClick={() => setSelected(act)}
                    className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl overflow-hidden cursor-pointer border border-white/20 hover:border-white/30 transition-all duration-300"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <motion.img
                        src={act.image}
                        alt={act.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-3 right-3">
                        <Badge variant={act.status as 'active' | 'full' | 'upcoming'} dot>
                          {act.status === 'active' ? 'En cours' : act.status === 'full' ? 'Complet' : 'À venir'}
                        </Badge>
                      </div>
                      <div className="absolute bottom-3 left-4">
                        <div className="text-xl font-bold text-white">{act.name}</div>
                        <div className="flex items-center gap-2 text-white/70 text-xs">
                          <Clock size={11} /> {act.time}
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-3 text-sm text-white/50 mb-3">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={13} className="text-sky-400" />
                          {act.location}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users size={13} className="text-sky-400" />
                          {act.participants}/{act.maxParticipants}
                        </div>
                      </div>
                      <div className="space-y-1.5 mb-4">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-white/40">Capacité</span>
                          <span className="font-semibold" style={{ color: pct >= 90 ? '#ef4444' : pct >= 70 ? '#f59e0b' : '#10b981' }}>{pct}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className="h-full rounded-full"
                            style={{ background: act.color }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-white/10">
                        <div className="text-xs text-white/40">Animateur: <span className="text-white/60">{act.animateur}</span></div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button size="sm" variant={act.status === 'full' ? 'secondary' : 'primary'}>
                            {act.status === 'full' ? 'Liste att.' : 'Gérer'}
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-white/10 rounded-2xl"
            >
              <Calendar size={48} className="text-white/20 mx-auto mb-3" />
              <p className="text-white/40">Aucune activité trouvée</p>
            </motion.div>
          )}
        </div>
      </main>

      {/* Bottom Navigation Mobile */}
      {/* <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-t border-white/10 py-2 px-4 z-40">
        <div className="flex justify-around items-center">
          {[
            { icon: Home, label: 'Accueil', path: '/admin' },
            { icon: Calendar, label: 'Activités', path: '/admin/activites' },
            { icon: Ticket, label: 'Réservations', path: '/admin/reservations' },
            { icon: User, label: 'Profil', path: '/admin/parametres' },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-all ${
                  isActive ? 'text-sky-400' : 'text-white/40'
                }`}
              >
                <Icon size={20} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div> */}

      {/* Modal Détails Animé */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl overflow-hidden max-w-md w-full border border-white/20 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-48">
                <img src={selected.image} alt={selected.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <button onClick={() => setSelected(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 backdrop-blur flex items-center justify-center text-white hover:bg-black/70 transition-colors">
                  <X size={16} />
                </button>
                <div className="absolute bottom-4 left-5">
                  <h3 className="text-2xl font-bold text-white">{selected.name}</h3>
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <Clock size={12} /> {selected.time}
                    <MapPin size={12} className="ml-1" /> {selected.location}
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-white/60 text-sm leading-relaxed mb-4">{selected.description}</p>
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="bg-white/5 rounded-xl p-3 text-center">
                    <div className="text-white/40 text-xs mb-1">Participants</div>
                    <div className="text-white font-bold">{selected.participants}/{selected.maxParticipants}</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 text-center">
                    <div className="text-white/40 text-xs mb-1">Animateur</div>
                    <div className="text-white font-bold text-sm">{selected.animateur}</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button fullWidth variant="secondary" onClick={() => setSelected(null)}>Fermer</Button>
                  <Button fullWidth>Modifier</Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Imports manquants pour les icônes
import { Home, Ticket, QrCode, Settings, User, Activity } from 'lucide-react';