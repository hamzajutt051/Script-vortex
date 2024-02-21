import { Country } from "country-state-city";

import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/auth";
import Input, { SelectInput } from "./input";

const countries = Country.getAllCountries().map((country) => {
  return {
    value: country.name,
    label: country.name,
  };
});

export default function Checkout({ setStep, coupon, data, setData }) {
  const navigate = useNavigate();

  const { user, isLoggedIn, Logout } = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const Proceed = () => {
    const errors = Validation(data);

    setErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    setStep("payment");
  };

  const Return = () => {
    navigate("/cart");
  };

  const phoneNumberFormat = (value) => {
    // const phoneNumber = value.replace(/[^0-9]/g, "");
    // const phoneNumberLength = phoneNumber.length;
    // if (phoneNumberLength < 5) return phoneNumber;
    // if (phoneNumberLength < 12) {
    //   return `${phoneNumber.slice(0, 4)}-${phoneNumber.slice(4)}`;
    // }
    // return `${phoneNumber.slice(0, 4)}-${phoneNumber.slice(4, 11)}`;
    // +971-XX-XXXXXXX format
    const phoneNumber = value.replace(/[^0-9]/g, "");
    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength < 3) return "+971";

    if (phoneNumberLength < 7) {
      return `+971-${phoneNumber.slice(3)}`;
    }

    if (phoneNumberLength < 12) {
      return `+971-${phoneNumber.slice(3, 5)}-${phoneNumber.slice(5)}`;
    }

    return `+971-${phoneNumber.slice(3, 5)}-${phoneNumber.slice(5, 12)}`;
  };

  return (
    <div>
      <div className="my-4 flex flex-row justify-between">
        <div>
          <span className="text-lg font-semibold">Contact Information</span>
        </div>
        {isLoggedIn ? (
          <div>
            <span>{user?.email}</span>
            <button
              className="bg-transparent text-slate-900 ml-3"
              onClick={Logout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <span>Already have an account?</span>
            <button
              className="bg-transparent text-slate-900 ml-3"
              onClick={() =>
                navigate("/login", {
                  state: { from: "/checkout", coupon: coupon },
                })
              }
            >
              Login
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-wrap -mx-3 ">
        <div className="w-full px-3 mb-12">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-base mb-2"
            htmlFor="grid-region"
          >
            Email
          </label>
          <input
            className="appearance-none block w-full  text-gray-700 border shadow border-slate-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-region"
            type="email"
            value={user?.email}
            disabled={isLoggedIn}
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
            }}
          />
          {errors?.email && (
            <span className="text-red-500 text-xs">{errors?.email}</span>
          )}
        </div>
      </div>
      <div className="mb-4">
        <span className="font-semibold text-lg ">Shipping Address</span>
      </div>
      <form className="">
        <div className="flex flex-wrap -mx-3 mb-6">
          <Input
            name="name"
            label="Name"
            value={data?.name}
            onChange={(e) => {
              setData({ ...data, name: e.target.value });
            }}
            error={errors?.name}
            width="w-full"
          />

          <SelectInput
            width="w-full"
            name="country"
            label="Country"
            value={data?.country}
            onChange={(e) => {
              setData({ ...data, country: e.target.value });
            }}
            options={countries}
            error={errors?.country}
          />

          <Input
            width="w-full"
            name="city"
            label="City"
            value={data?.city}
            onChange={(e) => {
              setData({ ...data, city: e.target.value });
            }}
            error={errors?.city}
          />

          <Input
            width="w-full"
            name="area"
            label="Area"
            value={data?.area}
            onChange={(e) => {
              setData({ ...data, area: e.target.value });
            }}
            error={errors?.area}
          />

          <Input
            width="w-full"
            name="street"
            label="Street/Address"
            value={data?.address}
            onChange={(e) => {
              setData({ ...data, address: e.target.value });
            }}
            error={errors?.address}
          />

          <Input
            name="zipcode"
            label="Zip Code"
            placeholder="Zip Code"
            value={data?.zipcode}
            onChange={(e) => {
              setData({ ...data, zipcode: e.target.value });
            }}
            error={errors?.zipcode}
          />

          <Input
            name="phone"
            label="Phone"
            placeholder="Phone Number"
            value={data?.phone}
            onChange={(e) => {
              setData({ ...data, phone: phoneNumberFormat(e.target.value) });
            }}
            error={errors?.phone}
          />

          <Input
            name="containEmail"
            label="Alt Email"
            placeholder="Contact Email"
            value={data?.contactMail}
            onChange={(e) => {
              setData({ ...data, contactMail: e.target.value });
            }}
            error={errors?.contactMail}
          />

          <Input
            name="containPhone"
            label="Alt Phone Number"
            placeholder="Alt Phone Number"
            value={data?.contactPhone}
            onChange={(e) => {
              setData({
                ...data,
                contactPhone: phoneNumberFormat(e.target.value),
              });
            }}
            error={errors?.contactPhone}
          />
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-base mb-2"
              htmlFor="grid-region"
            >
              order notes (optional)
            </label>
            <textarea
              id="message"
              rows="4"
              className="appearance-none block w-full  text-gray-700 border shadow border-slate-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              placeholder="Notes about your order, e.g. special notes for delivery."
              value={data?.notes}
              onChange={(e) => {
                setData({ ...data, notes: e.target.value });
              }}
            ></textarea>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-base mb-2"
              htmlFor="grid-region"
            >
              Any Extra information (optional)
            </label>
            <input
              className="appearance-none block w-full  text-gray-700 border shadow border-slate-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-region"
              type="text"
              value={data?.extraInfo}
              onChange={(e) => {
                setData({ ...data, extraInfo: e.target.value });
              }}
            />
          </div>
        </div>

        <div className=" -mx-3 mb-6">
          <div className="w-full px-3 flex flex-row">
            <input
              type="checkbox"
              className="default:ring-2"
              id="grid-region"
              name="save-info"
              value={data?.saveInfo}
              onChange={(e) => {
                setData({ ...data, saveInfo: !data.saveInfo });
              }}
            />
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-base ml-3"
              htmlFor="grid-region"
            >
              Save Info
            </label>
          </div>
        </div>

        <div>
          <button
            className="bg-slate-900 text-sm text-white p-4 mt-1 rounded-md"
            onClick={Proceed}
            type="button"
          >
            Continue to Payment
          </button>
          <button
            className=" font-semibold ml-2 text-sm text-slate-900 p-4 mt-1 rounded-md "
            onClick={Return}
            type={"button"}
          >
            Return to Cart
          </button>
        </div>
      </form>
    </div>
  );
}

const Validation = (data) => {
  const errors = {};

  if (!data?.name) {
    errors.name = "Name is required";
  }

  if (!data?.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(data?.email)) {
    errors.email = "Invalid Email";
  }

  if (!data?.country) {
    errors.country = "Country is required";
  }

  if (!data?.address) {
    errors.address = "Address is required";
  }

  if (!data?.city) {
    errors.city = "City is required";
  }

  if (!data?.zipcode) {
    errors.zipcode = "Zipcode is required";
  }

  if (!data?.area) {
    errors.area = "Area is required";
  }

  // phone number must be in format +971-XX-XXXXXXX
  if (!data?.phone) {
    errors.phone = "Phone is required";
  } else if (!/^\+971-\d{2}-\d{7}$/.test(data?.phone)) {
    errors.phone = "Invalid Phone";
  }

  if (data?.contactMail && !/\S+@\S+\.\S+/.test(data?.contactMail)) {
    errors.contactMail = "Invalid Email";
  }

  if (data?.contactPhone && !/^\+971-\d{2}-\d{7}$/.test(data?.contactPhone)) {
    errors.contactPhone = "Invalid Phone";
  }

  return errors;
};
