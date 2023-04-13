import React from "react";

export default function TestCaseInfo(props) {
  return (
    <div>
      <textarea
        className="w-full border rounded-[4px] h-[120px] p-[10px] outline-none"
        placeholder="Define template variables in {‘variable_name’} format within the prompt."
      />
      <div  className="border border-dashed border-[#00000033] my-[30px]"></div>
    </div>
  );
}
