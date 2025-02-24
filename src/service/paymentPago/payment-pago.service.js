import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const updatePaymentIntent = async (paymentIntentId, currency) => {
  const response = await axios.post(
    `${BASE_URL}/payment-intents/${paymentIntentId}`,
    { currency }
  );
  return response.data;
};
export const createPaymentIntent = async (currency) => {
  const response = await axios.post(`${BASE_URL}/payment-intents`, {
    currency,
  });
  return response.data;
};

export const downloadPDF = async (data) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/payment-intents/inf-checkout/${data.paymentData}`,
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
