// src/app/layouts/AuthLayout.jsx
// Wraps /login and /register — no Header or Footer,
// just a clean centered page with the ThemeToggle available
import { Outlet } from "react-router-dom";
import { ThemeToggle } from "../../components/index";

export default function AuthLayout() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--color-bg-base)",
        fontFamily: "var(--font-sans)",
      }}
    >
      {/* Floating theme toggle — top right corner */}
      <div
        style={{
          position: "fixed",
          top: 16,
          right: 20,
          zIndex: 50,
        }}
      >
        <ThemeToggle variant="icon" />
      </div>

      <Outlet />
    </div>
  );
}
