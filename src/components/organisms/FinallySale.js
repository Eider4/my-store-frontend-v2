"use client";

import { downloadPDF } from "@/service/paymentPago/payment-pago.service";
import { useEffect, useState } from "react";
import ModalProductsDelete from "../molecules/ModalProductsDelete";

export default function OrderInProgress({ setStateBtns, data }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleDownloadPDF = async () => {
    try {
      const { data: blob } = await downloadPDF(data);
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
          className=" bottom-2 right-2 text-green-500  px-6 py-3 rounded-xl transition-transform transform hover:scale-100 hover:text-green-600 shadow-md"
        >
          Descargar Detalles de la Compra
        </button>
      </div>
      <ModalProductsDelete
        isOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}
