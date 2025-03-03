"use client";
import {
  loginUser,
  saveUserInLocalStorage,
  saveUserInSessionStorage,
} from "@/service/auth/auth.service";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { use, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [tooltipMsg, setTooltipMsg] = useState(null);
  const router = useRouter();
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
      if (response.status !== 200) {
        setTooltipMsg({
          message:
            "Ocurrió un error al iniciar sesión, verifica tus credenciales",
          type: "error",
        });
        return;
      }
      values && values.rememberMe
        ? await saveUserInLocalStorage(response.data)
        : await saveUserInSessionStorage(response.data);
      setTooltipMsg({
        message: "Sesión iniciada exitosamente",
        type: "success",
      });
      setSubmitting(false);
    } catch (error) {
      setTooltipMsg({
        message:
          "Ocurrió un error al iniciar sesión, verifica tus credenciales",
        type: "error",
      });
      console.log(error);
    }
  };
  useEffect(() => {
    if (tooltipMsg) {
      setTimeout(() => {
        if (tooltipMsg.type === "success") {
          router.push("/");
        }
        setTooltipMsg(null);
      }, 2500);
    }
  }, [tooltipMsg]);
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
                <Link href="/register" className="hover:underline">
                  ¿No tienes cuenta? Regístrate
                </Link>
                <Link href="/forgot-password" className="hover:underline">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <div className="text-center text-sm text-gray-600 mt-4">
                <Link href="/terms" className="hover:underline">
                  Términos y condiciones
                </Link>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      {tooltipMsg && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm backdrop-opacity-40 bg-black/20 animate-fade-in">
          <div
            className={`bg-${
              tooltipMsg.type === "success" ? "green" : "red"
            }-500 text-white p-4 rounded-lg w-[70vw] max-w-sm shadow-lg text-center transition-opacity duration-300`}
          >
            <p className="text-sm font-semibold">{tooltipMsg.message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
