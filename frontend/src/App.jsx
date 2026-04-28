import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { useTheme } from "./features/theme/hooks/useTheme";
import { SettingsPanel } from "./features/theme/components/SettingsPanel";
import { useTasks } from "./features/tasks/hooks/useTasks";
import Timer from "./features/timer/components/Timer";
import { TaskList } from "./features/tasks/components/TaskList";
import AddForm from "./features/tasks/components/AddForm";
import EditDrawer from "./features/tasks/components/EditDrawer";
import { useToast } from "./components/shared/ux/alerts/ToastContainer";
import { Modal } from "./components/shared/ui/Modal";
import { Button } from "./components/shared/ui/Button";

function App() {
  const { tasks, addTask, updateTask, deleteTask, toggleComplete, toggleStep } = useTasks();
  const { addToast, ToastContainer } = useToast();
  const { currentImage } = useTheme(); 

  const [activeTask, setActiveTask] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted" && Notification.permission !== "denied") {
      Notification.requestPermission();
    }
  }, []);

  const handleAddTask = (newTask) => {
    addTask(newTask);
    setIsAddModalOpen(false);
    addToast("Tâche créée avec succès !", "success");
  };

  const handleUpdateTask = (formData) => {
    if (!editingTask) return;
    updateTask({ ...editingTask, ...formData });
    addToast("Tâche mise à jour !", "info");
  };

  const handleDeleteTask = (id) => {
    deleteTask(id);
    if (activeTask?.id === id) setActiveTask(null);
    addToast("Tâche supprimée", "warning");
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsDrawerOpen(true);
  };

  const handleStartFocus = (task) => {
    setActiveTask(task);
    addToast(`Focus sur : ${task.title}`, "info");
  };

  const handleTimerComplete = (mode) => {
    const labels = { work: "Focus", shortBreak: "Pause courte", longBreak: "Pause longue" };
    const label = labels[mode] || "Cycle";
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("RMY FOCUS", { body: `Félicitations ! Votre session de ${label} est terminée.` });
    }
    addToast(`${label} terminé avec succès !`, "success");
  };

  return (
    <div className="min-h-screen font-sans relative overflow-hidden" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
      {/* 🔥 currentImage se met à jour instantanément */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 blur-sm transition-all duration-700"
        style={{ backgroundImage: `url(${currentImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 via-transparent to-[var(--accent)]/5" />

      <ToastContainer />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-[var(--accent)] to-indigo-400 bg-clip-text text-transparent">
              RMY FOCUS
            </h1>
            <p className="text-[var(--text-muted)] text-sm font-medium tracking-wider">
              Maîtrisez votre temps, accomplissez l'essentiel
            </p>
          </div>

          <div className="flex items-center gap-3">
            {activeTask && (
              <div className="bg-[var(--card-bg)] backdrop-blur-sm px-4 py-2 rounded-full border border-[var(--border-color)] hidden md:block">
                <span className="text-sm text-[var(--text-muted)]">Focus : </span>
                <span className="font-medium" style={{ color: 'var(--accent)' }}>{activeTask.title}</span>
              </div>
            )}
            <SettingsPanel />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-8">
            <div className="sticky top-8 space-y-8">
              <Timer activeTask={activeTask} onTimerComplete={handleTimerComplete} />

              <Button
                variant="primary"
                className="w-full py-5 text-lg font-black uppercase tracking-widest shadow-lg"
                onClick={() => setIsAddModalOpen(true)}
                icon={<Plus size={24} />}
              >
                Nouvelle tâche
              </Button>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold tracking-tight">Vos missions</h2>
              <div className="bg-[var(--card-bg)] px-3 py-1 rounded-lg border border-[var(--border-color)]">
                <span className="text-xs font-bold text-[var(--text-muted)]">{tasks.length} TÂCHES</span>
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

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Nouvelle mission">
        <AddForm onAddTask={handleAddTask} />
      </Modal>

      <EditDrawer
        key={editingTask?.id || "new"}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        task={editingTask}
        onSave={handleUpdateTask}
      />
    </div>
  );
}

export default App;