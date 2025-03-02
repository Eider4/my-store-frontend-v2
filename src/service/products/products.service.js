import axios from "axios";

const api_url = process.env.NEXT_PUBLIC_URL_SERVER;
// Configuración global de Axios con headers
const api = axios.create({
  baseURL: api_url,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

export const getProducts = async () => {
  try {
    const response = await api.get("/product/");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/product/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductsFiltered = async (filter) => {
  try {
    const response = await api.get(`/product/filtered/${filter}`);
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
        formData.append("imagenes", file);
      } else {
        console.warn("Elemento inválido en la lista de imágenes:", file);
      }
    });

    const response = await api.post("/upload", formData, {
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
    const response = await api.post("/product/add-product", product, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return { data: response.data, status: 200 };
  } catch (error) {
    console.log(error);
    return { data: error, status: 500 };
  }
};

export const UpdateProduct = async (product) => {
  try {
    const response = await api.put(
      `/product/update/${product.id_product}`,
      product
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteImages = async (images) => {
  try {
    const response = await api.post("/upload/delete", images);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
