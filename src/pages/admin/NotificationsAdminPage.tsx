import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, Clock, CheckCircle2, AlertCircle, Info, AlertTriangle, 
  Trophy, Calendar, Plus, X, Sparkles, Flame, Zap, Eye, 
  Menu, Home, LayoutDashboard, Users, Ticket, QrCode, Settings, 
  LogOut, Activity, Star, Send, Mail, Globe, Filter,
  User
} from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { notifications } from '../../data/mockData';
import { Link, useLocation } from 'react-router-dom';

const iconMap = {
  clock: Clock,
  check: CheckCircle2,
  'map-pin': AlertCircle,
  users: AlertTriangle,
  trophy: Trophy,
  calendar: Calendar,
};

const typeConfig = {
  alert: { color: '#f59e0b', bg: 'bg-amber-500/10', border: 'border-amber-500/30', variant: 'warning' as const, gradient: 'from-amber-500/20 to-orange-500/20' },
  success: { color: '#10b981', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', variant: 'success' as const, gradient: 'from-emerald-500/20 to-teal-500/20' },
  info: { color: '#0ea5e9', bg: 'bg-sky-500/10', border: 'border-sky-500/30', variant: 'info' as const, gradient: 'from-sky-500/20 to-blue-500/20' },
  warning: { color: '#ef4444', bg: 'bg-red-500/10', border: 'border-red-500/30', variant: 'error' as const, gradient: 'from-red-500/20 to-rose-500/20' },
};

export function NotificationsAdminPage() {
  const [notifs, setNotifs] = useState(notifications);
  const [showCompose, setShowCompose] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const markAllRead = () => setNotifs(notifs.map(n => ({ ...n, read: true })));
  const unread = notifs.filter(n => !n.read).length;

  const filteredNotifs = notifs.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'read') return n.read;
    return true;
  });

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Calendar, label: 'Activités', path: '/admin/activites' },
    { icon: Users, label: 'Animateurs', path: '/admin/animateurs' },
    { icon: Ticket, label: 'Réservations', path: '/admin/reservations' },
    { icon: QrCode, label: 'QR Codes', path: '/admin/qrcodes' },
    { icon: Bell, label: 'Notifications', path: '/admin/notifications' },
    { icon: Settings, label: 'Paramètres', path: '/admin/parametres' },
  ];

  const stats = [
    { label: 'Envoyées', value: notifs.length, icon: Bell, color: '#0ea5e9', gradient: 'from-sky-500/20 to-blue-500/20' },
    { label: 'Non lues', value: unread, icon: AlertCircle, color: '#f59e0b', gradient: 'from-amber-500/20 to-orange-500/20' },
    { label: 'Taux lecture', value: `${Math.round(((notifs.length - unread) / notifs.length) * 100)}%`, icon: CheckCircle2, color: '#10b981', gradient: 'from-emerald-500/20 to-teal-500/20' },
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
        <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-5xl mx-auto">
          
          {/* Hero Section */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-600/20 via-blue-600/20 to-indigo-600/20 backdrop-blur-xl p-6 sm:p-8 border border-white/20">
            <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-r from-sky-500/30 to-cyan-500/30 rounded-full blur-3xl" />
            <motion.div animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 5, repeat: Infinity, delay: 0.5 }} className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }} className="px-3 py-1 bg-white/20 backdrop-blur rounded-full">
                  <span className="text-white/90 text-xs font-medium flex items-center gap-1"><Sparkles size={12} className="text-amber-300" /> Communication en temps réel</span>
                </motion.div>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.3 }} className="px-3 py-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur rounded-full border border-amber-500/30">
                  <span className="text-amber-300 text-xs font-medium flex items-center gap-1"><Flame size={12} /> {unread} non lues</span>
                </motion.div>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.4 }} className="px-3 py-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur rounded-full border border-emerald-500/30">
                  <span className="text-emerald-300 text-xs font-medium flex items-center gap-1"><Zap size={12} /> Alertes instantanées</span>
                </motion.div>
              </div>
              <motion.h2 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="text-3xl sm:text-5xl font-bold text-white mb-2">Notifications</motion.h2>
              <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="text-white/60 text-base">Centralisez et gérez toutes vos communications</motion.p>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((s, idx) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 + idx * 0.1 }} whileHover={{ y: -5, scale: 1.02 }} className={`bg-gradient-to-br ${s.gradient} backdrop-blur-xl rounded-xl p-4 border border-white/20 transition-all duration-300`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center"><s.icon size={18} style={{ color: s.color }} /></div>
                  <span className="text-white/50 text-sm">{s.label}</span>
                </div>
                <div className="text-3xl font-bold" style={{ color: s.color }}>{s.value}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Actions Bar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="flex flex-col sm:flex-row gap-3 justify-between">
            <div className="flex gap-2">
              <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === 'all' ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-lg' : 'bg-white/10 text-white/60 hover:text-white'}`}>Toutes ({notifs.length})</button>
              <button onClick={() => setFilter('unread')} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === 'unread' ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-lg' : 'bg-white/10 text-white/60 hover:text-white'}`}>Non lues ({unread})</button>
              <button onClick={() => setFilter('read')} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === 'read' ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-lg' : 'bg-white/10 text-white/60 hover:text-white'}`}>Lues ({notifs.length - unread})</button>
            </div>
            <div className="flex gap-3">
              {unread > 0 && (<Button variant="secondary" size="sm" onClick={markAllRead}>Tout marquer lu</Button>)}
              <Button icon={<Plus size={15} />} size="sm" onClick={() => setShowCompose(true)}>Nouvelle notification</Button>
            </div>
          </motion.div>

          {/* Notifications List */}
          <div className="space-y-3">
            <AnimatePresence>
              {filteredNotifs.map((n, i) => {
                const config = typeConfig[n.type as keyof typeof typeConfig];
                const IconComp = iconMap[n.icon as keyof typeof iconMap] || Bell;
                return (
                  <motion.div
                    key={n.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ delay: i * 0.05 }}
                    className={`group bg-gradient-to-br ${config.gradient} backdrop-blur-xl rounded-2xl p-4 border ${config.border} relative transition-all duration-300 hover:scale-[1.01] cursor-pointer`}
                  >
                    {!n.read && (
                      <>
                        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                        <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </>
                    )}
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl ${config.bg} border ${config.border} flex items-center justify-center shrink-0`}>
                        <IconComp size={20} style={{ color: config.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <span className={`text-base font-bold ${!n.read ? 'text-white' : 'text-white/80'}`}>{n.title}</span>
                          <Badge variant={config.variant}>{n.type}</Badge>
                        </div>
                        <p className="text-sm text-white/60 leading-relaxed">{n.message}</p>
                        <div className="flex items-center gap-1.5 mt-3 text-xs text-white/30">
                          <Clock size={12} />
                          {n.time}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Compose Modal */}
          <AnimatePresence>
            {showCompose && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                onClick={() => setShowCompose(false)}
              >
                <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
                <motion.div
                  initial={{ scale: 0.9, y: 30 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 30 }}
                  className="relative bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-6 max-w-md w-full border border-white/20 shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center"><Mail size={16} className="text-white" /></div>
                      <h3 className="text-lg font-bold text-white">Nouvelle notification</h3>
                    </div>
                    <button onClick={() => setShowCompose(false)} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"><X size={18} className="text-white/70" /></button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-white/50 uppercase mb-1.5 block">Titre</label>
                      <input className="w-full bg-white/10 backdrop-blur rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-sky-500/50 border border-white/20" placeholder="Titre de la notification..." />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-white/50 uppercase mb-1.5 block">Message</label>
                      <textarea className="w-full bg-white/10 backdrop-blur rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-sky-500/50 border border-white/20 resize-none h-24" placeholder="Message de la notification..." />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-white/50 uppercase mb-1.5 block">Type</label>
                      <select className="w-full bg-white/10 backdrop-blur rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 border border-white/20">
                        <option className="bg-slate-900">Info</option>
                        <option className="bg-slate-900">Succès</option>
                        <option className="bg-slate-900">Alerte</option>
                        <option className="bg-slate-900">Warning</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-white/50 uppercase mb-1.5 block">Destinataires</label>
                      <select className="w-full bg-white/10 backdrop-blur rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 border border-white/20">
                        <option className="bg-slate-900">Tous les clients</option>
                        <option className="bg-slate-900">Participants d'une activité</option>
                        <option className="bg-slate-900">Clients VIP</option>
                      </select>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <Button variant="secondary" fullWidth onClick={() => setShowCompose(false)}>Annuler</Button>
                      <Button fullWidth icon={<Send size={14} />} onClick={() => setShowCompose(false)}>Envoyer</Button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Bottom Navigation Mobile */}
      {/* <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-t border-white/10 py-2 px-4 z-40">
        <div className="flex justify-around items-center">
          {[
            { icon: LayoutDashboard, label: 'Accueil', path: '/admin' },
            { icon: Calendar, label: 'Activités', path: '/admin/activites' },
            { icon: Ticket, label: 'Réservations', path: '/admin/reservations' },
            { icon: User, label: 'Profil', path: '/admin/parametres' },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (<Link key={item.path} to={item.path} className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-all ${isActive ? 'text-sky-400' : 'text-white/40'}`}><Icon size={20} /><span className="text-[10px] font-medium">{item.label}</span></Link>);
          })}
        </div>
      </div> */}
    </div>
  );
}