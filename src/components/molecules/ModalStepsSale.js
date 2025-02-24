"use client";
import React from "react";
import { FaCheckCircle, FaCircle } from "react-icons/fa";

export default function ModalStepsSale({
  steps = 1,
  btnNext,
  btnBack,
  btnNextText = "Siguiente",
  btnBackText = "Atrás",
  children,
  className = "",
  stateBtns,
}) {
  return (
    <div
      className={` w-full  flex items-center justify-center  bg-opacity-50 ${className}`}
    >
      <div className="bg-white p-6 rounded-lg shadow-2xl  w-full mx-[5vw] md:mx-[20vw] ">
        {/* Línea de tiempo con íconos y líneas conectadas */}
        <div className="flex items-center justify-between mb-6">
          {[1, 2, 3, 4, 5, 6].map((step, index) => (
            <div key={step} className="flex items-center">
              {steps > step ? (
                <FaCheckCircle className="text-cyan-500 text-2xl" />
              ) : (
                <FaCircle
                  className={`text-2xl ${
                    steps === step ? "text-cyan-500" : "text-gray-300"
                  }`}
                />
              )}
              {index < 5 && (
                <div
                  className={`w-10 h-1 mx-1 ${
                    steps > step ? "bg-cyan-500" : "bg-gray-300"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* Contenido del modal */}
        <div className="mb-4">{children}</div>

        {/* Botones */}
        {steps != 6 && stateBtns && (
          <div className="flex items-center justify-around mt-4 bg-white  py-3 rounded-xl border-[1px] border-gray-300 ">
            {btnBack && stateBtns.btnBack && (
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded"
                onClick={() => btnBack(steps)}
              >
                {btnBackText}
              </button>
            )}
            {btnNext && stateBtns.btnNext && (
              <button
                className="bg-cyan-500 text-white px-4 py-2 rounded"
                onClick={() => btnNext(steps)}
              >
                {btnNextText}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
