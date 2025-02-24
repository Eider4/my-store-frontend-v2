// "use client";

// import { useEffect, useState } from "react";
// import {
//   FaCreditCard,
//   FaUniversity,
//   FaMoneyBillWave,
//   FaMobileAlt,
//   FaBuilding,
// } from "react-icons/fa";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";

// export default function PaymentPortal({ setPaymentMethod }) {
//   const [selectedMethod, setSelectedMethod] = useState("card");

//   const validationSchema = Yup.object({
//     name: Yup.string().required("El nombre es obligatorio"),
//     cardNumber: Yup.string()
//       .matches(/^[0-9]+$/, "Solo números")
//       .length(16, "Debe tener 16 dígitos"),
//     cvv: Yup.string()
//       .matches(/^[0-9]+$/, "Solo números")
//       .length(3, "Debe tener 3 dígitos"),
//     expiration: Yup.string().matches(
//       /^(0[1-9]|1[0-2])\/\d{2}$/,
//       "Formato MM/YY"
//     ),
//   });

//   const handleSubmit = (values) => {
//     console.log("Pago realizado:", values);
//   };

//   const paymentMethods = [
//     { id: "card", label: "Tarjeta", icon: FaCreditCard },
//     { id: "bank", label: "Banco", icon: FaUniversity },
//     { id: "pse", label: "PSE", icon: FaBuilding },
//     { id: "nequi", label: "Nequi", icon: FaMobileAlt },
//     { id: "bancolombia", label: "Bancolombia", icon: FaMobileAlt },
//     { id: "effecty", label: "Efecty", icon: FaMoneyBillWave },
//   ];
//   useEffect(() => {
//     setPaymentMethod(selectedMethod);
//   }, [selectedMethod]);
//   return (
//     <div className="w-full inset-0 flex items-center justify-center bg-opacity-50 mx-[5vw]">
//       <div className="bg-white p-8 rounded-xl shadow-lg w-[90%] md:w-[500px]">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
//           Portal de Pagos
//         </h2>

//         <div className="grid grid-cols-3 gap-4 mb-6">
//           {paymentMethods.map(({ id, label, icon: Icon }) => (
//             <button
//               key={id}
//               className={`flex flex-col items-center p-3 rounded-lg transition-all duration-300 ${
//                 selectedMethod === id
//                   ? "bg-cyan-500 text-white"
//                   : "bg-gray-200 text-gray-700"
//               }`}
//               onClick={() => setSelectedMethod(id)}
//             >
//               <Icon size={24} />
//               <span className="mt-1 text-sm">{label}</span>
//             </button>
//           ))}
//         </div>

//         {selectedMethod === "card" && (
//           <Formik
//             initialValues={{
//               name: "",
//               cardNumber: "",
//               cvv: "",
//               expiration: "",
//             }}
//             validationSchema={validationSchema}
//             onSubmit={handleSubmit}
//           >
//             <Form className="space-y-4">
//               {["name", "cardNumber", "cvv", "expiration"].map((name) => (
//                 <div key={name}>
//                   <Field
//                     name={name}
//                     placeholder={
//                       name === "name"
//                         ? "Nombre en la tarjeta"
//                         : name === "cardNumber"
//                         ? "Número de tarjeta"
//                         : name === "cvv"
//                         ? "CVV"
//                         : "MM/YY"
//                     }
//                     className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500"
//                   />
//                   <ErrorMessage
//                     name={name}
//                     component="p"
//                     className="text-red-500 text-sm"
//                   />
//                 </div>
//               ))}
//               <button
//                 type="submit"
//                 className="bg-green-500 text-white w-full p-3 rounded-lg transition hover:bg-green-600"
//               >
//                 Pagar
//               </button>
//             </Form>
//           </Formik>
//         )}

//         {selectedMethod === "bank" && (
//           <p className="text-center text-gray-600">
//             Realiza la transferencia a la cuenta bancaria XXXX-XXXX-XX y envía
//             el comprobante.
//           </p>
//         )}

//         {selectedMethod === "pse" && (
//           <p className="text-center text-gray-600">
//             Serás redirigido a la plataforma PSE para completar el pago.
//           </p>
//         )}

//         {selectedMethod === "nequi" && (
//           <p className="text-center text-gray-600">
//             Escanea el código QR de Nequi o envía el pago al número XXXX-XXXXXX.
//           </p>
//         )}

//         {selectedMethod === "bancolombia" && (
//           <p className="text-center text-gray-600">
//             Realiza el pago a través de la app de Bancolombia usando el código
//             XXXX.
//           </p>
//         )}

//         {selectedMethod === "effecty" && (
//           <p className="text-center text-gray-600">
//             Dirígete a un punto Efecty y proporciona el código de pago que
//             recibirás en tu correo.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../molecules/PaymentForm";
import { loadStripe } from "@stripe/stripe-js";
import {
  createPaymentIntent,
  updatePaymentIntent,
} from "@/service/paymentPago/payment-pago.service";

const stripePromise = loadStripe(
  "pk_test_51QvjRpQ8c2aNcIJpMuJNkWt8oodVoO52hmxmmIyCrXkk0auDLvkEUKfX2ymashedobBCup9aCnQ4cVtkJuAlK8zP00F6JmAI9g"
);
export default function PaymentPago({ setStateBtns, data, setData }) {
  const [stripeClientSecret, setStripeClientSecret] = useState(null);
  useEffect(() => {
    const initClientSecret = async () => {
      const paymentIntentId = localStorage.getItem("paymentIntentId");
      if (paymentIntentId) {
        //  actualizar
        const response = await updatePaymentIntent(paymentIntentId, "usd");
        setStripeClientSecret(response.clientSecret);
      } else {
        // crear
        const response = await createPaymentIntent("usd");
        console.log("response", response);
        setStripeClientSecret(response.clientSecret);
        localStorage.setItem("paymentIntentId", response.paymentIntentsId);
      }
    };
    initClientSecret();
  }, []);
  return (
    <>
      {stripeClientSecret && (
        <>
          <Elements
            key={"usd"}
            stripe={stripePromise}
            options={{ clientSecret: stripeClientSecret }}
          >
            <PaymentForm
              setStateBtns={setStateBtns}
              data={data}
              setData={setData}
            />
          </Elements>
        </>
      )}
    </>
  );
}
