"use client";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getProductsFiltered } from "@/service/products/products.service";
import { getUserLocalStorageAndSessionStorage } from "@/service/auth/auth.service";
import { HiOutlineHome } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { RiUserAddLine } from "react-icons/ri";
import { BsFileEarmarkText } from "react-icons/bs";
import { MdOutlineAddBusiness } from "react-icons/md";
import { ProductsIncart } from "@/context/productsInCart";
import { BsCart4 } from "react-icons/bs";
import { FaCircle } from "react-icons/fa";
import ModalProductsCart from "../molecules/ModalProductsCart";

const HeaderComponent = () => {
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();
  const { productsIncart } = useContext(ProductsIncart);
  const handleFilter = async (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value === "") return setFilteredProducts([]);

    const { data, status } = await getProductsFiltered(value);
    if (status == 200) setFilteredProducts(data.products);
  };
  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserLocalStorageAndSessionStorage();
      setIsUserLoggedIn(user?.id_user || null);
    };
    fetchUser();
  }, []);

  return (
    <header className="bg-white shadow-md max-w-[99vw] w-full fixed top-0 left-0 z-50">
      <div className="bg-cyan-500 py-2 text-center max-w-[99.9vw] text-white">
        <h1 className="text-3xl font-bold ">
          Encuentra lo que amas, al mejor precio.
        </h1>
      </div>
      <div className="container mx-auto flex items-center justify-between p-4 relative h-20">
        <h1 className="text-2xl font-bold text-gray-800">Tu Tienda</h1>

        {/* Barra de búsqueda */}
        <div className="relative w-full max-w-md hidden md:flex">
          <FiSearch className="absolute left-3 top-3 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Buscar"
            className="w-full pl-10 pr-4 py-2 border rounded-full focus:ring focus:ring-cyan-400"
            onChange={handleFilter}
          />
          {search !== "" && (
            <div className="absolute top-14 left-0 right-0 bg-white border border-gray-300 shadow-lg rounded-lg mt-2 p-4 max-h-96 overflow-y-auto z-50">
              <ul className="space-y-2">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((item, i) => (
                    <li
                      onClick={() => ManejarClickDelProducto(item.id_product)}
                      key={item.id_product}
                      className="flex items-center p-2 hover:bg-gray-100 cursor-pointer rounded-md transition-colors duration-200"
                    >
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-10  max-h-10 mr-3 rounded-md"
                      />
                      <div>
                        <p className="font-semibold text-gray-800 truncate w-80">
                          {item.title}
                        </p>

                        <p className="text-sm text-gray-600">
                          {item.categorys}
                        </p>
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="text-center text-gray-600 text-sm">
                    No se encontraron resultados
                  </p>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Iconos de navegación */}
        <div className="flex items-center justify-center gap-4 ">
          {pathname !== "/" && (
            <Link href="/">
              <HiOutlineHome
                size={24}
                className="text-gray-700 hover:text-cyan-500"
              />
            </Link>
          )}
          <AiOutlineWhatsApp
            size={24}
            className="text-gray-700 hover:text-cyan-500 cursor-pointer"
          />
          {isUserLoggedIn ? (
            <>
              <Link href="/finally-sale">
                <BsFileEarmarkText
                  size={22}
                  className="text-gray-700 hover:text-cyan-500 cursor-pointer"
                />
              </Link>
              <Link href="/add-products">
                <MdOutlineAddBusiness
                  size={28}
                  className="text-gray-700 hover:text-cyan-500 cursor-pointer"
                />
              </Link>
              <div className="relative ">
                <div onClick={() => setIsModalOpen(!isModalOpen)}>
                  <span className="absolute -top-[2px] -right-[3px]">
                    <FaCircle size={13} className="text-red-500" />
                  </span>
                  <p
                    style={{ fontSize: "8px" }}
                    className="absolute  -top-[1.31px] right-[0.4px] text-white"
                  >
                    {productsIncart.length}
                  </p>
                  <BsCart4
                    size={27}
                    className="text-gray-700 hover:text-cyan-600 cursor-pointer -ml-2 mb-[3px]"
                  />
                </div>
              </div>
            </>
          ) : (
            <Link href="/register">
              <RiUserAddLine
                size={24}
                className="text-gray-700 hover:text-cyan-500"
              />
            </Link>
          )}
        </div>
        <ModalProductsCart
          isOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          products={productsIncart}
        />
      </div>
    </header>
  );
};

const NavItem = ({ href, icon, text }) => (
  <Link
    href={href}
    className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
  >
    {icon}
    <span className="text-base font-medium">{text}</span>
  </Link>
);

export default HeaderComponent;
