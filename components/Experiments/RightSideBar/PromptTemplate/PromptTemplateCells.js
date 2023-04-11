import React from "react";
import Button from "@mui/material/Button";

function PromptTemplateCells({ PromptTemplate }) {
  return (
    <div className={`flex items-center text-[13px] border-b-2`}>
      <div className={`basis-1/5 border-r-2 px-[10px] py-[34px] mr-[10px]`}>
        {PromptTemplate.name}
      </div>
      <div className="basis-1/5 px-[10px]">{PromptTemplate.accuracy}</div>
      <div className="basis-1/5 px-[10px]">{PromptTemplate.model}</div>
      <div className="basis-1/5 px-[10px]">
        <div className="flex items-center gap-[10px]">
          <div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.4001 6.4001L6.82034 9.6001L5.6001 8.50931M14.4001 4.0001L14.4001 12.0002C14.4001 13.3257 13.3256 14.4002 12.0001 14.4002H4.0001C2.67461 14.4002 1.6001 13.3257 1.6001 12.0002V4.0001C1.6001 2.67461 2.67461 1.6001 4.0001 1.6001H12.0001C13.3256 1.6001 14.4001 2.67461 14.4001 4.0001Z"
                stroke="black"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>{PromptTemplate.date}</div>
        </div>
        <div className="flex items-center gap-[10px]">
          <div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.58325 5.71443H13.0833M3.94039 1.3335V2.47649M11.5833 1.3335V2.47635M13.8333 5.47635L13.8333 11.6668C13.8333 13.3237 12.4901 14.6668 10.8333 14.6668H4.83325C3.1764 14.6668 1.83325 13.3237 1.83325 11.6668V5.47635C1.83325 3.81949 3.1764 2.47635 4.83325 2.47635H10.8333C12.4901 2.47635 13.8333 3.81949 13.8333 5.47635Z"
                stroke="black"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>{PromptTemplate.status}</div>
        </div>
        <div className="flex items-center gap-[10px]">
          <div className="underline cursor-pointer">view report</div>
          <div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.6386 4.72053L11.3199 4.72045M11.3199 4.72045L11.3199 10.321M11.3199 4.72045L4.72026 11.3201"
                stroke="black"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="basis-1/5 flex items-center justify-around px-[10px]">
        <div>
          <Button variant="outlined">run</Button>
        </div>
        <div className="flex items-center gap-[20px]">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
          >
            <path
              d="M5 12L3 12C2.44771 12 2 11.5523 2 11L2 4C2 2.89543 2.89543 2 4 2L11 2C11.5523 2 12 2.44772 12 3L12 5M10 18L16 18C17.1046 18 18 17.1046 18 16L18 10C18 8.89543 17.1046 8 16 8L10 8C8.89543 8 8 8.89543 8 10L8 16C8 17.1046 8.89543 18 10 18Z"
              stroke="black"
              strokeOpacity="0.6"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
          >
            <path
              d="M11.2072 5.79302L14.2072 8.79302M3.70728 16.293L7.3456 15.5599C7.53874 15.521 7.71609 15.4259 7.85537 15.2865L16.0001 7.13734C16.3906 6.74663 16.3903 6.11331 15.9995 5.72292L14.2742 3.99952C13.8835 3.6093 13.2505 3.60957 12.8602 4.00012L4.71458 12.1502C4.57557 12.2892 4.48065 12.4662 4.44169 12.659L3.70728 16.293Z"
              stroke="black"
              strokeOpacity="0.6"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default PromptTemplateCells;
