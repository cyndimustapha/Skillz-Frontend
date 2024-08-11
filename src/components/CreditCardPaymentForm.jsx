/* eslint-disable react/prop-types */
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { faCcVisa, faCcMastercard, faCcAmex } from "@fortawesome/free-brands-svg-icons";

const countries = [
  { id: 1, name: "Kenya" },
  { id: 2, name: "Uganda" },
  { id: 3, name: "Tanzania" },
  { id: 4, name: "Burundi" },
  { id: 5, name: "Rwanda" },
];

const CreditCardPaymentForm = ({ handleCardSubmit }) => {
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [mm, setMm] = useState("");
  const [yy, setYy] = useState("");
  const [cvv, setCvv] = useState("");
  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("");

  // Function to determine the card type based on card number
  const getCardTypeIcon = () => {
    if (cardNumber.startsWith("4")) {
      return faCcVisa;
    } else if (cardNumber.startsWith("5")) {
      return faCcMastercard;
    } else if (cardNumber.startsWith("3")) {
      return faCcAmex;
    } else {
      return faCreditCard;
    }
  };

  return (
    <div className="space-y-4 text-lg text-gray-800">
      {/* Email Input */}
      <div className="flex flex-col">
        <label htmlFor="email" className="text- font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-slate-400 rounded-md p-3 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
        />
      </div>

      {/* Card Information */}
      <div className="flex flex-col">
        <label htmlFor="cardNumber" className="text- font-medium text-gray-700">
          Card Information
        </label>
        <div className="relative">
          <input
            id="cardNumber"
            name="cardNumber"
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="border border-slate-400 rounded-md p-3 pr-10 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Card Number"
          />
          {/* Dynamic card type icon */}
          <FontAwesomeIcon
            icon={getCardTypeIcon()}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500"
          />
        </div>
        <div className="flex gap-4 mt-2">
          <div className="flex-1">
            <label htmlFor="mm" className="text-sm font-medium text-gray-700 sr-only">
              MM
            </label>
            <input
              type="number"
              name="mm"
              id="mm"
              value={mm}
              onChange={(e) => setMm(e.target.value)}
              className="border border-slate-400 rounded-md p-3 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="MM"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="yy" className="text-sm font-medium text-gray-700 sr-only">
              YY
            </label>
            <input
              type="number"
              name="yy"
              id="yy"
              value={yy}
              onChange={(e) => setYy(e.target.value)}
              className="border border-slate-400 rounded-md p-3 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="YY"
            />
          </div>
        </div>
      </div>

      {/* CVV */}
      <div className="flex flex-col">
        <label htmlFor="cvv" className="text- font-medium text-gray-700">
          CVV
        </label>
        <input
          type="number"
          name="cvv"
          id="cvv"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          className="border border-slate-400 rounded-md p-3 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="CVV"
        />
      </div>

      {/* Full Name */}
      <div className="flex flex-col">
        <label htmlFor="fullName" className="text- font-medium text-gray-700">
          Full Name
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="border border-slate-400 rounded-md p-3 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Full Name"
        />
      </div>

      {/* Country Selection */}
      <div className="flex flex-col">
        <label htmlFor="country" className="text- font-medium text-gray-700">
          Country or Region
        </label>
        <select
          name="country"
          id="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="border border-slate-400 rounded-md p-3 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            Select Country
          </option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleCardSubmit}
        className="bg-blue-500 p-4 rounded-md text-white w-full mt-4 hover:bg-blue-600 transition-colors"
      >
        Submit
      </button>
    </div>
  );
};

export default CreditCardPaymentForm;