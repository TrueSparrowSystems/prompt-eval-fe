import React from "react";

const CloseTooltip = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={10}
    height={10}
    fill="none"
    {...props}
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeWidth={0.8}
      d="M9 1 1 9m8 0L1 1"
    />
  </svg>
);
export default CloseTooltip;
