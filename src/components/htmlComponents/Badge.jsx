// components/ui/Badge.jsx
const variants = {
  default: "bg-surface-raised text-text-muted border border-border",
  primary: "bg-accent-subtle text-warning-fg border border-accent/20",
  success: "bg-success-subtle text-success-fg border border-success/20",
  warning: "bg-warning-subtle text-warning-fg border border-warning/20",
  danger: "bg-danger-subtle  text-danger-fg  border border-danger/20",
  info: "bg-info-subtle    text-info-fg    border border-info/20",
};

function Badge({ children, variant = "default", className = "", ...props }) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold font-sans",
        variants[variant] ?? variants.default,
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
