"use client";
import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getProductById } from "@/service/products/products.service";
import { FiMinus, FiPlus } from "react-icons/fi";
import { AiTwotoneDelete } from "react-icons/ai";

import { ProductsIncart } from "@/context/productsInCart";
import {
  deleteProductInCart,
  deleteProductsAllInCart,
  updateProductInCart,
} from "@/service/cart/cart.service";
import Link from "next/link";

export default function ModalProductsCart({
  isOpen,
  setIsModalOpen,
  products,
}) {
  const [productDetails, setProductDetails] = useState([]);
  const { productsIncart, getProductsIncart } = useContext(ProductsIncart);
  const fetchProducts = async () => {
    const details = await Promise.all(
      products.map(async (item) => {
        const product = await getProductById(item.id_product);
        return { ...product, quantity: item.quantity };
      })
    );
    setProductDetails(details.sort((a, b) => a.title.localeCompare(b.title)));
  };
  useEffect(() => {
    if (!isOpen) return;
    fetchProducts();
  }, [isOpen, products]);

  const handleQuantityChange = async (index, increment) => {
    const productUpdate = productsIncart.find((p) => p.id_product === index);
    const quantity = increment
      ? productUpdate.quantity + 1
      : productUpdate.quantity - 1;
    if (quantity < 1) return;
    const response = await updateProductInCart({
      id_product: productUpdate.id_product,
      quantity,
      id_cart: productUpdate.id_cart,
    });
    if (response.status !== 200) return;
    getProductsIncart();
    fetchProducts();
  };
  const handleClearCart = async () => {
    const response = await deleteProductsAllInCart(productsIncart[0].id_cart);
    if (response.status !== 200) return;
    setIsModalOpen(false);
    getProductsIncart();
    setProductDetails([]);
  };
  const handleDeleteProduct = async (id_product) => {
    const response = await deleteProductInCart({
      id_product,
      id_cart: productsIncart[0].id_cart,
    });
    if (response.status !== 200) return;
    getProductsIncart();
    fetchProducts();
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Capa de fondo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-black/5 fixed h-screen w-screen top-0 left-0 z-[-1] backdrop-blur-[0.7px]"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal */}
          <div className="absolute z-50 flex items-start justify-end w-80 top-[79px] -right-[7.2vw]  md:right-0 md:w-96 ">
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="relative w-80 p-4 bg-white rounded-xl shadow-xl shadow-[#67e8f959]  border border-cyan-500 rounded-r-sm rounded-t-sm border-t-0 border-r-0 md:w-96"
            >
              {/* Botón de cierre */}
              <button
                className="absolute top-2 right-2 p-1 text-gray-500 hover:text-cyan-500 transition"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>

              {/* Contenido del modal */}
              <h2 className="text-sm font-semibold text-center mb-3 md:text-lg">
                Carrito de Compras
              </h2>
              <div className="space-y-3 pt-4 overflow-y-auto scrollbar-color-none max-h-52 md:max-h-64">
                {productDetails.length > 0 ? (
                  productDetails.map((product, index) => (
                    <div
                      key={index}
                      className={`flex  items-center space-x-3 pt-2  pb-2 text-left max-h-16 ${
                        index != productDetails.length - 1 ? "border-b" : ""
                      }`}
                    >
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-12 h-12 object-cover rounded-lg md:w-16 md:h-16"
                      />
                      <div className="flex-1 ">
                        <p className="text-black font-medium text-sm md:text-base">
                          {product.title}
                        </p>
                        <p className="text-black font-medium text-xs md:text-base">
                          - {product.discount}%
                        </p>
                        <div className="flex items-center justify-end space-x-2 pb-2">
                          {/* Botón para reducir cantidad */}
                          <button
                            className={`p-1  transition-colors ${
                              product.quantity === 1
                                ? "opacity-50 "
                                : " hover:text-cyan-500"
                            }`}
                            onClick={() =>
                              handleQuantityChange(product.id_product, false)
                            }
                          >
                            <FiMinus size={16} />
                          </button>
                          <p className="text-gray-600 text-sm md:text-base">
                            {product.quantity}
                          </p>
                          {/* Botón para aumentar cantidad */}
                          <button
                            className="p-1 hover:text-cyan-500 transition-colors"
                            onClick={() =>
                              handleQuantityChange(product.id_product, true)
                            }
                          >
                            <FiPlus size={16} />
                          </button>
                          <button
                            className="p-1 hover:text-red-500 text-cyan-500 transition-colors "
                            onClick={() =>
                              handleDeleteProduct(product.id_product)
                            }
                          >
                            <AiTwotoneDelete size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center text-sm">
                    Cargando productos...
                  </p>
                )}
              </div>
              <div className="mt-3 border-t pt-3">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-semibold text-gray-700 md:text-lg">
                    Cantidad de productos:{" "}
                    <span className="text-cyan-500">
                      {productDetails.length}
                    </span>
                  </p>
                </div>{" "}
                <div className="flex justify-left gap-2 items-center">
                  <p className="text-sm font-semibold text-gray-700 md:text-lg">
                    Total:{" "}
                    <span className="text-cyan-500">
                      $
                      {productDetails
                        .reduce(
                          (total, product) =>
                            total +
                            (product.price -
                              (product.price * product.discount) / 100) *
                              product.quantity,
                          0
                        )
                        .toLocaleString()}
                    </span>
                  </p>
                  <p className="text-sm font-semibold text-gray-700 md:text-lg">
                    <span className="text-gray-400 line-through">
                      $
                      {productDetails
                        .reduce(
                          (total, product) =>
                            total + product.price * product.quantity,
                          0
                        )
                        .toLocaleString()}
                    </span>
                  </p>
                </div>
                <div className="mt-3 flex gap-2">
                  <Link href="/finally-sale">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="w-32 py-2 text-white bg-cyan-500 rounded-md text-sm font-medium transition-all hover:bg-cyan-600 shadow-md md:w-40 md:text-lg"
                    >
                      Finalizar Compra
                    </button>
                  </Link>
                  <button
                    onClick={handleClearCart}
                    className="w-32 py-2 text-cyan-500 bg-gray-100 border border-cyan-500 rounded-md text-sm font-medium transition-all hover:bg-gray-200 shadow-md md:w-40 md:text-lg"
                  >
                    Vaciar Carrito
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
