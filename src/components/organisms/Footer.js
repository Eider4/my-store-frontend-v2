"use client";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-gray-100 text-center py-4 text-gray-700 mt-20">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Shishang. Todos los derechos
        reservados.
      </p>
    </div>
  );
};

export default Footer;
