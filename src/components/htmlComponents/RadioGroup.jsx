// components/ui/RadioGroup.jsx
import React, { useId } from "react";

const RadioGroup = React.forwardRef(function RadioGroup(
  {
    options = [],
    groupLabel,
    className = "",
    error = "",
    value,
    onChange,
    name,
    ...props
  },
  ref,
) {
  const baseId = useId();
  return (
    <fieldset className={`w-full flex flex-col gap-1 ${className}`}>
      {groupLabel && (
        <legend className="text-sm font-semibold text-text-muted mb-1 pl-0.5">
          {groupLabel}
        </legend>
      )}
      <div className="flex flex-col gap-2">
        {options.map((opt) => {
          const val = typeof opt === "object" ? opt.value : opt;
          const lbl = typeof opt === "object" ? opt.label : opt;
          const optId = `${baseId}-${val}`;
          return (
            <div key={val} className="flex items-center gap-2.5">
              <input
                id={optId}
                type="radio"
                name={name}
                value={val}
                checked={value === val}
                onChange={onChange}
                ref={ref}
                aria-describedby={error ? `${baseId}-err` : undefined}
                className="w-4 h-4 border border-border bg-surface text-accent accent-amber-600
                  cursor-pointer focus:ring-2 focus:ring-accent focus:ring-offset-0
                  transition-colors duration-150"
                {...props}
              />
              <label
                htmlFor={optId}
                className="text-sm font-medium text-text cursor-pointer select-none"
              >
                {lbl}
              </label>
            </div>
          );
        })}
      </div>
      {error && (
        <p
          id={`${baseId}-err`}
          className="text-xs text-danger pl-0.5 flex items-center gap-1"
        >
          <span aria-hidden>✕</span> {error}
        </p>
      )}
    </fieldset>
  );
});

export default RadioGroup;
