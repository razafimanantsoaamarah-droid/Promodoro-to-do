import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { Plus, ListPlus, X, AlertCircle, Repeat } from 'lucide-react';
import { Button } from './ui/Button';
import Input from './ui/Input';
import Textarea from './ui/Textarea';

const AddForm = ({ onAddTask }) => {
	const initialState = { title: '', description: '', priority: 'Medium', repetition: 1, steps: [] };
	const [form, setForm] = useState(initialState);
	const [stepInput, setStepInput] = useState('');
	const [showStepInput, setShowStepInput] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm(prev => ({ ...prev, [name]: value }));
	};

	const handleStep = (action, val) => {
		if (action === 'add' && stepInput.trim()) {
			setForm(prev => ({ ...prev, steps: [...prev.steps, stepInput.trim()] }));
			setStepInput('');
		} else if (action === 'remove') {
			setForm(prev => ({ ...prev, steps: prev.steps.filter((_, i) => i !== val) }));
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!form.title.trim()) return;
		onAddTask({ ...form, id: Date.now(), completed: false, createdAt: new Date().toISOString() });
		setForm(initialState);
		setShowStepInput(false);
	};

	return (
		<section aria-labelledby="form-title" className="max-w-xl mx-auto">
			<form onSubmit={handleSubmit} className="bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 space-y-6 shadow-2xl">
				<header className="space-y-2">
					<h2 id="form-title" className="sr-only">Ajouter une nouvelle mission</h2>
					<Input name="title" label="Nom de la tâche" icon={Plus} value={form.title} onChange={handleChange} className="text-2xl font-bold text-white pb-2" required />
					<Textarea name="description" label="Description" value={form.description} onChange={handleChange} rows="2" placeholder="Décrivez votre tâche..." />
				</header>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<fieldset className="space-y-3">
						<legend className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
							<AlertCircle size={14} /> Priorité
						</legend>
						<div className="flex gap-2">
							{['Low', 'Medium', 'High'].map((p) => (
								<Button key={p} variant={form.priority === p ? "primary" : "glass"} onClick={() => setForm(prev => ({ ...prev, priority: p }))} className="flex-1 text-xs py-2">{p}</Button>
							))}
						</div>
					</fieldset>

					<Input name="repetition" label="Répétitions" icon={Repeat} type="number" value={form.repetition} onChange={handleChange} />
				</div>

				<section className="space-y-3">
					<div className="flex items-center justify-between">
						<h3 className="text-sm font-semibold text-slate-400 flex items-center gap-2"><ListPlus size={16} /> Étapes ({form.steps.length})</h3>
						<Button variant="ghost" className="text-xs" onClick={() => setShowStepInput(!showStepInput)} icon={showStepInput ? <X size={14} /> : <Plus size={14} />}>
							{showStepInput ? "Fermer" : "Ajouter"}
						</Button>
					</div>

					<div className="space-y-2">
						<AnimatePresence>
							{form.steps.map((step, idx) => (
								<Motion.div key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="flex items-center gap-3 bg-white/5 border border-white/5 rounded-xl p-3 group">
									<div className="h-2 w-2 rounded-full bg-cyan-500 shadow-[0_0_8px_cyan]" />
									<span className="text-sm text-slate-300 flex-1">{step}</span>
									<Button variant="danger" className="p-1.5 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleStep('remove', idx)} icon={<X size={14} />} />
								</Motion.div>
							))}
						</AnimatePresence>
					</div>

					{showStepInput && (
						<div className="flex gap-2">
							<Input placeholder="Ajouter une étape..." value={stepInput} onChange={(e) => setStepInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleStep('add'))} className="flex-1" autoFocus />
							<Button variant="primary" onClick={() => handleStep('add')} icon={<Plus size={18} />} />
						</div>
					)}
				</section>

				<Button type="submit" variant="primary" className="w-full py-4 text-lg uppercase tracking-widest font-black">Lancer la mission</Button>
			</form>
		</section>
	);
};

export default AddForm;
