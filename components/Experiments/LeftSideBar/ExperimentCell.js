import React, { useEffect, useState } from "react";
import ExperimentsIcon from "../../../assets/Svg/ExperimentsIcon";
import Rename from "../../../assets/Svg/Rename";
import { useMutation } from "@apollo/client";
import Queries from "../../../queries/Queries";
import { useExpContext } from "../../../context/ExpContext";

function ExperimentCell({
  id,
  experimentName,
  key,
  index,
  selectedExperiment,
  setSelectedExperiment,
}) {
  const [showEditIcon, setShowEditIcon] = useState(false);
  const [editable, setEditable] = useState(false);
  const [newExperimentName, setNewExperimentName] = useState(experimentName);
  const { selectedExperimentInfo, setSelectedExperimentInfo } = useExpContext();

  const [updateExperiment, { data, loading, error }] = useMutation(
    Queries.updateExperiment
  );

  useEffect(() => {
    setNewExperimentName(experimentName);
  }, [selectedExperimentInfo]);

  const handleUpdate = () => {
    setSelectedExperimentInfo((prevState) => ({
      ...prevState,
      name: newExperimentName,
    }));
    updateExperiment({
      variables: {
        documentId: id,
        name: newExperimentName,
      },
    });
  };

  return (
    <div>
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
            onBlur={() => {
              setEditable(false);
              handleUpdate();
            }}
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
      {error && (
        <div className="text-[#f00] text-[14px] mt-[12px] break-all">
          {error}
        </div>
      )}
    </div>
  );
}

export default ExperimentCell;
