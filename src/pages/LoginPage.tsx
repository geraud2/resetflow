import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Waves, Eye, EyeOff, ArrowRight, Lock, Mail, Shield } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@resortflow.io');
  const [password, setPassword] = useState('••••••••');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'admin' | 'client'>('admin');

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      if (mode === 'admin') navigate('/admin');
      else navigate('/client');
    }, 1200);
  };

  return (
    <div className="min-h-screen flex overflow-hidden" style={{ background: 'linear-gradient(135deg, #020b18 0%, #041525 50%, #020b18 100%)' }}>
      {/* Left panel - hero image */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex flex-1 relative overflow-hidden"
      >
        <img
          src="https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1200"
          className="absolute inset-0 w-full h-full object-cover"
          alt="Luxury Resort"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(2,11,24,0.7) 0%, rgba(4,21,37,0.4) 100%)' }} />

        {/* Overlay content */}
        <div className="relative z-10 p-12 flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center">
              <Waves className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-black text-white">ResortFlow</span>
          </div>

          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl font-black text-white leading-tight mb-4"
            >
              L'animation<br />
              <span style={{ background: 'linear-gradient(135deg, #38bdf8, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                réinventée
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-slate-300 text-lg max-w-sm leading-relaxed"
            >
              La plateforme SaaS premium pour gérer l'animation de vos hôtels et resorts de luxe.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex gap-6 mt-10"
            >
              {[['500+', 'Hôtels'], ['2M+', 'Réservations'], ['98%', 'Satisfaction']].map(([val, label]) => (
                <div key={label}>
                  <div className="text-2xl font-black text-white">{val}</div>
                  <div className="text-slate-400 text-sm">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Right panel - form */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 lg:max-w-md flex flex-col items-center justify-center px-6 py-12"
      >
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center">
            <Waves className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-black text-white">ResortFlow</span>
        </div>

        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-3xl font-black text-white mb-2">Connexion</h1>
            <p className="text-slate-400">Bienvenue sur votre espace premium</p>
          </div>

          {/* Mode toggle */}
          <div className="glass rounded-xl p-1 flex mb-6">
            {(['admin', 'client'] as const).map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m);
                  setEmail(m === 'admin' ? 'admin@resortflow.io' : 'guest@resortflow.io');
                }}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  mode === m
                    ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {m === 'admin' ? 'Administrateur' : 'Client'}
              </button>
            ))}
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5 block">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full glass rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5 block">Mot de passe</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full glass rounded-xl pl-10 pr-12 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
                  placeholder="••••••••"
                />
                <button
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button className="text-xs text-sky-400 hover:text-sky-300 font-medium transition-colors">
                Mot de passe oublié ?
              </button>
            </div>

            <Button
              fullWidth
              size="lg"
              loading={loading}
              onClick={handleLogin}
              iconRight={!loading ? <ArrowRight size={18} /> : undefined}
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </Button>
          </div>

          {/* Security badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-2 mt-8 text-slate-500"
          >
            <Shield size={13} />
            <span className="text-xs">Connexion sécurisée SSL 256-bit</span>
          </motion.div>

          {/* Demo links */}
          <div className="mt-6 glass rounded-xl p-4">
            <p className="text-xs text-slate-500 font-medium mb-2 text-center">Accès rapide demo</p>
            <div className="flex gap-2">
              <button
                onClick={() => { setMode('admin'); setTimeout(() => navigate('/admin'), 100); }}
                className="flex-1 text-xs py-2 px-3 rounded-lg bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 transition-all font-medium"
              >
                Dashboard Admin
              </button>
              <button
                onClick={() => { setMode('client'); setTimeout(() => navigate('/client'), 100); }}
                className="flex-1 text-xs py-2 px-3 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-all font-medium"
              >
                App Client
              </button>
              <button
                onClick={() => navigate('/tv')}
                className="flex-1 text-xs py-2 px-3 rounded-lg bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition-all font-medium"
              >
                Écran TV
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
