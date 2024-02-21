import React from "react";
export default function Input({
  label,
  placeholder,
  value,
  name,
  onChange,
  type,
  error,
}) {
  return (
    <div className="relative mb-6" data-te-input-wrapper-init>
      <label
        htmlFor={name}
        className="py-4 text-sm text-gray-700 font-semibold"
      >
        {label}
      </label>
      <input
        type="text"
        className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border border-gray-100 shadow "
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
      />
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </div>
  );
}

export const SelectInput = ({
  label,
  name,
  value,
  onChange,
  options = [],
  error,
}) => {
  return (
    <div className="relative mb-6" data-te-input-wrapper-init>
      <label
        htmlFor={name}
        className="py-4 text-sm text-gray-700 font-semibold"
      >
        {label}
      </label>
      <select
        className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border border-gray-100 shadow"
        name={name}
        value={value}
        onChange={onChange}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </div>
  );
};
