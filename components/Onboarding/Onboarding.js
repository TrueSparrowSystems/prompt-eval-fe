import React from "react";

function Onboarding(props) {
  return (
    <div className="flex gap-[18px] justify-center">
      <div className="flex gap-[16px]">
        <svg
          width="54"
          height="54"
          viewBox="0 0 54 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="54" height="54" rx="3.375" fill="#2196F3" />
          <path
            d="M30.375 16.2002V20.2502C30.375 20.9958 30.9794 21.6002 31.725 21.6002H35.775M22.95 33.7502V28.3502M27 33.7502L27 22.9502M31.05 33.7502V28.3502M33.75 18.2252C33.1492 17.6876 32.5257 17.05 32.1321 16.6359C31.8702 16.3603 31.5083 16.2002 31.1281 16.2002H20.9247C19.4336 16.2002 18.2247 17.409 18.2247 18.9002L18.2246 35.1001C18.2246 36.5913 19.4334 37.8001 20.9246 37.8001L33.0746 37.8002C34.5658 37.8002 35.7746 36.5914 35.7747 35.1003L35.775 20.7878C35.775 20.4426 35.6433 20.1107 35.4038 19.8622C34.9607 19.4027 34.2209 18.6465 33.75 18.2252Z"
            stroke="white"
            strokeWidth="2.10938"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="text-[#000] text-[13px] w-[150px]">
          <div className="font-bold">Create an experiment</div>
          <div className="opacity-60">
            Use our template to track your experiments
          </div>
        </div>
      </div>
      <div className="flex gap-[16px]">
        <svg
          width="54"
          height="54"
          viewBox="0 0 54 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="54" height="54" rx="3.375" fill="#AF34FE" />
          <path
            d="M30.375 16.2002V20.2502C30.375 20.9958 30.9794 21.6002 31.725 21.6002H35.775M22.95 33.7502V28.3502M27 33.7502L27 22.9502M31.05 33.7502V28.3502M33.75 18.2252C33.1492 17.6876 32.5257 17.05 32.1321 16.6359C31.8702 16.3603 31.5083 16.2002 31.1281 16.2002H20.9247C19.4336 16.2002 18.2247 17.409 18.2247 18.9002L18.2246 35.1001C18.2246 36.5913 19.4334 37.8001 20.9246 37.8001L33.0746 37.8002C34.5658 37.8002 35.7746 36.5914 35.7747 35.1003L35.775 20.7878C35.775 20.4426 35.6433 20.1107 35.4038 19.8622C34.9607 19.4027 34.2209 18.6465 33.75 18.2252Z"
            stroke="white"
            strokeWidth="2.10938"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className="text-[#000] text-[13px] w-[150px]">
          <div className="font-bold">Generate multiple prompts</div>
          <div className="opacity-60">Keep record of prompts</div>
        </div>
      </div>
      <div className="flex gap-[16px]">
        <svg
          width="54"
          height="54"
          viewBox="0 0 54 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="54" height="54" rx="3.375" fill="#E8AA57" />
          <path
            d="M30.375 16.2002V20.2502C30.375 20.9958 30.9794 21.6002 31.725 21.6002H35.775M22.95 33.7502V28.3502M27 33.7502L27 22.9502M31.05 33.7502V28.3502M33.75 18.2252C33.1492 17.6876 32.5257 17.05 32.1321 16.6359C31.8702 16.3603 31.5083 16.2002 31.1281 16.2002H20.9247C19.4336 16.2002 18.2247 17.409 18.2247 18.9002L18.2246 35.1001C18.2246 36.5913 19.4334 37.8001 20.9246 37.8001L33.0746 37.8002C34.5658 37.8002 35.7746 36.5914 35.7747 35.1003L35.775 20.7878C35.775 20.4426 35.6433 20.1107 35.4038 19.8622C34.9607 19.4027 34.2209 18.6465 33.75 18.2252Z"
            stroke="white"
            strokeWidth="2.10938"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className="text-[#000] text-[13px] w-[150px]">
          <div className="font-bold">Get accurate reports</div>
          <div className="opacity-60">
            Add test cases for your use case and compare
          </div>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
