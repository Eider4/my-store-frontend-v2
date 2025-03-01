import Link from "next/link";
import {
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaShoppingCart,
} from "react-icons/fa";

export default function CardOrder({ order }) {
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
        <FaShoppingCart className="mr-2 text-blue-600" /> Detalles de la Orden
      </h1>

      <div className="mb-2 flex items-center">
        <FaCalendarAlt className="mr-2 text-gray-600" />
        <span className="font-medium text-gray-700">Fecha de Orden:</span>
        <p className="text-gray-900 ml-2">
          {new Date(order.order_date).toLocaleDateString()}
        </p>
      </div>

      <div className="mb-2 flex items-center">
        <FaMoneyBillWave className="mr-2 text-green-600" />
        <span className="font-medium text-gray-700">Monto Total:</span>
        <p className="text-gray-900 font-bold ml-2">
          ${parseFloat(order.total_amount).toLocaleString()}
        </p>
      </div>

      <div className="mb-2">
        <span className="font-medium text-gray-700">Estado del Pago:</span>
        <span
          className={`px-2 py-1 ml-2 text-sm font-semibold rounded ${
            order.statuspayment === "succeeded"
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {order.statuspayment === "succeeded" ? "Pagado" : "Pendiente"}
        </span>
      </div>

      <div className="mb-2">
        <span className="font-medium text-gray-700">Estado de la Orden:</span>
        <span
          className={`px-2 ml-2 py-1 text-sm font-semibold rounded ${
            order.status === "pending"
              ? "bg-yellow-200 text-yellow-800"
              : "bg-blue-200 text-blue-800"
          }`}
        >
          {order.status === "pending" ? "Pendiente" : "Completada"}
        </span>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold text-gray-700 flex items-center">
          <FaMapMarkerAlt className="mr-2 text-red-600" /> Dirección de Envío
        </h2>
        <p className="text-gray-900">
          {order.address.address}, {order.address.city}, {order.address.state},{" "}
          {order.address.zip}
        </p>
        {order.address.optional && (
          <p className="text-gray-600 text-sm">{order.address.optional}</p>
        )}
      </div>
      <Link href={`/orders/${order.id_order}`}>
        <button className=" text-black px-5 py-2 rounded-lg w-full transition duration-300 hover:bg-blue-600">
          Ver Detalles de la Orden
        </button>
      </Link>
    </div>
  );
}
