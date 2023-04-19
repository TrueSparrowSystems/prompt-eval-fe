import React, { useState } from "react";
import ExperimentsDetails from "./ExperimentsDetails";
import { useMutation } from "@apollo/client";
import Queries from "../../../queries/Queries";
import { useEffect } from "react";
import {useExpContext} from "../../../context/ExpContext";

function RightSideBar() {
  const { selectedExperimentInfo, setSelectedExperimentInfo } = useExpContext();
  const [experimentName, setExperimentName] = useState("");
  const [experimentDescription, setExperimentDescription] = useState("Copy Use this template to track your experiments. Click + Add new template to create a new prompt template on this board.");
  
  const [updateExperiment, { data, loading, error }] = useMutation(
    Queries.updateExperiment
  );
  
  useEffect(() => {
    setExperimentName(selectedExperimentInfo?.name);
    setExperimentDescription(selectedExperimentInfo?.description);
  }, [selectedExperimentInfo]);

  const handleUpdate = () => {
    setSelectedExperimentInfo((prevState)=>({...prevState, name:experimentName, description:experimentDescription}));
    updateExperiment({
      variables: {
        name: experimentName,
        description:experimentDescription
      }
    })
  }
  
  return (
    <div>
      <div className="step-three">
        <div>
          <input
            value={experimentName}
            onChange={(e) => {
              setExperimentName(e.target.value);
              handleUpdate();
            }}
            className="font-bold text-[20px] text-[#000] pb-[10px] bg-transparent outline-none w-full"
          />
        </div>
        <div>
          <input
            value={experimentDescription}
            onChange={(e) => {
              setExperimentDescription(e.target.value);
              handleUpdate();
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
