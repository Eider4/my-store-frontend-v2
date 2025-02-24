"use client";

import { useEffect, useState } from "react";

export default function ShowInfoSale({ data, setStateBtns }) {
  if (!data)
    return <p className="text-center text-red-500">No hay datos disponibles</p>;

  const { products, user, paymentMethod } = data;
  useEffect(() => {
    setStateBtns({
      btnNext: true,
      btnBack: true,
    });
  }, []);
  return (
    <div className="bg-white p-8 rounded-xl shadow-xl w-full mx-[3vw] mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Resumen de la Compra
      </h2>

      {/* Método de Pago */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Método de Pago</h3>
        <p className="text-gray-600">{paymentMethod}</p>
      </div>

      {/* Información del Usuario */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">
          Información del Usuario
        </h3>
        <p className="text-gray-600">
          <strong>Nombre:</strong> {user.name}
        </p>
        <p className="text-gray-600">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="text-gray-600">
          <strong>Teléfono:</strong> {user.phone}
        </p>
        <p className="text-gray-600">
          <strong>Dirección:</strong> {user.address.address},{" "}
          {user.address.city}, {user.address.state}, {user.address.zip}
        </p>
        {user.address.optional && (
          <p className="text-gray-600">
            <strong>Detalles:</strong> {user.address.optional}
          </p>
        )}
      </div>

      {/* Productos */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Productos en la Compra
        </h3>
        <div className="flex gap-1 flex-nowrap overflow-x-auto ">
          {products.map((product) => (
            <div
              key={product.id_product}
              className="border p-4 rounded-lg mb-4 w-40 h-40 flex items-center justify-center flex-col"
            >
              <h4 className="font-semibold text-gray-800  overflow-hidden text-ellipsis whitespace-nowrap max-w-full h-20">
                {product.title}
              </h4>

              <img
                src={product.images[0]}
                alt={product.title}
                className="w-24 h-24 object-cover rounded mt-2"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
