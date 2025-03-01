"use client";
import InfoUserForm from "@/components/organisms/InfoUserForm";
import ShowOrdersByUser from "@/components/organisms/ShowOrdersByUser";
import React, { useState } from "react";

export default function page() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState({});
  return (
    <div className="w-[80vw] flex  relative flex-col items-center justify-center">
      <div className="flex items-center justify-center gap-4 ml-[20vw]">
        <InfoUserForm setUserData={setUser} setStateBtns={setEditing} />
      </div>
      <div className="flex items-center justify-center gap-4 ml-[20vw]">
        <ShowOrdersByUser />
      </div>
    </div>
  );
}
