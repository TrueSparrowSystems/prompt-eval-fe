import React from "react";

function Pass(props) {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    {...props}
  >
    <path
      stroke="#2E7D32"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M9.4 5.4 5.82 8.6 4.6 7.51M13.4 3v8a2.4 2.4 0 0 1-2.4 2.4H3A2.4 2.4 0 0 1 .6 11V3A2.4 2.4 0 0 1 3 .6h8A2.4 2.4 0 0 1 13.4 3Z"
    />
  </svg>
  );
}

export default Pass;
