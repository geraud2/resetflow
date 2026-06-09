import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Waves } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 3000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {/* Image de fond */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(../public/fonds.png)',
        }}
      />
      
      {/* Overlay sombre pour lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      
      {/* Effet de lumière dynamique */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.15), transparent 70%)' }}
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.15), transparent 70%)' }}
        />
        {/* Grille élégante */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Contenu principal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        className="relative z-10 flex flex-col items-center gap-6"
      >
        {/* Logo animé */}
        <motion.div
          animate={{ 
            boxShadow: [
              '0 0 20px rgba(14,165,233,0.3)', 
              '0 0 60px rgba(14,165,233,0.6)', 
              '0 0 20px rgba(14,165,233,0.3)'
            ] 
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-28 h-28 rounded-3xl flex items-center justify-center relative"
          style={{ background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)' }}
        >
          <Waves className="w-14 h-14 text-white" />
          <motion.div
            animate={{ opacity: [0, 0.6, 0], scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            className="absolute inset-0 rounded-3xl"
            style={{ background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)' }}
          />
        </motion.div>

        {/* Nom de la marque */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center"
        >
          <div
            className="text-5xl font-black tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #ffffff, #7dd3fc, #38bdf8, #0ea5e9)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            ResortFlow
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-white/60 text-sm font-medium tracking-[0.3em] uppercase mt-2"
          >
            Premium Hotel Animation
          </motion.div>
        </motion.div>

        {/* Loader élégant */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col items-center gap-3 mt-4"
        >
          <div className="w-56 h-0.5 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ delay: 1.2, duration: 1.5, ease: 'easeInOut' }}
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #0ea5e9, #06b6d4)' }}
            />
          </div>
          <motion.p
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-xs text-white/40 font-medium"
          >
            Chargement de l'expérience...
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Tagline en bas */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-12 text-center z-10"
      >
        <p className="text-white/30 text-xs font-medium tracking-widest uppercase">
          Powered by ResortFlow v2.0
        </p>
      </motion.div>
    </motion.div>
  );
}