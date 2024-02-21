import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

import React, { useEffect, useState } from "react";

import Details from "./details";
import Payment from "./payment";
import Checkout from "./checkout";
import CheckoutForm from "./stripeForm";
import useCart from "../../hook/useCart";
import useAuth from "../../hook/useAuth";
import useLoading from "../../hook/useLoading";
import checkoutImage from "../../assets/images/checkout.jpg";
import BreadCrumb from "../../components/checkout/breadcrumbs";
import { currencyFormatterAED } from "../../utils/currencyFormatter";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { setLoading } = useLoading();
  const { cart, clearCart, loading } = useCart();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const { user, isLoggedIn } = useAuth();

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const steps = [
    {
      title: "Cart",
      action: () => {
        navigate("/cart");
      },
    },
    {
      title: "Information",
      step: "information",
      action: () => {
        setStep("information");
      },
    },
    // {
    //   title: "Shipping",
    //   step: "shipping",
    //   action: () => {
    //     setStep("shipping");
    //   },
    //   dependent: ["information"],
    // },
    {
      title: "Payment",
      step: "payment",
      action: () => {
        setStep("payment");
      },
      dependent: ["information"],
    },
  ];

  const [step, setStep] = useState("information");
  const [tot, setTot] = useState(0);
  const [error, setError] = useState({});
  const [data, setData] = useState({
    userId: user?.id || "",
    name: "",
    email: "",
    country: "United Arab Emirates",
    city: "",
    address: "",
    phone: "+971",
    contactMail: "",
    note: "",
    extraInfo: "",
    saveInfo: false,
  });

  const [payment, setPayment] = useState();
  const [clientSecret, setClientSecret] = useState("");
  const [pay, setPay] = useState(false);

  const confirmOrder = async (data) => {
    setLoading(true);

    await axios
      .post(`order/create-order`, data)
      .then((res) => {
        setLoading(false);
        const order = res?.data;
        console.log(order);
        if (order?.paymentInfo?.clientSecret) {
          setClientSecret(order.paymentInfo.clientSecret);
          setPay(true);
          return;
        }

        navigate(isLoggedIn ? "/account/orders" : "/");
        clearCart();
      })
      .catch((err) => {
        setError({ api: err?.response?.data?.message || err.message });
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const getUser = async () => {
      if (!isLoggedIn) return;

      setLoading(true);

      await axios
        .get("/auth/get-basic-profile")
        .then((res) => {
          const user = res.data.user;

          setData({
            name: user.name,
            email: user.email,
            country: user.country,
            city: user.city,
            address: user.address,
            phone: user.phone,
            name: user.name,
            contactMail: user.contactMail,
            zipcode: user.zipcode,
            contactPhone: user.contactPhone,
            area: user.area,
          });
        })
        .catch((err) => console.log({ api: err?.response?.data?.message }));

      setLoading(false);
    };

    getUser();
  }, []);

  useEffect(() => {
    let t = total;

    if (discount) {
      t = t - (t * discount) / 100;
    }

    setTot(t);
  }, [total, discount]);

  useEffect(() => {
    if (cart.length === 0) navigate("/");
  }, [cart]);

  const handleCoupon = async () => {
    setError({});
    if (!coupon) return;
    setDiscount(0);

    setLoading(true);

    await axios
      .get("/coupon/" + coupon)
      .then((res) => {
        // setLoading(false);
        // setTot(res.data.total);
        setDiscount(res.data.discount);
      })
      .catch((err) => {
        setError({ coupon: err?.response?.data?.message || err.message });
      })
      .finally(() => setLoading(false));
  };

  return (
    <section className="text-gray-600 body-font relative bg-slate-50 min-h-screen">
      <div className="container  flex flex-wrap flex-col-reverse lg:flex-row mx-auto py-5">
        <div className="w-full lg:w-6/12 rounded-lg overflow-hidden mx-auto p-3">
          <BreadCrumb steps={steps} currentStep={step} />
          {error?.api && (
            <span className="block sm:inline text-red-900">{error?.api}</span>
          )}
          {step === "information" && (
            <Checkout setStep={setStep} data={data} setData={setData} />
          )}
          {/* {step === "shipping" && (
            <Details
              setStep={setStep}
              data={data}
              shipping={shipping}
              setShipping={setShipping}
            />
          )} */}
          {step === "payment" && (
            <Payment
              setStep={setStep}
              data={data}
              payment={payment}
              setPayment={setPayment}
              cart={cart}
              total={tot}
              confirmOrder={confirmOrder}
              setPay={setPay}
              clientSecret={clientSecret}
              loading={loading}
              subtotal={total}
              coupon={coupon}
              discount={discount}
            />
          )}
        </div>
        <div className="w-full lg:w-4/12 lg:mr-auto md:mt-0 p-3">
          <div className=" bg-white border-gray-100 border rounded-md shadow p-5">
            {cart.map((prod, index) => {
              return (
                <div className="flex flex-row justify-between" key={index}>
                  <div>
                    <img
                      className="w-12 h-16 rounded-md border-gray-400 object-contain"
                      src={checkoutImage}
                    />
                  </div>
                  <span className="font-semibold pt-3 capitalize">
                    {prod?.title}
                  </span>
                  <div className="flex flex-col ">
                    {/* <span>Rs 1000.00</span> */}
                    <span className="text-green-500">
                      {currencyFormatterAED(prod?.price * prod?.quantity)}
                    </span>
                  </div>
                </div>
              );
            })}

            <hr className="mt-4 shadow" />

            <div className="text-gray-600 text-sm mt-6 flex flex-row justify-between">
              <span>Subtotal</span>
              <span>{currencyFormatterAED(total)}</span>
            </div>
            <div className="text-gray-600 text-sm my-5 flex flex-row justify-between">
              <span>Shipping</span>
              {/* {shipping ? (
                <span>
                  {shipping <= 0 ? "Free" : currencyFormatterAED(shipping)}
                </span>
              ) : (
                <span>----</span>
              )} */}
              <span>Free</span>
            </div>
            <div className="text-gray-600 text-sm mt-6 flex flex-row justify-between">
              <span>Discount</span>
              <span>
                {discount
                  ? currencyFormatterAED((total * discount) / 100)
                  : "----"}
              </span>
            </div>

            <hr className="shadow" />

            <div className="my-3 flex flex-row justify-between">
              <div className="flex-1">
                <input
                  className="border border-gray-100 shadow p-3  text-sm rounded-md w-full"
                  placeholder={"Coupon Code"}
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />
              </div>
              <div>
                <button
                  onClick={handleCoupon}
                  className="bg-slate-900 text-sm text-white p-2 mt-1 rounded-md px-4 ml-1"
                >
                  Apply
                </button>
              </div>
            </div>
            {error?.coupon && (
              <div className="text-red-500 text-sm">{error?.coupon}</div>
            )}

            <hr className="shadow" />

            <div className="text-gray-600 text-sm my-5 font-semibold flex flex-row justify-between">
              <span>Total</span>
              <span>{currencyFormatterAED(tot)}</span>
            </div>
          </div>
        </div>
        {/* <div className="hidden lg:block lg:w-1/12"></div> */}
      </div>
      {clientSecret && (
        <Elements
          options={{
            clientSecret,
            theme: "stripe",
          }}
          stripe={stripePromise}
        >
          <CheckoutForm
            setStep={setStep}
            data={data}
            clientSecret={clientSecret}
            pay={pay}
            handleClose={() => {
              setPay(false);
            }}
            clearCart={clearCart}
          />
        </Elements>
      )}
    </section>
  );
}
