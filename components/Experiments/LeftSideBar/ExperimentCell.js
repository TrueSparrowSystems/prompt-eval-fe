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
  const [editable, setEditable] = useState(false);
  const [newExperimentName, setNewExperimentName] = useState(experimentName);
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
      {editable ? (
        <input
          type="text"
          value={newExperimentName}
          className="text-[13px] text-[#000] focus:outline-none outline-none"
          onChange={(e) => setNewExperimentName(e.target.value)}
        />
      ) : (
        <div className="text-[13px] text-[#000]">{newExperimentName}</div>
      )}
      <button
        className={`ml-auto hover:bg-[#0000001A] p-[5px] ${
          showEditIcon ? "opacity-100" : "opacity-0"
        }`}
        title="Rename"
        onClick={() => {
          setEditable(true);
        }}
      >
        <Rename />
      </button>
    </div>
  );
}

export default ExperimentCell;
