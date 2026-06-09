import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Calendar, BookOpen, Bell, User } from 'lucide-react';

const tabs = [
  { label: 'Accueil', icon: Home, path: '/client' },
  { label: 'Activités', icon: Calendar, path: '/client/activities' },
  { label: 'Réservations', icon: BookOpen, path: '/client/reservations' },
  { label: 'Notifs', icon: Bell, path: '/client/notifications' },
  { label: 'Profil', icon: User, path: '/client/profile' },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 px-4 w-full max-w-sm">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 30 }}
        className="bg-white rounded-2xl px-2 py-2 flex items-center justify-around shadow-2xl shadow-black/20"
        style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05)' }}
      >
        {tabs.map((tab) => {
          const active = location.pathname === tab.path;
          return (
            <Link key={tab.path} to={tab.path} className="flex-1">
              <div className="flex flex-col items-center gap-1 py-1 relative">
                <AnimatePresence>
                  {active && (
                    <motion.div
                      layoutId="bottomNavIndicator"
                      className="absolute inset-0 rounded-xl bg-blue-100"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </AnimatePresence>
                <motion.div
                  animate={active ? { scale: 1.1, y: -1 } : { scale: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="relative"
                >
                  <tab.icon
                    size={20}
                    className={`transition-colors duration-200 ${active ? 'text-blue-500' : 'text-gray-600'}`}
                  />
                  {active && (
                    <motion.div
                      layoutId="navGlow"
                      className="absolute -inset-1 rounded-lg bg-blue-500/20 blur-sm"
                    />
                  )}
                </motion.div>
                <span className={`text-[10px] font-semibold tracking-wide transition-colors duration-200 ${active ? 'text-blue-500' : 'text-gray-700'}`}>
                  {tab.label}
                </span>
              </div>
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
}