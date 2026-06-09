import { useState } from 'react';
import { Search, Sun, Calendar, Users, CalendarDays, Trophy, MapPin, Star, Bell, Sparkles, ArrowRight, TrendingUp, Droplets, Wind } from 'lucide-react';
import { currentClient } from '../../data/mockData';
import { ClientLayout } from './ClientLayout';

import { useWeather } from '../../hook/UseWeather';

// Composant pour l'icône météo
function WeatherIcon({ code, size = 20 }: { code: string; size?: number }) {
  const codeNum = parseInt(code);
  if (codeNum === 113) return <Sun size={size} className="text-amber-300" />;
  if (codeNum === 116 || codeNum === 119 || codeNum === 122) return <Cloud size={size} className="text-white/80" />;
  if (codeNum >= 176 && codeNum <= 299) return <CloudRain size={size} className="text-blue-300" />;
  if (codeNum >= 300 && codeNum <= 399) return <CloudRain size={size} className="text-blue-400" />;
  if (codeNum >= 600 && codeNum <= 699) return <CloudLightning size={size} className="text-yellow-300" />;
  return <Sun size={size} className="text-amber-300" />;
}

// Composants manquants pour la météo
function Cloud(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a3.5 3.5 0 0 1 0-7h.5A5.5 5.5 0 0 1 17 9a5 5 0 0 1 2 9.5z"/></svg>; }
function CloudRain(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a3.5 3.5 0 0 1 0-7h.5A5.5 5.5 0 0 1 17 9a5 5 0 0 1 2 9.5z"/><path d="M12 13v4"/><path d="M8 15v4"/><path d="M16 15v4"/></svg>; }
function CloudLightning(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a3.5 3.5 0 0 1 0-7h.5A5.5 5.5 0 0 1 17 9a5 5 0 0 1 2 9.5z"/><polyline points="13 11 11 15 15 15 13 19"/></svg>; }

export function ClientHome() {
  const [searchQuery, setSearchQuery] = useState('');
  const { weather, loading, error } = useWeather('Antalya');

  const statsCards = [
    { icon: Calendar, value: "18", label: "Activités", sublabel: "Aujourd'hui", color: "from-blue-500 to-blue-600" },
    { icon: Users, value: "243", label: "Participants", sublabel: "Actifs", color: "from-emerald-500 to-teal-500" },
    { icon: CalendarDays, value: "87", label: "Réservations", sublabel: "Aujourd'hui", color: "from-purple-500 to-indigo-500" },
    { icon: TrendingUp, value: "Water Polo", label: "Populaire", sublabel: "126 participants", color: "from-amber-500 to-orange-500" },
  ];

  const activitiesList = [
    { time: "10:00", name: "Water Polo", location: "Piscine Principale", participants: 45, image: "https://images.pexels.com/photos/1263349/pexels-photo-1263349.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { time: "11:30", name: "Volleyball", location: "Beach Arena", participants: 32, image: "https://images.pexels.com/photos/1655329/pexels-photo-1655329.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { time: "16:00", name: "Yoga", location: "Jardin Zen", participants: 18, image: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800" },
  ];

  const schedule = [
    { time: "10:00", events: ["Water Polo", "Volleyball", "Darts", "Yoga", "Show Night"], isLive: true },
    { time: "11:30", events: ["En cours", "À venir", "À venir", "À venir", "À venir"], isLive: false },
    { time: "14:00", events: ["Darts Tournament"], isLive: false },
    { time: "16:00", events: ["Yoga Flow"], isLive: false },
    { time: "20:30", events: ["Party Night"], isLive: false, highlight: true },
  ];

  return (
    <ClientLayout>
      <div className="min-h-screen relative">
        {/* Image de fond */}
        <div 
          className="fixed inset-0 bg-cover bg-center bg-no-repeat"
          style={{
          backgroundImage: 'url(/fonds.png)',          }}
        />
        <div className="fixed inset-0 bg-gradient-to-b from-black/10 via-black/2 to-black/30" />
        
        {/* Contenu principal */}
        <div className="relative z-10 pb-32">
          {/* Header */}
          <div className="px-4 sm:px-5 pt-10 sm:pt-12 pb-6">
            <div className="flex justify-between items-start gap-3">
              {/* Météo en temps réel - Turquie */}
              <div className="backdrop-blur-xl bg-white/10 rounded-2xl px-3 sm:px-4 py-1.5 sm:py-2 border border-white/20">
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 animate-pulse" />
                    <div>
                      <div className="h-5 w-12 bg-white/20 rounded animate-pulse" />
                      <div className="h-3 w-16 bg-white/20 rounded mt-1 animate-pulse" />
                    </div>
                  </div>
                ) : weather ? (
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-400/20 flex items-center justify-center">
                      <WeatherIcon code={weather.icon} size={16} />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-white font-bold text-base sm:text-lg">{weather.temp}°C</span>
                        <span className="text-white/60 text-xs">|</span>
                        <span className="text-white/70 text-xs sm:text-sm hidden xs:inline">{weather.condition}</span>
                      </div>
                      <div className="text-white/50 text-[10px] sm:text-xs flex items-center gap-2">
                        <span className="flex items-center gap-0.5">
                          <Droplets size={10} /> {weather.humidity}%
                        </span>
                        <span className="flex items-center gap-0.5">
                          <Wind size={10} /> {weather.windSpeed} km/h
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <Sun size={16} className="text-amber-300" />
                    <span className="text-white font-bold">28°C</span>
                  </div>
                )}
              </div>

              {/* Profil - responsive */}
              <div className="flex items-center gap-2 sm:gap-3">
                <button className="backdrop-blur-xl bg-white/10 rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border border-white/20">
                  <Bell size={16} className="text-white sm:text-lg" />
                </button>
                <div className="backdrop-blur-xl bg-white/10 rounded-full pl-3 sm:pl-4 pr-1 py-1 border border-white/20 flex items-center gap-1.5 sm:gap-2">
                  <span className="text-white text-xs sm:text-sm font-medium hidden xs:inline">James</span>
                  <img 
                    src={currentClient.avatar} 
                    alt="Profile" 
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover ring-2 ring-white/50"
                  />
                </div>
              </div>
            </div>

            {/* Texte de bienvenue - responsive */}
            <div className="mt-6 sm:mt-8 text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 sm:px-4 sm:py-1.5 mb-2 sm:mb-3">
                <Sparkles size={12} className="text-amber-300 sm:text-sm" />
                <span className="text-white/90 text-[10px] sm:text-xs font-medium">
                  {weather ? weather.city : 'Bienvenue'}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">Bonjour, James</h1>
              <p className="text-white/80 text-xs sm:text-sm">Profitez des activités aujourd'hui</p>
            </div>

            {/* Barre de recherche - responsive */}
            <div className="max-w-md mx-auto mt-5 sm:mt-6">
              <div className="relative">
                <Search size={16} className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400 sm:text-lg" />
                <input
                  type="text"
                  placeholder="Rechercher une activité..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/95 backdrop-blur rounded-xl sm:rounded-2xl py-3 sm:py-3.5 pl-9 sm:pl-11 pr-3 sm:pr-4 text-slate-700 placeholder:text-slate-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Cartes stats - grid responsive */}
          <div className="px-4 sm:px-5 mb-5 sm:mb-6">
            <div className="grid grid-cols-2 xs:grid-cols-4 gap-2 sm:gap-3">
              {statsCards.map((card, idx) => (
                <div key={idx} className="backdrop-blur-xl bg-white/10 rounded-xl p-2 sm:p-3 border border-white/20">
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-r ${card.color} bg-opacity-20 flex items-center justify-center mb-1.5 sm:mb-2`}>
                    <card.icon size={14} className="text-white sm:text-base" />
                  </div>
                  <p className="text-base sm:text-lg font-bold text-white">{card.value}</p>
                  <p className="text-[10px] sm:text-xs text-white/80 font-medium leading-tight">{card.label}</p>
                  <p className="text-[8px] sm:text-[10px] text-white/50">{card.sublabel}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Activités du jour */}
          <div className="px-4 sm:px-5 mb-5 sm:mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-base sm:text-lg font-bold text-white">Activités du jour</h2>
              <button className="text-white/70 text-[10px] sm:text-xs flex items-center gap-1">
                Voir tout <ArrowRight size={10} className="sm:w-3 sm:h-3" />
              </button>
            </div>

            <div className="space-y-3">
              {activitiesList.map((act, idx) => (
                <div key={idx} className="backdrop-blur-xl bg-white/10 rounded-xl overflow-hidden border border-white/20">
                  <div className="flex flex-row">
                    {/* Image responsive */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
                      <img src={act.image} alt={act.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
                      <div className="absolute bottom-1 left-1 bg-black/60 rounded-md px-1 py-0.5 sm:rounded-lg sm:px-1.5 sm:py-0.5">
                        <span className="text-white text-[9px] sm:text-[10px] font-bold">{act.time}</span>
                      </div>
                    </div>
                    
                    {/* Contenu */}
                    <div className="flex-1 p-2 sm:p-2.5">
                      <div className="flex flex-wrap justify-between items-start gap-2">
                        <div className="flex-1 min-w-[120px]">
                          <h3 className="font-bold text-white text-sm sm:text-base">{act.name}</h3>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <MapPin size={10} className="text-white/50" />
                            <span className="text-white/60 text-[10px] sm:text-xs truncate">{act.location}</span>
                          </div>
                        </div>
                        <button className="bg-white/20 hover:bg-white/30 rounded-lg px-2.5 py-1 sm:px-3 sm:py-1 text-white text-[10px] sm:text-xs font-medium transition whitespace-nowrap">
                          Participer
                        </button>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex -space-x-1">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-500 ring-1 ring-white" />
                          ))}
                        </div>
                        <span className="text-white/50 text-[9px] sm:text-[10px]">+{act.participants} participants</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Programme du jour */}
          <div className="px-4 sm:px-5">
            <h2 className="text-base sm:text-lg font-bold text-white mb-3">Programme du jour</h2>
            
            <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 overflow-hidden">
              {schedule.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`flex flex-col sm:flex-row sm:items-center p-3 ${idx !== schedule.length - 1 ? 'border-b border-white/10' : ''} ${item.highlight ? 'bg-white/5' : ''}`}
                >
                  <div className="w-full sm:w-14 mb-1 sm:mb-0">
                    <span className="font-bold text-white text-sm">{item.time}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-1">
                      {item.events.map((event, eventIdx) => (
                        <span key={eventIdx} className="text-white/80 text-[11px] sm:text-xs">
                          {event}{eventIdx < item.events.length - 1 ? ' • ' : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                  {item.isLive && (
                    <div className="mt-2 sm:mt-0 sm:ml-2">
                      <span className="bg-red-500 text-white text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full animate-pulse inline-block">
                        LIVE
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Champion du jour */}
            <div className="mt-4 backdrop-blur-xl bg-amber-500/20 rounded-xl p-3 sm:p-4 border border-amber-500/30">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-500 flex items-center justify-center">
                    <Trophy size={18} className="text-white sm:text-xl" />
                  </div>
                  <div>
                    <p className="text-amber-300 text-[9px] sm:text-[10px] font-semibold uppercase">Champion du jour</p>
                    <p className="font-bold text-white text-sm sm:text-base">Player #12</p>
                    <p className="text-white/70 text-[10px] sm:text-xs">Water Polo</p>
                  </div>
                </div>
                <Star size={16} className="text-amber-400 fill-amber-400 sm:w-5 sm:h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}