import React, { useState } from "react";
import ExperimentsDetails from "./ExperimentsDetails";
import { useMutation } from "@apollo/client";
import Queries from "../../../queries/Queries";
import { useEffect } from "react";
import { useExpContext } from "../../../context/ExpContext";

function RightSideBar() {
  const { selectedExperimentInfo, setSelectedExperimentInfo } = useExpContext();
  const [experimentName, setExperimentName] = useState("Untitled 1");
  const [experimentDescription, setExperimentDescription] = useState(
    "Use this template to track your experiments. \nClick + Add new template to create a new prompt template on this board."
  );

  const [updateExperiment, { data, loading, error }] = useMutation(
    Queries.updateExperiment
  );

  useEffect(() => {
    if (
      selectedExperimentInfo &&
      Object.keys(selectedExperimentInfo).length !== 0
    ) {
      setExperimentName(selectedExperimentInfo?.name);
      setExperimentDescription(selectedExperimentInfo?.description);
    }
  }, [selectedExperimentInfo]);

  const handleUpdate = async (isNameChanged) => {
    if (experimentName?.length === 0) {
      setExperimentName(selectedExperimentInfo?.name);
      return;
    }

    if (experimentDescription?.length === 0) {
      setExperimentDescription(selectedExperimentInfo?.description);
      return;
    }

    let variables = { documentId: selectedExperimentInfo?.id };

    if (isNameChanged) {
      variables.name = experimentName;
    } else {
      variables.description = experimentDescription;
    }

    try {
      await updateExperiment({
        variables: variables,
      });
      setSelectedExperimentInfo((prevState) => ({
        ...prevState,
        name: experimentName,
        description: experimentDescription,
      }));
    } catch (err) {
      return err;
    }
  };

  return (
    <div>
      <div className="w-[80%] step-three">
        <div>
        <input
            value={experimentName}
            onChange={(e) => {
              setExperimentName(e.target.value);
            }}
            onBlur={() => handleUpdate(true)}
            className="font-semibold text-[20px] text-[#000] pb-[10px] bg-transparent outline-none w-full"
            disabled={selectedExperimentInfo == null}
            maxLength={70}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                e.target.blur();
                handleUpdate(true);
              }
            }}
          />
        </div>
        <div>
        <textarea
            value={experimentDescription}
            onChange={(e) => {
              setExperimentDescription(e.target.value);
            }}
            onBlur={() => handleUpdate(false)}
            className={` text-md opacity-60 pt-[5px] bg-transparent outline-none break-words resize-none w-full `}
            maxLength={240}
            disabled={selectedExperimentInfo == null}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.target.blur();
                handleUpdate(false);
              }
            }}
            rows={2}
          />
          {error && (
            <div className="text-[#f00] text-[14px] mt-[2px] break-all">
              {error.message}
            </div>
          )}
        </div>
      </div>
      <ExperimentsDetails />
    </div>
  );
}

export default RightSideBar;
