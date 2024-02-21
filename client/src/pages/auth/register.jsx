import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import React, { useState } from "react";
import "./auth.scss";

import ErrorAlert from "../../components/AlertError";
import toast from "react-hot-toast";
import useLoading from "../../hook/useLoading";

export default function RegisterP() {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const { setLoading } = useLoading();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    let error = Validator(data);

    setErrors(error);
    if (Object.keys(error).length > 0) return;

    setLoading(true);

    await axios
      .post("auth/signup", data)
      .then((res) => {
        toast.success("Account Created");
        navigate("/login");
      })
      .catch((err) => {
        let error = {};
        error.api = err?.response?.data?.message || err.message;
        setErrors(error);
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
          {errors.api && (
            <div className="mb-4">
              <ErrorAlert error={errors.api} />
            </div>
          )}

          <AuthInput
            type="text"
            name="name"
            placeholder="Name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />

          <AuthInput
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            error={errors.email}
          />

          <AuthInput
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            error={errors.password}
          />

          <AuthInput
            type="password"
            name="cpassword"
            placeholder="Confirm Password"
            value={data.cpassword}
            onChange={(e) => setData({ ...data, cpassword: e.target.value })}
            error={errors.cpassword}
          />

          <div className="text-center md:text-left">
            <button
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
              type="submit"
            >
              Register
            </button>
          </div>
          <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
            Already have an account?{" "}
            <Link
              className="text-red-600 hover:underline hover:underline-offset-4"
              to="/login"
            >
              Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
const Validator = (data) => {
  const error = {};

  if (!data.name) {
    error.name = "Name is required";
  }

  if (!data.email) {
    error.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)) {
    error.email = "Email is invalid";
  }

  if (!data.password) {
    error.password = "Password is required";
  }

  if (!data.cpassword) {
    error.cpassword = "Confirm Password is required";
  } else if (data.password !== data.cpassword) {
    error.cpassword = "Password does not match";
  }

  return error;
};

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
