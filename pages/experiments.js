import React from "react";
import LeftSideBar from "../components/Experiments/LeftSideBar/LeftSideBar";
import RightSideBar from "../components/Experiments/RightSideBar/RightSideBar";

function Experiments(props) {
  return (
    <div className="flex">
      <div className="basis-2/12">
        <LeftSideBar />
      </div>
      <RightSideBar />
    </div>
  );
}

export default Experiments;
