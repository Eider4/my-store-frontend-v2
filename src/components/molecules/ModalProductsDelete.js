import { ProductsIncart } from "@/context/productsInCart";
import { deleteProductInCart } from "@/service/cart/cart.service";
import { getProductById } from "@/service/products/products.service";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
export default function ModalProductsDelete({ isOpen, setIsModalOpen }) {
  const [productDetails, setProductDetails] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const { productsIncart, getProductsIncart } = useContext(ProductsIncart);
  const router = useRouter();
  const handleSelectProduct = (id_product) => {
    setSelectedProducts((prev) =>
      prev.includes(id_product)
        ? prev.filter((id) => id !== id_product)
        : [...prev, id_product]
    );
  };

  const handleDeleteSelected = async () => {
    try {
      const response = await Promise.all(
        selectedProducts.map(async (id_product) => {
          const response = await deleteProductInCart({
            id_cart: productsIncart[0].id_cart,
            id_product,
          });
          return response.status;
        })
      );
      if (response.some((status) => status !== 200)) return;
      setIsModalOpen(false);
      await getProductsIncart();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectAll = () => {
    setSelectedProducts(
      selectedProducts.length === productDetails.length
        ? []
        : productDetails.map((p) => p.id_product)
    );
  };
  const fetchProducts = async () => {
    const details = await Promise.all(
      productsIncart.map(async (item) => {
        const product = await getProductById(item.id_product);
        return { ...product, quantity: item.quantity };
      })
    );
    setProductDetails(details.sort((a, b) => a.title.localeCompare(b.title)));
  };
  useState(() => {
    fetchProducts();
  }, [productsIncart]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-lg">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md mx-auto">
        <h2 className="text-lg font-semibold text-center mb-3">
          Eliminar productos
        </h2>

        <div className="flex items-center mb-3">
          <input
            type="checkbox"
            className="mr-2"
            checked={
              selectedProducts.length === productDetails.length &&
              productDetails.length > 0
            }
            onChange={handleSelectAll}
          />
          <span>Seleccionar todos</span>
        </div>
        {console.log("productDetails", productDetails)}
        <div className="space-y-3 pt-4 overflow-y-auto max-h-52 md:max-h-64 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          {productDetails.map((product) => (
            <div
              key={product.id_product}
              className="flex items-center space-x-3 py-2 border-b last:border-0"
            >
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedProducts.includes(product.id_product)}
                onChange={() => handleSelectProduct(product.id_product)}
              />
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-12 h-12 object-cover rounded-md md:w-16 md:h-16"
              />
              <div className="flex-1">
                <p className="text-black font-medium text-sm md:text-base">
                  {product.title}
                </p>
                <p className="text-black font-medium text-xs md:text-base">
                  - {product.discount}%
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-between border-t pt-3">
          <button
            className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
            onClick={() => router.push("/")}
          >
            No Eliminar
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-300"
            onClick={handleDeleteSelected}
            disabled={selectedProducts.length === 0}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
