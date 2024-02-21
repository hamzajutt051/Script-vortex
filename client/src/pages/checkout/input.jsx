import React from "react";

export default function Input({
  label,
  value,
  onChange,
  error,
  type = "text",
  width = "w-full md:w-1/2",
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
      />
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
}

export function SelectInput({
  label,
  value,
  onChange,
  error,
  options,
  width = "w-full md:w-1/2",
}) {
  return (
    <div className={width + " px-3 mb-6"}>
      <label
        className="block uppercase tracking-wide text-gray-700 text-xs font-base mb-2"
        htmlFor="grid-first-name"
      >
        {label}
      </label>
      <select
        className="appearance-none block w-full  text-gray-700 border-2 border-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white "
        id="grid-first-name"
        value={value}
        onChange={onChange}
      >
        {options.map((option, i) => (
          <option key={i} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
}
