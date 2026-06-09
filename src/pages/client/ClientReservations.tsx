import { ClientLayout } from "./ClientLayout";
import { Calendar, Clock, MapPin, CheckCircle, XCircle, AlertCircle, Sparkles, Ticket, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export function ClientReservations() {
  const [filter, setFilter] = useState("all");

  const reservations = [
    {
      id: 1,
      activity: "Water Polo",
      date: "Aujourd'hui",
      time: "14:00",
      location: "Piscine Principale",
      status: "confirmed",
      playerNumber: "#17",
      image: "https://images.pexels.com/photos/1263349/pexels-photo-1263349.jpeg?auto=compress&cs=tinysrgb&w=200",
    },
    {
      id: 2,
      activity: "Yoga",
      date: "Demain",
      time: "09:00",
      location: "Jardin Zen",
      status: "pending",
      playerNumber: "#17",
      image: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=200",
    },
    {
      id: 3,
      activity: "Volleyball",
      date: "15 Juin 2024",
      time: "16:00",
      location: "Beach Arena",
      status: "cancelled",
      playerNumber: "#17",
      image: "https://images.pexels.com/photos/1655329/pexels-photo-1655329.jpeg?auto=compress&cs=tinysrgb&w=200",
    },
  ];

  const filters = [
    { label: "Toutes", value: "all", count: reservations.length },
    { label: "Confirmées", value: "confirmed", count: reservations.filter(r => r.status === "confirmed").length },
    { label: "En attente", value: "pending", count: reservations.filter(r => r.status === "pending").length },
  ];

  const filteredReservations = filter === "all" 
    ? reservations 
    : reservations.filter(r => r.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle size={14} />;
      case "pending":
        return <AlertCircle size={14} />;
      case "cancelled":
        return <XCircle size={14} />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmée";
      case "pending":
        return "En attente";
      case "cancelled":
        return "Annulée";
      default:
        return status;
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
        <div className="fixed inset-0 bg-gradient-to-b from-black/10 via-black/2 to-black/30" />
        
        {/* Contenu principal */}
        <div className="relative z-10 px-4 pt-6 pb-32">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Ticket size={18} className="text-sky-400" />
              <span className="text-white/70 text-sm font-medium">Mes réservations</span>
            </div>
            <h1 className="text-3xl font-bold text-white">Réservations</h1>
            <p className="text-white/50 text-sm mt-1">Retrouvez toutes vos activités réservées</p>
          </div>

          {/* Filtres */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-5 scrollbar-hide">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  filter === f.value
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30'
                    : 'bg-white/10 backdrop-blur text-white/80 border border-white/20 hover:bg-white/20'
                }`}
              >
                {f.label} ({f.count})
              </button>
            ))}
          </div>

          {/* Liste des réservations */}
          {filteredReservations.length === 0 ? (
            <div className="text-center py-16 backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20">
              <Ticket size={48} className="text-white/20 mx-auto mb-3" />
              <p className="text-white/40">Aucune réservation</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredReservations.map((res, index) => (
                <motion.div
                  key={res.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="backdrop-blur-xl bg-white/10 rounded-2xl overflow-hidden border border-white/20 hover:border-white/30 transition-all"
                >
                  <div className="flex flex-row">
                    {/* Image miniature */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0">
                      <img 
                        src={res.image} 
                        alt={res.activity} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
                    </div>
                    
                    {/* Contenu */}
                    <div className="flex-1 p-3 sm:p-4">
                      <div className="flex flex-wrap justify-between items-start gap-2">
                        <div>
                          <h3 className="font-bold text-white text-base sm:text-lg">{res.activity}</h3>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="flex items-center gap-1 text-white/60 text-xs">
                              <Calendar size={12} />
                              {res.date}
                            </span>
                            <span className="flex items-center gap-1 text-white/60 text-xs">
                              <Clock size={12} />
                              {res.time}
                            </span>
                          </div>
                        </div>
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] sm:text-xs font-medium border ${getStatusColor(res.status)}`}>
                          {getStatusIcon(res.status)}
                          <span>{getStatusText(res.status)}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 mt-2 text-white/50 text-xs">
                        <MapPin size={12} />
                        <span>{res.location}</span>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/10">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-sky-500/30 flex items-center justify-center">
                            <span className="text-white text-[10px] font-bold">#</span>
                          </div>
                          <span className="text-white/60 text-xs">Joueur {res.playerNumber}</span>
                        </div>
                        <button className="text-sky-400 hover:text-sky-300 text-xs sm:text-sm flex items-center gap-1 transition">
                          Détails <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Résumé des points */}
          <div className="mt-6 backdrop-blur-xl bg-gradient-to-r from-sky-500/20 to-blue-500/20 rounded-2xl p-4 border border-sky-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sky-500/30 flex items-center justify-center">
                  <Sparkles size={18} className="text-sky-400" />
                </div>
                <div>
                  <p className="text-white/60 text-xs">Total des réservations</p>
                  <p className="text-white font-bold text-xl">{reservations.length}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white/60 text-xs">Points cumulés</p>
                <p className="text-amber-400 font-bold text-xl">2,840 pts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}