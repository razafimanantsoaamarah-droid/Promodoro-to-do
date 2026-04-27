export const Card = ({ children, className = "" }) => (
  <div className={`bg-[var(--card-bg)] backdrop-blur-2xl border border-[var(--border-color)] rounded-[2rem] p-8 shadow-2xl transition-all duration-500 ${className}`}>
    {children}
  </div>
);