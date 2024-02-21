import { toast } from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

import React, { useState } from "react";

import ErrorAlert from "../../components/AlertError";
import "./auth.scss";
import useLoading from "../../hook/useLoading";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();

  const [errors, setErrors] = useState({});
  const { setLoading } = useLoading();
  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password.length < 6) {
      setErrors({ password: "Password must be atleast 6 characters" });
      return;
    }

    if (data.password !== data.confirmPassword) {
      setErrors({ password: "Password does not match" });
      return;
    }

    setLoading(true);
    await axios
      .post("auth/reset-password", {
        password: data.password,
        token,
      })
      .then((res) => {
        navigate("/login", {
          state: {
            message: "Password Reset Successfully",
          },
        });
        toast.success("Password Reset Successfully");
      })
      .catch((err) => {
        setErrors({ api: err?.response?.data?.message || err.message });
      });

    setLoading(false);
  };

  return (
    <div className="">
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
            value={data.confirmPassword}
            onChange={(e) =>
              setData({ ...data, confirmPassword: e.target.value })
            }
            error={errors.confirmPassword}
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
