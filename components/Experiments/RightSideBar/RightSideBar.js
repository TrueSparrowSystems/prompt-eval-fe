import React, { useState } from "react";
import ExperimentsDetails from "./ExperimentsDetails";
function RightSideBar() {
  const [experimentName, setExperimentName] = useState("RightSideBar");
  const [experimentDescription, setExperimentDescription] = useState("Copy Use this template to track your experiments. Click + Add new template to create a new prompt template on this board.");
  return (
    <div>
      <div className="step-three">
        <div>
          <input
            value={experimentName}
            onChange={(e) => {
              setExperimentName(e.target.value);
            }}
            className="font-bold text-[20px] text-[#000] pb-[10px] bg-transparent outline-none w-full"
          />
        </div>
        <div>
          <input
            value={experimentDescription}
            onChange={(e) => {
              setExperimentDescription(e.target.value);
            }}
            className="text-[13px] opacity-60 pt-[5px] bg-transparent outline-none w-full"
          />
        </div>
      </div>
      <ExperimentsDetails />
    </div>
  );
}

export default RightSideBar;
