/* eslint-disable react/prop-types */

import { useState } from "react";

const MpesaPaymentForm = ({ loading, handlePhoneSubmit }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  return (
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
          phoneNumber.length < 10 || loading ? "bg-blue-300" : "bg-blue-500"
        } p-4 rounded-md text-white`}
      >
        {loading ? "Loading..." : "Submit"}
      </button>
    </div>
  );
};

export default MpesaPaymentForm;