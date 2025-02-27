"use client";

import { ProductsIncart } from "@/context/productsInCart";
import {
  deleteProductInCart,
  updateProductInCart,
} from "@/service/cart/cart.service";
import { getProductById } from "@/service/products/products.service";
import { useContext, useEffect, useState } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { FiMinus, FiPlus } from "react-icons/fi";

export default function TableSaleProducts({ setProducts, setStateBtns }) {
  const { productsIncart, getProductsIncart } = useContext(ProductsIncart);
  const [productDetails, setProductDetails] = useState([]);

  const fetchProducts = async () => {
    const details = await Promise.all(
      productsIncart.map(async (item) => {
        const product = await getProductById(item.id_product);
        return { ...product, quantity: item.quantity };
      })
    );
    setProductDetails(details.sort((a, b) => a.title.localeCompare(b.title)));
  };
  const handleQuantityChange = async (index, increment) => {
    //if (productsIncart.length <= 0) return;

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
  useEffect(() => {
    fetchProducts();
  }, [productsIncart]);
  const handleDeleteProduct = async (id_product) => {
    //if (productsIncart.length <= 0) return;

    const response = await deleteProductInCart({
      id_product,
      id_cart: productsIncart[0].id_cart,
    });
    if (response.status !== 200) return;
    getProductsIncart();
    fetchProducts();
  };
  useEffect(() => {
    setProducts(productDetails);
  }, [productDetails]);
  useEffect(() => {
    setStateBtns({
      btnNext: true,
      btnBack: false,
    });
    if (productDetails.length === 0)
      setStateBtns({ btnNext: false, btnBack: false });
  }, [productDetails]);
  return (
    <div className="bg-white p-5 rounded-lg shadow-md w-full">
      <h2 className="text-sm font-semibold text-gray-800 mb-4 text-center">
        Productos en la Compra
      </h2>

      <div className="bg-white overflow-x-auto">
        <div className="w-full text-xs overflow-x-auto">
          <div className="min-w-full inline-block align-middle">
            <div className="bg-cyan-500 text-white text-xs flex rounded-md">
              <div className="px-5 py-3 text-left w-3/12  rounded-tl-lg">
                Producto
              </div>
              <div className="px-5 py-3 text-left w-2/12 ">Precio Und.</div>
              <div className="px-5 py-3 text-left w-2/12 ">Cant.</div>
              <div className="px-5 py-3 text-left w-3/12 ">Total</div>
              <div className="px-5 py-3 text-left w-2/12  rounded-tr-lg"></div>
            </div>
            <div className="overflow-y-auto max-h-[40vh] scrollbar-none">
              {productDetails.map((product, index) => {
                const discountPrice =
                  product.price - (product.price * product.discount) / 100;
                const totalPrice = discountPrice * product.quantity;
                const originalTotal = product.price * product.quantity;

                return (
                  <div
                    key={index}
                    className={`flex border-b ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } min-w-full`}
                  >
                    <div className="px-5 py-3 flex items-center gap-4 w-3/12 ">
                      <img
                        className="h-10 w-10 object-cover rounded shadow"
                        src={product.images[0]}
                        alt={product.title}
                      />
                      <p className="text-gray-700 text-xs truncate w-24 text-left">
                        {product.title}
                      </p>
                    </div>
                    <div className="px-5 py-3 text-left text-gray-600 w-2/12 ">
                      <div className="flex flex-col items-left text-left">
                        <p className="text-left ">
                          ${discountPrice.toLocaleString()}
                        </p>
                        {product.discount > 0 && (
                          <span className="text-gray-400 text-xs line-through ml-1">
                            ${product.price.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="px-5 py-3 text-left text-gray-600 w-2/12 ">
                      {product.quantity}
                    </div>
                    <div className="px-5 py-3 text-left text-gray-800 font-semibold w-3/12 ">
                      <div className="flex flex-col items-left text-left">
                        <p>${totalPrice.toLocaleString()}</p>
                        {product.discount > 0 && (
                          <span className="text-gray-400 text-xs line-through">
                            ${originalTotal.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="px-5 py-3 text-left text-gray-800 font-semibold w-2/12  ml-3">
                      <div className="flex items-center justify-end space-x-4">
                        <button
                          className={`p-2 transition-colors ${
                            product.quantity === 1
                              ? "opacity-50"
                              : "hover:text-cyan-500"
                          }`}
                          onClick={() =>
                            handleQuantityChange(
                              product.id_product,
                              false,
                              product
                            )
                          }
                        >
                          <FiMinus size={16} />
                        </button>
                        <p className="text-gray-600 text-sm md:text-base">
                          {product.quantity}
                        </p>
                        <button
                          className="p-2 hover:text-cyan-500 transition-colors"
                          onClick={() =>
                            handleQuantityChange(product.id_product, true)
                          }
                        >
                          <FiPlus size={16} />
                        </button>
                        <button
                          className="p-2 hover:text-red-500 text-cyan-500 transition-colors"
                          onClick={() =>
                            handleDeleteProduct(product.id_product)
                          }
                        >
                          <AiTwotoneDelete size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* Totales */}
        <div className="flex justify-between items-center mt-4 px-5">
          <p className="text-sm font-semibold text-gray-700 md:text-lg">
            Subtotal:{" "}
            <span className="text-cyan-500">
              $
              {Math.round(
                productDetails.reduce(
                  (total, product) =>
                    total +
                    (product.price - (product.price * product.discount) / 100) *
                      product.quantity,
                  0
                )
              ).toLocaleString()}
            </span>
          </p>
          <p className="text-sm font-semibold text-gray-700 md:text-lg">
            <span className="text-gray-400 line-through">
              $
              {productDetails
                .reduce(
                  (total, product) => total + product.price * product.quantity,
                  0
                )
                .toLocaleString()}
            </span>
          </p>
        </div>{" "}
        <div className="flex justify-between items-center mt-4 px-5">
          <p className="text-sm font-semibold text-gray-700 md:text-lg">
            Gastos de envío:{" "}
            <span className="text-cyan-500">
              $
              {Math.round(
                productDetails.reduce(
                  (total, product) =>
                    total +
                    product.envio.costo * product.quantity * product.quantity,
                  0
                )
              ).toLocaleString()}
            </span>
          </p>
        </div>{" "}
        <div className="flex justify-between items-center mt-4 px-5">
          <p className="text-sm font-semibold text-gray-700 md:text-lg">
            Total:{" "}
            <span className="text-green-500">
              $
              {Math.round(
                productDetails.reduce(
                  (total, product) =>
                    total +
                    (product.price -
                      (product.price * product.discount) / 100 +
                      product.envio.costo * product.quantity) *
                      product.quantity,
                  0
                )
              ).toLocaleString()}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
