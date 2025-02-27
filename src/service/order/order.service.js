import axios from "axios";
const url_api = "http://localhost:5000";
export const createOrder = async (data) => {
  const response = await axios.post(`${url_api}/order`, data);
  return response.data;
};
