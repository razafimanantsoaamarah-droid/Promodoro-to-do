// components/AddForm.jsx
import React, { useState } from 'react';
import { Plus, ListPlus, Check, X } from 'lucide-react';

const AddForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [estimatedTime, setEstimatedTime] = useState(25);
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
      estimatedTime: parseInt(estimatedTime, 10),
      steps,
      completed: false,
      createdAt: new Date().toISOString()
    });

    // Reset form
    setTitle('');
    setDescription('');
    setPriority('Medium');
    setEstimatedTime(25);
    setSteps([]);
    setShowStepInput(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 space-y-5">
      <div>
        <input
          type="text"
          placeholder="Titre de la mission"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-transparent text-2xl font-bold text-white placeholder:text-slate-500 outline-none border-b border-slate-700 pb-2 focus:border-cyan-500 transition"
          required
        />
      </div>

      <div>
        <textarea
          placeholder="Description (optionnelle)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="2"
          className="w-full bg-slate-900/50 text-slate-300 placeholder:text-slate-600 rounded-xl p-3 outline-none focus:ring-2 focus:ring-cyan-500/50 resize-none"
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-xs font-medium text-slate-400 mb-1">Priorité</label>
          <div className="flex gap-2">
            {['Low', 'Medium', 'High'].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPriority(p)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
                  priority === p
                    ? p === 'Low' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                    : p === 'Medium' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50'
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/50'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="w-32">
          <label className="block text-xs font-medium text-slate-400 mb-1">Temps estimé (min)</label>
          <input
            type="number"
            min="1"
            max="180"
            value={estimatedTime}
            onChange={(e) => setEstimatedTime(e.target.value)}
            className="w-full bg-slate-900/50 text-white rounded-xl p-2 outline-none focus:ring-2 focus:ring-cyan-500/50 text-center"
          />
        </div>
      </div>

      {/* Gestion des étapes */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-400">Étapes</span>
          <button
            type="button"
            onClick={() => setShowStepInput(!showStepInput)}
            className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            <ListPlus size={14} /> Ajouter
          </button>
        </div>

        {steps.length > 0 && (
          <div className="space-y-2 mb-3">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-slate-900/30 rounded-lg p-2">
                <Check size={14} className="text-cyan-400" />
                <span className="text-sm text-slate-300 flex-1">{step}</span>
                <button type="button" onClick={() => removeStep(idx)} className="text-slate-500 hover:text-rose-400">
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        {showStepInput && (
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Nouvelle étape"
              value={stepInput}
              onChange={(e) => setStepInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addStep())}
              className="flex-1 bg-slate-900/50 text-white rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-cyan-500/50"
              autoFocus
            />
            <button
              type="button"
              onClick={addStep}
              className="bg-cyan-600 hover:bg-cyan-700 text-white p-2 rounded-xl transition"
            >
              <Plus size={18} />
            </button>
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-indigo-500/25"
      >
        Créer la tâche
      </button>
    </form>
  );
};

export default AddForm;