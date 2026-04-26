import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { useLocalStorage } from './hooks/useLocalStorage';
import Timer from './components/Timer';
import TaskCard from './components/TaskCard';
import AddForm from './components/AddForm';
import EditDrawer from './components/EditDrawer';
import bgWorld from './assets/bg_world.png';

function App() {
  const [tasks, setTasks] = useLocalStorage('zenith-focus-tasks', []);
  const [activeTask, setActiveTask] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Demande de permission pour les notifications
  useEffect(() => {
    if ('Notification' in window && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  }, []);

  const addTask = (newTask) => {
    setTasks(prev => [newTask, ...prev]);
  };

  const updateTask = (updatedTask) => {
    setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
    if (activeTask?.id === updatedTask.id) setActiveTask(updatedTask);
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    if (activeTask?.id === id) setActiveTask(null);
  };

  const toggleComplete = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const toggleStep = (taskId, stepIndex) => {
    setTasks(prev => prev.map(task => {
      if (task.id !== taskId) return task;
      const newSteps = task.steps.map((step, idx) =>
        idx === stepIndex ? { ...step, completed: !step.completed } : step
      );
      return { ...task, steps: newSteps };
    }));
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsDrawerOpen(true);
  };

  const handleSaveEdit = (updatedTask) => {
    updateTask(updatedTask);
  };

  const handleStartFocus = (task) => {
    setActiveTask(task);
  };

  const handleTimerComplete = (mode) => {
    const labels = { work: 'Focus', shortBreak: 'Pause courte', longBreak: 'Pause longue' };
    const label = labels[mode] || 'Minuteur';

    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('RMY FOCUS', { body: `Cycle "${label}" terminé !` });
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-20 blur-sm"
        style={{ backgroundImage: `url(${bgWorld})` }} />
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-transparent to-cyan-900/30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              RMY FOCUS
            </h1>
            <p className="text-slate-400 text-sm font-medium tracking-wider">Maîtrisez votre temps, accomplissez l'essentiel</p>
          </div>
          {activeTask && (
            <div className="bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-700/50">
              <span className="text-sm text-slate-300">Focus actuel : </span>
              <span className="font-medium text-cyan-400">{activeTask.title}</span>
            </div>
          )}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="sticky top-8">
              <Timer activeTask={activeTask} onTimerComplete={handleTimerComplete} />
              <div className="mt-8">
                <AddForm onAddTask={addTask} />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Vos missions</h2>
              <span className="text-sm text-slate-400">{tasks.length} tâche(s)</span>
            </div>

            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {tasks.length === 0 ? (
                  <Motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-12 text-center">
                    <p className="text-slate-400">Aucune tâche pour le moment.</p>
                    <p className="text-sm text-slate-500 mt-2">Créez-en une avec le formulaire ci-contre.</p>
                  </Motion.div>
                ) : (
                  tasks.map(task => (
                    <TaskCard key={task.id} task={task} onToggleComplete={toggleComplete}
                      onDelete={deleteTask} onEdit={handleEdit} onStartFocus={handleStartFocus}
                      onToggleStep={toggleStep} />
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <EditDrawer key={editingTask?.id || 'new'} isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}
        task={editingTask} onSave={handleSaveEdit} />
    </div>
  );
}

export default App;