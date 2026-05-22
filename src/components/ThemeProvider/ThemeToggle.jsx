// components/ui/ThemeToggle.jsx
import { useTheme } from "./ThemeProvider";

const options = [
  {
    value: "light",
    label: "Light",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 1.78a1 1 0 011.42 1.42l-.7.7a1 1 0 11-1.42-1.42l.7-.7zM18 9a1 1 0 110 2h-1a1 1 0 110-2h1zM4.22 15.78a1 1 0 001.42-1.42l-.7-.7a1 1 0 00-1.42 1.42l.7.7zM3 10a1 1 0 110 2H2a1 1 0 110-2h1zm2.78-7.78a1 1 0 00-1.42 1.42l.7.7a1 1 0 001.42-1.42l-.7-.7zM10 6a4 4 0 100 8 4 4 0 000-8zm7.78 9.22a1 1 0 00-1.42-1.42l-.7.7a1 1 0 001.42 1.42l.7-.7zM11 17a1 1 0 11-2 0v-1a1 1 0 112 0v1z" />
      </svg>
    ),
  },
  {
    value: "dark",
    label: "Dark",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
      </svg>
    ),
  },
  {
    value: "system",
    label: "System",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
      </svg>
    ),
  },
];

/**
 * @typedef {Object} ThemeToggleProps
 * @property {"pills"|"icon"} [variant] - "pills" = labelled group, "icon" = cycle button
 * @property {string} [className]
 */
function ThemeToggle({ variant = "pills", className = "" }) {
  const { theme, setTheme } = useTheme();

  if (variant === "icon") {
    const current = options.find((o) => o.value === theme) ?? options[2];
    const next = options[(options.indexOf(current) + 1) % options.length];
    return (
      <button
        onClick={() => setTheme(next.value)}
        title={`Switch to ${next.label} mode`}
        aria-label={`Switch to ${next.label} mode`}
        className={`inline-flex items-center justify-center w-9 h-9 rounded-lg
          bg-surface border border-border text-text-muted
          hover:bg-surface-raised hover:text-text transition-all duration-200
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent
          ${className}`}
      >
        {current.icon}
      </button>
    );
  }

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className={`inline-flex items-center gap-1 p-1 rounded-xl
        bg-surface-raised border border-border ${className}`}
    >
      {options.map((opt) => {
        const isActive = theme === opt.value;
        return (
          <button
            key={opt.value}
            role="radio"
            aria-checked={isActive}
            onClick={() => setTheme(opt.value)}
            title={`${opt.label} mode`}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
              transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent
              ${isActive
                ? "bg-accent text-white shadow-sm"
                : "text-text-muted hover:text-text hover:bg-surface"
              }`}
          >
            {opt.icon}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export default ThemeToggle;
