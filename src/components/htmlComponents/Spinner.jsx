// components/ui/Spinner.jsx
const sizes = {
  xs: "w-3 h-3 border-2",
  sm: "w-4 h-4 border-2",
  md: "w-6 h-6 border-2",
  lg: "w-10 h-10 border-[3px]",
};

function Spinner({ size = "md", color = "border-accent", className = "" }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={[
        "inline-block rounded-full border-t-transparent animate-spin",
        sizes[size] ?? sizes.md,
        color,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

export default Spinner;
