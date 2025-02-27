const productos = [
  {
    uid: crypto.randomUUID(),
    titulo: "Reloj Inteligente",
    descripcion: "Reloj con pantalla AMOLED y monitoreo de salud.",
    precio: 199,
    descuento: 10,
    categoria: "Electrónica",
    marca: "Samsung",
    garantia: "2 años",
    "rating": "4.5",
    fecha_lanzamiento: "2023-06-15",
    origen: "Corea del Sur",
    imagenes: [
      "https://tse1.mm.bing.net/th?id=OIP.wpVdLYPupLkSOYHbZ3SJpQHaIF&pid=Api&P=0&h=180",
      "https://images-na.ssl-images-amazon.com/images/I/71gONv6Su2L._AC_SL1500_.jpg",
    ],
    "especificaciones": [
      { titulo: "sumergible", descripcion: "sí" },
      { titulo: "material", descripcion: "acero inoxidable" },
    ],
    "envio": { "gratis": true, "costo": 0, "tiempo_estimado": "3 días" },
  },
  {
    uid: crypto.randomUUID(),
    titulo: "Zapatillas Deportivas",
    descripcion: "Zapatillas ligeras con amortiguación avanzada.",
    precio: 120,
    descuento: 15,
    categoria: "Moda",
    marca: "Nike",
    garantia: "1 año",
    "rating": "4.7",
    fecha_lanzamiento: "2024-02-10",
    origen: "Estados Unidos",
    imagenes: [
      "https://tse3.mm.bing.net/th?id=OIP.myXCcmRCbudi-8mYrDSFRgHaFr&pid=Api&P=0&h=180",
      "https://tse4.mm.bing.net/th?id=OIP.uRowa0yDnEO38oNt3EVBMAHaHa&pid=Api&P=0&h=180",
    ],
    "especificaciones": [
      { titulo: "para hombre", descripcion: "sí" },
      { titulo: "material", descripcion: "malla transpirable" },
    ],
    "envio": { "gratis": false, "costo": 5, "tiempo_estimado": "5 días" },
  },
  {
    uid: crypto.randomUUID(),
    titulo: "Laptop Ultraliviana",
    descripcion: "Laptop con procesador Intel i7 y pantalla 14” Full HD.",
    precio: 999,
    descuento: 5,
    categoria: "Electrónica",
    marca: "Sony",
    garantia: "3 años",
    "rating": "4.8",
    fecha_lanzamiento: "2022-09-22",
    origen: "Japón",
    imagenes: [
      "https://tse4.mm.bing.net/th?id=OIP.92Rkhcp8gdDhrmYo7iqi-AHaFw&pid=Api&P=0&h=180",
      "https://tse4.mm.bing.net/th?id=OIP.bqoYzMjGevrTSlv9VUzhbwHaFz&pid=Api&P=0&h=180",
    ],
    "especificaciones": [
      { titulo: "procesador", descripcion: "Intel Core i7" },
      { titulo: "material", descripcion: "aluminio" },
    ],
    "envio": { "gratis": true, "costo": 0, "tiempo_estimado": "2 días" },
  },
  {
    uid: crypto.randomUUID(),
    titulo: "Set de Construcción",
    descripcion: "Juego de bloques de construcción de 500 piezas.",
    precio: 49,
    descuento: 10,
    categoria: "Juguetes",
    marca: "Lego",
    garantia: "Sin garantía",
    "rating": "4.9",
    fecha_lanzamiento: "2023-11-05",
    origen: "Dinamarca",
    imagenes: [
      "https://tse1.mm.bing.net/th?id=OIP.6BsjVMIn-0R0Ik8-5G69TwHaGY&pid=Api&P=0&h=180",
      "https://tse4.mm.bing.net/th?id=OIP.wLMf82jb7miiPD0sn1KHdAHaFL&pid=Api&P=0&h=180",
    ],
    "especificaciones": [
      { titulo: "edad recomendada", descripcion: "6+" },
      { titulo: "material", descripcion: "plástico ABS" },
    ],
    "envio": { "gratis": false, "costo": 7, "tiempo_estimado": "6 días" },
  },
  {
    uid: crypto.randomUUID(),
    titulo: "Bicicleta de Montaña",
    descripcion: "Bicicleta con marco de aluminio y frenos de disco.",
    precio: 750,
    descuento: 20,
    categoria: "Deportes",
    marca: "Trek",
    garantia: "5 años",
    "rating": "4.6",
    fecha_lanzamiento: "2021-08-18",
    origen: "Estados Unidos",
    imagenes: [
      "https://tse3.mm.bing.net/th?id=OIP.AqxNY4BSUzuoC6endIj8zAHaF4&pid=Api&P=0&h=180",
      "https://tse3.mm.bing.net/th?id=OIP.VDJbwVd7N5b8PWXoJq1CMAHaGt&pid=Api&P=0&h=180",
    ],
    "especificaciones": [
      { titulo: "velocidades", descripcion: "21" },
      { titulo: "material", descripcion: "aluminio" },
    ],
    "envio": { "gratis": true, "costo": 0, "tiempo_estimado": "4 días" },
  },
];
const productos2 = [
  {
    "id_product": "322c75fd-9324-45b1-93f7-cbdd1d6b1e20",
    "title": "Reloj Ice-Watch Ice-Smart 024299 ICE Smart 3.0",
    "description":
      "Este reloj marca Ice-Watch tiene una caja de Aleación metálica con un diámetro de 36 mm y cuenta con una correa de Goma. Dentro de la caja se encuentra un mecanismo de Ice-Watch de alta calidad el cual esta protegido por un cristal Mineral.\n\nEl reloj es resistente al agua hasta 1 ATM. El reloj viene con 2 años de garantía.\n\nEntregamos en todo el mundo. Lea más sobre las condiciones en la página de envío y para nuestra política de devoluciones en la página de devoluciones",
    "price": 999999,
    "discount": 10,
    "category": "Electrónica",
    "brand": "Tissot ",
    "warranty": "3 Meses",
    "rating": null,
    "launch_date": "2025-02-16T00:00:00.000Z",
    "units": 100,
    "origin": "China",
    "images": [
      "https://res.cloudinary.com/dd3kdqnzg/image/upload/v1739737226/gsgvpcp1lcjgft5vf7wx.png",
      "https://res.cloudinary.com/dd3kdqnzg/image/upload/v1739737226/wlntqu0p6r6s7jzvuchu.png",
      "https://res.cloudinary.com/dd3kdqnzg/image/upload/v1739737225/ajxjupza5vefvms1xht2.png",
    ],
    "especificaciones": {
      "especificaciones0": {
        "title": "sumergible",
        "description": "si",
      },
    },
    "envio": {
      "gratis": false,
      "costo": 19997,
      "tiempo_estimado": "30 dias",
    },
    "comments": null,
    "createdAt": "2025-02-16T20:20:13.077Z",
    "updatedAt": "2025-02-16T20:20:13.077Z",
  },
  {
    "id_product": "30ac160c-fe24-4fa4-9b53-d466482141d0",
    "title":
      "Audífonos Over-Ear Quiet Comfort inalámbricos con cancelación de ruido",
    "description":
      "Toma el control de la música y camina al ritmo de la música con los auriculares con cancelación de ruido Bose QuietComfort. El potente audio de alta fidelidad combinado con la legendaria cancelación de ruido te permite bloquear todo excepto el ritmo y controlar lo que escuchas. Los nuevos modos personalizados te dan el poder de ajustar la cancelación de ruido según el momento y la opción de activar Wind Block para desconectarte de los entornos ventosos. O simplemente alterna entre los modos Quiet y Aware para un cambio rápido cuando el mundo lo requiera. Los auriculares Black, White Smoke o Blue Dusk, Chilled Lilac o Sandstone de edición limitada se combinan con un diseño icónico y cómodo para brindar un sonido tan audaz como tú. El ecualizador ajustable te permite controlar la sintonización de tu música a tu gusto, y Spotify Tap inicia tu sesión de escucha con solo presionar un botón. Con hasta 24 horas de duración de la batería con una sola carga, tus auriculares Bluetooth están listos para cualquier aventura. La alternancia multipunto te permite cambiar entre múltiples conexiones inalámbricas sin desconectarte y volver a conectar cada vez. Conecta el cable de audio opcional a tus auriculares inalámbricos para usarlos incluso sin una conexión Bluetooth. La aplicación Bose Music te guía a través de la configuración, te permite personalizar los ajustes y mantiene actualizado el software de tus auriculares mientras te ofrece un sonido que te llevará a la cima del mundo.\n",
    "price": 2999999,
    "discount": 4,
    "category": "Electrónica",
    "units": 100,

    "brand": "BOSE",
    "warranty": "1 Mes",
    "rating": null,
    "launch_date": "2025-02-16T00:00:00.000Z",
    "origin": "España",
    "images": [
      "https://res.cloudinary.com/dd3kdqnzg/image/upload/v1739739021/makub1l8wabqdcdunmph.png",
      "https://res.cloudinary.com/dd3kdqnzg/image/upload/v1739739022/nq97tdqc1eiqlgog48xs.png",
      "https://res.cloudinary.com/dd3kdqnzg/image/upload/v1739739021/r1q9ro66pdvhav108pcf.png",
    ],
    "especificaciones": {
      "especificaciones0": {
        "title": "Modelo comercial\t",
        "description": "Quiet Comfort Headphones",
      },
      "especificaciones1": {
        "title": "Conexión alámbrica / inalámbrica\t",
        "description": "Inalámbrica",
      },
      "especificaciones2": {
        "title": "Micrófono integrado\t",
        "description": "Sí",
      },
      "especificaciones3": {
        "description": "20-25 hrs",
        "title": "Duración de carga\t",
      },
      "especificaciones4": {
        "title": "Interfaz de carga\t",
        "description": "USB Tipo C",
      },
    },
    "envio": {
      "gratis": false,
      "costo": 39999,
      "tiempo_estimado": "5 dias",
    },
    "comments": null,
    "createdAt": "2025-02-16T20:50:09.395Z",
    "updatedAt": "2025-02-16T20:50:09.395Z",
  },
  {
    "id_product": "c24e0202-2ddf-42f1-9578-ab72a93ace45",
    "title": "Tenis Deportivos Puma Court Classic Blanco Zapatillas",
    "description":
      "Los Tenis Deportivos Puma Court Classic Blanco para hombre ofrecen una combinación impecable de estilo y funcionalidad. Diseñados para hombres que buscan un calzado versátil y moderno, estos tenis son perfectos para actividades casuales y deportivas. Su diseño clásico en color blanco brinda elegancia y facilidad para combinar con cualquier outfit. En RunwayShop, como distribuidores autorizados, garantizamos un producto 100% original, respaldado por la calidad excepcional de Puma.\n\nEstos tenis destacan por su confort superior, proporcionado por una plantilla acolchonada que reduce la fatiga en cada paso. La suela de goma antideslizante asegura estabilidad, mientras que su construcción liviana permite una movilidad fluida. Fabricados con materiales de alta calidad, su resistencia al uso diario está garantizada, convirtiéndolos en una inversión ideal para tu guardarropa. Ya sea para caminar por la ciudad, asistir a eventos informales o realizar actividades ligeras, los Tenis Puma Court Classic Blanco Hombre son tu mejor elección.\n\nEn RunwayShop, nos enorgullece ofrecerte un producto que combina moda, comodidad y funcionalidad, reforzado con nuestra posición como distribuidores autorizados de Puma. Estos tenis no solo son un símbolo de estilo, sino también una garantía de calidad y durabilidad.",
    "price": 347700,
    "discount": 24,
    "category": "Zapatillas",
    "brand": "Puma",
    "warranty": "1 Mes",
    "rating": null,
    "units": 100,

    "launch_date": "2025-02-16T00:00:00.000Z",
    "origin": "España",
    "images": [
      "https://res.cloudinary.com/dd3kdqnzg/image/upload/v1739743687/kbx1rfxwvuqs5uxj6vjf.png",
    ],
    "especificaciones": {
      "especificaciones0": {
        "title": "Modelo",
        "description": "Court Classic",
      },
      "especificaciones1": {
        "title": "Color",
        "description": "Blanco",
      },
      "especificaciones2": {
        "title": "Material de la Suela",
        "description": "Goma antideslizante",
      },
      "especificaciones3": {
        "title": "Cierre",
        "description": "Cordones ajustables",
      },
      "especificaciones4": {
        "title": "Género",
        "description": "Hombre",
      },
      "especificaciones5": {
        "title": "Estilo",
        "description": "Casual, Deportivo",
      },
      "especificaciones6": {
        "title": "Distribuidor",
        "description": "RunwayShop (Distribuidor autorizado)",
      },
    },
    "envio": {
      "gratis": true,
      "costo": 0,
      "tiempo_estimado": "7 dias",
    },
    "comments": null,
    "createdAt": "2025-02-16T22:07:54.836Z",
    "updatedAt": "2025-02-16T22:07:54.836Z",
  },
];

// npm install oidc-client-ts react-oidc-context --save

// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_tGfAvkPrv",
  client_id: "g238fpqci592nnhqhu390ict3",
  redirect_uri: "https://d84l1y8p4kdic.cloudfront.net",
  response_type: "code",
  scope: "phone openid email",
};

const root = ReactDOM.createRoot(document.getElementById("root"));

// wrap the application with AuthProvider
root.render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

// App.js

import { useAuth } from "react-oidc-context";

function App() {
  const auth = useAuth();

  const signOutRedirect = () => {
    const clientId = "g238fpqci592nnhqhu390ict3";
    const logoutUri = "<logout uri>";
    const cognitoDomain = "https://<user pool domain>";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
      logoutUri
    )}`;
  };

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <div>
        <pre> Hello: {auth.user?.profile.email} </pre>
        <pre> ID Token: {auth.user?.id_token} </pre>
        <pre> Access Token: {auth.user?.access_token} </pre>
        <pre> Refresh Token: {auth.user?.refresh_token} </pre>

        <button onClick={() => auth.removeUser()}>Sign out</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => auth.signinRedirect()}>Sign in</button>
      <button onClick={() => signOutRedirect()}>Sign out</button>
    </div>
  );
}

export default App;
