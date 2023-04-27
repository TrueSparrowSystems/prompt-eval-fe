import React, { useState } from "react";
import RemoveIcon from "../../../../assets/Svg/RemoveIcon";

function NewChat({ prompt, remove }) {
  const [isHover, setIsHover] = useState(false);
  const [ptomptMessage, setPromptMessage] = useState(prompt.content);

  return (
    <li
      className="flex hover:bg-[#F8FAFB] p-2"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div
        className="uppercase cursor-pointer text-md hover:bg-[#CDE6F8] p-[10px] h-[40px] w-[60px] basis-20 rounded-[4px] flex items-center justify-center select-none"
        onClick={() => {
          prompt.role = prompt.role === "system" ? "user" : "system";
        }}
      >
        {prompt.role}
      </div>
      <textarea
        className={`w-full border rounded-[4px] h-[120px] p-[10px] ml-[40px] mr-[10px] outline-none ${
          isHover ? "border-[#2196F380] bg-[#F8FAFB]" : ""
        }`}
        value={ptomptMessage}
        onChange={(e) => {
          setPromptMessage(e.target.value);
        }}
        onBlur={(e) => {
          prompt.content = e.target.value;
        }}
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
        <RemoveIcon />
      </div>
    </li>
  );
}

export default NewChat;
