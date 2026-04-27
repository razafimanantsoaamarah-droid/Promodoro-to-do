import React from 'react';
import { Card } from '../../../components/shared/ui/Card';
import { useTheme } from '../../theme/hooks/useTheme';

export const SandTimer = ({ minutes, seconds, label, progress }) => {
  const { theme } = useTheme();
  const sandHeight = 100 - progress;
  
  const accentColor = theme.accentColor || 'currentColor';

  return (
    <Card className="text-center p-10">
      <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50 block mb-6">
        {label}
      </span>
      
      <div className="relative w-32 h-48 mx-auto mb-6">
        <svg viewBox="0 0 100 160" className="w-full h-full drop-shadow-2xl">
          <path 
            d="M10 0H90L55 75L90 150H10L45 75L10 0Z" 
            fill="none" 
            stroke="white" 
            strokeWidth="2" 
            opacity="0.2" 
          />
          
          <clipPath id="topClip">
            <rect x="0" y="0" width="100" height="75" />
          </clipPath>
          <rect 
            x="12" 
            y={70 - (sandHeight * 0.7)} 
            width="76" 
            height={sandHeight * 0.7} 
            fill={accentColor} 
            className={`fill-${theme.accent}-500`}
            opacity="0.4" 
            clipPath="url(#topClip)"
          />

          <clipPath id="bottomClip">
            <rect x="0" y="85" width="100" height="75" />
          </clipPath>
          <rect 
            x="12" 
            y={158 - (progress * 0.7)} 
            width="76" 
            height={progress * 0.7} 
            fill={accentColor}
            className={`fill-${theme.accent}-500`}
            opacity="0.8" 
            clipPath="url(#bottomClip)"
          />

          {progress > 0 && progress < 100 && (
            <line 
              x1="50" y1="72" x2="50" y2="88" 
              stroke={accentColor} 
              className={`stroke-${theme.accent}-500`}
              strokeWidth="2" 
              strokeDasharray="2,2"
              opacity="0.6"
            />
          )}
        </svg>
      </div>

      <div className="text-4xl font-mono font-black text-white tabular-nums tracking-tight">
        {minutes}<span className="animate-pulse opacity-40">:</span>{seconds}
      </div>
    </Card>
  );
};
