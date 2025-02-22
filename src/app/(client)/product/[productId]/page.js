"use client";

import ProductCard from "@/components/molecules/ProductCard";
import { getProductById } from "@/service/products/products.service";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProductById(productId);
      setProduct(data);
    };
    fetchData();
  }, []);
  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <div>
      <ProductCard product={product} />
    </div>
  );
}
