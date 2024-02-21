import React from "react";

import { IoMdClose } from "react-icons/io";

export default function Modal({ visible = false, onClose, children }) {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-white z-50 ${
        !visible && "hidden"
      }`}
    >
      <button className="absolute top-0 right-0 p-4" onClick={onClose}>
        <IoMdClose size={21} />
      </button>
      <div className="w-full h-full">{children}</div>
    </div>
  );
}
