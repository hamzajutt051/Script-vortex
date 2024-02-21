import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import React, { useState } from "react";

import "./auth.scss";
import useAuth from "../../hook/useAuth";
import useLoading from "../../hook/useLoading";

export default function LoginP() {
  const navigate = useNavigate();
  const { Login } = useAuth();
  const { state } = useLocation();

  const [errors, setErrors] = useState({});
  const { setLoading } = useLoading();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    await axios
      .post("auth/login", data)
      .then((res) => {
        console.log(res);

        Login(res.data.user, res.data.token);

        if (state?.from) {
          navigate(state?.from, { state });
          return;
        }
        navigate("/account");
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
            <div className="text-red-600 text-center md:text-left mb-2 border border-red-500 rounded bg-red-100 py-4 px-2">
              {errors.api}
            </div>
          )}
          <AuthInput
            type="text"
            name="email"
            placeholder="Email Address"
            value={data.email}
            onChange={handleChange}
          />

          <AuthInput
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
          />

          <div className="mt-4 flex justify-between font-semibold text-sm">
            <div />
            <Link
              className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
              to="/forget-password"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="text-center md:text-left">
            <button
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
              type="submit"
            >
              Login
            </button>
          </div>
          <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
            Don't have an account?{" "}
            <Link
              className="text-red-600 hover:underline hover:underline-offset-4"
              to="/register"
            >
              Register
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

const AuthInput = ({ type, name, placeholder, value, onChange }) => {
  return (
    <input
      className="text-sm w-full px-4 py-2 mb-2 border border-solid border-gray-300 rounded"
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};
