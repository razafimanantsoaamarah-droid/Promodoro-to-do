import { useTheme } from '../hooks/useTheme';

export const ThemeSwitcher = () => {
  const { themeId, setThemeId, themes } = useTheme();

  return (
    <div className="flex gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
      {themes.map(t => {
        const Icon = t.icon; 
        
        return (
          <button
            key={t.id}
            onClick={() => setThemeId(t.id)}
            className={`px-3 py-2 rounded-lg text-sm transition flex items-center justify-center ${
              themeId === t.id 
                ? 'bg-white/10 text-white shadow-sm' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
            title={t.name}
          >
            <Icon size={18} strokeWidth={2} />
          </button>
        );
      })}
    </div>
  );
};
