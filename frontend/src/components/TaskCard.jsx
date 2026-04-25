import React from 'react';
import { Trash2, Edit3, Play, CheckCircle2, Clock } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import { Button } from './ui/Button';

const priorityStyles = {
  Low: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  Medium: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  High: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
};

const TaskCard = ({ task, onToggleComplete, onDelete, onEdit, onStartFocus }) => {
  const isCompleted = task.completed;
  const currentStyle = priorityStyles[task.priority] || priorityStyles.Medium;

  return (
    <Motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`group relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-6 shadow-xl transition-all duration-300 ${
        isCompleted ? 'opacity-50 grayscale-[0.5]' : 'hover:bg-white/10 hover:border-white/20'
      }`}
    >
      <div className="absolute -top-2 -right-2">
        <span className={`text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-lg border shadow-lg ${currentStyle}`}>
          {task.priority || 'Medium'}
        </span>
      </div>

      <div className="flex items-start gap-4">
        {/* Checkbox Custom */}
        <button
          onClick={() => onToggleComplete(task.id)}
          className={`mt-1 transition-transform active:scale-90 ${isCompleted ? 'text-emerald-400' : 'text-slate-600 hover:text-emerald-500'}`}
        >
          <CheckCircle2 size={26} strokeWidth={isCompleted ? 3 : 2} />
        </button>
        
        <div className="flex-1 min-w-0">
          <header>
            <h3 className={`text-xl font-bold truncate ${isCompleted ? 'line-through text-slate-500' : 'text-white'}`}>
              {task.title}
            </h3>
            {task.description && (
              <p className="text-slate-400 text-sm mt-1 line-clamp-2 leading-relaxed">
                {task.description}
              </p>
            )}
          </header>

          {task.steps?.length > 0 && (
            <ul className="mt-4 space-y-2 border-l-2 border-white/5 pl-4">
              {task.steps.map((step, idx) => (
                <li key={idx} className="text-xs text-slate-400 flex items-center gap-2">
                  <span className="w-1 h-1 bg-indigo-500 rounded-full" />
                  {step}
                </li>
              ))}
            </ul>
          )}
          <footer className="flex items-center gap-4 mt-5 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            <div className="flex items-center gap-1.5">
              <Clock size={12} className="text-cyan-500" />
              <span>{task.estimatedTime || 25} MIN</span>
            </div>
            <div className="h-1 w-1 bg-slate-700 rounded-full" />
            <span>Créé le {new Date(task.createdAt).toLocaleDateString()}</span>
          </footer>
        </div>

        <div className="flex flex-col gap-2">
          {!isCompleted && (
            <Button variant="primary" className="p-2.5 rounded-xl" onClick={() => onStartFocus(task)} icon={<Play size={18} fill="currentColor" />} />
          )}
          <Button variant="glass" className="p-2.5 rounded-xl" onClick={() => onEdit(task)} icon={<Edit3 size={18} />} />
          <Button variant="danger" className="p-2.5 rounded-xl bg-transparent" onClick={() => onDelete(task.id)} icon={<Trash2 size={18} />} />
        </div>
      </div>
    </Motion.div>
  );
};

export default TaskCard;
