import { Coffee, Brain, Moon } from 'lucide-react';

export const variants = {
  glass: "bg-white/20 backdrop-blur-lg border border-white/30 text-white shadow-xl hover:bg-white/30",
  primary: "bg-indigo-600 text-white shadow-md hover:bg-indigo-700 border border-transparent",
  secondary: "bg-gray-800 text-gray-100 shadow-md hover:bg-gray-900 border border-transparent",
  outline: "bg-transparent border-2 border-white/50 text-white hover:bg-white/10",
  ghost: "bg-transparent text-white hover:bg-white/10 border border-transparent",
};

export const inputVariants = {
  default: "bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10",
  error: "bg-rose-500/5 border-rose-500/30 text-rose-200 placeholder:text-rose-300/50 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10"
};

export const textareaVariants = {
  default: "bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10",
  error: "bg-rose-500/5 border-rose-500/30 text-rose-200 placeholder:text-rose-300/50 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10"
};

export const modes = {
  work: { label: 'Focus', duration: 25 * 60, color: '#06b6d4', icon: Brain },
  shortBreak: { label: 'Pause', duration: 5 * 60, color: '#6366f1', icon: Coffee },
  longBreak: { label: 'Repos', duration: 15 * 60, color: '#8b5cf6', icon: Moon }
};
