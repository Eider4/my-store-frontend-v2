"use client";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-gray-100 text-center py-4 text-black mt-20 ">
      <p className="text-sm absolute bottom-0 left-0 w-full">
        &copy; {new Date().getFullYear()} Shishang. Todos los derechos
        reservados.
      </p>
    </div>
  );
};

export default Footer;
