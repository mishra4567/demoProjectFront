// src/components/htmlComponents/IconBtn.jsx

import { Link } from "react-router-dom";

// ── icon button with label + badge ──────────────────────────────────────────
function IconBtn({ icon, label, badge = 0, to, onClick }) {
  const cls = `relative flex flex-col items-center gap-0.5 px-2.5 py-1.5
    rounded-lg hover:bg-surface-raised transition-colors cursor-pointer
    text-text-muted hover:text-text`;

  const inner = (
    <>
      {icon}
      {badge > 0 && (
        <span
          className="absolute -top-0.5 right-0.5 min-w-[16px] h-4 px-1
          rounded-full bg-danger text-white text-[9px] font-bold
          flex items-center justify-center border-2 border-surface"
        >
          {badge > 9 ? "9+" : badge}
        </span>
      )}
      {label && <span className="text-[10px] text-text-subtle">{label}</span>}
    </>
  );

  if (to)
    return (
      <Link to={to} className={cls}>
        {inner}
      </Link>
    );
  return (
    <button onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

export default IconBtn;