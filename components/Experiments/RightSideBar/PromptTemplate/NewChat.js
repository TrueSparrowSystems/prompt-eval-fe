import React, { useState } from "react";

function NewChat(props) {
  const [role, setRole] = useState("system");
  return (
    <div className="flex hover:bg-[#F8FAFB] p-2">
      <div
        className="uppercase cursor-pointer text-[13px] hover:bg-[#fff] p-[10px] h-[40px] basis-20"
        onClick={() => {
          if (role === "system") {
            setRole("user");
          }
          if (role === "user") {
            setRole("system");
          }
        }}
      >
        {role}
      </div>
        <textarea
          className="w-full border rounded-[4px] h-[120px] p-[10px] ml-[40px] mr-[10px] outline-none"
          placeholder="Define template variables in {‘variable_name’} format within the prompt."
        />
        <div className="cursor-pointer">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
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
        </div>
      </div>
  );
}

export default NewChat;
