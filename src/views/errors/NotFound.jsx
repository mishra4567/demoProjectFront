// src/views/NotFound.jsx
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center
      bg-bg-base px-4 text-center"
    >
      {/* 404 number */}
      <h1
        className="font-display font-semibold leading-none tracking-tight"
        style={{ fontSize: "7rem", color: "var(--color-border-strong-val)" }}
      >
        4<span className="text-accent">0</span>4
      </h1>

      {/* Accent line */}
      <div className="w-10 h-0.5 bg-accent rounded-full mx-auto mt-2 mb-5" />

      {/* Message */}
      <h2 className="font-display text-xl font-semibold text-text mb-2">
        Page not found
      </h2>
      <p className="text-text-muted text-sm leading-relaxed max-w-xs mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>

      {/* Actions */}
      <div className="flex items-center gap-3 flex-wrap justify-center">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg
            bg-accent text-accent-fg text-sm font-medium
            hover:bg-accent-hover transition-colors duration-200"
        >
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4"
            aria-hidden="true"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          Go home
        </button>

        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg
            border border-border text-text-muted text-sm font-medium
            hover:bg-surface-raised hover:text-text transition-colors duration-200"
        >
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Go back
        </button>
      </div>
    </div>
  );
}
