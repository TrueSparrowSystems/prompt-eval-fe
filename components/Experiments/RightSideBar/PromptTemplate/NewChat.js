import React, { useState } from "react";

function NewChat({ prompt, remove }) {
  const [role, setRole] = useState(prompt.role);
  const [isHover, setIsHover] = useState(false);
  return (
    <li
      className="flex hover:bg-[#F8FAFB] p-2"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div
        className="uppercase cursor-pointer text-[13px] hover:bg-[#fff] p-[10px] h-[40px] basis-20"
        onClick={() => {
          setRole(role === "system" ? "user" : "system");
        }}
      >
        {role}
      </div>
      <textarea
        className={`w-full border rounded-[4px] h-[120px] p-[10px] ml-[40px] mr-[10px] outline-none ${
          isHover ? "border-[#2196F380] bg-[#F8FAFB]" : ""
        }`}
        placeholder="Define template variables in {‘variable_name’} format within the prompt."
      />
      <div
        className={`cursor-pointer ${
          isHover ? "opacity-40  hover:opacity-60" : "opacity-0"
        }`}
        onClick={(e) => {
          remove(e.target.id);
        }}
      >
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
      </div>
    </li>
  );
}

export default NewChat;
