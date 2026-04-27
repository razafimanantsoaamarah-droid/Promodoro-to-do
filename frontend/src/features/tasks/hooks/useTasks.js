import { useLocalStorage } from '../../../hooks/useLocalStorage';

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage('zenith-focus-tasks', []);

  const addTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: Date.now(),
      completed: false,
      createdAt: new Date().toISOString(),
      steps: taskData.steps || []
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const updateTask = (updatedTask) =>
    setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));

  const deleteTask = (id) => setTasks(prev => prev.filter(t => t.id !== id));

  const toggleComplete = (id) =>
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));

  const toggleStep = (taskId, stepIndex) =>
    setTasks(prev => prev.map(task => {
      if (task.id !== taskId) return task;
      return {
        ...task,
        steps: task.steps.map((step, idx) =>
          idx === stepIndex ? { ...step, completed: !step.completed } : step
        ),
      };
    }));

  return { tasks, setTasks, addTask, updateTask, deleteTask, toggleComplete, toggleStep };
}
