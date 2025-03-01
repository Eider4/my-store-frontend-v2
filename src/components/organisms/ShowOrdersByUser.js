"use client";
import { getUserLocalStorageAndSessionStorage } from "@/service/auth/auth.service";
import { getOrdersByIdUser } from "@/service/order/order.service";
import { useEffect, useState } from "react";
import CardOrder from "../molecules/CardOrder";

export default function ShowOrdersByUser() {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const getUser = async () => {
    try {
      const userGet = await getUserLocalStorageAndSessionStorage();
      setUser(userGet);
    } catch (error) {
      console.log("error al obtener usuario", error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        const response = await getOrdersByIdUser(user.id_user);
        setOrders(response);
        console.log("response", response);
      } catch (error) {
        console.log("error al obtener los productos", error);
      }
    };
    fetchOrders();
  }, [user]);

  return (
    <div>
      <h1>Estas son tus órdenes</h1>
      <div className="flex flex-wrap gap-4">
        {orders.map((order) => (
          <CardOrder key={order.id_order} order={order} />
        ))}
      </div>
    </div>
  );
}
