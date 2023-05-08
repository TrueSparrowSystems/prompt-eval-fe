import React from "react";
import LeftSideBar from "../../components/Experiments/LeftSideBar/LeftSideBar";
import RightSideBar from "../../components/Experiments/RightSideBar/RightSideBar";

function Experiments() {
  return (
    <div className="flex h-[100vh]">
      <div className="basis-2/12 py-[26px] ">
        <LeftSideBar />
      </div>
      <div className="bg-[#F3F4F6] w-full md:px-[20px] lg:px-[35px] py-[26px]">
        <RightSideBar />
      </div>
    </div>
  );
}

export default Experiments;

export async function getServerSideProps() {
  
  const data = {
  };
  return { props: { data } };
}