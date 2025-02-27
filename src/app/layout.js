"use client";
import HeaderComponent from "@/components/organisms/Headers.js";
import "./globals.css";
import { Suspense } from "react";
import Footer from "@/components/organisms/Footer";
import { ProductsIncartProvider } from "@/context/productsInCart";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>{/* Meta tags y otros elementos del head */}</head>
      <body className="relative">
        <Suspense fallback={<div>Loading...</div>}>
          <ProductsIncartProvider>
            <div className="bg-gray-100 text-center py-4 text-gray-700 mt-24">
              <HeaderComponent />
            </div>
            {children}
            <Footer />
          </ProductsIncartProvider>
        </Suspense>
      </body>
    </html>
  );
}
