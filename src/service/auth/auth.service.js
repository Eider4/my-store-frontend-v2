// frontend/src/api/userApi.js
import axios from "axios";
const API_URL = "http://localhost:5000";

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return response;
};
export const registerBD = async (userData) => {
  const response = await axios.post(`${API_URL}/user/register`, userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
export const saveUserInSessionStorage = async (userData) => {
  try {
    // Verificamos que userData sea un objeto válido
    if (userData && typeof userData === "object") {
      // Guardamos los datos en sessionStorage
      sessionStorage.setItem("user", JSON.stringify(userData));
      return {
        success: true,
        message: "Usuario guardado exitosamente en sessionStorage",
      };
    } else {
      throw new Error("Datos del usuario no válidos");
    }
  } catch (error) {
    console.error("Error al guardar usuario en sessionStorage:", error);
    return { success: false, message: error.message };
  }
};
export const saveUserInLocalStorage = async (userData) => {
  try {
    // Verificamos que userData sea un objeto válido
    if (userData && typeof userData === "object") {
      // Guardamos los datos en localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      return {
        success: true,
        message: "Usuario guardado exitosamente en localStorage",
      };
    } else {
      throw new Error("Datos del usuario no válidos");
    }
  } catch (error) {
    console.error("Error al guardar usuario en localStorage:", error);
    return { success: false, message: error.message };
  }
};
export const getUserFromSessionStorage = () => {
  try {
    const userData = sessionStorage.getItem("user");
    if (userData) {
      return JSON.parse(userData);
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al obtener usuario de sessionStorage:", error);
    return null;
  }
};
export const confirmUser = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/confirm`, userData, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return response;
};
// Función para iniciar sesión
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    return response;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
  }
};
export const getUserLocalStorageAndSessionStorage = async () => {
  try {
    const userLocalStorage = localStorage.getItem("user");
    const userSessionStorage = sessionStorage.getItem("user");
    if (userLocalStorage) {
      return JSON.parse(userLocalStorage);
    } else if (userSessionStorage) {
      return JSON.parse(userSessionStorage);
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
export const getUserById = async (id) => {
  const response = await axios.get(`${API_URL}/user/get-user/${id}`);
  return response.data;
};
export const updateUser = async (userData) => {
  const response = await axios.put(`${API_URL}/user/update`, userData);
  return response.data;
};
