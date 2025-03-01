import axios from "axios";

const BASE_URL = "http://54.221.158.210:5000";

export const updatePaymentIntent = async (
  paymentIntentId,
  currency,
  amount
) => {
  const response = await axios.post(
    `${BASE_URL}/payment-intents/${paymentIntentId}`,
    { currency, amount }
  );
  return response.data;
};
export const createPaymentIntent = async (currency, amount) => {
  const response = await axios.post(`${BASE_URL}/payment-intents`, {
    currency,
    amount,
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
