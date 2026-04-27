import React, { useState, useRef } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { Settings, X, Upload, RotateCcw } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { Button } from '../../../components/shared/ui/Button';
import { useLocalStorage } from '../../../hooks/useLocalStorage';

export const SettingsPanel = () => {
  const { themeId, setThemeId, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [customImages, setCustomImages] = useLocalStorage('rmy-custom-theme-images', {});
  const fileInputRef = useRef(null);

  const handleImageUpload = (themeId, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setCustomImages(prev => ({ ...prev, [themeId]: ev.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const resetImage = (themeId) => {
    setCustomImages(prev => {
      const updated = { ...prev };
      delete updated[themeId];
      return updated;
    });
  };

  const getImage = (theme) => {
    return customImages[theme.id] || theme.image;
  };

  return (
    <div className="relative">
      <Button
        variant="glass"
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 rounded-full"
        icon={<Settings size={20} className="text-[var(--text-muted)]" />}
      />

      <AnimatePresence>
        {isOpen && (
          <>
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <Motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute top-full right-0 mt-2 w-80 bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl z-50 p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-black uppercase tracking-widest text-white">Paramètres</h3>
                <Button variant="ghost" className="p-1" onClick={() => setIsOpen(false)} icon={<X size={16} />} />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-widest font-bold text-[var(--text-muted)]">Thème</label>
                <div className="grid grid-cols-1 gap-2">
                  {themes.map(t => {
                    const Icon = t.icon;
                    return (
                      <div
                        key={t.id}
                        onClick={() => setThemeId(t.id)}
                        className={`flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer group ${
                          themeId === t.id
                            ? 'bg-white/10 border border-white/20'
                            : 'hover:bg-white/5 border border-transparent'
                        }`}
                      >
                        <div className="relative">
                          <img
                            src={getImage(t)}
                            alt={t.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleImageUpload(t.id, e)}
                          />
                        </div>
                        <div className="flex items-center gap-2 flex-1">
                          <Icon size={16} className={themeId === t.id ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'} />
                          <span className={`text-sm font-medium ${themeId === t.id ? 'text-white' : 'text-[var(--text-muted)]'}`}>
                            {t.name}
                          </span>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                          <button
                            onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                            className="p-1 text-[var(--text-muted)] hover:text-white transition"
                            title="Changer l'image"
                          >
                            <Upload size={12} />
                          </button>
                          {customImages[t.id] && (
                            <button
                              onClick={(e) => { e.stopPropagation(); resetImage(t.id); }}
                              className="p-1 text-rose-400 hover:text-rose-300 transition"
                              title="Réinitialiser"
                            >
                              <RotateCcw size={12} />
                            </button>
                          )}
                        </div>
                        {themeId === t.id && (
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </Motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};