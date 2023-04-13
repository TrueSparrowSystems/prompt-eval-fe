import React, { useState } from "react";
import ExperimentsIcon from "../../../assets/Svg/ExperimentsIcon";
import Rename from "../../../assets/Svg/Rename";
function ExperimentCell({
  experimentName,
  index,
  setSelectedExperiment,
  selectedExperiment,
}) {
  const [showEditIcon, setShowEditIcon] = useState(false);
  const renameExperiment = () => {};
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
      <ExperimentsIcon />
      <div className="text-[13px] text-[#000]">{experimentName}</div>
      <button
        className={`ml-auto hover:bg-[#0000001A] p-[5px] ${
          showEditIcon ? "opacity-100" : "opacity-0"
        }`}
        title="Rename"
        onClick={() => {
          renameExperiment();
        }}
      >
        <Rename />
      </button>
    </div>
  );
}

export default ExperimentCell;
