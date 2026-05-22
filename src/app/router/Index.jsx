import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

import Home from "../../views/Home";
import Login from "../../views/auth/Login";
import Signup from "../../views/auth/Signup";
// import NotFound from "../../views/errors/NotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Main Website */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>

      {/* Auth Pages */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* 404 */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </>,
  ),
);

export default router;
