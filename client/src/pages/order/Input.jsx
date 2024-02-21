import React from "react";

export default function Input({
  label,
  value,
  onChange,
  error,
  type = "text",
  width = "w-full md:w-1/2",
  disabled = false,
}) {
  return (
    <div className={width + " px-3 mb-6"}>
      <label
        className="block uppercase tracking-wide text-gray-700 text-xs font-base mb-2"
        htmlFor="grid-first-name"
      >
        {label}
      </label>
      <input
        className="appearance-none block w-full  text-gray-700 border-2 border-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white "
        id="grid-first-name"
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
}

export const SelectInput = ({
  label,
  value,
  onChange,
  options = [],
  error,
  width = "w-full md:w-1/2",
}) => {
  return (
    <div className={width + " px-3 mb-6"}>
      <label
        className="block uppercase tracking-wide text-gray-700 text-xs font-base mb-2"
        htmlFor="grid-state"
      >
        {label}
      </label>
      <div className="relative">
        <select
          className="block appearance-none w-full bg-white border border-gray-100 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-state"
          value={value}
          onChange={onChange}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path
              fillRule="evenodd"
              d="M10 3a7 7 0 100 14 7 7 0 000-14zm0 12a5 5 0 110-10 5 5 0 010 10z"
            />
          </svg>
        </div>
      </div>
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
};
