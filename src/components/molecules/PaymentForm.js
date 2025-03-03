"use client";

import { useEffect, useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useSearchParams } from "next/navigation";
const url_front = process.env.NEXT_PUBLIC_URL_FRONTEND;

export default function PaymentForm({
  setStateBtns,
  data,
  setData,
  setMsg,
  handle_add_order,
}) {
  const searchParams = useSearchParams();
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
        return_url: `${url_front}/finally-sale?payment_intent=`,
      },
    });

    setData((prev) => ({ ...prev, paymentData: paymentIntent.id }));

    setLoading(false);

    if (error) {
      console.log("error al crear payment intent", error);
      return setMsg({
        message: error.message || "Ocurrió un error al procesar el pago.",
        type: "error",
      });
    }
    handle_add_order({
      ...data,
      paymentData: paymentIntent.id,
    });

    setMsg({
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
      setMsg({
        message: "Pago exitoso ",
        type: "success",
      });
      setStateBtns({ btnNext: true, btnBack: false });
      localStorage.removeItem("paymentIntentId");
    } else if (redirectStatus === "failed") {
      setMsg({
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
    </div>
  );
}
