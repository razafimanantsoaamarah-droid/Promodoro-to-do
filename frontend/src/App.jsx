import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import Timer from './components/Timer';
import TaskCard from './components/TaskCard';
import AddForm from './components/AddForm';
import EditDrawer from './components/EditDrawer';
import bgWorld from './assets/bg_world.png';

const BACKGROUND_IMAGE = bgWorld;
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/tasks';

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

	const handleToggleStep = async (taskId, stepIndex) => {
		const task = tasks.find(t => t.id === taskId);
		if (!task) return;

		const updatedSteps = task.steps.map((step, idx) => {
			if (idx === stepIndex) {
				if (typeof step === 'string') {
					return { text: step, completed: true };
				}
				return { ...step, completed: !step.completed };
			}
			if (typeof step === 'string') {
				return { text: step, completed: false };
			}
			return step;
		});

		const updatedTask = { ...task, steps: updatedSteps };
		await updateTask(updatedTask);
	};

	const handleEdit = (task) => {
		setEditingTask(task);
		setIsDrawerOpen(true);
	};

	const handleStartFocus = (task) => setActiveTask(task);

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
				<Motion.div
					animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
					transition={{ repeat: Infinity, duration: 2 }}
					className="text-cyan-400 font-black text-2xl tracking-tighter"
				>
					CHARGEMENT DES MISSIONS...
				</Motion.div>
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
			<div className="absolute inset-0 opacity-20 blur-sm pointer-events-none"
				style={{ backgroundImage: `url(${BACKGROUND_IMAGE})`, backgroundSize: 'cover' }} />

			<div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
				<header className="mb-12 flex items-center justify-between">
					<div>
						<h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent tracking-tighter">
							RMY FOCUS
						</h1>
						<p className="text-slate-500 text-xs font-bold uppercase tracking-[0.4em] mt-2">
							L'excellence par la répétition
						</p>
					</div>
					{activeTask && (
						<Motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
							className="bg-white/5 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 shadow-xl">
							<span className="text-xs text-slate-400 font-bold uppercase mr-2">Focus :</span>
							<span className="font-bold text-cyan-400">{activeTask.title}</span>
						</Motion.div>
					)}
				</header>

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
					{/* Sidebar: Timer & Form */}
					<aside className="lg:col-span-4 space-y-8 sticky top-12">
						<Timer activeTask={activeTask} onTimerComplete={handleTimerComplete} />
						<AddForm onAddTask={addTask} />
					</aside>

					{/* Main: Task List */}
					<main className="lg:col-span-8">
						<div className="flex items-center justify-between mb-8 px-2">
							<h2 className="text-2xl font-black text-white uppercase tracking-wider">Vos missions</h2>
							<div className="px-4 py-1 bg-white/5 rounded-full text-xs font-bold text-slate-400 border border-white/5">
								{tasks.length} TÂCHES
							</div>
						</div>

						<div className="space-y-4">
							<AnimatePresence mode="popLayout">
								{tasks.map(task => (
									<TaskCard
										key={task.id}
										task={task}
										onToggleComplete={toggleComplete}
										onDelete={deleteTask}
										onEdit={handleEdit}
										onStartFocus={handleStartFocus}
										onToggleStep={handleToggleStep}
									/>
								))}
							</AnimatePresence>
						</div>
					</main>
				</div>
			</div>

			<EditDrawer
				isOpen={isDrawerOpen}
				onClose={() => setIsDrawerOpen(false)}
				task={editingTask}
				onSave={updateTask}
				key={editingTask?.id || 'new'}
			/>
		</div>
	);
}

export default App;