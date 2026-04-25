import React from 'react';
import { inputVariants } from './constant/variant';

const Input = ({ 
  label, 
  icon: Icon,
  value, 
  onChange, 
  placeholder, 
  error = false, 
  type = "text", 
  className = "", 
  ...props 
}) => {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
          {Icon && <Icon size={14} className="text-slate-500" />}
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full px-4 py-2.5 rounded-xl outline-none border transition-all duration-300
          ${inputVariants[error ? 'error' : 'default']}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-[10px] uppercase tracking-widest font-bold text-rose-500 ml-2">
          Champ requis ou invalide
        </p>
      )}
    </div>
  );
};

export default Input;
