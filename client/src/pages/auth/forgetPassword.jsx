import { useNavigate } from "react-router-dom";
import axios from "axios";

import React, { useState } from "react";

import LoadingSpinner from "../../components/spinner";
import "./auth.scss";
import toast from "react-hot-toast";
import useLoading from "../../hook/useLoading";

export default function ForgetPassword() {
  const navigate = useNavigate();
  const { setLoading } = useLoading();
  const [data, setData] = useState({
    email: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await axios
      .post("auth/forgot-password", data)
      .then((res) => {
        navigate("/login", {
          state: {
            message: "Check your email For verification link",
          },
        });
        toast.success("Check your email For verification link");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });

    setLoading(false);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="min-h-[80vh] flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0"
      >
        <div className="border md:p-5 md:py-[100px] bg-white md:w-[500px] w-full">
          <AuthInput
            type="text"
            name="email"
            placeholder="Email Address"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />

          <div className="text-center md:text-left">
            <button
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
              type="submit"
            >
              Forget Password
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

const AuthInput = ({ type, name, placeholder, value, onChange, error }) => {
  return (
    <div className="mb-2">
      <input
        className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && (
        <div className="mt-1">
          <p className="text-xs text-red-500">{error}</p>
        </div>
      )}
    </div>
  );
};
