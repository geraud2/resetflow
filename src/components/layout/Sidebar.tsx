import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Calendar, Users, BookOpen, QrCode,
  Bell, Settings, Waves, LogOut, ChevronRight,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  { label: 'Activités', icon: Calendar, path: '/admin/activities' },
  { label: 'Animateurs', icon: Users, path: '/admin/animateurs' },
  { label: 'Réservations', icon: BookOpen, path: '/admin/reservations' },
  { label: 'QR Codes', icon: QrCode, path: '/admin/qrcodes' },
  { label: 'Notifications', icon: Bell, path: '/admin/notifications' },
  { label: 'Paramètres', icon: Settings, path: '/admin/settings' },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-screen glass border-r border-white/5 fixed left-0 top-0 z-30">
      {/* Logo */}
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center glow-sm">
            <Waves className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-bold text-white text-lg leading-none">ResortFlow</div>
            <div className="text-xs text-slate-400 font-medium mt-0.5">Admin Panel</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}>
              <motion.div
                whileHover={{ x: 4 }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  active
                    ? 'bg-gradient-to-r from-sky-500/20 to-cyan-500/10 text-sky-400 border border-sky-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className={`w-4.5 h-4.5 ${active ? 'text-sky-400' : 'text-slate-500 group-hover:text-slate-300'}`} size={18} />
                <span className="flex-1">{item.label}</span>
                {active && <ChevronRight size={14} className="text-sky-400/60" />}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 px-2 py-2">
          <img
            src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100"
            className="w-8 h-8 rounded-full object-cover ring-2 ring-sky-500/30"
            alt="Admin"
          />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-white truncate">Admin</div>
            <div className="text-xs text-slate-500 truncate">resort@resortflow.io</div>
          </div>
          <button className="text-slate-500 hover:text-red-400 transition-colors">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
