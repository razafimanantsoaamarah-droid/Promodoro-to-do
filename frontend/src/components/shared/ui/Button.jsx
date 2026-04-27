import { motion as Motion } from 'framer-motion';

export const Button = ({ 
  children, 
  icon, 
  variant = "primary", 
  onClick, 
  type = "button", 
  className = "", 
  disabled 
}) => {
  const variants = {
    glass: 'bg-[var(--card-bg)] backdrop-blur-lg border border-[var(--border-color)] text-[var(--text-color)] shadow-xl hover:bg-white/10',
    primary: 'bg-[var(--accent)] text-white shadow-md hover:opacity-90 border border-transparent',
    secondary: 'bg-gray-800 text-gray-100 shadow-md hover:bg-gray-900 border border-transparent',
    outline: 'bg-transparent border-2 border-[var(--border-color)] text-[var(--text-color)] hover:bg-white/10',
    ghost: 'bg-transparent text-[var(--text-color)] hover:bg-white/10 border border-transparent',
  };
  return (
    <Motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={`inline-flex items-center justify-center transition-all duration-200 rounded-xl font-semibold ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {icon && <span className={children ? "mr-2" : ""}>{icon}</span>}
      {children}
    </Motion.button>
  );
};
