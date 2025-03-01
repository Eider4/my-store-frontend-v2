"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaHeart, FaShoppingCart, FaInfoCircle } from "react-icons/fa"; // Importa los íconos
import "./product-small.css";
import {
  addProductInCart,
  AddProductLikedLocalStorage,
  deleteProductInCart,
  DeleteProductLikedLocalStorage,
  verifyProductInLikedLocalStorage,
} from "@/service/cart/cart.service";
import { ProductsIncart } from "@/context/productsInCart";
const ProductCardSmall = ({ product }) => {
  const { title, price, discount, brand, images, description, id_product } =
    product;
  const finalPrice = (product.price * (1 - product.discount / 100)).toFixed(2);
  const { verifyProductInCart, productsIncart, getProductsIncart } =
    useContext(ProductsIncart);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(
    verifyProductInCart(id_product)
  );
  const [isLiked, setIsLiked] = useState(false);
  const handleLikeProduct = async () => {
    try {
      const response = isLiked
        ? await DeleteProductLikedLocalStorage(id_product)
        : await AddProductLikedLocalStorage(id_product);
      if (!response) return;
      setIsLiked(!isLiked);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  const handleAddToCart = async () => {
    try {
      const response = isAddedToCart
        ? await deleteProductInCart({
            id_cart: productsIncart[0].id_cart,
            id_product,
          })
        : await addProductInCart(id_product, 1);
      if (!response.status === 200) return;
      getProductsIncart();
      setIsAddedToCart(!isAddedToCart);
    } catch (error) {
      console.log(
        isAddedToCart
          ? "error al agregar al carrito"
          : "error al eliminar al carrito",
        error
      );
    }
  };
  useEffect(() => {
    setIsAddedToCart(verifyProductInCart(id_product));
  }, [productsIncart]);
  useEffect(() => {
    const checkIfLiked = async () => {
      const liked = await verifyProductInLikedLocalStorage(id_product);
      setIsLiked(liked);
    };
    checkIfLiked();
  }, [id_product]);

  return (
    <div
      className={`bg-white shadow-md rounded-2xl p-4 w-72 hover:shadow-lg transition-all ${
        isFlipped ? "flipped" : ""
      }`}
      style={{ perspective: "1000px" }}
    >
      <div
        className="flip-card-inner"
        style={{ transformStyle: "preserve-3d", transition: "transform 0.6s" }}
      >
        <div
          className="flip-card-front"
          style={{ position: "relative", backfaceVisibility: "hidden" }}
        >
          <Link
            href={`/product/${id_product}`}
            className="w-full h-full relative"
          >
            <div className="relative w-full h-40">
              <Image
                src={images[0]}
                alt={title}
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
            </div>
            <div className="mt-3">
              <h2 className="text-sm font-semibold text-gray-800 truncate">
                {title}
              </h2>
              <p className="text-xs text-gray-500">{brand}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-lg font-bold text-cyan-600">
                  ${Number(finalPrice.split(".")[0]).toLocaleString()},
                  {finalPrice.split(".")[1].toLocaleString()}
                </span>
                {discount > 0 && (
                  <span className="text-sm text-gray-400 line-through">
                    ${price.toLocaleString("es-ES")}
                  </span>
                )}
              </div>
              {product.envio.gratis && (
                <div className="flex items-center gap-2 mt-2 absolute -bottom-10 right-[1%] text-right text-green-600 border-2 border-green-500 px-1 text-xs">
                  <p>Envio Gratis</p>
                </div>
              )}
            </div>
          </Link>
          <div className="flex gap-3 mt-3 text-gray-600">
            <button
              className={`p-1 hover:text-purple-800 ${
                isLiked && "text-purple-600"
              }`}
              onClick={handleLikeProduct}
            >
              <FaHeart className="w-5 h-5" />
            </button>
            <button
              className={`p-1 hover:text-cyan-500 ${
                isAddedToCart && "text-emerald-500"
              }`}
              onClick={handleAddToCart}
            >
              <FaShoppingCart className="w-5 h-5" />
            </button>
            <button className="p-1 hover:text-cyan-500" onClick={handleFlip}>
              <FaInfoCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div
          className="flip-card-back"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            backgroundColor: "white",
            padding: "16px",
          }}
        >
          <h2 className="text-sm font-semibold text-gray-800">
            Más información
          </h2>
          <p className="text-xs text-gray-500 overflow-y-auto max-h-[85%] scrollbar-color-none">
            {description}
          </p>
          <button
            className="mt-3 p-1 text-cyan-500 hover:text-cyan-800"
            onClick={handleFlip}
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSmall;
