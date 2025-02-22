"use client";

import { useFormik } from "formik";
import { useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { AiTwotoneCloseSquare } from "react-icons/ai";

import * as Yup from "yup";
import {
  addImages,
  addProduct,
  deleteImages,
  UpdateProduct,
} from "@/service/products/products.service";
import ModalComponent from "../molecules/modals";
import Spinner from "../atoms/Spinner";
import { GrPowerReset } from "react-icons/gr";
import { IoAddOutline } from "react-icons/io5";

const ProductForm = ({ product }) => {
  const [Images, setImages] = useState(product ? product.images : []);
  const [MenssageRes, setMenssageRes] = useState(null);
  const [filesImages, setFilesImages] = useState(product ? product.images : []);
  const [especificaciones, setEspecificaciones] = useState(
    product ? product.especificaciones : {}
  );
  const [imagesDelete, setImagesDelete] = useState([]);
  const [quantityEspecificaciones, setQuantityEspecificaciones] = useState(
    product ? Object.keys(product.especificaciones).length : 1
  );
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: product
      ? product
      : {
          title: "",
          description: "",
          price: "",
          discount: "",
          category: "Electrónica",
          brand: "",
          warranty: "1 Mes",
          rating: "",
          launch_date: new Date().toISOString().slice(0, 10),
          origin: "España",
          envio: {
            gratis: false,
            costo: 0,
            tiempo_estimado: "1 día",
          },
        },
    validationSchema: Yup.object({
      title: Yup.string()
        .required("El título es obligatorio")
        .max(50, "El título no puede superar los 50 caracteres")
        .min(5, "El título no puede ser menor de 3 caracteres"),
    }),

    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        console.log("filesImages", filesImages);

        const ImagesAdd = filesImages.filter((file) => {
          if (typeof file === "object") return file;
        });
        const dataImages =
          ImagesAdd.length > 0 ? await addImages(ImagesAdd) : { images: [] };
        if (!dataImages.images) {
          setIsLoading(false);
          setMenssageRes("No se subieron imágenes");
          return;
        }
        const ImagesAdded = filesImages.filter((file, index) => {
          if (typeof file === "string") return file;
        });
        const data = {
          id_product: product ? product.id_product : crypto.randomUUID(),
          title: values.title,
          description: values.description,
          price: parseFloat(values.price),
          discount: parseFloat(values.discount),
          category: values.category,
          brand: values.brand,
          warranty: values.warranty,
          rating: null,
          launch_date: values.launch_date,
          origin: values.origin,
          images: [...ImagesAdded, ...dataImages.images],
          especificaciones: especificaciones,
          envio: {
            gratis: values.envio.gratis,
            costo: values.envio.costo,
            tiempo_estimado: values.envio.tiempo_estimado,
          },
          comment: null,
        };
        console.log("data", data.images);
        if (data.images.length > 5) {
          setIsLoading(false);
          return setMenssageRes("hay muchas imagenes ");
        }
        if (imagesDelete.length > 0) await deleteImages(imagesDelete);
        const responseProduct = product
          ? await UpdateProduct(data)
          : await addProduct(data);
        console.log("respuesta al actualizar producto", responseProduct);
        if (!responseProduct || responseProduct.status !== 200) {
          product
            ? setMenssageRes("Error al actualizar producto")
            : setMenssageRes("Error al agregar producto");
          setIsLoading(false);
          return;
        }
        product
          ? setMenssageRes("Producto actualizado con éxito!")
          : setMenssageRes("Producto creado con éxito!");
        setIsLoading(false);
      } catch (error) {
        product
          ? setMenssageRes("Error al actualizar producto")
          : setMenssageRes("Error al agregar producto");
        console.log(error);
        setIsLoading(false);
      }
    },
  });

  const resetImages = () => {
    setImagesDelete([]);
    setImages(product ? product.images : []);
    setFilesImages(product ? product.images : []);
  };
  return (
    <>
      <ModalComponent
        isOpen={MenssageRes}
        setIsModalOpen={setMenssageRes}
        description={
          <>
            <h1 className="text-2xl font-bold mb-4">{MenssageRes}</h1>
          </>
        }
      />
      {isLoading && (
        <div className="relative h-screen flex items-center justify-center">
          <Spinner label="Actualizando producto..." />
        </div>
      )}
      <form
        onSubmit={formik.handleSubmit}
        className="p-4 max-w-3xl mx-auto bg-gray-100 rounded-lg shadow-md h-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Campo de Título */}
          <div className="flex flex-col">
            <label className="block mb-2">Título</label>
            <input
              type="text"
              {...formik.getFieldProps("title")}
              className="p-2 border"
            />
            {formik.touched.title && formik.errors.title ? (
              <div className="text-red-500">{formik.errors.title}</div>
            ) : null}
          </div>
          {/* Campo de Precio */}
          <div className="flex flex-col">
            <label className="block mb-2">Precio</label>
            <input
              type="number"
              {...formik.getFieldProps("price")}
              className="p-2 border"
            />
            {formik.touched.price && formik.errors.price ? (
              <div className="text-red-500">{formik.errors.price}</div>
            ) : null}
          </div>
          {/* Campo de Descuento */}
          <div className="flex flex-col">
            <label className="block mb-2">Descuento</label>
            <input
              type="number"
              {...formik.getFieldProps("discount")}
              className="p-2 border"
            />
            {formik.touched.discount && formik.errors.discount ? (
              <div className="text-red-500">{formik.errors.discount}</div>
            ) : null}
          </div>
          {/* Campo de Categoría */}
          <div className="flex flex-col">
            <label className="block mb-2">Categoría</label>
            <select
              {...formik.getFieldProps("category")}
              className="p-2 border"
            >
              <option value="Electrónica">Electrónica</option>
              <option value="Moda">Moda</option>
              <option value="Hogar">Hogar</option>
              <option value="Zapatillas">Zapatillas</option>
              <option value="Juguetes">Juguetes</option>
              <option value="Deportes">Deportes</option>
              <option value="Pantalones">Pantalones</option>
              <option value="Camisetas">Camisetas</option>
              <option value="Accesorios">Accesorios</option>
              <option value="Muebles">Muebles</option>
              <option value="Ropa">Ropa</option>
              <option value="Joyas">Joyas</option>
              <option value="Vehiculos">Vehiculos</option>
            </select>
          </div>
          {/* Campo de Marca */}
          <div className="flex flex-col">
            <label className="block mb-2">Marca</label>
            <input
              type="text"
              {...formik.getFieldProps("brand")}
              className="p-2 border"
            />
            {formik.touched.brand && formik.errors.brand ? (
              <div className="text-red-500">{formik.errors.brand}</div>
            ) : null}
          </div>
          {/* Campo de Garantía */}
          <div className="flex flex-col">
            <label className="block mb-2">Garantía</label>
            <select
              {...formik.getFieldProps("warranty")}
              className="p-2 border"
            >
              <option value="1 Mes">1 Mes</option>
              <option value="3 Meses">3 Meses</option>
              <option value="6 Meses">6 Meses</option>
              <option value="1 Año">1 Año</option>
              <option value="2 Años">2 Años</option>
              <option value="3 Años">3 Años</option>
              <option value="5 Años">5 Años</option>
              <option value="10 Años">10 Años</option>
              <option value="De por vida">De por vida</option>
            </select>
          </div>
          {/* Campo de Fecha de Lanzamiento */}
          <div className="flex flex-col">
            <label className="block mb-2">Fecha de Lanzamiento</label>
            <input
              type="date"
              {...formik.getFieldProps("launch_date")}
              className="p-2 border"
            />
          </div>
          {/* Campo de Origen */}
          <div className="flex flex-col">
            <label className="block mb-2">Origen</label>
            <select {...formik.getFieldProps("origin")} className="p-2 border">
              <option value="España">España</option>
              <option value="Estados Unidos">Estados Unidos</option>
              <option value="China">China</option>
              <option value="Australia">Australia</option>
            </select>
          </div>
          {/* Campo de Descripción */}
          <div className="flex flex-col">
            <label className="block mb-2">Descripción</label>
            <textarea
              {...formik.getFieldProps("description")}
              className="p-2 border"
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="text-red-500">{formik.errors.description}</div>
            ) : null}
          </div>
        </div>
        <hr className="my-4" />
        {/* Sección de Envío */}
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Opciones de Envío</h3>
          <div className="flex items-center gap-3  mb-4">
            <label className="text-md">Envío Gratis</label>
            <input
              type="checkbox"
              {...formik.getFieldProps("envio.gratis")}
              onChange={(e) => {
                const isChecked = e.target.checked;
                formik.setFieldValue("envio.gratis", isChecked);
                if (isChecked) {
                  formik.setFieldValue("envio.costo", 0);
                }
              }}
              className="w-5 h-5"
            />
          </div>
          {!formik.values.envio.gratis && (
            <div className="mt-3">
              <label className="block text-md  mb-1">Costo de Envío</label>
              <input
                type="number"
                {...formik.getFieldProps("envio.costo")}
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}
          <div className="flex flex-col">
            <label className="block mb-2">Tiempo Estimado de Envio</label>
            <select
              {...formik.getFieldProps("envio.tiempo_estimado")}
              className="p-2 border"
            >
              <option value="1 dia">1 día</option>
              <option value="3 dias">3 días</option>
              <option value="5 dias">5 días</option>
              <option value="7 dias">7 días</option>
              <option value="10 dias">10 días</option>
              <option value="15 dias">15 días</option>
              <option value="30 dias">30 días</option>
              <option value="60 dias">60 días</option>
              <option value="90 dias">90 días</option>
              <option value="120 dias">120 días</option>
            </select>
          </div>
        </div>
        <hr className="my-4" />
        {/* Sección de Imagenes */}
        <div className="mt-4">
          <label className="block mb-2">Imagenes</label>
          <div className="flex flex-wrap gap-4 relative ">
            <div className="flex flex-col items-center ">
              <label
                className={`bg-cyan-500 hover:bg-cyan-600 text-white p-2 rounded w-full text-center cursor-pointer ${
                  Images.length >= 5 && "opacity-50 cursor-not-allowed"
                }`}
              >
                {Images.length >= 5
                  ? "Máximo de 5 imágenes"
                  : "Agrega una imagen"}
                <input
                  type="file"
                  accept=".jpg, .png, .jpeg"
                  disabled={Images.length >= 5}
                  onChange={async (e) => {
                    const file = e.target.files;
                    if (Images.length >= 5) {
                      return;
                    }
                    setImages([...Images, URL.createObjectURL(file[0])]);
                    setFilesImages((prev) => [...prev, file[0]]);
                  }}
                  className="hidden"
                />
              </label>
              <p className="text-black">
                Cantidad de imagenes: {Images.length}
              </p>
              {product && (
                <button
                  onClick={resetImages}
                  title="restaurar imagenes"
                  type="button"
                  className="text-cyan-500  p-2 rounded w-30 absolute bottom-2 right-2"
                >
                  <GrPowerReset />{" "}
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-8">
            {Images.length > 0 &&
              Images.map((_, i) => (
                <div key={i} className="flex items-center gap-2 relative">
                  <img
                    src={Images[i]}
                    alt="imagen"
                    className="h-20 w-32 object-contain shadow-xl "
                  />
                  <button
                    type="button"
                    className="text-black rounded absolute -top-4 -right-4"
                    onClick={() => {
                      setImages(Images.filter((_, index) => index !== i));
                      setFilesImages(
                        filesImages.filter((_, index) => index !== i)
                      );
                      if (
                        Images[i].includes(
                          "https://res.cloudinary.com/dd3kdqnzg/image/upload/v1739813747"
                        )
                      ) {
                        console.log("imagen borrada", Images[i]);
                        setImagesDelete((prev) => [...prev, Images[i]]);
                      }
                    }}
                  >
                    <TiDeleteOutline size={20} color="red" />
                  </button>
                </div>
              ))}
          </div>
        </div>
        {/* Sección de Especificaciones */}
        <div className="mt-4 relative">
          <h2 className="block mb-2 text-lg">Especificaciones</h2>
          <button
            type="button"
            className="text-cyan-500 hover:text-cyan-600  p-2 absolute top-12 right-2"
            onClick={() => setQuantityEspecificaciones((prev) => prev + 1)}
          >
            <IoAddOutline size={20} />
          </button>
          <div className="w-full mt-4">
            <div className="flex mb-0">
              <div className="w-1/2 p-2 font-bold">Titulo</div>
              <div className="w-1/2 p-2 font-bold">Descripción</div>
            </div>
            {Array.from({ length: quantityEspecificaciones }).map((_, i) => (
              <div
                className={`w-full p-2 flex gap-2`}
                key={i}
                id={`especificaciones${i}`}
              >
                <input
                  type="text"
                  className="w-full p-2 border"
                  value={especificaciones[`especificaciones${i}`]?.title || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    setEspecificaciones((prev) => ({
                      ...prev,
                      [`especificaciones${i}`]: {
                        ...prev[`especificaciones${i}`],
                        title: value,
                      },
                    }));
                  }}
                />
                <input
                  type="text"
                  className="w-full p-2 border"
                  value={
                    especificaciones[`especificaciones${i}`]?.description || ""
                  }
                  onChange={(e) => {
                    const value = e.target.value;
                    setEspecificaciones((prev) => ({
                      ...prev,
                      [`especificaciones${i}`]: {
                        ...prev[`especificaciones${i}`],
                        description: value,
                      },
                    }));
                  }}
                />
                <button
                  type="button"
                  className="text-black rounded p-2 "
                  onClick={() => {
                    document.getElementById(
                      `especificaciones${i}`
                    ).style.display = "none"; // Oculta el elemento
                    setEspecificaciones((prev) => {
                      const newEspecificaciones = { ...prev };
                      delete newEspecificaciones[`especificaciones${i}`]; // Elimina directamente del estado
                      return newEspecificaciones;
                    });
                  }}
                >
                  <AiTwotoneCloseSquare size={20} color="red" />
                </button>
              </div>
            ))}
          </div>
          {formik.touched.especificaciones && formik.errors.especificaciones ? (
            <div className="text-red-500">{formik.errors.especificaciones}</div>
          ) : null}
        </div>

        <hr className="my-4" />

        <div className="mt-4">
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded w-full"
          >
            Enviar
          </button>
        </div>
      </form>
    </>
  );
};

export default ProductForm;

// -- {https://res.cloudinary.com/dd3kdqnzg/image/upload/v1739813747/ve2tkewpqzhhtl9ist5h.png,https://res.cloudinary.com/dd3kdqnzg/image/upload/v1739813747/qplfh3qo00sycmm4bqxi.png,https://res.cloudinary.com/dd3kdqnzg/image/upload/v1739813747/philv5rcctkemr00jnn3.png,https://res.cloudinary.com/dd3kdqnzg/image/upload/v1739813747/culxnq7mwxhbpq81hhzr.png}
