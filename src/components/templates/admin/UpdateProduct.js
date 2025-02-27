"use client";

import ProductForm from "@/components/organisms/ProductForm";
import { getProductById } from "@/service/products/products.service";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UpdateProduct() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProductById(productId);
      setProduct(data);
    };
    fetchData();
  }, [productId]);
  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <ProductForm product={product} />
    </div>
  );
}
