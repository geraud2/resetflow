import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Calendar, Users, Clock, Eye, CheckCircle, Clock as ClockIcon, 
  Sparkles, ArrowUpRight, ArrowDownRight, Ticket, QrCode, MapPin, User, 
  Star, Trophy, Award, TrendingUp, Activity, Zap, Crown, Medal, 
  Filter, MoreVertical, MessageCircle, Share2, Download, Menu, X,
  Home, LayoutDashboard, Hotel, Bell, Settings, LogOut
} from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { reservations } from '../../data/mockData';
import { Link, useLocation } from 'react-router-dom';

export function ReservationsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const filtered = reservations.filter((r) => {
    const searchLower = search.toLowerCase();
    const matchSearch = 
      r.client.toLowerCase().includes(searchLower) ||
      r.activity.toLowerCase().includes(searchLower) ||
      r.playerNumber.toString().includes(searchLower);
    const matchFilter = filter === 'all' || r.status === filter;
    return matchSearch && matchFilter;
  });

  const stats = [
    { label: 'Confirmées', value: reservations.filter(r => r.status === 'confirmed').length, change: '+12%', icon: CheckCircle, color: '#10b981', gradient: 'from-emerald-500/20 to-teal-500/20' },
    { label: 'En attente', value: reservations.filter(r => r.status === 'pending').length, change: '+5%', icon: ClockIcon, color: '#f59e0b', gradient: 'from-amber-500/20 to-orange-500/20' },
    { label: 'Liste attente', value: reservations.filter(r => r.status === 'waitlist').length, change: '-3%', icon: Users, color: '#0ea5e9', gradient: 'from-sky-500/20 to-blue-500/20' },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'confirmed': return { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30', dot: 'bg-emerald-500', label: 'Confirmée' };
      case 'pending': return { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30', dot: 'bg-amber-500', label: 'En attente' };
      case 'waitlist': return { bg: 'bg-sky-500/10', text: 'text-sky-400', border: 'border-sky-500/30', dot: 'bg-sky-500', label: 'Liste d\'attente' };
      default: return { bg: 'bg-gray-500/10', text: 'text-gray-400', border: 'border-gray-500/30', dot: 'bg-gray-500', label: status };
    }
  };

  const filters = [
    { value: 'all', label: 'Toutes', count: filtered.length },
    { value: 'confirmed', label: 'Confirmées', count: reservations.filter(r => r.status === 'confirmed').length },
    { value: 'pending', label: 'En attente', count: reservations.filter(r => r.status === 'pending').length },
    { value: 'waitlist', label: 'Liste attente', count: reservations.filter(r => r.status === 'waitlist').length }
  ];

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Hotel, label: 'Réservations', path: '/admin/reservations' },
    { icon: Calendar, label: 'Activités', path: '/admin/activites' },
    { icon: Users, label: 'Animateurs', path: '/admin/animateurs' },
    { icon: QrCode, label: 'QR Codes', path: '/admin/qrcodes' },
    { icon: Bell, label: 'Notifications', path: '/admin/notifications' },
    { icon: Settings, label: 'Paramètres', path: '/admin/parametres' },
  ];

  const clientAvatars = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
          <motion.div 
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            className="absolute left-0 top-0 bottom-0 w-72 bg-gradient-to-b from-slate-900 to-slate-950 border-r border-white/10 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center">
                  <Activity size={20} className="text-white" />
                </div>
                <div>
                  <span className="text-white font-bold text-lg">RESORTFLOW</span>
                  <span className="text-sky-400 font-bold text-lg"> AI</span>
                </div>
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
              <div className="pt-4 mt-4 border-t border-white/10">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all">
                  <LogOut size={18} />
                  <span className="text-sm font-medium">Déconnexion</span>
                </button>
              </div>
            </nav>
          </motion.div>
        </div>
      )}

      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => setMobileMenuOpen(true)} className="p-2 rounded-lg bg-white/10">
            <Menu size={20} className="text-white" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center">
              <Activity size={16} className="text-white" />
            </div>
            <span className="font-bold text-white text-sm">RESORTFLOW AI</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="relative p-2 rounded-lg bg-white/10">
            <Bell size={18} className="text-white/70" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <img 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop" 
            alt="Admin" 
            className="w-8 h-8 rounded-lg object-cover ring-2 ring-sky-500/30"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-sky-600/30 via-blue-600/30 to-indigo-600/30 backdrop-blur-xl p-5 sm:p-8 border border-white/20">
          <div className="absolute -top-20 -right-20 w-60 h-60 sm:w-80 sm:h-80 bg-gradient-to-r from-sky-500/30 to-cyan-500/30 rounded-full blur-3xl animate-pulse" />
          <div className="relative">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <div className="px-3 py-1 bg-white/20 backdrop-blur rounded-full">
                <span className="text-white/90 text-xs font-medium">✨ Interface Premium</span>
              </div>
              <div className="px-3 py-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur rounded-full border border-amber-500/30">
                <span className="text-amber-300 text-xs font-medium">🏆 Live Analytics</span>
              </div>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2">Réservations</h2>
            <p className="text-white/60 text-sm sm:text-base">
              Gérez toutes les réservations de votre établissement en temps réel
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((s, idx) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className={`relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br ${s.gradient} backdrop-blur-xl p-4 sm:p-5 border border-white/20`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center border border-white/30`}>
                  <s.icon size={20}  style={{ color: s.color }} />
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${s.change.startsWith('+') ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                  {s.change.startsWith('+') ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {s.change}
                </div>
              </div>
              <div className="text-2xl sm:text-4xl font-bold text-white mb-1">{s.value}</div>
              <div className="text-white/60 text-xs sm:text-sm font-medium">{s.label}</div>
              <div className="mt-3 flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${(s.value / reservations.length) * 100}%`, background: s.color }} />
                </div>
                <span className="text-white/40 text-xs">{Math.round((s.value / reservations.length) * 100)}%</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un client, une activité ou un numéro de joueur..."
              className="w-full bg-white/10 backdrop-blur-xl rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-sky-500/50 border border-white/20"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                  filter === f.value
                    ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-lg shadow-sky-500/30'
                    : 'bg-white/10 text-white/60 hover:text-white hover:bg-white/20 border border-white/20'
                }`}
              >
                {f.label} <span className="ml-1 px-1.5 py-0.5 rounded-md bg-white/20 text-[10px] sm:text-xs">{f.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Cards View */}
        <div className="lg:hidden space-y-3">
          {filtered.slice(0, 5).map((r, idx) => {
            const status = getStatusStyle(r.status);
            const avatar = clientAvatars[idx % clientAvatars.length];
            return (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20"
              >
                <div className="flex items-center gap-3 mb-3">
                  <img src={avatar} alt={r.client} className="w-12 h-12 rounded-xl object-cover ring-2 ring-sky-500/30" />
                  <div className="flex-1">
                    <div className="text-white font-semibold">{r.client}</div>
                    <div className="text-white/40 text-xs">Chambre {r.room}</div>
                  </div>
                  <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium ${status.bg} ${status.text} border ${status.border}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                    {status.label}
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <Trophy size={14} className="text-sky-400" />
                    <span>{r.activity}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <Clock size={14} className="text-sky-400" />
                    <span>{r.time}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
                      <Star size={12} className="text-amber-400" />
                    </div>
                    <span className="text-white font-bold">#{r.playerNumber}</span>
                  </div>
                  <button className="px-3 py-1.5 bg-sky-500/20 rounded-lg text-sky-400 text-xs font-medium">
                    Voir détails
                  </button>
                </div>
              </motion.div>
            );
          })}
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <Calendar size={40} className="text-white/20 mx-auto mb-3" />
              <p className="text-white/40">Aucune réservation</p>
            </div>
          )}
          {filtered.length > 5 && (
            <button className="w-full py-3 text-center text-sky-400 text-sm font-medium">
              Voir plus ({filtered.length - 5} réservations)
            </button>
          )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-white/50 uppercase">Client</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-white/50 uppercase">Activité</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-white/50 uppercase">Horaire</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-white/50 uppercase">Lieu</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-white/50 uppercase">Joueur</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-white/50 uppercase">Statut</th>
                  <th className="px-6 py-4" />
                 </tr>
              </thead>
              <tbody>
                {filtered.map((r, idx) => {
                  const status = getStatusStyle(r.status);
                  const avatar = clientAvatars[idx % clientAvatars.length];
                  return (
                    <tr key={r.id} className="border-b border-white/5 hover:bg-white/5 transition-all group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={avatar} alt={r.client} className="w-10 h-10 rounded-xl object-cover ring-2 ring-sky-500/30" />
                          <div>
                            <div className="text-white font-semibold">{r.client}</div>
                            <div className="text-white/40 text-xs">Ch. {r.room}</div>
                          </div>
                        </div>
                       </td>
                      <td className="px-6 py-4 text-white">{r.activity}</td>
                      <td className="px-6 py-4 text-white/60 font-mono">{r.time}</td>
                      <td className="px-6 py-4 text-white/60">Piscine</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
                            <Star size={12} className="text-amber-400" />
                          </div>
                          <span className="text-white font-bold">#{r.playerNumber}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium ${status.bg} ${status.text} border ${status.border}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                          {status.label}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button className="p-2 rounded-lg hover:bg-white/10 transition-all">
                          <Eye size={16} className="text-white/40 hover:text-sky-400" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <Calendar size={48} className="text-white/20 mx-auto mb-3" />
              <p className="text-white/40">Aucune réservation trouvée</p>
            </div>
          )}
        </div>

        {/* Bottom Navigation Mobile
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-xl border-t border-white/10 py-2 px-4 z-40">
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

        {/* Marge pour bottom nav sur mobile */}
        <div className="lg:hidden h-16" />
      </div>
    </div>
  );
}