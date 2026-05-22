// components/ui/Textarea.jsx
import React, { useId } from "react";

const Textarea = React.forwardRef(function Textarea(
  { label, className = "", error = "", helperText = "", rows = 4, ...props },
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
      <textarea
        id={id}
        ref={ref}
        rows={rows}
        aria-invalid={!!error}
        aria-describedby={
          error ? `${id}-err` : helperText ? `${id}-hint` : undefined
        }
        className={[
          "w-full px-3.5 py-2.5 rounded-md text-sm font-sans",
          "bg-surface text-text placeholder:text-text-subtle",
          "border transition-all duration-200 outline-none resize-y",
          "focus:ring-2 focus:ring-offset-0",
          error
            ? "border-danger focus:border-danger focus:ring-danger-subtle"
            : "border-border hover:border-border-strong focus:border-accent focus:ring-accent-subtle",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
      {error && (
        <p
          id={`${id}-err`}
          className="text-xs text-danger pl-0.5 flex items-center gap-1"
        >
          <span aria-hidden>✕</span> {error}
        </p>
      )}
      {!error && helperText && (
        <p id={`${id}-hint`} className="text-xs text-text-subtle pl-0.5">
          {helperText}
        </p>
      )}
    </div>
  );
});

export default Textarea;
