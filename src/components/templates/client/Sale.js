"use client";

import { use, useEffect, useState } from "react";
import ModalStepsSale from "../../molecules/ModalStepsSale";
import TableSaleProducts from "../../organisms/TableProductsSale";
import InfoUserForm from "../../organisms/InfoUserForm";
// import PaymentPortal from "../organisms/PaymentPago";
import ShowInfoSale from "../../organisms/ShowInfoSale";
import FinallySale from "../../organisms/FinallySale";
import Link from "next/link";
import PaymentPago from "../../organisms/PaymentPago";
import { useSearchParams } from "next/navigation";

export default function Sale() {
  const [steps, setSteps] = useState(1);
  const searchParams = useSearchParams();
  const [data, setData] = useState({
    products: [],
    user: {},
    paymentData: "",
  });
  const [stateBtns, setStateBtns] = useState({
    btnNext: true,
    btnBack: false,
  });
  const handleNextStep = () => setSteps((prev) => prev + 1);
  const handlePreviousStep = () => setSteps((prev) => Math.max(1, prev - 1));
  useEffect(() => {
    const redirectStatus = searchParams.get("redirect_status");

    if (redirectStatus) {
      setSteps(4);
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <ModalStepsSale
        steps={steps}
        btnNext={handleNextStep}
        btnBack={handlePreviousStep}
        btnNextText="Continuar"
        btnBackText="Volver"
        stateBtns={stateBtns}
      >
        {steps === 1 && (
          <div className="flex flex-col items-center justify-center">
            <TableSaleProducts
              setProducts={(products) =>
                setData({ ...data, products: products })
              }
              setStateBtns={setStateBtns}
            />
          </div>
        )}
        {steps === 2 && (
          <div className="flex flex-col items-center justify-center">
            <InfoUserForm
              setUserData={(user) => setData({ ...data, user: user })}
              setStateBtns={setStateBtns}
            />
          </div>
        )}
        {steps === 3 && (
          <div className="flex flex-col items-center justify-center">
            <ShowInfoSale
              setData={setData}
              data={data}
              setSteps={setSteps}
              setStateBtns={setStateBtns}
            />
          </div>
        )}
        {steps === 4 && (
          <div className="flex flex-col items-center justify-center">
            <PaymentPago
              setPaymentMethod={(paymentMethod) =>
                setData({ ...data, paymentMethod: paymentMethod })
              }
              setStateBtns={setStateBtns}
              data={data}
              setData={setData}
              setSteps={setSteps}
            />
          </div>
        )}

        {steps === 5 && (
          <div className="flex flex-col items-center justify-center">
            <FinallySale setStateBtns={setStateBtns} data={data} />
          </div>
        )}
      </ModalStepsSale>
    </div>
  );
}
