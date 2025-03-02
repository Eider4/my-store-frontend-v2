"use client";
import Axios from "axios";
import { getUserLocalStorageAndSessionStorage } from "../auth/auth.service";

const api = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_SERVER,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

export const addProductInCart = async (id_product, quantity) => {
  try {
    const getUser = await getUserLocalStorageAndSessionStorage();
    const productInCart = {
      id_product,
      id_user: getUser.id_user,
      quantity,
    };
    const response = await api.post("/productInCart", productInCart);
    return response;
  } catch (error) {
    console.error("Error al agregar producto al carrito:", error);
    throw error;
  }
};

export const getProductsIncartService = async (id_user) => {
  try {
    const response = await api.get(`/productInCart/${id_user}`);
    return response;
  } catch (error) {
    console.error("Error al obtener los productos en el carrito:", error);
    return [];
  }
};

export const deleteProductInCart = async (data) => {
  try {
    const response = await api.post("/productInCart/delete", data);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar producto del carrito:", error);
    throw error;
  }
};

export const deleteProductsAllInCart = async (id_cart) => {
  try {
    const response = await api.post(
      `/productInCart/deleteProductsAllInCart/${id_cart}`
    );
    return response;
  } catch (error) {
    console.error("Error al eliminar todos los productos del carrito:", error);
    throw error;
  }
};

export const updateProductInCart = async (data) => {
  try {
    const response = await api.post("/productInCart/update", data);
    return response;
  } catch (error) {
    console.error("Error al actualizar producto en el carrito:", error);
    throw error;
  }
};

// Funciones para manejar productos favoritos en localStorage
export const AddProductLikedLocalStorage = async (id_product) => {
  try {
    const productsLiked =
      JSON.parse(localStorage.getItem("productsLiked")) || [];
    localStorage.setItem(
      "productsLiked",
      JSON.stringify([...productsLiked, id_product])
    );
    return true;
  } catch (error) {
    console.error("Error al agregar producto a favoritos:", error);
    return false;
  }
};

export const DeleteProductLikedLocalStorage = async (id_product) => {
  try {
    const productsLiked =
      JSON.parse(localStorage.getItem("productsLiked")) || [];
    const updatedProducts = productsLiked.filter((p) => p !== id_product);
    localStorage.setItem("productsLiked", JSON.stringify(updatedProducts));
    return true;
  } catch (error) {
    console.error("Error al eliminar producto de favoritos:", error);
    return false;
  }
};

export const verifyProductInLikedLocalStorage = async (id_product) => {
  try {
    const productsLiked =
      JSON.parse(localStorage.getItem("productsLiked")) || [];
    return productsLiked.includes(id_product);
  } catch (error) {
    console.error("Error al verificar producto en favoritos:", error);
    return false;
  }
};
