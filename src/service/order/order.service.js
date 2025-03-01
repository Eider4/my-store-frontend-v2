import axios from "axios";
const url_api = "http://localhost:5000";
export const createOrder = async (data) => {
  const response = await axios.post(`${url_api}/order`, data);
  return response.data;
};

export const getOrdersByIdUser = async (user_id) => {
  const response = await axios.get(`${url_api}/order/${user_id}`);
  return response.data;
};

export const getOrderById = async (id) => {
  console.log("id", `${url_api}/order/by_id/${id}`);
  const response = await axios.get(`${url_api}/order/by_id/${id}`);
  return response.data;
};

export const getProductsInOrder = async (id_order) => {
  console.log("id_order", `${url_api}/order/productInOrder/${id_order}`);
  const response = await axios.get(
    `${url_api}/order/productInOrder/${id_order}`
  );
  console.log("response", response);
  return response.data;
};
export const updateProductInOrder = async (data) => {
  const response = await axios.post(`${url_api}/productInOrder/update`, data);
  return response.data;
};
