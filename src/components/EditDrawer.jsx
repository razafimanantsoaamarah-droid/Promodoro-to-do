import React, { useState } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { X, Plus, Check } from 'lucide-react';

const EditDrawer = ({ isOpen, onClose, task, onSave }) => {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    priority: task?.priority || 'Medium',
    estimatedTime: task?.estimatedTime || 25,
    steps: task?.steps ? [...task.steps] : []
  });

  const [stepInput, setStepInput] = useState('');

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addStep = () => {
    if (stepInput.trim()) {
      setFormData(prev => ({ ...prev, steps: [...prev.steps, stepInput.trim()] }));
      setStepInput('');
    }
  };

  const removeStep = (index) => {
    setFormData(prev => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...task, ...formData });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Drawer */}
          <Motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-slate-900/95 backdrop-blur-xl border-l border-slate-700/50 shadow-2xl z-50 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Modifier la tâche</h2>
                <button
                  onClick={onClose}
                  type="button"
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Titre</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    className="w-full bg-slate-800 text-white rounded-xl p-3 outline-none focus:ring-2 focus:ring-cyan-500/50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    rows="3"
                    className="w-full bg-slate-800 text-white rounded-xl p-3 outline-none focus:ring-2 focus:ring-cyan-500/50 resize-none"
                  />
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-400 mb-1">Priorité</label>
                    <div className="flex gap-2">
                      {['Low', 'Medium', 'High'].map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => handleChange('priority', p)}
                          className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
                            formData.priority === p
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
                    <label className="block text-sm font-medium text-slate-400 mb-1">Temps (min)</label>
                    <input
                      type="number"
                      min="1"
                      max="180"
                      value={formData.estimatedTime}
                      onChange={(e) => handleChange('estimatedTime', parseInt(e.target.value, 10) || 0)}
                      className="w-full bg-slate-800 text-white rounded-xl p-2 outline-none focus:ring-2 focus:ring-cyan-500/50 text-center"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Étapes</label>
                  <div className="space-y-2 mb-3">
                    {formData.steps.map((step, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-slate-800/50 rounded-lg p-2">
                        <Check size={14} className="text-cyan-400" />
                        <span className="text-sm text-slate-300 flex-1">{step}</span>
                        <button type="button" onClick={() => removeStep(idx)} className="text-slate-500 hover:text-rose-400">
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Ajouter une étape..."
                      value={stepInput}
                      onChange={(e) => setStepInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addStep())}
                      className="flex-1 bg-slate-800 text-white rounded-xl p-2 outline-none focus:ring-2 focus:ring-cyan-500/50 text-sm"
                    />
                    <button
                      type="button"
                      onClick={addStep}
                      className="p-2 bg-slate-700 text-white rounded-xl hover:bg-slate-600 transition"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-cyan-900/20"
                  >
                    Enregistrer les modifications
                  </button>
                </div>
              </form>
            </div>
          </Motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EditDrawer;
