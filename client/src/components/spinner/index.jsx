import React from "react";

import "./spinner.css";

const LoadingSpinner = (props) => {
  return (
    <div
      className={`${props.asOverlay && "loading-spinner__overlay z-[1000]"}`}
    >
      <div className="text-center">
        <div className="lds-dual-ring"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
