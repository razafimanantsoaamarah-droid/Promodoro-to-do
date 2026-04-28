import { useTheme } from '../hooks/useTheme';

export const ThemePicker = () => {
  const { themeId, setThemeId, themes } = useTheme();

  return (
    <div className="space-y-4">
      <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 ml-1">
        Ambiance
      </label>
      <div className="grid grid-cols-3 gap-2">
        {themes.map(t => {
          const Icon = t.icon;
          const isActive = themeId === t.id;

          return (
            <button
              key={t.id}
              onClick={() => setThemeId(t.id)}
              className={`flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all duration-300 ${
                isActive
                  ? `border-${t.accent}-500/50 ${t.cardBg} shadow-lg shadow-${t.accent}-500/10`
                  : 'border-white/5 bg-white/5 hover:border-white/20 hover:bg-white/10'
              }`}
            >
              <div className={`${isActive ? `text-${t.accent}-400` : 'text-slate-500'}`}>
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              
              <span className={`text-[10px] font-bold uppercase tracking-tighter ${
                isActive ? 'text-white' : 'text-slate-500'
              }`}>
                {t.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
