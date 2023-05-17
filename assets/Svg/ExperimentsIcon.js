import React from "react";

function ExperimentsIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      fill="none"
      {...props}
    >
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={0.6}
        strokeWidth={1.2}
        d="M12.5 2v3a1 1 0 0 0 1 1h3M7 15v-4m3 4V7m3 8v-4m2-7.5c-.445-.398-.907-.87-1.198-1.177A1.028 1.028 0 0 0 13.058 2H5.5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V5.398a.987.987 0 0 0-.275-.685c-.328-.34-.876-.9-1.225-1.213Z"
      />
    </svg>
  );
}

export default ExperimentsIcon;
