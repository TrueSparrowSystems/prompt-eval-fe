import React, { useState } from "react";
function ExperimentCell({
  experimentName,
  index,
  setSelectedExperiment,
  selectedExperiment,
}) {
  const [showEditIcon, setShowEditIcon] = useState(false);
  const renameExperiment = () => {}
  return (
    <div
      className={`flex items-center gap-[10px] p-[10px] cursor-pointer hover:bg-[#F0F0F0] ${
        selectedExperiment == index
          ? "bg-[#F8FAFB] rounded-[4px]"
          : "opacity-60"
      }`}
      onClick={() => {
        setSelectedExperiment(index);
      }}
      onMouseEnter={() => setShowEditIcon(true)}
      onMouseLeave={() => setShowEditIcon(false)}
    >
      <div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.5001 2V5C12.5001 5.55228 12.9478 6 13.5001 6H16.5001M7.00007 15V11M10.0001 15L10.0001 7M13.0001 15V11M15.0001 3.5C14.555 3.10178 14.0932 2.62948 13.8016 2.32273C13.6076 2.11861 13.3395 2 13.0579 2H5.49983C4.39527 2 3.49984 2.89542 3.49983 3.99999L3.49976 15.9999C3.49975 17.1045 4.39518 18 5.49975 18L14.4998 18C15.6043 18 16.4998 17.1046 16.4998 16L16.5001 5.39819C16.5001 5.14249 16.4025 4.8967 16.2251 4.71261C15.8969 4.3722 15.3489 3.8121 15.0001 3.5Z"
            stroke="black"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="text-[13px] text-[#000]">{experimentName}</div>
      <button className={`ml-auto hover:bg-[#0000001A] p-[5px] ${showEditIcon ? "opacity-100" : "opacity-0"}`} title='Rename' onClick={() => {renameExperiment()}}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.96578 4.63461L11.3658 7.03461M2.96582 13.0346L5.87648 12.4481C6.03099 12.417 6.17287 12.3409 6.2843 12.2294L12.8001 5.71007C13.1125 5.3975 13.1123 4.89084 12.7996 4.57853L11.4193 3.19981C11.1068 2.88764 10.6004 2.88785 10.2881 3.20029L3.77166 9.72032C3.66045 9.83159 3.58452 9.97318 3.55336 10.1274L2.96582 13.0346Z"
            stroke="black"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

export default ExperimentCell;
