"use client";
import {
  loginUser,
  saveUserInSessionStorage,
} from "@/service/auth/auth.service";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaRegCheckCircle,
  FaRegTimesCircle,
} from "react-icons/fa";

const LoginUser = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Correo electrónico inválido")
      .required("El correo electrónico es obligatorio"),
    password: Yup.string().required("La contraseña es obligatoria"),
  });

  const initialValues = {
    email: "",
    password: "",
    rememberMe: false,
    name: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await loginUser({
        email: values.email,
        password: values.password,
        name: values.name,
      });
      const guardar = await saveUserInSessionStorage(response.data);
      console.log(response);
      console.log(guardar);
      setSubmitting(false);
      alert(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 border rounded-lg shadow-lg w-full max-w-md mx-auto bg-white">
      estacontraseñaPrueba123...
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Iniciar Sesión
            </h2>
            <div className="space-y-4">
              <div>
                <Field
                  type="email"
                  name="email"
                  placeholder="Correo electrónico"
                  className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <div className="relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Contraseña"
                    className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <Field
                  type="text"
                  name="name"
                  placeholder="Nombre"
                  className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="flex items-center">
                <Field
                  type="checkbox"
                  name="rememberMe"
                  className="mr-2"
                  onChange={(e) => {
                    setFieldValue("rememberMe", e.target.checked);
                  }}
                />
                <label htmlFor="rememberMe" className="text-sm text-gray-600">
                  Recuérdame
                </label>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white p-3 rounded w-full hover:bg-blue-600 transition-colors"
                disabled={isSubmitting}
              >
                Iniciar Sesión
              </button>
              <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                <a href="/register" className="hover:underline">
                  ¿No tienes cuenta? Regístrate
                </a>
                <a href="/forgot-password" className="hover:underline">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <div className="text-center text-sm text-gray-600 mt-4">
                <a href="/terms" className="hover:underline">
                  Términos y condiciones
                </a>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginUser;
