/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';
import { modes } from '../../../constant/variant';
import { CircularProgress } from './CircularProgression';
import { Card } from '../../../components/shared/ui/Card';
import { Button } from '../../../components/shared/ui/Button';
import { MusicPlayer } from '../../music/components/MusicPlayer';

const Timer = ({ activeTask, onTimerComplete }) => {
  const [mode, setMode] = useState('work');
  const [timeLeft, setTimeLeft] = useState(modes.work.duration);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const isDark = document.documentElement.getAttribute('data-theme') !== 'minimal';

  const switchMode = useCallback((newMode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(modes[newMode].duration);
  }, []);

  const handleCycleComplete = useCallback(() => {
    setIsRunning(false);
    onTimerComplete?.(mode);
    const nextMode = mode === 'work' ? 'shortBreak' : 'work';
    switchMode(nextMode);
  }, [mode, onTimerComplete, switchMode]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleCycleComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, handleCycleComplete]);

  const formatTime = (time) => {
    const m = Math.floor(time / 60).toString().padStart(2, '0');
    const s = (time % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const progress = ((modes[mode].duration - timeLeft) / modes[mode].duration) * 100;
  const Icon = modes[mode].icon;

  return (
    <Card className={`relative flex flex-col items-center max-w-sm mx-auto p-10 overflow-hidden ${!isDark ? 'shadow-[0_0_30px_rgba(0,0,0,0.15)]' : ''}`}>
      <div className="absolute top-4 right-4 z-10">
        <MusicPlayer />
      </div>

      <div 
        className="absolute -top-20 -left-20 w-64 h-64 rounded-full blur-[100px] opacity-20 transition-colors duration-1000"
        style={{ backgroundColor: 'var(--accent)' }}
      />

      <div className="relative mb-8">
        <CircularProgress progress={progress} color="var(--accent)" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] mb-2">
            {activeTask ? activeTask.title : modes[mode].label}
          </span>
          <div className="text-6xl font-black tabular-nums tracking-tighter" style={{ color: 'var(--text-color)' }}>
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-10">
        <Button 
          variant="glass" 
          className="p-4 rounded-full" 
          onClick={() => setTimeLeft(modes[mode].duration)} 
          icon={<RotateCcw size={20} />} 
        />
        <Button 
          variant="primary" 
          className="w-20 h-20 rounded-full shadow-xl" 
          onClick={() => setIsRunning(!isRunning)} 
          icon={isRunning ? <Pause size={32} fill="currentColor"/> : <Play size={32} fill="currentColor" className="ml-1"/>} 
        />
        <Button 
          variant="glass" 
          className="p-4 rounded-full" 
          onClick={handleCycleComplete} 
          icon={<SkipForward size={20} />} 
        />
      </div>

      <nav className="flex gap-1 bg-white/5 p-1.5 rounded-2xl border border-white/5">
        {Object.entries(modes).map(([key, { label, icon: ModeIcon }]) => ( 
          <Button
            key={key}
            variant={mode === key ? "primary" : "ghost"}
            onClick={() => switchMode(key)}
            className="px-4 py-2 text-xs"
            icon={<ModeIcon size={14} />}
          >
            {label}
          </Button>
        ))}
      </nav>
    </Card>
  );
};

export default Timer;