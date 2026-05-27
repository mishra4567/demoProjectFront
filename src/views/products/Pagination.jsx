// src/views/products/Pagination.jsx

export default function Pagination({ pagination, onPageChange }) {
  const { currentPage, lastPage, total, perPage } = pagination;

  if (lastPage <= 1) return null;

  const from = (currentPage - 1) * perPage + 1;
  const to = Math.min(currentPage * perPage, total);

  // Build page numbers — always show first, last, current ±1
  const pages = [];
  for (let i = 1; i <= lastPage; i++) {
    if (
      i === 1 ||
      i === lastPage ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
      {/* Count */}
      <p className="text-xs text-text-muted order-2 sm:order-1">
        Showing{" "}
        <span className="font-semibold text-text">
          {from}–{to}
        </span>{" "}
        of <span className="font-semibold text-text">{total}</span> products
      </p>

      {/* Page buttons */}
      <div className="flex items-center gap-1 order-1 sm:order-2">
        {/* Prev */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium
            border border-border bg-surface text-text-muted
            hover:bg-surface-raised hover:text-text
            disabled:opacity-40 disabled:cursor-not-allowed
            transition-all duration-150"
        >
          <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
            <path d="M9.78 4.22a.75.75 0 010 1.06L7.06 8l2.72 2.72a.75.75 0 11-1.06 1.06L5.47 8.53a.75.75 0 010-1.06l3.25-3.25a.75.75 0 011.06 0z" />
          </svg>
          Prev
        </button>

        {/* Page numbers */}
        {pages.map((p, i) =>
          p === "..." ? (
            <span
              key={`ellipsis-${i}`}
              className="px-2 text-xs text-text-subtle select-none"
            >
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={[
                "w-8 h-8 rounded-md text-xs font-semibold border transition-all duration-150",
                p === currentPage
                  ? "bg-accent text-accent-fg border-transparent shadow-sm"
                  : "bg-surface text-text-muted border-border hover:bg-surface-raised hover:text-text",
              ].join(" ")}
            >
              {p}
            </button>
          ),
        )}

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === lastPage}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium
            border border-border bg-surface text-text-muted
            hover:bg-surface-raised hover:text-text
            disabled:opacity-40 disabled:cursor-not-allowed
            transition-all duration-150"
        >
          Next
          <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
            <path d="M6.22 4.22a.75.75 0 011.06 0l3.25 3.25a.75.75 0 010 1.06l-3.25 3.25a.75.75 0 01-1.06-1.06L9.19 8 6.22 5.28a.75.75 0 010-1.06z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
