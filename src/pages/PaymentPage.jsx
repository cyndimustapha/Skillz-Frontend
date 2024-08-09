import { useState } from "react";
import axios from "axios";
import MpesaPaymentForm from "../components/MpesaPaymentForm";
import CreditCardPaymentForm from "../components/CreditCardPaymentForm";

const paymentMethods = [
  {
    id: 1,
    name: "Credit Card",
  },
  {
    id: 2,
    name: "MPESA",
  },
];

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [loading, setLoading] = useState(false);

  // Submit phone for STK push
  const handlePhoneSubmit = async () => {
    try {
      setLoading(true);
      await axios.post("http://localhost:8000/sendSTKPush");
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Submit card details
  const handleCardSubmit = async () => {
    console.log("Submitting card details");
  };

  return (
    <div
      className="w-screen h-screen flex p-10 flex-col md:flex-row"
      style={{ backgroundColor: "#5C8374" }}
    >
      <div className="flex-1 h-full md:border-r border-b md:border-b-0 p-4">
        <h1 className="text-4xl font-bold">
          Select your payment method to continue
        </h1>

        <div className="flex items-center gap-4 my-10">
          {paymentMethods.map((method, index) => (
            <div key={index}>
              <button
                onClick={() => {
                  setPaymentMethod(method.id);
                }}
                className={`border ${
                  paymentMethod === method.id
                    ? "border-blue-500 text-blue-500"
                    : "border-slate-400"
                } rounded-md px-8 p-4 text-xs md:text-base`}
              >
                {method.name}
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 h-full flex items-center justify-center">
        {!paymentMethod && (
          <p className="text-slate-400">No payment method selected</p>
        )}
        {paymentMethod === 2 && (
          <MpesaPaymentForm
            loading={loading}
            handlePhoneSubmit={handlePhoneSubmit}
          />
        )}
        {paymentMethod === 1 && (
          <CreditCardPaymentForm handleCardSubmit={handleCardSubmit} />
        )}
      </div>
    </div>
  );
};

export default PaymentPage;