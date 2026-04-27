import React from 'react';
import { useTheme } from '../features/theme/hooks/useTheme'; // Ajuste le chemin si nécessaire

export const Card = ({ children, className = "" }) => {
  const { theme } = useTheme();

  return (
    <div className={`
      ${theme.cardBg} 
      backdrop-blur-2xl 
      border ${theme.border} 
      rounded-[2rem] 
      p-8 
      shadow-2xl 
      transition-all 
      duration-500 
      ${className}
    `}>
      {children}
    </div>
  );
};
