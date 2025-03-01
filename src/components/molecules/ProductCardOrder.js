"use client";
import { useState } from "react";
import {
  FaTag,
  FaHashtag,
  FaDollarSign,
  FaPercentage,
  FaCalculator,
  FaMoneyBillWave,
  FaTruck,
  FaShippingFast,
  FaHourglass,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { MdOutlineAutoAwesomeMotion } from "react-icons/md";
import { TbBasketCancel } from "react-icons/tb";
import { GiClick } from "react-icons/gi";

const estimarEntrega = (dateInit, tiempoEstimado) => {
  if (!dateInit || !tiempoEstimado) return "Fecha no disponible";
  const fechaPedido = new Date(dateInit);
  if (isNaN(fechaPedido.getTime())) return "Fecha inválida";
  const diasEstimados = parseInt(tiempoEstimado.split(" ")[0], 10);
  if (isNaN(diasEstimados)) return "Tiempo estimado inválido";
  fechaPedido.setDate(fechaPedido.getDate() + diasEstimados);
  return fechaPedido.toLocaleDateString();
};

const ProductCardOrder = ({
  product,
  dateInit,
  handleUpdateProductInOrder,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative w-[440px]`}>
      <div
        key={product.id_product}
        className={`relative w-full aspect-[1/0.7]  border-gray-800 rounded-2xl overflow-hidden cursor-pointer 
        ${isOpen ? "" : "border-gray-800 border-2"}
        `}
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover transition duration-500 ease-in-out"
        />
        {!isOpen && (
          <div className="absolute bottom-0 right-0 p-2 text-black animate-pulse">
            <GiClick />
          </div>
        )}

        <div
          className={`absolute inset-0 bg-black pb-12 bg-opacity-80 flex  flex-col justify-center items-start p-4 text-white rounded-2xl transition-all duration-500 ${
            isOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-[100px] pointer-events-none"
          }`}
        >
          <p className="flex items-center gap-2">
            <FaTag className="text-gray-300" /> {product.title}
          </p>{" "}
          <p className="flex items-center gap-2">
            {product.status === "pending" && (
              <>
                <FaHourglass className="text-yellow-400" />
                <span className="text-yellow-400">Pendiente</span>
              </>
            )}
            {product.status === "succeeded" && (
              <>
                <FaCheckCircle className="text-green-400" />
                <span className="text-green-400">Completada</span>
              </>
            )}
            {product.status === "shipped" && (
              <>
                <FaTruck className="text-blue-400" />
                <span className="text-blue-400">Enviada</span>
              </>
            )}
            {product.status === "delivered" && (
              <>
                <FaTruck className="text-green-400" />
                <span className="text-green-400">Entregado</span>
              </>
            )}
            {product.status === "userCanceled" && (
              <>
                <FaTimesCircle className="text-red-400" />
                <span className="text-red-400">Lo Cancelaste</span>
              </>
            )}
          </p>
          <p className="flex items-center gap-2">
            <FaHashtag className="text-gray-300" /> Cantidad: {product.quantity}
          </p>
          <p className="flex items-center gap-2">
            <FaDollarSign className="text-green-400" /> Precio Unidad: $
            {product.unit_price}
          </p>
          <p className="flex items-center gap-2">
            <FaPercentage className="text-red-400" /> Descuento: $
            {product.discount}
          </p>
          <p className="flex items-center gap-2">
            <MdOutlineAutoAwesomeMotion className="text-blue-400" /> Total
            Productos: ${product.unit_price * product.quantity}
          </p>
          <p className="flex items-center gap-2">
            <FaMoneyBillWave className="text-yellow-400" /> Precio con
            Descuento: ${product.total_price}
          </p>
          <p className="flex items-center gap-2">
            <FaTruck className="text-blue-400" /> Envío: $
            {product.envio?.costo || 0}
          </p>
          <p className="flex items-center gap-2">
            <FaCalculator className="text-green-400" /> Total Precio: $
            {product.envio?.costo || 0 + product.total_price}
          </p>
          <p className="flex items-center gap-2">
            <FaShippingFast className="text-cyan-400" /> Fecha estimada a
            entregar: {estimarEntrega(dateInit, product.envio.tiempo_estimado)}
          </p>
        </div>
      </div>
      {isOpen && (
        <div className="flex items-center cursor-pointer justify-center  gap-2 left-0 right-0 mt-2 absolute bottom-2 ">
          {product.status === "pending" && (
            <p
              onClick={() =>
                handleUpdateProductInOrder(product, "userCanceled")
              }
              className="flex items-center gap-1 border-red-500 border-[1px]  text-red-200 rounded-lg px-4 py-1 hover:bg-red-600 hover:text-white"
            >
              <TbBasketCancel className="userCanceled" />
              Cancelar Pedido
            </p>
          )}
          {product.status != "succeeded" &&
            product.status != "delivered" &&
            product.status != "userCanceled" &&
            product.status != "userCanceled" && (
              <p
                onClick={() => handleUpdateProductInOrder(product, "delivered")}
                className="flex items-center gap-1 border-cyan-500 border-[1px]  text-cyan-200 rounded-lg px-4 py-1 hover:bg-cyan-600 hover:text-white"
              >
                <TbBasketCancel className="" />
                Pedido recibido
              </p>
            )}
        </div>
      )}
    </div>
  );
};

export default ProductCardOrder;
