// src/app/router/Index.jsx
import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import { Home, Login, NotFound, ProductDetails, Signup } from "../../views";
const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/productdetails/:id", element: <ProductDetails /> },
      // { path: "/header", element: <Header /> },
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
