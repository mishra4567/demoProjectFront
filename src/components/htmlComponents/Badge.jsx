// components/ui/Badge.jsx
const variants = {
  default: "bg-surface-raised text-text-muted border border-border",
  primary: "bg-accent-subtle text-warning-fg border border-accent/20",
  success: "bg-success-subtle text-success-fg border border-success/20",
  warning: "bg-warning-subtle text-warning-fg border border-warning/20",
  danger: "bg-danger-subtle  text-danger-fg  border border-danger/20",
  info: "bg-info-subtle    text-info-fg    border border-info/20",
};
const sizes = {
  sm: "text-[10px] px-2 py-0.5",
  md: "text-xs px-2.5 py-0.5",
  lg: "text-sm px-3 py-1",
};

function Badge({ children, variant = "default", className = "", size="md", ...props }) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold font-sans",
        variants[variant] ?? variants.default,
        sizes[size] ?? sizes.md,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
