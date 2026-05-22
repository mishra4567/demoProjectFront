// components/ui/Modal.jsx
import { useEffect } from "react";

function Modal({ isOpen, onClose, title, children, className = "" }) {
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      {/* Backdrop */}
      <div
        aria-hidden
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />
      {/* Panel */}
      <div
        className={[
          "relative z-10 flex flex-col w-full max-w-lg max-h-[90vh]",
          "bg-surface border border-border rounded-xl shadow-lg",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
          {title && (
            <h2
              id="modal-title"
              className="font-display font-semibold text-text text-base"
            >
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            aria-label="Close"
            className="ml-auto text-text-muted hover:text-text transition-colors duration-150
              w-7 h-7 flex items-center justify-center rounded-md hover:bg-surface-raised"
          >
            <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
              <path d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z" />
            </svg>
          </button>
        </div>
        {/* Body */}
        <div className="px-6 py-5 overflow-y-auto text-sm text-text leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
