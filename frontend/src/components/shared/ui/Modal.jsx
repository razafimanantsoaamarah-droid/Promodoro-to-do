import { AnimatePresence, motion as Motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from './Button';

export const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
            onClick={onClose}
          />
          <Motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full ${sizes[size]} bg-slate-900/95 backdrop-blur-2xl border border-[var(--border-color)] rounded-[2rem] shadow-2xl z-50 p-8 transition-colors duration-500`}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black text-white">{title}</h2>
              <Button variant="glass" onClick={onClose} className="p-2 rounded-full" icon={<X size={20} />} />
            </div>
            <div className="text-slate-300">
              {children}
            </div>
          </Motion.div>
        </>
      )}
    </AnimatePresence>
  );
};