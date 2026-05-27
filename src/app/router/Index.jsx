// src/app/router/Index.jsx
import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import { Home, Login, NotFound, ProductDetails, Signup } from "../../views";

// const router = createBrowserRouter([
//   // ── Main website (with Header + Footer) ──────────────────────────
//   {
//     element: <MainLayout />,
//     errorElement: <NotFound />,
//     children: [
//       { index: true, element: <Home /> },
//       { path: "/products/:id", element: <ProductDetails /> },
//     ],
//   },

//   // ── Auth pages (no Header/Footer) ────────────────────────────────
//   {
//     element: <AuthLayout />,
//     errorElement: <NotFound />,
//     children: [
//       { path: "/login", element: <Login /> },
//       { path: "/signup", element: <Signup /> },
//     ],
//   },

//   // ── 404 — catches everything else ────────────────────────────────
//   {
//     path: "*",
//     element: <NotFound />,
//     errorElement: <NotFound />,
//   },
// ]);
const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/productdetails/:id", element: <ProductDetails /> },
    ],
  },

  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
