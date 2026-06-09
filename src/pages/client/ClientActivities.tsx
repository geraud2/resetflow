import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, Users, Search, Filter, X, CheckCircle, Calendar, Sparkles, Heart } from 'lucide-react';
import { ClientLayout } from './ClientLayout';
import { activities, currentClient } from '../../data/mockData';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export function ClientActivities() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [bookingActivity, setBookingActivity] = useState<typeof activities[0] | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  const categories = ['all', 'Water', 'Sport', 'Wellness', 'Fitness', 'Kids'];

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || activity.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleBook = (activity: typeof activities[0]) => {
    if (activity.status === 'full') return;
    setBookingActivity(activity);
    setConfirmed(false);
  };

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => {
      setBookingActivity(null);
      setConfirmed(false);
    }, 3000);
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
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
        <div className="fixed inset-0 bg-gradient-to-b from-black/10 via-black/2 to-black/30" />
        
        {/* Contenu principal */}
        <div className="relative z-10 px-4 pt-6 pb-32">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={18} className="text-amber-300" />
              <span className="text-white/80 text-sm font-medium">Découvrez</span>
            </div>
            <h1 className="text-3xl font-bold text-white">Activités</h1>
            <p className="text-white/60 text-sm mt-1">Toutes nos activités premium vous attendent</p>
          </div>

          {/* Barre de recherche */}
          <div className="relative mb-5">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une activité..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl py-3.5 pl-11 pr-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
            />
          </div>

          {/* Catégories */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-5 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30'
                    : 'bg-white/10 backdrop-blur text-white/80 border border-white/20 hover:bg-white/20'
                }`}
              >
                {cat === 'all' ? 'Toutes' : cat}
              </button>
            ))}
          </div>

          {/* Compteur */}
          <div className="mb-4">
            <p className="text-white/50 text-sm">
              {filteredActivities.length} activité{filteredActivities.length > 1 ? 's' : ''}
            </p>
          </div>

          {/* Liste des activités */}
          <div className="space-y-4">
            {filteredActivities.length === 0 ? (
              <div className="text-center py-12 backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20">
                <Calendar size={48} className="text-white/30 mx-auto mb-3" />
                <p className="text-white/50">Aucune activité trouvée</p>
              </div>
            ) : (
              filteredActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="backdrop-blur-xl bg-white/10 rounded-2xl overflow-hidden border border-white/20 hover:border-white/30 transition-all"
                >
                  {/* Image */}
                  <div className="relative h-36">
                    <img 
                      src={activity.image} 
                      alt={activity.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Badge statut */}
                    <div className="absolute top-3 right-3">
                      <Badge variant={activity.status === 'full' ? 'full' : 'active'}>
                        {activity.status === 'full' ? 'Complet' : 'Disponible'}
                      </Badge>
                    </div>
                    
                    {/* Bouton favori */}
                    <button 
                      onClick={() => toggleFavorite(activity.id)}
                      className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/30 backdrop-blur flex items-center justify-center"
                    >
                      <Heart 
                        size={16} 
                        className={favorites.includes(activity.id) ? 'fill-red-500 text-red-500' : 'text-white'}
                      />
                    </button>
                    
                    {/* Infos sur l'image */}
                    <div className="absolute bottom-3 left-3">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-white text-xs font-medium">{activity.time}</span>
                      </div>
                      <h3 className="text-white font-bold text-xl">{activity.name}</h3>
                    </div>
                  </div>
                  
                  {/* Contenu */}
                  <div className="p-4">
                    {/* Lieu et participants */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1.5 text-sm text-white/70">
                          <MapPin size={14} className="text-sky-400" />
                          {activity.location}
                        </span>
                        <span className="flex items-center gap-1.5 text-sm text-white/70">
                          <Users size={14} className="text-sky-400" />
                          {activity.participants}/{activity.maxParticipants}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-amber-400">
                        <span>⭐</span>
                        <span>4.8</span>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <p className="text-sm text-white/60 mb-4 line-clamp-2">
                      {activity.description}
                    </p>
                    
                    {/* Animateur et bouton */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                          {activity.animateur.charAt(0)}
                        </div>
                        <span className="text-sm text-white/70">{activity.animateur}</span>
                      </div>
                      <Button
                        size="sm"
                        variant={activity.status === 'full' ? 'secondary' : 'primary'}
                        onClick={() => handleBook(activity)}
                      >
                        {activity.status === 'full' ? 'Attente' : 'Participer'}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Modal de réservation - Style transparent */}
        <AnimatePresence>
          {bookingActivity && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setBookingActivity(null)}
            >
              <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="relative backdrop-blur-xl bg-white/10 rounded-3xl w-full max-w-md overflow-hidden border border-white/20 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {!confirmed ? (
                  <div className="p-6">
                    {/* Image miniature */}
                    <div className="w-20 h-20 rounded-2xl overflow-hidden mx-auto mb-4">
                      <img 
                        src={bookingActivity.image} 
                        alt={bookingActivity.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-center text-white mb-2">
                      {bookingActivity.name}
                    </h3>
                    
                    <div className="space-y-3 mb-6 bg-white/5 rounded-2xl p-4">
                      <div className="flex items-center gap-3 text-white/70">
                        <Clock size={18} className="text-sky-400" />
                        <span>{bookingActivity.time} - {bookingActivity.endTime}</span>
                      </div>
                      <div className="flex items-center gap-3 text-white/70">
                        <MapPin size={18} className="text-sky-400" />
                        <span>{bookingActivity.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-white/70">
                        <Users size={18} className="text-sky-400" />
                        <span>{bookingActivity.maxParticipants - bookingActivity.participants} places restantes</span>
                      </div>
                    </div>
                    
                    <div className="bg-sky-500/20 rounded-2xl p-4 mb-6 text-center border border-sky-500/30">
                      <div className="text-sm text-sky-300">Votre numéro de joueur</div>
                      <div className="text-3xl font-bold text-sky-400">#{currentClient.playerNumber}</div>
                    </div>
                    
                    <Button fullWidth size="lg" onClick={handleConfirm}>
                      Confirmer ma participation
                    </Button>
                    
                    <button 
                      onClick={() => setBookingActivity(null)}
                      className="w-full mt-3 text-center text-sm text-white/50 py-2 hover:text-white/80 transition"
                    >
                      Annuler
                    </button>
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/50"
                    >
                      <CheckCircle size={40} className="text-green-400" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2">Réservation confirmée !</h3>
                    <p className="text-white/60 mb-4">
                      {bookingActivity.name} · {bookingActivity.time}
                    </p>
                    <div className="bg-green-500/20 rounded-2xl p-4 mb-4 border border-green-500/30">
                      <div className="text-sm text-green-300">Votre numéro</div>
                      <div className="text-2xl font-bold text-green-400">#{currentClient.playerNumber}</div>
                    </div>
                    <p className="text-sm text-white/40">
                      Présentez-vous à l'animateur
                    </p>
                    <button 
                      onClick={() => setBookingActivity(null)}
                      className="mt-6 text-sky-400 font-medium"
                    >
                      Fermer
                    </button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ClientLayout>
  );
}