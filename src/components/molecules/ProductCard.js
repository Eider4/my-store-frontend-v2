"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FaCartPlus, FaCartArrowDown, FaHeart } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { MdCategory } from "react-icons/md";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/scrollbar";

// import required modules
import { EffectCube, Scrollbar } from "swiper/modules";
import { ProductsIncart } from "@/context/productsInCart";
import {
  addProductInCart,
  AddProductLikedLocalStorage,
  deleteProductInCart,
  DeleteProductLikedLocalStorage,
  verifyProductInLikedLocalStorage,
} from "@/service/cart/cart.service";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getProductById } from "@/service/products/products.service";
import { PiArrowArcLeftLight } from "react-icons/pi";

const ProductCard = () => {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProductById(productId);
      setProduct(data);
    };
    fetchData();
  }, [productId]);

  const [isCart, setIsCart] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const { verifyProductInCart, productsIncart, getProductsIncart } =
    useContext(ProductsIncart);
  const [isLiked, setIsLiked] = useState(false);
  const divRef = useRef(null);
  const [altura, setAltura] = useState(0);
  useEffect(() => {
    if (divRef.current) {
      setAltura(divRef.current.offsetHeight);
    }
  }, []);
  const handleLikeProduct = async () => {
    try {
      const response = isLiked
        ? await DeleteProductLikedLocalStorage(product?.id_product)
        : await AddProductLikedLocalStorage(product?.id_product);
      if (!response) return;
      setIsLiked(!isLiked);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const checkIfAddedToCart = async () => {
      const isAdded = await verifyProductInCart(product?.id_product);
      setIsCart(isAdded);
    };
    checkIfAddedToCart();
  }, [productsIncart]);
  const handleAddToCart = async () => {
    try {
      const response = isCart
        ? await deleteProductInCart({
            id_cart: productsIncart[0].id_cart,
            id_product: product?.id_product,
          })
        : await addProductInCart(product?.id_product, 1);
      if (!response.status === 200) return;
      getProductsIncart();
      setIsCart(!isCart);
    } catch (error) {
      console.log("error al agregar al carrito", error);
    }
  };
  useEffect(() => {
    const checkIfLiked = async () => {
      const liked = await verifyProductInLikedLocalStorage(product?.id_product);
      setIsLiked(liked);
    };
    checkIfLiked();
  }, [product?.id_product]);
  const launch_date = new Date(product?.launch_date);
  if (!product) return <div>Product not found</div>;

  return (
    <div className="shadow-lg rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-x-hidden">
      {/* Swiper para imágenes */}

      <div className="absolute top-[12%] right-1/2 sm:top-[15%] md:relative md:mt-72 ">
        <Swiper
          effect={"cube"}
          grabCursor={true}
          loop={true} // Hacer que el slider sea cíclico
          cubeEffect={{
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
          }}
          modules={[EffectCube]}
          className=" rounded-lg absolute md:-top-40 "
        >
          <div className="relative">
            {product?.images.map((img, index) => (
              <SwiperSlide key={index}>
                <Zoom>
                  <img
                    src={img}
                    alt={`Slide ${index}`}
                    className="h-80 w-[30vh] object-cover rounded-lg"
                  />
                </Zoom>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
        {/* Añadir scrollbar debajo con margen */}
      </div>

      {/* Información del producto */}
      <div className="flex flex-col pt-[115%] md:pt-0 md:ml-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {product?.title}
        </h2>
        <p>
          <span className="text-lg font-semibold text-gray-900">
            ${product?.price.toLocaleString("es-ES")}
          </span>
          <span className="text-green-500 ml-2">-{product?.discount}%</span>
        </p>
        {/* Categoría y calificación */}
        <div className="flex items-center text-gray-600 mb-3">
          <MdCategory className="mr-2 text-lg text-cyan-600" />
          <span className="text-gray-800 font-medium">{product?.category}</span>
        </div>
        <div className="flex items-center text-gray-600 mb-3">
          <AiFillStar className="mr-2 text-yellow-500 text-xl" />
          <span className="text-gray-800 font-medium">
            {product?.rating || "Sin calificación"}
          </span>
        </div>

        {/* Detalles del producto */}
        <div className="space-y-2 text-gray-800">
          <p>
            <b>Marca:</b> {product?.brand}
          </p>
          <p>
            <b>Origen:</b> {product?.origin}
          </p>
          <p>
            <b>Garantía:</b> {product?.warranty}
          </p>
          <p>
            <b>Unidades:</b> {product?.units}
          </p>
          <p>
            <b>Envío:</b>
            {product?.envio.gratis ? (
              <span className="text-green-600 font-semibold ml-1">
                ¡Gratis!
              </span>
            ) : (
              `${product?.envio?.costo.toLocaleString("es-ES")} pesos`
            )}
          </p>
          <p>
            <b>Tiempo de envío:</b> {product?.envio.tiempo_estimado}
          </p>
          <p>
            <b>Fecha de lanzamiento:</b>{" "}
            {launch_date?.toLocaleDateString("es-ES")}
          </p>
        </div>
        {/* Botón de carrito */}
        <div className="flex flex-wrap sm:flex-row gap-2 mb-4 z-20">
          <button
            className="bg-cyan-500 text-white py-2 px-4 rounded-lg flex items-center justify-center transition-all hover:bg-cyan-600"
            onClick={handleAddToCart}
          >
            {isCart ? (
              <>
                <FaCartArrowDown className="mr-2" /> Eliminar del carrito
              </>
            ) : (
              <>
                <FaCartPlus className="mr-2" /> Añadir al carrito
              </>
            )}
          </button>
          <button className="bg-green-600 text-white py-2 px-4 rounded-lg flex items-center justify-center transition-all hover:bg-green-700">
            Comprar
          </button>
          <button
            onClick={handleLikeProduct}
            className={`py-2 px-4 rounded-lg flex items-center justify-center transition-all ${
              isLiked
                ? "bg-purple-600 hover:bg-purple-700"
                : "bg-gray-600 hover:bg-gray-700"
            } text-white`}
          >
            <FaHeart className="mr-2" /> Me gusta
          </button>
          <Link href={`/add-products/${product?.id_product}`}>
            <button className="bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center transition-all hover:bg-blue-700 cursor-pointer">
              Modificar
            </button>
          </Link>
        </div>
      </div>

      <div className="col-span-2 mt-4 flex flex-wrap items-baseline justify-around">
        {/* Descripción con desvanecido */}
        <div className="md:block hidden w-[30vw]">
          <h3 className="font-bold mb-2 md:mt-16">Descripción</h3>

          <div className="relative pb-4">
            <p
              className={`text-gray-700 overflow-hidden transition-all duration-500 ease-in-out`}
              style={{ maxHeight: showFullDesc ? "500px" : `${altura}px` }}
            >
              {product?.description}
            </p>
            <div
              className={`absolute -bottom-2 left-0 w-full  mt-4 bg-gradient-to-t ${
                !showFullDesc ? "from-white to-transparent" : ""
              }  h-36 flex items-end justify-center `}
            >
              <button
                className="text-blue-500 font-bold"
                onClick={() => setShowFullDesc(!showFullDesc)}
              >
                {showFullDesc ? "Ver menos" : "Ver más..."}
              </button>
            </div>
          </div>
        </div>
        <div ref={divRef} className="flex flex-col w-full md:w-[40vw] mb-3">
          <h3 className="font-bold mb-2">Especificaciones</h3>
          <table className="table-auto  border">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2">Título</th>
                <th className="px-4 py-2">Descripción</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(product?.especificaciones).map(
                ([key, value], index) => (
                  <tr key={index} className="border">
                    <td className="px-4 py-2 font-semibold">{value.title}</td>
                    <td className="px-4 py-2">{value.description}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
        <div className="w-full md:hidden">
          <h3 className="font-bold mb-2 md:mt-16">Descripción</h3>

          <div className="relative ">
            <p
              className={`text-gray-700 overflow-hidden transition-all duration-500 ease-in-out ${
                showFullDesc ? "max-h-[500px] mb-4" : "max-h-[80px]"
              }`}
            >
              {product?.description}
            </p>
            <div
              className={`absolute bottom-0 left-0 w-full bg-gradient-to-t ${
                !showFullDesc ? "from-white to-transparent" : ""
              }  h-10 flex items-end justify-center `}
            >
              <button
                className="text-blue-500 font-bold"
                onClick={() => setShowFullDesc(!showFullDesc)}
              >
                {showFullDesc ? "Ver menos" : "Ver más..."}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
