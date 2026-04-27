import React from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, XCircle, Info, X } from 'lucide-react';
import { useTheme } from '../../../../features/theme/hooks/useTheme';
const icons = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

const colors = {
  success: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400',
  error: 'border-rose-500/50 bg-rose-500/10 text-rose-400',
  warning: 'border-amber-500/50 bg-amber-500/10 text-amber-400',
  info: 'border-cyan-500/50 bg-cyan-500/10 text-cyan-400',
};

export const Toast = ({ id, type = 'info', message, onClose }) => {
  const { theme } = useTheme();
  const Icon = icons[type];

  return (
    <Motion.div
      layout
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-xl ${colors[type]} min-w-[300px] shadow-2xl shadow-black/20`}
    >
      <Icon size={20} />
      <span className="text-sm font-medium flex-1">{message}</span>
      <button 
        onClick={() => onClose(id)} 
        className="opacity-50 hover:opacity-100 p-1 hover:bg-white/10 rounded-md transition-all"
      >
        <X size={16} />
      </button>
    </Motion.div>
  );
};
