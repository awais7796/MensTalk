import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./ui/Footer";
import Navbar from "./ui/Navbar";
const Layout = () => {
  const { pathname } = useLocation();
  const showNavbar = pathname === "/";
  return (
    <div className="min-h-screen flex flex-col">
      {showNavbar && <Navbar />}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
