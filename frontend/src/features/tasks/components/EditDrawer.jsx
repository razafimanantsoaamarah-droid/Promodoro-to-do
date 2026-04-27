import { useState } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { X, Plus, Check, Edit3, Trash2 } from 'lucide-react';
import { Button } from '../../../components/shared/ui/Button';
import Input from '../../../components/shared/ui/Input';
import Textarea from '../../../components/shared/ui/Textarea';

import { useTheme } from '../../theme/hooks/useTheme'; 

const EditDrawer = ({ isOpen, onClose, task, onSave }) => {
  const { theme } = useTheme(); 
  
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    priority: task?.priority || 'Medium',
    estimatedTime: task?.estimatedTime || 25,
    steps: task?.steps ? [...task.steps] : []
  });
  const [stepInput, setStepInput] = useState('');

  const handleChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleStep = (action, val) => {
    if (action === 'add' && stepInput.trim()) {
      setFormData(prev => ({ 
        ...prev, 
        steps: [...prev.steps, { text: stepInput.trim(), completed: false }] 
      }));
      setStepInput('');
    } else if (action === 'remove') {
      setFormData(prev => ({ ...prev, steps: prev.steps.filter((_, i) => i !== val) }));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40" onClick={onClose} />

          <Motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed top-0 right-0 h-full w-full max-w-md ${theme.background} backdrop-blur-2xl border-l ${theme.border} shadow-2xl z-50 overflow-y-auto transition-colors duration-500`}
          >
            <div className="p-8 space-y-8">
              <header className="flex items-center justify-between">
                <h2 className="text-2xl font-black text-white flex items-center gap-2">
                  <Edit3 className={`text-${theme.accent}-500`} /> Modifier
                </h2>
                <Button variant="glass" onClick={onClose} className="p-2 rounded-full" icon={<X size={20} />} />
              </header>

              <form onSubmit={(e) => { e.preventDefault(); onSave(formData); onClose(); }} className="space-y-6">
                <Input label="Titre" value={formData.title} onChange={(e) => handleChange('title', e.target.value)} required />

                <Textarea label="Description" value={formData.description} onChange={(e) => handleChange('description', e.target.value)} rows="3" />

                <div className="grid grid-cols-2 gap-4">
                  <section className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Priorité</label>
                    <div className="flex gap-1">
                      {['Low', 'Medium', 'High'].map((p) => (
                        <Button key={p} variant={formData.priority === p ? 'primary' : 'glass'}
                          onClick={() => handleChange('priority', p)} className="flex-1 py-2 text-[10px]">{p}</Button>
                      ))}
                    </div>
                  </section>
                  <Input type="number" label="Temps (min)" value={formData.estimatedTime}
                    onChange={(e) => handleChange('estimatedTime', parseInt(e.target.value))} />
                </div>

                <section className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Sous-étapes</label>
                  <div className="space-y-2">
                    {formData.steps.map((step, idx) => {
                      const stepText = typeof step === 'string' ? step : step.text;
                      return (
                        <div key={idx} className={`${theme.cardBg} border ${theme.border} rounded-xl p-3 group flex items-center gap-2 transition-all`}>
                          <Check size={14} className={`text-${theme.accent}-400`} />
                          <span className="text-sm opacity-80 flex-1">{stepText}</span>
                          <button 
                            type="button"
                            className="opacity-0 group-hover:opacity-100 p-1 text-rose-500 hover:bg-rose-500/10 rounded-md transition-all"
                            onClick={() => handleStep('remove', idx)}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex gap-2">
                    <Input placeholder="Nouvelle étape..." value={stepInput} onChange={(e) => setStepInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleStep('add'))} />
                    <Button variant="primary" onClick={() => handleStep('add')} icon={<Plus size={20} />} />
                  </div>
                </section>

                <Button type="submit" variant="primary" className="w-full py-4 text-lg font-black uppercase tracking-widest">
                  Mettre à jour
                </Button>
              </form>
            </div>
          </Motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EditDrawer;
