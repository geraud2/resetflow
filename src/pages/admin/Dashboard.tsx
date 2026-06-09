import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Hotel, Calendar, Users, Trophy, Tv, Settings, Bell,
  Search, Menu, X, ChevronDown, Activity, Star, Sparkles, Crown,
  Building2, UserCircle, QrCode, Smartphone, Monitor, Languages,
  BarChart3, Bot, Award, Medal, TrendingUp, Clock, MapPin, Phone,
  Plus, Edit, Trash2, CheckCircle, AlertCircle, Filter, Download,
  Share2, RefreshCw, Eye, ThumbsUp, Flame, Gem, Rocket, Compass,
  Code, LogOut, Sun, Cloud, Wind, Droplets
} from 'lucide-react';

// Types
interface Activity {
  id: string;
  name: string;
  type: string;
  time: string;
  location: string;
  animator: string;
  maxParticipants: number;
  currentParticipants: number;
  status: string;
}

interface Animator {
  id: string;
  name: string;
  photo: string;
  nationality: string;
  languages: string[];
  activities: string[];
  rating: number;
}

export function ResortFlowDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState('marhaba_palace');
  const [selectedLanguage, setSelectedLanguage] = useState('fr');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const modules = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/admin' },
    { id: 'hotels', label: 'Hôtels', icon: <Hotel size={18} />, path: '/admin/reservations' },
    { id: 'activities', label: 'Activités', icon: <Activity size={18} />, path: '/admin/activites' },
    { id: 'animators', label: 'Animateurs', icon: <UserCircle size={18} />, path: '/admin/animateurs' },
    { id: 'tournaments', label: 'QR Codes', icon: <Code size={18} />, path: '/admin/qrcodes' },
    { id: 'tv', label: 'Paramètres', icon: <Settings size={18} />, path: '/admin/parametres' }
  ];

  const isActive = (path: string) => location.pathname === path;
  const handleNavigate = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  // Données mockées
  const hotels = [
    { id: '1', name: 'Marhaba Palace', location: 'Hammamet', rooms: 450, occupancy: 87, rating: 4.8 },
    { id: '2', name: 'Royal Resort', location: 'Sousse', rooms: 320, occupancy: 92, rating: 4.9 },
    { id: '3', name: 'Sunset Beach', location: 'Monastir', rooms: 280, occupancy: 78, rating: 4.7 }
  ];

  const activities: Activity[] = [
    { id: '1', name: 'Water Polo', type: 'sport', time: '10:00', location: 'Piscine', animator: 'Ahmed', maxParticipants: 20, currentParticipants: 15, status: 'active' },
    { id: '2', name: 'Darts', type: 'game', time: '11:30', location: 'Bar Sport', animator: 'Mehdi', maxParticipants: 12, currentParticipants: 8, status: 'active' },
    { id: '3', name: 'Yoga', type: 'wellness', time: '09:00', location: 'Spa', animator: 'Lina', maxParticipants: 15, currentParticipants: 15, status: 'full' },
    { id: '4', name: 'Kids Club', type: 'kids', time: '14:00', location: 'Club', animator: 'Sofia', maxParticipants: 25, currentParticipants: 18, status: 'upcoming' },
    { id: '5', name: 'Volleyball', type: 'sport', time: '16:00', location: 'Plage', animator: 'Karim', maxParticipants: 12, currentParticipants: 10, status: 'upcoming' }
  ];

  const animators: Animator[] = [
    { id: '1', name: 'Ahmed Ben Ali', photo: 'https://randomuser.me/api/portraits/men/1.jpg', nationality: 'Tunisien', languages: ['Français', 'Anglais', 'Arabe'], activities: ['Water Polo', 'Volleyball'], rating: 4.9 },
    { id: '2', name: 'Lina Mansour', photo: 'https://randomuser.me/api/portraits/women/2.jpg', nationality: 'Tunisienne', languages: ['Français', 'Anglais', 'Italien'], activities: ['Yoga', 'Pilates'], rating: 4.8 },
    { id: '3', name: 'Mehdi Khelil', photo: 'https://randomuser.me/api/portraits/men/3.jpg', nationality: 'Tunisien', languages: ['Français', 'Anglais', 'Allemand'], activities: ['Darts', 'Ping Pong'], rating: 4.7 },
    { id: '4', name: 'Sofia Ben Amor', photo: 'https://randomuser.me/api/portraits/women/4.jpg', nationality: 'Tunisienne', languages: ['Français', 'Anglais', 'Russe'], activities: ['Kids Club', 'Mini Disco'], rating: 4.9 }
  ];

  const tournaments = [
    { id: '1', name: 'Water Polo', participants: 32, status: 'ongoing' },
    { id: '2', name: 'Darts', participants: 24, status: 'upcoming' },
    { id: '3', name: 'Volleyball', participants: 48, status: 'completed', winner: 'Player #24' }
  ];

  const leaderboard = [
    { id: 1, playerNumber: 24, name: 'Thomas L.', points: 1250, wins: 8 },
    { id: 2, playerNumber: 7, name: 'Sarah M.', points: 1180, wins: 7 },
    { id: 3, playerNumber: 42, name: 'David K.', points: 1090, wins: 6 },
    { id: 4, playerNumber: 15, name: 'Emma R.', points: 980, wins: 5 }
  ];

  const recentBookings = [
    { id: 1, playerNumber: 24, activity: 'Water Polo', time: '10:00', status: 'confirmed', playerName: 'Thomas L.' },
    { id: 2, playerNumber: 7, activity: 'Yoga', time: '09:00', status: 'confirmed', playerName: 'Sarah M.' },
    { id: 3, playerNumber: 42, activity: 'Darts', time: '11:30', status: 'pending', playerName: 'David K.' }
  ];

  const stats = [
    { label: "Hôtels", value: "3", icon: <Hotel size={22} />, change: "+1", color: "from-sky-500 to-blue-500" },
    { label: "Activités", value: "24", icon: <Activity size={22} />, change: "+8", color: "from-emerald-500 to-teal-500" },
    { label: "Joueurs actifs", value: "847", icon: <Users size={22} />, change: "+23%", color: "from-amber-500 to-orange-500" },
    { label: "Tournois", value: "12", icon: <Trophy size={22} />, change: "+4", color: "from-purple-500 to-pink-500" }
  ];

  return (
    <div className="min-h-screen relative">
      {/* Image de fond */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      
      {/* Header Navigation - Responsive */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-2xl' : 'bg-black/40 backdrop-blur-2xl'
      } border-b border-white/10`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo - responsive */}
            <button onClick={() => handleNavigate('/admin')} className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-blue-500 rounded-lg sm:rounded-xl blur-md opacity-50" />
                <div className="relative w-7 h-7 sm:w-9 sm:h-9 bg-gradient-to-r from-sky-500 to-blue-500 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <Activity size={16} className="text-white sm:w-5 sm:h-5" />
                </div>
              </div>
              <div className="hidden xs:block">
                <span className="text-white font-bold text-base sm:text-xl">RESORTFLOW</span>
                <span className="text-sky-400 font-bold text-base sm:text-xl"> AI</span>
                <div className="text-[8px] sm:text-[10px] text-white/40 hidden sm:block">Gestion d'animation hôtelière</div>
              </div>
            </button>

            {/* Sélecteur Hôtel - Desktop */}
            <div className="hidden md:flex items-center gap-2 bg-white/10 rounded-xl px-2 sm:px-3 py-1 sm:py-1.5">
              <Building2 size={14} className="text-white/60 sm:w-4 sm:h-4" />
              <select value={selectedHotel} onChange={(e) => setSelectedHotel(e.target.value)} className="bg-transparent text-white text-xs sm:text-sm outline-none cursor-pointer max-w-[120px] sm:max-w-none truncate">
                <option value="marhaba_palace">Marhaba Palace - Hammamet</option>
                <option value="royal_resort">Royal Resort - Sousse</option>
                <option value="sunset_beach">Sunset Beach - Monastir</option>
              </select>
              <ChevronDown size={12} className="text-white/40" />
            </div>

            {/* Navigation Desktop */}
            <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
              {modules.map((module) => (
                <motion.button
                  key={module.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleNavigate(module.path)}
                  className={`flex items-center gap-1.5 px-2 xl:px-3 py-1.5 xl:py-2 rounded-xl transition-all text-xs xl:text-sm ${
                    isActive(module.path) ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30' : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {module.icon}
                  <span className="hidden xl:inline">{module.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Right Section - Responsive */}
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="hidden md:flex items-center gap-1 bg-white/10 rounded-lg sm:rounded-xl px-1.5 sm:px-2 py-1 sm:py-1.5">
                <Languages size={12} className="text-white/60 sm:w-3.5 sm:h-3.5" />
                <select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)} className="bg-transparent text-white text-[10px] sm:text-xs outline-none cursor-pointer">
                  <option value="fr">FR</option>
                  <option value="en">EN</option>
                  <option value="tr">TR</option>
                  <option value="de">DE</option>
                  <option value="ru">RU</option>
                  <option value="ar">AR</option>
                </select>
              </div>
              
              <button className="relative p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-white/10 hover:bg-white/20 transition-all">
                <Bell size={16} className="text-white/80 sm:w-4 sm:h-4" />
                <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
              </button>
              
              <button className="hidden md:flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-white/10">
                <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="Admin" className="w-6 h-6 sm:w-7 sm:h-7 rounded-full" />
                <span className="text-white text-xs sm:text-sm hidden lg:inline">Admin</span>
                <ChevronDown size={12} className="text-white/60 hidden lg:block" />
              </button>
              
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-white/10">
                {isMobileMenuOpen ? <X size={16} className="sm:w-5 sm:h-5" /> : <Menu size={16} className="sm:w-5 sm:h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Menu Mobile */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden border-t border-white/10 bg-black/95 backdrop-blur-xl">
              <div className="px-3 py-2 space-y-1 max-h-[70vh] overflow-y-auto">
                {modules.map((module) => (
                  <button key={module.id} onClick={() => handleNavigate(module.path)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 transition-all">
                    {module.icon}
                    <span className="text-white text-sm font-medium">{module.label}</span>
                  </button>
                ))}
                <div className="pt-2 mt-2 border-t border-white/10">
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 transition-all">
                    <LogOut size={18} />
                    <span className="text-white text-sm font-medium">Déconnexion</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Contenu principal - Responsive */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 space-y-4 sm:space-y-6 lg:space-y-8">
        
        {/* Hero Welcome - Responsive */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl bg-gradient-to-r from-sky-600/80 via-blue-600/80 to-indigo-600/80 backdrop-blur-sm p-4 sm:p-6 lg:p-8 border border-white/20">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="relative z-10 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                <Sparkles size={12} className="text-amber-300 sm:w-4 sm:h-4" />
                <span className="text-amber-300 text-[10px] sm:text-xs lg:text-sm font-semibold">RESORTFLOW AI • ACTIF</span>
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">Bienvenue, Administrateur 👋</h1>
              <p className="text-white/80 text-xs sm:text-sm mt-0.5 sm:mt-1">Gérez vos hôtels, activités, animateurs et clients</p>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-xl rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 border border-white/20">
              <Calendar size={12} className="text-white sm:w-4 sm:h-4" />
              <span className="text-white text-[10px] sm:text-xs">{new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
        </motion.div>

        {/* Stats - Grid responsive 2x2 sur mobile, 4x1 sur desktop */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4 lg:gap-4">
          {stats.map((stat, idx) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} whileHover={{ y: -3 }} className="bg-white/10 backdrop-blur-xl rounded-xl p-2.5 sm:p-3 lg:p-4 border border-white/20 hover:border-white/30 transition-all">
              <div className={`w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl bg-gradient-to-r ${stat.color} bg-opacity-20 flex items-center justify-center mb-1.5 sm:mb-2 lg:mb-3`}>
                <div className="text-white text-sm lg:text-base">{stat.icon}</div>
              </div>
              <div className="text-base sm:text-xl lg:text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-[10px] sm:text-xs text-white/50">{stat.label}</div>
              <div className="text-emerald-400 text-[8px] sm:text-[10px] lg:text-xs mt-0.5">{stat.change} cette semaine</div>
            </motion.div>
          ))}
        </div>

        {/* Hôtels - Grid responsive */}
        <div className="space-y-2 sm:space-y-3 lg:space-y-4">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Hôtels connectés 🏨</h2>
              <p className="text-white/50 text-[10px] sm:text-xs lg:text-sm">Réseau ResortFlow</p>
            </div>
            <button className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 bg-sky-500/20 hover:bg-sky-500/30 rounded-lg sm:rounded-xl text-sky-400 text-[10px] sm:text-xs lg:text-sm font-medium transition-all">
              <Plus size={12} /> Ajouter
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {hotels.map((hotel, idx) => (
              <motion.div key={hotel.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + idx * 0.1 }} whileHover={{ y: -3 }} className="bg-white/10 backdrop-blur-xl rounded-xl p-3 sm:p-4 border border-white/20 hover:border-white/30 transition-all">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-r from-sky-500/30 to-blue-500/30 flex items-center justify-center">
                    <Building2 size={16} className="text-sky-400 sm:w-5 sm:h-5" />
                  </div>
                  <div className="flex items-center gap-0.5">
                    <Star size={10} className="text-amber-400 fill-amber-400 sm:w-3 sm:h-3" />
                    <span className="text-white text-[10px] sm:text-xs">{hotel.rating}</span>
                  </div>
                </div>
                <h3 className="text-white font-bold text-sm sm:text-base lg:text-lg">{hotel.name}</h3>
                <p className="text-white/40 text-[10px] sm:text-xs">{hotel.location}</p>
                <div className="mt-2 sm:mt-3 flex items-center justify-between text-[10px] sm:text-xs">
                  <span className="text-white/60">{hotel.rooms} chambres</span>
                  <span className="text-emerald-400">{hotel.occupancy}%</span>
                </div>
                <div className="mt-1.5 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-sky-500 to-blue-500 rounded-full" style={{ width: `${hotel.occupancy}%` }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Activités - Grid responsive */}
        <div className="space-y-2 sm:space-y-3 lg:space-y-4">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Activités du jour 📅</h2>
              <p className="text-white/50 text-[10px] sm:text-xs lg:text-sm">Programme du {new Date().toLocaleDateString('fr-FR')}</p>
            </div>
            <button className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 bg-sky-500/20 hover:bg-sky-500/30 rounded-lg sm:rounded-xl text-sky-400 text-[10px] sm:text-xs lg:text-sm font-medium transition-all">
              <Plus size={12} /> Ajouter
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {activities.map((activity, idx) => (
              <motion.div key={activity.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + idx * 0.05 }} whileHover={{ y: -3 }} className="bg-white/10 backdrop-blur-xl rounded-xl p-3 sm:p-4 border border-white/20 hover:border-white/30 transition-all">
                <div className="flex justify-between items-start mb-2 sm:mb-3 flex-wrap gap-1">
                  <div className={`px-1.5 py-0.5 rounded-lg text-[9px] sm:text-xs font-medium ${
                    activity.type === 'sport' ? 'bg-red-500/20 text-red-400' : 
                    activity.type === 'game' ? 'bg-amber-500/20 text-amber-400' : 
                    activity.type === 'wellness' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-purple-500/20 text-purple-400'
                  }`}>
                    {activity.type === 'sport' ? 'Sport' : activity.type === 'game' ? 'Jeu' : activity.type === 'wellness' ? 'Bien-être' : 'Kids'}
                  </div>
                  <div className={`px-1.5 py-0.5 rounded-lg text-[9px] sm:text-xs font-medium ${
                    activity.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 
                    activity.status === 'full' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {activity.status === 'active' ? 'En cours' : activity.status === 'full' ? 'Complet' : 'À venir'}
                  </div>
                </div>
                <h3 className="text-white font-bold text-sm sm:text-base lg:text-lg mb-1">{activity.name}</h3>
                <div className="space-y-1.5 mb-2 sm:mb-3">
                  <div className="flex items-center gap-1.5 text-white/60 text-[10px] sm:text-xs flex-wrap">
                    <Clock size={10} /><span>{activity.time}</span>
                    <MapPin size={10} className="ml-1" /><span>{activity.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/60 text-[10px] sm:text-xs">
                    <UserCircle size={10} /><span>{activity.animator}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-white/60 text-[10px] sm:text-xs">
                      <Users size={10} /><span>{activity.currentParticipants}/{activity.maxParticipants}</span>
                    </div>
                    <div className="w-20 sm:w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-sky-500 to-blue-500 rounded-full" style={{ width: `${(activity.currentParticipants / activity.maxParticipants) * 100}%` }} />
                    </div>
                  </div>
                </div>
                <button className="w-full py-1.5 bg-sky-500/20 hover:bg-sky-500/30 rounded-lg text-sky-400 text-[10px] sm:text-xs font-medium transition-all">Voir détails</button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tournois + Leaderboard - Grid responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="bg-white/10 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div>
                <h3 className="font-bold text-white text-base sm:text-lg lg:text-xl">Tournois 🏆</h3>
                <p className="text-white/40 text-[10px] sm:text-xs mt-0.5">Compétitions en cours</p>
              </div>
              <Trophy size={20} className="text-amber-400 sm:w-6 sm:h-6" />
            </div>
            <div className="space-y-2 sm:space-y-3">
              {tournaments.map((tournament, idx) => (
                <div key={tournament.id} className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                  <div className="flex items-center justify-between mb-1 flex-wrap gap-1">
                    <span className="text-white font-semibold text-xs sm:text-sm">{tournament.name}</span>
                    <span className={`text-[9px] sm:text-xs px-1.5 py-0.5 rounded-lg ${
                      tournament.status === 'ongoing' ? 'bg-emerald-500/20 text-emerald-400' : 
                      tournament.status === 'upcoming' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'
                    }`}>
                      {tournament.status === 'ongoing' ? 'En cours' : tournament.status === 'upcoming' ? 'À venir' : 'Terminé'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-white/50 text-[10px] sm:text-xs flex-wrap">
                    <span>👥 {tournament.participants} participants</span>
                    {tournament.winner && <span>🏆 {tournament.winner}</span>}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="bg-white/10 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div>
                <h3 className="font-bold text-white text-base sm:text-lg lg:text-xl">Classement 📊</h3>
                <p className="text-white/40 text-[10px] sm:text-xs mt-0.5">Mise à jour en temps réel</p>
              </div>
              <Crown size={20} className="text-amber-400 sm:w-6 sm:h-6" />
            </div>
            <div className="space-y-2 sm:space-y-3">
              {leaderboard.map((player, idx) => (
                <div key={player.id} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-bold text-xs sm:text-sm ${
                    idx === 0 ? 'bg-amber-500/20 text-amber-400' : 
                    idx === 1 ? 'bg-gray-400/20 text-gray-400' : 
                    idx === 2 ? 'bg-orange-500/20 text-orange-400' : 'bg-white/10 text-white/40'
                  }`}>
                    #{player.playerNumber}
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-semibold text-xs sm:text-sm">{player.name}</div>
                    <div className="text-white/40 text-[8px] sm:text-[10px]">{player.wins} victoires</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold text-xs sm:text-sm">{player.points} pts</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Réservations + Animateurs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-white/10 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div>
                <h3 className="font-bold text-white text-base sm:text-lg lg:text-xl">Réservations récentes</h3>
                <p className="text-white/40 text-[10px] sm:text-xs mt-0.5">Système numéro joueur</p>
              </div>
              <QrCode size={18} className="text-white/40 sm:w-5 sm:h-5" />
            </div>
            <div className="space-y-2 sm:space-y-3">
              {recentBookings.map((booking, idx) => (
                <div key={booking.id} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-sky-500/20 flex items-center justify-center border border-sky-500/30">
                    <span className="text-sky-400 font-bold text-xs sm:text-sm">#{booking.playerNumber}</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-semibold text-xs sm:text-sm">{booking.playerName}</div>
                    <div className="text-white/40 text-[9px] sm:text-xs">{booking.activity} • {booking.time}</div>
                  </div>
                  <div className={`px-1.5 py-0.5 rounded-lg text-[8px] sm:text-[10px] font-medium ${
                    booking.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {booking.status === 'confirmed' ? 'Confirmé' : 'Attente'}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-white/10 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div>
                <h3 className="font-bold text-white text-base sm:text-lg lg:text-xl">Équipe Animation</h3>
                <p className="text-white/40 text-[10px] sm:text-xs mt-0.5">Animateurs disponibles</p>
              </div>
              <Users size={18} className="text-white/40 sm:w-5 sm:h-5" />
            </div>
            <div className="space-y-2 sm:space-y-3">
              {animators.map((animator, idx) => (
                <div key={animator.id} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                  <img src={animator.photo} alt={animator.name} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border border-sky-500/30" />
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-semibold text-xs sm:text-sm truncate">{animator.name}</div>
                    <div className="text-white/40 text-[8px] sm:text-[10px] truncate">{animator.languages.slice(0,2).join(' / ')} • {animator.nationality}</div>
                    <div className="flex gap-0.5 mt-0.5 flex-wrap">
                      {animator.activities.slice(0,2).map(act => (
                        <span key={act} className="text-[7px] sm:text-[8px] px-1 py-0.5 rounded bg-white/10 text-white/60">{act}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <Star size={10} className="text-amber-400 fill-amber-400 sm:w-3 sm:h-3" />
                    <span className="text-white text-[10px] sm:text-xs">{animator.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Actions rapides - Grid responsive */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
          {[
            { icon: <Activity size={14} />, label: "Nouvelle activité", color: "from-sky-500 to-blue-500" },
            { icon: <UserCircle size={14} />, label: "Ajouter animateur", color: "from-emerald-500 to-teal-500" },
            { icon: <Trophy size={14} />, label: "Créer tournoi", color: "from-amber-500 to-orange-500" },
            { icon: <QrCode size={14} />, label: "Générer QR", color: "from-purple-500 to-pink-500" },
            { icon: <Bot size={14} />, label: "Assistant AI", color: "from-indigo-500 to-purple-500" }
          ].map((action, idx) => (
            <motion.button key={idx} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 + idx * 0.05 }} whileHover={{ scale: 1.02 }} className="bg-white/10 backdrop-blur-xl rounded-lg sm:rounded-xl p-2 sm:p-3 border border-white/20 hover:border-white/30 transition-all">
              <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-gradient-to-r ${action.color} bg-opacity-20 flex items-center justify-center mx-auto mb-1 sm:mb-2`}>
                <div className="text-white text-xs sm:text-sm">{action.icon}</div>
              </div>
              <div className="text-white text-[9px] sm:text-xs font-medium text-center">{action.label}</div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}