import axios from "axios";
import { toast } from "react-hot-toast";
import { Country } from "country-state-city";

import React, { useEffect, useRef, useState } from "react";

import Input, { SelectInput } from "./Input";
import useLoading from "../../hook/useLoading";
import useAuth from "../../hook/useAuth";
import { Link, useNavigate } from "react-router-dom";

const countries = Country.getAllCountries().map((country) => {
  return {
    value: country.name,
    label: country.name,
  };
});

export default function EditAccount() {
  const { setLoading } = useLoading();
  const { Logout } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    country: "",
    city: "",
    address: "",
    phone: "",
    area: "",
    zipcode: "",
    contactMail: "",
    contactPhone: "",
  });
  const [errors, setErrors] = useState({});

  const phoneNumberFormat = (value) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = Validation(data);

    setErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    setLoading(true);

    const formData = data;

    setLoading(true);

    await axios
      .patch("/auth/update-profile", formData)
      .then((res) => {
        toast.success("Your account has been updated successfully");
      })
      .catch((err) => {
        setErrors({ api: err?.response?.data?.message });
      });

    setLoading(false);
  };

  useEffect(() => {
    const getUser = async () => {
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
            avatar: user.avatar,
            zipcode: user.zipcode,
            contactMail: user.contactMail,
            contactPhone: user.contactPhone,
            area: user.area,
          });
        })
        .catch((err) => setErrors({ api: err?.response?.data?.message }));

      setLoading(false);
    };

    getUser();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,_50%)]  justify-center bg-slate-50">
      <div className="grid grid-cols-1 gap-4 border-2 shadow my-10">
        <div className="flex justify-center items-center flex-col mt-5">
          <p className="text-gray-500 text-sm ">Currently Login as</p>
          <p className="text-gray-700 text-lg font-semibold">{data?.email}</p>
          <button
            className="text-red-500 text-sm ml-2"
            onClick={() => {
              Logout();
              navigate("/login");
            }}
          >
            Logout
          </button>

          <Link
            to="/account/orders"
            className="bg-[#031e4a] text-white text-sm px-4 py-2 rounded-md mt-2"
          >
            View Orders
          </Link>
        </div>

        <div className="col-span-1 w-100 sm:p-5 bg-white">
          {errors.api && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-2"
              role="alert"
            >
              <span className="block sm:inline">{errors.api}</span>
            </div>
          )}

          <form className="mx-7" onSubmit={handleSubmit}>
            <Input
              label="Name"
              name={"name"}
              placeholder="John"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              error={errors.name}
            />

            <Input
              label="Email"
              name={"email"}
              placeholder=""
              value={data.email}
              // onChange={(e) => setData({ ...data, email: e.target.value })}
              error={errors.email}
            />

            <Input
              label="Phone"
              name={"phone"}
              placeholder="03xx-xxxxxxx"
              value={data.phone}
              onChange={(e) =>
                setData({ ...data, phone: phoneNumberFormat(e.target.value) })
              }
              error={errors.phone}
            />

            <SelectInput
              label="Country"
              name={"country"}
              placeholder="Pakistan"
              value={data.country}
              onChange={(e) => setData({ ...data, country: e.target.value })}
              error={errors.country}
              options={countries}
            />

            <Input
              label="City"
              name={"city"}
              placeholder="Lahore"
              value={data.city}
              onChange={(e) => setData({ ...data, city: e.target.value })}
              error={errors.city}
            />

            <Input
              label="Address"
              name={"address"}
              placeholder="House # 123, Street # 123, ABC Road"
              value={data.address}
              onChange={(e) => setData({ ...data, address: e.target.value })}
              error={errors.address}
            />

            <Input
              label="Area"
              name={"area"}
              placeholder="Gulberg, DHA, etc."
              value={data.address}
              onChange={(e) => setData({ ...data, area: e.target.value })}
              error={errors.area}
            />

            <Input
              label="Zipcode"
              name={"zipcode"}
              placeholder="12345"
              value={data.zipcode}
              onChange={(e) => setData({ ...data, zipcode: e.target.value })}
              error={errors.zipcode}
            />

            <Input
              label="Contact Mail"
              name={"contactMail"}
              placeholder="example@xyz.com"
              value={data.contactMail}
              onChange={(e) =>
                setData({ ...data, contactMail: e.target.value })
              }
              error={errors.contactMail}
            />

            <Input
              label="Alt Phone Number"
              name={"contactPhone"}
              placeholder="+971-xx-xxxxxxx"
              value={data.contactPhone}
              onChange={(e) =>
                setData({
                  ...data,
                  contactPhone: phoneNumberFormat(e.target.value),
                })
              }
              error={errors.contactPhone}
            />

            <div className="flex justify-center">
              <button
                type="button"
                className=" bg-gray-100 text-gray-700 text-sm px-6  py-2 font-semibold rounded-md"
              >
                Cancel
              </button>
              <button
                className="btn rounded-md w-100 bg-[#031e4a]   title-font ml-3 text-white px-6 py-2 text-sm"
                style={{ minWidth: "100px" }}
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const Validation = (data) => {
  const errors = {};

  if (!data?.name) {
    errors.name = "Name is required";
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

  if (!data?.area) {
    errors.area = "Area is required";
  }

  if (!data?.zipcode) {
    errors.zipcode = "Zipcode is required";
  } else if (!/^[0-9]{5}$/.test(data?.zipcode)) {
    errors.zipcode = "Invalid zipcode";
  }

  if (!data?.phone) {
    errors.phone = "Phone is required";
  } else if (!/^\+971-\d{2}-\d{7}$/.test(data?.phone)) {
    errors.phone = "Invalid Phone";
  }

  return errors;
};
