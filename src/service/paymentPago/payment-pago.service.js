import axios from "axios";

const BASE_URL = "https://23d3-54-221-158-210.ngrok-free.app";

// Configuración global de Axios con el header de Ngrok
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

export const updatePaymentIntent = async (
  paymentIntentId,
  currency,
  amount
) => {
  const response = await api.post(`/payment-intents/${paymentIntentId}`, {
    currency,
    amount,
  });
  return response.data;
};

export const createPaymentIntent = async (currency, amount) => {
  const response = await api.post("/payment-intents", { currency, amount });
  return response.data;
};

export const downloadPDF = async (data) => {
  try {
    const response = await api.post(
      `/payment-intents/inf-checkout/${data.paymentData}`,
      data,
      {
        responseType: "blob",
      }
    );
    return response;
  } catch (error) {
    console.error("Error al descargar el PDF:", error);
    throw error;
  }
};
