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
}) => (
  <div className="w-full space-y-1.5">
    {label && (
      <label className="flex items-center gap-2 text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest ml-1">
        {Icon && <Icon size={14} className="text-[var(--text-muted)]" />}
        {label}
      </label>
    )}
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-4 py-2.5 rounded-xl outline-none border transition-all duration-300
        ${error 
          ? 'bg-rose-500/5 border-rose-500/30 text-rose-200 placeholder:text-rose-300/50 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10' 
          : 'bg-[var(--card-bg)] border-[var(--border-color)] text-[var(--text-color)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent)]/10'
        }
        ${className}`}
      {...props}
    />
    {error && (
      <p className="text-[10px] uppercase tracking-widest font-bold text-rose-500 ml-2">
        Champ requis ou invalide
      </p>
    )}
  </div>
);

export default Input;