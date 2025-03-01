import { getUserLocalStorageAndSessionStorage } from "@/service/auth/auth.service";
import { getProductsIncartService } from "@/service/cart/cart.service";
import { createContext, useEffect, useState } from "react";
export const ProductsIncart = createContext({});

export const ProductsIncartProvider = ({ children }) => {
  const [productsIncart, setProductsIncart] = useState([]);

  const getProductsIncart = async () => {
    try {
      const user = await getUserLocalStorageAndSessionStorage();
      if (user) {
        const response = await getProductsIncartService(user.id_user);
        setProductsIncart(response.data);
        return response.data;
      }
      return [];
    } catch (error) {
      console.log("error al obtener los productos", error);
      setProductsIncart([]);
      return [];
    }
  };
  const verifyProductInCart = (id_product) =>
    productsIncart?.some((product) => product.id_product === id_product);

  useEffect(() => {
    getProductsIncart();
  }, []);
  return (
    <ProductsIncart.Provider
      value={{
        productsIncart,
        verifyProductInCart,
        getProductsIncart,
      }}
    >
      {children}
    </ProductsIncart.Provider>
  );
};
