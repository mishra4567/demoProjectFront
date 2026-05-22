// components/ui/Card.jsx
function Card({ children, className = "", hoverable = false, ...props }) {
  return (
    <div
      className={[
        "bg-surface border border-border rounded-lg shadow-sm",
        hoverable
          ? "transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
          : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}

function CardHeader({ children, className = "", ...props }) {
  return (
    <div
      className={`px-5 py-4 border-b border-border font-display font-semibold text-text ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

function CardBody({ children, className = "", ...props }) {
  return (
    <div className={`px-5 py-4 text-sm text-text ${className}`} {...props}>
      {children}
    </div>
  );
}

function CardFooter({ children, className = "", ...props }) {
  return (
    <div
      className={`px-5 py-3 border-t border-border text-xs text-text-muted bg-bg-subtle rounded-b-lg ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
