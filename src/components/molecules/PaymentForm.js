"use client";

import { useEffect, useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useSearchParams } from "next/navigation";

export default function PaymentForm({ setStateBtns, data, setData }) {
  const searchParams = useSearchParams();
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleClickOnPay = async () => {
    if (!stripe || !elements) return;
    setLoading(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: {
        return_url: "http://localhost:5001/finally-sale?payment_intent=",
      },
    });

    setData((prev) => ({ ...prev, paymentData: paymentIntent.id }));

    setLoading(false);

    if (error) {
      console.error("Error:", error);
      return setErrorMsg({
        message: error.message || "Ocurrió un error al procesar el pago.",
        type: "error",
      });
    }

    setErrorMsg({
      message: "Pago exitoso ",
      type: "success",
    });
    setStateBtns({ btnNext: true, btnBack: false });

    localStorage.removeItem("paymentIntentId");
  };

  useEffect(() => {
    data.products.length > 0 &&
      localStorage.setItem("data", JSON.stringify(data));

    setStateBtns({ btnNext: false, btnBack: true });
  }, []);
  useEffect(() => {
    const redirectStatus = searchParams.get("redirect_status");
    if (redirectStatus === "succeeded") {
      setErrorMsg({
        message: "Pago exitoso ",
        type: "success",
      });
      setStateBtns({ btnNext: true, btnBack: false });
      localStorage.removeItem("paymentIntentId");
    } else if (redirectStatus === "failed") {
      setErrorMsg({
        message: error.message || "Ocurrió un error al procesar el pago.",
        type: "error",
      });
    }
  }, [searchParams]);
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-lg bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Realizar pago
      </h2>

      <div className="w-full">
        <PaymentElement />
      </div>

      {!errorMsg && (
        <button
          disabled={loading}
          className={`mt-6 w-full py-3 rounded-lg font-semibold transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-cyan-500 hover:bg-cyan-600 text-white shadow-md"
          }`}
          onClick={handleClickOnPay}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Procesando...
            </div>
          ) : (
            "Pagar"
          )}
        </button>
      )}

      {errorMsg && (
        <p
          className={`mt-4 w-full text-center p-3 rounded-md text-sm font-medium ${
            errorMsg.type === "error"
              ? "bg-red-100 text-red-600 border border-red-400"
              : "bg-green-100 text-green-600 border border-green-400"
          }`}
        >
          {errorMsg.message}
        </p>
      )}
    </div>
  );
}
