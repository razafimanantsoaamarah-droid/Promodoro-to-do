import React from 'react';
import { inputVariants } from './constant/variant';

const Input = ({ value, onChange, placeholder, error = false, type = "text", className = "", ...props }) => {
  return (
    <div className="w-full space-y-1">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full px-4 py-1 rounded-xl outline-none border transition-all duration-300
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
