"use client";
import Axios from "axios";
import { getUserLocalStorageAndSessionStorage } from "../auth/auth.service";

const api_url = process.env.URL_SERVER || "http://localhost:5000";

export const addProductInCart = async (id_product, quantity) => {
  const getUser = await getUserLocalStorageAndSessionStorage();
  const productInCart = {
    id_product,
    id_user: getUser.id_user,
    quantity,
  };
  const response = Axios.post(`${api_url}/productInCart`, productInCart);
  return response;
};
export const getProductsIncartService = async (id_user) => {
  try {
    const response = Axios.get(`${api_url}/productInCart/${id_user}`);
    return response;
  } catch (error) {
    console.log("error al obtener los productos", error);
    return [];
  }
};
export const deleteProductInCart = async (data) => {
  const response = Axios.post(`${api_url}/productInCart/delete`, data);
  return response;
};
export const AddProductLikedLocalStorage = async (id_product) => {
  try {
    const productsLiked = localStorage.getItem("productsLiked");
    const products = productsLiked ? JSON.parse(productsLiked) : [];
    localStorage.setItem(
      "productsLiked",
      JSON.stringify([...products, id_product])
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export const DeleteProductLikedLocalStorage = async (id_product) => {
  try {
    const productsLiked = localStorage.getItem("productsLiked");
    const products = productsLiked ? JSON.parse(productsLiked) : [];
    const productNews = products.filter((p) => p !== id_product);
    localStorage.setItem("productsLiked", JSON.stringify(productNews));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export const verifyProductInLikedLocalStorage = async (id_product) => {
  try {
    const productsLiked = localStorage.getItem("productsLiked");
    const products = productsLiked ? JSON.parse(productsLiked) : [];
    const isLiked = products.some((p) => p === id_product);
    return isLiked;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export const deleteProductsAllInCart = async (id_cart) => {
  const response = await Axios.post(
    `${api_url}/productInCart/deleteProductsAllInCart/${id_cart}`
  );
  return response;
};
export const updateProductInCart = async (data) => {
  const response = await Axios.post(`${api_url}/productInCart/update`, data);
  return response;
};
