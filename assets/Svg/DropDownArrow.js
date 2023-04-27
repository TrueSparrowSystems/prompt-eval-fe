import React from "react";

export default function DropDownArrow(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={10}
      height={6}
      fill="none"
      {...props}
    >
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.2}
        d="M9 1 5 5 1 1"
      />
    </svg>
  );
}
