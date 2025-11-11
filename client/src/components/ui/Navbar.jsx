import React from "react";
import Button from "./Button";

const Navbar = () => {
  return (
    <nav className="w-full py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 text-[#E8DCC4]">
        {/* Right - Logo */}
        <h1 className="text-2xl font-semibold tracking-wide">MansTalk</h1>

        {/* Left - Button */}
        <Button label="Let's discuss" />
      </div>
    </nav>
  );
};

export default Navbar;
