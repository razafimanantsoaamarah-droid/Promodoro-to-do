import { motion as Motion } from 'framer-motion';
import { variants } from './constant/variant';


export const Button = ({ children, icon, variant = "primary", onClick, type = "button", className = "", disabled }) => (
  <Motion.button
    type={type}
    onClick={onClick}
    disabled={disabled}
    whileHover={!disabled ? { scale: 1.02 } : {}}
    whileTap={!disabled ? { scale: 0.98 } : {}}
    className={`inline-flex items-center justify-center transition-all duration-200 rounded-xl font-semibold ${variants[variant]} ${className}`}
  >
    {icon && <span className={children ? "mr-2" : ""}>{icon}</span>}
    {children}
  </Motion.button>
);
