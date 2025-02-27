import axios from "axios";

const api_url = process.env.URL_SERVER || "http://localhost:5000";
export const getProducts = async () => {
  try {
    const response = await axios.get(`${api_url}/product/`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${api_url}/product/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getProductsFiltered = async (filter) => {
  try {
    const response = await axios.get(`${api_url}/product/filtered/${filter}`);
    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const addImages = async (images) => {
  try {
    if (!Array.isArray(images) || images.length === 0) {
      console.error("No hay imágenes para subir.");
      return null;
    }

    const formData = new FormData();

    images.forEach((file) => {
      if (file instanceof File) {
        formData.append("imagenes", file); // "imagenes" debe coincidir con multer.array("imagenes", 10)
      } else {
        console.warn("Elemento inválido en la lista de imágenes:", file);
      }
    });
    const response = await axios.post(`${api_url}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 10000,
    });
    return response.data;
  } catch (error) {
    console.error("Error al subir imágenes:", error);
    return error;
  }
};
export const addProduct = async (product) => {
  try {
    const response = await axios.post(
      `${api_url}/product/add-product`,
      product,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return { data: response.data, status: 200 };
  } catch (error) {
    console.log(error);
    return { data: error, status: 500 };
  }
};
export const DeleteProduct = async (product) => {
  try {
    const response = localStorage.getItem("products");
    const products = response ? JSON.parse(response) : [];
    const productExists = products.filter((p) => p.uid !== product.uid);
    localStorage.setItem("products", JSON.stringify(productExists));
    return { data: productExists, status: 200 };
  } catch (error) {
    console.log(error);
    return { data: error, status: 500 };
  }
};
export const UpdateProduct = async (product) => {
  const response = axios.put(
    `${api_url}/product/update/${product.id_product}`,
    product
  );
  return response;
};
export const deleteImages = async (images) => {
  try {
    const response = await axios.post(`${api_url}/upload/delete`, images);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
