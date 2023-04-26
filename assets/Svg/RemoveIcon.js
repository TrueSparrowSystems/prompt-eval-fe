import React from "react";

function RemoveIcon(props) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      id={prompt.id}
    >
      <path
        d="M7 10H13M18 5L18 15.0001C18 16.6569 16.6569 18.0001 15 18.0001H5C3.34315 18.0001 2 16.6569 2 15.0001V5C2 3.34315 3.34315 2 5 2H15C16.6569 2 18 3.34315 18 5Z"
        stroke="black"
        strokeOpacity="0.4"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default RemoveIcon;
