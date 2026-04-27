import { useState, useEffect } from 'react';
import { Plus, Timer as TimerIcon, Hash, Hourglass } from 'lucide-react';
import { useTheme } from './features/theme/hooks/useTheme';
import { ThemeSwitcher } from './features/theme/components/ThemeSwitcher';
import { ThemePicker } from './features/theme/components/ThemePicker';
import { useTasks } from './features/tasks/hooks/useTasks';
import Timer from './features/timer/components/Timer';
import { DigitalClock } from './features/timer/components/DigitalClock';
import { SandTimer } from './features/timer/components/SandTimer';
import { TaskList } from './features/tasks/components/TaskList';
import AddForm from './features/tasks/components/AddForm';
import EditDrawer from './features/tasks/components/EditDrawer';
import { MusicPlayer } from './features/music/components/MusicPlayer';
import { useToast } from './components/shared/ux/alerts/ToastContainer';
import { Modal } from './components/shared/ui/Modal';
import { Button } from './components/shared/ui/Button';

function App() {
  const { theme } = useTheme();
  const { tasks, addTask, updateTask, deleteTask, toggleComplete, toggleStep } = useTasks();
  const { addToast, ToastContainer } = useToast();

  const [activeTask, setActiveTask] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [timerStyle, setTimerStyle] = useState('circular');

  useEffect(() => {
    if ('Notification' in window && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  }, []);

  const handleAddTask = (newTask) => {
    addTask(newTask);
    setIsAddModalOpen(false);
    addToast('Tâche créée avec succès !', 'success');
  };

  const handleUpdateTask = (formData) => {
    if (!editingTask) return;
    updateTask({ ...editingTask, ...formData });
    addToast('Tâche mise à jour !', 'info');
  };

  const handleDeleteTask = (id) => {
    handleDeleteTask(id);
    if (activeTask?.id === id) setActiveTask(null);
    addToast('Tâche supprimée', 'warning');
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsDrawerOpen(true);
  };

  const handleStartFocus = (task) => {
    setActiveTask(task);
    addToast(`Focus sur : ${task.title}`, 'info');
  };

  const handleTimerComplete = (mode) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('RMY FOCUS', { body: `Cycle terminé !` });
    }
    addToast(`Cycle terminé !`, 'success');
  };

  const TimerComponent = timerStyle === 'digital' ? DigitalClock : timerStyle === 'sand' ? SandTimer : Timer;

  return (
    <div className={`min-h-screen ${theme.background} ${theme.textColor || 'text-white'} font-sans relative overflow-hidden transition-colors duration-700`}>
      {/* Background Image Dynamique */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20 blur-sm transition-all duration-1000"
        style={{ backgroundImage: `url(${theme.image})` }} 
      />
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} transition-all duration-1000`} />

      <ToastContainer />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="mb-12 flex items-center justify-between">
          <div>
            <h1 className={`text-4xl font-black bg-gradient-to-r from-${theme.accent}-400 to-indigo-400 bg-clip-text text-transparent`}>
              RMY FOCUS
            </h1>
            <p className="opacity-50 text-sm font-medium tracking-wider">
              Maîtrisez votre temps, accomplissez l'essentiel
            </p>
          </div>

          <div className="flex items-center gap-4">
            {activeTask && (
              <div className={`${theme.cardBg} backdrop-blur-sm px-4 py-2 rounded-full border ${theme.border} hidden md:block`}>
                <span className="text-sm opacity-70">Focus : </span>
                <span className={`font-medium text-${theme.accent}-400`}>{activeTask.title}</span>
              </div>
            )}
            <MusicPlayer />
            <ThemeSwitcher />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Colonne gauche : Contrôles */}
          <div className="lg:col-span-1 space-y-8">
            <div className="sticky top-8 space-y-8">
              
              {/* Sélecteur de style timer avec icônes Lucide */}
              <div className={`${theme.cardBg} p-1 rounded-2xl border ${theme.border} flex gap-1`}>
                {[
                  { id: 'circular', icon: TimerIcon, label: 'Cercle' },
                  { id: 'digital', icon: Hash, label: 'Digital' },
                  { id: 'sand', icon: Hourglass, label: 'Sablier' },
                ].map(s => (
                  <button
                    key={s.id}
                    onClick={() => setTimerStyle(s.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      timerStyle === s.id 
                        ? `bg-white/10 text-white shadow-sm` 
                        : `text-slate-500 hover:text-white`
                    }`}
                  >
                    <s.icon size={14} />
                    <span className="hidden sm:inline">{s.label}</span>
                  </button>
                ))}
              </div>

              <TimerComponent activeTask={activeTask} onTimerComplete={handleTimerComplete} />

              <ThemePicker />

              <Button
                variant="primary"
                className="w-full py-5 text-lg font-black uppercase tracking-widest shadow-lg shadow-black/20"
                onClick={() => setIsAddModalOpen(true)}
                icon={<Plus size={24} />}
              >
                Nouvelle tâche
              </Button>
            </div>
          </div>

          {/* Colonne droite : Liste */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold tracking-tight">Vos missions</h2>
              <div className={`${theme.cardBg} px-3 py-1 rounded-lg border ${theme.border}`}>
                 <span className="text-xs font-bold opacity-70">{tasks.length} TÂCHES</span>
              </div>
            </div>

            <TaskList
              tasks={tasks}
              onToggleComplete={toggleComplete}
              onDelete={handleDeleteTask}
              onEdit={handleEdit}
              onStartFocus={handleStartFocus}
              onToggleStep={toggleStep}
            />
          </div>
        </div>
      </div>

      {/* Overlays */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Nouvelle mission">
        <AddForm onAddTask={handleAddTask} />
      </Modal>

      <EditDrawer
        key={editingTask?.id || 'new'}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        task={editingTask}
        onSave={handleUpdateTask}
      />
    </div>
  );
}

export default App;
