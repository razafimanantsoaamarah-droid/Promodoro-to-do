
export const CircularProgress = ({ progress, color }) => {
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width="280" height="280" viewBox="0 0 280 280" className="transform -rotate-90 drop-shadow-[0_0_10px_rgba(0,0,0,0.3)]">
      <circle cx="140" cy="140" r={radius} fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
      <circle
        cx="140"
        cy="140"
        r={radius}
        fill="transparent"
        stroke={color}
        strokeWidth="8"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-500 ease-linear"
      />
    </svg>
  );
};