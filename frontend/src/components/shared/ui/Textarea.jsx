const Textarea = ({ value, onChange, placeholder, error = false, rows = 3, className = "", ...props }) => (
  <div className="w-full space-y-1">
    <textarea
      rows={rows}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-4 py-3 rounded-2xl outline-none border transition-all duration-300 resize-none
        ${error 
          ? 'bg-rose-500/5 border-rose-500/30 text-rose-200 placeholder:text-rose-300/50 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10' 
          : 'bg-[var(--card-bg)] border-[var(--border-color)] text-[var(--text-color)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent)]/10'
        }
        ${className}`}
      {...props}
    />
  </div>
);

export default Textarea;