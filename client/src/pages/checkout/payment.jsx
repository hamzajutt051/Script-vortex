import React from "react";

import { currencyFormatterAED } from "../../utils/currencyFormatter";

export default function Payment({
  setStep,
  data,
  setPayment,
  payment,
  cart,
  total,
  subtotal,
  coupon,
  discount,
  confirmOrder,
  clientSecret,
  setPay,
  loading,
}) {
  const [error, setError] = React.useState({});

  const Proceed = async () => {
    setError({});
    if (!payment)
      return setError({ payment: "Please select a payment method" });

    await confirmOrder({
      ...data,
      paymentMethod: payment,
      cart,
      subtotal,
      total,
      coupon,
      discount,
    });

    // navigate('/account')
  };

  const Return = () => {
    setStep("shipping");
  };

  return (
    <div>
      <div className="border border-gray-200 p-4  rounded-md bg-white">
        <div className=" grid-cols-4 gap-4 flex justify-between flex-row mb-3">
          <span className="text-gray-400">Contact</span>
          <span className="col-span-2">{data?.email}</span>
          <button
            onClick={() => setStep("information")}
            className="bg-transparent font-semibold text-sm text-slate-900"
          >
            Change
          </button>
        </div>
        <hr />
        <div className=" grid-cols-4 gap-4 flex justify-between flex-row mt-3 mb-2">
          <span className="text-gray-400">Ship to</span>
          <span className="col-span-2">{data?.address}</span>
          <button
            onClick={() => setStep("information")}
            className="bg-transparent font-semibold text-sm text-slate-900"
          >
            Change
          </button>
        </div>
        <hr />
        <div className=" grid-cols-4 gap-4 flex justify-between flex-row mt-3 ">
          <span className="text-gray-400">Method</span>
          <span className="col-span-2">Delivery Charges</span>
          {/* <span className="">{currencyFormatterAED(10)}</span> */}
          <span className="">Free</span>
        </div>
      </div>

      <div className="mt-8">
        <h1 className="font-medium text-lg">Payment</h1>
        <span className="text-gray-500">
          All transactions are secured and encrypted
        </span>
        {/* <div className="mt-4 px-4 pt-3 border border-gray-200 rounded-md bg-white ">
          <div className="flex items-center mb-4">
            <input
              id="radio"
              type="radio"
              value=""
              name="radio"
              className="w-4 h-4 text-slate-900 "
              onChange={(e) => setPayment("cash")}
              checked={payment === "cash"}
            />
            <label htmlFor="default-radio-1" className="ml-2 ">
              Cash on Delivery
            </label>
          </div>
        </div> */}
        <div className="mt-4 px-4 pt-3 border border-gray-200 rounded-md bg-white ">
          <div className="flex items-center mb-4">
            <input
              id="radio"
              type="radio"
              value=""
              name="radio"
              className="w-4 h-4 border border-slate-900 text-slate-900 "
              onChange={(e) => setPayment("stripe")}
              checked={payment === "stripe"}
            />
            <label htmlFor="default-radio-1" className="ml-2 ">
              Card
            </label>
          </div>
        </div>
        {error.payment && (
          <span className="text-red-500 text-sm">{error.payment}</span>
        )}

        <div className="mt-6">
          {loading ? (
            <button className="bg-slate-900 text-white rounded-md text-sm  p-4">
              Processing...
            </button>
          ) : (
            <>
              {clientSecret && payment === "card" ? (
                <button
                  className="bg-slate-900 text-white rounded-md text-sm  p-4"
                  onClick={() => setPay(true)}
                >
                  Pay Now
                </button>
              ) : (
                <button
                  className="bg-slate-900 text-white rounded-md text-sm  p-4"
                  onClick={Proceed}
                >
                  Complete Order
                </button>
              )}
            </>
          )}
          <button
            className="text-slate-900 rounded-md text-sm font-semibold ml-2  p-4"
            onClick={Return}
          >
            {" "}
            Return to Information
          </button>
        </div>
      </div>
    </div>
  );
}
