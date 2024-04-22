// components/Timer.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';
import { playNotification } from '../utils/sound';

const modes = {
  work: { label: 'Focus', duration: 25 * 60, color: '#06b6d4' },
  shortBreak: { label: 'Short Break', duration: 5 * 60, color: '#6366f1' },
  longBreak: { label: 'Long Break', duration: 15 * 60, color: '#8b5cf6' }
};

const CircularProgress = ({ progress, color }) => {
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width="280" height="280" viewBox="0 0 280 280" className="transform -rotate-90">
      <circle
        cx="140"
        cy="140"
        r={radius}
        fill="transparent"
        stroke="#1e293b"
        strokeWidth="8"
      />
      <circle
        cx="140"
        cy="140"
        r={radius}
        fill="transparent"
        stroke={color}
        strokeWidth="8"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
    </svg>
  );
};

const Timer = ({ activeTask, onTimerComplete }) => {

  const [mode, setMode] = useState('work');
  const [timeLeft, setTimeLeft] = useState(modes.work.duration);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const totalDuration = modes[mode].duration;
  const progress = ((totalDuration - timeLeft) / totalDuration) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // useCallback conservé pour la stabilité
  const handleCycleComplete = useCallback(() => {
    playNotification();
    setIsRunning(false);
    onTimerComplete?.(mode);
    
    if (mode === 'work') {
      setMode('shortBreak');
      setTimeLeft(modes.shortBreak.duration);
    } else {
      setMode('work');
      setTimeLeft(modes.work.duration);
    }
  }, [mode, onTimerComplete]);

  // Gestion du timer : Logique corrigée pour éviter le setState dans l'effet
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // On gère la fin ici pour éviter le déclenchement par l'effet
            clearInterval(intervalRef.current);
            handleCycleComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, handleCycleComplete]); // timeLeft n'est plus une dépendance, évitant les re-calculs inutiles

  const toggleTimer = () => setIsRunning(prev => !prev);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(modes[mode].duration);
  };

  const skipToNext = () => {
    setIsRunning(false);
    if (mode === 'work') {
      setMode('shortBreak');
      setTimeLeft(modes.shortBreak.duration);
    } else {
      setMode('work');
      setTimeLeft(modes.work.duration);
    }
  };

  const switchMode = (newMode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(modes[newMode].duration);
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-cyan-500/5 rounded-full blur-3xl" />

      <div className="relative">
        <CircularProgress progress={progress} color={modes[mode].color} />

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <span className="text-sm font-medium uppercase tracking-wider text-slate-400">
            {activeTask ? activeTask.title : modes[mode].label}
          </span>
          <div className="text-5xl font-mono font-bold text-white mt-2 tabular-nums">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>

          <div className="flex gap-2 mt-4 justify-center">
            <button
              onClick={toggleTimer}
              className="p-3 bg-slate-800/80 backdrop-blur-sm rounded-full text-cyan-400 hover:bg-slate-700 transition"
            >
              {isRunning ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button
              onClick={resetTimer}
              className="p-3 bg-slate-800/80 backdrop-blur-sm rounded-full text-slate-300 hover:bg-slate-700 transition"
            >
              <RotateCcw size={20} />
            </button>
            <button
              onClick={skipToNext}
              className="p-3 bg-slate-800/80 backdrop-blur-sm rounded-full text-slate-300 hover:bg-slate-700 transition"
            >
              <SkipForward size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-1 mt-6 bg-slate-800/40 backdrop-blur-sm p-1 rounded-2xl">
        {Object.entries(modes).map(([key, { label }]) => (
          <button
            key={key}
            onClick={() => switchMode(key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              mode === key
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Timer;
