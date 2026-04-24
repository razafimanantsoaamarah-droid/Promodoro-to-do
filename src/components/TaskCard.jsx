import React from 'react';
import { Trash2, Edit3, Play, CheckCircle2, Clock } from 'lucide-react';
import { motion as Motion } from 'framer-motion'; // Syntaxe correcte ici
const priorityColors = {
  Low: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  Medium: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  High: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
};

const TaskCard = ({ task, onToggleComplete, onDelete, onEdit, onStartFocus }) => {
  const isCompleted = task.completed;

  return (
    <Motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      className={`relative bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 shadow-xl transition-all ${
        isCompleted ? 'opacity-60' : ''
      }`}
    >
      <div className="absolute -top-2 -right-2 z-10">
        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1">
          <button
            onClick={() => onToggleComplete(task.id)}
            className={`mt-1 transition-colors ${
              isCompleted ? 'text-emerald-400' : 'text-slate-500 hover:text-emerald-400'
            }`}
          >
            <CheckCircle2 size={24} />
          </button>
          <div className="flex-1">
            <h3 className={`text-xl font-bold ${isCompleted ? 'line-through text-slate-400' : 'text-white'}`}>
              {task.title}
            </h3>
            {task.description && (
              <p className="text-slate-400 text-sm mt-1">{task.description}</p>
            )}

            {task.steps.length > 0 && (
              <div className="mt-3 space-y-1.5 border-l-2 border-indigo-500/30 pl-4">
                {task.steps.map((step, idx) => (
                  <div key={idx} className="text-sm text-slate-300 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                    {step}
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2 mt-3 text-xs text-slate-400">
              <Clock size={14} />
              <span>Estimé: {task.estimatedTime} min</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onStartFocus(task)}
            className="p-2 text-cyan-400 hover:bg-cyan-500/10 rounded-xl transition"
            title="Démarrer le focus sur cette tâche"
          >
            <Play size={18} />
          </button>
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-xl transition"
          >
            <Edit3 size={18} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </Motion.div>
  );
};

export default TaskCard;