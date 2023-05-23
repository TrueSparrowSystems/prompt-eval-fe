import React from "react";
import LeftSideBar from "../../components/Experiments/LeftSideBar/LeftSideBar";
import RightSideBar from "../../components/Experiments/RightSideBar/RightSideBar";
import Toast from "../../components/ToastMessage/Toast";
import { useToastContext } from "../../context/ToastContext";

function Experiments() {
  const { showToast, toastMessage, toastType } = useToastContext();

  return (
    <div className="flex h-[100vh]">
      {showToast && <Toast msg={toastMessage} type={toastType} />}
      <div className="basis-3/13 py-[26px]">
        <LeftSideBar />
      </div>
      <div className="overflow-auto w-full bg-[#F3F4F6]">
      <div className="w-full md:px-[20px] lg:px-[35px] pt-[26px] pb-[38px]">
        <RightSideBar />
      </div>
      </div>
    </div>
  );
}

export default Experiments;