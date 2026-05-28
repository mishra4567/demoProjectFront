// src/views/components/shared/Header.jsx
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { IconBtn, useTheme } from "../index";
import {
  BellIcon,
  CartIcon,
  ChevronDownIcon,
  HeartIcon,
  LogoutIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
  SystemIcon,
  XIcon,
} from "../icons/Index";
import { useAuth } from "../../context/AuthContext";
import AuthController from "../../controllers/AuthController";

const themes = [
  { value: "light", label: "Light", Icon: SunIcon },
  { value: "dark", label: "Dark", Icon: MoonIcon },
  { value: "system", label: "System", Icon: SystemIcon },
];

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "Categories", to: "/categories" },
  { label: "Brands", to: "/brands" },
  { label: "Offers", to: "/offers" },
];
const notificationCount = 3;
const wishlistCount = 4;
const cartCount = 1;

const totalMobileBadges = notificationCount + wishlistCount + cartCount;

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { customer, isAuth, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const firstName = customer?.name?.split(" ")[0] ?? "Account";
  const initial = firstName.charAt(0).toUpperCase();

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    setDropdownOpen(false);
    setMenuOpen(false);
    AuthController.logout({ logout }, navigate);
  };
  const menuIconClass = `w-5 h-5 text-text-subtle transition-transform duration-200 ${menuOpen ? "rotate-90" : ""}`;

  return (
    <>
      <header className="bg-surface border-b border-border sticky top-0 z-40">
        {/* ── Main bar ── */}
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 relative">
            {/* Left — hamburger (mobile) */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              className="w-9 h-9 flex items-center justify-center rounded-lg
              border border-border text-text-muted hover:bg-surface-raised
              transition-colors md:hidden"
            >
              {menuOpen ? (
                <XIcon className={menuIconClass} />
              ) : (
                <MenuIcon className={menuIconClass} />
              )}
            </button>

            {/* Logo — centered on mobile, left on desktop */}
            <Link
              to="/"
              className="absolute left-1/2 -translate-x-1/2
              md:static md:left-auto md:translate-x-0
              font-display text-xl font-semibold text-text
              hover:text-accent transition-colors whitespace-nowrap"
            >
              Eco<span className="text-accent">mmerce</span>
            </Link>

            {/* Right side */}
            <div className="flex items-center gap-1">
              {/* Notifications — desktop only */}
              <div className="hidden sm:block">
                <IconBtn
                  icon={<BellIcon />}
                  label="Alerts"
                  badge={notificationCount}
                />
              </div>

              {/* Divider */}
              <div className="w-px h-8 bg-border mx-1 hidden sm:block" />

              {/* Wishlist — desktop only */}
              <div className="hidden sm:block">
                <IconBtn
                  icon={<HeartIcon />}
                  label="Wishlist"
                  badge={wishlistCount}
                  to="/wishlist"
                />
              </div>

              {/* Cart — desktop only */}
              <div className="hidden sm:block">
                <IconBtn
                  icon={<CartIcon />}
                  label="Cart"
                  badge={cartCount}
                  to="/cart"
                />
              </div>

              {/* Divider */}
              <div className="w-px h-8 bg-border mx-1 hidden sm:block" />

              {/* Profile or Guest */}
              {isAuth ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen((v) => !v)}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg
                    hover:bg-surface-raised transition-colors"
                  >
                    {/* Mobile Counter */}
                    {totalMobileBadges > 0 && (
                      <span
                        className="sm:hidden absolute -top-1 -right-1
                      min-w-[18px] h-[18px] px-1 rounded-full
                      bg-danger text-white text-[10px] font-bold
                      flex items-center justify-center
                      border-2 border-surface"
                      >
                        {totalMobileBadges > 9 ? "9+" : totalMobileBadges}
                      </span>
                    )}
                    <div
                      className="w-8 h-8 rounded-full bg-accent text-accent-fg
                    flex items-center justify-center text-sm font-bold shrink-0"
                    >
                      {initial}
                    </div>
                    <div className="hidden sm:block text-left">
                      <p className="text-xs font-semibold text-text leading-none">
                        {firstName}
                      </p>
                      <p className="text-[10px] text-text-muted mt-0.5">
                        My Account
                      </p>
                    </div>
                    <ChevronDownIcon
                      className={`w-3.5 h-3.5 text-text-subtle hidden sm:block transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Dropdown */}
                  {dropdownOpen && (
                    <div
                      className="absolute right-0 top-full mt-2 w-56
                    bg-surface border border-border rounded-xl shadow-lg
                    py-1.5 z-50"
                    >
                      {/* User info */}
                      <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                        <div
                          className="w-9 h-9 rounded-full bg-accent text-accent-fg
                        flex items-center justify-center text-sm font-bold shrink-0"
                        >
                          {initial}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-text truncate">
                            {customer?.name}
                          </p>
                          <p className="text-xs text-text-muted truncate">
                            {customer?.email}
                          </p>
                        </div>
                      </div>

                      {/* Menu items */}
                      <div className="py-1">
                        <DDLink
                          to="/profile"
                          onClick={() => setDropdownOpen(false)}
                          icon="👤"
                        >
                          My Profile
                        </DDLink>
                        <DDLink
                          to="/orders"
                          onClick={() => setDropdownOpen(false)}
                          icon="📦"
                        >
                          My Orders
                        </DDLink>
                      </div>

                      <div className="h-px bg-border my-1" />

                      {/* Wishlist + Cart with counts */}
                      <div className="py-1">
                        <DDLink
                          to="/wishlist"
                          onClick={() => setDropdownOpen(false)}
                          icon="❤️"
                          badge={5}
                        >
                          Wishlist
                        </DDLink>
                        <DDLink
                          to="/cart"
                          onClick={() => setDropdownOpen(false)}
                          icon="🛒"
                          badge={2}
                        >
                          Cart
                        </DDLink>
                      </div>

                      <div className="h-px bg-border my-1" />

                      {/* Logout */}
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2
                        text-sm font-medium text-danger
                        hover:bg-danger-subtle transition-colors"
                      >
                        <LogoutIcon />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className="hidden sm:flex items-center gap-2">
                    <Link
                      to="/login"
                      className="text-sm font-medium px-3 py-1.5 rounded-lg
                    border border-accent text-accent hover:bg-accent-subtle transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="text-sm font-medium px-3 py-1.5 rounded-lg
                    bg-accent text-accent-fg hover:bg-accent-hover transition-colors"
                    >
                      Register
                    </Link>
                  </div>
                  {/* Mobile */}
                  <div className="flex sm:hidden items-center gap-2">
                    <Link
                      to="/login"
                      className="px-3 py-1.5 rounded-lg
        border border-border
        text-xs font-medium text-text"
                    >
                      Login
                    </Link>

                    <Link
                      to="/signup"
                      className="px-3 py-1.5 rounded-lg
        bg-accent text-accent-fg
        text-xs font-medium"
                    >
                      Register
                    </Link>
                  </div>
                </>
              )}

              {/* Divider */}
              <div className="w-px h-8 bg-border mx-1 hidden sm:block" />

              {/* Theme toggle */}
              <div
                role="radiogroup"
                aria-label="Theme"
                className="hidden sm:flex items-center gap-0.5 p-1
                rounded-xl bg-surface-raised border border-border"
              >
                {themes.map(({ value, label, Icon }) => (
                  <button
                    key={value}
                    role="radio"
                    aria-checked={theme === value}
                    title={`${label} mode`}
                    onClick={() => setTheme(value)}
                    className={[
                      "w-7 h-7 inline-flex items-center justify-center rounded-lg",
                      "transition-all duration-200 border-none cursor-pointer",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                      theme === value
                        ? "bg-accent text-accent-fg shadow-sm"
                        : "text-text-muted hover:text-text hover:bg-surface",
                    ].join(" ")}
                  >
                    <Icon />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Desktop nav ── */}
        <nav className="hidden md:flex border-t border-border container mx-auto px-4">
          {navLinks.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className={[
                "px-4 py-2.5 text-sm border-b-2 transition-all duration-200 whitespace-nowrap",
                pathname === to
                  ? "text-text font-medium border-accent"
                  : "text-text-muted hover:text-text border-transparent hover:border-accent",
              ].join(" ")}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* ── Mobile drawer ── */}
        {menuOpen && (
          <div className="md:hidden border-t border-border bg-surface">
            <nav className="flex flex-col py-1">
              {navLinks.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className={[
                    "px-5 py-3 text-sm transition-colors",
                    pathname === to
                      ? "text-text font-medium bg-surface-raised"
                      : "text-text-muted hover:text-text hover:bg-surface-raised",
                  ].join(" ")}
                >
                  {label}
                </Link>
              ))}
            </nav>

            {!isAuth && (
              <div className="flex gap-2 px-5 py-3 border-t border-border">
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center text-sm font-medium py-2 rounded-lg
                  border border-accent text-accent"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center text-sm font-medium py-2 rounded-lg
                  bg-accent text-accent-fg"
                >
                  Register
                </Link>
              </div>
            )}

            <div className="px-5 py-3 border-t border-border flex items-center gap-3">
              <span className="text-xs text-text-muted">Theme</span>
              <div className="flex items-center gap-0.5 p-1 rounded-xl bg-surface-raised border border-border">
                {themes.map(({ value, label, Icon }) => (
                  <button
                    key={value}
                    title={label}
                    onClick={() => setTheme(value)}
                    className={[
                      "w-7 h-7 inline-flex items-center justify-center rounded-lg border-none",
                      theme === value
                        ? "bg-accent text-accent-fg"
                        : "text-text-muted hover:bg-surface",
                    ].join(" ")}
                  >
                    <Icon />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
// ── Dropdown link with optional badge ─────────────────────────────────────
function DDLink({ to, onClick, icon, badge, children }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center gap-2.5 px-4 py-2 text-sm font-medium
        text-text hover:bg-surface-raised transition-colors"
    >
      <span className="text-base leading-none">{icon}</span>
      <span className="flex-1">{children}</span>
      {badge > 0 && (
        <span
          className="min-w-[18px] h-[18px] px-1 rounded-full bg-accent
          text-accent-fg text-[10px] font-bold flex items-center justify-center"
        >
          {badge}
        </span>
      )}
    </Link>
  );
}
