import React from "react";
import ExperimentsDetails from "./ExperimentsDetails";
function RightSideBar() {
  return (
    <div>
      <div className="font-bold text-[20px] text-[#000] pb-[10px]">RightSideBar</div>
      <div className="step-three">
        <div className="text-[13px] opacity-60 pt-[5px]">
          Use this template to track your experiments. Add your experiment
          description here.
        </div>
        <div className="text-[13px] opacity-60">
          Click + Add new template to create a new prompt template on this
          board.
        </div>
      </div>
      <ExperimentsDetails />
    </div>
  );
}

export default RightSideBar;
