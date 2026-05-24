// src/app/router/Index.jsx
import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

import Home from "../../views/Home";
import Login from "../../views/auth/Login";
import Signup from "../../views/auth/Signup";
import NotFound from "../../views/errors/NotFound";

const router = createBrowserRouter([
  // ── Main website (with Header + Footer) ──────────────────────────
  {
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [{ index: true, element: <Home /> }],
  },

  // ── Auth pages (no Header/Footer) ────────────────────────────────
  {
    element: <AuthLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
    ],
  },

  // ── 404 — catches everything else ────────────────────────────────
  {
    path: "*",
    element: <NotFound />,
    errorElement: <NotFound />,
  },
]);

export default router;
