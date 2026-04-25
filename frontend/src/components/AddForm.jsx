import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { Plus, ListPlus, Check, X, Clock, AlertCircle } from 'lucide-react';
import { Button } from './ui/Button';

const AddForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [repetition, setRepetition] = useState(1);
  const [stepInput, setStepInput] = useState('');
  const [steps, setSteps] = useState([]);
  const [showStepInput, setShowStepInput] = useState(false);

  const addStep = () => {
    if (stepInput.trim()) {
      setSteps([...steps, stepInput.trim()]);
      setStepInput('');
    }
  };

  const removeStep = (index) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      priority,
      repetition: parseInt(repetition, 10),
      steps,
      completed: false,
      createdAt: new Date().toISOString()
    });
    setTitle('');
    setDescription('');
    setPriority('Medium');
    setRepetition(1);
    setSteps([]);
    setShowStepInput(false);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="max-w-xl mx-auto bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 space-y-6 shadow-2xl"
    >
      <div className="space-y-2">
        <input
          type="text"
          placeholder="Tache name..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-transparent text-3xl font-bold text-white placeholder:text-slate-600 outline-none border-b border-white/5 pb-2 focus:border-cyan-500 transition-colors"
          required
        />
        <textarea
          placeholder="Description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="2"
          className="w-full bg-white/5 text-slate-300 placeholder:text-slate-600 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-cyan-500/30 resize-none transition-all"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <AlertCircle size={14} /> Priority
          </label>
          <div className="flex gap-2">
            {['Low', 'Medium', 'High'].map((p) => (
              <Button
                key={p}
                variant={priority === p ? "primary" : "glass"}
                onClick={() => setPriority(p)}
                className="flex-1 text-xs py-2"
              >
                {p}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <Clock size={14} /> Répétitions
          </label>
          <input
            type="number"
            value={repetition}
            onChange={(e) => setRepetition(e.target.value)}
            className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-2 px-4 outline-none focus:border-cyan-500 transition-all text-center font-mono"
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-400 flex items-center gap-2">
            <ListPlus size={16} /> Sous-étapes ({steps.length})
          </span>
          <Button 
            variant="ghost" 
            className="text-xs py-1" 
            onClick={() => setShowStepInput(!showStepInput)}
            icon={showStepInput ? <X size={14}/> : <Plus size={14}/>}
          >
            {showStepInput ? "Fermer" : "Ajouter"}
          </Button>
        </div>

        <div className="space-y-2">
          <AnimatePresence>
            {steps.map((step, idx) => (
              <Motion.div 
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex items-center gap-3 bg-white/5 border border-white/5 rounded-xl p-3 group"
              >
                <div className="h-2 w-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                <span className="text-sm text-slate-300 flex-1">{step}</span>
                <Button 
                  variant="danger" 
                  className="p-1.5 opacity-0 group-hover:opacity-100 transition-opacity" 
                  onClick={() => removeStep(idx)} 
                  icon={<X size={14}/>} 
                />
              </Motion.div>
            ))}
          </AnimatePresence>
        </div>

        {showStepInput && (
          <Motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-2"
          >
            <input
              type="text"
              placeholder="Faire les recherches..."
              value={stepInput}
              onChange={(e) => setStepInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addStep())}
              className="flex-1 bg-cyan-500/5 border border-cyan-500/20 text-white rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-cyan-500/40"
              autoFocus
            />
            <Button variant="primary" className="px-3" onClick={addStep} icon={<Plus size={18}/>} />
          </Motion.div>
        )}
      </div>

      <div className="pt-4">
        <Button 
          type="submit" 
          variant="primary" 
          className="w-full py-4 text-lg uppercase tracking-[0.2em] font-black"
        >
          Lancer la mission
        </Button>
      </div>
    </form>
  );
};

export default AddForm;
