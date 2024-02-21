import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import toast from "react-hot-toast";
import { Country } from "country-state-city";

import * as React from "react";

import Input, { SelectInput } from "./Input";
import useLoading from "../../hook/useLoading";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: window.innerWidth < 600 ? window.innerWidth - 20 : 600,
  p: 4,
  borderRadius: 2,
};

const countries = Country.getAllCountries().map((country) => {
  return {
    value: country.name,
    label: country.name,
  };
});

export default function UpdateModal({ open, handleClose, address, getOrder }) {
  const [data, setData] = React.useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    zipcode: "",
    contactMail: "",
    area: "",
    contactPhone: "",
  });
  const [errors, setErrors] = React.useState({});
  const { setLoading } = useLoading();

  React.useEffect(() => {
    setData(address);
  }, [address]);

  const updateAddress = async () => {
    const errors = validate(data);
    setErrors(errors);
    console.log(errors);
    if (Object.keys(errors).length !== 0) return;

    setLoading(true);
    await axios
      .patch("order/update-address/" + address?._id, {
        ...data,
      })
      .then((res) => {
        getOrder();
        toast.success("Address updated successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      })
      .finally(() => {
        setLoading(false);
        handleClose();
      });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 z-10">
          <button
            onClick={handleClose}
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-hide="popup-modal"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-6 max-h-[90vh] overflow-auto">
            {/*  */}
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

            <Input
              name="email"
              label="Email"
              value={data?.email}
              disabled
              error={errors?.email}
              width="w-full"
            />

            <Input
              name="phone"
              label="Phone"
              value={data?.phone}
              onChange={(e) => {
                setData({ ...data, phone: phoneNumberFormat(e.target.value) });
              }}
              error={errors?.phone}
              width="w-full"
            />

            <SelectInput
              name="country"
              label="Country"
              value={data?.country}
              onChange={(e) => {
                setData({ ...data, country: e.target.value });
              }}
              error={errors?.country}
              width="w-full"
              options={countries}
            />

            <Input
              name="city"
              label="City"
              value={data?.city}
              onChange={(e) => {
                setData({ ...data, city: e.target.value });
              }}
              error={errors?.city}
              width="w-full"
            />

            <Input
              name="area"
              label="Area"
              value={data?.area}
              onChange={(e) => {
                setData({ ...data, area: e.target.value });
              }}
              error={errors?.area}
              width="w-full"
            />

            <Input
              name="address"
              label="Address"
              value={data?.address}
              onChange={(e) => {
                setData({ ...data, address: e.target.value });
              }}
              error={errors?.address}
              width="w-full"
            />

            <Input
              name="zipcode"
              label="Zipcode"
              value={data?.zipcode}
              onChange={(e) => {
                setData({ ...data, zipcode: e.target.value });
              }}
              error={errors?.zipcode}
              width="w-full"
            />

            <Input
              name="contactMail"
              label="Contact Email"
              value={data?.contactMail}
              onChange={(e) => {
                setData({ ...data, contactMail: e.target.value });
              }}
              error={errors?.contactMail}
              width="w-full"
            />

            <Input
              name="contactPhone"
              label="Alt Phone Number"
              value={data?.contactPhone}
              onChange={(e) => {
                setData({
                  ...data,
                  contactPhone: phoneNumberFormat(e.target.value),
                });
              }}
              error={errors?.contactPhone}
              width="w-full"
            />

            <div className="h-[50px]" />

            {/*  */}
            <div className="flex justify-center items-center mt-6 absolute bottom-0 left-0 right-0 py-2 bg-slate-50">
              <button
                onClick={handleClose}
                data-modal-hide="popup-modal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 text-center mr-2"
              >
                Cancel
              </button>
              <button
                onClick={updateAddress}
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-slate-800 hover:bg-slate-900 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

const validate = (data) => {
  const errors = {};
  if (!data.name) errors.name = "Name is required";
  if (!data.email) errors.email = "Email is required";
  if (!data.phone) errors.phone = "Phone is required";
  if (!data.address) errors.address = "Address is required";
  if (!data.city) errors.city = "City is required";

  if (!data.zipcode) errors.zipcode = "Zipcode is required";

  return errors;
};

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
