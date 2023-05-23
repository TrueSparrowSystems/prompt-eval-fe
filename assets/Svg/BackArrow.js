import React from "react";

function BackArrow({isBlue=false}) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.7787 5.5575L10.7212 4.5L6.22119 9L10.7212 13.5L11.7787 12.4425L8.34369 9L11.7787 5.5575Z"
        fill={isBlue?"#2196F3":"black"}
        fillOpacity="0.6"
      />
    </svg>
  );
}

export default BackArrow;
