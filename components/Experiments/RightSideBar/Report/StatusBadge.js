import React from "react";

function StatusBadge({ status }) {
  return (
    <>
      {status === "failed" ? (
        <div className="border border-[#B3261E] bg-[#B3261E1A] rounded-[100px] flex items-center px-[15px] py-[2px] gap-[5px]">
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.75 1.25L1.25 8.75M8.75 8.75L1.25 1.25"
              stroke="#B3261E"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>

          <span className="text-[13px]">failed</span>
        </div>
      ) : (
        <div className="border border-[#2E7D32] bg-[#2E7D321A] rounded-[100px] flex items-center px-[15px] py-[2px] gap-[5px]">
          <svg
            width="10"
            height="8"
            viewBox="0 0 10 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.5999 1.2998L3.23026 6.6998L1.3999 4.85909"
              stroke="#2E7D32"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[13px]">Passed</span>
        </div>
      )}
    </>
  );
}

export default StatusBadge;