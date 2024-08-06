import { useState } from "react";
import { useSendSTKPush } from "../../hooks/useSendSTKPush";

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

  // Hook for sending STK Push
  const { loading, sendSTKPush } = useSendSTKPush();

  // States for MPESA
  const [phoneNumber, setPhoneNumber] = useState("");

  // Submit phone for STK push
  const handlePhoneSubmit = () => {
    sendSTKPush(phoneNumber);
  };

  return (
    <div className="w-screen h-screen flex p-10 flex-col md:flex-row">
      <div className="flex-1 h-full  md:border-r border-b md:border-b-0 p-4">
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
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="border border-slate-400 rounded-md p-4 w-11/12 max-w-xs focus:outline-none"
              placeholder="07123..."
            />
            <button
              onClick={handlePhoneSubmit}
              disabled={phoneNumber.length < 10 || loading}
              className={`${
                phoneNumber.length < 10 || loading
                  ? "bg-blue-300"
                  : "bg-blue-500"
              } p-4 rounded-md text-white`}
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;