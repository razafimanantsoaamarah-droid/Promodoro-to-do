import React from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import TaskCard from './TaskCard';
import { useTheme } from '../../theme/hooks/useTheme';

export const TaskList = ({ tasks, onToggleComplete, onDelete, onEdit, onStartFocus, onToggleStep }) => {
  const { theme } = useTheme();

  if (tasks.length === 0) {
    return (
      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`${theme.cardBg} backdrop-blur-sm border ${theme.border} rounded-3xl p-12 text-center transition-all duration-500`}
      >
        <p className="opacity-60">Aucune tâche pour le moment.</p>
        <p className="text-sm opacity-40 mt-2">Créez-en une avec le formulaire.</p>
      </Motion.div>
    );
  }

  return (
    <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
      <AnimatePresence mode="popLayout">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onToggleComplete={onToggleComplete}
            onDelete={onDelete}
            onEdit={onEdit}
            onStartFocus={onStartFocus}
            onToggleStep={onToggleStep}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
