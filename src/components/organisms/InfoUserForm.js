"use client";

import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  getUserById,
  getUserLocalStorageAndSessionStorage,
  updateUser,
} from "@/service/auth/auth.service";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaHome,
  FaCity,
  FaMapMarkedAlt,
  FaMapPin,
  FaStickyNote,
} from "react-icons/fa";
import { GrEdit } from "react-icons/gr";

export default function InfoUserForm({ setUserData, setStateBtns }) {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);

  const getUser = async () => {
    try {
      const { id_user } = await getUserLocalStorageAndSessionStorage();
      if (!id_user) throw new Error("Usuario no encontrado");

      const userData = await getUserById(id_user);
      setUser({ ...userData, id_user });
    } catch (error) {
      console.error("Error obteniendo usuario:", error);
    }
  };

  useEffect(() => {
    const validateUser = () => {
      if (!user) return false;

      return Object.keys(user).some((key) => {
        if (key === "address")
          return Object.keys(user[key]).some((key2) =>
            user[key][key2] === null || user[key][key2] === "" ? true : false
          );
        if (user[key] === null || user[key] === "") return true;
        return false;
      });
    };

    const isValid = !validateUser();

    setStateBtns((prev) => ({
      ...prev,
      btnNext: isValid,
      btnBack: true,
    }));
  }, [user]);

  useEffect(() => {
    getUser();
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required("El nombre es obligatorio"),
    email: Yup.string()
      .email("Correo inválido")
      .required("El correo es obligatorio"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Solo números")
      .min(10, "Debe tener al menos 10 dígitos")
      .required("El teléfono es obligatorio"),
    address: Yup.object().shape({
      address: Yup.string().required("La dirección es obligatoria"),
      city: Yup.string().required("La ciudad es obligatoria"),
      state: Yup.string().required("El estado es obligatorio"),
      zip: Yup.string()
        .matches(/^[0-9]+$/, "Solo números")
        .min(5, "Debe tener al menos 5 dígitos")
        .required("El código postal es obligatorio"),
      optional: Yup.string().nullable(),
    }),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await updateUser({ ...user, ...values });
      if (!response.status === 200) return console.error("Error al actualizar");
      setUser(values);
      setEditing(false);
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };
  useEffect(() => {
    setUserData(user);
  }, [user]);

  if (!user) return <p className="text-center text-gray-500">Cargando...</p>;
  return (
    <div className="bg-white p-8 rounded-xl shadow-xl w-full  mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Información del Usuario
      </h2>
      <div className="flex justify-end items-center">
        <button
          onClick={() => setEditing(!editing)}
          className="bg-cyan-500 text-white px-5 py-2 rounded-lg mb-6 w-auto transition duration-300 hover:bg-cyan-600"
        >
          {editing ? (
            "Cancelar"
          ) : (
            <span className="flex items-center gap-2">
              <GrEdit />
              Editar
            </span>
          )}
        </button>
      </div>

      <Formik
        initialValues={{
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
          address: {
            address: user.address?.address || "",
            city: user.address?.city || "",
            state: user.address?.state || "",
            zip: user.address?.zip || "",
            optional: user.address?.optional || "",
          },
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className="flex justify-center flex-wrap gap-2">
            {[
              {
                name: "name",
                type: "text",
                placeholder: "Nombre",
                icon: FaUser,
              },
              {
                name: "email",
                type: "email",
                placeholder: "Email",
                icon: FaEnvelope,
              },
              {
                name: "phone",
                type: "text",
                placeholder: "Teléfono",
                icon: FaPhone,
              },
            ].map(({ name, type, placeholder, icon: Icon }) => (
              <div key={name} className="relative w-[48%]">
                <Icon className="absolute left-3 top-3 text-gray-500" />
                <Field
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  disabled={!editing}
                  className={`w-full pl-10 p-3 border rounded-lg ${
                    editing
                      ? "border-gray-300 focus:ring-2 focus:ring-cyan-500"
                      : "bg-gray-100 cursor-not-allowed"
                  }`}
                />
                <ErrorMessage
                  name={name}
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            ))}

            {[
              {
                name: "address.address",
                type: "text",
                placeholder: "Dirección",
                icon: FaHome,
              },
              {
                name: "address.city",
                type: "text",
                placeholder: "Ciudad",
                icon: FaCity,
              },
              {
                name: "address.state",
                type: "text",
                placeholder: "Estado",
                icon: FaMapMarkedAlt,
              },
              {
                name: "address.zip",
                type: "text",
                placeholder: "Código Postal",
                icon: FaMapPin,
              },
              {
                name: "address.optional",
                type: "text",
                placeholder: "Opcional",
                icon: FaStickyNote,
              },
            ].map(({ name, type, placeholder, icon: Icon }) => (
              <div key={name} className="relative w-[48%]">
                <Icon className="absolute left-3 top-3 text-gray-500" />
                <Field
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  disabled={!editing}
                  className={`w-full pl-10 p-3 border rounded-lg ${
                    editing
                      ? "border-gray-300 focus:ring-2 focus:ring-cyan-500"
                      : "bg-gray-100 cursor-not-allowed"
                  }`}
                />
                <ErrorMessage
                  name={name}
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            ))}

            {editing && (
              <div className="md:col-span-2 w-full">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-5 py-3 rounded-lg w-full transition duration-300 hover:bg-green-600"
                >
                  Guardar Cambios
                </button>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}
