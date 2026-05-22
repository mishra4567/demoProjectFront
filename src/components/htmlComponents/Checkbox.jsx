// components/ui/Checkbox.jsx
import React, { useId } from "react";

const Checkbox = React.forwardRef(function Checkbox(
  { label, className = "", error = "", ...props },
  ref,
) {
  const id = useId();
  return (
    <div className={`w-full flex flex-col gap-1 ${className}`}>
      <div className="flex items-center gap-2.5">
        <input
          id={id}
          type="checkbox"
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-err` : undefined}
          className="w-4 h-4 rounded-sm border border-border bg-surface
            text-accent accent-amber-600 cursor-pointer
            focus:ring-2 focus:ring-accent focus:ring-offset-0
            checked:bg-accent checked:border-accent
            transition-colors duration-150"
          {...props}
        />
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-text cursor-pointer select-none"
          >
            {label}
          </label>
        )}
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
});

export default Checkbox;
