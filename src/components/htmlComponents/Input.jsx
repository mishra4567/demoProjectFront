// components/ui/Input.jsx
// 16.5.2026 — rebuilt with Tailwind semantic tokens + theme support
import React, { useId } from "react";

/**
 * @typedef {Object} InputProps
 * @property {string}  [label]       - Demoproject||Label text shown above the input
 * @property {string}  [type]        - Demoproject||HTML input type (text, email, password…)
 * @property {string}  [className]   - Demoproject||Extra Tailwind classes for the <input>
 * @property {string}  [error]       - Demoproject||Error message shown below the input
 * @property {string}  [helperText]  - Demoproject||Subtle hint shown below the input
 */
/**
 * @type {React.ForwardRefExoticComponent<
 *   InputProps &
 *   React.InputHTMLAttributes<HTMLInputElement> &
 *   React.RefAttributes<HTMLInputElement>
 * >}
 */

const Input = React.forwardRef(function Input(
  {
    label,
    type = "text",
    className = "",
    error = "",
    helperText = "",
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
      <input
        id={id}
        type={type}
        ref={ref}
        aria-invalid={!!error}
        aria-describedby={
          error ? `${id}-err` : helperText ? `${id}-hint` : undefined
        }
        className={[
          "w-full px-3.5 py-2.5 rounded-md text-sm font-sans",
          "bg-surface text-text placeholder:text-text-subtle",
          "border transition-all duration-200 outline-none",
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

export default Input;
