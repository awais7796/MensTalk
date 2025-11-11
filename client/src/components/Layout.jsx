import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./ui/Footer";
import Navbar from "./ui/navbar";
const Layout = () => {
  return (
    <div className="">
      <Navbar />
      <main className="flex grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
