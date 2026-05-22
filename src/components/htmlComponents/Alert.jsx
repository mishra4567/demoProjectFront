// components/ui/Alert.jsx
const variants = {
  info: { wrap: "bg-info-subtle    border-info/30    text-info-fg", icon: "ℹ" },
  success: {
    wrap: "bg-success-subtle border-success/30 text-success-fg",
    icon: "✓",
  },
  warning: {
    wrap: "bg-warning-subtle border-warning/30 text-warning-fg",
    icon: "⚠",
  },
  danger: {
    wrap: "bg-danger-subtle  border-danger/30  text-danger-fg",
    icon: "✕",
  },
};

function Alert({
  variant = "info",
  title,
  children,
  onDismiss,
  className = "",
}) {
  const { wrap, icon } = variants[variant] ?? variants.info;
  return (
    <div
      role="alert"
      className={[
        "flex gap-3 px-4 py-3 rounded-lg border text-sm font-sans",
        wrap,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span aria-hidden className="mt-0.5 font-bold shrink-0 w-4 text-center">
        {icon}
      </span>
      <div className="flex-1 min-w-0">
        {title && <p className="font-semibold mb-0.5 font-display">{title}</p>}
        <div className="leading-relaxed">{children}</div>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss"
          className="shrink-0 ml-auto opacity-50 hover:opacity-100 transition-opacity duration-150 text-base leading-none"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default Alert;
