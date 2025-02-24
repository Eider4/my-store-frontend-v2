"use client";

import { downloadPDF } from "@/service/paymentPago/payment-pago.service";
import { useContext, useEffect, useState } from "react";
import ModalComponent from "../molecules/modals";
import { ProductsIncart } from "@/context/productsInCart";
import { useRouter } from "next/navigation";
import { deleteProductsAllInCart } from "@/service/cart/cart.service";

export default function OrderInProgress({ setStateBtns, data }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getProductsIncart, productsIncart } = useContext(ProductsIncart);
  const router = useRouter();
  const handleDownloadPDF = async () => {
    try {
      const { data: blob } = await downloadPDF(data);
      console.log("PDF recibido:", blob);

      // Crear un enlace de descarga
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.download = "factura.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al descargar el PDF:", error);
    }
  };

  useEffect(() => {
    setStateBtns({
      btnNext: false,
      btnBack: false,
    });
    localStorage.removeItem("data");
  }, []);
  const handleClearCart = async () => {
    const response = await deleteProductsAllInCart(productsIncart[0].id_cart);
    if (response.status !== 200) return;
    setIsModalOpen(false);
    getProductsIncart();
    router.push("/");
  };

  return (
    <div className="bg-gradient-to-b from-white  pb-5 to-gray-100 p-8 rounded-2xl shadow-lg w-full text-center relative">
      <h2 className="text-lg font-semibold text-gray-900 mb-5 tracking-wide">
        Estado del Pago
      </h2>

      <p className="text-gray-700 mb-6">
        ¡Gracias por tu compra! Estamos procesando tu pedido y pronto recibirás
        más detalles. Si necesitas descargar los detalles de tu compra, haz clic
        en el botón a continuación.
      </p>

      <div className="flex items-center justify-center space-x-4 pb-5">
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-cyan-500 bg-white w-44 px-6 py-3 rounded-xl transition-transform transform hover:scale-105 hover:text-cyan-600 shadow-md"
        >
          Volver a la tienda
        </button>
        <button
          onClick={handleDownloadPDF}
          className="absolute bottom-2 right-2 text-green-500  px-6 py-3 rounded-xl transition-transform transform hover:scale-100 hover:text-green-600 shadow-md"
        >
          Descargar Detalles de la Compra
        </button>
      </div>
      <ModalComponent
        isOpen={isModalOpen}
        setIsModalOpen={() => {
          setIsModalOpen(false);
          router.push("/");
        }}
        description={
          <div>
            <h2>Quieres borrar los productos del carrito</h2>
            <button
              onClick={handleClearCart}
              className="text-cyan-500 bg-white w-44 px-6 py-3 rounded-xl transition-transform transform hover:scale-105 hover:text-cyan-600 shadow-md"
            >
              Vaciar Carrito
            </button>
          </div>
        }
      />
    </div>
  );
}
