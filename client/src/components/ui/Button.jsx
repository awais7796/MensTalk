import React from "react";

const Button = ({ label }) => {
  return (
    <button
      className="
        cursor-pointer relative flex items-center px-6 py-3
        overflow-hidden font-medium transition-all
        bg-[#CFC4AA] rounded-md group
        text-[#1A1412]
      "
    >
      {/* Top-right decorative accent */}
      <span
        className="
          absolute top-0 right-0 w-4 h-4 bg-[#8f7338] rounded
          transition-all duration-500 ease-in-out
          group-hover:-mr-4 group-hover:-mt-4
        "
      >
        <span
          className="
            absolute top-0 right-0 w-5 h-5 bg-[#e6dbc7]
            rotate-45 translate-x-1/2 -translate-y-1/2
          "
        ></span>
      </span>

      {/* Bottom-left decorative accent */}
      <span
        className="
          absolute bottom-0 left-0 w-4 h-4 bg-[#8f7338] rounded rotate-180
          transition-all duration-500 ease-in-out
          group-hover:-ml-4 group-hover:-mb-4
        "
      >
        <span
          className="
            absolute top-0 right-0 w-5 h-5 bg-[#e6dbc7]
            rotate-45 translate-x-1/2 -translate-y-1/2
          "
        ></span>
      </span>

      {/* Sliding background hover wave */}
      <span
        className="
          absolute bottom-0 left-0 w-full h-full rounded-md
          bg-[#695e4a]
          transition-all duration-500 ease-in-out delay-200
          -translate-x-full group-hover:translate-x-0
        "
      ></span>

      {/* Button Label */}
      <span
        className="
          relative w-full text-left
          transition-colors duration-200 ease-in-out
        "
      >
        {label}
      </span>
    </button>
  );
};

export default Button;
