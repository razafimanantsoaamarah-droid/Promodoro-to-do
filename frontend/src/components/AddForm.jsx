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
      setForm(prev => ({ 
        ...prev, 
        steps: [...prev.steps, { text: stepInput.trim(), completed: false }] 
      }));
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
    <form onSubmit={handleSubmit} className="bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 space-y-6 shadow-2xl">
      <header className="space-y-2">
        <Input name="title" label="Nom de la tâche" icon={Plus} value={form.title} onChange={handleChange} required />
        <Textarea name="description" label="Description" value={form.description} onChange={handleChange} rows="2" />
      </header>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Priorité</label>
          <div className="flex gap-2">
            {['Low', 'Medium', 'High'].map(p => (
              <Button key={p} variant={form.priority === p ? "primary" : "glass"} onClick={() => setForm(prev => ({...prev, priority: p}))} className="flex-1 py-2 text-xs">{p}</Button>
            ))}
          </div>
        </div>
        <Input name="repetition" label="Répétitions" icon={Repeat} type="number" value={form.repetition} onChange={handleChange} />
      </div>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-400 flex items-center gap-2"><ListPlus size={16} /> Étapes ({form.steps.length})</span>
          <Button variant="ghost" className="text-xs" onClick={() => setShowStepInput(!showStepInput)} icon={showStepInput ? <X size={14}/> : <Plus size={14}/>}>
            {showStepInput ? "Fermer" : "Ajouter"}
          </Button>
        </div>

        <div className="space-y-2">
          {form.steps.map((step, idx) => (
            <div key={idx} className="flex items-center gap-3 bg-white/5 border border-white/5 rounded-xl p-3">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              <span className="text-sm text-slate-300 flex-1">{step.text}</span>
              <Button variant="danger" className="p-1" onClick={() => handleStep('remove', idx)} icon={<X size={14}/>} />
            </div>
          ))}
        </div>

        {showStepInput && (
          <div className="flex gap-2">
            <Input placeholder="Ajouter une étape..." value={stepInput} onChange={(e) => setStepInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleStep('add'))} />
            <Button variant="primary" onClick={() => handleStep('add')} icon={<Plus size={18}/>} />
          </div>
        )}
      </section>

      <Button type="submit" variant="primary" className="w-full py-4 font-black uppercase tracking-widest">Lancer la mission</Button>
    </form>
  );
};

export default AddForm;
