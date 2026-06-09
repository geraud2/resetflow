import React from 'react';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'active' | 'full' | 'upcoming' | 'pending' | 'break' | 'confirmed' | 'waitlist' | 'gold' | 'silver' | 'bronze';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
  warning: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
  error: 'bg-red-500/20 text-red-400 border border-red-500/30',
  info: 'bg-sky-500/20 text-sky-400 border border-sky-500/30',
  active: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
  full: 'bg-red-500/20 text-red-400 border border-red-500/30',
  upcoming: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
  pending: 'bg-slate-500/20 text-slate-400 border border-slate-500/30',
  break: 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
  confirmed: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
  waitlist: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
  gold: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
  silver: 'bg-slate-400/20 text-slate-300 border border-slate-400/30',
  bronze: 'bg-orange-600/20 text-orange-400 border border-orange-600/30',
};

const dotColors: Record<BadgeVariant, string> = {
  success: 'bg-emerald-400',
  warning: 'bg-amber-400',
  error: 'bg-red-400',
  info: 'bg-sky-400',
  active: 'bg-emerald-400',
  full: 'bg-red-400',
  upcoming: 'bg-amber-400',
  pending: 'bg-slate-400',
  break: 'bg-orange-400',
  confirmed: 'bg-emerald-400',
  waitlist: 'bg-amber-400',
  gold: 'bg-amber-400',
  silver: 'bg-slate-400',
  bronze: 'bg-orange-400',
};

export function Badge({ variant = 'info', children, className = '', dot = false }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${variantStyles[variant]} ${className}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]} animate-pulse`} />}
      {children}
    </span>
  );
}
