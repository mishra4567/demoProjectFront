import { Link } from "react-router-dom";
import { useTheme } from "../index";

const SunIcon = () => (
  <svg
    viewBox="0 0 20 20"
    fill="currentColor"
    width="14"
    height="14"
    aria-hidden="true"
  >
    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 1.78a1 1 0 011.42 1.42l-.7.7a1 1 0 11-1.42-1.42l.7-.7zM18 9a1 1 0 110 2h-1a1 1 0 110-2h1zm-2.78 6.22a1 1 0 00-1.42-1.42l-.7.7a1 1 0 001.42 1.42l.7-.7zM11 17a1 1 0 11-2 0v-1a1 1 0 112 0v1zm-6.22-1.78a1 1 0 001.42-1.42l-.7-.7a1 1 0 00-1.42 1.42l.7.7zM3 11a1 1 0 110-2H2a1 1 0 110 2h1zm1.78-7.22a1 1 0 00-1.42 1.42l.7.7a1 1 0 001.42-1.42l-.7-.7zM10 6a4 4 0 100 8 4 4 0 000-8z" />
  </svg>
);

const MoonIcon = () => (
  <svg
    viewBox="0 0 20 20"
    fill="currentColor"
    width="14"
    height="14"
    aria-hidden="true"
  >
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
  </svg>
);

const SystemIcon = () => (
  <svg
    viewBox="0 0 20 20"
    fill="currentColor"
    width="14"
    height="14"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
      clipRule="evenodd"
    />
  </svg>
);
const themes = [
  { value: "light", label: "Light", Icon: SunIcon },
  { value: "dark", label: "Dark", Icon: MoonIcon },
  { value: "system", label: "System", Icon: SystemIcon },
];
export default function Header() {
  const { theme, setTheme } = useTheme();
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          Ecommerce
        </Link>

        <nav className="flex items-center gap-4">
          <Link to="/">Home</Link>
        </nav>
        <nav className="flex items-center">
          <Link to="/login" className="text-fuchsia-400">
            Login
          </Link>
          <Link to="/signup" className="text-red-400">
            /Register
          </Link>
        </nav>
        <div
          role="radiogroup"
          aria-label="Theme"
          className="flex items-center gap-0.5 p-1 rounded-xl bg-surface-raised border border-border"
        >
          {themes.map(({ value, label, Icon }) => {
            const isActive = theme === value;
            return (
              <button
                key={value}
                role="radio"
                aria-checked={isActive}
                title={`${label} mode`}
                onClick={() => setTheme(value)}
                className={[
                  "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium",
                  "transition-all duration-200 cursor-pointer border-none",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                  isActive
                    ? "bg-accent text-accent-fg shadow-sm"
                    : "text-text-muted hover:text-text hover:bg-surface",
                ].join(" ")}
              >
                <Icon />
                {/* <span className="hidden sm:inline">{label}</span> */}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
