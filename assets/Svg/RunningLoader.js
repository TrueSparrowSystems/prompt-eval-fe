import React from "react";

export default function RunningLoader(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      fill="none"
      {...props}
    >
      <path
        stroke="#D9A900"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.2}
        d="M8 4.2V1m0 14v-3.2M11.8 8H15M1 8h3.2m6.487-2.687L12.95 3.05m-9.9 9.9 2.263-2.263m5.374 0 2.263 2.263m-9.9-9.9 2.263 2.263"
      />
    </svg>
  );
}
