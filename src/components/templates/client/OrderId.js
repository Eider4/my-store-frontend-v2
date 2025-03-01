"use client";

import Spinner from "@/components/atoms/Spinner";
import ProductCardOrder from "@/components/molecules/ProductCardOrder";
import {
  getOrderById,
  getProductsInOrder,
  updateProductInOrder,
} from "@/service/order/order.service";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaAmazon,
  FaAngleDown,
  FaAngleUp,
  FaBoxOpen,
  FaCheckCircle,
  FaCreditCard,
  FaMoneyBillWave,
  FaTimesCircle,
} from "react-icons/fa";

export default function OrderId() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [productsInOrder, setProductsInOrder] = useState([]);
  const [showProducts, setShowProducts] = useState(false);
  const [loading, setLoading] = useState(false);
  const fetchOrder = async () => {
    try {
      if (!orderId) return;
      const data = await getOrderById(orderId);
      if (!data) return;
      setOrder({ ...data.order, user: data.user });
      const productsInOrder = await getProductsInOrder(data.order.id_order);
      setProductsInOrder(
        productsInOrder.sort((a, b) => a.title.localeCompare(b.title))
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error al obtener el producto", error);
    }
  };
  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const handleUpdateProductInOrder = async (product, status) => {
    try {
      const response = await updateProductInOrder({
        ...product,
        status,
      });
      if (!response[0] === 1) return;
      fetchOrder();
    } catch (error) {
      console.log("error al actualizar el producto", error);
    }
  };
  useEffect(() => {
    setLoading(true);
  }, [orderId]);

  if (loading) return <Spinner label="Cargando..." />;
  return (
    <div className="container  mt-20 p-6 bg-white rounded-lg shadow-lg max-w-[80vw] mx-[10vw]">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Detalles de la Orden
      </h1>
      <div className="grid grid-cols-2 gap-4 text-gray-700">
        <p>
          <b>ID:</b> {order?.id_order}
        </p>
        <p>
          <b>Usuario:</b> {order?.user?.name}
        </p>
        <p>
          <b>Fecha:</b> {new Date(order?.order_date).toLocaleDateString()}
        </p>
        <p>
          <b>Email:</b> {order?.user?.email}
        </p>{" "}
        <p>
          <b>Phone:</b> {order?.user?.phone}
        </p>
        <p>
          <b>Total:</b> ${order?.total_amount}
        </p>
        <p className="flex items-center gap-2">
          <b>Estado:</b>{" "}
          {order?.status === "succeeded" ? (
            <>
              <FaCheckCircle className="text-green-500 inline" /> Completado
            </>
          ) : (
            <>
              <FaTimesCircle className="text-orange-500 inline" /> Pendiente
            </>
          )}
        </p>
        <p>
          <b>Pago:</b> {order?.statuspayment ? "Pagado" : "Pendiente"}
        </p>
      </div>

      <h2 className="text-xl font-semibold mt-6 text-gray-800">
        Detalles del Pago
      </h2>
      <div className="p-4 border rounded-lg shadow-sm mt-2">
        {order?.transfer_data?.payment_method_details?.type === "card" && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <FaCreditCard className="text-blue-500" />
              <p>
                Tarjeta (
                {order?.transfer_data?.payment_method_details?.card?.brand}) -
                **** {order?.transfer_data?.payment_method_details?.card?.last4}
              </p>
            </div>
            <p>
              <b>País:</b>{" "}
              {order?.transfer_data?.payment_method_details?.card?.country}
            </p>
            <p>
              <b>Expira:</b>{" "}
              {order?.transfer_data?.payment_method_details?.card?.exp_month}/
              {order?.transfer_data?.payment_method_details?.card?.exp_year}
            </p>
            <p>
              <b>Tipo de Fondos:</b>{" "}
              {order?.transfer_data?.payment_method_details?.card?.funding}
            </p>
          </div>
        )}
        {order?.transfer_data?.payment_method_details?.type ===
          "amazon_pay" && (
          <div className="flex items-center gap-2">
            <FaAmazon className="text-yellow-500" />
            <p>Amazon Pay</p>
          </div>
        )}
        {order?.transfer_data?.payment_method_details?.type === "cashapp" && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <FaMoneyBillWave className="text-green-500" />
              <p>
                Cash App (
                {order?.transfer_data?.payment_method_details?.cashapp?.cashtag}
                )
              </p>
            </div>
            <p>
              <b>Buyer ID:</b>{" "}
              {order?.transfer_data?.payment_method_details?.cashapp?.buyer_id}
            </p>
          </div>
        )}
      </div>

      <button
        className="flex items-center gap-2 mt-6 text-gray-500 hover:text-cyan-500 transition duration-300"
        onClick={() => setShowProducts(!showProducts)}
      >
        {showProducts ? "Ocultar Productos" : "Ver Productos"}
        {showProducts ? <FaAngleUp /> : <FaAngleDown />}
      </button>
      {showProducts && (
        <h2 className="text-base font-semibold mt-6 text-gray-800">
          Haz clic en el producto
        </h2>
      )}
      <div
        className={`flex gap-2 w-full justify-center items-center flex-wrap  mt-4 transition-all duration-500 ${
          showProducts
            ? "opacity-100 scale-100 h-auto"
            : "opacity-0 scale-95 h-0 overflow-hidden"
        }`}
      >
        {productsInOrder.map((product) => (
          <ProductCardOrder
            handleUpdateProductInOrder={handleUpdateProductInOrder}
            dateInit={order?.order_date}
            key={product.id_product}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}
