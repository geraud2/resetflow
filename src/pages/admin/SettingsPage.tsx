import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, Bell, Lock, Palette, Globe, CreditCard, Save, Waves, 
  Sparkles, Flame, Zap, Shield, User, Mail, Phone, MapPin, 
  Menu, X, Home, LayoutDashboard, Calendar, Users, Ticket, QrCode, 
  Settings, LogOut, Activity, Star, Trophy, Award, CheckCircle,
  Moon, Sun, Globe2, Languages, Smartphone, Monitor, Database, Cloud
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Link, useLocation } from 'react-router-dom';

const sections = [
  { icon: Building2, label: 'Hôtel & Resort', color: '#0ea5e9', gradient: 'from-sky-500/20 to-blue-500/20' },
  { icon: Bell, label: 'Notifications', color: '#f59e0b', gradient: 'from-amber-500/20 to-orange-500/20' },
  { icon: Lock, label: 'Sécurité', color: '#ef4444', gradient: 'from-red-500/20 to-rose-500/20' },
  { icon: Palette, label: 'Apparence', color: '#8b5cf6', gradient: 'from-purple-500/20 to-pink-500/20' },
  { icon: Globe, label: 'Langue & Région', color: '#10b981', gradient: 'from-emerald-500/20 to-teal-500/20' },
  { icon: CreditCard, label: 'Abonnement', color: '#06b6d4', gradient: 'from-cyan-500/20 to-blue-500/20' },
];

export function SettingsPage() {
  const [activeSection, setActiveSection] = useState(0);
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

  const currentSection = sections[activeSection];

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
        <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-6xl mx-auto">
          
          {/* Hero Section */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-600/20 via-blue-600/20 to-indigo-600/20 backdrop-blur-xl p-6 sm:p-8 border border-white/20">
            <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-r from-sky-500/30 to-cyan-500/30 rounded-full blur-3xl" />
            <motion.div animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 5, repeat: Infinity, delay: 0.5 }} className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }} className="px-3 py-1 bg-white/20 backdrop-blur rounded-full">
                  <span className="text-white/90 text-xs font-medium flex items-center gap-1"><Sparkles size={12} className="text-amber-300" /> Configuration avancée</span>
                </motion.div>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.3 }} className="px-3 py-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur rounded-full border border-amber-500/30">
                  <span className="text-amber-300 text-xs font-medium flex items-center gap-1"><Flame size={12} /> Personnalisation</span>
                </motion.div>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.4 }} className="px-3 py-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur rounded-full border border-emerald-500/30">
                  <span className="text-emerald-300 text-xs font-medium flex items-center gap-1"><Zap size={12} /> Contrôle total</span>
                </motion.div>
              </div>
              <motion.h2 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="text-3xl sm:text-5xl font-bold text-white mb-2">Paramètres</motion.h2>
              <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="text-white/60 text-base">Configurez votre plateforme ResortFlow AI</motion.p>
            </div>
          </motion.div>

          {/* Settings Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Sidebar */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }} className="bg-white/10 backdrop-blur-xl rounded-2xl p-3 border border-white/20 h-fit">
              {sections.map((s, i) => (
                <motion.button
                  key={s.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.05 }}
                  whileHover={{ x: 4 }}
                  onClick={() => setActiveSection(i)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-all duration-300 ${
                    activeSection === i 
                      ? `bg-gradient-to-r ${s.gradient} text-white border border-white/30 shadow-lg` 
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <s.icon size={16} style={{ color: activeSection === i ? s.color : 'currentColor' }} />
                  {s.label}
                </motion.button>
              ))}
            </motion.div>

            {/* Content */}
            <div className="lg:col-span-2 space-y-5">
              
              {/* Section Hôtel */}
              {activeSection === 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center"><Building2 size={18} className="text-sky-400" /></div>
                    <div><h3 className="font-bold text-white">Informations de l'hôtel</h3><p className="text-xs text-white/40">Données affichées sur la plateforme</p></div>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: 'Nom de l\'établissement', value: 'Resort Grand Palais Méditerranée', icon: Building2 },
                      { label: 'Adresse', value: '15 Avenue de la Mer, 06400 Cannes', icon: MapPin },
                      { label: 'Téléphone', value: '+33 4 93 12 34 56', icon: Phone },
                      { label: 'Email de contact', value: 'animation@grandpalais.fr', icon: Mail },
                    ].map((field) => (
                      <div key={field.label}>
                        <label className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-1.5 block flex items-center gap-2"><field.icon size={12} />{field.label}</label>
                        <input defaultValue={field.value} className="w-full bg-white/5 backdrop-blur rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-sky-500/50 border border-white/20" />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Section Apparence */}
              {activeSection === 3 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center"><Palette size={18} className="text-purple-400" /></div>
                    <div><h3 className="font-bold text-white">Apparence</h3><p className="text-xs text-white/40">Personnalisez l'identité visuelle</p></div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-2 block">Thème</label>
                      <div className="flex gap-3">
                        {[
                          { icon: Sun, label: 'Clair', color: 'from-amber-500 to-orange-500' },
                          { icon: Moon, label: 'Sombre', color: 'from-slate-600 to-slate-800' },
                          { icon: Smartphone, label: 'Auto', color: 'from-sky-500 to-blue-500' },
                        ].map((theme) => (
                          <button key={theme.label} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/20">
                            <theme.icon size={14} className="text-white/70" />
                            <span className="text-sm text-white/70">{theme.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-2 block">Couleur principale</label>
                      <div className="flex gap-3">
                        {['#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#8b5cf6', '#06b6d4'].map((color) => (
                          <button key={color} className="w-8 h-8 rounded-full ring-2 ring-offset-2 ring-offset-slate-900 transition-all hover:scale-110" style={{ background: color === '#0ea5e9' ? color : 'transparent' }} />
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-2 block">Logo URL</label>
                      <input defaultValue="https://resortflow.io/logo.svg" className="w-full bg-white/5 backdrop-blur rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-sky-500/50 border border-white/20" />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Section Langue */}
              {activeSection === 4 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center"><Globe size={18} className="text-emerald-400" /></div>
                    <div><h3 className="font-bold text-white">Langue & Région</h3><p className="text-xs text-white/40">Préférences linguistiques</p></div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-2 block">Langue par défaut</label>
                      <select className="w-full bg-white/5 backdrop-blur rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 border border-white/20">
                        <option className="bg-slate-900">Français</option>
                        <option className="bg-slate-900">English</option>
                        <option className="bg-slate-900">Türkçe</option>
                        <option className="bg-slate-900">Deutsch</option>
                        <option className="bg-slate-900">Русский</option>
                        <option className="bg-slate-900">العربية</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-2 block">Langues secondaires</label>
                      <div className="flex flex-wrap gap-2">
                        {['English', 'Türkçe', 'Deutsch'].map(lang => (
                          <span key={lang} className="px-3 py-1.5 rounded-lg bg-white/10 text-white/70 text-sm">✓ {lang}</span>
                        ))}
                        <button className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 text-sm transition-all">+ Ajouter</button>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-2 block">Fuseau horaire</label>
                      <select className="w-full bg-white/5 backdrop-blur rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 border border-white/20">
                        <option className="bg-slate-900">Europe/Paris (UTC+1)</option>
                        <option className="bg-slate-900">Europe/Istanbul (UTC+3)</option>
                        <option className="bg-slate-900">Europe/London (UTC+0)</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Section Abonnement */}
              {activeSection === 5 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20">
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center"><CreditCard size={18} className="text-white" /></div>
                      <div><h3 className="font-bold text-white">Plan Enterprise</h3><p className="text-xs text-emerald-400 font-semibold flex items-center gap-1"><CheckCircle size={10} /> Actif jusqu'au 31 déc. 2026</p></div>
                    </div>
                    <div className="text-right"><div className="text-2xl font-bold text-white">€490<span className="text-sm text-white/50">/mois</span></div><div className="text-xs text-white/40">facturé annuellement</div></div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[['Animateurs', 'Illimités'], ['Activités/jour', 'Illimitées'], ['Clients actifs', '1000+']].map(([label, val]) => (
                      <div key={label} className="bg-white/5 rounded-xl p-3 text-center"><div className="text-sm font-bold text-white">{val}</div><div className="text-xs text-white/40 mt-0.5">{label}</div></div>
                    ))}
                  </div>
                  <Button variant="secondary" fullWidth>Gérer l'abonnement</Button>
                </motion.div>
              )}

              {/* Bouton Save global */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end">
                <Button icon={<Save size={16} />} size="lg">Enregistrer les modifications</Button>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation Mobile */}
     
    
    </div>
  );
}