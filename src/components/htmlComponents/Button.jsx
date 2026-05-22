// components/ui/Button.jsx
// 14.5.2026 — rebuilt with Tailwind semantic tokens + theme support

const variants = {
  primary:
    "bg-accent hover:bg-accent-hover text-accent-fg border-transparent shadow-sm",
  secondary:
    "bg-surface-raised hover:bg-border text-text border-border shadow-sm",
  ghost: "bg-transparent hover:bg-surface-raised text-text border-transparent",
  danger: "bg-danger hover:opacity-90 text-white border-transparent shadow-sm",
  outline: "bg-transparent hover:bg-surface-raised text-accent border-accent",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs gap-1.5 rounded-sm",
  md: "px-4 py-2   text-sm gap-2   rounded-md",
  lg: "px-6 py-3   text-base gap-2.5 rounded-lg",
};

function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  bgColor,
  textColor,
  className = "",
  ...props
}) {
  const legacyOverride =
    bgColor || textColor ? `${bgColor ?? ""} ${textColor ?? ""}`.trim() : "";

  return (
    <button
      type={type}
      disabled={loading || props.disabled}
      className={[
        "inline-flex items-center justify-center font-semibold font-sans",
        "border transition-all duration-200 cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none select-none",
        legacyOverride || variants[variant] || variants.primary,
        sizes[size] || sizes.md,
        fullWidth ? "w-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {loading ? (
        <>
          <span
            aria-hidden
            className={`shrink-0 rounded-full border-2 border-current border-t-transparent animate-spin ${size === "sm" ? "w-3 h-3" : size === "lg" ? "w-5 h-5" : "w-4 h-4"}`}
          />
          <span>Loading…</span>
        </>
      ) : (
        <>
          {leftIcon && (
            <span aria-hidden className="shrink-0">
              {leftIcon}
            </span>
          )}
          {children}
          {rightIcon && (
            <span aria-hidden className="shrink-0">
              {rightIcon}
            </span>
          )}
        </>
      )}
    </button>
  );
}

export default Button;
