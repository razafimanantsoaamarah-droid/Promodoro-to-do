import React from 'react';
import { textareaVariants } from './constant/variant';

const Textarea = ({ value, onChange, placeholder, error = false, rows = 3, className = "", ...props }) => {
  return (
    <div className="w-full space-y-1">
      <textarea
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full px-4 py-3 rounded-2xl outline-none border transition-all duration-300 resize-none
          ${textareaVariants[error ? 'error' : 'default']}
          ${className}
        `}
        {...props}
      />
    </div>
  );
};

export default Textarea;
