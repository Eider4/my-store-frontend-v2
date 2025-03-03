import * as Yup from "yup";
export const validationSchemaRegister = Yup.object().shape({
  name: Yup.string().required("El nombre es obligatorio "),
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
