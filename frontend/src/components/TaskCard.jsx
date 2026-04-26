import React from 'react';
import { Trash2, Edit3, Play, CheckCircle2, Clock, Check } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import { Button } from './ui/Button';

const priorityStyles = {
  Low: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  Medium: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  High: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
};

const TaskCard = ({ task, onToggleComplete, onDelete, onEdit, onStartFocus, onToggleStep }) => {
  const isCompleted = task.completed;
  const currentStyle = priorityStyles[task.priority] || priorityStyles.Medium;

  return (
    <Motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
      className={`relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-6 shadow-xl transition-all ${isCompleted ? 'opacity-50' : 'hover:bg-white/10'}`}>
      
      <div className="absolute -top-2 -right-2">
        <span className={`text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-lg border ${currentStyle}`}>
          {task.priority || 'Medium'}
        </span>
      </div>

      <div className="flex items-start gap-4">
        <button onClick={() => onToggleComplete(task.id)} className={`mt-1 transition-all ${isCompleted ? 'text-emerald-400' : 'text-slate-600 hover:text-emerald-500'}`}>
          <CheckCircle2 size={26} strokeWidth={isCompleted ? 3 : 2} />
        </button>
        
        <div className="flex-1 min-w-0">
          <h3 className={`text-xl font-bold truncate ${isCompleted ? 'line-through text-slate-500' : 'text-white'}`}>{task.title}</h3>
          {task.description && <p className="text-slate-400 text-sm mt-1 line-clamp-2">{task.description}</p>}

          {task.steps?.length > 0 && (
            <ul className="mt-4 space-y-2 border-l-2 border-white/5 pl-4">
              {task.steps.map((step, idx) => {
                // Normaliser le step (string ou objet)
                const stepText = typeof step === 'string' ? step : step.text;
                const stepCompleted = typeof step === 'string' ? false : step.completed;
                return (
                  <li key={idx} className="flex items-center gap-3 group/step">
                    <button onClick={() => onToggleStep(task.id, idx)}
                      className={`w-4 h-4 rounded border transition-all flex items-center justify-center 
                      ${stepCompleted ? 'bg-indigo-500 border-indigo-500' : 'border-white/20 group-hover/step:border-indigo-500'}`}>
                      {stepCompleted && <Check size={10} className="text-white" strokeWidth={4} />}
                    </button>
                    <span className={`text-xs ${stepCompleted ? 'text-slate-500 line-through' : 'text-slate-300'}`}>{stepText}</span>
                  </li>
                );
              })}
            </ul>
          )}

          <footer className="flex items-center gap-4 mt-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <div className="flex items-center gap-1.5"><Clock size={12} className="text-cyan-500" /><span>{task.estimatedTime || 25} MIN</span></div>
          </footer>
        </div>

        <div className="flex flex-col gap-2">
          {!isCompleted && <Button variant="primary" className="p-2.5 rounded-xl" onClick={() => onStartFocus(task)} icon={<Play size={18} fill="currentColor" />} />}
          <Button variant="glass" className="p-2.5 rounded-xl" onClick={() => onEdit(task)} icon={<Edit3 size={18} />} />
          <Button variant="danger" className="p-2.5 rounded-xl bg-transparent" onClick={() => onDelete(task.id)} icon={<Trash2 size={18} />} />
        </div>
      </div>
    </Motion.div>
  );
};

export default TaskCard;
