import axios from "axios";

const url_api = "https://23d3-54-221-158-210.ngrok-free.app";

// Configuración de axios con el header necesario
const api = axios.create({
  baseURL: url_api,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

export const createOrder = async (data) => {
  try {
    const response = await api.post("/order", data);
    return response.data;
  } catch (error) {
    console.error("Error al crear la orden:", error);
    throw error;
  }
};

export const getOrdersByIdUser = async (user_id) => {
  try {
    const response = await api.get(`/order/${user_id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener órdenes del usuario:", error);
    throw error;
  }
};

export const getOrderById = async (id) => {
  try {
    console.log("Obteniendo orden por ID:", `${url_api}/order/by_id/${id}`);
    const response = await api.get(`/order/by_id/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener la orden:", error);
    throw error;
  }
};

export const getProductsInOrder = async (id_order) => {
  try {
    console.log(
      "Obteniendo productos en la orden:",
      `${url_api}/order/productInOrder/${id_order}`
    );
    const response = await api.get(`/order/productInOrder/${id_order}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los productos en la orden:", error);
    throw error;
  }
};

export const updateProductInOrder = async (data) => {
  try {
    const response = await api.post("/productInOrder/update", data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el producto en la orden:", error);
    throw error;
  }
};
