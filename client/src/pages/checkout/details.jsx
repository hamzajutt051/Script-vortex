import React, { useState } from "react";

import { currencyFormatterAED } from "../../utils/currencyFormatter";

export default function Details({ setStep, data, shipping, setShipping }) {
  const [errors, setErrors] = useState({});

  const Proceed = () => {
    if (!shipping) {
      setErrors({ shipping: "Please select a shipping method" });
      return;
    }

    setStep("payment");
  };

  const Return = () => {
    setStep("information");
  };

  return (
    <div className=" mr-3">
      <div className="border border-gray-200 p-4  rounded-md bg-white">
        <div className=" grid-cols-4 gap-4 flex justify-between flex-row mb-3 bg-white">
          <span className="text-gray-400">Contact</span>
          <span className="col-span-2">{data?.email}</span>
          <button
            onClick={() => setStep("information")}
            className="bg-transparent text-slate-900 font-semibold text-sm"
          >
            Change
          </button>
        </div>
        <hr />
        <div className=" grid-cols-4 gap-4 flex justify-between flex-row mt-3 ">
          <span className="text-gray-400">Ship to</span>
          <span className="col-span-2">{data?.address}</span>
          <button
            onClick={() => setStep("information")}
            className="bg-transparent text-slate-900 font-semibold text-sm"
          >
            Change
          </button>
        </div>
      </div>

      <div className="mt-12 px-4 pt-3 border border-gray-200 bg-white rounded-md  flex justify-between flex-row">
        <div className="flex items-center mb-4">
          <input
            id="radio"
            type="radio"
            value=""
            name="radio"
            className="w-4 h-4 text-slate-900 "
            onChange={(e) => setShipping(0)}
            checked={shipping === 0}
          />
          <label htmlFor="default-radio-1" className="ml-2 ">
            Delivery Charges
          </label>
        </div>
        {/* <span>{currencyFormatterAED(0)}</span> */}
        <span>Free</span>
      </div>
      {errors?.shipping && (
        <span className="text-red-500 text-xs">{errors?.shipping}</span>
      )}

      <div className="mt-6">
        <button
          className="bg-slate-900 text-white rounded-md text-sm  p-4"
          onClick={Proceed}
        >
          Continue to Payment
        </button>
        <button
          className="text-slate-900 rounded-md text-sm font-semibold ml-2  p-4"
          onClick={Return}
        >
          {" "}
          Return to Information
        </button>
      </div>
    </div>
  );
}
