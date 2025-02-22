"use client";
import {
  registerUser,
  confirmUser,
  registerBD,
  saveUserInSessionStorage,
  saveUserInLocalStorage,
} from "@/service/auth/auth.service";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { getCookie } from "@/utils/getCookies";

const FormUser = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState(null);
  const [user, setUser] = useState({
    id_user: "",
    name: "",
    email: "",
    role: "",
    isRememberMe: false,
  });
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("El nombre es obligatorio"),
    email: Yup.string()
      .email("Correo electrónico inválido")
      .required("El correo electrónico es obligatorio"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
        "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, un número y un carácter especial"
      )
      .required("La contraseña es obligatoria"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
      .required("Confirmar la contraseña es obligatorio"),
    code: Yup.string().when("isRegistered", {
      is: true,
      then: Yup.string().required("El código de verificación es obligatorio"),
    }),
  });

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    code: "",
    rememberMe: false,
  };

  const handleRegisterSubmit = async (values, { setSubmitting }) => {
    try {
      setUser({
        name: values.name,
        email: values.email,
        isRememberMe: values.rememberMe,
      });
      setIsRegistered(true);
      return;
      setIsRememberMe(values.rememberMe);
      const response = await registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      setSubmitting(false);
      if (response.status === 200 || response.status === 201) {
        setTooltipMessage({ message: response.data.message, color: "#00FF00" });
        setIsRegistered(true);
        return;
      }
      setTooltipMessage({ message: response.data.message, color: "#FFA500" });
    } catch (error) {
      setTooltipMessage({
        message: error.response.data.error,
        color: "#FF0000",
      });
      console.log(error);
    }
  };

  const handleVerifySubmit = async (values, { setSubmitting }) => {
    try {
      // const { email, code } = values;
      // const response = await confirmUser({
      //   email,
      //   code,
      //   rememberMe: isRememberMe,
      // });

      const responseBD = await registerBD({
        id_user: crypto.randomUUID(),
        //  response.data.userId, // response.data.userId
        name: user.name,
        email: user.email,
        isRememberMe: user.isRememberMe,
      });
      if (responseBD.status === 200) {
        !user.isRememberMe
          ? await saveUserInSessionStorage(responseBD.data.userCreated)
          : await saveUserInLocalStorage(responseBD.data.userCreated);
        setTooltipMessage({
          mesage: "se creo el usuario en la base de datos",
          // response.message
          color: "#00FF00",
        });
        setSubmitting(false);
      } else {
        setTooltipMessage({
          message: "no se creo el usuario en la base de datos",
          color: "#FF0000",
        });
        setSubmitting(false);
      }
    } catch (error) {
      setTooltipMessage({
        message: "error en el servidor",
        color: "#FF0000",
      });
      console.log(error);
    }
  };
  // console.log("cookie idToken", getCookie("id_token"));
  // console.log("cookie _ga_GMDCV6WSX9", getCookie("_ga_GMDCV6WSX9"));

  useEffect(() => {
    if (tooltipMessage)
      setTimeout(() => {
        setTooltipMessage(null);
      }, 3000);
  }, [tooltipMessage]);
  return (
    <div className="p-6 border rounded-lg shadow-lg w-full max-w-md mx-auto bg-white relative">
      estacontraseñaPrueba123...
      {tooltipMessage && (
        <div
          style={{ backgroundColor: tooltipMessage.color }}
          className={`fixed top-4 left-1/2 transform -translate-x-1/2  text-white text-sm rounded-sm px-4 py-2`}
        >
          {tooltipMessage.message}
        </div>
      )}
      {!isRegistered ? (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegisterSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Registro de Usuario
              </h2>
              <div className="space-y-4">
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
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirmar Contraseña"
                    className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <div className="flex items-center">
                    <Field
                      type="checkbox"
                      name="rememberMe"
                      className="mr-2"
                      onChange={(e) => {
                        setFieldValue("rememberMe", e.target.checked);
                      }}
                    />
                    <label
                      htmlFor="rememberMe"
                      className="text-sm text-gray-600"
                    >
                      Recuérdame
                    </label>
                  </div>
                </div>
                <div className="tooltip">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white p-3 rounded w-full hover:bg-blue-600 transition-colors"
                    disabled={isSubmitting}
                    onMouseEnter={() => setTooltipMessage(tooltipMessage)}
                  >
                    Registrarse
                  </button>
                </div>
                <div className="text-center mt-4">
                  <p>
                    ¿Ya tienes cuenta?{" "}
                    <a href="/login" className="text-blue-500">
                      Inicia sesión
                    </a>
                  </p>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <Formik
          initialValues={{ email: initialValues.email, code: "" }}
          validationSchema={Yup.object().shape({
            code: Yup.string().required(
              "El código de verificación es obligatorio"
            ),
          })}
          onSubmit={handleVerifySubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Verificación de Código
              </h2>
              <p className="text-sm text-gray-600 mb-4 text-center">
                Ingrese el código de verificación enviado a su correo
                electrónico.
              </p>
              <div className="space-y-4">
                <div>
                  <Field
                    type="text"
                    name="code"
                    placeholder="Código de verificación"
                    className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <ErrorMessage
                    name="code"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="tooltip">
                  <button
                    type="submit"
                    className="bg-green-500 text-white p-3 rounded w-full hover:bg-green-600 transition-colors"
                    disabled={isSubmitting}
                    onMouseEnter={() => setTooltipMessage(tooltipMessage)}
                  >
                    Verificar
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default FormUser;
