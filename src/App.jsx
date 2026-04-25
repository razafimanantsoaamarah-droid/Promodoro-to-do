import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import Timer from './components/Timer';
import TaskCard from './components/TaskCard';
import AddForm from './components/AddForm';
import EditDrawer from './components/EditDrawer';

const BACKGROUND_IMAGE = './src/assets/bg_world.png';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`Erreur serveur : ${response.status}`);
        const data = await response.json();
        setTasks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

    useEffect(() => {
    if ('Notification' in window && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  }, []);
  const addTask = async (newTask) => {
    const { id: _id, ...taskWithoutId } = newTask;
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskWithoutId),
      });
      if (!response.ok) throw new Error('Échec de la création');
      const savedTask = await response.json();
      setTasks(prev => [savedTask, ...prev]);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateTask = async (updatedTask) => {
    try {
      const response = await fetch(`${API_URL}/${updatedTask.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
      });
      if (!response.ok) throw new Error('Échec de la mise à jour');
      const savedTask = await response.json();
      setTasks(prev => prev.map(t => (t.id === savedTask.id ? savedTask : t)));
      if (activeTask?.id === savedTask.id) {
        setActiveTask(savedTask);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Échec de la suppression');
      setTasks(prev => prev.filter(t => t.id !== id));
      if (activeTask?.id === id) setActiveTask(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleComplete = async (id) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    const updated = { ...task, completed: !task.completed };
    await updateTask(updated);
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
      new Notification('RMY FOCUS', {
        body: `Cycle "${label}" terminé !`,
      });
    }

    console.log(`Cycle ${mode} terminé`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <p className="text-white text-xl">Chargement de vos missions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center gap-4">
        <p className="text-red-400 text-xl">Erreur : {error}</p>
        <button
          onClick={() => {
            setError(null);
            setLoading(true);
            const refetch = async () => {
              try {
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error(`Erreur serveur : ${response.status}`);
                const data = await response.json();
                setTasks(data);
              } catch (err) {
                setError(err.message);
              } finally {
                setLoading(false);
              }
            };
            refetch();
          }}
          className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 transition"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans relative overflow-hidden">
      {/* Fond décoratif */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 blur-sm"
        style={{ backgroundImage: `url(${BACKGROUND_IMAGE})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-transparent to-cyan-900/30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* En-tête */}
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              RMY FOCUS
            </h1>
            <p className="text-slate-400 text-sm font-medium tracking-wider">
              Maîtrisez votre temps, accomplissez l'essentiel
            </p>
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
                  <Motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-12 text-center"
                  >
                    <p className="text-slate-400">Aucune tâche pour le moment.</p>
                    <p className="text-sm text-slate-500 mt-2">
                      Créez-en une avec le formulaire ci-contre.
                    </p>
                  </Motion.div>
                ) : (
                  tasks.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onToggleComplete={toggleComplete}
                      onDelete={deleteTask}
                      onEdit={handleEdit}
                      onStartFocus={handleStartFocus}
                    />
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <EditDrawer
        key={editingTask?.id || 'new'}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        task={editingTask}
        onSave={handleSaveEdit}
      />
    </div>
  );
}

export default App;
