import { Card } from '../../../components/shared/ui/Card';
import { useTheme } from '../../theme/hooks/useTheme';

export const DigitalClock = ({ minutes, seconds, label, progress }) => {
  const { theme } = useTheme();

  return (
    <Card className="text-center p-10">
      <span className={`text-[10px] font-black uppercase tracking-[0.3em] opacity-50 block mb-4`}>
        {label}
      </span>
      
      <div className="text-7xl font-mono font-black text-white tabular-nums tracking-tighter">
        {minutes}<span className="animate-pulse opacity-50">:</span>{seconds}
      </div>

      <div className={`mt-6 w-full ${theme.cardBg} rounded-full h-2 overflow-hidden border ${theme.border}`}>
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out bg-${theme.accent}-500 shadow-[0_0_15px_rgba(0,0,0,0.3)]`}
          style={{ 
            width: `${progress}%`,
            backgroundColor: theme.accentColor 
          }}
        />
      </div>
    </Card>
  );
};
