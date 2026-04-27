import { useState, useEffect, useRef, useCallback } from 'react';
import { playNotification } from '../../../utils/sound';
import { modes } from '../../../constant/variant';
import { useTheme } from '../../theme/hooks/useTheme';

export function useTimer(onTimerComplete, timerStyle = 'circular') {
  const { theme } = useTheme();
  const [mode, setMode] = useState('work');
  const [timeLeft, setTimeLeft] = useState(modes.work.duration);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const switchMode = useCallback((newMode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(modes[newMode].duration);
  }, []);

  const handleCycleComplete = useCallback(() => {
    playNotification();
    setIsRunning(false);
    onTimerComplete?.(mode);
    switchMode(mode === 'work' ? 'shortBreak' : 'work');
  }, [mode, onTimerComplete, switchMode]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            handleCycleComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, handleCycleComplete]);

  const progress = ((modes[mode].duration - timeLeft) / modes[mode].duration) * 100;
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');

  return {
    mode, 
    timeLeft, 
    isRunning, 
    progress, 
    minutes, 
    seconds,
    modes, 
    timerStyle,
    themeAccent: theme.accent,
    setMode, 
    setIsRunning, 
    switchMode, 
    handleCycleComplete,
    reset: () => { setIsRunning(false); setTimeLeft(modes[mode].duration); },
  };
}
