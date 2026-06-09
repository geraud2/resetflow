import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Star, Calendar, Award, Settings, LogOut, Shield, Heart, MapPin, Clock, Trophy, ChevronRight, QrCode } from 'lucide-react';
import { ClientLayout } from './ClientLayout';
import { currentClient } from '../../data/mockData';
import { Link } from 'react-router-dom';

function MockQRCode({ size = 100 }: { size?: number }) {
  const cells = 20;
  const cellSize = size / cells;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <rect width={size} height={size} fill="white" rx="8" />
      {Array.from({ length: cells }).map((_, row) =>
        Array.from({ length: cells }).map((_, col) => {
          const isCorner = (row < 6 && col < 6) || (row < 6 && col >= cells - 6) || (row >= cells - 6 && col < 6);
          const isDark = isCorner || (!isCorner && Math.random() > 0.55);
          if (!isDark) return null;
          return (
            <rect 
              key={`${row}-${col}`} 
              x={col * cellSize + 0.5} 
              y={row * cellSize + 0.5} 
              width={cellSize - 1} 
              height={cellSize - 1} 
              fill="#0ea5e9" 
              rx="0.5" 
            />
          );
        })
      )}
    </svg>
  );
}

export function ClientProfile() {
  const [showQR, setShowQR] = useState(false);

  const stats = [
    { label: "Points", value: currentClient.points, icon: Star, color: "text-amber-400" },
    { label: "Activités", value: currentClient.activitiesCompleted, icon: Calendar, color: "text-blue-400" },
    { label: "Classement", value: "#1", icon: Trophy, color: "text-purple-400" },
  ];

  const menuItems = [
    { icon: User, label: "Informations personnelles", path: "/client/profile/info" },
    { icon: Shield, label: "Confidentialité", path: "/client/profile/privacy" },
    { icon: Heart, label: "Activités favorites", path: "/client/profile/favorites", badge: "3" },
    { icon: MapPin, label: "Mes lieux préférés", path: "/client/profile/places" },
    { icon: Clock, label: "Historique", path: "/client/profile/history" },
    { icon: Settings, label: "Paramètres", path: "/client/profile/settings" },
  ];

  return (
    <ClientLayout>
      <div className="px-4 pt-6 pb-24">
        {/* Header with avatar */}
        <div className="flex flex-col items-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative mb-4"
          >
            <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-sky-500/30 shadow-xl">
              <img src={currentClient.avatar} alt={currentClient.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-full p-2 shadow-lg">
              <Award size={16} className="text-white" />
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center"
          >
            <h1 className="text-2xl font-bold text-white">{currentClient.name}</h1>
            <p className="text-sky-400 text-sm font-mono mt-1">Joueur #{currentClient.playerNumber}</p>
            <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs text-slate-400">
              <span>Chambre {currentClient.room}</span>
              <span>•</span>
              <span>Séjour jusqu'au 7 juin</span>
            </div>
          </motion.div>
        </div>

        {/* QR Code Button */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          onClick={() => setShowQR(!showQR)}
          className="w-full flex items-center justify-between p-4 rounded-xl bg-sky-500/10 border border-sky-500/20 mb-6"
        >
          <div className="flex items-center gap-3">
            <QrCode size={20} className="text-sky-400" />
            <span className="text-white font-medium">Mon QR Code</span>
          </div>
          <ChevronRight size={18} className="text-slate-400" />
        </motion.button>

        {/* QR Code Modal */}
        {showQR && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-6 bg-white/10 backdrop-blur-xl rounded-2xl flex flex-col items-center"
          >
            <div className="p-4 bg-white rounded-xl shadow-lg mb-3">
              <MockQRCode size={120} />
            </div>
            <p className="text-sky-400 font-mono text-lg font-bold">#{currentClient.playerNumber}</p>
            <p className="text-xs text-slate-400 mt-2">Scannez ce QR code pour vous inscrire</p>
          </motion.div>
        )}

        {/* Stats */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-3 gap-3 mb-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white/10 backdrop-blur-xl rounded-xl p-3 text-center">
                <Icon size={20} className={`${stat.color} mx-auto mb-1`} />
                <p className="text-xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-slate-400">{stat.label}</p>
              </div>
            );
          })}
        </motion.div>

        {/* Menu */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                to={item.path}
                className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className="text-slate-400" />
                  <span className="text-sm text-white">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span className="px-2 py-0.5 bg-sky-500/20 text-sky-400 rounded-full text-xs">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight size={16} className="text-slate-500" />
                </div>
              </Link>
            );
          })}
        </motion.div>

        {/* Logout Button */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full mt-6 flex items-center justify-center gap-2 p-4 rounded-xl bg-red-500/10 hover:bg-red-500/20 transition-all duration-200"
        >
          <LogOut size={18} className="text-red-400" />
          <span className="text-red-400 font-medium">Se déconnecter</span>
        </motion.button>

        {/* Version */}
        <p className="text-center text-xs text-slate-600 mt-6">
          ResortFlow v2.0.0 • Player #{currentClient.playerNumber}
        </p>
      </div>
    </ClientLayout>
  );
}