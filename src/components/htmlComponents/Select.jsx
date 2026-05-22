// components/ui/Select.jsx
// 14.5.2026 — rebuilt with Tailwind semantic tokens + theme support
// BUG FIX: added missing return inside .map()
import React, { useId } from "react";

function Select(
  {
    options = [],
    label,
    className = "",
    error = "",
    placeholder = "",
    ...props
  },
  ref,
) {
  const id = useId();
  return (
    <div className="w-full flex flex-col gap-1">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-semibold text-text-muted pl-0.5"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-err` : undefined}
          className={[
            "w-full appearance-none px-3.5 py-2.5 pr-9 rounded-md text-sm font-sans",
            "bg-surface text-text",
            "border transition-all duration-200 outline-none cursor-pointer",
            "focus:ring-2 focus:ring-offset-0",
            error
              ? "border-danger focus:border-danger focus:ring-danger-subtle"
              : "border-border hover:border-border-strong focus:border-accent focus:ring-accent-subtle",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => {
            const value = typeof opt === "object" ? opt.value : opt;
            const label = typeof opt === "object" ? opt.label : opt;
            return (
              <option key={value} value={value}>
                {label}
              </option>
            );
          })}
        </select>
        {/* Custom chevron */}
        <span
          aria-hidden
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-subtle"
        >
          <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
            <path d="M5.22 6.22a.75.75 0 011.06 0L8 7.94l1.72-1.72a.75.75 0 111.06 1.06l-2.25 2.25a.75.75 0 01-1.06 0L5.22 7.28a.75.75 0 010-1.06z" />
          </svg>
        </span>
      </div>
      {error && (
        <p
          id={`${id}-err`}
          className="text-xs text-danger pl-0.5 flex items-center gap-1"
        >
          <span aria-hidden>✕</span> {error}
        </p>
      )}
    </div>
  );
}

export default React.forwardRef(Select);
