import { Outlet } from "react-router-dom";

import Header from "../../components/shared/Header";
import Footer from "../../components/shared/Footer";

export default function MainLayout() {
  return (
    <>
      <Header />

      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
