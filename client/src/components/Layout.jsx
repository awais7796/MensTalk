import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./ui/Footer";
const Layout = () => {
  return (
    <div className="">
      <main className="flex grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
