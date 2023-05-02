import React, { useEffect, useState } from "react";
import ExperimentsIcon from "../../../assets/Svg/ExperimentsIcon";
import Rename from "../../../assets/Svg/Rename";
import { useMutation } from "@apollo/client";
import Queries from "../../../queries/Queries";
import { useExpContext } from "../../../context/ExpContext";
import { useCompSelectorContext } from "../../../context/compSelectorContext";
import Link from "next/link";

function ExperimentCell({
  id,
  experimentName,
  index,
  selectedExperiment,
  setSelectedExperiment,
}) {
  const [showEditIcon, setShowEditIcon] = useState(false);
  const [editable, setEditable] = useState(false);
  const [newExperimentName, setNewExperimentName] = useState(experimentName);
  const [showErrorMsg,setShowErrorMsg] = useState(false);
  const { selectedExperimentInfo, setSelectedExperimentInfo } = useExpContext();
  const { setShowReport, setShowAdd, setShowClone, setShowEdit } =
    useCompSelectorContext();

  const [updateExperiment, { data, loading, error }] = useMutation(
    Queries.updateExperiment
  );

  useEffect(() => {
    if (
      selectedExperimentInfo &&
      Object.keys(selectedExperimentInfo).length !== 0 &&
      selectedExperimentInfo?.id === id
    )
      setNewExperimentName(selectedExperimentInfo?.name);
  }, [selectedExperimentInfo]);

  const handleUpdate = async () => {
    if (newExperimentName.length === 0) {
      setNewExperimentName(selectedExperimentInfo?.name);
      return;
    }
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
    <>
      <Link href={`/experiments/${id}`}>
        <a>
          <div
            className={`flex items-center gap-[10px] p-[12px] cursor-pointer hover:bg-[#F0F0F0] ${
              selectedExperiment == index
                ? "bg-[#F8FAFB] rounded-[4px]"
                : "opacity-60"
            }`}
            onClick={() => {
              setSelectedExperiment(index);
              setShowReport(false);
              setShowAdd(false);
              setShowClone(false);
              setShowEdit(false);
            }}
            onMouseEnter={() => setShowEditIcon(true)}
            onMouseLeave={() => setShowEditIcon(false)}
          >
            <div>
              <ExperimentsIcon />
            </div>
              <input
                type="text"
                value={newExperimentName}
                className="text-md text-[#000] focus:outline-none outline-none text-ellipsis "
                onChange={(e) => setNewExperimentName(e.target.value)}
                onBlur={() => {
                  setEditable(false);
                  handleUpdate();
                }}
                disabled={!editable}
              />
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
        </a>
      </Link>
      {error && showErrorMsg && (
        <div className="flex items-center text-[#f00] text-[14px] ml-[12px] mb-[12px] break-normal">
          {error.message}
        </div>
      )}
    </>
  );
}

export default ExperimentCell;
