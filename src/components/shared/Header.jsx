// src/views/components/shared/Header.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "../index";
import { MoonIcon, SunIcon, SystemIcon } from "../icons/Index";
import { useAuth } from "../../context/AuthContext";
import AuthController from "../../controllers/AuthController";

const themes = [
  { value: "light", label: "Light", Icon: SunIcon },
  { value: "dark", label: "Dark", Icon: MoonIcon },
  { value: "system", label: "System", Icon: SystemIcon },
];

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { customer, isAuth, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const firstName = customer?.name?.split(" ")[0] ?? "";
  const initial = firstName.charAt(0).toUpperCase();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ✅ Fixed: pass authContext object + navigate separately
  const handleLogout = () => {
    setDropdownOpen(false);
    AuthController.logout({ logout }, navigate);
  };

  return (
    <header className="border-b border-border bg-surface">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="text-2xl font-bold text-text">
          Ecommerce
        </Link>

        {/* Main nav */}
        <nav className="flex items-center gap-4">
          <Link
            to="/"
            className="text-text-muted hover:text-text transition-colors"
          >
            Home
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Auth section */}
          {isAuth ? (
            // ── Profile dropdown ──────────────────────────────────────
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className="flex items-center gap-2 px-2 py-1 rounded-lg
                  hover:bg-surface-raised transition-all duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
              >
                {/* Avatar */}
                <span
                  className="w-8 h-8 rounded-full bg-accent text-accent-fg
                  flex items-center justify-center text-sm font-bold shrink-0"
                >
                  {initial}
                </span>

                {/* Name + chevron */}
                <span className="text-sm font-medium text-text hidden sm:block">
                  {firstName}
                </span>
                <svg
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className={`w-3.5 h-3.5 text-text-muted transition-transform duration-200
                    ${dropdownOpen ? "rotate-180" : ""}`}
                >
                  <path d="M5.22 6.22a.75.75 0 011.06 0L8 7.94l1.72-1.72a.75.75 0 111.06 1.06l-2.25 2.25a.75.75 0 01-1.06 0L5.22 7.28a.75.75 0 010-1.06z" />
                </svg>
              </button>

              {/* Dropdown panel */}
              {dropdownOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-56
                  bg-surface border border-border rounded-xl shadow-lg
                  py-1.5 z-50"
                >
                  {/* Customer info */}
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-sm font-semibold text-text truncate">
                      {customer?.name}
                    </p>
                    <p className="text-xs text-text-muted truncate mt-0.5">
                      {customer?.email}
                    </p>
                  </div>

                  {/* Menu items */}
                  <div className="py-1">
                    <DropdownLink
                      to="/profile"
                      onClick={() => setDropdownOpen(false)}
                      icon={
                        <svg
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-4 h-4"
                        >
                          <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                        </svg>
                      }
                    >
                      My Profile
                    </DropdownLink>

                    <DropdownLink
                      to="/orders"
                      onClick={() => setDropdownOpen(false)}
                      icon={
                        <svg
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 5v1H4.667a1.75 1.75 0 00-1.743 1.598l-.826 9.5A1.75 1.75 0 003.84 19H16.16a1.75 1.75 0 001.742-1.902l-.826-9.5A1.75 1.75 0 0015.333 6H14V5a4 4 0 00-8 0zm4-2.5A2.5 2.5 0 007.5 5v1h5V5A2.5 2.5 0 0010 2.5zM7.5 10a2.5 2.5 0 005 0V8.75a.75.75 0 011.5 0V10a4 4 0 01-8 0V8.75a.75.75 0 011.5 0V10z"
                            clipRule="evenodd"
                          />
                        </svg>
                      }
                    >
                      My Orders
                    </DropdownLink>

                    <DropdownLink
                      to="/cart"
                      onClick={() => setDropdownOpen(false)}
                      icon={
                        <svg
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-4 h-4"
                        >
                          <path d="M1 1.75A.75.75 0 011.75 1h1.628a1.75 1.75 0 011.734 1.51L5.18 3a65.25 65.25 0 0113.36 1.412.75.75 0 01.58.875 48.645 48.645 0 01-1.618 6.2.75.75 0 01-.712.513H6a2.503 2.503 0 00-2.292 1.5H17.25a.75.75 0 010 1.5H2.76a.75.75 0 01-.748-.807 4.002 4.002 0 012.716-3.486L3.626 2.716a.25.25 0 00-.248-.216H1.75A.75.75 0 011 1.75zM6 17.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        </svg>
                      }
                    >
                      Cart
                    </DropdownLink>
                  </div>

                  {/* Logout */}
                  <div className="border-t border-border pt-1 mt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2
                        text-sm font-medium text-danger
                        hover:bg-danger-subtle transition-colors duration-150
                        focus-visible:outline-none"
                    >
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4 shrink-0"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
                          clipRule="evenodd"
                        />
                        <path
                          fillRule="evenodd"
                          d="M19 10a.75.75 0 00-.75-.75H8.704l1.048-1.07a.75.75 0 10-1.004-1.115l-2.5 2.5a.75.75 0 000 1.115l2.5 2.5a.75.75 0 101.004-1.115l-1.048-1.07h9.546A.75.75 0 0019 10z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // ── Guest links ───────────────────────────────────────────
            <nav className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-text-login hover:text-text-login-hover transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-text-register hover:text-text-register-hover transition-colors duration-200"
              >
                /Register
              </Link>
            </nav>
          )}

          {/* Theme switcher */}
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
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}

// ── Reusable dropdown link ────────────────────────────────────────────────────
function DropdownLink({ to, onClick, icon, children }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center gap-2.5 px-4 py-2
        text-sm font-medium text-text
        hover:bg-surface-raised transition-colors duration-150
        focus-visible:outline-none"
    >
      <span className="text-text-muted shrink-0">{icon}</span>
      {children}
    </Link>
  );
}
