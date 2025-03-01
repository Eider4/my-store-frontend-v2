"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  DeleteProduct,
  getProducts,
} from "@/service/products/products.service";
import ProductCardSmall from "../molecules/ProductCardSmall";

const ShowProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchData = async () => {
    try {
      const data = await getProducts();
      if (data.length === 0) return;
      setProducts(data);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (loading && products.length === 0) {
    return <div>No hay productos</div>;
  }
  if (error) {
    return <div>Error al cargar productos</div>;
  }
  if (products && products.length === 0) return;
  return (
    <div className="flex flex-wrap gap-4 mt-8 justify-center md:mx-[15vw]">
      {products?.map((product) => (
        <ProductCardSmall product={product} key={product.id_product} />
      ))}
    </div>
  );
};

export default ShowProducts;
