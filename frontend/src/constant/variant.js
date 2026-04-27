import { Coffee, Brain, Moon } from 'lucide-react';


export const getVariants = (theme) => ({
  glass: `${theme.cardBg} backdrop-blur-lg border ${theme.border} text-white shadow-xl hover:bg-white/10`,
  primary: `bg-${theme.accent}-600 text-white shadow-md hover:bg-${theme.accent}-700 border border-transparent`,
  secondary: "bg-gray-800 text-gray-100 shadow-md hover:bg-gray-900 border border-transparent",
  outline: `bg-transparent border-2 ${theme.border} text-white hover:bg-white/10`,
  ghost: "bg-transparent text-white hover:bg-white/10 border border-transparent",
});

export const getInputVariants = (theme) => ({
  default: `${theme.cardBg} ${theme.border} text-white placeholder:text-slate-500 focus:border-${theme.accent}-500/50 focus:ring-4 focus:ring-${theme.accent}-500/10`,
  error: "bg-rose-500/5 border-rose-500/30 text-rose-200 placeholder:text-rose-300/50 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10"
});

export const getTextareaVariants = (theme) => ({
  default: `${theme.cardBg} ${theme.border} text-white placeholder:text-slate-500 focus:border-${theme.accent}-500/50 focus:ring-4 focus:ring-${theme.accent}-500/10`,
  error: "bg-rose-500/5 border-rose-500/30 text-rose-200 placeholder:text-rose-300/50 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10"
});


export const modes = {
  work: { 
    label: 'Focus', 
    duration: 25 * 60, 
    color: 'text-cyan-400',
    icon: Brain 
  },
  shortBreak: { 
    label: 'Pause', 
    duration: 5 * 60, 
    color: 'text-indigo-400', 
    icon: Coffee 
  },
  longBreak: { 
    label: 'Repos', 
    duration: 15 * 60, 
    color: 'text-purple-400', 
    icon: Moon 
  }
};
