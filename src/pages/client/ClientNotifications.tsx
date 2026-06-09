import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Clock, Calendar, Trophy, MapPin, AlertCircle, CheckCircle, X, Trash2, Sparkles } from 'lucide-react';
import { ClientLayout } from './ClientLayout';
import { notifications } from '../../data/mockData';

export function ClientNotifications() {
  const [notifs, setNotifs] = useState(notifications);
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { label: 'Toutes', value: 'all', count: notifs.length },
    { label: 'Non lues', value: 'unread', count: notifs.filter(n => !n.read).length },
  ];

  const filteredNotifs = activeFilter === 'all' 
    ? notifs 
    : notifs.filter(n => !n.read);

  const markAsRead = (id: number) => {
    setNotifs(notifs.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotification = (id: number) => {
    setNotifs(notifs.filter(n => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifs(notifs.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'alert': return <Clock size={18} className="text-orange-400" />;
      case 'success': return <CheckCircle size={18} className="text-green-400" />;
      case 'info': return <Calendar size={18} className="text-blue-400" />;
      case 'warning': return <AlertCircle size={18} className="text-yellow-400" />;
      default: return <Bell size={18} className="text-sky-400" />;
    }
  };

  const getBgColor = (type: string, read: boolean) => {
    if (read) return 'bg-white/5 border-white/10';
    switch (type) {
      case 'alert': return 'bg-orange-500/10 border-orange-500/30';
      case 'success': return 'bg-green-500/10 border-green-500/30';
      case 'info': return 'bg-blue-500/10 border-blue-500/30';
      default: return 'bg-sky-500/10 border-sky-500/30';
    }
  };

  return (
    <ClientLayout>
      <div className="min-h-screen relative">
        {/* Image de fond */}
        <div 
          className="fixed inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/fonds.png)',
          }}
        />
        <div className="fixed inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/80" />
        
        {/* Contenu principal */}
        <div className="relative z-10 px-4 pt-6 pb-32">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Bell size={18} className="text-sky-400" />
              <span className="text-white/70 text-sm font-medium">Restez informé</span>
            </div>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h1 className="text-3xl font-bold text-white">Notifications</h1>
                <p className="text-white/70 text-sm mt-1">
                  {notifs.filter(n => !n.read).length} notification{notifs.filter(n => !n.read).length > 1 ? 's' : ''} non lue{notifs.filter(n => !n.read).length > 1 ? 's' : ''}
                </p>
              </div>
              {notifs.some(n => !n.read) && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-sky-400 font-medium px-3 py-1.5 rounded-full bg-sky-500/20 backdrop-blur hover:bg-sky-500/30 transition-colors border border-sky-500/30"
                >
                  Tout marquer lu
                </button>
              )}
            </div>
          </div>

          {/* Filtres */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
            {filters.map(filter => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeFilter === filter.value
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30'
                    : 'bg-white/10 backdrop-blur text-white/80 border border-white/20 hover:bg-white/20'
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>

          {/* Liste des notifications */}
          <div className="space-y-3">
            {filteredNotifs.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16 backdrop-blur-xl bg-white/70 rounded-2xl border border-white/20"
              >
                <Bell size={48} className="text-white/20 mx-auto mb-3" />
                <p className="text-white/40">Aucune notification</p>
              </motion.div>
            ) : (
              filteredNotifs.map((notif, index) => (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`rounded-2xl p-4 border backdrop-blur-xl transition-all ${
                    !notif.read ? 'ring-1 ring-sky-500/50' : ''
                  } ${getBgColor(notif.type, notif.read)}`}
                >
                  <div className="flex gap-3">
                    {/* Icône */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
                      {getIcon(notif.type)}
                    </div>
                    
                    {/* Contenu */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <h3 className={`font-semibold ${!notif.read ? 'text-sky-400' : 'text-white'}`}>
                          {notif.title}
                        </h3>
                        <div className="flex items-center gap-1">
                          {!notif.read && (
                            <button
                              onClick={() => markAsRead(notif.id)}
                              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                              title="Marquer comme lu"
                            >
                              <CheckCircle size={14} className="text-sky-400" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notif.id)}
                            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 size={14} className="text-white/40 hover:text-red-400 transition-colors" />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-white/60 mt-1">{notif.message}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Clock size={10} className="text-white/30" />
                        <span className="text-xs text-white/40">{notif.time}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Pied de page */}
          {notifs.length > 0 && (
            <div className="mt-6 text-center">
              <p className="text-white/30 text-xs">
                {notifs.filter(n => n.read).length} notification{notifs.filter(n => n.read).length > 1 ? 's' : ''} lue{notifs.filter(n => n.read).length > 1 ? 's' : ''}
              </p>
            </div>
          )}
        </div>
      </div>
    </ClientLayout>
  );
}