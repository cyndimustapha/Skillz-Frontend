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
    <div className="content p-10 bg-gray-50 flex flex-col">
      <h1 className="text-3xl font-bold mb-6">Select your payment method to continue</h1>

      <div className="flex gap-4 mb-10">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => setPaymentMethod(method.id)}
            className={`border rounded-md px-6 py-3 text-base ${
              paymentMethod === method.id
                ? "border-blue-500 text-blue-500"
                : "border-gray-300"
            }`}
          >
            {method.name}
          </button>
        ))}
      </div>

      <div className="flex-1 flex items-center justify-center">
        {!paymentMethod && (
          <p className="text-gray-500">No payment method selected</p>
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
