// frontend/src/api/userApi.js
import Axios from "axios";

console.log(process.env.NEXT_PUBLIC_URL_SERVER);
const api = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_SERVER,
  headers: {
    "ngrok-skip-browser-warning": "true",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const registerUser = async (userData) => {
  return await api.post("/auth/register", userData);
};

export const registerBD = async (userData) => {
  return await api.post("/user/register", userData);
};

export const saveUserInSessionStorage = async (userData) => {
  try {
    if (userData && typeof userData === "object") {
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
    if (userData && typeof userData === "object") {
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
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error al obtener usuario de sessionStorage:", error);
    return null;
  }
};

export const confirmUser = async (userData) => {
  return await api.post("/auth/confirm", userData);
};

export const loginUser = async (userData) => {
  try {
    return await api.post("/auth/login", userData);
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
  }
};

export const getUserLocalStorageAndSessionStorage = async () => {
  try {
    const userLocalStorage = localStorage.getItem("user");
    const userSessionStorage = sessionStorage.getItem("user");
    return userLocalStorage
      ? JSON.parse(userLocalStorage)
      : userSessionStorage
      ? JSON.parse(userSessionStorage)
      : null;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id) => {
  return (await api.get(`/user/get-user/${id}`)).data;
};

export const updateUser = async (userData) => {
  return (await api.put("/user/update", userData)).data;
};

export const deleteUserSessionStorageAndLocalStorage = async () => {
  try {
    sessionStorage.removeItem("user");
    localStorage.removeItem("user");
    return {
      success: true,
      message: "Usuario cerrado exitosamente",
    };
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    return { success: false, message: error.message };
  }
};
